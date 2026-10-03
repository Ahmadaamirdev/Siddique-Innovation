import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Cpu,
  ArrowUpRight,
  ArrowRight,
  AlertTriangle,
  ChevronDown,
  Layers,
  Database,
  Clock,
  CircleX,
  Hourglass,
  Zap,
  RefreshCw,
  Check,
  X,
  Mail,
} from 'lucide-react';
import type { ServiceItemData } from '../../data/servicesData';
import { serviceList } from '../../data/servicesData';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { WingLogo } from '../WingLogo';
import { CTA } from '../CTA';
import { useSmoothScroll } from '../SmoothScrollProvider';

const aiDeliverables = [
  {
    icon: Layers,
    title: 'Workflow Automation',
    description:
      'Automating repetitive internal processes like data entry, reporting, and task handoffs.',
  },
  {
    icon: Bot,
    title: 'AI Chatbots & Assistants',
    description:
      'Automated customer support and lead responses that work around the clock.',
  },
  {
    icon: Database,
    title: 'CRM & Tool Integration',
    description:
      'Connecting your existing software so information flows automatically, without manual updates.',
  },
  {
    icon: Mail,
    title: 'Automated Follow-ups',
    description:
      'Emails, messages, or reminders sent automatically based on triggers you define.',
  },
  {
    icon: Cpu,
    title: 'Custom AI Solutions',
    description:
      'Automation built specifically around your business processes, not a one-size-fits-all template',
  },
];

interface AIAutomationPageProps {
  service: ServiceItemData;
  onNavigateHome: () => void;
  onNavigateService: (slug: string) => void;
  onNavigate?: (path: string) => void;
}

