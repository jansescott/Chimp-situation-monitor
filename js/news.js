// ============================================================
// CHIMP CONFLICT MONITOR — News Feed (RSS via CORS proxy)
// ============================================================

let allNewsItems = [];
let currentNewsTab = 'news-latest';

const CHIMP_KEYWORDS = [
  'chimpanzee', 'chimp', 'primate', 'kibale', 'ngogo', 'budongo',
  'great ape', 'pan troglodytes', 'primatology', 'uganda', 'ape',
  'monkey', 'gorilla', 'bonobo', 'conflict', 'territorial',
];

const RESEARCH_KEYWORDS = [
  'research', 'study', 'journal', 'science', 'paper', 'published',
  'behavior', 'behaviour', 'ecology', 'evolution', 'field study',
];

const CONSERVATION_KEYWORDS = [
  'conservation', 'habitat', 'deforestation', 'endangered', 'protected',
  'wildlife', 'reserve', 'national park', 'IUCN', 'poaching', 'Uganda Wildlife',
];

async function initNews() {
  showNewsLoading();
  const items = await fetchAllFeeds();
  allNewsItems = items;
  renderNews(currentNewsTab);
  setupNewsTabs();
  setupNewsRefresh();
}

function showNewsLoading() {
  document.getElementById('news-feed').innerHTML = `
    <div class="feed-loading">
      <div class="loading-bar"></div>
      <span>Scanning intelligence sources&hellip;</span>
    </div>
  `;
}

async function fetchAllFeeds() {
  const fetchPromises = CONFIG.rssFeeds.map(feed => fetchFeed(feed));
  const results = await Promise.allSettled(fetchPromises);
  const items = [];

  results.forEach((result, i) => {
    if (result.status === 'fulfilled' && result.value) {
      items.push(...result.value);
    }
  });

  // Sort by date descending
  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  return items;
}

async function fetchFeed(feedConfig) {
  try {
    const proxyUrl = CONFIG.corsProxy + encodeURIComponent(feedConfig.url);
    const response = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return [];

    const data = await response.json();
    if (!data.contents) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/xml');
    const items = Array.from(doc.querySelectorAll('item, entry'));

    return items.slice(0, 15).map(item => parseRSSItem(item, feedConfig));
  } catch (err) {
    console.warn(`Failed to fetch ${feedConfig.name}:`, err.message);
    return [];
  }
}

function parseRSSItem(item, feedConfig) {
  const get = (sel) => {
    const el = item.querySelector(sel);
    return el ? (el.textContent || el.getAttribute('href') || '').trim() : '';
  };

  const title = get('title');
  const link = get('link') || item.querySelector('link')?.getAttribute('href') || '';
  const pubDate = get('pubDate') || get('published') || get('updated') || new Date().toISOString();
  const description = get('description') || get('summary') || get('content') || '';
  const cleanDesc = description.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

  const fullText = (title + ' ' + cleanDesc).toLowerCase();

  const isRelevant = CHIMP_KEYWORDS.some(kw => fullText.includes(kw));
  const isResearch = RESEARCH_KEYWORDS.some(kw => fullText.includes(kw));
  const isConservation = CONSERVATION_KEYWORDS.some(kw => fullText.includes(kw));

  const tags = [];
  if (fullText.includes('conflict') || fullText.includes('territorial') || fullText.includes('war')) tags.push({ text: 'CONFLICT', cls: 'tag-red' });
  if (fullText.includes('uganda')) tags.push({ text: 'UGANDA', cls: 'tag-green' });
  if (fullText.includes('kibale') || fullText.includes('ngogo') || fullText.includes('budongo')) tags.push({ text: 'FIELD SITE', cls: 'tag-amber' });
  if (isResearch) tags.push({ text: 'RESEARCH', cls: 'tag-purple' });
  if (isConservation) tags.push({ text: 'CONSERVATION', cls: 'tag-blue' });

  return {
    title,
    link,
    pubDate: new Date(pubDate),
    snippet: cleanDesc.substring(0, 200),
    source: feedConfig.name,
    category: feedConfig.category,
    isRelevant,
    isResearch,
    isConservation,
    tags,
  };
}

function categorise(item) {
  if (item.category === 'research' || item.isResearch) return 'research';
  if (item.category === 'conservation' || item.isConservation) return 'conservation';
  return 'news';
}

function renderNews(tab) {
  const feed = document.getElementById('news-feed');

  let items = allNewsItems;

  if (tab === 'news-research') {
    items = items.filter(i => i.isResearch || i.category === 'research');
  } else if (tab === 'news-conservation') {
    items = items.filter(i => i.isConservation || i.category === 'conservation');
  } else {
    // Latest: show all relevant, then non-relevant as fallback
    const relevant = items.filter(i => i.isRelevant);
    const fallback = items.filter(i => !i.isRelevant).slice(0, 5);
    items = relevant.length >= 5 ? relevant : [...relevant, ...fallback];
  }

  if (items.length === 0) {
    feed.innerHTML = renderFallbackNews();
    return;
  }

  feed.innerHTML = items.slice(0, 20).map(renderNewsItem).join('');
}

