import React, { useEffect } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import {
  Bot,
  Code2,
  TrendingUp,
  Search,
  Video,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CTA } from './CTA';
import { WingLogo } from './WingLogo';
import { Stats } from './Stats';
import { RoundtableSection } from './about/RoundtableSection';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  const getFadeUp = (delay: number): HTMLMotionProps<'div'> => {
    if (shouldReduceMotion) {
      return { initial: false };
    }
    return {
      initial: { opacity: 0, y: 12 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: false, margin: '-40px' },
      transition: { duration: 0.4, delay, ease: 'easeOut' as const },
    };
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'About Us | Siddiqui Innovations - Helping Businesses Move Into the AI Era';
    return () => {
      document.title = 'Siddiqui Innovations | AI Automation, SEO & Digital Growth';
    };
  }, []);

  const teamSpecializations = [
    {
      role: 'AI Automation & Agents',
      desc: 'Developing autonomous workflows, custom LLM agents, CRM connectors, and instant 24/7 lead response pipelines.',
      icon: Bot,
      color: '#00E6D2',
    },
    {
      role: 'Full-Stack Web Development',
      desc: 'Building ultrafast, responsive websites and custom web applications engineered for seamless conversion.',
      icon: Code2,
      color: '#00FFE5',
    },
    {
      role: 'Growth & Digital Marketing',
      desc: 'Executing data-backed paid acquisition, audience targeting, and multi-channel campaign architectures.',
      icon: TrendingUp,
      color: '#38bdf8',
    },
    {
      role: 'SEO & Search Intelligence (AEO)',
      desc: 'Securing top-page rankings and optimizing for modern AI answer engines like ChatGPT and Perplexity.',
      icon: Search,
      color: '#818cf8',
    },
    {
      role: 'YouTube Automation & Media',
      desc: 'End-to-end video strategy, scriptwriting, 4K production, viral thumbnail packaging, and upload management.',
      icon: Video,
      color: '#f43f5e',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#00E6D2] selection:text-black relative overflow-x-clip font-sans">
      {/* Background Ambient Glows */}
      <div className="fixed top-20 left-1/4 w-[650px] h-[400px] bg-radial from-[#00E6D2]/10 via-transparent to-transparent blur-[150px] pointer-events-none -z-0" />
      <div className="fixed bottom-1/3 right-1/4 w-[500px] h-[400px] bg-radial from-[#00FFE5]/5 via-transparent to-transparent blur-[150px] pointer-events-none -z-0" />

      {/* Floating Navbar */}
      <Navbar
        isHeroRevealed={true}
        currentPath="/about"
        onNavigate={onNavigate}
      />

      <main className="relative z-10">
        {/* 1. HERO & ROUNDTABLE SECTION (Fits into single cohesive section) */}
        <RoundtableSection />

        {/* 2. STATS BAR (Identical size, length, width, and styling as homepage) */}
        <Stats />

        {/* 3. OUR STORY & OUR MISSION */}
        <section id="story-mission" className="py-20 sm:py-28 lg:py-32 scroll-mt-28">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top row: Two side-by-side cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Left Card: Our Story */}
              <motion.div
                {...getFadeUp(0)}
                className="rounded-[20px] bg-[#0A0E14]/90 border border-[#00E6D2]/20 p-6 sm:p-8 flex flex-col justify-between hover:border-[#00E6D2]/50 transition-colors duration-150"
              >
                <div>
                  <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-[13px] tracking-widest uppercase font-mono mb-4">
                    <WingLogo className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>OUR STORY</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white font-heading tracking-tight leading-snug mb-4">
                    Why We Started
                  </h2>

                  {/* Lead paragraph */}
                  <p className="text-gray-200 font-medium text-sm sm:text-base leading-relaxed max-w-[60ch] mb-5">
                    Siddiqui Innovations was built around a simple observation: most businesses are still spending hours every day on tasks that no longer need a human doing them manually. Data entry, follow-ups, repetitive replies, scheduling or operating whole tasks on CRMs.
                  </p>

                  {/* Body paragraphs with thin teal vertical rule */}
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm md:text-[14.5px] text-gray-300 leading-relaxed border-l-2 border-[#00E6D2]/40 pl-3.5 sm:pl-4 max-w-[60ch]">
                      We started this agency to change that. Our goal is to help businesses step confidently into the AI era by automating the repetitive parts of their operations without the cost or complexity of hiring additional staff.
                    </p>
                    <p className="text-xs sm:text-sm md:text-[14.5px] text-gray-300 leading-relaxed border-l-2 border-[#00E6D2]/40 pl-3.5 sm:pl-4 max-w-[60ch]">
                      Alongside automation, we help businesses build the Advanced websites and marketing presence they need to grow, all under one dedicated and experienced team.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Card: Our Mission */}
              <motion.div
                {...getFadeUp(0.08)}
                className="rounded-[20px] bg-[#0A0E14]/90 border border-[#00E6D2]/20 p-6 sm:p-8 flex flex-col justify-between hover:border-[#00E6D2]/50 transition-colors duration-150"
              >
                <div>
                  <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-[13px] tracking-widest uppercase font-mono mb-4">
                    <WingLogo className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>OUR MISSION</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white font-heading tracking-tight leading-snug mb-4">
                    What Drives Us
                  </h2>

                  {/* Lead paragraph */}
                  <p className="text-gray-200 font-medium text-sm sm:text-base leading-relaxed max-w-[60ch] mb-5">
                    We believe businesses shouldn't have to choose between growing and staying efficient.
                  </p>

                  {/* Body paragraph with thin teal vertical rule */}
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm md:text-[14.5px] text-gray-300 leading-relaxed border-l-2 border-[#00E6D2]/40 pl-3.5 sm:pl-4 max-w-[60ch]">
                      Our mission is to give businesses access to the same automation, development, and marketing capabilities that larger companies use, delivered in a way that's practical, affordable, and built around how they actually operate.
                    </p>
                  </div>

                  {/* Sub-cards side by side below paragraphs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    <div className="p-4 sm:p-5 rounded-xl bg-[#06080C]/90 border border-[#00E6D2]/20">
                      <h3 className="text-sm font-bold text-white mb-1">Practical &amp; Affordable</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">Solutions that pay for themselves through hours saved and direct revenue.</p>
                    </div>
                    <div className="p-4 sm:p-5 rounded-xl bg-[#06080C]/90 border border-[#00E6D2]/20">
                      <h3 className="text-sm font-bold text-white mb-1">Built for Your Workflow</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">Customized around your exact tools and team, never generic cookie-cutter templates.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Tagline Band: Full-width row of two equal outlined boxes */}
            <motion.div
              {...getFadeUp(0.16)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
            >
              <div className="rounded-[16px] border border-[#00E6D2]/20 bg-[#0A0E14]/90 p-5 sm:py-5 sm:px-6 flex items-center gap-3.5 hover:border-[#00E6D2]/50 transition-colors duration-150">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#00E6D2] shrink-0" aria-hidden="true" />
                <span className="text-[#00E6D2] font-bold text-sm sm:text-base tracking-wide font-heading leading-snug">
                  Zero Busywork. Maximum Scalability.
                </span>
              </div>
              <div className="rounded-[16px] border border-[#00E6D2]/20 bg-[#0A0E14]/90 p-5 sm:py-5 sm:px-6 flex items-center gap-3.5 hover:border-[#00E6D2]/50 transition-colors duration-150">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#00E6D2] shrink-0" aria-hidden="true" />
                <span className="text-[#00E6D2] font-bold text-sm sm:text-base tracking-wide font-heading leading-snug">
                  Empowering Global Growth From Pakistan
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. OUR TEAM: A TEAM BUILT ON SPECIALIZATION */}
        <section className="py-20 sm:py-28 bg-[#040608] border-t border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-mono mb-4">
                <WingLogo className="w-5 h-5 shrink-0" />
                <span>OUR TEAM</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white font-heading tracking-[-0.02em] leading-[1.18] mb-6">
                A Team Built on Specialization
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Siddiqui Innovations is made up of 10+ team members, each focused on their own area of expertise from AI automation and web development to marketing, SEO, and content. Rather than generalists handling everything, every project is supported by people who specialize in exactly what it needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {teamSpecializations.map((spec, i) => {
                const SpecIcon = spec.icon;
                const layoutClasses =
                  i === 3
                    ? 'lg:col-span-2 lg:col-start-2'
                    : i === 4
                      ? 'md:col-span-2 md:max-w-md md:mx-auto md:w-full lg:col-span-2 lg:col-start-4 lg:max-w-none lg:w-auto'
                      : 'lg:col-span-2';

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`p-6 sm:p-7 rounded-2xl bg-[#080D12] border border-white/10 hover:border-[#00E6D2]/40 transition-all duration-300 flex flex-col justify-between group ${layoutClasses}`}
                  >
                    <div>
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#00E6D2]/40 group-hover:bg-[#00E6D2]/10 flex items-center justify-center shrink-0 transition-colors">
                          <SpecIcon className="w-6 h-6 text-[#00E6D2]" />
                        </div>
                        <h3 className="text-lg font-bold text-white font-heading leading-snug group-hover:text-[#00FFE5] transition-colors">
                          {spec.role}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed font-sans">
                        {spec.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-mono">
                      <span>Dedicated Specialist</span>
                      <span className="text-[#00E6D2]">Active</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. FINAL CTA SECTION */}
        <CTA
          heading="Let's Build Your Next Step Forward"
          subheading="Whether it's automation, a new website, or stronger marketing; we're ready to help."
          id="about-cta"
        />
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
