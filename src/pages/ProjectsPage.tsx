import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Filter, Code2, Cpu } from 'lucide-react';
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

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBackToHome, onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'web' | 'ai'>('all');
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
        // Ensure the project is visible by setting filter to 'all' if category doesn't match
        if (targetProject.category !== 'web' && targetProject.category !== 'ai') {
          setFilter('all');
        }

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

  const filteredProjects = allProjects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

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

  const webCount = allProjects.filter((p) => p.category === 'web').length;
  const aiCount = allProjects.filter((p) => p.category === 'ai').length;

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
            From bespoke high-converting digital storefronts and corporate enterprises to intelligent autonomous AI workflows and custom Python bots.
          </motion.p>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 pt-4 flex-wrap"
          >
            <button
              onClick={() => setFilter('all')}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] shadow-[0_0_15px_rgba(0,230,210,0.4)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>All Projects ({allProjects.length})</span>
            </button>

            <button
              onClick={() => setFilter('web')}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                filter === 'web'
                  ? 'bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] shadow-[0_0_15px_rgba(0,230,210,0.4)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Web Development ({webCount})</span>
            </button>

            <button
              onClick={() => setFilter('ai')}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                filter === 'ai'
                  ? 'bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] shadow-[0_0_15px_rgba(0,230,210,0.4)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AI Automation ({aiCount})</span>
            </button>
          </motion.div>
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              return (
                <motion.div
                  key={project.id}
                  id={project.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div
                    className={`group relative bg-[#0B0E13]/90 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 flex flex-col sm:flex-row justify-between h-full transform-gpu will-change-transform ${
                      highlightedProjectId === project.id
                        ? 'border-2 border-[#00FFE5] ring-4 ring-[#00FFE5]/35 shadow-[0_0_35px_rgba(0,255,229,0.5)] scale-[1.01]'
                        : 'border border-white/10 hover:border-[#00E6D2]/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_35px_rgba(0,230,210,0.15)]'
                    }`}
                  >
                    {/* Image Preview Container - Left */}
                    <div className="w-full sm:w-[44%] md:w-[42%] lg:w-[44%] xl:w-[42%] shrink-0 relative overflow-hidden border-b sm:border-b-0 sm:border-r border-white/10 group-hover:opacity-95 transition-opacity bg-[#080B10] flex flex-col justify-center">
                      <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out flex flex-col [&>div]:h-full [&>div]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:object-top">
                        {project.renderPreview()}
                      </div>
                    </div>

                    {/* Card Meta & Content - Right */}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 min-w-0 gap-4">
                      <div className="space-y-2.5">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00E6D2] transition-colors leading-snug font-heading">
                          {project.title}
                        </h3>

                        {project.description && (
                          <p className="text-gray-300 text-xs sm:text-[13px] leading-relaxed line-clamp-3 sm:line-clamp-4 font-sans">
                            {project.description}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons: View Project & View Details */}
                      <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-white/10 mt-auto">
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#00E6D2] to-[#00FFE5] text-black font-semibold text-xs font-mono tracking-wide hover:shadow-[0_0_15px_rgba(0,230,210,0.4)] hover:brightness-105 transition-all text-center cursor-pointer"
                          >
                            <span>View Project</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 text-gray-500 font-semibold text-xs font-mono tracking-wide cursor-not-allowed text-center border border-white/5"
                          >
                            <span>View Project</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white hover:text-[#00E6D2] border border-white/10 hover:border-[#00E6D2]/50 font-semibold text-xs font-mono tracking-wide transition-all text-center cursor-pointer"
                        >
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
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
