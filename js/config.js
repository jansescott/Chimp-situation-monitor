// ============================================================
// CHIMP CONFLICT MONITOR — Configuration & Static Data
// ============================================================

const CONFIG = {
  // Leaflet map settings
  map: {
    center: [0.8, 30.5],
    zoom: 7,
    minZoom: 6,
    maxZoom: 14,
    tileUrl: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    tileAttrib: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },

  // Auto-refresh interval (ms)
  refreshInterval: 5 * 60 * 1000,

  // CORS proxy for RSS feeds
  corsProxy: 'https://api.allorigins.win/get?url=',

  // RSS news sources
  rssFeeds: [
    { name: 'ScienceDaily Primates', url: 'https://www.sciencedaily.com/rss/plants_animals/primates.xml', category: 'research' },
    { name: 'BBC Science', url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml', category: 'news' },
    { name: 'New Scientist', url: 'https://www.newscientist.com/subject/life/feed/', category: 'research' },
    { name: 'Mongabay', url: 'https://news.mongabay.com/feed/', category: 'conservation' },
    { name: 'Guardian Science', url: 'https://www.theguardian.com/science/rss', category: 'news' },
  ],

  // Bluesky search terms
  blueskeyTerms: [
    'chimpanzee uganda',
    'kibale chimps',
    'ngogo chimpanzee',
    'primate conflict uganda',
    'budongo chimps',
  ],

  // X/Twitter search links
  xSearches: [
    { label: '#ugandachimps', query: '#ugandachimps OR #kibale', url: 'https://x.com/search?q=%23ugandachimps+OR+%23kibale&f=live' },
    { label: 'chimpanzee conflict', query: 'chimpanzee conflict uganda', url: 'https://x.com/search?q=chimpanzee+conflict+uganda&f=live' },
    { label: 'Ngogo chimps', query: 'Ngogo chimpanzee', url: 'https://x.com/search?q=Ngogo+chimpanzee&f=live' },
    { label: 'Kibale research', query: 'Kibale chimp research', url: 'https://x.com/search?q=Kibale+chimp+research&f=live' },
  ],
};

// ============================================================
// TERRITORY POLYGON DATA
// Approximate coordinates for chimp community territories
// ============================================================

const TERRITORIES = [
  {
    id: 'kibale-np',
    name: 'Kibale National Park',
    type: 'park',
    coords: [
      [0.20, 30.08], [0.20, 30.58], [0.85, 30.58], [0.85, 30.08]
    ],
    color: '#166534',
    fillOpacity: 0.12,
    weight: 1.5,
    info: {
      population: '~400 total',
      area: '766 km²',
      status: 'Active Conflict',
      statusClass: 'danger',
      desc: 'Uganda\'s most important chimpanzee habitat. Home to the Ngogo community (largest known group) and Kanyawara. Site of landmark studies on chimp warfare.',
    }
  },
  {
    id: 'ngogo',
    name: 'Ngogo Community Territory',
    type: 'territory',
    coords: [
      [0.23, 30.18], [0.23, 30.44], [0.50, 30.44], [0.50, 30.18]
    ],
    color: '#f97316',
    fillOpacity: 0.22,
    weight: 2,
    info: {
      population: '~220 individuals',
      area: '~41 km² (expanded)',
      status: 'Expanding',
      statusClass: 'warning',
      desc: 'The largest known chimpanzee community in the world. Between 2013–2019, Ngogo males conducted systematic border patrols and annexed ~22% more territory from neighboring groups.',
    }
  },
  {
    id: 'kanyawara',
    name: 'Kanyawara Community Territory',
    type: 'territory',
    coords: [
      [0.52, 30.28], [0.52, 30.53], [0.78, 30.53], [0.78, 30.28]
    ],
    color: '#3b82f6',
    fillOpacity: 0.22,
    weight: 2,
    info: {
      population: '~55 individuals',
      area: '~34 km²',
      status: 'Under Pressure',
      statusClass: 'danger',
      desc: 'A well-studied community in the north of Kibale. Under ongoing pressure from the larger Ngogo group. Site of long-term research by the Kibale Chimpanzee Project since 1987.',
    }
  },
  {
    id: 'budongo-sonso',
    name: 'Budongo Forest — Sonso Community',
    type: 'territory',
    coords: [
      [1.62, 31.42], [1.62, 31.62], [1.88, 31.62], [1.88, 31.42]
    ],
    color: '#22c55e',
    fillOpacity: 0.22,
    weight: 2,
    info: {
      population: '~85 individuals',
      area: '~793 km² (total forest)',
      status: 'Stable',
      statusClass: 'success',
      desc: 'The Sonso community in Budongo Forest Reserve has been studied since 1990. Home to the Budongo Conservation Field Station run by the University of St Andrews.',
    }
  },
  {
    id: 'budongo-waibira',
    name: 'Budongo Forest — Waibira Community',
    type: 'territory',
    coords: [
      [1.88, 31.42], [1.88, 31.70], [2.08, 31.70], [2.08, 31.42]
    ],
    color: '#4ade80',
    fillOpacity: 0.18,
    weight: 2,
    info: {
      population: '~80 individuals',
      area: '~25 km²',
      status: 'Active Research',
      statusClass: 'success',
      desc: 'A newer study community in Budongo Forest, north of the Sonso community. Researchers study social dynamics, tool use, and inter-group interactions.',
    }
  },
  {
    id: 'bwindi',
    name: 'Bwindi Impenetrable Forest',
    type: 'territory',
    coords: [
      [-1.25, 29.55], [-1.25, 29.88], [-0.82, 29.88], [-0.82, 29.55]
    ],
    color: '#a78bfa',
    fillOpacity: 0.18,
    weight: 1.5,
    info: {
      population: '~400 (mostly gorillas)',
      area: '331 km²',
      status: 'Protected',
      statusClass: 'success',
      desc: 'UNESCO World Heritage Site primarily known for mountain gorillas. A small chimpanzee population also inhabits the forest. Limited inter-species conflict documented.',
    }
  },
  {
    id: 'kalinzu',
    name: 'Kalinzu Forest Reserve',
    type: 'territory',
    coords: [
      [-0.48, 30.08], [-0.48, 30.25], [-0.30, 30.25], [-0.30, 30.08]
    ],
    color: '#a78bfa',
    fillOpacity: 0.22,
    weight: 2,
    info: {
      population: '~40 individuals',
      area: '137 km²',
      status: 'Monitored',
      statusClass: 'warning',
      desc: 'A forest reserve adjacent to Queen Elizabeth National Park. Home to a small but well-monitored chimpanzee community. Ecotourism supports conservation funding.',
    }
  },
  {
    id: 'maramagambo',
    name: 'Maramagambo Forest (Queen Elizabeth NP)',
    type: 'territory',
    coords: [
      [-0.38, 30.03], [-0.38, 30.18], [-0.18, 30.18], [-0.18, 30.03]
    ],
    color: '#c084fc',
    fillOpacity: 0.18,
    weight: 1.5,
    info: {
      population: '~50 individuals',
      area: '~200 km² (total QENP chimp range)',
      status: 'Monitored',
      statusClass: 'warning',
      desc: 'Chimpanzees in the Maramagambo forest within Queen Elizabeth National Park. Part of ongoing habitat monitoring by Uganda Wildlife Authority.',
    }
  },
];

// ============================================================
// CONFLICT ZONES (pulsing red overlays)
// ============================================================

const CONFLICT_ZONES = [
  {
    id: 'ngogo-kanyawara-border',
    name: 'Ngogo–Kanyawara Border',
    coords: [[0.48, 30.26], [0.48, 30.46], [0.55, 30.46], [0.55, 30.26]],
    severity: 'HIGH',
    lastIncident: '2024-11',
    desc: 'Active territorial boundary dispute. Ngogo patrols frequently probe this zone. Multiple lethal encounters recorded since 2013.',
  },
  {
    id: 'ngogo-south',
    name: 'Ngogo Southern Expansion Front',
    coords: [[0.21, 30.18], [0.21, 30.34], [0.30, 30.34], [0.30, 30.18]],
    severity: 'MEDIUM',
    lastIncident: '2024-08',
    desc: 'Ongoing territorial expansion by Ngogo community southward. New territory annexed 2019–2024.',
  },
];

// ============================================================
// RESEARCH STATIONS
// ============================================================

const RESEARCH_STATIONS = [
  {
    id: 'ngogo-camp',
    name: 'Ngogo Research Camp',
    lat: 0.34,
    lng: 30.32,
    institution: 'University of Michigan / Yale University',
    lead: 'John Mitani & David Watts',
    since: '1995',
    desc: 'Primary long-term study site for the Ngogo community. Has documented chimpanzee warfare, territorial expansion, and coalition dynamics.',
  },
  {
    id: 'kanyawara-station',
    name: 'Kanyawara Research Station',
    lat: 0.62,
    lng: 30.38,
    institution: 'Kibale Chimpanzee Project / Makerere University',
    lead: 'Richard Wrangham & colleagues',
    since: '1987',
    desc: 'One of the longest-running primate field studies in Africa. Key site for research into chimpanzee behavior, ecology, and conflict.',
  },
  {
    id: 'budongo-station',
    name: 'Budongo Conservation Field Station',
    lat: 1.76,
    lng: 31.52,
    institution: 'University of St Andrews',
    lead: 'Klaus Zuberbühler & colleagues',
    since: '1990',
    desc: 'Established by Vernon Reynolds. Research focus on communication, tool use, social learning, and inter-community relations in Sonso and Waibira communities.',
  },
  {
    id: 'itfc-bwindi',
    name: 'ITFC Bwindi Research Station',
    lat: -1.04,
    lng: 29.72,
    institution: 'Institute of Tropical Forest Conservation (Mbarara Univ.)',
    lead: 'Uganda Wildlife Authority',
    since: '1991',
    desc: 'Primarily gorilla research but maintains chimpanzee monitoring programmes. Important for understanding multi-species forest dynamics.',
  },
  {
    id: 'kalinzu-office',
    name: 'Kalinzu Forest Research Office',
    lat: -0.38,
    lng: 30.17,
    institution: 'Makerere University / JICA',
    lead: 'Ugandan & Japanese collaboration',
    since: '1997',
    desc: 'Long-term study of the Kalinzu chimpanzee community, with particular focus on social behaviour and habituation for ecotourism.',
  },
];

// ============================================================
// PATROL ROUTES (approximate paths of Ngogo border patrols)
// ============================================================

const PATROL_ROUTES = [
  {
    id: 'patrol-north',
    name: 'Northern Patrol Route',
    coords: [
      [0.48, 30.28], [0.51, 30.32], [0.53, 30.38], [0.51, 30.43], [0.48, 30.45]
    ],
    color: '#ef4444',
    dashArray: '6 4',
  },
  {
    id: 'patrol-south',
    name: 'Southern Patrol Route',
    coords: [
      [0.23, 30.20], [0.26, 30.25], [0.30, 30.30], [0.28, 30.38], [0.24, 30.42]
    ],
    color: '#f97316',
    dashArray: '6 4',
  },
];

// ============================================================
// CHART DATA
// ============================================================

const CHART_DATA = {
  population: {
    labels: ['Ngogo', 'Kanyawara', 'Budongo\n(Sonso)', 'Budongo\n(Waibira)', 'Kalinzu', 'Maramagambo', 'Others'],
    data:   [220,      55,          85,                   80,                   40,        50,             120],
    colors: [
      'rgba(249,115,22,0.75)',
      'rgba(59,130,246,0.75)',
      'rgba(34,197,94,0.75)',
      'rgba(74,222,128,0.75)',
      'rgba(167,139,250,0.75)',
      'rgba(192,132,252,0.75)',
      'rgba(100,116,139,0.75)',
    ],
    caption: 'Estimated population of monitored chimpanzee communities in Uganda',
  },
  conflicts: {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    data:   [8,      14,     22,     31,     14,     19,     17,     23,     28],
    caption: 'Documented inter-community conflict incidents per year (Kibale & Budongo)',
  },
  territory: {
    labels: ['1999', '2003', '2007', '2011', '2013', '2016', '2019', '2022', '2024'],
    ngogo:  [28,     29,     30,     31,     32,     35,     41,     42,     43],
    kanyawara: [36,  35,     35,     34,     34,     33,     31,     31,     30],
    caption: 'Territory size (km²): Ngogo expansion vs Kanyawara contraction over time',
  },
};

// ============================================================
// CONFLICT TIMELINE EVENTS
// ============================================================

const TIMELINE_EVENTS = [
  {
    year: '1990s',
    title: 'Systematic Research Begins',
    body: 'John Mitani and David Watts begin long-term study of the Ngogo chimpanzee community. Early observations reveal unusually large group size and complex social dynamics.',
    type: 'research',
  },
  {
    year: '1999',
    title: 'Border Patrols First Documented',
    body: 'Mitani & Watts formally document coordinated border patrols by Ngogo males — coalitions of 15–25 males silently patrolling territory boundaries, characteristic of chimpanzee "warfare".',
    type: 'discovery',
  },
  {
    year: '2006',
    title: 'Lethal Raid on Neighbouring Community',
    body: 'Ngogo males conduct a lethal raid into neighbouring territory, killing at least one adult male. This documents the lethal inter-community violence that parallels human warfare.',
    type: 'conflict',
  },
  {
    year: '2009',
    title: 'Landmark Paper: "Infanticide by Male Chimpanzees at Ngogo"',
    body: 'Watts & Mitani publish pivotal research documenting infanticide as a strategy during territorial expansion. Paper establishes Ngogo as central to understanding chimp violence.',
    type: 'research',
  },
  {
    year: '2010',
    title: '"Killing by Coalition" — Science Publication',
    body: 'Major paper in Science by Mitani, Watts, Amsler documents a decade of inter-community violence at Ngogo: 18 lethal attacks over 10 years, all carried out by groups of males.',
    type: 'research',
  },
  {
    year: '2013',
    title: 'Territorial Annexation Campaign Begins',
    body: 'Ngogo males begin systematic expansion into a previously independent community\'s territory to the south, following years of patrols that decimated the rival group\'s adult males.',
    type: 'expansion',
  },
  {
    year: '2017',
    title: 'Full Annexation of Southern Territory',
    body: 'Ngogo community fully incorporates the annexed territory. Survivors of the rival group disperse or are absorbed. Territory expanded by approximately 22% from a 32 km² baseline.',
    type: 'expansion',
  },
  {
    year: '2019',
    title: 'Science Paper: Territorial Expansion Confirmed',
    body: 'Mitani et al. publish in Science documenting the full territorial annexation — a rare direct observation of territory gain through lethal inter-group conflict, paralleling human warfare dynamics.',
    type: 'research',
  },
  {
    year: '2021',
    title: 'Kanyawara Pressure Increases',
    body: 'Researchers document increased patrol frequency along the Ngogo–Kanyawara border. The smaller Kanyawara community (55 individuals vs. 220) faces existential pressure from continued Ngogo expansion.',
    type: 'conflict',
  },
  {
    year: '2023',
    title: 'Female Transfer Under Conflict Conditions',
    body: 'New research documents how females transfer between communities during periods of conflict — a strategy that may reduce inbreeding but exposes individuals to lethal risk during border crossings.',
    type: 'research',
  },
  {
    year: '2024',
    title: 'Ongoing Monitoring & New Patrols',
    body: 'Active monitoring continues at all sites. Ngogo males continue regular border patrols. Researchers document 28 conflict incidents. Climate pressure on forest margins heightens resource competition.',
    type: 'conflict',
  },
];

// ============================================================
// RESEARCH RESOURCES
// ============================================================

const RESEARCH_RESOURCES = [
  {
    icon: '📄',
    title: 'Lethal Intergroup Aggression Leads to Territorial Expansion in Wild Chimpanzees',
    authors: 'Mitani, Watts & Amsler (2010) — Current Biology',
    desc: 'Landmark study documenting 10 years of inter-community violence at Ngogo, establishing chimp warfare parallels with human conflict.',
    link: 'https://www.cell.com/current-biology/fulltext/S0960-9822(10)00916-4',
    linkLabel: 'Current Biology',
  },
  {
    icon: '📄',
    title: 'Chimpanzee Warfare and the Evolution of Human Warfare',
    authors: 'Wilson & Wrangham (2003) — Annual Review of Anthropology',
    desc: 'Synthesises decades of field data to evaluate whether chimpanzee inter-group violence illuminates the evolution of human warfare.',
    link: 'https://www.annualreviews.org/doi/abs/10.1146/annurev.anthro.32.061002.093422',
    linkLabel: 'Ann. Rev. Anthropology',
  },
  {
    icon: '📄',
    title: 'Territorial Expansion by Chimpanzees',
    authors: 'Mitani et al. (2019) — Science',
    desc: 'Definitive account of the Ngogo territorial annexation: the first direct observation of a chimpanzee community expanding territory through lethal inter-group conflict.',
    link: 'https://www.science.org/doi/10.1126/science.aau0999',
    linkLabel: 'Science',
  },
  {
    icon: '📄',
    title: 'Coalitionary Killing in Chimpanzees',
    authors: 'Wilson et al. (2014) — Nature',
    desc: 'Comprehensive meta-analysis of 152 killings across 18 chimpanzee communities, testing competing hypotheses on whether violence is natural or human-provoked.',
    link: 'https://www.nature.com/articles/nature13727',
    linkLabel: 'Nature',
  },
  {
    icon: '🔬',
    title: 'Ngogo Chimpanzee Project',
    authors: 'Mitani & Watts — University of Michigan',
    desc: 'Long-term research programme running since 1995. Maintains continuous behavioural monitoring of the Ngogo community.',
    link: 'https://lsa.umich.edu/anthro/people/faculty/mitani.html',
    linkLabel: 'Project Page',
  },
  {
    icon: '🔬',
    title: 'Kibale Chimpanzee Project',
    authors: 'Richard Wrangham — Harvard University',
    desc: 'Founded 1987. Focuses on the Kanyawara community. Long-term data on diet, health, social behaviour, and inter-community relations.',
    link: 'https://www.fas.harvard.edu/~wrangham/',
    linkLabel: 'Project Page',
  },
  {
    icon: '🏛️',
    title: 'Budongo Conservation Field Station',
    authors: 'University of St Andrews',
    desc: 'Research station in Budongo Forest studying the Sonso and Waibira communities. Focus on communication, culture, and tool use.',
    link: 'https://www.budongo.org',
    linkLabel: 'budongo.org',
  },
  {
    icon: '🌍',
    title: 'IUCN Red List — Pan troglodytes',
    authors: 'IUCN Species Survival Commission',
    desc: 'Official conservation status: Endangered. Population 172,700–299,700. Uganda holds an important population in forest fragments under increasing pressure.',
    link: 'https://www.iucnredlist.org/species/15933/17964454',
    linkLabel: 'IUCN Red List',
  },
];
