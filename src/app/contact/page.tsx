import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { PageHeader } from '@/components/section';
import { ContactForm } from '@/components/contact-form';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { portfolioConfig } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Contact | Hariz Iskandar',
  description: 'Contact Hariz Iskandar about internships, graduate roles, collaboration or projects.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const showLinkedin = portfolioConfig.socialLinks.linkedin !== '#';
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <PageHeader
        title="Contact"
        description="The fastest way to reach me is the form below — it opens your email app with everything addressed. I reply to internship, graduate-role, collaboration and project inquiries."
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 rounded-xl border border-border bg-secondary/20 p-6 space-y-4">
          <h2 className="text-lg font-bold text-foreground">Send a message</h2>
          <ContactForm />
        </div>
        <aside className="lg:col-span-5 rounded-xl border border-border bg-secondary/20 p-6 space-y-4">
          <h2 className="text-lg font-bold text-foreground">Direct channels</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${portfolioConfig.email}`}
                className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                {portfolioConfig.email}
              </a>
            </li>
            <li>
              <a
                href={portfolioConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors"
              >
                <GithubIcon className="w-4 h-4" aria-hidden="true" />
                GitHub
              </a>
            </li>
            {showLinkedin && (
              <li>
                <a
                  href={portfolioConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
            )}
            <li className="text-muted">
              <span className="font-semibold text-foreground">Location:</span> {portfolioConfig.location} · Remote
            </li>
            <li className="text-muted">
              <span className="font-semibold text-foreground">Availability:</span> {portfolioConfig.availability}
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
