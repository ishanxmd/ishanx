import { motion } from "framer-motion";
import { FileCode2, Hexagon, MessageCircle, Database, Atom, Package, Cloud, Brush } from "lucide-react";

const techStack = [
  { icon: FileCode2, label: "JavaScript/ES6+" },
  { icon: Hexagon, label: "Node.js" },
  { icon: MessageCircle, label: "WA Bots" },
  { icon: Database, label: "MongoDB" },
  { icon: Atom, label: "React" },
  { icon: Package, label: "Flask" },
  { icon: Cloud, label: "Cloud APIs" },
  { icon: Brush, label: "UI/UX" },
];

const TechStackSection = () => {
  return (
    <section className="py-24 md:py-32 bg-transparent">
      <div className="container px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-white text-center mb-16"
        >
          Built with the best.
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {techStack.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/[0.07] transition-colors"
            >
              <item.icon
                className="w-8 h-8"
                strokeWidth={1.5}
                style={{ color: "#22d3ee", filter: "drop-shadow(0 0 8px rgba(34,211,238,0.8))" }}
              />
              <span className="text-sm text-white/80 text-center">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
