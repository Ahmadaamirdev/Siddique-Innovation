import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Terminal,
} from 'lucide-react';

export const SoftwareHeroDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('00:00:01');

  // Simulated live clock in UTC
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setCurrentTime(`${h}:${m}:${s} UTC`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Event log items
  const eventLogs = [
    { time: '00:00:01', tag: 'DEPLOY', msg: 'Build #482 deployed to production (v2.14.0)', color: 'text-[#00FFE5]' },
    { time: '00:00:04', tag: 'HEALTH', msg: 'Health checks passed — all 8 replicas healthy', color: 'text-emerald-400' },
    { time: '00:00:09', tag: 'CACHE', msg: 'CDN cache invalidated — assets propagated globally', color: 'text-[#00E6D2]' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-2 sm:mt-3 mb-0 rounded-t-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,230,210,0.10)] bg-[#07090E] select-none text-left">
      {/* ── LIVE DASHBOARD VIEW ── */}
      <div className="p-2.5 sm:p-3.5 space-y-2 sm:space-y-2.5 bg-[#06080D]">
        {/* Header Bar: LIVE DASHBOARD & SYSTEM ONLINE */}
        <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider text-white">
              LIVE DASHBOARD
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-gray-400">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              SYSTEM ONLINE
            </span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="hidden sm:inline text-gray-400">{currentTime}</span>
          </div>
        </div>

        {/* 4 KPI METRIC TILES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {/* UPTIME */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#00FFE5]/30 transition-all">
            <div className="flex items-center justify-between text-gray-400 text-[8px] sm:text-[9px] font-mono tracking-wider mb-0.5">
              <span>UPTIME</span>
              <span className="text-emerald-400 text-[7px] bg-emerald-500/10 px-1 py-0.2 rounded">99.9%</span>
            </div>
            <div className="text-sm sm:text-lg font-bold font-mono text-[#00FFE5] tracking-tight">
              99.98%
            </div>
          </div>

          {/* API CALLS */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-blue-400/30 transition-all">
            <div className="flex items-center justify-between text-gray-400 text-[8px] sm:text-[9px] font-mono tracking-wider mb-0.5">
              <span>API CALLS</span>
              <span className="text-blue-400 text-[7px] bg-blue-500/10 px-1 py-0.2 rounded">Peak</span>
            </div>
            <div className="text-sm sm:text-lg font-bold font-mono text-[#3B82F6] tracking-tight">
              1.2M/hr
            </div>
          </div>

          {/* LATENCY */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-purple-400/30 transition-all">
            <div className="flex items-center justify-between text-gray-400 text-[8px] sm:text-[9px] font-mono tracking-wider mb-0.5">
              <span>LATENCY</span>
              <span className="text-purple-400 text-[7px] bg-purple-500/10 px-1 py-0.2 rounded">P95</span>
            </div>
            <div className="text-sm sm:text-lg font-bold font-mono text-[#A78BFA] tracking-tight">
              18 ms
            </div>
          </div>

          {/* ERRORS */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-emerald-400/30 transition-all">
            <div className="flex items-center justify-between text-gray-400 text-[8px] sm:text-[9px] font-mono tracking-wider mb-0.5">
              <span>ERRORS</span>
              <span className="text-emerald-400 text-[7px] bg-emerald-500/10 px-1 py-0.2 rounded">Low</span>
            </div>
            <div className="text-sm sm:text-lg font-bold font-mono text-[#34D399] tracking-tight">
              0.02%
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: PERFORMANCE METRICS & THROUGHPUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
          {/* PERFORMANCE METRICS (Left 7-8 cols) */}
          <div className="md:col-span-8 p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/10 flex flex-col justify-between">
            {/* Card Header & Legend (Three dots removed from legend) */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-gray-300 uppercase flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#00E6D2]" />
                <span>PERFORMANCE METRICS</span>
              </div>

              {/* Legend without dots */}
              <div className="flex items-center gap-2 font-mono text-[8px] sm:text-[9px]">
                <span className="text-[#00FFE5] font-semibold">CPU</span>
                <span className="text-[#3B82F6] font-semibold">MEM</span>
                <span className="text-[#A78BFA] font-semibold">NET</span>
              </div>
            </div>

            {/* Animated Chart Canvas */}
            <div className="w-full h-20 sm:h-24 relative overflow-hidden rounded-md bg-[#040608]/80 border border-white/5">
              {/* Horizontal Gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between p-1.5 pointer-events-none opacity-20">
                <div className="border-b border-dashed border-white/40 w-full" />
                <div className="border-b border-dashed border-white/40 w-full" />
                <div className="border-b border-dashed border-white/40 w-full" />
              </div>

              {/* Animated SVG Waveforms */}
              <svg
                className="w-full h-full"
                viewBox="0 0 500 100"
                preserveAspectRatio="none"
                fill="none"
              >
                <defs>
                  <linearGradient id="cpu-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00FFE5" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00FFE5" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="mem-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                  <filter id="dash-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* MEM Line (Blue) */}
                <path
                  d="M 0,65 C 60,50 120,75 180,58 C 240,42 300,68 360,52 C 420,38 460,60 500,48 L 500,100 L 0,100 Z"
                  fill="url(#mem-grad)"
                />
                <path
                  d="M 0,65 C 60,50 120,75 180,58 C 240,42 300,68 360,52 C 420,38 460,60 500,48"
                  stroke="#3B82F6"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />

                {/* CPU Line (Cyan - with glow) */}
                <path
                  d="M 0,45 C 50,22 110,55 170,32 C 230,15 290,42 350,26 C 410,12 455,34 500,20 L 500,100 L 0,100 Z"
                  fill="url(#cpu-grad)"
                />
                <path
                  d="M 0,45 C 50,22 110,55 170,32 C 230,15 290,42 350,26 C 410,12 455,34 500,20"
                  stroke="#00FFE5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  filter="url(#dash-glow)"
                />

                {/* NET Line (Purple dashed) */}
                <path
                  d="M 0,80 C 70,72 140,84 210,75 C 280,66 350,78 420,70 C 460,66 480,72 500,66"
                  stroke="#A78BFA"
                  strokeWidth="1.3"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
              </svg>

              {/* Laser Scanning Beam */}
              <motion.div
                className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#00FFE5] to-transparent shadow-[0_0_8px_#00FFE5]"
                animate={{ left: ['0%', '100%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>

          {/* THROUGHPUT (Right 4-5 cols) */}
          <div className="md:col-span-4 p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-gray-300 uppercase">
                THROUGHPUT
              </span>
              <span className="font-mono text-[8px] text-[#00E6D2]">Req/s</span>
            </div>

            {/* Q1, Q2, Q3, Q4 Bars */}
            <div className="w-full h-20 sm:h-24 rounded-md bg-[#040608]/80 border border-white/5 p-2 flex items-end justify-around gap-2">
              {[
                { label: 'Q1', height: '60%', color: 'from-[#00FFE5] to-[#00BFA6]', glow: 'rgba(0,255,229,0.3)', delay: 0 },
                { label: 'Q2', height: '76%', color: 'from-[#3B82F6] to-[#2563EB]', glow: 'rgba(59,130,246,0.3)', delay: 0.2 },
                { label: 'Q3', height: '86%', color: 'from-[#A78BFA] to-[#7C3AED]', glow: 'rgba(167,139,250,0.3)', delay: 0.4 },
                { label: 'Q4', height: '94%', color: 'from-[#34D399] to-[#059669]', glow: 'rgba(52,211,153,0.3)', delay: 0.6 },
              ].map((bar) => (
                <div key={bar.label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <motion.div
                    className={`w-full max-w-[28px] rounded-t-sm bg-gradient-to-t ${bar.color}`}
                    style={{
                      boxShadow: `0 0 8px ${bar.glow}`,
                    }}
                    initial={{ height: '30%' }}
                    animate={{
                      height: [bar.height, `${parseInt(bar.height) - 15}%`, bar.height],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                      delay: bar.delay,
                    }}
                  />
                  <span className="font-mono text-[9px] font-bold text-gray-400">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: EVENT LOG */}
        <div className="p-2 sm:p-2.5 rounded-lg bg-[#040608]/90 border border-white/10 font-mono">
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/10">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-gray-300">
              <Terminal className="w-3 h-3 text-[#00E6D2]" />
              <span>EVENT LOG</span>
            </div>
            <span className="text-[8px] text-gray-500">Auto-refresh 1s</span>
          </div>

          <div className="space-y-1 text-[8px] sm:text-[9px]">
            {eventLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-2 leading-tight">
                <span className="text-gray-500 shrink-0">{log.time}</span>
                <span className="text-gray-400 font-semibold shrink-0">[{log.tag}]</span>
                <span className={`${log.color} truncate`}>{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
