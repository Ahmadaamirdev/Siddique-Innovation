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
import brandLogo from '../assets/brand_logo.png';
import { serviceList } from '../data/servicesData';

const YouTubeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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

    if (link === 'Home') {
      if (onNavigate) {
        e.preventDefault();
        onNavigate('/');
      }
      return;
    }

    // Anchor hash link for Home page sections
    if (currentPath !== '/') {
      if (onNavigate) {
        e.preventDefault();
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById(link.toLowerCase());
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
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
    <motion.header
      style={{
        filter: navFilter,
        opacity: isHeroRevealed ? 1 : navOpacity,
      }}
      className="fixed top-4 sm:top-6 lg:top-7 left-0 right-0 z-50 flex flex-col items-center px-4 sm:px-6 pointer-events-none"
    >
      {/* Top Floating Header Wrapper */}
      <div className="pointer-events-auto relative w-full max-w-5xl">
        {/* Floating Glass Pill Bar */}
        <div
          className={`relative w-full rounded-full bg-[#080B0F]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'bg-[#06080B]/95 py-2' : ''
          }`}
        >
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
              src={brandLogo}
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
                      className={`relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors select-none inline-flex items-center gap-1.5 cursor-pointer ${
                        servicesDropdownOpen || isHovered
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
                        className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 ${
                          servicesDropdownOpen || isHovered
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
                  href={link === 'Projects' ? '/projects' : `#${link.toLowerCase()}`}
                  onClick={(e) => handleLinkClick(link, e)}
                  onMouseEnter={() => setHoveredTab(link)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors select-none cursor-pointer ${
                    isHovered ? 'text-[#00FFE5]' : 'text-gray-300 hover:text-[#00FFE5]'
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
              href="/#contact"
              onClick={(e) => {
                if (currentPath !== '/') {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/');
                    setTimeout(() => {
                      const el = document.getElementById('contact');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }
                }
              }}
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-[#00E6D2]/15 border border-white/15 hover:border-[#00E6D2]/40 hover:text-[#00FFE5] transition-all duration-200 cursor-pointer"
            >
              <span>Book Discovery Call</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#00FFE5] transition-colors duration-200" />
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
            className="md:hidden pointer-events-auto w-full max-w-5xl mt-2 rounded-xl bg-[#090D12]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-3 flex flex-col gap-1.5"
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
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            mobileServicesOpen ? 'rotate-180 text-white' : ''
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
                    href={link === 'Projects' ? '/projects' : `#${link.toLowerCase()}`}
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
                href="/#contact"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (currentPath !== '/') {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('/');
                      setTimeout(() => {
                        const el = document.getElementById('contact');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }, 150);
                    }
                  }
                }}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer"
              >
                <span>Book Discovery Call</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
