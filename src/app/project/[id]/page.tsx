import { projectsData } from '@/data/projects';
import { LegacyRedirect } from '@/components/legacy-redirect';

export function generateStaticParams() {
  return projectsData.map((project) => ({ id: project.id }));
}

export const dynamicParams = false;

interface LegacyProjectPageProps {
  params: Promise<{ id: string }>;
}

// Static hosting has no server-side redirects, so legacy /project/[id]
// URLs render a page that immediately navigates to /projects/[slug].
export default async function LegacyProjectPage({ params }: LegacyProjectPageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);
  return <LegacyRedirect to={project ? `/projects/${project.slug}/` : '/projects'} />;
}
