import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
// PERBAIKAN: Gunakan ../../ untuk keluar dari folder auth dan pages
import productData from "../data/products.json"; 
import PageHeader from "../components/PageHeader";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Mencari produk berdasarkan ID dari parameter URL
    // parseInt digunakan karena id dari URL berbentuk string, sedangkan di JSON berbentuk number
    const foundProduct = productData.find((item) => item.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  // Jika produk tidak ditemukan setelah proses pencarian
  if (!product) {
    return (
      <div className="p-4">
        <PageHeader title="Product Not Found" breadcrumb="Dashboard / Products / Error" />
        <div className="text-center bg-white p-10 rounded-3xl shadow-sm mt-6">
          <p className="text-red-500 font-bold text-xl mb-4">Oops! Produk tidak ditemukan.</p>
          <Link to="/products" className="text-green-600 font-bold hover:underline">
            ← Kembali ke Daftar Produk
          </Link>
        </div>
      </div>
    );
  }

  // Fungsi format mata uang Rupiah
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-4">
      {/* Breadcrumb dinamis mengikuti nama produk */}
      <PageHeader title="Product Detail" breadcrumb={`Dashboard / Products / ${product.title}`} />
      
      <div className="p-6 bg-white rounded-3xl shadow-xl max-w-4xl mx-auto mt-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Bagian Gambar */}
          <div className="bg-gray-50 rounded-3xl h-80 flex items-center justify-center overflow-hidden border border-gray-50">
            <img
              src={`https://placehold.co/600x600/10b981/white?text=${product.brand}`}
              alt={product.title}
              className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Bagian Informasi */}
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                {product.category}
              </span>
            </div>
            
            <h2 className="text-4xl font-black mb-2 text-gray-800 leading-tight">
              {product.title}
            </h2>
            <p className="text-gray-400 font-mono text-sm mb-6">{product.code}</p>
            
            <div className="space-y-3 mb-8">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">Brand</span>
                <span className="font-bold text-gray-800">{product.brand}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">Stock Availability</span>
                <span className={`font-bold ${product.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                  {product.stock} pcs
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl mb-8">
              <p className="text-sm text-gray-500 mb-1 font-bold uppercase">Price</p>
              <p className="text-green-600 font-black text-3xl">
                {formatCurrency(product.price)}
              </p>
            </div>

            <Link 
              to="/products" 
              className="w-full text-center py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 active:scale-95 transition-all"
            >
              Back to Inventory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}