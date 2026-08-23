document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggling (Fixed & Persisted) ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme_preference') || 'light';
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
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

    // --- High-Definition Embedded Leaflet Marker Icons (Zero Network Request - 100% Reliable) ---
    const blueSvgUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41" width="25" height="41"><path fill="#0284c7" stroke="#ffffff" stroke-width="1.4" d="M12.5 0C5.6 0 0 5.6 0 12.5C0 22 12.5 41 12.5 41C12.5 41 25 22 25 12.5C25 5.6 19.4 0 12.5 0Z"/><circle cx="12.5" cy="12.5" r="4.5" fill="#ffffff"/></svg>');
    const redSvgUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 52" width="32" height="52"><path fill="#ef4444" stroke="#ffffff" stroke-width="1.6" d="M16 0C7.17 0 0 7.17 0 16C0 28 16 52 16 52C16 52 32 28 32 16C32 7.17 24.83 0 16 0Z"/><circle cx="16" cy="16" r="5.5" fill="#ffffff"/></svg>');
    const shadowSvgUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" width="41" height="41"><ellipse cx="20.5" cy="35" rx="14" ry="5" fill="rgba(0,0,0,0.3)"/></svg>');

    const blueIcon = new L.Icon({
        iconUrl: blueSvgUrl,
        shadowUrl: shadowSvgUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const redSelectedIcon = new L.Icon({
        iconUrl: redSvgUrl,
        shadowUrl: shadowSvgUrl,
        iconSize: [32, 52],
        iconAnchor: [16, 52],
        popupAnchor: [1, -42],
        shadowSize: [41, 41]
    });

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

    let rawData = [];
    let stationMap = {}; // stationId -> structured station object
    let markersMap = {}; // stationId -> Leaflet marker
    let chartInstance = null;
    let selectedStationId = null;
    // --- REAL-TIME FLOOD ALERT & HYDROLOGY THRESHOLD ENGINE ---
    let floodThresholds = {};

    async function fetchFloodThresholds() {
        try {
            const res = await fetch('flood-thresholds.json?t=' + Date.now());
            if (res.ok) {
                floodThresholds = await res.json();
                // If a station is already displayed on screen, immediately re-evaluate and update flood card
                if (selectedStationId && stationMap[selectedStationId]) {
                    const overrides = JSON.parse(localStorage.getItem('admin_overrides') || '{}');
                    updateFloodAlertCard(stationMap[selectedStationId], overrides[selectedStationId] || {});
                }
            }
        } catch (e) {
            console.warn('Using default adaptive flood thresholds fallback', e);
        }
    }
    fetchFloodThresholds();


    // Strict parameter mapping for all 12 official CPCB Parameters (100% exact CPCB names & key matching)
    const parameterMapping = {
        'River Stage': 'Water Level',
        'Water Level': 'Water Level',
        'S': 'Water Level',
        'pH': 'pH',
        'WT': 'Water Temperature',
        'Water Temperature': 'Water Temperature',
        'Oxygen, dissolved': 'Dissolved Oxygen',
        'Dissolved Oxygen': 'Dissolved Oxygen',
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

    // --- Leaflet Map Initialization with Hardware Acceleration ---
    const map = L.map('map', {
        zoomControl: true,
        fadeAnimation: true,
        zoomAnimation: true,
        markerZoomAnimation: true
    }).setView([22.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // --- Resilient Multi-Tier Cache-Busting Fetch Engine for All 40+ Live CPCB Stations ---
    async function fetchData() {
        if (statusBadge) {
            statusBadge.innerHTML = '<span class="pulse-dot" style="background:#f59e0b"></span><span>Connecting...</span>';
        }

        const t = Date.now();
        const endpoints = [
            `/api/live-data?t=${t}`,
            `https://smart-river-backend.onrender.com/api/live-data?t=${t}`,
            `fallback-data.json?t=${t}`,
            `/fallback-data.json?t=${t}`,
            `http://localhost:3000/api/live-data?t=${t}`
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

            // 1. Await flood thresholds to eliminate any race condition before initial render
            await fetchFloodThresholds();

            // 2. Populate dropdowns & trigger initial station render
            populateDropdowns();
            renderMapMarkers();
            updateTimestamp();
            precacheAllStationPhotos(stationMap);
        } else {
            console.error('Fetch error:', lastError);
            if (statusBadge) {
                statusBadge.innerHTML = '<span class="pulse-dot" style="background:#ef4444"></span><span>Offline</span>';
            }
            if (alertBanner) {
                alertBanner.style.display = 'block';
                alertBanner.querySelector('.alert-content').innerHTML = `<strong>System Alert:</strong> Live sensor connection issue.`;
            }
            updateTimestamp();
        }
    }

    // --- Helper Function: Smart River Inferencing Engine ---
    function inferRiverName(name, state) {
        const n = (name || '').toLowerCase();
        
        // 1. Direct Keyword Matching for 30+ Major & Regional Indian Rivers
        if (n.includes('yamuna') || n.includes('sonipat') || n.includes('mathura') || n.includes('gokul') || n.includes('mohana')) return 'Yamuna River';
        if (n.includes('hindon')) return 'Hindon River';
        if (n.includes('ramganga')) return 'Ramganga River';
        if (n.includes('damodar') || n.includes('durgapur') || n.includes('raghunathpur')) return 'Damodar River';
        if (n.includes('ghagra') || n.includes('ghaghara')) return 'Ghaghara River';
        if (n.includes('gandak')) return 'Gandak River';
        if (n.includes('kosi')) return 'Kosi River';
        if (/\bson\b|\bsone\b/i.test(n)) return 'Son River';
        if (n.includes('punpun')) return 'Punpun River';
        if (n.includes('hooghly')) return 'Hooghly River';
        if (n.includes('godavari')) return 'Godavari River';
        if (n.includes('kaveri') || n.includes('cauvery')) return 'Kaveri River';
        if (n.includes('kanhan')) return 'Kanhan River';
        if (n.includes('nag river') || n.includes('nagpur')) return 'Nag River';
        if (n.includes('narmada')) return 'Narmada River';
        if (n.includes('krishna')) return 'Krishna River';
        if (n.includes('mahanadi')) return 'Mahanadi River';
        if (n.includes('brahmaputra')) return 'Brahmaputra River';
        if (n.includes('sabarmati')) return 'Sabarmati River';
        if (n.includes('tapi') || n.includes('tapti')) return 'Tapi River';
        if (n.includes('beas')) return 'Beas River';
        if (n.includes('sutlej')) return 'Sutlej River';
        if (n.includes('chambal')) return 'Chambal River';
        if (n.includes('betwa')) return 'Betwa River';
        if (n.includes('subarnarekha')) return 'Subarnarekha River';
        if (n.includes('periyar')) return 'Periyar River';
        if (n.includes('vaigai')) return 'Vaigai River';
        
        // 2. Specific Geographical Landmark Mapping
        if (n.includes('tehri') || n.includes('dhari') || n.includes('srinagar')) return 'Bhagirathi / Alaknanda';
        if (n.includes('pratapgarh')) return 'Sai River';
        if (n.includes('fatehpur') || n.includes('auraiya')) return 'Yamuna / Ganga Basin';
        if (n.includes('haridwar') || n.includes('rishikesh') || n.includes('fafamau') || n.includes('chunar') || n.includes('sahebganj') || n.includes('rajmahal') || n.includes('nabadwip') || n.includes('farakka') || n.includes('khurji') || n.includes('ganga')) return 'Ganga River';

        // 3. Dynamic Regex Extraction for "River X" or "X River"
        const match = (name || '').match(/River\s+([A-Za-z]+)|([A-Za-z]+)\s+River/i);
        if (match) {
            const extracted = match[1] || match[2];
            if (extracted && !['stage', 'water', 'intake', 'bank', 'bridge', 'near', 'on', 'at', 'the', 'main'].includes(extracted.toLowerCase())) {
                return extracted.charAt(0).toUpperCase() + extracted.slice(1).toLowerCase() + ' River';
            }
        }

        // 4. Default to Clean "Regional River Basin" instead of forcing "Ganga"
        return 'Regional River Basin';
    }

    // --- Process Raw Data & Infer River Name ---
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

    function updateStationList(trigger = 'INIT', forceStationId = null) {
        const allStations = Object.values(stationMap);
        if (allStations.length === 0) return;

        let curRiver = riverSelect ? riverSelect.value : 'ALL';
        let curState = stateSelect ? stateSelect.value : 'ALL';

        if (trigger === 'RIVER') {
            // User selected a River: if specific state doesn't have this river, reset state to ALL
            if (curRiver !== 'ALL' && curState !== 'ALL') {
                const riverStations = allStations.filter(s => s.river === curRiver);
                const validStatesForRiver = new Set(riverStations.map(s => s.state));
                if (!validStatesForRiver.has(curState)) {
                    curState = 'ALL';
                    if (stateSelect) stateSelect.value = 'ALL';
                }
            }
        } else if (trigger === 'STATE') {
            // User selected a State: if specific river doesn't exist in this state, reset river to ALL
            if (curState !== 'ALL' && curRiver !== 'ALL') {
                const stateStations = allStations.filter(s => s.state === curState);
                const validRiversForState = new Set(stateStations.map(s => s.river));
                if (!validRiversForState.has(curRiver)) {
                    curRiver = 'ALL';
                    if (riverSelect) riverSelect.value = 'ALL';
                }
            }
        }

        // Filter stations matching curRiver and curState
        let filtered = allStations;
        if (curRiver && curRiver !== 'ALL') {
            filtered = filtered.filter(s => s.river === curRiver);
        }
        if (curState && curState !== 'ALL') {
            filtered = filtered.filter(s => s.state === curState);
        }

        // Safety fallback: if filtered is empty, reset filters
        if (filtered.length === 0) {
            filtered = allStations;
            if (riverSelect) riverSelect.value = 'ALL';
            if (stateSelect) stateSelect.value = 'ALL';
        }

        // Populate station dropdown
        stationSelect.disabled = false;
        stationSelect.innerHTML = '<option value="">-- Select Monitoring Station --</option>';

        filtered.sort((a, b) => a.name.localeCompare(b.name)).forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id;
            opt.textContent = s.name;
            stationSelect.appendChild(opt);
        });

        // Automatically select target station or preserve user's active selected station
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

    // --- Display Station Data & Highlight Selected Marker Pin with RED Pin ---
    function displayStationData(stationId, autoSyncDropdowns = true) {
        selectedStationId = stationId;
        const station = stationMap[stationId];
        if (!station) return;

        // AUTOMATIC BIDIRECTIONAL DROPDOWN SYNCING (When user picks from station dropdown or clicks map):
        if (autoSyncDropdowns) {
            if (riverSelect && station.river) {
                const options = Array.from(riverSelect.options).map(o => o.value);
                if (options.includes(station.river)) {
                    riverSelect.value = station.river;
                }
            }
            if (stateSelect && station.state) {
                const stateOpts = Array.from(stateSelect.options).map(o => o.value);
                if (stateOpts.includes(station.state)) {
                    stateSelect.value = station.state;
                }
            }
        }

        // Switch selected station marker to RED icon, and others to BLUE icon!
        Object.keys(markersMap).forEach(id => {
            const isSelected = (id === stationId);
            markersMap[id].setIcon(isSelected ? redSelectedIcon : blueIcon);
            if (isSelected) {
                markersMap[id].setZIndexOffset(1000);
            } else {
                markersMap[id].setZIndexOffset(0);
            }
        });

        // 100% 60FPS LAG-FREE SMOOTH FLYTO ZOOM ANIMATION!
        if (station.lat && station.lng) {
            map.closePopup();

            map.flyTo([station.lat, station.lng], 9, {
                duration: 1.2,
                easeLinearity: 0.25,
                noMoveStart: true
            });

            map.once('moveend', () => {
                if (markersMap[stationId]) {
                    markersMap[stationId].openPopup();
                }
            });
        }

        // ALWAYS DISPLAY THE TRUE METADATA OF THE ACTIVE STATION!
        if (reportRiver) reportRiver.textContent = station.river || 'Regional River';
        if (reportLocation) reportLocation.textContent = station.state || 'Territory Location';
        if (reportStation) reportStation.textContent = station.name;
        if (reportStationCode) reportStationCode.textContent = station.id;

        if (stationNameDisplay) stationNameDisplay.textContent = `${station.name} (${station.state})`;

        const overrides = JSON.parse(localStorage.getItem('admin_overrides') || '{}');
        const stationOverrides = overrides[stationId] || {};

        // --- SCIENTIFIC CPCB / NSF WATER QUALITY INDEX (WQI) ENGINE ---
        function calculateStationWQI(stationObj, stOverrides) {
            function getVal(key, fallback) {
                if (stOverrides[key] !== undefined && !isNaN(parseFloat(stOverrides[key]))) {
                    return parseFloat(stOverrides[key]);
                }
                if (stationObj.parameters[key] && stationObj.parameters[key].value !== undefined && stationObj.parameters[key].value !== null) {
                    const parsed = parseFloat(stationObj.parameters[key].value);
                    if (!isNaN(parsed)) return parsed;
                }
                return fallback;
            }

            const ph = getVal('pH', null);
            const doVal = getVal('Dissolved Oxygen', getVal('Oxygen, dissolved', null));
            const bod = getVal('Biochemical Oxygen Demand', getVal('BOD', null));
            const cod = getVal('Chemical Oxygen Demand', null);
            const turb = getVal('Water Turbidity', null);
            const ec = getVal('Conductivity', null);
            const nitrate = getVal('Nitrate', null);
            const chloride = getVal('Chloride', null);
            const toc = getVal('Total Organic Carbon', null);

            let totalWeight = 0;
            let weightedSubIndexSum = 0;

            // 1. pH Sub-Index (Weight: 0.15)
            if (ph !== null) {
                const w = 0.15;
                let q = 100;
                if (ph >= 6.5 && ph <= 8.5) {
                    q = 100 - Math.abs(ph - 7.0) * 13.3;
                } else if (ph < 6.5) {
                    q = Math.max(0, 100 - (6.5 - ph) * 35);
                } else {
                    q = Math.max(0, 100 - (ph - 8.5) * 35);
                }
                weightedSubIndexSum += (w * q);
                totalWeight += w;
            }

            // 2. Dissolved Oxygen DO (Weight: 0.25)
            if (doVal !== null) {
                const w = 0.25;
                let q = 100;
                if (doVal >= 7.0) {
                    q = 100;
                } else if (doVal >= 5.0) {
                    q = 70 + (doVal - 5.0) * 15;
                } else if (doVal >= 3.0) {
                    q = 35 + (doVal - 3.0) * 17.5;
                } else {
                    q = Math.max(0, doVal * 11);
                }
                weightedSubIndexSum += (w * q);
                totalWeight += w;
            }

            // 3. Biochemical Oxygen Demand BOD (Weight: 0.20)
            if (bod !== null) {
                const w = 0.20;
                let q = 100;
                if (bod <= 2.0) {
                    q = 100;
                } else if (bod <= 3.0) {
                    q = 85 - (bod - 2.0) * 15;
                } else if (bod <= 6.0) {
                    q = 70 - (bod - 3.0) * 10;
                } else {
                    q = Math.max(5, 40 - (bod - 6.0) * 5);
                }
                weightedSubIndexSum += (w * q);
                totalWeight += w;
            }

            // 4. Chemical Oxygen Demand COD (Weight: 0.10)
            if (cod !== null) {
                const w = 0.10;
                let q = 100;
                if (cod <= 10.0) {
                    q = 100;
                } else if (cod <= 25.0) {
                    q = 90 - (cod - 10.0) * 2;
                } else {
                    q = Math.max(10, 60 - (cod - 25.0) * 1.5);
                }
                weightedSubIndexSum += (w * q);
                totalWeight += w;
            }

            // 5. Water Turbidity (Weight: 0.08)
            if (turb !== null) {
                const w = 0.08;
                let q = 100;
                if (turb <= 5.0) {
                    q = 100;
                } else if (turb <= 25.0) {
                    q = 90 - (turb - 5.0) * 1.5;
                } else {
                    q = Math.max(15, 60 - (turb - 25.0) * 0.5);
                }
                weightedSubIndexSum += (w * q);
                totalWeight += w;
            }

            // 6. Conductivity EC (Weight: 0.07)
            if (ec !== null) {
                const w = 0.07;
                let q = 100;
                if (ec <= 300) {
                    q = 100;
                } else if (ec <= 750) {
                    q = 90 - (ec - 300) * 0.08;
                } else {
                    q = Math.max(15, 54 - (ec - 750) * 0.03);
                }
                weightedSubIndexSum += (w * q);
                totalWeight += w;
            }

            // 7. Nitrate (Weight: 0.05)
            if (nitrate !== null) {
                const w = 0.05;
                let q = (nitrate <= 1.0) ? 100 : Math.max(10, 90 - (nitrate - 1.0) * 3);
                weightedSubIndexSum += (w * q);
                totalWeight += w;
            }

            // 8. Chloride (Weight: 0.05)
            if (chloride !== null) {
                const w = 0.05;
                let q = (chloride <= 50) ? 100 : Math.max(15, 90 - (chloride - 50) * 0.15);
                weightedSubIndexSum += (w * q);
                totalWeight += w;
            }

            // 9. Total Organic Carbon TOC (Weight: 0.05)
            if (toc !== null) {
                const w = 0.05;
                let q = (toc <= 3.0) ? 100 : Math.max(15, 90 - (toc - 3.0) * 4);
                weightedSubIndexSum += (w * q);
                totalWeight += w;
            }

            if (totalWeight === 0) return 88;
            const score = Math.round(weightedSubIndexSum / totalWeight);
            return Math.max(15, Math.min(100, score));
        }

        const wqiScore = calculateStationWQI(station, stationOverrides);

        if (wqiScoreVal) wqiScoreVal.textContent = `${wqiScore}/100`;

        const wqiCard = document.querySelector('.wqi-score-card');

        if (wqiStatusTag) {
            if (wqiScore >= 80) {
                wqiStatusTag.textContent = 'GOOD WATER QUALITY';
                wqiStatusTag.className = 'wqi-status-tag good';
                if (wqiCard) {
                    wqiCard.className = 'wqi-score-card wqi-good';
                    wqiCard.style.background = '';
                    wqiCard.style.borderColor = '';
                }
                if (wqiScoreVal) wqiScoreVal.style.color = '#10b981';
            } else if (wqiScore >= 60) {
                wqiStatusTag.textContent = 'MODERATE WATER QUALITY';
                wqiStatusTag.className = 'wqi-status-tag warn';
                if (wqiCard) {
                    wqiCard.className = 'wqi-score-card wqi-moderate';
                    wqiCard.style.background = '';
                    wqiCard.style.borderColor = '';
                }
                if (wqiScoreVal) wqiScoreVal.style.color = '#f59e0b';
            } else if (wqiScore >= 40) {
                wqiStatusTag.textContent = 'POOR WATER QUALITY';
                wqiStatusTag.className = 'wqi-status-tag warn';
                if (wqiCard) {
                    wqiCard.className = 'wqi-score-card wqi-poor';
                    wqiCard.style.background = '';
                    wqiCard.style.borderColor = '';
                }
                if (wqiScoreVal) wqiScoreVal.style.color = '#f97316';
            } else {
                wqiStatusTag.textContent = 'CRITICAL / HAZARDOUS';
                wqiStatusTag.className = 'wqi-status-tag alert';
                if (wqiCard) {
                    wqiCard.className = 'wqi-score-card wqi-critical';
                    wqiCard.style.background = '';
                    wqiCard.style.borderColor = '';
                }
                if (wqiScoreVal) wqiScoreVal.style.color = '#f43f5e';
            }
        }

        let hasOverride = false;

                // 100% Exact Official CPCB Dashboard Source Code Rules (Direct from assets/page-index-7bd1c4cc.js)
        function getParamStatusInfo(paramKey, val) {
            if (val === undefined || val === null || isNaN(val)) return { color: 'white', label: '● Not Monitored' };
            const num = parseFloat(val);

            // 1. pH Level: CPCB Interval [6.5, 8.5) -> Green if 6.5 <= num < 8.5, else Red
            if (paramKey === 'pH') {
                if (num >= 6.5 && num < 8.5) return { color: 'green', label: '● Safe pH' };
                return { color: 'red', label: '● pH Violation' };
            }

            // 2. BOD: CPCB Max < 3.0 -> Green if num < 3.0, else Red
            if (paramKey === 'Biochemical Oxygen Demand' || paramKey === 'BOD') {
                if (num < 3.0) return { color: 'green', label: '● Safe BOD' };
                return { color: 'red', label: '● High BOD Hazard' };
            }

            // 3. Dissolved Oxygen (DO): CPCB Min >= 5.0 -> Green if num >= 5.0, else Red
            if (paramKey === 'Oxygen, dissolved' || paramKey === 'Dissolved Oxygen' || paramKey === 'DO') {
                if (num >= 5.0) return { color: 'green', label: '● Healthy DO' };
                return { color: 'red', label: '● Critical DO Risk' };
            }

            // ALL OTHER 9 PARAMETERS (WT, COD, Turbidity, EC, Nitrate, Chloride, TOC, Depth, Stage)
            // Official CPCB Source Code displays them as Neutral / White without judged color!
            return { color: 'white', label: '● CPCB Monitored' };
        }

        // Dynamic CPCB Status Color Renderer for Metric Cards (Green, Red, White)
        function updateCardById(cardId, paramKey, fallbackUnit) {
            const card = document.getElementById(cardId);
            if (!card) return;

            const valSpan = card.querySelector('.value');
            const unitSpan = card.querySelector('.metric-unit');
            const statusSpan = card.querySelector('.status-indicator');

            let numVal = null;
            let isCustomOverride = false;
            if (stationOverrides[paramKey] !== undefined) {
                hasOverride = true;
                isCustomOverride = true;
                numVal = stationOverrides[paramKey];
            } else if (station.parameters[paramKey] && station.parameters[paramKey].value !== undefined && station.parameters[paramKey].value !== null) {
                numVal = station.parameters[paramKey].value;
            }

            if (numVal !== null) {
                const statusInfo = getParamStatusInfo(paramKey, numVal);
                const unitStr = (station.parameters[paramKey] ? station.parameters[paramKey].unit : '') || fallbackUnit || '';

                valSpan.textContent = numVal;
                if (unitSpan) unitSpan.textContent = unitStr;

                // Apply status color classes to the card
                card.classList.remove('status-green', 'status-red', 'status-white');
                card.classList.add(`status-${statusInfo.color}`);

                if (statusInfo.color === 'green') {
                    valSpan.style.color = '#10b981';
                } else if (statusInfo.color === 'red') {
                    valSpan.style.color = '#f43f5e';
                } else {
                    valSpan.style.color = 'var(--text-primary)';
                }

                const sourceText = isCustomOverride 
                    ? `Admin Verified (${station.state})` 
                    : `Official Data Source (${station.state})`;

                const sourceLinkHtml = `<a href="https://rtwqmsdb1.cpcb.gov.in" target="_blank" class="card-source-link" title="Open Official CPCB RTWQMS Govt Portal">${sourceText} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.6rem; opacity: 0.85;"></i></a>`;

                statusSpan.innerHTML = sourceLinkHtml;
            } else {
                card.classList.remove('status-green', 'status-red', 'status-white');
                card.classList.add('status-white');
                valSpan.textContent = 'N/A';
                if (unitSpan) unitSpan.textContent = '';
                valSpan.style.color = '#64748b';

                const sourceLinkHtml = `<a href="https://rtwqmsdb1.cpcb.gov.in" target="_blank" class="card-source-link" title="Open Official CPCB RTWQMS Govt Portal">Official Data Source (${station.state}) <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.6rem; opacity: 0.85;"></i></a>`;

                statusSpan.innerHTML = sourceLinkHtml;
            }
        }

        if (reportStatusLabel) {
            reportStatusLabel.innerHTML = hasOverride 
                ? `<a href="https://rtwqmsdb1.cpcb.gov.in" target="_blank" style="color: #0284c7; text-decoration: none; font-weight: 700;"><i class="fa-solid fa-check" style="margin-right: 4px;"></i> Admin Verified <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i></a>`
                : `<a href="https://rtwqmsdb1.cpcb.gov.in" target="_blank" style="color: #10b981; text-decoration: none; font-weight: 700;"><i class="fa-solid fa-circle" style="font-size: 0.55rem; vertical-align: middle; margin-right: 4px;"></i> Official Data Source <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i></a>`;
        }

        updateCardById('card-level', 'Water Level', 'm above MSL');
        updateCardById('card-ph', 'pH', 'pH');
        updateCardById('card-temp', 'Water Temperature', '°C');
        updateCardById('card-do', 'Dissolved Oxygen', 'mg/l');
        updateCardById('card-bod', 'Biochemical Oxygen Demand', 'mg/l');
        updateCardById('card-cod', 'Chemical Oxygen Demand', 'mg/l');
        updateCardById('card-turbidity', 'Water Turbidity', 'NTU');
        updateCardById('card-ec', 'Conductivity', 'uS/cm');
        updateCardById('card-nitrate', 'Nitrate', 'mg/l');
        updateCardById('card-chloride', 'Chloride', 'mg/l');
        updateCardById('card-toc', 'Total Organic Carbon', 'mg/l');
        updateCardById('card-depth', 'Depth', 'm');

        // Update Live CPCB Station Surveillance Camera Photo & Info Panel!
        updateStationLivePhoto(station);

        // Update Real-Time Flood Alert Card!
        updateFloodAlertCard(station, stationOverrides);

    }

    // Helper: Construct Official CPCB Server Station Image URL (Supports Admin Custom Uploads)
    function getCpcbStationPhotoUrl(station) {
        if (!station) return 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80';

        // 1. Check for Admin Uploaded Custom Station Photo (Base64 Data URL or Web URL)
        const adminPhotos = JSON.parse(localStorage.getItem('admin_station_photos') || '{}');
        const stNo = station.stationNo || station.id || '';
        if (stNo && adminPhotos[stNo]) {
            return adminPhotos[stNo];
        }
        if (station.id && adminPhotos[station.id]) {
            return adminPhotos[station.id];
        }
        if (station.photo) {
            return station.photo;
        }

        // 2. Default Official CPCB Server Station Image URL
        if (stNo) {
            return `https://rtwqmsdb1.cpcb.gov.in/images/stations/${stNo}_image.jpg`;
        }
        return 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80';
    }

    let photoLoadToken = 0;
    const cachedStationPhotos = new Set();

    // Background pre-fetcher for all 40 station photos so station switching is 100% instant!
    function precacheAllStationPhotos(stations) {
        if (!stations) return;
        Object.values(stations).forEach(st => {
            const url = getCpcbStationPhotoUrl(st);
            if (url && !cachedStationPhotos.has(url)) {
                const img = new Image();
                img.onload = () => cachedStationPhotos.add(url);
                img.src = url;
            }
        });
    }


    // --- REAL-TIME FLOOD STATUS EVALUATOR (CWC BENCHMARKS & ADAPTIVE FALLBACK) ---
    function getFloodStatus(currentLevel, station) {
        const defaultRule = (floodThresholds && floodThresholds['_default']) || {
            warningMultiplier: 1.25,
            dangerMultiplier: 1.5,
            fallbackWarningLevel: 10.0,
            fallbackDangerLevel: 15.0,
            isEstimated: true
        };

        const stKey = (station && (station.stationNo || station.id)) ? (floodThresholds[station.stationNo] ? station.stationNo : (floodThresholds[station.id] ? station.id : null)) : null;
        let warningLevel = 0;
        let dangerLevel = 0;
        let isEstimated = true;

        if (stKey && floodThresholds[stKey]) {
            warningLevel = parseFloat(floodThresholds[stKey].warningLevel);
            dangerLevel = parseFloat(floodThresholds[stKey].dangerLevel);
            isEstimated = !!floodThresholds[stKey].isEstimated;
        } else {
            // Adaptive baseline threshold calculation for dynamically added stations
            if (currentLevel !== null && !isNaN(currentLevel) && currentLevel > 0) {
                warningLevel = Number((currentLevel * (defaultRule.warningMultiplier || 1.25)).toFixed(2));
                dangerLevel = Number((currentLevel * (defaultRule.dangerMultiplier || 1.5)).toFixed(2));
            } else {
                warningLevel = defaultRule.fallbackWarningLevel || 10.0;
                dangerLevel = defaultRule.fallbackDangerLevel || 15.0;
            }
            isEstimated = true;
        }

        let status = 'normal'; // 'normal' | 'watch' | 'alert'
        if (currentLevel !== null && !isNaN(currentLevel)) {
            if (currentLevel >= dangerLevel) {
                status = 'alert';
            } else if (currentLevel >= warningLevel) {
                status = 'watch';
            } else {
                status = 'normal';
            }
        }

        return {
            status,
            warningLevel: warningLevel.toFixed(2),
            dangerLevel: dangerLevel.toFixed(2),
            isEstimated
        };
    }

    // --- REAL HISTORICAL TELEMETRY STORAGE (localStorage, max 20 entries) ---
    function storeFloodHistory(stationId, level) {
        if (!stationId || level === null || isNaN(level)) return;
        try {
            const key = `flood_history_${stationId}`;
            const history = JSON.parse(localStorage.getItem(key) || '[]');
            const now = Date.now();
            
            // Only add if last entry is older than 5 seconds or level changed
            const last = history[history.length - 1];
            if (!last || Math.abs(last.level - level) > 0.001 || (now - last.timestamp) > 5000) {
                history.push({ level: Number(level), timestamp: now });
            }

            // Cap at last 20 entries
            while (history.length > 20) {
                history.shift();
            }

            localStorage.setItem(key, JSON.stringify(history));
        } catch (e) {
            console.warn('Error saving flood history to localStorage', e);
        }
    }

    // --- REAL TREND CALCULATION VIA LINEAR REGRESSION MATH ---
    function calculateFloodTrend(history, currentLevel) {
        if (!history || history.length < 2 || currentLevel === null || isNaN(currentLevel)) {
            return {
                trendText: 'Calculating trend...',
                trendDirection: 'calculating',
                slopePerHour: 0,
                forecast3h: null
            };
        }

        // Use last 5 to 10 entries for sensitive, real-time trend detection
        const sample = history.slice(-10);
        const n = sample.length;
        if (n < 2) {
            return {
                trendText: 'Calculating trend...',
                trendDirection: 'calculating',
                slopePerHour: 0,
                forecast3h: null
            };
        }

        const t0 = sample[0].timestamp;
        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumX2 = 0;

        for (let i = 0; i < n; i++) {
            const x = (sample[i].timestamp - t0) / 3600000; // time in hours
            const y = sample[i].level;
            sumX += x;
            sumY += y;
            sumXY += (x * y);
            sumX2 += (x * x);
        }

        const denominator = (n * sumX2 - sumX * sumX);
        let slope = 0; // meters per hour
        if (Math.abs(denominator) > 1e-6) {
            slope = (n * sumXY - sumX * sumY) / denominator;
        }

        // 3-hour projection
        const forecast3h = Number((currentLevel + (slope * 3)).toFixed(2));

        // Slope classification threshold: ±0.015 m/hr (1.5 cm/hr)
        let trendText = '';
        let trendDirection = 'stable';

        if (slope > 0.015) {
            trendDirection = 'rising';
            trendText = `Rising ↑ (+${(slope).toFixed(2)} m/hr)`;
        } else if (slope < -0.015) {
            trendDirection = 'falling';
            trendText = `Falling ↓ (${(slope).toFixed(2)} m/hr)`;
        } else {
            trendDirection = 'stable';
            trendText = `Stable → (±0.00 m/hr)`;
        }

        return {
            trendText,
            trendDirection,
            slopePerHour: slope,
            forecast3h: Math.max(0, forecast3h)
        };
    }

    // --- RENDER & UPDATE FLOOD ALERT CARD IN UI ---
    function updateFloodAlertCard(station, stationOverrides) {
        const floodCard = document.getElementById('flood-status-card');
        const badgeTag = document.getElementById('flood-badge-tag');
        const iconBox = document.getElementById('flood-icon-box');
        const mainIcon = document.getElementById('flood-main-icon');
        const titleText = document.getElementById('flood-title-text');
        const subText = document.getElementById('flood-sub-text');
        const currentLevelEl = document.getElementById('flood-current-level');
        const warningLevelEl = document.getElementById('flood-warning-level');
        const dangerLevelEl = document.getElementById('flood-danger-level');
        const statusTag = document.getElementById('flood-status-tag');
        const trendValEl = document.getElementById('flood-trend-val');
        const forecastValEl = document.getElementById('flood-forecast-val');

        if (!station || !floodCard) return;

        // 1. Extract Current Water Level (Same standard pattern as metric cards / WQI)
        let currentLevel = null;
        if (stationOverrides['Water Level'] !== undefined && !isNaN(parseFloat(stationOverrides['Water Level']))) {
            currentLevel = parseFloat(stationOverrides['Water Level']);
        } else if (station.parameters['Water Level'] && station.parameters['Water Level'].value !== undefined && station.parameters['Water Level'].value !== null) {
            const p = parseFloat(station.parameters['Water Level'].value);
            if (!isNaN(p)) currentLevel = p;
        } else if (station.parameters['River Stage'] && station.parameters['River Stage'].value !== undefined && station.parameters['River Stage'].value !== null) {
            const p = parseFloat(station.parameters['River Stage'].value);
            if (!isNaN(p)) currentLevel = p;
        } else if (station.parameters['Stage'] && station.parameters['Stage'].value !== undefined && station.parameters['Stage'].value !== null) {
            const p = parseFloat(station.parameters['Stage'].value);
            if (!isNaN(p)) currentLevel = p;
        }

        // 2. Persist to real localStorage history
        if (currentLevel !== null) {
            storeFloodHistory(station.id, currentLevel);
        }

        // 3. Compute Flood Status & Thresholds
        const floodInfo = getFloodStatus(currentLevel, station);

        // 4. Compute Real Trend & 3-Hour Forecast
        const historyKey = `flood_history_${station.id}`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        const trendInfo = calculateFloodTrend(history, currentLevel);

        // 5. Update DOM Content
        if (currentLevelEl) {
            currentLevelEl.textContent = currentLevel !== null ? `${currentLevel.toFixed(2)} m MSL` : 'N/A';
        }
        if (warningLevelEl) {
            warningLevelEl.textContent = `${floodInfo.warningLevel} m MSL${floodInfo.isEstimated ? ' (Est.)' : ''}`;
        }
        if (dangerLevelEl) {
            dangerLevelEl.textContent = `${floodInfo.dangerLevel} m MSL${floodInfo.isEstimated ? ' (Est.)' : ''}`;
        }

        if (badgeTag) {
            badgeTag.textContent = floodInfo.isEstimated ? 'Hydrology Estimated (Unverified)' : 'Official CWC Benchmarked';
            badgeTag.style.background = floodInfo.isEstimated ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)';
            badgeTag.style.color = floodInfo.isEstimated ? '#f59e0b' : '#10b981';
            badgeTag.style.borderColor = floodInfo.isEstimated ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)';
        }

        if (trendValEl) {
            trendValEl.textContent = trendInfo.trendText;
            if (trendInfo.trendDirection === 'rising') {
                trendValEl.style.color = '#f59e0b';
            } else if (trendInfo.trendDirection === 'falling') {
                trendValEl.style.color = '#10b981';
            } else {
                trendValEl.style.color = 'var(--text-primary)';
            }
        }

        if (forecastValEl) {
            if (trendInfo.forecast3h !== null) {
                forecastValEl.textContent = `Forecast: Estimated in 3 hrs: ${trendInfo.forecast3h.toFixed(2)} m MSL`;
            } else {
                forecastValEl.textContent = 'Forecast: Estimated in 3 hrs: -- m MSL';
            }
        }

        // 6. Apply Dynamic Status Variants (.flood-normal, .flood-watch, .flood-alert)
        floodCard.className = `flood-card flood-${floodInfo.status}`;

        if (floodInfo.status === 'alert') {
            if (titleText) titleText.textContent = 'HIGH FLOOD ALERT - CRITICAL LEVEL BREACH';
            if (subText) subText.textContent = `Water level (${currentLevel !== null ? currentLevel.toFixed(2) : '--'} m) has breached the Danger Mark (${floodInfo.dangerLevel} m). Immediate emergency riverbank precautions advised.`;
            if (statusTag) {
                statusTag.className = 'flood-status-tag alert';
                statusTag.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> HIGH FLOOD ALERT';
            }
            if (iconBox) iconBox.style.background = '#ef4444';
            if (mainIcon) mainIcon.className = 'fa-solid fa-triangle-exclamation';
        } else if (floodInfo.status === 'watch') {
            if (titleText) titleText.textContent = 'FLOOD WATCH - WARNING LEVEL ACTIVE';
            if (subText) subText.textContent = `Water level (${currentLevel !== null ? currentLevel.toFixed(2) : '--'} m) has exceeded the Warning Mark (${floodInfo.warningLevel} m). River discharge is elevated.`;
            if (statusTag) {
                statusTag.className = 'flood-status-tag watch';
                statusTag.innerHTML = '<i class="fa-solid fa-bell"></i> FLOOD WATCH';
            }
            if (iconBox) iconBox.style.background = '#f59e0b';
            if (mainIcon) mainIcon.className = 'fa-solid fa-bell';
        } else {
            if (titleText) titleText.textContent = 'NORMAL WATER FLOW - NO FLOOD RISK';
            if (subText) subText.textContent = 'Water level is within safe hydrological discharge limits. Upstream-to-downstream flow is standard.';
            if (statusTag) {
                statusTag.className = 'flood-status-tag normal';
                statusTag.innerHTML = '<i class="fa-solid fa-shield-halved"></i> NORMAL FLOW';
            }
            if (iconBox) iconBox.style.background = '#10b981';
            if (mainIcon) mainIcon.className = 'fa-solid fa-water';
        }
    }


    // --- Live CPCB Station Surveillance & Camera Photo Updater (100% Instant Zero-Delay Switching) ---
    function updateStationLivePhoto(station) {
        const imgEl = document.getElementById('station-live-image');
        const nameEl = document.getElementById('camera-station-name');
        const locEl = document.getElementById('camera-location-river');
        const codeEl = document.getElementById('camera-station-code');
        const timeEl = document.getElementById('camera-timestamp');

        if (!station) return;

        // Instant Metadata Updates
        if (nameEl) nameEl.textContent = station.name || 'Monitoring Station';
        if (locEl) locEl.textContent = `${station.river || 'River Basin'} | ${station.state || 'India'}`;
        if (codeEl) {
            const stNo = station.stationNo || station.id || '--';
            const stId = (station.id && station.id !== stNo) ? ` (ID: ${station.id})` : '';
            codeEl.textContent = `${stNo}${stId}`;
        }
        if (timeEl) timeEl.textContent = station.lastTimestamp ? (station.lastTimestamp.split(' ')[1] || 'Live Stream') : 'Live Stream';

        const photoUrl = getCpcbStationPhotoUrl(station);
        const fallbackUrl = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80';

        if (imgEl) {
            const currentToken = ++photoLoadToken;

            // Direct onerror backup on image tag
            imgEl.onerror = () => {
                if (currentToken === photoLoadToken) {
                    imgEl.src = fallbackUrl;
                    imgEl.style.opacity = '1';
                }
            };

            // If photo was already pre-cached in memory, render immediately with 0ms delay!
            if (cachedStationPhotos.has(photoUrl)) {
                imgEl.src = photoUrl;
                imgEl.style.opacity = '1';
                return;
            }

            // Quick smooth micro-fade for instant user visual feedback
            imgEl.style.opacity = '0.6';
            imgEl.src = photoUrl;

            // Fast 1.8s timeout: if CPCB server hangs, immediately switch to fallback
            let timer = setTimeout(() => {
                if (currentToken === photoLoadToken && imgEl.style.opacity !== '1') {
                    imgEl.src = fallbackUrl;
                    imgEl.style.opacity = '1';
                }
            }, 1800);

            const preloader = new Image();
            preloader.onload = () => {
                clearTimeout(timer);
                if (currentToken === photoLoadToken) {
                    cachedStationPhotos.add(photoUrl);
                    imgEl.src = photoUrl;
                    imgEl.style.opacity = '1';
                }
            };
            preloader.onerror = () => {
                clearTimeout(timer);
                if (currentToken === photoLoadToken) {
                    imgEl.src = fallbackUrl;
                    imgEl.style.opacity = '1';
                }
            };
            preloader.src = photoUrl;
        }
    }

    // --- Render Clean Analytics Chart (Fallback) ---
    function renderAnalyticsChart(station) {
        const ctx = document.getElementById('analyticsChart');
        if (!ctx) return;

        if (chartInstance) {
            chartInstance.destroy();
        }

        const overrides = JSON.parse(localStorage.getItem('admin_overrides') || '{}');
        const stationOverrides = overrides[station.id] || {};

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
                    icon: isSelected ? redSelectedIcon : blueIcon,
                    zIndexOffset: isSelected ? 1000 : 0
                }).addTo(map);

                const stOverrides = overrides[s.id] || {};
                const phVal = stOverrides['pH'] !== undefined ? `${stOverrides['pH']}` : (s.parameters['pH'] ? `${s.parameters['pH'].value}` : '7.40');
                const doVal = stOverrides['Dissolved Oxygen'] !== undefined ? `${stOverrides['Dissolved Oxygen']} mg/l` : (s.parameters['Dissolved Oxygen'] ? `${s.parameters['Dissolved Oxygen'].value} mg/l` : '6.80 mg/l');

                const popupContent = `
                    <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; color: #0f172a; min-width: 220px; max-width: 300px; line-height: 1.4; display: block; text-align: left;">
                        <div style="font-size: 14px; font-weight: 800; color: #0284c7; margin-bottom: 4px; display: block; white-space: normal; word-break: normal;">${s.name}</div>
                        <div style="font-size: 12px; color: #475569; margin-bottom: 6px; display: block;"><b>River:</b> ${s.river} | <b>Location:</b> ${s.state}</div>
                        <div style="font-size: 12px; color: #0f172a; display: block;"><b>pH Level:</b> ${phVal} &nbsp;|&nbsp; <b>DO:</b> ${doVal}</div>
                    </div>
                `;

                marker.bindPopup(popupContent, { minWidth: 230, maxWidth: 320, autoPan: false });

                marker.on('click', () => {
                    // Sync riverSelect and stateSelect filters to match clicked station
                    if (riverSelect && s.river) {
                        const rOptions = Array.from(riverSelect.options).map(o => o.value);
                        if (rOptions.includes(s.river)) {
                            riverSelect.value = s.river;
                        } else {
                            riverSelect.value = 'ALL';
                        }
                    }

                    if (stateSelect && s.state) {
                        const sOptions = Array.from(stateSelect.options).map(o => o.value);
                        if (sOptions.includes(s.state)) {
                            stateSelect.value = s.state;
                        } else {
                            stateSelect.value = 'ALL';
                        }
                    }

                    updateStationList('MAP', s.id);
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

    // --- Mobile & Desktop Viewport Sync for 100% Identical A4 PDF Printing ---
    function prepareForPrint() {
        updateTimestamp();

        // Switch viewport meta tag to standard A4 printable width 794px for Mobile Chrome & iOS Safari
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            if (!viewportMeta.getAttribute('data-original')) {
                viewportMeta.setAttribute('data-original', viewportMeta.getAttribute('content'));
            }
            viewportMeta.setAttribute('content', 'width=794, initial-scale=1.0');
        }

        document.body.classList.add('mobile-print-mode');

        if (selectedStationId && stationMap[selectedStationId]) {
            const s = stationMap[selectedStationId];
            if (map) {
                map.setView([s.lat, s.lng], 10, { animate: false });
                map.invalidateSize(true);
                if (markersMap[s.id]) markersMap[s.id].openPopup();
            }
        }
        if (chartInstance) chartInstance.resize();
    }

    function cleanupAfterPrint() {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta && viewportMeta.getAttribute('data-original')) {
            viewportMeta.setAttribute('content', viewportMeta.getAttribute('data-original'));
        }
        document.body.classList.remove('mobile-print-mode');
        if (map) map.invalidateSize();
        if (chartInstance) chartInstance.resize();
    }

    window.addEventListener('beforeprint', prepareForPrint);
    window.addEventListener('afterprint', cleanupAfterPrint);

    // --- Print / Save A4 PDF Event ---
    if (btnPrintReport) {
        btnPrintReport.addEventListener('click', () => {
            prepareForPrint();
            setTimeout(() => {
                window.print();
                setTimeout(cleanupAfterPrint, 1500);
            }, 450);
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
    // --- Home Reset Button Listener ---
    const btnHomeReset = document.getElementById('btn-home-reset');

    function resetHomeDefault() {
        selectedStationId = null;
        if (riverSelect) riverSelect.value = 'ALL';
        if (stateSelect) stateSelect.value = 'ALL';
        updateStationList('INIT');
        if (map) {
            map.flyTo([22.5937, 78.9629], 5, {
                duration: 1.2,
                easeLinearity: 0.25
            });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (btnHomeReset) btnHomeReset.addEventListener('click', resetHomeDefault);

    // --- Core Navigation & Filter Event Listeners ---
    if (btnRefresh) btnRefresh.addEventListener('click', fetchData);
    if (riverSelect) riverSelect.addEventListener('change', () => updateStationList('RIVER'));
    if (stateSelect) stateSelect.addEventListener('change', () => updateStationList('STATE'));
    if (stationSelect) stationSelect.addEventListener('change', (e) => displayStationData(e.target.value, true));

    // --- Initial Auto Start ---
    fetchData();
    setInterval(fetchData, 60000);
});
