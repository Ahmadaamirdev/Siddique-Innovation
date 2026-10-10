import React, { useEffect } from 'react';
import { ArrowLeft, Scale } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WingLogo } from './WingLogo';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Terms & Conditions | Siddiqui Innovations';
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
        currentPath="/terms"
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

          {/* Centered Heading */}
          <div className="text-center flex flex-col items-center justify-center pb-10 sm:pb-12 border-b border-white/10 mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-mono mb-4">
              <WingLogo className="w-5 h-5 shrink-0" />
              <span>TERMS OF SERVICE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[-0.02em] leading-[1.15] font-heading py-1 drop-shadow-md text-center">
              Terms &amp;{' '}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]"
                style={{ WebkitTextFillColor: 'transparent' }}
              >
                Conditions
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-mono mt-3 text-center">
              Last updated: March 2025
            </p>
          </div>

          <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-8">
              <p className="text-gray-200 text-base sm:text-lg">
                Welcome to <strong className="text-white">Siddiqui Innovations</strong>. By accessing our website or engaging our services, you agree to the following terms and conditions. Please read them carefully.
              </p>

              {/* 1. Overview */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">1</span>
                  Overview
                </h2>
                <p>
                  Siddiqui Innovations provides AI automation, web development, digital marketing, SEO, and YouTube automation services. These terms apply to anyone who visits our website or contacts us for services.
                </p>
              </div>

              {/* 2. Use of Our Website */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">2</span>
                  Use of Our Website
                </h2>
                <p>
                  You agree to use our website only for lawful purposes. You may not use it in any way that could damage, disable, or interfere with its functioning, or attempt to gain unauthorized access to any part of it.
                </p>
              </div>

              {/* 3. Services & Project Terms */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">3</span>
                  Services &amp; Project Terms
                </h2>
                <p>
                  Details specific to each project; including scope, timeline, pricing and deliverables will be agreed upon separately with each client before work begins. These general terms do not replace or override any individual project agreement.
                </p>
              </div>

              {/* 4. Intellectual Property */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">4</span>
                  Intellectual Property
                </h2>
                <p>
                  All content on this website, including text, graphics, logos, and design, is the property of Siddiqui Innovations unless otherwise stated. It may not be copied, reproduced, or used without our written permission.
                </p>
              </div>

              {/* 5. Client Responsibilities */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">5</span>
                  Client Responsibilities
                </h2>
                <p>
                  Clients are responsible for providing accurate information and timely feedback needed to complete a project. Delays caused by missing information or feedback may affect project timelines.
                </p>
              </div>

              {/* 6. Limitation of Liability */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">6</span>
                  Limitation of Liability
                </h2>
                <p>
                  While we take care to deliver high-quality work, Siddiqui Innovations is not liable for any indirect or incidental damages resulting from the use of our services or website, to the extent permitted by law.
                </p>
              </div>

              {/* 7. Changes to These Terms */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">7</span>
                  Changes to These Terms
                </h2>
                <p>
                  We may update these terms from time to time. Continued use of our website or services after changes are posted means you accept the updated terms.
                </p>
              </div>

              {/* 8. Governing Law */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">8</span>
                  Governing Law
                </h2>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm font-mono text-gray-300 flex items-center gap-2.5">
                  <Scale className="w-5 h-5 text-[#00E6D2] shrink-0" />
                  <span>These terms are governed by the laws of Pakistan.</span>
                </div>
              </div>

              {/* 9. Contact Us */}
              <div className="pt-6 border-t border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00E6D2] text-xs font-mono flex items-center justify-center">9</span>
                  Contact Us
                </h2>
                <p>
                  For any questions about these terms, please reach out through our{' '}
                  <button
                    onClick={() => onNavigate('/contact')}
                    className="text-[#00FFE5] underline hover:text-white transition-colors cursor-pointer"
                  >
                    Contact page
                  </button>{' '}
                  or via email at{' '}
                  <a
                    href="mailto:info@siddiqui-innovations.com"
                    className="text-[#00FFE5] underline hover:text-white transition-colors"
                  >
                    info@siddiqui-innovations.com
                  </a>.
                </p>
              </div>
            </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
