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
}

export const AIAutomationPage: React.FC<AIAutomationPageProps> = ({
  service,
  onNavigateHome,
  onNavigateService,
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
    } else if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '').replace(/\/$/, '');
      onNavigateService(slug);
    } else {
      window.history.pushState({}, '', path);
      window.location.href = path;
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
        {/* 1. HERO SECTION: Heading & Text on Left, Video + Aurora Waves on Right */}
        <section
          ref={heroRef}
          className="relative w-full overflow-hidden bg-[#040608] text-white pb-8 sm:pb-12 px-6 sm:px-10 md:px-14 lg:px-20"
        >
          <div className="relative z-10 max-w-[1360px] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center -mt-4 sm:-mt-8 lg:-mt-12">
              {/* LEFT COLUMN: Text Content Animated In from the Left (Pristine, no wave overlap) */}
              <motion.div
                initial={{ opacity: 0, x: -70 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 flex flex-col items-start text-left relative z-10"
              >
                <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-mono drop-shadow-[0_0_8px_#00E6D2] mb-2">
                  <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
                  <span>SMART ENTERPRISE AUTOMATION</span>
                </div>

                <motion.h1
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-extrabold text-white tracking-[-0.03em] leading-[1.12] font-heading select-none py-1"
                >
                  <span className="block">Automate Business</span>
                  <span
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]"
                    style={{ WebkitTextFillColor: 'transparent' }}
                  >
                    With Advanced AI
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="text-gray-300 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed font-sans max-w-xl mt-4"
                >
                  {service.heroDescription}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-6"
                >
                  <a
                    href="#service-cta"
                    onClick={handleScrollToContact}
                    className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm sm:text-base text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_25px_rgba(0,230,210,0.35)] hover:shadow-[0_0_35px_rgba(0,255,229,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 font-heading cursor-pointer"
                  >
                    <span>{service.ctaButtonText}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.div>
              </motion.div>

              {/* RIGHT COLUMN: Futuristic AI Avatar Video Emerging from the Bottom with Green Aurora Waves around it */}
              <motion.div
                initial={{ opacity: 0, y: 75, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.05, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 relative flex items-center justify-center lg:justify-end pointer-events-none select-none"
              >
                <div className="relative w-full flex items-center justify-center lg:justify-end">
                  {/* Luminous Green Aurora Borealis Waves (Confined strictly around video, active fluid motion) */}
                  <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 pointer-events-none flex items-center justify-center -z-10 overflow-hidden">
                    {/* Rotating & Pulsing Aurora Glow Core (Scaled down for tighter fit) */}
                    <motion.div
                      animate={{
                        scale: [0.88, 1.05, 0.88],
                        opacity: [0.35, 0.55, 0.35],
                        rotate: [0, 180, 360],
                      }}
                      transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
                      className="absolute w-[290px] sm:w-[380px] lg:w-[440px] h-[290px] sm:h-[380px] lg:h-[440px] rounded-full bg-gradient-to-tr from-[#00E6D2]/25 via-[#10B981]/20 to-[#00FFE5]/15 blur-[75px] transform-gpu"
                    />

                    {/* Dynamic Undulating Aurora Wave Curtains SVG (Tighter 110% size) */}
                    <svg
                      className="absolute w-[110%] h-[110%] pointer-events-none"
                      viewBox="0 0 600 600"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="aurora-green-curtain-1" x1="0%" y1="100%" x2="60%" y2="0%">
                          <stop offset="0%" stopColor="#059669" stopOpacity="0" />
                          <stop offset="30%" stopColor="#10B981" stopOpacity="0.45" />
                          <stop offset="65%" stopColor="#00FFE5" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#00E6D2" stopOpacity="0" />
                        </linearGradient>

                        <linearGradient id="aurora-green-curtain-2" x1="100%" y1="100%" x2="20%" y2="0%">
                          <stop offset="0%" stopColor="#00E6D2" stopOpacity="0" />
                          <stop offset="35%" stopColor="#00FFE5" stopOpacity="0.7" />
                          <stop offset="70%" stopColor="#10B981" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                        </linearGradient>

                        <linearGradient id="aurora-crest-glow" x1="0%" y1="50%" x2="100%" y2="50%">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
                          <stop offset="50%" stopColor="#00FFE5" stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#00E6D2" stopOpacity="0.1" />
                        </linearGradient>

                        <filter id="aurora-soft-blur" x="-30%" y="-30%" width="160%" height="160%">
                          <feGaussianBlur stdDeviation="16" />
                        </filter>
                        <filter id="aurora-crest-blur" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="4" />
                        </filter>
                      </defs>

                      {/* Aurora Ribbon 1: Arching Green Wave in Active Motion */}
                      <motion.path
                        d="M100,500 C170,360 210,240 310,180 C410,120 480,200 520,320 C540,380 480,480 420,520 Z"
                        fill="url(#aurora-green-curtain-1)"
                        filter="url(#aurora-soft-blur)"
                        animate={{
                          y: [-12, 12, -12],
                          x: [-10, 10, -10],
                          rotate: [-2.5, 2.5, -2.5],
                          scale: [0.88, 0.97, 0.88],
                          opacity: [0.65, 0.88, 0.65],
                        }}
                        transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                        style={{ transformOrigin: '300px 300px' }}
                      />

                      {/* Aurora Ribbon 2: Secondary Flowing Green Curtain in Counter Motion */}
                      <motion.path
                        d="M150,530 C230,410 270,270 370,210 C470,150 490,290 450,410 C410,490 330,550 250,540 Z"
                        fill="url(#aurora-green-curtain-2)"
                        filter="url(#aurora-soft-blur)"
                        animate={{
                          y: [12, -14, 12],
                          x: [10, -8, 10],
                          rotate: [2, -2, 2],
                          scale: [0.96, 0.88, 0.96],
                          opacity: [0.55, 0.82, 0.55],
                        }}
                        transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut', delay: 0.5 }}
                        style={{ transformOrigin: '300px 300px' }}
                      />

                      {/* Luminous Solid Aurora Crest Wave 1 (Clean, No Dots) */}
                      <motion.path
                        d="M110,450 C210,320 250,210 330,170 C430,120 480,220 500,340"
                        stroke="url(#aurora-crest-glow)"
                        strokeWidth="2.5"
                        fill="none"
                        filter="url(#aurora-crest-blur)"
                        animate={{
                          y: [-10, 10, -10],
                          x: [-6, 6, -6],
                          scale: [0.88, 0.96, 0.88],
                        }}
                        transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
                        style={{ transformOrigin: '300px 300px' }}
                      />

                      {/* Luminous Solid Aurora Wave Stream 2 (Clean, No Dots) */}
                      <motion.path
                        d="M130,470 C220,350 280,230 360,190 C450,150 510,250 480,380"
                        stroke="#00FFE5"
                        strokeWidth="1.8"
                        strokeOpacity="0.8"
                        fill="none"
                        filter="url(#aurora-crest-blur)"
                        animate={{
                          y: [10, -10, 10],
                          x: [8, -8, 8],
                          scale: [0.88, 0.96, 0.88],
                          opacity: [0.5, 0.82, 0.5],
                        }}
                        transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.3 }}
                        style={{ transformOrigin: '300px 300px' }}
                      />
                    </svg>
                  </div>

                  <div
                    className="relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] xl:max-w-[620px] aspect-[4/5] sm:aspect-square lg:aspect-[4/5] flex items-center justify-center overflow-hidden"
                    style={{
                      WebkitMaskImage: 'radial-gradient(ellipse 48% 54% at 50% 44%, black 20%, transparent 68%)',
                      maskImage: 'radial-gradient(ellipse 48% 54% at 50% 44%, black 20%, transparent 68%)',
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
                      className="w-full h-full object-cover transform-gpu will-change-transform scale-[1.18]"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
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
                    <div className="inline-flex items-center gap-2 text-[#00E6D2] font-semibold text-xs tracking-wider uppercase font-mono drop-shadow-[0_0_8px_#00E6D2]">
                      <WingLogo className="w-4 h-4 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
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
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading mt-1">
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
                    {/* Icon Box */}
                    <div className="w-10 h-10 rounded-lg bg-[#00E6D2]/10 border border-[#00E6D2]/25 flex items-center justify-center text-[#00E6D2] mb-4 group-hover:scale-105 group-hover:bg-[#00E6D2]/20 transition-all duration-300">
                      <IconComp className="w-5 h-5 text-[#00E6D2]" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#00E6D2] transition-colors leading-snug font-heading">
                      {item.title}
                    </h3>

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
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>EXECUTION PIPELINE</span>
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
