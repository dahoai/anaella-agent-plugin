---
name: content-to-video
description: Turn an article, a video, a podcast or a document into ready posts, short narrated videos, captions, voice-overs (including a cloned voice), transcripts and cleaned-up images with Anaella's media tools, then schedule them. Use when the user asks to repurpose content, make a reel / TikTok / short from a topic, a script, their own photos or a story, clone their voice, add a logo or watermark to a video, add subtitles to a video, transcribe audio or video, get a YouTube transcript, read a PDF or Word file, remove a photo background, convert, trim or merge media, or download a TikTok / Instagram / YouTube video into their library.
---

# Content to posts and videos with Anaella

Read the `anaella` skill first. These tools need no connected account; prices are per call
and `explain` gives the exact one. Every file they make lands in the media library as a
resource whose `id` goes straight into `social.post.create`.

## Text from anything

- **Article, video page or text → posts**: `content.repurpose` with one of `url`, `text` or
  `mediaId`, and the `platforms` (x, linkedin, instagram, threads, newsletter, blog…). It
  returns `ideas` and per platform `text` (plus `items` for a thread or carousel). $0.05.
- **Audio or video → text**: `media.transcribe` (`srt: true` for subtitles). $0.01 a minute.
- **YouTube → text**: `youtube.transcript.get` (free, uses the video's captions).
- **PDF, Word, slides, spreadsheet → markdown**: `document.to_markdown` with a `url` or a
  local file as base64 `data` + `name` (free).

## Media

- **A short video**: `media.video.create`, narrated with burnt-in captions (`language`,
  `voice`, `orientation`, `captionStyle`). About 1.5 minutes. Pick the `style`:
  - `footage` (default): `topic` or `script` over stock footage. $0.30 up to 60 s, $0.60 above.
  - `captioned`: a `script` (or the user's own voice-over, `audioId`) over one image or video
    of theirs (`backgroundId`).
  - `story`: a `script` told with karaoke captions over a background (`backgroundId`, or one
    generated from `backgroundPrompt`); `narratorImageId` and `narratorName` add a presenter.
  - `scenes`: 2-30 `scenes` (`text` + `mediaId` or `imagePrompt`), each line over its own image
    or video: the user's product shots, or generated images.
  captioned, story and scenes: $0.10 up to 60 s, $0.20 above. They take a caption `font`
  (`media.fonts.list`), and can be read by the user's cloned voice (`voiceId`) or the
  expressive `voice: chatterbox` (English; adds `media.audio.clone`'s price). Show the user the
  script first.
- **Captions on the user's own video**: `media.video.captions.add` ($0.10).
- **Voice-over**: `media.audio.speech` (`text`, `language`, `voice`; `words: true` adds when
  each word is said); lay it over a video with `media.video.merge` (`mediaIds`, `audioId`).
- **The user's own voice**: `media.voice.create` saves a 5-30 s recording as a voice, only with
  consent: read them the statement `explain` gives and set `consent: true` after they confirm
  it is their voice or they have the speaker's permission. Then `media.audio.clone`
  (`voiceId`, English `text`) reads any text in it: $0.25 up to 1,000 characters, $0.05 per
  1,000 more. `media.voices.list` / `media.voice.delete` manage them.
- **Edit**: `media.video.trim`, `media.video.merge`, `media.video.frames` (thumbnails or
  carousel slides; `sheet: true` adds a contact sheet), `media.convert` (MOV→MP4, HEIC→JPG, a lighter file), `$0.01` each.
- **Branding**: `media.video.overlay` puts a logo or watermark (`overlayId`, a transparent PNG,
  `opacity`) or a green-screen layer (`mode: colorkey`) on a video. $0.02.
- **Check a file**: `media.info` gives duration, size and dimensions (free): check a video
  against the platform's limits before scheduling it.
- **Photos**: `media.image.background.remove`, `media.image.upscale` (`factor` 2-4 enlarges;
  `naturalLook: true` makes a generated image look less AI), `media.image.stitch` (2-36 images
  in one grid: collage, before / after).
- **Bring a file in**: `media.upload` takes direct file URLs, video pages (TikTok, Instagram,
  X, Facebook, YouTube: the video is fetched) and local files as base64 `files`. Only
  download videos the user owns or has the right to reuse.

The media tools are async: pass `wait: true` to `do`, or poll `job`.

## Typical flow

1. `content.repurpose` the source for the platforms the user names; or `media.video.create`
   from its main idea.
2. Show the drafted posts and the video's script; adjust on request.
3. Schedule with `social.post.create` (see `social-publish`) only after an explicit yes on the
   exact text, media, accounts and time.

YouTube sources can be temporarily unavailable; the error says so. Then ask the user for
another link or the file itself.
