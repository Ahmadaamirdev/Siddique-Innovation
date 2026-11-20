import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import officeBg from '@/assets/about/about_hero_office_bg.jpg';
import './AboutHero.css';

const words = ['grows', 'automates', 'scales', 'ranks'];

export function AboutHero() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % words.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section className="about-hero" aria-labelledby="about-hero-heading">
      {/* Office Background Image Layer */}
      <div className="about-hero__bg-container" aria-hidden="true">
        <img
          src={officeBg}
          alt=""
          className="about-hero__bg"
          loading="eager"
          decoding="async"
        />
        <div className="about-hero__overlay" />
      </div>

      {/* Centered Prominent Hero Content */}
      <div className="about-hero__layout">
        <div className="about-hero__copy">
          <h1 id="about-hero-heading" className="about-hero__heading">
            <span className="block">Build a business</span>
            <span className="about-hero__heading-line">
              that&nbsp;
              <span className="about-hero__words-wrapper">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[active]}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="about-hero__word"
                  >
                    {words[active]}
                  </motion.span>
                </AnimatePresence>
              </span>
              &nbsp;itself.
            </span>
          </h1>

          <p className="about-hero__description">
            We automate daily operations, build stronger digital presences and help you grow without hiring for every new task.
          </p>

          <div className="about-hero__actions">
            <a className="about-hero__primary" href="#contact">
              <span>Start a project</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="about-hero__secondary" href="#our-story">
              <span>Our story</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
