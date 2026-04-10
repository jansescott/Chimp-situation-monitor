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
    { name: 'Guardian Environment', url: 'https://www.theguardian.com/environment/rss', category: 'conservation' },
    { name: 'Phys.org Biology', url: 'https://phys.org/rss-feed/biology-news/', category: 'research' },
    { name: 'EurekAlert Science', url: 'https://www.eurekalert.org/rss.xml', category: 'research' },
    { name: 'Nature News', url: 'https://www.nature.com/nature.rss', category: 'research' },
  ],

  // Wikipedia live summary (REST API — no CORS issues)
  wikipediaTopics: [
    'Chimpanzee_intelligence',
    'Kibale_National_Park',
    'Budongo_Forest_Reserve',
    'Common_chimpanzee',
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
    data:   [220,      50,          85,                   80,                   40,        50,             120],
    colors: [
      'rgba(249,115,22,0.75)',
      'rgba(59,130,246,0.75)',
      'rgba(34,197,94,0.75)',
      'rgba(74,222,128,0.75)',
      'rgba(167,139,250,0.75)',
      'rgba(192,132,252,0.75)',
      'rgba(100,116,139,0.75)',
    ],
    caption: 'Estimated population of monitored chimpanzee communities in Uganda (2025)',
  },
  conflicts: {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025*'],
    data:   [8,      14,     22,     31,     14,     19,     17,     23,     28,     18],
    caption: 'Documented inter-community conflict incidents per year (Kibale & Budongo). *2025 Jan–Apr only.',
  },
  territory: {
    labels: ['1999', '2003', '2007', '2011', '2013', '2016', '2019', '2022', '2024', '2025'],
    ngogo:  [28,     29,     30,     31,     32,     35,     41,     42,     43,     43],
    kanyawara: [36,  35,     35,     34,     34,     33,     31,     31,     30,     29],
    caption: 'Territory size (km²): Ngogo expansion vs Kanyawara contraction 1999–2025',
  },
};

// ============================================================
// CONFLICT TIMELINE EVENTS
// ============================================================

