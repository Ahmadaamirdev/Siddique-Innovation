import React, { memo, useEffect, useRef, useState } from "react";

/* ───────────────────────── data & geometry ───────────────────────── */
interface MonthData {
  m: string;
  v: number;
  imp: number;
}

const DATA: MonthData[] = [
  { m: "Jan", v: 1.8, imp: 20 },
  { m: "Feb", v: 3.1, imp: 33 },
  { m: "Mar", v: 4.9, imp: 52 },
  { m: "Apr", v: 6.8, imp: 79 },
  { m: "May", v: 9.4, imp: 113 },
  { m: "Jun", v: 12.4, imp: 148 },
];

// viewBox 900x520. The plot sits on a "glass floor" that fans out toward the viewer.
const W = 900;
const H = 520;
const PX = 70;
const PT = 70;
const PB = 130;
const MAXV = 14;
const BASE = H - PB; // where the wall meets the floor: 390
const FE = H - 34; // near edge of the floor: 486
const CX = W / 2;
const FL = 1.14; // floor widens by 14% at the near edge

const PTS = DATA.map((d, i) => ({
  x: PX + (i * (W - 2 * PX)) / (DATA.length - 1),
  y: PT + (1 - d.v / MAXV) * (H - PT - PB),
}));

const nearX = (x: number) => CX + (x - CX) * FL;

