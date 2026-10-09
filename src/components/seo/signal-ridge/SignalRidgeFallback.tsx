import React from 'react';
import { SIGNAL_RIDGE_DATA } from './data';

export const SignalRidgeFallback: React.FC = () => {
  const { months } = SIGNAL_RIDGE_DATA;
  const maxClicks = 14;

  const w = 700;
  const h = 340;
  const paddingX = 60;
  const baseY = 280;

  const points = months.map((m, i) => {
    const x = paddingX + (i * (w - 2 * paddingX)) / (months.length - 1);
    const y = baseY - (m.clicks / maxClicks) * (baseY - 50);
    return { x, y, ...m };
  });

  const linePath = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`;

  return (
    <div
      role="img"
      aria-label="Static 2D chart showing organic clicks rising from 3.1k in January to 12.4k in June"
      className="relative w-full h-[330px] sm:h-[365px] lg:h-[390px] xl:h-[405px] bg-[#0b1412] flex items-center justify-center p-4 select-none"
    >
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full max-w-[650px] overflow-visible">
        <defs>
          <linearGradient id="fallbackAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1fd6a5" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0b1412" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Floor Line */}
        <line x1="30" y1={baseY} x2={w - 30} y2={baseY} stroke="#164e43" strokeWidth="1.5" />

        {/* Area & Ribbon Line */}
        <path d={areaPath} fill="url(#fallbackAreaGrad)" />
        <path d={linePath} fill="none" stroke="#5fd9c3" strokeWidth="3" />

        {/* Columns & Markers */}
        {points.map((p, i) => {
          const colHeight = baseY - p.y;
          return (
            <g key={i}>
              {/* Hex Column Bar representation */}
              <rect
                x={p.x - 14}
                y={p.y}
                width="28"
                height={colHeight}
                fill="#0f2f29"
                stroke="#1fd6a5"
                strokeWidth="1.2"
                opacity="0.88"
                rx="3"
              />
              {/* Top Node Point */}
              <circle cx={p.x} cy={p.y} r="4" fill="#a8efe2" stroke="#1fd6a5" strokeWidth="2" />
              {/* Month label */}
              <text
                x={p.x}
                y={baseY + 22}
                textAnchor="middle"
                fill="#6b8480"
                fontFamily="'JetBrains Mono', monospace"
                fontSize="12"
              >
                {p.month}
              </text>
              {/* Clicks value label */}
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                fill="#1fd6a5"
                fontFamily="'JetBrains Mono', monospace"
                fontSize="11"
                fontWeight="bold"
              >
                {p.clicks}k
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
