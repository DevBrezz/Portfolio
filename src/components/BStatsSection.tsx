import { useCallback, useEffect, useState } from 'react';
import { Activity, ExternalLink, Users, Server, RefreshCw, BarChart3, Clock3 } from 'lucide-react';
import { motion } from 'framer-motion';
import './BStatsAnalytics.css';

type Chart = { id?: number; uid?: number; type?: string; title?: string; name?: string };
type PluginInfo = { id?: number; name?: string; charts?: Record<string, Chart> | Chart[] };
type Point = { label: string; value: number };
type Metric = { id: number; name: string; url: string; players: number | null; servers: number | null; history: Point[]; updatedAt: string | null; loading: boolean; error: boolean };
const PLUGINS = [
  { id: 34529, name: 'CostumeEnchant', url: 'https://bstats.org/plugin/bukkit/CostumeEnchant/34529' },
  { id: 34146, name: 'ClaimCore', url: 'https://bstats.org/plugin/bukkit/ClaimCore/34146' },
  { id: 34226, name: 'EcoSMP', url: 'https://bstats.org/plugin/bukkit/EcoSMP/34226' },
  { id: 34510, name: 'DonutSUS', url: 'https://bstats.org/plugin/bukkit/DonutSUS/34510' },
];
const emptyMetrics = (): Metric[] => PLUGINS.map(p => ({ ...p, players: null, servers: null, history: [], updatedAt: null, loading: true, error: false }));
const fmt = (n: number | null) => n === null ? 'Unavailable' : new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);
function parsePoints(raw: unknown): Point[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((row, i) => {
    if (Array.isArray(row) && typeof row[row.length - 1] === 'number') return [{ label: String(row[0] ?? i + 1), value: row[row.length - 1] as number }];
    if (row && typeof row === 'object') {
      const obj = row as Record<string, unknown>;
      const nums = Object.entries(obj).filter(([, v]) => typeof v === 'number');
      if (nums.length) return [{ label: String(obj.date ?? obj.timestamp ?? i + 1), value: nums[nums.length - 1][1] as number }];
    }
    return [];
  }).slice(-14);
}
function MiniChart({ points, label }: { points: Point[]; label: string }) {
  if (points.length < 2) return <div className="bstats-chart-empty">Trend chart appears when bStats provides historical samples.</div>;
  const values = points.map(p => p.value), min = Math.min(...values), max = Math.max(...values), range = max - min || 1;
  const coords = values.map((v, i) => `${(i / (values.length - 1)) * 100},${28 - ((v - min) / range) * 23}`).join(' ');
  const last = values[values.length - 1];
  return <div className="bstats-trend"><div className="bstats-trend-head"><span>{label} trend</span><strong>{fmt(last)}</strong></div><svg viewBox="0 0 100 32" preserveAspectRatio="none" role="img" aria-label={`${label} historical trend`}><polyline points={coords} fill="none" stroke="currentColor" strokeWidth="1.8" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" /></svg><div className="bstats-trend-foot"><span>{points[0].label}</span><span>{points[points.length - 1].label}</span></div></div>;
}
async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`bStats HTTP ${res.status}`);
  return res.json();
}
async function fetchPlugin(id: number): Promise<{ players: number | null; servers: number | null; history: Point[]; updatedAt: string | null }> {
  // bStats REST routes have changed over time; try the public legacy service API first,
  // then the older plugin API. Never substitute fabricated values when endpoints fail.
  const details = await (async () => {
    for (const url of [`https://bstats.org/api/v1/plugins/${id}`, `https://bstats.org/api/legacy/service/${id}`, `https://bstats.org/api/services/legacy/${id}`]) {
      try { const value = await fetchJson(url); if (value && typeof value === 'object') return value as PluginInfo & Record<string, unknown>; } catch { /* try next public route */ }
    }
    throw new Error('bStats service details unavailable');
  })();
  const rawCharts = details.charts;
  const charts: Chart[] = Array.isArray(rawCharts) ? rawCharts : Object.values(rawCharts ?? {});
  const findChart = (...terms: string[]) => charts.find(c => terms.some(t => `${c.title ?? ''} ${c.name ?? ''}`.toLowerCase().includes(t)));
  async function chartData(chart?: Chart): Promise<Point[]> {
    if (!chart) return [];
    const chartId = chart.uid ?? chart.id;
    if (chartId === undefined) return [];
    for (const url of [`https://bstats.org/api/v1/plugins/${id}/charts/${chartId}/data`, `https://bstats.org/api/charts/${chartId}/data`, `https://bstats.org/api/legacy/service/${id}/charts/${chartId}`]) {
      try { const data = parsePoints(await fetchJson(url)); if (data.length) return data; } catch { /* try next endpoint */ }
    }
    return [];
  }
  const serverChart = findChart('servers', 'instances');
  const playerChart = findChart('players', 'player count');
  const [serverHistory, playerHistory] = await Promise.all([chartData(serverChart), chartData(playerChart)]);
  const latest = (points: Point[]) => points.length ? points[points.length - 1].value : null;
  return { servers: latest(serverHistory), players: latest(playerHistory), history: serverHistory, updatedAt: serverHistory.length ? new Date().toISOString() : null };
}
export function BStatsSection() {
  const [metrics, setMetrics] = useState<Metric[]>(emptyMetrics);
  const [refreshing, setRefreshing] = useState(false);
  const load = useCallback(async () => {
    setRefreshing(true);
    const next = await Promise.all(PLUGINS.map(async (p): Promise<Metric> => {
      try { const data = await fetchPlugin(p.id); return { ...p, ...data, loading: false, error: data.servers === null && data.players === null }; }
      catch { return { ...p, players: null, servers: null, history: [], updatedAt: null, loading: false, error: true }; }
    }));
    setMetrics(next); setRefreshing(false);
  }, []);
  useEffect(() => { void load(); }, [load]);
  const totalServers = metrics.some(m => m.servers !== null) ? metrics.reduce((sum, m) => sum + (m.servers ?? 0), 0) : null;
  const totalPlayers = metrics.some(m => m.players !== null) ? metrics.reduce((sum, m) => sum + (m.players ?? 0), 0) : null;
  return <section className="bstats-section max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div><div className="eyebrow"><Activity size={14} /> PUBLIC TELEMETRY</div><h2 className="section-heading">Plugin analytics<span>.</span></h2><p className="text-mc-muted mt-2 max-w-xl">Server adoption and player metrics from public bStats data, displayed here without leaving the portfolio.</p></div>
      <button type="button" onClick={() => void load()} disabled={refreshing} className="refresh-button"><RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} /> {refreshing ? 'Refreshing…' : 'Refresh stats'}</button>
    </motion.div>
    <div className="bstats-summary grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
      <div className="bstats-summary-card"><Server size={18}/><span>Tracked server metrics</span><strong>{fmt(totalServers)}</strong></div>
      <div className="bstats-summary-card"><Users size={18}/><span>Tracked player metrics</span><strong>{fmt(totalPlayers)}</strong></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {metrics.map((item, index) => <motion.article key={item.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }} className="metric-card">
        <div className="flex items-start justify-between gap-3"><div className={`metric-mark mark-${index}`}>{item.name.slice(0, 2).toUpperCase()}</div><a href={item.url} target="_blank" rel="noreferrer" className="metric-external" aria-label={`Open ${item.name} bStats`}><ExternalLink size={15}/></a></div>
        <h3>{item.name}</h3><p className="metric-caption">Bukkit / Spigot metrics</p>
        <div className="metric-values"><div><Users size={14}/><strong>{item.loading ? '…' : fmt(item.players)}</strong><span>Players</span></div><div><Server size={14}/><strong>{item.loading ? '…' : fmt(item.servers)}</strong><span>Servers</span></div></div>
        <MiniChart points={item.history} label="Servers" />
        <div className="bstats-status"><span className={item.error ? 'bstats-status-dot is-error' : 'bstats-status-dot'}/>{item.loading ? 'Fetching public data' : item.error ? 'Data unavailable · source linked' : 'Public data loaded'} <Clock3 size={12}/></div>
        <a className="metric-link" href={item.url} target="_blank" rel="noreferrer"><BarChart3 size={14}/> Official bStats page <span>↗</span></a>
      </motion.article>)}
    </div>
    <p className="text-xs text-mc-muted mt-4">Values are shown only when returned by bStats. Totals are sums across these four plugins and may count the same server more than once. bStats updates periodically, not in real time.</p>
  </section>;
}
