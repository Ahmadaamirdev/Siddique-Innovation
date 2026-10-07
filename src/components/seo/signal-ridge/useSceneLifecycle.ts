import { useCallback, useEffect, useRef, useState } from 'react';

interface UseSceneLifecycleOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onTick: (time: number, dt: number) => void;
  onResize: (width: number, height: number) => void;
  enabled?: boolean;
}

export function useSceneLifecycle({
  containerRef,
  onTick,
  onResize,
  enabled = true,
}: UseSceneLifecycleOptions) {
  // Start as true so the animation kicks off immediately on mount.
  // IntersectionObserver will flip this to false when scrolled off-screen (saves GPU).
  const [isInView, setIsInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(
    typeof document !== 'undefined' ? !document.hidden : true
  );

  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const elapsedTimeRef = useRef<number>(0);
  const onTickRef = useRef(onTick);
  const onResizeRef = useRef(onResize);

  onTickRef.current = onTick;
  onResizeRef.current = onResize;

  // Track tab visibility
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibility = () => {
      const visible = !document.hidden;
      setIsTabVisible(visible);
      if (visible) {
        lastTimeRef.current = null; // reset dt to avoid big delta
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Track viewport intersection
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          lastTimeRef.current = null;
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  // Track container sizing with ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          onResizeRef.current(width, height);
        }
      }
    });

    ro.observe(el);
    return () => {
      ro.disconnect();
    };
  }, [containerRef]);

  // Animation frame loop with dt cap at 0.05s
  useEffect(() => {
    if (!enabled || !isInView || !isTabVisible) {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    const loop = (currentTimeMs: number) => {
      const currentTimeSec = currentTimeMs / 1000;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTimeSec;
      }

      // Cap delta time at 0.05s (50ms) as required
      const rawDt = currentTimeSec - lastTimeRef.current;
      const dt = Math.min(Math.max(rawDt, 0), 0.05);
      lastTimeRef.current = currentTimeSec;

      elapsedTimeRef.current += dt;
      onTickRef.current(elapsedTimeRef.current, dt);

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [enabled, isInView, isTabVisible]);

  // Stable reference — MUST be useCallback so that useEffect([replayTrigger, resetTimer])
  // in the scene component doesn't re-run every frame (which would zero the timer constantly).
  const resetTimer = useCallback(() => {
    elapsedTimeRef.current = 0;
    lastTimeRef.current = null;
  }, []);

  return {
    isInView,
    isTabVisible,
    resetTimer,
  };
}
