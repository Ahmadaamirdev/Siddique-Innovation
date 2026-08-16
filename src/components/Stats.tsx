import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Users, Smile, Calendar, Star } from 'lucide-react';

interface CounterProps {
  target: number;
  suffix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ target, suffix = '', decimals = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const controls = animate(0, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = value.toFixed(decimals) + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, target, decimals, suffix]);

  return <span ref={ref}>{0.0.toFixed(decimals) + suffix}</span>;
};

export const Stats: React.FC = () => {
  const stats = [
    {
      icon: Users,
      target: 250,
      suffix: '+',
      decimals: 0,
      label: 'Projects Completed',
    },
    {
      icon: Smile,
      target: 180,
      suffix: '+',
      decimals: 0,
      label: 'Happy Clients',
    },
    {
      icon: Calendar,
      target: 4,
      suffix: '+',
      decimals: 0,
      label: 'Years Experience',
    },
    {
      icon: Star,
      target: 4.9,
      suffix: '',
      decimals: 1,
      label: 'Client Rating',
    },
  ];

  return (
    <section className="py-8 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0B0E13]/90 backdrop-blur-xl border border-[#00E6D2]/20 rounded-2xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform-gpu will-change-transform"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-center gap-4 sm:gap-5 py-3 md:py-2 px-2 transition-transform duration-300 hover:-translate-y-1 ${
                    idx !== 0 ? 'pt-6 md:pt-2' : ''
                  }`}
                >
                  <div className="p-3 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/20 text-[#00E6D2] shrink-0">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-[#00E6D2]" />
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight block">
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} decimals={stat.decimals} />
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

