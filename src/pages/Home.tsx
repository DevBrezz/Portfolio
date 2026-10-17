import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, UserRound, Boxes, Handshake, ChevronRight, Sparkles, Bug, Activity } from 'lucide-react';
import { useResources } from '../hooks/useResources';
import { ProjectCard } from '../components/ProjectCard';
import { useLanguage } from '../lib/i18n';
import { Heart, Download, PackageCheck, Sparkles as SparkleIcon } from 'lucide-react';

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
  const { t, language } = useLanguage();
  const [xp, setXp] = useState(0);
  const [secretOpen, setSecretOpen] = useState(false);
  const earnXp = () => { setXp((current) => { const next = Math.min(100, current + 10); if (next === 100) setSecretOpen(true); return next; }); };
  const featured = resources.filter((r) => r.platform === 'modrinth' && r.featured && !r.hidden);
  const projects = (featured.length ? featured : resources.filter((r) => r.platform === 'modrinth' && !r.hidden))
    .slice(0, 10);

  return <div className="mc-grid-bg home-shell">
    <section className="home-hero relative overflow-hidden">
      <div className="cosmic-backdrop" aria-hidden="true"><div className="cosmic-nebula cosmic-nebula-a"/><div className="cosmic-nebula cosmic-nebula-b"/><div className="cosmic-stars cosmic-stars-one"/><div className="cosmic-stars cosmic-stars-two"/><div className="cosmic-stars cosmic-stars-three"/></div>
      <div className="hero-ambient hero-ambient-one"/><div className="hero-ambient hero-ambient-two"/>
      <div className="hero-code-float" aria-hidden="true"><span>public final class</span><br/><b>KingBrezz</b> {'{'}<br/><span>  validate();</span><br/><span>  optimize();</span><br/><span>  build();</span><br/>{'}'}</div>
      <div className="hero-code-float hero-code-float-two" aria-hidden="true"><span>// system online</span><br/><b>if (idea != null)</b><br/><span>  ship(idea);</span><br/><span>  // no fake stats</span></div>
      <div className="solar-system" aria-label="Animated solar system illustration" role="img"><div className="solar-orbit solar-orbit-outer"><i className="solar-planet planet-blue"/></div><div className="solar-orbit solar-orbit-mid"><i className="solar-planet planet-green"/></div><div className="solar-orbit solar-orbit-inner"><i className="solar-planet planet-red"/></div><div className="solar-sun"><span/></div><div className="solar-label solar-label-one">ORBITAL / 03</div><div className="solar-label solar-label-two">SYSTEM ONLINE</div></div>
      <motion.div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
        <div className="eyebrow"><span className="status-pulse"/> {language === 'id' ? 'DEVELOPER INDEPENDEN · EKOSISTEM MINECRAFT' : language === 'zh' ? '独立开发者 · MINECRAFT 生态' : language === 'nl' ? 'ONAFHANKELIJKE DEVELOPER · MINECRAFT-ECOSYSTEEM' : 'INDEPENDENT DEVELOPER · MINECRAFT ECOSYSTEM'}</div>
        <h1 className="hero-title home-title">{language === 'id' ? <>Ide jadi karya.<br/><span className="hero-gradient">Dunia Minecraft lebih baik.</span></> : language === 'zh' ? <>让想法变成工具。<br/><span className="hero-gradient">打造更好的 Minecraft 世界。</span></> : language === 'nl' ? <>Ideeën worden tools.<br/><span className="hero-gradient">Betere Minecraft-werelden.</span></> : <>Ideas into tools.<br/><span className="hero-gradient">Better Minecraft worlds.</span></>}</h1>
        <p className="home-lead">{language === 'id' ? <>Saya <strong>KingBrezz</strong> — developer independen yang membuat plugin Minecraft dan alat server dengan fokus pada fitur praktis, desain matang, dan pengembangan transparan.</> : language === 'zh' ? <>我是 <strong>KingBrezz</strong>，一名独立开发者，专注于 Minecraft 插件、服务器工具、实用功能与透明开发。</> : language === 'nl' ? <>Ik ben <strong>KingBrezz</strong> — een onafhankelijke ontwikkelaar van Minecraft-plugins en servertools met aandacht voor praktische functies en transparante techniek.</> : <>I’m <strong>KingBrezz</strong> — an independent developer creating Minecraft plugins and server tools with a focus on practical features, thoughtful design, and transparent engineering.</>}</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link to="/projects" className="home-primary">{t.browse} <ArrowRight size={17}/></Link>
          <a href="https://modrinth.com/user/KingBrezz" target="_blank" rel="noreferrer" className="home-secondary"><ModrinthMark/> Find me on Modrinth</a>
          <Link to="/report" className="home-report-cta"><Bug size={17}/> Report a bug <ArrowRight size={15}/></Link>
        </div>
        <button type="button" className="xp-console mt-7" onClick={earnXp} aria-label={`Earn XP, current progress ${xp} percent`}>
          <div className="xp-console-top"><span><Sparkles size={13}/> EXPLORER XP</span><strong>LVL {Math.floor(xp / 25) + 1} <i>{xp}/100 XP</i></strong></div>
          <div className="xp-track"><span style={{ width: `${xp}%` }}/></div>
          <div className="xp-console-bottom"><span>{xp === 0 ? 'Tap to collect discovery XP' : xp < 100 ? 'Keep exploring to unlock a secret' : 'Secret unlocked · Nice work!'}</span><span>{xp}%</span></div>
        </button>
        {secretOpen && <motion.div className="xp-secret" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><Sparkles size={16}/><div><strong>Hidden signal discovered.</strong><p>Good developers stay curious. Keep building, testing, and improving.</p></div><button type="button" onClick={() => setSecretOpen(false)} aria-label="Close secret">×</button></motion.div>}
        <div className="home-shield-panel mt-8">
          <div className="shield-emblem"><ShieldCheck size={31}/><span/></div>
          <div><div className="shield-kicker">SECURITY-MINDED DEVELOPMENT</div><h2>Built with safety in mind.</h2><p>I prioritize validation, predictable behavior, and careful data handling. Each release should be tested for its intended environment — no software can honestly be guaranteed 100% bug-free or risk-free.</p></div>
          <Link to="/about" className="shield-more" aria-label="Read about my engineering principles"><ChevronRight size={20}/></Link>
        </div>
      </motion.div>
    </section>

    <section className="report-home-strip max-w-7xl mx-auto px-4 sm:px-6 py-8" aria-label="Bug report center">
      <div className="report-home-card">
        <div className="report-home-icon"><Activity size={23}/><span /></div>
        <div className="report-home-copy"><div className="report-home-kicker"><span className="report-live-dot"/> SUPPORT SYSTEM · ONLINE</div><h2>Found something that needs fixing?</h2><p>Send a structured bug report with reproduction steps so the issue can be investigated.</p></div>
        <Link to="/report" className="report-home-action">Open Report Center <ArrowRight size={16}/></Link>
        <div className="report-home-scan" aria-hidden="true" />
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="section-topline"><div><div className="eyebrow">START HERE</div><h2 className="section-heading mt-3">A little about my world.</h2><p className="text-sm text-mc-muted mt-2">Choose a card to explore a different part of KingBrezz.</p></div></div>
      <div className="path-grid mt-7">{paths.map((item, i) => <motion.div key={item.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}><Link to={item.to} className="path-card"><div className="path-card-top"><span>{item.number}</span><item.icon size={21}/></div><h3>{item.title}</h3><p>{item.text}</p><div className="path-action">{item.action}<ArrowRight size={15}/></div></Link></motion.div>)}</div>
    </section>

    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex items-end justify-between gap-4 mb-7"><div><div className="eyebrow"><ModrinthMark className="w-4 h-4"/> MODRINTH COLLECTION</div><h2 className="section-heading mt-3">Plugins made by KingBrezz.</h2><p className="text-sm text-mc-muted mt-2">Only projects from my Modrinth catalogue appear here.</p></div><Link to="/projects" className="home-view-all">All projects <ArrowRight size={15}/></Link></div>
      {loading ? <div className="project-rail">{Array.from({length:4}).map((_,i)=><div key={i} className="skeleton h-64 rounded-xl project-rail-card"/>)}</div> : projects.length ? <div className="project-rail" aria-label="Featured Modrinth projects">{projects.map((r,i)=><div className="project-rail-card" key={r.id}><ProjectCard resource={r} index={i}/></div>)}</div> : <div className="empty-modrinth"><ModrinthMark className="w-8 h-8"/><p>No Modrinth projects are available in the local catalogue yet.</p><a href="https://modrinth.com/user/KingBrezz" target="_blank" rel="noreferrer">Open KingBrezz on Modrinth <ArrowRight size={15}/></a></div>}
      <div className="rail-hint"><span/> Swipe or scroll sideways to browse <span/></div>
    </section>
    <Link to="/donate" className="home-donate-float" aria-label={t.donate}><span className="donate-float-heart"><Heart size={16} fill="currentColor"/></span><span className="donate-float-copy"><strong>{t.donateShort}</strong><small>Support KingBrezz</small></span><span className="donate-float-arrow" aria-hidden="true">↗</span></Link>
  </div>;
}
