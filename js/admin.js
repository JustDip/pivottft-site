/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.kPlatformToRegion = exports.kCurrentTftSetNumber = exports.kCurrentTftPatch = exports.kRiotApiBaseUrl = exports.kRiotApiConfig = exports.kTFTClassId = exports.kHotkeys = exports.kWindowNames = exports.kGameClassIds = exports.kGamesFeatures = void 0;
exports.kGamesFeatures = new Map([
    [
        5426,
        [
            'match_info',
            'board',
            'bench',
            'store',
            'carousel',
            'game_info',
            'augments',
            'live_client_data'
        ]
    ],
]);
exports.kGameClassIds = Array.from(exports.kGamesFeatures.keys());
exports.kWindowNames = {
    inGame: 'in_game',
    desktop: 'desktop',
    settings: 'settings',
    ingameController: 'ingame_controller',
    matchups: 'matchups',
    login: 'login',
    admin: 'admin',
    headliner: 'headliner',
    replay: 'replay',
};
exports.kHotkeys = {
    toggle: 'pivottft_showhide'
};
exports.kTFTClassId = 5426;
exports.kRiotApiConfig = {
    apiKey: '',
    region: 'europe',
    platform: 'eun1',
};
exports.kRiotApiBaseUrl = 'https://api.pivottft.com';
exports.kCurrentTftPatch = '17.3';
exports.kCurrentTftSetNumber = 17;
exports.kPlatformToRegion = {
    'euw1': 'europe', 'eun1': 'europe', 'tr1': 'europe', 'ru': 'europe',
    'na1': 'americas', 'br1': 'americas', 'la1': 'americas', 'la2': 'americas',
    'kr': 'asia', 'jp1': 'asia', 'oc1': 'asia', 'ph2': 'asia',
    'sg2': 'asia', 'th2': 'asia', 'tw2': 'asia', 'vn2': 'asia',
};


/***/ }),

/***/ "./src/data/set17/comps.ts":
/*!*********************************!*\
  !*** ./src/data/set17/comps.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCompsByTier = exports.metaComps = void 0;
exports.metaComps = [
    {
        id: 'morgana-dark-lady',
        name: 'Morgana Dark Lady',
        tier: 'S',
        playstyle: 'Fast 9',
        difficulty: 'Hard',
        level: 9,
        units: [
            { championId: 'TFT17_Morgana', isCarry: true, starLevel: 2, items: ['rabadons-deathcap', 'jeweled-gauntlet', 'hextech-gunblade'] },
            { championId: 'TFT17_Karma', isCarry: false, starLevel: 2, items: ['blue-buff'] },
            { championId: 'TFT17_Mordekaiser', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Lissandra', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Jhin', isCarry: false, starLevel: 1 },
            { championId: 'TFT17_Vex', isCarry: false, starLevel: 1 },
            { championId: 'TFT17_Mordekaiser', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Shen', isCarry: false, starLevel: 1 },
        ],
        coreTraits: ['Dark Lady', 'Dark Star'],
        description: 'Morgana solo-carries with Dark Star supporting cast. Uncap board at Lv9 for Jhin/Vex secondary AP.',
        earlyGame: 'Lissandra + Mordekaiser opener for Dark Star 2. Econ to 50, push 8 on 4-2.',
        midGame: 'Stabilize at Lv7 on 4-1 — find Karma 2 and complete Rabadon\'s on Morgana.',
        lateGame: 'Push Lv9 on 5-1 and slow roll for Morgana 2 — uncap with Jhin and Vex.',
        tips: 'Morgana wants AP/durability. Position behind Shen for the bulwark shield.',
        recommendedAugments: ['TFT13_Augment_SorcererCrown', 'TFT6_Augment_PandorasItems', 'TFT6_Augment_Ascension']
    },
    {
        id: 'jhin-dark-star-snipers',
        name: 'Jhin Dark Star Snipers',
        tier: 'S',
        playstyle: 'Fast 8',
        difficulty: 'Medium',
        level: 8,
        units: [
            { championId: 'TFT17_Jhin', isCarry: true, starLevel: 2, items: ['infinity-edge', 'last-whisper', 'giant-slayer'] },
            { championId: 'TFT17_Xayah', isCarry: false, starLevel: 2, items: ['guinsoos-rageblade'] },
            { championId: 'TFT17_Ezreal', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Gnar', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Karma', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Lissandra', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Mordekaiser', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Shen', isCarry: false, starLevel: 1 },
        ],
        coreTraits: ['Dark Star', 'Eradicator', 'Sniper'],
        description: 'Sniper line backed by Dark Star damage amp. Jhin one-shots backline carries on his fourth shot.',
        earlyGame: 'Ezreal + Gnar early Sniper trait. Slam IE on Jhin holder.',
        midGame: 'Stabilize at Lv7 by 4-1 — hold Jhin and Xayah pairs, complete Last Whisper.',
        lateGame: 'Push Lv8 on 4-2 and slow roll — Sniper 4 + Karma boost closes out the lobby.',
        tips: 'Stack Snipers in the same column. Karma boosts the line for crit + AP synergy.',
        recommendedAugments: ['TFT13_Augment_Sniper', 'TFT13_Augment_SniperCrown', 'TFT6_Augment_Ascension']
    },
    {
        id: 'xayah-stargazer',
        name: 'Xayah Stargazer',
        tier: 'S',
        playstyle: 'Fast 8',
        difficulty: 'Medium',
        level: 8,
        units: [
            { championId: 'TFT17_Xayah', isCarry: true, starLevel: 2, items: ['infinity-edge', 'last-whisper', 'runaans-hurricane'] },
            { championId: 'TFT17_Lulu', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Jax', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_TwistedFate', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Talon', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Caitlyn', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Milio', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Nunu', isCarry: false, starLevel: 2 },
        ],
        coreTraits: ['Stargazer', 'Sniper', 'Bastion'],
        description: 'Stargazer constellation buffs Xayah while Jax tanks. Nunu holds the Stargazer 4-cost slot.',
        earlyGame: 'Open with TF + Talon + Caitlyn for Stargazer 3. Econ for Xayah.',
        midGame: 'Stabilize Lv7 on 4-1 — find Xayah copies, finish IE, and slam Jax frontline.',
        lateGame: 'Push Lv8 on 4-2 and slow roll for Xayah 2 + Lulu/Nunu to hit Stargazer 5.',
        tips: 'Stargazer 5 is the spike if you find Lulu and Nunu. Position Xayah back-corner.',
        recommendedAugments: ['TFT13_Augment_SniperCrest', 'TFT6_Augment_Ascension', 'TFT10_Augment_BigGains']
    },
    {
        id: 'primordian-reroll',
        name: 'Primordian Reroll',
        tier: 'A',
        playstyle: 'Reroll',
        difficulty: 'Easy',
        level: 6,
        units: [
            { championId: 'TFT17_RekSai', isCarry: true, starLevel: 3, items: ['titans-resolve', 'bloodthirster', 'warmogs-armor'] },
            { championId: 'TFT17_Belveth', isCarry: true, starLevel: 3, items: ['guinsoos-rageblade', 'runaans-hurricane', 'giant-slayer'] },
            { championId: 'TFT17_Briar', isCarry: false, starLevel: 3 },
            { championId: 'TFT17_Maokai', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Illaoi', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Aurora', isCarry: false, starLevel: 2 },
        ],
        coreTraits: ['Primordian', 'Anima', 'Brawler'],
        description: "Reroll Lv6 for 3-star Rek'Sai and Bel'Veth. Primordian Brawlers stat-check enemies.",
        earlyGame: 'Buy every Rek\'Sai, Bel\'Veth, Briar from Stage 2. Slow roll at Lv6.',
        midGame: 'Stay Lv6 on 3-2 — slow roll 50g down for Rek\'Sai 3, Bel\'Veth 3, and Briar 3.',
        lateGame: 'Once 3-stars hit, push Lv7 on 4-2 for Aurora and lock in Anima 4.',
        tips: "Prioritize Rek'Sai items on carousel. Aurora 2-star adds Anima trait.",
        recommendedAugments: ['TFT13_Augment_Bruiser', 'TFT13_Augment_BruiserCrown', 'TFT6_Augment_SalvageBinHR']
    },
    {
        id: 'mecha-asol',
        name: 'Mecha Aurelion Sol',
        tier: 'A',
        playstyle: 'Fast 8',
        difficulty: 'Hard',
        level: 8,
        units: [
            { championId: 'TFT17_AurelionSol', isCarry: true, starLevel: 2, items: ['jeweled-gauntlet', 'hextech-gunblade', 'rabadons-deathcap'] },
            { championId: 'TFT17_Galio', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Urgot', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Viktor', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Karma', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Bard', isCarry: false, starLevel: 1 },
            { championId: 'TFT17_Blitzcrank', isCarry: false, starLevel: 1 },
            { championId: 'TFT17_Mordekaiser', isCarry: false, starLevel: 2 },
        ],
        coreTraits: ['Mecha', 'Conduit', 'Vanguard'],
        description: 'Full Mecha frontline pilot ASol, Conduit chain feeds the team mana. Cap board with Bard or Blitzcrank.',
        earlyGame: 'Urgot + Viktor early Mecha. Transition to ASol + Galio at Lv8.',
        midGame: 'Stabilize at Lv7 with Mecha 3 — econ to 50g and prep ASol items.',
        lateGame: 'Push Lv8 on 4-2, find ASol 2 and Galio — cap with Bard or Blitzcrank for Conduit chain.',
        tips: 'Conduit needs a Conduit pair to chain. Pair ASol with Bard or Mordekaiser.',
        recommendedAugments: ['TFT13_Augment_SorcererCrown', 'TFT6_Augment_PandorasItems', 'TFT10_Augment_BigGains']
    },
    {
        id: 'zed-galaxy-hunter',
        name: 'Zed Galaxy Hunter',
        tier: 'A',
        playstyle: 'Fast 9',
        difficulty: 'Hard',
        level: 9,
        units: [
            { championId: 'TFT17_Zed', isCarry: true, starLevel: 2, items: ['infinity-edge', 'edge-of-night', 'bloodthirster'] },
            { championId: 'TFT17_Talon', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Akali', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Kaisa', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Karma', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Mordekaiser', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Lissandra', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Jhin', isCarry: false, starLevel: 1 },
            { championId: 'TFT17_Shen', isCarry: false, starLevel: 1 },
        ],
        coreTraits: ['Galaxy Hunter', 'Dark Star', 'Rogue'],
        description: 'Zed solo carry with Rogue + Dark Star backline pressure. Cap board at Lv9.',
        earlyGame: 'Loss streak Stage 2. Stabilize at Lv7, push 9 on 5-1.',
        midGame: 'Lv7 on 4-1 with Talon + Akali Rogue 2 — econ for the Lv8/9 push and complete IE.',
        lateGame: 'Push Lv8 on 4-2 then 9 on 5-1 — slow roll for Zed 2 and Lissandra 2.',
        tips: 'Zed wants IE + sustain. Edge of Night gives him the burst window.',
        recommendedAugments: ['TFT13_Augment_QuickstrikerCrown', 'TFT6_Augment_Ascension', 'TFT10_Augment_BigGains']
    },
    {
        id: 'psionic-pyke-reroll',
        name: 'Psionic Pyke Reroll',
        tier: 'B',
        playstyle: 'Reroll',
        difficulty: 'Easy',
        level: 6,
        units: [
            { championId: 'TFT17_Pyke', isCarry: true, starLevel: 3, items: ['infinity-edge', 'edge-of-night', 'hand-of-justice'] },
            { championId: 'TFT17_Gragas', isCarry: false, starLevel: 3 },
            { championId: 'TFT17_Viktor', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_MasterYi', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Sona', isCarry: false, starLevel: 1 },
            { championId: 'TFT17_Karma', isCarry: false, starLevel: 2 },
        ],
        coreTraits: ['Psionic', 'Voyager', 'Marauder'],
        description: 'Reroll at Lv6 for 3-star Pyke. Psionic 4 is the team spike — Sona caps it at 5.',
        earlyGame: 'Buy every Pyke + Gragas + Viktor from Stage 2.',
        midGame: 'Stay Lv6 from 3-2 — slow roll for Pyke 3 and Gragas 3, keep Psionic 4 active.',
        lateGame: 'After 3-stars hit, push Lv7 for Sona — Psionic 5 closes out the lobby.',
        tips: 'Pyke jumps backline; pair with Edge of Night for burst window.',
        recommendedAugments: ['TFT13_Augment_QuickstrikerCrown', 'TFT6_Augment_SalvageBinHR', 'TFT6_Augment_ComponentGrabBag']
    },
    {
        id: 'sona-commander',
        name: 'Sona Commander',
        tier: 'B',
        playstyle: 'Fast 9',
        difficulty: 'Medium',
        level: 9,
        units: [
            { championId: 'TFT17_Sona', isCarry: true, starLevel: 2, items: ['blue-buff', 'jeweled-gauntlet', 'hextech-gunblade'] },
            { championId: 'TFT17_Teemo', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Lissandra', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Illaoi', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Leblanc', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Karma', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Shen', isCarry: false, starLevel: 1 },
            { championId: 'TFT17_Bard', isCarry: false, starLevel: 1 },
        ],
        coreTraits: ['Commander', 'Shepherd', 'Psionic'],
        description: 'Heal-and-shield Shepherd backbone with Sona broadcasting team-wide buffs. Strong vs sustained DPS, weak vs assassins.',
        earlyGame: 'Open Shepherd 2 with Teemo + Lissandra. Push 8 on 4-2.',
        midGame: 'Stabilize Lv7 on 4-1 with Shepherd 3 — econ for the Lv8 push, prep Blue Buff on Sona.',
        lateGame: 'Push Lv8 on 4-2 then 9 on 5-1 — slow roll for Sona 2 and hit Shepherd 5.',
        tips: 'Shepherd 5 is the spike. Position Sona behind Shen for the Bulwark shield.',
        recommendedAugments: ['TFT6_Augment_PandorasItems', 'TFT10_Augment_BigGains', 'TFT9_Augment_LearningFromExperience2']
    },
    {
        id: 'anima-fiora',
        name: 'Anima Fiora',
        tier: 'C',
        playstyle: 'Fast 8',
        difficulty: 'Hard',
        level: 8,
        units: [
            { championId: 'TFT17_Fiora', isCarry: true, starLevel: 2, items: ['infinity-edge', 'bloodthirster', 'last-whisper'] },
            { championId: 'TFT17_Briar', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Jinx', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Aurora', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Illaoi', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Akali', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Belveth', isCarry: false, starLevel: 2 },
            { championId: 'TFT17_Mordekaiser', isCarry: false, starLevel: 2 },
        ],
        coreTraits: ['Anima', 'Divine Duelist', 'Marauder'],
        description: 'Fiora carries with Anima frontline support. High variance — needs a Fiora 2-star and Anima 5 for the spike.',
        earlyGame: 'Briar + Jinx + Aurora opener. Slam early items on Fiora holder.',
        midGame: 'Stabilize at Lv7 by 4-1 — hold Fiora pairs and lock in the Anima frontline.',
        lateGame: 'Push Lv8 on 4-2 and slow roll for Fiora 2 and Anima 5 — the spike that wins games.',
        tips: 'Fiora needs IE + sustain. Akali + Bel\'Veth give the Marauder backline.',
        recommendedAugments: ['TFT13_Augment_ConquerorCrown', 'TFT13_Augment_PitFighterCrown', 'TFT6_Augment_Ascension']
    },
];
const getCompsByTier = (tier) => exports.metaComps.filter(c => c.tier === tier);
exports.getCompsByTier = getCompsByTier;


/***/ }),

/***/ "./src/services/AuthService.ts":
/*!*************************************!*\
  !*** ./src/services/AuthService.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.adminFetch = exports.refreshMe = exports.logout = exports.login = exports.register = exports.clearSession = exports.onChange = exports.hasAtLeast = exports.isAdmin = exports.isAuthenticated = exports.getStoredUser = exports.getToken = void 0;
const consts_1 = __webpack_require__(/*! ../consts */ "./src/consts.ts");
const STORAGE_TOKEN = 'pivottft_auth_token';
const STORAGE_USER = 'pivottft_auth_user';
const listeners = new Set();
function emit() {
    const user = getStoredUser();
    listeners.forEach(l => {
        try {
            l(user);
        }
        catch (e) {
            console.error('[AuthService] listener threw:', e);
        }
    });
}
function getToken() {
    try {
        return localStorage.getItem(STORAGE_TOKEN);
    }
    catch (_a) {
        return null;
    }
}
exports.getToken = getToken;
function getStoredUser() {
    try {
        const raw = localStorage.getItem(STORAGE_USER);
        return raw ? JSON.parse(raw) : null;
    }
    catch (_a) {
        return null;
    }
}
exports.getStoredUser = getStoredUser;
function isAuthenticated() {
    return !!getToken() && !!getStoredUser();
}
exports.isAuthenticated = isAuthenticated;
function isAdmin() {
    const u = getStoredUser();
    return !!u && u.role === 'admin';
}
exports.isAdmin = isAdmin;
function hasAtLeast(role) {
    const u = getStoredUser();
    if (!u)
        return false;
    const rank = { user: 1, moderator: 2, admin: 3 };
    return rank[u.role] >= rank[role];
}
exports.hasAtLeast = hasAtLeast;
function onChange(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}
exports.onChange = onChange;
function setSession(res) {
    try {
        localStorage.setItem(STORAGE_TOKEN, res.token);
        localStorage.setItem(STORAGE_USER, JSON.stringify(res.user));
    }
    catch (_a) { }
    emit();
}
function clearSession() {
    try {
        localStorage.removeItem(STORAGE_TOKEN);
        localStorage.removeItem(STORAGE_USER);
    }
    catch (_a) { }
    emit();
}
exports.clearSession = clearSession;
async function postJson(path, body) {
    const url = `${consts_1.kRiotApiBaseUrl}${path}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    let payload;
    try {
        payload = await res.json();
    }
    catch (_a) {
        payload = { error: res.statusText };
    }
    if (!res.ok) {
        throw new Error((payload === null || payload === void 0 ? void 0 : payload.error) || `HTTP ${res.status}`);
    }
    return payload;
}
async function getJson(path, token) {
    const url = `${consts_1.kRiotApiBaseUrl}${path}`;
    const headers = {};
    if (token)
        headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, { headers });
    let payload;
    try {
        payload = await res.json();
    }
    catch (_a) {
        payload = { error: res.statusText };
    }
    if (!res.ok)
        throw new Error((payload === null || payload === void 0 ? void 0 : payload.error) || `HTTP ${res.status}`);
    return payload;
}
async function register(email, password, displayName) {
    const res = await postJson('/auth/register', { email, password, displayName });
    setSession(res);
    return res.user;
}
exports.register = register;
async function login(email, password) {
    const res = await postJson('/auth/login', { email, password });
    setSession(res);
    return res.user;
}
exports.login = login;
function logout() {
    clearSession();
}
exports.logout = logout;
async function refreshMe() {
    const token = getToken();
    if (!token)
        return null;
    try {
        const res = await getJson('/auth/me', token);
        try {
            localStorage.setItem(STORAGE_USER, JSON.stringify(res.user));
        }
        catch (_a) { }
        emit();
        return res.user;
    }
    catch (e) {
        if ((e.message || '').includes('HTTP 401'))
            clearSession();
        return null;
    }
}
exports.refreshMe = refreshMe;
async function adminFetch(path, init = {}) {
    const token = getToken();
    if (!token)
        throw new Error('Not authenticated');
    const url = `${consts_1.kRiotApiBaseUrl}${path}`;
    const res = await fetch(url, Object.assign(Object.assign({}, init), { headers: Object.assign(Object.assign(Object.assign({}, (init.headers || {})), { 'Authorization': `Bearer ${token}` }), (init.body ? { 'Content-Type': 'application/json' } : {})) }));
    let payload;
    try {
        payload = await res.json();
    }
    catch (_a) {
        payload = { error: res.statusText };
    }
    if (!res.ok) {
        if (res.status === 401)
            clearSession();
        throw new Error((payload === null || payload === void 0 ? void 0 : payload.error) || `HTTP ${res.status}`);
    }
    return payload;
}
exports.adminFetch = adminFetch;


/***/ }),

/***/ "./src/services/CompsService.ts":
/*!**************************************!*\
  !*** ./src/services/CompsService.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.invalidateCache = exports.adminDeleteComp = exports.adminUpdateComp = exports.adminCreateComp = exports.refreshCompsInBackground = exports.getCompsSync = exports.getComps = void 0;
const comps_1 = __webpack_require__(/*! ../data/set17/comps */ "./src/data/set17/comps.ts");
const consts_1 = __webpack_require__(/*! ../consts */ "./src/consts.ts");
const AuthService_1 = __webpack_require__(/*! ./AuthService */ "./src/services/AuthService.ts");
const CACHE_KEY = 'pivottft_comps_cache_v1';
const CACHE_TTL_MS = 30 * 60 * 1000;
function readCache() {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        return raw ? JSON.parse(raw) : null;
    }
    catch (_a) {
        return null;
    }
}
function writeCache(comps) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), comps }));
    }
    catch (_a) { }
}
async function getComps() {
    const cached = readCache();
    const now = Date.now();
    const isFresh = cached && (now - cached.fetchedAt) < CACHE_TTL_MS;
    if (isFresh)
        return cached.comps;
    try {
        const res = await fetch(`${consts_1.kRiotApiBaseUrl}/comps`);
        if (res.ok) {
            const body = await res.json();
            if (Array.isArray(body.comps) && body.comps.length > 0) {
                writeCache(body.comps);
                return body.comps;
            }
        }
    }
    catch (_a) { }
    if (cached)
        return cached.comps;
    return comps_1.metaComps;
}
exports.getComps = getComps;
function getCompsSync() {
    const cached = readCache();
    if (cached && cached.comps.length > 0)
        return cached.comps;
    return comps_1.metaComps;
}
exports.getCompsSync = getCompsSync;
function refreshCompsInBackground() {
    return getComps();
}
exports.refreshCompsInBackground = refreshCompsInBackground;
async function adminCreateComp(comp) {
    await AuthService_1.adminFetch('/admin/comps', {
        method: 'POST',
        body: JSON.stringify({
            id: comp.id,
            name: comp.name,
            tier: comp.tier,
            playstyle: comp.playstyle,
            setNumber: 17,
            data: comp,
            isPublished: true,
        }),
    });
    invalidateCache();
}
exports.adminCreateComp = adminCreateComp;
async function adminUpdateComp(id, comp) {
    await AuthService_1.adminFetch(`/admin/comps/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: comp.name,
            tier: comp.tier,
            playstyle: comp.playstyle,
            data: comp,
        }),
    });
    invalidateCache();
}
exports.adminUpdateComp = adminUpdateComp;
async function adminDeleteComp(id) {
    await AuthService_1.adminFetch(`/admin/comps/${encodeURIComponent(id)}`, { method: 'DELETE' });
    invalidateCache();
}
exports.adminDeleteComp = adminDeleteComp;
function invalidateCache() {
    try {
        localStorage.removeItem(CACHE_KEY);
    }
    catch (_a) { }
}
exports.invalidateCache = invalidateCache;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!****************************!*\
  !*** ./src/admin/admin.ts ***!
  \****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const AuthService_1 = __webpack_require__(/*! ../services/AuthService */ "./src/services/AuthService.ts");
