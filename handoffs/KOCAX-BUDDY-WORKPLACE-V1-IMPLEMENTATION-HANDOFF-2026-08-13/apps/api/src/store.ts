import { createHash, randomBytes } from "node:crypto";
import {
  ActionProposalSchema,
  BUDDY_DEFAULT_POLICY,
  BuddyAvatarProfileSchema,
  ConnectionSchema,
  MemoryRecordSchema,
  type ActionProposal,
  type ActionReceipt,
  type BuddyAvatarProfile,
  type Connection,
  type MemoryRecord
} from "@kocax/buddy-contracts";

export type SessionIdentity = {
  userId: string;
  buddyId: string;
  workspaceId: string;
};

type Task = {
  taskId: string;
  title: string;
  dueAt: string | null;
  status: "open" | "done";
};

const identities: Record<string, SessionIdentity> = {
  "preview-owner-session": {
    userId: "usr_01KXOWNER001",
    buddyId: "bdy_01KXBUDDY001",
    workspaceId: "wsp_01KXPERSONAL01"
  },
  "preview-other-session": {
    userId: "usr_01KXOTHER001",
    buddyId: "bdy_01KXBUDDY002",
    workspaceId: "wsp_01KXPERSONAL02"
  },
  "preview-owner-second-session": {
    userId: "usr_01KXOWNER001",
    buddyId: "bdy_01KXBUDDY001",
    workspaceId: "wsp_01KXPERSONAL01"
  }
};

const createProfile = (buddyId: string): BuddyAvatarProfile =>
  BuddyAvatarProfileSchema.parse({
    schemaVersion: 1,
    buddyId,
    characterId: "buddy-v1",
    displayName: "Buddy",
    rigVersion: "buddy-rig-1",
    catalogVersion: "catalog-1",
    equipped: {
      hair: "hair-short-black-01",
      headwear: null,
      top: "top-core-black-01",
      outerwear: "outerwear-shell-gold-01",
      trousers: "trousers-core-black-01",
      shoes: "shoes-core-black-01",
      accessory: null
    },
    palette: { accent: "kx-gold", secondary: "kx-blue" },
    preferences: { reducedMotion: false, idleMotion: true },
    updatedAt: "2026-08-13T18:00:00.000Z"
  });

const createMemory = (identity: SessionIdentity, memoryId: string, value: string): MemoryRecord =>
  MemoryRecordSchema.parse({
    memoryId,
    ownerUserId: identity.userId,
    buddyId: identity.buddyId,
    workspaceId: identity.workspaceId,
    category: "preference",
    scope: "personal",
    status: "active",
    value,
    reason: "The owner explicitly chose to save this preference.",
    source: { channel: "kocax", sourceRef: "msg_preview_001", ownerSelected: true },
    consent: { mode: "explicit", grantedBy: "owner", grantedAt: "2026-08-13T18:00:00.000Z" },
    createdAt: "2026-08-13T18:00:00.000Z",
    updatedAt: "2026-08-13T18:00:00.000Z"
  });

const createConnection = (identity: SessionIdentity, suffix: string): Connection =>
  ConnectionSchema.parse({
    connectionId: `con_${suffix}`,
    buddyId: identity.buddyId,
    workspaceId: identity.workspaceId,
    provider: "kocax",
    status: "disabled",
    scopes: []
  });

const primaryIdentity = identities["preview-owner-session"]!;
const otherIdentity = identities["preview-other-session"]!;

export class ReferenceStore {
  readonly sessions = new Map(Object.entries(identities));
  readonly profiles = new Map<string, BuddyAvatarProfile>([
    [primaryIdentity.buddyId, createProfile(primaryIdentity.buddyId)],
    [otherIdentity.buddyId, createProfile(otherIdentity.buddyId)]
  ]);
  readonly memories: MemoryRecord[] = [
    createMemory(primaryIdentity, "mem_01KXPREF0001", "Prefers concise replies"),
    createMemory(otherIdentity, "mem_01KXPREF0002", "Private other-user memory")
  ];
  readonly sessionMemories = new Map<string, MemoryRecord[]>();
  readonly connections: Connection[] = [
    createConnection(primaryIdentity, "01KXNATIVE0001"),
    createConnection(otherIdentity, "01KXNATIVE0002")
  ];
  readonly actions: ActionProposal[] = [];
  readonly approvalChallenges = new Map<string, string>();
  readonly usedApprovalNonceDigests = new Set<string>();
  readonly receipts: ActionReceipt[] = [];
  readonly tasks = new Map<string, Task[]>([
    [primaryIdentity.workspaceId, [
      { taskId: "tsk_01KXTASK0001", title: "Review tomorrow's planning", dueAt: "2026-08-14T08:30:00.000Z", status: "open" },
      { taskId: "tsk_01KXTASK0002", title: "Export Buddy Passport", dueAt: null, status: "open" }
    ]],
    [otherIdentity.workspaceId, []]
  ]);
  readonly pausedWorkspaces = new Set<string>();

