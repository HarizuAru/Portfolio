import type { Metadata } from 'next';
import { PrintButton } from '@/components/print-button';
import { portfolioConfig } from '@/data/portfolio';
import { projectsData } from '@/data/projects';
import { certifications } from '@/data/certifications';

export const metadata: Metadata = {
  title: 'Resume | Hariz Iskandar',
  description: 'Web resume of Hariz Iskandar, Cloud & Security Engineer. Print or save as PDF.',
  alternates: { canonical: '/resume' },
};

export default function ResumePage() {
  const featured = projectsData.filter((p) => p.featured);
  const earned = certifications.filter((c) => c.status !== 'planned');
  const skillGroups = portfolioConfig.skills;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 print:py-0 print:max-w-none">
      <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Resume</h1>
          <p className="text-muted">Web version — prints cleanly to one or two pages.</p>
        </div>
        <PrintButton />
      </div>

      <article className="rounded-xl border border-border bg-secondary/10 p-6 sm:p-8 space-y-6 print:border-0 print:p-0 print:bg-transparent">
        <header className="space-y-1 border-b border-border pb-4">
          <h2 className="text-2xl font-extrabold text-foreground">{portfolioConfig.name}</h2>
          <p className="text-primary font-semibold">{portfolioConfig.role}</p>
          <p className="text-sm text-muted">
            {portfolioConfig.location} · {portfolioConfig.email} · {portfolioConfig.siteUrl}
          </p>
        </header>

        <section className="space-y-1.5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Summary</h3>
          <p className="text-sm text-muted leading-relaxed">{portfolioConfig.intro}</p>
        </section>

        {portfolioConfig.experience.length > 0 && (
          <section className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Experience</h3>
            {portfolioConfig.experience.map((job) => (
              <div key={job.role} className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  {job.role} <span className="font-normal text-muted">— {job.period}</span>
                </p>
                <ul className="text-sm text-muted space-y-0.5">
                  {job.points.map((pt) => (
                    <li key={pt}>• {pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        <section className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Selected Projects</h3>
          {featured.map((p) => (
            <div key={p.id} className="space-y-0.5">
              <p className="text-sm font-semibold text-foreground">
                {p.title} <span className="font-normal text-muted">— {p.categories.join(', ')}</span>
              </p>
              <p className="text-sm text-muted">{p.summary}</p>
            </div>
          ))}
        </section>

        {earned.length > 0 && (
          <section className="space-y-1.5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Certifications</h3>
            <ul className="text-sm text-muted">
              {earned.map((c) => (
                <li key={c.name}>
                  • {c.name} — {c.issuer} ({c.status === 'verified' ? 'Verified' : 'In Progress'})
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="space-y-1.5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Skills</h3>
          {skillGroups.map((g) => (
            <p key={g.title} className="text-sm text-muted">
              <span className="font-semibold text-foreground">{g.title}:</span> {g.items.join(', ')}
            </p>
          ))}
        </section>

        {portfolioConfig.education.length > 0 && (
          <section className="space-y-1.5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Education</h3>
            <ul className="text-sm text-muted">
              {portfolioConfig.education.map((e) => (
                <li key={e.title}>
                  • {e.title} ({e.period})
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
