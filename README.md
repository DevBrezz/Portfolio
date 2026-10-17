# KingBrezz Portfolio

Minecraft developer portfolio for **KingBrezz / ItsMe Brezz**.

Discord: **@Brezzz**

Live (setelah deploy): https://yzz38-byte.github.io/

## Setup lokal

```bash
npm install
npm run dev
```

Buka http://localhost:5173

## Deploy ke GitHub Pages (root)

1. Buat repo bernama **tepat**:
   ```
   yzz38-byte.github.io
   ```

2. Push semua file ke branch `main`

3. Repo → **Settings** → **Pages**
   - Source: **GitHub Actions**

4. Tab **Actions** → jalankan workflow **Deploy to GitHub Pages**
   - Tunggu sampai hijau

5. Buka:
   ```
   https://yzz38-byte.github.io/
   ```

## Sync resources

Otomatis setiap 6 jam via GitHub Actions, atau manual:

```bash
npm run sync
```
