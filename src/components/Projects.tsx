import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Terminal, Bot, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { WingLogo } from './WingLogo';
import dwatsonFurnitureImg from '../assets/dwatson_furniture.png';

interface ProjectItem {
  id: string;
  title: string;
  tags: string[];
  link?: string;
  isGithub?: boolean;
  renderPreview: () => React.ReactNode;
}

export const Projects: React.FC = () => {
  const projectsList: ProjectItem[] = [
    {
      id: 'd-watson-shop',
      title: 'D.Watson Home & Furniture',
      tags: ['WooCommerce', 'Furniture & Decor', 'E-Commerce', 'UI/UX'],
      link: 'https://dewatsonshop.com',
      renderPreview: () => (
        <div className="w-full h-48 sm:h-56 bg-[#120F0D] text-white p-4 flex flex-col justify-between overflow-hidden relative font-sans">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-2 z-10">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-amber-500 rounded-sm" />
              <span className="font-extrabold tracking-wider text-xs text-amber-300 font-serif">D.WATSON FURNITURE</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-amber-200/80 font-medium">
              <span>Living</span>
              <span>Bedroom</span>
              <span>Dining</span>
              <span>Decor</span>
            </div>
          </div>
          {/* Hero Content */}
          <div className="my-auto space-y-1.5 z-10 w-3/5">
            <span className="text-[9px] uppercase tracking-widest text-amber-400 font-semibold">Luxury Home & Furniture E-Store</span>
            <h4 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
              Modern Living & <br /> Crafted Interiors
            </h4>
            <div className="pt-1">
              <span className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[9px] font-bold px-2.5 py-1 rounded shadow">
                Explore Catalogue
              </span>
            </div>
          </div>
          {/* Luxury Furniture Background Image */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center opacity-75 -z-0 border-l border-amber-500/20" style={{ backgroundImage: `url(${dwatsonFurnitureImg})` }} />
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-28 h-28 bg-amber-500/15 blur-xl rounded-full pointer-events-none" />
        </div>
      ),
    },
    {
      id: 'nawaz-group',
      title: 'Nawaz Group of Companies',
      tags: ['WordPress', 'Corporate', 'Enterprise', 'Development'],
      link: 'https://nawazgroupofcompanies.com',
      renderPreview: () => (
        <div className="w-full h-48 sm:h-56 bg-[#0A111E] text-white p-4 flex flex-col justify-between overflow-hidden relative font-sans">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-blue-500/20 pb-2 z-10">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" />
              <span className="font-bold tracking-wider text-xs text-blue-200">NAWAZ GROUP</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-gray-300">
              <span>Sectors</span>
              <span>Portfolio</span>
              <span>Leadership</span>
              <span>Contact</span>
            </div>
          </div>
          {/* Hero Content */}
          <div className="my-auto space-y-2 z-10 w-3/5">
            <span className="text-[9px] uppercase tracking-widest text-blue-400 font-mono">Multinational Enterprise</span>
            <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
              Building Sustainable <br /> Industry Futures
            </h4>
            <div className="pt-1">
              <span className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-[9px] font-semibold px-2.5 py-1 rounded shadow">
                Discover Group
              </span>
            </div>
          </div>
          {/* Corporate Image Background */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center opacity-50 -z-0 border-l border-blue-500/20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80')` }} />
          <div className="absolute left-1/4 bottom-0 w-32 h-32 bg-blue-600/15 blur-2xl rounded-full pointer-events-none" />
        </div>
      ),
    },
    {
      id: 'rumanza-view-villas',
      title: 'Rumanza View Villas',
      tags: ['WordPress', 'Luxury Villas', 'DHA Multan', 'Real Estate'],
      link: 'https://rumanzaviewvillas.com',
      renderPreview: () => (
        <div className="w-full h-48 sm:h-56 bg-[#0B1512] text-white p-4 flex flex-col justify-between overflow-hidden relative font-sans">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2 z-10">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="font-bold tracking-wider text-xs text-emerald-300">RUMANZA VIEW</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-emerald-200/80">
              <span>Overview</span>
              <span>Floor Plans</span>
              <span>Amenities</span>
              <span>Booking</span>
            </div>
          </div>
          {/* Hero Content */}
          <div className="my-auto space-y-1.5 z-10 w-3/5">
            <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-mono">DHA Multan Golf Community</span>
            <h4 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
              Luxury Golf-Front <br /> Smart Villas
            </h4>
            <div className="pt-1">
              <span className="inline-block bg-emerald-500 text-black text-[9px] font-bold px-2.5 py-1 rounded shadow">
                Book a Villa
              </span>
            </div>
          </div>
          {/* Villa Image Background */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center opacity-60 -z-0 border-l border-emerald-500/20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80')` }} />
          <div className="absolute right-1/4 top-1/3 w-32 h-32 bg-emerald-500/15 blur-2xl rounded-full pointer-events-none" />
        </div>
      ),
    },
    {
      id: 'phantom-chatbot',
      title: "Phantom's Workspace – AI Chatbot",
      tags: ['AI Chatbot', 'Conversational AI', 'Web Integration', 'UI/UX'],
      link: 'https://www.phantomsworkspace.com/',
      renderPreview: () => (
        <div className="w-full h-48 sm:h-56 bg-[#0D0819] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-2 z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="font-bold text-xs tracking-wide text-purple-300">PHANTOM WORKSPACE</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] bg-purple-900/40 border border-purple-500/30 px-2 py-0.5 rounded-full text-purple-200">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>AI Chatbot Active</span>
            </div>
          </div>
          {/* Chat Messages Simulation */}
          <div className="my-auto space-y-2.5 z-10 py-1">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-purple-600/30 border border-purple-400/30 rounded-2xl rounded-tr-none px-3 py-1.5 text-[10px] text-purple-100 max-w-[85%]">
                How can Phantom Workspace automate customer support?
              </div>
            </div>
            {/* Bot Message */}
            <div className="flex items-start gap-2 max-w-[90%]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shrink-0 shadow-sm shadow-purple-500/50">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-white/5 border border-purple-500/30 rounded-2xl rounded-tl-none p-2 text-[10px] text-purple-200 leading-snug">
                I handle 24/7 lead inquiries, automate workflow tickets, and route instant responses! 🚀
              </div>
            </div>
          </div>
          {/* Bottom Tags bar */}
          <div className="flex items-center gap-2 z-10 pt-1 font-mono text-[9px] text-purple-300/80">
            <span className="bg-purple-950/80 border border-purple-800/40 px-2 py-0.5 rounded">NLP Engine</span>
            <span className="bg-purple-950/80 border border-purple-800/40 px-2 py-0.5 rounded">24/7 Support</span>
            <span className="bg-purple-950/80 border border-purple-800/40 px-2 py-0.5 rounded">CRM Sync</span>
          </div>
          {/* Glow backdrop */}
          <div className="absolute right-0 top-1/3 w-36 h-36 bg-purple-600/15 blur-2xl rounded-full pointer-events-none" />
        </div>
      ),
    },
    {
      id: 'swot-cold-outreach',
      title: 'Lead Gen & SWOT Cold Outreach Automation',
      tags: ['Python', 'AI Lead Gen', 'SWOT Analysis', 'Outreach'],
      link: 'https://github.com/alimusa2/Lead-Generation-SWOT-Analysis-Cold-Outreach-Automation',
      isGithub: true,
      renderPreview: () => (
        <div className="w-full h-48 sm:h-56 bg-[#070D18] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00E6D2] animate-pulse" />
              <span className="font-mono font-bold text-xs text-[#00E6D2]">LEAD_GEN_BOT v2.4</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded text-cyan-300 font-mono">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span>Python Bot</span>
            </div>
          </div>
          {/* Body Content */}
          <div className="my-auto grid grid-cols-5 gap-2 items-center z-10 py-1">
            {/* Log Stream */}
            <div className="col-span-3 space-y-1.5 font-mono text-[9px]">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle2 className="w-3 h-3 text-[#00E6D2] shrink-0" />
                <span className="truncate">Scraped 500+ Qualified Leads</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-300">
                <Zap className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">AI SWOT Matrix Generated</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="truncate">Cold Email Sequence Sent</span>
              </div>
            </div>
            {/* Visual SWOT Grid Badge */}
            <div className="col-span-2 bg-cyan-950/40 border border-cyan-500/30 rounded-lg p-1.5 grid grid-cols-2 gap-1 text-center font-mono text-[8px]">
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-1 rounded text-emerald-300">
                <span className="font-bold block">S</span>Strengths
              </div>
              <div className="bg-amber-950/60 border border-amber-500/40 p-1 rounded text-amber-300">
                <span className="font-bold block">W</span>Weakness
              </div>
              <div className="bg-cyan-950/60 border border-cyan-500/40 p-1 rounded text-cyan-300">
                <span className="font-bold block">O</span>Opps
              </div>
              <div className="bg-rose-950/60 border border-rose-500/40 p-1 rounded text-rose-300">
                <span className="font-bold block">T</span>Threats
              </div>
            </div>
          </div>
          {/* Footer Metrics */}
          <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-cyan-400/90 border-t border-cyan-900/40">
            <span>Lead Scraping + AI SWOT</span>
            <span className="text-[#00E6D2] font-semibold">100% Automated</span>
          </div>
          {/* Cyber BG Glow */}
          <div className="absolute left-1/4 bottom-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />
        </div>
      ),
    },
    {
      id: 'ai-hr-assistance',
      title: 'AI HR Assistance Automation',
      tags: ['Python', 'AI HR Agent', 'ATS Automation', 'Workflow'],
      link: 'https://github.com/Ahmadaamirdev/AI-HR-Assistance-Automation',
      isGithub: true,
      renderPreview: () => (
        <div className="w-full h-48 sm:h-56 bg-[#061214] text-white p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden relative font-sans border-b border-emerald-500/20">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2 z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono font-bold text-xs text-emerald-300">HR_AUTOMATION_BOT v1.8</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded text-emerald-300 font-mono">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span>Python Bot</span>
            </div>
          </div>
          {/* Body Content */}
          <div className="my-auto space-y-2 z-10 py-1 font-mono text-[9.5px]">
            <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 p-1.5 rounded">
              <span className="text-emerald-200">Resume Screening & Match</span>
              <span className="text-emerald-400 font-bold">96% Accuracy</span>
            </div>
            <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 p-1.5 rounded">
              <span className="text-teal-200">Interview Scheduling Bot</span>
              <span className="text-teal-400 font-bold">Automated</span>
            </div>
            <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 p-1.5 rounded">
              <span className="text-cyan-200">Candidate Onboarding</span>
              <span className="text-cyan-400 font-bold">Workflow Active</span>
            </div>
          </div>
          {/* Footer Metrics */}
          <div className="flex items-center justify-between z-10 pt-1 font-mono text-[9px] text-emerald-400/90 border-t border-emerald-900/40">
            <span>ATS + Candidate AI Agent</span>
            <span className="text-emerald-300 font-semibold">Zero Friction</span>
          </div>
          {/* Emerald BG Glow */}
          <div className="absolute right-1/4 bottom-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none" />
        </div>
      ),
    },
  ];

  return (
    <section id="projects" className="pt-8 pb-6 md:pt-12 md:pb-8 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Bar */}
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase">
              <WingLogo className="w-5 h-5 shrink-0 drop-shadow-[0_0_8px_#00E6D2]" />
              <span>FEATURED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Recent Projects
            </h2>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            href="#projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00E6D2] hover:text-[#00FFE5] transition-colors group"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => {
            const CardWrapper = project.link ? 'a' : 'div';
            const wrapperProps = project.link
              ? {
                  href: project.link,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }
              : {};

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CardWrapper
                  {...wrapperProps}
                  className="group relative bg-[#0B0E13]/90 backdrop-blur-xl border border-white/10 hover:border-[#00E6D2]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_35px_rgba(0,230,210,0.15)] flex flex-col justify-between h-full block transform-gpu will-change-transform"
                >
                  {/* Image Preview Container */}
                  <div className="relative overflow-hidden border-b border-white/10 group-hover:opacity-95 transition-opacity">
                    <div className="transform group-hover:scale-105 transition-transform duration-500 ease-out">
                      {project.renderPreview()}
                    </div>
                  </div>

                  {/* Card Meta Footer */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-[#00E6D2] transition-colors leading-snug">
                          {project.title}
                        </h3>
                        {project.link && (
                          <span className="p-1.5 rounded-lg bg-white/5 group-hover:bg-[#00E6D2] group-hover:text-black text-gray-300 transition-all border border-white/10 shrink-0">
                            {project.isGithub ? <Terminal className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium text-gray-300 bg-white/5 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

