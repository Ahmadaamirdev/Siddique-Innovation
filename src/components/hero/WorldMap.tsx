import React from 'react';
import { motion } from 'framer-motion';

export const WorldMap: React.FC = () => {
  const dots = React.useMemo(() => {
    const points: { x: number; y: number; r: number; delay: number; duration: number }[] = [];
    for (let i = 0; i < 95; i++) {
      const x = Math.random() * 280 + 10;
      const y = Math.random() * 140 + 10;
      points.push({
        x,
        y,
        r: Math.random() > 0.85 ? 1.8 : 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 3,
      });
    }
    return points;
  }, []);

  return (
    <div className="w-full max-w-[760px] h-[380px] mx-auto pointer-events-none overflow-hidden select-none opacity-[0.18]">
      <svg
        className="w-full h-full"
        viewBox="0 0 300 160"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="arcGradWorldMap" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E6D2" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#00FFE5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00E6D2" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Matrix Dots */}
        {dots.map((dot, idx) => (
          <motion.circle
            key={idx}
            cx={dot.x}
            cy={dot.y}
            r={dot.r}
            fill={dot.r > 1.5 ? '#00FFE5' : '#00E6D2'}
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: dot.r > 1.5 ? [1, 1.3, 1] : 1,
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Curved Connection Arcs */}
        <motion.path
          d="M 40,90 Q 110,20 180,60"
          fill="none"
          stroke="url(#arcGradWorldMap)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: [100, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        <motion.path
          d="M 120,70 Q 190,10 260,80"
          fill="none"
          stroke="url(#arcGradWorldMap)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />

        {/* Arc Nodes */}
        <circle cx="180" cy="60" r="2.5" fill="#00FFE5" className="animate-ping opacity-75" />
        <circle cx="180" cy="60" r="2" fill="#FFFFFF" />
        <circle cx="120" cy="70" r="2.5" fill="#00FFE5" className="animate-ping opacity-75" />
        <circle cx="120" cy="70" r="2" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
