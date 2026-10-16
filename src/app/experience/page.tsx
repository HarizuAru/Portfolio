import type { Metadata } from 'next';
import { PageHeader } from '@/components/section';
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
      <ol className="space-y-4">
        {experience.map((job) => (
          <li
            key={job.role}
            className="rounded-lg border border-border bg-secondary/20 p-5 sm:p-6 space-y-3"
          >
            <div className="space-y-0.5">
              <h2 className="text-lg font-semibold text-foreground">{job.role}</h2>
              <p className="text-sm text-foreground">
                {job.company} · {job.employmentType}
              </p>
            </div>
            <p className="text-xs font-mono text-primary">
              {job.period} · {job.duration} · {job.location}
            </p>
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
    </div>
  );
}
