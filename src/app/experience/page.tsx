import type { Metadata } from 'next';
import { PageHeader, EmptyState } from '@/components/section';
import { portfolioConfig } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Experience | Hariz Iskandar',
  description: 'Professional experience: roles, responsibilities, impact and technologies.',
  alternates: { canonical: '/experience' },
};

export default function ExperiencePage() {
  const experience = portfolioConfig.experience;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <PageHeader
        title="Experience"
        description="Roles, what I owned, and what it achieved. Technical project work lives under Projects."
      />
      {experience.length === 0 ? (
        <EmptyState
          title="Experience details coming soon"
          description="Professional history is being written up. Meanwhile, the Projects section documents real engineering work with architecture and decisions."
        />
      ) : (
        <ol className="space-y-4">
          {experience.map((job) => (
            <li
              key={job.role}
              className="rounded-xl border border-border bg-secondary/20 p-5 sm:p-6 space-y-3"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold text-foreground">{job.role}</h2>
                <p className="text-xs font-mono text-primary">
                  {job.period} · {job.location}
                </p>
              </div>
              <ul className="space-y-1.5 text-sm text-muted leading-relaxed">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span aria-hidden="true" className="text-primary">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
