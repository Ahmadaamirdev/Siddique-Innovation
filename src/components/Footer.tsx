import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowUp,
  Mail,
} from 'lucide-react';
import brandLogo from '../assets/brand_logo.png';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      {/* Soft Ambient Cyan Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-radial from-[#00E6D2]/10 via-transparent to-transparent blur-[120px] pointer-events-none -z-0 transform-gpu will-change-transform" />
      <div className="absolute top-0 left-10 w-[300px] h-[200px] bg-radial from-[#00FFE5]/5 to-transparent blur-[90px] pointer-events-none -z-0 transform-gpu will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">

          {/* Brand & Elevator Pitch Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="inline-block group" aria-label="Siddiqui Innovations Home">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="relative flex items-center"
              >
                <img
                  src={brandLogo}
                  alt="Siddiqui Innovations Logo"
                  className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_16px_rgba(0,230,210,0.35)]"
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
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 flex items-center justify-center text-gray-300 hover:text-[#00E6D2] transition-all duration-300 shadow-[0_0_10px_rgba(0,230,210,0.05)]"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
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
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 flex items-center justify-center text-gray-300 hover:text-[#00E6D2] transition-all duration-300 shadow-[0_0_10px_rgba(0,230,210,0.05)]"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
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
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 flex items-center justify-center text-gray-300 hover:text-[#00E6D2] transition-all duration-300 shadow-[0_0_10px_rgba(0,230,210,0.05)]"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.222 0h.003z" />
                </svg>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/message/JLNLM2A5GEEMG1"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 flex items-center justify-center text-gray-300 hover:text-[#00E6D2] transition-all duration-300 shadow-[0_0_10px_rgba(0,230,210,0.05)]"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </motion.a>

              {/* Email */}
              <motion.a
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:contact@siddiqui-innovations.com"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 flex items-center justify-center text-gray-300 hover:text-[#00E6D2] transition-all duration-300 shadow-[0_0_10px_rgba(0,230,210,0.05)]"
                aria-label="Email"
                title="contact@siddiqui-innovations.com"
              >
                <Mail className="w-4 h-4" />
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
                <a href="#services" className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E6D2]/40 group-hover:bg-[#00E6D2] transition-colors" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">AI Automation</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E6D2]/40 group-hover:bg-[#00E6D2] transition-colors" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Web Development</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E6D2]/40 group-hover:bg-[#00E6D2] transition-colors" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Digital Marketing</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E6D2]/40 group-hover:bg-[#00E6D2] transition-colors" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">SEO</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group">
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
                <a href="#about" className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">About Us</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Contact</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00E6D2] transition-colors inline-flex items-center gap-1.5 group">
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Terms of Service</span>
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
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] font-bold text-xs hover:shadow-[0_0_15px_rgba(0,230,210,0.5)] transition-all duration-300 flex items-center justify-center"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-gray-500 block">No spam. Unsubscribe at any time.</span>
            </form>
          </div>

        </div>

        {/* Bottom Bar Footer (Copyright & Back to Top) */}
        <div className="pt-8 relative flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-500">
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
