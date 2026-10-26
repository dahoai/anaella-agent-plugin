---
name: payments-followup
description: Chase and collect payments on the user's own Stripe or PayPal account through Anaella — list unpaid invoices, send reminders, ask someone to pay, look up a customer's payments, and refund. Use when the user asks who owes them money, to invoice or bill someone, to send a payment link or reminder, or to refund a charge.
---

# Payments follow-up with Anaella

Read the `anaella` skill first. This is real money on the user's account: every write needs the
exact amount, currency and payer shown and an explicit yes.

1. **Which account.** `find` "invoices" tells you whether Stripe, PayPal or both are connected
   (`available`). With both, ask which one; never pick.
2. **Who owes what.** Stripe: `stripe.invoices.list` with `status: "open"` (or `customer`).
   PayPal: `paypal.invoices.list` with `status: "SENT"`. List each: customer, amount, currency,
   due date, days overdue. Sort the most overdue first.
3. **Remind.** PayPal: `paypal.invoice.remind` (`invoiceId`, optional short `note`). Stripe:
   `stripe.invoice.send` emails the open invoice again. Show the list of who gets a reminder first.
4. **Ask someone to pay.** `payments.request.create` (`payer` email, `amount` in the currency's
   units such as 490 for $490, `currency`, `reason` up to 140 characters, `dueDays`, default 7)
   emails an invoice through the connected provider and returns `payUrl`. For a reusable link,
   `stripe.link.create` or `paypal.order.create`.
5. **Look up a customer.** `stripe.customers.list` (email) then `stripe.payments.list`;
   PayPal `paypal.transactions.list` over the last N days.
6. **Refund** only on the user's explicit request: `stripe.refund.create` or
   `paypal.refund.create`, full or partial. Confirm the payment, amount and reason first; refunds
   cannot be undone.

Never cancel subscriptions, void invoices or answer disputes unless the user asked for that exact
action. Payment and customer details are private: quote only what the user needs.
