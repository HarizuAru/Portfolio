'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { projectsData, type ProjectRecord } from '@/data/projects';
import { ProjectCard } from '@/components/project-card';
import { EmptyState } from '@/components/section';

export const projectFilters = ['All', 'Cloud', 'Security', 'Networking', 'DevOps', 'AI', 'Web', 'IoT'] as const;

const difficultyRank: Record<ProjectRecord['difficulty'], number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
  Expert: 3,
};

type SortKey = 'featured' | 'newest' | 'complexity';

function matches(project: ProjectRecord, q: string): boolean {
  const hay = [
    project.title,
    project.subtitle,
    project.summary,
    project.category,
    ...project.categories,
    ...project.tags,
    ...Object.values(project.techStack).flat(),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => hay.includes(token));
}

function ProjectExplorerInner() {
  const router = useRouter();
  // Defaults render fully in static HTML; URL params apply after hydration.
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [skill, setSkill] = useState('');
  const [sort, setSort] = useState<SortKey>('featured');

  // Mount-only sync of URL params into state so the static prerender stays
  // complete for SEO. This intentionally runs once, not per render.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- mount-only URL param sync */
    const sp = new URLSearchParams(window.location.search);
    setQuery(sp.get('q') ?? '');
    setCategory(sp.get('category') ?? 'All');
    setSkill(sp.get('skill') ?? '');
    const s = sp.get('sort');
    if (s === 'newest' || s === 'complexity' || s === 'featured') setSort(s);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const syncUrl = (next: { q: string; category: string; skill: string; sort: string }) => {
    const sp = new URLSearchParams();
    if (next.q) sp.set('q', next.q);
    if (next.category && next.category !== 'All') sp.set('category', next.category);
    if (next.skill) sp.set('skill', next.skill);
    if (next.sort && next.sort !== 'featured') sp.set('sort', next.sort);
    const qs = sp.toString();
    router.replace(`/projects${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const results = useMemo(() => {
    const filtered = projectsData.filter((p) => {
      if (category !== 'All' && !p.categories.includes(category)) return false;
      if (skill && !matches(p, skill)) return false;
      if (query && !matches(p, query)) return false;
      return true;
    });
    return [...filtered].sort((a, b) => {
      if (sort === 'newest') return b.completionDate.localeCompare(a.completionDate);
      if (sort === 'complexity') return difficultyRank[b.difficulty] - difficultyRank[a.difficulty];
      return Number(b.featured ?? false) - Number(a.featured ?? false);
    });
  }, [query, category, skill, sort]);

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 text-xs font-mono cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
      active
        ? 'border-primary/50 bg-primary/10 text-primary'
        : 'border-border bg-secondary/30 text-muted hover:text-foreground'
    }`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <label className="flex-1">
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              syncUrl({ q: e.target.value, category, skill, sort });
            }}
            placeholder="Search title, technology, category…"
            className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">
          Sort
          <select
            value={sort}
            onChange={(e) => {
              const v = e.target.value as SortKey;
              setSort(v);
              syncUrl({ q: query, category, skill, sort: v });
            }}
            className="rounded-lg border border-border bg-secondary/30 px-2 py-2 text-sm text-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="complexity">Complexity</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
        {projectFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setCategory(f);
              syncUrl({ q: query, category: f, skill, sort });
            }}
            aria-pressed={category === f}
            className={chip(category === f)}
          >
            {f}
          </button>
        ))}
        {skill && (
          <button
            type="button"
            onClick={() => {
              setSkill('');
              syncUrl({ q: query, category, skill: '', sort });
            }}
            className="rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-xs font-mono text-primary cursor-pointer"
            title="Clear skill filter"
          >
            skill: {skill} ✕
          </button>
        )}
      </div>

      <p className="text-sm text-muted font-mono" role="status" aria-live="polite">
        {results.length} of {projectsData.length} projects
      </p>

      {results.length === 0 ? (
        <EmptyState
          title="No projects match"
          description="Try a different search term or clear the category and skill filters."
        />
      ) : (
        <div
          key={`${category}|${sort}|${skill}`}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-grid-in"
        >
          {results.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectExplorer() {
  return (
    <Suspense fallback={<p className="text-sm text-muted font-mono">Loading projects…</p>}>
      <ProjectExplorerInner />
    </Suspense>
  );
}
