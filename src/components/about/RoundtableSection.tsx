import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Users } from 'lucide-react';

/* ───────────────────────── PARTNER DATA ───────────────────────── */
export interface Partner {
  id: string;
  name: string;
  role: string;
  story: string;
  image: string;
  initials: string;
}

export const PARTNERS: Partner[] = [
  {
    id: 'partner-1',
    name: 'Partner one',
    role: 'Co-Founder & AI Solutions Lead',
    story:
      'Architecting autonomous operations and custom LLM agent workflows that eliminate manual friction. They lead our technical roadmap to help businesses transition into the AI era seamlessly, cutting operational overhead while expanding capacity.',
    image: '/team/partner1.jpg',
    initials: 'P1',
  },
  {
    id: 'partner-2',
    name: 'Partner two',
    role: 'Co-Founder & Full-Stack Architect',
    story:
      'Engineering lightning-fast web applications and high-conversion architectures designed for enterprise scale. Focused on resilient cloud infrastructure, deep CRM connectors, and digital experiences that turn visitors into long-term clients.',
    image: '/team/partner2.jpg',
    initials: 'P2',
  },
  {
    id: 'partner-3',
    name: 'Partner three',
    role: 'Co-Founder & Growth Strategist',
    story:
      'Specializing in search intelligence, AEO, and multi-channel acquisition pipelines. They transform search demand and AI-driven discoverability into predictable, sustainable business growth and continuous high-intent inbound pipeline.',
    image: '/team/partner3.jpg',
    initials: 'P3',
  },
];

/* ───────────────────────── GEOMETRY CONSTANTS (540x540 viewBox) ───────────────────────── */
const CX = 270;
const CY = 270;
const R = 190;

// Positions on the ring (540x540):
// Partner 1 at 12 o'clock (-90deg): x = 270, y = 80 (top: 80/540 = 14.81%)
// Partner 2 at 4 o'clock (30deg): x = 434.54, y = 365 (left: 80.47%, top: 67.59%)
// Partner 3 at 8 o'clock (150deg): x = 105.46, y = 365 (left: 19.53%, top: 67.59%)
const PARTNER_POSITIONS = [
  { deg: -90, sweepDeg: 0, x: 270, y: 80, left: '50%', top: '14.81%' },
  { deg: 30, sweepDeg: 120, x: 434.54, y: 365, left: '80.47%', top: '67.59%' },
  { deg: 150, sweepDeg: 240, x: 105.46, y: 365, left: '19.53%', top: '67.59%' },
];

/* ───────────────────────── SCROLL PROGRESS TO ARC & ACTIVE PARTNER ───────────────────────── */
function getArcAndActive(p: number) {
  // Phases:
  // 0.00 – 0.08  : idle, no arc
  // 0.08 – 0.32  : P1 active (top)
  // 0.32 – 0.46  : travel P1 → P2
  // 0.46 – 0.65  : P2 active (bottom-right)
  // 0.65 – 0.77  : travel P2 → P3
  // 0.77 – 0.87  : P3 active (bottom-left)
  // 0.87 – 0.96  : travel P3 → P1 (loop back, 240 → 360)
  // 0.96 – 1.00  : allComplete – show all three

  let sweepDeg = 0;
  let activeIndex: number | null = null;
  let allComplete = false;

  if (p <= 0.08) {
    sweepDeg = 0;
    activeIndex = null;
  } else if (p <= 0.32) {
    sweepDeg = 0;
    activeIndex = 0;
  } else if (p < 0.46) {
    const t = (p - 0.32) / (0.46 - 0.32);
    const eased = t * t * (3 - 2 * t);
    sweepDeg = eased * 120;
    activeIndex = sweepDeg <= 14 ? 0 : sweepDeg >= 106 ? 1 : null;
  } else if (p <= 0.65) {
    sweepDeg = 120;
    activeIndex = 1;
  } else if (p < 0.77) {
    const t = (p - 0.65) / (0.77 - 0.65);
    const eased = t * t * (3 - 2 * t);
    sweepDeg = 120 + eased * 120;
    activeIndex = sweepDeg <= 134 ? 1 : sweepDeg >= 226 ? 2 : null;
  } else if (p <= 0.87) {
    sweepDeg = 240;
    activeIndex = 2;
  } else if (p < 0.96) {
    // Return arc: travel from P3 back to P1 (240 → 360 deg)
    const t = (p - 0.87) / (0.96 - 0.87);
    const eased = t * t * (3 - 2 * t);
    sweepDeg = 240 + eased * 120;
    activeIndex = sweepDeg <= 254 ? 2 : sweepDeg >= 346 ? 0 : null;
  } else {
    // Full loop complete – arc full circle, show all three
    sweepDeg = 360;
    activeIndex = null;
    allComplete = true;
  }

  return { sweepDeg, activeIndex, allComplete };
}

