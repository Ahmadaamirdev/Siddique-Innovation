import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { Users } from 'lucide-react';

/* ───────────────────────── PARTNER DATA ───────────────────────── */
interface Partner {
  id: string;
  name: string;
  role: string;
  story: string;
  image: string;
  initials: string;
}

const PARTNERS: Partner[] = [
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
  // Balanced, responsive phases without bloated dead-zones:
  // 0.00 – 0.06  : P1 active (top) initial rest
  // 0.06 – 0.32  : smooth travel P1 → P2 (sweep 0° → 120°)
  // 0.32 – 0.40  : P2 dwell (arc at 120°)
  // 0.40 – 0.66  : smooth travel P2 → P3 (sweep 120° → 240°)
  // 0.66 – 0.74  : P3 dwell (arc at 240°)
  // 0.74 – 0.92  : smooth travel P3 → P1 (sweep 240° → 360°)
  // 0.92 – 1.00  : allComplete – full circle, show all three

  let sweepDeg = 0;
  let activeIndex: number | null = 0;
  let allComplete = false;

  if (p <= 0.06) {
    sweepDeg = 0;
    activeIndex = 0;
  } else if (p < 0.32) {
    const t = (p - 0.06) / (0.32 - 0.06);
    const eased = t * t * (3 - 2 * t);
    sweepDeg = eased * 120;
    activeIndex = sweepDeg < 60 ? 0 : 1;
  } else if (p <= 0.40) {
    sweepDeg = 120;
    activeIndex = 1;
  } else if (p < 0.66) {
    const t = (p - 0.40) / (0.66 - 0.40);
    const eased = t * t * (3 - 2 * t);
    sweepDeg = 120 + eased * 120;
    activeIndex = sweepDeg < 180 ? 1 : 2;
  } else if (p <= 0.74) {
    sweepDeg = 240;
    activeIndex = 2;
  } else if (p < 0.92) {
    const t = (p - 0.74) / (0.92 - 0.74);
    const eased = t * t * (3 - 2 * t);
    sweepDeg = 240 + eased * 120;
    if (sweepDeg < 300) {
      activeIndex = 2;
      allComplete = false;
    } else {
      activeIndex = null;
      allComplete = true;
    }
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
        className="relative rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: '60px',
          height: '60px',
          transform: `scale(${isActive ? 1.6 : 1})`,
        }}
      >
        <div
          className={`w-full h-full rounded-full overflow-hidden transition-all duration-300 ${
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

  // Framer Motion useScroll for high-precision scroll tracking
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end end'],
  });

  // Snappy yet fluid spring physics to smooth discrete wheel ticks and touch momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 26,
    mass: 0.1,
    restDelta: 0.0005,
  });

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (!prefersReducedMotion) {
      const clamped = Math.min(Math.max(latest, 0), 1);
      setScrollProgress(clamped);
    }
  });

  // Ensure initial progress matches viewport on load
  useEffect(() => {
    if (prefersReducedMotion) return;
    const initial = scrollYProgress.get();
    if (typeof initial === 'number' && !isNaN(initial)) {
      setScrollProgress(Math.min(Math.max(initial, 0), 1));
    }
  }, [prefersReducedMotion, scrollYProgress]);

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
    const targets = [0.03, 0.36, 0.70];
    const targetP = targets[idx] ?? 0;
    const runwayTop = runwayRef.current.getBoundingClientRect().top + window.scrollY;
    const runwayHeight = runwayRef.current.offsetHeight;
    const maxScroll = runwayHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    window.scrollTo({
      top: runwayTop + targetP * maxScroll,
      behavior: 'smooth',
    });
  };

  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

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

  return (
    <section
      ref={runwayRef}
      className="relative h-[200vh] sm:h-[220vh]"
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
                {allComplete ? (
                  /* All-complete card: show all 3 partner images */
                  <motion.div
                    key="all-complete"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full min-h-[200px] sm:min-h-[250px] md:min-h-[270px] rounded-2xl bg-[#0A0F15]/95 border border-[#00E6D2]/30 p-4 sm:p-7 shadow-[0_16px_48px_rgba(0,0,0,0.65),0_0_35px_rgba(0,230,210,0.08)] flex flex-col justify-center relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-44 h-44 bg-[#00E6D2]/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Header */}
                    <div className="mb-3 sm:mb-5 text-center">
                      <span className="text-[10px] sm:text-[11px] font-mono text-[#00E6D2] uppercase tracking-widest">Founding Partners</span>
                      <h3 className="text-base sm:text-2xl font-extrabold text-white font-heading tracking-tight mt-0.5 sm:mt-1">
                        The Team Behind the Vision
                      </h3>
                    </div>

                    {/* Three partner images side by side - simply the three pictures */}
                    <div className="grid grid-cols-3 sm:flex sm:flex-row items-center justify-center gap-3 sm:gap-6 flex-1 py-2 sm:py-3">
                      {PARTNERS.map((partner, idx) => (
                        <motion.div
                          key={partner.id}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          className="flex-1 flex flex-col items-center justify-center rounded-xl bg-[#080D12]/80 border border-[#00E6D2]/20 p-3 sm:p-5 hover:border-[#00E6D2]/50 hover:shadow-[0_0_18px_rgba(0,230,210,0.15)] transition-all duration-300"
                        >
                          {/* Avatar */}
                          <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-[#00FFE5] overflow-hidden shadow-[0_0_20px_rgba(0,230,210,0.55)] shrink-0 relative">
                            {!imgErrors[partner.id] ? (
                              <img
                                src={partner.image}
                                alt={partner.name}
                                onError={() => setImgErrors(prev => ({ ...prev, [partner.id]: true }))}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[#0a1a18] via-[#081513] to-[#040908] flex items-center justify-center text-[#00FFE5] font-mono font-bold text-sm sm:text-base">
                                {partner.initials}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  /* Active Partner card */
                  <motion.div
                    key={(activePartner || PARTNERS[0]).id}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    aria-live="polite"
                    className="w-full min-h-[140px] sm:min-h-[250px] md:min-h-[270px] rounded-2xl bg-[#0A0F15]/95 border border-[#00E6D2]/30 p-3 sm:p-7 shadow-[0_16px_48px_rgba(0,0,0,0.65),0_0_35px_rgba(0,230,210,0.08)] flex flex-row items-center md:items-start gap-3 sm:gap-6 relative overflow-hidden"
                  >
                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-44 h-44 bg-[#00E6D2]/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Partner Avatar on left */}
                    <div className="flex flex-col items-center justify-center shrink-0 my-auto">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-[#00FFE5] shadow-[0_0_24px_rgba(0,230,210,0.7)] overflow-hidden relative">
                        <img
                          src={(activePartner || PARTNERS[0]).image}
                          alt={(activePartner || PARTNERS[0]).name}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                          className="w-full h-full object-cover"
                        />
                        <div className="w-full h-full bg-gradient-to-br from-[#0a1a18] via-[#081513] to-[#040908] flex items-center justify-center text-[#00FFE5] font-mono font-bold text-sm sm:text-base md:text-lg">
                          {(activePartner || PARTNERS[0]).initials}
                        </div>
                      </div>
                    </div>

                    {/* Partner Content & Story on right */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between h-full text-left">
                      <div>
                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                          <span className="text-[9.5px] sm:text-[11px] font-mono text-[#00E6D2] uppercase tracking-widest font-semibold">
                            Founding Partner
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-2xl md:text-3xl font-extrabold text-white font-heading tracking-tight mb-1 sm:mb-2">
                          {(activePartner || PARTNERS[0]).name}
                        </h3>

                        <p className="text-gray-300 text-[11px] sm:text-sm lg:text-[14.5px] leading-relaxed font-sans line-clamp-4 sm:line-clamp-none">
                          {(activePartner || PARTNERS[0]).story}
                        </p>
                      </div>

                      {/* Clean footer */}
                      <div className="pt-2 sm:pt-3.5 mt-2 sm:mt-3.5 border-t border-white/5 flex items-center justify-end text-[10px] sm:text-xs text-gray-400 font-mono">
                        <span>Siddiqui Innovations</span>
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
