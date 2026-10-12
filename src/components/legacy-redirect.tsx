'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export function LegacyRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-4">
      <p className="font-mono text-sm text-primary">This page has moved</p>
      <p className="text-muted">
        Redirecting to <span className="font-mono text-foreground">{to}</span>…
      </p>
      <Link
        href={to}
        className="inline-flex items-center gap-2 rounded bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        Continue
      </Link>
    </div>
  );
}
