import { notFound } from 'next/navigation';
import { ProjectPageClient } from '@/components/project-page-client';
import { projectsData } from '@/data/projects';

export function generateStaticParams() {
  return projectsData.map((project) => ({ id: project.id }));
}

export const dynamicParams = false;

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const projectExists = projectsData.some((project) => project.id === id);
  if (!projectExists) {
    notFound();
  }

  return <ProjectPageClient id={id} />;
}
