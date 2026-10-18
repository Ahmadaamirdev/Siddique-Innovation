import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Filter,
  Code2,
  Cpu,
  TrendingUp,
  Search,
  Play,
} from 'lucide-react';
import { allProjects } from '@/data/projectsData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CTA } from '@/components/sections/CTA';
import { WingLogo } from '@/components/ui/WingLogo';
import { ProjectDetailsModal, type ProjectModalData } from '@/components/ui/ProjectDetailsModal';

interface ProjectsPageProps {
  onBackToHome?: () => void;
  onNavigate?: (path: string) => void;
}

interface ProjectSectionConfig {
  id: string;
  categoryKey: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROJECT_SECTIONS: ProjectSectionConfig[] = [
  {
    id: 'ai-projects',
    categoryKey: 'ai',
    badge: 'AI PROJECTS & AUTOMATION',
    title: 'AI Automation & Intelligent Agents',
    description:
      'Autonomous voice calling agents, lead discovery scrapers, and automated business workflows powered by modern LLM engines.',
    icon: Cpu,
  },
  {
    id: 'web-projects',
    categoryKey: 'web',
    badge: 'WEB DEVELOPMENT & PLATFORMS',
    title: 'Web & Digital Platforms',
    description:
      'Bespoke digital storefronts, corporate enterprise portals, and 3D interactive web experiences built for scale.',
    icon: Code2,
  },
  {
    id: 'marketing-projects',
    categoryKey: 'marketing',
    badge: 'DIGITAL MARKETING & SCALE',
    title: 'Digital Marketing & Growth Systems',
    description:
      'High-ROAS paid acquisition, multi-channel SaaS inbound funnels, and automated retention email and SMS flows.',
    icon: TrendingUp,
  },
  {
    id: 'seo-projects',
    categoryKey: 'seo',
    badge: 'SEARCH ENGINE OPTIMIZATION',
    title: 'SEO & Search Dominance',
    description:
      'Enterprise technical search architecture, global programmatic keyword clusters, and local 3-pack accelerators.',
    icon: Search,
  },
  {
    id: 'youtube-projects',
    categoryKey: 'youtube',
    badge: 'YOUTUBE & VIDEO AUTOMATION',
    title: 'YouTube & Video Automation',
    description:
      'End-to-end automated YouTube channels, viral 4K documentary synthesis pipelines, and high-retention media factories.',
    icon: Play,
  },
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBackToHome, onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'ai' | 'web' | 'marketing' | 'seo' | 'youtube'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectModalData | null>(null);
  const [highlightedProjectId, setHighlightedProjectId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Projects & Case Studies | Siddiqui Innovations';

    const handleTargetScroll = () => {
      const hash = window.location.hash.replace(/^#/, '');
      const searchParams = new URLSearchParams(window.location.search);
      const targetId = hash || searchParams.get('project');

      if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      const targetProject = allProjects.find((p) => p.id === targetId);
      if (targetProject) {
        // Ensure the section is visible
        setFilter((prev) => {
          if (prev !== 'all' && prev !== targetProject.category) {
            return 'all';
          }
          return prev;
        });

        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            if ((window as any).__lenis) {
              try {
                (window as any).__lenis.scrollTo(el, { offset: -110, duration: 1.2 });
              } catch {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            } else {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setHighlightedProjectId(targetId);
            setTimeout(() => setHighlightedProjectId(null), 3500);
          }
        }, 220);
      }
    };

    handleTargetScroll();
    window.addEventListener('hashchange', handleTargetScroll);
    return () => {
      window.removeEventListener('hashchange', handleTargetScroll);
      document.title = 'Siddiqui Innovations | AI Automation, SEO & Digital Growth';
    };
  }, []);

