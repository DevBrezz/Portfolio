import { motion } from 'framer-motion';
import { Code2, Server, Shield, Wrench } from 'lucide-react';

export function About() {
  return (
    <div className="pt-24 pb-16 min-h-screen mc-grid-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-mc-white mb-2">About KingBrezz</h1>
          <p className="text-mc-muted mb-10">Minecraft developer • Plugins • Server tools • Java & Bedrock</p>

          <div className="prose prose-invert max-w-none space-y-6 text-mc-text leading-relaxed">
            <p>
              I'm <strong className="text-mc-white">KingBrezz</strong> (also known as ItsMe Brezz), a Minecraft developer focused on
              high-quality server plugins, anti-cheat systems, economy tools, land protection, and performance utilities.
            </p>
            <p>
              My work targets modern Paper, Purpur, Folia, and Spigot servers. I publish on both
              <a href="https://modrinth.com/user/KingBrezz" target="_blank" rel="noopener noreferrer" className="text-mc-red hover:underline"> Modrinth</a> and
              <a href="https://www.spigotmc.org/resources/authors/brezz.2530124/" target="_blank" rel="noopener noreferrer" className="text-mc-red hover:underline"> SpigotMC</a>.
            </p>
            <p>
              Projects range from complete SMP experiences and land claim systems to specialized anti-dupe, anti-freecam,
              restart schedulers, clear-lag solutions, shops, auctions, and custom enchantments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            {[
              { icon: Code2, title: 'Plugin Development', desc: 'Java plugins for Paper / Spigot / Folia with clean APIs and configs.' },
              { icon: Server, title: 'Server Tools', desc: 'Economy, claims, shops, auctions, jobs, and full SMP feature sets.' },
              { icon: Shield, title: 'Security & Anti-Cheat', desc: 'Anti-dupe, anti-freecam, anti-bot, anti-VPN, and detection systems.' },
              { icon: Wrench, title: 'Performance', desc: 'ClearLag, AntiLag, redstone detectors, and optimization utilities.' },
            ].map((item) => (
              <div key={item.title} className="bg-mc-surface border border-mc-border rounded-xl p-5">
                <item.icon className="w-6 h-6 text-mc-red mb-3" />
                <h3 className="font-semibold text-mc-white mb-1">{item.title}</h3>
                <p className="text-sm text-mc-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
