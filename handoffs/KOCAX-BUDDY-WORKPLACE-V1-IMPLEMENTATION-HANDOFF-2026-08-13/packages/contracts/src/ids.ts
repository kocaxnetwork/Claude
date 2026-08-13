import { z } from "zod";

const createIdSchema = (prefix: string) =>
  z.string().regex(new RegExp(`^${prefix}_[A-Za-z0-9]{8,64}$`), `Expected a ${prefix}_ identifier`);

export const UserIdSchema = createIdSchema("usr");
export const BuddyIdSchema = createIdSchema("bdy");
export const WorkspaceIdSchema = createIdSchema("wsp");
export const MemoryIdSchema = createIdSchema("mem");
export const ActionIdSchema = createIdSchema("act");
export const ApprovalIdSchema = createIdSchema("apr");
export const ReceiptIdSchema = createIdSchema("rcp");
export const ConnectionIdSchema = createIdSchema("con");
export const TaskIdSchema = createIdSchema("tsk");

export type UserId = z.infer<typeof UserIdSchema>;
export type BuddyId = z.infer<typeof BuddyIdSchema>;
export type WorkspaceId = z.infer<typeof WorkspaceIdSchema>;
export type MemoryId = z.infer<typeof MemoryIdSchema>;
export type ActionId = z.infer<typeof ActionIdSchema>;
export type ApprovalId = z.infer<typeof ApprovalIdSchema>;
export type ReceiptId = z.infer<typeof ReceiptIdSchema>;
export type ConnectionId = z.infer<typeof ConnectionIdSchema>;
export type TaskId = z.infer<typeof TaskIdSchema>;

