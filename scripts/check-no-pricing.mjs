#!/usr/bin/env node
// Fails if a price we charge reaches the built output while pricing is off.
//
// Run after `npm run build`. Scans the SERVED artefacts — rendered HTML and
// client bundles — not the source, because the leak this exists to catch was
// invisible in source: every price component was correctly gated and
// next-intl still serialised the whole message tree into the page, leaving
// ฿890 in view-source on three pages.
//
// ── Why it is not "any ฿ followed by digits" ─────────────────────────────
//
// Because that is wrong, and measurably so. These sites legitimately show
// baht that is not our price:
//
//   auraseaos.com  ฿1,490 / ฿18,400 / ฿990 — a morning-brief mockup showing
//                  a HOTEL's own room rates. ฿990 there is a Superior room,
//                  and it collides exactly with our bundle price.
//   menudesk.ai    ฿100 / ฿35 / ฿65 / ฿155 — the delivery-commission worked
//                  example, which is the site's central argument.
//   app            ฿1,073 / ฿980 — the customer's own revenue figures.
//
// A guard that cannot tell those from a price list would have to be muted,
// and a muted guard protects nothing. So it matches OUR figures, and each
// site declares the demo strings that legitimately contain them.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

/** Prices we charge, current and retired. Retired ones matter because the
 *  point is that no price is visible, not that today's price is not. */
const FIGURES = [890, 990, 199, 399, 99, 590, 290, 390, 190]

/** Exact substrings that legitimately contain one of the figures above.
 *  Declared per site in check-no-pricing.config.json; absent means none. */
let ALLOW = []
try {
  ALLOW = JSON.parse(readFileSync('check-no-pricing.config.json', 'utf8')).allow ?? []
} catch {
  /* no config — allow nothing */
}

const DIRS = ['.next/server/app', '.next/static']
const EXT = new Set(['.html', '.js', '.json', '.txt', '.rsc'])

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
    for (const n of FIGURES) {
      // ฿890 or THB 890, not 8901 and not 1890.
      const re = new RegExp(`(?:฿|THB\\s*)${n}(?![0-9])`, 'g')
      let m
      while ((m = re.exec(text))) {
        const around = text.slice(Math.max(0, m.index - 90), m.index + 90)
        if (ALLOW.some((a) => around.includes(a))) continue
        offences.push(`${f}  ฿${n}  …${around.replace(/\s+/g, ' ').slice(0, 120)}…`)
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
  console.error(`\n✗ ${offences.length} price(s) reached the built output while pricing is off:\n`)
  for (const o of offences.slice(0, 20)) console.error('  ' + o)
  console.error('\n  Set NEXT_PUBLIC_SHOW_PRICING=true only when pricing is announced.')
  console.error('  A figure that is a product DEMO, not our price, belongs in')
  console.error('  check-no-pricing.config.json — with the surrounding text, not the bare number.\n')
  process.exit(1)
}
console.log(`✓ no pricing in the built output (${scanned} files scanned, ${FIGURES.length} figures)`)
