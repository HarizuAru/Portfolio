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

const LEFT_X = 250;
const RIGHT_X = 630;
const TOP = 48;
const ROW = 44;

// Two-column wiring: every label has its own row, so nothing collides.
// Same data and interactions as before, minus the spaghetti.
export function SkillConstellation() {
  const [active, setActive] = useState<string | null>(null);

  const { skills, projects, links, height: H } = useMemo(() => {
    const top = skillNodes()
      .filter((s) => s.usage > 0)
      .slice(0, 12);
    const skillPos = top.map((s, i) => ({ ...s, x: LEFT_X, y: TOP + i * ROW }));
    const projectPos = projectsData.map((p, j) => ({ p, x: RIGHT_X, y: TOP + j * ROW }));
    const ls: { from: (typeof skillPos)[number]; to: (typeof projectPos)[number] }[] = [];
    for (const s of skillPos) {
      for (const t of projectPos) {
        if (projectUses(t.p, s.skill)) ls.push({ from: s, to: t });
      }
    }
    const height = TOP + Math.max(skillPos.length, projectPos.length - 1) * ROW + 40;
    return { skills: skillPos, projects: projectPos, links: ls, height };
  }, []);

  const activeSkill = skills.find((s) => `skill:${s.skill}` === active);
  const isLinked = (l: (typeof links)[number]) =>
    !active ||
    `skill:${l.from.skill}` === active ||
    `project:${l.to.p.slug}` === active;

  const caption = activeSkill
    ? `${activeSkill.skill} · used in ${activeSkill.usage} project${activeSkill.usage === 1 ? '' : 's'}: ${projects
        .filter((t) => projectUses(t.p, activeSkill.skill))
        .map((t) => t.p.title)
        .join(', ')}`
    : active && active.startsWith('project:')
      ? (() => {
          const t = projects.find((x) => `project:${x.p.slug}` === active);
          if (!t) return 'Hover a row — every wire is a real documented project.';
          return `${t.p.title} — ${links.filter((l) => l.to.p.slug === t.p.slug).length} mapped skills`;
        })()
      : 'Hover a row — every wire is a real documented project.';

  const curve = (x1: number, y1: number, x2: number, y2: number) =>
    `M ${x1} ${y1} C ${x1 + 110} ${y1}, ${x2 - 110} ${y2}, ${x2} ${y2}`;

  return (
    <div className="rounded-xl border border-border bg-secondary/20 p-4 sm:p-6 space-y-3">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 980 ${H}`}
          role="img"
          aria-label="Skills wired to the projects that use them"
          className="w-full h-auto min-w-[620px] select-none"
        >
          {links.map((l, i) => {
            const on = isLinked(l);
            return (
              <path
                key={i}
                d={curve(l.from.x + 8, l.from.y, l.to.x - 8, l.to.y)}
                fill="none"
                strokeWidth={on ? 2 : 1.2}
                className={on ? 'stroke-primary' : 'stroke-border'}
                opacity={on ? 0.8 : 0.22}
                style={{ transition: 'opacity 200ms ease' }}
              />
            );
          })}

          {skills.map((s) => {
            const id = `skill:${s.skill}`;
            const dim = !!active && id !== active;
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
                <text
                  x={s.x - 16}
                  y={s.y + 4}
                  textAnchor="end"
                  fontSize={12}
                  fontFamily="var(--font-mono, monospace)"
                  className="fill-muted"
                  opacity={dim ? 0.25 : 0.95}
                >
                  {s.skill}
                  <title>{`${s.skill} ×${s.usage}`}</title>
                </text>
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={id === active ? 8 : 5 + Math.min(s.usage, 4)}
                  className="fill-primary/20 stroke-primary"
                  strokeWidth={id === active ? 2.5 : 1.5}
                  opacity={dim ? 0.25 : 1}
                />
              </a>
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
                  r={id === active ? 9 : 6}
                  className="fill-secondary stroke-muted"
                  strokeWidth={1.5}
                  opacity={dim ? 0.25 : 1}
                >
                  <title>{p.title}</title>
                </circle>
                <text
                  x={x + 16}
                  y={y + 4}
                  textAnchor="start"
                  fontSize={12}
                  fontFamily="var(--font-mono, monospace)"
                  className="fill-muted"
                  opacity={dim ? 0.25 : 0.95}
                >
                  {p.title}
                </text>
              </a>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] font-mono text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary/40 border border-primary inline-block" /> skill
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
