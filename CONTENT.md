# Content guide

Update these fields when you have assets ready. No component code changes needed.

## Portrait photo

1. Add image to `public/assets/portrait.jpg`
2. In `src/content/site.js`, set:
   ```js
   photoSrc: '/assets/portrait.jpg',
   ```

## SDF Renderer demo video

1. Add video to `public/assets/sdf-demo.mp4`
2. Optional poster: `public/assets/sdf-poster.jpg`
3. In `src/content/projects.js`, find the `sdf-renderer` entry and set:
   ```js
   videoSrc: '/assets/sdf-demo.mp4',
   posterSrc: '/assets/sdf-poster.jpg',  // optional
   ```

## SDF ray marching comparison

1. Save two screenshots of the **same scene, same camera, same resolution** to `src/assets/sdf/`:
   - **Before:** standard ray marching (artifact visible, e.g. ray stops short of surface)
   - **After:** your modified ray marching (clean hit on surface)
2. Import them at the top of `src/content/projects.js` and configure the `compare` block:

   ```js
   compare: {
     before: rayMarchTraditional,
     after: rayMarchRollback,
     beforeLabel: 'Standard ray marching',
     afterLabel: 'My modified ray marching',
   },
   ```

Only two full-frame screenshots are needed (same scene and camera, one per mode). The slider combines them in the browser.

## SDF gallery images

1. Add images to `public/assets/sdf/` (e.g. `editor.png`, `npr.png`)
2. In `src/content/projects.js`:
   ```js
   gallery: ['/assets/sdf/editor.png', '/assets/sdf/npr.png'],
   ```

## Gladiator combat video

1. Add `public/assets/gladiator-demo.mp4`
2. In `src/content/projects.js`, find the `gladiator` entry:
   ```js
   videoSrc: '/assets/gladiator-demo.mp4',
   embedUrl: null,
   ```

## Gladiator screenshots

1. Add images to `public/assets/gladiator/`
2. In `src/content/projects.js`, find the `gladiator` entry:
   ```js
   gallery: ['/assets/gladiator/combat.png'],
   ```

## Mobile delivery platform screenshots

Processed screenshots live in `src/assets/delivery/` (Vite bundled, not `public/`). The script only hides the iOS status bar. Re-run:

```powershell
python scripts/process-delivery-screenshots.py
```

Imports are in `src/content/projects.js` via `*-v2.png` filenames.

## Resume PDF

1. Add `public/resume.pdf`
2. In `src/content/site.js`:
   ```js
   resumeUrl: '/resume.pdf',
   ```

## Contact links

In `src/content/site.js`:

```js
email: 'your.email@example.com',
linkedin: 'https://linkedin.com/in/yourprofile',
```

## Writing posts

Add new posts in `src/content/posts/` and register them in `src/content/posts/index.js`.
