import { Link } from 'react-router-dom';


export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-mc-border bg-mc-dark mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="brand-logo brand-logo-small" />
              <span className="font-semibold text-mc-white">KingBrezz</span>
            </div>
            <p className="text-sm text-mc-muted leading-relaxed">
              Minecraft plugins, tools & server development.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-mc-muted mb-3">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-mc-text hover:text-mc-red transition-colors">Home</Link></li>
              <li><Link to="/projects" className="text-mc-text hover:text-mc-red transition-colors">Projects</Link></li>
              <li><Link to="/about" className="text-mc-text hover:text-mc-red transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-mc-text hover:text-mc-red transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-mc-muted mb-3">Profiles</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.spigotmc.org/resources/authors/brezz.2530124/" target="_blank" rel="noopener noreferrer"
                  className="text-mc-text hover:text-mc-red transition-colors">SpigotMC</a>
              </li>
              <li>
                <a href="https://modrinth.com/user/KingBrezz" target="_blank" rel="noopener noreferrer"
                  className="text-mc-text hover:text-mc-red transition-colors">Modrinth</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-mc-muted mb-3">Contact</h4>
            <p className="text-sm text-mc-text">Discord: <span className="text-mc-red font-medium">KingBrezz</span></p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-mc-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mc-muted">
          <p>© {year} KingBrezz. All rights reserved.</p>
          <p>Resources auto-synced from SpigotMC & Modrinth.</p>
        </div>
      </div>
    </footer>
  );
}