function smooth(p: { x: number; y: number }[]) {
  let d = `M${p[0].x},${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

const LINE = smooth(PTS);
const AREA = `${LINE} L${PTS[PTS.length - 1].x},${BASE} L${PTS[0].x},${BASE} Z`;
const WALL_GRID = [4, 8, 12].map((v) => PT + (1 - v / MAXV) * (H - PT - PB));

// floor: rows get closer together toward the horizon, columns fan out
const FLOOR_ROWS = [0, 0.08, 0.2, 0.38, 0.62, 1].map((t) => {
  const s = 1 + (FL - 1) * t;
  return {
    y: BASE + (FE - BASE) * t,
    x1: CX + (PX - CX) * s,
    x2: CX + (W - PX - CX) * s,
  };
});

// glass skyline: one bar per month for impressions (always shorter than the clicks ribbon)
const BW = 16;
const BDX = 10;
const BDY = -8;
const BAR_MAX = 250;
const BARS = DATA.map((d, i) => {
  const h = (d.imp / 148) * BAR_MAX;
  return { x: PTS[i].x, h, top: BASE - h };
});

// extrusion layers give the ribbon real thickness (back layers darker)
const DEPTH = Array.from({ length: 9 }, (_, k) => {
  const n = 9 - k; // draw furthest first
  const t = n / 9;
  const shade = (a: number, b: number) => Math.round(a + (b - a) * t);
  return {
    dx: n * 0.75,
    dy: n * 1.35,
    c: `rgb(${shade(25, 3)},${shade(120, 38)},${shade(104, 34)})`,
  };
});

/* ───────────────────────── hooks ───────────────────────── */
const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useCountUp(
  to: number,
  options: { from?: number; duration?: number; delay?: number; decimals?: number; run: boolean }
) {
  const { from = 0, duration = 1800, delay = 0, decimals = 0, run } = options;
  const [v, setV] = useState(from);

  useEffect(() => {
    if (!run) return;
    if (reduced()) {
      setV(to);
      return;
    }
    let raf: number;
    let t0: number | null = null;
    const t = setTimeout(() => {
      const tick = (now: number) => {
        t0 = t0 ?? now;
        const p = Math.min((now - t0) / duration, 1);
        const e = 1 - Math.pow(1 - p, 4);
        setV(from + (to - from) * e);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [run, to, from, duration, delay]);

  return Number(v.toFixed(decimals));
}

/* ───────────────────────── stat blocks (no cards) ───────────────────────── */
interface DeltaProps {
  to: number;
  prefix?: string;
  suffix?: string;
  run: boolean;
  delay: number;
}

function Delta({ to, prefix = "+", suffix = "", run, delay }: DeltaProps) {
  const n = useCountUp(to, { run, delay, duration: 1400 });
  return (
    <span className="op-delta">
      <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
        <path
          d="M6 10V2M6 2L2.5 5.5M6 2l3.5 3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {prefix}
      {Math.round(n)}
      {suffix}
    </span>
  );
}

interface StatProps {
  pos: "top" | "bottom";
  align: "left" | "right";
  label: string;
  children: React.ReactNode;
  delta?: React.ReactNode;
  step: number;
}

function Stat({ pos, align, label, children, delta, step }: StatProps) {
  return (
    <div
      className={`op-stat op-${pos} op-${align} ${pos} ${align}`}
      style={{ "--step": step } as React.CSSProperties}
    >
      <div className="op-label">{label}</div>
      <div className="op-mask">
        <div className="op-rise">{children}</div>
      </div>
      {delta}
    </div>
  );
}

function Ruler({ run }: { run: boolean }) {
  const pos = useCountUp(1, { from: 50, run, delay: 900, duration: 2200 });
  const pct = ((pos - 1) / 49) * 100;
  return (
    <div className="op-ruler" aria-hidden="true">
      <div className="op-marker" style={{ left: `${pct}%` }} />
      <div className="op-ticks">
        {Array.from({ length: 50 }, (_, i) => (
          <i
            key={i}
            className={(i + 1) % 25 === 0 || i === 0 ? "maj" : (i + 1) % 5 === 0 ? "mid" : ""}
          />
        ))}
      </div>
      <div className="op-scale">
        <span>1</span>
        <span>25</span>
        <span>50</span>
      </div>
    </div>
  );
}

/* ───────────────────────── 3D chart (memoised: counters never re-render it) ───────────────────────── */
const Chart3D = memo(function Chart3D({ go: _go }: { go: boolean }) {
  const [active, setActive] = useState(DATA.length - 1);
  const tilt = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const pt = "touches" in e ? e.touches[0] : e;
    if (!pt) return;
    const px = (pt.clientX - r.left) / r.width;
    const py = (pt.clientY - r.top) / r.height;

    // nearest month
    const x = px * W;
    let best = 0;
    let bd = 1e9;
    PTS.forEach((p, i) => {
      const d = Math.abs(p.x - x);
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    setActive(best);

    // gentle parallax tilt (no React state → no re-render)
    if (tilt.current && !reduced()) {
      tilt.current.style.setProperty("--ry", `${-7 + (px - 0.5) * 12}deg`);
      tilt.current.style.setProperty("--rx", `${12 - (py - 0.5) * 8}deg`);
    }
  };

  const onLeave = () => {
    setActive(DATA.length - 1);
    if (tilt.current) {
      tilt.current.style.setProperty("--ry", "-7deg");
      tilt.current.style.setProperty("--rx", "12deg");
    }
  };

  const a = PTS[active];

  return (
    <div
      className="op-chart"
      onMouseMove={onMove}
      onTouchMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="op-aura" />
      <div className="op-tilt" ref={tilt}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Organic clicks rising from 1.8k in January to 12.4k in June"
        >
          <defs>
            <linearGradient id="opStroke" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#0b5f54" />
              <stop offset="0.55" stopColor="#19c9aa" />
              <stop offset="1" stopColor="#7be8d3" />
            </linearGradient>
            <linearGradient id="opFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#19c9aa" stopOpacity="0.30" />
              <stop offset="0.75" stopColor="#19c9aa" stopOpacity="0.04" />
              <stop offset="1" stopColor="#19c9aa" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="opBarFront" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#5fd9c3" stopOpacity="0.24" />
              <stop offset="1" stopColor="#19c9aa" stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="opBeam" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#5fd9c3" stopOpacity="0.7" />
              <stop offset="1" stopColor="#19c9aa" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="opWallGrid"
              gradientUnits="userSpaceOnUse"
              x1={PX - 60}
              x2={W - PX + 60}
              y1="0"
              y2="0"
            >
              <stop offset="0" stopColor="#5fd9c3" stopOpacity="0" />
              <stop offset="0.14" stopColor="#5fd9c3" stopOpacity="0.2" />
              <stop offset="0.86" stopColor="#5fd9c3" stopOpacity="0.2" />
              <stop offset="1" stopColor="#5fd9c3" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="opFloorStroke"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={BASE}
              y2={FE}
            >
              <stop offset="0" stopColor="#5fd9c3" stopOpacity="0.5" />
              <stop offset="1" stopColor="#5fd9c3" stopOpacity="0.07" />
            </linearGradient>
            <linearGradient id="opSideFade" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#000" />
              <stop offset="0.12" stopColor="#fff" />
              <stop offset="0.88" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </linearGradient>
            <linearGradient
              id="opTopFade"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={PT}
              y2={BASE}
            >
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </linearGradient>
            <pattern id="opStreak" width="12" height="10" patternUnits="userSpaceOnUse">
              <rect width="1" height="10" fill="#5fd9c3" opacity="0.5" />
            </pattern>

            <filter id="opGlow" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
            <filter id="opSoft" x="-20%" y="-60%" width="140%" height="220%">
              <feGaussianBlur stdDeviation="5" />
            </filter>

            <mask id="opReveal">
              <rect className="op-wipe" x="0" y="0" width={W} height={H} fill="#fff" />
            </mask>
            <mask id="opCurtainFade">
              <rect x="0" y={PT - 30} width={W} height={BASE - PT + 30} fill="url(#opTopFade)" />
            </mask>
            <mask
              id="opFloorMask"
              maskUnits="userSpaceOnUse"
              x="-80"
              y="0"
              width={W + 160}
              height={H}
            >
              <rect x="0" y="0" width={W} height={H} fill="url(#opSideFade)" />
            </mask>
          </defs>

          {/* glass floor: fanning columns + receding rows */}
          <g className="op-floor" mask="url(#opFloorMask)">
            {FLOOR_ROWS.map((r, i) => (
              <line key={i} x1={r.x1} x2={r.x2} y1={r.y} y2={r.y} stroke="url(#opFloorStroke)" />
            ))}
            {PTS.map((p, i) => (
              <line
                key={i}
                x1={p.x}
                x2={nearX(p.x)}
                y1={BASE}
                y2={FE}
                stroke="url(#opFloorStroke)"
              />
            ))}
          </g>

          {/* line mirrored on the floor */}
          <g
            className="op-refl"
            mask="url(#opFloorMask)"
            transform={`translate(0 ${BASE}) scale(1 -0.2) translate(0 ${-BASE})`}
          >
            <path d={LINE} fill="none" stroke="#19c9aa" strokeWidth="9" filter="url(#opSoft)" />
            {BARS.map((b, i) => (
              <rect
                key={i}
                x={b.x - BW}
                y={b.top}
                width={BW * 2}
                height={b.h}
                fill="#19c9aa"
                fillOpacity="0.35"
              />
            ))}
          </g>

          {/* back wall grid */}
          {WALL_GRID.map((y, i) => (
            <line
              key={y}
              className="op-wall"
              style={{ "--i": i } as React.CSSProperties}
              x1={PX - 60}
              x2={W - PX + 60}
              y1={y}
              y2={y}
            />
          ))}
          <line
            className="op-horizon"
            x1={PX - 60}
            x2={W - PX + 60}
            y1={BASE}
            y2={BASE}
          />

          {/* glass skyline: impressions */}
          {BARS.map((b, i) => (
            <g
              key={i}
              className={`op-bar ${i === active ? "on" : ""}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <path
                className="s"
                d={`M${b.x + BW},${b.top} L${b.x + BW + BDX},${b.top + BDY} L${b.x + BW + BDX},${BASE + BDY} L${b.x + BW},${BASE} Z`}
              />
              <rect className="f" x={b.x - BW} y={b.top} width={BW * 2} height={b.h} />
              <path
                className="t"
                d={`M${b.x - BW},${b.top} L${b.x + BW},${b.top} L${b.x + BW + BDX},${b.top + BDY} L${b.x - BW + BDX},${b.top + BDY} Z`}
              />
            </g>
          ))}

          {/* light curtain under the line */}
          <g mask="url(#opCurtainFade)">
            <g mask="url(#opReveal)">
              <path d={AREA} fill="url(#opFill)" />
              <path d={AREA} fill="url(#opStreak)" className="op-streaks" />
            </g>
          </g>

          {/* beams dropping from every month to the floor */}
          {PTS.map((p, i) => (
            <rect
              key={i}
              className="op-beam"
              style={{ "--i": i } as React.CSSProperties}
              x={p.x - 0.75}
              y={p.y}
              width="1.5"
              height={BASE - p.y}
              fill="url(#opBeam)"
            />
          ))}

          {/* ribbon: extrusion → glow → front face → travelling light */}
          {DEPTH.map((d, i) => (
            <path
              key={i}
              className="op-line op-depth"
              d={LINE}
              pathLength="1"
              stroke={d.c}
              transform={`translate(${d.dx} ${d.dy})`}
            />
          ))}
          <path className="op-line op-glow" d={LINE} pathLength="1" filter="url(#opGlow)" />
          <path className="op-line op-main" d={LINE} pathLength="1" />
          <path className="op-flow" d={LINE} pathLength="1" />

          {/* month nodes */}
          {PTS.map((p, i) => (
            <circle
              key={i}
              className={`op-node ${i === active ? "on" : ""}`}
              style={{ "--i": i } as React.CSSProperties}
              cx={p.x}
              cy={p.y}
              r="4"
            />
          ))}

          {/* scrubber: beam to the floor + ring on the glass */}
          <g className="op-scrub" style={{ transform: `translate(${a.x}px,0)` }}>
            <rect x="-1" y={PT - 24} width="2" height={BASE - PT + 24} fill="url(#opBeam)" />
            <ellipse className="op-pool" cx="0" cy={BASE} rx="30" ry="7" />
            <ellipse className="op-pool p2" cx="0" cy={BASE} rx="30" ry="7" />
          </g>
          <g className="op-dot" style={{ transform: `translate(${a.x}px,${a.y}px)` }}>
            <circle className="ring r1" r="8" />
            <circle className="ring r2" r="8" />
            <circle r="7" fill="#19c9aa" />
            <circle r="2.6" fill="#070f0e" />
          </g>
        </svg>

        <div
          className="op-tip"
          style={{ left: `${(a.x / W) * 100}%`, top: `${(a.y / H) * 100}%` }}
        >
          {DATA[active].m} <b>{DATA[active].v.toFixed(1)}k</b> clicks · {DATA[active].imp}k impr.
        </div>

        {DATA.map((d, i) => (
          <span
            key={d.m}
            className={`op-month ${i === active ? "on" : ""}`}
            style={
              {
                left: `${(nearX(PTS[i].x) / W) * 100}%`,
                top: `${((FE + 18) / H) * 100}%`,
                "--i": i,
              } as React.CSSProperties
            }
          >
            {d.m}
          </span>
        ))}
      </div>
    </div>
  );
});

