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
  Share2,
  Sparkles,
  Clock,
  CircleX,
  Hourglass,
  Zap,
  RefreshCw,
  Check,
  X,
} from 'lucide-react';
import type { ServiceItemData } from '../../data/servicesData';
import { serviceList } from '../../data/servicesData';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { WingLogo } from '../WingLogo';
import { useSmoothScroll } from '../SmoothScrollProvider';

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
      <div className="fixed top-12 left-1/4 w-[500px] h-[350px] bg-[#00E6D2]/10 blur-[130px] rounded-full pointer-events-none -z-0" />

      {/* Global website Navbar - synced with homepage */}
      <Navbar
        isHeroRevealed={true}
        currentPath={`/services/${service.slug}`}
        onNavigate={handleNav}
      />

      <main className="relative z-10">
        {/* 1. HERO SECTION: Clean Split Headline in sync with Homepage Typography & Foreground Video Overlap */}
        <section
          ref={heroRef}
          className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#040608] text-white pt-24 sm:pt-28 pb-24 sm:pb-28 lg:pb-36 px-6 sm:px-10 md:px-14 lg:px-20"
        >
          {/* Text Layer (z-10, sits behind foreground video subject) */}
          <div className="relative z-10 flex flex-col justify-between flex-1 max-w-[1360px] mx-auto w-full">
            {/* Top spacer to balance vertical distribution */}
            <div className="pt-2" />

            {/* MIDDLE: Symmetrical Split Headline flanking the subject (Homepage typography) */}
            <div className="my-auto py-4 sm:py-6 w-full">
              <div className="grid grid-cols-2 gap-x-8 sm:gap-x-12 md:gap-x-16 lg:gap-x-20 xl:gap-x-24 items-center">
                {/* LEFT SIDE: "AUTOMATE" + "WITH AD" */}
                <div className="flex flex-col items-end text-right select-none">
                  <div className="font-heading font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.9rem] xl:text-[4.6rem] tracking-[-0.03em] leading-[1.06]">
                    AUTOMATE
                  </div>
                  <div className="flex items-baseline gap-2.5 sm:gap-3.5 mt-1.5 sm:mt-2.5">
                    <span className="font-heading font-extrabold text-white text-2xl sm:text-3xl md:text-4xl lg:text-[3.2rem] xl:text-[3.8rem] tracking-[-0.03em] leading-[1.06]">
                      WITH
                    </span>
                    <span className="font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00F5E0] to-[#00D6C4] drop-shadow-[0_0_15px_rgba(0,255,229,0.45)] text-2xl sm:text-3xl md:text-4xl lg:text-[3.2rem] xl:text-[3.8rem] tracking-[-0.03em] leading-[1.06]">
                      AD
                    </span>
                  </div>
                </div>

                {/* RIGHT SIDE: "BUSINESS" + "VANCED AI" */}
                <div className="flex flex-col items-start text-left select-none">
                  <div className="font-heading font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.9rem] xl:text-[4.6rem] tracking-[-0.03em] leading-[1.06]">
                    BUSINESS
                  </div>
                  <div className="mt-1.5 sm:mt-2.5">
                    <span className="font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00F5E0] to-[#00D6C4] drop-shadow-[0_0_15px_rgba(0,255,229,0.45)] text-2xl sm:text-3xl md:text-4xl lg:text-[3.2rem] xl:text-[3.8rem] tracking-[-0.03em] leading-[1.06]">
                      VANCED AI
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM ROW: Description (left) + CTA button (right) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-4">
              {/* Bottom Left: Description (clean, no green accent line) */}
              <div className="max-w-sm">
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                  {service.heroDescription}
                </p>
              </div>

              {/* Bottom Right: Button synced with homepage */}
              <div className="flex justify-end">
                <a
                  href="#service-cta"
                  onClick={handleScrollToContact}
                  className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-heading font-bold text-sm sm:text-base text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_25px_rgba(0,230,210,0.4)] hover:shadow-[0_0_40px_rgba(0,255,229,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{service.ctaButtonText}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          </div>

          {/* FOREGROUND VIDEO: Positioned in front (z-20) with mask so the woman subject sits in front of the text */}
          <div
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden transform-gpu will-change-transform [backface-visibility:hidden] [transform:translateZ(0)]"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 20% 48% at 50% 50%, black 12%, transparent 72%)',
              maskImage: 'radial-gradient(ellipse 20% 48% at 50% 50%, black 12%, transparent 72%)',
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
              className="h-full w-full object-cover lg:scale-[1.2] transform-gpu will-change-transform"
            />
          </div>
        </section>


        {/* 2. PROBLEM VS. SOLUTION (The Cost of Manual Repetition vs. The AI Advantage) */}
        <section className="mt-20 sm:mt-28 lg:mt-36 pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-16 lg:pb-20 bg-[#040608] border-y border-white/10 relative overflow-hidden select-none">
          {/* Subtle Ambient Glows matching screenshot */}
          <div className="absolute top-1/2 left-0 -translate-x-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-red-600/[0.04] blur-[140px] rounded-full pointer-events-none -z-0" />
          <div className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-[#00FFE5]/[0.05] blur-[140px] rounded-full pointer-events-none -z-0" />

          {/* Faint contour waves on right side */}
          <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-20 text-[#00E6D2]" viewBox="0 0 700 500" fill="none">
            <path d="M100 500C300 420 500 250 700 80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M250 500C420 400 580 200 700 0" stroke="currentColor" strokeWidth="1" />
          </svg>

          <div className="max-w-[1080px] xl:max-w-[1120px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 relative items-start">
              {/* Central Vertical Divider with "FROM MANUAL → AUTONOMOUS" Badge */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/10 pointer-events-none">
                <div className="absolute left-1/2 top-[215px] -translate-x-1/2 -translate-y-1/2 z-20 px-3.5 py-1 rounded-full bg-[#080D12] border border-white/15 text-[10px] font-mono tracking-wider text-gray-300 uppercase whitespace-nowrap shadow-xl">
                  FROM MANUAL &rarr; AUTONOMOUS
                </div>
              </div>

              {/* Mobile Pill Divider */}
              <div className="lg:hidden flex justify-center -my-4">
                <div className="px-3 py-1 rounded-full bg-[#080D12] border border-white/15 text-[10px] font-mono tracking-wider text-gray-300 uppercase whitespace-nowrap">
                  FROM MANUAL &rarr; AUTONOMOUS
                </div>
              </div>

              {/* LEFT COLUMN: Manual Workflows (Centered in left half) */}
              <div className="w-full max-w-[420px] sm:max-w-[440px] mx-auto lg:mr-12 xl:mr-16 lg:ml-auto flex flex-col justify-between">
                <div>
                  {/* Top Header Block with full column width and bottom margin */}
                  <div className="w-full min-h-[160px] sm:min-h-[175px] mb-8 sm:mb-10 flex flex-col justify-start">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-[11px] tracking-wider uppercase font-heading w-fit">
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                      <span>MANUAL WORKFLOWS</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[34px] font-extrabold text-white tracking-tight leading-[1.12] font-heading mt-3 mb-2.5">
                      The Cost of<br />Manual Repetition
                    </h2>

                    {/* Subtitle description */}
                    <p className="text-gray-400 text-xs sm:text-[13px] leading-relaxed font-sans">
                      Manual workflows create invisible operational costs — consuming time, increasing errors, and slowing your business.
                    </p>
                  </div>

                  {/* 3 Metric Rows */}
                  <div className="divide-y divide-white/10 border-y border-white/10">
                    {/* Row 1 */}
                    <div className="flex items-center gap-4 py-3 sm:py-3.5">
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
                    <div className="flex items-center gap-4 py-3 sm:py-3.5">
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
                    <div className="flex items-center gap-4 py-3 sm:py-3.5">
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
                  <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans">
                        Manual data entry and repetitive tasks
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans">
                        Slow follow-ups and missed opportunities
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans">
                        Costly copy-paste mistakes across systems
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: AI Autopilot (Centered in right half) */}
              <div className="w-full max-w-[420px] sm:max-w-[440px] mx-auto lg:ml-12 xl:ml-16 lg:mr-auto flex flex-col justify-between">
                <div>
                  {/* Top Header Block with full column width and bottom margin */}
                  <div className="w-full min-h-[160px] sm:min-h-[175px] mb-8 sm:mb-10 flex flex-col justify-start">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/25 text-[#00E6D2] font-semibold text-[11px] tracking-wider uppercase font-heading w-fit">
                      <Zap className="w-3 h-3 text-[#00E6D2] fill-[#00E6D2]" />
                      <span>AI AUTOPILOT</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[34px] font-extrabold text-white tracking-tight leading-[1.12] font-heading mt-3 mb-2.5">
                      The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00FFE5]">AI Advantage</span>
                    </h2>

                    {/* Subtitle description */}
                    <p className="text-gray-400 text-xs sm:text-[13px] leading-relaxed font-sans">
                      Intelligent systems remove the repetitive work, connect your tools, and execute your operations — so your team can focus on what actually grows your business.
                    </p>
                  </div>

                  {/* 3 Metric Rows */}
                  <div className="divide-y divide-white/10 border-y border-white/10">
                    {/* Row 1 */}
                    <div className="flex items-center gap-4 py-3 sm:py-3.5">
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
                    <div className="flex items-center gap-4 py-3 sm:py-3.5">
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
                    <div className="flex items-center gap-4 py-3 sm:py-3.5">
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
                  <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5]" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans">
                        <strong className="text-white font-semibold">Instant qualification</strong> and lead routing
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5]" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans">
                        <strong className="text-white font-semibold">Connected workflows</strong> across your CRM, marketing and tools
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#00FFE5] shrink-0 stroke-[2.5]" />
                      <span className="text-xs sm:text-[13px] text-gray-300 font-sans">
                        <strong className="text-white font-semibold">Always-on execution</strong> without human intervention
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CAPABILITIES / FEATURES (3D Rolling Cube) */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00E6D2]/[0.05] blur-[160px] pointer-events-none -z-0" />

          <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
            <div className="inline-flex items-center justify-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-heading mb-2">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>ENTERPRISE DELIVERABLES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-heading">
              What You Get With Our AI Automation
            </h2>
          </div>

          {/* 3D Perspective Scene Container */}
          <div className="w-full mx-auto h-[440px] sm:h-[500px] flex items-center justify-center cube-perspective relative z-10">
            {/* Ambient cyber glow circle behind the cube */}
            <div className="absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] rounded-full bg-[radial-gradient(circle,rgba(0,230,210,0.12)_0%,transparent_70%)] pointer-events-none -z-0" />

            {/* Rolling 3D Cube with 6 faces */}
            <div className="relative w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] preserve-3d animate-roll-3d hover:[animation-play-state:paused] cursor-pointer">
              {/* Face 1 (Front): Workflow Automation */}
              <div className="box [transform:translateZ(90px)] sm:[transform:translateZ(125px)]">
                <div className="w-12 h-12 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/30 flex items-center justify-center text-[#00FFE5] mb-3 shadow-[0_0_15px_rgba(0,255,229,0.3)]">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="font-heading font-extrabold text-base sm:text-xl text-white tracking-tight leading-snug">
                  Workflow Automation
                </span>
              </div>

              {/* Face 2 (Back): AI Chatbots & Assistants */}
              <div className="box [transform:translateZ(-90px)_rotateY(180deg)] sm:[transform:translateZ(-125px)_rotateY(180deg)]">
                <div className="w-12 h-12 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/30 flex items-center justify-center text-[#00FFE5] mb-3 shadow-[0_0_15px_rgba(0,255,229,0.3)]">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="font-heading font-extrabold text-base sm:text-xl text-white tracking-tight leading-snug">
                  AI Chatbots &amp; Assistants
                </span>
              </div>

              {/* Face 3 (Left): CRM & Tool Integration */}
              <div className="box right-[90px] sm:right-[125px] [transform:rotateY(-90deg)]">
                <div className="w-12 h-12 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/30 flex items-center justify-center text-[#00FFE5] mb-3 shadow-[0_0_15px_rgba(0,255,229,0.3)]">
                  <Database className="w-6 h-6" />
                </div>
                <span className="font-heading font-extrabold text-base sm:text-xl text-white tracking-tight leading-snug">
                  CRM &amp; Tool Integration
                </span>
              </div>

              {/* Face 4 (Right): Automated Follow-ups */}
              <div className="box left-[90px] sm:left-[125px] [transform:rotateY(90deg)]">
                <div className="w-12 h-12 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/30 flex items-center justify-center text-[#00FFE5] mb-3 shadow-[0_0_15px_rgba(0,255,229,0.3)]">
                  <Share2 className="w-6 h-6" />
                </div>
                <span className="font-heading font-extrabold text-base sm:text-xl text-white tracking-tight leading-snug">
                  Automated Follow-ups
                </span>
              </div>

              {/* Face 5 (Top): Custom AI Solutions */}
              <div className="box bottom-[90px] sm:bottom-[125px] [transform:rotateX(90deg)]">
                <div className="w-12 h-12 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/30 flex items-center justify-center text-[#00FFE5] mb-3 shadow-[0_0_15px_rgba(0,255,229,0.3)]">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="font-heading font-extrabold text-base sm:text-xl text-white tracking-tight leading-snug">
                  Custom AI Solutions
                </span>
              </div>

              {/* Face 6 (Bottom): Autonomous AI Agents */}
              <div className="box top-[90px] sm:top-[125px] [transform:rotateX(-90deg)]">
                <div className="w-12 h-12 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/30 flex items-center justify-center text-[#00FFE5] mb-3 shadow-[0_0_15px_rgba(0,255,229,0.3)]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="font-heading font-extrabold text-base sm:text-xl text-white tracking-tight leading-snug">
                  Autonomous AI Agents
                </span>
              </div>
            </div>
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
