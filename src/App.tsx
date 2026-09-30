import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import { servicesData } from './data/servicesData';

const ProjectsPage = lazy(() =>
  import('./components/ProjectsPage').then((m) => ({ default: m.ProjectsPage }))
);
const ServiceDetailPage = lazy(() =>
  import('./components/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage }))
);
const AboutPage = lazy(() =>
  import('./components/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const ContactPage = lazy(() =>
  import('./components/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const PrivacyPolicyPage = lazy(() =>
  import('./components/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const TermsPage = lazy(() =>
  import('./components/TermsPage').then((m) => ({ default: m.TermsPage }))
);

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Loading animation should only run on initial website load on the homepage,
  // and never when switching back to homepage.
  const [isHeroRevealed, setIsHeroRevealed] = useState<boolean>(() => {
    try {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        sessionStorage.setItem('si_intro_revealed', 'true');
        return true;
      }
      return sessionStorage.getItem('si_intro_revealed') === 'true';
    } catch {
      return false;
    }
  });

  const heroProgress = useMotionValue(isHeroRevealed ? 1 : 0);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setIsHeroRevealed(true);
      heroProgress.set(1);
      try {
        sessionStorage.setItem('si_intro_revealed', 'true');
      } catch {}
      (window as any).__heroRevealed = true;
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [heroProgress]);

  const navigateToPath = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    // Any page navigation means the website has already been loaded
    setIsHeroRevealed(true);
    heroProgress.set(1);
    try {
      sessionStorage.setItem('si_intro_revealed', 'true');
    } catch {}
    (window as any).__heroRevealed = true;
    if ((window as any).__lenis) {
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
      <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center" />}>
        {renderContent()}
      </Suspense>
    </SmoothScrollProvider>
  );
};

export default App;
