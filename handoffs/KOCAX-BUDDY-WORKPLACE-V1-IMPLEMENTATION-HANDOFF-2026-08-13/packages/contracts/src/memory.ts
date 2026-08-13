import { z } from "zod";
import { BuddyIdSchema, MemoryIdSchema, UserIdSchema, WorkspaceIdSchema } from "./ids.js";
import { ChannelSchema } from "./channels.js";

export const MemoryCategorySchema = z.enum([
  "profile_fact",
  "preference",
  "routine",
  "project",
  "document_reference",
  "temporary_context",
  "sensitive"
]);

export const MemoryScopeSchema = z.enum(["personal", "channel_local", "session_only"]);
export const MemoryStatusSchema = z.enum(["active", "locked", "expired", "deleted"]);

export const MemoryConsentSchema = z
  .object({
    mode: z.enum(["explicit", "session_only"]),
    grantedBy: z.enum(["owner", "not_applicable"]),
    grantedAt: z.string().datetime().optional(),
    expiresAt: z.string().datetime().optional()
  })
  .strict();

export const MemoryRecordSchema = z
  .object({
    memoryId: MemoryIdSchema,
    ownerUserId: UserIdSchema,
    buddyId: BuddyIdSchema,
    workspaceId: WorkspaceIdSchema,
    category: MemoryCategorySchema,
    scope: MemoryScopeSchema,
    status: MemoryStatusSchema,
    value: z.string().min(1).max(2_000),
    reason: z.string().min(1).max(300),
    source: z
      .object({
        channel: ChannelSchema,
        sourceRef: z.string().min(1).max(180),
        ownerSelected: z.boolean()
      })
      .strict(),
    consent: MemoryConsentSchema,
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    lastUsedAt: z.string().datetime().optional()
  })
  .strict();

export type MemoryRecord = z.infer<typeof MemoryRecordSchema>;

export type MemoryDecision =
  | { allowed: true; normalizedScope: z.infer<typeof MemoryScopeSchema> }
  | {
      allowed: false;
      code:
        | "EXPLICIT_CONSENT_REQUIRED"
        | "INVALID_SESSION_CONSENT"
        | "SENSITIVE_AUTO_SAVE_DENIED"
        | "EXTERNAL_TRANSCRIPT_MUST_STAY_LOCAL";
    };

export function evaluateMemoryWrite(memory: MemoryRecord): MemoryDecision {
  if (memory.scope === "session_only") {
    if (memory.consent.mode !== "session_only" || memory.consent.grantedBy !== "not_applicable") {
      return { allowed: false, code: "INVALID_SESSION_CONSENT" };
    }
    return { allowed: true, normalizedScope: "session_only" };
  }

  if (memory.consent.mode !== "explicit" || memory.consent.grantedBy !== "owner" || !memory.consent.grantedAt) {
    return { allowed: false, code: "EXPLICIT_CONSENT_REQUIRED" };
  }

  if (memory.category === "sensitive" && !memory.source.ownerSelected) {
    return { allowed: false, code: "SENSITIVE_AUTO_SAVE_DENIED" };
  }

  if (memory.source.channel !== "kocax" && memory.scope === "personal" && !memory.source.ownerSelected) {
    return { allowed: false, code: "EXTERNAL_TRANSCRIPT_MUST_STAY_LOCAL" };
  }

  return { allowed: true, normalizedScope: memory.scope };
}
