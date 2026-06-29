import { motion } from "framer-motion";
import { Download } from "lucide-react";

const DownloadSection = () => {
  return (
    <section id="download" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="container px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-5">
            Ship it yourself.
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-10">
            Get the complete source. Deploy your own instance in minutes.
          </p>
          <a
            href="https://github.com/ishanxmd/ISHAN-X-BETA-MD/archive/refs/heads/main.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] transition-colors px-7 py-3 text-white text-base font-medium min-w-[220px]"
          >
            <Download className="w-4 h-4" />
            Download source
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadSection;
