import type { BuddyAvatarProfile } from "./avatar.js";
import type { MemoryRecord } from "./memory.js";
import type { Connection } from "./channels.js";

export type BuddyPassport = {
  schema: "kx.buddy.passport.v1";
  exportedAt: string;
  avatar: BuddyAvatarProfile;
  memories: Array<Pick<MemoryRecord, "memoryId" | "category" | "scope" | "value" | "reason" | "createdAt" | "updatedAt">>;
  connections: Array<Pick<Connection, "provider" | "status" | "scopes">>;
  excluded: ["oauth_tokens", "api_keys", "passwords", "encryption_keys", "provider_secrets"];
};

export function createBuddyPassport(
  avatar: BuddyAvatarProfile,
  memories: readonly MemoryRecord[],
  connections: readonly Connection[]
): BuddyPassport {
  const now = Date.now();
  return {
    schema: "kx.buddy.passport.v1",
    exportedAt: new Date().toISOString(),
    avatar,
    memories: memories
      .filter(
        (memory) =>
          memory.scope !== "session_only" &&
          memory.status !== "deleted" &&
          memory.status !== "expired" &&
          (!memory.consent.expiresAt || new Date(memory.consent.expiresAt).getTime() > now)
      )
      .map(({ memoryId, category, scope, value, reason, createdAt, updatedAt }) => ({
        memoryId,
        category,
        scope,
        value,
        reason,
        createdAt,
        updatedAt
      })),
    connections: connections.map(({ provider, status, scopes }) => ({ provider, status, scopes })),
    excluded: ["oauth_tokens", "api_keys", "passwords", "encryption_keys", "provider_secrets"]
  };
}
