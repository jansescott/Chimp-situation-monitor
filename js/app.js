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
    nextRefreshAt = Date.now() + CONFIG.refreshInterval;

    const [newsItems] = await Promise.all([
      fetchAllFeeds(),
      fetchBluesky(),
    ]);

    allNewsItems = newsItems;
    renderNews(currentNewsTab);
    if (currentSocialTab === 'bluesky') renderBluesky();

    // Flash the live badge to signal refresh
    const badge = document.querySelector('.live-badge');
    if (badge) {
      badge.style.background = 'rgba(52,211,153,0.25)';
      setTimeout(() => { badge.style.background = ''; }, 600);
    }
  }, CONFIG.refreshInterval);
});

// ---- Clock & Countdown ----
let nextRefreshAt = Date.now() + CONFIG.refreshInterval;

function updateClock() {
  const now = new Date();
  const timeStr = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  const el = document.getElementById('last-updated-time');
  const footer = document.getElementById('footer-time');
  if (el) el.textContent = timeStr;
  if (footer) footer.textContent = timeStr;

  // Update countdown in footer
  const secsLeft = Math.max(0, Math.round((nextRefreshAt - Date.now()) / 1000));
  const mins = String(Math.floor(secsLeft / 60)).padStart(2, '0');
  const secs = String(secsLeft % 60).padStart(2, '0');
  const cdEl = document.getElementById('refresh-countdown');
  if (cdEl) cdEl.textContent = `${mins}:${secs}`;
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
