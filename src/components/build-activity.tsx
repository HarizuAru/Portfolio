import { projectsData } from '@/data/projects';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Month-by-month project completions, derived from real completion dates.
// Projects without a known date are excluded rather than guessed.
export function BuildActivity() {
  const dates = projectsData.map((p) => p.completionDate).filter((d): d is string => Boolean(d)).sort();
  if (dates.length === 0) return null;
  const [minY, minM] = dates[0].split('-').map(Number);
  const [maxY, maxM] = dates[dates.length - 1].split('-').map(Number);
  const totalMonths = (maxY - minY) * 12 + (maxM - minM) + 1;

  const buckets: { key: string; label: string; count: number; titles: string[] }[] = [];
  for (let i = 0; i < totalMonths; i++) {
    const y = minY + Math.floor((minM - 1 + i) / 12);
    const m = ((minM - 1 + i) % 12) + 1;
    const key = `${y}-${String(m).padStart(2, '0')}`;
    const inMonth = projectsData.filter((p) => (p.completionDate ?? '').startsWith(key));
    buckets.push({
      key,
      label: `${MONTHS[m - 1]} ${String(y).slice(2)}`,
      count: inMonth.length,
      titles: inMonth.map((p) => p.title),
    });
  }
  const max = Math.max(1, ...buckets.map((b) => b.count));

  return (
    <div className="rounded-xl border border-border bg-secondary/20 p-4 sm:p-5 space-y-3">
      <p className="text-xs font-mono text-muted uppercase tracking-wider">
        Projects completed per month · {dates[0].slice(0, 7)} → {dates[dates.length - 1].slice(0, 7)}
      </p>
      <ol className="flex items-end gap-1 sm:gap-1.5 h-20" aria-label="Project completions by month">
        {buckets.map((b, i) => (
          <li key={b.key} className="flex-1 h-full flex flex-col justify-end items-center gap-1 min-w-0">
            <div
              title={b.count > 0 ? `${b.label}: ${b.titles.join(', ')}` : `${b.label}: —`}
              aria-label={`${b.label}: ${b.count} project${b.count === 1 ? '' : 's'}`}
              className={`w-full rounded-sm transition-all ${b.count > 0 ? 'bg-primary/70 hover:bg-primary' : 'bg-secondary'}`}
              style={{ height: `${Math.max(b.count > 0 ? 12 : 4, (b.count / max) * 100)}%` }}
            />
            {(i === 0 || i === buckets.length - 1 || i % 3 === 2) && (
              <span className="text-[9px] font-mono text-muted-foreground truncate">{b.label}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
