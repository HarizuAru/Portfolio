import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/section';
import { certifications, type CertificationGroup, type CertificationStatus } from '@/data/certifications';

export const metadata: Metadata = {
  title: 'Certifications | Hariz Iskandar',
  description: 'Credentials and certification goals across cloud, cybersecurity, networking and DevOps.',
  alternates: { canonical: '/certifications' },
};

const groupOrder: CertificationGroup[] = ['Cloud', 'Cybersecurity', 'Networking', 'DevOps', 'Other'];

const statusLabel: Record<CertificationStatus, string> = {
  verified: 'Verified',
  'in-progress': 'In Progress',
  planned: 'Planned',
};

const statusClass: Record<CertificationStatus, string> = {
  verified: 'border-primary/40 bg-primary/10 text-primary',
  'in-progress': 'border-border bg-secondary/40 text-foreground',
  planned: 'border-dashed border-border bg-transparent text-muted',
};

export default function CertificationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <PageHeader
        title="Certifications"
        description="Verified credentials first, then what is in progress and planned. Planned items are goals — never presented as completed."
      />
      {groupOrder.map((group) => {
        const items = certifications.filter((c) => c.group === group);
        if (items.length === 0) return null;
        return (
          <section key={group} className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">{group}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((cert) => (
                <article
                  key={cert.name}
                  className="rounded-xl border border-border bg-secondary/20 p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{cert.name}</h3>
                      <p className="text-sm text-muted">{cert.issuer}</p>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-mono ${statusClass[cert.status]}`}
                    >
                      {statusLabel[cert.status]}
                    </span>
                  </div>
                  {(cert.issueDate || cert.expirationDate) && (
                    <p className="text-xs font-mono text-muted">
                      {cert.issueDate && `Issued ${cert.issueDate}`}
                      {cert.issueDate && cert.expirationDate && ' · '}
                      {cert.expirationDate && `Expires ${cert.expirationDate}`}
                    </p>
                  )}
                  <ul className="flex flex-wrap gap-2" aria-label={`${cert.name} skills`}>
                    {cert.skills.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-border bg-secondary/40 px-2 py-0.5 text-[11px] font-mono text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      Verify credential
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