/* ───────────────────────── main ───────────────────────── */
export interface OrganicPerformanceProps {
  heading?: React.ReactNode;
  description?: string;
}

export function OrganicPerformance({ heading, description }: OrganicPerformanceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setGo(true), io.disconnect()),
      { threshold: 0.15 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const clicks = useCountUp(12.4, { run: go, decimals: 1, delay: 500 });
  const impr = useCountUp(148, { run: go, delay: 700 });
  const kw = useCountUp(64, { run: go, delay: 900 });
  const avgPos = useCountUp(1, { from: 50, run: go, delay: 900, duration: 2200 });

  return (
    <section ref={ref} className={`op ${go ? "go" : ""}`} aria-label="Organic performance">
      <style>{CSS}</style>

      {/* ── 1 & 2. Centered Heading Block (Compact Previous Heading & Description) ── */}
      <div className="op-heading-block">
        {heading || (
          <h1 className="text-xl sm:text-2xl md:text-[25px] lg:text-[27px] font-extrabold text-white tracking-tight leading-[1.15] font-heading drop-shadow-md text-center max-w-2xl mx-auto">
            <span className="block">Get Found on Google &amp;</span>
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_20px_rgba(0,255,229,0.3)]"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              AI Search Engines
            </span>
          </h1>
        )}
        <p className="text-gray-300 text-xs sm:text-[13px] md:text-sm font-normal leading-normal font-sans max-w-xl mx-auto mt-1 mb-1 text-center">
          {description ||
            "We improve your visibility across traditional search engines and AI-powered search through thoughtful SEO, AEO, and content strategies. Our approach focuses on building relevant, trustworthy visibility that helps your business get discovered by the right audience."}
        </p>
      </div>

      {/* ── 3. Small Header Row ── */}
      <header className="op-head">
        <span className="op-title">
          <i className="op-live" />
          Organic performance
        </span>
        <span className="op-range">Last 6 months</span>
      </header>

      {/* ── 4. Stage: 3D Chart in Center, 4 Stats in the Corners ── */}
      <div className="op-stage">
        {/* TOP-LEFT: Clicks */}
        <Stat
          pos="top"
          align="left"
          label="Clicks"
          step={0}
          delta={<Delta to={38} suffix="%" run={go} delay={900} />}
        >
          <span className="op-num">
            {clicks.toFixed(1)}
            <small>k</small>
          </span>
        </Stat>

        {/* TOP-RIGHT: Avg. position */}
        <Stat pos="top" align="right" label="Avg. position" step={1}>
          <span className="op-num">{String(Math.round(avgPos)).padStart(2, "0")}</span>
          <Ruler run={go} />
          <div className="flex flex-col items-center w-full mt-1.5 opacity-90">
            <span
              className="text-[12px] sm:text-[13px] text-[var(--ink)] font-serif leading-none"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Siddiqui Innovations
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-[var(--teal)] tracking-wider mt-0.5">
              Page one
            </span>
          </div>
        </Stat>

        {/* BOTTOM-LEFT: Impressions */}
        <Stat
          pos="bottom"
          align="left"
          label="Impressions"
          step={2}
          delta={<Delta to={52} suffix="%" run={go} delay={1100} />}
        >
          <span className="op-num">
            {impr}
            <small>k</small>
          </span>
        </Stat>

        {/* BOTTOM-RIGHT: Keywords on page 1 */}
        <Stat
          pos="bottom"
          align="right"
          label="Keywords on page 1"
          step={3}
          delta={<Delta to={27} run={go} delay={1300} />}
        >
          <span className="op-num">{kw}</span>
        </Stat>

        {/* CENTER: 3D Chart with Skyline & Glass Floor */}
        <div className="op-center">
          <div className="op-source">Organic traffic · Google Search Console</div>
          <div className="op-key">
            <span>
              <i className="k-line" />
              Clicks
            </span>
            <span>
              <i className="k-bar" />
              Impressions
            </span>
          </div>
          <Chart3D go={go} />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── styles ───────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=JetBrains+Mono:wght@400;500&display=swap');

.op {
  --teal: #19c9aa;
  --teal-soft: #5fd9c3;
  --ink: #e6f2ef;
  --mute: #6b8480;
  position: relative;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 16px 8px;
  color: var(--ink);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  isolation: isolate;
}

.op-heading-block {
  text-align: center;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.op-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11.5px;
  letter-spacing: .04em;
  color: #a9bfbb;
  margin-bottom: 6px;
}
.op-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}
.op-live {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--teal);
  box-shadow: 0 0 0 0 rgba(25, 201, 170, .6);
  animation: op-live 2.2s infinite;
}
.op-range {
  color: var(--mute);
}
@keyframes op-live {
  70% { box-shadow: 0 0 0 8px rgba(25, 201, 170, 0); }
  100% { box-shadow: 0 0 0 0 rgba(25, 201, 170, 0); }
}

