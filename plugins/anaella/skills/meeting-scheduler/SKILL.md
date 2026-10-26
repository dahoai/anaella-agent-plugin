---
name: meeting-scheduler
description: Find free time on the user's Google or Outlook calendar and book a meeting (optionally with a Google Meet or Teams link and invitations) through Anaella. Use when the user asks when they are free, to schedule or book a meeting, or to find a slot with someone.
---

# Scheduling with Anaella

Read the `anaella` skill first.

1. **Constraints.** Get the duration, the window (dates, working hours) and the time zone.
   If the user didn't give a time zone, ask, or use the one they mentioned before.
2. **Free time.** `calendar.availability` with `start` / `end` as RFC 3339 with an offset
   (`2026-10-14T09:00:00+02:00`), at most 62 days apart. Add colleagues' emails in
   `calendarIds` to find a common slot (it works when their free/busy is visible to the
   account; an `error` per calendar says when it isn't; on Outlook, other calendars are always
   people's emails). `free` lists the common gaps in UTC.
3. **Propose** 2-3 slots that fit the duration inside working hours, shown in the user's
   time zone. Let the user choose.
4. **Book** with `calendar.event.create`: `title`, `start`, `end`, `timeZone`, and
   `meet: true` if they want a video link. Add `attendees` if named.
   - Attendees are **not** emailed unless `notifyAttendees: true`. Set it only when the user
     asked to send invitations; say which addresses will be invited before you do.
   - **Outlook** always emails invitations to attendees, so there attendees need
     `notifyAttendees: true`. If the user only wants the slot blocked, leave `attendees` out.
     `meet: true` adds a Teams link on Outlook (work or school accounts only).
   - All-day events use `YYYY-MM-DD`, with `end` as the last day (inclusive).
5. Confirm with the event link (`htmlLink`) and the Meet or Teams link (`meetLink`) if any.
