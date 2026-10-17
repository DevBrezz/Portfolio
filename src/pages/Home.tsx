import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Code2, Server, Shield, Zap, Package } from 'lucide-react';
import { useResources } from '../hooks/useResources';
import { ProjectCard } from '../components/ProjectCard';
import { BStatsSection } from '../components/BStatsSection';
import { useLanguage } from '../lib/i18n';
import { Link as RouterLink } from 'react-router-dom';

export function Home() {
  const { resources, loading, data } = useResources();
  const { t } = useLanguage();
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
          <div className="hero-3d-stage" aria-label="Slowly rotating three-dimensional digital globe"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="globe-3d"><div className="globe-land land-a"/><div className="globe-land land-b"/><div className="globe-grid"/></div><div className="floating-shield"><Shield size={30}/><span>SECURITY-MINDED</span></div><div className="globe-caption"><span className="status-pulse"/> MINECRAFT · CODE · COMMUNITY</div></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mc-surface border border-mc-border text-xs text-mc-muted mb-6">
              <span className="status-pulse" />
              INDEPENDENT DEVELOPER · MINECRAFT ECOSYSTEM
            </div>

            <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-bold text-mc-white leading-tight tracking-tight max-w-4xl">
              Building powerful tools for{' '}
              <span className="hero-gradient">Minecraft</span> servers
            </h1>

            <p className="mt-5 text-lg text-mc-muted max-w-xl leading-relaxed">
              I’m <strong className="kingbrezz-animated">KingBrezz</strong> — an independent developer building practical Minecraft server software, from gameplay systems and economy tools to protection, automation, and performance-focused plugins.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-mc-red text-white font-medium text-sm hover:bg-mc-red-bright transition-colors"
              >
                {t.browse} <ArrowRight className="w-4 h-4" />
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
              { icon: Package, label: t.resources, value: resources.length || '—' },
              { icon: Server, label: t.platforms, value: '2' },
              { icon: Shield, label: t.focus, value: 'Security & Economy' },
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
      <BStatsSection />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-mc-white">{t.featured}</h2>
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
          <div className="plugin-carousel" aria-label="Featured plugins. Swipe horizontally to browse" tabIndex={0}>
            {featured.map((r, i) => <div className="plugin-carousel-item" key={r.id}><ProjectCard resource={r} index={i} /></div>)}
          </div>
        )}
      </section>

      {/* Latest */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-mc-white">{t.latest}</h2>
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
        <h2 className="text-2xl font-bold text-mc-white mb-6">{t.stack}</h2>
        <div className="flex flex-wrap gap-2">
          {['Java', 'Paper', 'Spigot', 'Purpur', 'Folia', 'PlaceholderAPI', 'Vault', 'SQLite / MySQL', 'ProtocolLib', 'Geyser / Floodgate'].map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-lg bg-mc-surface border border-mc-border text-sm text-mc-text">
              {t}
            </span>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10"><div className="security-banner"><div className="shield-orbit"><Shield size={34}/><span/></div><div><h2 className="text-lg font-bold text-mc-white">{t.security}</h2><p className="text-sm text-mc-muted mt-1">{t.securityNote}</p></div></div></section>
      <div className="xp-strip max-w-6xl mx-auto px-4 sm:px-6 pb-14"><RouterLink to="/xp" className="xp-link"><span className="xp-line"/><span className="xp-pill">✦ {t.xp} +1</span><span className="xp-hint">Curious? Click to discover a secret</span></RouterLink></div>
    </div>
  );
}

