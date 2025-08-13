import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { EquipmentCategories } from "@/components/EquipmentCategories";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <EquipmentCategories />
      <HowItWorks />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
