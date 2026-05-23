const seedTasks = [
  {
    text: "Draft Venus in Cancer post",
    category: "Writing",
    timing: "This week",
    energy: "Deep focus",
    source: "Manual"
  },
  {
    text: "Send client follow-up email",
    category: "Admin",
    timing: "Today",
    energy: "Light",
    source: "Manual"
  },
  {
    text: "Ask for testimonial",
    category: "Outreach",
    timing: "This week",
    energy: "Steady",
    source: "Capture"
  },
  {
    text: "Review website homepage",
    category: "Review",
    timing: "This week",
    energy: "Medium",
    source: "Manual"
  },
  {
    text: "Study acupuncture notes",
    category: "Study",
    timing: "Today",
    energy: "Deep focus",
    source: "Capture"
  },
  {
    text: "Go for walk / regulate nervous system",
    category: "Body",
    timing: "Today",
    energy: "Low",
    source: "Capture"
  },
  {
    text: "Clean kitchen",
    category: "Home",
    timing: "Any low-traction",
    energy: "Low",
    source: "Capture"
  },
  {
    text: "Record reel",
    category: "Visibility",
    timing: "This week",
    energy: "Steady",
    source: "Manual"
  }
];

const state = {
  capture: `write Venus post\nemail client back\nclean kitchen\nstudy points\nwalk\nask for testimonial\nschedule dentist\nrecord reel if energy`,
  captureItems: [],
  selectedFilters: new Set()
};

const content = document.getElementById("content");
const tabs = document.querySelectorAll(".tab");

function escapeHtml(input) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function inferMetadata(line) {
  const lower = line.toLowerCase();
  const entry = {
    text: line,
    category: "General",
    timing: "Unplaced",
    energy: "Medium",
    source: "Capture",
    confidence: "light"
  };

  if (/email|reply|follow-up|message/.test(lower)) entry.category = "Admin";
  if (/write|draft|post/.test(lower)) entry.category = "Writing";
  if (/study|notes|review/.test(lower)) entry.category = "Study";
  if (/walk|rest|regulate/.test(lower)) entry.category = "Body";
  if (/clean|kitchen|home/.test(lower)) entry.category = "Home";
  if (/record|reel|publish/.test(lower)) entry.category = "Visibility";
  if (/testimonial|ask|reach out/.test(lower)) entry.category = "Outreach";

  if (/today|now|asap/.test(lower)) entry.timing = "Today";
  else if (/tomorrow/.test(lower)) entry.timing = "Tomorrow";
  else if (/week|later/.test(lower)) entry.timing = "This week";

  if (/if energy|low energy|gentle/.test(lower)) entry.energy = "Low";
  else if (/deep|study|draft/.test(lower)) entry.energy = "Deep focus";
  else if (/quick|email|message/.test(lower)) entry.energy = "Light";

  const matched = /(email|reply|write|draft|study|walk|clean|record|testimonial|today|tomorrow|week)/.test(lower);
  entry.confidence = matched ? "clear" : "light";
  return entry;
}

function card(title, body) {
  return `<section class="card"><h3>${title}</h3>${body}</section>`;
}

tabs.forEach((tab) => tab.addEventListener("click", () => {
  tabs.forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");
  render(tab.dataset.tab);
}));

