import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%": { transform: "translate(-100px, -50px) rotate(120deg)" },
          "66%": { transform: "translate(50px, -100px) rotate(240deg)" },
        },
        "rotate-border": {
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-float": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-30px) scale(1.05)" },
        },
        "orb-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -30px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        "pulse-dot": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.5)", opacity: "0.5" },
        },
        "slide-down": {
          from: { transform: "translateY(-100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          from: { opacity: "0", transform: "translateX(-60px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          from: { opacity: "0", transform: "translateX(60px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "modal-bounce": {
          "0%": { transform: "scale(0.3) rotate(-10deg)", opacity: "0" },
          "50%": { transform: "scale(1.05) rotate(2deg)" },
          "100%": { transform: "scale(1) rotate(0)", opacity: "1" },
        },
        "sound-pulse": {
          "0%, 100%": { boxShadow: "0 10px 30px hsla(18, 100%, 56%, 0.4)" },
          "50%": { boxShadow: "0 10px 40px hsla(18, 100%, 56%, 0.6), 0 0 50px hsla(18, 100%, 56%, 0.3)" },
        },
        "float-card": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "skill-pop": {
          "0%": { opacity: "0", transform: "scale(0) rotate(-180deg)" },
          "70%": { transform: "scale(1.2) rotate(10deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0)" },
        },
        "neon-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsla(18, 100%, 56%, 0.3), 0 0 40px hsla(18, 100%, 56%, 0.2)" },
          "50%": { boxShadow: "0 0 30px hsla(18, 100%, 56%, 0.5), 0 0 60px hsla(18, 100%, 56%, 0.3)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "aurora-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.3" },
          "33%": { transform: "translate(200px, -100px) scale(1.3)", opacity: "0.5" },
          "66%": { transform: "translate(-100px, 80px) scale(0.8)", opacity: "0.2" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.25" },
          "50%": { transform: "translate(-150px, -80px) scale(1.5)", opacity: "0.4" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1.2)", opacity: "0.2" },
          "40%": { transform: "translate(100px, 100px) scale(0.9)", opacity: "0.35" },
          "80%": { transform: "translate(-80px, -60px) scale(1.4)", opacity: "0.15" },
        },
        "blob-morph": {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "25%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "50%": { borderRadius: "50% 60% 30% 60% / 30% 60% 70% 40%" },
          "75%": { borderRadius: "60% 40% 60% 30% / 70% 30% 40% 70%" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "scale-in-bounce": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "60%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up-stagger": {
          from: { opacity: "0", transform: "translateY(60px) scale(0.95)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "magnetic-pull": {
          "0%, 100%": { transform: "translate(0, 0)" },
        },
        "ripple": {
          "0%": { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        "counter-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 20s ease-in-out infinite",
        "rotate-border": "rotate-border 10s linear infinite",
        "bounce-float": "bounce-float 3s ease-in-out infinite",
        "orb-float": "orb-float 8s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "slide-down": "slide-down 0.8s ease",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards",
        "fade-in-left": "fade-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards",
        "fade-in-right": "fade-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards",
        "modal-bounce": "modal-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "sound-pulse": "sound-pulse 2s ease-in-out infinite",
        "float-card": "float-card 6s ease-in-out infinite",
        "skill-pop": "skill-pop 0.6s ease backwards",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "aurora-1": "aurora-1 15s ease-in-out infinite",
        "aurora-2": "aurora-2 20s ease-in-out infinite",
        "aurora-3": "aurora-3 18s ease-in-out infinite",
        "blob-morph": "blob-morph 8s ease-in-out infinite",
        "text-shimmer": "text-shimmer 3s ease-in-out infinite",
        "scale-in-bounce": "scale-in-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) backwards",
        "slide-up-stagger": "slide-up-stagger 0.7s cubic-bezier(0.16, 1, 0.3, 1) backwards",
        "ripple": "ripple 0.6s ease-out",
        "counter-spin": "counter-spin 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
