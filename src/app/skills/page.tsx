import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/section';
import { SkillConstellation } from '@/components/skill-constellation';
import { skillGroups, skillUsage } from '@/data/skills';

export const metadata: Metadata = {
  title: 'Skills | Hariz Iskandar',
  description:
    'Technical capability map: cloud, security, networking, DevOps, programming, infrastructure, databases and observability — with project usage.',
  alternates: { canonical: '/skills' },
};

export default function SkillsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <PageHeader
        title="Technical Skills"
        description="How skills connect to real work. The map wires each skill to the documented projects that use it — select any node to see those projects."
      />
      <SkillConstellation />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {skillGroups.map((group) => (
          <article key={group.title} className="rounded-lg border border-border bg-secondary/20 p-5 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{group.title}</h2>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const n = skillUsage(skill);
                return (
                  <li key={`${group.title}-${skill}`}>
                    <Link
                      href={`/projects?skill=${encodeURIComponent(skill)}`}
                      title={n > 0 ? `Used in ${n} project${n === 1 ? '' : 's'}` : skill}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-xs font-mono text-muted hover:text-foreground hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {skill}
                      {n > 0 && <span className="text-primary">×{n}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
