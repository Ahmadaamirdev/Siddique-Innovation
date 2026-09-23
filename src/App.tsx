import React, { useState } from 'react';
import { useMotionValue } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Projects } from './components/Projects';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { BackgroundParticles } from './components/BackgroundParticles';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';

export const App: React.FC = () => {
  const heroProgress = useMotionValue(0);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00E6D2] selection:text-black overflow-x-hidden relative">
        <BackgroundParticles />
        <Navbar heroProgress={heroProgress} isHeroRevealed={isHeroRevealed} />
        <main id="home">
          <Hero
            progressProp={heroProgress}
            isRevealedProp={isHeroRevealed}
            onRevealedChange={setIsHeroRevealed}
          />
          <Stats />
          <Services />
          <Process />
          <WhyChooseUs />
          <Testimonials />
          <FAQ />
          <Projects />
          <CTA />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default App;

