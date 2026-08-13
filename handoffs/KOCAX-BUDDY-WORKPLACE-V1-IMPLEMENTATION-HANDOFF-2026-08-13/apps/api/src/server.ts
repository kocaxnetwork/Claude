import { buildApp } from "./app.js";

if (process.env.KX_ALLOW_REFERENCE_SERVER !== "1") {
  throw new Error("REFERENCE_SERVER_DISABLED: set KX_ALLOW_REFERENCE_SERVER=1 for a local preview only");
}

const app = buildApp();
const smokeMode = process.env.KX_REFERENCE_SMOKE === "1";
const configuredPort = Number(process.env.KX_REFERENCE_PORT ?? "8787");
if (!Number.isInteger(configuredPort) || configuredPort < (smokeMode ? 0 : 1024) || configuredPort > 65_535) {
  throw new Error("INVALID_REFERENCE_PORT");
}

await app.listen({ host: "127.0.0.1", port: configuredPort });

if (smokeMode) {
  const response = await app.inject({ method: "GET", url: "/health" });
  await app.close();
  if (response.statusCode !== 200 || response.json().execution !== "disabled") {
    throw new Error("BUILT_REFERENCE_SERVER_SMOKE_FAILED");
  }
}
