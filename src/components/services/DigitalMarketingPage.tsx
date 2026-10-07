import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Target,
  BarChart3,
  DollarSign,
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Users,
  Eye,
  Filter,
  PieChart,
  Zap,
  Check,
  X,
  AlertTriangle,
  Clock,
  CircleX,
  Hourglass,
  RefreshCw,
  CheckCircle2,
  Mail,
} from 'lucide-react';
import type { ServiceItemData } from '../../data/servicesData';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { WingLogo } from '../WingLogo';
import { CTA } from '../CTA';
import { ServiceProjectsSection } from './ServiceProjectsSection';
import { ServiceTestimonialsSection } from './ServiceTestimonialsSection';
import { TargetingFunnelStage } from './TargetingFunnelStage';
import {
  digitalMarketingProjects,
  digitalMarketingTestimonials,
} from '../../data/serviceProjectsAndTestimonials';

interface DigitalMarketingPageProps {
  service: ServiceItemData;
  onNavigateHome: () => void;
  onNavigateService: (slug: string) => void;
  onNavigate?: (path: string) => void;
}

export const DigitalMarketingPage: React.FC<DigitalMarketingPageProps> = ({
  service,
  onNavigateHome,
  onNavigateService,
  onNavigate,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleNav = (path: string) => {
    if (path === '/') {
      onNavigateHome();
    } else if (path.startsWith('/services/') || path.startsWith('/service/')) {
      const slug = path.replace(/^\/services?\//, '').replace(/\/$/, '');
      onNavigateService(slug);
    } else if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
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
        {/* 1. HERO SECTION: Targeting Funnel Centered Layout */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 sm:pb-20 text-center overflow-hidden">
          {/* Subtle Background Radial Teal Glow behind Funnel */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-[#00E6D2]/10 via-[#00E6D2]/2 to-transparent blur-[140px] pointer-events-none -z-0" />

          {/* Faint Dot Grid that fades toward edges */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25 -z-0"
            style={{
              backgroundImage: `radial-gradient(rgba(0, 230, 210, 0.3) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
              maskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 20%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, black 20%, transparent 80%)',
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto space-y-4 pt-2">
            {/* H1: Size matched to homepage hero H1 */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading py-1 drop-shadow-md max-w-2xl mx-auto">
              <span>Marketing That Reaches the </span>
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_25px_rgba(0,255,229,0.35)] inline-block"
                style={{ WebkitTextFillColor: 'transparent' }}
              >
                Right People
              </span>
            </h1>

            {/* Description: max-width about 680px, muted light-gray, comfortable line-height */}
            <p className="text-gray-300 text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed font-sans max-w-[680px] mx-auto">
              {service.heroDescription}
            </p>

            {/* 4. CTA Row: primary "Get a Free Quote" + secondary ghost button "See Our Work" */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#service-cta"
                onClick={handleScrollToContact}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_25px_rgba(0,230,210,0.35)] hover:shadow-[0_0_35px_rgba(0,255,229,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 font-heading cursor-pointer"
              >
                <span>{service.ctaButtonText || 'Get a Free Quote'}</span>
                <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#service-projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('service-projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00E6D2]/40 transition-all duration-300 font-heading cursor-pointer"
              >
                <span>See Our Work</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* 5. The Funnel Stage */}
          <div className="mt-8 sm:mt-12 w-full">
            <TargetingFunnelStage />
          </div>

          {/* 6. Under the stage: Slim row of 3 glass stat tiles */}
          <div className="mt-8 sm:mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {/* Stat 1: Blended ROAS */}
            <div className="group p-4 sm:p-5 rounded-2xl bg-[#080B10]/90 hover:bg-[#0A1218]/95 backdrop-blur-md border border-white/10 hover:border-[#00E6D2]/60 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_20px_rgba(0,230,210,0.15)] hover:-translate-y-1 cursor-pointer flex items-center justify-between sm:flex-col sm:items-start sm:justify-center">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/20 group-hover:bg-[#00E6D2]/20 group-hover:border-[#00E6D2]/60 flex items-center justify-center text-[#00E6D2] group-hover:text-[#00FFE5] transition-colors duration-300">
                  <DollarSign className="w-4 h-4" />
                </div>
                <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-300 font-medium font-sans">Blended ROAS</span>
              </div>
              <div className="text-right sm:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#00FFE5] transition-colors duration-300 font-mono tracking-tight">4.4x</div>
                <div className="text-[11px] text-emerald-400 group-hover:text-[#00FFE5] transition-colors duration-300 font-mono mt-0.5">+38% YoY</div>
              </div>
            </div>

            {/* Stat 2: Qualified Leads */}
            <div className="group p-4 sm:p-5 rounded-2xl bg-[#080B10]/90 hover:bg-[#0A1218]/95 backdrop-blur-md border border-white/10 hover:border-[#00E6D2]/60 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_20px_rgba(0,230,210,0.15)] hover:-translate-y-1 cursor-pointer flex items-center justify-between sm:flex-col sm:items-start sm:justify-center">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/20 group-hover:bg-[#00E6D2]/20 group-hover:border-[#00E6D2]/60 flex items-center justify-center text-[#00E6D2] group-hover:text-[#00FFE5] transition-colors duration-300">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-300 font-medium font-sans">Qualified Leads</span>
              </div>
              <div className="text-right sm:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#00FFE5] transition-colors duration-300 font-mono tracking-tight">+280%</div>
                <div className="text-[11px] text-emerald-400 group-hover:text-[#00FFE5] transition-colors duration-300 font-mono mt-0.5">High-Intent</div>
              </div>
            </div>

            {/* Stat 3: Cost per Lead */}
            <div className="group p-4 sm:p-5 rounded-2xl bg-[#080B10]/90 hover:bg-[#0A1218]/95 backdrop-blur-md border border-white/10 hover:border-[#00E6D2]/60 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_20px_rgba(0,230,210,0.15)] hover:-translate-y-1 cursor-pointer flex items-center justify-between sm:flex-col sm:items-start sm:justify-center">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/20 group-hover:bg-[#00E6D2]/20 group-hover:border-[#00E6D2]/60 flex items-center justify-center text-[#00E6D2] group-hover:text-[#00FFE5] transition-colors duration-300">
                  <Eye className="w-4 h-4" />
                </div>
                <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-300 font-medium font-sans">Cost per Lead</span>
              </div>
              <div className="text-right sm:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#00FFE5] transition-colors duration-300 font-mono tracking-tight">-42%</div>
                <div className="text-[11px] text-emerald-400 group-hover:text-[#00FFE5] transition-colors duration-300 font-mono mt-0.5">Cost Reduced</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROBLEM VS. SOLUTION (Ad Spend Wastage vs Data-Driven ROI) */}
        <section className="mt-12 sm:mt-16 lg:mt-20 pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-16 lg:pb-20 bg-[#040608] border-y border-white/10 relative overflow-hidden select-none">
          {/* Faint contour waves on right side */}
          <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-20 text-[#00E6D2]" viewBox="0 0 700 500" fill="none">
            <path d="M100 500C300 420 500 250 700 80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M250 500C420 400 580 200 700 0" stroke="currentColor" strokeWidth="1" />
          </svg>

          <div className="max-w-[1140px] xl:max-w-[1220px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 relative items-stretch">
              {/* Central Vertical Divider */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/10 pointer-events-none">
                <div className="absolute left-1/2 top-[154px] -translate-x-1/2 -translate-y-1/2 z-20 px-3 py-0.5 bg-[#080D12] text-[10px] font-mono tracking-wider text-gray-400 uppercase whitespace-nowrap">
                  FROM WASTED SPEND &rarr; HIGH ROI
                </div>
              </div>

              {/* Mobile Divider */}
              <div className="lg:hidden flex justify-center -my-4">
                <div className="px-3 py-0.5 bg-[#080D12] text-[10px] font-mono tracking-wider text-gray-400 uppercase whitespace-nowrap">
                  FROM WASTED SPEND &rarr; HIGH ROI
                </div>
              </div>

              {/* LEFT COLUMN: Problem (Ad Spend Wastage) */}
              <div className="w-full max-w-[460px] mx-auto lg:mr-12 xl:mr-14 lg:ml-auto flex flex-col justify-between h-full">
                <div>
                  <div className="w-full mb-6 lg:h-[130px] flex flex-col justify-start">
                    <div className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs tracking-wider uppercase font-mono">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      <span>AD SPEND WASTAGE</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[30px] font-extrabold text-white tracking-tight leading-[1.15] font-heading mt-3">
                      Why Most Ads Waste Money
                    </h2>
                  </div>

                  {/* 3 Metric Rows */}
                  <div className="divide-y divide-white/10 border-y border-white/10">
                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading leading-tight">
                          60–70% <span className="text-red-500">burn</span>
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          UNQUALIFIED CLICKS &amp; BOT TRAFFIC
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <CircleX className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-red-500 tracking-tight font-heading leading-tight">
                          &lt;1.5%
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          INDUSTRY AVERAGE CVR LAG
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <Hourglass className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-red-500 tracking-tight font-heading leading-tight">
                          97%
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          ABANDONMENT WITHOUT RETARGETING
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        Generic broad targeting that clicks but never buys
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        Disconnected ad messaging that fails on the landing page
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        Zero retargeting for the 97% of visitors who leave
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Solution (Data-Driven ROI) */}
              <div className="w-full max-w-[460px] mx-auto lg:ml-12 xl:ml-14 lg:mr-auto flex flex-col justify-between h-full">
                <div>
                  <div className="w-full mb-6 lg:h-[130px] flex flex-col justify-start">
                    <div className="inline-flex items-center gap-2 text-[#00E6D2] font-semibold text-xs tracking-wider uppercase font-mono">
                      <WingLogo className="w-4 h-4 shrink-0" />
                      <span>DATA-DRIVEN ROI</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[30px] font-extrabold text-white tracking-tight leading-[1.15] font-heading mt-3">
                      Precision Target <span className="text-[#00FFE5]">&amp; Convert</span>
                    </h2>
                  </div>

                  {/* 3 Metric Rows */}
                  <div className="divide-y divide-white/10 border-y border-white/10">
                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 text-[#00FFE5]" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading leading-tight">
                          +280%
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          HIGH-INTENT QUALIFIED LEADS
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <RefreshCw className="w-4 h-4 text-[#00FFE5]" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-[#00FFE5] tracking-tight font-heading leading-tight">
                          -42%
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          COST PER ACQUISITION REDUCED
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-[#00FFE5]" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-[#00FFE5] tracking-tight font-heading leading-tight">
                          3.8x+
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          AVERAGE CAMPAIGN ROAS
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        <strong className="text-white font-semibold">Laser-targeted ads</strong> matching exact customer intent
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        <strong className="text-white font-semibold">High-converting landing pages</strong> built to close deals
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        <strong className="text-white font-semibold">Automated retargeting sequences</strong> recovering lost traffic
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CAPABILITIES / FEATURES (Service Cards Grid) */}
        <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00E6D2]/[0.04] blur-[160px] pointer-events-none -z-0" />

          <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0" />
              <span>SERVICES</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading mt-1">
              What You Get With Our Digital Marketing
            </h2>
          </div>

          {/* 6 Service Cards Grid (3 in first row, 3 in second row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {service.features.map((feature, index) => {
              const icons = [Target, Filter, TrendingUp, PieChart, BarChart3, Mail];
              const IconComp = icons[index % icons.length];

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
                  className="group relative flex flex-col justify-between bg-[#0B0E13]/90 backdrop-blur-xl border border-white/10 hover:border-[#00E6D2]/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(0,230,210,0.15)] transform-gpu will-change-transform"
                >
                  <div className="flex flex-col flex-1">
                    {/* Header: Icon Box and Title inline */}
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center text-[#00E6D2] group-hover:scale-105 group-hover:bg-[#00E6D2]/20 transition-all duration-300">
                        <IconComp className="w-5 h-5 text-[#00E6D2]" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00E6D2] transition-colors leading-snug font-heading">
                        {feature.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans mb-4">
                      {feature.description}
                    </p>

                    {/* Bullet Checklist Points */}
                    {feature.points && feature.points.length > 0 && (
                      <ul className="space-y-2 mt-auto pt-2">
                        {feature.points.map((point) => (
                          <li key={point} className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-300 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00E6D2] shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 4. EXECUTION ROADMAP: Moving Cards Track in Continuous Motion */}
        <section className="py-24 bg-[#070A0E] border-y border-white/10 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#00E6D2]/[0.03] blur-[150px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 text-center">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0" />
              <span>EXECUTION PIPELINE</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] mt-1 font-heading">
              {service.processHeading}
            </h2>
          </div>

          {/* Continuous Moving Cards Carousel Track */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-4">
            <div className="animate-marquee-infinite gap-6 pl-6">
              {[...service.processSteps, ...service.processSteps].map((step, idx) => (
                <div
                  key={`${step.number}-${idx}`}
                  className="w-[280px] sm:w-[320px] shrink-0 p-6 rounded-2xl bg-[#090D12] border border-white/10 hover:border-[#00FFE5]/50 hover:bg-[#00FFE5]/[0.04] transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.5)] select-none"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold tracking-wider text-[#00E6D2] group-hover:text-[#00FFE5] transition-colors">
                        STAGE 0{step.number}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#00FFE5] group-hover:translate-x-1 transition-all" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 font-heading group-hover:text-[#00FFE5] transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-[#00E6D2]/80">
                    <span>STAGE 0{step.number} // ACTIVE</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <ServiceProjectsSection
          serviceName="Digital Marketing"
          projects={digitalMarketingProjects}
          subheading="High-performing ad campaigns, conversion funnels, and retention engines delivering measurable ROAS."
          onNavigateToProjects={() => onNavigate?.('/projects')}
        />

        {/* Testimonials Section */}
        <ServiceTestimonialsSection
          serviceName="Digital Marketing"
          testimonials={digitalMarketingTestimonials}
          subheading="Real feedback from brands scaling their revenue and paid customer acquisition."
        />

        {/* 6. FAQS */}
        <section className="py-14 md:py-20 relative z-10 overflow-hidden border-b border-white/10">
          {/* Soft Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-radial from-[#00E6D2]/5 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading">
                  <WingLogo className="w-5 h-5 shrink-0" />
                  <span>FAQS</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading">
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
                    viewport={{ once: false, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.06,
                      ease: [0.22, 0.61, 0.36, 1] as const,
                    }}
                    className={`rounded-2xl transition-all duration-300 border overflow-hidden ${isOpen
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
                          className={`text-base sm:text-[17px] font-medium tracking-tight transition-colors font-heading ${isOpen
                              ? 'text-white'
                              : 'text-gray-200 group-hover:text-white'
                            }`}
                        >
                          {faq.question}
                        </span>
                      </div>

                      {/* Clean Dropdown Arrow Button */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${isOpen
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

        {/* 6. CTA SECTION */}
        <CTA
          id="service-cta"
          initialService={service.title}
          heading={service.ctaHeading}
          subheading={service.ctaSubheading}
        />
      </main>

      <Footer onNavigate={handleNav} />
    </div>
  );
};
