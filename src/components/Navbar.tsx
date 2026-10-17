import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-mc-black/90 backdrop-blur-md border-b border-mc-border shadow-lg' : 'bg-transparent'
    )}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="brand-logo" />
          <span className="font-semibold text-mc-white tracking-tight">
            Dev<span className="text-mc-red">Brezz</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors relative',
              location.pathname === l.to ? 'text-mc-white' : 'text-mc-muted hover:text-mc-white'
            )}>
              {l.label}
              {location.pathname === l.to && (
                <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-2 right-2 h-0.5 bg-mc-red rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
              )}
            </Link>
          ))}
        </div>

        <button className="md:hidden p-2 text-mc-muted hover:text-mc-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-mc-dark border-b border-mc-border overflow-hidden">
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className={cn(
                  'px-4 py-3 rounded-md text-sm font-medium',
                  location.pathname === l.to ? 'bg-mc-surface text-mc-white' : 'text-mc-muted hover:bg-mc-surface hover:text-mc-white'
                )}>{l.label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
