"use client";
import Navbar from "../components/Navbar";
import SectionAboutUs from "../components/SectionAboutUs";
import SectionServices from "../components/SectionServices";

import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <ChatWidget />
      <SectionAboutUs />
      <SectionServices />

      <Footer />
    </div>
  );
}
