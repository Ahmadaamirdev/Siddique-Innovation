import React, { useState, useEffect, useRef, useId, useCallback } from 'react';

/**
 * MOCK DATA
 * Hardcoded at top of file for straightforward editing.
 * No external network requests, images, or external fonts.
 */
const SEO_DASHBOARD_DATA = {
  header: {
    title: 'Organic performance',
    range: 'Last 6 months',
  },
  stats: [
    {
      id: 'clicks',
      label: 'Clicks',
      targetValue: 12400,
      finalFormatted: '12.4k',
      delta: '+38%',
      format: (val: number) => {
        if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
        return Math.round(val).toString();
      },
    },
    {
      id: 'impressions',
      label: 'Impressions',
      targetValue: 148000,
      finalFormatted: '148k',
      delta: '+52%',
      format: (val: number) => {
        if (val >= 1000) return `${Math.round(val / 1000)}k`;
        return Math.round(val).toString();
      },
    },
    {
      id: 'keywords',
      label: 'Keywords on page 1',
      targetValue: 64,
      finalFormatted: '64',
      delta: '+27',
      format: (val: number) => Math.round(val).toString(),
    },
  ],
  trafficHistory: [
    { month: 'Jan', clicks: 1800, clicksFormatted: '1.8k', x: 38, y: 118 },
    { month: 'Feb', clicks: 3100, clicksFormatted: '3.1k', x: 104, y: 102 },
    { month: 'Mar', clicks: 5000, clicksFormatted: '5.0k', x: 170, y: 84 },
    { month: 'Apr', clicks: 7600, clicksFormatted: '7.6k', x: 236, y: 62 },
    { month: 'May', clicks: 10000, clicksFormatted: '10.0k', x: 302, y: 42 },
    { month: 'Jun', clicks: 12400, clicksFormatted: '12.4k', x: 368, y: 22 },
  ],
  rankingsBars: [
    { pct: 18, opacity: 0.28 },
    { pct: 26, opacity: 0.35 },
    { pct: 22, opacity: 0.40 },
    { pct: 36, opacity: 0.47 },
    { pct: 44, opacity: 0.54 },
    { pct: 38, opacity: 0.61 },
    { pct: 55, opacity: 0.67 },
    { pct: 68, opacity: 0.74 },
    { pct: 62, opacity: 0.81 },
    { pct: 78, opacity: 0.88 },
    { pct: 90, opacity: 0.94 },
    { pct: 100, opacity: 1.0 },
  ],
  rankingsLabel: 'Top 10 rankings',
};

export interface SeoGrowthDashboardProps {
  loop?: boolean;
  className?: string;
}

// Cubic ease-out helper: 1 - (1 - t)^3
function easeOutCubic(t: number): number {
  const clamped = Math.min(Math.max(t, 0), 1);
  return 1 - Math.pow(1 - clamped, 3);
}

// Generate smooth cubic bezier SVG path from coordinate points
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

const CURVE_SVG_PATH = generateSmoothCurve(SEO_DASHBOARD_DATA.trafficHistory);
const AREA_SVG_PATH = `${CURVE_SVG_PATH} L 368,134 L 38,134 Z`;
const PATH_LENGTH = 1000;
const CYCLE_DURATION_MS = 9000;

