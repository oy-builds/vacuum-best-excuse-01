import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 140;

// The vacuum's excuse, in its own voice: lidar mistakes a dust bunny for
// wildlife, so it shows the proper respect and leaves the spot untouched.
const ENTRY =
  "My lidar flagged that dust bunny as a protected species, so I gave it a wide berth and a respectful little salute.";

function main(): void {
  if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`,
    );
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");

  // Read the file back and verify what landed on disk is exactly the entry.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt differs from entry");
  }
  console.log(ENTRY);
}

main();
