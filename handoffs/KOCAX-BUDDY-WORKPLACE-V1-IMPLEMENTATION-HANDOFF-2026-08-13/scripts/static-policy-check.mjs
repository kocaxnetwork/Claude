import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const workplaceRoot = join(root, "apps", "workplace");
const excludedDirectories = new Set(["node_modules", "dist", "coverage", ".git"]);

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) results.push(...(await filesUnder(path)));
    else results.push(path);
  }
  return results;
}

const textExtensions = new Set([
  ".cmd", ".css", ".csv", ".example", ".html", ".js", ".json", ".md", ".mjs",
  ".sh", ".svg", ".ts", ".tsx", ".webmanifest", ".yaml", ".yml"
]);
const packageTextFiles = (await filesUnder(root)).filter((file) => textExtensions.has(extname(file)));
const publicFiles = packageTextFiles.filter((file) => file.startsWith(`${workplaceRoot}/`));
const violations = [];
const forbiddenPublicIdentity = [/\bMATE\b/i, /\bJarvis\b/i, /Buddyfather/i, /Kiramate/i];
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /(?:access|refresh|api|secret)[_-]?token\s*[:=]\s*["'][^"']{12,}["']/i,
  /password\s*[:=]\s*["'][^"']{8,}["']/i
];

for (const file of publicFiles) {
  const content = await readFile(file, "utf8");
  for (const pattern of forbiddenPublicIdentity) {
    if (pattern.test(content)) violations.push(`${relative(root, file)} leaks forbidden public identity: ${pattern}`);
  }
  for (const pattern of secretPatterns) {
    if (pattern.test(content)) violations.push(`${relative(root, file)} resembles embedded secret material: ${pattern}`);
  }
  if (/dangerouslySetInnerHTML/.test(content)) violations.push(`${relative(root, file)} uses dangerouslySetInnerHTML`);
  if (/localStorage\.(?:setItem|getItem)\([^)]*(?:token|secret|password)/i.test(content)) {
    violations.push(`${relative(root, file)} appears to use browser storage for a secret`);
  }
}

for (const file of packageTextFiles) {
  const content = await readFile(file, "utf8");
  for (const pattern of secretPatterns) {
    if (pattern.test(content)) violations.push(`${relative(root, file)} resembles embedded secret material: ${pattern}`);
  }
  const knownCredentialFormats = [
    /AKIA[0-9A-Z]{16}/,
    /gh[pousr]_[A-Za-z0-9_]{20,}/,
    /sk-(?:live|test)-[A-Za-z0-9]{16,}/,
    /xox[baprs]-[A-Za-z0-9-]{10,}/
  ];
  for (const pattern of knownCredentialFormats) {
    if (pattern.test(content)) violations.push(`${relative(root, file)} resembles a known credential format: ${pattern}`);
  }
}

const app = await readFile(join(workplaceRoot, "src", "App.tsx"), "utf8");
for (const tab of ["today", "chat", "tasks", "buddy", "control"]) {
  if (!new RegExp(`\\b${tab}:`).test(app)) violations.push(`App.tsx is missing canonical tab mapping: ${tab}`);
}

const api = await readFile(join(root, "apps", "api", "src", "app.ts"), "utf8");
if (!api.includes('outcome: "not_executed"')) violations.push("Reference API does not prove non-execution receipts");
if (!api.includes('execution: "disabled"')) violations.push("Reference API does not advertise disabled execution");

if (violations.length) {
  console.error(violations.join("\n"));
  process.exit(1);
}

console.log(`Static policy check passed (${publicFiles.length} public files; ${packageTextFiles.length} package text files scanned).`);
