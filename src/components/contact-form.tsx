'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { portfolioConfig } from '@/data/portfolio';

const inputClass =
  'w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const reasons = ['Internship', 'Graduate Role', 'Collaboration', 'Project', 'Other'] as const;

// Static export has no backend, so the form composes an email in the
// visitor's own mail client instead of posting anywhere.
export function ContactForm() {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [reason, setReason] = useState<string>('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [sent, setSent] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setBlocked(true);
      return;
    }
    const subject = `Portfolio inquiry${reason ? ` [${reason}]` : ''} from ${name}`;
    const href = `mailto:${portfolioConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${from})`)}`;
    window.location.href = href;
    setSent(true);
  };

  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-3" onSubmit={submit} noValidate={false}>
      <label className="space-y-1.5 text-sm">
        <span className="font-medium text-foreground">Your name</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          className={inputClass}
          autoComplete="name"
          maxLength={100}
        />
      </label>
      <label className="space-y-1.5 text-sm">
        <span className="font-medium text-foreground">Your email</span>
        <input
          required
          type="email"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="jane@company.com"
          className={inputClass}
          autoComplete="email"
          maxLength={254}
        />
      </label>
      <label className="space-y-1.5 text-sm sm:col-span-2">
        <span className="font-medium text-foreground">
          Reason <span className="text-muted font-normal">(optional)</span>
        </span>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">Select a reason…</option>
          {reasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      <label className="space-y-1.5 text-sm sm:col-span-2">
        <span className="font-medium text-foreground">Message</span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi Hariz, I'd like to talk about…"
          className={`${inputClass} resize-y`}
          maxLength={2000}
        />
      </label>
      {/* Honeypot: invisible to humans, catches naive bots */}
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="sm:col-span-2 space-y-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
        >
          Send via Email
          <Mail className="w-4 h-4" aria-hidden="true" />
        </button>
        {sent && !blocked && (
          <p className="text-sm text-primary" role="status">
            Your email app should have opened with the message ready to send. Prefer direct mail?{' '}
            <a className="underline" href={`mailto:${portfolioConfig.email}`}>
              {portfolioConfig.email}
            </a>
          </p>
        )}
        {blocked && (
          <p className="text-sm text-rose-400" role="alert">
            Submission blocked. If you are human, please email directly.
          </p>
        )}
      </div>
    </form>
  );
}
