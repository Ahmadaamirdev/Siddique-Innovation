import React, { useEffect } from 'react';
import { ShieldCheck, ArrowLeft, Scale } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Privacy Policy | Siddiqui Innovations';
    return () => {
      document.title = 'Siddiqui Innovations | AI Automation, SEO & Digital Growth';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#00E6D2] selection:text-black relative overflow-x-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="fixed top-20 left-1/4 w-[600px] h-[350px] bg-radial from-[#00E6D2]/10 via-transparent to-transparent blur-[140px] pointer-events-none -z-0" />

      {/* Floating Navbar */}
      <Navbar
        isHeroRevealed={true}
        currentPath="/privacy-policy"
        onNavigate={onNavigate}
      />

      <main className="pt-28 sm:pt-36 relative z-10 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back button */}
          <div className="mb-8">
            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-[#00E6D2] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="bg-[#080D12]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
            <div className="border-b border-white/10 pb-8 mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 text-[#00E6D2] text-xs font-semibold tracking-wider uppercase font-heading mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>LEGAL COMPLIANCE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
                Privacy Policy
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-mono mt-3">
                Last updated: March 2025
              </p>
            </div>

            <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-8">
              <p className="text-gray-200 text-base sm:text-lg">
                <strong className="text-white">Siddiqui Innovations</strong> respects your privacy. This Privacy Policy explains how we handle information when you visit our website or contact us.
              </p>

              {/* 1. Information We Collect */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">1</span>
                  Information We Collect
                </h2>
                <p>
                  We only collect the information you choose to share with us specifically, your email address when you submit an inquiry through our contact form. We do not collect any other personal data, and we do not use tracking cookies or third-party data collection tools on this website.
                </p>
              </div>

              {/* 2. How We Use Your Information */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">2</span>
                  How We Use Your Information
                </h2>
                <p>
                  Any email address submitted through our contact form is used solely to respond to your inquiry and communicate with you about your project or request. We do not use this information for any other purpose.
                </p>
              </div>

              {/* 3. Sharing of Information */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">3</span>
                  Sharing of Information
                </h2>
                <p>
                  We do not sell, rent, or share your information with third parties. Your email address is used internally, only by our team, to respond to your message.
                </p>
              </div>

              {/* 4. Data Storage & Security */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">4</span>
                  Data Storage &amp; Security
                </h2>
                <p>
                  We take reasonable measures to keep any information you share with us secure. Your email address is stored only as long as necessary to respond to and manage your inquiry.
                </p>
              </div>

              {/* 5. Your Rights */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">5</span>
                  Your Rights
                </h2>
                <p>
                  You may request that we delete any information you&apos;ve submitted to us at any time by contacting us directly at the email address listed on our Contact page.
                </p>
              </div>

              {/* 6. Changes to This Policy */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">6</span>
                  Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </div>

              {/* 7. Contact Us & Governing Law */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">7</span>
                  Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please reach out to us through our{' '}
                  <button
                    onClick={() => onNavigate('/contact')}
                    className="text-[#00FFE5] underline hover:text-white transition-colors cursor-pointer"
                  >
                    Contact page
                  </button>{' '}
                  or via email at{' '}
                  <a
                    href="mailto:info@siddiquiinnovations.com"
                    className="text-[#00FFE5] underline hover:text-white transition-colors"
                  >
                    info@siddiquiinnovations.com
                  </a>.
                </p>
                <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-mono text-gray-400 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#00E6D2]" />
                  <span>This Privacy Policy is governed by the laws of Pakistan.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
