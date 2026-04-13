import { useState, useEffect } from "react";
import { MagneticButton } from "./Effects";

// ─── Theme Toggle ───
const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center transition-all duration-500 hover:rotate-180 hover:border-primary text-xl"
      aria-label="Toggle dark mode"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
};

// ─── Navbar ───
interface NavbarProps {
  onOpenModal: (id: string) => void;
}

const Navbar = ({ onOpenModal }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
      
      const sections = ["home", "work"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "Home", action: () => scrollTo("home"), id: "home" },
    { label: "Work", action: () => scrollTo("work"), id: "work" },
    { label: "Contact", action: () => onOpenModal("contact"), id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 px-8 md:px-16 flex justify-between items-center z-[1000] animate-slide-down transition-all duration-500 ${
        scrolled
          ? "py-4 glass-strong shadow-lg"
          : "py-6 bg-background/40 backdrop-blur-md border-b border-border/30"
      }`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <MagneticButton className="bg-transparent border-none p-0" strength={0.2}>
        <div className="font-display text-2xl font-extrabold tracking-tight flex items-center gap-2.5">
          <div className="relative w-3 h-3">
            <span className="absolute inset-0 bg-primary rounded-full animate-pulse-dot" />
            <span className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
          </div>
          <span>Ashley</span>
          <span className="text-primary">.</span>
        </div>
      </MagneticButton>

      <div className="flex gap-2 items-center">
        {navItems.map((item) => (
          <MagneticButton
            key={item.id}
            onClick={item.action}
            className={`px-5 py-2.5 rounded-full text-sm font-medium border-none transition-all duration-300 ${
              activeSection === item.id
                ? "bg-primary/10 text-primary"
                : "bg-transparent text-foreground hover:bg-muted"
            }`}
            strength={0.15}
          >
            {item.label}
          </MagneticButton>
        ))}
        <div className="w-px h-6 bg-border mx-2 hidden md:block" />
        <ThemeToggle />
        <MagneticButton
          onClick={() => onOpenModal("contact")}
          className="hidden md:flex px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold border-none shadow-glow"
          strength={0.2}
        >
          Hire Me
        </MagneticButton>
      </div>
    </nav>
  );
};

export default Navbar;
