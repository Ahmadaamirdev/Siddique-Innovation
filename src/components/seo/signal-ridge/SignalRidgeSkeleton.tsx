import React from 'react';

export const SignalRidgeSkeleton: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading Signal Ridge 3D visualization"
      className="relative w-full h-[330px] sm:h-[365px] lg:h-[390px] xl:h-[405px] bg-[#0b1412] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 animate-pulse"
    >
      {/* Top Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-44 bg-white/5 rounded-full" />
        <div className="h-5 w-28 bg-white/5 rounded-full" />
      </div>

      {/* Middle column skeletons */}
      <div className="flex items-end justify-center gap-2 sm:gap-3.5 h-44 mb-6">
        {[15, 20, 26, 33, 41, 50, 60, 71, 82, 91, 96, 100].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className="w-4 sm:w-6 bg-[#164e43]/30 border border-[#1fd6a5]/20 rounded-md"
          />
        ))}
      </div>

      {/* Bottom stats skeleton */}
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-white/5 rounded" />
          <div className="h-7 w-24 bg-white/5 rounded" />
        </div>
        <div className="space-y-2 flex flex-col items-end">
          <div className="h-3 w-20 bg-white/5 rounded" />
          <div className="h-7 w-14 bg-white/5 rounded" />
        </div>
      </div>
    </div>
  );
};

export default SignalRidgeSkeleton;
