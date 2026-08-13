import { spawn } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const child = spawn(process.execPath, [resolve(root, "apps/api/dist/server.js")], {
  cwd: root,
  env: {
    ...process.env,
    KX_ALLOW_REFERENCE_SERVER: "1",
    KX_REFERENCE_PORT: "0",
    KX_REFERENCE_SMOKE: "1"
  },
  stdio: ["ignore", "pipe", "pipe"]
});

let stdout = "";
let stderr = "";
child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });

const exitCode = await new Promise((resolveExit, reject) => {
  const timeout = setTimeout(() => {
    child.kill("SIGTERM");
    reject(new Error("Built API smoke test timed out"));
  }, 10_000);
  child.once("error", (error) => {
    clearTimeout(timeout);
    reject(error);
  });
  child.once("exit", (code) => {
    clearTimeout(timeout);
    resolveExit(code);
  });
});

if (exitCode !== 0) {
  throw new Error(`Built API exited with ${exitCode}.\n${stdout}${stderr}`);
}

console.log("Built API smoke passed (loopback listener + disabled-execution health check).");
