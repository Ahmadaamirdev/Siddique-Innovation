import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    threshold: 0.0,
  },
  {
    number: 2,
    title: 'Plan',
    description:
      'We define the right approach, scope, technology, and priorities before moving into execution.',
    threshold: 0.2,
  },
  {
    number: 3,
    title: 'Build',
    description:
      'We turn the plan into a working solution, whether it involves a website, automation, SEO, or digital marketing.',
    threshold: 0.4,
  },
  {
    number: 4,
    title: 'Review & Refine',
    description:
      'We test the work, review the details, and make the necessary improvements to ensure everything works as intended.',
    threshold: 0.6,
  },
  {
    number: 5,
    title: 'Deliver & Support',
    description:
      'We launch the completed work and remain available for updates, support, and future improvements.',
    threshold: 0.8,
  },
];

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsListRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardOffsets, setCardOffsets] = useState<number[]>([0, 160, 320, 480, 640]);
  const [focalCenterY, setFocalCenterY] = useState(140);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Scroll tracking across the pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Dynamically compute exact card offsets and center focal level so active card matches heading height
  useEffect(() => {
    const updateOffsets = () => {
      if (cardRefs.current[0] && cardsContainerRef.current) {
        const containerHeight = cardsContainerRef.current.clientHeight;
        const cardHeight = cardRefs.current[0].clientHeight;
        const center = Math.round((containerHeight - cardHeight) / 2);
        setFocalCenterY(Math.max(0, center));

        const baseTop = cardRefs.current[0].offsetTop;
        const offsets = cardRefs.current.map((el) => {
          if (!el) return 0;
          return el.offsetTop - baseTop;
        });
        if (offsets.length === 5 && offsets[4] > 0) {
          setCardOffsets(offsets);
        }
      }
    };

    updateOffsets();
    window.addEventListener('resize', updateOffsets);
    const timer = setTimeout(updateOffsets, 150);

    return () => {
      window.removeEventListener('resize', updateOffsets);
      clearTimeout(timer);
    };
  }, []);

  // Track active step index only (triggers re-render ONLY when step changes, not on every frame)
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (latest) => {
      let currentIdx = 0;
      for (let i = stepsData.length - 1; i >= 0; i--) {
        if (latest >= stepsData[i].threshold - 0.04) {
          currentIdx = i;
          break;
        }
      }
      setActiveStepIndex((prev) => (prev !== currentIdx ? currentIdx : prev));
    });

    return () => unsub();
  }, [scrollYProgress]);

  // Direct transform driven by Lenis scroll: silky smooth 60/120fps with zero inertia lag.
  // Every card arrives at focalCenterY (the EXACT SAME horizontal level as the heading),
  // dwells on that level while active, and only then vanishes.
  const cardsY = useTransform(
    scrollYProgress,
    [0, 0.14, 0.22, 0.34, 0.42, 0.54, 0.62, 0.74, 0.82, 1.0],
    [
      focalCenterY,
      focalCenterY,
      focalCenterY - cardOffsets[1],
      focalCenterY - cardOffsets[1],
      focalCenterY - cardOffsets[2],
      focalCenterY - cardOffsets[2],
      focalCenterY - cardOffsets[3],
      focalCenterY - cardOffsets[3],
      focalCenterY - cardOffsets[4],
      focalCenterY - cardOffsets[4],
    ]
  );

  const lineScaleY = useTransform(scrollYProgress, [0, 0.85], [0, 1], { clamp: true });
  const dotTop = useTransform(scrollYProgress, [0, 0.85], ['0%', '100%'], { clamp: true });

  // Each card stays at opacity = 1.0 while dwelling on this level, and vanishes cleanly
  const card1Opacity = useTransform(scrollYProgress, [0, 0.14, 0.22], [1, 1, 0]);
  const card2Opacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.22, 0.34, 0.42],
    [0.3, 0.3, 1, 1, 0]
  );
  const card3Opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.34, 0.42, 0.54, 0.62],
    [0, 0.15, 0.3, 1, 1, 0]
  );
  const card4Opacity = useTransform(
    scrollYProgress,
    [0, 0.42, 0.54, 0.62, 0.74, 0.82],
    [0, 0.15, 0.3, 1, 1, 0]
  );
  const card5Opacity = useTransform(
    scrollYProgress,
    [0, 0.62, 0.74, 0.82, 1.0],
    [0, 0.15, 0.3, 1, 1]
  );

  const cardOpacities = [card1Opacity, card2Opacity, card3Opacity, card4Opacity, card5Opacity];

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative h-[230vh] lg:h-[250vh] bg-[#050505] border-b border-white/10"
    >
      {/* Pinned Sticky Viewport: Stays still and locked at top: 0 */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative">

            {/* Left Column: Heading centered vertically, perfectly level with active card */}
            <div className="lg:col-span-5 text-left mb-4 lg:mb-0">
              <div className="space-y-4 max-w-lg">
                <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
                  <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                  <span>OUR PROCESS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
                  How We Work
                </h2>
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed font-sans pt-1">
                  From the first conversation to the final delivery, we keep every stage focused, structured, and aligned with your goals.
                </p>
              </div>
            </div>

            {/* Right Column: Clean cards container without any hard overflow clipping */}
            <div
              ref={cardsContainerRef}
              className="lg:col-span-7 relative h-[380px] sm:h-[440px] lg:h-[480px]"
            >
              <motion.div
                ref={cardsListRef}
                style={{ y: cardsY }}
                className="relative pl-12 sm:pl-16 space-y-5 sm:space-y-6 will-change-transform"
              >
                {/* Straight Vertical Progress Line */}
                <div className="absolute left-4 sm:left-6 top-6 sm:top-7 bottom-6 sm:bottom-7 w-[2px] pointer-events-none z-10">
                  {/* Background inactive line */}
                  <div className="w-full h-full bg-white/10 rounded-full" />

                  {/* Active glowing animated line */}
                  <motion.div
                    style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
                    className="absolute top-0 left-0 right-0 w-full h-full bg-gradient-to-b from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] rounded-full shadow-[0_0_12px_rgba(0,230,210,0.8)]"
                  />

                  {/* Glowing Luminous Leading Head Orb */}
                  <motion.div
                    style={{ top: dotTop }}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white border-2 border-[#00E6D2] shadow-[0_0_16px_#00FFE5,0_0_8px_#00E6D2] z-20"
                  />
                </div>

                {/* Cards List in Sequence */}
                {stepsData.map((step, idx) => {
                  const isActive = idx <= activeStepIndex;

                  return (
                    <motion.div
                      key={step.number}
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      style={{ opacity: cardOpacities[idx] }}
                      className="relative flex items-center will-change-transform"
                    >
                      {/* Connector line from vertical track */}
                      <div
                        className={`absolute -left-8 sm:-left-10 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-[2px] transition-colors duration-300 pointer-events-none ${
                          isActive
                            ? 'bg-gradient-to-r from-[#00E6D2] to-[#00E6D2]/70 shadow-[0_0_8px_#00E6D2]'
                            : 'bg-white/10'
                        }`}
                      />

                      <div
                        className={`group relative flex items-start gap-4 sm:gap-6 bg-[#0B0E13] border rounded-2xl p-5 sm:p-6 lg:p-7 transition-[border-color,box-shadow,transform] duration-300 transform-gpu shadow-[0_10px_30px_rgba(0,0,0,0.4)] w-full ${
                          isActive
                            ? 'border-[#00E6D2]/60 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(0,230,210,0.18)] scale-[1.01]'
                            : 'border-white/10'
                        }`}
                      >
                        {/* Step Number Badge */}
                        {isActive ? (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00E6D2] text-black font-extrabold text-sm sm:text-lg flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,230,210,0.85),0_0_35px_rgba(0,230,210,0.4)] transition-all duration-300 scale-105 font-heading">
                            {step.number}
                          </div>
                        ) : (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/15 bg-[#0B0E13] text-gray-500 font-bold text-sm sm:text-lg flex items-center justify-center shrink-0 transition-colors duration-300 font-heading">
                            {step.number}
                          </div>
                        )}

                        {/* Step Content */}
                        <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                          <h3
                            className={`text-lg sm:text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-300 font-heading ${
                              isActive ? 'text-white' : 'text-gray-300'
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed mt-2 font-sans">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
