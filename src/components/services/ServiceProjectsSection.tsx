import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { WingLogo } from '@/components/ui/WingLogo';
import type { ServiceProjectItem } from '@/data/serviceProjectsAndTestimonials';

interface ServiceProjectsSectionProps {
  serviceName: string;
  projects: ServiceProjectItem[];
  subheading?: string;
  onNavigateToProjects?: () => void;
  onNavigate?: (path: string) => void;
}

export const ServiceProjectsSection: React.FC<ServiceProjectsSectionProps> = ({
  serviceName,
  projects,
  subheading = 'A curated showcase of high-impact implementations and proven client deliverables.',
  onNavigateToProjects,
  onNavigate,
}) => {
  const headingText = `${serviceName} Projects`;

  return (
    <section id="service-projects" className="py-14 sm:py-20 bg-[#050505] relative z-10 border-b border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-radial from-[#00E6D2]/10 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[300px] bg-radial from-[#00FFE5]/5 via-transparent to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            {headingText}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans"
          >
            {subheading}
          </motion.p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group relative bg-[#0B0E13]/90 backdrop-blur-xl border border-white/10 hover:border-[#00E6D2]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_35px_rgba(0,230,210,0.15)] flex flex-col justify-between h-full transform-gpu will-change-transform">
                  {/* Image Preview Container */}
                  <div className="relative overflow-hidden border-b border-white/10 group-hover:opacity-95 transition-opacity">
                    <div className="transform group-hover:scale-105 transition-transform duration-500 ease-out">
                      {project.renderPreview()}
                    </div>
                  </div>

                  {/* Card Meta Footer */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00E6D2] transition-colors leading-snug font-heading">
                        {project.title}
                      </h3>
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
                        onClick={() => {
                          const targetUrl = `/projects#${project.id}`;
                          if (onNavigate) {
                            onNavigate(targetUrl);
                          } else if (onNavigateToProjects) {
                            window.location.hash = project.id;
                            onNavigateToProjects();
                          } else {
                            window.location.href = targetUrl;
                          }
                        }}
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
        </div>

        {/* Optional See All Projects Action */}
        {onNavigateToProjects && (
          <div className="mt-12 text-center">
            <button
              onClick={onNavigateToProjects}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#00E6D2]/50 hover:bg-[#00E6D2]/10 text-white hover:text-[#00E6D2] text-xs font-semibold tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0,230,210,0.05)]"
            >
              <span>Explore All Innovations</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
