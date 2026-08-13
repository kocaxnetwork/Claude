import { describe, expect, it } from "vitest";
import {
  BuddyAvatarProfileSchema,
  BuddyVisualEventSchema,
  MemoryRecordSchema,
  WardrobeItemSchema,
  equipItem,
  evaluateMemoryWrite
} from "../src";

const memoryBase = {
  memoryId: "mem_01KXPREF0001",
  ownerUserId: "usr_01KXOWNER001",
  buddyId: "bdy_01KXBUDDY001",
  workspaceId: "wsp_01KXPERSONAL01",
  category: "preference",
  scope: "personal",
  status: "active",
  value: "Prefers concise replies",
  reason: "User asked Buddy to remember this preference",
  source: { channel: "kocax", sourceRef: "msg_01KX001", ownerSelected: true },
  consent: { mode: "explicit", grantedBy: "owner", grantedAt: "2026-08-13T18:00:00.000Z" },
  createdAt: "2026-08-13T18:00:00.000Z",
  updatedAt: "2026-08-13T18:00:00.000Z"
} as const;

describe("memory consent", () => {
  it("allows an explicitly approved personal memory", () => {
    const memory = MemoryRecordSchema.parse(memoryBase);
    expect(evaluateMemoryWrite(memory)).toEqual({ allowed: true, normalizedScope: "personal" });
  });

  it("denies silent persistent memory", () => {
    const memory = MemoryRecordSchema.parse({
      ...memoryBase,
      consent: { mode: "session_only", grantedBy: "not_applicable" }
    });
    expect(evaluateMemoryWrite(memory)).toEqual({ allowed: false, code: "EXPLICIT_CONSENT_REQUIRED" });
  });

  it("requires session-only consent metadata for session memory", () => {
    const memory = MemoryRecordSchema.parse({ ...memoryBase, scope: "session_only" });
    expect(evaluateMemoryWrite(memory)).toEqual({ allowed: false, code: "INVALID_SESSION_CONSENT" });
  });

  it("denies automatic sensitive memory", () => {
    const memory = MemoryRecordSchema.parse({
      ...memoryBase,
      category: "sensitive",
      source: { ...memoryBase.source, ownerSelected: false }
    });
    expect(evaluateMemoryWrite(memory)).toEqual({ allowed: false, code: "SENSITIVE_AUTO_SAVE_DENIED" });
  });
});

describe("renderer-safe avatar contracts", () => {
  const profile = BuddyAvatarProfileSchema.parse({
    schemaVersion: 1,
    buddyId: "bdy_01KXBUDDY001",
    characterId: "buddy-v1",
    displayName: "Buddy",
    rigVersion: "buddy-rig-1",
    catalogVersion: "catalog-1",
    equipped: { hair: "hair-short-01", headwear: null, top: "top-core-01", outerwear: null, trousers: "trousers-core-01", shoes: "shoes-core-01", accessory: null },
    palette: { accent: "kx-gold", secondary: "kx-blue" },
    preferences: { reducedMotion: false, idleMotion: true },
    updatedAt: "2026-08-13T18:00:00.000Z"
  });

  const hat = WardrobeItemSchema.parse({
    itemId: "headwear-cap-blue-01",
    localizedName: { nl: "Blauwe pet", en: "Blue cap" },
    slot: "headwear",
    rigVersion: "buddy-rig-1",
    assetPackVersion: "pack-1",
    layerOrder: 50,
    integritySha256: "c".repeat(64),
    rightsReference: "KX-ASSET-REGISTER-001",
    releaseStatus: "approved",
    hidesSlots: ["hair"],
    minimumRigVersion: "buddy-rig-1"
  });

  it("applies deterministic compatibility rules", () => {
    const updated = equipItem(profile, hat, [hat]);
    expect(updated.equipped.headwear).toBe(hat.itemId);
    expect(updated.equipped.hair).toBeNull();
  });

  it("uses canonical catalog metadata for a same-ID caller substitution", () => {
    const substituted = WardrobeItemSchema.parse({ ...hat, slot: "accessory", hidesSlots: [] });
    const updated = equipItem(profile, substituted, [hat]);
    expect(updated.equipped.headwear).toBe(hat.itemId);
    expect(updated.equipped.accessory).toBeNull();
    expect(updated.equipped.hair).toBeNull();
  });

  it("rejects private or arbitrary renderer fields", () => {
    expect(() =>
      BuddyVisualEventSchema.parse({ state: "thinking", sequence: 1, messageText: "private content" })
    ).toThrow();
  });

  it("bounds renderer intensity", () => {
    expect(() => BuddyVisualEventSchema.parse({ state: "working", intensity: 1.2, sequence: 2 })).toThrow();
  });
});
