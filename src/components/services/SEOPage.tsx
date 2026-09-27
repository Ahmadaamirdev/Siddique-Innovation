import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  TrendingUp,
  Globe2,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
  Star,
  ExternalLink,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import type { ServiceItemData } from '../../data/servicesData';
import { serviceList } from '../../data/servicesData';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { WingLogo } from '../WingLogo';

interface SEOPageProps {
  service: ServiceItemData;
  onNavigateHome: () => void;
  onNavigateService: (slug: string) => void;
}

export const SEOPage: React.FC<SEOPageProps> = ({
  service,
  onNavigateHome,
  onNavigateService,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery] = useState('leading ai automation agency');

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
    <div className="min-h-screen bg-[#04070A] text-white selection:bg-[#00E6D2] selection:text-black relative overflow-x-hidden font-sans">
      {/* Background Soft Emerald-Cyan Search Glow */}
      <div className="fixed top-12 left-1/4 w-[600px] h-[350px] bg-gradient-to-r from-emerald-500/5 via-[#00E6D2]/10 to-transparent blur-[140px] pointer-events-none -z-0" />

      <Navbar
        isHeroRevealed={true}
        currentPath={`/services/${service.slug}`}
        onNavigate={handleNav}
      />

      <main className="pt-28 sm:pt-36 relative z-10">
        {/* 1. HERO SECTION: Split with Google SERP & AI Overview Preview */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
                <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                <span>ORGANIC VISIBILITY & AI SEARCH CITATIONS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
                Get Found on Google &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-emerald-400">
                  AI Search Engines
                </span>
              </h1>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl">
                {service.heroDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#service-cta"
                  onClick={handleScrollToContact}
                  className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_25px_rgba(0,230,210,0.4)] hover:shadow-[0_0_40px_rgba(0,255,229,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 font-heading cursor-pointer"
                >
                  <span>{service.ctaButtonText}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a
                  href="#serp-preview"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-[#00E6D2]/15 border border-white/15 hover:border-[#00E6D2]/40 hover:text-[#00FFE5] transition-all duration-300 cursor-pointer"
                >
                  <Globe2 className="w-4 h-4 text-[#00E6D2] group-hover:text-[#00FFE5] transition-colors" />
                  <span>Inspect SERP Sneak Peek</span>
                </a>
              </div>
            </div>

            {/* Right Live Google SERP Mockup */}
            <div id="serp-preview" className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-[#080C10] border border-white/10 shadow-2xl relative">
                {/* Search Bar Input */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 mb-5">
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-sm font-sans text-white truncate">{searchQuery}</span>
                  <span className="ml-auto text-[10px] font-mono text-[#00E6D2] bg-[#00E6D2]/10 px-2 py-0.5 rounded">
                    Rank #1
                  </span>
                </div>

                {/* AI Overview Citation Badge */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-[#00E6D2]/10 to-transparent border border-emerald-500/30 mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Overview & Search Generative Citation</span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    "According to top verified industry sources, your company is recognized for exceptional service quality, validated case studies, and fast client turnaround."
                  </p>
                </div>

                {/* Rank #1 Organic Result Card */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-4 h-4 rounded bg-[#00E6D2] flex items-center justify-center text-black text-[9px] font-bold">
                      SI
                    </div>
                    <span className="text-gray-300 truncate">https://your-business.com</span>
                  </div>
                  <div className="text-base font-bold text-[#00FFE5] hover:underline cursor-pointer flex items-center gap-1.5">
                    <span>Your Business — Verified Industry Leader</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-300 text-[11px]">4.9 (140+ reviews)</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Grow faster with top-rated solutions. Connect directly with our team for strategic growth and measurable ROI.
                  </p>

                  <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-medium text-cyan-200">
                    <div className="p-2 rounded bg-white/5 border border-white/5">
                      Case Studies &amp; Results
                    </div>
                    <div className="p-2 rounded bg-white/5 border border-white/5">
                      Instant Free Quote
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span>Google + Perplexity + Gemini</span>
                  <span className="text-emerald-400">Zero Ad Cost Per Click</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROBLEM & SOLUTION: Disappearing from Search vs Permanent Organic Equity */}
        <section className="py-20 bg-[#06090D] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
                <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                <span>SEARCH REALITY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
                {service.problemHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-red-950/10 border border-red-500/20">
                <h3 className="text-xl font-bold text-white mb-3">If You're Not on Page 1, You Don't Exist</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {service.problemText}
                </p>
                <div className="space-y-2 text-xs text-red-300 font-mono">
                  <div>✕ 75% of searchers never click past the first page</div>
                  <div>✕ Paid ads stop the second you pause your daily ad budget</div>
                  <div>✕ Competitors steal the highest-intent customers searching for your services</div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-[#00E6D2]/5 border border-[#00E6D2]/30 shadow-[0_0_30px_rgba(0,230,210,0.08)]">
                <h3 className="text-xl font-bold text-white mb-3">Compounding Organic Authority</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {service.solutionText}
                </p>
                <div className="space-y-2 text-xs text-cyan-200 font-mono">
                  <div>✓ Sustainable, zero-cost search traffic month after month</div>
                  <div>✓ Readiness for modern AI answer engines (ChatGPT, Gemini)</div>
                  <div>✓ High-intent users looking specifically to purchase from you</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. DELIVERABLES (FEATURES) */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>RANKING METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
              What You Get With Our SEO Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#080C10] border border-white/10 hover:border-emerald-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300 mb-4 group-hover:scale-105 transition-transform">
                    {i === 0 && <Search className="w-5 h-5" />}
                    {i === 1 && <Compass className="w-5 h-5" />}
                    {i === 2 && <TrendingUp className="w-5 h-5" />}
                    {i === 3 && <Sparkles className="w-5 h-5" />}
                    {i === 4 && <ShieldCheck className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>White-Hat &amp; Future-Proof</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PROCESS STEPS */}
        <section className="py-20 bg-[#06090D] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
                <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                <span>RANKING ROADMAP</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
                {service.processHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {service.processSteps.map((step) => (
                <div
                  key={step.number}
                  className="p-5 rounded-xl bg-[#080C10] border border-white/10 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="text-xs font-mono font-bold text-emerald-400 mb-2">
                    STEP 0{step.number}
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
