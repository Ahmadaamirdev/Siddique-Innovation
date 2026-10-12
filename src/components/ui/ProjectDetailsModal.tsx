import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { WingLogo } from '@/components/ui/WingLogo';

export interface ProjectModalData {
  id: string;
  title: string;
  category?: string;
  tags: string[];
  link?: string;
  isGithub?: boolean;
  description?: string;
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
  // Lock body scroll while modal is active
  useEffect(() => {
    if (!project) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8">
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
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0A0D13] border border-white/15 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,230,210,0.12)] flex flex-col z-10 custom-scrollbar"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-[#0A0D13]/95 backdrop-blur-md border-b border-white/10">
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

          {/* Project Preview */}
          <div className="relative overflow-hidden border-b border-white/10 bg-[#080B10]">
            {project.renderPreview()}
          </div>

          {/* Details Content */}
          <div className="p-5 sm:p-7 space-y-6 flex-1">
            {/* Title & Category */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-tight">
                {project.title}
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
                {project.description ||
                  `Engineered with industry-leading standards, optimized user journeys, and robust modern architecture tailored to deliver measurable business performance and conversion.`}
              </p>
            </div>

            {/* Core Technologies / Scope Tags */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-400">
                <Layers className="w-3.5 h-3.5 text-[#00E6D2]" />
                <span>Technologies &amp; Deliverables</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-gray-200 border border-white/10 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Engineering Highlights */}
            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-400">
                <Sparkles className="w-3.5 h-3.5 text-[#00E6D2]" />
                <span>Key Highlights</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                <div className="flex items-start gap-2 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#00E6D2] shrink-0 mt-0.5" />
                  <span>High-speed performance with modern responsive layouts.</span>
                </div>
                <div className="flex items-start gap-2 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#00E6D2] shrink-0 mt-0.5" />
                  <span>Conversion-engineered UI/UX tailored for user engagement.</span>
                </div>
                <div className="flex items-start gap-2 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#00E6D2] shrink-0 mt-0.5" />
                  <span>Cross-device fidelity across mobile, tablet, and desktop.</span>
                </div>
                <div className="flex items-start gap-2 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#00E6D2] shrink-0 mt-0.5" />
                  <span>Clean scalable codebase built to enterprise-grade standards.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="sticky bottom-0 z-20 p-4 sm:p-5 bg-[#0A0D13]/95 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
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
                  <span>Visit Website</span>
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
