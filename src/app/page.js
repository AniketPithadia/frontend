import Navbar from "../components/Navbar";
import SectionAboutUs from "../components/SectionAboutUs";
import SectionServices from "../components/SectionServices";

import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <SectionAboutUs />
      <SectionServices />
      {/* <SectionContactUs /> */}
      <Footer />
    </div>
  );
}