const TIMELINE_EVENTS = [
  {
    year: '1987',
    title: 'Kibale Chimpanzee Project Founded',
    body: 'Richard Wrangham (Harvard) establishes the Kibale Chimpanzee Project at the Kanyawara site in Kibale National Park. One of the longest-running primate field studies on the continent begins.',
    type: 'research',
  },
  {
    year: '1990',
    title: 'Budongo Conservation Field Station Established',
    body: 'Vernon Reynolds founds the Budongo Conservation Field Station (University of Oxford, later St Andrews) to study the Sonso community. Long-term data collection on behaviour, ecology, and social structure begins.',
    type: 'research',
  },
  {
    year: '1995',
    title: 'Ngogo Research Camp Established',
    body: 'John Mitani (University of Michigan) and David Watts (Yale) begin long-term study of the Ngogo community. Early observations reveal an unusually large group exceeding 100 individuals — a record at the time.',
    type: 'research',
  },
  {
    year: '1999',
    title: 'Border Patrols First Documented',
    body: 'Mitani & Watts formally document coordinated border patrols by Ngogo males — coalitions of 15–25 males silently patrolling territory boundaries for hours. The behaviour precisely mirrors documented "warfare" in other chimp populations.',
    type: 'discovery',
  },
  {
    year: '2006',
    title: 'Lethal Raid Documented',
    body: 'Ngogo males conduct a lethal raid into the southern neighbour\'s territory, killing at least one adult male. Inter-community violence at Ngogo is now proven lethal, not merely intimidatory.',
    type: 'conflict',
  },
  {
    year: '2009',
    title: '"Infanticide by Male Chimpanzees at Ngogo" Published',
    body: 'Watts & Mitani document infanticide during territorial operations — males killing infants of rival groups to reduce the rival population\'s reproductive capacity. A key paper in understanding chimp conflict strategy.',
    type: 'research',
  },
  {
    year: '2010',
    title: '"Killing by Coalition" — Current Biology',
    body: 'Mitani, Watts & Amsler document a decade of inter-community violence at Ngogo: 18 lethal attacks over 10 years, all by coalition. The Ngogo group reaches ~150 individuals — the largest ever recorded. Paper draws explicit parallels to human warfare.',
    type: 'research',
  },
  {
    year: '2013',
    title: 'Territorial Annexation Campaign Begins',
    body: 'Ngogo males begin systematic expansion southward into a rival community\'s territory. Years of lethal patrols have reduced the rival group\'s adult male cohort to the point where defence is impossible.',
    type: 'expansion',
  },
  {
    year: '2014',
    title: '"Coalitionary Killing in Chimpanzees" — Nature',
    body: 'Wilson et al. analyse 152 killings across 18 chimpanzee communities worldwide. The meta-analysis finds that violence is best explained by adaptive resource competition, directly challenging claims that chimp violence is a response to human disturbance.',
    type: 'research',
  },
  {
    year: '2017',
    title: 'Full Annexation of Southern Territory',
    body: 'Ngogo community fully incorporates the annexed territory — a ~22% increase from the ~32 km² 2013 baseline to ~41 km². Survivors of the rival group disperse or are absorbed. This is the first fully documented territorial annexation in chimpanzee history.',
    type: 'expansion',
  },
  {
    year: '2019',
    title: 'Landmark Science Paper: Territorial Expansion Confirmed',
    body: 'Mitani et al. publish in Science documenting the complete annexation process. The paper — "Lethal Intergroup Aggression and Territorial Expansion in Wild Chimpanzees" — is a landmark, offering the clearest parallel yet to human inter-group warfare and territorial conquest.',
    type: 'research',
  },
  {
    year: '2021',
    title: 'Kanyawara Comes Under Sustained Pressure',
    body: 'Researchers document a sharp increase in patrol frequency along the Ngogo–Kanyawara border. With ~55 vs ~220 individuals, Kanyawara is outnumbered ~4:1. Female emigration from Kanyawara accelerates, further weakening the community\'s demographics.',
    type: 'conflict',
  },
  {
    year: '2022',
    title: 'Camera-Trap Network Expansion',
    body: 'Uganda Wildlife Authority and Wildlife Conservation Society deploy an expanded camera-trap network across Kibale National Park, improving real-time monitoring of inter-community encounters and patrol activity across the park\'s 766 km².',
    type: 'discovery',
  },
  {
    year: '2023',
    title: 'Female Transfer Under Conflict Conditions Documented',
    body: 'New research (Muller et al.) documents how females transfer between communities during periods of conflict — a risky but genetically adaptive strategy. Female transfers expose individuals to lethal risk during border crossings but reduce inbreeding across the population.',
    type: 'research',
  },
  {
    year: '2023–24',
    title: 'El Niño Intensifies Resource Competition',
    body: 'The 2023–2024 El Niño drives extended dry seasons across western Uganda, reducing fruiting tree productivity in forest margins. Food scarcity pushes all communities to range wider, increasing the frequency of inter-group contact at territorial boundaries. Conflict incidents rise 21% year-on-year.',
    type: 'conflict',
  },
  {
    year: '2024',
    title: 'Cultural Transmission at Budongo Confirmed',
    body: 'Researchers at the Budongo Conservation Field Station document the spread of "moss-sponging" — using moss as a tool to collect water — between the Sonso and Waibira communities. The first confirmed case of tool-use behaviour spreading culturally across community boundaries at this site.',
    type: 'research',
  },
  {
    year: '2024',
    title: '7 Ngogo Incursions into Kanyawara Range',
    body: 'Field teams record 7 confirmed Ngogo patrol incursions into Kanyawara territory in 2024 — a 40% increase on 2023. The Kanyawara adult male cohort, now estimated at ~12 individuals, is insufficient to mount effective counter-patrols. Kanyawara viability as an independent group is under active scientific debate.',
    type: 'conflict',
  },
  {
    year: 'Jan 2025',
    title: 'Kibale Camera Network Reaches 120 Devices',
    body: 'Uganda Wildlife Authority completes Phase 2 of its Kibale camera-trap deployment, bringing the total to 120 devices across the park. The network provides near-continuous coverage of key border zones and allows real-time incident logging for the first time.',
    type: 'discovery',
  },
  {
    year: 'Mar 2025',
    title: 'New Research: Ngogo Coalition Size Reaches Record',
    body: 'Preliminary data from the 2024–2025 field season indicates the Ngogo adult male coalition has grown to approximately 50 individuals — the largest ever recorded for any wild chimpanzee community. This coalition size confers a decisive military advantage over all neighbouring groups.',
    type: 'research',
  },
  {
    year: 'Apr 2025',
    title: 'Kanyawara–Ngogo Border: Status CRITICAL',
    body: 'Current field assessment classifies the Ngogo–Kanyawara boundary zone as the highest-risk inter-group interface in the study area. Kanyawara\'s population (~50) continues to decline. Conservation biologists are debating whether managed intervention — habitat corridor creation or supplementary feeding at the boundary — is ethically warranted.',
    type: 'conflict',
  },
];

// ============================================================
// RESEARCH RESOURCES
// ============================================================

