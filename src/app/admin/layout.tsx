"use client";

import Navbar from "../../components/Navbar";
import AdminCheck from "../../components/AdminCheck";
export default function AdminLayout({ children }) {
  return (
    <div>
      <Navbar />
      <AdminCheck>{children}</AdminCheck>
    </div>
  );
}
