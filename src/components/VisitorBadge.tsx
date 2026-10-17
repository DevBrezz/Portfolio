import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

// A lightweight public counter. It counts browsers once per 14-day window,
// not named/identified people. Google Analytics provides richer aggregate reports.
const PERIOD_MS = 14 * 24 * 60 * 60 * 1000;
const COUNTER_NAMESPACE = 'kingbrezz-portfolio';
const periodKey = () => String(Math.floor(Date.now() / PERIOD_MS));

export function VisitorBadge() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const bucket = periodKey();
    const seenKey = `kb-visitor-seen-${bucket}`;
    const endpoint = `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/visitors-${bucket}`;

    const request = async () => {
      let seen = false;
      try {
        seen = localStorage.getItem(seenKey) === '1';
      } catch {
        // If storage is blocked, count this visit rather than failing silently.
      }

      try {
        const response = await fetch(`${endpoint}/${seen ? 'get' : 'up'}`, {
          method: 'GET',
          cache: 'no-store',
        });
        if (!response.ok) throw new Error(`Counter returned ${response.status}`);
        const data: { count?: number; value?: number } = await response.json();
        const value = Number(data.count ?? data.value);
        if (!Number.isFinite(value)) throw new Error('Invalid counter response');
        if (!seen) {
          try { localStorage.setItem(seenKey, '1'); } catch { /* storage may be blocked */ }
        }
        if (!cancelled) setCount(value);
      } catch {
        if (!cancelled) setCount(null);
      }
    };

    void request();
    return () => { cancelled = true; };
  }, []);

  const label = count === null
    ? 'Visitor counter unavailable; check Google Analytics for traffic reports.'
    : `${count.toLocaleString()} browser visits counted in the current 14-day period. This does not identify individual people.`;

  return (
    <div
      className="kb-visitor-badge"
      title={label}
      aria-label={label}
      style={{
        position: 'fixed',
        top: 'max(12px, env(safe-area-inset-top))',
        right: 'max(12px, env(safe-area-inset-right))',
        zIndex: 1000,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '7px 10px',
        border: '1px solid rgba(255,255,255,0.16)',
        borderRadius: 999,
        background: 'rgba(12,12,12,0.82)',
        color: '#f5f5f5',
        fontSize: 12,
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
        pointerEvents: 'auto',
      }}
    >
      <Eye size={14} aria-hidden="true" />
      <span>{count === null ? '—' : count.toLocaleString()}</span>
    </div>
  );
}
