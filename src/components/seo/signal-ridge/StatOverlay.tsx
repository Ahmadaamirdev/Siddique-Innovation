import React from 'react';
import { SIGNAL_RIDGE_DATA } from './data';
import type { HoveredColumnInfo } from './types';

interface StatOverlayProps {
  progress: number; // 0 to 1
  hoveredColumn: HoveredColumnInfo | null;
  juneProjected: { x: number; y: number; visible: boolean } | null;
  onReplay?: () => void;
}

export const StatOverlay: React.FC<StatOverlayProps> = ({
  progress,
  hoveredColumn,
  juneProjected,
}) => {
  const { summary } = SIGNAL_RIDGE_DATA;

  // Number interpolation using easeOutCubic
  const clicksVal = (summary.clicksTotal * progress).toFixed(1);
  const imprVal = Math.round(summary.impressionsTotal * progress);
  const kwVal = Math.round(summary.keywordsOnPageOne * progress);
  // Avg position starts from e.g. 50 and moves to 1
  const avgPosVal = Math.max(1, Math.round(50 - (50 - summary.avgPosition) * progress));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-end px-6 sm:px-12 lg:px-16 xl:px-24 pb-10 sm:pb-14 lg:pb-16 select-none">
      {/* ── BOTTOM STAT BLOCKS (Positioned inward from corners) ── */}
      <div className="w-full max-w-5xl mx-auto flex items-end justify-between gap-6 pointer-events-auto">
        {/* LEFT COLUMN: Clicks & Impressions */}
        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24 text-left">
          {/* Clicks */}
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs font-mono text-[#6b8480] uppercase tracking-wider mb-0.5">
              Clicks
            </span>
            <div className="flex items-baseline gap-2.5">
              <span
                className="text-3xl sm:text-4xl lg:text-[40px] text-[#1fd6a5] font-serif leading-none drop-shadow-[0_0_20px_rgba(31,214,165,0.25)]"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                {clicksVal}
                <small className="text-sm sm:text-base text-[#5fd9c3] opacity-80 ml-0.5 font-mono">k</small>
              </span>
              <span className="text-[11px] font-mono text-[#5fd9c3] bg-[#1fd6a5]/10 border border-[#1fd6a5]/25 px-2 py-0.5 rounded">
                +{summary.clicksGrowthPercent}%
              </span>
            </div>
          </div>

          {/* Impressions */}
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs font-mono text-[#6b8480] uppercase tracking-wider mb-0.5">
              Impressions
            </span>
            <div className="flex items-baseline gap-2.5">
              <span
                className="text-3xl sm:text-4xl lg:text-[40px] text-[#1fd6a5] font-serif leading-none drop-shadow-[0_0_20px_rgba(31,214,165,0.25)]"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                {imprVal}
                <small className="text-sm sm:text-base text-[#5fd9c3] opacity-80 ml-0.5 font-mono">k</small>
              </span>
              <span className="text-[11px] font-mono text-[#5fd9c3] bg-[#1fd6a5]/10 border border-[#1fd6a5]/25 px-2 py-0.5 rounded">
                +{summary.impressionsGrowthPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Avg. position */}
        <div className="flex flex-col items-end text-right mb-12 sm:mb-16 lg:mb-20">
          <span className="text-[11px] sm:text-xs font-mono text-[#6b8480] uppercase tracking-wider mb-0.5">
            Avg. position
          </span>
          <span
            className="text-3xl sm:text-4xl lg:text-[40px] text-[#1fd6a5] font-serif leading-none drop-shadow-[0_0_20px_rgba(31,214,165,0.25)]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            {String(avgPosVal).padStart(2, '0')}
          </span>

          {/* Tick ruler */}
          <div className="w-28 sm:w-36 my-2">
            <div className="flex justify-between items-end h-2.5">
              {Array.from({ length: 25 }, (_, i) => (
                <i
                  key={i}
                  className={`w-px ${
                    i === 0 || i === 24
                      ? 'h-3 bg-[#1fd6a5]'
                      : i % 5 === 0
                        ? 'h-2 bg-[#5fd9c3]/50'
                        : 'h-1.5 bg-[#5fd9c3]/20'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-[#6b8480] mt-1">
              <span>01</span>
              <span>25</span>
              <span>50</span>
            </div>
          </div>

          <div className="flex flex-col items-end mt-1">
            <span
              className="text-xs sm:text-[13px] text-[#e6f2ef] font-serif leading-none"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {summary.brandName}
            </span>
            <span className="text-[9.5px] sm:text-[10.5px] font-mono text-[#1fd6a5] tracking-wider mt-0.5">
              {summary.rankBadge}
            </span>
          </div>

          {/* Mobile Keywords on Page 1 Chip */}
          <div className="sm:hidden mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#081815]/90 border border-[#1fd6a5]/30 text-[10px] font-mono">
            <span className="text-gray-400">Keywords:</span>
            <span className="text-[#1fd6a5] font-bold font-serif">{kwVal}</span>
            <span className="text-[#5fd9c3]">+{summary.keywordsGrowth}</span>
          </div>
        </div>
      </div>

      {/* ── PROJECTED 3D FINALE LABEL ── */}
      {juneProjected && juneProjected.visible && (!hoveredColumn || hoveredColumn.month !== SIGNAL_RIDGE_DATA.months[SIGNAL_RIDGE_DATA.months.length - 1].month) && (
        <div
          style={{
            left: `${juneProjected.x}px`,
            top: `${juneProjected.y}px`,
            transform: 'translate(16px, -50%)',
          }}
          className="absolute z-20 pointer-events-none transition-transform duration-75 ease-out animate-fadeIn"
        >
          <div className="px-3.5 py-1.5 rounded-full bg-[#081815]/95 border border-[#1fd6a5]/50 backdrop-blur-md shadow-[0_0_20px_rgba(31,214,165,0.35)] text-xs font-mono text-[#e6f2ef] flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1fd6a5] animate-ping" />
            <span>
              {SIGNAL_RIDGE_DATA.months[SIGNAL_RIDGE_DATA.months.length - 1].month} ·{' '}
              {SIGNAL_RIDGE_DATA.months[SIGNAL_RIDGE_DATA.months.length - 1].clicks.toFixed(1)}k clicks
            </span>
          </div>
        </div>
      )}

      {/* ── HOVER TOOLTIP PILL ── */}
      {hoveredColumn && (
        <div
          style={{
            left: `${hoveredColumn.screenX}px`,
            top: `${hoveredColumn.screenY}px`,
            transform: 'translate(18px, -50%)',
          }}
          className="absolute z-30 pointer-events-none px-3 py-1 rounded-full bg-[#06110f]/95 border border-[#1fd6a5]/60 shadow-[0_0_15px_rgba(31,214,165,0.3)] backdrop-blur-lg text-xs font-mono text-[#e6f2ef] whitespace-nowrap flex items-center gap-1.5 animate-fadeIn"
        >
          <span className="text-[#1fd6a5] font-bold">{hoveredColumn.month}</span>
          <span className="text-white/30">·</span>
          <span>{hoveredColumn.clicks.toFixed(1)}k clicks</span>
          <span className="text-white/30">·</span>
          <span className="text-[#5fd9c3]">{hoveredColumn.impressions}k impr.</span>
        </div>
      )}

      {/* Visually hidden text for accessibility */}
      <span className="sr-only">
        {hoveredColumn
          ? `${hoveredColumn.month}: ${hoveredColumn.clicks}k clicks, ${hoveredColumn.impressions}k impressions`
          : `Interactive 3D graph showing organic search growth from ${SIGNAL_RIDGE_DATA.months[0].month} to ${SIGNAL_RIDGE_DATA.months[SIGNAL_RIDGE_DATA.months.length - 1].month}`}
      </span>
    </div>
  );
};
