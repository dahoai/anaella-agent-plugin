---
name: content-to-video
description: Turn an article, a video, a podcast or a document into ready posts, short narrated videos, captions, voice-overs, transcripts and cleaned-up images with Anaella's media tools, then schedule them. Use when the user asks to repurpose content, make a reel / TikTok / short from a topic or script, add subtitles to a video, transcribe audio or video, get a YouTube transcript, read a PDF or Word file, remove a photo background, convert, trim or merge media, or download a TikTok / Instagram / YouTube video into their library.
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

- **A short video from a topic or a script**: `media.video.create` (`topic` or `script`,
  `language`, `orientation`, `maxSeconds`, `captionStyle`, `music`). Stock footage, a voice
  and burnt-in captions. About 1.5 minutes; $0.30 up to 60 s, $0.60 above. Show the user the
  script before posting.
- **Captions on the user's own video**: `media.video.captions.add` ($0.10).
- **Voice-over**: `media.audio.speech` (`text`, `language`, `voice`); lay it over a video with
  `media.video.merge` (`mediaIds`, `audioId`).
- **Edit**: `media.video.trim`, `media.video.merge`, `media.video.frames` (thumbnails or
  carousel slides), `media.convert` (MOV→MP4, HEIC→JPG, a lighter file), `$0.01` each.
- **Photos**: `media.image.background.remove`, `media.image.upscale`.
- **Bring a file in**: `media.upload` takes direct file URLs, video pages (TikTok, Instagram,
  X, Facebook, Vimeo, YouTube: the video is fetched) and local files as base64 `files`. Only
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
