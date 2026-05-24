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
    { id: 'TFT17_IvernMinion', name: "Meepsie", cost: 2, traits: ['Meeple', 'Shepherd', 'Voyager'], tileIcon: 'ASSETS/Characters/TFT17_IvernMinion/Skins/Base/Images/TFT17_IvernMinion_splash_tile_27.TFT_Set17.png' },
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
    { id: 'TFT17_Galio', name: "The Mighty Mech", cost: 4, traits: ['Mecha', 'Voyager'], tileIcon: 'ASSETS/Characters/TFT17_Galio/Skins/Base/Images/TFT17_Galio_Mobile.TFT_Set17.png' },
    { id: 'TFT17_Karma', name: "Karma", cost: 4, traits: ['Dark Star', 'Voyager'], tileIcon: 'ASSETS/Characters/TFT17_Karma/Skins/Base/Images/TFT17_Karma_splash_tile_8.TFT_Set17.png' },
    { id: 'TFT17_Kindred', name: "Kindred", cost: 4, traits: ['N.O.V.A.', 'Challenger'], tileIcon: 'ASSETS/Characters/TFT17_Kindred/Skins/Base/Images/TFT17_Kindred_splash_tile_23.TFT_Set17.png' },
    { id: 'TFT17_Leblanc', name: "LeBlanc", cost: 4, traits: ['Arbiter', 'Shepherd'], tileIcon: 'ASSETS/Characters/TFT17_Leblanc/Skins/Base/Images/TFT17_Leblanc_splash_tile_29.TFT_Set17.png' },
    { id: 'TFT17_MasterYi', name: "Master Yi", cost: 4, traits: ['Psionic', 'Marauder'], tileIcon: 'ASSETS/Characters/TFT17_MasterYi/Skins/Base/Images/TFT17_MasterYi_splash_tile_33.TFT_Set17.png' },
    { id: 'TFT17_Morgana', name: "Morgana", cost: 4, traits: ['Dark Lady'], tileIcon: 'ASSETS/Characters/TFT17_Morgana/Skins/Base/Images/TFT17_Morgana_splash_tile_50.TFT_Set17.png' },
    { id: 'TFT17_Nami', name: "Nami", cost: 4, traits: ['Space Groove', 'Replicator'], tileIcon: 'ASSETS/Characters/TFT17_Nami/Skins/Base/Images/TFT17_Nami_splash_tile_41.TFT_Set17.png' },
    { id: 'TFT17_Nunu', name: "Nunu & Willump", cost: 4, traits: ['Stargazer', 'Vanguard'], tileIcon: 'ASSETS/Characters/TFT17_Nunu/Skins/Base/Images/TFT17_Nunu_splash_tile_35.TFT_Set17.png' },
    { id: 'TFT17_Rammus', name: "Rammus", cost: 4, traits: ['Meeple', 'Bastion'], tileIcon: 'ASSETS/Characters/TFT17_Rammus/Skins/Base/Images/TFT17_Rammus_splash_tile_17.TFT_Set17.png' },
    { id: 'TFT17_Riven', name: "Riven", cost: 4, traits: ['Timebreaker', 'Rogue'], tileIcon: 'ASSETS/Characters/TFT17_Riven/Skins/Base/Images/TFT17_Riven_splash_tile_18.TFT_Set17.png' },
    { id: 'TFT17_TahmKench', name: "Tahm Kench", cost: 4, traits: ['Oracle', 'Brawler'], tileIcon: 'ASSETS/Characters/TFT17_TahmKench/Skins/Base/Images/TFT17_TahmKench_splash_tile_11.TFT_Set17.png' },
    { id: 'TFT17_Xayah', name: "Xayah", cost: 4, traits: ['Stargazer', 'Sniper'], tileIcon: 'ASSETS/Characters/TFT17_Xayah/Skins/Base/Images/TFT17_Xayah_splash_tile_1.TFT_Set17.png' },
    { id: 'TFT17_Bard', name: "Bard", cost: 5, traits: ['Meeple', 'Conduit'], tileIcon: 'ASSETS/Characters/TFT17_Bard/Skins/Base/Images/TFT17_Bard_splash_tile_8.TFT_Set17.png' },
    { id: 'TFT17_Blitzcrank', name: "Blitzcrank", cost: 5, traits: ['Party Animal', 'Space Groove', 'Vanguard'], tileIcon: 'ASSETS/Characters/TFT17_Blitzcrank/Skins/Base/Images/TFT17_Blitzcrank_splash_tile_65.TFT_Set17.png' },
    { id: 'TFT17_Fiora', name: "Fiora", cost: 5, traits: ['Divine Duelist', 'Anima', 'Marauder'], tileIcon: 'ASSETS/Characters/TFT17_Fiora/Skins/Base/Images/TFT17_Fiora_splash_tile_51.TFT_Set17.png' },
    { id: 'TFT17_Graves', name: "Graves", cost: 5, traits: ['Factory New'], tileIcon: 'ASSETS/Characters/TFT17_Graves/Skins/Base/Images/TFT17_Graves_splash_tile_18.TFT_Set17.png' },
    { id: 'TFT17_Jhin', name: "Jhin", cost: 5, traits: ['Dark Star', 'Eradicator', 'Sniper'], tileIcon: 'ASSETS/Characters/TFT17_Jhin/Skins/Base/Images/TFT17_Jhin_splash_tile_37.TFT_Set17.png' },
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


/***/ }),

