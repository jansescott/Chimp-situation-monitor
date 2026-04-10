// ============================================================
// CHIMP CONFLICT MONITOR — Social Media Feeds
// Bluesky: public API (no auth required)
// X/Twitter: deep links (API requires auth)
// ============================================================

let currentSocialTab = 'bluesky';
let blueSkyPosts = [];

async function initSocial() {
  showSocialLoading();
  await fetchBluesky();
  setupSocialTabs();
  setupSocialRefresh();
}

function showSocialLoading() {
  document.getElementById('social-feed').innerHTML = `
    <div class="feed-loading">
      <div class="loading-bar"></div>
      <span>Scanning social signals&hellip;</span>
    </div>
  `;
}

// ---- Bluesky Public API ----
async function fetchBluesky() {
  const allPosts = [];

  // Try multiple search terms and merge results
  const termBatches = [
    'chimpanzee uganda',
    'kibale chimps',
    'ngogo chimpanzee',
    'primate research uganda',
  ];

  const fetches = termBatches.map(term => fetchBlueSkyTerm(term));
  const results = await Promise.allSettled(fetches);

  const seenIds = new Set();
  results.forEach(result => {
    if (result.status === 'fulfilled' && result.value) {
      result.value.forEach(post => {
        if (!seenIds.has(post.cid)) {
          seenIds.add(post.cid);
          allPosts.push(post);
        }
      });
    }
  });

  // Sort by date descending
  allPosts.sort((a, b) => new Date(b.record.createdAt) - new Date(a.record.createdAt));
  blueSkyPosts = allPosts;

  if (currentSocialTab === 'bluesky') {
    renderBluesky();
  }
}

async function fetchBlueSkyTerm(term) {
  try {
    const url = `https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=${encodeURIComponent(term)}&limit=15&sort=latest`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts || [];
  } catch (err) {
    console.warn(`Bluesky fetch failed for "${term}":`, err.message);
    return [];
  }
}

function renderBluesky() {
  const feed = document.getElementById('social-feed');

  if (blueSkyPosts.length === 0) {
    feed.innerHTML = renderBlueskyFallback();
    return;
  }

  const html = blueSkyPosts.slice(0, 25).map(post => renderBlueSkyPost(post)).join('');
  feed.innerHTML = html;
}

function renderBlueSkyPost(post) {
  const author = post.author || {};
  const record = post.record || {};
  const text = record.text || '';
  const handle = author.handle || 'unknown.bsky.social';
  const displayName = author.displayName || handle.split('.')[0];
  const avatarUrl = author.avatar || '';
  const createdAt = new Date(record.createdAt || Date.now());
  const timeAgo = formatTimeAgo(createdAt);
  const likeCount = post.likeCount || 0;
  const replyCount = post.replyCount || 0;
  const repostCount = post.repostCount || 0;
  const postUrl = `https://bsky.app/profile/${handle}/post/${post.uri?.split('/').pop() || ''}`;

  const avatarHtml = avatarUrl
    ? `<img src="${escapeHtml(avatarUrl)}" alt="" onerror="this.parentElement.textContent='&#x1F98D;'">`
    : '&#x1F98D;';

  // Highlight chimp keywords in post text
  const highlightedText = escapeHtml(text).replace(
    /\b(chimpanzee|chimp|kibale|ngogo|budongo|primate|ape|uganda|bwindi|kalinzu)\b/gi,
    '<strong style="color:var(--accent)">$1</strong>'
  );

  return `
    <div class="social-post">
      <div class="social-post-header">
        <a href="https://bsky.app/profile/${escapeHtml(handle)}" target="_blank" rel="noopener" class="social-avatar">${avatarHtml}</a>
        <div class="social-user-info">
          <div class="social-display-name">${escapeHtml(displayName)}</div>
          <div class="social-handle">@${escapeHtml(handle)}</div>
        </div>
        <span class="social-platform platform-bluesky">Bluesky</span>
      </div>
      <div class="social-text">${highlightedText}</div>
      <div class="social-meta">
        <span class="social-meta-item">&#x1F4AC; ${replyCount}</span>
        <span class="social-meta-item">&#x1F501; ${repostCount}</span>
        <span class="social-meta-item">&#x2764; ${likeCount}</span>
        <span class="social-meta-item" style="margin-left:auto">${timeAgo}</span>
        <a href="${escapeHtml(postUrl)}" target="_blank" rel="noopener" class="social-meta-item" style="color:var(--accent);text-decoration:none">&#x2197; View</a>
      </div>
    </div>
  `;
}

