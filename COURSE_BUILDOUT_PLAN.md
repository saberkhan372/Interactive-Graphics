# Interactive Graphics — Course Buildout Plan

*Drafted 2026-07-01. Goal: turn the site from a well-designed shell with 8 good tools into a course someone could actually teach or take.*

**The gap this plan closes:** the archive at `02_Teaching-Courses/Interactive Graphics (Dalton 2022-2024)/` holds ~40 slide decks, 12+ assignments, and a granular day-to-day planner. The site began with about one paragraph per unit. Everything below is porting, distilling, and filling holes; almost no invention is required.

---

## Phase 1 — Assignments ✅ DONE 2026-07-01

*Shipped: `assignments/` with an index + 9 pages, "Assignments" added to every page's nav, assignment links added to unit pages. Notes: the "Applesoft BASIC A/B" docs turned out to be the teacher's Tennis for Two exemplar and are folded into Animating History; "Intro to WebGL with p5.js" turned out to be a lesson roadmap, not an assignment, and moved to Phase 3 source material. A private Google Doc link was deliberately omitted from the public Game Boy page; the guest section covers the public MeenaKo material instead.*

Port the real assignment docs into assignment pages, each with: brief → requirements checklist → linked tool → source credit. New site section: `assignments/`, plus each unit page links its assignments.

| Assignment page | Source file(s) | Unit |
|---|---|---|
| Class Logo | `Class logo assignment.docx` | 0/1 |
| BASIC Animation | `IG - BASIC animation - Unit 1 Final Project Checklist.docx` | 1 |
| Animating History with BASIC | `Assignment 1 - Animating History with BASIC.docx` + relevant Applesoft BASIC exemplar material | 1 |
| Converting to p5.js | `Assignment 2 - Converting to p5.js.docx` | 2 |
| 3D Wireframe | `Assignment - 3D wireframe.docx` | 3 |
| 3D Scene with WebGL | versions A, B, and Google-Doc draft C — merge into one canonical brief | 4 |
| 3D Simulation with WebGL | `Assignment - 3D simulation with WebGL.docx` | 4 |
| Scene for Game Boy | `Assignment - Scene for GameBoy.docx` | 5 |
| Portfolio Site | `Assignment - Portfolio Site.docx` | course-wide |

Notes:
- A/B/C versions: read all, merge into one best version, note "as assigned 2022–23 / 2023–24" only where the difference matters (same rule as the unit structure).
- Extraction: `docx` → text via python-docx (or the docx skill) in the existing venv.
- Voice check: briefs stay in Saber's instructional register (direct "you," concrete numbers, no filler).

**Deliverable shipped:** `assignments/index.html` + 9 assignment pages, unit pages updated with assignment links.

## Phase 2 — Fill the two known holes ✅ DONE 2026-07-01

- [x] `0.2 - History of Graphics.pptx` (54.8 MB) → filed into Unit 0, 2022-23. **Unit 0's sequence 0.0–0.7 is now complete.**
- [x] `IG 3.1 -  Intro to GB Studio.pptx` (16.8 MB) → filed into Unit 3, 2022-23.

*Saber also re-downloaded three decks that turned out to be byte-identical (MD5) to copies already in place — parked in the archive's `_duplicates_safe_to_delete/`, his to empty. Index CSV updated to 68 files; README recovery notes closed out. Phase 3 is now fully unblocked, including lesson 0.2.*

## Phase 3 — Lesson pages from the decks ✅ DONE 2026-07-01

*Shipped 2026-07-01: all six unit indexes now point to lesson pages. Units 0-5 account for 34 public lesson pages, with the GB Studio branch separated cleanly into Unit 5 and private planning links omitted.*

Convert each numbered deck into a lesson page, giving every unit a real table of contents: **lessons → tool → assignment**.

