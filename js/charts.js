// ============================================================
// CHIMP CONFLICT MONITOR — Chart.js Visualizations
// ============================================================

let mainChart = null;
let currentChartType = 'population';

const CHART_DEFAULTS = {
  color: {
    grid: 'rgba(255,255,255,0.04)',
    tick: 'rgba(122,158,122,0.6)',
    border: 'rgba(255,255,255,0.06)',
  },
  font: {
    family: "'JetBrains Mono', monospace",
    size: 11,
  },
};

function initCharts() {
  setupChartTabs();
  renderChart('population');
}

function setupChartTabs() {
  document.getElementById('chart-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (!tab || !tab.dataset.chart) return;
    document.querySelectorAll('#chart-tabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentChartType = tab.dataset.chart;
    renderChart(currentChartType);
  });
}

function renderChart(type) {
  if (mainChart) {
    mainChart.destroy();
    mainChart = null;
  }

  const ctx = document.getElementById('main-chart').getContext('2d');
  const captionEl = document.getElementById('chart-caption');

  switch (type) {
    case 'population':
      mainChart = buildPopulationChart(ctx);
      captionEl.textContent = CHART_DATA.population.caption;
      break;
    case 'conflicts':
      mainChart = buildConflictsChart(ctx);
      captionEl.textContent = CHART_DATA.conflicts.caption;
      break;
    case 'territory':
      mainChart = buildTerritoryChart(ctx);
      captionEl.textContent = CHART_DATA.territory.caption;
      break;
  }
}

// ---- Population doughnut/bar chart ----
function buildPopulationChart(ctx) {
  const d = CHART_DATA.population;

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Individuals',
        data: d.data,
        backgroundColor: d.colors,
        borderColor: d.colors.map(c => c.replace('0.75', '1')),
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.8,
      plugins: {
        legend: { display: false },
        tooltip: buildTooltip('individuals'),
      },
      scales: {
        x: buildXScale(),
        y: buildYScale('Individuals'),
      },
    },
  });
}

// ---- Conflict incidents line chart ----
function buildConflictsChart(ctx) {
  const d = CHART_DATA.conflicts;

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Conflict Incidents',
        data: d.data,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#0c160c',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.35,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.8,
      plugins: {
        legend: { display: false },
        tooltip: buildTooltip('incidents'),
        annotation: {},
      },
      scales: {
        x: buildXScale(),
        y: buildYScale('Incidents'),
      },
    },
  });
}

// ---- Territory change area chart ----
function buildTerritoryChart(ctx) {
  const d = CHART_DATA.territory;

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [
        {
          label: 'Ngogo',
          data: d.ngogo,
          borderColor: '#fb923c',
          backgroundColor: 'rgba(249,115,22,0.12)',
          borderWidth: 2.5,
          pointBackgroundColor: '#fb923c',
          pointBorderColor: '#0c160c',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: false,
          tension: 0.3,
        },
        {
          label: 'Kanyawara',
          data: d.kanyawara,
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(59,130,246,0.08)',
          borderWidth: 2.5,
          pointBackgroundColor: '#60a5fa',
          pointBorderColor: '#0c160c',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: false,
          tension: 0.3,
          borderDash: [5, 3],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.8,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: CHART_DEFAULTS.color.tick,
            font: CHART_DEFAULTS.font,
            boxWidth: 24,
            padding: 12,
          },
        },
        tooltip: buildTooltip('km²'),
      },
      scales: {
        x: buildXScale(),
        y: {
          ...buildYScale('Territory (km²)'),
          min: 25,
          max: 48,
        },
      },
    },
  });
}

// ---- Shared scale builders ----
function buildXScale() {
  return {
    grid: {
      color: CHART_DEFAULTS.color.grid,
      borderColor: CHART_DEFAULTS.color.border,
    },
    ticks: {
      color: CHART_DEFAULTS.color.tick,
      font: CHART_DEFAULTS.font,
      maxRotation: 0,
    },
    border: { color: CHART_DEFAULTS.color.border },
  };
}

function buildYScale(label) {
  return {
    grid: {
      color: CHART_DEFAULTS.color.grid,
      borderColor: CHART_DEFAULTS.color.border,
    },
    ticks: {
      color: CHART_DEFAULTS.color.tick,
      font: CHART_DEFAULTS.font,
    },
    title: {
      display: true,
      text: label,
      color: 'rgba(61,92,61,0.8)',
      font: CHART_DEFAULTS.font,
    },
    border: { color: CHART_DEFAULTS.color.border },
  };
}

function buildTooltip(unit) {
  return {
    backgroundColor: '#101c10',
    borderColor: '#28422a',
    borderWidth: 1,
    titleColor: '#34d399',
    bodyColor: '#d4ead4',
    titleFont: { family: "'JetBrains Mono', monospace", size: 11, weight: 'bold' },
    bodyFont: { family: "'JetBrains Mono', monospace", size: 11 },
    padding: 10,
    callbacks: {
      label: ctx => ` ${ctx.formattedValue} ${unit}`,
    },
  };
}
