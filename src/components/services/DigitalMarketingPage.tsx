import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Target,
  BarChart3,
  DollarSign,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  Users,
  Eye,
  Filter,
  PieChart,
} from 'lucide-react';
import type { ServiceItemData } from '../../data/servicesData';
import { serviceList } from '../../data/servicesData';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { WingLogo } from '../WingLogo';

interface DigitalMarketingPageProps {
  service: ServiceItemData;
  onNavigateHome: () => void;
  onNavigateService: (slug: string) => void;
}

export const DigitalMarketingPage: React.FC<DigitalMarketingPageProps> = ({
  service,
  onNavigateHome,
  onNavigateService,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<'meta' | 'google' | 'funnel'>('meta');
  const [activeFunnelStage, setActiveFunnelStage] = useState(0);

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
    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#00E6D2] selection:text-black relative overflow-x-hidden font-sans">
      {/* Background Amber-Cyan Glow Effect */}
      <div className="fixed top-10 left-1/3 w-[500px] h-[350px] bg-[#00E6D2]/10 blur-[140px] pointer-events-none -z-0" />
      <div className="fixed bottom-1/3 right-10 w-[400px] h-[300px] bg-amber-500/5 blur-[130px] pointer-events-none -z-0" />

      <Navbar
        isHeroRevealed={true}
        currentPath={`/services/${service.slug}`}
        onNavigate={handleNav}
      />

      <main className="pt-28 sm:pt-36 relative z-10">
        {/* 1. HERO SECTION: Split Growth Dashboard Layout */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
                <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                <span>ROI-FOCUSED PERFORMANCE MARKETING</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
                Marketing That Reaches the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-amber-400">
                  Right People
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
                  href="#funnel-architecture"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-[#00E6D2]/15 border border-white/15 hover:border-[#00E6D2]/40 hover:text-[#00FFE5] transition-all duration-300 cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4 text-[#00E6D2] group-hover:text-[#00FFE5] transition-colors" />
                  <span>Inspect Growth Funnel</span>
                </a>
              </div>
            </div>

            {/* Right Live ROAS & Metric Dashboard */}
            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-[#080B10] border border-white/10 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00E6D2] animate-pulse" />
                    <span>LIVE ATTRIBUTION ENGINE</span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-md border border-white/5">
                    <button
                      onClick={() => setSelectedCampaign('meta')}
                      className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                        selectedCampaign === 'meta'
                          ? 'bg-[#00E6D2]/20 text-[#00FFE5]'
                          : 'text-gray-400'
                      }`}
                    >
                      Social Ads
                    </button>
                    <button
                      onClick={() => setSelectedCampaign('google')}
                      className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                        selectedCampaign === 'google'
                          ? 'bg-[#00E6D2]/20 text-[#00FFE5]'
                          : 'text-gray-400'
                      }`}
                    >
                      Search Ads
                    </button>
                  </div>
                </div>

                {/* Live Key Metric Cards */}
                <div className="grid grid-cols-3 gap-3 py-6">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-[11px] text-gray-400 mb-1 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-[#00E6D2]" />
                      <span>Blended ROAS</span>
                    </div>
                    <div className="text-xl font-bold text-white font-mono">4.4x</div>
                    <div className="text-[10px] text-emerald-400 mt-1 font-mono">+38% YoY</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-[11px] text-gray-400 mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#00E6D2]" />
                      <span>Qualified Leads</span>
                    </div>
                    <div className="text-xl font-bold text-[#00E6D2] font-mono">+280%</div>
                    <div className="text-[10px] text-emerald-400 mt-1 font-mono">High-Intent</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-[11px] text-gray-400 mb-1 flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#00E6D2]" />
                      <span>Cost per Lead</span>
                    </div>
                    <div className="text-xl font-bold text-white font-mono">-42%</div>
                    <div className="text-[10px] text-emerald-400 mt-1 font-mono">Cost Reduced</div>
                  </div>
                </div>

                {/* Simulated Campaign Trajectory Bar Graph */}
                <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Campaign Scale (Simulated Weekly Lift)</span>
                    <span className="text-[#00E6D2] font-mono">Optimal CVR</span>
                  </div>
                  <div className="flex items-end gap-2 h-20 pt-2">
                    {[35, 45, 60, 52, 75, 88, 98].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          style={{ height: `${h}%` }}
                          className={`w-full rounded-t transition-all duration-500 ${
                            i === 6
                              ? 'bg-gradient-to-t from-[#00E6D2] to-[#00FFE5]'
                              : 'bg-white/10'
                          }`}
                        />
                        <span className="text-[9px] font-mono text-gray-500">W{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>Targeting: Exact Purchase Intent</span>
                  <span className="text-[#00E6D2] font-mono">Zero Budget Wastage</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROBLEM & SOLUTION: Ad Spend Wastage vs Targeted Growth */}
        <section className="py-20 bg-[#070A0F] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
                <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                <span>CAMPAIGN EFFICIENCY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
                {service.problemHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-red-950/10 border border-red-500/20">
                <h3 className="text-xl font-bold text-white mb-3">Why Most Ads Waste Money</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {service.problemText}
                </p>
                <div className="space-y-2 text-xs text-red-300 font-mono">
                  <div>✕ Generic broad targeting that clicks but never buys</div>
                  <div>✕ Disconnected ad messaging that fails on the landing page</div>
                  <div>✕ Zero retargeting for the 97% of visitors who leave</div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-[#00E6D2]/5 border border-[#00E6D2]/30 shadow-[0_0_30px_rgba(0,230,210,0.08)]">
                <h3 className="text-xl font-bold text-white mb-3">Precision Target & Convert</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {service.solutionText}
                </p>
                <div className="space-y-2 text-xs text-cyan-200 font-mono">
                  <div>✓ Laser-targeted ads matching exact customer intent</div>
                  <div>✓ High-converting landing pages built to close deals</div>
                  <div>✓ Automated retargeting sequences recovering lost traffic</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MULTI-STAGE FUNNEL ARCHITECTURE */}
        <section id="funnel-architecture" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>FULL-FUNNEL BLUEPRINT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
              Our 3-Stage Conversion Funnel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stage: '01',
                title: 'Top of Funnel: Awareness',
                desc: 'Targeted Google Search intent and Meta video hooks that reach people actively looking for what you sell.',
                stat: 'High-Intent Audiences',
              },
              {
                stage: '02',
                title: 'Middle of Funnel: Conversion',
                desc: 'Dedicated high-converting landing pages tailored to each campaign with clear proof, zero distractions, and clear CTAs.',
                stat: '3x - 5x Conversion Lift',
              },
              {
                stage: '03',
                title: 'Bottom of Funnel: Retention',
                desc: 'Smart retargeting and automated email/SMS sequences that bring back warm leads and turn them into closed sales.',
                stat: 'Maximizes Customer LTV',
              },
            ].map((f, idx) => (
              <div
                key={idx}
                onClick={() => setActiveFunnelStage(idx)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  activeFunnelStage === idx
                    ? 'bg-[#00E6D2]/10 border-[#00E6D2]'
                    : 'bg-[#080D12] border-white/10 hover:border-white/25'
                }`}
              >
                <div className="text-xs font-mono font-bold text-[#00E6D2] mb-3">
                  FUNNEL STAGE {f.stage}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{f.desc}</p>
                <div className="pt-3 border-t border-white/5 text-xs font-mono text-[#00FFE5]">
                  {f.stat}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. DELIVERABLES (FEATURES) */}
        <section className="py-20 bg-[#070A0F] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
                <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                <span>CORE DELIVERABLES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
                What You Get With Our Digital Marketing
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#090D13] border border-white/10 hover:border-[#00E6D2]/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/20 flex items-center justify-center text-[#00E6D2] mb-4 group-hover:scale-105 transition-transform">
                      {i === 0 && <Target className="w-5 h-5" />}
                      {i === 1 && <Filter className="w-5 h-5" />}
                      {i === 2 && <TrendingUp className="w-5 h-5" />}
                      {i === 3 && <PieChart className="w-5 h-5" />}
                      {i === 4 && <BarChart3 className="w-5 h-5" />}
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
                    <span>ROI Driven</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PROCESS STEPS */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>ROADMAP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
              {service.processHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {service.processSteps.map((step) => (
              <div
                key={step.number}
                className="p-5 rounded-xl bg-[#090D13] border border-white/10 hover:border-[#00E6D2]/40 transition-colors"
              >
                <div className="text-xs font-mono font-bold text-[#00E6D2] mb-2">
                  PHASE 0{step.number}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FAQS */}
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

        {/* 7. EXPLORE OTHER SERVICES */}
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

        {/* 8. CTA SECTION */}
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
