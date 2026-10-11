import React from 'react';
import { BackgroundParticles } from '@/components/ui/BackgroundParticles';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Projects } from '@/components/sections/Projects';
import { Testimonials } from '@/components/sections/Testimonials';
import { Clientele } from '@/components/sections/Clientele';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';

interface HomePageProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onNavigateToProjects: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentPath,
  onNavigate,
  onNavigateToProjects,
}) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00E6D2] selection:text-black overflow-x-clip relative">
      <BackgroundParticles />
      <Navbar onNavigate={onNavigate} currentPath={currentPath} />
      <main id="home">
        <Hero onNavigate={onNavigate} />
        <Stats />
        <Services onNavigate={onNavigate} />
        <Process />
        <Projects onNavigateToProjects={onNavigateToProjects} />
        <Testimonials />
        <Clientele />
        <FAQ />
        <CTA />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default HomePage;
