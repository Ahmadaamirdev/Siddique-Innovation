import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// SVG Brand Icons
export const InstagramIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const FacebookIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const TikTokIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.86-4.47V8.72a8.28 8.28 0 0 0 4.91 1.6V6.87a4.8 4.8 0 0 1-1-.18z" />
  </svg>
);

export const YouTubeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const GoogleAdsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.35 11.1h-9.17v2.98h5.27c-.23 1.25-.94 2.31-2 3.02v2.51h3.24c1.89-1.74 2.98-4.3 2.98-7.38 0-.71-.06-1.4-.18-2.05l-.14-.08z" />
    <path d="M12.18 22c2.7 0 4.96-.9 6.61-2.43l-3.24-2.51c-.9.6-2.04.95-3.37.95-2.6 0-4.8-1.76-5.58-4.12H3.25v2.59C4.89 19.74 8.28 22 12.18 22z" />
    <path d="M6.6 13.89c-.2-.6-.31-1.24-.31-1.89s.11-1.29.31-1.89V7.52H3.25C2.58 8.86 2.2 10.38 2.2 12s.38 3.14 1.05 4.48l3.35-2.59z" />
    <path d="M12.18 4.96c1.47 0 2.79.51 3.82 1.5l2.87-2.87C17.14 2.01 14.88 1.1 12.18 1.1 8.28 1.1 4.89 3.36 3.25 6.63l3.35 2.59c.78-2.36 2.98-4.12 5.58-4.12z" />
  </svg>
);

export const LinkedInIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export interface PlatformConfig {
  id: string;
  name: string;
  side: 'left' | 'right';
  xPercent: number;
  yPercent: number;
  delay: number;
  duration: number;
  rotation: number;
  pathId: string;
  pathD: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

export const PLATFORM_CONFIGS: PlatformConfig[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    side: 'left',
    xPercent: 12,
    yPercent: 16,
    delay: 0,
    duration: 5.4,
    rotation: -4,
    pathId: 'path-instagram',
    pathD: 'M 120 75 C 240 75, 330 95, 420 120',
    icon: InstagramIcon,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    side: 'left',
    xPercent: 7,
    yPercent: 47,
    delay: 0.9,
    duration: 6.2,
    rotation: 3,
    pathId: 'path-facebook',
    pathD: 'M 70 215 C 180 215, 310 165, 455 125',
    icon: FacebookIcon,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    side: 'left',
    xPercent: 15,
    yPercent: 76,
    delay: 1.5,
    duration: 4.8,
    rotation: -5,
    pathId: 'path-tiktok',
    pathD: 'M 150 345 C 240 345, 350 245, 485 130',
    icon: TikTokIcon,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    side: 'right',
    xPercent: 88,
    yPercent: 16,
    delay: 0.5,
    duration: 5.8,
    rotation: 4,
    pathId: 'path-youtube',
    pathD: 'M 880 75 C 760 75, 670 95, 580 120',
    icon: YouTubeIcon,
  },
  {
    id: 'google',
    name: 'Google Ads',
    side: 'right',
    xPercent: 93,
    yPercent: 47,
    delay: 1.2,
    duration: 6.5,
    rotation: -3,
    pathId: 'path-google',
    pathD: 'M 930 215 C 820 215, 690 165, 545 125',
    icon: GoogleAdsIcon,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    side: 'right',
    xPercent: 85,
    yPercent: 76,
    delay: 1.8,
    duration: 5.1,
    rotation: 5,
    pathId: 'path-linkedin',
    pathD: 'M 850 345 C 760 345, 650 245, 515 130',
    icon: LinkedInIcon,
  },
];

interface TargetingFunnelStageProps {
  className?: string;
}

