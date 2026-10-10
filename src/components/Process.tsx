import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { WingLogo } from './WingLogo';

interface StepItem {
  number: number;
  title: string;
  description: string;
}

const stepsData: StepItem[] = [
  {
    number: 1,
    title: 'Understand',
    description:
      'We begin by understanding your business, requirements, priorities, and the outcome you want to achieve.',
  },
  {
    number: 2,
    title: 'Plan',
    description:
      'We define the right approach, scope, technology, and priorities before moving into execution.',
  },
  {
    number: 3,
    title: 'Build',
    description:
      'We turn the plan into a working solution, whether it involves a website, automation, SEO, or digital marketing.',
  },
  {
    number: 4,
    title: 'Review & Refine',
    description:
      'We test the work, review the details, and make the necessary improvements to ensure everything works as intended.',
  },
  {
    number: 5,
    title: 'Deliver & Support',
    description:
      'We launch the completed work and remain available for updates, support, and future improvements.',
  },
];

const THRESHOLDS = [0.04, 0.25, 0.48, 0.70, 0.90];

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const activeIndexRef = useRef<number>(-1);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 60%', 'end 50%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.15,
  });

  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);
  const dotTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const update = (val: number) => {
      let newIndex = -1;
      for (let i = THRESHOLDS.length - 1; i >= 0; i--) {
        if (val >= THRESHOLDS[i]) {
          newIndex = i;
          break;
        }
      }
      if (newIndex !== activeIndexRef.current) {
        activeIndexRef.current = newIndex;
        setActiveIndex(newIndex);
      }
    };

    // 1. Initial read on mount
    update(smoothProgress.get());
    update(scrollYProgress.get());

    // 2. Spring motion listener
    const unsub = smoothProgress.on('change', update);

    // 3. Native & Lenis scroll listeners
    const onScroll = () => {
      update(smoothProgress.get());
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // 4. Staggered checks during load & Lenis scroll restoration
    const t1 = setTimeout(onScroll, 50);
    const t2 = setTimeout(onScroll, 150);
    const t3 = setTimeout(onScroll, 350);

    return () => {
      unsub();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [smoothProgress, scrollYProgress]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="py-14 sm:py-20 lg:py-24 bg-[#050505] relative z-10 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative">

          {/* Left Column: Heading sticky in the vertical middle of the page while scrolling steps */}
          <div className="lg:col-span-5 lg:sticky lg:top-[calc(50vh-130px)] text-left mb-6 lg:mb-0">
            <div className="space-y-4 max-w-lg">
              <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
                <WingLogo className="w-5 h-5 shrink-0" />
                <span>OUR PROCESS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading">
                How We Work
              </h2>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed font-sans pt-1">
                From the first conversation to the final delivery, we keep every stage focused, structured, and aligned with your goals.
              </p>
            </div>
          </div>

          {/* Right Column: 5 Steps Timeline */}
          <div ref={trackRef} className="lg:col-span-7 relative pl-8 sm:pl-14 space-y-4 sm:space-y-8">
            {/* Straight Vertical Progress Line */}
            <div className="absolute left-2.5 sm:left-5 top-5 bottom-5 w-[2px] pointer-events-none z-10">
              {/* Background inactive track */}
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

            {/* Step Cards */}
            {stepsData.map((step, idx) => {
              const isActive = idx <= activeIndex;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="relative flex items-center group"
                >
                  {/* Connector line from vertical track */}
                  <div
                    className={`absolute -left-5 sm:-left-9 top-1/2 -translate-y-1/2 w-5 sm:w-9 h-[2px] transition-colors duration-300 pointer-events-none ${
                      isActive ? 'bg-[#00E6D2]/60' : 'bg-white/10 group-hover:bg-[#00E6D2]/60'
                    }`}
                  />

                  <div
                    className={`group relative flex items-start gap-3.5 sm:gap-5 bg-[#0B0E13]/90 hover:bg-[#0E131A] border rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] w-full max-w-[540px] ${
                      isActive
                        ? 'border-[#00E6D2]/50 shadow-[0_10px_35px_rgba(0,230,210,0.12)]'
                        : 'border-white/10 hover:border-[#00E6D2]/50 hover:shadow-[0_10px_35px_rgba(0,230,210,0.12)]'
                    }`}
                  >
                    {/* Step Number Badge */}
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0 transition-all duration-300 font-heading mt-0.5 ${
                        isActive
                          ? 'bg-[#00E6D2] text-black border border-[#00E6D2] shadow-[0_0_10px_rgba(0,230,210,0.4)]'
                          : 'bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00FFE5] group-hover:bg-[#00E6D2] group-hover:text-black shadow-[0_0_10px_rgba(0,230,210,0.2)]'
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h3
                        className={`text-lg sm:text-xl font-bold tracking-tight transition-colors duration-300 font-heading ${
                          isActive ? 'text-[#00FFE5]' : 'text-white group-hover:text-[#00FFE5]'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1.5 font-sans">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
