---
name: social-publish
description: Write and schedule social media posts on the user's connected channels (X, LinkedIn, Instagram, Facebook, TikTok, YouTube, Threads, Bluesky, Mastodon) through Anaella. Use when the user wants to post, schedule, or plan social content, or adapt one message for several networks.
---

# Social publishing with Anaella

Read the `anaella` skill first. Posts are **public**.

1. **Channels.** List the connected social channels (`social.channels.list`). None → create a connect link for the network the user wants.
2. **Draft** per network: respect each network's length and style (X short, LinkedIn
   longer and professional, Instagram needs media). Keep the user's facts; don't invent
   claims, prices or dates. For images, use `media.stock.search` + `media.stock.import`, or
   `media.image.generate` (paid, $0.01 per image) if the user wants a generated one.
3. **Approve.** Show the text per channel, the media and the time. Ask for an explicit yes.
4. **Publish** with `social.post.create`: schedule for the time the
   user chose; publish immediately only when they asked for it.
5. **Changes** to a draft or scheduled post (new text, add an image, another time): edit it in
   place with `social.post.update`; don't delete and recreate it.
   `media` replaces the whole list. Published posts can't be edited.
6. Report the post ids and scheduled times. Analytics are available later with
   `social.post.analytics`.
