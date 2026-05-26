import React from "react";
import PageHeader from "../components/PageHeader";
import Container from "../components/Container";
import Footer from "../components/Footer";
// Import Badge dari Shadcn UI yang baru kamu tambahkan
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const HOT_ISSUES = [
    { id: 1, topic: "Transformasi Digital UMKM", category: "Ekonomi", trend: "Meningkat", status: "Viral" },
    { id: 2, topic: "Pembangunan IKN Nusantara", category: "Infrastruktur", trend: "Stabil", status: "Hot" },
    { id: 3, topic: "Subsidi Energi Tepat Sasaran", category: "Politik", trend: "Meningkat", status: "Trending" },
    { id: 4, topic: "Krisis Iklim & Cuaca Extrem", category: "Lingkungan", trend: "Meningkat", status: "Urgent" },
    { id: 5, topic: "Keamanan Data Nasional", category: "Teknologi", trend: "Meningkat", status: "Hot" },
];

const FiturXyz = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader
                title="Fitur Xyz"
                breadcrumb="Dashboard / Order List"
            />

            <Container className="mt-6 pb-12">
                <div className="space-y-6">
                    {/* --- SECTION DEMO COMPONENT --- */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                        <div className="flex flex-wrap gap-4 mb-8">
                            <Button variant="outline">Batal</Button>
                            <Button variant="ghost">Batal</Button>
                            <Button variant="destructive">Batal</Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* Card Event dengan Shadcn Badge */}
                            <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
                                <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                                <img
                                    src="https://avatar.vercel.sh/shadcn1"
                                    alt="Event cover"
                                    className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                                />
                                <CardHeader>
                                    <div className="mb-2">
                                        {/* Menggunakan Badge Shadcn dengan variant secondary */}
                                        <Badge variant="secondary" className="rounded-md">Featured</Badge>
                                    </div>
                                    <CardTitle>Design systems meetup</CardTitle>
                                    <CardDescription>
                                        A practical talk on component APIs, accessibility, and shipping faster.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button className="w-full">View Event</Button>
                                </CardFooter>
                            </Card>

                            {/* Card Default */}
                            <Card className="w-full h-full">
                                <CardHeader>
                                    <CardTitle>Status Komponen</CardTitle>
                                    <CardDescription>Menggunakan variant Badge Shadcn</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                    <Badge>Default</Badge>
                                    <Badge variant="secondary">Secondary</Badge>
                                    <Badge variant="outline">Outline</Badge>
                                    <Badge variant="destructive">Destructive</Badge>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Section Tabel */}
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Monitoring Isu Terkini</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-400 font-black uppercase text-[10px] tracking-[0.1em]">
                                    <tr>
                                        <th className="px-6 py-4">No</th>
                                        <th className="px-6 py-4">Topik Isu</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {HOT_ISSUES.map((issue, index) => (
                                        <tr key={issue.id} className="hover:bg-emerald-50/30 transition-all">
                                            <td className="px-6 py-5 font-bold text-gray-300">
                                                {String(index + 1).padStart(2, '0')}
                                            </td>
                                            <td className="px-6 py-5 font-bold text-gray-800">{issue.topic}</td>
                                            <td className="px-6 py-5">
                                                {/* Logika warna menggunakan variant Shadcn */}
                                                <Badge 
                                                    variant={issue.status === 'Urgent' ? 'destructive' : 'outline'}
                                                    className="capitalize"
                                                >
                                                    {issue.status}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Footer />
            </Container>
        </div>
    );
};

export default FiturXyz;