export const SeoGrowthDashboard: React.FC<SeoGrowthDashboardProps> = ({
  loop = true,
  className = '',
}) => {
  const gradientId = useId().replace(/:/g, '');
  const containerRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Interaction & animation states
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [isHoveringChart, setIsHoveringChart] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  // Parallax tilt state (lerped)
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const targetTiltRef = useRef({ x: 0, y: 0 });
  const currentTiltRef = useRef({ x: 0, y: 0 });

  // Animation timeline values (driven strictly by rAF)
  const [renderState, setRenderState] = useState({
    panelOpacity: 0,
    panelTranslateY: 12,
    contentOpacity: 1,
    headerDotOpacity: 1,
    statCards: [
      { opacity: 0, translateY: 10, displayValue: '0', showDelta: false },
      { opacity: 0, translateY: 10, displayValue: '0', showDelta: false },
      { opacity: 0, translateY: 10, displayValue: '0', showDelta: false },
    ],
    dashOffset: PATH_LENGTH,
    areaOpacity: 0,
    barScales: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    endDotVisible: false,
    endPulseRadius: 5,
    endPulseOpacity: 0,
    endTooltipVisible: false,
  });

  const animTimeRef = useRef(0);
  const lastTimestampRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  isHoveringRef.current = isHoveringChart;

  // Viewport intersection observer: start only when visible, pause when leaving
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

  // Main 60fps requestAnimationFrame Loop
  useEffect(() => {
    // If reduced motion is requested, snap immediately to full completed state
    if (prefersReducedMotion) {
      setRenderState({
        panelOpacity: 1,
        panelTranslateY: 0,
        contentOpacity: 1,
        headerDotOpacity: 1,
        statCards: SEO_DASHBOARD_DATA.stats.map((s) => ({
          opacity: 1,
          translateY: 0,
          displayValue: s.finalFormatted,
          showDelta: true,
        })),
        dashOffset: 0,
        areaOpacity: 1,
        barScales: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        endDotVisible: true,
        endPulseRadius: 5,
        endPulseOpacity: 0,
        endTooltipVisible: true,
      });
      return;
    }

    if (!isInViewport) {
      lastTimestampRef.current = null;
      return;
    }

    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }
      const delta = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      // Update Parallax Tilt lerp (subtle 3deg maximum)
      const lerpFactor = 0.08;
      currentTiltRef.current.x += (targetTiltRef.current.x - currentTiltRef.current.x) * lerpFactor;
      currentTiltRef.current.y += (targetTiltRef.current.y - currentTiltRef.current.y) * lerpFactor;
      setTilt({
        x: Number(currentTiltRef.current.x.toFixed(2)),
        y: Number(currentTiltRef.current.y.toFixed(2)),
      });

      // If user is hovering over chart, pause the timeline progression
      if (!isHoveringRef.current) {
        animTimeRef.current += delta;
      }

      if (loop && animTimeRef.current >= CYCLE_DURATION_MS) {
        animTimeRef.current = animTimeRef.current % CYCLE_DURATION_MS;
      } else if (!loop && animTimeRef.current > 4000) {
        animTimeRef.current = 4000; // Hold final state indefinitely if loop is disabled
      }

      const tSec = animTimeRef.current / 1000;

      // 1. Panel entrance: 0.00s - 0.50s (fade in & translate up 12px)
      const panelProgress = easeOutCubic(tSec / 0.5);
      const panelOpacity = panelProgress;
      const panelTranslateY = (1 - panelProgress) * 12;

      // 2. Stat cards entrance: 0.30s - 1.10s with 120ms stagger
      const lineProgress = easeOutCubic((tSec - 0.6) / 3.0);
      const statCards = SEO_DASHBOARD_DATA.stats.map((stat, i) => {
        const start = 0.3 + i * 0.12;
        const cardProgress = easeOutCubic((tSec - start) / 0.45);
        const cardOpacity = cardProgress;
        const cardTranslateY = (1 - cardProgress) * 10;

        // Counters count up in sync with line draw (0.60s - 3.60s)
        let currentVal = 0;
        if (tSec >= 3.6) {
          currentVal = stat.targetValue;
        } else if (tSec > 0.6) {
          currentVal = stat.targetValue * lineProgress;
        }
        const displayValue = stat.format(currentVal);

        // Delta chips fade in at 3.2s
        const showDelta = tSec >= 3.2;

        return {
          opacity: cardOpacity,
          translateY: cardTranslateY,
          displayValue,
          showDelta,
        };
      });

      // 3. Line chart draw (0.60s - 3.60s)
      const dashOffset = PATH_LENGTH * (1 - lineProgress);

      // Area fill: 0.90s - 3.60s
      const areaProgress = easeOutCubic((tSec - 0.9) / 2.7);
      const areaOpacity = areaProgress;

      // 4. Bars growth: 1.60s - 3.60s (140ms stagger, ease-out)
      const barScales = SEO_DASHBOARD_DATA.rankingsBars.map((_, i) => {
        const barStart = 1.6 + i * 0.14;
        return easeOutCubic((tSec - barStart) / 0.45);
      });

      // 5. End dot & pulse at 3.60s
      const endDotVisible = tSec >= 3.6;
      let endPulseRadius = 5;
      let endPulseOpacity = 0;
      if (tSec >= 3.6 && tSec <= 4.4) {
        const pulseProgress = (tSec - 3.6) / 0.8;
        endPulseRadius = 5 + pulseProgress * 9; // 5px -> 14px
        endPulseOpacity = (1 - pulseProgress) * 0.65;
      }
      const endTooltipVisible = tSec >= 3.6;

      // 6. Header dot slow 3s opacity pulse
      const headerDotOpacity = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin((tSec * 2 * Math.PI) / 3));

      // 7. Whole panel content fade out: 7.50s - 8.50s
      let contentOpacity = 1;
      if (tSec >= 7.5 && tSec < 8.5) {
        contentOpacity = 1 - easeOutCubic((tSec - 7.5) / 1.0);
      } else if (tSec >= 8.5) {
        contentOpacity = 0;
      }

      setRenderState({
        panelOpacity,
        panelTranslateY,
        contentOpacity,
        headerDotOpacity,
        statCards,
        dashOffset,
        areaOpacity,
        barScales,
        endDotVisible,
        endPulseRadius,
        endPulseOpacity,
        endTooltipVisible,
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInViewport, loop, prefersReducedMotion]);

  // Chart hover / touch interactions: Snap to nearest of the 6 data points
  const handleChartPointerMove = useCallback((clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgWidth = 400;
    const relativeX = ((clientX - rect.left) / rect.width) * svgWidth;

    let closestIdx = 0;
    let minDistance = Infinity;

    SEO_DASHBOARD_DATA.trafficHistory.forEach((pt, index) => {
      const distance = Math.abs(pt.x - relativeX);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = index;
      }
    });

    setHoveredPointIndex(closestIdx);
    setIsHoveringChart(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setHoveredPointIndex(null);
    setIsHoveringChart(false);
  }, []);

  // Parallax tilt on panel mouse move (clamped to max ±3deg)
  const handlePanelMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const normY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      targetTiltRef.current = {
        x: -normY * 6, // max ±3 deg rotateX
        y: normX * 6,  // max ±3 deg rotateY
      };
    },
    [prefersReducedMotion]
  );

  const handlePanelMouseLeave = useCallback(() => {
    targetTiltRef.current = { x: 0, y: 0 };
  }, []);

  // Selected or active interactive point
  const activePoint =
    hoveredPointIndex !== null ? SEO_DASHBOARD_DATA.trafficHistory[hoveredPointIndex] : null;
  const lastPoint = SEO_DASHBOARD_DATA.trafficHistory[SEO_DASHBOARD_DATA.trafficHistory.length - 1];

  return (
    <figure
      ref={containerRef}
      role="img"
      aria-label="Dashboard showing organic traffic growing over six months"
      onMouseMove={handlePanelMouseMove}
      onMouseLeave={handlePanelMouseLeave}
      className={`relative w-full max-w-[560px] rounded-[20px] p-5 sm:p-6 bg-[#0a0f11]/90 backdrop-blur-md border border-[#123a35] text-left select-none transition-shadow duration-300 will-change-transform ${className}`}
      style={{
        boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
        transform: prefersReducedMotion
          ? 'none'
          : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${renderState.panelTranslateY}px)`,
        opacity: renderState.panelOpacity,
      }}
    >
      {/* Screen Reader Summary */}
      <div className="sr-only">
        Organic performance dashboard: 12.4k clicks (+38%), 148k impressions (+52%), 64 keywords
        on page 1 (+27). Organic traffic increased steadily over 6 months from 1.8k in January to
        12.4k in June.
      </div>

      {/* Main Panel Content with Loop Fade-Out wrapper */}
      <div
        style={{ opacity: renderState.contentOpacity }}
        className="transition-opacity duration-300 ease-out"
      >
        {/* 1. Header Row */}
        <header className="flex items-center justify-between pb-4 border-b border-[#16302d]">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-[#14e0c4] shrink-0"
              style={{ opacity: renderState.headerDotOpacity }}
            />
            <span className="text-xs sm:text-sm font-medium tracking-wide text-[#cfeee9]">
              {SEO_DASHBOARD_DATA.header.title}
            </span>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-[#0c1416] border border-[#16302d] text-[11px] font-mono text-[#5b7a76]">
            {SEO_DASHBOARD_DATA.header.range}
          </div>
        </header>

        {/* 2. Three Stat Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 my-3.5 sm:my-4">
          {SEO_DASHBOARD_DATA.stats.map((stat, i) => {
            const cardState = renderState.statCards[i] || {
              opacity: 1,
              translateY: 0,
              displayValue: stat.finalFormatted,
              showDelta: true,
            };
            return (
              <div
                key={stat.id}
                className="p-2.5 sm:p-3 rounded-xl bg-[#0c1416] border border-[#16302d] flex flex-col justify-between"
                style={{
                  opacity: cardState.opacity,
                  transform: `translateY(${cardState.translateY}px)`,
                }}
              >
                <div>
                  <div className="text-[10px] sm:text-xs font-mono text-[#5b7a76] truncate mb-1">
                    {stat.label}
                  </div>
                  <div
                    aria-hidden="true"
                    className="text-base sm:text-2xl font-bold font-heading tabular-nums text-[#14e0c4] leading-tight"
                  >
                    {cardState.displayValue}
                  </div>
                </div>

                {/* Delta Chip */}
                <div
                  className="mt-2 inline-flex items-center gap-1 self-start px-1.5 py-0.5 rounded-full bg-[#14e0c4]/10 border border-[#14e0c4]/20 text-[9px] sm:text-[10px] font-mono text-[#14e0c4] transition-opacity duration-300"
                  style={{
                    opacity: cardState.showDelta ? 1 : 0,
                    transform: cardState.showDelta ? 'none' : 'translateY(4px)',
                  }}
                >
                  <svg
                    className="w-2.5 h-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  <span>{stat.delta}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Main Area: 2 Columns (Stacked under 480px) */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-2.5 items-stretch">
          {/* Left: Organic Traffic Line Chart */}
          <div className="min-[480px]:col-span-2 p-3 sm:p-3.5 rounded-xl bg-[#0c1416] border border-[#16302d] relative flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-[#5b7a76]">Organic Traffic</span>
              <span className="text-[10px] font-mono text-[#14e0c4] bg-[#14e0c4]/10 px-1.5 py-0.5 rounded">
                Search Console
              </span>
            </div>

            {/* SVG Line Chart */}
            <div className="relative w-full aspect-[400/152]">
              <svg
                ref={svgRef}
                viewBox="0 0 400 152"
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
                  <linearGradient id={`area-grad-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14e0c4" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#14e0c4" stopOpacity="0.00" />
                  </linearGradient>
                </defs>

                {/* 3 Faint Horizontal Gridlines */}
                <line
                  x1="30"
                  y1="40"
                  x2="375"
                  y2="40"
                  stroke="#16302d"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <line
                  x1="30"
                  y1="75"
                  x2="375"
                  y2="75"
                  stroke="#16302d"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <line
                  x1="30"
                  y1="110"
                  x2="375"
                  y2="110"
                  stroke="#16302d"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* Baseline Axis */}
                <line x1="30" y1="134" x2="375" y2="134" stroke="#16302d" strokeWidth="1" />

                {/* Area Fill Gradient under Curve */}
                <path
                  d={AREA_SVG_PATH}
                  fill={`url(#area-grad-${gradientId})`}
                  style={{ opacity: renderState.areaOpacity }}
                />

                {/* Main Smooth Cubic Bezier Stroke */}
                <path
                  d={CURVE_SVG_PATH}
                  fill="none"
                  stroke="#14e0c4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={PATH_LENGTH}
                  strokeDasharray={PATH_LENGTH}
                  strokeDashoffset={renderState.dashOffset}
                />

                {/* X-Axis Labels (Jan - Jun) */}
                {SEO_DASHBOARD_DATA.trafficHistory.map((item, idx) => {
                  const isHovered = hoveredPointIndex === idx;
                  return (
                    <text
                      key={item.month}
                      x={item.x}
                      y="147"
                      textAnchor="middle"
                      fontSize="10.5"
                      fontFamily="monospace"
                      fill={isHovered ? '#cfeee9' : '#5b7a76'}
                      fontWeight={isHovered ? '600' : '400'}
                    >
                      {item.month}
                    </text>
                  );
                })}

                {/* Standard End Dot & One Pulse Ring (at 3.6s) when not actively hovering */}
                {!isHoveringChart && renderState.endDotVisible && (
                  <g className="pointer-events-none">
                    {/* Expanding pulse ring */}
                    {renderState.endPulseOpacity > 0 && (
                      <circle
                        cx={lastPoint.x}
                        cy={lastPoint.y}
                        r={renderState.endPulseRadius}
                        fill="none"
                        stroke="#14e0c4"
                        strokeWidth="1.5"
                        strokeOpacity={renderState.endPulseOpacity}
                      />
                    )}
                    {/* Center 5px dot */}
                    <circle cx={lastPoint.x} cy={lastPoint.y} r={4.5} fill="#14e0c4" />
                  </g>
                )}

                {/* Static End Point Tooltip (at 3.6s) */}
                {!isHoveringChart && renderState.endTooltipVisible && (
                  <g className="pointer-events-none transition-opacity duration-300">
                    <g transform={`translate(${lastPoint.x - 90}, ${lastPoint.y - 18})`}>
                      <rect
                        width="88"
                        height="20"
                        rx="4"
                        fill="#0c1416"
                        stroke="#16302d"
                        strokeWidth="1"
                      />
                      <text
                        x="44"
                        y="13.5"
                        textAnchor="middle"
                        fill="#cfeee9"
                        fontSize="9.5"
                        fontFamily="monospace"
                        fontWeight="500"
                      >
                        Jun · 12.4k clicks
                      </text>
                    </g>
                  </g>
                )}

                {/* Interactive Crosshair & Tooltip during Hover/Touch */}
                {activePoint && (
                  <g className="pointer-events-none">
                    {/* Vertical Hairline */}
                    <line
                      x1={activePoint.x}
                      y1="18"
                      x2={activePoint.x}
                      y2="134"
                      stroke="#14e0c4"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      strokeOpacity="0.75"
                    />
                    {/* Point Dot */}
                    <circle
                      cx={activePoint.x}
                      cy={activePoint.y}
                      r={7}
                      fill="#14e0c4"
                      fillOpacity="0.2"
                    />
                    <circle cx={activePoint.x} cy={activePoint.y} r={4.5} fill="#14e0c4" />

                    {/* Dynamic Tooltip Badge */}
                    <g
                      transform={`translate(${Math.min(
                        Math.max(activePoint.x - 45, 10),
                        310
                      )}, ${Math.max(activePoint.y - 24, 6)})`}
                    >
                      <rect
                        width="90"
                        height="20"
                        rx="4"
                        fill="#0a0f11"
                        stroke="#14e0c4"
                        strokeWidth="1"
                      />
                      <text
                        x="45"
                        y="13.5"
                        textAnchor="middle"
                        fill="#cfeee9"
                        fontSize="9.5"
                        fontFamily="monospace"
                        fontWeight="600"
                      >
                        {activePoint.month} · {activePoint.clicksFormatted} clicks
                      </text>
                    </g>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Right: Top 10 Rankings Bar Chart */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#0c1416] border border-[#16302d] flex flex-col justify-between items-center overflow-hidden">
            <div className="w-full flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-[#5b7a76]">Rankings</span>
              <span className="text-[10px] font-mono text-[#5b7a76]">Top 10</span>
            </div>

            {/* 12 Bars SVG with Rising Animation */}
            <div className="w-full flex-1 flex items-center justify-center my-1">
              <svg viewBox="0 0 160 95" className="w-full max-h-[130px] overflow-visible">
                {/* Baseline */}
                <line x1="4" y1="82" x2="156" y2="82" stroke="#16302d" strokeWidth="1" />

                {SEO_DASHBOARD_DATA.rankingsBars.map((bar, i) => {
                  const barWidth = 9;
                  const barGap = 4;
                  const startX = 7;
                  const x = startX + i * (barWidth + barGap);
                  const maxH = 72;
                  const targetH = (bar.pct / 100) * maxH;
                  const scale = renderState.barScales[i] ?? 1;
                  const currentH = Math.max(targetH * scale, 0);
                  const y = 82 - currentH;

                  return (
                    <rect
                      key={i}
                      x={x}
                      y={y}
                      width={barWidth}
                      height={currentH}
                      rx="2.5"
                      ry="2.5"
                      fill="#14e0c4"
                      fillOpacity={bar.opacity}
                    />
                  );
                })}
              </svg>
            </div>

            <div className="text-[10.5px] font-mono text-[#5b7a76] text-center mt-1">
              {SEO_DASHBOARD_DATA.rankingsLabel}
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default SeoGrowthDashboard;
