import { z } from "zod";
import { ActionIdSchema, ApprovalIdSchema, ReceiptIdSchema, UserIdSchema, WorkspaceIdSchema } from "./ids.js";
import { ChannelSchema, channelCan } from "./channels.js";

export const RiskLevelSchema = z.enum(["R0", "R1", "R2", "R3"]);
export const ActionStatusSchema = z.enum(["proposed", "awaiting_approval", "approved", "rejected", "expired", "executed", "failed"]);

export const ActionProposalSchema = z
  .object({
    actionId: ActionIdSchema,
    workspaceId: WorkspaceIdSchema,
    actionType: z.string().regex(/^[a-z][a-z0-9_.:-]{2,80}$/),
    risk: RiskLevelSchema,
    status: ActionStatusSchema,
    target: z.string().min(1).max(240),
    summary: z.string().min(1).max(500),
    payloadDigest: z.string().regex(/^[a-f0-9]{64}$/),
    approvalNonceDigest: z.string().regex(/^[a-f0-9]{64}$/),
    idempotencyKey: z.string().min(16).max(128),
    environment: z.enum(["preview", "production"]),
    reversible: z.boolean(),
    expiresAt: z.string().datetime(),
    createdAt: z.string().datetime()
  })
  .strict();

export const ApprovalSchema = z
  .object({
    approvalId: ApprovalIdSchema,
    actionId: ActionIdSchema,
    workspaceId: WorkspaceIdSchema,
    actionType: z.string(),
    target: z.string(),
    payloadDigest: z.string().regex(/^[a-f0-9]{64}$/),
    environment: z.enum(["preview", "production"]),
    approvingUserId: UserIdSchema,
    channel: ChannelSchema,
    surface: z.enum(["workplace", "messenger", "external_bridge"]),
    nonceDigest: z.string().regex(/^[a-f0-9]{64}$/),
    expiresAt: z.string().datetime(),
    approvedAt: z.string().datetime()
  })
  .strict();

export const ActionReceiptSchema = z
  .object({
    receiptId: ReceiptIdSchema,
    actionId: ActionIdSchema,
    workspaceId: WorkspaceIdSchema,
    outcome: z.enum(["not_executed", "succeeded", "failed", "undone"]),
    providerReference: z.string().max(200).optional(),
    actualResult: z.string().min(1).max(1_000),
    occurredAt: z.string().datetime(),
    payloadDigest: z.string().regex(/^[a-f0-9]{64}$/)
  })
  .strict();

export type ActionProposal = z.infer<typeof ActionProposalSchema>;
export type Approval = z.infer<typeof ApprovalSchema>;
export type ActionReceipt = z.infer<typeof ActionReceiptSchema>;

export type ApprovalPolicy = {
  required: boolean;
  stepUpRequired: boolean;
  workplaceOnly: boolean;
};

export function approvalPolicyFor(risk: z.infer<typeof RiskLevelSchema>): ApprovalPolicy {
  switch (risk) {
    case "R0":
      return { required: false, stepUpRequired: false, workplaceOnly: false };
    case "R1":
      return { required: false, stepUpRequired: false, workplaceOnly: false };
    case "R2":
      return { required: true, stepUpRequired: false, workplaceOnly: true };
    case "R3":
      return { required: true, stepUpRequired: true, workplaceOnly: true };
  }
}

export type ApprovalDecision =
  | { accepted: true }
  | {
      accepted: false;
      code:
        | "APPROVAL_CHANNEL_DENIED"
        | "APPROVAL_SURFACE_DENIED"
        | "APPROVAL_EXPIRED"
        | "APPROVAL_BINDING_MISMATCH"
        | "STEP_UP_UNAVAILABLE"
        | "APPROVAL_NOT_REQUIRED";
    };

export function evaluateApproval(action: ActionProposal, approval: Approval, now = new Date()): ApprovalDecision {
  const policy = approvalPolicyFor(action.risk);
  if (!policy.required) return { accepted: false, code: "APPROVAL_NOT_REQUIRED" };
  if (!channelCan(approval.channel, "approve_r2_r3")) return { accepted: false, code: "APPROVAL_CHANNEL_DENIED" };
  if (policy.workplaceOnly && approval.surface !== "workplace") {
    return { accepted: false, code: "APPROVAL_SURFACE_DENIED" };
  }
  if (new Date(action.expiresAt) <= now || new Date(approval.expiresAt) <= now) {
    return { accepted: false, code: "APPROVAL_EXPIRED" };
  }
  if (
    action.actionId !== approval.actionId ||
    action.workspaceId !== approval.workspaceId ||
    action.actionType !== approval.actionType ||
    action.target !== approval.target ||
    action.payloadDigest !== approval.payloadDigest ||
    action.approvalNonceDigest !== approval.nonceDigest ||
    action.environment !== approval.environment ||
    action.expiresAt !== approval.expiresAt
  ) {
    return { accepted: false, code: "APPROVAL_BINDING_MISMATCH" };
  }
  // This standalone package has no trusted step-up verifier. R3 must therefore
  // fail closed; a browser-provided boolean is deliberately not part of the contract.
  if (policy.stepUpRequired) return { accepted: false, code: "STEP_UP_UNAVAILABLE" };
  return { accepted: true };
}
