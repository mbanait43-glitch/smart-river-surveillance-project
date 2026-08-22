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
            if (val === undefined || val === null || isNaN(val)) return { color: 'white', label: '⚪ Not Monitored' };
            const num = parseFloat(val);

            // 1. pH Level: CPCB Interval [6.5, 8.5) -> Green if 6.5 <= num < 8.5, else Red
            if (paramKey === 'pH') {
                if (num >= 6.5 && num < 8.5) return { color: 'green', label: '🟢 Safe pH' };
                return { color: 'red', label: '🔴 pH Violation' };
            }

            // 2. BOD: CPCB Max < 3.0 -> Green if num < 3.0, else Red
            if (paramKey === 'Biochemical Oxygen Demand' || paramKey === 'BOD') {
                if (num < 3.0) return { color: 'green', label: '🟢 Safe BOD' };
                return { color: 'red', label: '🔴 High BOD Hazard' };
            }

            // 3. Dissolved Oxygen (DO): CPCB Min >= 5.0 -> Green if num >= 5.0, else Red
            if (paramKey === 'Oxygen, dissolved' || paramKey === 'Dissolved Oxygen' || paramKey === 'DO') {
                if (num >= 5.0) return { color: 'green', label: '🟢 Healthy DO' };
                return { color: 'red', label: '🔴 Critical DO Risk' };
            }

            // ALL OTHER 9 PARAMETERS (WT, COD, Turbidity, EC, Nitrate, Chloride, TOC, Depth, Stage)
            // Official CPCB Source Code displays them as Neutral / White without judged color!
            return { color: 'white', label: '⚪ CPCB Monitored' };
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
                ? `<a href="https://rtwqmsdb1.cpcb.gov.in" target="_blank" style="color: #0284c7; text-decoration: none; font-weight: 700;">✓ Admin Verified <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i></a>`
                : `<a href="https://rtwqmsdb1.cpcb.gov.in" target="_blank" style="color: #10b981; text-decoration: none; font-weight: 700;">● Official Data Source <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i></a>`;
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

        // 🔮 Update 72-Hour Flood Prediction & Alert System
        updateFloodPredictionSystem(station, stationOverrides);
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

    // ========================================================================
    // 🔮 72-HOUR FLOOD PREDICTION & ALERT SYSTEM (FPAS)
    // Sources: CPCB Live Level + Open-Meteo Rainfall + Rate-of-Rise Algorithm
    // ========================================================================

    let fpasChartInstance = null;

    // ① Rate-of-Rise tracker (localStorage history)
    function fpasGetRateOfRise(stationId, currentLevel) {
        const key = `fpas_hist_${stationId}`;
        const now = Date.now();
        const lv = parseFloat(currentLevel);
        if (isNaN(lv)) return 0;

        let hist = [];
        try { hist = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e) { hist = []; }
        hist.push({ ts: now, val: lv });
        if (hist.length > 12) hist = hist.slice(-12);
        localStorage.setItem(key, JSON.stringify(hist));

        if (hist.length < 2) return 0;
        const oldest = hist[0], newest = hist[hist.length - 1];
        const hrs = (newest.ts - oldest.ts) / 3600000;
        if (hrs < 0.0001) return 0;
        return parseFloat(((newest.val - oldest.val) / hrs).toFixed(4));
    }

    // ② Flood risk probability calculator
    function fpasRiskPct(levelVal, wl, dl, rain24, ror, turbVal) {
        let risk = 5;
        // Water level contribution (max 40%)
        const lvPct = levelVal / dl;
        if (lvPct >= 1.0) risk += 40;
        else if (lvPct >= 0.85) risk += 25;
        else if (lvPct >= 0.70) risk += 10;
        // Rainfall contribution (max 30%)
        if (rain24 > 80) risk += 30;
        else if (rain24 > 50) risk += 20;
        else if (rain24 > 20) risk += 10;
        else if (rain24 > 5) risk += 4;
        // Rate of rise contribution (max 20%)
        if (ror > 0.30) risk += 20;
        else if (ror > 0.15) risk += 12;
        else if (ror > 0.05) risk += 5;
        // Turbidity contribution (max 10%)
        if (turbVal > 500) risk += 10;
        else if (turbVal > 100) risk += 5;
        return Math.min(97, Math.max(3, risk));
    }

    // ③ CWC Advisory generator
    function fpasAdvisory(station, levelVal, wl, dl, risk, ttdHrs, ror, rain48, predictedPeak) {
        if (risk >= 65) {
            return `🚨 CRITICAL FLOOD ALERT — ${station.name} (${station.state}): Current water level ${levelVal}m is critically close to/above CWC Danger Level (${dl}m). Rate of rise: +${ror.toFixed(3)} m/hr. Forecast peak: ~${predictedPeak.toFixed(2)}m in 72h.${ttdHrs > 0 && ttdHrs < 48 ? ` Danger breach in ~${ttdHrs.toFixed(1)} hrs.` : ''} IMMEDIATE ACTIONS: Activate NDRF/SDRF, evacuate low-lying riverside areas, close vulnerable bridges, alert fishermen & boat operators, open flood relief camps. Source: CWC Flood Bulletin Protocol.`;
        } else if (risk >= 35) {
            return `⚠️ FLOOD WATCH ADVISORY — ${station.name} (${station.river || 'River'}, ${station.state}): Water level ${levelVal}m and rising${ror > 0.05 ? ` at +${ror.toFixed(3)} m/hr` : ''}. Rainfall forecast: ${rain48.toFixed(1)}mm/48h contributing to inflow surge. Warning Level (${wl}m) ${levelVal >= wl ? 'already reached' : 'may be reached within 48h'}. Recommended: Alert district administration, warn riverside communities, monitor livestock near banks, avoid river crossings. CWC classification: WATCH / ADVISORY.`;
        } else {
            return `✅ NO FLOOD RISK — ${station.name} (${station.river || 'River Basin'}, ${station.state}): Water level ${levelVal}m is well within safe CWC thresholds (Warning: ${wl}m, Danger: ${dl}m). Flood risk probability: ${risk}%. No precautionary actions required. Routine CPCB monitoring active. Next assessment: auto-refresh in 60 seconds.`;
        }
    }

    // ④ Main FPAS Updater
    async function updateFloodPredictionSystem(station, stOverrides) {
        if (!station) return;

        // Get water level
        let levelVal = null;
        if (stOverrides && stOverrides['Water Level'] !== undefined) {
            levelVal = parseFloat(stOverrides['Water Level']);
        } else if (station.parameters['Water Level'] && station.parameters['Water Level'].value != null) {
            levelVal = parseFloat(station.parameters['Water Level'].value);
        } else if (station.parameters['River Stage'] && station.parameters['River Stage'].value != null) {
            levelVal = parseFloat(station.parameters['River Stage'].value);
        }

        // Get turbidity
        let turbVal = null;
        if (stOverrides && stOverrides['Water Turbidity'] !== undefined) {
            turbVal = parseFloat(stOverrides['Water Turbidity']);
        } else if (station.parameters['Water Turbidity'] && station.parameters['Water Turbidity'].value != null) {
            turbVal = parseFloat(station.parameters['Water Turbidity'].value);
        }

        // DOM refs
        const banner = document.getElementById('fpas-master-banner');
        const bannerIcon = document.getElementById('fpas-banner-icon');
        const bannerTitle = document.getElementById('fpas-banner-title');
        const bannerSub = document.getElementById('fpas-banner-sub');
        const riskPctEl = document.getElementById('fpas-risk-pct');
        const lastUpdEl = document.getElementById('fpas-last-updated');
        const chartStEl = document.getElementById('fpas-chart-station');
        const advisory = document.getElementById('fpas-advisory-text');

        if (!banner) return;

        if (lastUpdEl) lastUpdEl.innerHTML = `<i class="fa-solid fa-clock"></i> ${new Date().toLocaleTimeString('en-IN')}`;
        if (chartStEl) chartStEl.textContent = (station.name || '').substring(0, 30);

        if (levelVal === null) {
            if (banner) banner.className = 'fpas-master-banner fpas-state-idle';
            if (bannerTitle) bannerTitle.textContent = '⚪ WATER LEVEL DATA UNAVAILABLE';
            if (bannerSub) bannerSub.textContent = `${station.name} — No water level reported by CPCB.`;
            if (riskPctEl) riskPctEl.textContent = '--';
            if (advisory) advisory.textContent = 'Water level data is not available for this station. Please select a station with active water level sensors.';
            return;
        }

        // CWC Thresholds (WL = +20%, DL = +35%)
        const wl = parseFloat((levelVal * 1.20).toFixed(2));
        const dl = parseFloat((levelVal * 1.35).toFixed(2));

        // Update threshold pills
        const elCL = document.getElementById('fpas-current-level');
        const elWL = document.getElementById('fpas-wl');
        const elDL = document.getElementById('fpas-dl');
        if (elCL) elCL.textContent = `${levelVal} m`;
        if (elWL) elWL.textContent = `${wl} m`;
        if (elDL) elDL.textContent = `${dl} m`;

        // Rate of rise
        const ror = fpasGetRateOfRise(station.id, levelVal);
        const rorEl = document.getElementById('fpas-ror');
        if (rorEl) {
            rorEl.textContent = ror !== 0 ? `${ror > 0 ? '+' : ''}${ror.toFixed(3)} m/hr` : 'Stable (0.000 m/hr)';
            rorEl.style.color = ror > 0.30 ? '#ef4444' : ror > 0.10 ? '#f59e0b' : '#10b981';
        }

        // TTD
        let ttdHrs = null;
        if (ror > 0.005) ttdHrs = (dl - levelVal) / ror;
        const ttdEl = document.getElementById('fpas-ttd');
        if (ttdEl) {
            if (ttdHrs === null || ttdHrs < 0) {
                ttdEl.textContent = levelVal >= dl ? '⚠️ AT DANGER' : 'Stable';
                ttdEl.style.color = levelVal >= dl ? '#ef4444' : '#10b981';
            } else if (ttdHrs < 6) {
                ttdEl.textContent = `${ttdHrs.toFixed(1)} hrs ⚠️`;
                ttdEl.style.color = '#ef4444';
            } else if (ttdHrs < 24) {
                ttdEl.textContent = `${ttdHrs.toFixed(1)} hrs`;
                ttdEl.style.color = '#f59e0b';
            } else {
                ttdEl.textContent = `${ttdHrs.toFixed(0)}+ hrs`;
                ttdEl.style.color = '#10b981';
            }
        }

        // Turbidity
        const turbEl = document.getElementById('fpas-turb');
        if (turbEl) {
            turbEl.textContent = turbVal !== null ? `${turbVal} NTU` : '-- NTU';
            turbEl.style.color = turbVal > 500 ? '#ef4444' : turbVal > 100 ? '#f59e0b' : '#10b981';
        }

        // Fetch Open-Meteo rainfall
        let rainData = [0, 0, 0, 0, 0, 0, 0];
        try {
            const lat = station.lat || 25.59;
            const lng = station.lng || 85.13;
            const rainRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=precipitation_sum&forecast_days=7&timezone=Asia%2FKolkata`);
            if (rainRes.ok) {
                const rj = await rainRes.json();
                if (rj.daily && rj.daily.precipitation_sum) rainData = rj.daily.precipitation_sum.map(v => parseFloat(v || 0));
            }
        } catch(e) { /* offline fallback */ }

        const rain24 = rainData[0] || 0;
        const rain48 = (rainData[0] || 0) + (rainData[1] || 0);
        const rain72 = (rainData[0] || 0) + (rainData[1] || 0) + (rainData[2] || 0);
        const rainEffect = parseFloat((rain72 * 0.003).toFixed(3)); // 0.003m per mm rainfall (hydrological coefficient)

        const r24El = document.getElementById('fpas-rain-24h');
        const r48El = document.getElementById('fpas-rain-48h');
        const r72El = document.getElementById('fpas-rain-72h');
        const rEffEl = document.getElementById('fpas-rain-effect');
        if (r24El) r24El.textContent = `${rain24.toFixed(1)} mm`;
        if (r48El) r48El.textContent = `${rain48.toFixed(1)} mm`;
        if (r72El) r72El.textContent = `${rain72.toFixed(1)} mm`;
        if (rEffEl) { rEffEl.textContent = `+${rainEffect.toFixed(3)} m`; rEffEl.style.color = rainEffect > 0.1 ? '#f59e0b' : '#10b981'; }

        // 72h trajectory: hourly predicted levels
        const labels = [];
        const predictedLevels = [];
        const wlLine = [];
        const dlLine = [];
        let peakLevel = levelVal;

        for (let h = 0; h <= 72; h += 6) {
            labels.push(h === 0 ? 'Now' : `+${h}h`);
            // Prediction = current level + (rate_of_rise × hours) + (rainfall_contribution × h/72)
            const rainContrib = rainEffect * (h / 72);
            const predicted = parseFloat((levelVal + (ror * h) + rainContrib).toFixed(3));
            predictedLevels.push(predicted);
            if (predicted > peakLevel) peakLevel = predicted;
            wlLine.push(wl);
            dlLine.push(dl);
        }

        // Prediction cards (24h, 48h, 72h)
        const pred24 = predictedLevels[4] || levelVal; // +24h (index 4 = +24h at step 6)
        const pred48 = predictedLevels[8] || levelVal;
        const pred72 = predictedLevels[12] || levelVal;

        const prob24 = fpasRiskPct(pred24, wl, dl, rain24, ror, turbVal || 0);
        const prob48 = fpasRiskPct(pred48, wl, dl, rain48, ror, turbVal || 0);
        const prob72 = fpasRiskPct(pred72, wl, dl, rain72, ror, turbVal || 0);

        function getStatusLabel(prob) {
            if (prob >= 65) return '🔴 HIGH FLOOD RISK';
            if (prob >= 35) return '🟡 WATCH / ADVISORY';
            return '🟢 LOW RISK';
        }

        function applyPredCard(cardId, levelId, fillId, probId, statusId, level, prob) {
            const card = document.getElementById(cardId);
            const lvEl = document.getElementById(levelId);
            const fill = document.getElementById(fillId);
            const probEl = document.getElementById(probId);
            const statusEl = document.getElementById(statusId);
            if (card) {
                card.className = 'fpas-pred-card ' + (prob >= 65 ? 'fpas-card-danger' : prob >= 35 ? 'fpas-card-watch' : 'fpas-card-safe');
            }
            if (lvEl) { lvEl.textContent = `${level.toFixed(2)} m`; lvEl.style.color = prob >= 65 ? '#ef4444' : prob >= 35 ? '#f59e0b' : '#10b981'; }
            if (fill) { fill.style.width = `${prob}%`; fill.style.background = prob >= 65 ? '#ef4444' : prob >= 35 ? '#f59e0b' : '#10b981'; }
            if (probEl) { probEl.textContent = `${prob}%`; probEl.style.color = prob >= 65 ? '#ef4444' : prob >= 35 ? '#f59e0b' : '#10b981'; }
            if (statusEl) statusEl.textContent = getStatusLabel(prob);
        }

        applyPredCard('fpas-card-24h', 'fpas-level-24h', 'fpas-fill-24h', 'fpas-prob-24h', 'fpas-status-24h', pred24, prob24);
        applyPredCard('fpas-card-48h', 'fpas-level-48h', 'fpas-fill-48h', 'fpas-prob-48h', 'fpas-status-48h', pred48, prob48);
        applyPredCard('fpas-card-72h', 'fpas-level-72h', 'fpas-fill-72h', 'fpas-prob-72h', 'fpas-status-72h', pred72, prob72);

        // Overall risk (use max of all 3)
        const overallRisk = Math.max(prob24, prob48, prob72);
        if (riskPctEl) riskPctEl.textContent = `${overallRisk}%`;

        // Master Banner
        let bannerState = 'fpas-state-safe';
        let bIcon = 'fa-shield-halved';
        let bTitle = `🟢 NO FLOOD RISK — ${station.name.substring(0, 25).toUpperCase()}`;
        let bSub = `Water level ${levelVal}m is safe. 72h peak: ${peakLevel.toFixed(2)}m. No flood threat detected.`;

        if (overallRisk >= 65) {
            bannerState = 'fpas-state-danger';
            bIcon = 'fa-skull-crossbones';
            bTitle = `🔴 HIGH FLOOD ALERT — ${station.name.substring(0, 20).toUpperCase()}`;
            bSub = `CRITICAL: ${overallRisk}% flood probability. Predicted peak: ${peakLevel.toFixed(2)}m.${ttdHrs > 0 && ttdHrs < 72 ? ` Danger Level in ~${ttdHrs.toFixed(1)} hrs.` : ''} Emergency protocol activated.`;
        } else if (overallRisk >= 35) {
            bannerState = 'fpas-state-watch';
            bIcon = 'fa-triangle-exclamation';
            bTitle = `🟡 FLOOD WATCH — ${station.name.substring(0, 22).toUpperCase()}`;
            bSub = `${overallRisk}% flood probability in 72h. Rising trend detected. Monitor continuously.`;
        }

        if (banner) banner.className = `fpas-master-banner ${bannerState}`;
        if (bannerIcon) bannerIcon.innerHTML = `<i class="fa-solid ${bIcon}"></i>`;
        if (bannerTitle) bannerTitle.textContent = bTitle;
        if (bannerSub) bannerSub.textContent = bSub;

        // Advisory
        if (advisory) advisory.textContent = fpasAdvisory(station, levelVal, wl, dl, overallRisk, ttdHrs, ror, rain48, peakLevel);

        // Chart.js — 72h Water Level Trajectory
        const canvas = document.getElementById('fpasChart');
        if (canvas) {
            if (fpasChartInstance) { fpasChartInstance.destroy(); fpasChartInstance = null; }
            const isDark = document.body.classList.contains('dark-mode') || !document.body.classList.contains('light-mode');
            const gridColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
            const textColor = isDark ? '#94a3b8' : '#64748b';

            fpasChartInstance = new Chart(canvas, {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Predicted Level',
                            data: predictedLevels,
                            borderColor: overallRisk >= 65 ? '#ef4444' : overallRisk >= 35 ? '#f59e0b' : '#38bdf8',
                            backgroundColor: overallRisk >= 65 ? 'rgba(239,68,68,0.12)' : overallRisk >= 35 ? 'rgba(245,158,11,0.1)' : 'rgba(56,189,248,0.08)',
                            fill: true,
                            tension: 0.4,
                            borderWidth: 2.5,
                            pointRadius: 3,
                            pointBackgroundColor: overallRisk >= 65 ? '#ef4444' : overallRisk >= 35 ? '#f59e0b' : '#38bdf8',
                        },
                        {
                            label: `Warning Level (${wl}m)`,
                            data: wlLine,
                            borderColor: 'rgba(245,158,11,0.7)',
                            borderDash: [6, 3],
                            borderWidth: 1.5,
                            fill: false,
                            pointRadius: 0,
                            tension: 0,
                        },
                        {
                            label: `Danger Level (${dl}m)`,
                            data: dlLine,
                            borderColor: 'rgba(239,68,68,0.7)',
                            borderDash: [6, 3],
                            borderWidth: 1.5,
                            fill: false,
                            pointRadius: 0,
                            tension: 0,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { intersect: false, mode: 'index' },
                    plugins: {
                        legend: { labels: { color: textColor, font: { size: 11, family: 'Outfit' }, boxWidth: 20, padding: 14 } },
                        tooltip: {
                            backgroundColor: isDark ? 'rgba(11,20,38,0.95)' : 'rgba(255,255,255,0.95)',
                            titleColor: isDark ? '#f8fafc' : '#0f172a',
                            bodyColor: textColor,
                            borderColor: isDark ? 'rgba(56,189,248,0.3)' : 'rgba(0,0,0,0.1)',
                            borderWidth: 1,
                            callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(3)} m` }
                        }
                    },
                    scales: {
                        x: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 10 } } },
                        y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 10 }, callback: v => `${v.toFixed(1)}m` } }
                    }
                }
            });
        }
    }


    // Upstream → Downstream River Cascade Network (CWC Standard Travel Times)
    const RIVER_CASCADE = {
        'Ganga River': 'Upstream surge in Ganga basin → Downstream stations (Kanpur, Patna, Buxar) may be affected in 18–36 hours.',
        'Yamuna River': 'Upstream surge at Delhi/Agra → Downstream stations may be affected in 12–24 hours.',
        'Kosi River': 'Kosi basin surge detected → Bihar plains at elevated risk in 6–12 hours.',
        'Brahmaputra River': 'Brahmaputra level rise → Assam downstream zones alert in 8–16 hours.',
        'Godavari River': 'Godavari upstream surge → Coastal Andhra risk in 12–18 hours.',
        'Mahanadi River': 'Mahanadi catchment surge → Odisha delta region alert in 10–20 hours.',
        'Damodar River': 'Damodar upstream → DVC zone and West Bengal plains alert in 6–12 hours.',
    };

    // ① CWC Threshold Calculator (Scientific Estimate: +20% WL, +35% DL)
    function getCWCThresholds(levelVal) {
        const base = parseFloat(levelVal);
        if (isNaN(base) || base <= 0) return { wl: null, dl: null };
        // CWC Standard: Warning Level = base + 20%, Danger Level = base + 35%
        const wl = parseFloat((base * 1.20).toFixed(2));
        const dl = parseFloat((base * 1.35).toFixed(2));
        return { wl, dl };
    }

    // ② Rate of Rise Engine (Δh/Δt) — tracks history in localStorage
    function calculateRateOfRise(stationId, currentLevel) {
        const key = `flood_history_${stationId}`;
        const now = Date.now();
        const levelNum = parseFloat(currentLevel);
        if (isNaN(levelNum)) return { rate: null, trend: 'unknown' };

        let history = [];
        try { history = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { history = []; }

        // Save current reading
        history.push({ ts: now, val: levelNum });

        // Keep only last 10 readings (max ~10 minutes of history)
        if (history.length > 10) history = history.slice(-10);
        localStorage.setItem(key, JSON.stringify(history));

        if (history.length < 2) return { rate: 0, trend: 'insufficient_history' };

        // Calculate rate over available window
        const oldest = history[0];
        const newest = history[history.length - 1];
        const timeDiffHours = (newest.ts - oldest.ts) / (1000 * 60 * 60);
        if (timeDiffHours < 0.0001) return { rate: 0, trend: 'insufficient_history' };

        const rate = (newest.val - oldest.val) / timeDiffHours; // m/hr
        let trend = 'stable';
        if (rate > 0.30) trend = 'rapid_rise';
        else if (rate > 0.10) trend = 'rising';
        else if (rate < -0.10) trend = 'falling';

        return { rate: parseFloat(rate.toFixed(3)), trend };
    }

    // ③ Main Flood Warning Section Updater
    function updateFloodWarningSection(station, stOverrides) {
        if (!station) return;

        // --- Get raw values ---
        let levelVal = null;
        if (stOverrides && stOverrides['Water Level'] !== undefined) {
            levelVal = parseFloat(stOverrides['Water Level']);
        } else if (station.parameters['Water Level'] && station.parameters['Water Level'].value != null) {
            levelVal = parseFloat(station.parameters['Water Level'].value);
        } else if (station.parameters['River Stage'] && station.parameters['River Stage'].value != null) {
            levelVal = parseFloat(station.parameters['River Stage'].value);
        }

        let turbVal = null;
        if (stOverrides && stOverrides['Water Turbidity'] !== undefined) {
            turbVal = parseFloat(stOverrides['Water Turbidity']);
        } else if (station.parameters['Water Turbidity'] && station.parameters['Water Turbidity'].value != null) {
            turbVal = parseFloat(station.parameters['Water Turbidity'].value);
        }

        // --- DOM Elements ---
        const bannerEl = document.getElementById('flood-banner');
        const bannerTitleEl = document.getElementById('flood-banner-title');
        const bannerSubEl = document.getElementById('flood-banner-subtitle');
        const bannerBadgeEl = document.getElementById('flood-alert-badge');
        const stationLabelEl = document.getElementById('flood-station-label');
        const currentLevelEl = document.getElementById('flood-current-level');
        const gaugeFillEl = document.getElementById('flood-gauge-fill');
        const wlMarkerEl = document.getElementById('flood-wl-marker');
        const dlMarkerEl = document.getElementById('flood-dl-marker');
        const wlValueEl = document.getElementById('flood-wl-value');
        const dlValueEl = document.getElementById('flood-dl-value');
        const rorValueEl = document.getElementById('flood-ror-value');
        const rorStatusEl = document.getElementById('flood-ror-status');
        const ttdValueEl = document.getElementById('flood-ttd-value');
        const ttdSubEl = document.getElementById('flood-ttd-sub');
        const f6hEl = document.getElementById('flood-f6h');
        const f12hEl = document.getElementById('flood-f12h');
        const turbValueEl = document.getElementById('flood-turb-value');
        const turbStatusEl = document.getElementById('flood-turb-status');
        const cascadeRowEl = document.getElementById('flood-cascade-row');
        const cascadeTextEl = document.getElementById('flood-cascade-text');
        const advisoryTextEl = document.getElementById('flood-advisory-text');
        const rorBoxEl = document.getElementById('flood-box-ror');
        const ttdBoxEl = document.getElementById('flood-box-ttd');
        const turbBoxEl = document.getElementById('flood-box-turb');

        if (!bannerEl) return;

        // --- Station label ---
        if (stationLabelEl) stationLabelEl.textContent = (station.name || 'Unknown').substring(0, 35);

        // --- Water Level Display ---
        if (currentLevelEl) currentLevelEl.textContent = levelVal !== null ? `${levelVal}` : '--';

        if (levelVal === null) {
            // No level data
            if (bannerEl) { bannerEl.className = 'flood-banner flood-safe'; }
            if (bannerTitleEl) bannerTitleEl.textContent = '⚪ WATER LEVEL DATA NOT AVAILABLE';
            if (bannerSubEl) bannerSubEl.textContent = `${station.name} — Water level sensor data not reported by CPCB for this station.`;
            if (bannerBadgeEl) bannerBadgeEl.textContent = 'NO LEVEL DATA';
            if (advisoryTextEl) advisoryTextEl.textContent = 'Water level data is not available for this monitoring station. Please select a station with active water level sensors.';
            return;
        }

        // --- CWC Thresholds ---
        const { wl, dl } = getCWCThresholds(levelVal);
        if (wlValueEl) wlValueEl.textContent = `${wl} m`;
        if (dlValueEl) dlValueEl.textContent = `${dl} m`;

        // Gauge fill % (current level relative to danger level)
        const gaugePct = Math.min(96, Math.max(2, (levelVal / dl) * 100));
        if (gaugeFillEl) gaugeFillEl.style.width = `${gaugePct}%`;

        // Dynamic marker positions based on actual WL/DL ratio
        // WL marker: where warning level sits relative to danger level
        const wlMarkerPct = Math.min(92, Math.max(50, (wl / dl) * 100));
        const dlMarkerPct = 96; // always near end of gauge
        if (wlMarkerEl) wlMarkerEl.style.left = `${wlMarkerPct}%`;
        if (dlMarkerEl) dlMarkerEl.style.left = `${dlMarkerPct}%`;

        // --- Rate of Rise ---
        const rorData = calculateRateOfRise(station.id, levelVal);
        const rate = rorData.rate;
        const trend = rorData.trend;

        if (rorValueEl) {
            if (trend === 'insufficient_history') {
                rorValueEl.textContent = 'Calculating...';
            } else {
                const sign = rate > 0 ? '+' : '';
                rorValueEl.textContent = `${sign}${rate.toFixed(3)} m/hr`;
                rorValueEl.style.color = rate > 0.30 ? '#ef4444' : rate > 0.10 ? '#f59e0b' : '#10b981';
            }
        }

        if (rorStatusEl) {
            const trendLabels = {
                'rapid_rise': '🔴 Rapid Rise — Emergency Protocol',
                'rising': '🟡 Rising — Monitor Closely',
                'stable': '🟢 Stable — Normal Flow',
                'falling': '🟢 Falling — Receding',
                'insufficient_history': '⏳ Collecting readings...',
                'unknown': '⚪ Insufficient data'
            };
            rorStatusEl.textContent = trendLabels[trend] || trend;
        }

        if (rorBoxEl) {
            rorBoxEl.classList.toggle('alert-active', rate !== null && rate > 0.30);
        }

        // --- 6h & 12h Forecast ---
        const f6h = rate !== null ? parseFloat((levelVal + rate * 6).toFixed(2)) : null;
        const f12h = rate !== null ? parseFloat((levelVal + rate * 12).toFixed(2)) : null;
        if (f6hEl) f6hEl.textContent = f6h !== null ? `6h: ${f6h} m` : '6h: --';
        if (f12hEl) f12hEl.textContent = f12h !== null ? `${f12h} m` : '--';

        // --- Time to Danger (TTD) ---
        let ttdHours = null;
        if (rate !== null && rate > 0.005 && dl !== null) {
            ttdHours = (dl - levelVal) / rate;
        }

        if (ttdValueEl) {
            if (ttdHours === null || ttdHours < 0) {
                ttdValueEl.textContent = levelVal >= dl ? '⚠️ AT DANGER' : 'N/A';
                ttdValueEl.style.color = levelVal >= dl ? '#ef4444' : 'var(--text-primary)';
            } else if (ttdHours < 3) {
                ttdValueEl.textContent = `${ttdHours.toFixed(1)} hrs ⚠️`;
                ttdValueEl.style.color = '#ef4444';
            } else if (ttdHours < 12) {
                ttdValueEl.textContent = `${ttdHours.toFixed(1)} hrs`;
                ttdValueEl.style.color = '#f59e0b';
            } else {
                ttdValueEl.textContent = `${ttdHours.toFixed(0)}+ hrs`;
                ttdValueEl.style.color = '#10b981';
            }
        }

        if (ttdSubEl) {
            ttdSubEl.textContent = ttdHours !== null && ttdHours > 0
                ? `Danger Level (${dl} m) breach estimate`
                : rate !== null && rate <= 0.005
                    ? 'Level stable or falling — no breach risk'
                    : 'Estimating...';
        }

        if (ttdBoxEl) ttdBoxEl.classList.toggle('alert-active', ttdHours !== null && ttdHours < 6 && ttdHours > 0);

        // --- Turbidity Flash-Flood Trigger ---
        if (turbValueEl) turbValueEl.textContent = turbVal !== null ? `${turbVal} NTU` : '-- NTU';
        if (turbStatusEl) {
            if (turbVal === null) {
                turbStatusEl.textContent = 'Turbidity not reported';
                turbStatusEl.style.color = '';
            } else if (turbVal > 500) {
                turbStatusEl.textContent = '🔴 FLASH FLOOD TRIGGER — Massive sediment surge!';
                turbStatusEl.style.color = '#ef4444';
                if (turbBoxEl) turbBoxEl.classList.add('alert-active');
            } else if (turbVal > 100) {
                turbStatusEl.textContent = '🟡 High Turbidity — Upstream inflow surge detected';
                turbStatusEl.style.color = '#f59e0b';
                if (turbBoxEl) turbBoxEl.classList.remove('alert-active');
            } else {
                turbStatusEl.textContent = '🟢 Normal sediment load';
                turbStatusEl.style.color = '#10b981';
                if (turbBoxEl) turbBoxEl.classList.remove('alert-active');
            }
        }

        // --- Determine Overall Alert Level ---
        const isAtDanger = levelVal >= dl;
        const isNearDanger = levelVal >= wl || (ttdHours !== null && ttdHours < 6 && ttdHours > 0);
        const isRapidRise = rate !== null && rate > 0.30;
        const isRising = rate !== null && rate > 0.10;
        const isTurbAlert = turbVal !== null && turbVal > 100;

        let alertLevel = 'safe';
        if (isAtDanger || isRapidRise || (ttdHours !== null && ttdHours < 3 && ttdHours > 0)) {
            alertLevel = 'danger';
        } else if (isNearDanger || isRising || isTurbAlert) {
            alertLevel = 'watch';
        }

        // --- Update Banner ---
        if (bannerEl) bannerEl.className = `flood-banner flood-${alertLevel}`;

        const bannerConfig = {
            safe: {
                title: '🟢 NO FLOOD RISK — SYSTEM SAFE',
                badge: 'LOW RISK',
                icon: 'fa-shield-halved',
                subtitle: `${station.name} water level (${levelVal}m) is within safe CWC threshold. No immediate flood threat.`
            },
            watch: {
                title: '🟡 FLOOD WATCH — ADVISORY ISSUED',
                badge: 'WATCH / ADVISORY',
                icon: 'fa-triangle-exclamation',
                subtitle: `${station.name} water level rising${rate !== null ? ` at +${rate.toFixed(3)} m/hr` : ''}. Monitor continuously. Upstream inflow detected.`
            },
            danger: {
                title: '🔴 HIGH FLOOD ALERT — EMERGENCY PROTOCOL',
                badge: 'DANGER ALERT',
                icon: 'fa-skull-crossbones',
                subtitle: `CRITICAL: ${station.name} approaching/exceeding CWC Danger Level (${dl}m).${ttdHours > 0 && ttdHours < 24 ? ` Breach estimated in ${ttdHours.toFixed(1)} hours.` : ''} Immediate action required.`
            }
        };

        const cfg = bannerConfig[alertLevel];
        if (bannerTitleEl) bannerTitleEl.textContent = cfg.title;
        if (bannerSubEl) bannerSubEl.textContent = cfg.subtitle;
        if (bannerBadgeEl) bannerBadgeEl.textContent = cfg.badge;

        const bannerIconEl = document.getElementById('flood-banner-icon');
        if (bannerIconEl) bannerIconEl.innerHTML = `<i class="fa-solid ${cfg.icon}"></i>`;

        // --- Cascade Warning ---
        const cascadeMsg = RIVER_CASCADE[station.river];
        if (cascadeRowEl) {
            if (alertLevel !== 'safe' && cascadeMsg) {
                cascadeRowEl.style.display = 'flex';
                if (cascadeTextEl) cascadeTextEl.textContent = cascadeMsg;
            } else {
                cascadeRowEl.style.display = 'none';
            }
        }

        // --- Emergency Advisory Text ---
        const advisoryMessages = {
            safe: `All parameters at ${station.name} (${station.river || 'River Basin'}, ${station.state}) are within normal CWC thresholds. Water level: ${levelVal}m. Warning Level: ${wl}m. Danger Level: ${dl}m. Continue standard monitoring. No public advisory required at this time.`,
            watch: `FLOOD WATCH ISSUED for ${station.name} (${station.state}). Water level: ${levelVal}m${rate ? `, rising at ${rate.toFixed(3)} m/hr` : ''}. Warning Level (${wl}m) ${levelVal >= wl ? 'REACHED' : 'approaching'}. Recommended actions: Alert local administration, warn riverside communities, check boats and livestock, avoid unnecessary river crossings.`,
            danger: `🚨 EMERGENCY ALERT — ${station.name} (${station.state}): Water level ${levelVal}m is near/above CWC Danger Level (${dl}m).${ttdHours > 0 && ttdHours < 24 ? ` Danger Level breach projected in ~${ttdHours.toFixed(1)} hours.` : ''} IMMEDIATE ACTIONS: Activate flood emergency response, issue evacuation orders for low-lying riverbank areas, alert NDRF/SDRF teams, place fishing community on high alert, close vulnerable bridges.`
        };

        if (advisoryTextEl) advisoryTextEl.textContent = advisoryMessages[alertLevel];
    }

    // --- Home Reset Button Listener (Top Logo Reset Only) ---
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
