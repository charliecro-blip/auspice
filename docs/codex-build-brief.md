# Codex Build Brief — Auspice Static Prototype

## Objective

Build the first static clickable prototype of **Auspice** inside `/prototype`.

Auspice is a rhythm-aware astrological planning assistant. It helps users understand the quality of the current time, choose what fits now, and orient their week without turning life into a productivity machine.

Core product question:

> Given the quality of time and the shape of my life, what belongs here?

Core phrase:

> Move with time, instead of forcing yourself through it.

## Important Product Guardrails

Auspice is **not** a productivity optimizer.

Do not make the prototype feel like Asana, Todoist, Motion, Reclaim, or a hustle dashboard.

The app should not:

- fill every open slot
- pressure the user to do more
- use productivity scores
- frame rest as failure
- make astrology deterministic
- create fear around imperfect timing
- imply every task needs a perfect election

The app should:

- suggest rather than command
- orient rather than optimize
- offer 2–4 fitting options
- always include a gentler version
- make rest, cleanup, incubation, and home care feel legitimate
- treat timing as symbolic support, not fate
- feel like a living almanac, not a task grinder

## Repository Context

Use these files as source context:

- `README.md`
- `docs/product-spec.md`
- `docs/ui-wireframe-spec.md`
- `docs/source-audit.md`
- `docs/source-library.md`
- `research/robson-electional-extraction.md`
- `rules/auspice-seed-rules-v1.json`

The seed rules file is the canonical source for:

- product language
- planetary families
- election levels
- event categories
- symbolic start types
- Moon condition meanings
- planetary hour meanings
- sample tasks

## Build Location

Build inside:

```text
/prototype
```

Do not modify root-level docs unless absolutely necessary.

## Tech Stack

Create a simple React app.

Preferred:

- Vite
- React
- TypeScript if easy, otherwise JavaScript is acceptable
- CSS modules, plain CSS, or Tailwind if already configured by the scaffold

Do not add a backend.
Do not add authentication.
Do not add database persistence.
Do not call astrology APIs.
Do not integrate Google Calendar yet.

Use static/mock data.

## Prototype Scope

Build a single-page app with tab navigation:

1. **Today**
2. **Week**
3. **Tasks**
4. Optional: **Find a Time** as a simple stub or lightweight flow

The prototype should feel complete enough to click around, but it does not need real calculations.

## Data Requirements

Import or copy relevant data from:

```text
../rules/auspice-seed-rules-v1.json
```

If importing from outside `/prototype` is awkward, copy a trimmed version into:

```text
/prototype/src/data/seedRules.json
```

Also create mock astrology data in something like:

```text
/prototype/src/data/mockTimeWeather.ts
```

Mock current moment:

```json
{
  "date": "Friday, May 22",
  "location": "Austin, TX",
  "time": "11:18am",
  "dayPhrase": "A day for sorting before visibility.",
  "currentPlanetaryHour": "Mercury",
  "moonSign": "Virgo",
  "moonPhase": "Waxing",
  "moonCondition": "Moon applying to Jupiter",
  "voidOfCourse": false,
  "localAngularity": "Mercury near the Midheaven at 11:42am",
  "tone": "clarify, write, sort, prepare to be seen"
}
```

Mock next windows:

```json
[
  {
    "time": "11:40am–12:25pm",
    "title": "Mercury near MC",
    "bestFor": ["recording", "writing", "teaching", "calls"],
    "caution": "Keep the message clear rather than trying to cover everything."
  },
  {
    "time": "1:10pm–2:05pm",
    "title": "Moon begins a void period",
    "bestFor": ["review", "cleanup", "rest", "loose ends"],
    "caution": "Not the cleanest window for major beginnings."
  },
  {
    "time": "4:20pm–5:15pm",
    "title": "Venus hour",
    "bestFor": ["design", "soft outreach", "relational repair"],
    "caution": "Better for softening than forcing a hard boundary."
  }
]
```

