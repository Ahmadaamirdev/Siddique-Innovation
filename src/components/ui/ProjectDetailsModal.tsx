import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Video, MessageSquare } from 'lucide-react';
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
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  onNavigate,
}) => {
  const videoId =
    project?.isYoutube || (project?.link && getYouTubeVideoId(project.link))
      ? getYouTubeVideoId(project?.link)
      : null;

  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    if (videoId) {
      setVideoLoading(true);
    }
  }, [project?.id, videoId]);

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

  const handleAskQueries = () => {
    onClose();
    try {
      const lenis = (window as any).__lenis;
      lenis?.start();
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    } catch {}

    if (onNavigate) {
      onNavigate('/contact');
    } else {
      window.location.href = '/contact';
    }
  };

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
            {/* Project Preview / Fast-Loading Video Area (Reduced height without cropping images) */}
            <div
              className={`relative w-full overflow-hidden border-b border-white/10 bg-[#080B10] flex items-center justify-center [&_img]:object-contain ${
                videoId
                  ? 'max-h-[230px] sm:max-h-[260px]'
                  : 'max-h-[210px] sm:max-h-[240px]'
              }`}
            >
              {videoId ? (
                <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                  {/* Instant YouTube Poster Thumbnail while player loads */}
                  <img
                    src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
                    loading="eager"
                  />

                  {/* Loading Spinner while iframe initializes */}
                  {videoLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/60 backdrop-blur-sm z-10 transition-opacity pointer-events-none">
                      <div className="w-8 h-8 rounded-full border-2 border-[#00FFE5] border-t-transparent animate-spin" />
                      <span className="text-[11px] font-mono text-[#00FFE5] tracking-wider uppercase font-semibold">
                        Loading Video...
                      </span>
                    </div>
                  )}

                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={project.title}
                    className="relative z-20 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="eager"
                    onLoad={() => setVideoLoading(false)}
                  />
                </div>
              ) : (
                project.renderPreview()
              )}
            </div>

            {/* Details Content - Title and description moved upward so user immediately sees scrollable content */}
            <div className="p-5 sm:px-7 sm:py-5 space-y-3">
              <div className="space-y-2.5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-tight leading-snug">
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
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-mono font-medium transition cursor-pointer"
            >
              Close
            </button>

            <div className="flex items-center gap-2.5 justify-end">
              {!videoId && project.link && !project.isYoutube && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00E6D2]/40 text-gray-200 hover:text-white text-xs font-mono font-semibold transition cursor-pointer"
                >
                  <span>
                    {project.isGithub ? 'View Repository' : 'Visit Website'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              )}

              {/* Ask Queries Button (Present in ALL Popups to take users to Contact Form) */}
              <button
                type="button"
                onClick={handleAskQueries}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E6D2] to-[#00FFE5] text-black text-xs font-mono font-bold shadow-[0_0_20px_rgba(0,230,210,0.35)] hover:brightness-110 hover:shadow-[0_0_25px_rgba(0,255,229,0.55)] transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current shrink-0" />
                <span>Ask Queries</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
