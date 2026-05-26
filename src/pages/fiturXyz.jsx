import React from "react";
import PageHeader from "../components/PageHeader";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Badge from "../components/Badge";

// Data Isu Terhot - Bisa dipindahkan ke file JSON atau fetched dari API
const HOT_ISSUES = [
  { id: 1, topic: "Transformasi Digital UMKM", category: "Ekonomi", trend: "Meningkat", status: "Viral" },
  { id: 2, topic: "Pembangunan IKN Nusantara", category: "Infrastruktur", trend: "Stabil", status: "Hot" },
  { id: 3, topic: "Subsidi Energi Tepat Sasaran", category: "Politik", trend: "Meningkat", status: "Trending" },
  { id: 4, topic: "Krisis Iklim & Cuaca Ekstrem", category: "Lingkungan", trend: "Meningkat", status: "Urgent" },
  { id: 5, topic: "Keamanan Data Nasional", category: "Teknologi", trend: "Meningkat", status: "Hot" },
  { id: 6, topic: "Ketahanan Pangan Mandiri", category: "Sosial", trend: "Stabil", status: "Penting" },
  { id: 7, topic: "Implementasi AI di Sekolah", category: "Edukasi", trend: "Meningkat", status: "Viral" },
  { id: 8, topic: "Reformasi Sistem Kesehatan", category: "Kesehatan", trend: "Stabil", status: "Trending" },
  { id: 9, topic: "Ekosistem Kendaraan Listrik", category: "Otomotif", trend: "Meningkat", status: "Hot" },
  { id: 10, topic: "Stabilitas Ekonomi Pasca Pemilu", category: "Ekonomi", trend: "Stabil", status: "Hot" },
];

const FiturXyz = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader 
        title="Fitur Xyz" 
        breadcrumb="Dashboard / Fitur Xyz" 
      />

      <Container className="mt-6">
        <div className="space-y-6">
          
          {/* Section Tabel */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">10 Isu Terhangat Indonesia</h2>
                <p className="text-gray-400 text-sm mt-1">Analisis tren percakapan publik Mei 2026</p>
              </div>
              <button className="bg-[#00B074] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#009663] transition-all active:scale-95">
                Ekspor Laporan
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-400 font-black uppercase text-[10px] tracking-[0.1em]">
                  <tr>
                    <th className="px-6 py-4">No</th>
                    <th className="px-6 py-4">Topik Isu</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4 text-center">Tren</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {HOT_ISSUES.map((issue, index) => (
                    <tr key={issue.id} className="group hover:bg-emerald-50/30 transition-all duration-200">
                      <td className="px-6 py-5 font-bold text-gray-300 group-hover:text-[#00B074]">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-bold text-gray-800 block group-hover:translate-x-1 transition-transform">
                          {issue.topic}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[11px] font-bold uppercase tracking-wider">
                          {issue.category}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className={`flex items-center justify-center gap-2 font-bold ${
                          issue.trend === 'Meningkat' ? 'text-emerald-500' : 'text-amber-500'
                        }`}>
                          {issue.trend === 'Meningkat' ? '▲' : '▬'}
                          <span className="text-[12px]">{issue.trend}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <Badge type={issue.status === 'Urgent' || issue.status === 'Viral' ? 'danger' : 'success'}>
                          {issue.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Card */}
          <div className="bg-[#0F172A] p-8 rounded-[2rem] text-white flex items-center justify-between shadow-xl">
             <div>
                <h4 className="font-bold text-lg">Butuh data lebih spesifik?</h4>
                <p className="text-gray-400 text-sm">Hubungi tim riset kami untuk akses dashboard premium.</p>
             </div>
             <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-bold transition-all">
                Contact Support
             </button>
          </div>

          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default FiturXyz;