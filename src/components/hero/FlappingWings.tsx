import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../../assets/logo.png';

interface FlappingWingsProps {
  reducedMotion?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FlappingWings: React.FC<FlappingWingsProps> = ({
  reducedMotion = false,
  className = '',
  size = 'lg',
}) => {
  // Symmetrical flapping wing duration (smooth, organic, majestic)
  const flapDuration = 3.6;

  // Increased, balanced sizing classes
  const sizeClasses = {
    sm: 'w-[220px] h-[220px] sm:w-[260px] sm:h-[260px]',
    md: 'w-[270px] h-[270px] sm:w-[330px] sm:h-[330px]',
    lg: 'w-[270px] h-[270px] sm:w-[330px] sm:h-[330px] lg:w-[400px] lg:h-[400px] xl:w-[440px] xl:h-[440px]',
  }[size];

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none pointer-events-none ${className}`}
    >
      {/* Subtle, soft ambient glow (low intensity, non-intrusive) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[350px] lg:w-[420px] h-[280px] sm:h-[350px] lg:h-[420px] bg-radial from-[#00FFE5]/12 to-transparent blur-2xl pointer-events-none -z-10" />

      {/* Floating Hover Motion Wrapper */}
      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                y: [-6, 6, -6],
              }
        }
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeClasses} flex items-center justify-center`}
      >
        {/* 3D Perspective Stage for Flapping Wings */}
        <div
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Left Wing (Hinged at bottom-right root where wings connect) */}
          <motion.div
            animate={
              reducedMotion
                ? {}
                : {
                    rotateY: [-22, 26, -22],
                    rotateZ: [5, -7, 5],
                    rotateX: [-4, 5, -4],
                  }
            }
            transition={{
              duration: flapDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              transformOrigin: 'right 86% 0px',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            className="w-1/2 h-full relative will-change-transform transform-gpu"
          >
            {/* Subtle Accent Glow Layer */}
            <div
              className="w-full h-full overflow-hidden absolute inset-0 pointer-events-none"
              style={{
                transform: 'translateZ(-2px)',
                filter: 'drop-shadow(0 0 12px rgba(0,255,229,0.35))',
              }}
            >
              <img
                src={logoImg}
                alt="Left Wing Glow"
                className="absolute left-0 top-0 w-[200%] h-full max-w-none object-contain pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Crisp Front Wing Face */}
            <div
              className="w-full h-full overflow-hidden absolute inset-0 pointer-events-none"
              style={{ transform: 'translateZ(1px)' }}
            >
              <img
                src={logoImg}
                alt="Left Wing"
                className="absolute left-0 top-0 w-[200%] h-full max-w-none object-contain pointer-events-none drop-shadow-[0_0_8px_rgba(0,255,229,0.25)]"
                draggable={false}
              />
            </div>
          </motion.div>

          {/* Right Wing (Hinged at bottom-left root where wings connect) */}
          <motion.div
            animate={
              reducedMotion
                ? {}
                : {
                    rotateY: [22, -26, 22],
                    rotateZ: [-5, 7, -5],
                    rotateX: [-4, 5, -4],
                  }
            }
            transition={{
              duration: flapDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              transformOrigin: 'left 86% 0px',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            className="w-1/2 h-full relative will-change-transform transform-gpu"
          >
            {/* Subtle Accent Glow Layer */}
            <div
              className="w-full h-full overflow-hidden absolute inset-0 pointer-events-none"
              style={{
                transform: 'translateZ(-2px)',
                filter: 'drop-shadow(0 0 12px rgba(0,255,229,0.35))',
              }}
            >
              <img
                src={logoImg}
                alt="Right Wing Glow"
                className="absolute right-0 top-0 w-[200%] h-full max-w-none object-contain pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Crisp Front Wing Face */}
            <div
              className="w-full h-full overflow-hidden absolute inset-0 pointer-events-none"
              style={{ transform: 'translateZ(1px)' }}
            >
              <img
                src={logoImg}
                alt="Right Wing"
                className="absolute right-0 top-0 w-[200%] h-full max-w-none object-contain pointer-events-none drop-shadow-[0_0_8px_rgba(0,255,229,0.25)]"
                draggable={false}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlappingWings;
