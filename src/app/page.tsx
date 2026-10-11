import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { certifications } from '@/data/certifications';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { HeroBackground } from '@/components/hero-background';
import { ContactForm } from '@/components/contact-form';
import { ProjectCard } from '@/components/project-card';
import { SectionHeader } from '@/components/section';
import { portfolioConfig } from '@/data/portfolio';

const featuredProjects = projectsData.filter((p) => p.featured);

function metrics() {
  const inCategory = (c: string) => projectsData.filter((p) => p.categories.includes(c)).length;
  const techs = new Set(
    [...projectsData.flatMap((p) => [...p.tags, ...Object.values(p.techStack).flat()])]
      .filter(Boolean)
      .map((t) => String(t).toLowerCase())
  );
  return [
    { value: String(projectsData.length), label: 'Documented Projects' },
    { value: String(inCategory('Cloud')), label: 'Cloud Projects' },
    { value: String(inCategory('Security')), label: 'Security Projects' },
    { value: String(inCategory('Networking')), label: 'Networking Projects' },
    { value: String(techs.size), label: 'Technologies Used' },
    { value: String(inCategory('AI')), label: 'AI Projects' },
  ];
}

const githubRepos = projectsData.filter(
  (p) => p.githubUrl !== 'https://github.com/HarizuAru'
);

