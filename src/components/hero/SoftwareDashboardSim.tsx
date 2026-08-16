import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Cpu, ShieldCheck } from 'lucide-react';

export const SoftwareDashboardSim: React.FC = () => {
  return (
    <div className="w-full bg-[#080D12]/95 border border-[#00E6D2]/30 rounded-xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-md select-none text-white font-sans overflow-hidden">
      {/* Top Header Status Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFE5] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E6D2]" />
          </span>
          <span className="text-xs font-bold text-gray-200 uppercase tracking-wider font-heading">
            AI WORKFLOW ENGINE v2.4
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
          <Cpu className="w-3 h-3 text-[#00E6D2] animate-pulse" />
          <span>GPU LOAD: 14%</span>
          <ShieldCheck className="w-3 h-3 text-emerald-400 ml-1" />
          <span className="text-emerald-400">ACTIVE</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2.5 mb-3">
        <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
          <div className="text-[10px] text-gray-400 font-medium">Lead Conversion</div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-bold text-white font-heading">+48.2%</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#00E6D2]" />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
          <div className="text-[10px] text-gray-400 font-medium">SEO Rank Index</div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-bold text-white font-heading">99 / 100</span>
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
          <div className="text-[10px] text-gray-400 font-medium">Tasks Automated</div>
          <div className="flex items-center justify-between mt-1">
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sm font-bold text-[#00FFE5] font-heading"
            >
              12,840
            </motion.span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#00E6D2]/20 text-[#00E6D2]">LIVE</span>
          </div>
        </div>
      </div>

      {/* Live Graph Simulation */}
      <div className="relative bg-[#05070A] border border-white/10 rounded-lg p-3 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-gray-400 uppercase font-medium">Real-Time Lead Velocity</span>
          <span className="text-[10px] text-[#00E6D2] font-mono">60 FPS REALTIME</span>
        </div>

        <div className="relative h-20 w-full flex items-end">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
            <defs>
              <linearGradient id="dashboardAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0, 230, 210, 0.35)" />
                <stop offset="100%" stopColor="rgba(0, 230, 210, 0.0)" />
              </linearGradient>
            </defs>

            {/* Background Mesh Grid Lines */}
            <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />

            {/* Filled Gradient Area under chart */}
            <path
              d="M 0 70 Q 50 30, 100 50 T 200 20 T 300 15 L 300 80 L 0 80 Z"
              fill="url(#dashboardAreaGrad)"
            />

            {/* Animated Graph Line */}
            <motion.path
              d="M 0 70 Q 50 30, 100 50 T 200 20 T 300 15"
              fill="none"
              stroke="#00FFE5"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: [0.22, 0.61, 0.36, 1] }}
            />

            {/* Glowing Peak Data Point */}
            <motion.circle
              cx="300"
              cy="15"
              r="4"
              fill="#FFFFFF"
              stroke="#00E6D2"
              strokeWidth="2"
              animate={{ r: [3.5, 5, 3.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