  const handleNav = (path: string) => {
    if (path === '/' && onBackToHome) {
      onBackToHome();
    } else if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const sectionCounts = {
    ai: allProjects.filter((p) => p.category === 'ai').length,
    web: allProjects.filter((p) => p.category === 'web').length,
    marketing: allProjects.filter((p) => p.category === 'marketing').length,
    seo: allProjects.filter((p) => p.category === 'seo').length,
    youtube: allProjects.filter((p) => p.category === 'youtube').length,
  };

  const visibleSections = PROJECT_SECTIONS.filter((section) => {
    if (filter === 'all') return true;
    return section.categoryKey === filter;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00E6D2] selection:text-black relative">
      {/* Background Glow Orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[400px] bg-radial from-[#00E6D2]/10 via-transparent to-transparent blur-[140px] pointer-events-none -z-0" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[400px] bg-radial from-[#00FFE5]/5 via-transparent to-transparent blur-[140px] pointer-events-none -z-0" />

      {/* Floating Navbar synced with all pages */}
      <Navbar
        isHeroRevealed={true}
        currentPath="/projects"
        onNavigate={handleNav}
      />

      {/* Main Content Area */}
      <main className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* Page Hero Intro */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-mono"
          >
            <WingLogo className="w-5 h-5 shrink-0" />
            <span>PORTFOLIO &amp; CASE STUDIES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading max-w-2xl mx-auto py-1 drop-shadow-md"
          >
            <span className="block">All Work &amp;</span>
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6]"
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              Innovations
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-xs sm:text-sm lg:text-[15px] max-w-lg mx-auto font-normal leading-relaxed font-sans"
          >
            Explore our curated sections spanning autonomous AI systems, high-converting web platforms, search optimization, and growth engineering.
          </motion.p>

          {/* Filter / Section Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 pt-4 flex-wrap"
          >
            <button
              onClick={() => setFilter('all')}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] shadow-[0_0_15px_rgba(0,230,210,0.4)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>All Projects ({allProjects.length})</span>
            </button>

            <button
              onClick={() => setFilter('ai')}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                filter === 'ai'
                  ? 'bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] shadow-[0_0_15px_rgba(0,230,210,0.4)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AI Projects ({sectionCounts.ai})</span>
            </button>

            <button
              onClick={() => setFilter('web')}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                filter === 'web'
                  ? 'bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] shadow-[0_0_15px_rgba(0,230,210,0.4)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Web Projects ({sectionCounts.web})</span>
            </button>

            <button
              onClick={() => setFilter('marketing')}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                filter === 'marketing'
                  ? 'bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] shadow-[0_0_15px_rgba(0,230,210,0.4)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Marketing ({sectionCounts.marketing})</span>
            </button>

            <button
              onClick={() => setFilter('seo')}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                filter === 'seo'
                  ? 'bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] shadow-[0_0_15px_rgba(0,230,210,0.4)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>SEO ({sectionCounts.seo})</span>
            </button>

            <button
              onClick={() => setFilter('youtube')}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                filter === 'youtube'
                  ? 'bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] shadow-[0_0_15px_rgba(0,230,210,0.4)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>YouTube ({sectionCounts.youtube})</span>
            </button>
          </motion.div>
        </div>

        {/* Project Sections with 2 Large Projects per Screen */}
        <div className="space-y-20">
          {visibleSections.map((section) => {
            const sectionProjects = allProjects.filter(
              (p) => p.category === section.categoryKey
            );
            if (sectionProjects.length === 0) return null;
            const SectionIcon = section.icon;

            return (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                {/* Section Header (Centered in middle, no description) */}
                <div className="mb-8 border-b border-white/10 pb-5 text-center flex flex-col items-center justify-center">
                  <div className="inline-flex items-center gap-2 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-mono mb-2">
                    <SectionIcon className="w-4 h-4 text-[#00E6D2] shrink-0" />
                    <span>{section.badge}</span>
                    <span className="text-gray-500 font-mono text-xs">({sectionProjects.length})</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-white font-heading tracking-tight">
                    {section.title}
                  </h2>
                </div>

                {/* 2 Projects Per Screen Grid (Enlarged Cards, Perfectly Proportioned & Aligned) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
                  {sectionProjects.map((project, index) => {
                    const isHighlighted = highlightedProjectId === project.id;

                    return (
                      <motion.div
                        key={project.id}
                        id={project.id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: index * 0.08 }}
                        className="h-full w-full min-w-0"
                      >
                        <div
                          className={`group relative w-full min-w-0 bg-[#0B0E13]/90 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-full transform-gpu will-change-transform ${
                            isHighlighted
                              ? 'border-2 border-[#00FFE5] ring-4 ring-[#00FFE5]/35 shadow-[0_0_35px_rgba(0,255,229,0.5)]'
                              : 'border border-white/10 hover:border-[#00E6D2]/40 shadow-[0_12px_36px_rgba(0,0,0,0.6)] hover:shadow-[0_18px_45px_rgba(0,230,210,0.18)]'
                          }`}
                        >
                          {/* Large Image Preview Container - Full Card Width on Top (Exact matching aspect-video) */}
                          <div className="w-full aspect-video relative overflow-hidden border-b border-white/10 bg-[#080B10] shrink-0">
                            <div className="w-full h-full flex flex-col [&>div]:w-full [&>div]:h-full [&>div]:aspect-video [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:object-top">
                              {project.renderPreview()}
                            </div>
                          </div>

                          {/* Card Content & Meta - Increased Size & Level-Aligned */}
                          <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 min-w-0 gap-4">
                            <div className="space-y-3">
                              {/* Title - Aligned starting level & consistent height */}
                              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00E6D2] transition-colors leading-snug font-heading min-h-[3.5rem] flex items-start">
                                {project.title}
                              </h3>

                              {/* Description - Level aligned across both sides */}
                              {project.description && (
                                <p className="text-gray-300 text-sm sm:text-[15px] leading-relaxed font-sans line-clamp-3 min-h-[4.5rem]">
                                  {project.description}
                                </p>
                              )}
                            </div>

                            {/* Action Buttons: View Project & View Details */}
                            <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/10 mt-auto">
                              {project.link ? (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#00E6D2] to-[#00FFE5] text-black font-semibold text-xs sm:text-sm font-mono tracking-wide hover:shadow-[0_0_18px_rgba(0,230,210,0.4)] hover:brightness-105 transition-all text-center cursor-pointer"
                                >
                                  <span>View Project</span>
                                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                </a>
                              ) : (
                                <button
                                  type="button"
                                  disabled
                                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-gray-500 font-semibold text-xs sm:text-sm font-mono tracking-wide cursor-not-allowed text-center border border-white/5"
                                >
                                  <span>View Project</span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => setSelectedProject(project)}
                                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white hover:text-[#00E6D2] border border-white/10 hover:border-[#00E6D2]/50 font-semibold text-xs sm:text-sm font-mono tracking-wide transition-all text-center cursor-pointer"
                              >
                                <span>View Details</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <CTA />

      <Footer onNavigate={onNavigate} />

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
