import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Code2, Server, Shield, Zap, Package } from 'lucide-react';
import { useResources } from '../hooks/useResources';
import { ProjectCard } from '../components/ProjectCard';

export function Home() {
  const { resources, loading, data } = useResources();
  const featured = resources.filter((r) => r.featured && !r.hidden).slice(0, 6);
  const latest = [...resources]
    .filter((r) => !r.hidden)
    .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
    .slice(0, 6);

  return (
    <div className="mc-grid-bg">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-mc-black via-mc-dark/80 to-mc-black pointer-events-none" />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(192,57,43,0.15) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(93,138,62,0.1) 0%, transparent 40%)`
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mc-surface border border-mc-border text-xs text-mc-muted mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-mc-grass animate-pulse" />
              Minecraft Plugin Developer
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-mc-white leading-tight tracking-tight max-w-3xl">
              Building powerful tools for{' '}
              <span className="text-mc-red">Minecraft</span> servers
            </h1>

            <p className="mt-5 text-lg text-mc-muted max-w-xl leading-relaxed">
              Hi, I'm <strong className="text-mc-white">KingBrezz</strong> (ItsMe Brezz).
              I create high-quality plugins, anti-cheat, economy systems, and server utilities
              for Paper, Purpur, Folia, and Spigot.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-mc-red text-white font-medium text-sm hover:bg-mc-red-bright transition-colors"
              >
                Browse Projects <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://modrinth.com/user/KingBrezz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-mc-surface border border-mc-border text-mc-text font-medium text-sm hover:border-mc-red/50 transition-colors"
              >
                Modrinth <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.spigotmc.org/resources/authors/brezz.2530124/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-mc-surface border border-mc-border text-mc-text font-medium text-sm hover:border-mc-red/50 transition-colors"
              >
                SpigotMC <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { icon: Package, label: 'Resources', value: resources.length || '—' },
              { icon: Server, label: 'Platforms', value: '2' },
              { icon: Shield, label: 'Focus', value: 'Security & Economy' },
              { icon: Zap, label: 'Last Sync', value: data ? new Date(data.lastSynced).toLocaleDateString() : '—' },
            ].map((s, i) => (
              <div key={i} className="bg-mc-surface/80 border border-mc-border rounded-xl p-4">
                <s.icon className="w-5 h-5 text-mc-red mb-2" />
                <div className="text-xl font-bold text-mc-white">{s.value}</div>
                <div className="text-xs text-mc-muted mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-mc-white">Featured Projects</h2>
            <p className="text-sm text-mc-muted mt-1">Hand-picked resources from my catalog</p>
          </div>
          <Link to="/projects" className="text-sm text-mc-red hover:text-mc-red-bright flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((r, i) => (
              <ProjectCard key={r.id} resource={r} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Latest */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-mc-white">Recently Updated</h2>
            <p className="text-sm text-mc-muted mt-1">Latest changes across platforms</p>
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.map((r, i) => (
              <ProjectCard key={r.id} resource={r} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Tech */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-mc-white mb-6">Technology Stack</h2>
        <div className="flex flex-wrap gap-2">
          {['Java', 'Paper API', 'Spigot API', 'Folia', 'Purpur', 'Vault', 'PlaceholderAPI', 'MySQL', 'Redis', 'Discord Bot', 'Bedrock / Geyser'].map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-lg bg-mc-surface border border-mc-border text-sm text-mc-text">
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

