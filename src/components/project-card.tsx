import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { ProjectRecord } from '@/data/projects';
import { GithubIcon } from '@/components/icons';

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-secondary/40 px-2 py-0.5 text-[11px] font-mono text-muted">
      {status}
    </span>
  );
}

export function TechnologyBadge({ tech }: { tech: string }) {
  return (
    <li className="rounded-full border border-border bg-secondary/40 px-2 py-0.5 text-[11px] font-mono text-muted">
      {tech}
    </li>
  );
}

export function ArchitectureChain({ chain }: { chain: string }) {
  return (
    <p className="rounded-lg border border-border bg-secondary/30 px-3 py-2 text-xs font-mono text-muted leading-relaxed overflow-x-auto whitespace-nowrap">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
        Architecture
      </span>
      {chain}
    </p>
  );
}

export function projectTechs(project: ProjectRecord, limit = 5): string[] {
  const stack = Object.values(project.techStack).flat().filter(Boolean) as string[];
  return Array.from(new Set([...project.tags, ...stack])).slice(0, limit);
}

export function ProjectCard({ project }: { project: ProjectRecord }) {
  return (
    <article className="h-full rounded-xl border border-border bg-secondary/20 p-5 flex flex-col gap-4 hover-lift">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-primary uppercase tracking-wide">
            {project.categories.join(' · ')}
          </span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="text-sm text-muted leading-relaxed">{project.summary}</p>
      </div>

      {project.architectureSummary && <ArchitectureChain chain={project.architectureSummary} />}

      <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
        {projectTechs(project).map((tech) => (
          <TechnologyBadge key={tech} tech={tech} />
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3 pt-2">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Case Study
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} repository on GitHub`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <GithubIcon className="w-4 h-4" aria-hidden="true" />
          GitHub
        </a>
        {project.demoUrl && project.demoUrl !== '#demo' && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Live Demo
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
