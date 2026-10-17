import { useMemo, useState } from 'react';
import { Search, ArrowUpRight, PackageOpen } from 'lucide-react';
import { useResources } from '../hooks/useResources';
import { ProjectCard } from '../components/ProjectCard';
import type { Resource } from '../types/resource';

type Source = 'modrinth' | 'spigot';
function SourceLogo({ source }: { source: Source }) {
  if (source === 'modrinth') return <span className="source-logo modrinth-logo" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M8 8h9v9H8zM20 8h12v5H20zM20 16h5v16h-5zM8 20h9v12H8zM28 17h4v15h-4z" fill="currentColor"/><path d="M4 4h32v32H4z" fill="none" stroke="currentColor" strokeWidth="2"/></svg></span>;
  return <span className="source-logo spigot-logo" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M20 3 36 12v16L20 37 4 28V12z" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M12 13h16v5H17v4h10v5H12z" fill="currentColor"/></svg></span>;
}
export function Projects() {
  const { resources, loading, error } = useResources();
  const [source, setSource] = useState<Source>('modrinth');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'updated'|'downloads'|'alphabetical'>('updated');
  const visible = useMemo(() => resources.filter(r => !r.hidden && r.platform === source && (!search.trim() || `${r.title} ${r.description} ${r.categories.join(' ')}`.toLowerCase().includes(search.toLowerCase()))).sort((a,b) => sort === 'downloads' ? b.downloads-a.downloads : sort === 'alphabetical' ? a.title.localeCompare(b.title) : new Date(b.updated).getTime()-new Date(a.updated).getTime()), [resources,source,search,sort]);
  const sourceCounts = { modrinth: resources.filter(r=>!r.hidden&&r.platform==='modrinth').length, spigot: resources.filter(r=>!r.hidden&&r.platform==='spigot').length };
  return <div className="pt-24 pb-16 min-h-screen mc-grid-bg"><div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="mb-8"><span className="eyebrow">THE PROJECT LIBRARY</span><h1 className="text-3xl md:text-4xl font-bold text-mc-white mt-2">Projects & plugins</h1><p className="text-mc-muted mt-2 text-sm max-w-2xl">Choose a platform to browse its catalog. Each project card links to its official page and available download.</p></div>
    <div className="source-picker" role="tablist" aria-label="Choose project platform">
      <button type="button" role="tab" aria-selected={source==='modrinth'} className={`source-choice ${source==='modrinth'?'active':''}`} onClick={()=>setSource('modrinth')}><SourceLogo source="modrinth"/><span className="source-choice-copy"><strong>Modrinth</strong><small>{sourceCounts.modrinth} projects · Mods & plugins</small></span><ArrowUpRight size={17}/></button>
      <button type="button" role="tab" aria-selected={source==='spigot'} className={`source-choice ${source==='spigot'?'active':''}`} onClick={()=>setSource('spigot')}><SourceLogo source="spigot"/><span className="source-choice-copy"><strong>SpigotMC</strong><small>{sourceCounts.spigot} resources · Server plugins</small></span><ArrowUpRight size={17}/></button>
    </div>
    <div className="project-toolbar"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mc-muted"/><input type="search" placeholder={`Search ${source==='modrinth'?'Modrinth':'SpigotMC'} projects...`} value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-mc-gray border border-mc-border text-sm text-mc-white placeholder:text-mc-muted focus:outline-none focus:border-mc-red"/></div><select value={sort} onChange={e=>setSort(e.target.value as typeof sort)} className="px-3 py-3 rounded-xl bg-mc-gray border border-mc-border text-sm text-mc-text"><option value="updated">Recently updated</option><option value="downloads">Most downloads</option><option value="alphabetical">A–Z</option></select></div>
    {error && <div className="bg-red-900/30 border border-red-700 text-red-200 rounded-xl p-4 mb-6 text-sm">Could not load the project catalog: {error}</div>}
    {loading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{Array.from({length:6}).map((_,i)=><div key={i} className="skeleton h-64 rounded-xl"/>)}</div> : visible.length ? <><div className="text-xs text-mc-muted mb-4">Showing {visible.length} {source==='modrinth'?'Modrinth':'SpigotMC'} resources</div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{visible.map((r:Resource,i)=><ProjectCard key={r.id} resource={r} index={i}/>)}</div></> : <div className="empty-project-state"><PackageOpen size={28}/><h2 className="text-lg font-semibold text-mc-white">No projects found here yet</h2><p>Try another search, or visit the official {source==='modrinth'?'Modrinth':'SpigotMC'} profile.</p><a href={source==='modrinth'?'https://modrinth.com/user/KingBrezz':'https://www.spigotmc.org/resources/authors/brezz.2530124/'} target="_blank" rel="noreferrer">Open {source==='modrinth'?'Modrinth':'SpigotMC'} profile <ArrowUpRight size={14}/></a></div>}
  </div></div>;
}
