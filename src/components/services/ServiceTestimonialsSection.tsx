import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { WingLogo } from '../WingLogo';
import type { ServiceTestimonialCard } from '../../data/serviceProjectsAndTestimonials';

interface ServiceTestimonialsSectionProps {
  serviceName: string;
  testimonials: ServiceTestimonialCard[];
  subheading?: string;
}

export const ServiceTestimonialsSection: React.FC<ServiceTestimonialsSectionProps> = ({
  serviceName,
  testimonials,
  subheading = 'Real results, client success stories, and measurable growth delivered through our specialized services.',
}) => {
  const headingText = `${serviceName} Testimonials`;

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  const [isMuted, setIsMuted] = useState(true);
  const isMutedRef = useRef(true);
  isMutedRef.current = isMuted;

  const angleRef = useRef(0);
  const targetAngleRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    let animId: number | null = null;
    let lastActive = 0;
    let lastTime = performance.now();

    let rx = 320;
    let rz = 150;

    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        rx = width < 640 ? Math.min(width * 0.18, 70) : Math.min(width * 0.32, 330);
        rz = width < 640 ? Math.min(width * 0.12, 100) : Math.min(width * 0.15, 150);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions, { passive: true });

    const rotationSpeed = 0.04;

    const updateCarousel = (currentTime: number) => {
      if (!isVisibleRef.current) {
        animId = null;
        return;
      }

      const dt = Math.min((currentTime - lastTime) / 1000, 0.08);
      lastTime = currentTime;

      if (targetAngleRef.current !== null) {
        let diff = targetAngleRef.current - angleRef.current;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));

        if (Math.abs(diff) > 0.003) {
          angleRef.current += diff * Math.min(dt * 3, 0.15);
        } else {
          angleRef.current = targetAngleRef.current;
          targetAngleRef.current = null;
        }
      } else {
        angleRef.current += rotationSpeed * dt;
      }

      if (angleRef.current >= Math.PI * 2) {
        angleRef.current -= Math.PI * 2;
      } else if (angleRef.current < 0) {
        angleRef.current += Math.PI * 2;
      }

      let maxCos = -2;
      let currentFrontIdx = 0;

      for (let i = 0; i < 3; i++) {
        const el = cardRefs[i].current;
        if (!el) continue;

        const cardAngle = angleRef.current + (i * 2 * Math.PI) / 3;
        const sin = Math.sin(cardAngle);
        const cos = Math.cos(cardAngle);

        if (cos > maxCos) {
          maxCos = cos;
          currentFrontIdx = i;
        }

        const x = sin * rx;
        const z = cos * rz;
        const y = -cos * 6;

        const depth = (cos + 1) * 0.5;
        const scale = 0.78 + depth * 0.22;
        const rotateY = -sin * 20;
        const opacity = 0.52 + depth * 0.48;
        const zIndex = Math.round(depth * 60) + 1;

        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) scale(${scale.toFixed(3)}) rotateY(${rotateY.toFixed(1)}deg)`;
        el.style.zIndex = String(zIndex);
        el.style.opacity = opacity.toFixed(2);
      }

      if (currentFrontIdx !== lastActive) {
        lastActive = currentFrontIdx;
        activeIndexRef.current = currentFrontIdx;

        if (!isMutedRef.current) {
          videoRefs.forEach((vRef, idx) => {
            if (vRef.current) {
              vRef.current.muted = idx !== currentFrontIdx;
            }
          });
        }
      }

      animId = requestAnimationFrame(updateCarousel);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          isVisibleRef.current = isIntersecting;

          if (isIntersecting) {
            lastTime = performance.now();
            if (!animId) {
              animId = requestAnimationFrame(updateCarousel);
            }
            videoRefs.forEach((vRef) => {
              vRef.current?.play().catch(() => {});
            });
          } else {
            if (animId) {
              cancelAnimationFrame(animId);
              animId = null;
            }
            videoRefs.forEach((vRef) => {
              vRef.current?.pause();
            });
          }
        });
      },
      { rootMargin: '100px 0px', threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
      observer.disconnect();
      if (animId) {
        cancelAnimationFrame(animId);
      }
    };
  }, []);

  const handleCardClick = (idx: number) => {
    targetAngleRef.current = -idx * ((2 * Math.PI) / 3);
    activeIndexRef.current = idx;
    if (!isMuted) {
      videoRefs.forEach((vRef, i) => {
        if (vRef.current) {
          vRef.current.muted = i !== idx;
          if (i === idx) {
            vRef.current.volume = 1;
            vRef.current.play().catch(() => {});
          }
        }
      });
    }
  };

  const handlePrev = () => {
    const prevIdx =
      (activeIndexRef.current - 1 + testimonials.length) % testimonials.length;
    handleCardClick(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndexRef.current + 1) % testimonials.length;
    handleCardClick(nextIdx);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    isMutedRef.current = nextMuted;

    videoRefs.forEach((vRef, idx) => {
      if (vRef.current) {
        if (nextMuted) {
          vRef.current.muted = true;
        } else {
          vRef.current.muted = idx !== activeIndexRef.current;
          if (idx === activeIndexRef.current) {
            vRef.current.volume = 1;
            vRef.current.play().catch(() => {});
          }
        }
      }
    });
  };

  return (
    <section ref={sectionRef} id="service-testimonials" className="py-14 md:py-20 bg-[#050505] relative z-10 overflow-hidden border-b border-white/10">
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-radial from-[#00E6D2]/10 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[300px] bg-radial from-[#00FFE5]/5 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
              <WingLogo className="w-5 h-5 shrink-0" />
              <span>TESTIMONIALS</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading">
              {headingText}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-sans pt-1">
              {subheading}
            </p>
          </motion.div>
        </div>

        {/* 3D Circular Orbit Stage with Left & Right Arrow Buttons */}
        <div className="relative max-w-5xl mx-auto flex flex-col items-center justify-center">
          {/* Desktop Left Arrow Navigation Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="hidden md:flex absolute md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0c1015]/85 hover:bg-[#00E6D2]/15 border border-[#00E6D2]/30 hover:border-[#00FFE5] text-gray-300 hover:text-[#00FFE5] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(0,255,229,0.12)] transition-all duration-200 hover:scale-110 active:scale-95 items-center justify-center cursor-pointer group"
            aria-label="Previous testimonial"
            title="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Desktop Right Arrow Navigation Button */}
          <button
            type="button"
            onClick={handleNext}
            className="hidden md:flex absolute md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0c1015]/85 hover:bg-[#00E6D2]/15 border border-[#00E6D2]/30 hover:border-[#00FFE5] text-gray-300 hover:text-[#00FFE5] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(0,255,229,0.12)] transition-all duration-200 hover:scale-110 active:scale-95 items-center justify-center cursor-pointer group"
            aria-label="Next testimonial"
            title="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* 3D Orbit Stage */}
          <div
            ref={containerRef}
            className="w-full h-[400px] sm:h-[460px] flex items-center justify-center select-none"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          >
            {testimonials.map((item, idx) => (
              <div
                key={item.id}
                ref={cardRefs[idx]}
                onClick={() => handleCardClick(idx)}
                className="absolute top-1/2 left-1/2 w-[240px] xs:w-[260px] sm:w-[310px] md:w-[340px] -ml-[120px] xs:-ml-[130px] sm:-ml-[155px] md:-ml-[170px] -mt-[165px] sm:-mt-[185px] rounded-2xl bg-[#0c1015] border border-[#00E6D2]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden cursor-pointer will-change-transform flex flex-col"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translate3d(0, 0, 0)',
                }}
              >
                {/* Video Container */}
                <div className="relative w-full h-[235px] sm:h-[285px] bg-black overflow-hidden">
                  <video
                    ref={videoRefs[idx]}
                    src={item.video}
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover pointer-events-none"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1015] via-transparent to-black/30 pointer-events-none" />

                  {/* Category Tag */}
                  <div className="absolute top-2.5 left-2.5 text-[#00E6D2] text-[11px] font-semibold tracking-wider uppercase font-mono pointer-events-none">
                    {item.tag}
                  </div>

                  {/* Audio Mute / Unmute Button */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-black/30 transition-colors z-20 cursor-pointer"
                    title={isMuted ? 'Turn Audio On' : 'Mute Audio'}
                    aria-label={isMuted ? 'Turn Audio On' : 'Mute Audio'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-white/70 hover:text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-[#00E6D2]" />
                    )}
                  </button>
                </div>

                {/* Author Footer */}
                <div className="p-3 sm:p-3.5 bg-[#0c1015] border-t border-white/10 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#00E6D2]/20 border border-[#00E6D2]/40 flex items-center justify-center font-bold text-xs text-[#00FFE5] shrink-0 font-heading">
                    {item.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate font-heading">
                      {item.author}
                    </h4>
                    <p className="text-[11px] text-gray-400 truncate">
                      {item.role}, <span className="text-[#00E6D2]">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Testimonial Navigation Buttons */}
          <div className="flex md:hidden items-center justify-center gap-6 mt-3 z-30">
            <button
              type="button"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-[#0c1015]/90 border border-[#00E6D2]/35 text-[#00E6D2] hover:text-white flex items-center justify-center active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.8),0_0_12px_rgba(0,255,229,0.15)] cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-[#0c1015]/90 border border-[#00E6D2]/35 text-[#00E6D2] hover:text-white flex items-center justify-center active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.8),0_0_12px_rgba(0,255,229,0.15)] cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
