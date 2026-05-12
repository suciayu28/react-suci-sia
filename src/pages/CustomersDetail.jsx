import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import customerData from "../data/customers.json"; 
import PageHeader from "../components/PageHeader";

export default function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Mencari customer berdasarkan ID (string) dari URL
    const foundCustomer = customerData.find((item) => item.id === id);
    setCustomer(foundCustomer);
  }, [id]);

  if (!customer) {
    return (
      <div className="p-4">
        <PageHeader title="Customer Not Found" breadcrumb="Dashboard / Customers / Error" />
        <div className="text-center bg-white p-10 rounded-3xl shadow-sm mt-6">
          <p className="text-red-500 font-bold text-xl mb-4">Oops! Data pelanggan tidak ditemukan.</p>
          <Link to="/customers" className="text-green-600 font-bold hover:underline">
            ← Kembali ke Daftar Pelanggan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <PageHeader title="Customer Profile" breadcrumb={`Dashboard / Customers / ${customer.name}`} />
      
      <div className="max-w-4xl mx-auto mt-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header Profil (Gradient) */}
          <div className="h-32 bg-gradient-to-r from-green-500 to-emerald-700"></div>
          
          <div className="px-8 pb-8">
            <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-16 mb-6 gap-6">
              {/* Avatar Placeholder */}
              <div className="w-32 h-32 bg-white rounded-3xl p-2 shadow-lg">
                <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center text-4xl font-black text-green-600 border border-gray-50">
                  {customer.name.charAt(0)}
                </div>
              </div>
              
              <div className="text-center md:text-left flex-1">
                <h2 className="text-3xl font-black text-gray-800">{customer.name}</h2>
                <p className="text-gray-500 font-medium">{customer.email}</p>
              </div>

              <div className="mb-2">
                <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm ${
                  customer.loyalty === 'Gold' ? 'bg-yellow-400 text-white' :
                  customer.loyalty === 'Silver' ? 'bg-slate-400 text-white' : 
                  'bg-orange-400 text-white'
                }`}>
                  {customer.loyalty} Member
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* Info Kontak */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider">Contact Information</h3>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Customer ID</span>
                    <span className="font-bold text-gray-700 font-mono">{customer.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Phone Number</span>
                    <span className="font-bold text-gray-700">{customer.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Email Address</span>
                    <span className="font-bold text-gray-700">{customer.email}</span>
                  </div>
                </div>
              </div>

              {/* Status Akun */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider">Membership Status</h3>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                   <p className="text-sm text-gray-600 leading-relaxed">
                    Pelanggan ini merupakan member <span className="font-bold text-green-600">{customer.loyalty}</span>. 
                    Berikan pelayanan terbaik dan diskon khusus sesuai dengan tingkat loyalitas mereka.
                   </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <Link 
                to="/customers" 
                className="flex-1 text-center py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all"
              >
                Kembali
              </Link>
              <button className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all">
                Edit Profil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}