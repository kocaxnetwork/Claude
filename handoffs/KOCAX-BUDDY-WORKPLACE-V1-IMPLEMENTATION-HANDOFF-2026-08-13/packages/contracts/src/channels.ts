import { z } from "zod";
import { BuddyIdSchema, ConnectionIdSchema, WorkspaceIdSchema } from "./ids.js";

export const ChannelSchema = z.enum(["kocax", "whatsapp", "telegram", "discord"]);
export type Channel = z.infer<typeof ChannelSchema>;

export const ConnectionStatusSchema = z.enum(["disabled", "pending", "active", "revoked", "error"]);

export const ConnectionSchema = z
  .object({
    connectionId: ConnectionIdSchema,
    buddyId: BuddyIdSchema,
    workspaceId: WorkspaceIdSchema,
    provider: ChannelSchema,
    status: ConnectionStatusSchema,
    scopes: z.array(z.enum(["buddy:chat", "notifications:receive", "files:limited"])).max(3),
    externalPrincipalRef: z.string().min(8).max(180).optional(),
    connectedAt: z.string().datetime().optional(),
    revokedAt: z.string().datetime().optional()
  })
  .strict();

export type Connection = z.infer<typeof ConnectionSchema>;

export type ChannelCapability =
  | "chat"
  | "memory_manage"
  | "wardrobe_manage"
  | "permissions_manage"
  | "devices_manage"
  | "billing_manage"
  | "approve_r2_r3"
  | "receive_notification";

const nativeCapabilities = new Set<ChannelCapability>([
  "chat",
  "memory_manage",
  "wardrobe_manage",
  "permissions_manage",
  "devices_manage",
  "billing_manage",
  "approve_r2_r3",
  "receive_notification"
]);

const bridgeCapabilities = new Set<ChannelCapability>(["chat", "receive_notification"]);

export function channelCan(channel: Channel, capability: ChannelCapability): boolean {
  return (channel === "kocax" ? nativeCapabilities : bridgeCapabilities).has(capability);
}

export function assertChannelCapability(channel: Channel, capability: ChannelCapability): void {
  if (!channelCan(channel, capability)) {
    throw new Error(`CHANNEL_CAPABILITY_DENIED:${channel}:${capability}`);
  }
}
