import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LayoutGrid, EyeOff, Download, MessageCircle, UsersRound, Music } from "lucide-react";

const features = [
  { icon: LayoutGrid, title: "Movies & TV", desc: "Download Sinhala subtitled movies directly." },
  { icon: EyeOff, title: "Privacy Pro", desc: "View Once recovery and Anti-Delete system." },
  { icon: Download, title: "Downloader", desc: "TikTok, FB, Insta & YouTube support." },
  { icon: MessageCircle, title: "AI Chat", desc: "Integrated ISHAN-X AI for smart conversations.", href: "/chat" },
  { icon: UsersRound, title: "Group Tools", desc: "Full admin control and member management." },
  { icon: Music, title: "Music Hub", desc: "MP3 Songs with lyrics and album art." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 md:py-32 bg-transparent">
      <div className="container px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-semibold tracking-tight text-white text-center mb-4"
        >
          Powerful features.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-white/60 text-center mb-16 max-w-xl mx-auto"
        >
          Everything you need. Nothing you don't.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              viewport={{ once: true }}
            >
              {f.href ? (
                <Link
                  to={f.href}
                  className="block rounded-3xl bg-white/[0.04] border border-white/10 p-8 hover:bg-white/[0.07] hover:border-[#0071e3]/50 transition-colors cursor-pointer h-full"
                >
                  <f.icon className="w-8 h-8 text-white mb-6" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold tracking-tight text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
                </Link>
              ) : (
                <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-8 hover:bg-white/[0.07] transition-colors h-full">
                  <f.icon className="w-8 h-8 text-white mb-6" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold tracking-tight text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