  constructor() {
    const actionId = "act_01KXBUDDY001";
    const nonce = randomBytes(32).toString("base64url");
    const approvalNonceDigest = createHash("sha256").update(nonce).digest("hex");
    this.approvalChallenges.set(actionId, nonce);
    this.actions.push(
      ActionProposalSchema.parse({
        actionId,
        workspaceId: primaryIdentity.workspaceId,
        actionType: "calendar.event.create",
        risk: "R2",
        status: "awaiting_approval",
        target: "Personal calendar",
        summary: "Create a dentist appointment tomorrow at 10:00",
        payloadDigest: "a".repeat(64),
        approvalNonceDigest,
        idempotencyKey: "idem_01KXBUDDY_ACTION_001",
        environment: "preview",
        reversible: true,
        expiresAt: "2099-08-13T20:00:00.000Z",
        createdAt: "2026-08-13T18:00:00.000Z"
      })
    );
  }

  authenticate(session: string | undefined): SessionIdentity | null {
    return session ? this.sessions.get(session) ?? null : null;
  }

  getBootstrap(identity: SessionIdentity, sessionToken: string) {
    return {
      product: "KocaX Buddy",
      uiName: "Buddy",
      mode: "reference-preview",
      execution: "disabled",
      defaults: BUDDY_DEFAULT_POLICY,
      identity,
      profile: this.profiles.get(identity.buddyId),
      memories: this.visibleMemories(identity, sessionToken),
      connections: this.connections.filter((item) => item.workspaceId === identity.workspaceId),
      actions: this.actions.filter((item) => item.workspaceId === identity.workspaceId),
      receipts: this.receipts.filter((item) => item.workspaceId === identity.workspaceId),
      tasks: this.tasks.get(identity.workspaceId) ?? [],
      paused: this.pausedWorkspaces.has(identity.workspaceId)
    };
  }

  addMemory(sessionToken: string, memory: MemoryRecord): void {
    if (memory.scope !== "session_only") {
      this.memories.push(memory);
      return;
    }
    const records = this.sessionMemories.get(sessionToken) ?? [];
    records.push(memory);
    this.sessionMemories.set(sessionToken, records);
  }

  getMemory(identity: SessionIdentity, sessionToken: string, memoryId: string): MemoryRecord | null {
    return this.visibleMemories(identity, sessionToken).find((item) => item.memoryId === memoryId) ?? null;
  }

  getAction(identity: SessionIdentity, actionId: string): ActionProposal | null {
    return this.actions.find((item) => item.actionId === actionId && item.workspaceId === identity.workspaceId) ?? null;
  }

  getApprovalChallenge(identity: SessionIdentity, actionId: string): string | null {
    const action = this.getAction(identity, actionId);
    if (!action || action.status !== "awaiting_approval" || new Date(action.expiresAt).getTime() <= Date.now()) return null;
    return this.approvalChallenges.get(actionId) ?? null;
  }

  consumeApprovalChallenge(actionId: string, nonceDigest: string): void {
    this.usedApprovalNonceDigests.add(nonceDigest);
    this.approvalChallenges.delete(actionId);
  }

  private visibleMemories(identity: SessionIdentity, sessionToken: string): MemoryRecord[] {
    const sessionRecords = this.sessionMemories.get(sessionToken) ?? [];
    return [...this.memories, ...sessionRecords].filter(
      (item) => item.workspaceId === identity.workspaceId && this.isReadableMemory(item)
    );
  }

  private isReadableMemory(memory: MemoryRecord): boolean {
    if (memory.status === "deleted" || memory.status === "expired") return false;
    return !memory.consent.expiresAt || new Date(memory.consent.expiresAt).getTime() > Date.now();
  }
}
