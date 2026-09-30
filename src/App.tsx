import React, { useState, useEffect } from 'react';
import { useMotionValue } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Projects } from './components/Projects';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { BackgroundParticles } from './components/BackgroundParticles';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { ProjectsPage } from './components/ProjectsPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsPage } from './components/TermsPage';
import { servicesData } from './data/servicesData';

export const App: React.FC = () => {
  const heroProgress = useMotionValue(0);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPath = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    if ((window as any).__lenis) {
      (window as any).__heroRevealed = true;
      (window as any).__lenis.start();
      (window as any).__lenis.scrollTo(0, { immediate: true });
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const navigateToProjects = () => navigateToPath('/projects');
  const navigateToHome = () => navigateToPath('/');
  const navigateToService = (slug: string) => navigateToPath(`/services/${slug}`);

  const renderContent = () => {
    if (currentPath === '/projects') {
      return <ProjectsPage onBackToHome={navigateToHome} onNavigate={navigateToPath} />;
    }

    if (currentPath === '/about' || currentPath === '/about-us') {
      return <AboutPage onNavigate={navigateToPath} />;
    }

    if (currentPath === '/contact' || currentPath === '/contact-us') {
      return <ContactPage onNavigate={navigateToPath} />;
    }

    if (currentPath === '/privacy-policy' || currentPath === '/privacy') {
      return <PrivacyPolicyPage onNavigate={navigateToPath} />;
    }

    if (
      currentPath === '/terms' ||
      currentPath === '/terms-and-conditions' ||
      currentPath === '/terms-of-service'
    ) {
      return <TermsPage onNavigate={navigateToPath} />;
    }

    if (currentPath.startsWith('/services/')) {
      const serviceSlug = currentPath.replace('/services/', '').replace(/\/$/, '');
      const activeService = servicesData[serviceSlug];

      if (activeService) {
        return (
          <ServiceDetailPage
            service={activeService}
            onNavigateHome={navigateToHome}
            onNavigateService={navigateToService}
          />
        );
      }
    }

    return (
      <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00E6D2] selection:text-black overflow-x-clip relative">
        <BackgroundParticles />
        <Navbar
          heroProgress={heroProgress}
          isHeroRevealed={isHeroRevealed}
          onNavigate={navigateToPath}
          currentPath={currentPath}
        />
        <main id="home">
          <Hero
            progressProp={heroProgress}
            isRevealedProp={isHeroRevealed}
            onRevealedChange={setIsHeroRevealed}
            onNavigate={navigateToPath}
          />
          <Stats />
          <Services />
          <Process />
          <Projects onNavigateToProjects={navigateToProjects} />
          <WhyChooseUs />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer onNavigate={navigateToPath} />
      </div>
    );
  };

  return (
    <SmoothScrollProvider currentPath={currentPath}>
      {renderContent()}
    </SmoothScrollProvider>
  );
};

export default App;
