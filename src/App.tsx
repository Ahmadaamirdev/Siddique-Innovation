import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Clientele } from './components/Clientele';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { BackgroundParticles } from './components/BackgroundParticles';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { LoadingScreen } from './components/LoadingScreen';
import { servicesData } from './data/servicesData';

const ServiceDetailPage = lazy(() =>
  import('./components/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage }))
);
const ProjectsPage = lazy(() =>
  import('./components/ProjectsPage').then((m) => ({ default: m.ProjectsPage }))
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
const NotFoundPage = lazy(() =>
  import('./components/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLoading, setIsLoading] = useState(() => {
    return window.location.pathname === '/' || window.location.pathname === '';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Guarantee that every route change scrolls to top immediately
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if ((window as any).__lenis) {
      try {
        (window as any).__lenis.start();
        (window as any).__lenis.scrollTo(0, { immediate: true });
        document.documentElement.classList.remove('lenis-stopped');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      } catch {}
    }
  }, [currentPath]);

  const navigateToPath = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if ((window as any).__lenis) {
      try {
        (window as any).__lenis.start();
        (window as any).__lenis.scrollTo(0, { immediate: true });
        document.documentElement.classList.remove('lenis-stopped');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      } catch {}
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

    if (currentPath.startsWith('/services/') || currentPath.startsWith('/service/')) {
      const cleanPath = currentPath.split('?')[0].split('#')[0];
      const serviceSlug = cleanPath.replace(/^\/services?\//, '').replace(/\/$/, '');
      const activeService = servicesData[serviceSlug];

      if (activeService) {
        return (
          <ServiceDetailPage
            service={activeService}
            onNavigateHome={navigateToHome}
            onNavigateService={navigateToService}
            onNavigate={navigateToPath}
          />
        );
      }
    }

    if (currentPath === '/' || currentPath === '') {
      return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00E6D2] selection:text-black overflow-x-clip relative">
          <BackgroundParticles />
          <Navbar
            onNavigate={navigateToPath}
            currentPath={currentPath}
          />
          <main id="home">
            <Hero
              onNavigate={navigateToPath}
            />
            <Stats />
            <Services onNavigate={navigateToPath} />
            <Process />
            <Projects onNavigateToProjects={navigateToProjects} />
            <Testimonials />
            <Clientele />
            <FAQ />
            <CTA />
          </main>
          <Footer onNavigate={navigateToPath} />
        </div>
      );
    }

    return <NotFoundPage onNavigate={navigateToPath} currentPath={currentPath} />;
  };

  return (
    <SmoothScrollProvider currentPath={currentPath}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center" />}>
        {renderContent()}
      </Suspense>
    </SmoothScrollProvider>
  );
};

export default App;
