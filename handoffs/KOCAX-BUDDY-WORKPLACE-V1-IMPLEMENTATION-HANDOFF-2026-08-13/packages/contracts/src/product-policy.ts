import { z } from "zod";

export const BuddyDefaultPolicySchema = z
  .object({
    operatingMode: z.literal("guided"),
    memoryDefault: z.literal("session_only"),
    onboardingChannel: z.literal("kocax"),
    externalActions: z.literal("locked"),
    notifications: z.literal("off")
  })
  .strict();

export const BUDDY_DEFAULT_POLICY = BuddyDefaultPolicySchema.parse({
  operatingMode: "guided",
  memoryDefault: "session_only",
  onboardingChannel: "kocax",
  externalActions: "locked",
  notifications: "off"
});

export type BuddyDefaultPolicy = z.infer<typeof BuddyDefaultPolicySchema>;
