document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggling (Fixed & Persisted across Dashboard & Admin) ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme_preference', 'dark');
            if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme_preference', 'light');
            if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    }

    const savedTheme = localStorage.getItem('theme_preference') || 'light';
    applyTheme(savedTheme);
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    }

    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('admin-login-form');
    const loginError = document.getElementById('login-error');
    const btnLogout = document.getElementById('btn-logout');
    const btnLoginSubmit = document.getElementById('btn-admin-login-submit');

    const btnExportCsv = document.getElementById('btn-export-csv');
    let rawData = [];

    const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [28, 46],
        iconAnchor: [14, 46],
        popupAnchor: [1, -36],
        shadowSize: [46, 46]
    });

    // Auto City GPS Mapping Dictionary
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

    // --- Tab Switcher Logic with Guaranteed Table Re-Render ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-content-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const target = btn.getAttribute('data-tab');
            const targetPanel = document.getElementById(target);
            if (targetPanel) targetPanel.classList.add('active');

            // Re-render table views instantly when tab is clicked!
            if (target === 'tab-rivers') renderRivers();
            if (target === 'tab-locations') renderLocations();
            if (target === 'tab-stations') renderStations();
            if (target === 'tab-single-entry') {
                setTimeout(initAdminMapPicker, 200);
            }
        });
    });

    // --- Auth Session Check & Perform Login ---
    function checkAuth() {
        const isLoggedIn = localStorage.getItem('admin_logged_in');
        if (isLoggedIn === 'true') {
            if (loginModal) loginModal.style.display = 'none';
            initAdminDashboard();
        } else {
            if (loginModal) loginModal.style.display = 'flex';
        }
    }

    function performAdminLogin(e) {
        if (e) {
            e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
        }

        const userEl = document.getElementById('admin-username');
        const passEl = document.getElementById('admin-password');

        if (!userEl || !passEl) return false;

        const user = (userEl.value || '').trim();
        const pass = (passEl.value || '').trim();

        if (user.toLowerCase() === 'admin' && pass === 'admin123') {
            localStorage.setItem('admin_logged_in', 'true');
            if (loginError) loginError.style.display = 'none';
            if (loginModal) loginModal.style.display = 'none';
            initAdminDashboard();
        } else {
            if (loginError) {
                loginError.style.display = 'block';
                loginError.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Incorrect Username or Password! Please try again.';
            }
        }
        return false;
    }

    // Auto-hide login error box when typing
    ['admin-username', 'admin-password'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                if (loginError) loginError.style.display = 'none';
            });
        }
    });

    if (loginForm) {
        loginForm.addEventListener('submit', performAdminLogin);
    }

    if (btnLoginSubmit) {
        btnLoginSubmit.addEventListener('click', performAdminLogin);
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('admin_logged_in');
            checkAuth();
        });
    }

    // --- Initialize Admin Dashboard & CRUD ---
    async function initAdminDashboard() {
        await fetchLiveData();
        renderRivers();
        renderLocations();
        renderStations();
        updateStatsSummary();
        setTimeout(initAdminMapPicker, 300);
    }

    let adminPickerMap = null;
    let adminPickerMarker = null;
    let selectedLat = 21.1458;
    let selectedLng = 79.0882;

    function initAdminMapPicker() {
        const mapEl = document.getElementById('admin-map-picker');
        if (!mapEl) return;

        if (!adminPickerMap) {
            adminPickerMap = L.map('admin-map-picker').setView([selectedLat, selectedLng], 6);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(adminPickerMap);

            adminPickerMarker = L.marker([selectedLat, selectedLng], {
                draggable: true,
                icon: redIcon
            }).addTo(adminPickerMap);

            adminPickerMarker.bindPopup('<b>Selected River Pin Spot</b><br/>Click anywhere on map or drag pin!').openPopup();

            function updatePickedCoords(lat, lng) {
                selectedLat = Number(lat.toFixed(4));
                selectedLng = Number(lng.toFixed(4));
                const badge = document.getElementById('picked-coords-badge');
                if (badge) {
                    badge.textContent = `Selected Pin: Lat ${selectedLat}, Lng ${selectedLng}`;
                }
            }

            adminPickerMap.on('click', (e) => {
                const { lat, lng } = e.latlng;
                adminPickerMarker.setLatLng([lat, lng]);
                updatePickedCoords(lat, lng);
            });

            adminPickerMarker.on('dragend', (e) => {
                const position = adminPickerMarker.getLatLng();
                updatePickedCoords(position.lat, position.lng);
            });

            const locInput = document.getElementById('all-location-name');
            if (locInput) {
                locInput.addEventListener('input', () => {
                    const coords = getCoordsForLocation(locInput.value);
                    selectedLat = coords.lat;
                    selectedLng = coords.lng;
                    adminPickerMap.flyTo([selectedLat, selectedLng], 9);
                    adminPickerMarker.setLatLng([selectedLat, selectedLng]);
                    updatePickedCoords(selectedLat, selectedLng);
                });
            }
        } else {
            adminPickerMap.invalidateSize();
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

    // Dynamic Summary Stats Calculation (Live CPCB Data + Admin Custom)
    function updateStatsSummary() {
        const riversSet = new Set();
        const locationsSet = new Set();

        // 1. Live CPCB Rivers & Locations
        rawData.forEach(item => {
            const stName = item.station_name || '';
            const riverName = inferRiverName(stName, item.territory_name);

            riversSet.add(riverName);
            if (item.territory_name) locationsSet.add(item.territory_name);
        });

        // 2. Custom Admin Rivers & Locations
        const customRivers = JSON.parse(localStorage.getItem('admin_custom_rivers') || '[]');
        customRivers.forEach(r => riversSet.add(r));

        const customLocations = JSON.parse(localStorage.getItem('admin_custom_locations') || '[]');
        customLocations.forEach(l => locationsSet.add(l));

        const riversCnt = document.getElementById('stat-count-rivers');
        const locationsCnt = document.getElementById('stat-count-locations');
        const stationsCnt = document.getElementById('stat-count-stations');

        if (riversCnt) riversCnt.textContent = riversSet.size;
        if (locationsCnt) locationsCnt.textContent = locationsSet.size;

        const liveUniqueCount = rawData.length > 0 ? new Set(rawData.map(i => i.station_id || i.station_no)).size : 40;
        const customStations = getStations();
        if (stationsCnt) stationsCnt.textContent = liveUniqueCount + customStations.length;
    }

    // --- Fetch Live CPCB Data ---
    async function fetchLiveData() {
        const t = Date.now();
        const endpoints = [
            `https://smart-river-backend.onrender.com/api/live-data?t=${t}`,
            `/api/live-data?t=${t}`,
            `http://localhost:3000/api/live-data?t=${t}`,
            `https://corsproxy.io/?https://rtwqmsdb1.cpcb.gov.in/data/internet/layers/10/index.json?t=${t}`,
            `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://rtwqmsdb1.cpcb.gov.in/data/internet/layers/10/index.json?t=${t}`)}`
        ];

        for (const url of endpoints) {
            try {
                const res = await fetch(url, { cache: 'no-store' });
                if (res.ok) {
                    rawData = await res.json();
                    if (Array.isArray(rawData) && rawData.length > 0) break;
                }
            } catch (err) {}
        }
        renderRivers();
        renderLocations();
        renderStations();
        updateStatsSummary();
    }

    // ==========================================================================
    // FEATURED SINGLE-STEP ALL-INDIA RIVER WATER TEST ENTRY FORM (DIRECT MAP PICKER)
    // ==========================================================================
    const formAllInOne = document.getElementById('form-all-in-one-entry');
    if (formAllInOne) {
        formAllInOne.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const riverName = document.getElementById('all-river-name').value.trim();
            const locationName = document.getElementById('all-location-name').value.trim();
            const stationName = document.getElementById('all-station-name').value.trim();
            const stationCode = document.getElementById('all-station-code').value.trim();

            // 1. Add River if not exists
            const rivers = getRivers();
            if (!rivers.includes(riverName)) {
                rivers.push(riverName);
                localStorage.setItem('admin_custom_rivers', JSON.stringify(rivers));
            }

            // 2. Add Location if not exists
            const locations = getLocations();
            if (!locations.includes(locationName)) {
                locations.push(locationName);
                localStorage.setItem('admin_custom_locations', JSON.stringify(locations));
            }

            // 3. Add Station if not exists with exact picked Lat / Lng
            const stations = getStations();
            const existingIdx = stations.findIndex(s => s.code === stationCode);
            const newStation = {
                name: stationName,
                code: stationCode,
                river: riverName,
                location: locationName,
                lat: selectedLat,
                lng: selectedLng
            };
            if (existingIdx >= 0) {
                stations[existingIdx] = newStation;
            } else {
                stations.push(newStation);
            }
            localStorage.setItem('admin_custom_stations', JSON.stringify(stations));

            // 4. Save all 8 parameter overrides for this station!
            const overrides = JSON.parse(localStorage.getItem('admin_overrides') || '{}');
            if (!overrides[stationCode]) overrides[stationCode] = {};

            const paramMap = [
                { id: 'all-param-level', key: 'Water Level' },
                { id: 'all-param-ph', key: 'pH' },
                { id: 'all-param-temp', key: 'Water Temperature' },
                { id: 'all-param-do', key: 'Dissolved Oxygen' },
                { id: 'all-param-bod', key: 'Biochemical Oxygen Demand' },
                { id: 'all-param-cod', key: 'Chemical Oxygen Demand' },
                { id: 'all-param-turb', key: 'Water Turbidity' },
                { id: 'all-param-ec', key: 'Conductivity' },
                { id: 'all-param-nitrate', key: 'Nitrate' },
                { id: 'all-param-chloride', key: 'Chloride' },
                { id: 'all-param-toc', key: 'Total Organic Carbon' },
                { id: 'all-param-depth', key: 'Depth' }
            ];

            paramMap.forEach(item => {
                const inputEl = document.getElementById(item.id);
                if (inputEl && inputEl.value !== '') {
                    const parsed = parseFloat(inputEl.value);
                    if (!isNaN(parsed)) {
                        overrides[stationCode][item.key] = parsed;
                    }
                }
            });

            localStorage.setItem('admin_overrides', JSON.stringify(overrides));

            renderRivers();
            renderLocations();
            renderStations();
            updateStatsSummary();

            formAllInOne.reset();
            alert(`✅ Tested River Data & GIS Map Pin for "${riverName} (${stationName})" Successfully Published to Live Dashboard!`);
        });
    }

    // ==========================================================================
    // 1. RIVERS MANAGEMENT CRUD
    // ==========================================================================
    const formAddRiver = document.getElementById('form-add-river');
    const riversTbody = document.getElementById('rivers-table-tbody');

    function getRivers() {
        const set = new Set();
        // 1. Live CPCB Rivers
        if (Array.isArray(rawData) && rawData.length > 0) {
            rawData.forEach(item => {
                const stName = item.station_name || '';
                const riverName = inferRiverName(stName, item.territory_name);
                set.add(riverName);
            });
        } else {
            // Default 14 rivers list fallback
            [
                "Ganga River", "Yamuna River", "Damodar River", "Bhagirathi / Alaknanda", 
                "Yamuna / Ganga Basin", "Gandak River", "Kosi River", "Hindon River", 
                "Ramganga River", "Ghaghara River", "Punpun River", "Son River", 
                "Hooghly River", "Sai River"
            ].forEach(r => set.add(r));
        }

        // 2. Custom Admin Rivers
        const customRivers = JSON.parse(localStorage.getItem('admin_custom_rivers') || '[]');
        customRivers.forEach(r => set.add(r));

        return Array.from(set);
    }

    function saveRivers(customList) {
        localStorage.setItem('admin_custom_rivers', JSON.stringify(customList));
        renderRivers();
        updateStatsSummary();
    }

    function renderRivers() {
        if (!riversTbody) return;
        const list = getRivers();
        riversTbody.innerHTML = '';
        list.forEach((river, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong style="color: var(--cyan-primary);"><i class="fa-solid fa-water" style="margin-right: 8px;"></i> ${river}</strong></td>
                <td><span style="background: rgba(16, 185, 129, 0.15); color: #10b981; padding: 4px 10px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.3);">● Active Surveillance</span></td>
                <td style="text-align: right;">
                    <button class="action-btn-sm btn-delete" onclick="deleteRiver('${river.replace(/'/g, "\\'")}')"><i class="fa-solid fa-trash"></i> Delete</button>
                </td>
            `;
            riversTbody.appendChild(tr);
        });
    }

    if (formAddRiver) {
        formAddRiver.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = document.getElementById('river-name-input').value.trim();
            if (val) {
                const customRivers = JSON.parse(localStorage.getItem('admin_custom_rivers') || '[]');
                if (!customRivers.includes(val)) {
                    customRivers.push(val);
                    saveRivers(customRivers);
                }
                document.getElementById('river-name-input').value = '';
            }
        });
    }

    window.deleteRiver = function(riverName) {
        const customRivers = JSON.parse(localStorage.getItem('admin_custom_rivers') || '[]');
        const updated = customRivers.filter(r => r !== riverName);
        localStorage.setItem('admin_custom_rivers', JSON.stringify(updated));
        renderRivers();
        updateStatsSummary();
    };

    // ==========================================================================
    // 2. LOCATIONS MANAGEMENT CRUD
    // ==========================================================================
    const formAddLocation = document.getElementById('form-add-location');
    const locationsTbody = document.getElementById('locations-table-tbody');

    function getLocations() {
        return JSON.parse(localStorage.getItem('admin_custom_locations') || '["Bihar", "Uttar Pradesh", "Haryana", "Uttarakhand", "West Bengal", "Jharkhand"]');
    }

    function saveLocations(list) {
        localStorage.setItem('admin_custom_locations', JSON.stringify(list));
        renderLocations();
        updateStatsSummary();
    }

    function renderLocations() {
        if (!locationsTbody) return;
        const list = getLocations();
        locationsTbody.innerHTML = '';
        list.forEach((loc, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong style="color: #2dd4bf;"><i class="fa-solid fa-location-dot" style="margin-right: 8px;"></i> ${loc}</strong></td>
                <td><span style="background: rgba(16, 185, 129, 0.15); color: #10b981; padding: 4px 10px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.3);">● Territory Online</span></td>
                <td style="text-align: right;">
                    <button class="action-btn-sm btn-delete" onclick="deleteLocation(${index})"><i class="fa-solid fa-trash"></i> Delete</button>
                </td>
            `;
            locationsTbody.appendChild(tr);
        });
    }

    if (formAddLocation) {
        formAddLocation.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = document.getElementById('location-name-input').value.trim();
            if (val) {
                const list = getLocations();
                list.push(val);
                saveLocations(list);
                document.getElementById('location-name-input').value = '';
            }
        });
    }

    window.deleteLocation = function(index) {
        const list = getLocations();
        list.splice(index, 1);
        saveLocations(list);
    };

    // ==========================================================================
    // 3. STATIONS MANAGEMENT CRUD (Renders ALL 40+ Live CPCB + Custom Stations)
    // ==========================================================================
    const stationsTbody = document.getElementById('stations-table-tbody');

    function getStations() {
        return JSON.parse(localStorage.getItem('admin_custom_stations') || '[]');
    }

    function saveStations(list) {
        localStorage.setItem('admin_custom_stations', JSON.stringify(list));
        renderStations();
        updateStatsSummary();
    }

    function renderStations() {
        if (!stationsTbody) return;
        stationsTbody.innerHTML = '';

        const customList = getStations();

        // 1. Render Custom Admin Added Stations First
        customList.forEach((st, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><code style="background: rgba(56,189,248,0.15); padding: 4px 8px; border-radius: 6px; color: var(--cyan-primary); font-weight:700;">${st.code}</code></td>
                <td><strong>${st.name}</strong> <span style="font-size:0.75rem; background:rgba(56,189,248,0.12); color:var(--cyan-primary); padding:2px 6px; border-radius:4px; margin-left:6px;">Custom Tested</span></td>
                <td>${st.river}</td>
                <td>${st.location}</td>
                <td style="text-align: right;">
                    <button class="action-btn-sm btn-delete" onclick="deleteStation(${index})"><i class="fa-solid fa-trash"></i> Delete</button>
                </td>
            `;
            stationsTbody.appendChild(tr);
        });

        // 2. Render Live Satellite CPCB Stations
        const liveMap = new Map();
        rawData.forEach(item => {
            const id = item.station_id || item.station_no;
            if (id && !liveMap.has(id)) {
                let riverName = "Ganga";
                const name = item.station_name || '';
                if (name.includes('Yamuna')) riverName = 'Yamuna';
                else if (name.includes('Gandak')) riverName = 'Gandak';
                else if (name.includes('Godavari')) riverName = 'Godavari';
                else if (name.includes('Kaveri')) riverName = 'Kaveri';

                liveMap.set(id, {
                    code: id,
                    name: name || 'Live Monitoring Station',
                    river: riverName,
                    location: item.territory_name || 'India Territory'
                });
            }
        });

        liveMap.forEach((st) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><code style="background: rgba(16,185,129,0.1); padding: 4px 8px; border-radius: 6px; color: #10b981; font-weight:700;">${st.code}</code></td>
                <td><strong>${st.name}</strong> <span style="font-size:0.75rem; background:rgba(16,185,129,0.12); color:#10b981; padding:2px 6px; border-radius:4px; margin-left:6px;">● CPCB Live</span></td>
                <td>${st.river}</td>
                <td>${st.location}</td>
                <td style="text-align: right;">
                    <span style="font-size: 0.78rem; color: var(--text-muted); font-weight:600;"><i class="fa-solid fa-satellite-dish"></i> Sensor Online</span>
                </td>
            `;
            stationsTbody.appendChild(tr);
        });
    }

    window.deleteStation = function(index) {
        const list = getStations();
        list.splice(index, 1);
        saveStations(list);
    };

    // ==========================================================================
    // FULL METADATA CSV EXPORT SYSTEM
    // ==========================================================================
    if (btnExportCsv) {
        btnExportCsv.addEventListener('click', () => {
            if (!rawData || rawData.length === 0) {
                alert('No live data available to export.');
                return;
            }

            let csvContent = "data:text/csv;charset=utf-8,";

            csvContent += "==========================================================================\n";
            csvContent += "FULL PROJECT TITLE: SMART RIVER WATER LEVEL AND QUALITY SURVEILLANCE\n";
            csvContent += `SOURCE NAME / LINK: CPCB RTWQMS (https://rtwqmsdb1.cpcb.gov.in)\n`;
            csvContent += `LAST CHECKED BY WEBSITE: ${new Date().toLocaleString()}\n`;
            csvContent += "==========================================================================\n\n";

            csvContent += "Selected Location,Selected Station,Station Code,Parameter Name,Value,Unit,Original Observation Time,Data Status Label\n";

            const overrides = JSON.parse(localStorage.getItem('admin_overrides') || '{}');

            rawData.forEach(item => {
                const stId = item.station_id || item.station_no;
                const loc = `"${(item.territory_name || 'General').replace(/"/g, '""')}"`;
                const stName = `"${(item.station_name || 'Unknown Station').replace(/"/g, '""')}"`;
                const param = `"${(item.stationparameter_longname || item.stationparameter_name || '').replace(/"/g, '""')}"`;
                const unit = `"${(item.ts_unitsymbol || '').replace(/"/g, '""')}"`;
                const obsTime = `"${item.timestamp || 'N/A'}"`;

                const isOverridden = overrides[stId] && overrides[stId][param];
                const finalVal = isOverridden !== undefined ? overrides[stId][param] : item.ts_value;
                const statusLabel = isOverridden ? "✓ Admin Verified" : "● CPCB RTWQMS Source";

                csvContent += `${loc},${stName},${stId},${param},${finalVal},${unit},${obsTime},${statusLabel}\n`;
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `SMART_RIVER_SURVEILLANCE_REPORT_${new Date().toISOString().slice(0,10)}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Auto load tables immediately on DOM Ready
    renderRivers();
    renderLocations();
    renderStations();
    checkAuth();
});
