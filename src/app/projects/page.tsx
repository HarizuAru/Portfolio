import type { Metadata } from 'next';
import { PageHeader } from '@/components/section';
import { ProjectExplorer } from '@/components/project-explorer';

export const metadata: Metadata = {
  title: 'Projects | Hariz Iskandar',
  description:
    'Engineering project explorer: cloud, security, networking, DevOps, AI and IoT case studies with architecture, decisions and code.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <PageHeader
        title="Projects"
        description="Every project is a documented engineering case study: problem, architecture, decisions, security, and code. Filter by domain or search by technology."
      />
      <ProjectExplorer />
    </div>
  );
}
