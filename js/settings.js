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

/***/ "./src/data/set17/champions.ts":
/*!*************************************!*\
  !*** ./src/data/set17/champions.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getChampionsByTrait = exports.getChampionsByCost = exports.championMap = exports.champions = void 0;
exports.champions = [
    { id: 'TFT17_Aatrox', name: "Aatrox", cost: 1, traits: ['N.O.V.A.', 'Bastion'], tileIcon: 'ASSETS/Characters/TFT17_Aatrox/Skins/Base/Images/TFT17_Aatrox_splash_tile_30.TFT_Set17.png' },
    { id: 'TFT17_Briar', name: "Briar", cost: 1, traits: ['Anima', 'Primordian', 'Rogue'], tileIcon: 'ASSETS/Characters/TFT17_Briar/Skins/Base/Images/TFT17_Briar_splash_tile_10.TFT_Set17.png' },
    { id: 'TFT17_Caitlyn', name: "Caitlyn", cost: 1, traits: ['N.O.V.A.', 'Fateweaver'], tileIcon: 'ASSETS/Characters/TFT17_Caitlyn/Skins/Base/Images/TFT17_Caitlyn_splash_tile_48.TFT_Set17.png' },
    { id: 'TFT17_Chogath', name: "Cho'Gath", cost: 1, traits: ['Dark Star', 'Brawler'], tileIcon: 'ASSETS/Characters/TFT17_Chogath/Skins/Base/Images/TFT17_Chogath_splash_tile_7.TFT_Set17.png' },
    { id: 'TFT17_Ezreal', name: "Ezreal", cost: 1, traits: ['Timebreaker', 'Sniper'], tileIcon: 'ASSETS/Characters/TFT17_Ezreal/Skins/Base/Images/TFT17_Ezreal_splash_tile_5.TFT_Set17.png' },
    { id: 'TFT17_Leona', name: "Leona", cost: 1, traits: ['Arbiter', 'Vanguard'], tileIcon: 'ASSETS/Characters/TFT17_Leona/Skins/Base/Images/TFT17_Leona_splash_tile_64.TFT_Set17.png' },
    { id: 'TFT17_Lissandra', name: "Lissandra", cost: 1, traits: ['Dark Star', 'Shepherd', 'Replicator'], tileIcon: 'ASSETS/Characters/TFT17_Lissandra/Skins/Base/Images/TFT17_Lissandra_splash_tile_12.TFT_Set17.png' },
    { id: 'TFT17_Nasus', name: "Nasus", cost: 1, traits: ['Space Groove', 'Vanguard'], tileIcon: 'ASSETS/Characters/TFT17_Nasus/Skins/Base/Images/TFT17_Nasus_splash_tile_25.TFT_Set17.png' },
    { id: 'TFT17_Poppy', name: "Poppy", cost: 1, traits: ['Meeple', 'Bastion'], tileIcon: 'ASSETS/Characters/TFT17_Poppy/Skins/Base/Images/TFT17_Poppy_splash_tile_16.TFT_Set17.png' },
    { id: 'TFT17_RekSai', name: "Rek'Sai", cost: 1, traits: ['Primordian', 'Brawler'], tileIcon: 'ASSETS/Characters/TFT17_RekSai/Skins/Base/Images/TFT17_RekSai_splash_tile_26.TFT_Set17.png' },
    { id: 'TFT17_Talon', name: "Talon", cost: 1, traits: ['Stargazer', 'Rogue'], tileIcon: 'ASSETS/Characters/TFT17_Talon/Skins/Base/Images/TFT17_Talon_splash_tile_39.TFT_Set17.png' },
    { id: 'TFT17_Teemo', name: "Teemo", cost: 1, traits: ['Space Groove', 'Shepherd'], tileIcon: 'ASSETS/Characters/TFT17_Teemo/Skins/Base/Images/TFT17_Teemo_splash_tile_47.TFT_Set17.png' },
    { id: 'TFT17_TwistedFate', name: "Twisted Fate", cost: 1, traits: ['Stargazer', 'Fateweaver'], tileIcon: 'ASSETS/Characters/TFT17_TwistedFate/Skins/Base/Images/TFT17_TwistedFate_splash_tile_45.TFT_Set17.png' },
    { id: 'TFT17_Veigar', name: "Veigar", cost: 1, traits: ['Meeple', 'Replicator'], tileIcon: 'ASSETS/Characters/TFT17_Veigar/Skins/Base/Images/TFT17_Veigar_splash_tile_32.TFT_Set17.png' },
    { id: 'TFT17_Akali', name: "Akali", cost: 2, traits: ['N.O.V.A.', 'Marauder'], tileIcon: 'ASSETS/Characters/TFT17_Akali/Skins/Base/Images/TFT17_Akali_splash_tile_68.TFT_Set17.png' },
    { id: 'TFT17_Belveth', name: "Bel'Veth", cost: 2, traits: ['Primordian', 'Challenger', 'Marauder'], tileIcon: 'ASSETS/Characters/TFT17_Belveth/Skins/Base/Images/TFT17_Belveth_splash_tile_19.TFT_Set17.png' },
    { id: 'TFT17_Gnar', name: "Gnar", cost: 2, traits: ['Meeple', 'Sniper'], tileIcon: 'ASSETS/Characters/TFT17_Gnar/Skins/Base/Images/TFT17_Gnar_splash_tile_15.TFT_Set17.png' },
    { id: 'TFT17_Gragas', name: "Gragas", cost: 2, traits: ['Psionic', 'Brawler'], tileIcon: 'ASSETS/Characters/TFT17_Gragas/Skins/Base/Images/TFT17_Gragas_splash_tile_10.TFT_Set17.png' },
    { id: 'TFT17_Gwen', name: "Gwen", cost: 2, traits: ['Space Groove', 'Rogue'], tileIcon: 'ASSETS/Characters/TFT17_Gwen/Skins/Base/Images/TFT17_Gwen_splash_tile_1.TFT_Set17.png' },
    { id: 'TFT17_Jax', name: "Jax", cost: 2, traits: ['Stargazer', 'Bastion'], tileIcon: 'ASSETS/Characters/TFT17_Jax/Skins/Base/Images/TFT17_Jax_Mobile.TFT_Set17.png' },
    { id: 'TFT17_Jinx', name: "Jinx", cost: 2, traits: ['Anima', 'Challenger'], tileIcon: 'ASSETS/Characters/TFT17_Jinx/Skins/Base/Images/TFT17_Jinx_splash_tile_38.TFT_Set17.png' },
    { id: 'TFT17_Milio', name: "Milio", cost: 2, traits: ['Timebreaker', 'Fateweaver'], tileIcon: 'ASSETS/Characters/TFT17_Milio/Skins/Base/Images/TFT17_Milio_splash_tile_0.TFT_Set17.png' },
    { id: 'TFT17_Mordekaiser', name: "Mordekaiser", cost: 2, traits: ['Dark Star', 'Conduit', 'Vanguard'], tileIcon: 'ASSETS/Characters/TFT17_Mordekaiser/Skins/Base/Images/TFT17_Mordekaiser_splash_tile_6.TFT_Set17.png' },
    { id: 'TFT17_Pantheon', name: "Pantheon", cost: 2, traits: ['Timebreaker', 'Brawler', 'Replicator'], tileIcon: 'ASSETS/Characters/TFT17_Pantheon/Skins/Base/Images/TFT17_Pantheon_splash_tile_16.TFT_Set17.png' },
    { id: 'TFT17_Pyke', name: "Pyke", cost: 2, traits: ['Psionic', 'Voyager'], tileIcon: 'ASSETS/Characters/TFT17_Pyke/Skins/Base/Images/TFT17_Pyke_splash_tile_25.TFT_Set17.png' },
    { id: 'TFT17_Zoe', name: "Zoe", cost: 2, traits: ['Arbiter', 'Conduit'], tileIcon: 'ASSETS/Characters/TFT17_Zoe/Skins/Base/Images/TFT17_Zoe_splash_tile_43.TFT_Set17.png' },
    { id: 'TFT17_Aurora', name: "Aurora", cost: 3, traits: ['Anima', 'Voyager'], tileIcon: 'ASSETS/Characters/TFT17_Aurora/Skins/Base/Images/TFT17_Aurora_splash_tile_1.TFT_Set17.png' },
    { id: 'TFT17_Diana', name: "Diana", cost: 3, traits: ['Arbiter', 'Challenger'], tileIcon: 'ASSETS/Characters/TFT17_Diana/Skins/Base/Images/TFT17_DianaSplash_Mobile.TFT_Set17.png' },
    { id: 'TFT17_Fizz', name: "Fizz", cost: 3, traits: ['Meeple', 'Rogue'], tileIcon: 'ASSETS/Characters/TFT17_Fizz/Skins/Base/Images/TFT17_Fizz_splash_tile_26.TFT_Set17.png' },
    { id: 'TFT17_Illaoi', name: "Illaoi", cost: 3, traits: ['Anima', 'Vanguard', 'Shepherd'], tileIcon: 'ASSETS/Characters/TFT17_Illaoi/Skins/Base/Images/TFT17_Illaoi_splash_tile_27.TFT_Set17.png' },
    { id: 'TFT17_Kaisa', name: "Kai'Sa", cost: 3, traits: ['Dark Star', 'Rogue'], tileIcon: 'ASSETS/Characters/TFT17_Kaisa/Skins/Base/Images/TFT17_Kaisa_splash_tile_69.TFT_Set17.png' },
    { id: 'TFT17_Lulu', name: "Lulu", cost: 3, traits: ['Stargazer', 'Replicator'], tileIcon: 'ASSETS/Characters/TFT17_Lulu/Skins/Base/Images/TFT17_Lulu_splash_tile_14.TFT_Set17.png' },
    { id: 'TFT17_Maokai', name: "Maokai", cost: 3, traits: ['N.O.V.A.', 'Brawler'], tileIcon: 'ASSETS/Characters/TFT17_Maokai/Skins/Base/Images/TFT17_Maokai_splash_tile_33.TFT_Set17.png' },
    { id: 'TFT17_MissFortune', name: "Miss Fortune", cost: 3, traits: ['Gun Goddess'], tileIcon: 'ASSETS/Characters/TFT17_MissFortune/Skins/Base/Images/TFT17_MissFortune_splash_tile_16.TFT_Set17.png' },
    { id: 'TFT17_Ornn', name: "Ornn", cost: 3, traits: ['Space Groove', 'Bastion'], tileIcon: 'ASSETS/Characters/TFT17_Ornn/Skins/Base/Images/TFT17_Ornn_splash_tile_11.TFT_Set17.png' },
    { id: 'TFT17_Rhaast', name: "Rhaast", cost: 3, traits: ['Redeemer'], tileIcon: 'ASSETS/Characters/TFT17_Rhaast/Skins/Base/Images/TFT17_KaynSplash_Tile.TFT_Set17.png' },
    { id: 'TFT17_Samira', name: "Samira", cost: 3, traits: ['Space Groove', 'Sniper'], tileIcon: 'ASSETS/Characters/TFT17_Samira/Skins/Base/Images/TFT17_Samira_splash_tile_10.TFT_Set17.png' },
    { id: 'TFT17_Urgot', name: "Urgot", cost: 3, traits: ['Mecha', 'Brawler', 'Marauder'], tileIcon: 'ASSETS/Characters/TFT17_Urgot/Skins/Base/Images/TFT17_Urgot_splash_tile_32.TFT_Set17.png' },
    { id: 'TFT17_Viktor', name: "Viktor", cost: 3, traits: ['Psionic', 'Conduit'], tileIcon: 'ASSETS/Characters/TFT17_Viktor/Skins/Base/Images/TFT17_Viktor_splash_tile_5.TFT_Set17.png' },
    { id: 'TFT17_AurelionSol', name: "Aurelion Sol", cost: 4, traits: ['Mecha', 'Conduit'], tileIcon: 'ASSETS/Characters/TFT17_AurelionSol/Skins/Base/Images/TFT17_AurelionSol_splash_tile_2.TFT_Set17.png' },
    { id: 'TFT17_Corki', name: "Corki", cost: 4, traits: ['Meeple', 'Fateweaver'], tileIcon: 'ASSETS/Characters/TFT17_Corki/Skins/Base/Images/TFT17_Corki_splash_tile_26.TFT_Set17.png' },
    { id: 'TFT17_Karma', name: "Karma", cost: 4, traits: ['Dark Star', 'Voyager'], tileIcon: 'ASSETS/Characters/TFT17_Karma/Skins/Base/Images/TFT17_Karma_splash_tile_8.TFT_Set17.png' },
    { id: 'TFT17_Kindred', name: "Kindred", cost: 4, traits: ['N.O.V.A.', 'Challenger'], tileIcon: 'ASSETS/Characters/TFT17_Kindred/Skins/Base/Images/TFT17_Kindred_splash_tile_23.TFT_Set17.png' },
    { id: 'TFT17_Leblanc', name: "LeBlanc", cost: 4, traits: ['Arbiter', 'Shepherd'], tileIcon: 'ASSETS/Characters/TFT17_Leblanc/Skins/Base/Images/TFT17_Leblanc_splash_tile_29.TFT_Set17.png' },
    { id: 'TFT17_MasterYi', name: "Master Yi", cost: 4, traits: ['Psionic', 'Marauder'], tileIcon: 'ASSETS/Characters/TFT17_MasterYi/Skins/Base/Images/TFT17_MasterYi_splash_tile_33.TFT_Set17.png' },
    { id: 'TFT17_Nami', name: "Nami", cost: 4, traits: ['Space Groove', 'Replicator'], tileIcon: 'ASSETS/Characters/TFT17_Nami/Skins/Base/Images/TFT17_Nami_splash_tile_41.TFT_Set17.png' },
    { id: 'TFT17_Nunu', name: "Nunu & Willump", cost: 4, traits: ['Stargazer', 'Vanguard'], tileIcon: 'ASSETS/Characters/TFT17_Nunu/Skins/Base/Images/TFT17_Nunu_splash_tile_35.TFT_Set17.png' },
    { id: 'TFT17_Rammus', name: "Rammus", cost: 4, traits: ['Meeple', 'Bastion'], tileIcon: 'ASSETS/Characters/TFT17_Rammus/Skins/Base/Images/TFT17_Rammus_splash_tile_17.TFT_Set17.png' },
    { id: 'TFT17_Riven', name: "Riven", cost: 4, traits: ['Timebreaker', 'Rogue'], tileIcon: 'ASSETS/Characters/TFT17_Riven/Skins/Base/Images/TFT17_Riven_splash_tile_18.TFT_Set17.png' },
    { id: 'TFT17_TahmKench', name: "Tahm Kench", cost: 4, traits: ['Oracle', 'Brawler'], tileIcon: 'ASSETS/Characters/TFT17_TahmKench/Skins/Base/Images/TFT17_TahmKench_splash_tile_11.TFT_Set17.png' },
    { id: 'TFT17_Galio', name: "The Mighty Mech", cost: 4, traits: ['Mecha', 'Voyager'], tileIcon: 'ASSETS/Characters/TFT17_Galio/Skins/Base/Images/TFT17_Galio_Mobile.TFT_Set17.png' },
    { id: 'TFT17_Xayah', name: "Xayah", cost: 4, traits: ['Stargazer', 'Sniper'], tileIcon: 'ASSETS/Characters/TFT17_Xayah/Skins/Base/Images/TFT17_Xayah_splash_tile_1.TFT_Set17.png' },
    { id: 'TFT17_Bard', name: "Bard", cost: 5, traits: ['Meeple', 'Conduit'], tileIcon: 'ASSETS/Characters/TFT17_Bard/Skins/Base/Images/TFT17_Bard_splash_tile_8.TFT_Set17.png' },
    { id: 'TFT17_Blitzcrank', name: "Blitzcrank", cost: 5, traits: ['Party Animal', 'Space Groove', 'Vanguard'], tileIcon: 'ASSETS/Characters/TFT17_Blitzcrank/Skins/Base/Images/TFT17_Blitzcrank_splash_tile_65.TFT_Set17.png' },
    { id: 'TFT17_Fiora', name: "Fiora", cost: 5, traits: ['Divine Duelist', 'Anima', 'Marauder'], tileIcon: 'ASSETS/Characters/TFT17_Fiora/Skins/Base/Images/TFT17_Fiora_splash_tile_51.TFT_Set17.png' },
    { id: 'TFT17_Graves', name: "Graves", cost: 5, traits: ['Factory New'], tileIcon: 'ASSETS/Characters/TFT17_Graves/Skins/Base/Images/TFT17_Graves_splash_tile_18.TFT_Set17.png' },
    { id: 'TFT17_Jhin', name: "Jhin", cost: 5, traits: ['Dark Star', 'Eradicator', 'Sniper'], tileIcon: 'ASSETS/Characters/TFT17_Jhin/Skins/Base/Images/TFT17_Jhin_splash_tile_37.TFT_Set17.png' },
    { id: 'TFT17_Morgana', name: "Morgana", cost: 5, traits: ['Dark Lady'], tileIcon: 'ASSETS/Characters/TFT17_Morgana/Skins/Base/Images/TFT17_Morgana_splash_tile_50.TFT_Set17.png' },
    { id: 'TFT17_Shen', name: "Shen", cost: 5, traits: ['Bulwark', 'Bastion'], tileIcon: 'ASSETS/Characters/TFT17_Shen/Skins/Base/Images/TFT17_shen_splash_tile_49.TFT_Set17.png' },
    { id: 'TFT17_Sona', name: "Sona", cost: 5, traits: ['Commander', 'Psionic', 'Shepherd'], tileIcon: 'ASSETS/Characters/TFT17_Sona/Skins/Base/Images/TFT17_Sona_splash_tile_17.TFT_Set17.png' },
    { id: 'TFT17_Vex', name: "Vex", cost: 5, traits: ['Doomer'], tileIcon: 'ASSETS/Characters/TFT17_Vex/Skins/Base/Images/TFT17_vex_splash_tile_10.TFT_Set17.png' },
    { id: 'TFT17_Zed', name: "Zed", cost: 5, traits: ['Galaxy Hunter'], tileIcon: 'ASSETS/Characters/TFT17_Zed/Skins/Base/Images/TFT17_Zed_splash_tile_68.TFT_Set17.png' },
];
exports.championMap = new Map(exports.champions.map(c => [c.id, c]));
const getChampionsByCost = (cost) => exports.champions.filter(c => c.cost === cost);
exports.getChampionsByCost = getChampionsByCost;
const getChampionsByTrait = (trait) => exports.champions.filter(c => c.traits.includes(trait));
exports.getChampionsByTrait = getChampionsByTrait;


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

/***/ "./src/services/LcuService.ts":
/*!************************************!*\
  !*** ./src/services/LcuService.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.autoLinkFromLcu = exports.regionCodeToPlatform = exports.getCurrentGameVersion = exports.getCurrentRankedStats = exports.getRegionLocale = exports.getCurrentSummoner = exports.isRiotGameRunning = exports.isLcuReachable = exports.pushTeamToPlanner = exports.lcuFetch = exports.getLcuCredentials = void 0;
const champions_1 = __webpack_require__(/*! ../data/set17/champions */ "./src/data/set17/champions.ts");
const LOL_GAME_ID = 5426;
const TFT_STANDALONE_ID = 22848;
const FALLBACK_LOL_PATHS = [
    'C:\\Riot Games\\League of Legends\\lockfile',
    'D:\\Riot Games\\League of Legends\\lockfile',
    'E:\\Riot Games\\League of Legends\\lockfile',
    'F:\\Riot Games\\League of Legends\\lockfile',
    'C:\\Program Files\\Riot Games\\League of Legends\\lockfile',
    'C:\\Program Files (x86)\\Riot Games\\League of Legends\\lockfile',
];
const RUNNING_INFO = () => new Promise(resolve => overwolf.games.getRunningGameInfo(resolve));
const READ_FILE = (path) => new Promise(resolve => overwolf.io.readFileContents(path, "UTF8", resolve));
async function getLcuCredentials() {
    const candidatePaths = await collectLockfilePaths();
    for (const path of candidatePaths) {
        const res = await READ_FILE(path);
        if (!(res === null || res === void 0 ? void 0 : res.success) || !res.content)
            continue;
        const parts = res.content.trim().split(':');
        if (parts.length < 5)
            continue;
        const pid = parseInt(parts[1], 10);
        const port = parseInt(parts[2], 10);
        const token = parts[3];
        if (!Number.isFinite(port) || !token)
            continue;
        return { port, token, pid };
    }
    return null;
}
exports.getLcuCredentials = getLcuCredentials;
async function collectLockfilePaths() {
    var _a;
    const paths = [];
    const info = await RUNNING_INFO().catch(() => null);
    const exec = (_a = info) === null || _a === void 0 ? void 0 : _a.executionPath;
    if (exec) {
        const normalized = exec.replace(/\//g, '\\');
        const idx = normalized.toLowerCase().lastIndexOf('league of legends\\');
        if (idx !== -1) {
            const root = normalized.substring(0, idx + 'league of legends\\'.length);
            paths.push(`${root}lockfile`);
        }
        else {
            const dir = normalized.substring(0, normalized.lastIndexOf('\\'));
            if (dir)
                paths.push(`${dir}\\lockfile`);
        }
    }
    paths.push(...FALLBACK_LOL_PATHS);
    return Array.from(new Set(paths));
}
async function lcuFetch(creds, path, init) {
    const url = `https://127.0.0.1:${creds.port}${path.startsWith('/') ? path : '/' + path}`;
    const auth = btoa(`riot:${creds.token}`);
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open((init === null || init === void 0 ? void 0 : init.method) || 'GET', url, true);
        xhr.setRequestHeader('Authorization', `Basic ${auth}`);
        xhr.setRequestHeader('Accept', 'application/json');
        if ((init === null || init === void 0 ? void 0 : init.body) !== undefined) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.timeout = 5000;
        xhr.onload = () => {
            var _a;
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    resolve(xhr.responseText ? JSON.parse(xhr.responseText) : null);
                }
                catch (_b) {
                    resolve(xhr.responseText);
                }
            }
            else {
                reject(new Error(`LCU ${xhr.status}: ${xhr.statusText} — ${((_a = xhr.responseText) === null || _a === void 0 ? void 0 : _a.slice(0, 200)) || ''}`));
            }
        };
        xhr.onerror = () => reject(new Error(`Network error contacting LCU (${url})`));
        xhr.ontimeout = () => reject(new Error('LCU request timed out'));
        xhr.send((init === null || init === void 0 ? void 0 : init.body) !== undefined ? JSON.stringify(init.body) : null);
    });
}
exports.lcuFetch = lcuFetch;
function championIdToLcuName(id) {
    const champ = champions_1.championMap.get(id);
    if (!champ)
        return null;
    const m = id.match(/^TFT\d+_(.+)$/);
    if (m)
        return m[1];
    return champ.name.replace(/\s+/g, '');
}
async function pushTeamToPlanner(championIds) {
    if (championIds.length === 0) {
        return { ok: false, pushed: 0, failed: 0, reason: 'No units to push' };
    }
    const creds = await getLcuCredentials();
    if (!creds) {
        return { ok: false, pushed: 0, failed: championIds.length, reason: 'League client not running (lockfile not found)' };
    }
    const unique = Array.from(new Set(championIds)).slice(0, 9);
    let pushed = 0;
    let failed = 0;
    let lastErr;
    for (const id of unique) {
        const name = championIdToLcuName(id);
        if (!name) {
            failed++;
            continue;
        }
        try {
            await lcuFetch(creds, `/lol-tft-team-planner/v1/team/championsById/${encodeURIComponent(name)}`, {
                method: 'POST',
                body: { championName: name },
            });
            pushed++;
        }
        catch (err) {
            failed++;
            lastErr = err.message;
        }
    }
    return {
        ok: pushed > 0,
        pushed,
        failed,
        reason: failed > 0 ? lastErr : undefined,
    };
}
exports.pushTeamToPlanner = pushTeamToPlanner;
async function isLcuReachable() {
    const creds = await getLcuCredentials();
    if (!creds)
        return false;
    try {
        await lcuFetch(creds, '/riotclient/get_region_locale');
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.isLcuReachable = isLcuReachable;
async function isRiotGameRunning() {
    var _a, _b, _c;
    const info = await RUNNING_INFO().catch(() => null);
    const id = (_b = (_a = info) === null || _a === void 0 ? void 0 : _a.classId) !== null && _b !== void 0 ? _b : (_c = info) === null || _c === void 0 ? void 0 : _c.id;
    if (!id)
        return false;
    return id === LOL_GAME_ID || id === TFT_STANDALONE_ID;
}
exports.isRiotGameRunning = isRiotGameRunning;
async function getCurrentSummoner() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const creds = await getLcuCredentials();
    if (!creds)
        return null;
    try {
        const data = await lcuFetch(creds, '/lol-summoner/v1/current-summoner');
        if (!data)
            return null;
        return {
            accountId: String((_a = data.accountId) !== null && _a !== void 0 ? _a : ''),
            summonerId: String((_b = data.summonerId) !== null && _b !== void 0 ? _b : ''),
            puuid: String((_c = data.puuid) !== null && _c !== void 0 ? _c : ''),
            gameName: String((_e = (_d = data.gameName) !== null && _d !== void 0 ? _d : data.displayName) !== null && _e !== void 0 ? _e : ''),
            tagLine: String((_f = data.tagLine) !== null && _f !== void 0 ? _f : ''),
            internalName: String((_g = data.internalName) !== null && _g !== void 0 ? _g : ''),
            displayName: String((_h = data.displayName) !== null && _h !== void 0 ? _h : ''),
            profileIconId: Number((_j = data.profileIconId) !== null && _j !== void 0 ? _j : 0),
            summonerLevel: Number((_k = data.summonerLevel) !== null && _k !== void 0 ? _k : 0),
        };
    }
    catch (_l) {
        return null;
    }
}
exports.getCurrentSummoner = getCurrentSummoner;
async function getRegionLocale() {
    var _a, _b, _c, _d;
    const creds = await getLcuCredentials();
    if (!creds)
        return null;
    try {
        const data = await lcuFetch(creds, '/riotclient/get_region_locale');
        if (!data)
            return null;
        return {
            region: String((_a = data.region) !== null && _a !== void 0 ? _a : ''),
            locale: String((_b = data.locale) !== null && _b !== void 0 ? _b : ''),
            webLanguage: String((_c = data.webLanguage) !== null && _c !== void 0 ? _c : ''),
            webRegion: String((_d = data.webRegion) !== null && _d !== void 0 ? _d : ''),
        };
    }
    catch (_e) {
        return null;
    }
}
exports.getRegionLocale = getRegionLocale;
async function getCurrentRankedStats() {
    const creds = await getLcuCredentials();
    if (!creds)
        return null;
    try {
        const data = await lcuFetch(creds, '/lol-ranked/v1/current-ranked-stats');
        if (!data)
            return null;
        const queueMap = data.queueMap || {};
        const tft = queueMap.RANKED_TFT || queueMap.RANKED_TFT_TURBO || queueMap.RANKED_TFT_DOUBLE_UP || null;
        if (!tft)
            return null;
        return {
            tier: tft.tier,
            division: tft.division,
            leaguePoints: tft.leaguePoints,
            wins: tft.wins,
            losses: tft.losses,
            queueType: tft.queueType,
        };
    }
    catch (_a) {
        return null;
    }
}
exports.getCurrentRankedStats = getCurrentRankedStats;
async function getCurrentGameVersion() {
    var _a;
    const creds = await getLcuCredentials();
    if (!creds)
        return null;
    try {
        const data = await lcuFetch(creds, '/lol-patch/v1/game-version');
        return typeof data === 'string' ? data : ((_a = data === null || data === void 0 ? void 0 : data.version) !== null && _a !== void 0 ? _a : null);
    }
    catch (_b) {
        return null;
    }
}
exports.getCurrentGameVersion = getCurrentGameVersion;
function regionCodeToPlatform(region) {
    const map = {
        EUW: 'euw1', EUNE: 'eun1', NA: 'na1', KR: 'kr', BR: 'br1',
        LAN: 'la1', LAS: 'la2', OCE: 'oc1', TR: 'tr1', RU: 'ru',
        JP: 'jp1', PBE: 'pbe1', PH: 'ph2', SG: 'sg2', TH: 'th2',
        TW: 'tw2', VN: 'vn2',
    };
    return map[region.toUpperCase()] || region.toLowerCase();
}
exports.regionCodeToPlatform = regionCodeToPlatform;
async function autoLinkFromLcu() {
    const summoner = await getCurrentSummoner();
    if (!summoner)
        return null;
    const [region, rank] = await Promise.all([
        getRegionLocale().catch(() => null),
        getCurrentRankedStats().catch(() => null),
    ]);
    const platformId = region ? regionCodeToPlatform(region.region) : 'euw1';
    return { summoner, region, rank, platformId };
}
exports.autoLinkFromLcu = autoLinkFromLcu;


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
/*!**********************************!*\
  !*** ./src/settings/settings.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const LcuService_1 = __webpack_require__(/*! ../services/LcuService */ "./src/services/LcuService.ts");
