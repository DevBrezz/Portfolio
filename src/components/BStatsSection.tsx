import { useEffect, useState } from 'react';
import { Activity, ExternalLink, Users, Server, RefreshCw, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

type Plugin = { id: number; name: string; charts?: Record<string, { uid: number; type: string; title: string; isDefault?: boolean }> };
type Metric = { id: number; name: string; url: string; latestPlayers: number | null; latestServers: number | null; loading: boolean };
const plugins = [
  { id: 34529, name: 'CostumeEnchant', url: 'https://bstats.org/plugin/bukkit/CostumeEnchant/34529' },
  { id: 34146, name: 'ClaimCore', url: 'https://bstats.org/plugin/bukkit/ClaimCore/34146' },
  { id: 34226, name: 'EcoSMP', url: 'https://bstats.org/plugin/bukkit/EcoSMP/34226' },
  { id: 34510, name: 'DonutSUS', url: 'https://bstats.org/plugin/bukkit/DonutSUS/34510' },
];

async function latestValue(pluginId: number, charts: Plugin['charts'], terms: string[]) {
  const chart = Object.values(charts ?? {}).find((item) => terms.some((term) => item.title.toLowerCase().includes(term)) && /linechart/i.test(item.type));
  if (!chart) return null;
  try {
    const response = await fetch(`https://bstats.org/api/v1/plugins/${pluginId}/charts/${chart.uid}/data`, { headers: { Accept: 'application/json' } });
    if (!response.ok) return null;
    const rows: unknown = await response.json();
    if (!Array.isArray(rows) || !rows.length) return null;
    const last = rows[rows.length - 1];
    if (Array.isArray(last) && typeof last[1] === 'number') return last[1];
    if (last && typeof last === 'object') {
      const values = Object.values(last as Record<string, unknown>).filter((v): v is number => typeof v === 'number');
      return values.length ? values[values.length - 1] : null;
    }
    return null;
  } catch { return null; }
}

function numberLabel(value: number | null) { return value === null ? 'View live stats' : new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value); }

export function BStatsSection() {
  const [metrics, setMetrics] = useState<Metric[]>(plugins.map((p) => ({ ...p, latestPlayers: null, latestServers: null, loading: true })));
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    setRefreshing(true);
    const next = await Promise.all(plugins.map(async (p): Promise<Metric> => {
      try {
        const response = await fetch(`https://bstats.org/api/v1/plugins/${p.id}`, { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Stats unavailable');
        const detail: Plugin = await response.json();
        const charts = detail.charts ?? {};
        const [players, servers] = await Promise.all([
          latestValue(p.id, charts, ['players']),
          latestValue(p.id, charts, ['servers', 'instances']),
        ]);
        return { ...p, latestPlayers: players, latestServers: servers, loading: false };
      } catch { return { ...p, latestPlayers: null, latestServers: null, loading: false }; }
    }));
    setMetrics(next);
    setRefreshing(false);
  }

  useEffect(() => { void load(); }, []);

  return <section className="bstats-section max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div><div className="eyebrow"><Activity size={14} /> PUBLIC TELEMETRY</div><h2 className="section-heading">Projects in the wild<span>.</span></h2><p className="text-mc-muted mt-2 max-w-xl">Live bStats data for selected plugins. Metrics update when bStats publishes new samples.</p></div>
      <button type="button" onClick={() => void load()} disabled={refreshing} className="refresh-button"><RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} /> Refresh stats</button>
    </motion.div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {metrics.map((item, index) => <motion.article key={item.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }} className="metric-card">
        <div className="flex items-start justify-between gap-3"><div className={`metric-mark mark-${index}`}>{item.name.slice(0, 2).toUpperCase()}</div><a href={item.url} target="_blank" rel="noreferrer" className="metric-external" aria-label={`Open ${item.name} bStats`}><ExternalLink size={15} /></a></div>
        <h3>{item.name}</h3><p className="metric-caption">Bukkit / Spigot metrics</p>
        <div className="metric-values">
          <div><Users size={14} /><strong>{item.loading ? '…' : numberLabel(item.latestPlayers)}</strong><span>Players</span></div>
          <div><Server size={14} /><strong>{item.loading ? '…' : numberLabel(item.latestServers)}</strong><span>Servers</span></div>
        </div>
        <a className="metric-link" href={item.url} target="_blank" rel="noreferrer"><BarChart3 size={14} /> Explore charts <span>↗</span></a>
      </motion.article>)}
    </div>
    <p className="text-xs text-mc-muted mt-4">If live numbers are unavailable, open the official bStats page. No statistics are fabricated or hard-coded.</p>
  </section>;
}
