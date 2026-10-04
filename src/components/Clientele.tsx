import React from 'react';
import { motion } from 'framer-motion';
import { WingLogo } from './WingLogo';
import { HeroGlobe } from './HeroGlobe';

export const Clientele: React.FC = () => {
  return (
    <section
      id="clientele"
      className="py-8 sm:py-10 md:py-12 bg-[#050505] relative z-10 overflow-hidden border-b border-white/10"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-radial from-[#1fd6bb]/10 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[200px] bg-radial from-[#1fd6bb]/5 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-2 sm:mb-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] as const }}
            className="space-y-2"
          >
            <div className="inline-flex items-center justify-center gap-2 text-[#1fd6bb] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
              <WingLogo className="w-4 h-4 shrink-0" />
              <span>GLOBAL FOOTPRINT</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading">
              Our Clientele
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed font-sans pt-0.5 max-w-xl mx-auto">
              Empowering forward-thinking enterprises and delivering scalable digital engineering across
              our core operational regions in <strong className="text-white">Pakistan (HQ)</strong>,{' '}
              <strong className="text-white">Oman</strong>,{' '}
              <strong className="text-white">Saudi Arabia (KSA)</strong>, and the{' '}
              <strong className="text-white">USA</strong>.
            </p>
          </motion.div>
        </div>

        {/* HERO GLOBE COMPONENT */}
        <HeroGlobe tilt={23} />
      </div>
    </section>
  );
};
