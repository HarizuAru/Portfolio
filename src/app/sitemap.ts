import type { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects';
import { portfolioConfig } from '@/data/portfolio';

export const dynamic = 'force-static';

const staticRoutes = [
  '/',
  '/projects',
  '/experience',
  '/skills',
  '/certifications',
  '/about',
  '/resume',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = portfolioConfig.siteUrl;
  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route === '/' ? '' : route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '/' ? 1 : 0.8,
    })),
    ...projectsData.map((project) => ({
      url: `${base}/projects/${project.slug}/`,
      lastModified: project.completionDate ? new Date(project.completionDate) : new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