/* stage: chart in the middle, one stat in each corner */
.op-stage {
  position: relative;
  min-height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.op-center {
  width: 60%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.op-stat {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 2;
}
.op-stat.top, .op-stat.op-top { top: 0; }
.op-stat.bottom, .op-stat.op-bottom { bottom: 0; }
.op-stat.left, .op-stat.op-left { left: 0; align-items: flex-start; text-align: left; }
.op-stat.right, .op-stat.op-right { right: 0; align-items: flex-end; text-align: right; }

.op-label {
  font-size: 11.5px;
  color: var(--mute);
  letter-spacing: .03em;
}
.op-mask {
  overflow: hidden;
  padding-bottom: 2px;
}
.op-num {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(34px, 4vw, 50px);
  line-height: 1;
  color: var(--teal);
  text-shadow: 0 0 24px rgba(25, 201, 170, .18);
  font-variant-numeric: tabular-nums;
  display: inline-block;
}
.op-num small {
  font-size: .5em;
  margin-left: 2px;
  color: var(--teal-soft);
  opacity: .8;
}
.op-delta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  color: var(--teal-soft);
  margin-top: 1px;
}

.op-label, .op-delta {
  opacity: 0;
  transform: translateY(8px);
}
.op-rise {
  transform: translateY(105%);
}
.go .op-label, .go .op-delta {
  animation: op-in .7s cubic-bezier(.2, .8, .2, 1) forwards;
  animation-delay: calc(var(--step) * .14s + .15s);
}
.go .op-delta {
  animation-delay: calc(var(--step) * .14s + 1.2s);
}
.go .op-rise {
  animation: op-rise .95s cubic-bezier(.16, 1, .3, 1) forwards;
  animation-delay: calc(var(--step) * .14s + .25s);
}
@keyframes op-in {
  to { opacity: 1; transform: none; }
}
@keyframes op-fade {
  to { opacity: 1; }
}
@keyframes op-rise {
  to { transform: none; }
}

/* ruler */
.op-ruler {
  width: 140px;
  margin-top: 8px;
  position: relative;
}
.op-ticks {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 12px;
}
.op-ticks i {
  width: 1px;
  height: 5px;
  background: rgba(95, 217, 195, .28);
}
.op-ticks i.mid {
  height: 8px;
  background: rgba(95, 217, 195, .5);
}
.op-ticks i.maj {
  height: 12px;
  background: var(--teal);
}
.op-scale {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--mute);
  margin-top: 4px;
  font-family: 'JetBrains Mono', monospace;
}
.op-marker {
  position: absolute;
  top: -8px;
  width: 0;
  height: 0;
  margin-left: -4px;
  border: 4px solid transparent;
  border-bottom: 6px solid var(--teal);
  border-top: 0;
  filter: drop-shadow(0 0 5px var(--teal));
  transition: left .25s ease-out;
}