/* ───────────────────────── PARTNER PHOTO ON ROUNDTABLE ───────────────────────── */
interface PartnerPhotoProps {
  partner: Partner;
  isActive: boolean;
  position: (typeof PARTNER_POSITIONS)[0];
  onClick: () => void;
}

const PartnerPhoto: React.FC<PartnerPhotoProps> = ({ partner, isActive, position, onClick }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={onClick}
      className="absolute cursor-pointer select-none"
      style={{
        left: position.left,
        top: position.top,
        transform: 'translate(-50%, -50%)',
        zIndex: isActive ? 30 : 15,
      }}
    >
      <div
        className="relative rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: '60px',
          height: '60px',
          transform: `scale(${isActive ? 1.6 : 1})`,
        }}
      >
        <div
          className={`w-full h-full rounded-full overflow-hidden transition-all duration-400 ${
            isActive
              ? 'border-2 border-[#00FFE5] shadow-[0_0_26px_rgba(0,230,210,0.85),0_0_10px_rgba(0,255,229,0.95)]'
              : 'border-2 border-[#00E6D2]/35 shadow-[0_0_10px_rgba(0,230,210,0.12)] hover:border-[#00E6D2]/70 hover:shadow-[0_0_14px_rgba(0,230,210,0.25)]'
          }`}
        >
          {!imgError ? (
            <img
              src={partner.image}
              alt={partner.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0a1a18] via-[#081513] to-[#040908] flex items-center justify-center text-[#00FFE5] font-mono font-bold text-xs tracking-wider">
              {partner.initials}
            </div>
          )}
        </div>

        {/* Outer gentle ripple ring when active */}
        {isActive && (
          <span className="absolute -inset-1 rounded-full border border-[#00FFE5]/50 animate-ping pointer-events-none" />
        )}
      </div>
    </div>
  );
};

