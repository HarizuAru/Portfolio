import Link from 'next/link';

export function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  index?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="space-y-2">
      {(eyebrow || index) && (
        <p className="text-xs font-mono text-primary uppercase tracking-wider">
          {index && <span className="text-muted-foreground mr-2">{index}</span>}
          {eyebrow}
        </p>
      )}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h2>
        {action && (
          <Link
            href={action.href}
            className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            {action.label} →
          </Link>
        )}
      </div>
      {description && <p className="text-muted max-w-3xl">{description}</p>}
    </div>
  );
}

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-3 pt-10 pb-2">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">{title}</h1>
      <p className="text-muted max-w-3xl leading-relaxed">{description}</p>
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border p-8 text-center space-y-2">
      <p className="font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted max-w-md mx-auto">{description}</p>
    </div>
  );
}
