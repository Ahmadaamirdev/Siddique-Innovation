import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  TrendingUp,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  Clapperboard,
  Scissors,
  Image as ImageIcon,
  Radio,
} from 'lucide-react';
import type { ServiceItemData } from '../../data/servicesData';
import { serviceList } from '../../data/servicesData';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { WingLogo } from '../WingLogo';


interface YouTubeAutomationPageProps {
  service: ServiceItemData;
  onNavigateHome: () => void;
  onNavigateService: (slug: string) => void;
}

export const YouTubeAutomationPage: React.FC<YouTubeAutomationPageProps> = ({
  service,
  onNavigateHome,
  onNavigateService,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      {/* Background Cinematic Crimson-Cyan Glow */}
      <div className="fixed top-12 left-1/3 w-[600px] h-[350px] bg-gradient-to-r from-red-600/5 via-[#00E6D2]/10 to-transparent blur-[140px] pointer-events-none -z-0" />

      <Navbar
        isHeroRevealed={true}
        currentPath={`/services/${service.slug}`}
        onNavigate={handleNav}
      />

      <main className="pt-28 sm:pt-36 relative z-10">
        {/* 1. HERO SECTION: Cinematic Split Layout with Video Mockup & Retention Graph */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
                <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                <span>END-TO-END AUTONOMOUS STUDIO</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
                Grow a YouTube Channel Without{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-[#00E6D2] to-[#00FFE5]">
                  Managing It Yourself
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
                  href="#production-pipeline"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-[#00E6D2]/15 border border-white/15 hover:border-[#00E6D2]/40 hover:text-[#00FFE5] transition-all duration-300 cursor-pointer"
                >
                  <Clapperboard className="w-4 h-4 text-[#00E6D2] group-hover:text-[#00FFE5] transition-colors" />
                  <span>Inspect Studio Pipeline</span>
                </a>
              </div>
            </div>

            {/* Right Live 4K Video Player & Retention Widget */}
            <div className="lg:col-span-6">
              <div className="p-5 rounded-2xl bg-[#080B10] border border-white/10 shadow-2xl relative">
                {/* 4K Player Frame */}
                <div className="relative aspect-video rounded-xl bg-gradient-to-br from-neutral-900 to-black border border-white/10 overflow-hidden flex flex-col justify-between p-4 group">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px]">
                      4K UHD 60FPS
                    </span>
                    <span className="text-emerald-400">High-Retention Optimized</span>
                  </div>

                  {/* Centered Play Button */}
                  <div className="flex flex-col items-center justify-center my-auto">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-14 h-14 rounded-full bg-[#00E6D2] text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,230,210,0.5)] group-hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </button>
                    <span className="text-xs font-medium text-gray-300 mt-2 font-mono">
                      Automated Studio Cut
                    </span>
                  </div>

                  {/* Player Progress Scrubber */}
                  <div className="space-y-1">
                    <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                      <div className="w-2/3 h-full bg-[#00E6D2]" />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                      <span>06:42</span>
                      <span>10:15</span>
                    </div>
                  </div>
                </div>

                {/* Audience Retention Graph */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 mt-4 space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#00E6D2]" />
                      <span>Audience Retention Benchmark</span>
                    </span>
                    <span className="text-[#00E6D2] font-mono">68% Past Hook</span>
                  </div>

                  {/* Simulated Smooth Retention Curve */}
                  <svg className="w-full h-14" viewBox="0 0 300 50">
                    <path
                      d="M0,10 Q50,15 100,20 T200,28 T300,32"
                      fill="none"
                      stroke="#00E6D2"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M0,10 Q50,15 100,20 T200,28 T300,32 L300,50 L0,50 Z"
                      fill="url(#retentionGlow)"
                      opacity="0.15"
                    />
                    <defs>
                      <linearGradient id="retentionGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00E6D2" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center font-mono">
                  <div>
                    <div className="text-base font-bold text-white">8.9%</div>
                    <div className="text-[10px] text-gray-400">Click-Through Rate</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#00E6D2]">100%</div>
                    <div className="text-[10px] text-gray-400">Done-For-You</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">4K 60fps</div>
                    <div className="text-[10px] text-gray-400">Production Standard</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROBLEM & SOLUTION: Burning Out on YouTube vs Scaled System */}
        <section className="py-20 bg-[#06080C] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
                <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                <span>CHANNEL REALITY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
                {service.problemHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-red-950/10 border border-red-500/20">
                <h3 className="text-xl font-bold text-white mb-3">The Content Creation Trap</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {service.problemText}
                </p>
                <div className="space-y-2 text-xs text-red-300 font-mono">
                  <div>✕ Spending 20+ hours editing videos instead of running your company</div>
                  <div>✕ Inconsistent uploads causing algorithm penalty and flatlined views</div>
                  <div>✕ Amateur thumbnails and poor retention hooks that get skipped</div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-[#00E6D2]/5 border border-[#00E6D2]/30 shadow-[0_0_30px_rgba(0,230,210,0.08)]">
                <h3 className="text-xl font-bold text-white mb-3">Hands-Off YouTube Growth</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {service.solutionText}
                </p>
                <div className="space-y-2 text-xs text-cyan-200 font-mono">
                  <div>✓ Full studio pipeline: Scripting, Voiceover, 4K Editing, Packaging</div>
                  <div>✓ High-converting viral thumbnail designs tested for maximum CTR</div>
                  <div>✓ Consistent weekly uploads without you touching video editing software</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PRODUCTION PIPELINE (FEATURES) */}
        <section id="production-pipeline" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>STUDIO SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
              What You Get With YouTube Automation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#080B10] border border-white/10 hover:border-red-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4 group-hover:scale-105 transition-transform">
                    {i === 0 && <Clapperboard className="w-5 h-5" />}
                    {i === 1 && <Scissors className="w-5 h-5" />}
                    {i === 2 && <ImageIcon className="w-5 h-5" />}
                    {i === 3 && <Radio className="w-5 h-5" />}
                    {i === 4 && <TrendingUp className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Fully Automated</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PROCESS STEPS */}
        <section className="py-20 bg-[#06080C] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
                <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                <span>PRODUCTION CYCLE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
                {service.processHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {service.processSteps.map((step) => (
                <div
                  key={step.number}
                  className="p-5 rounded-xl bg-[#080B10] border border-white/10 hover:border-red-500/40 transition-colors"
                >
                  <div className="text-xs font-mono font-bold text-red-400 mb-2">
                    STAGE 0{step.number}
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
