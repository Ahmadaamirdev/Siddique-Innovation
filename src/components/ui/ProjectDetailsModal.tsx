import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { WingLogo } from '@/components/ui/WingLogo';

export interface ProjectWorkflowStep {
  step: string;
  title: string;
  desc: string;
}

export interface ProjectModalData {
  id: string;
  title: string;
  category?: string;
  tags: string[];
  link?: string;
  isGithub?: boolean;
  isYoutube?: boolean;
  description?: string;
  detailedDescription?: string;
  workflow?: ProjectWorkflowStep[];
  features?: string[];
  renderPreview: () => React.ReactNode;
}

interface ProjectDetailsModalProps {
  project: ProjectModalData | null;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  onNavigate,
}) => {
  // Lock body & Lenis smooth scroll while modal is active
  useEffect(() => {
    if (!project) return;

    const lenis = (window as any).__lenis;
    lenis?.stop();
    document.documentElement.classList.add('lenis-stopped');

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.documentElement.classList.remove('lenis-stopped');
      window.removeEventListener('keydown', handleKeyDown);
      lenis?.start();
    };
  }, [project, onClose]);

  if (!project) return null;

  const categoryLabel =
    project.category === 'web'
      ? 'Web Development'
      : project.category === 'ai'
      ? 'AI Automation'
      : project.category
      ? project.category.charAt(0).toUpperCase() + project.category.slice(1)
      : 'Engineering Deliverable';

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity cursor-pointer"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          data-lenis-prevent
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] bg-[#0A0D13] border border-white/15 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,230,210,0.12)] flex flex-col z-10 overflow-hidden"
        >
          {/* Header Bar (Pinned) */}
          <div className="shrink-0 flex items-center justify-between px-5 py-4 bg-[#0A0D13] border-b border-white/10 z-20">
            <div className="flex items-center gap-2.5">
              <WingLogo className="w-4 h-4 text-[#00E6D2] shrink-0" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#00E6D2] font-semibold">
                {categoryLabel}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close details"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition border border-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar"
            style={{ WebkitOverflowScrolling: 'touch' }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Project Preview */}
            <div className="relative overflow-hidden border-b border-white/10 bg-[#080B10]">
              {project.renderPreview()}
            </div>

            {/* Details Content - Simple, clear, human description without AI slop */}
            <div className="p-5 sm:p-7 space-y-4">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-tight">
                  {project.title}
                </h2>
                <div className="text-gray-300 text-sm sm:text-[15px] leading-relaxed font-sans space-y-3 whitespace-pre-line">
                  {project.detailedDescription || project.description}
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer (Pinned) */}
          <div className="shrink-0 p-4 sm:p-5 bg-[#0A0D13] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 z-20">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-mono font-medium transition cursor-pointer"
            >
              Close
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              {onNavigate && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('/contact');
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00E6D2]/50 text-white hover:text-[#00E6D2] text-xs font-mono font-semibold transition cursor-pointer"
                >
                  Inquire Similar
                </button>
              )}

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E6D2] to-[#00FFE5] text-black text-xs font-mono font-bold shadow-[0_0_20px_rgba(0,230,210,0.35)] hover:brightness-110 transition cursor-pointer"
                >
                  <span>
                    {project.isYoutube
                      ? 'Watch Video on YouTube'
                      : project.isGithub
                        ? 'View Repository'
                        : 'Visit Website'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
