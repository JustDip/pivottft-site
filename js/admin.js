/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@overwolf/overwolf-api-ts/dist/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@overwolf/overwolf-api-ts/dist/index.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./ow-game-listener */ "./node_modules/@overwolf/overwolf-api-ts/dist/ow-game-listener.js"), exports);
__exportStar(__webpack_require__(/*! ./ow-games-events */ "./node_modules/@overwolf/overwolf-api-ts/dist/ow-games-events.js"), exports);
__exportStar(__webpack_require__(/*! ./ow-games */ "./node_modules/@overwolf/overwolf-api-ts/dist/ow-games.js"), exports);
__exportStar(__webpack_require__(/*! ./ow-hotkeys */ "./node_modules/@overwolf/overwolf-api-ts/dist/ow-hotkeys.js"), exports);
__exportStar(__webpack_require__(/*! ./ow-listener */ "./node_modules/@overwolf/overwolf-api-ts/dist/ow-listener.js"), exports);
__exportStar(__webpack_require__(/*! ./ow-window */ "./node_modules/@overwolf/overwolf-api-ts/dist/ow-window.js"), exports);


/***/ }),

/***/ "./node_modules/@overwolf/overwolf-api-ts/dist/ow-game-listener.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@overwolf/overwolf-api-ts/dist/ow-game-listener.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OWGameListener = void 0;
const ow_listener_1 = __webpack_require__(/*! ./ow-listener */ "./node_modules/@overwolf/overwolf-api-ts/dist/ow-listener.js");
class OWGameListener extends ow_listener_1.OWListener {
    constructor(delegate) {
        super(delegate);
        this.onGameInfoUpdated = (update) => {
            if (!update || !update.gameInfo) {
                return;
            }
            if (!update.runningChanged && !update.gameChanged) {
                return;
            }
            if (update.gameInfo.isRunning) {
                if (this._delegate.onGameStarted) {
                    this._delegate.onGameStarted(update.gameInfo);
                }
            }
            else {
                if (this._delegate.onGameEnded) {
                    this._delegate.onGameEnded(update.gameInfo);
                }
            }
        };
        this.onRunningGameInfo = (info) => {
            if (!info) {
                return;
            }
            if (info.isRunning) {
                if (this._delegate.onGameStarted) {
                    this._delegate.onGameStarted(info);
                }
            }
        };
    }
    start() {
        super.start();
        overwolf.games.onGameInfoUpdated.addListener(this.onGameInfoUpdated);
        overwolf.games.getRunningGameInfo(this.onRunningGameInfo);
    }
    stop() {
        overwolf.games.onGameInfoUpdated.removeListener(this.onGameInfoUpdated);
    }
}
exports.OWGameListener = OWGameListener;


/***/ }),

/***/ "./node_modules/@overwolf/overwolf-api-ts/dist/ow-games-events.js":
/*!************************************************************************!*\
  !*** ./node_modules/@overwolf/overwolf-api-ts/dist/ow-games-events.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OWGamesEvents = void 0;
const timer_1 = __webpack_require__(/*! ./timer */ "./node_modules/@overwolf/overwolf-api-ts/dist/timer.js");
class OWGamesEvents {
    constructor(delegate, requiredFeatures, featureRetries = 10) {
        this.onInfoUpdates = (info) => {
            this._delegate.onInfoUpdates(info.info);
        };
        this.onNewEvents = (e) => {
            this._delegate.onNewEvents(e);
        };
        this._delegate = delegate;
        this._requiredFeatures = requiredFeatures;
        this._featureRetries = featureRetries;
    }
    async getInfo() {
        return new Promise((resolve) => {
            overwolf.games.events.getInfo(resolve);
        });
    }
    async setRequiredFeatures() {
        let tries = 1, result;
        while (tries <= this._featureRetries) {
            result = await new Promise(resolve => {
                overwolf.games.events.setRequiredFeatures(this._requiredFeatures, resolve);
            });
            if (result.status === 'success') {
                console.log('setRequiredFeatures(): success: ' + JSON.stringify(result, null, 2));
                return (result.supportedFeatures.length > 0);
            }
            await timer_1.Timer.wait(3000);
            tries++;
        }
        console.warn('setRequiredFeatures(): failure after ' + tries + ' tries' + JSON.stringify(result, null, 2));
        return false;
    }
    registerEvents() {
        this.unRegisterEvents();
        overwolf.games.events.onInfoUpdates2.addListener(this.onInfoUpdates);
        overwolf.games.events.onNewEvents.addListener(this.onNewEvents);
    }
    unRegisterEvents() {
        overwolf.games.events.onInfoUpdates2.removeListener(this.onInfoUpdates);
        overwolf.games.events.onNewEvents.removeListener(this.onNewEvents);
    }
    async start() {
        console.log(`[ow-game-events] START`);
        this.registerEvents();
        await this.setRequiredFeatures();
        const { res, status } = await this.getInfo();
        if (res && status === 'success') {
            this.onInfoUpdates({ info: res });
        }
    }
    stop() {
        console.log(`[ow-game-events] STOP`);
        this.unRegisterEvents();
    }
}
exports.OWGamesEvents = OWGamesEvents;


/***/ }),

/***/ "./node_modules/@overwolf/overwolf-api-ts/dist/ow-games.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@overwolf/overwolf-api-ts/dist/ow-games.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OWGames = void 0;
class OWGames {
    static getRunningGameInfo() {
        return new Promise((resolve) => {
            overwolf.games.getRunningGameInfo(resolve);
        });
    }
    static classIdFromGameId(gameId) {
        let classId = Math.floor(gameId / 10);
        return classId;
    }
    static async getRecentlyPlayedGames(limit = 3) {
        return new Promise((resolve) => {
            if (!overwolf.games.getRecentlyPlayedGames) {
                return resolve(null);
            }
            overwolf.games.getRecentlyPlayedGames(limit, result => {
                resolve(result.games);
            });
        });
    }
    static async getGameDBInfo(gameClassId) {
        return new Promise((resolve) => {
            overwolf.games.getGameDBInfo(gameClassId, resolve);
        });
    }
}
exports.OWGames = OWGames;


/***/ }),

/***/ "./node_modules/@overwolf/overwolf-api-ts/dist/ow-hotkeys.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@overwolf/overwolf-api-ts/dist/ow-hotkeys.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OWHotkeys = void 0;
class OWHotkeys {
    constructor() { }
    static getHotkeyText(hotkeyId, gameId) {
        return new Promise(resolve => {
            overwolf.settings.hotkeys.get(result => {
                if (result && result.success) {
                    let hotkey;
                    if (gameId === undefined)
                        hotkey = result.globals.find(h => h.name === hotkeyId);
                    else if (result.games && result.games[gameId])
                        hotkey = result.games[gameId].find(h => h.name === hotkeyId);
                    if (hotkey)
                        return resolve(hotkey.binding);
                }
                resolve('UNASSIGNED');
            });
        });
    }
    static onHotkeyDown(hotkeyId, action) {
        overwolf.settings.hotkeys.onPressed.addListener((result) => {
            if (result && result.name === hotkeyId)
                action(result);
        });
    }
}
exports.OWHotkeys = OWHotkeys;


/***/ }),

/***/ "./node_modules/@overwolf/overwolf-api-ts/dist/ow-listener.js":
/*!********************************************************************!*\
  !*** ./node_modules/@overwolf/overwolf-api-ts/dist/ow-listener.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OWListener = void 0;
class OWListener {
    constructor(delegate) {
        this._delegate = delegate;
    }
    start() {
        this.stop();
    }
}
exports.OWListener = OWListener;


/***/ }),

/***/ "./node_modules/@overwolf/overwolf-api-ts/dist/ow-window.js":
/*!******************************************************************!*\
  !*** ./node_modules/@overwolf/overwolf-api-ts/dist/ow-window.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OWWindow = void 0;
class OWWindow {
    constructor(name = null) {
        this._name = name;
        this._id = null;
    }
    async restore() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.restore(id, result => {
                if (!result.success)
                    console.error(`[restore] - an error occurred, windowId=${id}, reason=${result.error}`);
                resolve();
            });
        });
    }
    async minimize() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.minimize(id, () => { });
            return resolve();
        });
    }
    async maximize() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.maximize(id, () => { });
            return resolve();
        });
    }
    async hide() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.hide(id, () => { });
            return resolve();
        });
    }
    async close() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            const result = await this.getWindowState();
            if (result.success &&
                (result.window_state !== 'closed')) {
                await this.internalClose();
            }
            return resolve();
        });
    }
    dragMove(elem) {
        elem.className = elem.className + ' draggable';
        elem.onmousedown = e => {
            e.preventDefault();
            overwolf.windows.dragMove(this._name);
        };
    }
    async getWindowState() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.getWindowState(id, resolve);
        });
    }
    static async getCurrentInfo() {
        return new Promise(async (resolve) => {
            overwolf.windows.getCurrentWindow(result => {
                resolve(result.window);
            });
        });
    }
    obtain() {
        return new Promise((resolve, reject) => {
            const cb = res => {
                if (res && res.status === "success" && res.window && res.window.id) {
                    this._id = res.window.id;
                    if (!this._name) {
                        this._name = res.window.name;
                    }
                    resolve(res.window);
                }
                else {
                    this._id = null;
                    reject();
                }
            };
            if (!this._name) {
                overwolf.windows.getCurrentWindow(cb);
            }
            else {
                overwolf.windows.obtainDeclaredWindow(this._name, cb);
            }
        });
    }
    async assureObtained() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.obtain();
            return resolve();
        });
    }
    async internalClose() {
        let that = this;
        return new Promise(async (resolve, reject) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.close(id, res => {
                if (res && res.success)
                    resolve();
                else
                    reject(res);
            });
        });
    }
}
exports.OWWindow = OWWindow;


/***/ }),

/***/ "./node_modules/@overwolf/overwolf-api-ts/dist/timer.js":
/*!**************************************************************!*\
  !*** ./node_modules/@overwolf/overwolf-api-ts/dist/timer.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Timer = void 0;
class Timer {
    constructor(delegate, id) {
        this._timerId = null;
        this.handleTimerEvent = () => {
            this._timerId = null;
            this._delegate.onTimer(this._id);
        };
        this._delegate = delegate;
        this._id = id;
    }
    static async wait(intervalInMS) {
        return new Promise(resolve => {
            setTimeout(resolve, intervalInMS);
        });
    }
    start(intervalInMS) {
        this.stop();
        this._timerId = setTimeout(this.handleTimerEvent, intervalInMS);
    }
    stop() {
        if (this._timerId == null) {
            return;
        }
        clearTimeout(this._timerId);
        this._timerId = null;
    }
}
exports.Timer = Timer;


/***/ }),

/***/ "./src/AppWindow.ts":
/*!**************************!*\
  !*** ./src/AppWindow.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppWindow = exports.isOverwolf = void 0;
const overwolf_api_ts_1 = __webpack_require__(/*! @overwolf/overwolf-api-ts */ "./node_modules/@overwolf/overwolf-api-ts/dist/index.js");
exports.isOverwolf = typeof overwolf !== 'undefined' && typeof overwolf.windows !== 'undefined';
class AppWindow {
    constructor(windowName) {
        this.maximized = false;
        try {
            this.mainWindow = new overwolf_api_ts_1.OWWindow('background');
            this.currWindow = new overwolf_api_ts_1.OWWindow(windowName);
        }
        catch (_a) {
        }
        const closeButton = document.getElementById('closeButton');
        const maximizeButton = document.getElementById('maximizeButton');
        const minimizeButton = document.getElementById('minimizeButton');
        const header = document.getElementById('header');
        if (exports.isOverwolf) {
            this.setDrag(header);
        }
        closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', () => {
            if (this.mainWindow)
                this.mainWindow.close();
        });
        minimizeButton === null || minimizeButton === void 0 ? void 0 : minimizeButton.addEventListener('click', () => {
            if (this.currWindow)
                this.currWindow.minimize();
        });
        maximizeButton === null || maximizeButton === void 0 ? void 0 : maximizeButton.addEventListener('click', () => {
            if (!this.currWindow)
                return;
            if (!this.maximized) {
                this.currWindow.maximize();
            }
            else {
                this.currWindow.restore();
            }
            this.maximized = !this.maximized;
        });
    }
    async getWindowState() {
        var _a;
        return await ((_a = this.currWindow) === null || _a === void 0 ? void 0 : _a.getWindowState());
    }
    async setDrag(elem) {
        var _a;
        (_a = this.currWindow) === null || _a === void 0 ? void 0 : _a.dragMove(elem);
    }
}
exports.AppWindow = AppWindow;


/***/ }),

/***/ "./src/admin/BoardEditor.ts":
/*!**********************************!*\
  !*** ./src/admin/BoardEditor.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoardEditor = void 0;
const champions_1 = __webpack_require__(/*! ../data/set18/champions */ "./src/data/set18/champions.ts");
const assetUrls_1 = __webpack_require__(/*! ../data/assetUrls */ "./src/data/assetUrls.ts");
class BoardEditor {
    constructor(rosterEl, boardEl, onChange) {
        this.placements = [];
        this.selectedRosterId = null;
        this.rosterEl = rosterEl;
        this.boardEl = boardEl;
        this.onChange = onChange;
        this.renderRoster();
        this.renderBoard();
        this.wire();
    }
    get() {
        return this.placements.map(p => (Object.assign({}, p)));
    }
    set(placements) {
        this.placements = (placements || [])
            .filter(p => champions_1.championMap.has(p.championId))
            .map(p => ({ row: p.row, col: p.col, championId: p.championId, role: p.role }));
        this.selectedRosterId = null;
        this.rosterEl.querySelectorAll('.be-roster-unit').forEach(el => el.classList.remove('selected'));
        this.renderBoard();
    }
    championIds() {
        return [...this.placements].sort((a, b) => b.row - a.row || a.col - b.col).map(p => p.championId);
    }
    renderRoster() {
        this.rosterEl.innerHTML = champions_1.champions
            .slice()
            .sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name))
            .map(c => {
            const icon = assetUrls_1.getChampionIconUrl(c.id);
            const initials = c.name.split(' ').map(w => w[0]).join('').substring(0, 2);
            return `
          <div class="be-roster-unit cost-${c.cost}" data-champion-id="${c.id}" draggable="true" title="${c.name} (${c.cost}g) — ${c.traits.join(', ')}">
            <div class="comp-hex-frame"></div>
            <div class="comp-hex-inner">
              ${icon ? `<img src="${icon}" alt="${c.name}" loading="lazy">` : `<span class="comp-hex-initials">${initials}</span>`}
            </div>
          </div>
        `;
        }).join('');
    }
    renderBoard() {
        const occ = new Map();
        for (const p of this.placements)
            occ.set(`${p.row}-${p.col}`, p.championId);
        let html = '';
        for (let row = 3; row >= 0; row--) {
            const isOddRow = row % 2 === 1;
            html += `<div class="hex-row ${isOddRow ? 'hex-row-offset' : ''}">`;
            for (let col = 0; col < 7; col++) {
                const championId = occ.get(`${row}-${col}`);
                if (championId) {
                    const champ = champions_1.championMap.get(championId);
                    const icon = assetUrls_1.getChampionIconUrl(championId);
                    const initials = (champ === null || champ === void 0 ? void 0 : champ.name.split(' ').map(w => w[0]).join('').substring(0, 2)) || '?';
                    html += `
            <div class="hex-cell hex-occupied cost-${(champ === null || champ === void 0 ? void 0 : champ.cost) || 1} be-cell" data-row="${row}" data-col="${col}" draggable="true" title="${(champ === null || champ === void 0 ? void 0 : champ.name) || ''} — click to remove">
              <div class="hex-inner">
                ${icon ? `<img src="${icon}" alt="${(champ === null || champ === void 0 ? void 0 : champ.name) || ''}" class="hex-champ-img" loading="lazy">` : `<span class="hex-unit-name">${initials}</span>`}
              </div>
            </div>`;
                }
                else {
                    html += `
            <div class="hex-cell be-cell be-empty" data-row="${row}" data-col="${col}">
              <div class="hex-inner"></div>
            </div>`;
                }
            }
            html += '</div>';
        }
        this.boardEl.innerHTML = html;
    }
    changed() {
        this.renderBoard();
        this.onChange(this.get());
    }
    place(row, col, championId) {
        const at = this.placements.findIndex(p => p.row === row && p.col === col);
        if (at !== -1)
            this.placements.splice(at, 1);
        const dup = this.placements.findIndex(p => p.championId === championId);
        if (dup !== -1)
            this.placements.splice(dup, 1);
        if (this.placements.length >= 10)
            return;
        this.placements.push({ row, col, championId });
    }
    wire() {
        const roster = this.rosterEl;
        const board = this.boardEl;
        roster.addEventListener('click', (e) => {
            const target = e.target.closest('.be-roster-unit');
            if (!target)
                return;
            const id = target.getAttribute('data-champion-id');
            if (!id)
                return;
            this.selectedRosterId = this.selectedRosterId === id ? null : id;
            roster.querySelectorAll('.be-roster-unit').forEach(el => {
                el.classList.toggle('selected', el.getAttribute('data-champion-id') === this.selectedRosterId);
            });
        });
        board.addEventListener('click', (e) => {
            const cell = e.target.closest('.be-cell');
            if (!cell)
                return;
            const row = parseInt(cell.getAttribute('data-row') || '-1', 10);
            const col = parseInt(cell.getAttribute('data-col') || '-1', 10);
            if (row < 0 || col < 0)
                return;
            const at = this.placements.findIndex(p => p.row === row && p.col === col);
            if (this.selectedRosterId) {
                this.place(row, col, this.selectedRosterId);
                this.changed();
            }
            else if (at !== -1) {
                this.placements.splice(at, 1);
                this.changed();
            }
        });
        roster.addEventListener('dragstart', (e) => {
            var _a;
            const target = e.target.closest('.be-roster-unit');
            if (!target)
                return;
            (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/plain', `roster:${target.getAttribute('data-champion-id') || ''}`);
            if (e.dataTransfer)
                e.dataTransfer.effectAllowed = 'copy';
        });
        board.addEventListener('dragstart', (e) => {
            var _a;
            const cell = e.target.closest('.hex-occupied');
            if (!cell)
                return;
            (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/plain', `board:${cell.getAttribute('data-row')}-${cell.getAttribute('data-col')}`);
            if (e.dataTransfer)
                e.dataTransfer.effectAllowed = 'move';
        });
        board.addEventListener('dragover', (e) => {
            const cell = e.target.closest('.be-cell');
            if (!cell)
                return;
            e.preventDefault();
            cell.classList.add('drag-over');
        });
        board.addEventListener('dragleave', (e) => {
            var _a;
            (_a = e.target.closest('.be-cell')) === null || _a === void 0 ? void 0 : _a.classList.remove('drag-over');
        });
        board.addEventListener('drop', (e) => {
            var _a;
            e.preventDefault();
            const cell = e.target.closest('.be-cell');
            if (!cell)
                return;
            cell.classList.remove('drag-over');
            const row = parseInt(cell.getAttribute('data-row') || '-1', 10);
            const col = parseInt(cell.getAttribute('data-col') || '-1', 10);
            if (row < 0 || col < 0)
                return;
            const raw = ((_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text/plain')) || '';
            if (raw.startsWith('roster:')) {
                this.place(row, col, raw.slice('roster:'.length));
                this.changed();
            }
            else if (raw.startsWith('board:')) {
                const [r, c] = raw.slice('board:'.length).split('-').map(n => parseInt(n, 10));
                const from = this.placements.findIndex(p => p.row === r && p.col === c);
                if (from === -1)
                    return;
                const targetIdx = this.placements.findIndex(p => p.row === row && p.col === col);
                if (targetIdx !== -1 && targetIdx !== from)
                    this.placements.splice(targetIdx, 1);
                const moved = this.placements.find(p => p.row === r && p.col === c);
                moved.row = row;
                moved.col = col;
                this.changed();
            }
        });
    }
}
exports.BoardEditor = BoardEditor;


/***/ }),

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
exports.kCurrentTftPatch = '18.2b';
exports.kCurrentTftSetNumber = 18;
exports.kPlatformToRegion = {
    'euw1': 'europe', 'eun1': 'europe', 'tr1': 'europe', 'ru': 'europe',
    'na1': 'americas', 'br1': 'americas', 'la1': 'americas', 'la2': 'americas',
    'kr': 'asia', 'jp1': 'asia', 'oc1': 'asia', 'ph2': 'asia',
    'sg2': 'asia', 'th2': 'asia', 'tw2': 'asia', 'vn2': 'asia',
};


/***/ }),

/***/ "./src/data/assetUrls.ts":
/*!*******************************!*\
  !*** ./src/data/assetUrls.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTraitIconUrl = exports.getAugmentIconUrl = exports.getItemIconUrl = exports.getChampionIconUrl = void 0;
const champions_1 = __webpack_require__(/*! ./set18/champions */ "./src/data/set18/champions.ts");
const GAME_BASE = 'https://raw.communitydragon.org/latest/game';
function cdragonPath(assetPath) {
    return assetPath
        .toLowerCase()
        .replace(/\.tex$/, '.png')
        .replace(/\.tft_(set\d+|tft\d+_\d+)(?=\.png$)/, '');
}
function getChampionIconUrl(championId) {
    const champ = champions_1.championMap.get(championId);
    if (!champ || !champ.tileIcon)
        return '';
    return `${GAME_BASE}/${cdragonPath(champ.tileIcon)}`;
}
exports.getChampionIconUrl = getChampionIconUrl;
const items_1 = __webpack_require__(/*! ./set18/items */ "./src/data/set18/items.ts");
function getItemIconUrl(itemId) {
    const item = items_1.itemMap.get(itemId);
    if (!item || !item.icon)
        return '';
    return `${GAME_BASE}/${cdragonPath(item.icon)}`;
}
exports.getItemIconUrl = getItemIconUrl;
function getAugmentIconUrl(iconPath) {
    if (!iconPath)
        return '';
    return `${GAME_BASE}/${cdragonPath(iconPath)}`;
}
exports.getAugmentIconUrl = getAugmentIconUrl;
function getTraitIconUrl(iconPath) {
    if (!iconPath)
        return '';
    const path = cdragonPath(iconPath);
    return `${GAME_BASE}/${path}`;
}
exports.getTraitIconUrl = getTraitIconUrl;


/***/ }),

/***/ "./src/data/set18/champions.ts":
/*!*************************************!*\
  !*** ./src/data/set18/champions.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getChampionsByTrait = exports.getChampionsByCost = exports.championMap = exports.champions = void 0;
exports.champions = [
    { id: "DA_18_Akali_AD", name: "Akali", cost: 1, traits: ["Inferno", "Adaptor", "Ravager"], tileIcon: "assets/characters/tft18_akali/skins/base/images/tft18_akali_splash_tile_2.png" },
    { id: "DA_18_Camille", name: "Camille", cost: 1, traits: ["Coven", "Ravager"], tileIcon: "assets/characters/tft18_camille/skins/base/images/tft18_camille_splash_tile_2.png" },
    { id: "DA_Cinderling18", name: "Cinderling", cost: 1, traits: ["Riftbeast", "Hunter"], tileIcon: "assets/characters/tft18_cinderling/skins/base/images/t_18_cinderling_teamplannersplash.png" },
    { id: "DA_Karma18", name: "Karma", cost: 1, traits: ["Blossom", "Spellweaver"], tileIcon: "assets/characters/tft18_karma/skins/base/images/tft18_karma_splash_tile_70.png" },
    { id: "DA_18_Kobuko", name: "Kobuko", cost: 1, traits: ["Sprykin", "Brawler"], tileIcon: "assets/characters/tft18_kobuko/skins/base/images/tft18_kobuko_splash_tile_2.png" },
    { id: "DA_18_Leona", name: "Leona", cost: 1, traits: ["Solar", "Defender"], tileIcon: "assets/characters/tft18_leona/skins/base/images/tft18_leona_splash_tile_10.png" },
    { id: "DA_18_Ornn", name: "Ornn", cost: 1, traits: ["Elderwood", "Defender"], tileIcon: "assets/characters/tft18_ornn/skins/base/images/tft18_ornn_splash_tile_2.png" },
    { id: "DA_18_Sentry", name: "Pebbles", cost: 1, traits: ["Riftbeast", "Invoker"], tileIcon: "assets/characters/tft18_sentry/skins/base/images/t_18_sentry_teamplannersplash.png" },
    { id: "DA_18_Rakan", name: "Rakan", cost: 1, traits: ["Fae", "Juggernaut", "Vanguard"], tileIcon: "assets/characters/tft18_rakan/skins/base/images/tft18_rakan_splash_tile_9.png" },
    { id: "DA_18_RekSai", name: "Rek'Sai", cost: 1, traits: ["Blackthorn", "Brawler"], tileIcon: "assets/characters/tft18_reksai/skins/base/images/tft18_reksai_splash_tile_17.png" },
    { id: "DA_18_Varus", name: "Varus", cost: 1, traits: ["Inferno", "Rapidfire"], tileIcon: "assets/characters/tft18_varus/skins/base/images/tft18_varus_splash_tile_9.png" },
    { id: "DA_18_Veigar", name: "Veigar", cost: 1, traits: ["Blackthorn", "Sprykin", "Spellweaver"], tileIcon: "assets/characters/tft18_veigar/skins/base/images/tft18_veigar_splash_tile_13.png" },
    { id: "DA_18_Xayah", name: "Xayah", cost: 1, traits: ["Elderwood", "Fae", "Rapidfire"], tileIcon: "assets/characters/tft18_xayah/skins/base/images/tft18_xayah_splash_tile_8.png" },
    { id: "DA_18_Yorick", name: "Yorick", cost: 1, traits: ["Blossom", "Juggernaut", "Summoner"], tileIcon: "assets/characters/tft18_yorick/skins/base/images/tft18_yorick_splash_tile_30.png" },
    { id: "DA_18_Alistar", name: "Alistar", cost: 2, traits: ["Elderwood", "Brawler"], tileIcon: "assets/characters/tft18_alistar/skins/base/images/tft18_alistar_splash_tile_40.png" },
    { id: "DA_18_Caitlyn", name: "Caitlyn", cost: 2, traits: ["Coven", "Hunter"], tileIcon: "assets/characters/tft18_caitlyn/skins/base/images/tft18_caitlyn_splash_tile_30.png" },
    { id: "DA_18_Elise", name: "Elise", cost: 2, traits: ["Coven", "Vanguard"], tileIcon: "assets/characters/tft18_elise/skins/base/images/tft18_elise_splash_tile_24.png" },
    { id: "DA_Gromp18_AP", name: "Gromp", cost: 2, traits: ["Riftbeast", "Adaptor"], tileIcon: "assets/characters/tft18_gromp/skins/base/images/t_18_gromp_teamplannersplash.png" },
    { id: "DA_18_Kayle", name: "Kayle", cost: 2, traits: ["Solar", "Rapidfire"], tileIcon: "assets/characters/tft18_kayle/skins/base/images/tft18_kayle_splash_tile_42.png" },
    { id: "DA_18_LeBlanc", name: "LeBlanc", cost: 2, traits: ["Elderwood", "Spellweaver"], tileIcon: "assets/characters/tft18_leblanc/skins/base/images/tft18_leblanc_splash_tile_5.png" },
    { id: "DA_Murkwolf18", name: "Murkwolf", cost: 2, traits: ["Riftbeast", "Ravager"], tileIcon: "assets/characters/tft18_murkwolf/skins/base/images/t_18_murkwolf_teamplannersplash.png" },
    { id: "DA_Scuttlecrab18", name: "Scuttlecrab", cost: 2, traits: ["Riftbeast", "Juggernaut"], tileIcon: "assets/characters/tft18_scuttlecrab/skins/base/images/t_18_scuttlecrab_teamplannersplash.png" },
    { id: "DA_18_Sejuani", name: "Sejuani", cost: 2, traits: ["Solar", "Juggernaut"], tileIcon: "assets/characters/tft18_sejuani/skins/base/images/tft18_sejuani_splash_tile_26.png" },
    { id: "DA_18_Shen", name: "Shen", cost: 2, traits: ["Inferno", "Defender"], tileIcon: "assets/characters/tft18_shen/skins/base/images/tft18_shen_splash_tile_16.png" },
    { id: "DA_18_Teemo", name: "Teemo", cost: 2, traits: ["Sprykin", "Invoker"], tileIcon: "assets/characters/tft18_teemo/skins/base/images/tft18_teemo_splash_tile_0.png" },
    { id: "DA_18_Warwick", name: "Warwick", cost: 2, traits: ["Blackthorn", "Ravager"], tileIcon: "assets/characters/tft18_warwick/skins/base/images/tft18_warwick_splash_tile_35.png" },
    { id: "DA_18_Yunara", name: "Yunara", cost: 2, traits: ["Blossom", "Executioner"], tileIcon: "assets/characters/tft18_yunara/skins/base/images/tft18_yunara_splash_tile_0.png" },
    { id: "DA_18_Azir", name: "Azir", cost: 3, traits: ["Blackthorn", "Executioner", "Summoner"], tileIcon: "assets/characters/tft18_azir/skins/base/images/tft18_azir_splash_tile_5.png" },
    { id: "DA_18_Cassiopeia", name: "Cassiopeia", cost: 3, traits: ["Coven", "Spellweaver"], tileIcon: "assets/characters/tft18_cassiopeia/skins/base/images/tft18_cassiopeia_splash_tile_18.png" },
    { id: "DA_18_Diana", name: "Diana", cost: 3, traits: ["Lunar", "Ravager", "Vanguard"], tileIcon: "assets/characters/tft18_diana/skins/base/images/tft18_diana_splash_tile_0.png" },
    { id: "DA_Fiddlesticks18", name: "Fiddlesticks", cost: 3, traits: ["Flora Fatalis", "Defender", "Spellweaver"], tileIcon: "assets/characters/tft18_fiddlesticks/skins/base/images/tft18_fiddlesticks_splash_tile_46.png" },
    { id: "DA_18_Hecarim", name: "Hecarim", cost: 3, traits: ["Elderwood", "Vanguard"], tileIcon: "assets/characters/tft18_hecarim/skins/base/images/tft18_hecarim_splash_tile_5.png" },
    { id: "DA_18_KhaZix", name: "Kha'Zix", cost: 3, traits: ["Rival"], tileIcon: "assets/characters/tft18_khazix/skins/base/images/tft18_khazix_splash_tile_0.png" },
    { id: "DA_KogMaw18_AD", name: "Kog'Maw", cost: 3, traits: ["Caustic", "Adaptor", "Invoker"], tileIcon: "assets/characters/tft18_kogmaw/skins/base/images/tft18_kogmaw_splash_tile_3.png" },
    { id: "DA_Krug18", name: "Krug", cost: 3, traits: ["Riftbeast", "Brawler"], tileIcon: "assets/characters/tft18_krug/skins/base/images/t_18_krug_teamplannersplash.png" },
    { id: "DA_CrimsonRaptor18", name: "Mama Beak", cost: 3, traits: ["Riftbeast", "Summoner", "Rapidfire"], tileIcon: "assets/characters/tft18_raptor/skins/base/images/t_18_crimsonraptor_teamplannersplash.png" },
    { id: "DA_18_MasterYi_AD", name: "Master Yi", cost: 3, traits: ["Blossom", "Adaptor"], tileIcon: "assets/characters/tft18_masteryi/skins/base/images/tft18_masteryi_splash_tile_52.png" },
    { id: "DA_18_Rammus", name: "Rammus", cost: 3, traits: ["Sprykin", "Defender"], tileIcon: "assets/characters/tft18_rammus/skins/base/images/tft18_rammus_splash_tile_26.png" },
    { id: "DA_18_Rengar", name: "Rengar", cost: 3, traits: ["Rival"], tileIcon: "assets/characters/tft18_rengar/skins/base/images/tft18_rengar_splash_tile_0.png" },
    { id: "DA_18_Tristana", name: "Tristana", cost: 3, traits: ["Fae", "Sprykin", "Hunter"], tileIcon: "assets/characters/tft18_tristana/skins/base/images/tft18_tristana_splash_tile_61.png" },
    { id: "DA_Vi18", name: "Vi", cost: 3, traits: ["Primal", "Juggernaut"], tileIcon: "assets/characters/tft18_vi/skins/base/images/tft18_vi_splash_tile_39.png" },
    { id: "DA_18_Ahri", name: "Ahri", cost: 4, traits: ["Blossom", "Spellweaver"], tileIcon: "assets/characters/tft18_ahri/skins/base/images/tft18_ahri_splash_tile_27.png" },
    { id: "DA_Amumu18", name: "Amumu", cost: 4, traits: ["Inferno", "Juggernaut"], tileIcon: "assets/characters/tft18_amumu/skins/base/images/tft18_amumu_splash_tile_17.png" },
    { id: "DA_18_Aphelios", name: "Aphelios", cost: 4, traits: ["Lunar", "Rapidfire"], tileIcon: "assets/characters/tft18_aphelios/skins/base/images/tft18_aphelios_splash_tile_0.png" },
    { id: "DA_Brambleback18", name: "Brambleback", cost: 4, traits: ["Riftbeast", "Ravager"], tileIcon: "assets/characters/tft18_brambleback/skins/base/images/t_18_brambleback_teamplannersplash.png" },
    { id: "DA_18_Ezreal", name: "Ezreal", cost: 4, traits: ["Elderwood", "Executioner"], tileIcon: "assets/characters/tft18_ezreal/skins/base/images/tft18_ezreal_splash_tile_1.png" },
    { id: "DA_18_Lillia", name: "Lillia", cost: 4, traits: ["Fae", "Defender"], tileIcon: "assets/characters/tft18_lillia/skins/base/images/tft18_lillia_splash_tile_28.png" },
    { id: "DA_18_Malphite", name: "Malphite", cost: 4, traits: ["Blackthorn", "Monolith"], tileIcon: "assets/characters/tft18_malphite/skins/base/images/tft18_malphite_splash_tile_27.png" },
    { id: "DA_18_Morgana", name: "Morgana", cost: 4, traits: ["Coven", "Invoker"], tileIcon: "assets/characters/tft18_morgana/skins/base/images/tft18_morgana_splash_tile_26.png" },
    { id: "DA_Nidalee18_AP", name: "Nidalee", cost: 4, traits: ["Primal", "Adaptor"], tileIcon: "assets/characters/tft18_nidalee/skins/base/images/tft18_nidalee_splash_tile_0.png" },
    { id: "DA_Sentinel18", name: "Sentinel", cost: 4, traits: ["Riftbeast", "Vanguard", "Invoker"], tileIcon: "assets/characters/tft18_sentinel/skins/base/images/t_18_sentinel_teamplannersplash.png" },
    { id: "DA_18_Sett", name: "Sett", cost: 4, traits: ["Blossom", "Brawler"], tileIcon: "assets/characters/tft18_sett/skins/base/images/tft18_sett_splash_tile_38.png" },
    { id: "DA_18_Sivir", name: "Sivir", cost: 4, traits: ["Primal", "Hunter"], tileIcon: "assets/characters/tft18_sivir/skins/base/images/tft18_sivir_splash_tile_61.png" },
    { id: "DA_18_Soraka", name: "Soraka", cost: 4, traits: ["Flora Fatalis", "Executioner"], tileIcon: "assets/characters/tft18_soraka/skins/base/images/tft18_soraka_splash_tile_53.png" },
    { id: "DA_18_Zyra", name: "Zyra", cost: 4, traits: ["Thornmaiden", "Summoner"], tileIcon: "assets/characters/tft18_zyra/skins/base/images/tft18_zyra_splash_tile_0.png" },
    { id: "DA_18_Alune", name: "Alune", cost: 5, traits: ["Attuned", "Lunar", "Spellweaver"], tileIcon: "assets/characters/tft18_alune/skins/base/images/tft18_alune_splash_tile_15.png" },
    { id: "DA_18_Ashe", name: "Ashe", cost: 5, traits: ["Blossom", "Hunter"], tileIcon: "assets/characters/tft18_ashe/skins/base/images/tft18_ashe_splash_tile_76.png" },
    { id: "DA_Draven18", name: "Draven", cost: 5, traits: ["Bounty Seeker"], tileIcon: "assets/characters/tft18_draven/skins/base/images/tft18_draven_splash_tile_5.png" },
    { id: "DA_18_ElderDragon", name: "Elder Dragon", cost: 5, traits: ["Apex Predator", "Riftbeast"], tileIcon: "assets/characters/tft18_elderdragon/skins/base/images/t_18_elderdragon_teamplannersplash.png" },
    { id: "DA_18_GnarSmall", name: "Gnar", cost: 5, traits: ["Elderwood", "Sprykin", "Brawler"], tileIcon: "assets/characters/tft18_gnar/skins/base/images/tft18_gnar_splash_tile_0.png" },
    { id: "DA_18_Ivern", name: "Ivern", cost: 5, traits: ["Greenfather"], tileIcon: "assets/characters/tft18_ivern/skins/base/images/tft18_ivern_splash_tile_0.png" },
    { id: "DA_18_Kennen", name: "Kennen", cost: 5, traits: ["Inferno", "Executioner"], tileIcon: "assets/characters/tft18_kennen/skins/base/images/tft18_kennen_splash_tile_8.png" },
    { id: "DA_Lux18_Base", name: "Lux", cost: 5, traits: ["Avatar"], tileIcon: "assets/characters/tft18_lux/skins/base/images/tft18_lux_splash_tile_7.png" },
    { id: "DA_Lux18_Blackthorn", name: "Lux (Blackthorn)", cost: 5, traits: ["Blackthorn", "Avatar"], tileIcon: "assets/characters/tft18_lux/hud/splashes/t_18_lux_blackthorn_teamplanner.png" },
    { id: "DA_Lux18_Blossom", name: "Lux (Blossom)", cost: 5, traits: ["Blossom", "Avatar"], tileIcon: "assets/characters/tft18_lux/hud/splashes/t_18_lux_blossom_teamplanner.png" },
    { id: "DA_18_Lux_Coven", name: "Lux (Coven)", cost: 5, traits: ["Coven", "Avatar"], tileIcon: "assets/characters/tft18_lux/hud/splashes/t_18_lux_coven_teamplanner.png" },
    { id: "DA_18_Lux_Elderwood", name: "Lux (Elderwood)", cost: 5, traits: ["Elderwood", "Avatar"], tileIcon: "assets/characters/tft18_lux/hud/splashes/t_18_lux_elderwood_teamplanner.png" },
    { id: "DA_18_Lux_Fae", name: "Lux (Fae)", cost: 5, traits: ["Fae", "Avatar"], tileIcon: "assets/characters/tft18_lux/hud/splashes/t_18_lux_fae_teamplanner.png" },
    { id: "DA_18_Lux_Inferno", name: "Lux (Inferno)", cost: 5, traits: ["Inferno", "Avatar"], tileIcon: "assets/characters/tft18_lux/hud/splashes/t_18_lux_inferno_teamplanner.png" },
    { id: "DA_18_Lux_Moonbeam", name: "Lux (Lunar)", cost: 5, traits: ["Lunar", "Avatar"], tileIcon: "assets/characters/tft18_lux/hud/splashes/t_18_lux_moonbeam_teamplanner.png" },
    { id: "DA_18_Lux_Primal", name: "Lux (Primal)", cost: 5, traits: ["Primal", "Avatar"], tileIcon: "assets/characters/tft18_lux/hud/splashes/t_18_lux_primal_teamplanner.png" },
    { id: "DA_18_Lux_Sunbeam", name: "Lux (Solar)", cost: 5, traits: ["Solar", "Avatar"], tileIcon: "assets/characters/tft18_lux/hud/splashes/t_18_lux_sunbeam_teamplanner.png" },
    { id: "DA_18_Maokai", name: "Maokai", cost: 5, traits: ["Old Growth", "Juggernaut"], tileIcon: "assets/characters/tft18_maokai/skins/base/images/tft18_maokai_splash_tile_0.png" },
    { id: "DA_Taric18", name: "Taric", cost: 5, traits: ["Emerald Aspect", "Vanguard"], tileIcon: "assets/characters/tft18_taric/skins/base/images/tft18_taric_splash_tile_1.png" },
];
exports.championMap = new Map(exports.champions.map(c => [c.id, c]));
const getChampionsByCost = (cost) => exports.champions.filter(c => c.cost === cost);
exports.getChampionsByCost = getChampionsByCost;
const getChampionsByTrait = (trait) => exports.champions.filter(c => c.traits.includes(trait));
exports.getChampionsByTrait = getChampionsByTrait;


/***/ }),