Use prototype tasks from `rules/auspice-seed-rules-v1.json`.

## UI Requirements

### Overall Feel

The app should feel:

- quiet
- spacious
- elegant
- celestial but practical
- soft but not vague
- more almanac than dashboard
- more ritual planner than productivity app

Use muted colors, generous spacing, rounded cards, subtle gradients, and clear hierarchy.

Avoid red error-like warnings. Cautions should feel gentle.

### App Shell

Include:

- app name: Auspice
- short tagline: “Move with time, instead of forcing yourself through it.”
- tab navigation
- main content area

## Screen 1: Today

The Today screen should include:

### 1. Header

Example:

```text
Friday, May 22
Austin, TX · 11:18am
A day for sorting before visibility.
```

### 2. Current Time Weather Card

Show:

- Mercury Hour
- Moon applying to Jupiter
- Moon in Virgo, waxing
- Mercury near the Midheaven soon
- short interpretation
- best-for chips
- gentle caution

Example copy:

```text
This is a good window for language, planning, study, and messages with a little more confidence behind them.

Best for: writing, email, study, outlining, teaching prep
Move gently around: overcommitting, making the task too big
```

### 3. What Now Card

Include a prominent button or section called:

```text
What now?
```

When clicked, show 2–4 recommendations from the mock task list.

Example:

```text
Best fits right now:

1. Draft Venus in Cancer post
This fits the Mercury/Jupiter tone. Keep it to a rough outline or first section.

2. Send client follow-up email
Good for correspondence and clear, warm language.

3. Study acupuncture notes
This window supports sorting and retention, especially if you focus on one section.

Gentler version:
Open the draft and make a 10-line note list.
```

This does not need a sophisticated scoring engine yet. A static or simple category-based match is fine.

### 4. Next Windows

Show the three mock next windows.

Each window card should include:

- time range
- timing factor title
- best-for chips
- caution

### 5. Today’s Task Matches

Group sample tasks into:

- Fits now
- Better later
- Good for low-traction time

Suggested grouping:

Fits now:

- Draft Venus in Cancer post
- Send client follow-up email
- Study acupuncture notes
- Ask for testimonial

Better later:

- Record reel
- Review website homepage

Good for low-traction time:

- Clean kitchen
- Go for walk / regulate nervous system

## Screen 2: Week

The Week screen should include:

### 1. Week Tone Card

Example:

```text
This week favors preparation before public action. Early week is better for sorting, drafting, and catching up. Midweek has stronger visibility and communication windows. The end of the week asks for simplification and recovery rather than another major push.
```

### 2. Best Uses / Use Care With

Best uses:

- Writing / drafting
- Website refinement
- Client follow-up
- Study consolidation
- Home maintenance

Use care with:

- Overcommitting
- High-stakes launches during void Moon windows
- Delicate relational texts during Mars-heavy periods

### 3. Seven-Day Rhythm Map

Create seven day cards.

Each day should show:

- day name
- tone
- best for
- avoid forcing
- strongest window

Example days:

```text
Monday
Mercury / Saturn tone
Best for: planning, admin, study, cleanup
Avoid forcing: social ease
Strong window: 9:30–11:00am writing/admin

Tuesday
Venus / Moon tone
Best for: client care, design, relationship, home
Avoid forcing: hard confrontation
Strong window: 2:00–3:30pm design/social outreach

Wednesday
Sun / Jupiter tone
Best for: recording, publishing, teaching, visibility
Avoid forcing: too much scope
Strong window: 10:45am–12:15pm content/launch prep
```

Add four more days in the same spirit.

### 4. Suggested Sessions

Show 3–5 session suggestions:

- Writing
- Admin / logistics
- Visibility
- Home / body
- Rest / integration

Each session should include:

- suggested window
- matching tasks
- why it fits
- gentler version

### 5. Not This Week

Include a distinct but gentle card:

