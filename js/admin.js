/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.kPlatformToRegion = exports.kRiotApiBaseUrl = exports.kRiotApiConfig = exports.kTFTClassId = exports.kHotkeys = exports.kWindowNames = exports.kGameClassIds = exports.kGamesFeatures = void 0;
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
}
window.addEventListener('DOMContentLoaded', boot);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLElBQUksSUFBSTtZQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixVQUFVLENBQUMsQ0FBQyxPQUFDLENBQW1CLG1CQUFtQixDQUFDLDBDQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBQyxDQUFDLGdCQUFnQixDQUFDLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7UUFDbEQsVUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFDLENBQUMsbUJBQW1CLENBQUMsMENBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQWlCLENBQUMsQ0FBQztJQUN0RSxPQUFDLENBQUMsY0FBYyxDQUFDLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvY29uc3RzLnRzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL2RhdGEvc2V0MTcvY29tcHMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvc2VydmljZXMvQXV0aFNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvc2VydmljZXMvQ29tcHNTZXJ2aWNlLnRzIiwid2VicGFjazovL3Bpdm90dGZ0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL2FkbWluL2FkbWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFBpdm90VEZUIOKAlCBURlQgR2FtZSBFdmVudHMgRmVhdHVyZXNcclxuLy8gR2FtZSBJRCA1NDI2ID0gTGVhZ3VlIG9mIExlZ2VuZHMgY2xpZW50ICh3aGljaCBURlQgcnVucyBpbnNpZGUpXHJcbi8vIFRGVC1zcGVjaWZpYyBldmVudHMgdXNlIGludGVybmFsIEdhbWUgSUQgMjE1NzAsIGJ1dCB3ZSByZWdpc3RlciB3aXRoIDU0MjZcclxuZXhwb3J0IGNvbnN0IGtHYW1lc0ZlYXR1cmVzID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZ1tdPihbXHJcbiAgW1xyXG4gICAgNTQyNixcclxuICAgIFtcclxuICAgICAgJ21hdGNoX2luZm8nLFxyXG4gICAgICAnYm9hcmQnLFxyXG4gICAgICAnYmVuY2gnLFxyXG4gICAgICAnc3RvcmUnLFxyXG4gICAgICAnY2Fyb3VzZWwnLFxyXG4gICAgICAnZ2FtZV9pbmZvJyxcclxuICAgICAgJ2F1Z21lbnRzJyxcclxuICAgICAgJ2xpdmVfY2xpZW50X2RhdGEnXHJcbiAgICBdXHJcbiAgXSxcclxuXSk7XHJcblxyXG5leHBvcnQgY29uc3Qga0dhbWVDbGFzc0lkcyA9IEFycmF5LmZyb20oa0dhbWVzRmVhdHVyZXMua2V5cygpKTtcclxuXHJcbmV4cG9ydCBjb25zdCBrV2luZG93TmFtZXMgPSB7XHJcbiAgaW5HYW1lOiAnaW5fZ2FtZScsXHJcbiAgZGVza3RvcDogJ2Rlc2t0b3AnLFxyXG4gIHNldHRpbmdzOiAnc2V0dGluZ3MnLFxyXG4gIGluZ2FtZUNvbnRyb2xsZXI6ICdpbmdhbWVfY29udHJvbGxlcicsXHJcbiAgbWF0Y2h1cHM6ICdtYXRjaHVwcycsXHJcbiAgbG9naW46ICdsb2dpbicsXHJcbiAgYWRtaW46ICdhZG1pbicsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qga0hvdGtleXMgPSB7XHJcbiAgdG9nZ2xlOiAncGl2b3R0ZnRfc2hvd2hpZGUnXHJcbn07XHJcblxyXG4vLyBURlQgR2FtZSBJRCBmb3IgZXZlbnQgcmVnaXN0cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrVEZUQ2xhc3NJZCA9IDU0MjY7XHJcblxyXG4vLyBSaW90IEFQSSBDb25maWd1cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrUmlvdEFwaUNvbmZpZyA9IHtcclxuICBhcGlLZXk6ICcnLFxyXG4gIHJlZ2lvbjogJ2V1cm9wZScgYXMgY29uc3QsICAgICAgIC8vIGFtZXJpY2FzIHwgZXVyb3BlIHwgYXNpYSAoYWNjb3VudC12MSwgbWF0Y2gtdjEpXHJcbiAgcGxhdGZvcm06ICdldW4xJywgICAgICAgICAgICAgICAgLy8gZXV3MSwgZXVuMSwgbmExLCBrciwgLi4uIChzdW1tb25lci9sZWFndWUpXHJcbn07XHJcblxyXG4vLyBCYWNrZW5kIGJhc2UgVVJMLiBJbiBwcm9kdWN0aW9uIHJvdXRlcyB0aHJvdWdoIENsb3VkZmxhcmUgV29ya2VyIGF0XHJcbi8vIGFwaS5waXZvdHRmdC5jb20gKFJpb3QgQVBJIHByb3h5ICsgYXV0aCArIGNvbXBzIGJhY2tlbmQpLiBPdmVycmlkZSB0b1xyXG4vLyBodHRwOi8vMTI3LjAuMC4xOjg3ODcgZHVyaW5nIGxvY2FsIGB3cmFuZ2xlciBkZXZgIGRldmVsb3BtZW50LlxyXG5leHBvcnQgY29uc3Qga1Jpb3RBcGlCYXNlVXJsID0gJ2h0dHBzOi8vYXBpLnBpdm90dGZ0LmNvbSc7XHJcblxyXG5cclxuLy8gUGxhdGZvcm0g4oaSIHJlZ2lvbmFsIHJvdXRpbmcgbWFwIChmb3IgYWNjb3VudC9tYXRjaCBlbmRwb2ludHMpXHJcbmV4cG9ydCBjb25zdCBrUGxhdGZvcm1Ub1JlZ2lvbjogUmVjb3JkPHN0cmluZywgJ2FtZXJpY2FzJyB8ICdldXJvcGUnIHwgJ2FzaWEnPiA9IHtcclxuICAnZXV3MSc6ICdldXJvcGUnLCAnZXVuMSc6ICdldXJvcGUnLCAndHIxJzogJ2V1cm9wZScsICdydSc6ICdldXJvcGUnLFxyXG4gICduYTEnOiAnYW1lcmljYXMnLCAnYnIxJzogJ2FtZXJpY2FzJywgJ2xhMSc6ICdhbWVyaWNhcycsICdsYTInOiAnYW1lcmljYXMnLFxyXG4gICdrcic6ICdhc2lhJywgJ2pwMSc6ICdhc2lhJywgJ29jMSc6ICdhc2lhJywgJ3BoMic6ICdhc2lhJyxcclxuICAnc2cyJzogJ2FzaWEnLCAndGgyJzogJ2FzaWEnLCAndHcyJzogJ2FzaWEnLCAndm4yJzogJ2FzaWEnLFxyXG59O1xyXG4iLCIvLyBQaXZvdFRGVCAtIFNldCAxNyBtZXRhIGNvbXBvc2l0aW9uc1xyXG4vLyBDaGFtcGlvbiBJRHMgYW5kIHRyYWl0cyBzb3VyY2VkIGZyb20gQ29tbXVuaXR5RHJhZ29uIFNldCAxNyBkYXRhLlxyXG4vLyBOT1RFOiB0aWVyIHJhbmtpbmdzIGFuZCBpdGVtIGJ1aWxkcyBhcmUgYXV0aG9yIHBsYWNlaG9sZGVycyBwZW5kaW5nIGxpdmVcclxuLy8gcGF0Y2ggZGF0YTsgdGhlIHVuaXRzLCBjb3N0cywgYW5kIHRyYWl0cyByZWZlcmVuY2VkIGhlcmUgYXJlIHJlYWwuXHJcblxyXG5pbXBvcnQgeyBDb21wIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBtZXRhQ29tcHM6IENvbXBbXSA9IFtcclxuICAvLyA9PT09PSBTIFRJRVIgPT09PT1cclxuICB7XHJcbiAgICBpZDogJ21vcmdhbmEtZGFyay1sYWR5JyxcclxuICAgIG5hbWU6ICdNb3JnYW5hIERhcmsgTGFkeScsXHJcbiAgICB0aWVyOiAnUycsXHJcbiAgICBwbGF5c3R5bGU6ICdGYXN0IDknLFxyXG4gICAgZGlmZmljdWx0eTogJ0hhcmQnLFxyXG4gICAgbGV2ZWw6IDksXHJcbiAgICB1bml0czogW1xyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Nb3JnYW5hJywgICAgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDIsIGl0ZW1zOiBbJ3JhYmFkb25zLWRlYXRoY2FwJywgJ2pld2VsZWQtZ2F1bnRsZXQnLCAnaGV4dGVjaC1ndW5ibGFkZSddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0thcm1hJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiwgaXRlbXM6IFsnYmx1ZS1idWZmJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZGVrYWlzZXInLCBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0xpc3NhbmRyYScsICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19KaGluJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDEgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfVmV4JywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X01vcmRla2Fpc2VyJywgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19TaGVuJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDEgfSxcclxuICAgIF0sXHJcbiAgICBjb3JlVHJhaXRzOiBbJ0RhcmsgTGFkeScsICdEYXJrIFN0YXInXSxcclxuICAgIGRlc2NyaXB0aW9uOiAnTW9yZ2FuYSBzb2xvLWNhcnJpZXMgd2l0aCBEYXJrIFN0YXIgc3VwcG9ydGluZyBjYXN0LiBVbmNhcCBib2FyZCBhdCBMdjkgZm9yIEpoaW4vVmV4IHNlY29uZGFyeSBBUC4nLFxyXG4gICAgZWFybHlHYW1lOiAnTGlzc2FuZHJhICsgTW9yZGVrYWlzZXIgb3BlbmVyIGZvciBEYXJrIFN0YXIgMi4gRWNvbiB0byA1MCwgcHVzaCA4IG9uIDQtMi4nLFxyXG4gICAgbWlkR2FtZTogJ1N0YWJpbGl6ZSBhdCBMdjcgb24gNC0xIOKAlCBmaW5kIEthcm1hIDIgYW5kIGNvbXBsZXRlIFJhYmFkb25cXCdzIG9uIE1vcmdhbmEuJyxcclxuICAgIGxhdGVHYW1lOiAnUHVzaCBMdjkgb24gNS0xIGFuZCBzbG93IHJvbGwgZm9yIE1vcmdhbmEgMiDigJQgdW5jYXAgd2l0aCBKaGluIGFuZCBWZXguJyxcclxuICAgIHRpcHM6ICdNb3JnYW5hIHdhbnRzIEFQL2R1cmFiaWxpdHkuIFBvc2l0aW9uIGJlaGluZCBTaGVuIGZvciB0aGUgYnVsd2FyayBzaGllbGQuJyxcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUMTNfQXVnbWVudF9Tb3JjZXJlckNyb3duJywgJ1RGVDZfQXVnbWVudF9QYW5kb3Jhc0l0ZW1zJywgJ1RGVDZfQXVnbWVudF9Bc2NlbnNpb24nXVxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6ICdqaGluLWRhcmstc3Rhci1zbmlwZXJzJyxcclxuICAgIG5hbWU6ICdKaGluIERhcmsgU3RhciBTbmlwZXJzJyxcclxuICAgIHRpZXI6ICdTJyxcclxuICAgIHBsYXlzdHlsZTogJ0Zhc3QgOCcsXHJcbiAgICBkaWZmaWN1bHR5OiAnTWVkaXVtJyxcclxuICAgIGxldmVsOiA4LFxyXG4gICAgdW5pdHM6IFtcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfSmhpbicsICAgICAgICAgaXNDYXJyeTogdHJ1ZSwgIHN0YXJMZXZlbDogMiwgaXRlbXM6IFsnaW5maW5pdHktZWRnZScsICdsYXN0LXdoaXNwZXInLCAnZ2lhbnQtc2xheWVyJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfWGF5YWgnLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiwgaXRlbXM6IFsnZ3VpbnNvb3MtcmFnZWJsYWRlJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfRXpyZWFsJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19HbmFyJywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0thcm1hJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTGlzc2FuZHJhJywgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Nb3JkZWthaXNlcicsICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1NoZW4nLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDEgfSxcclxuICAgIF0sXHJcbiAgICBjb3JlVHJhaXRzOiBbJ0RhcmsgU3RhcicsICdFcmFkaWNhdG9yJywgJ1NuaXBlciddLFxyXG4gICAgZGVzY3JpcHRpb246ICdTbmlwZXIgbGluZSBiYWNrZWQgYnkgRGFyayBTdGFyIGRhbWFnZSBhbXAuIEpoaW4gb25lLXNob3RzIGJhY2tsaW5lIGNhcnJpZXMgb24gaGlzIGZvdXJ0aCBzaG90LicsXHJcbiAgICBlYXJseUdhbWU6ICdFenJlYWwgKyBHbmFyIGVhcmx5IFNuaXBlciB0cmFpdC4gU2xhbSBJRSBvbiBKaGluIGhvbGRlci4nLFxyXG4gICAgbWlkR2FtZTogJ1N0YWJpbGl6ZSBhdCBMdjcgYnkgNC0xIOKAlCBob2xkIEpoaW4gYW5kIFhheWFoIHBhaXJzLCBjb21wbGV0ZSBMYXN0IFdoaXNwZXIuJyxcclxuICAgIGxhdGVHYW1lOiAnUHVzaCBMdjggb24gNC0yIGFuZCBzbG93IHJvbGwg4oCUIFNuaXBlciA0ICsgS2FybWEgYm9vc3QgY2xvc2VzIG91dCB0aGUgbG9iYnkuJyxcclxuICAgIHRpcHM6ICdTdGFjayBTbmlwZXJzIGluIHRoZSBzYW1lIGNvbHVtbi4gS2FybWEgYm9vc3RzIHRoZSBsaW5lIGZvciBjcml0ICsgQVAgc3luZXJneS4nLFxyXG4gICAgcmVjb21tZW5kZWRBdWdtZW50czogWydURlQxM19BdWdtZW50X1NuaXBlcicsICdURlQxM19BdWdtZW50X1NuaXBlckNyb3duJywgJ1RGVDZfQXVnbWVudF9Bc2NlbnNpb24nXVxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6ICd4YXlhaC1zdGFyZ2F6ZXInLFxyXG4gICAgbmFtZTogJ1hheWFoIFN0YXJnYXplcicsXHJcbiAgICB0aWVyOiAnUycsXHJcbiAgICBwbGF5c3R5bGU6ICdGYXN0IDgnLFxyXG4gICAgZGlmZmljdWx0eTogJ01lZGl1bScsXHJcbiAgICBsZXZlbDogOCxcclxuICAgIHVuaXRzOiBbXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1hheWFoJywgICAgICAgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDIsIGl0ZW1zOiBbJ2luZmluaXR5LWVkZ2UnLCAnbGFzdC13aGlzcGVyJywgJ3J1bmFhbnMtaHVycmljYW5lJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTHVsdScsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19KYXgnLCAgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1R3aXN0ZWRGYXRlJywgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfVGFsb24nLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19DYWl0bHluJywgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X01pbGlvJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTnVudScsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgXSxcclxuICAgIGNvcmVUcmFpdHM6IFsnU3RhcmdhemVyJywgJ1NuaXBlcicsICdCYXN0aW9uJ10sXHJcbiAgICBkZXNjcmlwdGlvbjogJ1N0YXJnYXplciBjb25zdGVsbGF0aW9uIGJ1ZmZzIFhheWFoIHdoaWxlIEpheCB0YW5rcy4gTnVudSBob2xkcyB0aGUgU3RhcmdhemVyIDQtY29zdCBzbG90LicsXHJcbiAgICBlYXJseUdhbWU6ICdPcGVuIHdpdGggVEYgKyBUYWxvbiArIENhaXRseW4gZm9yIFN0YXJnYXplciAzLiBFY29uIGZvciBYYXlhaC4nLFxyXG4gICAgbWlkR2FtZTogJ1N0YWJpbGl6ZSBMdjcgb24gNC0xIOKAlCBmaW5kIFhheWFoIGNvcGllcywgZmluaXNoIElFLCBhbmQgc2xhbSBKYXggZnJvbnRsaW5lLicsXHJcbiAgICBsYXRlR2FtZTogJ1B1c2ggTHY4IG9uIDQtMiBhbmQgc2xvdyByb2xsIGZvciBYYXlhaCAyICsgTHVsdS9OdW51IHRvIGhpdCBTdGFyZ2F6ZXIgNS4nLFxyXG4gICAgdGlwczogJ1N0YXJnYXplciA1IGlzIHRoZSBzcGlrZSBpZiB5b3UgZmluZCBMdWx1IGFuZCBOdW51LiBQb3NpdGlvbiBYYXlhaCBiYWNrLWNvcm5lci4nLFxyXG4gICAgcmVjb21tZW5kZWRBdWdtZW50czogWydURlQxM19BdWdtZW50X1NuaXBlckNyZXN0JywgJ1RGVDZfQXVnbWVudF9Bc2NlbnNpb24nLCAnVEZUMTBfQXVnbWVudF9CaWdHYWlucyddXHJcbiAgfSxcclxuXHJcbiAgLy8gPT09PT0gQSBUSUVSID09PT09XHJcbiAge1xyXG4gICAgaWQ6ICdwcmltb3JkaWFuLXJlcm9sbCcsXHJcbiAgICBuYW1lOiAnUHJpbW9yZGlhbiBSZXJvbGwnLFxyXG4gICAgdGllcjogJ0EnLFxyXG4gICAgcGxheXN0eWxlOiAnUmVyb2xsJyxcclxuICAgIGRpZmZpY3VsdHk6ICdFYXN5JyxcclxuICAgIGxldmVsOiA2LFxyXG4gICAgdW5pdHM6IFtcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfUmVrU2FpJywgICAgICAgaXNDYXJyeTogdHJ1ZSwgIHN0YXJMZXZlbDogMywgaXRlbXM6IFsndGl0YW5zLXJlc29sdmUnLCAnYmxvb2R0aGlyc3RlcicsICd3YXJtb2dzLWFybW9yJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQmVsdmV0aCcsICAgICAgaXNDYXJyeTogdHJ1ZSwgIHN0YXJMZXZlbDogMywgaXRlbXM6IFsnZ3VpbnNvb3MtcmFnZWJsYWRlJywgJ3J1bmFhbnMtaHVycmljYW5lJywgJ2dpYW50LXNsYXllciddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0JyaWFyJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDMgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTWFva2FpJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19JbGxhb2knLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0F1cm9yYScsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgIF0sXHJcbiAgICBjb3JlVHJhaXRzOiBbJ1ByaW1vcmRpYW4nLCAnQW5pbWEnLCAnQnJhd2xlciddLFxyXG4gICAgZGVzY3JpcHRpb246IFwiUmVyb2xsIEx2NiBmb3IgMy1zdGFyIFJlaydTYWkgYW5kIEJlbCdWZXRoLiBQcmltb3JkaWFuIEJyYXdsZXJzIHN0YXQtY2hlY2sgZW5lbWllcy5cIixcclxuICAgIGVhcmx5R2FtZTogJ0J1eSBldmVyeSBSZWtcXCdTYWksIEJlbFxcJ1ZldGgsIEJyaWFyIGZyb20gU3RhZ2UgMi4gU2xvdyByb2xsIGF0IEx2Ni4nLFxyXG4gICAgbWlkR2FtZTogJ1N0YXkgTHY2IG9uIDMtMiDigJQgc2xvdyByb2xsIDUwZyBkb3duIGZvciBSZWtcXCdTYWkgMywgQmVsXFwnVmV0aCAzLCBhbmQgQnJpYXIgMy4nLFxyXG4gICAgbGF0ZUdhbWU6ICdPbmNlIDMtc3RhcnMgaGl0LCBwdXNoIEx2NyBvbiA0LTIgZm9yIEF1cm9yYSBhbmQgbG9jayBpbiBBbmltYSA0LicsXHJcbiAgICB0aXBzOiBcIlByaW9yaXRpemUgUmVrJ1NhaSBpdGVtcyBvbiBjYXJvdXNlbC4gQXVyb3JhIDItc3RhciBhZGRzIEFuaW1hIHRyYWl0LlwiLFxyXG4gICAgcmVjb21tZW5kZWRBdWdtZW50czogWydURlQxM19BdWdtZW50X0JydWlzZXInLCAnVEZUMTNfQXVnbWVudF9CcnVpc2VyQ3Jvd24nLCAnVEZUNl9BdWdtZW50X1NhbHZhZ2VCaW5IUiddXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogJ21lY2hhLWFzb2wnLFxyXG4gICAgbmFtZTogJ01lY2hhIEF1cmVsaW9uIFNvbCcsXHJcbiAgICB0aWVyOiAnQScsXHJcbiAgICBwbGF5c3R5bGU6ICdGYXN0IDgnLFxyXG4gICAgZGlmZmljdWx0eTogJ0hhcmQnLFxyXG4gICAgbGV2ZWw6IDgsXHJcbiAgICB1bml0czogW1xyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19BdXJlbGlvblNvbCcsICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAyLCBpdGVtczogWydqZXdlbGVkLWdhdW50bGV0JywgJ2hleHRlY2gtZ3VuYmxhZGUnLCAncmFiYWRvbnMtZGVhdGhjYXAnXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19HYWxpbycsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1VyZ290JywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfVmlrdG9yJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0JhcmQnLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDEgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQmxpdHpjcmFuaycsICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Nb3JkZWthaXNlcicsICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydNZWNoYScsICdDb25kdWl0JywgJ1Zhbmd1YXJkJ10sXHJcbiAgICBkZXNjcmlwdGlvbjogJ0Z1bGwgTWVjaGEgZnJvbnRsaW5lIHBpbG90IEFTb2wsIENvbmR1aXQgY2hhaW4gZmVlZHMgdGhlIHRlYW0gbWFuYS4gQ2FwIGJvYXJkIHdpdGggQmFyZCBvciBCbGl0emNyYW5rLicsXHJcbiAgICBlYXJseUdhbWU6ICdVcmdvdCArIFZpa3RvciBlYXJseSBNZWNoYS4gVHJhbnNpdGlvbiB0byBBU29sICsgR2FsaW8gYXQgTHY4LicsXHJcbiAgICBtaWRHYW1lOiAnU3RhYmlsaXplIGF0IEx2NyB3aXRoIE1lY2hhIDMg4oCUIGVjb24gdG8gNTBnIGFuZCBwcmVwIEFTb2wgaXRlbXMuJyxcclxuICAgIGxhdGVHYW1lOiAnUHVzaCBMdjggb24gNC0yLCBmaW5kIEFTb2wgMiBhbmQgR2FsaW8g4oCUIGNhcCB3aXRoIEJhcmQgb3IgQmxpdHpjcmFuayBmb3IgQ29uZHVpdCBjaGFpbi4nLFxyXG4gICAgdGlwczogJ0NvbmR1aXQgbmVlZHMgYSBDb25kdWl0IHBhaXIgdG8gY2hhaW4uIFBhaXIgQVNvbCB3aXRoIEJhcmQgb3IgTW9yZGVrYWlzZXIuJyxcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUMTNfQXVnbWVudF9Tb3JjZXJlckNyb3duJywgJ1RGVDZfQXVnbWVudF9QYW5kb3Jhc0l0ZW1zJywgJ1RGVDEwX0F1Z21lbnRfQmlnR2FpbnMnXVxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6ICd6ZWQtZ2FsYXh5LWh1bnRlcicsXHJcbiAgICBuYW1lOiAnWmVkIEdhbGF4eSBIdW50ZXInLFxyXG4gICAgdGllcjogJ0EnLFxyXG4gICAgcGxheXN0eWxlOiAnRmFzdCA5JyxcclxuICAgIGRpZmZpY3VsdHk6ICdIYXJkJyxcclxuICAgIGxldmVsOiA5LFxyXG4gICAgdW5pdHM6IFtcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfWmVkJywgICAgICAgICAgaXNDYXJyeTogdHJ1ZSwgIHN0YXJMZXZlbDogMiwgaXRlbXM6IFsnaW5maW5pdHktZWRnZScsICdlZGdlLW9mLW5pZ2h0JywgJ2Jsb29kdGhpcnN0ZXInXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19UYWxvbicsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0FrYWxpJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfS2Fpc2EnLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X01vcmRla2Fpc2VyJywgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTGlzc2FuZHJhJywgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19KaGluJywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1NoZW4nLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDEgfSxcclxuICAgIF0sXHJcbiAgICBjb3JlVHJhaXRzOiBbJ0dhbGF4eSBIdW50ZXInLCAnRGFyayBTdGFyJywgJ1JvZ3VlJ10sXHJcbiAgICBkZXNjcmlwdGlvbjogJ1plZCBzb2xvIGNhcnJ5IHdpdGggUm9ndWUgKyBEYXJrIFN0YXIgYmFja2xpbmUgcHJlc3N1cmUuIENhcCBib2FyZCBhdCBMdjkuJyxcclxuICAgIGVhcmx5R2FtZTogJ0xvc3Mgc3RyZWFrIFN0YWdlIDIuIFN0YWJpbGl6ZSBhdCBMdjcsIHB1c2ggOSBvbiA1LTEuJyxcclxuICAgIG1pZEdhbWU6ICdMdjcgb24gNC0xIHdpdGggVGFsb24gKyBBa2FsaSBSb2d1ZSAyIOKAlCBlY29uIGZvciB0aGUgTHY4LzkgcHVzaCBhbmQgY29tcGxldGUgSUUuJyxcclxuICAgIGxhdGVHYW1lOiAnUHVzaCBMdjggb24gNC0yIHRoZW4gOSBvbiA1LTEg4oCUIHNsb3cgcm9sbCBmb3IgWmVkIDIgYW5kIExpc3NhbmRyYSAyLicsXHJcbiAgICB0aXBzOiAnWmVkIHdhbnRzIElFICsgc3VzdGFpbi4gRWRnZSBvZiBOaWdodCBnaXZlcyBoaW0gdGhlIGJ1cnN0IHdpbmRvdy4nLFxyXG4gICAgcmVjb21tZW5kZWRBdWdtZW50czogWydURlQxM19BdWdtZW50X1F1aWNrc3RyaWtlckNyb3duJywgJ1RGVDZfQXVnbWVudF9Bc2NlbnNpb24nLCAnVEZUMTBfQXVnbWVudF9CaWdHYWlucyddXHJcbiAgfSxcclxuXHJcbiAgLy8gPT09PT0gQiBUSUVSID09PT09XHJcbiAge1xyXG4gICAgaWQ6ICdwc2lvbmljLXB5a2UtcmVyb2xsJyxcclxuICAgIG5hbWU6ICdQc2lvbmljIFB5a2UgUmVyb2xsJyxcclxuICAgIHRpZXI6ICdCJyxcclxuICAgIHBsYXlzdHlsZTogJ1Jlcm9sbCcsXHJcbiAgICBkaWZmaWN1bHR5OiAnRWFzeScsXHJcbiAgICBsZXZlbDogNixcclxuICAgIHVuaXRzOiBbXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1B5a2UnLCAgICAgICAgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDMsIGl0ZW1zOiBbJ2luZmluaXR5LWVkZ2UnLCAnZWRnZS1vZi1uaWdodCcsICdoYW5kLW9mLWp1c3RpY2UnXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19HcmFnYXMnLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAzIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1Zpa3RvcicsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTWFzdGVyWWknLCAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Tb25hJywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0thcm1hJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgIF0sXHJcbiAgICBjb3JlVHJhaXRzOiBbJ1BzaW9uaWMnLCAnVm95YWdlcicsICdNYXJhdWRlciddLFxyXG4gICAgZGVzY3JpcHRpb246ICdSZXJvbGwgYXQgTHY2IGZvciAzLXN0YXIgUHlrZS4gUHNpb25pYyA0IGlzIHRoZSB0ZWFtIHNwaWtlIOKAlCBTb25hIGNhcHMgaXQgYXQgNS4nLFxyXG4gICAgZWFybHlHYW1lOiAnQnV5IGV2ZXJ5IFB5a2UgKyBHcmFnYXMgKyBWaWt0b3IgZnJvbSBTdGFnZSAyLicsXHJcbiAgICBtaWRHYW1lOiAnU3RheSBMdjYgZnJvbSAzLTIg4oCUIHNsb3cgcm9sbCBmb3IgUHlrZSAzIGFuZCBHcmFnYXMgMywga2VlcCBQc2lvbmljIDQgYWN0aXZlLicsXHJcbiAgICBsYXRlR2FtZTogJ0FmdGVyIDMtc3RhcnMgaGl0LCBwdXNoIEx2NyBmb3IgU29uYSDigJQgUHNpb25pYyA1IGNsb3NlcyBvdXQgdGhlIGxvYmJ5LicsXHJcbiAgICB0aXBzOiAnUHlrZSBqdW1wcyBiYWNrbGluZTsgcGFpciB3aXRoIEVkZ2Ugb2YgTmlnaHQgZm9yIGJ1cnN0IHdpbmRvdy4nLFxyXG4gICAgcmVjb21tZW5kZWRBdWdtZW50czogWydURlQxM19BdWdtZW50X1F1aWNrc3RyaWtlckNyb3duJywgJ1RGVDZfQXVnbWVudF9TYWx2YWdlQmluSFInLCAnVEZUNl9BdWdtZW50X0NvbXBvbmVudEdyYWJCYWcnXVxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6ICdzb25hLWNvbW1hbmRlcicsXHJcbiAgICBuYW1lOiAnU29uYSBDb21tYW5kZXInLFxyXG4gICAgdGllcjogJ0InLFxyXG4gICAgcGxheXN0eWxlOiAnRmFzdCA5JyxcclxuICAgIGRpZmZpY3VsdHk6ICdNZWRpdW0nLFxyXG4gICAgbGV2ZWw6IDksXHJcbiAgICB1bml0czogW1xyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Tb25hJywgICAgICAgICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAyLCBpdGVtczogWydibHVlLWJ1ZmYnLCAnamV3ZWxlZC1nYXVudGxldCcsICdoZXh0ZWNoLWd1bmJsYWRlJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfVGVlbW8nLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19MaXNzYW5kcmEnLCAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0lsbGFvaScsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTGVibGFuYycsICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1NoZW4nLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDEgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQmFyZCcsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgXSxcclxuICAgIGNvcmVUcmFpdHM6IFsnQ29tbWFuZGVyJywgJ1NoZXBoZXJkJywgJ1BzaW9uaWMnXSxcclxuICAgIGRlc2NyaXB0aW9uOiAnSGVhbC1hbmQtc2hpZWxkIFNoZXBoZXJkIGJhY2tib25lIHdpdGggU29uYSBicm9hZGNhc3RpbmcgdGVhbS13aWRlIGJ1ZmZzLiBTdHJvbmcgdnMgc3VzdGFpbmVkIERQUywgd2VhayB2cyBhc3Nhc3NpbnMuJyxcclxuICAgIGVhcmx5R2FtZTogJ09wZW4gU2hlcGhlcmQgMiB3aXRoIFRlZW1vICsgTGlzc2FuZHJhLiBQdXNoIDggb24gNC0yLicsXHJcbiAgICBtaWRHYW1lOiAnU3RhYmlsaXplIEx2NyBvbiA0LTEgd2l0aCBTaGVwaGVyZCAzIOKAlCBlY29uIGZvciB0aGUgTHY4IHB1c2gsIHByZXAgQmx1ZSBCdWZmIG9uIFNvbmEuJyxcclxuICAgIGxhdGVHYW1lOiAnUHVzaCBMdjggb24gNC0yIHRoZW4gOSBvbiA1LTEg4oCUIHNsb3cgcm9sbCBmb3IgU29uYSAyIGFuZCBoaXQgU2hlcGhlcmQgNS4nLFxyXG4gICAgdGlwczogJ1NoZXBoZXJkIDUgaXMgdGhlIHNwaWtlLiBQb3NpdGlvbiBTb25hIGJlaGluZCBTaGVuIGZvciB0aGUgQnVsd2FyayBzaGllbGQuJyxcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUNl9BdWdtZW50X1BhbmRvcmFzSXRlbXMnLCAnVEZUMTBfQXVnbWVudF9CaWdHYWlucycsICdURlQ5X0F1Z21lbnRfTGVhcm5pbmdGcm9tRXhwZXJpZW5jZTInXVxyXG4gIH0sXHJcblxyXG4gIC8vID09PT09IEMgVElFUiA9PT09PVxyXG4gIHtcclxuICAgIGlkOiAnYW5pbWEtZmlvcmEnLFxyXG4gICAgbmFtZTogJ0FuaW1hIEZpb3JhJyxcclxuICAgIHRpZXI6ICdDJyxcclxuICAgIHBsYXlzdHlsZTogJ0Zhc3QgOCcsXHJcbiAgICBkaWZmaWN1bHR5OiAnSGFyZCcsXHJcbiAgICBsZXZlbDogOCxcclxuICAgIHVuaXRzOiBbXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0Zpb3JhJywgICAgICAgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDIsIGl0ZW1zOiBbJ2luZmluaXR5LWVkZ2UnLCAnYmxvb2R0aGlyc3RlcicsICdsYXN0LXdoaXNwZXInXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19CcmlhcicsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0ppbngnLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQXVyb3JhJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19JbGxhb2knLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0FrYWxpJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQmVsdmV0aCcsICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Nb3JkZWthaXNlcicsICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydBbmltYScsICdEaXZpbmUgRHVlbGlzdCcsICdNYXJhdWRlciddLFxyXG4gICAgZGVzY3JpcHRpb246ICdGaW9yYSBjYXJyaWVzIHdpdGggQW5pbWEgZnJvbnRsaW5lIHN1cHBvcnQuIEhpZ2ggdmFyaWFuY2Ug4oCUIG5lZWRzIGEgRmlvcmEgMi1zdGFyIGFuZCBBbmltYSA1IGZvciB0aGUgc3Bpa2UuJyxcclxuICAgIGVhcmx5R2FtZTogJ0JyaWFyICsgSmlueCArIEF1cm9yYSBvcGVuZXIuIFNsYW0gZWFybHkgaXRlbXMgb24gRmlvcmEgaG9sZGVyLicsXHJcbiAgICBtaWRHYW1lOiAnU3RhYmlsaXplIGF0IEx2NyBieSA0LTEg4oCUIGhvbGQgRmlvcmEgcGFpcnMgYW5kIGxvY2sgaW4gdGhlIEFuaW1hIGZyb250bGluZS4nLFxyXG4gICAgbGF0ZUdhbWU6ICdQdXNoIEx2OCBvbiA0LTIgYW5kIHNsb3cgcm9sbCBmb3IgRmlvcmEgMiBhbmQgQW5pbWEgNSDigJQgdGhlIHNwaWtlIHRoYXQgd2lucyBnYW1lcy4nLFxyXG4gICAgdGlwczogJ0Zpb3JhIG5lZWRzIElFICsgc3VzdGFpbi4gQWthbGkgKyBCZWxcXCdWZXRoIGdpdmUgdGhlIE1hcmF1ZGVyIGJhY2tsaW5lLicsXHJcbiAgICByZWNvbW1lbmRlZEF1Z21lbnRzOiBbJ1RGVDEzX0F1Z21lbnRfQ29ucXVlcm9yQ3Jvd24nLCAnVEZUMTNfQXVnbWVudF9QaXRGaWdodGVyQ3Jvd24nLCAnVEZUNl9BdWdtZW50X0FzY2Vuc2lvbiddXHJcbiAgfSxcclxuXTtcclxuXHJcbi8vIEhlbHBlcjogZ2V0IGNvbXBzIGJ5IHRpZXJcclxuZXhwb3J0IGNvbnN0IGdldENvbXBzQnlUaWVyID0gKHRpZXI6ICdTJyB8ICdBJyB8ICdCJyB8ICdDJyB8ICdYJykgPT5cclxuICBtZXRhQ29tcHMuZmlsdGVyKGMgPT4gYy50aWVyID09PSB0aWVyKTtcclxuIiwiLy8gQXV0aFNlcnZpY2Ug4oCUIHRoaW4gY2xpZW50IGZvciB0aGUgQ2xvdWRmbGFyZSBXb3JrZXIgL2F1dGggZW5kcG9pbnRzLlxuLy9cbi8vIFRva2VuIGlzIGtlcHQgaW4gbG9jYWxTdG9yYWdlLiBDb21wb25lbnRzIHRoYXQgY2FyZSBhYm91dCBsb2dpbiBzdGF0ZSBjYW5cbi8vIGVpdGhlciBjYWxsIGdldEN1cnJlbnRVc2VyKCkgb25jZSBvbiBtb3VudCwgb3Igc3Vic2NyaWJlIHZpYSBvbkNoYW5nZSgpLlxuXG5pbXBvcnQgeyBrUmlvdEFwaUJhc2VVcmwgfSBmcm9tICcuLi9jb25zdHMnO1xuXG5leHBvcnQgdHlwZSBVc2VyUm9sZSA9ICd1c2VyJyB8ICdtb2RlcmF0b3InIHwgJ2FkbWluJztcblxuZXhwb3J0IGludGVyZmFjZSBVc2VyIHtcbiAgaWQ6IG51bWJlcjtcbiAgZW1haWw6IHN0cmluZztcbiAgcm9sZTogVXNlclJvbGU7XG4gIGRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsO1xufVxuXG5pbnRlcmZhY2UgQXV0aFJlc3BvbnNlIHtcbiAgdG9rZW46IHN0cmluZztcbiAgdXNlcjogVXNlcjtcbn1cblxuY29uc3QgU1RPUkFHRV9UT0tFTiA9ICdwaXZvdHRmdF9hdXRoX3Rva2VuJztcbmNvbnN0IFNUT1JBR0VfVVNFUiA9ICdwaXZvdHRmdF9hdXRoX3VzZXInO1xuXG50eXBlIExpc3RlbmVyID0gKHVzZXI6IFVzZXIgfCBudWxsKSA9PiB2b2lkO1xuY29uc3QgbGlzdGVuZXJzID0gbmV3IFNldDxMaXN0ZW5lcj4oKTtcblxuZnVuY3Rpb24gZW1pdCgpOiB2b2lkIHtcbiAgY29uc3QgdXNlciA9IGdldFN0b3JlZFVzZXIoKTtcbiAgbGlzdGVuZXJzLmZvckVhY2gobCA9PiB7XG4gICAgdHJ5IHsgbCh1c2VyKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKCdbQXV0aFNlcnZpY2VdIGxpc3RlbmVyIHRocmV3OicsIGUpOyB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9rZW4oKTogc3RyaW5nIHwgbnVsbCB7XG4gIHRyeSB7IHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX1RPS0VOKTsgfSBjYXRjaCB7IHJldHVybiBudWxsOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdG9yZWRVc2VyKCk6IFVzZXIgfCBudWxsIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX1VTRVIpO1xuICAgIHJldHVybiByYXcgPyBKU09OLnBhcnNlKHJhdykgYXMgVXNlciA6IG51bGw7XG4gIH0gY2F0Y2ggeyByZXR1cm4gbnVsbDsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gISFnZXRUb2tlbigpICYmICEhZ2V0U3RvcmVkVXNlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBZG1pbigpOiBib29sZWFuIHtcbiAgY29uc3QgdSA9IGdldFN0b3JlZFVzZXIoKTtcbiAgcmV0dXJuICEhdSAmJiB1LnJvbGUgPT09ICdhZG1pbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNBdExlYXN0KHJvbGU6IFVzZXJSb2xlKTogYm9vbGVhbiB7XG4gIGNvbnN0IHUgPSBnZXRTdG9yZWRVc2VyKCk7XG4gIGlmICghdSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCByYW5rOiBSZWNvcmQ8VXNlclJvbGUsIG51bWJlcj4gPSB7IHVzZXI6IDEsIG1vZGVyYXRvcjogMiwgYWRtaW46IDMgfTtcbiAgcmV0dXJuIHJhbmtbdS5yb2xlXSA+PSByYW5rW3JvbGVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25DaGFuZ2UobGlzdGVuZXI6IExpc3RlbmVyKTogKCkgPT4gdm9pZCB7XG4gIGxpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xuICByZXR1cm4gKCkgPT4gbGlzdGVuZXJzLmRlbGV0ZShsaXN0ZW5lcik7XG59XG5cbmZ1bmN0aW9uIHNldFNlc3Npb24ocmVzOiBBdXRoUmVzcG9uc2UpOiB2b2lkIHtcbiAgdHJ5IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX1RPS0VOLCByZXMudG9rZW4pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfVVNFUiwgSlNPTi5zdHJpbmdpZnkocmVzLnVzZXIpKTtcbiAgfSBjYXRjaCB7IC8qIHF1b3RhIGV0YyDigJQgc2lsZW50ICovIH1cbiAgZW1pdCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTZXNzaW9uKCk6IHZvaWQge1xuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFNUT1JBR0VfVE9LRU4pO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFNUT1JBR0VfVVNFUik7XG4gIH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxuICBlbWl0KCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3RKc29uPFQ+KHBhdGg6IHN0cmluZywgYm9keTogdW5rbm93bik6IFByb21pc2U8VD4ge1xuICBjb25zdCB1cmwgPSBgJHtrUmlvdEFwaUJhc2VVcmx9JHtwYXRofWA7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICB9KTtcbiAgbGV0IHBheWxvYWQ6IGFueTtcbiAgdHJ5IHsgcGF5bG9hZCA9IGF3YWl0IHJlcy5qc29uKCk7IH0gY2F0Y2ggeyBwYXlsb2FkID0geyBlcnJvcjogcmVzLnN0YXR1c1RleHQgfTsgfVxuICBpZiAoIXJlcy5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkPy5lcnJvciB8fCBgSFRUUCAke3Jlcy5zdGF0dXN9YCk7XG4gIH1cbiAgcmV0dXJuIHBheWxvYWQgYXMgVDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0SnNvbjxUPihwYXRoOiBzdHJpbmcsIHRva2VuPzogc3RyaW5nIHwgbnVsbCk6IFByb21pc2U8VD4ge1xuICBjb25zdCB1cmwgPSBgJHtrUmlvdEFwaUJhc2VVcmx9JHtwYXRofWA7XG4gIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgaWYgKHRva2VuKSBoZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBgQmVhcmVyICR7dG9rZW59YDtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7IGhlYWRlcnMgfSk7XG4gIGxldCBwYXlsb2FkOiBhbnk7XG4gIHRyeSB7IHBheWxvYWQgPSBhd2FpdCByZXMuanNvbigpOyB9IGNhdGNoIHsgcGF5bG9hZCA9IHsgZXJyb3I6IHJlcy5zdGF0dXNUZXh0IH07IH1cbiAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcihwYXlsb2FkPy5lcnJvciB8fCBgSFRUUCAke3Jlcy5zdGF0dXN9YCk7XG4gIHJldHVybiBwYXlsb2FkIGFzIFQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWdpc3RlcihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBkaXNwbGF5TmFtZT86IHN0cmluZyk6IFByb21pc2U8VXNlcj4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBwb3N0SnNvbjxBdXRoUmVzcG9uc2U+KCcvYXV0aC9yZWdpc3RlcicsIHsgZW1haWwsIHBhc3N3b3JkLCBkaXNwbGF5TmFtZSB9KTtcbiAgc2V0U2Vzc2lvbihyZXMpO1xuICByZXR1cm4gcmVzLnVzZXI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpbihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyPiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHBvc3RKc29uPEF1dGhSZXNwb25zZT4oJy9hdXRoL2xvZ2luJywgeyBlbWFpbCwgcGFzc3dvcmQgfSk7XG4gIHNldFNlc3Npb24ocmVzKTtcbiAgcmV0dXJuIHJlcy51c2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9nb3V0KCk6IHZvaWQge1xuICBjbGVhclNlc3Npb24oKTtcbn1cblxuLyoqXG4gKiBSZWZyZXNoIHVzZXIgaW5mbyBmcm9tIGJhY2tlbmQuIFVzZWZ1bCBhZnRlciByb2xlIGNoYW5nZXMgb3IgdG8gY29uZmlybVxuICogdG9rZW4gdmFsaWRpdHkuIENsZWFycyBzZXNzaW9uIG9uIDQwMS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hNZSgpOiBQcm9taXNlPFVzZXIgfCBudWxsPiB7XG4gIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0SnNvbjx7IHVzZXI6IFVzZXIgfT4oJy9hdXRoL21lJywgdG9rZW4pO1xuICAgIHRyeSB7IGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfVVNFUiwgSlNPTi5zdHJpbmdpZnkocmVzLnVzZXIpKTsgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XG4gICAgZW1pdCgpO1xuICAgIHJldHVybiByZXMudXNlcjtcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgaWYgKChlLm1lc3NhZ2UgfHwgJycpLmluY2x1ZGVzKCdIVFRQIDQwMScpKSBjbGVhclNlc3Npb24oKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBmb3IgYWRtaW4tb25seSBmZXRjaGVzIOKAlCBhdXRvbWF0aWNhbGx5IGF0dGFjaGVzIEJlYXJlciB0b2tlbi5cbiAqIFRocm93cyBpZiBub3QgbG9nZ2VkIGluLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRtaW5GZXRjaDxUPihwYXRoOiBzdHJpbmcsIGluaXQ6IFJlcXVlc3RJbml0ID0ge30pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3QgdG9rZW4gPSBnZXRUb2tlbigpO1xuICBpZiAoIXRva2VuKSB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhdXRoZW50aWNhdGVkJyk7XG4gIGNvbnN0IHVybCA9IGAke2tSaW90QXBpQmFzZVVybH0ke3BhdGh9YDtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgLi4uaW5pdCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAuLi4oaW5pdC5oZWFkZXJzIHx8IHt9KSxcbiAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAuLi4oaW5pdC5ib2R5ID8geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0gOiB7fSksXG4gICAgfSxcbiAgfSk7XG4gIGxldCBwYXlsb2FkOiBhbnk7XG4gIHRyeSB7IHBheWxvYWQgPSBhd2FpdCByZXMuanNvbigpOyB9IGNhdGNoIHsgcGF5bG9hZCA9IHsgZXJyb3I6IHJlcy5zdGF0dXNUZXh0IH07IH1cbiAgaWYgKCFyZXMub2spIHtcbiAgICBpZiAocmVzLnN0YXR1cyA9PT0gNDAxKSBjbGVhclNlc3Npb24oKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZD8uZXJyb3IgfHwgYEhUVFAgJHtyZXMuc3RhdHVzfWApO1xuICB9XG4gIHJldHVybiBwYXlsb2FkIGFzIFQ7XG59XG4iLCIvLyBDb21wc1NlcnZpY2Ug4oCUIGh5YnJpZCBjb21wIHNvdXJjZTogYmFja2VuZCAobGl2ZSwgbW9kLWVkaXRlZCkg4oaSIGxvY2FsU3RvcmFnZVxuLy8gY2FjaGUgKFRUTCkg4oaSIGJ1bmRsZWQgbWV0YUNvbXBzIChvZmZsaW5lIGZhbGxiYWNrKS4gVXNlZCBieSBGZWF0dXJlUmVuZGVyZXIuXG5cbmltcG9ydCB7IENvbXAgfSBmcm9tICcuLi9tb2RlbHMvdHlwZXMnO1xuaW1wb3J0IHsgbWV0YUNvbXBzIGFzIGJ1bmRsZWRDb21wcyB9IGZyb20gJy4uL2RhdGEvc2V0MTcvY29tcHMnO1xuaW1wb3J0IHsga1Jpb3RBcGlCYXNlVXJsIH0gZnJvbSAnLi4vY29uc3RzJztcbmltcG9ydCB7IGFkbWluRmV0Y2ggfSBmcm9tICcuL0F1dGhTZXJ2aWNlJztcblxuY29uc3QgQ0FDSEVfS0VZID0gJ3Bpdm90dGZ0X2NvbXBzX2NhY2hlX3YxJztcbmNvbnN0IENBQ0hFX1RUTF9NUyA9IDMwICogNjAgKiAxMDAwOyAgLy8gMzAgbWluIOKAlCBjb21wcyBjaGFuZ2UgaW5mcmVxdWVudGx5XG5cbmludGVyZmFjZSBDb21wc0NhY2hlIHtcbiAgZmV0Y2hlZEF0OiBudW1iZXI7XG4gIGNvbXBzOiBDb21wW107XG59XG5cbmZ1bmN0aW9uIHJlYWRDYWNoZSgpOiBDb21wc0NhY2hlIHwgbnVsbCB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmF3ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQ0FDSEVfS0VZKTtcbiAgICByZXR1cm4gcmF3ID8gSlNPTi5wYXJzZShyYXcpIGFzIENvbXBzQ2FjaGUgOiBudWxsO1xuICB9IGNhdGNoIHsgcmV0dXJuIG51bGw7IH1cbn1cblxuZnVuY3Rpb24gd3JpdGVDYWNoZShjb21wczogQ29tcFtdKTogdm9pZCB7XG4gIHRyeSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQ0FDSEVfS0VZLCBKU09OLnN0cmluZ2lmeSh7IGZldGNoZWRBdDogRGF0ZS5ub3coKSwgY29tcHMgfSkpO1xuICB9IGNhdGNoIHsgLyogcXVvdGEg4oCUIGlnbm9yZSAqLyB9XG59XG5cbi8qKlxuICogUmV0dXJucyBjb21wcyB3aXRoIGh5YnJpZCBzdHJhdGVneTpcbiAqIDEuIElmIGZyZXNoIGNhY2hlIOKGkiByZXR1cm4gaW1tZWRpYXRlbHlcbiAqIDIuIElmIHN0YWxlIGNhY2hlIOKGkiByZXR1cm4gc3RhbGUgKyBiYWNrZ3JvdW5kIHJlZnJlc2hcbiAqIDMuIElmIG5vIGNhY2hlIOKGkiBmZXRjaCBuZXR3b3JrLCBmYWxsIGJhY2sgdG8gYnVuZGxlZCBvbiBlcnJvclxuICpcbiAqIFN5bmMgaGVscGVycyAoZ2V0Q29tcHNTeW5jLCBldGMuKSByZXR1cm4gdGhlIHN5bmNocm9ub3VzIGJlc3QgYW5zd2VyIGZvclxuICogY29tcG9uZW50cyB0aGF0IGNhbid0IGF3YWl0IOKAlCB0aGV5J2xsIGdldCBjYWNoZSBPUiBidW5kbGVkLCBuZXZlciBibG9ja2luZy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvbXBzKCk6IFByb21pc2U8Q29tcFtdPiB7XG4gIGNvbnN0IGNhY2hlZCA9IHJlYWRDYWNoZSgpO1xuICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICBjb25zdCBpc0ZyZXNoID0gY2FjaGVkICYmIChub3cgLSBjYWNoZWQuZmV0Y2hlZEF0KSA8IENBQ0hFX1RUTF9NUztcblxuICBpZiAoaXNGcmVzaCkgcmV0dXJuIGNhY2hlZCEuY29tcHM7XG5cbiAgLy8gU3RhbGUgb3IgbWlzc2luZyDigJQgdHJ5IG5ldHdvcmtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtrUmlvdEFwaUJhc2VVcmx9L2NvbXBzYCk7XG4gICAgaWYgKHJlcy5vaykge1xuICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcy5qc29uKCkgYXMgeyBjb21wczogQ29tcFtdIH07XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShib2R5LmNvbXBzKSAmJiBib2R5LmNvbXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgd3JpdGVDYWNoZShib2R5LmNvbXBzKTtcbiAgICAgICAgcmV0dXJuIGJvZHkuY29tcHM7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIHsgLyogZmFsbCB0aHJvdWdoICovIH1cblxuICAvLyBOZXR3b3JrIGZhaWxlZCDigJQgc3RhbGUgY2FjaGUgaXMgc3RpbGwgYmV0dGVyIHRoYW4gbm90aGluZ1xuICBpZiAoY2FjaGVkKSByZXR1cm4gY2FjaGVkLmNvbXBzO1xuICAvLyBMYXN0IHJlc29ydDogYnVuZGxlZCBjb21wc1xuICByZXR1cm4gYnVuZGxlZENvbXBzO1xufVxuXG4vKipcbiAqIFN5bmNocm9ub3VzOiBiZXN0LWF2YWlsYWJsZSBjb21wcyB3aXRob3V0IGF3YWl0aW5nIG5ldHdvcmsuXG4gKiBVc2UgdGhpcyBpbiByZW5kZXIgcGF0aHM7IHRyaWdnZXIgZ2V0Q29tcHMoKSBpbiBwYXJhbGxlbCB0byByZWZyZXNoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcHNTeW5jKCk6IENvbXBbXSB7XG4gIGNvbnN0IGNhY2hlZCA9IHJlYWRDYWNoZSgpO1xuICBpZiAoY2FjaGVkICYmIGNhY2hlZC5jb21wcy5sZW5ndGggPiAwKSByZXR1cm4gY2FjaGVkLmNvbXBzO1xuICByZXR1cm4gYnVuZGxlZENvbXBzO1xufVxuXG4vKipcbiAqIEJhY2tncm91bmQgcmVmcmVzaCDigJQgZmlyZSBhbmQgZm9yZ2V0LiBSZXR1cm5zIGEgcHJvbWlzZSBidXQgbW9zdCBjYWxsZXJzXG4gKiBpZ25vcmUgaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoQ29tcHNJbkJhY2tncm91bmQoKTogUHJvbWlzZTxDb21wW10+IHtcbiAgcmV0dXJuIGdldENvbXBzKCk7XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEFkbWluIG9wZXJhdGlvbnMg4oCUIHJlcXVpcmUgbW9kZXJhdG9yIG9yIGFkbWluIHJvbGUuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZG1pbkNyZWF0ZUNvbXAoY29tcDogQ29tcCk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBhZG1pbkZldGNoKCcvYWRtaW4vY29tcHMnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgaWQ6IGNvbXAuaWQsXG4gICAgICBuYW1lOiBjb21wLm5hbWUsXG4gICAgICB0aWVyOiBjb21wLnRpZXIsXG4gICAgICBwbGF5c3R5bGU6IGNvbXAucGxheXN0eWxlLFxuICAgICAgc2V0TnVtYmVyOiAxNyxcbiAgICAgIGRhdGE6IGNvbXAsXG4gICAgICBpc1B1Ymxpc2hlZDogdHJ1ZSxcbiAgICB9KSxcbiAgfSk7XG4gIGludmFsaWRhdGVDYWNoZSgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRtaW5VcGRhdGVDb21wKGlkOiBzdHJpbmcsIGNvbXA6IFBhcnRpYWw8Q29tcD4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgYWRtaW5GZXRjaChgL2FkbWluL2NvbXBzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KGlkKX1gLCB7XG4gICAgbWV0aG9kOiAnUFVUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lOiBjb21wLm5hbWUsXG4gICAgICB0aWVyOiBjb21wLnRpZXIsXG4gICAgICBwbGF5c3R5bGU6IGNvbXAucGxheXN0eWxlLFxuICAgICAgZGF0YTogY29tcCxcbiAgICB9KSxcbiAgfSk7XG4gIGludmFsaWRhdGVDYWNoZSgpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRtaW5EZWxldGVDb21wKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgYWRtaW5GZXRjaChgL2FkbWluL2NvbXBzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KGlkKX1gLCB7IG1ldGhvZDogJ0RFTEVURScgfSk7XG4gIGludmFsaWRhdGVDYWNoZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52YWxpZGF0ZUNhY2hlKCk6IHZvaWQge1xuICB0cnkgeyBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShDQUNIRV9LRVkpOyB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBBZG1pbiBwYW5lbCDigJQgY29tcHMgQ1JVRC4gR2F0ZWQgYnkgbW9kZXJhdG9yL2FkbWluIHJvbGUgb24gdGhlIGJhY2tlbmQ7XG4vLyB0aGUgVUkgYWxzbyBnYXRlcyB3aXRoIGhhc0F0TGVhc3QoJ21vZGVyYXRvcicpIHRvIGZhaWwgZmFzdC5cblxuaW1wb3J0IHsgQ29tcCwgQ29tcFVuaXQgfSBmcm9tICcuLi9tb2RlbHMvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3RvcmVkVXNlciwgaGFzQXRMZWFzdCwgbG9nb3V0IH0gZnJvbSAnLi4vc2VydmljZXMvQXV0aFNlcnZpY2UnO1xuaW1wb3J0IHsgZ2V0Q29tcHMsIGFkbWluQ3JlYXRlQ29tcCwgYWRtaW5VcGRhdGVDb21wLCBhZG1pbkRlbGV0ZUNvbXAgfSBmcm9tICcuLi9zZXJ2aWNlcy9Db21wc1NlcnZpY2UnO1xuXG5sZXQgY29tcHM6IENvbXBbXSA9IFtdO1xubGV0IHNlbGVjdGVkSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xubGV0IGlzTmV3TW9kZSA9IGZhbHNlO1xuXG5mdW5jdGlvbiAkPFQgZXh0ZW5kcyBIVE1MRWxlbWVudD4oaWQ6IHN0cmluZyk6IFQgfCBudWxsIHtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSBhcyBUIHwgbnVsbDtcbn1cblxuZnVuY3Rpb24gZXNjYXBlSHRtbChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcy5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7JykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xufVxuXG5mdW5jdGlvbiBjbG9zZVdpbmRvdygpOiB2b2lkIHtcbiAgb3ZlcndvbGYud2luZG93cy5nZXRDdXJyZW50V2luZG93KHJlcyA9PiB7XG4gICAgaWYgKHJlcz8uc3VjY2VzcyAmJiByZXMud2luZG93Py5pZCkgb3ZlcndvbGYud2luZG93cy5jbG9zZShyZXMud2luZG93LmlkKTtcbiAgfSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEhlYWRlclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiByZW5kZXJIZWFkZXIoKTogdm9pZCB7XG4gIGNvbnN0IHVzZXIgPSBnZXRTdG9yZWRVc2VyKCk7XG4gIGNvbnN0IHNwYW4gPSAkKCdhZG1pbi1jdXJyZW50LXVzZXInKTtcbiAgaWYgKCFzcGFuKSByZXR1cm47XG4gIGlmICh1c2VyKSB7XG4gICAgc3Bhbi5pbm5lckhUTUwgPSBgJHtlc2NhcGVIdG1sKHVzZXIuZW1haWwpfSA8ZW0gc3R5bGU9XCJvcGFjaXR5OjAuNjtcIj4oJHt1c2VyLnJvbGV9KTwvZW0+YDtcbiAgfSBlbHNlIHtcbiAgICBzcGFuLnRleHRDb250ZW50ID0gJ25vdCBzaWduZWQgaW4nO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFNpZGViYXIgbGlzdFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiByZW5kZXJMaXN0KGZpbHRlciA9ICcnKTogdm9pZCB7XG4gIGNvbnN0IGxpc3QgPSAkKCdhZG1pbi1jb21wcy1saXN0Jyk7XG4gIGlmICghbGlzdCkgcmV0dXJuO1xuICBjb25zdCBmID0gZmlsdGVyLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICBjb25zdCBmaWx0ZXJlZCA9IGZcbiAgICA/IGNvbXBzLmZpbHRlcihjID0+IGMubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGYpIHx8IGMuaWQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmKSlcbiAgICA6IGNvbXBzO1xuICBpZiAoZmlsdGVyZWQubGVuZ3RoID09PSAwKSB7XG4gICAgbGlzdC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImFkbWluLWVtcHR5XCI+Tm8gY29tcHMuPC9kaXY+JztcbiAgICByZXR1cm47XG4gIH1cbiAgbGlzdC5pbm5lckhUTUwgPSBmaWx0ZXJlZC5tYXAoYyA9PiBgXG4gICAgPGJ1dHRvbiBjbGFzcz1cImFkbWluLWNvbXAtcm93ICR7Yy5pZCA9PT0gc2VsZWN0ZWRJZCA/ICdzZWxlY3RlZCcgOiAnJ31cIiBkYXRhLWNvbXAtaWQ9XCIke2VzY2FwZUh0bWwoYy5pZCl9XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImFkbWluLWNvbXAtdGllciB0aWVyLSR7Yy50aWVyLnRvTG93ZXJDYXNlKCl9XCI+JHtlc2NhcGVIdG1sKGMudGllcil9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhZG1pbi1jb21wLW5hbWVcIj4ke2VzY2FwZUh0bWwoYy5uYW1lKX08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImFkbWluLWNvbXAtaWRcIj4ke2VzY2FwZUh0bWwoYy5pZCl9PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICBgKS5qb2luKCcnKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRWRpdG9yXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGNsZWFyRWRpdG9yKCk6IHZvaWQge1xuICAkKCdhZG1pbi1lZGl0b3ItZW1wdHknKSEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICQoJ2FkbWluLWVkaXRvci1mb3JtJykhLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHNldFN0YXR1cygnJyk7XG59XG5cbmZ1bmN0aW9uIHNob3dFZGl0b3IoY29tcDogQ29tcCB8IG51bGwpOiB2b2lkIHtcbiAgJCgnYWRtaW4tZWRpdG9yLWVtcHR5JykhLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICQoJ2FkbWluLWVkaXRvci1mb3JtJykhLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cbiAgaXNOZXdNb2RlID0gY29tcCA9PT0gbnVsbDtcbiAgY29uc3QgdGl0bGUgPSAkKCdhZG1pbi1lZGl0b3ItdGl0bGUnKTtcbiAgaWYgKHRpdGxlKSB0aXRsZS50ZXh0Q29udGVudCA9IGlzTmV3TW9kZSA/ICdOZXcgY29tcCcgOiAnRWRpdCBjb21wJztcblxuICAvLyBJRCBmaWVsZCDigJQgbG9ja2VkIHdoZW4gZWRpdGluZyBleGlzdGluZyBjb21wIChpZCBpcyBwcmltYXJ5IGtleSlcbiAgY29uc3QgaWRJbnB1dCA9ICQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLWlkJyk7XG4gIGlmIChpZElucHV0KSB7XG4gICAgaWRJbnB1dC52YWx1ZSA9IGNvbXA/LmlkIHx8ICcnO1xuICAgIGlkSW5wdXQuZGlzYWJsZWQgPSAhaXNOZXdNb2RlO1xuICB9XG4gICgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdmaWVsZC1uYW1lJykhKS52YWx1ZSA9IGNvbXA/Lm5hbWUgfHwgJyc7XG4gICgkPEhUTUxTZWxlY3RFbGVtZW50PignZmllbGQtdGllcicpISkudmFsdWUgPSBjb21wPy50aWVyIHx8ICdCJztcbiAgKCQ8SFRNTFNlbGVjdEVsZW1lbnQ+KCdmaWVsZC1wbGF5c3R5bGUnKSEpLnZhbHVlID0gY29tcD8ucGxheXN0eWxlIHx8ICdTdGFuZGFyZCc7XG4gICgkPEhUTUxTZWxlY3RFbGVtZW50PignZmllbGQtZGlmZmljdWx0eScpISkudmFsdWUgPSBjb21wPy5kaWZmaWN1bHR5IHx8ICdNZWRpdW0nO1xuICAoJDxIVE1MSW5wdXRFbGVtZW50PignZmllbGQtbGV2ZWwnKSEpLnZhbHVlID0gU3RyaW5nKGNvbXA/LmxldmVsID8/IDgpO1xuICAoJDxIVE1MVGV4dEFyZWFFbGVtZW50PignZmllbGQtZGVzY3JpcHRpb24nKSEpLnZhbHVlID0gY29tcD8uZGVzY3JpcHRpb24gfHwgJyc7XG4gICgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdmaWVsZC1jb3JlLXRyYWl0cycpISkudmFsdWUgPSAoY29tcD8uY29yZVRyYWl0cyB8fCBbXSkuam9pbignLCAnKTtcbiAgKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLWF1Z21lbnRzJykhKS52YWx1ZSA9IChjb21wPy5yZWNvbW1lbmRlZEF1Z21lbnRzIHx8IFtdKS5qb2luKCcsICcpO1xuICAoJDxIVE1MVGV4dEFyZWFFbGVtZW50PignZmllbGQtdW5pdHMnKSEpLnZhbHVlID0gSlNPTi5zdHJpbmdpZnkoY29tcD8udW5pdHMgfHwgW10sIG51bGwsIDIpO1xuICAoJDxIVE1MVGV4dEFyZWFFbGVtZW50PignZmllbGQtZWFybHknKSEpLnZhbHVlID0gY29tcD8uZWFybHlHYW1lIHx8ICcnO1xuICAoJDxIVE1MVGV4dEFyZWFFbGVtZW50PignZmllbGQtbWlkJykhKS52YWx1ZSAgID0gY29tcD8ubWlkR2FtZSAgIHx8ICcnO1xuICAoJDxIVE1MVGV4dEFyZWFFbGVtZW50PignZmllbGQtbGF0ZScpISkudmFsdWUgID0gY29tcD8ubGF0ZUdhbWUgIHx8ICcnO1xuICAoJDxIVE1MVGV4dEFyZWFFbGVtZW50PignZmllbGQtdGlwcycpISkudmFsdWUgID0gY29tcD8udGlwcyAgICAgIHx8ICcnO1xuXG4gIC8vIEhpZGUgRGVsZXRlIGJ1dHRvbiBpbiBuZXcgbW9kZVxuICBjb25zdCBkZWwgPSAkPEhUTUxCdXR0b25FbGVtZW50PignYWRtaW4tZGVsZXRlJyk7XG4gIGlmIChkZWwpIGRlbC5zdHlsZS5kaXNwbGF5ID0gaXNOZXdNb2RlID8gJ25vbmUnIDogJ2lubGluZS1ibG9jayc7XG5cbiAgc2V0U3RhdHVzKCcnKTtcbn1cblxuZnVuY3Rpb24gc2V0U3RhdHVzKG1zZzogc3RyaW5nLCBraW5kOiAnb2snIHwgJ2VycicgfCAnJyA9ICcnKTogdm9pZCB7XG4gIGNvbnN0IGVsID0gJCgnYWRtaW4tZWRpdG9yLXN0YXR1cycpO1xuICBpZiAoIWVsKSByZXR1cm47XG4gIGVsLnRleHRDb250ZW50ID0gbXNnO1xuICBlbC5jbGFzc05hbWUgPSBgYWRtaW4tZWRpdG9yLXN0YXR1cyAke2tpbmR9YDtcbn1cblxuZnVuY3Rpb24gY29sbGVjdEVkaXRvckNvbXAoKTogQ29tcCB8IG51bGwge1xuICBjb25zdCBpZCA9ICgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdmaWVsZC1pZCcpISkudmFsdWUudHJpbSgpO1xuICBjb25zdCBuYW1lID0gKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLW5hbWUnKSEpLnZhbHVlLnRyaW0oKTtcbiAgaWYgKCFpZCB8fCAhbmFtZSkge1xuICAgIHNldFN0YXR1cygnSUQgYW5kIE5hbWUgYXJlIHJlcXVpcmVkLicsICdlcnInKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoIS9eW2EtejAtOVxcLV9dKyQvaS50ZXN0KGlkKSkge1xuICAgIHNldFN0YXR1cygnSUQgbXVzdCBjb250YWluIG9ubHkgbGV0dGVycywgZGlnaXRzLCBkYXNoZXMsIHVuZGVyc2NvcmVzLicsICdlcnInKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxldCB1bml0czogQ29tcFVuaXRbXSA9IFtdO1xuICB0cnkge1xuICAgIHVuaXRzID0gSlNPTi5wYXJzZSgoJDxIVE1MVGV4dEFyZWFFbGVtZW50PignZmllbGQtdW5pdHMnKSEpLnZhbHVlIHx8ICdbXScpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh1bml0cykpIHRocm93IG5ldyBFcnJvcigndW5pdHMgbXVzdCBiZSBhIEpTT04gYXJyYXknKTtcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgc2V0U3RhdHVzKGBVbml0cyBKU09OIGludmFsaWQ6ICR7ZS5tZXNzYWdlfWAsICdlcnInKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHNwbGl0Q3N2ID0gKHM6IHN0cmluZyk6IHN0cmluZ1tdID0+IHMuc3BsaXQoJywnKS5tYXAoeCA9PiB4LnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pO1xuXG4gIHJldHVybiB7XG4gICAgaWQsXG4gICAgbmFtZSxcbiAgICB0aWVyOiAoJDxIVE1MU2VsZWN0RWxlbWVudD4oJ2ZpZWxkLXRpZXInKSEpLnZhbHVlIGFzIGFueSxcbiAgICBwbGF5c3R5bGU6ICgkPEhUTUxTZWxlY3RFbGVtZW50PignZmllbGQtcGxheXN0eWxlJykhKS52YWx1ZSBhcyBhbnksXG4gICAgZGlmZmljdWx0eTogKCQ8SFRNTFNlbGVjdEVsZW1lbnQ+KCdmaWVsZC1kaWZmaWN1bHR5JykhKS52YWx1ZSBhcyBhbnksXG4gICAgbGV2ZWw6IHBhcnNlSW50KCgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdmaWVsZC1sZXZlbCcpISkudmFsdWUsIDEwKSB8fCA4LFxuICAgIGRlc2NyaXB0aW9uOiAoJDxIVE1MVGV4dEFyZWFFbGVtZW50PignZmllbGQtZGVzY3JpcHRpb24nKSEpLnZhbHVlLFxuICAgIGNvcmVUcmFpdHM6IHNwbGl0Q3N2KCgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdmaWVsZC1jb3JlLXRyYWl0cycpISkudmFsdWUpLFxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IHNwbGl0Q3N2KCgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdmaWVsZC1hdWdtZW50cycpISkudmFsdWUpLFxuICAgIHVuaXRzLFxuICAgIGVhcmx5R2FtZTogKCQ8SFRNTFRleHRBcmVhRWxlbWVudD4oJ2ZpZWxkLWVhcmx5JykhKS52YWx1ZSB8fCB1bmRlZmluZWQsXG4gICAgbWlkR2FtZTogICAoJDxIVE1MVGV4dEFyZWFFbGVtZW50PignZmllbGQtbWlkJykhKS52YWx1ZSAgIHx8IHVuZGVmaW5lZCxcbiAgICBsYXRlR2FtZTogICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC1sYXRlJykhKS52YWx1ZSAgfHwgdW5kZWZpbmVkLFxuICAgIHRpcHM6ICAgICAgKCQ8SFRNTFRleHRBcmVhRWxlbWVudD4oJ2ZpZWxkLXRpcHMnKSEpLnZhbHVlICB8fCB1bmRlZmluZWQsXG4gIH07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEFjdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlU2F2ZShlOiBFdmVudCk6IFByb21pc2U8dm9pZD4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGNvbXAgPSBjb2xsZWN0RWRpdG9yQ29tcCgpO1xuICBpZiAoIWNvbXApIHJldHVybjtcbiAgc2V0U3RhdHVzKCdTYXZpbmfigKYnKTtcbiAgdHJ5IHtcbiAgICBpZiAoaXNOZXdNb2RlKSB7XG4gICAgICBhd2FpdCBhZG1pbkNyZWF0ZUNvbXAoY29tcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IGFkbWluVXBkYXRlQ29tcChjb21wLmlkLCBjb21wKTtcbiAgICB9XG4gICAgc2V0U3RhdHVzKCdTYXZlZCDinJMnLCAnb2snKTtcbiAgICBhd2FpdCByZWZyZXNoQ29tcHMoKTtcbiAgICBzZWxlY3RlZElkID0gY29tcC5pZDtcbiAgICBzaG93RWRpdG9yKGNvbXBzLmZpbmQoYyA9PiBjLmlkID09PSBjb21wLmlkKSB8fCBjb21wKTtcbiAgICByZW5kZXJMaXN0KCgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdhZG1pbi1jb21wLWZpbHRlcicpPy52YWx1ZSkgfHwgJycpO1xuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIHNldFN0YXR1cyhgRmFpbGVkOiAke2Vyci5tZXNzYWdlIHx8IGVycn1gLCAnZXJyJyk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlRGVsZXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoIXNlbGVjdGVkSWQpIHJldHVybjtcbiAgaWYgKCFjb25maXJtKGBEZWxldGUgY29tcCBcIiR7c2VsZWN0ZWRJZH1cIiBwZXJtYW5lbnRseT8gVGhpcyBhZmZlY3RzIGFsbCBQaXZvdFRGVCB1c2Vycy5gKSkgcmV0dXJuO1xuICBzZXRTdGF0dXMoJ0RlbGV0aW5n4oCmJyk7XG4gIHRyeSB7XG4gICAgYXdhaXQgYWRtaW5EZWxldGVDb21wKHNlbGVjdGVkSWQpO1xuICAgIHNldFN0YXR1cygnJyk7XG4gICAgc2VsZWN0ZWRJZCA9IG51bGw7XG4gICAgYXdhaXQgcmVmcmVzaENvbXBzKCk7XG4gICAgY2xlYXJFZGl0b3IoKTtcbiAgICByZW5kZXJMaXN0KCgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdhZG1pbi1jb21wLWZpbHRlcicpPy52YWx1ZSkgfHwgJycpO1xuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIHNldFN0YXR1cyhgRGVsZXRlIGZhaWxlZDogJHtlcnIubWVzc2FnZSB8fCBlcnJ9YCwgJ2VycicpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hDb21wcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgdHJ5IHtcbiAgICBjb21wcyA9IGF3YWl0IGdldENvbXBzKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdbQWRtaW5dIEZhaWxlZCB0byBmZXRjaCBjb21wcycsIGUpO1xuICAgIGNvbXBzID0gW107XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQm9vdFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5hc3luYyBmdW5jdGlvbiBib290KCkge1xuICByZW5kZXJIZWFkZXIoKTtcblxuICAvLyBSb2xlIGdhdGVcbiAgaWYgKCFoYXNBdExlYXN0KCdtb2RlcmF0b3InKSkge1xuICAgICQoJ2FkbWluLW1haW4nKSEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAkKCdhZG1pbi1mb3JiaWRkZW4nKSEuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICByZXR1cm47XG4gIH1cblxuICBhd2FpdCByZWZyZXNoQ29tcHMoKTtcbiAgcmVuZGVyTGlzdCgpO1xuICBjbGVhckVkaXRvcigpO1xuXG4gIC8vIFdpcmUgZXZlbnRzXG4gICQoJ2FkbWluLWNsb3NlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VXaW5kb3cpO1xuICAkKCdhZG1pbi1mb3JiaWRkZW4tY2xvc2UnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVdpbmRvdyk7XG4gICQoJ2FkbWluLWxvZ291dCcpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgbG9nb3V0KCk7IGNsb3NlV2luZG93KCk7IH0pO1xuXG4gICQoJ2FkbWluLWNvbXAtZmlsdGVyJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcbiAgICByZW5kZXJMaXN0KChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG4gIH0pO1xuXG4gICQoJ2FkbWluLWNvbXBzLWxpc3QnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IHJvdyA9IChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xvc2VzdDxIVE1MRWxlbWVudD4oJy5hZG1pbi1jb21wLXJvdycpO1xuICAgIGlmICghcm93KSByZXR1cm47XG4gICAgY29uc3QgaWQgPSByb3cuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbXAtaWQnKTtcbiAgICBpZiAoIWlkKSByZXR1cm47XG4gICAgc2VsZWN0ZWRJZCA9IGlkO1xuICAgIGNvbnN0IGNvbXAgPSBjb21wcy5maW5kKGMgPT4gYy5pZCA9PT0gaWQpO1xuICAgIGlmIChjb21wKSBzaG93RWRpdG9yKGNvbXApO1xuICAgIHJlbmRlckxpc3QoKCQ8SFRNTElucHV0RWxlbWVudD4oJ2FkbWluLWNvbXAtZmlsdGVyJyk/LnZhbHVlKSB8fCAnJyk7XG4gIH0pO1xuXG4gICQoJ2FkbWluLW5ldy1jb21wJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHNlbGVjdGVkSWQgPSBudWxsO1xuICAgIHNob3dFZGl0b3IobnVsbCk7XG4gIH0pO1xuXG4gICQoJ2FkbWluLWVkaXRvci1mb3JtJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGhhbmRsZVNhdmUgYXMgYW55KTtcbiAgJCgnYWRtaW4tZGVsZXRlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlRGVsZXRlKTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBib290KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==