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
import { FloatingDonate } from './components/FloatingDonate';
import { VisitorBadge } from './components/VisitorBadge';

export default function App() {
  return (
    <LanguageProvider><BrowserRouter>
      <div className="min-h-screen flex flex-col bg-mc-black text-mc-text">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
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
        <FloatingDonate />
        <VisitorBadge />
      </div>
    </BrowserRouter></LanguageProvider>
  );
}
