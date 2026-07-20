'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/global-context';
import { projectsData } from '@/data/projects';
import { Search, Briefcase, Moon, Sun, Monitor, Hash, CornerDownLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, recruiterMode, setRecruiterMode, theme, setTheme } = useGlobalContext();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle palette open/close on keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === '/' && !commandPaletteOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setQuery('');
        setSelectedIndex(0);
      }, 50);
    }
  }, [commandPaletteOpen]);

  // Filter projects and actions
  const filteredProjects = query.trim() === '' 
    ? projectsData.slice(0, 4) 
    : projectsData.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) || 
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );

  const actions = [
    {
      id: 'toggle-recruiter',
      title: recruiterMode ? 'Deactivate Recruiter Mode' : 'Activate Recruiter Mode',
      subtitle: 'Show/hide hiring-manager-focused system audits',
      icon: Briefcase,
      handler: () => {
        setRecruiterMode(!recruiterMode);
        setCommandPaletteOpen(false);
      }
    },
    {
      id: 'toggle-theme',
      title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      subtitle: 'Toggle theme preferences',
      icon: theme === 'dark' ? Sun : Moon,
      handler: () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        setCommandPaletteOpen(false);
      }
    },
    {
      id: 'go-about',
      title: 'Jump to Personal Brand',
      subtitle: 'Scroll to professional bio',
      icon: Monitor,
      handler: () => {
        setCommandPaletteOpen(false);
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'go-contact',
      title: 'Jump to Consulting & Contact',
      subtitle: 'Schedule consultations or send messages',
      icon: Monitor,
      handler: () => {
        setCommandPaletteOpen(false);
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  const filteredActions = query.trim() === ''
    ? actions
    : actions.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));

  const totalItemsCount = filteredProjects.length + filteredActions.length;

  // Handle keyboard events (Up, Down, Enter, Escape)
  useEffect(() => {
    if (!commandPaletteOpen) return;

    const triggerSelection = () => {
      if (totalItemsCount === 0) return;

      if (selectedIndex < filteredProjects.length) {
        const project = filteredProjects[selectedIndex];
        router.push(`/project/${project.id}`);
        setCommandPaletteOpen(false);
      } else {
        const actionIndex = selectedIndex - filteredProjects.length;
        const action = filteredActions[actionIndex];
        if (action) action.handler();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setCommandPaletteOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % totalItemsCount);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + totalItemsCount) % totalItemsCount);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        triggerSelection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, selectedIndex, totalItemsCount, setCommandPaletteOpen, filteredProjects, filteredActions, router]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector('[data-selected="true"]');
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-[999] flex items-start justify-center pt-[10vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Dialog Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl z-10"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-secondary/20">
              <Search className="w-4 h-4 text-muted" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search projects, stack, tags, or system actions..."
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

            {/* List */}
            <div ref={listRef} className="max-h-[360px] overflow-y-auto p-2 space-y-4">
              {totalItemsCount === 0 ? (
                <div className="p-8 text-center text-sm text-muted">
                  No matching systems or controls found.
                </div>
              ) : (
                <>
                  {/* Projects Section */}
                  {filteredProjects.length > 0 && (
                    <div>
                      <div className="px-2 mb-1.5 text-[10px] font-mono text-muted tracking-wider uppercase">
                        Engineering Projects
                      </div>
                      <div className="space-y-1">
                        {filteredProjects.map((project, index) => {
                          const isSelected = index === selectedIndex;
                          return (
                            <button
                              key={project.id}
                              onClick={() => {
                                router.push(`/project/${project.id}`);
                                setCommandPaletteOpen(false);
                              }}
                              data-selected={isSelected}
                              className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                                isSelected ? 'bg-secondary text-foreground' : 'text-muted hover:text-foreground hover:bg-secondary/40'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-md border ${isSelected ? 'border-primary/30 bg-primary/5 text-primary' : 'border-border bg-secondary/50 text-muted'}`}>
                                  <Hash className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <div className="text-xs font-semibold">{project.title}</div>
                                  <div className="text-[10px] opacity-75 line-clamp-1">{project.subtitle}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-mono border border-border px-1 rounded-sm uppercase bg-secondary/60">
                                  {project.category}
                                </span>
                                {isSelected && <CornerDownLeft className="w-3 h-3 text-primary animate-pulse" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* System Commands Section */}
                  {filteredActions.length > 0 && (
                    <div>
                      <div className="px-2 mb-1.5 text-[10px] font-mono text-muted tracking-wider uppercase">
                        System Actions
                      </div>
                      <div className="space-y-1">
                        {filteredActions.map((action, index) => {
                          const itemIndex = index + filteredProjects.length;
                          const isSelected = itemIndex === selectedIndex;
                          const ActionIcon = action.icon;
                          return (
                            <button
                              key={action.id}
                              onClick={action.handler}
                              data-selected={isSelected}
                              className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                                isSelected ? 'bg-secondary text-foreground' : 'text-muted hover:text-foreground hover:bg-secondary/40'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-md border ${isSelected ? 'border-primary/30 bg-primary/5 text-primary' : 'border-border bg-secondary/50 text-muted'}`}>
                                  <ActionIcon className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <div className="text-xs font-semibold">{action.title}</div>
                                  <div className="text-[10px] opacity-75">{action.subtitle}</div>
                                </div>
                              </div>
                              {isSelected && <CornerDownLeft className="w-3 h-3 text-primary animate-pulse" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between border-t border-border px-4 py-2 bg-secondary/40 text-[10px] text-muted font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><kbd className="bg-secondary px-1 py-0.5 border border-border rounded">↑↓</kbd> Navigate</span>
                <span className="flex items-center gap-1"><kbd className="bg-secondary px-1 py-0.5 border border-border rounded">Enter</kbd> Select</span>
              </div>
              <div>
                <span>Search shorthand: <kbd className="bg-secondary px-1 py-0.5 border border-border rounded">/</kbd></span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
