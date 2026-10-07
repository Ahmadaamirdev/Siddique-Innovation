import React, { useRef } from 'react';
import { SignalRidge } from './signal-ridge/SignalRidge';

export interface OrganicPerformanceProps {
  heading?: React.ReactNode;
  description?: string;
}

export function OrganicPerformance({ heading, description }: OrganicPerformanceProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="op" aria-label="Organic performance">
      <style>{CSS}</style>

      {/* ── 1 & 2. Centered Heading Block ── */}
      <div className="op-heading-block">
        {heading || (
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading py-0.5 drop-shadow-md text-center max-w-4xl mx-auto pt-0 whitespace-normal sm:whitespace-nowrap">
            Get Found on Google &amp;{' '}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_25px_rgba(0,255,229,0.35)]"
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              AI Search Engines
            </span>
          </h1>
        )}
        <p className="text-gray-300 text-[11px] sm:text-xs font-normal leading-relaxed font-sans max-w-lg mx-auto mt-1 sm:mt-1.5 text-center">
          {description ||
            'We improve your visibility across traditional and AI search engines through thoughtful SEO, AEO, and content strategies, helping your business get discovered by the right audience.'}
        </p>
      </div>

      {/* ── 3. Center 3D Scene: Signal Ridge (Integrates status & performance) ── */}
      <div className="w-full">
        <SignalRidge />
      </div>
    </section>
  );
}

/* ───────────────────────── styles ───────────────────────── */
const CSS = `
.op {
  --teal: #1fd6a5;
  --teal-soft: #5fd9c3;
  --ink: #e6f2ef;
  --mute: #6b8480;
  position: relative;
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 12px 0;
  color: var(--ink);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  isolation: isolate;
}

.op-heading-block {
  text-align: center;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
`;

export default OrganicPerformance;
export { SignalRidge };
