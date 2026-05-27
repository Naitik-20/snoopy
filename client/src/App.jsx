import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import AddWholesaler from "./pages/AddWholesaler";
import AdminDashboard from "./pages/AdminDashboard";
import WholesalerProducts from "./pages/WholesalerProducts";

import "./components/site.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addwholesaler" element={<AddWholesaler />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
<Route path="/wholesale-products" element={<WholesalerProducts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}