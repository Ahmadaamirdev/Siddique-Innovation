import React, { useEffect } from 'react';
import type { ServiceItemData } from '../data/servicesData';
import { AIAutomationPage } from './services/AIAutomationPage';
import { WebDevelopmentPage } from './services/WebDevelopmentPage';
import { DigitalMarketingPage } from './services/DigitalMarketingPage';
import { SEOPage } from './services/SEOPage';
import { YouTubeAutomationPage } from './services/YouTubeAutomationPage';

import { useSmoothScroll } from './SmoothScrollProvider';

interface ServiceDetailPageProps {
  service: ServiceItemData;
  onNavigateHome: () => void;
  onNavigateService: (slug: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onNavigateHome,
  onNavigateService,
}) => {
  const { startScroll } = useSmoothScroll();

  useEffect(() => {
    (window as any).__heroRevealed = true;
    startScroll();
    if ((window as any).__lenis) {
      (window as any).__lenis.start();
      (window as any).__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    document.documentElement.classList.remove('lenis-stopped');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.title = `${service.title} Services | Siddiqui Innovations`;
    return () => {
      document.title = 'Siddiqui Innovations | AI Automation, SEO & Digital Growth';
    };
  }, [service.slug, startScroll]);

  switch (service.slug) {
    case 'ai-automation':
      return (
        <AIAutomationPage
          service={service}
          onNavigateHome={onNavigateHome}
          onNavigateService={onNavigateService}
        />
      );

    case 'web-development':
      return (
        <WebDevelopmentPage
          service={service}
          onNavigateHome={onNavigateHome}
          onNavigateService={onNavigateService}
        />
      );

    case 'digital-marketing':
      return (
        <DigitalMarketingPage
          service={service}
          onNavigateHome={onNavigateHome}
          onNavigateService={onNavigateService}
        />
      );

    case 'seo':
      return (
        <SEOPage
          service={service}
          onNavigateHome={onNavigateHome}
          onNavigateService={onNavigateService}
        />
      );

    case 'youtube-automation':
      return (
        <YouTubeAutomationPage
          service={service}
          onNavigateHome={onNavigateHome}
          onNavigateService={onNavigateService}
        />
      );

    default:
      return (
        <AIAutomationPage
          service={service}
          onNavigateHome={onNavigateHome}
          onNavigateService={onNavigateService}
        />
      );
  }
};
