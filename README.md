# A Garden Grown 🌸

A private, cinematic love-letter website — built as a surprise for your girlfriend, shared with a single QR code.

Plain HTML/CSS/JS. No backend, no database, no build step. Deploys straight to Vercel.

---

## 1. Open it in VS Code

1. Open VS Code.
2. `File → Open Folder…` and choose this `love-website` folder.
3. You should see:

```
love-website/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── music.mp3        ← you add this
    └── images/
        ├── photo1.jpg    ← you add these
        ├── photo2.jpg
        └── ...
```

4. Install the **Live Server** extension (by Ritwick Dey) if you don't have it, right‑click `index.html` → **Open with Live Server** to preview locally as you edit.

---

## 2. Where to put your photos

Drop your images into `assets/images/`.

The site currently expects (you can rename/add/remove — see step 4):

```
assets/images/photo1.jpg
assets/images/photo2.jpg
assets/images/photo3.jpg
assets/images/photo4.jpg
assets/images/photo5.jpg
```

**Tip:** keep each photo under ~500KB–1MB so the site loads fast on mobile. If your originals are huge, resize them first (any online image compressor like Squoosh.app works great, or Preview/Photos app "export" with smaller dimensions).

If a photo file is missing, that card will show a soft placeholder instead of breaking — so you can add photos gradually.

---

## 3. Where to put your music

Add one MP3 file named exactly:

```
assets/music.mp3
```

If you don't add a song yet, the floating music player simply won't appear — nothing breaks.

Want more than one song? Add extra files (e.g. `assets/song2.mp3`) and list them in `CONFIG.songs` in `script.js` — see step 4.

---

## 4. How to customize the names & messages

Open **`script.js`**. Everything editable lives at the very top, inside the `CONFIG` object:

```js
const CONFIG = {
  girlfriendName: "Her Name",
  myName: "Your Name",
  songs: [
    { title: "Our Song", artist: "Artist Name", src: "assets/music.mp3", art: "assets/images/photo1.jpg" }
  ],
  letterParagraph: `...`,
  reasons: [ { icon: "🌹", title: "...", text: "..." }, ... ],
  memories: [ { src: "assets/images/photo1.jpg", caption: "you" }, ... ],
  secretMessage: `...`,
};
```

Just edit the text between the quotes. Nothing else in the file needs to change.

**More than one song?** Add extra entries to the `songs` array — the player's prev/next buttons will move between them automatically. With just one song, prev/next simply replay it.

---

## 5. How to add more (or fewer) photos

In `CONFIG.memories`, add or remove lines. The layout adapts automatically — you can have 3 photos or 30:

```js
memories: [
  { src: "assets/images/photo1.jpg", caption: "you" },
  { src: "assets/images/photo2.jpg", caption: "my favorite person" },
  { src: "assets/images/beach-trip.jpg", caption: "that weekend at the beach" },
],
```

---

## 6. How to test it on your phone (before deploying)

**Easiest:** deploy to Vercel first (step 8 below is fast, ~2 minutes), then just open the URL on your phone.

**Local option:** with Live Server running in VS Code, it shows a local network address like `http://192.168.1.23:5500`. If your phone is on the same Wi‑Fi, open that address in your phone's browser.

---

## 7. How to upload it to GitHub

1. Create a new **private** repository on GitHub (keep it private so the surprise stays a surprise!) — e.g. `love-website`.
2. In VS Code, open a terminal in the `love-website` folder and run:

```bash
git init
git add .
git commit -m "A Garden Grown"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/love-website.git
git push -u origin main
```

(Replace the URL with your actual repo URL — GitHub shows it right after you create the repo.)

---

## 8. How to deploy it to Vercel

1. Go to **vercel.com** and sign in (you can use your GitHub account).
2. Click **Add New → Project**.
3. Click **Import Git Repository** and select the `love-website` repo.
4. Leave all settings as default — no framework, no build command needed, it's a static site.
5. Click **Deploy**.
6. Wait ~30–60 seconds.

---

## 9. How to get the final Vercel URL

After deployment finishes, Vercel shows you a link like:

```
https://love-website-yourname.vercel.app
```

Click **Visit** to open it and make sure everything looks right — check it on your own phone too.

*(Optional) Add a custom domain:* in the project's **Settings → Domains** tab you can attach something like `foryou.love` if you own one — totally optional, the default `.vercel.app` link works perfectly fine.

---

## 10. How to generate a QR code pointing to that URL

1. Go to a free QR generator such as **qr-code-generator.com** or **qrcode-monkey.com**.
2. Paste your Vercel URL.
3. Generate and download the QR code image (PNG or SVG).
4. Print it on a card, or show it on your phone screen.

---

## 11. Send the surprise

Hand her the QR code (or your phone) and just say:

> **"Scan this ❤️"**

---

### A few notes

- Everything is mobile‑first and works great on iPhone, Android, tablet, and desktop.
- Animations respect `prefers-reduced-motion` for accessibility.
- The site uses only relative paths (`assets/...`), so it works correctly on any Vercel URL — no code changes needed between local testing and production.
- No personal data is collected, stored, or sent anywhere. It's just HTML, CSS, and JS running in the browser.