/* chart shell + 3D tilt */
.op-source {
  font-size: 11px;
  color: var(--mute);
  letter-spacing: .03em;
  margin-bottom: 4px;
  opacity: 0;
}
.go .op-source {
  animation: op-fade .8s .3s forwards;
}
.op-chart {
  position: relative;
  width: 100%;
  aspect-ratio: ${W} / ${H};
  cursor: crosshair;
  touch-action: pan-y;
  perspective: 1400px;
}
.op-tilt {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform: rotateX(var(--rx, 12deg)) rotateY(var(--ry, -7deg));
  transition: transform .3s ease-out;
  will-change: transform;
}
.op-tilt svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.op-aura {
  position: absolute;
  inset: 10% 4% 12%;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(25, 201, 170, .07), transparent);
  filter: blur(30px);
  animation: op-breathe 6s ease-in-out infinite;
}
@keyframes op-breathe {
  50% { transform: scale(1.08); opacity: .7; }
}

/* glass skyline */
.op-bar {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  transform: scaleY(0);
}
.go .op-bar {
  animation: op-grow .9s cubic-bezier(.2, .8, .2, 1) forwards;
  animation-delay: calc(var(--i) * .15s + .3s);
}
@keyframes op-grow {
  to { transform: scaleY(1); }
}
.op-bar .f {
  fill: url(#opBarFront);
  stroke: rgba(95, 217, 195, .4);
  stroke-width: 1;
  transition: fill .3s;
}
.op-bar .t {
  fill: rgba(95, 217, 195, .5);
  stroke: rgba(95, 217, 195, .55);
  stroke-width: 1;
  transition: fill .3s;
}
.op-bar .s {
  fill: rgba(25, 201, 170, .1);
  stroke: rgba(95, 217, 195, .25);
  stroke-width: 1;
}
.op-bar.on .f {
  fill: rgba(25, 201, 170, .3);
}
.op-bar.on .t {
  fill: rgba(143, 245, 225, .85);
}

.op-key {
  display: flex;
  gap: 16px;
  font-size: 11px;
  color: var(--mute);
  margin-bottom: 4px;
  opacity: 0;
}
.go .op-key {
  animation: op-fade .8s .5s forwards;
}
.op-key span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.op-key i {
  display: inline-block;
}
.k-line {
  width: 14px;
  height: 3px;
  border-radius: 2px;
  background: var(--teal);
}
.k-bar {
  width: 9px;
  height: 9px;
  border: 1px solid rgba(95, 217, 195, .6);
  background: rgba(25, 201, 170, .18);
}

/* floor, wall, reflection */
.op-floor, .op-refl {
  opacity: 0;
}
.go .op-floor {
  animation: op-fade 1.2s .2s forwards;
}
.go .op-refl {
  animation: op-refl 1.2s 2s forwards;
}
@keyframes op-refl {
  to { opacity: .38; }
}
.op-wall {
  stroke: url(#opWallGrid);
  stroke-dasharray: 3 7;
  opacity: 0;
}
.op-horizon {
  stroke: url(#opWallGrid);
  opacity: 0;
}
.go .op-wall {
  animation: op-fade .9s forwards;
  animation-delay: calc(var(--i) * .15s + .3s);
}
.go .op-horizon {
  animation: op-fade .9s .2s forwards;
}

/* curtain + beams */
.op-streaks {
  opacity: .55;
}
.op-wipe {
  transform-box: fill-box;
  transform-origin: left;
  transform: scaleX(0);
}
.go .op-wipe {
  animation: op-wipe 2.2s cubic-bezier(.65, .05, .25, 1) .35s forwards;
}
@keyframes op-wipe {
  to { transform: scaleX(1); }
}
.op-beam {
  transform-box: fill-box;
  transform-origin: bottom;
  transform: scaleY(0);
  opacity: .7;
}
.go .op-beam {
  animation: op-beam .9s cubic-bezier(.2, .8, .2, 1) forwards;
  animation-delay: calc(var(--i) * .4s + .7s);
}
@keyframes op-beam {
  to { transform: scaleY(1); }
}

/* ribbon */
.op-line {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
.op-main {
  stroke: url(#opStroke);
  stroke-width: 4.5;
}
.op-depth {
  stroke-width: 4.5;
}
.op-glow {
  stroke: #19c9aa;
  stroke-width: 9;
  opacity: .3;
}
.go .op-line {
  animation: op-draw 2.2s cubic-bezier(.65, .05, .25, 1) .35s forwards;
}
@keyframes op-draw {
  to { stroke-dashoffset: 0; }
}

.op-flow {
  fill: none;
  stroke: #a8efe2;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: .07 1;
  stroke-dashoffset: .07;
  opacity: 0;
}
.go .op-flow {
  animation: op-flow 3.6s linear 2.7s infinite;
}
@keyframes op-flow {
  0% { stroke-dashoffset: .07; opacity: 0; }
  8% { opacity: .95; }
  88% { opacity: .95; }
  100% { stroke-dashoffset: -1; opacity: 0; }
}

.op-node {
  fill: #06110f;
  stroke: rgba(95, 217, 195, .5);
  stroke-width: 2;
  opacity: 0;
  transition: r .25s, stroke .25s;
}
.go .op-node {
  animation: op-fade .5s forwards;
  animation-delay: calc(var(--i) * .34s + .6s);
}
.op-node.on {
  stroke: transparent;
}

/* scrubber */
.op-scrub, .op-dot {
  transition: transform .45s cubic-bezier(.2, .8, .2, 1);
  opacity: 0;
}
.go .op-scrub, .go .op-dot {
  animation: op-fade .6s 2.5s forwards;
}
.op-pool {
  fill: rgba(25, 201, 170, .12);
  stroke: var(--teal);
  stroke-width: 1.2;
  transform-box: fill-box;
  transform-origin: center;
  animation: op-pool 2.4s ease-out infinite;
}
.op-pool.p2 {
  animation-delay: 1.2s;
}
@keyframes op-pool {
  0% { transform: scale(.4); opacity: .9; }
  100% { transform: scale(1.5); opacity: 0; }
}
.ring {
  fill: none;
  stroke: var(--teal);
  stroke-width: 1.5;
  transform-box: fill-box;
  transform-origin: center;
  animation: op-ring 2.4s ease-out infinite;
}
.ring.r2 {
  animation-delay: 1.2s;
}
@keyframes op-ring {
  0% { transform: scale(1); opacity: .8; }
  100% { transform: scale(3.4); opacity: 0; }
}

.op-tip {
  position: absolute;
  transform: translate3d(-50%, -190%, 40px);
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  white-space: nowrap;
  background: rgba(8, 16, 15, .85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(25, 201, 170, .3);
  color: #c9dedb;
  transition: left .45s cubic-bezier(.2, .8, .2, 1), top .45s cubic-bezier(.2, .8, .2, 1);
  opacity: 0;
  pointer-events: none;
}
.op-tip b {
  color: var(--teal);
  font-weight: 500;
  margin-left: 4px;
}
.go .op-tip {
  animation: op-fade .6s 2.6s forwards;
}

.op-month {
  position: absolute;
  transform: translate(-50%, -50%);
  font-size: 11.5px;
  color: var(--mute);
  transition: color .3s, transform .3s;
  opacity: 0;
}
.go .op-month {
  animation: op-fade .6s forwards;
  animation-delay: calc(var(--i) * .1s + .5s);
}
.op-month.on {
  color: var(--teal);
  transform: translate(-50%, -50%) scale(1.12);
}

@media (max-width: 900px) {
  .op {
    padding: 0 14px 20px;
  }
  .op-heading-block {
    margin-bottom: 12px;
  }
  .op-stage {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
    column-gap: 16px;
    min-height: 0;
    align-items: start;
  }
  .op-center {
    width: 100%;
    grid-column: 1 / -1;
    order: -1;
    margin-bottom: 10px;
  }
  .op-stat {
    position: static;
  }
  .op-ruler {
    width: 130px;
  }
  .op-tilt {
    transform: rotateX(8deg) rotateY(0deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .op *, .op *::before {
    animation-duration: .01ms !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
  .op-key { opacity: 1; }
  .op-bar { transform: none; }
  .op-label, .op-delta, .op-source, .op-wall, .op-horizon, .op-floor, .op-node, .op-scrub, .op-dot, .op-tip, .op-month { opacity: 1; }
  .op-refl { opacity: .38; }
  .op-label, .op-delta { transform: none; }
  .op-rise { transform: none; }
  .op-line { stroke-dashoffset: 0; }
  .op-wipe { transform: none; }
  .op-beam { transform: none; }
  .op-tip { transform: translate3d(-50%, -190%, 40px); }
}
`;

export default OrganicPerformance;
