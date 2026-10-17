import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

// Counts visits in rolling 14-day buckets using a public counter endpoint.
export function VisitorBadge() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    let active = true;
    const bucket = Math.floor(Date.now() / (14 * 24 * 60 * 60 * 1000));
    const key = `visits-${bucket}`;
    fetch(`https://api.counterapi.dev/v1/kingbrezz-portfolio/${key}/up`, { cache: 'no-store' })
      .then((response) => { if (!response.ok) throw new Error('Counter unavailable'); return response.json(); })
      .then((data: { count?: number; data?: { up_count?: number } }) => {
        const value = data.count ?? data.data?.up_count;
        if (active && typeof value === 'number') setCount(value);
      }).catch(() => { if (active) setCount(null); });
    return () => { active = false; };
  }, []);
  if (count === null) return null;
  return <div className="kb-visitor-badge" title="Visits during this 14-day period" aria-label={`${count} visits during this 14-day period`}><Eye size={14}/><span>{count.toLocaleString()}</span></div>;
}
