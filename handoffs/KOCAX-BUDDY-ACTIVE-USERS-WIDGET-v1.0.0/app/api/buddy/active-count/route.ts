import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const WINDOW_MINUTES = 5;
const UPSTREAM_TIMEOUT_MS = 5_000;

const responseHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
};

type UpstreamPayload = {
  active?: unknown;
  activeUsers?: unknown;
  count?: unknown;
  updatedAt?: unknown;
};

export async function GET() {
  const upstreamUrl = process.env.BUDDY_PRESENCE_API_URL;
  const upstreamToken = process.env.BUDDY_PRESENCE_API_TOKEN;

  if (!upstreamUrl) {
    return NextResponse.json(
      { error: "PRESENCE_NOT_CONFIGURED" },
      { status: 503, headers: responseHeaders },
    );
  }

  try {
    const url = new URL(upstreamUrl);
    if (!url.searchParams.has("windowMinutes")) {
      url.searchParams.set("windowMinutes", String(WINDOW_MINUTES));
    }

    const headers: HeadersInit = { Accept: "application/json" };
    if (upstreamToken) headers.Authorization = `Bearer ${upstreamToken}`;

    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`Presence upstream returned ${response.status}`);
    }

    const payload = (await response.json()) as UpstreamPayload;
    const rawCount = payload.active ?? payload.activeUsers ?? payload.count;

    if (
      typeof rawCount !== "number" ||
      !Number.isFinite(rawCount) ||
      rawCount < 0
    ) {
      throw new Error("Presence upstream returned an invalid count");
    }

    return NextResponse.json(
      {
        active: Math.floor(rawCount),
        windowMinutes: WINDOW_MINUTES,
        updatedAt:
          typeof payload.updatedAt === "string"
            ? payload.updatedAt
            : new Date().toISOString(),
      },
      { status: 200, headers: responseHeaders },
    );
  } catch {
    return NextResponse.json(
      { error: "PRESENCE_UNAVAILABLE" },
      { status: 503, headers: responseHeaders },
    );
  }
}
