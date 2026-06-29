import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { UsersRound, MessageSquareMore, Server, GitBranch } from "lucide-react";

const stats = [
  { icon: UsersRound, label: "ACTIVE USERS", value: "50K+", numericEnd: 50 },
  { icon: MessageSquareMore, label: "MESSAGES SENT", value: "10M+", numericEnd: 10 },
  { icon: Server, label: "SERVER UPTIME", value: "99.9%", numericEnd: 99.9 },
  { icon: GitBranch, label: "CURRENT VERSION", value: "PRO", numericEnd: 1 },
];

const useCountUp = (end: number, duration: number, inView: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, inView]);
  return count;
};

const StatCard = ({ icon: Icon, label, value, numericEnd, index, inView }: any) => {
  const count = useCountUp(numericEnd, 2000, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="rounded-3xl bg-white/[0.04] border border-white/10 p-8 text-center"
    >
      <Icon className="w-7 h-7 text-white/70 mx-auto mb-5" strokeWidth={1.5} />
      <div className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-2">
        {value}
      </div>
      <div className="text-xs uppercase tracking-widest text-white/50">{label}</div>
    </motion.div>
  );
};

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-transparent">
      <div className="container px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-white text-center mb-16"
        >
          A new standard.
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
