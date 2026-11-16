import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CLOUDINARY_ASSETS } from '@/data/cloudinaryAssets';
import './AboutHero.css';

const growsImage = CLOUDINARY_ASSETS.about_grows_bg.url;
const automatesImage = CLOUDINARY_ASSETS.about_automates_bg.url;
const scalesImage = CLOUDINARY_ASSETS.about_scales_bg.url;
const ranksImage = CLOUDINARY_ASSETS.about_ranks_bg.url;

const scenes = [
  { word: 'grows', image: growsImage, alt: 'A businessperson highlighting rising growth bars and an upward arrow', title: 'Turn potential into growth.', detail: 'Stronger digital presence. More opportunities to grow.' },
  { word: 'automates', image: automatesImage, alt: 'A businessperson interacting with connected automation process icons', title: 'Put repetitive work on autopilot.', detail: 'Connected workflows that keep your business moving.' },
  { word: 'scales', image: scalesImage, alt: 'An expanding network of interconnected teal glass cubes', title: 'Build for your next chapter.', detail: 'Systems that expand with your business, without the busywork.' },
  { word: 'ranks', image: ranksImage, alt: 'A businessperson presenting connected analytics, optimization and search ranking icons', title: 'Get found by the right people.', detail: 'Search visibility that brings your business into focus.' },
];

export function AboutHero() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % scenes.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const transition = {
    duration: reduceMotion ? 0 : 0.65,
    ease: [0.4, 0, 0.2, 1] as const,
  };
  return (
    <section className="about-hero" aria-labelledby="about-hero-heading">
      <div className="about-hero__layout">
        <div className="about-hero__copy">
          <p className="about-hero__eyebrow">Siddiqui Innovations · Pakistan</p>
          <h1 id="about-hero-heading" className="about-hero__heading">
            <span>Build a business</span>
            <span>that <span className="about-hero__words">
              {scenes.map((item, index) => (
                <motion.span
                  key={item.word}
                  className="about-hero__word"
                  aria-hidden={active !== index}
                  initial={false}
                  animate={{ opacity: active === index ? 1 : 0, y: reduceMotion || active === index ? 0 : -8 }}
                  transition={transition}
                >{item.word}</motion.span>
              ))}
            </span></span>
            <span>itself.</span>
          </h1>
          <p className="about-hero__description">We automate daily operations, build stronger digital presences and help you grow without hiring for every new task.</p>
          <div className="about-hero__actions">
            <a className="about-hero__primary" href="#about-cta">Start a project <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a className="about-hero__secondary" href="#story-mission">Our story</a>
          </div>
        </div>
        <div className="about-hero__visual">
          <div className="about-hero__images">
            {scenes.map((item, index) => (
              <motion.img key={item.word} src={item.image} alt={active === index ? item.alt : ''} aria-hidden={active !== index} width={1672} height={941} initial={false} animate={{ opacity: active === index ? 1 : 0 }} transition={transition} fetchPriority={index === 0 ? 'high' : 'auto'} className="about-hero__image" />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
