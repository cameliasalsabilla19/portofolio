import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import CommitmentsSection from "@/components/sections/CommitmentsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0d]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <PortfolioSection />
      <CommitmentsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
