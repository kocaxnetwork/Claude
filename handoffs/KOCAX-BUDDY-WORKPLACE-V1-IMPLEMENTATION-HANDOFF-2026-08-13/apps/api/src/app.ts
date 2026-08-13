import Fastify, { type FastifyRequest } from "fastify";
import { createHash, randomUUID } from "node:crypto";
import { z } from "zod";
import {
  ApprovalSchema,
  BuddyAvatarProfileSchema,
  MemoryRecordSchema,
  createBuddyPassport,
  evaluateApproval,
  evaluateMemoryWrite,
  type ActionReceipt,
  type Approval
} from "@kocax/buddy-contracts";
import { ReferenceStore, type SessionIdentity } from "./store.js";

const MemoryCreateBody = MemoryRecordSchema.omit({
  memoryId: true,
  ownerUserId: true,
  buddyId: true,
  workspaceId: true,
  status: true,
  createdAt: true,
  updatedAt: true
});

const MemoryPatchBody = z
  .object({
    value: z.string().min(1).max(2_000).optional(),
    status: z.enum(["active", "locked", "expired"]).optional(),
    expiresAt: z.string().datetime().optional()
  })
  .strict();

const ApprovalBody = z
  .object({
    payloadDigest: z.string().regex(/^[a-f0-9]{64}$/),
    nonce: z.string().min(24).max(128)
  })
  .strict();

type BuildOptions = {
  store?: ReferenceStore;
};

function sessionHeader(request: FastifyRequest): string | undefined {
  const header = request.headers["x-kx-dev-session"];
  return Array.isArray(header) ? header[0] : header;
}

