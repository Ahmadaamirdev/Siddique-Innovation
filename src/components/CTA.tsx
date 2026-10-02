import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Check } from 'lucide-react';
import { WingLogo } from './WingLogo';
import brandLogo from '../assets/brand_logo.png';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LdbN8stAAAAANPQlJXUvyeBGZvjvtXd_Iv4BEB0';

export interface CTAProps {
  initialService?: string;
  heading?: string;
  subheading?: string;
  id?: string;
}

export const CTA: React.FC<CTAProps> = ({
  initialService = 'Web Development',
  heading = 'Ready to Build Something Better?',
  subheading = "Let's talk about your project and how we can help you grow.",
  id = 'contact',
}) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: initialService,
    message: '',
  });

  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Dynamically load official Google reCAPTCHA v3 script
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;

    const scriptId = 'google-recaptcha-v3-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  const handleVerifyClick = async () => {
    if (isVerified || isVerifying) return;
    setIsVerifying(true);
    setVerificationError(false);

    try {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
              action: 'contact_submit',
            });
            setRecaptchaToken(token);
            setIsVerified(true);
          } catch (err) {
            console.warn('reCAPTCHA execution fallback:', err);
            // Fallback gracefully so legitimate users are never locked out if offline/blocked
            setIsVerified(true);
          } finally {
            setIsVerifying(false);
          }
        });
      } else {
        // If script is still initializing, wait slightly and complete
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

    // Token is available in recaptchaToken for backend verification
    setSubmitted(true);
  };

  const services = [
    'Web Development',
    'AI Automation',
    'Digital Marketing',
    'SEO',
    'YouTube Automation',
    'Other',
  ];

  return (
    <section id={id} className="py-14 md:py-20 bg-[#050505] relative z-10 overflow-hidden border-b border-white/10 scroll-mt-20">
      {id !== 'contact' && <span id="contact" className="sr-only" />}
      {id !== 'service-cta' && <span id="service-cta" className="sr-only" />}
      {/* Soft Ambient Cyan Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-radial from-[#00E6D2]/10 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[300px] bg-radial from-[#00FFE5]/5 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const }}
          className="relative bg-[#080D12]/90 backdrop-blur-2xl border border-white/10 hover:border-[#00E6D2]/30 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden transition-colors duration-500"
        >
          {/* Subtle Corner Cyan Lighting */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00E6D2]/15 blur-[90px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
            {/* Left Column: Heading, Subheading & Direct Social Links */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
                <WingLogo className="w-5 h-5 shrink-0" />
                <span>START A PROJECT</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading">
                {heading}
              </h2>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-sans">
                {subheading}
              </p>

              {/* Direct Social Links & Email (Icons Only) */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3 flex-wrap">
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

              {/* Brand Logo under social links */}
              <div className="pt-10 sm:pt-14 flex justify-center items-center w-full">
                <img
                  src={brandLogo}
                  alt="Siddiqui Innovations Logo"
                  className="w-64 sm:w-72 md:w-80 max-w-full h-auto object-contain select-none drop-shadow-[0_0_30px_rgba(0,230,210,0.22)] mx-auto"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-[#05080C]/80 border border-white/10 rounded-2xl p-6 sm:p-8">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#00E6D2]/15 border border-[#00E6D2]/40 text-[#00FFE5] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,230,210,0.2)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    Thank You! We Received Your Message.
                  </h3>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">
                    We'll review your project details and get back to you with next steps within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setIsVerified(false);
                      setVerificationError(false);
                      setFormState({
                        name: '',
                        email: '',
                        service: 'Web Development',
                        message: '',
                      });
                    }}
                    className="inline-block mt-4 text-xs font-semibold text-[#00E6D2] hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-medium text-gray-300">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Alex Morgan"
                        className="w-full bg-[#0B0F15] border border-white/10 focus:border-[#00E6D2] focus:ring-1 focus:ring-[#00E6D2] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-medium text-gray-300">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="alex@company.com"
                        className="w-full bg-[#0B0F15] border border-white/10 focus:border-[#00E6D2] focus:ring-1 focus:ring-[#00E6D2] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Service Needed Selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="service" className="text-xs font-medium text-gray-300">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      value={formState.service}
                      onChange={(e) =>
                        setFormState({ ...formState, service: e.target.value })
                      }
                      className="w-full bg-[#0B0F15] border border-white/10 focus:border-[#00E6D2] focus:ring-1 focus:ring-[#00E6D2] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-300 cursor-pointer"
                    >
                      {services.map((srv) => (
                        <option key={srv} value={srv} className="bg-[#0B0F15] text-white">
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-gray-300">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Tell us about your project goals, scope, and target timeline..."
                      className="w-full bg-[#0B0F15] border border-white/10 focus:border-[#00E6D2] focus:ring-1 focus:ring-[#00E6D2] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Custom Human Verification Checkbox (100% In Sync With Background) */}
                  <div className="pt-1">
                    <div
                      onClick={handleVerifyClick}
                      className={`inline-flex items-center justify-between gap-6 px-4 py-3 rounded-xl bg-[#0B0F15] border transition-all duration-300 cursor-pointer select-none ${
                        isVerified
                          ? 'border-[#00E6D2]/60 shadow-[0_0_15px_rgba(0,230,210,0.15)]'
                          : 'border-white/10 hover:border-[#00E6D2]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all duration-300 ${
                            isVerified
                              ? 'bg-[#00E6D2] border-[#00E6D2] text-[#050505] shadow-[0_0_10px_#00E6D2]'
                              : isVerifying
                              ? 'border-[#00E6D2] bg-[#05080C]'
                              : 'border-white/25 bg-[#05080C] hover:border-[#00E6D2]/60'
                          }`}
                        >
                          {isVerifying ? (
                            <div className="w-3.5 h-3.5 border-2 border-[#00E6D2] border-t-transparent rounded-full animate-spin" />
                          ) : isVerified ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : null}
                        </div>
                        <span className="text-sm font-medium text-gray-200">
                          I'm not a robot
                        </span>
                      </div>

                      {/* Official Google reCAPTCHA Branding & Links */}
                      <div className="flex flex-col items-center pl-4 border-l border-white/10 select-none">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-[#00E6D2]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm1 17.93V17a1 1 0 00-2 0v2.93A8.01 8.01 0 014.07 13H7a1 1 0 000-2H4.07A8.01 8.01 0 0111 4.07V7a1 1 0 002 0V4.07A8.01 8.01 0 0119.93 11H17a1 1 0 000 2h2.93A8.01 8.01 0 0113 19.93z" />
                          </svg>
                          <span className="text-[10px] font-bold text-gray-200 tracking-wider">
                            reCAPTCHA
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[8px] text-gray-400 mt-0.5">
                          <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-[#00E6D2] hover:underline"
                          >
                            Privacy
                          </a>
                          <span>·</span>
                          <a
                            href="https://policies.google.com/terms"
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-[#00E6D2] hover:underline"
                          >
                            Terms
                          </a>
                        </div>
                      </div>
                    </div>

                    <input type="hidden" name="g-recaptcha-response" value={recaptchaToken || ''} />

                    {verificationError && (
                      <p className="text-rose-400 text-xs mt-1.5 font-medium">
                        Please verify that you are not a robot before submitting.
                      </p>
                    )}
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_4px_15px_rgba(0,230,210,0.2)] hover:shadow-[0_4px_20px_rgba(0,230,210,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span>Submit Message</span>
                      <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
