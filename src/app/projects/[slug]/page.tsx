import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectPageClient } from '@/components/project-page-client';
import { RelatedProjects } from '@/components/related-projects';
import { projectsData } from '@/data/projects';
import { portfolioConfig } from '@/data/portfolio';

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };
  const techs = Array.from(
    new Set([...project.tags, ...Object.values(project.techStack).flat()].filter(Boolean))
  )
    .slice(0, 6)
    .join(', ');
  return {
    title: `${project.title} | Hariz Iskandar`,
    description: `${project.category} project: ${project.summary} Technologies: ${techs}.`,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      title: `${project.title} | Hariz Iskandar`,
      description: project.summary,
      url: `/projects/${project.slug}/`,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: project.title,
            description: project.summary,
            url: `${portfolioConfig.siteUrl}/projects/${project.slug}/`,
            codeRepository: project.githubUrl,
            programmingLanguage: project.tags,
            author: { '@type': 'Person', name: portfolioConfig.name, url: portfolioConfig.siteUrl },
          }),
        }}
      />
      <ProjectPageClient id={project.id} />
      <RelatedProjects project={project} />
    </>
  );
}
