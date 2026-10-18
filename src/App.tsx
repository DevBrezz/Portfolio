import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Donate } from './pages/Donate';
import { BootScreen } from './components/BootScreen';
import { useEffect, useState } from 'react';
import { Report } from './pages/Report';
import { LanguageProvider } from './lib/i18n';
import { KingBrezzAssistant } from './components/KingBrezzAssistant';
import { VisitorBadge } from './components/VisitorBadge';
import { Mods } from './pages/Mods';

export default function App() {
  const [showBoot, setShowBoot] = useState(false);
  useEffect(() => {
    let alreadyShown = false;
    try { alreadyShown = sessionStorage.getItem('kingbrezz-boot-shown') === '1'; } catch { /* storage may be unavailable */ }
    if (alreadyShown) return;
    setShowBoot(true);
    try { sessionStorage.setItem('kingbrezz-boot-shown', '1'); } catch { /* storage may be unavailable */ }
    const timer = window.setTimeout(() => setShowBoot(false), 2300);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <LanguageProvider><BrowserRouter>
      <div className="min-h-screen flex flex-col bg-mc-black text-mc-text">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/mods" element={<Mods />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/report" element={<Report />} />
            <Route path="/assistant" element={<KingBrezzAssistant page />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <KingBrezzAssistant />
        <VisitorBadge />
        {showBoot && <BootScreen />}
      </div>
    </BrowserRouter></LanguageProvider>
  );
}