export const AIAutomationPage: React.FC<AIAutomationPageProps> = ({
  service,
  onNavigateHome,
  onNavigateService,
  onNavigate,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { startScroll } = useSmoothScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Guarantee smooth scroll restoration on page mount
  useEffect(() => {
    (window as any).__heroRevealed = true;
    startScroll();
    if ((window as any).__lenis) {
      (window as any).__lenis.start();
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
    document.documentElement.classList.remove('lenis-stopped');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, [startScroll]);

  // Pause video when out of viewport to preserve 60fps scrolling and avoid GPU throttling
  useEffect(() => {
    if (!heroRef.current || !videoRef.current) return;
    const videoEl = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => { });
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

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

  const handleScrollToContact = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    document.getElementById('service-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#040608] text-white selection:bg-[#00E6D2] selection:text-black relative overflow-x-hidden font-sans">
      {/* Background Matrix / Cyber Grid Ambient */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#00E6D208_1px,transparent_1px),linear-gradient(to_bottom,#00E6D208_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-0" />

      {/* Global website Navbar - synced with homepage */}
      <Navbar
        isHeroRevealed={true}
        currentPath={`/services/${service.slug}`}
        onNavigate={handleNav}
      />

      <main className="pt-20 sm:pt-24 lg:pt-20 relative z-10">
        {/* 1. HERO SECTION: Matched to Homepage Hero layout */}
        <section
          ref={heroRef}
          className="relative w-full h-[calc(100vh-5rem)] min-h-[580px] sm:min-h-[640px] max-h-[1050px] overflow-hidden bg-[#040608] text-white flex flex-col justify-between select-none"
        >
          {/* Centered Video Layer (Moved a bit above) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
            <div className="relative z-0 flex items-center justify-center -translate-y-7 sm:-translate-y-11 lg:-translate-y-14">
              <div
                className="relative w-full max-w-[460px] sm:max-w-[540px] md:max-w-[620px] lg:max-w-[680px] xl:max-w-[740px] aspect-[4/5] sm:aspect-square lg:aspect-[4/5] flex items-center justify-center overflow-hidden"
                style={{
                  WebkitMaskImage: 'radial-gradient(ellipse 52% 56% at 50% 46%, black 30%, transparent 72%)',
                  maskImage: 'radial-gradient(ellipse 52% 56% at 50% 46%, black 30%, transparent 72%)',
                }}
              >
                <video
                  ref={videoRef}
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260725_114042_d2ed2a89-f2fa-449b-9609-da456344257b.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover transform-gpu will-change-transform scale-[1.28]"
                />
              </div>
            </div>
          </div>

          {/* TOP-LEFT: H1 Heading (Size matched to homepage hero H1, smart enterprise automation removed) */}
          <div className="w-full flex items-start justify-start pt-4 sm:pt-6 lg:pt-8 pl-4 sm:px-8 lg:px-14 xl:px-20 pointer-events-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-left"
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading py-1 drop-shadow-md">
                <span className="block">Automate Business</span>
                <span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_25px_rgba(0,255,229,0.35)]"
                  style={{ WebkitTextFillColor: 'transparent' }}
                >
                  With Advanced AI
                </span>
              </h1>
            </motion.div>
          </div>

          {/* RIGHT-SIDE MIDDLE: Description Card (Frosted glass card matched to homepage hero) */}
          <div className="w-full flex items-center justify-end pointer-events-auto my-auto py-2 sm:py-4 pr-3 sm:pr-4 lg:pr-6 xl:pr-10 translate-y-3 sm:translate-y-5 lg:translate-y-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background:
                  'radial-gradient(circle at 85% 15%, rgba(0, 255, 229, 0.09) 0%, rgba(6, 16, 20, 0.6) 55%, rgba(5, 10, 12, 0.7) 100%)',
              }}
              className="relative max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[390px] xl:max-w-[420px] text-left p-4 sm:p-5 lg:p-6 rounded-2xl border border-[#00FFE5]/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_25px_rgba(0,255,229,0.08)] [box-shadow:inset_0_1px_1px_rgba(0,255,229,0.2)]"
            >
              <p className="text-gray-300 text-xs sm:text-[13px] lg:text-sm leading-relaxed font-sans font-normal">
                {service.heroDescription}
              </p>
            </motion.div>
          </div>

          {/* BOTTOM-LEFT: CTA Button (Moved a bit above for clear visibility) */}
          <div className="w-full flex items-center justify-between pb-16 sm:pb-20 lg:pb-24 pl-4 sm:px-8 lg:px-14 xl:px-20 pointer-events-auto relative z-10 -translate-y-5 sm:-translate-y-8 lg:-translate-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a
                href="#service-cta"
                onClick={handleScrollToContact}
                className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_20px_rgba(0,230,210,0.35)] hover:shadow-[0_0_30px_rgba(0,255,229,0.6)] transition-all duration-300 font-heading cursor-pointer"
              >
                <span>{service.ctaButtonText}</span>
                <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.div>
          </div>
        </section>


        {/* 2. PROBLEM VS. SOLUTION (The Cost of Manual Repetition vs. The AI Advantage) */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[#040608] border-y border-white/10 relative overflow-hidden select-none">

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
                  FROM MANUAL &rarr; AUTONOMOUS
                </div>
              </div>

              {/* Mobile Divider */}
              <div className="lg:hidden flex justify-center -my-4">
                <div className="px-3 py-0.5 bg-[#080D12] text-[10px] font-mono tracking-wider text-gray-400 uppercase whitespace-nowrap">
                  FROM MANUAL &rarr; AUTONOMOUS
                </div>
              </div>

              {/* LEFT COLUMN: Manual Workflows */}
              <div className="w-full max-w-[460px] mx-auto lg:mr-12 xl:mr-14 lg:ml-auto flex flex-col justify-between h-full">
                <div>
                  {/* Top Header Block */}
                  <div className="w-full mb-6 lg:h-[130px] flex flex-col justify-start">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs tracking-wider uppercase font-mono">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      <span>MANUAL WORKFLOWS</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[30px] font-extrabold text-white tracking-tight leading-[1.15] font-heading mt-3">
                      The Cost of Manual Repetition
                    </h2>
                  </div>

                  {/* 3 Metric Rows */}
                  <div className="divide-y divide-white/10 border-y border-white/10">
                    {/* Row 1 */}
                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading leading-tight">
                          15–20 <span className="text-red-500">hrs</span>
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          WASTED WEEKLY
                        </div>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <CircleX className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-red-500 tracking-tight font-heading leading-tight">
                          4–7%
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          COPY-PASTE ERRORS
                        </div>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <Hourglass className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-red-500 tracking-tight font-heading leading-tight">
                          24h+
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          LEAD RESPONSE LAG
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        Manual data entry and repetitive tasks
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        Slow follow-ups and missed opportunities
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        Costly copy-paste mistakes across systems
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: AI Autopilot */}
              <div className="w-full max-w-[460px] mx-auto lg:ml-12 xl:ml-14 lg:mr-auto flex flex-col justify-between h-full">
                <div>
                  {/* Top Header Block */}
                  <div className="w-full mb-6 lg:h-[130px] flex flex-col justify-start">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 text-[#00E6D2] font-semibold text-xs tracking-wider uppercase font-mono">
                      <WingLogo className="w-4 h-4 shrink-0" />
                      <span>AI AUTOPILOT</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[30px] font-extrabold text-white tracking-tight leading-[1.15] font-heading mt-3">
                      The <span className="text-[#00FFE5]">AI Advantage</span>
                    </h2>
                  </div>

                  {/* 3 Metric Rows */}
                  <div className="divide-y divide-white/10 border-y border-white/10">
                    {/* Row 1 */}
                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 text-[#00FFE5] fill-[#00FFE5]" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-[#00FFE5] tracking-tight font-heading leading-tight">
                          &lt;150ms
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          EXECUTION SPEED
                        </div>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <RefreshCw className="w-4 h-4 text-[#00FFE5]" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-[#00FFE5] tracking-tight font-heading leading-tight">
                          0.0%
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          DATA SYNC ERRORS
                        </div>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="flex items-center gap-4 py-3 sm:py-3.5 h-[72px]">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center shrink-0">
                        <div className="relative w-5 h-5 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#00FFE5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 0 1 14.93-4M20 12a8 8 0 0 1-14.93 4" />
                            <polyline points="19 4 19 8 15 8" />
                            <polyline points="5 20 5 16 9 16" />
                          </svg>
                          <span className="absolute text-[5.5px] font-extrabold text-[#00FFE5] font-mono leading-none tracking-tighter">24/7</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-[#00FFE5] tracking-tight font-heading leading-tight">
                          24/7
                        </div>
                        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-sans mt-0.5">
                          AUTONOMOUS UPTIME
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        <strong className="text-white font-semibold">Instant qualification</strong> and lead routing
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        <strong className="text-white font-semibold">Connected workflows</strong> across your CRM, marketing and tools
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 min-h-[32px]">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans leading-snug">
                        <strong className="text-white font-semibold">Always-on execution</strong> without human intervention
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CAPABILITIES / FEATURES (Service Cards) */}
        <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00E6D2]/[0.04] blur-[160px] pointer-events-none -z-0" />

          <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0" />
              <span>SERVICES</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading mt-1">
              What You Get With Our AI Automation
            </h2>
          </div>

          {/* 5 Service Cards Grid: 3 in first row, 2 centered in second row (Matches Home Page) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {aiDeliverables.map((item, index) => {
              const IconComp = item.icon;
              const layoutClasses =
                index === 3
                  ? 'lg:col-span-2 lg:col-start-2'
                  : index === 4
                    ? 'md:col-span-2 md:max-w-md md:mx-auto md:w-full lg:col-span-2 lg:col-start-4 lg:max-w-none lg:w-auto'
                    : 'lg:col-span-2';

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
                  className={`group relative flex flex-col justify-between bg-[#0B0E13]/90 backdrop-blur-xl border border-white/10 hover:border-[#00E6D2]/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(0,230,210,0.15)] transform-gpu will-change-transform ${layoutClasses}`}
                >
                  <div className="flex flex-col flex-1">
                    {/* Header: Icon Box and Title inline */}
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center text-[#00E6D2] group-hover:scale-105 group-hover:bg-[#00E6D2]/20 transition-all duration-300">
                        <IconComp className="w-5 h-5 text-[#00E6D2]" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00E6D2] transition-colors leading-snug font-heading">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
                      {item.description}
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
                    {/* Header (Clean: No green dot) */}
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
                    <span>Active Workflow Stage</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ACCORDION FAQS */}
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
              <WingLogo className="w-5 h-5 shrink-0" />
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

      <Footer onNavigate={handleNav} />
    </div>
  );
};
