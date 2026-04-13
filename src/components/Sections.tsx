import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks";
import { MagneticButton } from "./Effects";

// ═══════════════════════════════════════════════
// MARQUEE SECTION — Diagonal stripe background
// ═══════════════════════════════════════════════

const marqueeItems = [
  "Graphic Design", "•", "Video Editing", "•", "UI/UX", "•", "Development", "•",
  "Branding", "•", "Motion Graphics", "•", "Illustration", "•", "Photography", "•",
];

export const MarqueeSection = () => {
  const content = [...marqueeItems, ...marqueeItems];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative py-10 overflow-hidden border-y border-border/50"
      style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 40px,
          hsl(var(--primary) / 0.03) 40px,
          hsl(var(--primary) / 0.03) 80px
        )`,
      }}
    >
      <div className="flex whitespace-nowrap animate-marquee mb-6">
        {content.map((item, i) => (
          <span
            key={`top-${i}`}
            className={`mx-4 text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight ${
              item === "•" ? "text-primary" : i % 4 === 0 ? "text-foreground" : "text-outline dark:text-outline-dark"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="flex whitespace-nowrap animate-marquee-reverse">
        {content.map((item, i) => (
          <span
            key={`bot-${i}`}
            className={`mx-4 text-2xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tight ${
              item === "•" ? "text-primary" : i % 3 === 0 ? "text-foreground/80" : "text-outline dark:text-outline-dark"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════
// WORK SECTION — Dot grid pattern background
// ═══════════════════════════════════════════════

const cards = [
  { icon: "👤", title: "About Me", desc: "Learn about my journey, education, and creative passion", modal: "about" },
  { icon: "💼", title: "Portfolio", desc: "Explore my featured projects across different mediums", modal: "work" },
  { icon: "📄", title: "Resume", desc: "Download my professional resume and qualifications", modal: "resume" },
  { icon: "🔗", title: "Social", desc: "Connect with me across various platforms", modal: "links" },
  { icon: "✉️", title: "Contact", desc: "Get in touch for collaborations or projects", modal: "contact" },
  { icon: "⚡", title: "Skills", desc: "Discover my technical expertise and design tools", modal: "skills" },
];

const gradients = ["gradient-bg-1", "gradient-bg-2", "gradient-bg-3", "gradient-bg-4", "gradient-bg-5", "gradient-bg-1"];

const TiltCard3D = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-20px) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-500 cursor-pointer ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

interface WorkSectionProps {
  onOpenModal: (id: string) => void;
}

export const WorkSection = ({ onOpenModal }: WorkSectionProps) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      id="work"
      className="py-32 px-8 md:px-16 max-w-[1400px] mx-auto relative"
      ref={ref}
      style={{
        backgroundImage: `radial-gradient(circle, hsl(var(--foreground) / 0.04) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }}
    >
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-[10%] w-[200px] h-[200px] bg-accent/5 rounded-full blur-[80px]" />

      <div className={`text-center mb-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <span className="inline-block px-5 py-2 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-6">
          Explore
        </span>

        <div className="flex items-center justify-center gap-10 mb-6">
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:block glass rounded-2xl px-7 py-5 shadow-premium flex-shrink-0"
          >
            <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Creative</div>
            <div className="font-display text-3xl font-bold gradient-text">Expert</div>
          </motion.div>
          <div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5">
              What I <span className="gradient-text-aurora">Offer</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-[500px] mx-auto">
              Click on any card below to discover more about my work, skills, and creative process
            </p>
          </div>
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="hidden lg:block glass rounded-2xl px-7 py-5 shadow-premium flex-shrink-0"
          >
            <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Technical</div>
            <div className="font-display text-3xl font-bold gradient-text">Premium</div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.modal}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard3D onClick={() => onOpenModal(card.modal)} className="">
              <div className="glass rounded-[30px] p-10 md:p-12 text-center relative overflow-hidden group hover:shadow-premium transition-all duration-500 h-full">
                <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-primary/8 to-transparent group-hover:left-full transition-all duration-700 pointer-events-none" />
                <div className="absolute inset-0 rounded-[30px] border border-transparent group-hover:border-primary/30 transition-colors duration-500" />

                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className={`absolute inset-0 ${gradients[i]} rounded-[22px] opacity-90 group-hover:scale-110 group-hover:rotate-[10deg] transition-all duration-500`} />
                  <div className="relative w-full h-full flex items-center justify-center text-4xl z-10">
                    {card.icon}
                  </div>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold mb-3 transition-colors group-hover:text-primary">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>

                <div className="mt-6 flex justify-center">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    →
                  </span>
                </div>
              </div>
            </TiltCard3D>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════
// TESTIMONIALS SECTION — Gradient mesh background
// ═══════════════════════════════════════════════

const testimonials = [
  {
    name: "Wileover Gordove",
    role: "IT Professional",
    text: "Ashley's designs transformed our brand identity completely. The attention to detail and creative vision exceeded all expectations. A true visionary!",
    emoji: "💻",
    gradient: "gradient-bg-2",
  },
  {
    name: "Shelou Cagulada",
    role: "IT Specialist",
    text: "The video editing quality is exceptional. Fast turnaround, incredible creativity, and always goes above and beyond. Highly recommended!",
    emoji: "🖥️",
    gradient: "gradient-bg-3",
  },
];

export const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="py-32 px-8 md:px-16 relative overflow-hidden" ref={ref}>
      {/* Unique: Large gradient mesh blobs */}
      <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-accent/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-secondary/6 rounded-full blur-[130px]" />
      {/* Unique: Decorative quote marks */}
      <div className="absolute top-20 left-[10%] text-[200px] font-display font-black text-primary/[0.03] leading-none select-none pointer-events-none">"</div>
      <div className="absolute bottom-20 right-[10%] text-[200px] font-display font-black text-primary/[0.03] leading-none select-none pointer-events-none rotate-180">"</div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-5 py-2 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5">
            What Clients <span className="gradient-text-aurora">Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-[500px] mx-auto">
            Real feedback from amazing people I've had the pleasure to work with
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass rounded-[30px] p-8 md:p-10 relative overflow-hidden group hover:shadow-premium transition-all duration-500 h-full border-l-4 border-l-primary/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors duration-500" />
                
                {/* Quote mark */}
                <div className="text-6xl text-primary/15 font-display font-black absolute top-4 right-6 leading-none">"</div>
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} className="text-primary text-sm">★</span>
                  ))}
                </div>
                
                <p className="text-base text-foreground/80 leading-relaxed mb-6 relative z-10 italic">
                  "{t.text}"
                </p>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-12 h-12 ${t.gradient} rounded-full flex items-center justify-center text-2xl shadow-glow`}>
                    {t.emoji}
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════
// PROCESS SECTION — Horizontal line + numbered timeline
// ═══════════════════════════════════════════════

const steps = [
  { num: "01", title: "Discovery", desc: "Understanding your vision, goals, and the audience we're designing for.", icon: "🔍" },
  { num: "02", title: "Design", desc: "Crafting stunning visuals and interfaces that tell your brand's story.", icon: "🎨" },
  { num: "03", title: "Develop", desc: "Building with modern tools ensuring performance and pixel-perfection.", icon: "⚙️" },
  { num: "04", title: "Deliver", desc: "Polished, tested, and ready to make an impact in the real world.", icon: "🚀" },
];

export const ProcessSection = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      className="py-32 px-8 md:px-16 relative overflow-hidden"
      ref={ref}
      style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.02) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.02) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    >
      {/* Unique: Gradient sweep from left */}
      <div className="absolute top-0 left-0 w-[60%] h-full bg-gradient-to-r from-primary/[0.03] to-transparent pointer-events-none" />
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] border border-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-5 py-2 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
            Process
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5">
            How I <span className="gradient-text-aurora">Work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-[500px] mx-auto">
            A proven creative process that delivers exceptional results every time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-[12.5%] right-[12.5%] h-[2px] -translate-y-1/2">
            <div className="w-full h-full bg-gradient-to-r from-primary/30 via-accent/20 to-secondary/30" />
            {/* Animated dot traveling the line */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-glow"
              animate={{ left: ["0%", "100%", "0%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass rounded-[30px] p-10 text-center group hover:shadow-premium transition-all duration-500 hover:-translate-y-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Large faded step number */}
                <div className="absolute -top-4 -right-2 font-display text-[80px] font-black text-primary/[0.04] leading-none select-none pointer-events-none">
                  {step.num}
                </div>
                <div className="font-mono text-xs text-primary/50 uppercase tracking-[0.3em] mb-6 relative z-10">
                  Step {step.num}
                </div>
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 bg-primary/10 animate-blob-morph" />
                  <div className="relative w-full h-full flex items-center justify-center text-4xl z-10">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 relative z-10">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════
// PREMIUM FOOTER — Radial gradient background
// ═══════════════════════════════════════════════

interface PremiumFooterProps {
  onOpenModal: (id: string) => void;
}

export const PremiumFooter = ({ onOpenModal }: PremiumFooterProps) => {
  return (
    <footer className="relative overflow-hidden">
      <div className="py-32 px-8 md:px-16 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10" />
        {/* Unique: radial glow behind CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.06] rounded-full blur-[120px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[800px] mx-auto relative z-10"
        >
          <span className="inline-block px-5 py-2 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-8">
            Let's Connect
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight mb-8">
            Ready to create
            <br />
            <span className="gradient-text-aurora">something epic?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-[500px] mx-auto">
            I'm always open to new projects, collaborations, and creative challenges. Let's talk.
          </p>
          <MagneticButton
            onClick={() => onOpenModal("contact")}
            className="px-14 py-5 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-premium hover-glow border-none"
          >
            Get In Touch →
          </MagneticButton>
        </motion.div>
      </div>

      <div className="py-8 px-8 md:px-16 border-t border-border/50">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse-dot" />
            <span className="font-display text-lg font-extrabold">Ashley Sanares</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 • Crafted with passion and precision
          </p>
          <div className="flex gap-6">
            {[
              { name: "YouTube", href: "https://youtube.com/@alwaysfashionablylate" },
              { name: "Instagram", href: "https://www.instagram.com/latebut.luxe" },
              { name: "Facebook", href: "https://www.facebook.com/nsxgaminghub/" },
            ].map(l => (
              <a
                key={l.name}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 no-underline relative group"
              >
                {l.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
