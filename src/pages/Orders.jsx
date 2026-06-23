import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../lib/auth";
import { createOrder, fetchOrders, fetchProducts } from "../lib/orderService";
import { calculateDiscountedTotal, calculatePoints, formatCurrency } from "../lib/loyalty";

const Orders = () => {
  const { session, profile, refreshProfile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [items, setItems] = useState([{ product_id: "", quantity: 1, price: 0 }]);
  const [status, setStatus] = useState("completed");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const amount = Number(item.price) * Number(item.quantity);
      return sum + (Number.isFinite(amount) ? amount : 0);
    }, 0);
  }, [items]);

  const discountedTotal = useMemo(() => calculateDiscountedTotal(total, profile?.tier), [total, profile?.tier]);
  const pointsEarned = useMemo(() => calculatePoints(discountedTotal), [discountedTotal]);

  const canCreateOrder = profile?.role === "member";

  const loadOrders = async () => {
    setLoading(true);
    const { data, error: orderError } = await fetchOrders();
    if (!orderError) setOrders(data || []);
    else console.error(orderError);
    setLoading(false);
  };

  const loadProducts = async () => {
    const { data, error: productError } = await fetchProducts();
    if (!productError) setProducts(data || []);
    else console.error(productError);
  };

  useEffect(() => {
    loadOrders();
    loadProducts();
  }, []);

  const updateItem = (index, changes) => {
    setItems((prev) => prev.map((item, idx) => (idx === index ? { ...item, ...changes } : item)));
  };

  const addItem = () => setItems((prev) => [...prev, { product_id: "", quantity: 1, price: 0 }]);
  const removeItem = (index) => setItems((prev) => prev.filter((_, idx) => idx !== index));

  const onProductChange = (index, productId) => {
    const product = products.find((item) => item.id === productId);
    updateItem(index, {
      product_id: productId,
      price: product?.price ?? 0,
      quantity: 1,
    });
  };

  const onQuantityChange = (index, quantity) => {
    const value = Number(quantity);
    updateItem(index, { quantity: value > 0 ? value : 1 });
  };

  const handleCreateOrder = async (event) => {
    event.preventDefault();
    setError("");

    if (!session?.user?.id) {
      setError("Akun tidak tersedia. Silakan login ulang.");
      return;
    }

    const validItems = items.filter((item) => item.product_id && item.quantity > 0 && Number(item.price) > 0);
    if (validItems.length === 0) {
      setError("Pilih produk dan pastikan kuantitas valid.");
      return;
    }

    setSaving(true);

    const payloadItems = validItems.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { data, error: rpcError } = await createOrder({
      userId: session.user.id,
      status,
      totalAmount: discountedTotal,
      pointsEarned,
      items: payloadItems,
    });

    setSaving(false);

    if (rpcError) {
      setError(rpcError.message || "Gagal membuat order. Coba lagi.");
      return;
    }

    setDialogOpen(false);
    setItems([{ product_id: "", quantity: 1, price: 0 }]);
    setStatus("completed");
    await loadOrders();
    await refreshProfile();
  };

  return (
    <div className="p-6 font-barlow animate-in fade-in duration-500">
      <PageHeader title="Order List" breadcrumb={["Home", "Orders"]}>
        {canCreateOrder && (
          <button
            onClick={() => setDialogOpen(true)}
            className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition shadow-lg shadow-emerald-200 flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add Orders
          </button>
        )}
      </PageHeader>

      <div className="bg-white rounded-[2rem] shadow-soft overflow-hidden mt-8 border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Total Amount</th>
                <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Points</th>
                <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">Loading orders...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">No orders found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-emerald-50/30 transition-colors group cursor-default">
                    <td className="p-5 text-sm font-bold text-gray-400">{order.id}</td>
                    <td className="p-5">
                      <div className="text-gray-800 font-poppins font-bold">
                        {order.profiles?.full_name || order.user_id?.slice(0, 8) || "Unknown"}
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm inline-block ${
                          order.status === "completed"
                            ? "bg-emerald-100 text-emerald-600"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order.status || "pending"}
                      </span>
                    </td>
                    <td className="p-5 text-sm font-poppins font-bold text-gray-700">{formatCurrency(order.total_amount)}</td>
                    <td className="p-5 text-sm font-poppins font-bold text-gray-700">{order.points_earned ?? 0}</td>
                    <td className="p-5">
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                        {order.created_at ? new Date(order.created_at).toLocaleDateString("id-ID") : "-"}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setDialogOpen(false)} />
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-emerald-500 p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-poppins font-bold">New Order</h2>
                <p className="text-emerald-100 text-sm opacity-80">Checkout pesanan member dan hitung poin otomatis.</p>
              </div>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            </div>

            <form className="p-8 space-y-6 font-barlow" onSubmit={handleCreateOrder}>
              {!canCreateOrder && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                  Hanya member yang dapat membuat order. Cek role user di profil.
                </div>
              )}
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-end rounded-3xl border border-gray-100 bg-gray-50 p-4">
                    <div className="col-span-6">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-1 block">Product</label>
                      <select
                        value={item.product_id}
                        onChange={(event) => onProductChange(index, event.target.value)}
                        className="w-full bg-white rounded-2xl p-4 border border-gray-200 outline-none focus:border-emerald-400"
                      >
                        <option value="">Select product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id} disabled={product.stock <= 0}>
                            {product.name} • {formatCurrency(product.price)} • Stock {product.stock}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-1 block">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) => onQuantityChange(index, event.target.value)}
                        className="w-full bg-white rounded-2xl p-4 border border-gray-200 outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-1 block">Price</label>
                      <div className="w-full rounded-2xl p-4 border border-gray-200 bg-gray-100 text-sm text-gray-700">
                        {formatCurrency(item.price)}
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 font-bold hover:bg-red-200 transition"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={addItem}
                  className="rounded-2xl bg-slate-900 text-white px-5 py-3 font-bold hover:bg-slate-800 transition"
                >
                  Add product
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                  <div className="text-xs uppercase tracking-widest text-gray-500">Subtotal</div>
                  <div className="mt-2 text-xl font-bold text-gray-900">{formatCurrency(total)}</div>
                </div>
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                  <div className="text-xs uppercase tracking-widest text-gray-500">Tier</div>
                  <div className="mt-2 text-xl font-bold text-gray-900">{profile?.tier || "bronze"}</div>
                </div>
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                  <div className="text-xs uppercase tracking-widest text-gray-500">Points earned</div>
                  <div className="mt-2 text-xl font-bold text-gray-900">{pointsEarned}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                  <div className="text-xs uppercase tracking-widest text-gray-500">Total after discount</div>
                  <div className="mt-2 text-xl font-bold text-gray-900">{formatCurrency(discountedTotal)}</div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-1 block">Order status</label>
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="w-full bg-white rounded-2xl p-4 border border-gray-200 outline-none focus:border-emerald-400"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  className="w-full md:w-auto rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-bold text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canCreateOrder || saving}
                  className="w-full md:w-auto rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving order..." : "Save Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
