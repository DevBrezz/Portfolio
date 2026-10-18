import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Languages, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/i18n';

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/mods', label: 'Mods' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/donate', label: 'Donate' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [languageOpen, setLanguageOpen] = useState(false);
  const languages = [{ code: 'en' as const, flag: '🇬🇧', label: 'English' }, { code: 'id' as const, flag: '🇮🇩', label: 'Indonesia' }, { code: 'zh' as const, flag: '🇨🇳', label: '中文' }, { code: 'nl' as const, flag: '🇳🇱', label: 'Nederlands' }];
  const selectedLanguage = languages.find((item) => item.code === language) ?? languages[0];
  const location = useLocation();
  const navLabels: Record<string, string> = { '/': t.home, '/projects': t.projects, '/about': t.about, '/contact': t.contact, '/donate': t.donateShort };
  const chooseLanguage = (code: string) => setLanguage(code as 'en' | 'id' | 'zh' | 'nl');

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
            King<span className="text-mc-red">Brezz</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors relative',
              location.pathname === l.to ? 'text-mc-white' : 'text-mc-muted hover:text-mc-white'
            )}>
              {navLabels[l.to] ?? l.label}
              {location.pathname === l.to && (
                <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-2 right-2 h-0.5 bg-mc-red rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
              )}
            </Link>
          ))}
          <div className="language-menu-wrap">
            <button type="button" className="language-trigger" onClick={() => setLanguageOpen(!languageOpen)} aria-expanded={languageOpen} aria-label="Choose language"><Languages size={15}/><span>{selectedLanguage.flag}</span><span>{selectedLanguage.code.toUpperCase()}</span><ChevronDown size={13}/></button>
            {languageOpen && <div className="language-dropdown">{languages.map((item) => <button type="button" key={item.code} className={item.code === language ? 'language-option is-selected' : 'language-option'} onClick={() => { chooseLanguage(item.code); setLanguageOpen(false); }}><span>{item.flag}</span><span>{item.label}</span>{item.code === language && <span className="language-check">✓</span>}</button>)}<p>Language preference</p></div>}
          </div>
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
              <div className="mobile-language-row"><span><Languages size={15}/> Language</span><select aria-label="Choose language" value={language} onChange={(event) => chooseLanguage(event.target.value)}>{languages.map((item) => <option key={item.code} value={item.code}>{item.flag} {item.label}</option>)}</select></div>
              {links.map((l) => (
                <Link key={l.to} to={l.to} className={cn(
                  'px-4 py-3 rounded-md text-sm font-medium',
                  location.pathname === l.to ? 'bg-mc-surface text-mc-white' : 'text-mc-muted hover:bg-mc-surface hover:text-mc-white'
                )}>{navLabels[l.to] ?? l.label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
