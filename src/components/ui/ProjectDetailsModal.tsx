import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, Layout, Video } from 'lucide-react';
import { WingLogo } from '@/components/ui/WingLogo';

export function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

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
  initialMode?: 'video' | 'preview';
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  initialMode,
}) => {
  const videoId =
    project?.isYoutube || (project?.link && getYouTubeVideoId(project.link))
      ? getYouTubeVideoId(project?.link)
      : null;

  const [viewMode, setViewMode] = useState<'video' | 'preview'>('preview');

  useEffect(() => {
    if (!project) return;
    if (videoId) {
      setViewMode(initialMode || 'video');
    } else {
      setViewMode('preview');
    }
  }, [project?.id, videoId, initialMode]);

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
          className={`relative w-full ${
            videoId ? 'max-w-2xl sm:max-w-3xl' : 'max-w-2xl'
          } max-h-[90vh] bg-[#0A0D13] border border-white/15 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,230,210,0.12)] flex flex-col z-10 overflow-hidden`}
        >
          {/* Header Bar (Pinned) */}
          <div className="shrink-0 flex items-center justify-between px-5 py-4 bg-[#0A0D13] border-b border-white/10 z-20">
            <div className="flex items-center gap-2.5">
              <WingLogo className="w-4 h-4 text-[#00E6D2] shrink-0" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#00E6D2] font-semibold">
                {categoryLabel}
              </span>
              {videoId && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono font-medium">
                  <Video className="w-3 h-3 text-red-400" />
                  Video Demonstration
                </span>
              )}
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
            {/* Project Preview / Video Area */}
            <div className="relative overflow-hidden border-b border-white/10 bg-[#080B10]">
              {/* Optional Switcher between Video and UI Graphic if both exist */}
              {videoId && (
                <div className="absolute top-3 right-3 z-30 flex items-center gap-1 bg-black/85 backdrop-blur-md p-1 rounded-lg border border-white/15 text-[11px] font-mono shadow-lg">
                  <button
                    type="button"
                    onClick={() => setViewMode('video')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all cursor-pointer ${
                      viewMode === 'video'
                        ? 'bg-[#00E6D2] text-black font-bold shadow-[0_0_12px_rgba(0,230,210,0.5)]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Video</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('preview')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all cursor-pointer ${
                      viewMode === 'preview'
                        ? 'bg-[#00E6D2] text-black font-bold shadow-[0_0_12px_rgba(0,230,210,0.5)]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Layout className="w-3 h-3" />
                    <span>UI Preview</span>
                  </button>
                </div>
              )}

              {videoId && viewMode === 'video' ? (
                <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={project.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                project.renderPreview()
              )}
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
          <div className="shrink-0 p-4 sm:p-5 bg-[#0A0D13] border-t border-white/10 flex items-center justify-between gap-3 z-20">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-mono font-medium transition cursor-pointer"
            >
              Close
            </button>

            {!videoId && project.link && !project.isYoutube && (
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E6D2] to-[#00FFE5] text-black text-xs font-mono font-bold shadow-[0_0_20px_rgba(0,230,210,0.35)] hover:brightness-110 transition cursor-pointer"
                >
                  <span>
                    {project.isGithub ? 'View Repository' : 'Visit Website'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
