# Qwen-Audio-3.1-Realtime

Project page for Qwen-Audio-3.1-Realtime, published with GitHub Pages at
<https://qwenaudio.github.io/qwen-audio-3.1-realtime/>.

## Layout

A single static page; no build step is required to serve it.

- `index.html` — the page itself
- `styles.css`, `overview.css`, `demo.css` — styling
- `app.js`, `demo.js` — navigation and the interactive demo players
- `assets/` — logos, figures, demo audio and video
- `build_overview.py` — regenerates `assets/overview.svg`
- `.nojekyll` — serve files as-is, without Jekyll processing

All asset references are relative, so the page works from the
`/qwen-audio-3.1-realtime/` path a GitHub Pages project site is served from.

## Local preview

```bash
python3 -m http.server 8093
```

Then open <http://127.0.0.1:8093/>. A plain file server is enough; audio and
video seeking relies on HTTP range requests, which `http.server` supports.
