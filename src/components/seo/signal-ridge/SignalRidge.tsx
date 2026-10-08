import React, { useState, useEffect, lazy, Suspense } from 'react';
import type { HoveredColumnInfo } from './types';
import { StatOverlay } from './StatOverlay';
import { SignalRidgeSkeleton } from './SignalRidgeSkeleton';
import { SignalRidgeFallback } from './SignalRidgeFallback';

// Lazy-load the Three.js 3D scene component so Three.js does not bloat initial bundle
const LazySignalRidgeScene = lazy(() => import('./SignalRidgeScene'));

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function checkReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const SignalRidge: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [hoveredColumn, setHoveredColumn] = useState<HoveredColumnInfo | null>(null);
  const [juneProjected, setJuneProjected] = useState<{ x: number; y: number; visible: boolean } | null>(null);
  const [replayTrigger, setReplayTrigger] = useState(0);

  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const hasWebGL = checkWebGLSupport();
    const reducedMotion = checkReducedMotion();

    if (!hasWebGL || reducedMotion) {
      setUseFallback(true);
    }
  }, []);

  const handleReplay = () => {
    setProgress(0);
    setHoveredColumn(null);
    setJuneProjected(null);
    setReplayTrigger((prev) => prev + 1);
  };

  if (useFallback) {
    return (
      <div className="relative w-full mx-auto overflow-hidden">
        <SignalRidgeFallback />
        <StatOverlay
          progress={1}
          hoveredColumn={null}
          juneProjected={null}
          onReplay={handleReplay}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <Suspense fallback={<SignalRidgeSkeleton />}>
        <LazySignalRidgeScene
          onProgress={setProgress}
          onHoverColumn={setHoveredColumn}
          onJuneProjected={setJuneProjected}
          replayTrigger={replayTrigger}
        />
      </Suspense>

      <StatOverlay
        progress={progress}
        hoveredColumn={hoveredColumn}
        juneProjected={juneProjected}
        onReplay={handleReplay}
      />
    </div>
  );
};

export default SignalRidge;
