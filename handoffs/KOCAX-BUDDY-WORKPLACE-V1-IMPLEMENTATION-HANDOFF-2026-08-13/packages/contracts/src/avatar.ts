import { z } from "zod";
import { BuddyIdSchema } from "./ids.js";

export const BuddyVisualStateSchema = z.enum([
  "idle",
  "listening",
  "thinking",
  "working",
  "speaking",
  "completed",
  "needs_attention",
  "offline",
  "privacy_locked"
]);

export const BuddyVisualEventSchema = z
  .object({
    state: BuddyVisualStateSchema,
    intensity: z.number().min(0).max(1).optional(),
    viseme: z.enum(["rest", "aa", "ee", "oh", "mm"]).optional(),
    sequence: z.number().int().nonnegative(),
    expiresAt: z.number().int().positive().optional()
  })
  .strict();

export const WardrobeSlotSchema = z.enum(["hair", "headwear", "top", "outerwear", "trousers", "shoes", "accessory"]);

export const WardrobeItemSchema = z
  .object({
    itemId: z.string().regex(/^[a-z0-9][a-z0-9-]{2,80}$/),
    localizedName: z.record(z.string().min(2).max(5), z.string().min(1).max(80)),
    slot: WardrobeSlotSchema,
    rigVersion: z.literal("buddy-rig-1"),
    assetPackVersion: z.string().regex(/^pack-[0-9]+$/),
    layerOrder: z.number().int().min(0).max(100),
    integritySha256: z.string().regex(/^[a-f0-9]{64}$/),
    rightsReference: z.string().min(3).max(120),
    releaseStatus: z.enum(["draft", "approved", "revoked"]),
    hidesSlots: z.array(WardrobeSlotSchema).max(4).default([]),
    minimumRigVersion: z.literal("buddy-rig-1")
  })
  .strict();

export const BuddyAvatarProfileSchema = z
  .object({
    schemaVersion: z.literal(1),
    buddyId: BuddyIdSchema,
    characterId: z.literal("buddy-v1"),
    displayName: z.string().trim().min(1).max(32),
    rigVersion: z.literal("buddy-rig-1"),
    catalogVersion: z.string().regex(/^catalog-[0-9]+$/),
    equipped: z.record(WardrobeSlotSchema, z.string().regex(/^[a-z0-9][a-z0-9-]{2,80}$/).nullable()),
    palette: z
      .object({
        accent: z.enum(["kx-gold", "kx-blue", "kx-ocean"]),
        secondary: z.enum(["kx-blue", "kx-ocean", "kx-silver"])
      })
      .strict(),
    preferences: z
      .object({
        reducedMotion: z.boolean(),
        idleMotion: z.boolean()
      })
      .strict(),
    updatedAt: z.string().datetime()
  })
  .strict();

export type BuddyVisualState = z.infer<typeof BuddyVisualStateSchema>;
export type BuddyVisualEvent = z.infer<typeof BuddyVisualEventSchema>;
export type WardrobeItem = z.infer<typeof WardrobeItemSchema>;
export type BuddyAvatarProfile = z.infer<typeof BuddyAvatarProfileSchema>;

export function equipItem(
  profile: BuddyAvatarProfile,
  item: WardrobeItem,
  catalog: readonly WardrobeItem[]
): BuddyAvatarProfile {
  // Treat caller data only as an identifier. Slot, compatibility and hiding
  // behavior always come from the canonical catalog record.
  const catalogItem = catalog.find((candidate) => candidate.itemId === item.itemId);
  if (!catalogItem) throw new Error("WARDROBE_ITEM_NOT_IN_CATALOG");
  if (catalogItem.releaseStatus !== "approved" || catalogItem.rigVersion !== profile.rigVersion) {
    throw new Error("WARDROBE_ITEM_NOT_EQUIPPABLE");
  }

  const equipped = { ...profile.equipped, [catalogItem.slot]: catalogItem.itemId };
  for (const hiddenSlot of catalogItem.hidesSlots) equipped[hiddenSlot] = null;

  return {
    ...profile,
    equipped,
    updatedAt: new Date().toISOString()
  };
}

export function safeVisualEvent(input: unknown): BuddyVisualEvent {
  return BuddyVisualEventSchema.parse(input);
}
