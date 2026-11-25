// The Funniest Out of Office — v2 resubmission.
//
// The joke: the person is out, but the auto-reply is still on the clock —
// and it has started negotiating. Short, one line, no link, no setup
// beyond the premise itself.
//
// The program below takes the single entry line, checks it against the
// competition's text rules, and writes it verbatim to entry.txt inside
// the output directory named by MAKEFUN_OUTPUT_DIR. No trailing
// newline is added: the file must contain exactly the entry text.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry itself. Do not edit this string: it is the submission.
const ENTRY =
  "I'm out of office. This auto-reply is the only one of us still working, and it has just asked for a raise.";

const LIMIT = 200;

type Rule = {
  name: string;
  ok: (text: string) => boolean;
  message: string;
};

const lengthOf = (text: string): number => Array.from(text).length;

const RULES: Rule[] = [
  {
    name: "length",
    ok: (text) => lengthOf(text) >= 1 && lengthOf(text) <= LIMIT,
    message: `entry must be 1–${LIMIT} characters (got ${lengthOf(ENTRY)})`,
  },
  {
    name: "single-line",
    ok: (text) => !text.includes("\n") && !text.includes("\r"),
    message: "entry must be a single line",
  },
  {
    name: "not-blank",
    ok: (text) => text.trim().length > 0,
    message: "entry must not be blank",
  },
  {
    name: "no-link",
    ok: (text) => !/https?:\/\//i.test(text) && !/www\./i.test(text),
    message: "entry must not contain a link",
  },
];

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function checkEntry(text: string): void {
  for (const rule of RULES) {
    if (!rule.ok(text)) fail(rule.message);
  }
}

function outputDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  if (dir === undefined || dir === "") {
    return "/output";
  }
  return dir;
}

function main(): void {
  checkEntry(ENTRY);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, ENTRY, { encoding: "utf8" });
  // Read the file back and confirm it is byte-identical to the entry:
  // no trailing newline, nothing added, nothing trimmed.
  if (readFileSync(target, "utf8") !== ENTRY) {
    fail("entry.txt does not match the entry text");
  }
  console.log(ENTRY);
}

main();