const AuthService_1 = __webpack_require__(/*! ../services/AuthService */ "./src/services/AuthService.ts");
const consts_1 = __webpack_require__(/*! ../consts */ "./src/consts.ts");
const STORAGE_KEYS = {
    apiKey: 'pivottft_settings_api_key',
    platform: 'pivottft_settings_platform',
    controllerEnabled: 'pivottft_settings_controller_enabled',
    autopinS: 'pivottft_settings_autopin_s',
};
function $(id) {
    return document.getElementById(id);
}
function loadSettings() {
    const apiKey = $('settings-api-key');
    const platform = $('settings-platform');
    const controllerEnabled = $('settings-controller-enabled');
    const autopinS = $('settings-autopin-s');
    if (apiKey)
        apiKey.value = localStorage.getItem(STORAGE_KEYS.apiKey) || '';
    if (platform)
        platform.value = localStorage.getItem(STORAGE_KEYS.platform) || 'euw1';
    if (controllerEnabled)
        controllerEnabled.checked = localStorage.getItem(STORAGE_KEYS.controllerEnabled) !== 'false';
    if (autopinS)
        autopinS.checked = localStorage.getItem(STORAGE_KEYS.autopinS) === 'true';
}
function persistSettings() {
    const apiKey = $('settings-api-key');
    const platform = $('settings-platform');
    const controllerEnabled = $('settings-controller-enabled');
    const autopinS = $('settings-autopin-s');
    if (apiKey)
        localStorage.setItem(STORAGE_KEYS.apiKey, apiKey.value.trim());
    if (platform)
        localStorage.setItem(STORAGE_KEYS.platform, platform.value);
    if (controllerEnabled)
        localStorage.setItem(STORAGE_KEYS.controllerEnabled, controllerEnabled.checked.toString());
    if (autopinS)
        localStorage.setItem(STORAGE_KEYS.autopinS, autopinS.checked.toString());
}
function setupHotkeyDisplay() {
    overwolf.settings.hotkeys.get((res) => {
        var _a;
        if (!(res === null || res === void 0 ? void 0 : res.success) || !res.hotkeys)
            return;
        const gameHotkeys = ((_a = res.hotkeys.games) === null || _a === void 0 ? void 0 : _a['5426']) || [];
        const globalHotkeys = res.hotkeys.global || [];
        const all = [...globalHotkeys, ...gameHotkeys];
        const toggle = all.find((h) => h.name === 'pivottft_showhide');
        const el = $('hk-toggle');
        if (el)
            el.textContent = (toggle === null || toggle === void 0 ? void 0 : toggle.binding) || 'Not bound';
    });
}
function setupCloseButton() {
    const btn = $('settings-close');
    if (!btn)
        return;
    btn.addEventListener('click', () => {
        overwolf.windows.getCurrentWindow((res) => {
            var _a;
            if ((res === null || res === void 0 ? void 0 : res.success) && ((_a = res.window) === null || _a === void 0 ? void 0 : _a.id)) {
                overwolf.windows.close(res.window.id);
            }
        });
    });
}
function setupVersionDisplay() {
    overwolf.extensions.current.getManifest((res) => {
        var _a;
        const version = ((_a = res === null || res === void 0 ? void 0 : res.meta) === null || _a === void 0 ? void 0 : _a.version) || '?';
        const el = $('settings-version');
        if (el)
            el.textContent = `Version: ${version}`;
    });
}
function setupAutoSave() {
    let timer = null;
    const queue = () => {
        if (timer)
            window.clearTimeout(timer);
        timer = window.setTimeout(persistSettings, 250);
    };
    ['settings-api-key', 'settings-platform', 'settings-controller-enabled', 'settings-autopin-s']
        .forEach(id => { var _a; return (_a = $(id)) === null || _a === void 0 ? void 0 : _a.addEventListener('input', queue); });
    ['settings-platform', 'settings-controller-enabled', 'settings-autopin-s']
        .forEach(id => { var _a; return (_a = $(id)) === null || _a === void 0 ? void 0 : _a.addEventListener('change', queue); });
}
function setupLcuTest() {
    const btn = $('settings-test-lcu');
    const status = $('settings-lcu-status');
    if (!btn || !status)
        return;
    btn.addEventListener('click', async () => {
        btn.disabled = true;
        status.textContent = 'Checking…';
        status.className = 'settings-status pending';
        try {
            const ok = await LcuService_1.isLcuReachable();
            if (ok) {
                status.textContent = '✓ Connected to League client.';
                status.className = 'settings-status ok';
            }
            else {
                status.textContent = '✕ Could not reach League client. Is it running?';
                status.className = 'settings-status err';
            }
        }
        catch (e) {
            status.textContent = `✕ Error: ${e.message}`;
            status.className = 'settings-status err';
        }
        finally {
            btn.disabled = false;
        }
    });
}
function setupAutoLink() {
    const btn = $('settings-autolink');
    const status = $('settings-autolink-status');
    if (!btn || !status)
        return;
    btn.addEventListener('click', async () => {
        btn.disabled = true;
        status.textContent = 'Reading LoL client…';
        status.className = 'settings-status pending';
        try {
            const result = await LcuService_1.autoLinkFromLcu();
            if (!result) {
                status.textContent = '✕ Could not read summoner info. Is the LoL client open?';
                status.className = 'settings-status err';
                return;
            }
            const platformSel = $('settings-platform');
            if (platformSel) {
                platformSel.value = result.platformId;
                platformSel.dispatchEvent(new Event('change'));
            }
            const linkedAccount = {
                gameName: result.summoner.gameName || result.summoner.displayName,
                tagLine: result.summoner.tagLine,
                platform: result.platformId,
            };
            try {
                localStorage.setItem('pivottft_linked_account', JSON.stringify(linkedAccount));
            }
            catch (_a) { }
            const rank = result.rank
                ? ` · ${result.rank.tier} ${result.rank.division} ${result.rank.leaguePoints} LP`
                : '';
            status.textContent = `✓ Linked: ${linkedAccount.gameName}#${linkedAccount.tagLine} (${result.platformId.toUpperCase()})${rank}`;
            status.className = 'settings-status ok';
        }
        catch (e) {
            status.textContent = `✕ ${e.message}`;
            status.className = 'settings-status err';
        }
        finally {
            btn.disabled = false;
        }
    });
}
function renderAccountSection() {
    const statusEl = $('settings-account-status');
    const signInBtn = $('settings-signin');
    const signOutBtn = $('settings-signout');
    const adminBtn = $('settings-open-admin');
    if (!statusEl || !signInBtn || !signOutBtn || !adminBtn)
        return;
    if (!AuthService_1.isAuthenticated()) {
        statusEl.textContent = 'Not signed in.';
        statusEl.className = 'settings-status';
        signInBtn.style.display = 'inline-block';
        signOutBtn.style.display = 'none';
        adminBtn.style.display = 'none';
        return;
    }
    const user = AuthService_1.getStoredUser();
    if (!user)
        return;
    statusEl.innerHTML = `Signed in as <strong>${user.email}</strong> (${user.role}).`;
    statusEl.className = 'settings-status ok';
    signInBtn.style.display = 'none';
    signOutBtn.style.display = 'inline-block';
    adminBtn.style.display = AuthService_1.hasAtLeast('moderator') ? 'inline-block' : 'none';
}
function setupAccountActions() {
    var _a, _b, _c;
    (_a = $('settings-signin')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        overwolf.windows.obtainDeclaredWindow(consts_1.kWindowNames.login, (res) => {
            var _a;
            if ((res === null || res === void 0 ? void 0 : res.success) && ((_a = res.window) === null || _a === void 0 ? void 0 : _a.id))
                overwolf.windows.restore(res.window.id);
        });
    });
    (_b = $('settings-open-admin')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        overwolf.windows.obtainDeclaredWindow(consts_1.kWindowNames.admin, (res) => {
            var _a;
            if ((res === null || res === void 0 ? void 0 : res.success) && ((_a = res.window) === null || _a === void 0 ? void 0 : _a.id))
                overwolf.windows.restore(res.window.id);
        });
    });
    (_c = $('settings-signout')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        AuthService_1.logout();
        renderAccountSection();
    });
    if (AuthService_1.isAuthenticated()) {
        AuthService_1.refreshMe().then(renderAccountSection).catch(() => { });
    }
    AuthService_1.onChange(renderAccountSection);
}
window.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    setupAutoSave();
    setupCloseButton();
    setupVersionDisplay();
    setupHotkeyDisplay();
    setupLcuTest();
    setupAutoLink();
    renderAccountSection();
    setupAccountActions();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7SUFDZixhQUFhLEVBQUUsQ0FBQztJQUNoQixvQkFBb0IsRUFBRSxDQUFDO0lBQ3ZCLG1CQUFtQixFQUFFLENBQUM7QUFDeEIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9jb25zdHMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvZGF0YS9zZXQxNy9jaGFtcGlvbnMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvc2VydmljZXMvQXV0aFNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvc2VydmljZXMvTGN1U2VydmljZS50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9zZXR0aW5ncy9zZXR0aW5ncy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBQaXZvdFRGVCDigJQgVEZUIEdhbWUgRXZlbnRzIEZlYXR1cmVzXHJcbi8vIEdhbWUgSUQgNTQyNiA9IExlYWd1ZSBvZiBMZWdlbmRzIGNsaWVudCAod2hpY2ggVEZUIHJ1bnMgaW5zaWRlKVxyXG4vLyBURlQtc3BlY2lmaWMgZXZlbnRzIHVzZSBpbnRlcm5hbCBHYW1lIElEIDIxNTcwLCBidXQgd2UgcmVnaXN0ZXIgd2l0aCA1NDI2XHJcbmV4cG9ydCBjb25zdCBrR2FtZXNGZWF0dXJlcyA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmdbXT4oW1xyXG4gIFtcclxuICAgIDU0MjYsXHJcbiAgICBbXHJcbiAgICAgICdtYXRjaF9pbmZvJyxcclxuICAgICAgJ2JvYXJkJyxcclxuICAgICAgJ2JlbmNoJyxcclxuICAgICAgJ3N0b3JlJyxcclxuICAgICAgJ2Nhcm91c2VsJyxcclxuICAgICAgJ2dhbWVfaW5mbycsXHJcbiAgICAgICdhdWdtZW50cycsXHJcbiAgICAgICdsaXZlX2NsaWVudF9kYXRhJ1xyXG4gICAgXVxyXG4gIF0sXHJcbl0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGtHYW1lQ2xhc3NJZHMgPSBBcnJheS5mcm9tKGtHYW1lc0ZlYXR1cmVzLmtleXMoKSk7XHJcblxyXG5leHBvcnQgY29uc3Qga1dpbmRvd05hbWVzID0ge1xyXG4gIGluR2FtZTogJ2luX2dhbWUnLFxyXG4gIGRlc2t0b3A6ICdkZXNrdG9wJyxcclxuICBzZXR0aW5nczogJ3NldHRpbmdzJyxcclxuICBpbmdhbWVDb250cm9sbGVyOiAnaW5nYW1lX2NvbnRyb2xsZXInLFxyXG4gIG1hdGNodXBzOiAnbWF0Y2h1cHMnLFxyXG4gIGxvZ2luOiAnbG9naW4nLFxyXG4gIGFkbWluOiAnYWRtaW4nLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGtIb3RrZXlzID0ge1xyXG4gIHRvZ2dsZTogJ3Bpdm90dGZ0X3Nob3doaWRlJ1xyXG59O1xyXG5cclxuLy8gVEZUIEdhbWUgSUQgZm9yIGV2ZW50IHJlZ2lzdHJhdGlvblxyXG5leHBvcnQgY29uc3Qga1RGVENsYXNzSWQgPSA1NDI2O1xyXG5cclxuLy8gUmlvdCBBUEkgQ29uZmlndXJhdGlvblxyXG5leHBvcnQgY29uc3Qga1Jpb3RBcGlDb25maWcgPSB7XHJcbiAgYXBpS2V5OiAnJyxcclxuICByZWdpb246ICdldXJvcGUnIGFzIGNvbnN0LCAgICAgICAvLyBhbWVyaWNhcyB8IGV1cm9wZSB8IGFzaWEgKGFjY291bnQtdjEsIG1hdGNoLXYxKVxyXG4gIHBsYXRmb3JtOiAnZXVuMScsICAgICAgICAgICAgICAgIC8vIGV1dzEsIGV1bjEsIG5hMSwga3IsIC4uLiAoc3VtbW9uZXIvbGVhZ3VlKVxyXG59O1xyXG5cclxuLy8gQmFja2VuZCBiYXNlIFVSTC4gSW4gcHJvZHVjdGlvbiByb3V0ZXMgdGhyb3VnaCBDbG91ZGZsYXJlIFdvcmtlciBhdFxyXG4vLyBhcGkucGl2b3R0ZnQuY29tIChSaW90IEFQSSBwcm94eSArIGF1dGggKyBjb21wcyBiYWNrZW5kKS4gT3ZlcnJpZGUgdG9cclxuLy8gaHR0cDovLzEyNy4wLjAuMTo4Nzg3IGR1cmluZyBsb2NhbCBgd3JhbmdsZXIgZGV2YCBkZXZlbG9wbWVudC5cclxuZXhwb3J0IGNvbnN0IGtSaW90QXBpQmFzZVVybCA9ICdodHRwczovL2FwaS5waXZvdHRmdC5jb20nO1xyXG5cclxuXHJcbi8vIFBsYXRmb3JtIOKGkiByZWdpb25hbCByb3V0aW5nIG1hcCAoZm9yIGFjY291bnQvbWF0Y2ggZW5kcG9pbnRzKVxyXG5leHBvcnQgY29uc3Qga1BsYXRmb3JtVG9SZWdpb246IFJlY29yZDxzdHJpbmcsICdhbWVyaWNhcycgfCAnZXVyb3BlJyB8ICdhc2lhJz4gPSB7XHJcbiAgJ2V1dzEnOiAnZXVyb3BlJywgJ2V1bjEnOiAnZXVyb3BlJywgJ3RyMSc6ICdldXJvcGUnLCAncnUnOiAnZXVyb3BlJyxcclxuICAnbmExJzogJ2FtZXJpY2FzJywgJ2JyMSc6ICdhbWVyaWNhcycsICdsYTEnOiAnYW1lcmljYXMnLCAnbGEyJzogJ2FtZXJpY2FzJyxcclxuICAna3InOiAnYXNpYScsICdqcDEnOiAnYXNpYScsICdvYzEnOiAnYXNpYScsICdwaDInOiAnYXNpYScsXHJcbiAgJ3NnMic6ICdhc2lhJywgJ3RoMic6ICdhc2lhJywgJ3R3Mic6ICdhc2lhJywgJ3ZuMic6ICdhc2lhJyxcclxufTtcclxuIiwiLy8gUGl2b3RURlQgLSBTZXQgMTcgY2hhbXBpb25zIChkYXRhIHNvdXJjZWQgZnJvbSBDb21tdW5pdHlEcmFnb24gZW5fdXMuanNvbilcbi8vIGh0dHBzOi8vcmF3LmNvbW11bml0eWRyYWdvbi5vcmcvbGF0ZXN0L2NkcmFnb24vdGZ0L2VuX3VzLmpzb25cblxuaW1wb3J0IHsgQ2hhbXBpb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgY2hhbXBpb25zOiBDaGFtcGlvbltdID0gW1xuICAvLyA9PT09PSAxLUNvc3QgKDE0KSA9PT09PVxuICB7IGlkOiAnVEZUMTdfQWF0cm94JywgbmFtZTogXCJBYXRyb3hcIiwgY29zdDogMSwgdHJhaXRzOiBbJ04uTy5WLkEuJywgJ0Jhc3Rpb24nXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19BYXRyb3gvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfQWF0cm94X3NwbGFzaF90aWxlXzMwLlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19CcmlhcicsIG5hbWU6IFwiQnJpYXJcIiwgY29zdDogMSwgdHJhaXRzOiBbJ0FuaW1hJywgJ1ByaW1vcmRpYW4nLCAnUm9ndWUnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Ccmlhci9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Ccmlhcl9zcGxhc2hfdGlsZV8xMC5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfQ2FpdGx5bicsIG5hbWU6IFwiQ2FpdGx5blwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnTi5PLlYuQS4nLCAnRmF0ZXdlYXZlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0NhaXRseW4vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfQ2FpdGx5bl9zcGxhc2hfdGlsZV80OC5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfQ2hvZ2F0aCcsIG5hbWU6IFwiQ2hvJ0dhdGhcIiwgY29zdDogMSwgdHJhaXRzOiBbJ0RhcmsgU3RhcicsICdCcmF3bGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQ2hvZ2F0aC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19DaG9nYXRoX3NwbGFzaF90aWxlXzcuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0V6cmVhbCcsIG5hbWU6IFwiRXpyZWFsXCIsIGNvc3Q6IDEsIHRyYWl0czogWydUaW1lYnJlYWtlcicsICdTbmlwZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19FenJlYWwvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfRXpyZWFsX3NwbGFzaF90aWxlXzUuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0xlb25hJywgbmFtZTogXCJMZW9uYVwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnQXJiaXRlcicsICdWYW5ndWFyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0xlb25hL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0xlb25hX3NwbGFzaF90aWxlXzY0LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19MaXNzYW5kcmEnLCBuYW1lOiBcIkxpc3NhbmRyYVwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnRGFyayBTdGFyJywgJ1NoZXBoZXJkJywgJ1JlcGxpY2F0b3InXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19MaXNzYW5kcmEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTGlzc2FuZHJhX3NwbGFzaF90aWxlXzEyLlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19OYXN1cycsIG5hbWU6IFwiTmFzdXNcIiwgY29zdDogMSwgdHJhaXRzOiBbJ1NwYWNlIEdyb292ZScsICdWYW5ndWFyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X05hc3VzL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X05hc3VzX3NwbGFzaF90aWxlXzI1LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19Qb3BweScsIG5hbWU6IFwiUG9wcHlcIiwgY29zdDogMSwgdHJhaXRzOiBbJ01lZXBsZScsICdCYXN0aW9uJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfUG9wcHkvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfUG9wcHlfc3BsYXNoX3RpbGVfMTYuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X1Jla1NhaScsIG5hbWU6IFwiUmVrJ1NhaVwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnUHJpbW9yZGlhbicsICdCcmF3bGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfUmVrU2FpL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1Jla1NhaV9zcGxhc2hfdGlsZV8yNi5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfVGFsb24nLCBuYW1lOiBcIlRhbG9uXCIsIGNvc3Q6IDEsIHRyYWl0czogWydTdGFyZ2F6ZXInLCAnUm9ndWUnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19UYWxvbi9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19UYWxvbl9zcGxhc2hfdGlsZV8zOS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfVGVlbW8nLCBuYW1lOiBcIlRlZW1vXCIsIGNvc3Q6IDEsIHRyYWl0czogWydTcGFjZSBHcm9vdmUnLCAnU2hlcGhlcmQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19UZWVtby9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19UZWVtb19zcGxhc2hfdGlsZV80Ny5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfVHdpc3RlZEZhdGUnLCBuYW1lOiBcIlR3aXN0ZWQgRmF0ZVwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnU3RhcmdhemVyJywgJ0ZhdGV3ZWF2ZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Ud2lzdGVkRmF0ZS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Ud2lzdGVkRmF0ZV9zcGxhc2hfdGlsZV80NS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfVmVpZ2FyJywgbmFtZTogXCJWZWlnYXJcIiwgY29zdDogMSwgdHJhaXRzOiBbJ01lZXBsZScsICdSZXBsaWNhdG9yJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfVmVpZ2FyL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1ZlaWdhcl9zcGxhc2hfdGlsZV8zMi5URlRfU2V0MTcucG5nJyB9LFxuXG4gIC8vID09PT09IDItQ29zdCAoMTIpID09PT09XG4gIHsgaWQ6ICdURlQxN19Ba2FsaScsIG5hbWU6IFwiQWthbGlcIiwgY29zdDogMiwgdHJhaXRzOiBbJ04uTy5WLkEuJywgJ01hcmF1ZGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQWthbGkvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfQWthbGlfc3BsYXNoX3RpbGVfNjguVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0JlbHZldGgnLCBuYW1lOiBcIkJlbCdWZXRoXCIsIGNvc3Q6IDIsIHRyYWl0czogWydQcmltb3JkaWFuJywgJ0NoYWxsZW5nZXInLCAnTWFyYXVkZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19CZWx2ZXRoL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0JlbHZldGhfc3BsYXNoX3RpbGVfMTkuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0duYXInLCBuYW1lOiBcIkduYXJcIiwgY29zdDogMiwgdHJhaXRzOiBbJ01lZXBsZScsICdTbmlwZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19HbmFyL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0duYXJfc3BsYXNoX3RpbGVfMTUuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0dyYWdhcycsIG5hbWU6IFwiR3JhZ2FzXCIsIGNvc3Q6IDIsIHRyYWl0czogWydQc2lvbmljJywgJ0JyYXdsZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19HcmFnYXMvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfR3JhZ2FzX3NwbGFzaF90aWxlXzEwLlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19Hd2VuJywgbmFtZTogXCJHd2VuXCIsIGNvc3Q6IDIsIHRyYWl0czogWydTcGFjZSBHcm9vdmUnLCAnUm9ndWUnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Hd2VuL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0d3ZW5fc3BsYXNoX3RpbGVfMS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfSmF4JywgbmFtZTogXCJKYXhcIiwgY29zdDogMiwgdHJhaXRzOiBbJ1N0YXJnYXplcicsICdCYXN0aW9uJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfSmF4L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0pheF9Nb2JpbGUuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0ppbngnLCBuYW1lOiBcIkppbnhcIiwgY29zdDogMiwgdHJhaXRzOiBbJ0FuaW1hJywgJ0NoYWxsZW5nZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19KaW54L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0ppbnhfc3BsYXNoX3RpbGVfMzguVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X01pbGlvJywgbmFtZTogXCJNaWxpb1wiLCBjb3N0OiAyLCB0cmFpdHM6IFsnVGltZWJyZWFrZXInLCAnRmF0ZXdlYXZlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X01pbGlvL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X01pbGlvX3NwbGFzaF90aWxlXzAuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X01vcmRla2Fpc2VyJywgbmFtZTogXCJNb3JkZWthaXNlclwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnRGFyayBTdGFyJywgJ0NvbmR1aXQnLCAnVmFuZ3VhcmQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Nb3JkZWthaXNlci9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Nb3JkZWthaXNlcl9zcGxhc2hfdGlsZV82LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19QYW50aGVvbicsIG5hbWU6IFwiUGFudGhlb25cIiwgY29zdDogMiwgdHJhaXRzOiBbJ1RpbWVicmVha2VyJywgJ0JyYXdsZXInLCAnUmVwbGljYXRvciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1BhbnRoZW9uL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1BhbnRoZW9uX3NwbGFzaF90aWxlXzE2LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19QeWtlJywgbmFtZTogXCJQeWtlXCIsIGNvc3Q6IDIsIHRyYWl0czogWydQc2lvbmljJywgJ1ZveWFnZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19QeWtlL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1B5a2Vfc3BsYXNoX3RpbGVfMjUuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X1pvZScsIG5hbWU6IFwiWm9lXCIsIGNvc3Q6IDIsIHRyYWl0czogWydBcmJpdGVyJywgJ0NvbmR1aXQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19ab2UvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfWm9lX3NwbGFzaF90aWxlXzQzLlRGVF9TZXQxNy5wbmcnIH0sXG5cbiAgLy8gPT09PT0gMy1Db3N0ICgxMykgPT09PT1cbiAgeyBpZDogJ1RGVDE3X0F1cm9yYScsIG5hbWU6IFwiQXVyb3JhXCIsIGNvc3Q6IDMsIHRyYWl0czogWydBbmltYScsICdWb3lhZ2VyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQXVyb3JhL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0F1cm9yYV9zcGxhc2hfdGlsZV8xLlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19EaWFuYScsIG5hbWU6IFwiRGlhbmFcIiwgY29zdDogMywgdHJhaXRzOiBbJ0FyYml0ZXInLCAnQ2hhbGxlbmdlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0RpYW5hL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0RpYW5hU3BsYXNoX01vYmlsZS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfRml6eicsIG5hbWU6IFwiRml6elwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnTWVlcGxlJywgJ1JvZ3VlJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfRml6ei9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19GaXp6X3NwbGFzaF90aWxlXzI2LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19JbGxhb2knLCBuYW1lOiBcIklsbGFvaVwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnQW5pbWEnLCAnVmFuZ3VhcmQnLCAnU2hlcGhlcmQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19JbGxhb2kvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfSWxsYW9pX3NwbGFzaF90aWxlXzI3LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19LYWlzYScsIG5hbWU6IFwiS2FpJ1NhXCIsIGNvc3Q6IDMsIHRyYWl0czogWydEYXJrIFN0YXInLCAnUm9ndWUnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19LYWlzYS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19LYWlzYV9zcGxhc2hfdGlsZV82OS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfTHVsdScsIG5hbWU6IFwiTHVsdVwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnU3RhcmdhemVyJywgJ1JlcGxpY2F0b3InXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19MdWx1L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0x1bHVfc3BsYXNoX3RpbGVfMTQuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X01hb2thaScsIG5hbWU6IFwiTWFva2FpXCIsIGNvc3Q6IDMsIHRyYWl0czogWydOLk8uVi5BLicsICdCcmF3bGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTWFva2FpL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X01hb2thaV9zcGxhc2hfdGlsZV8zMy5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfTWlzc0ZvcnR1bmUnLCBuYW1lOiBcIk1pc3MgRm9ydHVuZVwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnR3VuIEdvZGRlc3MnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19NaXNzRm9ydHVuZS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19NaXNzRm9ydHVuZV9zcGxhc2hfdGlsZV8xNi5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfT3JubicsIG5hbWU6IFwiT3JublwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnU3BhY2UgR3Jvb3ZlJywgJ0Jhc3Rpb24nXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Pcm5uL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X09ybm5fc3BsYXNoX3RpbGVfMTEuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X1JoYWFzdCcsIG5hbWU6IFwiUmhhYXN0XCIsIGNvc3Q6IDMsIHRyYWl0czogWydSZWRlZW1lciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1JoYWFzdC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19LYXluU3BsYXNoX1RpbGUuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X1NhbWlyYScsIG5hbWU6IFwiU2FtaXJhXCIsIGNvc3Q6IDMsIHRyYWl0czogWydTcGFjZSBHcm9vdmUnLCAnU25pcGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfU2FtaXJhL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1NhbWlyYV9zcGxhc2hfdGlsZV8xMC5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfVXJnb3QnLCBuYW1lOiBcIlVyZ290XCIsIGNvc3Q6IDMsIHRyYWl0czogWydNZWNoYScsICdCcmF3bGVyJywgJ01hcmF1ZGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfVXJnb3QvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfVXJnb3Rfc3BsYXNoX3RpbGVfMzIuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X1Zpa3RvcicsIG5hbWU6IFwiVmlrdG9yXCIsIGNvc3Q6IDMsIHRyYWl0czogWydQc2lvbmljJywgJ0NvbmR1aXQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19WaWt0b3IvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfVmlrdG9yX3NwbGFzaF90aWxlXzUuVEZUX1NldDE3LnBuZycgfSxcblxuICAvLyA9PT09PSA0LUNvc3QgKDEzKSA9PT09PVxuICB7IGlkOiAnVEZUMTdfQXVyZWxpb25Tb2wnLCBuYW1lOiBcIkF1cmVsaW9uIFNvbFwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnTWVjaGEnLCAnQ29uZHVpdCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0F1cmVsaW9uU29sL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0F1cmVsaW9uU29sX3NwbGFzaF90aWxlXzIuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0NvcmtpJywgbmFtZTogXCJDb3JraVwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnTWVlcGxlJywgJ0ZhdGV3ZWF2ZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Db3JraS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Db3JraV9zcGxhc2hfdGlsZV8yNi5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfS2FybWEnLCBuYW1lOiBcIkthcm1hXCIsIGNvc3Q6IDQsIHRyYWl0czogWydEYXJrIFN0YXInLCAnVm95YWdlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0thcm1hL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0thcm1hX3NwbGFzaF90aWxlXzguVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0tpbmRyZWQnLCBuYW1lOiBcIktpbmRyZWRcIiwgY29zdDogNCwgdHJhaXRzOiBbJ04uTy5WLkEuJywgJ0NoYWxsZW5nZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19LaW5kcmVkL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0tpbmRyZWRfc3BsYXNoX3RpbGVfMjMuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0xlYmxhbmMnLCBuYW1lOiBcIkxlQmxhbmNcIiwgY29zdDogNCwgdHJhaXRzOiBbJ0FyYml0ZXInLCAnU2hlcGhlcmQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19MZWJsYW5jL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0xlYmxhbmNfc3BsYXNoX3RpbGVfMjkuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X01hc3RlcllpJywgbmFtZTogXCJNYXN0ZXIgWWlcIiwgY29zdDogNCwgdHJhaXRzOiBbJ1BzaW9uaWMnLCAnTWFyYXVkZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19NYXN0ZXJZaS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19NYXN0ZXJZaV9zcGxhc2hfdGlsZV8zMy5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfTmFtaScsIG5hbWU6IFwiTmFtaVwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnU3BhY2UgR3Jvb3ZlJywgJ1JlcGxpY2F0b3InXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19OYW1pL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X05hbWlfc3BsYXNoX3RpbGVfNDEuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X051bnUnLCBuYW1lOiBcIk51bnUgJiBXaWxsdW1wXCIsIGNvc3Q6IDQsIHRyYWl0czogWydTdGFyZ2F6ZXInLCAnVmFuZ3VhcmQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19OdW51L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X051bnVfc3BsYXNoX3RpbGVfMzUuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X1JhbW11cycsIG5hbWU6IFwiUmFtbXVzXCIsIGNvc3Q6IDQsIHRyYWl0czogWydNZWVwbGUnLCAnQmFzdGlvbiddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1JhbW11cy9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19SYW1tdXNfc3BsYXNoX3RpbGVfMTcuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X1JpdmVuJywgbmFtZTogXCJSaXZlblwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnVGltZWJyZWFrZXInLCAnUm9ndWUnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19SaXZlbi9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19SaXZlbl9zcGxhc2hfdGlsZV8xOC5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfVGFobUtlbmNoJywgbmFtZTogXCJUYWhtIEtlbmNoXCIsIGNvc3Q6IDQsIHRyYWl0czogWydPcmFjbGUnLCAnQnJhd2xlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1RhaG1LZW5jaC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19UYWhtS2VuY2hfc3BsYXNoX3RpbGVfMTEuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0dhbGlvJywgbmFtZTogXCJUaGUgTWlnaHR5IE1lY2hcIiwgY29zdDogNCwgdHJhaXRzOiBbJ01lY2hhJywgJ1ZveWFnZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19HYWxpby9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19HYWxpb19Nb2JpbGUuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X1hheWFoJywgbmFtZTogXCJYYXlhaFwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnU3RhcmdhemVyJywgJ1NuaXBlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1hheWFoL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1hheWFoX3NwbGFzaF90aWxlXzEuVEZUX1NldDE3LnBuZycgfSxcblxuICAvLyA9PT09PSA1LUNvc3QgKDEwKSA9PT09PVxuICB7IGlkOiAnVEZUMTdfQmFyZCcsIG5hbWU6IFwiQmFyZFwiLCBjb3N0OiA1LCB0cmFpdHM6IFsnTWVlcGxlJywgJ0NvbmR1aXQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19CYXJkL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0JhcmRfc3BsYXNoX3RpbGVfOC5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfQmxpdHpjcmFuaycsIG5hbWU6IFwiQmxpdHpjcmFua1wiLCBjb3N0OiA1LCB0cmFpdHM6IFsnUGFydHkgQW5pbWFsJywgJ1NwYWNlIEdyb292ZScsICdWYW5ndWFyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0JsaXR6Y3JhbmsvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfQmxpdHpjcmFua19zcGxhc2hfdGlsZV82NS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfRmlvcmEnLCBuYW1lOiBcIkZpb3JhXCIsIGNvc3Q6IDUsIHRyYWl0czogWydEaXZpbmUgRHVlbGlzdCcsICdBbmltYScsICdNYXJhdWRlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0Zpb3JhL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0Zpb3JhX3NwbGFzaF90aWxlXzUxLlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19HcmF2ZXMnLCBuYW1lOiBcIkdyYXZlc1wiLCBjb3N0OiA1LCB0cmFpdHM6IFsnRmFjdG9yeSBOZXcnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19HcmF2ZXMvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfR3JhdmVzX3NwbGFzaF90aWxlXzE4LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19KaGluJywgbmFtZTogXCJKaGluXCIsIGNvc3Q6IDUsIHRyYWl0czogWydEYXJrIFN0YXInLCAnRXJhZGljYXRvcicsICdTbmlwZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19KaGluL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0poaW5fc3BsYXNoX3RpbGVfMzcuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X01vcmdhbmEnLCBuYW1lOiBcIk1vcmdhbmFcIiwgY29zdDogNSwgdHJhaXRzOiBbJ0RhcmsgTGFkeSddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X01vcmdhbmEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTW9yZ2FuYV9zcGxhc2hfdGlsZV81MC5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfU2hlbicsIG5hbWU6IFwiU2hlblwiLCBjb3N0OiA1LCB0cmFpdHM6IFsnQnVsd2FyaycsICdCYXN0aW9uJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfU2hlbi9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19zaGVuX3NwbGFzaF90aWxlXzQ5LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19Tb25hJywgbmFtZTogXCJTb25hXCIsIGNvc3Q6IDUsIHRyYWl0czogWydDb21tYW5kZXInLCAnUHNpb25pYycsICdTaGVwaGVyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1NvbmEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfU29uYV9zcGxhc2hfdGlsZV8xNy5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfVmV4JywgbmFtZTogXCJWZXhcIiwgY29zdDogNSwgdHJhaXRzOiBbJ0Rvb21lciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1ZleC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN192ZXhfc3BsYXNoX3RpbGVfMTAuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X1plZCcsIG5hbWU6IFwiWmVkXCIsIGNvc3Q6IDUsIHRyYWl0czogWydHYWxheHkgSHVudGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfWmVkL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1plZF9zcGxhc2hfdGlsZV82OC5URlRfU2V0MTcucG5nJyB9LFxuXG5dO1xuXG5leHBvcnQgY29uc3QgY2hhbXBpb25NYXAgPSBuZXcgTWFwKGNoYW1waW9ucy5tYXAoYyA9PiBbYy5pZCwgY10pKTtcblxuZXhwb3J0IGNvbnN0IGdldENoYW1waW9uc0J5Q29zdCA9IChjb3N0OiBudW1iZXIpID0+XG4gIGNoYW1waW9ucy5maWx0ZXIoYyA9PiBjLmNvc3QgPT09IGNvc3QpO1xuXG5leHBvcnQgY29uc3QgZ2V0Q2hhbXBpb25zQnlUcmFpdCA9ICh0cmFpdDogc3RyaW5nKSA9PlxuICBjaGFtcGlvbnMuZmlsdGVyKGMgPT4gYy50cmFpdHMuaW5jbHVkZXModHJhaXQpKTtcbiIsIi8vIEF1dGhTZXJ2aWNlIOKAlCB0aGluIGNsaWVudCBmb3IgdGhlIENsb3VkZmxhcmUgV29ya2VyIC9hdXRoIGVuZHBvaW50cy5cbi8vXG4vLyBUb2tlbiBpcyBrZXB0IGluIGxvY2FsU3RvcmFnZS4gQ29tcG9uZW50cyB0aGF0IGNhcmUgYWJvdXQgbG9naW4gc3RhdGUgY2FuXG4vLyBlaXRoZXIgY2FsbCBnZXRDdXJyZW50VXNlcigpIG9uY2Ugb24gbW91bnQsIG9yIHN1YnNjcmliZSB2aWEgb25DaGFuZ2UoKS5cblxuaW1wb3J0IHsga1Jpb3RBcGlCYXNlVXJsIH0gZnJvbSAnLi4vY29uc3RzJztcblxuZXhwb3J0IHR5cGUgVXNlclJvbGUgPSAndXNlcicgfCAnbW9kZXJhdG9yJyB8ICdhZG1pbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XG4gIGlkOiBudW1iZXI7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHJvbGU6IFVzZXJSb2xlO1xuICBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbDtcbn1cblxuaW50ZXJmYWNlIEF1dGhSZXNwb25zZSB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIHVzZXI6IFVzZXI7XG59XG5cbmNvbnN0IFNUT1JBR0VfVE9LRU4gPSAncGl2b3R0ZnRfYXV0aF90b2tlbic7XG5jb25zdCBTVE9SQUdFX1VTRVIgPSAncGl2b3R0ZnRfYXV0aF91c2VyJztcblxudHlwZSBMaXN0ZW5lciA9ICh1c2VyOiBVc2VyIHwgbnVsbCkgPT4gdm9pZDtcbmNvbnN0IGxpc3RlbmVycyA9IG5ldyBTZXQ8TGlzdGVuZXI+KCk7XG5cbmZ1bmN0aW9uIGVtaXQoKTogdm9pZCB7XG4gIGNvbnN0IHVzZXIgPSBnZXRTdG9yZWRVc2VyKCk7XG4gIGxpc3RlbmVycy5mb3JFYWNoKGwgPT4ge1xuICAgIHRyeSB7IGwodXNlcik7IH0gY2F0Y2ggKGUpIHsgY29uc29sZS5lcnJvcignW0F1dGhTZXJ2aWNlXSBsaXN0ZW5lciB0aHJldzonLCBlKTsgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRva2VuKCk6IHN0cmluZyB8IG51bGwge1xuICB0cnkgeyByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9UT0tFTik7IH0gY2F0Y2ggeyByZXR1cm4gbnVsbDsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RvcmVkVXNlcigpOiBVc2VyIHwgbnVsbCB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmF3ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9VU0VSKTtcbiAgICByZXR1cm4gcmF3ID8gSlNPTi5wYXJzZShyYXcpIGFzIFVzZXIgOiBudWxsO1xuICB9IGNhdGNoIHsgcmV0dXJuIG51bGw7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcbiAgcmV0dXJuICEhZ2V0VG9rZW4oKSAmJiAhIWdldFN0b3JlZFVzZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWRtaW4oKTogYm9vbGVhbiB7XG4gIGNvbnN0IHUgPSBnZXRTdG9yZWRVc2VyKCk7XG4gIHJldHVybiAhIXUgJiYgdS5yb2xlID09PSAnYWRtaW4nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQXRMZWFzdChyb2xlOiBVc2VyUm9sZSk6IGJvb2xlYW4ge1xuICBjb25zdCB1ID0gZ2V0U3RvcmVkVXNlcigpO1xuICBpZiAoIXUpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgcmFuazogUmVjb3JkPFVzZXJSb2xlLCBudW1iZXI+ID0geyB1c2VyOiAxLCBtb2RlcmF0b3I6IDIsIGFkbWluOiAzIH07XG4gIHJldHVybiByYW5rW3Uucm9sZV0gPj0gcmFua1tyb2xlXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uQ2hhbmdlKGxpc3RlbmVyOiBMaXN0ZW5lcik6ICgpID0+IHZvaWQge1xuICBsaXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcbiAgcmV0dXJuICgpID0+IGxpc3RlbmVycy5kZWxldGUobGlzdGVuZXIpO1xufVxuXG5mdW5jdGlvbiBzZXRTZXNzaW9uKHJlczogQXV0aFJlc3BvbnNlKTogdm9pZCB7XG4gIHRyeSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9UT0tFTiwgcmVzLnRva2VuKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX1VTRVIsIEpTT04uc3RyaW5naWZ5KHJlcy51c2VyKSk7XG4gIH0gY2F0Y2ggeyAvKiBxdW90YSBldGMg4oCUIHNpbGVudCAqLyB9XG4gIGVtaXQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyU2Vzc2lvbigpOiB2b2lkIHtcbiAgdHJ5IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShTVE9SQUdFX1RPS0VOKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShTVE9SQUdFX1VTRVIpO1xuICB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbiAgZW1pdCgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwb3N0SnNvbjxUPihwYXRoOiBzdHJpbmcsIGJvZHk6IHVua25vd24pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3QgdXJsID0gYCR7a1Jpb3RBcGlCYXNlVXJsfSR7cGF0aH1gO1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgfSk7XG4gIGxldCBwYXlsb2FkOiBhbnk7XG4gIHRyeSB7IHBheWxvYWQgPSBhd2FpdCByZXMuanNvbigpOyB9IGNhdGNoIHsgcGF5bG9hZCA9IHsgZXJyb3I6IHJlcy5zdGF0dXNUZXh0IH07IH1cbiAgaWYgKCFyZXMub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZD8uZXJyb3IgfHwgYEhUVFAgJHtyZXMuc3RhdHVzfWApO1xuICB9XG4gIHJldHVybiBwYXlsb2FkIGFzIFQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEpzb248VD4ocGF0aDogc3RyaW5nLCB0b2tlbj86IHN0cmluZyB8IG51bGwpOiBQcm9taXNlPFQ+IHtcbiAgY29uc3QgdXJsID0gYCR7a1Jpb3RBcGlCYXNlVXJsfSR7cGF0aH1gO1xuICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gIGlmICh0b2tlbikgaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke3Rva2VufWA7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwgeyBoZWFkZXJzIH0pO1xuICBsZXQgcGF5bG9hZDogYW55O1xuICB0cnkgeyBwYXlsb2FkID0gYXdhaXQgcmVzLmpzb24oKTsgfSBjYXRjaCB7IHBheWxvYWQgPSB7IGVycm9yOiByZXMuc3RhdHVzVGV4dCB9OyB9XG4gIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZD8uZXJyb3IgfHwgYEhUVFAgJHtyZXMuc3RhdHVzfWApO1xuICByZXR1cm4gcGF5bG9hZCBhcyBUO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXIoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgZGlzcGxheU5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcG9zdEpzb248QXV0aFJlc3BvbnNlPignL2F1dGgvcmVnaXN0ZXInLCB7IGVtYWlsLCBwYXNzd29yZCwgZGlzcGxheU5hbWUgfSk7XG4gIHNldFNlc3Npb24ocmVzKTtcbiAgcmV0dXJuIHJlcy51c2VyO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9naW4oZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8VXNlcj4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBwb3N0SnNvbjxBdXRoUmVzcG9uc2U+KCcvYXV0aC9sb2dpbicsIHsgZW1haWwsIHBhc3N3b3JkIH0pO1xuICBzZXRTZXNzaW9uKHJlcyk7XG4gIHJldHVybiByZXMudXNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ291dCgpOiB2b2lkIHtcbiAgY2xlYXJTZXNzaW9uKCk7XG59XG5cbi8qKlxuICogUmVmcmVzaCB1c2VyIGluZm8gZnJvbSBiYWNrZW5kLiBVc2VmdWwgYWZ0ZXIgcm9sZSBjaGFuZ2VzIG9yIHRvIGNvbmZpcm1cbiAqIHRva2VuIHZhbGlkaXR5LiBDbGVhcnMgc2Vzc2lvbiBvbiA0MDEuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWZyZXNoTWUoKTogUHJvbWlzZTxVc2VyIHwgbnVsbD4ge1xuICBjb25zdCB0b2tlbiA9IGdldFRva2VuKCk7XG4gIGlmICghdG9rZW4pIHJldHVybiBudWxsO1xuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldEpzb248eyB1c2VyOiBVc2VyIH0+KCcvYXV0aC9tZScsIHRva2VuKTtcbiAgICB0cnkgeyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX1VTRVIsIEpTT04uc3RyaW5naWZ5KHJlcy51c2VyKSk7IH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxuICAgIGVtaXQoKTtcbiAgICByZXR1cm4gcmVzLnVzZXI7XG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIGlmICgoZS5tZXNzYWdlIHx8ICcnKS5pbmNsdWRlcygnSFRUUCA0MDEnKSkgY2xlYXJTZXNzaW9uKCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgZm9yIGFkbWluLW9ubHkgZmV0Y2hlcyDigJQgYXV0b21hdGljYWxseSBhdHRhY2hlcyBCZWFyZXIgdG9rZW4uXG4gKiBUaHJvd3MgaWYgbm90IGxvZ2dlZCBpbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkbWluRmV0Y2g8VD4ocGF0aDogc3RyaW5nLCBpbml0OiBSZXF1ZXN0SW5pdCA9IHt9KTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgaWYgKCF0b2tlbikgdGhyb3cgbmV3IEVycm9yKCdOb3QgYXV0aGVudGljYXRlZCcpO1xuICBjb25zdCB1cmwgPSBgJHtrUmlvdEFwaUJhc2VVcmx9JHtwYXRofWA7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgIC4uLmluaXQsXG4gICAgaGVhZGVyczoge1xuICAgICAgLi4uKGluaXQuaGVhZGVycyB8fCB7fSksXG4gICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgLi4uKGluaXQuYm9keSA/IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9IDoge30pLFxuICAgIH0sXG4gIH0pO1xuICBsZXQgcGF5bG9hZDogYW55O1xuICB0cnkgeyBwYXlsb2FkID0gYXdhaXQgcmVzLmpzb24oKTsgfSBjYXRjaCB7IHBheWxvYWQgPSB7IGVycm9yOiByZXMuc3RhdHVzVGV4dCB9OyB9XG4gIGlmICghcmVzLm9rKSB7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT09IDQwMSkgY2xlYXJTZXNzaW9uKCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQ/LmVycm9yIHx8IGBIVFRQICR7cmVzLnN0YXR1c31gKTtcbiAgfVxuICByZXR1cm4gcGF5bG9hZCBhcyBUO1xufVxuIiwiLy8gTENVIChMZWFndWUgQ2xpZW50IFVwZGF0ZSBBUEkpIGJyaWRnZSDigJQgc2FtZSBtb2RlbCBNZXRhVEZUIHVzZXMuXG4vL1xuLy8gRGlzY292ZXJ5OiBSaW90IENsaWVudCB3cml0ZXMgYSBgbG9ja2ZpbGVgIGluIHRoZSBMZWFndWUgaW5zdGFsbCBmb2xkZXJcbi8vIHdoZW4gTENVIGlzIHJ1bm5pbmcuIEZvcm1hdDogYExlYWd1ZUNsaWVudDo8cGlkPjo8cG9ydD46PHBhc3N3b3JkPjpodHRwc2AuXG4vLyBXZSBnZXQgdGhlIGluc3RhbGwgZm9sZGVyIGZyb20gb3ZlcndvbGYuZ2FtZXMuZ2V0UnVubmluZ0dhbWVJbmZvKCkgd2hlblxuLy8gVEZUIChnYW1lIGlkIDU0MjYpIGlzIGFjdGl2ZSwgdGhlbiByZWFkIHRoZSBsb2NrZmlsZSB2aWEgb3ZlcndvbGYuaW8uXG4vL1xuLy8gT25jZSB3ZSBoYXZlIHBvcnQgKyBwYXNzd29yZCwgY2FsbHMgZ28gdG8gaHR0cHM6Ly8xMjcuMC4wLjE6PHBvcnQ+LyB3aXRoXG4vLyBIVFRQIEJhc2ljIGF1dGggKHVzZXIgXCJyaW90XCIsIHBhc3N3b3JkID0gdGhlIHRva2VuKS4gT3ZlcndvbGYncyByZW5kZXJlclxuLy8gcnVucyB3aXRoIC0taWdub3JlLWNlcnRpZmljYXRlLWVycm9ycyBzbyB0aGUgc2VsZi1zaWduZWQgY2VydCBpcyBhY2NlcHRlZC5cblxuaW1wb3J0IHsgQ2hhbXBpb24gfSBmcm9tICcuLi9tb2RlbHMvdHlwZXMnO1xuaW1wb3J0IHsgY2hhbXBpb25NYXAgfSBmcm9tICcuLi9kYXRhL3NldDE3L2NoYW1waW9ucyc7XG5cbmludGVyZmFjZSBMY3VDcmVkZW50aWFscyB7XG4gIHBvcnQ6IG51bWJlcjtcbiAgdG9rZW46IHN0cmluZztcbiAgcGlkOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBQdXNoUmVzdWx0IHtcbiAgb2s6IGJvb2xlYW47XG4gIHB1c2hlZDogbnVtYmVyO1xuICBmYWlsZWQ6IG51bWJlcjtcbiAgcmVhc29uPzogc3RyaW5nO1xufVxuXG5jb25zdCBMT0xfR0FNRV9JRCA9IDU0MjY7XG5jb25zdCBURlRfU1RBTkRBTE9ORV9JRCA9IDIyODQ4O1xuXG4vLyBDb21tb24gaW5zdGFsbCBwYXRocyB0byBwcm9iZSB3aGVuIGdldFJ1bm5pbmdHYW1lSW5mbygpIHJldHVybnMgbm90aGluZ1xuLy8gKGkuZS4gTG9MIGlzbid0IGN1cnJlbnRseSBydW5uaW5nIGJ1dCB0aGUgdXNlciB3YW50cyB0byBwcmVwYXJlIGEgdGVhbSkuXG5jb25zdCBGQUxMQkFDS19MT0xfUEFUSFMgPSBbXG4gICdDOlxcXFxSaW90IEdhbWVzXFxcXExlYWd1ZSBvZiBMZWdlbmRzXFxcXGxvY2tmaWxlJyxcbiAgJ0Q6XFxcXFJpb3QgR2FtZXNcXFxcTGVhZ3VlIG9mIExlZ2VuZHNcXFxcbG9ja2ZpbGUnLFxuICAnRTpcXFxcUmlvdCBHYW1lc1xcXFxMZWFndWUgb2YgTGVnZW5kc1xcXFxsb2NrZmlsZScsXG4gICdGOlxcXFxSaW90IEdhbWVzXFxcXExlYWd1ZSBvZiBMZWdlbmRzXFxcXGxvY2tmaWxlJyxcbiAgJ0M6XFxcXFByb2dyYW0gRmlsZXNcXFxcUmlvdCBHYW1lc1xcXFxMZWFndWUgb2YgTGVnZW5kc1xcXFxsb2NrZmlsZScsXG4gICdDOlxcXFxQcm9ncmFtIEZpbGVzICh4ODYpXFxcXFJpb3QgR2FtZXNcXFxcTGVhZ3VlIG9mIExlZ2VuZHNcXFxcbG9ja2ZpbGUnLFxuXTtcblxuY29uc3QgUlVOTklOR19JTkZPID0gKCk6IFByb21pc2U8b3ZlcndvbGYuZ2FtZXMuR2V0UnVubmluZ0dhbWVJbmZvUmVzdWx0PiA9PlxuICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IG92ZXJ3b2xmLmdhbWVzLmdldFJ1bm5pbmdHYW1lSW5mbyhyZXNvbHZlKSk7XG5cbmNvbnN0IFJFQURfRklMRSA9IChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPG92ZXJ3b2xmLmlvLlJlYWRGaWxlQ29udGVudHNSZXN1bHQ+ID0+XG4gIG5ldyBQcm9taXNlKHJlc29sdmUgPT5cbiAgICBvdmVyd29sZi5pby5yZWFkRmlsZUNvbnRlbnRzKHBhdGgsIG92ZXJ3b2xmLmlvLmVudW1zLmVFbmNvZGluZy5VVEY4LCByZXNvbHZlKVxuICApO1xuXG4vKipcbiAqIExvY2F0ZSBhbmQgcGFyc2UgdGhlIExvTCBsb2NrZmlsZS4gUmV0dXJucyBudWxsIGlmIExDVSBpc24ndCByZWFjaGFibGVcbiAqIChubyBpbnN0YWxsIGRldGVjdGVkLCBMQ1Ugbm90IHJ1bm5pbmcsIGZpbGUgbWlzc2luZywgZXRjLikuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMY3VDcmVkZW50aWFscygpOiBQcm9taXNlPExjdUNyZWRlbnRpYWxzIHwgbnVsbD4ge1xuICBjb25zdCBjYW5kaWRhdGVQYXRocyA9IGF3YWl0IGNvbGxlY3RMb2NrZmlsZVBhdGhzKCk7XG4gIGZvciAoY29uc3QgcGF0aCBvZiBjYW5kaWRhdGVQYXRocykge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IFJFQURfRklMRShwYXRoKTtcbiAgICBpZiAoIXJlcz8uc3VjY2VzcyB8fCAhcmVzLmNvbnRlbnQpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHBhcnRzID0gcmVzLmNvbnRlbnQudHJpbSgpLnNwbGl0KCc6Jyk7XG4gICAgLy8gRm9ybWF0OiA8bmFtZT46PHBpZD46PHBvcnQ+OjxwYXNzd29yZD46PHByb3RvY29sPlxuICAgIGlmIChwYXJ0cy5sZW5ndGggPCA1KSBjb250aW51ZTtcbiAgICBjb25zdCBwaWQgPSBwYXJzZUludChwYXJ0c1sxXSwgMTApO1xuICAgIGNvbnN0IHBvcnQgPSBwYXJzZUludChwYXJ0c1syXSwgMTApO1xuICAgIGNvbnN0IHRva2VuID0gcGFydHNbM107XG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUocG9ydCkgfHwgIXRva2VuKSBjb250aW51ZTtcbiAgICByZXR1cm4geyBwb3J0LCB0b2tlbiwgcGlkIH07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbGxlY3RMb2NrZmlsZVBhdGhzKCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgY29uc3QgcGF0aHM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IGluZm8gPSBhd2FpdCBSVU5OSU5HX0lORk8oKS5jYXRjaCgoKSA9PiBudWxsKTtcbiAgY29uc3QgZXhlYyA9IChpbmZvIGFzIGFueSk/LmV4ZWN1dGlvblBhdGggYXMgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBpZiAoZXhlYykge1xuICAgIC8vIGV4ZWN1dGlvblBhdGggZXhhbXBsZXM6XG4gICAgLy8gICBcIkU6XFxcXFJpb3RcXFxcUmlvdCBHYW1lc1xcXFxMZWFndWUgb2YgTGVnZW5kc1xcXFxMZWFndWVDbGllbnQuZXhlXCJcbiAgICAvLyAgIFwiRTpcXFxcUmlvdFxcXFxSaW90IEdhbWVzXFxcXExlYWd1ZSBvZiBMZWdlbmRzXFxcXEdhbWVcXFxcTGVhZ3VlIG9mIExlZ2VuZHMuZXhlXCJcbiAgICAvLyBMb2NrZmlsZSBpcyBhbHdheXMgYXQgdGhlIExDVSBpbnN0YWxsIHJvb3QgbmV4dCB0byBMZWFndWVDbGllbnQuZXhlLlxuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBleGVjLnJlcGxhY2UoL1xcLy9nLCAnXFxcXCcpO1xuICAgIGNvbnN0IGlkeCA9IG5vcm1hbGl6ZWQudG9Mb3dlckNhc2UoKS5sYXN0SW5kZXhPZignbGVhZ3VlIG9mIGxlZ2VuZHNcXFxcJyk7XG4gICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgIGNvbnN0IHJvb3QgPSBub3JtYWxpemVkLnN1YnN0cmluZygwLCBpZHggKyAnbGVhZ3VlIG9mIGxlZ2VuZHNcXFxcJy5sZW5ndGgpO1xuICAgICAgcGF0aHMucHVzaChgJHtyb290fWxvY2tmaWxlYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZhbGxiYWNrOiBjaG9wIHRoZSAuZXhlIGFuZCBhcHBlbmQgbG9ja2ZpbGVcbiAgICAgIGNvbnN0IGRpciA9IG5vcm1hbGl6ZWQuc3Vic3RyaW5nKDAsIG5vcm1hbGl6ZWQubGFzdEluZGV4T2YoJ1xcXFwnKSk7XG4gICAgICBpZiAoZGlyKSBwYXRocy5wdXNoKGAke2Rpcn1cXFxcbG9ja2ZpbGVgKTtcbiAgICB9XG4gIH1cbiAgcGF0aHMucHVzaCguLi5GQUxMQkFDS19MT0xfUEFUSFMpO1xuICAvLyBEZWR1cCBwcmVzZXJ2aW5nIG9yZGVyXG4gIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQocGF0aHMpKTtcbn1cblxuLyoqXG4gKiBNYWtlIGFuIGF1dGhlbnRpY2F0ZWQgcmVxdWVzdCB0byBMQ1UuIFJldHVybnMgcGFyc2VkIEpTT04gYm9keSAob3IgdGV4dClcbiAqIG9uIDJ4eCwgdGhyb3dzIEVycm9yIG9uIHRyYW5zcG9ydCBvciBub24tMnh4LlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbGN1RmV0Y2goXG4gIGNyZWRzOiBMY3VDcmVkZW50aWFscyxcbiAgcGF0aDogc3RyaW5nLFxuICBpbml0PzogeyBtZXRob2Q/OiBzdHJpbmc7IGJvZHk/OiB1bmtub3duIH1cbik6IFByb21pc2U8YW55PiB7XG4gIGNvbnN0IHVybCA9IGBodHRwczovLzEyNy4wLjAuMToke2NyZWRzLnBvcnR9JHtwYXRoLnN0YXJ0c1dpdGgoJy8nKSA/IHBhdGggOiAnLycgKyBwYXRofWA7XG4gIC8vIFRoZSBicm93c2VyIG1heSBwcmUtZmxpZ2h0IGEgQ09SUyBwcmVmbGlnaHQgb24gUE9TVC9QVVQg4oCUIExDVSBkb2VzIG5vdFxuICAvLyBob25vdXIgQ09SUy4gT3ZlcndvbGYncyByZW5kZXJlciBhY2NlcHRzIHRoZSBjZXJ0OyBmZXRjaCB3aXRoIG5vLWNvcnNcbiAgLy8gaXMgdG9vIHJlc3RyaWN0aXZlIChvcGFxdWUgcmVzcG9uc2UpLiBXZSB1c2UgWE1MSHR0cFJlcXVlc3QgYmVjYXVzZSBpdFxuICAvLyBzdXJmYWNlcyBzdGF0dXMgY29kZXMgZXZlbiB3aGVuIENPUlMgaGVhZGVycyBhcmUgbWlzc2luZy5cbiAgY29uc3QgYXV0aCA9IGJ0b2EoYHJpb3Q6JHtjcmVkcy50b2tlbn1gKTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKGluaXQ/Lm1ldGhvZCB8fCAnR0VUJywgdXJsLCB0cnVlKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGBCYXNpYyAke2F1dGh9YCk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgaWYgKGluaXQ/LmJvZHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgfVxuICAgIHhoci50aW1lb3V0ID0gNTAwMDtcbiAgICB4aHIub25sb2FkID0gKCkgPT4ge1xuICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQgPyBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpIDogbnVsbCk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYExDVSAke3hoci5zdGF0dXN9OiAke3hoci5zdGF0dXNUZXh0fSDigJQgJHt4aHIucmVzcG9uc2VUZXh0Py5zbGljZSgwLCAyMDApIHx8ICcnfWApKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHhoci5vbmVycm9yID0gKCkgPT4gcmVqZWN0KG5ldyBFcnJvcihgTmV0d29yayBlcnJvciBjb250YWN0aW5nIExDVSAoJHt1cmx9KWApKTtcbiAgICB4aHIub250aW1lb3V0ID0gKCkgPT4gcmVqZWN0KG5ldyBFcnJvcignTENVIHJlcXVlc3QgdGltZWQgb3V0JykpO1xuICAgIHhoci5zZW5kKGluaXQ/LmJvZHkgIT09IHVuZGVmaW5lZCA/IEpTT04uc3RyaW5naWZ5KGluaXQuYm9keSkgOiBudWxsKTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBpbnRlcm5hbCBjaGFtcGlvbiBpZCAoZS5nLiBcIlRGVDE3X0FhdHJveFwiKSB0byB0aGUgYmFyZSBjaGFtcGlvblxuICogbmFtZSBSaW90J3MgTENVIGV4cGVjdHMgKFwiQWF0cm94XCIpLiBGYWxscyBiYWNrIHRvIHRoZSBjaGFtcGlvbidzIGRpc3BsYXlcbiAqIG5hbWUgaWYgd2UgY2FuJ3QgcGFyc2UgdGhlIGFwaU5hbWUuXG4gKi9cbmZ1bmN0aW9uIGNoYW1waW9uSWRUb0xjdU5hbWUoaWQ6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICBjb25zdCBjaGFtcDogQ2hhbXBpb24gfCB1bmRlZmluZWQgPSBjaGFtcGlvbk1hcC5nZXQoaWQpO1xuICBpZiAoIWNoYW1wKSByZXR1cm4gbnVsbDtcbiAgLy8gU3RyaXAgXCJURlQjI19cIiBwcmVmaXggaWYgcHJlc2VudFxuICBjb25zdCBtID0gaWQubWF0Y2goL15URlRcXGQrXyguKykkLyk7XG4gIGlmIChtKSByZXR1cm4gbVsxXTtcbiAgLy8gRmFsbGJhY2s6IHN0cmlwIHdoaXRlc3BhY2UgZnJvbSBkaXNwbGF5IG5hbWVcbiAgcmV0dXJuIGNoYW1wLm5hbWUucmVwbGFjZSgvXFxzKy9nLCAnJyk7XG59XG5cbi8qKlxuICogUHVzaCBhIGxpc3Qgb2YgY2hhbXBpb24gSURzIHRvIExvTCdzIFRGVCBUZWFtIFBsYW5uZXIuIEVhY2ggY2hhbXBpb24gaXNcbiAqIGFkZGVkIHZpYSBQT1NUIC9sb2wtdGZ0LXRlYW0tcGxhbm5lci92MS90ZWFtL2NoYW1waW9uc0J5SWQvPGNoYW1wPi5cbiAqXG4gKiBSaW90J3MgVGVhbSBQbGFubmVyIHN0b3JlcyA5IHNsb3RzOyBpZiB0aGUgY29tcCBoYXMgbW9yZSB1bml0cyB3ZSBzZW5kIHRoZVxuICogZmlyc3QgOS4gVGhlIGVuZHBvaW50IHJlcGxhY2VzIGEgc2xvdCwgc28gd2UgUE9TVCBzZXF1ZW50aWFsbHkgdG8gYXZvaWRcbiAqIHRoZSBjbGllbnQgcmFjaW5nIHdpdGggdXMuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwdXNoVGVhbVRvUGxhbm5lcihjaGFtcGlvbklkczogc3RyaW5nW10pOiBQcm9taXNlPFB1c2hSZXN1bHQ+IHtcbiAgaWYgKGNoYW1waW9uSWRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7IG9rOiBmYWxzZSwgcHVzaGVkOiAwLCBmYWlsZWQ6IDAsIHJlYXNvbjogJ05vIHVuaXRzIHRvIHB1c2gnIH07XG4gIH1cbiAgY29uc3QgY3JlZHMgPSBhd2FpdCBnZXRMY3VDcmVkZW50aWFscygpO1xuICBpZiAoIWNyZWRzKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBwdXNoZWQ6IDAsIGZhaWxlZDogY2hhbXBpb25JZHMubGVuZ3RoLCByZWFzb246ICdMZWFndWUgY2xpZW50IG5vdCBydW5uaW5nIChsb2NrZmlsZSBub3QgZm91bmQpJyB9O1xuICB9XG4gIC8vIERlLWR1cGUgY2hhbXBpb25zIOKAlCBUZWFtIFBsYW5uZXIgb25seSBzdG9yZXMgb25lIGVudHJ5IHBlciBjaGFtcGlvbi5cbiAgY29uc3QgdW5pcXVlID0gQXJyYXkuZnJvbShuZXcgU2V0KGNoYW1waW9uSWRzKSkuc2xpY2UoMCwgOSk7XG5cbiAgbGV0IHB1c2hlZCA9IDA7XG4gIGxldCBmYWlsZWQgPSAwO1xuICBsZXQgbGFzdEVycjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBmb3IgKGNvbnN0IGlkIG9mIHVuaXF1ZSkge1xuICAgIGNvbnN0IG5hbWUgPSBjaGFtcGlvbklkVG9MY3VOYW1lKGlkKTtcbiAgICBpZiAoIW5hbWUpIHsgZmFpbGVkKys7IGNvbnRpbnVlOyB9XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGxjdUZldGNoKGNyZWRzLCBgL2xvbC10ZnQtdGVhbS1wbGFubmVyL3YxL3RlYW0vY2hhbXBpb25zQnlJZC8ke2VuY29kZVVSSUNvbXBvbmVudChuYW1lKX1gLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiB7IGNoYW1waW9uTmFtZTogbmFtZSB9LFxuICAgICAgfSk7XG4gICAgICBwdXNoZWQrKztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGZhaWxlZCsrO1xuICAgICAgbGFzdEVyciA9IChlcnIgYXMgRXJyb3IpLm1lc3NhZ2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgb2s6IHB1c2hlZCA+IDAsXG4gICAgcHVzaGVkLFxuICAgIGZhaWxlZCxcbiAgICByZWFzb246IGZhaWxlZCA+IDAgPyBsYXN0RXJyIDogdW5kZWZpbmVkLFxuICB9O1xufVxuXG4vKipcbiAqIFF1aWNrIExDVSByZWFjaGFiaWxpdHkgcHJvYmUg4oCUIHVzZWQgdG8gZW5hYmxlL2Rpc2FibGUgdGhlIHB1c2ggYnV0dG9uc1xuICogdXBmcm9udCB3aXRob3V0IGZpcmluZyBhIHJlYWwgcmVxdWVzdC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzTGN1UmVhY2hhYmxlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBjb25zdCBjcmVkcyA9IGF3YWl0IGdldExjdUNyZWRlbnRpYWxzKCk7XG4gIGlmICghY3JlZHMpIHJldHVybiBmYWxzZTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBsY3VGZXRjaChjcmVkcywgJy9yaW90Y2xpZW50L2dldF9yZWdpb25fbG9jYWxlJyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlbmllbmNlOiByZXR1cm5zIHRydWUgaWYgYSBzdXBwb3J0ZWQgUmlvdCBnYW1lIChMb0wvVEZUKSBpcyBydW5uaW5nLlxuICogVXNlZnVsIGZvciBnYXRpbmcgVUkgaGludHMuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc1Jpb3RHYW1lUnVubmluZygpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgY29uc3QgaW5mbyA9IGF3YWl0IFJVTk5JTkdfSU5GTygpLmNhdGNoKCgpID0+IG51bGwpO1xuICBjb25zdCBpZCA9IChpbmZvIGFzIGFueSk/LmNsYXNzSWQgPz8gKGluZm8gYXMgYW55KT8uaWQ7XG4gIGlmICghaWQpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGlkID09PSBMT0xfR0FNRV9JRCB8fCBpZCA9PT0gVEZUX1NUQU5EQUxPTkVfSUQ7XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gTENVIFJFQUQgRU5EUE9JTlRTIOKAlCB0aGVzZSBtaXJyb3IgTWV0YVRGVCdzIGF1dG8tbGluayBiZWhhdmlvdXIuIFdoZW4gTG9MXG4vLyBpcyBydW5uaW5nIHdlIGRvbid0IGFzayB0aGUgdXNlciB0byB0eXBlIGEgUmlvdCBJRDsgd2UgcmVhZCBpdCBmcm9tIExDVS5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIExjdVN1bW1vbmVySW5mbyB7XG4gIGFjY291bnRJZDogc3RyaW5nO1xuICBzdW1tb25lcklkOiBzdHJpbmc7XG4gIHB1dWlkOiBzdHJpbmc7XG4gIGdhbWVOYW1lOiBzdHJpbmc7XG4gIHRhZ0xpbmU6IHN0cmluZztcbiAgaW50ZXJuYWxOYW1lOiBzdHJpbmc7XG4gIGRpc3BsYXlOYW1lOiBzdHJpbmc7XG4gIHByb2ZpbGVJY29uSWQ6IG51bWJlcjtcbiAgc3VtbW9uZXJMZXZlbDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExjdVJlZ2lvbkxvY2FsZSB7XG4gIHJlZ2lvbjogc3RyaW5nOyAgICAgLy8gZS5nLiAnRVVXJ1xuICBsb2NhbGU6IHN0cmluZzsgICAgIC8vIGUuZy4gJ2VuX1VTJ1xuICB3ZWJMYW5ndWFnZTogc3RyaW5nO1xuICB3ZWJSZWdpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMY3VSYW5rZWRTdGF0cyB7XG4gIHRpZXI/OiBzdHJpbmc7XG4gIGRpdmlzaW9uPzogc3RyaW5nO1xuICBsZWFndWVQb2ludHM/OiBudW1iZXI7XG4gIHdpbnM/OiBudW1iZXI7XG4gIGxvc3Nlcz86IG51bWJlcjtcbiAgcXVldWVUeXBlPzogc3RyaW5nOyAgICAgLy8gZS5nLiAnUkFOS0VEX1RGVCdcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRTdW1tb25lcigpOiBQcm9taXNlPExjdVN1bW1vbmVySW5mbyB8IG51bGw+IHtcbiAgY29uc3QgY3JlZHMgPSBhd2FpdCBnZXRMY3VDcmVkZW50aWFscygpO1xuICBpZiAoIWNyZWRzKSByZXR1cm4gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgbGN1RmV0Y2goY3JlZHMsICcvbG9sLXN1bW1vbmVyL3YxL2N1cnJlbnQtc3VtbW9uZXInKTtcbiAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICBhY2NvdW50SWQ6ICAgICBTdHJpbmcoZGF0YS5hY2NvdW50SWQgPz8gJycpLFxuICAgICAgc3VtbW9uZXJJZDogICAgU3RyaW5nKGRhdGEuc3VtbW9uZXJJZCA/PyAnJyksXG4gICAgICBwdXVpZDogICAgICAgICBTdHJpbmcoZGF0YS5wdXVpZCA/PyAnJyksXG4gICAgICBnYW1lTmFtZTogICAgICBTdHJpbmcoZGF0YS5nYW1lTmFtZSA/PyBkYXRhLmRpc3BsYXlOYW1lID8/ICcnKSxcbiAgICAgIHRhZ0xpbmU6ICAgICAgIFN0cmluZyhkYXRhLnRhZ0xpbmUgPz8gJycpLFxuICAgICAgaW50ZXJuYWxOYW1lOiAgU3RyaW5nKGRhdGEuaW50ZXJuYWxOYW1lID8/ICcnKSxcbiAgICAgIGRpc3BsYXlOYW1lOiAgIFN0cmluZyhkYXRhLmRpc3BsYXlOYW1lID8/ICcnKSxcbiAgICAgIHByb2ZpbGVJY29uSWQ6IE51bWJlcihkYXRhLnByb2ZpbGVJY29uSWQgPz8gMCksXG4gICAgICBzdW1tb25lckxldmVsOiBOdW1iZXIoZGF0YS5zdW1tb25lckxldmVsID8/IDApLFxuICAgIH07XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZWdpb25Mb2NhbGUoKTogUHJvbWlzZTxMY3VSZWdpb25Mb2NhbGUgfCBudWxsPiB7XG4gIGNvbnN0IGNyZWRzID0gYXdhaXQgZ2V0TGN1Q3JlZGVudGlhbHMoKTtcbiAgaWYgKCFjcmVkcykgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGxjdUZldGNoKGNyZWRzLCAnL3Jpb3RjbGllbnQvZ2V0X3JlZ2lvbl9sb2NhbGUnKTtcbiAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICByZWdpb246ICAgICAgU3RyaW5nKGRhdGEucmVnaW9uID8/ICcnKSxcbiAgICAgIGxvY2FsZTogICAgICBTdHJpbmcoZGF0YS5sb2NhbGUgPz8gJycpLFxuICAgICAgd2ViTGFuZ3VhZ2U6IFN0cmluZyhkYXRhLndlYkxhbmd1YWdlID8/ICcnKSxcbiAgICAgIHdlYlJlZ2lvbjogICBTdHJpbmcoZGF0YS53ZWJSZWdpb24gPz8gJycpLFxuICAgIH07XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50UmFua2VkU3RhdHMoKTogUHJvbWlzZTxMY3VSYW5rZWRTdGF0cyB8IG51bGw+IHtcbiAgY29uc3QgY3JlZHMgPSBhd2FpdCBnZXRMY3VDcmVkZW50aWFscygpO1xuICBpZiAoIWNyZWRzKSByZXR1cm4gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgbGN1RmV0Y2goY3JlZHMsICcvbG9sLXJhbmtlZC92MS9jdXJyZW50LXJhbmtlZC1zdGF0cycpO1xuICAgIGlmICghZGF0YSkgcmV0dXJuIG51bGw7XG4gICAgLy8gVGhlIHNoYXBlIGluY2x1ZGVzIGBxdWV1ZU1hcGAgd2l0aCBhbGwgcmFua2VkIHF1ZXVlIHN0YXRzOyBwdWxsIFRGVC5cbiAgICBjb25zdCBxdWV1ZU1hcCA9IGRhdGEucXVldWVNYXAgfHwge307XG4gICAgY29uc3QgdGZ0ID0gcXVldWVNYXAuUkFOS0VEX1RGVCB8fCBxdWV1ZU1hcC5SQU5LRURfVEZUX1RVUkJPIHx8IHF1ZXVlTWFwLlJBTktFRF9URlRfRE9VQkxFX1VQIHx8IG51bGw7XG4gICAgaWYgKCF0ZnQpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICB0aWVyOiAgICAgICAgIHRmdC50aWVyLFxuICAgICAgZGl2aXNpb246ICAgICB0ZnQuZGl2aXNpb24sXG4gICAgICBsZWFndWVQb2ludHM6IHRmdC5sZWFndWVQb2ludHMsXG4gICAgICB3aW5zOiAgICAgICAgIHRmdC53aW5zLFxuICAgICAgbG9zc2VzOiAgICAgICB0ZnQubG9zc2VzLFxuICAgICAgcXVldWVUeXBlOiAgICB0ZnQucXVldWVUeXBlLFxuICAgIH07XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50R2FtZVZlcnNpb24oKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gIGNvbnN0IGNyZWRzID0gYXdhaXQgZ2V0TGN1Q3JlZGVudGlhbHMoKTtcbiAgaWYgKCFjcmVkcykgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGxjdUZldGNoKGNyZWRzLCAnL2xvbC1wYXRjaC92MS9nYW1lLXZlcnNpb24nKTtcbiAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gZGF0YSA6IChkYXRhPy52ZXJzaW9uID8/IG51bGwpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKiogQ29udmVydCBMQ1UncyByZWdpb24gY29kZSAoZS5nLiBcIkVVV1wiKSB0byB0aGUgUmlvdCBHYW1lcyBBUEkgcGxhdGZvcm0gaWRcbiAqICAoXCJldXcxXCIpLiBGYWxscyBiYWNrIHRvIHRoZSByYXcgbG93ZXItY2FzZSBpbnB1dCBmb3IgdW5rbm93biByZWdpb25zLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lvbkNvZGVUb1BsYXRmb3JtKHJlZ2lvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIEVVVzogJ2V1dzEnLCBFVU5FOiAnZXVuMScsIE5BOiAnbmExJywgS1I6ICdrcicsIEJSOiAnYnIxJyxcbiAgICBMQU46ICdsYTEnLCBMQVM6ICdsYTInLCBPQ0U6ICdvYzEnLCBUUjogJ3RyMScsIFJVOiAncnUnLFxuICAgIEpQOiAnanAxJywgUEJFOiAncGJlMScsIFBIOiAncGgyJywgU0c6ICdzZzInLCBUSDogJ3RoMicsXG4gICAgVFc6ICd0dzInLCBWTjogJ3ZuMicsXG4gIH07XG4gIHJldHVybiBtYXBbcmVnaW9uLnRvVXBwZXJDYXNlKCldIHx8IHJlZ2lvbi50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKiogQnVuZGxlOiBkZXRlY3Qgc3VtbW9uZXIgKyByYW5rICsgcmVnaW9uIGluIG9uZSBjYWxsLiBVc2VkIGJ5IFByb2ZpbGVcbiAqICB0YWIncyBcIkF1dG8tbGlua1wiIGFmZm9yZGFuY2UuIFJldHVybnMgbnVsbCBpZiBMQ1UgaXNuJ3QgcmVhY2hhYmxlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBMY3VBdXRvTGlua1Jlc3VsdCB7XG4gIHN1bW1vbmVyOiBMY3VTdW1tb25lckluZm87XG4gIHJlZ2lvbjogTGN1UmVnaW9uTG9jYWxlIHwgbnVsbDtcbiAgcmFuazogTGN1UmFua2VkU3RhdHMgfCBudWxsO1xuICBwbGF0Zm9ybUlkOiBzdHJpbmc7ICAvLyBlLmcuICdldXcxJ1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXV0b0xpbmtGcm9tTGN1KCk6IFByb21pc2U8TGN1QXV0b0xpbmtSZXN1bHQgfCBudWxsPiB7XG4gIGNvbnN0IHN1bW1vbmVyID0gYXdhaXQgZ2V0Q3VycmVudFN1bW1vbmVyKCk7XG4gIGlmICghc3VtbW9uZXIpIHJldHVybiBudWxsO1xuICAvLyBQYXJhbGxlbCBmZXRjaCDigJQgbm9uZSBvZiB0aGVzZSBibG9jayBlYWNoIG90aGVyXG4gIGNvbnN0IFtyZWdpb24sIHJhbmtdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGdldFJlZ2lvbkxvY2FsZSgpLmNhdGNoKCgpID0+IG51bGwpLFxuICAgIGdldEN1cnJlbnRSYW5rZWRTdGF0cygpLmNhdGNoKCgpID0+IG51bGwpLFxuICBdKTtcbiAgY29uc3QgcGxhdGZvcm1JZCA9IHJlZ2lvbiA/IHJlZ2lvbkNvZGVUb1BsYXRmb3JtKHJlZ2lvbi5yZWdpb24pIDogJ2V1dzEnO1xuICByZXR1cm4geyBzdW1tb25lciwgcmVnaW9uLCByYW5rLCBwbGF0Zm9ybUlkIH07XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gU2V0dGluZ3Mgd2luZG93IOKAlCBzdGFuZGFsb25lIE92ZXJ3b2xmIHdpbmRvdyAoNDgweDM2MCBkZXNrdG9wX29ubHkpLlxuLy9cbi8vIEFsbCBzZXR0aW5ncyBhcmUgc3RvcmVkIGluIGxvY2FsU3RvcmFnZSB3aXRoIHRoZSBgcGl2b3R0ZnRfc2V0dGluZ3NfKmBcbi8vIHByZWZpeC4gT3RoZXIgd2luZG93cyByZWFkIHRoZW0gb24gZGVtYW5kIChubyBjcm9zcy13aW5kb3cgZXZlbnQgYnVzXG4vLyB0b2RheSDigJQgdGhlIHJlbmRlcmVyIHJlYWRzIGxvY2FsU3RvcmFnZSBvbiBlYWNoIG9wZW4pLlxuXG5pbXBvcnQgeyBpc0xjdVJlYWNoYWJsZSwgYXV0b0xpbmtGcm9tTGN1IH0gZnJvbSAnLi4vc2VydmljZXMvTGN1U2VydmljZSc7XG5pbXBvcnQgeyBpc0F1dGhlbnRpY2F0ZWQsIGdldFN0b3JlZFVzZXIsIGhhc0F0TGVhc3QsIGxvZ291dCwgcmVmcmVzaE1lLCBvbkNoYW5nZSBhcyBvbkF1dGhDaGFuZ2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9BdXRoU2VydmljZSc7XG5pbXBvcnQgeyBrV2luZG93TmFtZXMgfSBmcm9tICcuLi9jb25zdHMnO1xuXG5jb25zdCBTVE9SQUdFX0tFWVMgPSB7XG4gIGFwaUtleTogJ3Bpdm90dGZ0X3NldHRpbmdzX2FwaV9rZXknLFxuICBwbGF0Zm9ybTogJ3Bpdm90dGZ0X3NldHRpbmdzX3BsYXRmb3JtJyxcbiAgY29udHJvbGxlckVuYWJsZWQ6ICdwaXZvdHRmdF9zZXR0aW5nc19jb250cm9sbGVyX2VuYWJsZWQnLFxuICBhdXRvcGluUzogJ3Bpdm90dGZ0X3NldHRpbmdzX2F1dG9waW5fcycsXG59O1xuXG5mdW5jdGlvbiAkPFQgZXh0ZW5kcyBIVE1MRWxlbWVudD4oaWQ6IHN0cmluZyk6IFQgfCBudWxsIHtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSBhcyBUIHwgbnVsbDtcbn1cblxuZnVuY3Rpb24gbG9hZFNldHRpbmdzKCkge1xuICBjb25zdCBhcGlLZXkgPSAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdzZXR0aW5ncy1hcGkta2V5Jyk7XG4gIGNvbnN0IHBsYXRmb3JtID0gJDxIVE1MU2VsZWN0RWxlbWVudD4oJ3NldHRpbmdzLXBsYXRmb3JtJyk7XG4gIGNvbnN0IGNvbnRyb2xsZXJFbmFibGVkID0gJDxIVE1MSW5wdXRFbGVtZW50Pignc2V0dGluZ3MtY29udHJvbGxlci1lbmFibGVkJyk7XG4gIGNvbnN0IGF1dG9waW5TID0gJDxIVE1MSW5wdXRFbGVtZW50Pignc2V0dGluZ3MtYXV0b3Bpbi1zJyk7XG5cbiAgaWYgKGFwaUtleSkgICAgICAgICAgICBhcGlLZXkudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuYXBpS2V5KSB8fCAnJztcbiAgaWYgKHBsYXRmb3JtKSAgICAgICAgICBwbGF0Zm9ybS52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5wbGF0Zm9ybSkgfHwgJ2V1dzEnO1xuICBpZiAoY29udHJvbGxlckVuYWJsZWQpIGNvbnRyb2xsZXJFbmFibGVkLmNoZWNrZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuY29udHJvbGxlckVuYWJsZWQpICE9PSAnZmFsc2UnO1xuICBpZiAoYXV0b3BpblMpICAgICAgICAgIGF1dG9waW5TLmNoZWNrZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMuYXV0b3BpblMpID09PSAndHJ1ZSc7XG59XG5cbmZ1bmN0aW9uIHBlcnNpc3RTZXR0aW5ncygpIHtcbiAgY29uc3QgYXBpS2V5ID0gJDxIVE1MSW5wdXRFbGVtZW50Pignc2V0dGluZ3MtYXBpLWtleScpO1xuICBjb25zdCBwbGF0Zm9ybSA9ICQ8SFRNTFNlbGVjdEVsZW1lbnQ+KCdzZXR0aW5ncy1wbGF0Zm9ybScpO1xuICBjb25zdCBjb250cm9sbGVyRW5hYmxlZCA9ICQ8SFRNTElucHV0RWxlbWVudD4oJ3NldHRpbmdzLWNvbnRyb2xsZXItZW5hYmxlZCcpO1xuICBjb25zdCBhdXRvcGluUyA9ICQ8SFRNTElucHV0RWxlbWVudD4oJ3NldHRpbmdzLWF1dG9waW4tcycpO1xuXG4gIGlmIChhcGlLZXkpICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLmFwaUtleSwgYXBpS2V5LnZhbHVlLnRyaW0oKSk7XG4gIGlmIChwbGF0Zm9ybSkgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLnBsYXRmb3JtLCBwbGF0Zm9ybS52YWx1ZSk7XG4gIGlmIChjb250cm9sbGVyRW5hYmxlZCkgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlTLmNvbnRyb2xsZXJFbmFibGVkLCBjb250cm9sbGVyRW5hYmxlZC5jaGVja2VkLnRvU3RyaW5nKCkpO1xuICBpZiAoYXV0b3BpblMpICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy5hdXRvcGluUywgYXV0b3BpblMuY2hlY2tlZC50b1N0cmluZygpKTtcbn1cblxuZnVuY3Rpb24gc2V0dXBIb3RrZXlEaXNwbGF5KCkge1xuICAvLyBSZXNvbHZlIGFuZCBwcmV0dHktcHJpbnQgdGhlIGN1cnJlbnRseS1ib3VuZCBob3RrZXkgdmlhIE92ZXJ3b2xmJ3MgQVBJLlxuICAvLyBHZXRBc3NpZ25lZEhvdGtleVJlc3VsdCBpcyBsb29zZWx5IHR5cGVkIGluIEBvdmVyd29sZi90eXBlczsgY2FzdCB0byBhbnkuXG4gIG92ZXJ3b2xmLnNldHRpbmdzLmhvdGtleXMuZ2V0KChyZXM6IGFueSkgPT4ge1xuICAgIGlmICghcmVzPy5zdWNjZXNzIHx8ICFyZXMuaG90a2V5cykgcmV0dXJuO1xuICAgIGNvbnN0IGdhbWVIb3RrZXlzID0gcmVzLmhvdGtleXMuZ2FtZXM/LlsnNTQyNiddIHx8IFtdO1xuICAgIGNvbnN0IGdsb2JhbEhvdGtleXMgPSByZXMuaG90a2V5cy5nbG9iYWwgfHwgW107XG4gICAgY29uc3QgYWxsID0gWy4uLmdsb2JhbEhvdGtleXMsIC4uLmdhbWVIb3RrZXlzXTtcbiAgICBjb25zdCB0b2dnbGUgPSBhbGwuZmluZCgoaDogYW55KSA9PiBoLm5hbWUgPT09ICdwaXZvdHRmdF9zaG93aGlkZScpO1xuICAgIGNvbnN0IGVsID0gJCgnaGstdG9nZ2xlJyk7XG4gICAgaWYgKGVsKSBlbC50ZXh0Q29udGVudCA9IHRvZ2dsZT8uYmluZGluZyB8fCAnTm90IGJvdW5kJztcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldHVwQ2xvc2VCdXR0b24oKSB7XG4gIGNvbnN0IGJ0biA9ICQoJ3NldHRpbmdzLWNsb3NlJyk7XG4gIGlmICghYnRuKSByZXR1cm47XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBvdmVyd29sZi53aW5kb3dzLmdldEN1cnJlbnRXaW5kb3coKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcz8uc3VjY2VzcyAmJiByZXMud2luZG93Py5pZCkge1xuICAgICAgICBvdmVyd29sZi53aW5kb3dzLmNsb3NlKHJlcy53aW5kb3cuaWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0dXBWZXJzaW9uRGlzcGxheSgpIHtcbiAgb3ZlcndvbGYuZXh0ZW5zaW9ucy5jdXJyZW50LmdldE1hbmlmZXN0KChyZXM6IGFueSkgPT4ge1xuICAgIGNvbnN0IHZlcnNpb24gPSByZXM/Lm1ldGE/LnZlcnNpb24gfHwgJz8nO1xuICAgIGNvbnN0IGVsID0gJCgnc2V0dGluZ3MtdmVyc2lvbicpO1xuICAgIGlmIChlbCkgZWwudGV4dENvbnRlbnQgPSBgVmVyc2lvbjogJHt2ZXJzaW9ufWA7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXR1cEF1dG9TYXZlKCkge1xuICAvLyBEZWJvdW5jZWQgc2F2ZSBvbiBpbnB1dC9jaGFuZ2Ugc28gdXNlciBkb2Vzbid0IG5lZWQgYSBTYXZlIGJ1dHRvbi5cbiAgbGV0IHRpbWVyOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgY29uc3QgcXVldWUgPSAoKSA9PiB7XG4gICAgaWYgKHRpbWVyKSB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB0aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KHBlcnNpc3RTZXR0aW5ncywgMjUwKTtcbiAgfTtcbiAgWydzZXR0aW5ncy1hcGkta2V5JywgJ3NldHRpbmdzLXBsYXRmb3JtJywgJ3NldHRpbmdzLWNvbnRyb2xsZXItZW5hYmxlZCcsICdzZXR0aW5ncy1hdXRvcGluLXMnXVxuICAgIC5mb3JFYWNoKGlkID0+ICQoaWQpPy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHF1ZXVlKSk7XG4gIFsnc2V0dGluZ3MtcGxhdGZvcm0nLCAnc2V0dGluZ3MtY29udHJvbGxlci1lbmFibGVkJywgJ3NldHRpbmdzLWF1dG9waW4tcyddXG4gICAgLmZvckVhY2goaWQgPT4gJChpZCk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHF1ZXVlKSk7XG59XG5cbmZ1bmN0aW9uIHNldHVwTGN1VGVzdCgpIHtcbiAgY29uc3QgYnRuID0gJDxIVE1MQnV0dG9uRWxlbWVudD4oJ3NldHRpbmdzLXRlc3QtbGN1Jyk7XG4gIGNvbnN0IHN0YXR1cyA9ICQoJ3NldHRpbmdzLWxjdS1zdGF0dXMnKTtcbiAgaWYgKCFidG4gfHwgIXN0YXR1cykgcmV0dXJuO1xuICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnQ2hlY2tpbmfigKYnO1xuICAgIHN0YXR1cy5jbGFzc05hbWUgPSAnc2V0dGluZ3Mtc3RhdHVzIHBlbmRpbmcnO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBvayA9IGF3YWl0IGlzTGN1UmVhY2hhYmxlKCk7XG4gICAgICBpZiAob2spIHtcbiAgICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gJ+KckyBDb25uZWN0ZWQgdG8gTGVhZ3VlIGNsaWVudC4nO1xuICAgICAgICBzdGF0dXMuY2xhc3NOYW1lID0gJ3NldHRpbmdzLXN0YXR1cyBvayc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAn4pyVIENvdWxkIG5vdCByZWFjaCBMZWFndWUgY2xpZW50LiBJcyBpdCBydW5uaW5nPyc7XG4gICAgICAgIHN0YXR1cy5jbGFzc05hbWUgPSAnc2V0dGluZ3Mtc3RhdHVzIGVycic7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gYOKclSBFcnJvcjogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gO1xuICAgICAgc3RhdHVzLmNsYXNzTmFtZSA9ICdzZXR0aW5ncy1zdGF0dXMgZXJyJztcbiAgICB9IGZpbmFsbHkge1xuICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0dXBBdXRvTGluaygpIHtcbiAgY29uc3QgYnRuID0gJDxIVE1MQnV0dG9uRWxlbWVudD4oJ3NldHRpbmdzLWF1dG9saW5rJyk7XG4gIGNvbnN0IHN0YXR1cyA9ICQoJ3NldHRpbmdzLWF1dG9saW5rLXN0YXR1cycpO1xuICBpZiAoIWJ0biB8fCAhc3RhdHVzKSByZXR1cm47XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICdSZWFkaW5nIExvTCBjbGllbnTigKYnO1xuICAgIHN0YXR1cy5jbGFzc05hbWUgPSAnc2V0dGluZ3Mtc3RhdHVzIHBlbmRpbmcnO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhdXRvTGlua0Zyb21MY3UoKTtcbiAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICfinJUgQ291bGQgbm90IHJlYWQgc3VtbW9uZXIgaW5mby4gSXMgdGhlIExvTCBjbGllbnQgb3Blbj8nO1xuICAgICAgICBzdGF0dXMuY2xhc3NOYW1lID0gJ3NldHRpbmdzLXN0YXR1cyBlcnInO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBVcGRhdGUgcGxhdGZvcm0gc2VsZWN0IHRvIG1hdGNoXG4gICAgICBjb25zdCBwbGF0Zm9ybVNlbCA9ICQ8SFRNTFNlbGVjdEVsZW1lbnQ+KCdzZXR0aW5ncy1wbGF0Zm9ybScpO1xuICAgICAgaWYgKHBsYXRmb3JtU2VsKSB7XG4gICAgICAgIHBsYXRmb3JtU2VsLnZhbHVlID0gcmVzdWx0LnBsYXRmb3JtSWQ7XG4gICAgICAgIHBsYXRmb3JtU2VsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFBlcnNpc3QgbGlua2VkIGFjY291bnQgdXNpbmcgdGhlIHNhbWUga2V5IHRoZSBQcm9maWxlIHRhYiByZWFkc1xuICAgICAgY29uc3QgbGlua2VkQWNjb3VudCA9IHtcbiAgICAgICAgZ2FtZU5hbWU6IHJlc3VsdC5zdW1tb25lci5nYW1lTmFtZSB8fCByZXN1bHQuc3VtbW9uZXIuZGlzcGxheU5hbWUsXG4gICAgICAgIHRhZ0xpbmU6ICByZXN1bHQuc3VtbW9uZXIudGFnTGluZSxcbiAgICAgICAgcGxhdGZvcm06IHJlc3VsdC5wbGF0Zm9ybUlkLFxuICAgICAgfTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwaXZvdHRmdF9saW5rZWRfYWNjb3VudCcsIEpTT04uc3RyaW5naWZ5KGxpbmtlZEFjY291bnQpKTtcbiAgICAgIH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxuXG4gICAgICBjb25zdCByYW5rID0gcmVzdWx0LnJhbmtcbiAgICAgICAgPyBgIMK3ICR7cmVzdWx0LnJhbmsudGllcn0gJHtyZXN1bHQucmFuay5kaXZpc2lvbn0gJHtyZXN1bHQucmFuay5sZWFndWVQb2ludHN9IExQYFxuICAgICAgICA6ICcnO1xuICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gYOKckyBMaW5rZWQ6ICR7bGlua2VkQWNjb3VudC5nYW1lTmFtZX0jJHtsaW5rZWRBY2NvdW50LnRhZ0xpbmV9ICgke3Jlc3VsdC5wbGF0Zm9ybUlkLnRvVXBwZXJDYXNlKCl9KSR7cmFua31gO1xuICAgICAgc3RhdHVzLmNsYXNzTmFtZSA9ICdzZXR0aW5ncy1zdGF0dXMgb2snO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IGDinJUgJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gO1xuICAgICAgc3RhdHVzLmNsYXNzTmFtZSA9ICdzZXR0aW5ncy1zdGF0dXMgZXJyJztcbiAgICB9IGZpbmFsbHkge1xuICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQWNjb3VudFNlY3Rpb24oKSB7XG4gIGNvbnN0IHN0YXR1c0VsID0gJCgnc2V0dGluZ3MtYWNjb3VudC1zdGF0dXMnKTtcbiAgY29uc3Qgc2lnbkluQnRuID0gJDxIVE1MQnV0dG9uRWxlbWVudD4oJ3NldHRpbmdzLXNpZ25pbicpO1xuICBjb25zdCBzaWduT3V0QnRuID0gJDxIVE1MQnV0dG9uRWxlbWVudD4oJ3NldHRpbmdzLXNpZ25vdXQnKTtcbiAgY29uc3QgYWRtaW5CdG4gPSAkPEhUTUxCdXR0b25FbGVtZW50Pignc2V0dGluZ3Mtb3Blbi1hZG1pbicpO1xuICBpZiAoIXN0YXR1c0VsIHx8ICFzaWduSW5CdG4gfHwgIXNpZ25PdXRCdG4gfHwgIWFkbWluQnRuKSByZXR1cm47XG5cbiAgaWYgKCFpc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgIHN0YXR1c0VsLnRleHRDb250ZW50ID0gJ05vdCBzaWduZWQgaW4uJztcbiAgICBzdGF0dXNFbC5jbGFzc05hbWUgPSAnc2V0dGluZ3Mtc3RhdHVzJztcbiAgICBzaWduSW5CdG4uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAgIHNpZ25PdXRCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBhZG1pbkJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHVzZXIgPSBnZXRTdG9yZWRVc2VyKCk7XG4gIGlmICghdXNlcikgcmV0dXJuO1xuICBzdGF0dXNFbC5pbm5lckhUTUwgPSBgU2lnbmVkIGluIGFzIDxzdHJvbmc+JHt1c2VyLmVtYWlsfTwvc3Ryb25nPiAoJHt1c2VyLnJvbGV9KS5gO1xuICBzdGF0dXNFbC5jbGFzc05hbWUgPSAnc2V0dGluZ3Mtc3RhdHVzIG9rJztcbiAgc2lnbkluQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHNpZ25PdXRCdG4uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICBhZG1pbkJ0bi5zdHlsZS5kaXNwbGF5ID0gaGFzQXRMZWFzdCgnbW9kZXJhdG9yJykgPyAnaW5saW5lLWJsb2NrJyA6ICdub25lJztcbn1cblxuZnVuY3Rpb24gc2V0dXBBY2NvdW50QWN0aW9ucygpIHtcbiAgJCgnc2V0dGluZ3Mtc2lnbmluJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG92ZXJ3b2xmLndpbmRvd3Mub2J0YWluRGVjbGFyZWRXaW5kb3coa1dpbmRvd05hbWVzLmxvZ2luLCAocmVzKSA9PiB7XG4gICAgICBpZiAocmVzPy5zdWNjZXNzICYmIHJlcy53aW5kb3c/LmlkKSBvdmVyd29sZi53aW5kb3dzLnJlc3RvcmUocmVzLndpbmRvdy5pZCk7XG4gICAgfSk7XG4gIH0pO1xuICAkKCdzZXR0aW5ncy1vcGVuLWFkbWluJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG92ZXJ3b2xmLndpbmRvd3Mub2J0YWluRGVjbGFyZWRXaW5kb3coa1dpbmRvd05hbWVzLmFkbWluLCAocmVzKSA9PiB7XG4gICAgICBpZiAocmVzPy5zdWNjZXNzICYmIHJlcy53aW5kb3c/LmlkKSBvdmVyd29sZi53aW5kb3dzLnJlc3RvcmUocmVzLndpbmRvdy5pZCk7XG4gICAgfSk7XG4gIH0pO1xuICAkKCdzZXR0aW5ncy1zaWdub3V0Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGxvZ291dCgpO1xuICAgIHJlbmRlckFjY291bnRTZWN0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIFJlZnJlc2ggcm9sZS9wcm9maWxlIGZyb20gYmFja2VuZCBvbiBvcGVuIChjYXRjaGVzIHJvbGUgY2hhbmdlcyBtYWRlXG4gIC8vIHZpYSBkaXJlY3QgREIgdXBkYXRlIGJ5IGFub3RoZXIgYWRtaW4pLlxuICBpZiAoaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICByZWZyZXNoTWUoKS50aGVuKHJlbmRlckFjY291bnRTZWN0aW9uKS5jYXRjaCgoKSA9PiB7IC8qIHNpbGVudCAqLyB9KTtcbiAgfVxuXG4gIC8vIFJlLXJlbmRlciB3aGVuZXZlciB0aGUgc2Vzc2lvbiBjaGFuZ2VzIChvdGhlciB3aW5kb3cgbG9ncyBpbi9vdXQpXG4gIG9uQXV0aENoYW5nZShyZW5kZXJBY2NvdW50U2VjdGlvbik7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBsb2FkU2V0dGluZ3MoKTtcbiAgc2V0dXBBdXRvU2F2ZSgpO1xuICBzZXR1cENsb3NlQnV0dG9uKCk7XG4gIHNldHVwVmVyc2lvbkRpc3BsYXkoKTtcbiAgc2V0dXBIb3RrZXlEaXNwbGF5KCk7XG4gIHNldHVwTGN1VGVzdCgpO1xuICBzZXR1cEF1dG9MaW5rKCk7XG4gIHJlbmRlckFjY291bnRTZWN0aW9uKCk7XG4gIHNldHVwQWNjb3VudEFjdGlvbnMoKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9