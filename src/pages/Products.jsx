import { useState } from "react";
// Import Link dari react-router-dom untuk navigasi ke detail
import { Link } from "react-router-dom"; 
// Naik 2 level untuk sampai ke folder src, lalu masuk ke components
import PageHeader from "../components/PageHeader";
// Naik 2 level untuk sampai ke folder src, lalu masuk ke data
import productData from "../data/products.json"; 

const Products = () => {
  const [showForm, setShowForm] = useState(false);

  // Fungsi untuk memformat angka ke Rupiah
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-1">
      <PageHeader title="Product Inventory" breadcrumb="Dashboard / Products">
        <button 
          className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-700 transition-all flex items-center gap-2 shadow-lg shadow-green-100 active:scale-95"
          onClick={() => setShowForm(true)}
        >
          <span className="text-xl">+</span> Add New Product
        </button>
      </PageHeader>

      {/* MODAL FORM ADD PRODUCT */}
      {showForm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4"
          onClick={() => setShowForm(false)}
        >
          <div 
            className="bg-white p-8 rounded-3xl w-full max-w-2xl shadow-2xl border border-white/50 text-left overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Product Title</label>
                <input type="text" placeholder="e.g. MacBook Pro M3" className="w-full mt-1 p-3 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all" />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 ml-1">Category</label>
                <select className="w-full mt-1 p-3 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all bg-white">
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Apparel</option>
                  <option>Accessories</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 ml-1">Brand</label>
                <input type="text" placeholder="Brand Name" className="w-full mt-1 p-3 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all" />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 ml-1">Price (IDR)</label>
                <input type="number" placeholder="0" className="w-full mt-1 p-3 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all" />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 ml-1">Initial Stock</label>
                <input type="number" placeholder="0" className="w-full mt-1 p-3 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all" />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setShowForm(false)} 
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowForm(false)} 
                className="flex-1 py-3 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 active:scale-95 transition-all"
              >
                Save Product
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
              <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Code</th>
              <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Product Name</th>
              <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Category</th>
              <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Brand</th>
              <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Price</th>
              <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {productData.map((item) => (
              <tr key={item.id} className="hover:bg-green-50/30 transition-colors group">
                <td className="p-4 text-sm font-mono font-bold text-green-600">{item.code}</td>
                {/* Perbaikan: Mengubah nama produk menjadi Link ke detail */}
                <td className="p-4 text-sm font-semibold">
                  <Link 
                    to={`/products/${item.id}`} 
                    className="text-emerald-500 hover:text-emerald-700 transition-all"
                  >
                    {item.title}
                  </Link>
                </td>
                <td className="p-4">
                  <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight">
                    {item.category}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">{item.brand}</td>
                <td className="p-4 text-sm font-bold text-gray-700">{formatCurrency(item.price)}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${item.stock < 10 ? 'text-red-500' : 'text-gray-700'}`}>
                      {item.stock}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase font-medium">pcs</span>
                  </div>
                  <div className="w-16 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.stock < 10 ? 'bg-red-400' : 'bg-green-400'}`} 
                      style={{ width: `${Math.min(item.stock, 100)}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;