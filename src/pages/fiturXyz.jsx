import React from "react";
import PageHeader from "../components/PageHeader";
import Container from "../components/Container";
import Footer from "../components/Footer";

const FiturXyz = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header sesuai dengan breadcrumb di gambar: Dashboard / Order List */}
      <PageHeader 
        title="Fitur Xyz" 
        breadcrumb="Dashboard / Order List" 
      />

      <Container className="mt-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[200px]">
          {/* Isi konten sesuai teks di gambar */}
          <p className="text-gray-700 font-medium">
            Ini Halaman Fitur Xyz
          </p>
        </div>
        
        <Footer />
      </Container>
    </div>
  );
};

export default FiturXyz;