export default function Home() {
  const showLinkedin = portfolioConfig.socialLinks.linkedin !== '#';
  const sameAs: string[] = [portfolioConfig.socialLinks.github];
  if (showLinkedin) sameAs.push(portfolioConfig.socialLinks.linkedin);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* 1. Hero */}
      <section className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-8 overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            {portfolioConfig.availability}
          </p>
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              {portfolioConfig.name}
            </h1>
            <p className="text-lg sm:text-xl text-primary font-semibold">{portfolioConfig.role}</p>
          </div>
          <p className="max-w-2xl text-base text-muted leading-relaxed">{portfolioConfig.intro}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Core technologies">
            {portfolioConfig.heroTechnologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-xs font-mono text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View Resume
            </Link>
            <a
              href={portfolioConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
                LinkedIn
              </a>
            )}
          </div>
        </div>

        <aside className="lg:col-span-4 rounded-xl border border-border bg-secondary/20 p-6 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Profile</h2>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Focus</dt>
              <dd className="text-foreground text-right">Cloud · Security · DevSecOps</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Location</dt>
              <dd className="text-foreground text-right">Malaysia · Remote</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Contact</dt>
              <dd className="text-right">
                <a
                  href={`mailto:${portfolioConfig.email}`}
                  className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  {portfolioConfig.email}
                </a>
              </dd>
            </div>
          </dl>
        </aside>
        </div>
      </section>

      {/* 2. Career Focus */}
      <section className="space-y-6">
        <SectionHeader eyebrow="Career focus" title="What I Build" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {portfolioConfig.careerFocus.map((area) => (
            <article key={area.title} className="rounded-xl border border-border bg-secondary/20 p-5 space-y-2">
              <h3 className="font-semibold text-foreground">{area.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Featured Projects */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Selected work"
          title="Featured Engineering Projects"
          description="Six strongest case studies. Each documents the problem, architecture, decisions, and code."
          action={{ label: 'View all projects', href: '/projects' }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 4. Portfolio Metrics (derived from real data) */}
      <section className="space-y-6">
        <SectionHeader eyebrow="By the numbers" title="Portfolio Metrics" />
        <dl className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
          {metrics().map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-border bg-secondary/20 p-4 text-center space-y-1"
            >
              <dd className="text-2xl font-extrabold text-foreground">{m.value}</dd>
              <dt className="text-xs font-mono text-muted">{m.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* 5. Experience (condensed) */}
      {portfolioConfig.experience.length > 0 && (
        <section className="space-y-6">
          <SectionHeader title="Experience" action={{ label: 'Full experience', href: '/experience' }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioConfig.experience.slice(0, 2).map((job) => (
              <article key={job.role} className="rounded-xl border border-border bg-secondary/20 p-5 space-y-2">
                <h3 className="font-semibold text-foreground">{job.role}</h3>
                <p className="text-xs font-mono text-primary">
                  {job.period} · {job.location}
                </p>
                <p className="text-sm text-muted">{job.points[0]}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 6. Certifications (selected) */}
      <section className="space-y-6">
        <SectionHeader title="Certifications" action={{ label: 'All certifications', href: '/certifications' }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.slice(0, 2).map((cert) => (
            <article key={cert.name} className="rounded-xl border border-border bg-secondary/20 p-5 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">{cert.name}</h3>
                <span className="rounded-full border border-dashed border-border px-2.5 py-0.5 text-[11px] font-mono text-muted">
                  {cert.status === 'verified' ? 'Verified' : cert.status === 'in-progress' ? 'In Progress' : 'Planned'}
                </span>
              </div>
              <p className="text-sm text-muted">{cert.issuer}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Technical Skills (condensed) */}
      <section className="space-y-6">
        <SectionHeader title="Technical Skills" action={{ label: 'Full skill map', href: '/skills' }} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {portfolioConfig.skills.map((group) => (
            <article key={group.title} className="rounded-xl border border-border bg-secondary/20 p-5 space-y-3">
              <h3 className="font-semibold text-foreground">{group.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/projects?skill=${encodeURIComponent(item)}`}
                      className="inline-block rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-xs font-mono text-muted hover:text-foreground hover:border-primary/40 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 8. Education */}
      {portfolioConfig.education.length > 0 && (
        <section className="space-y-6">
          <SectionHeader title="Education" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioConfig.education.map((edu) => (
              <article key={edu.title} className="rounded-xl border border-border bg-secondary/20 p-5 space-y-1.5">
                <h3 className="font-semibold text-foreground">{edu.title}</h3>
                <p className="text-xs font-mono text-primary">{edu.period}</p>
                <p className="text-sm text-muted">{edu.detail}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 9. GitHub / Open Source */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Open source"
          title="GitHub"
          description="Repositories with their own codebase behind them. Everything else links from its case study."
          action={{ label: 'Profile', href: portfolioConfig.socialLinks.github }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {githubRepos.map((project) => (
            <a
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border bg-secondary/20 p-5 space-y-2 hover-lift block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <GithubIcon className="w-4 h-4" aria-hidden="true" />
                {project.githubUrl.replace('https://github.com/HarizuAru/', '')}
              </div>
              <p className="text-sm text-muted">{project.subtitle}</p>
              <p className="text-xs font-mono text-primary">{project.tags.slice(0, 4).join(' · ')}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 10. Currently Learning */}
      <section className="space-y-4">
        <SectionHeader eyebrow="In progress" title="Currently Learning" />
        <ul className="flex flex-wrap gap-2">
          {portfolioConfig.currentlyLearning.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-dashed border-border px-3 py-1 text-xs font-mono text-muted"
            >
              {topic}
            </li>
          ))}
        </ul>
      </section>

      {/* 11. About (short) */}
      <section className="space-y-4">
        <SectionHeader title="About" action={{ label: 'More about me', href: '/about' }} />
        <p className="max-w-4xl text-muted leading-relaxed">
          I work on event-driven AWS architectures, detection and monitoring pipelines, and infrastructure
          that is secure by default — least-privilege IAM, encrypted evidence, and automation that shortens
          the path from signal to response.
        </p>
      </section>

      {/* 12. Contact CTA */}
      <section id="contact" className="rounded-xl border border-border bg-secondary/20 p-6 sm:p-8 space-y-6">
        <SectionHeader
          title="Get in Touch"
          description="Hiring for an internship or graduate role, or want to collaborate? Send a message."
        />
        <ContactForm />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: portfolioConfig.name,
            jobTitle: portfolioConfig.role,
            url: portfolioConfig.siteUrl,
            sameAs,
          }),
        }}
      />
    </div>
  );
}
