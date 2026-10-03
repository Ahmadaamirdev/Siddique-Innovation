import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  ArrowUpRight,
  ChevronDown,
  Clapperboard,
  Scissors,
  Film,
  Eye,
  Calendar,
  AlertTriangle,
  Clock,
  CircleX,
  Hourglass,
  Zap,
  RefreshCw,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';
import type { ServiceItemData } from '../../data/servicesData';
import { serviceList } from '../../data/servicesData';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { WingLogo } from '../WingLogo';
import { CTA } from '../CTA';
import { ServiceProjectsSection } from './ServiceProjectsSection';
import { ServiceTestimonialsSection } from './ServiceTestimonialsSection';
import {
  youtubeAutomationProjects,
  youtubeAutomationTestimonials,
} from '../../data/serviceProjectsAndTestimonials';


const reelItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    title: 'Sunroom Conservatory',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    title: 'Modern White Living Room',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    title: 'Modern Villa Exterior',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    title: 'Yellow Armchair Room',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    title: 'Contemporary Studio Lounge',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    title: 'Modern Villa Poolside',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    title: 'Sunroom Conservatory 2',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    title: 'Modern White Living Room 2',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    title: 'Modern Villa Exterior 2',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    title: 'Yellow Armchair Room 2',
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    title: 'Contemporary Studio Lounge 2',
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    title: 'Modern Villa Poolside 2',
  },
  {
    id: 13,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    title: 'Sunroom Conservatory 3',
  },
  {
    id: 14,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    title: 'Modern White Living Room 3',
  },
  {
    id: 15,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    title: 'Modern Villa Exterior 3',
  },
  {
    id: 16,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    title: 'Yellow Armchair Room 3',
  },
];

// Carousel Constants
const SPEED = 70; // px/s
const MAX_ANGLE = 46; // deg (natural curved wall perspective)
const PUSH_Z = 130; // px (balanced forward projection without distortion)
const GAP = 8; // px (clean tight spacing)

const displayItems = [...reelItems, ...reelItems];

