import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

type DuckAction = "idle" | "happy" | "sleeping" | "smoking" | "vaping" | "drinking-milk" | "drinking-cocktail" | "love" | "dancing";

interface PetMenuItem {
  label: string;
  emoji: string;
  action: DuckAction;
  msg: string;
  color: string;
}

const PET_MENU_ITEMS: PetMenuItem[] = [
  { label: "Smoke", emoji: "🚬", action: "smoking", msg: "Puff puff... 🚬", color: "hsl(30,20%,50%)" },
  { label: "Vape", emoji: "☁️", action: "vaping", msg: "Big clouds ☁️", color: "hsl(210,60%,60%)" },
  { label: "Milk", emoji: "🥛", action: "drinking-milk", msg: "Mmm calcium! 🥛", color: "hsl(0,0%,90%)" },
  { label: "Cocktail", emoji: "🍹", action: "drinking-cocktail", msg: "Cheers! 🍹", color: "hsl(340,70%,55%)" },
  { label: "Dance", emoji: "💃", action: "dancing", msg: "💃 Groove time!", color: "hsl(280,60%,60%)" },
  { label: "Love", emoji: "❤️", action: "love", msg: "Love is in the air! 💕", color: "hsl(350,80%,55%)" },
];

const getSeason = (): string => {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  if (month === 11 && day >= 20) return "christmas";
  if (month === 9 && day === 31) return "halloween";
  if (month === 1 && day === 14) return "valentines";
  if (month === 0 && day === 1) return "newyear";
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
};

const getHolidayMessages = (): { mood: DuckAction; msg: string }[] => {
  const season = getSeason();
  const base: { mood: DuckAction; msg: string }[] = [
    { mood: "happy", msg: "Quack! 🎨" },
    { mood: "happy", msg: "*adjusts glasses*" },
    { mood: "smoking", msg: "Puff puff... 🚬" },
    { mood: "vaping", msg: "Big clouds ☁️" },
    { mood: "drinking-milk", msg: "Mmm calcium! 🥛" },
    { mood: "drinking-cocktail", msg: "Cheers! 🍹" },
    { mood: "smoking", msg: "Quack n' smoke 💨" },
    { mood: "drinking-milk", msg: "Milk time! 🐄" },
    { mood: "drinking-cocktail", msg: "It's 5 o'clock! 🥂" },
    { mood: "vaping", msg: "Cloud chaser ☁️" },
    { mood: "happy", msg: "Ship it! 🚀" },
    { mood: "happy", msg: "You're awesome!" },
    { mood: "dancing", msg: "💃 Groove time!" },
    { mood: "happy", msg: "Pixel perfect! ✨" },
  ];
  switch (season) {
    case "christmas":
      return [...base, { mood: "happy", msg: "Ho ho quack! 🎄" }, { mood: "happy", msg: "Merry Christmas! 🎅" }, { mood: "dancing", msg: "Jingle bells! 🔔" }];
    case "halloween":
      return [...base, { mood: "happy", msg: "Boo! 👻" }, { mood: "happy", msg: "Trick or treat! 🎃" }, { mood: "smoking", msg: "Spooky smoke 💀" }];
    case "valentines":
      return [...base, { mood: "love", msg: "Love is in the air! 💕" }, { mood: "love", msg: "Be my valentine! 💝" }, { mood: "happy", msg: "Quack of love! 💖" }];
    case "newyear":
      return [...base, { mood: "dancing", msg: "Happy New Year! 🎆" }, { mood: "drinking-cocktail", msg: "Cheers to 2026! 🥳" }];
    case "summer":
      return [...base, { mood: "drinking-cocktail", msg: "Summer vibes! 🏖️" }, { mood: "happy", msg: "Sun's out! ☀️" }];
    case "autumn":
      return [...base, { mood: "happy", msg: "Cozy vibes 🍂" }, { mood: "drinking-milk", msg: "Pumpkin spice? 🎃" }];
    case "spring":
      return [...base, { mood: "happy", msg: "Spring bloom! 🌸" }, { mood: "dancing", msg: "Flower power! 🌺" }];
    default:
      return [...base, { mood: "drinking-milk", msg: "Hot cocoa! ☕" }, { mood: "happy", msg: "Let it snow! ❄️" }];
  }
};

// Premium audio engine with layered synthesis
let duckAudioCtx: AudioContext | null = null;
const getDuckAudioCtx = () => {
  if (!duckAudioCtx || duckAudioCtx.state === "closed") {
    duckAudioCtx = new AudioContext();
  }
  return duckAudioCtx;
};

