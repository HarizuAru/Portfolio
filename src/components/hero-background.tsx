'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/global-context';
import { ErrorBoundary } from '@/components/error-boundary';

// p5 is ~1MB: split it into its own chunk and skip SSR entirely so it
// never blocks first paint or the static prerender.
const ForceFieldBackground = dynamic(
  () => import('@/components/force-field-background').then((m) => m.ForceFieldBackground),
  { ssr: false }
);

// Hero backdrop only: dark theme + motion-safe. Light theme and
// reduced-motion users get the clean static hero instead.
// Mounts after browser idle so it can never compete with hydration,
// and sits inside an error boundary so a canvas failure can never
// take down the page.
export function HeroBackground() {
  const { theme } = useGlobalContext();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (theme !== 'dark' || !ready) return null;

  return (
    <ErrorBoundary>
      <ForceFieldBackground
        hue={152}
        saturation={90}
        spacing={14}
        minStroke={1}
        maxStroke={4}
        forceStrength={8}
        magnifierRadius={140}
        friction={0.92}
        restoreSpeed={0.06}
        className="hero-field-mask opacity-70"
      />
    </ErrorBoundary>
  );
}
