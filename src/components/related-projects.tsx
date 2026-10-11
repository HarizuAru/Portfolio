import { projectsData, type ProjectRecord } from '@/data/projects';
import { ProjectCard, projectTechs } from '@/components/project-card';
import { SectionHeader } from '@/components/section';

function relatedProjects(project: ProjectRecord, limit = 3): ProjectRecord[] {
  const techs = new Set(projectTechs(project, 20).map((t) => t.toLowerCase()));
  return projectsData
    .filter((p) => p.id !== project.id)
    .map((p) => {
      const sharedCategories = p.categories.filter((c) => project.categories.includes(c)).length;
      const sharedTech = projectTechs(p, 20).filter((t) => techs.has(t.toLowerCase())).length;
      return { p, score: sharedCategories * 3 + sharedTech };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

export function RelatedProjects({ project }: { project: ProjectRecord }) {
  const related = relatedProjects(project);
  if (related.length === 0) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
      <SectionHeader
        eyebrow="Keep exploring"
        title="Related Projects"
        action={{ label: 'All projects', href: '/projects' }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {related.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
