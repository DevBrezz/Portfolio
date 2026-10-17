# KingBrezz Portfolio

Premium Minecraft-themed developer portfolio for **KingBrezz / ItsMe Brezz**.

Live resources are pulled from:

- [Modrinth — KingBrezz](https://modrinth.com/user/KingBrezz)
- [SpigotMC — brezz](https://www.spigotmc.org/resources/authors/brezz.2530124/)

Discord: **@Brezzz**

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion
- React Router
- GitHub Pages + GitHub Actions

## Features

- Dark Minecraft-inspired UI (black / gray / red accents)
- Smooth page transitions and scroll animations (respects `prefers-reduced-motion`)
- Searchable, filterable, sortable resource catalog
- Dedicated project detail pages
- Real data from Modrinth API + SpigotMC author pages
- Automatic resource sync every 6 hours via GitHub Actions
- Deduplication by platform + ID; previous data retained on partial failure
- Responsive mobile layout
- SEO meta tags

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

Manual sync (optional):

```bash
npm run sync
```

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `kingbrezz-portfolio`).
2. Push this project:

```bash
git init
git add .
git commit -m "Initial KingBrezz portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kingbrezz-portfolio.git
git push -u origin main
```

3. In the repository settings:
   - **Settings → Pages → Build and deployment → Source**: GitHub Actions
4. The `Deploy to GitHub Pages` workflow runs on every push to `main`.
5. The site will be available at:

   `https://YOUR_USERNAME.github.io/kingbrezz-portfolio/`

If you use a custom domain or the repository is named `YOUR_USERNAME.github.io`, adjust the `base` path in `vite.config.ts` (set `GITHUB_PAGES` or change the default).

## Automatic resource synchronization

Workflow: `.github/workflows/sync-resources.yml`

- Runs on a schedule (every 6 hours) and on manual dispatch.
- Fetches all projects from the official Modrinth API.
- Attempts to parse the SpigotMC author profile (best-effort; Cloudflare may block some runners).
- Merges results into `public/data/resources.json`.
- Commits and pushes only when the catalog changed.
- **Never deletes existing resources** solely because one fetch failed.

### SpigotMC limitation

SpigotMC is protected by Cloudflare. Automated fetches from GitHub Actions or cloud IPs are sometimes blocked. When that happens the workflow keeps the last known good Spigot data and records the failure in the JSON `sources.spigot` field. Modrinth updates still apply.

## Admin / featured resources

Because the site is static (GitHub Pages), there is no traditional admin backend.

To mark a resource as **featured** or **hidden**:

1. Edit `public/data/resources.json` (or wait for a sync).
2. Set `"featured": true` or `"hidden": true` on the desired entry.
3. Commit and push — the next deploy will pick it up.

Alternatively, extend the sync script to read a small `overrides.json` and apply flags.

For a full private admin dashboard with authentication you would need an external service (e.g. a small Cloudflare Worker + KV, or Supabase). That is intentionally out of scope for the free static hosting setup.

## Environment / base path

The Vite config uses:

```ts
base: process.env.GITHUB_PAGES === 'true' ? '/kingbrezz-portfolio/' : '/'
```

Change the repository name in the path if yours is different.

## License

Code of this portfolio site: MIT.  
Individual Minecraft resources remain under their respective authors' licenses and are not redistributed here — only metadata and links are used.
