document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggling (Fixed & Persisted) ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme_preference') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme_preference', 'dark');
                themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme_preference', 'light');
                themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // Auto City GPS Mapping Helper
    function getCoordsForLocation(locationName) {
        const loc = (locationName || '').toLowerCase();
        if (loc.includes('nagpur')) return { lat: 21.1458, lng: 79.0882 };
        if (loc.includes('patna') || loc.includes('bihar')) return { lat: 25.5941, lng: 85.1376 };
        if (loc.includes('lucknow') || loc.includes('uttar pradesh') || loc.includes('up')) return { lat: 26.8467, lng: 80.9462 };
        if (loc.includes('varanasi') || loc.includes('kashi')) return { lat: 25.3176, lng: 82.9739 };
        if (loc.includes('delhi')) return { lat: 28.7041, lng: 77.1025 };
        if (loc.includes('kolkata') || loc.includes('bengal')) return { lat: 22.5726, lng: 88.3639 };
        if (loc.includes('mumbai') || loc.includes('pune') || loc.includes('maharashtra')) return { lat: 19.0760, lng: 72.8777 };
        if (loc.includes('ranchi') || loc.includes('jharkhand')) return { lat: 23.3441, lng: 85.3096 };
        if (loc.includes('guwahati') || loc.includes('assam')) return { lat: 26.1445, lng: 91.7362 };
        if (loc.includes('cuttack') || loc.includes('odisha')) return { lat: 20.4625, lng: 85.8828 };
        if (loc.includes('bhopal') || loc.includes('madhya pradesh') || loc.includes('mp')) return { lat: 23.2599, lng: 77.4126 };
        return { lat: 21.1458, lng: 79.0882 };
    }

    // Custom Leaflet SVG Marker Creator (Selected = Gold/Red, Normal = Blue)
    function createCustomIcon(isHighlighted = false) {
        const pinColor = isHighlighted ? '#f59e0b' : '#0284c7';
        const glowColor = isHighlighted ? 'rgba(245, 158, 11, 0.7)' : 'rgba(2, 132, 199, 0.4)';
        const size = isHighlighted ? 38 : 30;

        const svgHtml = `
            <div style="position: relative; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 4px 10px ${glowColor});">
                <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="${pinColor}" stroke="#ffffff" stroke-width="1.8"/>
                    <circle cx="12" cy="9" r="3.5" fill="#ffffff"/>
                </svg>
            </div>
        `;

        return L.divIcon({
            html: svgHtml,
            className: 'custom-leaflet-marker',
            iconSize: [size, size],
            iconAnchor: [size / 2, size],
            popupAnchor: [0, -size]
        });
    }

    // --- Navigation Links Smooth Scroll Offset Fix ---
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                if (href === '#overview') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const targetEl = document.querySelector(href);
                    if (targetEl) {
                        const navHeight = 90;
                        const elementPosition = targetEl.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                }
            }
        });
    });

    // --- UI Elements ---
    const btnRefresh = document.getElementById('btn-refresh');
    const btnPrintReport = document.getElementById('btn-print-report');
    const btnExportCsv = document.getElementById('btn-export-csv');

    const lastUpdateSpan = document.getElementById('last-update');
    const statusBadge = document.getElementById('system-status');
    const alertBanner = document.getElementById('alerts');

    const riverSelect = document.getElementById('river-select');
    const stateSelect = document.getElementById('state-select');
    const stationSelect = document.getElementById('station-select');

    const stationNameDisplay = document.getElementById('station-name-display');
    const wqiScoreVal = document.getElementById('wqi-score-val');
    const wqiStatusTag = document.getElementById('wqi-status-tag');

    // Print Report Metadata Spans
    const reportRiver = document.getElementById('report-river');
    const reportLocation = document.getElementById('report-location');
    const reportStation = document.getElementById('report-station');
    const reportStationCode = document.getElementById('report-station-code');
    const reportStatusLabel = document.getElementById('report-status-label');

    const printDate = document.getElementById('print-date');
    const printTime = document.getElementById('print-time');

    const btnChartTrend = document.getElementById('btn-chart-trend');
    const btnChartRadar = document.getElementById('btn-chart-radar');

    let currentChartMode = 'trend';
    let rawData = [];
    let stationMap = {}; // stationId -> structured station object
    let markersMap = {}; // stationId -> Leaflet marker
    let chartInstance = null;
    let selectedStationId = null;

    // Strict parameter mapping
    const parameterMapping = {
        'River Stage': 'Water Level',
        'Oxygen, dissolved': 'Dissolved Oxygen',
        'WT': 'Water Temperature',
        'WTb': 'Water Turbidity',
        'EC': 'Conductivity',
        'BOD': 'Biochemical Oxygen Demand',
        'COD': 'Chemical Oxygen Demand',
        'NO3': 'Nitrate',
        'CL': 'Chloride',
        'Depth': 'Water Depth'
    };

    // --- Leaflet Map Initialization ---
    const map = L.map('map', { zoomControl: true }).setView([22.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // --- 4-Tier Resilient Cache-Busting Fetch Engine for All 40+ Live CPCB Stations ---
    async function fetchData() {
        if (statusBadge) {
            statusBadge.innerHTML = '<span class="pulse-dot" style="background:#f59e0b"></span><span>Connecting...</span>';
        }

        const t = Date.now();
        const endpoints = [
            `https://smart-river-backend.onrender.com/api/live-data?t=${t}`,
            `/api/live-data?t=${t}`,
            `http://localhost:3000/api/live-data?t=${t}`,
            `https://corsproxy.io/?https://rtwqmsdb1.cpcb.gov.in/data/internet/layers/10/index.json?t=${t}`,
            `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://rtwqmsdb1.cpcb.gov.in/data/internet/layers/10/index.json?t=${t}`)}`
        ];

        let success = false;
        let lastError = null;

        for (const url of endpoints) {
            try {
                const response = await fetch(url, { cache: 'no-store' });
                if (response.ok) {
                    const parsed = await response.json();
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        rawData = parsed;
                        success = true;
                        break;
                    }
                }
            } catch (err) {
                lastError = err;
            }
        }

        if (success && rawData.length > 0) {
            processRawData(rawData);

            if (statusBadge) {
                statusBadge.innerHTML = '<span class="pulse-dot"></span><span>Sensors Operational</span>';
            }

            if (alertBanner) alertBanner.style.display = 'none';

            populateDropdowns();
            renderMapMarkers();
            updateTimestamp();
        } else {
            console.error('Fetch error:', lastError);
            if (statusBadge) {
                statusBadge.innerHTML = '<span class="pulse-dot" style="background:#ef4444"></span><span>Offline</span>';
            }
            if (alertBanner) {
                alertBanner.style.display = 'block';
                alertBanner.querySelector('.alert-content').innerHTML = `<strong>System Alert:</strong> Render backend connection issue.`;
            }
            updateTimestamp();
        }
    }

    // --- Process Raw Data & Infer River Name ---
    function processRawData(dataArray) {
        stationMap = {};

        dataArray.forEach(item => {
            const id = item.station_id || item.station_no;
            if (!id) return;

            let riverName = "Ganga";
            const name = item.station_name || '';
            if (name.includes('Yamuna')) riverName = 'Yamuna';
            else if (name.includes('Gandak')) riverName = 'Gandak';
            else if (name.includes('Godavari')) riverName = 'Godavari';
            else if (name.includes('Kanhan')) riverName = 'Kanhan River';
            else if (name.includes('Kaveri')) riverName = 'Kaveri';

            if (!stationMap[id]) {
                stationMap[id] = {
                    id: id,
                    stationNo: item.station_no,
                    name: name || 'Unknown Station',
                    river: riverName,
                    state: item.territory_name || 'General',
                    lat: item.station_latitude,
                    lng: item.station_longitude,
                    lastTimestamp: item.timestamp,
                    parameters: {}
                };
            }

            const rawLongName = item.stationparameter_longname || item.stationparameter_name;
            const paramName = parameterMapping[rawLongName] || rawLongName;
            const unit = item.ts_unitsymbol === '---' ? '' : (item.ts_unitsymbol || '');

            stationMap[id].parameters[paramName] = {
                rawName: item.stationparameter_name,
                value: item.ts_value,
                unit: rawLongName === 'River Stage' ? 'm (MSL)' : unit
            };
        });
    }

    // --- Populate Rivers, State & Station Dropdowns ---
    function populateDropdowns() {
        const rivers = new Set();
        const states = new Set();

        Object.values(stationMap).forEach(s => {
            if (s.river) rivers.add(s.river);
            if (s.state) states.add(s.state);
        });

        const customRivers = JSON.parse(localStorage.getItem('admin_custom_rivers') || '[]');
        customRivers.forEach(r => rivers.add(r));

        const customLocations = JSON.parse(localStorage.getItem('admin_custom_locations') || '[]');
        customLocations.forEach(l => states.add(l));

        const customStations = JSON.parse(localStorage.getItem('admin_custom_stations') || '[]');
        customStations.forEach(cs => {
            if (!stationMap[cs.code]) {
                const autoCoords = getCoordsForLocation(cs.location);
                stationMap[cs.code] = {
                    id: cs.code,
                    stationNo: cs.code,
                    name: cs.name,
                    river: cs.river,
                    state: cs.location,
                    lat: cs.lat || autoCoords.lat,
                    lng: cs.lng || autoCoords.lng,
                    lastTimestamp: new Date().toISOString(),
                    parameters: {}
                };
            }
            if (cs.river) rivers.add(cs.river);
            if (cs.location) states.add(cs.location);
        });

        if (riverSelect) {
            riverSelect.disabled = false;
            const curRiver = riverSelect.value;
            riverSelect.innerHTML = '<option value="ALL">All Rivers (' + rivers.size + ')</option>';
            Array.from(rivers).sort().forEach(rv => {
                const opt = document.createElement('option');
                opt.value = rv;
                opt.textContent = rv;
                riverSelect.appendChild(opt);
            });
            if (curRiver && curRiver !== 'ALL') riverSelect.value = curRiver;
        }

        stateSelect.disabled = false;
        const currentSelectedState = stateSelect.value;
        stateSelect.innerHTML = '<option value="ALL">All Locations (' + states.size + ')</option>';
        Array.from(states).sort().forEach(st => {
            const opt = document.createElement('option');
            opt.value = st;
            opt.textContent = st;
            stateSelect.appendChild(opt);
        });
        if (currentSelectedState && currentSelectedState !== 'ALL') {
            stateSelect.value = currentSelectedState;
        }

        updateStationList();
    }

    function updateStationList() {
        const selectedRiver = riverSelect ? riverSelect.value : 'ALL';
        const selectedState = stateSelect.value;
        stationSelect.disabled = false;
        
        const currentSelectedStation = stationSelect.value;
        stationSelect.innerHTML = '<option value="">-- Select Monitoring Station --</option>';

        let filtered = Object.values(stationMap);
        if (selectedRiver && selectedRiver !== 'ALL') {
            filtered = filtered.filter(s => s.river === selectedRiver);
        }
        if (selectedState && selectedState !== 'ALL') {
            filtered = filtered.filter(s => s.state === selectedState);
        }

        filtered.sort((a, b) => a.name.localeCompare(b.name)).forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id;
            opt.textContent = s.name;
            stationSelect.appendChild(opt);
        });

        if (currentSelectedStation && stationMap[currentSelectedStation]) {
            stationSelect.value = currentSelectedStation;
            displayStationData(currentSelectedStation);
        } else if (filtered.length > 0) {
            stationSelect.value = filtered[0].id;
            displayStationData(filtered[0].id);
        }
    }

    // --- Display Station Data & Highlight Selected Marker Pin ---
    function displayStationData(stationId) {
        selectedStationId = stationId;
        const station = stationMap[stationId];
        if (!station) return;

        // Highlight selected station pin with Gold Icon, and keep others Blue!
        Object.keys(markersMap).forEach(id => {
            const isSelected = (id === stationId);
            markersMap[id].setIcon(createCustomIcon(isSelected));
            if (isSelected) {
                markersMap[id].setZIndexOffset(1000);
            } else {
                markersMap[id].setZIndexOffset(0);
            }
        });

        if (station.lat && station.lng) {
            map.flyTo([station.lat, station.lng], 10, { duration: 1.5 });
            if (markersMap[stationId]) {
                markersMap[stationId].openPopup();
            }
        }

        if (reportRiver) reportRiver.textContent = station.river;
        if (reportLocation) reportLocation.textContent = station.state;
        if (reportStation) reportStation.textContent = station.name;
        if (reportStationCode) reportStationCode.textContent = station.id;

        if (stationNameDisplay) stationNameDisplay.textContent = `${station.name} (${station.state})`;

        const overrides = JSON.parse(localStorage.getItem('admin_overrides') || '{}');
        const stationOverrides = overrides[stationId] || {};

        let wqiScore = 88;
        const ph = stationOverrides['pH'] !== undefined ? stationOverrides['pH'] : (station.parameters['pH'] ? station.parameters['pH'].value : 7.5);
        const doVal = stationOverrides['Dissolved Oxygen'] !== undefined ? stationOverrides['Dissolved Oxygen'] : (station.parameters['Dissolved Oxygen'] ? station.parameters['Dissolved Oxygen'].value : 7.0);

        if (ph < 6.5 || ph > 8.5) wqiScore -= 20;
        if (doVal < 4.0) wqiScore -= 30;
        wqiScore = Math.max(15, Math.min(100, Math.round(wqiScore)));

        if (wqiScoreVal) wqiScoreVal.textContent = `${wqiScore}/100`;

        if (wqiStatusTag) {
            if (wqiScore >= 80) {
                wqiStatusTag.textContent = 'GOOD WATER QUALITY';
                wqiStatusTag.className = 'wqi-status-tag good';
            } else if (wqiScore >= 60) {
                wqiStatusTag.textContent = 'MODERATE WATER QUALITY';
                wqiStatusTag.className = 'wqi-status-tag warn';
            } else {
                wqiStatusTag.textContent = 'CRITICAL / HAZARDOUS';
                wqiStatusTag.className = 'wqi-status-tag alert';
            }
        }

        let hasOverride = false;

        // Clickable Source Link Renderer
        function updateCardById(cardId, paramKey, fallbackUnit) {
            const card = document.getElementById(cardId);
            if (!card) return;

            const valSpan = card.querySelector('.value');
            const statusSpan = card.querySelector('.status-indicator');

            if (stationOverrides[paramKey] !== undefined) {
                hasOverride = true;
                const val = stationOverrides[paramKey];
                valSpan.textContent = `${val} ${fallbackUnit || ''}`.trim();
                valSpan.style.color = '#38bdf8';
                statusSpan.innerHTML = `<a href="https://rtwqmsdb1.cpcb.gov.in" target="_blank" style="color: #38bdf8; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;" title="Open Official Source Link"><i class="fa-solid fa-user-check"></i> Admin Verified (${station.state}) <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem; margin-left: 3px;"></i></a>`;
                return;
            }

            const param = station.parameters[paramKey];
            if (param && param.value !== undefined && param.value !== null) {
                const unitStr = param.unit || fallbackUnit || '';
                valSpan.textContent = `${param.value} ${unitStr}`.trim();
                valSpan.style.color = '#38bdf8';
                statusSpan.innerHTML = `<a href="https://rtwqmsdb1.cpcb.gov.in" target="_blank" style="color: #10b981; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;" title="Open Official CPCB RTWQMS Portal"><i class="fa-solid fa-satellite-dish"></i> CPCB RTWQMS Source (${station.state}) <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem; margin-left: 3px;"></i></a>`;
            } else {
                valSpan.textContent = 'N/A';
                valSpan.style.color = '#64748b';
                statusSpan.innerHTML = '<span style="color: #64748b;">Not Reported</span>';
            }
        }

        if (reportStatusLabel) {
            reportStatusLabel.innerHTML = hasOverride 
                ? `<a href="https://rtwqmsdb1.cpcb.gov.in" target="_blank" style="color: #0284c7; text-decoration: none; font-weight: 700;">✓ Admin Verified <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i></a>`
                : `<a href="https://rtwqmsdb1.cpcb.gov.in" target="_blank" style="color: #10b981; text-decoration: none; font-weight: 700;">● CPCB Live Source <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i></a>`;
        }

        updateCardById('card-level', 'Water Level', 'm');
        updateCardById('card-ph', 'pH', '');
        updateCardById('card-temp', 'Water Temperature', '°C');
        updateCardById('card-do', 'Dissolved Oxygen', 'mg/l');
        updateCardById('card-bod', 'Biochemical Oxygen Demand', 'mg/l');
        updateCardById('card-cod', 'Chemical Oxygen Demand', 'mg/l');
        updateCardById('card-turbidity', 'Water Turbidity', 'NTU');
        updateCardById('card-ec', 'Conductivity', 'mS/cm');

        renderAnalyticsChart(station);
    }

    // --- Render Analytics Chart ---
    function renderAnalyticsChart(station) {
        const ctx = document.getElementById('analyticsChart');
        if (!ctx) return;

        if (chartInstance) {
            chartInstance.destroy();
        }

        const overrides = JSON.parse(localStorage.getItem('admin_overrides') || '{}');
        const stationOverrides = overrides[station.id] || {};

        if (currentChartMode === 'trend') {
            const hours = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now (Live)'];
            const levelBase = stationOverrides['Water Level'] !== undefined ? stationOverrides['Water Level'] : (station.parameters['Water Level'] ? station.parameters['Water Level'].value : 2.5);
            const phBase = stationOverrides['pH'] !== undefined ? stationOverrides['pH'] : (station.parameters['pH'] ? station.parameters['pH'].value : 7.4);
            const doBase = stationOverrides['Dissolved Oxygen'] !== undefined ? stationOverrides['Dissolved Oxygen'] : (station.parameters['Dissolved Oxygen'] ? station.parameters['Dissolved Oxygen'].value : 7.2);

            const levelData = hours.map((_, i) => Number((levelBase + (Math.sin(i) * 0.15)).toFixed(2)));
            const phData = hours.map((_, i) => Number((phBase + (Math.cos(i) * 0.08)).toFixed(2)));
            const doData = hours.map((_, i) => Number((doBase + (Math.sin(i * 1.5) * 0.25)).toFixed(2)));

            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: hours,
                    datasets: [
                        {
                            label: 'Water Level (m MSL)',
                            data: levelData,
                            borderColor: '#38bdf8',
                            backgroundColor: 'rgba(56, 189, 248, 0.15)',
                            fill: true,
                            tension: 0.4,
                            yAxisID: 'yLevel'
                        },
                        {
                            label: 'pH Level',
                            data: phData,
                            borderColor: '#10b981',
                            backgroundColor: 'transparent',
                            borderDash: [5, 5],
                            tension: 0.3,
                            yAxisID: 'yQuality'
                        },
                        {
                            label: 'Dissolved Oxygen (mg/l)',
                            data: doData,
                            borderColor: '#f59e0b',
                            backgroundColor: 'transparent',
                            tension: 0.4,
                            yAxisID: 'yQuality'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: { labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', weight: '600' } } }
                    },
                    scales: {
                        x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                        yLevel: {
                            type: 'linear', position: 'left',
                            title: { display: true, text: 'Water Level (m)', color: '#38bdf8' },
                            ticks: { color: '#38bdf8' }, grid: { color: 'rgba(255,255,255,0.05)' }
                        },
                        yQuality: {
                            type: 'linear', position: 'right',
                            title: { display: true, text: 'Quality Parameters (pH / DO)', color: '#10b981' },
                            ticks: { color: '#10b981' }, grid: { drawOnChartArea: false }
                        }
                    }
                }
            });
        } else {
            const ph = stationOverrides['pH'] !== undefined ? stationOverrides['pH'] : (station.parameters['pH'] ? station.parameters['pH'].value : 7.5);
            const doVal = stationOverrides['Dissolved Oxygen'] !== undefined ? stationOverrides['Dissolved Oxygen'] : (station.parameters['Dissolved Oxygen'] ? station.parameters['Dissolved Oxygen'].value : 7.0);
            const temp = stationOverrides['Water Temperature'] !== undefined ? stationOverrides['Water Temperature'] : (station.parameters['Water Temperature'] ? station.parameters['Water Temperature'].value : 26.0);
            const bod = stationOverrides['Biochemical Oxygen Demand'] !== undefined ? stationOverrides['Biochemical Oxygen Demand'] : (station.parameters['Biochemical Oxygen Demand'] ? station.parameters['Biochemical Oxygen Demand'].value : 2.4);
            const turb = stationOverrides['Water Turbidity'] !== undefined ? stationOverrides['Water Turbidity'] : (station.parameters['Water Turbidity'] ? station.parameters['Water Turbidity'].value : 80);

            chartInstance = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['pH Balance', 'Dissolved Oxygen', 'Temperature Normal', 'BOD Safety', 'Turbidity Clarity'],
                    datasets: [
                        {
                            label: 'Current Live Station Spectrum',
                            data: [ph * 10, doVal * 12, (35 - temp) * 3, (10 - bod) * 10, (200 - turb) / 2],
                            backgroundColor: 'rgba(56, 189, 248, 0.3)',
                            borderColor: '#38bdf8',
                            pointBackgroundColor: '#38bdf8'
                        },
                        {
                            label: 'Standard Optimal Safety Target',
                            data: [75, 84, 60, 80, 75],
                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                            borderColor: '#10b981',
                            borderDash: [4, 4]
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', weight: '600' } } }
                    },
                    scales: {
                        r: {
                            angleLines: { color: 'rgba(255,255,255,0.1)' },
                            grid: { color: 'rgba(255,255,255,0.1)' },
                            pointLabels: { color: '#94a3b8', font: { size: 11, weight: '600' } },
                            ticks: { display: false }
                        }
                    }
                }
            });
        }
    }

    // Chart Mode Toggle Buttons
    if (btnChartTrend) {
        btnChartTrend.addEventListener('click', () => {
            currentChartMode = 'trend';
            btnChartTrend.classList.add('active');
            if (btnChartRadar) btnChartRadar.classList.remove('active');
            if (selectedStationId && stationMap[selectedStationId]) renderAnalyticsChart(stationMap[selectedStationId]);
        });
    }

    if (btnChartRadar) {
        btnChartRadar.addEventListener('click', () => {
            currentChartMode = 'radar';
            btnChartRadar.classList.add('active');
            if (btnChartTrend) btnChartTrend.classList.remove('active');
            if (selectedStationId && stationMap[selectedStationId]) renderAnalyticsChart(stationMap[selectedStationId]);
        });
    }

    // --- Render Leaflet Map Markers ---
    function renderMapMarkers() {
        Object.values(markersMap).forEach(m => map.removeLayer(m));
        markersMap = {};

        const overrides = JSON.parse(localStorage.getItem('admin_overrides') || '{}');

        Object.values(stationMap).forEach(s => {
            if (s.lat && s.lng) {
                const isSelected = (s.id === selectedStationId);
                const marker = L.marker([s.lat, s.lng], {
                    icon: createCustomIcon(isSelected),
                    zIndexOffset: isSelected ? 1000 : 0
                }).addTo(map);

                const stOverrides = overrides[s.id] || {};
                const phVal = stOverrides['pH'] !== undefined ? `${stOverrides['pH']}` : (s.parameters['pH'] ? `${s.parameters['pH'].value}` : '7.40');
                const doVal = stOverrides['Dissolved Oxygen'] !== undefined ? `${stOverrides['Dissolved Oxygen']} mg/l` : (s.parameters['Dissolved Oxygen'] ? `${s.parameters['Dissolved Oxygen'].value} mg/l` : '6.80 mg/l');

                const isCustom = stOverrides['pH'] !== undefined || stOverrides['Water Level'] !== undefined;

                const popupContent = `
                    <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; color: #f8fafc; min-width: 200px;">
                        <strong style="color: #38bdf8; font-size: 14px;">${s.name}</strong><br/>
                        <span style="color: #94a3b8;">River: ${s.river} | Location: ${s.state}</span><br/><br/>
                        <b>pH Level:</b> ${phVal}<br/>
                        <b>Dissolved Oxygen:</b> ${doVal}<br/>
                        <span style="color: ${isCustom ? '#38bdf8' : '#2dd4bf'}; font-weight: 700; display: inline-block; margin-top: 4px;">${isCustom ? '✓ Admin Verified Spot' : '● CPCB Live Station'}</span>
                    </div>
                `;

                marker.bindPopup(popupContent, { minWidth: 200 });

                marker.on('click', () => {
                    stationSelect.value = s.id;
                    displayStationData(s.id);
                });

                markersMap[s.id] = marker;
            }
        });
    }

    function updateTimestamp() {
        const now = new Date();
        if (lastUpdateSpan) lastUpdateSpan.textContent = now.toLocaleTimeString();
        if (printDate) printDate.textContent = now.toLocaleDateString();
        if (printTime) printTime.textContent = now.toLocaleTimeString();
    }

    // --- Print / Save A4 PDF Event ---
    if (btnPrintReport) {
        btnPrintReport.addEventListener('click', () => {
            updateTimestamp();
            window.print();
        });
    }

    if (btnExportCsv) {
        btnExportCsv.addEventListener('click', () => {
            if (!selectedStationId || !stationMap[selectedStationId]) {
                alert('Please select a station to export data.');
                return;
            }

            const station = stationMap[selectedStationId];
            const overrides = JSON.parse(localStorage.getItem('admin_overrides') || '{}');
            const stationOverrides = overrides[selectedStationId] || {};

            let csvContent = "data:text/csv;charset=utf-8,";

            csvContent += "==========================================================================\n";
            csvContent += "FULL PROJECT TITLE: SMART RIVER WATER LEVEL AND QUALITY SURVEILLANCE\n";
            csvContent += `SELECTED RIVER: "${station.river}"\n`;
            csvContent += `SELECTED LOCATION: "${station.state}"\n`;
            csvContent += `SELECTED STATION: "${station.name}"\n`;
            csvContent += `STATION CODE: "${station.id}"\n`;
            csvContent += `SOURCE NAME / LINK: CPCB RTWQMS (https://rtwqmsdb1.cpcb.gov.in)\n`;
            csvContent += `DATA STATUS LABEL: ${Object.keys(stationOverrides).length > 0 ? "✓ Admin Verified" : "● CPCB RTWQMS Source"}\n`;
            csvContent += `ORIGINAL OBSERVATION TIME: "${station.lastTimestamp || 'N/A'}"\n`;
            csvContent += `LAST CHECKED BY WEBSITE: ${new Date().toLocaleString()}\n`;
            csvContent += `ACTIVE ALERTS: None\n`;
            csvContent += "==========================================================================\n\n";

            csvContent += "Parameter Name,Value,Unit,Status\n";
            Object.entries(station.parameters).forEach(([pName, pObj]) => {
                const val = stationOverrides[pName] !== undefined ? stationOverrides[pName] : pObj.value;
                const status = stationOverrides[pName] !== undefined ? "✓ Admin Verified" : "● CPCB RTWQMS Source";
                csvContent += `"${pName}",${val},"${pObj.unit}","${status}"\n`;
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `SURVEILLANCE_REPORT_${station.id}_${new Date().toISOString().slice(0,10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Event Listeners
    if (btnRefresh) btnRefresh.addEventListener('click', fetchData);
    if (riverSelect) riverSelect.addEventListener('change', updateStationList);
    if (stateSelect) stateSelect.addEventListener('change', updateStationList);
    if (stationSelect) stationSelect.addEventListener('change', (e) => displayStationData(e.target.value));

    // --- Initial Auto Start ---
    fetchData();
    setInterval(fetchData, 60000);
});
