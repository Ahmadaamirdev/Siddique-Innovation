import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  Sliders,
  Users,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { WingLogo } from '@/components/ui/WingLogo';

export const SoftwareProductShowcaseHero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeMobileView, setActiveMobileView] = useState<'center' | 'left' | 'right'>('center');

  // KPI count-up animation state matching Option 4: Total Users (12.5K), Revenue ($24.8K), Growth (8.4K)
  const [kpiUsers, setKpiUsers] = useState(0);
  const [kpiRevenue, setKpiRevenue] = useState(0);
  const [kpiGrowth, setKpiGrowth] = useState(0);

  // Toggle switch states in Right Dashboard ("Settings")
  const [toggleDispatch, setToggleDispatch] = useState(true);
  const [toggleTelemetry, setToggleTelemetry] = useState(true);
  const [toggleSecurity, setToggleSecurity] = useState(true);

  useEffect(() => {
    if (shouldReduceMotion) {
      setKpiUsers(12.5);
      setKpiRevenue(24.8);
      setKpiGrowth(8.4);
      return;
    }

    const timer = setTimeout(() => {
      const duration = 1200; // ms
      const steps = 30;
      const stepTime = duration / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = Math.min(1, currentStep / steps);
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic

        setKpiUsers(Number((12.5 * ease).toFixed(1)));
        setKpiRevenue(Number((24.8 * ease).toFixed(1)));
        setKpiGrowth(Number((8.4 * ease).toFixed(1)));

        if (currentStep >= steps) {
          clearInterval(interval);
          setKpiUsers(12.5);
          setKpiRevenue(24.8);
          setKpiGrowth(8.4);
        }
      }, stepTime);

      return () => clearInterval(interval);
    }, 350);

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  // Bar chart data for Left "Reports" card (6 progressive monthly bars)
  const reportBars = [36, 52, 45, 68, 80, 94];

  return (
    <div className="w-full max-w-[1160px] xl:max-w-[1200px] mx-auto select-none relative px-2 sm:px-4">
      {/* 3D Dashboard Showcase Keyframe Animations */}
      <style>{`
        /* Responsive Spread & Tucked Dimensions */
        @media (min-width: 768px) {
          .hero-3d-stage {
            --hero-spread-x: 370px;
            --hero-tucked-x: 290px;
          }
        }
        @media (min-width: 1024px) {
          .hero-3d-stage {
            --hero-spread-x: 415px;
            --hero-tucked-x: 335px;
          }
        }
        @media (min-width: 1280px) {
          .hero-3d-stage {
            --hero-spread-x: 435px;
            --hero-tucked-x: 355px;
          }
        }

        /* 3D Animation Keyframes (8s loop, 0-8% tucked, 35-85% spread, 100% tucked) */
        @keyframes heroCenterPanel3D {
          0%, 8% {
            transform: translateY(0px) translateZ(0px);
          }
          35%, 85% {
            transform: translateY(14px) translateZ(70px);
          }
          100% {
            transform: translateY(0px) translateZ(0px);
          }
        }

        @keyframes heroLeftPanel3D {
          0%, 8% {
            transform: translate(-50%, -50%) translateX(calc(-1 * var(--hero-tucked-x, 335px))) translateZ(-90px) rotateY(32deg);
            opacity: 0.5;
          }
          35%, 85% {
            transform: translate(-50%, -50%) translateX(calc(-1 * var(--hero-spread-x, 415px))) translateZ(-30px) rotateY(32deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translateX(calc(-1 * var(--hero-tucked-x, 335px))) translateZ(-90px) rotateY(32deg);
            opacity: 0.5;
          }
        }

        @keyframes heroRightPanel3D {
          0%, 8% {
            transform: translate(-50%, -50%) translateX(var(--hero-tucked-x, 335px)) translateZ(-90px) rotateY(-32deg);
            opacity: 0.5;
          }
          35%, 85% {
            transform: translate(-50%, -50%) translateX(var(--hero-spread-x, 415px)) translateZ(-30px) rotateY(-32deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translateX(var(--hero-tucked-x, 335px)) translateZ(-90px) rotateY(-32deg);
            opacity: 0.5;
          }
        }

        /* Apply 3D animations on md screens and above */
        @media (min-width: 768px) {
          .hero-center-animated {
            animation: heroCenterPanel3D 8s ease-in-out infinite;
            will-change: transform;
            transform-style: preserve-3d;
            position: relative;
            z-index: 2;
          }
          .hero-left-animated {
            position: absolute;
            top: 50%;
            left: 50%;
            animation: heroLeftPanel3D 8s ease-in-out infinite;
            will-change: transform, opacity;
            transform-style: preserve-3d;
            z-index: 1;
          }
          .hero-right-animated {
            position: absolute;
            top: 50%;
            left: 50%;
            animation: heroRightPanel3D 8s ease-in-out infinite;
            will-change: transform, opacity;
            transform-style: preserve-3d;
            z-index: 1;
          }
        }

        /* Reduced Motion: Disable animations and display spread layout statically */
        @media (prefers-reduced-motion: reduce) {
          .hero-center-animated {
            animation: none !important;
            transform: translateY(14px) translateZ(70px) !important;
          }
          .hero-left-animated {
            animation: none !important;
            transform: translate(-50%, -50%) translateX(calc(-1 * var(--hero-spread-x, 415px))) translateZ(-30px) rotateY(32deg) !important;
            opacity: 1 !important;
          }
          .hero-right-animated {
            animation: none !important;
            transform: translate(-50%, -50%) translateX(var(--hero-spread-x, 415px)) translateZ(-30px) rotateY(-32deg) !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      {/* Mobile Perspective Tab Selector (Visible on small screens) */}
      <div className="flex md:hidden items-center justify-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => setActiveMobileView('left')}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
            activeMobileView === 'left'
              ? 'bg-[#00FFE5] text-black font-bold shadow-[0_0_12px_rgba(0,255,229,0.35)]'
              : 'bg-white/5 text-gray-400 border border-white/10'
          }`}
        >
          Reports
        </button>
        <button
          type="button"
          onClick={() => setActiveMobileView('center')}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
            activeMobileView === 'center'
              ? 'bg-[#00FFE5] text-black font-bold shadow-[0_0_12px_rgba(0,255,229,0.35)]'
              : 'bg-white/5 text-gray-400 border border-white/10'
          }`}
        >
          Dashboard
        </button>
        <button
          type="button"
          onClick={() => setActiveMobileView('right')}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
            activeMobileView === 'right'
              ? 'bg-[#00FFE5] text-black font-bold shadow-[0_0_12px_rgba(0,255,229,0.35)]'
              : 'bg-white/5 text-gray-400 border border-white/10'
          }`}
        >
          Settings
        </button>
      </div>

      {/* 3D Stage Container with perspective: 1100px - Compact Viewport Fit */}
      <div
        className="hero-3d-stage relative w-full flex items-center justify-center h-[310px] sm:h-[325px] md:h-[340px] lg:h-[355px]"
        style={{ perspective: '1100px' }}
      >
        {/* Soft, restrained pedestal baseline glow underneath */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[70%] max-w-[600px] h-[35px] bg-gradient-to-t from-[#00E6D2]/12 to-transparent blur-2xl pointer-events-none rounded-full" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[50%] max-w-[450px] h-px bg-gradient-to-r from-transparent via-[#00FFE5]/30 to-transparent pointer-events-none" />

        {/* Inner Scene with transform-style: preserve-3d and transform: rotateX(5deg) */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(5deg)',
          }}
        >
          {/* ======================================================== */}
          {/* 1. LEFT DASHBOARD — "Reports & Analytics"                */}
          {/* ======================================================== */}
          <div
            className={`
              hero-left-animated
              w-[240px] sm:w-[260px] md:w-[270px] lg:w-[290px]
              h-[255px] sm:h-[268px] md:h-[278px] lg:h-[288px]
              bg-[#080B11]/95 backdrop-blur-xl rounded-xl
              border border-white/12 hover:border-[#00FFE5]/30
              shadow-[0_16px_40px_rgba(0,0,0,0.85)]
              overflow-hidden transform-gpu
              transition-shadow duration-300
              max-md:hidden
              ${activeMobileView === 'left' ? 'max-md:!block max-md:!relative max-md:!left-auto max-md:!top-auto max-md:!opacity-100 max-md:!z-30 max-md:mx-auto' : ''}
            `}
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity',
            }}
          >
            {/* Window Header Bar */}
            <div className="px-3 py-2 bg-[#0A0E17] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/20 inline-block" />
                <span className="w-2 h-2 rounded-full bg-white/20 inline-block" />
                <span className="w-2 h-2 rounded-full bg-white/20 inline-block" />
                <span className="ml-1 font-mono text-[10px] text-gray-200 font-semibold tracking-tight">
                  Reports &amp; Analytics
                </span>
              </div>
              <div className="flex items-center gap-1 text-[8px] font-mono text-[#00E6D2]">
                <BarChart3 className="w-2.5 h-2.5 text-[#00FFE5]" />
                <span>Monthly</span>
              </div>
            </div>

            {/* Body Content — Visual Vertical Bar Chart */}
            <div className="p-3 space-y-2 text-left font-sans flex flex-col justify-between h-[calc(100%-37px)]">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[8.5px] uppercase font-mono tracking-wider text-gray-400">
                    Monthly Throughput
                  </span>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                    +28.4%
                  </span>
                </div>

                {/* Vertical Bars Graphic */}
                <div className="h-24 sm:h-28 pt-2 pb-0.5 flex items-end justify-between gap-2 px-1 border-b border-white/5">
                  {reportBars.map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <motion.div
                        initial={shouldReduceMotion ? { height: `${height}%` } : { height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: 0.25 + i * 0.08, ease: 'easeOut' }}
                        className="w-full rounded-t-sm bg-gradient-to-t from-teal-800 via-[#00BFA6] to-[#00FFE5] hover:opacity-90 transition-opacity"
                        style={{
                          boxShadow: i >= 4 ? '0 0 10px rgba(0, 255, 229, 0.35)' : 'none',
                        }}
                      />
                      <span className="text-[7.5px] font-mono text-gray-400">
                        {['M1', 'M2', 'M3', 'M4', 'M5', 'M6'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick KPI Footer */}
              <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between font-mono text-[9px]">
                <span className="text-gray-300">Deliverables</span>
                <span className="text-[#00FFE5] font-bold">1,420 Done</span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 2. RIGHT DASHBOARD — "Settings & Controls"               */}
          {/* ======================================================== */}
          <div
            className={`
              hero-right-animated
              w-[240px] sm:w-[260px] md:w-[270px] lg:w-[290px]
              h-[255px] sm:h-[268px] md:h-[278px] lg:h-[288px]
              bg-[#080B11]/95 backdrop-blur-xl rounded-xl
              border border-white/12 hover:border-[#00FFE5]/30
              shadow-[0_16px_40px_rgba(0,0,0,0.85)]
              overflow-hidden transform-gpu
              transition-shadow duration-300
              max-md:hidden
              ${activeMobileView === 'right' ? 'max-md:!block max-md:!relative max-md:!right-auto max-md:!top-auto max-md:!opacity-100 max-md:!z-30 max-md:mx-auto' : ''}
            `}
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity',
            }}
          >
            {/* Window Header Bar */}
            <div className="px-3 py-2 bg-[#0A0E17] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/20 inline-block" />
                <span className="w-2 h-2 rounded-full bg-white/20 inline-block" />
                <span className="w-2 h-2 rounded-full bg-white/20 inline-block" />
                <span className="ml-1 font-mono text-[10px] text-gray-200 font-semibold tracking-tight">
                  Settings &amp; Controls
                </span>
              </div>
              <div className="flex items-center gap-1 text-[8px] font-mono text-cyan-400">
                <Sliders className="w-2.5 h-2.5 text-[#00FFE5]" />
                <span>CONFIG</span>
              </div>
            </div>

            {/* Body Content — Option 4 Clean Settings & Toggles */}
            <div className="p-3 space-y-2.5 text-left font-sans flex flex-col justify-between h-[calc(100%-37px)]">
              <div className="space-y-1.5">
                <span className="text-[8.5px] uppercase font-mono tracking-wider text-gray-400 block">
                  Operational Preferences
                </span>

                {/* Setting Toggles */}
                <div className="space-y-1.5 bg-[#05080E] p-2 rounded-lg border border-white/5">
                  <div
                    onClick={() => setToggleDispatch(!toggleDispatch)}
                    className="flex items-center justify-between py-0.5 cursor-pointer select-none"
                  >
                    <div>
                      <span className="text-[10px] text-gray-200 font-medium block">Auto-Dispatch</span>
                      <span className="text-[7.5px] text-gray-500 font-mono">Routing pipeline</span>
                    </div>
                    <div
                      className={`w-6 h-3.5 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
                        toggleDispatch ? 'bg-[#00E6D2] justify-end' : 'bg-white/15 justify-start'
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${toggleDispatch ? 'bg-black' : 'bg-gray-400'}`} />
                    </div>
                  </div>

                  <div
                    onClick={() => setToggleTelemetry(!toggleTelemetry)}
                    className="flex items-center justify-between py-0.5 border-t border-white/5 cursor-pointer select-none"
                  >
                    <div>
                      <span className="text-[10px] text-gray-200 font-medium block">Telemetry Stream</span>
                      <span className="text-[7.5px] text-gray-500 font-mono">Live event bus</span>
                    </div>
                    <div
                      className={`w-6 h-3.5 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
                        toggleTelemetry ? 'bg-[#00E6D2] justify-end' : 'bg-white/15 justify-start'
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${toggleTelemetry ? 'bg-black' : 'bg-gray-400'}`} />
                    </div>
                  </div>

                  <div
                    onClick={() => setToggleSecurity(!toggleSecurity)}
                    className="flex items-center justify-between py-0.5 border-t border-white/5 cursor-pointer select-none"
                  >
                    <div>
                      <span className="text-[10px] text-gray-200 font-medium block">Role-Based Access</span>
                      <span className="text-[7.5px] text-gray-500 font-mono">Multi-tenant auth</span>
                    </div>
                    <div
                      className={`w-6 h-3.5 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
                        toggleSecurity ? 'bg-[#00E6D2] justify-end' : 'bg-white/15 justify-start'
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${toggleSecurity ? 'bg-black' : 'bg-gray-400'}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Infrastructure Health Status */}
              <div className="space-y-1 font-mono text-[8.5px]">
                <div className="flex items-center justify-between text-gray-300 p-1 rounded-md bg-white/[0.03] border border-white/5">
                  <span>Infrastructure Latency</span>
                  <span className="text-emerald-400 font-bold">14ms Optimal</span>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 3. CENTRAL MAIN DASHBOARD — "Dashboard" (Z-Index 2)     */}
          {/* ======================================================== */}
          <div
            className={`
              hero-center-animated
              relative z-[2]
              w-[94%] sm:w-[490px] md:w-[520px] lg:w-[550px] xl:w-[570px]
              bg-[#090D15]/98 backdrop-blur-2xl rounded-xl
              border border-white/15 hover:border-[#00FFE5]/40
              shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,230,210,0.08)]
              overflow-hidden transform-gpu
              ${activeMobileView === 'center' ? 'max-md:!block max-md:!opacity-100 max-md:!z-30 max-md:mx-auto' : 'max-md:hidden'}
            `}
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            {/* Subtle Top Specular Streak */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00FFE5]/40 to-transparent pointer-events-none" />

            {/* Window Header Bar */}
            <div className="px-3 py-2 bg-[#0B101A] border-b border-white/10 flex items-center">
              <div className="flex items-center gap-1.5">
                <WingLogo className="w-3.5 h-3.5 text-[#00E6D2]" />
                <span className="font-mono text-[10.5px] text-white font-bold tracking-tight">
                  Dashboard
                </span>
              </div>
            </div>

            {/* Main Dashboard Layout: Compact Sidebar + Content Area */}
            <div className="flex items-stretch min-h-[245px] sm:min-h-[255px]">
              {/* Slim Left Sidebar Navigation */}
              <div className="w-10 sm:w-11 bg-[#070A10] border-r border-white/10 flex flex-col items-center py-2.5 justify-between shrink-0">
                <div className="space-y-3 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-lg bg-[#00E6D2]/15 border border-[#00E6D2]/35 flex items-center justify-center text-[#00FFE5]">
                    <Activity className="w-3 h-3" />
                  </div>
                  <div className="w-6 h-6 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors">
                    <BarChart3 className="w-3 h-3" />
                  </div>
                  <div className="w-6 h-6 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors">
                    <Users className="w-3 h-3" />
                  </div>
                </div>
                <div className="w-6 h-6 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors">
                  <Sliders className="w-3 h-3" />
                </div>
              </div>

              {/* Main Panel Content: Chart + Donut Ring Chart + 3 KPI Tiles */}
              <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-between space-y-2">
                {/* Top Subheader */}
                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <div>
                    <h3 className="text-xs sm:text-[13px] font-bold text-white font-heading tracking-tight leading-none">
                      Operations Overview
                    </h3>
                    <span className="text-[8px] font-mono text-gray-400 mt-0.5 block">
                      Enterprise Workflow Telemetry
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[8.5px] font-mono text-gray-400 bg-white/[0.03] border border-white/5 px-1.5 py-0.5 rounded">
                    <Calendar className="w-2.5 h-2.5 text-[#00E6D2]" />
                    <span>Real-Time</span>
                  </div>
                </div>

                {/* Data Visualization Area: Area Line Chart (Left) + Donut Ring Chart (Right) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 items-stretch">
                  {/* 1. Curved Area Line Chart */}
                  <div className="sm:col-span-2 bg-[#06080E] p-2 rounded-lg border border-white/5 relative flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-0.5 text-[9px] font-mono">
                      <div className="flex items-center gap-1 text-gray-300 font-medium">
                        <Activity className="w-2.5 h-2.5 text-[#00FFE5]" />
                        <span>Velocity Curve</span>
                      </div>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.2 rounded text-[8px]">
                        +18.4%
                      </span>
                    </div>

                    <div className="w-full h-15 sm:h-16 relative">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 380 80" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="mainChartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00FFE5" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#00FFE5" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="mainStrokeGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#00E6D2" />
                            <stop offset="50%" stopColor="#00FFE5" />
                            <stop offset="100%" stopColor="#00E6D2" />
                          </linearGradient>
                        </defs>

                        {/* Minimal Grid Lines */}
                        <line x1="0" y1="20" x2="380" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                        <line x1="0" y1="48" x2="380" y2="48" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                        <line x1="0" y1="72" x2="380" y2="72" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                        {/* Area Gradient Fill */}
                        <path
                          d="M0,65 C40,55 75,60 115,40 C155,20 190,36 230,24 C270,10 310,30 350,14 C365,9 380,10 380,10 L380,80 L0,80 Z"
                          fill="url(#mainChartGrad)"
                        />

                        {/* Animated Line Path */}
                        <motion.path
                          d="M0,65 C40,55 75,60 115,40 C155,20 190,36 230,24 C270,10 310,30 350,14 C365,9 380,10 380,10"
                          fill="none"
                          stroke="url(#mainStrokeGrad)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.2, delay: 0.35, ease: 'easeOut' }}
                        />

                        {/* Peak Point Indicators */}
                        <circle cx="115" cy="40" r="2" fill="#00FFE5" />
                        <circle cx="230" cy="24" r="2" fill="#00FFE5" />
                        <circle cx="350" cy="14" r="2.5" fill="#00FFE5" />
                        <circle cx="350" cy="14" r="1.2" fill="#ffffff" />
                      </svg>
                    </div>
                  </div>

                  {/* 2. Donut Ring Chart */}
                  <div className="bg-[#06080E] p-1.5 rounded-lg border border-white/5 flex flex-col items-center justify-center relative">
                    <div className="relative w-15 h-15 sm:w-16 sm:h-16 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="10"
                          fill="none"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="38"
                          stroke="url(#donutGrad)"
                          strokeWidth="10"
                          strokeDasharray={238.76}
                          initial={shouldReduceMotion ? { strokeDashoffset: 47 } : { strokeDashoffset: 238.76 }}
                          animate={{ strokeDashoffset: 47 }}
                          transition={{ duration: 1.2, delay: 0.45, ease: 'easeOut' }}
                          strokeLinecap="round"
                          fill="none"
                        />
                        <defs>
                          <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#00E6D2" />
                            <stop offset="100%" stopColor="#00FFE5" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xs font-bold text-white font-heading leading-none">
                          84%
                        </span>
                        <span className="text-[6.5px] font-mono text-cyan-300 uppercase tracking-tight mt-0.5">
                          Capacity
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Metric Tiles matching Option 4: Total Users (12.5K), Revenue ($24.8K), Growth (8.4K) */}
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="bg-white/[0.025] p-1.5 rounded-lg border border-white/10">
                    <div className="flex justify-between text-[7.5px] sm:text-[8px] font-mono text-gray-400">
                      <span>TOTAL USERS</span>
                      <span className="text-emerald-400">+12%</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white font-heading mt-0.2">
                      {kpiUsers}K
                    </div>
                  </div>

                  <div className="bg-white/[0.025] p-1.5 rounded-lg border border-white/10">
                    <div className="flex justify-between text-[7.5px] sm:text-[8px] font-mono text-gray-400">
                      <span>REVENUE</span>
                      <span className="text-emerald-400">+14%</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#00FFE5] font-heading mt-0.2">
                      ${kpiRevenue}K
                    </div>
                  </div>

                  <div className="bg-white/[0.025] p-1.5 rounded-lg border border-white/10">
                    <div className="flex justify-between text-[7.5px] sm:text-[8px] font-mono text-gray-400">
                      <span>GROWTH</span>
                      <span className="text-emerald-400">+8%</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white font-heading mt-0.2">
                      {kpiGrowth}K
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