const CompsService_1 = __webpack_require__(/*! ../services/CompsService */ "./src/services/CompsService.ts");
let comps = [];
let selectedId = null;
let isNewMode = false;
let guides = [];
let selectedSlug = null;
let isNewGuideMode = false;
let activeSection = 'comps';
function $(id) {
    return document.getElementById(id);
}
function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function closeWindow() {
    overwolf.windows.getCurrentWindow(res => {
        var _a;
        if ((res === null || res === void 0 ? void 0 : res.success) && ((_a = res.window) === null || _a === void 0 ? void 0 : _a.id))
            overwolf.windows.close(res.window.id);
    });
}
function renderHeader() {
    const user = AuthService_1.getStoredUser();
    const span = $('admin-current-user');
    if (!span)
        return;
    if (user) {
        span.innerHTML = `${escapeHtml(user.email)} <em style="opacity:0.6;">(${user.role})</em>`;
    }
    else {
        span.textContent = 'not signed in';
    }
}
function renderList(filter = '') {
    const list = $('admin-comps-list');
    if (!list)
        return;
    const f = filter.toLowerCase().trim();
    const filtered = f
        ? comps.filter(c => c.name.toLowerCase().includes(f) || c.id.toLowerCase().includes(f))
        : comps;
    if (filtered.length === 0) {
        list.innerHTML = '<div class="admin-empty">No comps.</div>';
        return;
    }
    list.innerHTML = filtered.map(c => `
    <button class="admin-comp-row ${c.id === selectedId ? 'selected' : ''}" data-comp-id="${escapeHtml(c.id)}">
      <span class="admin-comp-tier tier-${c.tier.toLowerCase()}">${escapeHtml(c.tier)}</span>
      <span class="admin-comp-name">${escapeHtml(c.name)}</span>
      <span class="admin-comp-id">${escapeHtml(c.id)}</span>
    </button>
  `).join('');
}
function clearEditor() {
    $('admin-editor-empty').style.display = 'block';
    $('admin-editor-form').style.display = 'none';
    setStatus('');
}
function showEditor(comp) {
    var _a;
    $('admin-editor-empty').style.display = 'none';
    $('admin-editor-form').style.display = 'flex';
    isNewMode = comp === null;
    const title = $('admin-editor-title');
    if (title)
        title.textContent = isNewMode ? 'New comp' : 'Edit comp';
    const idInput = $('field-id');
    if (idInput) {
        idInput.value = (comp === null || comp === void 0 ? void 0 : comp.id) || '';
        idInput.disabled = !isNewMode;
    }
    ($('field-name')).value = (comp === null || comp === void 0 ? void 0 : comp.name) || '';
    ($('field-tier')).value = (comp === null || comp === void 0 ? void 0 : comp.tier) || 'B';
    ($('field-playstyle')).value = (comp === null || comp === void 0 ? void 0 : comp.playstyle) || 'Standard';
    ($('field-difficulty')).value = (comp === null || comp === void 0 ? void 0 : comp.difficulty) || 'Medium';
    ($('field-level')).value = String((_a = comp === null || comp === void 0 ? void 0 : comp.level) !== null && _a !== void 0 ? _a : 8);
    ($('field-description')).value = (comp === null || comp === void 0 ? void 0 : comp.description) || '';
    ($('field-core-traits')).value = ((comp === null || comp === void 0 ? void 0 : comp.coreTraits) || []).join(', ');
    ($('field-augments')).value = ((comp === null || comp === void 0 ? void 0 : comp.recommendedAugments) || []).join(', ');
    ($('field-alt-comps')).value = ((comp === null || comp === void 0 ? void 0 : comp.alternativeCompIds) || []).join(', ');
    ($('field-tags')).value = ((comp === null || comp === void 0 ? void 0 : comp.tags) || []).join(', ');
    ($('field-units')).value = JSON.stringify((comp === null || comp === void 0 ? void 0 : comp.units) || [], null, 2);
    ($('field-early')).value = (comp === null || comp === void 0 ? void 0 : comp.earlyGame) || '';
    ($('field-mid')).value = (comp === null || comp === void 0 ? void 0 : comp.midGame) || '';
    ($('field-late')).value = (comp === null || comp === void 0 ? void 0 : comp.lateGame) || '';
    ($('field-tips')).value = (comp === null || comp === void 0 ? void 0 : comp.tips) || '';
    const del = $('admin-delete');
    if (del)
        del.style.display = isNewMode ? 'none' : 'inline-block';
    setStatus('');
}
function setStatus(msg, kind = '') {
    const el = $('admin-editor-status');
    if (!el)
        return;
    el.textContent = msg;
    el.className = `admin-editor-status ${kind}`;
}
function collectEditorComp() {
    const id = ($('field-id')).value.trim();
    const name = ($('field-name')).value.trim();
    if (!id || !name) {
        setStatus('ID and Name are required.', 'err');
        return null;
    }
    if (!/^[a-z0-9\-_]+$/i.test(id)) {
        setStatus('ID must contain only letters, digits, dashes, underscores.', 'err');
        return null;
    }
    let units = [];
    try {
        units = JSON.parse(($('field-units')).value || '[]');
        if (!Array.isArray(units))
            throw new Error('units must be a JSON array');
    }
    catch (e) {
        setStatus(`Units JSON invalid: ${e.message}`, 'err');
        return null;
    }
    const splitCsv = (s) => s.split(',').map(x => x.trim()).filter(Boolean);
    return {
        id,
        name,
        tier: ($('field-tier')).value,
        playstyle: ($('field-playstyle')).value,
        difficulty: ($('field-difficulty')).value,
        level: parseInt(($('field-level')).value, 10) || 8,
        description: ($('field-description')).value,
        coreTraits: splitCsv(($('field-core-traits')).value),
        recommendedAugments: splitCsv(($('field-augments')).value),
        alternativeCompIds: splitCsv(($('field-alt-comps')).value),
        tags: splitCsv(($('field-tags')).value),
        units,
        earlyGame: ($('field-early')).value || undefined,
        midGame: ($('field-mid')).value || undefined,
        lateGame: ($('field-late')).value || undefined,
        tips: ($('field-tips')).value || undefined,
    };
}
async function handleSave(e) {
    var _a;
    e.preventDefault();
    const comp = collectEditorComp();
    if (!comp)
        return;
    setStatus('Saving…');
    try {
        if (isNewMode) {
            await CompsService_1.adminCreateComp(comp);
        }
        else {
            await CompsService_1.adminUpdateComp(comp.id, comp);
        }
        setStatus('Saved ✓', 'ok');
        await refreshComps();
        selectedId = comp.id;
        showEditor(comps.find(c => c.id === comp.id) || comp);
        renderList(((_a = $('admin-comp-filter')) === null || _a === void 0 ? void 0 : _a.value) || '');
    }
    catch (err) {
        setStatus(`Failed: ${err.message || err}`, 'err');
    }
}
async function handleDelete() {
    var _a;
    if (!selectedId)
        return;
    if (!confirm(`Delete comp "${selectedId}" permanently? This affects all PivotTFT users.`))
        return;
    setStatus('Deleting…');
    try {
        await CompsService_1.adminDeleteComp(selectedId);
        setStatus('');
        selectedId = null;
        await refreshComps();
        clearEditor();
        renderList(((_a = $('admin-comp-filter')) === null || _a === void 0 ? void 0 : _a.value) || '');
    }
    catch (err) {
        setStatus(`Delete failed: ${err.message || err}`, 'err');
    }
}
async function refreshComps() {
    try {
        comps = await CompsService_1.getComps();
    }
    catch (e) {
        console.error('[Admin] Failed to fetch comps', e);
        comps = [];
    }
}
async function boot() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    renderHeader();
    if (!AuthService_1.hasAtLeast('moderator')) {
        $('admin-main').style.display = 'none';
        $('admin-forbidden').style.display = 'flex';
        return;
    }
    await refreshComps();
    renderList();
    clearEditor();
    (_a = $('admin-close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', closeWindow);
    (_b = $('admin-forbidden-close')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', closeWindow);
    (_c = $('admin-logout')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => { AuthService_1.logout(); closeWindow(); });
    (_d = $('admin-comp-filter')) === null || _d === void 0 ? void 0 : _d.addEventListener('input', (e) => {
        renderList(e.target.value);
    });
    (_e = $('admin-comps-list')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', (e) => {
        var _a;
        const row = e.target.closest('.admin-comp-row');
        if (!row)
            return;
        const id = row.getAttribute('data-comp-id');
        if (!id)
            return;
        selectedId = id;
        const comp = comps.find(c => c.id === id);
        if (comp)
            showEditor(comp);
        renderList(((_a = $('admin-comp-filter')) === null || _a === void 0 ? void 0 : _a.value) || '');
    });
    (_f = $('admin-new-comp')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => {
        selectedId = null;
        showEditor(null);
    });
    (_g = $('admin-editor-form')) === null || _g === void 0 ? void 0 : _g.addEventListener('submit', handleSave);
    (_h = $('admin-delete')) === null || _h === void 0 ? void 0 : _h.addEventListener('click', handleDelete);
    setupSectionToggle();
    wireGuidesUI();
    await refreshGuides();
    renderGuidesList();
    wireStatsUI();
}
function setupSectionToggle() {
    const compsBtn = $('admin-section-comps');
    const guidesBtn = $('admin-section-guides');
    const statsBtn = $('admin-section-stats');
    const compsPanel = $('admin-section-comps-panel');
    const guidesPanel = $('admin-section-guides-panel');
    const statsPanel = $('admin-section-stats-panel');
    const compsEditor = $('admin-editor-empty');
    const compsForm = $('admin-editor-form');
    const guideEmpty = $('admin-guide-editor-empty');
    const guideForm = $('admin-guide-form');
    const statsMain = $('admin-stats-panel');
    const apply = (section) => {
        activeSection = section;
        compsBtn === null || compsBtn === void 0 ? void 0 : compsBtn.classList.toggle('active', section === 'comps');
        guidesBtn === null || guidesBtn === void 0 ? void 0 : guidesBtn.classList.toggle('active', section === 'guides');
        statsBtn === null || statsBtn === void 0 ? void 0 : statsBtn.classList.toggle('active', section === 'stats');
        if (compsPanel)
            compsPanel.style.display = section === 'comps' ? 'block' : 'none';
        if (guidesPanel)
            guidesPanel.style.display = section === 'guides' ? 'block' : 'none';
        if (statsPanel)
            statsPanel.style.display = section === 'stats' ? 'block' : 'none';
        if (compsEditor)
            compsEditor.style.display = 'none';
        if (compsForm)
            compsForm.style.display = 'none';
        if (guideEmpty)
            guideEmpty.style.display = 'none';
        if (guideForm)
            guideForm.style.display = 'none';
        if (statsMain)
            statsMain.style.display = 'none';
        if (section === 'comps') {
            const showingForm = selectedId !== null || isNewMode;
            if (compsEditor)
                compsEditor.style.display = showingForm ? 'none' : 'block';
            if (compsForm)
                compsForm.style.display = showingForm ? 'flex' : 'none';
        }
        else if (section === 'guides') {
            const showingForm = selectedSlug !== null || isNewGuideMode;
            if (guideEmpty)
                guideEmpty.style.display = showingForm ? 'none' : 'block';
            if (guideForm)
                guideForm.style.display = showingForm ? 'flex' : 'none';
        }
        else {
            if (statsMain)
                statsMain.style.display = 'block';
            refreshStatsHealth().catch(() => { });
        }
    };
    compsBtn === null || compsBtn === void 0 ? void 0 : compsBtn.addEventListener('click', () => apply('comps'));
    guidesBtn === null || guidesBtn === void 0 ? void 0 : guidesBtn.addEventListener('click', () => apply('guides'));
    statsBtn === null || statsBtn === void 0 ? void 0 : statsBtn.addEventListener('click', () => apply('stats'));
    apply('comps');
}
async function refreshGuides() {
    try {
        const res = await AuthService_1.adminFetch('/guides');
        guides = res.guides || [];
    }
    catch (e) {
        console.error('[Admin] failed to load guides', e);
        guides = [];
    }
}
function renderGuidesList(filter = '') {
    const list = $('admin-guides-list');
    if (!list)
        return;
    const f = filter.toLowerCase().trim();
    const filtered = f
        ? guides.filter(g => g.title.toLowerCase().includes(f) || g.slug.toLowerCase().includes(f))
        : guides;
    if (filtered.length === 0) {
        list.innerHTML = '<div class="admin-empty">No guides.</div>';
        return;
    }
    list.innerHTML = filtered.map(g => `
    <button class="admin-comp-row ${g.slug === selectedSlug ? 'selected' : ''}" data-guide-slug="${escapeHtml(g.slug)}">
      <span class="admin-comp-tier" style="background:#475569;color:#fff;">📖</span>
      <span class="admin-comp-name">${escapeHtml(g.title)}</span>
      <span class="admin-comp-id">${escapeHtml(g.slug)}</span>
    </button>
  `).join('');
}
function clearGuideEditor() {
    const empty = $('admin-guide-editor-empty');
    const form = $('admin-guide-form');
    if (empty)
        empty.style.display = 'block';
    if (form)
        form.style.display = 'none';
    setGuideStatus('');
}
function showGuideEditor(guide) {
    const empty = $('admin-guide-editor-empty');
    const form = $('admin-guide-form');
    if (empty)
        empty.style.display = 'none';
    if (form)
        form.style.display = 'flex';
    isNewGuideMode = guide === null;
    const title = $('admin-guide-title');
    if (title)
        title.textContent = isNewGuideMode ? 'New guide' : 'Edit guide';
    const slugInput = $('guide-slug');
    if (slugInput) {
        slugInput.value = (guide === null || guide === void 0 ? void 0 : guide.slug) || '';
        slugInput.disabled = !isNewGuideMode;
    }
    ($('guide-title-field')).value = (guide === null || guide === void 0 ? void 0 : guide.title) || '';
    ($('guide-summary')).value = (guide === null || guide === void 0 ? void 0 : guide.summary) || '';
    ($('guide-tags')).value = ((guide === null || guide === void 0 ? void 0 : guide.tags) || []).join(', ');
    ($('guide-published')).checked = (guide === null || guide === void 0 ? void 0 : guide.isPublished) !== false;
    ($('guide-body-md')).value = (guide === null || guide === void 0 ? void 0 : guide.bodyMd) || '';
    const del = $('admin-guide-delete');
    if (del)
        del.style.display = isNewGuideMode ? 'none' : 'inline-block';
    updateGuidePreview();
    setGuideStatus('');
}
function setGuideStatus(msg, kind = '') {
    const el = $('admin-guide-status');
    if (!el)
        return;
    el.textContent = msg;
    el.className = `admin-editor-status ${kind}`;
}
function wireGuidesUI() {
    var _a, _b, _c, _d, _e, _f;
    (_a = $('admin-guide-filter')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', (e) => {
        renderGuidesList(e.target.value);
    });
    (_b = $('admin-guides-list')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', async (e) => {
        var _a;
        const row = e.target.closest('[data-guide-slug]');
        if (!row)
            return;
        const slug = row.getAttribute('data-guide-slug');
        if (!slug)
            return;
        selectedSlug = slug;
        setGuideStatus('Loading…');
        try {
            const res = await AuthService_1.adminFetch(`/guides/${encodeURIComponent(slug)}`);
            showGuideEditor(res);
            renderGuidesList(((_a = $('admin-guide-filter')) === null || _a === void 0 ? void 0 : _a.value) || '');
        }
        catch (err) {
            setGuideStatus(`Could not load: ${err.message || err}`, 'err');
        }
    });
    (_c = $('admin-new-guide')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        selectedSlug = null;
        showGuideEditor(null);
    });
    let previewTimer = null;
    (_d = $('guide-body-md')) === null || _d === void 0 ? void 0 : _d.addEventListener('input', () => {
        if (previewTimer)
            window.clearTimeout(previewTimer);
        previewTimer = window.setTimeout(updateGuidePreview, 150);
    });
    (_e = $('admin-guide-form')) === null || _e === void 0 ? void 0 : _e.addEventListener('submit', handleGuideSave);
    (_f = $('admin-guide-delete')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', handleGuideDelete);
}
function updateGuidePreview() {
    const ta = $('guide-body-md');
    const out = $('guide-preview');
    if (!ta || !out)
        return;
    out.innerHTML = renderMarkdownInline(ta.value);
}
function collectGuideBody() {
    const slug = ($('guide-slug')).value.trim().toLowerCase();
    const title = ($('guide-title-field')).value.trim();
    const bodyMd = ($('guide-body-md')).value;
    if (!slug || !/^[a-z0-9\-]+$/.test(slug)) {
        setGuideStatus('Slug must be lowercase letters, digits, dashes only.', 'err');
        return null;
    }
    if (!title) {
        setGuideStatus('Title is required.', 'err');
        return null;
    }
    if (!bodyMd.trim()) {
        setGuideStatus('Body cannot be empty.', 'err');
        return null;
    }
    return {
        slug, title, bodyMd,
        summary: ($('guide-summary')).value.trim(),
        tags: ($('guide-tags')).value.trim(),
        isPublished: ($('guide-published')).checked,
    };
}
async function handleGuideSave(e) {
    var _a;
    e.preventDefault();
    const body = collectGuideBody();
    if (!body)
        return;
    setGuideStatus('Saving…');
    try {
        if (isNewGuideMode) {
            await AuthService_1.adminFetch('/admin/guides', {
                method: 'POST',
                body: JSON.stringify({
                    slug: body.slug, title: body.title, summary: body.summary,
                    bodyMd: body.bodyMd, tags: body.tags, isPublished: body.isPublished,
                }),
            });
        }
        else {
            await AuthService_1.adminFetch(`/admin/guides/${encodeURIComponent(body.slug)}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: body.title, summary: body.summary,
                    bodyMd: body.bodyMd, tags: body.tags, isPublished: body.isPublished,
                }),
            });
        }
        setGuideStatus('Saved ✓', 'ok');
        isNewGuideMode = false;
        selectedSlug = body.slug;
        await refreshGuides();
        renderGuidesList(((_a = $('admin-guide-filter')) === null || _a === void 0 ? void 0 : _a.value) || '');
    }
    catch (err) {
        setGuideStatus(`Failed: ${err.message || err}`, 'err');
    }
}
async function handleGuideDelete() {
    var _a;
    if (!selectedSlug)
        return;
    if (!confirm(`Delete guide "${selectedSlug}" permanently?`))
        return;
    setGuideStatus('Deleting…');
    try {
        await AuthService_1.adminFetch(`/admin/guides/${encodeURIComponent(selectedSlug)}`, { method: 'DELETE' });
        selectedSlug = null;
        await refreshGuides();
        renderGuidesList(((_a = $('admin-guide-filter')) === null || _a === void 0 ? void 0 : _a.value) || '');
        clearGuideEditor();
    }
    catch (err) {
        setGuideStatus(`Delete failed: ${err.message || err}`, 'err');
    }
}
function renderMarkdownInline(md) {
    const e = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const lines = e(md).split('\n');
    const out = [];
    let inList = false;
    let para = [];
    const flushP = () => { if (para.length) {
        out.push(`<p>${inline(para.join(' '))}</p>`);
        para = [];
    } };
    const closeUl = () => { if (inList) {
        out.push('</ul>');
        inList = false;
    } };
    for (const ln of lines) {
        const t = ln.trim();
        if (!t) {
            flushP();
            closeUl();
            continue;
        }
        const h = t.match(/^(#{1,4})\s+(.+)$/);
        if (h) {
            flushP();
            closeUl();
            out.push(`<h${h[1].length + 1}>${inline(h[2])}</h${h[1].length + 1}>`);
            continue;
        }
        if (/^[-*]\s+/.test(t)) {
            flushP();
            if (!inList) {
                out.push('<ul>');
                inList = true;
            }
            out.push(`<li>${inline(t.replace(/^[-*]\s+/, ''))}</li>`);
            continue;
        }
        closeUl();
        para.push(t);
    }
    flushP();
    closeUl();
    return out.join('\n');
}
function inline(s) {
    return s
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_m, text, url) => `<a href="${url}" target="_blank" rel="noopener">${text}</a>`);
}
function wireStatsUI() {
    var _a, _b;
    (_a = $('admin-stats-run')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', handleStatsRun);
    (_b = $('admin-stats-refresh')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        refreshStatsHealth().catch(() => { });
    });
}
function setStatsStatus(msg, kind = '') {
    const el = $('admin-stats-status');
    if (!el)
        return;
    el.textContent = msg;
    el.className = `admin-editor-status ${kind}`;
}
async function refreshStatsHealth() {
    const summary = $('admin-stats-summary');
    if (summary)
        summary.textContent = 'Loading…';
    try {
        const res = await AuthService_1.adminFetch('/admin/stats/health');
        renderStatsHealth(res.health);
        setStatsStatus('');
    }
    catch (err) {
        if (summary)
            summary.textContent = '';
        setStatsStatus(`Failed to load: ${err.message || err}`, 'err');
    }
}
async function handleStatsRun() {
    const btn = $('admin-stats-run');
    if (btn)
        btn.disabled = true;
    setStatsStatus('Running cron tick…');
    try {
        const res = await AuthService_1.adminFetch('/admin/stats/run', { method: 'POST' });
        const r = res.result || {};
        setStatsStatus(`Done: cohort #${r.cohortIdx} ${r.region}/${r.tier} — processed ${r.processed} (${r.skipped} skipped, ${r.errors} errors, ${r.durationMs}ms)`, r.errors > 0 ? 'err' : 'ok');
        await refreshStatsHealth();
    }
    catch (err) {
        setStatsStatus(`Run failed: ${err.message || err}`, 'err');
    }
    finally {
        if (btn)
            btn.disabled = false;
    }
}
function relativeTime(unix) {
    if (!unix)
        return 'never';
    const delta = Math.floor(Date.now() / 1000) - unix;
    if (delta < 0)
        return 'just now';
    if (delta < 60)
        return `${delta}s ago`;
    if (delta < 3600)
        return `${Math.floor(delta / 60)}m ago`;
    if (delta < 86400)
        return `${Math.floor(delta / 3600)}h ago`;
    return `${Math.floor(delta / 86400)}d ago`;
}
function renderStatsHealth(h) {
    const summary = $('admin-stats-summary');
    if (summary) {
        summary.innerHTML = `
      <div class="admin-stat-tile"><div class="admin-stat-label">Matches processed</div><div class="admin-stat-value">${h.totals.processedMatches.toLocaleString()}</div></div>
      <div class="admin-stat-tile"><div class="admin-stat-label">Ladder cached</div><div class="admin-stat-value">${h.totals.ladderEntries.toLocaleString()}</div></div>
      <div class="admin-stat-tile"><div class="admin-stat-label">Augment rows</div><div class="admin-stat-value">${h.totals.augmentRows.toLocaleString()}</div></div>
      <div class="admin-stat-tile"><div class="admin-stat-label">Comp rows</div><div class="admin-stat-value">${h.totals.compRows.toLocaleString()}</div></div>
      <div class="admin-stat-tile"><div class="admin-stat-label">Unit rows</div><div class="admin-stat-value">${h.totals.unitRows.toLocaleString()}</div></div>
      <div class="admin-stat-tile"><div class="admin-stat-label">Item rows</div><div class="admin-stat-value">${h.totals.itemRows.toLocaleString()}</div></div>
      <div class="admin-stat-tile"><div class="admin-stat-label">Cohorts</div><div class="admin-stat-value">${h.cohortCount}</div></div>
      <div class="admin-stat-tile"><div class="admin-stat-label">Next cohort</div><div class="admin-stat-value" style="font-size:14px;">${escapeHtml(h.nextCohort.region)} / ${escapeHtml(h.nextCohort.tier)}</div></div>
    `;
    }
    const cohorts = $('admin-stats-cohorts');
    if (cohorts) {
        const rows = h.cohorts.map(c => {
            const stale = !c.lastRunAt || (Math.floor(Date.now() / 1000) - c.lastRunAt) > 6 * 3600;
            return `<tr class="${stale ? 'stale' : ''}">
        <td>${escapeHtml(c.region)}</td>
        <td>${escapeHtml(c.tier)}</td>
        <td>${escapeHtml(c.rankBucket)}</td>
        <td>${escapeHtml(c.patch)}</td>
        <td>${relativeTime(c.lastRunAt)}</td>
        <td>${c.lastProcessed}</td>
        <td>${c.lastErrors > 0 ? `<span class="bad">${c.lastErrors}</span>` : '0'}</td>
      </tr>`;
        }).join('');
        cohorts.innerHTML = `
      <h3>Cohort rotation (${h.cohorts.length})</h3>
      <table class="admin-stats-table">
        <thead><tr><th>Region</th><th>Tier</th><th>Bucket</th><th>Patch</th><th>Last run</th><th>Processed</th><th>Errors</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    }
    const slices = $('admin-stats-slices');
    if (slices) {
        if (h.slices.length === 0) {
            slices.innerHTML = '<h3>Slice totals</h3><p class="admin-help">No slices yet — first cron tick has not landed.</p>';
        }
        else {
            const rows = h.slices.map(s => `
        <tr>
          <td>${escapeHtml(s.patch)}</td>
          <td>${escapeHtml(s.region)}</td>
          <td>${escapeHtml(s.rank_bucket)}</td>
          <td>${s.total_games.toLocaleString()}</td>
          <td>${relativeTime(s.updated_at)}</td>
        </tr>
      `).join('');
            slices.innerHTML = `
        <h3>Top slices by participant count</h3>
        <table class="admin-stats-table">
          <thead><tr><th>Patch</th><th>Region</th><th>Bucket</th><th>Participants</th><th>Updated</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      `;
        }
    }
    const last = $('admin-stats-lastrun');
    if (last) {
        if (!h.lastRun) {
            last.innerHTML = '<p class="admin-help">No cron ticks recorded yet.</p>';
        }
        else {
            const r = h.lastRun;
            last.innerHTML = `<p class="admin-help">Last tick: <strong>${escapeHtml(r.region)}/${escapeHtml(r.tier)}</strong> (cohort #${r.cohortIdx}) — ${r.processed} processed, ${r.errors} errors, ${relativeTime(r.at)}.</p>`;
        }
    }
}
window.addEventListener('DOMContentLoaded', boot);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLFNBQVMsT0FBTyxDQUFDLENBQUMsU0FBUyxlQUFlLENBQUMsQ0FBQyxNQUFNLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQ3hOO0tBQ0Y7QUFDSCxDQUFDO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvY29uc3RzLnRzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL2RhdGEvc2V0MTcvY29tcHMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvc2VydmljZXMvQXV0aFNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvc2VydmljZXMvQ29tcHNTZXJ2aWNlLnRzIiwid2VicGFjazovL3Bpdm90dGZ0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL2FkbWluL2FkbWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFBpdm90VEZUIOKAlCBURlQgR2FtZSBFdmVudHMgRmVhdHVyZXNcclxuLy8gR2FtZSBJRCA1NDI2ID0gTGVhZ3VlIG9mIExlZ2VuZHMgY2xpZW50ICh3aGljaCBURlQgcnVucyBpbnNpZGUpXHJcbi8vIFRGVC1zcGVjaWZpYyBldmVudHMgdXNlIGludGVybmFsIEdhbWUgSUQgMjE1NzAsIGJ1dCB3ZSByZWdpc3RlciB3aXRoIDU0MjZcclxuZXhwb3J0IGNvbnN0IGtHYW1lc0ZlYXR1cmVzID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZ1tdPihbXHJcbiAgW1xyXG4gICAgNTQyNixcclxuICAgIFtcclxuICAgICAgJ21hdGNoX2luZm8nLFxyXG4gICAgICAnYm9hcmQnLFxyXG4gICAgICAnYmVuY2gnLFxyXG4gICAgICAnc3RvcmUnLFxyXG4gICAgICAnY2Fyb3VzZWwnLFxyXG4gICAgICAnZ2FtZV9pbmZvJyxcclxuICAgICAgJ2F1Z21lbnRzJyxcclxuICAgICAgJ2xpdmVfY2xpZW50X2RhdGEnXHJcbiAgICBdXHJcbiAgXSxcclxuXSk7XHJcblxyXG5leHBvcnQgY29uc3Qga0dhbWVDbGFzc0lkcyA9IEFycmF5LmZyb20oa0dhbWVzRmVhdHVyZXMua2V5cygpKTtcclxuXHJcbmV4cG9ydCBjb25zdCBrV2luZG93TmFtZXMgPSB7XHJcbiAgaW5HYW1lOiAnaW5fZ2FtZScsXHJcbiAgZGVza3RvcDogJ2Rlc2t0b3AnLFxyXG4gIHNldHRpbmdzOiAnc2V0dGluZ3MnLFxyXG4gIGluZ2FtZUNvbnRyb2xsZXI6ICdpbmdhbWVfY29udHJvbGxlcicsXHJcbiAgbWF0Y2h1cHM6ICdtYXRjaHVwcycsXHJcbiAgbG9naW46ICdsb2dpbicsXHJcbiAgYWRtaW46ICdhZG1pbicsXHJcbiAgaGVhZGxpbmVyOiAnaGVhZGxpbmVyJyxcclxuICByZXBsYXk6ICdyZXBsYXknLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGtIb3RrZXlzID0ge1xyXG4gIHRvZ2dsZTogJ3Bpdm90dGZ0X3Nob3doaWRlJ1xyXG59O1xyXG5cclxuLy8gVEZUIEdhbWUgSUQgZm9yIGV2ZW50IHJlZ2lzdHJhdGlvblxyXG5leHBvcnQgY29uc3Qga1RGVENsYXNzSWQgPSA1NDI2O1xyXG5cclxuLy8gUmlvdCBBUEkgQ29uZmlndXJhdGlvblxyXG5leHBvcnQgY29uc3Qga1Jpb3RBcGlDb25maWcgPSB7XHJcbiAgYXBpS2V5OiAnJyxcclxuICByZWdpb246ICdldXJvcGUnIGFzIGNvbnN0LCAgICAgICAvLyBhbWVyaWNhcyB8IGV1cm9wZSB8IGFzaWEgKGFjY291bnQtdjEsIG1hdGNoLXYxKVxyXG4gIHBsYXRmb3JtOiAnZXVuMScsICAgICAgICAgICAgICAgIC8vIGV1dzEsIGV1bjEsIG5hMSwga3IsIC4uLiAoc3VtbW9uZXIvbGVhZ3VlKVxyXG59O1xyXG5cclxuLy8gQmFja2VuZCBiYXNlIFVSTC4gSW4gcHJvZHVjdGlvbiByb3V0ZXMgdGhyb3VnaCBDbG91ZGZsYXJlIFdvcmtlciBhdFxyXG4vLyBhcGkucGl2b3R0ZnQuY29tIChSaW90IEFQSSBwcm94eSArIGF1dGggKyBjb21wcyBiYWNrZW5kKS4gT3ZlcnJpZGUgdG9cclxuLy8gaHR0cDovLzEyNy4wLjAuMTo4Nzg3IGR1cmluZyBsb2NhbCBgd3JhbmdsZXIgZGV2YCBkZXZlbG9wbWVudC5cclxuZXhwb3J0IGNvbnN0IGtSaW90QXBpQmFzZVVybCA9ICdodHRwczovL2FwaS5waXZvdHRmdC5jb20nO1xyXG5cclxuLy8gQ3VycmVudCBURlQgaW4tc2V0IHBhdGNoICsgc2V0IG51bWJlci4gQnVtcCB0aGVzZSB0b2dldGhlciB3aXRoIHRoZVxyXG4vLyBgUEFUQ0hFU2AgYXJyYXlzIGluIExpdmVNZXRhUmVuZGVyZXIudHMgKyBUcmVuZHNSZW5kZXJlci50cyBldmVyeSB0aW1lXHJcbi8vIGEgbmV3IFRGVCBwYXRjaCBzaGlwcy4gVXNlZCBieSBTbmFwc2hvdFVwbG9hZGVyIHNvIHVwbG9hZGVkIHNuYXBzaG90c1xyXG4vLyBsYW5kIGluIHRoZSByaWdodCBzbGljZSB3aXRob3V0IGRlcGVuZGluZyBvbiBSaW90J3MgYGdhbWVfdmVyc2lvbmBcclxuLy8gc3RyaW5nIHBhcnNpbmcuXHJcbmV4cG9ydCBjb25zdCBrQ3VycmVudFRmdFBhdGNoID0gJzE3LjMnO1xyXG5leHBvcnQgY29uc3Qga0N1cnJlbnRUZnRTZXROdW1iZXIgPSAxNztcclxuXHJcblxyXG4vLyBQbGF0Zm9ybSDihpIgcmVnaW9uYWwgcm91dGluZyBtYXAgKGZvciBhY2NvdW50L21hdGNoIGVuZHBvaW50cylcclxuZXhwb3J0IGNvbnN0IGtQbGF0Zm9ybVRvUmVnaW9uOiBSZWNvcmQ8c3RyaW5nLCAnYW1lcmljYXMnIHwgJ2V1cm9wZScgfCAnYXNpYSc+ID0ge1xyXG4gICdldXcxJzogJ2V1cm9wZScsICdldW4xJzogJ2V1cm9wZScsICd0cjEnOiAnZXVyb3BlJywgJ3J1JzogJ2V1cm9wZScsXHJcbiAgJ25hMSc6ICdhbWVyaWNhcycsICdicjEnOiAnYW1lcmljYXMnLCAnbGExJzogJ2FtZXJpY2FzJywgJ2xhMic6ICdhbWVyaWNhcycsXHJcbiAgJ2tyJzogJ2FzaWEnLCAnanAxJzogJ2FzaWEnLCAnb2MxJzogJ2FzaWEnLCAncGgyJzogJ2FzaWEnLFxyXG4gICdzZzInOiAnYXNpYScsICd0aDInOiAnYXNpYScsICd0dzInOiAnYXNpYScsICd2bjInOiAnYXNpYScsXHJcbn07XHJcbiIsIi8vIFBpdm90VEZUIC0gU2V0IDE3IG1ldGEgY29tcG9zaXRpb25zXHJcbi8vIENoYW1waW9uIElEcyBhbmQgdHJhaXRzIHNvdXJjZWQgZnJvbSBDb21tdW5pdHlEcmFnb24gU2V0IDE3IGRhdGEuXHJcbi8vIE5PVEU6IHRpZXIgcmFua2luZ3MgYW5kIGl0ZW0gYnVpbGRzIGFyZSBhdXRob3IgcGxhY2Vob2xkZXJzIHBlbmRpbmcgbGl2ZVxyXG4vLyBwYXRjaCBkYXRhOyB0aGUgdW5pdHMsIGNvc3RzLCBhbmQgdHJhaXRzIHJlZmVyZW5jZWQgaGVyZSBhcmUgcmVhbC5cclxuXHJcbmltcG9ydCB7IENvbXAgfSBmcm9tICcuLi8uLi9tb2RlbHMvdHlwZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1ldGFDb21wczogQ29tcFtdID0gW1xyXG4gIC8vID09PT09IFMgVElFUiA9PT09PVxyXG4gIHtcclxuICAgIGlkOiAnbW9yZ2FuYS1kYXJrLWxhZHknLFxyXG4gICAgbmFtZTogJ01vcmdhbmEgRGFyayBMYWR5JyxcclxuICAgIHRpZXI6ICdTJyxcclxuICAgIHBsYXlzdHlsZTogJ0Zhc3QgOScsXHJcbiAgICBkaWZmaWN1bHR5OiAnSGFyZCcsXHJcbiAgICBsZXZlbDogOSxcclxuICAgIHVuaXRzOiBbXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X01vcmdhbmEnLCAgICAgaXNDYXJyeTogdHJ1ZSwgIHN0YXJMZXZlbDogMiwgaXRlbXM6IFsncmFiYWRvbnMtZGVhdGhjYXAnLCAnamV3ZWxlZC1nYXVudGxldCcsICdoZXh0ZWNoLWd1bmJsYWRlJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfS2FybWEnLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyLCBpdGVtczogWydibHVlLWJ1ZmYnXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Nb3JkZWthaXNlcicsIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTGlzc2FuZHJhJywgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0poaW4nLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19WZXgnLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDEgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZGVrYWlzZXInLCBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1NoZW4nLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgXSxcclxuICAgIGNvcmVUcmFpdHM6IFsnRGFyayBMYWR5JywgJ0RhcmsgU3RhciddLFxyXG4gICAgZGVzY3JpcHRpb246ICdNb3JnYW5hIHNvbG8tY2FycmllcyB3aXRoIERhcmsgU3RhciBzdXBwb3J0aW5nIGNhc3QuIFVuY2FwIGJvYXJkIGF0IEx2OSBmb3IgSmhpbi9WZXggc2Vjb25kYXJ5IEFQLicsXHJcbiAgICBlYXJseUdhbWU6ICdMaXNzYW5kcmEgKyBNb3JkZWthaXNlciBvcGVuZXIgZm9yIERhcmsgU3RhciAyLiBFY29uIHRvIDUwLCBwdXNoIDggb24gNC0yLicsXHJcbiAgICBtaWRHYW1lOiAnU3RhYmlsaXplIGF0IEx2NyBvbiA0LTEg4oCUIGZpbmQgS2FybWEgMiBhbmQgY29tcGxldGUgUmFiYWRvblxcJ3Mgb24gTW9yZ2FuYS4nLFxyXG4gICAgbGF0ZUdhbWU6ICdQdXNoIEx2OSBvbiA1LTEgYW5kIHNsb3cgcm9sbCBmb3IgTW9yZ2FuYSAyIOKAlCB1bmNhcCB3aXRoIEpoaW4gYW5kIFZleC4nLFxyXG4gICAgdGlwczogJ01vcmdhbmEgd2FudHMgQVAvZHVyYWJpbGl0eS4gUG9zaXRpb24gYmVoaW5kIFNoZW4gZm9yIHRoZSBidWx3YXJrIHNoaWVsZC4nLFxyXG4gICAgcmVjb21tZW5kZWRBdWdtZW50czogWydURlQxM19BdWdtZW50X1NvcmNlcmVyQ3Jvd24nLCAnVEZUNl9BdWdtZW50X1BhbmRvcmFzSXRlbXMnLCAnVEZUNl9BdWdtZW50X0FzY2Vuc2lvbiddXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogJ2poaW4tZGFyay1zdGFyLXNuaXBlcnMnLFxyXG4gICAgbmFtZTogJ0poaW4gRGFyayBTdGFyIFNuaXBlcnMnLFxyXG4gICAgdGllcjogJ1MnLFxyXG4gICAgcGxheXN0eWxlOiAnRmFzdCA4JyxcclxuICAgIGRpZmZpY3VsdHk6ICdNZWRpdW0nLFxyXG4gICAgbGV2ZWw6IDgsXHJcbiAgICB1bml0czogW1xyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19KaGluJywgICAgICAgICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAyLCBpdGVtczogWydpbmZpbml0eS1lZGdlJywgJ2xhc3Qtd2hpc3BlcicsICdnaWFudC1zbGF5ZXInXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19YYXlhaCcsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyLCBpdGVtczogWydndWluc29vcy1yYWdlYmxhZGUnXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19FenJlYWwnLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0duYXInLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfS2FybWEnLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19MaXNzYW5kcmEnLCAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X01vcmRla2Fpc2VyJywgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfU2hlbicsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgXSxcclxuICAgIGNvcmVUcmFpdHM6IFsnRGFyayBTdGFyJywgJ0VyYWRpY2F0b3InLCAnU25pcGVyJ10sXHJcbiAgICBkZXNjcmlwdGlvbjogJ1NuaXBlciBsaW5lIGJhY2tlZCBieSBEYXJrIFN0YXIgZGFtYWdlIGFtcC4gSmhpbiBvbmUtc2hvdHMgYmFja2xpbmUgY2FycmllcyBvbiBoaXMgZm91cnRoIHNob3QuJyxcclxuICAgIGVhcmx5R2FtZTogJ0V6cmVhbCArIEduYXIgZWFybHkgU25pcGVyIHRyYWl0LiBTbGFtIElFIG9uIEpoaW4gaG9sZGVyLicsXHJcbiAgICBtaWRHYW1lOiAnU3RhYmlsaXplIGF0IEx2NyBieSA0LTEg4oCUIGhvbGQgSmhpbiBhbmQgWGF5YWggcGFpcnMsIGNvbXBsZXRlIExhc3QgV2hpc3Blci4nLFxyXG4gICAgbGF0ZUdhbWU6ICdQdXNoIEx2OCBvbiA0LTIgYW5kIHNsb3cgcm9sbCDigJQgU25pcGVyIDQgKyBLYXJtYSBib29zdCBjbG9zZXMgb3V0IHRoZSBsb2JieS4nLFxyXG4gICAgdGlwczogJ1N0YWNrIFNuaXBlcnMgaW4gdGhlIHNhbWUgY29sdW1uLiBLYXJtYSBib29zdHMgdGhlIGxpbmUgZm9yIGNyaXQgKyBBUCBzeW5lcmd5LicsXHJcbiAgICByZWNvbW1lbmRlZEF1Z21lbnRzOiBbJ1RGVDEzX0F1Z21lbnRfU25pcGVyJywgJ1RGVDEzX0F1Z21lbnRfU25pcGVyQ3Jvd24nLCAnVEZUNl9BdWdtZW50X0FzY2Vuc2lvbiddXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogJ3hheWFoLXN0YXJnYXplcicsXHJcbiAgICBuYW1lOiAnWGF5YWggU3RhcmdhemVyJyxcclxuICAgIHRpZXI6ICdTJyxcclxuICAgIHBsYXlzdHlsZTogJ0Zhc3QgOCcsXHJcbiAgICBkaWZmaWN1bHR5OiAnTWVkaXVtJyxcclxuICAgIGxldmVsOiA4LFxyXG4gICAgdW5pdHM6IFtcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfWGF5YWgnLCAgICAgICAgaXNDYXJyeTogdHJ1ZSwgIHN0YXJMZXZlbDogMiwgaXRlbXM6IFsnaW5maW5pdHktZWRnZScsICdsYXN0LXdoaXNwZXInLCAncnVuYWFucy1odXJyaWNhbmUnXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19MdWx1JywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0pheCcsICAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfVHdpc3RlZEZhdGUnLCAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19UYWxvbicsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0NhaXRseW4nLCAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTWlsaW8nLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19OdW51JywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydTdGFyZ2F6ZXInLCAnU25pcGVyJywgJ0Jhc3Rpb24nXSxcclxuICAgIGRlc2NyaXB0aW9uOiAnU3RhcmdhemVyIGNvbnN0ZWxsYXRpb24gYnVmZnMgWGF5YWggd2hpbGUgSmF4IHRhbmtzLiBOdW51IGhvbGRzIHRoZSBTdGFyZ2F6ZXIgNC1jb3N0IHNsb3QuJyxcclxuICAgIGVhcmx5R2FtZTogJ09wZW4gd2l0aCBURiArIFRhbG9uICsgQ2FpdGx5biBmb3IgU3RhcmdhemVyIDMuIEVjb24gZm9yIFhheWFoLicsXHJcbiAgICBtaWRHYW1lOiAnU3RhYmlsaXplIEx2NyBvbiA0LTEg4oCUIGZpbmQgWGF5YWggY29waWVzLCBmaW5pc2ggSUUsIGFuZCBzbGFtIEpheCBmcm9udGxpbmUuJyxcclxuICAgIGxhdGVHYW1lOiAnUHVzaCBMdjggb24gNC0yIGFuZCBzbG93IHJvbGwgZm9yIFhheWFoIDIgKyBMdWx1L051bnUgdG8gaGl0IFN0YXJnYXplciA1LicsXHJcbiAgICB0aXBzOiAnU3RhcmdhemVyIDUgaXMgdGhlIHNwaWtlIGlmIHlvdSBmaW5kIEx1bHUgYW5kIE51bnUuIFBvc2l0aW9uIFhheWFoIGJhY2stY29ybmVyLicsXHJcbiAgICByZWNvbW1lbmRlZEF1Z21lbnRzOiBbJ1RGVDEzX0F1Z21lbnRfU25pcGVyQ3Jlc3QnLCAnVEZUNl9BdWdtZW50X0FzY2Vuc2lvbicsICdURlQxMF9BdWdtZW50X0JpZ0dhaW5zJ11cclxuICB9LFxyXG5cclxuICAvLyA9PT09PSBBIFRJRVIgPT09PT1cclxuICB7XHJcbiAgICBpZDogJ3ByaW1vcmRpYW4tcmVyb2xsJyxcclxuICAgIG5hbWU6ICdQcmltb3JkaWFuIFJlcm9sbCcsXHJcbiAgICB0aWVyOiAnQScsXHJcbiAgICBwbGF5c3R5bGU6ICdSZXJvbGwnLFxyXG4gICAgZGlmZmljdWx0eTogJ0Vhc3knLFxyXG4gICAgbGV2ZWw6IDYsXHJcbiAgICB1bml0czogW1xyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19SZWtTYWknLCAgICAgICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAzLCBpdGVtczogWyd0aXRhbnMtcmVzb2x2ZScsICdibG9vZHRoaXJzdGVyJywgJ3dhcm1vZ3MtYXJtb3InXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19CZWx2ZXRoJywgICAgICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAzLCBpdGVtczogWydndWluc29vcy1yYWdlYmxhZGUnLCAncnVuYWFucy1odXJyaWNhbmUnLCAnZ2lhbnQtc2xheWVyJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQnJpYXInLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMyB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19NYW9rYWknLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0lsbGFvaScsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQXVyb3JhJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgXSxcclxuICAgIGNvcmVUcmFpdHM6IFsnUHJpbW9yZGlhbicsICdBbmltYScsICdCcmF3bGVyJ10sXHJcbiAgICBkZXNjcmlwdGlvbjogXCJSZXJvbGwgTHY2IGZvciAzLXN0YXIgUmVrJ1NhaSBhbmQgQmVsJ1ZldGguIFByaW1vcmRpYW4gQnJhd2xlcnMgc3RhdC1jaGVjayBlbmVtaWVzLlwiLFxyXG4gICAgZWFybHlHYW1lOiAnQnV5IGV2ZXJ5IFJla1xcJ1NhaSwgQmVsXFwnVmV0aCwgQnJpYXIgZnJvbSBTdGFnZSAyLiBTbG93IHJvbGwgYXQgTHY2LicsXHJcbiAgICBtaWRHYW1lOiAnU3RheSBMdjYgb24gMy0yIOKAlCBzbG93IHJvbGwgNTBnIGRvd24gZm9yIFJla1xcJ1NhaSAzLCBCZWxcXCdWZXRoIDMsIGFuZCBCcmlhciAzLicsXHJcbiAgICBsYXRlR2FtZTogJ09uY2UgMy1zdGFycyBoaXQsIHB1c2ggTHY3IG9uIDQtMiBmb3IgQXVyb3JhIGFuZCBsb2NrIGluIEFuaW1hIDQuJyxcclxuICAgIHRpcHM6IFwiUHJpb3JpdGl6ZSBSZWsnU2FpIGl0ZW1zIG9uIGNhcm91c2VsLiBBdXJvcmEgMi1zdGFyIGFkZHMgQW5pbWEgdHJhaXQuXCIsXHJcbiAgICByZWNvbW1lbmRlZEF1Z21lbnRzOiBbJ1RGVDEzX0F1Z21lbnRfQnJ1aXNlcicsICdURlQxM19BdWdtZW50X0JydWlzZXJDcm93bicsICdURlQ2X0F1Z21lbnRfU2FsdmFnZUJpbkhSJ11cclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAnbWVjaGEtYXNvbCcsXHJcbiAgICBuYW1lOiAnTWVjaGEgQXVyZWxpb24gU29sJyxcclxuICAgIHRpZXI6ICdBJyxcclxuICAgIHBsYXlzdHlsZTogJ0Zhc3QgOCcsXHJcbiAgICBkaWZmaWN1bHR5OiAnSGFyZCcsXHJcbiAgICBsZXZlbDogOCxcclxuICAgIHVuaXRzOiBbXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0F1cmVsaW9uU29sJywgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDIsIGl0ZW1zOiBbJ2pld2VsZWQtZ2F1bnRsZXQnLCAnaGV4dGVjaC1ndW5ibGFkZScsICdyYWJhZG9ucy1kZWF0aGNhcCddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0dhbGlvJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfVXJnb3QnLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19WaWt0b3InLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0thcm1hJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQmFyZCcsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19CbGl0emNyYW5rJywgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X01vcmRla2Fpc2VyJywgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgIF0sXHJcbiAgICBjb3JlVHJhaXRzOiBbJ01lY2hhJywgJ0NvbmR1aXQnLCAnVmFuZ3VhcmQnXSxcclxuICAgIGRlc2NyaXB0aW9uOiAnRnVsbCBNZWNoYSBmcm9udGxpbmUgcGlsb3QgQVNvbCwgQ29uZHVpdCBjaGFpbiBmZWVkcyB0aGUgdGVhbSBtYW5hLiBDYXAgYm9hcmQgd2l0aCBCYXJkIG9yIEJsaXR6Y3JhbmsuJyxcclxuICAgIGVhcmx5R2FtZTogJ1VyZ290ICsgVmlrdG9yIGVhcmx5IE1lY2hhLiBUcmFuc2l0aW9uIHRvIEFTb2wgKyBHYWxpbyBhdCBMdjguJyxcclxuICAgIG1pZEdhbWU6ICdTdGFiaWxpemUgYXQgTHY3IHdpdGggTWVjaGEgMyDigJQgZWNvbiB0byA1MGcgYW5kIHByZXAgQVNvbCBpdGVtcy4nLFxyXG4gICAgbGF0ZUdhbWU6ICdQdXNoIEx2OCBvbiA0LTIsIGZpbmQgQVNvbCAyIGFuZCBHYWxpbyDigJQgY2FwIHdpdGggQmFyZCBvciBCbGl0emNyYW5rIGZvciBDb25kdWl0IGNoYWluLicsXHJcbiAgICB0aXBzOiAnQ29uZHVpdCBuZWVkcyBhIENvbmR1aXQgcGFpciB0byBjaGFpbi4gUGFpciBBU29sIHdpdGggQmFyZCBvciBNb3JkZWthaXNlci4nLFxyXG4gICAgcmVjb21tZW5kZWRBdWdtZW50czogWydURlQxM19BdWdtZW50X1NvcmNlcmVyQ3Jvd24nLCAnVEZUNl9BdWdtZW50X1BhbmRvcmFzSXRlbXMnLCAnVEZUMTBfQXVnbWVudF9CaWdHYWlucyddXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogJ3plZC1nYWxheHktaHVudGVyJyxcclxuICAgIG5hbWU6ICdaZWQgR2FsYXh5IEh1bnRlcicsXHJcbiAgICB0aWVyOiAnQScsXHJcbiAgICBwbGF5c3R5bGU6ICdGYXN0IDknLFxyXG4gICAgZGlmZmljdWx0eTogJ0hhcmQnLFxyXG4gICAgbGV2ZWw6IDksXHJcbiAgICB1bml0czogW1xyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19aZWQnLCAgICAgICAgICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAyLCBpdGVtczogWydpbmZpbml0eS1lZGdlJywgJ2VkZ2Utb2YtbmlnaHQnLCAnYmxvb2R0aGlyc3RlciddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1RhbG9uJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQWthbGknLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19LYWlzYScsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0thcm1hJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZGVrYWlzZXInLCAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19MaXNzYW5kcmEnLCAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0poaW4nLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDEgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfU2hlbicsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgXSxcclxuICAgIGNvcmVUcmFpdHM6IFsnR2FsYXh5IEh1bnRlcicsICdEYXJrIFN0YXInLCAnUm9ndWUnXSxcclxuICAgIGRlc2NyaXB0aW9uOiAnWmVkIHNvbG8gY2Fycnkgd2l0aCBSb2d1ZSArIERhcmsgU3RhciBiYWNrbGluZSBwcmVzc3VyZS4gQ2FwIGJvYXJkIGF0IEx2OS4nLFxyXG4gICAgZWFybHlHYW1lOiAnTG9zcyBzdHJlYWsgU3RhZ2UgMi4gU3RhYmlsaXplIGF0IEx2NywgcHVzaCA5IG9uIDUtMS4nLFxyXG4gICAgbWlkR2FtZTogJ0x2NyBvbiA0LTEgd2l0aCBUYWxvbiArIEFrYWxpIFJvZ3VlIDIg4oCUIGVjb24gZm9yIHRoZSBMdjgvOSBwdXNoIGFuZCBjb21wbGV0ZSBJRS4nLFxyXG4gICAgbGF0ZUdhbWU6ICdQdXNoIEx2OCBvbiA0LTIgdGhlbiA5IG9uIDUtMSDigJQgc2xvdyByb2xsIGZvciBaZWQgMiBhbmQgTGlzc2FuZHJhIDIuJyxcclxuICAgIHRpcHM6ICdaZWQgd2FudHMgSUUgKyBzdXN0YWluLiBFZGdlIG9mIE5pZ2h0IGdpdmVzIGhpbSB0aGUgYnVyc3Qgd2luZG93LicsXHJcbiAgICByZWNvbW1lbmRlZEF1Z21lbnRzOiBbJ1RGVDEzX0F1Z21lbnRfUXVpY2tzdHJpa2VyQ3Jvd24nLCAnVEZUNl9BdWdtZW50X0FzY2Vuc2lvbicsICdURlQxMF9BdWdtZW50X0JpZ0dhaW5zJ11cclxuICB9LFxyXG5cclxuICAvLyA9PT09PSBCIFRJRVIgPT09PT1cclxuICB7XHJcbiAgICBpZDogJ3BzaW9uaWMtcHlrZS1yZXJvbGwnLFxyXG4gICAgbmFtZTogJ1BzaW9uaWMgUHlrZSBSZXJvbGwnLFxyXG4gICAgdGllcjogJ0InLFxyXG4gICAgcGxheXN0eWxlOiAnUmVyb2xsJyxcclxuICAgIGRpZmZpY3VsdHk6ICdFYXN5JyxcclxuICAgIGxldmVsOiA2LFxyXG4gICAgdW5pdHM6IFtcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfUHlrZScsICAgICAgICAgaXNDYXJyeTogdHJ1ZSwgIHN0YXJMZXZlbDogMywgaXRlbXM6IFsnaW5maW5pdHktZWRnZScsICdlZGdlLW9mLW5pZ2h0JywgJ2hhbmQtb2YtanVzdGljZSddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0dyYWdhcycsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDMgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfVmlrdG9yJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19NYXN0ZXJZaScsICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1NvbmEnLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDEgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfS2FybWEnLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgXSxcclxuICAgIGNvcmVUcmFpdHM6IFsnUHNpb25pYycsICdWb3lhZ2VyJywgJ01hcmF1ZGVyJ10sXHJcbiAgICBkZXNjcmlwdGlvbjogJ1Jlcm9sbCBhdCBMdjYgZm9yIDMtc3RhciBQeWtlLiBQc2lvbmljIDQgaXMgdGhlIHRlYW0gc3Bpa2Ug4oCUIFNvbmEgY2FwcyBpdCBhdCA1LicsXHJcbiAgICBlYXJseUdhbWU6ICdCdXkgZXZlcnkgUHlrZSArIEdyYWdhcyArIFZpa3RvciBmcm9tIFN0YWdlIDIuJyxcclxuICAgIG1pZEdhbWU6ICdTdGF5IEx2NiBmcm9tIDMtMiDigJQgc2xvdyByb2xsIGZvciBQeWtlIDMgYW5kIEdyYWdhcyAzLCBrZWVwIFBzaW9uaWMgNCBhY3RpdmUuJyxcclxuICAgIGxhdGVHYW1lOiAnQWZ0ZXIgMy1zdGFycyBoaXQsIHB1c2ggTHY3IGZvciBTb25hIOKAlCBQc2lvbmljIDUgY2xvc2VzIG91dCB0aGUgbG9iYnkuJyxcclxuICAgIHRpcHM6ICdQeWtlIGp1bXBzIGJhY2tsaW5lOyBwYWlyIHdpdGggRWRnZSBvZiBOaWdodCBmb3IgYnVyc3Qgd2luZG93LicsXHJcbiAgICByZWNvbW1lbmRlZEF1Z21lbnRzOiBbJ1RGVDEzX0F1Z21lbnRfUXVpY2tzdHJpa2VyQ3Jvd24nLCAnVEZUNl9BdWdtZW50X1NhbHZhZ2VCaW5IUicsICdURlQ2X0F1Z21lbnRfQ29tcG9uZW50R3JhYkJhZyddXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogJ3NvbmEtY29tbWFuZGVyJyxcclxuICAgIG5hbWU6ICdTb25hIENvbW1hbmRlcicsXHJcbiAgICB0aWVyOiAnQicsXHJcbiAgICBwbGF5c3R5bGU6ICdGYXN0IDknLFxyXG4gICAgZGlmZmljdWx0eTogJ01lZGl1bScsXHJcbiAgICBsZXZlbDogOSxcclxuICAgIHVuaXRzOiBbXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1NvbmEnLCAgICAgICAgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDIsIGl0ZW1zOiBbJ2JsdWUtYnVmZicsICdqZXdlbGVkLWdhdW50bGV0JywgJ2hleHRlY2gtZ3VuYmxhZGUnXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19UZWVtbycsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0xpc3NhbmRyYScsICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfSWxsYW9pJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19MZWJsYW5jJywgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0thcm1hJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfU2hlbicsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19CYXJkJywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydDb21tYW5kZXInLCAnU2hlcGhlcmQnLCAnUHNpb25pYyddLFxyXG4gICAgZGVzY3JpcHRpb246ICdIZWFsLWFuZC1zaGllbGQgU2hlcGhlcmQgYmFja2JvbmUgd2l0aCBTb25hIGJyb2FkY2FzdGluZyB0ZWFtLXdpZGUgYnVmZnMuIFN0cm9uZyB2cyBzdXN0YWluZWQgRFBTLCB3ZWFrIHZzIGFzc2Fzc2lucy4nLFxyXG4gICAgZWFybHlHYW1lOiAnT3BlbiBTaGVwaGVyZCAyIHdpdGggVGVlbW8gKyBMaXNzYW5kcmEuIFB1c2ggOCBvbiA0LTIuJyxcclxuICAgIG1pZEdhbWU6ICdTdGFiaWxpemUgTHY3IG9uIDQtMSB3aXRoIFNoZXBoZXJkIDMg4oCUIGVjb24gZm9yIHRoZSBMdjggcHVzaCwgcHJlcCBCbHVlIEJ1ZmYgb24gU29uYS4nLFxyXG4gICAgbGF0ZUdhbWU6ICdQdXNoIEx2OCBvbiA0LTIgdGhlbiA5IG9uIDUtMSDigJQgc2xvdyByb2xsIGZvciBTb25hIDIgYW5kIGhpdCBTaGVwaGVyZCA1LicsXHJcbiAgICB0aXBzOiAnU2hlcGhlcmQgNSBpcyB0aGUgc3Bpa2UuIFBvc2l0aW9uIFNvbmEgYmVoaW5kIFNoZW4gZm9yIHRoZSBCdWx3YXJrIHNoaWVsZC4nLFxyXG4gICAgcmVjb21tZW5kZWRBdWdtZW50czogWydURlQ2X0F1Z21lbnRfUGFuZG9yYXNJdGVtcycsICdURlQxMF9BdWdtZW50X0JpZ0dhaW5zJywgJ1RGVDlfQXVnbWVudF9MZWFybmluZ0Zyb21FeHBlcmllbmNlMiddXHJcbiAgfSxcclxuXHJcbiAgLy8gPT09PT0gQyBUSUVSID09PT09XHJcbiAge1xyXG4gICAgaWQ6ICdhbmltYS1maW9yYScsXHJcbiAgICBuYW1lOiAnQW5pbWEgRmlvcmEnLFxyXG4gICAgdGllcjogJ0MnLFxyXG4gICAgcGxheXN0eWxlOiAnRmFzdCA4JyxcclxuICAgIGRpZmZpY3VsdHk6ICdIYXJkJyxcclxuICAgIGxldmVsOiA4LFxyXG4gICAgdW5pdHM6IFtcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfRmlvcmEnLCAgICAgICAgaXNDYXJyeTogdHJ1ZSwgIHN0YXJMZXZlbDogMiwgaXRlbXM6IFsnaW5maW5pdHktZWRnZScsICdibG9vZHRoaXJzdGVyJywgJ2xhc3Qtd2hpc3BlciddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0JyaWFyJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfSmlueCcsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19BdXJvcmEnLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0lsbGFvaScsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQWthbGknLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19CZWx2ZXRoJywgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X01vcmRla2Fpc2VyJywgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgIF0sXHJcbiAgICBjb3JlVHJhaXRzOiBbJ0FuaW1hJywgJ0RpdmluZSBEdWVsaXN0JywgJ01hcmF1ZGVyJ10sXHJcbiAgICBkZXNjcmlwdGlvbjogJ0Zpb3JhIGNhcnJpZXMgd2l0aCBBbmltYSBmcm9udGxpbmUgc3VwcG9ydC4gSGlnaCB2YXJpYW5jZSDigJQgbmVlZHMgYSBGaW9yYSAyLXN0YXIgYW5kIEFuaW1hIDUgZm9yIHRoZSBzcGlrZS4nLFxyXG4gICAgZWFybHlHYW1lOiAnQnJpYXIgKyBKaW54ICsgQXVyb3JhIG9wZW5lci4gU2xhbSBlYXJseSBpdGVtcyBvbiBGaW9yYSBob2xkZXIuJyxcclxuICAgIG1pZEdhbWU6ICdTdGFiaWxpemUgYXQgTHY3IGJ5IDQtMSDigJQgaG9sZCBGaW9yYSBwYWlycyBhbmQgbG9jayBpbiB0aGUgQW5pbWEgZnJvbnRsaW5lLicsXHJcbiAgICBsYXRlR2FtZTogJ1B1c2ggTHY4IG9uIDQtMiBhbmQgc2xvdyByb2xsIGZvciBGaW9yYSAyIGFuZCBBbmltYSA1IOKAlCB0aGUgc3Bpa2UgdGhhdCB3aW5zIGdhbWVzLicsXHJcbiAgICB0aXBzOiAnRmlvcmEgbmVlZHMgSUUgKyBzdXN0YWluLiBBa2FsaSArIEJlbFxcJ1ZldGggZ2l2ZSB0aGUgTWFyYXVkZXIgYmFja2xpbmUuJyxcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUMTNfQXVnbWVudF9Db25xdWVyb3JDcm93bicsICdURlQxM19BdWdtZW50X1BpdEZpZ2h0ZXJDcm93bicsICdURlQ2X0F1Z21lbnRfQXNjZW5zaW9uJ11cclxuICB9LFxyXG5dO1xyXG5cclxuLy8gSGVscGVyOiBnZXQgY29tcHMgYnkgdGllclxyXG5leHBvcnQgY29uc3QgZ2V0Q29tcHNCeVRpZXIgPSAodGllcjogJ1MnIHwgJ0EnIHwgJ0InIHwgJ0MnIHwgJ1gnKSA9PlxyXG4gIG1ldGFDb21wcy5maWx0ZXIoYyA9PiBjLnRpZXIgPT09IHRpZXIpO1xyXG4iLCIvLyBBdXRoU2VydmljZSDigJQgdGhpbiBjbGllbnQgZm9yIHRoZSBDbG91ZGZsYXJlIFdvcmtlciAvYXV0aCBlbmRwb2ludHMuXG4vL1xuLy8gVG9rZW4gaXMga2VwdCBpbiBsb2NhbFN0b3JhZ2UuIENvbXBvbmVudHMgdGhhdCBjYXJlIGFib3V0IGxvZ2luIHN0YXRlIGNhblxuLy8gZWl0aGVyIGNhbGwgZ2V0Q3VycmVudFVzZXIoKSBvbmNlIG9uIG1vdW50LCBvciBzdWJzY3JpYmUgdmlhIG9uQ2hhbmdlKCkuXG5cbmltcG9ydCB7IGtSaW90QXBpQmFzZVVybCB9IGZyb20gJy4uL2NvbnN0cyc7XG5cbmV4cG9ydCB0eXBlIFVzZXJSb2xlID0gJ3VzZXInIHwgJ21vZGVyYXRvcicgfCAnYWRtaW4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXIge1xuICBpZDogbnVtYmVyO1xuICBlbWFpbDogc3RyaW5nO1xuICByb2xlOiBVc2VyUm9sZTtcbiAgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGw7XG59XG5cbmludGVyZmFjZSBBdXRoUmVzcG9uc2Uge1xuICB0b2tlbjogc3RyaW5nO1xuICB1c2VyOiBVc2VyO1xufVxuXG5jb25zdCBTVE9SQUdFX1RPS0VOID0gJ3Bpdm90dGZ0X2F1dGhfdG9rZW4nO1xuY29uc3QgU1RPUkFHRV9VU0VSID0gJ3Bpdm90dGZ0X2F1dGhfdXNlcic7XG5cbnR5cGUgTGlzdGVuZXIgPSAodXNlcjogVXNlciB8IG51bGwpID0+IHZvaWQ7XG5jb25zdCBsaXN0ZW5lcnMgPSBuZXcgU2V0PExpc3RlbmVyPigpO1xuXG5mdW5jdGlvbiBlbWl0KCk6IHZvaWQge1xuICBjb25zdCB1c2VyID0gZ2V0U3RvcmVkVXNlcigpO1xuICBsaXN0ZW5lcnMuZm9yRWFjaChsID0+IHtcbiAgICB0cnkgeyBsKHVzZXIpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoJ1tBdXRoU2VydmljZV0gbGlzdGVuZXIgdGhyZXc6JywgZSk7IH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb2tlbigpOiBzdHJpbmcgfCBudWxsIHtcbiAgdHJ5IHsgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfVE9LRU4pOyB9IGNhdGNoIHsgcmV0dXJuIG51bGw7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0b3JlZFVzZXIoKTogVXNlciB8IG51bGwge1xuICB0cnkge1xuICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfVVNFUik7XG4gICAgcmV0dXJuIHJhdyA/IEpTT04ucGFyc2UocmF3KSBhcyBVc2VyIDogbnVsbDtcbiAgfSBjYXRjaCB7IHJldHVybiBudWxsOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0F1dGhlbnRpY2F0ZWQoKTogYm9vbGVhbiB7XG4gIHJldHVybiAhIWdldFRva2VuKCkgJiYgISFnZXRTdG9yZWRVc2VyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FkbWluKCk6IGJvb2xlYW4ge1xuICBjb25zdCB1ID0gZ2V0U3RvcmVkVXNlcigpO1xuICByZXR1cm4gISF1ICYmIHUucm9sZSA9PT0gJ2FkbWluJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0F0TGVhc3Qocm9sZTogVXNlclJvbGUpOiBib29sZWFuIHtcbiAgY29uc3QgdSA9IGdldFN0b3JlZFVzZXIoKTtcbiAgaWYgKCF1KSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHJhbms6IFJlY29yZDxVc2VyUm9sZSwgbnVtYmVyPiA9IHsgdXNlcjogMSwgbW9kZXJhdG9yOiAyLCBhZG1pbjogMyB9O1xuICByZXR1cm4gcmFua1t1LnJvbGVdID49IHJhbmtbcm9sZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNoYW5nZShsaXN0ZW5lcjogTGlzdGVuZXIpOiAoKSA9PiB2b2lkIHtcbiAgbGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XG4gIHJldHVybiAoKSA9PiBsaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcbn1cblxuZnVuY3Rpb24gc2V0U2Vzc2lvbihyZXM6IEF1dGhSZXNwb25zZSk6IHZvaWQge1xuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfVE9LRU4sIHJlcy50b2tlbik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9VU0VSLCBKU09OLnN0cmluZ2lmeShyZXMudXNlcikpO1xuICB9IGNhdGNoIHsgLyogcXVvdGEgZXRjIOKAlCBzaWxlbnQgKi8gfVxuICBlbWl0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlc3Npb24oKTogdm9pZCB7XG4gIHRyeSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9UT0tFTik7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9VU0VSKTtcbiAgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XG4gIGVtaXQoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcG9zdEpzb248VD4ocGF0aDogc3RyaW5nLCBib2R5OiB1bmtub3duKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHVybCA9IGAke2tSaW90QXBpQmFzZVVybH0ke3BhdGh9YDtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gIH0pO1xuICBsZXQgcGF5bG9hZDogYW55O1xuICB0cnkgeyBwYXlsb2FkID0gYXdhaXQgcmVzLmpzb24oKTsgfSBjYXRjaCB7IHBheWxvYWQgPSB7IGVycm9yOiByZXMuc3RhdHVzVGV4dCB9OyB9XG4gIGlmICghcmVzLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQ/LmVycm9yIHx8IGBIVFRQICR7cmVzLnN0YXR1c31gKTtcbiAgfVxuICByZXR1cm4gcGF5bG9hZCBhcyBUO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRKc29uPFQ+KHBhdGg6IHN0cmluZywgdG9rZW4/OiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHVybCA9IGAke2tSaW90QXBpQmFzZVVybH0ke3BhdGh9YDtcbiAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICBpZiAodG9rZW4pIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHsgaGVhZGVycyB9KTtcbiAgbGV0IHBheWxvYWQ6IGFueTtcbiAgdHJ5IHsgcGF5bG9hZCA9IGF3YWl0IHJlcy5qc29uKCk7IH0gY2F0Y2ggeyBwYXlsb2FkID0geyBlcnJvcjogcmVzLnN0YXR1c1RleHQgfTsgfVxuICBpZiAoIXJlcy5vaykgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQ/LmVycm9yIHx8IGBIVFRQICR7cmVzLnN0YXR1c31gKTtcbiAgcmV0dXJuIHBheWxvYWQgYXMgVDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGRpc3BsYXlOYW1lPzogc3RyaW5nKTogUHJvbWlzZTxVc2VyPiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHBvc3RKc29uPEF1dGhSZXNwb25zZT4oJy9hdXRoL3JlZ2lzdGVyJywgeyBlbWFpbCwgcGFzc3dvcmQsIGRpc3BsYXlOYW1lIH0pO1xuICBzZXRTZXNzaW9uKHJlcyk7XG4gIHJldHVybiByZXMudXNlcjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ2luKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcG9zdEpzb248QXV0aFJlc3BvbnNlPignL2F1dGgvbG9naW4nLCB7IGVtYWlsLCBwYXNzd29yZCB9KTtcbiAgc2V0U2Vzc2lvbihyZXMpO1xuICByZXR1cm4gcmVzLnVzZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQoKTogdm9pZCB7XG4gIGNsZWFyU2Vzc2lvbigpO1xufVxuXG4vKipcbiAqIFJlZnJlc2ggdXNlciBpbmZvIGZyb20gYmFja2VuZC4gVXNlZnVsIGFmdGVyIHJvbGUgY2hhbmdlcyBvciB0byBjb25maXJtXG4gKiB0b2tlbiB2YWxpZGl0eS4gQ2xlYXJzIHNlc3Npb24gb24gNDAxLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVmcmVzaE1lKCk6IFByb21pc2U8VXNlciB8IG51bGw+IHtcbiAgY29uc3QgdG9rZW4gPSBnZXRUb2tlbigpO1xuICBpZiAoIXRva2VuKSByZXR1cm4gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRKc29uPHsgdXNlcjogVXNlciB9PignL2F1dGgvbWUnLCB0b2tlbik7XG4gICAgdHJ5IHsgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9VU0VSLCBKU09OLnN0cmluZ2lmeShyZXMudXNlcikpOyB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbiAgICBlbWl0KCk7XG4gICAgcmV0dXJuIHJlcy51c2VyO1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICBpZiAoKGUubWVzc2FnZSB8fCAnJykuaW5jbHVkZXMoJ0hUVFAgNDAxJykpIGNsZWFyU2Vzc2lvbigpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogSGVscGVyIGZvciBhZG1pbi1vbmx5IGZldGNoZXMg4oCUIGF1dG9tYXRpY2FsbHkgYXR0YWNoZXMgQmVhcmVyIHRva2VuLlxuICogVGhyb3dzIGlmIG5vdCBsb2dnZWQgaW4uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZG1pbkZldGNoPFQ+KHBhdGg6IHN0cmluZywgaW5pdDogUmVxdWVzdEluaXQgPSB7fSk6IFByb21pc2U8VD4ge1xuICBjb25zdCB0b2tlbiA9IGdldFRva2VuKCk7XG4gIGlmICghdG9rZW4pIHRocm93IG5ldyBFcnJvcignTm90IGF1dGhlbnRpY2F0ZWQnKTtcbiAgY29uc3QgdXJsID0gYCR7a1Jpb3RBcGlCYXNlVXJsfSR7cGF0aH1gO1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAuLi5pbml0LFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIC4uLihpbml0LmhlYWRlcnMgfHwge30pLFxuICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIC4uLihpbml0LmJvZHkgPyB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSA6IHt9KSxcbiAgICB9LFxuICB9KTtcbiAgbGV0IHBheWxvYWQ6IGFueTtcbiAgdHJ5IHsgcGF5bG9hZCA9IGF3YWl0IHJlcy5qc29uKCk7IH0gY2F0Y2ggeyBwYXlsb2FkID0geyBlcnJvcjogcmVzLnN0YXR1c1RleHQgfTsgfVxuICBpZiAoIXJlcy5vaykge1xuICAgIGlmIChyZXMuc3RhdHVzID09PSA0MDEpIGNsZWFyU2Vzc2lvbigpO1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkPy5lcnJvciB8fCBgSFRUUCAke3Jlcy5zdGF0dXN9YCk7XG4gIH1cbiAgcmV0dXJuIHBheWxvYWQgYXMgVDtcbn1cbiIsIi8vIENvbXBzU2VydmljZSDigJQgaHlicmlkIGNvbXAgc291cmNlOiBiYWNrZW5kIChsaXZlLCBtb2QtZWRpdGVkKSDihpIgbG9jYWxTdG9yYWdlXG4vLyBjYWNoZSAoVFRMKSDihpIgYnVuZGxlZCBtZXRhQ29tcHMgKG9mZmxpbmUgZmFsbGJhY2spLiBVc2VkIGJ5IEZlYXR1cmVSZW5kZXJlci5cblxuaW1wb3J0IHsgQ29tcCB9IGZyb20gJy4uL21vZGVscy90eXBlcyc7XG5pbXBvcnQgeyBtZXRhQ29tcHMgYXMgYnVuZGxlZENvbXBzIH0gZnJvbSAnLi4vZGF0YS9zZXQxNy9jb21wcyc7XG5pbXBvcnQgeyBrUmlvdEFwaUJhc2VVcmwgfSBmcm9tICcuLi9jb25zdHMnO1xuaW1wb3J0IHsgYWRtaW5GZXRjaCB9IGZyb20gJy4vQXV0aFNlcnZpY2UnO1xuXG5jb25zdCBDQUNIRV9LRVkgPSAncGl2b3R0ZnRfY29tcHNfY2FjaGVfdjEnO1xuY29uc3QgQ0FDSEVfVFRMX01TID0gMzAgKiA2MCAqIDEwMDA7ICAvLyAzMCBtaW4g4oCUIGNvbXBzIGNoYW5nZSBpbmZyZXF1ZW50bHlcblxuaW50ZXJmYWNlIENvbXBzQ2FjaGUge1xuICBmZXRjaGVkQXQ6IG51bWJlcjtcbiAgY29tcHM6IENvbXBbXTtcbn1cblxuZnVuY3Rpb24gcmVhZENhY2hlKCk6IENvbXBzQ2FjaGUgfCBudWxsIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShDQUNIRV9LRVkpO1xuICAgIHJldHVybiByYXcgPyBKU09OLnBhcnNlKHJhdykgYXMgQ29tcHNDYWNoZSA6IG51bGw7XG4gIH0gY2F0Y2ggeyByZXR1cm4gbnVsbDsgfVxufVxuXG5mdW5jdGlvbiB3cml0ZUNhY2hlKGNvbXBzOiBDb21wW10pOiB2b2lkIHtcbiAgdHJ5IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShDQUNIRV9LRVksIEpTT04uc3RyaW5naWZ5KHsgZmV0Y2hlZEF0OiBEYXRlLm5vdygpLCBjb21wcyB9KSk7XG4gIH0gY2F0Y2ggeyAvKiBxdW90YSDigJQgaWdub3JlICovIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGNvbXBzIHdpdGggaHlicmlkIHN0cmF0ZWd5OlxuICogMS4gSWYgZnJlc2ggY2FjaGUg4oaSIHJldHVybiBpbW1lZGlhdGVseVxuICogMi4gSWYgc3RhbGUgY2FjaGUg4oaSIHJldHVybiBzdGFsZSArIGJhY2tncm91bmQgcmVmcmVzaFxuICogMy4gSWYgbm8gY2FjaGUg4oaSIGZldGNoIG5ldHdvcmssIGZhbGwgYmFjayB0byBidW5kbGVkIG9uIGVycm9yXG4gKlxuICogU3luYyBoZWxwZXJzIChnZXRDb21wc1N5bmMsIGV0Yy4pIHJldHVybiB0aGUgc3luY2hyb25vdXMgYmVzdCBhbnN3ZXIgZm9yXG4gKiBjb21wb25lbnRzIHRoYXQgY2FuJ3QgYXdhaXQg4oCUIHRoZXknbGwgZ2V0IGNhY2hlIE9SIGJ1bmRsZWQsIG5ldmVyIGJsb2NraW5nLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29tcHMoKTogUHJvbWlzZTxDb21wW10+IHtcbiAgY29uc3QgY2FjaGVkID0gcmVhZENhY2hlKCk7XG4gIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gIGNvbnN0IGlzRnJlc2ggPSBjYWNoZWQgJiYgKG5vdyAtIGNhY2hlZC5mZXRjaGVkQXQpIDwgQ0FDSEVfVFRMX01TO1xuXG4gIGlmIChpc0ZyZXNoKSByZXR1cm4gY2FjaGVkIS5jb21wcztcblxuICAvLyBTdGFsZSBvciBtaXNzaW5nIOKAlCB0cnkgbmV0d29ya1xuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke2tSaW90QXBpQmFzZVVybH0vY29tcHNgKTtcbiAgICBpZiAocmVzLm9rKSB7XG4gICAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzLmpzb24oKSBhcyB7IGNvbXBzOiBDb21wW10gfTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGJvZHkuY29tcHMpICYmIGJvZHkuY29tcHMubGVuZ3RoID4gMCkge1xuICAgICAgICB3cml0ZUNhY2hlKGJvZHkuY29tcHMpO1xuICAgICAgICByZXR1cm4gYm9keS5jb21wcztcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggeyAvKiBmYWxsIHRocm91Z2ggKi8gfVxuXG4gIC8vIE5ldHdvcmsgZmFpbGVkIOKAlCBzdGFsZSBjYWNoZSBpcyBzdGlsbCBiZXR0ZXIgdGhhbiBub3RoaW5nXG4gIGlmIChjYWNoZWQpIHJldHVybiBjYWNoZWQuY29tcHM7XG4gIC8vIExhc3QgcmVzb3J0OiBidW5kbGVkIGNvbXBzXG4gIHJldHVybiBidW5kbGVkQ29tcHM7XG59XG5cbi8qKlxuICogU3luY2hyb25vdXM6IGJlc3QtYXZhaWxhYmxlIGNvbXBzIHdpdGhvdXQgYXdhaXRpbmcgbmV0d29yay5cbiAqIFVzZSB0aGlzIGluIHJlbmRlciBwYXRoczsgdHJpZ2dlciBnZXRDb21wcygpIGluIHBhcmFsbGVsIHRvIHJlZnJlc2guXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wc1N5bmMoKTogQ29tcFtdIHtcbiAgY29uc3QgY2FjaGVkID0gcmVhZENhY2hlKCk7XG4gIGlmIChjYWNoZWQgJiYgY2FjaGVkLmNvbXBzLmxlbmd0aCA+IDApIHJldHVybiBjYWNoZWQuY29tcHM7XG4gIHJldHVybiBidW5kbGVkQ29tcHM7XG59XG5cbi8qKlxuICogQmFja2dyb3VuZCByZWZyZXNoIOKAlCBmaXJlIGFuZCBmb3JnZXQuIFJldHVybnMgYSBwcm9taXNlIGJ1dCBtb3N0IGNhbGxlcnNcbiAqIGlnbm9yZSBpdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hDb21wc0luQmFja2dyb3VuZCgpOiBQcm9taXNlPENvbXBbXT4ge1xuICByZXR1cm4gZ2V0Q29tcHMoKTtcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQWRtaW4gb3BlcmF0aW9ucyDigJQgcmVxdWlyZSBtb2RlcmF0b3Igb3IgYWRtaW4gcm9sZS5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkbWluQ3JlYXRlQ29tcChjb21wOiBDb21wKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IGFkbWluRmV0Y2goJy9hZG1pbi9jb21wcycsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpZDogY29tcC5pZCxcbiAgICAgIG5hbWU6IGNvbXAubmFtZSxcbiAgICAgIHRpZXI6IGNvbXAudGllcixcbiAgICAgIHBsYXlzdHlsZTogY29tcC5wbGF5c3R5bGUsXG4gICAgICBzZXROdW1iZXI6IDE3LFxuICAgICAgZGF0YTogY29tcCxcbiAgICAgIGlzUHVibGlzaGVkOiB0cnVlLFxuICAgIH0pLFxuICB9KTtcbiAgaW52YWxpZGF0ZUNhY2hlKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZG1pblVwZGF0ZUNvbXAoaWQ6IHN0cmluZywgY29tcDogUGFydGlhbDxDb21wPik6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBhZG1pbkZldGNoKGAvYWRtaW4vY29tcHMvJHtlbmNvZGVVUklDb21wb25lbnQoaWQpfWAsIHtcbiAgICBtZXRob2Q6ICdQVVQnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIG5hbWU6IGNvbXAubmFtZSxcbiAgICAgIHRpZXI6IGNvbXAudGllcixcbiAgICAgIHBsYXlzdHlsZTogY29tcC5wbGF5c3R5bGUsXG4gICAgICBkYXRhOiBjb21wLFxuICAgIH0pLFxuICB9KTtcbiAgaW52YWxpZGF0ZUNhY2hlKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZG1pbkRlbGV0ZUNvbXAoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBhZG1pbkZldGNoKGAvYWRtaW4vY29tcHMvJHtlbmNvZGVVUklDb21wb25lbnQoaWQpfWAsIHsgbWV0aG9kOiAnREVMRVRFJyB9KTtcbiAgaW52YWxpZGF0ZUNhY2hlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZhbGlkYXRlQ2FjaGUoKTogdm9pZCB7XG4gIHRyeSB7IGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKENBQ0hFX0tFWSk7IH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIEFkbWluIHBhbmVsIOKAlCBjb21wcyBDUlVELiBHYXRlZCBieSBtb2RlcmF0b3IvYWRtaW4gcm9sZSBvbiB0aGUgYmFja2VuZDtcbi8vIHRoZSBVSSBhbHNvIGdhdGVzIHdpdGggaGFzQXRMZWFzdCgnbW9kZXJhdG9yJykgdG8gZmFpbCBmYXN0LlxuXG5pbXBvcnQgeyBDb21wLCBDb21wVW5pdCB9IGZyb20gJy4uL21vZGVscy90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdG9yZWRVc2VyLCBoYXNBdExlYXN0LCBsb2dvdXQsIGFkbWluRmV0Y2ggfSBmcm9tICcuLi9zZXJ2aWNlcy9BdXRoU2VydmljZSc7XG5pbXBvcnQgeyBnZXRDb21wcywgYWRtaW5DcmVhdGVDb21wLCBhZG1pblVwZGF0ZUNvbXAsIGFkbWluRGVsZXRlQ29tcCB9IGZyb20gJy4uL3NlcnZpY2VzL0NvbXBzU2VydmljZSc7XG5cbmxldCBjb21wczogQ29tcFtdID0gW107XG5sZXQgc2VsZWN0ZWRJZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5sZXQgaXNOZXdNb2RlID0gZmFsc2U7XG5cbi8vIC0tLS0tIEd1aWRlcyBzdGF0ZSAtLS0tLVxuaW50ZXJmYWNlIEd1aWRlU3VtbWFyeSB7XG4gIGlkOiBudW1iZXI7XG4gIHNsdWc6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgc3VtbWFyeTogc3RyaW5nIHwgbnVsbDtcbiAgdGFnczogc3RyaW5nW107XG4gIHVwZGF0ZWRBdDogbnVtYmVyO1xufVxuaW50ZXJmYWNlIEd1aWRlRGV0YWlsIGV4dGVuZHMgR3VpZGVTdW1tYXJ5IHsgYm9keU1kOiBzdHJpbmc7IGlzUHVibGlzaGVkPzogYm9vbGVhbjsgfVxuXG5sZXQgZ3VpZGVzOiBHdWlkZVN1bW1hcnlbXSA9IFtdO1xubGV0IHNlbGVjdGVkU2x1Zzogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5sZXQgaXNOZXdHdWlkZU1vZGUgPSBmYWxzZTtcbmxldCBhY3RpdmVTZWN0aW9uOiAnY29tcHMnIHwgJ2d1aWRlcycgfCAnc3RhdHMnID0gJ2NvbXBzJztcblxuLy8gLS0tLS0gU3RhdHMgaGVhbHRoIHN0YXRlIC0tLS0tXG5pbnRlcmZhY2UgQ29ob3J0SGVhbHRoIHtcbiAgcmVnaW9uOiBzdHJpbmc7XG4gIHRpZXI6IHN0cmluZztcbiAgcmFua0J1Y2tldDogc3RyaW5nO1xuICBsYXN0UnVuQXQ6IG51bWJlciB8IG51bGw7XG4gIGxhc3RQcm9jZXNzZWQ6IG51bWJlcjtcbiAgbGFzdEVycm9yczogbnVtYmVyO1xuICBwYXRjaDogc3RyaW5nO1xufVxuaW50ZXJmYWNlIFN0YXRzSGVhbHRoIHtcbiAgY29ob3J0Q291bnQ6IG51bWJlcjtcbiAgY3VycmVudENvaG9ydElkeDogbnVtYmVyO1xuICBuZXh0Q29ob3J0OiB7IHJlZ2lvbjogc3RyaW5nOyB0aWVyOiBzdHJpbmcgfTtcbiAgdG90YWxzOiB7XG4gICAgcHJvY2Vzc2VkTWF0Y2hlczogbnVtYmVyO1xuICAgIGF1Z21lbnRSb3dzOiBudW1iZXI7XG4gICAgY29tcFJvd3M6IG51bWJlcjtcbiAgICB1bml0Um93czogbnVtYmVyO1xuICAgIGl0ZW1Sb3dzOiBudW1iZXI7XG4gICAgbGFkZGVyRW50cmllczogbnVtYmVyO1xuICB9O1xuICBzbGljZXM6IEFycmF5PHsgcGF0Y2g6IHN0cmluZzsgcmVnaW9uOiBzdHJpbmc7IHJhbmtfYnVja2V0OiBzdHJpbmc7IHRvdGFsX2dhbWVzOiBudW1iZXI7IHVwZGF0ZWRfYXQ6IG51bWJlcjsgfT47XG4gIGNvaG9ydHM6IENvaG9ydEhlYWx0aFtdO1xuICBsYXN0UnVuOiB7IGF0OiBudW1iZXI7IGNvaG9ydElkeDogbnVtYmVyOyByZWdpb246IHN0cmluZzsgdGllcjogc3RyaW5nOyBwcm9jZXNzZWQ6IG51bWJlcjsgZXJyb3JzOiBudW1iZXIgfSB8IG51bGw7XG59XG5cbmZ1bmN0aW9uICQ8VCBleHRlbmRzIEhUTUxFbGVtZW50PihpZDogc3RyaW5nKTogVCB8IG51bGwge1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIGFzIFQgfCBudWxsO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlV2luZG93KCk6IHZvaWQge1xuICBvdmVyd29sZi53aW5kb3dzLmdldEN1cnJlbnRXaW5kb3cocmVzID0+IHtcbiAgICBpZiAocmVzPy5zdWNjZXNzICYmIHJlcy53aW5kb3c/LmlkKSBvdmVyd29sZi53aW5kb3dzLmNsb3NlKHJlcy53aW5kb3cuaWQpO1xuICB9KTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSGVhZGVyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHJlbmRlckhlYWRlcigpOiB2b2lkIHtcbiAgY29uc3QgdXNlciA9IGdldFN0b3JlZFVzZXIoKTtcbiAgY29uc3Qgc3BhbiA9ICQoJ2FkbWluLWN1cnJlbnQtdXNlcicpO1xuICBpZiAoIXNwYW4pIHJldHVybjtcbiAgaWYgKHVzZXIpIHtcbiAgICBzcGFuLmlubmVySFRNTCA9IGAke2VzY2FwZUh0bWwodXNlci5lbWFpbCl9IDxlbSBzdHlsZT1cIm9wYWNpdHk6MC42O1wiPigke3VzZXIucm9sZX0pPC9lbT5gO1xuICB9IGVsc2Uge1xuICAgIHNwYW4udGV4dENvbnRlbnQgPSAnbm90IHNpZ25lZCBpbic7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU2lkZWJhciBsaXN0XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHJlbmRlckxpc3QoZmlsdGVyID0gJycpOiB2b2lkIHtcbiAgY29uc3QgbGlzdCA9ICQoJ2FkbWluLWNvbXBzLWxpc3QnKTtcbiAgaWYgKCFsaXN0KSByZXR1cm47XG4gIGNvbnN0IGYgPSBmaWx0ZXIudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGNvbnN0IGZpbHRlcmVkID0gZlxuICAgID8gY29tcHMuZmlsdGVyKGMgPT4gYy5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZikgfHwgYy5pZC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGYpKVxuICAgIDogY29tcHM7XG4gIGlmIChmaWx0ZXJlZC5sZW5ndGggPT09IDApIHtcbiAgICBsaXN0LmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiYWRtaW4tZW1wdHlcIj5ObyBjb21wcy48L2Rpdj4nO1xuICAgIHJldHVybjtcbiAgfVxuICBsaXN0LmlubmVySFRNTCA9IGZpbHRlcmVkLm1hcChjID0+IGBcbiAgICA8YnV0dG9uIGNsYXNzPVwiYWRtaW4tY29tcC1yb3cgJHtjLmlkID09PSBzZWxlY3RlZElkID8gJ3NlbGVjdGVkJyA6ICcnfVwiIGRhdGEtY29tcC1pZD1cIiR7ZXNjYXBlSHRtbChjLmlkKX1cIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYWRtaW4tY29tcC10aWVyIHRpZXItJHtjLnRpZXIudG9Mb3dlckNhc2UoKX1cIj4ke2VzY2FwZUh0bWwoYy50aWVyKX08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImFkbWluLWNvbXAtbmFtZVwiPiR7ZXNjYXBlSHRtbChjLm5hbWUpfTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYWRtaW4tY29tcC1pZFwiPiR7ZXNjYXBlSHRtbChjLmlkKX08L3NwYW4+XG4gICAgPC9idXR0b24+XG4gIGApLmpvaW4oJycpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFZGl0b3Jcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gY2xlYXJFZGl0b3IoKTogdm9pZCB7XG4gICQoJ2FkbWluLWVkaXRvci1lbXB0eScpIS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgJCgnYWRtaW4tZWRpdG9yLWZvcm0nKSEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgc2V0U3RhdHVzKCcnKTtcbn1cblxuZnVuY3Rpb24gc2hvd0VkaXRvcihjb21wOiBDb21wIHwgbnVsbCk6IHZvaWQge1xuICAkKCdhZG1pbi1lZGl0b3ItZW1wdHknKSEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgJCgnYWRtaW4tZWRpdG9yLWZvcm0nKSEuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcblxuICBpc05ld01vZGUgPSBjb21wID09PSBudWxsO1xuICBjb25zdCB0aXRsZSA9ICQoJ2FkbWluLWVkaXRvci10aXRsZScpO1xuICBpZiAodGl0bGUpIHRpdGxlLnRleHRDb250ZW50ID0gaXNOZXdNb2RlID8gJ05ldyBjb21wJyA6ICdFZGl0IGNvbXAnO1xuXG4gIC8vIElEIGZpZWxkIOKAlCBsb2NrZWQgd2hlbiBlZGl0aW5nIGV4aXN0aW5nIGNvbXAgKGlkIGlzIHByaW1hcnkga2V5KVxuICBjb25zdCBpZElucHV0ID0gJDxIVE1MSW5wdXRFbGVtZW50PignZmllbGQtaWQnKTtcbiAgaWYgKGlkSW5wdXQpIHtcbiAgICBpZElucHV0LnZhbHVlID0gY29tcD8uaWQgfHwgJyc7XG4gICAgaWRJbnB1dC5kaXNhYmxlZCA9ICFpc05ld01vZGU7XG4gIH1cbiAgKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLW5hbWUnKSEpLnZhbHVlID0gY29tcD8ubmFtZSB8fCAnJztcbiAgKCQ8SFRNTFNlbGVjdEVsZW1lbnQ+KCdmaWVsZC10aWVyJykhKS52YWx1ZSA9IGNvbXA/LnRpZXIgfHwgJ0InO1xuICAoJDxIVE1MU2VsZWN0RWxlbWVudD4oJ2ZpZWxkLXBsYXlzdHlsZScpISkudmFsdWUgPSBjb21wPy5wbGF5c3R5bGUgfHwgJ1N0YW5kYXJkJztcbiAgKCQ8SFRNTFNlbGVjdEVsZW1lbnQ+KCdmaWVsZC1kaWZmaWN1bHR5JykhKS52YWx1ZSA9IGNvbXA/LmRpZmZpY3VsdHkgfHwgJ01lZGl1bSc7XG4gICgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdmaWVsZC1sZXZlbCcpISkudmFsdWUgPSBTdHJpbmcoY29tcD8ubGV2ZWwgPz8gOCk7XG4gICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC1kZXNjcmlwdGlvbicpISkudmFsdWUgPSBjb21wPy5kZXNjcmlwdGlvbiB8fCAnJztcbiAgKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLWNvcmUtdHJhaXRzJykhKS52YWx1ZSA9IChjb21wPy5jb3JlVHJhaXRzIHx8IFtdKS5qb2luKCcsICcpO1xuICAoJDxIVE1MSW5wdXRFbGVtZW50PignZmllbGQtYXVnbWVudHMnKSEpLnZhbHVlID0gKGNvbXA/LnJlY29tbWVuZGVkQXVnbWVudHMgfHwgW10pLmpvaW4oJywgJyk7XG4gICgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdmaWVsZC1hbHQtY29tcHMnKSEpLnZhbHVlID0gKGNvbXA/LmFsdGVybmF0aXZlQ29tcElkcyB8fCBbXSkuam9pbignLCAnKTtcbiAgKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLXRhZ3MnKSEpLnZhbHVlID0gKGNvbXA/LnRhZ3MgfHwgW10pLmpvaW4oJywgJyk7XG4gICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC11bml0cycpISkudmFsdWUgPSBKU09OLnN0cmluZ2lmeShjb21wPy51bml0cyB8fCBbXSwgbnVsbCwgMik7XG4gICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC1lYXJseScpISkudmFsdWUgPSBjb21wPy5lYXJseUdhbWUgfHwgJyc7XG4gICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC1taWQnKSEpLnZhbHVlICAgPSBjb21wPy5taWRHYW1lICAgfHwgJyc7XG4gICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC1sYXRlJykhKS52YWx1ZSAgPSBjb21wPy5sYXRlR2FtZSAgfHwgJyc7XG4gICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC10aXBzJykhKS52YWx1ZSAgPSBjb21wPy50aXBzICAgICAgfHwgJyc7XG5cbiAgLy8gSGlkZSBEZWxldGUgYnV0dG9uIGluIG5ldyBtb2RlXG4gIGNvbnN0IGRlbCA9ICQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdhZG1pbi1kZWxldGUnKTtcbiAgaWYgKGRlbCkgZGVsLnN0eWxlLmRpc3BsYXkgPSBpc05ld01vZGUgPyAnbm9uZScgOiAnaW5saW5lLWJsb2NrJztcblxuICBzZXRTdGF0dXMoJycpO1xufVxuXG5mdW5jdGlvbiBzZXRTdGF0dXMobXNnOiBzdHJpbmcsIGtpbmQ6ICdvaycgfCAnZXJyJyB8ICcnID0gJycpOiB2b2lkIHtcbiAgY29uc3QgZWwgPSAkKCdhZG1pbi1lZGl0b3Itc3RhdHVzJyk7XG4gIGlmICghZWwpIHJldHVybjtcbiAgZWwudGV4dENvbnRlbnQgPSBtc2c7XG4gIGVsLmNsYXNzTmFtZSA9IGBhZG1pbi1lZGl0b3Itc3RhdHVzICR7a2luZH1gO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0RWRpdG9yQ29tcCgpOiBDb21wIHwgbnVsbCB7XG4gIGNvbnN0IGlkID0gKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLWlkJykhKS52YWx1ZS50cmltKCk7XG4gIGNvbnN0IG5hbWUgPSAoJDxIVE1MSW5wdXRFbGVtZW50PignZmllbGQtbmFtZScpISkudmFsdWUudHJpbSgpO1xuICBpZiAoIWlkIHx8ICFuYW1lKSB7XG4gICAgc2V0U3RhdHVzKCdJRCBhbmQgTmFtZSBhcmUgcmVxdWlyZWQuJywgJ2VycicpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICghL15bYS16MC05XFwtX10rJC9pLnRlc3QoaWQpKSB7XG4gICAgc2V0U3RhdHVzKCdJRCBtdXN0IGNvbnRhaW4gb25seSBsZXR0ZXJzLCBkaWdpdHMsIGRhc2hlcywgdW5kZXJzY29yZXMuJywgJ2VycicpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGV0IHVuaXRzOiBDb21wVW5pdFtdID0gW107XG4gIHRyeSB7XG4gICAgdW5pdHMgPSBKU09OLnBhcnNlKCgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC11bml0cycpISkudmFsdWUgfHwgJ1tdJyk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHVuaXRzKSkgdGhyb3cgbmV3IEVycm9yKCd1bml0cyBtdXN0IGJlIGEgSlNPTiBhcnJheScpO1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICBzZXRTdGF0dXMoYFVuaXRzIEpTT04gaW52YWxpZDogJHtlLm1lc3NhZ2V9YCwgJ2VycicpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qgc3BsaXRDc3YgPSAoczogc3RyaW5nKTogc3RyaW5nW10gPT4gcy5zcGxpdCgnLCcpLm1hcCh4ID0+IHgudHJpbSgpKS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICBuYW1lLFxuICAgIHRpZXI6ICgkPEhUTUxTZWxlY3RFbGVtZW50PignZmllbGQtdGllcicpISkudmFsdWUgYXMgYW55LFxuICAgIHBsYXlzdHlsZTogKCQ8SFRNTFNlbGVjdEVsZW1lbnQ+KCdmaWVsZC1wbGF5c3R5bGUnKSEpLnZhbHVlIGFzIGFueSxcbiAgICBkaWZmaWN1bHR5OiAoJDxIVE1MU2VsZWN0RWxlbWVudD4oJ2ZpZWxkLWRpZmZpY3VsdHknKSEpLnZhbHVlIGFzIGFueSxcbiAgICBsZXZlbDogcGFyc2VJbnQoKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLWxldmVsJykhKS52YWx1ZSwgMTApIHx8IDgsXG4gICAgZGVzY3JpcHRpb246ICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC1kZXNjcmlwdGlvbicpISkudmFsdWUsXG4gICAgY29yZVRyYWl0czogc3BsaXRDc3YoKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLWNvcmUtdHJhaXRzJykhKS52YWx1ZSksXG4gICAgcmVjb21tZW5kZWRBdWdtZW50czogc3BsaXRDc3YoKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLWF1Z21lbnRzJykhKS52YWx1ZSksXG4gICAgYWx0ZXJuYXRpdmVDb21wSWRzOiBzcGxpdENzdigoJDxIVE1MSW5wdXRFbGVtZW50PignZmllbGQtYWx0LWNvbXBzJykhKS52YWx1ZSksXG4gICAgdGFnczogc3BsaXRDc3YoKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLXRhZ3MnKSEpLnZhbHVlKSxcbiAgICB1bml0cyxcbiAgICBlYXJseUdhbWU6ICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC1lYXJseScpISkudmFsdWUgfHwgdW5kZWZpbmVkLFxuICAgIG1pZEdhbWU6ICAgKCQ8SFRNTFRleHRBcmVhRWxlbWVudD4oJ2ZpZWxkLW1pZCcpISkudmFsdWUgICB8fCB1bmRlZmluZWQsXG4gICAgbGF0ZUdhbWU6ICAoJDxIVE1MVGV4dEFyZWFFbGVtZW50PignZmllbGQtbGF0ZScpISkudmFsdWUgIHx8IHVuZGVmaW5lZCxcbiAgICB0aXBzOiAgICAgICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC10aXBzJykhKS52YWx1ZSAgfHwgdW5kZWZpbmVkLFxuICB9O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBBY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVNhdmUoZTogRXZlbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBjb21wID0gY29sbGVjdEVkaXRvckNvbXAoKTtcbiAgaWYgKCFjb21wKSByZXR1cm47XG4gIHNldFN0YXR1cygnU2F2aW5n4oCmJyk7XG4gIHRyeSB7XG4gICAgaWYgKGlzTmV3TW9kZSkge1xuICAgICAgYXdhaXQgYWRtaW5DcmVhdGVDb21wKGNvbXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBhZG1pblVwZGF0ZUNvbXAoY29tcC5pZCwgY29tcCk7XG4gICAgfVxuICAgIHNldFN0YXR1cygnU2F2ZWQg4pyTJywgJ29rJyk7XG4gICAgYXdhaXQgcmVmcmVzaENvbXBzKCk7XG4gICAgc2VsZWN0ZWRJZCA9IGNvbXAuaWQ7XG4gICAgc2hvd0VkaXRvcihjb21wcy5maW5kKGMgPT4gYy5pZCA9PT0gY29tcC5pZCkgfHwgY29tcCk7XG4gICAgcmVuZGVyTGlzdCgoJDxIVE1MSW5wdXRFbGVtZW50PignYWRtaW4tY29tcC1maWx0ZXInKT8udmFsdWUpIHx8ICcnKTtcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICBzZXRTdGF0dXMoYEZhaWxlZDogJHtlcnIubWVzc2FnZSB8fCBlcnJ9YCwgJ2VycicpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZURlbGV0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFzZWxlY3RlZElkKSByZXR1cm47XG4gIGlmICghY29uZmlybShgRGVsZXRlIGNvbXAgXCIke3NlbGVjdGVkSWR9XCIgcGVybWFuZW50bHk/IFRoaXMgYWZmZWN0cyBhbGwgUGl2b3RURlQgdXNlcnMuYCkpIHJldHVybjtcbiAgc2V0U3RhdHVzKCdEZWxldGluZ+KApicpO1xuICB0cnkge1xuICAgIGF3YWl0IGFkbWluRGVsZXRlQ29tcChzZWxlY3RlZElkKTtcbiAgICBzZXRTdGF0dXMoJycpO1xuICAgIHNlbGVjdGVkSWQgPSBudWxsO1xuICAgIGF3YWl0IHJlZnJlc2hDb21wcygpO1xuICAgIGNsZWFyRWRpdG9yKCk7XG4gICAgcmVuZGVyTGlzdCgoJDxIVE1MSW5wdXRFbGVtZW50PignYWRtaW4tY29tcC1maWx0ZXInKT8udmFsdWUpIHx8ICcnKTtcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICBzZXRTdGF0dXMoYERlbGV0ZSBmYWlsZWQ6ICR7ZXJyLm1lc3NhZ2UgfHwgZXJyfWAsICdlcnInKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiByZWZyZXNoQ29tcHMoKTogUHJvbWlzZTx2b2lkPiB7XG4gIHRyeSB7XG4gICAgY29tcHMgPSBhd2FpdCBnZXRDb21wcygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcignW0FkbWluXSBGYWlsZWQgdG8gZmV0Y2ggY29tcHMnLCBlKTtcbiAgICBjb21wcyA9IFtdO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEJvb3Rcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuYXN5bmMgZnVuY3Rpb24gYm9vdCgpIHtcbiAgcmVuZGVySGVhZGVyKCk7XG5cbiAgLy8gUm9sZSBnYXRlXG4gIGlmICghaGFzQXRMZWFzdCgnbW9kZXJhdG9yJykpIHtcbiAgICAkKCdhZG1pbi1tYWluJykhLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgJCgnYWRtaW4tZm9yYmlkZGVuJykhLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgcmVmcmVzaENvbXBzKCk7XG4gIHJlbmRlckxpc3QoKTtcbiAgY2xlYXJFZGl0b3IoKTtcblxuICAvLyBXaXJlIGV2ZW50c1xuICAkKCdhZG1pbi1jbG9zZScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlV2luZG93KTtcbiAgJCgnYWRtaW4tZm9yYmlkZGVuLWNsb3NlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VXaW5kb3cpO1xuICAkKCdhZG1pbi1sb2dvdXQnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IGxvZ291dCgpOyBjbG9zZVdpbmRvdygpOyB9KTtcblxuICAkKCdhZG1pbi1jb21wLWZpbHRlcicpPy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgcmVuZGVyTGlzdCgoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xuICB9KTtcblxuICAkKCdhZG1pbi1jb21wcy1saXN0Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCByb3cgPSAoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KCcuYWRtaW4tY29tcC1yb3cnKTtcbiAgICBpZiAoIXJvdykgcmV0dXJuO1xuICAgIGNvbnN0IGlkID0gcm93LmdldEF0dHJpYnV0ZSgnZGF0YS1jb21wLWlkJyk7XG4gICAgaWYgKCFpZCkgcmV0dXJuO1xuICAgIHNlbGVjdGVkSWQgPSBpZDtcbiAgICBjb25zdCBjb21wID0gY29tcHMuZmluZChjID0+IGMuaWQgPT09IGlkKTtcbiAgICBpZiAoY29tcCkgc2hvd0VkaXRvcihjb21wKTtcbiAgICByZW5kZXJMaXN0KCgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdhZG1pbi1jb21wLWZpbHRlcicpPy52YWx1ZSkgfHwgJycpO1xuICB9KTtcblxuICAkKCdhZG1pbi1uZXctY29tcCcpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBzZWxlY3RlZElkID0gbnVsbDtcbiAgICBzaG93RWRpdG9yKG51bGwpO1xuICB9KTtcblxuICAkKCdhZG1pbi1lZGl0b3ItZm9ybScpPy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBoYW5kbGVTYXZlIGFzIGFueSk7XG4gICQoJ2FkbWluLWRlbGV0ZScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURlbGV0ZSk7XG5cbiAgLy8gLS0tLS0tLSBHdWlkZXMgc2VjdGlvbiB3aXJpbmcgLS0tLS0tLVxuICBzZXR1cFNlY3Rpb25Ub2dnbGUoKTtcbiAgd2lyZUd1aWRlc1VJKCk7XG4gIGF3YWl0IHJlZnJlc2hHdWlkZXMoKTtcbiAgcmVuZGVyR3VpZGVzTGlzdCgpO1xuXG4gIC8vIC0tLS0tLS0gU3RhdHMgc2VjdGlvbiB3aXJpbmcgKGFkbWluLW9ubHkg4oCUIGdhdGVkIGJ5IGJhY2tlbmQgcm9sZSBjaGVjayB0b28pIC0tLS0tLS1cbiAgd2lyZVN0YXRzVUkoKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU2VjdGlvbiB0b2dnbGUgKENvbXBzIHwgR3VpZGVzKVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBzZXR1cFNlY3Rpb25Ub2dnbGUoKSB7XG4gIGNvbnN0IGNvbXBzQnRuID0gJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2FkbWluLXNlY3Rpb24tY29tcHMnKTtcbiAgY29uc3QgZ3VpZGVzQnRuID0gJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2FkbWluLXNlY3Rpb24tZ3VpZGVzJyk7XG4gIGNvbnN0IHN0YXRzQnRuID0gJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2FkbWluLXNlY3Rpb24tc3RhdHMnKTtcbiAgY29uc3QgY29tcHNQYW5lbCA9ICQoJ2FkbWluLXNlY3Rpb24tY29tcHMtcGFuZWwnKTtcbiAgY29uc3QgZ3VpZGVzUGFuZWwgPSAkKCdhZG1pbi1zZWN0aW9uLWd1aWRlcy1wYW5lbCcpO1xuICBjb25zdCBzdGF0c1BhbmVsID0gJCgnYWRtaW4tc2VjdGlvbi1zdGF0cy1wYW5lbCcpO1xuICBjb25zdCBjb21wc0VkaXRvciA9ICQoJ2FkbWluLWVkaXRvci1lbXB0eScpO1xuICBjb25zdCBjb21wc0Zvcm0gPSAkKCdhZG1pbi1lZGl0b3ItZm9ybScpO1xuICBjb25zdCBndWlkZUVtcHR5ID0gJCgnYWRtaW4tZ3VpZGUtZWRpdG9yLWVtcHR5Jyk7XG4gIGNvbnN0IGd1aWRlRm9ybSA9ICQoJ2FkbWluLWd1aWRlLWZvcm0nKTtcbiAgY29uc3Qgc3RhdHNNYWluID0gJCgnYWRtaW4tc3RhdHMtcGFuZWwnKTtcblxuICBjb25zdCBhcHBseSA9IChzZWN0aW9uOiAnY29tcHMnIHwgJ2d1aWRlcycgfCAnc3RhdHMnKSA9PiB7XG4gICAgYWN0aXZlU2VjdGlvbiA9IHNlY3Rpb247XG4gICAgY29tcHNCdG4/LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScsIHNlY3Rpb24gPT09ICdjb21wcycpO1xuICAgIGd1aWRlc0J0bj8uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgc2VjdGlvbiA9PT0gJ2d1aWRlcycpO1xuICAgIHN0YXRzQnRuPy5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBzZWN0aW9uID09PSAnc3RhdHMnKTtcbiAgICBpZiAoY29tcHNQYW5lbCkgIGNvbXBzUGFuZWwuc3R5bGUuZGlzcGxheSAgPSBzZWN0aW9uID09PSAnY29tcHMnICA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgaWYgKGd1aWRlc1BhbmVsKSBndWlkZXNQYW5lbC5zdHlsZS5kaXNwbGF5ID0gc2VjdGlvbiA9PT0gJ2d1aWRlcycgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgIGlmIChzdGF0c1BhbmVsKSAgc3RhdHNQYW5lbC5zdHlsZS5kaXNwbGF5ICA9IHNlY3Rpb24gPT09ICdzdGF0cycgID8gJ2Jsb2NrJyA6ICdub25lJztcblxuICAgIC8vIEhpZGUgZXZlcnkgZWRpdG9yIHN1cmZhY2UgZmlyc3Q7IHRoZSBhY3RpdmUgc2VjdGlvbiByZS1zaG93cyBpdHMgb3duLlxuICAgIGlmIChjb21wc0VkaXRvcikgY29tcHNFZGl0b3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBpZiAoY29tcHNGb3JtKSAgIGNvbXBzRm9ybS5zdHlsZS5kaXNwbGF5ICAgPSAnbm9uZSc7XG4gICAgaWYgKGd1aWRlRW1wdHkpICBndWlkZUVtcHR5LnN0eWxlLmRpc3BsYXkgID0gJ25vbmUnO1xuICAgIGlmIChndWlkZUZvcm0pICAgZ3VpZGVGb3JtLnN0eWxlLmRpc3BsYXkgICA9ICdub25lJztcbiAgICBpZiAoc3RhdHNNYWluKSAgIHN0YXRzTWFpbi5zdHlsZS5kaXNwbGF5ICAgPSAnbm9uZSc7XG5cbiAgICBpZiAoc2VjdGlvbiA9PT0gJ2NvbXBzJykge1xuICAgICAgY29uc3Qgc2hvd2luZ0Zvcm0gPSBzZWxlY3RlZElkICE9PSBudWxsIHx8IGlzTmV3TW9kZTtcbiAgICAgIGlmIChjb21wc0VkaXRvcikgY29tcHNFZGl0b3Iuc3R5bGUuZGlzcGxheSA9IHNob3dpbmdGb3JtID8gJ25vbmUnIDogJ2Jsb2NrJztcbiAgICAgIGlmIChjb21wc0Zvcm0pICAgY29tcHNGb3JtLnN0eWxlLmRpc3BsYXkgICA9IHNob3dpbmdGb3JtID8gJ2ZsZXgnIDogJ25vbmUnO1xuICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gJ2d1aWRlcycpIHtcbiAgICAgIGNvbnN0IHNob3dpbmdGb3JtID0gc2VsZWN0ZWRTbHVnICE9PSBudWxsIHx8IGlzTmV3R3VpZGVNb2RlO1xuICAgICAgaWYgKGd1aWRlRW1wdHkpIGd1aWRlRW1wdHkuc3R5bGUuZGlzcGxheSA9IHNob3dpbmdGb3JtID8gJ25vbmUnIDogJ2Jsb2NrJztcbiAgICAgIGlmIChndWlkZUZvcm0pICBndWlkZUZvcm0uc3R5bGUuZGlzcGxheSAgPSBzaG93aW5nRm9ybSA/ICdmbGV4JyA6ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHN0YXRzTWFpbikgc3RhdHNNYWluLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgLy8gUmVmcmVzaCBvbiBlbnRyeSBzbyB0aGUgcGFuZWwgbmV2ZXIgc2hvd3Mgc3RhbGUgZGF0YSBhZnRlciBuYXZpZ2F0aW9uLlxuICAgICAgcmVmcmVzaFN0YXRzSGVhbHRoKCkuY2F0Y2goKCkgPT4gey8qIGVycm9yIGFscmVhZHkgc3VyZmFjZWQgaW5saW5lICovfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbXBzQnRuPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICAoKSA9PiBhcHBseSgnY29tcHMnKSk7XG4gIGd1aWRlc0J0bj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBhcHBseSgnZ3VpZGVzJykpO1xuICBzdGF0c0J0bj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAgKCkgPT4gYXBwbHkoJ3N0YXRzJykpO1xuICBhcHBseSgnY29tcHMnKTsgIC8vIGluaXRpYWxcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gR3VpZGVzIOKAlCBsaXN0IC8gZWRpdG9yIC8gQ1JVRFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5hc3luYyBmdW5jdGlvbiByZWZyZXNoR3VpZGVzKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFkbWluRmV0Y2g8eyBndWlkZXM6IEd1aWRlU3VtbWFyeVtdIH0+KCcvZ3VpZGVzJyk7XG4gICAgZ3VpZGVzID0gcmVzLmd1aWRlcyB8fCBbXTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tBZG1pbl0gZmFpbGVkIHRvIGxvYWQgZ3VpZGVzJywgZSk7XG4gICAgZ3VpZGVzID0gW107XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyR3VpZGVzTGlzdChmaWx0ZXIgPSAnJykge1xuICBjb25zdCBsaXN0ID0gJCgnYWRtaW4tZ3VpZGVzLWxpc3QnKTtcbiAgaWYgKCFsaXN0KSByZXR1cm47XG4gIGNvbnN0IGYgPSBmaWx0ZXIudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gIGNvbnN0IGZpbHRlcmVkID0gZlxuICAgID8gZ3VpZGVzLmZpbHRlcihnID0+IGcudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmKSB8fCBnLnNsdWcudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmKSlcbiAgICA6IGd1aWRlcztcbiAgaWYgKGZpbHRlcmVkLmxlbmd0aCA9PT0gMCkge1xuICAgIGxpc3QuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJhZG1pbi1lbXB0eVwiPk5vIGd1aWRlcy48L2Rpdj4nO1xuICAgIHJldHVybjtcbiAgfVxuICBsaXN0LmlubmVySFRNTCA9IGZpbHRlcmVkLm1hcChnID0+IGBcbiAgICA8YnV0dG9uIGNsYXNzPVwiYWRtaW4tY29tcC1yb3cgJHtnLnNsdWcgPT09IHNlbGVjdGVkU2x1ZyA/ICdzZWxlY3RlZCcgOiAnJ31cIiBkYXRhLWd1aWRlLXNsdWc9XCIke2VzY2FwZUh0bWwoZy5zbHVnKX1cIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYWRtaW4tY29tcC10aWVyXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiM0NzU1Njk7Y29sb3I6I2ZmZjtcIj7wn5OWPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhZG1pbi1jb21wLW5hbWVcIj4ke2VzY2FwZUh0bWwoZy50aXRsZSl9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhZG1pbi1jb21wLWlkXCI+JHtlc2NhcGVIdG1sKGcuc2x1Zyl9PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICBgKS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJHdWlkZUVkaXRvcigpIHtcbiAgY29uc3QgZW1wdHkgPSAkKCdhZG1pbi1ndWlkZS1lZGl0b3ItZW1wdHknKTtcbiAgY29uc3QgZm9ybSA9ICQoJ2FkbWluLWd1aWRlLWZvcm0nKTtcbiAgaWYgKGVtcHR5KSBlbXB0eS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgaWYgKGZvcm0pIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgc2V0R3VpZGVTdGF0dXMoJycpO1xufVxuXG5mdW5jdGlvbiBzaG93R3VpZGVFZGl0b3IoZ3VpZGU6IEd1aWRlRGV0YWlsIHwgbnVsbCkge1xuICBjb25zdCBlbXB0eSA9ICQoJ2FkbWluLWd1aWRlLWVkaXRvci1lbXB0eScpO1xuICBjb25zdCBmb3JtID0gJCgnYWRtaW4tZ3VpZGUtZm9ybScpO1xuICBpZiAoZW1wdHkpIGVtcHR5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGlmIChmb3JtKSBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cbiAgaXNOZXdHdWlkZU1vZGUgPSBndWlkZSA9PT0gbnVsbDtcbiAgY29uc3QgdGl0bGUgPSAkKCdhZG1pbi1ndWlkZS10aXRsZScpO1xuICBpZiAodGl0bGUpIHRpdGxlLnRleHRDb250ZW50ID0gaXNOZXdHdWlkZU1vZGUgPyAnTmV3IGd1aWRlJyA6ICdFZGl0IGd1aWRlJztcblxuICBjb25zdCBzbHVnSW5wdXQgPSAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdndWlkZS1zbHVnJyk7XG4gIGlmIChzbHVnSW5wdXQpIHtcbiAgICBzbHVnSW5wdXQudmFsdWUgPSBndWlkZT8uc2x1ZyB8fCAnJztcbiAgICBzbHVnSW5wdXQuZGlzYWJsZWQgPSAhaXNOZXdHdWlkZU1vZGU7XG4gIH1cbiAgKCQ8SFRNTElucHV0RWxlbWVudD4oJ2d1aWRlLXRpdGxlLWZpZWxkJykhKS52YWx1ZSA9IGd1aWRlPy50aXRsZSB8fCAnJztcbiAgKCQ8SFRNTElucHV0RWxlbWVudD4oJ2d1aWRlLXN1bW1hcnknKSEpLnZhbHVlID0gZ3VpZGU/LnN1bW1hcnkgfHwgJyc7XG4gICgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdndWlkZS10YWdzJykhKS52YWx1ZSA9IChndWlkZT8udGFncyB8fCBbXSkuam9pbignLCAnKTtcbiAgKCQ8SFRNTElucHV0RWxlbWVudD4oJ2d1aWRlLXB1Ymxpc2hlZCcpISkuY2hlY2tlZCA9IGd1aWRlPy5pc1B1Ymxpc2hlZCAhPT0gZmFsc2U7XG4gICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdndWlkZS1ib2R5LW1kJykhKS52YWx1ZSA9IGd1aWRlPy5ib2R5TWQgfHwgJyc7XG5cbiAgY29uc3QgZGVsID0gJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2FkbWluLWd1aWRlLWRlbGV0ZScpO1xuICBpZiAoZGVsKSBkZWwuc3R5bGUuZGlzcGxheSA9IGlzTmV3R3VpZGVNb2RlID8gJ25vbmUnIDogJ2lubGluZS1ibG9jayc7XG5cbiAgdXBkYXRlR3VpZGVQcmV2aWV3KCk7XG4gIHNldEd1aWRlU3RhdHVzKCcnKTtcbn1cblxuZnVuY3Rpb24gc2V0R3VpZGVTdGF0dXMobXNnOiBzdHJpbmcsIGtpbmQ6ICdvaycgfCAnZXJyJyB8ICcnID0gJycpIHtcbiAgY29uc3QgZWwgPSAkKCdhZG1pbi1ndWlkZS1zdGF0dXMnKTtcbiAgaWYgKCFlbCkgcmV0dXJuO1xuICBlbC50ZXh0Q29udGVudCA9IG1zZztcbiAgZWwuY2xhc3NOYW1lID0gYGFkbWluLWVkaXRvci1zdGF0dXMgJHtraW5kfWA7XG59XG5cbmZ1bmN0aW9uIHdpcmVHdWlkZXNVSSgpIHtcbiAgJCgnYWRtaW4tZ3VpZGUtZmlsdGVyJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcbiAgICByZW5kZXJHdWlkZXNMaXN0KChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG4gIH0pO1xuXG4gICQoJ2FkbWluLWd1aWRlcy1saXN0Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGUpID0+IHtcbiAgICBjb25zdCByb3cgPSAoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KCdbZGF0YS1ndWlkZS1zbHVnXScpO1xuICAgIGlmICghcm93KSByZXR1cm47XG4gICAgY29uc3Qgc2x1ZyA9IHJvdy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ3VpZGUtc2x1ZycpO1xuICAgIGlmICghc2x1ZykgcmV0dXJuO1xuICAgIHNlbGVjdGVkU2x1ZyA9IHNsdWc7XG4gICAgc2V0R3VpZGVTdGF0dXMoJ0xvYWRpbmfigKYnKTtcbiAgICB0cnkge1xuICAgICAgLy8gUHVibGljIEdFVCAvZ3VpZGVzLzpzbHVnIHJldHVybnMgdGhlIGZ1bGwgYm9keVxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgYWRtaW5GZXRjaDxHdWlkZURldGFpbD4oYC9ndWlkZXMvJHtlbmNvZGVVUklDb21wb25lbnQoc2x1Zyl9YCk7XG4gICAgICBzaG93R3VpZGVFZGl0b3IocmVzKTtcbiAgICAgIHJlbmRlckd1aWRlc0xpc3QoKCQ8SFRNTElucHV0RWxlbWVudD4oJ2FkbWluLWd1aWRlLWZpbHRlcicpPy52YWx1ZSkgfHwgJycpO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBzZXRHdWlkZVN0YXR1cyhgQ291bGQgbm90IGxvYWQ6ICR7ZXJyLm1lc3NhZ2UgfHwgZXJyfWAsICdlcnInKTtcbiAgICB9XG4gIH0pO1xuXG4gICQoJ2FkbWluLW5ldy1ndWlkZScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBzZWxlY3RlZFNsdWcgPSBudWxsO1xuICAgIHNob3dHdWlkZUVkaXRvcihudWxsKTtcbiAgfSk7XG5cbiAgLy8gTGl2ZSBtYXJrZG93biBwcmV2aWV3IOKAlCBkZWJvdW5jZWQgcmVwYWludCBvbiB0ZXh0YXJlYSBpbnB1dFxuICBsZXQgcHJldmlld1RpbWVyOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgJCgnZ3VpZGUtYm9keS1tZCcpPy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICBpZiAocHJldmlld1RpbWVyKSB3aW5kb3cuY2xlYXJUaW1lb3V0KHByZXZpZXdUaW1lcik7XG4gICAgcHJldmlld1RpbWVyID0gd2luZG93LnNldFRpbWVvdXQodXBkYXRlR3VpZGVQcmV2aWV3LCAxNTApO1xuICB9KTtcblxuICAkKCdhZG1pbi1ndWlkZS1mb3JtJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGhhbmRsZUd1aWRlU2F2ZSBhcyBhbnkpO1xuICAkKCdhZG1pbi1ndWlkZS1kZWxldGUnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVHdWlkZURlbGV0ZSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUd1aWRlUHJldmlldygpIHtcbiAgY29uc3QgdGEgPSAkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdndWlkZS1ib2R5LW1kJyk7XG4gIGNvbnN0IG91dCA9ICQoJ2d1aWRlLXByZXZpZXcnKTtcbiAgaWYgKCF0YSB8fCAhb3V0KSByZXR1cm47XG4gIG91dC5pbm5lckhUTUwgPSByZW5kZXJNYXJrZG93bklubGluZSh0YS52YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3RHdWlkZUJvZHkoKTogeyBzbHVnOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IHN1bW1hcnk6IHN0cmluZzsgYm9keU1kOiBzdHJpbmc7IHRhZ3M6IHN0cmluZzsgaXNQdWJsaXNoZWQ6IGJvb2xlYW47IH0gfCBudWxsIHtcbiAgY29uc3Qgc2x1ZyA9ICgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdndWlkZS1zbHVnJykhKS52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgdGl0bGUgPSAoJDxIVE1MSW5wdXRFbGVtZW50PignZ3VpZGUtdGl0bGUtZmllbGQnKSEpLnZhbHVlLnRyaW0oKTtcbiAgY29uc3QgYm9keU1kID0gKCQ8SFRNTFRleHRBcmVhRWxlbWVudD4oJ2d1aWRlLWJvZHktbWQnKSEpLnZhbHVlO1xuICBpZiAoIXNsdWcgfHwgIS9eW2EtejAtOVxcLV0rJC8udGVzdChzbHVnKSkge1xuICAgIHNldEd1aWRlU3RhdHVzKCdTbHVnIG11c3QgYmUgbG93ZXJjYXNlIGxldHRlcnMsIGRpZ2l0cywgZGFzaGVzIG9ubHkuJywgJ2VycicpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICghdGl0bGUpIHsgc2V0R3VpZGVTdGF0dXMoJ1RpdGxlIGlzIHJlcXVpcmVkLicsICdlcnInKTsgcmV0dXJuIG51bGw7IH1cbiAgaWYgKCFib2R5TWQudHJpbSgpKSB7IHNldEd1aWRlU3RhdHVzKCdCb2R5IGNhbm5vdCBiZSBlbXB0eS4nLCAnZXJyJyk7IHJldHVybiBudWxsOyB9XG4gIHJldHVybiB7XG4gICAgc2x1ZywgdGl0bGUsIGJvZHlNZCxcbiAgICBzdW1tYXJ5OiAoJDxIVE1MSW5wdXRFbGVtZW50PignZ3VpZGUtc3VtbWFyeScpISkudmFsdWUudHJpbSgpLFxuICAgIHRhZ3M6ICgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdndWlkZS10YWdzJykhKS52YWx1ZS50cmltKCksXG4gICAgaXNQdWJsaXNoZWQ6ICgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdndWlkZS1wdWJsaXNoZWQnKSEpLmNoZWNrZWQsXG4gIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUd1aWRlU2F2ZShlOiBFdmVudCkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGJvZHkgPSBjb2xsZWN0R3VpZGVCb2R5KCk7XG4gIGlmICghYm9keSkgcmV0dXJuO1xuICBzZXRHdWlkZVN0YXR1cygnU2F2aW5n4oCmJyk7XG4gIHRyeSB7XG4gICAgaWYgKGlzTmV3R3VpZGVNb2RlKSB7XG4gICAgICBhd2FpdCBhZG1pbkZldGNoKCcvYWRtaW4vZ3VpZGVzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHNsdWc6IGJvZHkuc2x1ZywgdGl0bGU6IGJvZHkudGl0bGUsIHN1bW1hcnk6IGJvZHkuc3VtbWFyeSxcbiAgICAgICAgICBib2R5TWQ6IGJvZHkuYm9keU1kLCB0YWdzOiBib2R5LnRhZ3MsIGlzUHVibGlzaGVkOiBib2R5LmlzUHVibGlzaGVkLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBhZG1pbkZldGNoKGAvYWRtaW4vZ3VpZGVzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KGJvZHkuc2x1Zyl9YCwge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgdGl0bGU6IGJvZHkudGl0bGUsIHN1bW1hcnk6IGJvZHkuc3VtbWFyeSxcbiAgICAgICAgICBib2R5TWQ6IGJvZHkuYm9keU1kLCB0YWdzOiBib2R5LnRhZ3MsIGlzUHVibGlzaGVkOiBib2R5LmlzUHVibGlzaGVkLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBzZXRHdWlkZVN0YXR1cygnU2F2ZWQg4pyTJywgJ29rJyk7XG4gICAgaXNOZXdHdWlkZU1vZGUgPSBmYWxzZTtcbiAgICBzZWxlY3RlZFNsdWcgPSBib2R5LnNsdWc7XG4gICAgYXdhaXQgcmVmcmVzaEd1aWRlcygpO1xuICAgIHJlbmRlckd1aWRlc0xpc3QoKCQ8SFRNTElucHV0RWxlbWVudD4oJ2FkbWluLWd1aWRlLWZpbHRlcicpPy52YWx1ZSkgfHwgJycpO1xuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIHNldEd1aWRlU3RhdHVzKGBGYWlsZWQ6ICR7ZXJyLm1lc3NhZ2UgfHwgZXJyfWAsICdlcnInKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVHdWlkZURlbGV0ZSgpIHtcbiAgaWYgKCFzZWxlY3RlZFNsdWcpIHJldHVybjtcbiAgaWYgKCFjb25maXJtKGBEZWxldGUgZ3VpZGUgXCIke3NlbGVjdGVkU2x1Z31cIiBwZXJtYW5lbnRseT9gKSkgcmV0dXJuO1xuICBzZXRHdWlkZVN0YXR1cygnRGVsZXRpbmfigKYnKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBhZG1pbkZldGNoKGAvYWRtaW4vZ3VpZGVzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KHNlbGVjdGVkU2x1Zyl9YCwgeyBtZXRob2Q6ICdERUxFVEUnIH0pO1xuICAgIHNlbGVjdGVkU2x1ZyA9IG51bGw7XG4gICAgYXdhaXQgcmVmcmVzaEd1aWRlcygpO1xuICAgIHJlbmRlckd1aWRlc0xpc3QoKCQ8SFRNTElucHV0RWxlbWVudD4oJ2FkbWluLWd1aWRlLWZpbHRlcicpPy52YWx1ZSkgfHwgJycpO1xuICAgIGNsZWFyR3VpZGVFZGl0b3IoKTtcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICBzZXRHdWlkZVN0YXR1cyhgRGVsZXRlIGZhaWxlZDogJHtlcnIubWVzc2FnZSB8fCBlcnJ9YCwgJ2VycicpO1xuICB9XG59XG5cbi8vIElubGluZSBtYXJrZG93biByZW5kZXJlciDigJQgaWRlbnRpY2FsIHJ1bGVzIHRvIEd1aWRlc1JlbmRlcmVyXG5mdW5jdGlvbiByZW5kZXJNYXJrZG93bklubGluZShtZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZSA9IChzOiBzdHJpbmcpID0+IHMucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbiAgY29uc3QgbGluZXMgPSBlKG1kKS5zcGxpdCgnXFxuJyk7XG4gIGNvbnN0IG91dDogc3RyaW5nW10gPSBbXTtcbiAgbGV0IGluTGlzdCA9IGZhbHNlO1xuICBsZXQgcGFyYTogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgZmx1c2hQID0gKCkgPT4geyBpZiAocGFyYS5sZW5ndGgpIHsgb3V0LnB1c2goYDxwPiR7aW5saW5lKHBhcmEuam9pbignICcpKX08L3A+YCk7IHBhcmEgPSBbXTsgfSB9O1xuICBjb25zdCBjbG9zZVVsID0gKCkgPT4geyBpZiAoaW5MaXN0KSB7IG91dC5wdXNoKCc8L3VsPicpOyBpbkxpc3QgPSBmYWxzZTsgfSB9O1xuICBmb3IgKGNvbnN0IGxuIG9mIGxpbmVzKSB7XG4gICAgY29uc3QgdCA9IGxuLnRyaW0oKTtcbiAgICBpZiAoIXQpIHsgZmx1c2hQKCk7IGNsb3NlVWwoKTsgY29udGludWU7IH1cbiAgICBjb25zdCBoID0gdC5tYXRjaCgvXigjezEsNH0pXFxzKyguKykkLyk7XG4gICAgaWYgKGgpIHsgZmx1c2hQKCk7IGNsb3NlVWwoKTsgb3V0LnB1c2goYDxoJHtoWzFdLmxlbmd0aCArIDF9PiR7aW5saW5lKGhbMl0pfTwvaCR7aFsxXS5sZW5ndGggKyAxfT5gKTsgY29udGludWU7IH1cbiAgICBpZiAoL15bLSpdXFxzKy8udGVzdCh0KSkgeyBmbHVzaFAoKTsgaWYgKCFpbkxpc3QpIHsgb3V0LnB1c2goJzx1bD4nKTsgaW5MaXN0ID0gdHJ1ZTsgfSBvdXQucHVzaChgPGxpPiR7aW5saW5lKHQucmVwbGFjZSgvXlstKl1cXHMrLywgJycpKX08L2xpPmApOyBjb250aW51ZTsgfVxuICAgIGNsb3NlVWwoKTtcbiAgICBwYXJhLnB1c2godCk7XG4gIH1cbiAgZmx1c2hQKCk7IGNsb3NlVWwoKTtcbiAgcmV0dXJuIG91dC5qb2luKCdcXG4nKTtcbn1cblxuZnVuY3Rpb24gaW5saW5lKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzXG4gICAgLnJlcGxhY2UoL1xcKlxcKihbXipdKylcXCpcXCovZywgJzxzdHJvbmc+JDE8L3N0cm9uZz4nKVxuICAgIC5yZXBsYWNlKC9cXCooW14qXSspXFwqL2csICc8ZW0+JDE8L2VtPicpXG4gICAgLnJlcGxhY2UoL2AoW15gXSspYC9nLCAnPGNvZGU+JDE8L2NvZGU+JylcbiAgICAucmVwbGFjZSgvXFxbKFteXFxdXSspXFxdXFwoKGh0dHBzPzpcXC9cXC9bXilcXHNdKylcXCkvZywgKF9tLCB0ZXh0LCB1cmwpID0+IGA8YSBocmVmPVwiJHt1cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIj4ke3RleHR9PC9hPmApO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTdGF0cyBhZ2dyZWdhdG9yIOKAlCBoZWFsdGggcGFuZWwgKyBSdW4gTm93XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHdpcmVTdGF0c1VJKCkge1xuICAkKCdhZG1pbi1zdGF0cy1ydW4nKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVTdGF0c1J1bik7XG4gICQoJ2FkbWluLXN0YXRzLXJlZnJlc2gnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcmVmcmVzaFN0YXRzSGVhbHRoKCkuY2F0Y2goKCkgPT4gey8qIHN1cmZhY2VkIGlubGluZSAqL30pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0U3RhdHNTdGF0dXMobXNnOiBzdHJpbmcsIGtpbmQ6ICdvaycgfCAnZXJyJyB8ICcnID0gJycpIHtcbiAgY29uc3QgZWwgPSAkKCdhZG1pbi1zdGF0cy1zdGF0dXMnKTtcbiAgaWYgKCFlbCkgcmV0dXJuO1xuICBlbC50ZXh0Q29udGVudCA9IG1zZztcbiAgZWwuY2xhc3NOYW1lID0gYGFkbWluLWVkaXRvci1zdGF0dXMgJHtraW5kfWA7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hTdGF0c0hlYWx0aCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3Qgc3VtbWFyeSA9ICQoJ2FkbWluLXN0YXRzLXN1bW1hcnknKTtcbiAgaWYgKHN1bW1hcnkpIHN1bW1hcnkudGV4dENvbnRlbnQgPSAnTG9hZGluZ+KApic7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYWRtaW5GZXRjaDx7IG9rOiBib29sZWFuOyBoZWFsdGg6IFN0YXRzSGVhbHRoIH0+KCcvYWRtaW4vc3RhdHMvaGVhbHRoJyk7XG4gICAgcmVuZGVyU3RhdHNIZWFsdGgocmVzLmhlYWx0aCk7XG4gICAgc2V0U3RhdHNTdGF0dXMoJycpO1xuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIGlmIChzdW1tYXJ5KSBzdW1tYXJ5LnRleHRDb250ZW50ID0gJyc7XG4gICAgc2V0U3RhdHNTdGF0dXMoYEZhaWxlZCB0byBsb2FkOiAke2Vyci5tZXNzYWdlIHx8IGVycn1gLCAnZXJyJyk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlU3RhdHNSdW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGJ0biA9ICQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdhZG1pbi1zdGF0cy1ydW4nKTtcbiAgaWYgKGJ0bikgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgc2V0U3RhdHNTdGF0dXMoJ1J1bm5pbmcgY3JvbiB0aWNr4oCmJyk7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYWRtaW5GZXRjaDx7IG9rOiBib29sZWFuOyByZXN1bHQ6IGFueSB9PignL2FkbWluL3N0YXRzL3J1bicsIHsgbWV0aG9kOiAnUE9TVCcgfSk7XG4gICAgY29uc3QgciA9IHJlcy5yZXN1bHQgfHwge307XG4gICAgc2V0U3RhdHNTdGF0dXMoXG4gICAgICBgRG9uZTogY29ob3J0ICMke3IuY29ob3J0SWR4fSAke3IucmVnaW9ufS8ke3IudGllcn0g4oCUIHByb2Nlc3NlZCAke3IucHJvY2Vzc2VkfSAoJHtyLnNraXBwZWR9IHNraXBwZWQsICR7ci5lcnJvcnN9IGVycm9ycywgJHtyLmR1cmF0aW9uTXN9bXMpYCxcbiAgICAgIHIuZXJyb3JzID4gMCA/ICdlcnInIDogJ29rJ1xuICAgICk7XG4gICAgYXdhaXQgcmVmcmVzaFN0YXRzSGVhbHRoKCk7XG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgc2V0U3RhdHNTdGF0dXMoYFJ1biBmYWlsZWQ6ICR7ZXJyLm1lc3NhZ2UgfHwgZXJyfWAsICdlcnInKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoYnRuKSBidG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWxhdGl2ZVRpbWUodW5peDogbnVtYmVyIHwgbnVsbCk6IHN0cmluZyB7XG4gIGlmICghdW5peCkgcmV0dXJuICduZXZlcic7XG4gIGNvbnN0IGRlbHRhID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCkgLSB1bml4O1xuICBpZiAoZGVsdGEgPCAwKSByZXR1cm4gJ2p1c3Qgbm93JztcbiAgaWYgKGRlbHRhIDwgNjApIHJldHVybiBgJHtkZWx0YX1zIGFnb2A7XG4gIGlmIChkZWx0YSA8IDM2MDApIHJldHVybiBgJHtNYXRoLmZsb29yKGRlbHRhIC8gNjApfW0gYWdvYDtcbiAgaWYgKGRlbHRhIDwgODY0MDApIHJldHVybiBgJHtNYXRoLmZsb29yKGRlbHRhIC8gMzYwMCl9aCBhZ29gO1xuICByZXR1cm4gYCR7TWF0aC5mbG9vcihkZWx0YSAvIDg2NDAwKX1kIGFnb2A7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclN0YXRzSGVhbHRoKGg6IFN0YXRzSGVhbHRoKTogdm9pZCB7XG4gIGNvbnN0IHN1bW1hcnkgPSAkKCdhZG1pbi1zdGF0cy1zdW1tYXJ5Jyk7XG4gIGlmIChzdW1tYXJ5KSB7XG4gICAgc3VtbWFyeS5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYWRtaW4tc3RhdC10aWxlXCI+PGRpdiBjbGFzcz1cImFkbWluLXN0YXQtbGFiZWxcIj5NYXRjaGVzIHByb2Nlc3NlZDwvZGl2PjxkaXYgY2xhc3M9XCJhZG1pbi1zdGF0LXZhbHVlXCI+JHtoLnRvdGFscy5wcm9jZXNzZWRNYXRjaGVzLnRvTG9jYWxlU3RyaW5nKCl9PC9kaXY+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWRtaW4tc3RhdC10aWxlXCI+PGRpdiBjbGFzcz1cImFkbWluLXN0YXQtbGFiZWxcIj5MYWRkZXIgY2FjaGVkPC9kaXY+PGRpdiBjbGFzcz1cImFkbWluLXN0YXQtdmFsdWVcIj4ke2gudG90YWxzLmxhZGRlckVudHJpZXMudG9Mb2NhbGVTdHJpbmcoKX08L2Rpdj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhZG1pbi1zdGF0LXRpbGVcIj48ZGl2IGNsYXNzPVwiYWRtaW4tc3RhdC1sYWJlbFwiPkF1Z21lbnQgcm93czwvZGl2PjxkaXYgY2xhc3M9XCJhZG1pbi1zdGF0LXZhbHVlXCI+JHtoLnRvdGFscy5hdWdtZW50Um93cy50b0xvY2FsZVN0cmluZygpfTwvZGl2PjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFkbWluLXN0YXQtdGlsZVwiPjxkaXYgY2xhc3M9XCJhZG1pbi1zdGF0LWxhYmVsXCI+Q29tcCByb3dzPC9kaXY+PGRpdiBjbGFzcz1cImFkbWluLXN0YXQtdmFsdWVcIj4ke2gudG90YWxzLmNvbXBSb3dzLnRvTG9jYWxlU3RyaW5nKCl9PC9kaXY+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWRtaW4tc3RhdC10aWxlXCI+PGRpdiBjbGFzcz1cImFkbWluLXN0YXQtbGFiZWxcIj5Vbml0IHJvd3M8L2Rpdj48ZGl2IGNsYXNzPVwiYWRtaW4tc3RhdC12YWx1ZVwiPiR7aC50b3RhbHMudW5pdFJvd3MudG9Mb2NhbGVTdHJpbmcoKX08L2Rpdj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhZG1pbi1zdGF0LXRpbGVcIj48ZGl2IGNsYXNzPVwiYWRtaW4tc3RhdC1sYWJlbFwiPkl0ZW0gcm93czwvZGl2PjxkaXYgY2xhc3M9XCJhZG1pbi1zdGF0LXZhbHVlXCI+JHtoLnRvdGFscy5pdGVtUm93cy50b0xvY2FsZVN0cmluZygpfTwvZGl2PjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFkbWluLXN0YXQtdGlsZVwiPjxkaXYgY2xhc3M9XCJhZG1pbi1zdGF0LWxhYmVsXCI+Q29ob3J0czwvZGl2PjxkaXYgY2xhc3M9XCJhZG1pbi1zdGF0LXZhbHVlXCI+JHtoLmNvaG9ydENvdW50fTwvZGl2PjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFkbWluLXN0YXQtdGlsZVwiPjxkaXYgY2xhc3M9XCJhZG1pbi1zdGF0LWxhYmVsXCI+TmV4dCBjb2hvcnQ8L2Rpdj48ZGl2IGNsYXNzPVwiYWRtaW4tc3RhdC12YWx1ZVwiIHN0eWxlPVwiZm9udC1zaXplOjE0cHg7XCI+JHtlc2NhcGVIdG1sKGgubmV4dENvaG9ydC5yZWdpb24pfSAvICR7ZXNjYXBlSHRtbChoLm5leHRDb2hvcnQudGllcil9PC9kaXY+PC9kaXY+XG4gICAgYDtcbiAgfVxuXG4gIGNvbnN0IGNvaG9ydHMgPSAkKCdhZG1pbi1zdGF0cy1jb2hvcnRzJyk7XG4gIGlmIChjb2hvcnRzKSB7XG4gICAgY29uc3Qgcm93cyA9IGguY29ob3J0cy5tYXAoYyA9PiB7XG4gICAgICBjb25zdCBzdGFsZSA9ICFjLmxhc3RSdW5BdCB8fCAoTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCkgLSBjLmxhc3RSdW5BdCkgPiA2ICogMzYwMDtcbiAgICAgIHJldHVybiBgPHRyIGNsYXNzPVwiJHtzdGFsZSA/ICdzdGFsZScgOiAnJ31cIj5cbiAgICAgICAgPHRkPiR7ZXNjYXBlSHRtbChjLnJlZ2lvbil9PC90ZD5cbiAgICAgICAgPHRkPiR7ZXNjYXBlSHRtbChjLnRpZXIpfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2VzY2FwZUh0bWwoYy5yYW5rQnVja2V0KX08L3RkPlxuICAgICAgICA8dGQ+JHtlc2NhcGVIdG1sKGMucGF0Y2gpfTwvdGQ+XG4gICAgICAgIDx0ZD4ke3JlbGF0aXZlVGltZShjLmxhc3RSdW5BdCl9PC90ZD5cbiAgICAgICAgPHRkPiR7Yy5sYXN0UHJvY2Vzc2VkfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2MubGFzdEVycm9ycyA+IDAgPyBgPHNwYW4gY2xhc3M9XCJiYWRcIj4ke2MubGFzdEVycm9yc308L3NwYW4+YCA6ICcwJ308L3RkPlxuICAgICAgPC90cj5gO1xuICAgIH0pLmpvaW4oJycpO1xuICAgIGNvaG9ydHMuaW5uZXJIVE1MID0gYFxuICAgICAgPGgzPkNvaG9ydCByb3RhdGlvbiAoJHtoLmNvaG9ydHMubGVuZ3RofSk8L2gzPlxuICAgICAgPHRhYmxlIGNsYXNzPVwiYWRtaW4tc3RhdHMtdGFibGVcIj5cbiAgICAgICAgPHRoZWFkPjx0cj48dGg+UmVnaW9uPC90aD48dGg+VGllcjwvdGg+PHRoPkJ1Y2tldDwvdGg+PHRoPlBhdGNoPC90aD48dGg+TGFzdCBydW48L3RoPjx0aD5Qcm9jZXNzZWQ8L3RoPjx0aD5FcnJvcnM8L3RoPjwvdHI+PC90aGVhZD5cbiAgICAgICAgPHRib2R5PiR7cm93c308L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgICBgO1xuICB9XG5cbiAgY29uc3Qgc2xpY2VzID0gJCgnYWRtaW4tc3RhdHMtc2xpY2VzJyk7XG4gIGlmIChzbGljZXMpIHtcbiAgICBpZiAoaC5zbGljZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBzbGljZXMuaW5uZXJIVE1MID0gJzxoMz5TbGljZSB0b3RhbHM8L2gzPjxwIGNsYXNzPVwiYWRtaW4taGVscFwiPk5vIHNsaWNlcyB5ZXQg4oCUIGZpcnN0IGNyb24gdGljayBoYXMgbm90IGxhbmRlZC48L3A+JztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgcm93cyA9IGguc2xpY2VzLm1hcChzID0+IGBcbiAgICAgICAgPHRyPlxuICAgICAgICAgIDx0ZD4ke2VzY2FwZUh0bWwocy5wYXRjaCl9PC90ZD5cbiAgICAgICAgICA8dGQ+JHtlc2NhcGVIdG1sKHMucmVnaW9uKX08L3RkPlxuICAgICAgICAgIDx0ZD4ke2VzY2FwZUh0bWwocy5yYW5rX2J1Y2tldCl9PC90ZD5cbiAgICAgICAgICA8dGQ+JHtzLnRvdGFsX2dhbWVzLnRvTG9jYWxlU3RyaW5nKCl9PC90ZD5cbiAgICAgICAgICA8dGQ+JHtyZWxhdGl2ZVRpbWUocy51cGRhdGVkX2F0KX08L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgYCkuam9pbignJyk7XG4gICAgICBzbGljZXMuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aDM+VG9wIHNsaWNlcyBieSBwYXJ0aWNpcGFudCBjb3VudDwvaDM+XG4gICAgICAgIDx0YWJsZSBjbGFzcz1cImFkbWluLXN0YXRzLXRhYmxlXCI+XG4gICAgICAgICAgPHRoZWFkPjx0cj48dGg+UGF0Y2g8L3RoPjx0aD5SZWdpb248L3RoPjx0aD5CdWNrZXQ8L3RoPjx0aD5QYXJ0aWNpcGFudHM8L3RoPjx0aD5VcGRhdGVkPC90aD48L3RyPjwvdGhlYWQ+XG4gICAgICAgICAgPHRib2R5PiR7cm93c308L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgYDtcbiAgICB9XG4gIH1cblxuICBjb25zdCBsYXN0ID0gJCgnYWRtaW4tc3RhdHMtbGFzdHJ1bicpO1xuICBpZiAobGFzdCkge1xuICAgIGlmICghaC5sYXN0UnVuKSB7XG4gICAgICBsYXN0LmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImFkbWluLWhlbHBcIj5ObyBjcm9uIHRpY2tzIHJlY29yZGVkIHlldC48L3A+JztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgciA9IGgubGFzdFJ1bjtcbiAgICAgIGxhc3QuaW5uZXJIVE1MID0gYDxwIGNsYXNzPVwiYWRtaW4taGVscFwiPkxhc3QgdGljazogPHN0cm9uZz4ke2VzY2FwZUh0bWwoci5yZWdpb24pfS8ke2VzY2FwZUh0bWwoci50aWVyKX08L3N0cm9uZz4gKGNvaG9ydCAjJHtyLmNvaG9ydElkeH0pIOKAlCAke3IucHJvY2Vzc2VkfSBwcm9jZXNzZWQsICR7ci5lcnJvcnN9IGVycm9ycywgJHtyZWxhdGl2ZVRpbWUoci5hdCl9LjwvcD5gO1xuICAgIH1cbiAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGJvb3QpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9