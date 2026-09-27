import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../../assets/logo.png';

interface HeroBubbleWingsProps {
  reducedMotion?: boolean;
}

export const HeroBubbleWings: React.FC<HeroBubbleWingsProps> = ({
  reducedMotion = false,
}) => {
  // Slow, smooth majestic flapping loop duration
  const flapDuration = 3.8;

  return (
    <div className="relative w-full max-w-[460px] mx-auto flex flex-col items-center justify-center select-none py-0">
      {/* Ambient Cyber Nebula Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] bg-radial from-[#00FFE5]/15 via-[#00E6D2]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Glass Sphere & Orbital Rings Container */}
      <div className="relative w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] lg:w-[330px] lg:h-[330px] xl:w-[360px] xl:h-[360px] flex items-center justify-center">

        {/* 3D Cyber Orbital Gyro Rings */}
        <motion.div
          animate={reducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-14px] sm:inset-[-20px] rounded-full border border-[#00FFE5]/25 pointer-events-none [transform:rotateX(65deg)_rotateY(18deg)] shadow-[0_0_20px_rgba(0,255,229,0.15)]"
        >
          {/* Orbital Satellite Node */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00FFE5] shadow-[0_0_10px_#00FFE5]" />
        </motion.div>

        <motion.div
          animate={reducedMotion ? {} : { rotate: -360 }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-10px] sm:inset-[-15px] rounded-full border border-dashed border-[#00E6D2]/20 pointer-events-none [transform:rotateX(72deg)_rotateY(-24deg)]"
        >
          {/* Second Orbital Node */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-[#00E6D2] shadow-[0_0_10px_#00E6D2]" />
        </motion.div>

        {/* THE GLASS BUBBLE (SPHERE) */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center backdrop-blur-[6px] border border-white/30 shadow-[inset_0_0_40px_rgba(0,255,229,0.22),inset_0_0_16px_rgba(255,255,255,0.45),0_0_50px_rgba(0,230,210,0.3),0_0_80px_rgba(0,255,229,0.15)]"
          style={{
            background:
              'radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.22) 0%, rgba(0, 255, 229, 0.08) 35%, rgba(6, 16, 24, 0.55) 75%, rgba(0, 230, 210, 0.2) 100%)',
          }}
        >
          {/* Glass Top-Left Specular Reflection Crescent */}
          <div className="absolute top-[8%] left-[12%] w-[48%] h-[32%] rounded-[100%] bg-gradient-to-br from-white/50 via-white/10 to-transparent blur-[2px] transform -rotate-[32deg] pointer-events-none" />

          {/* Glass Bottom-Right Subtle Rim Highlight */}
          <div className="absolute bottom-[6%] right-[10%] w-[38%] h-[20%] rounded-[100%] bg-gradient-to-tl from-[#00FFE5]/35 via-transparent to-transparent blur-[3px] pointer-events-none" />

          {/* Bottom Receiver Glow where beam strikes the bubble */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-16 rounded-[100%] bg-gradient-to-t from-[#00FFE5]/45 via-[#00FFE5]/15 to-transparent blur-md pointer-events-none" />

          {/* Internal Holographic Grid Horizon Arc */}
          <div className="absolute inset-0 rounded-full border-t border-[#00FFE5]/30 pointer-events-none [transform:rotateX(60deg)] opacity-40" />

          {/* Inner Cyan Ambient Core Flare */}
          <motion.div
            animate={
              reducedMotion
                ? {}
                : {
                  scale: [0.95, 1.1, 0.95],
                  opacity: [0.25, 0.45, 0.25],
                }
            }
            transition={{
              duration: flapDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-36 h-36 rounded-full bg-radial from-[#00FFE5]/35 via-[#00E6D2]/15 to-transparent blur-2xl pointer-events-none"
          />

          {/* 3D FLAPPING WINGS SYSTEM (Preserving exact original logo shape & span) */}
          <motion.div
            animate={
              reducedMotion
                ? {}
                : {
                    y: [-3, 3, -3],
                  }
            }
            transition={{
              duration: flapDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-[155px] h-[155px] sm:w-[190px] sm:h-[190px] lg:w-[215px] lg:h-[215px] xl:w-[235px] xl:h-[235px] flex items-center justify-center pointer-events-none"
          >
            {/* Ambient Cyan Glow Quad (Fast cached GPU quad) */}
            <div className="absolute w-[85%] h-[85%] rounded-full bg-radial from-[#00FFE5]/35 via-[#00E6D2]/15 to-transparent blur-xl pointer-events-none" />

            {/* 3D Perspective Stage */}
            <div
              style={{
                perspective: '750px',
                perspectiveOrigin: '50% 55%',
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Volumetric Internal Cast Shadow on the rear bubble wall */}
              <div
                style={{
                  transform: 'translateZ(-40px)',
                }}
                className="absolute w-[78%] h-[74%] rounded-full bg-cyan-950/50 blur-lg pointer-events-none"
              />

              {/* Left Wing (Smooth 3D flap - zero scale distortion) */}
              <motion.div
                animate={
                  reducedMotion
                    ? {}
                    : {
                        rotateY: [-20, 26, -20],
                        rotateZ: [5, -8, 5],
                        rotateX: [-4, 6, -4],
                      }
                }
                transition={{
                  duration: flapDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  transformOrigin: 'right 82% 0px',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                className="w-1/2 h-full relative will-change-transform transform-gpu"
              >
                {/* 3D Extruded Bevel Backing (Precise alignment, no displacement) */}
                <div
                  className="w-full h-full overflow-hidden absolute inset-0 pointer-events-none"
                  style={{
                    transform: 'translateZ(-2px)',
                    filter: 'brightness(0.55)',
                  }}
                >
                  <img
                    src={logoImg}
                    alt="Left Wing Shadow"
                    className="absolute left-0 top-0 w-[200%] h-full max-w-none object-contain pointer-events-none"
                    draggable={false}
                  />
                </div>

                {/* 3D Front Face (Exact original logo half) */}
                <div
                  className="w-full h-full overflow-hidden absolute inset-0 pointer-events-none"
                  style={{
                    transform: 'translateZ(1px)',
                  }}
                >
                  <img
                    src={logoImg}
                    alt="Left Wing"
                    className="absolute left-0 top-0 w-[200%] h-full max-w-none object-contain pointer-events-none"
                    draggable={false}
                  />
                </div>
              </motion.div>

              {/* Right Wing (Smooth symmetrical 3D flap - zero scale distortion) */}
              <motion.div
                animate={
                  reducedMotion
                    ? {}
                    : {
                        rotateY: [20, -26, 20],
                        rotateZ: [-5, 8, -5],
                        rotateX: [-4, 6, -4],
                      }
                }
                transition={{
                  duration: flapDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  transformOrigin: 'left 82% 0px',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                className="w-1/2 h-full relative will-change-transform transform-gpu"
              >
                {/* 3D Extruded Bevel Backing (Precise alignment, no displacement) */}
                <div
                  className="w-full h-full overflow-hidden absolute inset-0 pointer-events-none"
                  style={{
                    transform: 'translateZ(-2px)',
                    filter: 'brightness(0.55)',
                  }}
                >
                  <img
                    src={logoImg}
                    alt="Right Wing Shadow"
                    className="absolute right-0 top-0 w-[200%] h-full max-w-none object-contain pointer-events-none"
                    draggable={false}
                  />
                </div>

                {/* 3D Front Face (Exact original logo half) */}
                <div
                  className="w-full h-full overflow-hidden absolute inset-0 pointer-events-none"
                  style={{
                    transform: 'translateZ(1px)',
                  }}
                >
                  <img
                    src={logoImg}
                    alt="Right Wing"
                    className="absolute right-0 top-0 w-[200%] h-full max-w-none object-contain pointer-events-none"
                    draggable={false}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* HOLOGRAPHIC LIGHT BEAM (Projected from the middle of the rock platform beneath) */}
      <div className="relative w-full flex flex-col items-center -mt-10 sm:-mt-12 pointer-events-none">
        {/* Holographic Projection Light Cone */}
        <div className="relative w-38 sm:w-48 h-14 sm:h-16 flex items-center justify-center pointer-events-none">
          {/* Outer Soft Light Cone */}
          <div
            className="w-full h-full bg-gradient-to-t from-[#00FFE5]/50 via-[#00E6D2]/20 to-transparent blur-[2px]"
            style={{
              clipPath: 'polygon(32% 0%, 68% 0%, 92% 100%, 8% 100%)',
            }}
          />

          {/* High-Intensity Center Laser Beam */}
          <div
            className="absolute inset-0 w-16 sm:w-22 mx-auto bg-gradient-to-t from-[#00FFE5]/85 via-[#00FFE5]/35 to-transparent blur-[1px]"
            style={{
              clipPath: 'polygon(38% 0%, 62% 0%, 86% 100%, 14% 100%)',
            }}
          />

          {/* Vertical Hologram Scanlines / Energy Light Strands */}
          <div className="absolute inset-0 flex justify-center gap-2.5 sm:gap-3 opacity-85 pointer-events-none">
            <div className="w-px h-full bg-gradient-to-t from-[#00FFE5] via-[#00FFE5]/60 to-transparent" />
            <div className="w-px h-full bg-gradient-to-t from-white via-[#00FFE5]/75 to-transparent" />
            <div className="w-px h-full bg-gradient-to-t from-[#00FFE5] via-[#00FFE5]/60 to-transparent" />
          </div>
        </div>

        {/* Emitter Base Laser Glow Flush in the Middle of the Rock Dais */}
        <div className="w-36 sm:w-46 h-5 -mt-2.5 rounded-[100%] border border-[#00FFE5]/90 bg-[#00FFE5]/20 shadow-[0_0_25px_#00FFE5,inset_0_0_12px_rgba(0,255,229,0.7)] flex items-center justify-center">
          {/* Intense Core Emitter Hotspot */}
          <div className="w-20 sm:w-28 h-2 rounded-[100%] bg-white shadow-[0_0_12px_#00FFE5] blur-[1px] animate-pulse" />
        </div>
      </div>
    </div>
  );
};
