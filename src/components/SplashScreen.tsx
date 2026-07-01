import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import splashLogo from "@/assets/splash-logo.webp";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const step = 100 / (duration / interval);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return Math.min(prev + step + Math.random() * 0.5, 100);
      });
    }, interval);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src={splashLogo}
        alt="ISHAN BETA MD"
        className="w-20 h-20 object-contain mb-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.h1
        className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        ISHAN BETA MD
      </motion.h1>
      <motion.div
        className="w-40 h-[2px] rounded-full bg-white/10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
