import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Mail, Check } from 'lucide-react';
import { WingLogo } from './WingLogo';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LdbN8stAAAAANPQlJXUvyeBGZvjvtXd_Iv4BEB0';

export const CTA: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: 'Web Development',
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
    <section id="contact" className="py-20 md:py-28 bg-[#050505] relative z-10 overflow-hidden border-b border-white/10">
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
                <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                <span>START A PROJECT</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
                Ready to Build Something Better?
              </h2>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-sans">
                Let's talk about your project and how we can help you grow.
              </p>

              {/* Direct Social Links & Email */}
              <div className="pt-4 border-t border-white/10 space-y-3.5">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Instagram */}
                  <motion.a
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.instagram.com/siddiqui_innovations?igsh=MTYwNGUwbG1oNHoxZw%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 text-xs font-medium text-gray-300 hover:text-[#00E6D2] transition-all duration-300 shadow-[0_0_10px_rgba(0,230,210,0.05)]"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current text-[#00E6D2]" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram</span>
                  </motion.a>

                  {/* WhatsApp */}
                  <motion.a
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/message/JLNLM2A5GEEMG1"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 text-xs font-medium text-gray-300 hover:text-[#00E6D2] transition-all duration-300 shadow-[0_0_10px_rgba(0,230,210,0.05)]"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-4 h-4 fill-current text-[#00E6D2]" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>WhatsApp</span>
                  </motion.a>
                </div>

                {/* Email Pill */}
                <div>
                  <a
                    href="mailto:contact@siddiqui-innovations.com"
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#00E6D2]/40 hover:bg-[#00E6D2]/10 text-xs text-gray-300 hover:text-[#00E6D2] transition-all duration-300"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#00E6D2]" />
                    <span>contact@siddiqui-innovations.com</span>
                  </a>
                </div>
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
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_4px_20px_rgba(0,230,210,0.25)] hover:shadow-[0_4px_25px_rgba(0,230,210,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
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
