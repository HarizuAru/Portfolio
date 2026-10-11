'use client';

import dynamic from 'next/dynamic';
import { useGlobalContext } from '@/context/global-context';

// p5 is ~1MB: split it into its own chunk and skip SSR entirely so it
// never blocks first paint or the static prerender.
const ForceFieldBackground = dynamic(
  () => import('@/components/force-field-background').then((m) => m.ForceFieldBackground),
  { ssr: false }
);

// Hero backdrop only: dark theme + motion-safe. Light theme and
// reduced-motion users get the clean static hero instead.
export function HeroBackground() {
  const { theme } = useGlobalContext();
  if (theme !== 'dark') return null;

  return (
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
  );
}
