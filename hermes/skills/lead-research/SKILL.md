---
name: lead-research
description: Research companies and build a list of local business prospects through Anaella — company profiles from a domain, businesses by type and city with their phone, website and published email, and the owners or managers behind them on LinkedIn. Use when the user wants leads, prospects, a list of businesses to contact, or to research a company before a call.
---

# Lead research with Anaella

Read the `anaella` skill first.

1. **One company.** `company.research` with its `domain` (e.g. `acme.com`): description,
   industry, size, headquarters, phone, social profiles and the emails published on its site.
   Null fields are unknown, not absent.
2. **A list of businesses.** `prospects.search` first, with `type` ("dentist", "plumber"),
   `place` (a city such as "Montréal, QC", or a province code) and filters (`hasPhone`,
   `hasWebsite`, `minRating`, `minReviews`); `limit` up to 100, page with `offset`. It is
   instant and mostly covers Canada.
3. **Too few?** `prospects.discover` (`query`, `place`, `max` up to 60) reads public map
   listings and the businesses' own sites. It takes a few minutes (async: pass `wait` or poll
   `job`) and is limited to 10 per workspace per day, so ask before running it.
4. **The people.** `prospects.people` with a business id (and `roles` such as `["dentist"]`)
   returns owners and managers with their LinkedIn profile link. There are no personal emails
   or phone numbers, and Anaella cannot message on LinkedIn: the user reaches out there.
5. **Hand it over** as a table, or append it to a sheet with `sheets.append` (`rows` as objects
   keyed by the sheet's column names) when the user names one.

Emails returned are the role addresses businesses publish (info@…), never guessed. Remind the
user that cold outreach must follow anti-spam law (CASL in Canada, CAN-SPAM, GDPR).
