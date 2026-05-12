import { useState } from "react";
import PageHeader from "../components/PageHeader";

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulasi data orders dengan perbaikan Backtick
  const orders = Array.from({ length: 30 }, (_, i) => ({
    // PERBAIKAN: Gunakan backtick (`) bukan kutip biasa agar ${} berfungsi
    id: `ORD-${1000 + i}`, 
    customer: `Customer ${i + 1}`,
    status: ["Pending", "Completed", "Cancelled"][Math.floor(Math.random() * 3)],
    total: Math.floor(Math.random() * 1000000),
    date: "2024-03-20",
  }));

  return (
    <div className="p-6 font-barlow animate-in fade-in duration-500">

      {/* HEADER */}
      <PageHeader title="Order List" breadcrumb={["Home", "Orders"]}>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition shadow-lg shadow-emerald-200 flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add Orders
        </button>
      </PageHeader>

      {/* TABLE CARD */}
      <div className="bg-white rounded-[2rem] shadow-soft overflow-hidden mt-8 border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Total Amount</th>
                <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-emerald-50/30 transition-colors group cursor-default"
                >
                  <td className="p-5 text-sm font-bold text-gray-400">
                    {order.id}
                  </td>
                  <td className="p-5">
                    <div className="text-gray-800 font-poppins font-bold">
                      {order.customer}
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm inline-block ${
                        order.status === "Completed"
                          ? "bg-emerald-100 text-emerald-600"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-5 text-sm font-poppins font-bold text-gray-700">
                    Rp {order.total.toLocaleString("id-ID")}
                  </td>

                  <td className="p-5">
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      {order.date}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* MODAL SECTION */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setIsModalOpen(false)} 
          />
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-emerald-500 p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-poppins font-bold">New Order</h2>
                <p className="text-emerald-100 text-sm opacity-80">Catat transaksi baru secara manual.</p>
              </div>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            <form className="p-8 space-y-4 font-barlow" onSubmit={(e) => e.preventDefault()}>
              
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-1 block">Customer Name</label>
                <input type="text" placeholder="Nama pelanggan" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-1 block">Total Amount</label>
                  <input type="number" placeholder="Rp 0" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-1 block">Date</label>
                  <input type="date" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-1 block">Order Status</label>
                <select className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-600 appearance-none cursor-pointer">
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 active:scale-95"
                >
                  Save Order
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