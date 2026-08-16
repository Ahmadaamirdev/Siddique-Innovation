import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { BackgroundParticles } from './components/BackgroundParticles';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';

export const App: React.FC = () => {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00E6D2] selection:text-black overflow-x-hidden relative">
        <BackgroundParticles />
        <Navbar />
        <main id="home">
          <Hero />
          <Stats />
          <Services />
          <Projects />
          <CTA />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default App;

