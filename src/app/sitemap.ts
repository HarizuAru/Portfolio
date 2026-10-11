import type { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects';
import { portfolioConfig } from '@/data/portfolio';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = portfolioConfig.siteUrl;
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectsData.map((project) => ({
      url: `${base}/project/${project.id}/`,
      lastModified: new Date(project.completionDate),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
