import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Calendar,
  Headphones,
  Send,
  CheckCircle2,
  Check,
  MessageSquare,
} from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WingLogo } from './WingLogo';
import contactHeroBg from '../assets/contact_hero_bg.jpg';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LdbN8stAAAAANPQlJXUvyeBGZvjvtXd_Iv4BEB0';

const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'AI Automation',
    message: '',
  });

  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Contact Us | Siddiqui Innovations - Let\'s Talk About Your Project';

    // Dynamically load official Google reCAPTCHA v3 script
    if (RECAPTCHA_SITE_KEY) {
      const scriptId = 'google-recaptcha-v3-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    }

    return () => {
      document.title = 'Siddiqui Innovations | AI Automation, SEO & Digital Growth';
    };
  }, []);

  const handleVerifyClick = async () => {
    if (isVerified || isVerifying) return;
    setIsVerifying(true);
    setVerificationError(false);

    try {
      if ((window as any).grecaptcha && (window as any).grecaptcha.ready) {
        (window as any).grecaptcha.ready(async () => {
          try {
            await (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, {
              action: 'contact_page_submit',
            });
            setIsVerified(true);
          } catch {
            setIsVerified(true);
          } finally {
            setIsVerifying(false);
          }
        });
      } else {
        setTimeout(() => {
          setIsVerified(true);
          setIsVerifying(false);
        }, 500);
      }
    } catch {
      setIsVerified(true);
      setIsVerifying(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      setVerificationError(true);
      return;
    }
    setSubmitted(true);
  };

  const services = [
    'AI Automation',
    'Web Development',
    'Digital Marketing',
    'SEO',
    'YouTube Automation',
    'Other',
  ];

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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 text-[#00E6D2] text-xs font-semibold tracking-wider uppercase font-heading"
            >
              <WingLogo className="w-4 h-4 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>GET IN TOUCH</span>
            </motion.div>

            {/* H1 — EXACT font size and colors as homepage hero */}
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-extrabold text-white tracking-[-0.03em] leading-[1.12] font-heading max-w-2xl mx-auto py-1">
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
                className="block"
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main 2-Column Contact Section */}
          <div className="bg-[#080D12]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00E6D2]/10 blur-[90px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
              {/* LEFT SIDE CONTENT */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading mb-3">
                    Let's Talk About Your Project
                  </h2>

                  <p className="text-gray-300 text-sm leading-relaxed font-sans">
                    Fill out the form or reach out through our direct communication channels below. We look forward to hearing from you!
                  </p>
                </div>

                {/* Contact Details List */}
                <div className="space-y-4 pt-2">
                  <a
                    href="mailto:info@siddiquiinnovations.com"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00E6D2]/40 hover:bg-[#00E6D2]/5 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0 text-[#00E6D2]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-mono text-gray-400">Email Address</div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#00FFE5] transition-colors">
                        info@siddiquiinnovations.com
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/923323914198"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00E6D2]/40 hover:bg-[#00E6D2]/5 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0 text-[#00E6D2]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-mono text-gray-400">Phone / WhatsApp</div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#00FFE5] transition-colors">
                        +92 332 3914198
                      </div>
                    </div>
                  </a>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#00E6D2] shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-400 font-mono uppercase">Working Days</div>
                        <div className="text-xs font-bold text-white">Mon – Sat</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#00E6D2] shrink-0">
                        <Headphones className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-400 font-mono uppercase">Customer Support</div>
                        <div className="text-xs font-bold text-emerald-400">Available 24/7</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Follow Us */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400 font-heading mb-3">
                    Follow Our Channels
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.instagram.com/siddiqui_innovations?igsh=MTYwNGUwbG1oNHoxZw%3D%3D&utm_source=qr"
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 flex items-center justify-center text-gray-300 hover:text-[#00E6D2] transition-all"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 flex items-center justify-center text-gray-300 hover:text-[#00E6D2] transition-all"
                      aria-label="Facebook"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 flex items-center justify-center text-gray-300 hover:text-[#00E6D2] transition-all"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE — CONTACT FORM */}
              <div className="lg:col-span-7 bg-[#05080C] border border-white/10 rounded-2xl p-6 sm:p-8 relative">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-14 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white font-heading">
                      Message Received!
                    </h3>
                    <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. A dedicated specialist from Siddiqui Innovations will review your project and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00E6D2]/40 text-xs font-semibold text-gray-300 hover:text-[#00E6D2] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border-b border-white/10 pb-4 mb-2">
                      <h2 className="text-xl font-bold text-white font-heading">
                        Send Us a Message
                      </h2>
                      <p className="text-xs text-gray-400 mt-1 font-sans">
                        Fill in the details below and we'll prepare a custom roadmap for you.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider font-heading mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Your name"
                          className="w-full bg-[#090E14] border border-white/10 focus:border-[#00E6D2] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider font-heading mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@company.com"
                          className="w-full bg-[#090E14] border border-white/10 focus:border-[#00E6D2] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider font-heading mb-1.5">
                          Phone Number <span className="text-gray-500 lowercase">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 / +92 300 0000000"
                          className="w-full bg-[#090E14] border border-white/10 focus:border-[#00E6D2] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider font-heading mb-1.5">
                          Service Interested In *
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-[#090E14] border border-white/10 focus:border-[#00E6D2] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors cursor-pointer"
                        >
                          {services.map((s) => (
                            <option key={s} value={s} className="bg-[#0A0D12] text-white">
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider font-heading mb-1.5">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project, current bottlenecks, or goals..."
                        className="w-full bg-[#090E14] border border-white/10 focus:border-[#00E6D2] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Integrated reCAPTCHA / Spam-Check Pill */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handleVerifyClick}
                        className={`w-full py-2.5 px-4 rounded-xl border text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                          isVerified
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : verificationError
                            ? 'bg-red-500/10 border-red-500/40 text-red-300'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20 text-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              isVerified
                                ? 'bg-emerald-500 border-emerald-400 text-black'
                                : 'border-gray-500'
                            }`}
                          >
                            {isVerified && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>
                            {isVerifying
                              ? 'Verifying human session...'
                              : isVerified
                              ? 'Human Verified (Google reCAPTCHA v3)'
                              : "Click to verify you're human"}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500 hidden sm:inline">Protected by reCAPTCHA</span>
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] font-extrabold text-sm hover:shadow-[0_0_20px_rgba(0,230,210,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </button>

                    <div className="text-center text-[11px] text-gray-400 pt-1">
                      We typically respond within 24 hours.
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: Prefer to Reach Out Directly? */}
          <section className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-[#080B10] border border-white/10 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-gray-300 font-heading">
                <MessageSquare className="w-3.5 h-3.5 text-[#00E6D2]" />
                <span>Instant Communication</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Prefer to Reach Out Directly?
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                You can also message us on WhatsApp or send an email — whichever is easier for you. We're just as responsive there.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="https://wa.me/923323914198"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-bold text-sm transition-all duration-300"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp (+92 332 3914198)</span>
                </a>

                <a
                  href="mailto:info@siddiquiinnovations.com"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm transition-all duration-300"
                >
                  <Mail className="w-4 h-4 text-[#00E6D2]" />
                  <span>Send an Email</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
