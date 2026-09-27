import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import type { MotionValue, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FlappingScrollLogo } from './hero/FlappingScrollLogo';
import { HeroBubbleWings } from './hero/HeroBubbleWings';
import { useSmoothScroll } from './SmoothScrollProvider';
import heroBg from '../assets/hero_bg.png';

export interface HeroProps {
  progressProp?: MotionValue<number>;
  isRevealedProp?: boolean;
  onRevealedChange?: (revealed: boolean) => void;
}

export const Hero: React.FC<HeroProps> = ({
  progressProp,
  isRevealedProp,
  onRevealedChange,
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [internalRevealed, setInternalRevealed] = useState(true);
  const isRevealed = isRevealedProp !== undefined ? isRevealedProp : internalRevealed;

  const setIsRevealed = useCallback((val: boolean) => {
    setInternalRevealed(val);
    onRevealedChange?.(val);
  }, [onRevealedChange]);

  const isAnimatingRef = useRef(false);
  const { stopScroll, startScroll } = useSmoothScroll();

  // Intro reveal progress motion value [0 -> 1]
  const internalProgress = useMotionValue(0);
  const progress = progressProp || internalProgress;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Strict page scroll management without mutating document.body layout dimensions
  // (Prevents expensive 15,000px DOM layout thrashing and reflow on reveal completion)
  useEffect(() => {
    (window as any).__heroRevealed = isRevealed;

    if (!isRevealed) {
      window.scrollTo(0, 0);
      (window as any).__lenis?.scrollTo(0, { immediate: true });
      stopScroll();
    } else {
      startScroll();
      (window as any).__lenis?.start();
    }

    return () => {
      // Ensure scrolling is always re-enabled if Hero unmounts
      (window as any).__heroRevealed = true;
      startScroll();
      (window as any).__lenis?.start();
    };
  }, [isRevealed, stopScroll, startScroll]);

  // Trigger the lightweight, smooth cinematic wing-flap ascension
  const triggerReveal = useCallback(() => {
    if (isRevealed || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    // Slower, majestic, cinematic 3.8s flight progression
    animate(progress, 1, {
      duration: reducedMotion ? 0.3 : 3.8,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        setIsRevealed(true);
        (window as any).__heroRevealed = true;
        isAnimatingRef.current = false;
        startScroll();
        (window as any).__lenis?.start();
      },
    });
  }, [isRevealed, progress, reducedMotion, setIsRevealed, startScroll]);

  // Intercept scroll gestures before reveal without touching document style dimensions
  useEffect(() => {
    if (isRevealed) return;

    const handleWheel = (e: WheelEvent) => {
      if (isRevealed) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      triggerReveal();
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isRevealed) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) > 8) {
        triggerReveal();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isRevealed) return;
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        triggerReveal();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [isRevealed, triggerReveal]);

  // Dynamic Blur & Clarity Transforms (Optimized to max 8px to eliminate GPU fill bottleneck)
  const blurAmount = useTransform(progress, [0.10, 0.92], [8, 0]);
  const heroFilter = useTransform(
    blurAmount,
    (b) => (reducedMotion || b < 0.2 ? 'none' : `blur(${b.toFixed(1)}px)`)
  );
  const heroBrightness = useTransform(progress, [0.10, 0.92], [0.45, 1]);
  const heroScale = useTransform(progress, [0.10, 0.92], [0.96, 1]);
  const overlayOpacity = useTransform(progress, [0.10, 0.88], [0.85, 0]);

  // Decelerating cubic-bezier curve for smooth cinematic entrance
  const smoothEase = [0.16, 1, 0.3, 1] as const;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.1,
      },
    },
  };

  const textLeftVariants: Variants = {
    hidden: {
      opacity: 0,
      x: reducedMotion ? 0 : -80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reducedMotion ? 0.3 : 1.7,
        ease: smoothEase,
      },
    },
  };

  const bubbleEntranceVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 130,
      scale: reducedMotion ? 1 : 0.15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.3 : 2.4,
        ease: smoothEase,
        delay: reducedMotion ? 0 : 0.15,
      },
    },
  };

  return (
    <section
      className="relative pt-16 sm:pt-20 lg:pt-16 pb-8 sm:pb-10 min-h-screen lg:h-screen lg:max-h-[920px] bg-[#030608] flex flex-col justify-center select-none overflow-hidden transform-gpu"
    >
      {/* Background Image: Sci-Fi Cosmic Space & Pedestal Landscape */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src={heroBg}
          alt="Hero Background"
          className="w-full h-full object-cover object-bottom opacity-90 select-none pointer-events-none"
        />
        {/* Subtle dark vignettes to seamlessly integrate top navbar and bottom section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Soft Ambient Cyan Glow Orbs */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-radial from-[#00E6D2]/15 via-[#00FFE5]/5 to-transparent blur-3xl rounded-full pointer-events-none -z-0 transform-gpu" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-radial from-[#00FFE5]/5 to-transparent blur-3xl rounded-full pointer-events-none -z-0 transform-gpu" />

      {/* Hero Content Container (Lightweight GPU transforms) */}
      <motion.div
        style={
          isRevealed
            ? undefined
            : {
                filter: heroFilter,
                scale: heroScale,
                opacity: heroBrightness,
              }
        }
        className={`w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 pt-2 lg:pt-0 transform-gpu will-change-transform ${
          isRevealed ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center transform-gpu will-change-transform"
        >
          {/* LEFT COLUMN: Exact original headline, description, CTA and social links */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col text-left space-y-4 sm:space-y-5 lg:space-y-5">
            {/* Main Headline (Exact Original Content - comes from left) */}
            <motion.h1
              variants={textLeftVariants}
              className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-extrabold text-white tracking-[-0.03em] leading-[1.12] font-heading max-w-xl"
            >
              <span>Innovation That Builds, </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_30px_rgba(0,230,210,0.4)]">
                Automates &amp; Grows
              </span>{' '}
              <span>Businesses</span>
            </motion.h1>

            {/* Subheading / Description Paragraph (Exact Original Content - comes from left) */}
            <motion.p
              variants={textLeftVariants}
              className="text-gray-300 text-xs sm:text-sm lg:text-[15px] max-w-lg font-normal leading-relaxed font-sans"
            >
              Siddiqui Innovations helps businesses build high-performing websites, automate repetitive processes with AI and strengthen their digital presence through strategic marketing solutions designed around their goals.
            </motion.p>

            {/* Actions & Social Links Row (Exact Original Content - comes from left) */}
            <motion.div
              variants={textLeftVariants}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
            >
              {/* CTA Button: Contact Us */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group relative inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-xl font-bold text-sm sm:text-base text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_20px_rgba(0,230,210,0.4)] hover:shadow-[0_0_35px_rgba(0,255,229,0.7)] transition-all duration-300 font-heading cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.a>

              {/* Social Links: Insta, fb & LinkedIn */}
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <motion.a
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.instagram.com/siddiqui_innovations?igsh=MTYwNGUwbG1oNHoxZw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#0A1218]/90 border border-[#00E6D2]/30 hover:border-[#00FFE5] hover:bg-[#00E6D2]/15 flex items-center justify-center text-gray-300 hover:text-[#00FFE5] transition-all duration-300 shadow-[0_0_15px_rgba(0,230,210,0.1)] hover:shadow-[0_0_20px_rgba(0,255,229,0.35)]"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </motion.a>

                {/* Facebook */}
                <motion.a
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#0A1218]/90 border border-[#00E6D2]/30 hover:border-[#00FFE5] hover:bg-[#00E6D2]/15 flex items-center justify-center text-gray-300 hover:text-[#00FFE5] transition-all duration-300 shadow-[0_0_15px_rgba(0,230,210,0.1)] hover:shadow-[0_0_20px_rgba(0,255,229,0.35)]"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#0A1218]/90 border border-[#00E6D2]/30 hover:border-[#00FFE5] hover:bg-[#00E6D2]/15 flex items-center justify-center text-gray-300 hover:text-[#00FFE5] transition-all duration-300 shadow-[0_0_15px_rgba(0,230,210,0.1)] hover:shadow-[0_0_20px_rgba(0,255,229,0.35)]"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: The Glowing Bubble with 3D Flapping Wings (emerging from bottom to current size) */}
          <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center lg:-translate-x-18 xl:-translate-x-24 2xl:-translate-x-28">
            <motion.div
              variants={bubbleEntranceVariants}
              style={{ transformOrigin: '50% 95%' }}
              className="w-full flex items-center justify-center"
            >
              <HeroBubbleWings reducedMotion={reducedMotion} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Dimmed backdrop-blur overlay that dissolves on reveal */}
      {!isRevealed && (
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[#050505]/60 backdrop-blur-md pointer-events-none z-20"
        />
      )}

      {/* 3D Flapping Wing Logo & Scroll Down prompt overlay */}
      <FlappingScrollLogo
        progress={progress}
        onTriggerReveal={triggerReveal}
        isRevealed={isRevealed}
        reducedMotion={reducedMotion}
      />
    </section>
  );
};

export default Hero;
