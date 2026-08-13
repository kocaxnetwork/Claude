import { createHash } from "node:crypto";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { basename, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const excludedDirectories = new Set(["node_modules", "dist", "coverage", ".git", "archive"]);
const excludedFiles = new Set(["MANIFEST.json", "SHA256SUMS.txt"]);

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Refusing symlink in release package: ${relative(root, path)}`);
    if (entry.isDirectory()) files.push(...(await collect(path)));
    else if (!excludedFiles.has(entry.name) && !entry.name.endsWith(".zip")) files.push(path);
  }
  return files;
}

const paths = (await collect(root)).sort((a, b) => a.localeCompare(b));
const files = [];
for (const path of paths) {
  const bytes = await readFile(path);
  const metadata = await stat(path);
  files.push({
    path: relative(root, path).replaceAll("\\", "/"),
    size: metadata.size,
    sha256: createHash("sha256").update(bytes).digest("hex")
  });
}

const manifest = {
  schema: "kx.release.manifest.v1",
  package: basename(root),
  version: "1.0.0",
  generatedAt: new Date().toISOString(),
  fileCount: files.length,
  files
};

await writeFile(join(root, "MANIFEST.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
await writeFile(join(root, "SHA256SUMS.txt"), `${files.map((file) => `${file.sha256}  ${file.path}`).join("\n")}\n`, "utf8");
console.log(`Manifest written for ${files.length} files.`);
