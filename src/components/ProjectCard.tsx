import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Download, Package } from 'lucide-react';
import type { Resource } from '../types/resource';
import { formatNumber, formatDate, cn } from '../lib/utils';

interface Props {
  resource: Resource;
  index?: number;
}

export function ProjectCard({ resource, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -4 }}
      className="group relative bg-mc-surface border border-mc-border rounded-xl overflow-hidden hover:border-mc-red/50 transition-colors"
    >
      <Link to={`/project/${resource.id}`} className="block">
        <div className="aspect-[16/10] bg-mc-gray relative overflow-hidden">
          {resource.icon ? (
            <img
              src={resource.icon}
              alt={resource.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-12 h-12 text-mc-muted" />
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className={cn(
              'px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider',
              resource.platform === 'modrinth' ? 'bg-green-600/90 text-white' : 'bg-orange-600/90 text-white'
            )}>
              {resource.platform}
            </span>
            {resource.featured && (
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-mc-red/90 text-white">
                Featured
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-mc-white text-sm leading-snug line-clamp-2 group-hover:text-mc-red-bright transition-colors">
            {resource.title}
          </h3>
          <p className="mt-1.5 text-xs text-mc-muted line-clamp-2 leading-relaxed">
            {resource.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1">
            {resource.loaders.slice(0, 3).map((l) => (
              <span key={l} className="px-1.5 py-0.5 rounded bg-mc-gray text-[10px] text-mc-muted capitalize">
                {l}
              </span>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-mc-border flex items-center justify-between text-[11px] text-mc-muted">
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {formatNumber(resource.downloads)}
            </span>
            <span>{formatDate(resource.updated)}</span>
          </div>
        </div>
      </Link>

      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 p-1.5 rounded-md bg-mc-black/70 text-mc-muted opacity-0 group-hover:opacity-100 hover:text-white transition-all"
        onClick={(e) => e.stopPropagation()}
        aria-label="Open original page"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </motion.article>
  );
}
