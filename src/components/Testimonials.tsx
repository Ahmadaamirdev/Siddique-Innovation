import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { WingLogo } from './WingLogo';

interface TestimonialCard {
  id: number;
  author: string;
  role: string;
  company: string;
  tag: string;
  quote: string;
  video: string;
}

const testimonialsData: TestimonialCard[] = [
  {
    id: 1,
    author: 'Marcus Vance',
    role: 'Founder & CEO',
    company: 'ApexScale Logistics',
    tag: 'AI Automation',
    quote:
      'Siddiqui Innovations automated our entire lead qualification and CRM pipeline. We saved over 25 hours of manual work every week and doubled our response speed.',
    video: '/videos/testimonial-1.mp4',
  },
  {
    id: 2,
    author: 'Elena Rostova',
    role: 'Head of Growth',
    company: 'Nexora Digital',
    tag: 'Web Development & SEO',
    quote:
      'Our website conversion rate jumped by 140% within 60 days of the redesign. The speed, aesthetics, and search rankings exceeded all our expectations.',
    video: '/videos/testimonial-2.mp4',
  },
  {
    id: 3,
    author: 'David Chen',
    role: 'Managing Director',
    company: 'Zenith Global',
    tag: 'Digital Marketing',
    quote:
      'Their data-driven campaigns generated predictable high-ticket inbound leads from day one. Truly a high-caliber partner that cares about bottom-line results.',
    video: '/videos/testimonial-3.mp4',
  },
];

