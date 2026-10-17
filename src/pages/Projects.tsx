import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useResources, useFilteredResources } from '../hooks/useResources';
import { ProjectCard } from '../components/ProjectCard';
import type { SortOption, PlatformFilter } from '../types/resource';

export function Projects() {
  const { resources, loading, error, data } = useResources();
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState<PlatformFilter>('all');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<SortOption>('updated');

  const filtered = useFilteredResources(resources, search, platform, category, sort);

  const categories = Array.from(
    new Set(resources.flatMap((r) => r.categories))
  ).sort();

  return (
    <div className="pt-24 pb-16 min-h-screen mc-grid-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-mc-white">Projects & Resources</h1>
          <p className="text-mc-muted mt-1 text-sm">
            {resources.length} resources • Last synced {data ? new Date(data.lastSynced).toLocaleString() : '—'}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-mc-surface border border-mc-border rounded-xl p-4 mb-8 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mc-muted" />
            <input
              type="search"
              placeholder="Search by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-mc-gray border border-mc-border text-sm text-mc-white placeholder:text-mc-muted focus:outline-none focus:border-mc-red"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-4 h-4 text-mc-muted" />
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PlatformFilter)}
              className="px-3 py-1.5 rounded-lg bg-mc-gray border border-mc-border text-xs text-mc-text focus:outline-none focus:border-mc-red"
            >
              <option value="all">All Platforms</option>
              <option value="modrinth">Modrinth</option>
              <option value="spigot">SpigotMC</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-mc-gray border border-mc-border text-xs text-mc-text focus:outline-none focus:border-mc-red"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="px-3 py-1.5 rounded-lg bg-mc-gray border border-mc-border text-xs text-mc-text focus:outline-none focus:border-mc-red"
            >
              <option value="updated">Recently Updated</option>
              <option value="newest">Newest</option>
              <option value="downloads">Most Downloads</option>
              <option value="alphabetical">Alphabetical</option>
            </select>

            <span className="text-xs text-mc-muted ml-auto">{filtered.length} results</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-200 rounded-xl p-4 mb-6 text-sm">
            Failed to load resources: {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-mc-muted">
            <p className="text-lg">No resources match your filters.</p>
            <button
              onClick={() => { setSearch(''); setPlatform('all'); setCategory('all'); }}
              className="mt-3 text-sm text-mc-red hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r, i) => (
              <ProjectCard key={r.id} resource={r} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
