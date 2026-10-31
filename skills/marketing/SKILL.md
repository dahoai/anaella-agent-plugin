---
name: marketing
description: Run a business's marketing through Anaella — a positioning and audience brief, competitor research, a campaign plan, content for each channel, publishing after approval, a performance report and lessons for the next round. Use when the user asks for a marketing plan or strategy, a campaign or launch, a content calendar, what to post, how to get more customers, what's working in their marketing, or a monthly marketing review. For one post use `social-publish`, for ads alone `ads-report`, for SEO alone `seo-report`.
---

# Marketing with Anaella

Read the `anaella` skill first. This skill runs the loop; the workflow skills do the detail:
`social-publish`, `content-to-video`, `seo-report`, `ads-report`, `comment-replies`,
`lead-research`, `advisory-council`, `alerts-automations`.

The loop is brief → research → plan → make → approve → publish → measure → learn. Enter where the
user is: a request for a report starts at measure, a request for posts needs a brief first.

## Rules

- **Never invent** a customer, quote, result, statistic, price or date. A number needs a source
  you can name. Mark estimates as estimates.
- **Nothing goes out without a yes.** Posts, emails, ad changes and spend are shown first, exactly
  as they will appear, with the price of anything paid.
- **One goal at a time**, with a number and a date ("20 demo requests by December 15", not "more
  awareness"). Ask for it when it is missing.
- **Few things done well.** Two channels the business can sustain beat six abandoned ones.

## 1. Brief

Read what is there before asking: the website (`web.page.read`), or `company.research` with the
domain, and recent posts (`social.posts.list`). Then ask only what is still missing, in one
message: the offer and its price, who buys it and why now, the goal, the budget, what was tried,
and how the brand speaks. Write the brief in a page:

- **Audience:** one primary buyer, their problem in their words, what they use today.
- **Positioning:** for [audience] who [problem], [offer] gives [benefit], unlike [alternative],
  because [proof].
- **Voice:** three adjectives, plus words to use and to avoid.
- **Goal and budget.**

Keep it where the user's agent keeps notes (or `docs.create`) and reuse it next time. Confirm it
before planning: everything after depends on it.

## 2. Research

Read-only, and most of it free:

- **Competitors:** `web.search`, `web.page.read`, `company.research`; their live ads with
  `ads.competitors` (EU/UK markets, from the public Ad Library).
- **Demand:** `gsc.queries.list` for what already brings people, then `seo.keywords.ideas`,
  `seo.serp`, `seo.domain.overview` (paid per call: say the price first).
- **The audience's words:** reviews, comments (`social.comments.list`) and forum threads
  (`web.search`). Quote them; good copy borrows them.
- **Current results:** `analytics.report`, `social.post.analytics`, `ads.meta.insights`.

End with what the others all say, what nobody says, and where this business can win.

## 3. Plan

One page, one decision per line:

- **Strategy:** the diagnosis, the choice it leads to, and what you will not do.
- **Message:** one main promise, three supporting points, each with its proof.
- **Channels:** which and why, from where the audience already is and what the budget allows.
  Paid only with a budget and a working page to send people to.
- **Calendar:** dates, channel, subject, format and owner. Posts follow one storyline: a problem,
  how it is solved, someone who had it solved, the offer. Never the same topic and hook twice in
  a row.
- **Measure:** the number that decides success, and the date of the review.

Ask for approval of the plan before making anything. If the choice is hard, `advisory-council`
gives opposing views.

## 4. Make

- **Posts:** one subject per post, written again for each network, never pasted across. The first
  line earns the rest: a specific moment, number, or claim the reader wants to argue with. Score
  each draft from 1 to 10 on hook, clarity, proof and call to action, and rewrite anything under 7.
- **Visuals:** `media.stock.search` + `media.stock.import`, or `media.image.generate` (paid).
  Slides or a branded image: `web.page.screenshot` with `html`.
- **Video:** `content-to-video`, or `media.video.create` for a quick one.
- **Email:** `email.send` with `draft: true`, one idea and one link per email. Mail only people
  who agreed to hear from the business.
- **Links:** `link.create` with `utm_*` params, so `link.stats` shows what each channel brought.
- **Long pieces:** `docs.create` for a blog post or a brief to review.

Tag every piece with its topic, hook and format in your notes (or `sheets.append`), or the
comparison in step 7 is impossible.

## 5. Approve

Show everything together: the text per channel, the media, the dates and the total cost. Change
what the user changes. Never treat approval of a plan as approval of the posts.

## 6. Publish

Follow `social-publish`: `social.post.create` scheduled for the approved times, and
`social.post.update` for changes. Answer the comments with `comment-replies`. Ad changes go through
`ads-report`, with a dry run first.

## 7. Measure

Compare like with like, or the numbers lie:

- **Rank posts within one network only**, and at the same age: 14 days after publishing, else 4.
  Score = likes + 2 × comments + 3 × shares. Read video on views and watch time.
- **Rank a hook, topic or format only with 5 or more posts.** Below that, the answer is "not enough
  to compare yet", and that is a real answer.
- **Follow the goal first**, then the channels: `analytics.report`, `link.stats`,
  `social.followers.get`, `ads.pulse`, `ads.budget.review`, `gsc.opportunities`.
- A **dip** is the last 30 days averaging 25% or more below the 30 before. Check for a cause (fewer
  posts, a new format, a network change) before calling it one.

Report in one page: the goal against its number, one win, one miss, why, and the next three actions
with their owner and date.

## 8. Learn

Turn findings into proposals; the user decides:

```
Finding: moment hooks scored 14 against 6 for number hooks (7 and 5 posts, day 14)
Proposal: open on a moment for the next three posts
Test: use a new topic, to check it isn't the topic
```

Change one thing at a time per network, so the next report can tell if it worked. Write an approved
lesson into the brief with its evidence and date, and strike it through when it stops holding.

## Keep it running

Offer `alerts-automations` once a loop has worked: a Monday report with `automation.create` on a
schedule, reviewed before it goes out.
