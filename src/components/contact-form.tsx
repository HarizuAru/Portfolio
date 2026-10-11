'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { portfolioConfig } from '@/data/portfolio';

const inputClass =
  'w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

// Static export has no backend, so the form composes an email in the
// visitor's own mail client instead of posting anywhere.
export function ContactForm() {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');

  const href = `mailto:${portfolioConfig.email}?subject=${encodeURIComponent(
    `Portfolio inquiry from ${name || 'your website'}`
  )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${from})`)}`;

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = href;
      }}
    >
      <label className="space-y-1.5 text-sm">
        <span className="font-medium text-foreground">Your name</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          className={inputClass}
          autoComplete="name"
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
        />
      </label>
      <label className="space-y-1.5 text-sm sm:col-span-2">
        <span className="font-medium text-foreground">Message</span>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi Hariz, I'd like to talk about…"
          className={`${inputClass} resize-y`}
        />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
        >
          Send via Email
          <Mail className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
