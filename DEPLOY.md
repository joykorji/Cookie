# How to publish this app

The app is a **static site** (no server needed). After `npm run build`, the `dist/` folder contains everything. You can host it on any static host.

---

## Option 1: Vercel (recommended, free)

1. **Push your project to GitHub** (if you haven’t already).
   - Create a repo, then:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub.

3. **Import your repo**
   - Click “Add New…” → “Project”.
   - Select the Cookie repo.
   - Vercel will detect Vite. Keep:
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Click **Deploy**.

4. When it’s done, you get a URL like `https://your-project.vercel.app`. Share that link; it works on iPhone and desktop.

5. **Updates:** Push to `main`; Vercel redeploys automatically.

---

## Option 2: Netlify (free)

1. **Push your project to GitHub** (same as above).

2. **Go to [netlify.com](https://netlify.com)** and sign in with GitHub.

3. **Add a new site**
   - “Add new site” → “Import an existing project” → GitHub → choose your repo.
   - Settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click “Deploy site”.

4. You’ll get a URL like `https://random-name.netlify.app`. You can change it under “Domain settings”.

5. **Updates:** Push to `main`; Netlify redeploys automatically.

---

## Option 3: GitHub Pages

1. **Push your project to GitHub.**

2. **Set the base path**  
   Edit `.github/workflows/deploy-pages.yml` and change `VITE_BASE: '/Cookie/'` to your repo name (e.g. `'/my-valentine/'`).

3. **Turn on GitHub Pages**  
   In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions.**

4. **Push to `main`.**  
   The workflow will build and deploy. Your site will be at `https://YOUR_USERNAME.github.io/Cookie/` (use your repo name in the URL).

---

## iPhone / mobile

The app is set up to work on iPhone:

- **Viewport & safe area** for notch and home indicator
- **Touch:** Swipe on the cards and tap on the puzzle work on touch devices
- **No horizontal scroll** when swiping the card (touch handling prevents it)

Test the live URL on your iPhone before sharing.

---

## Checklist before sharing

- [ ] Run `npm run build` and fix any errors
- [ ] Open the deployed URL on your phone and go through: landing → 4 swipe cards → “one more game” → puzzle → heart → success
- [ ] Confirm images load (`/images/card1.png` … `card4.png`, `puzzle.png`)