export const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const dotRefs = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
  ];

  const angleRef = useRef(0);
  const targetAngleRef = useRef<number | null>(null);

  useEffect(() => {
    let animId: number;
    let lastActive = 0;
    let lastTime = performance.now();

    // Cache radius dimensions on resize to completely prevent layout thrashing in RAF
    let rx = 320;
    let rz = 150;

    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        rx = Math.min(width * 0.32, 330);
        rz = Math.min(width * 0.15, 150);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions, { passive: true });

    // Smooth delta-time based continuous rotation (~28s per 360 deg cycle)
    const rotationSpeed = 0.22; // radians per second

    const updateCarousel = (currentTime: number) => {
      // Calculate delta time in seconds, clamped to avoid jumps when switching tabs
      const dt = Math.min((currentTime - lastTime) / 1000, 0.08);
      lastTime = currentTime;

      // Smooth glide when user clicks a card or pagination dot
      if (targetAngleRef.current !== null) {
        let diff = targetAngleRef.current - angleRef.current;
        // Normalize diff to -PI..PI for shortest rotation arc
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));

        if (Math.abs(diff) > 0.003) {
          angleRef.current += diff * Math.min(dt * 5, 0.25);
        } else {
          angleRef.current = targetAngleRef.current;
          targetAngleRef.current = null;
        }
      } else {
        // Continuous, silky smooth 3D orbit
        angleRef.current += rotationSpeed * dt;
      }

      // Keep angle in [0, 2*PI)
      if (angleRef.current >= Math.PI * 2) {
        angleRef.current -= Math.PI * 2;
      } else if (angleRef.current < 0) {
        angleRef.current += Math.PI * 2;
      }

      let maxCos = -2;
      let currentFrontIdx = 0;

      // Update 3D card transforms directly on GPU compositor
      for (let i = 0; i < 3; i++) {
        const el = cardRefs[i].current;
        if (!el) continue;

        const cardAngle = angleRef.current + (i * 2 * Math.PI) / 3;
        const sin = Math.sin(cardAngle);
        const cos = Math.cos(cardAngle); // +1 = front, -1 = back

        if (cos > maxCos) {
          maxCos = cos;
          currentFrontIdx = i;
        }

        const x = sin * rx;
        const z = cos * rz;
        const y = -cos * 6; // subtle vertical lift when in front

        const depth = (cos + 1) * 0.5; // 0 to 1
        const scale = 0.78 + depth * 0.22; // 0.78 back -> 1.0 front
        const rotateY = -sin * 20; // gentle perspective tilt
        const opacity = 0.52 + depth * 0.48; // 0.52 back -> 1.0 front
        const zIndex = Math.round(depth * 60) + 1;

        // Pure numeric transform matrix without calc() for maximum GPU performance
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) scale(${scale.toFixed(3)}) rotateY(${rotateY.toFixed(1)}deg)`;
        el.style.zIndex = String(zIndex);
        el.style.opacity = opacity.toFixed(2);
      }

      // Update active pagination dot via direct DOM without triggering React re-renders
      if (currentFrontIdx !== lastActive) {
        lastActive = currentFrontIdx;
        for (let i = 0; i < 3; i++) {
          const dot = dotRefs[i].current;
          if (dot) {
            if (i === currentFrontIdx) {
              dot.className =
                'w-2.5 h-2.5 rounded-full transition-all duration-300 bg-[#00E6D2] shadow-[0_0_12px_#00E6D2] scale-125';
            } else {
              dot.className =
                'w-2.5 h-2.5 rounded-full transition-all duration-300 bg-white/20 hover:bg-white/40 scale-100';
            }
          }
        }
      }

      animId = requestAnimationFrame(updateCarousel);
    };

    animId = requestAnimationFrame(updateCarousel);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleCardClick = (idx: number) => {
    targetAngleRef.current = -idx * ((2 * Math.PI) / 3);
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#050505] relative z-10 overflow-hidden border-b border-white/10">
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-radial from-[#00E6D2]/10 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[300px] bg-radial from-[#00FFE5]/5 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              What Our Clients Say
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-sans pt-1">
              Real results, genuine partnerships, and transformational business growth delivered for modern companies.
            </p>
          </motion.div>
        </div>

        {/* 3D Circular Orbit Stage */}
        <div
          ref={containerRef}
          className="relative max-w-5xl mx-auto h-[460px] sm:h-[480px] flex items-center justify-center select-none"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {testimonialsData.map((item, idx) => (
            <div
              key={item.id}
              ref={cardRefs[idx]}
              onClick={() => handleCardClick(idx)}
              className="absolute top-1/2 left-1/2 w-[260px] sm:w-[300px] md:w-[330px] -ml-[130px] sm:-ml-[150px] md:-ml-[165px] -mt-[180px] sm:-mt-[190px] rounded-2xl bg-[#0c1015] border border-[#00E6D2]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden cursor-pointer will-change-transform"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              {/* Video Container (Autoplay, Loop, Muted, Hardware Accelerated) */}
              <div className="relative w-full aspect-video bg-black overflow-hidden">
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover pointer-events-none"
                />

                {/* Subtle gradient overlay at bottom of video */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1015] via-transparent to-black/30 pointer-events-none" />

                {/* Category Tag Badge */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#0c1015]/90 border border-[#00E6D2]/40 text-[#00E6D2] text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase font-mono pointer-events-none">
                  {item.tag}
                </div>
              </div>

              {/* Card Content & Testimonial Info */}
              <div className="p-4 sm:p-5 space-y-3">
                {/* Quote Icon */}
                <div className="flex items-center justify-between">
                  <Quote className="w-5 h-5 text-[#00E6D2]/50 shrink-0" />
                </div>

                {/* Testimonial Quote */}
                <p className="text-gray-300 text-xs sm:text-[13px] leading-relaxed italic line-clamp-3 font-sans">
                  "{item.quote}"
                </p>

                {/* Author / Client Profile Footer */}
                <div className="pt-2.5 border-t border-white/10 flex items-center gap-2.5">
                  {/* Gradient Avatar Initials */}
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
            </div>
          ))}
        </div>

        {/* Minimal Circular Pagination Dots */}
        <div className="flex items-center justify-center gap-3 mt-7 sm:mt-8">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              ref={dotRefs[idx]}
              onClick={() => handleCardClick(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === 0
                  ? 'w-2.5 h-2.5 bg-[#00E6D2] shadow-[0_0_12px_#00E6D2] scale-125'
                  : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40 scale-100'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
