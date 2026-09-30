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

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // Only pause Lenis if strictly on homepage AND hero has never been revealed yet in this session
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
    let isIntroRevealed = false;
    try {
      isIntroRevealed = sessionStorage.getItem('si_intro_revealed') === 'true';
    } catch {}

    if (isHomePage && !isIntroRevealed && (window as any).__heroRevealed === false) {
      lenis.stop();
    } else {
      (window as any).__heroRevealed = true;
      lenis.start();
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // Safety watchdog: on popstate or URL change, ensure scroll is enabled
    const handleLocationChange = () => {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        (window as any).__heroRevealed = true;
        lenis.start();
        document.documentElement.classList.remove('lenis-stopped');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
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
