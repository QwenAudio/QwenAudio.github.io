# Qwen-Audio-3.1-ASR project page

Independent release page. No files under `qwen-audio-3.0-asr/` need to change.

## Preview

Serve the repository with a static HTTP server and open `/qwen-audio-3.1-asr/`.
The page also works directly from `index.html`; all runtime assets are local.

## Content provenance

- Overview: supplied `figure1-dense-v1.svg`, recolored to a purple-only palette in this release copy. Text and geometry preserved.
- Speaker-diarized ASR: September 18 launch material, slide 28, embedded media20.wav. Seven supplied segments across five speakers, including overlaps.
- General audio understanding: slides 34–36, embedded media23–29. Seven recorded tasks; outputs reproduced from the slides, with English translations.
- Diarization benchmark: slide 32. Original “Ours” row presented as Qwen-Audio-3.1-ASR. These are reported results, not independently rerun evaluations.
- Audio understanding benchmarks and six-task scores: slide 37. Qwen leads the listed MMAU comparison, not MMSU.
- Model capability matrix: slide 42. Flash and Next support non-streaming diarization. General audio understanding is Next-only.
- Industry radar: September 11 update, equal-weight test-set means within each of 15 categories; displayed series C/E/G, with a specified language. 11 outright-leading domains. Category-macro recall 96.94%. Radial positions show gaps to each domain’s best model; labels show absolute recall.
- The established audio atlas, multilingual samples and dialect samples are reused from the existing project. Representative geographical points are sample locations, not complete language distributions.

All audio interactions are prerecorded example playback, not live model inference. No unpublished API URL or 3.1 report URL is implied. Previous release results remain on the linked 3.0 page.

## Files

- `atlas.js`, `assets/maps/`, `vendor/`: inherited interactive maps and audio selector.
- `release31.js`, `release31.css`: new demos, reported benchmarks, model matrix and bilingual UI.
- `i18n.js`: inherited atlas translation; release copy has its own locale preference.
- `assets/launch31/`: new audio examples and purple-themed vector figures.

## Validation

Checked at 1440px desktop and 390px mobile widths: no uncaught JS errors, no horizontal page overflow, all 8 new audio files load, 46 geographic markers render, language switching works, overlapping speaker segments highlight together, and all 7 understanding tabs load their matching media.
