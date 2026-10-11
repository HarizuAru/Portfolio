'use client';

import { useMemo, useState } from 'react';
import { projectsData, type ProjectRecord } from '@/data/projects';
import { skillNodes } from '@/data/skills';

function projectUses(project: ProjectRecord, skill: string): boolean {
  const hay = [...project.tags, ...Object.values(project.techStack).flat()]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return hay.includes(skill.toLowerCase());
}

const W = 760;
const H = 500;
const CX = 380;
const CY = 250;

// Every position derives from the index — stable across renders, no layout lib.
export function SkillConstellation() {
  const [active, setActive] = useState<string | null>(null);

  const { skills, projects, links } = useMemo(() => {
    const top = skillNodes()
      .filter((s) => s.usage > 0)
      .slice(0, 14);
    const skillPos = top.map((s, k) => {
      const r = 48 + k * 8;
      const a = k * 2.39996;
      return { ...s, x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) * 0.8 };
    });
    const projectPos = projectsData.map((p, i) => {
      const a = (i / projectsData.length) * Math.PI * 2 - Math.PI / 2;
      return { p, x: CX + 318 * Math.cos(a), y: CY + 188 * Math.sin(a) };
    });
    const ls: { from: (typeof skillPos)[number]; to: (typeof projectPos)[number] }[] = [];
    for (const s of skillPos) {
      for (const t of projectPos) {
        if (projectUses(t.p, s.skill)) ls.push({ from: s, to: t });
      }
    }
    return { skills: skillPos, projects: projectPos, links: ls };
  }, []);

  const activeSkill = skills.find((s) => `skill:${s.skill}` === active);
  const activeProject = projects.find((t) => `project:${t.p.slug}` === active);
  const isLinked = (l: (typeof links)[number]) =>
    !active ||
    `skill:${l.from.skill}` === active ||
    `project:${l.to.p.slug}` === active;

  const caption = activeSkill
    ? `${activeSkill.skill} · used in ${activeSkill.usage} project${activeSkill.usage === 1 ? '' : 's'}: ${projects
        .filter((t) => projectUses(t.p, activeSkill.skill))
        .map((t) => t.p.title)
        .join(', ')}`
    : activeProject
      ? `${activeProject.p.title} — ${links.filter((l) => l.to.p.slug === activeProject.p.slug).length} mapped skills`
      : 'Hover a node — every link is a real documented project.';

  return (
    <div className="rounded-xl border border-border bg-secondary/20 p-4 sm:p-6 space-y-3">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Map of skills connected to the projects that use them"
        className="w-full h-auto select-none"
      >
        {links.map((l, i) => {
          const on = isLinked(l);
          const mx = (l.from.x + l.to.x) / 2;
          const my = (l.from.y + l.to.y) / 2 - 24;
          return (
            <path
              key={i}
              d={`M ${l.from.x} ${l.from.y} Q ${mx} ${my} ${l.to.x} ${l.to.y}`}
              fill="none"
              strokeWidth={on ? 1.6 : 1}
              className={on ? 'stroke-primary' : 'stroke-border'}
              opacity={on ? 0.75 : 0.18}
              style={{ transition: 'opacity 200ms ease' }}
            />
          );
        })}

        {projects.map(({ p, x, y }) => {
          const id = `project:${p.slug}`;
          const dim = !!active && id !== active && !(activeSkill && projectUses(p, activeSkill.skill));
          return (
            <a
              key={id}
              href={`/projects/${p.slug}`}
              onMouseEnter={() => setActive(id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(id)}
              onBlur={() => setActive(null)}
              aria-label={`Project: ${p.title}`}
            >
              <circle
                cx={x}
                cy={y}
                r={id === active ? 10 : 7}
                className="fill-secondary stroke-muted"
                strokeWidth={1.5}
                opacity={dim ? 0.25 : 1}
              >
                <title>{p.title}</title>
              </circle>
            </a>
          );
        })}

        {skills.map((s) => {
          const id = `skill:${s.skill}`;
          const dim = !!active && id !== active && !(activeProject && projectUses(activeProject.p, s.skill));
          const anchor = s.x < CX ? 'end' : 'start';
          return (
            <a
              key={id}
              href={`/projects?skill=${encodeURIComponent(s.skill)}`}
              onMouseEnter={() => setActive(id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(id)}
              onBlur={() => setActive(null)}
              aria-label={`Skill: ${s.skill}, used in ${s.usage} projects`}
            >
              <circle
                cx={s.x}
                cy={s.y}
                r={5 + s.usage * 1.6}
                className="fill-primary/20 stroke-primary"
                strokeWidth={id === active ? 2.5 : 1.5}
                opacity={dim ? 0.25 : 1}
              >
                <title>{`${s.skill} ×${s.usage}`}</title>
              </circle>
              <text
                x={s.x + (anchor === 'end' ? -10 : 10)}
                y={s.y + 3.5}
                textAnchor={anchor}
                fontSize={11}
                fontFamily="var(--font-mono, monospace)"
                className="fill-muted"
                opacity={dim ? 0.25 : 0.9}
              >
                {s.skill}
              </text>
            </a>
          );
        })}
      </svg>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] font-mono text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary/40 border border-primary inline-block" /> skill (size ∝ projects)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary border border-muted inline-block" /> project
        </span>
      </div>
      <p className="text-xs text-muted min-h-[1.25rem]" role="status">
        {caption}
      </p>
    </div>
  );
}
