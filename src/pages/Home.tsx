import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Braces, Code2, ExternalLink, Github, Layers3, ShieldCheck, Terminal, Zap } from 'lucide-react';
import { useResources } from '../hooks/useResources';
import { ProjectCard } from '../components/ProjectCard';

const stack = ['Java', 'Paper API', 'Spigot', 'Purpur', 'Folia', 'TypeScript', 'React', 'SQLite', 'MySQL', 'ProtocolLib', 'PlaceholderAPI', 'Geyser'];
const capabilities = [
  { icon: Code2, number: '01', title: 'Plugin engineering', text: 'Purpose-built Minecraft plugins with clean configuration, thoughtful UX, and maintainable systems.' },
  { icon: ShieldCheck, number: '02', title: 'Server protection', text: 'Detection and prevention systems focused on validation, stability, and reducing false positives.' },
  { icon: Zap, number: '03', title: 'Performance tools', text: 'Diagnostics and utilities that help server owners understand what is happening under the hood.' },
];

export function Home() {
  const { resources, loading, data } = useResources();
  const visible = resources.filter((r) => !r.hidden);
  const featured = visible.filter((r) => r.featured).slice(0, 3);
  const latest = [...visible].sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()).slice(0, 3);
  const projectCount = visible.length;

  return (
    <div className="mc-grid-bg home-page">
      <section className="home-hero relative overflow-hidden">
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 sm:pb-28 relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-12 lg:gap-14 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
              <div className="eyebrow"><span className="status-pulse" /> INDEPENDENT DEVELOPER <span className="eyebrow-separator">/</span> MINECRAFT ECOSYSTEM</div>
              <h1 className="hero-title mt-6 text-[clamp(3.2rem,8vw,6.6rem)] font-extrabold leading-[.98] tracking-tight text-mc-white">
                I build things<br />for <span className="hero-gradient">Minecraft.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base sm:text-lg leading-8 text-mc-muted">
                I’m <strong className="text-white font-semibold">DevBrezz</strong> — a developer building practical plugins, server tools, and web projects. I care about software that feels good to use and holds up when it matters.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/projects" className="primary-cta">Explore my work <ArrowRight size={17} /></Link>
                <Link to="/about" className="secondary-cta">More about me <ArrowUpRight size={16} /></Link>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-mc-muted">
                <span className="inline-flex items-center gap-2"><span className="tiny-dot" /> Building across Minecraft & web</span>
                <span className="hero-separator" />
                <span>Java · TypeScript · React</span>
              </div>
            </motion.div>

            <motion.div className="hero-console-wrap" initial={{ opacity: 0, y: 28, rotate: 1.5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: .7, delay: .12 }}>
              <div className="hero-console-glow" />
              <div className="hero-console">
                <div className="console-top"><div className="console-dots"><i /><i /><i /></div><span>devbrezz@workspace</span><span className="console-live"><span /> ONLINE</span></div>
                <div className="console-content">
                  <div className="console-path"><Terminal size={14} /> ~/portfolio <span>/</span> profile.ts</div>
                  <div className="code-line"><span className="code-line-no">01</span><span><b className="syntax-purple">const</b> <b className="syntax-blue">developer</b> = {'{'}</span></div>
                  <div className="code-line"><span className="code-line-no">02</span><span className="code-indent"><span className="syntax-cyan">name</span>: <span className="syntax-green">'DevBrezz'</span>,</span></div>
                  <div className="code-line"><span className="code-line-no">03</span><span className="code-indent"><span className="syntax-cyan">focus</span>: <span className="syntax-green">'Minecraft tooling'</span>,</span></div>
                  <div className="code-line"><span className="code-line-no">04</span><span className="code-indent"><span className="syntax-cyan">mindset</span>: <span className="syntax-green">'Build. Test. Improve.'</span>,</span></div>
                  <div className="code-line"><span className="code-line-no">05</span><span className="code-indent"><span className="syntax-cyan">alwaysLearning</span>: <span className="syntax-orange">true</span>,</span></div>
                  <div className="code-line"><span className="code-line-no">06</span><span>{'}'}<span className="code-cursor" /></span></div>
                  <div className="console-divider" />
                  <div className="console-status"><div className="console-status-icon"><Braces size={17} /></div><div><strong>Ready to build</strong><span>Plugins · Tools · Experiments</span></div><span className="console-arrow"><ArrowUpRight size={17} /></span></div>
                </div>
              </div>
              <div className="floating-chip floating-chip-top"><Layers3 size={15} /> Modular by design</div>
              <div className="floating-chip floating-chip-bottom"><ShieldCheck size={15} /> Built with care</div>
            </motion.div>
          </div>

          <motion.div className="hero-stats" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .5 }}>
            <div className="hero-stat"><span className="hero-stat-number">{loading ? '—' : projectCount.toString().padStart(2, '0')}</span><span className="hero-stat-label">Public resources</span></div>
            <div className="hero-stat"><span className="hero-stat-number">02</span><span className="hero-stat-label">Main ecosystems</span></div>
            <div className="hero-stat"><span className="hero-stat-number">{data ? new Date(data.lastSynced).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'LIVE'}</span><span className="hero-stat-label">Catalog sync</span></div>
            <a className="hero-stat-link" href="https://modrinth.com/user/KingBrezz" target="_blank" rel="noreferrer">Find my releases <ExternalLink size={14} /></a>
          </motion.div>
        </div>
        <a href="#work" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={15} /></a>
      </section>

      <section className="identity-hub max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20" aria-labelledby="identity-hub-title">
        <div className="section-topline"><span className="eyebrow">EXPLORE THE PROFILE</span><span className="section-index">START HERE</span></div>
        <div className="identity-hub-grid">
          <div className="identity-menu-wrap">
            <h2 id="identity-hub-title" className="section-heading">Kenali <span>di balik karya.</span></h2>
            <p className="section-description identity-hub-description">Pilih topik untuk membuka halaman dengan penjelasan lebih lengkap.</p>
            <div className="identity-menu">
              <Link to="/about" className="identity-menu-card"><span className="identity-menu-number">01</span><span className="identity-menu-copy"><strong>Siapa KingBrezz?</strong><small>Cerita nama, identitas DevBrezz, dan fokus pengembangan.</small></span><ArrowUpRight size={19} /></Link>
              <Link to="/projects" className="identity-menu-card"><span className="identity-menu-number">02</span><span className="identity-menu-copy"><strong>Apa yang dibuat?</strong><small>Plugin Minecraft, tools server, dan proyek web.</small></span><ArrowUpRight size={19} /></Link>
              <Link to="/about" className="identity-menu-card"><span className="identity-menu-number">03</span><span className="identity-menu-copy"><strong>Skill & teknologi</strong><small>Java, Paper API, TypeScript, dan sistem pendukung.</small></span><ArrowUpRight size={19} /></Link>
              <Link to="/contact" className="identity-menu-card"><span className="identity-menu-number">04</span><span className="identity-menu-copy"><strong>Kontak & kolaborasi</strong><small>Lihat cara menghubungi untuk diskusi proyek.</small></span><ArrowUpRight size={19} /></Link>
            </div>
          </div>
          <div className="globe-panel">
            <div className="globe-panel-top"><span className="globe-live-dot" /> DIGITAL WORLD <span className="globe-panel-index">01 / 04</span></div>
            <div className="globe-stage" role="img" aria-label="Globe digital berputar perlahan">
              <div className="globe-halo" />
              <div className="globe-sphere"><div className="globe-grid-lines" /><svg className="globe-land" viewBox="0 0 320 320" aria-hidden="true"><path d="M55 69l20-18 29 5 13 17 26 3 8 17-13 14-2 18-20 12-5 25-16 8-11-18-18-7-4-21-17-13-2-20-13-8zM143 163l20 4 17 21-3 24-13 24-6 31-14 19-11-14 3-24-10-21 5-24-8-18zM182 67l24-14 25 8 15 19 23 5 17 17-6 17-21 1-7 15-18 1-9 17-14-4-3-20-18-9-12-19-13-3-3-18zM224 171l18-10 18 7 10 20-8 18-17 6-13-13zM267 235l14-5 10 12-9 15-14-4z" /></svg><div className="globe-shine" /></div>
              <span className="globe-orbit globe-orbit-one" /><span className="globe-orbit globe-orbit-two" />
            </div>
            <div className="globe-caption"><h3>Built for a connected world.</h3><p>Setiap plugin adalah bagian kecil dari ekosistem yang lebih besar: server, developer, dan komunitas yang saling terhubung.</p></div>
            <div className="globe-tags"><span>MINECRAFT</span><span>DEVELOPMENT</span><span>COMMUNITY</span></div>
          </div>
        </div>
      </section>

      <section id="work" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 scroll-mt-20">
        <div className="section-topline"><span className="eyebrow">SELECTED WORK</span><span className="section-index">01 — PROJECTS</span></div>
        <div className="section-intro"><div><h2 className="section-heading">Small details.<br /><span>Real impact.</span></h2><p className="section-description">A selection of projects built to solve real problems for Minecraft communities and server owners.</p></div><Link to="/projects" className="text-link">Browse all projects <ArrowRight size={16} /></Link></div>
        {loading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-72 rounded-2xl" />)}</div> : featured.length ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{featured.map((r, i) => <ProjectCard key={r.id} resource={r} index={i} />)}</div> : <div className="empty-projects"><Code2 size={22} /><p>Project catalog is syncing. Check back soon.</p><Link to="/projects">Open project catalog <ArrowRight size={15} /></Link></div>}
      </section>

      <section className="capabilities-section py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="section-topline"><span className="eyebrow">WHAT I DO</span><span className="section-index">02 — CAPABILITIES</span></div>
          <div className="section-intro"><div><h2 className="section-heading">From idea to<br /><span>working software.</span></h2></div><p className="section-description max-w-sm">I like solving the unglamorous problems too: edge cases, compatibility, configuration, and the small touches that make tools dependable.</p></div>
          <div className="grid md:grid-cols-3 gap-4">{capabilities.map((item, i) => <motion.article key={item.number} className="capability-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * .08 }}><div className="capability-card-top"><span>{item.number}</span><item.icon size={21} /></div><h3>{item.title}</h3><p>{item.text}</p><div className="capability-line" /></motion.article>)}</div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="section-topline"><span className="eyebrow">TOOLKIT</span><span className="section-index">03 — TECHNOLOGIES</span></div>
        <div className="section-intro"><div><h2 className="section-heading">The tools behind<br /><span>the work.</span></h2></div><p className="section-description max-w-sm">A practical toolkit for server-side systems, integrations, and clean interfaces.</p></div>
        <div className="stack-panel"><div className="stack-panel-heading"><span className="stack-led" /> CORE STACK <span className="stack-count">{stack.length} technologies</span></div><div className="stack-list">{stack.map((name, i) => <motion.span key={name} className="stack-pill" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .025 }}>{name}</motion.span>)}</div></div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="recent-panel"><div><span className="eyebrow">RECENT ACTIVITY</span><h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 tracking-tight">Still building. Still improving.</h2><p className="text-sm text-mc-muted mt-3 max-w-xl leading-7">The catalog updates as public projects change. Take a look at the latest releases and ongoing work.</p></div><div className="recent-side">{latest.slice(0, 3).map((item) => <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="recent-item"><span><span className="recent-item-dot" />{item.title}</span><ArrowUpRight size={16} /></a>)}{!latest.length && <Link to="/projects" className="recent-item"><span>Explore the project catalog</span><ArrowRight size={16} /></Link>}<Link to="/projects" className="recent-all">View all projects <ArrowRight size={14} /></Link></div></div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="contact-banner"><div className="contact-banner-mark"><Code2 size={25} /></div><div className="contact-banner-copy"><span className="eyebrow">HAVE SOMETHING IN MIND?</span><h2>Let’s build something useful.</h2><p>Got an idea, a bug to discuss, or a project to collaborate on?</p></div><Link to="/contact" className="primary-cta">Get in touch <ArrowRight size={17} /></Link></div>
      </section>
    </div>
  );
}
