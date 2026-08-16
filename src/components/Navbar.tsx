import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { WingLogo } from './WingLogo';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Services', 'Projects', 'About', 'Contact'];

  return (
    <motion.header
      initial={{ backgroundColor: 'transparent' }}
      animate={{ 
        backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.85)' : 'transparent',
        paddingTop: scrolled ? '1rem' : '1.5rem',
        paddingBottom: scrolled ? '1rem' : '1.5rem'
      }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const }}
      className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'backdrop-blur-md border-b border-white/5' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            {/* Cyan Wing Logo */}
            <WingLogo className="w-9 h-9 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(0,230,210,0.6)]" />
            <div className="absolute -inset-1 bg-[#00E6D2]/20 blur-sm rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-extrabold text-base tracking-wider text-white uppercase font-heading">
            SIDDIQUI INNOVATIONS
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setActiveTab(link)}
              className={`relative text-sm font-medium transition-colors hover:text-[#00E6D2] ${activeTab === link ? 'text-[#00E6D2]' : 'text-gray-300'
                }`}
            >
              {link}
              {activeTab === link && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#00E6D2] rounded-full shadow-[0_0_8px_#00E6D2]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Header Right CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white border border-[#00E6D2]/30 bg-[#0A1218]/80 hover:bg-[#00E6D2]/10 hover:border-[#00E6D2] transition-all duration-300 shadow-[0_0_15px_rgba(0,230,210,0.05)] hover:shadow-[0_0_20px_rgba(0,230,210,0.25)]"
          >
            <span>Book Discovery Call</span>
            <ArrowUpRight className="w-4 h-4 text-[#00E6D2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-4 pb-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => {
                    setActiveTab(link);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${activeTab === link
                    ? 'text-[#00E6D2] bg-[#00E6D2]/10'
                    : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white border border-[#00E6D2] bg-[#00E6D2]/10 hover:bg-[#00E6D2]/20"
              >
                <span>Book Discovery Call</span>
                <ArrowUpRight className="w-4 h-4 text-[#00E6D2]" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
