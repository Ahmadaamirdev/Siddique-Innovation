import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { WorldMapOverlay } from './hero/WorldMapOverlay';
import { FlappingScrollLogo } from './hero/FlappingScrollLogo';
import { useSmoothScroll } from './SmoothScrollProvider';

export const Hero: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const isAnimatingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const { stopScroll, startScroll } = useSmoothScroll();

  // Intro reveal progress motion value [0 -> 1]
  const progress = useMotionValue(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Strict page lock on mount: absolutely zero downward scrolling allowed until Hero is visible
  useEffect(() => {
    (window as any).__heroRevealed = isRevealed;

    if (!isRevealed) {
      window.scrollTo(0, 0);
      (window as any).__lenis?.scrollTo(0, { immediate: true });
      stopScroll();

      // Lock document and body dimensions to viewport height
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100vh';
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';

      return () => {
        document.documentElement.style.overflow = '';
        document.documentElement.style.height = '';
        document.body.style.overflow = '';
        document.body.style.height = '';
        startScroll();
      };
    } else {
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
      startScroll();
    }
  }, [isRevealed, stopScroll, startScroll]);

  // Trigger the slower, majestic cinematic wing-flap ascension and unblur
  const triggerReveal = useCallback(() => {
    if (isRevealed || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    // Slower, ultra-smooth, majestic 3.8s flight progression
    animate(progress, 1, {
      duration: reducedMotion ? 0.3 : 3.8,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        // ONLY unlock downward website scrolling AFTER the wings finish and Hero is 100% visible!
        setIsRevealed(true);
        (window as any).__heroRevealed = true;
        isAnimatingRef.current = false;
        document.documentElement.style.overflow = '';
        document.documentElement.style.height = '';
        document.body.style.overflow = '';
        document.body.style.height = '';
        startScroll();
        (window as any).__lenis?.start();
      },
    });
  }, [isRevealed, progress, reducedMotion, startScroll]);

  // Intercept all scroll gestures in the capture phase to strictly prevent downward page scrolling
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

  // Optimized Dynamic Blur & Clarity Transforms
  const blurAmount = useTransform(progress, [0.25, 0.95], [16, 0]);
  const heroFilter = useTransform(
    blurAmount,
    (b) => (reducedMotion || b < 0.2 ? 'none' : `blur(${b.toFixed(1)}px)`)
  );
  const heroBrightness = useTransform(progress, [0.25, 0.95], [0.6, 1]);
  const heroScale = useTransform(progress, [0.25, 0.95], [0.98, 1]);
  const overlayOpacity = useTransform(progress, [0.25, 0.92], [0.65, 0]);

  // Parallax Depth Transforms
  const foregroundX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const foregroundY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);
  const backgroundX = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);
  const backgroundY = useTransform(mouseY, [-0.5, 0.5], [-3, 3]);

  // Motion Spec v1.0 Easing
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



  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative pt-24 sm:pt-28 pb-14 sm:pb-16 min-h-screen bg-[#050505] bg-hero-radial-premium flex flex-col justify-center select-none overflow-hidden transform-gpu"
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
        className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-radial from-[#00E6D2]/15 via-[#00FFE5]/5 to-transparent blur-3xl rounded-full pointer-events-none -z-0 transform-gpu will-change-transform"
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
        className="absolute top-10 left-10 w-[350px] h-[350px] bg-radial from-[#00FFE5]/5 to-transparent blur-3xl rounded-full pointer-events-none -z-0 transform-gpu will-change-transform"
      />

      {/* Hero Content Container with dynamic blur, brightness, and scale */}
      <motion.div
        style={{
          filter: heroFilter,
          scale: heroScale,
          opacity: heroBrightness,
        }}
        className={`w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 pt-20 sm:pt-24 lg:pt-14 transform-gpu will-change-transform ${isRevealed ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
      >
        <motion.div
          style={{
            x: reducedMotion ? 0 : foregroundX,
            y: reducedMotion ? 0 : foregroundY,
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 sm:space-y-8 transform-gpu will-change-transform"
        >
          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-white tracking-[-0.03em] leading-[1.12] font-heading max-w-4xl mx-auto"
          >
            <span>Innovation That Builds, </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_30px_rgba(0,230,210,0.4)]">
              Automates &amp; Grows
            </span>{' '}
            <span>Businesses</span>
          </motion.h1>

          {/* Subheading / Description Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-normal leading-relaxed font-sans"
          >
            Siddiqui Innovations helps businesses build high-performing websites, automate repetitive processes with AI and strengthen their digital presence through strategic marketing solutions designed around their goals.
          </motion.p>

          {/* Actions & Social Links Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2"
          >
            {/* CTA Button: Contact Us */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_25px_rgba(0,230,210,0.4)] hover:shadow-[0_0_40px_rgba(0,255,229,0.7)] transition-all duration-300 font-heading cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>

            {/* Social Links: Insta, fb & Linked in */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <motion.a
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/siddiqui_innovations?igsh=MTYwNGUwbG1oNHoxZw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-[#0A1218]/90 border border-[#00E6D2]/30 hover:border-[#00FFE5] hover:bg-[#00E6D2]/15 flex items-center justify-center text-gray-300 hover:text-[#00FFE5] transition-all duration-300 shadow-[0_0_15px_rgba(0,230,210,0.1)] hover:shadow-[0_0_20px_rgba(0,255,229,0.35)]"
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
                className="w-11 h-11 rounded-xl bg-[#0A1218]/90 border border-[#00E6D2]/30 hover:border-[#00FFE5] hover:bg-[#00E6D2]/15 flex items-center justify-center text-gray-300 hover:text-[#00FFE5] transition-all duration-300 shadow-[0_0_15px_rgba(0,230,210,0.1)] hover:shadow-[0_0_20px_rgba(0,255,229,0.35)]"
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
                className="w-11 h-11 rounded-xl bg-[#0A1218]/90 border border-[#00E6D2]/30 hover:border-[#00FFE5] hover:bg-[#00E6D2]/15 flex items-center justify-center text-gray-300 hover:text-[#00FFE5] transition-all duration-300 shadow-[0_0_15px_rgba(0,230,210,0.1)] hover:shadow-[0_0_20px_rgba(0,255,229,0.35)]"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.222 0h.003z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Dimmed backdrop-blur overlay that dissolves on reveal */}
      {!isRevealed && (
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[#050505]/45 backdrop-blur-sm pointer-events-none z-20"
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
