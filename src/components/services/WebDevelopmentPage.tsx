import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  Smartphone,
  Tablet,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  Zap,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import type { ServiceItemData } from '../../data/servicesData';
import { serviceList } from '../../data/servicesData';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { WingLogo } from '../WingLogo';

interface WebDevelopmentPageProps {
  service: ServiceItemData;
  onNavigateHome: () => void;
  onNavigateService: (slug: string) => void;
}

export const WebDevelopmentPage: React.FC<WebDevelopmentPageProps> = ({
  service,
  onNavigateHome,
  onNavigateService,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeStep, setActiveStep] = useState(0);

  const handleNav = (path: string) => {
    if (path === '/') {
      onNavigateHome();
    } else if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '').replace(/\/$/, '');
      onNavigateService(slug);
    } else {
      window.history.pushState({}, '', path);
      window.location.href = path;
    }
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('service-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-white selection:bg-[#00E6D2] selection:text-black relative overflow-x-hidden font-sans">
      {/* Background Soft Engineering Grid */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-0" />
      <div className="fixed top-20 right-1/4 w-[600px] h-[350px] bg-gradient-to-br from-[#00E6D2]/10 via-[#3B82F6]/5 to-transparent blur-[140px] pointer-events-none -z-0" />

      <Navbar
        isHeroRevealed={true}
        currentPath={`/services/${service.slug}`}
        onNavigate={handleNav}
      />

      <main className="pt-28 sm:pt-36 relative z-10">
        {/* 1. HERO SECTION: Modern Studio Layout with Live Device Viewport */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 text-center">
          <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-6">
            <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
            <span>MODERN WEB ENGINEERING & HIGH-CONVERSION UI</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading max-w-4xl mx-auto leading-tight">
            High-Performance Websites That Turn{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#60A5FA]">
              Visitors Into Customers
            </span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            {service.heroDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#service-cta"
              onClick={handleScrollToContact}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_25px_rgba(0,230,210,0.4)] hover:shadow-[0_0_40px_rgba(0,255,229,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 font-heading cursor-pointer"
            >
              <span>{service.ctaButtonText}</span>
              <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href="#interactive-viewport"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-[#00E6D2]/15 border border-white/15 hover:border-[#00E6D2]/40 hover:text-[#00FFE5] transition-all duration-300 cursor-pointer"
            >
              <span>Test Device Responsiveness</span>
            </a>
          </div>

          {/* Interactive Responsive Browser Viewport Simulator */}
          <div id="interactive-viewport" className="mt-16 max-w-5xl mx-auto">
            <div className="rounded-2xl bg-[#090D13] border border-white/10 shadow-2xl p-4 sm:p-6 text-left">
              {/* Browser chrome top bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs font-mono text-gray-400">
                    https://your-business.com
                  </span>
                </div>

                {/* Device switch buttons */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
                  <button
                    onClick={() => setDeviceMode('desktop')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                      deviceMode === 'desktop' ? 'bg-white/10 text-white' : 'text-gray-400'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setDeviceMode('tablet')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                      deviceMode === 'tablet' ? 'bg-white/10 text-white' : 'text-gray-400'
                    }`}
                  >
                    <Tablet className="w-3.5 h-3.5" />
                    <span>Tablet</span>
                  </button>
                  <button
                    onClick={() => setDeviceMode('mobile')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                      deviceMode === 'mobile' ? 'bg-white/10 text-white' : 'text-gray-400'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* Viewport Render Frame */}
              <div className="py-8 flex justify-center bg-black/20 rounded-xl my-4 min-h-[300px] items-center transition-all duration-300">
                <div
                  className={`border border-white/10 bg-[#0B1017] rounded-xl p-6 transition-all duration-300 shadow-xl ${
                    deviceMode === 'desktop'
                      ? 'w-full'
                      : deviceMode === 'tablet'
                      ? 'w-[520px]'
                      : 'w-[320px]'
                  }`}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/5 text-xs text-gray-400">
                    <span className="font-bold text-white">BRAND DEMO</span>
                    <span className="text-[#00E6D2]">● 60 FPS Fluid</span>
                  </div>
                  <div className="py-6 text-center space-y-3">
                    <div className="text-lg font-bold text-white font-heading">
                      Next-Gen Digital Experience
                    </div>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto">
                      Sub-second load speeds, responsive grids, and instant conversion flows.
                    </p>
                    <div className="pt-2 flex justify-center gap-2">
                      <div className="h-7 px-4 rounded bg-[#00E6D2] text-black text-xs font-bold flex items-center">
                        Explore Now
                      </div>
                      <div className="h-7 px-4 rounded bg-white/10 text-white text-xs flex items-center">
                        Case Study
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance scorecard footer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-center font-mono">
                <div className="p-2 rounded bg-white/[0.02]">
                  <div className="text-lg font-bold text-emerald-400">99 / 100</div>
                  <div className="text-[11px] text-gray-400">Performance</div>
                </div>
                <div className="p-2 rounded bg-white/[0.02]">
                  <div className="text-lg font-bold text-emerald-400">100 / 100</div>
                  <div className="text-[11px] text-gray-400">Accessibility</div>
                </div>
                <div className="p-2 rounded bg-white/[0.02]">
                  <div className="text-lg font-bold text-emerald-400">100 / 100</div>
                  <div className="text-[11px] text-gray-400">SEO Score</div>
                </div>
                <div className="p-2 rounded bg-white/[0.02]">
                  <div className="text-lg font-bold text-[#00E6D2]">0.4s</div>
                  <div className="text-[11px] text-gray-400">FCP Speed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE PROBLEM & SOLUTION: Outdated Websites vs Fresh Builds */}
        <section className="py-20 bg-[#070A0F] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
                <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                <span>WEBSITE AUDIT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
                {service.problemHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Problem */}
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">The Cost of a Sluggish Website</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {service.problemText}
                </p>
                <div className="space-y-3 text-xs text-gray-400 font-mono">
                  <div className="p-3 rounded bg-red-950/20 border border-red-500/20 text-red-300 flex items-center justify-between">
                    <span>Bounce rate after 3s load time</span>
                    <span className="font-bold text-red-400">+53% Abandonment</span>
                  </div>
                  <div className="p-3 rounded bg-red-950/20 border border-red-500/20 text-red-300 flex items-center justify-between">
                    <span>Non-responsive mobile views</span>
                    <span className="font-bold text-red-400">Lost Mobile Sales</span>
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className="p-8 rounded-2xl bg-[#00E6D2]/5 border border-[#00E6D2]/30 shadow-[0_0_30px_rgba(0,230,210,0.08)]">
                <h3 className="text-xl font-bold text-white mb-3">Engineered for Maximum Speed & Trust</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {service.solutionText}
                </p>
                <div className="space-y-3 text-xs text-gray-300 font-mono">
                  <div className="p-3 rounded bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-cyan-200 flex items-center justify-between">
                    <span>Lightning-fast modern framework</span>
                    <span className="font-bold text-[#00E6D2]">Sub-Second Speed</span>
                  </div>
                  <div className="p-3 rounded bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-cyan-200 flex items-center justify-between">
                    <span>Modern aesthetic & branding</span>
                    <span className="font-bold text-[#00E6D2]">Higher Conversions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ASYMMETRICAL BENTO BOX: Features & Deliverables */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>DEVELOPMENT SCOPE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
              What You Get With Our Web Development
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#080D12] border border-white/10 hover:border-[#00E6D2]/40 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00E6D2] mb-4 group-hover:scale-105 transition-transform">
                    {i === 0 && <Sparkles className="w-5 h-5" />}
                    {i === 1 && <Smartphone className="w-5 h-5" />}
                    {i === 2 && <Zap className="w-5 h-5" />}
                    {i === 3 && <TrendingUp className="w-5 h-5" />}
                    {i === 4 && <ShieldCheck className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00FFE5] transition-colors mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E6D2]" />
                  <span>Production Ready</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SPRINT ROADMAP: 5-Stage Step Delivery */}
        <section className="py-20 bg-[#070A0F] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
                <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                <span>AGILE SPRINT DELIVERY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
                {service.processHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {service.processSteps.map((step, idx) => (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    activeStep === idx
                      ? 'bg-[#00E6D2]/10 border-[#00E6D2]'
                      : 'bg-[#090D12] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-[#00E6D2] mb-3">
                    SPRINT 0{step.number}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FAQS */}
        <section className="py-14 md:py-20 relative z-10 overflow-hidden border-b border-white/10">
          {/* Soft Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-radial from-[#00E6D2]/5 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
                  <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                  <span>FAQS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
                  {service.faqsHeading}
                </h2>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-sans pt-1">
                  Everything you need to know about our {service.title.toLowerCase()} service and delivery.
                </p>
              </div>
            </div>

            {/* Decent, Refined Accordion List */}
            <div className="space-y-3.5">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.06,
                      ease: [0.22, 0.61, 0.36, 1] as const,
                    }}
                    className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                      isOpen
                        ? 'bg-[#0A0E13] border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                        : 'bg-[#0A0E13]/60 border-white/10 hover:border-white/20 hover:bg-[#0A0E13]/85'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full px-5 sm:px-6 py-4.5 sm:py-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                        <span className="text-xs font-mono font-medium text-gray-500 shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`text-base sm:text-[17px] font-medium tracking-tight transition-colors font-heading ${
                            isOpen
                              ? 'text-white'
                              : 'text-gray-200 group-hover:text-white'
                          }`}
                        >
                          {faq.question}
                        </span>
                      </div>

                      {/* Clean Dropdown Arrow Button */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#00E6D2]/15 border-[#00E6D2]/50 text-[#00FFE5] rotate-180 shadow-[0_0_12px_rgba(0,230,210,0.2)]'
                            : 'bg-white/[0.04] border-white/10 text-gray-400 group-hover:bg-[#00E6D2]/15 group-hover:border-[#00E6D2]/50 group-hover:text-[#00FFE5] group-hover:shadow-[0_0_12px_rgba(0,230,210,0.2)]'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] as const }}
                        >
                          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-gray-400 text-sm sm:text-[15px] leading-relaxed font-sans border-t border-white/5">
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. EXPLORE OTHER SERVICES */}
        <section className="py-16 border-t border-white/10 bg-[#06080B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>EXPLORE SERVICES</span>
            </div>
            <h3 className="text-lg font-bold text-gray-300 mb-6 font-heading">
              Explore Our Other Core Services
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {serviceList
                .filter((s) => s.slug !== service.slug)
                .map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => onNavigateService(s.slug)}
                    className="px-5 py-2.5 rounded-full bg-[#0A0E13]/80 border border-white/10 hover:border-[#00E6D2]/40 hover:bg-[#00E6D2]/15 text-xs sm:text-sm font-medium text-gray-300 hover:text-[#00FFE5] hover:shadow-[0_0_15px_rgba(0,230,210,0.2)] transition-all duration-200 cursor-pointer"
                  >
                    {s.title}
                  </button>
                ))}
            </div>
          </div>
        </section>

        {/* 7. CTA SECTION */}
        <section id="service-cta" className="py-24 text-center px-4 max-w-4xl mx-auto">
          <div className="p-10 rounded-2xl bg-gradient-to-b from-[#080D12] to-[#040608] border border-white/10 shadow-2xl relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mb-4">
              {service.ctaHeading}
            </h2>
            <p className="text-gray-300 text-base mb-8 max-w-xl mx-auto">
              {service.ctaSubheading}
            </p>
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 200);
              }}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_25px_rgba(0,230,210,0.4)] hover:shadow-[0_0_40px_rgba(0,255,229,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 font-heading cursor-pointer"
            >
              <span>{service.ctaButtonText}</span>
              <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
