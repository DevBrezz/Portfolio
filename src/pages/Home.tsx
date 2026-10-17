import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Shield, Code2, Download } from 'lucide-react';
import { useResources } from '../hooks/useResources';
import { ProjectCard } from '../components/ProjectCard';
import { useLanguage } from '../lib/i18n';
import { useMemo } from 'react';

export function Home() {
  const { resources, loading } = useResources();
  const { t } = useLanguage();
  const featured = useMemo(() => resources.filter((r) => !r.hidden && r.platform !== 'custom' && r.url).sort((a,b) => Number(b.featured)-Number(a.featured) || new Date(b.updated).getTime()-new Date(a.updated).getTime()).slice(0, 10), [resources]);

  return (
    <div className="mc-grid-bg home-cosmic">
      <section className="relative min-h-[86vh] flex items-center pt-24 pb-12 overflow-hidden">
        <div className="cosmic-glow cosmic-glow-one"/><div className="cosmic-glow cosmic-glow-two"/>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 w-full relative z-10">
          <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="hero-copy">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mc-surface border border-mc-border text-xs text-mc-muted mb-6"><span className="status-pulse"/> INDEPENDENT DEVELOPER · MINECRAFT ECOSYSTEM</div>
            <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-bold text-mc-white leading-tight tracking-tight max-w-4xl">Building tools for <span className="hero-gradient">Minecraft</span><br/>and the people behind it.</h1>
            <p className="mt-5 text-lg text-mc-muted max-w-2xl leading-relaxed">I’m <strong className="kingbrezz-animated">KingBrezz</strong> — an independent developer creating Minecraft plugins, server systems, and practical tools with a focus on useful features, smooth gameplay, and thoughtful engineering.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-mc-red text-white font-semibold text-sm hover:bg-mc-red-bright transition-all hover:-translate-y-0.5">Explore projects <ArrowRight className="w-4 h-4"/></Link>
              <a href="https://modrinth.com/user/KingBrezz" target="_blank" rel="noreferrer" className="platform-button"><img src="https://cdn.modrinth.com/brand/Modrinth_Logo.svg" alt=""/> Modrinth <ExternalLink size={14}/></a>
              <a href="https://www.spigotmc.org/resources/authors/brezz.2530124/" target="_blank" rel="noreferrer" className="platform-button"><span className="spigot-mini-logo">S</span> SpigotMC <ExternalLink size={14}/></a>
            </div>
          </motion.div>
          <motion.div className="solar-story" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{delay:.2,duration:.8}} aria-label="Animated solar system representing KingBrezz's creative universe">
            <div className="solar-copy"><span className="eyebrow">A SMALL UNIVERSE OF IDEAS</span><h2>One creator.<br/><span>Many worlds to build.</span></h2><p>Every project starts with a spark — then grows through code, testing, feedback, and the Minecraft community.</p><Link to="/about" className="solar-read-more">Discover KingBrezz <ArrowRight size={15}/></Link></div>
            <div className="solar-scene"><div className="solar-stars"/><div className="solar-sun"><span>KB</span></div><div className="solar-orbit orbit-one"><div className="planet planet-one"><i/> <span>Plugins</span></div></div><div className="solar-orbit orbit-two"><div className="planet planet-two"><i/><span>Servers</span></div></div><div className="solar-orbit orbit-three"><div className="planet planet-three"><i/><span>Tools</span></div></div><div className="solar-orbit orbit-four"><div className="planet planet-four"><i/><span>Community</span></div></div><div className="solar-label label-core">KINGBREZZ · CREATIVE SYSTEM</div></div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="flex items-end justify-between gap-4 mb-7"><div><span className="eyebrow">BUILT FOR REAL SERVERS</span><h2 className="text-2xl md:text-3xl font-bold text-mc-white mt-2">Featured projects</h2><p className="text-sm text-mc-muted mt-2">Swipe or scroll sideways to explore. Open a project for its details and download options.</p></div><Link to="/projects" className="shrink-0 text-sm text-mc-red hover:text-mc-red-bright flex items-center gap-1">All projects <ArrowRight size={15}/></Link></div>
        {loading ? <div className="plugin-carousel">{Array.from({length:4}).map((_,i)=><div key={i} className="plugin-carousel-item skeleton h-64 rounded-xl"/>)}</div> : featured.length ? <div className="plugin-carousel" aria-label="Featured projects. Swipe horizontally to browse" tabIndex={0}>{featured.map((r,i)=><div className="plugin-carousel-item" key={r.id}><ProjectCard resource={r} index={i}/></div>)}</div> : <div className="empty-project-state"><Code2 size={26}/><p>Projects will appear here when the catalog is available.</p><Link to="/projects">Browse project catalog <ArrowRight size={14}/></Link></div>}
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8"><div className="security-banner"><div className="shield-orbit"><Shield size={34}/><span/></div><div><h2 className="text-lg font-bold text-mc-white">Built thoughtfully. Reviewed honestly.</h2><p className="text-sm text-mc-muted mt-1">Security matters. Project pages link to their source and release information where available. No plugin should be labelled “100% safe” without evidence and ongoing testing.</p></div></div></section>
      <div className="xp-strip max-w-6xl mx-auto px-4 sm:px-6 pb-14"><Link to="/xp" className="xp-link"><span className="xp-line"/><span className="xp-pill">✦ XP +1</span><span className="xp-hint">Curious? There's a hidden room.</span></Link></div>
    </div>
  );
}
