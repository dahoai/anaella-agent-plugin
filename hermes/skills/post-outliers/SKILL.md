---
name: post-outliers
description: Find which of the user's own published social posts did unusually well or badly compared with their normal results, explain the patterns (topic, hook, format, length, network, timing) and turn them into what to post next. Use when the user asks what is working on their social accounts, which posts performed best, why a post took off, what to post more or less of, or wants a swipe file from their own posts. Only the user's connected accounts; Anaella can't read other people's accounts.
---

# Post outliers with Anaella

Read the `anaella` skill first. Everything here is free and read-only.

Anaella reads the user's own posts only. For a competitor's posts, say it can't, and offer their
Meta ads (`ads.competitors.list`) or a web search (the `research` skill) instead.

## 1. Collect the posts

- `social.posts.list` with `limit: 100`, then keep the posts with `status: "published"`. Page with
  `cursor` only if fewer than 15 are published. `channelId` narrows to one account.
- Leave out posts published in the last 48 hours: their metrics are still filling in.
- Aim for 15 to 40 posts. Under 8 on one network, there's no baseline: list the posts by results,
  and say the sample is too small to call any of them an outlier.

## 2. Read each post's results

`social.post.analytics` per post with `period: "lifetime"`, one call per post. From `aggregates`:

- **Reach**: `views` for videos (reels, YouTube, TikTok), else `impressions`.
- **Engagement**: `likes + comments + shares + saves`.
- **Rate**: engagement divided by reach, when reach is above 0.

A metric listed in `notTracked` is unknown, not 0: leave it out, never count it as a zero. A metric
in `partlyTracked` only covers some of the post's networks; say so if it decides an outlier.

## 3. Compare each post with its own baseline

Never compare raw numbers across networks or accounts: 500 views is a flop on one account and a
record on another.

- Group the posts by the networks they went to (`channels[].platform`). A post sent to X and
  LinkedIn together is its own group, unless there are too few: then use the post's main network
  and say so.
- Baseline per group: the **median** reach and the median rate. Use the median, not the average:
  one viral post would pull the average up.
- **Outlier**: reach at least 2 times the group median, or a rate at least 1.5 times the median
  with reach no lower than half the median. **Underperformer**: reach under half the median.
- Show the multiple ("3.4× the usual views on Instagram"), not just the number.

## 4. Explain why

Read the full text of each outlier and underperformer with `social.post.get`. Compare them with
the posts near the median and look for what the outliers share:

- **Topic** and **angle** (a mistake, a number, a story, a how-to, an opinion).
- **Hook**: the first line or first words, quoted exactly.
- **Format**: post, reel, thread, article; with or without media; length.
- **Timing**: day of the week and hour, only if the pattern holds over 3 or more posts.

One post is an anecdote. Call something a pattern only when 2 or more outliers share it and the
median posts mostly don't. With fewer, label it "worth testing", not "what works".

## 5. Report

1. One line: how many posts, which networks, which period, and each group's median.
2. A table of outliers and underperformers: text start, network, date, reach, multiple of the
   median, rate, link (`channels[].url`).
3. The patterns, each with the posts that show it.
4. **What to post next**: 3 to 5 concrete ideas built on the patterns, each with a hook written in
   the user's voice. Offer to draft them with the `social-publish` skill. Never schedule or post
   anything from this skill.

For what the audience asked or complained about in the comments, use the `comment-mining` skill.
