import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabase";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, code, category, brand, price, stock, description, image_url")
        .eq("id", id)
        .single();

      if (!error) {
        setProduct(data);
      }
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4">
        <PageHeader title="Product Detail" breadcrumb="Dashboard / Products / Loading" />
        <div className="text-center bg-white p-10 rounded-3xl shadow-sm mt-6">Loading product data...</div>
      </div>
    );
  }

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="p-4">
      <PageHeader title="Product Detail" breadcrumb={`Dashboard / Products / ${product.name || product.code || "Product"}`} />
      <div className="p-6 bg-white rounded-3xl shadow-xl max-w-4xl mx-auto mt-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gray-50 rounded-3xl h-80 flex items-center justify-center overflow-hidden border border-gray-50">
            <img
              src={product.image_url || `https://placehold.co/600x600/10b981/ffffff?text=${encodeURIComponent(product.name || "Product")}`}
              alt={product.name || "Product"}
              className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                {product.category || "General"}
              </span>
            </div>
            <h2 className="text-4xl font-black mb-2 text-gray-800 leading-tight">{product.name || "Untitled Product"}</h2>
            <p className="text-gray-400 font-mono text-sm mb-6">{product.code || "SKU unknown"}</p>
            <div className="space-y-3 mb-8">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">Brand</span>
                <span className="font-bold text-gray-800">{product.brand || "-"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">Stock Availability</span>
                <span className={`font-bold ${product.stock < 10 ? "text-red-500" : "text-green-600"}`}>
                  {product.stock ?? 0} pcs
                </span>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl mb-8">
              <p className="text-sm text-gray-500 mb-1 font-bold uppercase">Price</p>
              <p className="text-green-600 font-black text-3xl">{formatCurrency(product.price)}</p>
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