- Extract text/structure from `.pptx` via python-pptx; images reviewed case-by-case (no student faces/names — same privacy bar as everything else).
- One page per lesson, kept short: what the class did, the key idea, code shown, and a "run it yourself" link to the relevant tool where one exists.
- Sequences: Unit 0 (0.0-0.7, including Processing visit) ✅ DONE, Unit 1 (1.0-1.6, with duplicate 1.1 folded into 1.0) ✅ DONE, Unit 2 (2.0-2.2 + the Tomo Wa 3D-rectangle doc) ✅ DONE, Unit 3 (2023-24 wireframe/pipeline docs) ✅ DONE, Unit 4 (IG 3.0-3.10 WebGL sequence, with GB Studio decks deferred to Unit 5) ✅ DONE, Unit 5 (GB Studio branch) ✅ DONE.
- Unit pages become indexes of their lessons instead of single paragraphs.

**Suggested order:** Phase 5 teaching apparatus next if course runnability is the priority; Phase 6 polish if publish speed is the priority.

**Deliverable shipped:** `units/<unit>/lessons/<nn>-<slug>.html` across all six units, rewritten unit index pages, 34 lesson pages total.

## Phase 4 — Two new tools ✅ DONE 2026-07-01

1. **Pixel Algorithm Playground** (Unit 0) ✅ DONE 2026-07-01 — shipped at `tools/pixel-algorithm-playground/`: 28×18 grid, 5 preset rules + write-your-own expression editor (bare math names, live error handling that keeps the last good rule), 5 era-authentic palettes (1-bit / Apple II artifact / NES / Game Boy DMG / course theme), animate-with-t toggle, live code panel. Wired into the tools index and the Unit 0 page. Verified live: presets, palette switching (DMG greens pixel-exact), custom rules, error path, and animation (stepped manually — headless preview tabs suspend rAF, so animation was proven via redraw(30) pixel sampling).
2. **Camera & Perspective Lab** (IG 3.7/3.8) ✅ DONE 2026-07-01 — shipped at `tools/camera-perspective-lab/`: rendered scene + top-down camera/frustum diagram, orbit/distance/height controls, FOV and near/far clipping controls, perspective vs. orthographic toggle, live camera/projection code panel. Wired into the tools index, Unit 4 page, and Lesson 4.7.

Both follow the established pattern: single self-contained HTML, shared theme, Try/Notice/Remix in course voice, live code panel, verified in-browser before "done."

Deferred candidate: UV/texture-mapping mini-tool (IG 3.6) — only if the first two land well.

## Phase 5 — Teaching apparatus ✅ DONE 2026-07-02

1. **Teacher's Guide** ✅ DONE 2026-07-02 — shipped at `teach/index.html`: a runnable guide distilled from the 2023–24 Day-to-Day Planner and the 2022–23 by-the-numbers log. Includes 19-week / 38–51 meeting pacing, setup checklist, warm-up question bank, what actually slips, per-unit teaching notes, assessment rhythm, and source/privacy boundaries.
2. **"How we use AI in this course"** ✅ DONE 2026-07-02 — shipped at `teach/ai-integrity.html`: an AI-era integrity page grounded in the original honor-code handout and the 2024 course policy language. Names the January 2024 ChatGPT BASIC-vs-p5.js comparison as an object of critique, not an authority. Frames the policy around what students keep when the machine can write code.

The new `teach/` section is wired into global navigation and the homepage.

## Review pass (Claude, 2026-07-02)