function renderNewsItem(item) {
  const timeAgo = formatTimeAgo(item.pubDate);
  const tagsHTML = item.tags.map(t => `<span class="tag ${t.cls}">${t.text}</span>`).join('');

  return `
    <a class="feed-item" href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">
      <div class="feed-item-header">
        <span class="feed-item-source">${escapeHtml(item.source)}</span>
        <span class="feed-item-time">${timeAgo}</span>
      </div>
      <div class="feed-item-title">${escapeHtml(item.title)}</div>
      ${item.snippet ? `<div class="feed-item-snippet">${escapeHtml(item.snippet)}</div>` : ''}
      ${tagsHTML ? `<div class="feed-item-tags">${tagsHTML}</div>` : ''}
    </a>
  `;
}

function renderFallbackNews() {
  // Static curated articles as fallback when RSS fetch fails
  const fallback = [
    {
      title: 'Chimpanzees in Uganda\'s Kibale Forest Expand Territory Through Warfare',
      source: 'Science (2019)',
      time: '2019',
      snippet: 'Researchers document for the first time a chimpanzee community annexing territory from a rival group through lethal inter-group conflict — a behaviour that mirrors human warfare.',
      link: 'https://www.science.org/doi/10.1126/science.aau0999',
      tags: [{ text: 'CONFLICT', cls: 'tag-red' }, { text: 'KIBALE', cls: 'tag-amber' }, { text: 'KEY STUDY', cls: 'tag-purple' }],
    },
    {
      title: 'Male chimpanzees form coalitions to wage war and expand territories',
      source: 'Nature (2014)',
      time: '2014',
      snippet: 'A comprehensive analysis of 152 chimpanzee killings across 18 communities finds that violence is best explained by adaptive resource competition, not human disturbance.',
      link: 'https://www.nature.com/articles/nature13727',
      tags: [{ text: 'RESEARCH', cls: 'tag-purple' }, { text: 'COALITION', cls: 'tag-red' }],
    },
    {
      title: 'Ngogo Chimpanzee Community: The World\'s Largest Known Group',
      source: 'Current Biology',
      time: '2010',
      snippet: 'At over 200 individuals, the Ngogo community at Kibale National Park is the largest known chimpanzee group. Their size enables unprecedented raiding capacity against smaller neighbours.',
      link: 'https://www.cell.com/current-biology/fulltext/S0960-9822(10)00916-4',
      tags: [{ text: 'NGOGO', cls: 'tag-amber' }, { text: 'CONFLICT', cls: 'tag-red' }],
    },
    {
      title: 'Chimpanzee Warfare and the Roots of Human Violence',
      source: 'Annual Review of Anthropology',
      time: '2003',
      snippet: 'Reviewing 30 years of field data, researchers argue that lethal intergroup aggression in chimpanzees shares common evolutionary roots with human warfare.',
      link: 'https://www.annualreviews.org/doi/10.1146/annurev.anthro.32.061002.093422',
      tags: [{ text: 'RESEARCH', cls: 'tag-purple' }, { text: 'EVOLUTION', cls: 'tag-blue' }],
    },
    {
      title: 'Uganda Wildlife Authority: Chimpanzee Habitat Under Pressure',
      source: 'Uganda Wildlife Authority',
      time: '2023',
      snippet: 'The UWA reports increasing habitat fragmentation around Kibale and Budongo forests, intensifying resource competition between chimpanzee communities and raising conflict frequency.',
      link: 'https://www.ugandawildlife.org',
      tags: [{ text: 'CONSERVATION', cls: 'tag-blue' }, { text: 'UGANDA', cls: 'tag-green' }],
    },
  ];

  return fallback.map(item => `
    <a class="feed-item" href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">
      <div class="feed-item-header">
        <span class="feed-item-source">${escapeHtml(item.source)}</span>
        <span class="feed-item-time">${item.time}</span>
      </div>
      <div class="feed-item-title">${escapeHtml(item.title)}</div>
      <div class="feed-item-snippet">${escapeHtml(item.snippet)}</div>
      <div class="feed-item-tags">${item.tags.map(t => `<span class="tag ${t.cls}">${t.text}</span>`).join('')}</div>
    </a>
  `).join('') + `<div class="feed-empty">&#x2139;&#xFE0F; Live RSS feeds unavailable — showing curated references. <a href="#" onclick="initNews(); return false;">Retry</a></div>`;
}

function setupNewsTabs() {
  document.getElementById('news-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    document.querySelectorAll('#news-tabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentNewsTab = tab.dataset.tab;
    renderNews(currentNewsTab);
  });
}

function setupNewsRefresh() {
  document.getElementById('refresh-news').addEventListener('click', async function () {
    this.classList.add('spinning');
    showNewsLoading();
    const items = await fetchAllFeeds();
    allNewsItems = items;
    renderNews(currentNewsTab);
    this.classList.remove('spinning');
  });
}

// ---- Utilities ----
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
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
