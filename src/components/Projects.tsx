import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Terminal } from 'lucide-react';
import { WingLogo } from './WingLogo';
import { featuredProjects } from './projectsData';

interface ProjectsProps {
  onNavigateToProjects?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onNavigateToProjects }) => {
  const handleSeeMore = (e: React.MouseEvent) => {
    if (onNavigateToProjects) {
      e.preventDefault();
      onNavigateToProjects();
    }
  };

  return (
    <section id="projects" className="py-14 sm:py-20 bg-[#050505] relative z-10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 text-[#00E6D2] font-semibold text-xs md:text-sm tracking-wider uppercase font-mono"
          >
            <WingLogo className="w-5 h-5 shrink-0" />
            <span>PORTFOLIO</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading"
          >
            Featured Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans"
          >
            A curated selection of our high-converting web solutions and digital enterprise platforms.
          </motion.p>
        </div>

        {/* Project Cards Grid (Only 3 Projects) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => {
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
                viewport={{ once: false }}
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
        </div>

        {/* See More Projects Button at End of Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <motion.a
            whileHover={{ y: -3, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="/projects"
            onClick={handleSeeMore}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_15px_rgba(0,230,210,0.25)] hover:shadow-[0_0_22px_rgba(0,230,210,0.4)] transition-all duration-300 font-heading cursor-pointer"
          >
            <span>See More Projects</span>
            <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};
