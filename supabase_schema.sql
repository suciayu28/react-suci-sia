-- Supabase schema and policies for E-Commerce Admin & Member Portal

-- Requires pgcrypto extension for gen_random_uuid()
create extension if not exists pgcrypto;

-- Profiles table: linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  role text not null default 'member' check (role in ('admin', 'member', 'guest')),
  tier text not null default 'bronze' check (tier in ('bronze', 'silver', 'gold', 'platinum')),
  points integer not null default 0 check (points >= 0),
  created_at timestamptz not null default now()
);

-- Products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  code text,
  name text not null,
  category text,
  brand text,
  price numeric not null check (price >= 0),
  stock integer not null check (stock >= 0),
  created_at timestamptz not null default now()
);

-- Orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  total_amount numeric not null,
  points_earned integer not null,
  status text not null default 'pending' check (status in ('pending', 'completed')),
  created_at timestamptz not null default now()
);

-- Order items table
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity integer not null check (quantity > 0),
  price numeric not null
);

-- Trigger for automatic profile creation when a new auth user is created.
create or replace function public.create_profile_for_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email, 'New User')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace function public.decrement_product_stock_on_order_item()
returns trigger as $$
declare
  current_stock integer;
begin
  select stock into current_stock from public.products where id = new.product_id;
  if current_stock is null then
    raise exception 'Product not found';
  end if;
  if current_stock < new.quantity then
    raise exception 'Insufficient stock';
  end if;
  update public.products set stock = stock - new.quantity where id = new.product_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger if not exists create_profile_after_auth_user
after insert on auth.users
for each row execute function public.create_profile_for_new_user();

create or replace function public.create_order_for_member(
  p_user_id uuid,
  p_total_amount numeric,
  p_points_earned integer,
  p_status text,
  p_items jsonb
) returns uuid as $$
declare
  new_order_id uuid;
  item jsonb;
begin
  if auth.uid() is null or auth.uid() <> p_user_id then
    raise exception 'Unauthorized';
  end if;

  if not public.is_member_user() then
    raise exception 'Only members can create orders';
  end if;

  insert into public.orders (user_id, total_amount, points_earned, status)
  values (p_user_id, p_total_amount, p_points_earned, p_status)
  returning id into new_order_id;

  for item in select * from jsonb_array_elements(p_items) loop
    insert into public.order_items (order_id, product_id, quantity, price)
    values (
      new_order_id,
      (item->>'product_id')::uuid,
      (item->>'quantity')::int,
      (item->>'price')::numeric
    );
  end loop;

  update public.profiles
  set points = points + p_points_earned,
      tier = case
        when points + p_points_earned > 1000 then 'platinum'
        when points + p_points_earned > 500 then 'gold'
        when points + p_points_earned > 100 then 'silver'
        else 'bronze'
      end
  where id = p_user_id;

  return new_order_id;
end;
$$ language plpgsql security definer;

-- Enable Row Level Security for all tables
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Helper policy checks
-- Admin check: profile exists for current auth user and role is admin
create or replace function public.is_admin_user() returns boolean as $$
select exists(
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
);
$$ language sql stable security definer;

create or replace function public.is_member_user() returns boolean as $$
select exists(
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'member'
);
$$ language sql stable security definer;

-- Profiles policies
create policy select_own_profile on public.profiles
for select using (
  auth.uid() = id or public.is_admin_user()
);

create policy insert_profile_for_new_user on public.profiles
for insert with check (
  auth.uid() = id or public.is_admin_user()
);

create policy update_own_profile on public.profiles
for update using (
  auth.uid() = id or public.is_admin_user()
) with check (
  auth.uid() = id or public.is_admin_user()
);

-- Products policies
create policy select_products_for_authenticated on public.products
for select using (auth.uid() is not null);

create policy manage_products_for_admin on public.products
for all using (public.is_admin_user()) with check (public.is_admin_user());

-- Orders policies
create policy select_orders_for_owner_or_admin on public.orders
for select using (
  auth.uid() = user_id or public.is_admin_user()
);

create policy insert_orders_for_member on public.orders
for insert with check (
  auth.uid() = user_id and public.is_member_user()
);

create policy update_orders_for_admin on public.orders
for update using (public.is_admin_user()) with check (public.is_admin_user());

create policy delete_orders_for_admin on public.orders
for delete using (public.is_admin_user());

-- Order items policies
create policy select_order_items_for_owner_or_admin on public.order_items
for select using (
  exists(
    select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin_user())
  )
);

create policy insert_order_items_for_owner on public.order_items
for insert with check (
  exists(
    select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()
  )
);

create policy update_order_items_for_admin on public.order_items
for update using (public.is_admin_user()) with check (public.is_admin_user());

create policy delete_order_items_for_admin on public.order_items
for delete using (public.is_admin_user());
