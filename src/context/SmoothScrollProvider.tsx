import React, { useEffect, createContext, useContext, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollContextType {
  lenis: Lenis | null;
  stopScroll: () => void;
  startScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  stopScroll: () => {},
  startScroll: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode; currentPath?: string }> = ({
  children,
  currentPath,
}) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Mobile & tablet touchscreens achieve silky 120Hz native compositor inertia without JS thread lag
    const isTouchDevice =
      ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
      window.matchMedia('(max-width: 1024px)').matches;
    if (isTouchDevice) {
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    lenis.start();
    document.documentElement.classList.remove('lenis-stopped');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    const handleLocationChange = () => {
      lenis.start();
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
    window.addEventListener('popstate', handleLocationChange);

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  // Watch currentPath prop changes across client-side router navigation
  useEffect(() => {
    if (currentPath && currentPath !== '/' && currentPath !== '') {
      (window as any).__heroRevealed = true;
      lenisRef.current?.start();
      (window as any).__lenis?.start();
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
  }, [currentPath]);

  const stopScroll = () => {
    lenisRef.current?.stop();
    (window as any).__lenis?.stop();
  };

  const startScroll = () => {
    lenisRef.current?.start();
    (window as any).__lenis?.start();
    document.documentElement.classList.remove('lenis-stopped');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, stopScroll, startScroll }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