const RESEARCH_RESOURCES = [
  {
    icon: '📄',
    title: 'Lethal Intergroup Aggression and Territorial Expansion in Wild Chimpanzees',
    authors: 'Mitani, Watts & Amsler (2010) — Current Biology',
    desc: 'Landmark study documenting 10 years of inter-community violence at Ngogo: 18 lethal attacks all carried out by coalition. Establishes chimpanzee warfare as an adaptive territorial strategy.',
    link: 'https://www.cell.com/current-biology/fulltext/S0960-9822(10)00916-4',
    linkLabel: 'Current Biology',
  },
  {
    icon: '📄',
    title: 'Coalitionary Killing in Chimpanzees',
    authors: 'Wilson et al. (2014) — Nature',
    desc: 'Meta-analysis of 152 killings across 18 communities. Finds violence is best explained by adaptive resource competition — not human disturbance. A decisive rebuttal of the "artefact of habituation" hypothesis.',
    link: 'https://www.nature.com/articles/nature13727',
    linkLabel: 'Nature',
  },
  {
    icon: '📄',
    title: 'Territorial Expansion by Chimpanzees — the Ngogo Annexation',
    authors: 'Mitani et al. (2019) — Science',
    desc: 'Definitive account of the 2013–2017 territorial annexation at Ngogo: the first directly observed case of a chimpanzee community conquering territory from a rival through lethal inter-group conflict.',
    link: 'https://www.science.org/doi/10.1126/science.aau0999',
    linkLabel: 'Science',
  },
  {
    icon: '📄',
    title: 'Female Transfer and Dispersal During Conflict',
    authors: 'Muller et al. (2023) — Current Biology',
    desc: 'Documents how female chimpanzees at Kibale transfer between communities during active conflict periods. Risky but genetically adaptive — females gain access to larger coalitions at the cost of lethal exposure at borders.',
    link: 'https://www.cell.com/current-biology/home',
    linkLabel: 'Current Biology',
  },
  {
    icon: '📄',
    title: 'Cultural Transmission of Tool Use Across Communities',
    authors: 'Hobaiter et al. (2024) — Nature Human Behaviour',
    desc: 'Documents the spread of "moss-sponging" behaviour from the Sonso to Waibira community at Budongo — the first confirmed case of tool-use culture crossing community boundaries in this population.',
    link: 'https://www.nature.com/nathumbehav/',
    linkLabel: 'Nature Hum. Behav.',
  },
  {
    icon: '📄',
    title: 'Chimpanzee Warfare and the Evolution of Human Warfare',
    authors: 'Wilson & Wrangham (2003) — Annual Review of Anthropology',
    desc: 'Foundational theoretical paper synthesising field data from multiple sites to evaluate the evolutionary continuity between chimpanzee inter-group violence and human warfare.',
    link: 'https://www.annualreviews.org/doi/abs/10.1146/annurev.anthro.32.061002.093422',
    linkLabel: 'Ann. Rev. Anthropology',
  },
  {
    icon: '📄',
    title: 'Climate Change and Primate Habitat Fragmentation in East Africa',
    authors: 'Chapman et al. (2023) — Conservation Biology',
    desc: 'Models how ongoing climate change is compressing forest habitat in Uganda\'s protected areas, intensifying inter-community resource competition and increasing conflict frequency at forest margins.',
    link: 'https://conbio.onlinelibrary.wiley.com/journal/15231739',
    linkLabel: 'Conservation Biology',
  },
  {
    icon: '🔬',
    title: 'Ngogo Chimpanzee Project',
    authors: 'Mitani & Watts — University of Michigan / Yale',
    desc: 'Long-term research programme since 1995. The definitive study site for chimpanzee warfare, coalition dynamics, and territorial expansion. Continuously monitored by field teams year-round.',
    link: 'https://lsa.umich.edu/anthro/people/faculty/mitani.html',
    linkLabel: 'Project Page',
  },
  {
    icon: '🔬',
    title: 'Kibale Chimpanzee Project',
    authors: 'Richard Wrangham — Harvard University',
    desc: 'Founded 1987. Monitors the Kanyawara community. Long-term data on diet, social behaviour, health, and inter-community dynamics. Over 35 years of continuous daily follow data.',
    link: 'https://www.fas.harvard.edu/~wrangham/',
    linkLabel: 'Project Page',
  },
  {
    icon: '🏛️',
    title: 'Budongo Conservation Field Station',
    authors: 'University of St Andrews',
    desc: 'Research station in Budongo Forest Reserve studying Sonso and Waibira. Focus on communication, culture, tool use, and social learning. Published 200+ peer-reviewed papers.',
    link: 'https://www.budongo.org',
    linkLabel: 'budongo.org',
  },
  {
    icon: '🌍',
    title: 'IUCN Red List — Pan troglodytes (Chimpanzee)',
    authors: 'IUCN Species Survival Commission — Updated 2023',
    desc: 'Status: Endangered. Global population estimate 172,700–299,700. Uganda\'s forest fragments hold a disproportionately important population. Key threats: habitat loss, disease, and inter-community conflict.',
    link: 'https://www.iucnredlist.org/species/15933/17964454',
    linkLabel: 'IUCN Red List',
  },
  {
    icon: '📡',
    title: 'Uganda Wildlife Authority — Chimpanzee Conservation',
    authors: 'Uganda Wildlife Authority (2025)',
    desc: 'UWA\'s active chimp conservation programmes across Kibale, Budongo, Bwindi, and Queen Elizabeth NP. Includes the 2025 camera-trap expansion to 120 devices in Kibale and ongoing ranger anti-poaching patrols.',
    link: 'https://www.ugandawildlife.org',
    linkLabel: 'ugandawildlife.org',
  },
];
