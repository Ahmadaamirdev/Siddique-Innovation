import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import {
  ArrowUpRight,
  Menu,
  X,
  ChevronDown,
  Bot,
  Code2,
  TrendingUp,
  Search,
  Sparkles,
} from 'lucide-react';
import { serviceList } from '../data/servicesData';

const YouTubeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export interface NavbarProps {
  heroProgress?: MotionValue<number>;
  isHeroRevealed?: boolean;
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  heroProgress,
  isHeroRevealed = false,
  onNavigate,
  currentPath = '/',
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fallback progress if none provided
  const fallbackProgress = useMotionValue(isHeroRevealed ? 1 : 0);
  const currentProgress = heroProgress || fallbackProgress;

  // Blur during intro logo animation: starts at blur(14px) and lower opacity, dissolves to 0 as logo animation reveals hero
  const blurAmount = useTransform(currentProgress, [0.25, 0.92], [14, 0]);
  const navFilter = useTransform(blurAmount, (b) => {
    if (isHeroRevealed || b < 0.2) return 'none';
    return `blur(${b.toFixed(1)}px)`;
  });
  const navOpacity = useTransform(currentProgress, [0.1, 0.85], [0.45, 1]);

  const navLinks = ['Home', 'Services', 'Projects', 'About', 'Contact'];

  const getServiceIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'bot':
        return <Bot className={className} />;
      case 'code':
        return <Code2 className={className} />;
      case 'marketing':
        return <TrendingUp className={className} />;
      case 'seo':
        return <Search className={className} />;
      case 'youtube':
        return <YouTubeIcon className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const handleMouseEnterServices = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setServicesDropdownOpen(true);
    setHoveredTab('Services');
  };

  const handleMouseLeaveServices = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
      setHoveredTab(null);
    }, 180);
  };

  const handleLinkClick = (link: string, e: React.MouseEvent) => {
    if (link === 'Services') {
      // Toggle dropdown on click
      setServicesDropdownOpen(!servicesDropdownOpen);
      return;
    }

    if (link === 'Projects') {
      if (onNavigate) {
        e.preventDefault();
        onNavigate('/projects');
      }
      return;
    }

    if (link === 'About') {
      if (onNavigate) {
        e.preventDefault();
        onNavigate('/about');
      }
      return;
    }

    if (link === 'Contact') {
      if (onNavigate) {
        e.preventDefault();
        onNavigate('/contact');
      }
      return;
    }

    if (link === 'Home') {
      if (onNavigate) {
        e.preventDefault();
        onNavigate('/');
      }
      return;
    }
  };

  const handleServiceSelect = (slug: string, e: React.MouseEvent) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigate) {
      e.preventDefault();
      onNavigate(`/services/${slug}`);
    }
  };

  return (
    <>
      {/* Top subtle viewport gradient to soften content scrolling under the floating navbar */}
      <div className="fixed top-0 inset-x-0 h-12 bg-gradient-to-b from-[#050608] via-[#050608]/80 to-transparent pointer-events-none z-40" />

      <motion.header
        style={{
          filter: navFilter,
          opacity: isHeroRevealed ? 1 : navOpacity,
        }}
        className="fixed top-4 sm:top-6 lg:top-7 left-0 right-0 z-50 flex flex-col items-center px-4 sm:px-6 pointer-events-none"
      >
      {/* Top Floating Header Wrapper */}
      <div className="pointer-events-auto relative w-full max-w-5xl">
        {/* Anti-gravity ambient cyan blurry glow cushion underneath the pill */}
        <div
          className={`absolute -bottom-2 inset-x-8 sm:inset-x-12 h-6 bg-[#00E6D2]/25 blur-xl rounded-full -z-10 pointer-events-none transition-opacity duration-500 ${
            scrolled ? 'opacity-90' : 'opacity-75'
          }`}
        />

        {/* Floating Glass Pill Bar */}
        <div
          className={`relative w-full rounded-full bg-[#06090D]/70 backdrop-blur-2xl backdrop-saturate-150 border border-[#00E6D2]/35 border-t-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,230,210,0.18)] px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 hover:border-[#00E6D2]/50 hover:shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(0,230,210,0.25)] ${
            scrolled ? 'bg-[#05080C]/85 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,230,210,0.22)] py-2' : ''
          }`}
        >
          {/* Top Specular Glass Highlight Streak */}
          <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/');
              }
            }}
            className="flex items-center shrink-0 py-0.5 cursor-pointer"
            aria-label="Siddiqui Innovations Home"
          >
            <img
              src="/logo.png"
              alt="Siddiqui Innovations Logo"
              className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200 hover:opacity-90"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            onMouseLeave={() => setHoveredTab(null)}
            className="hidden md:flex items-center gap-1 sm:gap-1.5"
          >
            {navLinks.map((link) => {
              const isServices = link === 'Services';
              const isHovered = hoveredTab === link;

              if (isServices) {
                return (
                  <div
                    key={link}
                    onMouseEnter={handleMouseEnterServices}
                    onMouseLeave={handleMouseLeaveServices}
                    className="relative"
                  >
                    <a
                      href="#services"
                      onClick={(e) => handleLinkClick(link, e)}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors select-none inline-flex items-center gap-1.5 cursor-pointer ${servicesDropdownOpen || isHovered
                          ? 'text-[#00FFE5]'
                          : 'text-gray-300 hover:text-[#00FFE5]'
                        }`}
                    >
                      {(servicesDropdownOpen || isHovered) && (
                        <motion.div
                          layoutId="hoverNavPill"
                          className="absolute inset-0 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/30"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{link}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 ${servicesDropdownOpen || isHovered
                            ? 'rotate-180 text-[#00FFE5]'
                            : 'text-gray-400'
                          }`}
                      />
                    </a>

                    {/* Plain, Professional, Modern Circular Services Dropdown */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl bg-[#0A0D12]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 p-2 z-50 flex flex-col gap-1"
                        >
                          {serviceList.map((service) => (
                            <a
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={(e) => handleServiceSelect(service.slug, e)}
                              className="flex items-center gap-2.5 px-3.5 py-2 rounded-full text-sm text-gray-300 hover:text-[#00FFE5] hover:bg-[#00E6D2]/10 border border-transparent hover:border-[#00E6D2]/25 transition-all duration-150 group cursor-pointer"
                            >
                              <span className="text-gray-400 group-hover:text-[#00FFE5] transition-colors shrink-0">
                                {getServiceIcon(service.iconName, 'w-4 h-4')}
                              </span>
                              <span className="font-medium text-xs sm:text-sm tracking-wide group-hover:translate-x-0.5 transition-transform duration-150">
                                {service.title}
                              </span>
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={link}
                  href={link === 'Projects' ? '/projects' : link === 'About' ? '/about' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : `#${link.toLowerCase()}`}
                  onClick={(e) => handleLinkClick(link, e)}
                  onMouseEnter={() => setHoveredTab(link)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors select-none cursor-pointer ${isHovered ? 'text-[#00FFE5]' : 'text-gray-300 hover:text-[#00FFE5]'
                    }`}
                >
                  {isHovered && (
                    <motion.div
                      layoutId="hoverNavPill"
                      className="absolute inset-0 rounded-full bg-[#00E6D2]/10 border border-[#00E6D2]/30"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link}</span>
                </a>
              );
            })}
          </nav>

          {/* Header Right CTA - Plain, Modern, Refined with Cyan Hover */}
          <div className="hidden md:flex items-center shrink-0">
            <a
              href="https://wa.me/message/JLNLM2A5GEEMG1"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-[#00E6D2]/15 border border-white/15 hover:border-[#00E6D2]/40 hover:text-[#00FFE5] transition-all duration-200 cursor-pointer"
            >
              <span>Book Discovery Call</span>
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-[#00E6D2] group-hover:text-[#00FFE5] transition-colors duration-200" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Card */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden pointer-events-auto w-full max-w-5xl mt-2 rounded-2xl bg-[#080D11]/90 backdrop-blur-2xl border border-[#00E6D2]/30 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(0,230,210,0.15)] p-3.5 flex flex-col gap-1.5"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                if (link === 'Services') {
                  return (
                    <div key={link} className="flex flex-col">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex items-center justify-between text-sm font-medium py-2 px-3 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-white/[0.06] cursor-pointer"
                      >
                        <span>Services</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform ${mobileServicesOpen ? 'rotate-180 text-white' : ''
                            }`}
                        />
                      </button>

                      {mobileServicesOpen && (
                        <div className="pl-3 pr-1 py-1 flex flex-col gap-1 bg-white/[0.02] rounded-2xl my-1 border border-white/5">
                          {serviceList.map((service) => (
                            <a
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={(e) => handleServiceSelect(service.slug, e)}
                              className="flex items-center gap-2.5 py-2 px-3 rounded-full text-xs font-medium text-gray-300 hover:text-[#00FFE5] hover:bg-[#00E6D2]/10 transition-colors cursor-pointer"
                            >
                              <span className="text-gray-400 group-hover:text-[#00FFE5]">
                                {getServiceIcon(service.iconName, 'w-3.5 h-3.5')}
                              </span>
                              <span>{service.title}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={link}
                    href={link === 'Projects' ? '/projects' : link === 'About' ? '/about' : link === 'Contact' ? '/contact' : link === 'Home' ? '/' : `#${link.toLowerCase()}`}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleLinkClick(link, e);
                    }}
                    className="text-sm font-medium py-2 px-3 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-white/[0.06] cursor-pointer"
                  >
                    {link}
                  </a>
                );
              })}

              <a
                href="https://wa.me/message/JLNLM2A5GEEMG1"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer"
              >
                <span>Book Discovery Call</span>
                <WhatsAppIcon className="w-4 h-4 fill-current text-[#00E6D2]" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
};
