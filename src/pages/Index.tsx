import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import BackgroundVideo from "@/components/BackgroundVideo";
import HeroSection from "@/components/HeroSection";
import TechStackSection from "@/components/TechStackSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CommandsSection from "@/components/CommandsSection";
import DownloadSection from "@/components/DownloadSection";
import CommunitySection from "@/components/CommunitySection";
import DeveloperSection from "@/components/DeveloperSection";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

const SPLASH_KEY = "splashShown";

const Index = () => {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(SPLASH_KEY) !== "true";
    }
    return true;
  });

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    sessionStorage.setItem(SPLASH_KEY, "true");
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>
      <BackgroundVideo />
      <div className={`min-h-screen overflow-x-hidden relative ${showSplash ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <Navbar />
        <HeroSection />
        <TechStackSection />
        <StatsSection />
        <FeaturesSection />
        <CommandsSection />
        <DownloadSection />
        <CommunitySection />
        <DeveloperSection />
        <Footer />
        <ChatWidget />
      </div>
    </>
  );
};

export default Index;