export const TargetingFunnelStage: React.FC<TargetingFunnelStageProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Pause animations when offscreen to save GPU/CPU
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[1100px] mx-auto select-none ${className}`}
      aria-hidden="true"
    >
      {/* Mobile Horizontal Platform Icons Row (< 640px) */}
      <div className="flex sm:hidden items-center justify-center gap-2 mb-3">
        {PLATFORM_CONFIGS.map((platform) => {
          const Icon = platform.icon;
          return (
            <div
              key={platform.id}
              className="w-10 h-10 rounded-xl bg-[#0A0E14]/90 border border-[#00E6D2]/25 shadow-[0_0_15px_rgba(0,230,210,0.12)] flex items-center justify-center text-[#00E6D2]"
              title={platform.name}
            >
              <Icon className="w-4 h-4" />
            </div>
          );
        })}
      </div>

      {/* Main Funnel Stage Canvas Container */}
      <div className="relative w-full h-[360px] sm:h-[430px] lg:h-[470px] flex items-center justify-center overflow-visible">
        {/* Soft Radial Teal Ambient Glow centered on funnel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[620px] h-[340px] bg-radial from-[#00E6D2]/15 via-[#00E6D2]/4 to-transparent blur-[100px] pointer-events-none -z-0" />

        {/* Desktop / Tablet Floating Platform Icon Tiles (Overlay) */}
        {PLATFORM_CONFIGS.map((platform) => {
          const Icon = platform.icon;
          return (
            <div
              key={platform.id}
              style={{
                left: `${platform.xPercent}%`,
                top: `${platform.yPercent}%`,
              }}
              className="absolute hidden sm:flex -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <motion.div
                animate={
                  shouldReduceMotion || !isInView
                    ? { y: 0, rotate: platform.rotation }
                    : {
                        y: [0, -10, 0],
                        rotate: [platform.rotation, platform.rotation + 2, platform.rotation],
                      }
                }
                transition={{
                  duration: platform.duration,
                  delay: platform.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  scale: 1.12,
                  rotate: 0,
                  transition: { duration: 0.18 },
                }}
                className="group relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-[#080D12]/90 backdrop-blur-md border border-[#00E6D2]/25 hover:border-[#00FFE5] flex items-center justify-center text-gray-300 hover:text-[#00FFE5] shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_15px_rgba(0,230,210,0.1)] hover:shadow-[0_0_30px_rgba(0,255,229,0.45)] transition-all duration-200 cursor-pointer"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-110" />
              </motion.div>
            </div>
          );
        })}

        {/* Master SVG Funnel and Flow Canvas */}
        <svg
          viewBox="0 0 1000 460"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full max-h-[460px] pointer-events-none"
        >
          <defs>
            {/* Glow Filter for Qualified Output Dots */}
            <filter id="tealGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Funnel Body Gradient */}
            <linearGradient id="funnelBodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0B161E" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#070E14" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#03070A" stopOpacity="1" />
            </linearGradient>

            {/* Funnel Stroke Gradient */}
            <linearGradient id="funnelStroke" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FFE5" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#00E6D2" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#00FFE5" stopOpacity="0.85" />
            </linearGradient>

            {/* Platform dashed flow paths (Left & Right) */}
            {PLATFORM_CONFIGS.map((p) => (
              <path key={p.pathId} id={p.pathId} d={p.pathD} fill="none" />
            ))}

            {/* Qualified buyers drop path from funnel stem */}
            <path id="output-drop-path" d="M 500 335 L 500 412" fill="none" />
          </defs>

          {/* Render Platform Dashed Guides */}
          {PLATFORM_CONFIGS.map((p) => (
            <path
              key={`guide-${p.id}`}
              d={p.pathD}
              fill="none"
              stroke="#00E6D2"
              strokeOpacity="0.22"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
          ))}

          {/* Animated Audience Grey Dots Traveling Into Funnel */}
          {isInView &&
            !shouldReduceMotion &&
            PLATFORM_CONFIGS.map((p) => (
              <g key={`dots-${p.id}`}>
                {/* Dot 1 */}
                <circle r="3.5" fill="#94A3B8" opacity="0">
                  <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${p.delay}s`}>
                    <mpath href={`#${p.pathId}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.8;0.8;0"
                    keyTimes="0;0.15;0.85;1"
                    dur="2.4s"
                    repeatCount="indefinite"
                    begin={`${p.delay}s`}
                  />
                </circle>

                {/* Dot 2 (Staggered offset) */}
                <circle r="3" fill="#64748B" opacity="0">
                  <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${p.delay + 0.8}s`}>
                    <mpath href={`#${p.pathId}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.65;0.65;0"
                    keyTimes="0;0.15;0.85;1"
                    dur="2.4s"
                    repeatCount="indefinite"
                    begin={`${p.delay + 0.8}s`}
                  />
                </circle>

                {/* Dot 3 (Staggered offset) */}
                <circle r="3.5" fill="#CBD5E1" opacity="0">
                  <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${p.delay + 1.6}s`}>
                    <mpath href={`#${p.pathId}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.85;0.85;0"
                    keyTimes="0;0.15;0.85;1"
                    dur="2.4s"
                    repeatCount="indefinite"
                    begin={`${p.delay + 1.6}s`}
                  />
                </circle>
              </g>
            ))}

          {/* Static audience dots when reduced motion is on */}
          {shouldReduceMotion && (
            <g opacity="0.6">
              <circle cx="280" cy="95" r="3.5" fill="#94A3B8" />
              <circle cx="230" cy="180" r="3.5" fill="#94A3B8" />
              <circle cx="310" cy="240" r="3.5" fill="#94A3B8" />
              <circle cx="720" cy="95" r="3.5" fill="#94A3B8" />
              <circle cx="770" cy="180" r="3.5" fill="#94A3B8" />
              <circle cx="690" cy="240" r="3.5" fill="#94A3B8" />
            </g>
          )}

          {/* Funnel Body Surface */}
          <path
            d="M 360 115 C 410 200, 460 240, 470 280 L 470 335 C 470 340, 530 340, 530 335 L 530 280 C 540 240, 590 200, 640 115 C 570 135, 430 135, 360 115 Z"
            fill="url(#funnelBodyGrad)"
            stroke="url(#funnelStroke)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Funnel Top Rim Opening */}
          <ellipse
            cx="500"
            cy="115"
            rx="140"
            ry="22"
            fill="#09141B"
            stroke="#00FFE5"
            strokeWidth="1.5"
            strokeOpacity="0.75"
          />

          {/* Dark Inner Mouth Depth */}
          <ellipse cx="500" cy="115" rx="124" ry="17" fill="#03080B" />

          {/* Funnel Monospace Label */}
          <g className="select-none">
            <text
              x="500"
              y="172"
              textAnchor="middle"
              fill="#5EEAD4"
              fillOpacity="0.7"
              fontSize="11"
              fontFamily="monospace"
              letterSpacing="0.2em"
              fontWeight="600"
            >
              EXACT PURCHASE INTENT
            </text>
            <text
              x="500"
              y="192"
              textAnchor="middle"
              fill="#94A3B8"
              fillOpacity="0.45"
              fontSize="9"
              fontFamily="monospace"
              letterSpacing="0.16em"
            >
              ZERO BUDGET WASTAGE
            </text>
          </g>

          {/* Stem Periodic Pulse Flare */}
          {isInView && !shouldReduceMotion && (
            <circle cx="500" cy="335" r="16" fill="#00FFE5" opacity="0.15">
              <animate
                attributeName="r"
                values="6;22;6"
                keyTimes="0;0.5;1"
                dur="1.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.35;0;0.35"
                keyTimes="0;0.5;1"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </circle>
          )}

          {/* Qualified Output Dots Leaving the Stem */}
          {isInView && !shouldReduceMotion && (
            <g>
              {/* Dot 1 */}
              <circle r="5" fill="#00FFE5" filter="url(#tealGlow)" opacity="0">
                <animateMotion dur="1.2s" repeatCount="indefinite" begin="0s">
                  <mpath href="#output-drop-path" />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.2;0.85;1"
                  dur="1.2s"
                  repeatCount="indefinite"
                  begin="0s"
                />
                <animate
                  attributeName="r"
                  values="4;5.5;4.5;3"
                  keyTimes="0;0.3;0.8;1"
                  dur="1.2s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>

              {/* Dot 2 (0.6s offset) */}
              <circle r="5" fill="#00FFE5" filter="url(#tealGlow)" opacity="0">
                <animateMotion dur="1.2s" repeatCount="indefinite" begin="0.6s">
                  <mpath href="#output-drop-path" />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.2;0.85;1"
                  dur="1.2s"
                  repeatCount="indefinite"
                  begin="0.6s"
                />
                <animate
                  attributeName="r"
                  values="4;5.5;4.5;3"
                  keyTimes="0;0.3;0.8;1"
                  dur="1.2s"
                  repeatCount="indefinite"
                  begin="0.6s"
                />
              </circle>
            </g>
          )}

          {/* Static qualified dot for reduced motion */}
          {shouldReduceMotion && (
            <circle cx="500" cy="370" r="5" fill="#00FFE5" filter="url(#tealGlow)" opacity="0.9" />
          )}
        </svg>

        {/* Result Pill Positioned under Stem */}
        <div className="absolute left-1/2 bottom-1 sm:bottom-2 -translate-x-1/2 z-20 pointer-events-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#0A0E14]/90 backdrop-blur-md border border-[#00E6D2]/40 shadow-[0_0_24px_rgba(0,230,210,0.25)] select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFE5] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E6D2]" />
            </span>
            <span className="text-xs sm:text-sm font-bold text-white font-mono tracking-tight">
              <span className="text-[#00FFE5]">+280%</span> Qualified Leads
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
