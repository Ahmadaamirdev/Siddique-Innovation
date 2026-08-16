import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Search,
  Bot,
  Code2,
  Megaphone,
} from 'lucide-react';
import { LaptopScene } from './hero/LaptopScene';
import { WorldMapOverlay } from './hero/WorldMapOverlay';

export const Hero: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Multi-Layer 3D Damped Parallax Mouse Tracking
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const mouseX = useSpring(rawMouseX, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(rawMouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const { clientX, clientY } = e;
    if (animFrameRef.current !== null) return;
    animFrameRef.current = requestAnimationFrame(() => {
      const { innerWidth, innerHeight } = window;
      const normX = clientX / innerWidth - 0.5;
      const normY = clientY / innerHeight - 0.5;
      rawMouseX.set(normX);
      rawMouseY.set(normY);
      animFrameRef.current = null;
    });
  };

  // Scroll Parallax
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, 25]);
  const visualY = useTransform(scrollY, [0, 500], [0, 45]);

  // Multi-Layer Depth Transforms (Foreground vs Midground vs Background)
  const foregroundX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const foregroundY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);
  const combinedVisualY = useTransform(
    [visualY, foregroundY],
    ([v, f]) => (v as number) + (f as number)
  );

  const backgroundX = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);
  const backgroundY = useTransform(mouseY, [-0.5, 0.5], [-3, 3]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [2.5, -2.5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-2.5, 2.5]);

  // Motion Spec v1.0 Easing: Entrance cubic-bezier(.22,.61,.36,1)
  const entranceEase = [0.22, 0.61, 0.36, 1] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: entranceEase },
    },
  };

  const badgeContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.45,
      },
    },
  };

  const badgeItemVariants = {
    hidden: { opacity: 0, scale: 0.88, y: 12 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.45, ease: entranceEase },
    },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative pt-24 sm:pt-28 lg:pt-28 pb-12 sm:pb-16 min-h-[calc(100vh-80px)] lg:min-h-[680px] bg-[#050505] bg-hero-radial-premium flex items-center justify-center select-none overflow-hidden transform-gpu"
    >
      {/* Background Layer: Animated Interactive World Map */}
      <motion.div
        style={{
          x: reducedMotion ? 0 : backgroundX,
          y: reducedMotion ? 0 : backgroundY,
        }}
        className="absolute inset-0 pointer-events-none -z-0 transform-gpu will-change-transform"
      >
        <WorldMapOverlay />
      </motion.div>

      {/* Soft Ambient Breathing Cyan Glow Orbs */}
      <motion.div
        animate={
          reducedMotion
            ? { opacity: 0.3 }
            : {
              opacity: [0.2, 0.45, 0.2],
              scale: [0.95, 1.05, 0.95],
            }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-radial from-[#00E6D2]/15 via-[#00FFE5]/5 to-transparent blur-[120px] rounded-full pointer-events-none -z-0 transform-gpu will-change-transform"
      />
      <motion.div
        animate={
          reducedMotion
            ? { opacity: 0.2 }
            : {
              opacity: [0.15, 0.35, 0.15],
              scale: [1, 1.08, 1],
            }
        }
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-10 left-10 w-[350px] h-[350px] bg-radial from-[#00FFE5]/5 to-transparent blur-[100px] rounded-full pointer-events-none -z-0 transform-gpu will-change-transform"
      />

      {/* Hero Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column Content (Choreographed Staggered Reveal) */}
          <motion.div
            style={{ y: contentY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="col-span-1 lg:col-span-5 space-y-5 lg:space-y-6 max-w-[560px] transform-gpu will-change-transform"
          >


            {/* Main Headline (Strict 4 lines) */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[44px] font-extrabold text-white tracking-[-0.03em] leading-[1.15] max-w-[600px] font-heading"
            >
              <span className="block whitespace-nowrap">Helping Businesses</span>
              <span className="block whitespace-nowrap">Grow Through</span>
              <span className="block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_25px_rgba(0,230,210,0.4)]">
                AI Automation, SEO
              </span>
              <span className="block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_25px_rgba(0,230,210,0.4)]">
                & Modern Websites
              </span>
            </motion.h1>

            {/* Subheading / Description Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-sm sm:text-base lg:text-[15px] max-w-[520px] font-normal leading-relaxed font-sans"
            >
              We build high-converting websites, automate repetitive workflows, improve Google rankings and create digital marketing systems that generate more leads and revenue.
            </motion.p>

            {/* Staggered Technology Badges */}
            <motion.div
              variants={badgeContainerVariants}
              className="flex flex-wrap items-center gap-2 pt-1"
            >
              <motion.div
                variants={badgeItemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-200 bg-[#0E141B]/90 border border-[#00E6D2]/25 hover:border-[#00FFE5] shadow-[0_0_10px_rgba(0,230,210,0.08)] hover:shadow-[0_0_15px_rgba(0,255,229,0.25)] transition-all duration-300"
              >
                <Search className="w-3.5 h-3.5 text-[#00E6D2] group-hover:rotate-6 transition-transform" />
                <span>SEO Expert</span>
              </motion.div>

              <motion.div
                variants={badgeItemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-200 bg-[#0E141B]/90 border border-[#00E6D2]/25 hover:border-[#00FFE5] shadow-[0_0_10px_rgba(0,230,210,0.08)] hover:shadow-[0_0_15px_rgba(0,255,229,0.25)] transition-all duration-300"
              >
                <Bot className="w-3.5 h-3.5 text-[#00E6D2] group-hover:rotate-6 transition-transform" />
                <span>AI Automation</span>
              </motion.div>

              <motion.div
                variants={badgeItemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-200 bg-[#0E141B]/90 border border-[#00E6D2]/25 hover:border-[#00FFE5] shadow-[0_0_10px_rgba(0,230,210,0.08)] hover:shadow-[0_0_15px_rgba(0,255,229,0.25)] transition-all duration-300"
              >
                <Code2 className="w-3.5 h-3.5 text-[#00E6D2] group-hover:rotate-6 transition-transform" />
                <span>Web Development</span>
              </motion.div>

              <motion.div
                variants={badgeItemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-200 bg-[#0E141B]/90 border border-[#00E6D2]/25 hover:border-[#00FFE5] shadow-[0_0_10px_rgba(0,230,210,0.08)] hover:shadow-[0_0_15px_rgba(0,255,229,0.25)] transition-all duration-300"
              >
                <Megaphone className="w-3.5 h-3.5 text-[#00E6D2] group-hover:rotate-6 transition-transform" />
                <span>Digital Marketing</span>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-row items-center gap-3.5 sm:gap-4 pt-1">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_25px_rgba(0,230,210,0.4)] hover:shadow-[0_0_40px_rgba(0,255,229,0.7)] transition-all duration-300 font-heading"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.a>

              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#0A1218]/80 border border-[#00E6D2]/30 hover:border-[#00FFE5] hover:bg-[#00E6D2]/10 shadow-[0_0_15px_rgba(0,230,210,0.05)] transition-all duration-300 font-heading"
              >
                <span>View Our Work</span>
                <ArrowUpRight className="w-4 h-4 text-[#00E6D2] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Visual Column (3D Laptop Scene & Interactive Command Center) */}
          <motion.div
            style={{
              x: reducedMotion ? 0 : foregroundX,
              y: reducedMotion ? visualY : combinedVisualY,
              rotateX: reducedMotion ? 0 : rotateX,
              rotateY: reducedMotion ? 0 : rotateY,
            }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: entranceEase }}
            className="col-span-1 lg:col-span-7 relative flex justify-center items-center mt-6 lg:mt-0 max-w-[720px] w-full transform-gpu will-change-transform"
          >
            <LaptopScene reducedMotion={reducedMotion} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

