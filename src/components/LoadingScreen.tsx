import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("reveal");
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "reveal" || progress < 100 ? null : null}
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* Duck SVG animation */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 mb-8"
        >
          <svg width="120" height="120" viewBox="0 0 90 90" style={{ overflow: "visible" }}>
            <defs>
              <radialGradient id="loadBodyGrad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="hsl(42,45%,82%)" />
                <stop offset="100%" stopColor="hsl(38,40%,70%)" />
              </radialGradient>
              <radialGradient id="loadHeadGrad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="hsl(42,45%,85%)" />
                <stop offset="100%" stopColor="hsl(38,40%,72%)" />
              </radialGradient>
            </defs>
            <ellipse cx="40" cy="55" rx="28" ry="22" fill="url(#loadBodyGrad)" />
            <circle cx="39" cy="28" r="20" fill="url(#loadHeadGrad)" />
            {/* Sunglasses */}
            <rect x="22" y="16" width="16" height="12" rx="3" fill="hsl(0,0%,12%)" stroke="hsl(0,0%,10%)" strokeWidth="2.5" />
            <rect x="40" y="16" width="16" height="12" rx="3" fill="hsl(0,0%,12%)" stroke="hsl(0,0%,10%)" strokeWidth="2.5" />
            <line x1="38" y1="22" x2="40" y2="22" stroke="hsl(0,0%,10%)" strokeWidth="2.5" />
            <line x1="56" y1="22" x2="61" y2="19" stroke="hsl(0,0%,10%)" strokeWidth="2" strokeLinecap="round" />
            {/* Scarf */}
            <path d="M 18 42 Q 28 48 40 46 Q 52 44 62 42" fill="none" stroke="hsl(140,65%,32%)" strokeWidth="7" strokeLinecap="round" />
            <path d="M 18 42 Q 28 48 40 46 Q 52 44 62 42" fill="none" stroke="hsl(140,75%,55%)" strokeWidth="7" strokeLinecap="round" strokeDasharray="4 5" />
            <ellipse cx="39" cy="34" rx="8" ry="4" fill="hsl(30,100%,55%)" />
            <ellipse cx="30" cy="75" rx="9" ry="3.5" fill="hsl(25,100%,55%)" />
            <ellipse cx="50" cy="75" rx="9" ry="3.5" fill="hsl(25,100%,55%)" />
          </svg>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative z-10 font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-2"
        >
          Ashley Sanares
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative z-10 text-sm text-muted-foreground mb-10 tracking-widest uppercase"
        >
          Creative Portfolio
        </motion.p>

        {/* Progress bar */}
        <div className="relative z-10 w-48 h-1 bg-border/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 mt-3 text-xs text-muted-foreground font-mono"
        >
          {Math.min(Math.floor(progress), 100)}%
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
