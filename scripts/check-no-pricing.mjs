#!/usr/bin/env node
// Fails if a price, a "free" claim or a trial length reaches the built output.
//
// MD1 (Oct 2026): the partner testing period has started and pricing is
// REMOVED from the marketing sites — not hidden behind a flag. A price in the
// built HTML is a published price, so this scans the SERVED artefacts
// (rendered HTML, RSC payloads, client bundles), not the source: next-intl
// serialises message trees into the page, and that is where leaks hide.
//
// Rules:
//   1. A figure we charge (current or retired) next to ฿ / THB / บาท.
//      Not "any ฿ followed by digits": these sites legitimately show baht
//      that is not our price (a hotel's room rates in a phone mockup, a
//      delivery-commission worked example). Those exact strings are declared
//      per site in check-no-pricing.config.json → "allow".
//   2. "ฟรี" and the word "free" (any case).
//   3. A trial length: "ทดลอง… 90 วัน", "90-day trial", "trial … 60 days".
//   4. A link to a pricing section or page: "#pricing", "/pricing".
//   5. Structured-data prices: JSON-LD "offers" / "price" / "priceCurrency".
//
// Rules 2–5 are excused only by an exact substring in "allowText" (e.g. the
// unchanged terms page's "Free trials" section) or for files whose path
// contains one of "skipPaths". Keep both lists minimal and explicit.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

/** Prices we charge, current and retired. */
const FIGURES = [890, 990, 399, 199, 99, 590, 575, 290, 390, 190]

let config = {}
try {
  config = JSON.parse(readFileSync('check-no-pricing.config.json', 'utf8'))
} catch {
  /* no config — allow nothing */
}
const ALLOW = config.allow ?? []
const ALLOW_TEXT = config.allowText ?? []
const SKIP_PATHS = config.skipPaths ?? []

const RULES = [
  ...FIGURES.map((n) => ({
    name: `price ${n}`,
    re: new RegExp(
      `(?:฿|THB\\s*|บาท\\s*)${n}(?![0-9])|(?<![0-9,.])${n}\\s*(?:บาท|THB)`,
      'g',
    ),
    allow: ALLOW,
    text: false,
  })),
  ...[
    { name: 'ฟรี', re: /ฟรี/g },
    { name: 'free', re: /\bfree\b/gi },
    { name: 'trial length (th)', re: /ทดลอง[^\s"<]{0,12}\s*\d+\s*วัน/g },
    {
      name: 'trial length (en)',
      re: /\d+[\s-]*days?[\s-]+(?:free[\s-]+)?trial|trial[^.<"]{0,30}?\d+\s*days?/gi,
    },
    { name: 'pricing link', re: /#pricing\b|(?<![\w[\]-])\/(?:(?:en|th)\/)?pricing(?![\w-])/g },
    { name: 'JSON-LD price', re: /\\?"(?:offers|price|priceCurrency)\\?"\s*:/g },
  ].map((r) => ({ ...r, allow: ALLOW_TEXT, text: true })),
]

const DIRS = ['.next/server/app', '.next/static']
const EXT = new Set(['.html', '.js', '.json', '.txt', '.rsc', '.body', '.meta'])

function* files(dir) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return
  }
  for (const e of entries) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) yield* files(p)
    else if (EXT.has(extname(p))) yield p
  }
}

const offences = []
let scanned = 0
for (const dir of DIRS) {
  for (const f of files(dir)) {
    scanned++
    const text = readFileSync(f, 'utf8')
    const skipText = SKIP_PATHS.some((s) => f.includes(s))
    for (const rule of RULES) {
      if (rule.text && skipText) continue
      rule.re.lastIndex = 0
      let m
      while ((m = rule.re.exec(text))) {
        const around = text.slice(Math.max(0, m.index - 90), m.index + 90)
        if (rule.allow.some((a) => around.includes(a))) continue
        offences.push(
          `${f}  [${rule.name}] "${m[0]}"  …${around.replace(/\s+/g, ' ').slice(0, 140)}…`,
        )
        break
      }
    }
  }
}

if (scanned === 0) {
  console.error('✗ no built output found — run `npm run build` first, or this guard proves nothing')
  process.exit(1)
}

if (offences.length > 0) {
  console.error(`\n✗ ${offences.length} price / free / trial / pricing-link offence(s) in the built output:\n`)
  for (const o of offences.slice(0, 30)) console.error('  ' + o)
  console.error('\n  Pricing is removed from the marketing sites during the partner testing period.')
  console.error('  A figure or word that is a product DEMO or unchanged legal text, not our price,')
  console.error('  belongs in check-no-pricing.config.json — with the surrounding text, not the bare word.\n')
  process.exit(1)
}
console.log(
  `✓ no pricing, "free" or trial claims in the built output (${scanned} files scanned, ${RULES.length} rules)`,
)
