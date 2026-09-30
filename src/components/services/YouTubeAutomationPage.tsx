import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  TrendingUp,
  ArrowUpRight,
  ChevronDown,
  Clapperboard,
  Scissors,
  Film,
  Eye,
  Calendar,
  AlertTriangle,
  Clock,
  CircleX,
  Hourglass,
  Zap,
  RefreshCw,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';
import type { ServiceItemData } from '../../data/servicesData';
import { serviceList } from '../../data/servicesData';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { WingLogo } from '../WingLogo';
import { CTA } from '../CTA';
import serviceHeroBg from '../../assets/service_hero_bg.png';


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
        <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 pb-20 pt-4 sm:pt-6" style={{ background: '#040608' }}>
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

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Content */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-mono drop-shadow-[0_0_8px_#00E6D2] mb-2">
                  <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                  <span>END-TO-END AUTONOMOUS STUDIO</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-extrabold text-white tracking-[-0.03em] leading-[1.12] font-heading py-1">
                  <span className="block">Grow a YouTube Channel Without</span>
                  <span
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]"
                    style={{ WebkitTextFillColor: 'transparent' }}
                  >
                    Managing It Yourself
                  </span>
                </h1>

                <p className="text-gray-300 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed font-sans max-w-xl">
                  {service.heroDescription}
                </p>

              <div className="pt-2">
                <a
                  href="#service-cta"
                  onClick={handleScrollToContact}
                  className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_25px_rgba(0,230,210,0.35)] hover:shadow-[0_0_35px_rgba(0,255,229,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 font-heading cursor-pointer"
                >
                  <span>{service.ctaButtonText}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
        </div>
      </section>

        {/* 2. PROBLEM & SOLUTION: Burning Out on YouTube vs Scaled System */}
        <section className="py-20 md:py-28 relative overflow-hidden bg-[#050608] border-y border-white/10">
          {/* Subtle Background Radial / Waves */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#00E6D2]/[0.03] blur-[170px] pointer-events-none" />

          {/* Clean Decorative Top Gradient Divider */}
          <svg
            className="w-full h-8 absolute top-0 left-0 right-0 pointer-events-none opacity-20"
            viewBox="0 0 1440 32"
            fill="none"
          >
            <path
              d="M0 31.5H1440"
              stroke="url(#problemSolutionDividerYT)"
              strokeWidth="1"
            />
            <defs>
              <linearGradient id="problemSolutionDividerYT" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#00E6D2" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>

          <div className="max-w-[1140px] xl:max-w-[1220px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 relative items-stretch">
              {/* Central Vertical Divider */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/10 pointer-events-none">
                <div className="absolute left-1/2 top-[154px] -translate-x-1/2 -translate-y-1/2 z-20 px-3 py-0.5 bg-[#080D12] text-[10px] font-mono tracking-wider text-gray-400 uppercase whitespace-nowrap">
                  FROM BURNOUT &rarr; AUTOPILOT
                </div>
              </div>

              {/* Mobile Divider */}
              <div className="lg:hidden flex justify-center -my-4">
                <div className="px-3 py-0.5 bg-[#080D12] text-[10px] font-mono tracking-wider text-gray-400 uppercase whitespace-nowrap">
                  FROM BURNOUT &rarr; AUTOPILOT
                </div>
              </div>

              {/* LEFT COLUMN: Problem (Burning Out on Content) */}
              <div className="w-full max-w-[460px] mx-auto lg:mr-12 xl:mr-14 lg:ml-auto flex flex-col justify-between h-full">
                <div>
                  <div className="w-full mb-6 lg:h-[130px] flex flex-col justify-start">
                    <div className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs tracking-wider uppercase font-mono">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      <span>BURNING OUT ON CONTENT</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[30px] font-extrabold text-white tracking-tight leading-[1.15] font-heading mt-3">
                      Growing a Channel Takes More Time Than You Have
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
                          20+ hrs <span className="text-red-500">burned</span>
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          WEEKLY PRODUCTION TIME DRAIN
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <CircleX className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-red-500 tracking-tight font-heading leading-tight">
                          0%
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          ALGORITHM MOMENTUM (INCONSISTENT)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <Hourglass className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-red-500 tracking-tight font-heading leading-tight">
                          Low CTR
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          AMATEUR PACKAGING &amp; SKIPPED HOOKS
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        Spending 20+ hours editing videos instead of running your company
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        Inconsistent uploads causing algorithm penalty and flatlined views
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        Amateur thumbnails and poor retention hooks that get skipped
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Solution (Hands-Off Autonomous Studio) */}
              <div className="w-full max-w-[460px] mx-auto lg:ml-12 xl:ml-14 lg:mr-auto flex flex-col justify-between h-full">
                <div>
                  <div className="w-full mb-6 lg:h-[130px] flex flex-col justify-start">
                    <div className="inline-flex items-center gap-2 text-[#00E6D2] font-semibold text-xs tracking-wider uppercase font-mono drop-shadow-[0_0_8px_#00E6D2]">
                      <WingLogo className="w-4 h-4 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                      <span>HANDS-OFF AUTOMATION</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[30px] font-extrabold text-white tracking-tight leading-[1.15] font-heading mt-3">
                      Full-Scale <span className="text-[#00FFE5]">Autonomous Studio</span>
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
                          100%
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          HANDS-OFF PRODUCTION PIPELINE
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <RefreshCw className="w-4 h-4 text-[#00FFE5]" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-[#00FFE5] tracking-tight font-heading leading-tight">
                          12-15%
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          HIGH-CTR VIRAL PACKAGING
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-[#00FFE5]" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-[#00FFE5] tracking-tight font-heading leading-tight">
                          Weekly
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          GUARANTEED CONSISTENT UPLOADS
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        <strong className="text-white font-semibold">Full studio pipeline:</strong> Scripting, Voiceover, 4K Editing, Packaging
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        <strong className="text-white font-semibold">High-converting viral thumbnail designs</strong> tested for maximum CTR
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        <strong className="text-white font-semibold">Consistent weekly uploads</strong> without you touching video editing software
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CAPABILITIES / FEATURES (Service Cards Grid) */}
        <section id="production-pipeline" className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00E6D2]/[0.04] blur-[160px] pointer-events-none -z-0" />

          <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>STUDIO SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading mt-1">
              What You Get With YouTube Automation
            </h2>
          </div>

          {/* 6 Service Cards Grid (Matches Home Page & AI Automation) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {service.features.map((feature, index) => {
              const icons = [Clapperboard, Scissors, Film, Eye, Calendar, TrendingUp];
              const IconComp = icons[index % icons.length];

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
                  className="lg:col-span-2 group relative flex flex-col justify-between bg-[#0B0E13]/90 backdrop-blur-xl border border-white/10 hover:border-[#00E6D2]/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(0,230,210,0.15)] transform-gpu will-change-transform"
                >
                  <div className="flex flex-col flex-1">
                    {/* Icon Box */}
                    <div className="w-10 h-10 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center text-[#00E6D2] mb-4 group-hover:scale-105 group-hover:bg-[#00E6D2]/20 transition-all duration-300">
                      <IconComp className="w-5 h-5 text-[#00E6D2]" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#00E6D2] transition-colors leading-snug font-heading">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
                      {feature.description}
                    </p>
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
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>PRODUCTION CYCLE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
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
        <CTA
          id="service-cta"
          initialService={service.title}
          heading={service.ctaHeading}
          subheading={service.ctaSubheading}
        />
      </main>

      <Footer />
    </div>
  );
};
