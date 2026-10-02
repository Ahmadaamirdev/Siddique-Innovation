import React, { useState, useEffect, useRef, useId, useCallback } from 'react';

/**
 * MOCK DATA
 * Hardcoded in one constant at the top of the file so it can be edited easily.
 * No external images, fonts, or network requests.
 */
const SEO_GROWTH_DATA = {
  header: {
    title: 'Organic performance',
    range: 'Last 6 months',
  },
  stats: {
    clicks: {
      label: 'Clicks',
      targetValue: 12400,
      finalFormatted: '12.4k',
      delta: '+38%',
      format: (val: number) => {
        if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
        return Math.round(val).toString();
      },
    },
    impressions: {
      label: 'Impressions',
      targetValue: 148000,
      finalFormatted: '148k',
      delta: '+52%',
      format: (val: number) => {
        if (val >= 1000) return `${Math.round(val / 1000)}k`;
        return Math.round(val).toString();
      },
    },
    keywords: {
      label: 'Keywords on page 1',
      targetValue: 64,
      finalFormatted: '64',
      delta: '+27',
      format: (val: number) => Math.round(val).toString(),
    },
  },
  trafficHistory: [
    { month: 'Jan', clicks: 1800, clicksFormatted: '1.8k', x: 30, y: 175 },
    { month: 'Feb', clicks: 3100, clicksFormatted: '3.1k', x: 115, y: 152 },
    { month: 'Mar', clicks: 5000, clicksFormatted: '5.0k', x: 200, y: 124 },
    { month: 'Apr', clicks: 7600, clicksFormatted: '7.6k', x: 285, y: 92 },
    { month: 'May', clicks: 10000, clicksFormatted: '10.0k', x: 370, y: 60 },
    { month: 'Jun', clicks: 12400, clicksFormatted: '12.4k', x: 460, y: 28 },
  ],
  rankings: {
    label: 'Avg. position',
    startRank: 47,
    endRank: 1,
    brandName: 'Siddiqui Innovations',
    rankBadge: 'Page one',
  },
};

export interface SeoGrowthPanelProps {
  loop?: boolean;
  className?: string;
}

// Cubic ease-out: 1 - (1 - t)^3
function easeOutCubic(t: number): number {
  const clamped = Math.min(Math.max(t, 0), 1);
  return 1 - Math.pow(1 - clamped, 3);
}

