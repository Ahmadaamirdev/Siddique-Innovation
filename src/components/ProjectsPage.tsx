import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ExternalLink, Terminal, Sparkles, Filter, Code2, Cpu } from 'lucide-react';
import { allProjects } from './projectsData';
import brandLogo from '../assets/brand_logo.png';
import { Footer } from './Footer';

interface ProjectsPageProps {
  onBackToHome?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBackToHome }) => {
  const [filter, setFilter] = useState<'all' | 'web' | 'ai'>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Projects & Case Studies | Siddiqui Innovations';
    return () => {
      document.title = 'Siddiqui Innovations | AI Automation, SEO & Digital Growth';
    };
  }, []);

  const filteredProjects = allProjects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const handleBack = (e: React.MouseEvent) => {
    if (onBackToHome) {
      e.preventDefault();
      onBackToHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00E6D2] selection:text-black relative overflow-x-hidden">
      {/* Background Glow Orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[400px] bg-radial from-[#00E6D2]/10 via-transparent to-transparent blur-[140px] pointer-events-none -z-0" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[400px] bg-radial from-[#00FFE5]/5 via-transparent to-transparent blur-[140px] pointer-events-none -z-0" />

      {/* Top Floating Header */}
      <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
        <a
          href="/"
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1218]/90 border border-white/10 hover:border-[#00E6D2]/50 backdrop-blur-xl text-xs sm:text-sm font-semibold text-gray-200 hover:text-[#00E6D2] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#00E6D2] transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </a>

        <a href="/" onClick={handleBack} className="block cursor-pointer">
          <img
            src={brandLogo}
            alt="Siddiqui Innovations"
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,230,210,0.4)]"
          />
        </a>

        <a
          href="/#contact"
          onClick={(e) => {
            if (onBackToHome) {
              e.preventDefault();
              onBackToHome();
              setTimeout(() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }}
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] font-bold text-xs hover:shadow-[0_0_20px_rgba(0,230,210,0.5)] transition-all duration-300 cursor-pointer"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </header>

      {/* Main Content Area */}
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* Page Hero Intro */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/30 text-[#00FFE5] text-xs font-semibold tracking-wider uppercase font-mono shadow-[0_0_15px_rgba(0,230,210,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00E6D2]" />
            <span>PORTFOLIO & CASE STUDIES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight"
          >
            All Work &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_25px_rgba(0,230,210,0.4)]">
              Innovations
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans"
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
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
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
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                filter === 'web'
                  ? 'bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] shadow-[0_0_15px_rgba(0,230,210,0.4)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Web Development (3)</span>
            </button>

            <button
              onClick={() => setFilter('ai')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                filter === 'ai'
                  ? 'bg-gradient-to-r from-[#00FFE5] to-[#00E6D2] text-[#050505] shadow-[0_0_15px_rgba(0,230,210,0.4)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AI Automation (3)</span>
            </button>
          </motion.div>
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
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
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
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
                          <h3 className="text-lg font-bold text-white group-hover:text-[#00E6D2] transition-colors leading-snug font-heading">
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
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
