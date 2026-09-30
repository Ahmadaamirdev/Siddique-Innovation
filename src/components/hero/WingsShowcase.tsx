import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Search,
  Target,
  Cpu,
  Megaphone,
  PenTool,
  ArrowUpRight,
} from 'lucide-react';
import logoImg from '../../assets/logo.png';

interface WingsShowcaseProps {
  onNavigate?: (path: string) => void;
}

export const WingsShowcase: React.FC<WingsShowcaseProps> = ({ onNavigate }) => {
  const leftServices = [
    {
      id: 'web-development',
      title: 'Web Development',
      subtitle: 'Modern. Scalable. Built for growth.',
      icon: Code2,
      link: '/services/web-development',
    },
    {
      id: 'seo',
      title: 'SEO',
      subtitle: 'Higher rankings. More traffic.',
      icon: Search,
      link: '/services/seo',
    },
    {
      id: 'meta-ads',
      title: 'Meta Ads',
      subtitle: 'Targeted reach. High ROI.',
      icon: Target,
      link: '#contact',
    },
  ];

  const rightServices = [
    {
      id: 'ai-automation',
      title: 'AI & Automation',
      subtitle: 'Smarter systems. Higher productivity.',
      icon: Cpu,
      link: '/services/ai-automation',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      subtitle: 'Real audience. Real results.',
      icon: Megaphone,
      link: '/services/digital-marketing',
    },
    {
      id: 'branding-design',
      title: 'Branding & Design',
      subtitle: 'Ideas that look as good as they work.',
      icon: PenTool,
      link: '#contact',
    },
  ];

  const handleCardClick = (link: string, e: React.MouseEvent) => {
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

  return (
    <section className="relative w-full bg-transparent text-white pt-2 sm:pt-6 pb-16 sm:pb-24 overflow-visible select-none -mt-24 sm:-mt-28 lg:-mt-32 z-20">
      {/* Top Conic / Radial Spotlight shining onto Wings */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#00FFE5]/15 via-[#00E6D2]/5 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-radial from-[#00FFE5]/25 to-transparent blur-2xl pointer-events-none -z-0" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ============================================================== */}
        {/* DESKTOP LAYOUT: Centered Wings with 3 Floating Bubbles on Each Side */}
        {/* ============================================================== */}
        <div className="hidden lg:block relative w-[1200px] h-[460px] mx-auto">
          {/* SVG Connection Lines — z-[5] sits BELOW bubbles (z-20) */}
          <svg
            className="absolute inset-0 w-[1200px] h-[460px] pointer-events-none z-[5]"
            viewBox="0 0 1200 460"
            fill="none"
          >
            <defs>
              <linearGradient id="lineGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00FFE5" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#00E6D2" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00FFE5" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="lineGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#00FFE5" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#00E6D2" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00FFE5" stopOpacity="0.15" />
              </linearGradient>
              <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Left Line 1: Web Development — wing end (365,175) → bubble right-edge (270,161) */}
            <path
              d="M 365 175 C 335 170, 305 163, 270 161"
              stroke="url(#lineGradLeft)"
              strokeWidth="1.5"
              filter="url(#cyanGlow)"
            />
            <circle cx="365" cy="175" r="2.5" fill="#00E6D2" opacity="0.7" />
            <circle cx="270" cy="161" r="3.5" fill="#00FFE5" />

            {/* Left Line 2: SEO — wing end (365,261) → bubble right-edge (270,261) */}
            <path
              d="M 365 261 C 335 261, 305 261, 270 261"
              stroke="url(#lineGradLeft)"
              strokeWidth="1.5"
              filter="url(#cyanGlow)"
            />
            <circle cx="365" cy="261" r="2.5" fill="#00E6D2" opacity="0.7" />
            <circle cx="270" cy="261" r="3.5" fill="#00FFE5" />

            {/* Left Line 3: Meta Ads — wing end (365,345) → bubble right-edge (270,361) */}
            <path
              d="M 365 345 C 335 352, 305 358, 270 361"
              stroke="url(#lineGradLeft)"
              strokeWidth="1.5"
              filter="url(#cyanGlow)"
            />
            <circle cx="365" cy="345" r="2.5" fill="#00E6D2" opacity="0.7" />
            <circle cx="270" cy="361" r="3.5" fill="#00FFE5" />

            {/* Right Line 1: AI & Automation — wing end (835,175) → bubble left-edge (930,161) */}
            <path
              d="M 835 175 C 865 170, 895 163, 930 161"
              stroke="url(#lineGradRight)"
              strokeWidth="1.5"
              filter="url(#cyanGlow)"
            />
            <circle cx="835" cy="175" r="2.5" fill="#00E6D2" opacity="0.7" />
            <circle cx="930" cy="161" r="3.5" fill="#00FFE5" />

            {/* Right Line 2: Digital Marketing — wing end (835,261) → bubble left-edge (930,261) */}
            <path
              d="M 835 261 C 865 261, 895 261, 930 261"
              stroke="url(#lineGradRight)"
              strokeWidth="1.5"
              filter="url(#cyanGlow)"
            />
            <circle cx="835" cy="261" r="2.5" fill="#00E6D2" opacity="0.7" />
            <circle cx="930" cy="261" r="3.5" fill="#00FFE5" />

            {/* Right Line 3: Branding & Design — wing end (835,345) → bubble left-edge (930,361) */}
            <path
              d="M 835 345 C 865 352, 895 358, 930 361"
              stroke="url(#lineGradRight)"
              strokeWidth="1.5"
              filter="url(#cyanGlow)"
            />
            <circle cx="835" cy="345" r="2.5" fill="#00E6D2" opacity="0.7" />
            <circle cx="930" cy="361" r="3.5" fill="#00FFE5" />
          </svg>

          {/* LEFT 3 FLOATING BUBBLES - Anchored at the exact line endpoints */}
          {leftServices.map((item, idx) => {
            const Icon = item.icon;
            const topPos = idx === 0 ? 135 : idx === 1 ? 235 : 335;
            return (
              <motion.a
                key={item.id}
                href={item.link}
                onClick={(e) => handleCardClick(item.link, e)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ scale: 1.04 }}
                style={{ left: 20, top: topPos, width: 250, height: 52 }}
                className="absolute group flex items-center gap-3 px-3.5 py-2 rounded-full bg-[#060B10]/90 backdrop-blur-xl border border-[#00FFE5]/35 hover:border-[#00FFE5] shadow-[0_0_20px_rgba(0,255,229,0.18)] hover:shadow-[0_0_28px_rgba(0,255,229,0.45)] transition-all duration-300 cursor-pointer text-left z-20"
              >
                {/* Glowing Icon inside Bubble */}
                <div className="w-8 h-8 rounded-full bg-[#00E6D2]/15 border border-[#00FFE5]/40 flex items-center justify-center text-[#00FFE5] group-hover:scale-105 transition-all duration-300 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Title & Description inside Bubble */}
                <div className="min-w-0 pr-1">
                  <div className="text-white font-bold text-xs sm:text-sm tracking-wide font-heading group-hover:text-[#00FFE5] transition-colors leading-tight truncate">
                    {item.title}
                  </div>
                  <div className="text-gray-400 text-[11px] font-sans leading-tight mt-0.5 truncate">
                    {item.subtitle}
                  </div>
                </div>
              </motion.a>
            );
          })}

          {/* CENTER: MAJESTIC WINGS ON 3D CYBER PEDESTAL */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center justify-center z-10 pointer-events-none">
            {/* Glowing Wings Logo — shifted up to compensate for transparent top margin */}
            <motion.div
              animate={{
                y: [-4, 5, -4],
              }}
              transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
              className="relative w-[340px] sm:w-[400px] xl:w-[440px] flex items-center justify-center -mt-16"
            >
              <img
                src={logoImg}
                alt="Siddiqui Innovations Wings"
                className="w-full h-auto object-contain drop-shadow-[0_0_45px_rgba(0,255,229,0.65)] select-none pointer-events-none"
              />
            </motion.div>

            {/* 3D Cylindrical Pedestal Disc with Glowing Cyan Rim */}
            <div className="relative -mt-6 sm:-mt-8 flex flex-col items-center">
              <div
                className="w-[280px] sm:w-[340px] xl:w-[380px] h-[34px] rounded-[100%] border-2 border-[#00FFE5] shadow-[0_0_35px_rgba(0,255,229,0.55),inset_0_0_20px_rgba(0,255,229,0.3)] pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 40%, rgba(0, 255, 229, 0.45) 0%, rgba(6, 18, 26, 0.95) 70%)',
                }}
              />
              {/* Lower Shadow Pedestal Cylinder */}
              <div
                className="w-[260px] sm:w-[320px] xl:w-[360px] h-[16px] rounded-[100%] bg-[#020508] border-b border-[#00FFE5]/40 -mt-2.5 shadow-2xl opacity-90"
              />
            </div>
          </div>

          {/* RIGHT 3 FLOATING BUBBLES - Anchored at the exact line endpoints */}
          {rightServices.map((item, idx) => {
            const Icon = item.icon;
            const topPos = idx === 0 ? 135 : idx === 1 ? 235 : 335;
            return (
              <motion.a
                key={item.id}
                href={item.link}
                onClick={(e) => handleCardClick(item.link, e)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ scale: 1.04 }}
                style={{ right: 20, top: topPos, width: 250, height: 52 }}
                className="absolute group flex items-center gap-3 px-3.5 py-2 rounded-full bg-[#060B10]/90 backdrop-blur-xl border border-[#00FFE5]/35 hover:border-[#00FFE5] shadow-[0_0_20px_rgba(0,255,229,0.18)] hover:shadow-[0_0_28px_rgba(0,255,229,0.45)] transition-all duration-300 cursor-pointer text-left z-20"
              >
                {/* Glowing Icon inside Bubble */}
                <div className="w-8 h-8 rounded-full bg-[#00E6D2]/15 border border-[#00FFE5]/40 flex items-center justify-center text-[#00FFE5] group-hover:scale-105 transition-all duration-300 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Title & Description inside Bubble */}
                <div className="min-w-0 pr-1">
                  <div className="text-white font-bold text-xs sm:text-sm tracking-wide font-heading group-hover:text-[#00FFE5] transition-colors leading-tight truncate">
                    {item.title}
                  </div>
                  <div className="text-gray-400 text-[11px] font-sans leading-tight mt-0.5 truncate">
                    {item.subtitle}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* MOBILE / TABLET LAYOUT: Wings on Top, 6 Bubbles in 2 Columns Below */}
        {/* ============================================================== */}
        <div className="lg:hidden flex flex-col items-center">
          {/* Wings & Pedestal on Mobile */}
          <div className="relative flex flex-col items-center justify-center py-4">
            <motion.div
              animate={{ y: [-3, 4, -3] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="w-[280px] sm:w-[340px]"
            >
              <img
                src={logoImg}
                alt="Siddiqui Innovations Wings"
                className="w-full h-auto object-contain drop-shadow-[0_0_35px_rgba(0,255,229,0.55)]"
              />
            </motion.div>
            <div
              className="w-[240px] sm:w-[280px] h-[26px] rounded-[100%] border-2 border-[#00FFE5] shadow-[0_0_25px_rgba(0,255,229,0.5)] -mt-4"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 40%, rgba(0, 255, 229, 0.45) 0%, rgba(6, 18, 26, 0.95) 70%)',
              }}
            />
          </div>

          {/* 6 Bubbles in responsive 2-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mt-6">
            {[...leftServices, ...rightServices].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.link}
                  onClick={(e) => handleCardClick(item.link, e)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#080E14]/80 border border-[#00FFE5]/25 hover:border-[#00FFE5] transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-[#00E6D2]/10 border border-[#00FFE5]/40 flex items-center justify-center text-[#00FFE5] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs sm:text-sm font-heading">
                      {item.title}
                    </div>
                    <div className="text-gray-400 text-[11px] leading-tight">
                      {item.subtitle}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* ACTIONS & SOCIAL LINKS ROW: Placed directly below the wings    */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 relative z-20"
        >
          {/* Contact Us CTA Button */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group relative inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_20px_rgba(0,230,210,0.3)] hover:shadow-[0_0_30px_rgba(0,230,210,0.5)] transition-all duration-300 font-heading cursor-pointer"
          >
            <span>Contact Us</span>
            <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>

          {/* Social Icons: Instagram, Facebook & LinkedIn */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Instagram */}
            <motion.a
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.instagram.com/siddiqui_innovations?igsh=MTYwNGUwbG1oNHoxZw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-xl bg-[#0A1218]/90 border border-[#00E6D2]/30 hover:border-[#00FFE5] hover:bg-[#00E6D2]/15 flex items-center justify-center text-gray-300 hover:text-[#00FFE5] transition-all duration-300 shadow-[0_0_15px_rgba(0,230,210,0.1)] hover:shadow-[0_0_20px_rgba(0,255,229,0.35)]"
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
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-xl bg-[#0A1218]/90 border border-[#00E6D2]/30 hover:border-[#00FFE5] hover:bg-[#00E6D2]/15 flex items-center justify-center text-gray-300 hover:text-[#00FFE5] transition-all duration-300 shadow-[0_0_15px_rgba(0,230,210,0.1)] hover:shadow-[0_0_20px_rgba(0,255,229,0.35)]"
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
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-xl bg-[#0A1218]/90 border border-[#00E6D2]/30 hover:border-[#00FFE5] hover:bg-[#00E6D2]/15 flex items-center justify-center text-gray-300 hover:text-[#00FFE5] transition-all duration-300 shadow-[0_0_15px_rgba(0,230,210,0.1)] hover:shadow-[0_0_20px_rgba(0,255,229,0.35)]"
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
  );
};