function renderCapture() {
  const chipOptions = ["Today", "This week", "Low", "Deep focus", "Home", "Outreach"];
  content.innerHTML = `<div class="grid two">
    ${card("Capture Dump", `<p>What's asking for attention?</p><p class="muted">Dump it here. You do not have to organize it yet.</p><textarea id="captureInput">${escapeHtml(state.capture)}</textarea><div class="chips selectable" id="filterChips">${chipOptions.map((c) => `<button type='button' class='chip toggle-chip ${state.selectedFilters.has(c) ? "selected" : ""}' data-chip='${c}'>${c}</button>`).join("")}</div><button class="primary" id="addBtn">Refresh preview</button>`) }
    ${card("Parsed Preview", `<div id="preview"></div><p class="small muted">Simple inference (mock): category, timing, energy, and confidence. You can keep this lightweight and adjust later.</p><p class="small muted">Future sources: Google Calendar, Notion, Apple Notes (not connected yet)</p>`)}
  </div>`;

  const text = document.getElementById("captureInput");
  const preview = document.getElementById("preview");
  const addBtn = document.getElementById("addBtn");
  const filterChips = document.getElementById("filterChips");

  const renderCards = () => {
    const lines = text.value.split("\n").map((x) => x.trim()).filter(Boolean);
    const items = lines.map(inferMetadata);
    const activeFilters = Array.from(state.selectedFilters);
    const filteredItems = activeFilters.length
      ? items.filter((item) => activeFilters.some((f) => [item.timing, item.energy, item.category].includes(f)))
      : items;

    preview.innerHTML = filteredItems.map((item) => `<article class='preview-card'>
      <p class='preview-title'>${escapeHtml(item.text)}</p>
      <div class='chips'>
        <span class='chip'>${item.category}</span>
        <span class='chip'>${item.timing}</span>
        <span class='chip'>${item.energy}</span>
        <span class='chip muted-chip'>${item.confidence} inference</span>
      </div>
    </article>`).join("") || "<p class='muted small'>No items match selected chips.</p>";
    state.captureItems = items;
  };

  filterChips.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.dataset.chip) return;
    const value = target.dataset.chip;
    if (state.selectedFilters.has(value)) state.selectedFilters.delete(value);
    else state.selectedFilters.add(value);
    renderCapture();
  });

  text.addEventListener("input", renderCards);
  addBtn.addEventListener("click", renderCards);
  renderCards();
}

function renderTasks() {
  const taskRows = seedTasks.map((task) => `<article class='task-row'>
    <p class='preview-title'>${task.text}</p>
    <div class='chips'>
      <span class='chip source-chip'>${task.source}</span>
      <span class='chip'>${task.category}</span>
      <span class='chip'>${task.timing}</span>
      <span class='chip'>${task.energy}</span>
    </div>
  </article>`).join("");
  content.innerHTML = `${card("Task Pool (Mock)", `<p class='muted'>Tasks with source badges and quick metadata for category + timing.</p>${taskRows}<p class='small muted'>Later: one-tap match to a supportive window, without turning this into a heavy dashboard.</p>`)} `;
}

function renderFind() {
  content.innerHTML = `<div class='grid two'>
  ${card("Find a Time", `<p>Choose a category and energy level to get mock, category-aware windows.</p>
    <div class='chips'>
      <span class='chip'>Category: Outreach</span><span class='chip'>Energy: Steady</span><span class='chip'>Avoid: Moon void</span>
    </div>
    <p><strong>Intent:</strong> Ask for testimonial (Meaningful beginning)</p>
    <p><strong>Symbolic start:</strong> Open notes, write 2-line warm ask, then send.</p>`) }
  ${card("Best Available Windows (Mock)", `<ol class='list'>
      <li><strong>Today 4:20pm–5:15pm · Venus hour</strong><br/><span class='small'>Best for relational outreach and thoughtful tone.</span></li>
      <li><strong>Sunday 10:10am–10:45am · Mercury/Jupiter blend</strong><br/><span class='small'>Clear ask with optimism and less urgency.</span></li>
      <li><strong>Tuesday 11:00am–11:35am · Visibility support</strong><br/><span class='small'>Good backup for sharing/public-facing follow through.</span></li>
    </ol><p class='small muted'>Good enough beats perfect. Draft now, then send in the next supportive window.</p>`)}
  </div>`;
}

function renderWeek() {
  content.innerHTML = `${card("Week of May 25–31", `<p>A week for preparation, visibility, and careful pacing.</p><p class='muted small'>Early week favors sorting and drafting. Midweek has stronger communication windows. End the week with simplification and recovery rather than another hard push.</p>`) }
  <div class="grid two" style="margin-top:1rem;">
    ${card("Weekly Rhythm Map", `<p><strong>Mon:</strong> planning/admin/study · protect social energy</p><p><strong>Tue:</strong> writing and structure · 9:00–10:30 strong drafting window</p><p><strong>Wed:</strong> visibility and outreach · 11:00–12:00 publish window</p><p><strong>Thu:</strong> cleanup and integration</p><p><strong>Fri:</strong> relationship and repair</p><p><strong>Sat:</strong> home/body tending</p><p><strong>Sun:</strong> rest + prepare next week lightly</p>`) }
    ${card("Suggested Sessions", `<ul class='list'>
      <li>Writing: Tue 9:00–10:30am <button class='ghost'>Place on calendar (mock)</button></li>
      <li>Admin: Mon 2:00–3:00pm <button class='ghost'>Place on calendar (mock)</button></li>
      <li>Visibility: Wed 11:00am–12:00pm <button class='ghost'>Place on calendar (mock)</button></li>
    </ul><p class='small muted'><strong>Not This Week:</strong> Rebuild full website, final app architecture decisions.</p>`) }
  </div>`;
}

function renderToday() {
  content.innerHTML = `<div class="grid two">
    ${card("Friday, May 22", `<p class="muted">Austin, TX · 11:18am</p><p>A day for sorting before visibility.</p>`)}
    ${card("Current Time Weather", `<p><strong>Mercury Hour</strong> · Moon applying to Jupiter · Moon in Virgo, waxing</p><p class="small">Mercury near the Midheaven at 11:42am. This is a good window for language, planning, study, and messages with a little more confidence behind them.</p><div class="chips"><span class="chip">writing</span><span class="chip">email</span><span class="chip">study</span><span class="chip">teaching prep</span></div><p class="small muted">Move gently around: overcommitting, making the task too big.</p>`)}
    ${card("What Now", `<ol class="list"><li>Draft Venus in Cancer post</li><li>Send client follow-up email</li><li>Study acupuncture notes</li><li>Take a 20-minute walk for nervous system regulation</li></ol><p class="small muted"><strong>Gentler version:</strong> Open one draft and make a 10-line note list.</p>`)}
    ${card("Coming Up", `<p><strong>11:40am–12:25pm</strong> · Mercury near MC<br/>Good for recording, writing, teaching, calls.</p><p><strong>1:10pm–2:05pm</strong> · Moon begins a void period<br/>Better for review, cleanup, rest, loose ends.</p><p><strong>4:20pm–5:15pm</strong> · Venus hour<br/>Better for design, soft outreach, relational repair.</p>`)}
    ${card("Today's Task Matches", `<p><strong>Fits now:</strong> Draft Venus post, client follow-up, study notes</p><p><strong>Better later:</strong> Record reel, relationship text</p><p><strong>Low-traction window:</strong> Clean kitchen, review notes, rest</p>`)}
  </div>`;
}

function render(tab) { ({ today: renderToday, capture: renderCapture, week: renderWeek, tasks: renderTasks, find: renderFind }[tab] || renderToday)(); }
render("capture");
