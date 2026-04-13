import { useEffect, useRef, useCallback, useState } from "react";

// ─── Aurora Background ───
export const AuroraBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] animate-aurora-1 dark:bg-primary/5" />
    <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[100px] animate-aurora-2 dark:bg-secondary/4" />
    <div className="absolute top-[30%] left-[40%] w-[400px] h-[400px] rounded-full bg-accent/6 blur-[80px] animate-aurora-3 dark:bg-accent/3" />
    <div className="hidden dark:block absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[hsla(276,50%,47%,0.08)] blur-[140px] animate-aurora-2" />
    <div className="hidden dark:block absolute bottom-[10%] right-[20%] w-[400px] h-[400px] rounded-full bg-[hsla(209,98%,65%,0.06)] blur-[120px] animate-aurora-3" />
    <div className="hidden dark:block absolute top-[50%] left-[60%] w-[300px] h-[300px] rounded-full bg-[hsla(18,100%,56%,0.04)] blur-[100px] animate-aurora-1" />
    <div
      className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
      style={{
        backgroundImage: `
          linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }}
    />
  </div>
);

// ─── Floating Orbs ───
export const FloatingOrbs = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute w-32 h-32 bg-primary rounded-full blur-[80px] opacity-40 -top-[20%] -left-[10%] animate-orb-float" />
    <div className="absolute w-24 h-24 bg-accent rounded-full blur-[60px] opacity-40 -bottom-[15%] -right-[5%] animate-orb-float" style={{ animationDelay: "2s" }} />
    <div className="absolute w-20 h-20 bg-secondary rounded-full blur-[50px] opacity-30 top-1/2 -right-[15%] animate-orb-float" style={{ animationDelay: "4s" }} />
    <div className="absolute w-16 h-16 bg-[hsl(276,50%,47%)] rounded-full blur-[40px] opacity-20 top-[20%] left-[50%] animate-orb-float" style={{ animationDelay: "6s" }} />
    <div className="absolute w-28 h-28 bg-primary/20 rounded-full blur-[70px] opacity-30 bottom-[30%] -left-[20%] animate-aurora-2" />
  </div>
);

// ─── Dark Mode Particles ───
export const DarkModeParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["hsla(18, 100%, 56%, ", "hsla(276, 50%, 60%, ", "hsla(209, 98%, 65%, ", "hsla(30, 93%, 54%, "];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(18, 100%, 56%, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (p.alpha * 0.2) + ")";
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] hidden dark:block"
    />
  );
};

// ─── Custom Cursor ───
export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX - 10}px`;
      cursor.style.top = `${mouseY - 10}px`;
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = `${followerX - 4}px`;
      follower.style.top = `${followerY - 4}px`;
      requestAnimationFrame(animate);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], .clickable")) {
        cursor.style.transform = "scale(2)";
        follower.style.transform = "scale(3)";
      }
    };

    const onMouseOut = () => {
      cursor.style.transform = "scale(1)";
      follower.style.transform = "scale(1)";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    const raf = requestAnimationFrame(animate);
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed w-5 h-5 border-2 border-primary rounded-full pointer-events-none z-[10000] transition-transform duration-150 mix-blend-difference hidden md:block" />
      <div ref={followerRef} className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[10000] transition-transform duration-300 hidden md:block" />
    </>
  );
};

// ─── Magnetic Button ───
interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
}

export const MagneticButton = ({ children, onClick, className = "", strength = 0.3 }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    btn.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const btn = ref.current;
    if (btn) btn.style.transform = "";
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.className = "absolute rounded-full bg-primary-foreground/30 animate-ripple pointer-events-none";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    onClick?.();
  }, [onClick]);

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative overflow-hidden transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </button>
  );
};

// ─── Sound Toggle ───
export const SoundToggle = () => {
  const [enabled, setEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const clickHandlerRef = useRef<(() => void) | null>(null);
  const nodesRef = useRef<{ source?: AudioBufferSourceNode; master?: GainNode }>({});

  const playClickSound = useCallback((target: HTMLElement) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    filter.type = "lowpass";

    const isButton = target.closest("button, [role='button'], .magnetic-btn");
    const isLink = target.closest("a");
    const isCard = target.closest("[class*='card'], [class*='glass']");
    const isNav = target.closest("nav");

    if (isButton) {
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
      filter.frequency.value = 2000;
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } else if (isNav) {
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
      filter.frequency.value = 3000;
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } else if (isCard) {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(784, ctx.currentTime + 0.1);
      filter.frequency.value = 1500;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } else if (isLink) {
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.06);
      filter.frequency.value = 1800;
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } else {
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);
      filter.frequency.value = 1200;
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    }
  }, []);

  const createOceanWaves = useCallback((ctx: AudioContext) => {
    const master = ctx.createGain();
    master.gain.value = 0.035;
    master.connect(ctx.destination);
    nodesRef.current.master = master;

    const bufferSize = 4 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const output = noiseBuffer.getChannelData(ch);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    nodesRef.current.source = noise;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 180;
    lowpass.Q.value = 0.7;

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 80;
    lfo.connect(lfoGain);
    lfoGain.connect(lowpass.frequency);
    lfo.start();

    const lfo2 = ctx.createOscillator();
    const lfo2Gain = ctx.createGain();
    lfo2.type = "sine";
    lfo2.frequency.value = 0.12;
    lfo2Gain.gain.value = 40;
    lfo2.connect(lfo2Gain);
    lfo2Gain.connect(lowpass.frequency);
    lfo2.start();

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.6;

    noise.connect(lowpass);
    lowpass.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();

    const shimmerBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const shimmerData = shimmerBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      shimmerData[i] = (Math.random() * 2 - 1) * 0.5;
    }
    const shimmer = ctx.createBufferSource();
    shimmer.buffer = shimmerBuffer;
    shimmer.loop = true;
    const shimmerFilter = ctx.createBiquadFilter();
    shimmerFilter.type = "bandpass";
    shimmerFilter.frequency.value = 3000;
    shimmerFilter.Q.value = 2;
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.015;
    shimmer.connect(shimmerFilter);
    shimmerFilter.connect(shimmerGain);
    shimmerGain.connect(master);
    shimmer.start();

    [55, 82.41].forEach((freq) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const f = ctx.createBiquadFilter();
      osc.type = "sine";
      osc.frequency.value = freq;
      f.type = "lowpass";
      f.frequency.value = 120;
      g.gain.value = 0.04;
      osc.connect(f);
      f.connect(g);
      g.connect(master);
      osc.start();
    });
  }, []);

  const toggle = () => {
    if (!enabled) {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const handler = (e: Event) => {
        const target = e.target as HTMLElement;
        if (audioCtxRef.current) playClickSound(target);
      };
      clickHandlerRef.current = handler as unknown as () => void;
      document.addEventListener("click", handler);
      createOceanWaves(ctx);
      setEnabled(true);
    } else {
      if (clickHandlerRef.current) {
        document.removeEventListener("click", clickHandlerRef.current);
        clickHandlerRef.current = null;
      }
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
      nodesRef.current = {};
      setEnabled(false);
    }
  };

  useEffect(() => {
    return () => {
      if (clickHandlerRef.current) {
        document.removeEventListener("click", clickHandlerRef.current);
      }
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-primary border-none text-primary-foreground text-2xl z-[1001] animate-sound-pulse flex items-center justify-center hover:scale-110 hover:rotate-[20deg] transition-transform"
      aria-label="Toggle sound & ambient"
      title={enabled ? "Sound ON (ocean waves + UI sounds)" : "Sound OFF"}
    >
      {enabled ? "🔊" : "🔇"}
    </button>
  );
};
