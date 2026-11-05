# Anaella for Hermes

Connects [Hermes Agent](https://hermes-agent.nousresearch.com) to [Anaella](https://anaella.com):
one MCP server for the accounts you use every day (Gmail, Outlook or any IMAP mailbox, Google and
Outlook calendars, Drive, Docs and Sheets, Slack, Search Console, Google Analytics, Meta and Google
Ads, Business Profile reviews, Stripe, PayPal, n8n, a phone number, a meeting bot and 9 social
networks), plus workflow skills for reports, replies, scheduling, publishing and research.

This folder is the Hermes build of the [Anaella agent plugin](https://github.com/dahoai/anaella-agent-plugin):
an [Agent Plugins v1](https://agent-plugins.org/specification) package (`plugin.json`, `mcp.json`
and `skills/`), no Python, no hooks. The skills are the same as the plugin's for Claude Code, Codex
and Antigravity; only the MCP server differs, running locally with your API key.

## Install

1. Create an API key in Anaella: **Organization → API keys** at
   [anaella.com](https://anaella.com/organizations/api-keys). It starts with `ana_`.
2. Add it to your Hermes profile's `.env` (`~/.hermes/.env`):

   ```
   ANAELLA_API_KEY=ana_...
   ```

3. Install and enable the plugin:

   ```
   hermes plugins install anaella
   hermes plugins enable anaella
   ```

The MCP server runs locally with `npx -y @anaella/mcp@0.12.0`, so Node.js 20 or later and npm are
needed. The key works in chat, cron jobs and the messaging gateway alike: there is no browser
sign-in.

Connect the accounts you want Anaella to use (Gmail, Slack, social networks…) at
[anaella.com](https://anaella.com/channels). If one is missing, the agent gets a connect link to
send you.

## What it gives Hermes

Eight MCP tools: `find`, `explain` and `do` cover the whole Anaella catalog (about 180
capabilities), plus `job`, `list_channels`, `create_connect_link`, `connect_account` and
`remove_account`. Skills are loaded on demand as `anaella:<skill>`:

| Skill | What it does |
|-------|--------------|
| `anaella` | How to use find, explain and do, connected accounts, errors, and the rules for writes |
| `inbox-triage` | Summarizes unread mail and saves reply drafts for you to send |
| `meeting-scheduler` | Finds free time and books a Google or Outlook event |
| `social-publish` | Drafts per-network posts and schedules them after approval |
| `comment-replies` | Reads comments on your posts, drafts replies, posts the approved ones |
| `comment-mining` | Turns the comments on your posts into audience research and content ideas |
| `post-outliers` | Finds your posts that beat or missed your usual results and explains why |
| `seo-report` | Search Console, Analytics and Bing report, keywords, audits |
| `ads-report` | Google and Meta ads audit, spend and verdicts, approved changes |
| `research` | Answers a question from the web with every claim linked to its source |
| `lead-research` | Company profiles and local business prospects |
| `marketing` | Brief, research, plan, content, publishing and a performance report |

And more: review replies, payments follow-up, Slack digests, documents and e-signatures, form
filling, phone calls, the meeting bot, n8n, videos and automations.

## What to know before installing

- **Network calls.** Every tool call goes to `https://api.anaella.com` with your API key. The
  server is started with `npx`, which downloads the pinned `@anaella/mcp` package from npm.
- **It acts in your name.** Anaella can send email and texts, place AI phone calls, post to your
  social accounts, edit sheets, share files, change ad campaigns, and send invoices or refunds on
  the accounts you connected. The skills tell the agent to show the exact content and get your yes
  before every write; Hermes does not enforce that. Some tools cost money from your Anaella
  wallet (each tool states its price; paid calls stop at your daily spending limit).
- **Credentials.** The plugin stores nothing. Hermes passes `ANAELLA_API_KEY` from your profile
  to the local server; delete the key in Anaella to revoke it.
- **No telemetry**, no background process beyond the MCP server Hermes starts, no files written
  outside Hermes's own directories.

## Support

[anaella.com](https://anaella.com) · support@anaella.com
