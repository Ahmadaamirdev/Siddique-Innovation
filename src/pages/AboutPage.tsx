import React, { useEffect } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import {
  Bot,
  Code2,
  TrendingUp,
  Search,
  Video,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CTA } from '@/components/sections/CTA';
import { WingLogo } from '@/components/ui/WingLogo';
import { Stats } from '@/components/sections/Stats';
import { RoundtableSection } from '@/components/about/RoundtableSection';
import { AboutHero } from '@/components/about/AboutHero';
import '@/components/about/AboutGlass.css';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

const SectionDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none z-20 ${className}`} aria-hidden="true">
    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
  </div>
);

const SideFlanksBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
      {/* ── LEFT FLANK ── */}
      <div className="absolute left-0 top-0 bottom-0 w-[140px] sm:w-[200px] lg:w-[260px] xl:w-[300px] pointer-events-none">
        {/* Left Ambient Side Glow */}
        <div className="absolute top-1/2 -left-16 -translate-y-1/2 w-[340px] h-[460px] bg-gradient-to-r from-[#00FFE5]/20 via-[#00E6D2]/10 to-transparent rounded-full blur-[90px]" />

        {/* Left Side SVG Architecture */}
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 300 600"
        >
          <defs>
            <filter id="flank-glow-l" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Vertical Guide Rails */}
          <line x1="80" y1="0" x2="80" y2="600" stroke="#00FFE5" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
          <line x1="120" y1="0" x2="120" y2="600" stroke="#00FFE5" strokeWidth="1" strokeDasharray="2 10" opacity="0.2" />

          {/* Flowing Laser Packet on Rail */}
          <motion.line
            x1="80"
            y1="0"
            x2="80"
            y2="600"
            stroke="#00FFE5"
            strokeWidth="2.5"
            strokeDasharray="40 260"
            filter="url(#flank-glow-l)"
            animate={{ strokeDashoffset: [0, -300] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            opacity="0.9"
          />

          {/* Horizontal Tech Ticks along Rail */}
          {[100, 200, 300, 400, 500].map((y) => (
            <g key={y} opacity="0.45">
              <line x1="68" y1={y} x2="92" y2={y} stroke="#00FFE5" strokeWidth="1.5" />
              <circle cx="80" cy={y} r="2" fill="#00FFE5" />
            </g>
          ))}

          {/* Upper Left Isometric Wireframe Cube */}
          <g transform="translate(140, 150)">
            <motion.g
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Isometric Cube (30 deg projection) */}
              <polygon points="0,-24 28,-8 0,8 -28,-8" fill="#00FFE5" fillOpacity="0.08" stroke="#00FFE5" strokeWidth="1.5" filter="url(#flank-glow-l)" />
              <polygon points="-28,-8 0,8 0,40 -28,24" fill="#00FFE5" fillOpacity="0.04" stroke="#00FFE5" strokeWidth="1.5" opacity="0.8" />
              <polygon points="0,8 28,-8 28,24 0,40" fill="#00FFE5" fillOpacity="0.05" stroke="#00FFE5" strokeWidth="1.5" opacity="0.9" />
              <circle cx="0" cy="8" r="3" fill="#00FFE5" filter="url(#flank-glow-l)" />
            </motion.g>
          </g>

          {/* Lower Left Isometric Wireframe Diamond */}
          <g transform="translate(150, 440)">
            <motion.g
              animate={{ y: [8, -8, 8], rotate: [0, 4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <polygon points="0,-20 22,-5 0,10 -22,-5" fill="#00E6D2" fillOpacity="0.06" stroke="#00E6D2" strokeWidth="1.5" />
              <polygon points="-22,-5 0,10 0,35 -22,20" stroke="#00E6D2" strokeWidth="1" opacity="0.6" />
              <polygon points="0,10 22,-5 22,20 0,35" stroke="#00E6D2" strokeWidth="1" opacity="0.7" />
              <circle cx="0" cy="8" r="2.5" fill="#00FFE5" />
            </motion.g>
          </g>
        </svg>
      </div>

      {/* ── RIGHT FLANK ── */}
      <div className="absolute right-0 top-0 bottom-0 w-[140px] sm:w-[200px] lg:w-[260px] xl:w-[300px] pointer-events-none">
        {/* Right Ambient Side Glow */}
        <div className="absolute top-1/2 -right-16 -translate-y-1/2 w-[340px] h-[460px] bg-gradient-to-l from-[#00E6D2]/20 via-[#3B82F6]/10 to-transparent rounded-full blur-[90px]" />

        {/* Right Side SVG Architecture */}
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 300 600"
        >
          <defs>
            <filter id="flank-glow-r" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Vertical Guide Rails */}
          <line x1="220" y1="0" x2="220" y2="600" stroke="#00FFE5" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
          <line x1="180" y1="0" x2="180" y2="600" stroke="#00FFE5" strokeWidth="1" strokeDasharray="2 10" opacity="0.2" />

          {/* Flowing Laser Packet on Rail (moving upwards for counter balance) */}
          <motion.line
            x1="220"
            y1="0"
            x2="220"
            y2="600"
            stroke="#00FFE5"
            strokeWidth="2.5"
            strokeDasharray="40 260"
            filter="url(#flank-glow-r)"
            animate={{ strokeDashoffset: [0, 300] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
            opacity="0.9"
          />

          {/* Horizontal Tech Ticks along Rail */}
          {[120, 220, 320, 420, 520].map((y) => (
            <g key={y} opacity="0.45">
              <line x1="208" y1={y} x2="232" y2={y} stroke="#00FFE5" strokeWidth="1.5" />
              <circle cx="220" cy={y} r="2" fill="#00FFE5" />
            </g>
          ))}

          {/* Upper Right Isometric Wireframe Cube */}
          <g transform="translate(150, 170)">
            <motion.g
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Isometric Cube (30 deg projection) */}
              <polygon points="0,-24 28,-8 0,8 -28,-8" fill="#00E6D2" fillOpacity="0.08" stroke="#00E6D2" strokeWidth="1.5" filter="url(#flank-glow-r)" />
              <polygon points="-28,-8 0,8 0,40 -28,24" fill="#00E6D2" fillOpacity="0.04" stroke="#00E6D2" strokeWidth="1.5" opacity="0.8" />
              <polygon points="0,8 28,-8 28,24 0,40" fill="#00E6D2" fillOpacity="0.05" stroke="#00E6D2" strokeWidth="1.5" opacity="0.9" />
              <circle cx="0" cy="8" r="3" fill="#00FFE5" filter="url(#flank-glow-r)" />
            </motion.g>
          </g>

          {/* Lower Right Isometric Wireframe Diamond */}
          <g transform="translate(140, 420)">
            <motion.g
              animate={{ y: [-8, 8, -8], rotate: [0, -4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <polygon points="0,-20 22,-5 0,10 -22,-5" fill="#00FFE5" fillOpacity="0.06" stroke="#00FFE5" strokeWidth="1.5" />
              <polygon points="-22,-5 0,10 0,35 -22,20" stroke="#00FFE5" strokeWidth="1" opacity="0.6" />
              <polygon points="0,10 22,-5 22,20 0,35" stroke="#00FFE5" strokeWidth="1" opacity="0.7" />
              <circle cx="0" cy="8" r="2.5" fill="#00FFE5" />
            </motion.g>
          </g>
        </svg>
      </div>
    </div>
  );
};

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
    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#00E6D2] selection:text-black relative font-sans">
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
        <AboutHero />

        {/* Existing leadership section follows the new hero. */}
        <div className="about-glass-zone">
        <RoundtableSection />

        {/* 2. STATS BAR (Identical size, length, width, and styling as homepage) */}
        <Stats />
        </div>

        <SectionDivider />

        {/* 3. OUR STORY */}
        <section id="our-story" className="py-20 sm:py-24 lg:py-28 scroll-mt-28 relative overflow-hidden">
          <SideFlanksBackground />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
            <motion.div {...getFadeUp(0)} className="w-full flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-[13px] tracking-widest uppercase font-mono mb-4">
                <WingLogo className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>OUR STORY</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight leading-snug mb-5 text-center">
                Why We Started
              </h2>

              {/* Lead paragraph */}
              <p className="text-gray-200 font-medium text-base sm:text-lg leading-relaxed max-w-[75ch] mx-auto mb-6 text-center">
                Siddiqui Innovations was built around a simple observation: most businesses are still spending hours every day on tasks that no longer need a human doing them manually. Data entry, follow-ups, repetitive replies, scheduling or operating whole tasks on CRMs.
              </p>

              {/* Body paragraphs */}
              <div className="space-y-4 max-w-[75ch] mx-auto text-center">
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  We started this agency to change that. Our goal is to help businesses step confidently into the AI era by automating the repetitive parts of their operations without the cost or complexity of hiring additional staff.
                </p>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Alongside automation, we help businesses build the Advanced websites and marketing presence they need to grow, all under one dedicated and experienced team.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* 4. OUR MISSION */}
        <section id="our-mission" className="py-20 sm:py-24 lg:py-28 scroll-mt-28 relative overflow-hidden">
          <SideFlanksBackground />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
            <motion.div {...getFadeUp(0)} className="w-full flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-[13px] tracking-widest uppercase font-mono mb-4">
                <WingLogo className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>OUR MISSION</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight leading-snug mb-5 text-center">
                What Drives Us
              </h2>

              {/* Lead paragraph */}
              <p className="text-gray-200 font-medium text-base sm:text-lg leading-relaxed max-w-[75ch] mx-auto mb-6 text-center">
                We believe businesses shouldn't have to choose between growing and staying efficient.
              </p>

              {/* Body paragraph */}
              <div className="space-y-4 max-w-[75ch] mx-auto text-center mb-8">
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Our mission is to give businesses access to the same automation, development, and marketing capabilities that larger companies use, delivered in a way that's practical, affordable, and built around how they actually operate.
                </p>
              </div>

              {/* Two key points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-[75ch] mx-auto text-center">
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">Practical &amp; Affordable</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">Solutions that pay for themselves through hours saved and direct revenue.</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">Built for Your Workflow</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">Customized around your exact tools and team, never generic cookie-cutter templates.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* 4. OUR TEAM: A TEAM BUILT ON SPECIALIZATION */}
        <section className="py-20 sm:py-28 bg-[#040608] relative overflow-hidden">
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
