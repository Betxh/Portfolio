import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCountUp, useScrollReveal } from "@/hooks";
import { FloatingOrbs, MagneticButton } from "./Effects";
import heroImage from "@/assets/hero-portrait.jpg";

interface HeroSectionProps {
  onOpenModal: (id: string) => void;
}

const TypingText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const speed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(text.slice(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === text.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayed(text.slice(0, index - 1));
        setIndex(index - 1);
        if (index <= 1) {
          setIsDeleting(false);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [index, isDeleting, text]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 animate-pulse align-middle" />
    </span>
  );
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "";
  };

  return (
    <div ref={cardRef} className={`transition-transform duration-300 ease-out ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
};

const HeroSection = ({ onOpenModal }: HeroSectionProps) => {
  const { ref: statsRef, isVisible } = useScrollReveal(0.3);
  const projects = useCountUp(10, isVisible);
  const clients = useCountUp(2, isVisible);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section id="home" ref={sectionRef} className="min-h-screen flex items-center pt-28 pb-20 px-8 md:px-16 relative overflow-hidden">
      <motion.div
        className="absolute -top-[10%] -right-[10%] w-[800px] h-[800px] bg-primary/8 rounded-full blur-[120px]"
        style={{ y: parallaxY }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[-15%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
      />

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center relative z-[1]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-sm font-medium text-muted-foreground">Available for freelance work</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-[92px] font-black leading-[0.95] mb-8 tracking-tight"
          >
            <TypingText text="Ashley" />
            <br />
            <span className="gradient-text-aurora">Creative</span>
            <br />
            <span className="text-outline dark:text-outline-dark transition-all duration-500">Specialist</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-6 font-mono tracking-wide"
          >
            Graphic Designer • Video Editor • Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-muted-foreground/80 leading-relaxed mb-12 max-w-[550px]"
          >
            I craft exceptional digital experiences through the perfect blend of design sensibility
            and technical expertise. Every project is an opportunity to create something unforgettable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-5 mb-16"
          >
            <MagneticButton
              onClick={() => onOpenModal("contact")}
              className="px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-base shadow-premium hover-glow border-none group"
            >
              <span className="flex items-center gap-3">
                💼 Let's Work Together
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </MagneticButton>
            <MagneticButton
              onClick={() => onOpenModal("about")}
              className="px-10 py-5 rounded-full bg-transparent text-foreground font-semibold text-base border-2 border-border/50 hover:border-primary/50"
            >
              👋 More About Me
            </MagneticButton>
          </motion.div>

          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-3 gap-8"
          >
            {[
              { value: `${projects}+`, label: "Projects", gradient: "gradient-bg-1" },
              { value: `${clients}+`, label: "Happy Clients", gradient: "gradient-bg-2" },
              { value: "4 Mo", label: "Experience", gradient: "gradient-bg-3" },
            ].map((stat, i) => (
              <div key={i} className="relative pl-5 group cursor-default">
                <div className={`absolute left-0 top-1 w-1 h-10 rounded-full ${stat.gradient} transition-all duration-500 group-hover:h-full group-hover:opacity-70`} />
                <div className="font-display text-3xl md:text-5xl font-extrabold leading-none mb-2 transition-colors group-hover:text-primary">
                  {stat.value}
                </div>
                <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.15em]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center"
        >
          <FloatingOrbs />
          <TiltCard className="w-full max-w-[420px]">
            <div className="relative p-3 rounded-[32px] bg-card shadow-deep overflow-hidden z-[1] group">
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,_hsl(18,100%,56%),_hsl(30,93%,54%),_hsl(276,50%,47%),_hsl(209,98%,65%),_hsl(18,100%,56%))] animate-rotate-border z-[-1]" />
              <div className="absolute inset-[5px] bg-card rounded-[28px] z-[-1]" />
              <div className="w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-foreground/5 relative">
                <img
                  src={heroImage}
                  alt="Ashley Sanares"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </TiltCard>

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden xl:block absolute top-[15%] -right-16 glass rounded-2xl px-7 py-5 shadow-premium z-10"
          >
            <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Achievement</div>
            <div className="font-display text-2xl font-bold gradient-text">🏆 Best Researcher</div>
          </motion.div>
          <motion.div
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="hidden xl:block absolute bottom-[12%] -right-20 glass rounded-2xl px-7 py-5 shadow-premium z-10"
          >
            <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Certification</div>
            <div className="font-display text-2xl font-bold gradient-text">💻 NC II Certified</div>
          </motion.div>

          <div className="absolute -bottom-10 -left-10 w-24 h-24 border border-primary/20 rounded-full animate-counter-spin hidden lg:block" />
          <div className="absolute -top-8 -left-4 w-12 h-12 border border-accent/20 rounded-full animate-rotate-border hidden lg:block" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
