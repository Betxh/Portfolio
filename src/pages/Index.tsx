import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { CustomCursor, AuroraBackground, DarkModeParticles, SoundToggle } from "@/components/Effects";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { MarqueeSection, WorkSection, TestimonialsSection, ProcessSection, PremiumFooter } from "@/components/Sections";
import ModalContents from "@/components/ModalContents";
import InteractiveDuck from "@/components/InteractiveDuck";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const openModal = (id: string) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);
  const handleLoadComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>
      <AuroraBackground />
      <DarkModeParticles />
      <CustomCursor />
      <Navbar onOpenModal={openModal} />
      <HeroSection onOpenModal={openModal} />
      <MarqueeSection />
      <WorkSection onOpenModal={openModal} />
      <TestimonialsSection />
      <ProcessSection />
      <PremiumFooter onOpenModal={openModal} />
      <SoundToggle />
      <InteractiveDuck />
      <ModalContents activeModal={activeModal} onClose={closeModal} />
    </>
  );
};

export default Index;
