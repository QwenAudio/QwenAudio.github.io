# Qwen Audio

Speech understanding, generation and interaction research from Alibaba.
The [Qwen Audio homepage](https://qwenaudio.github.io/) introduces the Qwen-Audio
series and connects each project to its demonstrations and research materials.

## Qwen-Audio Series

| Project | Focus | Project page |
| --- | --- | --- |
| Qwen-Audio-3.0-ASR | Multilingual and dialect recognition, streaming, contextual recognition and hotwords | [Explore ASR](https://qwenaudio.github.io/qwen-audio-3.0-asr/) |
| Qwen-Audio-3.0-TTS | Controllable speech synthesis, cross-lingual voice cloning and long-form generation | [Explore TTS](https://qwenaudio.github.io/qwen-audio-3.0-tts/) |

## More Projects

| Project | Project page |
| --- | --- |
| SenseVoice & CosyVoice (original FunAudioLLM project) | https://qwenaudio.github.io/sensevoice-cosyvoice/ |
| CosyVoice 2 | https://qwenaudio.github.io/cosyvoice2/ |
| CosyVoice 3 | https://qwenaudio.github.io/cosyvoice3/ |
| MinMo | https://qwenaudio.github.io/minmo/ |
| InspireMusic | https://qwenaudio.github.io/inspiremusic/ |
| Fun-ASR | https://qwenaudio.github.io/funasr/ |
| Fun-Audio-Chat | https://qwenaudio.github.io/funaudiochat/ |

## Site Structure

- `index.html` and `hub/`: bilingual Qwen Audio project directory.
- `sensevoice-cosyvoice/index.html`: the original SenseVoice & CosyVoice page.
- Other project directories retain their existing pages and URLs.
- Shared original-page assets remain in `audios/`, `pics/`, `css/` and `pdf/`.
  The moved page uses the site root as its asset base; its contents links point
  directly to its new URL. Previously shared root fragment links are forwarded
  to the corresponding original project section.

The site is static and published with GitHub Pages. No build step is required.
For local preview, serve this directory as the web root, for example with
`python -m http.server 8000`.
