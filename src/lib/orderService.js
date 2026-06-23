import { supabase } from "./supabase";

export async function fetchProducts() {
  return supabase
    .from("products")
    .select("id, name, code, category, brand, price, stock")
    .order("name", { ascending: true });
}

export async function fetchOrders() {
  return supabase
    .from("orders")
    .select("id, user_id, status, total_amount, points_earned, created_at, profiles(full_name)")
    .order("created_at", { ascending: false })
    .limit(50);
}

export async function createOrder({ userId, status, totalAmount, pointsEarned, items }) {
  return supabase.rpc("create_order_for_member", {
    p_user_id: userId,
    p_total_amount: totalAmount,
    p_points_earned: pointsEarned,
    p_status: status,
    p_items: items,
  });
}
