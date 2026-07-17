function initDashboardOnOpen() {
  const opener = document.querySelector('[data-open-detail="linkedin-dashboard"]');
  if (!opener) return;

  let built = false;

  const build = () => {
    if (built) return;
    const lineCanvas = document.getElementById('dashLineChart');
    if (!lineCanvas || typeof Chart === 'undefined') return;
    built = true;

    const teal = '#006555';
    const orange = '#F3946B';
    const bodyText = '#4B5D58';
    const gridLine = 'rgba(211,190,163,0.35)';

    const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    const engagementData = [6.4,6.6,6.5,7.1,7.4,7.3,7.9,8.4,8.2,8.9,
                             9.6,9.8,10.4,10.9,11.2,11.8,12.1,12.6,13.0,13.5,
                             14.1,14.6,15.0,15.4,15.9,16.3,16.7,17.1,17.4,17.7];
    const followerData = [0,4,9,15,19,26,33,41,47,55,
                           64,73,82,93,104,116,128,141,155,169,
                           184,200,217,235,253,272,292,313,335,412];

    const lineChart = new Chart(lineCanvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Engagement Rate (%)',
          data: engagementData,
          borderColor: teal,
          backgroundColor: 'rgba(0,101,85,0.08)',
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: orange,
          tension: 0.35,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { maxTicksLimit: 6, color: bodyText, font: { family: 'Manrope', size: 11 } } },
          y: { grid: { color: gridLine }, ticks: { color: bodyText, font: { family: 'Manrope', size: 11 }, callback: v => v + '%' } }
        },
        interaction: { intersect: false, mode: 'index' }
      }
    });

    document.querySelectorAll('.dash-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.dash-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const metric = btn.dataset.dashMetric;
        if (metric === 'engagement') {
          lineChart.data.datasets[0].label = 'Engagement Rate (%)';
          lineChart.data.datasets[0].data = engagementData;
          lineChart.options.scales.y.ticks.callback = v => v + '%';
        } else {
          lineChart.data.datasets[0].label = 'Follower Growth';
          lineChart.data.datasets[0].data = followerData;
          lineChart.options.scales.y.ticks.callback = v => '+' + v;
        }
        lineChart.update();
      });
    });
  };

  opener.addEventListener('click', () => requestAnimationFrame(() => requestAnimationFrame(build)));
}