*Independently verified Codex's Phases 3–5 work: extracted all 35 source decks myself and fact-checked sample lesson pages against them (0.2 timeline item-for-item accurate; 1.5's "High Graphics Mode" page title correctly taken from slide content over the misleading filename); swept every deck for private content and confirmed none leaked to public pages (Saber's family details in deck 0.2 slide 2, student organizer names in the CC Fest slides, and the Day-to-Day Planner all stayed out); verified the Camera Lab live (no console errors, no p5 name collisions, orthographic/perspective toggle geometrically correct in both the render and the frustum diagram); crawled all 69 linked pages, 779 internal links, zero broken. One defect found and fixed: 13 lesson pages had literal markdown backticks rendering as text — converted to `<code>` tags. Preview port moved to 8899 in `.claude/launch.json` to stop colliding with Codex's dev server on 8743.*

## Phase 6 — Connective tissue and polish ✅ DONE 2026-07-02

- **Tool context strips** ✅ — every one of the 10 tool pages now carries a `.tool-context` strip (shared CSS in ig-theme): unit link, lesson link(s), related assignment, and suggested in-class use length. This also covers the "per-tool teacher notes" item.
- **Next/previous navigation** ✅ — all 6 unit indexes got prev/next unit navs (Unit 0 ← All units; Unit 5 → Teacher's Guide), and each unit's last lesson now hops to the next unit instead of dead-ending (Unit 5's last lesson → the Journey page).
- **Twin Panels presets** ✅ — the tool now carries three real archive sketches: the planner's bouncing ball (step-driven as before), Shiffman's fractal tree in BASIC (GOSUB stack ↔ p5 recursion, angle/shrink sliders, gentle sway when running), and Tomo Wa's rotating 3D rectangle — including the authentic AppleSoft radians quirk (angles 0/90/179/269 land unevenly; kept faithfully and explained). Controls relabel per preset; twin code cards show the real BASIC with paired-line highlighting; the bottom panel emits a full runnable p5 translation.
- **Journey page** ✅ — `journey/index.html`: both years as a color-coded timeline (course moments / due dates / guests) with real dates from the logs, semester by-the-numbers card, the ChatGPT moment, and links into assignments/lessons/tools. "Journey" added to global nav on all 69 pages.

*Verified live: all three Twin Panels presets pixel-sampled (tree 6,312 gold px, rect 2,598), zero console errors anywhere, full crawl 70 pages / 915 internal links / 0 broken.*

*Corrections (Saber caught both, 2026-07-02): (1) the Pixel Algorithm Playground's context strip had no assignment item — fixed by creating the missing `assignments/personal-pixel-algorithm.html` page from the deck 0.4 brief (graph-paper design + numbered human-followable algorithm, due Sept 22) and linking it from the strip, the assignments index (10 cards now), and the Unit 0 page. (2) Lesson 5.3's top nav was missing Journey — the nav script's already-done guard had been fooled by that page's boundary-hop link to Journey; fixed. Re-verified: all 71 pages carry Journey in nav, all 10 tool strips have all four items, full crawl 71 pages / 929 links / 0 broken.*

## Gated / later

- **Student work gallery** — only with explicit consent per piece; the archive notes one student project video still in Drive. Until consent exists, nothing ships. (Standing privacy rule: no names, grades, feedback, or roster data anywhere public.)
- **Publish** — GitHub Pages under the CC Fest precedent. Phases 1–5 now make the site worth announcing and runnable by another teacher.

---

## Working rules (carried over from the build so far)

- Zero-build stays: every page is a self-contained HTML file linking `assets/ig-theme.css`.
- Design system is settled — tokens in `ig-theme.css`, era graphics via `assets/era-graphics.js`, styleguide page is the reference.
- Everything verified live in-browser before called done (console + pixel/content checks, not just screenshots).
- Voice: instructional copy says "you"; origin/narrative says "I"; numbers are real and specific; no emoji; `→ · ×` do the pointing.

## Suggested sequence

| Order | Phase | Effort | Blocked by |
|---|---|---|---|
| 1 | Phase 1 — assignments | ~a day | nothing |
| 2 | Phase 2 — two Drive files | 5 min (Saber) | nothing |
| 3 | Phase 4 — Pixel Algorithm Playground | ~half day | nothing |
| 4 | Phase 3 — lesson pages | done | shipped |
| 5 | Phase 4 — Camera Lab | done | shipped |
| 6 | Phase 5 — teacher guide + AI page | done | shipped |
| 7 | Phase 6 — polish | next | phases above |

## Decisions (Saber, 2026-07-01)

1. **Assignments:** merge A/B/C drafts into one canonical version per assignment.
2. **Lesson pages:** short summaries (~200 words + code + tool link), not full deck reconstructions.
3. **Domain:** the site gets its own domain under the "Interactive Graphics" name (à la ccfest.rocks). Exact domain TBD at publish time.
4. **Student video:** dropped from the plan entirely.
