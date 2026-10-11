import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { PrintButton } from '@/components/print-button';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { portfolioConfig } from '@/data/portfolio';
import { projectsData } from '@/data/projects';
import { certifications } from '@/data/certifications';

export const metadata: Metadata = {
  title: 'Resume | Hariz Iskandar',
  description: 'Resume of Hariz Iskandar, Cloud & Security Engineer. Print or save as PDF.',
};

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate-900 border-b-2 border-blue-800 pb-1">
        {title}
      </h3>
      {children}
    </section>
  );
}

export default function ResumePage() {
  const showLinkedin = portfolioConfig.socialLinks.linkedin !== '#';
  const featured = projectsData.filter((p) => p.featured);
  const earned = certifications.filter((c) => c.status !== 'planned');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 print:py-0 print:px-0 print:max-w-none">
      {/* Viewer toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Resume</h1>
          <p className="text-sm text-muted">
            Professional document view — use{' '}
            <span className="font-medium text-foreground">Print / Save as PDF</span> for a clean copy.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <PrintButton />
          <a
            href={`mailto:${portfolioConfig.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary/50"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            Email
          </a>
          <a
            href={portfolioConfig.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary/50"
          >
            <GithubIcon className="w-4 h-4" aria-hidden="true" />
            GitHub
          </a>
          {showLinkedin && (
            <a
              href={portfolioConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary/50"
            >
              <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Paper document — explicit ink-on-paper colors so it prints
          identically from either theme */}
      <article className="bg-white text-slate-800 rounded-md shadow-2xl px-6 py-8 sm:px-12 sm:py-10 space-y-5 print:shadow-none print:rounded-none print:p-0 print:m-0">
        <header className="text-center space-y-1.5 pb-4 border-b border-slate-300">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {portfolioConfig.name}
          </h2>
          <p className="text-base font-semibold text-blue-800">{portfolioConfig.role}</p>
          <p className="text-[13px] text-slate-600">
            {portfolioConfig.location} · {portfolioConfig.email} ·{' '}
            {portfolioConfig.siteUrl.replace('https://', '')} · github.com/HarizuAru
          </p>
        </header>

        <DocSection title="Summary">
          <p className="text-[13.5px] leading-relaxed">{portfolioConfig.intro}</p>
          <p className="text-[13.5px] leading-relaxed">
            Focus: Cloud · Security · DevSecOps. {portfolioConfig.availability}.
          </p>
        </DocSection>

        {portfolioConfig.experience.length > 0 && (
          <DocSection title="Experience">
            {portfolioConfig.experience.map((job) => (
              <div key={job.role} className="space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[13.5px] font-bold text-slate-900">{job.role}</p>
                  <p className="text-xs text-slate-500">
                    {job.period} · {job.location}
                  </p>
                </div>
                <ul className="text-[13.5px] leading-relaxed space-y-0.5">
                  {job.points.map((pt) => (
                    <li key={pt}>• {pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </DocSection>
        )}

        <DocSection title="Selected Projects">
          {featured.map((p) => (
            <div key={p.id} className="space-y-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-[13.5px] font-bold text-slate-900">{p.title}</p>
                <p className="text-xs text-slate-500">{p.categories.join(' · ')}</p>
              </div>
              <p className="text-[13.5px] leading-relaxed">{p.summary}</p>
              {p.architectureSummary && (
                <p className="text-xs text-slate-500 font-mono">{p.architectureSummary}</p>
              )}
            </div>
          ))}
        </DocSection>

        <DocSection title="Skills">
          {portfolioConfig.skills.map((g) => (
            <p key={g.title} className="text-[13.5px] leading-relaxed">
              <span className="font-bold text-slate-900">{g.title}:</span> {g.items.join(', ')}
            </p>
          ))}
        </DocSection>

        {earned.length > 0 && (
          <DocSection title="Certifications">
            <ul className="text-[13.5px] space-y-0.5">
              {earned.map((c) => (
                <li key={c.name}>
                  • {c.name} — {c.issuer} ({c.status === 'verified' ? 'Verified' : 'In Progress'})
                </li>
              ))}
            </ul>
          </DocSection>
        )}

        {portfolioConfig.education.length > 0 && (
          <DocSection title="Education">
            <ul className="text-[13.5px] space-y-0.5">
              {portfolioConfig.education.map((e) => (
                <li key={e.title}>
                  • <span className="font-bold text-slate-900">{e.title}</span> ({e.period}) — {e.detail}
                </li>
              ))}
            </ul>
          </DocSection>
        )}
      </article>
    </div>
  );
}
