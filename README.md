# Anaella agent plugin

Connects your coding agent to [Anaella](https://anaella.com): one hosted MCP server for the
accounts you use every day (Gmail, Outlook or any IMAP mailbox, Google and Outlook calendars,
Drive, Docs and Sheets, Slack, Search Console, Google Analytics, Meta and Google Ads, Business
Profile reviews, Stripe, PayPal, n8n, a phone number, a meeting bot and 9 social networks), plus skills for reports, replies,
scheduling and inbox triage.

This repository is the plugin only: a pointer to the hosted server (`https://api.anaella.com/mcp`)
and Markdown skills. It follows the [Agent Plugins specification v1.0.0](https://agent-plugins.org/specification):
`plugin.json`, `mcp.json` and `skills/` are the portable package; `.claude-plugin/` and
`.agents/` add Claude Code and Codex marketplace support.

## Install

### Claude Code

```
/plugin marketplace add dahoai/anaella-agent-plugin
/plugin install anaella@anaella
```

Then run `/mcp`, pick **anaella** and sign in with your Anaella account.

### Codex

```
codex plugin marketplace add dahoai/anaella-agent-plugin
codex plugin add anaella@anaella
codex mcp login anaella
```

### Antigravity

```
agy plugin install https://github.com/dahoai/anaella-agent-plugin
```

### OpenCode, Cursor, Gemini CLI and other Agent Skills hosts

Install the skills with the [Skills CLI](https://github.com/vercel-labs/skills):

```
npx skills add https://github.com/dahoai/anaella-agent-plugin
```

Then add the MCP server in the client. OpenCode (`opencode.json`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "anaella": { "type": "remote", "url": "https://api.anaella.com/mcp" }
  }
}
```

and sign in with `opencode mcp auth anaella`. Any other MCP client takes the same URL over
Streamable HTTP, either signing in with OAuth or sending an API key:

```json
{
  "mcpServers": {
    "anaella": {
      "url": "https://api.anaella.com/mcp",
      "headers": { "Authorization": "Bearer ana_..." }
    }
  }
}
```

Create API keys in the Anaella app under **Settings > API keys**. Or tell any agent
"set up https://anaella.com/SKILL.md" and it configures itself.

## What's included

**MCP server** `anaella`: `find`, `explain`, `do` and `job` for every Anaella capability, plus
`list_channels` and `create_connect_link`.

**Skills:**

| Skill | What it does |
|-------|--------------|
| `anaella` | How to use find → explain → do, connected accounts, errors, and the rules for writes |
| `seo-report` | SEO report from Search Console + GA4 (quick wins, drops, index coverage) and Bing Webmaster Tools, keyword research, competitors, backlinks, site technical audit, AI visibility and readiness, with a diagnose → choose → act method |
| `ads-report` | Google and Meta ads account audit (scored controls and grade); Meta and Google Ads spend, results and cost per result by campaign; anomalies, kill or scale verdicts per campaign, wasted search spend and negatives; competitors' Meta ads from the Ad Library; paid search terms that already rank organically; applies the agreed fixes (negatives, pauses, budgets, bidding, keywords, ad copy) after a yes |
| `review-replies` | Drafts Google review replies, posts only the ones you approve |
| `comment-replies` | Reads comments on your published posts, drafts replies, posts or queues the approved ones, hides spam |
| `meeting-scheduler` | Finds free time and books a Google or Outlook event (invites only on request) |
| `inbox-triage` | Summarizes unread mail (Gmail, Outlook, IMAP) and saves reply drafts for you to send |
| `social-publish` | Drafts per-network posts and schedules them after approval |
| `payments-followup` | Unpaid Stripe or PayPal invoices, reminders, payment requests and refunds, each confirmed first |
| `slack-digest` | Summarizes channels and open questions, posts approved updates or thread replies |
| `lead-research` | Company profiles from a domain, local business prospects, and the owners behind them on LinkedIn |
| `document-from-template` | Copies a Docs template and fills its placeholders, writes Docs from Markdown, shares on request |
| `phone-calls` | Texts from your number, AI calls that book or ask and report back, an AI that answers and takes messages |
| `meeting-bot` | Sends Anaella's bot into a Google Meet, Zoom or Teams call, then summarizes the transcript by speaker; in Meet it can talk for your agent |
| `n8n-ops` | Finds failed n8n runs, explains why, retries them; runs and edits workflows and data tables |
| `content-to-video` | Repurposes an article, video or document into posts, makes narrated short videos (stock, own visuals, stories), captions, text overlays, voice-overs, voice clones and transcripts |
| `advisory-council` | Puts a decision before simulated founders and marketers (Musk, Bezos, Hormozi, Ogilvy…), grounded in your own numbers: each take, where they disagree, a recommendation |
| `alerts-automations` | Watches for new items and automations on a schedule or trigger, writes held for approval |

Skills that write (replies, emails, events, posts) always show you the exact content first and
prefer the reversible option: mail drafts, events without invitations, scheduled posts.

## Accounts

Connect accounts in the Anaella app under **Channels**, or let the agent create a connect link
when a tool needs one.

## Privacy

[Privacy policy](https://anaella.com/privacy-policy) · [Terms](https://anaella.com/terms-of-service)
