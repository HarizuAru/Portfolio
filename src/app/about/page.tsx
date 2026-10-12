import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/section';
import { portfolioConfig } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'About | Hariz Iskandar',
  description: 'Background, engineering philosophy and career direction of Hariz Iskandar, Cloud & Security Engineer.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <PageHeader title="About" description={`${portfolioConfig.name} — ${portfolioConfig.role}.`} />
      <div className="max-w-3xl space-y-6 text-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">What I do</h2>
          <p>{portfolioConfig.intro}</p>
          <p>
            My work centers on event-driven AWS architectures, detection and monitoring pipelines,
            and infrastructure that is secure by default: least-privilege IAM, encrypted evidence,
            and automation that shortens the path from signal to response.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">How I work</h2>
          <ul className="space-y-1.5">
            <li>• Architecture before code: data flow, failure modes, and security boundaries first.</li>
            <li>• Every project documents its decisions, alternatives, and tradeoffs.</li>
            <li>• Prefer managed and serverless building blocks; pay for usage, not idle servers.</li>
            <li>• Measure: latency, throughput, and false-positive rate — not vanity metrics.</li>
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">Direction</h2>
          <p>
            Targeting cloud engineering, cloud security, and DevSecOps roles — {portfolioConfig.location.toLowerCase()},
            open to remote. Currently: {portfolioConfig.availability.toLowerCase()}.
          </p>
        </section>
        {portfolioConfig.education.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">Education</h2>
            {portfolioConfig.education.map((edu) => (
              <article key={edu.title} className="rounded-xl border border-border bg-secondary/20 p-5 space-y-1">
                <h3 className="text-base font-semibold text-foreground">{edu.title}</h3>
                <p className="text-xs font-mono text-primary">{edu.period}</p>
                <p className="text-sm">{edu.detail}</p>
              </article>
            ))}
          </section>
        )}
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Explore Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary/50"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
