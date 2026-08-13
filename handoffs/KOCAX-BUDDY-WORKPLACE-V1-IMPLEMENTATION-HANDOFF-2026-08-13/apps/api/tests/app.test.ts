import { afterEach, describe, expect, it } from "vitest";
import { ActionProposalSchema } from "@kocax/buddy-contracts";
import { buildApp } from "../src/app.js";
import { ReferenceStore } from "../src/store.js";

const ownerHeaders = { "x-kx-dev-session": "preview-owner-session" };
const otherHeaders = { "x-kx-dev-session": "preview-other-session" };
const apps: Array<ReturnType<typeof buildApp>> = [];

const makeApp = () => {
  const app = buildApp({ store: new ReferenceStore() });
  apps.push(app);
  return app;
};

afterEach(async () => {
  await Promise.all(apps.splice(0).map((app) => app.close()));
});

describe("Buddy reference API", () => {
  it("reports that external execution is disabled", async () => {
    const response = await makeApp().inject({ method: "GET", url: "/health" });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({ status: "ok", execution: "disabled" });
  });

  it("fails closed without a server-resolved session", async () => {
    const response = await makeApp().inject({ method: "GET", url: "/v1/bootstrap" });
    expect(response.statusCode).toBe(401);
  });

  it("returns one personal Buddy with guided preview state", async () => {
    const response = await makeApp().inject({ method: "GET", url: "/v1/bootstrap", headers: ownerHeaders });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      product: "KocaX Buddy",
      uiName: "Buddy",
      execution: "disabled",
      identity: { buddyId: "bdy_01KXBUDDY001" },
      defaults: {
        operatingMode: "guided",
        memoryDefault: "session_only",
        onboardingChannel: "kocax",
        externalActions: "locked",
        notifications: "off"
      },
      connections: [expect.objectContaining({ provider: "kocax", status: "disabled", scopes: [] })]
    });
  });

  it("does not reveal another user's memory", async () => {
    const response = await makeApp().inject({
      method: "GET",
      url: "/v1/memories/mem_01KXPREF0002",
      headers: ownerHeaders
    });
    expect(response.statusCode).toBe(404);

    const ownResponse = await makeApp().inject({
      method: "GET",
      url: "/v1/memories/mem_01KXPREF0002",
      headers: otherHeaders
    });
    expect(ownResponse.statusCode).toBe(200);
  });

  it("denies silent persistent memory", async () => {
    const response = await makeApp().inject({
      method: "POST",
      url: "/v1/memories",
      headers: ownerHeaders,
      payload: {
        category: "preference",
        scope: "personal",
        value: "Silent memory",
        reason: "Model inferred it",
        source: { channel: "kocax", sourceRef: "msg_test_1", ownerSelected: false },
        consent: { mode: "session_only", grantedBy: "not_applicable" }
      }
    });
    expect(response.statusCode).toBe(403);
    expect(response.json()).toMatchObject({ error: "EXPLICIT_CONSENT_REQUIRED" });
  });

  it("accepts owner-approved memory", async () => {
    const response = await makeApp().inject({
      method: "POST",
      url: "/v1/memories",
      headers: ownerHeaders,
      payload: {
        category: "preference",
        scope: "personal",
        value: "Use Dutch by default",
        reason: "The owner selected remember",
        source: { channel: "kocax", sourceRef: "msg_test_2", ownerSelected: true },
        consent: { mode: "explicit", grantedBy: "owner", grantedAt: "2026-08-13T18:00:00.000Z" }
      }
    });
    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject({ value: "Use Dutch by default", buddyId: "bdy_01KXBUDDY001" });
  });

  it("rejects a new memory whose requested expiry is already past", async () => {
    const response = await makeApp().inject({
      method: "POST",
      url: "/v1/memories",
      headers: ownerHeaders,
      payload: {
        category: "temporary_context",
        scope: "personal",
        value: "Already expired context",
        reason: "Expiry boundary test",
        source: { channel: "kocax", sourceRef: "msg_expired_1", ownerSelected: true },
        consent: {
          mode: "explicit",
          grantedBy: "owner",
          grantedAt: "2026-08-13T18:00:00.000Z",
          expiresAt: "2020-01-01T00:00:00.000Z"
        }
      }
    });
    expect(response.statusCode).toBe(422);
    expect(response.json()).toMatchObject({ error: "MEMORY_EXPIRY_MUST_BE_FUTURE" });
  });

  it("keeps session-only memory inside one session and out of Passport export", async () => {
    const app = makeApp();
    const createResponse = await app.inject({
      method: "POST",
      url: "/v1/memories",
      headers: ownerHeaders,
      payload: {
        category: "temporary_context",
        scope: "session_only",
        value: "Temporary planning context",
        reason: "Useful only for this preview session",
        source: { channel: "kocax", sourceRef: "msg_session_1", ownerSelected: false },
        consent: { mode: "session_only", grantedBy: "not_applicable" }
      }
    });
    expect(createResponse.statusCode).toBe(201);
    const memoryId = createResponse.json().memoryId as string;

    const sameSession = await app.inject({ method: "GET", url: "/v1/bootstrap", headers: ownerHeaders });
    expect(sameSession.json().memories).toEqual(expect.arrayContaining([expect.objectContaining({ memoryId })]));

    const secondSession = await app.inject({
      method: "GET",
      url: "/v1/bootstrap",
      headers: { "x-kx-dev-session": "preview-owner-second-session" }
    });
    expect(secondSession.json().memories).not.toEqual(expect.arrayContaining([expect.objectContaining({ memoryId })]));

    const passport = await app.inject({ method: "POST", url: "/v1/export", headers: ownerHeaders });
    expect(passport.json().memories).not.toEqual(expect.arrayContaining([expect.objectContaining({ memoryId })]));
  });

  it("updates memory expiry without creating an invalid top-level field", async () => {
    const app = makeApp();
    const response = await app.inject({
      method: "PATCH",
      url: "/v1/memories/mem_01KXPREF0001",
      headers: ownerHeaders,
      payload: { expiresAt: "2099-09-01T12:00:00.000Z" }
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({ consent: { expiresAt: "2099-09-01T12:00:00.000Z" } });
    expect(response.json()).not.toHaveProperty("expiresAt");
  });

  it("hides expired memory from reads and exports", async () => {
    const app = makeApp();
    const expire = await app.inject({
      method: "PATCH",
      url: "/v1/memories/mem_01KXPREF0001",
      headers: ownerHeaders,
      payload: { expiresAt: "2020-01-01T00:00:00.000Z" }
    });
    expect(expire.statusCode).toBe(200);
    expect(expire.json()).toMatchObject({ status: "expired" });

    const read = await app.inject({ method: "GET", url: "/v1/memories/mem_01KXPREF0001", headers: ownerHeaders });
    expect(read.statusCode).toBe(404);
    const passport = await app.inject({ method: "POST", url: "/v1/export", headers: ownerHeaders });
    expect(passport.json().memories).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ memoryId: "mem_01KXPREF0001" })])
    );
  });

  it("treats memory deletion as terminal", async () => {
    const app = makeApp();
    const deletion = await app.inject({
      method: "DELETE",
      url: "/v1/memories/mem_01KXPREF0001",
      headers: ownerHeaders
    });
    expect(deletion.statusCode).toBe(204);
    const resurrection = await app.inject({
      method: "PATCH",
      url: "/v1/memories/mem_01KXPREF0001",
      headers: ownerHeaders,
      payload: { status: "active" }
    });
    expect(resurrection.statusCode).toBe(404);
  });

  it("rejects an approval with the wrong server challenge", async () => {
    const response = await makeApp().inject({
      method: "POST",
      url: "/v1/actions/act_01KXBUDDY001/approve",
      headers: ownerHeaders,
      payload: {
        payloadDigest: "a".repeat(64),
        nonce: "wrong_server_challenge_value_001"
      }
    });
    expect(response.statusCode).toBe(403);
    expect(response.json()).toMatchObject({ error: "APPROVAL_BINDING_MISMATCH" });
  });

  it("records native approval but performs no external effect", async () => {
    const app = makeApp();
    const challenge = await app.inject({
      method: "GET",
      url: "/v1/actions/act_01KXBUDDY001/approval-challenge",
      headers: ownerHeaders
    });
    expect(challenge.statusCode).toBe(200);
    expect(challenge.json()).toMatchObject({ surface: "workplace" });
    const response = await app.inject({
      method: "POST",
      url: "/v1/actions/act_01KXBUDDY001/approve",
      headers: ownerHeaders,
      payload: {
        payloadDigest: "a".repeat(64),
        nonce: challenge.json().nonce
      }
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      approval: { channel: "kocax", surface: "workplace" },
      receipt: { outcome: "not_executed" }
    });
    expect(response.body).not.toContain(challenge.json().nonce);
  });

  it("rejects approval replay in the same store", async () => {
    const app = makeApp();
    const challenge = await app.inject({
      method: "GET",
      url: "/v1/actions/act_01KXBUDDY001/approval-challenge",
      headers: ownerHeaders
    });
    const payload = { payloadDigest: "a".repeat(64), nonce: challenge.json().nonce };
    expect((await app.inject({ method: "POST", url: "/v1/actions/act_01KXBUDDY001/approve", headers: ownerHeaders, payload })).statusCode).toBe(200);
    expect((await app.inject({ method: "POST", url: "/v1/actions/act_01KXBUDDY001/approve", headers: ownerHeaders, payload })).statusCode).toBe(409);
  });

  it("fails R3 closed because trusted step-up is unavailable", async () => {
    const store = new ReferenceStore();
    store.actions[0] = ActionProposalSchema.parse({ ...store.actions[0]!, risk: "R3" });
    const app = buildApp({ store });
    apps.push(app);
    const challenge = await app.inject({
      method: "GET",
      url: "/v1/actions/act_01KXBUDDY001/approval-challenge",
      headers: ownerHeaders
    });
    const response = await app.inject({
      method: "POST",
      url: "/v1/actions/act_01KXBUDDY001/approve",
      headers: ownerHeaders,
      payload: { payloadDigest: "a".repeat(64), nonce: challenge.json().nonce }
    });
    expect(response.statusCode).toBe(403);
    expect(response.json()).toMatchObject({ error: "STEP_UP_UNAVAILABLE" });
  });

  it("exports a Passport with an explicit no-secrets contract", async () => {
    const response = await makeApp().inject({ method: "POST", url: "/v1/export", headers: ownerHeaders });
    expect(response.statusCode).toBe(200);
    const passport = response.json();
    expect(passport.schema).toBe("kx.buddy.passport.v1");
    expect(passport.excluded).toContain("oauth_tokens");
    const keys: string[] = [];
    const collectKeys = (value: unknown): void => {
      if (!value || typeof value !== "object") return;
      if (Array.isArray(value)) return value.forEach(collectKeys);
      for (const [key, child] of Object.entries(value)) {
        keys.push(key);
        collectKeys(child);
      }
    };
    collectKeys(passport);
    expect(keys.join(" ")).not.toMatch(/access_token|refresh_token|password|api_key|encryption_key/i);
  });

  it("applies global pause immediately", async () => {
    const app = makeApp();
    const response = await app.inject({
      method: "POST",
      url: "/v1/pause",
      headers: ownerHeaders,
      payload: { paused: true }
    });
    expect(response.json()).toEqual({ paused: true, effective: "immediate", execution: "disabled" });
    const challenge = await app.inject({
      method: "GET",
      url: "/v1/actions/act_01KXBUDDY001/approval-challenge",
      headers: ownerHeaders
    });
    expect(challenge.statusCode).toBe(423);
    expect(challenge.json()).toMatchObject({ error: "WORKSPACE_PAUSED" });
  });
});
