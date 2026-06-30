import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-transparent pt-28 md:pt-32"
    >
      {/* Subtle radial spotlight, like Apple WWDC hero */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,255,255,0.10),transparent_60%)]" />

      <div className="container relative z-10 flex flex-col items-center text-center px-6">
        {/* Title with halo glow */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative font-display font-extrabold tracking-tight text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="relative inline-block">
            {/* Halo glow behind the right side, mimicking WWDC */}
            <span
              aria-hidden="true"
              className="absolute right-[-8%] top-1/2 -translate-y-1/2 h-[120%] w-[55%] rounded-full bg-white/70 blur-3xl opacity-70"
            />
            <span className="relative">ISHAN BETA MD</span>
          </span>
        </motion.h1>

        {/* Description paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 max-w-2xl text-xl sm:text-2xl md:text-3xl leading-snug text-white font-body font-medium"
        >
          Advanced WhatsApp automation powered by intelligent commands. Expanded
          features, multi-device support, and helpful updates all around.
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 text-base md:text-lg text-neutral-400 font-body"
        >
          Available now — PRO
        </motion.p>

        {/* Pill buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="https://ishan-x-md-beta-pair-web-production-051b.up.railway.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] transition-colors px-7 py-3 text-white text-base md:text-lg font-body font-medium min-w-[200px]"
          >
            <ExternalLink className="w-4 h-4" />
            Get pair code
          </a>
          <a
            href="https://github.com/ishanxmd/ISHAN-X-BETA-MD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0071e3] text-[#2997ff] hover:bg-[#0071e3]/10 transition-colors px-7 py-3 text-base md:text-lg font-body font-medium min-w-[200px]"
          >
            <Github className="w-4 h-4" />
            Get the repo
          </a>
          <a
            href="https://ishan-x-pro-mini-by-ishan-2006.up.railway.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] transition-colors px-7 py-3 text-white text-base md:text-lg font-body font-medium min-w-[200px]"
          >
            <ExternalLink className="w-4 h-4" />
            Get Mini
          </a>
        </motion.div>

        {/* Product showcase image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-14 md:mt-20 w-full max-w-5xl"
        >
          <img
            src="https://raw.githubusercontent.com/minibotsjsisns/IMAGE_DATA/refs/heads/main/file_0000000090b871fb9f8bc639c6797377.png"
            alt="ISHAN BETA MD device showcase"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
