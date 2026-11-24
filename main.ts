import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "I'm out until Monday. In my absence, please direct all urgent emails to my cat, who has full authority and zero accountability.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
console.log(line);
