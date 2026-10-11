import type { MetadataRoute } from 'next';
import { portfolioConfig } from '@/data/portfolio';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${portfolioConfig.siteUrl}/sitemap.xml`,
  };
}
