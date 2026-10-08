import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WingLogo } from './WingLogo';
import { CTA } from './CTA';
import contactHeroBg from '../assets/contact_hero_bg.webp';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Contact Us | Siddiqui Innovations - Let\'s Talk About Your Project';

    return () => {
      document.title = 'Siddiqui Innovations | AI Automation, SEO & Digital Growth';
    };
  }, []);

  const smoothEase = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#00E6D2] selection:text-black relative overflow-x-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="fixed top-20 left-1/4 w-[650px] h-[400px] bg-radial from-[#00E6D2]/10 via-transparent to-transparent blur-[150px] pointer-events-none -z-0" />
      <div className="fixed bottom-1/3 right-1/4 w-[500px] h-[400px] bg-radial from-[#00FFE5]/5 via-transparent to-transparent blur-[150px] pointer-events-none -z-0" />

      {/* Floating Navbar */}
      <Navbar
        isHeroRevealed={true}
        currentPath="/contact"
        onNavigate={onNavigate}
      />

      <main className="relative z-10 pb-20 sm:pb-28">
        {/* ============================================================== */}
        {/* HERO SECTION — with the cyber workstation background           */}
        {/* Matches exact font size, colors and emerge animation of hero   */}
        {/* ============================================================== */}
        <section className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-between items-center overflow-hidden pt-24 sm:pt-28 pb-6 sm:pb-8">
          {/* Background image container with cover & soft vignette overlays */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <img
              src={contactHeroBg}
              alt="Cyber workstation contact background"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none',
                filter: 'brightness(1.05) contrast(1.05)',
              }}
            />
            {/* Top vignette — blends under floating navbar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '120px',
                background: 'linear-gradient(to bottom, rgba(5,6,8,0.95) 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
            {/* Bottom vignette — blends into the contact form area */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '180px',
                background: 'linear-gradient(to top, #050608 0%, rgba(5,6,8,0.85) 50%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Top spacer to balance floating navbar */}
          <div className="h-6 sm:h-8 shrink-0 w-full" />

          {/* Centered headline & paragraph */}
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center justify-center space-y-4 sm:space-y-5 my-auto">
            {/* Tag badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-mono"
            >
              <WingLogo className="w-5 h-5 shrink-0" />
              <span>GET IN TOUCH</span>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] font-extrabold text-white tracking-[-0.02em] leading-[1.15] font-heading max-w-3xl mx-auto py-1 drop-shadow-md">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 35, scale: 0.88, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.08, ease: smoothEase }}
              >
                Let's Build Something,
              </motion.span>

              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]"
                style={{ WebkitTextFillColor: 'transparent' }}
                initial={{ opacity: 0, y: 35, scale: 0.88, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.20, ease: smoothEase }}
              >
                Innovative &amp; Impactful
              </motion.span>

              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]"
                style={{ WebkitTextFillColor: 'transparent' }}
                initial={{ opacity: 0, y: 35, scale: 0.88, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.32, ease: smoothEase }}
              >
                Together
              </motion.span>
            </h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.44, ease: smoothEase }}
              className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed font-sans"
            >
              Have a project in mind or just exploring your options? Reach out freely — we're happy to answer questions and help you figure out the right approach for your business.
            </motion.p>
          </div>

          {/* Bottom indicator pointing down to CTA form (purely visual prompt) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative z-10 flex flex-col items-center gap-1.5 text-gray-400 select-none pb-1 text-xs font-mono tracking-wider uppercase pointer-events-none"
          >
            <span className="opacity-75">Scroll to start project</span>
            <ChevronDown className="w-4 h-4 text-[#00E6D2] animate-bounce" />
          </motion.div>
        </section>

        {/* Homepage Contact / CTA Form */}
        <CTA id="contact-form" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SECTION: Get In Touch (Mail & WhatsApp) */}
          <section className="mt-14 sm:mt-20">
            <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-1.5">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-heading tracking-tight">
                Get in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]">
                  Touch
                </span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm font-normal font-sans">
                Reach out to us directly via email or WhatsApp
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-xl mx-auto">
              {/* WhatsApp */}
              <a
                href="https://wa.me/923323914198"
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-[#080D14]/85 border border-white/10 transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:-translate-y-1 text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-[#00E6D2]/40 group-hover:bg-[#00E6D2]/10 transition-all duration-300 flex items-center justify-center mb-2.5 shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_15px_rgba(0,230,210,0.15)]">
                  <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-[#00FFE5] transition-colors duration-300" />
                </div>
                <span className="text-sm sm:text-base font-bold text-white font-heading tracking-wide">
                  WhatsApp
                </span>
                <span className="text-xs text-gray-400 font-sans mt-0.5 truncate max-w-full">
                  +92 332 3914198
                </span>
              </a>

              {/* Email Us */}
              <a
                href="mailto:info@siddiquiinnovations.com"
                className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-[#080D14]/85 border border-white/10 transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:-translate-y-1 text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-[#00E6D2]/40 group-hover:bg-[#00E6D2]/10 transition-all duration-300 flex items-center justify-center mb-2.5 shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_15px_rgba(0,230,210,0.15)]">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#00FFE5] transition-colors duration-300" />
                </div>
                <span className="text-sm sm:text-base font-bold text-white font-heading tracking-wide">
                  Email Us
                </span>
                <span className="text-xs text-gray-400 font-sans mt-0.5 truncate max-w-full">
                  info@siddiquiinnovations.com
                </span>
              </a>
            </div>
          </section>

          {/* SECTION: Follow Us At (Instagram, Facebook, LinkedIn) */}
          <section className="mt-12 sm:mt-16">
            <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-1.5">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-heading tracking-tight">
                Follow Us{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]">
                  At
                </span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm font-normal font-sans">
                Connect with our social community and latest updates
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-2xl mx-auto">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/siddiqui_innovations?igsh=MTYwNGUwbG1oNHoxZw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-[#080D14]/85 border border-white/10 transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:-translate-y-1 text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-[#00E6D2]/40 group-hover:bg-[#00E6D2]/10 transition-all duration-300 flex items-center justify-center mb-2.5 shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_15px_rgba(0,230,210,0.15)]">
                  <svg className="w-5 h-5 fill-current text-gray-400 group-hover:text-[#00FFE5] transition-colors duration-300" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-bold text-white font-heading tracking-wide">
                  Instagram
                </span>
                <span className="text-xs text-gray-400 font-sans mt-0.5 truncate max-w-full">
                  @siddiqui_innovations
                </span>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-[#080D14]/85 border border-white/10 transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:-translate-y-1 text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-[#00E6D2]/40 group-hover:bg-[#00E6D2]/10 transition-all duration-300 flex items-center justify-center mb-2.5 shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_15px_rgba(0,230,210,0.15)]">
                  <svg className="w-5 h-5 fill-current text-gray-400 group-hover:text-[#00FFE5] transition-colors duration-300" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-bold text-white font-heading tracking-wide">
                  Facebook
                </span>
                <span className="text-xs text-gray-400 font-sans mt-0.5 truncate max-w-full">
                  Siddiqui Innovations
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-[#080D14]/85 border border-white/10 transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:-translate-y-1 text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-[#00E6D2]/40 group-hover:bg-[#00E6D2]/10 transition-all duration-300 flex items-center justify-center mb-2.5 shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_15px_rgba(0,230,210,0.15)]">
                  <svg className="w-5 h-5 fill-current text-gray-400 group-hover:text-[#00FFE5] transition-colors duration-300" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.222 0h.003z" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-bold text-white font-heading tracking-wide">
                  LinkedIn
                </span>
                <span className="text-xs text-gray-400 font-sans mt-0.5 truncate max-w-full">
                  Siddiqui Innovations
                </span>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
