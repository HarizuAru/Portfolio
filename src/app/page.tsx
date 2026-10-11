import Link from 'next/link';
import { ArrowRight, ExternalLink, Mail, Download } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { ContactForm } from '@/components/contact-form';
import { portfolioConfig } from '@/data/portfolio';

const featuredProjects = projectsData.slice(0, 6);

function getProjectTechnologies(project: (typeof projectsData)[number]) {
  const techStack = Object.values(project.techStack)
    .flat()
    .filter((tech): tech is string => Boolean(tech));

  const merged = [...project.tags, ...techStack];
  return Array.from(new Set(merged)).slice(0, 5);
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-6">
          <p className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
            Portfolio Landing Page
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            {portfolioConfig.name}
          </h1>
          <p className="text-lg sm:text-xl text-primary font-semibold">{portfolioConfig.role}</p>
          <p className="max-w-3xl text-base sm:text-lg text-muted leading-relaxed">
            {portfolioConfig.intro}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={portfolioConfig.primaryCtaHref}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {portfolioConfig.primaryCtaLabel}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={portfolioConfig.secondaryCtaHref}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {portfolioConfig.secondaryCtaLabel}
              <Mail className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={portfolioConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              GitHub
              <GithubIcon className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={portfolioConfig.resumeUrl}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Resume
              <Download className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside className="lg:col-span-4 rounded-xl border border-border bg-secondary/20 p-6 space-y-4">
          <h2 className="text-lg font-bold text-foreground">Quick Profile</h2>
          <ul className="space-y-3 text-sm text-muted">
            <li>
              <span className="font-semibold text-foreground">Focus:</span> Building maintainable products with modern UX and secure architecture.
            </li>
            <li>
              <span className="font-semibold text-foreground">Location:</span> {portfolioConfig.location}
            </li>
            <li>
              <span className="font-semibold text-foreground">Contact:</span>{' '}
              <a
                href={`mailto:${portfolioConfig.email}`}
                className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                {portfolioConfig.email}
              </a>
            </li>
          </ul>
        </aside>
      </section>

      <section id="projects" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Projects</h2>
          <p className="text-muted max-w-3xl">
            A selection of projects from this portfolio repository. Each card links to detailed implementation notes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredProjects.map((project) => {
            const techs = getProjectTechnologies(project);

            return (
              <article
                key={project.id}
                className="h-full rounded-xl border border-border bg-secondary/20 p-5 flex flex-col gap-4 hover-lift"
              >
                <div className="space-y-2">
                  <p className="text-xs font-mono text-primary uppercase tracking-wide">
                    {project.category} · {project.status}
                  </p>
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{project.summary}</p>
                </div>

                <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                  {techs.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border bg-secondary/40 px-2 py-0.5 text-[11px] font-mono text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-3 pt-2">
                  <Link
                    href={`/project/${project.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    View details
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Repository
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="experience" className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Experience</h2>
          <p className="text-muted max-w-3xl">
            Where I&apos;ve worked and what I delivered there.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioConfig.experience.map((job) => (
            <article key={job.role} className="rounded-xl border border-border bg-secondary/20 p-5 space-y-3">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground">{job.role}</h3>
                <p className="text-xs font-mono text-primary">{job.period} · {job.location}</p>
              </div>
              <ul className="space-y-1.5 text-sm text-muted">
                {job.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">About</h2>
        <p className="max-w-4xl text-muted leading-relaxed">
          I enjoy translating complex requirements into practical, high-quality software. My work emphasizes accessibility,
          reliable architecture, and clear communication so products are easy to use and easy to maintain.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioConfig.education.map((edu) => (
            <article key={edu.title} className="rounded-xl border border-border bg-secondary/20 p-5 space-y-1.5">
              <h3 className="text-base font-semibold text-foreground">{edu.title}</h3>
              <p className="text-xs font-mono text-primary">{edu.period}</p>
              <p className="text-sm text-muted">{edu.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {portfolioConfig.skills.map((group) => (
            <article key={group.title} className="rounded-xl border border-border bg-secondary/20 p-5 space-y-3">
              <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
              <ul className="space-y-1.5 text-sm text-muted">
                {group.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="rounded-xl border border-border bg-secondary/20 p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Contact</h2>
          <p className="text-muted max-w-3xl">
            Want to collaborate or discuss an opportunity? Send a message below or reach me directly.
          </p>
        </div>
        <ContactForm />
        <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
          <a
            href={`mailto:${portfolioConfig.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Email Me
            <Mail className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href={portfolioConfig.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            GitHub Profile
            <GithubIcon className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href={portfolioConfig.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            LinkedIn
            <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
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
            email: `mailto:${portfolioConfig.email}`,
            sameAs: [portfolioConfig.socialLinks.github, portfolioConfig.socialLinks.linkedin],
          }),
        }}
      />
    </div>
  );
}
