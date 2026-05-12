import { useState } from "react";
import { Link } from "react-router-dom"; 
import PageHeader from "../components/PageHeader";
// Import data dari file JSON yang baru kamu buat
import customerData from "../data/customers.json"; 

const Customers = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-1">
      <PageHeader title="Customer List" breadcrumb="Dashboard / Customers">
        <button 
          className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-700 transition-all flex items-center gap-2 shadow-lg shadow-green-100 active:scale-95"
          onClick={() => setShowForm(true)}
        >
          <span className="text-xl">+</span> Add Customer
        </button>
      </PageHeader>

      {/* MODAL ADD CUSTOMER */}
      {showForm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20 p-4"
          onClick={() => setShowForm(false)}
        >
          <div 
            className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl border border-white/50 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Customer</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700 ml-1">Customer ID</label>
                <input type="text" placeholder="Auto-generated" className="w-full mt-1 p-3 border border-gray-100 rounded-2xl bg-gray-50 text-gray-400 outline-none cursor-not-allowed" disabled />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 ml-1">Name</label>
                <input type="text" placeholder="Full Name" className="w-full mt-1 p-3 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all" />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                <input type="email" placeholder="email@mail.com" className="w-full mt-1 p-3 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all" />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 ml-1">Phone</label>
                <input type="text" placeholder="0812..." className="w-full mt-1 p-3 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all" />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 ml-1">Loyalty Level</label>
                <select className="w-full mt-1 p-3 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all bg-white">
                  <option>Bronze</option>
                  <option>Silver</option>
                  <option>Gold</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all">
                Cancel
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 active:scale-95 transition-all">
                Save Customer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* TABLE SECTION */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto mt-6 border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">ID</th>
              <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Name</th>
              <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Email</th>
              <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Phone</th>
              <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Loyalty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {customerData.map((item) => (
              <tr key={item.id} className="hover:bg-green-50/30 transition-colors group">
                <td className="p-4 text-sm font-mono font-medium text-gray-500">{item.id}</td>
                <td className="p-4 text-sm font-bold">
                  {/* Nama Customer sebagai Link */}
                  <Link 
                    to={`/customers/${item.id}`} 
                    className="text-green-600 hover:text-green-800 transition-all"
                  >
                    {item.name}
                  </Link>
                </td>
                <td className="p-4 text-sm text-gray-600">{item.email}</td>
                <td className="p-4 text-sm text-gray-600">{item.phone}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    item.loyalty === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                    item.loyalty === 'Silver' ? 'bg-slate-100 text-slate-600' : 
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {item.loyalty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;