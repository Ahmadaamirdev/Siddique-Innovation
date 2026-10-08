import React, { useEffect, Suspense, lazy } from 'react';
import type { ServiceItemData } from '../data/servicesData';
import { useSmoothScroll } from './SmoothScrollProvider';

const AIAutomationPage = lazy(() =>
  import('./services/AIAutomationPage').then((m) => ({ default: m.AIAutomationPage }))
);
const WebDevelopmentPage = lazy(() =>
  import('./services/WebDevelopmentPage').then((m) => ({ default: m.WebDevelopmentPage }))
);
const DigitalMarketingPage = lazy(() =>
  import('./services/DigitalMarketingPage').then((m) => ({ default: m.DigitalMarketingPage }))
);
const SEOPage = lazy(() =>
  import('./services/SEOPage').then((m) => ({ default: m.SEOPage }))
);
const YouTubeAutomationPage = lazy(() =>
  import('./services/YouTubeAutomationPage').then((m) => ({ default: m.YouTubeAutomationPage }))
);

interface ServiceDetailPageProps {
  service: ServiceItemData;
  onNavigateHome: () => void;
  onNavigateService: (slug: string) => void;
  onNavigate?: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onNavigateHome,
  onNavigateService,
  onNavigate,
}) => {
  const { startScroll } = useSmoothScroll();

  useEffect(() => {
    (window as any).__heroRevealed = true;
    startScroll();
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if ((window as any).__lenis) {
      (window as any).__lenis.start();
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
    document.documentElement.classList.remove('lenis-stopped');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.title = `${service.title} Services | Siddiqui Innovations`;
    return () => {
      document.title = 'Siddiqui Innovations | AI Automation, SEO & Digital Growth';
    };
  }, [service.slug, startScroll]);

  const renderPage = () => {
    switch (service.slug) {
      case 'ai-automation':
        return (
          <AIAutomationPage
            service={service}
            onNavigateHome={onNavigateHome}
            onNavigateService={onNavigateService}
            onNavigate={onNavigate}
          />
        );

      case 'web-development':
        return (
          <WebDevelopmentPage
            service={service}
            onNavigateHome={onNavigateHome}
            onNavigateService={onNavigateService}
            onNavigate={onNavigate}
          />
        );

      case 'digital-marketing':
        return (
          <DigitalMarketingPage
            service={service}
            onNavigateHome={onNavigateHome}
            onNavigateService={onNavigateService}
            onNavigate={onNavigate}
          />
        );

      case 'seo':
        return (
          <SEOPage
            service={service}
            onNavigateHome={onNavigateHome}
            onNavigateService={onNavigateService}
            onNavigate={onNavigate}
          />
        );

      case 'youtube-automation':
        return (
          <YouTubeAutomationPage
            service={service}
            onNavigateHome={onNavigateHome}
            onNavigateService={onNavigateService}
            onNavigate={onNavigate}
          />
        );

      default:
        return (
          <AIAutomationPage
            service={service}
            onNavigateHome={onNavigateHome}
            onNavigateService={onNavigateService}
            onNavigate={onNavigate}
          />
        );
    }
  };

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#00E6D2]/30 border-t-[#00E6D2] animate-spin" />
        </div>
      }
    >
      {renderPage()}
    </Suspense>
  );
};

export default ServiceDetailPage;
