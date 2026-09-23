import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { WingLogo } from './WingLogo';

interface StepItem {
  number: number;
  title: string;
  description: string;
  threshold: number;
}

const stepsData: StepItem[] = [
  {
    number: 1,
    title: 'Understand',
    description:
      'We begin by understanding your business, requirements, priorities, and the outcome you want to achieve.',
    threshold: 0.08,
  },
  {
    number: 2,
    title: 'Plan',
    description:
      'We define the right approach, scope, technology, and priorities before moving into execution.',
    threshold: 0.28,
  },
  {
    number: 3,
    title: 'Build',
    description:
      'We turn the plan into a working solution, whether it involves a website, automation, SEO, or digital marketing.',
    threshold: 0.50,
  },
  {
    number: 4,
    title: 'Review & Refine',
    description:
      'We test the work, review the details, and make the necessary improvements to ensure everything works as intended.',
    threshold: 0.72,
  },
  {
    number: 5,
    title: 'Deliver & Support',
    description:
      'We launch the completed work and remain available for updates, support, and future improvements.',
    threshold: 0.90,
  },
];

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  const [trackHeight, setTrackHeight] = useState(0);
  const [dot1, setDot1] = useState({ x: 35, y: 0 });
  const [dot2, setDot2] = useState({ x: 35, y: 0 });
  const [activeProgress, setActiveProgress] = useState(0);

  // Measure the container height dynamically
  useEffect(() => {
    if (!stepsContainerRef.current) return;
    const updateHeight = () => {
      if (stepsContainerRef.current) {
        setTrackHeight(stepsContainerRef.current.offsetHeight);
      }
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(stepsContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll tracking across the process section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 75%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Generate intertwining double bezier paths down the center
  const paths = useMemo(() => {
    if (trackHeight <= 0) return { path1: '', path2: '' };
    const cx = 35;
    const amp = 18;
    const segments = 8;
    const segH = trackHeight / segments;

    let p1 = `M ${cx} 0`;
    let p2 = `M ${cx} 0`;

    for (let i = 0; i < segments; i++) {
      const y0 = i * segH;
      const y1 = (i + 1) * segH;
      const sign = i % 2 === 0 ? 1 : -1;
      const cp1 = cx + sign * amp;
      const cp2 = cx - sign * amp;

      p1 += ` C ${cp1} ${y0 + segH * 0.35}, ${cp1} ${y0 + segH * 0.65}, ${cx} ${y1}`;
      p2 += ` C ${cp2} ${y0 + segH * 0.35}, ${cp2} ${y0 + segH * 0.65}, ${cx} ${y1}`;
    }

    return { path1: p1, path2: p2 };
  }, [trackHeight]);

  // Track the glowing orb head coordinates on scroll
  useEffect(() => {
    const unsub = smoothProgress.on('change', (latest) => {
      const clamped = Math.min(Math.max(latest, 0), 1);
      setActiveProgress(clamped);

      if (path1Ref.current && path2Ref.current) {
        try {
          const l1 = path1Ref.current.getTotalLength();
          const l2 = path2Ref.current.getTotalLength();
          if (l1 > 0 && l2 > 0) {
            const pt1 = path1Ref.current.getPointAtLength(l1 * clamped);
            const pt2 = path2Ref.current.getPointAtLength(l2 * clamped);
            setDot1({ x: pt1.x, y: pt1.y });
            setDot2({ x: pt2.x, y: pt2.y });
          }
        } catch {
          // Ignore before SVG layout
        }
      }
    });

    return () => unsub();
  }, [smoothProgress, paths]);

  return (
    <section id="process" className="py-16 md:py-24 bg-[#050505] relative z-10 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading & Sub-heading (Centered) */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>OUR PROCESS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              How We Work
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-sans pt-1">
              From the first conversation to the final delivery, we keep every stage focused, structured, and aligned with your goals.
            </p>
          </motion.div>
        </div>

        {/* Process Timeline with Center Intertwining Lines and Alternating Cards */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Intertwining Double Curved SVG Lines (Centered on Desktop, Left on Mobile) */}
          <div className="absolute left-2 sm:left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-14 sm:w-20 flex justify-center pointer-events-none z-10">
            {trackHeight > 0 && (
              <svg
                width="70"
                height={trackHeight}
                viewBox={`0 0 70 ${trackHeight}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                {/* Inactive background tracks */}
                <path
                  d={paths.path1}
                  fill="none"
                  stroke="rgba(0, 230, 210, 0.12)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d={paths.path2}
                  fill="none"
                  stroke="rgba(0, 255, 229, 0.08)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Active animated Line 1 */}
                <motion.path
                  ref={path1Ref}
                  d={paths.path1}
                  fill="none"
                  stroke="#00E6D2"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ pathLength: smoothProgress }}
                  className="drop-shadow-[0_0_8px_rgba(0,230,210,0.8)]"
                />

                {/* Active animated Line 2 */}
                <motion.path
                  ref={path2Ref}
                  d={paths.path2}
                  fill="none"
                  stroke="#00FFE5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ pathLength: smoothProgress }}
                  className="drop-shadow-[0_0_8px_rgba(0,255,229,0.8)]"
                />

                {/* Glowing Lead Head Orbs on Scroll */}
                {activeProgress > 0.01 && (
                  <>
                    {/* Dot 1 Glow Halo */}
                    <circle
                      cx={dot1.x}
                      cy={dot1.y}
                      r="10"
                      fill="#00E6D2"
                      fillOpacity="0.25"
                      className="blur-[2px]"
                    />
                    {/* Dot 1 Bright Core */}
                    <circle
                      cx={dot1.x}
                      cy={dot1.y}
                      r="4.5"
                      fill="#FFFFFF"
                      stroke="#00E6D2"
                      strokeWidth="2"
                      className="drop-shadow-[0_0_10px_#00E6D2]"
                    />

                    {/* Dot 2 Glow Halo */}
                    <circle
                      cx={dot2.x}
                      cy={dot2.y}
                      r="10"
                      fill="#00FFE5"
                      fillOpacity="0.25"
                      className="blur-[2px]"
                    />
                    {/* Dot 2 Bright Core */}
                    <circle
                      cx={dot2.x}
                      cy={dot2.y}
                      r="4.5"
                      fill="#FFFFFF"
                      stroke="#00FFE5"
                      strokeWidth="2"
                      className="drop-shadow-[0_0_10px_#00FFE5]"
                    />
                  </>
                )}
              </svg>
            )}
          </div>

          {/* Cards List: Alternating Left & Right on Desktop, Stacked on Mobile */}
          <div ref={stepsContainerRef} className="space-y-8 sm:space-y-12 pl-16 sm:pl-20 md:pl-0 pb-4">
            {stepsData.map((step, idx) => {
              const isActive = activeProgress >= step.threshold;
              const isEven = idx % 2 === 0; // Steps 1, 3, 5 -> Left on desktop. Steps 2, 4 -> Right on desktop.

              return (
                <div key={step.number} className="relative flex items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.6,
                      delay: idx * 0.1,
                      ease: [0.22, 0.61, 0.36, 1] as const,
                    }}
                    className={`group relative flex items-start gap-4 sm:gap-6 bg-[#0B0E13]/85 backdrop-blur-xl border rounded-2xl p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.4)] w-full md:w-[calc(50%-48px)] ${
                      isEven ? 'md:mr-auto' : 'md:ml-auto'
                    } ${
                      isActive
                        ? 'border-[#00E6D2]/40 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(0,230,210,0.06)]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Desktop Connector line to middle track */}
                    {isEven ? (
                      /* Left Card: connector reaches right toward center */
                      <div
                        className={`hidden md:block absolute -right-12 top-1/2 -translate-y-1/2 w-12 h-[2px] transition-colors duration-500 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#00E6D2]/50 to-[#00E6D2]'
                            : 'bg-white/10'
                        }`}
                      />
                    ) : (
                      /* Right Card: connector reaches left toward center */
                      <div
                        className={`hidden md:block absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-[2px] transition-colors duration-500 ${
                          isActive
                            ? 'bg-gradient-to-l from-[#00E6D2]/50 to-[#00E6D2]'
                            : 'bg-white/10'
                        }`}
                      />
                    )}

                    {/* Step Number Badge */}
                    {isActive ? (
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#00E6D2] text-black font-extrabold text-base sm:text-lg flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,230,210,0.8),0_0_35px_rgba(0,230,210,0.35)] transition-all duration-500 scale-105 font-heading">
                        {step.number}
                      </div>
                    ) : (
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/15 bg-[#0B0E13]/90 text-gray-400 font-bold text-base sm:text-lg flex items-center justify-center shrink-0 transition-all duration-500 font-heading group-hover:border-white/30">
                        {step.number}
                      </div>
                    )}

                    {/* Step Content */}
                    <div className="flex-1 min-w-0 pt-1 sm:pt-1.5">
                      <h3
                        className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300 font-heading ${
                          isActive ? 'text-white' : 'text-gray-200'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-2.5 font-sans">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
