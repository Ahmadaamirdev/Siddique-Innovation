/**
 * High-performance route prefetching utility.
 * Silently loads chunk modules in idle moments so navigation is instantaneous.
 */

const prefetchMap: Record<string, () => Promise<unknown>> = {
  '/about': () => import('@/pages/AboutPage'),
  '/about-us': () => import('@/pages/AboutPage'),
  '/projects': () => import('@/pages/ProjectsPage'),
  '/contact': () => import('@/pages/ContactPage'),
  '/contact-us': () => import('@/pages/ContactPage'),
  '/privacy-policy': () => import('@/pages/PrivacyPolicyPage'),
  '/privacy': () => import('@/pages/PrivacyPolicyPage'),
  '/terms': () => import('@/pages/TermsPage'),
  '/terms-and-conditions': () => import('@/pages/TermsPage'),
  '/terms-of-service': () => import('@/pages/TermsPage'),
  '/services/ai-automation': () => import('@/pages/services/AIAutomationPage'),
  '/services/web-development': () => import('@/pages/services/WebDevelopmentPage'),
  '/services/digital-marketing': () => import('@/pages/services/DigitalMarketingPage'),
  '/services/seo': () => import('@/pages/services/SEOPage'),
  '/services/youtube-automation': () => import('@/pages/services/YouTubeAutomationPage'),
};

const prefetchedSet = new Set<string>();

/**
 * Prefetches a specific route module by path.
 */
export function prefetchRoute(path: string): void {
  if (typeof window === 'undefined') return;

  const cleanPath = path.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  if (prefetchedSet.has(cleanPath)) return;

  const loader = prefetchMap[cleanPath];
  if (loader) {
    prefetchedSet.add(cleanPath);
    loader().catch(() => {
      // Allow retry if failed due to offline/intermittent network
      prefetchedSet.delete(cleanPath);
    });
  }
}

/**
 * Prefetches common secondary routes in low-priority idle cycles
 * after the current page has mounted.
 */
export function prefetchCommonRoutes(): void {
  if (typeof window === 'undefined') return;

  const priorityRoutes = [
    '/about',
    '/projects',
    '/contact',
    '/services/ai-automation',
    '/services/web-development',
    '/services/digital-marketing',
    '/services/seo',
    '/services/youtube-automation',
  ];

  const requestIdle =
    (window as any).requestIdleCallback ||
    ((cb: () => void) => setTimeout(cb, 1200));

  requestIdle(() => {
    priorityRoutes.forEach((route, index) => {
      // Stagger downloads by 180ms to avoid clogging mobile network thread
      setTimeout(() => {
        prefetchRoute(route);
      }, index * 180);
    });
  });
}
