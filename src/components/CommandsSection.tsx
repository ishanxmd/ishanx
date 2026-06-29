import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const commands = [
  ".alive", ".menu", ".movie", ".song", ".fb", ".tiktok",
  ".vv", ".apk", ".image", ".logo", ".video", ".anime",
  ".jid", ".pin", ".join", ".forward",
];

const CommandsSection = () => {
  return (
    <section id="commands" className="py-24 md:py-32 bg-transparent">
      <div className="container px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-semibold tracking-tight text-white text-center mb-4"
        >
          Just type a command.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-white/60 text-center mb-16 max-w-xl mx-auto"
        >
          A familiar terminal. An entirely new feeling.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto rounded-3xl bg-white/[0.04] border border-white/10 overflow-hidden"
        >
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex items-center gap-2 ml-3 text-white/40 text-xs">
              <Terminal className="w-3.5 h-3.5" />
              <span>ishan — bot</span>
            </div>
          </div>
          <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {commands.map((cmd, i) => (
              <motion.div
                key={cmd}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                viewport={{ once: true }}
                className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-center font-mono text-sm text-white/90 hover:bg-white/[0.08] transition-colors"
              >
                {cmd}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommandsSection;
