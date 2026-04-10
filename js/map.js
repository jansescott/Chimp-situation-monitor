// ============================================================
// CHIMP CONFLICT MONITOR — Interactive Leaflet Map
// ============================================================

let map;
let layers = {
  territories: [],
  stations: [],
  conflicts: [],
  patrols: [],
};

let layerVisibility = {
  territories: true,
  stations: true,
  conflicts: true,
  patrols: false,
};

function initMap() {
  map = L.map('map', {
    center: CONFIG.map.center,
    zoom: CONFIG.map.zoom,
    minZoom: CONFIG.map.minZoom,
    maxZoom: CONFIG.map.maxZoom,
    zoomControl: true,
  });

  L.tileLayer(CONFIG.map.tileUrl, {
    attribution: CONFIG.map.tileAttrib,
    maxZoom: 18,
    subdomains: 'abcd',
  }).addTo(map);

  drawTerritories();
  drawConflictZones();
  drawResearchStations();
  drawPatrolRoutes();
  setupLayerControls();
}

// ---- Territory polygons ----
function drawTerritories() {
  TERRITORIES.forEach(t => {
    const poly = L.polygon(t.coords, {
      color: t.color,
      fillColor: t.color,
      fillOpacity: t.fillOpacity,
      weight: t.weight,
      opacity: 0.8,
      smoothFactor: 1,
    });

    const popupContent = buildTerritoryPopup(t);
    poly.bindPopup(popupContent, { maxWidth: 300 });

    poly.on('mouseover', function () {
      this.setStyle({ fillOpacity: t.fillOpacity + 0.12, weight: t.weight + 1 });
    });
    poly.on('mouseout', function () {
      this.setStyle({ fillOpacity: t.fillOpacity, weight: t.weight });
    });

    poly.addTo(map);
    layers.territories.push(poly);
  });
}

function buildTerritoryPopup(t) {
  const info = t.info;
  return `
    <div class="popup-title">${t.name}</div>
    <div class="popup-row">
      <span class="popup-key">Population</span>
      <span class="popup-val">${info.population}</span>
    </div>
    <div class="popup-row">
      <span class="popup-key">Territory</span>
      <span class="popup-val">${info.area}</span>
    </div>
    <div class="popup-row">
      <span class="popup-key">Status</span>
      <span class="popup-val ${info.statusClass}">${info.status}</span>
    </div>
    <div class="popup-desc">${info.desc}</div>
  `;
}

// ---- Conflict zones ----
function drawConflictZones() {
  CONFLICT_ZONES.forEach(zone => {
    const poly = L.polygon(zone.coords, {
      color: '#ef4444',
      fillColor: '#ef4444',
      fillOpacity: 0.18,
      weight: 2,
      opacity: 0.9,
      dashArray: '5 3',
    });

    const popup = `
      <div class="popup-title" style="color:#ef4444">&#x26A0; ${zone.name}</div>
      <div class="popup-row">
        <span class="popup-key">Severity</span>
        <span class="popup-val danger">${zone.severity}</span>
      </div>
      <div class="popup-row">
        <span class="popup-key">Last Incident</span>
        <span class="popup-val">${zone.lastIncident}</span>
      </div>
      <div class="popup-desc">${zone.desc}</div>
    `;

    poly.bindPopup(popup, { maxWidth: 280 });

    // Animate conflict zones
    let opacity = 0.18;
    let increasing = false;
    setInterval(() => {
      if (increasing) { opacity += 0.015; if (opacity >= 0.28) increasing = false; }
      else { opacity -= 0.015; if (opacity <= 0.08) increasing = true; }
      if (poly._map) poly.setStyle({ fillOpacity: opacity });
    }, 80);

    poly.addTo(map);
    layers.conflicts.push(poly);
  });
}

// ---- Research station markers ----
function drawResearchStations() {
  const stationIcon = L.divIcon({
    html: '<div style="background:#0f1f0f;border:2px solid #34d399;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-size:10px;box-shadow:0 0 10px rgba(52,211,153,0.4);">&#x1F3D5;</div>',
    className: '',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

  RESEARCH_STATIONS.forEach(station => {
    const marker = L.marker([station.lat, station.lng], { icon: stationIcon });

    const popup = `
      <div class="popup-title">&#x1F3D5; ${station.name}</div>
      <div class="popup-row">
        <span class="popup-key">Institution</span>
        <span class="popup-val" style="font-size:10px">${station.institution}</span>
      </div>
      <div class="popup-row">
        <span class="popup-key">Lead</span>
        <span class="popup-val" style="font-size:10px">${station.lead}</span>
      </div>
      <div class="popup-row">
        <span class="popup-key">Since</span>
        <span class="popup-val">${station.since}</span>
      </div>
      <div class="popup-desc">${station.desc}</div>
    `;

    marker.bindPopup(popup, { maxWidth: 300 });
    marker.addTo(map);
    layers.stations.push(marker);
  });
}

// ---- Patrol routes ----
function drawPatrolRoutes() {
  PATROL_ROUTES.forEach(route => {
    const line = L.polyline(route.coords, {
      color: route.color,
      weight: 2.5,
      opacity: 0.8,
      dashArray: route.dashArray,
    });

    line.bindTooltip(`&#x1F9ED; ${route.name}`, { permanent: false, sticky: true });

    // Patrol routes start hidden
    layers.patrols.push(line);
  });
}

// ---- Layer toggle controls ----
function setupLayerControls() {
  document.querySelectorAll('.layer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const layerKey = btn.dataset.layer;
      layerVisibility[layerKey] = !layerVisibility[layerKey];
      btn.classList.toggle('active', layerVisibility[layerKey]);
      toggleLayer(layerKey, layerVisibility[layerKey]);
    });
  });
}

function toggleLayer(key, visible) {
  layers[key].forEach(layer => {
    if (visible) {
      layer.addTo(map);
    } else {
      map.removeLayer(layer);
    }
  });
}
