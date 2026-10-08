import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import loadingVideoWebm from '../assets/loadinganimation.webm';
import loadingVideoMp4 from '../assets/loadinganimation.mp4';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleComplete = (delayMs = 650) => {
    if (completedRef.current) return;
    completedRef.current = true;

    // Keep video frozen on the final still frame
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {}
    }

    // Stay still for a brief moment before fading out
    finishTimeoutRef.current = setTimeout(() => {
      // Restore smooth scroll when finished
      if ((window as any).__lenis) {
        try {
          (window as any).__lenis.start();
          (window as any).__lenis.scrollTo(0, { immediate: true });
        } catch {}
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      onComplete();
    }, delayMs);
  };

  useEffect(() => {
    // Lock scroll during loading animation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    if ((window as any).__lenis) {
      try {
        (window as any).__lenis.stop();
      } catch {}
    }

    // Adaptive fast-path for slow connections (2G/3G or Data Saver)
    const isSlowConnection =
      typeof navigator !== 'undefined' &&
      ((navigator as any).connection?.saveData ||
        (navigator as any).connection?.effectiveType === '2g' ||
        (navigator as any).connection?.effectiveType === '3g');

    if (isSlowConnection) {
      const fastTimer = setTimeout(() => {
        handleComplete(300);
      }, 1000);
      return () => {
        document.body.style.overflow = originalOverflow;
        document.documentElement.style.overflow = '';
        clearTimeout(fastTimer);
      };
    }

    // Start video playback on normal/fast connections
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Loading video autoplay note:', err);
        });
      }
    }

    // Safety fallback: if video doesn't end within ~4.5 seconds, complete automatically
    const safetyTimer = setTimeout(() => {
      handleComplete(0);
    }, 4500);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = '';
      clearTimeout(safetyTimer);
      if (finishTimeoutRef.current) {
        clearTimeout(finishTimeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black overflow-hidden select-none"
    >
      {/* Centered Logo Animation Video Element */}
      <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl px-6 flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => handleComplete(650)}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration && v.currentTime >= v.duration - 0.05) {
              handleComplete(650);
            } else if (v.currentTime >= 5.0) {
              handleComplete(650);
            }
          }}
          className="w-full max-h-[55vh] object-contain"
        >
          <source src={loadingVideoWebm} type="video/webm" />
          <source src="/videos/loadinganimation.webm" type="video/webm" />
          <source src={loadingVideoMp4} type="video/mp4" />
          <source src="/videos/loadinganimation.mp4" type="video/mp4" />
        </video>
      </div>
    </motion.div>
  );
};
