# Booking partner logos

Official wordmarks for the three booking sites the resort is listed on, used in the
"Book Now" modal (`src/components/site/BookingModal.tsx`).

| File | Owner |
|---|---|
| `booking.svg` | Booking.com — Booking.com B.V. |
| `agoda.svg` | Agoda — Agoda Company Pte. Ltd. |
| `tripadvisor.svg` | Tripadvisor — Tripadvisor LLC |

Sourced from Wikimedia Commons and **self-hosted** rather than hotlinked, so they work
offline, survive a static build, and don't leak a request to a third party.

## Why using these is fine

These are registered trademarks of their owners. They are shown **solely to identify the
site each link actually goes to** — the resort has a genuine listing on all three. That is
nominative use, and it's what every hotel's "book with" widget does.

What would *not* be fine, and is not done here:

- Altering the logos (recolouring, restyling, cropping the mark)
- Implying Booking.com / Agoda / Tripadvisor endorse or sponsor the resort
- Using them on a page that doesn't link to the corresponding listing

Keep the logos unmodified and keep each one attached to its real link.

If any partner asks for their official brand kit to be used instead, drop the replacement
over the same filename — `BookingModal.tsx` reads the paths from one array.
