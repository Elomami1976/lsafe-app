import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageSEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}

const BASE_URL = 'https://lsafe.io';

const PageSEO: React.FC<PageSEOProps> = ({ title, description, ogTitle, ogDescription }) => {
  const location = useLocation();

  useEffect(() => {
    const canonicalUrl = `${BASE_URL}${location.pathname === '/' ? '/' : location.pathname}`;

    // Update document title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = canonicalUrl;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = canonicalUrl;
      document.head.appendChild(canonical);
    }

    // Update Open Graph tags
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) ogTitleTag.setAttribute('content', ogTitle || title);

    const ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) ogDescTag.setAttribute('content', ogDescription || description);

    const ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (ogUrlTag) ogUrlTag.setAttribute('content', canonicalUrl);

    // Update Twitter tags
    const twTitleTag = document.querySelector('meta[property="twitter:title"]');
    if (twTitleTag) twTitleTag.setAttribute('content', ogTitle || title);

    const twDescTag = document.querySelector('meta[property="twitter:description"]');
    if (twDescTag) twDescTag.setAttribute('content', ogDescription || description);

    const twUrlTag = document.querySelector('meta[property="twitter:url"]');
    if (twUrlTag) twUrlTag.setAttribute('content', canonicalUrl);
  }, [location.pathname, title, description, ogTitle, ogDescription]);

  return null;
};

export default PageSEO;