const Curved3DCarousel: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef = React.useRef(0);
  const containerWidthRef = React.useRef(1200);
  const cardWidthRef = React.useRef(250);
  const cardHeightRef = React.useRef(156);

  React.useEffect(() => {
    let animId: number;
    let lastTime: number | null = null;

    // Honor prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Pause when tab is hidden to avoid delta-time jumps
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lastTime = null;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Recalculate sizes on resize: card width sized smaller to fit comfortably (~21% of container, max 255px)
    const updateSize = () => {
      if (!containerRef.current) return;
      const cw = containerRef.current.offsetWidth || 1200;
      const w = Math.min(255, Math.max(110, Math.round((cw - GAP * 4) * 0.21)));
      const h = Math.round(w / 1.6);

      containerWidthRef.current = cw;
      cardWidthRef.current = w;
      cardHeightRef.current = h;

      cardRefs.current.forEach((el) => {
        if (el) {
          el.style.width = `${w}px`;
          el.style.height = `${h}px`;
          el.style.marginTop = `-${Math.round(h / 2)}px`;
        }
      });
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener('resize', updateSize);

    // Continuous 60fps delta-time animation loop
    const tick = (now: number) => {
      if (lastTime === null) {
        lastTime = now;
      }
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const containerWidth = containerWidthRef.current || containerRef.current?.offsetWidth || 1200;
      const cardWidth = cardWidthRef.current;
      const containerCenterX = containerWidth / 2;
      const stride = cardWidth + GAP;
      const totalCards = displayItems.length;
      const totalWidth = totalCards * stride;

      if (!isReducedMotion && !document.hidden) {
        offsetRef.current = (offsetRef.current + SPEED * dt) % totalWidth;
      }
      const offset = offsetRef.current;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        // Continuous card index u relative to loop (opposite motion: moving left-to-right)
        let u = (i + offset / stride) % totalCards;
        if (u < 0) u += totalCards;

        let diffU = u;
        if (diffU > totalCards / 2) {
          diffU -= totalCards;
        } else if (diffU < -totalCards / 2) {
          diffU += totalCards;
        }

        // Spacing curve ensuring adjacent cards NEVER merge while maintaining a clean, tight gap
        const absU = Math.abs(diffU);
        const compression = 12;
        const cardCenterX = containerCenterX + diffU * (stride - (compression / 2) * Math.min(absU, 3.5));
        const cardX = cardCenterX - cardWidth / 2;

        // Hide cards that are fully outside the container
        if (cardX + cardWidth < -GAP * 4 || cardX > containerWidth + GAP * 4) {
          el.style.visibility = 'hidden';
          return;
        }

        el.style.visibility = 'visible';

        // Normalized horizontal distance from container center:
        const d = Math.max(-1.4, Math.min(1.4, (cardCenterX - containerCenterX) / (containerWidth / 2)));
        const absD = Math.abs(d);

        // Curved "wall" transforms:
        const angle = -d * MAX_ANGLE;
        const z = Math.pow(absD, 1.6) * PUSH_Z - 28;
        const s = 1 - (1 - Math.min(absD, 1)) * 0.06;
        const zIndex = Math.round(absD * 10);

        el.style.zIndex = zIndex.toString();
        el.style.transform = `translate3d(${cardX.toFixed(2)}px, 0px, ${z.toFixed(2)}px) rotateY(${angle.toFixed(2)}deg) scale(${s.toFixed(4)})`;

        // Scanner reveal:
        // clip-path: inset(0 {cardWidth - clamp(containerCenterX - cardX, 0, cardWidth)}px 0 0)
        const overlay = overlayRefs.current[i];
        if (overlay) {
          const overlap = Math.max(0, Math.min(cardWidth, containerCenterX - cardX));
          const rightInset = Math.round(cardWidth - overlap);
          overlay.style.clipPath = `inset(0 ${rightInset}px 0 0)`;
        }
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('resize', updateSize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-6 sm:mt-8 select-none">
      {/* Inject custom pulsing glow keyframes for the central scanner beam */}
      <style>{`
        @keyframes scanner-pulse-glow {
          0%, 100% {
            opacity: 0.85;
            box-shadow: 0 0 10px #00e6d2, 0 0 22px #00ffe5, 0 0 35px rgba(0, 230, 210, 0.6);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 16px #00ffe5, 0 0 32px #10b981, 0 0 50px rgba(0, 255, 229, 0.95);
          }
        }
      `}</style>

      {/* Top pill indicator with subtle cyan glow */}
      <div className="w-12 sm:w-14 h-1 rounded-full bg-white/20 hover:bg-[#00E6D2]/60 mx-auto mb-4 sm:mb-5 shadow-[0_0_12px_rgba(0,230,210,0.25)] transition-colors" />

      {/* Left & Right gradient edge blur for cinematic blending */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#050608] via-[#050608]/80 to-transparent z-30" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#050608] via-[#050608]/80 to-transparent z-30" />

      {/* 3D Curved Viewport Container with perspective: 900px strictly on parent container */}
      <div
        ref={containerRef}
        className="relative w-full h-[230px] sm:h-[250px] md:h-[270px] lg:h-[285px] overflow-hidden py-1 select-none"
        style={{
          perspective: '900px',
          WebkitPerspective: '900px',
          perspectiveOrigin: '50% 50%',
          WebkitPerspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
        }}
      >
        {/* Render duplicated list of cards for seamless continuous looping */}
        {displayItems.map((item, idx) => (
          <div
            key={`reel-card-${item.id}-${idx}`}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="absolute left-0 rounded-2xl overflow-hidden border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.85)] bg-neutral-900"
            style={{
              top: '50%',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          >
            {/* a) Base Full-Color Image Layer */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              loading="lazy"
            />

            {/* b) Grayscale Layer on Top with Halftone Dots */}
            <div
              ref={(el) => {
                overlayRefs.current[idx] = el;
              }}
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl will-change-[clip-path]"
            >
              {/* Grayscale & Contrast-boosted Image */}
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover select-none pointer-events-none filter grayscale contrast-[1.15]"
                loading="lazy"
              />

              {/* Subtle Dot/Halftone Overlay (radial-gradient dots, 4px grid, mix-blend-mode: multiply) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000000 1.2px, #ffffff 1.2px)',
                  backgroundSize: '4px 4px',
                  mixBlendMode: 'multiply',
                  opacity: 0.35,
                }}
              />
            </div>
          </div>
        ))}

        {/* 3px Vertical Scanner Line in the Exact Center with Pulsing Glow (reduced length) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none flex items-center justify-center h-[145px] sm:h-[160px] md:h-[175px] lg:h-[185px]">
          <div
            className="w-[3px] h-full rounded-full"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0, 230, 210, 0) 0%, rgba(255, 255, 255, 0.95) 20%, rgba(0, 255, 229, 1) 50%, rgba(255, 255, 255, 0.95) 80%, rgba(0, 230, 210, 0) 100%)',
              animation: 'scanner-pulse-glow 3s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </div>
  );
};

interface YouTubeAutomationPageProps {
  service: ServiceItemData;
  onNavigateHome: () => void;
  onNavigateService: (slug: string) => void;
  onNavigate?: (path: string) => void;
}

export const YouTubeAutomationPage: React.FC<YouTubeAutomationPageProps> = ({
  service,
  onNavigateHome,
  onNavigateService,
  onNavigate,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleNav = (path: string) => {
    if (path === '/') {
      onNavigateHome();
    } else if (path.startsWith('/services/') || path.startsWith('/service/')) {
      const slug = path.replace(/^\/services?\//, '').replace(/\/$/, '');
      onNavigateService(slug);
    } else if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('service-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#00E6D2] selection:text-black relative overflow-x-hidden font-sans">
      {/* Background Cinematic Crimson-Cyan Glow */}
      <div className="fixed top-12 left-1/3 w-[600px] h-[350px] bg-gradient-to-r from-red-600/5 via-[#00E6D2]/10 to-transparent blur-[140px] pointer-events-none -z-0" />

      <Navbar
        isHeroRevealed={true}
        currentPath={`/services/${service.slug}`}
        onNavigate={handleNav}
      />

      <main className="pt-28 sm:pt-36 relative z-10">
        {/* 1. HERO SECTION: Autonomous Studio Hero & 3D Curved Transformation Showcase */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-4">
          {/* Heading, Description, and CTA Block */}
          <div className="max-w-4xl mx-auto text-center space-y-2 mb-2 sm:mb-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading py-0.5 drop-shadow-md">
              <span className="block">Grow a YouTube Channel Without</span>
              <span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_25px_rgba(0,255,229,0.35)]"
                style={{ WebkitTextFillColor: 'transparent' }}
              >
                Managing It Yourself
              </span>
            </h1>

            <div className="pt-4 sm:pt-6 flex justify-center">
              <a
                href="#service-cta"
                onClick={handleScrollToContact}
                className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_20px_rgba(0,230,210,0.35)] hover:shadow-[0_0_30px_rgba(0,255,229,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 font-heading cursor-pointer"
              >
                <span>{service.ctaButtonText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#050505] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* 3D Curved Separate Cards Carousel */}
          <Curved3DCarousel />
        </section>

        {/* 2. PROBLEM & SOLUTION: Burning Out on YouTube vs Scaled System */}
        <section className="py-20 md:py-28 relative overflow-hidden bg-[#050608] border-y border-white/10">
          {/* Subtle Background Radial / Waves */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#00E6D2]/[0.03] blur-[170px] pointer-events-none" />

          {/* Clean Decorative Top Gradient Divider */}
          <svg
            className="w-full h-8 absolute top-0 left-0 right-0 pointer-events-none opacity-20"
            viewBox="0 0 1440 32"
            fill="none"
          >
            <path
              d="M0 31.5H1440"
              stroke="url(#problemSolutionDividerYT)"
              strokeWidth="1"
            />
            <defs>
              <linearGradient id="problemSolutionDividerYT" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#00E6D2" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>

          <div className="max-w-[1140px] xl:max-w-[1220px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 relative items-stretch">
              {/* Central Vertical Divider */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/10 pointer-events-none">
                <div className="absolute left-1/2 top-[154px] -translate-x-1/2 -translate-y-1/2 z-20 px-3 py-0.5 bg-[#080D12] text-[10px] font-mono tracking-wider text-gray-400 uppercase whitespace-nowrap">
                  FROM BURNOUT &rarr; AUTOPILOT
                </div>
              </div>

              {/* Mobile Divider */}
              <div className="lg:hidden flex justify-center -my-4">
                <div className="px-3 py-0.5 bg-[#080D12] text-[10px] font-mono tracking-wider text-gray-400 uppercase whitespace-nowrap">
                  FROM BURNOUT &rarr; AUTOPILOT
                </div>
              </div>

              {/* LEFT COLUMN: Problem (Burning Out on Content) */}
              <div className="w-full max-w-[460px] mx-auto lg:mr-12 xl:mr-14 lg:ml-auto flex flex-col justify-between h-full">
                <div>
                  <div className="w-full mb-6 lg:h-[130px] flex flex-col justify-start">
                    <div className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs tracking-wider uppercase font-mono">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      <span>BURNING OUT ON CONTENT</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[30px] font-extrabold text-white tracking-tight leading-[1.15] font-heading mt-3">
                      Growing a Channel Takes More Time Than You Have
                    </h2>
                  </div>

                  {/* 3 Metric Rows */}
                  <div className="divide-y divide-white/10 border-y border-white/10">
                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading leading-tight">
                          20+ hrs <span className="text-red-500">burned</span>
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          WEEKLY PRODUCTION TIME DRAIN
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <CircleX className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-red-500 tracking-tight font-heading leading-tight">
                          0%
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          ALGORITHM MOMENTUM (INCONSISTENT)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <Hourglass className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-red-500 tracking-tight font-heading leading-tight">
                          Low CTR
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          AMATEUR PACKAGING &amp; SKIPPED HOOKS
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        Spending 20+ hours editing videos instead of running your company
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        Inconsistent uploads causing algorithm penalty and flatlined views
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        Amateur thumbnails and poor retention hooks that get skipped
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Solution (Hands-Off Autonomous Studio) */}
              <div className="w-full max-w-[460px] mx-auto lg:ml-12 xl:ml-14 lg:mr-auto flex flex-col justify-between h-full">
                <div>
                  <div className="w-full mb-6 lg:h-[130px] flex flex-col justify-start">
                    <div className="inline-flex items-center gap-2 text-[#00E6D2] font-semibold text-xs tracking-wider uppercase font-mono">
                      <WingLogo className="w-4 h-4 shrink-0" />
                      <span>HANDS-OFF AUTOMATION</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[30px] font-extrabold text-white tracking-tight leading-[1.15] font-heading mt-3">
                      Full-Scale <span className="text-[#00FFE5]">Autonomous Studio</span>
                    </h2>
                  </div>

                  {/* 3 Metric Rows */}
                  <div className="divide-y divide-white/10 border-y border-white/10">
                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 text-[#00FFE5]" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading leading-tight">
                          100%
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          HANDS-OFF PRODUCTION PIPELINE
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <RefreshCw className="w-4 h-4 text-[#00FFE5]" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-[#00FFE5] tracking-tight font-heading leading-tight">
                          12-15%
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          HIGH-CTR VIRAL PACKAGING
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-[#00FFE5]" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-[#00FFE5] tracking-tight font-heading leading-tight">
                          Weekly
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          GUARANTEED CONSISTENT UPLOADS
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        <strong className="text-white font-semibold">Full studio pipeline:</strong> Scripting, Voiceover, 4K Editing, Packaging
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        <strong className="text-white font-semibold">High-converting viral thumbnail designs</strong> tested for maximum CTR
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        <strong className="text-white font-semibold">Consistent weekly uploads</strong> without you touching video editing software
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CAPABILITIES / FEATURES (Service Cards Grid) */}
        <section id="production-pipeline" className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00E6D2]/[0.04] blur-[160px] pointer-events-none -z-0" />

          <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0" />
              <span>STUDIO SERVICES</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading mt-1">
              What You Get With YouTube Automation
            </h2>
          </div>

          {/* 6 Service Cards Grid (Matches Home Page & AI Automation) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {service.features.map((feature, index) => {
              const icons = [Clapperboard, Scissors, Film, Eye, Calendar, TrendingUp];
              const IconComp = icons[index % icons.length];

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
                  className="lg:col-span-2 group relative flex flex-col justify-between bg-[#0B0E13]/90 backdrop-blur-xl border border-white/10 hover:border-[#00E6D2]/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(0,230,210,0.15)] transform-gpu will-change-transform"
                >
                  <div className="flex flex-col flex-1">
                    {/* Header: Icon Box and Title inline */}
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center text-[#00E6D2] group-hover:scale-105 group-hover:bg-[#00E6D2]/20 transition-all duration-300">
                        <IconComp className="w-5 h-5 text-[#00E6D2]" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00E6D2] transition-colors leading-snug font-heading">
                        {feature.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 4. EXECUTION ROADMAP: Moving Cards Track in Continuous Motion */}
        <section className="py-24 bg-[#070A0E] border-y border-white/10 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#00E6D2]/[0.03] blur-[150px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 text-center">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0" />
              <span>PRODUCTION CYCLE</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] mt-1 font-heading">
              {service.processHeading}
            </h2>
          </div>

          {/* Continuous Moving Cards Carousel Track */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-4">
            <div className="animate-marquee-infinite gap-6 pl-6">
              {[...service.processSteps, ...service.processSteps].map((step, idx) => (
                <div
                  key={`${step.number}-${idx}`}
                  className="w-[280px] sm:w-[320px] shrink-0 p-6 rounded-2xl bg-[#090D12] border border-white/10 hover:border-[#00FFE5]/50 hover:bg-[#00FFE5]/[0.04] transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.5)] select-none"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold tracking-wider text-[#00E6D2] group-hover:text-[#00FFE5] transition-colors">
                        STAGE 0{step.number}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#00FFE5] group-hover:translate-x-1 transition-all" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 font-heading group-hover:text-[#00FFE5] transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-[#00E6D2]/80">
                    <span>STAGE 0{step.number} // ACTIVE</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <ServiceProjectsSection
          serviceName="YouTube Automation"
          projects={youtubeAutomationProjects}
          subheading="Automated channel pipelines, AI voice & script workflows, and high-retention video production."
          onNavigateToProjects={() => onNavigate?.('/projects')}
        />

        {/* Testimonials Section */}
        <ServiceTestimonialsSection
          serviceName="YouTube Automation"
          testimonials={youtubeAutomationTestimonials}
          subheading="Verified results from channel owners and media creators scaling passive YouTube revenue."
        />

        {/* 5. FAQS */}
        <section className="py-14 md:py-20 relative z-10 overflow-hidden border-b border-white/10">
          {/* Soft Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-radial from-[#00E6D2]/5 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
                  <WingLogo className="w-5 h-5 shrink-0" />
                  <span>FAQS</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading">
                  {service.faqsHeading}
                </h2>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-sans pt-1">
                  Everything you need to know about our {service.title.toLowerCase()} service and delivery.
                </p>
              </div>
            </div>

            {/* Decent, Refined Accordion List */}
            <div className="space-y-3.5">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.06,
                      ease: [0.22, 0.61, 0.36, 1] as const,
                    }}
                    className={`rounded-2xl transition-all duration-300 border overflow-hidden ${isOpen
                      ? 'bg-[#0A0E13] border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                      : 'bg-[#0A0E13]/60 border-white/10 hover:border-white/20 hover:bg-[#0A0E13]/85'
                      }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full px-5 sm:px-6 py-4.5 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                        <span className="text-xs font-mono font-medium text-gray-500 shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`text-base sm:text-[17px] font-medium tracking-tight transition-colors font-heading ${isOpen
                            ? 'text-white'
                            : 'text-gray-200 group-hover:text-white'
                            }`}
                        >
                          {faq.question}
                        </span>
                      </div>

                      {/* Clean Dropdown Arrow Button */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${isOpen
                          ? 'bg-[#00E6D2]/15 border-[#00E6D2]/50 text-[#00FFE5] rotate-180 shadow-[0_0_12px_rgba(0,230,210,0.2)]'
                          : 'bg-white/[0.04] border-white/10 text-gray-400 group-hover:bg-[#00E6D2]/15 group-hover:border-[#00E6D2]/50 group-hover:text-[#00FFE5] group-hover:shadow-[0_0_12px_rgba(0,230,210,0.2)]'
                          }`}
                      >
                        <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] as const }}
                        >
                          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-gray-400 text-sm sm:text-[15px] leading-relaxed font-sans border-t border-white/5">
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. EXPLORE OTHER SERVICES */}
        <section className="py-16 border-t border-white/10 bg-[#06080B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0" />
              <span>EXPLORE SERVICES</span>
            </div>
            <h3 className="text-lg font-bold text-gray-300 mb-6 font-heading">
              Explore Our Other Core Services
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {serviceList
                .filter((s) => s.slug !== service.slug)
                .map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => onNavigateService(s.slug)}
                    className="px-5 py-2.5 rounded-full bg-[#0A0E13]/80 border border-white/10 hover:border-[#00E6D2]/40 hover:bg-[#00E6D2]/15 text-xs sm:text-sm font-medium text-gray-300 hover:text-[#00FFE5] hover:shadow-[0_0_15px_rgba(0,230,210,0.2)] transition-all duration-200 cursor-pointer"
                  >
                    {s.title}
                  </button>
                ))}
            </div>
          </div>
        </section>

        {/* 7. CTA SECTION */}
        <CTA
          id="service-cta"
          initialService={service.title}
          heading={service.ctaHeading}
          subheading={service.ctaSubheading}
        />
      </main>

      <Footer onNavigate={handleNav} />
    </div>
  );
};
