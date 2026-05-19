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

      <Container className="mt-6">
        <div className="space-y-6">
          {/* 1 & 2. BASIC COMPONENTS (CITA RASA INVENTARIS) */}
          <Section title="1 & 2. BASIC COMPONENTS (BUTTON, AVATAR, BADGE)">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Inventory Actions</Label>
                <div className="flex gap-2 mt-4">
                  <Button className="bg-[#00B074] text-white">
                    Add Product
                  </Button>
                  <Button type="danger">Remove</Button>
                </div>
              </div>
              <div>
                <Label>System Admin</Label>
                <div className="flex gap-2 mt-4">
                  <Avatar name="S" /> {/* Suci Dwi Mayasari */}
                  <Avatar name="A" />
                </div>
              </div>
              <div>
                <Label>Category Badges</Label>
                <div className="flex gap-2 mt-4">
                  <Badge type="info">ELECTRONICS</Badge>
                  <Badge type="warning">FURNITURE</Badge>
                  <Badge type="success">APPAREL</Badge>
                </div>
              </div>
            </div>
          </Section>

          {/* 3. DATA DISPLAY - TABLE INVENTORY (Sesuai image_07f404.png) */}
          <Section title="3. DATA DISPLAY (INVENTORY TABLE)">
            <div className="overflow-hidden border border-gray-100 rounded-xl bg-white shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-4">Code</th>
                    <th className="px-4 py-4">Product Name</th>
                    <th className="px-4 py-4">Category</th>
                    <th className="px-4 py-4">Price</th>
                    <th className="px-4 py-4">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-4 font-bold text-emerald-600">
                      PRD-001
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-800">
                      Samsung Galaxy S23
                    </td>
                    <td className="px-4 py-4">
                      <Badge type="info">ELECTRONICS</Badge>
                    </td>
                    <td className="px-4 py-4 font-bold">Rp 12.500.000</td>
                    <td className="px-4 py-4 text-emerald-500 font-bold text-xs">
                      15 PCS
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-bold text-emerald-600">
                      PRD-006
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-800">
                      MacBook Pro M2
                    </td>
                    <td className="px-4 py-4">
                      <Badge type="info">ELECTRONICS</Badge>
                    </td>
                    <td className="px-4 py-4 font-bold">Rp 21.000.000</td>
                    <td className="px-4 py-4 text-red-500 font-bold text-xs">
                      5 PCS
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* 4. FORM COMPONENTS (Sesuai field inventory) */}
          <Section title="4. FORM COMPONENTS (NEW PRODUCT FORM)">
            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>PRODUCT NAME</Label>
                  <Input placeholder="e.g. Sony WH-1000XM5" />
                </div>
                <div>
                  <Label>PRICE (RP)</Label>
                  <Input type="number" placeholder="5200000" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>BRAND</Label>
                  <Input placeholder="Sony" />
                </div>
                <div>
                  <Label>STOCK AMOUNT</Label>
                  <Input type="number" placeholder="12" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button className="bg-gray-100 text-gray-600 px-8">
                  Discard
                </Button>
                <Button className="bg-[#00B074] text-white px-8">
                  Add New Product
                </Button>
              </div>
            </div>
          </Section>

          {/* 5. FEEDBACK COMPONENTS */}
          <Section title="5. FEEDBACK COMPONENTS">
            <div className="space-y-4">
              <Alert type="success">
                Product <b>Samsung Galaxy S23</b> has been updated.
              </Alert>
              <Alert type="danger">
                Low Stock Alert: <b>MacBook Pro M2</b> (Only 5 left).
              </Alert>
            </div>
          </Section>

          {/* 6. SECTION COMPONENTS (PROMO BANNER) */}
          <Section title="6. SECTION COMPONENTS (DASHBOARD BANNER)">
            <div className="rounded-[2.5rem] bg-[#0F172A] text-white p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-xl">
              <div className="flex-1 z-10">
                <span className="bg-blue-500/20 text-blue-400 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                  Tech Inventory 2026
                </span>
                <h2 className="text-4xl font-bold mt-6 leading-tight">
                  Manage Your <span className="text-emerald-400">Products</span>{" "}
                  More Efficiently
                </h2>
                <p className="text-gray-400 mt-6 text-sm max-w-sm leading-relaxed">
                  Track stock levels, categories, and pricing for all your
                  electronics and furniture items in one place.
                </p>
                <Button className="bg-[#00B074] text-white mt-8 px-10 hover:bg-[#009663] transition-colors">
                  View All Stock
                </Button>
              </div>

              <div className="flex-1 relative w-full">
                {/* Link Gambar Baru yang Stabil */}
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
                  alt="Tech Inventory Banner"
                  className="rounded-[2rem] shadow-2xl w-full h-64 object-cover object-center transform md:rotate-3 hover:rotate-0 transition-transform duration-500"
                />

                {/* Efek hiasan blur di belakang gambar */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </Section>

          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default Components;
