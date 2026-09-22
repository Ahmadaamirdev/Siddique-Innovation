import React from 'react';
import { motion } from 'framer-motion';

export const WorldMapOverlay: React.FC = () => {
  // Tech hub coordinates (normalized to 1000x500 SVG viewbox) with staggered pulse timings
  const hubs = [
    { name: 'San Francisco', cx: 180, cy: 190, pulseDelay: 0 },
    { name: 'New York', cx: 280, cy: 180, pulseDelay: 1.2 },
    { name: 'London', cx: 480, cy: 150, pulseDelay: 0.6 },
    { name: 'Frankfurt', cx: 520, cy: 155, pulseDelay: 2.1 },
    { name: 'Dubai', cx: 620, cy: 220, pulseDelay: 1.5 },
    { name: 'Singapore', cx: 780, cy: 280, pulseDelay: 0.9 },
    { name: 'Tokyo', cx: 860, cy: 200, pulseDelay: 2.4 },
    { name: 'Sydney', cx: 890, cy: 400, pulseDelay: 1.8 },
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
          const duration = 6 + idx * 1.5;
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
              {/* Luminous Soft Glow Underlay (Hardware rasterized, zero filter overhead) */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="rgba(0, 255, 229, 0.35)"
                strokeWidth="4"
                strokeDasharray="40 160"
                animate={{
                  strokeDashoffset: [200, -200],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              {/* Moving Pulse Ray Along Arc */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#arcGradient)"
                strokeWidth="2"
                strokeDasharray="40 160"
                animate={{
                  strokeDashoffset: [200, -200],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </g>
          );
        })}

        {/* Global Node Hubs */}
        {hubs.map((hub) => (
          <g key={hub.name} transform={`translate(${hub.cx}, ${hub.cy})`}>
            {/* Core Hub Dot */}
            <circle r="3.5" fill="#00E6D2" />
            <circle r="1.5" fill="#FFFFFF" />

            {/* Staggered Pulsing Outer Ring (Declarative, no React re-renders) */}
            <motion.circle
              r="12"
              fill="none"
              stroke="#00FFE5"
              strokeWidth="1.5"
              initial={{ opacity: 0.8, scale: 0.3 }}
              animate={{ opacity: [0.8, 0], scale: [0.3, 1.8] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: hub.pulseDelay,
                repeatDelay: 1.5,
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};
