import { motion } from "framer-motion";
import devPhoto from "@/assets/developer-photo.png";
import { MessageCircle, Github } from "lucide-react";

const DeveloperSection = () => {
  return (
    <section id="developer" className="py-24 md:py-32 bg-transparent">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto rounded-3xl bg-white/[0.04] border border-white/10 p-10 md:p-14 text-center"
        >
          <img
            src={devPhoto}
            alt="I.G Ishan Madusanke"
            className="w-24 h-24 mx-auto rounded-full object-cover mb-6"
          />
          <p className="text-xs uppercase tracking-widest text-white/50 mb-3">Meet the developer</p>
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-5">
            I.G Ishan Madusanke
          </h3>
          <p className="text-base md:text-lg text-white/60 mb-10 leading-relaxed">
            Full Stack Developer and creator of ISHAN-X BETA. On a mission to simplify
            communication through advanced automation — made for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/message/VANGHDPNKJLEB1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] transition-colors px-7 py-3 text-white text-base font-medium min-w-[180px]"
            >
              <MessageCircle className="w-4 h-4" />
              Contact me
            </a>
            <a
              href="https://github.com/ishanxmd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0071e3] text-[#2997ff] hover:bg-[#0071e3]/10 transition-colors px-7 py-3 text-base font-medium min-w-[180px]"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperSection;
