# Anaella for Hermes

Connects [Hermes Agent](https://hermes-agent.nousresearch.com) to [Anaella](https://anaella.com):
one MCP server for the accounts you use every day (Gmail, Outlook or any IMAP mailbox, Google and
Outlook calendars, Drive, Docs and Sheets, Slack, Search Console, Google Analytics, Meta and Google
Ads, Business Profile reviews, Stripe, PayPal, n8n, a phone number, a meeting bot and 9 social
networks), plus 24 workflow skills.

This folder is the Hermes build of the [Anaella agent plugin](https://github.com/dahoai/anaella-agent-plugin):
an [Agent Plugins v1](https://agent-plugins.org/specification) package (`plugin.json`, `mcp.json`
and `skills/`), no Python, no hooks. The skills are the same as the plugin's for Claude Code, Codex
and Antigravity; only the MCP server differs, running locally with your API key.

## Install

1. Create an API key in Anaella: your organization's settings → [**API Keys**](https://anaella.com/organizations/api-keys).
   It starts with `ana_`.
2. Add it to your Hermes profile's `.env` (`~/.hermes/.env`):

   ```
   ANAELLA_API_KEY=ana_...
   ```

3. Install and enable the plugin:

   ```
   hermes plugins install anaella
   hermes plugins enable anaella
   ```

The MCP server runs locally with `npx -y @anaella/mcp@0.12.1`, so Node.js 20 or later and npm are
needed. The key works in chat, cron jobs and the messaging gateway alike: there is no browser
sign-in.

Connect the accounts you want Anaella to use (Gmail, Slack, social networks…) on the
[**Accounts**](https://anaella.com/channels) page. If one is missing, the agent gets a connect link to
send you.

## What it gives Hermes

Eight MCP tools: `find`, `explain` and `do` cover the whole Anaella catalog (about 180
capabilities), plus `job`, `list_channels`, `create_connect_link`, `connect_account` and
`remove_account`. The skills load on demand as `anaella:<skill>`:

| Skill | What it does |
|-------|--------------|
| `anaella` | How to use find → explain → do, connected accounts, errors, and the rules for writes |
| `seo-report` | SEO report from Search Console + GA4 (quick wins, drops, index coverage) and Bing Webmaster Tools, keyword research, competitors, backlinks, site technical audit, AI visibility and readiness, with a diagnose → choose → act method |
| `ads-report` | Google and Meta ads account audit (scored controls and grade); Meta and Google Ads spend, results and cost per result by campaign; anomalies, kill or scale verdicts per campaign and per Meta ad (hook rate, fatigue), wasted search spend and negatives; competitors' Meta ads from the Ad Library; paid search terms that already rank organically; applies the agreed fixes (negatives, pauses, budgets, bidding, keywords, ad copy) and builds paused Meta image, video and lead ads after a yes |
| `review-replies` | Drafts Google review replies, posts only the ones you approve |
| `comment-replies` | Reads comments on your published posts, drafts replies, posts or queues the approved ones, hides spam |
| `comment-mining` | Turns the comments on your posts into audience research: questions, objections, complaints, buying signals and their exact words, with content and FAQ ideas |
| `post-outliers` | Finds your posts that beat or missed your usual results on each network, explains why (topic, hook, format, timing) and suggests what to post next |
| `meeting-scheduler` | Finds free time and books a Google or Outlook event (invites only on request) |
| `inbox-triage` | Summarizes unread mail (Gmail, Outlook, IMAP) and saves reply drafts for you to send |
| `research` | Answers a question from web, news and paper search, full pages, PDFs and YouTube transcripts, with every claim linked to its source and gaps stated |
| `marketing` | Runs the whole loop: brief, competitor research, campaign plan, content, publishing after approval, performance report and lessons |
| `social-publish` | Drafts per-network posts and schedules them after approval |
| `payments-followup` | Unpaid Stripe or PayPal invoices, reminders, payment requests and refunds, each confirmed first |
| `slack-digest` | Summarizes channels and open questions, posts approved updates or thread replies |
| `lead-research` | Company profiles from a domain, local business prospects, and the owners behind them on LinkedIn |
| `document-from-template` | Copies a Docs template and fills its placeholders, writes Docs from Markdown, shares on request |
| `form-filler` | Fills PDF forms from your documents and answers, ready for you to sign: asks only for what is missing, then reports anything left empty or unverified |
| `e-signature` | Gets a PDF signed: people sign in order on private links you send, can decline, and every step goes in an audit record |
| `phone-calls` | Texts from your number, AI calls that book or ask and report back, an AI that answers and takes messages |
| `meeting-bot` | Sends Anaella's bot into a Google Meet, Zoom or Teams call, then summarizes the transcript by speaker; in Meet it can talk for your agent |
| `n8n-ops` | Finds failed n8n runs, explains why, retries them; runs and edits workflows and data tables |
| `motion-video` | Makes motion-graphics launch and promo videos (15-30 s, original soundtrack) from the user's logo, product photos and screenshots: prepares the assets, writes the film, checks its key frames and renders the MP4 |
| `content-to-video` | Repurposes an article, video or document into posts, makes narrated short videos (stock, own visuals, stories), captions, text overlays, voice-overs, voice clones and transcripts |
| `advisory-council` | Puts a decision before simulated founders and marketers (Musk, Bezos, Hormozi, Ogilvy…), grounded in your own numbers: each take, where they disagree, a recommendation |
| `alerts-automations` | Watches for new items and automations on a schedule or trigger, writes held for approval |

## What to know before installing

- **Network calls.** Every tool call goes to `https://api.anaella.com` with your API key. The
  server is started with `npx`, which downloads the pinned `@anaella/mcp` package from npm.
- **It acts in your name.** Anaella can send email and texts, place AI phone calls, post to your
  social accounts, edit sheets, share files, change ad campaigns, and send invoices or refunds on
  the accounts you connected. The plugin marks its server untrusted, so Hermes asks you before
  every write-capable call (`do`, `connect_account`, `remove_account`, `create_connect_link`), and
  the skills also show the exact content and get your yes first. Some tools cost money from your
  Anaella wallet (each tool states its price; paid calls stop at your daily spending limit).
- **Local files.** `media.upload` with `files: [{ "path": ... }]` reads a file on this computer that
  the agent names and uploads it to your private Anaella library. The skills allow it only for a
  file you named; the server refuses hidden files and folders (`.env`, `~/.ssh`, `~/.hermes`...)
  and the Hermes home.
- **Account passwords.** `connect_account` sends the credentials you give it (a mailbox password
  or app password for IMAP/SMTP, a Bluesky app password, a bot token, an API key) to Anaella, which
  stores them encrypted to reach that account.
- **Credentials.** The plugin stores nothing. Hermes passes `ANAELLA_API_KEY` from your profile
  to the local server; delete the key in Anaella to revoke it.
- **No telemetry**, no background process beyond the MCP server Hermes starts, no files written
  outside Hermes's own directories.

## Support

[anaella.com](https://anaella.com) · support@anaella.com
