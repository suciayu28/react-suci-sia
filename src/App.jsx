import React, { Suspense } from "react"; 
import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";
import Loading from "./components/Loading";

// format Lazy
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Products = React.lazy(() => import("./pages/Products")); 
const ProductDetail = React.lazy(() => import("./pages/ProductDetail")); 

// TAMBAHKAN INI: Import lazy untuk halaman detail customer
const CustomersDetail = React.lazy(() => import("./pages/CustomersDetail")); 

// TAMBAHKAN INI: Import lazy untuk halaman Components (Playground)
const Components = React.lazy(() => import("./pages/Components"));

const Orders = React.lazy(() => import("./pages/Orders"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const ErrorPage = React.lazy(() => import("./pages/NotFound"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

// Import Gambar untuk Error Pages
import img400 from "./assets/400.png";
import img401 from "./assets/401.png";
import img403 from "./assets/403.png";
import img404 from "./assets/404.png";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Rute yang menggunakan Sidebar & Navbar (MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          
          {/* TAMBAHKAN INI: Route baru untuk detail customer */}
          <Route path="/customers/:id" element={<CustomersDetail />} />
          
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* TAMBAHKAN INI: Route baru untuk halaman Components sesuai Modul Pertemuan 10 */}
          <Route path="/components" element={<Components />} />

          {/* Error Pages */}
          <Route path="/400" element={<ErrorPage code="400" title="Oops!" description="Error 400" image={img400} />} />
          <Route path="/401" element={<ErrorPage code="401" title="Akses Tidak Sah" description="Error 401" image={img401} />} />
          <Route path="/403" element={<ErrorPage code="403" title="Akses Ditolak" description="Error 403" image={img403} />} />
          <Route path="*" element={<ErrorPage code="404" title="Page Not Found" description="Error 404" image={img404} />} />
        </Route>

        {/* AuthLayout: Login/Register dengan nuansa Rose/Pink */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;