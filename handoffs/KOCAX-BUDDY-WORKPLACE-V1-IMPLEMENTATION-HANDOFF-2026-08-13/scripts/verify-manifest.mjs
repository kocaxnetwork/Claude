import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import { basename, isAbsolute, join, normalize, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(await readFile(join(root, "MANIFEST.json"), "utf8"));
const failures = [];
const excludedDirectories = new Set(["node_modules", "dist", "coverage", ".git", "archive"]);
const excludedFiles = new Set(["MANIFEST.json", "SHA256SUMS.txt"]);

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink()) {
      failures.push(`Symlink is not allowed: ${relative(root, path)}`);
      continue;
    }
    if (entry.isDirectory()) files.push(...(await collect(path)));
    else if (!excludedFiles.has(entry.name) && !entry.name.endsWith(".zip")) files.push(path);
  }
  return files;
}

if (manifest.schema !== "kx.release.manifest.v1") failures.push("Unexpected manifest schema");
if (manifest.package !== basename(root)) failures.push("Manifest package name does not match directory");
if (!Array.isArray(manifest.files)) failures.push("Manifest files must be an array");

const entries = Array.isArray(manifest.files) ? manifest.files : [];
if (manifest.fileCount !== entries.length) failures.push("Manifest fileCount does not match files array length");
const seen = new Set();
const checksums = [];

for (const entry of entries) {
  if (!entry || typeof entry.path !== "string" || typeof entry.sha256 !== "string" || typeof entry.size !== "number") {
    failures.push("Manifest contains a malformed file entry");
    continue;
  }
  const normalized = normalize(entry.path).replaceAll("\\", "/");
  if (
    isAbsolute(entry.path) ||
    entry.path.includes("\\") ||
    normalized !== entry.path ||
    entry.path === ".." ||
    entry.path.startsWith("../")
  ) {
    failures.push(`Unsafe manifest path: ${entry.path}`);
    continue;
  }
  if (seen.has(entry.path)) {
    failures.push(`Duplicate manifest path: ${entry.path}`);
    continue;
  }
  seen.add(entry.path);
  try {
    const absolutePath = join(root, entry.path);
    const [bytes, metadata] = await Promise.all([readFile(absolutePath), stat(absolutePath)]);
    const digest = createHash("sha256").update(bytes).digest("hex");
    if (digest !== entry.sha256) failures.push(`${entry.path}: expected ${entry.sha256}, got ${digest}`);
    if (metadata.size !== entry.size) failures.push(`${entry.path}: expected ${entry.size} bytes, got ${metadata.size}`);
    checksums.push(`${entry.sha256}  ${entry.path}`);
  } catch (error) {
    failures.push(`${entry.path}: cannot read (${error instanceof Error ? error.message : String(error)})`);
  }
}

const actualPaths = (await collect(root)).map((path) => relative(root, path).replaceAll("\\", "/")).sort();
for (const path of actualPaths) if (!seen.has(path)) failures.push(`Unlisted file present: ${path}`);
for (const path of seen) if (!actualPaths.includes(path)) failures.push(`Manifest lists missing file: ${path}`);

const checksumFile = await readFile(join(root, "SHA256SUMS.txt"), "utf8");
const expectedChecksums = `${checksums.join("\n")}\n`;
if (checksumFile !== expectedChecksums) failures.push("SHA256SUMS.txt does not exactly match MANIFEST.json");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Manifest verification passed (${entries.length} files; no additions, omissions, duplicates or unsafe paths).`);
