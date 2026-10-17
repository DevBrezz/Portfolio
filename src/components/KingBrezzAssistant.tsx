import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Bug, ChevronDown, ExternalLink, Heart, LifeBuoy, MessageCircle, Search, Sparkles, X } from 'lucide-react';
import { assistantKnowledge, type AssistantItem } from '../data/assistantKnowledge';
import './KingBrezzAssistant.css';

const categories = ['Semua', ...Array.from(new Set(assistantKnowledge.map((item) => item.category)))];

export function KingBrezzAssistant({ page = false }: { page?: boolean }) {
  const location = useLocation();
  const [open, setOpen] = useState(page);
  if (!page && location.pathname === '/assistant') return null;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');
  const [selected, setSelected] = useState<AssistantItem | null>(null);
  const [history, setHistory] = useState<AssistantItem[]>([]);
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return assistantKnowledge.filter((item) => (category === 'Semua' || item.category === category) && (!q || `${item.question} ${item.answer} ${item.category}`.toLocaleLowerCase().includes(q))).slice(0, 16);
  }, [query, category]);
  const choose = (item: AssistantItem) => { setSelected(item); setHistory((old) => [item, ...old.filter((entry) => entry.id !== item.id)].slice(0, 4)); };
  const panel = <div className={page ? 'kb-assistant-page' : 'kb-assistant-panel'}>
    <div className="kb-assistant-head"><div className="kb-assistant-avatar"><Bot size={21}/><span/></div><div className="kb-assistant-headcopy"><strong>KingBrezz Assistant</strong><span><i/> Offline help center · {assistantKnowledge.length}+ jawaban</span></div>{!page && <button className="kb-assistant-iconbtn" onClick={() => setOpen(false)} aria-label="Tutup asisten"><X size={18}/></button>}</div>
    <div className="kb-assistant-welcome"><div className="kb-assistant-spark"><Sparkles size={15}/> LOCAL KNOWLEDGE BASE</div><h2>Halo! Butuh bantuan?</h2><p>Pilih pertanyaan atau cari topik. Gue akan mengarahkan lu ke halaman yang tepat.</p><div className="kb-assistant-shortcuts"><Link to="/report" onClick={() => !page && setOpen(false)}><Bug size={14}/> Report bug</Link><Link to="/donate" onClick={() => !page && setOpen(false)}><Heart size={14}/> Donate</Link><Link to="/contact" onClick={() => !page && setOpen(false)}><MessageCircle size={14}/> Contact</Link></div></div>
    <label className="kb-assistant-search"><Search size={16}/><input value={query} onChange={(e) => {setQuery(e.target.value); setSelected(null);}} placeholder="Cari jawaban, mis. plugin error..."/><span>{filtered.length}</span></label>
    <div className="kb-assistant-categories">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => {setCategory(item); setSelected(null);}}>{item}</button>)}</div>
    <div className="kb-assistant-content">
      <div className="kb-assistant-questions"><div className="kb-assistant-sectionlabel">PERTANYAAN POPULER <span>{filtered.length}</span></div>{filtered.length ? filtered.map((item) => <button key={item.id} className={`kb-assistant-question ${selected?.id === item.id ? 'selected' : ''}`} onClick={() => choose(item)}><span><small>{item.category}</small><strong>{item.question}</strong></span><ChevronDown size={15}/></button>) : <div className="kb-assistant-empty">Belum ada jawaban yang cocok. Coba kata lain atau hubungi KingBrezz.<Link to="/contact" onClick={() => !page && setOpen(false)}>Hubungi support <ExternalLink size={13}/></Link></div>}</div>
      <div className="kb-assistant-answer">{selected ? <motion.div key={selected.id} initial={{opacity:0,y:7}} animate={{opacity:1,y:0}}><div className="kb-answer-tag"><Sparkles size={13}/> JAWABAN ASISTEN</div><h3>{selected.question}</h3><p>{selected.answer}</p>{selected.action && <Link className="kb-answer-action" to={selected.action.to} onClick={() => !page && setOpen(false)}>{selected.action.label}<ExternalLink size={14}/></Link>}<p className="kb-answer-note">Jawaban berbasis panduan lokal. Informasi teknis spesifik tetap perlu dicek di resource terkait.</p></motion.div> : <div className="kb-answer-placeholder"><div><LifeBuoy size={25}/></div><strong>Pilih pertanyaan di sebelah kiri</strong><p>Jawaban dan tombol bantuan akan muncul di sini.</p>{history.length > 0 && <div className="kb-recent"><span>Baru dilihat</span>{history.slice(0,2).map((item) => <button key={item.id} onClick={() => choose(item)}>{item.question}</button>)}</div>}</div>}</div>
    </div>
    <div className="kb-assistant-foot"><span><span className="kb-foot-dot"/> Tidak perlu API key · Tanpa biaya per pertanyaan</span><Link to="/assistant" onClick={() => !page && setOpen(false)}>Buka halaman bantuan <ExternalLink size={12}/></Link></div>
  </div>;
  if (page) return <main className="kb-assistant-route"><div className="kb-assistant-route-intro"><span><Sparkles size={15}/> KINGBREZZ SUPPORT CENTER</span><h1>Asisten <b>KingBrezz</b></h1><p>Pusat bantuan interaktif untuk proyek, plugin Minecraft, laporan bug, kontak, dan donasi.</p></div>{panel}</main>;
  return <div className="kb-assistant-floating"><AnimatePresence>{open && <motion.div className="kb-assistant-popover" initial={{opacity:0,y:12,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:8,scale:.98}} transition={{duration:.18}}>{panel}</motion.div>}</AnimatePresence><button className={`kb-assistant-launcher ${open ? 'is-open' : ''}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Tutup KingBrezz Assistant' : 'Buka KingBrezz Assistant'}>{open ? <X size={19}/> : <><Bot size={20}/><span>Asisten</span><i/></>}</button></div>;
}
