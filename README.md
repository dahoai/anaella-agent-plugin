# Anaella plugin for Claude Code

Connects Claude Code to [Anaella](https://anaella.com): one API for agents, with typed tools
and the accounts you connect (Search Console, Google Analytics, Meta Ads, Google Ads,
Business Profile, Google or Outlook calendars, Gmail, Outlook or any IMAP mailbox, and 9 social
networks).

## Install

```
/plugin marketplace add dahoai/anaella-plugin
/plugin install anaella@anaella
```

Then run `/mcp`, pick **anaella** and sign in with your Anaella account (OAuth). Claude Code
stores and refreshes the token.

### Using an API key instead of OAuth

For CI or headless use, add the server yourself with an `ana_` key from
**Settings > API keys** in the Anaella app:

```
claude mcp add --transport http anaella-key https://api.anaella.com/mcp \
  --header "Authorization: Bearer $ANAELLA_API_KEY"
```

A configured `Authorization` header turns OAuth off for that server, which is why the
plugin's own server has none.

## What's included

**MCP server** `anaella` (`https://api.anaella.com/mcp`): `find`, `explain`, `do` and `job`
for every Anaella capability (email, calendars, Sheets, Drive and Docs, Slack, SEO, ads, reviews, social posting,
media…), plus `list_channels` and `create_connect_link`.

**Skills** (Claude loads them when relevant, or run them as `/anaella:<name>`):

| Skill | What it does |
|-------|--------------|
| `anaella` | How to use find → explain → do, connected accounts, errors, and the rules for writes |
| `seo-report` | Search Console + GA4 report with concrete actions |
| `ads-report` | Meta and Google Ads spend, results and cost per result by campaign |
| `review-replies` | Drafts Google review replies, posts only the ones you approve |
| `comment-replies` | Reads comments on your published posts, drafts replies, posts or queues the approved ones, hides spam |
| `meeting-scheduler` | Finds free time and books a Google or Outlook event (invites only on request) |
| `inbox-triage` | Summarizes unread mail (Gmail, Outlook, IMAP) and saves reply drafts for you to send |
| `social-publish` | Drafts per-network posts and schedules them after approval |

Skills that write (replies, emails, events, posts) always show you the exact content first
and prefer the reversible option: mail drafts, events without invitations, scheduled posts.

## Accounts

Connect accounts in the Anaella app under **Channels**, or let Claude create a connect link
when a tool needs one. Tools that need an account you haven't connected say so and return
the link.

## Develop

```
claude plugin validate ./plugins/anaella
claude plugin validate ./
claude plugin marketplace add ./ && claude plugin install anaella@anaella
```

Bump `version` in `.claude-plugin/plugin.json` on every release: installed users stay on
the version they have until it changes.
