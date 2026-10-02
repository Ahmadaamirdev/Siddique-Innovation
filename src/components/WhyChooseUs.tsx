import React from 'react';
import { motion } from 'framer-motion';
import { Target, ShieldCheck, Clock, Globe } from 'lucide-react';
import { WingLogo } from './WingLogo';

export const WhyChooseUs: React.FC = () => {
  return (
    <section
      id="why-choose-us"
      className="relative py-14 sm:py-20 bg-[#050505] text-white border-b border-white/10 overflow-hidden"
    >
      {/* Ambient Radial Cyan Backlight (Subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial from-[#00E6D2]/5 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 text-[#00E6D2] text-xs sm:text-sm font-semibold tracking-wider uppercase font-mono"
          >
            <WingLogo className="w-5 h-5 shrink-0" />
            <span>OUR ADVANTAGE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading"
          >
            Why Businesses Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_25px_rgba(0,230,210,0.35)]">
              Siddiqui Innovations
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-sans max-w-2xl mx-auto"
          >
            We're not just another service provider, we're a team that treats your growth as our responsibility.
          </motion.p>
        </div>

        {/* ======================================================== */}
        {/* MAIN COMPOSITION: Left Points | Center Logo | Right Points */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ------------------------------------------------------ */}
          {/* LEFT COLUMN: 2 Differentiators (Slide in from Left)    */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-4 flex flex-col gap-10 sm:gap-14 order-2 lg:order-1">
            
            {/* Point 1: Understand the Business */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#00E6D2]/10 border border-[#00E6D2]/35 flex items-center justify-center text-[#00E6D2] group-hover:bg-[#00E6D2]/20 group-hover:border-[#00E6D2] transition-colors duration-150 shrink-0">
                  <Target className="w-6 h-6 text-[#00E6D2]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading group-hover:text-[#00FFE5] transition-colors duration-150">
                  Understand the Business
                </h3>
              </div>
              <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed pl-1 sm:pl-2 font-sans">
                We take the time to understand your business, its objectives, and the challenges you face before recommending or developing a solution. This helps us focus on work that serves a clear purpose.
              </p>
            </motion.div>

            {/* Point 2: Quality Over Shortcuts */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#00E6D2]/10 border border-[#00E6D2]/35 flex items-center justify-center text-[#00E6D2] group-hover:bg-[#00E6D2]/20 group-hover:border-[#00E6D2] transition-colors duration-150 shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#00E6D2]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading group-hover:text-[#00FFE5] transition-colors duration-150">
                  Quality Over Shortcuts
                </h3>
              </div>
              <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed pl-1 sm:pl-2 font-sans">
                We'd rather build something right than build it fast and broken. Every project goes through proper planning and testing before it reaches you.
              </p>
            </motion.div>

          </div>

          {/* ------------------------------------------------------ */}
          {/* CENTER COLUMN: Wing Logo (Appears from Centre)         */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 py-4 lg:py-0 select-none pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Subtle ambient light */}
              <div className="absolute inset-0 bg-[#00E6D2]/5 rounded-full blur-2xl" />

              {/* Wing Logo with continuous levitation */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <WingLogo
                  className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-[0_0_15px_rgba(0,230,210,0.35)]"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* RIGHT COLUMN: 2 Differentiators (Slide in from Right)  */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-4 flex flex-col gap-10 sm:gap-14 order-3">
            
            {/* Point 3: 24/7 Support */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#00E6D2]/10 border border-[#00E6D2]/35 flex items-center justify-center text-[#00E6D2] group-hover:bg-[#00E6D2]/20 group-hover:border-[#00E6D2] transition-colors duration-150 shrink-0">
                  <Clock className="w-6 h-6 text-[#00E6D2]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading group-hover:text-[#00FFE5] transition-colors duration-150">
                  24/7 Support
                </h3>
              </div>
              <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed pl-1 sm:pl-2 font-sans">
                Questions or issues don't wait for business hours neither do we. Our support team is available around the clock.
              </p>
            </motion.div>

            {/* Point 4: Built for Global Clients */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#00E6D2]/10 border border-[#00E6D2]/35 flex items-center justify-center text-[#00E6D2] group-hover:bg-[#00E6D2]/20 group-hover:border-[#00E6D2] transition-colors duration-150 shrink-0">
                  <Globe className="w-6 h-6 text-[#00E6D2]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading group-hover:text-[#00FFE5] transition-colors duration-150">
                  Built for Global Clients
                </h3>
              </div>
              <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed pl-1 sm:pl-2 font-sans">
                We work with businesses across different time zones and industries, adapting our communication and project delivery to suit their working requirements
              </p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
