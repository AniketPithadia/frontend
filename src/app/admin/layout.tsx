"use client";

import Navbar from "../../components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
