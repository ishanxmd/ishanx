import { motion } from "framer-motion";
import { MessageCircle, Radio } from "lucide-react";

const CommunitySection = () => {
  return (
    <section className="py-24 md:py-32 bg-transparent">
      <div className="container px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-semibold tracking-tight text-white text-center mb-4"
        >
          Join the community.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-white/60 text-center mb-12 max-w-xl mx-auto"
        >
          Thousands of users. One conversation.
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
          <a
            href="https://chat.whatsapp.com/C5jE3Tk7U0RBGcR6kwRSUi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] transition-colors px-7 py-3 text-white text-base font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Support group
          </a>
          <a
            href="https://whatsapp.com/channel/0029VbAe6Nt545uv1kaCDE3j"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-[#0071e3] text-[#2997ff] hover:bg-[#0071e3]/10 transition-colors px-7 py-3 text-base font-medium"
          >
            <Radio className="w-4 h-4" />
            Join channel
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
