import "@/App.css";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSlider } from "@/components/ServicesSlider";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <ServicesSlider />
      <HowItWorks />
      <FAQ />
      <ContactCTA />
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