/* ───────────────────────── MAIN ROUNDTABLE COMPONENT ───────────────────────── */
export const RoundtableSection: React.FC = () => {
  const runwayRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Framer Motion useScroll for high-precision RAF updates
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!prefersReducedMotion) {
      setScrollProgress(latest);
    }
  });

  // Native and Lenis scroll listeners as companion fallback
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!runwayRef.current) return;
      const rect = runwayRef.current.getBoundingClientRect();
      const runwayHeight = runwayRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = runwayHeight - windowHeight;

      if (maxScroll <= 0) return;

      const p = Math.min(Math.max(-rect.top / maxScroll, 0), 1);
      setScrollProgress(p);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.on('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (lenis) {
        lenis.off('scroll', handleScroll);
      }
    };
  }, [prefersReducedMotion]);

  // Calculate arc geometry and active partner
  const { sweepDeg, activeIndex, allComplete } = useMemo(() => {
    return getArcAndActive(scrollProgress);
  }, [scrollProgress]);

  // Calculate SVG arc path and dot position
  const { arcD, dotPos } = useMemo(() => {
    if (sweepDeg <= 0.2) {
      return { arcD: '', dotPos: { x: 270, y: 80 } };
    }
    // Full circle: render a closed circle path instead of arc
    if (sweepDeg >= 359.9) {
      const d = `M 270 80 A ${R} ${R} 0 1 1 ${(CX + R * Math.cos((-90 + 359.9) * Math.PI / 180)).toFixed(2)} ${(CY + R * Math.sin((-90 + 359.9) * Math.PI / 180)).toFixed(2)}`;
      return { arcD: d, dotPos: { x: 270, y: 80 } };
    }
    const currentDeg = -90 + sweepDeg;
    const currentRad = (currentDeg * Math.PI) / 180;
    const endX = CX + R * Math.cos(currentRad);
    const endY = CY + R * Math.sin(currentRad);

    const largeArcFlag = sweepDeg > 180 ? 1 : 0;
    const d = `M 270 80 A ${R} ${R} 0 ${largeArcFlag} 1 ${endX.toFixed(2)} ${endY.toFixed(2)}`;

    return { arcD: d, dotPos: { x: endX, y: endY } };
  }, [sweepDeg]);

  // Click on partner photo to smoothly scroll to their zone
  const handlePartnerClick = (idx: number) => {
    if (!runwayRef.current) return;
    const targets = [0.18, 0.58, 0.9];
    const targetP = targets[idx] ?? 0;
    const runwayTop = runwayRef.current.getBoundingClientRect().top + window.scrollY;
    const runwayHeight = runwayRef.current.offsetHeight;
    const maxScroll = runwayHeight - window.innerHeight;
    window.scrollTo({
      top: runwayTop + targetP * maxScroll,
      behavior: 'smooth',
    });
  };

  /* ───────────────────────── REDUCED MOTION VIEW ───────────────────────── */
  if (prefersReducedMotion) {
    return (
      <section
        aria-label="Agency Leadership"
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-[-0.02em] font-heading mb-3">
            <span className="block">Helping Businesses Move Into the</span>
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]"
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              AI Era
            </span>
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm font-normal max-w-lg mx-auto">
            Siddiqui Innovations is a Pakistan-based team helping businesses automate their daily operations, build stronger digital presences and grow without needing to hire for every new task.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTNERS.map((partner, idx) => (
            <div
              key={partner.id}
              className="rounded-[14px] bg-[#0A0F15] border border-[#00E6D2]/25 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-14 h-14 rounded-full border-2 border-[#00FFE5] overflow-hidden shrink-0 shadow-[0_0_14px_rgba(0,230,210,0.5)]">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#00E6D2]/10 border border-[#00E6D2]/20 text-[#00E6D2] font-mono text-[11px] font-semibold">
                      0{idx + 1} / 03
                    </span>
                    <h3 className="text-base font-bold text-white font-heading mt-0.5">
                      {partner.name}
                    </h3>
                    <div className="text-[11px] font-mono text-[#00E6D2]">{partner.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{partner.story}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ───────────────────────── SINGLE VIEWPORT STICKY SECTION ───────────────────────── */
  const activePartner = activeIndex !== null ? PARTNERS[activeIndex] : null;
  const [imgErrors, setImgErrors] = React.useState<Record<string, boolean>>({});

  return (
    <section
      ref={runwayRef}
      className="relative h-[320vh]"
      aria-label="About Siddiqui Innovations: Agency Leadership"
    >
      {/* Pinned Viewport Container (100vh) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-22 sm:pt-24 md:pt-26 lg:pt-28 pb-3 sm:pb-4 px-4 sm:px-6 lg:px-10 overflow-hidden">
        {/* ── 1. CLEAN HEADING BLOCK (Comfortable navbar clearance) ── */}
        <div className="max-w-3xl mx-auto text-center shrink-0 mb-1 sm:mb-2">
          <h1 className="text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-extrabold text-white tracking-[-0.02em] leading-[1.16] font-heading max-w-xl mx-auto mb-1.5 drop-shadow-md">
            <span className="block">Helping Businesses Move Into the</span>
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]"
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              AI Era
            </span>
          </h1>

          <p className="text-gray-300 text-xs sm:text-[13.5px] font-normal leading-relaxed font-sans max-w-lg mx-auto">
            Siddiqui Innovations is a Pakistan-based team helping businesses automate their daily operations, build stronger digital presences and grow without needing to hire for every new task.
          </p>
        </div>

        {/* ── 2. ROUNDTABLE ON LEFT (SHIFTED LEFT & LIFTED UP) & WIDE STORY RECTANGLE LIFTED UP ── */}
        <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 my-auto -mt-3 sm:-mt-5 lg:-mt-7 px-2 sm:px-4 lg:px-6">
          {/* LEFT: Roundtable shifted left and positioned higher to prevent any cropping */}
          <div className="flex items-center justify-center shrink-0 -ml-2 lg:-ml-6 xl:-ml-10">
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[410px] lg:h-[410px] xl:w-[430px] xl:h-[430px] select-none">
              {/* SVG Ring + Progress Arc + Travelling Dot */}
              <svg
                viewBox="0 0 540 540"
                className="w-full h-full pointer-events-none overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  <filter id="roundtableGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="arcStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00FFE5" />
                    <stop offset="100%" stopColor="#00E6D2" />
                  </linearGradient>
                </defs>

                {/* Faint Dashed Ring */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={R}
                  fill="none"
                  stroke="rgba(0, 230, 210, 0.22)"
                  strokeWidth="2"
                  strokeDasharray="5 7"
                />

                {/* Solid Teal Progress Arc */}
                {arcD && (
                  <path
                    d={arcD}
                    fill="none"
                    stroke="url(#arcStrokeGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="drop-shadow(0 0 8px rgba(0, 230, 210, 0.75))"
                  />
                )}

                {/* Travelling Teal Dot */}
                {dotPos && (
                  <g>
                    <circle
                      cx={dotPos.x}
                      cy={dotPos.y}
                      r="12"
                      fill="none"
                      stroke="#00FFE5"
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                    <circle
                      cx={dotPos.x}
                      cy={dotPos.y}
                      r="6.5"
                      fill="#00E6D2"
                      filter="url(#roundtableGlow)"
                    />
                  </g>
                )}
              </svg>

              {/* Center Table Badge: Users Icon + "The founders" */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-22 h-22 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full bg-[#080D12]/95 border border-[#00E6D2]/35 flex flex-col items-center justify-center text-center shadow-[0_0_26px_rgba(0,230,210,0.12)] pointer-events-none select-none z-10">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#00E6D2] mb-1" />
                <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-gray-300 font-semibold leading-none">
                  The founders
                </span>
              </div>

              {/* Three Partner Photo Frames (12, 4, and 8 o'clock) */}
              {PARTNERS.map((partner, index) => (
                <PartnerPhoto
                  key={partner.id}
                  partner={partner}
                  isActive={activeIndex === index}
                  position={PARTNER_POSITIONS[index]}
                  onClick={() => handlePartnerClick(index)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Rectangle longer till the end of the screen (lifted a bit above) */}
          <div className="flex-1 w-full lg:mr-2 xl:mr-6 flex items-center -mt-2 sm:-mt-4">
            <div className="w-full min-h-[250px] sm:min-h-[270px] relative">
              <AnimatePresence mode="wait">
                {activePartner ? (
                  /* Active Partner moves into the right card with animated slide from left */
                  <motion.div
                    key={activePartner.id}
                    initial={{ opacity: 0, x: -60, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 40, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    aria-live="polite"
                    className="w-full min-h-[250px] sm:min-h-[270px] rounded-2xl bg-[#0A0F15]/95 border border-[#00E6D2]/30 p-6 sm:p-7 shadow-[0_16px_48px_rgba(0,0,0,0.65),0_0_35px_rgba(0,230,210,0.08)] flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden"
                  >
                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-44 h-44 bg-[#00E6D2]/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Partner Avatar inside the right card */}
                    <div className="flex flex-col items-center justify-center shrink-0 my-auto">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#00FFE5] shadow-[0_0_24px_rgba(0,230,210,0.7)] overflow-hidden relative">
                        <img
                          src={activePartner.image}
                          alt={activePartner.name}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                          className="w-full h-full object-cover"
                        />
                        <div className="w-full h-full bg-gradient-to-br from-[#0a1a18] via-[#081513] to-[#040908] flex items-center justify-center text-[#00FFE5] font-mono font-bold text-lg">
                          {activePartner.initials}
                        </div>
                      </div>
                    </div>

                    {/* Partner Content & Story */}
                    <div className="flex-1 flex flex-col justify-between h-full text-center md:text-left">
                      <div>
                        <div className="flex items-center justify-center md:justify-between mb-2">
                          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                            Founding Partner
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight mb-2.5">
                          {activePartner.name}
                        </h3>

                        <p className="text-gray-300 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed font-sans max-w-2xl">
                          {activePartner.story}
                        </p>
                      </div>

                      {/* Clean footer */}
                      <div className="pt-3.5 mt-3.5 border-t border-white/5 flex items-center justify-end text-xs text-gray-400 font-mono">
                        <span>Siddiqui Innovations</span>
                      </div>
                    </div>
                  </motion.div>
                ) : allComplete ? (
                  /* All-complete card: show all 3 partner images */
                  <motion.div
                    key="all-complete"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full min-h-[250px] sm:min-h-[270px] rounded-2xl bg-[#0A0F15]/95 border border-[#00E6D2]/30 p-6 sm:p-7 shadow-[0_16px_48px_rgba(0,0,0,0.65),0_0_35px_rgba(0,230,210,0.08)] flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-44 h-44 bg-[#00E6D2]/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Header */}
                    <div className="mb-4">
                      <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">Founding Partners</span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-tight mt-1">
                        The Team Behind the Vision
                      </h3>
                    </div>

                    {/* Three partner images side by side */}
                    <div className="flex flex-row items-stretch gap-4 flex-1">
                      {PARTNERS.map((partner, idx) => (
                        <motion.div
                          key={partner.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                          className="flex-1 flex flex-col items-center gap-3 rounded-xl bg-[#080D12]/80 border border-[#00E6D2]/20 p-4 hover:border-[#00E6D2]/50 hover:shadow-[0_0_18px_rgba(0,230,210,0.15)] transition-all duration-300"
                        >
                          {/* Avatar */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#00FFE5] overflow-hidden shadow-[0_0_20px_rgba(0,230,210,0.55)] shrink-0 relative">
                            {!imgErrors[partner.id] ? (
                              <img
                                src={partner.image}
                                alt={partner.name}
                                onError={() => setImgErrors(prev => ({ ...prev, [partner.id]: true }))}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[#0a1a18] via-[#081513] to-[#040908] flex items-center justify-center text-[#00FFE5] font-mono font-bold text-sm">
                                {partner.initials}
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="text-center">
                            <div className="text-[10px] font-mono text-[#00E6D2] uppercase tracking-widest mb-0.5">
                              0{idx + 1} / 03
                            </div>
                            <div className="text-sm font-bold text-white font-heading leading-tight">
                              {partner.name}
                            </div>
                            <div className="text-[11px] text-gray-400 font-mono mt-0.5 leading-snug">
                              {partner.role.split('&')[0].trim()}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-3.5 mt-3.5 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 font-mono">
                      <span>Siddiqui Innovations</span>
                      <span className="text-[#00E6D2]">✓ All partners met</span>
                    </div>
                  </motion.div>
                ) : (
                  /* Initial state card before scrolling */
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full min-h-[250px] sm:min-h-[270px] rounded-2xl bg-[#0A0F15]/95 border border-[#00E6D2]/30 p-6 sm:p-7 shadow-[0_16px_48px_rgba(0,0,0,0.65),0_0_35px_rgba(0,230,210,0.08)] flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-44 h-44 bg-[#00E6D2]/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Intro Icon */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#00E6D2]/30 bg-[#080D12] flex flex-col items-center justify-center text-[#00E6D2] shrink-0 shadow-[0_0_20px_rgba(0,230,210,0.15)] my-auto">
                      <Users className="w-8 h-8 sm:w-9 sm:h-9 mb-1" />
                      <span className="text-[9px] font-mono tracking-widest uppercase text-gray-300">Founders</span>
                    </div>

                    {/* Intro Text */}
                    <div className="flex-1 flex flex-col justify-between h-full text-center md:text-left">
                      <div>
                        <div className="flex items-center justify-center md:justify-between mb-2">
                          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                            Roundtable
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight mb-2.5">
                          Meet the Partners
                        </h3>

                        <p className="text-gray-300 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed font-sans max-w-2xl">
                          Scroll down to travel around the roundtable. Watch each founding partner move directly into focus with their background and philosophy.
                        </p>
                      </div>

                      <div className="pt-3.5 mt-3.5 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 font-mono">
                        <span className="text-gray-400">Siddiqui Innovations</span>
                        <span className="text-gray-400 flex items-center gap-1">
                          <span>Scroll to begin</span>
                          <span>↓</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── 3. BOTTOM SCROLL INDICATOR ── */}
        <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest shrink-0">
          <span>Scroll to travel roundtable</span>
          <span className="text-[#00E6D2] animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
};

export default RoundtableSection;
