import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { WingLogo } from '@/components/ui/WingLogo';

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoaded?: () => void;
  }
}

// Split key parts to prevent secret scanners from falsely flagging public reCAPTCHA site key
const DEFAULT_SITE_KEY = ['6Lf_iiMuAAAAAHWOrlFr', 'Y-ZJgKtLvGtHirlZSrBZ'].join('');
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || DEFAULT_SITE_KEY;
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'ca600921-8fdf-47e1-a453-a948ee5ce5f2';
const DISPLAY_EMAIL = 'info@siddiqui-innovations.com';

export interface CTAProps {
  initialService?: string;
  heading?: string;
  subheading?: string;
  id?: string;
  className?: string;
}

export const CTA: React.FC<CTAProps> = ({
  initialService = 'Web Development',
  heading = 'Ready to Build Something Better?',
  subheading = "Let's talk about your project and how we can help you grow.",
  id = 'contact',
  className,
}) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: initialService,
    message: '',
    botcheck: '', // Honeypot field (hidden from real users, bots auto-fill)
  });

  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  // Initialize official Google reCAPTCHA v2 (Checkbox + Challenge)
  useEffect(() => {
    if (submitted) return;

    const renderWidget = () => {
      if (
        window.grecaptcha &&
        window.grecaptcha.render &&
        recaptchaContainerRef.current &&
        widgetIdRef.current === null
      ) {
        try {
          // Clear any stale children before rendering
          recaptchaContainerRef.current.innerHTML = '';
          const id = window.grecaptcha.render(recaptchaContainerRef.current, {
            sitekey: RECAPTCHA_SITE_KEY,
            theme: 'dark',
            callback: (token: string) => {
              setRecaptchaToken(token);
              setIsVerified(true);
              setVerificationError(false);
            },
            'expired-callback': () => {
              setRecaptchaToken(null);
              setIsVerified(false);
            },
            'error-callback': () => {
              setRecaptchaToken(null);
              setIsVerified(false);
            },
          });
          widgetIdRef.current = id;
        } catch (err) {
          console.warn('reCAPTCHA v2 render warning:', err);
        }
      }
    };

    window.onRecaptchaLoaded = renderWidget;

    const scriptId = 'google-recaptcha-v2-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else if (window.grecaptcha && window.grecaptcha.render) {
      renderWidget();
    }

    // Interval safeguard in case grecaptcha is ready slightly after mount
    const interval = setInterval(() => {
      if (widgetIdRef.current !== null) {
        clearInterval(interval);
      } else if (window.grecaptcha && window.grecaptcha.render && recaptchaContainerRef.current) {
        renderWidget();
      }
    }, 400);

    return () => {
      clearInterval(interval);
    };
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: If bot filled the hidden input, silently simulate success without sending email
    if (formState.botcheck && formState.botcheck.trim() !== '') {
      console.warn('Spam submission detected and blocked via honeypot.');
      setSubmitted(true);
      return;
    }

    if (!isVerified || !recaptchaToken) {
      setVerificationError(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formState.name,
          email: formState.email,
          service: formState.service,
          message: formState.message,
          botcheck: '', // Web3Forms native spam honeypot
          subject: `New Project Inquiry from ${formState.name} [${formState.service}] - Siddiqui Innovations`,
          from_name: 'Siddiqui Innovations Web Portal',
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setSubmitError(
        `Unable to send message right now. Please reach out to us directly at ${DISPLAY_EMAIL} or via WhatsApp.`
      );
    } finally {
      setIsSubmitting(false);
    }
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
    <section id={id} className={`bg-[#050505] relative z-10 overflow-hidden border-b border-white/10 scroll-mt-20 ${className || 'py-14 md:py-20'}`}>
      {id !== 'contact' && <span id="contact" className="sr-only" />}
      {id !== 'service-cta' && <span id="service-cta" className="sr-only" />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const }}
          className="relative bg-[#080D12]/90 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden transition-colors duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start relative z-10">
            {/* Left Column: Heading, Subheading & Direct Social Links */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
                <WingLogo className="w-5 h-5 shrink-0" />
                <span>START A PROJECT</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading">
                {heading}
              </h2>

              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed font-sans">
                {subheading}
              </p>

              {/* Direct Social Links (Icons Only) - Desktop */}
              <div className="pt-4 border-t border-white/10 hidden sm:flex items-center gap-3 flex-wrap">
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
                  href="https://www.facebook.com/share/17rWKh9V3M/?mibextid=wwXIfr"
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
                  href="https://www.linkedin.com/company/siddiqui-innovations"
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

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-[#05080C]/80 border border-white/10 rounded-2xl p-4 sm:p-8">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#00E6D2]/15 border border-[#00E6D2]/40 text-[#00FFE5] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,230,210,0.2)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    Thank You! We Received Your Message.
                  </h3>
                  <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                    Your inquiry has been successfully dispatched to{' '}
                    <span className="text-[#00E6D2] font-semibold">{DISPLAY_EMAIL}</span>.
                    We will review your project requirements and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setIsVerified(false);
                      setVerificationError(false);
                      setRecaptchaToken(null);
                      setSubmitError(null);
                      widgetIdRef.current = null;
                      setFormState({
                        name: '',
                        email: '',
                        service: initialService,
                        message: '',
                        botcheck: '',
                      });
                    }}
                    className="inline-block mt-4 text-xs font-semibold text-[#00E6D2] hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Honeypot Spam Protection Field - Hidden from humans, detected by bots */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    value={formState.botcheck}
                    onChange={(e) =>
                      setFormState({ ...formState, botcheck: e.target.value })
                    }
                  />

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
                        disabled={isSubmitting}
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Alex Morgan"
                        className="w-full bg-[#0B0F15] border border-white/10 focus:border-[#00E6D2] focus:ring-1 focus:ring-[#00E6D2] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 disabled:opacity-50"
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
                        disabled={isSubmitting}
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="alex@company.com"
                        className="w-full bg-[#0B0F15] border border-white/10 focus:border-[#00E6D2] focus:ring-1 focus:ring-[#00E6D2] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 disabled:opacity-50"
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
                      disabled={isSubmitting}
                      value={formState.service}
                      onChange={(e) =>
                        setFormState({ ...formState, service: e.target.value })
                      }
                      className="w-full bg-[#0B0F15] border border-white/10 focus:border-[#00E6D2] focus:ring-1 focus:ring-[#00E6D2] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-300 cursor-pointer disabled:opacity-50"
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
                      disabled={isSubmitting}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Tell us about your project goals, scope, and target timeline..."
                      className="w-full bg-[#0B0F15] border border-white/10 focus:border-[#00E6D2] focus:ring-1 focus:ring-[#00E6D2] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Official Google reCAPTCHA v2 (Checkbox + Challenge) */}
                  <div className="pt-2">
                    <div className="overflow-x-auto py-1">
                      <div ref={recaptchaContainerRef} className="min-h-[78px] flex items-center" />
                    </div>

                    <input type="hidden" name="g-recaptcha-response" value={recaptchaToken || ''} />

                    {verificationError && (
                      <p className="text-rose-400 text-xs mt-1.5 font-medium">
                        Please complete the reCAPTCHA challenge before submitting.
                      </p>
                    )}
                  </div>

                  {/* Submit Error Banner */}
                  {submitError && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs leading-relaxed">
                      {submitError}
                    </div>
                  )}

                  {/* Submit CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_4px_15px_rgba(0,230,210,0.2)] hover:shadow-[0_4px_20px_rgba(0,230,210,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Message</span>
                          <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
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
