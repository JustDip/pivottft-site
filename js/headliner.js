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

/***/ "./src/services/MatchTracker.ts":
/*!**************************************!*\
  !*** ./src/services/MatchTracker.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchTracker = void 0;
const SnapshotUploader_1 = __webpack_require__(/*! ./SnapshotUploader */ "./src/services/SnapshotUploader.ts");
const consts_1 = __webpack_require__(/*! ../consts */ "./src/consts.ts");
const EMPTY_STATE = {
    inMatch: false,
    matchId: null,
    stage: '-',
    roundType: '',
    level: 0,
    gold: 0,
    health: 100,
    streak: 0,
    augments: [],
    units: [],
    lastPlacement: null,
};
class MatchTracker {
    constructor() {
        this._state = Object.assign({}, EMPTY_STATE);
        this._listeners = [];
        this._snapshots = [];
        this._lastSnapshotStage = '';
    }
    static instance() {
        if (!this._instance)
            this._instance = new MatchTracker();
        return this._instance;
    }
    getState() {
        return Object.assign({}, this._state);
    }
    onStateChange(cb) {
        this._listeners.push(cb);
        cb(this.getState());
        return () => {
            this._listeners = this._listeners.filter(l => l !== cb);
        };
    }
    emit() {
        const snapshot = this.getState();
        for (const cb of this._listeners) {
            try {
                cb(snapshot);
            }
            catch (e) {
                console.warn('[MatchTracker] listener error', e);
            }
        }
    }
    handleInfoUpdate(update) {
        if (!update || !update.info)
            return;
        const info = update.info;
        let changed = false;
        if (info.game_info) {
            const gi = info.game_info;
            if (gi.level !== undefined) {
                const n = Number(gi.level);
                if (!Number.isNaN(n) && n !== this._state.level) {
                    this._state.level = n;
                    changed = true;
                }
            }
            if (gi.gold !== undefined) {
                const n = Number(gi.gold);
                if (!Number.isNaN(n) && n !== this._state.gold) {
                    this._state.gold = n;
                    changed = true;
                }
            }
            if (gi.health !== undefined) {
                const n = Number(gi.health);
                if (!Number.isNaN(n) && n !== this._state.health) {
                    this._state.health = n;
                    changed = true;
                }
            }
            if (gi.win_streak !== undefined || gi.loss_streak !== undefined) {
                const w = Number(gi.win_streak || 0);
                const l = Number(gi.loss_streak || 0);
                const streak = w > 0 ? w : -l;
                if (streak !== this._state.streak) {
                    this._state.streak = streak;
                    changed = true;
                }
            }
        }
        if (info.match_info) {
            const mi = info.match_info;
            if (mi.pseudo_match_id && String(mi.pseudo_match_id) !== this._state.matchId) {
                this._state.matchId = String(mi.pseudo_match_id);
                changed = true;
            }
            if (mi.stage && String(mi.stage) !== this._state.stage) {
                this._state.stage = String(mi.stage);
                changed = true;
            }
            if (mi.round_type && String(mi.round_type) !== this._state.roundType) {
                this._state.roundType = String(mi.round_type);
                changed = true;
            }
            if (mi.placement !== undefined) {
                const p = Number(mi.placement);
                if (!Number.isNaN(p) && p > 0) {
                    this._state.lastPlacement = p;
                    changed = true;
                }
            }
        }
        if (info.augments) {
            const augments = this.parseAugments(info.augments);
            if (augments && JSON.stringify(augments) !== JSON.stringify(this._state.augments)) {
                this._state.augments = augments;
                changed = true;
            }
        }
        if (info.board) {
            const units = this.parseUnits(info.board);
            if (units && JSON.stringify(units) !== JSON.stringify(this._state.units)) {
                this._state.units = units;
                changed = true;
            }
        }
        if (!this._state.inMatch && (this._state.level > 0 || this._state.stage !== '-')) {
            this._state.inMatch = true;
            changed = true;
        }
        if (changed) {
            if (this._state.stage !== this._lastSnapshotStage && this._state.stage !== '-') {
                this._snapshots.push({
                    ts: Date.now(),
                    stage: this._state.stage,
                    level: this._state.level,
                    gold: this._state.gold,
                    health: this._state.health,
                    streak: this._state.streak,
                    units: this._state.units.map(u => (Object.assign({}, u))),
                });
                this._lastSnapshotStage = this._state.stage;
            }
            this.emit();
        }
    }
    handleNewEvents(e) {
        if (!e || !Array.isArray(e.events))
            return;
        for (const event of e.events) {
            switch (event.name) {
                case 'match_start':
                    this.reset();
                    this._state.inMatch = true;
                    this.emit();
                    break;
                case 'match_end':
                    this._state.inMatch = false;
                    this.persistMatch();
                    this.emit();
                    break;
                case 'match_info_placement':
                    if (event.data) {
                        const p = Number(event.data);
                        if (!Number.isNaN(p)) {
                            this._state.lastPlacement = p;
                            this.emit();
                        }
                    }
                    break;
            }
        }
    }
    persistMatch() {
        try {
            const raw = localStorage.getItem('pivottft_match_history');
            const history = raw ? JSON.parse(raw) : [];
            history.unshift({
                endedAt: Date.now(),
                matchId: this._state.matchId,
                placement: this._state.lastPlacement,
                level: this._state.level,
                stage: this._state.stage,
                augments: [...this._state.augments],
                snapshots: [...this._snapshots],
            });
            localStorage.setItem('pivottft_match_history', JSON.stringify(history.slice(0, 50)));
        }
        catch (e) {
            console.warn('[MatchTracker] persist failed', e);
        }
        try {
            if (!this._state.matchId)
                return;
            const region = consts_1.kRiotApiConfig.platform;
            const finalUnits = this._state.units.map(u => ({
                character_id: u.name,
                tier: u.tier,
                items: u.items,
            }));
            void SnapshotUploader_1.SnapshotUploader.tryUpload({
                matchId: this._state.matchId,
                region,
                patch: consts_1.kCurrentTftPatch,
                tftSet: consts_1.kCurrentTftSetNumber,
                finalPlacement: this._state.lastPlacement,
                finalLevel: this._state.level || null,
                finalUnits,
                finalTraits: [],
                finalAugments: [...this._state.augments],
                snapshots: this._snapshots.map(s => ({
                    stage: s.stage,
                    level: s.level,
                    gold: s.gold,
                    health: s.health,
                    streak: s.streak,
                    units: s.units.map(u => ({ name: u.name, tier: u.tier, items: u.items })),
                })),
            });
        }
        catch (e) {
            console.warn('[MatchTracker] upload kickoff failed', e);
        }
    }
    reset() {
        this._state = Object.assign(Object.assign({}, EMPTY_STATE), { inMatch: true });
        this._snapshots = [];
        this._lastSnapshotStage = '';
    }
    parseAugments(raw) {
        try {
            const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
            if (Array.isArray(parsed))
                return parsed.map(a => String(a));
            if (parsed && Array.isArray(parsed.augments))
                return parsed.augments.map((a) => String(a));
            return null;
        }
        catch (_a) {
            return null;
        }
    }
    parseUnits(raw) {
        try {
            const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
            if (!parsed)
                return null;
            const list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.units) ? parsed.units : null);
            if (!list)
                return null;
            return list.map((u) => ({
                name: String(u.name || u.character_id || u.id || '?'),
                tier: Number(u.tier || u.star || 1),
                items: Array.isArray(u.items) ? u.items.map(String) : undefined,
            }));
        }
        catch (_a) {
            return null;
        }
    }
}
exports.MatchTracker = MatchTracker;


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
/*!************************************!*\
  !*** ./src/headliner/headliner.ts ***!
  \************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const MatchTracker_1 = __webpack_require__(/*! ../services/MatchTracker */ "./src/services/MatchTracker.ts");