const playQuackSound = (mood: DuckAction) => {
  try {
    const ctx = getDuckAudioCtx();
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.value = 0.15;

    // Layer 1: Main tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const filter1 = ctx.createBiquadFilter();
    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(masterGain);
    filter1.type = "bandpass";
    filter1.Q.value = 8;

    // Layer 2: Harmonic overtone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(masterGain);
    gain2.gain.value = 0.03;

    const t = ctx.currentTime;
    switch (mood) {
      case "happy": case "love": case "dancing":
        osc1.frequency.setValueAtTime(600, t);
        osc1.frequency.exponentialRampToValueAtTime(950, t + 0.06);
        osc1.frequency.exponentialRampToValueAtTime(750, t + 0.12);
        osc1.frequency.exponentialRampToValueAtTime(850, t + 0.18);
        filter1.frequency.value = 1400;
        gain1.gain.setValueAtTime(0.15, t);
        gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc2.frequency.setValueAtTime(1200, t);
        osc2.frequency.exponentialRampToValueAtTime(1700, t + 0.1);
        osc1.start(t); osc1.stop(t + 0.3);
        osc2.start(t); osc2.stop(t + 0.2);
        break;
      case "smoking": case "vaping":
        osc1.type = "triangle";
        osc1.frequency.setValueAtTime(220, t);
        osc1.frequency.exponentialRampToValueAtTime(160, t + 0.4);
        filter1.frequency.value = 500;
        gain1.gain.setValueAtTime(0.1, t);
        gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        osc2.type = "sawtooth";
        osc2.frequency.setValueAtTime(80, t);
        gain2.gain.value = 0.015;
        osc1.start(t); osc1.stop(t + 0.5);
        osc2.start(t); osc2.stop(t + 0.4);
        break;
      case "drinking-milk": case "drinking-cocktail":
        osc1.type = "sawtooth";
        osc1.frequency.setValueAtTime(250, t);
        osc1.frequency.exponentialRampToValueAtTime(900, t + 0.08);
        osc1.frequency.exponentialRampToValueAtTime(350, t + 0.2);
        osc1.frequency.exponentialRampToValueAtTime(700, t + 0.28);
        filter1.frequency.value = 1000;
        filter1.Q.value = 3;
        gain1.gain.setValueAtTime(0.08, t);
        gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc1.start(t); osc1.stop(t + 0.35);
        osc2.start(t); osc2.stop(t + 0.1);
        break;
      default:
        osc1.frequency.setValueAtTime(500, t);
        osc1.frequency.exponentialRampToValueAtTime(380, t + 0.1);
        osc1.frequency.exponentialRampToValueAtTime(450, t + 0.15);
        filter1.frequency.value = 900;
        gain1.gain.setValueAtTime(0.12, t);
        gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc2.frequency.setValueAtTime(1000, t);
        osc1.start(t); osc1.stop(t + 0.25);
        osc2.start(t); osc2.stop(t + 0.15);
    }
  } catch { /* audio not available */ }
};

// Trail particle type
interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
}

