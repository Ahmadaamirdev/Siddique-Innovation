import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const WorldMapOverlay: React.FC = () => {
  const [pulseIndices, setPulseIndices] = useState<number[]>([0, 2, 4]);

  // Tech hub coordinates (normalized to 1000x500 SVG viewbox)
  const hubs = [
    { name: 'San Francisco', cx: 180, cy: 190 },
    { name: 'New York', cx: 280, cy: 180 },
    { name: 'London', cx: 480, cy: 150 },
    { name: 'Frankfurt', cx: 520, cy: 155 },
    { name: 'Dubai', cx: 620, cy: 220 },
    { name: 'Singapore', cx: 780, cy: 280 },
    { name: 'Tokyo', cx: 860, cy: 200 },
    { name: 'Sydney', cx: 890, cy: 400 },
  ];

  // Connecting bezier curve arcs between hubs
  const arcs = [
    { from: hubs[0], to: hubs[1], controlY: 150 },
    { from: hubs[1], to: hubs[2], controlY: 100 },
    { from: hubs[2], to: hubs[4], controlY: 120 },
    { from: hubs[4], to: hubs[5], controlY: 200 },
    { from: hubs[5], to: hubs[6], controlY: 180 },
    { from: hubs[2], to: hubs[3], controlY: 140 },
  ];

  // Periodically randomize which hubs pulse to avoid obvious loops
  useEffect(() => {
    const interval = setInterval(() => {
      const active = Array.from({ length: 3 }, () => Math.floor(Math.random() * hubs.length));
      setPulseIndices(active);
    }, 4500);

    return () => clearInterval(interval);
  }, [hubs.length]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-40 overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full object-contain max-w-[1200px] transform-gpu will-change-transform"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 230, 210, 0.15)" />
            <stop offset="50%" stopColor="rgba(0, 255, 229, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 230, 210, 0.15)" />
          </linearGradient>
        </defs>

        {/* Animated Connecting Arcs */}
        {arcs.map((arc, idx) => {
          const pathD = `M ${arc.from.cx} ${arc.from.cy} Q ${(arc.from.cx + arc.to.cx) / 2} ${arc.controlY} ${arc.to.cx} ${arc.to.cy}`;
          return (
            <g key={idx}>
              {/* Base Line */}
              <path
                d={pathD}
                fill="none"
                stroke="rgba(0, 230, 210, 0.15)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              {/* Moving Pulse Ray Along Arc */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#arcGradient)"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 229, 0.7))' }}
                strokeDasharray="40 160"
                animate={{
                  strokeDashoffset: [200, -200],
                }}
                transition={{
                  duration: 6 + idx * 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </g>
          );
        })}

        {/* Global Node Hubs */}
        {hubs.map((hub, idx) => {
          const isPulsing = pulseIndices.includes(idx);

          return (
            <g key={hub.name} transform={`translate(${hub.cx}, ${hub.cy})`}>
              {/* Core Hub Dot */}
              <circle r="3.5" fill="#00E6D2" />
              <circle r="1.5" fill="#FFFFFF" />

              {/* Pulsing Outer Ring */}
              {isPulsing && (
                <motion.circle
                  r="12"
                  fill="none"
                  stroke="#00FFE5"
                  strokeWidth="1.5"
                  initial={{ opacity: 0.8, scale: 0.3 }}
                  animate={{ opacity: 0, scale: 1.8 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
