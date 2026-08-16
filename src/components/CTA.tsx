import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { WingLogo } from './WingLogo';

export const CTA: React.FC = () => {
  return (
    <section id="contact" className="pt-4 pb-16 md:pt-6 md:pb-24 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#0B0E13]/90 backdrop-blur-2xl border border-[#00E6D2]/30 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[0_0_50px_rgba(0,230,210,0.1)] overflow-hidden transform-gpu will-change-transform"
        >
          {/* Subtle cyan background orb */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00E6D2]/20 blur-[100px] rounded-full pointer-events-none transform-gpu will-change-transform" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            {/* Left Content with Logo Icon */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
              {/* Logo Circle Badge */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#050505] border-2 border-[#00E6D2]/50 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,230,210,0.2)]">
                <WingLogo className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow-[0_0_10px_#00E6D2]" />
              </div>

              {/* Text Block */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs sm:text-sm tracking-wider uppercase">
                  <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                  <span>READY TO GROW YOUR BUSINESS?</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Let's Build Something Amazing Together
                </h2>
                <p className="text-gray-300 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
                  Whether you need a website, SEO, automation or a complete digital growth system — we're here to help you succeed.
                </p>
              </div>
            </div>

            {/* Right Action Button & Subtext */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-3">
              <a
                href="mailto:contact@siddiqui-innovations.com"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_4px_16px_rgba(0,230,210,0.2)] hover:shadow-[0_4px_20px_rgba(0,230,210,0.35)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Book Free Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="text-xs text-gray-400 font-medium">
                No commitment. Just a friendly chat.
              </span>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
