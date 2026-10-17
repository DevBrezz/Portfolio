import { motion } from 'framer-motion';
import { Code2, Server, Shield, Wrench, Target, Boxes, HeartHandshake, ArrowUpRight } from 'lucide-react';

export function About() {
  const principles = [
    { icon: Target, title: 'Purpose before features', desc: 'Every feature should solve a real server-owner or player problem, not just inflate a changelog.' },
    { icon: Boxes, title: 'Built for real servers', desc: 'Configuration, compatibility, data safety, and clear failure states matter as much as the happy path.' },
    { icon: Shield, title: 'Security-minded design', desc: 'Protection systems focus on predictable behavior, careful validation, and minimizing false positives.' },
    { icon: HeartHandshake, title: 'Clear communication', desc: 'Release notes and support should be honest about what passed, what is untested, and what is unsupported.' },
  ];
  const focus = [
    { icon: Code2, title: 'Plugin engineering', desc: 'Java plugins for Paper, Spigot, Purpur, and Folia with configurable behavior and maintainable code.' },
    { icon: Server, title: 'SMP systems', desc: 'Economy, claims, custom enchantments, utilities, automation, and gameplay features.' },
    { icon: Shield, title: 'Server protection', desc: 'Anti-dupe, anti-freecam, detection, and abuse-prevention tools designed for multiplayer environments.' },
    { icon: Wrench, title: 'Operations & performance', desc: 'Monitoring, cleanup, restart workflows, compatibility testing, and practical diagnostics.' },
  ];
  return <div className="pt-24 pb-20 min-h-screen mc-grid-bg">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <motion.section initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="about-hero">
        <div className="eyebrow">THE PERSON BEHIND THE PLUGINS</div>
        <h1 className="section-heading about-title">I build tools that make<br className="hidden sm:block" /> Minecraft servers <span>better.</span></h1>
        <p className="about-lead">I’m <strong>DevBrezz</strong>, an independent developer focused on Minecraft server plugins and the systems around them. My work sits at the intersection of gameplay, reliability, protection, and server administration.</p>
        <div className="flex flex-wrap gap-3 mt-7">
          <a className="profile-link" href="https://modrinth.com/user/KingBrezz" target="_blank" rel="noreferrer">Modrinth <ArrowUpRight size={15}/></a>
          <a className="profile-link" href="https://www.spigotmc.org/resources/authors/brezz.2530124/" target="_blank" rel="noreferrer">SpigotMC <ArrowUpRight size={15}/></a>
        </div>
      </motion.section>
      <section className="identity-panel mt-12" aria-labelledby="identity-title">
        <div className="identity-panel-heading">
          <span className="eyebrow">THE NAME BEHIND THE WORK</span>
          <h2 id="identity-title" className="text-2xl sm:text-3xl font-bold text-mc-white mt-3 tracking-tight">Who is KingBrezz?</h2>
          <p className="identity-lead">KingBrezz is the creator name associated with earlier work. The portfolio identity is now <strong>DevBrezz</strong> — the name to use when exploring current projects.</p>
        </div>
        <div className="identity-grid">
          <article className="identity-card"><span className="identity-number">01</span><h3>What can he build?</h3><p>Minecraft server plugins and tools such as economy systems, claims, custom enchantments, anti-dupe and anti-cheat style protections, utility automation, monitoring, and performance diagnostics. Exact features depend on each project.</p></article>
          <article className="identity-card"><span className="identity-number">02</span><h3>Who is it for?</h3><p>Server owners and developers who need configurable gameplay systems, administration tools, integrations, and protection features for Paper/Spigot-based servers.</p></article>
          <article className="identity-card identity-card-wide"><span className="identity-number">03</span><h3>Has he contributed to major servers?</h3><p>I won't claim an official contribution to a large server without a public, verifiable source. Public plugin releases and project repositories show development work, but they do not by themselves prove that a specific large server used a plugin or hired the creator.</p><div className="identity-links"><a href="https://modrinth.com/user/KingBrezz" target="_blank" rel="noreferrer">Browse public Modrinth projects <ArrowUpRight size={14}/></a><a href="https://www.spigotmc.org/resources/authors/brezz.2530124/" target="_blank" rel="noreferrer">Browse SpigotMC releases <ArrowUpRight size={14}/></a></div></article>
        </div>
      </section>
      <motion.section initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="about-story mt-12">
        <div><div className="eyebrow">MY APPROACH</div><h2 className="text-2xl font-bold text-mc-white mt-3">Useful software, not just more software.</h2></div>
        <div className="about-copy"><p>I work across the full plugin lifecycle: shaping an idea, implementing it, testing compatibility, documenting configuration, and preparing releases that server owners can actually operate.</p><p>I care about the details that often get overlooked — sensible defaults, safe data handling, clear messages, predictable performance, and being transparent about testing status. A feature is only useful when it behaves correctly in a live server environment.</p></div>
      </motion.section>
      <section className="mt-16"><div className="eyebrow">AREAS OF WORK</div><h2 className="text-2xl font-bold text-mc-white mt-2 mb-6">What I work on</h2><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{focus.map((item, i) => <motion.article key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }} className="about-card"><item.icon className="w-5 h-5 text-mc-red mb-4"/><h3>{item.title}</h3><p>{item.desc}</p></motion.article>)}</div></section>
      <section className="mt-16"><div className="eyebrow">ENGINEERING PRINCIPLES</div><h2 className="text-2xl font-bold text-mc-white mt-2 mb-6">What matters to me</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{principles.map((item, i) => <motion.article key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .05 }} className="principle-card"><item.icon className="w-5 h-5 text-mc-red mb-3"/><h3>{item.title}</h3><p>{item.desc}</p></motion.article>)}</div></section>
    </div>
  </div>;
}