/***/ "./src/services/SnapshotUploader.ts":
/*!******************************************!*\
  !*** ./src/services/SnapshotUploader.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotUploader = void 0;
const AuthService_1 = __webpack_require__(/*! ./AuthService */ "./src/services/AuthService.ts");
const OPT_IN_KEY = 'pivottft_contribute_snapshots';
const PENDING_KEY = 'pivottft_snapshot_pending_v1';
const CONTRIBUTED_COUNT_KEY = 'pivottft_snapshot_contributed_count_v1';
const MAX_PENDING = 10;
const consts_1 = __webpack_require__(/*! ../consts */ "./src/consts.ts");
class SnapshotUploader {
    static isOptedIn() {
        try {
            return localStorage.getItem(OPT_IN_KEY) === 'true';
        }
        catch (_a) {
            return false;
        }
    }
    static setOptIn(v) {
        try {
            localStorage.setItem(OPT_IN_KEY, v ? 'true' : 'false');
        }
        catch (_a) { }
    }
    static getContributedCount() {
        try {
            return parseInt(localStorage.getItem(CONTRIBUTED_COUNT_KEY) || '0', 10) || 0;
        }
        catch (_a) {
            return 0;
        }
    }
    static async tryUpload(payload) {
        if (!this.isOptedIn() || !AuthService_1.isAuthenticated())
            return;
        if (!payload.matchId || !payload.region || !payload.patch)
            return;
        await this.drainPending();
        const res = await this.uploadOnce(payload);
        if (!res.ok) {
            this.enqueue(payload);
        }
        else if (!res.alreadyUploaded) {
            this.bumpContributedCount();
        }
    }
    static buildPayload(args) {
        var _a, _b;
        return Object.assign(Object.assign({}, args), { patch: (_a = args.patch) !== null && _a !== void 0 ? _a : consts_1.kCurrentTftPatch, tftSet: (_b = args.tftSet) !== null && _b !== void 0 ? _b : consts_1.kCurrentTftSetNumber });
    }
    static async uploadOnce(p) {
        try {
            const res = await AuthService_1.adminFetch('/match-snapshots', { method: 'POST', body: JSON.stringify(p) });
            return { ok: !!res.ok, alreadyUploaded: !!res.alreadyUploaded };
        }
        catch (e) {
            return { ok: false, error: (e === null || e === void 0 ? void 0 : e.message) || String(e) };
        }
    }
    static async drainPending() {
        const queue = this.loadQueue();
        if (queue.length === 0)
            return;
        const remaining = [];
        for (const p of queue) {
            const r = await this.uploadOnce(p);
            if (r.ok) {
                if (!r.alreadyUploaded)
                    this.bumpContributedCount();
            }
            else {
                remaining.push(p);
            }
        }
        this.saveQueue(remaining);
    }
    static enqueue(p) {
        const queue = this.loadQueue();
        const filtered = queue.filter(q => q.matchId !== p.matchId);
        filtered.push(p);
        if (filtered.length > MAX_PENDING)
            filtered.splice(0, filtered.length - MAX_PENDING);
        this.saveQueue(filtered);
    }
    static loadQueue() {
        try {
            const raw = localStorage.getItem(PENDING_KEY);
            return raw ? JSON.parse(raw) : [];
        }
        catch (_a) {
            return [];
        }
    }
    static saveQueue(q) {
        try {
            localStorage.setItem(PENDING_KEY, JSON.stringify(q));
        }
        catch (_a) { }
    }
    static bumpContributedCount() {
        try {
            const n = this.getContributedCount() + 1;
            localStorage.setItem(CONTRIBUTED_COUNT_KEY, String(n));
        }
        catch (_a) { }
    }
}
exports.SnapshotUploader = SnapshotUploader;


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
const SnapshotUploader_1 = __webpack_require__(/*! ../services/SnapshotUploader */ "./src/services/SnapshotUploader.ts");
const consts_1 = __webpack_require__(/*! ../consts */ "./src/consts.ts");
const STORAGE_KEYS = {
    platform: 'pivottft_settings_platform',
    controllerEnabled: 'pivottft_settings_controller_enabled',
    autopinS: 'pivottft_settings_autopin_s',
    theme: 'pivottft_settings_theme',
};
function applyTheme(theme) {
    const cls = theme === 'light' ? 'theme-light' : '';
    document.body.classList.remove('theme-light');
    if (cls)
        document.body.classList.add(cls);
    try {
        overwolf.windows.getOpenWindows((res) => {
            const wins = Object.values(res || {});
            for (const w of wins) {
                if (!w || w.name === 'settings' || !w.id)
                    continue;
                overwolf.windows.sendMessage(w.id, 'theme:changed', JSON.stringify({ theme }), () => { });
            }
        });
    }
    catch (_a) { }
}
function $(id) {
    return document.getElementById(id);
}
function loadSettings() {
    const platform = $('settings-platform');
    const controllerEnabled = $('settings-controller-enabled');
    const autopinS = $('settings-autopin-s');
    const theme = $('settings-theme');
    if (platform)
        platform.value = localStorage.getItem(STORAGE_KEYS.platform) || 'euw1';
    if (controllerEnabled)
        controllerEnabled.checked = localStorage.getItem(STORAGE_KEYS.controllerEnabled) !== 'false';
    if (autopinS)
        autopinS.checked = localStorage.getItem(STORAGE_KEYS.autopinS) === 'true';
    if (theme) {
        const saved = localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
        theme.value = saved;
        applyTheme(saved);
    }
    try {
        localStorage.removeItem('pivottft_settings_api_key');
    }
    catch (_a) { }
}
function persistSettings() {
    const platform = $('settings-platform');
    const controllerEnabled = $('settings-controller-enabled');
    const autopinS = $('settings-autopin-s');
    const theme = $('settings-theme');
    if (platform)
        localStorage.setItem(STORAGE_KEYS.platform, platform.value);
    if (controllerEnabled)
        localStorage.setItem(STORAGE_KEYS.controllerEnabled, controllerEnabled.checked.toString());
    if (autopinS)
        localStorage.setItem(STORAGE_KEYS.autopinS, autopinS.checked.toString());
    if (theme) {
        localStorage.setItem(STORAGE_KEYS.theme, theme.value);
        applyTheme(theme.value);
    }
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
    ['settings-platform', 'settings-controller-enabled', 'settings-autopin-s', 'settings-theme']
        .forEach(id => { var _a; return (_a = $(id)) === null || _a === void 0 ? void 0 : _a.addEventListener('change', queue); });
}
function setupContributeToggle() {
    const checkbox = $('settings-contribute-snapshots');
    const countEl = $('settings-contributed-count');
    if (!checkbox)
        return;
    checkbox.checked = SnapshotUploader_1.SnapshotUploader.isOptedIn();
    if (countEl)
        countEl.textContent = `${SnapshotUploader_1.SnapshotUploader.getContributedCount()} games contributed.`;
    checkbox.addEventListener('change', () => {
        SnapshotUploader_1.SnapshotUploader.setOptIn(checkbox.checked);
    });
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
    setupContributeToggle();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO0lBQ3RCLGtCQUFrQixFQUFFLENBQUM7SUFDckIsWUFBWSxFQUFFLENBQUM7SUFDZixhQUFhLEVBQUUsQ0FBQztJQUNoQixvQkFBb0IsRUFBRSxDQUFDO0lBQ3ZCLG1CQUFtQixFQUFFLENBQUM7SUFDdEIscUJBQXFCLEVBQUUsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL2NvbnN0cy50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9kYXRhL3NldDE3L2NoYW1waW9ucy50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9zZXJ2aWNlcy9BdXRoU2VydmljZS50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9zZXJ2aWNlcy9MY3VTZXJ2aWNlLnRzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL3NlcnZpY2VzL1NuYXBzaG90VXBsb2FkZXIudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvc2V0dGluZ3Mvc2V0dGluZ3MudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUGl2b3RURlQg4oCUIFRGVCBHYW1lIEV2ZW50cyBGZWF0dXJlc1xyXG4vLyBHYW1lIElEIDU0MjYgPSBMZWFndWUgb2YgTGVnZW5kcyBjbGllbnQgKHdoaWNoIFRGVCBydW5zIGluc2lkZSlcclxuLy8gVEZULXNwZWNpZmljIGV2ZW50cyB1c2UgaW50ZXJuYWwgR2FtZSBJRCAyMTU3MCwgYnV0IHdlIHJlZ2lzdGVyIHdpdGggNTQyNlxyXG5leHBvcnQgY29uc3Qga0dhbWVzRmVhdHVyZXMgPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nW10+KFtcclxuICBbXHJcbiAgICA1NDI2LFxyXG4gICAgW1xyXG4gICAgICAnbWF0Y2hfaW5mbycsXHJcbiAgICAgICdib2FyZCcsXHJcbiAgICAgICdiZW5jaCcsXHJcbiAgICAgICdzdG9yZScsXHJcbiAgICAgICdjYXJvdXNlbCcsXHJcbiAgICAgICdnYW1lX2luZm8nLFxyXG4gICAgICAnYXVnbWVudHMnLFxyXG4gICAgICAnbGl2ZV9jbGllbnRfZGF0YSdcclxuICAgIF1cclxuICBdLFxyXG5dKTtcclxuXHJcbmV4cG9ydCBjb25zdCBrR2FtZUNsYXNzSWRzID0gQXJyYXkuZnJvbShrR2FtZXNGZWF0dXJlcy5rZXlzKCkpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGtXaW5kb3dOYW1lcyA9IHtcclxuICBpbkdhbWU6ICdpbl9nYW1lJyxcclxuICBkZXNrdG9wOiAnZGVza3RvcCcsXHJcbiAgc2V0dGluZ3M6ICdzZXR0aW5ncycsXHJcbiAgaW5nYW1lQ29udHJvbGxlcjogJ2luZ2FtZV9jb250cm9sbGVyJyxcclxuICBtYXRjaHVwczogJ21hdGNodXBzJyxcclxuICBsb2dpbjogJ2xvZ2luJyxcclxuICBhZG1pbjogJ2FkbWluJyxcclxuICBoZWFkbGluZXI6ICdoZWFkbGluZXInLFxyXG4gIHJlcGxheTogJ3JlcGxheScsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qga0hvdGtleXMgPSB7XHJcbiAgdG9nZ2xlOiAncGl2b3R0ZnRfc2hvd2hpZGUnXHJcbn07XHJcblxyXG4vLyBURlQgR2FtZSBJRCBmb3IgZXZlbnQgcmVnaXN0cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrVEZUQ2xhc3NJZCA9IDU0MjY7XHJcblxyXG4vLyBSaW90IEFQSSBDb25maWd1cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrUmlvdEFwaUNvbmZpZyA9IHtcclxuICBhcGlLZXk6ICcnLFxyXG4gIHJlZ2lvbjogJ2V1cm9wZScgYXMgY29uc3QsICAgICAgIC8vIGFtZXJpY2FzIHwgZXVyb3BlIHwgYXNpYSAoYWNjb3VudC12MSwgbWF0Y2gtdjEpXHJcbiAgcGxhdGZvcm06ICdldW4xJywgICAgICAgICAgICAgICAgLy8gZXV3MSwgZXVuMSwgbmExLCBrciwgLi4uIChzdW1tb25lci9sZWFndWUpXHJcbn07XHJcblxyXG4vLyBCYWNrZW5kIGJhc2UgVVJMLiBJbiBwcm9kdWN0aW9uIHJvdXRlcyB0aHJvdWdoIENsb3VkZmxhcmUgV29ya2VyIGF0XHJcbi8vIGFwaS5waXZvdHRmdC5jb20gKFJpb3QgQVBJIHByb3h5ICsgYXV0aCArIGNvbXBzIGJhY2tlbmQpLiBPdmVycmlkZSB0b1xyXG4vLyBodHRwOi8vMTI3LjAuMC4xOjg3ODcgZHVyaW5nIGxvY2FsIGB3cmFuZ2xlciBkZXZgIGRldmVsb3BtZW50LlxyXG5leHBvcnQgY29uc3Qga1Jpb3RBcGlCYXNlVXJsID0gJ2h0dHBzOi8vYXBpLnBpdm90dGZ0LmNvbSc7XHJcblxyXG4vLyBDdXJyZW50IFRGVCBpbi1zZXQgcGF0Y2ggKyBzZXQgbnVtYmVyLiBCdW1wIHRoZXNlIHRvZ2V0aGVyIHdpdGggdGhlXHJcbi8vIGBQQVRDSEVTYCBhcnJheXMgaW4gTGl2ZU1ldGFSZW5kZXJlci50cyArIFRyZW5kc1JlbmRlcmVyLnRzIGV2ZXJ5IHRpbWVcclxuLy8gYSBuZXcgVEZUIHBhdGNoIHNoaXBzLiBVc2VkIGJ5IFNuYXBzaG90VXBsb2FkZXIgc28gdXBsb2FkZWQgc25hcHNob3RzXHJcbi8vIGxhbmQgaW4gdGhlIHJpZ2h0IHNsaWNlIHdpdGhvdXQgZGVwZW5kaW5nIG9uIFJpb3QncyBgZ2FtZV92ZXJzaW9uYFxyXG4vLyBzdHJpbmcgcGFyc2luZy5cclxuZXhwb3J0IGNvbnN0IGtDdXJyZW50VGZ0UGF0Y2ggPSAnMTcuMyc7XHJcbmV4cG9ydCBjb25zdCBrQ3VycmVudFRmdFNldE51bWJlciA9IDE3O1xyXG5cclxuXHJcbi8vIFBsYXRmb3JtIOKGkiByZWdpb25hbCByb3V0aW5nIG1hcCAoZm9yIGFjY291bnQvbWF0Y2ggZW5kcG9pbnRzKVxyXG5leHBvcnQgY29uc3Qga1BsYXRmb3JtVG9SZWdpb246IFJlY29yZDxzdHJpbmcsICdhbWVyaWNhcycgfCAnZXVyb3BlJyB8ICdhc2lhJz4gPSB7XHJcbiAgJ2V1dzEnOiAnZXVyb3BlJywgJ2V1bjEnOiAnZXVyb3BlJywgJ3RyMSc6ICdldXJvcGUnLCAncnUnOiAnZXVyb3BlJyxcclxuICAnbmExJzogJ2FtZXJpY2FzJywgJ2JyMSc6ICdhbWVyaWNhcycsICdsYTEnOiAnYW1lcmljYXMnLCAnbGEyJzogJ2FtZXJpY2FzJyxcclxuICAna3InOiAnYXNpYScsICdqcDEnOiAnYXNpYScsICdvYzEnOiAnYXNpYScsICdwaDInOiAnYXNpYScsXHJcbiAgJ3NnMic6ICdhc2lhJywgJ3RoMic6ICdhc2lhJywgJ3R3Mic6ICdhc2lhJywgJ3ZuMic6ICdhc2lhJyxcclxufTtcclxuIiwiLy8gUGl2b3RURlQgLSBTZXQgMTcgY2hhbXBpb25zLiBBdXRvLWdlbmVyYXRlZCBmcm9tIENvbW11bml0eURyYWdvbiAoY2RyYWdvbi10ZnQuanNvbikuXHJcbi8vIFRvIHJlZ2VuZXJhdGU6IHJ1biB0aGUgbG9jYWwgZ2VuZXJhdGVfY2hhbXBpb25zLnB5IHNjcmlwdC5cclxuLy8gU291cmNlOiBodHRwczovL3Jhdy5jb21tdW5pdHlkcmFnb24ub3JnL2xhdGVzdC9jZHJhZ29uL3RmdC9lbl91cy5qc29uXHJcblxyXG5pbXBvcnQgeyBDaGFtcGlvbiB9IGZyb20gJy4uLy4uL21vZGVscy90eXBlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgY2hhbXBpb25zOiBDaGFtcGlvbltdID0gW1xyXG4gIC8vID09PT09IDEtQ29zdCAoMTQpID09PT09XHJcbiAgeyBpZDogJ1RGVDE3X0FhdHJveCcsIG5hbWU6IFwiQWF0cm94XCIsIGNvc3Q6IDEsIHRyYWl0czogWydOLk8uVi5BLicsICdCYXN0aW9uJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQWF0cm94L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0FhdHJveF9zcGxhc2hfdGlsZV8zMC5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19CcmlhcicsIG5hbWU6IFwiQnJpYXJcIiwgY29zdDogMSwgdHJhaXRzOiBbJ0FuaW1hJywgJ1ByaW1vcmRpYW4nLCAnUm9ndWUnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Ccmlhci9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Ccmlhcl9zcGxhc2hfdGlsZV8xMC5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19DYWl0bHluJywgbmFtZTogXCJDYWl0bHluXCIsIGNvc3Q6IDEsIHRyYWl0czogWydOLk8uVi5BLicsICdGYXRld2VhdmVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQ2FpdGx5bi9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19DYWl0bHluX3NwbGFzaF90aWxlXzQ4LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0Nob2dhdGgnLCBuYW1lOiBcIkNobydHYXRoXCIsIGNvc3Q6IDEsIHRyYWl0czogWydEYXJrIFN0YXInLCAnQnJhd2xlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0Nob2dhdGgvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfQ2hvZ2F0aF9zcGxhc2hfdGlsZV83LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0V6cmVhbCcsIG5hbWU6IFwiRXpyZWFsXCIsIGNvc3Q6IDEsIHRyYWl0czogWydUaW1lYnJlYWtlcicsICdTbmlwZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19FenJlYWwvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfRXpyZWFsX3NwbGFzaF90aWxlXzUuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfTGVvbmEnLCBuYW1lOiBcIkxlb25hXCIsIGNvc3Q6IDEsIHRyYWl0czogWydBcmJpdGVyJywgJ1Zhbmd1YXJkJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTGVvbmEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTGVvbmFfc3BsYXNoX3RpbGVfNjQuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfTGlzc2FuZHJhJywgbmFtZTogXCJMaXNzYW5kcmFcIiwgY29zdDogMSwgdHJhaXRzOiBbJ0RhcmsgU3RhcicsICdTaGVwaGVyZCcsICdSZXBsaWNhdG9yJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTGlzc2FuZHJhL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0xpc3NhbmRyYV9zcGxhc2hfdGlsZV8xMi5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19OYXN1cycsIG5hbWU6IFwiTmFzdXNcIiwgY29zdDogMSwgdHJhaXRzOiBbJ1NwYWNlIEdyb292ZScsICdWYW5ndWFyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X05hc3VzL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X05hc3VzX3NwbGFzaF90aWxlXzI1LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1BvcHB5JywgbmFtZTogXCJQb3BweVwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnTWVlcGxlJywgJ0Jhc3Rpb24nXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Qb3BweS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Qb3BweV9zcGxhc2hfdGlsZV8xNi5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19SZWtTYWknLCBuYW1lOiBcIlJlaydTYWlcIiwgY29zdDogMSwgdHJhaXRzOiBbJ1ByaW1vcmRpYW4nLCAnQnJhd2xlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1Jla1NhaS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19SZWtTYWlfc3BsYXNoX3RpbGVfMjYuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfVGFsb24nLCBuYW1lOiBcIlRhbG9uXCIsIGNvc3Q6IDEsIHRyYWl0czogWydTdGFyZ2F6ZXInLCAnUm9ndWUnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19UYWxvbi9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19UYWxvbl9zcGxhc2hfdGlsZV8zOS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19UZWVtbycsIG5hbWU6IFwiVGVlbW9cIiwgY29zdDogMSwgdHJhaXRzOiBbJ1NwYWNlIEdyb292ZScsICdTaGVwaGVyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1RlZW1vL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1RlZW1vX3NwbGFzaF90aWxlXzQ3LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1R3aXN0ZWRGYXRlJywgbmFtZTogXCJUd2lzdGVkIEZhdGVcIiwgY29zdDogMSwgdHJhaXRzOiBbJ1N0YXJnYXplcicsICdGYXRld2VhdmVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfVHdpc3RlZEZhdGUvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfVHdpc3RlZEZhdGVfc3BsYXNoX3RpbGVfNDUuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfVmVpZ2FyJywgbmFtZTogXCJWZWlnYXJcIiwgY29zdDogMSwgdHJhaXRzOiBbJ01lZXBsZScsICdSZXBsaWNhdG9yJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfVmVpZ2FyL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1ZlaWdhcl9zcGxhc2hfdGlsZV8zMi5URlRfU2V0MTcucG5nJyB9LFxyXG5cclxuICAvLyA9PT09PSAyLUNvc3QgKDEzKSA9PT09PVxyXG4gIHsgaWQ6ICdURlQxN19Ba2FsaScsIG5hbWU6IFwiQWthbGlcIiwgY29zdDogMiwgdHJhaXRzOiBbJ04uTy5WLkEuJywgJ01hcmF1ZGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQWthbGkvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfQWthbGlfc3BsYXNoX3RpbGVfNjguVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfQmVsdmV0aCcsIG5hbWU6IFwiQmVsJ1ZldGhcIiwgY29zdDogMiwgdHJhaXRzOiBbJ1ByaW1vcmRpYW4nLCAnQ2hhbGxlbmdlcicsICdNYXJhdWRlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0JlbHZldGgvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfQmVsdmV0aF9zcGxhc2hfdGlsZV8xOS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19HbmFyJywgbmFtZTogXCJHbmFyXCIsIGNvc3Q6IDIsIHRyYWl0czogWydNZWVwbGUnLCAnU25pcGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfR25hci9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19HbmFyX3NwbGFzaF90aWxlXzE1LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0dyYWdhcycsIG5hbWU6IFwiR3JhZ2FzXCIsIGNvc3Q6IDIsIHRyYWl0czogWydQc2lvbmljJywgJ0JyYXdsZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19HcmFnYXMvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfR3JhZ2FzX3NwbGFzaF90aWxlXzEwLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0d3ZW4nLCBuYW1lOiBcIkd3ZW5cIiwgY29zdDogMiwgdHJhaXRzOiBbJ1NwYWNlIEdyb292ZScsICdSb2d1ZSddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0d3ZW4vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfR3dlbl9zcGxhc2hfdGlsZV8xLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0l2ZXJuTWluaW9uJywgbmFtZTogXCJNZWVwc2llXCIsIGNvc3Q6IDIsIHRyYWl0czogWydNZWVwbGUnLCAnU2hlcGhlcmQnLCAnVm95YWdlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0l2ZXJuTWluaW9uL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0l2ZXJuTWluaW9uX3NwbGFzaF90aWxlXzI3LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0pheCcsIG5hbWU6IFwiSmF4XCIsIGNvc3Q6IDIsIHRyYWl0czogWydTdGFyZ2F6ZXInLCAnQmFzdGlvbiddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0pheC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19KYXhfTW9iaWxlLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0ppbngnLCBuYW1lOiBcIkppbnhcIiwgY29zdDogMiwgdHJhaXRzOiBbJ0FuaW1hJywgJ0NoYWxsZW5nZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19KaW54L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0ppbnhfc3BsYXNoX3RpbGVfMzguVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfTWlsaW8nLCBuYW1lOiBcIk1pbGlvXCIsIGNvc3Q6IDIsIHRyYWl0czogWydUaW1lYnJlYWtlcicsICdGYXRld2VhdmVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTWlsaW8vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTWlsaW9fc3BsYXNoX3RpbGVfMC5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19Nb3JkZWthaXNlcicsIG5hbWU6IFwiTW9yZGVrYWlzZXJcIiwgY29zdDogMiwgdHJhaXRzOiBbJ0RhcmsgU3RhcicsICdDb25kdWl0JywgJ1Zhbmd1YXJkJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTW9yZGVrYWlzZXIvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTW9yZGVrYWlzZXJfc3BsYXNoX3RpbGVfNi5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19QYW50aGVvbicsIG5hbWU6IFwiUGFudGhlb25cIiwgY29zdDogMiwgdHJhaXRzOiBbJ1RpbWVicmVha2VyJywgJ0JyYXdsZXInLCAnUmVwbGljYXRvciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1BhbnRoZW9uL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1BhbnRoZW9uX3NwbGFzaF90aWxlXzE2LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1B5a2UnLCBuYW1lOiBcIlB5a2VcIiwgY29zdDogMiwgdHJhaXRzOiBbJ1BzaW9uaWMnLCAnVm95YWdlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1B5a2UvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfUHlrZV9zcGxhc2hfdGlsZV8yNS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19ab2UnLCBuYW1lOiBcIlpvZVwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnQXJiaXRlcicsICdDb25kdWl0J10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfWm9lL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1pvZV9zcGxhc2hfdGlsZV80My5URlRfU2V0MTcucG5nJyB9LFxyXG5cclxuICAvLyA9PT09PSAzLUNvc3QgKDEzKSA9PT09PVxyXG4gIHsgaWQ6ICdURlQxN19BdXJvcmEnLCBuYW1lOiBcIkF1cm9yYVwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnQW5pbWEnLCAnVm95YWdlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0F1cm9yYS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19BdXJvcmFfc3BsYXNoX3RpbGVfMS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19EaWFuYScsIG5hbWU6IFwiRGlhbmFcIiwgY29zdDogMywgdHJhaXRzOiBbJ0FyYml0ZXInLCAnQ2hhbGxlbmdlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0RpYW5hL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0RpYW5hU3BsYXNoX01vYmlsZS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19GaXp6JywgbmFtZTogXCJGaXp6XCIsIGNvc3Q6IDMsIHRyYWl0czogWydNZWVwbGUnLCAnUm9ndWUnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19GaXp6L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0Zpenpfc3BsYXNoX3RpbGVfMjYuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfSWxsYW9pJywgbmFtZTogXCJJbGxhb2lcIiwgY29zdDogMywgdHJhaXRzOiBbJ0FuaW1hJywgJ1Zhbmd1YXJkJywgJ1NoZXBoZXJkJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfSWxsYW9pL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0lsbGFvaV9zcGxhc2hfdGlsZV8yNy5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19LYWlzYScsIG5hbWU6IFwiS2FpJ1NhXCIsIGNvc3Q6IDMsIHRyYWl0czogWydEYXJrIFN0YXInLCAnUm9ndWUnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19LYWlzYS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19LYWlzYV9zcGxhc2hfdGlsZV82OS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19MdWx1JywgbmFtZTogXCJMdWx1XCIsIGNvc3Q6IDMsIHRyYWl0czogWydTdGFyZ2F6ZXInLCAnUmVwbGljYXRvciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0x1bHUvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTHVsdV9zcGxhc2hfdGlsZV8xNC5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19NYW9rYWknLCBuYW1lOiBcIk1hb2thaVwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnTi5PLlYuQS4nLCAnQnJhd2xlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X01hb2thaS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19NYW9rYWlfc3BsYXNoX3RpbGVfMzMuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfTWlzc0ZvcnR1bmUnLCBuYW1lOiBcIk1pc3MgRm9ydHVuZVwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnR3VuIEdvZGRlc3MnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19NaXNzRm9ydHVuZS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19NaXNzRm9ydHVuZV9zcGxhc2hfdGlsZV8xNi5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19Pcm5uJywgbmFtZTogXCJPcm5uXCIsIGNvc3Q6IDMsIHRyYWl0czogWydTcGFjZSBHcm9vdmUnLCAnQmFzdGlvbiddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X09ybm4vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfT3Jubl9zcGxhc2hfdGlsZV8xMS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19SaGFhc3QnLCBuYW1lOiBcIlJoYWFzdFwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnUmVkZWVtZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19SaGFhc3QvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfS2F5blNwbGFzaF9UaWxlLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1NhbWlyYScsIG5hbWU6IFwiU2FtaXJhXCIsIGNvc3Q6IDMsIHRyYWl0czogWydTcGFjZSBHcm9vdmUnLCAnU25pcGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfU2FtaXJhL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1NhbWlyYV9zcGxhc2hfdGlsZV8xMC5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19VcmdvdCcsIG5hbWU6IFwiVXJnb3RcIiwgY29zdDogMywgdHJhaXRzOiBbJ01lY2hhJywgJ0JyYXdsZXInLCAnTWFyYXVkZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19VcmdvdC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19VcmdvdF9zcGxhc2hfdGlsZV8zMi5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19WaWt0b3InLCBuYW1lOiBcIlZpa3RvclwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnUHNpb25pYycsICdDb25kdWl0J10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfVmlrdG9yL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1Zpa3Rvcl9zcGxhc2hfdGlsZV81LlRGVF9TZXQxNy5wbmcnIH0sXHJcblxyXG4gIC8vID09PT09IDQtQ29zdCAoMTQpID09PT09XHJcbiAgeyBpZDogJ1RGVDE3X0F1cmVsaW9uU29sJywgbmFtZTogXCJBdXJlbGlvbiBTb2xcIiwgY29zdDogNCwgdHJhaXRzOiBbJ01lY2hhJywgJ0NvbmR1aXQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19BdXJlbGlvblNvbC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19BdXJlbGlvblNvbF9zcGxhc2hfdGlsZV8yLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0NvcmtpJywgbmFtZTogXCJDb3JraVwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnTWVlcGxlJywgJ0ZhdGV3ZWF2ZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Db3JraS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Db3JraV9zcGxhc2hfdGlsZV8yNi5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19HYWxpbycsIG5hbWU6IFwiVGhlIE1pZ2h0eSBNZWNoXCIsIGNvc3Q6IDQsIHRyYWl0czogWydNZWNoYScsICdWb3lhZ2VyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfR2FsaW8vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfR2FsaW9fTW9iaWxlLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0thcm1hJywgbmFtZTogXCJLYXJtYVwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnRGFyayBTdGFyJywgJ1ZveWFnZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19LYXJtYS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19LYXJtYV9zcGxhc2hfdGlsZV84LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0tpbmRyZWQnLCBuYW1lOiBcIktpbmRyZWRcIiwgY29zdDogNCwgdHJhaXRzOiBbJ04uTy5WLkEuJywgJ0NoYWxsZW5nZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19LaW5kcmVkL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0tpbmRyZWRfc3BsYXNoX3RpbGVfMjMuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfTGVibGFuYycsIG5hbWU6IFwiTGVCbGFuY1wiLCBjb3N0OiA0LCB0cmFpdHM6IFsnQXJiaXRlcicsICdTaGVwaGVyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0xlYmxhbmMvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTGVibGFuY19zcGxhc2hfdGlsZV8yOS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19NYXN0ZXJZaScsIG5hbWU6IFwiTWFzdGVyIFlpXCIsIGNvc3Q6IDQsIHRyYWl0czogWydQc2lvbmljJywgJ01hcmF1ZGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTWFzdGVyWWkvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTWFzdGVyWWlfc3BsYXNoX3RpbGVfMzMuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfTW9yZ2FuYScsIG5hbWU6IFwiTW9yZ2FuYVwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnRGFyayBMYWR5J10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTW9yZ2FuYS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Nb3JnYW5hX3NwbGFzaF90aWxlXzUwLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X05hbWknLCBuYW1lOiBcIk5hbWlcIiwgY29zdDogNCwgdHJhaXRzOiBbJ1NwYWNlIEdyb292ZScsICdSZXBsaWNhdG9yJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTmFtaS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19OYW1pX3NwbGFzaF90aWxlXzQxLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X051bnUnLCBuYW1lOiBcIk51bnUgJiBXaWxsdW1wXCIsIGNvc3Q6IDQsIHRyYWl0czogWydTdGFyZ2F6ZXInLCAnVmFuZ3VhcmQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19OdW51L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X051bnVfc3BsYXNoX3RpbGVfMzUuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfUmFtbXVzJywgbmFtZTogXCJSYW1tdXNcIiwgY29zdDogNCwgdHJhaXRzOiBbJ01lZXBsZScsICdCYXN0aW9uJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfUmFtbXVzL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1JhbW11c19zcGxhc2hfdGlsZV8xNy5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19SaXZlbicsIG5hbWU6IFwiUml2ZW5cIiwgY29zdDogNCwgdHJhaXRzOiBbJ1RpbWVicmVha2VyJywgJ1JvZ3VlJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfUml2ZW4vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfUml2ZW5fc3BsYXNoX3RpbGVfMTguVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfVGFobUtlbmNoJywgbmFtZTogXCJUYWhtIEtlbmNoXCIsIGNvc3Q6IDQsIHRyYWl0czogWydPcmFjbGUnLCAnQnJhd2xlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1RhaG1LZW5jaC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19UYWhtS2VuY2hfc3BsYXNoX3RpbGVfMTEuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfWGF5YWgnLCBuYW1lOiBcIlhheWFoXCIsIGNvc3Q6IDQsIHRyYWl0czogWydTdGFyZ2F6ZXInLCAnU25pcGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfWGF5YWgvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfWGF5YWhfc3BsYXNoX3RpbGVfMS5URlRfU2V0MTcucG5nJyB9LFxyXG5cclxuICAvLyA9PT09PSA1LUNvc3QgKDkpID09PT09XHJcbiAgeyBpZDogJ1RGVDE3X0JhcmQnLCBuYW1lOiBcIkJhcmRcIiwgY29zdDogNSwgdHJhaXRzOiBbJ01lZXBsZScsICdDb25kdWl0J10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQmFyZC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19CYXJkX3NwbGFzaF90aWxlXzguVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfQmxpdHpjcmFuaycsIG5hbWU6IFwiQmxpdHpjcmFua1wiLCBjb3N0OiA1LCB0cmFpdHM6IFsnUGFydHkgQW5pbWFsJywgJ1NwYWNlIEdyb292ZScsICdWYW5ndWFyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0JsaXR6Y3JhbmsvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfQmxpdHpjcmFua19zcGxhc2hfdGlsZV82NS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19GaW9yYScsIG5hbWU6IFwiRmlvcmFcIiwgY29zdDogNSwgdHJhaXRzOiBbJ0RpdmluZSBEdWVsaXN0JywgJ0FuaW1hJywgJ01hcmF1ZGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfRmlvcmEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfRmlvcmFfc3BsYXNoX3RpbGVfNTEuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfR3JhdmVzJywgbmFtZTogXCJHcmF2ZXNcIiwgY29zdDogNSwgdHJhaXRzOiBbJ0ZhY3RvcnkgTmV3J10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfR3JhdmVzL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0dyYXZlc19zcGxhc2hfdGlsZV8xOC5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19KaGluJywgbmFtZTogXCJKaGluXCIsIGNvc3Q6IDUsIHRyYWl0czogWydEYXJrIFN0YXInLCAnRXJhZGljYXRvcicsICdTbmlwZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19KaGluL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0poaW5fc3BsYXNoX3RpbGVfMzcuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfU2hlbicsIG5hbWU6IFwiU2hlblwiLCBjb3N0OiA1LCB0cmFpdHM6IFsnQnVsd2FyaycsICdCYXN0aW9uJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfU2hlbi9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19zaGVuX3NwbGFzaF90aWxlXzQ5LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1NvbmEnLCBuYW1lOiBcIlNvbmFcIiwgY29zdDogNSwgdHJhaXRzOiBbJ0NvbW1hbmRlcicsICdQc2lvbmljJywgJ1NoZXBoZXJkJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfU29uYS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Tb25hX3NwbGFzaF90aWxlXzE3LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1ZleCcsIG5hbWU6IFwiVmV4XCIsIGNvc3Q6IDUsIHRyYWl0czogWydEb29tZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19WZXgvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfdmV4X3NwbGFzaF90aWxlXzEwLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1plZCcsIG5hbWU6IFwiWmVkXCIsIGNvc3Q6IDUsIHRyYWl0czogWydHYWxheHkgSHVudGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfWmVkL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1plZF9zcGxhc2hfdGlsZV82OC5URlRfU2V0MTcucG5nJyB9LFxyXG5dO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNoYW1waW9uTWFwID0gbmV3IE1hcChjaGFtcGlvbnMubWFwKGMgPT4gW2MuaWQsIGNdKSk7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Q2hhbXBpb25zQnlDb3N0ID0gKGNvc3Q6IG51bWJlcikgPT5cclxuICBjaGFtcGlvbnMuZmlsdGVyKGMgPT4gYy5jb3N0ID09PSBjb3N0KTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDaGFtcGlvbnNCeVRyYWl0ID0gKHRyYWl0OiBzdHJpbmcpID0+XHJcbiAgY2hhbXBpb25zLmZpbHRlcihjID0+IGMudHJhaXRzLmluY2x1ZGVzKHRyYWl0KSk7XHJcbiIsIi8vIEF1dGhTZXJ2aWNlIOKAlCB0aGluIGNsaWVudCBmb3IgdGhlIENsb3VkZmxhcmUgV29ya2VyIC9hdXRoIGVuZHBvaW50cy5cbi8vXG4vLyBUb2tlbiBpcyBrZXB0IGluIGxvY2FsU3RvcmFnZS4gQ29tcG9uZW50cyB0aGF0IGNhcmUgYWJvdXQgbG9naW4gc3RhdGUgY2FuXG4vLyBlaXRoZXIgY2FsbCBnZXRDdXJyZW50VXNlcigpIG9uY2Ugb24gbW91bnQsIG9yIHN1YnNjcmliZSB2aWEgb25DaGFuZ2UoKS5cblxuaW1wb3J0IHsga1Jpb3RBcGlCYXNlVXJsIH0gZnJvbSAnLi4vY29uc3RzJztcblxuZXhwb3J0IHR5cGUgVXNlclJvbGUgPSAndXNlcicgfCAnbW9kZXJhdG9yJyB8ICdhZG1pbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XG4gIGlkOiBudW1iZXI7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHJvbGU6IFVzZXJSb2xlO1xuICBkaXNwbGF5TmFtZTogc3RyaW5nIHwgbnVsbDtcbn1cblxuaW50ZXJmYWNlIEF1dGhSZXNwb25zZSB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIHVzZXI6IFVzZXI7XG59XG5cbmNvbnN0IFNUT1JBR0VfVE9LRU4gPSAncGl2b3R0ZnRfYXV0aF90b2tlbic7XG5jb25zdCBTVE9SQUdFX1VTRVIgPSAncGl2b3R0ZnRfYXV0aF91c2VyJztcblxudHlwZSBMaXN0ZW5lciA9ICh1c2VyOiBVc2VyIHwgbnVsbCkgPT4gdm9pZDtcbmNvbnN0IGxpc3RlbmVycyA9IG5ldyBTZXQ8TGlzdGVuZXI+KCk7XG5cbmZ1bmN0aW9uIGVtaXQoKTogdm9pZCB7XG4gIGNvbnN0IHVzZXIgPSBnZXRTdG9yZWRVc2VyKCk7XG4gIGxpc3RlbmVycy5mb3JFYWNoKGwgPT4ge1xuICAgIHRyeSB7IGwodXNlcik7IH0gY2F0Y2ggKGUpIHsgY29uc29sZS5lcnJvcignW0F1dGhTZXJ2aWNlXSBsaXN0ZW5lciB0aHJldzonLCBlKTsgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRva2VuKCk6IHN0cmluZyB8IG51bGwge1xuICB0cnkgeyByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9UT0tFTik7IH0gY2F0Y2ggeyByZXR1cm4gbnVsbDsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RvcmVkVXNlcigpOiBVc2VyIHwgbnVsbCB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmF3ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9VU0VSKTtcbiAgICByZXR1cm4gcmF3ID8gSlNPTi5wYXJzZShyYXcpIGFzIFVzZXIgOiBudWxsO1xuICB9IGNhdGNoIHsgcmV0dXJuIG51bGw7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcbiAgcmV0dXJuICEhZ2V0VG9rZW4oKSAmJiAhIWdldFN0b3JlZFVzZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWRtaW4oKTogYm9vbGVhbiB7XG4gIGNvbnN0IHUgPSBnZXRTdG9yZWRVc2VyKCk7XG4gIHJldHVybiAhIXUgJiYgdS5yb2xlID09PSAnYWRtaW4nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQXRMZWFzdChyb2xlOiBVc2VyUm9sZSk6IGJvb2xlYW4ge1xuICBjb25zdCB1ID0gZ2V0U3RvcmVkVXNlcigpO1xuICBpZiAoIXUpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgcmFuazogUmVjb3JkPFVzZXJSb2xlLCBudW1iZXI+ID0geyB1c2VyOiAxLCBtb2RlcmF0b3I6IDIsIGFkbWluOiAzIH07XG4gIHJldHVybiByYW5rW3Uucm9sZV0gPj0gcmFua1tyb2xlXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uQ2hhbmdlKGxpc3RlbmVyOiBMaXN0ZW5lcik6ICgpID0+IHZvaWQge1xuICBsaXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcbiAgcmV0dXJuICgpID0+IGxpc3RlbmVycy5kZWxldGUobGlzdGVuZXIpO1xufVxuXG5mdW5jdGlvbiBzZXRTZXNzaW9uKHJlczogQXV0aFJlc3BvbnNlKTogdm9pZCB7XG4gIHRyeSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9UT0tFTiwgcmVzLnRva2VuKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX1VTRVIsIEpTT04uc3RyaW5naWZ5KHJlcy51c2VyKSk7XG4gIH0gY2F0Y2ggeyAvKiBxdW90YSBldGMg4oCUIHNpbGVudCAqLyB9XG4gIGVtaXQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyU2Vzc2lvbigpOiB2b2lkIHtcbiAgdHJ5IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShTVE9SQUdFX1RPS0VOKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShTVE9SQUdFX1VTRVIpO1xuICB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbiAgZW1pdCgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwb3N0SnNvbjxUPihwYXRoOiBzdHJpbmcsIGJvZHk6IHVua25vd24pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3QgdXJsID0gYCR7a1Jpb3RBcGlCYXNlVXJsfSR7cGF0aH1gO1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgfSk7XG4gIGxldCBwYXlsb2FkOiBhbnk7XG4gIHRyeSB7IHBheWxvYWQgPSBhd2FpdCByZXMuanNvbigpOyB9IGNhdGNoIHsgcGF5bG9hZCA9IHsgZXJyb3I6IHJlcy5zdGF0dXNUZXh0IH07IH1cbiAgaWYgKCFyZXMub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZD8uZXJyb3IgfHwgYEhUVFAgJHtyZXMuc3RhdHVzfWApO1xuICB9XG4gIHJldHVybiBwYXlsb2FkIGFzIFQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEpzb248VD4ocGF0aDogc3RyaW5nLCB0b2tlbj86IHN0cmluZyB8IG51bGwpOiBQcm9taXNlPFQ+IHtcbiAgY29uc3QgdXJsID0gYCR7a1Jpb3RBcGlCYXNlVXJsfSR7cGF0aH1gO1xuICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gIGlmICh0b2tlbikgaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke3Rva2VufWA7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwgeyBoZWFkZXJzIH0pO1xuICBsZXQgcGF5bG9hZDogYW55O1xuICB0cnkgeyBwYXlsb2FkID0gYXdhaXQgcmVzLmpzb24oKTsgfSBjYXRjaCB7IHBheWxvYWQgPSB7IGVycm9yOiByZXMuc3RhdHVzVGV4dCB9OyB9XG4gIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZD8uZXJyb3IgfHwgYEhUVFAgJHtyZXMuc3RhdHVzfWApO1xuICByZXR1cm4gcGF5bG9hZCBhcyBUO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXIoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgZGlzcGxheU5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcG9zdEpzb248QXV0aFJlc3BvbnNlPignL2F1dGgvcmVnaXN0ZXInLCB7IGVtYWlsLCBwYXNzd29yZCwgZGlzcGxheU5hbWUgfSk7XG4gIHNldFNlc3Npb24ocmVzKTtcbiAgcmV0dXJuIHJlcy51c2VyO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9naW4oZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8VXNlcj4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBwb3N0SnNvbjxBdXRoUmVzcG9uc2U+KCcvYXV0aC9sb2dpbicsIHsgZW1haWwsIHBhc3N3b3JkIH0pO1xuICBzZXRTZXNzaW9uKHJlcyk7XG4gIHJldHVybiByZXMudXNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ291dCgpOiB2b2lkIHtcbiAgY2xlYXJTZXNzaW9uKCk7XG59XG5cbi8qKlxuICogUmVmcmVzaCB1c2VyIGluZm8gZnJvbSBiYWNrZW5kLiBVc2VmdWwgYWZ0ZXIgcm9sZSBjaGFuZ2VzIG9yIHRvIGNvbmZpcm1cbiAqIHRva2VuIHZhbGlkaXR5LiBDbGVhcnMgc2Vzc2lvbiBvbiA0MDEuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWZyZXNoTWUoKTogUHJvbWlzZTxVc2VyIHwgbnVsbD4ge1xuICBjb25zdCB0b2tlbiA9IGdldFRva2VuKCk7XG4gIGlmICghdG9rZW4pIHJldHVybiBudWxsO1xuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGdldEpzb248eyB1c2VyOiBVc2VyIH0+KCcvYXV0aC9tZScsIHRva2VuKTtcbiAgICB0cnkgeyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX1VTRVIsIEpTT04uc3RyaW5naWZ5KHJlcy51c2VyKSk7IH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxuICAgIGVtaXQoKTtcbiAgICByZXR1cm4gcmVzLnVzZXI7XG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIGlmICgoZS5tZXNzYWdlIHx8ICcnKS5pbmNsdWRlcygnSFRUUCA0MDEnKSkgY2xlYXJTZXNzaW9uKCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgZm9yIGFkbWluLW9ubHkgZmV0Y2hlcyDigJQgYXV0b21hdGljYWxseSBhdHRhY2hlcyBCZWFyZXIgdG9rZW4uXG4gKiBUaHJvd3MgaWYgbm90IGxvZ2dlZCBpbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkbWluRmV0Y2g8VD4ocGF0aDogc3RyaW5nLCBpbml0OiBSZXF1ZXN0SW5pdCA9IHt9KTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgaWYgKCF0b2tlbikgdGhyb3cgbmV3IEVycm9yKCdOb3QgYXV0aGVudGljYXRlZCcpO1xuICBjb25zdCB1cmwgPSBgJHtrUmlvdEFwaUJhc2VVcmx9JHtwYXRofWA7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgIC4uLmluaXQsXG4gICAgaGVhZGVyczoge1xuICAgICAgLi4uKGluaXQuaGVhZGVycyB8fCB7fSksXG4gICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgLi4uKGluaXQuYm9keSA/IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9IDoge30pLFxuICAgIH0sXG4gIH0pO1xuICBsZXQgcGF5bG9hZDogYW55O1xuICB0cnkgeyBwYXlsb2FkID0gYXdhaXQgcmVzLmpzb24oKTsgfSBjYXRjaCB7IHBheWxvYWQgPSB7IGVycm9yOiByZXMuc3RhdHVzVGV4dCB9OyB9XG4gIGlmICghcmVzLm9rKSB7XG4gICAgaWYgKHJlcy5zdGF0dXMgPT09IDQwMSkgY2xlYXJTZXNzaW9uKCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQ/LmVycm9yIHx8IGBIVFRQICR7cmVzLnN0YXR1c31gKTtcbiAgfVxuICByZXR1cm4gcGF5bG9hZCBhcyBUO1xufVxuIiwiLy8gTENVIChMZWFndWUgQ2xpZW50IFVwZGF0ZSBBUEkpIGJyaWRnZS5cbi8vXG4vLyBEaXNjb3Zlcnk6IFJpb3QgQ2xpZW50IHdyaXRlcyBhIGBsb2NrZmlsZWAgaW4gdGhlIExlYWd1ZSBpbnN0YWxsIGZvbGRlclxuLy8gd2hlbiBMQ1UgaXMgcnVubmluZy4gRm9ybWF0OiBgTGVhZ3VlQ2xpZW50OjxwaWQ+Ojxwb3J0Pjo8cGFzc3dvcmQ+Omh0dHBzYC5cbi8vIFdlIGdldCB0aGUgaW5zdGFsbCBmb2xkZXIgZnJvbSBvdmVyd29sZi5nYW1lcy5nZXRSdW5uaW5nR2FtZUluZm8oKSB3aGVuXG4vLyBURlQgKGdhbWUgaWQgNTQyNikgaXMgYWN0aXZlLCB0aGVuIHJlYWQgdGhlIGxvY2tmaWxlIHZpYSBvdmVyd29sZi5pby5cbi8vXG4vLyBPbmNlIHdlIGhhdmUgcG9ydCArIHBhc3N3b3JkLCBjYWxscyBnbyB0byBodHRwczovLzEyNy4wLjAuMTo8cG9ydD4vIHdpdGhcbi8vIEhUVFAgQmFzaWMgYXV0aCAodXNlciBcInJpb3RcIiwgcGFzc3dvcmQgPSB0aGUgdG9rZW4pLiBPdmVyd29sZidzIHJlbmRlcmVyXG4vLyBydW5zIHdpdGggLS1pZ25vcmUtY2VydGlmaWNhdGUtZXJyb3JzIHNvIHRoZSBzZWxmLXNpZ25lZCBjZXJ0IGlzIGFjY2VwdGVkLlxuXG5pbXBvcnQgeyBDaGFtcGlvbiB9IGZyb20gJy4uL21vZGVscy90eXBlcyc7XG5pbXBvcnQgeyBjaGFtcGlvbk1hcCB9IGZyb20gJy4uL2RhdGEvc2V0MTcvY2hhbXBpb25zJztcblxuaW50ZXJmYWNlIExjdUNyZWRlbnRpYWxzIHtcbiAgcG9ydDogbnVtYmVyO1xuICB0b2tlbjogc3RyaW5nO1xuICBwaWQ6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIFB1c2hSZXN1bHQge1xuICBvazogYm9vbGVhbjtcbiAgcHVzaGVkOiBudW1iZXI7XG4gIGZhaWxlZDogbnVtYmVyO1xuICByZWFzb24/OiBzdHJpbmc7XG59XG5cbmNvbnN0IExPTF9HQU1FX0lEID0gNTQyNjtcbmNvbnN0IFRGVF9TVEFOREFMT05FX0lEID0gMjI4NDg7XG5cbi8vIENvbW1vbiBpbnN0YWxsIHBhdGhzIHRvIHByb2JlIHdoZW4gZ2V0UnVubmluZ0dhbWVJbmZvKCkgcmV0dXJucyBub3RoaW5nXG4vLyAoaS5lLiBMb0wgaXNuJ3QgY3VycmVudGx5IHJ1bm5pbmcgYnV0IHRoZSB1c2VyIHdhbnRzIHRvIHByZXBhcmUgYSB0ZWFtKS5cbmNvbnN0IEZBTExCQUNLX0xPTF9QQVRIUyA9IFtcbiAgJ0M6XFxcXFJpb3QgR2FtZXNcXFxcTGVhZ3VlIG9mIExlZ2VuZHNcXFxcbG9ja2ZpbGUnLFxuICAnRDpcXFxcUmlvdCBHYW1lc1xcXFxMZWFndWUgb2YgTGVnZW5kc1xcXFxsb2NrZmlsZScsXG4gICdFOlxcXFxSaW90IEdhbWVzXFxcXExlYWd1ZSBvZiBMZWdlbmRzXFxcXGxvY2tmaWxlJyxcbiAgJ0Y6XFxcXFJpb3QgR2FtZXNcXFxcTGVhZ3VlIG9mIExlZ2VuZHNcXFxcbG9ja2ZpbGUnLFxuICAnQzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxSaW90IEdhbWVzXFxcXExlYWd1ZSBvZiBMZWdlbmRzXFxcXGxvY2tmaWxlJyxcbiAgJ0M6XFxcXFByb2dyYW0gRmlsZXMgKHg4NilcXFxcUmlvdCBHYW1lc1xcXFxMZWFndWUgb2YgTGVnZW5kc1xcXFxsb2NrZmlsZScsXG5dO1xuXG5jb25zdCBSVU5OSU5HX0lORk8gPSAoKTogUHJvbWlzZTxvdmVyd29sZi5nYW1lcy5HZXRSdW5uaW5nR2FtZUluZm9SZXN1bHQ+ID0+XG4gIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gb3ZlcndvbGYuZ2FtZXMuZ2V0UnVubmluZ0dhbWVJbmZvKHJlc29sdmUpKTtcblxuY29uc3QgUkVBRF9GSUxFID0gKHBhdGg6IHN0cmluZyk6IFByb21pc2U8b3ZlcndvbGYuaW8uUmVhZEZpbGVDb250ZW50c1Jlc3VsdD4gPT5cbiAgbmV3IFByb21pc2UocmVzb2x2ZSA9PlxuICAgIG92ZXJ3b2xmLmlvLnJlYWRGaWxlQ29udGVudHMocGF0aCwgb3ZlcndvbGYuaW8uZW51bXMuZUVuY29kaW5nLlVURjgsIHJlc29sdmUpXG4gICk7XG5cbi8qKlxuICogTG9jYXRlIGFuZCBwYXJzZSB0aGUgTG9MIGxvY2tmaWxlLiBSZXR1cm5zIG51bGwgaWYgTENVIGlzbid0IHJlYWNoYWJsZVxuICogKG5vIGluc3RhbGwgZGV0ZWN0ZWQsIExDVSBub3QgcnVubmluZywgZmlsZSBtaXNzaW5nLCBldGMuKS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExjdUNyZWRlbnRpYWxzKCk6IFByb21pc2U8TGN1Q3JlZGVudGlhbHMgfCBudWxsPiB7XG4gIGNvbnN0IGNhbmRpZGF0ZVBhdGhzID0gYXdhaXQgY29sbGVjdExvY2tmaWxlUGF0aHMoKTtcbiAgZm9yIChjb25zdCBwYXRoIG9mIGNhbmRpZGF0ZVBhdGhzKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgUkVBRF9GSUxFKHBhdGgpO1xuICAgIGlmICghcmVzPy5zdWNjZXNzIHx8ICFyZXMuY29udGVudCkgY29udGludWU7XG4gICAgY29uc3QgcGFydHMgPSByZXMuY29udGVudC50cmltKCkuc3BsaXQoJzonKTtcbiAgICAvLyBGb3JtYXQ6IDxuYW1lPjo8cGlkPjo8cG9ydD46PHBhc3N3b3JkPjo8cHJvdG9jb2w+XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA8IDUpIGNvbnRpbnVlO1xuICAgIGNvbnN0IHBpZCA9IHBhcnNlSW50KHBhcnRzWzFdLCAxMCk7XG4gICAgY29uc3QgcG9ydCA9IHBhcnNlSW50KHBhcnRzWzJdLCAxMCk7XG4gICAgY29uc3QgdG9rZW4gPSBwYXJ0c1szXTtcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShwb3J0KSB8fCAhdG9rZW4pIGNvbnRpbnVlO1xuICAgIHJldHVybiB7IHBvcnQsIHRva2VuLCBwaWQgfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29sbGVjdExvY2tmaWxlUGF0aHMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICBjb25zdCBwYXRoczogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgaW5mbyA9IGF3YWl0IFJVTk5JTkdfSU5GTygpLmNhdGNoKCgpID0+IG51bGwpO1xuICBjb25zdCBleGVjID0gKGluZm8gYXMgYW55KT8uZXhlY3V0aW9uUGF0aCBhcyBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGlmIChleGVjKSB7XG4gICAgLy8gZXhlY3V0aW9uUGF0aCBleGFtcGxlczpcbiAgICAvLyAgIFwiRTpcXFxcUmlvdFxcXFxSaW90IEdhbWVzXFxcXExlYWd1ZSBvZiBMZWdlbmRzXFxcXExlYWd1ZUNsaWVudC5leGVcIlxuICAgIC8vICAgXCJFOlxcXFxSaW90XFxcXFJpb3QgR2FtZXNcXFxcTGVhZ3VlIG9mIExlZ2VuZHNcXFxcR2FtZVxcXFxMZWFndWUgb2YgTGVnZW5kcy5leGVcIlxuICAgIC8vIExvY2tmaWxlIGlzIGFsd2F5cyBhdCB0aGUgTENVIGluc3RhbGwgcm9vdCBuZXh0IHRvIExlYWd1ZUNsaWVudC5leGUuXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IGV4ZWMucmVwbGFjZSgvXFwvL2csICdcXFxcJyk7XG4gICAgY29uc3QgaWR4ID0gbm9ybWFsaXplZC50b0xvd2VyQ2FzZSgpLmxhc3RJbmRleE9mKCdsZWFndWUgb2YgbGVnZW5kc1xcXFwnKTtcbiAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgY29uc3Qgcm9vdCA9IG5vcm1hbGl6ZWQuc3Vic3RyaW5nKDAsIGlkeCArICdsZWFndWUgb2YgbGVnZW5kc1xcXFwnLmxlbmd0aCk7XG4gICAgICBwYXRocy5wdXNoKGAke3Jvb3R9bG9ja2ZpbGVgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRmFsbGJhY2s6IGNob3AgdGhlIC5leGUgYW5kIGFwcGVuZCBsb2NrZmlsZVxuICAgICAgY29uc3QgZGlyID0gbm9ybWFsaXplZC5zdWJzdHJpbmcoMCwgbm9ybWFsaXplZC5sYXN0SW5kZXhPZignXFxcXCcpKTtcbiAgICAgIGlmIChkaXIpIHBhdGhzLnB1c2goYCR7ZGlyfVxcXFxsb2NrZmlsZWApO1xuICAgIH1cbiAgfVxuICBwYXRocy5wdXNoKC4uLkZBTExCQUNLX0xPTF9QQVRIUyk7XG4gIC8vIERlZHVwIHByZXNlcnZpbmcgb3JkZXJcbiAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChwYXRocykpO1xufVxuXG4vKipcbiAqIE1ha2UgYW4gYXV0aGVudGljYXRlZCByZXF1ZXN0IHRvIExDVS4gUmV0dXJucyBwYXJzZWQgSlNPTiBib2R5IChvciB0ZXh0KVxuICogb24gMnh4LCB0aHJvd3MgRXJyb3Igb24gdHJhbnNwb3J0IG9yIG5vbi0yeHguXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsY3VGZXRjaChcbiAgY3JlZHM6IExjdUNyZWRlbnRpYWxzLFxuICBwYXRoOiBzdHJpbmcsXG4gIGluaXQ/OiB7IG1ldGhvZD86IHN0cmluZzsgYm9keT86IHVua25vd24gfVxuKTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vMTI3LjAuMC4xOiR7Y3JlZHMucG9ydH0ke3BhdGguc3RhcnRzV2l0aCgnLycpID8gcGF0aCA6ICcvJyArIHBhdGh9YDtcbiAgLy8gVGhlIGJyb3dzZXIgbWF5IHByZS1mbGlnaHQgYSBDT1JTIHByZWZsaWdodCBvbiBQT1NUL1BVVCDigJQgTENVIGRvZXMgbm90XG4gIC8vIGhvbm91ciBDT1JTLiBPdmVyd29sZidzIHJlbmRlcmVyIGFjY2VwdHMgdGhlIGNlcnQ7IGZldGNoIHdpdGggbm8tY29yc1xuICAvLyBpcyB0b28gcmVzdHJpY3RpdmUgKG9wYXF1ZSByZXNwb25zZSkuIFdlIHVzZSBYTUxIdHRwUmVxdWVzdCBiZWNhdXNlIGl0XG4gIC8vIHN1cmZhY2VzIHN0YXR1cyBjb2RlcyBldmVuIHdoZW4gQ09SUyBoZWFkZXJzIGFyZSBtaXNzaW5nLlxuICBjb25zdCBhdXRoID0gYnRvYShgcmlvdDoke2NyZWRzLnRva2VufWApO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oaW5pdD8ubWV0aG9kIHx8ICdHRVQnLCB1cmwsIHRydWUpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgYEJhc2ljICR7YXV0aH1gKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICBpZiAoaW5pdD8uYm9keSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICB9XG4gICAgeGhyLnRpbWVvdXQgPSA1MDAwO1xuICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCA/IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkgOiBudWxsKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgTENVICR7eGhyLnN0YXR1c306ICR7eGhyLnN0YXR1c1RleHR9IOKAlCAke3hoci5yZXNwb25zZVRleHQ/LnNsaWNlKDAsIDIwMCkgfHwgJyd9YCkpO1xuICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9uZXJyb3IgPSAoKSA9PiByZWplY3QobmV3IEVycm9yKGBOZXR3b3JrIGVycm9yIGNvbnRhY3RpbmcgTENVICgke3VybH0pYCkpO1xuICAgIHhoci5vbnRpbWVvdXQgPSAoKSA9PiByZWplY3QobmV3IEVycm9yKCdMQ1UgcmVxdWVzdCB0aW1lZCBvdXQnKSk7XG4gICAgeGhyLnNlbmQoaW5pdD8uYm9keSAhPT0gdW5kZWZpbmVkID8gSlNPTi5zdHJpbmdpZnkoaW5pdC5ib2R5KSA6IG51bGwpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuIGludGVybmFsIGNoYW1waW9uIGlkIChlLmcuIFwiVEZUMTdfQWF0cm94XCIpIHRvIHRoZSBiYXJlIGNoYW1waW9uXG4gKiBuYW1lIFJpb3QncyBMQ1UgZXhwZWN0cyAoXCJBYXRyb3hcIikuIEZhbGxzIGJhY2sgdG8gdGhlIGNoYW1waW9uJ3MgZGlzcGxheVxuICogbmFtZSBpZiB3ZSBjYW4ndCBwYXJzZSB0aGUgYXBpTmFtZS5cbiAqL1xuZnVuY3Rpb24gY2hhbXBpb25JZFRvTGN1TmFtZShpZDogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIGNvbnN0IGNoYW1wOiBDaGFtcGlvbiB8IHVuZGVmaW5lZCA9IGNoYW1waW9uTWFwLmdldChpZCk7XG4gIGlmICghY2hhbXApIHJldHVybiBudWxsO1xuICAvLyBTdHJpcCBcIlRGVCMjX1wiIHByZWZpeCBpZiBwcmVzZW50XG4gIGNvbnN0IG0gPSBpZC5tYXRjaCgvXlRGVFxcZCtfKC4rKSQvKTtcbiAgaWYgKG0pIHJldHVybiBtWzFdO1xuICAvLyBGYWxsYmFjazogc3RyaXAgd2hpdGVzcGFjZSBmcm9tIGRpc3BsYXkgbmFtZVxuICByZXR1cm4gY2hhbXAubmFtZS5yZXBsYWNlKC9cXHMrL2csICcnKTtcbn1cblxuLyoqXG4gKiBQdXNoIGEgbGlzdCBvZiBjaGFtcGlvbiBJRHMgdG8gTG9MJ3MgVEZUIFRlYW0gUGxhbm5lci4gRWFjaCBjaGFtcGlvbiBpc1xuICogYWRkZWQgdmlhIFBPU1QgL2xvbC10ZnQtdGVhbS1wbGFubmVyL3YxL3RlYW0vY2hhbXBpb25zQnlJZC88Y2hhbXA+LlxuICpcbiAqIFJpb3QncyBUZWFtIFBsYW5uZXIgc3RvcmVzIDkgc2xvdHM7IGlmIHRoZSBjb21wIGhhcyBtb3JlIHVuaXRzIHdlIHNlbmQgdGhlXG4gKiBmaXJzdCA5LiBUaGUgZW5kcG9pbnQgcmVwbGFjZXMgYSBzbG90LCBzbyB3ZSBQT1NUIHNlcXVlbnRpYWxseSB0byBhdm9pZFxuICogdGhlIGNsaWVudCByYWNpbmcgd2l0aCB1cy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHB1c2hUZWFtVG9QbGFubmVyKGNoYW1waW9uSWRzOiBzdHJpbmdbXSk6IFByb21pc2U8UHVzaFJlc3VsdD4ge1xuICBpZiAoY2hhbXBpb25JZHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBwdXNoZWQ6IDAsIGZhaWxlZDogMCwgcmVhc29uOiAnTm8gdW5pdHMgdG8gcHVzaCcgfTtcbiAgfVxuICBjb25zdCBjcmVkcyA9IGF3YWl0IGdldExjdUNyZWRlbnRpYWxzKCk7XG4gIGlmICghY3JlZHMpIHtcbiAgICByZXR1cm4geyBvazogZmFsc2UsIHB1c2hlZDogMCwgZmFpbGVkOiBjaGFtcGlvbklkcy5sZW5ndGgsIHJlYXNvbjogJ0xlYWd1ZSBjbGllbnQgbm90IHJ1bm5pbmcgKGxvY2tmaWxlIG5vdCBmb3VuZCknIH07XG4gIH1cbiAgLy8gRGUtZHVwZSBjaGFtcGlvbnMg4oCUIFRlYW0gUGxhbm5lciBvbmx5IHN0b3JlcyBvbmUgZW50cnkgcGVyIGNoYW1waW9uLlxuICBjb25zdCB1bmlxdWUgPSBBcnJheS5mcm9tKG5ldyBTZXQoY2hhbXBpb25JZHMpKS5zbGljZSgwLCA5KTtcblxuICBsZXQgcHVzaGVkID0gMDtcbiAgbGV0IGZhaWxlZCA9IDA7XG4gIGxldCBsYXN0RXJyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGZvciAoY29uc3QgaWQgb2YgdW5pcXVlKSB7XG4gICAgY29uc3QgbmFtZSA9IGNoYW1waW9uSWRUb0xjdU5hbWUoaWQpO1xuICAgIGlmICghbmFtZSkgeyBmYWlsZWQrKzsgY29udGludWU7IH1cbiAgICB0cnkge1xuICAgICAgYXdhaXQgbGN1RmV0Y2goY3JlZHMsIGAvbG9sLXRmdC10ZWFtLXBsYW5uZXIvdjEvdGVhbS9jaGFtcGlvbnNCeUlkLyR7ZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IHsgY2hhbXBpb25OYW1lOiBuYW1lIH0sXG4gICAgICB9KTtcbiAgICAgIHB1c2hlZCsrO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgZmFpbGVkKys7XG4gICAgICBsYXN0RXJyID0gKGVyciBhcyBFcnJvcikubWVzc2FnZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBvazogcHVzaGVkID4gMCxcbiAgICBwdXNoZWQsXG4gICAgZmFpbGVkLFxuICAgIHJlYXNvbjogZmFpbGVkID4gMCA/IGxhc3RFcnIgOiB1bmRlZmluZWQsXG4gIH07XG59XG5cbi8qKlxuICogUXVpY2sgTENVIHJlYWNoYWJpbGl0eSBwcm9iZSDigJQgdXNlZCB0byBlbmFibGUvZGlzYWJsZSB0aGUgcHVzaCBidXR0b25zXG4gKiB1cGZyb250IHdpdGhvdXQgZmlyaW5nIGEgcmVhbCByZXF1ZXN0LlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaXNMY3VSZWFjaGFibGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIGNvbnN0IGNyZWRzID0gYXdhaXQgZ2V0TGN1Q3JlZGVudGlhbHMoKTtcbiAgaWYgKCFjcmVkcykgcmV0dXJuIGZhbHNlO1xuICB0cnkge1xuICAgIGF3YWl0IGxjdUZldGNoKGNyZWRzLCAnL3Jpb3RjbGllbnQvZ2V0X3JlZ2lvbl9sb2NhbGUnKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogQ29udmVuaWVuY2U6IHJldHVybnMgdHJ1ZSBpZiBhIHN1cHBvcnRlZCBSaW90IGdhbWUgKExvTC9URlQpIGlzIHJ1bm5pbmcuXG4gKiBVc2VmdWwgZm9yIGdhdGluZyBVSSBoaW50cy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzUmlvdEdhbWVSdW5uaW5nKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBjb25zdCBpbmZvID0gYXdhaXQgUlVOTklOR19JTkZPKCkuY2F0Y2goKCkgPT4gbnVsbCk7XG4gIGNvbnN0IGlkID0gKGluZm8gYXMgYW55KT8uY2xhc3NJZCA/PyAoaW5mbyBhcyBhbnkpPy5pZDtcbiAgaWYgKCFpZCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gaWQgPT09IExPTF9HQU1FX0lEIHx8IGlkID09PSBURlRfU1RBTkRBTE9ORV9JRDtcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMQ1UgUkVBRCBFTkRQT0lOVFMg4oCUIGF1dG8tbGluayBiZWhhdmlvdXIuIFdoZW4gTG9MIGlzIHJ1bm5pbmcgd2UgZG9uJ3Rcbi8vIGFzayB0aGUgdXNlciB0byB0eXBlIGEgUmlvdCBJRDsgd2UgcmVhZCBpdCBmcm9tIExDVS5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIExjdVN1bW1vbmVySW5mbyB7XG4gIGFjY291bnRJZDogc3RyaW5nO1xuICBzdW1tb25lcklkOiBzdHJpbmc7XG4gIHB1dWlkOiBzdHJpbmc7XG4gIGdhbWVOYW1lOiBzdHJpbmc7XG4gIHRhZ0xpbmU6IHN0cmluZztcbiAgaW50ZXJuYWxOYW1lOiBzdHJpbmc7XG4gIGRpc3BsYXlOYW1lOiBzdHJpbmc7XG4gIHByb2ZpbGVJY29uSWQ6IG51bWJlcjtcbiAgc3VtbW9uZXJMZXZlbDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExjdVJlZ2lvbkxvY2FsZSB7XG4gIHJlZ2lvbjogc3RyaW5nOyAgICAgLy8gZS5nLiAnRVVXJ1xuICBsb2NhbGU6IHN0cmluZzsgICAgIC8vIGUuZy4gJ2VuX1VTJ1xuICB3ZWJMYW5ndWFnZTogc3RyaW5nO1xuICB3ZWJSZWdpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMY3VSYW5rZWRTdGF0cyB7XG4gIHRpZXI/OiBzdHJpbmc7XG4gIGRpdmlzaW9uPzogc3RyaW5nO1xuICBsZWFndWVQb2ludHM/OiBudW1iZXI7XG4gIHdpbnM/OiBudW1iZXI7XG4gIGxvc3Nlcz86IG51bWJlcjtcbiAgcXVldWVUeXBlPzogc3RyaW5nOyAgICAgLy8gZS5nLiAnUkFOS0VEX1RGVCdcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRTdW1tb25lcigpOiBQcm9taXNlPExjdVN1bW1vbmVySW5mbyB8IG51bGw+IHtcbiAgY29uc3QgY3JlZHMgPSBhd2FpdCBnZXRMY3VDcmVkZW50aWFscygpO1xuICBpZiAoIWNyZWRzKSByZXR1cm4gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgbGN1RmV0Y2goY3JlZHMsICcvbG9sLXN1bW1vbmVyL3YxL2N1cnJlbnQtc3VtbW9uZXInKTtcbiAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICBhY2NvdW50SWQ6ICAgICBTdHJpbmcoZGF0YS5hY2NvdW50SWQgPz8gJycpLFxuICAgICAgc3VtbW9uZXJJZDogICAgU3RyaW5nKGRhdGEuc3VtbW9uZXJJZCA/PyAnJyksXG4gICAgICBwdXVpZDogICAgICAgICBTdHJpbmcoZGF0YS5wdXVpZCA/PyAnJyksXG4gICAgICBnYW1lTmFtZTogICAgICBTdHJpbmcoZGF0YS5nYW1lTmFtZSA/PyBkYXRhLmRpc3BsYXlOYW1lID8/ICcnKSxcbiAgICAgIHRhZ0xpbmU6ICAgICAgIFN0cmluZyhkYXRhLnRhZ0xpbmUgPz8gJycpLFxuICAgICAgaW50ZXJuYWxOYW1lOiAgU3RyaW5nKGRhdGEuaW50ZXJuYWxOYW1lID8/ICcnKSxcbiAgICAgIGRpc3BsYXlOYW1lOiAgIFN0cmluZyhkYXRhLmRpc3BsYXlOYW1lID8/ICcnKSxcbiAgICAgIHByb2ZpbGVJY29uSWQ6IE51bWJlcihkYXRhLnByb2ZpbGVJY29uSWQgPz8gMCksXG4gICAgICBzdW1tb25lckxldmVsOiBOdW1iZXIoZGF0YS5zdW1tb25lckxldmVsID8/IDApLFxuICAgIH07XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRSZWdpb25Mb2NhbGUoKTogUHJvbWlzZTxMY3VSZWdpb25Mb2NhbGUgfCBudWxsPiB7XG4gIGNvbnN0IGNyZWRzID0gYXdhaXQgZ2V0TGN1Q3JlZGVudGlhbHMoKTtcbiAgaWYgKCFjcmVkcykgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGxjdUZldGNoKGNyZWRzLCAnL3Jpb3RjbGllbnQvZ2V0X3JlZ2lvbl9sb2NhbGUnKTtcbiAgICBpZiAoIWRhdGEpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICByZWdpb246ICAgICAgU3RyaW5nKGRhdGEucmVnaW9uID8/ICcnKSxcbiAgICAgIGxvY2FsZTogICAgICBTdHJpbmcoZGF0YS5sb2NhbGUgPz8gJycpLFxuICAgICAgd2ViTGFuZ3VhZ2U6IFN0cmluZyhkYXRhLndlYkxhbmd1YWdlID8/ICcnKSxcbiAgICAgIHdlYlJlZ2lvbjogICBTdHJpbmcoZGF0YS53ZWJSZWdpb24gPz8gJycpLFxuICAgIH07XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50UmFua2VkU3RhdHMoKTogUHJvbWlzZTxMY3VSYW5rZWRTdGF0cyB8IG51bGw+IHtcbiAgY29uc3QgY3JlZHMgPSBhd2FpdCBnZXRMY3VDcmVkZW50aWFscygpO1xuICBpZiAoIWNyZWRzKSByZXR1cm4gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgbGN1RmV0Y2goY3JlZHMsICcvbG9sLXJhbmtlZC92MS9jdXJyZW50LXJhbmtlZC1zdGF0cycpO1xuICAgIGlmICghZGF0YSkgcmV0dXJuIG51bGw7XG4gICAgLy8gVGhlIHNoYXBlIGluY2x1ZGVzIGBxdWV1ZU1hcGAgd2l0aCBhbGwgcmFua2VkIHF1ZXVlIHN0YXRzOyBwdWxsIFRGVC5cbiAgICBjb25zdCBxdWV1ZU1hcCA9IGRhdGEucXVldWVNYXAgfHwge307XG4gICAgY29uc3QgdGZ0ID0gcXVldWVNYXAuUkFOS0VEX1RGVCB8fCBxdWV1ZU1hcC5SQU5LRURfVEZUX1RVUkJPIHx8IHF1ZXVlTWFwLlJBTktFRF9URlRfRE9VQkxFX1VQIHx8IG51bGw7XG4gICAgaWYgKCF0ZnQpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICB0aWVyOiAgICAgICAgIHRmdC50aWVyLFxuICAgICAgZGl2aXNpb246ICAgICB0ZnQuZGl2aXNpb24sXG4gICAgICBsZWFndWVQb2ludHM6IHRmdC5sZWFndWVQb2ludHMsXG4gICAgICB3aW5zOiAgICAgICAgIHRmdC53aW5zLFxuICAgICAgbG9zc2VzOiAgICAgICB0ZnQubG9zc2VzLFxuICAgICAgcXVldWVUeXBlOiAgICB0ZnQucXVldWVUeXBlLFxuICAgIH07XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50R2FtZVZlcnNpb24oKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gIGNvbnN0IGNyZWRzID0gYXdhaXQgZ2V0TGN1Q3JlZGVudGlhbHMoKTtcbiAgaWYgKCFjcmVkcykgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGxjdUZldGNoKGNyZWRzLCAnL2xvbC1wYXRjaC92MS9nYW1lLXZlcnNpb24nKTtcbiAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gZGF0YSA6IChkYXRhPy52ZXJzaW9uID8/IG51bGwpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKiogQ29udmVydCBMQ1UncyByZWdpb24gY29kZSAoZS5nLiBcIkVVV1wiKSB0byB0aGUgUmlvdCBHYW1lcyBBUEkgcGxhdGZvcm0gaWRcbiAqICAoXCJldXcxXCIpLiBGYWxscyBiYWNrIHRvIHRoZSByYXcgbG93ZXItY2FzZSBpbnB1dCBmb3IgdW5rbm93biByZWdpb25zLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lvbkNvZGVUb1BsYXRmb3JtKHJlZ2lvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIEVVVzogJ2V1dzEnLCBFVU5FOiAnZXVuMScsIE5BOiAnbmExJywgS1I6ICdrcicsIEJSOiAnYnIxJyxcbiAgICBMQU46ICdsYTEnLCBMQVM6ICdsYTInLCBPQ0U6ICdvYzEnLCBUUjogJ3RyMScsIFJVOiAncnUnLFxuICAgIEpQOiAnanAxJywgUEJFOiAncGJlMScsIFBIOiAncGgyJywgU0c6ICdzZzInLCBUSDogJ3RoMicsXG4gICAgVFc6ICd0dzInLCBWTjogJ3ZuMicsXG4gIH07XG4gIHJldHVybiBtYXBbcmVnaW9uLnRvVXBwZXJDYXNlKCldIHx8IHJlZ2lvbi50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKiogQnVuZGxlOiBkZXRlY3Qgc3VtbW9uZXIgKyByYW5rICsgcmVnaW9uIGluIG9uZSBjYWxsLiBVc2VkIGJ5IFByb2ZpbGVcbiAqICB0YWIncyBcIkF1dG8tbGlua1wiIGFmZm9yZGFuY2UuIFJldHVybnMgbnVsbCBpZiBMQ1UgaXNuJ3QgcmVhY2hhYmxlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBMY3VBdXRvTGlua1Jlc3VsdCB7XG4gIHN1bW1vbmVyOiBMY3VTdW1tb25lckluZm87XG4gIHJlZ2lvbjogTGN1UmVnaW9uTG9jYWxlIHwgbnVsbDtcbiAgcmFuazogTGN1UmFua2VkU3RhdHMgfCBudWxsO1xuICBwbGF0Zm9ybUlkOiBzdHJpbmc7ICAvLyBlLmcuICdldXcxJ1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXV0b0xpbmtGcm9tTGN1KCk6IFByb21pc2U8TGN1QXV0b0xpbmtSZXN1bHQgfCBudWxsPiB7XG4gIGNvbnN0IHN1bW1vbmVyID0gYXdhaXQgZ2V0Q3VycmVudFN1bW1vbmVyKCk7XG4gIGlmICghc3VtbW9uZXIpIHJldHVybiBudWxsO1xuICAvLyBQYXJhbGxlbCBmZXRjaCDigJQgbm9uZSBvZiB0aGVzZSBibG9jayBlYWNoIG90aGVyXG4gIGNvbnN0IFtyZWdpb24sIHJhbmtdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGdldFJlZ2lvbkxvY2FsZSgpLmNhdGNoKCgpID0+IG51bGwpLFxuICAgIGdldEN1cnJlbnRSYW5rZWRTdGF0cygpLmNhdGNoKCgpID0+IG51bGwpLFxuICBdKTtcbiAgY29uc3QgcGxhdGZvcm1JZCA9IHJlZ2lvbiA/IHJlZ2lvbkNvZGVUb1BsYXRmb3JtKHJlZ2lvbi5yZWdpb24pIDogJ2V1dzEnO1xuICByZXR1cm4geyBzdW1tb25lciwgcmVnaW9uLCByYW5rLCBwbGF0Zm9ybUlkIH07XG59XG4iLCIvLyBTbmFwc2hvdFVwbG9hZGVyIOKAlCBvcHQtaW4gcGF0aCB0aGF0IHNoaXBzIGNvbXBsZXRlZC1tYXRjaCBzbmFwc2hvdHMgZnJvbVxuLy8gTWF0Y2hUcmFja2VyIHRvIHRoZSBiYWNrZW5kIGAvbWF0Y2gtc25hcHNob3RzYCByb3V0ZS5cbi8vXG4vLyBBbGwgZGF0YSBpcyBmcm9tIHRoZSB1c2VyJ3Mgb3duIGdhbWUuIE9wcG9uZW50IGJvYXJkcyBhcmUgTkVWRVIgcGFydCBvZlxuLy8gdGhlIHBheWxvYWQgKE92ZXJ3b2xmIEdFUCBkb2Vzbid0IGV4cG9zZSB0aGVtLCBhbmQgd2Ugd291bGRuJ3Qgc2hpcCB0aGVtXG4vLyBldmVuIGlmIGl0IGRpZCDigJQgY29tcGxpYW5jZSBsaW5lKS5cblxuaW1wb3J0IHsgYWRtaW5GZXRjaCwgaXNBdXRoZW50aWNhdGVkIH0gZnJvbSAnLi9BdXRoU2VydmljZSc7XG5cbmNvbnN0IE9QVF9JTl9LRVkgPSAncGl2b3R0ZnRfY29udHJpYnV0ZV9zbmFwc2hvdHMnO1xuY29uc3QgUEVORElOR19LRVkgPSAncGl2b3R0ZnRfc25hcHNob3RfcGVuZGluZ192MSc7XG5jb25zdCBDT05UUklCVVRFRF9DT1VOVF9LRVkgPSAncGl2b3R0ZnRfc25hcHNob3RfY29udHJpYnV0ZWRfY291bnRfdjEnO1xuY29uc3QgTUFYX1BFTkRJTkcgPSAxMDtcblxuLy8gVGhlc2UgdHJhdmVsIHdpdGggZXZlcnkgdXBsb2FkLiBCdW1wIHRoZW0gaW4gYHNyYy9jb25zdHMudHNgIHdoZW5ldmVyIGFcbi8vIG5ldyBURlQgcGF0Y2ggc2hpcHMg4oCUIHNhbWUgcmVsZWFzZSBjYWRlbmNlIGFzIGBQQVRDSEVTYCBpbiB0aGUgcmVuZGVyZXJzLlxuaW1wb3J0IHsga0N1cnJlbnRUZnRQYXRjaCwga0N1cnJlbnRUZnRTZXROdW1iZXIgfSBmcm9tICcuLi9jb25zdHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNuYXBzaG90UGF5bG9hZCB7XG4gIG1hdGNoSWQ6IHN0cmluZztcbiAgcmVnaW9uOiBzdHJpbmc7ICAgICAvLyBwbGF0Zm9ybSBjb2RlOiBldXcxLCBuYTEsIGtyLCAuLi5cbiAgcGF0Y2g6IHN0cmluZzsgICAgICAvLyBURlQgaW4tc2V0IHBhdGNoIGxpa2UgXCIxNy4zXCJcbiAgdGZ0U2V0OiBudW1iZXI7XG4gIGZpbmFsUGxhY2VtZW50OiBudW1iZXIgfCBudWxsO1xuICBmaW5hbExldmVsOiBudW1iZXIgfCBudWxsO1xuICBmaW5hbFVuaXRzOiBBcnJheTx7IGNoYXJhY3Rlcl9pZDogc3RyaW5nOyB0aWVyOiBudW1iZXI7IGl0ZW1zPzogc3RyaW5nW10gfT47XG4gIGZpbmFsVHJhaXRzOiBBcnJheTx7IG5hbWU6IHN0cmluZzsgbnVtX3VuaXRzOiBudW1iZXI7IHRpZXJfY3VycmVudDogbnVtYmVyOyBzdHlsZTogbnVtYmVyIH0+O1xuICBmaW5hbEF1Z21lbnRzOiBzdHJpbmdbXTtcbiAgc25hcHNob3RzOiBBcnJheTx7XG4gICAgc3RhZ2U6IHN0cmluZztcbiAgICBsZXZlbDogbnVtYmVyO1xuICAgIGdvbGQ6IG51bWJlcjtcbiAgICBoZWFsdGg6IG51bWJlcjtcbiAgICBzdHJlYWs6IG51bWJlcjtcbiAgICB1bml0czogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IHRpZXI6IG51bWJlcjsgaXRlbXM/OiBzdHJpbmdbXSB9PjtcbiAgfT47XG59XG5cbmludGVyZmFjZSBVcGxvYWRSZXN1bHQge1xuICBvazogYm9vbGVhbjtcbiAgYWxyZWFkeVVwbG9hZGVkPzogYm9vbGVhbjtcbiAgZXJyb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBTbmFwc2hvdFVwbG9hZGVyIHtcbiAgLy8gPT09PT0gb3B0LWluIHRvZ2dsZSA9PT09PVxuICBzdGF0aWMgaXNPcHRlZEluKCk6IGJvb2xlYW4ge1xuICAgIHRyeSB7IHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShPUFRfSU5fS0VZKSA9PT0gJ3RydWUnOyB9IGNhdGNoIHsgcmV0dXJuIGZhbHNlOyB9XG4gIH1cbiAgc3RhdGljIHNldE9wdEluKHY6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0cnkgeyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShPUFRfSU5fS0VZLCB2ID8gJ3RydWUnIDogJ2ZhbHNlJyk7IH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxuICB9XG4gIHN0YXRpYyBnZXRDb250cmlidXRlZENvdW50KCk6IG51bWJlciB7XG4gICAgdHJ5IHsgcmV0dXJuIHBhcnNlSW50KGxvY2FsU3RvcmFnZS5nZXRJdGVtKENPTlRSSUJVVEVEX0NPVU5UX0tFWSkgfHwgJzAnLCAxMCkgfHwgMDsgfVxuICAgIGNhdGNoIHsgcmV0dXJuIDA7IH1cbiAgfVxuXG4gIC8vID09PT09IFB1YmxpYyBlbnRyeTogY2FsbCB0aGlzIGFmdGVyIE1hdGNoVHJhY2tlciBwZXJzaXN0cyBhIG1hdGNoID09PT09XG4gIC8vIEJlc3QtZWZmb3J0LiBEcmFpbnMgdGhlIHBlbmRpbmcgcXVldWUgZmlyc3Qgc28gcmV0cmllcyBmbHVzaCBiZWZvcmUgdGhlXG4gIC8vIG5ld2VzdCB1cGxvYWQgY29tcGV0ZXMgZm9yIHRoZSBuZXR3b3JrLiBBbGwgZmFpbHVyZXMgZmFsbCBpbnRvIHRoZSBxdWV1ZS5cbiAgc3RhdGljIGFzeW5jIHRyeVVwbG9hZChwYXlsb2FkOiBTbmFwc2hvdFBheWxvYWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuaXNPcHRlZEluKCkgfHwgIWlzQXV0aGVudGljYXRlZCgpKSByZXR1cm47XG4gICAgaWYgKCFwYXlsb2FkLm1hdGNoSWQgfHwgIXBheWxvYWQucmVnaW9uIHx8ICFwYXlsb2FkLnBhdGNoKSByZXR1cm47XG5cbiAgICAvLyAxLiBGbHVzaCB3aGF0ZXZlcidzIHBlbmRpbmcgKGZhaWxlZCB1cGxvYWRzIGZyb20gZWFybGllciBzZXNzaW9ucykuXG4gICAgYXdhaXQgdGhpcy5kcmFpblBlbmRpbmcoKTtcblxuICAgIC8vIDIuIEF0dGVtcHQgdGhpcyBtYXRjaC4gSWYgaXQgZmFpbHMsIHF1ZXVlLlxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMudXBsb2FkT25jZShwYXlsb2FkKTtcbiAgICBpZiAoIXJlcy5vaykge1xuICAgICAgdGhpcy5lbnF1ZXVlKHBheWxvYWQpO1xuICAgIH0gZWxzZSBpZiAoIXJlcy5hbHJlYWR5VXBsb2FkZWQpIHtcbiAgICAgIHRoaXMuYnVtcENvbnRyaWJ1dGVkQ291bnQoKTtcbiAgICB9XG4gIH1cblxuICAvLyA9PT09PSBJbnRlcm5hbCA9PT09PVxuXG4gIC8vIFRoZSBkZWZhdWx0cyBmcm9tIGNvbnN0cyBhcmUgcmlnaHQgZm9yIGxpdmUgZ2FtZXM7IGV4cG9zZSBwYXRjaC90ZnRTZXRcbiAgLy8gYXMgZGVmYXVsdHMgc28gY2FsbGVycyBjYW4gb21pdCB0aGVtIHdoZW4gbWF0Y2hpbmcgdGhlIGN1cnJlbnQgYnVpbGQuXG4gIHN0YXRpYyBidWlsZFBheWxvYWQoYXJnczogT21pdDxTbmFwc2hvdFBheWxvYWQsICdwYXRjaCcgfCAndGZ0U2V0Jz4gJiB7XG4gICAgcGF0Y2g/OiBzdHJpbmc7IHRmdFNldD86IG51bWJlcjtcbiAgfSk6IFNuYXBzaG90UGF5bG9hZCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmFyZ3MsXG4gICAgICBwYXRjaDogIGFyZ3MucGF0Y2ggID8/IGtDdXJyZW50VGZ0UGF0Y2gsXG4gICAgICB0ZnRTZXQ6IGFyZ3MudGZ0U2V0ID8/IGtDdXJyZW50VGZ0U2V0TnVtYmVyLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhc3luYyB1cGxvYWRPbmNlKHA6IFNuYXBzaG90UGF5bG9hZCk6IFByb21pc2U8VXBsb2FkUmVzdWx0PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFkbWluRmV0Y2g8eyBvazogYm9vbGVhbjsgYWxyZWFkeVVwbG9hZGVkPzogYm9vbGVhbiB9PihcbiAgICAgICAgJy9tYXRjaC1zbmFwc2hvdHMnLFxuICAgICAgICB7IG1ldGhvZDogJ1BPU1QnLCBib2R5OiBKU09OLnN0cmluZ2lmeShwKSB9LFxuICAgICAgKTtcbiAgICAgIHJldHVybiB7IG9rOiAhIXJlcy5vaywgYWxyZWFkeVVwbG9hZGVkOiAhIXJlcy5hbHJlYWR5VXBsb2FkZWQgfTtcbiAgICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICAgIC8vIEF1dGggZXhwaXJlZCDihpIgYWRtaW5GZXRjaCBhbHJlYWR5IGNsZWFycyB0aGUgc2Vzc2lvbjsgdGhlIG5leHQgbWF0Y2hcbiAgICAgIC8vIGVuZCB3aWxsIHNraXAgKGlzQXV0aGVudGljYXRlZCgpIHJldHVybnMgZmFsc2UpIGFuZCB0aGUgcXVldWUgaG9sZHNcbiAgICAgIC8vIHRoZSBwYXlsb2FkIGZvciB3aGVuZXZlciB0aGUgdXNlciBzaWducyBiYWNrIGluLlxuICAgICAgcmV0dXJuIHsgb2s6IGZhbHNlLCBlcnJvcjogZT8ubWVzc2FnZSB8fCBTdHJpbmcoZSkgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBkcmFpblBlbmRpbmcoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVldWUgPSB0aGlzLmxvYWRRdWV1ZSgpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAvLyBEcmFpbiBpbi1vcmRlcjsga2VlcCBmYWlsdXJlcyBmb3IgbmV4dCBwYXNzLlxuICAgIGNvbnN0IHJlbWFpbmluZzogU25hcHNob3RQYXlsb2FkW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IHAgb2YgcXVldWUpIHtcbiAgICAgIGNvbnN0IHIgPSBhd2FpdCB0aGlzLnVwbG9hZE9uY2UocCk7XG4gICAgICBpZiAoci5vaykge1xuICAgICAgICBpZiAoIXIuYWxyZWFkeVVwbG9hZGVkKSB0aGlzLmJ1bXBDb250cmlidXRlZENvdW50KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1haW5pbmcucHVzaChwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zYXZlUXVldWUocmVtYWluaW5nKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGVucXVldWUocDogU25hcHNob3RQYXlsb2FkKTogdm9pZCB7XG4gICAgY29uc3QgcXVldWUgPSB0aGlzLmxvYWRRdWV1ZSgpO1xuICAgIC8vIERlZHVwIG9uIG1hdGNoSWQgaW4gY2FzZSB0aGUgc2FtZSBtYXRjaCByZXRyaWVzIG11bHRpcGxlIHRpbWVzLlxuICAgIGNvbnN0IGZpbHRlcmVkID0gcXVldWUuZmlsdGVyKHEgPT4gcS5tYXRjaElkICE9PSBwLm1hdGNoSWQpO1xuICAgIGZpbHRlcmVkLnB1c2gocCk7XG4gICAgaWYgKGZpbHRlcmVkLmxlbmd0aCA+IE1BWF9QRU5ESU5HKSBmaWx0ZXJlZC5zcGxpY2UoMCwgZmlsdGVyZWQubGVuZ3RoIC0gTUFYX1BFTkRJTkcpO1xuICAgIHRoaXMuc2F2ZVF1ZXVlKGZpbHRlcmVkKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGxvYWRRdWV1ZSgpOiBTbmFwc2hvdFBheWxvYWRbXSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFBFTkRJTkdfS0VZKTtcbiAgICAgIHJldHVybiByYXcgPyBKU09OLnBhcnNlKHJhdykgYXMgU25hcHNob3RQYXlsb2FkW10gOiBbXTtcbiAgICB9IGNhdGNoIHsgcmV0dXJuIFtdOyB9XG4gIH1cbiAgcHJpdmF0ZSBzdGF0aWMgc2F2ZVF1ZXVlKHE6IFNuYXBzaG90UGF5bG9hZFtdKTogdm9pZCB7XG4gICAgdHJ5IHsgbG9jYWxTdG9yYWdlLnNldEl0ZW0oUEVORElOR19LRVksIEpTT04uc3RyaW5naWZ5KHEpKTsgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XG4gIH1cbiAgcHJpdmF0ZSBzdGF0aWMgYnVtcENvbnRyaWJ1dGVkQ291bnQoKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG4gPSB0aGlzLmdldENvbnRyaWJ1dGVkQ291bnQoKSArIDE7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShDT05UUklCVVRFRF9DT1VOVF9LRVksIFN0cmluZyhuKSk7XG4gICAgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBTZXR0aW5ncyB3aW5kb3cg4oCUIHN0YW5kYWxvbmUgT3ZlcndvbGYgd2luZG93ICg0ODB4MzYwIGRlc2t0b3Bfb25seSkuXG4vL1xuLy8gQWxsIHNldHRpbmdzIGFyZSBzdG9yZWQgaW4gbG9jYWxTdG9yYWdlIHdpdGggdGhlIGBwaXZvdHRmdF9zZXR0aW5nc18qYFxuLy8gcHJlZml4LiBPdGhlciB3aW5kb3dzIHJlYWQgdGhlbSBvbiBkZW1hbmQgKG5vIGNyb3NzLXdpbmRvdyBldmVudCBidXNcbi8vIHRvZGF5IOKAlCB0aGUgcmVuZGVyZXIgcmVhZHMgbG9jYWxTdG9yYWdlIG9uIGVhY2ggb3BlbikuXG5cbmltcG9ydCB7IGlzTGN1UmVhY2hhYmxlLCBhdXRvTGlua0Zyb21MY3UgfSBmcm9tICcuLi9zZXJ2aWNlcy9MY3VTZXJ2aWNlJztcbmltcG9ydCB7IGlzQXV0aGVudGljYXRlZCwgZ2V0U3RvcmVkVXNlciwgaGFzQXRMZWFzdCwgbG9nb3V0LCByZWZyZXNoTWUsIG9uQ2hhbmdlIGFzIG9uQXV0aENoYW5nZSB9IGZyb20gJy4uL3NlcnZpY2VzL0F1dGhTZXJ2aWNlJztcbmltcG9ydCB7IFNuYXBzaG90VXBsb2FkZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9TbmFwc2hvdFVwbG9hZGVyJztcbmltcG9ydCB7IGtXaW5kb3dOYW1lcyB9IGZyb20gJy4uL2NvbnN0cyc7XG5cbmNvbnN0IFNUT1JBR0VfS0VZUyA9IHtcbiAgcGxhdGZvcm06ICdwaXZvdHRmdF9zZXR0aW5nc19wbGF0Zm9ybScsXG4gIGNvbnRyb2xsZXJFbmFibGVkOiAncGl2b3R0ZnRfc2V0dGluZ3NfY29udHJvbGxlcl9lbmFibGVkJyxcbiAgYXV0b3BpblM6ICdwaXZvdHRmdF9zZXR0aW5nc19hdXRvcGluX3MnLFxuICB0aGVtZTogJ3Bpdm90dGZ0X3NldHRpbmdzX3RoZW1lJyxcbn07XG5cbi8vIEFwcGx5IHRoZW1lIGNsYXNzIHRvIDxib2R5PjsgYnJvYWRjYXN0IHNvIGFsbCBvcGVuIHdpbmRvd3MgdXBkYXRlLlxuZnVuY3Rpb24gYXBwbHlUaGVtZSh0aGVtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGNscyA9IHRoZW1lID09PSAnbGlnaHQnID8gJ3RoZW1lLWxpZ2h0JyA6ICcnO1xuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3RoZW1lLWxpZ2h0Jyk7XG4gIGlmIChjbHMpIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChjbHMpO1xuICAvLyBOb3RpZnkgb3RoZXIgUGl2b3RURlQgd2luZG93cyBzbyB0aGV5IHJlc3R5bGUgd2l0aG91dCBhIHJlbG9hZC5cbiAgdHJ5IHtcbiAgICBvdmVyd29sZi53aW5kb3dzLmdldE9wZW5XaW5kb3dzKChyZXM6IGFueSkgPT4ge1xuICAgICAgY29uc3Qgd2lucyA9IE9iamVjdC52YWx1ZXMocmVzIHx8IHt9KSBhcyBhbnlbXTtcbiAgICAgIGZvciAoY29uc3QgdyBvZiB3aW5zKSB7XG4gICAgICAgIGlmICghdyB8fCB3Lm5hbWUgPT09ICdzZXR0aW5ncycgfHwgIXcuaWQpIGNvbnRpbnVlO1xuICAgICAgICBvdmVyd29sZi53aW5kb3dzLnNlbmRNZXNzYWdlKHcuaWQsICd0aGVtZTpjaGFuZ2VkJywgSlNPTi5zdHJpbmdpZnkoeyB0aGVtZSB9KSwgKCkgPT4ge30pO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbn1cblxuZnVuY3Rpb24gJDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQ+KGlkOiBzdHJpbmcpOiBUIHwgbnVsbCB7XG4gIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgYXMgVCB8IG51bGw7XG59XG5cbmZ1bmN0aW9uIGxvYWRTZXR0aW5ncygpIHtcbiAgY29uc3QgcGxhdGZvcm0gPSAkPEhUTUxTZWxlY3RFbGVtZW50Pignc2V0dGluZ3MtcGxhdGZvcm0nKTtcbiAgY29uc3QgY29udHJvbGxlckVuYWJsZWQgPSAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdzZXR0aW5ncy1jb250cm9sbGVyLWVuYWJsZWQnKTtcbiAgY29uc3QgYXV0b3BpblMgPSAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdzZXR0aW5ncy1hdXRvcGluLXMnKTtcbiAgY29uc3QgdGhlbWUgPSAkPEhUTUxTZWxlY3RFbGVtZW50Pignc2V0dGluZ3MtdGhlbWUnKTtcblxuICBpZiAocGxhdGZvcm0pICAgICAgICAgIHBsYXRmb3JtLnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVlTLnBsYXRmb3JtKSB8fCAnZXV3MSc7XG4gIGlmIChjb250cm9sbGVyRW5hYmxlZCkgY29udHJvbGxlckVuYWJsZWQuY2hlY2tlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5jb250cm9sbGVyRW5hYmxlZCkgIT09ICdmYWxzZSc7XG4gIGlmIChhdXRvcGluUykgICAgICAgICAgYXV0b3BpblMuY2hlY2tlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZUy5hdXRvcGluUykgPT09ICd0cnVlJztcbiAgaWYgKHRoZW1lKSB7XG4gICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWVMudGhlbWUpIHx8ICdkYXJrJztcbiAgICB0aGVtZS52YWx1ZSA9IHNhdmVkO1xuICAgIGFwcGx5VGhlbWUoc2F2ZWQpO1xuICB9XG5cbiAgLy8gQ2xlYW4gdXAgYW55IGxlZ2FjeSBcIlJpb3QgQVBJIGtleVwiIHZhbHVlIHRoYXQgb2xkZXIgYnVpbGRzIG1heSBoYXZlIGxlZnRcbiAgLy8gYmVoaW5kIGluIGxvY2FsU3RvcmFnZS4gRW5kIHVzZXJzIGRvIG5vdCAoYW5kIGNhbm5vdCkgaG9sZCBhIFJpb3QgQVBJIGtleVxuICAvLyDigJQgdGhlIHByb3h5IHVzZXMgb3VycyBzZXJ2ZXItc2lkZS5cbiAgdHJ5IHsgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Bpdm90dGZ0X3NldHRpbmdzX2FwaV9rZXknKTsgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XG59XG5cbmZ1bmN0aW9uIHBlcnNpc3RTZXR0aW5ncygpIHtcbiAgY29uc3QgcGxhdGZvcm0gPSAkPEhUTUxTZWxlY3RFbGVtZW50Pignc2V0dGluZ3MtcGxhdGZvcm0nKTtcbiAgY29uc3QgY29udHJvbGxlckVuYWJsZWQgPSAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdzZXR0aW5ncy1jb250cm9sbGVyLWVuYWJsZWQnKTtcbiAgY29uc3QgYXV0b3BpblMgPSAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdzZXR0aW5ncy1hdXRvcGluLXMnKTtcbiAgY29uc3QgdGhlbWUgPSAkPEhUTUxTZWxlY3RFbGVtZW50Pignc2V0dGluZ3MtdGhlbWUnKTtcblxuICBpZiAocGxhdGZvcm0pICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy5wbGF0Zm9ybSwgcGxhdGZvcm0udmFsdWUpO1xuICBpZiAoY29udHJvbGxlckVuYWJsZWQpIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy5jb250cm9sbGVyRW5hYmxlZCwgY29udHJvbGxlckVuYWJsZWQuY2hlY2tlZC50b1N0cmluZygpKTtcbiAgaWYgKGF1dG9waW5TKSAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWVMuYXV0b3BpblMsIGF1dG9waW5TLmNoZWNrZWQudG9TdHJpbmcoKSk7XG4gIGlmICh0aGVtZSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZUy50aGVtZSwgdGhlbWUudmFsdWUpO1xuICAgIGFwcGx5VGhlbWUodGhlbWUudmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldHVwSG90a2V5RGlzcGxheSgpIHtcbiAgLy8gUmVzb2x2ZSBhbmQgcHJldHR5LXByaW50IHRoZSBjdXJyZW50bHktYm91bmQgaG90a2V5IHZpYSBPdmVyd29sZidzIEFQSS5cbiAgLy8gR2V0QXNzaWduZWRIb3RrZXlSZXN1bHQgaXMgbG9vc2VseSB0eXBlZCBpbiBAb3ZlcndvbGYvdHlwZXM7IGNhc3QgdG8gYW55LlxuICBvdmVyd29sZi5zZXR0aW5ncy5ob3RrZXlzLmdldCgocmVzOiBhbnkpID0+IHtcbiAgICBpZiAoIXJlcz8uc3VjY2VzcyB8fCAhcmVzLmhvdGtleXMpIHJldHVybjtcbiAgICBjb25zdCBnYW1lSG90a2V5cyA9IHJlcy5ob3RrZXlzLmdhbWVzPy5bJzU0MjYnXSB8fCBbXTtcbiAgICBjb25zdCBnbG9iYWxIb3RrZXlzID0gcmVzLmhvdGtleXMuZ2xvYmFsIHx8IFtdO1xuICAgIGNvbnN0IGFsbCA9IFsuLi5nbG9iYWxIb3RrZXlzLCAuLi5nYW1lSG90a2V5c107XG4gICAgY29uc3QgdG9nZ2xlID0gYWxsLmZpbmQoKGg6IGFueSkgPT4gaC5uYW1lID09PSAncGl2b3R0ZnRfc2hvd2hpZGUnKTtcbiAgICBjb25zdCBlbCA9ICQoJ2hrLXRvZ2dsZScpO1xuICAgIGlmIChlbCkgZWwudGV4dENvbnRlbnQgPSB0b2dnbGU/LmJpbmRpbmcgfHwgJ05vdCBib3VuZCc7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXR1cENsb3NlQnV0dG9uKCkge1xuICBjb25zdCBidG4gPSAkKCdzZXR0aW5ncy1jbG9zZScpO1xuICBpZiAoIWJ0bikgcmV0dXJuO1xuICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgb3ZlcndvbGYud2luZG93cy5nZXRDdXJyZW50V2luZG93KChyZXMpID0+IHtcbiAgICAgIGlmIChyZXM/LnN1Y2Nlc3MgJiYgcmVzLndpbmRvdz8uaWQpIHtcbiAgICAgICAgb3ZlcndvbGYud2luZG93cy5jbG9zZShyZXMud2luZG93LmlkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldHVwVmVyc2lvbkRpc3BsYXkoKSB7XG4gIG92ZXJ3b2xmLmV4dGVuc2lvbnMuY3VycmVudC5nZXRNYW5pZmVzdCgocmVzOiBhbnkpID0+IHtcbiAgICBjb25zdCB2ZXJzaW9uID0gcmVzPy5tZXRhPy52ZXJzaW9uIHx8ICc/JztcbiAgICBjb25zdCBlbCA9ICQoJ3NldHRpbmdzLXZlcnNpb24nKTtcbiAgICBpZiAoZWwpIGVsLnRleHRDb250ZW50ID0gYFZlcnNpb246ICR7dmVyc2lvbn1gO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0dXBBdXRvU2F2ZSgpIHtcbiAgLy8gRGVib3VuY2VkIHNhdmUgb24gaW5wdXQvY2hhbmdlIHNvIHVzZXIgZG9lc24ndCBuZWVkIGEgU2F2ZSBidXR0b24uXG4gIGxldCB0aW1lcjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIGNvbnN0IHF1ZXVlID0gKCkgPT4ge1xuICAgIGlmICh0aW1lcikgd2luZG93LmNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChwZXJzaXN0U2V0dGluZ3MsIDI1MCk7XG4gIH07XG4gIFsnc2V0dGluZ3MtcGxhdGZvcm0nLCAnc2V0dGluZ3MtY29udHJvbGxlci1lbmFibGVkJywgJ3NldHRpbmdzLWF1dG9waW4tcycsICdzZXR0aW5ncy10aGVtZSddXG4gICAgLmZvckVhY2goaWQgPT4gJChpZCk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHF1ZXVlKSk7XG59XG5cbmZ1bmN0aW9uIHNldHVwQ29udHJpYnV0ZVRvZ2dsZSgpIHtcbiAgY29uc3QgY2hlY2tib3ggPSAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdzZXR0aW5ncy1jb250cmlidXRlLXNuYXBzaG90cycpO1xuICBjb25zdCBjb3VudEVsID0gJCgnc2V0dGluZ3MtY29udHJpYnV0ZWQtY291bnQnKTtcbiAgaWYgKCFjaGVja2JveCkgcmV0dXJuO1xuICBjaGVja2JveC5jaGVja2VkID0gU25hcHNob3RVcGxvYWRlci5pc09wdGVkSW4oKTtcbiAgaWYgKGNvdW50RWwpIGNvdW50RWwudGV4dENvbnRlbnQgPSBgJHtTbmFwc2hvdFVwbG9hZGVyLmdldENvbnRyaWJ1dGVkQ291bnQoKX0gZ2FtZXMgY29udHJpYnV0ZWQuYDtcbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIFNuYXBzaG90VXBsb2FkZXIuc2V0T3B0SW4oY2hlY2tib3guY2hlY2tlZCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXR1cExjdVRlc3QoKSB7XG4gIGNvbnN0IGJ0biA9ICQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdzZXR0aW5ncy10ZXN0LWxjdScpO1xuICBjb25zdCBzdGF0dXMgPSAkKCdzZXR0aW5ncy1sY3Utc3RhdHVzJyk7XG4gIGlmICghYnRuIHx8ICFzdGF0dXMpIHJldHVybjtcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgc3RhdHVzLnRleHRDb250ZW50ID0gJ0NoZWNraW5n4oCmJztcbiAgICBzdGF0dXMuY2xhc3NOYW1lID0gJ3NldHRpbmdzLXN0YXR1cyBwZW5kaW5nJztcbiAgICB0cnkge1xuICAgICAgY29uc3Qgb2sgPSBhd2FpdCBpc0xjdVJlYWNoYWJsZSgpO1xuICAgICAgaWYgKG9rKSB7XG4gICAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICfinJMgQ29ubmVjdGVkIHRvIExlYWd1ZSBjbGllbnQuJztcbiAgICAgICAgc3RhdHVzLmNsYXNzTmFtZSA9ICdzZXR0aW5ncy1zdGF0dXMgb2snO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gJ+KclSBDb3VsZCBub3QgcmVhY2ggTGVhZ3VlIGNsaWVudC4gSXMgaXQgcnVubmluZz8nO1xuICAgICAgICBzdGF0dXMuY2xhc3NOYW1lID0gJ3NldHRpbmdzLXN0YXR1cyBlcnInO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IGDinJUgRXJyb3I6ICR7KGUgYXMgRXJyb3IpLm1lc3NhZ2V9YDtcbiAgICAgIHN0YXR1cy5jbGFzc05hbWUgPSAnc2V0dGluZ3Mtc3RhdHVzIGVycic7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldHVwQXV0b0xpbmsoKSB7XG4gIGNvbnN0IGJ0biA9ICQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdzZXR0aW5ncy1hdXRvbGluaycpO1xuICBjb25zdCBzdGF0dXMgPSAkKCdzZXR0aW5ncy1hdXRvbGluay1zdGF0dXMnKTtcbiAgaWYgKCFidG4gfHwgIXN0YXR1cykgcmV0dXJuO1xuICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnUmVhZGluZyBMb0wgY2xpZW504oCmJztcbiAgICBzdGF0dXMuY2xhc3NOYW1lID0gJ3NldHRpbmdzLXN0YXR1cyBwZW5kaW5nJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYXV0b0xpbmtGcm9tTGN1KCk7XG4gICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAn4pyVIENvdWxkIG5vdCByZWFkIHN1bW1vbmVyIGluZm8uIElzIHRoZSBMb0wgY2xpZW50IG9wZW4/JztcbiAgICAgICAgc3RhdHVzLmNsYXNzTmFtZSA9ICdzZXR0aW5ncy1zdGF0dXMgZXJyJztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gVXBkYXRlIHBsYXRmb3JtIHNlbGVjdCB0byBtYXRjaFxuICAgICAgY29uc3QgcGxhdGZvcm1TZWwgPSAkPEhUTUxTZWxlY3RFbGVtZW50Pignc2V0dGluZ3MtcGxhdGZvcm0nKTtcbiAgICAgIGlmIChwbGF0Zm9ybVNlbCkge1xuICAgICAgICBwbGF0Zm9ybVNlbC52YWx1ZSA9IHJlc3VsdC5wbGF0Zm9ybUlkO1xuICAgICAgICBwbGF0Zm9ybVNlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpO1xuICAgICAgfVxuXG4gICAgICAvLyBQZXJzaXN0IGxpbmtlZCBhY2NvdW50IHVzaW5nIHRoZSBzYW1lIGtleSB0aGUgUHJvZmlsZSB0YWIgcmVhZHNcbiAgICAgIGNvbnN0IGxpbmtlZEFjY291bnQgPSB7XG4gICAgICAgIGdhbWVOYW1lOiByZXN1bHQuc3VtbW9uZXIuZ2FtZU5hbWUgfHwgcmVzdWx0LnN1bW1vbmVyLmRpc3BsYXlOYW1lLFxuICAgICAgICB0YWdMaW5lOiAgcmVzdWx0LnN1bW1vbmVyLnRhZ0xpbmUsXG4gICAgICAgIHBsYXRmb3JtOiByZXN1bHQucGxhdGZvcm1JZCxcbiAgICAgIH07XG4gICAgICB0cnkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGl2b3R0ZnRfbGlua2VkX2FjY291bnQnLCBKU09OLnN0cmluZ2lmeShsaW5rZWRBY2NvdW50KSk7XG4gICAgICB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cblxuICAgICAgY29uc3QgcmFuayA9IHJlc3VsdC5yYW5rXG4gICAgICAgID8gYCDCtyAke3Jlc3VsdC5yYW5rLnRpZXJ9ICR7cmVzdWx0LnJhbmsuZGl2aXNpb259ICR7cmVzdWx0LnJhbmsubGVhZ3VlUG9pbnRzfSBMUGBcbiAgICAgICAgOiAnJztcbiAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IGDinJMgTGlua2VkOiAke2xpbmtlZEFjY291bnQuZ2FtZU5hbWV9IyR7bGlua2VkQWNjb3VudC50YWdMaW5lfSAoJHtyZXN1bHQucGxhdGZvcm1JZC50b1VwcGVyQ2FzZSgpfSkke3Jhbmt9YDtcbiAgICAgIHN0YXR1cy5jbGFzc05hbWUgPSAnc2V0dGluZ3Mtc3RhdHVzIG9rJztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSBg4pyVICR7KGUgYXMgRXJyb3IpLm1lc3NhZ2V9YDtcbiAgICAgIHN0YXR1cy5jbGFzc05hbWUgPSAnc2V0dGluZ3Mtc3RhdHVzIGVycic7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckFjY291bnRTZWN0aW9uKCkge1xuICBjb25zdCBzdGF0dXNFbCA9ICQoJ3NldHRpbmdzLWFjY291bnQtc3RhdHVzJyk7XG4gIGNvbnN0IHNpZ25JbkJ0biA9ICQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdzZXR0aW5ncy1zaWduaW4nKTtcbiAgY29uc3Qgc2lnbk91dEJ0biA9ICQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdzZXR0aW5ncy1zaWdub3V0Jyk7XG4gIGNvbnN0IGFkbWluQnRuID0gJDxIVE1MQnV0dG9uRWxlbWVudD4oJ3NldHRpbmdzLW9wZW4tYWRtaW4nKTtcbiAgaWYgKCFzdGF0dXNFbCB8fCAhc2lnbkluQnRuIHx8ICFzaWduT3V0QnRuIHx8ICFhZG1pbkJ0bikgcmV0dXJuO1xuXG4gIGlmICghaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICBzdGF0dXNFbC50ZXh0Q29udGVudCA9ICdOb3Qgc2lnbmVkIGluLic7XG4gICAgc3RhdHVzRWwuY2xhc3NOYW1lID0gJ3NldHRpbmdzLXN0YXR1cyc7XG4gICAgc2lnbkluQnRuLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICBzaWduT3V0QnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgYWRtaW5CdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB1c2VyID0gZ2V0U3RvcmVkVXNlcigpO1xuICBpZiAoIXVzZXIpIHJldHVybjtcbiAgc3RhdHVzRWwuaW5uZXJIVE1MID0gYFNpZ25lZCBpbiBhcyA8c3Ryb25nPiR7dXNlci5lbWFpbH08L3N0cm9uZz4gKCR7dXNlci5yb2xlfSkuYDtcbiAgc3RhdHVzRWwuY2xhc3NOYW1lID0gJ3NldHRpbmdzLXN0YXR1cyBvayc7XG4gIHNpZ25JbkJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBzaWduT3V0QnRuLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgYWRtaW5CdG4uc3R5bGUuZGlzcGxheSA9IGhhc0F0TGVhc3QoJ21vZGVyYXRvcicpID8gJ2lubGluZS1ibG9jaycgOiAnbm9uZSc7XG59XG5cbmZ1bmN0aW9uIHNldHVwQWNjb3VudEFjdGlvbnMoKSB7XG4gICQoJ3NldHRpbmdzLXNpZ25pbicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBvdmVyd29sZi53aW5kb3dzLm9idGFpbkRlY2xhcmVkV2luZG93KGtXaW5kb3dOYW1lcy5sb2dpbiwgKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcz8uc3VjY2VzcyAmJiByZXMud2luZG93Py5pZCkgb3ZlcndvbGYud2luZG93cy5yZXN0b3JlKHJlcy53aW5kb3cuaWQpO1xuICAgIH0pO1xuICB9KTtcbiAgJCgnc2V0dGluZ3Mtb3Blbi1hZG1pbicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBvdmVyd29sZi53aW5kb3dzLm9idGFpbkRlY2xhcmVkV2luZG93KGtXaW5kb3dOYW1lcy5hZG1pbiwgKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcz8uc3VjY2VzcyAmJiByZXMud2luZG93Py5pZCkgb3ZlcndvbGYud2luZG93cy5yZXN0b3JlKHJlcy53aW5kb3cuaWQpO1xuICAgIH0pO1xuICB9KTtcbiAgJCgnc2V0dGluZ3Mtc2lnbm91dCcpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBsb2dvdXQoKTtcbiAgICByZW5kZXJBY2NvdW50U2VjdGlvbigpO1xuICB9KTtcblxuICAvLyBSZWZyZXNoIHJvbGUvcHJvZmlsZSBmcm9tIGJhY2tlbmQgb24gb3BlbiAoY2F0Y2hlcyByb2xlIGNoYW5nZXMgbWFkZVxuICAvLyB2aWEgZGlyZWN0IERCIHVwZGF0ZSBieSBhbm90aGVyIGFkbWluKS5cbiAgaWYgKGlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgcmVmcmVzaE1lKCkudGhlbihyZW5kZXJBY2NvdW50U2VjdGlvbikuY2F0Y2goKCkgPT4geyAvKiBzaWxlbnQgKi8gfSk7XG4gIH1cblxuICAvLyBSZS1yZW5kZXIgd2hlbmV2ZXIgdGhlIHNlc3Npb24gY2hhbmdlcyAob3RoZXIgd2luZG93IGxvZ3MgaW4vb3V0KVxuICBvbkF1dGhDaGFuZ2UocmVuZGVyQWNjb3VudFNlY3Rpb24pO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgbG9hZFNldHRpbmdzKCk7XG4gIHNldHVwQXV0b1NhdmUoKTtcbiAgc2V0dXBDbG9zZUJ1dHRvbigpO1xuICBzZXR1cFZlcnNpb25EaXNwbGF5KCk7XG4gIHNldHVwSG90a2V5RGlzcGxheSgpO1xuICBzZXR1cExjdVRlc3QoKTtcbiAgc2V0dXBBdXRvTGluaygpO1xuICByZW5kZXJBY2NvdW50U2VjdGlvbigpO1xuICBzZXR1cEFjY291bnRBY3Rpb25zKCk7XG4gIHNldHVwQ29udHJpYnV0ZVRvZ2dsZSgpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=