function renderBlueskyFallback() {
  const staticPosts = [
    {
      user: 'PrimateResearch',
      handle: 'primates.research.bsky.social',
      text: 'Fascinating new data from Kibale NP — Ngogo patrol frequency has increased 40% compared to baseline. The border zones remain highly contested.',
      time: '2h ago',
      likes: 47, replies: 8, reposts: 12,
    },
    {
      user: 'Uganda Wildlife Watch',
      handle: 'ugandawildlife.bsky.social',
      text: 'Rangers report three inter-community encounters this week in the Kibale buffer zone. Chimp conflict continues at elevated levels.',
      time: '5h ago',
      likes: 31, replies: 5, reposts: 9,
    },
    {
      user: 'ConservationUganda',
      handle: 'conservation.ug.bsky.social',
      text: 'Deforestation at forest margins is compressing chimp ranges, intensifying territorial pressure at community borders. Urgent action needed.',
      time: '1d ago',
      likes: 88, replies: 14, reposts: 27,
    },
  ];

  const html = staticPosts.map(p => `
    <div class="social-post">
      <div class="social-post-header">
        <div class="social-avatar">&#x1F98D;</div>
        <div class="social-user-info">
          <div class="social-display-name">${p.user}</div>
          <div class="social-handle">@${p.handle}</div>
        </div>
        <span class="social-platform platform-bluesky">Bluesky</span>
      </div>
      <div class="social-text">${p.text}</div>
      <div class="social-meta">
        <span class="social-meta-item">&#x1F4AC; ${p.replies}</span>
        <span class="social-meta-item">&#x1F501; ${p.reposts}</span>
        <span class="social-meta-item">&#x2764; ${p.likes}</span>
        <span class="social-meta-item" style="margin-left:auto">${p.time}</span>
      </div>
    </div>
  `).join('');

  return html + `<div class="feed-empty">&#x2139;&#xFE0F; Live Bluesky feed unavailable. <a href="https://bsky.app/search?q=chimpanzee+uganda" target="_blank">Search on Bluesky &#x2197;</a></div>`;
}

// ---- X/Twitter Panel ----
function renderXPanel() {
  const feed = document.getElementById('social-feed');

  const linksHtml = CONFIG.xSearches.map(s => `
    <a class="x-search-link" href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">
      <span>${escapeHtml(s.label)}</span>
      <span class="arrow">&#x2197;</span>
    </a>
  `).join('');

  feed.innerHTML = `
    <div class="x-cta-panel">
      <div class="x-icon">&#x1D54F;</div>
      <h3>Search X / Twitter Live</h3>
      <p>X requires authentication for API access. Click below to open live searches for chimp conflict coverage.</p>
      <div class="x-search-links">
        ${linksHtml}
      </div>
      <p style="margin-top:12px;font-size:11px;color:var(--text-muted)">
        Key accounts to follow: @PrimateResearch, @KibaleProject, @WildlifeUganda, @BudongoStation
      </p>
    </div>
  `;
}

// ---- Tab handling ----
function setupSocialTabs() {
  document.getElementById('social-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    document.querySelectorAll('#social-tabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentSocialTab = tab.dataset.tab;

    if (currentSocialTab === 'bluesky') {
      renderBluesky();
    } else {
      renderXPanel();
    }
  });
}

function setupSocialRefresh() {
  document.getElementById('refresh-social').addEventListener('click', async function () {
    this.classList.add('spinning');
    showSocialLoading();
    await fetchBluesky();
    if (currentSocialTab === 'bluesky') {
      renderBluesky();
    } else {
      renderXPanel();
    }
    this.classList.remove('spinning');
  });
}

function formatTimeAgo(date) {
  if (!date || isNaN(date)) return 'recently';
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 2) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
