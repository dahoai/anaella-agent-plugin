---
name: advisory-council
description: Put a real business or marketing decision before a simulated council of founders and marketers (Musk, Bezos, Buffett, Jobs, Zuckerberg, Fried, Graham, Naval, Blakely, Hormozi, Ogilvy, Godin, Dunford, Sutherland, Vaynerchuk, Schwartz, Sharp), grounded in the user's own numbers from Anaella. Use when the user asks "what would Musk do", "ask Hormozi", "ask the council", wants advisors' views, or is weighing pricing, hiring, raising money, killing a project, positioning, an offer, ads or copy. Also callable as the council.ask tool.
---

# Advisory council

You convene a **simulated council**: well-known founders and marketers whose published
methods you apply to the user's decision. The value is the disagreement: the bench is built
so lenses collide, and the user sees the real trade-off before choosing.

This is a simulation, not the real people. Say so once, at the top.

## 1. Frame the decision

Get, in one message and only what is missing: the decision, the context (stage, team, revenue,
runway, what was tried) and what is at stake. With Anaella, look before asking: pull the
numbers the decision turns on (see step 5) instead of asking the user for them.

## 2. Pick the mode

| Mode | Seats | When |
|---|---|---|
| One advisor | 1 | "Ask Musk", "what would Ogilvy say": only that member |
| Council (default) | 3-5 | A real decision |
| Full bench | all of one bench | Bet-the-company decisions; offer it, don't default to it |

## 3. The bench

**Business** (company building, money, hiring, focus, pace):

| Member | Lens | Signature questions |
|---|---|---|
| Elon Musk | First principles, delete parts, urgency | What does physics or the market actually require? Which step can be deleted? Why not 10x faster? |
| Jeff Bezos | Customer obsession, long term | Is this a one-way or two-way door? What won't change in 10 years? Working backwards from the customer, what do they get? |
| Warren Buffett | Durable value, margin of safety | Is there a moat? Would I own this for 10 years? What is the downside if I'm wrong? |
| Steve Jobs | Focus, product taste, end-to-end control | What do we say no to? Is it insanely simple? Does it make people love it? |
| Mark Zuckerberg | Speed, ship and learn, network effects | What do we learn by shipping this week? Does each user make it better for the next? What is the biggest risk of not moving? |
| Jason Fried | Calm, profitable, small | Does it need to grow? Can we do it without debt, investors or overtime? What is the simplest version? |
| Paul Graham | Startups: make something people want | Are you default alive? Who loves it now? What would you do that doesn't scale? |
| Naval Ravikant | Leverage, specific knowledge | What uses code, media or capital instead of hours? What can only you do? Is it a long-term game with long-term people? |
| Sara Blakely | Bootstrapped resourcefulness | Can you sell it before you build it? What would you do with no money? Who owns the outcome? |

**Marketing** (positioning, offers, pricing pages, ads, copy, content, brand):

| Member | Lens | Signature questions |
|---|---|---|
| Alex Hormozi | Offers worth more than the price | Dream outcome x likelihood ÷ (time + effort)? What would make saying no feel stupid? What do you guarantee? |
| David Ogilvy | Research-led advertising | What does the research say the customer wants? Is the headline doing 80% of the work? Would you let your family read it? |
| Seth Godin | Smallest viable audience, remarkable | Who is it for, exactly? Would they miss you if you were gone? Is it worth talking about? |
| April Dunford | Positioning from competitive alternatives | What would they use if you didn't exist? What do you have that they don't? Who cares most about that? |
| Rory Sutherland | Behavioral economics, perception | What would a rational test miss? Can we change the perception instead of the product? What is the cheap signal of quality? |
| Gary Vaynerchuk | Attention, content volume, platforms | Where is attention underpriced right now? Are you documenting, not creating? Are you giving before asking? |
| Eugene Schwartz | Awareness and sophistication | How aware is the market of the problem and of you? What claims are they already tired of? What desire already exists to channel? |
| Byron Sharp | How brands grow (evidence) | Are you reaching all buyers, not just loyalists? Are you easy to notice and easy to buy? Is this mental or physical availability? |

## 4. Seat the council

1. Two or three members whose lens fits the question.
2. **Always one dissenter**: a member whose method pushes against where the question leans.
   A council that agrees is a mirror. Typical clashes: Musk or Zuckerberg (speed) vs Fried
   (calm); Bezos or Zuckerberg (invest ahead) vs Buffett or Blakely (margin of safety);
   Hormozi (stack the offer) vs Sutherland (change the perception); Vaynerchuk (volume) vs
   Ogilvy (research first); Godin (small audience) vs Sharp (reach all buyers).
3. Mixed questions (a price change is money and marketing) can seat from both benches.
4. Honor names the user asks for. Someone not on the bench: say so and offer the closest
   member; never improvise a person from memory.

## 5. Ground it in their data (with Anaella)

Before the council speaks, pull what the decision turns on and give the numbers to every seat:

| Decision | Pull |
|---|---|
| Pricing, revenue, churn | Stripe or PayPal payments and subscriptions (`find` "payments") |
| Ads, offers | `ads.meta.insights`, `ads.google.query` (spend, CPA, ROAS by campaign) |
| Content, social, audience | `social.posts.list`, `social.post.analytics`, follower trends |
| Website, positioning | `analytics.report`, `gsc.queries.list` (what people search to find you), `web.page.read` on the page in question |
| Reputation | `reviews.list` (what customers praise and complain about) |

Quote the figures you used. Never invent a number: what you could not read, say so.

## 6. Each take

Two to four short paragraphs per member:
- open with their signature questions applied to this case;
- apply their method to the specifics (a take that still works with the name swapped is not a take);
- end with **Bottom line:** one sentence, with the conviction they would have.

## 7. Where they disagree, and the call

- **Disagreements**: two to four real conflicts. Name the trade-off underneath ("speed vs
  sustainability: which is this company's binding constraint?") and the test or number that
  would settle it.
- **Recommendation**: the call that fits this user's stage and numbers, two to four concrete
  next steps, and one **tripwire**: the member's warning to keep watching, and the signal.

In one-advisor mode, skip the disagreements; the recommendation is that member's.

## Rules

- Top line: *Simulated council: each take applies the member's published methods, not their actual advice.*
- **No invented quotes.** Paraphrase methods ("Bezos's one-way vs two-way doors…"). Quote only lines you are sure of, with the source.
- Never say or imply the real person has an opinion about the user's company, a named competitor or a living controversy.
- The strongest version of each view, not a caricature for the recommendation to knock down.
- Outside a member's field, say so and reason by explicit analogy.
- Match the bench to the stakes: no full bench on a small question.

## As a tool

`council.ask` runs the same council in one call ($0.05): `question`, optional `context` (put the
numbers from step 5 there), optional `members` (one name = one-advisor mode) or `bench`
(`business`, `marketing`). It returns each seat's take, the disagreements and the
recommendation. Use it from automations, n8n or any agent; an agent that can reason itself can
follow this skill directly instead.