const ROUND_SECONDS = {
    PVE: 30,
    PVP: 30,
    Carousel: 30,
    Augment_1: 50,
    Augment_2: 50,
    Augment_3: 50,
    Portal: 30,
    default: 30,
};
let stageStartTs = 0;
let stageDuration = 30;
function closeWindow() {
    overwolf.windows.getCurrentWindow(res => {
        var _a;
        if ((res === null || res === void 0 ? void 0 : res.success) && ((_a = res.window) === null || _a === void 0 ? void 0 : _a.id))
            overwolf.windows.close(res.window.id);
    });
}
function formatTime(seconds) {
    if (seconds < 0)
        seconds = 0;
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
}
function tick() {
    const stageEl = document.getElementById('hd-stage');
    const timerEl = document.getElementById('hd-timer');
    if (!stageEl || !timerEl)
        return;
    const state = MatchTracker_1.MatchTracker.instance().getState();
    if (!state.inMatch) {
        stageEl.textContent = '—';
        timerEl.textContent = '--:--';
        const noteEl = document.getElementById('hd-note');
        if (noteEl)
            noteEl.textContent = 'Waiting for match…';
        return;
    }
    stageEl.textContent = state.stage || '?';
    const noteEl = document.getElementById('hd-note');
    if (noteEl)
        noteEl.textContent = `Lv ${state.level} · ${state.gold}g · ${state.health} HP`;
    const stageType = inferStageType(state.stage);
    const expected = ROUND_SECONDS[stageType] || ROUND_SECONDS.default;
    if (Math.abs(expected - stageDuration) > 0.1 || stageStartTs === 0) {
        stageDuration = expected;
        stageStartTs = Date.now();
    }
    const elapsed = (Date.now() - stageStartTs) / 1000;
    const remaining = Math.max(0, stageDuration - elapsed);
    timerEl.textContent = formatTime(remaining);
    timerEl.classList.toggle('hd-urgent', remaining > 0 && remaining < 5);
}
function inferStageType(stage) {
    if (!stage)
        return 'default';
    const s = stage.toLowerCase();
    if (s.includes('carousel'))
        return 'Carousel';
    if (s.includes('augment'))
        return 'Augment_1';
    if (s.includes('portal'))
        return 'Portal';
    if (s.includes('combat'))
        return 'PVP';
    if (s.includes('minions') || s.includes('pve'))
        return 'PVE';
    return 'default';
}
window.addEventListener('DOMContentLoaded', () => {
    var _a;
    (_a = document.getElementById('hd-close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', closeWindow);
    MatchTracker_1.MatchTracker.instance().onStateChange((state) => {
        if (!state.inMatch) {
            stageStartTs = 0;
            stageDuration = ROUND_SECONDS.default;
        }
    });
    setInterval(tick, 200);
    tick();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsS0FBSyxDQUFDO1FBR3BCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLElBQUksRUFBRSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQzFCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtvQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFBRTthQUM1RjtZQUNELElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQ3pCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtvQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7b0JBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFBRTthQUMxRjtZQUNELElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQzNCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtvQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFBRTth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UUFBUSxDQUFDLFFBQVEsQ0FBQztRQUFRLE9BQU8sS0FBSyxDQUFDO0lBQzdDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzdELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFOztJQUMvQyxjQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFHNUUsMkJBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNsQixZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLGFBQWEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFHSCxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9jb25zdHMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvc2VydmljZXMvQXV0aFNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvc2VydmljZXMvTWF0Y2hUcmFja2VyLnRzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL3NlcnZpY2VzL1NuYXBzaG90VXBsb2FkZXIudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvaGVhZGxpbmVyL2hlYWRsaW5lci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBQaXZvdFRGVCDigJQgVEZUIEdhbWUgRXZlbnRzIEZlYXR1cmVzXHJcbi8vIEdhbWUgSUQgNTQyNiA9IExlYWd1ZSBvZiBMZWdlbmRzIGNsaWVudCAod2hpY2ggVEZUIHJ1bnMgaW5zaWRlKVxyXG4vLyBURlQtc3BlY2lmaWMgZXZlbnRzIHVzZSBpbnRlcm5hbCBHYW1lIElEIDIxNTcwLCBidXQgd2UgcmVnaXN0ZXIgd2l0aCA1NDI2XHJcbmV4cG9ydCBjb25zdCBrR2FtZXNGZWF0dXJlcyA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmdbXT4oW1xyXG4gIFtcclxuICAgIDU0MjYsXHJcbiAgICBbXHJcbiAgICAgICdtYXRjaF9pbmZvJyxcclxuICAgICAgJ2JvYXJkJyxcclxuICAgICAgJ2JlbmNoJyxcclxuICAgICAgJ3N0b3JlJyxcclxuICAgICAgJ2Nhcm91c2VsJyxcclxuICAgICAgJ2dhbWVfaW5mbycsXHJcbiAgICAgICdhdWdtZW50cycsXHJcbiAgICAgICdsaXZlX2NsaWVudF9kYXRhJ1xyXG4gICAgXVxyXG4gIF0sXHJcbl0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGtHYW1lQ2xhc3NJZHMgPSBBcnJheS5mcm9tKGtHYW1lc0ZlYXR1cmVzLmtleXMoKSk7XHJcblxyXG5leHBvcnQgY29uc3Qga1dpbmRvd05hbWVzID0ge1xyXG4gIGluR2FtZTogJ2luX2dhbWUnLFxyXG4gIGRlc2t0b3A6ICdkZXNrdG9wJyxcclxuICBzZXR0aW5nczogJ3NldHRpbmdzJyxcclxuICBpbmdhbWVDb250cm9sbGVyOiAnaW5nYW1lX2NvbnRyb2xsZXInLFxyXG4gIG1hdGNodXBzOiAnbWF0Y2h1cHMnLFxyXG4gIGxvZ2luOiAnbG9naW4nLFxyXG4gIGFkbWluOiAnYWRtaW4nLFxyXG4gIGhlYWRsaW5lcjogJ2hlYWRsaW5lcicsXHJcbiAgcmVwbGF5OiAncmVwbGF5JyxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBrSG90a2V5cyA9IHtcclxuICB0b2dnbGU6ICdwaXZvdHRmdF9zaG93aGlkZSdcclxufTtcclxuXHJcbi8vIFRGVCBHYW1lIElEIGZvciBldmVudCByZWdpc3RyYXRpb25cclxuZXhwb3J0IGNvbnN0IGtURlRDbGFzc0lkID0gNTQyNjtcclxuXHJcbi8vIFJpb3QgQVBJIENvbmZpZ3VyYXRpb25cclxuZXhwb3J0IGNvbnN0IGtSaW90QXBpQ29uZmlnID0ge1xyXG4gIGFwaUtleTogJycsXHJcbiAgcmVnaW9uOiAnZXVyb3BlJyBhcyBjb25zdCwgICAgICAgLy8gYW1lcmljYXMgfCBldXJvcGUgfCBhc2lhIChhY2NvdW50LXYxLCBtYXRjaC12MSlcclxuICBwbGF0Zm9ybTogJ2V1bjEnLCAgICAgICAgICAgICAgICAvLyBldXcxLCBldW4xLCBuYTEsIGtyLCAuLi4gKHN1bW1vbmVyL2xlYWd1ZSlcclxufTtcclxuXHJcbi8vIEJhY2tlbmQgYmFzZSBVUkwuIEluIHByb2R1Y3Rpb24gcm91dGVzIHRocm91Z2ggQ2xvdWRmbGFyZSBXb3JrZXIgYXRcclxuLy8gYXBpLnBpdm90dGZ0LmNvbSAoUmlvdCBBUEkgcHJveHkgKyBhdXRoICsgY29tcHMgYmFja2VuZCkuIE92ZXJyaWRlIHRvXHJcbi8vIGh0dHA6Ly8xMjcuMC4wLjE6ODc4NyBkdXJpbmcgbG9jYWwgYHdyYW5nbGVyIGRldmAgZGV2ZWxvcG1lbnQuXHJcbmV4cG9ydCBjb25zdCBrUmlvdEFwaUJhc2VVcmwgPSAnaHR0cHM6Ly9hcGkucGl2b3R0ZnQuY29tJztcclxuXHJcbi8vIEN1cnJlbnQgVEZUIGluLXNldCBwYXRjaCArIHNldCBudW1iZXIuIEJ1bXAgdGhlc2UgdG9nZXRoZXIgd2l0aCB0aGVcclxuLy8gYFBBVENIRVNgIGFycmF5cyBpbiBMaXZlTWV0YVJlbmRlcmVyLnRzICsgVHJlbmRzUmVuZGVyZXIudHMgZXZlcnkgdGltZVxyXG4vLyBhIG5ldyBURlQgcGF0Y2ggc2hpcHMuIFVzZWQgYnkgU25hcHNob3RVcGxvYWRlciBzbyB1cGxvYWRlZCBzbmFwc2hvdHNcclxuLy8gbGFuZCBpbiB0aGUgcmlnaHQgc2xpY2Ugd2l0aG91dCBkZXBlbmRpbmcgb24gUmlvdCdzIGBnYW1lX3ZlcnNpb25gXHJcbi8vIHN0cmluZyBwYXJzaW5nLlxyXG5leHBvcnQgY29uc3Qga0N1cnJlbnRUZnRQYXRjaCA9ICcxNy4zJztcclxuZXhwb3J0IGNvbnN0IGtDdXJyZW50VGZ0U2V0TnVtYmVyID0gMTc7XHJcblxyXG5cclxuLy8gUGxhdGZvcm0g4oaSIHJlZ2lvbmFsIHJvdXRpbmcgbWFwIChmb3IgYWNjb3VudC9tYXRjaCBlbmRwb2ludHMpXHJcbmV4cG9ydCBjb25zdCBrUGxhdGZvcm1Ub1JlZ2lvbjogUmVjb3JkPHN0cmluZywgJ2FtZXJpY2FzJyB8ICdldXJvcGUnIHwgJ2FzaWEnPiA9IHtcclxuICAnZXV3MSc6ICdldXJvcGUnLCAnZXVuMSc6ICdldXJvcGUnLCAndHIxJzogJ2V1cm9wZScsICdydSc6ICdldXJvcGUnLFxyXG4gICduYTEnOiAnYW1lcmljYXMnLCAnYnIxJzogJ2FtZXJpY2FzJywgJ2xhMSc6ICdhbWVyaWNhcycsICdsYTInOiAnYW1lcmljYXMnLFxyXG4gICdrcic6ICdhc2lhJywgJ2pwMSc6ICdhc2lhJywgJ29jMSc6ICdhc2lhJywgJ3BoMic6ICdhc2lhJyxcclxuICAnc2cyJzogJ2FzaWEnLCAndGgyJzogJ2FzaWEnLCAndHcyJzogJ2FzaWEnLCAndm4yJzogJ2FzaWEnLFxyXG59O1xyXG4iLCIvLyBBdXRoU2VydmljZSDigJQgdGhpbiBjbGllbnQgZm9yIHRoZSBDbG91ZGZsYXJlIFdvcmtlciAvYXV0aCBlbmRwb2ludHMuXG4vL1xuLy8gVG9rZW4gaXMga2VwdCBpbiBsb2NhbFN0b3JhZ2UuIENvbXBvbmVudHMgdGhhdCBjYXJlIGFib3V0IGxvZ2luIHN0YXRlIGNhblxuLy8gZWl0aGVyIGNhbGwgZ2V0Q3VycmVudFVzZXIoKSBvbmNlIG9uIG1vdW50LCBvciBzdWJzY3JpYmUgdmlhIG9uQ2hhbmdlKCkuXG5cbmltcG9ydCB7IGtSaW90QXBpQmFzZVVybCB9IGZyb20gJy4uL2NvbnN0cyc7XG5cbmV4cG9ydCB0eXBlIFVzZXJSb2xlID0gJ3VzZXInIHwgJ21vZGVyYXRvcicgfCAnYWRtaW4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXIge1xuICBpZDogbnVtYmVyO1xuICBlbWFpbDogc3RyaW5nO1xuICByb2xlOiBVc2VyUm9sZTtcbiAgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGw7XG59XG5cbmludGVyZmFjZSBBdXRoUmVzcG9uc2Uge1xuICB0b2tlbjogc3RyaW5nO1xuICB1c2VyOiBVc2VyO1xufVxuXG5jb25zdCBTVE9SQUdFX1RPS0VOID0gJ3Bpdm90dGZ0X2F1dGhfdG9rZW4nO1xuY29uc3QgU1RPUkFHRV9VU0VSID0gJ3Bpdm90dGZ0X2F1dGhfdXNlcic7XG5cbnR5cGUgTGlzdGVuZXIgPSAodXNlcjogVXNlciB8IG51bGwpID0+IHZvaWQ7XG5jb25zdCBsaXN0ZW5lcnMgPSBuZXcgU2V0PExpc3RlbmVyPigpO1xuXG5mdW5jdGlvbiBlbWl0KCk6IHZvaWQge1xuICBjb25zdCB1c2VyID0gZ2V0U3RvcmVkVXNlcigpO1xuICBsaXN0ZW5lcnMuZm9yRWFjaChsID0+IHtcbiAgICB0cnkgeyBsKHVzZXIpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoJ1tBdXRoU2VydmljZV0gbGlzdGVuZXIgdGhyZXc6JywgZSk7IH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb2tlbigpOiBzdHJpbmcgfCBudWxsIHtcbiAgdHJ5IHsgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfVE9LRU4pOyB9IGNhdGNoIHsgcmV0dXJuIG51bGw7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0b3JlZFVzZXIoKTogVXNlciB8IG51bGwge1xuICB0cnkge1xuICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfVVNFUik7XG4gICAgcmV0dXJuIHJhdyA/IEpTT04ucGFyc2UocmF3KSBhcyBVc2VyIDogbnVsbDtcbiAgfSBjYXRjaCB7IHJldHVybiBudWxsOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0F1dGhlbnRpY2F0ZWQoKTogYm9vbGVhbiB7XG4gIHJldHVybiAhIWdldFRva2VuKCkgJiYgISFnZXRTdG9yZWRVc2VyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FkbWluKCk6IGJvb2xlYW4ge1xuICBjb25zdCB1ID0gZ2V0U3RvcmVkVXNlcigpO1xuICByZXR1cm4gISF1ICYmIHUucm9sZSA9PT0gJ2FkbWluJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0F0TGVhc3Qocm9sZTogVXNlclJvbGUpOiBib29sZWFuIHtcbiAgY29uc3QgdSA9IGdldFN0b3JlZFVzZXIoKTtcbiAgaWYgKCF1KSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHJhbms6IFJlY29yZDxVc2VyUm9sZSwgbnVtYmVyPiA9IHsgdXNlcjogMSwgbW9kZXJhdG9yOiAyLCBhZG1pbjogMyB9O1xuICByZXR1cm4gcmFua1t1LnJvbGVdID49IHJhbmtbcm9sZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNoYW5nZShsaXN0ZW5lcjogTGlzdGVuZXIpOiAoKSA9PiB2b2lkIHtcbiAgbGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XG4gIHJldHVybiAoKSA9PiBsaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcbn1cblxuZnVuY3Rpb24gc2V0U2Vzc2lvbihyZXM6IEF1dGhSZXNwb25zZSk6IHZvaWQge1xuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfVE9LRU4sIHJlcy50b2tlbik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9VU0VSLCBKU09OLnN0cmluZ2lmeShyZXMudXNlcikpO1xuICB9IGNhdGNoIHsgLyogcXVvdGEgZXRjIOKAlCBzaWxlbnQgKi8gfVxuICBlbWl0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlc3Npb24oKTogdm9pZCB7XG4gIHRyeSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9UT0tFTik7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9VU0VSKTtcbiAgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XG4gIGVtaXQoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcG9zdEpzb248VD4ocGF0aDogc3RyaW5nLCBib2R5OiB1bmtub3duKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHVybCA9IGAke2tSaW90QXBpQmFzZVVybH0ke3BhdGh9YDtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gIH0pO1xuICBsZXQgcGF5bG9hZDogYW55O1xuICB0cnkgeyBwYXlsb2FkID0gYXdhaXQgcmVzLmpzb24oKTsgfSBjYXRjaCB7IHBheWxvYWQgPSB7IGVycm9yOiByZXMuc3RhdHVzVGV4dCB9OyB9XG4gIGlmICghcmVzLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQ/LmVycm9yIHx8IGBIVFRQICR7cmVzLnN0YXR1c31gKTtcbiAgfVxuICByZXR1cm4gcGF5bG9hZCBhcyBUO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRKc29uPFQ+KHBhdGg6IHN0cmluZywgdG9rZW4/OiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHVybCA9IGAke2tSaW90QXBpQmFzZVVybH0ke3BhdGh9YDtcbiAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICBpZiAodG9rZW4pIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHsgaGVhZGVycyB9KTtcbiAgbGV0IHBheWxvYWQ6IGFueTtcbiAgdHJ5IHsgcGF5bG9hZCA9IGF3YWl0IHJlcy5qc29uKCk7IH0gY2F0Y2ggeyBwYXlsb2FkID0geyBlcnJvcjogcmVzLnN0YXR1c1RleHQgfTsgfVxuICBpZiAoIXJlcy5vaykgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQ/LmVycm9yIHx8IGBIVFRQICR7cmVzLnN0YXR1c31gKTtcbiAgcmV0dXJuIHBheWxvYWQgYXMgVDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGRpc3BsYXlOYW1lPzogc3RyaW5nKTogUHJvbWlzZTxVc2VyPiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHBvc3RKc29uPEF1dGhSZXNwb25zZT4oJy9hdXRoL3JlZ2lzdGVyJywgeyBlbWFpbCwgcGFzc3dvcmQsIGRpc3BsYXlOYW1lIH0pO1xuICBzZXRTZXNzaW9uKHJlcyk7XG4gIHJldHVybiByZXMudXNlcjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ2luKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcG9zdEpzb248QXV0aFJlc3BvbnNlPignL2F1dGgvbG9naW4nLCB7IGVtYWlsLCBwYXNzd29yZCB9KTtcbiAgc2V0U2Vzc2lvbihyZXMpO1xuICByZXR1cm4gcmVzLnVzZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQoKTogdm9pZCB7XG4gIGNsZWFyU2Vzc2lvbigpO1xufVxuXG4vKipcbiAqIFJlZnJlc2ggdXNlciBpbmZvIGZyb20gYmFja2VuZC4gVXNlZnVsIGFmdGVyIHJvbGUgY2hhbmdlcyBvciB0byBjb25maXJtXG4gKiB0b2tlbiB2YWxpZGl0eS4gQ2xlYXJzIHNlc3Npb24gb24gNDAxLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVmcmVzaE1lKCk6IFByb21pc2U8VXNlciB8IG51bGw+IHtcbiAgY29uc3QgdG9rZW4gPSBnZXRUb2tlbigpO1xuICBpZiAoIXRva2VuKSByZXR1cm4gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRKc29uPHsgdXNlcjogVXNlciB9PignL2F1dGgvbWUnLCB0b2tlbik7XG4gICAgdHJ5IHsgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9VU0VSLCBKU09OLnN0cmluZ2lmeShyZXMudXNlcikpOyB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbiAgICBlbWl0KCk7XG4gICAgcmV0dXJuIHJlcy51c2VyO1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICBpZiAoKGUubWVzc2FnZSB8fCAnJykuaW5jbHVkZXMoJ0hUVFAgNDAxJykpIGNsZWFyU2Vzc2lvbigpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogSGVscGVyIGZvciBhZG1pbi1vbmx5IGZldGNoZXMg4oCUIGF1dG9tYXRpY2FsbHkgYXR0YWNoZXMgQmVhcmVyIHRva2VuLlxuICogVGhyb3dzIGlmIG5vdCBsb2dnZWQgaW4uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZG1pbkZldGNoPFQ+KHBhdGg6IHN0cmluZywgaW5pdDogUmVxdWVzdEluaXQgPSB7fSk6IFByb21pc2U8VD4ge1xuICBjb25zdCB0b2tlbiA9IGdldFRva2VuKCk7XG4gIGlmICghdG9rZW4pIHRocm93IG5ldyBFcnJvcignTm90IGF1dGhlbnRpY2F0ZWQnKTtcbiAgY29uc3QgdXJsID0gYCR7a1Jpb3RBcGlCYXNlVXJsfSR7cGF0aH1gO1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAuLi5pbml0LFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIC4uLihpbml0LmhlYWRlcnMgfHwge30pLFxuICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIC4uLihpbml0LmJvZHkgPyB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSA6IHt9KSxcbiAgICB9LFxuICB9KTtcbiAgbGV0IHBheWxvYWQ6IGFueTtcbiAgdHJ5IHsgcGF5bG9hZCA9IGF3YWl0IHJlcy5qc29uKCk7IH0gY2F0Y2ggeyBwYXlsb2FkID0geyBlcnJvcjogcmVzLnN0YXR1c1RleHQgfTsgfVxuICBpZiAoIXJlcy5vaykge1xuICAgIGlmIChyZXMuc3RhdHVzID09PSA0MDEpIGNsZWFyU2Vzc2lvbigpO1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkPy5lcnJvciB8fCBgSFRUUCAke3Jlcy5zdGF0dXN9YCk7XG4gIH1cbiAgcmV0dXJuIHBheWxvYWQgYXMgVDtcbn1cbiIsIi8vIFBpdm90VEZUIOKAlCBNYXRjaFRyYWNrZXJcclxuLy8gUGFyc2VzIE92ZXJ3b2xmIFRGVCBnYW1lIGV2ZW50cyBpbnRvIGEgbm9ybWFsaXplZCBtYXRjaCBzdGF0ZS5cclxuLy8gSU1QT1JUQU5UOiBvbmx5IGV4cG9zZXMgcGxheWVyJ3Mgb3duIHZhbHVlcyAobGV2ZWwsIGdvbGQsIEhQLCBzdGFnZSwgYXVnbWVudHMpLlxyXG4vLyBEb2VzIE5PVCBleHBvc2Ugb3Bwb25lbnRzJyBib2FyZHMvaXRlbXMvZXRjIHRvIGF2b2lkIFJpb3QncyBcImNvYWNoaW5nXCIgcnVsZSBjb25jZXJucy5cclxuXHJcbmltcG9ydCB7IFNuYXBzaG90VXBsb2FkZXIgfSBmcm9tICcuL1NuYXBzaG90VXBsb2FkZXInO1xyXG5pbXBvcnQgeyBrQ3VycmVudFRmdFBhdGNoLCBrQ3VycmVudFRmdFNldE51bWJlciwga1Jpb3RBcGlDb25maWcgfSBmcm9tICcuLi9jb25zdHMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXRjaFN0YXRlIHtcclxuICBpbk1hdGNoOiBib29sZWFuO1xyXG4gIG1hdGNoSWQ6IHN0cmluZyB8IG51bGw7ICAvLyBHRVAgbWF0Y2hfaW5mby5wc2V1ZG9fbWF0Y2hfaWQg4oCUIG5lZWRlZCBmb3Igc25hcHNob3QgdXBsb2FkXHJcbiAgc3RhZ2U6IHN0cmluZzsgICAgICAgICAgIC8vIGUuZy4gXCIzLTJcIlxyXG4gIHJvdW5kVHlwZTogc3RyaW5nOyAgICAgICAvLyBQVlAsIFBWRSwgQ2Fyb3VzZWwsIEF1Z21lbnRcclxuICBsZXZlbDogbnVtYmVyO1xyXG4gIGdvbGQ6IG51bWJlcjtcclxuICBoZWFsdGg6IG51bWJlcjtcclxuICBzdHJlYWs6IG51bWJlcjsgICAgICAgICAgLy8gd2luL2xvc3Mgc3RyZWFrIChzaWduZWQpXHJcbiAgYXVnbWVudHM6IHN0cmluZ1tdO1xyXG4gIHVuaXRzOiBBcnJheTx7IG5hbWU6IHN0cmluZzsgdGllcjogbnVtYmVyOyBpdGVtcz86IHN0cmluZ1tdIH0+O1xyXG4gIGxhc3RQbGFjZW1lbnQ6IG51bWJlciB8IG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIE1hdGNoU3RhdGVMaXN0ZW5lciA9IChzdGF0ZTogTWF0Y2hTdGF0ZSkgPT4gdm9pZDtcclxuXHJcbmNvbnN0IEVNUFRZX1NUQVRFOiBNYXRjaFN0YXRlID0ge1xyXG4gIGluTWF0Y2g6IGZhbHNlLFxyXG4gIG1hdGNoSWQ6IG51bGwsXHJcbiAgc3RhZ2U6ICctJyxcclxuICByb3VuZFR5cGU6ICcnLFxyXG4gIGxldmVsOiAwLFxyXG4gIGdvbGQ6IDAsXHJcbiAgaGVhbHRoOiAxMDAsXHJcbiAgc3RyZWFrOiAwLFxyXG4gIGF1Z21lbnRzOiBbXSxcclxuICB1bml0czogW10sXHJcbiAgbGFzdFBsYWNlbWVudDogbnVsbCxcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhZ2VTbmFwc2hvdCB7XHJcbiAgdHM6IG51bWJlcjsgICAgICAgICAgICAvLyBjYXB0dXJlIHRpbWVzdGFtcFxyXG4gIHN0YWdlOiBzdHJpbmc7XHJcbiAgbGV2ZWw6IG51bWJlcjtcclxuICBnb2xkOiBudW1iZXI7XHJcbiAgaGVhbHRoOiBudW1iZXI7XHJcbiAgc3RyZWFrOiBudW1iZXI7XHJcbiAgdW5pdHM6IEFycmF5PHsgbmFtZTogc3RyaW5nOyB0aWVyOiBudW1iZXI7IGl0ZW1zPzogc3RyaW5nW10gfT47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRjaFRyYWNrZXIge1xyXG4gIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTWF0Y2hUcmFja2VyO1xyXG4gIHByaXZhdGUgX3N0YXRlOiBNYXRjaFN0YXRlID0geyAuLi5FTVBUWV9TVEFURSB9O1xyXG4gIHByaXZhdGUgX2xpc3RlbmVyczogTWF0Y2hTdGF0ZUxpc3RlbmVyW10gPSBbXTtcclxuICBwcml2YXRlIF9zbmFwc2hvdHM6IFN0YWdlU25hcHNob3RbXSA9IFtdO1xyXG4gIHByaXZhdGUgX2xhc3RTbmFwc2hvdFN0YWdlOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgc3RhdGljIGluc3RhbmNlKCk6IE1hdGNoVHJhY2tlciB7XHJcbiAgICBpZiAoIXRoaXMuX2luc3RhbmNlKSB0aGlzLl9pbnN0YW5jZSA9IG5ldyBNYXRjaFRyYWNrZXIoKTtcclxuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIGdldFN0YXRlKCk6IE1hdGNoU3RhdGUge1xyXG4gICAgcmV0dXJuIHsgLi4udGhpcy5fc3RhdGUgfTtcclxuICB9XHJcblxyXG4gIG9uU3RhdGVDaGFuZ2UoY2I6IE1hdGNoU3RhdGVMaXN0ZW5lcik6ICgpID0+IHZvaWQge1xyXG4gICAgdGhpcy5fbGlzdGVuZXJzLnB1c2goY2IpO1xyXG4gICAgY2IodGhpcy5nZXRTdGF0ZSgpKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycy5maWx0ZXIobCA9PiBsICE9PSBjYik7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBlbWl0KCkge1xyXG4gICAgY29uc3Qgc25hcHNob3QgPSB0aGlzLmdldFN0YXRlKCk7XHJcbiAgICBmb3IgKGNvbnN0IGNiIG9mIHRoaXMuX2xpc3RlbmVycykge1xyXG4gICAgICB0cnkgeyBjYihzbmFwc2hvdCk7IH0gY2F0Y2ggKGUpIHsgY29uc29sZS53YXJuKCdbTWF0Y2hUcmFja2VyXSBsaXN0ZW5lciBlcnJvcicsIGUpOyB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyA9PT09PSBJbmdlc3QgT3ZlcndvbGYgaW5mb191cGRhdGVzID09PT09XHJcbiAgLy8gU2hhcGU6IHsgZmVhdHVyZTogJ21hdGNoX2luZm8nIHwgJ2dhbWVfaW5mbycgfCAuLi4sIGluZm86IHsuLi59IH1cclxuICBoYW5kbGVJbmZvVXBkYXRlKHVwZGF0ZTogYW55KSB7XHJcbiAgICBpZiAoIXVwZGF0ZSB8fCAhdXBkYXRlLmluZm8pIHJldHVybjtcclxuICAgIGNvbnN0IGluZm8gPSB1cGRhdGUuaW5mbztcclxuICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gZ2FtZV9pbmZvOiBsZXZlbCwgZ29sZCwgaGVhbHRoXHJcbiAgICBpZiAoaW5mby5nYW1lX2luZm8pIHtcclxuICAgICAgY29uc3QgZ2kgPSBpbmZvLmdhbWVfaW5mbztcclxuICAgICAgaWYgKGdpLmxldmVsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBuID0gTnVtYmVyKGdpLmxldmVsKTtcclxuICAgICAgICBpZiAoIU51bWJlci5pc05hTihuKSAmJiBuICE9PSB0aGlzLl9zdGF0ZS5sZXZlbCkgeyB0aGlzLl9zdGF0ZS5sZXZlbCA9IG47IGNoYW5nZWQgPSB0cnVlOyB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGdpLmdvbGQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IG4gPSBOdW1iZXIoZ2kuZ29sZCk7XHJcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4obikgJiYgbiAhPT0gdGhpcy5fc3RhdGUuZ29sZCkgeyB0aGlzLl9zdGF0ZS5nb2xkID0gbjsgY2hhbmdlZCA9IHRydWU7IH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoZ2kuaGVhbHRoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBuID0gTnVtYmVyKGdpLmhlYWx0aCk7XHJcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4obikgJiYgbiAhPT0gdGhpcy5fc3RhdGUuaGVhbHRoKSB7IHRoaXMuX3N0YXRlLmhlYWx0aCA9IG47IGNoYW5nZWQgPSB0cnVlOyB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGdpLndpbl9zdHJlYWsgIT09IHVuZGVmaW5lZCB8fCBnaS5sb3NzX3N0cmVhayAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgdyA9IE51bWJlcihnaS53aW5fc3RyZWFrIHx8IDApO1xyXG4gICAgICAgIGNvbnN0IGwgPSBOdW1iZXIoZ2kubG9zc19zdHJlYWsgfHwgMCk7XHJcbiAgICAgICAgY29uc3Qgc3RyZWFrID0gdyA+IDAgPyB3IDogLWw7XHJcbiAgICAgICAgaWYgKHN0cmVhayAhPT0gdGhpcy5fc3RhdGUuc3RyZWFrKSB7IHRoaXMuX3N0YXRlLnN0cmVhayA9IHN0cmVhazsgY2hhbmdlZCA9IHRydWU7IH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1hdGNoX2luZm86IHN0YWdlIC8gcm91bmRfdHlwZSAvIGF1Z21lbnRzIC8gcGxhY2VtZW50IC8gcHNldWRvX21hdGNoX2lkXHJcbiAgICBpZiAoaW5mby5tYXRjaF9pbmZvKSB7XHJcbiAgICAgIGNvbnN0IG1pID0gaW5mby5tYXRjaF9pbmZvO1xyXG4gICAgICBpZiAobWkucHNldWRvX21hdGNoX2lkICYmIFN0cmluZyhtaS5wc2V1ZG9fbWF0Y2hfaWQpICE9PSB0aGlzLl9zdGF0ZS5tYXRjaElkKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUubWF0Y2hJZCA9IFN0cmluZyhtaS5wc2V1ZG9fbWF0Y2hfaWQpO1xyXG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChtaS5zdGFnZSAmJiBTdHJpbmcobWkuc3RhZ2UpICE9PSB0aGlzLl9zdGF0ZS5zdGFnZSkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlLnN0YWdlID0gU3RyaW5nKG1pLnN0YWdlKTtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobWkucm91bmRfdHlwZSAmJiBTdHJpbmcobWkucm91bmRfdHlwZSkgIT09IHRoaXMuX3N0YXRlLnJvdW5kVHlwZSkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlLnJvdW5kVHlwZSA9IFN0cmluZyhtaS5yb3VuZF90eXBlKTtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobWkucGxhY2VtZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBwID0gTnVtYmVyKG1pLnBsYWNlbWVudCk7XHJcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocCkgJiYgcCA+IDApIHtcclxuICAgICAgICAgIHRoaXMuX3N0YXRlLmxhc3RQbGFjZW1lbnQgPSBwO1xyXG4gICAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXVnbWVudHM6IGFycmF5IG9mIHN0cmluZ3MgKG9yIHBhcnNlIEpTT04tc3RyaW5nIHZhcmlhbnRzKVxyXG4gICAgaWYgKGluZm8uYXVnbWVudHMpIHtcclxuICAgICAgY29uc3QgYXVnbWVudHMgPSB0aGlzLnBhcnNlQXVnbWVudHMoaW5mby5hdWdtZW50cyk7XHJcbiAgICAgIGlmIChhdWdtZW50cyAmJiBKU09OLnN0cmluZ2lmeShhdWdtZW50cykgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuX3N0YXRlLmF1Z21lbnRzKSkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlLmF1Z21lbnRzID0gYXVnbWVudHM7XHJcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBib2FyZDogcGxheWVyJ3Mgb3duIHVuaXRzIChzYWZlIHRvIHNob3cg4oCUIGl0J3MgeW91ciBvd24gYm9hcmQpXHJcbiAgICBpZiAoaW5mby5ib2FyZCkge1xyXG4gICAgICBjb25zdCB1bml0cyA9IHRoaXMucGFyc2VVbml0cyhpbmZvLmJvYXJkKTtcclxuICAgICAgaWYgKHVuaXRzICYmIEpTT04uc3RyaW5naWZ5KHVuaXRzKSAhPT0gSlNPTi5zdHJpbmdpZnkodGhpcy5fc3RhdGUudW5pdHMpKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUudW5pdHMgPSB1bml0cztcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5fc3RhdGUuaW5NYXRjaCAmJiAodGhpcy5fc3RhdGUubGV2ZWwgPiAwIHx8IHRoaXMuX3N0YXRlLnN0YWdlICE9PSAnLScpKSB7XHJcbiAgICAgIHRoaXMuX3N0YXRlLmluTWF0Y2ggPSB0cnVlO1xyXG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICAvLyBDYXB0dXJlIGEgcGVyLXN0YWdlIHNuYXBzaG90IHdoZW4gdGhlIHN0YWdlIGZsaXBzLiBVc2VkIGJ5IE1hdGNoXHJcbiAgICAgIC8vIEhpc3RvcnkgcG9zdC1tYXRjaC4gTmV2ZXIgcmVhZCBieSBhbnkgaW4tbWF0Y2ggVUkuXHJcbiAgICAgIGlmICh0aGlzLl9zdGF0ZS5zdGFnZSAhPT0gdGhpcy5fbGFzdFNuYXBzaG90U3RhZ2UgJiYgdGhpcy5fc3RhdGUuc3RhZ2UgIT09ICctJykge1xyXG4gICAgICAgIHRoaXMuX3NuYXBzaG90cy5wdXNoKHtcclxuICAgICAgICAgIHRzOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgc3RhZ2U6IHRoaXMuX3N0YXRlLnN0YWdlLFxyXG4gICAgICAgICAgbGV2ZWw6IHRoaXMuX3N0YXRlLmxldmVsLFxyXG4gICAgICAgICAgZ29sZDogdGhpcy5fc3RhdGUuZ29sZCxcclxuICAgICAgICAgIGhlYWx0aDogdGhpcy5fc3RhdGUuaGVhbHRoLFxyXG4gICAgICAgICAgc3RyZWFrOiB0aGlzLl9zdGF0ZS5zdHJlYWssXHJcbiAgICAgICAgICB1bml0czogdGhpcy5fc3RhdGUudW5pdHMubWFwKHUgPT4gKHsgLi4udSB9KSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbGFzdFNuYXBzaG90U3RhZ2UgPSB0aGlzLl9zdGF0ZS5zdGFnZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmVtaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vID09PT09IEluZ2VzdCBPdmVyd29sZiBuZXdfZXZlbnRzID09PT09XHJcbiAgaGFuZGxlTmV3RXZlbnRzKGU6IGFueSkge1xyXG4gICAgaWYgKCFlIHx8ICFBcnJheS5pc0FycmF5KGUuZXZlbnRzKSkgcmV0dXJuO1xyXG4gICAgZm9yIChjb25zdCBldmVudCBvZiBlLmV2ZW50cykge1xyXG4gICAgICBzd2l0Y2ggKGV2ZW50Lm5hbWUpIHtcclxuICAgICAgICBjYXNlICdtYXRjaF9zdGFydCc6XHJcbiAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICB0aGlzLl9zdGF0ZS5pbk1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuZW1pdCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbWF0Y2hfZW5kJzpcclxuICAgICAgICAgIHRoaXMuX3N0YXRlLmluTWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMucGVyc2lzdE1hdGNoKCk7XHJcbiAgICAgICAgICB0aGlzLmVtaXQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ21hdGNoX2luZm9fcGxhY2VtZW50JzpcclxuICAgICAgICAgIGlmIChldmVudC5kYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBOdW1iZXIoZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghTnVtYmVyLmlzTmFOKHApKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fc3RhdGUubGFzdFBsYWNlbWVudCA9IHA7XHJcbiAgICAgICAgICAgICAgdGhpcy5lbWl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyA9PT09PSBQZXJzaXN0ZW5jZSA9PT09PVxyXG4gIC8vIFBlcnNpc3QgYSBmdWxsIHBlci1tYXRjaCByZWNvcmQgKGluY2x1ZGluZyB0aGUgcGVyLXN0YWdlIHRpbWVsaW5lKSB0b1xyXG4gIC8vIGxvY2FsU3RvcmFnZSBvbiBtYXRjaF9lbmQuIFRoZSBkZXNrdG9wIE1hdGNoIEhpc3RvcnkgdmlldyBjb25zdW1lcyBpdCBmb3JcclxuICAvLyB0aGUgVGltZWxpbmUgLyBSb3VuZC1EZXRhaWwgYnJlYWtkb3ducy4gQ2FwcGVkIGF0IDUwIG1hdGNoZXMuXHJcbiAgLy9cclxuICAvLyBBbHNvOiBpZiB0aGUgdXNlciBoYXMgb3B0ZWQgaW4gdG8gY29udHJpYnV0ZSBtYXRjaCBkYXRhLCBoYW5kIHRoZSByZWNvcmRcclxuICAvLyBvZmYgdG8gU25hcHNob3RVcGxvYWRlci4gVXBsb2FkIGlzIGZpcmUtYW5kLWZvcmdldCDigJQgbmV2ZXIgYmxvY2tzIGxvY2FsXHJcbiAgLy8gcGVyc2lzdGVuY2UsIGFuZCB0aGUgdXBsb2FkZXIgaGFzIGl0cyBvd24gcmV0cnkgcXVldWUgZm9yIGZhaWx1cmVzLlxyXG4gIHByaXZhdGUgcGVyc2lzdE1hdGNoKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmF3ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Bpdm90dGZ0X21hdGNoX2hpc3RvcnknKTtcclxuICAgICAgY29uc3QgaGlzdG9yeSA9IHJhdyA/IEpTT04ucGFyc2UocmF3KSA6IFtdO1xyXG4gICAgICBoaXN0b3J5LnVuc2hpZnQoe1xyXG4gICAgICAgIGVuZGVkQXQ6IERhdGUubm93KCksXHJcbiAgICAgICAgbWF0Y2hJZDogdGhpcy5fc3RhdGUubWF0Y2hJZCxcclxuICAgICAgICBwbGFjZW1lbnQ6IHRoaXMuX3N0YXRlLmxhc3RQbGFjZW1lbnQsXHJcbiAgICAgICAgbGV2ZWw6IHRoaXMuX3N0YXRlLmxldmVsLFxyXG4gICAgICAgIHN0YWdlOiB0aGlzLl9zdGF0ZS5zdGFnZSxcclxuICAgICAgICBhdWdtZW50czogWy4uLnRoaXMuX3N0YXRlLmF1Z21lbnRzXSxcclxuICAgICAgICBzbmFwc2hvdHM6IFsuLi50aGlzLl9zbmFwc2hvdHNdLFxyXG4gICAgICB9KTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Bpdm90dGZ0X21hdGNoX2hpc3RvcnknLCBKU09OLnN0cmluZ2lmeShoaXN0b3J5LnNsaWNlKDAsIDUwKSkpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ1tNYXRjaFRyYWNrZXJdIHBlcnNpc3QgZmFpbGVkJywgZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmVzdC1lZmZvcnQgY29udHJpYnV0ZS4gVGhlIHVwbG9hZGVyIGludGVybmFsbHkgY2hlY2tzIG9wdC1pbiArIGF1dGgsXHJcbiAgICAvLyBzbyBpdCdzIHNhZmUgdG8gY2FsbCB1bmNvbmRpdGlvbmFsbHkg4oCUIGl0IGp1c3Qgbm8tb3BzIHdoZW4gb2ZmLlxyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKCF0aGlzLl9zdGF0ZS5tYXRjaElkKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IHJlZ2lvbiA9IGtSaW90QXBpQ29uZmlnLnBsYXRmb3JtO1xyXG4gICAgICBjb25zdCBmaW5hbFVuaXRzID0gdGhpcy5fc3RhdGUudW5pdHMubWFwKHUgPT4gKHtcclxuICAgICAgICBjaGFyYWN0ZXJfaWQ6IHUubmFtZSxcclxuICAgICAgICB0aWVyOiB1LnRpZXIsXHJcbiAgICAgICAgaXRlbXM6IHUuaXRlbXMsXHJcbiAgICAgIH0pKTtcclxuICAgICAgLy8gV2UgZG9uJ3QgY2FwdHVyZSBmaW5hbF90cmFpdHMgaW4gTWF0Y2hUcmFja2VyICh0aGUgR0VQIGBib2FyZGAgZXZlbnRcclxuICAgICAgLy8gZG9lc24ndCBpbmNsdWRlIHRyYWl0IHRvdGFscyk7IHBhc3MgYW4gZW1wdHkgYXJyYXkg4oCUIHRoZSBhZ2dyZWdhdG9yXHJcbiAgICAgIC8vIGNhbiBkZXJpdmUgdHJhaXRzIGZyb20gZmluYWxVbml0cyB2aWEgdGhlIHRyYWl0IG1hcC5cclxuICAgICAgdm9pZCBTbmFwc2hvdFVwbG9hZGVyLnRyeVVwbG9hZCh7XHJcbiAgICAgICAgbWF0Y2hJZDogdGhpcy5fc3RhdGUubWF0Y2hJZCxcclxuICAgICAgICByZWdpb24sXHJcbiAgICAgICAgcGF0Y2g6IGtDdXJyZW50VGZ0UGF0Y2gsXHJcbiAgICAgICAgdGZ0U2V0OiBrQ3VycmVudFRmdFNldE51bWJlcixcclxuICAgICAgICBmaW5hbFBsYWNlbWVudDogdGhpcy5fc3RhdGUubGFzdFBsYWNlbWVudCxcclxuICAgICAgICBmaW5hbExldmVsOiB0aGlzLl9zdGF0ZS5sZXZlbCB8fCBudWxsLFxyXG4gICAgICAgIGZpbmFsVW5pdHMsXHJcbiAgICAgICAgZmluYWxUcmFpdHM6IFtdLFxyXG4gICAgICAgIGZpbmFsQXVnbWVudHM6IFsuLi50aGlzLl9zdGF0ZS5hdWdtZW50c10sXHJcbiAgICAgICAgc25hcHNob3RzOiB0aGlzLl9zbmFwc2hvdHMubWFwKHMgPT4gKHtcclxuICAgICAgICAgIHN0YWdlOiBzLnN0YWdlLFxyXG4gICAgICAgICAgbGV2ZWw6IHMubGV2ZWwsXHJcbiAgICAgICAgICBnb2xkOiBzLmdvbGQsXHJcbiAgICAgICAgICBoZWFsdGg6IHMuaGVhbHRoLFxyXG4gICAgICAgICAgc3RyZWFrOiBzLnN0cmVhayxcclxuICAgICAgICAgIHVuaXRzOiBzLnVuaXRzLm1hcCh1ID0+ICh7IG5hbWU6IHUubmFtZSwgdGllcjogdS50aWVyLCBpdGVtczogdS5pdGVtcyB9KSksXHJcbiAgICAgICAgfSkpLFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKCdbTWF0Y2hUcmFja2VyXSB1cGxvYWQga2lja29mZiBmYWlsZWQnLCBlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVzZXQoKSB7XHJcbiAgICB0aGlzLl9zdGF0ZSA9IHsgLi4uRU1QVFlfU1RBVEUsIGluTWF0Y2g6IHRydWUgfTtcclxuICAgIHRoaXMuX3NuYXBzaG90cyA9IFtdO1xyXG4gICAgdGhpcy5fbGFzdFNuYXBzaG90U3RhZ2UgPSAnJztcclxuICB9XHJcblxyXG4gIC8vID09PT09IFBhcnNpbmcgaGVscGVycyA9PT09PVxyXG4gIHByaXZhdGUgcGFyc2VBdWdtZW50cyhyYXc6IGFueSk6IHN0cmluZ1tdIHwgbnVsbCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwYXJzZWQgPSB0eXBlb2YgcmF3ID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UocmF3KSA6IHJhdztcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyc2VkKSkgcmV0dXJuIHBhcnNlZC5tYXAoYSA9PiBTdHJpbmcoYSkpO1xyXG4gICAgICBpZiAocGFyc2VkICYmIEFycmF5LmlzQXJyYXkocGFyc2VkLmF1Z21lbnRzKSkgcmV0dXJuIHBhcnNlZC5hdWdtZW50cy5tYXAoKGE6IGFueSkgPT4gU3RyaW5nKGEpKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlVW5pdHMocmF3OiBhbnkpOiBBcnJheTx7IG5hbWU6IHN0cmluZzsgdGllcjogbnVtYmVyOyBpdGVtcz86IHN0cmluZ1tdIH0+IHwgbnVsbCB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwYXJzZWQgPSB0eXBlb2YgcmF3ID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UocmF3KSA6IHJhdztcclxuICAgICAgaWYgKCFwYXJzZWQpIHJldHVybiBudWxsO1xyXG4gICAgICBjb25zdCBsaXN0ID0gQXJyYXkuaXNBcnJheShwYXJzZWQpID8gcGFyc2VkIDogKEFycmF5LmlzQXJyYXkocGFyc2VkLnVuaXRzKSA/IHBhcnNlZC51bml0cyA6IG51bGwpO1xyXG4gICAgICBpZiAoIWxpc3QpIHJldHVybiBudWxsO1xyXG4gICAgICByZXR1cm4gbGlzdC5tYXAoKHU6IGFueSkgPT4gKHtcclxuICAgICAgICBuYW1lOiBTdHJpbmcodS5uYW1lIHx8IHUuY2hhcmFjdGVyX2lkIHx8IHUuaWQgfHwgJz8nKSxcclxuICAgICAgICB0aWVyOiBOdW1iZXIodS50aWVyIHx8IHUuc3RhciB8fCAxKSxcclxuICAgICAgICBpdGVtczogQXJyYXkuaXNBcnJheSh1Lml0ZW1zKSA/IHUuaXRlbXMubWFwKFN0cmluZykgOiB1bmRlZmluZWQsXHJcbiAgICAgIH0pKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLy8gU25hcHNob3RVcGxvYWRlciDigJQgb3B0LWluIHBhdGggdGhhdCBzaGlwcyBjb21wbGV0ZWQtbWF0Y2ggc25hcHNob3RzIGZyb21cbi8vIE1hdGNoVHJhY2tlciB0byB0aGUgYmFja2VuZCBgL21hdGNoLXNuYXBzaG90c2Agcm91dGUuXG4vL1xuLy8gQWxsIGRhdGEgaXMgZnJvbSB0aGUgdXNlcidzIG93biBnYW1lLiBPcHBvbmVudCBib2FyZHMgYXJlIE5FVkVSIHBhcnQgb2Zcbi8vIHRoZSBwYXlsb2FkIChPdmVyd29sZiBHRVAgZG9lc24ndCBleHBvc2UgdGhlbSwgYW5kIHdlIHdvdWxkbid0IHNoaXAgdGhlbVxuLy8gZXZlbiBpZiBpdCBkaWQg4oCUIGNvbXBsaWFuY2UgbGluZSkuXG5cbmltcG9ydCB7IGFkbWluRmV0Y2gsIGlzQXV0aGVudGljYXRlZCB9IGZyb20gJy4vQXV0aFNlcnZpY2UnO1xuXG5jb25zdCBPUFRfSU5fS0VZID0gJ3Bpdm90dGZ0X2NvbnRyaWJ1dGVfc25hcHNob3RzJztcbmNvbnN0IFBFTkRJTkdfS0VZID0gJ3Bpdm90dGZ0X3NuYXBzaG90X3BlbmRpbmdfdjEnO1xuY29uc3QgQ09OVFJJQlVURURfQ09VTlRfS0VZID0gJ3Bpdm90dGZ0X3NuYXBzaG90X2NvbnRyaWJ1dGVkX2NvdW50X3YxJztcbmNvbnN0IE1BWF9QRU5ESU5HID0gMTA7XG5cbi8vIFRoZXNlIHRyYXZlbCB3aXRoIGV2ZXJ5IHVwbG9hZC4gQnVtcCB0aGVtIGluIGBzcmMvY29uc3RzLnRzYCB3aGVuZXZlciBhXG4vLyBuZXcgVEZUIHBhdGNoIHNoaXBzIOKAlCBzYW1lIHJlbGVhc2UgY2FkZW5jZSBhcyBgUEFUQ0hFU2AgaW4gdGhlIHJlbmRlcmVycy5cbmltcG9ydCB7IGtDdXJyZW50VGZ0UGF0Y2gsIGtDdXJyZW50VGZ0U2V0TnVtYmVyIH0gZnJvbSAnLi4vY29uc3RzJztcblxuZXhwb3J0IGludGVyZmFjZSBTbmFwc2hvdFBheWxvYWQge1xuICBtYXRjaElkOiBzdHJpbmc7XG4gIHJlZ2lvbjogc3RyaW5nOyAgICAgLy8gcGxhdGZvcm0gY29kZTogZXV3MSwgbmExLCBrciwgLi4uXG4gIHBhdGNoOiBzdHJpbmc7ICAgICAgLy8gVEZUIGluLXNldCBwYXRjaCBsaWtlIFwiMTcuM1wiXG4gIHRmdFNldDogbnVtYmVyO1xuICBmaW5hbFBsYWNlbWVudDogbnVtYmVyIHwgbnVsbDtcbiAgZmluYWxMZXZlbDogbnVtYmVyIHwgbnVsbDtcbiAgZmluYWxVbml0czogQXJyYXk8eyBjaGFyYWN0ZXJfaWQ6IHN0cmluZzsgdGllcjogbnVtYmVyOyBpdGVtcz86IHN0cmluZ1tdIH0+O1xuICBmaW5hbFRyYWl0czogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IG51bV91bml0czogbnVtYmVyOyB0aWVyX2N1cnJlbnQ6IG51bWJlcjsgc3R5bGU6IG51bWJlciB9PjtcbiAgZmluYWxBdWdtZW50czogc3RyaW5nW107XG4gIHNuYXBzaG90czogQXJyYXk8e1xuICAgIHN0YWdlOiBzdHJpbmc7XG4gICAgbGV2ZWw6IG51bWJlcjtcbiAgICBnb2xkOiBudW1iZXI7XG4gICAgaGVhbHRoOiBudW1iZXI7XG4gICAgc3RyZWFrOiBudW1iZXI7XG4gICAgdW5pdHM6IEFycmF5PHsgbmFtZTogc3RyaW5nOyB0aWVyOiBudW1iZXI7IGl0ZW1zPzogc3RyaW5nW10gfT47XG4gIH0+O1xufVxuXG5pbnRlcmZhY2UgVXBsb2FkUmVzdWx0IHtcbiAgb2s6IGJvb2xlYW47XG4gIGFscmVhZHlVcGxvYWRlZD86IGJvb2xlYW47XG4gIGVycm9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgU25hcHNob3RVcGxvYWRlciB7XG4gIC8vID09PT09IG9wdC1pbiB0b2dnbGUgPT09PT1cbiAgc3RhdGljIGlzT3B0ZWRJbigpOiBib29sZWFuIHtcbiAgICB0cnkgeyByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oT1BUX0lOX0tFWSkgPT09ICd0cnVlJzsgfSBjYXRjaCB7IHJldHVybiBmYWxzZTsgfVxuICB9XG4gIHN0YXRpYyBzZXRPcHRJbih2OiBib29sZWFuKTogdm9pZCB7XG4gICAgdHJ5IHsgbG9jYWxTdG9yYWdlLnNldEl0ZW0oT1BUX0lOX0tFWSwgdiA/ICd0cnVlJyA6ICdmYWxzZScpOyB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbiAgfVxuICBzdGF0aWMgZ2V0Q29udHJpYnV0ZWRDb3VudCgpOiBudW1iZXIge1xuICAgIHRyeSB7IHJldHVybiBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShDT05UUklCVVRFRF9DT1VOVF9LRVkpIHx8ICcwJywgMTApIHx8IDA7IH1cbiAgICBjYXRjaCB7IHJldHVybiAwOyB9XG4gIH1cblxuICAvLyA9PT09PSBQdWJsaWMgZW50cnk6IGNhbGwgdGhpcyBhZnRlciBNYXRjaFRyYWNrZXIgcGVyc2lzdHMgYSBtYXRjaCA9PT09PVxuICAvLyBCZXN0LWVmZm9ydC4gRHJhaW5zIHRoZSBwZW5kaW5nIHF1ZXVlIGZpcnN0IHNvIHJldHJpZXMgZmx1c2ggYmVmb3JlIHRoZVxuICAvLyBuZXdlc3QgdXBsb2FkIGNvbXBldGVzIGZvciB0aGUgbmV0d29yay4gQWxsIGZhaWx1cmVzIGZhbGwgaW50byB0aGUgcXVldWUuXG4gIHN0YXRpYyBhc3luYyB0cnlVcGxvYWQocGF5bG9hZDogU25hcHNob3RQYXlsb2FkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmlzT3B0ZWRJbigpIHx8ICFpc0F1dGhlbnRpY2F0ZWQoKSkgcmV0dXJuO1xuICAgIGlmICghcGF5bG9hZC5tYXRjaElkIHx8ICFwYXlsb2FkLnJlZ2lvbiB8fCAhcGF5bG9hZC5wYXRjaCkgcmV0dXJuO1xuXG4gICAgLy8gMS4gRmx1c2ggd2hhdGV2ZXIncyBwZW5kaW5nIChmYWlsZWQgdXBsb2FkcyBmcm9tIGVhcmxpZXIgc2Vzc2lvbnMpLlxuICAgIGF3YWl0IHRoaXMuZHJhaW5QZW5kaW5nKCk7XG5cbiAgICAvLyAyLiBBdHRlbXB0IHRoaXMgbWF0Y2guIElmIGl0IGZhaWxzLCBxdWV1ZS5cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLnVwbG9hZE9uY2UocGF5bG9hZCk7XG4gICAgaWYgKCFyZXMub2spIHtcbiAgICAgIHRoaXMuZW5xdWV1ZShwYXlsb2FkKTtcbiAgICB9IGVsc2UgaWYgKCFyZXMuYWxyZWFkeVVwbG9hZGVkKSB7XG4gICAgICB0aGlzLmJ1bXBDb250cmlidXRlZENvdW50KCk7XG4gICAgfVxuICB9XG5cbiAgLy8gPT09PT0gSW50ZXJuYWwgPT09PT1cblxuICAvLyBUaGUgZGVmYXVsdHMgZnJvbSBjb25zdHMgYXJlIHJpZ2h0IGZvciBsaXZlIGdhbWVzOyBleHBvc2UgcGF0Y2gvdGZ0U2V0XG4gIC8vIGFzIGRlZmF1bHRzIHNvIGNhbGxlcnMgY2FuIG9taXQgdGhlbSB3aGVuIG1hdGNoaW5nIHRoZSBjdXJyZW50IGJ1aWxkLlxuICBzdGF0aWMgYnVpbGRQYXlsb2FkKGFyZ3M6IE9taXQ8U25hcHNob3RQYXlsb2FkLCAncGF0Y2gnIHwgJ3RmdFNldCc+ICYge1xuICAgIHBhdGNoPzogc3RyaW5nOyB0ZnRTZXQ/OiBudW1iZXI7XG4gIH0pOiBTbmFwc2hvdFBheWxvYWQge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5hcmdzLFxuICAgICAgcGF0Y2g6ICBhcmdzLnBhdGNoICA/PyBrQ3VycmVudFRmdFBhdGNoLFxuICAgICAgdGZ0U2V0OiBhcmdzLnRmdFNldCA/PyBrQ3VycmVudFRmdFNldE51bWJlcixcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgdXBsb2FkT25jZShwOiBTbmFwc2hvdFBheWxvYWQpOiBQcm9taXNlPFVwbG9hZFJlc3VsdD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBhZG1pbkZldGNoPHsgb2s6IGJvb2xlYW47IGFscmVhZHlVcGxvYWRlZD86IGJvb2xlYW4gfT4oXG4gICAgICAgICcvbWF0Y2gtc25hcHNob3RzJyxcbiAgICAgICAgeyBtZXRob2Q6ICdQT1NUJywgYm9keTogSlNPTi5zdHJpbmdpZnkocCkgfSxcbiAgICAgICk7XG4gICAgICByZXR1cm4geyBvazogISFyZXMub2ssIGFscmVhZHlVcGxvYWRlZDogISFyZXMuYWxyZWFkeVVwbG9hZGVkIH07XG4gICAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgICAvLyBBdXRoIGV4cGlyZWQg4oaSIGFkbWluRmV0Y2ggYWxyZWFkeSBjbGVhcnMgdGhlIHNlc3Npb247IHRoZSBuZXh0IG1hdGNoXG4gICAgICAvLyBlbmQgd2lsbCBza2lwIChpc0F1dGhlbnRpY2F0ZWQoKSByZXR1cm5zIGZhbHNlKSBhbmQgdGhlIHF1ZXVlIGhvbGRzXG4gICAgICAvLyB0aGUgcGF5bG9hZCBmb3Igd2hlbmV2ZXIgdGhlIHVzZXIgc2lnbnMgYmFjayBpbi5cbiAgICAgIHJldHVybiB7IG9rOiBmYWxzZSwgZXJyb3I6IGU/Lm1lc3NhZ2UgfHwgU3RyaW5nKGUpIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgZHJhaW5QZW5kaW5nKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHF1ZXVlID0gdGhpcy5sb2FkUXVldWUoKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgLy8gRHJhaW4gaW4tb3JkZXI7IGtlZXAgZmFpbHVyZXMgZm9yIG5leHQgcGFzcy5cbiAgICBjb25zdCByZW1haW5pbmc6IFNuYXBzaG90UGF5bG9hZFtdID0gW107XG4gICAgZm9yIChjb25zdCBwIG9mIHF1ZXVlKSB7XG4gICAgICBjb25zdCByID0gYXdhaXQgdGhpcy51cGxvYWRPbmNlKHApO1xuICAgICAgaWYgKHIub2spIHtcbiAgICAgICAgaWYgKCFyLmFscmVhZHlVcGxvYWRlZCkgdGhpcy5idW1wQ29udHJpYnV0ZWRDb3VudCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVtYWluaW5nLnB1c2gocCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2F2ZVF1ZXVlKHJlbWFpbmluZyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBlbnF1ZXVlKHA6IFNuYXBzaG90UGF5bG9hZCk6IHZvaWQge1xuICAgIGNvbnN0IHF1ZXVlID0gdGhpcy5sb2FkUXVldWUoKTtcbiAgICAvLyBEZWR1cCBvbiBtYXRjaElkIGluIGNhc2UgdGhlIHNhbWUgbWF0Y2ggcmV0cmllcyBtdWx0aXBsZSB0aW1lcy5cbiAgICBjb25zdCBmaWx0ZXJlZCA9IHF1ZXVlLmZpbHRlcihxID0+IHEubWF0Y2hJZCAhPT0gcC5tYXRjaElkKTtcbiAgICBmaWx0ZXJlZC5wdXNoKHApO1xuICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPiBNQVhfUEVORElORykgZmlsdGVyZWQuc3BsaWNlKDAsIGZpbHRlcmVkLmxlbmd0aCAtIE1BWF9QRU5ESU5HKTtcbiAgICB0aGlzLnNhdmVRdWV1ZShmaWx0ZXJlZCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBsb2FkUXVldWUoKTogU25hcHNob3RQYXlsb2FkW10ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByYXcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShQRU5ESU5HX0tFWSk7XG4gICAgICByZXR1cm4gcmF3ID8gSlNPTi5wYXJzZShyYXcpIGFzIFNuYXBzaG90UGF5bG9hZFtdIDogW107XG4gICAgfSBjYXRjaCB7IHJldHVybiBbXTsgfVxuICB9XG4gIHByaXZhdGUgc3RhdGljIHNhdmVRdWV1ZShxOiBTbmFwc2hvdFBheWxvYWRbXSk6IHZvaWQge1xuICAgIHRyeSB7IGxvY2FsU3RvcmFnZS5zZXRJdGVtKFBFTkRJTkdfS0VZLCBKU09OLnN0cmluZ2lmeShxKSk7IH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxuICB9XG4gIHByaXZhdGUgc3RhdGljIGJ1bXBDb250cmlidXRlZENvdW50KCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBuID0gdGhpcy5nZXRDb250cmlidXRlZENvdW50KCkgKyAxO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQ09OVFJJQlVURURfQ09VTlRfS0VZLCBTdHJpbmcobikpO1xuICAgIH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gSGVhZGxpbmVyIGNvdW50ZG93biBvdmVybGF5IOKAlCBwYXNzaXZlIHN0YWdlIHRpbWVyLlxuLy9cbi8vIFN1YnNjcmliZXMgdG8gTWF0Y2hUcmFja2VyIHN0YXRlIGZvciB0aGUgY3VycmVudCBzdGFnZSBsYWJlbC4gVGhlIHRpbWVyXG4vLyBjb3VudHMgZG93biBhICpyb3VnaCogZHVyYXRpb24gcGVyIHN0YWdlIHR5cGUgKFJpb3QgZG9lc24ndCBleHBvc2UgdGhlXG4vLyByZW1haW5pbmcgc2Vjb25kcyB2aWEgdGhlIHB1YmxpYyBPdmVyd29sZiBHYW1lIEV2ZW50cyBBUEksIHNvIHdlIGFwcHJveGltYXRlXG4vLyBmcm9tIHN0YWdlLXN0YXJ0IHRpbWVzdGFtcCArIGNhbm9uaWNhbCBURlQgcm91bmQgZHVyYXRpb25zKS5cbi8vXG4vLyBDb21wbGlhbmNlOiBzaG93cyBPTkxZIHN0YWdlIGxhYmVsICsgZWxhcHNlZC9yZW1haW5pbmcgc2Vjb25kcy4gTm8gYm9hcmRcbi8vIHN0YXRlLCBubyBnYW1lLXN0YXRlIGluZm8g4oCUIHN0cmljdGx5IGEgcGFzc2l2ZSBjbG9jay5cblxuaW1wb3J0IHsgTWF0Y2hUcmFja2VyIH0gZnJvbSAnLi4vc2VydmljZXMvTWF0Y2hUcmFja2VyJztcblxuLy8gQ2Fub25pY2FsIFRGVCByb3VuZCBkdXJhdGlvbnMgKHNlY29uZHMpLiBVc2VkIGFzIGZhbGxiYWNrIHdoZW4gTENVXG4vLyBkb2Vzbid0IHRlbGwgdXMgZXhhY3QgcmVtYWluaW5nIHRpbWUuIFRoZXNlIG1hdGNoIFJpb3QncyBwdWJsaXNoZWQgdmFsdWVzXG4vLyBmb3IgU2V0IDE3IOKAlCBhZGp1c3QgcGVyIHBhdGNoIGlmIG5lZWRlZC5cbmNvbnN0IFJPVU5EX1NFQ09ORFM6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7XG4gIFBWRTogMzAsXG4gIFBWUDogMzAsXG4gIENhcm91c2VsOiAzMCxcbiAgQXVnbWVudF8xOiA1MCxcbiAgQXVnbWVudF8yOiA1MCxcbiAgQXVnbWVudF8zOiA1MCxcbiAgUG9ydGFsOiAzMCxcbiAgZGVmYXVsdDogMzAsXG59O1xuXG5sZXQgc3RhZ2VTdGFydFRzID0gMDtcbmxldCBzdGFnZUR1cmF0aW9uID0gMzA7XG5cbmZ1bmN0aW9uIGNsb3NlV2luZG93KCkge1xuICBvdmVyd29sZi53aW5kb3dzLmdldEN1cnJlbnRXaW5kb3cocmVzID0+IHtcbiAgICBpZiAocmVzPy5zdWNjZXNzICYmIHJlcy53aW5kb3c/LmlkKSBvdmVyd29sZi53aW5kb3dzLmNsb3NlKHJlcy53aW5kb3cuaWQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltZShzZWNvbmRzOiBudW1iZXIpOiBzdHJpbmcge1xuICBpZiAoc2Vjb25kcyA8IDApIHNlY29uZHMgPSAwO1xuICBjb25zdCBtID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xuICBjb25zdCBzID0gTWF0aC5mbG9vcihzZWNvbmRzICUgNjApO1xuICByZXR1cm4gYCR7bX06JHtTdHJpbmcocykucGFkU3RhcnQoMiwgJzAnKX1gO1xufVxuXG5mdW5jdGlvbiB0aWNrKCkge1xuICBjb25zdCBzdGFnZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hkLXN0YWdlJyk7XG4gIGNvbnN0IHRpbWVyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGQtdGltZXInKTtcbiAgaWYgKCFzdGFnZUVsIHx8ICF0aW1lckVsKSByZXR1cm47XG5cbiAgY29uc3Qgc3RhdGUgPSBNYXRjaFRyYWNrZXIuaW5zdGFuY2UoKS5nZXRTdGF0ZSgpO1xuICBpZiAoIXN0YXRlLmluTWF0Y2gpIHtcbiAgICBzdGFnZUVsLnRleHRDb250ZW50ID0gJ+KAlCc7XG4gICAgdGltZXJFbC50ZXh0Q29udGVudCA9ICctLTotLSc7XG4gICAgY29uc3Qgbm90ZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hkLW5vdGUnKTtcbiAgICBpZiAobm90ZUVsKSBub3RlRWwudGV4dENvbnRlbnQgPSAnV2FpdGluZyBmb3IgbWF0Y2jigKYnO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHN0YWdlRWwudGV4dENvbnRlbnQgPSBzdGF0ZS5zdGFnZSB8fCAnPyc7XG4gIGNvbnN0IG5vdGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZC1ub3RlJyk7XG4gIGlmIChub3RlRWwpIG5vdGVFbC50ZXh0Q29udGVudCA9IGBMdiAke3N0YXRlLmxldmVsfSDCtyAke3N0YXRlLmdvbGR9ZyDCtyAke3N0YXRlLmhlYWx0aH0gSFBgO1xuXG4gIC8vIElmIHN0YWdlIGhhcyBjaGFuZ2VkIHNpbmNlIGxhc3QgdGljaywgcmVzZXQgdGltZXIgYmFzZWxpbmVcbiAgY29uc3Qgc3RhZ2VUeXBlID0gaW5mZXJTdGFnZVR5cGUoc3RhdGUuc3RhZ2UpO1xuICBjb25zdCBleHBlY3RlZCA9IFJPVU5EX1NFQ09ORFNbc3RhZ2VUeXBlXSB8fCBST1VORF9TRUNPTkRTLmRlZmF1bHQ7XG4gIGlmIChNYXRoLmFicyhleHBlY3RlZCAtIHN0YWdlRHVyYXRpb24pID4gMC4xIHx8IHN0YWdlU3RhcnRUcyA9PT0gMCkge1xuICAgIHN0YWdlRHVyYXRpb24gPSBleHBlY3RlZDtcbiAgICBzdGFnZVN0YXJ0VHMgPSBEYXRlLm5vdygpO1xuICB9XG5cbiAgY29uc3QgZWxhcHNlZCA9IChEYXRlLm5vdygpIC0gc3RhZ2VTdGFydFRzKSAvIDEwMDA7XG4gIGNvbnN0IHJlbWFpbmluZyA9IE1hdGgubWF4KDAsIHN0YWdlRHVyYXRpb24gLSBlbGFwc2VkKTtcbiAgdGltZXJFbC50ZXh0Q29udGVudCA9IGZvcm1hdFRpbWUocmVtYWluaW5nKTtcbiAgdGltZXJFbC5jbGFzc0xpc3QudG9nZ2xlKCdoZC11cmdlbnQnLCByZW1haW5pbmcgPiAwICYmIHJlbWFpbmluZyA8IDUpO1xufVxuXG4vLyBMaWdodHdlaWdodCBzdGFnZS10eXBlIGNsYXNzaWZpZXIgKG1hdGNoZXMgdGhlIGNhdGVnb3JpZXMgdXNlZCBieSB0aGVcbi8vIEdhbWVFdmVudHMgUHJvdmlkZXIgVEZUX2hhbmRsZXIuanMpLiBSZXR1cm5zIGEga2V5IGludG8gUk9VTkRfU0VDT05EUy5cbmZ1bmN0aW9uIGluZmVyU3RhZ2VUeXBlKHN0YWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoIXN0YWdlKSByZXR1cm4gJ2RlZmF1bHQnO1xuICBjb25zdCBzID0gc3RhZ2UudG9Mb3dlckNhc2UoKTtcbiAgaWYgKHMuaW5jbHVkZXMoJ2Nhcm91c2VsJykpICAgICByZXR1cm4gJ0Nhcm91c2VsJztcbiAgaWYgKHMuaW5jbHVkZXMoJ2F1Z21lbnQnKSkgICAgICByZXR1cm4gJ0F1Z21lbnRfMSc7XG4gIGlmIChzLmluY2x1ZGVzKCdwb3J0YWwnKSkgICAgICAgcmV0dXJuICdQb3J0YWwnO1xuICBpZiAocy5pbmNsdWRlcygnY29tYmF0JykpICAgICAgIHJldHVybiAnUFZQJztcbiAgaWYgKHMuaW5jbHVkZXMoJ21pbmlvbnMnKSB8fCBzLmluY2x1ZGVzKCdwdmUnKSkgcmV0dXJuICdQVkUnO1xuICByZXR1cm4gJ2RlZmF1bHQnO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hkLWNsb3NlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VXaW5kb3cpO1xuXG4gIC8vIFJlYWN0IHRvIHN0YWdlIHRyYW5zaXRpb25zIGZyb20gTWF0Y2hUcmFja2VyIOKAlCByZXNldCB0aGUgdGltZXIgYmFzZWxpbmVcbiAgTWF0Y2hUcmFja2VyLmluc3RhbmNlKCkub25TdGF0ZUNoYW5nZSgoc3RhdGUpID0+IHtcbiAgICBpZiAoIXN0YXRlLmluTWF0Y2gpIHtcbiAgICAgIHN0YWdlU3RhcnRUcyA9IDA7XG4gICAgICBzdGFnZUR1cmF0aW9uID0gUk9VTkRfU0VDT05EUy5kZWZhdWx0O1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gMjAwIG1zIHRpY2sg4oCUIHNtb290aCBlbm91Z2ggZm9yIGEgY2xvY2ssIGNoZWFwIG9uIENQVVxuICBzZXRJbnRlcnZhbCh0aWNrLCAyMDApO1xuICB0aWNrKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==