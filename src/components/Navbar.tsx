import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Features", id: "features" },
  { label: "Deploy", id: "commands" },
  { label: "Download", id: "download" },
  { label: "Developer", id: "developer" },
];

const Navbar = () => {
  const [active, setActive] = useState<string>("features");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      const offset = window.innerHeight / 3;
      let current = NAV_ITEMS[0].id;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = item.id;
        }
      }
      // If we've reached the bottom of the page, force-activate the last item
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = NAV_ITEMS[NAV_ITEMS.length - 1].id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-white/10"
    >
      <div className="max-w-5xl mx-auto px-6 h-11 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm font-semibold tracking-tight text-white"
        >
          ISHAN
        </button>
        <div className="hidden md:flex items-center rounded-full bg-white/[0.06] p-1 border border-white/10">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative rounded-full px-5 py-1.5 text-xs font-medium transition-colors ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/25 border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_3px_rgba(0,0,0,0.4)] backdrop-blur-sm pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>
        <a
          href="https://github.com/ishanxmd/ISHAN-X-BETA-MD"
          target="_blank"
          rel="noopener noreferrer"
          className="relative rounded-full px-5 py-1.5 text-xs italic font-semibold text-white bg-[#0071e3] hover:bg-[#0077ed] transition-colors"
        >
          GitHub
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
