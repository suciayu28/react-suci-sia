import React from "react";
import PageHeader from "../components/PageHeader";
import Container from "../components/Container";
import Section from "../components/Section";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import Label from "../components/Label";
import Input from "../components/Input";
import Alert from "../components/Alert";
import Footer from "../components/Footer";

const Components = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader title="Components" breadcrumb="Dashboard / Components" />

      {/* IMPLEMENTASI LAYOUT: CONTAINER SEBAGAI PEMBUNGKUS UTAMA */}
      <Container className="mt-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-10 space-y-2">
            
            {/* 1. BASIC COMPONENT */}
            <Section title="1. Basic Component" description="Komponen atomik sederhana.">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <Label>Buttons</Label>
                  <div className="flex gap-2 mt-2">
                    <Button type="primary">Save</Button>
                    <Button type="danger">Delete</Button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <Label>Badges</Label>
                  <div className="flex gap-2 mt-2">
                    <Badge type="success">Active</Badge>
                    <Badge type="warning">Late</Badge>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <Label>Avatars</Label>
                  <div className="flex gap-2 mt-2">
                    <Avatar name="Admin" />
                    <Avatar name="User" />
                  </div>
                </div>
              </div>
            </Section>

            {/* 2. LAYOUT COMPONENT (YANG TADI TERLEWAT) */}
            <Section title="2. Layout Component" description="Komponen untuk mengatur struktur dan kerangka halaman.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Container">
                  <p className="text-sm text-gray-600 mb-2">Mengatur margin otomatis dan max-width agar konten tetap di tengah.</p>
                  <div className="border-2 border-dashed border-emerald-200 p-2 text-center text-emerald-600 text-xs rounded-lg">
                    Content inside Container
                  </div>
                </Card>
                <Card title="Footer">
                  <p className="text-sm text-gray-600 mb-2">Komponen statis di bagian bawah halaman untuk informasi hak cipta.</p>
                  <div className="bg-gray-800 p-2 rounded-lg scale-90">
                    <div className="h-2 w-20 bg-gray-600 rounded mb-1"></div>
                    <div className="h-2 w-10 bg-gray-700 rounded"></div>
                  </div>
                </Card>
              </div>
            </Section>

            {/* 3. DATA DISPLAY COMPONENT */}
            <Section title="3. Data Display" description="Menampilkan informasi data secara visual menggunakan Card.">
              <Card title="User Information">
                <div className="flex items-center gap-4">
                  <Avatar name="Sedap" />
                  <div>
                    <h4 className="font-bold">Admin Sedap</h4>
                    <p className="text-xs text-gray-500">Administrator System</p>
                  </div>
                </div>
              </Card>
            </Section>

            {/* 4. FORM COMPONENT */}
            <Section title="4. Form Component" description="Elemen input untuk interaksi data.">
              <div className="max-w-md p-6 border border-gray-100 rounded-2xl bg-gray-50">
                <Label htmlFor="demo">Input Label</Label>
                <Input id="demo" placeholder="Contoh placeholder..." />
              </div>
            </Section>

            {/* 5. FEEDBACK COMPONENT */}
            <Section title="5. Feedback Component" description="Memberikan respon visual atas aksi pengguna.">
              <Alert type="success"><b>Berhasil!</b> Komponen Layout telah ditambahkan kembali.</Alert>
              <Alert type="info">Halaman ini sekarang menampilkan semua 6 kategori komponen.</Alert>
            </Section>

            {/* 6. SECTION COMPONENT */}
            <Section title="6. Section Component" description="Digunakan untuk memisahkan setiap blok materi di halaman ini.">
              <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 text-sm italic">
                "Komponen Section adalah pembungkus yang kamu lihat sekarang (judul besar dan garis pemisah)."
              </div>
            </Section>

          </div>
          
          {/* IMPLEMENTASI LAYOUT: FOOTER DI BAGIAN PALING BAWAH */}
          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default Components;