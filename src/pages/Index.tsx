import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
// import AutomationDemo from "@/components/AutomationDemo"; // Temporarily commented out if it causes issues, but it should be fine. Wait, I added it in previous step.
import AutomationDemo from "@/components/AutomationDemo";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get("section");
    const fromHash = window.location.hash?.replace("#", "");
    const target = (fromQuery || fromHash || "").trim();
    if (!target) return;

    // Wait for layout to paint before scrolling
    window.requestAnimationFrame(() => {
      const el = document.getElementById(target);
      el?.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }, []);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AutomationDemo />
      <ProcessSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ChatWidget />
    </main>
  );
};

export default Index;

