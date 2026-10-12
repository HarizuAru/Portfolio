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
    <article className="group relative h-full rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-md p-5 flex flex-col gap-4 shadow-[0_0_50px_-20px_rgba(47,129,247,0.35)] hover:shadow-[0_0_70px_-18px_rgba(47,129,247,0.55)] hover:border-primary/30 hover-lift overflow-hidden [&>*:not([data-deco])]:relative [&>*:not([data-deco])]:z-10">
      <div data-deco aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[130%] rounded-full bg-primary/10 blur-3xl" />
      <div
        data-deco
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 -translate-x-[250%] transition-all duration-700 ease-out group-hover:translate-x-[450%] group-hover:opacity-100"
      />
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
          className="inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Case Study
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} repository on GitHub`}
          className="inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <GithubIcon className="w-4 h-4" aria-hidden="true" />
          GitHub
        </a>
        {project.demoUrl && project.demoUrl !== '#demo' && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Live Demo
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