// Smooth cubic spline curve from points
function generateSmoothCurve(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`;

  let d = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }

  return d;
}

const CURVE_SVG_PATH = generateSmoothCurve(SEO_GROWTH_DATA.trafficHistory);
const AREA_SVG_PATH = `${CURVE_SVG_PATH} L 460,188 L 30,188 Z`;
const PATH_LENGTH = 1000;

// Digits array for ones strip (30 digits: 0-9 repeated 3 times)
const ONES_DIGITS = Array.from({ length: 30 }, (_, i) => i % 10);
// Digits array for tens strip (0-9)
const TENS_DIGITS = Array.from({ length: 10 }, (_, i) => i);

export const SeoGrowthPanel: React.FC<SeoGrowthPanelProps> = ({
  loop = true,
  className = '',
}) => {
  const gradientId = useId().replace(/:/g, '');
  const containerRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Responsive digit height: 72px on desktop, 62px on mobile
  const [digitHeight, setDigitHeight] = useState(72);

  // Reduced motion and viewport visibility
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  // Interactive line chart states
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const isHoveredRef = useRef(false);

  // Visual Animation States
  const [gridVisible, setGridVisible] = useState(false);
  const [gridFadeOut, setGridFadeOut] = useState(false);
  const [clicksVal, setClicksVal] = useState('0');
  const [impressionsVal, setImpressionsVal] = useState('0');
  const [keywordsVal, setKeywordsVal] = useState('0');
  const [showDeltaChips, setShowDeltaChips] = useState(false);

  const [lineProgress, setLineProgress] = useState(0);
  const [areaProgress, setAreaProgress] = useState(0);
  const [showEndDot, setShowEndDot] = useState(false);
  const [ringState, setRingState] = useState({ radius: 5, opacity: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const [odometerValue, setOdometerValue] = useState(47);
  const [hairlineWidth, setHairlineWidth] = useState(0);
  const [showBrand, setShowBrand] = useState(false);

  // Cancellation token for strict mode cleanup
  const tokenRef = useRef({ cancelled: false });

  // Responsive digit height adjustment
  useEffect(() => {
    const handleResize = () => {
      setDigitHeight(window.innerWidth < 640 ? 62 : 72);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  // IntersectionObserver to pause offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cancellable rAF tween helper
  const runTween = useCallback(
    (
      durationMs: number,
      onStep: (progress: number) => void,
      token: { cancelled: boolean }
    ): Promise<void> => {
      return new Promise((resolve) => {
        let startTime: number | null = null;
        let pausedElapsed = 0;
        let lastFrameTime = performance.now();

        const tick = (now: number) => {
          if (token.cancelled) {
            resolve();
            return;
          }

          if (isHoveredRef.current) {
            lastFrameTime = now;
            requestAnimationFrame(tick);
            return;
          }

          if (startTime === null) {
            startTime = now;
          }

          const delta = now - lastFrameTime;
          lastFrameTime = now;
          pausedElapsed += delta;

          const t = Math.min(pausedElapsed / durationMs, 1);
          const eased = easeOutCubic(t);
          onStep(eased);

          if (t < 1) {
            requestAnimationFrame(tick);
          } else {
            resolve();
          }
        };

        requestAnimationFrame(tick);
      });
    },
    []
  );

  // Cancellable sleep helper
  const runSleep = useCallback(
    (durationMs: number, token: { cancelled: boolean }): Promise<void> => {
      return new Promise((resolve) => {
        let elapsed = 0;
        let lastTime = performance.now();

        const check = (now: number) => {
          if (token.cancelled) {
            resolve();
            return;
          }

          if (!isHoveredRef.current) {
            elapsed += now - lastTime;
          }
          lastTime = now;

          if (elapsed >= durationMs) {
            resolve();
          } else {
            requestAnimationFrame(check);
          }
        };

        requestAnimationFrame(check);
      });
    },
    []
  );

  // Orchestrated Timeline Loop
  useEffect(() => {
    if (prefersReducedMotion) {
      setGridVisible(true);
      setGridFadeOut(false);
      setClicksVal('12.4k');
      setImpressionsVal('148k');
      setKeywordsVal('64');
      setShowDeltaChips(true);
      setLineProgress(1);
      setAreaProgress(1);
      setShowEndDot(true);
      setRingState({ radius: 5, opacity: 0 });
      setShowTooltip(true);
      setOdometerValue(1);
      setHairlineWidth(96);
      setShowBrand(true);
      return;
    }

    if (!isInViewport) return;

    const token = { cancelled: false };
    tokenRef.current = token;

    const resetSequence = () => {
      setGridFadeOut(false);
      setGridVisible(false);
      setClicksVal('0');
      setImpressionsVal('0');
      setKeywordsVal('0');
      setShowDeltaChips(false);
      setLineProgress(0);
      setAreaProgress(0);
      setShowEndDot(false);
      setRingState({ radius: 5, opacity: 0 });
      setShowTooltip(false);
      setOdometerValue(47);
      setHairlineWidth(0);
      setShowBrand(false);
    };

    const runOrchestration = async () => {
      resetSequence();
      await runSleep(40, token);
      if (token.cancelled) return;

      // 0.00-0.60s: grid entrance
      setGridVisible(true);
      await runSleep(600, token);
      if (token.cancelled) return;

      // 0.70s: start all line, counters, and odometer tweens together
      const lineAndCountersPromise = runTween(
        3000,
        (e) => {
          setLineProgress(e);
          setAreaProgress(e > 0.1 ? (e - 0.1) / 0.9 : 0);
          setClicksVal(SEO_GROWTH_DATA.stats.clicks.format(12400 * e));
          setImpressionsVal(SEO_GROWTH_DATA.stats.impressions.format(148000 * e));
          setKeywordsVal(Math.round(64 * e).toString());
        },
        token
      );

      const odometerPromise = runTween(
        3600,
        (e) => {
          const currentPos = 47 - 46 * e;
          setOdometerValue(currentPos);
        },
        token
      );

      // Line and counters finish at ~3.70s
      await lineAndCountersPromise;
      if (token.cancelled) return;

      // 3.70s: end dot, soft expanding ring pulse, guide line & tooltip, delta chips
      setShowEndDot(true);
      setShowTooltip(true);
      setShowDeltaChips(true);

      // Soft expanding ring pulse (once)
      runTween(
        1100,
        (e) => {
          setRingState({
            radius: 5 + e * 13,
            opacity: Math.max(0, (1 - e) * 0.7),
          });
        },
        token
      );

      // Wait for odometer to complete (settles on 01 at ~4.3s)
      await odometerPromise;
      if (token.cancelled) return;
      setOdometerValue(1);

      // Hold 0.3s
      await runSleep(300, token);
      if (token.cancelled) return;

      // Draw hairline out from 0 to 96px over 0.9s
      setHairlineWidth(96);
      await runSleep(600, token);
      if (token.cancelled) return;

      // Fade in brand name and "Page one" with 5px rise
      setShowBrand(true);

      // Hold final state for 3.2s
      await runSleep(3200, token);
      if (token.cancelled) return;

      // If looping, fade out grid over 0.8s, then restart seamlessly
      if (loop) {
        setGridFadeOut(true);
        await runSleep(900, token);
        if (token.cancelled) return;
        runOrchestration();
      }
    };

    runOrchestration();

    return () => {
      token.cancelled = true;
    };
  }, [isInViewport, loop, prefersReducedMotion, runSleep, runTween]);

  // Pointer snapping interactions
  const handleChartPointerMove = useCallback((clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgWidth = 500;
    const relativeX = ((clientX - rect.left) / rect.width) * svgWidth;

    let closestIdx = 0;
    let minDistance = Infinity;

    SEO_GROWTH_DATA.trafficHistory.forEach((pt, index) => {
      const distance = Math.abs(pt.x - relativeX);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = index;
      }
    });

    setHoveredPointIndex(closestIdx);
    isHoveredRef.current = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    setHoveredPointIndex(null);
    isHoveredRef.current = false;
  }, []);

  // Active / hovered point
  const activePoint =
    hoveredPointIndex !== null ? SEO_GROWTH_DATA.trafficHistory[hoveredPointIndex] : null;
  const lastPoint = SEO_GROWTH_DATA.trafficHistory[SEO_GROWTH_DATA.trafficHistory.length - 1];

  // Calculated Odometer positions
  const tensDigit = Math.min(Math.max(Math.floor(odometerValue / 10), 0), 9);
  const onesOffset = (10 + (odometerValue % 10)) * digitHeight;
  const rulerMarkerLeft = Math.max(0, Math.min(100, ((odometerValue - 1) / 49) * 100));

  return (
    <figure
      ref={containerRef}
      role="img"
      aria-label="Dashboard showing organic traffic growing over six months and the business reaching search position one"
      className={`relative w-full max-w-[1040px] mx-auto rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 bg-[#060a0c] border border-[#0f3d38] text-left select-none will-change-transform ${className}`}
      style={{
        boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
      }}
    >
      {/* Screen reader summary with final values */}
      <div className="sr-only">
        Organic performance dashboard: 12.4k clicks (+38%), 148k impressions (+52%), 64 keywords
        on page 1 (+27), position 1. Organic traffic grew steadily over 6 months from 1.8k in
        January to 12.4k in June.
      </div>

      {/* Header Row */}
      <header className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#16302d]">
        <div className="flex items-center gap-2">
          {/* 7px Teal Dot with 3s slow pulse */}
          <span className="w-[7px] h-[7px] rounded-full bg-[#14e0c4] shrink-0 animate-[pulse_3s_ease-in-out_infinite]" />
          <span className="text-xs font-mono text-[#8fb0ab] tracking-wide">
            {SEO_GROWTH_DATA.header.title}
          </span>
        </div>
        <div className="px-2.5 py-0.5 rounded-full bg-[#0c1416] border border-[#16302d] text-[11px] font-mono text-[#5b7a76]">
          {SEO_GROWTH_DATA.header.range}
        </div>
      </header>

      {/* Main Content Area */}
      <div
        className="mt-4 transition-all duration-700 ease-out"
        style={{
          opacity: gridVisible && !gridFadeOut ? 1 : 0,
          transform: gridVisible && !gridFadeOut ? 'translateY(0)' : 'translateY(10px)',
        }}
      >
        {/*
          LAYOUT:
          - Center: Organic traffic Line Chart
          - 4 Corners:
            - Top-Left: Clicks Card
            - Bottom-Left: Impressions Card
            - Top-Right: Avg. Position Counter Card (Odometer, Ruler, Brand)
            - Bottom-Right: Keywords on Page 1 Card
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_210px] gap-3 items-stretch">
          {/* ========================================================
              LEFT COLUMN:
              - Top-Left Corner: Clicks Card
              - Bottom-Left Corner: Impressions Card
             ======================================================== */}
          <div className="order-2 lg:order-1 flex flex-col justify-between gap-3">
            {/* CORNER 1: TOP-LEFT — CLICKS */}
            <div className="p-3.5 sm:p-4 rounded-[12px] bg-[#0c1416] border border-[#16302d] flex flex-col justify-between flex-1">
              <div>
                <div className="text-[11px] sm:text-xs font-mono text-[#5b7a76] truncate">
                  {SEO_GROWTH_DATA.stats.clicks.label}
                </div>
                <div
                  aria-hidden="true"
                  className="text-xl sm:text-2xl font-medium font-heading tabular-nums text-[#14e0c4] leading-tight mt-1"
                >
                  {clicksVal}
                </div>
              </div>
              <div
                className="mt-3 self-start px-[8px] py-[2px] rounded-full bg-[#0b2a27] text-[11px] font-mono text-[#14e0c4] transition-opacity duration-500 inline-flex items-center gap-1"
                style={{ opacity: showDeltaChips ? 1 : 0 }}
              >
                <span>&uarr;</span>
                <span>{SEO_GROWTH_DATA.stats.clicks.delta}</span>
              </div>
            </div>

            {/* CORNER 2: BOTTOM-LEFT — IMPRESSIONS */}
            <div className="p-3.5 sm:p-4 rounded-[12px] bg-[#0c1416] border border-[#16302d] flex flex-col justify-between flex-1">
              <div>
                <div className="text-[11px] sm:text-xs font-mono text-[#5b7a76] truncate">
                  {SEO_GROWTH_DATA.stats.impressions.label}
                </div>
                <div
                  aria-hidden="true"
                  className="text-xl sm:text-2xl font-medium font-heading tabular-nums text-[#14e0c4] leading-tight mt-1"
                >
                  {impressionsVal}
                </div>
              </div>
              <div
                className="mt-3 self-start px-[8px] py-[2px] rounded-full bg-[#0b2a27] text-[11px] font-mono text-[#14e0c4] transition-opacity duration-500 inline-flex items-center gap-1"
                style={{ opacity: showDeltaChips ? 1 : 0 }}
              >
                <span>&uarr;</span>
                <span>{SEO_GROWTH_DATA.stats.impressions.delta}</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              CENTER: The "Organic Traffic" Line Chart Card
             ======================================================== */}
          <div className="order-1 lg:order-2 p-3.5 sm:p-4 rounded-[12px] bg-[#0c1416] border border-[#16302d] relative flex flex-col justify-between overflow-hidden min-h-[260px] sm:min-h-[300px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-mono text-[#8fb0ab] font-medium">
                Organic traffic
              </span>
              <span className="text-[10px] font-mono text-[#14e0c4] bg-[#0b2a27] border border-[#16302d] px-2 py-0.5 rounded-full">
                Google Search Console
              </span>
            </div>

            {/* Responsive Line Chart SVG */}
            <div className="relative w-full aspect-[500/220] flex-1 flex items-center">
              <svg
                ref={svgRef}
                viewBox="0 0 500 220"
                className="w-full h-full overflow-visible cursor-crosshair touch-none"
                onMouseMove={(e) => handleChartPointerMove(e.clientX)}
                onMouseLeave={handlePointerLeave}
                onTouchStart={(e) => {
                  if (e.touches[0]) handleChartPointerMove(e.touches[0].clientX);
                }}
                onTouchMove={(e) => {
                  if (e.touches[0]) handleChartPointerMove(e.touches[0].clientX);
                }}
                onTouchEnd={handlePointerLeave}
              >
                <defs>
                  {/* Subtle 14% area fill gradient */}
                  <linearGradient id={`chart-grad-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14e0c4" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#14e0c4" stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* Three faint horizontal gridlines */}
                <line
                  x1="25"
                  y1="55"
                  x2="475"
                  y2="55"
                  stroke="#16302d"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <line
                  x1="25"
                  y1="100"
                  x2="475"
                  y2="100"
                  stroke="#16302d"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <line
                  x1="25"
                  y1="145"
                  x2="475"
                  y2="145"
                  stroke="#16302d"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* Baseline Axis */}
                <line x1="25" y1="188" x2="475" y2="188" stroke="#16302d" strokeWidth="1" />

                {/* Area Fill Gradient under Curve */}
                <path
                  d={AREA_SVG_PATH}
                  fill={`url(#chart-grad-${gradientId})`}
                  style={{ opacity: areaProgress }}
                />

                {/* Main 2.5px teal smooth cubic curve */}
                <path
                  d={CURVE_SVG_PATH}
                  fill="none"
                  stroke="#14e0c4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={PATH_LENGTH}
                  strokeDasharray={PATH_LENGTH}
                  strokeDashoffset={PATH_LENGTH * (1 - lineProgress)}
                />

                {/* X-Axis Month Labels */}
                {SEO_GROWTH_DATA.trafficHistory.map((item, idx) => {
                  const isHovered = hoveredPointIndex === idx;
                  return (
                    <text
                      key={item.month}
                      x={item.x}
                      y="208"
                      textAnchor="middle"
                      fontSize="11"
                      fontFamily="monospace"
                      fill={isHovered ? '#e8f3f1' : '#5b7a76'}
                      fontWeight={isHovered ? '600' : '400'}
                    >
                      {item.month}
                    </text>
                  );
                })}

                {/* End Point Dot & Soft Expanding Ring Pulse */}
                {!isHoveredRef.current && showEndDot && (
                  <g className="pointer-events-none">
                    {/* Ring Pulse */}
                    {ringState.opacity > 0 && (
                      <circle
                        cx={lastPoint.x}
                        cy={lastPoint.y}
                        r={ringState.radius}
                        fill="none"
                        stroke="#14e0c4"
                        strokeWidth="1.5"
                        strokeOpacity={ringState.opacity}
                      />
                    )}
                    {/* Center 5px dot */}
                    <circle cx={lastPoint.x} cy={lastPoint.y} r={5} fill="#14e0c4" />
                  </g>
                )}

                {/* Thin dashed vertical guide line & Tooltip pill */}
                {!isHoveredRef.current && showTooltip && (
                  <g className="pointer-events-none transition-opacity duration-500">
                    <line
                      x1={lastPoint.x}
                      y1={lastPoint.y + 6}
                      x2={lastPoint.x}
                      y2="188"
                      stroke="#14e0c4"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      strokeOpacity="0.45"
                    />
                    <g transform={`translate(${lastPoint.x - 88}, ${lastPoint.y - 14})`}>
                      <rect
                        width="84"
                        height="22"
                        rx="4"
                        fill="#0c1416"
                        stroke="#16302d"
                        strokeWidth="0.5"
                      />
                      <text
                        x="42"
                        y="15"
                        textAnchor="middle"
                        fill="#e8f3f1"
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="500"
                      >
                        Jun · 12.4k
                      </text>
                    </g>
                  </g>
                )}

                {/* Interactive Crosshair & Tooltip during Hover/Touch */}
                {activePoint && (
                  <g className="pointer-events-none">
                    <line
                      x1={activePoint.x}
                      y1="25"
                      x2={activePoint.x}
                      y2="188"
                      stroke="#14e0c4"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      strokeOpacity="0.8"
                    />
                    <circle
                      cx={activePoint.x}
                      cy={activePoint.y}
                      r={7}
                      fill="#14e0c4"
                      fillOpacity="0.2"
                    />
                    <circle cx={activePoint.x} cy={activePoint.y} r={5} fill="#14e0c4" />
                    <g
                      transform={`translate(${Math.min(
                        Math.max(activePoint.x - 48, 6),
                        400
                      )}, ${Math.max(activePoint.y - 28, 6)})`}
                    >
                      <rect
                        width="96"
                        height="22"
                        rx="4"
                        fill="#060a0c"
                        stroke="#14e0c4"
                        strokeWidth="1"
                      />
                      <text
                        x="48"
                        y="15"
                        textAnchor="middle"
                        fill="#e8f3f1"
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="600"
                      >
                        {activePoint.month} · {activePoint.clicksFormatted}
                      </text>
                    </g>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN:
              - Top-Right Corner: Avg. Position Counter Card (Odometer)
              - Bottom-Right Corner: Keywords on Page 1 Card
             ======================================================== */}
          <div className="order-3 lg:order-3 flex flex-col justify-between gap-3">
            {/* CORNER 3: TOP-RIGHT — AVG. POSITION COUNTER */}
            <div className="p-3.5 sm:p-4 rounded-[12px] bg-[#0c1416] border border-[#16302d] flex flex-col justify-between items-center text-center">
              {/* Label */}
              <span className="text-[11px] sm:text-xs font-mono text-[#5b7a76]">
                {SEO_GROWTH_DATA.rankings.label}
              </span>

              {/* Odometer Digits Windows */}
              <div className="flex items-center justify-center gap-1.5 my-1">
                {/* TENS DIGIT WINDOW */}
                <div
                  className="w-[36px] sm:w-[42px] overflow-hidden"
                  style={{ height: `${digitHeight}px` }}
                >
                  <div
                    className="transition-transform duration-[450ms]"
                    style={{
                      transitionTimingFunction: 'cubic-bezier(0.5, 0, 0.2, 1)',
                      transform: `translateY(-${tensDigit * digitHeight}px)`,
                    }}
                  >
                    {TENS_DIGITS.map((d) => (
                      <div
                        key={d}
                        className="flex items-center justify-center text-[52px] sm:text-[66px] text-[#e8f3f1] font-serif select-none"
                        style={{
                          height: `${digitHeight}px`,
                          lineHeight: `${digitHeight}px`,
                          fontFamily: 'Georgia, "Playfair Display", serif',
                        }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ONES DIGIT WINDOW */}
                <div
                  className="w-[36px] sm:w-[42px] overflow-hidden"
                  style={{ height: `${digitHeight}px` }}
                >
                  <div
                    className="will-change-transform"
                    style={{
                      transform: `translateY(-${onesOffset}px)`,
                    }}
                  >
                    {ONES_DIGITS.map((d, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center text-[52px] sm:text-[66px] text-[#e8f3f1] font-serif select-none"
                        style={{
                          height: `${digitHeight}px`,
                          lineHeight: `${digitHeight}px`,
                          fontFamily: 'Georgia, "Playfair Display", serif',
                        }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 130px-wide Ruler with 50 hairline ticks */}
              <div className="w-[130px] flex flex-col items-center">
                {/* Triangle Marker */}
                <div className="w-full relative h-[6px] mb-1">
                  <div
                    className="absolute top-0 w-0 h-0 transition-none -translate-x-1/2"
                    style={{
                      left: `${rulerMarkerLeft}%`,
                      borderLeft: '3px solid transparent',
                      borderRight: '3px solid transparent',
                      borderBottom: '5px solid #14e0c4',
                    }}
                  />
                </div>

                {/* 50 Ticks */}
                <div className="w-full flex items-end justify-between h-[9px]">
                  {Array.from({ length: 50 }, (_, i) => {
                    const tickNum = i + 1;
                    const isMajor = tickNum === 1 || tickNum % 10 === 0;
                    return (
                      <span
                        key={tickNum}
                        className="w-[1px] shrink-0"
                        style={{
                          height: isMajor ? '9px' : '5px',
                          backgroundColor: isMajor ? '#8fb0ab' : '#16302d',
                        }}
                      />
                    );
                  })}
                </div>

                {/* Ruler Labels: 1, 25, 50 */}
                <div className="w-full flex justify-between text-[11px] font-mono text-[#5b7a76] mt-1">
                  <span>1</span>
                  <span>25</span>
                  <span>50</span>
                </div>
              </div>

              {/* Bottom Section: Hairline + Brand and "Page one" */}
              <div className="flex flex-col items-center w-full mt-2 min-h-[34px] justify-center">
                {/* 0.5px teal hairline drawing out to 96px */}
                <div
                  className="h-[0.5px] bg-[#14e0c4] transition-all duration-[900ms] ease-out"
                  style={{ width: `${hairlineWidth}px` }}
                />

                {/* Brand and Page one badge */}
                <div
                  className="mt-1 flex flex-col items-center transition-all duration-500 ease-out"
                  style={{
                    opacity: showBrand ? 1 : 0,
                    transform: showBrand ? 'translateY(0)' : 'translateY(5px)',
                  }}
                >
                  <div
                    className="text-[13px] sm:text-[14px] text-[#e8f3f1] font-serif leading-none"
                    style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                  >
                    {SEO_GROWTH_DATA.rankings.brandName}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-[#14e0c4] tracking-wide mt-0.5">
                    {SEO_GROWTH_DATA.rankings.rankBadge}
                  </div>
                </div>
              </div>
            </div>

            {/* CORNER 4: BOTTOM-RIGHT — KEYWORDS ON PAGE 1 */}
            <div className="p-3.5 sm:p-4 rounded-[12px] bg-[#0c1416] border border-[#16302d] flex flex-col justify-between">
              <div>
                <div className="text-[11px] sm:text-xs font-mono text-[#5b7a76] truncate">
                  {SEO_GROWTH_DATA.stats.keywords.label}
                </div>
                <div
                  aria-hidden="true"
                  className="text-xl sm:text-2xl font-medium font-heading tabular-nums text-[#14e0c4] leading-tight mt-1"
                >
                  {keywordsVal}
                </div>
              </div>
              <div
                className="mt-3 self-start px-[8px] py-[2px] rounded-full bg-[#0b2a27] text-[11px] font-mono text-[#14e0c4] transition-opacity duration-500 inline-flex items-center gap-1"
                style={{ opacity: showDeltaChips ? 1 : 0 }}
              >
                <span>&uarr;</span>
                <span>{SEO_GROWTH_DATA.stats.keywords.delta}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default SeoGrowthPanel;
