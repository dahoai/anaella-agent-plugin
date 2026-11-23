---
name: content-to-video
description: Turn an article, a video, a podcast or a document into ready posts, short narrated videos, clips, captions, voice-overs (including a cloned voice), music, transcripts and cleaned-up images with Anaella's media tools, then schedule them. Use when the user asks to repurpose content, cut a long video or podcast into shorts / reels / clips, make a reel / TikTok / short from a topic, a script, their own photos or a story, turn a photo into a video, add music or a voice-over to a video, make a soundtrack or jingle, remove silences, clone their voice, add a logo or watermark to a video or a photo, put text or a hook on a video or a photo, add subtitles to a video, transcribe audio or video, get a YouTube transcript, read a PDF, a scan, a screenshot or a Word file, set or remove a photo's GPS location, remove a photo background, convert, trim or merge media, or download a TikTok / Instagram / YouTube video into their library.
---

# Content to posts and videos with Anaella

Read the `anaella` skill first. These tools need no connected account; prices are per call
and `explain` gives the exact one. Every file they make lands in the media library as a
resource whose `id` goes straight into `social.post.create`.

## Text from anything

- **Article, video page or text → posts**: `content.repurpose` with one of `url`, `text` or
  `mediaId`, and the `platforms` (x, linkedin, instagram, threads, newsletter, blog…). It
  returns `ideas` and per platform `text` (plus `items` for a thread or carousel). $0.05.
- **Audio or video → text**: `media.transcribe` with a file or a TikTok / Instagram / X /
  Facebook link (`srt: true` for subtitles). $0.01 a minute.
- **YouTube → text**: `youtube.transcript.get` (uses the video's captions; usually free, $0.005 when YouTube
  turns the first source away and a second one fetches them).
- **PDF (scanned too), Word, slides, spreadsheet, a photo or screenshot of text, a web page →
  markdown**: `document.to_markdown` with a `url`, a `mediaId` or a local file as base64
  `data` + `name`; `language` helps OCR read a scan that isn't in English or French (free).

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
  expressive `voice: chatterbox` (23 languages, set `language`; adds `media.audio.clone`'s price). Show the user the
  script first.
- **A motion-graphics video** (a launch, a promo, an ad from their logo, product photos and
  screenshots, with an original soundtrack, no narration): the `motion-video` skill.
- **Shorts from a long video** (a podcast, a webinar, a talk): `media.video.shorts` finds the
  `count` best self-contained moments, crops them to 9:16 and captions them; `instructions`
  steers the choice ("the pricing advice"). Each comes with a `title`, `hook` and `score`. Show
  the user the picks; `cut: false` returns only the picks, cheaper. $0.01 a minute of video plus
  $0.04 a short. Not for YouTube links: ask for the file.
- **A photo into a video**: `media.video.from_image` (slow zoom or pan, `duration`, `aspect`,
  optional `music` mood or own audio). $0.02. Several joined with `media.video.merge` make a
  slideshow.
- **A new AI clip** (a scene that doesn't exist yet, or a photo brought to life with real
  motion): `media.video.generate` from a `prompt` (what happens, the camera, the style), with an
  optional start frame (`imageMediaId` / `imageUrl`), `duration` up to 8 s, `aspect` 9:16 or 16:9.
  About $0.05 to $0.25 a second depending on the model; takes a minute or more. Show the user the
  prompt and the price first. Real footage of the user's own business beats a generated one:
  use this for b-roll, a hook shot or an idea with no footage.
- **Captions on the user's own video**: `media.video.captions.add` ($0.10).
- **Text on a video** (a hook, a title, labels): `media.video.text.add` takes 1-30 `texts`,
  each with `start` / `end` seconds, a `style` (classic, box, dark_box, neon, meme, headline,
  typewriter, minimal), a `position` clear of the apps' buttons (or `x`/`y`) and an `animation`
  (fade, pop, slide_up, typewriter). $0.02. Keep a hook short and on screen for the first 2-3 s.
- **Text on a photo** (a hook on a stock photo, a pin title, a quote card): `media.image.text.add`
  takes 1-10 `texts` in the same styles, plus `aspect` (4:5 for Instagram, Facebook and Threads,
  1:1 for LinkedIn, 2:3 for Pinterest, 9:16 for stories), `shade` (top, bottom or full: keeps
  white text readable) and per text `highlight` (words drawn in `accent`, default yellow). Text
  wraps and shrinks to fit. $0.01. A stock photo needs a hook; on a real photo of the work keep
  it short.
- **Voice-over**: `media.audio.speech` (`text`, `language`, `voice`; `words: true` adds when
  each word is said); put it under a video with `media.video.audio.add` (`audioMediaId`).
- **Music**: `media.video.audio.add` with `music` (a mood) puts a royalty-free library track
  under a video, quiet and looped ($0.02); `media.music.list` lists the tracks (free).
  `media.music.generate` composes new music from a description: a 30 s clip ($0.06) or a
  3-minute song ($0.12), instrumental unless they want vocals (`lyrics`).
- **Dead air**: `media.silence.remove` cuts the pauses out of a voice-over, podcast or
  talking-head video ($0.02; `listOnly: true` only lists them).
- **The user's own voice**: `media.voice.create` saves a 5-30 s recording as a voice, only with
  consent: read them the statement `explain` gives and set `consent: true` after they confirm
  it is their voice or they have the speaker's permission. Then `media.audio.clone`
  (`voiceId`, `text`, and `language` when it isn't English: 23 languages, whatever the
  recording's language) reads any text in it: $0.25 up to 1,000 characters, $0.05 per
  1,000 more. `media.voices.list` / `media.voice.delete` manage them.
- **Edit**: `media.video.trim`, `media.video.merge`, `media.video.frames` (thumbnails or
  carousel slides; `sheet: true` adds a contact sheet), `media.convert` (MOV→MP4, HEIC→JPG, a lighter file), `$0.01` each.
- **Branding**: `media.watermark.add` puts a logo (`logoMediaId`, a transparent PNG) on a photo
  or a video, in one of 9 `position`s at a `width` and `opacity`. $0.01 a photo, $0.02 a video.
  `media.video.overlay` lays a full-frame layer or a green-screen video (`mode: colorkey`).
- **Photo location**: `media.image.geotag` reads a photo's GPS and place, writes one
  (`latitude`/`longitude` or a `place`, e.g. for Google Business photos) or removes it before
  sharing (`action: remove`). Free.
- **Check a file**: `media.info` gives duration, size and dimensions (free): check a video
  against the platform's limits before scheduling it.
- **Photos**: `media.image.background.remove`, `media.image.upscale` (`factor` 2-4 enlarges;
  `naturalLook: true` makes a generated image look less AI), `media.image.stitch` (2-36 images
  in one grid: collage, before / after).
- **Bring a file in**: `media.upload` takes direct file URLs, video pages (TikTok, Instagram,
  X, Facebook, YouTube: the video is fetched) and local files as base64 `files`. Only
  download videos the user owns or has the right to reuse.

The media tools are async: pass `wait: true` to `do`, or poll `get_job`.

## Typical flow

1. `content.repurpose` the source for the platforms the user names; or `media.video.create`
   from its main idea.
2. Show the drafted posts and the video's script; adjust on request.
3. Schedule with `social.post.create` (see `social-publish`) only after an explicit yes on the
   exact text, media, accounts and time.

YouTube sources can be temporarily unavailable; the error says so. Then ask the user for
another link or the file itself.
