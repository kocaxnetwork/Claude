# KocaX Buddy — Active Users Widget

Drop-in widget for the KocaExpress Next.js 15 website. It shows the aggregated
number of Buddy users active within the last five minutes and refreshes every
30 seconds.

It does not contain a made-up fallback number. If real presence data cannot be
reached, the widget clearly reports that live activity is unavailable.

## Install

1. Copy `components/BuddyActiveCounter.tsx` and
   `components/BuddyActiveCounter.module.css` into the website's component
   directory.
2. Copy `app/api/buddy/active-count/route.ts` into the same path in the
   Next.js App Router project.
3. Add the widget to the KocaExpress homepage or `/buddy` page:

```tsx
import BuddyActiveCounter from "@/components/BuddyActiveCounter";

export default function BuddyPage() {
  return (
    <main>
      {/* Existing Buddy page content */}
      <BuddyActiveCounter />
    </main>
  );
}
```

## Connect real Buddy activity

Configure these server-side environment variables in the deployment:

```dotenv
BUDDY_PRESENCE_API_URL=https://your-buddy-backend.example/internal/presence/count
BUDDY_PRESENCE_API_TOKEN=replace-with-a-server-only-token
```

The upstream endpoint should count distinct authenticated Buddy users whose
last activity occurred within the requested `windowMinutes` query parameter.
It may return any one of these numeric fields:

```json
{ "active": 42, "updatedAt": "2026-08-13T21:30:00.000Z" }
```

`activeUsers` or `count` are also accepted. Never return names, user IDs,
emails, IP addresses, session IDs, or other personal data to the public route.

## Public API contract

The widget expects `GET /api/buddy/active-count` to return:

```json
{
  "active": 42,
  "windowMinutes": 5,
  "updatedAt": "2026-08-13T21:30:00.000Z"
}
```

## Behaviour

- English copy: `42 Buddy users active now`.
- A user is active when authenticated Buddy activity occurred in the last five
  minutes.
- Polls every 30 seconds and refreshes when the browser tab becomes visible.
- Polling pauses while the tab is hidden.
- Uses an aggregated count only.
- Loading, stale, and unavailable states are explicit.
- Mobile responsive, keyboard-safe, screen-reader announced, and respects
  reduced-motion settings.

## Optional configuration

```tsx
<BuddyActiveCounter
  endpoint="/api/buddy/active-count"
  pollingIntervalMs={30_000}
  className="homepageBuddyCounter"
/>
```

Polling intervals below 15 seconds are automatically clamped to protect the
Buddy backend.
