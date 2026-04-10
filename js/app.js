// ============================================================
// CHIMP CONFLICT MONITOR — Main Application Coordinator
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize all modules
  initMap();
  initCharts();
  renderTimeline();
  renderResources();
  updateClock();

  // Start async data fetches (non-blocking)
  initNews();
  initSocial();

  // Start clock updates
  setInterval(updateClock, 1000);

  // Auto-refresh data every 5 minutes
  setInterval(async () => {
    const items = await fetchAllFeeds();
    allNewsItems = items;
    renderNews(currentNewsTab);

    await fetchBluesky();
    if (currentSocialTab === 'bluesky') renderBluesky();
  }, CONFIG.refreshInterval);
});

// ---- Clock ----
function updateClock() {
  const now = new Date();
  const timeStr = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  const el = document.getElementById('last-updated-time');
  const footer = document.getElementById('footer-time');
  if (el) el.textContent = timeStr;
  if (footer) footer.textContent = timeStr;
}

// ---- Timeline ----
function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;

  container.innerHTML = TIMELINE_EVENTS.map(event => `
    <div class="timeline-event">
      <div class="timeline-year-col">
        <div class="timeline-dot ${event.type}"></div>
      </div>
      <div class="timeline-content">
        <div class="timeline-header">
          <span class="timeline-year">${event.year}</span>
          <span class="timeline-badge ${event.type}">${event.type.toUpperCase()}</span>
        </div>
        <div class="timeline-title">${event.title}</div>
        <div class="timeline-body">${event.body}</div>
      </div>
    </div>
  `).join('');
}

// ---- Research Resources ----
function renderResources() {
  const grid = document.getElementById('resources-grid');
  if (!grid) return;

  grid.innerHTML = RESEARCH_RESOURCES.map(r => `
    <div class="resource-card">
      <div class="resource-card-header">
        <span class="resource-icon">${r.icon}</span>
        <div>
          <div class="resource-title">${r.title}</div>
          <div class="resource-authors">${r.authors}</div>
        </div>
      </div>
      <div class="resource-desc">${r.desc}</div>
      <a class="resource-link" href="${r.link}" target="_blank" rel="noopener noreferrer">
        ${r.linkLabel} &#x2197;
      </a>
    </div>
  `).join('');
}
