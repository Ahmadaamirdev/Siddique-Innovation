import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { CheckCircle2, Calendar, Users, Building2 } from 'lucide-react';

interface CounterProps {
  target: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  target,
  suffix = '',
  decimals = 0,
  duration = 2,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20px' });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = value.toFixed(decimals) + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, target, decimals, suffix, duration]);

  return <span ref={ref}>{0.0.toFixed(decimals) + suffix}</span>;
};

export const Stats: React.FC = () => {
  const stats = [
    {
      icon: CheckCircle2,
      target: 50,
      suffix: '+',
      decimals: 0,
      label: 'Projects Completed',
      duration: 3.5,
    },
    {
      icon: Calendar,
      target: 3,
      suffix: '+',
      decimals: 0,
      label: 'Years in Business',
      duration: 2.8,
    },
    {
      icon: Users,
      target: 60,
      suffix: '+',
      decimals: 0,
      label: 'Clients Served',
      duration: 3.8,
    },
    {
      icon: Building2,
      target: 10,
      suffix: '+',
      decimals: 0,
      label: 'Industries Served',
      duration: 3.2,
    },
  ];

  return (
    <section className="py-6 sm:py-7 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="bg-[#0B0E13]/90 backdrop-blur-xl border border-[#00E6D2]/20 rounded-2xl py-4 sm:py-5 px-6 sm:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform-gpu will-change-transform"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-center justify-center gap-4 sm:gap-5 py-2 px-2 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="p-3 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/20 text-[#00E6D2] shrink-0 transition-colors duration-300 group-hover:border-[#00E6D2]/50 group-hover:bg-[#00E6D2]/15">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-[#00E6D2]" />
                  </div>

                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight block transition-colors duration-300 group-hover:text-[#00E6D2]">
                      <AnimatedCounter
                        target={stat.target}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        duration={stat.duration}
                      />
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 font-medium whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

