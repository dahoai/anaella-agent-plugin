---
name: social-publish
description: Write and schedule social media posts on the user's connected channels (X, LinkedIn, Instagram, Facebook, TikTok, YouTube, Bluesky, Telegram, Pinterest, Reddit) through Anaella. Use when the user wants to post, schedule, or plan social content, or adapt one message for several networks.
---

# Social publishing with Anaella

Read the `anaella` skill first. Posts are **public**.

1. **Channels.** List the connected social channels (`social.channels.list`). None → ask the user
   to connect that network (`request_connect` in-app, or a connect link / `connect_account` on
   MCP/CLI), wait until it is connected, then continue.
2. **Draft** per network: respect each network's length and style (X short, LinkedIn
   longer and professional, Instagram needs media, Reddit needs a subreddit and a title and its
   own care: use the `reddit` skill; YouTube takes only a video, the text becomes its
   description, and `settings.<id>.youtube` sets title, privacy, tags and `thumbnailUrl`). Keep the user's facts; don't invent
   claims, prices or dates. For images, use `media.stock.search` + `media.stock.import`, or
   `media.image.generate` (paid, $0.01 to $0.13 per image) if the user wants a generated one,
   or `media.video.generate` for a short AI clip (paid, per second; see `content-to-video`).
   **Alt text.** For every image you post, write alt text: what it shows, in one or two plain
   sentences, no "image of". Pass it with the image (`media.upload` url as `{ url, altText }`, or
   `media.update` on a library image) before `social.post.create`. Facebook, Instagram, LinkedIn,
   Threads, Bluesky, Mastodon, X and single-image Pinterest pins send it; on X each image with alt text costs
   one more X call. Skip it on videos.
   **AI label.** When the video or photos for YouTube or TikTok were made or realistically
   changed by AI (a generated clip, a talking head, AI voice-over on real footage), set
   `settings.<id>.youtube.aiGenerated` / `settings.<id>.tiktok.aiGenerated` to `true` and say so
   in the approval. Both networks require that disclosure. A TikTok draft can't carry the label;
   tell the user to switch it on in the TikTok app.
   Write like a person, not a brand, above all on X and Bluesky:
   - One thought per post. Lead with the point; no warm-up line.
   - Plain words, short sentences, as if typed on a phone. Lowercase and fragments are fine
     when that is the user's voice.
   - No hashtag piles (one at most, only if the network rewards it), no emoji bullets, no
     "Here's the thing", "Let's dive in", "game changer", "🚀", or a question just to bait replies.
   - Specific beats general: a number, a name, what happened. Cut every sentence that would
     fit any company.
   - A reply answers the post it is under, in that post's language; it never pitches.
   - If the user's past posts are available (`social.posts.list`), match their voice, and lean on
     what did best for them (the `post-outliers` skill).
3. **Approve.** Show the text per channel, the media and the time. Ask for an explicit yes.
   When you have the `preview_post` tool (Anaella's MCP server), call it with the exact
   `social.post.create` input instead: the user sees the post on each account and publishes from
   it, and you are told when they do. Don't publish that post again yourself.
4. **Publish** with `social.post.create`: schedule for the time the
   user chose; publish immediately only when they asked for it.
5. **Changes** to a draft or scheduled post (new text, add an image, another time): edit it in
   place with `social.post.update`; don't delete and recreate it.
   `media` replaces the whole list. Published posts can't be edited. A YouTube video already
   up is the exception: `youtube.videos.list` finds it, `youtube.video.update` changes its title,
   description, tags, privacy or thumbnail (confirm first: a public video changes at once).
6. Report the post ids and scheduled times. Analytics are available later with
   `social.post.analytics` (video views, watch time and saves included; `period: "lifetime"`
   for all time); links to the published posts with `social.post.get`; follower growth per
   channel with `social.followers.get`.
