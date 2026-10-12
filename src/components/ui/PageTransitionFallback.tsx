import React from 'react';
import { WingLogo } from '@/components/ui/WingLogo';

export const PageTransitionFallback: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative select-none overflow-hidden"
      aria-label="Loading page..."
    >
      {/* Top Progress Loading Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 overflow-hidden bg-black/40">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-[#00FFE5] to-[#00E6D2] shadow-[0_0_12px_rgba(0,255,229,0.9)] animate-pulse" />
      </div>

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-radial from-[#00E6D2]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Centered Minimal Brand Indicator */}
      <div className="relative flex flex-col items-center gap-4 z-10">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[#00E6D2]/20 border-t-[#00FFE5] animate-spin" />
          <WingLogo className="w-6 h-6 text-[#00E6D2] opacity-80" />
        </div>
      </div>
    </div>
  );
};
