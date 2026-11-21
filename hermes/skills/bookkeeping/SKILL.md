---
name: bookkeeping
description: Keep the business's books with Anaella — bring in Stripe and PayPal sales and Google or Meta ad spend, import bank or card statements, record receipts and bills, categorize everything, and answer "how much did we make or spend" with an exact profit and loss. Use when the user asks about revenue, expenses, profit, margins, cash flow, receipts, a bank statement, bookkeeping or "where did the money go".
---

# Bookkeeping with Anaella

Read the `anaella` skill first. The books are private (nothing is sent to anyone), but they are
the user's financial record: say what you will record before a large import, and never invent an
amount, date or category you didn't read.

Every number you give comes from `finance.report`. Never add up entries yourself, never convert
currencies, and say which period and currency each figure is for.

1. **Bring the books up to date.** `list_accounts` shows what is connected.
   - Each Stripe, PayPal or PI-SPI account: `finance.payments.sync` (`accountId`, `since`,
     default 90 days). Sales come in as income, category `sales`. Fees, refunds and payouts are
     not included.
   - Each Google Ads or Meta ads account: `finance.adspend.sync` (`from`, `to`). One expense a
     day, category `advertising`. Running it again updates revised days instead of adding them.
   - Both syncs are safe to repeat.
2. **Statements.** For a bank or card statement (CSV or PDF in email, Drive or the library),
   read it with `email.attachment.read`, `drive.file.read` or `document.to_markdown`, then send
   every line to `finance.entries.import` (up to 500 at once).
   - Money in is `income` and money out is `expense`.
   - A line that only moves money between the business's own accounts is `transfer`: a Stripe or
     PayPal payout, paying the company card, a charge from Google or Meta when its ad spend is
     already synced. This keeps it from being counted twice.
   - Re-importing the same statement adds nothing.
3. **Receipts and bills.** Find them with `email.messages.list` (for example "receipt",
   "invoice", "facture"), read the amount, date, currency and seller, and record each with
   `finance.entry.create`, passing the receipt or invoice number as `reference` so it is never
   recorded twice.
4. **Categorize.** `finance.entries.list` with `uncategorized: true`, then
   `finance.entry.update` with one short lower-case category per entry.
   - Reuse the categories `finance.report` already shows, for example `sales`, `advertising`,
     `software`, `rent`, `payroll`, `fees`, `travel`, `taxes`, `refunds`.
   - Ask the user when a line is ambiguous rather than guessing.
5. **Report.** `finance.report` (`from`, `to`, default this month) gives income, expenses, net,
   transfers and each category, per currency. Lead with net, then the largest categories, then
   what changed from the previous period (run the report for both). Mention `uncategorized` if
   it is not zero.

Corrections go through `finance.entry.update`. Delete with `finance.entry.delete` only what was
recorded by mistake: an entry synced from Stripe, PayPal or an ads account comes back on the next
sync, so mark it `transfer` instead.

Not covered yet: taxes and VAT returns, invoices to customers (use the `payments-followup` skill),
live bank connections (statements only), and currency conversion.
