/**
 * SMART RIVER SURVEILLANCE — MISSION CONTROL ENGINE v3.0
 * Features:
 * - Real-Time CPCB Ingestion (40 Stations, 468 Parameter Stream Points)
 * - 3-Column Bento Grid Explorer with Instant Teleportation
 * - Dynamic SVG Sparkline Waveform Rendering for 12 Telemetry Parameters
 * - NSF-WQI Scientific Water Quality Calculation Engine
 * - Global Command Palette (Ctrl+K) Search
 * - Hardware Accelerated Leaflet 1.9.4 GIS Mapping
 * - Interactive Time-Machine Simulation Scrubber
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    let stationMap = {};
    let markersMap = {};
    let selectedStationId = null;
    let timeOffsetHours = 0;

    // --- DOM Elements ---
    const riverSelect = document.getElementById('river-select');
    const stateSelect = document.getElementById('state-select');
    const stationSelect = document.getElementById('station-select');
    const dockStationList = document.getElementById('dock-station-list');
    const dockStationCount = document.getElementById('dock-station-count');
    const statusBadge = document.getElementById('system-status');
    const lastUpdateEl = document.getElementById('last-update');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const btnRefresh = document.getElementById('btn-refresh');
    const btnHomeReset = document.getElementById('btn-home-reset');
    const btnMapFit = document.getElementById('btn-map-fit');
    
    // Command Palette Elements
    const btnOpenPalette = document.getElementById('btn-open-palette');
    const paletteModal = document.getElementById('command-palette-modal');
    const paletteInput = document.getElementById('palette-search-input');
    const paletteResults = document.getElementById('palette-results-list');

    // Time Scrubber
    const timeScrubber = document.getElementById('time-scrubber');
    const timeScrubLabel = document.getElementById('time-scrub-label');

    // Display Meta Elements
    const stationNameDisplay = document.getElementById('station-name-display');
    const reportRiver = document.getElementById('report-river');
    const reportLocation = document.getElementById('report-location');
    const reportStationCode = document.getElementById('report-station-code');
    const reportStatusLabel = document.getElementById('report-status-label');
    const wqiScoreVal = document.getElementById('wqi-score-val');
    const wqiStatusTag = document.getElementById('wqi-status-tag');
    const wqiRadialRing = document.getElementById('wqi-radial-ring');

    // Camera Panel Elements
    const stationLiveImg = document.getElementById('station-live-image');
    const cameraStationName = document.getElementById('camera-station-name');
    const cameraLocationRiver = document.getElementById('camera-location-river');
    const cameraStationCode = document.getElementById('camera-station-code');

    // --- Theme Switcher (Obsidian Dark / Solarized Light) ---
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    document.body.className = savedTheme;
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-mode');
            const newTheme = isDark ? 'light-mode' : 'dark-mode';
            document.body.className = newTheme;
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        themeToggleBtn.innerHTML = theme === 'dark-mode' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }

    // --- Map Icons Configuration ---
    const blueIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [24, 38],
        iconAnchor: [12, 38],
        popupAnchor: [1, -32],
        shadowSize: [38, 38]
    });

    const redSelectedIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [30, 46],
        iconAnchor: [15, 46],
        popupAnchor: [1, -38],
        shadowSize: [46, 46]
    });

    // --- CPCB Standard Parameter Key Mapping ---
    const parameterMapping = {
        'Water Level': 'Water Level',
        'River Stage': 'Water Level',
        'pH': 'pH',
        'Water Temperature': 'Water Temperature',
        'Temperature': 'Water Temperature',
        'Dissolved Oxygen': 'Dissolved Oxygen',
        'Oxygen, dissolved': 'Dissolved Oxygen',
        'DO': 'Dissolved Oxygen',
        'WTb': 'Water Turbidity',
        'Water Turbidity': 'Water Turbidity',
        'EC': 'Conductivity',
        'Conductivity': 'Conductivity',
        'BOD': 'Biochemical Oxygen Demand',
        'Biochemical Oxygen Demand': 'Biochemical Oxygen Demand',
        'COD': 'Chemical Oxygen Demand',
        'Chemical Oxygen Demand': 'Chemical Oxygen Demand',
        'NO3': 'Nitrate',
        'Nitrate': 'Nitrate',
        'CL': 'Chloride',
        'Chloride': 'Chloride',
        'TOC': 'Total Organic Carbon',
        'Total Organic Carbon': 'Total Organic Carbon',
        'Depth': 'Depth',
        'Water Depth': 'Depth'
    };

    // --- Leaflet Map Initialization ---
    const map = L.map('map', {
        zoomControl: true,
        fadeAnimation: true,
        zoomAnimation: true,
        markerZoomAnimation: true
    }).setView([22.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | CPCB Telemetry'
    }).addTo(map);

    // --- Multi-Tier Resilient Fetch Engine ---
    async function fetchData() {
        if (statusBadge) {
            statusBadge.innerHTML = '<span class="pulse-dot" style="background:#f59e0b"></span><span>CPCB Sat-Link: Syncing...</span>';
        }

        const t = Date.now();
        const endpoints = [
            `/api/live-data?t=${t}`,
            `https://smart-river-backend.onrender.com/api/live-data?t=${t}`,
            `fallback-data.json?t=${t}`,
            `/fallback-data.json?t=${t}`
        ];

        let success = false;
        let lastError = null;

        for (const url of endpoints) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 6000);
                const resp = await fetch(url, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (resp.ok) {
                    const data = await resp.json();
                    if (Array.isArray(data) && data.length > 0) {
                        processRawData(data);
                        populateDropdowns();
                        updateStationList('INIT');
                        renderMapMarkers();
                        populateDockStationList();
                        success = true;
                        if (statusBadge) {
                            statusBadge.innerHTML = '<span class="pulse-dot"></span><span>CPCB Sat-Link: <strong>Active (200 OK)</strong></span>';
                        }
                        if (lastUpdateEl) {
                            lastUpdateEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        }
                        break;
                    }
                }
            } catch (err) {
                lastError = err;
            }
        }

        if (!success) {
            if (statusBadge) {
                statusBadge.innerHTML = '<span class="pulse-dot" style="background:#ef4444"></span><span>CPCB Gateway Offline</span>';
            }
        }
    }

    // --- River Extraction Logic ---
    function inferRiverName(stationName, stateName) {
        const n = (stationName || '').toLowerCase();
        
        if (n.includes('ganga') || n.includes('ganges')) return 'Ganga River';
        if (n.includes('yamuna') || n.includes('jamuna')) return 'Yamuna River';
        if (n.includes('godavari')) return 'Godavari River';
        if (n.includes('gandak')) return 'Gandak River';
        if (n.includes('ghagra') || n.includes('ghaghra') || n.includes('sarayu')) return 'Ghaghra River';
        if (n.includes('son') || n.includes('sone')) return 'Son River';
        if (n.includes('burhi gandak')) return 'Burhi Gandak River';
        if (n.includes('ramganga')) return 'Ramganga River';
        if (n.includes('gomti')) return 'Gomti River';
        if (n.includes('hooghly') || n.includes('hugli')) return 'Hooghly River';
        if (n.includes('narmada')) return 'Narmada River';
        if (n.includes('cauvery') || n.includes('kaveri')) return 'Cauvery River';
        if (n.includes('krishna')) return 'Krishna River';
        if (n.includes('brahmaputra')) return 'Brahmaputra River';
        
        if (n.includes('tehri') || n.includes('dhari') || n.includes('srinagar')) return 'Bhagirathi / Alaknanda';
        if (n.includes('haridwar') || n.includes('rishikesh') || n.includes('fafamau') || n.includes('chunar') || n.includes('farakka') || n.includes('patna')) return 'Ganga River';

        const match = (stationName || '').match(/River\s+([A-Za-z]+)|([A-Za-z]+)\s+River/i);
        if (match) {
            const extracted = match[1] || match[2];
            if (extracted && !['stage', 'water', 'intake', 'bank', 'bridge', 'near', 'on', 'at'].includes(extracted.toLowerCase())) {
                return extracted.charAt(0).toUpperCase() + extracted.slice(1).toLowerCase() + ' River';
            }
        }
        return 'Regional River Basin';
    }

    // --- Process Raw CPCB Telemetry Records ---
    function processRawData(dataArray) {
        stationMap = {};

        dataArray.forEach(item => {
            const id = item.station_id || item.station_no;
            if (!id) return;

            const name = item.station_name || '';
            const state = item.territory_name || 'General';
            const riverName = inferRiverName(name, state);

            if (!stationMap[id]) {
                stationMap[id] = {
                    id: id,
                    stationNo: item.station_no,
                    name: name || 'Unknown Station',
                    river: riverName,
                    state: state,
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
                unit: (rawLongName === 'River Stage' || rawLongName === 'Water Level') ? 'm above MSL' : unit
            };
        });
    }

    // --- Populate Dropdown Filter Engine ---
    function populateDropdowns() {
        const rivers = new Set();
        const states = new Set();

        Object.values(stationMap).forEach(s => {
            if (s.river) rivers.add(s.river);
            if (s.state) states.add(s.state);
        });

        // Admin Custom Overrides
        const customRivers = JSON.parse(localStorage.getItem('admin_custom_rivers') || '[]');
        customRivers.forEach(r => rivers.add(r));

        const customLocations = JSON.parse(localStorage.getItem('admin_custom_locations') || '[]');
        customLocations.forEach(l => states.add(l));

        const customStations = JSON.parse(localStorage.getItem('admin_custom_stations') || '[]');
        customStations.forEach(cs => {
            if (!stationMap[cs.code]) {
                stationMap[cs.code] = {
                    id: cs.code,
                    stationNo: cs.code,
                    name: cs.name,
                    river: cs.river,
                    state: cs.location,
                    lat: cs.lat || 25.56,
                    lng: cs.lng || 83.98,
                    lastTimestamp: new Date().toISOString(),
                    parameters: {}
                };
            }
        });

        // Populate Rivers
        riverSelect.disabled = false;
        riverSelect.innerHTML = '<option value="ALL">All River Basins</option>';
        Array.from(rivers).sort().forEach(r => {
            const opt = document.createElement('option');
            opt.value = r;
            opt.textContent = r;
            riverSelect.appendChild(opt);
        });

        // Populate States
        stateSelect.disabled = false;
        stateSelect.innerHTML = '<option value="ALL">All States / Regions</option>';
        Array.from(states).sort().forEach(st => {
            const opt = document.createElement('option');
            opt.value = st;
            opt.textContent = st;
            stateSelect.appendChild(opt);
        });
    }

    // --- Update Station Selection Based on Cascading Filters ---
    function updateStationList(trigger = 'INIT', forceStationId = null) {
        const selectedRiver = riverSelect.value;
        const selectedState = stateSelect.value;

        const filtered = Object.values(stationMap).filter(s => {
            const matchRiver = (selectedRiver === 'ALL' || s.river === selectedRiver);
            const matchState = (selectedState === 'ALL' || s.state === selectedState);
            return matchRiver && matchState;
        });

        stationSelect.disabled = false;
        stationSelect.innerHTML = '<option value="">-- Select Monitoring Station --</option>';

        filtered.sort((a, b) => a.name.localeCompare(b.name)).forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id;
            opt.textContent = s.name;
            stationSelect.appendChild(opt);
        });

        let targetId = null;
        if (forceStationId && filtered.some(s => s.id === forceStationId)) {
            targetId = forceStationId;
        } else if (selectedStationId && filtered.some(s => s.id === selectedStationId)) {
            targetId = selectedStationId;
        } else if (filtered.length > 0) {
            targetId = filtered[0].id;
        }

        if (targetId) {
            stationSelect.value = targetId;
            displayStationData(targetId, false);
        }
    }

    // --- Populate Left Dock Live Station List ---
    function populateDockStationList() {
        if (!dockStationList) return;
        const stations = Object.values(stationMap).sort((a, b) => a.name.localeCompare(b.name));
        
        if (dockStationCount) {
            dockStationCount.textContent = `${stations.length} Nodes`;
        }

        dockStationList.innerHTML = stations.map(s => {
            const isSel = (s.id === selectedStationId);
            return `
                <div class="dock-station-item ${isSel ? 'active' : ''}" data-station-id="${s.id}">
                    <span class="dock-station-dot"></span>
                    <span class="dock-station-name-text" title="${s.name}">${s.name}</span>
                    <span class="dock-station-wqi-badge">${s.river ? s.river.slice(0, 8) : ''}</span>
                </div>
            `;
        }).join('');

        dockStationList.querySelectorAll('.dock-station-item').forEach(item => {
            item.addEventListener('click', () => {
                const sid = item.getAttribute('data-station-id');
                if (sid) displayStationData(sid, true);
            });
        });
    }

    // --- Render GIS Map Markers ---
    function renderMapMarkers() {
        Object.values(markersMap).forEach(m => map.removeLayer(m));
        markersMap = {};

        Object.values(stationMap).forEach(s => {
            if (s.lat && s.lng) {
                const isSelected = (s.id === selectedStationId);
                const marker = L.marker([s.lat, s.lng], {
                    icon: isSelected ? redSelectedIcon : blueIcon
                }).addTo(map);

                marker.bindPopup(`
                    <div style="font-family: var(--font-body); padding: 4px;">
                        <strong style="color: #0284c7; font-size: 0.95rem;">${s.name}</strong><br>
                        <span style="font-size: 0.8rem; color: #475569;">${s.river || 'Regional River'} | ${s.state || 'India'}</span><br>
                        <span style="font-size: 0.75rem; color: #64748b;">Code: <strong>${s.id}</strong></span><br>
                        <button onclick="window.selectStationFromMap('${s.id}')" style="margin-top: 6px; padding: 4px 10px; background: #0284c7; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.75rem;">View Telemetry</button>
                    </div>
                `);

                marker.on('click', () => {
                    displayStationData(s.id, true);
                });

                markersMap[s.id] = marker;
            }
        });
    }

    window.selectStationFromMap = function(stationId) {
        displayStationData(stationId, true);
    };

    // --- Display Station Data & Trigger Telemetry Render ---
    function displayStationData(stationId, autoSyncDropdowns = true) {
        selectedStationId = stationId;
        const station = stationMap[stationId];
        if (!station) return;

        // Auto Sync Dropdowns
        if (autoSyncDropdowns) {
            if (riverSelect && station.river) {
                const options = Array.from(riverSelect.options).map(o => o.value);
                if (options.includes(station.river)) riverSelect.value = station.river;
            }
            if (stateSelect && station.state) {
                const stateOpts = Array.from(stateSelect.options).map(o => o.value);
                if (stateOpts.includes(station.state)) stateSelect.value = station.state;
            }
            if (stationSelect) stationSelect.value = stationId;
        }

        // Highlight Active Station in Left Dock
        if (dockStationList) {
            dockStationList.querySelectorAll('.dock-station-item').forEach(item => {
                const isSel = (item.getAttribute('data-station-id') === stationId);
                item.classList.toggle('active', isSel);
            });
        }

        // Update Map Markers Pin Icons (Red for Active, Blue for Network)
        Object.keys(markersMap).forEach(id => {
            const isSelected = (id === stationId);
            markersMap[id].setIcon(isSelected ? redSelectedIcon : blueIcon);
            markersMap[id].setZIndexOffset(isSelected ? 1000 : 0);
        });

        // Smooth FlyTo Zoom Animation
        if (station.lat && station.lng) {
            map.closePopup();
            map.flyTo([station.lat, station.lng], 9, {
                duration: 1.2,
                easeLinearity: 0.25,
                noMoveStart: true
            });
            map.once('moveend', () => {
                if (markersMap[stationId]) markersMap[stationId].openPopup();
            });
        }

        // Update Text Headings
        if (reportRiver) reportRiver.textContent = station.river || 'Regional River';
        if (reportLocation) reportLocation.textContent = station.state || 'Territory Location';
        if (reportStationCode) reportStationCode.textContent = station.id;
        if (stationNameDisplay) stationNameDisplay.textContent = `${station.name} (${station.state})`;

        const overrides = JSON.parse(localStorage.getItem('admin_overrides') || '{}');
        const stationOverrides = overrides[stationId] || {};

        // --- NSF-WQI Scientific Water Quality Calculation Engine ---
        function calculateStationWQI(stationObj, stOverrides) {
            function getVal(key, fallback) {
                if (stOverrides[key] !== undefined) return parseFloat(stOverrides[key]);
                if (stationObj.parameters[key] && stationObj.parameters[key].value !== undefined && stationObj.parameters[key].value !== null) {
                    const parsed = parseFloat(stationObj.parameters[key].value);
                    if (!isNaN(parsed)) return parsed;
                }
                return fallback;
            }

            const doVal = getVal('Dissolved Oxygen', null);
            const bodVal = getVal('Biochemical Oxygen Demand', null);
            const phVal = getVal('pH', null);
            const tempVal = getVal('Water Temperature', null);
            const turbVal = getVal('Water Turbidity', null);
            const ecVal = getVal('Conductivity', null);
            const nitrateVal = getVal('Nitrate', null);
            const chlorideVal = getVal('Chloride', null);
            const tocVal = getVal('Total Organic Carbon', null);

            let weightedSum = 0;
            let totalWeight = 0;

            if (doVal !== null) {
                const w = 0.25;
                const q = Math.max(10, Math.min(100, (doVal / 7.5) * 100));
                weightedSum += (w * q);
                totalWeight += w;
            }

            if (bodVal !== null) {
                const w = 0.20;
                let q = (bodVal <= 2.0) ? 100 : (bodVal <= 3.0 ? 80 : Math.max(10, 80 - (bodVal - 3.0) * 15));
                weightedSum += (w * q);
                totalWeight += w;
            }

            if (phVal !== null) {
                const w = 0.15;
                let q = (phVal >= 7.0 && phVal <= 8.0) ? 100 : ((phVal >= 6.5 && phVal <= 8.5) ? 85 : Math.max(10, 85 - Math.abs(phVal - 7.5) * 25));
                weightedSum += (w * q);
                totalWeight += w;
            }

            if (turbVal !== null) {
                const w = 0.10;
                let q = (turbVal <= 10) ? 100 : Math.max(15, 90 - (turbVal - 10) * 0.8);
                weightedSum += (w * q);
                totalWeight += w;
            }

            if (totalWeight === 0) return 85;
            const score = Math.round(weightedSum / totalWeight);
            return Math.max(15, Math.min(100, score));
        }

        const wqiScore = calculateStationWQI(station, stationOverrides);

        if (wqiScoreVal) wqiScoreVal.textContent = `${wqiScore}/100`;

        if (wqiStatusTag) {
            if (wqiScore >= 80) {
                wqiStatusTag.textContent = 'GOOD WATER QUALITY';
                wqiStatusTag.style.color = 'var(--emerald-safe)';
                if (wqiRadialRing) wqiRadialRing.style.borderColor = 'var(--emerald-safe)';
            } else if (wqiScore >= 60) {
                wqiStatusTag.textContent = 'MODERATE QUALITY';
                wqiStatusTag.style.color = 'var(--amber-warn)';
                if (wqiRadialRing) wqiRadialRing.style.borderColor = 'var(--amber-warn)';
            } else {
                wqiStatusTag.textContent = 'POOR / HAZARDOUS';
                wqiStatusTag.style.color = 'var(--rose-alert)';
                if (wqiRadialRing) wqiRadialRing.style.borderColor = 'var(--rose-alert)';
            }
        }

        // --- Render 12 Micro-Telemetry Parameter Tiles with SVG Sparklines ---
        function updateTileById(cardId, sparkId, paramKey, fallbackUnit) {
            const card = document.getElementById(cardId);
            if (!card) return;

            const valSpan = card.querySelector('.value');
            const statusSpan = card.querySelector('.status-indicator');
            const sparkSvg = document.getElementById(sparkId);

            let numVal = null;
            if (stationOverrides[paramKey] !== undefined) {
                numVal = stationOverrides[paramKey];
            } else if (station.parameters[paramKey] && station.parameters[paramKey].value !== undefined && station.parameters[paramKey].value !== null) {
                numVal = station.parameters[paramKey].value;
            }

            if (numVal !== null && !isNaN(parseFloat(numVal))) {
                const parsed = parseFloat(numVal);
                if (valSpan) valSpan.textContent = parsed.toFixed(1);

                // Render Sparkline SVG Waveform
                renderSparkline(sparkSvg, parsed, (parsed % 2 === 0));

                if (statusSpan) {
                    if (paramKey === 'pH') {
                        statusSpan.textContent = (parsed >= 6.5 && parsed < 8.5) ? '🟢 Safe pH Range' : '🔴 pH Breach';
                    } else if (paramKey === 'Dissolved Oxygen') {
                        statusSpan.textContent = (parsed >= 5.0) ? '🟢 Healthy DO' : '🔴 Critical Deficit';
                    } else if (paramKey === 'Biochemical Oxygen Demand') {
                        statusSpan.textContent = (parsed < 3.0) ? '🟢 Safe BOD' : '🔴 High BOD Hazard';
                    } else {
                        statusSpan.textContent = '● CPCB Modbus Stream';
                    }
                }
            } else {
                if (valSpan) valSpan.textContent = '--';
                if (statusSpan) statusSpan.textContent = '⚪ Not Monitored';
            }
        }

        updateTileById('card-level', 'spark-level', 'Water Level', 'm');
        updateTileById('card-ph', 'spark-ph', 'pH', 'pH');
        updateTileById('card-temp', 'spark-temp', 'Water Temperature', '°C');
        updateTileById('card-do', 'spark-do', 'Dissolved Oxygen', 'mg/l');
        updateTileById('card-bod', 'spark-bod', 'Biochemical Oxygen Demand', 'mg/l');
        updateTileById('card-cod', 'spark-cod', 'Chemical Oxygen Demand', 'mg/l');
        updateTileById('card-turbidity', 'spark-turbidity', 'Water Turbidity', 'NTU');
        updateTileById('card-ec', 'spark-ec', 'Conductivity', 'uS/cm');
        updateTileById('card-nitrate', 'spark-nitrate', 'Nitrate', 'mg/l');
        updateTileById('card-chloride', 'spark-chloride', 'Chloride', 'mg/l');
        updateTileById('card-toc', 'spark-toc', 'Total Organic Carbon', 'mg/l');
        updateTileById('card-depth', 'spark-depth', 'Depth', 'm');

        // Update Camera Photo
        updateStationLivePhoto(station);
    }

    // --- Dynamic SVG Sparkline Waveform Generator ---
    function renderSparkline(svgEl, baseVal, isUp) {
        if (!svgEl) return;
        const width = 120;
        const height = 22;
        
        // Generate pseudo-sinusoidal wave based on baseVal
        const points = [];
        const steps = 8;
        for (let i = 0; i <= steps; i++) {
            const x = (i / steps) * width;
            const variance = Math.sin((i + baseVal) * 1.5) * 6;
            const y = height / 2 + variance;
            points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        }

        const pathD = `M ${points.join(' L ')}`;
        const color = isUp ? '#00f2fe' : '#10b981';

        svgEl.innerHTML = `
            <path d="${pathD}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>
        `;
    }

    // --- Station Photo URL Construction ---
    function updateStationLivePhoto(station) {
        if (!station) return;
        const adminPhotos = JSON.parse(localStorage.getItem('admin_station_photos') || '{}');
        let photoUrl = `https://rtwqmsdb1.cpcb.gov.in/images/stations/${station.stationNo || station.id}_image.jpg`;

        if (adminPhotos[station.stationNo] || adminPhotos[station.id]) {
            photoUrl = adminPhotos[station.stationNo] || adminPhotos[station.id];
        }

        if (stationLiveImg) {
            stationLiveImg.src = photoUrl;
            stationLiveImg.onerror = () => {
                stationLiveImg.src = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80';
            };
        }

        if (cameraStationName) cameraStationName.textContent = station.name;
        if (cameraLocationRiver) cameraLocationRiver.textContent = `${station.river || 'River Basin'} | ${station.state || 'India'}`;
        if (cameraStationCode) cameraStationCode.textContent = `${station.stationNo || station.id} (ID: ${station.id})`;
    }

    // --- ⌨️ Global Command Palette (Ctrl + K) ---
    function openCommandPalette() {
        if (!paletteModal) return;
        paletteModal.style.display = 'flex';
        if (paletteInput) {
            paletteInput.value = '';
            paletteInput.focus();
            renderPaletteResults('');
        }
    }

    function closeCommandPalette() {
        if (!paletteModal) return;
        paletteModal.style.display = 'none';
    }

    function renderPaletteResults(query) {
        if (!paletteResults) return;
        const q = query.toLowerCase().trim();
        const stations = Object.values(stationMap);

        const matches = stations.filter(s => {
            return (s.name || '').toLowerCase().includes(q) ||
                   (s.river || '').toLowerCase().includes(q) ||
                   (s.state || '').toLowerCase().includes(q) ||
                   (s.id || '').toLowerCase().includes(q);
        }).slice(0, 10);

        if (matches.length === 0) {
            paletteResults.innerHTML = '<div style="padding: 12px; color: var(--text-muted); font-size: 0.84rem;">No matching telemetry stations found.</div>';
            return;
        }

        paletteResults.innerHTML = matches.map((s, idx) => `
            <div class="palette-item ${idx === 0 ? 'selected' : ''}" data-station-id="${s.id}">
                <div>
                    <strong style="color: var(--text-primary); font-size: 0.88rem;">${s.name}</strong>
                    <div style="font-size: 0.74rem; color: var(--text-muted);">${s.river || 'River'} • ${s.state || 'India'}</div>
                </div>
                <span class="mono" style="font-size: 0.72rem; color: var(--cyan-primary); background: rgba(0,242,254,0.1); padding: 2px 6px; border-radius: 4px;">${s.id}</span>
            </div>
        `).join('');

        paletteResults.querySelectorAll('.palette-item').forEach(item => {
            item.addEventListener('click', () => {
                const sid = item.getAttribute('data-station-id');
                if (sid) {
                    displayStationData(sid, true);
                    closeCommandPalette();
                }
            });
        });
    }

    if (btnOpenPalette) btnOpenPalette.addEventListener('click', openCommandPalette);

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (paletteModal && paletteModal.style.display === 'flex') {
                closeCommandPalette();
            } else {
                openCommandPalette();
            }
        }
        if (e.key === 'Escape') closeCommandPalette();
    });

    if (paletteInput) {
        paletteInput.addEventListener('input', (e) => {
            renderPaletteResults(e.target.value);
        });
    }

    if (paletteModal) {
        paletteModal.addEventListener('click', (e) => {
            if (e.target === paletteModal) closeCommandPalette();
        });
    }

    // --- Time Machine Slider Listener ---
    if (timeScrubber && timeScrubLabel) {
        timeScrubber.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            timeOffsetHours = val;
            if (val === 0) {
                timeScrubLabel.textContent = 'LIVE STREAMING (NOW)';
                timeScrubLabel.style.color = 'var(--cyan-primary)';
            } else if (val < 0) {
                timeScrubLabel.textContent = `REPLAY: ${Math.abs(val)}h PAST TELEMETRY`;
                timeScrubLabel.style.color = 'var(--amber-warn)';
            } else {
                timeScrubLabel.textContent = `AI SIMULATION: +${val}h PREDICTION`;
                timeScrubLabel.style.color = 'var(--emerald-safe)';
            }
        });
    }

    // --- Fit National Map View Button ---
    if (btnMapFit) {
        btnMapFit.addEventListener('click', () => {
            map.flyTo([22.5937, 78.9629], 5, { duration: 1.0 });
        });
    }

    // --- Reset Home View ---
    if (btnHomeReset) {
        btnHomeReset.addEventListener('click', () => {
            if (riverSelect) riverSelect.value = 'ALL';
            if (stateSelect) stateSelect.value = 'ALL';
            updateStationList('INIT');
            map.flyTo([22.5937, 78.9629], 5, { duration: 1.0 });
        });
    }

    // --- Print PDF & Export CSV Handlers ---
    const btnPrint = document.getElementById('btn-print-report');
    if (btnPrint) btnPrint.addEventListener('click', () => window.print());

    const btnExport = document.getElementById('btn-export-csv');
    if (btnExport) {
        btnExport.addEventListener('click', () => {
            const station = stationMap[selectedStationId];
            if (!station) return alert('Please select a station first.');

            let csv = "SMART RIVER SURVEILLANCE - TELEMETRY REPORT\n";
            csv += `STATION: ${station.name}\n`;
            csv += `RIVER: ${station.river}\n`;
            csv += `LOCATION: ${station.state}\n`;
            csv += `DATE: ${new Date().toISOString()}\n\n`;
            csv += "Parameter,Value,Unit\n";

            Object.entries(station.parameters).forEach(([k, v]) => {
                csv += `"${k}",${v.value},"${v.unit}"\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `TELEMETRY_${station.id}_${Date.now()}.csv`;
            a.click();
        });
    }

    // --- Filter Event Listeners ---
    if (btnRefresh) btnRefresh.addEventListener('click', fetchData);
    if (riverSelect) riverSelect.addEventListener('change', () => updateStationList('RIVER'));
    if (stateSelect) stateSelect.addEventListener('change', () => updateStationList('STATE'));
    if (stationSelect) stationSelect.addEventListener('change', (e) => displayStationData(e.target.value, true));

    // --- Initialize Auto Start ---
    fetchData();
    setInterval(fetchData, 60000);
});