import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WingLogo } from './WingLogo';
import { CTA } from './CTA';
import contactHeroBg from '../assets/contact_hero_bg.jpg';

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
        <section className="relative w-full min-h-[500px] sm:min-h-[540px] lg:min-h-[580px] flex flex-col justify-between items-center overflow-hidden pt-28 sm:pt-36 pb-14 sm:pb-18 mb-8 sm:mb-12">
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
                height: '100px',
                background: 'linear-gradient(to bottom, rgba(5,6,8,0.92) 0%, transparent 100%)',
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
                background: 'linear-gradient(to top, #050608 0%, rgba(5,6,8,0.8) 50%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Centered headline & paragraph — EXACT SAME FONT SIZE & COLORS AS HOMEPAGE */}
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

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading max-w-2xl mx-auto py-1 drop-shadow-md">
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

            {/* Paragraph — EXACT font size & color as homepage */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.44, ease: smoothEase }}
              className="text-gray-300 text-xs sm:text-sm lg:text-[15px] max-w-lg mx-auto font-normal leading-relaxed font-sans"
            >
              Have a project in mind or just exploring your options? Reach out freely — we're happy to answer questions and help you figure out the right approach for your business.
            </motion.p>
          </div>
        </section>

        {/* Homepage Contact / CTA Form */}
        <CTA id="contact-form" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SECTION: Get In Touch Channel Select (After Form) */}
          <section className="mt-16 sm:mt-24">
            <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12 space-y-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white font-heading tracking-[-0.02em] leading-[1.18]">
                Get in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]">
                  Touch
                </span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base font-normal font-sans">
                Select how you would like to contact us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {/* 1. Live Chat */}
              <a
                href="https://wa.me/923323914198"
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl bg-[#080D14]/85 border border-white/10 hover:border-[#00E6D2]/60 hover:bg-[#00E6D2]/[0.03] transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,230,210,0.2)] hover:-translate-y-1.5"
              >
                {/* Concentric Layered Squircle */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-6">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-[32px] sm:rounded-[36px] bg-[#00E6D2]/10 border border-[#00E6D2]/20 group-hover:bg-[#00E6D2]/20 group-hover:border-[#00E6D2]/40 transition-all duration-300 shadow-[0_0_30px_rgba(0,230,210,0.15)]" />
                  {/* Middle ring */}
                  <div className="absolute inset-2 sm:inset-2.5 rounded-[26px] sm:rounded-[30px] bg-[#00E6D2]/20 border border-[#00E6D2]/35 transition-all duration-300" />
                  {/* Inner glowing green squircle */}
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-[#00FFE5] via-[#00E6D2] to-[#00A896] shadow-[0_0_25px_rgba(0,255,229,0.45)] flex items-center justify-center text-white transform group-hover:scale-105 transition-transform duration-300">
                    <MessageCircle className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                  </div>
                </div>

                <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#00FFE5] transition-colors font-heading tracking-wide">
                  Live chat
                </span>
              </a>

              {/* 2. Email Us */}
              <a
                href="mailto:info@siddiquiinnovations.com"
                className="group relative flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl bg-[#080D14]/85 border border-white/10 hover:border-[#00E6D2]/60 hover:bg-[#00E6D2]/[0.03] transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,230,210,0.2)] hover:-translate-y-1.5"
              >
                {/* Concentric Layered Squircle */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-6">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-[32px] sm:rounded-[36px] bg-[#00E6D2]/10 border border-[#00E6D2]/20 group-hover:bg-[#00E6D2]/20 group-hover:border-[#00E6D2]/40 transition-all duration-300 shadow-[0_0_30px_rgba(0,230,210,0.15)]" />
                  {/* Middle ring */}
                  <div className="absolute inset-2 sm:inset-2.5 rounded-[26px] sm:rounded-[30px] bg-[#00E6D2]/20 border border-[#00E6D2]/35 transition-all duration-300" />
                  {/* Inner glowing green squircle */}
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-[#00FFE5] via-[#00E6D2] to-[#00A896] shadow-[0_0_25px_rgba(0,255,229,0.45)] flex items-center justify-center text-white transform group-hover:scale-105 transition-transform duration-300">
                    <Mail className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                  </div>
                </div>

                <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#00FFE5] transition-colors font-heading tracking-wide">
                  Email us
                </span>
              </a>

              {/* 3. Book a Call */}
              <a
                href="https://wa.me/923323914198?text=Hello%2C%20I%20would%20like%20to%20book%20a%20discovery%20call%20with%20Siddiqui%20Innovations."
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl bg-[#080D14]/85 border border-white/10 hover:border-[#00E6D2]/60 hover:bg-[#00E6D2]/[0.03] transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,230,210,0.2)] hover:-translate-y-1.5"
              >
                {/* Concentric Layered Squircle */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-6">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-[32px] sm:rounded-[36px] bg-[#00E6D2]/10 border border-[#00E6D2]/20 group-hover:bg-[#00E6D2]/20 group-hover:border-[#00E6D2]/40 transition-all duration-300 shadow-[0_0_30px_rgba(0,230,210,0.15)]" />
                  {/* Middle ring */}
                  <div className="absolute inset-2 sm:inset-2.5 rounded-[26px] sm:rounded-[30px] bg-[#00E6D2]/20 border border-[#00E6D2]/35 transition-all duration-300" />
                  {/* Inner glowing green squircle */}
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-[#00FFE5] via-[#00E6D2] to-[#00A896] shadow-[0_0_25px_rgba(0,255,229,0.45)] flex items-center justify-center text-white transform group-hover:scale-105 transition-transform duration-300">
                    <Phone className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                  </div>
                </div>

                <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#00FFE5] transition-colors font-heading tracking-wide">
                  Book a call
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
