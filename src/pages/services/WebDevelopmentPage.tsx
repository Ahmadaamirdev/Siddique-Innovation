import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Zap,
  Sparkles,
  ShieldCheck,
  Clock,
  CircleX,
  Hourglass,
  AlertTriangle,
  RefreshCw,
  Check,
  X,
  Layers,
  ShoppingBag,
  CheckCircle2,
  Smartphone,
} from 'lucide-react';
import type { ServiceItemData } from '@/data/servicesData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WingLogo } from '@/components/ui/WingLogo';
import { CTA } from '@/components/sections/CTA';
import serviceHeroBg from '@/assets/service_hero_bg.webp';
import { ServiceProjectsSection } from '@/components/services/ServiceProjectsSection';
import { ServiceTestimonialsSection } from '@/components/services/ServiceTestimonialsSection';
import { WebBuildingAnimation } from '@/components/services/WebBuildingAnimation';
import {
  webDevelopmentProjects,
  webDevelopmentTestimonials,
} from '@/data/serviceProjectsAndTestimonials';
import { useIsMobile } from '@/hooks/useIsMobile';

interface WebDevelopmentPageProps {
  service: ServiceItemData;
  onNavigateHome: () => void;
  onNavigateService: (slug: string) => void;
  onNavigate?: (path: string) => void;
}

