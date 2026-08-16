import React from 'react';
import { motion } from 'framer-motion';


interface LaptopSceneProps {
  reducedMotion?: boolean;
}

export const LaptopScene: React.FC<LaptopSceneProps> = ({ reducedMotion = false }) => {
  return (
    <div className="relative w-full max-w-[720px] mx-auto flex items-center justify-center">
      {/* Ambient Platform Cyan Glow reflection with breathing cycle */}
      <motion.div
        animate={
          reducedMotion
            ? { opacity: 0.35 }
            : {
              opacity: [0.25, 0.55, 0.25],
              scale: [0.95, 1.05, 0.95],
            }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-6 w-4/5 h-24 bg-radial from-[#00E6D2]/35 via-[#00FFE5]/12 to-transparent blur-3xl rounded-full pointer-events-none transform-gpu will-change-transform"
      />

      {/* Main 3D Hero Visual Scene Image */}
      <motion.div
        animate={
          reducedMotion
            ? { y: 0 }
            : {
              y: [0, -8, 0],
            }
        }
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full z-10"
      >
        <img
          src="/hero.png"
          alt="Siddiqui Innovations Hero"
          className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] select-none pointer-events-none rounded-xl"
        />

        {/* Pulsing Hotspot: AI Chatbot Active Status Indicator */}
        <div className="absolute right-[14.2%] bottom-[23.5%] flex items-center justify-center">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFE5] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E6D2]"></span>
          </span>
        </div>

        {/* Pulsing Hotspot: SEO Score Gauge */}
        <div className="absolute left-[11%] top-[24%] flex items-center justify-center">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFE5] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E6D2]"></span>
          </span>
        </div>

        {/* Pulsing Hotspot: Chart Peak Node */}
        <div className="absolute right-[31.5%] top-[36.5%] flex items-center justify-center">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFE5] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
        </div>
      </motion.div>
    </div>
  );
};


