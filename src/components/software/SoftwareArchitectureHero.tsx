import React, { useState, useEffect, useMemo } from 'react';

const D = 4500; // Duration per stage in ms
const LIVE_DURATION = 8000; // Duration on live dashboard before looping

export const SoftwareArchitectureHero: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [liveKpis, setLiveKpis] = useState({
    uptime: '99.98%',
    apiCalls: '1.2M/hr',
    latency: '18 ms',
    errors: '0.02%',
  });
  const [bumpKey, setBumpKey] = useState<string | null>(null);

  // Performance chart series state (3 lines x 40 points)
  const N = 40;
  const initialSeries = useMemo(() => {
    const s: number[][] = [[], [], []];
    const base = [45, 55, 35];
    for (let k = 0; k < 3; k++) {
      for (let i = 0; i < N; i++) {
        s[k].push(base[k] + Math.sin(i / 4 + k) * 10 + Math.random() * 6);
      }
    }
    return s;
  }, []);
  const [series, setSeries] = useState<number[][]>(initialSeries);

  // Throughput bars (Q1, Q2, Q3, Q4)
  const [barHeights, setBarHeights] = useState<number[]>([55, 75, 88, 68]);

  // Declarative dot coordinates for the central processing cube
  const dotCoords = useMemo(() => {
    const coords: [number, number][] = [];
    for (let a = -88; a <= 88; a += 10) {
      for (let b = -88; b <= 88; b += 10) {
        const m = Math.max(Math.abs(a), Math.abs(b));
        if (m < 62 || m > 86) continue;
        coords.push([a, b]);
      }
    }
    return coords;
  }, []);

  // Main stepper loop
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (step === 3) {
      timer = setTimeout(() => {
        setStep(0);
      }, LIVE_DURATION);
    } else {
      timer = setTimeout(() => {
        setStep((prev) => (prev + 1) % 4);
      }, D);
    }

    return () => clearTimeout(timer);
  }, [step]);

  // Live dashboard telemetry ticker (active during step 3)
  useEffect(() => {
    if (step !== 3) return;

    let tick = 0;
    const interval = setInterval(() => {
      tick++;

      // Shift chart series
      setSeries((prev) =>
        prev.map((line) => {
          const next = [...line];
          next.shift();
          const last = next[next.length - 1];
          next.push(Math.max(15, Math.min(85, last + (Math.random() - 0.5) * 14)));
          return next;
        })
      );

      // Random throughput bars & KPI updates
      if (tick % 2 === 0) {
        setBarHeights([
          Math.round(30 + Math.random() * 55),
          Math.round(35 + Math.random() * 55),
          Math.round(40 + Math.random() * 55),
          Math.round(35 + Math.random() * 55),
        ]);

        setLiveKpis((prev) => ({
          ...prev,
          apiCalls: (1.1 + Math.random() * 0.3).toFixed(1) + 'M/hr',
          latency: 16 + Math.round(Math.random() * 6) + ' ms',
        }));
        setBumpKey('api');
        setTimeout(() => setBumpKey(null), 250);
      }

      // Update Uptime & Error rate
      if (tick % 4 === 0) {
        setLiveKpis((prev) => ({
          ...prev,
          uptime: (99.96 + Math.random() * 0.03).toFixed(2) + '%',
          errors: (0.01 + Math.random() * 0.03).toFixed(2) + '%',
        }));
      }
    }, 800);

    return () => clearInterval(interval);
  }, [step]);

  // SVG Chart path calculation for performance metrics
  const chartLines = useMemo(() => {
    const cols = ['#00e5b0', '#3b82f6', '#8b5cf6'];
    return series.map((arr, k) => {
      const d = arr
        .map((v, i) => `${i ? 'L' : 'M'}${((i / (N - 1)) * 600).toFixed(1)} ${(115 - v * 1.15).toFixed(1)}`)
        .join(' ');
      return { d, color: cols[k] };
    });
  }, [series]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-2 sm:mt-3 mb-0 rounded-2xl overflow-hidden border border-[#1a2b2f] bg-[#0a1316] text-[#e8f1f2] shadow-[0_0_50px_rgba(0,229,176,0.08)] select-none text-left font-sans">
      <style>{`
        .arch-glow { filter: url(#arch-gl); }
        @keyframes arch-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes arch-bob2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        @keyframes arch-flow { to { stroke-dashoffset: -30; } }
        @keyframes arch-type { 0% { transform: scaleX(0.2); } 60%, 90% { transform: scaleX(1); } 100% { transform: scaleX(0.2); } }
        @keyframes arch-cp { 50% { opacity: 0.6; } }
        @keyframes arch-bl { 50% { opacity: 0.35; } }
        .arch-p1 { animation: arch-bob 5s ease-in-out infinite; }
        .arch-p2 { animation: arch-bob2 5s ease-in-out infinite; }
        .arch-fl { stroke-dasharray: 10 20; animation: arch-flow 1.2s linear infinite; }
        .arch-type { transform-box: fill-box; transform-origin: left center; animation: arch-type 3s ease-in-out infinite; }
        .arch-core-active { animation: arch-cp 1.8s ease-in-out infinite; }
        .arch-bl-dot { animation: arch-bl 1.4s infinite; }
      `}</style>

      {/* ── MAIN STAGE ── */}
      <div className="relative grid bg-[radial-gradient(ellipse_at_50%_40%,#0b1a1d_0,#060d0f_70%)] overflow-hidden min-h-[300px] sm:min-h-[340px] md:min-h-[360px]">
        {/* SVG ISOMETRIC ARCHITECTURE SCENE (Steps 01, 02, 03) */}
        <div
          className={`col-start-1 row-start-1 w-full flex items-center justify-center transition-all duration-700 ease-in-out ${
            step === 3
              ? 'opacity-0 scale-90 blur-sm pointer-events-none'
              : 'opacity-100 scale-100 blur-0'
          }`}
        >
          <svg
            id="arch-scene"
            viewBox="60 80 1340 540"
            className="w-full h-auto block"
            role="img"
            aria-label="Isometric architecture: operations, development, and deployment"
          >
            <defs>
              <filter id="arch-gl" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background gridlines */}
            <g fill="none" stroke="#2c4549" strokeWidth="1.5" strokeDasharray="5 6">
              <path d="M370 522L485 590L595 524" />
              <path d="M372 553L485 618L595 553" />
              <path d="M865 530L970 590L1082 524" />
              <path d="M862 556L970 618L1082 554" />
            </g>
            <g fill="none" stroke="#00e5b0" strokeWidth="1.5">
              <circle cx="370" cy="522" r="4" />
              <circle cx="485" cy="619" r="4" />
              <circle cx="970" cy="619" r="4" />
              <circle cx="860" cy="556" r="4" />
            </g>

            {/* NODE 1: OPERATIONS (Left Phone Device) */}
            <g className="arch-p1">
              <g transform="matrix(0.866,0.5,-0.866,0.5,175,309)">
                <rect width="270" height="105" rx="16" fill="#071012" stroke="#2f4b4f" strokeWidth="2" />
              </g>
              <g transform="matrix(0.866,0.5,-0.866,0.5,175,293)">
                <rect width="270" height="105" rx="16" fill="#0b1417" stroke="#2f4b4f" strokeWidth="2" strokeLinejoin="round" />
                <rect x="20" y="22" width="60" height="60" rx="14" fill="#0f1c20" stroke="#3b5d61" strokeWidth="2" />
                <rect x="34" y="36" width="32" height="32" rx="9" fill="none" stroke="#00e5b0" strokeWidth="4" className="arch-glow" />
                <rect x="100" y="28" width="150" height="8" rx="4" fill="#e8f1f2" className="arch-type" />
                <rect x="100" y="46" width="130" height="7" rx="3.5" fill="#24383c" />
                <rect x="100" y="60" width="105" height="7" rx="3.5" fill="#24383c" />
                <rect x="100" y="74" width="26" height="5" rx="2.5" fill="#facc15" />
                <circle cx="240" cy="62" r="3.5" fill="#33494d" />
                <circle cx="240" cy="74" r="3.5" fill="#33494d" />
                <circle cx="240" cy="86" r="3.5" fill="#33494d" />
              </g>
            </g>

            {/* NODE 3: DEPLOYMENT (Right Phone Device) */}
            <g className="arch-p2">
              <g transform="matrix(0.866,0.5,-0.866,0.5,1108,396)">
                <rect width="290" height="95" rx="16" fill="#071012" stroke="#2f4b4f" strokeWidth="2" />
              </g>
              <g transform="matrix(0.866,0.5,-0.866,0.5,1108,380)">
                <rect width="290" height="95" rx="16" fill="#0b1417" stroke="#2f4b4f" strokeWidth="2" strokeLinejoin="round" />
                <rect x="18" y="18" width="60" height="60" rx="14" fill="#0f1c20" stroke="#3b5d61" strokeWidth="2" />
                <rect x="30" y="30" width="36" height="36" rx="9" fill="none" stroke="#00e5b0" strokeWidth="3" className="arch-glow" />
                {/* Checkmark in node 3 (appears in step >= 2) */}
                <path
                  d="M38 47l8 8 14-16"
                  fill="none"
                  stroke="#00e5b0"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`arch-glow transition-opacity duration-500 delay-500 ${
                    step >= 2 ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {/* Progress bar fill in node 3 */}
                <rect
                  x="100"
                  y="26"
                  width="160"
                  height="8"
                  rx="4"
                  fill="#00e5b0"
                  className="arch-glow transition-transform duration-1000 ease-out"
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'left center',
                    transform: step >= 2 ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
                <rect x="100" y="44" width="140" height="7" rx="3.5" fill="#24383c" />
                <rect x="100" y="58" width="115" height="7" rx="3.5" fill="#24383c" />
                <rect x="100" y="72" width="14" height="5" rx="2.5" fill="#3b82f6" />
                <circle cx="262" cy="56" r="3.5" fill="#33494d" />
                <circle cx="262" cy="68" r="3.5" fill="#33494d" />
                <circle cx="262" cy="80" r="3.5" fill="#33494d" />
              </g>
            </g>

            {/* CONNECTING WIRES */}
            <g fill="none" strokeLinecap="round">
              <path d="M366 474C410 486 432 470 478 446S545 414 577 419" stroke="#0c2a26" strokeWidth="7" />
              <path id="arch-wl" d="M366 474C410 486 432 470 478 446S545 414 577 419" stroke="#00e5b0" strokeWidth="3.5" className="arch-glow" />
              <path d="M366 474C410 486 432 470 478 446S545 414 577 419" stroke="#d8fff5" strokeWidth="2" className="arch-fl" />

              {/* Wire to Right Node (active in step >= 2) */}
              <g className={`transition-opacity duration-600 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                <path d="M878 419C930 408 965 436 1010 460S1048 478 1060 468" stroke="#0c2a26" strokeWidth="7" />
                <path id="arch-wr" d="M878 419C930 408 965 436 1010 460S1048 478 1060 468" stroke="#00e5b0" strokeWidth="3.5" className="arch-glow" />
                <path d="M878 419C930 408 965 436 1010 460S1048 478 1060 468" stroke="#d8fff5" strokeWidth="2" className="arch-fl" />
              </g>
            </g>

            {/* Traveling Data Packets */}
            <circle r="7" fill="#22d3ee" className="arch-glow">
              <animateMotion dur="2.2s" repeatCount="indefinite" calcMode="linear">
                <mpath href="#arch-wl" />
              </animateMotion>
            </circle>

            {step >= 2 && (
              <circle r="7" fill="#22d3ee" className="arch-glow">
                <animateMotion dur="2.2s" repeatCount="indefinite" calcMode="linear">
                  <mpath href="#arch-wr" />
                </animateMotion>
              </circle>
            )}

            {/* CENTRAL CORE CUBE */}
            <g id="arch-cube">
              <polygon points="555,308 728,408 728,572 555,468" fill="#0f1c20" stroke="#2f4b4f" strokeWidth="2" strokeLinejoin="round" />
              <polygon points="728,408 903,308 903,468 728,572" fill="#0b1417" stroke="#2f4b4f" strokeWidth="2" strokeLinejoin="round" />
              <path d="M555 440L728 540L903 440" fill="none" stroke="#2f4b4f" strokeWidth="1.5" strokeLinejoin="round" />

              {/* Cube Top Face */}
              <g transform="matrix(0.866,0.5,-0.866,0.5,728,308)">
                <rect x="-100" y="-100" width="200" height="200" rx="16" fill="#0d1a1d" stroke="#2f4b4f" strokeWidth="2" strokeLinejoin="round" />
                {/* Decorative Matrix Dots */}
                <g fill="#2e5a58">
                  {dotCoords.map(([a, b]) => (
                    <circle key={`${a}-${b}`} cx={a} cy={b} r={2} />
                  ))}
                </g>
                <rect x="-52" y="-52" width="104" height="104" rx="12" fill="#10201f" stroke="#4f8a84" strokeWidth="2" />
                <rect x="-44" y="-44" width="80" height="80" rx="10" fill="#142a29" stroke="#6aa8a1" strokeWidth="2" />
                <rect
                  x="-26"
                  y="-26"
                  width="44"
                  height="44"
                  rx="8"
                  fill="#00e5b0"
                  className={`arch-glow transition-opacity duration-600 ${
                    step >= 1 ? 'opacity-100 arch-core-active' : 'opacity-30'
                  }`}
                />
              </g>

              {/* Ports and Ticks */}
              <g fill="#4f6d70">
                <ellipse cx="729" cy="224" rx="8" ry="5" />
                <ellipse cx="580" cy="310" rx="8" ry="5" />
                <ellipse cx="878" cy="310" rx="8" ry="5" />
                <ellipse cx="728" cy="396" rx="8" ry="5" />
              </g>

              <g className={`transition-opacity duration-600 ${step >= 1 ? 'opacity-100' : 'opacity-35'}`}>
                <ellipse cx="628" cy="437" rx="8" ry="10" fill="#0a1214" stroke="#4a6a6e" strokeWidth="2" />
                <ellipse cx="651" cy="449" rx="8" ry="10" fill="#00e5b0" className="arch-glow" />
                <ellipse cx="673" cy="462" rx="8" ry="10" fill="#22d3ee" />
                <g fill="#00e5b0" className="arch-glow">
                  <circle cx="798" cy="515" r="5" />
                  <circle cx="815" cy="506" r="5" />
                  <circle cx="832" cy="497" r="5" />
                </g>
              </g>

              <g stroke="#4a6a6e" strokeWidth="2" strokeLinecap="round">
                <path d="M767 428V475" />
                <path d="M781 420V467" />
                <path d="M795 412V459" />
                <path d="M809 404V451" />
              </g>

              <g>
                <ellipse cx="577" cy="419" rx="11" ry="14" fill="#0a1214" stroke="#00e5b0" strokeWidth="2" />
                <ellipse cx="577" cy="419" rx="5" ry="7" fill="#00e5b0" className="arch-glow" />
                <ellipse cx="878" cy="419" rx="11" ry="14" fill="#0a1214" stroke="#00e5b0" strokeWidth="2" />
                <ellipse cx="878" cy="419" rx="5" ry="7" fill="#00e5b0" className="arch-glow" />
              </g>
            </g>

            {/* ARCHITECTURE SLABS (Layers: Database, API, Interface) - Visible in step 1 & 2 */}
            {/* Slab 3: Interface */}
            <g
              className="transition-all duration-700 ease-out"
              style={{
                opacity: step >= 1 ? 1 : 0,
                transform: step >= 1 ? 'translateY(0)' : 'translateY(-34px)',
                transitionDelay: '0.4s',
              }}
            >
              <g transform="matrix(0.866,0.5,-0.866,0.5,728,150)">
                <rect x="-62" y="-62" width="124" height="124" rx="12" fill="#10201f" stroke="#22d3ee" strokeWidth="2.5" className="arch-glow" />
              </g>
            </g>

            {/* Slab 2: API and logic */}
            <g
              className="transition-all duration-700 ease-out"
              style={{
                opacity: step >= 1 ? 1 : 0,
                transform: step >= 1 ? 'translateY(0)' : 'translateY(-34px)',
                transitionDelay: '0.2s',
              }}
            >
              <g transform="matrix(0.866,0.5,-0.866,0.5,728,205)">
                <rect x="-62" y="-62" width="124" height="124" rx="12" fill="#10201f" stroke="#00e5b0" strokeWidth="2.5" className="arch-glow" />
              </g>
            </g>

            {/* Slab 1: Database */}
            <g
              className="transition-all duration-700 ease-out"
              style={{
                opacity: step >= 1 ? 1 : 0,
                transform: step >= 1 ? 'translateY(0)' : 'translateY(-34px)',
              }}
            >
              <g transform="matrix(0.866,0.5,-0.866,0.5,728,260)">
                <rect x="-62" y="-62" width="124" height="124" rx="12" fill="#10201f" stroke="#3b82f6" strokeWidth="2.5" className="arch-glow" />
              </g>
            </g>

            {/* Slab Labels */}
            <g
              className="transition-opacity duration-600 delay-500"
              style={{ opacity: step >= 1 ? 1 : 0 }}
            >
              <g fill="none" stroke="#3b5d61" strokeWidth="1.5" strokeDasharray="4 5">
                <path d="M846 150H960" />
                <path d="M846 205H960" />
                <path d="M846 260H960" />
              </g>
              <g fontFamily="'Outfit', 'Montserrat', sans-serif">
                <text x="972" y="108" style={{ fontSize: '12px', letterSpacing: '0.22em', fill: '#7d9396', fontWeight: 600 }}>
                  SYSTEM ARCHITECTURE
                </text>
                <text x="972" y="157" style={{ fill: '#22d3ee', fontSize: '20px', fontWeight: 700 }}>
                  Interface
                </text>
                <text x="972" y="212" style={{ fill: '#e8f1f2', fontSize: '20px', fontWeight: 700 }}>
                  API and logic
                </text>
                <text x="972" y="267" style={{ fill: '#3b82f6', fontSize: '20px', fontWeight: 700 }}>
                  Database
                </text>
              </g>
            </g>

            {/* DEPLOYED BADGE in Node 3 */}
            <g
              className="transition-opacity duration-500 delay-700"
              style={{ opacity: step >= 2 ? 1 : 0 }}
            >
              <rect x="1155" y="318" width="190" height="40" rx="20" fill="#0b1417" stroke="#00e5b0" strokeWidth="2" />
              <text x="1250" y="344" textAnchor="middle" style={{ fill: '#00e5b0', fontSize: '17px', fontWeight: 700, letterSpacing: '0.12em', fontFamily: "'Outfit', 'Montserrat', sans-serif" }}>
                DEPLOYED
              </text>
            </g>
          </svg>
        </div>

        {/* ── LIVE DASHBOARD (Step 04) ── */}
        <div
          className={`col-start-1 row-start-1 p-3 sm:p-4 lg:p-5 flex flex-col justify-center gap-2.5 sm:gap-3 transition-all duration-700 ease-in-out ${
            step === 3
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        >
          {/* Dashboard Header */}
          <div className="flex justify-between items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-[#1a2b2f] rounded-xl bg-[#0d181c] text-xs sm:text-sm tracking-wider">
            <span className="text-[#00e5b0] font-heading font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00e5b0] shadow-[0_0_8px_#00e5b0] arch-bl-dot inline-block" />
              LIVE DASHBOARD
            </span>
            <span className="text-[#7d9396] font-mono text-[10px] sm:text-xs">SYSTEM ONLINE</span>
          </div>

          {/* 4 KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            <div className="bg-[#0d181c] border border-[#1a2b2f] rounded-xl p-2 sm:p-2.5">
              <small className="block font-mono text-[9px] sm:text-[10px] text-[#7d9396] tracking-wider mb-0.5">
                UPTIME
              </small>
              <strong className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold text-[#00e5b0] tracking-tight">
                {liveKpis.uptime}
              </strong>
            </div>

            <div className="bg-[#0d181c] border border-[#1a2b2f] rounded-xl p-2 sm:p-2.5">
              <small className="block font-mono text-[9px] sm:text-[10px] text-[#7d9396] tracking-wider mb-0.5">
                API CALLS
              </small>
              <strong
                className={`font-heading text-lg sm:text-xl lg:text-2xl font-extrabold text-[#3b82f6] tracking-tight inline-block transition-transform duration-200 ${
                  bumpKey === 'api' ? 'scale-105' : 'scale-100'
                }`}
              >
                {liveKpis.apiCalls}
              </strong>
            </div>

            <div className="bg-[#0d181c] border border-[#1a2b2f] rounded-xl p-2 sm:p-2.5">
              <small className="block font-mono text-[9px] sm:text-[10px] text-[#7d9396] tracking-wider mb-0.5">
                LATENCY
              </small>
              <strong className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold text-[#8b5cf6] tracking-tight">
                {liveKpis.latency}
              </strong>
            </div>

            <div className="bg-[#0d181c] border border-[#1a2b2f] rounded-xl p-2 sm:p-2.5">
              <small className="block font-mono text-[9px] sm:text-[10px] text-[#7d9396] tracking-wider mb-0.5">
                ERRORS
              </small>
              <strong className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold text-[#22c55e] tracking-tight">
                {liveKpis.errors}
              </strong>
            </div>
          </div>

          {/* Charts (Performance Metrics + Throughput) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3">
            {/* PERFORMANCE METRICS */}
            <div className="md:col-span-7 lg:col-span-8 bg-[#0d181c] border border-[#1a2b2f] rounded-xl p-2.5 sm:p-3 h-32 sm:h-36 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center font-heading text-[11px] sm:text-xs text-[#00e5b0] font-bold tracking-wider">
                <span>PERFORMANCE METRICS</span>
                <span className="flex gap-3 text-[9px] text-[#7d9396] font-mono font-normal">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5b0]" />
                    CPU
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                    MEM
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                    NET
                  </span>
                </span>
              </div>

              {/* Dynamic SVG Waveform */}
              <div className="w-full flex-1 relative mt-1 overflow-hidden">
                <svg viewBox="0 0 600 110" preserveAspectRatio="none" className="w-full h-full">
                  {[1, 2, 3].map((g) => (
                    <line
                      key={g}
                      x1="0"
                      x2="600"
                      y1={g * 28}
                      y2={g * 28}
                      stroke="rgba(255,255,255,0.07)"
                      strokeDasharray="4 5"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                  {chartLines.map((line, idx) => (
                    <path
                      key={idx}
                      d={line.d}
                      fill="none"
                      stroke={line.color}
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* THROUGHPUT (Q1..Q4) */}
            <div className="md:col-span-5 lg:col-span-4 bg-[#0d181c] border border-[#1a2b2f] rounded-xl p-2.5 sm:p-3 h-32 sm:h-36 flex flex-col justify-between overflow-hidden">
              <div className="font-heading text-[11px] sm:text-xs text-[#00e5b0] font-bold tracking-wider">
                THROUGHPUT
              </div>

              <div className="flex-1 flex items-end justify-around gap-2 pb-1 border-b border-[#1a2b2f] bg-[repeating-linear-gradient(to_top,transparent_0,transparent_25px,rgba(255,255,255,0.04)_25px,rgba(255,255,255,0.04)_26px)]">
                {barHeights.map((h, i) => {
                  const bcols = ['#00e5b0', '#3b82f6', '#8b5cf6', '#22c55e'];
                  return (
                    <div
                      key={i}
                      className="w-full max-w-[28px] rounded-t-md relative transition-all duration-700 ease-out flex flex-col justify-start"
                      style={{
                        height: `${h}%`,
                        background: `linear-gradient(${bcols[i]}, ${bcols[i]}55)`,
                      }}
                    >
                      <span className="absolute -top-4 inset-x-0 text-center font-mono text-[8px] text-[#7d9396]">
                        {Math.round(h * 1.4)}k
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-4 gap-2 text-center font-mono text-[9px] text-[#7d9396] pt-1">
                <span>Q1</span>
                <span>Q2</span>
                <span>Q3</span>
                <span>Q4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