export const WebDevelopmentPage: React.FC<WebDevelopmentPageProps> = ({
  service,
  onNavigateHome,
  onNavigateService,
  onNavigate,
}) => {
  const isMobile = useIsMobile();
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

  return (
    <div className="min-h-screen bg-[#05070A] text-white selection:bg-[#00E6D2] selection:text-black relative font-sans">
      {/* Background Soft Engineering Grid */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-0" />
      <div className="fixed top-20 right-1/4 w-[600px] h-[350px] bg-gradient-to-br from-[#00E6D2]/10 via-[#3B82F6]/5 to-transparent blur-[140px] pointer-events-none -z-0" />

      <Navbar
        isHeroRevealed={true}
        currentPath={`/services/${service.slug}`}
        onNavigate={handleNav}
      />

      <main className="pt-24 sm:pt-28 relative z-10">
        {/* 1. HERO SECTION: Modern Studio Layout with Live Construction Viewport */}
        <section className="relative w-full overflow-hidden px-3 sm:px-6 lg:px-8 pb-1 sm:pb-2 pt-0 text-center" style={{ background: '#040608' }}>
          {/* Background image container with top/bottom vignettes */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <img
              src={serviceHeroBg}
              alt="Service hero background"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none',
                filter: 'brightness(0.65) contrast(1.1)',
              }}
            />
            {/* Top vignette */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '120px',
                background: 'linear-gradient(to bottom, #040608 0%, rgba(4,6,8,0.7) 60%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
            {/* Bottom vignette */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '240px',
                background: 'linear-gradient(to top, #040608 0%, rgba(4,6,8,0.85) 60%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
            {/* Ambient overlay */}
            <div className="absolute inset-0 bg-[#040608]/45 pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
            {/* Responsive H1 Headline */}
            <h1 className="text-[26px] sm:text-xl md:text-2xl lg:text-[30px] xl:text-[35px] font-extrabold text-white tracking-[-0.02em] leading-[1.2] font-heading max-w-full mx-auto py-1 sm:py-0.5 drop-shadow-md whitespace-normal sm:whitespace-nowrap text-center px-3 sm:px-2">
              <span>Websites That Turn </span>
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]"
                style={{ WebkitTextFillColor: 'transparent' }}
              >
                Visitors Into Customers
              </span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-[13px] md:text-sm max-w-2xl mx-auto font-normal leading-relaxed font-sans mt-2.5 sm:mt-0.5 mb-3.5 sm:mb-1 px-3 sm:px-0">
              {service.heroDescription}
            </p>

            {/* Miniature Workers Building Website Animation */}
            <WebBuildingAnimation />
          </div>
        </section>

        {/* 2. PROBLEM VS. SOLUTION (Sluggish Outdated Site vs High-Performance Web) */}
        <section className="mt-8 sm:mt-16 lg:mt-20 pt-10 sm:pt-20 lg:pt-24 pb-10 sm:pb-16 lg:pb-20 bg-[#040608] border-y border-white/10 relative overflow-hidden select-none">
          {/* Faint contour waves on right side */}
          <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-20 text-[#00E6D2]" viewBox="0 0 700 500" fill="none">
            <path d="M100 500C300 420 500 250 700 80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M250 500C420 400 580 200 700 0" stroke="currentColor" strokeWidth="1" />
          </svg>

          <div className="max-w-[1140px] xl:max-w-[1220px] mx-auto px-3 sm:px-8 lg:px-10 relative z-10">
            <div className="grid grid-cols-2 gap-3 sm:gap-12 lg:gap-0 relative items-stretch">
              {/* Central Vertical Divider */}
              <div className="block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/10 pointer-events-none">
                <div className="absolute left-1/2 top-[85px] sm:top-[154px] -translate-x-1/2 -translate-y-1/2 z-20 px-1.5 sm:px-3 py-0.5 bg-[#080D12] border border-white/10 sm:border-0 rounded-full sm:rounded-none text-[7px] sm:text-[10px] font-mono tracking-wider text-gray-400 uppercase whitespace-nowrap max-w-[45vw] overflow-hidden text-ellipsis">
                  FROM SLUGGISH &rarr; ULTRA-FAST
                </div>
              </div>

              {/* LEFT COLUMN: Problem (Sluggish Outdated Site) */}
              <div className="w-full max-w-none lg:max-w-[460px] mx-auto pr-1 sm:pr-0 lg:mr-12 xl:mr-14 lg:ml-auto flex flex-col justify-between h-full">
                <div>
                  <div className="w-full mb-3 sm:mb-6 min-h-[65px] sm:min-h-0 lg:h-[130px] flex flex-col justify-start">
                    <div className="inline-flex items-center gap-1 sm:gap-2 text-red-400 font-semibold text-[8px] sm:text-xs tracking-wider uppercase font-mono">
                      <AlertTriangle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-red-400" />
                      <span>OUTDATED SITES</span>
                    </div>
                    <h2 className="text-[11px] sm:text-2xl lg:text-[28px] xl:text-[30px] font-extrabold text-white tracking-tight leading-[1.2] sm:leading-[1.15] font-heading mt-1 sm:mt-3">
                      The Cost of a Sluggish Website
                    </h2>
                  </div>

                  {/* 3 Metric Rows */}
                  <div className="divide-y divide-white/10 border-y border-white/10">
                    <div className="flex items-center gap-2 sm:gap-4 py-2 sm:py-3.5 min-h-[50px] sm:min-h-[72px]">
                      <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-2xl font-bold text-white tracking-tight font-heading leading-tight">
                          +53% <span className="text-red-500">drop</span>
                        </div>
                        <div className="text-[7px] sm:text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5 leading-tight">
                          BOUNCE RATE AFTER 3S
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 py-2 sm:py-3.5 min-h-[50px] sm:min-h-[72px]">
                      <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <CircleX className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-2xl font-bold text-red-500 tracking-tight font-heading leading-tight">
                          40%+
                        </div>
                        <div className="text-[7px] sm:text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5 leading-tight">
                          VISUAL TRUST DROP
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 py-2 sm:py-3.5 min-h-[50px] sm:min-h-[72px]">
                      <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <Hourglass className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-2xl font-bold text-red-500 tracking-tight font-heading leading-tight">
                          LOST
                        </div>
                        <div className="text-[7px] sm:text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5 leading-tight">
                          NON-RESPONSIVE VIEWPORTS
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="mt-3 sm:mt-5 space-y-1.5 sm:space-y-2.5">
                    <div className="flex items-start gap-1.5 sm:gap-2.5 min-h-0 sm:min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-[9.5px] sm:text-[13px] text-gray-300 font-sans leading-tight sm:leading-snug">
                        Sluggish loading speeds turning visitors away
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5 sm:gap-2.5 min-h-0 sm:min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-[9.5px] sm:text-[13px] text-gray-300 font-sans leading-tight sm:leading-snug">
                        Broken mobile layouts and non-responsive components
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5 sm:gap-2.5 min-h-0 sm:min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-[9.5px] sm:text-[13px] text-gray-300 font-sans leading-tight sm:leading-snug">
                        Outdated aesthetics reducing customer credibility
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Solution (High-Performance Web) */}
              <div className="w-full max-w-none lg:max-w-[460px] mx-auto pl-1 sm:pl-0 lg:ml-12 xl:ml-14 lg:mr-auto flex flex-col justify-between h-full">
                <div>
                  <div className="w-full mb-3 sm:mb-6 min-h-[65px] sm:min-h-0 lg:h-[130px] flex flex-col justify-start">
                    <div className="inline-flex items-center gap-1 sm:gap-2 text-[#00E6D2] font-semibold text-[8px] sm:text-xs tracking-wider uppercase font-mono">
                      <WingLogo className="w-2.5 h-2.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>HIGH-PERFORMANCE</span>
                    </div>
                    <h2 className="text-[11px] sm:text-2xl lg:text-[28px] xl:text-[30px] font-extrabold text-white tracking-tight leading-[1.2] sm:leading-[1.15] font-heading mt-1 sm:mt-3">
                      Engineered for <span className="text-[#00FFE5]">Speed &amp; Trust</span>
                    </h2>
                  </div>

                  {/* 3 Metric Rows */}
                  <div className="divide-y divide-white/10 border-y border-white/10">
                    <div className="flex items-center gap-2 sm:gap-4 py-2 sm:py-3.5 min-h-[50px] sm:min-h-[72px]">
                      <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FFE5]" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-2xl font-bold text-white tracking-tight font-heading leading-tight">
                          &lt;0.8s
                        </div>
                        <div className="text-[7px] sm:text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5 leading-tight">
                          SUB-SECOND LCP SPEED
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 py-2 sm:py-3.5 min-h-[50px] sm:min-h-[72px]">
                      <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FFE5]" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-2xl font-bold text-[#00FFE5] tracking-tight font-heading leading-tight">
                          100%
                        </div>
                        <div className="text-[7px] sm:text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5 leading-tight">
                          RESPONSIVE VIEWPORTS
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 py-2 sm:py-3.5 min-h-[50px] sm:min-h-[72px]">
                      <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FFE5]" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-2xl font-bold text-[#00FFE5] tracking-tight font-heading leading-tight">
                          99+
                        </div>
                        <div className="text-[7px] sm:text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5 leading-tight">
                          LIGHTHOUSE STANDARDS
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="mt-3 sm:mt-5 space-y-1.5 sm:space-y-2.5">
                    <div className="flex items-start gap-1.5 sm:gap-2.5 min-h-0 sm:min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-[9.5px] sm:text-[13px] text-gray-300 font-sans leading-tight sm:leading-snug">
                        <strong className="text-white font-semibold">Lightning-fast stack</strong> (Vite + React + Tailwind)
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5 sm:gap-2.5 min-h-0 sm:min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-[9.5px] sm:text-[13px] text-gray-300 font-sans leading-tight sm:leading-snug">
                        <strong className="text-white font-semibold">Adaptive responsive design</strong> for high conversions
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5 sm:gap-2.5 min-h-0 sm:min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-[9.5px] sm:text-[13px] text-gray-300 font-sans leading-tight sm:leading-snug">
                        <strong className="text-white font-semibold">Clean modern visuals</strong> elevating customer trust
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
              What You Get With Our Web Development
            </h2>
          </div>

          {/* 6 Service Cards Grid (Matching Home Page & AI Automation) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {service.features.map((feature, index) => {
              const icons = [Sparkles, Smartphone, ShoppingBag, Layers, Zap, ShieldCheck];
              const IconComp = icons[index % icons.length];

              return (
                <motion.div
                  key={feature.title}
                  initial={isMobile ? false : { opacity: 0, y: 30 }}
                  whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                  viewport={isMobile ? undefined : { once: false, margin: '-40px' }}
                  transition={isMobile ? { duration: 0 } : { duration: 0.6, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
                  className="service-card lg:col-span-2 group relative flex flex-col justify-between bg-[#0B0E13]/90 backdrop-blur-xl border border-white/10 hover:border-[#00E6D2]/50 rounded-2xl p-5 sm:p-6 md:transition-all md:duration-300 md:hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(0,230,210,0.15)] transform-gpu will-change-transform"
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
            <div className="animate-marquee-infinite gap-3 sm:gap-6 pl-3 sm:pl-6">
              {[...service.processSteps, ...service.processSteps].map((step, idx) => (
                <div
                  key={`${step.number}-${idx}`}
                  className="w-[205px] sm:w-[320px] shrink-0 p-3.5 sm:p-6 rounded-2xl bg-[#090D12] border border-white/10 hover:border-[#00FFE5]/50 hover:bg-[#00FFE5]/[0.04] transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.5)] select-none"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                      <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[#00E6D2] group-hover:text-[#00FFE5] transition-colors">
                        STAGE 0{step.number}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 group-hover:text-[#00FFE5] group-hover:translate-x-1 transition-all" />
                    </div>
                    <h4 className="text-sm sm:text-lg font-bold text-white mb-1.5 sm:mb-2 font-heading group-hover:text-[#00FFE5] transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <ServiceProjectsSection
          serviceName="Web Development"
          projects={webDevelopmentProjects}
          subheading="A curated selection of our high-converting web solutions and digital enterprise platforms."
          onNavigateToProjects={() => onNavigate?.('/projects')}
        />

        {/* Testimonials Section */}
        <ServiceTestimonialsSection
          serviceName="Web Development"
          testimonials={webDevelopmentTestimonials}
          subheading="Real results and verified feedback from our web development clients and enterprise partners."
        />

        {/* 5. FAQS */}
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
