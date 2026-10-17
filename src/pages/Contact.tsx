import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { copyToClipboard } from '../lib/utils';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const discord = '@Brezzz';

  const handleCopy = async () => {
    const ok = await copyToClipboard(discord);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen mc-grid-bg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-mc-white mb-2">Contact</h1>
          <p className="text-mc-muted mb-10">Reach out for collaboration, support, or custom work.</p>

          <div className="bg-mc-surface border border-mc-border rounded-xl p-6 mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-mc-muted mb-3">Discord</h2>
            <div className="flex items-center gap-3">
              <code className="text-xl font-mono text-mc-red font-semibold">{discord}</code>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-mc-gray border border-mc-border text-xs text-mc-text hover:border-mc-red/50 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="mt-3 text-sm text-mc-muted">
              Add me on Discord using the exact username above. No public invite link is published to keep spam low.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://modrinth.com/user/KingBrezz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-mc-surface border border-mc-border rounded-xl p-5 hover:border-mc-red/50 transition-colors group"
            >
              <h3 className="font-semibold text-mc-white group-hover:text-mc-red transition-colors flex items-center gap-2">
                Modrinth <ExternalLink className="w-3.5 h-3.5" />
              </h3>
              <p className="text-sm text-mc-muted mt-1">modrinth.com/user/KingBrezz</p>
            </a>
            <a
              href="https://www.spigotmc.org/resources/authors/brezz.2530124/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-mc-surface border border-mc-border rounded-xl p-5 hover:border-mc-red/50 transition-colors group"
            >
              <h3 className="font-semibold text-mc-white group-hover:text-mc-red transition-colors flex items-center gap-2">
                SpigotMC <ExternalLink className="w-3.5 h-3.5" />
              </h3>
              <p className="text-sm text-mc-muted mt-1">spigotmc.org/resources/authors/brezz</p>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
