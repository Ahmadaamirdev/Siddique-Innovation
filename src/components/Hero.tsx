import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { FlappingWings } from './hero/FlappingWings';

export interface HeroProps {
  onNavigate?: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Scroll tracking across the two sections of Hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Section 1 elements smoothly fade out and glide slightly up on scroll
  const section1Opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const section1Y = useTransform(scrollYProgress, [0, 0.35], [0, -35]);

  // Section 2 Big Transparent Card smooth emergence (prominent, never loses color)
  const cardScale = useTransform(scrollYProgress, [0.15, 0.45], [0.96, 1]);

  // Section 2 text blur effect: starts blurred as it appears, gets clearer and clearer as user scrolls
  const textBlur = useTransform(scrollYProgress, [0.12, 0.4], [12, 0]);
  const textFilter = useTransform(textBlur, (v) => (v <= 0.2 ? 'none' : `blur(${v.toFixed(1)}px)`));

  const handleLinkClick = (link: string, e: React.MouseEvent) => {
    if (link.startsWith('/')) {
      if (onNavigate) {
        e.preventDefault();
        onNavigate(link);
      }
    } else if (link.startsWith('#')) {
      e.preventDefault();
      document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // The 3 points from Why Choose Us used in the cards (with 24/7 support merged)
  const heroCards = [
    {
      id: 'understand-the-business',
      title: 'Understand the Business',
      subtitle: 'Clear purpose. Tailored strategy.',
      points: [
        'Analyze your real business objectives',
        'Identify core challenges & bottlenecks',
        'Focused work that delivers measurable value',
      ],
    },
    {
      id: 'quality-over-shortcuts',
      title: 'Quality Over Shortcuts',
      subtitle: 'Proper planning. Built to last.',
      points: [
        'Build it right rather than fast and broken',
        'Rigorous end-to-end testing cycles',
        'Enterprise-grade code and architecture',
      ],
    },
    {
      id: 'built-for-global-clients',
      title: 'Built for Global Clients',
      subtitle: 'Worldwide delivery & 24/7 support.',
      points: [
        'Adaptable across multiple global time zones',
        '24/7 round-the-clock availability & fast response',
        'Seamless communication tailored for remote teams',
      ],
    },
  ];

  return (
    <div
      ref={heroRef}
      className="relative w-full bg-[#050505] select-none"
      id="hero-experience"
    >
      {/* ============================================================== */}
      {/* STICKY BACKGROUND WINGS LAYER                                  */}
      {/* Pinned in center of screen: stays STILL & FLAPPING while user  */}
      {/* scrolls through Section 1 and Section 2.                       */}
      {/* Clean solid dark background without image.                     */}
      {/* ============================================================== */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center pointer-events-none z-0 overflow-hidden bg-[#050505]">
        {/* 3D Flapping Wings centered in the screen & staying still (shifted a bit downward) */}
        <div className="relative z-10 flex items-center justify-center translate-y-6 sm:translate-y-10 lg:translate-y-12">
          <FlappingWings reducedMotion={reducedMotion} size="lg" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* FOREGROUND SECTIONS CONTAINER (-mt-[100dvh] overlays Section 1) */}
      {/* ============================================================== */}
      <div className="relative z-10 -mt-[100dvh] pb-4 sm:pb-6">
        {/* ============================================================ */}
        {/* SECTION 1: UPPER SECTION (100dvh)                            */}
        {/* Layout:                                                      */}
        {/* - Top Left: H1 Heading + compact CTA Button just below it    */}
        {/* - Center: Wings (Visible in the background, flapping)        */}
        {/* - Right Middle: Description (blurry frosted glass card)      */}
        {/* - Bottom Right: Scroll to explore prompt                     */}
        {/* ============================================================ */}
        <section className="relative w-full h-[100dvh] min-h-[560px] sm:min-h-[660px] max-h-[1050px] flex flex-col justify-between pointer-events-none">
          {/* Navbar Spacer */}
          <div className="h-16 sm:h-24 lg:h-28 shrink-0 w-full" />

          {/* TOP-LEFT: H1 Heading */}
          <div className="w-full flex items-start justify-start pt-1 sm:pt-4 pl-4 sm:px-8 lg:px-14 xl:px-20 pointer-events-auto">
            <motion.div
              style={reducedMotion ? {} : { opacity: section1Opacity, y: section1Y }}
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-left"
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading py-1 drop-shadow-md">
                <span className="block">Innovation That Builds,</span>
                <span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_25px_rgba(0,255,229,0.35)]"
                  style={{ WebkitTextFillColor: 'transparent' }}
                >
                  Automates &amp; Grows
                </span>
                <span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_25px_rgba(0,255,229,0.35)]"
                  style={{ WebkitTextFillColor: 'transparent' }}
                >
                  Businesses
                </span>
              </h1>
            </motion.div>
          </div>

          {/* RIGHT-SIDE MIDDLE: Description with rounded curved borders on all sides */}
          <div className="w-full flex items-center justify-end pointer-events-auto my-auto py-2 sm:py-4 px-3 sm:px-4 lg:pr-6 translate-y-3 sm:translate-y-10 lg:translate-y-12">
            <motion.div
              style={{
                ...(reducedMotion ? {} : { opacity: section1Opacity, y: section1Y }),
                background:
                  'radial-gradient(circle at 85% 15%, rgba(0, 255, 229, 0.09) 0%, rgba(6, 16, 20, 0.6) 55%, rgba(5, 10, 12, 0.7) 100%)',
              }}
              className="relative max-w-[270px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[390px] xl:max-w-[420px] text-left p-3.5 sm:p-5 lg:p-6 rounded-2xl border border-[#00FFE5]/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_25px_rgba(0,255,229,0.08)] [box-shadow:inset_0_1px_1px_rgba(0,255,229,0.2)]"
            >
              <p className="text-gray-300 text-[11px] sm:text-[13px] lg:text-sm leading-relaxed font-sans font-normal">
                Siddiqui Innovations helps businesses build high-performing websites,
                automate repetitive processes with AI and strengthen their digital presence
                through strategic marketing solutions designed around their goals.
              </p>
            </motion.div>
          </div>

          {/* BOTTOM-LEFT: Contact Us CTA Button & Social Links */}
          <div className="w-full flex items-center justify-between pb-8 sm:pb-12 lg:pb-14 pl-4 sm:px-8 lg:px-14 xl:px-20 pointer-events-auto">
            <motion.div
              style={reducedMotion ? {} : { opacity: section1Opacity, y: section1Y }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              {/* Contact Us CTA Button */}
              <motion.a
                href="#contact"
                onClick={(e) => handleLinkClick('#contact', e)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_20px_rgba(0,230,210,0.35)] hover:shadow-[0_0_30px_rgba(0,255,229,0.6)] transition-all duration-300 font-heading cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.a>

              {/* Social Icons */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Instagram */}
                <motion.a
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.instagram.com/siddiqui_innovations?igsh=MTYwNGUwbG1oNHoxZw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#060B10]/85 border border-[#00FFE5]/30 hover:border-[#00FFE5] hover:bg-[#00FFE5]/15 flex items-center justify-center text-gray-300 hover:text-[#00FFE5] transition-all duration-300 shadow-[0_0_12px_rgba(0,255,229,0.1)]"
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
                  href="https://www.facebook.com/share/17rWKh9V3M/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#060B10]/85 border border-[#00FFE5]/30 hover:border-[#00FFE5] hover:bg-[#00FFE5]/15 flex items-center justify-center text-gray-300 hover:text-[#00FFE5] transition-all duration-300 shadow-[0_0_12px_rgba(0,255,229,0.1)]"
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
                  href="https://www.linkedin.com/company/siddiqui-innovations"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#060B10]/85 border border-[#00FFE5]/30 hover:border-[#00FFE5] hover:bg-[#00FFE5]/15 flex items-center justify-center text-gray-300 hover:text-[#00FFE5] transition-all duration-300 shadow-[0_0_12px_rgba(0,255,229,0.1)]"
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
        </section>

        {/* ============================================================ */}
        {/* SECTION 2: SCROLLED BIG TRANSPARENT CARD                     */}
        {/* As user scrolls down, this big frosted glass card slides up  */}
        {/* over the middle. The flapping wings stay still in the center, */}
        {/* visible and blurred behind the glass!                        */}
        {/* Inside: 3 Small Cards containing the points from hero.       */}
        {/* ============================================================ */}
        <section className="relative w-full min-h-screen flex items-center justify-center pt-20 sm:pt-28 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8 z-20">
          <motion.div
            style={reducedMotion ? {} : { scale: cardScale }}
            className="w-full max-w-6xl mx-auto rounded-2xl sm:rounded-3xl p-4 sm:p-10 lg:p-12 relative overflow-hidden backdrop-blur-sm bg-[#050505]/10 border border-[#00FFE5]/30 shadow-[0_0_60px_rgba(0,255,229,0.12),0_30px_70px_rgba(0,0,0,0.7)] pointer-events-auto"
          >
            {/* Inner Content with Scroll-Linked Text Blur to Clear effect (No fading, 100% solid text) */}
            <motion.div
              style={reducedMotion ? {} : { filter: textFilter }}
              className="transform-gpu will-change-[filter]"
            >
              {/* Header of the Big Transparent Card (Why Businesses Choose Siddiqui Innovations) */}
              <div className="relative text-center max-w-2xl mx-auto mb-6 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  <span className="block">Why Businesses Choose</span>{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_25px_rgba(0,255,229,0.5)]">
                    Siddiqui Innovations
                  </span>
                </h2>

                <p className="text-gray-200 text-xs sm:text-sm font-sans mt-2.5 sm:mt-3 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  We're not just another service provider, we're a team that treats your growth as our responsibility.
                </p>
              </div>

              {/* The 3 Small Transparent Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 relative z-10">
                {heroCards.map((card) => {
                  return (
                    <div
                      key={card.id}
                      className="relative flex flex-col justify-between p-4 sm:p-8 rounded-2xl bg-transparent border border-[#00FFE5]/30 shadow-[0_0_20px_rgba(0,255,229,0.06)]"
                    >
                      <div>
                        {/* Card Title & Subtitle */}
                        <h3 className="text-lg sm:text-2xl font-bold text-white font-heading leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                          {card.title}
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm font-sans mt-1.5 sm:mt-2 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                          {card.subtitle}
                        </p>

                        {/* Bullet Points */}
                        <ul className="mt-5 space-y-2.5 border-t border-[#00FFE5]/20 pt-4">
                          {card.points.map((point, pIdx) => (
                            <li
                              key={pIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-100 font-sans font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#00FFE5] shrink-0 mt-0.5 drop-shadow-[0_0_6px_rgba(0,255,229,0.8)]" />
                              <span className="leading-tight">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};