```text
Not this week

These may matter, but they do not need to be active right now:

- Rebuild entire website
- Design full course outline
- Make final decision on long-term app architecture

Suggested posture:
Keep them incubating. Choose one small tending step only if there is real space.
```

This is a key philosophical feature.

## Screen 3: Tasks

The Tasks screen should include:

### 1. Capture Bar

Display:

```text
What’s asking for attention?
```

A text input can exist but does not need persistence beyond local component state.

### 2. Task Sections

Group tasks into:

- Active this week
- Incubating
- Waiting
- Released / not this week

Use sample tasks from seed rules.

### 3. Task Cards

Each task card should show:

- title
- category display name
- planetary families
- energy types
- election level
- symbolic start type, if relevant
- gentler version

Actions can be visual buttons only:

- Place this
- Ask when
- Make gentler
- Move to incubating

Buttons do not need full functionality yet, though simple state changes would be nice.

## Screen 4: Find a Time

This can be simple for now.

Include:

- category selector using event categories from seed rules
- date range selector with static options: Today, This week, Next week
- duration selector: 15 min, 30 min, 60 min, 90 min, 2 hr
- mock results for one selected category

Example result for Ask / Request / Pitch:

```text
Best windows for Ask / Request / Pitch

1. Tuesday 2:00–3:30pm — Good
Venus support helps warmth and receptivity. Good for testimonials, social asks, or soft outreach.

2. Wednesday 10:45am–12:15pm — Excellent
Mercury and Jupiter support clear language, confidence, and opportunity. Good for proposals, applications, and important emails.

3. Friday 9:15–10:15am — Workable
Clean practical window, but less symbolic support. Keep the request simple and specific.
```

Include a note:

```text
This does not need a perfect election. A supportive window is enough unless the stakes are truly high.
```

## Implementation Notes

### Suggested File Structure

Inside `/prototype`:

```text
package.json
index.html
src/
  main.tsx or main.jsx
  App.tsx or App.jsx
  styles.css
  data/
    seedRules.json
    mockTimeWeather.ts
    mockWeek.ts
  components/
    AppShell.tsx
    TimeWeatherCard.tsx
    WhatNowCard.tsx
    WindowCard.tsx
    TaskCard.tsx
    DayRhythmCard.tsx
    SuggestedSessionCard.tsx
    FindTimeView.tsx
```

Use fewer files if speed matters, but keep the code clear.

### Data / Logic

No real astrological computation required.

A simple helper can map current planetary hour to recommended task families:

- Mercury → writing/study, email, admin, ask/request/pitch
- Venus → design, social/relationship, client care
- Mars → movement, errands, boundaries
- Jupiter → launch/publish, teaching, requests to authority, business development
- Saturn → admin/logistics, cleaning, study discipline, maintenance
- Moon → rest, home, care, food, emotional processing
- Sun → visibility, content recording, leadership

### Accessibility

Use readable contrast, semantic headings, and buttons. Do not rely only on glyphs/icons.

## Deliverable

A runnable static React prototype in `/prototype`.

Include a short `/prototype/README.md` update with:

- how to install
- how to run locally
- what is mocked
- what to build next

## Acceptance Criteria

The prototype is successful if:

- it runs locally
- Today / Week / Tasks are clickable
- What Now reveals useful suggestions
- Week view shows a clear rhythm map
- Tasks show category/timing metadata
- Find a Time exists at least as a simple mocked flow
- visual design feels spacious and calm
- copy avoids productivity pressure
- rest and “Not This Week” are treated as first-class

## Do Not Build Yet

Do not implement:

- ephemeris calculations
- planetary hour calculations
- Moon calculations
- Google Calendar integration
- Notion integration
- auth
- persistence
- payments
- subscriptions
- backend

## Final Note

Favor a working, elegant, static prototype over a complex unfinished architecture. The first goal is to prove the feeling of Auspice, not the full astrology engine.
