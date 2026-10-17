import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Code2, UserRound, Boxes, Handshake, ChevronRight } from 'lucide-react';
import { useResources } from '../hooks/useResources';
import { ProjectCard } from '../components/ProjectCard';

function ModrinthMark({ className = 'w-5 h-5' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Modrinth" fill="currentColor"><path d="M4.2 3.2 2 5.4v3.1l5.5 5.5 2.2-2.2L4.2 6.3V3.2Zm5.1 0L7.1 5.4v3.1l5.5 5.5 2.2-2.2-5.5-5.5V3.2Zm5.1 0-2.2 2.2v3.1l5.5 5.5 2.2-2.2-5.5-5.5V3.2ZM2 12.6v3.1l5.5 5.5 2.2-2.2-5.5-5.5-2.2-.9Zm5.1 0v3.1l5.5 5.5 2.2-2.2-5.5-5.5-2.2-.9Zm5.1 0v3.1l5.5 5.5 2.2-2.2-5.5-5.5-2.2-.9Z"/></svg>;
}

const paths = [
  { number: '01', icon: UserRound, title: 'Who is KingBrezz?', text: 'The developer behind the projects, ideas, and tools.', to: '/about', action: 'Meet the developer' },
  { number: '02', icon: Boxes, title: 'Plugins & projects', text: 'Explore Minecraft tools published on Modrinth.', to: '/projects', action: 'Explore projects' },
  { number: '03', icon: Handshake, title: 'Contact & collaboration', text: 'Have an idea, issue, or project to build together?', to: '/contact', action: 'Get in touch' },
];

export function Home() {
  const { resources, loading } = useResources();
  const featured = resources.filter((r) => r.platform === 'modrinth' && r.featured && !r.hidden);
  const projects = (featured.length ? featured : resources.filter((r) => r.platform === 'modrinth' && !r.hidden))
    .slice(0, 10);

  return <div className="mc-grid-bg home-shell">
    <section className="home-hero relative overflow-hidden">
      <div className="hero-ambient hero-ambient-one"/><div className="hero-ambient hero-ambient-two"/>
      <div className="hero-code-float" aria-hidden="true"><span>public final class</span><br/><b>KingBrezz</b> {'{'}<br/><span>  build();</span><br/>{'}'}</div>
      <motion.div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
        <div className="eyebrow"><span className="status-pulse"/> INDEPENDENT DEVELOPER · MINECRAFT ECOSYSTEM</div>
        <h1 className="hero-title home-title">Ideas into tools.<br/><span className="hero-gradient">Better Minecraft worlds.</span></h1>
        <p className="home-lead">I’m <strong>KingBrezz</strong> — an independent developer creating Minecraft plugins and server tools with a focus on practical features, thoughtful design, and transparent engineering.</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link to="/projects" className="home-primary">Explore my plugins <ArrowRight size={17}/></Link>
          <a href="https://modrinth.com/user/KingBrezz" target="_blank" rel="noreferrer" className="home-secondary"><ModrinthMark/> Find me on Modrinth</a>
        </div>
        <div className="home-shield-panel mt-12">
          <div className="shield-emblem"><ShieldCheck size={31}/><span/></div>
          <div><div className="shield-kicker">SECURITY-MINDED DEVELOPMENT</div><h2>Built with safety in mind.</h2><p>I prioritize validation, predictable behavior, and careful data handling. Each release should be tested for its intended environment — no software can honestly be guaranteed 100% bug-free or risk-free.</p></div>
          <Link to="/about" className="shield-more" aria-label="Read about my engineering principles"><ChevronRight size={20}/></Link>
        </div>
      </motion.div>
    </section>

    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <div className="section-topline"><div><div className="eyebrow">START HERE</div><h2 className="section-heading mt-3">A little about my world.</h2><p className="text-sm text-mc-muted mt-2">Choose a card to explore a different part of KingBrezz.</p></div></div>
      <div className="path-grid mt-7">{paths.map((item, i) => <motion.div key={item.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}><Link to={item.to} className="path-card"><div className="path-card-top"><span>{item.number}</span><item.icon size={21}/></div><h3>{item.title}</h3><p>{item.text}</p><div className="path-action">{item.action}<ArrowRight size={15}/></div></Link></motion.div>)}</div>
    </section>

    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="flex items-end justify-between gap-4 mb-7"><div><div className="eyebrow"><ModrinthMark className="w-4 h-4"/> MODRINTH COLLECTION</div><h2 className="section-heading mt-3">Plugins made by KingBrezz.</h2><p className="text-sm text-mc-muted mt-2">Only projects from my Modrinth catalogue appear here.</p></div><Link to="/projects" className="home-view-all">All projects <ArrowRight size={15}/></Link></div>
      {loading ? <div className="project-rail">{Array.from({length:4}).map((_,i)=><div key={i} className="skeleton h-64 rounded-xl project-rail-card"/>)}</div> : projects.length ? <div className="project-rail" aria-label="Featured Modrinth projects">{projects.map((r,i)=><div className="project-rail-card" key={r.id}><ProjectCard resource={r} index={i}/></div>)}</div> : <div className="empty-modrinth"><ModrinthMark className="w-8 h-8"/><p>No Modrinth projects are available in the local catalogue yet.</p><a href="https://modrinth.com/user/KingBrezz" target="_blank" rel="noreferrer">Open KingBrezz on Modrinth <ArrowRight size={15}/></a></div>}
      <div className="rail-hint"><span/> Swipe or scroll sideways to browse <span/></div>
    </section>
  </div>;
}
