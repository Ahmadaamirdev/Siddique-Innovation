import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { WingLogo } from './WingLogo';

export interface NavbarProps {
  heroProgress?: MotionValue<number>;
  isHeroRevealed?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  heroProgress,
  isHeroRevealed = false,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fallback progress if none provided
  const fallbackProgress = useMotionValue(isHeroRevealed ? 1 : 0);
  const currentProgress = heroProgress || fallbackProgress;

  // Blur during intro logo animation: starts at blur(14px) and lower opacity, dissolves to 0 as logo animation reveals hero
  const blurAmount = useTransform(currentProgress, [0.25, 0.92], [14, 0]);
  const navFilter = useTransform(blurAmount, (b) => {
    if (isHeroRevealed || b < 0.2) return 'none';
    return `blur(${b.toFixed(1)}px)`;
  });
  const navOpacity = useTransform(currentProgress, [0.1, 0.85], [0.45, 1]);

  const navLinks = ['Home', 'Services', 'Projects', 'About', 'Contact'];

  return (
    <motion.header
      style={{
        filter: navFilter,
        opacity: isHeroRevealed ? 1 : navOpacity,
      }}
      className="fixed top-4 sm:top-6 lg:top-7 left-0 right-0 z-50 flex flex-col items-center px-4 sm:px-6 pointer-events-none"
    >
      {/* Floating Animated Wrapper - Continuous gentle zero-gravity levitation */}
      <motion.div
        animate={
          isHeroRevealed
            ? {
                y: [0, -4, 0],
                transition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }
            : { y: 0 }
        }
        className="pointer-events-auto relative w-full max-w-5xl"
      >
        {/* Anti-gravity ambient cyan light cushion underneath the pill */}
        <div
          className={`absolute -bottom-2 inset-x-12 h-5 bg-[#00E6D2]/15 blur-lg rounded-full -z-10 pointer-events-none transition-opacity duration-500 ${
            scrolled ? 'opacity-90' : 'opacity-60'
          }`}
        />

        {/* Floating Glass Pill Bar */}
        <div
          className={`relative w-full rounded-full bg-[#06090D]/65 backdrop-blur-2xl backdrop-saturate-150 border border-[#00E6D2]/30 border-t-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_10px_25px_rgba(0,0,0,0.5),0_0_30px_rgba(0,230,210,0.12)] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 hover:border-[#00E6D2]/50 hover:shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(0,230,210,0.22)] ${
            scrolled
              ? 'scale-[0.985] py-2 sm:py-2.5 bg-[#05080C]/80 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,230,210,0.2)]'
              : ''
          }`}
        >
          {/* Top Specular Glass Highlight Streak */}
          <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="relative flex items-center justify-center">
            {/* Cyan Wing Logo */}
            <WingLogo className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(0,230,210,0.7)]" />
            <div className="absolute -inset-1 bg-[#00E6D2]/20 blur-sm rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm tracking-wider text-white uppercase font-heading group-hover:text-[#00E6D2] transition-colors">
            SIDDIQUI INNOVATIONS
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          onMouseLeave={() => setHoveredTab(null)}
          className="hidden md:flex items-center gap-1 sm:gap-2"
        >
          {navLinks.map((link) => {
            const isHovered = hoveredTab === link;
            return (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onMouseEnter={() => setHoveredTab(link)}
                className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors select-none ${
                  isHovered
                    ? 'text-[#00FFE5]'
                    : 'text-gray-300'
                }`}
              >
                {isHovered && (
                  <motion.div
                    layoutId="hoverNavPill"
                    className="absolute inset-0 rounded-full bg-[#00E6D2]/15 border border-[#00E6D2]/40 shadow-[0_0_12px_rgba(0,230,210,0.25)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link}</span>
              </a>
            );
          })}
        </nav>

        {/* Header Right CTA - Matching Pill Button */}
        <div className="hidden md:flex items-center shrink-0">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white border border-[#00E6D2]/40 bg-[#00E6D2]/10 hover:bg-[#00E6D2] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,230,210,0.1)] hover:shadow-[0_0_25px_rgba(0,230,210,0.35)]"
          >
            <span>Book Discovery Call</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#00E6D2] group-hover:text-black transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      </motion.div>

      {/* Mobile Menu Dropdown Card */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto w-full max-w-5xl mt-2 rounded-2xl bg-[#080D11]/95 backdrop-blur-2xl border border-[#00E6D2]/30 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(0,230,210,0.12)] p-4 flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-medium py-2 px-4 rounded-full transition-colors border border-transparent text-gray-300 hover:text-[#00FFE5] hover:bg-[#00E6D2]/15 hover:border-[#00E6D2]/40 active:bg-[#00E6D2]/20"
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-[#00E6D2] hover:bg-[#00FFE5] transition-colors shadow-[0_0_20px_rgba(0,230,210,0.3)]"
              >
                <span>Book Discovery Call</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