export function buildApp(options: BuildOptions = {}) {
  const app = Fastify({ logger: false });
  const store = options.store ?? new ReferenceStore();

  const requireSession = (request: FastifyRequest): { identity: SessionIdentity; token: string } => {
    const token = sessionHeader(request);
    const identity = store.authenticate(token);
    if (!identity) throw Object.assign(new Error("UNAUTHENTICATED"), { statusCode: 401 });
    return { identity, token: token! };
  };

  const requireIdentity = (request: FastifyRequest): SessionIdentity => requireSession(request).identity;

  app.setErrorHandler((error: unknown, _request, reply) => {
    const candidate = error as { statusCode?: unknown; message?: unknown };
    const statusCode = typeof candidate.statusCode === "number" ? candidate.statusCode : error instanceof z.ZodError ? 400 : 500;
    void reply.code(statusCode).send({
      error: statusCode === 500 ? "INTERNAL_ERROR" : typeof candidate.message === "string" ? candidate.message : "REQUEST_ERROR",
      details: error instanceof z.ZodError ? error.issues : undefined
    });
  });

  app.get("/health", async () => ({ status: "ok", mode: "reference-preview", execution: "disabled" }));

  app.get("/v1/bootstrap", async (request) => {
    const session = requireSession(request);
    return store.getBootstrap(session.identity, session.token);
  });

  app.get<{ Params: { memoryId: string } }>("/v1/memories/:memoryId", async (request, reply) => {
    const session = requireSession(request);
    const memory = store.getMemory(session.identity, session.token, request.params.memoryId);
    if (!memory) return reply.code(404).send({ error: "NOT_FOUND" });
    return memory;
  });

  app.post("/v1/memories", async (request, reply) => {
    const session = requireSession(request);
    const { identity } = session;
    const body = MemoryCreateBody.parse(request.body);
    const now = new Date().toISOString();
    const memory = MemoryRecordSchema.parse({
      ...body,
      memoryId: `mem_${randomUUID().replaceAll("-", "")}`,
      ownerUserId: identity.userId,
      buddyId: identity.buddyId,
      workspaceId: identity.workspaceId,
      status: "active",
      createdAt: now,
      updatedAt: now
    });
    const decision = evaluateMemoryWrite(memory);
    if (!decision.allowed) return reply.code(403).send({ error: decision.code });
    if (memory.consent.expiresAt && new Date(memory.consent.expiresAt).getTime() <= Date.now()) {
      return reply.code(422).send({ error: "MEMORY_EXPIRY_MUST_BE_FUTURE" });
    }
    store.addMemory(session.token, memory);
    return reply.code(201).send(memory);
  });

  app.patch<{ Params: { memoryId: string } }>("/v1/memories/:memoryId", async (request, reply) => {
    const session = requireSession(request);
    const existing = store.getMemory(session.identity, session.token, request.params.memoryId);
    if (!existing) return reply.code(404).send({ error: "NOT_FOUND" });
    const patch = MemoryPatchBody.parse(request.body);
    const { expiresAt, ...recordPatch } = patch;
    const nextStatus =
      expiresAt && new Date(expiresAt).getTime() <= Date.now() ? "expired" : recordPatch.status ?? existing.status;
    const updated = MemoryRecordSchema.parse({
      ...existing,
      ...recordPatch,
      status: nextStatus,
      consent: expiresAt ? { ...existing.consent, expiresAt } : existing.consent,
      updatedAt: new Date().toISOString()
    });
    Object.assign(existing, updated);
    return updated;
  });

  app.delete<{ Params: { memoryId: string } }>("/v1/memories/:memoryId", async (request, reply) => {
    const session = requireSession(request);
    const existing = store.getMemory(session.identity, session.token, request.params.memoryId);
    if (!existing) return reply.code(404).send({ error: "NOT_FOUND" });
    existing.status = "deleted";
    existing.updatedAt = new Date().toISOString();
    return reply.code(204).send();
  });

  app.get<{ Params: { actionId: string } }>("/v1/actions/:actionId/approval-challenge", async (request, reply) => {
    const identity = requireIdentity(request);
    if (store.pausedWorkspaces.has(identity.workspaceId)) {
      return reply.code(423).send({ error: "WORKSPACE_PAUSED" });
    }
    const action = store.getAction(identity, request.params.actionId);
    const nonce = store.getApprovalChallenge(identity, request.params.actionId);
    if (!action || !nonce) return reply.code(404).send({ error: "NOT_FOUND" });
    return {
      actionId: action.actionId,
      surface: "workplace",
      nonce,
      expiresAt: action.expiresAt
    };
  });

  app.post<{ Params: { actionId: string } }>("/v1/actions/:actionId/approve", async (request, reply) => {
    const identity = requireIdentity(request);
    if (store.pausedWorkspaces.has(identity.workspaceId)) {
      return reply.code(423).send({ error: "WORKSPACE_PAUSED" });
    }
    const action = store.getAction(identity, request.params.actionId);
    if (!action) return reply.code(404).send({ error: "NOT_FOUND" });
    if (action.status !== "awaiting_approval") return reply.code(409).send({ error: "APPROVAL_ALREADY_USED" });
    const body = ApprovalBody.parse(request.body);
    const nonceDigest = createHash("sha256").update(body.nonce).digest("hex");
    if (store.usedApprovalNonceDigests.has(nonceDigest)) {
      return reply.code(409).send({ error: "APPROVAL_NONCE_ALREADY_USED" });
    }
    const approval: Approval = ApprovalSchema.parse({
      approvalId: `apr_${randomUUID().replaceAll("-", "")}`,
      actionId: action.actionId,
      workspaceId: identity.workspaceId,
      actionType: action.actionType,
      target: action.target,
      payloadDigest: body.payloadDigest,
      environment: action.environment,
      approvingUserId: identity.userId,
      channel: "kocax",
      surface: "workplace",
      nonceDigest,
      expiresAt: action.expiresAt,
      approvedAt: new Date().toISOString()
    });
    const decision = evaluateApproval(action, approval);
    if (!decision.accepted) return reply.code(403).send({ error: decision.code });

    action.status = "approved";
    store.consumeApprovalChallenge(action.actionId, nonceDigest);
    const receipt: ActionReceipt = {
      receiptId: `rcp_${randomUUID().replaceAll("-", "")}`,
      actionId: action.actionId,
      workspaceId: identity.workspaceId,
      outcome: "not_executed",
      actualResult: "Reference preview: approval recorded; external execution is disabled.",
      occurredAt: new Date().toISOString(),
      payloadDigest: action.payloadDigest
    };
    store.receipts.push(receipt);
    return { approval, receipt };
  });

  app.delete<{ Params: { connectionId: string } }>("/v1/connections/:connectionId", async (request, reply) => {
    const identity = requireIdentity(request);
    const connection = store.connections.find(
      (item) => item.connectionId === request.params.connectionId && item.workspaceId === identity.workspaceId
    );
    if (!connection) return reply.code(404).send({ error: "NOT_FOUND" });
    connection.status = "revoked";
    connection.revokedAt = new Date().toISOString();
    return connection;
  });

  app.patch("/v1/profile", async (request) => {
    const identity = requireIdentity(request);
    const current = store.profiles.get(identity.buddyId);
    if (!current) throw Object.assign(new Error("PROFILE_NOT_FOUND"), { statusCode: 404 });
    const body = z
      .object({
        displayName: z.string().trim().min(1).max(32).optional(),
        reducedMotion: z.boolean().optional()
      })
      .strict()
      .parse(request.body);
    const updated = BuddyAvatarProfileSchema.parse({
      ...current,
      displayName: body.displayName ?? current.displayName,
      preferences: {
        ...current.preferences,
        reducedMotion: body.reducedMotion ?? current.preferences.reducedMotion
      },
      updatedAt: new Date().toISOString()
    });
    store.profiles.set(identity.buddyId, updated);
    return updated;
  });

  app.post("/v1/export", async (request) => {
    const identity = requireIdentity(request);
    const profile = store.profiles.get(identity.buddyId);
    if (!profile) throw Object.assign(new Error("PROFILE_NOT_FOUND"), { statusCode: 404 });
    return createBuddyPassport(
      profile,
      store.memories.filter((item) => item.workspaceId === identity.workspaceId),
      store.connections.filter((item) => item.workspaceId === identity.workspaceId)
    );
  });

  app.post("/v1/pause", async (request) => {
    const identity = requireIdentity(request);
    const body = z.object({ paused: z.boolean() }).strict().parse(request.body);
    if (body.paused) store.pausedWorkspaces.add(identity.workspaceId);
    else store.pausedWorkspaces.delete(identity.workspaceId);
    return { paused: body.paused, effective: "immediate", execution: "disabled" };
  });

  return app;
}
