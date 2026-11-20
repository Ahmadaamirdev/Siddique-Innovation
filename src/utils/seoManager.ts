import { getSEOMetadata, SITE_NAME, SITE_DOMAIN } from '@/data/seoData';

/**
 * Safely updates or creates a <meta> tag in document.head
 */
function setMetaTag(selector: string, attributeName: string, attributeValue: string, content: string) {
  if (typeof document === 'undefined') return;

  let meta = document.head.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attributeName, attributeValue);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/**
 * Safely updates or creates a <link rel="..."> tag in document.head
 */
function setLinkTag(rel: string, href: string) {
  if (typeof document === 'undefined') return;

  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Applies complete, professional SEO metadata to the active document head
 */
export function applyPageSEO(pathname: string) {
  if (typeof document === 'undefined') return;

  const metadata = getSEOMetadata(pathname);
  const fullCanonicalUrl = `${SITE_DOMAIN}${metadata.canonicalPath || pathname}`;

  // 1. Page Title
  document.title = metadata.title;

  // 2. Primary Meta Description
  setMetaTag('meta[name="description"]', 'name', 'description', metadata.description);

  // 3. Keywords (if present)
  if (metadata.keywords && metadata.keywords.length > 0) {
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', metadata.keywords.join(', '));
  }

  // 4. Canonical URL
  setLinkTag('canonical', fullCanonicalUrl);

  // 5. OpenGraph Tags (Facebook, LinkedIn, Discord, Slack)
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', metadata.title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', metadata.description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', fullCanonicalUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', metadata.ogType || 'website');
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', `${SITE_DOMAIN}/android-chrome-512x512.png`);

  // 6. Twitter Card Tags
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', metadata.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', metadata.description);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', `${SITE_DOMAIN}/android-chrome-512x512.png`);
}
