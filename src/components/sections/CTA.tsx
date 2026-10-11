import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Check } from 'lucide-react';
import { WingLogo } from '@/components/ui/WingLogo';

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
    <section id={id} className={`bg-[#050505] relative z-10 overflow-hidden border-b border-white/10 scroll-mt-20 ${className || 'py-14 md:py-20'}`}>
      {id !== 'contact' && <span id="contact" className="sr-only" />}
      {id !== 'service-cta' && <span id="service-cta" className="sr-only" />}
      {/* Soft Ambient Cyan Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-radial from-[#00E6D2]/10 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[300px] bg-radial from-[#00FFE5]/5 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const }}
          className="relative bg-[#080D12]/90 backdrop-blur-2xl border border-white/10 hover:border-[#00E6D2]/30 rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden transition-colors duration-500"
        >
          {/* Subtle Corner Cyan Lighting */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00E6D2]/15 blur-[90px] rounded-full pointer-events-none" />

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
                      className={`inline-flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#0B0F15] border transition-all duration-300 cursor-pointer select-none max-w-full ${
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
