import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { WingsShowcase } from './hero/WingsShowcase';
import { FlappingScrollLogo } from './hero/FlappingScrollLogo';
import { useSmoothScroll } from './SmoothScrollProvider';
import heroBg from '../assets/hero_bg.png';

export interface HeroProps {
  progressProp?: MotionValue<number>;
  isRevealedProp?: boolean;
  onRevealedChange?: (revealed: boolean) => void;
  onNavigate?: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  progressProp,
  isRevealedProp = false,
  onRevealedChange,
  onNavigate,
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [localRevealed, setLocalRevealed] = useState(isRevealedProp);
  const isRevealed = isRevealedProp || localRevealed;

  const fallbackProgress = useMotionValue(isRevealed ? 1 : 0);
  const progress = progressProp || fallbackProgress;

  const isAnimatingRef = useRef(false);
  const { stopScroll, startScroll } = useSmoothScroll();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Strict page lock on mount: zero downward scrolling allowed until intro completes
  useEffect(() => {
    (window as any).__heroRevealed = isRevealed;

    if (!isRevealed) {
      window.scrollTo(0, 0);
      (window as any).__lenis?.scrollTo(0, { immediate: true });
      stopScroll();

      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      return () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        startScroll();
      };
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      startScroll();
    }
  }, [isRevealed, stopScroll, startScroll]);

  // Trigger the majestic cinematic wing-flap ascension and unblur
  const triggerReveal = useCallback(() => {
    if (isRevealed || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    animate(progress, 1, {
      duration: reducedMotion ? 0.3 : 4.2,
      ease: [0.22, 1, 0.32, 1],
      onComplete: () => {
        setLocalRevealed(true);
        if (onRevealedChange) onRevealedChange(true);
        (window as any).__heroRevealed = true;
        isAnimatingRef.current = false;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        startScroll();
        (window as any).__lenis?.start();
      },
    });
  }, [isRevealed, onRevealedChange, progress, reducedMotion, startScroll]);

  // Intercept scroll/touch gestures to trigger intro reveal
  useEffect(() => {
    if (isRevealed) return;

    const handleWheel = (e: WheelEvent) => {
      if (isRevealed) return;
      e.preventDefault();
      e.stopPropagation();
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

  // Screen remains fully blurred and completely obscured until the wing animation completes
  const overlayOpacity = useTransform(progress, [0, 0.90, 1.0], [1, 1, 0]);
  const screenBlur = useTransform(progress, [0, 0.90, 1.0], [40, 40, 0]);
  const backdropFilterString = useTransform(
    screenBlur,
    (b) => (reducedMotion || b < 0.5 ? 'none' : `blur(${b.toFixed(1)}px)`)
  );

  return (
    <div className="relative w-full select-none" style={{ background: 'none' }}>

      {/* ============================================================== */}
      {/* WHOLE SCREEN CONTENT (Section 1 + Section 2)                   */}
      {/* Clean DOM layer without heavy filter re-rasterization          */}
      {/* ============================================================== */}
      <div className="relative w-full">
        {/* SECTION 1 — Full viewport height */}
        <section
          className="relative w-full h-screen min-h-[660px] max-h-[960px] flex flex-col justify-between items-center"
          style={{ zIndex: 10, background: '#050505', overflow: 'visible' }}
        >
          {/* Background image — clipped to section bounds independently */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <img
              src={heroBg}
              alt="Tech wave background"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none',
                filter: 'brightness(1.2) contrast(1.05)',
              }}
            />
            {/* Top vignette — blends under navbar */}
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '80px',
                background: 'linear-gradient(to bottom, rgba(5,5,5,0.8) 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
            {/* Bottom vignette — fades into the wings area below */}
            <div
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '220px',
                background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.5) 50%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Content Container */}
          <div className="w-full h-full flex flex-col justify-between items-center relative z-10">
            {/* Spacer for fixed navbar */}
            <div className="h-24 sm:h-28 lg:h-32 shrink-0 w-full" />

            {/* Centered headline & paragraph — Static without text emerge animation */}
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col items-center justify-center space-y-4 sm:space-y-5 -mt-6 sm:-mt-10">
              {/* H1 — Static clean text */}
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-extrabold text-white tracking-[-0.03em] leading-[1.12] font-heading max-w-2xl mx-auto py-1">
                <span className="block">
                  Innovation That Builds,
                </span>
                <span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]"
                  style={{ WebkitTextFillColor: 'transparent' }}
                >
                  Automates &amp; Grows
                </span>
                <span className="block">
                  Businesses
                </span>
              </h1>

              <p className="text-gray-300 text-xs sm:text-sm lg:text-[15px] max-w-lg mx-auto font-normal leading-relaxed font-sans">
                Siddiqui Innovations helps businesses build high-performing websites,
                automate repetitive processes with AI and strengthen their digital presence
                through strategic marketing solutions designed around their goals.
              </p>
            </div>

            {/* Small bottom buffer */}
            <div className="h-4 shrink-0" />
          </div>
        </section>

        {/* SECTION 2 — Wings Showcase */}
        <WingsShowcase onNavigate={onNavigate} />
      </div>

      {/* ============================================================== */}
      {/* WHOLE SCREEN BLUR OVERLAY (z-60)                               */}
      {/* Covers navbar, hero, background image, and wing tips completely*/}
      {/* Dissolves to 0 as scroll animation completes                   */}
      {/* ============================================================== */}
      {!isRevealed && (
        <motion.div
          style={{
            opacity: overlayOpacity,
            backdropFilter: backdropFilterString,
            WebkitBackdropFilter: backdropFilterString,
          }}
          className="fixed inset-0 z-60 bg-[#050505] pointer-events-none transform-gpu will-change-[opacity]"
        />
      )}

      {/* ============================================================== */}
      {/* 3D FLAPPING WING LOGO & SCROLL DOWN PROMPT (z-70)              */}
      {/* Crisp and sharp, floats above the whole screen blur            */}
      {/* ============================================================== */}
      {!isRevealed && (
        <div className="fixed inset-0 z-70 pointer-events-none">
          <FlappingScrollLogo
            progress={progress}
            isRevealed={isRevealed}
            reducedMotion={reducedMotion}
          />
        </div>
      )}
    </div>
  );
};

export default Hero;
