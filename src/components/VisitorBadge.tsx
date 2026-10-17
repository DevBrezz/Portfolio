import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

// Global count uses a public counter endpoint and a 14-day bucket. Each browser increments once per bucket.
const PERIOD_MS = 14 * 24 * 60 * 60 * 1000;
const COUNTER_NAMESPACE = 'kingbrezz-portfolio';
function periodKey() { return String(Math.floor(Date.now() / PERIOD_MS)); }

export function VisitorBadge() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    let cancelled = false;
    const bucket = periodKey();
    const seenKey = `kb-visitor-seen-${bucket}`;
    const endpoint = `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/visitors-${bucket}`;
    const method = (() => {
      try { if (localStorage.getItem(seenKey)) return 'get'; localStorage.setItem(seenKey, '1'); return 'up'; }
      catch { return 'get'; }
    })();
    fetch(`${endpoint}/${method}`, { method: 'GET', cache: 'no-store' })
      .then((response) => { if (!response.ok) throw new Error('Counter unavailable'); return response.json(); })
      .then((data: { count?: number; value?: number }) => { if (!cancelled) setCount(Number(data.count ?? data.value ?? 0)); })
      .catch(() => { if (!cancelled) setCount(null); });
    return () => { cancelled = true; };
  }, []);
  return <div className="kb-visitor-badge" title="Visitors in the current 14-day period" aria-label={count === null ? 'Visitor count unavailable' : `${count} visitors in the current 14-day period`}>
    <Eye size={14} aria-hidden="true"/><span>{count === null ? '—' : count.toLocaleString()}</span>
  </div>;
}
