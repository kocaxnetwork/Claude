"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./BuddyActiveCounter.module.css";

type CounterStatus = "loading" | "live" | "stale" | "unavailable";

type ActiveCountPayload = {
  active: number;
  windowMinutes?: number;
  updatedAt?: string;
};

export type BuddyActiveCounterProps = {
  /** Aggregated presence endpoint. It must never return user identities. */
  endpoint?: string;
  /** Polling is clamped to a minimum of 15 seconds. */
  pollingIntervalMs?: number;
  className?: string;
};

const DEFAULT_ENDPOINT = "/api/buddy/active-count";
const DEFAULT_POLLING_INTERVAL = 30_000;
const MINIMUM_POLLING_INTERVAL = 15_000;

function normalizePayload(value: unknown): ActiveCountPayload {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid presence response");
  }

  const payload = value as Partial<ActiveCountPayload>;
  if (
    typeof payload.active !== "number" ||
    !Number.isFinite(payload.active) ||
    payload.active < 0
  ) {
    throw new Error("Invalid active-user count");
  }

  return {
    active: Math.floor(payload.active),
    windowMinutes:
      typeof payload.windowMinutes === "number" &&
      Number.isFinite(payload.windowMinutes) &&
      payload.windowMinutes > 0
        ? Math.floor(payload.windowMinutes)
        : 5,
    updatedAt:
      typeof payload.updatedAt === "string"
        ? payload.updatedAt
        : new Date().toISOString(),
  };
}

export default function BuddyActiveCounter({
  endpoint = DEFAULT_ENDPOINT,
  pollingIntervalMs = DEFAULT_POLLING_INTERVAL,
  className = "",
}: BuddyActiveCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [windowMinutes, setWindowMinutes] = useState(5);
  const [status, setStatus] = useState<CounterStatus>("loading");
  const hasLoadedRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);

  const requestedInterval =
    Number.isFinite(pollingIntervalMs) && pollingIntervalMs > 0
      ? pollingIntervalMs
      : DEFAULT_POLLING_INTERVAL;
  const interval = Math.max(MINIMUM_POLLING_INTERVAL, requestedInterval);

  const refresh = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Presence request failed (${response.status})`);
      }

      const payload = normalizePayload(await response.json());
      setCount(payload.active);
      setWindowMinutes(payload.windowMinutes ?? 5);
      setStatus("live");
      hasLoadedRef.current = true;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus(hasLoadedRef.current ? "stale" : "unavailable");
    }
  }, [endpoint]);

  useEffect(() => {
    void refresh();

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, interval);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") void refresh();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      controllerRef.current?.abort();
    };
  }, [interval, refresh]);

  const formattedCount = useMemo(
    () => (count === null ? null : new Intl.NumberFormat("en").format(count)),
    [count],
  );

  const activityLabel =
    count === 1 ? "Buddy user active now" : "Buddy users active now";

  const rootClassName = [styles.counter, className].filter(Boolean).join(" ");

  return (
    <section className={rootClassName} aria-label="Buddy live activity">
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.header}>
        <span
          className={`${styles.statusDot} ${styles[status]}`}
          aria-hidden="true"
        />
        <span className={styles.eyebrow}>Buddy network</span>
        <span className={styles.liveBadge}>
          {status === "live" ? "Live" : status === "loading" ? "Connecting" : "Status"}
        </span>
      </header>

      <div className={styles.body} aria-live="polite" aria-atomic="true">
        {status === "loading" ? (
          <>
            <span className={styles.skeleton} aria-hidden="true" />
            <span className={styles.loadingText}>Checking Buddy activity…</span>
          </>
        ) : formattedCount !== null ? (
          <>
            <div className={styles.metricRow}>
              <strong className={styles.count}>{formattedCount}</strong>
              <span className={styles.label}>
                {status === "live"
                  ? activityLabel
                  : "Buddy users recently active"}
              </span>
            </div>
            <p className={styles.detail}>
              {status === "live"
                ? `Active within the last ${windowMinutes} minutes`
                : "Live refresh temporarily unavailable"}
            </p>
          </>
        ) : (
          <>
            <strong className={styles.unavailableTitle}>
              Live activity unavailable
            </strong>
            <p className={styles.detail}>Buddy is reconnecting automatically.</p>
          </>
        )}
      </div>
    </section>
  );
}
