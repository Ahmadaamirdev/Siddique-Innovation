import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import logoImg from '../../assets/logo.png';

interface FlappingScrollLogoProps {
  progress: MotionValue<number>;
  onTriggerReveal: () => void;
  isRevealed: boolean;
  reducedMotion?: boolean;
}

export const FlappingScrollLogo: React.FC<FlappingScrollLogoProps> = ({
  progress,
  onTriggerReveal,
  isRevealed,
  reducedMotion = false,
}) => {

  // Vertical ascension: starts more downward, glides much higher upward into upper screen
  const logoY = useTransform(
    progress,
    [0, 0.25, 0.55, 0.82, 1.0],
    ['14vh', '5vh', '-8vh', '-24vh', '-38vh']
  );

  // Scaling: base element is 460px wide, uniformly scaled up to 1.40 (authentic shape, no distortion)
  const logoScale = useTransform(
    progress,
    [0, 0.25, 0.55, 0.85, 1.0],
    [0.18, 0.38, 0.75, 1.12, 1.40]
  );

  // Opacity: full visibility during ascension, then dissolves gently into stardust at peak size
  const logoOpacity = useTransform(
    progress,
    [0, 0.75, 0.92, 1.0],
    [1, 1, 0.3, 0]
  );

  // Soft energy bloom burst flare when reaching peak size (reduced glow)
  const flareOpacity = useTransform(
    progress,
    [0.75, 0.88, 1.0],
    [0, 0.32, 0]
  );
  const flareScale = useTransform(
    progress,
    [0.75, 0.90, 1.0],
    [0.6, 2.2, 3.0]
  );

  // Scroll Down prompt text: fades out smoothly upon initial scroll
  const promptOpacity = useTransform(
    progress,
    [0, 0.12],
    [1, 0]
  );
  const promptY = useTransform(
    progress,
    [0, 0.12],
    [0, 12]
  );

  // Distinct, clear 3D avian wing flapping with dynamic aerodynamic strokes:
  // Left Wing 3D Transforms
  const leftWingRotateY = useTransform(
    progress,
    [0, 0.10, 0.26, 0.42, 0.58, 0.72, 0.86, 1.0],
    [0, -26, 44, -22, 34, -14, 16, 0]
  );

  const leftWingRotateZ = useTransform(
    progress,
    [0, 0.10, 0.26, 0.42, 0.58, 0.72, 0.86, 1.0],
    [0, 9, -18, 8, -14, 5, -5, 0]
  );

  const leftWingRotateX = useTransform(
    progress,
    [0, 0.10, 0.26, 0.42, 0.58, 0.72, 0.86, 1.0],
    [0, -8, 15, -7, 12, -4, 4, 0]
  );

  // Right Wing 3D Transforms (symmetrical)
  const rightWingRotateY = useTransform(
    progress,
    [0, 0.10, 0.26, 0.42, 0.58, 0.72, 0.86, 1.0],
    [0, 26, -44, 22, -34, 14, -16, 0]
  );

  const rightWingRotateZ = useTransform(
    progress,
    [0, 0.10, 0.26, 0.42, 0.58, 0.72, 0.86, 1.0],
    [0, -9, 18, -8, 14, -5, 5, 0]
  );

  const rightWingRotateX = useTransform(
    progress,
    [0, 0.10, 0.26, 0.42, 0.58, 0.72, 0.86, 1.0],
    [0, -8, 15, -7, 12, -4, 4, 0]
  );



  if (isRevealed) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-4 sm:pb-6 select-none pointer-events-none"
    >
      {/* Central Ascending Container */}
      <motion.div
        style={{
          y: logoY,
        }}
        className="relative flex items-center justify-center transform-gpu will-change-transform pointer-events-auto"
      >
        {/* Outer Idle Hovering Wrapper - Hovers BOTH the logo and text together in static state */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                y: [0, -14, 0],
              }
          }
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[460px] md:h-[460px] flex items-center justify-center cursor-pointer"
          onClick={onTriggerReveal}
          title="Scroll to move"
        >
          {/* Scaled Wings System Container (Uniform 1:1 scale, authentic original shape) */}
          <motion.div
            style={{
              scale: logoScale,
              opacity: logoOpacity,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Soft Energy Burst Flare at peak size */}
            <motion.div
              style={{
                opacity: flareOpacity,
                scale: flareScale,
              }}
              className="absolute w-64 h-64 rounded-full bg-radial from-[#00FFE5]/35 via-[#00E6D2]/15 to-transparent blur-2xl pointer-events-none"
            />

            {/* Subtle Ambient Glow behind hovering logo */}
            <motion.div
              animate={
                reducedMotion
                  ? {}
                  : {
                    scale: [0.95, 1.08, 0.95],
                    opacity: [0.15, 0.30, 0.15],
                  }
              }
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-8 bg-[#00E6D2]/15 blur-xl rounded-full pointer-events-none"
            />

            {/* 3D Flapping Wings System with 1200px perspective */}
            <div
              style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full h-full flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Left Wing (Hinged at lower joint so lower part stays anchored and only upper parts flap) */}
                <motion.div
                  style={{
                    transformOrigin: 'right 82%',
                    rotateY: reducedMotion ? 0 : leftWingRotateY,
                    rotateZ: reducedMotion ? 0 : leftWingRotateZ,
                    rotateX: reducedMotion ? 0 : leftWingRotateX,
                    transformStyle: 'preserve-3d',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                  }}
                  className="w-1/2 h-full overflow-hidden relative pointer-events-none will-change-transform transform-gpu"
                >
                  <img
                    src={logoImg}
                    alt="Left Wing"
                    className="absolute left-0 top-0 w-[200%] h-full max-w-none object-contain pointer-events-none"
                    draggable={false}
                  />
                </motion.div>

                {/* Right Wing (Hinged at lower joint so lower part stays anchored and only upper parts flap) */}
                <motion.div
                  style={{
                    transformOrigin: 'left 82%',
                    rotateY: reducedMotion ? 0 : rightWingRotateY,
                    rotateZ: reducedMotion ? 0 : rightWingRotateZ,
                    rotateX: reducedMotion ? 0 : rightWingRotateX,
                    transformStyle: 'preserve-3d',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                  }}
                  className="w-1/2 h-full overflow-hidden relative pointer-events-none will-change-transform transform-gpu"
                >
                  <img
                    src={logoImg}
                    alt="Right Wing"
                    className="absolute right-0 top-0 w-[200%] h-full max-w-none object-contain pointer-events-none"
                    draggable={false}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Scroll to Move Prompt Text & Downward Arrow - Hovers smoothly with the logo in static state */}
          <motion.div
            style={{
              opacity: promptOpacity,
              y: promptY,
            }}
            onClick={onTriggerReveal}
            className="absolute top-1/2 mt-14 sm:mt-16 flex flex-col items-center gap-1.5 cursor-pointer group pointer-events-auto z-30 select-none"
          >
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#00E6D2] font-mono group-hover:text-white drop-shadow-[0_0_10px_rgba(0,230,210,0.6)] transition-colors">
              scroll to move
            </span>
            <motion.div
              animate={
                reducedMotion
                  ? {}
                  : {
                    y: [0, 5, 0],
                    opacity: [0.65, 1, 0.65],
                  }
              }
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ChevronDown className="w-4 h-4 text-[#00E6D2] group-hover:text-white drop-shadow-[0_0_10px_rgba(0,230,210,0.7)] transition-colors" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
