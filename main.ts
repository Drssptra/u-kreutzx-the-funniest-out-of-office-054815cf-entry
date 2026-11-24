import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "I'm out until Monday. In my absence, please direct all urgent emails to my cat, who has full authority and zero accountability.";

const MAX_CHARS = 140;

// Gate: the entry must be 1–140 characters. Refuse to write an entry that
// would exceed it instead of producing an invalid file.
if ([...line].length > MAX_CHARS) {
  console.error(
    `error: entry is ${[...line].length} characters, exceeding the ${MAX_CHARS}-character limit`,
  );
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
console.log(line);
