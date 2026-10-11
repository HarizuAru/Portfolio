'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/global-context';
import { projectsData } from '@/data/projects';
import { portfolioConfig } from '@/data/portfolio';
import {
  Search,
  Briefcase,
  Moon,
  Sun,
  Hash,
  CornerDownLeft,
  FileText,
  Mail,
  Compass,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from '@/components/icons';

type Item =
  | { kind: 'project'; id: string; title: string; subtitle: string; meta: string }
  | { kind: 'skill'; id: string; title: string; subtitle: string }
  | { kind: 'page'; id: string; title: string; subtitle: string }
  | { kind: 'action'; id: string; title: string; subtitle: string };

const pages: Item[] = [
  { kind: 'page', id: 'nav-projects', title: 'Projects', subtitle: 'Browse all case studies' },
  { kind: 'page', id: 'nav-experience', title: 'Experience', subtitle: 'Work history' },
  { kind: 'page', id: 'nav-skills', title: 'Skills', subtitle: 'Technical capability map' },
  { kind: 'page', id: 'nav-certifications', title: 'Certifications', subtitle: 'Credentials and goals' },
  { kind: 'page', id: 'nav-about', title: 'About', subtitle: 'Background and direction' },
  { kind: 'page', id: 'nav-resume', title: 'Resume', subtitle: 'Printable web resume' },
  { kind: 'page', id: 'nav-contact', title: 'Contact', subtitle: 'Send a message' },
];

function tokenMatch(hay: string, query: string): boolean {
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => hay.includes(token));
}

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, recruiterMode, setRecruiterMode, theme, setTheme } =
    useGlobalContext();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (
        e.key === '/' &&
        !commandPaletteOpen &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setQuery('');
        setSelectedIndex(0);
      }, 50);
    }
  }, [commandPaletteOpen]);

  const run = (item: Item) => {
    setCommandPaletteOpen(false);
    switch (item.kind) {
      case 'project':
        router.push(`/projects/${item.id}`);
        break;
      case 'skill':
        router.push(`/projects?skill=${encodeURIComponent(item.id)}`);
        break;
      case 'page':
        router.push(`/${item.id.replace('nav-', '') === 'projects' ? 'projects' : item.id.replace('nav-', '')}`);
        break;
      case 'action':
        if (item.id === 'toggle-recruiter') setRecruiterMode(!recruiterMode);
        else if (item.id === 'toggle-theme') setTheme(theme === 'dark' ? 'light' : 'dark');
        else if (item.id === 'open-github') window.open(portfolioConfig.socialLinks.github, '_blank', 'noopener');
        else if (item.id === 'open-linkedin' && portfolioConfig.socialLinks.linkedin !== '#')
          window.open(portfolioConfig.socialLinks.linkedin, '_blank', 'noopener');
        else if (item.id === 'email') window.location.href = `mailto:${portfolioConfig.email}`;
        else if (item.id === 'download-resume') router.push('/resume');
        break;
    }
  };

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const projectItems: Item[] = (q === '' ? projectsData.slice(0, 4) : projectsData.filter((p) =>
      tokenMatch(
        [p.title, p.subtitle, p.summary, p.category, ...p.categories, ...p.tags].join(' ').toLowerCase(),
        q
      )
    )).map((p) => ({ kind: 'project', id: p.slug, title: p.title, subtitle: p.subtitle, meta: p.category }) as Item);

    const allSkills = portfolioConfig.skills.flatMap((g) => g.items.map((s) => ({ group: g.title, skill: s })));
    const skillItems: Item[] = (q === '' ? allSkills.slice(0, 0) : allSkills.filter(({ skill }) =>
      tokenMatch(skill.toLowerCase(), q)
    ))
      .slice(0, 6)
      .map(({ group, skill }) => ({ kind: 'skill', id: skill, title: skill, subtitle: `Skill · ${group}` }) as Item);

    const pageItems = pages.filter((p) => q === '' || tokenMatch(`${p.title} ${p.subtitle}`.toLowerCase(), q));

    const actions: Item[] = [
      { kind: 'action', id: 'toggle-theme', title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode', subtitle: 'Toggle theme' },
      { kind: 'action', id: 'toggle-recruiter', title: recruiterMode ? 'Deactivate Recruiter Mode' : 'Activate Recruiter Mode', subtitle: 'Expanded project review details' },
      { kind: 'action', id: 'download-resume', title: 'Open Resume', subtitle: 'Printable web resume' },
      { kind: 'action', id: 'open-github', title: 'Open GitHub', subtitle: 'Profile in a new tab' },
      { kind: 'action', id: 'email', title: 'Email Hariz', subtitle: portfolioConfig.email },
    ];
    if (portfolioConfig.socialLinks.linkedin !== '#') {
      actions.push({ kind: 'action', id: 'open-linkedin', title: 'Open LinkedIn', subtitle: 'Profile in a new tab' });
    }
    const filteredActions = actions.filter((a) => q === '' || tokenMatch(`${a.title} ${a.subtitle}`.toLowerCase(), q));

    return [
      { label: 'Projects', items: projectItems },
      { label: 'Skills', items: skillItems },
      { label: 'Navigation', items: pageItems },
      { label: 'Actions', items: filteredActions },
    ].filter((g) => g.items.length > 0);
  }, [query, recruiterMode, theme]);

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const clampedIndex = flat.length === 0 ? 0 : Math.min(selectedIndex, flat.length - 1);

  useEffect(() => {
    if (!commandPaletteOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setCommandPaletteOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (flat.length === 0 ? 0 : (prev + 1) % flat.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (flat.length === 0 ? 0 : (prev - 1 + flat.length) % flat.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = flat[clampedIndex];
        if (item) run(item);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commandPaletteOpen, flat, clampedIndex, setCommandPaletteOpen]);

  useEffect(() => {
    const el = listRef.current?.querySelector('[data-selected="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [clampedIndex]);

  const iconFor = (item: Item) => {
    if (item.kind === 'project') return Hash;
    if (item.kind === 'skill') return FileText;
    if (item.kind === 'page') return Compass;
    if (item.id === 'toggle-theme') return theme === 'dark' ? Sun : Moon;
    if (item.id === 'toggle-recruiter') return Briefcase;
    if (item.id === 'email') return Mail;
    return Search;
  };

  let cursor = -1;

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-[999] flex items-start justify-center pt-[10vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl z-10"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-secondary/20">
              <Search className="w-4 h-4 text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-listbox"
                aria-activedescendant={flat.length > 0 ? `palette-option-${clampedIndex}` : undefined}
                aria-label="Search projects, skills, pages and actions"
                placeholder="Search projects, skills, pages, actions…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
              <span className="font-mono text-[9px] text-muted border border-border px-1.5 py-0.5 rounded bg-secondary">
                ESC
              </span>
            </div>

            <div ref={listRef} id="palette-listbox" role="listbox" aria-label="Results" className="max-h-[360px] overflow-y-auto p-2 space-y-4">
              {flat.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted">
                  No matching projects, skills, pages or actions.
                </div>
              ) : (
                groups.map((group) => (
                  <div key={group.label}>
                    <div className="px-2 mb-1.5 text-[10px] font-mono text-muted tracking-wider uppercase">
                      {group.label}
                    </div>
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        cursor += 1;
                        const index = cursor;
                        const isSelected = index === clampedIndex;
                        const Icon = iconFor(item);
                        const key = `${item.kind}-${item.id}`;
                        return (
                          <button
                            key={key}
                            id={`palette-option-${index}`}
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => run(item)}
                            onMouseMove={() => setSelectedIndex(index)}
                            data-selected={isSelected}
                            className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                              isSelected ? 'bg-secondary text-foreground' : 'text-muted hover:text-foreground hover:bg-secondary/40'
                            }`}
                          >
                            <span className="flex items-center gap-3 min-w-0">
                              <span
                                className={`p-1.5 rounded-md border shrink-0 ${isSelected ? 'border-primary/30 bg-primary/5 text-primary' : 'border-border bg-secondary/50 text-muted'}`}
                              >
                                {item.id === 'open-github' ? (
                                  <GithubIcon className="w-3.5 h-3.5" />
                                ) : item.id === 'open-linkedin' ? (
                                  <LinkedinIcon className="w-3.5 h-3.5" />
                                ) : (
                                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                                )}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-xs font-semibold truncate">{item.title}</span>
                                <span className="block text-[10px] opacity-75 line-clamp-1">{item.subtitle}</span>
                              </span>
                            </span>
                            {isSelected && <CornerDownLeft className="w-3 h-3 text-primary shrink-0" aria-hidden="true" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2 bg-secondary/40 text-[10px] text-muted font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="bg-secondary px-1 py-0.5 border border-border rounded">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="bg-secondary px-1 py-0.5 border border-border rounded">Enter</kbd> Select
                </span>
              </div>
              <span>
                <kbd className="bg-secondary px-1 py-0.5 border border-border rounded">Ctrl+K</kbd>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
