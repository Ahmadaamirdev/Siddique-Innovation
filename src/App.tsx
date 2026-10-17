import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { SmoothScrollProvider } from '@/context/SmoothScrollProvider';
import { HomePage } from '@/pages/HomePage';
import { servicesData } from '@/data/servicesData';
import { prefetchCommonRoutes } from '@/utils/routePrefetch';
import { PageTransitionFallback } from '@/components/ui/PageTransitionFallback';

// Top-level direct route imports (eliminates double-waterfall on service pages)
const AIAutomationPage = lazy(() =>
  import('@/pages/services/AIAutomationPage').then((m) => ({ default: m.AIAutomationPage }))
);
const WebDevelopmentPage = lazy(() =>
  import('@/pages/services/WebDevelopmentPage').then((m) => ({ default: m.WebDevelopmentPage }))
);
const DigitalMarketingPage = lazy(() =>
  import('@/pages/services/DigitalMarketingPage').then((m) => ({ default: m.DigitalMarketingPage }))
);
const SEOPage = lazy(() =>
  import('@/pages/services/SEOPage').then((m) => ({ default: m.SEOPage }))
);
const YouTubeAutomationPage = lazy(() =>
  import('@/pages/services/YouTubeAutomationPage').then((m) => ({ default: m.YouTubeAutomationPage }))
);

const ServiceDetailPage = lazy(() =>
  import('@/pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage }))
);
const ProjectsPage = lazy(() =>
  import('@/pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage }))
);
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const PrivacyPolicyPage = lazy(() =>
  import('@/pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const TermsPage = lazy(() =>
  import('@/pages/TermsPage').then((m) => ({ default: m.TermsPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLoading, setIsLoading] = useState(() => {
    return window.location.pathname === '/' || window.location.pathname === '';
  });

  // Silently prefetch common routes in idle moments after initial screen clears
  useEffect(() => {
    if (!isLoading) {
      prefetchCommonRoutes();
    }
  }, [isLoading]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Route change scroll management (preserves hash targets if present)
  useEffect(() => {
    const hasHash = Boolean(window.location.hash);
    if (!hasHash) {
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
    }
  }, [currentPath]);

  const navigateToPath = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    const hasHash = path.includes('#');
    if (!hasHash) {
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
    }
  };

  const navigateToProjects = () => navigateToPath('/projects');
  const navigateToHome = () => navigateToPath('/');
  const navigateToService = (slug: string) => navigateToPath(`/services/${slug}`);

  const renderContent = () => {
    const cleanPath = currentPath.split('?')[0].split('#')[0];

    if (cleanPath === '/projects') {
      return <ProjectsPage onBackToHome={navigateToHome} onNavigate={navigateToPath} />;
    }

    if (cleanPath === '/about' || cleanPath === '/about-us') {
      return <AboutPage onNavigate={navigateToPath} />;
    }

    if (cleanPath === '/contact' || cleanPath === '/contact-us') {
      return <ContactPage onNavigate={navigateToPath} />;
    }

    if (cleanPath === '/privacy-policy' || cleanPath === '/privacy') {
      return <PrivacyPolicyPage onNavigate={navigateToPath} />;
    }

    if (
      cleanPath === '/terms' ||
      cleanPath === '/terms-and-conditions' ||
      cleanPath === '/terms-of-service'
    ) {
      return <TermsPage onNavigate={navigateToPath} />;
    }

    if (cleanPath.startsWith('/services/') || cleanPath.startsWith('/service/')) {
      const serviceSlug = cleanPath.replace(/^\/services?\//, '').replace(/\/$/, '');
      const activeService = servicesData[serviceSlug];

      if (activeService) {
        switch (serviceSlug) {
          case 'ai-automation':
            return (
              <AIAutomationPage
                service={activeService}
                onNavigateHome={navigateToHome}
                onNavigateService={navigateToService}
                onNavigate={navigateToPath}
              />
            );
          case 'web-development':
            return (
              <WebDevelopmentPage
                service={activeService}
                onNavigateHome={navigateToHome}
                onNavigateService={navigateToService}
                onNavigate={navigateToPath}
              />
            );
          case 'digital-marketing':
            return (
              <DigitalMarketingPage
                service={activeService}
                onNavigateHome={navigateToHome}
                onNavigateService={navigateToService}
                onNavigate={navigateToPath}
              />
            );
          case 'seo':
            return (
              <SEOPage
                service={activeService}
                onNavigateHome={navigateToHome}
                onNavigateService={navigateToService}
                onNavigate={navigateToPath}
              />
            );
          case 'youtube-automation':
            return (
              <YouTubeAutomationPage
                service={activeService}
                onNavigateHome={navigateToHome}
                onNavigateService={navigateToService}
                onNavigate={navigateToPath}
              />
            );
          default:
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
    }

    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          currentPath={currentPath}
          onNavigate={navigateToPath}
          onNavigateToProjects={navigateToProjects}
        />
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
      <Suspense fallback={<PageTransitionFallback />}>
        {renderContent()}
      </Suspense>
    </SmoothScrollProvider>
  );
};

export default App;