const InteractiveDuck = () => {
  const [pos, setPos] = useState({ x: 100, y: 300 });
  const [flipped, setFlipped] = useState(false);
  const [mood, setMood] = useState<DuckAction>("idle");
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();
  const dragOffset = useRef({ x: 0, y: 0 });
  const actionTimer = useRef<ReturnType<typeof setTimeout>>();
  const longPressTimer = useRef<ReturnType<typeof setTimeout>>();
  const season = getSeason();
  const actions = getHolidayMessages();
  const heartIdRef = useRef(0);
  const trailIdRef = useRef(0);
  const isLongPress = useRef(false);

  // Spring physics for smooth position
  const springX = useSpring(100, { stiffness: 60, damping: 20, mass: 0.8 });
  const springY = useSpring(300, { stiffness: 60, damping: 20, mass: 0.8 });

  // Tilt based on velocity
  const tilt = useMotionValue(0);
  const springTilt = useSpring(tilt, { stiffness: 200, damping: 15 });

  // Shadow based on height (bounce)
  const shadowScale = useTransform(springY, [0, window.innerHeight], [1.3, 0.7]);

  const targetRef = useRef({ x: 100, y: 300 });
  const posRef = useRef({ x: 100, y: 300 });
  const rafRef = useRef<number>();
  const prevPosRef = useRef({ x: 100, y: 300 });

  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setMood("sleeping"), 30000);
  }, []);

  // Eyes track cursor
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - posRef.current.x - 40;
      const dy = e.clientY - posRef.current.y - 25;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 3;
      if (dist > 0) {
        setEyeOffset({
          x: (dx / dist) * Math.min(maxOffset, dist * 0.02),
          y: (dy / dist) * Math.min(maxOffset, dist * 0.02),
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Wander randomly
  useEffect(() => {
    const wander = setInterval(() => {
      if (mood === "sleeping" || dragging || showMenu) return;
      targetRef.current = {
        x: Math.random() * (window.innerWidth - 140) + 50,
        y: Math.random() * (window.innerHeight - 140) + 50,
      };
    }, 7000);
    return () => clearInterval(wander);
  }, [mood, dragging, showMenu]);

  // RAF-based smooth movement with spring sync + trail
  useEffect(() => {
    if (mood === "sleeping" || dragging || showMenu) return;
    let lastTime = 0;
    let trailCounter = 0;
    const tick = (time: number) => {
      if (lastTime) {
        const dt = Math.min((time - lastTime) / 1000, 0.05);
        const prev = posRef.current;
        const dx = targetRef.current.x - prev.x;
        const dy = targetRef.current.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 1) {
          const speed = 1.8 * dt;
          const newPos = { x: prev.x + dx * speed, y: prev.y + dy * speed };
          posRef.current = newPos;
          setPos(newPos);
          springX.set(newPos.x);
          springY.set(newPos.y);
          setFlipped(dx < 0);

          // Velocity tilt
          const vx = newPos.x - prevPosRef.current.x;
          tilt.set(Math.max(-12, Math.min(12, vx * 0.8)));
          prevPosRef.current = newPos;

          // Trail particles while moving
          trailCounter++;
          if (trailCounter % 8 === 0 && dist > 20) {
            const id = trailIdRef.current++;
            setTrail(prev => [...prev.slice(-8), {
              id,
              x: newPos.x + 35 + Math.random() * 20,
              y: newPos.y + 70 + Math.random() * 10,
              size: 3 + Math.random() * 4,
            }]);
            setTimeout(() => setTrail(prev => prev.filter(p => p.id !== id)), 1200);
          }
        } else {
          tilt.set(0);
        }
      }
      lastTime = time;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mood, dragging, showMenu, springX, springY, tilt]);

  // Scroll reactions
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mood === "sleeping" || dragging) return;
    if (scrollY > 200) {
      setMessage("Wheee! 🎢");
      const t = setTimeout(() => setMessage(""), 1500);
      return () => clearTimeout(t);
    }
  }, [Math.floor(scrollY / 500)]);

  // Proximity to hero photo
  useEffect(() => {
    const heroEl = document.querySelector("#home img");
    if (!heroEl || mood === "sleeping") return;
    const check = setInterval(() => {
      const rect = heroEl.getBoundingClientRect();
      const heroCenterX = rect.left + rect.width / 2;
      const heroCenterY = rect.top + rect.height / 2;
      const dx = pos.x - heroCenterX;
      const dy = pos.y - heroCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        setMood("love");
        setMessage("😍 So pretty!");
        const id = heartIdRef.current++;
        setHearts(prev => [...prev.slice(-5), { id, x: pos.x + 40, y: pos.y - 10 }]);
        setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), 2000);
      }
    }, 2000);
    return () => clearInterval(check);
  }, [pos, mood]);

  useEffect(() => {
    resetIdleTimer();
    return () => { if (idleTimer.current) clearTimeout(idleTimer.current); };
  }, [resetIdleTimer]);

  // Close menu
  useEffect(() => {
    if (!showMenu) return;
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-duck-menu]") && !target.closest("[data-duck]")) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [showMenu]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (showMenu) return;
    if (mood === "sleeping") {
      setMood("idle");
      setMessage("*yawn* I'm awake!");
      playQuackSound("idle");
      setTimeout(() => setMessage(""), 2000);
      resetIdleTimer();
      return;
    }
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setShowMenu(true);
      playQuackSound("happy");
      setMessage("Pick something! 🎯");
    }, 500);
    setDragging(true);
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || showMenu) return;
    if (longPressTimer.current) {
      const dx = Math.abs(e.clientX - (pos.x + dragOffset.current.x));
      const dy = Math.abs(e.clientY - (pos.y + dragOffset.current.y));
      if (dx > 5 || dy > 5) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = undefined;
      }
    }
    const newX = Math.max(0, Math.min(window.innerWidth - 90, e.clientX - dragOffset.current.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 90, e.clientY - dragOffset.current.y));
    const newPos = { x: newX, y: newY };
    posRef.current = newPos;
    setPos(newPos);
    springX.set(newX);
    springY.set(newY);
    setFlipped(e.movementX < 0);

    // Velocity tilt while dragging
    tilt.set(Math.max(-15, Math.min(15, e.movementX * 1.2)));

    // Drag trail
    const id = trailIdRef.current++;
    setTrail(prev => [...prev.slice(-12), {
      id,
      x: newX + 35 + Math.random() * 15,
      y: newY + 70,
      size: 2 + Math.random() * 3,
    }]);
    setTimeout(() => setTrail(prev => prev.filter(p => p.id !== id)), 800);
  };

  const handlePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = undefined;
    }
    if (!dragging) return;
    setDragging(false);
    targetRef.current = posRef.current;
    tilt.set(0);

    // Bounce landing
    controls.start({
      y: [0, -8, 0, -3, 0],
      transition: { duration: 0.4, ease: "easeOut" },
    });
    resetIdleTimer();
  };

  const handleClick = (e: React.MouseEvent) => {
    if (dragging || showMenu || isLongPress.current) return;
    e.stopPropagation();
    if (actionTimer.current) clearTimeout(actionTimer.current);
    const action = actions[Math.floor(Math.random() * actions.length)];
    setMood(action.mood);
    playQuackSound(action.mood);
    controls.start({
      y: [0, -30, 0, -12, 0],
      rotate: [0, -12, 12, -6, 0],
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
    });
    setMessage(action.msg);
    actionTimer.current = setTimeout(() => {
      setMessage("");
      setMood("idle");
    }, 5000);
    resetIdleTimer();
  };

  const handleMenuAction = (item: PetMenuItem) => {
    setShowMenu(false);
    if (actionTimer.current) clearTimeout(actionTimer.current);
    setMood(item.action);
    playQuackSound(item.action);
    setMessage(item.msg);
    controls.start({
      y: [0, -18, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 0.35, ease: "easeOut" },
    });
    actionTimer.current = setTimeout(() => {
      setMessage("");
      setMood("idle");
    }, 5000);
    resetIdleTimer();
  };

  const getSeasonalAccessory = () => {
    switch (season) {
      case "christmas":
        return (
          <g>
            <path d="M 25 12 Q 35 -5 50 8 L 55 5 Q 58 2 56 8 L 50 8" fill="hsl(0,80%,45%)" />
            <ellipse cx="56" cy="5" rx="3" ry="3" fill="hsl(0,0%,95%)" />
            <rect x="23" y="10" width="30" height="4" rx="2" fill="hsl(0,0%,95%)" />
          </g>
        );
      case "halloween":
        return (
          <g>
            <polygon points="35,0 25,14 48,14" fill="hsl(270,50%,20%)" />
            <rect x="22" y="12" width="30" height="3" rx="1" fill="hsl(270,50%,20%)" />
            <rect x="30" y="6" width="10" height="2" rx="1" fill="hsl(40,90%,50%)" />
          </g>
        );
      case "valentines":
        return (
          <g>
            <path d="M 36 6 C 36 2 42 2 39 8 C 36 2 30 2 36 6" fill="hsl(340,80%,55%)" transform="translate(0,-2) scale(1.2)" />
          </g>
        );
      case "summer":
        return (
          <g>
            <circle cx="60" cy="16" r="4" fill="hsl(50,90%,60%)" />
            <circle cx="60" cy="16" r="1.5" fill="hsl(30,90%,50%)" />
          </g>
        );
      case "spring":
        return (
          <g>
            <circle cx="28" cy="10" r="3" fill="hsl(340,70%,65%)" />
            <circle cx="35" cy="7" r="3" fill="hsl(50,90%,65%)" />
            <circle cx="43" cy="7" r="3" fill="hsl(280,60%,65%)" />
            <circle cx="50" cy="10" r="3" fill="hsl(180,60%,60%)" />
          </g>
        );
      case "autumn":
        return (
          <g>
            <path d="M 38 5 L 35 0 L 38 3 L 40 -1 L 39 4 L 43 1 L 40 5 L 44 5 L 40 7 L 38 5" fill="hsl(15,80%,50%)" />
          </g>
        );
      default:
        return (
          <g>
            <path d="M 22 18 Q 22 6 39 6 Q 56 6 56 18" fill="none" stroke="hsl(0,0%,30%)" strokeWidth="2" />
            <circle cx="22" cy="20" r="5" fill="hsl(0,70%,55%)" />
            <circle cx="56" cy="20" r="5" fill="hsl(0,70%,55%)" />
          </g>
        );
    }
  };

  const getDuckFace = () => {
    const ex = eyeOffset.x;
    const ey = eyeOffset.y;
    switch (mood) {
      case "sleeping":
        return (
          <g>
            <path d="M 27 22 Q 31 20 35 22" stroke="hsl(240,10%,6%)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 43 22 Q 47 20 51 22" stroke="hsl(240,10%,6%)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <text x="56" y="12" fontSize="10" fill="hsl(18,100%,56%)" fontWeight="bold" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
              z
            </text>
            <text x="63" y="5" fontSize="8" fill="hsl(18,100%,56%)" fontWeight="bold" opacity="0.5">
              <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite" />
              z
            </text>
            <text x="68" y="0" fontSize="6" fill="hsl(18,100%,56%)" fontWeight="bold" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
              z
            </text>
          </g>
        );
      case "love":
        return (
          <g>
            <text x="25" y="26" fontSize="11">❤️</text>
            <text x="42" y="26" fontSize="11">❤️</text>
          </g>
        );
      case "dancing":
        return (
          <g>
            <path d="M 27 24 Q 31 17 35 24" stroke="hsl(240,10%,6%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 43 24 Q 47 17 51 24" stroke="hsl(240,10%,6%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="39" cy="36" rx="5" ry="3.5" fill="hsl(0,60%,40%)">
              <animate attributeName="ry" values="3.5;2;3.5" dur="0.4s" repeatCount="indefinite" />
            </ellipse>
          </g>
        );
      case "happy":
        return (
          <g>
            <path d="M 27 24 Q 31 17 35 24" stroke="hsl(240,10%,6%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 43 24 Q 47 17 51 24" stroke="hsl(240,10%,6%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        );
      case "smoking": case "vaping":
        return (
          <g>
            <line x1="27" y1="22" x2="35" y2="21" stroke="hsl(240,10%,6%)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="43" y1="21" x2="51" y2="22" stroke="hsl(240,10%,6%)" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );
      case "drinking-milk": case "drinking-cocktail":
        return (
          <g>
            <path d="M 27 23 Q 31 18 35 23" stroke="hsl(240,10%,6%)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 43 23 Q 47 18 51 23" stroke="hsl(240,10%,6%)" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        );
      default:
        // Eyes follow cursor
        return (
          <g>
            <circle cx={31 + ex} cy={22 + ey} r="3.5" fill="hsl(240,10%,6%)" />
            <circle cx={47 + ex} cy={22 + ey} r="3.5" fill="hsl(240,10%,6%)" />
            <circle cx={32 + ex * 0.5} cy={21 + ey * 0.5} r="1.5" fill="white" />
            <circle cx={48 + ex * 0.5} cy={21 + ey * 0.5} r="1.5" fill="white" />
          </g>
        );
    }
  };

  const getAccessory = () => {
    switch (mood) {
      case "smoking":
        return (
          <g>
            <rect x="47" y="33" width="20" height="3" rx="1.5" fill="hsl(40,30%,90%)" />
            <rect x="64" y="33" width="3" height="3" rx="0.5" fill="hsl(25,90%,50%)" />
            {/* Animated ember glow */}
            <circle cx="65.5" cy="34.5" r="2" fill="hsl(15,100%,55%)" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="0.8s" repeatCount="indefinite" />
            </circle>
            {/* Multi-layered smoke */}
            {[0, 1, 2, 3].map(i => (
              <circle key={i} cx={68 + i * 3} cy={28 - i * 2} r={2 + i} fill="hsl(0,0%,80%)" opacity={0.5 - i * 0.1}>
                <animate attributeName="cy" values={`${28 - i * 2};${10 - i * 4};${-5 - i * 3}`} dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values={`${0.5 - i * 0.1};${0.2 - i * 0.05};0`} dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="r" values={`${2 + i};${4 + i * 2};${7 + i * 3}`} dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        );
      case "vaping":
        return (
          <g>
            {/* Premium vape device */}
            <rect x="47" y="31" width="24" height="5" rx="2.5" fill="hsl(220,20%,25%)" />
            <rect x="47" y="32" width="6" height="3" rx="1.5" fill="hsl(210,30%,35%)" />
            <circle cx="50" cy="33.5" r="1" fill="hsl(18,100%,56%)" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1.5s" repeatCount="indefinite" />
            </circle>
            {/* Massive cloud system */}
            {[0, 1, 2, 3, 4].map(i => (
              <circle key={i} cx={73 + i * 2} cy={24 - i * 3} r={4 + i * 2.5} fill={`hsl(0,0%,${88 + i * 2}%)`} opacity={0.6 - i * 0.1}>
                <animate attributeName="cy" values={`${24 - i * 3};${5 - i * 5};${-15 - i * 5}`} dur={`${3 + i * 0.6}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values={`${0.6 - i * 0.1};${0.3 - i * 0.05};0`} dur={`${3 + i * 0.6}s`} repeatCount="indefinite" />
                <animate attributeName="r" values={`${4 + i * 2.5};${8 + i * 3};${14 + i * 4}`} dur={`${3 + i * 0.6}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        );
      case "drinking-milk":
        return (
          <g>
            <rect x="58" y="38" width="16" height="22" rx="2.5" fill="hsl(0,0%,97%)" stroke="hsl(0,0%,82%)" strokeWidth="1" />
            <rect x="60" y="40" width="12" height="8" rx="1" fill="hsl(210,80%,60%)" />
            <text x="61.5" y="46" fontSize="5" fill="white" fontWeight="bold">MOO</text>
            {/* Straw */}
            <rect x="68" y="32" width="2" height="14" rx="1" fill="hsl(350,70%,55%)" transform="rotate(-8, 69, 38)" />
            {/* Milk drip */}
            <ellipse cx="64" cy="60" rx="2" ry="1.5" fill="hsl(0,0%,95%)">
              <animate attributeName="cy" values="60;64;60" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
            </ellipse>
          </g>
        );
      case "drinking-cocktail":
        return (
          <g>
            {/* Glass */}
            <polygon points="56,37 80,37 74,56 62,56" fill="hsl(180,60%,80%)" opacity="0.6" />
            <polygon points="56,37 80,37 74,56 62,56" fill="none" stroke="hsl(180,30%,65%)" strokeWidth="0.8" />
            {/* Liquid */}
            <polygon points="58,40 78,40 73,54 63,54" fill="hsl(340,70%,55%)" opacity="0.4" />
            <line x1="56" y1="37" x2="80" y2="37" stroke="hsl(0,0%,65%)" strokeWidth="1.5" />
            {/* Stem */}
            <rect x="66" y="56" width="4" height="8" fill="hsl(0,0%,75%)" />
            <ellipse cx="68" cy="64" rx="6" ry="1.5" fill="hsl(0,0%,70%)" />
            {/* Umbrella */}
            <path d="M 72 28 Q 79 24 76 37" stroke="hsl(350,80%,55%)" strokeWidth="0.8" fill="none" />
            <path d="M 68 28 A 6 6 0 0 1 78 28" fill="hsl(350,80%,55%)" />
            <path d="M 68 28 A 6 6 0 0 1 78 28" fill="none" stroke="hsl(350,60%,45%)" strokeWidth="0.5" />
            {/* Cherry */}
            <circle cx="58" cy="36" r="3" fill="hsl(0,80%,45%)" />
            <circle cx="57.5" cy="35" r="1" fill="hsl(0,80%,60%)" opacity="0.5" />
            <path d="M 58 33 Q 60 30 62 31" stroke="hsl(120,40%,30%)" strokeWidth="0.8" fill="none" />
            {/* Bubbles */}
            {[0, 1, 2].map(i => (
              <circle key={i} cx={65 + i * 4} cy={48 - i * 3} r={1 + i * 0.3} fill="white" opacity={0.4}>
                <animate attributeName="cy" values={`${48 - i * 3};${40 - i * 3};${48 - i * 3}`} dur={`${1.5 + i * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur={`${1.5 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Trail particles */}
      <AnimatePresence>
        {trail.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed z-[997] pointer-events-none rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background: "hsl(0, 0%, 90%)",
              boxShadow: `0 0 ${p.size * 2}px hsl(0, 0%, 85%)`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Floating hearts */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: 0, scale: 0.3 }}
            animate={{ opacity: 0, y: -80, scale: 1.8, x: (Math.random() - 0.5) * 40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="fixed z-[1000] text-2xl pointer-events-none"
            style={{ left: h.x, top: h.y }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Premium radial pet menu */}
      <AnimatePresence>
        {showMenu && (
          <div
            data-duck-menu
            className="fixed z-[1001]"
            style={{ left: pos.x + 45, top: pos.y + 45 }}
          >
            {/* Backdrop blur ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, hsl(0 0% 95% / 0.12) 0%, transparent 70%)",
              }}
            />
            {PET_MENU_ITEMS.map((item, i) => {
              const angle = (i / PET_MENU_ITEMS.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 85;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  transition={{ delay: i * 0.04, type: "spring", stiffness: 500, damping: 18 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuAction(item);
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full backdrop-blur-xl border border-white/20 shadow-xl flex flex-col items-center justify-center cursor-pointer group"
                  style={{
                    background: `linear-gradient(135deg, hsl(0 0% 100% / 0.12), hsl(0 0% 100% / 0.05))`,
                    boxShadow: `0 8px 32px -4px hsl(0 0% 0% / 0.2), inset 0 1px 0 hsl(0 0% 100% / 0.15)`,
                  }}
                  title={item.label}
                >
                  <span className="text-xl leading-none drop-shadow-sm">{item.emoji}</span>
                  <span className="text-[7px] font-bold text-foreground/70 mt-0.5 group-hover:text-foreground transition-colors tracking-wider uppercase">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Duck shadow on ground */}
      <motion.div
        className="fixed z-[998] pointer-events-none"
        style={{
          left: pos.x + 10,
          top: pos.y + 82,
          width: 70,
          height: 12,
          borderRadius: "50%",
          background: "hsl(0 0% 0% / 0.12)",
          filter: "blur(4px)",
          scaleX: shadowScale,
        }}
      />

      <motion.div
        data-duck
        className="fixed z-[999] select-none touch-none"
        style={{
          left: pos.x,
          top: pos.y,
          cursor: dragging ? "grabbing" : "grab",
          rotateZ: springTilt,
          filter: hovering ? "drop-shadow(0 0 12px hsl(0 0% 95% / 0.6))" : "drop-shadow(0 4px 8px hsl(0 0% 0% / 0.15))",
          transition: "filter 0.3s ease",
        }}
        animate={controls}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Premium speech bubble */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl px-4 py-2 text-xs font-bold shadow-xl"
              style={{
                background: "linear-gradient(135deg, hsl(var(--card) / 0.95), hsl(var(--card) / 0.85))",
                backdropFilter: "blur(20px)",
                border: "1px solid hsl(var(--border) / 0.5)",
                boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.15), inset 0 1px 0 hsl(var(--border) / 0.3)",
                color: "hsl(var(--foreground))",
              }}
            >
              {message}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[6px] w-3 h-3 rotate-45"
                style={{
                  background: "hsl(var(--card) / 0.9)",
                  border: "1px solid hsl(var(--border) / 0.5)",
                  borderTop: "none",
                  borderLeft: "none",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.svg
          width="90"
          height="90"
          viewBox="0 0 90 90"
          style={{ transform: flipped ? "scaleX(-1)" : "scaleX(1)", overflow: "visible" }}
          animate={
            mood === "dancing" && !dragging
              ? { y: [0, -18, 0, -10, 0], rotate: [0, -10, 10, -6, 0] }
              : mood === "idle" && !dragging
              ? { y: [0, -5, 0] }
              : {}
          }
          transition={
            mood === "dancing"
              ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
              : mood === "idle" && !dragging
              ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              : {}
          }
        >
          {/* SVG Filters for premium look */}
          <defs>
            <radialGradient id="bodyGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="hsl(45,50%,85%)" />
              <stop offset="100%" stopColor="hsl(40,42%,72%)" />
            </radialGradient>
            <radialGradient id="bellyGrad" cx="45%" cy="30%" r="60%">
              <stop offset="0%" stopColor="hsl(48,55%,92%)" />
              <stop offset="100%" stopColor="hsl(44,45%,82%)" />
            </radialGradient>
            <radialGradient id="headGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="hsl(48,50%,90%)" />
              <stop offset="100%" stopColor="hsl(42,42%,76%)" />
            </radialGradient>
            <linearGradient id="scarfGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(155,55%,30%)" />
              <stop offset="50%" stopColor="hsl(150,60%,40%)" />
              <stop offset="100%" stopColor="hsl(155,55%,30%)" />
            </linearGradient>
            <linearGradient id="scarfStripe" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(145,65%,48%)" />
              <stop offset="100%" stopColor="hsl(150,70%,52%)" />
            </linearGradient>
            <linearGradient id="lensGrad" x1="0" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="hsl(30,50%,45%)" />
              <stop offset="40%" stopColor="hsl(25,45%,35%)" />
              <stop offset="100%" stopColor="hsl(20,40%,30%)" />
            </linearGradient>
            <radialGradient id="lensReflect" cx="30%" cy="30%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.45" />
              <stop offset="60%" stopColor="white" stopOpacity="0.15" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="beakGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(32,100%,58%)" />
              <stop offset="100%" stopColor="hsl(25,95%,48%)" />
            </linearGradient>
            <linearGradient id="feetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(28,100%,58%)" />
              <stop offset="100%" stopColor="hsl(22,90%,48%)" />
            </linearGradient>
            <filter id="duckShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dx="1" dy="2" />
              <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="glassShine" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Body with gradient */}
          <ellipse cx="40" cy="55" rx="28" ry="22" fill="url(#bodyGrad)" filter="url(#duckShadow)" />
          {/* Belly highlight */}
          <ellipse cx="40" cy="60" rx="17" ry="13" fill="url(#bellyGrad)" />
          {/* Body feather texture lines */}
          <ellipse cx="40" cy="52" rx="22" ry="16" fill="none" stroke="hsl(42,30%,78%)" strokeWidth="0.5" opacity="0.4" />
          <ellipse cx="40" cy="56" rx="18" ry="12" fill="none" stroke="hsl(42,30%,80%)" strokeWidth="0.4" opacity="0.3" />

          {/* Wing with subtle animation */}
          <motion.g
            animate={mood === "dancing" ? { rotate: [15, 25, 15] } : hovering ? { rotate: [15, 10, 15] } : {}}
            transition={{ duration: mood === "dancing" ? 0.3 : 0.6, repeat: Infinity }}
            style={{ transformOrigin: "55px 45px" }}
          >
            <ellipse cx="62" cy="50" rx="10" ry="16" fill="hsl(44,35%,78%)" transform="rotate(15, 62, 50)" />
            <ellipse cx="63" cy="50" rx="7" ry="12" fill="hsl(44,30%,82%)" transform="rotate(15, 63, 50)" opacity="0.5" />
          </motion.g>

          {/* Scarf - clean wrapped design */}
          {/* Back layer visible behind neck */}
          <path d="M 24 38 Q 32 34 40 34 Q 48 34 56 38" fill="hsl(150,55%,32%)" stroke="hsl(145,50%,25%)" strokeWidth="0.5" />
          
          {/* Main wrap - front band */}
          <path d="M 20 40 Q 28 44 40 44 Q 52 44 60 40 L 58 38 Q 50 42 40 42 Q 30 42 22 38 Z" fill="url(#scarfGrad)" />
          <path d="M 20 40 Q 28 44 40 44 Q 52 44 60 40 L 58 38 Q 50 42 40 42 Q 30 42 22 38 Z" fill="url(#scarfStripe)" opacity="0.4" />
          
          {/* Second wrap layer for thickness */}
          <path d="M 22 42 Q 30 46 40 46 Q 50 46 58 42 L 56 40 Q 48 44 40 44 Q 32 44 24 40 Z" fill="hsl(148,58%,36%)" />
          <path d="M 22 42 Q 30 46 40 46 Q 50 46 58 42" fill="none" stroke="hsl(145,65%,48%)" strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
          
          {/* Knot on the side */}
          <ellipse cx="24" cy="44" rx="4" ry="3" fill="hsl(150,55%,35%)" />
          <ellipse cx="24" cy="44" rx="2.5" ry="1.8" fill="hsl(145,60%,42%)" opacity="0.6" />
          
          {/* Animated tail 1 - longer */}
          <motion.path
            fill="hsl(150,55%,34%)"
            stroke="hsl(145,50%,25%)"
            strokeWidth="0.4"
            animate={{ d: [
              "M 21 46 Q 18 52 16 58 Q 14 64 16 68 L 19 67 Q 18 63 19 58 Q 21 52 23 47 Z",
              "M 21 46 Q 16 51 13 57 Q 10 63 13 68 L 16 67 Q 15 62 17 57 Q 19 51 23 47 Z",
              "M 21 46 Q 19 53 18 59 Q 17 65 18 68 L 21 67 Q 20 64 20 59 Q 21 53 23 47 Z",
              "M 21 46 Q 18 52 16 58 Q 14 64 16 68 L 19 67 Q 18 63 19 58 Q 21 52 23 47 Z",
            ] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Stripe on tail 1 */}
          <motion.path
            fill="none"
            stroke="hsl(145,65%,48%)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.4"
            animate={{ d: [
              "M 19 50 Q 17 56 16 62 Q 15 66 16 68",
              "M 19 50 Q 15 55 13 61 Q 11 65 13 68",
              "M 19 50 Q 18 57 18 63 Q 17 66 18 68",
              "M 19 50 Q 17 56 16 62 Q 15 66 16 68",
            ] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Animated tail 2 - shorter */}
          <motion.path
            fill="hsl(148,52%,37%)"
            stroke="hsl(145,50%,25%)"
            strokeWidth="0.3"
            animate={{ d: [
              "M 26 46 Q 24 51 22 55 L 25 55 Q 26 51 27 47 Z",
              "M 26 46 Q 23 50 20 54 L 23 54 Q 25 50 27 47 Z",
              "M 26 46 Q 25 52 24 56 L 27 56 Q 27 52 27 47 Z",
              "M 26 46 Q 24 51 22 55 L 25 55 Q 26 51 27 47 Z",
            ] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          
          {/* Fringe on tail ends */}
          <motion.g
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "16px 68px" }}
          >
            <line x1="15" y1="68" x2="13" y2="72" stroke="hsl(150,50%,30%)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="17" y1="68" x2="17" y2="72" stroke="hsl(150,50%,30%)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="19" y1="67" x2="20" y2="71" stroke="hsl(150,50%,30%)" strokeWidth="1.2" strokeLinecap="round" />
          </motion.g>

          {/* Head */}
          <circle cx="39" cy="28" r="20" fill="url(#headGrad)" />
          {/* Head highlight - soft glow */}
          <ellipse cx="34" cy="20" rx="9" ry="7" fill="hsl(50,50%,96%)" opacity="0.45" />
          {/* Head feather tuft */}
          <ellipse cx="39" cy="9" rx="4" ry="3" fill="hsl(48,45%,88%)" opacity="0.7" />

          {/* Seasonal accessory */}
          {getSeasonalAccessory()}

          {/* Aviator-style sunglasses - lighter brown tint */}
          <rect x="23" y="17" width="14" height="10" rx="5" fill="url(#lensGrad)" stroke="hsl(35,35%,35%)" strokeWidth="1.5" />
          <rect x="41" y="17" width="14" height="10" rx="5" fill="url(#lensGrad)" stroke="hsl(35,35%,35%)" strokeWidth="1.5" />
          {/* Lens reflections */}
          <rect x="23" y="17" width="14" height="10" rx="5" fill="url(#lensReflect)" />
          <rect x="41" y="17" width="14" height="10" rx="5" fill="url(#lensReflect)" />
          {/* Bridge */}
          <path d="M 37 22 Q 39 20 41 22" stroke="hsl(35,35%,35%)" strokeWidth="1.5" fill="none" />
          {/* Temple arm */}
          <line x1="55" y1="21" x2="61" y2="19" stroke="hsl(35,35%,35%)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Shine on lenses */}
          <ellipse cx="28" cy="20" rx="2" ry="1.5" fill="white" opacity="0.3" />
          <ellipse cx="46" cy="20" rx="2" ry="1.5" fill="white" opacity="0.3" />

          {/* Eyes - behind glasses for sleeping/love moods */}
          {getDuckFace()}

          {/* Premium beak with gradient + nostril detail */}
          <ellipse cx="39" cy="34" rx="8" ry="4.5" fill="url(#beakGrad)" />
          <ellipse cx="37" cy="33" rx="3.5" ry="1.8" fill="hsl(38,100%,68%)" opacity="0.5" />
          <circle cx="35" cy="34" r="0.8" fill="hsl(25,80%,40%)" opacity="0.3" />
          <circle cx="43" cy="34" r="0.8" fill="hsl(25,80%,40%)" opacity="0.3" />
          {/* Beak smile line */}
          <path d="M 33 35.5 Q 39 37.5 45 35.5" stroke="hsl(25,80%,42%)" strokeWidth="0.6" fill="none" opacity="0.4" />

          {/* Blush - warm rosy */}
          <ellipse cx="23" cy="30" rx="4.5" ry="2.5" fill="hsl(5,65%,75%)" opacity="0.3" />
          <ellipse cx="55" cy="30" rx="4.5" ry="2.5" fill="hsl(5,65%,75%)" opacity="0.3" />

          {/* Feet with gradient + toe details */}
          <ellipse cx="30" cy="75" rx="9" ry="3.5" fill="url(#feetGrad)" />
          <ellipse cx="50" cy="75" rx="9" ry="3.5" fill="url(#feetGrad)" />
          {/* Toe lines */}
          <line x1="25" y1="74" x2="22" y2="76" stroke="hsl(22,80%,42%)" strokeWidth="0.6" opacity="0.4" />
          <line x1="30" y1="74" x2="30" y2="77" stroke="hsl(22,80%,42%)" strokeWidth="0.6" opacity="0.4" />
          <line x1="35" y1="74" x2="37" y2="76" stroke="hsl(22,80%,42%)" strokeWidth="0.6" opacity="0.4" />
          <line x1="45" y1="74" x2="43" y2="76" stroke="hsl(22,80%,42%)" strokeWidth="0.6" opacity="0.4" />
          <line x1="50" y1="74" x2="50" y2="77" stroke="hsl(22,80%,42%)" strokeWidth="0.6" opacity="0.4" />
          <line x1="55" y1="74" x2="57" y2="76" stroke="hsl(22,80%,42%)" strokeWidth="0.6" opacity="0.4" />
          {/* Feet highlights */}
          <ellipse cx="29" cy="74" rx="4" ry="1.5" fill="hsl(32,100%,65%)" opacity="0.35" />
          <ellipse cx="49" cy="74" rx="4" ry="1.5" fill="hsl(32,100%,65%)" opacity="0.35" />

          {/* Action accessory */}
          {getAccessory()}
        </motion.svg>
      </motion.div>
    </>
  );
};

export default InteractiveDuck;
