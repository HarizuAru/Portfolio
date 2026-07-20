'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProjectRecord } from '@/data/projects';
import { ArrowUpDown, ExternalLink, Filter } from 'lucide-react';

interface ProjectTableProps {
  projects: ProjectRecord[];
}

type SortField = 'title' | 'category' | 'difficulty' | 'status' | 'completionDate';
type SortOrder = 'asc' | 'desc';

export function ProjectTable({ projects }: ProjectTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [sortField, setSortField] = useState<SortField>('completionDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Handler for category filter chips
  const categoriesList = ['ALL', 'CLOUD', 'SECURITY', 'AI', 'SYSTEMS'];
  const difficultiesList = ['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

  // Sorting Handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  // Filter and Sort Data
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    // Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category Filter
    if (selectedCategory !== 'ALL') {
      result = result.filter((p) => p.category.toUpperCase() === selectedCategory);
    }

    // Difficulty Filter
    if (selectedDifficulty !== 'ALL') {
      result = result.filter((p) => p.difficulty.toUpperCase() === selectedDifficulty);
    }

    // Sorting
    result.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      }
      return 0;
    });

    return result;
  }, [projects, searchQuery, selectedCategory, selectedDifficulty, sortField, sortOrder]);

  // Pagination
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProjects.slice(start, start + itemsPerPage);
  }, [filteredAndSortedProjects, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedProjects.length / itemsPerPage);

  const getDifficultyColor = (diff: string) => {
    switch (diff.toUpperCase()) {
      case 'EXPERT': return 'text-primary border-primary/20 bg-primary/5';
      case 'ADVANCED': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'INTERMEDIATE': return 'text-zinc-300 border-zinc-400/20 bg-zinc-400/5';
      default: return 'text-muted border-border bg-secondary/50';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters Toolbar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-secondary/15 border border-border p-4 rounded-xl">
        {/* Search */}
        <div className="w-full xl:max-w-xs">
          <input
            type="text"
            placeholder="Filter database by keywords, tags..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-secondary/40 border border-border rounded-lg px-3.5 py-2 text-xs text-foreground outline-none focus:border-primary placeholder:text-muted"
          />
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono text-muted uppercase mr-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Category:
          </span>
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full border text-[10px] font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary/10 border-primary/40 text-primary font-bold'
                  : 'bg-secondary/45 border-border text-muted hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Select */}
        <div className="flex items-center gap-2 self-start xl:self-auto">
          <span className="text-[10px] font-mono text-muted uppercase">Difficulty:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => {
              setSelectedDifficulty(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-secondary/50 border border-border rounded-lg px-3 py-1.5 text-[10px] font-mono text-foreground outline-none focus:border-primary"
          >
            {difficultiesList.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Pane */}
      <div className="border border-border rounded-xl bg-secondary/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead className="bg-secondary/30 border-b border-border font-mono text-muted text-[10px] uppercase select-none">
              <tr>
                <th className="p-4 w-12 text-center">#</th>
                <th 
                  onClick={() => handleSort('title')}
                  className="p-4 cursor-pointer hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Project System <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('category')}
                  className="p-4 cursor-pointer hover:text-foreground transition-colors hidden sm:table-cell"
                >
                  <div className="flex items-center gap-1">
                    Domain <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('difficulty')}
                  className="p-4 cursor-pointer hover:text-foreground transition-colors hidden md:table-cell"
                >
                  <div className="flex items-center gap-1">
                    Difficulty <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('status')}
                  className="p-4 cursor-pointer hover:text-foreground transition-colors hidden lg:table-cell"
                >
                  <div className="flex items-center gap-1">
                    Status <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('completionDate')}
                  className="p-4 cursor-pointer hover:text-foreground transition-colors hidden lg:table-cell"
                >
                  <div className="flex items-center gap-1">
                    Completed <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginatedProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted font-mono">
                    No records found matching current query configurations.
                  </td>
                </tr>
              ) : (
                paginatedProjects.map((project, idx) => {
                  const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
                  return (
                    <tr
                      key={project.id}
                      className="hover:bg-secondary/20 transition-colors duration-150 group"
                    >
                      <td className="p-4 text-center font-mono text-muted text-[10px]">
                        {String(globalIdx).padStart(2, '0')}
                      </td>
                      <td className="p-4">
                        <div>
                          <Link
                            href={`/project/${project.id}`}
                            className="font-semibold text-foreground hover:text-primary transition-colors block text-xs"
                          >
                            {project.title}
                          </Link>
                          <span className="text-[10px] text-muted line-clamp-1">
                            {project.subtitle}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 hidden sm:table-cell font-mono text-muted">
                        {project.category}
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span className={`px-2 py-0.5 rounded-full border text-[9px] font-mono ${getDifficultyColor(project.difficulty)}`}>
                          {project.difficulty}
                        </span>
                      </td>
                      <td className="p-4 hidden lg:table-cell font-mono">
                        <span className="flex items-center gap-1.5 text-foreground">
                          <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Production' ? 'bg-primary' : 'bg-zinc-400'}`} />
                          {project.status}
                        </span>
                      </td>
                      <td className="p-4 hidden lg:table-cell font-mono text-muted">
                        {project.completionDate}
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/project/${project.id}`}
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-muted group-hover:text-primary transition-colors cursor-pointer"
                        >
                          <span>Open Workspace</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Panel */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3 bg-secondary/15 text-[11px] font-mono text-muted">
            <div>
              Showing {Math.min(filteredAndSortedProjects.length, (currentPage - 1) * itemsPerPage + 1)}-
              {Math.min(filteredAndSortedProjects.length, currentPage * itemsPerPage)} of {filteredAndSortedProjects.length} records
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-2.5 py-1 rounded border border-border bg-secondary/30 disabled:opacity-50 disabled:cursor-not-allowed hover:text-foreground cursor-pointer"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1 rounded border border-border bg-secondary/30 disabled:opacity-50 disabled:cursor-not-allowed hover:text-foreground cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
