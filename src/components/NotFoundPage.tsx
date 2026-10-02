import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  currentPath?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigate,
  currentPath = window.location.pathname,
}) => {
  const [requestId, setRequestId] = useState('01J9ZK4W7QD8');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = '404 - Route Not Found | Siddiqui Innovations';

    // Generate random realistic requestId if needed
    const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let id = '01J';
    for (let i = 0; i < 9; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRequestId(id);

    return () => {
      document.title = 'Siddiqui Innovations | AI Automation, SEO & Digital Growth';
    };
  }, []);

  const nearestRoutes = [
    { path: '/', label: 'home' },
    { path: '/projects', label: 'featured work & portfolio' },
    { path: '/services/ai-automation', label: 'ai automation' },
    { path: '/services/seo', label: 'seo & organic visibility' },
    { path: '/services/youtube-automation', label: 'youtube automation' },
    { path: '/contact', label: 'contact & support' },
  ];

  const displayPath = currentPath && currentPath !== '/' ? currentPath : '/workspaces/atlas';

  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#00E6D2] selection:text-black relative overflow-x-hidden font-sans flex flex-col justify-between">
      {/* Background Matrix & Subtle Cyber Radial Glow */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#00E6D206_1px,transparent_1px),linear-gradient(to_bottom,#00E6D206_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-0" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-radial from-[#00E6D2]/8 via-transparent to-transparent blur-[140px] pointer-events-none -z-0" />

      {/* Global Navbar */}
      <Navbar
        isHeroRevealed={true}
        currentPath="/404"
        onNavigate={onNavigate}
      />

      {/* Main Terminal Block Section */}
      <main className="pt-28 sm:pt-36 pb-16 sm:pb-24 relative z-10 px-4 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="w-full max-w-3xl sm:max-w-4xl rounded-2xl sm:rounded-3xl bg-[#080B0F]/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(0,230,210,0.06)] overflow-hidden text-left"
        >
          {/* Terminal Window Header Bar (macOS Dots + check-route + BASH) */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b border-white/10 bg-white/[0.02] select-none">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-[#EAB308] shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              <span className="text-xs text-gray-400 font-mono tracking-wide ml-3 sm:ml-4">
                siddiqui-innovations: check-route
              </span>
            </div>
            <div className="text-[11px] font-mono text-gray-500 uppercase tracking-widest font-semibold">
              BASH
            </div>
          </div>

          {/* Terminal Window Body Content */}
          <div className="p-6 sm:p-10 lg:p-12 font-mono text-left select-text">
            {/* cURL Command Request */}
            <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-300 gap-x-2 gap-y-1">
              <span className="text-gray-500 font-bold">$</span>
              <span className="text-[#00FFE5] font-semibold">curl</span>
              <span className="text-gray-400">-I</span>
              <span className="text-gray-300 break-all">
                https://siddiquiinnovations.com{displayPath}
              </span>
            </div>

            {/* HTTP/2 404 Response Header */}
            <div className="mt-5 space-y-1">
              <div className="text-base sm:text-lg font-bold text-white tracking-wide font-mono">
                HTTP/2 404
              </div>
              <div className="text-xs sm:text-[13px] text-gray-400 font-mono">
                content-type: text/html; charset=utf-8
              </div>
              <div className="text-xs sm:text-[13px] text-gray-500 font-mono">
                x-request-id: {requestId}
              </div>
            </div>

            {/* Giant 404 Typography */}
            <div className="my-8 sm:my-10 select-none">
              <span className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-white tracking-tight font-mono leading-none block drop-shadow-[0_0_40px_rgba(255,255,255,0.12)]">
                404
              </span>
            </div>

            {/* Route Not Found Label */}
            <div className="text-xs sm:text-sm text-gray-400 font-mono mb-4">
              route not found, nearest live routes:
            </div>

            {/* Nearest Live Routes List */}
            <div className="space-y-2.5 text-xs sm:text-sm font-mono">
              {nearestRoutes.map((r) => (
                <a
                  key={r.path}
                  href={r.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(r.path);
                  }}
                  className="flex items-center gap-3 text-gray-300 hover:text-[#00FFE5] transition-colors group cursor-pointer py-0.5"
                >
                  <span className="text-gray-500 group-hover:text-[#00FFE5] transition-colors select-none">
                    →
                  </span>
                  <span className="text-white group-hover:text-[#00FFE5] font-semibold underline decoration-white/20 group-hover:decoration-[#00FFE5] transition-all">
                    {r.path}
                  </span>
                  <span className="text-gray-500 group-hover:text-gray-300 transition-colors">
                    {r.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Prompt Line with Blinking Block Cursor */}
            <div className="mt-8 sm:mt-10 flex items-center text-sm font-mono text-gray-400">
              <span className="text-gray-500 font-bold mr-2">$</span>
              <span className="inline-block w-2.5 h-5 bg-[#00FFE5] animate-[pulse_1s_infinite] shadow-[0_0_8px_#00FFE5]" />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
