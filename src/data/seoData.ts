export interface PageSEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  ogType?: 'website' | 'article';
}

export const SITE_NAME = 'Siddiqui Innovations';
export const SITE_DOMAIN = 'https://siddiquiinnovations.com';

export const pageSEOMap: Record<string, PageSEOMetadata> = {
  '/': {
    title: 'Siddiqui Innovations | AI Automation, Web & Software Development',
    description:
      'Empower your business with enterprise AI automation, high-performance web development, custom software, and data-driven SEO built for scalable growth.',
    keywords: [
      'AI Automation',
      'Web Development Agency',
      'Custom Software Development',
      'Enterprise Automation',
      'Digital Transformation',
      'SEO Services',
    ],
    canonicalPath: '/',
    ogType: 'website',
  },
  '/about': {
    title: 'About Us | Siddiqui Innovations - AI, Web & Software Agency',
    description:
      'Meet the engineering team and digital architects behind Siddiqui Innovations. Learn how we empower businesses globally with AI-first digital solutions.',
    keywords: [
      'About Siddiqui Innovations',
      'AI Engineering Team',
      'Software Architects',
      'Muneeb Siddiqui',
      'Digital Agency Leadership',
    ],
    canonicalPath: '/about',
    ogType: 'website',
  },
  '/projects': {
    title: 'Client Work & Case Studies | Siddiqui Innovations Portfolio',
    description:
      'Explore real-world client projects, live enterprise websites, production AI automation bots, and software systems engineered by Siddiqui Innovations.',
    keywords: [
      'Software Case Studies',
      'Web Development Portfolio',
      'AI Automation Projects',
      'Client Results',
      'Siddiqui Innovations Work',
    ],
    canonicalPath: '/projects',
    ogType: 'website',
  },
  '/contact': {
    title: 'Contact Us | Start Your Project with Siddiqui Innovations',
    description:
      'Get in touch with our team for custom AI automation, web development, or software solutions. Schedule a discovery call or request a detailed project proposal.',
    keywords: [
      'Contact Siddiqui Innovations',
      'Hire AI Engineers',
      'Web Development Consultation',
      'Project Discovery Call',
      'Software Quote',
    ],
    canonicalPath: '/contact',
    ogType: 'website',
  },
  '/services/ai-automation': {
    title: 'AI Automation & Intelligent Agent Solutions | Siddiqui Innovations',
    description:
      'Automate repetitive workflows, customer support, and operational bottlenecks with custom AI agents and enterprise automation pipelines built for modern teams.',
    keywords: [
      'AI Automation Services',
      'Intelligent AI Agents',
      'Workflow Automation',
      'Business Process Automation',
      'Customer Support Chatbots',
      'LLM Integration',
    ],
    canonicalPath: '/services/ai-automation',
    ogType: 'website',
  },
  '/services/web-development': {
    title: 'Custom Web Development & Modern Web Apps | Siddiqui Innovations',
    description:
      'Build ultra-fast, high-converting websites and modern web applications with Next.js, React, and robust cloud infrastructure designed for maximum conversion.',
    keywords: [
      'Custom Web Development',
      'React Web Apps',
      'Next.js Development',
      'High Converting Websites',
      'Enterprise Web Architecture',
      'Full Stack Development',
    ],
    canonicalPath: '/services/web-development',
    ogType: 'website',
  },
  '/services/software-development': {
    title: 'Enterprise Software Development Services | Siddiqui Innovations',
    description:
      'Custom software architecture, cloud platforms, and internal business tools designed to scale operations, eliminate technical debt, and maximize efficiency.',
    keywords: [
      'Custom Software Development',
      'Enterprise Software Architecture',
      'Cloud Platforms',
      'Internal Tooling',
      'SaaS Development',
      'Backend Engineering',
    ],
    canonicalPath: '/services/software-development',
    ogType: 'website',
  },
  '/services/digital-marketing': {
    title: 'Performance Digital Marketing & Lead Gen | Siddiqui Innovations',
    description:
      'Drive qualified leads, accelerate pipeline revenue, and scale customer acquisition with data-backed digital marketing funnels and targeted ad campaigns.',
    keywords: [
      'Digital Marketing Agency',
      'Lead Generation Systems',
      'Performance Marketing',
      'Customer Acquisition Funnels',
      'Paid Ads Management',
    ],
    canonicalPath: '/services/digital-marketing',
    ogType: 'website',
  },
  '/services/seo': {
    title: 'Enterprise SEO & Search Engine Optimization | Siddiqui Innovations',
    description:
      'Rank on Google and AI search engines with technical SEO, entity content strategy, and authority link architectures that deliver compounding organic traffic.',
    keywords: [
      'Enterprise SEO Services',
      'Search Engine Optimization',
      'AI Search Optimization (AEO)',
      'Technical SEO Audit',
      'Organic Search Traffic',
      'Local SEO',
    ],
    canonicalPath: '/services/seo',
    ogType: 'website',
  },
  '/services/youtube-automation': {
    title: 'YouTube Automation & Channel Growth Systems | Siddiqui Innovations',
    description:
      'Scale your YouTube presence with automated content research, script writing, high-retention video production, and systematic publishing workflows.',
    keywords: [
      'YouTube Automation Agency',
      'Channel Growth Pipeline',
      'Automated Video Production',
      'Script Writing AI',
      'YouTube Content Strategy',
    ],
    canonicalPath: '/services/youtube-automation',
    ogType: 'website',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Siddiqui Innovations',
    description:
      'Read our privacy policy to understand how Siddiqui Innovations collects, protects, and handles client data, security standards, and personal information.',
    canonicalPath: '/privacy-policy',
    ogType: 'website',
  },
  '/terms': {
    title: 'Terms and Conditions | Siddiqui Innovations',
    description:
      'Review the official terms of service, service agreements, and usage policies for engineering and digital solutions provided by Siddiqui Innovations.',
    canonicalPath: '/terms',
    ogType: 'website',
  },
  '404': {
    title: 'Page Not Found (404) | Siddiqui Innovations',
    description:
      'The requested page could not be found. Navigate back to the homepage or explore our AI automation, web development, and custom software services.',
    canonicalPath: '/',
    ogType: 'website',
  },
};

/**
 * Returns metadata for a given path with intelligent route normalization
 */
export function getSEOMetadata(pathname: string): PageSEOMetadata {
  const cleanPath = pathname.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';

  // Direct exact match
  if (pageSEOMap[cleanPath]) {
    return pageSEOMap[cleanPath];
  }

  // Aliases
  if (cleanPath === '/about-us') return pageSEOMap['/about'];
  if (cleanPath === '/contact-us') return pageSEOMap['/contact'];
  if (cleanPath === '/privacy') return pageSEOMap['/privacy-policy'];
  if (cleanPath === '/terms-and-conditions' || cleanPath === '/terms-of-service') {
    return pageSEOMap['/terms'];
  }

  // Service path prefix aliases
  if (cleanPath.startsWith('/services/') || cleanPath.startsWith('/service/')) {
    const slug = cleanPath.replace(/^\/services?\//, '');
    const serviceKey = `/services/${slug}`;
    if (pageSEOMap[serviceKey]) {
      return pageSEOMap[serviceKey];
    }
  }

  // Default to 404 if not found
  return pageSEOMap['404'];
}
