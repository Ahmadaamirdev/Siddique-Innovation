import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const AnimatedGraph: React.FC = () => {
  const [visitors, setVisitors] = useState(0);
  const [conversions, setConversions] = useState(0);
  const [leads, setLeads] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setVisitors(parseFloat((12.5 * eased).toFixed(1)));
      setConversions(parseFloat((3.2 * eased).toFixed(1)));
      setLeads(parseFloat((8.4 * eased).toFixed(1)));

      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl overflow-hidden bg-[#070A0F] border border-[#00E6D2]/20 p-3 sm:p-4 text-xs font-sans text-gray-200 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
      {/* Top Dashboard Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2.5">
        <div>
          <h4 className="font-bold text-xs sm:text-sm text-white tracking-tight font-heading">
            Business Growth
          </h4>
          <p className="text-[9px] text-gray-400">Analytics overview</p>
        </div>
        <span className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 font-medium cursor-pointer hover:border-[#00E6D2]/40 transition-colors">
          This Month ▾
        </span>
      </div>

      {/* SVG Interactive Line Chart */}
      <div className="relative h-24 sm:h-32 w-full my-2">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 300 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="laptopChartGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FFE5" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00E6D2" stopOpacity="0" />
            </linearGradient>
          </defs>

          <motion.path
            d="M0,80 Q30,65 60,70 T120,40 T180,50 T240,20 T300,10 L300,100 L0,100 Z"
            fill="url(#laptopChartGrad2)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.path
            d="M0,80 Q30,65 60,70 T120,40 T180,50 T240,20 T300,10"
            fill="none"
            stroke="#00FFE5"
            strokeWidth="3"
            strokeLinecap="round"
            className="drop-shadow-[0_0_10px_#00FFE5]"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />

          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
          >
            <circle cx="240" cy="20" r="6" fill="#00FFE5" className="animate-ping opacity-75" />
            <circle cx="240" cy="20" r="4" fill="#FFFFFF" />
          </motion.g>
        </svg>
      </div>

      {/* 3 Animated Metric Cards */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
        <div className="bg-white/5 rounded-lg p-2 border border-white/5 hover:border-[#00E6D2]/30 transition-colors">
          <p className="text-[9px] text-gray-400">Total Visitors</p>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="font-bold text-xs sm:text-sm text-white font-heading">
              {visitors}K
            </span>
            <span className="text-[9px] text-[#00E6D2] font-semibold">+25%</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-2 border border-white/5 hover:border-[#00E6D2]/30 transition-colors">
          <p className="text-[9px] text-gray-400">Conversions</p>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="font-bold text-xs sm:text-sm text-white font-heading">
              {conversions}K
            </span>
            <span className="text-[9px] text-[#00E6D2] font-semibold">+35%</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-2 border border-white/5 hover:border-[#00E6D2]/30 transition-colors">
          <p className="text-[9px] text-gray-400">Leads Generated</p>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="font-bold text-xs sm:text-sm text-white font-heading">
              {leads}K
            </span>
            <span className="text-[9px] text-[#00E6D2] font-semibold">+42%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
