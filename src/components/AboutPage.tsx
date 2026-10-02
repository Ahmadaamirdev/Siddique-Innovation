import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Code2,
  TrendingUp,
  Search,
  Video,
  CheckCircle2,
  Briefcase,
  Clock,
  Globe,
  Award,
} from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CTA } from './CTA';
import { WingLogo } from './WingLogo';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'About Us | Siddiqui Innovations - Helping Businesses Move Into the AI Era';
    return () => {
      document.title = 'Siddiqui Innovations | AI Automation, SEO & Digital Growth';
    };
  }, []);

  const stats = [
    { value: '50+', label: 'Projects Completed', icon: Briefcase },
    { value: '5+', label: 'Years in Business', icon: Clock },
    { value: '60+', label: 'Clients Served', icon: Globe },
    { value: '10+', label: 'Industries Served', icon: Award },
  ];

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
    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#00E6D2] selection:text-black relative overflow-x-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="fixed top-20 left-1/4 w-[650px] h-[400px] bg-radial from-[#00E6D2]/10 via-transparent to-transparent blur-[150px] pointer-events-none -z-0" />
      <div className="fixed bottom-1/3 right-1/4 w-[500px] h-[400px] bg-radial from-[#00FFE5]/5 via-transparent to-transparent blur-[150px] pointer-events-none -z-0" />

      {/* Floating Navbar */}
      <Navbar
        isHeroRevealed={true}
        currentPath="/about"
        onNavigate={onNavigate}
      />

      <main className="pt-28 sm:pt-36 relative z-10">
        {/* 1. HERO SECTION */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center pb-20 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-mono mb-6"
          >
            <WingLogo className="w-5 h-5 shrink-0" />
            <span>ABOUT SIDDIQUI INNOVATIONS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading max-w-2xl mx-auto py-1 mb-5 drop-shadow-md"
          >
            <span className="block">Helping Businesses Move Into the</span>
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]"
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              AI Era
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-300 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed font-sans max-w-lg mx-auto"
          >
            Siddiqui Innovations is a Pakistan-based team helping businesses automate their daily operations, build stronger digital presences and grow without needing to hire for every new task.
          </motion.p>
        </section>

        {/* 2. TRUST BAR: BY THE NUMBERS */}
        <section className="border-y border-white/10 bg-[#080B10]/80 backdrop-blur-xl py-10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center text-center ${
                      idx > 1 ? 'pt-6 md:pt-0' : ''
                    } px-4`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#00E6D2]/10 border border-[#00E6D2]/20 flex items-center justify-center mb-3 text-[#00E6D2]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-400 font-sans tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. OUR STORY & OUR MISSION */}
        <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Our Story Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0A0E14] to-[#06080C] border border-white/10 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E6D2]/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-mono mb-6">
                  <WingLogo className="w-5 h-5 shrink-0" />
                  <span>OUR STORY</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight mb-6">
                  Why We Started
                </h2>

                <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Siddiqui Innovations was built around a simple observation: most businesses are still spending hours every day on tasks that no longer need a human doing them manually. Data entry, follow-ups, repetitive replies, scheduling or operating whole tasks on CRMs.
                  </p>
                  <p>
                    We started this agency to change that. Our goal is to help businesses step confidently into the AI era by automating the repetitive parts of their operations without the cost or complexity of hiring additional staff.
                  </p>
                  <p>
                    Alongside automation, we help businesses build the Advanced websites and marketing presence they need to grow, all under one dedicated and experienced team.
                  </p>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 flex items-center gap-3 text-xs text-[#00E6D2] font-semibold tracking-wider uppercase font-heading">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Busywork. Maximum Scalability.</span>
              </div>
            </motion.div>

            {/* Our Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0A0E14] to-[#06080C] border border-[#00E6D2]/20 relative overflow-hidden flex flex-col justify-between shadow-[0_0_40px_rgba(0,230,210,0.05)]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FFE5]/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-mono mb-6">
                  <WingLogo className="w-5 h-5 shrink-0" />
                  <span>OUR MISSION</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight mb-6">
                  What Drives Us
                </h2>

                <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    We believe businesses shouldn't have to choose between growing and staying efficient.
                  </p>
                  <p>
                    Our mission is to give businesses access to the same automation, development, and marketing capabilities that larger companies use, delivered in a way that's practical, affordable, and built around how they actually operate.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="text-sm font-bold text-white mb-1">Practical &amp; Affordable</div>
                    <div className="text-xs text-gray-400">Solutions that pay for themselves through hours saved and direct revenue.</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="text-sm font-bold text-white mb-1">Built for Your Workflow</div>
                    <div className="text-xs text-gray-400">Customized around your exact tools and team, never generic cookie-cutter templates.</div>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 flex items-center gap-3 text-xs text-[#00FFE5] font-semibold tracking-wider uppercase font-heading">
                <CheckCircle2 className="w-4 h-4" />
                <span>Empowering Global Growth From Pakistan</span>
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
                    viewport={{ once: true }}
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
