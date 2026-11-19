/**
 * DevPipelineAnimation
 *
 * A self-contained SVG + CSS animation that shows an isometric
 * Development → Operations → Deployment pipeline, then transitions
 * to a live analytics dashboard with animated graph lines.
 *
 * Brand colors: #00FFE5 / #00E6D2 / #05070A
 * No external deps beyond React.
 */

import { useEffect, useRef, useState } from 'react';

/* ─── constants ─────────────────────────────────────────────── */
const TEAL   = '#00FFE5';
const TEAL2  = '#00E6D2';
const BG     = '#040608';
const FACE1  = '#0B0F14';
const FACE2  = '#0D1219';
const EDGE   = '#1E2D35';
const EDGE2  = '#253040';
const DIM    = '#1A2530';

/* ─── tiny helpers ───────────────────────────────────────────── */
// lerp reserved for future use

/* animated sine-wave chart line */
function AnimLine({
  points, color, delay = 0, amplitude = 18, period = 90,
}: {
  points: [number, number][];
  color: string;
  delay?: number;
  amplitude?: number;
  period?: number;
}) {
  const ref = useRef<SVGPolylineElement>(null);
  const tRef = useRef(delay);

  useEffect(() => {
    let raf: number;
    function tick() {
      tRef.current += 0.4;
      const t = tRef.current;
      if (ref.current) {
        const pts = points.map(([x, y], i) => {
          const dy = Math.sin((x / period) * Math.PI * 2 + t * 0.04 + i * 0.3) * amplitude;
          return `${x},${y + dy}`;
        }).join(' ');
        ref.current.setAttribute('points', pts);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [points, amplitude, period]);

  const initPts = points.map(([x, y]) => `${x},${y}`).join(' ');
  return <polyline ref={ref} points={initPts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />;
}

/* ─── PIPELINE SVG ──────────────────────────────────────────── */
function PipelineSVG() {
  return (
    <svg
      viewBox="0 0 760 340"
      className="w-full h-full"
      role="img"
      aria-label="Isometric software development pipeline: Development, Operations, Deployment"
      style={{ display: 'block' }}
    >
      <defs>
        {/* glow filter */}
        <filter id="sdp-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* subtle glow */}
        <filter id="sdp-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* flow dash for wires */}
        <style>{`
          @keyframes sdp-flow { to { stroke-dashoffset: -28; } }
          @keyframes sdp-bob  { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-5px) } }
          @keyframes sdp-bob2 { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY( 5px) } }
          @keyframes sdp-pulse{ 0%,100%{ opacity:.35 } 50%{ opacity:1 } }
          @keyframes sdp-ring { 0%,25%{ transform:scale(1);opacity:0 } 32%{ opacity:.8 }
                                60%{ transform:scale(1.9);opacity:0 } 100%{ opacity:0 } }
          @keyframes sdp-core { 0%,20%{ opacity:.4 } 35%,55%{ opacity:1 } 70%,100%{ opacity:.4 } }
          @keyframes sdp-dash { to { stroke-dashoffset:-28 } }
          @keyframes sdp-bar  { 0%,10%{ scaleX:.05 } 30%,80%{ scaleX:1 } 92%,100%{ scaleX:.05 } }
          @keyframes sdp-tick { 0%,25%{ opacity:0 } 35%,80%{ opacity:1 } 92%,100%{ opacity:0 } }
          @keyframes sdp-dot  { 0%,100%{ opacity:.2 } 50%{ opacity:1 } }
          .sdp-node1 { animation: sdp-bob  5.4s ease-in-out infinite; }
          .sdp-node2 { animation: sdp-bob2 5.4s ease-in-out 0.4s infinite; }
          .sdp-node3 { animation: sdp-bob  5.4s ease-in-out 0.9s infinite; }
          .sdp-fl    { stroke-dasharray:7 14; animation:sdp-flow 1s linear infinite; }
          .sdp-core  { animation:sdp-core 5.5s ease-in-out infinite; }
          .sdp-ring  { transform-box:fill-box; transform-origin:center; animation:sdp-ring 5.5s ease-out infinite; }
          .sdp-pulse { animation:sdp-pulse 1.4s ease-in-out infinite; }
        `}</style>

        {/* dot-grid pattern */}
        <pattern id="sdp-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill="#0E1620" />
        </pattern>
      </defs>

      {/* ── background ── */}
      <rect width="760" height="340" fill={BG} />
      <rect width="760" height="340" fill="url(#sdp-grid)" opacity="0.9" />

      {/* ── ambient teal gradients ── */}
      <ellipse cx="140" cy="210" rx="90" ry="50" fill={TEAL} opacity="0.03" />
      <ellipse cx="380" cy="160" rx="110" ry="55" fill={TEAL} opacity="0.04" />
      <ellipse cx="620" cy="210" rx="90" ry="50" fill={TEAL} opacity="0.03" />

      {/* ════════════════════════════════════════════
          NODE 1 — DEVELOPMENT
          isometric card, left cluster
      ════════════════════════════════════════════ */}
      <g className="sdp-node1">
        {/* isometric block shadow */}
        <polygon points="60,250 140,296 220,250 140,204" fill={DIM} opacity="0.6" />
        {/* left face */}
        <polygon points="60,208 140,254 140,296 60,250" fill={FACE1} stroke={EDGE} strokeWidth="1" />
        {/* right face */}
        <polygon points="220,208 140,254 140,296 220,250" fill={FACE2} stroke={EDGE} strokeWidth="1" />
        {/* top face */}
        <polygon points="60,208 140,162 220,208 140,254" fill="#0F161E" stroke={EDGE2} strokeWidth="1" />

        {/* code lines on top face — isometric-projected rectangles */}
        <g transform="matrix(0.866,0.5,-0.866,0.5,140,162)">
          <rect x="-52" y="-22" width="104" height="44" rx="6" fill="#0A0E14" stroke={EDGE} strokeWidth="0.8" />
          {/* code rows */}
          <rect x="-40" y="-14" width="30" height="4" rx="2" fill={TEAL} opacity="0.9" filter="url(#sdp-soft)" />
          <rect x="-4"  y="-14" width="44" height="4" rx="2" fill={EDGE2} />
          <rect x="-40" y="-5"  width="20" height="4" rx="2" fill="#3B82F6" opacity="0.8" />
          <rect x="-14" y="-5"  width="30" height="4" rx="2" fill={EDGE2} />
          <rect x="-40" y="4"   width="50" height="4" rx="2" fill={EDGE2} />
          <rect x="16"  y="4"   width="12" height="4" rx="2" fill={TEAL} opacity="0.6" />
          <rect x="-40" y="13"  width="35" height="4" rx="2" fill={EDGE2} />
          {/* cursor blink */}
          <rect x="-2" y="13" width="3" height="4" rx="1" fill={TEAL} className="sdp-pulse" />
        </g>

        {/* glowing corner port */}
        <ellipse cx="220" cy="229" rx="6" ry="9" fill="#0A0E14" stroke={TEAL} strokeWidth="1.5" />
        <ellipse cx="220" cy="229" rx="2.5" ry="4" fill={TEAL} filter="url(#sdp-glow)" />

        {/* label */}
        <text x="140" y="318" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={TEAL} letterSpacing="2" opacity="0.9">DEVELOPMENT</text>
        <circle cx="140" cy="308" r="2.5" fill={TEAL} className="sdp-pulse" />
      </g>

      {/* ════════════════════════════════════════════
          WIRE 1 → 2  (Development → Operations)
      ════════════════════════════════════════════ */}
      {/* shadow track */}
      <path d="M220 229 C270 215 290 215 340 220" fill="none" stroke="#071511" strokeWidth="6" strokeLinecap="round" />
      {/* teal glow wire */}
      <path id="sdp-w1" d="M220 229 C270 215 290 215 340 220" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" filter="url(#sdp-soft)" />
      {/* animated flow */}
      <path d="M220 229 C270 215 290 215 340 220" fill="none" stroke="#C0FFF8" strokeWidth="1.5" strokeLinecap="round" className="sdp-fl" />
      {/* traveling dot */}
      <circle r="5" fill={TEAL} filter="url(#sdp-glow)">
        <animateMotion dur="3.5s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.3;1" calcMode="linear">
          <mpath href="#sdp-w1" />
        </animateMotion>
        <animate attributeName="opacity" dur="3.5s" repeatCount="indefinite"
          values="0;1;1;0;0" keyTimes="0;0.03;0.28;0.32;1" />
      </circle>

      {/* ════════════════════════════════════════════
          NODE 2 — OPERATIONS  (centre cube)
      ════════════════════════════════════════════ */}
      <g className="sdp-node2">
        {/* cube faces */}
        <polygon points="340,200 420,154 500,200 420,246" fill="#101820" stroke={EDGE2} strokeWidth="1.2" />
        <polygon points="340,200 340,255 420,301 420,246" fill={FACE1} stroke={EDGE} strokeWidth="1" />
        <polygon points="500,200 500,255 420,301 420,246" fill={FACE2} stroke={EDGE} strokeWidth="1" />

        {/* glowing core on top */}
        <g transform="matrix(0.866,0.5,-0.866,0.5,420,154)">
          <rect x="-36" y="-36" width="72" height="72" rx="10" fill="#101820" stroke={EDGE2} strokeWidth="1" />
          <rect x="-24" y="-24" width="48" height="48" rx="8" fill="#141E28" stroke={EDGE2} strokeWidth="1" />
          <rect x="-14" y="-14" width="28" height="28" rx="6" fill={TEAL} className="sdp-core" filter="url(#sdp-glow)" />
        </g>

        {/* ring pulse */}
        <ellipse cx="420" cy="154" rx="58" ry="33" fill="none" stroke={TEAL} strokeWidth="1.5" className="sdp-ring" />

        {/* side blinkers */}
        <g>
          <ellipse cx="370" cy="246" rx="6" ry="9" fill="#0A0E14" stroke={TEAL} strokeWidth="1.5" />
          <ellipse cx="370" cy="246" rx="2.5" ry="4" fill={TEAL} filter="url(#sdp-glow)" />
          <ellipse cx="470" cy="246" rx="6" ry="9" fill="#0A0E14" stroke={TEAL} strokeWidth="1.5" />
          <ellipse cx="470" cy="246" rx="2.5" ry="4" fill={TEAL} filter="url(#sdp-glow)" />
        </g>

        {/* signal bars on right face */}
        <g stroke={EDGE2} strokeWidth="1.5" strokeLinecap="round">
          <line x1="455" y1="258" x2="455" y2="278" />
          <line x1="463" y1="252" x2="463" y2="278" />
          <line x1="471" y1="246" x2="471" y2="278" />
        </g>
        <g stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" filter="url(#sdp-soft)">
          <line x1="455" y1="264" x2="455" y2="278" />
          <line x1="463" y1="258" x2="463" y2="278" />
          <line x1="471" y1="252" x2="471" y2="278" />
        </g>

        {/* label */}
        <text x="420" y="324" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={TEAL} letterSpacing="2" opacity="0.9">OPERATIONS</text>
        <circle cx="420" cy="314" r="2.5" fill={TEAL} className="sdp-pulse" style={{ animationDelay: '0.5s' }} />
      </g>

      {/* ════════════════════════════════════════════
          WIRE 2 → 3  (Operations → Deployment)
      ════════════════════════════════════════════ */}
      <path d="M500 229 C545 215 565 215 610 220" fill="none" stroke="#071511" strokeWidth="6" strokeLinecap="round" />
      <path id="sdp-w2" d="M500 229 C545 215 565 215 610 220" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" filter="url(#sdp-soft)" />
      <path d="M500 229 C545 215 565 215 610 220" fill="none" stroke="#C0FFF8" strokeWidth="1.5" strokeLinecap="round" className="sdp-fl" style={{ animationDelay: '-0.6s' }} />
      <circle r="5" fill={TEAL} filter="url(#sdp-glow)">
        <animateMotion dur="3.5s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.3;1" calcMode="linear" begin="1.75s">
          <mpath href="#sdp-w2" />
        </animateMotion>
        <animate attributeName="opacity" dur="3.5s" repeatCount="indefinite" begin="1.75s"
          values="0;1;1;0;0" keyTimes="0;0.03;0.28;0.32;1" />
      </circle>

      {/* ════════════════════════════════════════════
          NODE 3 — DEPLOYMENT  (rocket card)
      ════════════════════════════════════════════ */}
      <g className="sdp-node3">
        <polygon points="540,250 620,296 700,250 620,204" fill={DIM} opacity="0.6" />
        <polygon points="540,208 620,254 620,296 540,250" fill={FACE1} stroke={EDGE} strokeWidth="1" />
        <polygon points="700,208 620,254 620,296 700,250" fill={FACE2} stroke={EDGE} strokeWidth="1" />
        <polygon points="540,208 620,162 700,208 620,254" fill="#0F161E" stroke={EDGE2} strokeWidth="1" />

        {/* deploy panel */}
        <g transform="matrix(0.866,0.5,-0.866,0.5,620,162)">
          <rect x="-52" y="-22" width="104" height="44" rx="6" fill="#0A0E14" stroke={EDGE} strokeWidth="0.8" />
          {/* progress bar fill animation */}
          <rect x="-40" y="-14" width="80" height="6" rx="3" fill={EDGE} />
          <rect x="-40" y="-14" width="80" height="6" rx="3" fill={TEAL} filter="url(#sdp-soft)">
            <animate attributeName="width" values="4;80;80;4" keyTimes="0;0.5;0.85;1" dur="4s" repeatCount="indefinite" />
          </rect>
          {/* check mark */}
          <path d="M30 -3 l5 5 9-10" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#sdp-glow)">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.56;0.85;1" dur="4s" repeatCount="indefinite" />
          </path>
          {/* row 2 */}
          <rect x="-40" y="-2" width="40" height="4" rx="2" fill={EDGE2} />
          <rect x="4"   y="-2" width="20" height="4" rx="2" fill="#3B82F6" opacity="0.7" />
          {/* row 3 dots */}
          <circle cx="-33" cy="10" r="2.5" fill={TEAL} filter="url(#sdp-soft)" className="sdp-pulse" />
          <circle cx="-24" cy="10" r="2.5" fill={TEAL} filter="url(#sdp-soft)" className="sdp-pulse" style={{ animationDelay: '0.3s' }} />
          <circle cx="-15" cy="10" r="2.5" fill="#9AFFF3" className="sdp-pulse" style={{ animationDelay: '0.6s' }} />
          <rect x="-6" y="7" width="40" height="4" rx="2" fill={EDGE2} />
        </g>

        {/* left port */}
        <ellipse cx="540" cy="229" rx="6" ry="9" fill="#0A0E14" stroke={TEAL} strokeWidth="1.5" />
        <ellipse cx="540" cy="229" rx="2.5" ry="4" fill={TEAL} filter="url(#sdp-glow)" />

        {/* label */}
        <text x="620" y="318" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={TEAL} letterSpacing="2" opacity="0.9">DEPLOYMENT</text>
        <circle cx="620" cy="308" r="2.5" fill={TEAL} className="sdp-pulse" style={{ animationDelay: '1s' }} />
      </g>

      {/* ── step connectors at top ── */}
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={TEAL2} opacity="0.5" letterSpacing="1">
        <text x="140" y="142" textAnchor="middle">01</text>
        <text x="420" y="122" textAnchor="middle">02</text>
        <text x="620" y="142" textAnchor="middle">03</text>
      </g>

      {/* ── top step arrows ── */}
      <g fill="none" stroke={TEAL2} strokeWidth="1" opacity="0.25">
        <path d="M200 138 L260 128" markerEnd="url(#sdp-arr)" />
        <path d="M500 128 L560 138" markerEnd="url(#sdp-arr)" />
      </g>
      <defs>
        <marker id="sdp-arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill={TEAL2} opacity="0.4" />
        </marker>
      </defs>
    </svg>
  );
}

/* ─── LIVE DASHBOARD SVG ─────────────────────────────────────── */
function DashboardSVG() {
  /* chart data points (x, baseline_y) */
  const line1: [number, number][] = [[0,55],[40,55],[80,55],[120,55],[160,55],[200,55],[240,55],[280,55],[320,55],[360,55]];
  const line2: [number, number][] = [[0,70],[40,70],[80,70],[120,70],[160,70],[200,70],[240,70],[280,70],[320,70],[360,70]];
  const line3: [number, number][] = [[0,85],[40,85],[80,85],[120,85],[160,85],[200,85],[240,85],[280,85],[320,85],[360,85]];

  /* animated bar heights */
  const barRef1 = useRef<SVGRectElement>(null);
  const barRef2 = useRef<SVGRectElement>(null);
  const barRef3 = useRef<SVGRectElement>(null);
  const barRef4 = useRef<SVGRectElement>(null);

  useEffect(() => {
    const bars = [
      { ref: barRef1, base: 60, amp: 25, phase: 0 },
      { ref: barRef2, base: 45, amp: 30, phase: 1.2 },
      { ref: barRef3, base: 70, amp: 20, phase: 2.4 },
      { ref: barRef4, base: 55, amp: 28, phase: 0.8 },
    ];
    let t = 0;
    let raf: number;
    function tick() {
      t += 0.012;
      bars.forEach(({ ref, base, amp, phase }) => {
        if (!ref.current) return;
        const h = base + Math.sin(t + phase) * amp;
        ref.current.setAttribute('height', String(Math.max(4, h)));
        ref.current.setAttribute('y', String(130 - Math.max(4, h)));
      });
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg viewBox="0 0 760 340" className="w-full h-full" style={{ display: 'block' }}>
      <defs>
        <filter id="db-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <style>{`
          @keyframes db-pulse { 0%,100%{opacity:.3} 50%{opacity:1} }
          @keyframes db-scan  { 0%{transform:translateX(0)} 100%{transform:translateX(360px)} }
          .db-live { animation: db-pulse 1s ease-in-out infinite; }
          .db-scan { animation: db-scan 3s linear infinite; }
        `}</style>
        {/* gradient fills under chart lines */}
        <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={TEAL} stopOpacity="0.25" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lg3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
        </linearGradient>
        <pattern id="db-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="#0E1620" />
        </pattern>
      </defs>

      {/* bg */}
      <rect width="760" height="340" fill={BG} />
      <rect width="760" height="340" fill="url(#db-grid)" opacity="0.9" />

      {/* ambient glows */}
      <ellipse cx="380" cy="170" rx="300" ry="140" fill={TEAL} opacity="0.025" />

      {/* ── HEADER BAR ── */}
      <rect x="20" y="18" width="720" height="36" rx="6" fill={FACE1} stroke={EDGE2} strokeWidth="0.8" />
      {/* live dot */}
      <circle cx="38" cy="36" r="5" fill={TEAL} className="db-live" filter="url(#db-glow)" />
      <text x="50" y="40" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill={TEAL} letterSpacing="2">LIVE DASHBOARD</text>
      {/* time stamp */}
      <text x="680" y="40" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill={EDGE2} textAnchor="end">SYSTEM ONLINE</text>

      {/* ── KPI TILES ── */}
      {[
        { x: 20,  label: 'UPTIME',    val: '99.98%', color: TEAL },
        { x: 200, label: 'API CALLS', val: '1.2M/hr', color: '#3B82F6' },
        { x: 380, label: 'LATENCY',   val: '18 ms',  color: '#A78BFA' },
        { x: 560, label: 'ERRORS',    val: '0.02%',  color: '#34D399' },
      ].map(({ x, label, val, color }) => (
        <g key={label}>
          <rect x={x} y="62" width="162" height="46" rx="5" fill={FACE2} stroke={EDGE} strokeWidth="0.8" />
          <text x={x + 12} y="80" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={EDGE2} letterSpacing="1">{label}</text>
          <text x={x + 12} y="97" fontFamily="'JetBrains Mono',monospace" fontSize="14" fontWeight="bold" fill={color} filter="url(#db-glow)">{val}</text>
        </g>
      ))}

      {/* ── MAIN CHART AREA ── */}
      <rect x="20" y="116" width="460" height="130" rx="5" fill={FACE1} stroke={EDGE} strokeWidth="0.8" />
      <text x="32" y="132" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={TEAL2} letterSpacing="1">PERFORMANCE METRICS</text>

      {/* grid lines */}
      {[135, 160, 185, 210, 235].map(y => (
        <line key={y} x1="30" y1={y} x2="470" y2={y} stroke={EDGE} strokeWidth="0.5" strokeDasharray="3 5" />
      ))}

      {/* clip area chart fills */}
      <clipPath id="chart-clip"><rect x="30" y="135" width="430" height="100" /></clipPath>

      {/* animated chart lines */}
      <g clipPath="url(#chart-clip)" transform="translate(30,135)">
        <AnimLine points={line1} color={TEAL}      amplitude={22} period={80}  delay={0}   />
        <AnimLine points={line2} color="#3B82F6"   amplitude={18} period={100} delay={1.5} />
        <AnimLine points={line3} color="#A78BFA"   amplitude={14} period={120} delay={3}   />
      </g>

      {/* scan line */}
      <g clipPath="url(#chart-clip)">
        <rect x="30" y="135" width="2" height="100" fill={TEAL} opacity="0.08" className="db-scan" />
      </g>

      {/* legend */}
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8">
        <circle cx="34"  cy="253" r="3" fill={TEAL}    />  <text x="40"  y="256" fill={TEAL}    opacity="0.8">CPU</text>
        <circle cx="80"  cy="253" r="3" fill="#3B82F6" />  <text x="86"  y="256" fill="#3B82F6" opacity="0.8">MEM</text>
        <circle cx="126" cy="253" r="3" fill="#A78BFA" />  <text x="132" y="256" fill="#A78BFA" opacity="0.8">NET</text>
      </g>

      {/* ── BAR CHART (right panel) ── */}
      <rect x="492" y="116" width="248" height="130" rx="5" fill={FACE1} stroke={EDGE} strokeWidth="0.8" />
      <text x="504" y="132" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={TEAL2} letterSpacing="1">THROUGHPUT</text>

      {/* bar grid */}
      {[140, 165, 190, 215, 240].map(y => (
        <line key={y} x1="504" y1={y} x2="732" y2={y} stroke={EDGE} strokeWidth="0.5" strokeDasharray="3 5" />
      ))}

      {/* animated bars */}
      {[
        { ref: barRef1, x: 516, color: TEAL,      label: 'Q1' },
        { ref: barRef2, x: 568, color: '#3B82F6',  label: 'Q2' },
        { ref: barRef3, x: 620, color: '#A78BFA',  label: 'Q3' },
        { ref: barRef4, x: 672, color: '#34D399',  label: 'Q4' },
      ].map(({ ref, x, color, label }) => (
        <g key={label}>
          <rect ref={ref} x={x} y={80} width="34" height={60} rx="3" fill={color} opacity="0.75" filter="url(#db-glow)" />
          <text x={x + 17} y="252" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={EDGE2}>{label}</text>
        </g>
      ))}

      {/* ── EVENT LOG ── */}
      <rect x="20" y="264" width="720" height="60" rx="5" fill={FACE1} stroke={EDGE} strokeWidth="0.8" />
      <text x="32" y="280" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill={TEAL2} letterSpacing="1">EVENT LOG</text>
      {[
        { t: '00:00:01', msg: 'Build #482 deployed to production',       color: TEAL    },
        { t: '00:00:04', msg: 'Health checks passed — all 3 replicas OK', color: '#34D399' },
        { t: '00:00:09', msg: 'CDN cache invalidated — assets propagated', color: TEAL2   },
      ].map(({ t, msg, color }, i) => (
        <g key={i} transform={`translate(0,${i * 14})`}>
          <text x="32"  y="292" fontFamily="'JetBrains Mono',monospace" fontSize="7.5" fill={EDGE2}>{t}</text>
          <text x="96"  y="292" fontFamily="'JetBrains Mono',monospace" fontSize="7.5" fill={color} opacity="0.85">{msg}</text>
        </g>
      ))}
    </svg>
  );
}

/* ─── MAIN EXPORT ────────────────────────────────────────────── */
export function DevPipelineAnimation() {
  const [phase, setPhase] = useState<'pipeline' | 'dashboard'>('pipeline');

  /* cycle: pipeline for 7 s → dashboard for 7 s → loop */
  useEffect(() => {
    const id = setInterval(() => {
      setPhase(p => (p === 'pipeline' ? 'dashboard' : 'pipeline'));
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ background: BG, borderRadius: '0 0 12px 12px', aspectRatio: '760 / 340' }}
    >
      {/* Pipeline view */}
      <div
        style={{
          position: 'absolute', inset: 0,
          opacity: phase === 'pipeline' ? 1 : 0,
          transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: phase === 'pipeline' ? 'auto' : 'none',
        }}
      >
        <PipelineSVG />
      </div>

      {/* Dashboard view */}
      <div
        style={{
          position: 'absolute', inset: 0,
          opacity: phase === 'dashboard' ? 1 : 0,
          transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: phase === 'dashboard' ? 'auto' : 'none',
        }}
      >
        <DashboardSVG />
      </div>

      {/* Phase indicator pills */}
      <div
        style={{
          position: 'absolute', bottom: 10, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: 6, zIndex: 10,
        }}
      >
        {(['pipeline', 'dashboard'] as const).map(p => (
          <span
            key={p}
            style={{
              width: phase === p ? 20 : 6,
              height: 4,
              borderRadius: 2,
              background: phase === p ? TEAL : EDGE2,
              transition: 'width 0.4s ease, background 0.4s ease',
              display: 'inline-block',
            }}
          />
        ))}
      </div>
    </div>
  );
}
