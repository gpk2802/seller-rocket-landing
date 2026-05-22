import { AdminDashboard } from "./components/admin/AdminDashboard";
import { Hero } from "./components/landing/Hero";
import { ContactSection } from "./components/landing/ContactSection";
import { Footer } from "./components/landing/Footer";
import { GrowthSections } from "./components/landing/GrowthSections";
import { MarketplaceStrip } from "./components/landing/MarketplaceStrip";
import { Navbar } from "./components/landing/Navbar";
import { ServicesSection } from "./components/landing/ServicesSection";
import { AppToaster } from "./components/ui/toaster";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarketplaceStrip />
        <ServicesSection />
        <GrowthSections />
        <ContactSection />
        <AdminDashboard />
      </main>
      <Footer />
      <AppToaster />
    </>
  );
}
