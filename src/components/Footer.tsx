import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowUp,
} from 'lucide-react';
import brandLogo from '../assets/brand_logo.png';

export interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (path: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const entranceEase = [0.22, 0.61, 0.36, 1] as const;

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: entranceEase }}
      className="bg-[#030507] border-t border-white/10 pt-16 pb-12 relative z-10 text-gray-400 text-sm font-sans select-none overflow-hidden transform-gpu"
    >
      {/* Soft Ambient Cyan Background Glow (Seamless, No Hard Boundaries) */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-radial from-[#00E6D2]/10 via-transparent to-transparent blur-[120px] pointer-events-none -z-0 transform-gpu will-change-transform" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[260px] bg-radial from-[#00FFE5]/8 via-transparent to-transparent blur-[140px] pointer-events-none -z-0 transform-gpu will-change-transform" />
      <div className="absolute top-0 left-10 w-[300px] h-[200px] bg-radial from-[#00FFE5]/5 to-transparent blur-[90px] pointer-events-none -z-0 transform-gpu will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-4 sm:pb-5">

          {/* Brand & Elevator Pitch Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="/"
              onClick={(e) => handleNav('/', e)}
              className="inline-block group"
              aria-label="Siddiqui Innovations Home"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="relative flex items-center"
              >
                <img
                  src={brandLogo}
                  alt="Siddiqui Innovations Logo"
                  className="h-14 sm:h-16 md:h-18 w-auto max-w-[240px] object-contain drop-shadow-[0_0_24px_rgba(0,230,210,0.25)]"
                />
              </motion.div>
            </a>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-sans">
              Empowering businesses through cutting-edge AI Automation, high-ranking SEO strategies, and modern, high-converting digital web experiences.
            </p>



            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <motion.a
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/siddiqui_innovations?igsh=MTYwNGUwbG1oNHoxZw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 flex items-center justify-center text-gray-300 hover:text-[#00E6D2] transition-all duration-300 shadow-[0_0_10px_rgba(0,230,210,0.05)]"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current text-[#00E6D2]" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.a>

              {/* Facebook */}
              <motion.a
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 flex items-center justify-center text-gray-300 hover:text-[#00E6D2] transition-all duration-300 shadow-[0_0_10px_rgba(0,230,210,0.05)]"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current text-[#00E6D2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 flex items-center justify-center text-gray-300 hover:text-[#00E6D2] transition-all duration-300 shadow-[0_0_10px_rgba(0,230,210,0.05)]"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current text-[#00E6D2]" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.222 0h.003z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Quick Links Column 1: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-heading">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li>
                <a
                  href="/services/ai-automation"
                  onClick={(e) => handleNav('/services/ai-automation', e)}
                  className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E6D2]/40 group-hover:bg-[#00E6D2] transition-colors" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">AI Automation</span>
                </a>
              </li>
              <li>
                <a
                  href="/services/web-development"
                  onClick={(e) => handleNav('/services/web-development', e)}
                  className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E6D2]/40 group-hover:bg-[#00E6D2] transition-colors" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Web Development</span>
                </a>
              </li>
              <li>
                <a
                  href="/services/digital-marketing"
                  onClick={(e) => handleNav('/services/digital-marketing', e)}
                  className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E6D2]/40 group-hover:bg-[#00E6D2] transition-colors" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Digital Marketing</span>
                </a>
              </li>
              <li>
                <a
                  href="/services/seo"
                  onClick={(e) => handleNav('/services/seo', e)}
                  className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E6D2]/40 group-hover:bg-[#00E6D2] transition-colors" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">SEO</span>
                </a>
              </li>
              <li>
                <a
                  href="/services/youtube-automation"
                  onClick={(e) => handleNav('/services/youtube-automation', e)}
                  className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E6D2]/40 group-hover:bg-[#00E6D2] transition-colors" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">YouTube Automation</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Legal Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-heading">
              Legal Links
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleNav('/about', e)}
                  className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">About Us</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNav('/contact', e)}
                  className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Contact</span>
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => handleNav('/privacy-policy', e)}
                  className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleNav('/terms', e)}
                  className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Terms &amp; Conditions</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact Box Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-heading">
              Stay Ahead in AI
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Subscribe for actionable insights on AI automation, digital marketing, and web tech.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#080D12] border border-white/10 focus:border-[#00E6D2] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] font-bold text-xs hover:shadow-[0_0_10px_rgba(0,230,210,0.3)] transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-gray-500 block">No spam. Unsubscribe at any time.</span>
            </form>
          </div>

        </div>

        {/* Large Outlined Brand Typography (80% Visible, Clean Outlines) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative w-full text-center pt-2 sm:pt-3 pb-0 select-none group flex flex-col items-center justify-start"
        >
          {/* 80% visible clipping container sitting directly on the horizontal dividing line */}
          <div className="relative w-full overflow-hidden h-[0.80em] text-[clamp(1.1rem,4.4vw,4.8rem)] leading-none flex justify-center items-start border-b border-white/15">
            {/* Subtle cyan accent along the visible cut boundary */}
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FFE5]/40 to-transparent pointer-events-none" />

            <span
              className="inline-block font-extrabold tracking-[0.06em] sm:tracking-[0.11em] uppercase leading-none whitespace-nowrap transition-opacity duration-300 opacity-80 group-hover:opacity-100 cursor-default select-none"
              style={{
                fontFamily: "Arial, 'Helvetica Neue', 'Segoe UI', sans-serif",
                WebkitTextStroke: '1.2px #00FFE5',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              SIDDIQUI INNOVATIONS
            </span>
          </div>
        </motion.div>

        {/* Bottom Bar Footer (Copyright & Back to Top) */}
        <div className="pt-6 sm:pt-8 relative flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-500">
          <div className="text-center">
            © {new Date().getFullYear()} <span className="text-gray-300 font-semibold font-heading">Siddiqui Innovations</span>. All Rights Reserved.
          </div>

          {/* Back to Top Floating Button */}
          <div className="sm:absolute sm:right-0">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 text-gray-300 hover:text-[#00E6D2] transition-all duration-300 shadow-[0_0_15px_rgba(0,230,210,0.05)] cursor-pointer"
              aria-label="Back to Top"
            >
              <span className="text-xs font-semibold font-heading">Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#00E6D2] transition-transform duration-300 group-hover:-translate-y-0.5" />
            </motion.button>
          </div>
        </div>

      </div>
    </motion.footer>
  );
};
