# Majd Issa — Visual Computing Portfolio

Personal portfolio site for visual computing research, internships, and MSc-oriented work. Built with Vite + React and deployed to GitHub Pages.

**Live site:** [majdissadev.github.io](https://majdissadev.github.io) (after first deploy)

## Local development

```powershell
cd c:\Projects\MajdIssaDev.github.io
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Build

```powershell
npm run build
npm run preview
```

The build copies `index.html` to `404.html` for GitHub Pages SPA routing.

## Adding content later

See [CONTENT.md](./CONTENT.md) for how to add portrait photo, demo videos, gallery images, resume PDF, and contact links — all via config files in `src/content/`.

## Deploy to GitHub Pages

1. Create a GitHub repository named **`MajdIssaDev.github.io`** under your account.
2. Push this project to the `main` branch.
3. In repo **Settings → Pages**, set **Source** to **GitHub Actions**.
4. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and publishes automatically.

```powershell
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/MajdIssaDev/MajdIssaDev.github.io.git
git push -u origin main
```

## Project structure

```
src/
  components/     UI components
  content/        Site copy, projects, skills, blog posts
  pages/          Home, Writing index, Writing post
public/assets/    Media files (add later)
```

## Featured projects

- [Realtime SDF Renderer](https://github.com/MajdIssaDev/realtime-sdf-renderer) — C++/OpenGL ray marching editor
- [Project Gladiator](https://github.com/MajdIssaDev/GameEngineUnity-Project-GladiatorGame-V1) — Unity souls-like combat prototype
