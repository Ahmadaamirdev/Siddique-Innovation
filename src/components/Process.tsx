import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
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
  const [activeProgress, setActiveProgress] = useState(0);

  // Scroll tracking across the process section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 75%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Track progress to activate step cards
  useEffect(() => {
    const unsub = smoothProgress.on('change', (latest) => {
      setActiveProgress(Math.min(Math.max(latest, 0), 1));
    });

    return () => unsub();
  }, [smoothProgress]);

  const dotTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="process" className="py-12 md:py-16 bg-[#050505] relative z-10 overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading & Sub-heading (Centered) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
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

        {/* Process Timeline with Center Progress Line and Balanced Cards */}
        <div ref={containerRef} className="relative max-w-6xl mx-auto">
          {/* Straight Vertical Progress Line (Desktop: Center, Mobile: Left) */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 bottom-8 w-[2px] pointer-events-none z-10">
            {/* Background inactive line */}
            <div className="w-full h-full bg-white/10 rounded-full" />

            {/* Active glowing animated line */}
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
              className="absolute top-0 left-0 right-0 w-full h-full bg-gradient-to-b from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] rounded-full shadow-[0_0_12px_rgba(0,230,210,0.8)]"
            />

            {/* Glowing Luminous Leading Head Orb */}
            {activeProgress > 0.02 && (
              <motion.div
                style={{ top: dotTop }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#00E6D2] shadow-[0_0_16px_#00FFE5,0_0_8px_#00E6D2] z-20"
              />
            )}
          </div>

          {/* Cards List: Alternating Left & Right on Desktop, Stacked on Mobile */}
          <div className="space-y-6 sm:space-y-8 pl-14 sm:pl-16 md:pl-0 pb-2">
            {stepsData.map((step, idx) => {
              const isActive = activeProgress >= step.threshold;
              const isEven = idx % 2 === 0;

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
                    className={`group relative flex items-start gap-4 sm:gap-6 bg-[#0B0E13]/85 backdrop-blur-xl border rounded-2xl p-6 sm:p-7 lg:p-8 transition-all duration-500 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.4)] w-full md:w-[calc(50%-36px)] ${
                      isEven ? 'md:mr-auto' : 'md:ml-auto'
                    } ${
                      isActive
                        ? 'border-[#00E6D2]/40 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(0,230,210,0.08)]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Desktop Connector line to middle track */}
                    {isEven ? (
                      <div
                        className={`hidden md:block absolute -right-9 top-1/2 -translate-y-1/2 w-9 h-[2px] transition-colors duration-500 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#00E6D2]/50 to-[#00E6D2]'
                            : 'bg-white/10'
                        }`}
                      />
                    ) : (
                      <div
                        className={`hidden md:block absolute -left-9 top-1/2 -translate-y-1/2 w-9 h-[2px] transition-colors duration-500 ${
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
