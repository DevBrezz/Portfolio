import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Code2, Layers3, ShieldCheck, Zap, Terminal, Boxes, Cpu, PackageOpen } from 'lucide-react';
import { useResources } from '../hooks/useResources';
import { ProjectCard } from '../components/ProjectCard';

const capabilities = [
  { icon: ShieldCheck, n: '01', title: 'Protection systems', desc: 'Anti-exploit, anti-cheat, claims, and server-side safeguards built around real gameplay.' },
  { icon: Layers3, n: '02', title: 'Gameplay & economy', desc: 'SMP systems, shops, auctions, progression, and mechanics that fit the server.' },
  { icon: Zap, n: '03', title: 'Performance tools', desc: 'Practical diagnostics and automation to help admins understand and manage their servers.' },
  { icon: Terminal, n: '04', title: 'Developer utilities', desc: 'Clean APIs, configurable workflows, and tools designed to be maintainable.' },
];
const stack = ['Java', 'Paper', 'Spigot', 'Purpur', 'Folia', 'PlaceholderAPI', 'Vault', 'ProtocolLib', 'Geyser', 'Floodgate', 'SQLite', 'MySQL'];

export function Home() {
  const { resources, loading, data } = useResources();
  const visible = resources.filter((r) => !r.hidden);
  const featured = visible.filter((r) => r.featured).slice(0, 6);
  const latest = [...visible].sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()).slice(0, 4);
  const count = visible.length;

  return <div className="redesign-home">
    <section className="hero-v2 relative overflow-hidden">
      <div className="hero-orb hero-orb-one"/><div className="hero-orb hero-orb-two"/><div className="hero-grid"/>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 hero-content">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="status-pulse"/> INDEPENDENT DEVELOPER <span className="eyebrow-divider">/</span> MINECRAFT ECOSYSTEM</div>
          <h1 className="hero-title-v2">I build tools that<br/><span className="hero-gradient-v2">power Minecraft.</span></h1>
          <p className="hero-description">I'm <strong>KingBrezz</strong> — also known as ItsMe Brezz. I create practical server software for protection, economy, gameplay, and performance.</p>
          <div className="hero-actions">
            <Link to="/projects" className="button-primary">Explore projects <ArrowUpRight size={17}/></Link>
            <Link to="/about" className="button-quiet">More about me <ArrowDownRight size={16}/></Link>
          </div>
          <div className="hero-socials"><a href="https://modrinth.com/user/KingBrezz" target="_blank" rel="noreferrer">Modrinth <ArrowUpRight size={13}/></a><span/><a href="https://www.spigotmc.org/resources/authors/brezz.2530124/" target="_blank" rel="noreferrer">SpigotMC <ArrowUpRight size={13}/></a></div>
        </motion.div>
        <motion.div className="hero-console" initial={{ opacity: 0, x: 28, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: .75, delay: .18 }}>
          <div className="console-top"><div className="console-dots"><i/><i/><i/></div><span>brezz@studio: ~/projects</span><Code2 size={15}/></div>
          <div className="console-body"><div className="console-line muted">// turning ideas into server tools</div><div className="console-line"><b>const</b> developer = {'{'}</div><div className="console-line indent"><span>name:</span> <em>'KingBrezz'</em>,</div><div className="console-line indent"><span>focus:</span> [<em>'plugins'</em>, <em>'systems'</em>],</div><div className="console-line indent"><span>mindset:</span> <em>'build it right'</em></div><div className="console-line">{'}'};</div><div className="console-spacer"/><div className="console-output"><span className="status-pulse"/> READY TO BUILD <span className="console-version">v2026</span></div></div>
          <div className="console-footer"><span><Cpu size={13}/> Java ecosystem</span><span><Boxes size={13}/> Server-first design</span></div>
        </motion.div>
      </div>
      <div className="hero-bottom max-w-6xl mx-auto px-4 sm:px-6"><span>SCROLL TO EXPLORE</span><div className="scroll-line"/><span className="hero-index">01 — 04</span></div>
    </section>

    <section className="intro-strip max-w-6xl mx-auto px-4 sm:px-6"><div className="intro-statement">Independent by choice.<br/><span>Practical by design.</span></div><div className="intro-detail">From the first feature to the final release, I focus on software that server owners can configure, understand, and trust.</div><div className="intro-mark"><PackageOpen size={29}/><span>BREZZ<br/>STUDIO</span></div></section>

    <section className="section-v2 max-w-6xl mx-auto px-4 sm:px-6"><div className="section-top"><div><div className="eyebrow">WHAT I BUILD <span className="eyebrow-divider">/</span> 01</div><h2 className="section-heading-v2">Built for the <span>server side.</span></h2></div><p className="section-note">Purpose-built tools for the people running the worlds we play in.</p></div>
      <div className="capability-grid">{capabilities.map((item, i) => <motion.article key={item.n} className="capability-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .45, delay: i * .08 }} whileHover={{ y: -6 }}><div className="capability-head"><span>{item.n}</span><item.icon size={21}/></div><h3>{item.title}</h3><p>{item.desc}</p><div className="capability-rule"/></motion.article>)}</div>
    </section>

    <section className="section-v2 max-w-6xl mx-auto px-4 sm:px-6 projects-section"><div className="section-top"><div><div className="eyebrow">SELECTED WORK <span className="eyebrow-divider">/</span> 02</div><h2 className="section-heading-v2">Projects with <span>purpose.</span></h2><p className="section-subtitle">A selection of tools and resources from my catalog.</p></div><Link to="/projects" className="text-link">All projects <ArrowRight size={16}/></Link></div>
      {loading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{Array.from({length:6}).map((_,i)=><div key={i} className="skeleton h-64 rounded-xl"/>)}</div> : featured.length ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{featured.map((r,i)=><ProjectCard key={r.id} resource={r} index={i}/>)}</div> : <div className="empty-projects">Projects are syncing. Check back shortly.</div>}
    </section>

    <section className="stack-band"><div className="max-w-6xl mx-auto px-4 sm:px-6 stack-inner"><div><div className="eyebrow">TOOLS OF THE TRADE <span className="eyebrow-divider">/</span> 03</div><h2 className="section-heading-v2">A stack built around <span>servers.</span></h2></div><div className="stack-tags">{stack.map((name,i)=><motion.span key={name} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.035}}>{name}</motion.span>)}</div></div><div className="stack-marquee" aria-hidden="true"><div>{[...stack,...stack].map((name,i)=><span key={i}>{name}<i>✳</i></span>)}</div></div></section>

    <section className="section-v2 max-w-6xl mx-auto px-4 sm:px-6 latest-section"><div className="section-top"><div><div className="eyebrow">RECENT ACTIVITY <span className="eyebrow-divider">/</span> 04</div><h2 className="section-heading-v2">Recently <span>updated.</span></h2></div><span className="sync-label"><span className="status-pulse"/> {data ? `CATALOG SYNCED ${new Date(data.lastSynced).toLocaleDateString()}` : 'LIVE PROJECT CATALOG'}</span></div>
      {loading ? <div className="skeleton h-36 rounded-xl"/> : <div className="latest-list">{latest.map((r,i)=><motion.div key={r.id} className="latest-row" initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.06}}><span className="latest-num">0{i+1}</span><div className="latest-icon">{r.icon ? <img src={r.icon} alt="" loading="lazy"/> : <Code2 size={19}/>}</div><div className="latest-info"><strong>{r.title}</strong><span>{r.platform} · {r.loaders.slice(0,2).join(' / ') || 'Minecraft'}</span></div><div className="latest-date">{new Date(r.updated).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'})}</div><Link to={`/project/${r.id}`} aria-label={`View ${r.title}`}><ArrowUpRight size={18}/></Link></motion.div>)}</div>}
    </section>

    <section className="contact-cta max-w-6xl mx-auto px-4 sm:px-6"><div className="cta-panel"><div className="cta-glow"/><div className="eyebrow">HAVE SOMETHING IN MIND? <span className="eyebrow-divider">/</span> LET'S TALK</div><h2>Good tools start<br/>with a <span>good idea.</span></h2><p>Questions, collaboration, or a custom Minecraft project — my inbox is open.</p><Link to="/contact" className="button-primary">Get in touch <ArrowUpRight size={17}/></Link><div className="cta-watermark">KB</div></div></section>
  </div>;
}
