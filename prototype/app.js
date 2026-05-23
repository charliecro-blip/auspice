const seedTasks = [
  "Draft Venus in Cancer post",
  "Send client follow-up email",
  "Ask for testimonial",
  "Review website homepage",
  "Study acupuncture notes",
  "Go for walk / regulate nervous system",
  "Clean kitchen",
  "Record reel"
];

const state = {
  capture: `write Venus post\nemail client back\nclean kitchen\nstudy points\nwalk\nask for testimonial\nschedule dentist\nrecord reel if energy`,
  captureItems: []
};

const content = document.getElementById("content");
const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => tab.addEventListener("click", () => {
  tabs.forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");
  render(tab.dataset.tab);
}));

function card(title, body) {
  return `<section class="card"><h3>${title}</h3>${body}</section>`;
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

function renderCapture() {
  const chips = ["today", "this week", "low energy", "deep focus", "home", "asks"];
  content.innerHTML = `<div class="grid two">
    ${card("Capture Dump", `<p>What's asking for attention?</p><p class="muted">Dump it here. You do not have to organize it yet.</p><textarea id="captureInput">${state.capture}</textarea><div class="chips">${chips.map((c)=>`<span class='chip'>${c}</span>`).join("")}</div><button class="primary" id="addBtn">Add to Unplaced</button>`)}
    ${card("Parsed Preview", `<div id="preview"></div><p class="small muted">Sort Later actions (mock): Match to Time · Add Tags · Park for Next Week</p><p class="small muted">Future sources: Google Calendar, Notion, Apple Notes (not connected yet)</p>`)}
  </div>`;

  const text = document.getElementById("captureInput");
  const preview = document.getElementById("preview");
  const addBtn = document.getElementById("addBtn");
  const parse = () => {
    const lines = text.value.split("\n").map((x) => x.trim()).filter(Boolean);
    preview.innerHTML = lines.map((line) => `<p class='card small' style='margin:0 0 .5rem 0;'>${line}</p>`).join("");
    state.captureItems = lines;
  };
  text.addEventListener("input", parse);
  addBtn.addEventListener("click", parse);
  parse();
}

function renderWeek() {
  content.innerHTML = `${card("Week of May 25–31", `<p>A week for preparation, visibility, and careful pacing.</p><p class='muted small'>Early week favors sorting and drafting. Midweek has stronger communication windows. End the week with simplification and recovery rather than another hard push.</p>`)}
  <div class="grid two" style="margin-top:1rem;">
    ${card("Weekly Rhythm Map", `<p><strong>Mon:</strong> planning/admin/study · protect social energy</p><p><strong>Tue:</strong> writing and structure · 9:00–10:30 strong drafting window</p><p><strong>Wed:</strong> visibility and outreach · 11:00–12:00 publish window</p><p><strong>Thu:</strong> cleanup and integration</p><p><strong>Fri:</strong> relationship and repair</p><p><strong>Sat:</strong> home/body tending</p><p><strong>Sun:</strong> rest + prepare next week lightly</p>`)}
    ${card("Suggested Sessions", `<ul class='list'><li>Writing: Tue 9:00–10:30am or Wed 8:30–10:00am</li><li>Admin: Mon 2:00–3:00pm</li><li>Visibility: Wed 11:00am–12:00pm</li></ul><p class='small muted'><strong>Not This Week:</strong> Rebuild full website, final app architecture decisions.</p>`)}
  </div>`;
}

function renderTasks() {
  content.innerHTML = `${card("Task Pool (Mock)", `<p class='muted'>Manual tasks tagged by category, energy, and timing level.</p>${seedTasks.map((t)=>`<p class='card small' style='margin:.5rem 0;'>${t}</p>`).join("")}<p class='small muted'>Each task can later be matched to a supportive window. No pressure to schedule everything.</p>`)} `;
}

function renderFind() {
  content.innerHTML = `<div class='grid two'>
  ${card("Find a Time", `<p>Choose a task type and get best-available windows.</p><p><strong>Intent:</strong> Ask for testimonial (Meaningful beginning)</p><p><strong>Symbolic start:</strong> Send message</p><div class='chips'><span class='chip'>Mercury/Venus window</span><span class='chip'>Avoid Moon void if possible</span></div>`)}
  ${card("Best Available Windows (Mock)", `<ol class='list'><li><strong>Today 4:20pm–5:15pm (Venus hour)</strong><br/><span class='small'>Warm tone for requests and relational openness.</span></li><li><strong>Tomorrow 10:10am–10:45am (Mercury/Jupiter blend)</strong><br/><span class='small'>Clear ask + confidence without force.</span></li></ol><p class='small muted'>Good enough beats perfect. If neither works, draft now and send in the next supportive window.</p>`)}
  </div>`;
}

function render(tab) {
  ({ today: renderToday, capture: renderCapture, week: renderWeek, tasks: renderTasks, find: renderFind }[tab] || renderToday)();
}

render("today");
