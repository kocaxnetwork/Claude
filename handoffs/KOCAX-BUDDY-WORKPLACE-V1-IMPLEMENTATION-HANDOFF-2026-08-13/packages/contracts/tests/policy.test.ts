import { describe, expect, it } from "vitest";
import {
  ActionProposalSchema,
  ApprovalSchema,
  BUDDY_DEFAULT_POLICY,
  assertCustomerFacingCopy,
  approvalPolicyFor,
  channelCan,
  evaluateApproval,
  type ActionProposal,
  type Approval
} from "../src";

const action: ActionProposal = ActionProposalSchema.parse({
  actionId: "act_01KXBUDDY001",
  workspaceId: "wsp_01KXPERSONAL01",
  actionType: "calendar.event.create",
  risk: "R2",
  status: "awaiting_approval",
  target: "Personal calendar",
  summary: "Create Dentist appointment tomorrow at 10:00",
  payloadDigest: "a".repeat(64),
  approvalNonceDigest: "b".repeat(64),
  idempotencyKey: "idem_01KXBUDDY_ACTION_001",
  environment: "preview",
  reversible: true,
  expiresAt: "2099-08-13T20:00:00.000Z",
  createdAt: "2026-08-13T18:00:00.000Z"
});

const approval: Approval = ApprovalSchema.parse({
  approvalId: "apr_01KXBUDDY001",
  actionId: action.actionId,
  workspaceId: action.workspaceId,
  actionType: action.actionType,
  target: action.target,
  payloadDigest: action.payloadDigest,
  environment: action.environment,
  approvingUserId: "usr_01KXOWNER001",
  channel: "kocax",
  surface: "workplace",
  nonceDigest: action.approvalNonceDigest,
  expiresAt: "2099-08-13T20:00:00.000Z",
  approvedAt: "2026-08-13T18:05:00.000Z"
});

describe("action policy", () => {
  it("requires exact Workplace approval for R2", () => {
    expect(approvalPolicyFor("R2")).toEqual({ required: true, stepUpRequired: false, workplaceOnly: true });
    expect(evaluateApproval(action, approval).accepted).toBe(true);
  });

  it("denies an external-channel approval", () => {
    expect(evaluateApproval(action, { ...approval, channel: "telegram" })).toEqual({
      accepted: false,
      code: "APPROVAL_CHANNEL_DENIED"
    });
  });

  it("denies approval from native Messenger instead of Workplace", () => {
    expect(evaluateApproval(action, { ...approval, surface: "messenger" })).toEqual({
      accepted: false,
      code: "APPROVAL_SURFACE_DENIED"
    });
  });

  it("invalidates approval when the server nonce binding changes", () => {
    expect(evaluateApproval(action, { ...approval, nonceDigest: "c".repeat(64) })).toEqual({
      accepted: false,
      code: "APPROVAL_BINDING_MISMATCH"
    });
  });

  it("invalidates approval when the payload binding changes", () => {
    expect(evaluateApproval({ ...action, payloadDigest: "b".repeat(64) }, approval)).toEqual({
      accepted: false,
      code: "APPROVAL_BINDING_MISMATCH"
    });
  });

  it("fails R3 closed while trusted step-up is unavailable", () => {
    expect(evaluateApproval({ ...action, risk: "R3" }, approval)).toEqual({ accepted: false, code: "STEP_UP_UNAVAILABLE" });
  });

  it("keeps bridge capabilities below native control", () => {
    expect(channelCan("discord", "chat")).toBe(true);
    expect(channelCan("discord", "memory_manage")).toBe(false);
    expect(channelCan("whatsapp", "approve_r2_r3")).toBe(false);
  });

  it("encodes the safe Personal Buddy defaults as a strict contract", () => {
    expect(BUDDY_DEFAULT_POLICY).toEqual({
      operatingMode: "guided",
      memoryDefault: "session_only",
      onboardingChannel: "kocax",
      externalActions: "locked",
      notifications: "off"
    });
  });

  it("rejects internal identities in customer-facing copy", () => {
    expect(() => assertCustomerFacingCopy("Buddy is ready")).not.toThrow();
    expect(() => assertCustomerFacingCopy("Kiramate is ready")).toThrow(/INTERNAL_IDENTITY_LEAK/);
  });
});
