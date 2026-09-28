import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "node_modules/@electric-sql/pglite/dist");
const target = join(root, ".vercel/output/functions/__server.func/_libs");

if (!existsSync(target)) {
  console.log("[pglite] build output not found, skipping asset copy");
  process.exit(0);
}

for (const name of ["pglite.data", "pglite.wasm", "initdb.wasm"]) {
  copyFileSync(join(source, name), join(target, name));
}

console.log("[pglite] copied database assets next to the server bundle");