/***/ "./src/data/set18/comps.ts":
/*!*********************************!*\
  !*** ./src/data/set18/comps.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.seedComps = void 0;
exports.seedComps = [];


/***/ }),

/***/ "./src/data/set18/items.ts":
/*!*********************************!*\
  !*** ./src/data/set18/items.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.itemByApiName = exports.itemMap = exports.items = void 0;
exports.items = [
    { id: "aegis-of-dawn", apiName: "DA_Artifact_AegisOfDawn", name: "Aegis of Dawn", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_aegisofdawn.tex" },
    { id: "aegis-of-dusk", apiName: "DA_Artifact_AegisOfDusk", name: "Aegis of Dusk", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_aegisofdusk.tex" },
    { id: "blighting-jewel", apiName: "DA_Artifact_BlightingJewel", name: "Blighting Jewel", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_blightingjewel.tex" },
    { id: "cappa-juice", apiName: "TFT_Item_Artifact_CappaJuice", name: "Cappa Juice", components: [], type: "artifact", stats: "The holder dons a Hat on each takedown. The holder gains @ADAPPerTakedown@% Attack Damage and Ability Power per Hat. On death lose @PercentHatLoss*100@% of all Hats.&nbsp;(Hats:&nbsp;@TFTUnitProperty.trait:TFT_Item_Artifact_CappaJuice_NumHats@)", icon: "assets/maps/tft/icons/items/hexcore/tft16_artifact_kappajuice.tex" },
    { id: "corrupt-vampiric-scepter", apiName: "TFT_Item_Artifact_CursedVampiricScepter", name: "Corrupt Vampiric Scepter", components: [], type: "artifact", stats: "Attacks deal an additional @PercentDamage@% Attack Damage %i:scaleAD% as physical damage and heal the holder for the damage dealt.The holder cannot cast their Ability or gain Mana.", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_cursedvampiricscepter.tex" },
    { id: "dawncore", apiName: "DA_Artifact_Dawncore", name: "Dawncore", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_dawncore.tex" },
    { id: "eternal-pact", apiName: "DA_Artifact_EternalPact", name: "Eternal Pact", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft16_artifact_eternalpact.tex" },
    { id: "fishbones", apiName: "DA_Artifact_Fishbones", name: "Fishbones", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_fishbones.tex" },
    { id: "flickerblades", apiName: "DA_Artifact_NavoriFlickerblade", name: "Flickerblades", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_navoriflickerplade.tex" },
    { id: "forbidden-idol", apiName: "DA_Artifact_ForbiddenIdol", name: "Forbidden Idol", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_forbiddenidol.tex" },
    { id: "gamblers-blade", apiName: "DA_Artifact_GamblersBlade", name: "Gambler's Blade", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft7_item_shimmerscalegamblersblade.tex" },
    { id: "gold-collector", apiName: "DA_Artifact_GoldCollector", name: "Gold Collector", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft4_item_ornnthecollector.tex" },
    { id: "hellfire-hatchet", apiName: "DA_Artifact_HellfireHatchet", name: "Hellfire Hatchet", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_hellfirehatchet.tex" },
    { id: "horizon-focus", apiName: "DA_Artifact_HorizonFocus", name: "Horizon Focus", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_horizonfocus.tex" },
    { id: "infinity-force", apiName: "DA_Artifact_InfinityForce", name: "Infinity Force", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft4_item_ornninfinityforce.tex" },
    { id: "innervating-locket", apiName: "TFT_Item_Artifact_InnervatingLocket", name: "Innervating Locket", components: [], type: "artifact", stats: "The holder gains @PercentMana@% of their total Mana whenever they're hit by an attack.Each cast restores @PercentHealth@% of the holder's max Health over @Duration@ seconds.", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_innervatinglocket.tex" },
    { id: "lesser-mirrored-persona", apiName: "TFT_Item_Artifact_LesserMirroredPersona", name: "Lesser Mirrored Persona", components: [], type: "artifact", stats: "Share @StatSharePercent*100@% of the holder's bonus Attack Damage, Ability Power, Attack Speed, Armor, Magic Resist, and Health with other Mirrored Persona holders.Can't be ReforgedUnique: one per champion", icon: "assets/maps/tft/icons/items/hexcore/tft16_artifact_lessermirroredpersona.tex" },
    { id: "lich-bane", apiName: "DA_Artifact_LichBane", name: "Lich Bane", components: [], type: "artifact", stats: "", icon: "assets/maps/particles/tft/item_icons/ornn_items/tft_item_artifact_lichbane.tex" },
    { id: "lightshield-crest", apiName: "DA_Artifact_LightshieldCrest", name: "Lightshield Crest", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_lightshieldcrest.tex" },
    { id: "ludens-tempest", apiName: "DA_Artifact_LudensTempest", name: "Luden's Tempest", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_ludenstempest.tex" },
    { id: "manazane", apiName: "DA_Artifact_Manazane", name: "Manazane", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft4_item_ornnmuramana.tex" },
    { id: "mending-echoes", apiName: "TFT_Item_Artifact_MendingEchoes", name: "Mending Echoes", components: [], type: "artifact", stats: "Increase healing on the holder by @IncreasedHealing*100@%. When the holder gives or receives a heal, grant @HealPercentToGrant*100@% of the heals value to the lowest health ally as well.", icon: "assets/maps/tft/icons/items/hexcore/tft16_artifact_mendingechoes.tex" },
    { id: "mirrored-persona", apiName: "TFT_Item_Artifact_MirroredPersona", name: "Mirrored Persona", components: [], type: "artifact", stats: "Every @NumCombats@ player combats gain a lesser copy of Mirrored Persona&nbsp;(@TFTUnitProperty.trait:TFT_Item_Artifact_MirroredPersona_Combats@/@NumCombats@). Share @StatSharePercent*100@% of the holder's bonus Attack Damage, Ability Power, Attack Speed, Armor, Magic Resist, and Health with other Mirrored Persona holders.Can't be Reforged, Lesser copies do not produce copies.Unique: one per champion", icon: "assets/maps/tft/icons/items/hexcore/tft16_artifact_mirroredpersona.tex" },
    { id: "mittens", apiName: "DA_Artifact_Mittens", name: "Mittens", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_mittens.tex" },
    { id: "mogulsmail", apiName: "DA_Artifact_MogulsMail", name: "Mogul'sMail", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft7_item_shimmerscalemogulsmail.tex" },
    { id: "prowlers-claw", apiName: "TFT_Item_Artifact_ProwlersClaw", name: "Prowler's Claw", components: [], type: "artifact", stats: "After killing a target, shed negative effects and dash to the farthest target within @HexRange@ hexes. The next 2 critical attacks deal @CritDamageBonusPercent@% bonus Critical Strike Damage.", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_prowlersclaw.tex" },
    { id: "rapid-firecannon", apiName: "DA_Artifact_RapidFireCannon", name: "Rapid Firecannon", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_rapidfirecannon.tex" },
    { id: "seekers-armguard", apiName: "DA_Artifact_SeekersArmguard", name: "Seeker's Armguard", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_seekersarmguard.tex" },
    { id: "shadow-puppet", apiName: "TFT_Item_Artifact_ShadowPuppet", name: "Shadow Puppet", components: [], type: "artifact", stats: "Spawn a clone that copies the holder's items. The clone has @ClonePercentHealth*100@% max Health and deals @ClonePercentDamage*100@% damage.[Unique - only 1 per champion]", icon: "assets/maps/tft/icons/items/hexcore/tft16_artifact_shadowpuppet.tex" },
    { id: "silvermere-dawn", apiName: "DA_Artifact_SilvermereDawn", name: "Silvermere Dawn", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_silvermeredawn.tex" },
    { id: "spectral-cutlass", apiName: "TFT_Item_Artifact_SpectralCutlass", name: "Spectral Cutlass", components: [], type: "artifact", stats: "Combat start: Teleport the holder to the mirrored hex on the enemy's side of the board. After @Duration@ seconds, the holder returns to their original location.", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_spectralcutlass.tex" },
    { id: "statikk-shiv", apiName: "DA_Artifact_StatikkShiv", name: "Statikk Shiv", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_stattikshiv.tex" },
    { id: "suspicious-trench-coat", apiName: "TFT_Item_Artifact_SuspiciousTrenchCoat", name: "Suspicious Trench Coat", components: [], type: "artifact", stats: "Once per combat at @PercentHealthTrigger@% Health, the holder splits into 3 copies of themself each with @PercentHealthOfCopies@% of their max Health.[Unique - only 1 per champion]", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_suspicioustrenchcoat.tex" },
    { id: "talisman-of-ascension", apiName: "DA_Item_Artifact_TalismanOfAscension", name: "Talisman of Ascension", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_talismanofascension.tex" },
    { id: "the-indomitable", apiName: "DA_Artifact_TheIndomitable", name: "The Indomitable", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_theindomitable.tex" },
    { id: "titanic-hydra", apiName: "DA_Artifact_TitanicHydra", name: "Titanic Hydra", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_titanichydra.tex" },
    { id: "unending-despair", apiName: "TFT_Item_Artifact_UnendingDespair", name: "Unending Despair", components: [], type: "artifact", stats: "Whenever a Shield on the holder breaks, @PercentDamage@% of that Shield's initial value is dealt to the nearest enemy as magic damage.", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_unendingdespair.tex" },
    { id: "void-gauntlet", apiName: "DA_Artifact_VoidGauntlet", name: "Void Gauntlet", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft16_artifact_voidgauntlet.tex" },
    { id: "wits-end", apiName: "DA_Artifact_WitsEnd", name: "Wit's End", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_artifact_witsend.tex" },
    { id: "zhonyas-paradox", apiName: "DA_Artifact_ZhonyasParadox", name: "Zhonya's Paradox", components: [], type: "artifact", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft4_item_ornnzhonyasparadox.tex" },
    { id: "blackthorn-emblem", apiName: "DA_18_EmblemBlackthorn", name: "Blackthorn Emblem", components: ["spatula", "giants-belt"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_blackthorn.tex" },
    { id: "blossom-emblem", apiName: "DA_18_EmblemBlossom", name: "Blossom Emblem", components: ["spatula", "needlessly-large-rod"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_blossom.tex" },
    { id: "brawler-emblem", apiName: "DA_18_EmblemBrawler", name: "Brawler Emblem", components: ["frying-pan", "giants-belt"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_brawler.tex" },
    { id: "coven-emblem", apiName: "DA_18_EmblemCoven", name: "Coven Emblem", components: [], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_coven.tex" },
    { id: "defender-emblem", apiName: "DA_18_EmblemDefender", name: "Defender Emblem", components: [], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_defender.tex" },
    { id: "elderwood-emblem", apiName: "DA_18_EmblemElderwood", name: "Elderwood Emblem", components: ["spatula", "chain-vest"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_elderwood.tex" },
    { id: "executioner-emblem", apiName: "DA_18_EmblemExecutioner", name: "Executioner Emblem", components: ["frying-pan", "sparring-gloves"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_executioner.tex" },
    { id: "fae-emblem", apiName: "DA_18_EmblemFae", name: "Fae Emblem", components: ["spatula", "bf-sword"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_fae.tex" },
    { id: "flora-fatalis-emblem", apiName: "DA_18_EmblemFloraFatalis", name: "Flora Fatalis Emblem", components: [], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_florafatalis.tex" },
    { id: "hunter-emblem", apiName: "DA_18_EmblemHunter", name: "Hunter Emblem", components: ["frying-pan", "bf-sword"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_hunter.tex" },
    { id: "inferno-emblem", apiName: "DA_18_EmblemInferno", name: "Inferno Emblem", components: ["spatula", "recurve-bow"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_inferno.tex" },
    { id: "invoker-emblem", apiName: "DA_18_EmblemInvoker", name: "Invoker Emblem", components: ["frying-pan", "tear-of-the-goddess"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_invoker.tex" },
    { id: "juggernaut-emblem", apiName: "DA_18_EmblemJuggernaut", name: "Juggernaut Emblem", components: [], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_juggernaut.tex" },
    { id: "lunar-emblem", apiName: "DA_18_EmblemLunar", name: "Lunar Emblem", components: ["spatula", "tear-of-the-goddess"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_lunar.tex" },
    { id: "phantom-emblem", apiName: "DA_PhantomEmblem18", name: "Phantom Emblem", components: [], type: "emblem", stats: "Gain a temporary emblem of your most active trait.", icon: "assets/ux/tft/hud/zaps/wands/set18_mechanicicon.tex" },
    { id: "primal-emblem", apiName: "DA_18_EmblemPrimal", name: "Primal Emblem", components: ["spatula", "sparring-gloves"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_primal.tex" },
    { id: "rapidfire-emblem", apiName: "DA_18_EmblemRapidfire", name: "Rapidfire Emblem", components: ["frying-pan", "recurve-bow"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_rapidfire.tex" },
    { id: "ravager-emblem", apiName: "DA_18_EmblemSlayer", name: "Ravager Emblem", components: ["frying-pan", "negatron-cloak"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_ravager.tex" },
    { id: "spellweaver-emblem", apiName: "DA_18_EmblemSpellweaver", name: "Spellweaver Emblem", components: ["frying-pan", "needlessly-large-rod"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_spellweaver.tex" },
    { id: "sprykin-emblem", apiName: "DA_18_EmblemSprykin", name: "Sprykin Emblem", components: ["spatula", "negatron-cloak"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_sprykin.tex" },
    { id: "vanguard-emblem", apiName: "DA_18_EmblemVanguard", name: "Vanguard Emblem", components: ["frying-pan", "chain-vest"], type: "emblem", stats: "", icon: "assets/maps/particles/tft/item_icons/traits/spatula/set18/tft18_emblem_vanguard.tex" },
    { id: "adaptive-helm", apiName: "DA_AdaptiveHelm", name: "Adaptive Helm", components: ["tear-of-the-goddess", "negatron-cloak"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_adaptivehelm.tex" },
    { id: "archangels-staff", apiName: "DA_ArchangelsStaff", name: "Archangel's Staff", components: ["needlessly-large-rod", "tear-of-the-goddess"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_archangelsstaff.tex" },
    { id: "bloodthirster", apiName: "DA_Bloodthirster", name: "Bloodthirster", components: ["bf-sword", "negatron-cloak"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_bloodthirster.tex" },
    { id: "blue-buff", apiName: "DA_BlueBuff", name: "Blue Buff", components: ["tear-of-the-goddess", "tear-of-the-goddess"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_bluebuff.tex" },
    { id: "bramble-vest", apiName: "DA_BrambleVest", name: "Bramble Vest", components: ["chain-vest", "chain-vest"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_bramblevest.tex" },
    { id: "crownguard", apiName: "DA_Crownguard", name: "Crownguard", components: ["needlessly-large-rod", "chain-vest"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_crownguard.tex" },
    { id: "deathblade", apiName: "DA_Deathblade", name: "Deathblade", components: ["bf-sword", "bf-sword"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_deathblade.tex" },
    { id: "dragons-claw", apiName: "DA_DragonsClaw", name: "Dragon's Claw", components: ["negatron-cloak", "negatron-cloak"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_dragonsclaw.tex" },
    { id: "edge-of-night", apiName: "DA_EdgeOfNight", name: "Edge of Night", components: ["bf-sword", "chain-vest"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_guardianangel.tex" },
    { id: "evenshroud", apiName: "DA_Evenshroud", name: "Evenshroud", components: ["negatron-cloak", "giants-belt"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_spectralgauntlet.tex" },
    { id: "gargoyle-stoneplate", apiName: "DA_GargoyleStoneplate", name: "Gargoyle Stoneplate", components: ["chain-vest", "negatron-cloak"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_gargoylestoneplate.tex" },
    { id: "giant-slayer", apiName: "DA_GiantSlayer", name: "Giant Slayer", components: ["recurve-bow", "bf-sword"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_madredsbloodrazor.tex" },
    { id: "guinsoos-rageblade", apiName: "DA_GuinsoosRageblade", name: "Guinsoo's Rageblade", components: ["recurve-bow", "needlessly-large-rod"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_guinsoosrageblade.tex" },
    { id: "hand-of-justice", apiName: "DA_HandOfJustice", name: "Hand Of Justice", components: ["tear-of-the-goddess", "sparring-gloves"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_unstableconcoction.tex" },
    { id: "hextech-gunblade", apiName: "DA_HextechGunblade", name: "Hextech Gunblade", components: ["bf-sword", "needlessly-large-rod"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_hextechgunblade.tex" },
    { id: "infinity-edge", apiName: "DA_InfinityEdge", name: "Infinity Edge", components: ["bf-sword", "sparring-gloves"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_infinityedge.tex" },
    { id: "ionic-spark", apiName: "DA_IonicSpark", name: "Ionic Spark", components: ["needlessly-large-rod", "negatron-cloak"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_ionicspark.tex" },
    { id: "jeweled-gauntlet", apiName: "DA_JeweledGauntlet", name: "Jeweled Gauntlet", components: ["sparring-gloves", "needlessly-large-rod"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_jeweledgauntlet.tex" },
    { id: "krakens-fury", apiName: "DA_KrakensFury", name: "Kraken's Fury", components: ["recurve-bow", "negatron-cloak"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_krakenslayer.tex" },
    { id: "last-whisper", apiName: "DA_LastWhisper", name: "Last Whisper", components: ["recurve-bow", "sparring-gloves"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_lastwhisper.tex" },
    { id: "morellonomicon", apiName: "DA_Morellonomicon", name: "Morellonomicon", components: ["giants-belt", "needlessly-large-rod"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_morellonomicon.tex" },
    { id: "nashors-tooth", apiName: "DA_NashorsTooth", name: "Nashor's Tooth", components: ["recurve-bow", "giants-belt"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_leviathan.tex" },
    { id: "protectors-vow", apiName: "DA_ProtectorsVow", name: "Protector's Vow", components: ["chain-vest", "tear-of-the-goddess"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_frozenheart.tex" },
    { id: "quicksilver", apiName: "DA_Quicksilver", name: "Quicksilver", components: ["negatron-cloak", "sparring-gloves"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_quicksilver.tex" },
    { id: "rabadons-deathcap", apiName: "DA_RabadonsDeathcap", name: "Rabadon's Deathcap", components: ["needlessly-large-rod", "needlessly-large-rod"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_rabadonsdeathcap.tex" },
    { id: "red-buff", apiName: "DA_RedBuff", name: "Red Buff", components: ["recurve-bow", "recurve-bow"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_rapidfirecannon.tex" },
    { id: "spear-of-shojin", apiName: "DA_SpearOfShojin", name: "Spear of Shojin", components: ["tear-of-the-goddess", "bf-sword"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_spearofshojin.tex" },
    { id: "spirit-visage", apiName: "DA_SpiritVisage", name: "Spirit Visage", components: ["giants-belt", "tear-of-the-goddess"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_spiritvisagerr.tex" },
    { id: "steadfast-heart", apiName: "DA_SteadfastHeart", name: "Steadfast Heart", components: ["chain-vest", "sparring-gloves"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_nightharvester.tex" },
    { id: "steraks-gage", apiName: "DA_SteraksGage", name: "Sterak's Gage", components: ["bf-sword", "giants-belt"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_steraksgage.tex" },
    { id: "strikers-flail", apiName: "DA_StrikersFlail", name: "Striker's Flail", components: ["giants-belt", "sparring-gloves"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_powergauntlet.tex" },
    { id: "sunfire-cape", apiName: "DA_SunfireCape", name: "Sunfire Cape", components: ["chain-vest", "giants-belt"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_redbuff.tex" },
    { id: "tacticians-cape", apiName: "DA_TacticiansCape", name: "Tactician's Cape", components: ["spatula", "frying-pan"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_tacticiansring.tex" },
    { id: "tacticians-crown", apiName: "DA_TacticiansCrown", name: "Tacticians Crown", components: ["spatula", "spatula"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_forceofnature.tex" },
    { id: "tacticians-shield", apiName: "DA_TacticiansShield", name: "Tacticians Shield", components: ["frying-pan", "frying-pan"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_tacticiansscepter.tex" },
    { id: "thiefs-gloves", apiName: "DA_ThiefsGloves", name: "Thief's Gloves", components: ["sparring-gloves", "sparring-gloves"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_thiefsgloves.tex" },
    { id: "titans-resolve", apiName: "DA_TitansResolve", name: "Titan's Resolve", components: ["recurve-bow", "chain-vest"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_titansresolve.tex" },
    { id: "void-staff", apiName: "DA_VoidStaff", name: "Void Staff", components: ["recurve-bow", "tear-of-the-goddess"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_voidstaff.tex" },
    { id: "warmogs-armor", apiName: "DA_WarmogsArmor", name: "Warmogs Armor", components: ["giants-belt", "giants-belt"], type: "normal", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_warmogsarmor.tex" },
    { id: "radiant-adaptive-helm", apiName: "DA_AdaptiveHelm_Radiant", name: "Radiant Adaptive Helm", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_adaptivehelmradiant.tex" },
    { id: "radiant-archangels-staff", apiName: "DA_ArchangelsStaffRadiant", name: "Radiant Archangel's Staff", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_archangelsstaffradiant.tex" },
    { id: "radiant-bloodthirster", apiName: "DA_BloodthirsterRadiant", name: "Radiant Bloodthirster", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_bloodthirsterradiant.tex" },
    { id: "radiant-blue-buff", apiName: "DA_BlueBuffRadiant", name: "Radiant Blue Buff", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_bluebuffradiant.tex" },
    { id: "radiant-bramble-vest", apiName: "DA_BrambleVestRadiant", name: "Radiant Bramble Vest", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_bramblevestradiant.tex" },
    { id: "radiant-crownguard", apiName: "DA_CrownguardRadiant", name: "Radiant Crownguard", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_crownguardradiant.tex" },
    { id: "radiant-deathblade", apiName: "DA_DeathbladeRadiant", name: "Radiant Deathblade", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_deathbladeradiant.tex" },
    { id: "radiant-dragons-claw", apiName: "DA_DragonsClawRadiant", name: "Radiant Dragon's Claw", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_dragonsclawradiant.tex" },
    { id: "radiant-edge-of-night", apiName: "DA_EdgeOfNightRadiant", name: "Radiant Edge of Night", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_guardianangelradiant.tex" },
    { id: "radiant-evenshroud", apiName: "DA_EvenshroudRadiant", name: "Radiant Evenshroud", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_spectralgauntletradiant.tex" },
    { id: "radiant-gargoyle-stoneplate", apiName: "DA_GargoyleStoneplate_Radiant", name: "Radiant Gargoyle Stoneplate", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_gargoylestoneplateradiant.tex" },
    { id: "radiant-giant-slayer", apiName: "DA_GiantSlayer_Radiant", name: "Radiant Giant Slayer", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_giantslayerradiant.tex" },
    { id: "radiant-guinsoos-rageblade", apiName: "DA_GuinsoosRagebladeRadiant", name: "Radiant Guinsoo's Rageblade", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_guinsoosragebladeradiant.tex" },
    { id: "radiant-hand-of-justice", apiName: "DA_HandOfJusticeRadiant", name: "Radiant Hand of Justice", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_handofjusticeradiant.tex" },
    { id: "radiant-hextech-gunblade", apiName: "DA_HextechGunbladeRadiant", name: "Radiant Hextech Gunblade", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_hextechgunbladeradiant.tex" },
    { id: "radiant-infinity-edge", apiName: "DA_InfinityEdgeRadiant", name: "Radiant Infinity Edge", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_infinityedgeradiant.tex" },
    { id: "radiant-ionic-spark", apiName: "DA_IonicSparkRadiant", name: "Radiant Ionic Spark", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_ionicsparkradiant.tex" },
    { id: "radiant-jeweled-gauntlet", apiName: "DA_JeweledGauntletRadiant", name: "Radiant Jeweled Gauntlet", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_jeweledgauntletradiant.tex" },
    { id: "radiant-krakens-fury", apiName: "DA_KrakensFury_Radiant", name: "Radiant Kraken's Fury", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_krakenslayerradiant.tex" },
    { id: "radiant-last-whisper", apiName: "DA_LastWhisperRadiant", name: "Radiant Last Whisper", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_lastwhisperradiant.tex" },
    { id: "radiant-morellonomicon", apiName: "DA_MorellonomiconRadiant", name: "Radiant Morellonomicon", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_morellonomiconradiant.tex" },
    { id: "radiant-nashors-tooth", apiName: "DA_NashorsToothRadiant", name: "Radiant Nashor's Tooth", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_leviathanradiant.tex" },
    { id: "radiant-protectors-vow", apiName: "DA_ProtectorsVowRadiant", name: "Radiant Protector's Vow", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_frozenheartradiant.tex" },
    { id: "radiant-quicksilver", apiName: "DA_QuicksilverRadiant", name: "Radiant Quicksilver", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_quicksilverradiant.tex" },
    { id: "radiant-rabadons-deathcap", apiName: "DA_RabadonsDeathcap_Radiant", name: "Radiant Rabadon's Deathcap", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_rabadonsdeathcapradiant.tex" },
    { id: "radiant-red-buff", apiName: "DA_RedBuffRadiant", name: "Radiant Red Buff", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_rapidfirecannonradiant.tex" },
    { id: "radiant-spear-of-shojin", apiName: "DA_SpearOfShojinRadiant", name: "Radiant Spear of Shojin", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_spearofshojinradiant.tex" },
    { id: "radiant-spirit-visage", apiName: "DA_SpiritVisage_Radiant", name: "Radiant Spirit Visage", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft_item_spiritvisagerr.tex" },
    { id: "radiant-steadfast-heart", apiName: "DA_SteadfastHeartRadiant", name: "Radiant Steadfast Heart", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_nightharvesterradiant.tex" },
    { id: "radiant-steraks-gage", apiName: "DA_SteraksGageRadiant", name: "Radiant Sterak's Gage", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_steraksgageradiant.tex" },
    { id: "radiant-strikers-flail", apiName: "DA_StrikersFlailRadiant", name: "Radiant Striker's Flail", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_trapclawradiant.tex" },
    { id: "radiant-sunfire-cape", apiName: "DA_SunfireCape_Radiant", name: "Radiant Sunfire Cape", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_sunfirecaperadiant.tex" },
    { id: "radiant-thiefs-gloves", apiName: "DA_ThiefsGlovesRadiant", name: "Radiant Thief's Gloves", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_thiefsglovesradiant.tex" },
    { id: "radiant-titans-resolve", apiName: "DA_TitansResolve_Radiant", name: "Radiant Titan's Resolve", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_titansresolveradiant.tex" },
    { id: "radiant-void-staff", apiName: "DA_VoidStaffRadiant", name: "Radiant Void Staff", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_voidstaffradiant.tex" },
    { id: "radiant-warmogs-armor", apiName: "DA_WarmogsArmorRadiant", name: "Radiant Warmog's Armor", components: [], type: "radiant", stats: "", icon: "assets/maps/tft/icons/items/hexcore/tft5_item_warmogsarmorradiant.tex" },
];
exports.itemMap = new Map(exports.items.map(i => [i.id, i]));
exports.itemByApiName = new Map(exports.items.filter(i => i.apiName).map(i => [i.apiName, i]));


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
exports.adminSaveEdition = exports.adminDeleteComp = exports.adminUpdateComp = exports.adminCreateComp = exports.adminListAll = exports.invalidateCache = exports.fallbackEdition = exports.getEdition = exports.getCompsSync = exports.getComps = exports.compSlug = exports.slugify = exports.COMPS_CACHE_KEY = void 0;
const comps_1 = __webpack_require__(/*! ../data/set18/comps */ "./src/data/set18/comps.ts");
const consts_1 = __webpack_require__(/*! ../consts */ "./src/consts.ts");
const AuthService_1 = __webpack_require__(/*! ./AuthService */ "./src/services/AuthService.ts");
exports.COMPS_CACHE_KEY = 'pivottft_comps_cache_v2';
const LEGACY_CACHE_KEYS = ['pivottft_comps_cache_v1'];
const CACHE_TTL_MS = 5 * 60 * 1000;
function readCache() {
    try {
        const raw = localStorage.getItem(exports.COMPS_CACHE_KEY);
        return raw ? JSON.parse(raw) : null;
    }
    catch (_a) {
        return null;
    }
}
function writeCache(comps, edition) {
    try {
        for (const k of LEGACY_CACHE_KEYS)
            localStorage.removeItem(k);
        localStorage.setItem(exports.COMPS_CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), comps, edition }));
    }
    catch (_a) { }
}
function slugify(s) {
    return s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
exports.slugify = slugify;
function compSlug(comp) {
    return comp.slug || slugify(comp.name) || slugify(comp.id);
}
exports.compSlug = compSlug;
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
            if (Array.isArray(body.comps)) {
                writeCache(body.comps, body.edition || null);
                return body.comps;
            }
        }
    }
    catch (_a) { }
    if (cached)
        return cached.comps;
    return comps_1.seedComps;
}
exports.getComps = getComps;
function getCompsSync() {
    const cached = readCache();
    if (cached && cached.comps.length > 0)
        return cached.comps;
    return comps_1.seedComps;
}
exports.getCompsSync = getCompsSync;
function getEdition() {
    const cached = readCache();
    if (cached === null || cached === void 0 ? void 0 : cached.edition)
        return cached.edition;
    return null;
}
exports.getEdition = getEdition;
function fallbackEdition() {
    return { setNumber: consts_1.kCurrentTftSetNumber, patch: consts_1.kCurrentTftPatch, updatedAt: 0 };
}
exports.fallbackEdition = fallbackEdition;
function invalidateCache() {
    try {
        localStorage.removeItem(exports.COMPS_CACHE_KEY);
    }
    catch (_a) { }
}
exports.invalidateCache = invalidateCache;
async function adminListAll() {
    return AuthService_1.adminFetch('/admin/comps');
}
exports.adminListAll = adminListAll;
async function adminCreateComp(comp) {
    await AuthService_1.adminFetch('/admin/comps', {
        method: 'POST',
        body: JSON.stringify({
            id: comp.id,
            name: comp.name,
            tier: comp.tier,
            playstyle: comp.playstyle,
            data: comp,
            isPublished: comp.isPublished !== false,
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
            isPublished: comp.isPublished !== false,
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
async function adminSaveEdition(edition) {
    const res = await AuthService_1.adminFetch('/admin/edition', {
        method: 'PUT',
        body: JSON.stringify(edition),
    });
    invalidateCache();
    return res.edition;
}
exports.adminSaveEdition = adminSaveEdition;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
const AppWindow_1 = __webpack_require__(/*! ../AppWindow */ "./src/AppWindow.ts");
const AuthService_1 = __webpack_require__(/*! ../services/AuthService */ "./src/services/AuthService.ts");
const CompsService_1 = __webpack_require__(/*! ../services/CompsService */ "./src/services/CompsService.ts");
const champions_1 = __webpack_require__(/*! ../data/set18/champions */ "./src/data/set18/champions.ts");
const BoardEditor_1 = __webpack_require__(/*! ./BoardEditor */ "./src/admin/BoardEditor.ts");
let comps = [];
let edition = null;
let selectedId = null;
let isNewMode = false;
let board = null;
function $(id) {
    return document.getElementById(id);
}
function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function closeWindow() {
    if (!AppWindow_1.isOverwolf) {
        location.href = '/';
        return;
    }
    overwolf.windows.getCurrentWindow(res => {
        var _a;
        if ((res === null || res === void 0 ? void 0 : res.success) && ((_a = res.window) === null || _a === void 0 ? void 0 : _a.id))
            overwolf.windows.close(res.window.id);
    });
}
function showSignin(show) {
    const panel = $('admin-signin');
    const main = $('admin-main');
    const forbidden = $('admin-forbidden');
    const logoutBtn = $('admin-logout');
    if (panel)
        panel.style.display = show ? 'flex' : 'none';
    if (main)
        main.style.display = show ? 'none' : '';
    if (forbidden && show)
        forbidden.style.display = 'none';
    if (logoutBtn)
        logoutBtn.style.display = show ? 'none' : '';
}
async function handleSignin(e) {
    var _a, _b;
    e.preventDefault();
    const email = (((_a = $('signin-email')) === null || _a === void 0 ? void 0 : _a.value) || '').trim();
    const password = ((_b = $('signin-password')) === null || _b === void 0 ? void 0 : _b.value) || '';
    const err = $('signin-error');
    const btn = $('signin-submit');
    if (err)
        err.textContent = '';
    if (btn)
        btn.disabled = true;
    try {
        await AuthService_1.login(email, password);
        await boot();
    }
    catch (ex) {
        if (err)
            err.textContent = (ex === null || ex === void 0 ? void 0 : ex.message) || 'Sign-in failed';
    }
    finally {
        if (btn)
            btn.disabled = false;
    }
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
      <span class="admin-comp-name">${escapeHtml(c.name)}${c.isPublished === false ? ' <em class="admin-draft">draft</em>' : ''}</span>
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
    ($('field-slug')).value = (comp === null || comp === void 0 ? void 0 : comp.slug) || '';
    ($('field-published')).checked = (comp === null || comp === void 0 ? void 0 : comp.isPublished) !== false;
    board === null || board === void 0 ? void 0 : board.set(comp === null || comp === void 0 ? void 0 : comp.placements);
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
    const slugField = ($('field-slug')).value.trim().toLowerCase();
    const slug = slugField || CompsService_1.slugify(name);
    if (!/^[a-z0-9-]{1,80}$/.test(slug)) {
        setStatus('Slug must be lowercase letters, digits and dashes.', 'err');
        return null;
    }
    const placements = board ? board.get() : [];
    const unknown = placements.filter(p => !champions_1.championMap.has(p.championId));
    if (unknown.length) {
        setStatus(`Board has unknown units: ${unknown.map(p => p.championId).join(', ')}`, 'err');
        return null;
    }
    return {
        id,
        name,
        slug,
        isPublished: ($('field-published')).checked,
        placements,
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
        const res = await CompsService_1.adminListAll();
        comps = res.comps;
        edition = res.edition;
    }
    catch (e) {
        console.error('[Admin] Failed to fetch comps', e);
        comps = [];
    }
    renderEdition();
}
function renderEdition() {
    const patch = $('edition-patch');
    const set = $('edition-set');
    if (patch && edition && document.activeElement !== patch)
        patch.value = edition.patch;
    if (set)
        set.value = edition ? `Set ${edition.setNumber}${edition.setName ? ` — ${edition.setName}` : ''}` : '';
}
function setEditionStatus(msg, kind = '') {
    const el = $('edition-status');
    if (!el)
        return;
    el.textContent = msg;
    el.className = `admin-editor-status ${kind}`;
}
async function handleEditionSave() {
    var _a;
    const patch = (((_a = $('edition-patch')) === null || _a === void 0 ? void 0 : _a.value) || '').trim();
    if (!/^\d{1,2}\.\d{1,2}[a-z]?$/i.test(patch)) {
        setEditionStatus('Patch looks like 18.2 or 18.2b.', 'err');
        return;
    }
    setEditionStatus('Saving…');
    try {
        edition = await CompsService_1.adminSaveEdition({ patch });
        renderEdition();
        setEditionStatus('Saved ✓', 'ok');
    }
    catch (err) {
        setEditionStatus(`Failed: ${err.message || err}`, 'err');
    }
}
function syncUnitsFromBoard() {
    if (!board)
        return;
    const ta = $('field-units');
    if (!ta)
        return;
    let units = [];
    try {
        units = JSON.parse(ta.value || '[]');
        if (!Array.isArray(units))
            units = [];
    }
    catch (_a) {
        units = [];
    }
    const onBoard = board.championIds();
    const kept = units.filter(u => onBoard.includes(u.championId));
    for (const id of onBoard) {
        if (!kept.some(u => u.championId === id))
            kept.push({ championId: id, isCarry: false, starLevel: 2, items: [] });
    }
    if (!kept.some(u => u.isCarry) && kept.length)
        kept[0].isCarry = true;
    ta.value = JSON.stringify(kept, null, 2);
    setStatus(`Units synced from the board (${kept.length}).`, 'ok');
}
let shellWired = false;
let editorWired = false;
function wireShell() {
    var _a, _b, _c, _d;
    if (shellWired)
        return;
    shellWired = true;
    (_a = $('admin-signin-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => { handleSignin(e); });
    (_b = $('admin-close')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', closeWindow);
    (_c = $('admin-forbidden-close')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', closeWindow);
    (_d = $('admin-logout')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
        AuthService_1.logout();
        if (AppWindow_1.isOverwolf)
            closeWindow();
        else
            boot();
    });
    if (!AppWindow_1.isOverwolf) {
        const closeBtn = $('admin-close');
        if (closeBtn) {
            closeBtn.textContent = '↩';
            closeBtn.title = 'Back to the site';
        }
    }
}
async function boot() {
    var _a, _b, _c, _d, _e, _f, _g;
    renderHeader();
    wireShell();
    if (!AuthService_1.isAuthenticated()) {
        showSignin(true);
        return;
    }
    showSignin(false);
    if (!AuthService_1.hasAtLeast('moderator')) {
        $('admin-main').style.display = 'none';
        $('admin-forbidden').style.display = 'flex';
        return;
    }
    $('admin-forbidden').style.display = 'none';
    $('admin-main').style.display = '';
    await refreshComps();
    renderList();
    clearEditor();
    if (editorWired)
        return;
    editorWired = true;
    (_a = $('admin-comp-filter')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', (e) => {
        renderList(e.target.value);
    });
    (_b = $('admin-comps-list')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
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
    (_c = $('admin-new-comp')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        selectedId = null;
        showEditor(null);
    });
    (_d = $('admin-editor-form')) === null || _d === void 0 ? void 0 : _d.addEventListener('submit', handleSave);
    (_e = $('admin-delete')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', handleDelete);
    const rosterEl = $('admin-roster');
    const boardEl = $('admin-board');
    if (rosterEl && boardEl)
        board = new BoardEditor_1.BoardEditor(rosterEl, boardEl, () => { });
    (_f = $('board-sync-units')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', syncUnitsFromBoard);
    (_g = $('edition-save')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', handleEditionSave);
}
window.addEventListener('DOMContentLoaded', boot);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsNEVBQTRFLEVBQUU7SUFDalAsRUFBRSxFQUFFLEVBQUUseUJBQXlCLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsd0VBQXdFLEVBQUU7SUFDbE8sRUFBRSxFQUFFLEVBQUUsMEJBQTBCLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsMEVBQTBFLEVBQUU7SUFDeE8sRUFBRSxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsdUVBQXVFLEVBQUU7SUFDNU4sRUFBRSxFQUFFLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUscUVBQXFFLEVBQUU7SUFDcE4sRUFBRSxFQUFFLEVBQUUsMEJBQTBCLEVBQUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsMEVBQTBFLEVBQUU7SUFDeE8sRUFBRSxFQUFFLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsc0VBQXNFLEVBQUU7SUFDMU4sRUFBRSxFQUFFLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsc0VBQXNFLEVBQUU7SUFDeE4sRUFBRSxFQUFFLEVBQUUsd0JBQXdCLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUseUVBQXlFLEVBQUU7SUFDbE8sRUFBRSxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0VBQW9FLEVBQUU7SUFDMU4sRUFBRSxFQUFFLEVBQUUsd0JBQXdCLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsc0VBQXNFLEVBQUU7SUFDL04sRUFBRSxFQUFFLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsc0VBQXNFLEVBQUU7SUFDdE4sRUFBRSxFQUFFLEVBQUUsMkJBQTJCLEVBQUUs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Q2xFLENBQUM7QUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9waXZvdHRmdC8uL25vZGVfbW9kdWxlcy9Ab3ZlcndvbGYvb3ZlcndvbGYtYXBpLXRzL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9ub2RlX21vZHVsZXMvQG92ZXJ3b2xmL292ZXJ3b2xmLWFwaS10cy9kaXN0L293LWdhbWUtbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9ub2RlX21vZHVsZXMvQG92ZXJ3b2xmL292ZXJ3b2xmLWFwaS10cy9kaXN0L293LWdhbWVzLWV2ZW50cy5qcyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL25vZGVfbW9kdWxlcy9Ab3ZlcndvbGYvb3ZlcndvbGYtYXBpLXRzL2Rpc3Qvb3ctZ2FtZXMuanMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9ub2RlX21vZHVsZXMvQG92ZXJ3b2xmL292ZXJ3b2xmLWFwaS10cy9kaXN0L293LWhvdGtleXMuanMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9ub2RlX21vZHVsZXMvQG92ZXJ3b2xmL292ZXJ3b2xmLWFwaS10cy9kaXN0L293LWxpc3RlbmVyLmpzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vbm9kZV9tb2R1bGVzL0BvdmVyd29sZi9vdmVyd29sZi1hcGktdHMvZGlzdC9vdy13aW5kb3cuanMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9ub2RlX21vZHVsZXMvQG92ZXJ3b2xmL292ZXJ3b2xmLWFwaS10cy9kaXN0L3RpbWVyLmpzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL0FwcFdpbmRvdy50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9hZG1pbi9Cb2FyZEVkaXRvci50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9jb25zdHMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvZGF0YS9hc3NldFVybHMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvZGF0YS9zZXQxOC9jaGFtcGlvbnMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvZGF0YS9zZXQxOC9jb21wcy50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9kYXRhL3NldDE4L2l0ZW1zLnRzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL3NlcnZpY2VzL0F1dGhTZXJ2aWNlLnRzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL3NlcnZpY2VzL0NvbXBzU2VydmljZS50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9hZG1pbi9hZG1pbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pKTtcclxudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL293LWdhbWUtbGlzdGVuZXJcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vb3ctZ2FtZXMtZXZlbnRzXCIpLCBleHBvcnRzKTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL293LWdhbWVzXCIpLCBleHBvcnRzKTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL293LWhvdGtleXNcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vb3ctbGlzdGVuZXJcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vb3ctd2luZG93XCIpLCBleHBvcnRzKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5PV0dhbWVMaXN0ZW5lciA9IHZvaWQgMDtcclxuY29uc3Qgb3dfbGlzdGVuZXJfMSA9IHJlcXVpcmUoXCIuL293LWxpc3RlbmVyXCIpO1xyXG5jbGFzcyBPV0dhbWVMaXN0ZW5lciBleHRlbmRzIG93X2xpc3RlbmVyXzEuT1dMaXN0ZW5lciB7XHJcbiAgICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSkge1xyXG4gICAgICAgIHN1cGVyKGRlbGVnYXRlKTtcclxuICAgICAgICB0aGlzLm9uR2FtZUluZm9VcGRhdGVkID0gKHVwZGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXVwZGF0ZSB8fCAhdXBkYXRlLmdhbWVJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF1cGRhdGUucnVubmluZ0NoYW5nZWQgJiYgIXVwZGF0ZS5nYW1lQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1cGRhdGUuZ2FtZUluZm8uaXNSdW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGVsZWdhdGUub25HYW1lU3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlbGVnYXRlLm9uR2FtZVN0YXJ0ZWQodXBkYXRlLmdhbWVJbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kZWxlZ2F0ZS5vbkdhbWVFbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlbGVnYXRlLm9uR2FtZUVuZGVkKHVwZGF0ZS5nYW1lSW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub25SdW5uaW5nR2FtZUluZm8gPSAoaW5mbykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWluZm8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW5mby5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kZWxlZ2F0ZS5vbkdhbWVTdGFydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVsZWdhdGUub25HYW1lU3RhcnRlZChpbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBzdXBlci5zdGFydCgpO1xyXG4gICAgICAgIG92ZXJ3b2xmLmdhbWVzLm9uR2FtZUluZm9VcGRhdGVkLmFkZExpc3RlbmVyKHRoaXMub25HYW1lSW5mb1VwZGF0ZWQpO1xyXG4gICAgICAgIG92ZXJ3b2xmLmdhbWVzLmdldFJ1bm5pbmdHYW1lSW5mbyh0aGlzLm9uUnVubmluZ0dhbWVJbmZvKTtcclxuICAgIH1cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgICAgb3ZlcndvbGYuZ2FtZXMub25HYW1lSW5mb1VwZGF0ZWQucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkdhbWVJbmZvVXBkYXRlZCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5PV0dhbWVMaXN0ZW5lciA9IE9XR2FtZUxpc3RlbmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk9XR2FtZXNFdmVudHMgPSB2b2lkIDA7XHJcbmNvbnN0IHRpbWVyXzEgPSByZXF1aXJlKFwiLi90aW1lclwiKTtcclxuY2xhc3MgT1dHYW1lc0V2ZW50cyB7XHJcbiAgICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSwgcmVxdWlyZWRGZWF0dXJlcywgZmVhdHVyZVJldHJpZXMgPSAxMCkge1xyXG4gICAgICAgIHRoaXMub25JbmZvVXBkYXRlcyA9IChpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlbGVnYXRlLm9uSW5mb1VwZGF0ZXMoaW5mby5pbmZvKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub25OZXdFdmVudHMgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5vbk5ld0V2ZW50cyhlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2RlbGVnYXRlID0gZGVsZWdhdGU7XHJcbiAgICAgICAgdGhpcy5fcmVxdWlyZWRGZWF0dXJlcyA9IHJlcXVpcmVkRmVhdHVyZXM7XHJcbiAgICAgICAgdGhpcy5fZmVhdHVyZVJldHJpZXMgPSBmZWF0dXJlUmV0cmllcztcclxuICAgIH1cclxuICAgIGFzeW5jIGdldEluZm8oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIG92ZXJ3b2xmLmdhbWVzLmV2ZW50cy5nZXRJbmZvKHJlc29sdmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgc2V0UmVxdWlyZWRGZWF0dXJlcygpIHtcclxuICAgICAgICBsZXQgdHJpZXMgPSAxLCByZXN1bHQ7XHJcbiAgICAgICAgd2hpbGUgKHRyaWVzIDw9IHRoaXMuX2ZlYXR1cmVSZXRyaWVzKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgb3ZlcndvbGYuZ2FtZXMuZXZlbnRzLnNldFJlcXVpcmVkRmVhdHVyZXModGhpcy5fcmVxdWlyZWRGZWF0dXJlcywgcmVzb2x2ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2V0UmVxdWlyZWRGZWF0dXJlcygpOiBzdWNjZXNzOiAnICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LCBudWxsLCAyKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHJlc3VsdC5zdXBwb3J0ZWRGZWF0dXJlcy5sZW5ndGggPiAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhd2FpdCB0aW1lcl8xLlRpbWVyLndhaXQoMzAwMCk7XHJcbiAgICAgICAgICAgIHRyaWVzKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUud2Fybignc2V0UmVxdWlyZWRGZWF0dXJlcygpOiBmYWlsdXJlIGFmdGVyICcgKyB0cmllcyArICcgdHJpZXMnICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0LCBudWxsLCAyKSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmVnaXN0ZXJFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnRzKCk7XHJcbiAgICAgICAgb3ZlcndvbGYuZ2FtZXMuZXZlbnRzLm9uSW5mb1VwZGF0ZXMyLmFkZExpc3RlbmVyKHRoaXMub25JbmZvVXBkYXRlcyk7XHJcbiAgICAgICAgb3ZlcndvbGYuZ2FtZXMuZXZlbnRzLm9uTmV3RXZlbnRzLmFkZExpc3RlbmVyKHRoaXMub25OZXdFdmVudHMpO1xyXG4gICAgfVxyXG4gICAgdW5SZWdpc3RlckV2ZW50cygpIHtcclxuICAgICAgICBvdmVyd29sZi5nYW1lcy5ldmVudHMub25JbmZvVXBkYXRlczIucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkluZm9VcGRhdGVzKTtcclxuICAgICAgICBvdmVyd29sZi5nYW1lcy5ldmVudHMub25OZXdFdmVudHMucmVtb3ZlTGlzdGVuZXIodGhpcy5vbk5ld0V2ZW50cyk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBzdGFydCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgW293LWdhbWUtZXZlbnRzXSBTVEFSVGApO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudHMoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLnNldFJlcXVpcmVkRmVhdHVyZXMoKTtcclxuICAgICAgICBjb25zdCB7IHJlcywgc3RhdHVzIH0gPSBhd2FpdCB0aGlzLmdldEluZm8oKTtcclxuICAgICAgICBpZiAocmVzICYmIHN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25JbmZvVXBkYXRlcyh7IGluZm86IHJlcyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBbb3ctZ2FtZS1ldmVudHNdIFNUT1BgKTtcclxuICAgICAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudHMoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLk9XR2FtZXNFdmVudHMgPSBPV0dhbWVzRXZlbnRzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk9XR2FtZXMgPSB2b2lkIDA7XHJcbmNsYXNzIE9XR2FtZXMge1xyXG4gICAgc3RhdGljIGdldFJ1bm5pbmdHYW1lSW5mbygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgb3ZlcndvbGYuZ2FtZXMuZ2V0UnVubmluZ0dhbWVJbmZvKHJlc29sdmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGNsYXNzSWRGcm9tR2FtZUlkKGdhbWVJZCkge1xyXG4gICAgICAgIGxldCBjbGFzc0lkID0gTWF0aC5mbG9vcihnYW1lSWQgLyAxMCk7XHJcbiAgICAgICAgcmV0dXJuIGNsYXNzSWQ7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgYXN5bmMgZ2V0UmVjZW50bHlQbGF5ZWRHYW1lcyhsaW1pdCA9IDMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFvdmVyd29sZi5nYW1lcy5nZXRSZWNlbnRseVBsYXllZEdhbWVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvdmVyd29sZi5nYW1lcy5nZXRSZWNlbnRseVBsYXllZEdhbWVzKGxpbWl0LCByZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZ2FtZXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBhc3luYyBnZXRHYW1lREJJbmZvKGdhbWVDbGFzc0lkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIG92ZXJ3b2xmLmdhbWVzLmdldEdhbWVEQkluZm8oZ2FtZUNsYXNzSWQsIHJlc29sdmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuT1dHYW1lcyA9IE9XR2FtZXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuT1dIb3RrZXlzID0gdm9pZCAwO1xyXG5jbGFzcyBPV0hvdGtleXMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuICAgIHN0YXRpYyBnZXRIb3RrZXlUZXh0KGhvdGtleUlkLCBnYW1lSWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIG92ZXJ3b2xmLnNldHRpbmdzLmhvdGtleXMuZ2V0KHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhvdGtleTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZUlkID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGtleSA9IHJlc3VsdC5nbG9iYWxzLmZpbmQoaCA9PiBoLm5hbWUgPT09IGhvdGtleUlkKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXN1bHQuZ2FtZXMgJiYgcmVzdWx0LmdhbWVzW2dhbWVJZF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdGtleSA9IHJlc3VsdC5nYW1lc1tnYW1lSWRdLmZpbmQoaCA9PiBoLm5hbWUgPT09IGhvdGtleUlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaG90a2V5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShob3RrZXkuYmluZGluZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCdVTkFTU0lHTkVEJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIG9uSG90a2V5RG93bihob3RrZXlJZCwgYWN0aW9uKSB7XHJcbiAgICAgICAgb3ZlcndvbGYuc2V0dGluZ3MuaG90a2V5cy5vblByZXNzZWQuYWRkTGlzdGVuZXIoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5uYW1lID09PSBob3RrZXlJZClcclxuICAgICAgICAgICAgICAgIGFjdGlvbihyZXN1bHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuT1dIb3RrZXlzID0gT1dIb3RrZXlzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk9XTGlzdGVuZXIgPSB2b2lkIDA7XHJcbmNsYXNzIE9XTGlzdGVuZXIge1xyXG4gICAgY29uc3RydWN0b3IoZGVsZWdhdGUpIHtcclxuICAgICAgICB0aGlzLl9kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xyXG4gICAgfVxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5PV0xpc3RlbmVyID0gT1dMaXN0ZW5lcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5PV1dpbmRvdyA9IHZvaWQgMDtcclxuY2xhc3MgT1dXaW5kb3cge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9pZCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBhc3luYyByZXN0b3JlKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGF0Ll9pZDtcclxuICAgICAgICAgICAgb3ZlcndvbGYud2luZG93cy5yZXN0b3JlKGlkLCByZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuc3VjY2VzcylcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbcmVzdG9yZV0gLSBhbiBlcnJvciBvY2N1cnJlZCwgd2luZG93SWQ9JHtpZH0sIHJlYXNvbj0ke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBtaW5pbWl6ZSgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcclxuICAgICAgICAgICAgbGV0IGlkID0gdGhhdC5faWQ7XHJcbiAgICAgICAgICAgIG92ZXJ3b2xmLndpbmRvd3MubWluaW1pemUoaWQsICgpID0+IHsgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBtYXhpbWl6ZSgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcclxuICAgICAgICAgICAgbGV0IGlkID0gdGhhdC5faWQ7XHJcbiAgICAgICAgICAgIG92ZXJ3b2xmLndpbmRvd3MubWF4aW1pemUoaWQsICgpID0+IHsgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBoaWRlKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGF0Ll9pZDtcclxuICAgICAgICAgICAgb3ZlcndvbGYud2luZG93cy5oaWRlKGlkLCAoKSA9PiB7IH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgY2xvc2UoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoYXQuX2lkO1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmdldFdpbmRvd1N0YXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2VzcyAmJlxyXG4gICAgICAgICAgICAgICAgKHJlc3VsdC53aW5kb3dfc3RhdGUgIT09ICdjbG9zZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5pbnRlcm5hbENsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGRyYWdNb3ZlKGVsZW0pIHtcclxuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGVsZW0uY2xhc3NOYW1lICsgJyBkcmFnZ2FibGUnO1xyXG4gICAgICAgIGVsZW0ub25tb3VzZWRvd24gPSBlID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBvdmVyd29sZi53aW5kb3dzLmRyYWdNb3ZlKHRoaXMuX25hbWUpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBhc3luYyBnZXRXaW5kb3dTdGF0ZSgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcclxuICAgICAgICAgICAgbGV0IGlkID0gdGhhdC5faWQ7XHJcbiAgICAgICAgICAgIG92ZXJ3b2xmLndpbmRvd3MuZ2V0V2luZG93U3RhdGUoaWQsIHJlc29sdmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGFzeW5jIGdldEN1cnJlbnRJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBvdmVyd29sZi53aW5kb3dzLmdldEN1cnJlbnRXaW5kb3cocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LndpbmRvdyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgb2J0YWluKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNiID0gcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLnN0YXR1cyA9PT0gXCJzdWNjZXNzXCIgJiYgcmVzLndpbmRvdyAmJiByZXMud2luZG93LmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faWQgPSByZXMud2luZG93LmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYW1lID0gcmVzLndpbmRvdy5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy53aW5kb3cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX25hbWUpIHtcclxuICAgICAgICAgICAgICAgIG92ZXJ3b2xmLndpbmRvd3MuZ2V0Q3VycmVudFdpbmRvdyhjYik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvdmVyd29sZi53aW5kb3dzLm9idGFpbkRlY2xhcmVkV2luZG93KHRoaXMuX25hbWUsIGNiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgYXNzdXJlT2J0YWluZWQoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGF0Lm9idGFpbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgaW50ZXJuYWxDbG9zZSgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGF0Ll9pZDtcclxuICAgICAgICAgICAgb3ZlcndvbGYud2luZG93cy5jbG9zZShpZCwgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLnN1Y2Nlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLk9XV2luZG93ID0gT1dXaW5kb3c7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVGltZXIgPSB2b2lkIDA7XHJcbmNsYXNzIFRpbWVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGRlbGVnYXRlLCBpZCkge1xyXG4gICAgICAgIHRoaXMuX3RpbWVySWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlVGltZXJFdmVudCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXJJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlbGVnYXRlLm9uVGltZXIodGhpcy5faWQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcclxuICAgICAgICB0aGlzLl9pZCA9IGlkO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGFzeW5jIHdhaXQoaW50ZXJ2YWxJbk1TKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIGludGVydmFsSW5NUyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzdGFydChpbnRlcnZhbEluTVMpIHtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICB0aGlzLl90aW1lcklkID0gc2V0VGltZW91dCh0aGlzLmhhbmRsZVRpbWVyRXZlbnQsIGludGVydmFsSW5NUyk7XHJcbiAgICB9XHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90aW1lcklkID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXJJZCk7XHJcbiAgICAgICAgdGhpcy5fdGltZXJJZCA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5UaW1lciA9IFRpbWVyO1xyXG4iLCJpbXBvcnQgeyBPV1dpbmRvdyB9IGZyb20gXCJAb3ZlcndvbGYvb3ZlcndvbGYtYXBpLXRzXCI7XHJcblxyXG4vLyBEZXRlY3QgT3ZlcndvbGYgcnVudGltZSDigJQgdXNlZCBieSBhbGwgd2luZG93cyB0byBhZGFwdCBiZWhhdmlvdXIuXHJcbmV4cG9ydCBjb25zdCBpc092ZXJ3b2xmID1cclxuICB0eXBlb2Ygb3ZlcndvbGYgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBvdmVyd29sZi53aW5kb3dzICE9PSAndW5kZWZpbmVkJztcclxuXHJcbi8vIEEgYmFzZSBjbGFzcyBmb3IgdGhlIGFwcCdzIGZvcmVncm91bmQgd2luZG93cy5cclxuLy8gU2V0cyB0aGUgbW9kYWwgYW5kIGRyYWcgYmVoYXZpb3JzLCB3aGljaCBhcmUgc2hhcmVkIGFjY3Jvc3MgdGhlIGRlc2t0b3AgYW5kIGluLWdhbWUgd2luZG93cy5cclxuZXhwb3J0IGNsYXNzIEFwcFdpbmRvdyB7XHJcbiAgcHJvdGVjdGVkIGN1cnJXaW5kb3c6IE9XV2luZG93O1xyXG4gIHByb3RlY3RlZCBtYWluV2luZG93OiBPV1dpbmRvdztcclxuICBwcm90ZWN0ZWQgbWF4aW1pemVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHdpbmRvd05hbWUpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMubWFpbldpbmRvdyA9IG5ldyBPV1dpbmRvdygnYmFja2dyb3VuZCcpO1xyXG4gICAgICB0aGlzLmN1cnJXaW5kb3cgPSBuZXcgT1dXaW5kb3cod2luZG93TmFtZSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gQnJvd3NlciBtb2RlIOKAlCBPV1dpbmRvdyByZXF1aXJlcyB0aGUgT3ZlcndvbGYgcnVudGltZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlQnV0dG9uJyk7XHJcbiAgICBjb25zdCBtYXhpbWl6ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXhpbWl6ZUJ1dHRvbicpO1xyXG4gICAgY29uc3QgbWluaW1pemVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluaW1pemVCdXR0b24nKTtcclxuXHJcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyJyk7XHJcblxyXG4gICAgaWYgKGlzT3ZlcndvbGYpIHtcclxuICAgICAgdGhpcy5zZXREcmFnKGhlYWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5tYWluV2luZG93KSB0aGlzLm1haW5XaW5kb3cuY2xvc2UoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1pbmltaXplQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuY3VycldpbmRvdykgdGhpcy5jdXJyV2luZG93Lm1pbmltaXplKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtYXhpbWl6ZUJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5jdXJyV2luZG93KSByZXR1cm47XHJcbiAgICAgIGlmICghdGhpcy5tYXhpbWl6ZWQpIHtcclxuICAgICAgICB0aGlzLmN1cnJXaW5kb3cubWF4aW1pemUoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmN1cnJXaW5kb3cucmVzdG9yZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubWF4aW1pemVkID0gIXRoaXMubWF4aW1pemVkO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgZ2V0V2luZG93U3RhdGUoKSB7XHJcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5jdXJyV2luZG93Py5nZXRXaW5kb3dTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBzZXREcmFnKGVsZW0pIHtcclxuICAgIHRoaXMuY3VycldpbmRvdz8uZHJhZ01vdmUoZWxlbSk7XHJcbiAgfVxyXG59XHJcbiIsIi8vIEJvYXJkRWRpdG9yIOKAlCB0aGUgYWRtaW4ncyBkaWFncmFtIGVkaXRvcjogYSBTZXQgcm9zdGVyIGdyaWQgYmVzaWRlIGEgNMOXN1xuLy8gaGV4IGJvYXJkLiBDbGljayBhIHJvc3RlciB1bml0IHRoZW4gYSBjZWxsIHRvIHBsYWNlIGl0LCBjbGljayBhIHBsYWNlZCB1bml0XG4vLyB0byByZW1vdmUgaXQsIG9yIGRyYWcgZnJvbSB0aGUgcm9zdGVyIC8gYmV0d2VlbiBjZWxscy4gVGhlIHN0YXRlIGlzIHRoZVxuLy8gY29tcCdzIGBwbGFjZW1lbnRzYCBhcnJheSAocm93IDAgPSBiYWNrIGxpbmUsIHJvdyAzID0gZnJvbnQgbGluZSkuXG4vL1xuLy8gTGlmdGVkIGZyb20gdGhlIHJldGlyZWQgVGVhbSBCdWlsZGVyIHRhYiBzbyBjdXJhdG9ycyBkcmF3IHRoZSBzYW1lIGJvYXJkXG4vLyB0aGUgc3R1ZHkgcGFnZSBwcmludHMuXG5cbmltcG9ydCB7IENvbXBQbGFjZW1lbnQgfSBmcm9tICcuLi9tb2RlbHMvdHlwZXMnO1xuaW1wb3J0IHsgY2hhbXBpb25zLCBjaGFtcGlvbk1hcCB9IGZyb20gJy4uL2RhdGEvc2V0MTgvY2hhbXBpb25zJztcbmltcG9ydCB7IGdldENoYW1waW9uSWNvblVybCB9IGZyb20gJy4uL2RhdGEvYXNzZXRVcmxzJztcblxuZXhwb3J0IGNsYXNzIEJvYXJkRWRpdG9yIHtcbiAgcHJpdmF0ZSBwbGFjZW1lbnRzOiBDb21wUGxhY2VtZW50W10gPSBbXTtcbiAgcHJpdmF0ZSBzZWxlY3RlZFJvc3RlcklkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSByb3N0ZXJFbDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgYm9hcmRFbDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgb25DaGFuZ2U6IChwbGFjZW1lbnRzOiBDb21wUGxhY2VtZW50W10pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3Iocm9zdGVyRWw6IEhUTUxFbGVtZW50LCBib2FyZEVsOiBIVE1MRWxlbWVudCwgb25DaGFuZ2U6IChwbGFjZW1lbnRzOiBDb21wUGxhY2VtZW50W10pID0+IHZvaWQpIHtcbiAgICB0aGlzLnJvc3RlckVsID0gcm9zdGVyRWw7XG4gICAgdGhpcy5ib2FyZEVsID0gYm9hcmRFbDtcbiAgICB0aGlzLm9uQ2hhbmdlID0gb25DaGFuZ2U7XG4gICAgdGhpcy5yZW5kZXJSb3N0ZXIoKTtcbiAgICB0aGlzLnJlbmRlckJvYXJkKCk7XG4gICAgdGhpcy53aXJlKCk7XG4gIH1cblxuICBnZXQoKTogQ29tcFBsYWNlbWVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZW1lbnRzLm1hcChwID0+ICh7IC4uLnAgfSkpO1xuICB9XG5cbiAgc2V0KHBsYWNlbWVudHM6IENvbXBQbGFjZW1lbnRbXSB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMucGxhY2VtZW50cyA9IChwbGFjZW1lbnRzIHx8IFtdKVxuICAgICAgLmZpbHRlcihwID0+IGNoYW1waW9uTWFwLmhhcyhwLmNoYW1waW9uSWQpKVxuICAgICAgLm1hcChwID0+ICh7IHJvdzogcC5yb3csIGNvbDogcC5jb2wsIGNoYW1waW9uSWQ6IHAuY2hhbXBpb25JZCwgcm9sZTogcC5yb2xlIH0pKTtcbiAgICB0aGlzLnNlbGVjdGVkUm9zdGVySWQgPSBudWxsO1xuICAgIHRoaXMucm9zdGVyRWwucXVlcnlTZWxlY3RvckFsbCgnLmJlLXJvc3Rlci11bml0JykuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpKTtcbiAgICB0aGlzLnJlbmRlckJvYXJkKCk7XG4gIH1cblxuICAvKiogQ2hhbXBpb24gaWRzIG9uIHRoZSBib2FyZCwgZnJvbnQgcm93IGZpcnN0IOKAlCBmb3IgXCJzeW5jIHVuaXRzXCIuICovXG4gIGNoYW1waW9uSWRzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gWy4uLnRoaXMucGxhY2VtZW50c10uc29ydCgoYSwgYikgPT4gYi5yb3cgLSBhLnJvdyB8fCBhLmNvbCAtIGIuY29sKS5tYXAocCA9PiBwLmNoYW1waW9uSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJSb3N0ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5yb3N0ZXJFbC5pbm5lckhUTUwgPSBjaGFtcGlvbnNcbiAgICAgIC5zbGljZSgpXG4gICAgICAuc29ydCgoYSwgYikgPT4gYS5jb3N0IC0gYi5jb3N0IHx8IGEubmFtZS5sb2NhbGVDb21wYXJlKGIubmFtZSkpXG4gICAgICAubWFwKGMgPT4ge1xuICAgICAgICBjb25zdCBpY29uID0gZ2V0Q2hhbXBpb25JY29uVXJsKGMuaWQpO1xuICAgICAgICBjb25zdCBpbml0aWFscyA9IGMubmFtZS5zcGxpdCgnICcpLm1hcCh3ID0+IHdbMF0pLmpvaW4oJycpLnN1YnN0cmluZygwLCAyKTtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmUtcm9zdGVyLXVuaXQgY29zdC0ke2MuY29zdH1cIiBkYXRhLWNoYW1waW9uLWlkPVwiJHtjLmlkfVwiIGRyYWdnYWJsZT1cInRydWVcIiB0aXRsZT1cIiR7Yy5uYW1lfSAoJHtjLmNvc3R9Zykg4oCUICR7Yy50cmFpdHMuam9pbignLCAnKX1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21wLWhleC1mcmFtZVwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbXAtaGV4LWlubmVyXCI+XG4gICAgICAgICAgICAgICR7aWNvbiA/IGA8aW1nIHNyYz1cIiR7aWNvbn1cIiBhbHQ9XCIke2MubmFtZX1cIiBsb2FkaW5nPVwibGF6eVwiPmAgOiBgPHNwYW4gY2xhc3M9XCJjb21wLWhleC1pbml0aWFsc1wiPiR7aW5pdGlhbHN9PC9zcGFuPmB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICAgIH0pLmpvaW4oJycpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJCb2FyZCgpOiB2b2lkIHtcbiAgICBjb25zdCBvY2MgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgIGZvciAoY29uc3QgcCBvZiB0aGlzLnBsYWNlbWVudHMpIG9jYy5zZXQoYCR7cC5yb3d9LSR7cC5jb2x9YCwgcC5jaGFtcGlvbklkKTtcblxuICAgIGxldCBodG1sID0gJyc7XG4gICAgLy8gRnJvbnQgbGluZSAocm93IDMpIG9uIHRvcCwgYmFjayBsaW5lIChyb3cgMCkgYXQgdGhlIGJvdHRvbSDigJQgdGhlIHNhbWVcbiAgICAvLyBvcmllbnRhdGlvbiBhcyB0aGUgc3R1ZHkgZGlhZ3JhbS5cbiAgICBmb3IgKGxldCByb3cgPSAzOyByb3cgPj0gMDsgcm93LS0pIHtcbiAgICAgIGNvbnN0IGlzT2RkUm93ID0gcm93ICUgMiA9PT0gMTtcbiAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJoZXgtcm93ICR7aXNPZGRSb3cgPyAnaGV4LXJvdy1vZmZzZXQnIDogJyd9XCI+YDtcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDc7IGNvbCsrKSB7XG4gICAgICAgIGNvbnN0IGNoYW1waW9uSWQgPSBvY2MuZ2V0KGAke3Jvd30tJHtjb2x9YCk7XG4gICAgICAgIGlmIChjaGFtcGlvbklkKSB7XG4gICAgICAgICAgY29uc3QgY2hhbXAgPSBjaGFtcGlvbk1hcC5nZXQoY2hhbXBpb25JZCk7XG4gICAgICAgICAgY29uc3QgaWNvbiA9IGdldENoYW1waW9uSWNvblVybChjaGFtcGlvbklkKTtcbiAgICAgICAgICBjb25zdCBpbml0aWFscyA9IGNoYW1wPy5uYW1lLnNwbGl0KCcgJykubWFwKHcgPT4gd1swXSkuam9pbignJykuc3Vic3RyaW5nKDAsIDIpIHx8ICc/JztcbiAgICAgICAgICBodG1sICs9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZXgtY2VsbCBoZXgtb2NjdXBpZWQgY29zdC0ke2NoYW1wPy5jb3N0IHx8IDF9IGJlLWNlbGxcIiBkYXRhLXJvdz1cIiR7cm93fVwiIGRhdGEtY29sPVwiJHtjb2x9XCIgZHJhZ2dhYmxlPVwidHJ1ZVwiIHRpdGxlPVwiJHtjaGFtcD8ubmFtZSB8fCAnJ30g4oCUIGNsaWNrIHRvIHJlbW92ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGV4LWlubmVyXCI+XG4gICAgICAgICAgICAgICAgJHtpY29uID8gYDxpbWcgc3JjPVwiJHtpY29ufVwiIGFsdD1cIiR7Y2hhbXA/Lm5hbWUgfHwgJyd9XCIgY2xhc3M9XCJoZXgtY2hhbXAtaW1nXCIgbG9hZGluZz1cImxhenlcIj5gIDogYDxzcGFuIGNsYXNzPVwiaGV4LXVuaXQtbmFtZVwiPiR7aW5pdGlhbHN9PC9zcGFuPmB9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBodG1sICs9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZXgtY2VsbCBiZS1jZWxsIGJlLWVtcHR5XCIgZGF0YS1yb3c9XCIke3Jvd31cIiBkYXRhLWNvbD1cIiR7Y29sfVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGV4LWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBodG1sICs9ICc8L2Rpdj4nO1xuICAgIH1cbiAgICB0aGlzLmJvYXJkRWwuaW5uZXJIVE1MID0gaHRtbDtcbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlckJvYXJkKCk7XG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLmdldCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgcGxhY2Uocm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBjaGFtcGlvbklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBhdCA9IHRoaXMucGxhY2VtZW50cy5maW5kSW5kZXgocCA9PiBwLnJvdyA9PT0gcm93ICYmIHAuY29sID09PSBjb2wpO1xuICAgIGlmIChhdCAhPT0gLTEpIHRoaXMucGxhY2VtZW50cy5zcGxpY2UoYXQsIDEpO1xuICAgIC8vIE9uZSBjb3B5IG9mIGEgdW5pdCBwZXIgYm9hcmQuXG4gICAgY29uc3QgZHVwID0gdGhpcy5wbGFjZW1lbnRzLmZpbmRJbmRleChwID0+IHAuY2hhbXBpb25JZCA9PT0gY2hhbXBpb25JZCk7XG4gICAgaWYgKGR1cCAhPT0gLTEpIHRoaXMucGxhY2VtZW50cy5zcGxpY2UoZHVwLCAxKTtcbiAgICBpZiAodGhpcy5wbGFjZW1lbnRzLmxlbmd0aCA+PSAxMCkgcmV0dXJuO1xuICAgIHRoaXMucGxhY2VtZW50cy5wdXNoKHsgcm93LCBjb2wsIGNoYW1waW9uSWQgfSk7XG4gIH1cblxuICBwcml2YXRlIHdpcmUoKTogdm9pZCB7XG4gICAgY29uc3Qgcm9zdGVyID0gdGhpcy5yb3N0ZXJFbDtcbiAgICBjb25zdCBib2FyZCA9IHRoaXMuYm9hcmRFbDtcblxuICAgIC8vIENsaWNrIHRvIHNlbGVjdCAocm9zdGVyKTsgY2xpY2tpbmcgdGhlIHNlbGVjdGVkIHVuaXQgY2xlYXJzIGl0LlxuICAgIHJvc3Rlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSAoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KCcuYmUtcm9zdGVyLXVuaXQnKTtcbiAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG4gICAgICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2hhbXBpb24taWQnKTtcbiAgICAgIGlmICghaWQpIHJldHVybjtcbiAgICAgIHRoaXMuc2VsZWN0ZWRSb3N0ZXJJZCA9IHRoaXMuc2VsZWN0ZWRSb3N0ZXJJZCA9PT0gaWQgPyBudWxsIDogaWQ7XG4gICAgICByb3N0ZXIucXVlcnlTZWxlY3RvckFsbCgnLmJlLXJvc3Rlci11bml0JykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJywgZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWNoYW1waW9uLWlkJykgPT09IHRoaXMuc2VsZWN0ZWRSb3N0ZXJJZCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIENsaWNrIG9uIHRoZSBib2FyZDogcGxhY2UgdGhlIHNlbGVjdGlvbiwgb3IgcmVtb3ZlIHdoYXQgaXMgdGhlcmUuXG4gICAgYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xvc2VzdDxIVE1MRWxlbWVudD4oJy5iZS1jZWxsJyk7XG4gICAgICBpZiAoIWNlbGwpIHJldHVybjtcbiAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpIHx8ICctMScsIDEwKTtcbiAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpIHx8ICctMScsIDEwKTtcbiAgICAgIGlmIChyb3cgPCAwIHx8IGNvbCA8IDApIHJldHVybjtcbiAgICAgIGNvbnN0IGF0ID0gdGhpcy5wbGFjZW1lbnRzLmZpbmRJbmRleChwID0+IHAucm93ID09PSByb3cgJiYgcC5jb2wgPT09IGNvbCk7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZFJvc3RlcklkKSB7XG4gICAgICAgIHRoaXMucGxhY2Uocm93LCBjb2wsIHRoaXMuc2VsZWN0ZWRSb3N0ZXJJZCk7XG4gICAgICAgIHRoaXMuY2hhbmdlZCgpO1xuICAgICAgfSBlbHNlIGlmIChhdCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5wbGFjZW1lbnRzLnNwbGljZShhdCwgMSk7XG4gICAgICAgIHRoaXMuY2hhbmdlZCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gRHJhZyBmcm9tIHRoZSByb3N0ZXIuXG4gICAgcm9zdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSAoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KCcuYmUtcm9zdGVyLXVuaXQnKTtcbiAgICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG4gICAgICBlLmRhdGFUcmFuc2Zlcj8uc2V0RGF0YSgndGV4dC9wbGFpbicsIGByb3N0ZXI6JHt0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNoYW1waW9uLWlkJykgfHwgJyd9YCk7XG4gICAgICBpZiAoZS5kYXRhVHJhbnNmZXIpIGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnY29weSc7XG4gICAgfSk7XG4gICAgLy8gRHJhZyBhIHBsYWNlZCB1bml0IHRvIGFub3RoZXIgY2VsbC5cbiAgICBib2FyZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xvc2VzdDxIVE1MRWxlbWVudD4oJy5oZXgtb2NjdXBpZWQnKTtcbiAgICAgIGlmICghY2VsbCkgcmV0dXJuO1xuICAgICAgZS5kYXRhVHJhbnNmZXI/LnNldERhdGEoJ3RleHQvcGxhaW4nLCBgYm9hcmQ6JHtjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKX0tJHtjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2wnKX1gKTtcbiAgICAgIGlmIChlLmRhdGFUcmFuc2ZlcikgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJztcbiAgICB9KTtcbiAgICBib2FyZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIChlKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gKGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbG9zZXN0PEhUTUxFbGVtZW50PignLmJlLWNlbGwnKTtcbiAgICAgIGlmICghY2VsbCkgcmV0dXJuO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKTtcbiAgICB9KTtcbiAgICBib2FyZC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4ge1xuICAgICAgKGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbG9zZXN0PEhUTUxFbGVtZW50PignLmJlLWNlbGwnKT8uY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJyk7XG4gICAgfSk7XG4gICAgYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBjZWxsID0gKGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbG9zZXN0PEhUTUxFbGVtZW50PignLmJlLWNlbGwnKTtcbiAgICAgIGlmICghY2VsbCkgcmV0dXJuO1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKTtcbiAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpIHx8ICctMScsIDEwKTtcbiAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpIHx8ICctMScsIDEwKTtcbiAgICAgIGlmIChyb3cgPCAwIHx8IGNvbCA8IDApIHJldHVybjtcbiAgICAgIGNvbnN0IHJhdyA9IGUuZGF0YVRyYW5zZmVyPy5nZXREYXRhKCd0ZXh0L3BsYWluJykgfHwgJyc7XG4gICAgICBpZiAocmF3LnN0YXJ0c1dpdGgoJ3Jvc3RlcjonKSkge1xuICAgICAgICB0aGlzLnBsYWNlKHJvdywgY29sLCByYXcuc2xpY2UoJ3Jvc3RlcjonLmxlbmd0aCkpO1xuICAgICAgICB0aGlzLmNoYW5nZWQoKTtcbiAgICAgIH0gZWxzZSBpZiAocmF3LnN0YXJ0c1dpdGgoJ2JvYXJkOicpKSB7XG4gICAgICAgIGNvbnN0IFtyLCBjXSA9IHJhdy5zbGljZSgnYm9hcmQ6Jy5sZW5ndGgpLnNwbGl0KCctJykubWFwKG4gPT4gcGFyc2VJbnQobiwgMTApKTtcbiAgICAgICAgY29uc3QgZnJvbSA9IHRoaXMucGxhY2VtZW50cy5maW5kSW5kZXgocCA9PiBwLnJvdyA9PT0gciAmJiBwLmNvbCA9PT0gYyk7XG4gICAgICAgIGlmIChmcm9tID09PSAtMSkgcmV0dXJuO1xuICAgICAgICBjb25zdCB0YXJnZXRJZHggPSB0aGlzLnBsYWNlbWVudHMuZmluZEluZGV4KHAgPT4gcC5yb3cgPT09IHJvdyAmJiBwLmNvbCA9PT0gY29sKTtcbiAgICAgICAgaWYgKHRhcmdldElkeCAhPT0gLTEgJiYgdGFyZ2V0SWR4ICE9PSBmcm9tKSB0aGlzLnBsYWNlbWVudHMuc3BsaWNlKHRhcmdldElkeCwgMSk7XG4gICAgICAgIGNvbnN0IG1vdmVkID0gdGhpcy5wbGFjZW1lbnRzLmZpbmQocCA9PiBwLnJvdyA9PT0gciAmJiBwLmNvbCA9PT0gYykhO1xuICAgICAgICBtb3ZlZC5yb3cgPSByb3c7XG4gICAgICAgIG1vdmVkLmNvbCA9IGNvbDtcbiAgICAgICAgdGhpcy5jaGFuZ2VkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIFBpdm90VEZUIOKAlCBURlQgR2FtZSBFdmVudHMgRmVhdHVyZXNcbi8vIEdhbWUgSUQgNTQyNiA9IExlYWd1ZSBvZiBMZWdlbmRzIGNsaWVudCAod2hpY2ggVEZUIHJ1bnMgaW5zaWRlKVxuLy8gVEZULXNwZWNpZmljIGV2ZW50cyB1c2UgaW50ZXJuYWwgR2FtZSBJRCAyMTU3MCwgYnV0IHdlIHJlZ2lzdGVyIHdpdGggNTQyNlxuZXhwb3J0IGNvbnN0IGtHYW1lc0ZlYXR1cmVzID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZ1tdPihbXG4gIFtcbiAgICA1NDI2LFxuICAgIFtcbiAgICAgICdtYXRjaF9pbmZvJyxcbiAgICAgICdib2FyZCcsXG4gICAgICAnYmVuY2gnLFxuICAgICAgJ3N0b3JlJyxcbiAgICAgICdjYXJvdXNlbCcsXG4gICAgICAnZ2FtZV9pbmZvJyxcbiAgICAgICdhdWdtZW50cycsXG4gICAgICAnbGl2ZV9jbGllbnRfZGF0YSdcbiAgICBdXG4gIF0sXG5dKTtcblxuZXhwb3J0IGNvbnN0IGtHYW1lQ2xhc3NJZHMgPSBBcnJheS5mcm9tKGtHYW1lc0ZlYXR1cmVzLmtleXMoKSk7XG5cbmV4cG9ydCBjb25zdCBrV2luZG93TmFtZXMgPSB7XG4gIGluR2FtZTogJ2luX2dhbWUnLFxuICBkZXNrdG9wOiAnZGVza3RvcCcsXG4gIHNldHRpbmdzOiAnc2V0dGluZ3MnLFxuICBpbmdhbWVDb250cm9sbGVyOiAnaW5nYW1lX2NvbnRyb2xsZXInLFxuICBtYXRjaHVwczogJ21hdGNodXBzJyxcbiAgbG9naW46ICdsb2dpbicsXG4gIGFkbWluOiAnYWRtaW4nLFxuICBoZWFkbGluZXI6ICdoZWFkbGluZXInLFxuICByZXBsYXk6ICdyZXBsYXknLFxufTtcblxuZXhwb3J0IGNvbnN0IGtIb3RrZXlzID0ge1xuICB0b2dnbGU6ICdwaXZvdHRmdF9zaG93aGlkZSdcbn07XG5cbi8vIFRGVCBHYW1lIElEIGZvciBldmVudCByZWdpc3RyYXRpb25cbmV4cG9ydCBjb25zdCBrVEZUQ2xhc3NJZCA9IDU0MjY7XG5cbi8vIFJpb3QgQVBJIENvbmZpZ3VyYXRpb25cbmV4cG9ydCBjb25zdCBrUmlvdEFwaUNvbmZpZyA9IHtcbiAgYXBpS2V5OiAnJyxcbiAgcmVnaW9uOiAnZXVyb3BlJyBhcyBjb25zdCwgICAgICAgLy8gYW1lcmljYXMgfCBldXJvcGUgfCBhc2lhIChhY2NvdW50LXYxLCBtYXRjaC12MSlcbiAgcGxhdGZvcm06ICdldW4xJywgICAgICAgICAgICAgICAgLy8gZXV3MSwgZXVuMSwgbmExLCBrciwgLi4uIChzdW1tb25lci9sZWFndWUpXG59O1xuXG4vLyBCYWNrZW5kIGJhc2UgVVJMLiBJbiBwcm9kdWN0aW9uIHJvdXRlcyB0aHJvdWdoIENsb3VkZmxhcmUgV29ya2VyIGF0XG4vLyBhcGkucGl2b3R0ZnQuY29tIChSaW90IEFQSSBwcm94eSArIGF1dGggKyBjb21wcyBiYWNrZW5kKS4gT3ZlcnJpZGUgdG9cbi8vIGh0dHA6Ly8xMjcuMC4wLjE6ODc4NyBkdXJpbmcgbG9jYWwgYHdyYW5nbGVyIGRldmAgZGV2ZWxvcG1lbnQuXG5leHBvcnQgY29uc3Qga1Jpb3RBcGlCYXNlVXJsID0gJ2h0dHBzOi8vYXBpLnBpdm90dGZ0LmNvbSc7XG5cbi8vIEN1cnJlbnQgVEZUIHNldCArIHRoZSBwYXRjaCBsYWJlbCB0aGUgYXBwIGZhbGxzIGJhY2sgdG8gd2hpbGUgb2ZmbGluZS5cbi8vIFRoZSBsaXZlIGxhYmVsIGNvbWVzIGZyb20gdGhlIGVkaXRpb24gcmVjb3JkIHRoZSBBUEkgcmV0dXJucyB3aXRoIC9jb21wc1xuLy8gKGN1cmF0ZWQgaW4gdGhlIGFkbWluIGVkaXRvcik7IHRoZXNlIG9ubHkgZmlsbCB0aGUgcnVubmluZyBoZWFkIHVudGlsIGl0XG4vLyBhcnJpdmVzLiBCdW1wIHRoZSBzZXQgbnVtYmVyIHdoZW4gcmVnZW5lcmF0aW5nIHNyYy9kYXRhL3NldDxOPiB3aXRoXG4vLyBgbm9kZSBzY3JpcHRzL2dlbi1zZXQtZGF0YS5tanMgLS1zZXQgPE4+IC0tZmV0Y2hgLlxuZXhwb3J0IGNvbnN0IGtDdXJyZW50VGZ0UGF0Y2ggPSAnMTguMmInO1xuZXhwb3J0IGNvbnN0IGtDdXJyZW50VGZ0U2V0TnVtYmVyID0gMTg7XG5cblxuLy8gUGxhdGZvcm0g4oaSIHJlZ2lvbmFsIHJvdXRpbmcgbWFwIChmb3IgYWNjb3VudC9tYXRjaCBlbmRwb2ludHMpXG5leHBvcnQgY29uc3Qga1BsYXRmb3JtVG9SZWdpb246IFJlY29yZDxzdHJpbmcsICdhbWVyaWNhcycgfCAnZXVyb3BlJyB8ICdhc2lhJz4gPSB7XG4gICdldXcxJzogJ2V1cm9wZScsICdldW4xJzogJ2V1cm9wZScsICd0cjEnOiAnZXVyb3BlJywgJ3J1JzogJ2V1cm9wZScsXG4gICduYTEnOiAnYW1lcmljYXMnLCAnYnIxJzogJ2FtZXJpY2FzJywgJ2xhMSc6ICdhbWVyaWNhcycsICdsYTInOiAnYW1lcmljYXMnLFxuICAna3InOiAnYXNpYScsICdqcDEnOiAnYXNpYScsICdvYzEnOiAnYXNpYScsICdwaDInOiAnYXNpYScsXG4gICdzZzInOiAnYXNpYScsICd0aDInOiAnYXNpYScsICd0dzInOiAnYXNpYScsICd2bjInOiAnYXNpYScsXG59O1xuIiwiLy8gUGl2b3RURlQg4oCUIENvbW11bml0eURyYWdvbiBhc3NldCBVUkxzOiBjaGFtcGlvbiB0aWxlcywgaXRlbSwgYXVnbWVudCBhbmRcbi8vIHRyYWl0IGljb25zLiBFdmVyeSBwYXRoIHRoZSBnYW1lIGRhdGEgY2FycmllcyBpcyBtaXJyb3JlZCBsb3dlcmNhc2VkIHVuZGVyXG4vLyAvZ2FtZS88YXNzZXQgcGF0aD4gb24gQ29tbXVuaXR5RHJhZ29uLCBzbyB3ZSBub3JtYWxpc2UgYmVmb3JlIGJ1aWxkaW5nIFVSTHMuXG5cbmltcG9ydCB7IGNoYW1waW9uTWFwIH0gZnJvbSAnLi9zZXQxOC9jaGFtcGlvbnMnO1xuXG5jb25zdCBHQU1FX0JBU0UgPSAnaHR0cHM6Ly9yYXcuY29tbXVuaXR5ZHJhZ29uLm9yZy9sYXRlc3QvZ2FtZSc7XG5cbi8vIENvbW11bml0eURyYWdvbiBsb3dlcmNhc2VzIGV2ZXJ5IHBhdGggYW5kLCBzaW5jZSBtaWQtMjAyNiwgZXhwb3J0cyBhc3NldHNcbi8vIFdJVEhPVVQgdGhlIFwiLnRmdF9zZXROTlwiIC8gXCIudGZ0X3RmdE5OX05cIiBpbmZpeCB0aGUgZ2FtZSBkYXRhIGNhcnJpZXNcbi8vIChlLmcuIFwidGZ0MTdfYWF0cm94X3NwbGFzaF90aWxlXzMwLnRmdF9zZXQxNy5wbmdcIiBpcyBzZXJ2ZWQgYXNcbi8vIFwidGZ0MTdfYWF0cm94X3NwbGFzaF90aWxlXzMwLnBuZ1wiKS4gTm9ybWFsaXNlIG9uY2UgaGVyZSBzbyBldmVyeSBVUkxcbi8vIGJ1aWxkZXIgYmVsb3cgYWdyZWVzLlxuZnVuY3Rpb24gY2RyYWdvblBhdGgoYXNzZXRQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYXNzZXRQYXRoXG4gICAgLnRvTG93ZXJDYXNlKClcbiAgICAucmVwbGFjZSgvXFwudGV4JC8sICcucG5nJylcbiAgICAucmVwbGFjZSgvXFwudGZ0XyhzZXRcXGQrfHRmdFxcZCtfXFxkKykoPz1cXC5wbmckKS8sICcnKTtcbn1cblxuLy8gPT09PT0gQ2hhbXBpb24gU3BsYXNoIFRpbGVzID09PT09XG4vLyBVc2VzIHRoZSBwZXItY2hhbXBpb24gYHRpbGVJY29uYCBwYXRoIHN0b3JlZCBpbiBjaGFtcGlvbnMudHMuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbXBpb25JY29uVXJsKGNoYW1waW9uSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGNoYW1wID0gY2hhbXBpb25NYXAuZ2V0KGNoYW1waW9uSWQpO1xuICBpZiAoIWNoYW1wIHx8ICFjaGFtcC50aWxlSWNvbikgcmV0dXJuICcnO1xuICByZXR1cm4gYCR7R0FNRV9CQVNFfS8ke2NkcmFnb25QYXRoKGNoYW1wLnRpbGVJY29uKX1gO1xufVxuXG5cbi8vID09PT09IFRGVCBJdGVtIEljb25zID09PT09XG4vLyBDb21tdW5pdHlEcmFnb24gc3RvcmVzIFRGVCBpdGVtIGljb25zIHVuZGVyXG4vLyAgIC9hc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS9cbi8vIGFuZCBtaXJyb3JzIGFsbCBwYXRocyBsb3dlcmNhc2VkOyBpdGVtcy50cyBjYXJyaWVzIGVhY2ggaWNvbidzIGFzc2V0IHBhdGguXG5pbXBvcnQgeyBpdGVtTWFwIH0gZnJvbSAnLi9zZXQxOC9pdGVtcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtSWNvblVybChpdGVtSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGl0ZW0gPSBpdGVtTWFwLmdldChpdGVtSWQpO1xuICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaWNvbikgcmV0dXJuICcnO1xuICByZXR1cm4gYCR7R0FNRV9CQVNFfS8ke2NkcmFnb25QYXRoKGl0ZW0uaWNvbil9YDtcbn1cblxuLy8gPT09PT0gQXVnbWVudCBJY29ucyA9PT09PVxuLy8gQ29tbXVuaXR5RHJhZ29uIHN0b3JlcyBhdWdtZW50IGljb25zIGFzIEFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy8uLi4gLnRleFxuLy8gcGF0aHMuIENEcmFnb24gbWlycm9ycyBhbGwgcGF0aHMgbG93ZXJjYXNlZCBhbmQgc2VydmVzIC50ZXggYXMgLnBuZy5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdWdtZW50SWNvblVybChpY29uUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKCFpY29uUGF0aCkgcmV0dXJuICcnO1xuICByZXR1cm4gYCR7R0FNRV9CQVNFfS8ke2NkcmFnb25QYXRoKGljb25QYXRoKX1gO1xufVxuXG4vLyA9PT09PSBUcmFpdCBJY29ucyA9PT09PVxuLy8gVHJhaXQgaWNvbnMgbGl2ZSBhdCBBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXyouVEZUX1NldCoudGV4LiBTYW1lXG4vLyBDRHJhZ29uIHRyYW5zZm9ybSBhcyBhdWdtZW50cyDigJQgbG93ZXJjYXNlICsgLnRleCDihpIgLnBuZy5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFpdEljb25VcmwoaWNvblBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICghaWNvblBhdGgpIHJldHVybiAnJztcbiAgY29uc3QgcGF0aCA9IGNkcmFnb25QYXRoKGljb25QYXRoKTtcbiAgcmV0dXJuIGAke0dBTUVfQkFTRX0vJHtwYXRofWA7XG59XG4iLCIvLyBQaXZvdFRGVCDigJQgU2V0IDE4IGNoYW1waW9ucy4gQXV0by1nZW5lcmF0ZWQgYnkgc2NyaXB0cy9nZW4tc2V0LWRhdGEubWpzIOKAlCBkbyBub3QgZWRpdC5cbi8vIFNvdXJjZTogaHR0cHM6Ly9yYXcuY29tbXVuaXR5ZHJhZ29uLm9yZy9sYXRlc3QvY2RyYWdvbi90ZnQvZW5fdXMuanNvblxuXG5pbXBvcnQgeyBDaGFtcGlvbiB9IGZyb20gJy4uLy4uL21vZGVscy90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBjaGFtcGlvbnM6IENoYW1waW9uW10gPSBbXG4gIC8vID09PT09IDEtQ29zdCAoMTQpID09PT09XG4gIHsgaWQ6IFwiREFfMThfQWthbGlfQURcIiwgbmFtZTogXCJBa2FsaVwiLCBjb3N0OiAxLCB0cmFpdHM6IFtcIkluZmVybm9cIiwgXCJBZGFwdG9yXCIsIFwiUmF2YWdlclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfYWthbGkvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfYWthbGlfc3BsYXNoX3RpbGVfMi5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X0NhbWlsbGVcIiwgbmFtZTogXCJDYW1pbGxlXCIsIGNvc3Q6IDEsIHRyYWl0czogW1wiQ292ZW5cIiwgXCJSYXZhZ2VyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9jYW1pbGxlL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X2NhbWlsbGVfc3BsYXNoX3RpbGVfMi5wbmdcIiB9LFxuICB7IGlkOiBcIkRBX0NpbmRlcmxpbmcxOFwiLCBuYW1lOiBcIkNpbmRlcmxpbmdcIiwgY29zdDogMSwgdHJhaXRzOiBbXCJSaWZ0YmVhc3RcIiwgXCJIdW50ZXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X2NpbmRlcmxpbmcvc2tpbnMvYmFzZS9pbWFnZXMvdF8xOF9jaW5kZXJsaW5nX3RlYW1wbGFubmVyc3BsYXNoLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfS2FybWExOFwiLCBuYW1lOiBcIkthcm1hXCIsIGNvc3Q6IDEsIHRyYWl0czogW1wiQmxvc3NvbVwiLCBcIlNwZWxsd2VhdmVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9rYXJtYS9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF9rYXJtYV9zcGxhc2hfdGlsZV83MC5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X0tvYnVrb1wiLCBuYW1lOiBcIktvYnVrb1wiLCBjb3N0OiAxLCB0cmFpdHM6IFtcIlNwcnlraW5cIiwgXCJCcmF3bGVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9rb2J1a28vc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfa29idWtvX3NwbGFzaF90aWxlXzIucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9MZW9uYVwiLCBuYW1lOiBcIkxlb25hXCIsIGNvc3Q6IDEsIHRyYWl0czogW1wiU29sYXJcIiwgXCJEZWZlbmRlclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfbGVvbmEvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfbGVvbmFfc3BsYXNoX3RpbGVfMTAucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9Pcm5uXCIsIG5hbWU6IFwiT3JublwiLCBjb3N0OiAxLCB0cmFpdHM6IFtcIkVsZGVyd29vZFwiLCBcIkRlZmVuZGVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9vcm5uL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X29ybm5fc3BsYXNoX3RpbGVfMi5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X1NlbnRyeVwiLCBuYW1lOiBcIlBlYmJsZXNcIiwgY29zdDogMSwgdHJhaXRzOiBbXCJSaWZ0YmVhc3RcIiwgXCJJbnZva2VyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9zZW50cnkvc2tpbnMvYmFzZS9pbWFnZXMvdF8xOF9zZW50cnlfdGVhbXBsYW5uZXJzcGxhc2gucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9SYWthblwiLCBuYW1lOiBcIlJha2FuXCIsIGNvc3Q6IDEsIHRyYWl0czogW1wiRmFlXCIsIFwiSnVnZ2VybmF1dFwiLCBcIlZhbmd1YXJkXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9yYWthbi9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF9yYWthbl9zcGxhc2hfdGlsZV85LnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfUmVrU2FpXCIsIG5hbWU6IFwiUmVrJ1NhaVwiLCBjb3N0OiAxLCB0cmFpdHM6IFtcIkJsYWNrdGhvcm5cIiwgXCJCcmF3bGVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9yZWtzYWkvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfcmVrc2FpX3NwbGFzaF90aWxlXzE3LnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfVmFydXNcIiwgbmFtZTogXCJWYXJ1c1wiLCBjb3N0OiAxLCB0cmFpdHM6IFtcIkluZmVybm9cIiwgXCJSYXBpZGZpcmVcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X3ZhcnVzL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X3ZhcnVzX3NwbGFzaF90aWxlXzkucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9WZWlnYXJcIiwgbmFtZTogXCJWZWlnYXJcIiwgY29zdDogMSwgdHJhaXRzOiBbXCJCbGFja3Rob3JuXCIsIFwiU3ByeWtpblwiLCBcIlNwZWxsd2VhdmVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF92ZWlnYXIvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfdmVpZ2FyX3NwbGFzaF90aWxlXzEzLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfWGF5YWhcIiwgbmFtZTogXCJYYXlhaFwiLCBjb3N0OiAxLCB0cmFpdHM6IFtcIkVsZGVyd29vZFwiLCBcIkZhZVwiLCBcIlJhcGlkZmlyZVwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfeGF5YWgvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfeGF5YWhfc3BsYXNoX3RpbGVfOC5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X1lvcmlja1wiLCBuYW1lOiBcIllvcmlja1wiLCBjb3N0OiAxLCB0cmFpdHM6IFtcIkJsb3Nzb21cIiwgXCJKdWdnZXJuYXV0XCIsIFwiU3VtbW9uZXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X3lvcmljay9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF95b3JpY2tfc3BsYXNoX3RpbGVfMzAucG5nXCIgfSxcblxuICAvLyA9PT09PSAyLUNvc3QgKDEzKSA9PT09PVxuICB7IGlkOiBcIkRBXzE4X0FsaXN0YXJcIiwgbmFtZTogXCJBbGlzdGFyXCIsIGNvc3Q6IDIsIHRyYWl0czogW1wiRWxkZXJ3b29kXCIsIFwiQnJhd2xlclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfYWxpc3Rhci9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF9hbGlzdGFyX3NwbGFzaF90aWxlXzQwLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfQ2FpdGx5blwiLCBuYW1lOiBcIkNhaXRseW5cIiwgY29zdDogMiwgdHJhaXRzOiBbXCJDb3ZlblwiLCBcIkh1bnRlclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfY2FpdGx5bi9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF9jYWl0bHluX3NwbGFzaF90aWxlXzMwLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfRWxpc2VcIiwgbmFtZTogXCJFbGlzZVwiLCBjb3N0OiAyLCB0cmFpdHM6IFtcIkNvdmVuXCIsIFwiVmFuZ3VhcmRcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X2VsaXNlL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X2VsaXNlX3NwbGFzaF90aWxlXzI0LnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfR3JvbXAxOF9BUFwiLCBuYW1lOiBcIkdyb21wXCIsIGNvc3Q6IDIsIHRyYWl0czogW1wiUmlmdGJlYXN0XCIsIFwiQWRhcHRvclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfZ3JvbXAvc2tpbnMvYmFzZS9pbWFnZXMvdF8xOF9ncm9tcF90ZWFtcGxhbm5lcnNwbGFzaC5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X0theWxlXCIsIG5hbWU6IFwiS2F5bGVcIiwgY29zdDogMiwgdHJhaXRzOiBbXCJTb2xhclwiLCBcIlJhcGlkZmlyZVwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfa2F5bGUvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfa2F5bGVfc3BsYXNoX3RpbGVfNDIucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9MZUJsYW5jXCIsIG5hbWU6IFwiTGVCbGFuY1wiLCBjb3N0OiAyLCB0cmFpdHM6IFtcIkVsZGVyd29vZFwiLCBcIlNwZWxsd2VhdmVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9sZWJsYW5jL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X2xlYmxhbmNfc3BsYXNoX3RpbGVfNS5wbmdcIiB9LFxuICB7IGlkOiBcIkRBX011cmt3b2xmMThcIiwgbmFtZTogXCJNdXJrd29sZlwiLCBjb3N0OiAyLCB0cmFpdHM6IFtcIlJpZnRiZWFzdFwiLCBcIlJhdmFnZXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X211cmt3b2xmL3NraW5zL2Jhc2UvaW1hZ2VzL3RfMThfbXVya3dvbGZfdGVhbXBsYW5uZXJzcGxhc2gucG5nXCIgfSxcbiAgeyBpZDogXCJEQV9TY3V0dGxlY3JhYjE4XCIsIG5hbWU6IFwiU2N1dHRsZWNyYWJcIiwgY29zdDogMiwgdHJhaXRzOiBbXCJSaWZ0YmVhc3RcIiwgXCJKdWdnZXJuYXV0XCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9zY3V0dGxlY3JhYi9za2lucy9iYXNlL2ltYWdlcy90XzE4X3NjdXR0bGVjcmFiX3RlYW1wbGFubmVyc3BsYXNoLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfU2VqdWFuaVwiLCBuYW1lOiBcIlNlanVhbmlcIiwgY29zdDogMiwgdHJhaXRzOiBbXCJTb2xhclwiLCBcIkp1Z2dlcm5hdXRcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X3NlanVhbmkvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfc2VqdWFuaV9zcGxhc2hfdGlsZV8yNi5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X1NoZW5cIiwgbmFtZTogXCJTaGVuXCIsIGNvc3Q6IDIsIHRyYWl0czogW1wiSW5mZXJub1wiLCBcIkRlZmVuZGVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9zaGVuL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X3NoZW5fc3BsYXNoX3RpbGVfMTYucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9UZWVtb1wiLCBuYW1lOiBcIlRlZW1vXCIsIGNvc3Q6IDIsIHRyYWl0czogW1wiU3ByeWtpblwiLCBcIkludm9rZXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X3RlZW1vL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X3RlZW1vX3NwbGFzaF90aWxlXzAucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9XYXJ3aWNrXCIsIG5hbWU6IFwiV2Fyd2lja1wiLCBjb3N0OiAyLCB0cmFpdHM6IFtcIkJsYWNrdGhvcm5cIiwgXCJSYXZhZ2VyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF93YXJ3aWNrL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X3dhcndpY2tfc3BsYXNoX3RpbGVfMzUucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9ZdW5hcmFcIiwgbmFtZTogXCJZdW5hcmFcIiwgY29zdDogMiwgdHJhaXRzOiBbXCJCbG9zc29tXCIsIFwiRXhlY3V0aW9uZXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X3l1bmFyYS9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF95dW5hcmFfc3BsYXNoX3RpbGVfMC5wbmdcIiB9LFxuXG4gIC8vID09PT09IDMtQ29zdCAoMTQpID09PT09XG4gIHsgaWQ6IFwiREFfMThfQXppclwiLCBuYW1lOiBcIkF6aXJcIiwgY29zdDogMywgdHJhaXRzOiBbXCJCbGFja3Rob3JuXCIsIFwiRXhlY3V0aW9uZXJcIiwgXCJTdW1tb25lclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfYXppci9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF9hemlyX3NwbGFzaF90aWxlXzUucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9DYXNzaW9wZWlhXCIsIG5hbWU6IFwiQ2Fzc2lvcGVpYVwiLCBjb3N0OiAzLCB0cmFpdHM6IFtcIkNvdmVuXCIsIFwiU3BlbGx3ZWF2ZXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X2Nhc3Npb3BlaWEvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfY2Fzc2lvcGVpYV9zcGxhc2hfdGlsZV8xOC5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X0RpYW5hXCIsIG5hbWU6IFwiRGlhbmFcIiwgY29zdDogMywgdHJhaXRzOiBbXCJMdW5hclwiLCBcIlJhdmFnZXJcIiwgXCJWYW5ndWFyZFwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfZGlhbmEvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfZGlhbmFfc3BsYXNoX3RpbGVfMC5wbmdcIiB9LFxuICB7IGlkOiBcIkRBX0ZpZGRsZXN0aWNrczE4XCIsIG5hbWU6IFwiRmlkZGxlc3RpY2tzXCIsIGNvc3Q6IDMsIHRyYWl0czogW1wiRmxvcmEgRmF0YWxpc1wiLCBcIkRlZmVuZGVyXCIsIFwiU3BlbGx3ZWF2ZXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X2ZpZGRsZXN0aWNrcy9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF9maWRkbGVzdGlja3Nfc3BsYXNoX3RpbGVfNDYucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9IZWNhcmltXCIsIG5hbWU6IFwiSGVjYXJpbVwiLCBjb3N0OiAzLCB0cmFpdHM6IFtcIkVsZGVyd29vZFwiLCBcIlZhbmd1YXJkXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9oZWNhcmltL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X2hlY2FyaW1fc3BsYXNoX3RpbGVfNS5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X0toYVppeFwiLCBuYW1lOiBcIktoYSdaaXhcIiwgY29zdDogMywgdHJhaXRzOiBbXCJSaXZhbFwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfa2hheml4L3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X2toYXppeF9zcGxhc2hfdGlsZV8wLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfS29nTWF3MThfQURcIiwgbmFtZTogXCJLb2cnTWF3XCIsIGNvc3Q6IDMsIHRyYWl0czogW1wiQ2F1c3RpY1wiLCBcIkFkYXB0b3JcIiwgXCJJbnZva2VyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9rb2dtYXcvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfa29nbWF3X3NwbGFzaF90aWxlXzMucG5nXCIgfSxcbiAgeyBpZDogXCJEQV9LcnVnMThcIiwgbmFtZTogXCJLcnVnXCIsIGNvc3Q6IDMsIHRyYWl0czogW1wiUmlmdGJlYXN0XCIsIFwiQnJhd2xlclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfa3J1Zy9za2lucy9iYXNlL2ltYWdlcy90XzE4X2tydWdfdGVhbXBsYW5uZXJzcGxhc2gucG5nXCIgfSxcbiAgeyBpZDogXCJEQV9Dcmltc29uUmFwdG9yMThcIiwgbmFtZTogXCJNYW1hIEJlYWtcIiwgY29zdDogMywgdHJhaXRzOiBbXCJSaWZ0YmVhc3RcIiwgXCJTdW1tb25lclwiLCBcIlJhcGlkZmlyZVwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfcmFwdG9yL3NraW5zL2Jhc2UvaW1hZ2VzL3RfMThfY3JpbXNvbnJhcHRvcl90ZWFtcGxhbm5lcnNwbGFzaC5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X01hc3RlcllpX0FEXCIsIG5hbWU6IFwiTWFzdGVyIFlpXCIsIGNvc3Q6IDMsIHRyYWl0czogW1wiQmxvc3NvbVwiLCBcIkFkYXB0b3JcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X21hc3RlcnlpL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X21hc3RlcnlpX3NwbGFzaF90aWxlXzUyLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfUmFtbXVzXCIsIG5hbWU6IFwiUmFtbXVzXCIsIGNvc3Q6IDMsIHRyYWl0czogW1wiU3ByeWtpblwiLCBcIkRlZmVuZGVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9yYW1tdXMvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfcmFtbXVzX3NwbGFzaF90aWxlXzI2LnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfUmVuZ2FyXCIsIG5hbWU6IFwiUmVuZ2FyXCIsIGNvc3Q6IDMsIHRyYWl0czogW1wiUml2YWxcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X3Jlbmdhci9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF9yZW5nYXJfc3BsYXNoX3RpbGVfMC5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X1RyaXN0YW5hXCIsIG5hbWU6IFwiVHJpc3RhbmFcIiwgY29zdDogMywgdHJhaXRzOiBbXCJGYWVcIiwgXCJTcHJ5a2luXCIsIFwiSHVudGVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF90cmlzdGFuYS9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF90cmlzdGFuYV9zcGxhc2hfdGlsZV82MS5wbmdcIiB9LFxuICB7IGlkOiBcIkRBX1ZpMThcIiwgbmFtZTogXCJWaVwiLCBjb3N0OiAzLCB0cmFpdHM6IFtcIlByaW1hbFwiLCBcIkp1Z2dlcm5hdXRcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X3ZpL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X3ZpX3NwbGFzaF90aWxlXzM5LnBuZ1wiIH0sXG5cbiAgLy8gPT09PT0gNC1Db3N0ICgxNCkgPT09PT1cbiAgeyBpZDogXCJEQV8xOF9BaHJpXCIsIG5hbWU6IFwiQWhyaVwiLCBjb3N0OiA0LCB0cmFpdHM6IFtcIkJsb3Nzb21cIiwgXCJTcGVsbHdlYXZlclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfYWhyaS9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF9haHJpX3NwbGFzaF90aWxlXzI3LnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfQW11bXUxOFwiLCBuYW1lOiBcIkFtdW11XCIsIGNvc3Q6IDQsIHRyYWl0czogW1wiSW5mZXJub1wiLCBcIkp1Z2dlcm5hdXRcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X2FtdW11L3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X2FtdW11X3NwbGFzaF90aWxlXzE3LnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfQXBoZWxpb3NcIiwgbmFtZTogXCJBcGhlbGlvc1wiLCBjb3N0OiA0LCB0cmFpdHM6IFtcIkx1bmFyXCIsIFwiUmFwaWRmaXJlXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9hcGhlbGlvcy9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF9hcGhlbGlvc19zcGxhc2hfdGlsZV8wLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfQnJhbWJsZWJhY2sxOFwiLCBuYW1lOiBcIkJyYW1ibGViYWNrXCIsIGNvc3Q6IDQsIHRyYWl0czogW1wiUmlmdGJlYXN0XCIsIFwiUmF2YWdlclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfYnJhbWJsZWJhY2svc2tpbnMvYmFzZS9pbWFnZXMvdF8xOF9icmFtYmxlYmFja190ZWFtcGxhbm5lcnNwbGFzaC5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X0V6cmVhbFwiLCBuYW1lOiBcIkV6cmVhbFwiLCBjb3N0OiA0LCB0cmFpdHM6IFtcIkVsZGVyd29vZFwiLCBcIkV4ZWN1dGlvbmVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9lenJlYWwvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfZXpyZWFsX3NwbGFzaF90aWxlXzEucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9MaWxsaWFcIiwgbmFtZTogXCJMaWxsaWFcIiwgY29zdDogNCwgdHJhaXRzOiBbXCJGYWVcIiwgXCJEZWZlbmRlclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfbGlsbGlhL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X2xpbGxpYV9zcGxhc2hfdGlsZV8yOC5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X01hbHBoaXRlXCIsIG5hbWU6IFwiTWFscGhpdGVcIiwgY29zdDogNCwgdHJhaXRzOiBbXCJCbGFja3Rob3JuXCIsIFwiTW9ub2xpdGhcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X21hbHBoaXRlL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X21hbHBoaXRlX3NwbGFzaF90aWxlXzI3LnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfTW9yZ2FuYVwiLCBuYW1lOiBcIk1vcmdhbmFcIiwgY29zdDogNCwgdHJhaXRzOiBbXCJDb3ZlblwiLCBcIkludm9rZXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X21vcmdhbmEvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfbW9yZ2FuYV9zcGxhc2hfdGlsZV8yNi5wbmdcIiB9LFxuICB7IGlkOiBcIkRBX05pZGFsZWUxOF9BUFwiLCBuYW1lOiBcIk5pZGFsZWVcIiwgY29zdDogNCwgdHJhaXRzOiBbXCJQcmltYWxcIiwgXCJBZGFwdG9yXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9uaWRhbGVlL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X25pZGFsZWVfc3BsYXNoX3RpbGVfMC5wbmdcIiB9LFxuICB7IGlkOiBcIkRBX1NlbnRpbmVsMThcIiwgbmFtZTogXCJTZW50aW5lbFwiLCBjb3N0OiA0LCB0cmFpdHM6IFtcIlJpZnRiZWFzdFwiLCBcIlZhbmd1YXJkXCIsIFwiSW52b2tlclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfc2VudGluZWwvc2tpbnMvYmFzZS9pbWFnZXMvdF8xOF9zZW50aW5lbF90ZWFtcGxhbm5lcnNwbGFzaC5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X1NldHRcIiwgbmFtZTogXCJTZXR0XCIsIGNvc3Q6IDQsIHRyYWl0czogW1wiQmxvc3NvbVwiLCBcIkJyYXdsZXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X3NldHQvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfc2V0dF9zcGxhc2hfdGlsZV8zOC5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X1NpdmlyXCIsIG5hbWU6IFwiU2l2aXJcIiwgY29zdDogNCwgdHJhaXRzOiBbXCJQcmltYWxcIiwgXCJIdW50ZXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X3NpdmlyL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X3NpdmlyX3NwbGFzaF90aWxlXzYxLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfU29yYWthXCIsIG5hbWU6IFwiU29yYWthXCIsIGNvc3Q6IDQsIHRyYWl0czogW1wiRmxvcmEgRmF0YWxpc1wiLCBcIkV4ZWN1dGlvbmVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9zb3Jha2Evc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfc29yYWthX3NwbGFzaF90aWxlXzUzLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfWnlyYVwiLCBuYW1lOiBcIlp5cmFcIiwgY29zdDogNCwgdHJhaXRzOiBbXCJUaG9ybm1haWRlblwiLCBcIlN1bW1vbmVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF96eXJhL3NraW5zL2Jhc2UvaW1hZ2VzL3RmdDE4X3p5cmFfc3BsYXNoX3RpbGVfMC5wbmdcIiB9LFxuXG4gIC8vID09PT09IDUtQ29zdCAoMTkpID09PT09XG4gIHsgaWQ6IFwiREFfMThfQWx1bmVcIiwgbmFtZTogXCJBbHVuZVwiLCBjb3N0OiA1LCB0cmFpdHM6IFtcIkF0dHVuZWRcIiwgXCJMdW5hclwiLCBcIlNwZWxsd2VhdmVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9hbHVuZS9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF9hbHVuZV9zcGxhc2hfdGlsZV8xNS5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X0FzaGVcIiwgbmFtZTogXCJBc2hlXCIsIGNvc3Q6IDUsIHRyYWl0czogW1wiQmxvc3NvbVwiLCBcIkh1bnRlclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfYXNoZS9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF9hc2hlX3NwbGFzaF90aWxlXzc2LnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfRHJhdmVuMThcIiwgbmFtZTogXCJEcmF2ZW5cIiwgY29zdDogNSwgdHJhaXRzOiBbXCJCb3VudHkgU2Vla2VyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9kcmF2ZW4vc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfZHJhdmVuX3NwbGFzaF90aWxlXzUucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9FbGRlckRyYWdvblwiLCBuYW1lOiBcIkVsZGVyIERyYWdvblwiLCBjb3N0OiA1LCB0cmFpdHM6IFtcIkFwZXggUHJlZGF0b3JcIiwgXCJSaWZ0YmVhc3RcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X2VsZGVyZHJhZ29uL3NraW5zL2Jhc2UvaW1hZ2VzL3RfMThfZWxkZXJkcmFnb25fdGVhbXBsYW5uZXJzcGxhc2gucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9HbmFyU21hbGxcIiwgbmFtZTogXCJHbmFyXCIsIGNvc3Q6IDUsIHRyYWl0czogW1wiRWxkZXJ3b29kXCIsIFwiU3ByeWtpblwiLCBcIkJyYXdsZXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X2duYXIvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfZ25hcl9zcGxhc2hfdGlsZV8wLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfSXZlcm5cIiwgbmFtZTogXCJJdmVyblwiLCBjb3N0OiA1LCB0cmFpdHM6IFtcIkdyZWVuZmF0aGVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9pdmVybi9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF9pdmVybl9zcGxhc2hfdGlsZV8wLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfS2VubmVuXCIsIG5hbWU6IFwiS2VubmVuXCIsIGNvc3Q6IDUsIHRyYWl0czogW1wiSW5mZXJub1wiLCBcIkV4ZWN1dGlvbmVyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9rZW5uZW4vc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfa2VubmVuX3NwbGFzaF90aWxlXzgucG5nXCIgfSxcbiAgeyBpZDogXCJEQV9MdXgxOF9CYXNlXCIsIG5hbWU6IFwiTHV4XCIsIGNvc3Q6IDUsIHRyYWl0czogW1wiQXZhdGFyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9sdXgvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfbHV4X3NwbGFzaF90aWxlXzcucG5nXCIgfSxcbiAgeyBpZDogXCJEQV9MdXgxOF9CbGFja3Rob3JuXCIsIG5hbWU6IFwiTHV4IChCbGFja3Rob3JuKVwiLCBjb3N0OiA1LCB0cmFpdHM6IFtcIkJsYWNrdGhvcm5cIiwgXCJBdmF0YXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X2x1eC9odWQvc3BsYXNoZXMvdF8xOF9sdXhfYmxhY2t0aG9ybl90ZWFtcGxhbm5lci5wbmdcIiB9LFxuICB7IGlkOiBcIkRBX0x1eDE4X0Jsb3Nzb21cIiwgbmFtZTogXCJMdXggKEJsb3Nzb20pXCIsIGNvc3Q6IDUsIHRyYWl0czogW1wiQmxvc3NvbVwiLCBcIkF2YXRhclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfbHV4L2h1ZC9zcGxhc2hlcy90XzE4X2x1eF9ibG9zc29tX3RlYW1wbGFubmVyLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfTHV4X0NvdmVuXCIsIG5hbWU6IFwiTHV4IChDb3ZlbilcIiwgY29zdDogNSwgdHJhaXRzOiBbXCJDb3ZlblwiLCBcIkF2YXRhclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfbHV4L2h1ZC9zcGxhc2hlcy90XzE4X2x1eF9jb3Zlbl90ZWFtcGxhbm5lci5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X0x1eF9FbGRlcndvb2RcIiwgbmFtZTogXCJMdXggKEVsZGVyd29vZClcIiwgY29zdDogNSwgdHJhaXRzOiBbXCJFbGRlcndvb2RcIiwgXCJBdmF0YXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X2x1eC9odWQvc3BsYXNoZXMvdF8xOF9sdXhfZWxkZXJ3b29kX3RlYW1wbGFubmVyLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfTHV4X0ZhZVwiLCBuYW1lOiBcIkx1eCAoRmFlKVwiLCBjb3N0OiA1LCB0cmFpdHM6IFtcIkZhZVwiLCBcIkF2YXRhclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfbHV4L2h1ZC9zcGxhc2hlcy90XzE4X2x1eF9mYWVfdGVhbXBsYW5uZXIucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9MdXhfSW5mZXJub1wiLCBuYW1lOiBcIkx1eCAoSW5mZXJubylcIiwgY29zdDogNSwgdHJhaXRzOiBbXCJJbmZlcm5vXCIsIFwiQXZhdGFyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9sdXgvaHVkL3NwbGFzaGVzL3RfMThfbHV4X2luZmVybm9fdGVhbXBsYW5uZXIucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9MdXhfTW9vbmJlYW1cIiwgbmFtZTogXCJMdXggKEx1bmFyKVwiLCBjb3N0OiA1LCB0cmFpdHM6IFtcIkx1bmFyXCIsIFwiQXZhdGFyXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9sdXgvaHVkL3NwbGFzaGVzL3RfMThfbHV4X21vb25iZWFtX3RlYW1wbGFubmVyLnBuZ1wiIH0sXG4gIHsgaWQ6IFwiREFfMThfTHV4X1ByaW1hbFwiLCBuYW1lOiBcIkx1eCAoUHJpbWFsKVwiLCBjb3N0OiA1LCB0cmFpdHM6IFtcIlByaW1hbFwiLCBcIkF2YXRhclwiXSwgdGlsZUljb246IFwiYXNzZXRzL2NoYXJhY3RlcnMvdGZ0MThfbHV4L2h1ZC9zcGxhc2hlcy90XzE4X2x1eF9wcmltYWxfdGVhbXBsYW5uZXIucG5nXCIgfSxcbiAgeyBpZDogXCJEQV8xOF9MdXhfU3VuYmVhbVwiLCBuYW1lOiBcIkx1eCAoU29sYXIpXCIsIGNvc3Q6IDUsIHRyYWl0czogW1wiU29sYXJcIiwgXCJBdmF0YXJcIl0sIHRpbGVJY29uOiBcImFzc2V0cy9jaGFyYWN0ZXJzL3RmdDE4X2x1eC9odWQvc3BsYXNoZXMvdF8xOF9sdXhfc3VuYmVhbV90ZWFtcGxhbm5lci5wbmdcIiB9LFxuICB7IGlkOiBcIkRBXzE4X01hb2thaVwiLCBuYW1lOiBcIk1hb2thaVwiLCBjb3N0OiA1LCB0cmFpdHM6IFtcIk9sZCBHcm93dGhcIiwgXCJKdWdnZXJuYXV0XCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF9tYW9rYWkvc2tpbnMvYmFzZS9pbWFnZXMvdGZ0MThfbWFva2FpX3NwbGFzaF90aWxlXzAucG5nXCIgfSxcbiAgeyBpZDogXCJEQV9UYXJpYzE4XCIsIG5hbWU6IFwiVGFyaWNcIiwgY29zdDogNSwgdHJhaXRzOiBbXCJFbWVyYWxkIEFzcGVjdFwiLCBcIlZhbmd1YXJkXCJdLCB0aWxlSWNvbjogXCJhc3NldHMvY2hhcmFjdGVycy90ZnQxOF90YXJpYy9za2lucy9iYXNlL2ltYWdlcy90ZnQxOF90YXJpY19zcGxhc2hfdGlsZV8xLnBuZ1wiIH0sXG5cbl07XG5cbmV4cG9ydCBjb25zdCBjaGFtcGlvbk1hcCA9IG5ldyBNYXAoY2hhbXBpb25zLm1hcChjID0+IFtjLmlkLCBjXSkpO1xuXG5leHBvcnQgY29uc3QgZ2V0Q2hhbXBpb25zQnlDb3N0ID0gKGNvc3Q6IG51bWJlcikgPT5cbiAgY2hhbXBpb25zLmZpbHRlcihjID0+IGMuY29zdCA9PT0gY29zdCk7XG5cbmV4cG9ydCBjb25zdCBnZXRDaGFtcGlvbnNCeVRyYWl0ID0gKHRyYWl0OiBzdHJpbmcpID0+XG4gIGNoYW1waW9ucy5maWx0ZXIoYyA9PiBjLnRyYWl0cy5pbmNsdWRlcyh0cmFpdCkpO1xuIiwiLy8gUGl2b3RURlQg4oCUIFNldCAxOCBjb21wcyBzZWVkLiBXcml0dGVuIGJ5IHNjcmlwdHMvZXhwb3J0LWNvbXBzLm1qcyBmcm9tIHRoZVxuLy8gcHVibGlzaGVkIGNvbXBzIG9uIHRoZSBBUEk7IHRoZSBhcHAgcGFpbnRzIGl0IHdoaWxlIG9mZmxpbmUuIERvIG5vdCBlZGl0IGJ5IGhhbmQuXG5pbXBvcnQgeyBDb21wIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IHNlZWRDb21wczogQ29tcFtdID0gW107XG4iLCIvLyBQaXZvdFRGVCDigJQgU2V0IDE4IGl0ZW1zLiBBdXRvLWdlbmVyYXRlZCBieSBzY3JpcHRzL2dlbi1zZXQtZGF0YS5tanMg4oCUIGRvIG5vdCBlZGl0LlxuLy8gU291cmNlOiBodHRwczovL3Jhdy5jb21tdW5pdHlkcmFnb24ub3JnL2xhdGVzdC9jZHJhZ29uL3RmdC9lbl91cy5qc29uXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IGl0ZW1zOiBJdGVtW10gPSBbXG4gIHsgaWQ6IFwiYWVnaXMtb2YtZGF3blwiLCBhcGlOYW1lOiBcIkRBX0FydGlmYWN0X0FlZ2lzT2ZEYXduXCIsIG5hbWU6IFwiQWVnaXMgb2YgRGF3blwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJhcnRpZmFjdFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9hcnRpZmFjdF9hZWdpc29mZGF3bi50ZXhcIiB9LFxuICB7IGlkOiBcImFlZ2lzLW9mLWR1c2tcIiwgYXBpTmFtZTogXCJEQV9BcnRpZmFjdF9BZWdpc09mRHVza1wiLCBuYW1lOiBcIkFlZ2lzIG9mIER1c2tcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fYXJ0aWZhY3RfYWVnaXNvZmR1c2sudGV4XCIgfSxcbiAgeyBpZDogXCJibGlnaHRpbmctamV3ZWxcIiwgYXBpTmFtZTogXCJEQV9BcnRpZmFjdF9CbGlnaHRpbmdKZXdlbFwiLCBuYW1lOiBcIkJsaWdodGluZyBKZXdlbFwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJhcnRpZmFjdFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9hcnRpZmFjdF9ibGlnaHRpbmdqZXdlbC50ZXhcIiB9LFxuICB7IGlkOiBcImNhcHBhLWp1aWNlXCIsIGFwaU5hbWU6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfQ2FwcGFKdWljZVwiLCBuYW1lOiBcIkNhcHBhIEp1aWNlXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIlRoZSBob2xkZXIgZG9ucyBhIEhhdCBvbiBlYWNoIHRha2Vkb3duLiBUaGUgaG9sZGVyIGdhaW5zIEBBREFQUGVyVGFrZWRvd25AJSBBdHRhY2sgRGFtYWdlIGFuZCBBYmlsaXR5IFBvd2VyIHBlciBIYXQuIE9uIGRlYXRoIGxvc2UgQFBlcmNlbnRIYXRMb3NzKjEwMEAlIG9mIGFsbCBIYXRzLiZuYnNwOyhIYXRzOiZuYnNwO0BURlRVbml0UHJvcGVydHkudHJhaXQ6VEZUX0l0ZW1fQXJ0aWZhY3RfQ2FwcGFKdWljZV9OdW1IYXRzQClcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQxNl9hcnRpZmFjdF9rYXBwYWp1aWNlLnRleFwiIH0sXG4gIHsgaWQ6IFwiY29ycnVwdC12YW1waXJpYy1zY2VwdGVyXCIsIGFwaU5hbWU6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfQ3Vyc2VkVmFtcGlyaWNTY2VwdGVyXCIsIG5hbWU6IFwiQ29ycnVwdCBWYW1waXJpYyBTY2VwdGVyXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIkF0dGFja3MgZGVhbCBhbiBhZGRpdGlvbmFsIEBQZXJjZW50RGFtYWdlQCUgQXR0YWNrIERhbWFnZSAlaTpzY2FsZUFEJSBhcyBwaHlzaWNhbCBkYW1hZ2UgYW5kIGhlYWwgdGhlIGhvbGRlciBmb3IgdGhlIGRhbWFnZSBkZWFsdC5UaGUgaG9sZGVyIGNhbm5vdCBjYXN0IHRoZWlyIEFiaWxpdHkgb3IgZ2FpbiBNYW5hLlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX2FydGlmYWN0X2N1cnNlZHZhbXBpcmljc2NlcHRlci50ZXhcIiB9LFxuICB7IGlkOiBcImRhd25jb3JlXCIsIGFwaU5hbWU6IFwiREFfQXJ0aWZhY3RfRGF3bmNvcmVcIiwgbmFtZTogXCJEYXduY29yZVwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJhcnRpZmFjdFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9hcnRpZmFjdF9kYXduY29yZS50ZXhcIiB9LFxuICB7IGlkOiBcImV0ZXJuYWwtcGFjdFwiLCBhcGlOYW1lOiBcIkRBX0FydGlmYWN0X0V0ZXJuYWxQYWN0XCIsIG5hbWU6IFwiRXRlcm5hbCBQYWN0XCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdDE2X2FydGlmYWN0X2V0ZXJuYWxwYWN0LnRleFwiIH0sXG4gIHsgaWQ6IFwiZmlzaGJvbmVzXCIsIGFwaU5hbWU6IFwiREFfQXJ0aWZhY3RfRmlzaGJvbmVzXCIsIG5hbWU6IFwiRmlzaGJvbmVzXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX2FydGlmYWN0X2Zpc2hib25lcy50ZXhcIiB9LFxuICB7IGlkOiBcImZsaWNrZXJibGFkZXNcIiwgYXBpTmFtZTogXCJEQV9BcnRpZmFjdF9OYXZvcmlGbGlja2VyYmxhZGVcIiwgbmFtZTogXCJGbGlja2VyYmxhZGVzXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX2FydGlmYWN0X25hdm9yaWZsaWNrZXJwbGFkZS50ZXhcIiB9LFxuICB7IGlkOiBcImZvcmJpZGRlbi1pZG9sXCIsIGFwaU5hbWU6IFwiREFfQXJ0aWZhY3RfRm9yYmlkZGVuSWRvbFwiLCBuYW1lOiBcIkZvcmJpZGRlbiBJZG9sXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX2FydGlmYWN0X2ZvcmJpZGRlbmlkb2wudGV4XCIgfSxcbiAgeyBpZDogXCJnYW1ibGVycy1ibGFkZVwiLCBhcGlOYW1lOiBcIkRBX0FydGlmYWN0X0dhbWJsZXJzQmxhZGVcIiwgbmFtZTogXCJHYW1ibGVyJ3MgQmxhZGVcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0N19pdGVtX3NoaW1tZXJzY2FsZWdhbWJsZXJzYmxhZGUudGV4XCIgfSxcbiAgeyBpZDogXCJnb2xkLWNvbGxlY3RvclwiLCBhcGlOYW1lOiBcIkRBX0FydGlmYWN0X0dvbGRDb2xsZWN0b3JcIiwgbmFtZTogXCJHb2xkIENvbGxlY3RvclwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJhcnRpZmFjdFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ0X2l0ZW1fb3JubnRoZWNvbGxlY3Rvci50ZXhcIiB9LFxuICB7IGlkOiBcImhlbGxmaXJlLWhhdGNoZXRcIiwgYXBpTmFtZTogXCJEQV9BcnRpZmFjdF9IZWxsZmlyZUhhdGNoZXRcIiwgbmFtZTogXCJIZWxsZmlyZSBIYXRjaGV0XCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX2FydGlmYWN0X2hlbGxmaXJlaGF0Y2hldC50ZXhcIiB9LFxuICB7IGlkOiBcImhvcml6b24tZm9jdXNcIiwgYXBpTmFtZTogXCJEQV9BcnRpZmFjdF9Ib3Jpem9uRm9jdXNcIiwgbmFtZTogXCJIb3Jpem9uIEZvY3VzXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX2FydGlmYWN0X2hvcml6b25mb2N1cy50ZXhcIiB9LFxuICB7IGlkOiBcImluZmluaXR5LWZvcmNlXCIsIGFwaU5hbWU6IFwiREFfQXJ0aWZhY3RfSW5maW5pdHlGb3JjZVwiLCBuYW1lOiBcIkluZmluaXR5IEZvcmNlXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdDRfaXRlbV9vcm5uaW5maW5pdHlmb3JjZS50ZXhcIiB9LFxuICB7IGlkOiBcImlubmVydmF0aW5nLWxvY2tldFwiLCBhcGlOYW1lOiBcIlRGVF9JdGVtX0FydGlmYWN0X0lubmVydmF0aW5nTG9ja2V0XCIsIG5hbWU6IFwiSW5uZXJ2YXRpbmcgTG9ja2V0XCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIlRoZSBob2xkZXIgZ2FpbnMgQFBlcmNlbnRNYW5hQCUgb2YgdGhlaXIgdG90YWwgTWFuYSB3aGVuZXZlciB0aGV5J3JlIGhpdCBieSBhbiBhdHRhY2suRWFjaCBjYXN0IHJlc3RvcmVzIEBQZXJjZW50SGVhbHRoQCUgb2YgdGhlIGhvbGRlcidzIG1heCBIZWFsdGggb3ZlciBARHVyYXRpb25AIHNlY29uZHMuXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fYXJ0aWZhY3RfaW5uZXJ2YXRpbmdsb2NrZXQudGV4XCIgfSxcbiAgeyBpZDogXCJsZXNzZXItbWlycm9yZWQtcGVyc29uYVwiLCBhcGlOYW1lOiBcIlRGVF9JdGVtX0FydGlmYWN0X0xlc3Nlck1pcnJvcmVkUGVyc29uYVwiLCBuYW1lOiBcIkxlc3NlciBNaXJyb3JlZCBQZXJzb25hXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIlNoYXJlIEBTdGF0U2hhcmVQZXJjZW50KjEwMEAlIG9mIHRoZSBob2xkZXIncyBib251cyBBdHRhY2sgRGFtYWdlLCBBYmlsaXR5IFBvd2VyLCBBdHRhY2sgU3BlZWQsIEFybW9yLCBNYWdpYyBSZXNpc3QsIGFuZCBIZWFsdGggd2l0aCBvdGhlciBNaXJyb3JlZCBQZXJzb25hIGhvbGRlcnMuQ2FuJ3QgYmUgUmVmb3JnZWRVbmlxdWU6IG9uZSBwZXIgY2hhbXBpb25cIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQxNl9hcnRpZmFjdF9sZXNzZXJtaXJyb3JlZHBlcnNvbmEudGV4XCIgfSxcbiAgeyBpZDogXCJsaWNoLWJhbmVcIiwgYXBpTmFtZTogXCJEQV9BcnRpZmFjdF9MaWNoQmFuZVwiLCBuYW1lOiBcIkxpY2ggQmFuZVwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJhcnRpZmFjdFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy9wYXJ0aWNsZXMvdGZ0L2l0ZW1faWNvbnMvb3Jubl9pdGVtcy90ZnRfaXRlbV9hcnRpZmFjdF9saWNoYmFuZS50ZXhcIiB9LFxuICB7IGlkOiBcImxpZ2h0c2hpZWxkLWNyZXN0XCIsIGFwaU5hbWU6IFwiREFfQXJ0aWZhY3RfTGlnaHRzaGllbGRDcmVzdFwiLCBuYW1lOiBcIkxpZ2h0c2hpZWxkIENyZXN0XCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX2FydGlmYWN0X2xpZ2h0c2hpZWxkY3Jlc3QudGV4XCIgfSxcbiAgeyBpZDogXCJsdWRlbnMtdGVtcGVzdFwiLCBhcGlOYW1lOiBcIkRBX0FydGlmYWN0X0x1ZGVuc1RlbXBlc3RcIiwgbmFtZTogXCJMdWRlbidzIFRlbXBlc3RcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fYXJ0aWZhY3RfbHVkZW5zdGVtcGVzdC50ZXhcIiB9LFxuICB7IGlkOiBcIm1hbmF6YW5lXCIsIGFwaU5hbWU6IFwiREFfQXJ0aWZhY3RfTWFuYXphbmVcIiwgbmFtZTogXCJNYW5hemFuZVwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJhcnRpZmFjdFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ0X2l0ZW1fb3Jubm11cmFtYW5hLnRleFwiIH0sXG4gIHsgaWQ6IFwibWVuZGluZy1lY2hvZXNcIiwgYXBpTmFtZTogXCJURlRfSXRlbV9BcnRpZmFjdF9NZW5kaW5nRWNob2VzXCIsIG5hbWU6IFwiTWVuZGluZyBFY2hvZXNcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiSW5jcmVhc2UgaGVhbGluZyBvbiB0aGUgaG9sZGVyIGJ5IEBJbmNyZWFzZWRIZWFsaW5nKjEwMEAlLiBXaGVuIHRoZSBob2xkZXIgZ2l2ZXMgb3IgcmVjZWl2ZXMgYSBoZWFsLCBncmFudCBASGVhbFBlcmNlbnRUb0dyYW50KjEwMEAlIG9mIHRoZSBoZWFscyB2YWx1ZSB0byB0aGUgbG93ZXN0IGhlYWx0aCBhbGx5IGFzIHdlbGwuXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0MTZfYXJ0aWZhY3RfbWVuZGluZ2VjaG9lcy50ZXhcIiB9LFxuICB7IGlkOiBcIm1pcnJvcmVkLXBlcnNvbmFcIiwgYXBpTmFtZTogXCJURlRfSXRlbV9BcnRpZmFjdF9NaXJyb3JlZFBlcnNvbmFcIiwgbmFtZTogXCJNaXJyb3JlZCBQZXJzb25hXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIkV2ZXJ5IEBOdW1Db21iYXRzQCBwbGF5ZXIgY29tYmF0cyBnYWluIGEgbGVzc2VyIGNvcHkgb2YgTWlycm9yZWQgUGVyc29uYSZuYnNwOyhAVEZUVW5pdFByb3BlcnR5LnRyYWl0OlRGVF9JdGVtX0FydGlmYWN0X01pcnJvcmVkUGVyc29uYV9Db21iYXRzQC9ATnVtQ29tYmF0c0ApLiBTaGFyZSBAU3RhdFNoYXJlUGVyY2VudCoxMDBAJSBvZiB0aGUgaG9sZGVyJ3MgYm9udXMgQXR0YWNrIERhbWFnZSwgQWJpbGl0eSBQb3dlciwgQXR0YWNrIFNwZWVkLCBBcm1vciwgTWFnaWMgUmVzaXN0LCBhbmQgSGVhbHRoIHdpdGggb3RoZXIgTWlycm9yZWQgUGVyc29uYSBob2xkZXJzLkNhbid0IGJlIFJlZm9yZ2VkLCBMZXNzZXIgY29waWVzIGRvIG5vdCBwcm9kdWNlIGNvcGllcy5VbmlxdWU6IG9uZSBwZXIgY2hhbXBpb25cIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQxNl9hcnRpZmFjdF9taXJyb3JlZHBlcnNvbmEudGV4XCIgfSxcbiAgeyBpZDogXCJtaXR0ZW5zXCIsIGFwaU5hbWU6IFwiREFfQXJ0aWZhY3RfTWl0dGVuc1wiLCBuYW1lOiBcIk1pdHRlbnNcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fYXJ0aWZhY3RfbWl0dGVucy50ZXhcIiB9LFxuICB7IGlkOiBcIm1vZ3Vsc21haWxcIiwgYXBpTmFtZTogXCJEQV9BcnRpZmFjdF9Nb2d1bHNNYWlsXCIsIG5hbWU6IFwiTW9ndWwnc01haWxcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0N19pdGVtX3NoaW1tZXJzY2FsZW1vZ3Vsc21haWwudGV4XCIgfSxcbiAgeyBpZDogXCJwcm93bGVycy1jbGF3XCIsIGFwaU5hbWU6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfUHJvd2xlcnNDbGF3XCIsIG5hbWU6IFwiUHJvd2xlcidzIENsYXdcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiQWZ0ZXIga2lsbGluZyBhIHRhcmdldCwgc2hlZCBuZWdhdGl2ZSBlZmZlY3RzIGFuZCBkYXNoIHRvIHRoZSBmYXJ0aGVzdCB0YXJnZXQgd2l0aGluIEBIZXhSYW5nZUAgaGV4ZXMuIFRoZSBuZXh0IDIgY3JpdGljYWwgYXR0YWNrcyBkZWFsIEBDcml0RGFtYWdlQm9udXNQZXJjZW50QCUgYm9udXMgQ3JpdGljYWwgU3RyaWtlIERhbWFnZS5cIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9hcnRpZmFjdF9wcm93bGVyc2NsYXcudGV4XCIgfSxcbiAgeyBpZDogXCJyYXBpZC1maXJlY2Fubm9uXCIsIGFwaU5hbWU6IFwiREFfQXJ0aWZhY3RfUmFwaWRGaXJlQ2Fubm9uXCIsIG5hbWU6IFwiUmFwaWQgRmlyZWNhbm5vblwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJhcnRpZmFjdFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9hcnRpZmFjdF9yYXBpZGZpcmVjYW5ub24udGV4XCIgfSxcbiAgeyBpZDogXCJzZWVrZXJzLWFybWd1YXJkXCIsIGFwaU5hbWU6IFwiREFfQXJ0aWZhY3RfU2Vla2Vyc0FybWd1YXJkXCIsIG5hbWU6IFwiU2Vla2VyJ3MgQXJtZ3VhcmRcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fYXJ0aWZhY3Rfc2Vla2Vyc2FybWd1YXJkLnRleFwiIH0sXG4gIHsgaWQ6IFwic2hhZG93LXB1cHBldFwiLCBhcGlOYW1lOiBcIlRGVF9JdGVtX0FydGlmYWN0X1NoYWRvd1B1cHBldFwiLCBuYW1lOiBcIlNoYWRvdyBQdXBwZXRcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiU3Bhd24gYSBjbG9uZSB0aGF0IGNvcGllcyB0aGUgaG9sZGVyJ3MgaXRlbXMuIFRoZSBjbG9uZSBoYXMgQENsb25lUGVyY2VudEhlYWx0aCoxMDBAJSBtYXggSGVhbHRoIGFuZCBkZWFscyBAQ2xvbmVQZXJjZW50RGFtYWdlKjEwMEAlIGRhbWFnZS5bVW5pcXVlIC0gb25seSAxIHBlciBjaGFtcGlvbl1cIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQxNl9hcnRpZmFjdF9zaGFkb3dwdXBwZXQudGV4XCIgfSxcbiAgeyBpZDogXCJzaWx2ZXJtZXJlLWRhd25cIiwgYXBpTmFtZTogXCJEQV9BcnRpZmFjdF9TaWx2ZXJtZXJlRGF3blwiLCBuYW1lOiBcIlNpbHZlcm1lcmUgRGF3blwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJhcnRpZmFjdFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9hcnRpZmFjdF9zaWx2ZXJtZXJlZGF3bi50ZXhcIiB9LFxuICB7IGlkOiBcInNwZWN0cmFsLWN1dGxhc3NcIiwgYXBpTmFtZTogXCJURlRfSXRlbV9BcnRpZmFjdF9TcGVjdHJhbEN1dGxhc3NcIiwgbmFtZTogXCJTcGVjdHJhbCBDdXRsYXNzXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIkNvbWJhdCBzdGFydDogVGVsZXBvcnQgdGhlIGhvbGRlciB0byB0aGUgbWlycm9yZWQgaGV4IG9uIHRoZSBlbmVteSdzIHNpZGUgb2YgdGhlIGJvYXJkLiBBZnRlciBARHVyYXRpb25AIHNlY29uZHMsIHRoZSBob2xkZXIgcmV0dXJucyB0byB0aGVpciBvcmlnaW5hbCBsb2NhdGlvbi5cIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9hcnRpZmFjdF9zcGVjdHJhbGN1dGxhc3MudGV4XCIgfSxcbiAgeyBpZDogXCJzdGF0aWtrLXNoaXZcIiwgYXBpTmFtZTogXCJEQV9BcnRpZmFjdF9TdGF0aWtrU2hpdlwiLCBuYW1lOiBcIlN0YXRpa2sgU2hpdlwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJhcnRpZmFjdFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9hcnRpZmFjdF9zdGF0dGlrc2hpdi50ZXhcIiB9LFxuICB7IGlkOiBcInN1c3BpY2lvdXMtdHJlbmNoLWNvYXRcIiwgYXBpTmFtZTogXCJURlRfSXRlbV9BcnRpZmFjdF9TdXNwaWNpb3VzVHJlbmNoQ29hdFwiLCBuYW1lOiBcIlN1c3BpY2lvdXMgVHJlbmNoIENvYXRcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiT25jZSBwZXIgY29tYmF0IGF0IEBQZXJjZW50SGVhbHRoVHJpZ2dlckAlIEhlYWx0aCwgdGhlIGhvbGRlciBzcGxpdHMgaW50byAzIGNvcGllcyBvZiB0aGVtc2VsZiBlYWNoIHdpdGggQFBlcmNlbnRIZWFsdGhPZkNvcGllc0AlIG9mIHRoZWlyIG1heCBIZWFsdGguW1VuaXF1ZSAtIG9ubHkgMSBwZXIgY2hhbXBpb25dXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fYXJ0aWZhY3Rfc3VzcGljaW91c3RyZW5jaGNvYXQudGV4XCIgfSxcbiAgeyBpZDogXCJ0YWxpc21hbi1vZi1hc2NlbnNpb25cIiwgYXBpTmFtZTogXCJEQV9JdGVtX0FydGlmYWN0X1RhbGlzbWFuT2ZBc2NlbnNpb25cIiwgbmFtZTogXCJUYWxpc21hbiBvZiBBc2NlbnNpb25cIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fYXJ0aWZhY3RfdGFsaXNtYW5vZmFzY2Vuc2lvbi50ZXhcIiB9LFxuICB7IGlkOiBcInRoZS1pbmRvbWl0YWJsZVwiLCBhcGlOYW1lOiBcIkRBX0FydGlmYWN0X1RoZUluZG9taXRhYmxlXCIsIG5hbWU6IFwiVGhlIEluZG9taXRhYmxlXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcImFydGlmYWN0XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX2FydGlmYWN0X3RoZWluZG9taXRhYmxlLnRleFwiIH0sXG4gIHsgaWQ6IFwidGl0YW5pYy1oeWRyYVwiLCBhcGlOYW1lOiBcIkRBX0FydGlmYWN0X1RpdGFuaWNIeWRyYVwiLCBuYW1lOiBcIlRpdGFuaWMgSHlkcmFcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fYXJ0aWZhY3RfdGl0YW5pY2h5ZHJhLnRleFwiIH0sXG4gIHsgaWQ6IFwidW5lbmRpbmctZGVzcGFpclwiLCBhcGlOYW1lOiBcIlRGVF9JdGVtX0FydGlmYWN0X1VuZW5kaW5nRGVzcGFpclwiLCBuYW1lOiBcIlVuZW5kaW5nIERlc3BhaXJcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiV2hlbmV2ZXIgYSBTaGllbGQgb24gdGhlIGhvbGRlciBicmVha3MsIEBQZXJjZW50RGFtYWdlQCUgb2YgdGhhdCBTaGllbGQncyBpbml0aWFsIHZhbHVlIGlzIGRlYWx0IHRvIHRoZSBuZWFyZXN0IGVuZW15IGFzIG1hZ2ljIGRhbWFnZS5cIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9hcnRpZmFjdF91bmVuZGluZ2Rlc3BhaXIudGV4XCIgfSxcbiAgeyBpZDogXCJ2b2lkLWdhdW50bGV0XCIsIGFwaU5hbWU6IFwiREFfQXJ0aWZhY3RfVm9pZEdhdW50bGV0XCIsIG5hbWU6IFwiVm9pZCBHYXVudGxldFwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJhcnRpZmFjdFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQxNl9hcnRpZmFjdF92b2lkZ2F1bnRsZXQudGV4XCIgfSxcbiAgeyBpZDogXCJ3aXRzLWVuZFwiLCBhcGlOYW1lOiBcIkRBX0FydGlmYWN0X1dpdHNFbmRcIiwgbmFtZTogXCJXaXQncyBFbmRcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiYXJ0aWZhY3RcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fYXJ0aWZhY3Rfd2l0c2VuZC50ZXhcIiB9LFxuICB7IGlkOiBcInpob255YXMtcGFyYWRveFwiLCBhcGlOYW1lOiBcIkRBX0FydGlmYWN0X1pob255YXNQYXJhZG94XCIsIG5hbWU6IFwiWmhvbnlhJ3MgUGFyYWRveFwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJhcnRpZmFjdFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ0X2l0ZW1fb3Jubnpob255YXNwYXJhZG94LnRleFwiIH0sXG4gIHsgaWQ6IFwiYmxhY2t0aG9ybi1lbWJsZW1cIiwgYXBpTmFtZTogXCJEQV8xOF9FbWJsZW1CbGFja3Rob3JuXCIsIG5hbWU6IFwiQmxhY2t0aG9ybiBFbWJsZW1cIiwgY29tcG9uZW50czogW1wic3BhdHVsYVwiLCBcImdpYW50cy1iZWx0XCJdLCB0eXBlOiBcImVtYmxlbVwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy9wYXJ0aWNsZXMvdGZ0L2l0ZW1faWNvbnMvdHJhaXRzL3NwYXR1bGEvc2V0MTgvdGZ0MThfZW1ibGVtX2JsYWNrdGhvcm4udGV4XCIgfSxcbiAgeyBpZDogXCJibG9zc29tLWVtYmxlbVwiLCBhcGlOYW1lOiBcIkRBXzE4X0VtYmxlbUJsb3Nzb21cIiwgbmFtZTogXCJCbG9zc29tIEVtYmxlbVwiLCBjb21wb25lbnRzOiBbXCJzcGF0dWxhXCIsIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIl0sIHR5cGU6IFwiZW1ibGVtXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3BhcnRpY2xlcy90ZnQvaXRlbV9pY29ucy90cmFpdHMvc3BhdHVsYS9zZXQxOC90ZnQxOF9lbWJsZW1fYmxvc3NvbS50ZXhcIiB9LFxuICB7IGlkOiBcImJyYXdsZXItZW1ibGVtXCIsIGFwaU5hbWU6IFwiREFfMThfRW1ibGVtQnJhd2xlclwiLCBuYW1lOiBcIkJyYXdsZXIgRW1ibGVtXCIsIGNvbXBvbmVudHM6IFtcImZyeWluZy1wYW5cIiwgXCJnaWFudHMtYmVsdFwiXSwgdHlwZTogXCJlbWJsZW1cIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvcGFydGljbGVzL3RmdC9pdGVtX2ljb25zL3RyYWl0cy9zcGF0dWxhL3NldDE4L3RmdDE4X2VtYmxlbV9icmF3bGVyLnRleFwiIH0sXG4gIHsgaWQ6IFwiY292ZW4tZW1ibGVtXCIsIGFwaU5hbWU6IFwiREFfMThfRW1ibGVtQ292ZW5cIiwgbmFtZTogXCJDb3ZlbiBFbWJsZW1cIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiZW1ibGVtXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3BhcnRpY2xlcy90ZnQvaXRlbV9pY29ucy90cmFpdHMvc3BhdHVsYS9zZXQxOC90ZnQxOF9lbWJsZW1fY292ZW4udGV4XCIgfSxcbiAgeyBpZDogXCJkZWZlbmRlci1lbWJsZW1cIiwgYXBpTmFtZTogXCJEQV8xOF9FbWJsZW1EZWZlbmRlclwiLCBuYW1lOiBcIkRlZmVuZGVyIEVtYmxlbVwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJlbWJsZW1cIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvcGFydGljbGVzL3RmdC9pdGVtX2ljb25zL3RyYWl0cy9zcGF0dWxhL3NldDE4L3RmdDE4X2VtYmxlbV9kZWZlbmRlci50ZXhcIiB9LFxuICB7IGlkOiBcImVsZGVyd29vZC1lbWJsZW1cIiwgYXBpTmFtZTogXCJEQV8xOF9FbWJsZW1FbGRlcndvb2RcIiwgbmFtZTogXCJFbGRlcndvb2QgRW1ibGVtXCIsIGNvbXBvbmVudHM6IFtcInNwYXR1bGFcIiwgXCJjaGFpbi12ZXN0XCJdLCB0eXBlOiBcImVtYmxlbVwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy9wYXJ0aWNsZXMvdGZ0L2l0ZW1faWNvbnMvdHJhaXRzL3NwYXR1bGEvc2V0MTgvdGZ0MThfZW1ibGVtX2VsZGVyd29vZC50ZXhcIiB9LFxuICB7IGlkOiBcImV4ZWN1dGlvbmVyLWVtYmxlbVwiLCBhcGlOYW1lOiBcIkRBXzE4X0VtYmxlbUV4ZWN1dGlvbmVyXCIsIG5hbWU6IFwiRXhlY3V0aW9uZXIgRW1ibGVtXCIsIGNvbXBvbmVudHM6IFtcImZyeWluZy1wYW5cIiwgXCJzcGFycmluZy1nbG92ZXNcIl0sIHR5cGU6IFwiZW1ibGVtXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3BhcnRpY2xlcy90ZnQvaXRlbV9pY29ucy90cmFpdHMvc3BhdHVsYS9zZXQxOC90ZnQxOF9lbWJsZW1fZXhlY3V0aW9uZXIudGV4XCIgfSxcbiAgeyBpZDogXCJmYWUtZW1ibGVtXCIsIGFwaU5hbWU6IFwiREFfMThfRW1ibGVtRmFlXCIsIG5hbWU6IFwiRmFlIEVtYmxlbVwiLCBjb21wb25lbnRzOiBbXCJzcGF0dWxhXCIsIFwiYmYtc3dvcmRcIl0sIHR5cGU6IFwiZW1ibGVtXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3BhcnRpY2xlcy90ZnQvaXRlbV9pY29ucy90cmFpdHMvc3BhdHVsYS9zZXQxOC90ZnQxOF9lbWJsZW1fZmFlLnRleFwiIH0sXG4gIHsgaWQ6IFwiZmxvcmEtZmF0YWxpcy1lbWJsZW1cIiwgYXBpTmFtZTogXCJEQV8xOF9FbWJsZW1GbG9yYUZhdGFsaXNcIiwgbmFtZTogXCJGbG9yYSBGYXRhbGlzIEVtYmxlbVwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJlbWJsZW1cIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvcGFydGljbGVzL3RmdC9pdGVtX2ljb25zL3RyYWl0cy9zcGF0dWxhL3NldDE4L3RmdDE4X2VtYmxlbV9mbG9yYWZhdGFsaXMudGV4XCIgfSxcbiAgeyBpZDogXCJodW50ZXItZW1ibGVtXCIsIGFwaU5hbWU6IFwiREFfMThfRW1ibGVtSHVudGVyXCIsIG5hbWU6IFwiSHVudGVyIEVtYmxlbVwiLCBjb21wb25lbnRzOiBbXCJmcnlpbmctcGFuXCIsIFwiYmYtc3dvcmRcIl0sIHR5cGU6IFwiZW1ibGVtXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3BhcnRpY2xlcy90ZnQvaXRlbV9pY29ucy90cmFpdHMvc3BhdHVsYS9zZXQxOC90ZnQxOF9lbWJsZW1faHVudGVyLnRleFwiIH0sXG4gIHsgaWQ6IFwiaW5mZXJuby1lbWJsZW1cIiwgYXBpTmFtZTogXCJEQV8xOF9FbWJsZW1JbmZlcm5vXCIsIG5hbWU6IFwiSW5mZXJubyBFbWJsZW1cIiwgY29tcG9uZW50czogW1wic3BhdHVsYVwiLCBcInJlY3VydmUtYm93XCJdLCB0eXBlOiBcImVtYmxlbVwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy9wYXJ0aWNsZXMvdGZ0L2l0ZW1faWNvbnMvdHJhaXRzL3NwYXR1bGEvc2V0MTgvdGZ0MThfZW1ibGVtX2luZmVybm8udGV4XCIgfSxcbiAgeyBpZDogXCJpbnZva2VyLWVtYmxlbVwiLCBhcGlOYW1lOiBcIkRBXzE4X0VtYmxlbUludm9rZXJcIiwgbmFtZTogXCJJbnZva2VyIEVtYmxlbVwiLCBjb21wb25lbnRzOiBbXCJmcnlpbmctcGFuXCIsIFwidGVhci1vZi10aGUtZ29kZGVzc1wiXSwgdHlwZTogXCJlbWJsZW1cIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvcGFydGljbGVzL3RmdC9pdGVtX2ljb25zL3RyYWl0cy9zcGF0dWxhL3NldDE4L3RmdDE4X2VtYmxlbV9pbnZva2VyLnRleFwiIH0sXG4gIHsgaWQ6IFwianVnZ2VybmF1dC1lbWJsZW1cIiwgYXBpTmFtZTogXCJEQV8xOF9FbWJsZW1KdWdnZXJuYXV0XCIsIG5hbWU6IFwiSnVnZ2VybmF1dCBFbWJsZW1cIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwiZW1ibGVtXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3BhcnRpY2xlcy90ZnQvaXRlbV9pY29ucy90cmFpdHMvc3BhdHVsYS9zZXQxOC90ZnQxOF9lbWJsZW1fanVnZ2VybmF1dC50ZXhcIiB9LFxuICB7IGlkOiBcImx1bmFyLWVtYmxlbVwiLCBhcGlOYW1lOiBcIkRBXzE4X0VtYmxlbUx1bmFyXCIsIG5hbWU6IFwiTHVuYXIgRW1ibGVtXCIsIGNvbXBvbmVudHM6IFtcInNwYXR1bGFcIiwgXCJ0ZWFyLW9mLXRoZS1nb2RkZXNzXCJdLCB0eXBlOiBcImVtYmxlbVwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy9wYXJ0aWNsZXMvdGZ0L2l0ZW1faWNvbnMvdHJhaXRzL3NwYXR1bGEvc2V0MTgvdGZ0MThfZW1ibGVtX2x1bmFyLnRleFwiIH0sXG4gIHsgaWQ6IFwicGhhbnRvbS1lbWJsZW1cIiwgYXBpTmFtZTogXCJEQV9QaGFudG9tRW1ibGVtMThcIiwgbmFtZTogXCJQaGFudG9tIEVtYmxlbVwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJlbWJsZW1cIiwgc3RhdHM6IFwiR2FpbiBhIHRlbXBvcmFyeSBlbWJsZW0gb2YgeW91ciBtb3N0IGFjdGl2ZSB0cmFpdC5cIiwgaWNvbjogXCJhc3NldHMvdXgvdGZ0L2h1ZC96YXBzL3dhbmRzL3NldDE4X21lY2hhbmljaWNvbi50ZXhcIiB9LFxuICB7IGlkOiBcInByaW1hbC1lbWJsZW1cIiwgYXBpTmFtZTogXCJEQV8xOF9FbWJsZW1QcmltYWxcIiwgbmFtZTogXCJQcmltYWwgRW1ibGVtXCIsIGNvbXBvbmVudHM6IFtcInNwYXR1bGFcIiwgXCJzcGFycmluZy1nbG92ZXNcIl0sIHR5cGU6IFwiZW1ibGVtXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3BhcnRpY2xlcy90ZnQvaXRlbV9pY29ucy90cmFpdHMvc3BhdHVsYS9zZXQxOC90ZnQxOF9lbWJsZW1fcHJpbWFsLnRleFwiIH0sXG4gIHsgaWQ6IFwicmFwaWRmaXJlLWVtYmxlbVwiLCBhcGlOYW1lOiBcIkRBXzE4X0VtYmxlbVJhcGlkZmlyZVwiLCBuYW1lOiBcIlJhcGlkZmlyZSBFbWJsZW1cIiwgY29tcG9uZW50czogW1wiZnJ5aW5nLXBhblwiLCBcInJlY3VydmUtYm93XCJdLCB0eXBlOiBcImVtYmxlbVwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy9wYXJ0aWNsZXMvdGZ0L2l0ZW1faWNvbnMvdHJhaXRzL3NwYXR1bGEvc2V0MTgvdGZ0MThfZW1ibGVtX3JhcGlkZmlyZS50ZXhcIiB9LFxuICB7IGlkOiBcInJhdmFnZXItZW1ibGVtXCIsIGFwaU5hbWU6IFwiREFfMThfRW1ibGVtU2xheWVyXCIsIG5hbWU6IFwiUmF2YWdlciBFbWJsZW1cIiwgY29tcG9uZW50czogW1wiZnJ5aW5nLXBhblwiLCBcIm5lZ2F0cm9uLWNsb2FrXCJdLCB0eXBlOiBcImVtYmxlbVwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy9wYXJ0aWNsZXMvdGZ0L2l0ZW1faWNvbnMvdHJhaXRzL3NwYXR1bGEvc2V0MTgvdGZ0MThfZW1ibGVtX3JhdmFnZXIudGV4XCIgfSxcbiAgeyBpZDogXCJzcGVsbHdlYXZlci1lbWJsZW1cIiwgYXBpTmFtZTogXCJEQV8xOF9FbWJsZW1TcGVsbHdlYXZlclwiLCBuYW1lOiBcIlNwZWxsd2VhdmVyIEVtYmxlbVwiLCBjb21wb25lbnRzOiBbXCJmcnlpbmctcGFuXCIsIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIl0sIHR5cGU6IFwiZW1ibGVtXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3BhcnRpY2xlcy90ZnQvaXRlbV9pY29ucy90cmFpdHMvc3BhdHVsYS9zZXQxOC90ZnQxOF9lbWJsZW1fc3BlbGx3ZWF2ZXIudGV4XCIgfSxcbiAgeyBpZDogXCJzcHJ5a2luLWVtYmxlbVwiLCBhcGlOYW1lOiBcIkRBXzE4X0VtYmxlbVNwcnlraW5cIiwgbmFtZTogXCJTcHJ5a2luIEVtYmxlbVwiLCBjb21wb25lbnRzOiBbXCJzcGF0dWxhXCIsIFwibmVnYXRyb24tY2xvYWtcIl0sIHR5cGU6IFwiZW1ibGVtXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3BhcnRpY2xlcy90ZnQvaXRlbV9pY29ucy90cmFpdHMvc3BhdHVsYS9zZXQxOC90ZnQxOF9lbWJsZW1fc3ByeWtpbi50ZXhcIiB9LFxuICB7IGlkOiBcInZhbmd1YXJkLWVtYmxlbVwiLCBhcGlOYW1lOiBcIkRBXzE4X0VtYmxlbVZhbmd1YXJkXCIsIG5hbWU6IFwiVmFuZ3VhcmQgRW1ibGVtXCIsIGNvbXBvbmVudHM6IFtcImZyeWluZy1wYW5cIiwgXCJjaGFpbi12ZXN0XCJdLCB0eXBlOiBcImVtYmxlbVwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy9wYXJ0aWNsZXMvdGZ0L2l0ZW1faWNvbnMvdHJhaXRzL3NwYXR1bGEvc2V0MTgvdGZ0MThfZW1ibGVtX3Zhbmd1YXJkLnRleFwiIH0sXG4gIHsgaWQ6IFwiYWRhcHRpdmUtaGVsbVwiLCBhcGlOYW1lOiBcIkRBX0FkYXB0aXZlSGVsbVwiLCBuYW1lOiBcIkFkYXB0aXZlIEhlbG1cIiwgY29tcG9uZW50czogW1widGVhci1vZi10aGUtZ29kZGVzc1wiLCBcIm5lZ2F0cm9uLWNsb2FrXCJdLCB0eXBlOiBcIm5vcm1hbFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9hZGFwdGl2ZWhlbG0udGV4XCIgfSxcbiAgeyBpZDogXCJhcmNoYW5nZWxzLXN0YWZmXCIsIGFwaU5hbWU6IFwiREFfQXJjaGFuZ2Vsc1N0YWZmXCIsIG5hbWU6IFwiQXJjaGFuZ2VsJ3MgU3RhZmZcIiwgY29tcG9uZW50czogW1wibmVlZGxlc3NseS1sYXJnZS1yb2RcIiwgXCJ0ZWFyLW9mLXRoZS1nb2RkZXNzXCJdLCB0eXBlOiBcIm5vcm1hbFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9hcmNoYW5nZWxzc3RhZmYudGV4XCIgfSxcbiAgeyBpZDogXCJibG9vZHRoaXJzdGVyXCIsIGFwaU5hbWU6IFwiREFfQmxvb2R0aGlyc3RlclwiLCBuYW1lOiBcIkJsb29kdGhpcnN0ZXJcIiwgY29tcG9uZW50czogW1wiYmYtc3dvcmRcIiwgXCJuZWdhdHJvbi1jbG9ha1wiXSwgdHlwZTogXCJub3JtYWxcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fYmxvb2R0aGlyc3Rlci50ZXhcIiB9LFxuICB7IGlkOiBcImJsdWUtYnVmZlwiLCBhcGlOYW1lOiBcIkRBX0JsdWVCdWZmXCIsIG5hbWU6IFwiQmx1ZSBCdWZmXCIsIGNvbXBvbmVudHM6IFtcInRlYXItb2YtdGhlLWdvZGRlc3NcIiwgXCJ0ZWFyLW9mLXRoZS1nb2RkZXNzXCJdLCB0eXBlOiBcIm5vcm1hbFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9ibHVlYnVmZi50ZXhcIiB9LFxuICB7IGlkOiBcImJyYW1ibGUtdmVzdFwiLCBhcGlOYW1lOiBcIkRBX0JyYW1ibGVWZXN0XCIsIG5hbWU6IFwiQnJhbWJsZSBWZXN0XCIsIGNvbXBvbmVudHM6IFtcImNoYWluLXZlc3RcIiwgXCJjaGFpbi12ZXN0XCJdLCB0eXBlOiBcIm5vcm1hbFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9icmFtYmxldmVzdC50ZXhcIiB9LFxuICB7IGlkOiBcImNyb3duZ3VhcmRcIiwgYXBpTmFtZTogXCJEQV9Dcm93bmd1YXJkXCIsIG5hbWU6IFwiQ3Jvd25ndWFyZFwiLCBjb21wb25lbnRzOiBbXCJuZWVkbGVzc2x5LWxhcmdlLXJvZFwiLCBcImNoYWluLXZlc3RcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX2Nyb3duZ3VhcmQudGV4XCIgfSxcbiAgeyBpZDogXCJkZWF0aGJsYWRlXCIsIGFwaU5hbWU6IFwiREFfRGVhdGhibGFkZVwiLCBuYW1lOiBcIkRlYXRoYmxhZGVcIiwgY29tcG9uZW50czogW1wiYmYtc3dvcmRcIiwgXCJiZi1zd29yZFwiXSwgdHlwZTogXCJub3JtYWxcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fZGVhdGhibGFkZS50ZXhcIiB9LFxuICB7IGlkOiBcImRyYWdvbnMtY2xhd1wiLCBhcGlOYW1lOiBcIkRBX0RyYWdvbnNDbGF3XCIsIG5hbWU6IFwiRHJhZ29uJ3MgQ2xhd1wiLCBjb21wb25lbnRzOiBbXCJuZWdhdHJvbi1jbG9ha1wiLCBcIm5lZ2F0cm9uLWNsb2FrXCJdLCB0eXBlOiBcIm5vcm1hbFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9kcmFnb25zY2xhdy50ZXhcIiB9LFxuICB7IGlkOiBcImVkZ2Utb2YtbmlnaHRcIiwgYXBpTmFtZTogXCJEQV9FZGdlT2ZOaWdodFwiLCBuYW1lOiBcIkVkZ2Ugb2YgTmlnaHRcIiwgY29tcG9uZW50czogW1wiYmYtc3dvcmRcIiwgXCJjaGFpbi12ZXN0XCJdLCB0eXBlOiBcIm5vcm1hbFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9ndWFyZGlhbmFuZ2VsLnRleFwiIH0sXG4gIHsgaWQ6IFwiZXZlbnNocm91ZFwiLCBhcGlOYW1lOiBcIkRBX0V2ZW5zaHJvdWRcIiwgbmFtZTogXCJFdmVuc2hyb3VkXCIsIGNvbXBvbmVudHM6IFtcIm5lZ2F0cm9uLWNsb2FrXCIsIFwiZ2lhbnRzLWJlbHRcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX3NwZWN0cmFsZ2F1bnRsZXQudGV4XCIgfSxcbiAgeyBpZDogXCJnYXJnb3lsZS1zdG9uZXBsYXRlXCIsIGFwaU5hbWU6IFwiREFfR2FyZ295bGVTdG9uZXBsYXRlXCIsIG5hbWU6IFwiR2FyZ295bGUgU3RvbmVwbGF0ZVwiLCBjb21wb25lbnRzOiBbXCJjaGFpbi12ZXN0XCIsIFwibmVnYXRyb24tY2xvYWtcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX2dhcmdveWxlc3RvbmVwbGF0ZS50ZXhcIiB9LFxuICB7IGlkOiBcImdpYW50LXNsYXllclwiLCBhcGlOYW1lOiBcIkRBX0dpYW50U2xheWVyXCIsIG5hbWU6IFwiR2lhbnQgU2xheWVyXCIsIGNvbXBvbmVudHM6IFtcInJlY3VydmUtYm93XCIsIFwiYmYtc3dvcmRcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX21hZHJlZHNibG9vZHJhem9yLnRleFwiIH0sXG4gIHsgaWQ6IFwiZ3VpbnNvb3MtcmFnZWJsYWRlXCIsIGFwaU5hbWU6IFwiREFfR3VpbnNvb3NSYWdlYmxhZGVcIiwgbmFtZTogXCJHdWluc29vJ3MgUmFnZWJsYWRlXCIsIGNvbXBvbmVudHM6IFtcInJlY3VydmUtYm93XCIsIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX2d1aW5zb29zcmFnZWJsYWRlLnRleFwiIH0sXG4gIHsgaWQ6IFwiaGFuZC1vZi1qdXN0aWNlXCIsIGFwaU5hbWU6IFwiREFfSGFuZE9mSnVzdGljZVwiLCBuYW1lOiBcIkhhbmQgT2YgSnVzdGljZVwiLCBjb21wb25lbnRzOiBbXCJ0ZWFyLW9mLXRoZS1nb2RkZXNzXCIsIFwic3BhcnJpbmctZ2xvdmVzXCJdLCB0eXBlOiBcIm5vcm1hbFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV91bnN0YWJsZWNvbmNvY3Rpb24udGV4XCIgfSxcbiAgeyBpZDogXCJoZXh0ZWNoLWd1bmJsYWRlXCIsIGFwaU5hbWU6IFwiREFfSGV4dGVjaEd1bmJsYWRlXCIsIG5hbWU6IFwiSGV4dGVjaCBHdW5ibGFkZVwiLCBjb21wb25lbnRzOiBbXCJiZi1zd29yZFwiLCBcIm5lZWRsZXNzbHktbGFyZ2Utcm9kXCJdLCB0eXBlOiBcIm5vcm1hbFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9oZXh0ZWNoZ3VuYmxhZGUudGV4XCIgfSxcbiAgeyBpZDogXCJpbmZpbml0eS1lZGdlXCIsIGFwaU5hbWU6IFwiREFfSW5maW5pdHlFZGdlXCIsIG5hbWU6IFwiSW5maW5pdHkgRWRnZVwiLCBjb21wb25lbnRzOiBbXCJiZi1zd29yZFwiLCBcInNwYXJyaW5nLWdsb3Zlc1wiXSwgdHlwZTogXCJub3JtYWxcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1faW5maW5pdHllZGdlLnRleFwiIH0sXG4gIHsgaWQ6IFwiaW9uaWMtc3BhcmtcIiwgYXBpTmFtZTogXCJEQV9Jb25pY1NwYXJrXCIsIG5hbWU6IFwiSW9uaWMgU3BhcmtcIiwgY29tcG9uZW50czogW1wibmVlZGxlc3NseS1sYXJnZS1yb2RcIiwgXCJuZWdhdHJvbi1jbG9ha1wiXSwgdHlwZTogXCJub3JtYWxcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1faW9uaWNzcGFyay50ZXhcIiB9LFxuICB7IGlkOiBcImpld2VsZWQtZ2F1bnRsZXRcIiwgYXBpTmFtZTogXCJEQV9KZXdlbGVkR2F1bnRsZXRcIiwgbmFtZTogXCJKZXdlbGVkIEdhdW50bGV0XCIsIGNvbXBvbmVudHM6IFtcInNwYXJyaW5nLWdsb3Zlc1wiLCBcIm5lZWRsZXNzbHktbGFyZ2Utcm9kXCJdLCB0eXBlOiBcIm5vcm1hbFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9qZXdlbGVkZ2F1bnRsZXQudGV4XCIgfSxcbiAgeyBpZDogXCJrcmFrZW5zLWZ1cnlcIiwgYXBpTmFtZTogXCJEQV9LcmFrZW5zRnVyeVwiLCBuYW1lOiBcIktyYWtlbidzIEZ1cnlcIiwgY29tcG9uZW50czogW1wicmVjdXJ2ZS1ib3dcIiwgXCJuZWdhdHJvbi1jbG9ha1wiXSwgdHlwZTogXCJub3JtYWxcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fa3Jha2Vuc2xheWVyLnRleFwiIH0sXG4gIHsgaWQ6IFwibGFzdC13aGlzcGVyXCIsIGFwaU5hbWU6IFwiREFfTGFzdFdoaXNwZXJcIiwgbmFtZTogXCJMYXN0IFdoaXNwZXJcIiwgY29tcG9uZW50czogW1wicmVjdXJ2ZS1ib3dcIiwgXCJzcGFycmluZy1nbG92ZXNcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX2xhc3R3aGlzcGVyLnRleFwiIH0sXG4gIHsgaWQ6IFwibW9yZWxsb25vbWljb25cIiwgYXBpTmFtZTogXCJEQV9Nb3JlbGxvbm9taWNvblwiLCBuYW1lOiBcIk1vcmVsbG9ub21pY29uXCIsIGNvbXBvbmVudHM6IFtcImdpYW50cy1iZWx0XCIsIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX21vcmVsbG9ub21pY29uLnRleFwiIH0sXG4gIHsgaWQ6IFwibmFzaG9ycy10b290aFwiLCBhcGlOYW1lOiBcIkRBX05hc2hvcnNUb290aFwiLCBuYW1lOiBcIk5hc2hvcidzIFRvb3RoXCIsIGNvbXBvbmVudHM6IFtcInJlY3VydmUtYm93XCIsIFwiZ2lhbnRzLWJlbHRcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX2xldmlhdGhhbi50ZXhcIiB9LFxuICB7IGlkOiBcInByb3RlY3RvcnMtdm93XCIsIGFwaU5hbWU6IFwiREFfUHJvdGVjdG9yc1Zvd1wiLCBuYW1lOiBcIlByb3RlY3RvcidzIFZvd1wiLCBjb21wb25lbnRzOiBbXCJjaGFpbi12ZXN0XCIsIFwidGVhci1vZi10aGUtZ29kZGVzc1wiXSwgdHlwZTogXCJub3JtYWxcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fZnJvemVuaGVhcnQudGV4XCIgfSxcbiAgeyBpZDogXCJxdWlja3NpbHZlclwiLCBhcGlOYW1lOiBcIkRBX1F1aWNrc2lsdmVyXCIsIG5hbWU6IFwiUXVpY2tzaWx2ZXJcIiwgY29tcG9uZW50czogW1wibmVnYXRyb24tY2xvYWtcIiwgXCJzcGFycmluZy1nbG92ZXNcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX3F1aWNrc2lsdmVyLnRleFwiIH0sXG4gIHsgaWQ6IFwicmFiYWRvbnMtZGVhdGhjYXBcIiwgYXBpTmFtZTogXCJEQV9SYWJhZG9uc0RlYXRoY2FwXCIsIG5hbWU6IFwiUmFiYWRvbidzIERlYXRoY2FwXCIsIGNvbXBvbmVudHM6IFtcIm5lZWRsZXNzbHktbGFyZ2Utcm9kXCIsIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX3JhYmFkb25zZGVhdGhjYXAudGV4XCIgfSxcbiAgeyBpZDogXCJyZWQtYnVmZlwiLCBhcGlOYW1lOiBcIkRBX1JlZEJ1ZmZcIiwgbmFtZTogXCJSZWQgQnVmZlwiLCBjb21wb25lbnRzOiBbXCJyZWN1cnZlLWJvd1wiLCBcInJlY3VydmUtYm93XCJdLCB0eXBlOiBcIm5vcm1hbFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9yYXBpZGZpcmVjYW5ub24udGV4XCIgfSxcbiAgeyBpZDogXCJzcGVhci1vZi1zaG9qaW5cIiwgYXBpTmFtZTogXCJEQV9TcGVhck9mU2hvamluXCIsIG5hbWU6IFwiU3BlYXIgb2YgU2hvamluXCIsIGNvbXBvbmVudHM6IFtcInRlYXItb2YtdGhlLWdvZGRlc3NcIiwgXCJiZi1zd29yZFwiXSwgdHlwZTogXCJub3JtYWxcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fc3BlYXJvZnNob2ppbi50ZXhcIiB9LFxuICB7IGlkOiBcInNwaXJpdC12aXNhZ2VcIiwgYXBpTmFtZTogXCJEQV9TcGlyaXRWaXNhZ2VcIiwgbmFtZTogXCJTcGlyaXQgVmlzYWdlXCIsIGNvbXBvbmVudHM6IFtcImdpYW50cy1iZWx0XCIsIFwidGVhci1vZi10aGUtZ29kZGVzc1wiXSwgdHlwZTogXCJub3JtYWxcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fc3Bpcml0dmlzYWdlcnIudGV4XCIgfSxcbiAgeyBpZDogXCJzdGVhZGZhc3QtaGVhcnRcIiwgYXBpTmFtZTogXCJEQV9TdGVhZGZhc3RIZWFydFwiLCBuYW1lOiBcIlN0ZWFkZmFzdCBIZWFydFwiLCBjb21wb25lbnRzOiBbXCJjaGFpbi12ZXN0XCIsIFwic3BhcnJpbmctZ2xvdmVzXCJdLCB0eXBlOiBcIm5vcm1hbFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9uaWdodGhhcnZlc3Rlci50ZXhcIiB9LFxuICB7IGlkOiBcInN0ZXJha3MtZ2FnZVwiLCBhcGlOYW1lOiBcIkRBX1N0ZXJha3NHYWdlXCIsIG5hbWU6IFwiU3RlcmFrJ3MgR2FnZVwiLCBjb21wb25lbnRzOiBbXCJiZi1zd29yZFwiLCBcImdpYW50cy1iZWx0XCJdLCB0eXBlOiBcIm5vcm1hbFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9zdGVyYWtzZ2FnZS50ZXhcIiB9LFxuICB7IGlkOiBcInN0cmlrZXJzLWZsYWlsXCIsIGFwaU5hbWU6IFwiREFfU3RyaWtlcnNGbGFpbFwiLCBuYW1lOiBcIlN0cmlrZXIncyBGbGFpbFwiLCBjb21wb25lbnRzOiBbXCJnaWFudHMtYmVsdFwiLCBcInNwYXJyaW5nLWdsb3Zlc1wiXSwgdHlwZTogXCJub3JtYWxcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fcG93ZXJnYXVudGxldC50ZXhcIiB9LFxuICB7IGlkOiBcInN1bmZpcmUtY2FwZVwiLCBhcGlOYW1lOiBcIkRBX1N1bmZpcmVDYXBlXCIsIG5hbWU6IFwiU3VuZmlyZSBDYXBlXCIsIGNvbXBvbmVudHM6IFtcImNoYWluLXZlc3RcIiwgXCJnaWFudHMtYmVsdFwiXSwgdHlwZTogXCJub3JtYWxcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fcmVkYnVmZi50ZXhcIiB9LFxuICB7IGlkOiBcInRhY3RpY2lhbnMtY2FwZVwiLCBhcGlOYW1lOiBcIkRBX1RhY3RpY2lhbnNDYXBlXCIsIG5hbWU6IFwiVGFjdGljaWFuJ3MgQ2FwZVwiLCBjb21wb25lbnRzOiBbXCJzcGF0dWxhXCIsIFwiZnJ5aW5nLXBhblwiXSwgdHlwZTogXCJub3JtYWxcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fdGFjdGljaWFuc3JpbmcudGV4XCIgfSxcbiAgeyBpZDogXCJ0YWN0aWNpYW5zLWNyb3duXCIsIGFwaU5hbWU6IFwiREFfVGFjdGljaWFuc0Nyb3duXCIsIG5hbWU6IFwiVGFjdGljaWFucyBDcm93blwiLCBjb21wb25lbnRzOiBbXCJzcGF0dWxhXCIsIFwic3BhdHVsYVwiXSwgdHlwZTogXCJub3JtYWxcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0X2l0ZW1fZm9yY2VvZm5hdHVyZS50ZXhcIiB9LFxuICB7IGlkOiBcInRhY3RpY2lhbnMtc2hpZWxkXCIsIGFwaU5hbWU6IFwiREFfVGFjdGljaWFuc1NoaWVsZFwiLCBuYW1lOiBcIlRhY3RpY2lhbnMgU2hpZWxkXCIsIGNvbXBvbmVudHM6IFtcImZyeWluZy1wYW5cIiwgXCJmcnlpbmctcGFuXCJdLCB0eXBlOiBcIm5vcm1hbFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV90YWN0aWNpYW5zc2NlcHRlci50ZXhcIiB9LFxuICB7IGlkOiBcInRoaWVmcy1nbG92ZXNcIiwgYXBpTmFtZTogXCJEQV9UaGllZnNHbG92ZXNcIiwgbmFtZTogXCJUaGllZidzIEdsb3Zlc1wiLCBjb21wb25lbnRzOiBbXCJzcGFycmluZy1nbG92ZXNcIiwgXCJzcGFycmluZy1nbG92ZXNcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX3RoaWVmc2dsb3Zlcy50ZXhcIiB9LFxuICB7IGlkOiBcInRpdGFucy1yZXNvbHZlXCIsIGFwaU5hbWU6IFwiREFfVGl0YW5zUmVzb2x2ZVwiLCBuYW1lOiBcIlRpdGFuJ3MgUmVzb2x2ZVwiLCBjb21wb25lbnRzOiBbXCJyZWN1cnZlLWJvd1wiLCBcImNoYWluLXZlc3RcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX3RpdGFuc3Jlc29sdmUudGV4XCIgfSxcbiAgeyBpZDogXCJ2b2lkLXN0YWZmXCIsIGFwaU5hbWU6IFwiREFfVm9pZFN0YWZmXCIsIG5hbWU6IFwiVm9pZCBTdGFmZlwiLCBjb21wb25lbnRzOiBbXCJyZWN1cnZlLWJvd1wiLCBcInRlYXItb2YtdGhlLWdvZGRlc3NcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX3ZvaWRzdGFmZi50ZXhcIiB9LFxuICB7IGlkOiBcIndhcm1vZ3MtYXJtb3JcIiwgYXBpTmFtZTogXCJEQV9XYXJtb2dzQXJtb3JcIiwgbmFtZTogXCJXYXJtb2dzIEFybW9yXCIsIGNvbXBvbmVudHM6IFtcImdpYW50cy1iZWx0XCIsIFwiZ2lhbnRzLWJlbHRcIl0sIHR5cGU6IFwibm9ybWFsXCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdF9pdGVtX3dhcm1vZ3Nhcm1vci50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtYWRhcHRpdmUtaGVsbVwiLCBhcGlOYW1lOiBcIkRBX0FkYXB0aXZlSGVsbV9SYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBBZGFwdGl2ZSBIZWxtXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcInJhZGlhbnRcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0NV9pdGVtX2FkYXB0aXZlaGVsbXJhZGlhbnQudGV4XCIgfSxcbiAgeyBpZDogXCJyYWRpYW50LWFyY2hhbmdlbHMtc3RhZmZcIiwgYXBpTmFtZTogXCJEQV9BcmNoYW5nZWxzU3RhZmZSYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBBcmNoYW5nZWwncyBTdGFmZlwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJyYWRpYW50XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdDVfaXRlbV9hcmNoYW5nZWxzc3RhZmZyYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC1ibG9vZHRoaXJzdGVyXCIsIGFwaU5hbWU6IFwiREFfQmxvb2R0aGlyc3RlclJhZGlhbnRcIiwgbmFtZTogXCJSYWRpYW50IEJsb29kdGhpcnN0ZXJcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1fYmxvb2R0aGlyc3RlcnJhZGlhbnQudGV4XCIgfSxcbiAgeyBpZDogXCJyYWRpYW50LWJsdWUtYnVmZlwiLCBhcGlOYW1lOiBcIkRBX0JsdWVCdWZmUmFkaWFudFwiLCBuYW1lOiBcIlJhZGlhbnQgQmx1ZSBCdWZmXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcInJhZGlhbnRcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0NV9pdGVtX2JsdWVidWZmcmFkaWFudC50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtYnJhbWJsZS12ZXN0XCIsIGFwaU5hbWU6IFwiREFfQnJhbWJsZVZlc3RSYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBCcmFtYmxlIFZlc3RcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1fYnJhbWJsZXZlc3RyYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC1jcm93bmd1YXJkXCIsIGFwaU5hbWU6IFwiREFfQ3Jvd25ndWFyZFJhZGlhbnRcIiwgbmFtZTogXCJSYWRpYW50IENyb3duZ3VhcmRcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1fY3Jvd25ndWFyZHJhZGlhbnQudGV4XCIgfSxcbiAgeyBpZDogXCJyYWRpYW50LWRlYXRoYmxhZGVcIiwgYXBpTmFtZTogXCJEQV9EZWF0aGJsYWRlUmFkaWFudFwiLCBuYW1lOiBcIlJhZGlhbnQgRGVhdGhibGFkZVwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJyYWRpYW50XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdDVfaXRlbV9kZWF0aGJsYWRlcmFkaWFudC50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtZHJhZ29ucy1jbGF3XCIsIGFwaU5hbWU6IFwiREFfRHJhZ29uc0NsYXdSYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBEcmFnb24ncyBDbGF3XCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcInJhZGlhbnRcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0NV9pdGVtX2RyYWdvbnNjbGF3cmFkaWFudC50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtZWRnZS1vZi1uaWdodFwiLCBhcGlOYW1lOiBcIkRBX0VkZ2VPZk5pZ2h0UmFkaWFudFwiLCBuYW1lOiBcIlJhZGlhbnQgRWRnZSBvZiBOaWdodFwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJyYWRpYW50XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdDVfaXRlbV9ndWFyZGlhbmFuZ2VscmFkaWFudC50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtZXZlbnNocm91ZFwiLCBhcGlOYW1lOiBcIkRBX0V2ZW5zaHJvdWRSYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBFdmVuc2hyb3VkXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcInJhZGlhbnRcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0NV9pdGVtX3NwZWN0cmFsZ2F1bnRsZXRyYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC1nYXJnb3lsZS1zdG9uZXBsYXRlXCIsIGFwaU5hbWU6IFwiREFfR2FyZ295bGVTdG9uZXBsYXRlX1JhZGlhbnRcIiwgbmFtZTogXCJSYWRpYW50IEdhcmdveWxlIFN0b25lcGxhdGVcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1fZ2FyZ295bGVzdG9uZXBsYXRlcmFkaWFudC50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtZ2lhbnQtc2xheWVyXCIsIGFwaU5hbWU6IFwiREFfR2lhbnRTbGF5ZXJfUmFkaWFudFwiLCBuYW1lOiBcIlJhZGlhbnQgR2lhbnQgU2xheWVyXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcInJhZGlhbnRcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0NV9pdGVtX2dpYW50c2xheWVycmFkaWFudC50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtZ3VpbnNvb3MtcmFnZWJsYWRlXCIsIGFwaU5hbWU6IFwiREFfR3VpbnNvb3NSYWdlYmxhZGVSYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBHdWluc29vJ3MgUmFnZWJsYWRlXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcInJhZGlhbnRcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0NV9pdGVtX2d1aW5zb29zcmFnZWJsYWRlcmFkaWFudC50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtaGFuZC1vZi1qdXN0aWNlXCIsIGFwaU5hbWU6IFwiREFfSGFuZE9mSnVzdGljZVJhZGlhbnRcIiwgbmFtZTogXCJSYWRpYW50IEhhbmQgb2YgSnVzdGljZVwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJyYWRpYW50XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdDVfaXRlbV9oYW5kb2ZqdXN0aWNlcmFkaWFudC50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtaGV4dGVjaC1ndW5ibGFkZVwiLCBhcGlOYW1lOiBcIkRBX0hleHRlY2hHdW5ibGFkZVJhZGlhbnRcIiwgbmFtZTogXCJSYWRpYW50IEhleHRlY2ggR3VuYmxhZGVcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1faGV4dGVjaGd1bmJsYWRlcmFkaWFudC50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtaW5maW5pdHktZWRnZVwiLCBhcGlOYW1lOiBcIkRBX0luZmluaXR5RWRnZVJhZGlhbnRcIiwgbmFtZTogXCJSYWRpYW50IEluZmluaXR5IEVkZ2VcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1faW5maW5pdHllZGdlcmFkaWFudC50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtaW9uaWMtc3BhcmtcIiwgYXBpTmFtZTogXCJEQV9Jb25pY1NwYXJrUmFkaWFudFwiLCBuYW1lOiBcIlJhZGlhbnQgSW9uaWMgU3BhcmtcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1faW9uaWNzcGFya3JhZGlhbnQudGV4XCIgfSxcbiAgeyBpZDogXCJyYWRpYW50LWpld2VsZWQtZ2F1bnRsZXRcIiwgYXBpTmFtZTogXCJEQV9KZXdlbGVkR2F1bnRsZXRSYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBKZXdlbGVkIEdhdW50bGV0XCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcInJhZGlhbnRcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0NV9pdGVtX2pld2VsZWRnYXVudGxldHJhZGlhbnQudGV4XCIgfSxcbiAgeyBpZDogXCJyYWRpYW50LWtyYWtlbnMtZnVyeVwiLCBhcGlOYW1lOiBcIkRBX0tyYWtlbnNGdXJ5X1JhZGlhbnRcIiwgbmFtZTogXCJSYWRpYW50IEtyYWtlbidzIEZ1cnlcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9rcmFrZW5zbGF5ZXJyYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC1sYXN0LXdoaXNwZXJcIiwgYXBpTmFtZTogXCJEQV9MYXN0V2hpc3BlclJhZGlhbnRcIiwgbmFtZTogXCJSYWRpYW50IExhc3QgV2hpc3BlclwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJyYWRpYW50XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdDVfaXRlbV9sYXN0d2hpc3BlcnJhZGlhbnQudGV4XCIgfSxcbiAgeyBpZDogXCJyYWRpYW50LW1vcmVsbG9ub21pY29uXCIsIGFwaU5hbWU6IFwiREFfTW9yZWxsb25vbWljb25SYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBNb3JlbGxvbm9taWNvblwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJyYWRpYW50XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdDVfaXRlbV9tb3JlbGxvbm9taWNvbnJhZGlhbnQudGV4XCIgfSxcbiAgeyBpZDogXCJyYWRpYW50LW5hc2hvcnMtdG9vdGhcIiwgYXBpTmFtZTogXCJEQV9OYXNob3JzVG9vdGhSYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBOYXNob3IncyBUb290aFwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJyYWRpYW50XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdDVfaXRlbV9sZXZpYXRoYW5yYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC1wcm90ZWN0b3JzLXZvd1wiLCBhcGlOYW1lOiBcIkRBX1Byb3RlY3RvcnNWb3dSYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBQcm90ZWN0b3IncyBWb3dcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1fZnJvemVuaGVhcnRyYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC1xdWlja3NpbHZlclwiLCBhcGlOYW1lOiBcIkRBX1F1aWNrc2lsdmVyUmFkaWFudFwiLCBuYW1lOiBcIlJhZGlhbnQgUXVpY2tzaWx2ZXJcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1fcXVpY2tzaWx2ZXJyYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC1yYWJhZG9ucy1kZWF0aGNhcFwiLCBhcGlOYW1lOiBcIkRBX1JhYmFkb25zRGVhdGhjYXBfUmFkaWFudFwiLCBuYW1lOiBcIlJhZGlhbnQgUmFiYWRvbidzIERlYXRoY2FwXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcInJhZGlhbnRcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0NV9pdGVtX3JhYmFkb25zZGVhdGhjYXByYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC1yZWQtYnVmZlwiLCBhcGlOYW1lOiBcIkRBX1JlZEJ1ZmZSYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBSZWQgQnVmZlwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJyYWRpYW50XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdDVfaXRlbV9yYXBpZGZpcmVjYW5ub25yYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC1zcGVhci1vZi1zaG9qaW5cIiwgYXBpTmFtZTogXCJEQV9TcGVhck9mU2hvamluUmFkaWFudFwiLCBuYW1lOiBcIlJhZGlhbnQgU3BlYXIgb2YgU2hvamluXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcInJhZGlhbnRcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0NV9pdGVtX3NwZWFyb2ZzaG9qaW5yYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC1zcGlyaXQtdmlzYWdlXCIsIGFwaU5hbWU6IFwiREFfU3Bpcml0VmlzYWdlX1JhZGlhbnRcIiwgbmFtZTogXCJSYWRpYW50IFNwaXJpdCBWaXNhZ2VcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnRfaXRlbV9zcGlyaXR2aXNhZ2Vyci50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtc3RlYWRmYXN0LWhlYXJ0XCIsIGFwaU5hbWU6IFwiREFfU3RlYWRmYXN0SGVhcnRSYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBTdGVhZGZhc3QgSGVhcnRcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1fbmlnaHRoYXJ2ZXN0ZXJyYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC1zdGVyYWtzLWdhZ2VcIiwgYXBpTmFtZTogXCJEQV9TdGVyYWtzR2FnZVJhZGlhbnRcIiwgbmFtZTogXCJSYWRpYW50IFN0ZXJhaydzIEdhZ2VcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1fc3RlcmFrc2dhZ2VyYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC1zdHJpa2Vycy1mbGFpbFwiLCBhcGlOYW1lOiBcIkRBX1N0cmlrZXJzRmxhaWxSYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBTdHJpa2VyJ3MgRmxhaWxcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1fdHJhcGNsYXdyYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC1zdW5maXJlLWNhcGVcIiwgYXBpTmFtZTogXCJEQV9TdW5maXJlQ2FwZV9SYWRpYW50XCIsIG5hbWU6IFwiUmFkaWFudCBTdW5maXJlIENhcGVcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1fc3VuZmlyZWNhcGVyYWRpYW50LnRleFwiIH0sXG4gIHsgaWQ6IFwicmFkaWFudC10aGllZnMtZ2xvdmVzXCIsIGFwaU5hbWU6IFwiREFfVGhpZWZzR2xvdmVzUmFkaWFudFwiLCBuYW1lOiBcIlJhZGlhbnQgVGhpZWYncyBHbG92ZXNcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1fdGhpZWZzZ2xvdmVzcmFkaWFudC50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtdGl0YW5zLXJlc29sdmVcIiwgYXBpTmFtZTogXCJEQV9UaXRhbnNSZXNvbHZlX1JhZGlhbnRcIiwgbmFtZTogXCJSYWRpYW50IFRpdGFuJ3MgUmVzb2x2ZVwiLCBjb21wb25lbnRzOiBbXSwgdHlwZTogXCJyYWRpYW50XCIsIHN0YXRzOiBcIlwiLCBpY29uOiBcImFzc2V0cy9tYXBzL3RmdC9pY29ucy9pdGVtcy9oZXhjb3JlL3RmdDVfaXRlbV90aXRhbnNyZXNvbHZlcmFkaWFudC50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtdm9pZC1zdGFmZlwiLCBhcGlOYW1lOiBcIkRBX1ZvaWRTdGFmZlJhZGlhbnRcIiwgbmFtZTogXCJSYWRpYW50IFZvaWQgU3RhZmZcIiwgY29tcG9uZW50czogW10sIHR5cGU6IFwicmFkaWFudFwiLCBzdGF0czogXCJcIiwgaWNvbjogXCJhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZS90ZnQ1X2l0ZW1fdm9pZHN0YWZmcmFkaWFudC50ZXhcIiB9LFxuICB7IGlkOiBcInJhZGlhbnQtd2FybW9ncy1hcm1vclwiLCBhcGlOYW1lOiBcIkRBX1dhcm1vZ3NBcm1vclJhZGlhbnRcIiwgbmFtZTogXCJSYWRpYW50IFdhcm1vZydzIEFybW9yXCIsIGNvbXBvbmVudHM6IFtdLCB0eXBlOiBcInJhZGlhbnRcIiwgc3RhdHM6IFwiXCIsIGljb246IFwiYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvdGZ0NV9pdGVtX3dhcm1vZ3Nhcm1vcnJhZGlhbnQudGV4XCIgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBpdGVtTWFwID0gbmV3IE1hcChpdGVtcy5tYXAoaSA9PiBbaS5pZCwgaV0pKTtcbmV4cG9ydCBjb25zdCBpdGVtQnlBcGlOYW1lID0gbmV3IE1hcChpdGVtcy5maWx0ZXIoaSA9PiBpLmFwaU5hbWUpLm1hcChpID0+IFtpLmFwaU5hbWUhLCBpXSkpO1xuIiwiLy8gQXV0aFNlcnZpY2Ug4oCUIHRoaW4gY2xpZW50IGZvciB0aGUgQ2xvdWRmbGFyZSBXb3JrZXIgL2F1dGggZW5kcG9pbnRzLlxuLy9cbi8vIFRva2VuIGlzIGtlcHQgaW4gbG9jYWxTdG9yYWdlLiBDb21wb25lbnRzIHRoYXQgY2FyZSBhYm91dCBsb2dpbiBzdGF0ZSBjYW5cbi8vIGVpdGhlciBjYWxsIGdldEN1cnJlbnRVc2VyKCkgb25jZSBvbiBtb3VudCwgb3Igc3Vic2NyaWJlIHZpYSBvbkNoYW5nZSgpLlxuXG5pbXBvcnQgeyBrUmlvdEFwaUJhc2VVcmwgfSBmcm9tICcuLi9jb25zdHMnO1xuXG5leHBvcnQgdHlwZSBVc2VyUm9sZSA9ICd1c2VyJyB8ICdtb2RlcmF0b3InIHwgJ2FkbWluJztcblxuZXhwb3J0IGludGVyZmFjZSBVc2VyIHtcbiAgaWQ6IG51bWJlcjtcbiAgZW1haWw6IHN0cmluZztcbiAgcm9sZTogVXNlclJvbGU7XG4gIGRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsO1xufVxuXG5pbnRlcmZhY2UgQXV0aFJlc3BvbnNlIHtcbiAgdG9rZW46IHN0cmluZztcbiAgdXNlcjogVXNlcjtcbn1cblxuY29uc3QgU1RPUkFHRV9UT0tFTiA9ICdwaXZvdHRmdF9hdXRoX3Rva2VuJztcbmNvbnN0IFNUT1JBR0VfVVNFUiA9ICdwaXZvdHRmdF9hdXRoX3VzZXInO1xuXG50eXBlIExpc3RlbmVyID0gKHVzZXI6IFVzZXIgfCBudWxsKSA9PiB2b2lkO1xuY29uc3QgbGlzdGVuZXJzID0gbmV3IFNldDxMaXN0ZW5lcj4oKTtcblxuZnVuY3Rpb24gZW1pdCgpOiB2b2lkIHtcbiAgY29uc3QgdXNlciA9IGdldFN0b3JlZFVzZXIoKTtcbiAgbGlzdGVuZXJzLmZvckVhY2gobCA9PiB7XG4gICAgdHJ5IHsgbCh1c2VyKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKCdbQXV0aFNlcnZpY2VdIGxpc3RlbmVyIHRocmV3OicsIGUpOyB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9rZW4oKTogc3RyaW5nIHwgbnVsbCB7XG4gIHRyeSB7IHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX1RPS0VOKTsgfSBjYXRjaCB7IHJldHVybiBudWxsOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdG9yZWRVc2VyKCk6IFVzZXIgfCBudWxsIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX1VTRVIpO1xuICAgIHJldHVybiByYXcgPyBKU09OLnBhcnNlKHJhdykgYXMgVXNlciA6IG51bGw7XG4gIH0gY2F0Y2ggeyByZXR1cm4gbnVsbDsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gISFnZXRUb2tlbigpICYmICEhZ2V0U3RvcmVkVXNlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBZG1pbigpOiBib29sZWFuIHtcbiAgY29uc3QgdSA9IGdldFN0b3JlZFVzZXIoKTtcbiAgcmV0dXJuICEhdSAmJiB1LnJvbGUgPT09ICdhZG1pbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNBdExlYXN0KHJvbGU6IFVzZXJSb2xlKTogYm9vbGVhbiB7XG4gIGNvbnN0IHUgPSBnZXRTdG9yZWRVc2VyKCk7XG4gIGlmICghdSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCByYW5rOiBSZWNvcmQ8VXNlclJvbGUsIG51bWJlcj4gPSB7IHVzZXI6IDEsIG1vZGVyYXRvcjogMiwgYWRtaW46IDMgfTtcbiAgcmV0dXJuIHJhbmtbdS5yb2xlXSA+PSByYW5rW3JvbGVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25DaGFuZ2UobGlzdGVuZXI6IExpc3RlbmVyKTogKCkgPT4gdm9pZCB7XG4gIGxpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xuICByZXR1cm4gKCkgPT4gbGlzdGVuZXJzLmRlbGV0ZShsaXN0ZW5lcik7XG59XG5cbmZ1bmN0aW9uIHNldFNlc3Npb24ocmVzOiBBdXRoUmVzcG9uc2UpOiB2b2lkIHtcbiAgdHJ5IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX1RPS0VOLCByZXMudG9rZW4pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfVVNFUiwgSlNPTi5zdHJpbmdpZnkocmVzLnVzZXIpKTtcbiAgfSBjYXRjaCB7IC8qIHF1b3RhIGV0YyDigJQgc2lsZW50ICovIH1cbiAgZW1pdCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTZXNzaW9uKCk6IHZvaWQge1xuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFNUT1JBR0VfVE9LRU4pO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFNUT1JBR0VfVVNFUik7XG4gIH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxuICBlbWl0KCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3RKc29uPFQ+KHBhdGg6IHN0cmluZywgYm9keTogdW5rbm93bik6IFByb21pc2U8VD4ge1xuICBjb25zdCB1cmwgPSBgJHtrUmlvdEFwaUJhc2VVcmx9JHtwYXRofWA7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICB9KTtcbiAgbGV0IHBheWxvYWQ6IGFueTtcbiAgdHJ5IHsgcGF5bG9hZCA9IGF3YWl0IHJlcy5qc29uKCk7IH0gY2F0Y2ggeyBwYXlsb2FkID0geyBlcnJvcjogcmVzLnN0YXR1c1RleHQgfTsgfVxuICBpZiAoIXJlcy5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkPy5lcnJvciB8fCBgSFRUUCAke3Jlcy5zdGF0dXN9YCk7XG4gIH1cbiAgcmV0dXJuIHBheWxvYWQgYXMgVDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0SnNvbjxUPihwYXRoOiBzdHJpbmcsIHRva2VuPzogc3RyaW5nIHwgbnVsbCk6IFByb21pc2U8VD4ge1xuICBjb25zdCB1cmwgPSBgJHtrUmlvdEFwaUJhc2VVcmx9JHtwYXRofWA7XG4gIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgaWYgKHRva2VuKSBoZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBgQmVhcmVyICR7dG9rZW59YDtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7IGhlYWRlcnMgfSk7XG4gIGxldCBwYXlsb2FkOiBhbnk7XG4gIHRyeSB7IHBheWxvYWQgPSBhd2FpdCByZXMuanNvbigpOyB9IGNhdGNoIHsgcGF5bG9hZCA9IHsgZXJyb3I6IHJlcy5zdGF0dXNUZXh0IH07IH1cbiAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcihwYXlsb2FkPy5lcnJvciB8fCBgSFRUUCAke3Jlcy5zdGF0dXN9YCk7XG4gIHJldHVybiBwYXlsb2FkIGFzIFQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWdpc3RlcihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBkaXNwbGF5TmFtZT86IHN0cmluZyk6IFByb21pc2U8VXNlcj4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBwb3N0SnNvbjxBdXRoUmVzcG9uc2U+KCcvYXV0aC9yZWdpc3RlcicsIHsgZW1haWwsIHBhc3N3b3JkLCBkaXNwbGF5TmFtZSB9KTtcbiAgc2V0U2Vzc2lvbihyZXMpO1xuICByZXR1cm4gcmVzLnVzZXI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpbihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyPiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHBvc3RKc29uPEF1dGhSZXNwb25zZT4oJy9hdXRoL2xvZ2luJywgeyBlbWFpbCwgcGFzc3dvcmQgfSk7XG4gIHNldFNlc3Npb24ocmVzKTtcbiAgcmV0dXJuIHJlcy51c2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9nb3V0KCk6IHZvaWQge1xuICBjbGVhclNlc3Npb24oKTtcbn1cblxuLyoqXG4gKiBSZWZyZXNoIHVzZXIgaW5mbyBmcm9tIGJhY2tlbmQuIFVzZWZ1bCBhZnRlciByb2xlIGNoYW5nZXMgb3IgdG8gY29uZmlybVxuICogdG9rZW4gdmFsaWRpdHkuIENsZWFycyBzZXNzaW9uIG9uIDQwMS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hNZSgpOiBQcm9taXNlPFVzZXIgfCBudWxsPiB7XG4gIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0SnNvbjx7IHVzZXI6IFVzZXIgfT4oJy9hdXRoL21lJywgdG9rZW4pO1xuICAgIHRyeSB7IGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfVVNFUiwgSlNPTi5zdHJpbmdpZnkocmVzLnVzZXIpKTsgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XG4gICAgZW1pdCgpO1xuICAgIHJldHVybiByZXMudXNlcjtcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgaWYgKChlLm1lc3NhZ2UgfHwgJycpLmluY2x1ZGVzKCdIVFRQIDQwMScpKSBjbGVhclNlc3Npb24oKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBmb3IgYWRtaW4tb25seSBmZXRjaGVzIOKAlCBhdXRvbWF0aWNhbGx5IGF0dGFjaGVzIEJlYXJlciB0b2tlbi5cbiAqIFRocm93cyBpZiBub3QgbG9nZ2VkIGluLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRtaW5GZXRjaDxUPihwYXRoOiBzdHJpbmcsIGluaXQ6IFJlcXVlc3RJbml0ID0ge30pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3QgdG9rZW4gPSBnZXRUb2tlbigpO1xuICBpZiAoIXRva2VuKSB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhdXRoZW50aWNhdGVkJyk7XG4gIGNvbnN0IHVybCA9IGAke2tSaW90QXBpQmFzZVVybH0ke3BhdGh9YDtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgLi4uaW5pdCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAuLi4oaW5pdC5oZWFkZXJzIHx8IHt9KSxcbiAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAuLi4oaW5pdC5ib2R5ID8geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0gOiB7fSksXG4gICAgfSxcbiAgfSk7XG4gIGxldCBwYXlsb2FkOiBhbnk7XG4gIHRyeSB7IHBheWxvYWQgPSBhd2FpdCByZXMuanNvbigpOyB9IGNhdGNoIHsgcGF5bG9hZCA9IHsgZXJyb3I6IHJlcy5zdGF0dXNUZXh0IH07IH1cbiAgaWYgKCFyZXMub2spIHtcbiAgICBpZiAocmVzLnN0YXR1cyA9PT0gNDAxKSBjbGVhclNlc3Npb24oKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZD8uZXJyb3IgfHwgYEhUVFAgJHtyZXMuc3RhdHVzfWApO1xuICB9XG4gIHJldHVybiBwYXlsb2FkIGFzIFQ7XG59XG4iLCIvLyBDb21wc1NlcnZpY2Ug4oCUIHRoZSBjb21wcyBhbmQgdGhlIGVkaXRpb24gcmVjb3JkLCBmcm9tIHRoZSBBUEkgZmlyc3Rcbi8vIChjdXJhdGVkIGluIHRoZSBhZG1pbiBlZGl0b3IpLCB0aGVuIHRoZSBsb2NhbFN0b3JhZ2UgY2FjaGUsIHRoZW4gdGhlXG4vLyBidW5kbGVkIHNlZWQgKG9mZmxpbmUgZmFsbGJhY2ssIHdyaXR0ZW4gYnkgc2NyaXB0cy9leHBvcnQtY29tcHMubWpzKS5cbi8vIFVzZWQgYnkgRmVhdHVyZVJlbmRlcmVyIChkZXNrdG9wIGluZGV4KSwgQ29tcFZpZXdlclJlbmRlcmVyIChpbi1nYW1lKSBhbmRcbi8vIHRoZSBhZG1pbiBlZGl0b3IuXG5cbmltcG9ydCB7IENvbXAgfSBmcm9tICcuLi9tb2RlbHMvdHlwZXMnO1xuaW1wb3J0IHsgc2VlZENvbXBzIH0gZnJvbSAnLi4vZGF0YS9zZXQxOC9jb21wcyc7XG5pbXBvcnQgeyBrUmlvdEFwaUJhc2VVcmwsIGtDdXJyZW50VGZ0U2V0TnVtYmVyLCBrQ3VycmVudFRmdFBhdGNoIH0gZnJvbSAnLi4vY29uc3RzJztcbmltcG9ydCB7IGFkbWluRmV0Y2ggfSBmcm9tICcuL0F1dGhTZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBFZGl0aW9uIHtcbiAgc2V0TnVtYmVyOiBudW1iZXI7XG4gIHBhdGNoOiBzdHJpbmc7XG4gIHNldE5hbWU/OiBzdHJpbmc7XG4gIHVwZGF0ZWRBdDogbnVtYmVyOyAgIC8vIHVuaXggc2Vjb25kczsgMCB3aGVuIHVua25vd25cbn1cblxuLy8gQnVtcGVkIGZyb20gX3YxIHdoZW4gdGhlIGJvb2sgbW92ZWQgdG8gU2V0IDE4IHNvIG5vIHN0YWxlIGNvbXBzIHN1cnZpdmUuXG5leHBvcnQgY29uc3QgQ09NUFNfQ0FDSEVfS0VZID0gJ3Bpdm90dGZ0X2NvbXBzX2NhY2hlX3YyJztcbmNvbnN0IExFR0FDWV9DQUNIRV9LRVlTID0gWydwaXZvdHRmdF9jb21wc19jYWNoZV92MSddO1xuY29uc3QgQ0FDSEVfVFRMX01TID0gNSAqIDYwICogMTAwMDsgIC8vIHRoZSBBUEkgYW5zd2VyIGl0c2VsZiBpcyBjYWNoZWQgZm9yIDYwIHNcblxuaW50ZXJmYWNlIENvbXBzQ2FjaGUge1xuICBmZXRjaGVkQXQ6IG51bWJlcjtcbiAgY29tcHM6IENvbXBbXTtcbiAgZWRpdGlvbjogRWRpdGlvbiB8IG51bGw7XG59XG5cbmZ1bmN0aW9uIHJlYWRDYWNoZSgpOiBDb21wc0NhY2hlIHwgbnVsbCB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmF3ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQ09NUFNfQ0FDSEVfS0VZKTtcbiAgICByZXR1cm4gcmF3ID8gSlNPTi5wYXJzZShyYXcpIGFzIENvbXBzQ2FjaGUgOiBudWxsO1xuICB9IGNhdGNoIHsgcmV0dXJuIG51bGw7IH1cbn1cblxuZnVuY3Rpb24gd3JpdGVDYWNoZShjb21wczogQ29tcFtdLCBlZGl0aW9uOiBFZGl0aW9uIHwgbnVsbCk6IHZvaWQge1xuICB0cnkge1xuICAgIGZvciAoY29uc3QgayBvZiBMRUdBQ1lfQ0FDSEVfS0VZUykgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oayk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQ09NUFNfQ0FDSEVfS0VZLCBKU09OLnN0cmluZ2lmeSh7IGZldGNoZWRBdDogRGF0ZS5ub3coKSwgY29tcHMsIGVkaXRpb24gfSkpO1xuICB9IGNhdGNoIHsgLyogcXVvdGEg4oCUIGlnbm9yZSAqLyB9XG59XG5cbi8vIFVSTCBzZWdtZW50IGZvciBhIGNvbXA6IHRoZSBlZGl0b3IncyBzbHVnLCBlbHNlIHRoZSBuYW1lIHNsdWdpZmllZC4gS2VlcFxuLy8gdGhpcyBydWxlIGJ5dGUtaWRlbnRpY2FsIHRvIHNsdWdpZnkoKSBpbiBwcm94eS9ub2RlL3NpdGUubWpzIOKAlCB0aGUgU1NSXG4vLyBzaGVsbCBhbmQgdGhlIGNsaWVudCBtdXN0IGFncmVlIG9uIGV2ZXJ5IC9jb21wcy88c2x1Zz4vIFVSTC5cbmV4cG9ydCBmdW5jdGlvbiBzbHVnaWZ5KHM6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzLnRvTG93ZXJDYXNlKCkubm9ybWFsaXplKCdORktEJykucmVwbGFjZSgvW15hLXowLTldKy9nLCAnLScpLnJlcGxhY2UoL14tK3wtKyQvZywgJycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcFNsdWcoY29tcDogQ29tcCk6IHN0cmluZyB7XG4gIHJldHVybiBjb21wLnNsdWcgfHwgc2x1Z2lmeShjb21wLm5hbWUpIHx8IHNsdWdpZnkoY29tcC5pZCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBjb21wcyB3aXRoIGh5YnJpZCBzdHJhdGVneTpcbiAqIDEuIElmIGZyZXNoIGNhY2hlIOKGkiByZXR1cm4gaW1tZWRpYXRlbHlcbiAqIDIuIE90aGVyd2lzZSBmZXRjaCB0aGUgQVBJOyBvbiBzdWNjZXNzIGNhY2hlIGFuZCByZXR1cm5cbiAqIDMuIE9uIGZhaWx1cmUg4oaSIHN0YWxlIGNhY2hlLCBlbHNlIHRoZSBidW5kbGVkIHNlZWRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvbXBzKCk6IFByb21pc2U8Q29tcFtdPiB7XG4gIGNvbnN0IGNhY2hlZCA9IHJlYWRDYWNoZSgpO1xuICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICBjb25zdCBpc0ZyZXNoID0gY2FjaGVkICYmIChub3cgLSBjYWNoZWQuZmV0Y2hlZEF0KSA8IENBQ0hFX1RUTF9NUztcbiAgaWYgKGlzRnJlc2gpIHJldHVybiBjYWNoZWQhLmNvbXBzO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7a1Jpb3RBcGlCYXNlVXJsfS9jb21wc2ApO1xuICAgIGlmIChyZXMub2spIHtcbiAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXMuanNvbigpIGFzIHsgY29tcHM6IENvbXBbXTsgZWRpdGlvbj86IEVkaXRpb24gfTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGJvZHkuY29tcHMpKSB7XG4gICAgICAgIHdyaXRlQ2FjaGUoYm9keS5jb21wcywgYm9keS5lZGl0aW9uIHx8IG51bGwpO1xuICAgICAgICByZXR1cm4gYm9keS5jb21wcztcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggeyAvKiBmYWxsIHRocm91Z2ggKi8gfVxuXG4gIGlmIChjYWNoZWQpIHJldHVybiBjYWNoZWQuY29tcHM7XG4gIHJldHVybiBzZWVkQ29tcHM7XG59XG5cbi8qKiBTeW5jaHJvbm91czogYmVzdC1hdmFpbGFibGUgY29tcHMgd2l0aG91dCBhd2FpdGluZyB0aGUgbmV0d29yay4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wc1N5bmMoKTogQ29tcFtdIHtcbiAgY29uc3QgY2FjaGVkID0gcmVhZENhY2hlKCk7XG4gIGlmIChjYWNoZWQgJiYgY2FjaGVkLmNvbXBzLmxlbmd0aCA+IDApIHJldHVybiBjYWNoZWQuY29tcHM7XG4gIHJldHVybiBzZWVkQ29tcHM7XG59XG5cbi8qKiBUaGUgZWRpdGlvbiB0aGUgY2FjaGVkIGNvbXBzIGJlbG9uZyB0bzsgbnVsbCBiZWZvcmUgdGhlIGZpcnN0IGZldGNoLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVkaXRpb24oKTogRWRpdGlvbiB8IG51bGwge1xuICBjb25zdCBjYWNoZWQgPSByZWFkQ2FjaGUoKTtcbiAgaWYgKGNhY2hlZD8uZWRpdGlvbikgcmV0dXJuIGNhY2hlZC5lZGl0aW9uO1xuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqIE9mZmxpbmUgZmFsbGJhY2sgZWRpdGlvbiBmb3Igc3VyZmFjZXMgdGhhdCBtdXN0IHByaW50IHNvbWV0aGluZy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmYWxsYmFja0VkaXRpb24oKTogRWRpdGlvbiB7XG4gIHJldHVybiB7IHNldE51bWJlcjoga0N1cnJlbnRUZnRTZXROdW1iZXIsIHBhdGNoOiBrQ3VycmVudFRmdFBhdGNoLCB1cGRhdGVkQXQ6IDAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludmFsaWRhdGVDYWNoZSgpOiB2b2lkIHtcbiAgdHJ5IHsgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oQ09NUFNfQ0FDSEVfS0VZKTsgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEFkbWluIG9wZXJhdGlvbnMg4oCUIHJlcXVpcmUgbW9kZXJhdG9yIG9yIGFkbWluIHJvbGUuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKiBFdmVyeSBjb21wIG9mIHRoZSBjdXJyZW50IGVkaXRpb24sIGRyYWZ0cyBpbmNsdWRlZCAobW9kZXJhdG9yKS4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZG1pbkxpc3RBbGwoKTogUHJvbWlzZTx7IGNvbXBzOiBDb21wW107IGVkaXRpb246IEVkaXRpb24gfT4ge1xuICByZXR1cm4gYWRtaW5GZXRjaDx7IGNvbXBzOiBDb21wW107IGVkaXRpb246IEVkaXRpb24gfT4oJy9hZG1pbi9jb21wcycpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRtaW5DcmVhdGVDb21wKGNvbXA6IENvbXApOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgYWRtaW5GZXRjaCgnL2FkbWluL2NvbXBzJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGlkOiBjb21wLmlkLFxuICAgICAgbmFtZTogY29tcC5uYW1lLFxuICAgICAgdGllcjogY29tcC50aWVyLFxuICAgICAgcGxheXN0eWxlOiBjb21wLnBsYXlzdHlsZSxcbiAgICAgIGRhdGE6IGNvbXAsXG4gICAgICBpc1B1Ymxpc2hlZDogY29tcC5pc1B1Ymxpc2hlZCAhPT0gZmFsc2UsXG4gICAgfSksXG4gIH0pO1xuICBpbnZhbGlkYXRlQ2FjaGUoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkbWluVXBkYXRlQ29tcChpZDogc3RyaW5nLCBjb21wOiBQYXJ0aWFsPENvbXA+KTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IGFkbWluRmV0Y2goYC9hZG1pbi9jb21wcy8ke2VuY29kZVVSSUNvbXBvbmVudChpZCl9YCwge1xuICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbmFtZTogY29tcC5uYW1lLFxuICAgICAgdGllcjogY29tcC50aWVyLFxuICAgICAgcGxheXN0eWxlOiBjb21wLnBsYXlzdHlsZSxcbiAgICAgIGRhdGE6IGNvbXAsXG4gICAgICBpc1B1Ymxpc2hlZDogY29tcC5pc1B1Ymxpc2hlZCAhPT0gZmFsc2UsXG4gICAgfSksXG4gIH0pO1xuICBpbnZhbGlkYXRlQ2FjaGUoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkbWluRGVsZXRlQ29tcChpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IGFkbWluRmV0Y2goYC9hZG1pbi9jb21wcy8ke2VuY29kZVVSSUNvbXBvbmVudChpZCl9YCwgeyBtZXRob2Q6ICdERUxFVEUnIH0pO1xuICBpbnZhbGlkYXRlQ2FjaGUoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkbWluU2F2ZUVkaXRpb24oZWRpdGlvbjogeyBwYXRjaDogc3RyaW5nOyBzZXROYW1lPzogc3RyaW5nIH0pOiBQcm9taXNlPEVkaXRpb24+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgYWRtaW5GZXRjaDx7IG9rOiBib29sZWFuOyBlZGl0aW9uOiBFZGl0aW9uIH0+KCcvYWRtaW4vZWRpdGlvbicsIHtcbiAgICBtZXRob2Q6ICdQVVQnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGVkaXRpb24pLFxuICB9KTtcbiAgaW52YWxpZGF0ZUNhY2hlKCk7XG4gIHJldHVybiByZXMuZWRpdGlvbjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBBZG1pbiBwYW5lbCDigJQgY29tcHMgQ1JVRCArIHRoZSBlZGl0aW9uIHJlY29yZC4gR2F0ZWQgYnkgbW9kZXJhdG9yL2FkbWluXG4vLyByb2xlIG9uIHRoZSBiYWNrZW5kOyB0aGUgVUkgYWxzbyBnYXRlcyB3aXRoIGhhc0F0TGVhc3QoJ21vZGVyYXRvcicpLlxuXG5pbXBvcnQgeyBDb21wLCBDb21wVW5pdCwgQ29tcFBsYWNlbWVudCB9IGZyb20gJy4uL21vZGVscy90eXBlcyc7XG5pbXBvcnQgeyBpc092ZXJ3b2xmIH0gZnJvbSAnLi4vQXBwV2luZG93JztcbmltcG9ydCB7IGdldFN0b3JlZFVzZXIsIGhhc0F0TGVhc3QsIGlzQXV0aGVudGljYXRlZCwgbG9naW4sIGxvZ291dCB9IGZyb20gJy4uL3NlcnZpY2VzL0F1dGhTZXJ2aWNlJztcbmltcG9ydCB7IGFkbWluTGlzdEFsbCwgYWRtaW5DcmVhdGVDb21wLCBhZG1pblVwZGF0ZUNvbXAsIGFkbWluRGVsZXRlQ29tcCwgYWRtaW5TYXZlRWRpdGlvbiwgc2x1Z2lmeSwgRWRpdGlvbiB9IGZyb20gJy4uL3NlcnZpY2VzL0NvbXBzU2VydmljZSc7XG5pbXBvcnQgeyBjaGFtcGlvbk1hcCB9IGZyb20gJy4uL2RhdGEvc2V0MTgvY2hhbXBpb25zJztcbmltcG9ydCB7IEJvYXJkRWRpdG9yIH0gZnJvbSAnLi9Cb2FyZEVkaXRvcic7XG5cbmxldCBjb21wczogQ29tcFtdID0gW107XG5sZXQgZWRpdGlvbjogRWRpdGlvbiB8IG51bGwgPSBudWxsO1xubGV0IHNlbGVjdGVkSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xubGV0IGlzTmV3TW9kZSA9IGZhbHNlO1xubGV0IGJvYXJkOiBCb2FyZEVkaXRvciB8IG51bGwgPSBudWxsO1xuXG5mdW5jdGlvbiAkPFQgZXh0ZW5kcyBIVE1MRWxlbWVudD4oaWQ6IHN0cmluZyk6IFQgfCBudWxsIHtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSBhcyBUIHwgbnVsbDtcbn1cblxuZnVuY3Rpb24gZXNjYXBlSHRtbChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcy5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7JykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xufVxuXG4vLyBUaGUgYXBwIGNsb3NlcyBpdHMgd2luZG93OyB0aGUgd2Vic2l0ZSBnb2VzIGJhY2sgdG8gdGhlIGNvbXBzLlxuZnVuY3Rpb24gY2xvc2VXaW5kb3coKTogdm9pZCB7XG4gIGlmICghaXNPdmVyd29sZikgeyBsb2NhdGlvbi5ocmVmID0gJy8nOyByZXR1cm47IH1cbiAgb3ZlcndvbGYud2luZG93cy5nZXRDdXJyZW50V2luZG93KHJlcyA9PiB7XG4gICAgaWYgKHJlcz8uc3VjY2VzcyAmJiByZXMud2luZG93Py5pZCkgb3ZlcndvbGYud2luZG93cy5jbG9zZShyZXMud2luZG93LmlkKTtcbiAgfSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFNpZ24taW4gKHdlYnNpdGUgb25seSlcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gc2hvd1NpZ25pbihzaG93OiBib29sZWFuKTogdm9pZCB7XG4gIGNvbnN0IHBhbmVsID0gJCgnYWRtaW4tc2lnbmluJyk7XG4gIGNvbnN0IG1haW4gPSAkKCdhZG1pbi1tYWluJyk7XG4gIGNvbnN0IGZvcmJpZGRlbiA9ICQoJ2FkbWluLWZvcmJpZGRlbicpO1xuICBjb25zdCBsb2dvdXRCdG4gPSAkKCdhZG1pbi1sb2dvdXQnKTtcbiAgaWYgKHBhbmVsKSBwYW5lbC5zdHlsZS5kaXNwbGF5ID0gc2hvdyA/ICdmbGV4JyA6ICdub25lJztcbiAgaWYgKG1haW4pIG1haW4uc3R5bGUuZGlzcGxheSA9IHNob3cgPyAnbm9uZScgOiAnJztcbiAgaWYgKGZvcmJpZGRlbiAmJiBzaG93KSBmb3JiaWRkZW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgaWYgKGxvZ291dEJ0bikgbG9nb3V0QnRuLnN0eWxlLmRpc3BsYXkgPSBzaG93ID8gJ25vbmUnIDogJyc7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVNpZ25pbihlOiBFdmVudCk6IFByb21pc2U8dm9pZD4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGVtYWlsID0gKCQ8SFRNTElucHV0RWxlbWVudD4oJ3NpZ25pbi1lbWFpbCcpPy52YWx1ZSB8fCAnJykudHJpbSgpO1xuICBjb25zdCBwYXNzd29yZCA9ICQ8SFRNTElucHV0RWxlbWVudD4oJ3NpZ25pbi1wYXNzd29yZCcpPy52YWx1ZSB8fCAnJztcbiAgY29uc3QgZXJyID0gJCgnc2lnbmluLWVycm9yJyk7XG4gIGNvbnN0IGJ0biA9ICQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdzaWduaW4tc3VibWl0Jyk7XG4gIGlmIChlcnIpIGVyci50ZXh0Q29udGVudCA9ICcnO1xuICBpZiAoYnRuKSBidG4uZGlzYWJsZWQgPSB0cnVlO1xuICB0cnkge1xuICAgIGF3YWl0IGxvZ2luKGVtYWlsLCBwYXNzd29yZCk7XG4gICAgYXdhaXQgYm9vdCgpO1xuICB9IGNhdGNoIChleDogYW55KSB7XG4gICAgaWYgKGVycikgZXJyLnRleHRDb250ZW50ID0gZXg/Lm1lc3NhZ2UgfHwgJ1NpZ24taW4gZmFpbGVkJztcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoYnRuKSBidG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBIZWFkZXJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gcmVuZGVySGVhZGVyKCk6IHZvaWQge1xuICBjb25zdCB1c2VyID0gZ2V0U3RvcmVkVXNlcigpO1xuICBjb25zdCBzcGFuID0gJCgnYWRtaW4tY3VycmVudC11c2VyJyk7XG4gIGlmICghc3BhbikgcmV0dXJuO1xuICBpZiAodXNlcikge1xuICAgIHNwYW4uaW5uZXJIVE1MID0gYCR7ZXNjYXBlSHRtbCh1c2VyLmVtYWlsKX0gPGVtIHN0eWxlPVwib3BhY2l0eTowLjY7XCI+KCR7dXNlci5yb2xlfSk8L2VtPmA7XG4gIH0gZWxzZSB7XG4gICAgc3Bhbi50ZXh0Q29udGVudCA9ICdub3Qgc2lnbmVkIGluJztcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBTaWRlYmFyIGxpc3Rcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gcmVuZGVyTGlzdChmaWx0ZXIgPSAnJyk6IHZvaWQge1xuICBjb25zdCBsaXN0ID0gJCgnYWRtaW4tY29tcHMtbGlzdCcpO1xuICBpZiAoIWxpc3QpIHJldHVybjtcbiAgY29uc3QgZiA9IGZpbHRlci50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgY29uc3QgZmlsdGVyZWQgPSBmXG4gICAgPyBjb21wcy5maWx0ZXIoYyA9PiBjLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmKSB8fCBjLmlkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZikpXG4gICAgOiBjb21wcztcbiAgaWYgKGZpbHRlcmVkLmxlbmd0aCA9PT0gMCkge1xuICAgIGxpc3QuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJhZG1pbi1lbXB0eVwiPk5vIGNvbXBzLjwvZGl2Pic7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxpc3QuaW5uZXJIVE1MID0gZmlsdGVyZWQubWFwKGMgPT4gYFxuICAgIDxidXR0b24gY2xhc3M9XCJhZG1pbi1jb21wLXJvdyAke2MuaWQgPT09IHNlbGVjdGVkSWQgPyAnc2VsZWN0ZWQnIDogJyd9XCIgZGF0YS1jb21wLWlkPVwiJHtlc2NhcGVIdG1sKGMuaWQpfVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhZG1pbi1jb21wLXRpZXIgdGllci0ke2MudGllci50b0xvd2VyQ2FzZSgpfVwiPiR7ZXNjYXBlSHRtbChjLnRpZXIpfTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYWRtaW4tY29tcC1uYW1lXCI+JHtlc2NhcGVIdG1sKGMubmFtZSl9JHtjLmlzUHVibGlzaGVkID09PSBmYWxzZSA/ICcgPGVtIGNsYXNzPVwiYWRtaW4tZHJhZnRcIj5kcmFmdDwvZW0+JyA6ICcnfTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYWRtaW4tY29tcC1pZFwiPiR7ZXNjYXBlSHRtbChjLmlkKX08L3NwYW4+XG4gICAgPC9idXR0b24+XG4gIGApLmpvaW4oJycpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFZGl0b3Jcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gY2xlYXJFZGl0b3IoKTogdm9pZCB7XG4gICQoJ2FkbWluLWVkaXRvci1lbXB0eScpIS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgJCgnYWRtaW4tZWRpdG9yLWZvcm0nKSEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgc2V0U3RhdHVzKCcnKTtcbn1cblxuZnVuY3Rpb24gc2hvd0VkaXRvcihjb21wOiBDb21wIHwgbnVsbCk6IHZvaWQge1xuICAkKCdhZG1pbi1lZGl0b3ItZW1wdHknKSEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgJCgnYWRtaW4tZWRpdG9yLWZvcm0nKSEuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcblxuICBpc05ld01vZGUgPSBjb21wID09PSBudWxsO1xuICBjb25zdCB0aXRsZSA9ICQoJ2FkbWluLWVkaXRvci10aXRsZScpO1xuICBpZiAodGl0bGUpIHRpdGxlLnRleHRDb250ZW50ID0gaXNOZXdNb2RlID8gJ05ldyBjb21wJyA6ICdFZGl0IGNvbXAnO1xuXG4gIC8vIElEIGZpZWxkIOKAlCBsb2NrZWQgd2hlbiBlZGl0aW5nIGV4aXN0aW5nIGNvbXAgKGlkIGlzIHByaW1hcnkga2V5KVxuICBjb25zdCBpZElucHV0ID0gJDxIVE1MSW5wdXRFbGVtZW50PignZmllbGQtaWQnKTtcbiAgaWYgKGlkSW5wdXQpIHtcbiAgICBpZElucHV0LnZhbHVlID0gY29tcD8uaWQgfHwgJyc7XG4gICAgaWRJbnB1dC5kaXNhYmxlZCA9ICFpc05ld01vZGU7XG4gIH1cbiAgKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLW5hbWUnKSEpLnZhbHVlID0gY29tcD8ubmFtZSB8fCAnJztcbiAgKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLXNsdWcnKSEpLnZhbHVlID0gY29tcD8uc2x1ZyB8fCAnJztcbiAgKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLXB1Ymxpc2hlZCcpISkuY2hlY2tlZCA9IGNvbXA/LmlzUHVibGlzaGVkICE9PSBmYWxzZTtcbiAgYm9hcmQ/LnNldChjb21wPy5wbGFjZW1lbnRzKTtcbiAgKCQ8SFRNTFNlbGVjdEVsZW1lbnQ+KCdmaWVsZC10aWVyJykhKS52YWx1ZSA9IGNvbXA/LnRpZXIgfHwgJ0InO1xuICAoJDxIVE1MU2VsZWN0RWxlbWVudD4oJ2ZpZWxkLXBsYXlzdHlsZScpISkudmFsdWUgPSBjb21wPy5wbGF5c3R5bGUgfHwgJ1N0YW5kYXJkJztcbiAgKCQ8SFRNTFNlbGVjdEVsZW1lbnQ+KCdmaWVsZC1kaWZmaWN1bHR5JykhKS52YWx1ZSA9IGNvbXA/LmRpZmZpY3VsdHkgfHwgJ01lZGl1bSc7XG4gICgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdmaWVsZC1sZXZlbCcpISkudmFsdWUgPSBTdHJpbmcoY29tcD8ubGV2ZWwgPz8gOCk7XG4gICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC1kZXNjcmlwdGlvbicpISkudmFsdWUgPSBjb21wPy5kZXNjcmlwdGlvbiB8fCAnJztcbiAgKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLWNvcmUtdHJhaXRzJykhKS52YWx1ZSA9IChjb21wPy5jb3JlVHJhaXRzIHx8IFtdKS5qb2luKCcsICcpO1xuICAoJDxIVE1MSW5wdXRFbGVtZW50PignZmllbGQtYXVnbWVudHMnKSEpLnZhbHVlID0gKGNvbXA/LnJlY29tbWVuZGVkQXVnbWVudHMgfHwgW10pLmpvaW4oJywgJyk7XG4gICgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdmaWVsZC1hbHQtY29tcHMnKSEpLnZhbHVlID0gKGNvbXA/LmFsdGVybmF0aXZlQ29tcElkcyB8fCBbXSkuam9pbignLCAnKTtcbiAgKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLXRhZ3MnKSEpLnZhbHVlID0gKGNvbXA/LnRhZ3MgfHwgW10pLmpvaW4oJywgJyk7XG4gICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC11bml0cycpISkudmFsdWUgPSBKU09OLnN0cmluZ2lmeShjb21wPy51bml0cyB8fCBbXSwgbnVsbCwgMik7XG4gICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC1lYXJseScpISkudmFsdWUgPSBjb21wPy5lYXJseUdhbWUgfHwgJyc7XG4gICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC1taWQnKSEpLnZhbHVlICAgPSBjb21wPy5taWRHYW1lICAgfHwgJyc7XG4gICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC1sYXRlJykhKS52YWx1ZSAgPSBjb21wPy5sYXRlR2FtZSAgfHwgJyc7XG4gICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC10aXBzJykhKS52YWx1ZSAgPSBjb21wPy50aXBzICAgICAgfHwgJyc7XG5cbiAgLy8gSGlkZSBEZWxldGUgYnV0dG9uIGluIG5ldyBtb2RlXG4gIGNvbnN0IGRlbCA9ICQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdhZG1pbi1kZWxldGUnKTtcbiAgaWYgKGRlbCkgZGVsLnN0eWxlLmRpc3BsYXkgPSBpc05ld01vZGUgPyAnbm9uZScgOiAnaW5saW5lLWJsb2NrJztcblxuICBzZXRTdGF0dXMoJycpO1xufVxuXG5mdW5jdGlvbiBzZXRTdGF0dXMobXNnOiBzdHJpbmcsIGtpbmQ6ICdvaycgfCAnZXJyJyB8ICcnID0gJycpOiB2b2lkIHtcbiAgY29uc3QgZWwgPSAkKCdhZG1pbi1lZGl0b3Itc3RhdHVzJyk7XG4gIGlmICghZWwpIHJldHVybjtcbiAgZWwudGV4dENvbnRlbnQgPSBtc2c7XG4gIGVsLmNsYXNzTmFtZSA9IGBhZG1pbi1lZGl0b3Itc3RhdHVzICR7a2luZH1gO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0RWRpdG9yQ29tcCgpOiBDb21wIHwgbnVsbCB7XG4gIGNvbnN0IGlkID0gKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLWlkJykhKS52YWx1ZS50cmltKCk7XG4gIGNvbnN0IG5hbWUgPSAoJDxIVE1MSW5wdXRFbGVtZW50PignZmllbGQtbmFtZScpISkudmFsdWUudHJpbSgpO1xuICBpZiAoIWlkIHx8ICFuYW1lKSB7XG4gICAgc2V0U3RhdHVzKCdJRCBhbmQgTmFtZSBhcmUgcmVxdWlyZWQuJywgJ2VycicpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICghL15bYS16MC05XFwtX10rJC9pLnRlc3QoaWQpKSB7XG4gICAgc2V0U3RhdHVzKCdJRCBtdXN0IGNvbnRhaW4gb25seSBsZXR0ZXJzLCBkaWdpdHMsIGRhc2hlcywgdW5kZXJzY29yZXMuJywgJ2VycicpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGV0IHVuaXRzOiBDb21wVW5pdFtdID0gW107XG4gIHRyeSB7XG4gICAgdW5pdHMgPSBKU09OLnBhcnNlKCgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC11bml0cycpISkudmFsdWUgfHwgJ1tdJyk7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHVuaXRzKSkgdGhyb3cgbmV3IEVycm9yKCd1bml0cyBtdXN0IGJlIGEgSlNPTiBhcnJheScpO1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICBzZXRTdGF0dXMoYFVuaXRzIEpTT04gaW52YWxpZDogJHtlLm1lc3NhZ2V9YCwgJ2VycicpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qgc3BsaXRDc3YgPSAoczogc3RyaW5nKTogc3RyaW5nW10gPT4gcy5zcGxpdCgnLCcpLm1hcCh4ID0+IHgudHJpbSgpKS5maWx0ZXIoQm9vbGVhbik7XG4gIGNvbnN0IHNsdWdGaWVsZCA9ICgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdmaWVsZC1zbHVnJykhKS52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qgc2x1ZyA9IHNsdWdGaWVsZCB8fCBzbHVnaWZ5KG5hbWUpO1xuICBpZiAoIS9eW2EtejAtOS1dezEsODB9JC8udGVzdChzbHVnKSkge1xuICAgIHNldFN0YXR1cygnU2x1ZyBtdXN0IGJlIGxvd2VyY2FzZSBsZXR0ZXJzLCBkaWdpdHMgYW5kIGRhc2hlcy4nLCAnZXJyJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgcGxhY2VtZW50cyA9IGJvYXJkID8gYm9hcmQuZ2V0KCkgOiBbXTtcbiAgY29uc3QgdW5rbm93biA9IHBsYWNlbWVudHMuZmlsdGVyKHAgPT4gIWNoYW1waW9uTWFwLmhhcyhwLmNoYW1waW9uSWQpKTtcbiAgaWYgKHVua25vd24ubGVuZ3RoKSB7XG4gICAgc2V0U3RhdHVzKGBCb2FyZCBoYXMgdW5rbm93biB1bml0czogJHt1bmtub3duLm1hcChwID0+IHAuY2hhbXBpb25JZCkuam9pbignLCAnKX1gLCAnZXJyJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlkLFxuICAgIG5hbWUsXG4gICAgc2x1ZyxcbiAgICBpc1B1Ymxpc2hlZDogKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLXB1Ymxpc2hlZCcpISkuY2hlY2tlZCxcbiAgICBwbGFjZW1lbnRzLFxuICAgIHRpZXI6ICgkPEhUTUxTZWxlY3RFbGVtZW50PignZmllbGQtdGllcicpISkudmFsdWUgYXMgYW55LFxuICAgIHBsYXlzdHlsZTogKCQ8SFRNTFNlbGVjdEVsZW1lbnQ+KCdmaWVsZC1wbGF5c3R5bGUnKSEpLnZhbHVlIGFzIGFueSxcbiAgICBkaWZmaWN1bHR5OiAoJDxIVE1MU2VsZWN0RWxlbWVudD4oJ2ZpZWxkLWRpZmZpY3VsdHknKSEpLnZhbHVlIGFzIGFueSxcbiAgICBsZXZlbDogcGFyc2VJbnQoKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLWxldmVsJykhKS52YWx1ZSwgMTApIHx8IDgsXG4gICAgZGVzY3JpcHRpb246ICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC1kZXNjcmlwdGlvbicpISkudmFsdWUsXG4gICAgY29yZVRyYWl0czogc3BsaXRDc3YoKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLWNvcmUtdHJhaXRzJykhKS52YWx1ZSksXG4gICAgcmVjb21tZW5kZWRBdWdtZW50czogc3BsaXRDc3YoKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLWF1Z21lbnRzJykhKS52YWx1ZSksXG4gICAgYWx0ZXJuYXRpdmVDb21wSWRzOiBzcGxpdENzdigoJDxIVE1MSW5wdXRFbGVtZW50PignZmllbGQtYWx0LWNvbXBzJykhKS52YWx1ZSksXG4gICAgdGFnczogc3BsaXRDc3YoKCQ8SFRNTElucHV0RWxlbWVudD4oJ2ZpZWxkLXRhZ3MnKSEpLnZhbHVlKSxcbiAgICB1bml0cyxcbiAgICBlYXJseUdhbWU6ICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC1lYXJseScpISkudmFsdWUgfHwgdW5kZWZpbmVkLFxuICAgIG1pZEdhbWU6ICAgKCQ8SFRNTFRleHRBcmVhRWxlbWVudD4oJ2ZpZWxkLW1pZCcpISkudmFsdWUgICB8fCB1bmRlZmluZWQsXG4gICAgbGF0ZUdhbWU6ICAoJDxIVE1MVGV4dEFyZWFFbGVtZW50PignZmllbGQtbGF0ZScpISkudmFsdWUgIHx8IHVuZGVmaW5lZCxcbiAgICB0aXBzOiAgICAgICgkPEhUTUxUZXh0QXJlYUVsZW1lbnQ+KCdmaWVsZC10aXBzJykhKS52YWx1ZSAgfHwgdW5kZWZpbmVkLFxuICB9O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBBY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVNhdmUoZTogRXZlbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBjb21wID0gY29sbGVjdEVkaXRvckNvbXAoKTtcbiAgaWYgKCFjb21wKSByZXR1cm47XG4gIHNldFN0YXR1cygnU2F2aW5n4oCmJyk7XG4gIHRyeSB7XG4gICAgaWYgKGlzTmV3TW9kZSkge1xuICAgICAgYXdhaXQgYWRtaW5DcmVhdGVDb21wKGNvbXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBhZG1pblVwZGF0ZUNvbXAoY29tcC5pZCwgY29tcCk7XG4gICAgfVxuICAgIHNldFN0YXR1cygnU2F2ZWQg4pyTJywgJ29rJyk7XG4gICAgYXdhaXQgcmVmcmVzaENvbXBzKCk7XG4gICAgc2VsZWN0ZWRJZCA9IGNvbXAuaWQ7XG4gICAgc2hvd0VkaXRvcihjb21wcy5maW5kKGMgPT4gYy5pZCA9PT0gY29tcC5pZCkgfHwgY29tcCk7XG4gICAgcmVuZGVyTGlzdCgoJDxIVE1MSW5wdXRFbGVtZW50PignYWRtaW4tY29tcC1maWx0ZXInKT8udmFsdWUpIHx8ICcnKTtcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICBzZXRTdGF0dXMoYEZhaWxlZDogJHtlcnIubWVzc2FnZSB8fCBlcnJ9YCwgJ2VycicpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZURlbGV0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFzZWxlY3RlZElkKSByZXR1cm47XG4gIGlmICghY29uZmlybShgRGVsZXRlIGNvbXAgXCIke3NlbGVjdGVkSWR9XCIgcGVybWFuZW50bHk/IFRoaXMgYWZmZWN0cyBhbGwgUGl2b3RURlQgdXNlcnMuYCkpIHJldHVybjtcbiAgc2V0U3RhdHVzKCdEZWxldGluZ+KApicpO1xuICB0cnkge1xuICAgIGF3YWl0IGFkbWluRGVsZXRlQ29tcChzZWxlY3RlZElkKTtcbiAgICBzZXRTdGF0dXMoJycpO1xuICAgIHNlbGVjdGVkSWQgPSBudWxsO1xuICAgIGF3YWl0IHJlZnJlc2hDb21wcygpO1xuICAgIGNsZWFyRWRpdG9yKCk7XG4gICAgcmVuZGVyTGlzdCgoJDxIVE1MSW5wdXRFbGVtZW50PignYWRtaW4tY29tcC1maWx0ZXInKT8udmFsdWUpIHx8ICcnKTtcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICBzZXRTdGF0dXMoYERlbGV0ZSBmYWlsZWQ6ICR7ZXJyLm1lc3NhZ2UgfHwgZXJyfWAsICdlcnInKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiByZWZyZXNoQ29tcHMoKTogUHJvbWlzZTx2b2lkPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYWRtaW5MaXN0QWxsKCk7XG4gICAgY29tcHMgPSByZXMuY29tcHM7XG4gICAgZWRpdGlvbiA9IHJlcy5lZGl0aW9uO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcignW0FkbWluXSBGYWlsZWQgdG8gZmV0Y2ggY29tcHMnLCBlKTtcbiAgICBjb21wcyA9IFtdO1xuICB9XG4gIHJlbmRlckVkaXRpb24oKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRWRpdGlvbiAoc2V0ICsgcGF0Y2ggdGhlIGJvb2sgaXMgd3JpdHRlbiBmb3IpXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIHJlbmRlckVkaXRpb24oKTogdm9pZCB7XG4gIGNvbnN0IHBhdGNoID0gJDxIVE1MSW5wdXRFbGVtZW50PignZWRpdGlvbi1wYXRjaCcpO1xuICBjb25zdCBzZXQgPSAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdlZGl0aW9uLXNldCcpO1xuICBpZiAocGF0Y2ggJiYgZWRpdGlvbiAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBwYXRjaCkgcGF0Y2gudmFsdWUgPSBlZGl0aW9uLnBhdGNoO1xuICBpZiAoc2V0KSBzZXQudmFsdWUgPSBlZGl0aW9uID8gYFNldCAke2VkaXRpb24uc2V0TnVtYmVyfSR7ZWRpdGlvbi5zZXROYW1lID8gYCDigJQgJHtlZGl0aW9uLnNldE5hbWV9YCA6ICcnfWAgOiAnJztcbn1cblxuZnVuY3Rpb24gc2V0RWRpdGlvblN0YXR1cyhtc2c6IHN0cmluZywga2luZDogJ29rJyB8ICdlcnInIHwgJycgPSAnJyk6IHZvaWQge1xuICBjb25zdCBlbCA9ICQoJ2VkaXRpb24tc3RhdHVzJyk7XG4gIGlmICghZWwpIHJldHVybjtcbiAgZWwudGV4dENvbnRlbnQgPSBtc2c7XG4gIGVsLmNsYXNzTmFtZSA9IGBhZG1pbi1lZGl0b3Itc3RhdHVzICR7a2luZH1gO1xufVxuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVFZGl0aW9uU2F2ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgcGF0Y2ggPSAoJDxIVE1MSW5wdXRFbGVtZW50PignZWRpdGlvbi1wYXRjaCcpPy52YWx1ZSB8fCAnJykudHJpbSgpO1xuICBpZiAoIS9eXFxkezEsMn1cXC5cXGR7MSwyfVthLXpdPyQvaS50ZXN0KHBhdGNoKSkge1xuICAgIHNldEVkaXRpb25TdGF0dXMoJ1BhdGNoIGxvb2tzIGxpa2UgMTguMiBvciAxOC4yYi4nLCAnZXJyJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHNldEVkaXRpb25TdGF0dXMoJ1NhdmluZ+KApicpO1xuICB0cnkge1xuICAgIGVkaXRpb24gPSBhd2FpdCBhZG1pblNhdmVFZGl0aW9uKHsgcGF0Y2ggfSk7XG4gICAgcmVuZGVyRWRpdGlvbigpO1xuICAgIHNldEVkaXRpb25TdGF0dXMoJ1NhdmVkIOKckycsICdvaycpO1xuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIHNldEVkaXRpb25TdGF0dXMoYEZhaWxlZDogJHtlcnIubWVzc2FnZSB8fCBlcnJ9YCwgJ2VycicpO1xuICB9XG59XG5cbi8vIEJvYXJkIOKGkiB1bml0czogYWRkIGEgZGVmYXVsdCBlbnRyeSBmb3IgZXZlcnkgcGxhY2VkIHVuaXQgdGhhdCBoYXMgbm9uZSxcbi8vIGRyb3AgdW5pdHMgdGhhdCBhcmUgbm8gbG9uZ2VyIG9uIHRoZSBib2FyZC5cbmZ1bmN0aW9uIHN5bmNVbml0c0Zyb21Cb2FyZCgpOiB2b2lkIHtcbiAgaWYgKCFib2FyZCkgcmV0dXJuO1xuICBjb25zdCB0YSA9ICQ8SFRNTFRleHRBcmVhRWxlbWVudD4oJ2ZpZWxkLXVuaXRzJyk7XG4gIGlmICghdGEpIHJldHVybjtcbiAgbGV0IHVuaXRzOiBDb21wVW5pdFtdID0gW107XG4gIHRyeSB7IHVuaXRzID0gSlNPTi5wYXJzZSh0YS52YWx1ZSB8fCAnW10nKTsgaWYgKCFBcnJheS5pc0FycmF5KHVuaXRzKSkgdW5pdHMgPSBbXTsgfSBjYXRjaCB7IHVuaXRzID0gW107IH1cbiAgY29uc3Qgb25Cb2FyZCA9IGJvYXJkLmNoYW1waW9uSWRzKCk7XG4gIGNvbnN0IGtlcHQgPSB1bml0cy5maWx0ZXIodSA9PiBvbkJvYXJkLmluY2x1ZGVzKHUuY2hhbXBpb25JZCkpO1xuICBmb3IgKGNvbnN0IGlkIG9mIG9uQm9hcmQpIHtcbiAgICBpZiAoIWtlcHQuc29tZSh1ID0+IHUuY2hhbXBpb25JZCA9PT0gaWQpKSBrZXB0LnB1c2goeyBjaGFtcGlvbklkOiBpZCwgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiwgaXRlbXM6IFtdIH0pO1xuICB9XG4gIGlmICgha2VwdC5zb21lKHUgPT4gdS5pc0NhcnJ5KSAmJiBrZXB0Lmxlbmd0aCkga2VwdFswXS5pc0NhcnJ5ID0gdHJ1ZTtcbiAgdGEudmFsdWUgPSBKU09OLnN0cmluZ2lmeShrZXB0LCBudWxsLCAyKTtcbiAgc2V0U3RhdHVzKGBVbml0cyBzeW5jZWQgZnJvbSB0aGUgYm9hcmQgKCR7a2VwdC5sZW5ndGh9KS5gLCAnb2snKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQm9vdFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5sZXQgc2hlbGxXaXJlZCA9IGZhbHNlOyAgIC8vIGhlYWRlciBidXR0b25zICsgc2lnbi1pbiBmb3JtLCBvbmNlIHBlciBwYWdlXG5sZXQgZWRpdG9yV2lyZWQgPSBmYWxzZTsgIC8vIGxpc3QsIGVkaXRvciwgYm9hcmQsIGVkaXRpb24g4oCUIG9uY2UsIHdoZW4gZmlyc3QgYWxsb3dlZFxuXG5mdW5jdGlvbiB3aXJlU2hlbGwoKTogdm9pZCB7XG4gIGlmIChzaGVsbFdpcmVkKSByZXR1cm47XG4gIHNoZWxsV2lyZWQgPSB0cnVlO1xuICAkKCdhZG1pbi1zaWduaW4tZm9ybScpPy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4geyBoYW5kbGVTaWduaW4oZSk7IH0pO1xuICAkKCdhZG1pbi1jbG9zZScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlV2luZG93KTtcbiAgJCgnYWRtaW4tZm9yYmlkZGVuLWNsb3NlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VXaW5kb3cpO1xuICAkKCdhZG1pbi1sb2dvdXQnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbG9nb3V0KCk7XG4gICAgaWYgKGlzT3ZlcndvbGYpIGNsb3NlV2luZG93KCk7IGVsc2UgYm9vdCgpO1xuICB9KTtcbiAgaWYgKCFpc092ZXJ3b2xmKSB7XG4gICAgY29uc3QgY2xvc2VCdG4gPSAkKCdhZG1pbi1jbG9zZScpO1xuICAgIGlmIChjbG9zZUJ0bikgeyBjbG9zZUJ0bi50ZXh0Q29udGVudCA9ICfihqknOyBjbG9zZUJ0bi50aXRsZSA9ICdCYWNrIHRvIHRoZSBzaXRlJzsgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGJvb3QoKSB7XG4gIHJlbmRlckhlYWRlcigpO1xuICB3aXJlU2hlbGwoKTtcblxuICAvLyBOb3Qgc2lnbmVkIGluOiB0aGUgd2Vic2l0ZSBzaG93cyBpdHMgb3duIGZvcm0gKHRoZSBhcHAgc2lnbnMgaW4gZnJvbVxuICAvLyBTZXR0aW5ncyBiZWZvcmUgdGhpcyB3aW5kb3cgZXhpc3RzKS5cbiAgaWYgKCFpc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgIHNob3dTaWduaW4odHJ1ZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHNob3dTaWduaW4oZmFsc2UpO1xuXG4gIC8vIFJvbGUgZ2F0ZVxuICBpZiAoIWhhc0F0TGVhc3QoJ21vZGVyYXRvcicpKSB7XG4gICAgJCgnYWRtaW4tbWFpbicpIS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICQoJ2FkbWluLWZvcmJpZGRlbicpIS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIHJldHVybjtcbiAgfVxuICAkKCdhZG1pbi1mb3JiaWRkZW4nKSEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgJCgnYWRtaW4tbWFpbicpIS5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cbiAgYXdhaXQgcmVmcmVzaENvbXBzKCk7XG4gIHJlbmRlckxpc3QoKTtcbiAgY2xlYXJFZGl0b3IoKTtcbiAgaWYgKGVkaXRvcldpcmVkKSByZXR1cm47XG4gIGVkaXRvcldpcmVkID0gdHJ1ZTtcblxuICAkKCdhZG1pbi1jb21wLWZpbHRlcicpPy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgcmVuZGVyTGlzdCgoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpO1xuICB9KTtcblxuICAkKCdhZG1pbi1jb21wcy1saXN0Jyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCByb3cgPSAoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KCcuYWRtaW4tY29tcC1yb3cnKTtcbiAgICBpZiAoIXJvdykgcmV0dXJuO1xuICAgIGNvbnN0IGlkID0gcm93LmdldEF0dHJpYnV0ZSgnZGF0YS1jb21wLWlkJyk7XG4gICAgaWYgKCFpZCkgcmV0dXJuO1xuICAgIHNlbGVjdGVkSWQgPSBpZDtcbiAgICBjb25zdCBjb21wID0gY29tcHMuZmluZChjID0+IGMuaWQgPT09IGlkKTtcbiAgICBpZiAoY29tcCkgc2hvd0VkaXRvcihjb21wKTtcbiAgICByZW5kZXJMaXN0KCgkPEhUTUxJbnB1dEVsZW1lbnQ+KCdhZG1pbi1jb21wLWZpbHRlcicpPy52YWx1ZSkgfHwgJycpO1xuICB9KTtcblxuICAkKCdhZG1pbi1uZXctY29tcCcpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBzZWxlY3RlZElkID0gbnVsbDtcbiAgICBzaG93RWRpdG9yKG51bGwpO1xuICB9KTtcblxuICAkKCdhZG1pbi1lZGl0b3ItZm9ybScpPy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBoYW5kbGVTYXZlIGFzIGFueSk7XG4gICQoJ2FkbWluLWRlbGV0ZScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZURlbGV0ZSk7XG5cbiAgY29uc3Qgcm9zdGVyRWwgPSAkKCdhZG1pbi1yb3N0ZXInKTtcbiAgY29uc3QgYm9hcmRFbCA9ICQoJ2FkbWluLWJvYXJkJyk7XG4gIGlmIChyb3N0ZXJFbCAmJiBib2FyZEVsKSBib2FyZCA9IG5ldyBCb2FyZEVkaXRvcihyb3N0ZXJFbCwgYm9hcmRFbCwgKCkgPT4geyAvKiByZWFkIG9uIHNhdmUgKi8gfSk7XG4gICQoJ2JvYXJkLXN5bmMtdW5pdHMnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzeW5jVW5pdHNGcm9tQm9hcmQpO1xuICAkKCdlZGl0aW9uLXNhdmUnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVFZGl0aW9uU2F2ZSk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgYm9vdCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=