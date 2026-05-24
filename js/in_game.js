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

/***/ "./src/data/assetUrls.ts":
/*!*******************************!*\
  !*** ./src/data/assetUrls.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTraitIconUrl = exports.getAugmentIconUrl = exports.getComponentIconUrl = exports.getItemIconUrl = exports.getChampionIconUrl = void 0;
const champions_1 = __webpack_require__(/*! ./set17/champions */ "./src/data/set17/champions.ts");
const GAME_DATA_BASE = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default';
const GAME_BASE = 'https://raw.communitydragon.org/latest/game';
function getChampionIconUrl(championId) {
    const champ = champions_1.championMap.get(championId);
    if (!champ || !champ.tileIcon)
        return '';
    return `${GAME_BASE}/${champ.tileIcon.toLowerCase()}`;
}
exports.getChampionIconUrl = getChampionIconUrl;
const itemCdnPaths = {
    'infinity-edge': 'TFT_Item_InfinityEdge.TFT_Set13.png',
    'bloodthirster': 'TFT_Item_Bloodthirster.TFT_Set13.png',
    'giant-slayer': 'TFT_Item_MadredsBloodrazor.TFT_Set13.png',
    'hextech-gunblade': 'TFT_Item_HextechGunblade.TFT_Set13.png',
    'edge-of-night': 'TFT_Item_GuardianAngel.TFT_Set13.png',
    'deathblade': 'TFT_Item_Deathblade.TFT_Set13.png',
    'zekes-herald': 'TFT_Item_ZekesHerald.TFT_Set13.png',
    'blue-buff': 'TFT_Item_BlueBuff.TFT_Set13.png',
    'guinsoos-rageblade': 'TFT_Item_GuinsoosRageblade.TFT_Set13.png',
    'statikk-shiv': 'TFT_Item_StatikkShiv.TFT_Set13.png',
    'titans-resolve': 'TFT_Item_TitansResolve.TFT_Set13.png',
    'runaans-hurricane': 'TFT_Item_RunaansHurricane.TFT_Set13.png',
    'rapid-firecannon': 'TFT_Item_RapidFireCannon.TFT_Set13.png',
    'last-whisper': 'TFT_Item_LastWhisper.TFT_Set13.png',
    'hand-of-justice': 'TFT_Item_UnstableConcoction.TFT_Set13.png',
    'jeweled-gauntlet': 'TFT_Item_JeweledGauntlet.TFT_Set13.png',
    'rabadons-deathcap': 'TFT_Item_RabadonsDeathcap.TFT_Set13.png',
    'morellonomicon': 'TFT_Item_Morellonomicon.TFT_Set13.png',
    'ionic-spark': 'TFT_Item_IonicSpark.TFT_Set13.png',
    'archangels-staff': 'TFT_Item_ArchangelsStaff.TFT_Set13.png',
    'nashors-tooth': 'TFT_Item_Leviathan.TFT_Set13.png',
    'bramble-vest': 'TFT_Item_BrambleVest.TFT_Set13.png',
    'gargoyle-stoneplate': 'TFT_Item_GargoyleStoneplate.TFT_Set13.png',
    'sunfire-cape': 'TFT_Item_RedBuff.TFT_Set13.png',
    'guardbreaker': 'TFT_Item_PowerGauntlet.TFT_Set13.png',
    'dragons-claw': 'TFT_Item_DragonsClaw.TFT_Set13.png',
    'quicksilver': 'TFT_Item_Quicksilver.TFT_Set13.png',
    'redemption': 'TFT_Item_SpiritVisageRR.TFT_TFT14_5.png',
    'crownguard': 'TFT_Item_Crownguard.TFT_Set13.png',
    'warmogs-armor': 'TFT_Item_WarmogsArmor.TFT_Set13.png',
    'thiefs-gloves': 'TFT_Item_ThiefsGloves.TFT_Set13.png',
    'spear-of-shojin': 'TFT_Item_SpearOfShojin.TFT_Set13.png',
    'adaptive-helm': 'TFT_Item_AdaptiveHelm.TFT_Set13.png',
    'steadfast-heart': 'TFT_Item_NightHarvester.TFT_Set13.png',
    'frozen-heart': 'TFT_Item_FrozenHeart.TFT_Set13.png',
};
const items_1 = __webpack_require__(/*! ./set17/items */ "./src/data/set17/items.ts");
const ITEM_ICON_PATH = 'assets/maps/tft/icons/items/hexcore';
function getItemIconUrl(itemId) {
    const item = items_1.itemMap.get(itemId);
    if (item && item.icon) {
        return `${GAME_BASE}/${item.icon.toLowerCase().replace('.tex', '.png')}`;
    }
    const filename = itemCdnPaths[itemId];
    if (!filename)
        return '';
    return `${GAME_DATA_BASE}/${ITEM_ICON_PATH}/${filename.toLowerCase()}`;
}
exports.getItemIconUrl = getItemIconUrl;
const componentCdnPaths = {
    'bf-sword': 'TFT_Item_BFSword.TFT_Set13.png',
    'recurve-bow': 'TFT_Item_RecurveBow.TFT_Set13.png',
    'needlessly-large-rod': 'TFT_Item_NeedlesslyLargeRod.TFT_Set13.png',
    'tear-of-goddess': 'TFT_Item_TearOfTheGoddess.TFT_Set13.png',
    'chain-vest': 'TFT_Item_ChainVest.TFT_Set13.png',
    'negatron-cloak': 'TFT_Item_NegatronCloak.TFT_Set13.png',
    'giants-belt': 'TFT_Item_GiantsBelt.TFT_Set13.png',
    'sparring-gloves': 'TFT_Item_SparringGloves.TFT_Set13.png',
    'spatula': 'TFT_Item_Spatula.TFT_Set13.png',
    'frying-pan': 'TFT_Item_FryingPan.TFT_Set13.png',
};
function getComponentIconUrl(componentId) {
    const filename = componentCdnPaths[componentId];
    if (!filename)
        return '';
    return `${GAME_DATA_BASE}/${ITEM_ICON_PATH}/${filename.toLowerCase()}`;
}
exports.getComponentIconUrl = getComponentIconUrl;
function getAugmentIconUrl(iconPath) {
    if (!iconPath)
        return '';
    const path = iconPath.toLowerCase().replace('.tex', '.png');
    return `${GAME_BASE}/${path}`;
}
exports.getAugmentIconUrl = getAugmentIconUrl;
function getTraitIconUrl(iconPath) {
    if (!iconPath)
        return '';
    const path = iconPath.toLowerCase().replace('.tex', '.png');
    return `${GAME_BASE}/${path}`;
}
exports.getTraitIconUrl = getTraitIconUrl;


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

/***/ "./src/data/set17/items.ts":
/*!*********************************!*\
  !*** ./src/data/set17/items.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getItemsFromComponent = exports.buildCraftingMatrix = exports.getCraftableItem = exports.itemByApiName = exports.itemMap = exports.items = exports.components = void 0;
exports.components = [
    {
        "id": "chain-vest",
        "name": "Chain Vest",
        "stat": "+@Armor@ Armor"
    },
    {
        "id": "recurve-bow",
        "name": "Recurve Bow",
        "stat": "+@AS@% Attack Speed"
    },
    {
        "id": "tear-of-goddess",
        "name": "Tear of the Goddess",
        "stat": "+@ManaRegen@ Mana Regen"
    },
    {
        "id": "negatron-cloak",
        "name": "Negatron Cloak",
        "stat": "+@MagicResist@ Magic Resist"
    },
    {
        "id": "sparring-gloves",
        "name": "Sparring Gloves",
        "stat": "+@CritChance@ Critical Strike Chance"
    },
    {
        "id": "spatula",
        "name": "Spatula",
        "stat": "It must do something..."
    },
    {
        "id": "bf-sword",
        "name": "B.F. Sword",
        "stat": "+@AD*100@% Attack Damage"
    },
    {
        "id": "giants-belt",
        "name": "Giant's Belt",
        "stat": "+@Health@ Health"
    },
    {
        "id": "needlessly-large-rod",
        "name": "Needlessly Large Rod",
        "stat": "+@AP@ Ability Power"
    },
    {
        "id": "frying-pan",
        "name": "Frying Pan",
        "stat": "...why else would it be here?"
    }
];
exports.items = [
    {
        "id": "rabadons-deathcap",
        "apiName": "TFT_Item_RabadonsDeathcap",
        "name": "Rabadon's Deathcap",
        "components": [
            "needlessly-large-rod",
            "needlessly-large-rod"
        ],
        "type": "normal",
        "stats": "This humble hat can help you make, or unmake, the world itself.@TFTUnitProperty.:TFT_Augment_DeadlierCaps_TRAKey@",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_RabadonsDeathcap.TFT_Set13.tex"
    },
    {
        "id": "artifact-item",
        "apiName": "TFT17_MarketOffering_DelayedRandomArtifact",
        "name": "Artifact Item",
        "components": [],
        "type": "artifact",
        "stats": "After @Delay@ rounds, gain a random Artifact.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/DoubleUp_AssistArmory_RandomItem_Ornn.tex"
    },
    {
        "id": "tome-of-traits",
        "apiName": "TFT17_MarketOffering_TomeOfTraits",
        "name": "Tome of Traits",
        "components": [],
        "type": "emblem",
        "stats": "Drag this Tome to the Shop to open an Armory full of emblems! You will have 30 seconds to choose.",
        "icon": "ASSETS/Characters/TFT5_EmblemArmoryKey/HUD/TFT5_EmblemArmoryKey_Square.tex"
    },
    {
        "id": "god-artifact-anvil",
        "apiName": "TFT17_MarketOffering_ArtifactAnvil",
        "name": "God Artifact Anvil",
        "components": [],
        "type": "artifact",
        "stats": "Drag this to the Shop to open an Armory full of God Artifact items! You will have 30 seconds to choose.",
        "icon": "ASSETS/Characters/TFT_ArmoryKeyOrnn/HUD/TFT_ArmoryKeyOrnn_Square.tex"
    },
    {
        "id": "random-emblem",
        "apiName": "TFT17_MarketOffering_RandomEmblem",
        "name": "Random Emblem",
        "components": [],
        "type": "emblem",
        "stats": "Gain a random Emblem. Lose @HealthLoss@ Tactician health.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_CarouselMarket_Sacrifice.TFT_Set17.tex"
    },
    {
        "id": "malware-matrix",
        "apiName": "TFT17_Item_PsyOps_ChemicalCapacitorMod_Radiant",
        "name": "Malware Matrix",
        "components": [],
        "type": "radiant",
        "stats": "Dealing physical damage to an enemy reduces the target's Armor by @ResistReduce@. (Ability Damage Cooldown: @Cooldown@ seconds)At (4): If the holder is Psionic, every @NumAttacks@rd attack cleaves, dealing @CleaveDamage@&nbsp;() physical damage to nearby enemies.Recommended users: Master Yi and Pyke.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_PsyOps_Mod_ChemicalCapacitorMod.TFT_Set17.tex"
    },
    {
        "id": "drone-uplink",
        "apiName": "TFT17_Item_PsyOps_DroneMod_Radiant",
        "name": "Drone Uplink",
        "components": [],
        "type": "radiant",
        "stats": "A drone repeats @DamageRepeat@% of damage from the holder's attacks and Abilities to the same targets every @Interval@ seconds.At (4): If the holder is Psionic, gain an additional mini-drone that repeats @SecondDroneDamageRepeat*100@% of damage.Recommended users: Sona and Viktor.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_PsyOps_Mod_DroneMod.TFT_Set17.tex"
    },
    {
        "id": "semiconductor",
        "apiName": "TFT17_Item_PsyOps_SemiconductorMod_Radiant",
        "name": "Semiconductor",
        "components": [],
        "type": "radiant",
        "stats": "Every @AttacksToLaunch@ attacks and every @AttacksToReceive@ times being attacked, zap the @NumEnemies@ nearest enemies, dealing @PctHealthDamage*100@% of enemy Health as magic damage.Recommended users: Gragas and Master Yi.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_PsyOps_Mod_SemiconductorMod.TFT_Set17.tex"
    },
    {
        "id": "target-lock-optics",
        "apiName": "TFT17_Item_PsyOps_TargetlockMod_Radiant",
        "name": "Target-Lock Optics",
        "components": [],
        "type": "radiant",
        "stats": "The holder's first attack on each enemy deals @AttackPct@&nbsp;() additional damage.At (4): If the holder is Psionic, they heal @HealPct*100@% of their max Health whenever their target dies.Recommended users: Pyke and Master Yi",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_PsyOps_Mod_TargetLockMod.TFT_Set17.tex"
    },
    {
        "id": "biomatter-preserver",
        "apiName": "TFT17_Item_PsyOps_GrenadeMod_Radiant",
        "name": "Biomatter Preserver",
        "components": [],
        "type": "radiant",
        "stats": "Gain @PctMaxHP*100%@% max Health and deploy @NumGrenades@ Life Orbs. Every @Interval@ seconds of combat, one drops restoring @HealPct*100@% of the holder's missing Health.At (4): If the holder is Psionic, they gain @IncreasedHealing*100@% increased healing from all sources.Recommended user: Gragas.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_PsyOps_Mod_GrenadeMod.TFT_Set17.tex"
    },
    {
        "id": "sympathetic-implant",
        "apiName": "TFT17_Item_PsyOps_SympatheticImplantMod_Radiant",
        "name": "Sympathetic Implant",
        "components": [],
        "type": "radiant",
        "stats": "Every @Interval@ seconds, gain @ManaRegenOverTime@ additional Mana Per Second. At (4): If the holder is Psionic, their abilities deal @TrueDamageConversion*100@% of their ability damage as true damage instead.Recommended users: Sona and Viktor.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_PsyOps_Mod_SympatheticImplantMod.TFT_Set17.tex"
    },
    {
        "id": "zekes-bleak-herald",
        "apiName": "TFT17_Item_Artifact_ZekesHeraldShadow",
        "name": "Zeke's Bleak Herald",
        "components": [],
        "type": "artifact",
        "stats": "When combat begins, the holder reduces the Attack Speed of all allies within @HexRange@ hexes in the same row by  @AttackSpeedReduction@%. The holder then gains  @AttackSpeed@% Attack Speed for each affected ally.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Shadow/S_Zekes_Herald.tex"
    },
    {
        "id": "ornn",
        "apiName": "TFT11_ChampionItem_Ornn",
        "name": "Ornn",
        "components": [],
        "type": "artifact",
        "stats": "Ornn",
        "icon": "ASSETS/UX/TFT/ChampionSplashes/TFT11_Ornn_Square.tex"
    },
    {
        "id": "solar-eclipse",
        "apiName": "TFT17_AnimaSquadItem_Tier3_RadiantField",
        "name": "Solar Eclipse",
        "components": [],
        "type": "radiant",
        "stats": "Gain @HealthPercent*100@% max Health. Every second, deal magic damage in a @HexRadiusBase@&nbsp;hex radius equal to @HealthRatio*100@% of the holder's max Health, and gain max Health equal to @DamageToHealthConversion*100@% of damage dealt. Radius increases every @Period@ seconds.Recommended Roles: Attack or Magic Tank",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_AnimaSquadItem_RadiantField_T3.TFT_Set17.tex"
    },
    {
        "id": "radiant-field",
        "apiName": "TFT17_AnimaSquadItem_Tier2_RadiantField",
        "name": "Radiant Field",
        "components": [],
        "type": "radiant",
        "stats": "Gain @HealthPercent*100@% max health. Every second, deal magic damage in a @HexRadiusBase@-hex radius equal to @HealthRatio*100@% of the holder's max Health. Radius increases every @Period@ seconds.Recommended Roles: Attack or Magic Tank",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_AnimaSquadItem_RadiantField_T2.TFT_Set17.tex"
    },
    {
        "id": "open-an-artifact-armory",
        "apiName": "TFT11_Encounter_ChoiceItem_ArtifactArmory",
        "name": "Open an Artifact Armory.",
        "components": [],
        "type": "artifact",
        "stats": "",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex"
    },
    {
        "id": "spend-22-gold-gain-an-artifact-anvil",
        "apiName": "TFT11_Encounter_ChoiceItem_BuyExpensiveArtifact",
        "name": "Spend 22 gold. Gain an Artifact anvil.",
        "components": [],
        "type": "artifact",
        "stats": "",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/ChoiceUI/ADMIN_Armorery_Icon.tex"
    },
    {
        "id": "tftitemnameset5cavalierradiantspat",
        "apiName": "TFT5_Item_CavalierSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Cavalier_RadiantSpat",
        "components": [
            "TFT5_Item_ChainVestShadow",
            "TFT5_Item_SpatulaRadiant"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Cavalier_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Cavalier_Radiant.tex"
    },
    {
        "id": "tftitemnameset5nightbringerradiantspat",
        "apiName": "TFT5_Item_NightbringerSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Nightbringer_RadiantSpat",
        "components": [
            "TFT5_Item_SpatulaRadiant",
            "TFT5_Item_GiantsBeltShadow"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Nightbringer_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Nightbringer_Radiant.tex"
    },
    {
        "id": "tftitemnameset5abominationradiantspat",
        "apiName": "TFT5_Item_AbominationSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Abomination_RadiantSpat",
        "components": [
            "TFT5_Item_SparringGlovesShadow",
            "TFT5_Item_SpatulaRadiant"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Abomination_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Abomination_Radiant.tex"
    },
    {
        "id": "tftitemnameset5spellweaverradiantspat",
        "apiName": "TFT5_Item_SpellweaverSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Spellweaver_RadiantSpat",
        "components": [
            "needlessly-large-rod",
            "TFT5_Item_SpatulaRadiant"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Spellweaver_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Spellweaver_Radiant.tex"
    },
    {
        "id": "tftitemnameset5skirmisherradiantspat",
        "apiName": "TFT5_Item_SkirmisherSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Skirmisher_RadiantSpat",
        "components": [
            "TFT5_Item_SpatulaRadiant",
            "bf-sword"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Skirmisher_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Skirmisher_Radiant.tex"
    },
    {
        "id": "tftitemnameset5dawnbringerradiantspat",
        "apiName": "TFT5_Item_DawnbringerSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Dawnbringer_RadiantSpat",
        "components": [
            "giants-belt",
            "TFT5_Item_SpatulaRadiant"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Dawnbringer_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Dawnbringer_Radiant.tex"
    },
    {
        "id": "tftitemnameset5assassinradiantspat",
        "apiName": "TFT5_Item_AssassinSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Assassin_RadiantSpat",
        "components": [
            "sparring-gloves",
            "TFT5_Item_SpatulaRadiant"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Assassin_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Assassin_Radiant.tex"
    },
    {
        "id": "tftitemnameset5covenradiantspat",
        "apiName": "TFT5_Item_CovenSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Coven_RadiantSpat",
        "components": [
            "TFT5_Item_TearOfTheGoddessShadow",
            "TFT5_Item_SpatulaRadiant"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Coven_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Coven_Radiant.tex"
    },
    {
        "id": "tftitemnameset5redeemedradiantspat",
        "apiName": "TFT5_Item_RedeemedSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Redeemed_RadiantSpat",
        "components": [
            "negatron-cloak",
            "TFT5_Item_SpatulaRadiant"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Redeemed_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Redeemed_Radiant.tex"
    },
    {
        "id": "tftitemnameset5hellionradiantspat",
        "apiName": "TFT5_Item_HellionSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Hellion_RadiantSpat",
        "components": [
            "TFT5_Item_RecurveBowShadow",
            "TFT5_Item_SpatulaRadiant"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Hellion_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Hellion_Radiant.tex"
    },
    {
        "id": "tftitemnameset5forgottenradiantspat",
        "apiName": "TFT5_Item_ForgottenSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Forgotten_RadiantSpat",
        "components": [
            "TFT5_Item_SpatulaRadiant",
            "TFT5_Item_BFSwordShadow"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Forgotten_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Forgotten_Radiant.tex"
    },
    {
        "id": "tftitemnameset5renewerradiantspat",
        "apiName": "TFT5_Item_RenewerSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Renewer_RadiantSpat",
        "components": [
            "TFT5_Item_SpatulaRadiant",
            "tear-of-goddess"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Renewer_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Renewer_Radiant.tex"
    },
    {
        "id": "tftitemnameset5revenantradiantspat",
        "apiName": "TFT5_Item_RevenantSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Revenant_RadiantSpat",
        "components": [
            "TFT5_Item_NegatronCloakShadow",
            "TFT5_Item_SpatulaRadiant"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Revenant_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Revenant_Radiant.tex"
    },
    {
        "id": "tftitemnameset5legionnaireradiantspat",
        "apiName": "TFT5_Item_LegionnaireSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Legionnaire_RadiantSpat",
        "components": [
            "recurve-bow",
            "TFT5_Item_SpatulaRadiant"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Legionnaire_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Legionnaire_Radiant.tex"
    },
    {
        "id": "tftitemnameset5ironcladradiantspat",
        "apiName": "TFT5_Item_IroncladSpatulaItem_Radiant",
        "name": "tft_item_name_Set5Ironclad_RadiantSpat",
        "components": [
            "chain-vest",
            "TFT5_Item_SpatulaRadiant"
        ],
        "type": "radiant",
        "stats": "tft_item_description_Set5Ironclad_RadiantSpat",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set5/Ironclad_Radiant.tex"
    },
    {
        "id": "infinity-edge",
        "apiName": "TFT_Item_InfinityEdge",
        "name": "Infinity Edge",
        "components": [
            "bf-sword",
            "sparring-gloves"
        ],
        "type": "normal",
        "stats": "Gain Precision.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_InfinityEdge.TFT_Set13.tex"
    },
    {
        "id": "radiant-dragons-claw",
        "apiName": "TFT5_Item_DragonsClawRadiant",
        "name": "Radiant Dragon's Claw",
        "components": [],
        "type": "radiant",
        "stats": "Gain @PercentMaxHP*100@% max health.Every @HealthRegenInterval@ seconds, heal @PercentHealthDamage@% max Health.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_DragonsClawRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-strikers-flail",
        "apiName": "TFT5_Item_TrapClawRadiant",
        "name": "Radiant Striker's Flail",
        "components": [],
        "type": "radiant",
        "stats": "Critical Strikes grant @BuffDamageAmp*100@% Damage Amp for @Duration@ seconds, stacking up to @MaxStacks@ times.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_TrapClawRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-ionic-spark",
        "apiName": "TFT5_Item_IonicSparkRadiant",
        "name": "Radiant Ionic Spark",
        "components": [],
        "type": "radiant",
        "stats": "@MRShred@% Shred enemies within @HexRange@ hexes. When enemies cast an Ability, deal magic damage equal to @ManaRatio@% of the Mana spent.[Direct damage item]Shred: Reduce Magic Resist",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_IonicSparkRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-quicksilver",
        "apiName": "TFT5_Item_QuicksilverRadiant",
        "name": "Radiant Quicksilver",
        "components": [],
        "type": "radiant",
        "stats": "Combat Start: Gain immunity to crowd control for @SpellShieldDuration@ seconds.Gain @ProcAttackSpeed*100@% stacking Attack Speed every second.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_QuicksilverRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-hextech-gunblade",
        "apiName": "TFT5_Item_HextechGunbladeRadiant",
        "name": "Radiant Hextech Gunblade",
        "components": [],
        "type": "radiant",
        "stats": "Heal the lowest percent Health ally for @AllyHealing*100@% of damage dealt.Ally Healing: @TFTUnitProperty.item:TFT_Tracker_Value1@",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_HextechGunbladeRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-void-staff",
        "apiName": "TFT5_Item_StatikkShivRadiant",
        "name": "Radiant Void Staff",
        "components": [],
        "type": "radiant",
        "stats": "Damage from attacks and Abilities @MRShred@% Shred the target for the rest of combat. This effect does not stack.Shred: Reduce Magic Resist",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_VoidStaffRadiant.TFT_Set17.tex"
    },
    {
        "id": "radiant-protectors-vow",
        "apiName": "TFT5_Item_FrozenHeartRadiant",
        "name": "Radiant Protector's Vow",
        "components": [],
        "type": "radiant",
        "stats": "Combat Start: Gain @CombatStartMana@ Mana.At @HealthThreshold@% Health, gain @TriggerMana@ Mana and a Shield equal to @ShieldHealthPercent@% max Health.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_FrozenHeartRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-blue-buff",
        "apiName": "TFT5_Item_BlueBuffRadiant",
        "name": "Radiant Blue Buff",
        "components": [],
        "type": "radiant",
        "stats": "Gain @ModifiedADAP*100@% additional Attack Damage and Ability Power from all sources.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_BlueBuffRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-archangels-staff",
        "apiName": "TFT5_Item_ArchangelsStaffRadiant",
        "name": "Radiant Archangel's Staff",
        "components": [],
        "type": "radiant",
        "stats": "Combat start: Gain @APPerInterval@% Ability Power every @IntervalSeconds@ seconds in combat.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_ArchangelsStaffRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-morellonomicon",
        "apiName": "TFT5_Item_MorellonomiconRadiant",
        "name": "Radiant Morellonomicon",
        "components": [],
        "type": "radiant",
        "stats": "Attacks and Abilities deal @BurnPercent@% Burn and @GrievousWoundsPercent@% Wound to enemies for @BurnDuration@ seconds.Burn: Deals a percent of the target's max Health as true damage every secondWound: Reduces healing received",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_MorellonomiconRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-bramble-vest",
        "apiName": "TFT5_Item_BrambleVestRadiant",
        "name": "Radiant Bramble Vest",
        "components": [],
        "type": "radiant",
        "stats": "Gain @PercentMaxHP*100@% max health.Take @AutoDamageReduction*100@% reduced damage from attacks. When struck by any attack, deal @1StarAoEDamage@ magic damage to all adjacent enemies.Cooldown: @ICD@ seconds",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_BrambleVestRadiant.TFT_Set13.tex"
    },
    {
        "id": "zzrot-portal",
        "apiName": "TFT5_Item_ZzRotPortalRadiant",
        "name": "Zz'Rot Portal",
        "components": [],
        "type": "radiant",
        "stats": "Summon a large Voidspawn. Its strength increases with each Stage.​​[Support item][Unique - only 1 per champion]",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_ZzRotPortalRadiant.TFT_Set13.tex"
    },
    {
        "id": "shroud-of-reverence",
        "apiName": "TFT5_Item_ShroudOfStillnessRadiant",
        "name": "Shroud of Reverence",
        "components": [],
        "type": "radiant",
        "stats": "Combat start: Shoot a wider beam that @CostIncrease@% Mana Reaves enemies.Your team gains  @AllyBonusMana@ starting Mana.[Unique - only 1 per champion]Mana Reave: increase maximum Mana until the next cast",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Shroud_of_Stillness_Radiant.tex"
    },
    {
        "id": "radiant-krakens-fury",
        "apiName": "TFT5_Item_RunaansHurricaneRadiant",
        "name": "Radiant Kraken's Fury",
        "components": [],
        "type": "radiant",
        "stats": "Attacks grant @ADOnAttack*100@% stacking Attack Damage, up to @MaxStacks@ attacks. After @MaxStacks@ attacks, gain @ASCapstone*100@% Attack Speed.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_KrakenSlayerRadiant.TFT_TFT14_5.tex"
    },
    {
        "id": "mistral",
        "apiName": "TFT5_Item_ZephyrRadiant",
        "name": "Mistral",
        "components": [],
        "type": "radiant",
        "stats": "Combat start: Summon a whirlwind on the opposite side of the arena that removes the closest enemy from combat for @BanishDuration@ seconds.Your team gains  @AllyBonusAS@% Attack Speed.[Ignores crowd control immunity.][Unique - only 1 per champion]",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Zephyr_Radiant.tex"
    },
    {
        "id": "radiant-guinsoos-rageblade",
        "apiName": "TFT5_Item_GuinsoosRagebladeRadiant",
        "name": "Radiant Guinsoo's Rageblade",
        "components": [],
        "type": "radiant",
        "stats": "Gain @AttackSpeedPerStack@% stacking Attack Speed every second.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_GuinsoosRagebladeRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-hand-of-justice",
        "apiName": "TFT5_Item_HandOfJusticeRadiant",
        "name": "Radiant Hand of Justice",
        "components": [],
        "type": "radiant",
        "stats": "Gain 2 effects:@AD_NotStatBar*100@% Attack Damage and @AP_NotStatBar@% Ability Power.@StatOmnivamp_NotStatBar*100@% Omnivamp.While above @HealthThreshold*100@% health, double the Attack Damage and Ability Power. While below @HealthThreshold*100@% Health, double the Omnivamp.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_HandOfJusticeRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-sunfire-cape",
        "apiName": "TFT5_Item_SunfireCapeRadiant",
        "name": "Radiant Sunfire Cape",
        "components": [],
        "type": "radiant",
        "stats": "Gain @BonusPercentHP*100@% max Health.Every @ICD@ seconds, deal @BurnPercent@% Burn and @GrievousWoundsPercent@% Wound to an enemy within @HexRange@ hexes for @BurnDuration@ seconds.Burn: Deals a percent of the target's max Health as true damage every secondWound: reduces healing received",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_SunfireCapeRadiant.TFT_Set13.tex"
    },
    {
        "id": "zekes-harmony",
        "apiName": "TFT5_Item_ZekesHeraldRadiant",
        "name": "Zeke's Harmony",
        "components": [],
        "type": "radiant",
        "stats": "Combat start: Grant  @AttackSpeed@% Attack Speed and @Lifesteal@% Omnivamp to the holder and allies within 1 hex in the same row.​​Omnivamp: heal for some of damage dealt",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Zekes_Herald_Radiant.tex"
    },
    {
        "id": "radiant-last-whisper",
        "apiName": "TFT5_Item_LastWhisperRadiant",
        "name": "Radiant Last Whisper",
        "components": [],
        "type": "radiant",
        "stats": "Damage from attacks and Abilities @ArmorReductionPercent@% Sunder the target for the rest of combat. This effect does not stack.Sunder: Reduce Armor",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_LastWhisperRadiant.TFT_Set13.tex"
    },
    {
        "id": "locket-of-targon-prime",
        "apiName": "TFT5_Item_LocketOfTheIronSolariRadiant",
        "name": "Locket of Targon Prime",
        "components": [],
        "type": "radiant",
        "stats": "Combat start: Shields the holder and allies within @HexRange@ hexes in the same row for @1StarShieldValue@/@2StarShieldValue@/@3StarShieldValue@  damage for @ShieldDuration@ seconds.Your team gains  @BonusAllyHealth@ Health.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Locket_of_the_Iron_Solari_Radiant.tex"
    },
    {
        "id": "radiant-thiefs-gloves",
        "apiName": "TFT5_Item_ThiefsGlovesRadiant",
        "name": "Radiant Thief's Gloves",
        "components": [],
        "type": "radiant",
        "stats": "Each round: Equip 2 random Radiant items.[Consumes 3 item slots.]@TFTUnitProperty.:TFT_BindOnEquipTRA@",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_ThiefsGlovesRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-warmogs-armor",
        "apiName": "TFT5_Item_WarmogsArmorRadiant",
        "name": "Radiant Warmog's Armor",
        "components": [],
        "type": "radiant",
        "stats": "Gain @BonusPercentHP*100@% max Health.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_WarmogsArmorRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-steraks-gage",
        "apiName": "TFT5_Item_SteraksGageRadiant",
        "name": "Radiant Sterak's Gage",
        "components": [],
        "type": "radiant",
        "stats": "At @HealthThreshold@% Health, gain a Shield equal to @PercentHealthShield*100@% of the wearer's maximum Health that rapidly decays over @ShieldDuration@ seconds.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_SteraksGageRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-spirit-visage",
        "apiName": "TFT5_Item_RedemptionRadiant",
        "name": "Radiant Spirit Visage",
        "components": [],
        "type": "radiant",
        "stats": "Regenerate @MissingHealthHeal*100@% of missing Health each second.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_SpiritVisageRR.TFT_TFT14_5.tex"
    },
    {
        "id": "radiant-edge-of-night",
        "apiName": "TFT5_Item_GuardianAngelRadiant",
        "name": "Radiant Edge of Night",
        "components": [],
        "type": "radiant",
        "stats": "At @HealthThreshold@% Health, briefly become untargetable, shed negative effects, and heal all missing health.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_GuardianAngelRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-red-buff",
        "apiName": "TFT5_Item_RapidFirecannonRadiant",
        "name": "Radiant Red Buff",
        "components": [],
        "type": "radiant",
        "stats": "Attacks and Abilities @BurnPercent@% Burn and @HealingReductionPct@% Wound enemies for @Duration@ seconds.Burn: Deals a percent of the target's max Health as true damage every secondWound: Reduces healing received",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_RapidFirecannonRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-steadfast-heart",
        "apiName": "TFT5_Item_NightHarvesterRadiant",
        "name": "Radiant Steadfast Heart",
        "components": [],
        "type": "radiant",
        "stats": "Gain @BaseDurability*100@% durability. While above @ThresholdForEmpower*100@% Health, instead gain @EmpoweredDurability*100@% Durability.@TFTUnitProperty.:TFT_Augment_WarmogsBuckle_TRAKey@",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_NightHarvesterRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-titans-resolve",
        "apiName": "TFT5_Item_TitansResolveRadiant",
        "name": "Radiant Titan's Resolve",
        "components": [],
        "type": "radiant",
        "stats": "Gain @StackingAD*100@% Attack Damage and @StackingSP@% Ability Power when attacking or taking damage, stacking up to @StackCap@ times.At full stacks, gain @StackedAmp*100@% Damage Amp and gain immunity to crowd control.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_TitansResolveRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-giant-slayer",
        "apiName": "TFT5_Item_GiantSlayerRadiant",
        "name": "Radiant Giant Slayer",
        "components": [],
        "type": "radiant",
        "stats": "Gain @DamageAmp*100@% additional Damage Amp against Tanks.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_GiantSlayerRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-crownguard",
        "apiName": "TFT5_Item_CrownguardRadiant",
        "name": "Radiant Crownguard",
        "components": [],
        "type": "radiant",
        "stats": "Combat Start: Gain a @ShieldSize@% max Health Shield for @ShieldDuration@ seconds.When the Shield expires, gain @ShieldBonusAP@% Ability Power.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_CrownguardRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-bloodthirster",
        "apiName": "TFT5_Item_BloodthirsterRadiant",
        "name": "Radiant Bloodthirster",
        "components": [],
        "type": "radiant",
        "stats": "Once per combat: At @HealthThreshold@% Health, gain a @ShieldHealthPercent@% max Health Shield that lasts up to @ShieldDuration@ seconds.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_BloodthirsterRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-rabadons-deathcap",
        "apiName": "TFT5_Item_RabadonsDeathcapRadiant",
        "name": "Radiant Rabadon's Deathcap",
        "components": [],
        "type": "radiant",
        "stats": "It's witnessed - and unleashed - miracles and calamities both.@TFTUnitProperty.:TFT_Augment_DeadlierCaps_TRAKey@",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_RabadonsDeathcapRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-jeweled-gauntlet",
        "apiName": "TFT5_Item_JeweledGauntletRadiant",
        "name": "Radiant Jeweled Gauntlet",
        "components": [],
        "type": "radiant",
        "stats": "Gain Precision.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_JeweledGauntletRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-gargoyle-stoneplate",
        "apiName": "TFT5_Item_GargoyleStoneplateRadiant",
        "name": "Radiant Gargoyle Stoneplate",
        "components": [],
        "type": "radiant",
        "stats": "Gain @ArmorPerEnemy@ Armor and @MRPerEnemy@ Magic Resist for each enemy targeting the holder.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_GargoyleStoneplateRadiant.TFT_Set13.tex"
    },
    {
        "id": "chalice-of-charity",
        "apiName": "TFT5_Item_ChaliceOfPowerRadiant",
        "name": "Chalice of Charity",
        "components": [],
        "type": "radiant",
        "stats": "Combat start: Grant  @ChaliceAP@ Ability Power and @Spellvamp@% Omnivamp to the holder and allies within 1 hex in the same row.​​Omnivamp: heal for some of damage dealt",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Radiant/Chalice_of_Power_Radiant.tex"
    },
    {
        "id": "radiant-nashors-tooth",
        "apiName": "TFT5_Item_LeviathanRadiant",
        "name": "Radiant Nashor's Tooth",
        "components": [],
        "type": "radiant",
        "stats": "Attacks grant @BaseManaOnHit@ bonus Mana, increased to @ManaOnCrit@ if they critically strike.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_LeviathanRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-spear-of-shojin",
        "apiName": "TFT5_Item_SpearOfShojinRadiant",
        "name": "Radiant Spear of Shojin",
        "components": [],
        "type": "radiant",
        "stats": "Attacks grant @FlatManaRestore@ bonus Mana.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_SpearOfShojinRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-evenshroud",
        "apiName": "TFT5_Item_SpectralGauntletRadiant",
        "name": "Radiant Evenshroud",
        "components": [],
        "type": "radiant",
        "stats": "@ARReductionAmount@% Sunder enemies within @HexRange@ hexes. Gain @BonusResists@ Armor and Magic Resist for the first @BonusResistDuration@ seconds of combat.Sunder: Reduce Armor",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_SpectralGauntletRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-infinity-edge",
        "apiName": "TFT5_Item_InfinityEdgeRadiant",
        "name": "Radiant Infinity Edge",
        "components": [],
        "type": "radiant",
        "stats": "Gain Precision.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_InfinityEdgeRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-deathblade",
        "apiName": "TFT5_Item_DeathbladeRadiant",
        "name": "Radiant Deathblade",
        "components": [],
        "type": "radiant",
        "stats": "It glows in the presence of enemies. Or friends. Or anything alive, really.@TFTUnitProperty.:TFT_Augment_TragicalBlade_TRAKey@",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_DeathbladeRadiant.TFT_Set13.tex"
    },
    {
        "id": "radiant-adaptive-helm",
        "apiName": "TFT5_Item_AdaptiveHelmRadiant",
        "name": "Radiant Adaptive Helm",
        "components": [],
        "type": "radiant",
        "stats": "Gain an additional @ManaPercIncrease*100@% Mana from all sources. The wearer gains an additional bonus based on their Role:Tank/Fighter: Gain @FrontlineResists@ Armor and Magic Resistance.Marksman/Caster: Gain @BacklineADAP@% Attack Damage and Ability Power.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_AdaptiveHelmRadiant.TFT_Set13.tex"
    },
    {
        "id": "artifact-anvil",
        "apiName": "TFT_Item_GrantOrnnAnvil",
        "name": "Artifact Anvil",
        "components": [],
        "type": "artifact",
        "stats": "Artifact Anvil",
        "icon": "ASSETS/Characters/TFT_ArmoryKeyOrnn/HUD/Icons2D/TFT_ArmoryKeyOrnn_Square.tex"
    },
    {
        "id": "lesser-mirrored-persona",
        "apiName": "TFT_Item_Artifact_LesserMirroredPersona",
        "name": "Lesser Mirrored Persona",
        "components": [],
        "type": "artifact",
        "stats": "Share @StatSharePercent*100@% of the holder's bonus Attack Damage, Ability Power, Attack Speed, Armor, Magic Resist, and Health with other Mirrored Persona holders.Can't be ReforgedUnique: one per champion",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT16_Artifact_LesserMirroredPersona.TFT_Set16.tex"
    },
    {
        "id": "innervating-locket",
        "apiName": "TFT_Item_Artifact_InnervatingLocket",
        "name": "Innervating Locket",
        "components": [],
        "type": "artifact",
        "stats": "The holder gains @PercentMana@% of their total Mana whenever they're hit by an attack.Each cast restores @PercentHealth@% of the holder's max Health over @Duration@ seconds.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_InnervatingLocket.TFT_Set13.tex"
    },
    {
        "id": "3-cost-ornn",
        "apiName": "TFT17_ChampionItem_Chosen_Ornn",
        "name": "3-cost: Ornn",
        "components": [],
        "type": "artifact",
        "stats": "Space GrooveBastion",
        "icon": "ASSETS/Characters/TFT17_Ornn/HUD/TFT17_Ornn_Square.TFT_Set17.tex"
    },
    {
        "id": "protectors-vow",
        "apiName": "TFT_Item_FrozenHeart",
        "name": "Protector's Vow",
        "components": [
            "tear-of-goddess",
            "chain-vest"
        ],
        "type": "normal",
        "stats": "Combat Start: Gain @CombatStartMana@ Mana.At @HealthThreshold@% Health, gain @TriggerMana@ Mana and a Shield equal to @ShieldHealthPercent@% max Health.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_FrozenHeart.TFT_Set13.tex"
    },
    {
        "id": "the-indomitable",
        "apiName": "TFT_Item_Artifact_TheIndomitable",
        "name": "The Indomitable",
        "components": [],
        "type": "artifact",
        "stats": "The holder's Move Speed is drastically reduced.Gain @HealthPercBonus*100@% max Health, stun immunity, and pull the current target into melee range.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_TheIndomitable.TFT_TFT14_5.tex"
    },
    {
        "id": "hullcrusher",
        "apiName": "TFT9_Item_OrnnHullbreaker",
        "name": "Hullcrusher",
        "components": [],
        "type": "artifact",
        "stats": "Combat Start: If there are no adjacent allies, gain @ExtraHealth@ Health, @ExtraADandAP@% Attack Damage, and @ExtraADandAP@% Ability Power.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT9_OrnnItem_Hullbreaker.tex"
    },
    {
        "id": "spirit-visage",
        "apiName": "TFT_Item_Redemption",
        "name": "Spirit Visage",
        "components": [
            "tear-of-goddess",
            "giants-belt"
        ],
        "type": "normal",
        "stats": "Regenerate @MissingHealthHeal*100@% of missing Health each second.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_SpiritVisageRR.TFT_TFT14_5.tex"
    },
    {
        "id": "chonccs-prowlers-claw",
        "apiName": "TFT9_Item_OrnnDuskbladeOfDraktharr",
        "name": "Choncc's Prowler's Claw",
        "components": [],
        "type": "artifact",
        "stats": "Combat Start: Leap to the enemy backline. Damage from an Ability can critically strike.[Unique - only 1 per champion]",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT9_OrnnItem_ProwlersClaw.tex"
    },
    {
        "id": "shadow-puppet",
        "apiName": "TFT_Item_Artifact_ShadowPuppet",
        "name": "Shadow Puppet",
        "components": [],
        "type": "artifact",
        "stats": "Spawn a clone that copies the holder's items. The clone has @ClonePercentHealth*100@% max Health and deals @ClonePercentDamage*100@% damage.[Unique - only 1 per champion]",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT16_Artifact_ShadowPuppet.TFT_Set16.tex"
    },
    {
        "id": "ekkos-patience",
        "apiName": "TFT17_Item_Artifact_EkkoArtifact",
        "name": "Ekko's Patience",
        "components": [],
        "type": "artifact",
        "stats": "Total Ability damage is increased by @AbilityDA*100@%, but is dealt over @Duration@ seconds instead.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_Item_Artifact_EkkoPatience.TFT_Set17.tex"
    },
    {
        "id": "withered-relic",
        "apiName": "TFT_Item_Artifact_WitheringRelic",
        "name": "Withered Relic",
        "components": [],
        "type": "artifact",
        "stats": "Combat Start: Increase the holder's max Health by @FlatMaxHealth@ but keep their current Health the same.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_WitheringRelic.TFT_Set16.tex"
    },
    {
        "id": "manazane",
        "apiName": "TFT4_Item_OrnnMuramana",
        "name": "Manazane",
        "components": [],
        "type": "artifact",
        "stats": "After casting the first time in combat, gain @ManaRestore@ Mana over @ManaDuration@ seconds.[Unique - only 1 per champion]",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT4_Item_OrnnMuramana.TFT_Set13.tex"
    },
    {
        "id": "goldmancers-staff",
        "apiName": "TFT7_Item_ShimmerscaleGoldmancersStaff",
        "name": "Goldmancer's Staff",
        "components": [],
        "type": "artifact",
        "stats": "Grant  @AbilityPowerPerGold@ Ability Power per  gold in your bank (up to  @AbilityPowerGoldMax@ gold) and a @OnKillProcChance*100@% chance to drop  @OnKillProcGold@ gold on enemy kill.Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/GoldmancersStaff.tex"
    },
    {
        "id": "diamond-hands",
        "apiName": "TFT7_Item_ShimmerscaleDiamondHands_HR",
        "name": "Diamond Hands",
        "components": [],
        "type": "artifact",
        "stats": "Once per combat: At @HPThreshold1*100@% Health, become invulnerable for @BaseDamageImmunityTime@ seconds and grant  @GoldPerImmunityProc@ gold.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT10_DiamondHands.tex"
    },
    {
        "id": "tricksters-glass",
        "apiName": "TFT9_Item_OrnnTrickstersGlass",
        "name": "Trickster's Glass",
        "components": [],
        "type": "artifact",
        "stats": "Summon a clone with @HealthPercent@% base Health and +@ManaIncrease*100@% max Mana. You cannot equip items to the clone.The clone benefits from active traits[Unique - only 1 per champion]",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT9_Item_OrnnTrickstersGlass.TFT_Set13.tex"
    },
    {
        "id": "tacticians-cape",
        "apiName": "TFT_Item_TacticiansRing",
        "name": "Tactician's Cape",
        "components": [
            "spatula",
            "frying-pan"
        ],
        "type": "normal",
        "stats": "Your team gains +@MaxArmySizeIncrease@ max team size.@PercentGoldChance@% chance to drop 1 gold after @Timer@ seconds of combat.\"...and a bit of Luck.\"",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_TacticiansRing.TFT_Set13.tex"
    },
    {
        "id": "eternal-pact",
        "apiName": "TFT_Item_Artifact_EternalPact",
        "name": "Eternal Pact",
        "components": [],
        "type": "artifact",
        "stats": "Combat start: Form a pact with the highest Health allied champion, if they die, gain @ManaRegenToGrant@ Mana regen and @APToGrant@% Ability Power.When the ally uses their ability, gain @ManaToGrant@ Mana. Every @ShieldCadence@ seconds, shield your ally for @PercentAPShield*100@% of the holder's Ability Power.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT16_Artifact_EternalPact.TFT_Set16.tex"
    },
    {
        "id": "thiefs-gloves",
        "apiName": "TFT_Item_ThiefsGloves",
        "name": "Thief's Gloves",
        "components": [
            "sparring-gloves",
            "sparring-gloves"
        ],
        "type": "normal",
        "stats": "Each round: Equip 2 random items.[Consumes 3 item slots.]@TFTUnitProperty.:TFT_BindOnEquipTRA@",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_ThiefsGloves.TFT_Set13.tex"
    },
    {
        "id": "guinsoos-rageblade",
        "apiName": "TFT_Item_GuinsoosRageblade",
        "name": "Guinsoo's Rageblade",
        "components": [
            "recurve-bow",
            "needlessly-large-rod"
        ],
        "type": "normal",
        "stats": "Gain @AttackSpeedPerStack@% stacking Attack Speed every second.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_GuinsoosRageblade.TFT_Set13.tex"
    },
    {
        "id": "ionic-spark",
        "apiName": "TFT_Item_IonicSpark",
        "name": "Ionic Spark",
        "components": [
            "needlessly-large-rod",
            "negatron-cloak"
        ],
        "type": "normal",
        "stats": "@MRShred@% Shred enemies within @HexRange@ hexes. When enemies cast an Ability, deal magic damage equal to @ManaRatio@% of the Mana spentShred: Reduce Magic Resist",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_IonicSpark.TFT_Set13.tex"
    },
    {
        "id": "hellfire-hatchet",
        "apiName": "TFT_Item_Artifact_HellfireHatchet",
        "name": "Hellfire Hatchet",
        "components": [],
        "type": "artifact",
        "stats": "Attacks deal @MaxHealthPercentDamage*100@% of the holder's max Health as bonus physical damage. For every @MissingHealthPercent*100@% missing Health, gain @ASPerMissingHealthPercent*100@% Attack Speed.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_HellfireHatchet.TFT_Set16.tex"
    },
    {
        "id": "steraks-gage",
        "apiName": "TFT_Item_SteraksGage",
        "name": "Sterak's Gage",
        "components": [
            "bf-sword",
            "giants-belt"
        ],
        "type": "normal",
        "stats": "At @HealthThreshold@% Health, gain a Shield equal to @PercentHealthShield*100@% of the wearer's maximum Health that rapidly decays over @ShieldDuration@ seconds.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_SteraksGage.TFT_Set13.tex"
    },
    {
        "id": "dragons-claw",
        "apiName": "TFT_Item_DragonsClaw",
        "name": "Dragon's Claw",
        "components": [
            "negatron-cloak",
            "negatron-cloak"
        ],
        "type": "normal",
        "stats": "Gain @PercentMaxHP*100@% max health.Every @HealthRegenInterval@ seconds, heal @PercentHealthDamage@% max Health.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_DragonsClaw.TFT_Set13.tex"
    },
    {
        "id": "radiant-lucky-item-chest",
        "apiName": "TFT_Consumable_RecommendedArmoryRadiant",
        "name": "Radiant Lucky Item Chest",
        "components": [],
        "type": "radiant",
        "stats": "Use on a champion to open an armory of Radiant items especially suited for them.These items are based on the champion's recommended items.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Consumable_LuckyItemChest.tex"
    },
    {
        "id": "radiant-gamblers-blade",
        "apiName": "TFT7_Item_ShimmerscaleGamblersBlade_Radiant",
        "name": "Radiant Gambler's Blade",
        "components": [],
        "type": "radiant",
        "stats": "Grant  @AttackSpeedPerGold*100@% bonus Attack Speed per  gold in your bank (up to  @AttackSpeedGoldLimit@ gold). Each attack has a @ChanceToProc*100@% chance to drop  @GoldPerProc@ gold.Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_GoldCollector_Radiant.tex"
    },
    {
        "id": "radiant-goldmancers-staff",
        "apiName": "TFT7_Item_ShimmerscaleGoldmancersStaff_Radiant",
        "name": "Radiant Goldmancer's Staff",
        "components": [],
        "type": "radiant",
        "stats": "Grant  @AbilityPowerPerGold@ Ability Power per  gold in your bank (up to  @AbilityPowerGoldMax@ gold) and a @OnKillProcChance*100@% chance to drop  @OnKillProcGold@ gold on enemy kill.Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_GoldmancersStaff_Radiant.tex"
    },
    {
        "id": "radiant-determined-investor",
        "apiName": "TFT7_Item_ShimmerscaleDeterminedInvestor_Radiant",
        "name": "Radiant Determined Investor",
        "components": [],
        "type": "radiant",
        "stats": "After dying during combat @StackLimit@ times, this item is destroyed. Upon destruction, grant the item Radiant Diamond Hands, 1 Champion Duplicator, and  @GoldGranted@ gold.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_DeterminedInvestor_Radiant.tex"
    },
    {
        "id": "radiant-crown-of-champions",
        "apiName": "TFT7_Item_ShimmerscaleCrownOfChampions_Radiant",
        "name": "Radiant Crown of Champions",
        "components": [],
        "type": "radiant",
        "stats": "Every @SecondsForEmpoweredAttack@ seconds, the next attack deals @AttackGoldMultiplier@x the amount of  gold in your bank in true damage.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_CrownOfChampions_Radiant.tex"
    },
    {
        "id": "radiant-dravens-axe",
        "apiName": "TFT7_Item_ShimmerscaleDravensAxe_Radiant",
        "name": "Radiant Draven's Axe",
        "components": [],
        "type": "radiant",
        "stats": "Gain  @AttackDamagePerGold@% Attack Damage per  gold in your bank (up to  @AttackDamageGoldLimit@ gold).Attacks grant @StacksPerAttack@ stack, up to @CashoutStacks@ times. At full stacks, grant  @CashoutGold@ gold and @CashoutComponents@ item component(s).Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_DravensAxe_Radiant.tex"
    },
    {
        "id": "radiant-orb-of-greed",
        "apiName": "TFT7_Item_ShimmerscaleHighStakes_Radiant",
        "name": "Radiant Orb of Greed",
        "components": [],
        "type": "radiant",
        "stats": "Risky! Summon the Golden Dragon Bank. Losing combat stores gold in the bank based on your loss streak. Win to convert it into loot and gold.Gold generated by Shimmerscale items gets stored in the Golden Dragon Bank with a @BonusGoldRatio*100@% conversion rate.The equipped unit has a @GoldChance@% chance to grant @PointsPerKill@ gold on takedowns.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_AmuletOfGreed_Radiant.tex"
    },
    {
        "id": "radiant-moguls-mail",
        "apiName": "TFT7_Item_ShimmerscaleMogulsMail_Radiant",
        "name": "Radiant Mogul's Mail",
        "components": [],
        "type": "radiant",
        "stats": "Grants @BaseResistsPerStack@ Armor, @BaseResistsPerStack@ Magic Resist, and @BaseHealthPerStack@ Health when taking damage, stacking up to @StackCap@ times.At full stacks, grant  @GoldAtFullStacks@ gold.Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_MogulsMail_Radiant.tex"
    },
    {
        "id": "radiant-diamond-hands",
        "apiName": "TFT7_Item_ShimmerscaleDiamondHands_Radiant",
        "name": "Radiant Diamond Hands",
        "components": [],
        "type": "radiant",
        "stats": "Once per combat: At @HPThreshold1*100@% Health and @HPThreshold2*100@% Health, become invulnerable for @BaseDamageImmunityTime@ second and grant  @GoldPerImmunityProc@ gold.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_DiamondHands_Radiant.tex"
    },
    {
        "id": "radiant-needlessly-big-gem",
        "apiName": "TFT7_Item_ShimmerscaleHeartOfGold_Radiant",
        "name": "Radiant Needlessly Big Gem",
        "components": [],
        "type": "radiant",
        "stats": "If the holder is alive after @ProcTimeInSeconds@ seconds, your team deals @BonusDamagePerGold*100@% more damage per  gold in your bank (up to  @GoldLimit@ gold). For every @UnitsPerGold@ units alive when this happens, gain @GoldAmount@ gold.Gold generated this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Set7_Shimmerscale/Shimmerscale_HeartOfGold_Radiant.tex"
    },
    {
        "id": "lich-bane",
        "apiName": "TFT_Item_Artifact_LichBane",
        "name": "Lich Bane",
        "components": [],
        "type": "artifact",
        "stats": "The holder's first attack after each Ability cast deals @TFTUnitProperty.item:TFT_Item_Artifact_LichBane_Damage@ bonus magic damage.Damage increases based on Stage.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_LichBane.tex"
    },
    {
        "id": "strikers-flail",
        "apiName": "TFT_Item_PowerGauntlet",
        "name": "Striker's Flail",
        "components": [
            "giants-belt",
            "sparring-gloves"
        ],
        "type": "normal",
        "stats": "Critical Strikes grant @BuffDamageAmp*100@% Damage Amp for @Duration@ seconds, stacking up to @MaxStacks@ times.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_PowerGauntlet.TFT_Set13.tex"
    },
    {
        "id": "forbidden-idol",
        "apiName": "TFT_Item_Artifact_ForbiddenIdol",
        "name": "Forbidden Idol",
        "components": [],
        "type": "artifact",
        "stats": "Shields have @PercentShieldConversion@% of their value converted to max Health instead.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_ForbiddenIdol.TFT_Set13.tex"
    },
    {
        "id": "arbiter-emblem",
        "apiName": "TFT17_Item_FavoredEmblemItem",
        "name": "Arbiter Emblem",
        "components": [
            "spatula",
            "negatron-cloak"
        ],
        "type": "emblem",
        "stats": "The holder gains the Arbiter trait.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Arbiter.TFT_Set17.tex"
    },
    {
        "id": "sniper-emblem",
        "apiName": "TFT17_Item_RangedTraitEmblemItem",
        "name": "Sniper Emblem",
        "components": [],
        "type": "emblem",
        "stats": "The holder gains the Sniper trait and +@HexRangeIncrease@ Attack Range.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Sniper.TFT_Set17.tex"
    },
    {
        "id": "vanguard-emblem",
        "apiName": "TFT17_Item_ShieldTankEmblemItem",
        "name": "Vanguard Emblem",
        "components": [
            "frying-pan",
            "negatron-cloak"
        ],
        "type": "emblem",
        "stats": "The holder gains the Vanguard trait. Gain @APGain@% Ability Power whenever an ally gains a shield.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Vanguard.TFT_Set17.tex"
    },
    {
        "id": "anima-emblem",
        "apiName": "TFT17_Item_AnimaSquadEmblemItem",
        "name": "Anima Emblem",
        "components": [],
        "type": "emblem",
        "stats": "The holder gains the Anima trait.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_AnimaTech.TFT_Set17.tex"
    },
    {
        "id": "timebreaker-emblem",
        "apiName": "TFT17_Item_PulsefireEmblemItem",
        "name": "Timebreaker Emblem",
        "components": [
            "spatula",
            "recurve-bow"
        ],
        "type": "emblem",
        "stats": "The holder gains the Timebreaker trait.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Timebreaker.TFT_Set17.tex"
    },
    {
        "id": "nova-emblem",
        "apiName": "TFT17_Item_DRXEmblemItem",
        "name": "N.O.V.A. Emblem",
        "components": [
            "spatula",
            "sparring-gloves"
        ],
        "type": "emblem",
        "stats": "The holder gains the N.O.V.A. trait.N.O.V.A. Strike: Gain @ASStriker*100@% Attack Speed and @ArmorStriker@ Armor and Magic Resist. Other allies gain @ASTeam*100@% Attack Speed and @ArmorTeam@ Armor and Magic Resist.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_NOVA.TFT_Set17.tex"
    },
    {
        "id": "meeple-emblem",
        "apiName": "TFT17_Item_AstronautEmblemItem",
        "name": "Meeple Emblem",
        "components": [
            "spatula",
            "chain-vest"
        ],
        "type": "emblem",
        "stats": "The holder gains the Meeple trait and @ManaRegenPerMeep@ additional Mana Regen per .",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Meeple.TFT_Set17.tex"
    },
    {
        "id": "shepherd-emblem",
        "apiName": "TFT17_Item_SummonTraitEmblemItem",
        "name": "Shepherd Emblem",
        "components": [
            "frying-pan",
            "tear-of-goddess"
        ],
        "type": "emblem",
        "stats": "The holder gains the Shepherd trait. On cast, grant @ManaSharePercent*100@% of max Mana to the Bond of the Stars.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Sheperd.TFT_Set17.tex"
    },
    {
        "id": "psionic-emblem",
        "apiName": "TFT17_Item_PsyOpsEmblemItem",
        "name": "Psionic Emblem",
        "components": [],
        "type": "emblem",
        "stats": "The holder gains the Psionic trait.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_PsyOps.TFT_Set17.tex"
    },
    {
        "id": "brawler-emblem",
        "apiName": "TFT17_Item_HPTankEmblemItem",
        "name": "Brawler Emblem",
        "components": [
            "frying-pan",
            "giants-belt"
        ],
        "type": "emblem",
        "stats": "The holder gains the Brawler trait. Attacks deals @PercentHPAttack*100@% of the holder's max health as magic damage.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Brawler.TFT_Set17.tex"
    },
    {
        "id": "rogue-emblem",
        "apiName": "TFT17_Item_AssassinTraitEmblemItem",
        "name": "Rogue Emblem",
        "components": [
            "frying-pan",
            "sparring-gloves"
        ],
        "type": "emblem",
        "stats": "The holder gains the Rogue trait. At @HealthThreshold*100@% health, gain @Omnivamp*100@% Omnivamp and immunity to crowd control for @BuffDuration@ seconds.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Rogue.TFT_Set17.tex"
    },
    {
        "id": "challenger-emblem",
        "apiName": "TFT17_Item_ASTraitEmblemItem",
        "name": "Challenger Emblem",
        "components": [
            "frying-pan",
            "recurve-bow"
        ],
        "type": "emblem",
        "stats": "The holder gains the Challenger trait. On takedown, the holder's next @NumAttacks@ attacks each heal for @PercentHealthHeal*100@% of max health.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Challenger.TFT_Set17.tex"
    },
    {
        "id": "dark-star-emblem",
        "apiName": "TFT17_Item_DarkStarEmblemItem",
        "name": "Dark Star Emblem",
        "components": [
            "spatula",
            "bf-sword"
        ],
        "type": "emblem",
        "stats": "The holder gains the Dark Star trait.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_DarkStar.TFT_Set17.tex"
    },
    {
        "id": "stargazer-emblem",
        "apiName": "TFT17_Item_StargazerEmblemItem",
        "name": "Stargazer Emblem",
        "components": [
            "spatula",
            "needlessly-large-rod"
        ],
        "type": "emblem",
        "stats": "The holder gains the Stargazer trait.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Stargazer.TFT_Set17.tex"
    },
    {
        "id": "marauder-emblem",
        "apiName": "TFT17_Item_MeleeTraitEmblemItem",
        "name": "Marauder Emblem",
        "components": [
            "frying-pan",
            "bf-sword"
        ],
        "type": "emblem",
        "stats": "The holder gains the Marauder trait and has a @GoldDropChance@% chance to drop @GoldAmount@ gold on kill.Gold dropped this game: @TFTUnitProperty.item:TFT_Item_GoldGenerated@",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Marauder.TFT_Set17.tex"
    },
    {
        "id": "space-groove-emblem",
        "apiName": "TFT17_Item_SpaceGrooveEmblemItem",
        "name": "Space Groove Emblem",
        "components": [
            "spatula",
            "tear-of-goddess"
        ],
        "type": "emblem",
        "stats": "The holder gains the Space Groove trait. On cast, the holder enters  for @GrooveDuration@ seconds.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_SpaceGroove.TFT_Set17.tex"
    },
    {
        "id": "bastion-emblem",
        "apiName": "TFT17_Item_ResistTankEmblemItem",
        "name": "Bastion Emblem",
        "components": [
            "frying-pan",
            "chain-vest"
        ],
        "type": "emblem",
        "stats": "The holder gains the Bastion trait. After the first @Delay@ seconds of combat, the holder gains @AttackSpeed*100@% Attack Speed.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Bastion.TFT_Set17.tex"
    },
    {
        "id": "voyager-emblem",
        "apiName": "TFT17_Item_FlexTraitEmblemItem",
        "name": "Voyager Emblem",
        "components": [
            "frying-pan",
            "needlessly-large-rod"
        ],
        "type": "emblem",
        "stats": "The holder gains the Voyager trait. Combat Start: Gain and grant adjacent allies bonuses based on the holder's role.- Tanks: @BonusArmorMR@ Armor and Magic Resist- Fighters/Assassins: @BonusOmnivamp*100@% Omnivamp- Other Roles: @BonusAttackSpeed*100@% Attack Speed",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Voyager.TFT_Set17.tex"
    },
    {
        "id": "primordian-emblem",
        "apiName": "TFT17_Item_PrimordianEmblemItem",
        "name": "Primordian Emblem",
        "components": [
            "spatula",
            "giants-belt"
        ],
        "type": "emblem",
        "stats": "The holder gains the Primordian trait.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set17/TFT17_Emblem_Primordian.TFT_Set17.tex"
    },
    {
        "id": "mirrored-persona",
        "apiName": "TFT_Item_Artifact_MirroredPersona",
        "name": "Mirrored Persona",
        "components": [],
        "type": "artifact",
        "stats": "Every @NumCombats@ player combats gain a lesser copy of Mirrored Persona&nbsp;(@TFTUnitProperty.trait:TFT_Item_Artifact_MirroredPersona_Combats@/@NumCombats@). Share @StatSharePercent*100@% of the holder's bonus Attack Damage, Ability Power, Attack Speed, Armor, Magic Resist, and Health with other Mirrored Persona holders.Can't be Reforged, Lesser copies do not produce copies.Unique: one per champion",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT16_Artifact_MirroredPersona.TFT_Set16.tex"
    },
    {
        "id": "fishbones",
        "apiName": "TFT_Item_Artifact_Fishbones",
        "name": "Fishbones",
        "components": [],
        "type": "artifact",
        "stats": "The holder's attacks target random enemies.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_Fishbones.TFT_Set13.tex"
    },
    {
        "id": "anima-visage",
        "apiName": "TFT4_Item_OrnnAnimaVisage",
        "name": "Anima Visage",
        "components": [],
        "type": "artifact",
        "stats": "Heal @PercentHealthRegen@% max Health every second.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT4_Item_OrnnAnimaVisage.TFT_Set13.tex"
    },
    {
        "id": "gargoyle-stoneplate",
        "apiName": "TFT_Item_GargoyleStoneplate",
        "name": "Gargoyle Stoneplate",
        "components": [
            "chain-vest",
            "negatron-cloak"
        ],
        "type": "normal",
        "stats": "Gain @ArmorPerEnemy@ Armor and @MRPerEnemy@ Magic Resist for each enemy targeting the holder.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_GargoyleStoneplate.TFT_Set13.tex"
    },
    {
        "id": "titanic-hydra",
        "apiName": "TFT_Item_Artifact_TitanicHydra",
        "name": "Titanic Hydra",
        "components": [],
        "type": "artifact",
        "stats": "Attacks deal @PercentMaxHealthSplash@% of the holder's max Health plus @PercentAttackDamageSplash@% of their Attack Damage as bonus physical damage to the target and adjacent enemies.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_TitanicHydra.TFT_TFT14_5.tex"
    },
    {
        "id": "bramble-vest",
        "apiName": "TFT_Item_BrambleVest",
        "name": "Bramble Vest",
        "components": [
            "chain-vest",
            "chain-vest"
        ],
        "type": "normal",
        "stats": "Gain @PercentMaxHP*100@% max health.Take @AutoDamageReduction*100@% reduced damage from attacks. When struck by any attack, deal @1StarAoEDamage@ magic damage to all adjacent enemies.Cooldown: @ICD@ seconds",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_BrambleVest.TFT_Set13.tex"
    },
    {
        "id": "chonccs-rocket-propelled-fist",
        "apiName": "TFT4_Item_OrnnRocketPropelledFist",
        "name": "Choncc's Rocket-Propelled Fist",
        "components": [],
        "type": "artifact",
        "stats": "Combat start: The farthest enemy is pulled into melee range and Stunned for @StunDuration@ seconds. Allies within range will prioritize attacking that enemy.[Unique - only 1 per champion]Stun: cannot move, attack, or cast Abilities",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT4_OrnnItem_RocketPropelledFist.tex"
    },
    {
        "id": "aegis-of-dusk",
        "apiName": "TFT_Item_Artifact_AegisOfDusk",
        "name": "Aegis of Dusk",
        "components": [],
        "type": "artifact",
        "stats": "Every @TickRate@ seconds, steal @MRStealPerTick@ Magic Resist from enemies within 1 hex and deal @TFTUnitProperty.item:TFT_Item_Artifact_AegisDuskDawn_Damage@% of the holder's Magic Resist as magic damage.If Aegis of Dawn is also equipped, trigger this item's effect every @TickRateWithAegisOfDawn@ seconds instead.Damage increases based on Stage.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_AegisOfDusk.TFT_Set16.tex"
    },
    {
        "id": "unending-despair",
        "apiName": "TFT_Item_Artifact_UnendingDespair",
        "name": "Unending Despair",
        "components": [],
        "type": "artifact",
        "stats": "Whenever a Shield on the holder breaks, @PercentDamage@% of that Shield's initial value is dealt to the nearest enemy as magic damage.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_UnendingDespair.TFT_Set13.tex"
    },
    {
        "id": "eternal-winter",
        "apiName": "TFT4_Item_OrnnEternalWinter",
        "name": "Eternal Winter",
        "components": [],
        "type": "artifact",
        "stats": "Enemies who damage the holder are @AttackSpeedSlowPercent@% Chilled for @SlowDuration@ seconds. After @NumApplications@ Chills from this item, the attacker is Stunned instead (Cooldown: @FreezeCooldown@ seconds).[Unique - only 1 per champion]Chill: reduce Attack SpeedStun: cannot move, attack, or cast Abilities",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT4_Item_OrnnEternalWinter.TFT_Set13.tex"
    },
    {
        "id": "yasuos-bladework",
        "apiName": "TFT17_Item_Artifact_YasuoArtifact",
        "name": "Yasuo's Bladework",
        "components": [],
        "type": "artifact",
        "stats": "Every @Interval@ seconds, your next attack is a double attack.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_Item_Artifact_YasuoBladework.TFT_Set17.tex"
    },
    {
        "id": "giant-slayer",
        "apiName": "TFT_Item_MadredsBloodrazor",
        "name": "Giant Slayer",
        "components": [
            "bf-sword",
            "recurve-bow"
        ],
        "type": "normal",
        "stats": "Gain @DamageAmp*100@% additional Damage Amp against Tanks.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_MadredsBloodrazor.TFT_Set13.tex"
    },
    {
        "id": "mending-echoes",
        "apiName": "TFT_Item_Artifact_MendingEchoes",
        "name": "Mending Echoes",
        "components": [],
        "type": "artifact",
        "stats": "Increase healing on the holder by @IncreasedHealing*100@%. When the holder gives or receives a heal, grant @HealPercentToGrant*100@% of the heals value to the lowest health ally as well.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT16_Artifact_MendingEchoes.TFT_Set16.tex"
    },
    {
        "id": "obsidian-cleaver",
        "apiName": "TFT4_Item_OrnnObsidianCleaver",
        "name": "Obsidian Cleaver",
        "components": [],
        "type": "artifact",
        "stats": "Damage dealt @Shred@% Shreds and @Shred@% Sunders enemies for @Duration@ seconds.Your team gains @TeamAD*100@% Attack Damage and @TeamAP@ Ability Power.​​[Support item] [Unique - only 1 per champion]Shred: Reduce Magic ResistSunder: Reduce Armor",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT4_Item_OrnnObsidianCleaver.TFT_Set13.tex"
    },
    {
        "id": "sunfire-cape",
        "apiName": "TFT_Item_RedBuff",
        "name": "Sunfire Cape",
        "components": [
            "chain-vest",
            "giants-belt"
        ],
        "type": "normal",
        "stats": "Gain @BonusPercentHP*100@% max Health. Every @ICD@ seconds, deal @BurnPercent@% Burn and @GrievousWoundsPercent@% Wound to an enemy within @HexRange@ hexes for @BurnDuration@ seconds.Burn: Deals a percent of the target's max Health as true damage every secondWound: Reduces healing received",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_RedBuff.TFT_Set13.tex"
    },
    {
        "id": "virtue-of-the-martyr",
        "apiName": "TFT_Item_RadiantVirtue",
        "name": "Virtue of the Martyr",
        "components": [],
        "type": "radiant",
        "stats": "Every @HealTickRate@ seconds, heal your team for @MaxHealthHeal@% of their max Health. When the holder dies, the healing increases to @TOOLTIPEmpoweredHeal@% max Health for @NumBonusHeals@ extra heals.Healing: @TFTUnitProperty.item:TFT_Tracker_Value1@​​[Support item]",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_RadiantVirtue.TFT_Set13.tex"
    },
    {
        "id": "threshs-lantern",
        "apiName": "TFT17_Item_Artifact_ThreshLantern",
        "name": "Thresh's Lantern",
        "components": [],
        "type": "artifact",
        "stats": "After @Delay@ seconds of combat, pull the leftmost benched unit onto the battlefield. While that unit lives, @DamageShare*100@% of all damage the holder would take is redirected to them.Traits of champions flung onto the board do not become active",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_Item_Artifact_ThreshLantern.TFT_Set17.tex"
    },
    {
        "id": "kayles-radiant-exaltation",
        "apiName": "TFT17_Item_Artifact_KayleArtifact_Radiant",
        "name": "Kayle's Radiant Exaltation",
        "components": [],
        "type": "artifact",
        "stats": "Behold, the righteous flame!",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_Item_Artifact_KayleGreatsword.TFT_Set17.tex"
    },
    {
        "id": "hand-of-justice",
        "apiName": "TFT_Item_UnstableConcoction",
        "name": "Hand Of Justice",
        "components": [
            "tear-of-goddess",
            "sparring-gloves"
        ],
        "type": "normal",
        "stats": "Gain 2 effects:@AD_NotStatBar*100@% Attack Damage and @AP_NotStatBar@% Ability Power.@StatOmnivamp_NotStatBar*100@% Omnivamp.While above @HealthThreshold*100@% health, double the Attack Damage and Ability Power. While below @HealthThreshold*100@% Health, double the Omnivamp.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_UnstableConcoction.TFT_Set13.tex"
    },
    {
        "id": "edge-of-night",
        "apiName": "TFT_Item_GuardianAngel",
        "name": "Edge of Night",
        "components": [
            "bf-sword",
            "chain-vest"
        ],
        "type": "normal",
        "stats": "At @HealthThreshold@% Health, briefly become untargetable, shed negative effects, and heal @MissingHealthRestore*100@% missing health.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_GuardianAngel.TFT_Set13.tex"
    },
    {
        "id": "kayles-exaltation",
        "apiName": "TFT17_Item_Artifact_KayleArtifact",
        "name": "Kayle's Exaltation",
        "components": [],
        "type": "artifact",
        "stats": "After @Delay@ seconds of combat, this and all completed items on the holder become Radiant.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_Item_Artifact_KayleGreatsword.TFT_Set17.tex"
    },
    {
        "id": "cursed-blade",
        "apiName": "TFT_Item_Artifact_CursedBlade",
        "name": "Cursed Blade",
        "components": [],
        "type": "artifact",
        "stats": "Attacks reduce the target's max Health by @MaxHealthPercent@%. @HitCount@ attacks on the same target reduces their star level by 1.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Ornn_Items/TFT_Item_Artifact_CursedBlade.tex"
    },
    {
        "id": "zhonyas-paradox",
        "apiName": "TFT4_Item_OrnnZhonyasParadox",
        "name": "Zhonya's Paradox",
        "components": [],
        "type": "artifact",
        "stats": "Once per combat at @PercentHealthThreshold@% Health, become invulnerable and untargetable for @InvulnDuration@ seconds.[Unique - only 1 per champion]",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT4_Item_OrnnZhonyasParadox.TFT_Set13.tex"
    },
    {
        "id": "titans-resolve",
        "apiName": "TFT_Item_TitansResolve",
        "name": "Titan's Resolve",
        "components": [
            "chain-vest",
            "recurve-bow"
        ],
        "type": "normal",
        "stats": "Gain @StackingAD*100@% Attack Damage and @StackingSP@% Ability Power when attacking or taking damage, stacking up to @StackCap@ times.  At full stacks, gain @StackedAmp*100@% Damage Amp and gain immunity to crowd control.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_TitansResolve.TFT_Set13.tex"
    },
    {
        "id": "ludens-tempest",
        "apiName": "TFT_Item_Artifact_LudensTempest",
        "name": "Luden's Tempest",
        "components": [],
        "type": "artifact",
        "stats": "@PercentOfOverkill@% of overkill damage plus @BaseDamage@ is dealt as magic damage to the three enemies nearest the target.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_LudensTempest.TFT_Set13.tex"
    },
    {
        "id": "spectral-cutlass",
        "apiName": "TFT_Item_Artifact_SpectralCutlass",
        "name": "Spectral Cutlass",
        "components": [],
        "type": "artifact",
        "stats": "Combat start: Teleport the holder to the mirrored hex on the enemy's side of the board. After @Duration@ seconds, the holder returns to their original location.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_SpectralCutlass.TFT_Set13.tex"
    },
    {
        "id": "krakens-fury",
        "apiName": "TFT_Item_RunaansHurricane",
        "name": "Kraken's Fury",
        "components": [
            "negatron-cloak",
            "recurve-bow"
        ],
        "type": "normal",
        "stats": "Attacks grant @ADOnAttack*100@% stacking Attack Damage, up to @MaxStacks@ attacks. After @MaxStacks@ attacks, gain @ASCapstone*100@% Attack Speed.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_KrakenSlayer.TFT_TFT14_5.tex"
    },
    {
        "id": "rapid-firecannon",
        "apiName": "TFT_Item_Artifact_RapidFirecannon",
        "name": "Rapid Firecannon",
        "components": [],
        "type": "artifact",
        "stats": "Gain +1 Attack Range, increased by 1 whenever the holder kills an enemy.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_RapidFirecannon.TFT_Set13.tex"
    },
    {
        "id": "bloodthirster",
        "apiName": "TFT_Item_Bloodthirster",
        "name": "Bloodthirster",
        "components": [
            "bf-sword",
            "negatron-cloak"
        ],
        "type": "normal",
        "stats": "Once per combat at @HealthThreshold@% Health, gain a @ShieldHealthPercent@% max Health Shield that lasts up to @ShieldDuration@ seconds.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Bloodthirster.TFT_Set13.tex"
    },
    {
        "id": "statikk-shiv",
        "apiName": "TFT_Item_Artifact_StatikkShiv",
        "name": "Statikk Shiv",
        "components": [],
        "type": "artifact",
        "stats": "Every 3rd attack deals @Damage@ + @APScalar*100@% of the holder's Ability Power as additional magic damage to 4 enemies.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_StattikShiv.TFT_TFT14_5.tex"
    },
    {
        "id": "snipers-focus",
        "apiName": "TFT9_Item_OrnnHorizonFocus",
        "name": "Sniper's Focus",
        "components": [],
        "type": "artifact",
        "stats": "Gain @DamageAmpPerHex*100@% Damage Amp against targets @HexRequirement@ or more hexes away.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT9_Item_OrnnHorizonFocus.TFT_Set13.tex"
    },
    {
        "id": "archangels-staff",
        "apiName": "TFT_Item_ArchangelsStaff",
        "name": "Archangel's Staff",
        "components": [
            "needlessly-large-rod",
            "tear-of-goddess"
        ],
        "type": "normal",
        "stats": "Combat start: Gain @APPerInterval@% Ability Power every @IntervalSeconds@ seconds in combat.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_ArchangelsStaff.TFT_Set13.tex"
    },
    {
        "id": "aegis-of-dawn",
        "apiName": "TFT_Item_Artifact_AegisOfDawn",
        "name": "Aegis of Dawn",
        "components": [],
        "type": "artifact",
        "stats": "Every @TickRate@ seconds, steal @ArmorStealPerTick@ Armor from enemies within 1-hex and heal @TFTUnitProperty.item:TFT_Item_Artifact_AegisDuskDawn_Damage@% of the holder's Armor.If Aegis of Dusk is also equipped, trigger this item's effect every @TickRateWithAegisOfDusk@ seconds instead.Healing increases based on Stage.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_AegisOfDawn.TFT_Set16.tex"
    },
    {
        "id": "evelynns-instinct",
        "apiName": "TFT17_Item_Artifact_EvelynnArtifact",
        "name": "Evelynn's Instinct",
        "components": [],
        "type": "artifact",
        "stats": "When switching targets, blink to the next target. Attacks and Abilities execute the holder's target below @ExecuteThresholdForTarget*100@% of their Health.Kills grant the holder @DecayingAS*100@% Attack Speed decaying over @Duration@ seconds.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_Item_Artifact_EvelynnFang.TFT_Set17.tex"
    },
    {
        "id": "sorakas-miracle",
        "apiName": "TFT17_Item_Artifact_SorakaArtifact",
        "name": "Soraka's Miracle",
        "components": [],
        "type": "artifact",
        "stats": "The first @NumMiracles@ times the holder drops below @HPThreshold*100@% Health, a Miracle occurs, healing them for @TotalHealRatio@% of their max Health.If the holder survives player combat, gain @PlayerHealth@ player Health for each Miracle this combat.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_Item_Artifact_SorakaMiracle.TFT_Set17.tex"
    },
    {
        "id": "varuss-obsession",
        "apiName": "TFT17_Item_Artifact_VarusArtifact",
        "name": "Varus's Obsession",
        "components": [],
        "type": "artifact",
        "stats": "Combat Start: Your strongest Tank becomes the Soulmate. For each second they are alive, the holder gains @StackingStats@% stacking Attack Damage and Ability Power.The Soulmate heals for @HealPct*100@% of damage the holder deals.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_Item_Artifact_VarusObsession.TFT_Set17.tex"
    },
    {
        "id": "dawncore",
        "apiName": "TFT_Item_Artifact_Dawncore",
        "name": "Dawncore",
        "components": [],
        "type": "artifact",
        "stats": "Reduce the holder's max Mana by @FlatManaReduction@. Subsequent spellcasts reduce max Mana by @ReductionPerCast*100@%, to a minimum of @MinimumTotalMana@.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_Dawncore.TFT_Set15.tex"
    },
    {
        "id": "chonccs-artifactory",
        "apiName": "TFTEventCT_Augment_Artifactory",
        "name": "Choncc's Artifactory",
        "components": [],
        "type": "artifact",
        "stats": "At the start of each turn, your benched completed items transform into a random Artifact item. Gain @NumItems@ Artifact Anvil and a reforger.",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Artifactory_III.TFT_Set13.tex"
    },
    {
        "id": "ahris-aura",
        "apiName": "TFT17_Item_Artifact_AhriArtifact",
        "name": "Ahri's Aura",
        "components": [],
        "type": "artifact",
        "stats": "The holder is orbited by 3 foxfires. Each one deals @FlatMagicDamage@&nbsp;() magic damage and the orbit expands to hit the holder's current target.For every @ManaSpent@ Mana the holder spends, foxfires travel @PercentSpeedIncrease*100@% faster for the rest of combat.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT17_Item_Artifact_AhriRhythm.TFT_Set17.tex"
    },
    {
        "id": "lightshield-crest",
        "apiName": "TFT_Item_Artifact_LightshieldCrest",
        "name": "Lightshield Crest",
        "components": [],
        "type": "artifact",
        "stats": "Every @TriggerRate@ seconds, Shields the lowest percent Health ally for @PercentOfResists@% of the holder's combined Armor and Magic Resist for @ShieldDuration@ seconds.On death grants this shield to all allies.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_LightshieldCrest.TFT_Set13.tex"
    },
    {
        "id": "deaths-defiance",
        "apiName": "TFT4_Item_OrnnDeathsDefiance",
        "name": "Death's Defiance",
        "components": [],
        "type": "artifact",
        "stats": "@IgnorePainPercent@% of the damage the holder receives is instead dealt over @BleedDuration@ seconds as non-lethal damage.[Unique - only 1 per champion]",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT4_Item_OrnnDeathsDefiance.TFT_Set13.tex"
    },
    {
        "id": "spear-of-shojin",
        "apiName": "TFT_Item_SpearOfShojin",
        "name": "Spear of Shojin",
        "components": [
            "bf-sword",
            "tear-of-goddess"
        ],
        "type": "normal",
        "stats": "Attacks grant @FlatManaRestore@ bonus Mana.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_SpearOfShojin.TFT_Set13.tex"
    },
    {
        "id": "evenshroud",
        "apiName": "TFT_Item_SpectralGauntlet",
        "name": "Evenshroud",
        "components": [
            "negatron-cloak",
            "giants-belt"
        ],
        "type": "normal",
        "stats": "@ARReductionAmount@% Sunder enemies within @HexRange@ hexes. Gain @BonusResists@ Armor and Magic Resist for the first @BonusResistDuration@ seconds of combat.Sunder: Reduce Armor",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_SpectralGauntlet.TFT_Set13.tex"
    },
    {
        "id": "blacksmiths-gloves",
        "apiName": "TFT9_Item_OrnnPrototypeForge",
        "name": "Blacksmith's Gloves",
        "components": [],
        "type": "artifact",
        "stats": "Each round: Equip 2 random Ornn Artifacts.[Consumes 3 item slots.]@TFTUnitProperty.:TFT_BindOnEquipTRA@",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT9_Item_OrnnPrototypeForge.TFT_Set13.tex"
    },
    {
        "id": "blighting-jewel",
        "apiName": "TFT_Item_Artifact_BlightingJewel",
        "name": "Blighting Jewel",
        "components": [],
        "type": "artifact",
        "stats": "Dealing magic damage reduces the target's Magic Resist by @MRReduction@. If their Magic Resist is 0, grant the holder @ManaGain@ Mana instead.Ability damage can only trigger on each enemy once every @ICD@ seconds.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_BlightingJewel.TFT_Set13.tex"
    },
    {
        "id": "talisman-of-ascension",
        "apiName": "TFT_Item_Artifact_TalismanOfAscension",
        "name": "Talisman Of Ascension",
        "components": [],
        "type": "artifact",
        "stats": "After @Seconds@ seconds gain @MaxHealthPercent@% max Health and @DamageAmp*100@% Damage Amp for the rest of combat.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_TalismanOfAscension.TFT_Set13.tex"
    },
    {
        "id": "infinity-force",
        "apiName": "TFT4_Item_OrnnInfinityForce",
        "name": "Infinity Force",
        "components": [],
        "type": "artifact",
        "stats": "Tons of EVERYTHING!",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT4_Item_OrnnInfinityForce.TFT_Set13.tex"
    },
    {
        "id": "nashors-tooth",
        "apiName": "TFT_Item_Leviathan",
        "name": "Nashor's Tooth",
        "components": [
            "recurve-bow",
            "giants-belt"
        ],
        "type": "normal",
        "stats": "Attacks grant @BaseManaOnHit@ bonus Mana, increased to @ManaOnCrit@ if they critically strike.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Leviathan.TFT_Set13.tex"
    },
    {
        "id": "suspicious-trench-coat",
        "apiName": "TFT_Item_Artifact_SuspiciousTrenchCoat",
        "name": "Suspicious Trench Coat",
        "components": [],
        "type": "artifact",
        "stats": "Once per combat at @PercentHealthTrigger@% Health, the holder splits into 3 copies of themself each with @PercentHealthOfCopies@% of their max Health.[Unique - only 1 per champion]",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_SuspiciousTrenchCoat.TFT_Set13.tex"
    },
    {
        "id": "morellonomicon",
        "apiName": "TFT_Item_Morellonomicon",
        "name": "Morellonomicon",
        "components": [
            "needlessly-large-rod",
            "giants-belt"
        ],
        "type": "normal",
        "stats": "Attacks and Abilities deal @BurnPercent@% Burn and @GrievousWoundsPercent@% Wound to enemies for @BurnDuration@ seconds.Burn: Deals a percent of the target's max Health as true damage every secondWound: Reduces healing received",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Morellonomicon.TFT_Set13.tex"
    },
    {
        "id": "red-buff",
        "apiName": "TFT_Item_RapidFireCannon",
        "name": "Red Buff",
        "components": [
            "recurve-bow",
            "recurve-bow"
        ],
        "type": "normal",
        "stats": "Attacks and Abilities @BurnPercent@% Burn and @HealingReductionPct@% Wound enemies for @Duration@ seconds.Burn: Deals a percent of the target's max Health as true damage every secondWound: Reduces healing received",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_RapidFireCannon.TFT_Set13.tex"
    },
    {
        "id": "crownguard",
        "apiName": "TFT_Item_Crownguard",
        "name": "Crownguard",
        "components": [
            "needlessly-large-rod",
            "chain-vest"
        ],
        "type": "normal",
        "stats": "Combat Start: Gain a @ShieldSize@% max Health Shield for @ShieldDuration@ seconds.When the Shield expires, gain @ShieldBonusAP@% Ability Power.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Crownguard.TFT_Set13.tex"
    },
    {
        "id": "mittens",
        "apiName": "TFT_Item_Artifact_Mittens",
        "name": "Mittens",
        "components": [],
        "type": "artifact",
        "stats": "Shrinks the holder, granting them increased movement speed and immunity to Slow, Burn, and Wound.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_Mittens.TFT_Set13.tex"
    },
    {
        "id": "adaptive-helm",
        "apiName": "TFT_Item_AdaptiveHelm",
        "name": "Adaptive Helm",
        "components": [
            "negatron-cloak",
            "tear-of-goddess"
        ],
        "type": "normal",
        "stats": "Gain an additional @ManaPercIncrease*100@% Mana from all sources. The holder gains an additional bonus based on their Role:Tanks and Fighters: Gain @FrontlineResists@ Armor and Magic Resistance.Other Roles: Gain @BacklineADAP@% Attack Damage and Ability Power.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_AdaptiveHelm.TFT_Set13.tex"
    },
    {
        "id": "deathfire-grasp",
        "apiName": "TFT9_Item_OrnnDeathfireGrasp",
        "name": "Deathfire Grasp",
        "components": [],
        "type": "artifact",
        "stats": "Combat start: Blast the current target for @PercentMaxHealthDamage@% of their max Health as magic damage. Repeat this every @RepeatTime@ seconds.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT9_Item_OrnnDeathfireGrasp.TFT_Set13.tex"
    },
    {
        "id": "flickerblades",
        "apiName": "TFT_Item_Artifact_NavoriFlickerblades",
        "name": "Flickerblades",
        "components": [],
        "type": "artifact",
        "stats": "Attacks grant @ASPerStack*100@% stacking Attack Speed. Every @StacksPerBonus@ attacks also grant @ADPerBonus*100@% Attack Damage and @APPerBonus@% Ability Power.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_NavoriFlickerplade.TFT_TFT14_5.tex"
    },
    {
        "id": "blue-buff",
        "apiName": "TFT_Item_BlueBuff",
        "name": "Blue Buff",
        "components": [
            "tear-of-goddess",
            "tear-of-goddess"
        ],
        "type": "normal",
        "stats": "Gain @ModifiedADAP*100@% additional Attack Damage and Ability Power from all sources.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_BlueBuff.TFT_Set13.tex"
    },
    {
        "id": "corrupt-vampiric-scepter",
        "apiName": "TFT_Item_Artifact_CursedVampiricScepter",
        "name": "Corrupt Vampiric Scepter",
        "components": [],
        "type": "artifact",
        "stats": "Attacks deal an additional @PercentDamage@% Attack Damage  as physical damage and heal the holder for the damage dealt.The holder cannot cast their Ability or gain Mana.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_CursedVampiricScepter.TFT_Set13.tex"
    },
    {
        "id": "last-whisper",
        "apiName": "TFT_Item_LastWhisper",
        "name": "Last Whisper",
        "components": [
            "recurve-bow",
            "sparring-gloves"
        ],
        "type": "normal",
        "stats": "Damage from attacks and Abilities @ArmorReductionPercent@% Sunder the target for @ArmorBreakDuration@ seconds. This effect does not stack.Sunder: Reduce Armor",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_LastWhisper.TFT_Set13.tex"
    },
    {
        "id": "jeweled-gauntlet",
        "apiName": "TFT_Item_JeweledGauntlet",
        "name": "Jeweled Gauntlet",
        "components": [
            "needlessly-large-rod",
            "sparring-gloves"
        ],
        "type": "normal",
        "stats": "Gain Precision.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_JeweledGauntlet.TFT_Set13.tex"
    },
    {
        "id": "wits-end",
        "apiName": "TFT_Item_Artifact_WitsEnd",
        "name": "Wit's End",
        "components": [],
        "type": "artifact",
        "stats": "Attacks deal @TFTUnitProperty.item:TFT_Item_Artifact_WitsEnd_Damage@ bonus magic damage.Heals the holder for @PercentHealing@% of all magic damage dealt.Damage increases based on Stage.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_WitsEnd.TFT_Set13.tex"
    },
    {
        "id": "horizon-focus",
        "apiName": "TFT_Item_Artifact_HorizonFocus",
        "name": "Horizon Focus",
        "components": [],
        "type": "artifact",
        "stats": "Stunning an enemy causes lightning to strike them, dealing @PercentHealthDamage@% of their max Health as magic damage.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_HorizonFocus.TFT_Set13.tex"
    },
    {
        "id": "randuins-omen",
        "apiName": "TFT4_Item_OrnnRanduinsSanctum",
        "name": "Randuin's Omen",
        "components": [],
        "type": "artifact",
        "stats": "Combat start: Grant  @BonusDefense@ Armor and  @BonusDefense@ Magic Resistance to the holder and adjacent allies.​​[Support item]",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT4_Item_OrnnRanduinsSanctum.TFT_Set13.tex"
    },
    {
        "id": "steadfast-heart",
        "apiName": "TFT_Item_NightHarvester",
        "name": "Steadfast Heart",
        "components": [
            "chain-vest",
            "sparring-gloves"
        ],
        "type": "normal",
        "stats": "Gain @BaseDurability*100@% Durability. While above @ThresholdForEmpower*100@% Health, instead gain @EmpoweredDurability*100@% Durability.@TFTUnitProperty.:TFT_Augment_WarmogsBuckle_TRAKey@",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_NightHarvester.TFT_Set13.tex"
    },
    {
        "id": "prowlers-claw",
        "apiName": "TFT_Item_Artifact_ProwlersClaw",
        "name": "Prowler's Claw",
        "components": [],
        "type": "artifact",
        "stats": "After killing a target, shed negative effects and dash to the farthest target within @HexRange@ hexes. The next 2 critical attacks deal @CritDamageBonusPercent@% bonus Critical Strike Damage.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_ProwlersClaw.TFT_Set13.tex"
    },
    {
        "id": "tacticians-crown",
        "apiName": "TFT_Item_ForceOfNature",
        "name": "Tactician's Crown",
        "components": [
            "spatula",
            "spatula"
        ],
        "type": "normal",
        "stats": "Your team gains +@MaxArmySizeIncrease@ max team size.@PercentGoldChance@% chance to drop 1 gold when you win combat.\"...the Heart of a hero...\"",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_ForceOfNature.TFT_Set13.tex"
    },
    {
        "id": "quicksilver",
        "apiName": "TFT_Item_Quicksilver",
        "name": "Quicksilver",
        "components": [
            "sparring-gloves",
            "negatron-cloak"
        ],
        "type": "normal",
        "stats": "Combat Start: Gain immunity to crowd control for @SpellShieldDuration@ seconds.Gain @ProcAttackSpeed*100@% stacking Attack Speed every second.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Quicksilver.TFT_Set13.tex"
    },
    {
        "id": "deathblade",
        "apiName": "TFT_Item_Deathblade",
        "name": "Deathblade",
        "components": [
            "bf-sword",
            "bf-sword"
        ],
        "type": "normal",
        "stats": "Perfect peace and calm for the holder - and all who face it.@TFTUnitProperty.:TFT_Augment_TragicalBlade_TRAKey@",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Deathblade.TFT_Set13.tex"
    },
    {
        "id": "void-gauntlet",
        "apiName": "TFT_Item_Artifact_VoidGauntlet",
        "name": "Void Gauntlet",
        "components": [],
        "type": "artifact",
        "stats": "Combat start: Store @InitialPercentHealthStore*100@% max Health and @PercentHealthStore*100@% more every second. On death, unleash the stored Health as magic damage split between enemies within @HexRadius@-hexes.[Unique - only 1 per champion]",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT16_Artifact_VoidGauntlet.TFT_Set16.tex"
    },
    {
        "id": "silvermere-dawn",
        "apiName": "TFT_Item_Artifact_SilvermereDawn",
        "name": "Silvermere Dawn",
        "components": [],
        "type": "artifact",
        "stats": "Grants immunity to Stuns and the holder's attacks Stun the target for @StunDuration@ seconds.The holder's Attack Speed is locked at @AttackSpeedCap@.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_SilvermereDawn.TFT_Set13.tex"
    },
    {
        "id": "tacticians-shield",
        "apiName": "TFT_Item_TacticiansScepter",
        "name": "Tactician's Shield",
        "components": [
            "frying-pan",
            "frying-pan"
        ],
        "type": "normal",
        "stats": "Your team gains +@MaxArmySizeIncrease@ max team size.@PercentGoldChance@% chance to drop 1 gold when the holder dies.\"Imbued with a Philosopher's wisdom...\"",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_TacticiansScepter.TFT_Set13.tex"
    },
    {
        "id": "warmogs-armor",
        "apiName": "TFT_Item_WarmogsArmor",
        "name": "Warmog's Armor",
        "components": [
            "giants-belt",
            "giants-belt"
        ],
        "type": "normal",
        "stats": "Gain @BonusPercentHP*100@% max Health.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_WarmogsArmor.TFT_Set13.tex"
    },
    {
        "id": "seekers-armguard",
        "apiName": "TFT_Item_Artifact_SeekersArmguard",
        "name": "Seeker's Armguard",
        "components": [],
        "type": "artifact",
        "stats": "Takedowns increase the holder's Armor, Magic Resist, and Ability Power by @StatsPerTakedown@.",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_SeekersArmguard.TFT_Set13.tex"
    },
    {
        "id": "void-staff",
        "apiName": "TFT_Item_StatikkShiv",
        "name": "Void Staff",
        "components": [
            "recurve-bow",
            "tear-of-goddess"
        ],
        "type": "normal",
        "stats": "Damage from attacks and Abilities @MRShred@% Shred the target for @MRShredDuration@ seconds. This effect does not stack.Shred: Reduce Magic Resist",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_VoidStaff.TFT_TFT14_5.tex"
    },
    {
        "id": "gold-collector",
        "apiName": "TFT4_Item_OrnnTheCollector",
        "name": "Gold Collector",
        "components": [],
        "type": "artifact",
        "stats": "Attacks and Abilities execute enemies below @ExecutePercent@% of their maximum Health. Executions have a @GoldChance@% chance to drop  1 gold.Gold Collected: @TFTUnitProperty.item:TFT_Tracker_Value1@g[Unique - only 1 per champion]",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT4_Item_OrnnTheCollector.TFT_Set13.tex"
    },
    {
        "id": "cappa-juice",
        "apiName": "TFT_Item_Artifact_CappaJuice",
        "name": "Cappa Juice",
        "components": [],
        "type": "artifact",
        "stats": "The holder dons a Hat on each takedown. The holder gains @ADAPPerTakedown@% Attack Damage and Ability Power per Hat. On death lose @PercentHatLoss*100@% of all Hats.&nbsp;(Hats:&nbsp;@TFTUnitProperty.trait:TFT_Item_Artifact_CappaJuice_NumHats@)",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT16_Artifact_KappaJuice.TFT_Set16.tex"
    },
    {
        "id": "hextech-gunblade",
        "apiName": "TFT_Item_HextechGunblade",
        "name": "Hextech Gunblade",
        "components": [
            "bf-sword",
            "needlessly-large-rod"
        ],
        "type": "normal",
        "stats": "Heal the lowest percent Health ally for @AllyHealing*100@% of damage dealt.Ally Healing: @TFTUnitProperty.item:TFT_Tracker_Value1@",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_HextechGunblade.TFT_Set13.tex"
    },
    {
        "id": "tftitemnamestarguardianspatulaitem",
        "apiName": "TFT3_Item_StarGuardianSpatulaItem",
        "name": "tft_item_name_StarGuardianSpatulaItem",
        "components": [
            "tear-of-goddess",
            "spatula"
        ],
        "type": "normal",
        "stats": "tft_item_description_StarGuardianSpatulaItem",
        "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_StarGuardian.tex"
    },
    {
        "id": "tftitemnameumbralglaive",
        "apiName": "TFT3_Item_BlademasterSpatulaItem",
        "name": "tft_item_name_UmbralGlaive",
        "components": [
            "bf-sword",
            "spatula"
        ],
        "type": "normal",
        "stats": "tft_item_description_SlicerSpatulaItem",
        "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_Blademaster.tex"
    },
    {
        "id": "tftitemnameinfiltratorspatulaitem",
        "apiName": "TFT3_Item_InfiltratorSpatulaItem",
        "name": "tft_item_name_InfiltratorSpatulaItem",
        "components": [
            "recurve-bow",
            "spatula"
        ],
        "type": "normal",
        "stats": "tft_item_description_InfiltratorSpatulaItem",
        "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_Infiltrator.tex"
    },
    {
        "id": "tftitemnamecelestialspatulaitem",
        "apiName": "TFT3_Item_CelestialSpatulaItem",
        "name": "tft_item_name_CelestialSpatulaItem",
        "components": [
            "spatula",
            "negatron-cloak"
        ],
        "type": "normal",
        "stats": "tft_item_description_CelestialSpatulaItem",
        "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_Celestial.tex"
    },
    {
        "id": "protectors-chestguard",
        "apiName": "TFT3_Item_ProtectorSpatulaItem",
        "name": "Protector's Chestguard",
        "components": [
            "spatula",
            "giants-belt"
        ],
        "type": "normal",
        "stats": "The holder gains the Protector trait.[Unique - only 1 per champion]",
        "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_Protector.tex"
    },
    {
        "id": "tftitemnamedarkstarspatulaitem",
        "apiName": "TFT3_Item_DarkStarSpatulaItem",
        "name": "tft_item_name_DarkStarSpatulaItem",
        "components": [
            "sparring-gloves",
            "spatula"
        ],
        "type": "normal",
        "stats": "tft_item_description_DarkStarSpatulaItem",
        "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_DarkStar.tex"
    },
    {
        "id": "tftitemnamerebelspatulaitem",
        "apiName": "TFT3_Item_RebelSpatulaItem",
        "name": "tft_item_name_RebelSpatulaItem",
        "components": [
            "chain-vest",
            "spatula"
        ],
        "type": "normal",
        "stats": "tft_item_description_RebelSpatulaItem",
        "icon": "ASSETS/Maps/Particles/TFT/TFT3_Item_Rebel.tex"
    },
    {
        "id": "battlecast-plating",
        "apiName": "TFT3_Item_BattlecastSpatulaItem",
        "name": "Battlecast Plating",
        "components": [
            "needlessly-large-rod",
            "spatula"
        ],
        "type": "normal",
        "stats": "The wearer gains the Battlecast trait.[Unique - Only One Per Champion]",
        "icon": "ASSETS/Maps/Particles/TFT/TFT_Item_Battlecast.tex"
    },
    {
        "id": "tftitemnameradiantspatula",
        "apiName": "TFT5_Item_SpatulaRadiant",
        "name": "tft_item_name_RadiantSpatula",
        "components": [],
        "type": "radiant",
        "stats": "tft_item_description_RadiantSpatula",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Spatula_Radiant.tex"
    },
    {
        "id": "radiant-refactor",
        "apiName": "TFT11_Augment_RadiantRefactor",
        "name": "Radiant Refactor",
        "components": [],
        "type": "radiant",
        "stats": "Gain a Masterwork Upgrade and @anvils@ component anvil.Masterwork Upgrade upgrades an item to Radiant!",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RadiantRefactor_III.tex"
    },
    {
        "id": "artifactory",
        "apiName": "TFT_Augment_Artifactory",
        "name": "Artifactory",
        "components": [],
        "type": "artifact",
        "stats": "At the start of each turn, your benched completed items transform into a random Artifact item. Gain @NumItems@ Artifact Anvil and @NumRemovers@ Removers.",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Artifactory_III.TFT_Set13.tex"
    },
    {
        "id": "pandoras-items-iii",
        "apiName": "TFT9_Augment_PandorasRadiantBox",
        "name": "Pandora's Items III",
        "components": [],
        "type": "radiant",
        "stats": "Round start: items on your bench are randomized. Gain 1 random Radiant item.",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Pandora3.tex"
    },
    {
        "id": "radiant-relics",
        "apiName": "TFT6_Augment_RadiantRelics",
        "name": "Radiant Relics",
        "components": [],
        "type": "radiant",
        "stats": "Choose 1 of @ArmoryChoiceCount@ Radiant items. Gain a Magnetic Remover.Radiant items are very powerful versions of completed items.",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/RadiantRelic-III.tex"
    }
];
exports.itemMap = new Map(exports.items.map(i => [i.id, i]));
exports.itemByApiName = new Map(exports.items.filter(i => i.apiName).map(i => [i.apiName, i]));
function getCraftableItem(comp1, comp2) {
    return exports.items.find(item => item.components &&
        ((item.components[0] === comp1 && item.components[1] === comp2) ||
            (item.components[0] === comp2 && item.components[1] === comp1)));
}
exports.getCraftableItem = getCraftableItem;
function buildCraftingMatrix() {
    var _a, _b;
    const matrix = new Map();
    for (const comp of exports.components)
        matrix.set(comp.id, new Map());
    for (const item of exports.items) {
        if (!item.components || item.components.length !== 2)
            continue;
        const [c1, c2] = item.components;
        (_a = matrix.get(c1)) === null || _a === void 0 ? void 0 : _a.set(c2, item);
        if (c1 !== c2)
            (_b = matrix.get(c2)) === null || _b === void 0 ? void 0 : _b.set(c1, item);
    }
    return matrix;
}
exports.buildCraftingMatrix = buildCraftingMatrix;
function getItemsFromComponent(componentId) {
    return exports.items.filter(item => item.components && item.components.length === 2 && item.components.includes(componentId));
}
exports.getItemsFromComponent = getItemsFromComponent;


/***/ }),

/***/ "./src/data/set17/positioning.ts":
/*!***************************************!*\
  !*** ./src/data/set17/positioning.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPositioningGuide = exports.positioningGuides = void 0;
exports.positioningGuides = [
    {
        compId: 'morgana-dark-lady',
        placements: [
            { row: 3, col: 1, championId: 'TFT17_Mordekaiser', role: 'tank' },
            { row: 3, col: 2, championId: 'TFT17_Shen', role: 'tank' },
            { row: 3, col: 3, championId: 'TFT17_Lissandra', role: 'support' },
            { row: 1, col: 3, championId: 'TFT17_Karma', role: 'support' },
            { row: 0, col: 0, championId: 'TFT17_Morgana', role: 'carry' },
            { row: 0, col: 5, championId: 'TFT17_Vex', role: 'carry' },
            { row: 0, col: 6, championId: 'TFT17_Jhin', role: 'support' },
        ],
        notes: 'Morgana opposite-corner from enemy carry. Shen frontline-center for Bulwark shield. Vex + Jhin secondary backline pressure.'
    },
    {
        compId: 'jhin-dark-star-snipers',
        placements: [
            { row: 3, col: 1, championId: 'TFT17_Mordekaiser', role: 'tank' },
            { row: 3, col: 2, championId: 'TFT17_Lissandra', role: 'support' },
            { row: 3, col: 3, championId: 'TFT17_Shen', role: 'tank' },
            { row: 2, col: 5, championId: 'TFT17_Karma', role: 'support' },
            { row: 0, col: 0, championId: 'TFT17_Jhin', role: 'carry' },
            { row: 0, col: 1, championId: 'TFT17_Xayah', role: 'support' },
            { row: 0, col: 5, championId: 'TFT17_Ezreal', role: 'support' },
            { row: 0, col: 6, championId: 'TFT17_Gnar', role: 'support' },
        ],
        notes: 'Snipers stacked across the back row for max range. Frontline absorbs while Jhin reaches his fourth shot.'
    },
    {
        compId: 'xayah-stargazer',
        placements: [
            { row: 3, col: 1, championId: 'TFT17_Jax', role: 'tank' },
            { row: 3, col: 2, championId: 'TFT17_Nunu', role: 'tank' },
            { row: 2, col: 4, championId: 'TFT17_Talon', role: 'assassin' },
            { row: 1, col: 0, championId: 'TFT17_Lulu', role: 'support' },
            { row: 1, col: 5, championId: 'TFT17_TwistedFate', role: 'support' },
            { row: 0, col: 6, championId: 'TFT17_Xayah', role: 'carry' },
            { row: 0, col: 5, championId: 'TFT17_Caitlyn', role: 'support' },
            { row: 0, col: 0, championId: 'TFT17_Milio', role: 'support' },
        ],
        notes: 'Xayah back-corner opposite enemy carry. Jax + Nunu frontline for Bastion / Stargazer hexes. Milio safe corner for shielding.'
    },
    {
        compId: 'primordian-reroll',
        placements: [
            { row: 3, col: 0, championId: 'TFT17_Maokai', role: 'tank' },
            { row: 3, col: 2, championId: 'TFT17_RekSai', role: 'carry' },
            { row: 3, col: 3, championId: 'TFT17_Briar', role: 'tank' },
            { row: 2, col: 1, championId: 'TFT17_Belveth', role: 'carry' },
            { row: 2, col: 5, championId: 'TFT17_Illaoi', role: 'support' },
            { row: 1, col: 0, championId: 'TFT17_Aurora', role: 'support' },
        ],
        notes: "Rek'Sai frontline-center for max aggro. Bel'Veth row behind to clean up. Aurora back corner for Anima trait."
    },
    {
        compId: 'mecha-asol',
        placements: [
            { row: 3, col: 1, championId: 'TFT17_Galio', role: 'tank' },
            { row: 3, col: 2, championId: 'TFT17_Urgot', role: 'tank' },
            { row: 3, col: 3, championId: 'TFT17_Mordekaiser', role: 'tank' },
            { row: 3, col: 4, championId: 'TFT17_Blitzcrank', role: 'tank' },
            { row: 1, col: 3, championId: 'TFT17_AurelionSol', role: 'carry' },
            { row: 0, col: 0, championId: 'TFT17_Karma', role: 'support' },
            { row: 0, col: 5, championId: 'TFT17_Viktor', role: 'support' },
            { row: 0, col: 6, championId: 'TFT17_Bard', role: 'support' },
        ],
        notes: 'ASol mid-board for max AoE. Blitzcrank pulls priority targets. 4 Mecha frontline tanks the burst.'
    },
    {
        compId: 'zed-galaxy-hunter',
        placements: [
            { row: 3, col: 0, championId: 'TFT17_Mordekaiser', role: 'tank' },
            { row: 3, col: 1, championId: 'TFT17_Lissandra', role: 'support' },
            { row: 3, col: 2, championId: 'TFT17_Shen', role: 'tank' },
            { row: 2, col: 6, championId: 'TFT17_Akali', role: 'assassin' },
            { row: 1, col: 6, championId: 'TFT17_Karma', role: 'support' },
            { row: 0, col: 6, championId: 'TFT17_Zed', role: 'assassin' },
            { row: 0, col: 5, championId: 'TFT17_Talon', role: 'assassin' },
            { row: 0, col: 4, championId: 'TFT17_Kaisa', role: 'assassin' },
            { row: 0, col: 0, championId: 'TFT17_Jhin', role: 'support' },
        ],
        notes: 'Rogue stack back-right corner to dive enemy carry. Frontline opposite side baits aggro. Jhin lone-corner DPS.'
    },
    {
        compId: 'psionic-pyke-reroll',
        placements: [
            { row: 3, col: 1, championId: 'TFT17_Gragas', role: 'tank' },
            { row: 3, col: 2, championId: 'TFT17_MasterYi', role: 'tank' },
            { row: 2, col: 1, championId: 'TFT17_Viktor', role: 'support' },
            { row: 1, col: 3, championId: 'TFT17_Sona', role: 'support' },
            { row: 0, col: 6, championId: 'TFT17_Pyke', role: 'assassin' },
            { row: 0, col: 0, championId: 'TFT17_Karma', role: 'support' },
        ],
        notes: 'Pyke jumps backline. Gragas + Master Yi frontline absorb. Viktor + Sona Psionic anchors mid.'
    },
    {
        compId: 'sona-commander',
        placements: [
            { row: 3, col: 1, championId: 'TFT17_Shen', role: 'tank' },
            { row: 3, col: 2, championId: 'TFT17_Illaoi', role: 'tank' },
            { row: 3, col: 3, championId: 'TFT17_Lissandra', role: 'tank' },
            { row: 2, col: 1, championId: 'TFT17_Teemo', role: 'support' },
            { row: 1, col: 4, championId: 'TFT17_Karma', role: 'support' },
            { row: 1, col: 5, championId: 'TFT17_Bard', role: 'support' },
            { row: 0, col: 0, championId: 'TFT17_Sona', role: 'carry' },
            { row: 0, col: 5, championId: 'TFT17_Leblanc', role: 'support' },
        ],
        notes: 'Sona safe corner for Commander aura uptime. Shepherd frontline spread for max heal coverage.'
    },
    {
        compId: 'anima-fiora',
        placements: [
            { row: 3, col: 1, championId: 'TFT17_Mordekaiser', role: 'tank' },
            { row: 3, col: 2, championId: 'TFT17_Briar', role: 'tank' },
            { row: 3, col: 3, championId: 'TFT17_Belveth', role: 'tank' },
            { row: 2, col: 2, championId: 'TFT17_Akali', role: 'support' },
            { row: 2, col: 4, championId: 'TFT17_Fiora', role: 'carry' },
            { row: 1, col: 4, championId: 'TFT17_Illaoi', role: 'support' },
            { row: 0, col: 0, championId: 'TFT17_Aurora', role: 'support' },
            { row: 0, col: 5, championId: 'TFT17_Jinx', role: 'support' },
        ],
        notes: 'Fiora mid-row for Duelist range stacking. Anima frontline tanks for her. Aurora opposite corner safety.'
    },
];
const getPositioningGuide = (compId) => exports.positioningGuides.find(p => p.compId === compId);
exports.getPositioningGuide = getPositioningGuide;


/***/ }),

/***/ "./src/data/set17/traits.ts":
/*!**********************************!*\
  !*** ./src/data/set17/traits.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.traitByName = exports.traitMap = exports.traits = void 0;
exports.traits = [
    {
        id: "TFT17_AnimaSquad",
        name: "Anima",
        desc: "After losing a player combat, gain @TechPerCombat@ Tech, plus additional Tech equal to @TechPerLoss@ times the length of your loss streak. Additionally, gain @TechPerKill@ Tech per Anima takedown.<br><br>Each time Animas get @TechBreakpoint@ Tech, they prototype new Anima Weapons. You can take them, or save your Tech to get more powerful weapons next time.<br><br><row>(@MinUnits@) Start Researching! </row><br><row>(@MinUnits@) After winning a player combat, gain loot!</row>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_AnimaTech.TFT_Set17.tex",
        effects: [{ minUnits: 3, maxUnits: 5, style: "bronze" }, { minUnits: 6, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_ADMIN",
        name: "Arbiter",
        desc: "Scribe a unique divine law, allowing you to choose an effect to apply to Arbiters when a chosen cause occurs.<br><br><row>(@MinUnits@) Choose a cause and effect for your law</row><br><row>(@MinUnits@) Effects are stronger. </row>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Arbiter.TFT_Set17.tex",
        effects: [{ minUnits: 2, maxUnits: 2, style: "bronze" }, { minUnits: 3, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_ResistTank",
        name: "Bastion",
        desc: "Your team gains @TeamwideResists@ Armor and Magic Resist.<br><br>Bastions gain more, and the value doubles in the first @Duration@ seconds of combat.<br><br><row>(@MinUnits@) @BonusArmor@ %i:scaleArmor%%i:scaleMR%</row><br><row>(@MinUnits@) @BonusArmor@ %i:scaleArmor%%i:scaleMR%</row><br><row>(@MinUnits@) @BonusArmor@ %i:scaleArmor%%i:scaleMR%; Non-Bastions gain an additional @EnhancedTeamwideArmor@ %i:scaleArmor%%i:scaleMR%.</row>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_9_Bastion.tex",
        effects: [{ minUnits: 2, maxUnits: 3, style: "bronze" }, { minUnits: 4, maxUnits: 5, style: "silver" }, { minUnits: 6, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_HPTank",
        name: "Brawler",
        desc: "Your team gains @TeamwideBonus*100@% Health. Brawlers gain more.<br><br><expandRow>(@MinUnits@) +@HealthBonus*100@% maximum Health</expandRow>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_Brawler.tex",
        effects: [{ minUnits: 2, maxUnits: 3, style: "bronze" }, { minUnits: 4, maxUnits: 5, style: "silver" }, { minUnits: 6, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_ShenUniqueTrait",
        name: "Bulwark",
        desc: "Summon a placeable relic. At the start of combat, it grants adjacent allies a @PercentHealthShield*100@% max Health shield and @AttackSpeed*100@% Attack Speed.",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Bulwark.TFT_Set17.tex",
        effects: [{ minUnits: 1, maxUnits: 25000, style: "unique" }],
    },
    {
        id: "TFT17_ASTrait",
        name: "Challenger",
        desc: "Your team gains @TeamwideAS*100@% Attack Speed. Challengers gain bonus Attack Speed. When their target dies, Challengers dash to a new target and increase their Attack Speed bonus by @BurstPercent*100@% for @BurstDuration@ seconds.<br><br><row>(@MinUnits@) @AttackSpeedPercent*100@%&nbsp;%i:scaleAS%</row><br><row>(@MinUnits@) @AttackSpeedPercent*100@%&nbsp;%i:scaleAS%</row><br><row>(@MinUnits@) @AttackSpeedPercent*100@%&nbsp;%i:scaleAS%</row><br><row>(@MinUnits@) @AttackSpeedPercent*100@%&nbsp;%i:scaleAS%</row>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Challenger.TFT_Set17.tex",
        effects: [{ minUnits: 2, maxUnits: 2, style: "bronze" }, { minUnits: 3, maxUnits: 3, style: "silver" }, { minUnits: 4, maxUnits: 4, style: "silver" }, { minUnits: 5, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_MissFortuneUndeterminedTrait",
        name: "Choose Trait",
        desc: "When you field Miss Fortune, choose between Conduit Mode, Challenger Mode, and Replicator Mode. Miss Fortune has a unique ability based on her mode and gains the associated trait.",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_MissFortuneUndetermindedTrait.TFT_Set17.tex",
    },
    {
        id: "TFT17_SonaUniqueTrait",
        name: "Commander",
        desc: "(@MinUnits@) Sona gives you a random Command Mod every @RoundsPerMod@ rounds which allows you to alter the way an ally behaves during combat. Command Mods last @RoundsPerMod@ player combats even if they are not equipped.",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Commander.TFT_Set17.tex",
        effects: [{ minUnits: 1, maxUnits: 25000, style: "unique" }],
    },
    {
        id: "TFT17_ManaTrait",
        name: "Conduit",
        desc: "Innate: Conduits gain @InnateManaGain*100@% additional Mana from all sources.<br><br>Your team gains Mana Regen, increased for Conduits.<br><br><expandRow>(@MinUnits@) @TeamManaRegen@ %i:TFTManaRegen% | @ChannelerManaRegen@ %i:TFTManaRegen%</expandRow><br><br>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Channeler.TFT_Set17.tex",
        effects: [{ minUnits: 2, maxUnits: 2, style: "bronze" }, { minUnits: 3, maxUnits: 3, style: "silver" }, { minUnits: 4, maxUnits: 4, style: "silver" }, { minUnits: 5, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_MorganaUniqueTrait",
        name: "Dark Lady",
        desc: "Allies take @UntransformedAbilityDA*100@% less damage from abilities, increased to @TransformedAbilityDA*100@% while Morgana is in Dark Form.",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_DarkLady.TFT_Set17.tex",
        effects: [{ minUnits: 1, maxUnits: 1, style: "unique" }],
    },
    {
        id: "TFT17_DarkStar",
        name: "Dark Star",
        desc: "<row>(@MinUnits@) Dark Stars create a black hole that consumes enemies at @ExecuteHPPercent*100@% max health.</row><br><row>(@MinUnits@) AND they gain @ADAP@% %i:scaleAD%%i:scaleAP%.</row><br><row>(@MinUnits@) AND the strongest Dark Star unit goes supermassive, gaining @SupermassivePercentBonus*100@% effectiveness from Dark Star, and creates 2 minor Black Holes.</row><br><row>(@MinUnits@) All Dark Stars are supermassive. At level 10, CONSUME EVERYONE. </row>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_DarkStar.TFT_Set17.tex",
        effects: [{ minUnits: 2, maxUnits: 3, style: "bronze" }, { minUnits: 4, maxUnits: 5, style: "silver" }, { minUnits: 6, maxUnits: 8, style: "gold" }, { minUnits: 9, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_FioraUniqueTrait",
        name: "Divine Duelist",
        desc: "Your Tactician heals for @PlayerOmnivamp*100@% of player damage dealt from winning.<br><br>Fiora always wins a one on one duel.",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_DivineDuelist.TFT_Set17.tex",
        effects: [{ minUnits: 1, maxUnits: 25000, style: "unique" }],
    },
    {
        id: "TFT17_VexUniqueTrait",
        name: "Doomer",
        desc: "Combat Start: Mark all enemies with Doom.<br><br>The first time enemies are damaged each combat, their Doom is consumed, stealing @ADAP1@% Attack Damage and Ability Power from them and granting it to your strongest Vex.",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Doomer.TFT_Set17.tex",
        effects: [{ minUnits: 1, maxUnits: 25000, style: "unique" }],
    },
    {
        id: "TFT17_JhinUniqueTrait",
        name: "Eradicator",
        desc: "Enemies have @PctResists*100@% less Armor and Magic Resist.",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Singularity.TFT_Set17.tex",
        effects: [{ minUnits: 1, maxUnits: 1, style: "unique" }],
    },
    {
        id: "TFT17_GravesTrait",
        name: "Factory New",
        desc: "After participating in combat, open an armory to purchase a permanent upgrade for your strongest Graves.<br><br>Every @NumberOfUpgradesBeforeRoundCostIncrease@ upgrades, future upgrades will take an additional round.<br><br><rules>Next Upgrade: @TFTUnitProperty.trait:TFT17_GravesTrait_RoundsUntilUpgrade@ Rounds.</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_FactoryNew.TFT_Set17.tex",
        effects: [{ minUnits: 1, maxUnits: 25000, style: "unique" }],
    },
    {
        id: "TFT17_Fateweaver",
        name: "Fateweaver",
        desc: "Innate: Fateweavers have <TFTKeyword>Precision</TFTKeyword>.<br><br><row>(@MinUnits@) Chance effects on abilities are <TFTKeyword>Lucky</TFTKeyword>.</row><br><row>(@MinUnits@) Gain @CritChance*100@% Crit Chance and @CritDamage@%&nbsp;Crit Damage. Critical strikes are also <TFTKeyword>Lucky</TFTKeyword>.</row><br><br>{{TFT_Keyword_Precision}}<br><rules>Lucky: Check twice and take the better outcome.</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Fateweaver.TFT_Set17.tex",
        effects: [{ minUnits: 2, maxUnits: 3, style: "bronze" }, { minUnits: 4, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_ZedUniqueTrait",
        name: "Galaxy Hunter",
        desc: "Zed is obtained from the Invader Zed augment.<br><br>While at least one clone is alive, Zed gains @BonusAD*100@% bonus Attack Damage.",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_GalaxyHunter.TFT_Set17.tex",
        effects: [{ minUnits: 1, maxUnits: 25000, style: "unique" }],
    },
    {
        id: "Set17_CarouselMarket_EmpoweredHexTrait",
        name: "God-Blessed",
        desc: "@TFTUnitProperty.trait:TFT17_CarouselMarket_TraitTRAKey1@<br><br>@TFTUnitProperty.trait:TFT17_CarouselMarket_TraitTRAKey2@<br><br>@TFTUnitProperty.trait:TFT17_CarouselMarket_TraitTRAKey3@<br><br>@TFTUnitProperty.trait:TFT17_CarouselMarket_TraitTRAKey4@<br><br>@TFTUnitProperty.trait:TFT17_CarouselMarket_TraitTRAKey5@<br><br>@TFTUnitProperty.trait:TFT17_CarouselMarket_TraitTRAKey6@<br><br>@TFTUnitProperty.trait:TFT17_CarouselMarket_TraitTRAKey7@<br><br>@TFTUnitProperty.trait:TFT17_CarouselMarket_TraitTRAKey8@<br><br>@TFTUnitProperty.trait:TFT17_CarouselMarket_TraitTRAKey9@<br><br>@TFTUnitProperty.trait:TFT17_CarouselMarket_TraitTRAKey10@<br>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_GodBlessed.TFT_Set17.tex",
    },
    {
        id: "TFT17_MissFortuneUniqueTrait",
        name: "Gun Goddess",
        desc: "When you field Miss Fortune, choose between Conduit Mode, Challenger Mode, and Replicator Mode. Miss Fortune has a unique ability based on her mode and gains the associated trait.",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_GunGoddess.TFT_Set17.tex",
        effects: [{ minUnits: 1, maxUnits: 25000, style: "unique" }],
    },
    {
        id: "TFT17_MeleeTrait",
        name: "Marauder",
        desc: "Your team gains @TeamwideBonus*100@% Omnivamp. Marauders gain more Omnivamp, Attack Damage, and their Omnivamp overhealing is converted into Shield (up to @MaxPercentHealthShield*100@% max Health.)<br><br><row>(@MinUnits@) @Omnivamp*100@% %i:scaleSV%, @AD*100@% %i:scaleAD%</row><br><row>(@MinUnits@) @Omnivamp*100@% %i:scaleSV%, @AD*100@% %i:scaleAD%</row><br><row>(@MinUnits@) @Omnivamp*100@% %i:scaleSV%, @AD*100@% %i:scaleAD%.</row>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_16_Slayer.tex",
        effects: [{ minUnits: 2, maxUnits: 3, style: "bronze" }, { minUnits: 4, maxUnits: 5, style: "silver" }, { minUnits: 6, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_Mecha",
        name: "Mecha",
        desc: "Innate: Mecha units can transform into their Ultimate form, upgrading their ability and gaining @TransformedPercentHealth*100@% Health. Transformed Mechas take up two team slots and count twice for the Mecha trait.<br><br><row>(@MinUnits@) Energy Cells: Mechas gain @AP@%&nbsp;%i:scaleAD%%i:scaleAP%.</row><br><row>(@MinUnits@) Overclocked Cells: Increased to @AP@%&nbsp;%i:scaleAD%%i:scaleAP%.</row><br><row>(@MinUnits@) Precision Engineering: +@TeamSize@ max team size</row><br><br><rules>Use the Mecha-Former item to toggle the forms of your Mecha units</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Mecha.TFT_Set17.tex",
        effects: [{ minUnits: 3, maxUnits: 3, style: "bronze" }, { minUnits: 4, maxUnits: 5, style: "silver" }, { minUnits: 6, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_Astronaut",
        name: "Meeple",
        desc: "Meeple attract Meeps that empower Meeple abilities in meepy ways. They also gain bonus Health.<br><br><row>(@MinUnits@) @Meeps@ %i:set14AmpIcon%, @BonusHealth@ %i:scaleHealth%</row><br><row>(@MinUnits@) @Meeps@ %i:set14AmpIcon%, @BonusHealth@ %i:scaleHealth%</row><br><row>(@MinUnits@) @Meeps@ %i:set14AmpIcon%, @BonusHealth@ %i:scaleHealth%. Create a Cloning Slot on your bench. Gain gold and a 1-star copy of the champion placed there when cloning completes.</row><br><row>(@MinUnits@) @Meeps@ %i:set14AmpIcon%, @BonusHealth@ %i:scaleHealth%. SUMMON THE FOUR MEEPLORDS!</row><br><br><rules>Cloning time = Champion cost</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Astronaut.TFT_Set17.tex",
        effects: [{ minUnits: 3, maxUnits: 4, style: "bronze" }, { minUnits: 5, maxUnits: 6, style: "silver" }, { minUnits: 7, maxUnits: 9, style: "gold" }, { minUnits: 10, maxUnits: 25000, style: "prismatic" }],
    },
    {
        id: "TFT17_DRX",
        name: "N.O.V.A.",
        desc: "<row>(@MinUnits@) @TeamAttackDelay@ seconds into combat, N.O.V.A. grant a power surge to allies based on champions.</row><br><row>(@MinUnits@) Gain a Striker selector. The chosen N.O.V.A. activates their Strike during the power surge.</row><br><br><ShowIf.TFT17_DRX_HasAatrox><status>Aatrox:</status> Ally Damage @ShredAndSunder*100@% <TFTKeyword>Shred</TFTKeyword> and <TFTKeyword>Sunders</TFTKeyword> enemies</ShowIf.TFT17_DRX_HasAatrox><ShowIfNot.TFT17_DRX_HasAatrox><TFTGuildInactive>Aatrox: Shred and Sunder enemies</TFTGuildInactive></ShowIfNot.TFT17_DRX_HasAatrox><br><ShowIf.TFT17_DRX_HasCaitlyn><status>Caitlyn:</status> Grant allies @AS*100@% Attack Speed</ShowIf.TFT17_DRX_HasCaitlyn><ShowIfNot.TFT17_DRX_HasCaitlyn><TFTGuildInactive>Caitlyn: Grant Attack Speed</TFTGuildInactive></ShowIfNot.TFT17_DRX_HasCaitlyn><br><ShowIf.TFT17_DRX_HasAkali><status>Akali:</status> Allies gain <TFTKeyword>Precision</TFTKeyword></ShowIf.TFT17_DRX_HasAkali><ShowIfNot.TFT17_DRX_HasAkali><TFTGuildInactive>Akali: Allies gain Precision</TFTGuildInactive></ShowIfNot.TFT17_DRX_HasAkali><br><ShowIf.TFT17_DRX_HasMaokai><status>Maokai:</status> Allies heal @Heal*100@% max Health</ShowIf.TFT17_DRX_HasMaokai><ShowIfNot.TFT17_DRX_HasMaokai><TFTGuildInactive>Maokai: Heal allies</TFTGuildInactive></ShowIfNot.TFT17_DRX_HasMaokai><br><ShowIf.TFT17_DRX_HasKindred><status>Kindred:</status> Shield the strongest Tank for <TFTBonus>@ShieldValue@</TFTBonus></ShowIf.TFT17_DRX_HasKindred><ShowIfNot.TFT17_DRX_HasKindred><TFTGuildInactive>Kindred: Shield an ally</TFTGuildInactive></ShowIfNot.TFT17_DRX_HasKindred><br><ShowIf.TFT17_DRX_HasEmblem><status>Emblem:</status> Allies deal @BonusTrueDamage*100@% stacking bonus true damage</ShowIf.TFT17_DRX_HasEmblem><ShowIfNot.TFT17_DRX_HasEmblem><TFTGuildInactive>Emblem: Deal bonus true damage</TFTGuildInactive></ShowIfNot.TFT17_DRX_HasEmblem>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_NOVA.TFT_Set17.tex",
        effects: [{ minUnits: 2, maxUnits: 4, style: "bronze" }, { minUnits: 5, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_TahmKenchUniqueTrait",
        name: "Oracle",
        desc: "Every @Rounds@ rounds, Tahm Kench grants a reward!<br><br>Rounds Remaining: @TFTUnitProperty.trait:TFT17_TahmKench_RoundsRemaining@<br>Last Reward: @TFTUnitProperty.trait:TFT17_TahmKench_LastReward@",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_12_Arcana.TFT_Set12.tex",
        effects: [{ minUnits: 1, maxUnits: 25000, style: "unique" }],
    },
    {
        id: "TFT17_BlitzcrankUniqueTrait",
        name: "Party Animal",
        desc: "Once per combat, after falling below @HealthThreshold*100@% percent Health, become untargetable and repair @PercentHealthHeal*100@% max Health per second. Upon reaching full Health, or when no other allies remain, return to combat. If fully healed, for the rest of combat Blitzcrank is in {{TFT17_SpaceGroove_TheGroove}} and Party Crasher's passive fires bolts four times as fast.",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_PartyAnimal.TFT_Set17.tex",
        effects: [{ minUnits: 1, maxUnits: 25000, style: "unique" }],
    },
    {
        id: "TFT17_Primordian",
        name: "Primordian",
        desc: "<row>(@MinUnits@) Dealing damage spawns Swarmlings based on unique Primordian star level.</row><br><row>(@MinUnits@) Spawn @PercentMoreSwarmlings@% more Swarmlings! After each player combat, gain a random 1 or 2-cost champion. </row><br><br><rules>@DamageTakenPercentModifier*100@% of damage taken contributes to damage dealt.</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Primordian.TFT_Set17.tex",
        effects: [{ minUnits: 2, maxUnits: 2, style: "bronze" }, { minUnits: 3, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_PsyOps",
        name: "Psionic",
        desc: "Gain Psionic items that can be equipped to any ally.<br><br><row>(@MinUnits@) Gain the @TFTUnitProperty.trait:TFT17_PsyOps_Item1@</row><br><row>(@MinUnits@) Gain the @TFTUnitProperty.trait:TFT17_PsyOps_Item2@, Psionic items gain extra effects on Psionic units</row><br><br><br>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_PsyOps.TFT_Set17.tex",
        effects: [{ minUnits: 2, maxUnits: 3, style: "bronze" }, { minUnits: 4, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_RhaastUniqueTrait",
        name: "Redeemer",
        desc: "<row>(@MinUnits@) For each non-unique trait you have active, your team gains @BonusOffensiveStat1*100@%/@BonusOffensiveStat2*100@%/@BonusOffensiveStat3*100@% Attack Speed, and @BonusDefensiveStat1@/@BonusDefensiveStat2@/@BonusDefensiveStat3@ Armor and Magic Resist.</row><br><br>Teamwide Attack Speed: @TFTUnitProperty.trait:TFT17_RhaastUnique_OffensiveStatToGain@% %i:scaleAS%<br>Teamwide Resists: @TFTUnitProperty.trait:TFT17_RhaastUnique_DefensiveStatToGain@ %i:scaleArmor%%i:scaleMR%",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Redeemer.TFT_Set17.tex",
        effects: [{ minUnits: 1, maxUnits: 25000, style: "unique" }],
    },
    {
        id: "TFT17_APTrait",
        name: "Replicator",
        desc: "Replicator abilities occur a second time at reduced effectiveness.<br><br><expandRow>(@MinUnits@) @Effectiveness*100@% strength</expandRow>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Replicator.TFT_Set17.tex",
        effects: [{ minUnits: 2, maxUnits: 3, style: "bronze" }, { minUnits: 4, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_AssassinTrait",
        name: "Rogue",
        desc: "Rogues gain Attack Damage and Ability Power. The first time they fall below @HealthThreshold*100@% health, they slip into shadows. Enemies targeting them are redirected to a nearby unit, preferring Tanks.<br><br><row>(@MinUnits@) @AP@% %i:scaleAD% %i:scaleAP%</row><br><row>(@MinUnits@) @AP@% %i:scaleAD% %i:scaleAP%</row><br><row>(@MinUnits@) @AP@% %i:scaleAD% %i:scaleAP%</row><br><row>(@MinUnits@) @AP@% %i:scaleAD% %i:scaleAP%</row>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Rogue.TFT_Set17.tex",
        effects: [{ minUnits: 2, maxUnits: 2, style: "bronze" }, { minUnits: 3, maxUnits: 3, style: "silver" }, { minUnits: 4, maxUnits: 4, style: "silver" }, { minUnits: 5, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_SummonTrait",
        name: "Shepherd",
        desc: "Shepherds summon the Bond of the Stars to aid them in battle.<br><br><row>(@MinUnits@) Summon Bia</row><br><row>(@MinUnits@) Summon Bayin</row><br><row>(@MinUnits@) Bia and Bayin's bond grows deeper</row><br><br><rules>Bia and Bayin's power are increased by the total star level of all Shepherds.</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Shepherd.TFT_Set17.tex",
        effects: [{ minUnits: 3, maxUnits: 4, style: "bronze" }, { minUnits: 5, maxUnits: 6, style: "silver" }, { minUnits: 7, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_RangedTrait",
        name: "Sniper",
        desc: "Snipers gain Damage Amp, increased against targets farther away.<br><br><row>(@MinUnits@) @PercentDamageIncrease@%&nbsp;%i:scaleDA%; +@PerHexIncrease@%&nbsp;%i:scaleDA% per hex</row><br><row>(@MinUnits@) @PercentDamageIncrease@%&nbsp;%i:scaleDA%; +@PerHexIncrease@%&nbsp;%i:scaleDA% per hex</row><br><row>(@MinUnits@) @PercentDamageIncrease@%&nbsp;%i:scaleDA%; +@PerHexIncrease@%&nbsp;%i:scaleDA% per hex</row>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_6_Sniper.tex",
        effects: [{ minUnits: 2, maxUnits: 2, style: "bronze" }, { minUnits: 3, maxUnits: 3, style: "silver" }, { minUnits: 4, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_SpaceGroove",
        name: "Space Groove",
        desc: "<row>(@MinUnits@) Groovians can enter {{TFT17_SpaceGroove_TheGroove}}. While in it, they gain Attack Speed and max Health Regen, increased per Groovian on your team.</row><br><row>(@MinUnits@) All Groovians start combat in {{TFT17_SpaceGroove_TheGroove}} for @StartOfCombatDuration@ seconds.</row><br><row>(@MinUnits@) Each second spent in {{TFT17_SpaceGroove_TheGroove}} grants @ADAPPerSecond@% stacking Attack Damage and Ability Power.</row><br><row>(@MinUnits@) Increase these effects by @EffectBonus@%!</row><br><row>(@MinUnits@) {{TFT17_SpaceGroove_Groove}}</row><br><br>{{TFT17_SpaceGroove_TheGroove}}: @TFTUnitProperty.:TFT17_SpaceGroove_AS*100@% %i:scaleAS%, @TFTUnitProperty.:TFT17_SpaceGroove_HealthRegen*100@% %i:scaleHPRegen%",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_SpaceGroove.TFT_Set17.tex",
        effects: [{ minUnits: 1, maxUnits: 2, style: "bronze" }, { minUnits: 3, maxUnits: 4, style: "silver" }, { minUnits: 5, maxUnits: 6, style: "silver" }, { minUnits: 7, maxUnits: 9, style: "gold" }, { minUnits: 10, maxUnits: 25000, style: "prismatic" }],
    },
    {
        id: "TFT17_Stargazer_Wolf",
        name: "Stargazer",
        desc: "Stargazers chart a different constellation every game. This game: <TFTStargazer>The Boar</TFTStargazer>.<br><br>Gain gold after winning player combat. Allies in empowered hexes gain @Wolf_Health_Teamwide*100@% Health, Attack Damage, and Ability Power. Stargazers gain more.<br><br>(Gold Earned: @TFTUnitProperty.trait:TFT17_Stargazer_Wolf_TotalGold@)<br><br><expandRow>(@MinUnits@) @Wolf_Gold@ gold, @Wolf_Health*100@% %i:scaleHealth%, @Wolf_ADAP@% %i:scaleAD%%i:scaleAP%</expandRow><br><br><rules>More hexes reveal at each player level</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Stargazer.TFT_Set17.tex",
        effects: [{ minUnits: 3, maxUnits: 3, style: "bronze" }, { minUnits: 4, maxUnits: 4, style: "silver" }, { minUnits: 5, maxUnits: 5, style: "silver" }, { minUnits: 6, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_Stargazer_Medallion",
        name: "Stargazer",
        desc: "Stargazers chart a different constellation every game. This game: <TFTStargazer>The Medallion</TFTStargazer>.<br><br><row>(@MinUnits@) Allies in empowered hexes gain @Medallion_DA@% Damage Amp, which increases by @Medallion_IncreasePer3Star@% for each 3-star ally.</row><br><br>(Current&nbsp;Bonus:&nbsp;@TFTUnitProperty.trait:TFT17_Stargazer_Medallion_Increase@% %i:scaleDA%)<br><br><rules>More hexes reveal at each player level</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Stargazer.TFT_Set17.tex",
        effects: [{ minUnits: 3, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_Stargazer_Huntress",
        name: "Stargazer",
        desc: "Stargazers chart a different constellation every game. This game: <TFTStargazer>The Huntress</TFTStargazer>.<br><br>Combat Start: Mark the highest Health enemies. <br><br>Allies in empowered hexes gain @Huntress_AS_Teamwide*100@% Attack Speed. Stargazers in empowered hexes gain more and heal for @Huntress_Heal*100@% of their max Health when a marked enemy dies.<br><br><row>(@MinUnits@) @Huntress_AS*100@% %i:scaleAS%, @NumMarks@ marks</row><br><row>(@MinUnits@) @Huntress_AS*100@% %i:scaleAS%, @NumMarks@ marks</row><br><row>(@MinUnits@) @Huntress_AS*100@% %i:scaleAS%, @NumMarks@ marks</row><br><br><rules>More hexes reveal at each player level</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Stargazer.TFT_Set17.tex",
        effects: [{ minUnits: 3, maxUnits: 4, style: "bronze" }, { minUnits: 5, maxUnits: 6, style: "silver" }, { minUnits: 7, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_Stargazer_Serpent",
        name: "Stargazer",
        desc: "Stargazers chart a different constellation every game. This game: <TFTStargazer>The Serpent</TFTStargazer>.<br><br>Allies in empowered hexes gain @Serpent_DR_Teamwide*100@% Durability. Stargazers in empowered hexes gain more and poison enemies, repeating a portion of damage dealt as magic damage over @Serpent_Duration@ seconds.<br><br><expandRow>(@MinUnits@) @Serpent_DR*100@% %i:scaleDR%, @Serpent_Poison*100@% poison damage</expandRow><br><br><rules>More hexes reveal at each player level</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Stargazer.TFT_Set17.tex",
        effects: [{ minUnits: 3, maxUnits: 4, style: "bronze" }, { minUnits: 5, maxUnits: 6, style: "silver" }, { minUnits: 7, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_Stargazer_Shield",
        name: "Stargazer",
        desc: "Stargazers chart a different constellation every game. This game: <TFTStargazer>The Altar</TFTStargazer>.<br><br><row>(@MinUnits@) When ANY champion dies, they are sacrificed to the Altar. Allies in empowered hexes gain @Shield_Health_Teamwide@% Health and @Shield_AS_Teamwide@% Attack Speed.<br><br>After @Shield_NumDeaths@ sacrifices, Stargazers in empowered hexes gain an additional @Shield_CashoutHP@% %i:scaleHealth% and @Shield_CashoutAS@% %i:scaleAS%<br><br>Sacrifices: (@TFTUnitProperty.trait:TFT17_Stargazer_Shield_Deaths@ / @Shield_NumDeaths@)</row><br><br><rules>More hexes reveal at each player level</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Stargazer.TFT_Set17.tex",
        effects: [{ minUnits: 3, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_Stargazer_Fountain",
        name: "Stargazer",
        desc: "Stargazers chart a different constellation every game. This game: <TFTStargazer>The Fountain</TFTStargazer>.<br><br>Allies in empowered hexes gain @Fountain_ManaRegen_Teamwide@ Mana Regen. Stargazers in empowered hexes gain more and heal the lowest Health ally with their abilities.<br><br><expandRow>(@MinUnits@) @Fountain_ManaRegen@ %i:TFTManaRegen%, @Fountain_HealPercent*100@% ability damage heal</expandRow><br><br><rules>More hexes reveal at each player level</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Stargazer.TFT_Set17.tex",
        effects: [{ minUnits: 3, maxUnits: 4, style: "bronze" }, { minUnits: 5, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_Stargazer_Mountain",
        name: "Stargazer",
        desc: "Stargazers chart a different constellation every game. This game: <TFTStargazer>The Mountain</TFTStargazer><br><br>Every @Mountain_RoundsPerEmblem@ player combats, gain a Stargazer Emblem. Stargazers in empowered hexes gain various bonuses.<br><br>(Combats Remaining:&nbsp;@TFTUnitProperty.trait:TFT17_Stargazer_Mountain_CombatsRemaining@)<br><br><row>(@MinUnits@) Gain @Mountain_Health*100@% Health</row><br><row>(@MinUnits@) AND @Mountain_ADAP*100@% Attack Damage and Ability Power</row><br><row>(@MinUnits@) AND @Mountain_Resists@ Armor and Magic Resist</row><br><row>(@MinUnits@) AND @Mountain_AS*100@% Attack Speed</row><br><row>(@MinUnits@) AND @Mountain_DR*100@% Durability</row><br><row>(@MinUnits@) AND increase all other bonuses by @Mountain_StatIncrease*100@%</row><br><br><rules>More hexes reveal at each player level</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Stargazer.TFT_Set17.tex",
        effects: [{ minUnits: 3, maxUnits: 3, style: "bronze" }, { minUnits: 4, maxUnits: 4, style: "silver" }, { minUnits: 5, maxUnits: 5, style: "silver" }, { minUnits: 6, maxUnits: 6, style: "silver" }, { minUnits: 7, maxUnits: 7, style: "silver" }, { minUnits: 8, maxUnits: 8, style: "gold" }, { minUnits: 9, maxUnits: 9, style: "gold" }, { minUnits: 10, maxUnits: 10, style: "gold" }, { minUnits: 11, maxUnits: 25000, style: "prismatic" }],
    },
    {
        id: "TFT17_Stargazer",
        name: "Stargazer",
        desc: "Stargazers chart a different constellation every game.<br><br>Stargazers in empowered hexes gain various bonuses, starting at (@MinUnits@) units.<br><br><rules>More hexes reveal at each player level.</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Stargazer.TFT_Set17.tex",
        effects: [{ minUnits: 3, maxUnits: 4, style: "bronze" }, { minUnits: 5, maxUnits: 6, style: "silver" }, { minUnits: 7, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_Timebreaker",
        name: "Timebreaker",
        desc: "<row>(@MinUnits@) When you lose, gain free rerolls. When you win, store XP in a Temporal Core (scales with stage).</row><br><row>(@MinUnits@) AND Allies gain @AttackSpeed*100@% Attack Speed.</row><br><row>(@MinUnits@) AND Timebreakers gain an additional @TimebreakerAdditionalAS*100@% Attack Speed</row><br><br><rules>Rerolls on Loss: @TFTUnitProperty.:TFT17_Timebreaker_NumRerollsTooltip@<br>XP on Win: @TFTUnitProperty.:TFT17_Timebreaker_NumXPTooltip@</rules>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Timebreaker.TFT_Set17.tex",
        effects: [{ minUnits: 2, maxUnits: 2, style: "bronze" }, { minUnits: 3, maxUnits: 3, style: "silver" }, { minUnits: 4, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_ShieldTank",
        name: "Vanguard",
        desc: "Vanguards gain @DamageReductionPct*100@% Durability while Shielded. <br><br>Combat start and @HealthThreshold*100@%&nbsp;Health: Gain a max Health Shield for @ShieldDuration@&nbsp;seconds.<br><br><row>(@MinUnits@) @ShieldPercentAmount*100@% max Health</row><br><row>(@MinUnits@) @ShieldPercentAmount*100@% max Health</row><br><row>(@MinUnits@) @ShieldPercentAmount*100@% max Health;<br>@EnhancedDurability*100@%&nbsp;%i:scaleDR% while Shielded</row>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_12_Vanguard.TFT_Set12.tex",
        effects: [{ minUnits: 2, maxUnits: 3, style: "bronze" }, { minUnits: 4, maxUnits: 5, style: "silver" }, { minUnits: 6, maxUnits: 25000, style: "gold" }],
    },
    {
        id: "TFT17_FlexTrait",
        name: "Voyager",
        desc: "Combat Start: Your Tanks gain a Shield for @ShieldDuration@ seconds. Your other allies gain Damage Amp. <br><br>Voyagers gain double.<br><br><expandRow>(@MinUnits@) @ShieldHP@ Shield; @BonusDA*100@% %i:scaleDA%</expandRow><br>",
        icon: "ASSETS/UX/TraitIcons/Trait_Icon_17_Voyager.TFT_Set17.tex",
        effects: [{ minUnits: 2, maxUnits: 2, style: "bronze" }, { minUnits: 3, maxUnits: 3, style: "silver" }, { minUnits: 4, maxUnits: 4, style: "silver" }, { minUnits: 5, maxUnits: 5, style: "silver" }, { minUnits: 6, maxUnits: 25000, style: "gold" }],
    },
];
exports.traitMap = new Map(exports.traits.map(t => [t.id, t]));
exports.traitByName = new Map(exports.traits.map(t => [t.name, t]));


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

/***/ "./src/services/CompViewerRenderer.ts":
/*!********************************************!*\
  !*** ./src/services/CompViewerRenderer.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultPinIfNone = exports.getPinnedLiveCompKey = exports.getPinnedCompId = exports.pinLiveComp = exports.pinCompId = exports.CompViewerRenderer = void 0;
const comps_1 = __webpack_require__(/*! ../data/set17/comps */ "./src/data/set17/comps.ts");
const champions_1 = __webpack_require__(/*! ../data/set17/champions */ "./src/data/set17/champions.ts");
const items_1 = __webpack_require__(/*! ../data/set17/items */ "./src/data/set17/items.ts");
const traits_1 = __webpack_require__(/*! ../data/set17/traits */ "./src/data/set17/traits.ts");
const positioning_1 = __webpack_require__(/*! ../data/set17/positioning */ "./src/data/set17/positioning.ts");
const assetUrls_1 = __webpack_require__(/*! ../data/assetUrls */ "./src/data/assetUrls.ts");
const PINNED_KEY = 'pivottft_pinned_comp_id';
function escapeForAttr(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
function readPin() {
    var _a;
    let raw = null;
    try {
        raw = localStorage.getItem(PINNED_KEY);
    }
    catch (_b) {
        return null;
    }
    if (!raw)
        return null;
    if (raw.charAt(0) === '{') {
        try {
            const p = JSON.parse(raw);
            if ((p === null || p === void 0 ? void 0 : p.kind) === 'live' && ((_a = p.live) === null || _a === void 0 ? void 0 : _a.compKey))
                return { kind: 'live', live: p.live };
            if ((p === null || p === void 0 ? void 0 : p.kind) === 'curated' && p.id)
                return { kind: 'curated', id: p.id };
        }
        catch (_c) { }
        return null;
    }
    return { kind: 'curated', id: raw };
}
class CompViewerRenderer {
    static init() {
        this.render();
        window.addEventListener('storage', (e) => {
            if (e.key === PINNED_KEY)
                this.render();
        });
    }
    static render() {
        const pin = readPin();
        const empty = document.getElementById('viewer-empty-state');
        const content = document.getElementById('viewer-content');
        const nameEl = document.getElementById('viewer-comp-name');
        if (!pin) {
            if (empty)
                empty.style.display = 'flex';
            if (content)
                content.style.display = 'none';
            if (nameEl)
                nameEl.textContent = 'No comp pinned';
            return;
        }
        if (pin.kind === 'live') {
            this.renderLivePin(pin.live, { empty, content, nameEl });
            return;
        }
        const comp = comps_1.metaComps.find(c => c.id === pin.id);
        if (!comp) {
            if (empty)
                empty.style.display = 'flex';
            if (content)
                content.style.display = 'none';
            if (nameEl)
                nameEl.textContent = 'No comp pinned';
            return;
        }
        if (empty)
            empty.style.display = 'none';
        if (content)
            content.style.display = 'block';
        if (nameEl) {
            nameEl.innerHTML = `
        <span class="viewer-tier-badge tier-${comp.tier.toLowerCase()}">${comp.tier}</span>
        <span class="viewer-comp-name-text">${comp.name}</span>
        <span class="viewer-comp-meta">${comp.playstyle} · Lv${comp.level}</span>
      `;
        }
        this.renderUnits(comp);
        this.renderItems(comp);
        this.renderTraits(comp);
        this.renderBoard(comp);
        this.renderTips(comp);
    }
    static renderLivePin(live, refs) {
        const { empty, content, nameEl } = refs;
        if (empty)
            empty.style.display = 'none';
        if (content)
            content.style.display = 'block';
        if (nameEl) {
            const avg = live.stats.avg.toFixed(2);
            const top4 = (live.stats.top4 * 100).toFixed(0);
            const win = (live.stats.win * 100).toFixed(0);
            nameEl.innerHTML = `
        <span class="viewer-tier-badge viewer-tier-live">LIVE</span>
        <span class="viewer-comp-name-text">${escapeForAttr(live.title)}</span>
        <span class="viewer-comp-meta">AVG ${avg} · TOP4 ${top4}% · WIN ${win}% · ${live.stats.games} games</span>
      `;
        }
        const unitsEl = document.getElementById('viewer-units');
        if (unitsEl) {
            if (live.carries.length === 0) {
                unitsEl.innerHTML = '<div class="viewer-empty-line">No carry units identified (flexible comp).</div>';
            }
            else {
                unitsEl.innerHTML = live.carries.map(id => {
                    const champ = champions_1.championMap.get(id);
                    if (!champ)
                        return '';
                    const icon = assetUrls_1.getChampionIconUrl(id);
                    const initials = champ.name.split(' ').map(w => w[0]).join('').substring(0, 2);
                    return `
            <div class="viewer-unit cost-${champ.cost} is-carry" title="${escapeForAttr(champ.name)} — live data carry (${champ.cost}g)">
              <div class="viewer-unit-stars">★★</div>
              <div class="viewer-unit-portrait">
                ${icon
                        ? `<img src="${icon}" alt="${escapeForAttr(champ.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
                        : ''}
                <div class="unit-initials" ${icon ? 'style="display:none"' : ''}>${initials}</div>
                <span class="viewer-unit-carry-crown">👑</span>
              </div>
              <div class="viewer-unit-name">${escapeForAttr(champ.name)}</div>
            </div>`;
                }).join('');
            }
        }
        const itemsEl = document.getElementById('viewer-items');
        if (itemsEl) {
            itemsEl.innerHTML = '<div class="viewer-empty-line">Live data — open Live Meta › comp card › Build Path for typical items per stage.</div>';
        }
        const traitsEl = document.getElementById('viewer-traits');
        if (traitsEl) {
            traitsEl.innerHTML = live.traits.slice(0, 4).map(t => {
                const td = traits_1.traitMap.get(t.id);
                const label = (td === null || td === void 0 ? void 0 : td.name) || t.id;
                return `<span class="trait-badge" title="${escapeForAttr(label)} (${t.tier})">${escapeForAttr(label)} ${t.tier}</span>`;
            }).join('') || '<span class="viewer-empty-line">No styled traits.</span>';
        }
        const board = document.getElementById('viewer-board');
        if (board)
            board.innerHTML = '';
        const boardNotes = document.getElementById('viewer-board-notes');
        if (boardNotes)
            boardNotes.innerHTML = '<p class="board-notes-text">No positioning guide for live comps. Use the curated tier list for board layouts.</p>';
        const tipsSection = document.getElementById('viewer-tips-section');
        if (tipsSection)
            tipsSection.style.display = 'none';
    }
    static renderUnits(comp) {
        const el = document.getElementById('viewer-units');
        if (!el)
            return;
        el.innerHTML = comp.units.map(u => {
            const champ = champions_1.championMap.get(u.championId);
            if (!champ)
                return '';
            const icon = assetUrls_1.getChampionIconUrl(u.championId);
            const stars = '★'.repeat(u.starLevel);
            const initials = champ.name.split(' ').map(w => w[0]).join('').substring(0, 2);
            const carryClass = u.isCarry ? 'is-carry' : '';
            return `
        <div class="viewer-unit cost-${champ.cost} ${carryClass}" title="${champ.name} ${stars} (${champ.cost}g)${u.isCarry ? ' — carry' : ''}">
          <div class="viewer-unit-stars">${stars}</div>
          <div class="viewer-unit-portrait">
            ${icon
                ? `<img src="${icon}" alt="${champ.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
                : ''}
            <div class="unit-initials" ${icon ? 'style="display:none"' : ''}>${initials}</div>
            ${u.isCarry ? '<span class="viewer-unit-carry-crown">👑</span>' : ''}
          </div>
          <div class="viewer-unit-name">${champ.name}</div>
        </div>
      `;
        }).join('');
    }
    static renderItems(comp) {
        const el = document.getElementById('viewer-items');
        if (!el)
            return;
        const carries = comp.units.filter(u => u.isCarry && u.items && u.items.length);
        if (carries.length === 0) {
            el.innerHTML = '<div class="viewer-empty-line">No specific carry items defined for this comp.</div>';
            return;
        }
        el.innerHTML = carries.map(u => {
            const champ = champions_1.championMap.get(u.championId);
            const champName = champ ? champ.name : u.championId;
            const champIcon = champ ? assetUrls_1.getChampionIconUrl(u.championId) : '';
            const itemsHtml = (u.items || []).map(itemId => {
                const item = items_1.itemMap.get(itemId);
                const name = item ? item.name : itemId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                const stats = item ? item.stats : '';
                const icon = assetUrls_1.getItemIconUrl(itemId);
                return `
          <span class="viewer-item-pill" title="${name}\n${stats}">
            ${icon ? `<img src="${icon}" alt="${name}" loading="lazy">` : ''}
            <span>${name}</span>
          </span>
        `;
            }).join('');
            return `
        <div class="viewer-carry-row">
          <div class="viewer-carry-name">
            ${champIcon ? `<img src="${champIcon}" class="viewer-carry-icon" alt="">` : ''}
            <span>${champName}</span>
          </div>
          <div class="viewer-carry-items">${itemsHtml}</div>
        </div>
      `;
        }).join('');
    }
    static renderTraits(comp) {
        const el = document.getElementById('viewer-traits');
        if (!el)
            return;
        el.innerHTML = comp.coreTraits.map(t => `<span class="trait-badge">${t}</span>`).join('');
    }
    static renderBoard(comp) {
        const board = document.getElementById('viewer-board');
        const notes = document.getElementById('viewer-board-notes');
        if (!board)
            return;
        const guide = positioning_1.getPositioningGuide(comp.id);
        const placements = new Map();
        if (guide) {
            for (const p of guide.placements) {
                placements.set(`${p.row}-${p.col}`, { compId: comp.id, placements: [p], notes: '' });
            }
        }
        let html = '';
        for (let row = 0; row < 4; row++) {
            const isOddRow = row % 2 === 1;
            html += `<div class="hex-row ${isOddRow ? 'hex-row-offset' : ''}">`;
            for (let col = 0; col < 7; col++) {
                const wrapper = placements.get(`${row}-${col}`);
                const placement = wrapper && wrapper.placements[0];
                if (placement) {
                    const champ = champions_1.championMap.get(placement.championId);
                    const champName = champ ? champ.name : '?';
                    const initials = champName.split(' ').map(w => w[0]).join('').substring(0, 2);
                    const costClass = champ ? `cost-${champ.cost}` : '';
                    const icon = assetUrls_1.getChampionIconUrl(placement.championId);
                    html += `<div class="hex-cell hex-occupied hex-${placement.role} ${costClass}" data-row="${row}" data-col="${col}" title="${champName} (${placement.role})">
            <div class="hex-inner">
              ${icon ? `<img src="${icon}" class="hex-champ-img" alt="${champName}" loading="lazy">` : `<span class="hex-unit-name">${initials}</span>`}
            </div>
            <span class="hex-champ-label">${champName.length > 6 ? initials : champName}</span>
          </div>`;
                }
                else {
                    html += `<div class="hex-cell" data-row="${row}" data-col="${col}"><div class="hex-inner"></div></div>`;
                }
            }
            html += '</div>';
        }
        board.innerHTML = html;
        if (notes) {
            notes.innerHTML = guide
                ? `<p class="board-notes-text">${guide.notes}</p>`
                : '<p class="board-notes-text">No positioning guide for this comp yet.</p>';
        }
    }
    static renderTips(comp) {
        const section = document.getElementById('viewer-tips-section');
        const el = document.getElementById('viewer-tips');
        if (!el || !section)
            return;
        const parts = [];
        if (comp.description)
            parts.push(`<p>${comp.description}</p>`);
        if (comp.earlyGame)
            parts.push(`<p><strong>Early:</strong> ${comp.earlyGame}</p>`);
        if (comp.midGame)
            parts.push(`<p><strong>Mid:</strong> ${comp.midGame}</p>`);
        if (comp.lateGame)
            parts.push(`<p><strong>Late:</strong> ${comp.lateGame}</p>`);
        if (comp.tips)
            parts.push(`<p><strong>Tip:</strong> ${comp.tips}</p>`);
        if (parts.length === 0) {
            section.style.display = 'none';
            return;
        }
        section.style.display = 'block';
        el.innerHTML = parts.join('');
    }
}
exports.CompViewerRenderer = CompViewerRenderer;
function pinCompId(compId) {
    try {
        localStorage.setItem(PINNED_KEY, compId);
    }
    catch (e) {
        console.warn('[PivotTFT] failed to write pinned comp', e);
    }
}
exports.pinCompId = pinCompId;
function pinLiveComp(live) {
    try {
        localStorage.setItem(PINNED_KEY, JSON.stringify({ kind: 'live', live }));
        CompViewerRenderer.render();
    }
    catch (e) {
        console.warn('[PivotTFT] failed to write pinned live comp', e);
    }
}
exports.pinLiveComp = pinLiveComp;
function getPinnedCompId() {
    const pin = readPin();
    return (pin === null || pin === void 0 ? void 0 : pin.kind) === 'curated' ? pin.id : null;
}
exports.getPinnedCompId = getPinnedCompId;
function getPinnedLiveCompKey() {
    const pin = readPin();
    return (pin === null || pin === void 0 ? void 0 : pin.kind) === 'live' ? pin.live.compKey : null;
}
exports.getPinnedLiveCompKey = getPinnedLiveCompKey;
function defaultPinIfNone() {
    if (getPinnedCompId())
        return;
    const top = comps_1.getCompsByTier('S')[0] || comps_1.metaComps[0];
    if (top)
        pinCompId(top.id);
}
exports.defaultPinIfNone = defaultPinIfNone;


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
/*!********************************!*\
  !*** ./src/in_game/in_game.ts ***!
  \********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const overwolf_api_ts_1 = __webpack_require__(/*! @overwolf/overwolf-api-ts */ "./node_modules/@overwolf/overwolf-api-ts/dist/index.js");
const AppWindow_1 = __webpack_require__(/*! ../AppWindow */ "./src/AppWindow.ts");
const consts_1 = __webpack_require__(/*! ../consts */ "./src/consts.ts");
const MatchTracker_1 = __webpack_require__(/*! ../services/MatchTracker */ "./src/services/MatchTracker.ts");
const CompViewerRenderer_1 = __webpack_require__(/*! ../services/CompViewerRenderer */ "./src/services/CompViewerRenderer.ts");
class InGame extends AppWindow_1.AppWindow {
    constructor() {
        super(consts_1.kWindowNames.inGame);
        this.setToggleHotkeyBehavior();
    }
    static instance() {
        if (!this._instance) {
            this._instance = new InGame();
        }
        return this._instance;
    }
    async run() {
        const gameClassId = await this.getCurrentGameClassId();
        const gameFeatures = consts_1.kGamesFeatures.get(gameClassId);
        if (gameFeatures && gameFeatures.length) {
            this._gameEventsListener = new overwolf_api_ts_1.OWGamesEvents({
                onInfoUpdates: (info) => MatchTracker_1.MatchTracker.instance().handleInfoUpdate(info),
                onNewEvents: (e) => MatchTracker_1.MatchTracker.instance().handleNewEvents(e),
            }, gameFeatures);
            this._gameEventsListener.start();
        }
        CompViewerRenderer_1.CompViewerRenderer.init();
    }
    async setToggleHotkeyBehavior() {
        const toggleInGameWindow = async (_hotkeyResult) => {
            const inGameState = await this.getWindowState();
            if (inGameState.window_state === "normal" ||
                inGameState.window_state === "maximized") {
                this.currWindow.minimize();
            }
            else if (inGameState.window_state === "minimized" ||
                inGameState.window_state === "closed") {
                this.currWindow.restore();
            }
        };
        overwolf_api_ts_1.OWHotkeys.onHotkeyDown(consts_1.kHotkeys.toggle, toggleInGameWindow);
    }
    async getCurrentGameClassId() {
        const info = await overwolf_api_ts_1.OWGames.getRunningGameInfo();
        return (info && info.isRunning && info.classId) ? info.classId : null;
    }
}
InGame.instance().run();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OUIsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLDJkQUEyZDtRQUNqZSxJQUFJLEVBQUUsNERBQTREO1FBQ2xFLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7S0FDMUc7SUFDRDtRQUNFLEVBQUUsRUFBRSwwQkFBMEI7UUFDOUIsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLHUwQkFBdTBCO1FBQzcwQixJQUFJLEVBQUUsNERBQTREO1FBQ2xFLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxF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QUMsWUFBWSxDQUFDLGlCQUFRLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVPLEtBQUssQ0FBQyxxQkFBcUI7UUFDakMsTUFBTSxJQUFJLEdBQUcsTUFBTSx5QkFBTyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDaEQsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3hFLENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Bpdm90dGZ0Ly4vbm9kZV9tb2R1bGVzL0BvdmVyd29sZi9vdmVyd29sZi1hcGktdHMvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL25vZGVfbW9kdWxlcy9Ab3ZlcndvbGYvb3ZlcndvbGYtYXBpLXRzL2Rpc3Qvb3ctZ2FtZS1saXN0ZW5lci5qcyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL25vZGVfbW9kdWxlcy9Ab3ZlcndvbGYvb3ZlcndvbGYtYXBpLXRzL2Rpc3Qvb3ctZ2FtZXMtZXZlbnRzLmpzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vbm9kZV9tb2R1bGVzL0BvdmVyd29sZi9vdmVyd29sZi1hcGktdHMvZGlzdC9vdy1nYW1lcy5qcyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL25vZGVfbW9kdWxlcy9Ab3ZlcndvbGYvb3ZlcndvbGYtYXBpLXRzL2Rpc3Qvb3ctaG90a2V5cy5qcyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL25vZGVfbW9kdWxlcy9Ab3ZlcndvbGYvb3ZlcndvbGYtYXBpLXRzL2Rpc3Qvb3ctbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9ub2RlX21vZHVsZXMvQG92ZXJ3b2xmL292ZXJ3b2xmLWFwaS10cy9kaXN0L293LXdpbmRvdy5qcyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL25vZGVfbW9kdWxlcy9Ab3ZlcndvbGYvb3ZlcndvbGYtYXBpLXRzL2Rpc3QvdGltZXIuanMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvQXBwV2luZG93LnRzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL2NvbnN0cy50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9kYXRhL2Fzc2V0VXJscy50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9kYXRhL3NldDE3L2NoYW1waW9ucy50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9kYXRhL3NldDE3L2NvbXBzLnRzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL2RhdGEvc2V0MTcvaXRlbXMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvZGF0YS9zZXQxNy9wb3NpdGlvbmluZy50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9kYXRhL3NldDE3L3RyYWl0cy50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9zZXJ2aWNlcy9BdXRoU2VydmljZS50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9zZXJ2aWNlcy9Db21wVmlld2VyUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvc2VydmljZXMvTWF0Y2hUcmFja2VyLnRzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL3NlcnZpY2VzL1NuYXBzaG90VXBsb2FkZXIudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvaW5fZ2FtZS9pbl9nYW1lLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSkpO1xyXG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vb3ctZ2FtZS1saXN0ZW5lclwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9vdy1nYW1lcy1ldmVudHNcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vb3ctZ2FtZXNcIiksIGV4cG9ydHMpO1xyXG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vb3ctaG90a2V5c1wiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9vdy1saXN0ZW5lclwiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9vdy13aW5kb3dcIiksIGV4cG9ydHMpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk9XR2FtZUxpc3RlbmVyID0gdm9pZCAwO1xyXG5jb25zdCBvd19saXN0ZW5lcl8xID0gcmVxdWlyZShcIi4vb3ctbGlzdGVuZXJcIik7XHJcbmNsYXNzIE9XR2FtZUxpc3RlbmVyIGV4dGVuZHMgb3dfbGlzdGVuZXJfMS5PV0xpc3RlbmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGRlbGVnYXRlKSB7XHJcbiAgICAgICAgc3VwZXIoZGVsZWdhdGUpO1xyXG4gICAgICAgIHRoaXMub25HYW1lSW5mb1VwZGF0ZWQgPSAodXBkYXRlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdXBkYXRlIHx8ICF1cGRhdGUuZ2FtZUluZm8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXVwZGF0ZS5ydW5uaW5nQ2hhbmdlZCAmJiAhdXBkYXRlLmdhbWVDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHVwZGF0ZS5nYW1lSW5mby5pc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kZWxlZ2F0ZS5vbkdhbWVTdGFydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVsZWdhdGUub25HYW1lU3RhcnRlZCh1cGRhdGUuZ2FtZUluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RlbGVnYXRlLm9uR2FtZUVuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVsZWdhdGUub25HYW1lRW5kZWQodXBkYXRlLmdhbWVJbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vblJ1bm5pbmdHYW1lSW5mbyA9IChpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaW5mbykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpbmZvLmlzUnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RlbGVnYXRlLm9uR2FtZVN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5vbkdhbWVTdGFydGVkKGluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgb3ZlcndvbGYuZ2FtZXMub25HYW1lSW5mb1VwZGF0ZWQuYWRkTGlzdGVuZXIodGhpcy5vbkdhbWVJbmZvVXBkYXRlZCk7XHJcbiAgICAgICAgb3ZlcndvbGYuZ2FtZXMuZ2V0UnVubmluZ0dhbWVJbmZvKHRoaXMub25SdW5uaW5nR2FtZUluZm8pO1xyXG4gICAgfVxyXG4gICAgc3RvcCgpIHtcclxuICAgICAgICBvdmVyd29sZi5nYW1lcy5vbkdhbWVJbmZvVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uR2FtZUluZm9VcGRhdGVkKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLk9XR2FtZUxpc3RlbmVyID0gT1dHYW1lTGlzdGVuZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuT1dHYW1lc0V2ZW50cyA9IHZvaWQgMDtcclxuY29uc3QgdGltZXJfMSA9IHJlcXVpcmUoXCIuL3RpbWVyXCIpO1xyXG5jbGFzcyBPV0dhbWVzRXZlbnRzIHtcclxuICAgIGNvbnN0cnVjdG9yKGRlbGVnYXRlLCByZXF1aXJlZEZlYXR1cmVzLCBmZWF0dXJlUmV0cmllcyA9IDEwKSB7XHJcbiAgICAgICAgdGhpcy5vbkluZm9VcGRhdGVzID0gKGluZm8pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZGVsZWdhdGUub25JbmZvVXBkYXRlcyhpbmZvLmluZm8pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbk5ld0V2ZW50cyA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlbGVnYXRlLm9uTmV3RXZlbnRzKGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcclxuICAgICAgICB0aGlzLl9yZXF1aXJlZEZlYXR1cmVzID0gcmVxdWlyZWRGZWF0dXJlcztcclxuICAgICAgICB0aGlzLl9mZWF0dXJlUmV0cmllcyA9IGZlYXR1cmVSZXRyaWVzO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgZ2V0SW5mbygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgb3ZlcndvbGYuZ2FtZXMuZXZlbnRzLmdldEluZm8ocmVzb2x2ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBzZXRSZXF1aXJlZEZlYXR1cmVzKCkge1xyXG4gICAgICAgIGxldCB0cmllcyA9IDEsIHJlc3VsdDtcclxuICAgICAgICB3aGlsZSAodHJpZXMgPD0gdGhpcy5fZmVhdHVyZVJldHJpZXMpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvdmVyd29sZi5nYW1lcy5ldmVudHMuc2V0UmVxdWlyZWRGZWF0dXJlcyh0aGlzLl9yZXF1aXJlZEZlYXR1cmVzLCByZXNvbHZlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXRSZXF1aXJlZEZlYXR1cmVzKCk6IHN1Y2Nlc3M6ICcgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDIpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAocmVzdWx0LnN1cHBvcnRlZEZlYXR1cmVzLmxlbmd0aCA+IDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGF3YWl0IHRpbWVyXzEuVGltZXIud2FpdCgzMDAwKTtcclxuICAgICAgICAgICAgdHJpZXMrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdzZXRSZXF1aXJlZEZlYXR1cmVzKCk6IGZhaWx1cmUgYWZ0ZXIgJyArIHRyaWVzICsgJyB0cmllcycgKyBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDIpKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZWdpc3RlckV2ZW50cygpIHtcclxuICAgICAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudHMoKTtcclxuICAgICAgICBvdmVyd29sZi5nYW1lcy5ldmVudHMub25JbmZvVXBkYXRlczIuYWRkTGlzdGVuZXIodGhpcy5vbkluZm9VcGRhdGVzKTtcclxuICAgICAgICBvdmVyd29sZi5nYW1lcy5ldmVudHMub25OZXdFdmVudHMuYWRkTGlzdGVuZXIodGhpcy5vbk5ld0V2ZW50cyk7XHJcbiAgICB9XHJcbiAgICB1blJlZ2lzdGVyRXZlbnRzKCkge1xyXG4gICAgICAgIG92ZXJ3b2xmLmdhbWVzLmV2ZW50cy5vbkluZm9VcGRhdGVzMi5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uSW5mb1VwZGF0ZXMpO1xyXG4gICAgICAgIG92ZXJ3b2xmLmdhbWVzLmV2ZW50cy5vbk5ld0V2ZW50cy5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uTmV3RXZlbnRzKTtcclxuICAgIH1cclxuICAgIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBbb3ctZ2FtZS1ldmVudHNdIFNUQVJUYCk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuc2V0UmVxdWlyZWRGZWF0dXJlcygpO1xyXG4gICAgICAgIGNvbnN0IHsgcmVzLCBzdGF0dXMgfSA9IGF3YWl0IHRoaXMuZ2V0SW5mbygpO1xyXG4gICAgICAgIGlmIChyZXMgJiYgc3RhdHVzID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkluZm9VcGRhdGVzKHsgaW5mbzogcmVzIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFtvdy1nYW1lLWV2ZW50c10gU1RPUGApO1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50cygpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuT1dHYW1lc0V2ZW50cyA9IE9XR2FtZXNFdmVudHM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuT1dHYW1lcyA9IHZvaWQgMDtcclxuY2xhc3MgT1dHYW1lcyB7XHJcbiAgICBzdGF0aWMgZ2V0UnVubmluZ0dhbWVJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBvdmVyd29sZi5nYW1lcy5nZXRSdW5uaW5nR2FtZUluZm8ocmVzb2x2ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY2xhc3NJZEZyb21HYW1lSWQoZ2FtZUlkKSB7XHJcbiAgICAgICAgbGV0IGNsYXNzSWQgPSBNYXRoLmZsb29yKGdhbWVJZCAvIDEwKTtcclxuICAgICAgICByZXR1cm4gY2xhc3NJZDtcclxuICAgIH1cclxuICAgIHN0YXRpYyBhc3luYyBnZXRSZWNlbnRseVBsYXllZEdhbWVzKGxpbWl0ID0gMykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIW92ZXJ3b2xmLmdhbWVzLmdldFJlY2VudGx5UGxheWVkR2FtZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG92ZXJ3b2xmLmdhbWVzLmdldFJlY2VudGx5UGxheWVkR2FtZXMobGltaXQsIHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5nYW1lcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGFzeW5jIGdldEdhbWVEQkluZm8oZ2FtZUNsYXNzSWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgb3ZlcndvbGYuZ2FtZXMuZ2V0R2FtZURCSW5mbyhnYW1lQ2xhc3NJZCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5PV0dhbWVzID0gT1dHYW1lcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5PV0hvdGtleXMgPSB2b2lkIDA7XHJcbmNsYXNzIE9XSG90a2V5cyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG4gICAgc3RhdGljIGdldEhvdGtleVRleHQoaG90a2V5SWQsIGdhbWVJZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgb3ZlcndvbGYuc2V0dGluZ3MuaG90a2V5cy5nZXQocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaG90a2V5O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lSWQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90a2V5ID0gcmVzdWx0Lmdsb2JhbHMuZmluZChoID0+IGgubmFtZSA9PT0gaG90a2V5SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3VsdC5nYW1lcyAmJiByZXN1bHQuZ2FtZXNbZ2FtZUlkXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG90a2V5ID0gcmVzdWx0LmdhbWVzW2dhbWVJZF0uZmluZChoID0+IGgubmFtZSA9PT0gaG90a2V5SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChob3RrZXkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGhvdGtleS5iaW5kaW5nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoJ1VOQVNTSUdORUQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgb25Ib3RrZXlEb3duKGhvdGtleUlkLCBhY3Rpb24pIHtcclxuICAgICAgICBvdmVyd29sZi5zZXR0aW5ncy5ob3RrZXlzLm9uUHJlc3NlZC5hZGRMaXN0ZW5lcigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0Lm5hbWUgPT09IGhvdGtleUlkKVxyXG4gICAgICAgICAgICAgICAgYWN0aW9uKHJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5PV0hvdGtleXMgPSBPV0hvdGtleXM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuT1dMaXN0ZW5lciA9IHZvaWQgMDtcclxuY2xhc3MgT1dMaXN0ZW5lciB7XHJcbiAgICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSkge1xyXG4gICAgICAgIHRoaXMuX2RlbGVnYXRlID0gZGVsZWdhdGU7XHJcbiAgICB9XHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLk9XTGlzdGVuZXIgPSBPV0xpc3RlbmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk9XV2luZG93ID0gdm9pZCAwO1xyXG5jbGFzcyBPV1dpbmRvdyB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX2lkID0gbnVsbDtcclxuICAgIH1cclxuICAgIGFzeW5jIHJlc3RvcmUoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoYXQuX2lkO1xyXG4gICAgICAgICAgICBvdmVyd29sZi53aW5kb3dzLnJlc3RvcmUoaWQsIHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5zdWNjZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFtyZXN0b3JlXSAtIGFuIGVycm9yIG9jY3VycmVkLCB3aW5kb3dJZD0ke2lkfSwgcmVhc29uPSR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFzeW5jIG1pbmltaXplKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGF0Ll9pZDtcclxuICAgICAgICAgICAgb3ZlcndvbGYud2luZG93cy5taW5pbWl6ZShpZCwgKCkgPT4geyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFzeW5jIG1heGltaXplKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGF0Ll9pZDtcclxuICAgICAgICAgICAgb3ZlcndvbGYud2luZG93cy5tYXhpbWl6ZShpZCwgKCkgPT4geyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFzeW5jIGhpZGUoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoYXQuX2lkO1xyXG4gICAgICAgICAgICBvdmVyd29sZi53aW5kb3dzLmhpZGUoaWQsICgpID0+IHsgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBjbG9zZSgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcclxuICAgICAgICAgICAgbGV0IGlkID0gdGhhdC5faWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuZ2V0V2luZG93U3RhdGUoKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzICYmXHJcbiAgICAgICAgICAgICAgICAocmVzdWx0LndpbmRvd19zdGF0ZSAhPT0gJ2Nsb3NlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmludGVybmFsQ2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZHJhZ01vdmUoZWxlbSkge1xyXG4gICAgICAgIGVsZW0uY2xhc3NOYW1lID0gZWxlbS5jbGFzc05hbWUgKyAnIGRyYWdnYWJsZSc7XHJcbiAgICAgICAgZWxlbS5vbm1vdXNlZG93biA9IGUgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIG92ZXJ3b2xmLndpbmRvd3MuZHJhZ01vdmUodGhpcy5fbmFtZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGFzeW5jIGdldFdpbmRvd1N0YXRlKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGF0Ll9pZDtcclxuICAgICAgICAgICAgb3ZlcndvbGYud2luZG93cy5nZXRXaW5kb3dTdGF0ZShpZCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgYXN5bmMgZ2V0Q3VycmVudEluZm8oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIG92ZXJ3b2xmLndpbmRvd3MuZ2V0Q3VycmVudFdpbmRvdyhyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQud2luZG93KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvYnRhaW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2IgPSByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuc3RhdHVzID09PSBcInN1Y2Nlc3NcIiAmJiByZXMud2luZG93ICYmIHJlcy53aW5kb3cuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pZCA9IHJlcy53aW5kb3cuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25hbWUgPSByZXMud2luZG93Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLndpbmRvdyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgb3ZlcndvbGYud2luZG93cy5nZXRDdXJyZW50V2luZG93KGNiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG92ZXJ3b2xmLndpbmRvd3Mub2J0YWluRGVjbGFyZWRXaW5kb3codGhpcy5fbmFtZSwgY2IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBhc3N1cmVPYnRhaW5lZCgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoYXQub2J0YWluKCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBpbnRlcm5hbENsb3NlKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoYXQuX2lkO1xyXG4gICAgICAgICAgICBvdmVyd29sZi53aW5kb3dzLmNsb3NlKGlkLCByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuc3VjY2VzcylcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuT1dXaW5kb3cgPSBPV1dpbmRvdztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5UaW1lciA9IHZvaWQgMDtcclxuY2xhc3MgVGltZXIge1xyXG4gICAgY29uc3RydWN0b3IoZGVsZWdhdGUsIGlkKSB7XHJcbiAgICAgICAgdGhpcy5fdGltZXJJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVUaW1lckV2ZW50ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lcklkID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fZGVsZWdhdGUub25UaW1lcih0aGlzLl9pZCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xyXG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgYXN5bmMgd2FpdChpbnRlcnZhbEluTVMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgaW50ZXJ2YWxJbk1TKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0YXJ0KGludGVydmFsSW5NUykge1xyXG4gICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMuX3RpbWVySWQgPSBzZXRUaW1lb3V0KHRoaXMuaGFuZGxlVGltZXJFdmVudCwgaW50ZXJ2YWxJbk1TKTtcclxuICAgIH1cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RpbWVySWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcklkKTtcclxuICAgICAgICB0aGlzLl90aW1lcklkID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlRpbWVyID0gVGltZXI7XHJcbiIsImltcG9ydCB7IE9XV2luZG93IH0gZnJvbSBcIkBvdmVyd29sZi9vdmVyd29sZi1hcGktdHNcIjtcclxuXHJcbi8vIERldGVjdCBPdmVyd29sZiBydW50aW1lIOKAlCB1c2VkIGJ5IGFsbCB3aW5kb3dzIHRvIGFkYXB0IGJlaGF2aW91ci5cclxuZXhwb3J0IGNvbnN0IGlzT3ZlcndvbGYgPVxyXG4gIHR5cGVvZiBvdmVyd29sZiAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG92ZXJ3b2xmLndpbmRvd3MgIT09ICd1bmRlZmluZWQnO1xyXG5cclxuLy8gQSBiYXNlIGNsYXNzIGZvciB0aGUgYXBwJ3MgZm9yZWdyb3VuZCB3aW5kb3dzLlxyXG4vLyBTZXRzIHRoZSBtb2RhbCBhbmQgZHJhZyBiZWhhdmlvcnMsIHdoaWNoIGFyZSBzaGFyZWQgYWNjcm9zcyB0aGUgZGVza3RvcCBhbmQgaW4tZ2FtZSB3aW5kb3dzLlxyXG5leHBvcnQgY2xhc3MgQXBwV2luZG93IHtcclxuICBwcm90ZWN0ZWQgY3VycldpbmRvdzogT1dXaW5kb3c7XHJcbiAgcHJvdGVjdGVkIG1haW5XaW5kb3c6IE9XV2luZG93O1xyXG4gIHByb3RlY3RlZCBtYXhpbWl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3Iod2luZG93TmFtZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5tYWluV2luZG93ID0gbmV3IE9XV2luZG93KCdiYWNrZ3JvdW5kJyk7XHJcbiAgICAgIHRoaXMuY3VycldpbmRvdyA9IG5ldyBPV1dpbmRvdyh3aW5kb3dOYW1lKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBCcm93c2VyIG1vZGUg4oCUIE9XV2luZG93IHJlcXVpcmVzIHRoZSBPdmVyd29sZiBydW50aW1lXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VCdXR0b24nKTtcclxuICAgIGNvbnN0IG1heGltaXplQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21heGltaXplQnV0dG9uJyk7XHJcbiAgICBjb25zdCBtaW5pbWl6ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5pbWl6ZUJ1dHRvbicpO1xyXG5cclxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKTtcclxuXHJcbiAgICBpZiAoaXNPdmVyd29sZikge1xyXG4gICAgICB0aGlzLnNldERyYWcoaGVhZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZUJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm1haW5XaW5kb3cpIHRoaXMubWFpbldpbmRvdy5jbG9zZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWluaW1pemVCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5jdXJyV2luZG93KSB0aGlzLmN1cnJXaW5kb3cubWluaW1pemUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1heGltaXplQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmN1cnJXaW5kb3cpIHJldHVybjtcclxuICAgICAgaWYgKCF0aGlzLm1heGltaXplZCkge1xyXG4gICAgICAgIHRoaXMuY3VycldpbmRvdy5tYXhpbWl6ZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY3VycldpbmRvdy5yZXN0b3JlKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5tYXhpbWl6ZWQgPSAhdGhpcy5tYXhpbWl6ZWQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBnZXRXaW5kb3dTdGF0ZSgpIHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmN1cnJXaW5kb3c/LmdldFdpbmRvd1N0YXRlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHNldERyYWcoZWxlbSkge1xyXG4gICAgdGhpcy5jdXJyV2luZG93Py5kcmFnTW92ZShlbGVtKTtcclxuICB9XHJcbn1cclxuIiwiLy8gUGl2b3RURlQg4oCUIFRGVCBHYW1lIEV2ZW50cyBGZWF0dXJlc1xyXG4vLyBHYW1lIElEIDU0MjYgPSBMZWFndWUgb2YgTGVnZW5kcyBjbGllbnQgKHdoaWNoIFRGVCBydW5zIGluc2lkZSlcclxuLy8gVEZULXNwZWNpZmljIGV2ZW50cyB1c2UgaW50ZXJuYWwgR2FtZSBJRCAyMTU3MCwgYnV0IHdlIHJlZ2lzdGVyIHdpdGggNTQyNlxyXG5leHBvcnQgY29uc3Qga0dhbWVzRmVhdHVyZXMgPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nW10+KFtcclxuICBbXHJcbiAgICA1NDI2LFxyXG4gICAgW1xyXG4gICAgICAnbWF0Y2hfaW5mbycsXHJcbiAgICAgICdib2FyZCcsXHJcbiAgICAgICdiZW5jaCcsXHJcbiAgICAgICdzdG9yZScsXHJcbiAgICAgICdjYXJvdXNlbCcsXHJcbiAgICAgICdnYW1lX2luZm8nLFxyXG4gICAgICAnYXVnbWVudHMnLFxyXG4gICAgICAnbGl2ZV9jbGllbnRfZGF0YSdcclxuICAgIF1cclxuICBdLFxyXG5dKTtcclxuXHJcbmV4cG9ydCBjb25zdCBrR2FtZUNsYXNzSWRzID0gQXJyYXkuZnJvbShrR2FtZXNGZWF0dXJlcy5rZXlzKCkpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGtXaW5kb3dOYW1lcyA9IHtcclxuICBpbkdhbWU6ICdpbl9nYW1lJyxcclxuICBkZXNrdG9wOiAnZGVza3RvcCcsXHJcbiAgc2V0dGluZ3M6ICdzZXR0aW5ncycsXHJcbiAgaW5nYW1lQ29udHJvbGxlcjogJ2luZ2FtZV9jb250cm9sbGVyJyxcclxuICBtYXRjaHVwczogJ21hdGNodXBzJyxcclxuICBsb2dpbjogJ2xvZ2luJyxcclxuICBhZG1pbjogJ2FkbWluJyxcclxuICBoZWFkbGluZXI6ICdoZWFkbGluZXInLFxyXG4gIHJlcGxheTogJ3JlcGxheScsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qga0hvdGtleXMgPSB7XHJcbiAgdG9nZ2xlOiAncGl2b3R0ZnRfc2hvd2hpZGUnXHJcbn07XHJcblxyXG4vLyBURlQgR2FtZSBJRCBmb3IgZXZlbnQgcmVnaXN0cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrVEZUQ2xhc3NJZCA9IDU0MjY7XHJcblxyXG4vLyBSaW90IEFQSSBDb25maWd1cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrUmlvdEFwaUNvbmZpZyA9IHtcclxuICBhcGlLZXk6ICcnLFxyXG4gIHJlZ2lvbjogJ2V1cm9wZScgYXMgY29uc3QsICAgICAgIC8vIGFtZXJpY2FzIHwgZXVyb3BlIHwgYXNpYSAoYWNjb3VudC12MSwgbWF0Y2gtdjEpXHJcbiAgcGxhdGZvcm06ICdldW4xJywgICAgICAgICAgICAgICAgLy8gZXV3MSwgZXVuMSwgbmExLCBrciwgLi4uIChzdW1tb25lci9sZWFndWUpXHJcbn07XHJcblxyXG4vLyBCYWNrZW5kIGJhc2UgVVJMLiBJbiBwcm9kdWN0aW9uIHJvdXRlcyB0aHJvdWdoIENsb3VkZmxhcmUgV29ya2VyIGF0XHJcbi8vIGFwaS5waXZvdHRmdC5jb20gKFJpb3QgQVBJIHByb3h5ICsgYXV0aCArIGNvbXBzIGJhY2tlbmQpLiBPdmVycmlkZSB0b1xyXG4vLyBodHRwOi8vMTI3LjAuMC4xOjg3ODcgZHVyaW5nIGxvY2FsIGB3cmFuZ2xlciBkZXZgIGRldmVsb3BtZW50LlxyXG5leHBvcnQgY29uc3Qga1Jpb3RBcGlCYXNlVXJsID0gJ2h0dHBzOi8vYXBpLnBpdm90dGZ0LmNvbSc7XHJcblxyXG4vLyBDdXJyZW50IFRGVCBpbi1zZXQgcGF0Y2ggKyBzZXQgbnVtYmVyLiBCdW1wIHRoZXNlIHRvZ2V0aGVyIHdpdGggdGhlXHJcbi8vIGBQQVRDSEVTYCBhcnJheXMgaW4gTGl2ZU1ldGFSZW5kZXJlci50cyArIFRyZW5kc1JlbmRlcmVyLnRzIGV2ZXJ5IHRpbWVcclxuLy8gYSBuZXcgVEZUIHBhdGNoIHNoaXBzLiBVc2VkIGJ5IFNuYXBzaG90VXBsb2FkZXIgc28gdXBsb2FkZWQgc25hcHNob3RzXHJcbi8vIGxhbmQgaW4gdGhlIHJpZ2h0IHNsaWNlIHdpdGhvdXQgZGVwZW5kaW5nIG9uIFJpb3QncyBgZ2FtZV92ZXJzaW9uYFxyXG4vLyBzdHJpbmcgcGFyc2luZy5cclxuZXhwb3J0IGNvbnN0IGtDdXJyZW50VGZ0UGF0Y2ggPSAnMTcuMyc7XHJcbmV4cG9ydCBjb25zdCBrQ3VycmVudFRmdFNldE51bWJlciA9IDE3O1xyXG5cclxuXHJcbi8vIFBsYXRmb3JtIOKGkiByZWdpb25hbCByb3V0aW5nIG1hcCAoZm9yIGFjY291bnQvbWF0Y2ggZW5kcG9pbnRzKVxyXG5leHBvcnQgY29uc3Qga1BsYXRmb3JtVG9SZWdpb246IFJlY29yZDxzdHJpbmcsICdhbWVyaWNhcycgfCAnZXVyb3BlJyB8ICdhc2lhJz4gPSB7XHJcbiAgJ2V1dzEnOiAnZXVyb3BlJywgJ2V1bjEnOiAnZXVyb3BlJywgJ3RyMSc6ICdldXJvcGUnLCAncnUnOiAnZXVyb3BlJyxcclxuICAnbmExJzogJ2FtZXJpY2FzJywgJ2JyMSc6ICdhbWVyaWNhcycsICdsYTEnOiAnYW1lcmljYXMnLCAnbGEyJzogJ2FtZXJpY2FzJyxcclxuICAna3InOiAnYXNpYScsICdqcDEnOiAnYXNpYScsICdvYzEnOiAnYXNpYScsICdwaDInOiAnYXNpYScsXHJcbiAgJ3NnMic6ICdhc2lhJywgJ3RoMic6ICdhc2lhJywgJ3R3Mic6ICdhc2lhJywgJ3ZuMic6ICdhc2lhJyxcclxufTtcclxuIiwiLy8gUGl2b3RURlQg4oCUIENvbW11bml0eSBEcmFnb24gQ0ROIEFzc2V0IFVSTCBNYXBwaW5nc1xyXG4vLyBDaGFtcGlvbiBzcGxhc2ggdGlsZXMgKyBURlQgaXRlbS9jb21wb25lbnQgaWNvbnMuXHJcbi8vXHJcbi8vIFR3byBDb21tdW5pdHlEcmFnb24gcm9vdHMgYXJlIHVzZWQ6XHJcbi8vICAgLSByY3AtYmUtbG9sLWdhbWUtZGF0YSAoZGVmYXVsdCBnYW1lLWRhdGEgcGx1Z2luKSBmb3IgaXRlbSBpY29uc1xyXG4vLyAgIC0gL2dhbWUvPGFzc2V0IHBhdGg+ICAgICAgICAgICBmb3IgVEZUIGNoYW1waW9uIHNwbGFzaCB0aWxlc1xyXG4vLyBFdmVyeSBwYXRoIGlzIG1pcnJvcmVkIGxvd2VyY2FzZWQgb24gQ29tbXVuaXR5RHJhZ29uLCBzbyB3ZSBsb3dlcmNhc2UgYmVmb3JlXHJcbi8vIGNvbnN0cnVjdGluZyBVUkxzLlxyXG5cclxuaW1wb3J0IHsgY2hhbXBpb25NYXAgfSBmcm9tICcuL3NldDE3L2NoYW1waW9ucyc7XHJcblxyXG5jb25zdCBHQU1FX0RBVEFfQkFTRSA9ICdodHRwczovL3Jhdy5jb21tdW5pdHlkcmFnb24ub3JnL2xhdGVzdC9wbHVnaW5zL3JjcC1iZS1sb2wtZ2FtZS1kYXRhL2dsb2JhbC9kZWZhdWx0JztcclxuY29uc3QgR0FNRV9CQVNFID0gJ2h0dHBzOi8vcmF3LmNvbW11bml0eWRyYWdvbi5vcmcvbGF0ZXN0L2dhbWUnO1xyXG5cclxuLy8gPT09PT0gQ2hhbXBpb24gU3BsYXNoIFRpbGVzID09PT09XHJcbi8vIFVzZXMgdGhlIHBlci1jaGFtcGlvbiBgdGlsZUljb25gIHBhdGggc3RvcmVkIGluIGNoYW1waW9ucy50cy5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW1waW9uSWNvblVybChjaGFtcGlvbklkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGNoYW1wID0gY2hhbXBpb25NYXAuZ2V0KGNoYW1waW9uSWQpO1xyXG4gIGlmICghY2hhbXAgfHwgIWNoYW1wLnRpbGVJY29uKSByZXR1cm4gJyc7XHJcbiAgcmV0dXJuIGAke0dBTUVfQkFTRX0vJHtjaGFtcC50aWxlSWNvbi50b0xvd2VyQ2FzZSgpfWA7XHJcbn1cclxuXHJcblxyXG4vLyA9PT09PSBURlQgSXRlbSBJY29ucyA9PT09PVxyXG4vLyBNYXBzIG91ciBpdGVtIHNsdWcgSURzIOKGkiBDRE4gZmlsZW5hbWVzIGZyb20gdGZ0aXRlbXMuanNvblxyXG5jb25zdCBpdGVtQ2RuUGF0aHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgLy8gQ29tcGxldGVkIGl0ZW1zXHJcbiAgJ2luZmluaXR5LWVkZ2UnOiAgICAgICAnVEZUX0l0ZW1fSW5maW5pdHlFZGdlLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdibG9vZHRoaXJzdGVyJzogICAgICAgJ1RGVF9JdGVtX0Jsb29kdGhpcnN0ZXIuVEZUX1NldDEzLnBuZycsXHJcbiAgJ2dpYW50LXNsYXllcic6ICAgICAgICAnVEZUX0l0ZW1fTWFkcmVkc0Jsb29kcmF6b3IuVEZUX1NldDEzLnBuZycsXHJcbiAgJ2hleHRlY2gtZ3VuYmxhZGUnOiAgICAnVEZUX0l0ZW1fSGV4dGVjaEd1bmJsYWRlLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdlZGdlLW9mLW5pZ2h0JzogICAgICAgJ1RGVF9JdGVtX0d1YXJkaWFuQW5nZWwuVEZUX1NldDEzLnBuZycsXHJcbiAgJ2RlYXRoYmxhZGUnOiAgICAgICAgICAnVEZUX0l0ZW1fRGVhdGhibGFkZS5URlRfU2V0MTMucG5nJyxcclxuICAnemVrZXMtaGVyYWxkJzogICAgICAgICdURlRfSXRlbV9aZWtlc0hlcmFsZC5URlRfU2V0MTMucG5nJyxcclxuICAnYmx1ZS1idWZmJzogICAgICAgICAgICdURlRfSXRlbV9CbHVlQnVmZi5URlRfU2V0MTMucG5nJyxcclxuICAnZ3VpbnNvb3MtcmFnZWJsYWRlJzogICdURlRfSXRlbV9HdWluc29vc1JhZ2VibGFkZS5URlRfU2V0MTMucG5nJyxcclxuICAnc3RhdGlray1zaGl2JzogICAgICAgICdURlRfSXRlbV9TdGF0aWtrU2hpdi5URlRfU2V0MTMucG5nJyxcclxuICAndGl0YW5zLXJlc29sdmUnOiAgICAgICdURlRfSXRlbV9UaXRhbnNSZXNvbHZlLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdydW5hYW5zLWh1cnJpY2FuZSc6ICAgJ1RGVF9JdGVtX1J1bmFhbnNIdXJyaWNhbmUuVEZUX1NldDEzLnBuZycsXHJcbiAgJ3JhcGlkLWZpcmVjYW5ub24nOiAgICAnVEZUX0l0ZW1fUmFwaWRGaXJlQ2Fubm9uLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdsYXN0LXdoaXNwZXInOiAgICAgICAgJ1RGVF9JdGVtX0xhc3RXaGlzcGVyLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdoYW5kLW9mLWp1c3RpY2UnOiAgICAgJ1RGVF9JdGVtX1Vuc3RhYmxlQ29uY29jdGlvbi5URlRfU2V0MTMucG5nJyxcclxuICAnamV3ZWxlZC1nYXVudGxldCc6ICAgICdURlRfSXRlbV9KZXdlbGVkR2F1bnRsZXQuVEZUX1NldDEzLnBuZycsXHJcbiAgJ3JhYmFkb25zLWRlYXRoY2FwJzogICAnVEZUX0l0ZW1fUmFiYWRvbnNEZWF0aGNhcC5URlRfU2V0MTMucG5nJyxcclxuICAnbW9yZWxsb25vbWljb24nOiAgICAgICdURlRfSXRlbV9Nb3JlbGxvbm9taWNvbi5URlRfU2V0MTMucG5nJyxcclxuICAnaW9uaWMtc3BhcmsnOiAgICAgICAgICdURlRfSXRlbV9Jb25pY1NwYXJrLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdhcmNoYW5nZWxzLXN0YWZmJzogICAgJ1RGVF9JdGVtX0FyY2hhbmdlbHNTdGFmZi5URlRfU2V0MTMucG5nJyxcclxuICAnbmFzaG9ycy10b290aCc6ICAgICAgICdURlRfSXRlbV9MZXZpYXRoYW4uVEZUX1NldDEzLnBuZycsXHJcbiAgJ2JyYW1ibGUtdmVzdCc6ICAgICAgICAnVEZUX0l0ZW1fQnJhbWJsZVZlc3QuVEZUX1NldDEzLnBuZycsXHJcbiAgJ2dhcmdveWxlLXN0b25lcGxhdGUnOiAnVEZUX0l0ZW1fR2FyZ295bGVTdG9uZXBsYXRlLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdzdW5maXJlLWNhcGUnOiAgICAgICAgJ1RGVF9JdGVtX1JlZEJ1ZmYuVEZUX1NldDEzLnBuZycsXHJcbiAgJ2d1YXJkYnJlYWtlcic6ICAgICAgICAnVEZUX0l0ZW1fUG93ZXJHYXVudGxldC5URlRfU2V0MTMucG5nJyxcclxuICAnZHJhZ29ucy1jbGF3JzogICAgICAgICdURlRfSXRlbV9EcmFnb25zQ2xhdy5URlRfU2V0MTMucG5nJyxcclxuICAncXVpY2tzaWx2ZXInOiAgICAgICAgICdURlRfSXRlbV9RdWlja3NpbHZlci5URlRfU2V0MTMucG5nJyxcclxuICAncmVkZW1wdGlvbic6ICAgICAgICAgICdURlRfSXRlbV9TcGlyaXRWaXNhZ2VSUi5URlRfVEZUMTRfNS5wbmcnLFxyXG4gICdjcm93bmd1YXJkJzogICAgICAgICAgJ1RGVF9JdGVtX0Nyb3duZ3VhcmQuVEZUX1NldDEzLnBuZycsXHJcbiAgJ3dhcm1vZ3MtYXJtb3InOiAgICAgICAnVEZUX0l0ZW1fV2FybW9nc0FybW9yLlRGVF9TZXQxMy5wbmcnLFxyXG4gICd0aGllZnMtZ2xvdmVzJzogICAgICAgJ1RGVF9JdGVtX1RoaWVmc0dsb3Zlcy5URlRfU2V0MTMucG5nJyxcclxuICAnc3BlYXItb2Ytc2hvamluJzogICAgICdURlRfSXRlbV9TcGVhck9mU2hvamluLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdhZGFwdGl2ZS1oZWxtJzogICAgICAgJ1RGVF9JdGVtX0FkYXB0aXZlSGVsbS5URlRfU2V0MTMucG5nJyxcclxuICAnc3RlYWRmYXN0LWhlYXJ0JzogICAgICdURlRfSXRlbV9OaWdodEhhcnZlc3Rlci5URlRfU2V0MTMucG5nJyxcclxuICAnZnJvemVuLWhlYXJ0JzogICAgICAgICdURlRfSXRlbV9Gcm96ZW5IZWFydC5URlRfU2V0MTMucG5nJyxcclxufTtcclxuXHJcbi8vIENvbW11bml0eURyYWdvbiBzdG9yZXMgVEZUIGl0ZW0gaWNvbnMgdW5kZXJcclxuLy8gICAvYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvXHJcbi8vIGFuZCBtaXJyb3JzIGFsbCBwYXRocyBsb3dlcmNhc2VkLiBUaGUgUmlvdCBmaWxlIG5hbWVzIGZyb20gdGZ0aXRlbXMuanNvbiB1c2VcclxuLy8gbWl4ZWQtY2FzZSArIGEgVEZUX1NldCBzdWZmaXg7IHdlIGxvd2VyY2FzZSBiZWZvcmUgYnVpbGRpbmcgdGhlIFVSTCBzbyB0aGVcclxuLy8gQ0ROIHJldHVybnMgdGhlIGljb24gaW5zdGVhZCBvZiA0MDQnaW5nIGJhY2sgdG8gYSB0ZXh0IGZhbGxiYWNrLlxyXG5pbXBvcnQgeyBpdGVtTWFwIH0gZnJvbSAnLi9zZXQxNy9pdGVtcyc7XHJcblxyXG5jb25zdCBJVEVNX0lDT05fUEFUSCA9ICdhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlbUljb25VcmwoaXRlbUlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGl0ZW0gPSBpdGVtTWFwLmdldChpdGVtSWQpO1xyXG4gIGlmIChpdGVtICYmIGl0ZW0uaWNvbikge1xyXG4gICAgcmV0dXJuIGAke0dBTUVfQkFTRX0vJHtpdGVtLmljb24udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcudGV4JywgJy5wbmcnKX1gO1xyXG4gIH1cclxuICBjb25zdCBmaWxlbmFtZSA9IGl0ZW1DZG5QYXRoc1tpdGVtSWRdO1xyXG4gIGlmICghZmlsZW5hbWUpIHJldHVybiAnJztcclxuICByZXR1cm4gYCR7R0FNRV9EQVRBX0JBU0V9LyR7SVRFTV9JQ09OX1BBVEh9LyR7ZmlsZW5hbWUudG9Mb3dlckNhc2UoKX1gO1xyXG59XHJcblxyXG5cclxuLy8gPT09PT0gQmFzZSBDb21wb25lbnQgSWNvbnMgPT09PT1cclxuY29uc3QgY29tcG9uZW50Q2RuUGF0aHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgJ2JmLXN3b3JkJzogICAgICAgICAgICAgICdURlRfSXRlbV9CRlN3b3JkLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdyZWN1cnZlLWJvdyc6ICAgICAgICAgICAnVEZUX0l0ZW1fUmVjdXJ2ZUJvdy5URlRfU2V0MTMucG5nJyxcclxuICAnbmVlZGxlc3NseS1sYXJnZS1yb2QnOiAgJ1RGVF9JdGVtX05lZWRsZXNzbHlMYXJnZVJvZC5URlRfU2V0MTMucG5nJyxcclxuICAndGVhci1vZi1nb2RkZXNzJzogICAgICAgJ1RGVF9JdGVtX1RlYXJPZlRoZUdvZGRlc3MuVEZUX1NldDEzLnBuZycsXHJcbiAgJ2NoYWluLXZlc3QnOiAgICAgICAgICAgICdURlRfSXRlbV9DaGFpblZlc3QuVEZUX1NldDEzLnBuZycsXHJcbiAgJ25lZ2F0cm9uLWNsb2FrJzogICAgICAgICdURlRfSXRlbV9OZWdhdHJvbkNsb2FrLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdnaWFudHMtYmVsdCc6ICAgICAgICAgICAnVEZUX0l0ZW1fR2lhbnRzQmVsdC5URlRfU2V0MTMucG5nJyxcclxuICAnc3BhcnJpbmctZ2xvdmVzJzogICAgICAgJ1RGVF9JdGVtX1NwYXJyaW5nR2xvdmVzLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdzcGF0dWxhJzogICAgICAgICAgICAgICAnVEZUX0l0ZW1fU3BhdHVsYS5URlRfU2V0MTMucG5nJyxcclxuICAnZnJ5aW5nLXBhbic6ICAgICAgICAgICAgJ1RGVF9JdGVtX0ZyeWluZ1Bhbi5URlRfU2V0MTMucG5nJyxcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnRJY29uVXJsKGNvbXBvbmVudElkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGZpbGVuYW1lID0gY29tcG9uZW50Q2RuUGF0aHNbY29tcG9uZW50SWRdO1xyXG4gIGlmICghZmlsZW5hbWUpIHJldHVybiAnJztcclxuICByZXR1cm4gYCR7R0FNRV9EQVRBX0JBU0V9LyR7SVRFTV9JQ09OX1BBVEh9LyR7ZmlsZW5hbWUudG9Mb3dlckNhc2UoKX1gO1xyXG59XHJcblxyXG4vLyA9PT09PSBBdWdtZW50IEljb25zID09PT09XHJcbi8vIENvbW11bml0eURyYWdvbiBzdG9yZXMgYXVnbWVudCBpY29ucyBhcyBBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvLi4uIC50ZXhcclxuLy8gcGF0aHMuIENEcmFnb24gbWlycm9ycyBhbGwgcGF0aHMgbG93ZXJjYXNlZCBhbmQgc2VydmVzIC50ZXggYXMgLnBuZy5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEF1Z21lbnRJY29uVXJsKGljb25QYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmICghaWNvblBhdGgpIHJldHVybiAnJztcclxuICBjb25zdCBwYXRoID0gaWNvblBhdGgudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcudGV4JywgJy5wbmcnKTtcclxuICByZXR1cm4gYCR7R0FNRV9CQVNFfS8ke3BhdGh9YDtcclxufVxyXG5cclxuLy8gPT09PT0gVHJhaXQgSWNvbnMgPT09PT1cclxuLy8gVHJhaXQgaWNvbnMgbGl2ZSBhdCBBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXyouVEZUX1NldCoudGV4LiBTYW1lXHJcbi8vIENEcmFnb24gdHJhbnNmb3JtIGFzIGF1Z21lbnRzIOKAlCBsb3dlcmNhc2UgKyAudGV4IOKGkiAucG5nLlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhaXRJY29uVXJsKGljb25QYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmICghaWNvblBhdGgpIHJldHVybiAnJztcclxuICBjb25zdCBwYXRoID0gaWNvblBhdGgudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcudGV4JywgJy5wbmcnKTtcclxuICByZXR1cm4gYCR7R0FNRV9CQVNFfS8ke3BhdGh9YDtcclxufVxyXG4iLCIvLyBQaXZvdFRGVCAtIFNldCAxNyBjaGFtcGlvbnMuIEF1dG8tZ2VuZXJhdGVkIGZyb20gQ29tbXVuaXR5RHJhZ29uIChjZHJhZ29uLXRmdC5qc29uKS5cclxuLy8gVG8gcmVnZW5lcmF0ZTogcnVuIHRoZSBsb2NhbCBnZW5lcmF0ZV9jaGFtcGlvbnMucHkgc2NyaXB0LlxyXG4vLyBTb3VyY2U6IGh0dHBzOi8vcmF3LmNvbW11bml0eWRyYWdvbi5vcmcvbGF0ZXN0L2NkcmFnb24vdGZ0L2VuX3VzLmpzb25cclxuXHJcbmltcG9ydCB7IENoYW1waW9uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBjaGFtcGlvbnM6IENoYW1waW9uW10gPSBbXHJcbiAgLy8gPT09PT0gMS1Db3N0ICgxNCkgPT09PT1cclxuICB7IGlkOiAnVEZUMTdfQWF0cm94JywgbmFtZTogXCJBYXRyb3hcIiwgY29zdDogMSwgdHJhaXRzOiBbJ04uTy5WLkEuJywgJ0Jhc3Rpb24nXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19BYXRyb3gvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfQWF0cm94X3NwbGFzaF90aWxlXzMwLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0JyaWFyJywgbmFtZTogXCJCcmlhclwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnQW5pbWEnLCAnUHJpbW9yZGlhbicsICdSb2d1ZSddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0JyaWFyL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0JyaWFyX3NwbGFzaF90aWxlXzEwLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0NhaXRseW4nLCBuYW1lOiBcIkNhaXRseW5cIiwgY29zdDogMSwgdHJhaXRzOiBbJ04uTy5WLkEuJywgJ0ZhdGV3ZWF2ZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19DYWl0bHluL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0NhaXRseW5fc3BsYXNoX3RpbGVfNDguVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfQ2hvZ2F0aCcsIG5hbWU6IFwiQ2hvJ0dhdGhcIiwgY29zdDogMSwgdHJhaXRzOiBbJ0RhcmsgU3RhcicsICdCcmF3bGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQ2hvZ2F0aC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19DaG9nYXRoX3NwbGFzaF90aWxlXzcuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfRXpyZWFsJywgbmFtZTogXCJFenJlYWxcIiwgY29zdDogMSwgdHJhaXRzOiBbJ1RpbWVicmVha2VyJywgJ1NuaXBlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0V6cmVhbC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19FenJlYWxfc3BsYXNoX3RpbGVfNS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19MZW9uYScsIG5hbWU6IFwiTGVvbmFcIiwgY29zdDogMSwgdHJhaXRzOiBbJ0FyYml0ZXInLCAnVmFuZ3VhcmQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19MZW9uYS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19MZW9uYV9zcGxhc2hfdGlsZV82NC5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19MaXNzYW5kcmEnLCBuYW1lOiBcIkxpc3NhbmRyYVwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnRGFyayBTdGFyJywgJ1NoZXBoZXJkJywgJ1JlcGxpY2F0b3InXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19MaXNzYW5kcmEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTGlzc2FuZHJhX3NwbGFzaF90aWxlXzEyLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X05hc3VzJywgbmFtZTogXCJOYXN1c1wiLCBjb3N0OiAxLCB0cmFpdHM6IFsnU3BhY2UgR3Jvb3ZlJywgJ1Zhbmd1YXJkJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTmFzdXMvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTmFzdXNfc3BsYXNoX3RpbGVfMjUuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfUG9wcHknLCBuYW1lOiBcIlBvcHB5XCIsIGNvc3Q6IDEsIHRyYWl0czogWydNZWVwbGUnLCAnQmFzdGlvbiddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1BvcHB5L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1BvcHB5X3NwbGFzaF90aWxlXzE2LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1Jla1NhaScsIG5hbWU6IFwiUmVrJ1NhaVwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnUHJpbW9yZGlhbicsICdCcmF3bGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfUmVrU2FpL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1Jla1NhaV9zcGxhc2hfdGlsZV8yNi5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19UYWxvbicsIG5hbWU6IFwiVGFsb25cIiwgY29zdDogMSwgdHJhaXRzOiBbJ1N0YXJnYXplcicsICdSb2d1ZSddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1RhbG9uL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1RhbG9uX3NwbGFzaF90aWxlXzM5LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1RlZW1vJywgbmFtZTogXCJUZWVtb1wiLCBjb3N0OiAxLCB0cmFpdHM6IFsnU3BhY2UgR3Jvb3ZlJywgJ1NoZXBoZXJkJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfVGVlbW8vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfVGVlbW9fc3BsYXNoX3RpbGVfNDcuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfVHdpc3RlZEZhdGUnLCBuYW1lOiBcIlR3aXN0ZWQgRmF0ZVwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnU3RhcmdhemVyJywgJ0ZhdGV3ZWF2ZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Ud2lzdGVkRmF0ZS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Ud2lzdGVkRmF0ZV9zcGxhc2hfdGlsZV80NS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19WZWlnYXInLCBuYW1lOiBcIlZlaWdhclwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnTWVlcGxlJywgJ1JlcGxpY2F0b3InXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19WZWlnYXIvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfVmVpZ2FyX3NwbGFzaF90aWxlXzMyLlRGVF9TZXQxNy5wbmcnIH0sXHJcblxyXG4gIC8vID09PT09IDItQ29zdCAoMTMpID09PT09XHJcbiAgeyBpZDogJ1RGVDE3X0FrYWxpJywgbmFtZTogXCJBa2FsaVwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnTi5PLlYuQS4nLCAnTWFyYXVkZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Ba2FsaS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Ba2FsaV9zcGxhc2hfdGlsZV82OC5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19CZWx2ZXRoJywgbmFtZTogXCJCZWwnVmV0aFwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnUHJpbW9yZGlhbicsICdDaGFsbGVuZ2VyJywgJ01hcmF1ZGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQmVsdmV0aC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19CZWx2ZXRoX3NwbGFzaF90aWxlXzE5LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0duYXInLCBuYW1lOiBcIkduYXJcIiwgY29zdDogMiwgdHJhaXRzOiBbJ01lZXBsZScsICdTbmlwZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19HbmFyL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0duYXJfc3BsYXNoX3RpbGVfMTUuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfR3JhZ2FzJywgbmFtZTogXCJHcmFnYXNcIiwgY29zdDogMiwgdHJhaXRzOiBbJ1BzaW9uaWMnLCAnQnJhd2xlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0dyYWdhcy9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19HcmFnYXNfc3BsYXNoX3RpbGVfMTAuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfR3dlbicsIG5hbWU6IFwiR3dlblwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnU3BhY2UgR3Jvb3ZlJywgJ1JvZ3VlJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfR3dlbi9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Hd2VuX3NwbGFzaF90aWxlXzEuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfSXZlcm5NaW5pb24nLCBuYW1lOiBcIk1lZXBzaWVcIiwgY29zdDogMiwgdHJhaXRzOiBbJ01lZXBsZScsICdTaGVwaGVyZCcsICdWb3lhZ2VyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfSXZlcm5NaW5pb24vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfSXZlcm5NaW5pb25fc3BsYXNoX3RpbGVfMjcuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfSmF4JywgbmFtZTogXCJKYXhcIiwgY29zdDogMiwgdHJhaXRzOiBbJ1N0YXJnYXplcicsICdCYXN0aW9uJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfSmF4L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0pheF9Nb2JpbGUuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfSmlueCcsIG5hbWU6IFwiSmlueFwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnQW5pbWEnLCAnQ2hhbGxlbmdlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0ppbngvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfSmlueF9zcGxhc2hfdGlsZV8zOC5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19NaWxpbycsIG5hbWU6IFwiTWlsaW9cIiwgY29zdDogMiwgdHJhaXRzOiBbJ1RpbWVicmVha2VyJywgJ0ZhdGV3ZWF2ZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19NaWxpby9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19NaWxpb19zcGxhc2hfdGlsZV8wLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X01vcmRla2Fpc2VyJywgbmFtZTogXCJNb3JkZWthaXNlclwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnRGFyayBTdGFyJywgJ0NvbmR1aXQnLCAnVmFuZ3VhcmQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Nb3JkZWthaXNlci9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Nb3JkZWthaXNlcl9zcGxhc2hfdGlsZV82LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1BhbnRoZW9uJywgbmFtZTogXCJQYW50aGVvblwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnVGltZWJyZWFrZXInLCAnQnJhd2xlcicsICdSZXBsaWNhdG9yJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfUGFudGhlb24vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfUGFudGhlb25fc3BsYXNoX3RpbGVfMTYuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfUHlrZScsIG5hbWU6IFwiUHlrZVwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnUHNpb25pYycsICdWb3lhZ2VyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfUHlrZS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19QeWtlX3NwbGFzaF90aWxlXzI1LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1pvZScsIG5hbWU6IFwiWm9lXCIsIGNvc3Q6IDIsIHRyYWl0czogWydBcmJpdGVyJywgJ0NvbmR1aXQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19ab2UvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfWm9lX3NwbGFzaF90aWxlXzQzLlRGVF9TZXQxNy5wbmcnIH0sXHJcblxyXG4gIC8vID09PT09IDMtQ29zdCAoMTMpID09PT09XHJcbiAgeyBpZDogJ1RGVDE3X0F1cm9yYScsIG5hbWU6IFwiQXVyb3JhXCIsIGNvc3Q6IDMsIHRyYWl0czogWydBbmltYScsICdWb3lhZ2VyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQXVyb3JhL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0F1cm9yYV9zcGxhc2hfdGlsZV8xLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0RpYW5hJywgbmFtZTogXCJEaWFuYVwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnQXJiaXRlcicsICdDaGFsbGVuZ2VyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfRGlhbmEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfRGlhbmFTcGxhc2hfTW9iaWxlLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0ZpenonLCBuYW1lOiBcIkZpenpcIiwgY29zdDogMywgdHJhaXRzOiBbJ01lZXBsZScsICdSb2d1ZSddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0ZpenovU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfRml6el9zcGxhc2hfdGlsZV8yNi5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19JbGxhb2knLCBuYW1lOiBcIklsbGFvaVwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnQW5pbWEnLCAnVmFuZ3VhcmQnLCAnU2hlcGhlcmQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19JbGxhb2kvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfSWxsYW9pX3NwbGFzaF90aWxlXzI3LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0thaXNhJywgbmFtZTogXCJLYWknU2FcIiwgY29zdDogMywgdHJhaXRzOiBbJ0RhcmsgU3RhcicsICdSb2d1ZSddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0thaXNhL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0thaXNhX3NwbGFzaF90aWxlXzY5LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0x1bHUnLCBuYW1lOiBcIkx1bHVcIiwgY29zdDogMywgdHJhaXRzOiBbJ1N0YXJnYXplcicsICdSZXBsaWNhdG9yJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTHVsdS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19MdWx1X3NwbGFzaF90aWxlXzE0LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X01hb2thaScsIG5hbWU6IFwiTWFva2FpXCIsIGNvc3Q6IDMsIHRyYWl0czogWydOLk8uVi5BLicsICdCcmF3bGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTWFva2FpL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X01hb2thaV9zcGxhc2hfdGlsZV8zMy5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19NaXNzRm9ydHVuZScsIG5hbWU6IFwiTWlzcyBGb3J0dW5lXCIsIGNvc3Q6IDMsIHRyYWl0czogWydHdW4gR29kZGVzcyddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X01pc3NGb3J0dW5lL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X01pc3NGb3J0dW5lX3NwbGFzaF90aWxlXzE2LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X09ybm4nLCBuYW1lOiBcIk9ybm5cIiwgY29zdDogMywgdHJhaXRzOiBbJ1NwYWNlIEdyb292ZScsICdCYXN0aW9uJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfT3Jubi9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Pcm5uX3NwbGFzaF90aWxlXzExLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1JoYWFzdCcsIG5hbWU6IFwiUmhhYXN0XCIsIGNvc3Q6IDMsIHRyYWl0czogWydSZWRlZW1lciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1JoYWFzdC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19LYXluU3BsYXNoX1RpbGUuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfU2FtaXJhJywgbmFtZTogXCJTYW1pcmFcIiwgY29zdDogMywgdHJhaXRzOiBbJ1NwYWNlIEdyb292ZScsICdTbmlwZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19TYW1pcmEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfU2FtaXJhX3NwbGFzaF90aWxlXzEwLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1VyZ290JywgbmFtZTogXCJVcmdvdFwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnTWVjaGEnLCAnQnJhd2xlcicsICdNYXJhdWRlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1VyZ290L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1VyZ290X3NwbGFzaF90aWxlXzMyLlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1Zpa3RvcicsIG5hbWU6IFwiVmlrdG9yXCIsIGNvc3Q6IDMsIHRyYWl0czogWydQc2lvbmljJywgJ0NvbmR1aXQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19WaWt0b3IvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfVmlrdG9yX3NwbGFzaF90aWxlXzUuVEZUX1NldDE3LnBuZycgfSxcclxuXHJcbiAgLy8gPT09PT0gNC1Db3N0ICgxNCkgPT09PT1cclxuICB7IGlkOiAnVEZUMTdfQXVyZWxpb25Tb2wnLCBuYW1lOiBcIkF1cmVsaW9uIFNvbFwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnTWVjaGEnLCAnQ29uZHVpdCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0F1cmVsaW9uU29sL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0F1cmVsaW9uU29sX3NwbGFzaF90aWxlXzIuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfQ29ya2knLCBuYW1lOiBcIkNvcmtpXCIsIGNvc3Q6IDQsIHRyYWl0czogWydNZWVwbGUnLCAnRmF0ZXdlYXZlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0NvcmtpL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0NvcmtpX3NwbGFzaF90aWxlXzI2LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0dhbGlvJywgbmFtZTogXCJUaGUgTWlnaHR5IE1lY2hcIiwgY29zdDogNCwgdHJhaXRzOiBbJ01lY2hhJywgJ1ZveWFnZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19HYWxpby9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19HYWxpb19Nb2JpbGUuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfS2FybWEnLCBuYW1lOiBcIkthcm1hXCIsIGNvc3Q6IDQsIHRyYWl0czogWydEYXJrIFN0YXInLCAnVm95YWdlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0thcm1hL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0thcm1hX3NwbGFzaF90aWxlXzguVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfS2luZHJlZCcsIG5hbWU6IFwiS2luZHJlZFwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnTi5PLlYuQS4nLCAnQ2hhbGxlbmdlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0tpbmRyZWQvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfS2luZHJlZF9zcGxhc2hfdGlsZV8yMy5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19MZWJsYW5jJywgbmFtZTogXCJMZUJsYW5jXCIsIGNvc3Q6IDQsIHRyYWl0czogWydBcmJpdGVyJywgJ1NoZXBoZXJkJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTGVibGFuYy9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19MZWJsYW5jX3NwbGFzaF90aWxlXzI5LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X01hc3RlcllpJywgbmFtZTogXCJNYXN0ZXIgWWlcIiwgY29zdDogNCwgdHJhaXRzOiBbJ1BzaW9uaWMnLCAnTWFyYXVkZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19NYXN0ZXJZaS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19NYXN0ZXJZaV9zcGxhc2hfdGlsZV8zMy5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19Nb3JnYW5hJywgbmFtZTogXCJNb3JnYW5hXCIsIGNvc3Q6IDQsIHRyYWl0czogWydEYXJrIExhZHknXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Nb3JnYW5hL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X01vcmdhbmFfc3BsYXNoX3RpbGVfNTAuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfTmFtaScsIG5hbWU6IFwiTmFtaVwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnU3BhY2UgR3Jvb3ZlJywgJ1JlcGxpY2F0b3InXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19OYW1pL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X05hbWlfc3BsYXNoX3RpbGVfNDEuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfTnVudScsIG5hbWU6IFwiTnVudSAmIFdpbGx1bXBcIiwgY29zdDogNCwgdHJhaXRzOiBbJ1N0YXJnYXplcicsICdWYW5ndWFyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X051bnUvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTnVudV9zcGxhc2hfdGlsZV8zNS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19SYW1tdXMnLCBuYW1lOiBcIlJhbW11c1wiLCBjb3N0OiA0LCB0cmFpdHM6IFsnTWVlcGxlJywgJ0Jhc3Rpb24nXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19SYW1tdXMvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfUmFtbXVzX3NwbGFzaF90aWxlXzE3LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X1JpdmVuJywgbmFtZTogXCJSaXZlblwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnVGltZWJyZWFrZXInLCAnUm9ndWUnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19SaXZlbi9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19SaXZlbl9zcGxhc2hfdGlsZV8xOC5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19UYWhtS2VuY2gnLCBuYW1lOiBcIlRhaG0gS2VuY2hcIiwgY29zdDogNCwgdHJhaXRzOiBbJ09yYWNsZScsICdCcmF3bGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfVGFobUtlbmNoL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1RhaG1LZW5jaF9zcGxhc2hfdGlsZV8xMS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19YYXlhaCcsIG5hbWU6IFwiWGF5YWhcIiwgY29zdDogNCwgdHJhaXRzOiBbJ1N0YXJnYXplcicsICdTbmlwZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19YYXlhaC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19YYXlhaF9zcGxhc2hfdGlsZV8xLlRGVF9TZXQxNy5wbmcnIH0sXHJcblxyXG4gIC8vID09PT09IDUtQ29zdCAoOSkgPT09PT1cclxuICB7IGlkOiAnVEZUMTdfQmFyZCcsIG5hbWU6IFwiQmFyZFwiLCBjb3N0OiA1LCB0cmFpdHM6IFsnTWVlcGxlJywgJ0NvbmR1aXQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19CYXJkL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0JhcmRfc3BsYXNoX3RpbGVfOC5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19CbGl0emNyYW5rJywgbmFtZTogXCJCbGl0emNyYW5rXCIsIGNvc3Q6IDUsIHRyYWl0czogWydQYXJ0eSBBbmltYWwnLCAnU3BhY2UgR3Jvb3ZlJywgJ1Zhbmd1YXJkJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQmxpdHpjcmFuay9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19CbGl0emNyYW5rX3NwbGFzaF90aWxlXzY1LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0Zpb3JhJywgbmFtZTogXCJGaW9yYVwiLCBjb3N0OiA1LCB0cmFpdHM6IFsnRGl2aW5lIER1ZWxpc3QnLCAnQW5pbWEnLCAnTWFyYXVkZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19GaW9yYS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19GaW9yYV9zcGxhc2hfdGlsZV81MS5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19HcmF2ZXMnLCBuYW1lOiBcIkdyYXZlc1wiLCBjb3N0OiA1LCB0cmFpdHM6IFsnRmFjdG9yeSBOZXcnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19HcmF2ZXMvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfR3JhdmVzX3NwbGFzaF90aWxlXzE4LlRGVF9TZXQxNy5wbmcnIH0sXHJcbiAgeyBpZDogJ1RGVDE3X0poaW4nLCBuYW1lOiBcIkpoaW5cIiwgY29zdDogNSwgdHJhaXRzOiBbJ0RhcmsgU3RhcicsICdFcmFkaWNhdG9yJywgJ1NuaXBlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0poaW4vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfSmhpbl9zcGxhc2hfdGlsZV8zNy5URlRfU2V0MTcucG5nJyB9LFxyXG4gIHsgaWQ6ICdURlQxN19TaGVuJywgbmFtZTogXCJTaGVuXCIsIGNvc3Q6IDUsIHRyYWl0czogWydCdWx3YXJrJywgJ0Jhc3Rpb24nXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19TaGVuL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X3NoZW5fc3BsYXNoX3RpbGVfNDkuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfU29uYScsIG5hbWU6IFwiU29uYVwiLCBjb3N0OiA1LCB0cmFpdHM6IFsnQ29tbWFuZGVyJywgJ1BzaW9uaWMnLCAnU2hlcGhlcmQnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Tb25hL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1NvbmFfc3BsYXNoX3RpbGVfMTcuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfVmV4JywgbmFtZTogXCJWZXhcIiwgY29zdDogNSwgdHJhaXRzOiBbJ0Rvb21lciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1ZleC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN192ZXhfc3BsYXNoX3RpbGVfMTAuVEZUX1NldDE3LnBuZycgfSxcclxuICB7IGlkOiAnVEZUMTdfWmVkJywgbmFtZTogXCJaZWRcIiwgY29zdDogNSwgdHJhaXRzOiBbJ0dhbGF4eSBIdW50ZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19aZWQvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfWmVkX3NwbGFzaF90aWxlXzY4LlRGVF9TZXQxNy5wbmcnIH0sXHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgY2hhbXBpb25NYXAgPSBuZXcgTWFwKGNoYW1waW9ucy5tYXAoYyA9PiBbYy5pZCwgY10pKTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDaGFtcGlvbnNCeUNvc3QgPSAoY29zdDogbnVtYmVyKSA9PlxyXG4gIGNoYW1waW9ucy5maWx0ZXIoYyA9PiBjLmNvc3QgPT09IGNvc3QpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldENoYW1waW9uc0J5VHJhaXQgPSAodHJhaXQ6IHN0cmluZykgPT5cclxuICBjaGFtcGlvbnMuZmlsdGVyKGMgPT4gYy50cmFpdHMuaW5jbHVkZXModHJhaXQpKTtcclxuIiwiLy8gUGl2b3RURlQgLSBTZXQgMTcgbWV0YSBjb21wb3NpdGlvbnNcclxuLy8gQ2hhbXBpb24gSURzIGFuZCB0cmFpdHMgc291cmNlZCBmcm9tIENvbW11bml0eURyYWdvbiBTZXQgMTcgZGF0YS5cclxuLy8gTk9URTogdGllciByYW5raW5ncyBhbmQgaXRlbSBidWlsZHMgYXJlIGF1dGhvciBwbGFjZWhvbGRlcnMgcGVuZGluZyBsaXZlXHJcbi8vIHBhdGNoIGRhdGE7IHRoZSB1bml0cywgY29zdHMsIGFuZCB0cmFpdHMgcmVmZXJlbmNlZCBoZXJlIGFyZSByZWFsLlxyXG5cclxuaW1wb3J0IHsgQ29tcCB9IGZyb20gJy4uLy4uL21vZGVscy90eXBlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgbWV0YUNvbXBzOiBDb21wW10gPSBbXHJcbiAgLy8gPT09PT0gUyBUSUVSID09PT09XHJcbiAge1xyXG4gICAgaWQ6ICdtb3JnYW5hLWRhcmstbGFkeScsXHJcbiAgICBuYW1lOiAnTW9yZ2FuYSBEYXJrIExhZHknLFxyXG4gICAgdGllcjogJ1MnLFxyXG4gICAgcGxheXN0eWxlOiAnRmFzdCA5JyxcclxuICAgIGRpZmZpY3VsdHk6ICdIYXJkJyxcclxuICAgIGxldmVsOiA5LFxyXG4gICAgdW5pdHM6IFtcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZ2FuYScsICAgICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAyLCBpdGVtczogWydyYWJhZG9ucy1kZWF0aGNhcCcsICdqZXdlbGVkLWdhdW50bGV0JywgJ2hleHRlY2gtZ3VuYmxhZGUnXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIsIGl0ZW1zOiBbJ2JsdWUtYnVmZiddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X01vcmRla2Fpc2VyJywgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19MaXNzYW5kcmEnLCAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfSmhpbicsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1ZleCcsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Nb3JkZWthaXNlcicsIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfU2hlbicsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydEYXJrIExhZHknLCAnRGFyayBTdGFyJ10sXHJcbiAgICBkZXNjcmlwdGlvbjogJ01vcmdhbmEgc29sby1jYXJyaWVzIHdpdGggRGFyayBTdGFyIHN1cHBvcnRpbmcgY2FzdC4gVW5jYXAgYm9hcmQgYXQgTHY5IGZvciBKaGluL1ZleCBzZWNvbmRhcnkgQVAuJyxcclxuICAgIGVhcmx5R2FtZTogJ0xpc3NhbmRyYSArIE1vcmRla2Fpc2VyIG9wZW5lciBmb3IgRGFyayBTdGFyIDIuIEVjb24gdG8gNTAsIHB1c2ggOCBvbiA0LTIuJyxcclxuICAgIG1pZEdhbWU6ICdTdGFiaWxpemUgYXQgTHY3IG9uIDQtMSDigJQgZmluZCBLYXJtYSAyIGFuZCBjb21wbGV0ZSBSYWJhZG9uXFwncyBvbiBNb3JnYW5hLicsXHJcbiAgICBsYXRlR2FtZTogJ1B1c2ggTHY5IG9uIDUtMSBhbmQgc2xvdyByb2xsIGZvciBNb3JnYW5hIDIg4oCUIHVuY2FwIHdpdGggSmhpbiBhbmQgVmV4LicsXHJcbiAgICB0aXBzOiAnTW9yZ2FuYSB3YW50cyBBUC9kdXJhYmlsaXR5LiBQb3NpdGlvbiBiZWhpbmQgU2hlbiBmb3IgdGhlIGJ1bHdhcmsgc2hpZWxkLicsXHJcbiAgICByZWNvbW1lbmRlZEF1Z21lbnRzOiBbJ1RGVDEzX0F1Z21lbnRfU29yY2VyZXJDcm93bicsICdURlQ2X0F1Z21lbnRfUGFuZG9yYXNJdGVtcycsICdURlQ2X0F1Z21lbnRfQXNjZW5zaW9uJ11cclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAnamhpbi1kYXJrLXN0YXItc25pcGVycycsXHJcbiAgICBuYW1lOiAnSmhpbiBEYXJrIFN0YXIgU25pcGVycycsXHJcbiAgICB0aWVyOiAnUycsXHJcbiAgICBwbGF5c3R5bGU6ICdGYXN0IDgnLFxyXG4gICAgZGlmZmljdWx0eTogJ01lZGl1bScsXHJcbiAgICBsZXZlbDogOCxcclxuICAgIHVuaXRzOiBbXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0poaW4nLCAgICAgICAgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDIsIGl0ZW1zOiBbJ2luZmluaXR5LWVkZ2UnLCAnbGFzdC13aGlzcGVyJywgJ2dpYW50LXNsYXllciddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1hheWFoJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIsIGl0ZW1zOiBbJ2d1aW5zb29zLXJhZ2VibGFkZSddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0V6cmVhbCcsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfR25hcicsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0xpc3NhbmRyYScsICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZGVrYWlzZXInLCAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19TaGVuJywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydEYXJrIFN0YXInLCAnRXJhZGljYXRvcicsICdTbmlwZXInXSxcclxuICAgIGRlc2NyaXB0aW9uOiAnU25pcGVyIGxpbmUgYmFja2VkIGJ5IERhcmsgU3RhciBkYW1hZ2UgYW1wLiBKaGluIG9uZS1zaG90cyBiYWNrbGluZSBjYXJyaWVzIG9uIGhpcyBmb3VydGggc2hvdC4nLFxyXG4gICAgZWFybHlHYW1lOiAnRXpyZWFsICsgR25hciBlYXJseSBTbmlwZXIgdHJhaXQuIFNsYW0gSUUgb24gSmhpbiBob2xkZXIuJyxcclxuICAgIG1pZEdhbWU6ICdTdGFiaWxpemUgYXQgTHY3IGJ5IDQtMSDigJQgaG9sZCBKaGluIGFuZCBYYXlhaCBwYWlycywgY29tcGxldGUgTGFzdCBXaGlzcGVyLicsXHJcbiAgICBsYXRlR2FtZTogJ1B1c2ggTHY4IG9uIDQtMiBhbmQgc2xvdyByb2xsIOKAlCBTbmlwZXIgNCArIEthcm1hIGJvb3N0IGNsb3NlcyBvdXQgdGhlIGxvYmJ5LicsXHJcbiAgICB0aXBzOiAnU3RhY2sgU25pcGVycyBpbiB0aGUgc2FtZSBjb2x1bW4uIEthcm1hIGJvb3N0cyB0aGUgbGluZSBmb3IgY3JpdCArIEFQIHN5bmVyZ3kuJyxcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUMTNfQXVnbWVudF9TbmlwZXInLCAnVEZUMTNfQXVnbWVudF9TbmlwZXJDcm93bicsICdURlQ2X0F1Z21lbnRfQXNjZW5zaW9uJ11cclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAneGF5YWgtc3RhcmdhemVyJyxcclxuICAgIG5hbWU6ICdYYXlhaCBTdGFyZ2F6ZXInLFxyXG4gICAgdGllcjogJ1MnLFxyXG4gICAgcGxheXN0eWxlOiAnRmFzdCA4JyxcclxuICAgIGRpZmZpY3VsdHk6ICdNZWRpdW0nLFxyXG4gICAgbGV2ZWw6IDgsXHJcbiAgICB1bml0czogW1xyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19YYXlhaCcsICAgICAgICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAyLCBpdGVtczogWydpbmZpbml0eS1lZGdlJywgJ2xhc3Qtd2hpc3BlcicsICdydW5hYW5zLWh1cnJpY2FuZSddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0x1bHUnLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfSmF4JywgICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Ud2lzdGVkRmF0ZScsICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1RhbG9uJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQ2FpdGx5bicsICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19NaWxpbycsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X051bnUnLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgIF0sXHJcbiAgICBjb3JlVHJhaXRzOiBbJ1N0YXJnYXplcicsICdTbmlwZXInLCAnQmFzdGlvbiddLFxyXG4gICAgZGVzY3JpcHRpb246ICdTdGFyZ2F6ZXIgY29uc3RlbGxhdGlvbiBidWZmcyBYYXlhaCB3aGlsZSBKYXggdGFua3MuIE51bnUgaG9sZHMgdGhlIFN0YXJnYXplciA0LWNvc3Qgc2xvdC4nLFxyXG4gICAgZWFybHlHYW1lOiAnT3BlbiB3aXRoIFRGICsgVGFsb24gKyBDYWl0bHluIGZvciBTdGFyZ2F6ZXIgMy4gRWNvbiBmb3IgWGF5YWguJyxcclxuICAgIG1pZEdhbWU6ICdTdGFiaWxpemUgTHY3IG9uIDQtMSDigJQgZmluZCBYYXlhaCBjb3BpZXMsIGZpbmlzaCBJRSwgYW5kIHNsYW0gSmF4IGZyb250bGluZS4nLFxyXG4gICAgbGF0ZUdhbWU6ICdQdXNoIEx2OCBvbiA0LTIgYW5kIHNsb3cgcm9sbCBmb3IgWGF5YWggMiArIEx1bHUvTnVudSB0byBoaXQgU3RhcmdhemVyIDUuJyxcclxuICAgIHRpcHM6ICdTdGFyZ2F6ZXIgNSBpcyB0aGUgc3Bpa2UgaWYgeW91IGZpbmQgTHVsdSBhbmQgTnVudS4gUG9zaXRpb24gWGF5YWggYmFjay1jb3JuZXIuJyxcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUMTNfQXVnbWVudF9TbmlwZXJDcmVzdCcsICdURlQ2X0F1Z21lbnRfQXNjZW5zaW9uJywgJ1RGVDEwX0F1Z21lbnRfQmlnR2FpbnMnXVxyXG4gIH0sXHJcblxyXG4gIC8vID09PT09IEEgVElFUiA9PT09PVxyXG4gIHtcclxuICAgIGlkOiAncHJpbW9yZGlhbi1yZXJvbGwnLFxyXG4gICAgbmFtZTogJ1ByaW1vcmRpYW4gUmVyb2xsJyxcclxuICAgIHRpZXI6ICdBJyxcclxuICAgIHBsYXlzdHlsZTogJ1Jlcm9sbCcsXHJcbiAgICBkaWZmaWN1bHR5OiAnRWFzeScsXHJcbiAgICBsZXZlbDogNixcclxuICAgIHVuaXRzOiBbXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1Jla1NhaScsICAgICAgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDMsIGl0ZW1zOiBbJ3RpdGFucy1yZXNvbHZlJywgJ2Jsb29kdGhpcnN0ZXInLCAnd2FybW9ncy1hcm1vciddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0JlbHZldGgnLCAgICAgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDMsIGl0ZW1zOiBbJ2d1aW5zb29zLXJhZ2VibGFkZScsICdydW5hYW5zLWh1cnJpY2FuZScsICdnaWFudC1zbGF5ZXInXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19CcmlhcicsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAzIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X01hb2thaScsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfSWxsYW9pJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19BdXJvcmEnLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydQcmltb3JkaWFuJywgJ0FuaW1hJywgJ0JyYXdsZXInXSxcclxuICAgIGRlc2NyaXB0aW9uOiBcIlJlcm9sbCBMdjYgZm9yIDMtc3RhciBSZWsnU2FpIGFuZCBCZWwnVmV0aC4gUHJpbW9yZGlhbiBCcmF3bGVycyBzdGF0LWNoZWNrIGVuZW1pZXMuXCIsXHJcbiAgICBlYXJseUdhbWU6ICdCdXkgZXZlcnkgUmVrXFwnU2FpLCBCZWxcXCdWZXRoLCBCcmlhciBmcm9tIFN0YWdlIDIuIFNsb3cgcm9sbCBhdCBMdjYuJyxcclxuICAgIG1pZEdhbWU6ICdTdGF5IEx2NiBvbiAzLTIg4oCUIHNsb3cgcm9sbCA1MGcgZG93biBmb3IgUmVrXFwnU2FpIDMsIEJlbFxcJ1ZldGggMywgYW5kIEJyaWFyIDMuJyxcclxuICAgIGxhdGVHYW1lOiAnT25jZSAzLXN0YXJzIGhpdCwgcHVzaCBMdjcgb24gNC0yIGZvciBBdXJvcmEgYW5kIGxvY2sgaW4gQW5pbWEgNC4nLFxyXG4gICAgdGlwczogXCJQcmlvcml0aXplIFJlaydTYWkgaXRlbXMgb24gY2Fyb3VzZWwuIEF1cm9yYSAyLXN0YXIgYWRkcyBBbmltYSB0cmFpdC5cIixcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUMTNfQXVnbWVudF9CcnVpc2VyJywgJ1RGVDEzX0F1Z21lbnRfQnJ1aXNlckNyb3duJywgJ1RGVDZfQXVnbWVudF9TYWx2YWdlQmluSFInXVxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6ICdtZWNoYS1hc29sJyxcclxuICAgIG5hbWU6ICdNZWNoYSBBdXJlbGlvbiBTb2wnLFxyXG4gICAgdGllcjogJ0EnLFxyXG4gICAgcGxheXN0eWxlOiAnRmFzdCA4JyxcclxuICAgIGRpZmZpY3VsdHk6ICdIYXJkJyxcclxuICAgIGxldmVsOiA4LFxyXG4gICAgdW5pdHM6IFtcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQXVyZWxpb25Tb2wnLCAgaXNDYXJyeTogdHJ1ZSwgIHN0YXJMZXZlbDogMiwgaXRlbXM6IFsnamV3ZWxlZC1nYXVudGxldCcsICdoZXh0ZWNoLWd1bmJsYWRlJywgJ3JhYmFkb25zLWRlYXRoY2FwJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfR2FsaW8nLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19VcmdvdCcsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1Zpa3RvcicsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfS2FybWEnLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19CYXJkJywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0JsaXR6Y3JhbmsnLCAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDEgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZGVrYWlzZXInLCAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgXSxcclxuICAgIGNvcmVUcmFpdHM6IFsnTWVjaGEnLCAnQ29uZHVpdCcsICdWYW5ndWFyZCddLFxyXG4gICAgZGVzY3JpcHRpb246ICdGdWxsIE1lY2hhIGZyb250bGluZSBwaWxvdCBBU29sLCBDb25kdWl0IGNoYWluIGZlZWRzIHRoZSB0ZWFtIG1hbmEuIENhcCBib2FyZCB3aXRoIEJhcmQgb3IgQmxpdHpjcmFuay4nLFxyXG4gICAgZWFybHlHYW1lOiAnVXJnb3QgKyBWaWt0b3IgZWFybHkgTWVjaGEuIFRyYW5zaXRpb24gdG8gQVNvbCArIEdhbGlvIGF0IEx2OC4nLFxyXG4gICAgbWlkR2FtZTogJ1N0YWJpbGl6ZSBhdCBMdjcgd2l0aCBNZWNoYSAzIOKAlCBlY29uIHRvIDUwZyBhbmQgcHJlcCBBU29sIGl0ZW1zLicsXHJcbiAgICBsYXRlR2FtZTogJ1B1c2ggTHY4IG9uIDQtMiwgZmluZCBBU29sIDIgYW5kIEdhbGlvIOKAlCBjYXAgd2l0aCBCYXJkIG9yIEJsaXR6Y3JhbmsgZm9yIENvbmR1aXQgY2hhaW4uJyxcclxuICAgIHRpcHM6ICdDb25kdWl0IG5lZWRzIGEgQ29uZHVpdCBwYWlyIHRvIGNoYWluLiBQYWlyIEFTb2wgd2l0aCBCYXJkIG9yIE1vcmRla2Fpc2VyLicsXHJcbiAgICByZWNvbW1lbmRlZEF1Z21lbnRzOiBbJ1RGVDEzX0F1Z21lbnRfU29yY2VyZXJDcm93bicsICdURlQ2X0F1Z21lbnRfUGFuZG9yYXNJdGVtcycsICdURlQxMF9BdWdtZW50X0JpZ0dhaW5zJ11cclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAnemVkLWdhbGF4eS1odW50ZXInLFxyXG4gICAgbmFtZTogJ1plZCBHYWxheHkgSHVudGVyJyxcclxuICAgIHRpZXI6ICdBJyxcclxuICAgIHBsYXlzdHlsZTogJ0Zhc3QgOScsXHJcbiAgICBkaWZmaWN1bHR5OiAnSGFyZCcsXHJcbiAgICBsZXZlbDogOSxcclxuICAgIHVuaXRzOiBbXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1plZCcsICAgICAgICAgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDIsIGl0ZW1zOiBbJ2luZmluaXR5LWVkZ2UnLCAnZWRnZS1vZi1uaWdodCcsICdibG9vZHRoaXJzdGVyJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfVGFsb24nLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Ba2FsaScsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0thaXNhJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfS2FybWEnLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Nb3JkZWthaXNlcicsICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0xpc3NhbmRyYScsICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfSmhpbicsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19TaGVuJywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydHYWxheHkgSHVudGVyJywgJ0RhcmsgU3RhcicsICdSb2d1ZSddLFxyXG4gICAgZGVzY3JpcHRpb246ICdaZWQgc29sbyBjYXJyeSB3aXRoIFJvZ3VlICsgRGFyayBTdGFyIGJhY2tsaW5lIHByZXNzdXJlLiBDYXAgYm9hcmQgYXQgTHY5LicsXHJcbiAgICBlYXJseUdhbWU6ICdMb3NzIHN0cmVhayBTdGFnZSAyLiBTdGFiaWxpemUgYXQgTHY3LCBwdXNoIDkgb24gNS0xLicsXHJcbiAgICBtaWRHYW1lOiAnTHY3IG9uIDQtMSB3aXRoIFRhbG9uICsgQWthbGkgUm9ndWUgMiDigJQgZWNvbiBmb3IgdGhlIEx2OC85IHB1c2ggYW5kIGNvbXBsZXRlIElFLicsXHJcbiAgICBsYXRlR2FtZTogJ1B1c2ggTHY4IG9uIDQtMiB0aGVuIDkgb24gNS0xIOKAlCBzbG93IHJvbGwgZm9yIFplZCAyIGFuZCBMaXNzYW5kcmEgMi4nLFxyXG4gICAgdGlwczogJ1plZCB3YW50cyBJRSArIHN1c3RhaW4uIEVkZ2Ugb2YgTmlnaHQgZ2l2ZXMgaGltIHRoZSBidXJzdCB3aW5kb3cuJyxcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUMTNfQXVnbWVudF9RdWlja3N0cmlrZXJDcm93bicsICdURlQ2X0F1Z21lbnRfQXNjZW5zaW9uJywgJ1RGVDEwX0F1Z21lbnRfQmlnR2FpbnMnXVxyXG4gIH0sXHJcblxyXG4gIC8vID09PT09IEIgVElFUiA9PT09PVxyXG4gIHtcclxuICAgIGlkOiAncHNpb25pYy1weWtlLXJlcm9sbCcsXHJcbiAgICBuYW1lOiAnUHNpb25pYyBQeWtlIFJlcm9sbCcsXHJcbiAgICB0aWVyOiAnQicsXHJcbiAgICBwbGF5c3R5bGU6ICdSZXJvbGwnLFxyXG4gICAgZGlmZmljdWx0eTogJ0Vhc3knLFxyXG4gICAgbGV2ZWw6IDYsXHJcbiAgICB1bml0czogW1xyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19QeWtlJywgICAgICAgICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAzLCBpdGVtczogWydpbmZpbml0eS1lZGdlJywgJ2VkZ2Utb2YtbmlnaHQnLCAnaGFuZC1vZi1qdXN0aWNlJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfR3JhZ2FzJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMyB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19WaWt0b3InLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X01hc3RlcllpJywgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfU29uYScsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydQc2lvbmljJywgJ1ZveWFnZXInLCAnTWFyYXVkZXInXSxcclxuICAgIGRlc2NyaXB0aW9uOiAnUmVyb2xsIGF0IEx2NiBmb3IgMy1zdGFyIFB5a2UuIFBzaW9uaWMgNCBpcyB0aGUgdGVhbSBzcGlrZSDigJQgU29uYSBjYXBzIGl0IGF0IDUuJyxcclxuICAgIGVhcmx5R2FtZTogJ0J1eSBldmVyeSBQeWtlICsgR3JhZ2FzICsgVmlrdG9yIGZyb20gU3RhZ2UgMi4nLFxyXG4gICAgbWlkR2FtZTogJ1N0YXkgTHY2IGZyb20gMy0yIOKAlCBzbG93IHJvbGwgZm9yIFB5a2UgMyBhbmQgR3JhZ2FzIDMsIGtlZXAgUHNpb25pYyA0IGFjdGl2ZS4nLFxyXG4gICAgbGF0ZUdhbWU6ICdBZnRlciAzLXN0YXJzIGhpdCwgcHVzaCBMdjcgZm9yIFNvbmEg4oCUIFBzaW9uaWMgNSBjbG9zZXMgb3V0IHRoZSBsb2JieS4nLFxyXG4gICAgdGlwczogJ1B5a2UganVtcHMgYmFja2xpbmU7IHBhaXIgd2l0aCBFZGdlIG9mIE5pZ2h0IGZvciBidXJzdCB3aW5kb3cuJyxcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUMTNfQXVnbWVudF9RdWlja3N0cmlrZXJDcm93bicsICdURlQ2X0F1Z21lbnRfU2FsdmFnZUJpbkhSJywgJ1RGVDZfQXVnbWVudF9Db21wb25lbnRHcmFiQmFnJ11cclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAnc29uYS1jb21tYW5kZXInLFxyXG4gICAgbmFtZTogJ1NvbmEgQ29tbWFuZGVyJyxcclxuICAgIHRpZXI6ICdCJyxcclxuICAgIHBsYXlzdHlsZTogJ0Zhc3QgOScsXHJcbiAgICBkaWZmaWN1bHR5OiAnTWVkaXVtJyxcclxuICAgIGxldmVsOiA5LFxyXG4gICAgdW5pdHM6IFtcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfU29uYScsICAgICAgICAgaXNDYXJyeTogdHJ1ZSwgIHN0YXJMZXZlbDogMiwgaXRlbXM6IFsnYmx1ZS1idWZmJywgJ2pld2VsZWQtZ2F1bnRsZXQnLCAnaGV4dGVjaC1ndW5ibGFkZSddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1RlZW1vJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTGlzc2FuZHJhJywgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19JbGxhb2knLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0xlYmxhbmMnLCAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfS2FybWEnLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19TaGVuJywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0JhcmQnLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDEgfSxcclxuICAgIF0sXHJcbiAgICBjb3JlVHJhaXRzOiBbJ0NvbW1hbmRlcicsICdTaGVwaGVyZCcsICdQc2lvbmljJ10sXHJcbiAgICBkZXNjcmlwdGlvbjogJ0hlYWwtYW5kLXNoaWVsZCBTaGVwaGVyZCBiYWNrYm9uZSB3aXRoIFNvbmEgYnJvYWRjYXN0aW5nIHRlYW0td2lkZSBidWZmcy4gU3Ryb25nIHZzIHN1c3RhaW5lZCBEUFMsIHdlYWsgdnMgYXNzYXNzaW5zLicsXHJcbiAgICBlYXJseUdhbWU6ICdPcGVuIFNoZXBoZXJkIDIgd2l0aCBUZWVtbyArIExpc3NhbmRyYS4gUHVzaCA4IG9uIDQtMi4nLFxyXG4gICAgbWlkR2FtZTogJ1N0YWJpbGl6ZSBMdjcgb24gNC0xIHdpdGggU2hlcGhlcmQgMyDigJQgZWNvbiBmb3IgdGhlIEx2OCBwdXNoLCBwcmVwIEJsdWUgQnVmZiBvbiBTb25hLicsXHJcbiAgICBsYXRlR2FtZTogJ1B1c2ggTHY4IG9uIDQtMiB0aGVuIDkgb24gNS0xIOKAlCBzbG93IHJvbGwgZm9yIFNvbmEgMiBhbmQgaGl0IFNoZXBoZXJkIDUuJyxcclxuICAgIHRpcHM6ICdTaGVwaGVyZCA1IGlzIHRoZSBzcGlrZS4gUG9zaXRpb24gU29uYSBiZWhpbmQgU2hlbiBmb3IgdGhlIEJ1bHdhcmsgc2hpZWxkLicsXHJcbiAgICByZWNvbW1lbmRlZEF1Z21lbnRzOiBbJ1RGVDZfQXVnbWVudF9QYW5kb3Jhc0l0ZW1zJywgJ1RGVDEwX0F1Z21lbnRfQmlnR2FpbnMnLCAnVEZUOV9BdWdtZW50X0xlYXJuaW5nRnJvbUV4cGVyaWVuY2UyJ11cclxuICB9LFxyXG5cclxuICAvLyA9PT09PSBDIFRJRVIgPT09PT1cclxuICB7XHJcbiAgICBpZDogJ2FuaW1hLWZpb3JhJyxcclxuICAgIG5hbWU6ICdBbmltYSBGaW9yYScsXHJcbiAgICB0aWVyOiAnQycsXHJcbiAgICBwbGF5c3R5bGU6ICdGYXN0IDgnLFxyXG4gICAgZGlmZmljdWx0eTogJ0hhcmQnLFxyXG4gICAgbGV2ZWw6IDgsXHJcbiAgICB1bml0czogW1xyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19GaW9yYScsICAgICAgICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAyLCBpdGVtczogWydpbmZpbml0eS1lZGdlJywgJ2Jsb29kdGhpcnN0ZXInLCAnbGFzdC13aGlzcGVyJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQnJpYXInLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19KaW54JywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0F1cm9yYScsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfSWxsYW9pJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Ba2FsaScsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0JlbHZldGgnLCAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZGVrYWlzZXInLCAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgXSxcclxuICAgIGNvcmVUcmFpdHM6IFsnQW5pbWEnLCAnRGl2aW5lIER1ZWxpc3QnLCAnTWFyYXVkZXInXSxcclxuICAgIGRlc2NyaXB0aW9uOiAnRmlvcmEgY2FycmllcyB3aXRoIEFuaW1hIGZyb250bGluZSBzdXBwb3J0LiBIaWdoIHZhcmlhbmNlIOKAlCBuZWVkcyBhIEZpb3JhIDItc3RhciBhbmQgQW5pbWEgNSBmb3IgdGhlIHNwaWtlLicsXHJcbiAgICBlYXJseUdhbWU6ICdCcmlhciArIEppbnggKyBBdXJvcmEgb3BlbmVyLiBTbGFtIGVhcmx5IGl0ZW1zIG9uIEZpb3JhIGhvbGRlci4nLFxyXG4gICAgbWlkR2FtZTogJ1N0YWJpbGl6ZSBhdCBMdjcgYnkgNC0xIOKAlCBob2xkIEZpb3JhIHBhaXJzIGFuZCBsb2NrIGluIHRoZSBBbmltYSBmcm9udGxpbmUuJyxcclxuICAgIGxhdGVHYW1lOiAnUHVzaCBMdjggb24gNC0yIGFuZCBzbG93IHJvbGwgZm9yIEZpb3JhIDIgYW5kIEFuaW1hIDUg4oCUIHRoZSBzcGlrZSB0aGF0IHdpbnMgZ2FtZXMuJyxcclxuICAgIHRpcHM6ICdGaW9yYSBuZWVkcyBJRSArIHN1c3RhaW4uIEFrYWxpICsgQmVsXFwnVmV0aCBnaXZlIHRoZSBNYXJhdWRlciBiYWNrbGluZS4nLFxyXG4gICAgcmVjb21tZW5kZWRBdWdtZW50czogWydURlQxM19BdWdtZW50X0NvbnF1ZXJvckNyb3duJywgJ1RGVDEzX0F1Z21lbnRfUGl0RmlnaHRlckNyb3duJywgJ1RGVDZfQXVnbWVudF9Bc2NlbnNpb24nXVxyXG4gIH0sXHJcbl07XHJcblxyXG4vLyBIZWxwZXI6IGdldCBjb21wcyBieSB0aWVyXHJcbmV4cG9ydCBjb25zdCBnZXRDb21wc0J5VGllciA9ICh0aWVyOiAnUycgfCAnQScgfCAnQicgfCAnQycgfCAnWCcpID0+XHJcbiAgbWV0YUNvbXBzLmZpbHRlcihjID0+IGMudGllciA9PT0gdGllcik7XHJcbiIsIi8vIFBpdm90VEZUIOKAlCBTZXQgMTcgXCJTcGFjZSBHb2RzXCIgSXRlbXMgRGF0YWJhc2UuIEF1dG8tZ2VuZXJhdGVkIGZyb20gY2RyYWdvbi5cbi8vIFRvIHJlZ2VuZXJhdGU6IG5vZGUgc3JjL3NjcmlwdHMvZXh0cmFjdEl0ZW1zLmpzXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudHMgPSBbXG4gIHtcbiAgICBcImlkXCI6IFwiY2hhaW4tdmVzdFwiLFxuICAgIFwibmFtZVwiOiBcIkNoYWluIFZlc3RcIixcbiAgICBcInN0YXRcIjogXCIrQEFybW9yQCBBcm1vclwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmVjdXJ2ZS1ib3dcIixcbiAgICBcIm5hbWVcIjogXCJSZWN1cnZlIEJvd1wiLFxuICAgIFwic3RhdFwiOiBcIitAQVNAJSBBdHRhY2sgU3BlZWRcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRlYXItb2YtZ29kZGVzc1wiLFxuICAgIFwibmFtZVwiOiBcIlRlYXIgb2YgdGhlIEdvZGRlc3NcIixcbiAgICBcInN0YXRcIjogXCIrQE1hbmFSZWdlbkAgTWFuYSBSZWdlblwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibmVnYXRyb24tY2xvYWtcIixcbiAgICBcIm5hbWVcIjogXCJOZWdhdHJvbiBDbG9ha1wiLFxuICAgIFwic3RhdFwiOiBcIitATWFnaWNSZXNpc3RAIE1hZ2ljIFJlc2lzdFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic3BhcnJpbmctZ2xvdmVzXCIsXG4gICAgXCJuYW1lXCI6IFwiU3BhcnJpbmcgR2xvdmVzXCIsXG4gICAgXCJzdGF0XCI6IFwiK0BDcml0Q2hhbmNlQCBDcml0aWNhbCBTdHJpa2UgQ2hhbmNlXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzcGF0dWxhXCIsXG4gICAgXCJuYW1lXCI6IFwiU3BhdHVsYVwiLFxuICAgIFwic3RhdFwiOiBcIkl0IG11c3QgZG8gc29tZXRoaW5nLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJiZi1zd29yZFwiLFxuICAgIFwibmFtZVwiOiBcIkIuRi4gU3dvcmRcIixcbiAgICBcInN0YXRcIjogXCIrQEFEKjEwMEAlIEF0dGFjayBEYW1hZ2VcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImdpYW50cy1iZWx0XCIsXG4gICAgXCJuYW1lXCI6IFwiR2lhbnQncyBCZWx0XCIsXG4gICAgXCJzdGF0XCI6IFwiK0BIZWFsdGhAIEhlYWx0aFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIixcbiAgICBcIm5hbWVcIjogXCJOZWVkbGVzc2x5IExhcmdlIFJvZFwiLFxuICAgIFwic3RhdFwiOiBcIitAQVBAIEFiaWxpdHkgUG93ZXJcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImZyeWluZy1wYW5cIixcbiAgICBcIm5hbWVcIjogXCJGcnlpbmcgUGFuXCIsXG4gICAgXCJzdGF0XCI6IFwiLi4ud2h5IGVsc2Ugd291bGQgaXQgYmUgaGVyZT9cIlxuICB9XG5dO1xuXG5leHBvcnQgY29uc3QgaXRlbXM6IEl0ZW1bXSA9IFtcbiAge1xuICAgIFwiaWRcIjogXCJyYWJhZG9ucy1kZWF0aGNhcFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX1JhYmFkb25zRGVhdGhjYXBcIixcbiAgICBcIm5hbWVcIjogXCJSYWJhZG9uJ3MgRGVhdGhjYXBcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJuZWVkbGVzc2x5LWxhcmdlLXJvZFwiLFxuICAgICAgXCJuZWVkbGVzc2x5LWxhcmdlLXJvZFwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiVGhpcyBodW1ibGUgaGF0IGNhbiBoZWxwIHlvdSBtYWtlLCBvciB1bm1ha2UsIHRoZSB3b3JsZCBpdHNlbGYuQFRGVFVuaXRQcm9wZXJ0eS46VEZUX0F1Z21lbnRfRGVhZGxpZXJDYXBzX1RSQUtleUBcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9SYWJhZG9uc0RlYXRoY2FwLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImFydGlmYWN0LWl0ZW1cIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19NYXJrZXRPZmZlcmluZ19EZWxheWVkUmFuZG9tQXJ0aWZhY3RcIixcbiAgICBcIm5hbWVcIjogXCJBcnRpZmFjdCBJdGVtXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkFmdGVyIEBEZWxheUAgcm91bmRzLCBnYWluIGEgcmFuZG9tIEFydGlmYWN0LlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9QYWlycy9Eb3VibGVVcF9Bc3Npc3RBcm1vcnlfUmFuZG9tSXRlbV9Pcm5uLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidG9tZS1vZi10cmFpdHNcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19NYXJrZXRPZmZlcmluZ19Ub21lT2ZUcmFpdHNcIixcbiAgICBcIm5hbWVcIjogXCJUb21lIG9mIFRyYWl0c1wiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcbiAgICBcInN0YXRzXCI6IFwiRHJhZyB0aGlzIFRvbWUgdG8gdGhlIFNob3AgdG8gb3BlbiBhbiBBcm1vcnkgZnVsbCBvZiBlbWJsZW1zISBZb3Ugd2lsbCBoYXZlIDMwIHNlY29uZHMgdG8gY2hvb3NlLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9DaGFyYWN0ZXJzL1RGVDVfRW1ibGVtQXJtb3J5S2V5L0hVRC9URlQ1X0VtYmxlbUFybW9yeUtleV9TcXVhcmUudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJnb2QtYXJ0aWZhY3QtYW52aWxcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19NYXJrZXRPZmZlcmluZ19BcnRpZmFjdEFudmlsXCIsXG4gICAgXCJuYW1lXCI6IFwiR29kIEFydGlmYWN0IEFudmlsXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkRyYWcgdGhpcyB0byB0aGUgU2hvcCB0byBvcGVuIGFuIEFybW9yeSBmdWxsIG9mIEdvZCBBcnRpZmFjdCBpdGVtcyEgWW91IHdpbGwgaGF2ZSAzMCBzZWNvbmRzIHRvIGNob29zZS5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvQ2hhcmFjdGVycy9URlRfQXJtb3J5S2V5T3Jubi9IVUQvVEZUX0FybW9yeUtleU9ybm5fU3F1YXJlLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFuZG9tLWVtYmxlbVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X01hcmtldE9mZmVyaW5nX1JhbmRvbUVtYmxlbVwiLFxuICAgIFwibmFtZVwiOiBcIlJhbmRvbSBFbWJsZW1cIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiZW1ibGVtXCIsXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gYSByYW5kb20gRW1ibGVtLiBMb3NlIEBIZWFsdGhMb3NzQCBUYWN0aWNpYW4gaGVhbHRoLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0Nhcm91c2VsTWFya2V0X1NhY3JpZmljZS5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJtYWx3YXJlLW1hdHJpeFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fUHN5T3BzX0NoZW1pY2FsQ2FwYWNpdG9yTW9kX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJNYWx3YXJlIE1hdHJpeFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkRlYWxpbmcgcGh5c2ljYWwgZGFtYWdlIHRvIGFuIGVuZW15IHJlZHVjZXMgdGhlIHRhcmdldCdzIEFybW9yIGJ5IEBSZXNpc3RSZWR1Y2VALiAoQWJpbGl0eSBEYW1hZ2UgQ29vbGRvd246IEBDb29sZG93bkAgc2Vjb25kcylBdCAoNCk6IElmIHRoZSBob2xkZXIgaXMgUHNpb25pYywgZXZlcnkgQE51bUF0dGFja3NAcmQgYXR0YWNrIGNsZWF2ZXMsIGRlYWxpbmcgQENsZWF2ZURhbWFnZUAmbmJzcDsoKSBwaHlzaWNhbCBkYW1hZ2UgdG8gbmVhcmJ5IGVuZW1pZXMuUmVjb21tZW5kZWQgdXNlcnM6IE1hc3RlciBZaSBhbmQgUHlrZS5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxN19Qc3lPcHNfTW9kX0NoZW1pY2FsQ2FwYWNpdG9yTW9kLlRGVF9TZXQxNy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImRyb25lLXVwbGlua1wiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fUHN5T3BzX0Ryb25lTW9kX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJEcm9uZSBVcGxpbmtcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJBIGRyb25lIHJlcGVhdHMgQERhbWFnZVJlcGVhdEAlIG9mIGRhbWFnZSBmcm9tIHRoZSBob2xkZXIncyBhdHRhY2tzIGFuZCBBYmlsaXRpZXMgdG8gdGhlIHNhbWUgdGFyZ2V0cyBldmVyeSBASW50ZXJ2YWxAIHNlY29uZHMuQXQgKDQpOiBJZiB0aGUgaG9sZGVyIGlzIFBzaW9uaWMsIGdhaW4gYW4gYWRkaXRpb25hbCBtaW5pLWRyb25lIHRoYXQgcmVwZWF0cyBAU2Vjb25kRHJvbmVEYW1hZ2VSZXBlYXQqMTAwQCUgb2YgZGFtYWdlLlJlY29tbWVuZGVkIHVzZXJzOiBTb25hIGFuZCBWaWt0b3IuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTdfUHN5T3BzX01vZF9Ecm9uZU1vZC5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzZW1pY29uZHVjdG9yXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9Qc3lPcHNfU2VtaWNvbmR1Y3Rvck1vZF9SYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwiU2VtaWNvbmR1Y3RvclwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkV2ZXJ5IEBBdHRhY2tzVG9MYXVuY2hAIGF0dGFja3MgYW5kIGV2ZXJ5IEBBdHRhY2tzVG9SZWNlaXZlQCB0aW1lcyBiZWluZyBhdHRhY2tlZCwgemFwIHRoZSBATnVtRW5lbWllc0AgbmVhcmVzdCBlbmVtaWVzLCBkZWFsaW5nIEBQY3RIZWFsdGhEYW1hZ2UqMTAwQCUgb2YgZW5lbXkgSGVhbHRoIGFzIG1hZ2ljIGRhbWFnZS5SZWNvbW1lbmRlZCB1c2VyczogR3JhZ2FzIGFuZCBNYXN0ZXIgWWkuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTdfUHN5T3BzX01vZF9TZW1pY29uZHVjdG9yTW9kLlRGVF9TZXQxNy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRhcmdldC1sb2NrLW9wdGljc1wiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fUHN5T3BzX1RhcmdldGxvY2tNb2RfUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlRhcmdldC1Mb2NrIE9wdGljc1wiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIncyBmaXJzdCBhdHRhY2sgb24gZWFjaCBlbmVteSBkZWFscyBAQXR0YWNrUGN0QCZuYnNwOygpIGFkZGl0aW9uYWwgZGFtYWdlLkF0ICg0KTogSWYgdGhlIGhvbGRlciBpcyBQc2lvbmljLCB0aGV5IGhlYWwgQEhlYWxQY3QqMTAwQCUgb2YgdGhlaXIgbWF4IEhlYWx0aCB3aGVuZXZlciB0aGVpciB0YXJnZXQgZGllcy5SZWNvbW1lbmRlZCB1c2VyczogUHlrZSBhbmQgTWFzdGVyIFlpXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTdfUHN5T3BzX01vZF9UYXJnZXRMb2NrTW9kLlRGVF9TZXQxNy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImJpb21hdHRlci1wcmVzZXJ2ZXJcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX1BzeU9wc19HcmVuYWRlTW9kX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJCaW9tYXR0ZXIgUHJlc2VydmVyXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBAUGN0TWF4SFAqMTAwJUAlIG1heCBIZWFsdGggYW5kIGRlcGxveSBATnVtR3JlbmFkZXNAIExpZmUgT3Jicy4gRXZlcnkgQEludGVydmFsQCBzZWNvbmRzIG9mIGNvbWJhdCwgb25lIGRyb3BzIHJlc3RvcmluZyBASGVhbFBjdCoxMDBAJSBvZiB0aGUgaG9sZGVyJ3MgbWlzc2luZyBIZWFsdGguQXQgKDQpOiBJZiB0aGUgaG9sZGVyIGlzIFBzaW9uaWMsIHRoZXkgZ2FpbiBASW5jcmVhc2VkSGVhbGluZyoxMDBAJSBpbmNyZWFzZWQgaGVhbGluZyBmcm9tIGFsbCBzb3VyY2VzLlJlY29tbWVuZGVkIHVzZXI6IEdyYWdhcy5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxN19Qc3lPcHNfTW9kX0dyZW5hZGVNb2QuVEZUX1NldDE3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic3ltcGF0aGV0aWMtaW1wbGFudFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fUHN5T3BzX1N5bXBhdGhldGljSW1wbGFudE1vZF9SYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwiU3ltcGF0aGV0aWMgSW1wbGFudFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkV2ZXJ5IEBJbnRlcnZhbEAgc2Vjb25kcywgZ2FpbiBATWFuYVJlZ2VuT3ZlclRpbWVAIGFkZGl0aW9uYWwgTWFuYSBQZXIgU2Vjb25kLiBBdCAoNCk6IElmIHRoZSBob2xkZXIgaXMgUHNpb25pYywgdGhlaXIgYWJpbGl0aWVzIGRlYWwgQFRydWVEYW1hZ2VDb252ZXJzaW9uKjEwMEAlIG9mIHRoZWlyIGFiaWxpdHkgZGFtYWdlIGFzIHRydWUgZGFtYWdlIGluc3RlYWQuUmVjb21tZW5kZWQgdXNlcnM6IFNvbmEgYW5kIFZpa3Rvci5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxN19Qc3lPcHNfTW9kX1N5bXBhdGhldGljSW1wbGFudE1vZC5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ6ZWtlcy1ibGVhay1oZXJhbGRcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0FydGlmYWN0X1pla2VzSGVyYWxkU2hhZG93XCIsXG4gICAgXCJuYW1lXCI6IFwiWmVrZSdzIEJsZWFrIEhlcmFsZFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJXaGVuIGNvbWJhdCBiZWdpbnMsIHRoZSBob2xkZXIgcmVkdWNlcyB0aGUgQXR0YWNrIFNwZWVkIG9mIGFsbCBhbGxpZXMgd2l0aGluIEBIZXhSYW5nZUAgaGV4ZXMgaW4gdGhlIHNhbWUgcm93IGJ5ICBAQXR0YWNrU3BlZWRSZWR1Y3Rpb25AJS4gVGhlIGhvbGRlciB0aGVuIGdhaW5zICBAQXR0YWNrU3BlZWRAJSBBdHRhY2sgU3BlZWQgZm9yIGVhY2ggYWZmZWN0ZWQgYWxseS5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvU2hhZG93L1NfWmVrZXNfSGVyYWxkLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwib3JublwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDExX0NoYW1waW9uSXRlbV9Pcm5uXCIsXG4gICAgXCJuYW1lXCI6IFwiT3JublwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJPcm5uXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL1VYL1RGVC9DaGFtcGlvblNwbGFzaGVzL1RGVDExX09ybm5fU3F1YXJlLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic29sYXItZWNsaXBzZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0FuaW1hU3F1YWRJdGVtX1RpZXIzX1JhZGlhbnRGaWVsZFwiLFxuICAgIFwibmFtZVwiOiBcIlNvbGFyIEVjbGlwc2VcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJHYWluIEBIZWFsdGhQZXJjZW50KjEwMEAlIG1heCBIZWFsdGguIEV2ZXJ5IHNlY29uZCwgZGVhbCBtYWdpYyBkYW1hZ2UgaW4gYSBASGV4UmFkaXVzQmFzZUAmbmJzcDtoZXggcmFkaXVzIGVxdWFsIHRvIEBIZWFsdGhSYXRpbyoxMDBAJSBvZiB0aGUgaG9sZGVyJ3MgbWF4IEhlYWx0aCwgYW5kIGdhaW4gbWF4IEhlYWx0aCBlcXVhbCB0byBARGFtYWdlVG9IZWFsdGhDb252ZXJzaW9uKjEwMEAlIG9mIGRhbWFnZSBkZWFsdC4gUmFkaXVzIGluY3JlYXNlcyBldmVyeSBAUGVyaW9kQCBzZWNvbmRzLlJlY29tbWVuZGVkIFJvbGVzOiBBdHRhY2sgb3IgTWFnaWMgVGFua1wiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0FuaW1hU3F1YWRJdGVtX1JhZGlhbnRGaWVsZF9UMy5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYWRpYW50LWZpZWxkXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfQW5pbWFTcXVhZEl0ZW1fVGllcjJfUmFkaWFudEZpZWxkXCIsXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBGaWVsZFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQEhlYWx0aFBlcmNlbnQqMTAwQCUgbWF4IGhlYWx0aC4gRXZlcnkgc2Vjb25kLCBkZWFsIG1hZ2ljIGRhbWFnZSBpbiBhIEBIZXhSYWRpdXNCYXNlQC1oZXggcmFkaXVzIGVxdWFsIHRvIEBIZWFsdGhSYXRpbyoxMDBAJSBvZiB0aGUgaG9sZGVyJ3MgbWF4IEhlYWx0aC4gUmFkaXVzIGluY3JlYXNlcyBldmVyeSBAUGVyaW9kQCBzZWNvbmRzLlJlY29tbWVuZGVkIFJvbGVzOiBBdHRhY2sgb3IgTWFnaWMgVGFua1wiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0FuaW1hU3F1YWRJdGVtX1JhZGlhbnRGaWVsZF9UMi5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJvcGVuLWFuLWFydGlmYWN0LWFybW9yeVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDExX0VuY291bnRlcl9DaG9pY2VJdGVtX0FydGlmYWN0QXJtb3J5XCIsXG4gICAgXCJuYW1lXCI6IFwiT3BlbiBhbiBBcnRpZmFjdCBBcm1vcnkuXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy9DaG9pY2VVSS9BRE1JTl9Bcm1vcmVyeV9JY29uLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic3BlbmQtMjItZ29sZC1nYWluLWFuLWFydGlmYWN0LWFudmlsXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTFfRW5jb3VudGVyX0Nob2ljZUl0ZW1fQnV5RXhwZW5zaXZlQXJ0aWZhY3RcIixcbiAgICBcIm5hbWVcIjogXCJTcGVuZCAyMiBnb2xkLiBHYWluIGFuIEFydGlmYWN0IGFudmlsLlwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvQ2hvaWNlVUkvQURNSU5fQXJtb3JlcnlfSWNvbi50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1lc2V0NWNhdmFsaWVycmFkaWFudHNwYXRcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fQ2F2YWxpZXJTcGF0dWxhSXRlbV9SYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9TZXQ1Q2F2YWxpZXJfUmFkaWFudFNwYXRcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJURlQ1X0l0ZW1fQ2hhaW5WZXN0U2hhZG93XCIsXG4gICAgICBcIlRGVDVfSXRlbV9TcGF0dWxhUmFkaWFudFwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX1NldDVDYXZhbGllcl9SYWRpYW50U3BhdFwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L0NhdmFsaWVyX1JhZGlhbnQudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZXNldDVuaWdodGJyaW5nZXJyYWRpYW50c3BhdFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9OaWdodGJyaW5nZXJTcGF0dWxhSXRlbV9SYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9TZXQ1TmlnaHRicmluZ2VyX1JhZGlhbnRTcGF0XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiVEZUNV9JdGVtX1NwYXR1bGFSYWRpYW50XCIsXG4gICAgICBcIlRGVDVfSXRlbV9HaWFudHNCZWx0U2hhZG93XCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fU2V0NU5pZ2h0YnJpbmdlcl9SYWRpYW50U3BhdFwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L05pZ2h0YnJpbmdlcl9SYWRpYW50LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVzZXQ1YWJvbWluYXRpb25yYWRpYW50c3BhdFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9BYm9taW5hdGlvblNwYXR1bGFJdGVtX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJ0ZnRfaXRlbV9uYW1lX1NldDVBYm9taW5hdGlvbl9SYWRpYW50U3BhdFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcIlRGVDVfSXRlbV9TcGFycmluZ0dsb3Zlc1NoYWRvd1wiLFxuICAgICAgXCJURlQ1X0l0ZW1fU3BhdHVsYVJhZGlhbnRcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9TZXQ1QWJvbWluYXRpb25fUmFkaWFudFNwYXRcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0NS9BYm9taW5hdGlvbl9SYWRpYW50LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVzZXQ1c3BlbGx3ZWF2ZXJyYWRpYW50c3BhdFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9TcGVsbHdlYXZlclNwYXR1bGFJdGVtX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJ0ZnRfaXRlbV9uYW1lX1NldDVTcGVsbHdlYXZlcl9SYWRpYW50U3BhdFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcIm5lZWRsZXNzbHktbGFyZ2Utcm9kXCIsXG4gICAgICBcIlRGVDVfSXRlbV9TcGF0dWxhUmFkaWFudFwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX1NldDVTcGVsbHdlYXZlcl9SYWRpYW50U3BhdFwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L1NwZWxsd2VhdmVyX1JhZGlhbnQudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZXNldDVza2lybWlzaGVycmFkaWFudHNwYXRcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fU2tpcm1pc2hlclNwYXR1bGFJdGVtX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJ0ZnRfaXRlbV9uYW1lX1NldDVTa2lybWlzaGVyX1JhZGlhbnRTcGF0XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiVEZUNV9JdGVtX1NwYXR1bGFSYWRpYW50XCIsXG4gICAgICBcImJmLXN3b3JkXCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fU2V0NVNraXJtaXNoZXJfUmFkaWFudFNwYXRcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0NS9Ta2lybWlzaGVyX1JhZGlhbnQudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZXNldDVkYXduYnJpbmdlcnJhZGlhbnRzcGF0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0Rhd25icmluZ2VyU3BhdHVsYUl0ZW1fUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfU2V0NURhd25icmluZ2VyX1JhZGlhbnRTcGF0XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiZ2lhbnRzLWJlbHRcIixcbiAgICAgIFwiVEZUNV9JdGVtX1NwYXR1bGFSYWRpYW50XCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fU2V0NURhd25icmluZ2VyX1JhZGlhbnRTcGF0XCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDUvRGF3bmJyaW5nZXJfUmFkaWFudC50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1lc2V0NWFzc2Fzc2lucmFkaWFudHNwYXRcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fQXNzYXNzaW5TcGF0dWxhSXRlbV9SYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9TZXQ1QXNzYXNzaW5fUmFkaWFudFNwYXRcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJzcGFycmluZy1nbG92ZXNcIixcbiAgICAgIFwiVEZUNV9JdGVtX1NwYXR1bGFSYWRpYW50XCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fU2V0NUFzc2Fzc2luX1JhZGlhbnRTcGF0XCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDUvQXNzYXNzaW5fUmFkaWFudC50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1lc2V0NWNvdmVucmFkaWFudHNwYXRcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fQ292ZW5TcGF0dWxhSXRlbV9SYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9TZXQ1Q292ZW5fUmFkaWFudFNwYXRcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJURlQ1X0l0ZW1fVGVhck9mVGhlR29kZGVzc1NoYWRvd1wiLFxuICAgICAgXCJURlQ1X0l0ZW1fU3BhdHVsYVJhZGlhbnRcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9TZXQ1Q292ZW5fUmFkaWFudFNwYXRcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0NS9Db3Zlbl9SYWRpYW50LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVzZXQ1cmVkZWVtZWRyYWRpYW50c3BhdFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9SZWRlZW1lZFNwYXR1bGFJdGVtX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJ0ZnRfaXRlbV9uYW1lX1NldDVSZWRlZW1lZF9SYWRpYW50U3BhdFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcIm5lZ2F0cm9uLWNsb2FrXCIsXG4gICAgICBcIlRGVDVfSXRlbV9TcGF0dWxhUmFkaWFudFwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX1NldDVSZWRlZW1lZF9SYWRpYW50U3BhdFwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L1JlZGVlbWVkX1JhZGlhbnQudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZXNldDVoZWxsaW9ucmFkaWFudHNwYXRcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fSGVsbGlvblNwYXR1bGFJdGVtX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJ0ZnRfaXRlbV9uYW1lX1NldDVIZWxsaW9uX1JhZGlhbnRTcGF0XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiVEZUNV9JdGVtX1JlY3VydmVCb3dTaGFkb3dcIixcbiAgICAgIFwiVEZUNV9JdGVtX1NwYXR1bGFSYWRpYW50XCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fU2V0NUhlbGxpb25fUmFkaWFudFNwYXRcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0NS9IZWxsaW9uX1JhZGlhbnQudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZXNldDVmb3Jnb3R0ZW5yYWRpYW50c3BhdFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9Gb3Jnb3R0ZW5TcGF0dWxhSXRlbV9SYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9TZXQ1Rm9yZ290dGVuX1JhZGlhbnRTcGF0XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiVEZUNV9JdGVtX1NwYXR1bGFSYWRpYW50XCIsXG4gICAgICBcIlRGVDVfSXRlbV9CRlN3b3JkU2hhZG93XCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fU2V0NUZvcmdvdHRlbl9SYWRpYW50U3BhdFwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L0ZvcmdvdHRlbl9SYWRpYW50LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVzZXQ1cmVuZXdlcnJhZGlhbnRzcGF0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1JlbmV3ZXJTcGF0dWxhSXRlbV9SYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9TZXQ1UmVuZXdlcl9SYWRpYW50U3BhdFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcIlRGVDVfSXRlbV9TcGF0dWxhUmFkaWFudFwiLFxuICAgICAgXCJ0ZWFyLW9mLWdvZGRlc3NcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9TZXQ1UmVuZXdlcl9SYWRpYW50U3BhdFwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L1JlbmV3ZXJfUmFkaWFudC50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1lc2V0NXJldmVuYW50cmFkaWFudHNwYXRcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fUmV2ZW5hbnRTcGF0dWxhSXRlbV9SYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9TZXQ1UmV2ZW5hbnRfUmFkaWFudFNwYXRcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJURlQ1X0l0ZW1fTmVnYXRyb25DbG9ha1NoYWRvd1wiLFxuICAgICAgXCJURlQ1X0l0ZW1fU3BhdHVsYVJhZGlhbnRcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9TZXQ1UmV2ZW5hbnRfUmFkaWFudFNwYXRcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0NS9SZXZlbmFudF9SYWRpYW50LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVzZXQ1bGVnaW9ubmFpcmVyYWRpYW50c3BhdFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9MZWdpb25uYWlyZVNwYXR1bGFJdGVtX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJ0ZnRfaXRlbV9uYW1lX1NldDVMZWdpb25uYWlyZV9SYWRpYW50U3BhdFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcInJlY3VydmUtYm93XCIsXG4gICAgICBcIlRGVDVfSXRlbV9TcGF0dWxhUmFkaWFudFwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX1NldDVMZWdpb25uYWlyZV9SYWRpYW50U3BhdFwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L0xlZ2lvbm5haXJlX1JhZGlhbnQudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZXNldDVpcm9uY2xhZHJhZGlhbnRzcGF0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0lyb25jbGFkU3BhdHVsYUl0ZW1fUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfU2V0NUlyb25jbGFkX1JhZGlhbnRTcGF0XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiY2hhaW4tdmVzdFwiLFxuICAgICAgXCJURlQ1X0l0ZW1fU3BhdHVsYVJhZGlhbnRcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9TZXQ1SXJvbmNsYWRfUmFkaWFudFNwYXRcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0NS9Jcm9uY2xhZF9SYWRpYW50LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaW5maW5pdHktZWRnZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0luZmluaXR5RWRnZVwiLFxuICAgIFwibmFtZVwiOiBcIkluZmluaXR5IEVkZ2VcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJiZi1zd29yZFwiLFxuICAgICAgXCJzcGFycmluZy1nbG92ZXNcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gUHJlY2lzaW9uLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0luZmluaXR5RWRnZS5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYWRpYW50LWRyYWdvbnMtY2xhd1wiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9EcmFnb25zQ2xhd1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IERyYWdvbidzIENsYXdcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJHYWluIEBQZXJjZW50TWF4SFAqMTAwQCUgbWF4IGhlYWx0aC5FdmVyeSBASGVhbHRoUmVnZW5JbnRlcnZhbEAgc2Vjb25kcywgaGVhbCBAUGVyY2VudEhlYWx0aERhbWFnZUAlIG1heCBIZWFsdGguXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0RyYWdvbnNDbGF3UmFkaWFudC5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYWRpYW50LXN0cmlrZXJzLWZsYWlsXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1RyYXBDbGF3UmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgU3RyaWtlcidzIEZsYWlsXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiQ3JpdGljYWwgU3RyaWtlcyBncmFudCBAQnVmZkRhbWFnZUFtcCoxMDBAJSBEYW1hZ2UgQW1wIGZvciBARHVyYXRpb25AIHNlY29uZHMsIHN0YWNraW5nIHVwIHRvIEBNYXhTdGFja3NAIHRpbWVzLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9UcmFwQ2xhd1JhZGlhbnQuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1pb25pYy1zcGFya1wiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9Jb25pY1NwYXJrUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgSW9uaWMgU3BhcmtcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJATVJTaHJlZEAlIFNocmVkIGVuZW1pZXMgd2l0aGluIEBIZXhSYW5nZUAgaGV4ZXMuIFdoZW4gZW5lbWllcyBjYXN0IGFuIEFiaWxpdHksIGRlYWwgbWFnaWMgZGFtYWdlIGVxdWFsIHRvIEBNYW5hUmF0aW9AJSBvZiB0aGUgTWFuYSBzcGVudC5bRGlyZWN0IGRhbWFnZSBpdGVtXVNocmVkOiBSZWR1Y2UgTWFnaWMgUmVzaXN0XCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0lvbmljU3BhcmtSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtcXVpY2tzaWx2ZXJcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fUXVpY2tzaWx2ZXJSYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBRdWlja3NpbHZlclwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBTdGFydDogR2FpbiBpbW11bml0eSB0byBjcm93ZCBjb250cm9sIGZvciBAU3BlbGxTaGllbGREdXJhdGlvbkAgc2Vjb25kcy5HYWluIEBQcm9jQXR0YWNrU3BlZWQqMTAwQCUgc3RhY2tpbmcgQXR0YWNrIFNwZWVkIGV2ZXJ5IHNlY29uZC5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fUXVpY2tzaWx2ZXJSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtaGV4dGVjaC1ndW5ibGFkZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9IZXh0ZWNoR3VuYmxhZGVSYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBIZXh0ZWNoIEd1bmJsYWRlXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiSGVhbCB0aGUgbG93ZXN0IHBlcmNlbnQgSGVhbHRoIGFsbHkgZm9yIEBBbGx5SGVhbGluZyoxMDBAJSBvZiBkYW1hZ2UgZGVhbHQuQWxseSBIZWFsaW5nOiBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUX1RyYWNrZXJfVmFsdWUxQFwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9IZXh0ZWNoR3VuYmxhZGVSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtdm9pZC1zdGFmZlwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9TdGF0aWtrU2hpdlJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IFZvaWQgU3RhZmZcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJEYW1hZ2UgZnJvbSBhdHRhY2tzIGFuZCBBYmlsaXRpZXMgQE1SU2hyZWRAJSBTaHJlZCB0aGUgdGFyZ2V0IGZvciB0aGUgcmVzdCBvZiBjb21iYXQuIFRoaXMgZWZmZWN0IGRvZXMgbm90IHN0YWNrLlNocmVkOiBSZWR1Y2UgTWFnaWMgUmVzaXN0XCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX1ZvaWRTdGFmZlJhZGlhbnQuVEZUX1NldDE3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1wcm90ZWN0b3JzLXZvd1wiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9Gcm96ZW5IZWFydFJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IFByb3RlY3RvcidzIFZvd1wiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBTdGFydDogR2FpbiBAQ29tYmF0U3RhcnRNYW5hQCBNYW5hLkF0IEBIZWFsdGhUaHJlc2hvbGRAJSBIZWFsdGgsIGdhaW4gQFRyaWdnZXJNYW5hQCBNYW5hIGFuZCBhIFNoaWVsZCBlcXVhbCB0byBAU2hpZWxkSGVhbHRoUGVyY2VudEAlIG1heCBIZWFsdGguXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0Zyb3plbkhlYXJ0UmFkaWFudC5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYWRpYW50LWJsdWUtYnVmZlwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9CbHVlQnVmZlJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IEJsdWUgQnVmZlwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQE1vZGlmaWVkQURBUCoxMDBAJSBhZGRpdGlvbmFsIEF0dGFjayBEYW1hZ2UgYW5kIEFiaWxpdHkgUG93ZXIgZnJvbSBhbGwgc291cmNlcy5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fQmx1ZUJ1ZmZSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtYXJjaGFuZ2Vscy1zdGFmZlwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9BcmNoYW5nZWxzU3RhZmZSYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBBcmNoYW5nZWwncyBTdGFmZlwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBzdGFydDogR2FpbiBAQVBQZXJJbnRlcnZhbEAlIEFiaWxpdHkgUG93ZXIgZXZlcnkgQEludGVydmFsU2Vjb25kc0Agc2Vjb25kcyBpbiBjb21iYXQuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0FyY2hhbmdlbHNTdGFmZlJhZGlhbnQuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1tb3JlbGxvbm9taWNvblwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9Nb3JlbGxvbm9taWNvblJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IE1vcmVsbG9ub21pY29uXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiQXR0YWNrcyBhbmQgQWJpbGl0aWVzIGRlYWwgQEJ1cm5QZXJjZW50QCUgQnVybiBhbmQgQEdyaWV2b3VzV291bmRzUGVyY2VudEAlIFdvdW5kIHRvIGVuZW1pZXMgZm9yIEBCdXJuRHVyYXRpb25AIHNlY29uZHMuQnVybjogRGVhbHMgYSBwZXJjZW50IG9mIHRoZSB0YXJnZXQncyBtYXggSGVhbHRoIGFzIHRydWUgZGFtYWdlIGV2ZXJ5IHNlY29uZFdvdW5kOiBSZWR1Y2VzIGhlYWxpbmcgcmVjZWl2ZWRcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fTW9yZWxsb25vbWljb25SYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtYnJhbWJsZS12ZXN0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0JyYW1ibGVWZXN0UmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgQnJhbWJsZSBWZXN0XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBAUGVyY2VudE1heEhQKjEwMEAlIG1heCBoZWFsdGguVGFrZSBAQXV0b0RhbWFnZVJlZHVjdGlvbioxMDBAJSByZWR1Y2VkIGRhbWFnZSBmcm9tIGF0dGFja3MuIFdoZW4gc3RydWNrIGJ5IGFueSBhdHRhY2ssIGRlYWwgQDFTdGFyQW9FRGFtYWdlQCBtYWdpYyBkYW1hZ2UgdG8gYWxsIGFkamFjZW50IGVuZW1pZXMuQ29vbGRvd246IEBJQ0RAIHNlY29uZHNcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fQnJhbWJsZVZlc3RSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInp6cm90LXBvcnRhbFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9aelJvdFBvcnRhbFJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJaeidSb3QgUG9ydGFsXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiU3VtbW9uIGEgbGFyZ2UgVm9pZHNwYXduLiBJdHMgc3RyZW5ndGggaW5jcmVhc2VzIHdpdGggZWFjaCBTdGFnZS7igIvigItbU3VwcG9ydCBpdGVtXVtVbmlxdWUgLSBvbmx5IDEgcGVyIGNoYW1waW9uXVwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9aelJvdFBvcnRhbFJhZGlhbnQuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic2hyb3VkLW9mLXJldmVyZW5jZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9TaHJvdWRPZlN0aWxsbmVzc1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJTaHJvdWQgb2YgUmV2ZXJlbmNlXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IHN0YXJ0OiBTaG9vdCBhIHdpZGVyIGJlYW0gdGhhdCBAQ29zdEluY3JlYXNlQCUgTWFuYSBSZWF2ZXMgZW5lbWllcy5Zb3VyIHRlYW0gZ2FpbnMgIEBBbGx5Qm9udXNNYW5hQCBzdGFydGluZyBNYW5hLltVbmlxdWUgLSBvbmx5IDEgcGVyIGNoYW1waW9uXU1hbmEgUmVhdmU6IGluY3JlYXNlIG1heGltdW0gTWFuYSB1bnRpbCB0aGUgbmV4dCBjYXN0XCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1JhZGlhbnQvU2hyb3VkX29mX1N0aWxsbmVzc19SYWRpYW50LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1rcmFrZW5zLWZ1cnlcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fUnVuYWFuc0h1cnJpY2FuZVJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IEtyYWtlbidzIEZ1cnlcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJBdHRhY2tzIGdyYW50IEBBRE9uQXR0YWNrKjEwMEAlIHN0YWNraW5nIEF0dGFjayBEYW1hZ2UsIHVwIHRvIEBNYXhTdGFja3NAIGF0dGFja3MuIEFmdGVyIEBNYXhTdGFja3NAIGF0dGFja3MsIGdhaW4gQEFTQ2Fwc3RvbmUqMTAwQCUgQXR0YWNrIFNwZWVkLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0tyYWtlblNsYXllclJhZGlhbnQuVEZUX1RGVDE0XzUudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJtaXN0cmFsXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1plcGh5clJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJNaXN0cmFsXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IHN0YXJ0OiBTdW1tb24gYSB3aGlybHdpbmQgb24gdGhlIG9wcG9zaXRlIHNpZGUgb2YgdGhlIGFyZW5hIHRoYXQgcmVtb3ZlcyB0aGUgY2xvc2VzdCBlbmVteSBmcm9tIGNvbWJhdCBmb3IgQEJhbmlzaER1cmF0aW9uQCBzZWNvbmRzLllvdXIgdGVhbSBnYWlucyAgQEFsbHlCb251c0FTQCUgQXR0YWNrIFNwZWVkLltJZ25vcmVzIGNyb3dkIGNvbnRyb2wgaW1tdW5pdHkuXVtVbmlxdWUgLSBvbmx5IDEgcGVyIGNoYW1waW9uXVwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9SYWRpYW50L1plcGh5cl9SYWRpYW50LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1ndWluc29vcy1yYWdlYmxhZGVcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fR3VpbnNvb3NSYWdlYmxhZGVSYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBHdWluc29vJ3MgUmFnZWJsYWRlXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBAQXR0YWNrU3BlZWRQZXJTdGFja0AlIHN0YWNraW5nIEF0dGFjayBTcGVlZCBldmVyeSBzZWNvbmQuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0d1aW5zb29zUmFnZWJsYWRlUmFkaWFudC5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYWRpYW50LWhhbmQtb2YtanVzdGljZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9IYW5kT2ZKdXN0aWNlUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgSGFuZCBvZiBKdXN0aWNlXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiAyIGVmZmVjdHM6QEFEX05vdFN0YXRCYXIqMTAwQCUgQXR0YWNrIERhbWFnZSBhbmQgQEFQX05vdFN0YXRCYXJAJSBBYmlsaXR5IFBvd2VyLkBTdGF0T21uaXZhbXBfTm90U3RhdEJhcioxMDBAJSBPbW5pdmFtcC5XaGlsZSBhYm92ZSBASGVhbHRoVGhyZXNob2xkKjEwMEAlIGhlYWx0aCwgZG91YmxlIHRoZSBBdHRhY2sgRGFtYWdlIGFuZCBBYmlsaXR5IFBvd2VyLiBXaGlsZSBiZWxvdyBASGVhbHRoVGhyZXNob2xkKjEwMEAlIEhlYWx0aCwgZG91YmxlIHRoZSBPbW5pdmFtcC5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fSGFuZE9mSnVzdGljZVJhZGlhbnQuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1zdW5maXJlLWNhcGVcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fU3VuZmlyZUNhcGVSYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBTdW5maXJlIENhcGVcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJHYWluIEBCb251c1BlcmNlbnRIUCoxMDBAJSBtYXggSGVhbHRoLkV2ZXJ5IEBJQ0RAIHNlY29uZHMsIGRlYWwgQEJ1cm5QZXJjZW50QCUgQnVybiBhbmQgQEdyaWV2b3VzV291bmRzUGVyY2VudEAlIFdvdW5kIHRvIGFuIGVuZW15IHdpdGhpbiBASGV4UmFuZ2VAIGhleGVzIGZvciBAQnVybkR1cmF0aW9uQCBzZWNvbmRzLkJ1cm46IERlYWxzIGEgcGVyY2VudCBvZiB0aGUgdGFyZ2V0J3MgbWF4IEhlYWx0aCBhcyB0cnVlIGRhbWFnZSBldmVyeSBzZWNvbmRXb3VuZDogcmVkdWNlcyBoZWFsaW5nIHJlY2VpdmVkXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX1N1bmZpcmVDYXBlUmFkaWFudC5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ6ZWtlcy1oYXJtb255XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1pla2VzSGVyYWxkUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlpla2UncyBIYXJtb255XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IHN0YXJ0OiBHcmFudCAgQEF0dGFja1NwZWVkQCUgQXR0YWNrIFNwZWVkIGFuZCBATGlmZXN0ZWFsQCUgT21uaXZhbXAgdG8gdGhlIGhvbGRlciBhbmQgYWxsaWVzIHdpdGhpbiAxIGhleCBpbiB0aGUgc2FtZSByb3cu4oCL4oCLT21uaXZhbXA6IGhlYWwgZm9yIHNvbWUgb2YgZGFtYWdlIGRlYWx0XCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1JhZGlhbnQvWmVrZXNfSGVyYWxkX1JhZGlhbnQudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYWRpYW50LWxhc3Qtd2hpc3BlclwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9MYXN0V2hpc3BlclJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IExhc3QgV2hpc3BlclwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkRhbWFnZSBmcm9tIGF0dGFja3MgYW5kIEFiaWxpdGllcyBAQXJtb3JSZWR1Y3Rpb25QZXJjZW50QCUgU3VuZGVyIHRoZSB0YXJnZXQgZm9yIHRoZSByZXN0IG9mIGNvbWJhdC4gVGhpcyBlZmZlY3QgZG9lcyBub3Qgc3RhY2suU3VuZGVyOiBSZWR1Y2UgQXJtb3JcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fTGFzdFdoaXNwZXJSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImxvY2tldC1vZi10YXJnb24tcHJpbWVcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fTG9ja2V0T2ZUaGVJcm9uU29sYXJpUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIkxvY2tldCBvZiBUYXJnb24gUHJpbWVcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgc3RhcnQ6IFNoaWVsZHMgdGhlIGhvbGRlciBhbmQgYWxsaWVzIHdpdGhpbiBASGV4UmFuZ2VAIGhleGVzIGluIHRoZSBzYW1lIHJvdyBmb3IgQDFTdGFyU2hpZWxkVmFsdWVAL0AyU3RhclNoaWVsZFZhbHVlQC9AM1N0YXJTaGllbGRWYWx1ZUAgIGRhbWFnZSBmb3IgQFNoaWVsZER1cmF0aW9uQCBzZWNvbmRzLllvdXIgdGVhbSBnYWlucyAgQEJvbnVzQWxseUhlYWx0aEAgSGVhbHRoLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9SYWRpYW50L0xvY2tldF9vZl90aGVfSXJvbl9Tb2xhcmlfUmFkaWFudC50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtdGhpZWZzLWdsb3Zlc1wiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9UaGllZnNHbG92ZXNSYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBUaGllZidzIEdsb3Zlc1wiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkVhY2ggcm91bmQ6IEVxdWlwIDIgcmFuZG9tIFJhZGlhbnQgaXRlbXMuW0NvbnN1bWVzIDMgaXRlbSBzbG90cy5dQFRGVFVuaXRQcm9wZXJ0eS46VEZUX0JpbmRPbkVxdWlwVFJBQFwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9UaGllZnNHbG92ZXNSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtd2FybW9ncy1hcm1vclwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9XYXJtb2dzQXJtb3JSYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBXYXJtb2cncyBBcm1vclwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQEJvbnVzUGVyY2VudEhQKjEwMEAlIG1heCBIZWFsdGguXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX1dhcm1vZ3NBcm1vclJhZGlhbnQuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1zdGVyYWtzLWdhZ2VcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fU3RlcmFrc0dhZ2VSYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBTdGVyYWsncyBHYWdlXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiQXQgQEhlYWx0aFRocmVzaG9sZEAlIEhlYWx0aCwgZ2FpbiBhIFNoaWVsZCBlcXVhbCB0byBAUGVyY2VudEhlYWx0aFNoaWVsZCoxMDBAJSBvZiB0aGUgd2VhcmVyJ3MgbWF4aW11bSBIZWFsdGggdGhhdCByYXBpZGx5IGRlY2F5cyBvdmVyIEBTaGllbGREdXJhdGlvbkAgc2Vjb25kcy5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fU3RlcmFrc0dhZ2VSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtc3Bpcml0LXZpc2FnZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9SZWRlbXB0aW9uUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgU3Bpcml0IFZpc2FnZVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIlJlZ2VuZXJhdGUgQE1pc3NpbmdIZWFsdGhIZWFsKjEwMEAlIG9mIG1pc3NpbmcgSGVhbHRoIGVhY2ggc2Vjb25kLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX1NwaXJpdFZpc2FnZVJSLlRGVF9URlQxNF81LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1lZGdlLW9mLW5pZ2h0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0d1YXJkaWFuQW5nZWxSYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBFZGdlIG9mIE5pZ2h0XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiQXQgQEhlYWx0aFRocmVzaG9sZEAlIEhlYWx0aCwgYnJpZWZseSBiZWNvbWUgdW50YXJnZXRhYmxlLCBzaGVkIG5lZ2F0aXZlIGVmZmVjdHMsIGFuZCBoZWFsIGFsbCBtaXNzaW5nIGhlYWx0aC5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fR3VhcmRpYW5BbmdlbFJhZGlhbnQuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1yZWQtYnVmZlwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9SYXBpZEZpcmVjYW5ub25SYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBSZWQgQnVmZlwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkF0dGFja3MgYW5kIEFiaWxpdGllcyBAQnVyblBlcmNlbnRAJSBCdXJuIGFuZCBASGVhbGluZ1JlZHVjdGlvblBjdEAlIFdvdW5kIGVuZW1pZXMgZm9yIEBEdXJhdGlvbkAgc2Vjb25kcy5CdXJuOiBEZWFscyBhIHBlcmNlbnQgb2YgdGhlIHRhcmdldCdzIG1heCBIZWFsdGggYXMgdHJ1ZSBkYW1hZ2UgZXZlcnkgc2Vjb25kV291bmQ6IFJlZHVjZXMgaGVhbGluZyByZWNlaXZlZFwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9SYXBpZEZpcmVjYW5ub25SYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtc3RlYWRmYXN0LWhlYXJ0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX05pZ2h0SGFydmVzdGVyUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgU3RlYWRmYXN0IEhlYXJ0XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBAQmFzZUR1cmFiaWxpdHkqMTAwQCUgZHVyYWJpbGl0eS4gV2hpbGUgYWJvdmUgQFRocmVzaG9sZEZvckVtcG93ZXIqMTAwQCUgSGVhbHRoLCBpbnN0ZWFkIGdhaW4gQEVtcG93ZXJlZER1cmFiaWxpdHkqMTAwQCUgRHVyYWJpbGl0eS5AVEZUVW5pdFByb3BlcnR5LjpURlRfQXVnbWVudF9XYXJtb2dzQnVja2xlX1RSQUtleUBcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fTmlnaHRIYXJ2ZXN0ZXJSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtdGl0YW5zLXJlc29sdmVcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fVGl0YW5zUmVzb2x2ZVJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IFRpdGFuJ3MgUmVzb2x2ZVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQFN0YWNraW5nQUQqMTAwQCUgQXR0YWNrIERhbWFnZSBhbmQgQFN0YWNraW5nU1BAJSBBYmlsaXR5IFBvd2VyIHdoZW4gYXR0YWNraW5nIG9yIHRha2luZyBkYW1hZ2UsIHN0YWNraW5nIHVwIHRvIEBTdGFja0NhcEAgdGltZXMuQXQgZnVsbCBzdGFja3MsIGdhaW4gQFN0YWNrZWRBbXAqMTAwQCUgRGFtYWdlIEFtcCBhbmQgZ2FpbiBpbW11bml0eSB0byBjcm93ZCBjb250cm9sLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9UaXRhbnNSZXNvbHZlUmFkaWFudC5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYWRpYW50LWdpYW50LXNsYXllclwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9HaWFudFNsYXllclJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IEdpYW50IFNsYXllclwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQERhbWFnZUFtcCoxMDBAJSBhZGRpdGlvbmFsIERhbWFnZSBBbXAgYWdhaW5zdCBUYW5rcy5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fR2lhbnRTbGF5ZXJSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtY3Jvd25ndWFyZFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9Dcm93bmd1YXJkUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgQ3Jvd25ndWFyZFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBTdGFydDogR2FpbiBhIEBTaGllbGRTaXplQCUgbWF4IEhlYWx0aCBTaGllbGQgZm9yIEBTaGllbGREdXJhdGlvbkAgc2Vjb25kcy5XaGVuIHRoZSBTaGllbGQgZXhwaXJlcywgZ2FpbiBAU2hpZWxkQm9udXNBUEAlIEFiaWxpdHkgUG93ZXIuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0Nyb3duZ3VhcmRSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtYmxvb2R0aGlyc3RlclwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9CbG9vZHRoaXJzdGVyUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgQmxvb2R0aGlyc3RlclwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIk9uY2UgcGVyIGNvbWJhdDogQXQgQEhlYWx0aFRocmVzaG9sZEAlIEhlYWx0aCwgZ2FpbiBhIEBTaGllbGRIZWFsdGhQZXJjZW50QCUgbWF4IEhlYWx0aCBTaGllbGQgdGhhdCBsYXN0cyB1cCB0byBAU2hpZWxkRHVyYXRpb25AIHNlY29uZHMuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0Jsb29kdGhpcnN0ZXJSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtcmFiYWRvbnMtZGVhdGhjYXBcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fUmFiYWRvbnNEZWF0aGNhcFJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IFJhYmFkb24ncyBEZWF0aGNhcFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkl0J3Mgd2l0bmVzc2VkIC0gYW5kIHVubGVhc2hlZCAtIG1pcmFjbGVzIGFuZCBjYWxhbWl0aWVzIGJvdGguQFRGVFVuaXRQcm9wZXJ0eS46VEZUX0F1Z21lbnRfRGVhZGxpZXJDYXBzX1RSQUtleUBcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fUmFiYWRvbnNEZWF0aGNhcFJhZGlhbnQuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1qZXdlbGVkLWdhdW50bGV0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0pld2VsZWRHYXVudGxldFJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IEpld2VsZWQgR2F1bnRsZXRcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJHYWluIFByZWNpc2lvbi5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fSmV3ZWxlZEdhdW50bGV0UmFkaWFudC5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYWRpYW50LWdhcmdveWxlLXN0b25lcGxhdGVcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fR2FyZ295bGVTdG9uZXBsYXRlUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgR2FyZ295bGUgU3RvbmVwbGF0ZVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQEFybW9yUGVyRW5lbXlAIEFybW9yIGFuZCBATVJQZXJFbmVteUAgTWFnaWMgUmVzaXN0IGZvciBlYWNoIGVuZW15IHRhcmdldGluZyB0aGUgaG9sZGVyLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9HYXJnb3lsZVN0b25lcGxhdGVSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImNoYWxpY2Utb2YtY2hhcml0eVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9DaGFsaWNlT2ZQb3dlclJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJDaGFsaWNlIG9mIENoYXJpdHlcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgc3RhcnQ6IEdyYW50ICBAQ2hhbGljZUFQQCBBYmlsaXR5IFBvd2VyIGFuZCBAU3BlbGx2YW1wQCUgT21uaXZhbXAgdG8gdGhlIGhvbGRlciBhbmQgYWxsaWVzIHdpdGhpbiAxIGhleCBpbiB0aGUgc2FtZSByb3cu4oCL4oCLT21uaXZhbXA6IGhlYWwgZm9yIHNvbWUgb2YgZGFtYWdlIGRlYWx0XCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1JhZGlhbnQvQ2hhbGljZV9vZl9Qb3dlcl9SYWRpYW50LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1uYXNob3JzLXRvb3RoXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0xldmlhdGhhblJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IE5hc2hvcidzIFRvb3RoXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiQXR0YWNrcyBncmFudCBAQmFzZU1hbmFPbkhpdEAgYm9udXMgTWFuYSwgaW5jcmVhc2VkIHRvIEBNYW5hT25Dcml0QCBpZiB0aGV5IGNyaXRpY2FsbHkgc3RyaWtlLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9MZXZpYXRoYW5SYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtc3BlYXItb2Ytc2hvamluXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1NwZWFyT2ZTaG9qaW5SYWRpYW50XCIsXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBTcGVhciBvZiBTaG9qaW5cIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJBdHRhY2tzIGdyYW50IEBGbGF0TWFuYVJlc3RvcmVAIGJvbnVzIE1hbmEuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX1NwZWFyT2ZTaG9qaW5SYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtZXZlbnNocm91ZFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9TcGVjdHJhbEdhdW50bGV0UmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgRXZlbnNocm91ZFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkBBUlJlZHVjdGlvbkFtb3VudEAlIFN1bmRlciBlbmVtaWVzIHdpdGhpbiBASGV4UmFuZ2VAIGhleGVzLiBHYWluIEBCb251c1Jlc2lzdHNAIEFybW9yIGFuZCBNYWdpYyBSZXNpc3QgZm9yIHRoZSBmaXJzdCBAQm9udXNSZXNpc3REdXJhdGlvbkAgc2Vjb25kcyBvZiBjb21iYXQuU3VuZGVyOiBSZWR1Y2UgQXJtb3JcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fU3BlY3RyYWxHYXVudGxldFJhZGlhbnQuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1pbmZpbml0eS1lZGdlXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0luZmluaXR5RWRnZVJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IEluZmluaXR5IEVkZ2VcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJHYWluIFByZWNpc2lvbi5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fSW5maW5pdHlFZGdlUmFkaWFudC5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYWRpYW50LWRlYXRoYmxhZGVcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fRGVhdGhibGFkZVJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IERlYXRoYmxhZGVcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJJdCBnbG93cyBpbiB0aGUgcHJlc2VuY2Ugb2YgZW5lbWllcy4gT3IgZnJpZW5kcy4gT3IgYW55dGhpbmcgYWxpdmUsIHJlYWxseS5AVEZUVW5pdFByb3BlcnR5LjpURlRfQXVnbWVudF9UcmFnaWNhbEJsYWRlX1RSQUtleUBcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fRGVhdGhibGFkZVJhZGlhbnQuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1hZGFwdGl2ZS1oZWxtXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0FkYXB0aXZlSGVsbVJhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IEFkYXB0aXZlIEhlbG1cIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJHYWluIGFuIGFkZGl0aW9uYWwgQE1hbmFQZXJjSW5jcmVhc2UqMTAwQCUgTWFuYSBmcm9tIGFsbCBzb3VyY2VzLiBUaGUgd2VhcmVyIGdhaW5zIGFuIGFkZGl0aW9uYWwgYm9udXMgYmFzZWQgb24gdGhlaXIgUm9sZTpUYW5rL0ZpZ2h0ZXI6IEdhaW4gQEZyb250bGluZVJlc2lzdHNAIEFybW9yIGFuZCBNYWdpYyBSZXNpc3RhbmNlLk1hcmtzbWFuL0Nhc3RlcjogR2FpbiBAQmFja2xpbmVBREFQQCUgQXR0YWNrIERhbWFnZSBhbmQgQWJpbGl0eSBQb3dlci5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fQWRhcHRpdmVIZWxtUmFkaWFudC5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJhcnRpZmFjdC1hbnZpbFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0dyYW50T3JubkFudmlsXCIsXG4gICAgXCJuYW1lXCI6IFwiQXJ0aWZhY3QgQW52aWxcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiQXJ0aWZhY3QgQW52aWxcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvQ2hhcmFjdGVycy9URlRfQXJtb3J5S2V5T3Jubi9IVUQvSWNvbnMyRC9URlRfQXJtb3J5S2V5T3Jubl9TcXVhcmUudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJsZXNzZXItbWlycm9yZWQtcGVyc29uYVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0xlc3Nlck1pcnJvcmVkUGVyc29uYVwiLFxuICAgIFwibmFtZVwiOiBcIkxlc3NlciBNaXJyb3JlZCBQZXJzb25hXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIlNoYXJlIEBTdGF0U2hhcmVQZXJjZW50KjEwMEAlIG9mIHRoZSBob2xkZXIncyBib251cyBBdHRhY2sgRGFtYWdlLCBBYmlsaXR5IFBvd2VyLCBBdHRhY2sgU3BlZWQsIEFybW9yLCBNYWdpYyBSZXNpc3QsIGFuZCBIZWFsdGggd2l0aCBvdGhlciBNaXJyb3JlZCBQZXJzb25hIGhvbGRlcnMuQ2FuJ3QgYmUgUmVmb3JnZWRVbmlxdWU6IG9uZSBwZXIgY2hhbXBpb25cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxNl9BcnRpZmFjdF9MZXNzZXJNaXJyb3JlZFBlcnNvbmEuVEZUX1NldDE2LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaW5uZXJ2YXRpbmctbG9ja2V0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfSW5uZXJ2YXRpbmdMb2NrZXRcIixcbiAgICBcIm5hbWVcIjogXCJJbm5lcnZhdGluZyBMb2NrZXRcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlciBnYWlucyBAUGVyY2VudE1hbmFAJSBvZiB0aGVpciB0b3RhbCBNYW5hIHdoZW5ldmVyIHRoZXkncmUgaGl0IGJ5IGFuIGF0dGFjay5FYWNoIGNhc3QgcmVzdG9yZXMgQFBlcmNlbnRIZWFsdGhAJSBvZiB0aGUgaG9sZGVyJ3MgbWF4IEhlYWx0aCBvdmVyIEBEdXJhdGlvbkAgc2Vjb25kcy5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9Jbm5lcnZhdGluZ0xvY2tldC5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCIzLWNvc3Qtb3JublwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0NoYW1waW9uSXRlbV9DaG9zZW5fT3JublwiLFxuICAgIFwibmFtZVwiOiBcIjMtY29zdDogT3JublwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJTcGFjZSBHcm9vdmVCYXN0aW9uXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfT3Jubi9IVUQvVEZUMTdfT3Jubl9TcXVhcmUuVEZUX1NldDE3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicHJvdGVjdG9ycy12b3dcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9Gcm96ZW5IZWFydFwiLFxuICAgIFwibmFtZVwiOiBcIlByb3RlY3RvcidzIFZvd1wiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcInRlYXItb2YtZ29kZGVzc1wiLFxuICAgICAgXCJjaGFpbi12ZXN0XCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgU3RhcnQ6IEdhaW4gQENvbWJhdFN0YXJ0TWFuYUAgTWFuYS5BdCBASGVhbHRoVGhyZXNob2xkQCUgSGVhbHRoLCBnYWluIEBUcmlnZ2VyTWFuYUAgTWFuYSBhbmQgYSBTaGllbGQgZXF1YWwgdG8gQFNoaWVsZEhlYWx0aFBlcmNlbnRAJSBtYXggSGVhbHRoLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0Zyb3plbkhlYXJ0LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRoZS1pbmRvbWl0YWJsZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X1RoZUluZG9taXRhYmxlXCIsXG4gICAgXCJuYW1lXCI6IFwiVGhlIEluZG9taXRhYmxlXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIncyBNb3ZlIFNwZWVkIGlzIGRyYXN0aWNhbGx5IHJlZHVjZWQuR2FpbiBASGVhbHRoUGVyY0JvbnVzKjEwMEAlIG1heCBIZWFsdGgsIHN0dW4gaW1tdW5pdHksIGFuZCBwdWxsIHRoZSBjdXJyZW50IHRhcmdldCBpbnRvIG1lbGVlIHJhbmdlLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X1RoZUluZG9taXRhYmxlLlRGVF9URlQxNF81LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaHVsbGNydXNoZXJcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ5X0l0ZW1fT3Jubkh1bGxicmVha2VyXCIsXG4gICAgXCJuYW1lXCI6IFwiSHVsbGNydXNoZXJcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IFN0YXJ0OiBJZiB0aGVyZSBhcmUgbm8gYWRqYWNlbnQgYWxsaWVzLCBnYWluIEBFeHRyYUhlYWx0aEAgSGVhbHRoLCBARXh0cmFBRGFuZEFQQCUgQXR0YWNrIERhbWFnZSwgYW5kIEBFeHRyYUFEYW5kQVBAJSBBYmlsaXR5IFBvd2VyLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9Pcm5uX0l0ZW1zL1RGVDlfT3Jubkl0ZW1fSHVsbGJyZWFrZXIudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzcGlyaXQtdmlzYWdlXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fUmVkZW1wdGlvblwiLFxuICAgIFwibmFtZVwiOiBcIlNwaXJpdCBWaXNhZ2VcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJ0ZWFyLW9mLWdvZGRlc3NcIixcbiAgICAgIFwiZ2lhbnRzLWJlbHRcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcIlJlZ2VuZXJhdGUgQE1pc3NpbmdIZWFsdGhIZWFsKjEwMEAlIG9mIG1pc3NpbmcgSGVhbHRoIGVhY2ggc2Vjb25kLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX1NwaXJpdFZpc2FnZVJSLlRGVF9URlQxNF81LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiY2hvbmNjcy1wcm93bGVycy1jbGF3XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUOV9JdGVtX09ybm5EdXNrYmxhZGVPZkRyYWt0aGFyclwiLFxuICAgIFwibmFtZVwiOiBcIkNob25jYydzIFByb3dsZXIncyBDbGF3XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBTdGFydDogTGVhcCB0byB0aGUgZW5lbXkgYmFja2xpbmUuIERhbWFnZSBmcm9tIGFuIEFiaWxpdHkgY2FuIGNyaXRpY2FsbHkgc3RyaWtlLltVbmlxdWUgLSBvbmx5IDEgcGVyIGNoYW1waW9uXVwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9Pcm5uX0l0ZW1zL1RGVDlfT3Jubkl0ZW1fUHJvd2xlcnNDbGF3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic2hhZG93LXB1cHBldFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X1NoYWRvd1B1cHBldFwiLFxuICAgIFwibmFtZVwiOiBcIlNoYWRvdyBQdXBwZXRcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiU3Bhd24gYSBjbG9uZSB0aGF0IGNvcGllcyB0aGUgaG9sZGVyJ3MgaXRlbXMuIFRoZSBjbG9uZSBoYXMgQENsb25lUGVyY2VudEhlYWx0aCoxMDBAJSBtYXggSGVhbHRoIGFuZCBkZWFscyBAQ2xvbmVQZXJjZW50RGFtYWdlKjEwMEAlIGRhbWFnZS5bVW5pcXVlIC0gb25seSAxIHBlciBjaGFtcGlvbl1cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxNl9BcnRpZmFjdF9TaGFkb3dQdXBwZXQuVEZUX1NldDE2LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZWtrb3MtcGF0aWVuY2VcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0FydGlmYWN0X0Vra29BcnRpZmFjdFwiLFxuICAgIFwibmFtZVwiOiBcIkVra28ncyBQYXRpZW5jZVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJUb3RhbCBBYmlsaXR5IGRhbWFnZSBpcyBpbmNyZWFzZWQgYnkgQEFiaWxpdHlEQSoxMDBAJSwgYnV0IGlzIGRlYWx0IG92ZXIgQER1cmF0aW9uQCBzZWNvbmRzIGluc3RlYWQuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTdfSXRlbV9BcnRpZmFjdF9Fa2tvUGF0aWVuY2UuVEZUX1NldDE3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwid2l0aGVyZWQtcmVsaWNcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9XaXRoZXJpbmdSZWxpY1wiLFxuICAgIFwibmFtZVwiOiBcIldpdGhlcmVkIFJlbGljXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBTdGFydDogSW5jcmVhc2UgdGhlIGhvbGRlcidzIG1heCBIZWFsdGggYnkgQEZsYXRNYXhIZWFsdGhAIGJ1dCBrZWVwIHRoZWlyIGN1cnJlbnQgSGVhbHRoIHRoZSBzYW1lLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X1dpdGhlcmluZ1JlbGljLlRGVF9TZXQxNi50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1hbmF6YW5lXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNF9JdGVtX09ybm5NdXJhbWFuYVwiLFxuICAgIFwibmFtZVwiOiBcIk1hbmF6YW5lXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkFmdGVyIGNhc3RpbmcgdGhlIGZpcnN0IHRpbWUgaW4gY29tYmF0LCBnYWluIEBNYW5hUmVzdG9yZUAgTWFuYSBvdmVyIEBNYW5hRHVyYXRpb25AIHNlY29uZHMuW1VuaXF1ZSAtIG9ubHkgMSBwZXIgY2hhbXBpb25dXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNF9JdGVtX09ybm5NdXJhbWFuYS5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJnb2xkbWFuY2Vycy1zdGFmZlwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVHb2xkbWFuY2Vyc1N0YWZmXCIsXG4gICAgXCJuYW1lXCI6IFwiR29sZG1hbmNlcidzIFN0YWZmXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkdyYW50ICBAQWJpbGl0eVBvd2VyUGVyR29sZEAgQWJpbGl0eSBQb3dlciBwZXIgIGdvbGQgaW4geW91ciBiYW5rICh1cCB0byAgQEFiaWxpdHlQb3dlckdvbGRNYXhAIGdvbGQpIGFuZCBhIEBPbktpbGxQcm9jQ2hhbmNlKjEwMEAlIGNoYW5jZSB0byBkcm9wICBAT25LaWxsUHJvY0dvbGRAIGdvbGQgb24gZW5lbXkga2lsbC5Hb2xkIGdlbmVyYXRlZCB0aGlzIGdhbWU6IEBURlRVbml0UHJvcGVydHkuaXRlbTpURlRfSXRlbV9Hb2xkR2VuZXJhdGVkQFwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9Pcm5uX0l0ZW1zL0dvbGRtYW5jZXJzU3RhZmYudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJkaWFtb25kLWhhbmRzXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUN19JdGVtX1NoaW1tZXJzY2FsZURpYW1vbmRIYW5kc19IUlwiLFxuICAgIFwibmFtZVwiOiBcIkRpYW1vbmQgSGFuZHNcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiT25jZSBwZXIgY29tYmF0OiBBdCBASFBUaHJlc2hvbGQxKjEwMEAlIEhlYWx0aCwgYmVjb21lIGludnVsbmVyYWJsZSBmb3IgQEJhc2VEYW1hZ2VJbW11bml0eVRpbWVAIHNlY29uZHMgYW5kIGdyYW50ICBAR29sZFBlckltbXVuaXR5UHJvY0AgZ29sZC5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvT3Jubl9JdGVtcy9URlQxMF9EaWFtb25kSGFuZHMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0cmlja3N0ZXJzLWdsYXNzXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUOV9JdGVtX09ybm5Ucmlja3N0ZXJzR2xhc3NcIixcbiAgICBcIm5hbWVcIjogXCJUcmlja3N0ZXIncyBHbGFzc1wiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJTdW1tb24gYSBjbG9uZSB3aXRoIEBIZWFsdGhQZXJjZW50QCUgYmFzZSBIZWFsdGggYW5kICtATWFuYUluY3JlYXNlKjEwMEAlIG1heCBNYW5hLiBZb3UgY2Fubm90IGVxdWlwIGl0ZW1zIHRvIHRoZSBjbG9uZS5UaGUgY2xvbmUgYmVuZWZpdHMgZnJvbSBhY3RpdmUgdHJhaXRzW1VuaXF1ZSAtIG9ubHkgMSBwZXIgY2hhbXBpb25dXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUOV9JdGVtX09ybm5Ucmlja3N0ZXJzR2xhc3MuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGFjdGljaWFucy1jYXBlXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fVGFjdGljaWFuc1JpbmdcIixcbiAgICBcIm5hbWVcIjogXCJUYWN0aWNpYW4ncyBDYXBlXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwic3BhdHVsYVwiLFxuICAgICAgXCJmcnlpbmctcGFuXCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxuICAgIFwic3RhdHNcIjogXCJZb3VyIHRlYW0gZ2FpbnMgK0BNYXhBcm15U2l6ZUluY3JlYXNlQCBtYXggdGVhbSBzaXplLkBQZXJjZW50R29sZENoYW5jZUAlIGNoYW5jZSB0byBkcm9wIDEgZ29sZCBhZnRlciBAVGltZXJAIHNlY29uZHMgb2YgY29tYmF0LlxcXCIuLi5hbmQgYSBiaXQgb2YgTHVjay5cXFwiXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fVGFjdGljaWFuc1JpbmcuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZXRlcm5hbC1wYWN0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfRXRlcm5hbFBhY3RcIixcbiAgICBcIm5hbWVcIjogXCJFdGVybmFsIFBhY3RcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IHN0YXJ0OiBGb3JtIGEgcGFjdCB3aXRoIHRoZSBoaWdoZXN0IEhlYWx0aCBhbGxpZWQgY2hhbXBpb24sIGlmIHRoZXkgZGllLCBnYWluIEBNYW5hUmVnZW5Ub0dyYW50QCBNYW5hIHJlZ2VuIGFuZCBAQVBUb0dyYW50QCUgQWJpbGl0eSBQb3dlci5XaGVuIHRoZSBhbGx5IHVzZXMgdGhlaXIgYWJpbGl0eSwgZ2FpbiBATWFuYVRvR3JhbnRAIE1hbmEuIEV2ZXJ5IEBTaGllbGRDYWRlbmNlQCBzZWNvbmRzLCBzaGllbGQgeW91ciBhbGx5IGZvciBAUGVyY2VudEFQU2hpZWxkKjEwMEAlIG9mIHRoZSBob2xkZXIncyBBYmlsaXR5IFBvd2VyLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE2X0FydGlmYWN0X0V0ZXJuYWxQYWN0LlRGVF9TZXQxNi50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRoaWVmcy1nbG92ZXNcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9UaGllZnNHbG92ZXNcIixcbiAgICBcIm5hbWVcIjogXCJUaGllZidzIEdsb3Zlc1wiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcInNwYXJyaW5nLWdsb3Zlc1wiLFxuICAgICAgXCJzcGFycmluZy1nbG92ZXNcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcIkVhY2ggcm91bmQ6IEVxdWlwIDIgcmFuZG9tIGl0ZW1zLltDb25zdW1lcyAzIGl0ZW0gc2xvdHMuXUBURlRVbml0UHJvcGVydHkuOlRGVF9CaW5kT25FcXVpcFRSQUBcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9UaGllZnNHbG92ZXMuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZ3VpbnNvb3MtcmFnZWJsYWRlXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fR3VpbnNvb3NSYWdlYmxhZGVcIixcbiAgICBcIm5hbWVcIjogXCJHdWluc29vJ3MgUmFnZWJsYWRlXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwicmVjdXJ2ZS1ib3dcIixcbiAgICAgIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQEF0dGFja1NwZWVkUGVyU3RhY2tAJSBzdGFja2luZyBBdHRhY2sgU3BlZWQgZXZlcnkgc2Vjb25kLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0d1aW5zb29zUmFnZWJsYWRlLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImlvbmljLXNwYXJrXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fSW9uaWNTcGFya1wiLFxuICAgIFwibmFtZVwiOiBcIklvbmljIFNwYXJrXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIixcbiAgICAgIFwibmVnYXRyb24tY2xvYWtcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcIkBNUlNocmVkQCUgU2hyZWQgZW5lbWllcyB3aXRoaW4gQEhleFJhbmdlQCBoZXhlcy4gV2hlbiBlbmVtaWVzIGNhc3QgYW4gQWJpbGl0eSwgZGVhbCBtYWdpYyBkYW1hZ2UgZXF1YWwgdG8gQE1hbmFSYXRpb0AlIG9mIHRoZSBNYW5hIHNwZW50U2hyZWQ6IFJlZHVjZSBNYWdpYyBSZXNpc3RcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9Jb25pY1NwYXJrLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImhlbGxmaXJlLWhhdGNoZXRcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9IZWxsZmlyZUhhdGNoZXRcIixcbiAgICBcIm5hbWVcIjogXCJIZWxsZmlyZSBIYXRjaGV0XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkF0dGFja3MgZGVhbCBATWF4SGVhbHRoUGVyY2VudERhbWFnZSoxMDBAJSBvZiB0aGUgaG9sZGVyJ3MgbWF4IEhlYWx0aCBhcyBib251cyBwaHlzaWNhbCBkYW1hZ2UuIEZvciBldmVyeSBATWlzc2luZ0hlYWx0aFBlcmNlbnQqMTAwQCUgbWlzc2luZyBIZWFsdGgsIGdhaW4gQEFTUGVyTWlzc2luZ0hlYWx0aFBlcmNlbnQqMTAwQCUgQXR0YWNrIFNwZWVkLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X0hlbGxmaXJlSGF0Y2hldC5URlRfU2V0MTYudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzdGVyYWtzLWdhZ2VcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9TdGVyYWtzR2FnZVwiLFxuICAgIFwibmFtZVwiOiBcIlN0ZXJhaydzIEdhZ2VcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJiZi1zd29yZFwiLFxuICAgICAgXCJnaWFudHMtYmVsdFwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiQXQgQEhlYWx0aFRocmVzaG9sZEAlIEhlYWx0aCwgZ2FpbiBhIFNoaWVsZCBlcXVhbCB0byBAUGVyY2VudEhlYWx0aFNoaWVsZCoxMDBAJSBvZiB0aGUgd2VhcmVyJ3MgbWF4aW11bSBIZWFsdGggdGhhdCByYXBpZGx5IGRlY2F5cyBvdmVyIEBTaGllbGREdXJhdGlvbkAgc2Vjb25kcy5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9TdGVyYWtzR2FnZS5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJkcmFnb25zLWNsYXdcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9EcmFnb25zQ2xhd1wiLFxuICAgIFwibmFtZVwiOiBcIkRyYWdvbidzIENsYXdcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJuZWdhdHJvbi1jbG9ha1wiLFxuICAgICAgXCJuZWdhdHJvbi1jbG9ha1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBAUGVyY2VudE1heEhQKjEwMEAlIG1heCBoZWFsdGguRXZlcnkgQEhlYWx0aFJlZ2VuSW50ZXJ2YWxAIHNlY29uZHMsIGhlYWwgQFBlcmNlbnRIZWFsdGhEYW1hZ2VAJSBtYXggSGVhbHRoLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0RyYWdvbnNDbGF3LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtbHVja3ktaXRlbS1jaGVzdFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9Db25zdW1hYmxlX1JlY29tbWVuZGVkQXJtb3J5UmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgTHVja3kgSXRlbSBDaGVzdFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIlVzZSBvbiBhIGNoYW1waW9uIHRvIG9wZW4gYW4gYXJtb3J5IG9mIFJhZGlhbnQgaXRlbXMgZXNwZWNpYWxseSBzdWl0ZWQgZm9yIHRoZW0uVGhlc2UgaXRlbXMgYXJlIGJhc2VkIG9uIHRoZSBjaGFtcGlvbidzIHJlY29tbWVuZGVkIGl0ZW1zLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9Db25zdW1hYmxlX0x1Y2t5SXRlbUNoZXN0LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1nYW1ibGVycy1ibGFkZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVHYW1ibGVyc0JsYWRlX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IEdhbWJsZXIncyBCbGFkZVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkdyYW50ICBAQXR0YWNrU3BlZWRQZXJHb2xkKjEwMEAlIGJvbnVzIEF0dGFjayBTcGVlZCBwZXIgIGdvbGQgaW4geW91ciBiYW5rICh1cCB0byAgQEF0dGFja1NwZWVkR29sZExpbWl0QCBnb2xkKS4gRWFjaCBhdHRhY2sgaGFzIGEgQENoYW5jZVRvUHJvYyoxMDBAJSBjaGFuY2UgdG8gZHJvcCAgQEdvbGRQZXJQcm9jQCBnb2xkLkdvbGQgZ2VuZXJhdGVkIHRoaXMgZ2FtZTogQFRGVFVuaXRQcm9wZXJ0eS5pdGVtOlRGVF9JdGVtX0dvbGRHZW5lcmF0ZWRAXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TZXQ3X1NoaW1tZXJzY2FsZS9TaGltbWVyc2NhbGVfR29sZENvbGxlY3Rvcl9SYWRpYW50LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1nb2xkbWFuY2Vycy1zdGFmZlwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVHb2xkbWFuY2Vyc1N0YWZmX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IEdvbGRtYW5jZXIncyBTdGFmZlwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkdyYW50ICBAQWJpbGl0eVBvd2VyUGVyR29sZEAgQWJpbGl0eSBQb3dlciBwZXIgIGdvbGQgaW4geW91ciBiYW5rICh1cCB0byAgQEFiaWxpdHlQb3dlckdvbGRNYXhAIGdvbGQpIGFuZCBhIEBPbktpbGxQcm9jQ2hhbmNlKjEwMEAlIGNoYW5jZSB0byBkcm9wICBAT25LaWxsUHJvY0dvbGRAIGdvbGQgb24gZW5lbXkga2lsbC5Hb2xkIGdlbmVyYXRlZCB0aGlzIGdhbWU6IEBURlRVbml0UHJvcGVydHkuaXRlbTpURlRfSXRlbV9Hb2xkR2VuZXJhdGVkQFwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU2V0N19TaGltbWVyc2NhbGUvU2hpbW1lcnNjYWxlX0dvbGRtYW5jZXJzU3RhZmZfUmFkaWFudC50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtZGV0ZXJtaW5lZC1pbnZlc3RvclwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVEZXRlcm1pbmVkSW52ZXN0b3JfUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgRGV0ZXJtaW5lZCBJbnZlc3RvclwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkFmdGVyIGR5aW5nIGR1cmluZyBjb21iYXQgQFN0YWNrTGltaXRAIHRpbWVzLCB0aGlzIGl0ZW0gaXMgZGVzdHJveWVkLiBVcG9uIGRlc3RydWN0aW9uLCBncmFudCB0aGUgaXRlbSBSYWRpYW50IERpYW1vbmQgSGFuZHMsIDEgQ2hhbXBpb24gRHVwbGljYXRvciwgYW5kICBAR29sZEdyYW50ZWRAIGdvbGQuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TZXQ3X1NoaW1tZXJzY2FsZS9TaGltbWVyc2NhbGVfRGV0ZXJtaW5lZEludmVzdG9yX1JhZGlhbnQudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYWRpYW50LWNyb3duLW9mLWNoYW1waW9uc1wiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVDcm93bk9mQ2hhbXBpb25zX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IENyb3duIG9mIENoYW1waW9uc1wiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkV2ZXJ5IEBTZWNvbmRzRm9yRW1wb3dlcmVkQXR0YWNrQCBzZWNvbmRzLCB0aGUgbmV4dCBhdHRhY2sgZGVhbHMgQEF0dGFja0dvbGRNdWx0aXBsaWVyQHggdGhlIGFtb3VudCBvZiAgZ29sZCBpbiB5b3VyIGJhbmsgaW4gdHJ1ZSBkYW1hZ2UuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TZXQ3X1NoaW1tZXJzY2FsZS9TaGltbWVyc2NhbGVfQ3Jvd25PZkNoYW1waW9uc19SYWRpYW50LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1kcmF2ZW5zLWF4ZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVEcmF2ZW5zQXhlX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IERyYXZlbidzIEF4ZVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gIEBBdHRhY2tEYW1hZ2VQZXJHb2xkQCUgQXR0YWNrIERhbWFnZSBwZXIgIGdvbGQgaW4geW91ciBiYW5rICh1cCB0byAgQEF0dGFja0RhbWFnZUdvbGRMaW1pdEAgZ29sZCkuQXR0YWNrcyBncmFudCBAU3RhY2tzUGVyQXR0YWNrQCBzdGFjaywgdXAgdG8gQENhc2hvdXRTdGFja3NAIHRpbWVzLiBBdCBmdWxsIHN0YWNrcywgZ3JhbnQgIEBDYXNob3V0R29sZEAgZ29sZCBhbmQgQENhc2hvdXRDb21wb25lbnRzQCBpdGVtIGNvbXBvbmVudChzKS5Hb2xkIGdlbmVyYXRlZCB0aGlzIGdhbWU6IEBURlRVbml0UHJvcGVydHkuaXRlbTpURlRfSXRlbV9Hb2xkR2VuZXJhdGVkQFwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU2V0N19TaGltbWVyc2NhbGUvU2hpbW1lcnNjYWxlX0RyYXZlbnNBeGVfUmFkaWFudC50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhZGlhbnQtb3JiLW9mLWdyZWVkXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUN19JdGVtX1NoaW1tZXJzY2FsZUhpZ2hTdGFrZXNfUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgT3JiIG9mIEdyZWVkXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiUmlza3khIFN1bW1vbiB0aGUgR29sZGVuIERyYWdvbiBCYW5rLiBMb3NpbmcgY29tYmF0IHN0b3JlcyBnb2xkIGluIHRoZSBiYW5rIGJhc2VkIG9uIHlvdXIgbG9zcyBzdHJlYWsuIFdpbiB0byBjb252ZXJ0IGl0IGludG8gbG9vdCBhbmQgZ29sZC5Hb2xkIGdlbmVyYXRlZCBieSBTaGltbWVyc2NhbGUgaXRlbXMgZ2V0cyBzdG9yZWQgaW4gdGhlIEdvbGRlbiBEcmFnb24gQmFuayB3aXRoIGEgQEJvbnVzR29sZFJhdGlvKjEwMEAlIGNvbnZlcnNpb24gcmF0ZS5UaGUgZXF1aXBwZWQgdW5pdCBoYXMgYSBAR29sZENoYW5jZUAlIGNoYW5jZSB0byBncmFudCBAUG9pbnRzUGVyS2lsbEAgZ29sZCBvbiB0YWtlZG93bnMuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TZXQ3X1NoaW1tZXJzY2FsZS9TaGltbWVyc2NhbGVfQW11bGV0T2ZHcmVlZF9SYWRpYW50LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1tb2d1bHMtbWFpbFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVNb2d1bHNNYWlsX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IE1vZ3VsJ3MgTWFpbFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXG4gICAgXCJzdGF0c1wiOiBcIkdyYW50cyBAQmFzZVJlc2lzdHNQZXJTdGFja0AgQXJtb3IsIEBCYXNlUmVzaXN0c1BlclN0YWNrQCBNYWdpYyBSZXNpc3QsIGFuZCBAQmFzZUhlYWx0aFBlclN0YWNrQCBIZWFsdGggd2hlbiB0YWtpbmcgZGFtYWdlLCBzdGFja2luZyB1cCB0byBAU3RhY2tDYXBAIHRpbWVzLkF0IGZ1bGwgc3RhY2tzLCBncmFudCAgQEdvbGRBdEZ1bGxTdGFja3NAIGdvbGQuR29sZCBnZW5lcmF0ZWQgdGhpcyBnYW1lOiBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUX0l0ZW1fR29sZEdlbmVyYXRlZEBcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NldDdfU2hpbW1lcnNjYWxlL1NoaW1tZXJzY2FsZV9Nb2d1bHNNYWlsX1JhZGlhbnQudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYWRpYW50LWRpYW1vbmQtaGFuZHNcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ3X0l0ZW1fU2hpbW1lcnNjYWxlRGlhbW9uZEhhbmRzX1JhZGlhbnRcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IERpYW1vbmQgSGFuZHNcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJPbmNlIHBlciBjb21iYXQ6IEF0IEBIUFRocmVzaG9sZDEqMTAwQCUgSGVhbHRoIGFuZCBASFBUaHJlc2hvbGQyKjEwMEAlIEhlYWx0aCwgYmVjb21lIGludnVsbmVyYWJsZSBmb3IgQEJhc2VEYW1hZ2VJbW11bml0eVRpbWVAIHNlY29uZCBhbmQgZ3JhbnQgIEBHb2xkUGVySW1tdW5pdHlQcm9jQCBnb2xkLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU2V0N19TaGltbWVyc2NhbGUvU2hpbW1lcnNjYWxlX0RpYW1vbmRIYW5kc19SYWRpYW50LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFkaWFudC1uZWVkbGVzc2x5LWJpZy1nZW1cIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ3X0l0ZW1fU2hpbW1lcnNjYWxlSGVhcnRPZkdvbGRfUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgTmVlZGxlc3NseSBCaWcgR2VtXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiSWYgdGhlIGhvbGRlciBpcyBhbGl2ZSBhZnRlciBAUHJvY1RpbWVJblNlY29uZHNAIHNlY29uZHMsIHlvdXIgdGVhbSBkZWFscyBAQm9udXNEYW1hZ2VQZXJHb2xkKjEwMEAlIG1vcmUgZGFtYWdlIHBlciAgZ29sZCBpbiB5b3VyIGJhbmsgKHVwIHRvICBAR29sZExpbWl0QCBnb2xkKS4gRm9yIGV2ZXJ5IEBVbml0c1BlckdvbGRAIHVuaXRzIGFsaXZlIHdoZW4gdGhpcyBoYXBwZW5zLCBnYWluIEBHb2xkQW1vdW50QCBnb2xkLkdvbGQgZ2VuZXJhdGVkIHRoaXMgZ2FtZTogQFRGVFVuaXRQcm9wZXJ0eS5pdGVtOlRGVF9JdGVtX0dvbGRHZW5lcmF0ZWRAXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TZXQ3X1NoaW1tZXJzY2FsZS9TaGltbWVyc2NhbGVfSGVhcnRPZkdvbGRfUmFkaWFudC50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImxpY2gtYmFuZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0xpY2hCYW5lXCIsXG4gICAgXCJuYW1lXCI6IFwiTGljaCBCYW5lXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIncyBmaXJzdCBhdHRhY2sgYWZ0ZXIgZWFjaCBBYmlsaXR5IGNhc3QgZGVhbHMgQFRGVFVuaXRQcm9wZXJ0eS5pdGVtOlRGVF9JdGVtX0FydGlmYWN0X0xpY2hCYW5lX0RhbWFnZUAgYm9udXMgbWFnaWMgZGFtYWdlLkRhbWFnZSBpbmNyZWFzZXMgYmFzZWQgb24gU3RhZ2UuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL09ybm5fSXRlbXMvVEZUX0l0ZW1fQXJ0aWZhY3RfTGljaEJhbmUudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzdHJpa2Vycy1mbGFpbFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX1Bvd2VyR2F1bnRsZXRcIixcbiAgICBcIm5hbWVcIjogXCJTdHJpa2VyJ3MgRmxhaWxcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJnaWFudHMtYmVsdFwiLFxuICAgICAgXCJzcGFycmluZy1nbG92ZXNcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcIkNyaXRpY2FsIFN0cmlrZXMgZ3JhbnQgQEJ1ZmZEYW1hZ2VBbXAqMTAwQCUgRGFtYWdlIEFtcCBmb3IgQER1cmF0aW9uQCBzZWNvbmRzLCBzdGFja2luZyB1cCB0byBATWF4U3RhY2tzQCB0aW1lcy5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9Qb3dlckdhdW50bGV0LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImZvcmJpZGRlbi1pZG9sXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfRm9yYmlkZGVuSWRvbFwiLFxuICAgIFwibmFtZVwiOiBcIkZvcmJpZGRlbiBJZG9sXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIlNoaWVsZHMgaGF2ZSBAUGVyY2VudFNoaWVsZENvbnZlcnNpb25AJSBvZiB0aGVpciB2YWx1ZSBjb252ZXJ0ZWQgdG8gbWF4IEhlYWx0aCBpbnN0ZWFkLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X0ZvcmJpZGRlbklkb2wuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYXJiaXRlci1lbWJsZW1cIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0Zhdm9yZWRFbWJsZW1JdGVtXCIsXG4gICAgXCJuYW1lXCI6IFwiQXJiaXRlciBFbWJsZW1cIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJzcGF0dWxhXCIsXG4gICAgICBcIm5lZ2F0cm9uLWNsb2FrXCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBBcmJpdGVyIHRyYWl0LlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQxNy9URlQxN19FbWJsZW1fQXJiaXRlci5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzbmlwZXItZW1ibGVtXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9SYW5nZWRUcmFpdEVtYmxlbUl0ZW1cIixcbiAgICBcIm5hbWVcIjogXCJTbmlwZXIgRW1ibGVtXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBTbmlwZXIgdHJhaXQgYW5kICtASGV4UmFuZ2VJbmNyZWFzZUAgQXR0YWNrIFJhbmdlLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQxNy9URlQxN19FbWJsZW1fU25pcGVyLlRGVF9TZXQxNy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInZhbmd1YXJkLWVtYmxlbVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fU2hpZWxkVGFua0VtYmxlbUl0ZW1cIixcbiAgICBcIm5hbWVcIjogXCJWYW5ndWFyZCBFbWJsZW1cIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJmcnlpbmctcGFuXCIsXG4gICAgICBcIm5lZ2F0cm9uLWNsb2FrXCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBWYW5ndWFyZCB0cmFpdC4gR2FpbiBAQVBHYWluQCUgQWJpbGl0eSBQb3dlciB3aGVuZXZlciBhbiBhbGx5IGdhaW5zIGEgc2hpZWxkLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQxNy9URlQxN19FbWJsZW1fVmFuZ3VhcmQuVEZUX1NldDE3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYW5pbWEtZW1ibGVtXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9BbmltYVNxdWFkRW1ibGVtSXRlbVwiLFxuICAgIFwibmFtZVwiOiBcIkFuaW1hIEVtYmxlbVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlciBnYWlucyB0aGUgQW5pbWEgdHJhaXQuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDE3L1RGVDE3X0VtYmxlbV9BbmltYVRlY2guVEZUX1NldDE3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGltZWJyZWFrZXItZW1ibGVtXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9QdWxzZWZpcmVFbWJsZW1JdGVtXCIsXG4gICAgXCJuYW1lXCI6IFwiVGltZWJyZWFrZXIgRW1ibGVtXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwic3BhdHVsYVwiLFxuICAgICAgXCJyZWN1cnZlLWJvd1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlciBnYWlucyB0aGUgVGltZWJyZWFrZXIgdHJhaXQuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDE3L1RGVDE3X0VtYmxlbV9UaW1lYnJlYWtlci5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJub3ZhLWVtYmxlbVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fRFJYRW1ibGVtSXRlbVwiLFxuICAgIFwibmFtZVwiOiBcIk4uTy5WLkEuIEVtYmxlbVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcInNwYXR1bGFcIixcbiAgICAgIFwic3BhcnJpbmctZ2xvdmVzXCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBOLk8uVi5BLiB0cmFpdC5OLk8uVi5BLiBTdHJpa2U6IEdhaW4gQEFTU3RyaWtlcioxMDBAJSBBdHRhY2sgU3BlZWQgYW5kIEBBcm1vclN0cmlrZXJAIEFybW9yIGFuZCBNYWdpYyBSZXNpc3QuIE90aGVyIGFsbGllcyBnYWluIEBBU1RlYW0qMTAwQCUgQXR0YWNrIFNwZWVkIGFuZCBAQXJtb3JUZWFtQCBBcm1vciBhbmQgTWFnaWMgUmVzaXN0LlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQxNy9URlQxN19FbWJsZW1fTk9WQS5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJtZWVwbGUtZW1ibGVtXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9Bc3Ryb25hdXRFbWJsZW1JdGVtXCIsXG4gICAgXCJuYW1lXCI6IFwiTWVlcGxlIEVtYmxlbVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcInNwYXR1bGFcIixcbiAgICAgIFwiY2hhaW4tdmVzdFwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlciBnYWlucyB0aGUgTWVlcGxlIHRyYWl0IGFuZCBATWFuYVJlZ2VuUGVyTWVlcEAgYWRkaXRpb25hbCBNYW5hIFJlZ2VuIHBlciAuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDE3L1RGVDE3X0VtYmxlbV9NZWVwbGUuVEZUX1NldDE3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic2hlcGhlcmQtZW1ibGVtXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9TdW1tb25UcmFpdEVtYmxlbUl0ZW1cIixcbiAgICBcIm5hbWVcIjogXCJTaGVwaGVyZCBFbWJsZW1cIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJmcnlpbmctcGFuXCIsXG4gICAgICBcInRlYXItb2YtZ29kZGVzc1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlciBnYWlucyB0aGUgU2hlcGhlcmQgdHJhaXQuIE9uIGNhc3QsIGdyYW50IEBNYW5hU2hhcmVQZXJjZW50KjEwMEAlIG9mIG1heCBNYW5hIHRvIHRoZSBCb25kIG9mIHRoZSBTdGFycy5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX1NoZXBlcmQuVEZUX1NldDE3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicHNpb25pYy1lbWJsZW1cIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX1BzeU9wc0VtYmxlbUl0ZW1cIixcbiAgICBcIm5hbWVcIjogXCJQc2lvbmljIEVtYmxlbVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlciBnYWlucyB0aGUgUHNpb25pYyB0cmFpdC5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX1BzeU9wcy5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJicmF3bGVyLWVtYmxlbVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fSFBUYW5rRW1ibGVtSXRlbVwiLFxuICAgIFwibmFtZVwiOiBcIkJyYXdsZXIgRW1ibGVtXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiZnJ5aW5nLXBhblwiLFxuICAgICAgXCJnaWFudHMtYmVsdFwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlciBnYWlucyB0aGUgQnJhd2xlciB0cmFpdC4gQXR0YWNrcyBkZWFscyBAUGVyY2VudEhQQXR0YWNrKjEwMEAlIG9mIHRoZSBob2xkZXIncyBtYXggaGVhbHRoIGFzIG1hZ2ljIGRhbWFnZS5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX0JyYXdsZXIuVEZUX1NldDE3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicm9ndWUtZW1ibGVtXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9Bc3Nhc3NpblRyYWl0RW1ibGVtSXRlbVwiLFxuICAgIFwibmFtZVwiOiBcIlJvZ3VlIEVtYmxlbVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcImZyeWluZy1wYW5cIixcbiAgICAgIFwic3BhcnJpbmctZ2xvdmVzXCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBSb2d1ZSB0cmFpdC4gQXQgQEhlYWx0aFRocmVzaG9sZCoxMDBAJSBoZWFsdGgsIGdhaW4gQE9tbml2YW1wKjEwMEAlIE9tbml2YW1wIGFuZCBpbW11bml0eSB0byBjcm93ZCBjb250cm9sIGZvciBAQnVmZkR1cmF0aW9uQCBzZWNvbmRzLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQxNy9URlQxN19FbWJsZW1fUm9ndWUuVEZUX1NldDE3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiY2hhbGxlbmdlci1lbWJsZW1cIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0FTVHJhaXRFbWJsZW1JdGVtXCIsXG4gICAgXCJuYW1lXCI6IFwiQ2hhbGxlbmdlciBFbWJsZW1cIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJmcnlpbmctcGFuXCIsXG4gICAgICBcInJlY3VydmUtYm93XCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBDaGFsbGVuZ2VyIHRyYWl0LiBPbiB0YWtlZG93biwgdGhlIGhvbGRlcidzIG5leHQgQE51bUF0dGFja3NAIGF0dGFja3MgZWFjaCBoZWFsIGZvciBAUGVyY2VudEhlYWx0aEhlYWwqMTAwQCUgb2YgbWF4IGhlYWx0aC5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX0NoYWxsZW5nZXIuVEZUX1NldDE3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZGFyay1zdGFyLWVtYmxlbVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fRGFya1N0YXJFbWJsZW1JdGVtXCIsXG4gICAgXCJuYW1lXCI6IFwiRGFyayBTdGFyIEVtYmxlbVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcInNwYXR1bGFcIixcbiAgICAgIFwiYmYtc3dvcmRcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwiZW1ibGVtXCIsXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIgZ2FpbnMgdGhlIERhcmsgU3RhciB0cmFpdC5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX0RhcmtTdGFyLlRGVF9TZXQxNy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInN0YXJnYXplci1lbWJsZW1cIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX1N0YXJnYXplckVtYmxlbUl0ZW1cIixcbiAgICBcIm5hbWVcIjogXCJTdGFyZ2F6ZXIgRW1ibGVtXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwic3BhdHVsYVwiLFxuICAgICAgXCJuZWVkbGVzc2x5LWxhcmdlLXJvZFwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlciBnYWlucyB0aGUgU3RhcmdhemVyIHRyYWl0LlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQxNy9URlQxN19FbWJsZW1fU3RhcmdhemVyLlRGVF9TZXQxNy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1hcmF1ZGVyLWVtYmxlbVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fTWVsZWVUcmFpdEVtYmxlbUl0ZW1cIixcbiAgICBcIm5hbWVcIjogXCJNYXJhdWRlciBFbWJsZW1cIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJmcnlpbmctcGFuXCIsXG4gICAgICBcImJmLXN3b3JkXCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBNYXJhdWRlciB0cmFpdCBhbmQgaGFzIGEgQEdvbGREcm9wQ2hhbmNlQCUgY2hhbmNlIHRvIGRyb3AgQEdvbGRBbW91bnRAIGdvbGQgb24ga2lsbC5Hb2xkIGRyb3BwZWQgdGhpcyBnYW1lOiBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUX0l0ZW1fR29sZEdlbmVyYXRlZEBcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX01hcmF1ZGVyLlRGVF9TZXQxNy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNwYWNlLWdyb292ZS1lbWJsZW1cIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX1NwYWNlR3Jvb3ZlRW1ibGVtSXRlbVwiLFxuICAgIFwibmFtZVwiOiBcIlNwYWNlIEdyb292ZSBFbWJsZW1cIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJzcGF0dWxhXCIsXG4gICAgICBcInRlYXItb2YtZ29kZGVzc1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlciBnYWlucyB0aGUgU3BhY2UgR3Jvb3ZlIHRyYWl0LiBPbiBjYXN0LCB0aGUgaG9sZGVyIGVudGVycyAgZm9yIEBHcm9vdmVEdXJhdGlvbkAgc2Vjb25kcy5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX1NwYWNlR3Jvb3ZlLlRGVF9TZXQxNy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImJhc3Rpb24tZW1ibGVtXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9SZXNpc3RUYW5rRW1ibGVtSXRlbVwiLFxuICAgIFwibmFtZVwiOiBcIkJhc3Rpb24gRW1ibGVtXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiZnJ5aW5nLXBhblwiLFxuICAgICAgXCJjaGFpbi12ZXN0XCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBCYXN0aW9uIHRyYWl0LiBBZnRlciB0aGUgZmlyc3QgQERlbGF5QCBzZWNvbmRzIG9mIGNvbWJhdCwgdGhlIGhvbGRlciBnYWlucyBAQXR0YWNrU3BlZWQqMTAwQCUgQXR0YWNrIFNwZWVkLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQxNy9URlQxN19FbWJsZW1fQmFzdGlvbi5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ2b3lhZ2VyLWVtYmxlbVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fRmxleFRyYWl0RW1ibGVtSXRlbVwiLFxuICAgIFwibmFtZVwiOiBcIlZveWFnZXIgRW1ibGVtXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiZnJ5aW5nLXBhblwiLFxuICAgICAgXCJuZWVkbGVzc2x5LWxhcmdlLXJvZFwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlciBnYWlucyB0aGUgVm95YWdlciB0cmFpdC4gQ29tYmF0IFN0YXJ0OiBHYWluIGFuZCBncmFudCBhZGphY2VudCBhbGxpZXMgYm9udXNlcyBiYXNlZCBvbiB0aGUgaG9sZGVyJ3Mgcm9sZS4tIFRhbmtzOiBAQm9udXNBcm1vck1SQCBBcm1vciBhbmQgTWFnaWMgUmVzaXN0LSBGaWdodGVycy9Bc3Nhc3NpbnM6IEBCb251c09tbml2YW1wKjEwMEAlIE9tbml2YW1wLSBPdGhlciBSb2xlczogQEJvbnVzQXR0YWNrU3BlZWQqMTAwQCUgQXR0YWNrIFNwZWVkXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDE3L1RGVDE3X0VtYmxlbV9Wb3lhZ2VyLlRGVF9TZXQxNy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInByaW1vcmRpYW4tZW1ibGVtXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9Qcmltb3JkaWFuRW1ibGVtSXRlbVwiLFxuICAgIFwibmFtZVwiOiBcIlByaW1vcmRpYW4gRW1ibGVtXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwic3BhdHVsYVwiLFxuICAgICAgXCJnaWFudHMtYmVsdFwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlciBnYWlucyB0aGUgUHJpbW9yZGlhbiB0cmFpdC5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX1ByaW1vcmRpYW4uVEZUX1NldDE3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibWlycm9yZWQtcGVyc29uYVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X01pcnJvcmVkUGVyc29uYVwiLFxuICAgIFwibmFtZVwiOiBcIk1pcnJvcmVkIFBlcnNvbmFcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiRXZlcnkgQE51bUNvbWJhdHNAIHBsYXllciBjb21iYXRzIGdhaW4gYSBsZXNzZXIgY29weSBvZiBNaXJyb3JlZCBQZXJzb25hJm5ic3A7KEBURlRVbml0UHJvcGVydHkudHJhaXQ6VEZUX0l0ZW1fQXJ0aWZhY3RfTWlycm9yZWRQZXJzb25hX0NvbWJhdHNAL0BOdW1Db21iYXRzQCkuIFNoYXJlIEBTdGF0U2hhcmVQZXJjZW50KjEwMEAlIG9mIHRoZSBob2xkZXIncyBib251cyBBdHRhY2sgRGFtYWdlLCBBYmlsaXR5IFBvd2VyLCBBdHRhY2sgU3BlZWQsIEFybW9yLCBNYWdpYyBSZXNpc3QsIGFuZCBIZWFsdGggd2l0aCBvdGhlciBNaXJyb3JlZCBQZXJzb25hIGhvbGRlcnMuQ2FuJ3QgYmUgUmVmb3JnZWQsIExlc3NlciBjb3BpZXMgZG8gbm90IHByb2R1Y2UgY29waWVzLlVuaXF1ZTogb25lIHBlciBjaGFtcGlvblwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE2X0FydGlmYWN0X01pcnJvcmVkUGVyc29uYS5URlRfU2V0MTYudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJmaXNoYm9uZXNcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9GaXNoYm9uZXNcIixcbiAgICBcIm5hbWVcIjogXCJGaXNoYm9uZXNcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlcidzIGF0dGFja3MgdGFyZ2V0IHJhbmRvbSBlbmVtaWVzLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X0Zpc2hib25lcy5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJhbmltYS12aXNhZ2VcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ0X0l0ZW1fT3JubkFuaW1hVmlzYWdlXCIsXG4gICAgXCJuYW1lXCI6IFwiQW5pbWEgVmlzYWdlXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkhlYWwgQFBlcmNlbnRIZWFsdGhSZWdlbkAlIG1heCBIZWFsdGggZXZlcnkgc2Vjb25kLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDRfSXRlbV9Pcm5uQW5pbWFWaXNhZ2UuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZ2FyZ295bGUtc3RvbmVwbGF0ZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0dhcmdveWxlU3RvbmVwbGF0ZVwiLFxuICAgIFwibmFtZVwiOiBcIkdhcmdveWxlIFN0b25lcGxhdGVcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJjaGFpbi12ZXN0XCIsXG4gICAgICBcIm5lZ2F0cm9uLWNsb2FrXCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxuICAgIFwic3RhdHNcIjogXCJHYWluIEBBcm1vclBlckVuZW15QCBBcm1vciBhbmQgQE1SUGVyRW5lbXlAIE1hZ2ljIFJlc2lzdCBmb3IgZWFjaCBlbmVteSB0YXJnZXRpbmcgdGhlIGhvbGRlci5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9HYXJnb3lsZVN0b25lcGxhdGUuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGl0YW5pYy1oeWRyYVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X1RpdGFuaWNIeWRyYVwiLFxuICAgIFwibmFtZVwiOiBcIlRpdGFuaWMgSHlkcmFcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiQXR0YWNrcyBkZWFsIEBQZXJjZW50TWF4SGVhbHRoU3BsYXNoQCUgb2YgdGhlIGhvbGRlcidzIG1heCBIZWFsdGggcGx1cyBAUGVyY2VudEF0dGFja0RhbWFnZVNwbGFzaEAlIG9mIHRoZWlyIEF0dGFjayBEYW1hZ2UgYXMgYm9udXMgcGh5c2ljYWwgZGFtYWdlIHRvIHRoZSB0YXJnZXQgYW5kIGFkamFjZW50IGVuZW1pZXMuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJ0aWZhY3RfVGl0YW5pY0h5ZHJhLlRGVF9URlQxNF81LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYnJhbWJsZS12ZXN0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQnJhbWJsZVZlc3RcIixcbiAgICBcIm5hbWVcIjogXCJCcmFtYmxlIFZlc3RcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJjaGFpbi12ZXN0XCIsXG4gICAgICBcImNoYWluLXZlc3RcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQFBlcmNlbnRNYXhIUCoxMDBAJSBtYXggaGVhbHRoLlRha2UgQEF1dG9EYW1hZ2VSZWR1Y3Rpb24qMTAwQCUgcmVkdWNlZCBkYW1hZ2UgZnJvbSBhdHRhY2tzLiBXaGVuIHN0cnVjayBieSBhbnkgYXR0YWNrLCBkZWFsIEAxU3RhckFvRURhbWFnZUAgbWFnaWMgZGFtYWdlIHRvIGFsbCBhZGphY2VudCBlbmVtaWVzLkNvb2xkb3duOiBASUNEQCBzZWNvbmRzXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQnJhbWJsZVZlc3QuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiY2hvbmNjcy1yb2NrZXQtcHJvcGVsbGVkLWZpc3RcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ0X0l0ZW1fT3JublJvY2tldFByb3BlbGxlZEZpc3RcIixcbiAgICBcIm5hbWVcIjogXCJDaG9uY2MncyBSb2NrZXQtUHJvcGVsbGVkIEZpc3RcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IHN0YXJ0OiBUaGUgZmFydGhlc3QgZW5lbXkgaXMgcHVsbGVkIGludG8gbWVsZWUgcmFuZ2UgYW5kIFN0dW5uZWQgZm9yIEBTdHVuRHVyYXRpb25AIHNlY29uZHMuIEFsbGllcyB3aXRoaW4gcmFuZ2Ugd2lsbCBwcmlvcml0aXplIGF0dGFja2luZyB0aGF0IGVuZW15LltVbmlxdWUgLSBvbmx5IDEgcGVyIGNoYW1waW9uXVN0dW46IGNhbm5vdCBtb3ZlLCBhdHRhY2ssIG9yIGNhc3QgQWJpbGl0aWVzXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL09ybm5fSXRlbXMvVEZUNF9Pcm5uSXRlbV9Sb2NrZXRQcm9wZWxsZWRGaXN0LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYWVnaXMtb2YtZHVza1wiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0FlZ2lzT2ZEdXNrXCIsXG4gICAgXCJuYW1lXCI6IFwiQWVnaXMgb2YgRHVza1wiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJFdmVyeSBAVGlja1JhdGVAIHNlY29uZHMsIHN0ZWFsIEBNUlN0ZWFsUGVyVGlja0AgTWFnaWMgUmVzaXN0IGZyb20gZW5lbWllcyB3aXRoaW4gMSBoZXggYW5kIGRlYWwgQFRGVFVuaXRQcm9wZXJ0eS5pdGVtOlRGVF9JdGVtX0FydGlmYWN0X0FlZ2lzRHVza0Rhd25fRGFtYWdlQCUgb2YgdGhlIGhvbGRlcidzIE1hZ2ljIFJlc2lzdCBhcyBtYWdpYyBkYW1hZ2UuSWYgQWVnaXMgb2YgRGF3biBpcyBhbHNvIGVxdWlwcGVkLCB0cmlnZ2VyIHRoaXMgaXRlbSdzIGVmZmVjdCBldmVyeSBAVGlja1JhdGVXaXRoQWVnaXNPZkRhd25AIHNlY29uZHMgaW5zdGVhZC5EYW1hZ2UgaW5jcmVhc2VzIGJhc2VkIG9uIFN0YWdlLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X0FlZ2lzT2ZEdXNrLlRGVF9TZXQxNi50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInVuZW5kaW5nLWRlc3BhaXJcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9VbmVuZGluZ0Rlc3BhaXJcIixcbiAgICBcIm5hbWVcIjogXCJVbmVuZGluZyBEZXNwYWlyXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIldoZW5ldmVyIGEgU2hpZWxkIG9uIHRoZSBob2xkZXIgYnJlYWtzLCBAUGVyY2VudERhbWFnZUAlIG9mIHRoYXQgU2hpZWxkJ3MgaW5pdGlhbCB2YWx1ZSBpcyBkZWFsdCB0byB0aGUgbmVhcmVzdCBlbmVteSBhcyBtYWdpYyBkYW1hZ2UuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJ0aWZhY3RfVW5lbmRpbmdEZXNwYWlyLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImV0ZXJuYWwtd2ludGVyXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNF9JdGVtX09ybm5FdGVybmFsV2ludGVyXCIsXG4gICAgXCJuYW1lXCI6IFwiRXRlcm5hbCBXaW50ZXJcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiRW5lbWllcyB3aG8gZGFtYWdlIHRoZSBob2xkZXIgYXJlIEBBdHRhY2tTcGVlZFNsb3dQZXJjZW50QCUgQ2hpbGxlZCBmb3IgQFNsb3dEdXJhdGlvbkAgc2Vjb25kcy4gQWZ0ZXIgQE51bUFwcGxpY2F0aW9uc0AgQ2hpbGxzIGZyb20gdGhpcyBpdGVtLCB0aGUgYXR0YWNrZXIgaXMgU3R1bm5lZCBpbnN0ZWFkIChDb29sZG93bjogQEZyZWV6ZUNvb2xkb3duQCBzZWNvbmRzKS5bVW5pcXVlIC0gb25seSAxIHBlciBjaGFtcGlvbl1DaGlsbDogcmVkdWNlIEF0dGFjayBTcGVlZFN0dW46IGNhbm5vdCBtb3ZlLCBhdHRhY2ssIG9yIGNhc3QgQWJpbGl0aWVzXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNF9JdGVtX09ybm5FdGVybmFsV2ludGVyLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInlhc3Vvcy1ibGFkZXdvcmtcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0FydGlmYWN0X1lhc3VvQXJ0aWZhY3RcIixcbiAgICBcIm5hbWVcIjogXCJZYXN1bydzIEJsYWRld29ya1wiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJFdmVyeSBASW50ZXJ2YWxAIHNlY29uZHMsIHlvdXIgbmV4dCBhdHRhY2sgaXMgYSBkb3VibGUgYXR0YWNrLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0l0ZW1fQXJ0aWZhY3RfWWFzdW9CbGFkZXdvcmsuVEZUX1NldDE3LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZ2lhbnQtc2xheWVyXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fTWFkcmVkc0Jsb29kcmF6b3JcIixcbiAgICBcIm5hbWVcIjogXCJHaWFudCBTbGF5ZXJcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJiZi1zd29yZFwiLFxuICAgICAgXCJyZWN1cnZlLWJvd1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBARGFtYWdlQW1wKjEwMEAlIGFkZGl0aW9uYWwgRGFtYWdlIEFtcCBhZ2FpbnN0IFRhbmtzLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX01hZHJlZHNCbG9vZHJhem9yLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1lbmRpbmctZWNob2VzXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfTWVuZGluZ0VjaG9lc1wiLFxuICAgIFwibmFtZVwiOiBcIk1lbmRpbmcgRWNob2VzXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkluY3JlYXNlIGhlYWxpbmcgb24gdGhlIGhvbGRlciBieSBASW5jcmVhc2VkSGVhbGluZyoxMDBAJS4gV2hlbiB0aGUgaG9sZGVyIGdpdmVzIG9yIHJlY2VpdmVzIGEgaGVhbCwgZ3JhbnQgQEhlYWxQZXJjZW50VG9HcmFudCoxMDBAJSBvZiB0aGUgaGVhbHMgdmFsdWUgdG8gdGhlIGxvd2VzdCBoZWFsdGggYWxseSBhcyB3ZWxsLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE2X0FydGlmYWN0X01lbmRpbmdFY2hvZXMuVEZUX1NldDE2LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwib2JzaWRpYW4tY2xlYXZlclwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDRfSXRlbV9Pcm5uT2JzaWRpYW5DbGVhdmVyXCIsXG4gICAgXCJuYW1lXCI6IFwiT2JzaWRpYW4gQ2xlYXZlclwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJEYW1hZ2UgZGVhbHQgQFNocmVkQCUgU2hyZWRzIGFuZCBAU2hyZWRAJSBTdW5kZXJzIGVuZW1pZXMgZm9yIEBEdXJhdGlvbkAgc2Vjb25kcy5Zb3VyIHRlYW0gZ2FpbnMgQFRlYW1BRCoxMDBAJSBBdHRhY2sgRGFtYWdlIGFuZCBAVGVhbUFQQCBBYmlsaXR5IFBvd2VyLuKAi+KAi1tTdXBwb3J0IGl0ZW1dIFtVbmlxdWUgLSBvbmx5IDEgcGVyIGNoYW1waW9uXVNocmVkOiBSZWR1Y2UgTWFnaWMgUmVzaXN0U3VuZGVyOiBSZWR1Y2UgQXJtb3JcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ0X0l0ZW1fT3Jubk9ic2lkaWFuQ2xlYXZlci5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzdW5maXJlLWNhcGVcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9SZWRCdWZmXCIsXG4gICAgXCJuYW1lXCI6IFwiU3VuZmlyZSBDYXBlXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiY2hhaW4tdmVzdFwiLFxuICAgICAgXCJnaWFudHMtYmVsdFwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBAQm9udXNQZXJjZW50SFAqMTAwQCUgbWF4IEhlYWx0aC4gRXZlcnkgQElDREAgc2Vjb25kcywgZGVhbCBAQnVyblBlcmNlbnRAJSBCdXJuIGFuZCBAR3JpZXZvdXNXb3VuZHNQZXJjZW50QCUgV291bmQgdG8gYW4gZW5lbXkgd2l0aGluIEBIZXhSYW5nZUAgaGV4ZXMgZm9yIEBCdXJuRHVyYXRpb25AIHNlY29uZHMuQnVybjogRGVhbHMgYSBwZXJjZW50IG9mIHRoZSB0YXJnZXQncyBtYXggSGVhbHRoIGFzIHRydWUgZGFtYWdlIGV2ZXJ5IHNlY29uZFdvdW5kOiBSZWR1Y2VzIGhlYWxpbmcgcmVjZWl2ZWRcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9SZWRCdWZmLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInZpcnR1ZS1vZi10aGUtbWFydHlyXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fUmFkaWFudFZpcnR1ZVwiLFxuICAgIFwibmFtZVwiOiBcIlZpcnR1ZSBvZiB0aGUgTWFydHlyXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiRXZlcnkgQEhlYWxUaWNrUmF0ZUAgc2Vjb25kcywgaGVhbCB5b3VyIHRlYW0gZm9yIEBNYXhIZWFsdGhIZWFsQCUgb2YgdGhlaXIgbWF4IEhlYWx0aC4gV2hlbiB0aGUgaG9sZGVyIGRpZXMsIHRoZSBoZWFsaW5nIGluY3JlYXNlcyB0byBAVE9PTFRJUEVtcG93ZXJlZEhlYWxAJSBtYXggSGVhbHRoIGZvciBATnVtQm9udXNIZWFsc0AgZXh0cmEgaGVhbHMuSGVhbGluZzogQFRGVFVuaXRQcm9wZXJ0eS5pdGVtOlRGVF9UcmFja2VyX1ZhbHVlMUDigIvigItbU3VwcG9ydCBpdGVtXVwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX1JhZGlhbnRWaXJ0dWUuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGhyZXNocy1sYW50ZXJuXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9BcnRpZmFjdF9UaHJlc2hMYW50ZXJuXCIsXG4gICAgXCJuYW1lXCI6IFwiVGhyZXNoJ3MgTGFudGVyblwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJBZnRlciBARGVsYXlAIHNlY29uZHMgb2YgY29tYmF0LCBwdWxsIHRoZSBsZWZ0bW9zdCBiZW5jaGVkIHVuaXQgb250byB0aGUgYmF0dGxlZmllbGQuIFdoaWxlIHRoYXQgdW5pdCBsaXZlcywgQERhbWFnZVNoYXJlKjEwMEAlIG9mIGFsbCBkYW1hZ2UgdGhlIGhvbGRlciB3b3VsZCB0YWtlIGlzIHJlZGlyZWN0ZWQgdG8gdGhlbS5UcmFpdHMgb2YgY2hhbXBpb25zIGZsdW5nIG9udG8gdGhlIGJvYXJkIGRvIG5vdCBiZWNvbWUgYWN0aXZlXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTdfSXRlbV9BcnRpZmFjdF9UaHJlc2hMYW50ZXJuLlRGVF9TZXQxNy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImtheWxlcy1yYWRpYW50LWV4YWx0YXRpb25cIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0FydGlmYWN0X0theWxlQXJ0aWZhY3RfUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcIktheWxlJ3MgUmFkaWFudCBFeGFsdGF0aW9uXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkJlaG9sZCwgdGhlIHJpZ2h0ZW91cyBmbGFtZSFcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxN19JdGVtX0FydGlmYWN0X0theWxlR3JlYXRzd29yZC5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJoYW5kLW9mLWp1c3RpY2VcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9VbnN0YWJsZUNvbmNvY3Rpb25cIixcbiAgICBcIm5hbWVcIjogXCJIYW5kIE9mIEp1c3RpY2VcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJ0ZWFyLW9mLWdvZGRlc3NcIixcbiAgICAgIFwic3BhcnJpbmctZ2xvdmVzXCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxuICAgIFwic3RhdHNcIjogXCJHYWluIDIgZWZmZWN0czpAQURfTm90U3RhdEJhcioxMDBAJSBBdHRhY2sgRGFtYWdlIGFuZCBAQVBfTm90U3RhdEJhckAlIEFiaWxpdHkgUG93ZXIuQFN0YXRPbW5pdmFtcF9Ob3RTdGF0QmFyKjEwMEAlIE9tbml2YW1wLldoaWxlIGFib3ZlIEBIZWFsdGhUaHJlc2hvbGQqMTAwQCUgaGVhbHRoLCBkb3VibGUgdGhlIEF0dGFjayBEYW1hZ2UgYW5kIEFiaWxpdHkgUG93ZXIuIFdoaWxlIGJlbG93IEBIZWFsdGhUaHJlc2hvbGQqMTAwQCUgSGVhbHRoLCBkb3VibGUgdGhlIE9tbml2YW1wLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX1Vuc3RhYmxlQ29uY29jdGlvbi5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJlZGdlLW9mLW5pZ2h0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fR3VhcmRpYW5BbmdlbFwiLFxuICAgIFwibmFtZVwiOiBcIkVkZ2Ugb2YgTmlnaHRcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJiZi1zd29yZFwiLFxuICAgICAgXCJjaGFpbi12ZXN0XCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxuICAgIFwic3RhdHNcIjogXCJBdCBASGVhbHRoVGhyZXNob2xkQCUgSGVhbHRoLCBicmllZmx5IGJlY29tZSB1bnRhcmdldGFibGUsIHNoZWQgbmVnYXRpdmUgZWZmZWN0cywgYW5kIGhlYWwgQE1pc3NpbmdIZWFsdGhSZXN0b3JlKjEwMEAlIG1pc3NpbmcgaGVhbHRoLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0d1YXJkaWFuQW5nZWwuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwia2F5bGVzLWV4YWx0YXRpb25cIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0FydGlmYWN0X0theWxlQXJ0aWZhY3RcIixcbiAgICBcIm5hbWVcIjogXCJLYXlsZSdzIEV4YWx0YXRpb25cIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiQWZ0ZXIgQERlbGF5QCBzZWNvbmRzIG9mIGNvbWJhdCwgdGhpcyBhbmQgYWxsIGNvbXBsZXRlZCBpdGVtcyBvbiB0aGUgaG9sZGVyIGJlY29tZSBSYWRpYW50LlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0l0ZW1fQXJ0aWZhY3RfS2F5bGVHcmVhdHN3b3JkLlRGVF9TZXQxNy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImN1cnNlZC1ibGFkZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0N1cnNlZEJsYWRlXCIsXG4gICAgXCJuYW1lXCI6IFwiQ3Vyc2VkIEJsYWRlXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkF0dGFja3MgcmVkdWNlIHRoZSB0YXJnZXQncyBtYXggSGVhbHRoIGJ5IEBNYXhIZWFsdGhQZXJjZW50QCUuIEBIaXRDb3VudEAgYXR0YWNrcyBvbiB0aGUgc2FtZSB0YXJnZXQgcmVkdWNlcyB0aGVpciBzdGFyIGxldmVsIGJ5IDEuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL09ybm5fSXRlbXMvVEZUX0l0ZW1fQXJ0aWZhY3RfQ3Vyc2VkQmxhZGUudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ6aG9ueWFzLXBhcmFkb3hcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ0X0l0ZW1fT3Jublpob255YXNQYXJhZG94XCIsXG4gICAgXCJuYW1lXCI6IFwiWmhvbnlhJ3MgUGFyYWRveFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJPbmNlIHBlciBjb21iYXQgYXQgQFBlcmNlbnRIZWFsdGhUaHJlc2hvbGRAJSBIZWFsdGgsIGJlY29tZSBpbnZ1bG5lcmFibGUgYW5kIHVudGFyZ2V0YWJsZSBmb3IgQEludnVsbkR1cmF0aW9uQCBzZWNvbmRzLltVbmlxdWUgLSBvbmx5IDEgcGVyIGNoYW1waW9uXVwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDRfSXRlbV9Pcm5uWmhvbnlhc1BhcmFkb3guVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGl0YW5zLXJlc29sdmVcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9UaXRhbnNSZXNvbHZlXCIsXG4gICAgXCJuYW1lXCI6IFwiVGl0YW4ncyBSZXNvbHZlXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiY2hhaW4tdmVzdFwiLFxuICAgICAgXCJyZWN1cnZlLWJvd1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBAU3RhY2tpbmdBRCoxMDBAJSBBdHRhY2sgRGFtYWdlIGFuZCBAU3RhY2tpbmdTUEAlIEFiaWxpdHkgUG93ZXIgd2hlbiBhdHRhY2tpbmcgb3IgdGFraW5nIGRhbWFnZSwgc3RhY2tpbmcgdXAgdG8gQFN0YWNrQ2FwQCB0aW1lcy4gIEF0IGZ1bGwgc3RhY2tzLCBnYWluIEBTdGFja2VkQW1wKjEwMEAlIERhbWFnZSBBbXAgYW5kIGdhaW4gaW1tdW5pdHkgdG8gY3Jvd2QgY29udHJvbC5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9UaXRhbnNSZXNvbHZlLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImx1ZGVucy10ZW1wZXN0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfTHVkZW5zVGVtcGVzdFwiLFxuICAgIFwibmFtZVwiOiBcIkx1ZGVuJ3MgVGVtcGVzdFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJAUGVyY2VudE9mT3ZlcmtpbGxAJSBvZiBvdmVya2lsbCBkYW1hZ2UgcGx1cyBAQmFzZURhbWFnZUAgaXMgZGVhbHQgYXMgbWFnaWMgZGFtYWdlIHRvIHRoZSB0aHJlZSBlbmVtaWVzIG5lYXJlc3QgdGhlIHRhcmdldC5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9MdWRlbnNUZW1wZXN0LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNwZWN0cmFsLWN1dGxhc3NcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9TcGVjdHJhbEN1dGxhc3NcIixcbiAgICBcIm5hbWVcIjogXCJTcGVjdHJhbCBDdXRsYXNzXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBzdGFydDogVGVsZXBvcnQgdGhlIGhvbGRlciB0byB0aGUgbWlycm9yZWQgaGV4IG9uIHRoZSBlbmVteSdzIHNpZGUgb2YgdGhlIGJvYXJkLiBBZnRlciBARHVyYXRpb25AIHNlY29uZHMsIHRoZSBob2xkZXIgcmV0dXJucyB0byB0aGVpciBvcmlnaW5hbCBsb2NhdGlvbi5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9TcGVjdHJhbEN1dGxhc3MuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwia3Jha2Vucy1mdXJ5XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fUnVuYWFuc0h1cnJpY2FuZVwiLFxuICAgIFwibmFtZVwiOiBcIktyYWtlbidzIEZ1cnlcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJuZWdhdHJvbi1jbG9ha1wiLFxuICAgICAgXCJyZWN1cnZlLWJvd1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiQXR0YWNrcyBncmFudCBAQURPbkF0dGFjayoxMDBAJSBzdGFja2luZyBBdHRhY2sgRGFtYWdlLCB1cCB0byBATWF4U3RhY2tzQCBhdHRhY2tzLiBBZnRlciBATWF4U3RhY2tzQCBhdHRhY2tzLCBnYWluIEBBU0NhcHN0b25lKjEwMEAlIEF0dGFjayBTcGVlZC5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9LcmFrZW5TbGF5ZXIuVEZUX1RGVDE0XzUudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYXBpZC1maXJlY2Fubm9uXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfUmFwaWRGaXJlY2Fubm9uXCIsXG4gICAgXCJuYW1lXCI6IFwiUmFwaWQgRmlyZWNhbm5vblwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJHYWluICsxIEF0dGFjayBSYW5nZSwgaW5jcmVhc2VkIGJ5IDEgd2hlbmV2ZXIgdGhlIGhvbGRlciBraWxscyBhbiBlbmVteS5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9SYXBpZEZpcmVjYW5ub24uVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYmxvb2R0aGlyc3RlclwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0Jsb29kdGhpcnN0ZXJcIixcbiAgICBcIm5hbWVcIjogXCJCbG9vZHRoaXJzdGVyXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiYmYtc3dvcmRcIixcbiAgICAgIFwibmVnYXRyb24tY2xvYWtcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcIk9uY2UgcGVyIGNvbWJhdCBhdCBASGVhbHRoVGhyZXNob2xkQCUgSGVhbHRoLCBnYWluIGEgQFNoaWVsZEhlYWx0aFBlcmNlbnRAJSBtYXggSGVhbHRoIFNoaWVsZCB0aGF0IGxhc3RzIHVwIHRvIEBTaGllbGREdXJhdGlvbkAgc2Vjb25kcy5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9CbG9vZHRoaXJzdGVyLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInN0YXRpa2stc2hpdlwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X1N0YXRpa2tTaGl2XCIsXG4gICAgXCJuYW1lXCI6IFwiU3RhdGlrayBTaGl2XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkV2ZXJ5IDNyZCBhdHRhY2sgZGVhbHMgQERhbWFnZUAgKyBAQVBTY2FsYXIqMTAwQCUgb2YgdGhlIGhvbGRlcidzIEFiaWxpdHkgUG93ZXIgYXMgYWRkaXRpb25hbCBtYWdpYyBkYW1hZ2UgdG8gNCBlbmVtaWVzLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X1N0YXR0aWtTaGl2LlRGVF9URlQxNF81LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic25pcGVycy1mb2N1c1wiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDlfSXRlbV9Pcm5uSG9yaXpvbkZvY3VzXCIsXG4gICAgXCJuYW1lXCI6IFwiU25pcGVyJ3MgRm9jdXNcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBARGFtYWdlQW1wUGVySGV4KjEwMEAlIERhbWFnZSBBbXAgYWdhaW5zdCB0YXJnZXRzIEBIZXhSZXF1aXJlbWVudEAgb3IgbW9yZSBoZXhlcyBhd2F5LlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDlfSXRlbV9Pcm5uSG9yaXpvbkZvY3VzLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImFyY2hhbmdlbHMtc3RhZmZcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcmNoYW5nZWxzU3RhZmZcIixcbiAgICBcIm5hbWVcIjogXCJBcmNoYW5nZWwncyBTdGFmZlwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcIm5lZWRsZXNzbHktbGFyZ2Utcm9kXCIsXG4gICAgICBcInRlYXItb2YtZ29kZGVzc1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IHN0YXJ0OiBHYWluIEBBUFBlckludGVydmFsQCUgQWJpbGl0eSBQb3dlciBldmVyeSBASW50ZXJ2YWxTZWNvbmRzQCBzZWNvbmRzIGluIGNvbWJhdC5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcmNoYW5nZWxzU3RhZmYuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYWVnaXMtb2YtZGF3blwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0FlZ2lzT2ZEYXduXCIsXG4gICAgXCJuYW1lXCI6IFwiQWVnaXMgb2YgRGF3blwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJFdmVyeSBAVGlja1JhdGVAIHNlY29uZHMsIHN0ZWFsIEBBcm1vclN0ZWFsUGVyVGlja0AgQXJtb3IgZnJvbSBlbmVtaWVzIHdpdGhpbiAxLWhleCBhbmQgaGVhbCBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUX0l0ZW1fQXJ0aWZhY3RfQWVnaXNEdXNrRGF3bl9EYW1hZ2VAJSBvZiB0aGUgaG9sZGVyJ3MgQXJtb3IuSWYgQWVnaXMgb2YgRHVzayBpcyBhbHNvIGVxdWlwcGVkLCB0cmlnZ2VyIHRoaXMgaXRlbSdzIGVmZmVjdCBldmVyeSBAVGlja1JhdGVXaXRoQWVnaXNPZkR1c2tAIHNlY29uZHMgaW5zdGVhZC5IZWFsaW5nIGluY3JlYXNlcyBiYXNlZCBvbiBTdGFnZS5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9BZWdpc09mRGF3bi5URlRfU2V0MTYudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJldmVseW5ucy1pbnN0aW5jdFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fQXJ0aWZhY3RfRXZlbHlubkFydGlmYWN0XCIsXG4gICAgXCJuYW1lXCI6IFwiRXZlbHlubidzIEluc3RpbmN0XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIldoZW4gc3dpdGNoaW5nIHRhcmdldHMsIGJsaW5rIHRvIHRoZSBuZXh0IHRhcmdldC4gQXR0YWNrcyBhbmQgQWJpbGl0aWVzIGV4ZWN1dGUgdGhlIGhvbGRlcidzIHRhcmdldCBiZWxvdyBARXhlY3V0ZVRocmVzaG9sZEZvclRhcmdldCoxMDBAJSBvZiB0aGVpciBIZWFsdGguS2lsbHMgZ3JhbnQgdGhlIGhvbGRlciBARGVjYXlpbmdBUyoxMDBAJSBBdHRhY2sgU3BlZWQgZGVjYXlpbmcgb3ZlciBARHVyYXRpb25AIHNlY29uZHMuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTdfSXRlbV9BcnRpZmFjdF9FdmVseW5uRmFuZy5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzb3Jha2FzLW1pcmFjbGVcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0FydGlmYWN0X1NvcmFrYUFydGlmYWN0XCIsXG4gICAgXCJuYW1lXCI6IFwiU29yYWthJ3MgTWlyYWNsZVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJUaGUgZmlyc3QgQE51bU1pcmFjbGVzQCB0aW1lcyB0aGUgaG9sZGVyIGRyb3BzIGJlbG93IEBIUFRocmVzaG9sZCoxMDBAJSBIZWFsdGgsIGEgTWlyYWNsZSBvY2N1cnMsIGhlYWxpbmcgdGhlbSBmb3IgQFRvdGFsSGVhbFJhdGlvQCUgb2YgdGhlaXIgbWF4IEhlYWx0aC5JZiB0aGUgaG9sZGVyIHN1cnZpdmVzIHBsYXllciBjb21iYXQsIGdhaW4gQFBsYXllckhlYWx0aEAgcGxheWVyIEhlYWx0aCBmb3IgZWFjaCBNaXJhY2xlIHRoaXMgY29tYmF0LlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0l0ZW1fQXJ0aWZhY3RfU29yYWthTWlyYWNsZS5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ2YXJ1c3Mtb2JzZXNzaW9uXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9BcnRpZmFjdF9WYXJ1c0FydGlmYWN0XCIsXG4gICAgXCJuYW1lXCI6IFwiVmFydXMncyBPYnNlc3Npb25cIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IFN0YXJ0OiBZb3VyIHN0cm9uZ2VzdCBUYW5rIGJlY29tZXMgdGhlIFNvdWxtYXRlLiBGb3IgZWFjaCBzZWNvbmQgdGhleSBhcmUgYWxpdmUsIHRoZSBob2xkZXIgZ2FpbnMgQFN0YWNraW5nU3RhdHNAJSBzdGFja2luZyBBdHRhY2sgRGFtYWdlIGFuZCBBYmlsaXR5IFBvd2VyLlRoZSBTb3VsbWF0ZSBoZWFscyBmb3IgQEhlYWxQY3QqMTAwQCUgb2YgZGFtYWdlIHRoZSBob2xkZXIgZGVhbHMuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTdfSXRlbV9BcnRpZmFjdF9WYXJ1c09ic2Vzc2lvbi5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJkYXduY29yZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0Rhd25jb3JlXCIsXG4gICAgXCJuYW1lXCI6IFwiRGF3bmNvcmVcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiUmVkdWNlIHRoZSBob2xkZXIncyBtYXggTWFuYSBieSBARmxhdE1hbmFSZWR1Y3Rpb25ALiBTdWJzZXF1ZW50IHNwZWxsY2FzdHMgcmVkdWNlIG1heCBNYW5hIGJ5IEBSZWR1Y3Rpb25QZXJDYXN0KjEwMEAlLCB0byBhIG1pbmltdW0gb2YgQE1pbmltdW1Ub3RhbE1hbmFALlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X0Rhd25jb3JlLlRGVF9TZXQxNS50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImNob25jY3MtYXJ0aWZhY3RvcnlcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRFdmVudENUX0F1Z21lbnRfQXJ0aWZhY3RvcnlcIixcbiAgICBcIm5hbWVcIjogXCJDaG9uY2MncyBBcnRpZmFjdG9yeVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJBdCB0aGUgc3RhcnQgb2YgZWFjaCB0dXJuLCB5b3VyIGJlbmNoZWQgY29tcGxldGVkIGl0ZW1zIHRyYW5zZm9ybSBpbnRvIGEgcmFuZG9tIEFydGlmYWN0IGl0ZW0uIEdhaW4gQE51bUl0ZW1zQCBBcnRpZmFjdCBBbnZpbCBhbmQgYSByZWZvcmdlci5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvSGV4Y29yZS9BcnRpZmFjdG9yeV9JSUkuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYWhyaXMtYXVyYVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fQXJ0aWZhY3RfQWhyaUFydGlmYWN0XCIsXG4gICAgXCJuYW1lXCI6IFwiQWhyaSdzIEF1cmFcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlciBpcyBvcmJpdGVkIGJ5IDMgZm94ZmlyZXMuIEVhY2ggb25lIGRlYWxzIEBGbGF0TWFnaWNEYW1hZ2VAJm5ic3A7KCkgbWFnaWMgZGFtYWdlIGFuZCB0aGUgb3JiaXQgZXhwYW5kcyB0byBoaXQgdGhlIGhvbGRlcidzIGN1cnJlbnQgdGFyZ2V0LkZvciBldmVyeSBATWFuYVNwZW50QCBNYW5hIHRoZSBob2xkZXIgc3BlbmRzLCBmb3hmaXJlcyB0cmF2ZWwgQFBlcmNlbnRTcGVlZEluY3JlYXNlKjEwMEAlIGZhc3RlciBmb3IgdGhlIHJlc3Qgb2YgY29tYmF0LlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0l0ZW1fQXJ0aWZhY3RfQWhyaVJoeXRobS5URlRfU2V0MTcudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJsaWdodHNoaWVsZC1jcmVzdFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0xpZ2h0c2hpZWxkQ3Jlc3RcIixcbiAgICBcIm5hbWVcIjogXCJMaWdodHNoaWVsZCBDcmVzdFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJFdmVyeSBAVHJpZ2dlclJhdGVAIHNlY29uZHMsIFNoaWVsZHMgdGhlIGxvd2VzdCBwZXJjZW50IEhlYWx0aCBhbGx5IGZvciBAUGVyY2VudE9mUmVzaXN0c0AlIG9mIHRoZSBob2xkZXIncyBjb21iaW5lZCBBcm1vciBhbmQgTWFnaWMgUmVzaXN0IGZvciBAU2hpZWxkRHVyYXRpb25AIHNlY29uZHMuT24gZGVhdGggZ3JhbnRzIHRoaXMgc2hpZWxkIHRvIGFsbCBhbGxpZXMuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJ0aWZhY3RfTGlnaHRzaGllbGRDcmVzdC5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJkZWF0aHMtZGVmaWFuY2VcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ0X0l0ZW1fT3JubkRlYXRoc0RlZmlhbmNlXCIsXG4gICAgXCJuYW1lXCI6IFwiRGVhdGgncyBEZWZpYW5jZVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJASWdub3JlUGFpblBlcmNlbnRAJSBvZiB0aGUgZGFtYWdlIHRoZSBob2xkZXIgcmVjZWl2ZXMgaXMgaW5zdGVhZCBkZWFsdCBvdmVyIEBCbGVlZER1cmF0aW9uQCBzZWNvbmRzIGFzIG5vbi1sZXRoYWwgZGFtYWdlLltVbmlxdWUgLSBvbmx5IDEgcGVyIGNoYW1waW9uXVwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDRfSXRlbV9Pcm5uRGVhdGhzRGVmaWFuY2UuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic3BlYXItb2Ytc2hvamluXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fU3BlYXJPZlNob2ppblwiLFxuICAgIFwibmFtZVwiOiBcIlNwZWFyIG9mIFNob2ppblwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcImJmLXN3b3JkXCIsXG4gICAgICBcInRlYXItb2YtZ29kZGVzc1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiQXR0YWNrcyBncmFudCBARmxhdE1hbmFSZXN0b3JlQCBib251cyBNYW5hLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX1NwZWFyT2ZTaG9qaW4uVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZXZlbnNocm91ZFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX1NwZWN0cmFsR2F1bnRsZXRcIixcbiAgICBcIm5hbWVcIjogXCJFdmVuc2hyb3VkXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwibmVnYXRyb24tY2xvYWtcIixcbiAgICAgIFwiZ2lhbnRzLWJlbHRcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcIkBBUlJlZHVjdGlvbkFtb3VudEAlIFN1bmRlciBlbmVtaWVzIHdpdGhpbiBASGV4UmFuZ2VAIGhleGVzLiBHYWluIEBCb251c1Jlc2lzdHNAIEFybW9yIGFuZCBNYWdpYyBSZXNpc3QgZm9yIHRoZSBmaXJzdCBAQm9udXNSZXNpc3REdXJhdGlvbkAgc2Vjb25kcyBvZiBjb21iYXQuU3VuZGVyOiBSZWR1Y2UgQXJtb3JcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9TcGVjdHJhbEdhdW50bGV0LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImJsYWNrc21pdGhzLWdsb3Zlc1wiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDlfSXRlbV9Pcm5uUHJvdG90eXBlRm9yZ2VcIixcbiAgICBcIm5hbWVcIjogXCJCbGFja3NtaXRoJ3MgR2xvdmVzXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkVhY2ggcm91bmQ6IEVxdWlwIDIgcmFuZG9tIE9ybm4gQXJ0aWZhY3RzLltDb25zdW1lcyAzIGl0ZW0gc2xvdHMuXUBURlRVbml0UHJvcGVydHkuOlRGVF9CaW5kT25FcXVpcFRSQUBcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ5X0l0ZW1fT3JublByb3RvdHlwZUZvcmdlLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImJsaWdodGluZy1qZXdlbFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0JsaWdodGluZ0pld2VsXCIsXG4gICAgXCJuYW1lXCI6IFwiQmxpZ2h0aW5nIEpld2VsXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkRlYWxpbmcgbWFnaWMgZGFtYWdlIHJlZHVjZXMgdGhlIHRhcmdldCdzIE1hZ2ljIFJlc2lzdCBieSBATVJSZWR1Y3Rpb25ALiBJZiB0aGVpciBNYWdpYyBSZXNpc3QgaXMgMCwgZ3JhbnQgdGhlIGhvbGRlciBATWFuYUdhaW5AIE1hbmEgaW5zdGVhZC5BYmlsaXR5IGRhbWFnZSBjYW4gb25seSB0cmlnZ2VyIG9uIGVhY2ggZW5lbXkgb25jZSBldmVyeSBASUNEQCBzZWNvbmRzLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X0JsaWdodGluZ0pld2VsLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRhbGlzbWFuLW9mLWFzY2Vuc2lvblwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X1RhbGlzbWFuT2ZBc2NlbnNpb25cIixcbiAgICBcIm5hbWVcIjogXCJUYWxpc21hbiBPZiBBc2NlbnNpb25cIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiQWZ0ZXIgQFNlY29uZHNAIHNlY29uZHMgZ2FpbiBATWF4SGVhbHRoUGVyY2VudEAlIG1heCBIZWFsdGggYW5kIEBEYW1hZ2VBbXAqMTAwQCUgRGFtYWdlIEFtcCBmb3IgdGhlIHJlc3Qgb2YgY29tYmF0LlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X1RhbGlzbWFuT2ZBc2NlbnNpb24uVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaW5maW5pdHktZm9yY2VcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQ0X0l0ZW1fT3JubkluZmluaXR5Rm9yY2VcIixcbiAgICBcIm5hbWVcIjogXCJJbmZpbml0eSBGb3JjZVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJUb25zIG9mIEVWRVJZVEhJTkchXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNF9JdGVtX09ybm5JbmZpbml0eUZvcmNlLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm5hc2hvcnMtdG9vdGhcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9MZXZpYXRoYW5cIixcbiAgICBcIm5hbWVcIjogXCJOYXNob3IncyBUb290aFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcInJlY3VydmUtYm93XCIsXG4gICAgICBcImdpYW50cy1iZWx0XCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxuICAgIFwic3RhdHNcIjogXCJBdHRhY2tzIGdyYW50IEBCYXNlTWFuYU9uSGl0QCBib251cyBNYW5hLCBpbmNyZWFzZWQgdG8gQE1hbmFPbkNyaXRAIGlmIHRoZXkgY3JpdGljYWxseSBzdHJpa2UuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fTGV2aWF0aGFuLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInN1c3BpY2lvdXMtdHJlbmNoLWNvYXRcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9TdXNwaWNpb3VzVHJlbmNoQ29hdFwiLFxuICAgIFwibmFtZVwiOiBcIlN1c3BpY2lvdXMgVHJlbmNoIENvYXRcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiT25jZSBwZXIgY29tYmF0IGF0IEBQZXJjZW50SGVhbHRoVHJpZ2dlckAlIEhlYWx0aCwgdGhlIGhvbGRlciBzcGxpdHMgaW50byAzIGNvcGllcyBvZiB0aGVtc2VsZiBlYWNoIHdpdGggQFBlcmNlbnRIZWFsdGhPZkNvcGllc0AlIG9mIHRoZWlyIG1heCBIZWFsdGguW1VuaXF1ZSAtIG9ubHkgMSBwZXIgY2hhbXBpb25dXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJ0aWZhY3RfU3VzcGljaW91c1RyZW5jaENvYXQuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibW9yZWxsb25vbWljb25cIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9Nb3JlbGxvbm9taWNvblwiLFxuICAgIFwibmFtZVwiOiBcIk1vcmVsbG9ub21pY29uXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIixcbiAgICAgIFwiZ2lhbnRzLWJlbHRcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcIkF0dGFja3MgYW5kIEFiaWxpdGllcyBkZWFsIEBCdXJuUGVyY2VudEAlIEJ1cm4gYW5kIEBHcmlldm91c1dvdW5kc1BlcmNlbnRAJSBXb3VuZCB0byBlbmVtaWVzIGZvciBAQnVybkR1cmF0aW9uQCBzZWNvbmRzLkJ1cm46IERlYWxzIGEgcGVyY2VudCBvZiB0aGUgdGFyZ2V0J3MgbWF4IEhlYWx0aCBhcyB0cnVlIGRhbWFnZSBldmVyeSBzZWNvbmRXb3VuZDogUmVkdWNlcyBoZWFsaW5nIHJlY2VpdmVkXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fTW9yZWxsb25vbWljb24uVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmVkLWJ1ZmZcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9SYXBpZEZpcmVDYW5ub25cIixcbiAgICBcIm5hbWVcIjogXCJSZWQgQnVmZlwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcInJlY3VydmUtYm93XCIsXG4gICAgICBcInJlY3VydmUtYm93XCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxuICAgIFwic3RhdHNcIjogXCJBdHRhY2tzIGFuZCBBYmlsaXRpZXMgQEJ1cm5QZXJjZW50QCUgQnVybiBhbmQgQEhlYWxpbmdSZWR1Y3Rpb25QY3RAJSBXb3VuZCBlbmVtaWVzIGZvciBARHVyYXRpb25AIHNlY29uZHMuQnVybjogRGVhbHMgYSBwZXJjZW50IG9mIHRoZSB0YXJnZXQncyBtYXggSGVhbHRoIGFzIHRydWUgZGFtYWdlIGV2ZXJ5IHNlY29uZFdvdW5kOiBSZWR1Y2VzIGhlYWxpbmcgcmVjZWl2ZWRcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9SYXBpZEZpcmVDYW5ub24uVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiY3Jvd25ndWFyZFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0Nyb3duZ3VhcmRcIixcbiAgICBcIm5hbWVcIjogXCJDcm93bmd1YXJkXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIixcbiAgICAgIFwiY2hhaW4tdmVzdFwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IFN0YXJ0OiBHYWluIGEgQFNoaWVsZFNpemVAJSBtYXggSGVhbHRoIFNoaWVsZCBmb3IgQFNoaWVsZER1cmF0aW9uQCBzZWNvbmRzLldoZW4gdGhlIFNoaWVsZCBleHBpcmVzLCBnYWluIEBTaGllbGRCb251c0FQQCUgQWJpbGl0eSBQb3dlci5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9Dcm93bmd1YXJkLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1pdHRlbnNcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9NaXR0ZW5zXCIsXG4gICAgXCJuYW1lXCI6IFwiTWl0dGVuc1wiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJTaHJpbmtzIHRoZSBob2xkZXIsIGdyYW50aW5nIHRoZW0gaW5jcmVhc2VkIG1vdmVtZW50IHNwZWVkIGFuZCBpbW11bml0eSB0byBTbG93LCBCdXJuLCBhbmQgV291bmQuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJ0aWZhY3RfTWl0dGVucy5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJhZGFwdGl2ZS1oZWxtXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQWRhcHRpdmVIZWxtXCIsXG4gICAgXCJuYW1lXCI6IFwiQWRhcHRpdmUgSGVsbVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcIm5lZ2F0cm9uLWNsb2FrXCIsXG4gICAgICBcInRlYXItb2YtZ29kZGVzc1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBhbiBhZGRpdGlvbmFsIEBNYW5hUGVyY0luY3JlYXNlKjEwMEAlIE1hbmEgZnJvbSBhbGwgc291cmNlcy4gVGhlIGhvbGRlciBnYWlucyBhbiBhZGRpdGlvbmFsIGJvbnVzIGJhc2VkIG9uIHRoZWlyIFJvbGU6VGFua3MgYW5kIEZpZ2h0ZXJzOiBHYWluIEBGcm9udGxpbmVSZXNpc3RzQCBBcm1vciBhbmQgTWFnaWMgUmVzaXN0YW5jZS5PdGhlciBSb2xlczogR2FpbiBAQmFja2xpbmVBREFQQCUgQXR0YWNrIERhbWFnZSBhbmQgQWJpbGl0eSBQb3dlci5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BZGFwdGl2ZUhlbG0uVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZGVhdGhmaXJlLWdyYXNwXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUOV9JdGVtX09ybm5EZWF0aGZpcmVHcmFzcFwiLFxuICAgIFwibmFtZVwiOiBcIkRlYXRoZmlyZSBHcmFzcFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgc3RhcnQ6IEJsYXN0IHRoZSBjdXJyZW50IHRhcmdldCBmb3IgQFBlcmNlbnRNYXhIZWFsdGhEYW1hZ2VAJSBvZiB0aGVpciBtYXggSGVhbHRoIGFzIG1hZ2ljIGRhbWFnZS4gUmVwZWF0IHRoaXMgZXZlcnkgQFJlcGVhdFRpbWVAIHNlY29uZHMuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUOV9JdGVtX09ybm5EZWF0aGZpcmVHcmFzcC5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJmbGlja2VyYmxhZGVzXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfTmF2b3JpRmxpY2tlcmJsYWRlc1wiLFxuICAgIFwibmFtZVwiOiBcIkZsaWNrZXJibGFkZXNcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiQXR0YWNrcyBncmFudCBAQVNQZXJTdGFjayoxMDBAJSBzdGFja2luZyBBdHRhY2sgU3BlZWQuIEV2ZXJ5IEBTdGFja3NQZXJCb251c0AgYXR0YWNrcyBhbHNvIGdyYW50IEBBRFBlckJvbnVzKjEwMEAlIEF0dGFjayBEYW1hZ2UgYW5kIEBBUFBlckJvbnVzQCUgQWJpbGl0eSBQb3dlci5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9OYXZvcmlGbGlja2VycGxhZGUuVEZUX1RGVDE0XzUudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJibHVlLWJ1ZmZcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9CbHVlQnVmZlwiLFxuICAgIFwibmFtZVwiOiBcIkJsdWUgQnVmZlwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcInRlYXItb2YtZ29kZGVzc1wiLFxuICAgICAgXCJ0ZWFyLW9mLWdvZGRlc3NcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQE1vZGlmaWVkQURBUCoxMDBAJSBhZGRpdGlvbmFsIEF0dGFjayBEYW1hZ2UgYW5kIEFiaWxpdHkgUG93ZXIgZnJvbSBhbGwgc291cmNlcy5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9CbHVlQnVmZi5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJjb3JydXB0LXZhbXBpcmljLXNjZXB0ZXJcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9DdXJzZWRWYW1waXJpY1NjZXB0ZXJcIixcbiAgICBcIm5hbWVcIjogXCJDb3JydXB0IFZhbXBpcmljIFNjZXB0ZXJcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiQXR0YWNrcyBkZWFsIGFuIGFkZGl0aW9uYWwgQFBlcmNlbnREYW1hZ2VAJSBBdHRhY2sgRGFtYWdlICBhcyBwaHlzaWNhbCBkYW1hZ2UgYW5kIGhlYWwgdGhlIGhvbGRlciBmb3IgdGhlIGRhbWFnZSBkZWFsdC5UaGUgaG9sZGVyIGNhbm5vdCBjYXN0IHRoZWlyIEFiaWxpdHkgb3IgZ2FpbiBNYW5hLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X0N1cnNlZFZhbXBpcmljU2NlcHRlci5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJsYXN0LXdoaXNwZXJcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9MYXN0V2hpc3BlclwiLFxuICAgIFwibmFtZVwiOiBcIkxhc3QgV2hpc3BlclwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcInJlY3VydmUtYm93XCIsXG4gICAgICBcInNwYXJyaW5nLWdsb3Zlc1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiRGFtYWdlIGZyb20gYXR0YWNrcyBhbmQgQWJpbGl0aWVzIEBBcm1vclJlZHVjdGlvblBlcmNlbnRAJSBTdW5kZXIgdGhlIHRhcmdldCBmb3IgQEFybW9yQnJlYWtEdXJhdGlvbkAgc2Vjb25kcy4gVGhpcyBlZmZlY3QgZG9lcyBub3Qgc3RhY2suU3VuZGVyOiBSZWR1Y2UgQXJtb3JcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9MYXN0V2hpc3Blci5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJqZXdlbGVkLWdhdW50bGV0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fSmV3ZWxlZEdhdW50bGV0XCIsXG4gICAgXCJuYW1lXCI6IFwiSmV3ZWxlZCBHYXVudGxldFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcIm5lZWRsZXNzbHktbGFyZ2Utcm9kXCIsXG4gICAgICBcInNwYXJyaW5nLWdsb3Zlc1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBQcmVjaXNpb24uXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fSmV3ZWxlZEdhdW50bGV0LlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIndpdHMtZW5kXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfV2l0c0VuZFwiLFxuICAgIFwibmFtZVwiOiBcIldpdCdzIEVuZFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJBdHRhY2tzIGRlYWwgQFRGVFVuaXRQcm9wZXJ0eS5pdGVtOlRGVF9JdGVtX0FydGlmYWN0X1dpdHNFbmRfRGFtYWdlQCBib251cyBtYWdpYyBkYW1hZ2UuSGVhbHMgdGhlIGhvbGRlciBmb3IgQFBlcmNlbnRIZWFsaW5nQCUgb2YgYWxsIG1hZ2ljIGRhbWFnZSBkZWFsdC5EYW1hZ2UgaW5jcmVhc2VzIGJhc2VkIG9uIFN0YWdlLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X1dpdHNFbmQuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaG9yaXpvbi1mb2N1c1wiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0hvcml6b25Gb2N1c1wiLFxuICAgIFwibmFtZVwiOiBcIkhvcml6b24gRm9jdXNcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiU3R1bm5pbmcgYW4gZW5lbXkgY2F1c2VzIGxpZ2h0bmluZyB0byBzdHJpa2UgdGhlbSwgZGVhbGluZyBAUGVyY2VudEhlYWx0aERhbWFnZUAlIG9mIHRoZWlyIG1heCBIZWFsdGggYXMgbWFnaWMgZGFtYWdlLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X0hvcml6b25Gb2N1cy5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYW5kdWlucy1vbWVuXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNF9JdGVtX09ybm5SYW5kdWluc1NhbmN0dW1cIixcbiAgICBcIm5hbWVcIjogXCJSYW5kdWluJ3MgT21lblwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgc3RhcnQ6IEdyYW50ICBAQm9udXNEZWZlbnNlQCBBcm1vciBhbmQgIEBCb251c0RlZmVuc2VAIE1hZ2ljIFJlc2lzdGFuY2UgdG8gdGhlIGhvbGRlciBhbmQgYWRqYWNlbnQgYWxsaWVzLuKAi+KAi1tTdXBwb3J0IGl0ZW1dXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNF9JdGVtX09ybm5SYW5kdWluc1NhbmN0dW0uVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic3RlYWRmYXN0LWhlYXJ0XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fTmlnaHRIYXJ2ZXN0ZXJcIixcbiAgICBcIm5hbWVcIjogXCJTdGVhZGZhc3QgSGVhcnRcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJjaGFpbi12ZXN0XCIsXG4gICAgICBcInNwYXJyaW5nLWdsb3Zlc1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBAQmFzZUR1cmFiaWxpdHkqMTAwQCUgRHVyYWJpbGl0eS4gV2hpbGUgYWJvdmUgQFRocmVzaG9sZEZvckVtcG93ZXIqMTAwQCUgSGVhbHRoLCBpbnN0ZWFkIGdhaW4gQEVtcG93ZXJlZER1cmFiaWxpdHkqMTAwQCUgRHVyYWJpbGl0eS5AVEZUVW5pdFByb3BlcnR5LjpURlRfQXVnbWVudF9XYXJtb2dzQnVja2xlX1RSQUtleUBcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9OaWdodEhhcnZlc3Rlci5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJwcm93bGVycy1jbGF3XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfUHJvd2xlcnNDbGF3XCIsXG4gICAgXCJuYW1lXCI6IFwiUHJvd2xlcidzIENsYXdcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiQWZ0ZXIga2lsbGluZyBhIHRhcmdldCwgc2hlZCBuZWdhdGl2ZSBlZmZlY3RzIGFuZCBkYXNoIHRvIHRoZSBmYXJ0aGVzdCB0YXJnZXQgd2l0aGluIEBIZXhSYW5nZUAgaGV4ZXMuIFRoZSBuZXh0IDIgY3JpdGljYWwgYXR0YWNrcyBkZWFsIEBDcml0RGFtYWdlQm9udXNQZXJjZW50QCUgYm9udXMgQ3JpdGljYWwgU3RyaWtlIERhbWFnZS5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9Qcm93bGVyc0NsYXcuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGFjdGljaWFucy1jcm93blwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0ZvcmNlT2ZOYXR1cmVcIixcbiAgICBcIm5hbWVcIjogXCJUYWN0aWNpYW4ncyBDcm93blwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcInNwYXR1bGFcIixcbiAgICAgIFwic3BhdHVsYVwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiWW91ciB0ZWFtIGdhaW5zICtATWF4QXJteVNpemVJbmNyZWFzZUAgbWF4IHRlYW0gc2l6ZS5AUGVyY2VudEdvbGRDaGFuY2VAJSBjaGFuY2UgdG8gZHJvcCAxIGdvbGQgd2hlbiB5b3Ugd2luIGNvbWJhdC5cXFwiLi4udGhlIEhlYXJ0IG9mIGEgaGVyby4uLlxcXCJcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9Gb3JjZU9mTmF0dXJlLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInF1aWNrc2lsdmVyXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fUXVpY2tzaWx2ZXJcIixcbiAgICBcIm5hbWVcIjogXCJRdWlja3NpbHZlclwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcInNwYXJyaW5nLWdsb3Zlc1wiLFxuICAgICAgXCJuZWdhdHJvbi1jbG9ha1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IFN0YXJ0OiBHYWluIGltbXVuaXR5IHRvIGNyb3dkIGNvbnRyb2wgZm9yIEBTcGVsbFNoaWVsZER1cmF0aW9uQCBzZWNvbmRzLkdhaW4gQFByb2NBdHRhY2tTcGVlZCoxMDBAJSBzdGFja2luZyBBdHRhY2sgU3BlZWQgZXZlcnkgc2Vjb25kLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX1F1aWNrc2lsdmVyLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImRlYXRoYmxhZGVcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9EZWF0aGJsYWRlXCIsXG4gICAgXCJuYW1lXCI6IFwiRGVhdGhibGFkZVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcImJmLXN3b3JkXCIsXG4gICAgICBcImJmLXN3b3JkXCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxuICAgIFwic3RhdHNcIjogXCJQZXJmZWN0IHBlYWNlIGFuZCBjYWxtIGZvciB0aGUgaG9sZGVyIC0gYW5kIGFsbCB3aG8gZmFjZSBpdC5AVEZUVW5pdFByb3BlcnR5LjpURlRfQXVnbWVudF9UcmFnaWNhbEJsYWRlX1RSQUtleUBcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9EZWF0aGJsYWRlLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInZvaWQtZ2F1bnRsZXRcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9Wb2lkR2F1bnRsZXRcIixcbiAgICBcIm5hbWVcIjogXCJWb2lkIEdhdW50bGV0XCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBzdGFydDogU3RvcmUgQEluaXRpYWxQZXJjZW50SGVhbHRoU3RvcmUqMTAwQCUgbWF4IEhlYWx0aCBhbmQgQFBlcmNlbnRIZWFsdGhTdG9yZSoxMDBAJSBtb3JlIGV2ZXJ5IHNlY29uZC4gT24gZGVhdGgsIHVubGVhc2ggdGhlIHN0b3JlZCBIZWFsdGggYXMgbWFnaWMgZGFtYWdlIHNwbGl0IGJldHdlZW4gZW5lbWllcyB3aXRoaW4gQEhleFJhZGl1c0AtaGV4ZXMuW1VuaXF1ZSAtIG9ubHkgMSBwZXIgY2hhbXBpb25dXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTZfQXJ0aWZhY3RfVm9pZEdhdW50bGV0LlRGVF9TZXQxNi50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNpbHZlcm1lcmUtZGF3blwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X1NpbHZlcm1lcmVEYXduXCIsXG4gICAgXCJuYW1lXCI6IFwiU2lsdmVybWVyZSBEYXduXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXG4gICAgXCJzdGF0c1wiOiBcIkdyYW50cyBpbW11bml0eSB0byBTdHVucyBhbmQgdGhlIGhvbGRlcidzIGF0dGFja3MgU3R1biB0aGUgdGFyZ2V0IGZvciBAU3R1bkR1cmF0aW9uQCBzZWNvbmRzLlRoZSBob2xkZXIncyBBdHRhY2sgU3BlZWQgaXMgbG9ja2VkIGF0IEBBdHRhY2tTcGVlZENhcEAuXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJ0aWZhY3RfU2lsdmVybWVyZURhd24uVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGFjdGljaWFucy1zaGllbGRcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9UYWN0aWNpYW5zU2NlcHRlclwiLFxuICAgIFwibmFtZVwiOiBcIlRhY3RpY2lhbidzIFNoaWVsZFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcImZyeWluZy1wYW5cIixcbiAgICAgIFwiZnJ5aW5nLXBhblwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiWW91ciB0ZWFtIGdhaW5zICtATWF4QXJteVNpemVJbmNyZWFzZUAgbWF4IHRlYW0gc2l6ZS5AUGVyY2VudEdvbGRDaGFuY2VAJSBjaGFuY2UgdG8gZHJvcCAxIGdvbGQgd2hlbiB0aGUgaG9sZGVyIGRpZXMuXFxcIkltYnVlZCB3aXRoIGEgUGhpbG9zb3BoZXIncyB3aXNkb20uLi5cXFwiXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fVGFjdGljaWFuc1NjZXB0ZXIuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwid2FybW9ncy1hcm1vclwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX1dhcm1vZ3NBcm1vclwiLFxuICAgIFwibmFtZVwiOiBcIldhcm1vZydzIEFybW9yXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiZ2lhbnRzLWJlbHRcIixcbiAgICAgIFwiZ2lhbnRzLWJlbHRcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQEJvbnVzUGVyY2VudEhQKjEwMEAlIG1heCBIZWFsdGguXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fV2FybW9nc0FybW9yLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNlZWtlcnMtYXJtZ3VhcmRcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9TZWVrZXJzQXJtZ3VhcmRcIixcbiAgICBcIm5hbWVcIjogXCJTZWVrZXIncyBBcm1ndWFyZFwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJUYWtlZG93bnMgaW5jcmVhc2UgdGhlIGhvbGRlcidzIEFybW9yLCBNYWdpYyBSZXNpc3QsIGFuZCBBYmlsaXR5IFBvd2VyIGJ5IEBTdGF0c1BlclRha2Vkb3duQC5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9TZWVrZXJzQXJtZ3VhcmQuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidm9pZC1zdGFmZlwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX1N0YXRpa2tTaGl2XCIsXG4gICAgXCJuYW1lXCI6IFwiVm9pZCBTdGFmZlwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcInJlY3VydmUtYm93XCIsXG4gICAgICBcInRlYXItb2YtZ29kZGVzc1wiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwiRGFtYWdlIGZyb20gYXR0YWNrcyBhbmQgQWJpbGl0aWVzIEBNUlNocmVkQCUgU2hyZWQgdGhlIHRhcmdldCBmb3IgQE1SU2hyZWREdXJhdGlvbkAgc2Vjb25kcy4gVGhpcyBlZmZlY3QgZG9lcyBub3Qgc3RhY2suU2hyZWQ6IFJlZHVjZSBNYWdpYyBSZXNpc3RcIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9Wb2lkU3RhZmYuVEZUX1RGVDE0XzUudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJnb2xkLWNvbGxlY3RvclwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDRfSXRlbV9Pcm5uVGhlQ29sbGVjdG9yXCIsXG4gICAgXCJuYW1lXCI6IFwiR29sZCBDb2xsZWN0b3JcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcbiAgICBcInN0YXRzXCI6IFwiQXR0YWNrcyBhbmQgQWJpbGl0aWVzIGV4ZWN1dGUgZW5lbWllcyBiZWxvdyBARXhlY3V0ZVBlcmNlbnRAJSBvZiB0aGVpciBtYXhpbXVtIEhlYWx0aC4gRXhlY3V0aW9ucyBoYXZlIGEgQEdvbGRDaGFuY2VAJSBjaGFuY2UgdG8gZHJvcCAgMSBnb2xkLkdvbGQgQ29sbGVjdGVkOiBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUX1RyYWNrZXJfVmFsdWUxQGdbVW5pcXVlIC0gb25seSAxIHBlciBjaGFtcGlvbl1cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ0X0l0ZW1fT3JublRoZUNvbGxlY3Rvci5URlRfU2V0MTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJjYXBwYS1qdWljZVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0NhcHBhSnVpY2VcIixcbiAgICBcIm5hbWVcIjogXCJDYXBwYSBKdWljZVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGRvbnMgYSBIYXQgb24gZWFjaCB0YWtlZG93bi4gVGhlIGhvbGRlciBnYWlucyBAQURBUFBlclRha2Vkb3duQCUgQXR0YWNrIERhbWFnZSBhbmQgQWJpbGl0eSBQb3dlciBwZXIgSGF0LiBPbiBkZWF0aCBsb3NlIEBQZXJjZW50SGF0TG9zcyoxMDBAJSBvZiBhbGwgSGF0cy4mbmJzcDsoSGF0czombmJzcDtAVEZUVW5pdFByb3BlcnR5LnRyYWl0OlRGVF9JdGVtX0FydGlmYWN0X0NhcHBhSnVpY2VfTnVtSGF0c0ApXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTZfQXJ0aWZhY3RfS2FwcGFKdWljZS5URlRfU2V0MTYudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJoZXh0ZWNoLWd1bmJsYWRlXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fSGV4dGVjaEd1bmJsYWRlXCIsXG4gICAgXCJuYW1lXCI6IFwiSGV4dGVjaCBHdW5ibGFkZVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICBcImJmLXN3b3JkXCIsXG4gICAgICBcIm5lZWRsZXNzbHktbGFyZ2Utcm9kXCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxuICAgIFwic3RhdHNcIjogXCJIZWFsIHRoZSBsb3dlc3QgcGVyY2VudCBIZWFsdGggYWxseSBmb3IgQEFsbHlIZWFsaW5nKjEwMEAlIG9mIGRhbWFnZSBkZWFsdC5BbGx5IEhlYWxpbmc6IEBURlRVbml0UHJvcGVydHkuaXRlbTpURlRfVHJhY2tlcl9WYWx1ZTFAXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fSGV4dGVjaEd1bmJsYWRlLlRGVF9TZXQxMy50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1lc3Rhcmd1YXJkaWFuc3BhdHVsYWl0ZW1cIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQzX0l0ZW1fU3Rhckd1YXJkaWFuU3BhdHVsYUl0ZW1cIixcbiAgICBcIm5hbWVcIjogXCJ0ZnRfaXRlbV9uYW1lX1N0YXJHdWFyZGlhblNwYXR1bGFJdGVtXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwidGVhci1vZi1nb2RkZXNzXCIsXG4gICAgICBcInNwYXR1bGFcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX1N0YXJHdWFyZGlhblNwYXR1bGFJdGVtXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9URlQzX0l0ZW1fU3Rhckd1YXJkaWFuLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWV1bWJyYWxnbGFpdmVcIixcbiAgICBcImFwaU5hbWVcIjogXCJURlQzX0l0ZW1fQmxhZGVtYXN0ZXJTcGF0dWxhSXRlbVwiLFxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfVW1icmFsR2xhaXZlXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwiYmYtc3dvcmRcIixcbiAgICAgIFwic3BhdHVsYVwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fU2xpY2VyU3BhdHVsYUl0ZW1cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL1RGVDNfSXRlbV9CbGFkZW1hc3Rlci50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1laW5maWx0cmF0b3JzcGF0dWxhaXRlbVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDNfSXRlbV9JbmZpbHRyYXRvclNwYXR1bGFJdGVtXCIsXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9JbmZpbHRyYXRvclNwYXR1bGFJdGVtXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgIFwicmVjdXJ2ZS1ib3dcIixcbiAgICAgIFwic3BhdHVsYVwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fSW5maWx0cmF0b3JTcGF0dWxhSXRlbVwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvVEZUM19JdGVtX0luZmlsdHJhdG9yLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVjZWxlc3RpYWxzcGF0dWxhaXRlbVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDNfSXRlbV9DZWxlc3RpYWxTcGF0dWxhSXRlbVwiLFxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfQ2VsZXN0aWFsU3BhdHVsYUl0ZW1cIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJzcGF0dWxhXCIsXG4gICAgICBcIm5lZ2F0cm9uLWNsb2FrXCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9DZWxlc3RpYWxTcGF0dWxhSXRlbVwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvVEZUM19JdGVtX0NlbGVzdGlhbC50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInByb3RlY3RvcnMtY2hlc3RndWFyZFwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDNfSXRlbV9Qcm90ZWN0b3JTcGF0dWxhSXRlbVwiLFxuICAgIFwibmFtZVwiOiBcIlByb3RlY3RvcidzIENoZXN0Z3VhcmRcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJzcGF0dWxhXCIsXG4gICAgICBcImdpYW50cy1iZWx0XCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBQcm90ZWN0b3IgdHJhaXQuW1VuaXF1ZSAtIG9ubHkgMSBwZXIgY2hhbXBpb25dXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9URlQzX0l0ZW1fUHJvdGVjdG9yLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVkYXJrc3RhcnNwYXR1bGFpdGVtXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUM19JdGVtX0RhcmtTdGFyU3BhdHVsYUl0ZW1cIixcbiAgICBcIm5hbWVcIjogXCJ0ZnRfaXRlbV9uYW1lX0RhcmtTdGFyU3BhdHVsYUl0ZW1cIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJzcGFycmluZy1nbG92ZXNcIixcbiAgICAgIFwic3BhdHVsYVwiXG4gICAgXSxcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fRGFya1N0YXJTcGF0dWxhSXRlbVwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvVEZUM19JdGVtX0RhcmtTdGFyLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVyZWJlbHNwYXR1bGFpdGVtXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUM19JdGVtX1JlYmVsU3BhdHVsYUl0ZW1cIixcbiAgICBcIm5hbWVcIjogXCJ0ZnRfaXRlbV9uYW1lX1JlYmVsU3BhdHVsYUl0ZW1cIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJjaGFpbi12ZXN0XCIsXG4gICAgICBcInNwYXR1bGFcIlxuICAgIF0sXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX1JlYmVsU3BhdHVsYUl0ZW1cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL1RGVDNfSXRlbV9SZWJlbC50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImJhdHRsZWNhc3QtcGxhdGluZ1wiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDNfSXRlbV9CYXR0bGVjYXN0U3BhdHVsYUl0ZW1cIixcbiAgICBcIm5hbWVcIjogXCJCYXR0bGVjYXN0IFBsYXRpbmdcIixcbiAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgXCJuZWVkbGVzc2x5LWxhcmdlLXJvZFwiLFxuICAgICAgXCJzcGF0dWxhXCJcbiAgICBdLFxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxuICAgIFwic3RhdHNcIjogXCJUaGUgd2VhcmVyIGdhaW5zIHRoZSBCYXR0bGVjYXN0IHRyYWl0LltVbmlxdWUgLSBPbmx5IE9uZSBQZXIgQ2hhbXBpb25dXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9URlRfSXRlbV9CYXR0bGVjYXN0LnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVyYWRpYW50c3BhdHVsYVwiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9TcGF0dWxhUmFkaWFudFwiLFxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfUmFkaWFudFNwYXR1bGFcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9SYWRpYW50U3BhdHVsYVwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TcGF0dWxhX1JhZGlhbnQudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYWRpYW50LXJlZmFjdG9yXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTFfQXVnbWVudF9SYWRpYW50UmVmYWN0b3JcIixcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IFJlZmFjdG9yXCIsXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBhIE1hc3RlcndvcmsgVXBncmFkZSBhbmQgQGFudmlsc0AgY29tcG9uZW50IGFudmlsLk1hc3RlcndvcmsgVXBncmFkZSB1cGdyYWRlcyBhbiBpdGVtIHRvIFJhZGlhbnQhXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0F1Z21lbnRzL0hleGNvcmUvUmFkaWFudFJlZmFjdG9yX0lJSS50ZXhcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImFydGlmYWN0b3J5XCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0F1Z21lbnRfQXJ0aWZhY3RvcnlcIixcbiAgICBcIm5hbWVcIjogXCJBcnRpZmFjdG9yeVwiLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxuICAgIFwic3RhdHNcIjogXCJBdCB0aGUgc3RhcnQgb2YgZWFjaCB0dXJuLCB5b3VyIGJlbmNoZWQgY29tcGxldGVkIGl0ZW1zIHRyYW5zZm9ybSBpbnRvIGEgcmFuZG9tIEFydGlmYWN0IGl0ZW0uIEdhaW4gQE51bUl0ZW1zQCBBcnRpZmFjdCBBbnZpbCBhbmQgQE51bVJlbW92ZXJzQCBSZW1vdmVycy5cIixcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvSGV4Y29yZS9BcnRpZmFjdG9yeV9JSUkuVEZUX1NldDEzLnRleFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicGFuZG9yYXMtaXRlbXMtaWlpXCIsXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUOV9BdWdtZW50X1BhbmRvcmFzUmFkaWFudEJveFwiLFxuICAgIFwibmFtZVwiOiBcIlBhbmRvcmEncyBJdGVtcyBJSUlcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJSb3VuZCBzdGFydDogaXRlbXMgb24geW91ciBiZW5jaCBhcmUgcmFuZG9taXplZC4gR2FpbiAxIHJhbmRvbSBSYWRpYW50IGl0ZW0uXCIsXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0F1Z21lbnRzL0hleGNvcmUvUGFuZG9yYTMudGV4XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYWRpYW50LXJlbGljc1wiLFxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDZfQXVnbWVudF9SYWRpYW50UmVsaWNzXCIsXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBSZWxpY3NcIixcbiAgICBcImNvbXBvbmVudHNcIjogW10sXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxuICAgIFwic3RhdHNcIjogXCJDaG9vc2UgMSBvZiBAQXJtb3J5Q2hvaWNlQ291bnRAIFJhZGlhbnQgaXRlbXMuIEdhaW4gYSBNYWduZXRpYyBSZW1vdmVyLlJhZGlhbnQgaXRlbXMgYXJlIHZlcnkgcG93ZXJmdWwgdmVyc2lvbnMgb2YgY29tcGxldGVkIGl0ZW1zLlwiLFxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy9IZXhjb3JlL1JhZGlhbnRSZWxpYy1JSUkudGV4XCJcbiAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IGl0ZW1NYXAgPSBuZXcgTWFwKGl0ZW1zLm1hcChpID0+IFtpLmlkLCBpXSkpO1xuXG4vLyBhcGlOYW1lIOKGkiBpZCBsb29rdXAsIHVzZWQgd2hlbiBtYXBwaW5nIGV4dGVybmFsIHRpZXItbGlzdCBkYXRhIChSaW90L2NkcmFnb25cbi8vIGFwaU5hbWVzIGxpa2UgXCJURlRfSXRlbV9BcnRpZmFjdF9Qcm93bGVyc0NsYXdcIikgb250byBvdXIga2ViYWItY2FzZSBpZHMuXG5leHBvcnQgY29uc3QgaXRlbUJ5QXBpTmFtZSA9IG5ldyBNYXAoaXRlbXMuZmlsdGVyKGkgPT4gaS5hcGlOYW1lKS5tYXAoaSA9PiBbaS5hcGlOYW1lISwgaV0pKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENyYWZ0YWJsZUl0ZW0oY29tcDE6IHN0cmluZywgY29tcDI6IHN0cmluZyk6IEl0ZW0gfCB1bmRlZmluZWQge1xuICByZXR1cm4gaXRlbXMuZmluZChpdGVtID0+XG4gICAgaXRlbS5jb21wb25lbnRzICYmXG4gICAgKChpdGVtLmNvbXBvbmVudHNbMF0gPT09IGNvbXAxICYmIGl0ZW0uY29tcG9uZW50c1sxXSA9PT0gY29tcDIpIHx8XG4gICAgIChpdGVtLmNvbXBvbmVudHNbMF0gPT09IGNvbXAyICYmIGl0ZW0uY29tcG9uZW50c1sxXSA9PT0gY29tcDEpKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRDcmFmdGluZ01hdHJpeCgpOiBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBJdGVtPj4ge1xuICBjb25zdCBtYXRyaXggPSBuZXcgTWFwPHN0cmluZywgTWFwPHN0cmluZywgSXRlbT4+KCk7XG4gIGZvciAoY29uc3QgY29tcCBvZiBjb21wb25lbnRzKSBtYXRyaXguc2V0KGNvbXAuaWQsIG5ldyBNYXAoKSk7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGlmICghaXRlbS5jb21wb25lbnRzIHx8IGl0ZW0uY29tcG9uZW50cy5sZW5ndGggIT09IDIpIGNvbnRpbnVlO1xuICAgIGNvbnN0IFtjMSwgYzJdID0gaXRlbS5jb21wb25lbnRzO1xuICAgIG1hdHJpeC5nZXQoYzEpPy5zZXQoYzIsIGl0ZW0pO1xuICAgIGlmIChjMSAhPT0gYzIpIG1hdHJpeC5nZXQoYzIpPy5zZXQoYzEsIGl0ZW0pO1xuICB9XG4gIHJldHVybiBtYXRyaXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtc0Zyb21Db21wb25lbnQoY29tcG9uZW50SWQ6IHN0cmluZyk6IEl0ZW1bXSB7XG4gIHJldHVybiBpdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmNvbXBvbmVudHMgJiYgaXRlbS5jb21wb25lbnRzLmxlbmd0aCA9PT0gMiAmJiAoaXRlbS5jb21wb25lbnRzIGFzIHN0cmluZ1tdKS5pbmNsdWRlcyhjb21wb25lbnRJZCkpO1xufVxuIiwiLy8gUGl2b3RURlQgLSBTZXQgMTcgUG9zaXRpb25pbmcgQm9hcmRzXG4vLyBURlQgYm9hcmQgaXMgNCByb3dzIHggNyBjb2x1bW5zID0gMjggaGV4ZXMgKHJvd3MgMC0zLCBjb2xzIDAtNilcbi8vIEhleCBsYXlvdXQ6IGV2ZW4gcm93cyBzdGFydCBmbHVzaCwgb2RkIHJvd3Mgb2Zmc2V0IHJpZ2h0IGJ5IDAuNVxuXG5leHBvcnQgaW50ZXJmYWNlIEhleFBsYWNlbWVudCB7XG4gIHJvdzogbnVtYmVyOyAgIC8vIDA9YmFjaywgMz1mcm9udFxuICBjb2w6IG51bWJlcjsgICAvLyAwLTZcbiAgY2hhbXBpb25JZDogc3RyaW5nO1xuICByb2xlOiAnY2FycnknIHwgJ3RhbmsnIHwgJ3N1cHBvcnQnIHwgJ2Fzc2Fzc2luJztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQb3NpdGlvbmluZ0d1aWRlIHtcbiAgY29tcElkOiBzdHJpbmc7XG4gIHBsYWNlbWVudHM6IEhleFBsYWNlbWVudFtdO1xuICBub3Rlczogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgcG9zaXRpb25pbmdHdWlkZXM6IFBvc2l0aW9uaW5nR3VpZGVbXSA9IFtcbiAgLy8gPT09PT0gUyBUSUVSID09PT09XG4gIHtcbiAgICBjb21wSWQ6ICdtb3JnYW5hLWRhcmstbGFkeScsXG4gICAgcGxhY2VtZW50czogW1xuICAgICAgeyByb3c6IDMsIGNvbDogMSwgY2hhbXBpb25JZDogJ1RGVDE3X01vcmRla2Fpc2VyJywgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMywgY29sOiAyLCBjaGFtcGlvbklkOiAnVEZUMTdfU2hlbicsICAgICAgICByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAzLCBjb2w6IDMsIGNoYW1waW9uSWQ6ICdURlQxN19MaXNzYW5kcmEnLCAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgICAgeyByb3c6IDEsIGNvbDogMywgY2hhbXBpb25JZDogJ1RGVDE3X0thcm1hJywgICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiAwLCBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZ2FuYScsICAgICByb2xlOiAnY2FycnknIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiA1LCBjaGFtcGlvbklkOiAnVEZUMTdfVmV4JywgICAgICAgICByb2xlOiAnY2FycnknIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiA2LCBjaGFtcGlvbklkOiAnVEZUMTdfSmhpbicsICAgICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICBdLFxuICAgIG5vdGVzOiAnTW9yZ2FuYSBvcHBvc2l0ZS1jb3JuZXIgZnJvbSBlbmVteSBjYXJyeS4gU2hlbiBmcm9udGxpbmUtY2VudGVyIGZvciBCdWx3YXJrIHNoaWVsZC4gVmV4ICsgSmhpbiBzZWNvbmRhcnkgYmFja2xpbmUgcHJlc3N1cmUuJ1xuICB9LFxuICB7XG4gICAgY29tcElkOiAnamhpbi1kYXJrLXN0YXItc25pcGVycycsXG4gICAgcGxhY2VtZW50czogW1xuICAgICAgeyByb3c6IDMsIGNvbDogMSwgY2hhbXBpb25JZDogJ1RGVDE3X01vcmRla2Fpc2VyJywgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMywgY29sOiAyLCBjaGFtcGlvbklkOiAnVEZUMTdfTGlzc2FuZHJhJywgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAzLCBjb2w6IDMsIGNoYW1waW9uSWQ6ICdURlQxN19TaGVuJywgICAgICAgIHJvbGU6ICd0YW5rJyB9LFxuICAgICAgeyByb3c6IDIsIGNvbDogNSwgY2hhbXBpb25JZDogJ1RGVDE3X0thcm1hJywgICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiAwLCBjaGFtcGlvbklkOiAnVEZUMTdfSmhpbicsICAgICAgICByb2xlOiAnY2FycnknIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiAxLCBjaGFtcGlvbklkOiAnVEZUMTdfWGF5YWgnLCAgICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAwLCBjb2w6IDUsIGNoYW1waW9uSWQ6ICdURlQxN19FenJlYWwnLCAgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogNiwgY2hhbXBpb25JZDogJ1RGVDE3X0duYXInLCAgICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgXSxcbiAgICBub3RlczogJ1NuaXBlcnMgc3RhY2tlZCBhY3Jvc3MgdGhlIGJhY2sgcm93IGZvciBtYXggcmFuZ2UuIEZyb250bGluZSBhYnNvcmJzIHdoaWxlIEpoaW4gcmVhY2hlcyBoaXMgZm91cnRoIHNob3QuJ1xuICB9LFxuICB7XG4gICAgY29tcElkOiAneGF5YWgtc3RhcmdhemVyJyxcbiAgICBwbGFjZW1lbnRzOiBbXG4gICAgICB7IHJvdzogMywgY29sOiAxLCBjaGFtcGlvbklkOiAnVEZUMTdfSmF4JywgICAgICAgICByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAzLCBjb2w6IDIsIGNoYW1waW9uSWQ6ICdURlQxN19OdW51JywgICAgICAgIHJvbGU6ICd0YW5rJyB9LFxuICAgICAgeyByb3c6IDIsIGNvbDogNCwgY2hhbXBpb25JZDogJ1RGVDE3X1RhbG9uJywgICAgICAgcm9sZTogJ2Fzc2Fzc2luJyB9LFxuICAgICAgeyByb3c6IDEsIGNvbDogMCwgY2hhbXBpb25JZDogJ1RGVDE3X0x1bHUnLCAgICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMSwgY29sOiA1LCBjaGFtcGlvbklkOiAnVEZUMTdfVHdpc3RlZEZhdGUnLCByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAwLCBjb2w6IDYsIGNoYW1waW9uSWQ6ICdURlQxN19YYXlhaCcsICAgICAgIHJvbGU6ICdjYXJyeScgfSxcbiAgICAgIHsgcm93OiAwLCBjb2w6IDUsIGNoYW1waW9uSWQ6ICdURlQxN19DYWl0bHluJywgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogMCwgY2hhbXBpb25JZDogJ1RGVDE3X01pbGlvJywgICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgXSxcbiAgICBub3RlczogJ1hheWFoIGJhY2stY29ybmVyIG9wcG9zaXRlIGVuZW15IGNhcnJ5LiBKYXggKyBOdW51IGZyb250bGluZSBmb3IgQmFzdGlvbiAvIFN0YXJnYXplciBoZXhlcy4gTWlsaW8gc2FmZSBjb3JuZXIgZm9yIHNoaWVsZGluZy4nXG4gIH0sXG5cbiAgLy8gPT09PT0gQSBUSUVSID09PT09XG4gIHtcbiAgICBjb21wSWQ6ICdwcmltb3JkaWFuLXJlcm9sbCcsXG4gICAgcGxhY2VtZW50czogW1xuICAgICAgeyByb3c6IDMsIGNvbDogMCwgY2hhbXBpb25JZDogJ1RGVDE3X01hb2thaScsICByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAzLCBjb2w6IDIsIGNoYW1waW9uSWQ6ICdURlQxN19SZWtTYWknLCAgcm9sZTogJ2NhcnJ5JyB9LFxuICAgICAgeyByb3c6IDMsIGNvbDogMywgY2hhbXBpb25JZDogJ1RGVDE3X0JyaWFyJywgICByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAyLCBjb2w6IDEsIGNoYW1waW9uSWQ6ICdURlQxN19CZWx2ZXRoJywgcm9sZTogJ2NhcnJ5JyB9LFxuICAgICAgeyByb3c6IDIsIGNvbDogNSwgY2hhbXBpb25JZDogJ1RGVDE3X0lsbGFvaScsICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAxLCBjb2w6IDAsIGNoYW1waW9uSWQ6ICdURlQxN19BdXJvcmEnLCAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgXSxcbiAgICBub3RlczogXCJSZWsnU2FpIGZyb250bGluZS1jZW50ZXIgZm9yIG1heCBhZ2dyby4gQmVsJ1ZldGggcm93IGJlaGluZCB0byBjbGVhbiB1cC4gQXVyb3JhIGJhY2sgY29ybmVyIGZvciBBbmltYSB0cmFpdC5cIlxuICB9LFxuICB7XG4gICAgY29tcElkOiAnbWVjaGEtYXNvbCcsXG4gICAgcGxhY2VtZW50czogW1xuICAgICAgeyByb3c6IDMsIGNvbDogMSwgY2hhbXBpb25JZDogJ1RGVDE3X0dhbGlvJywgICAgICAgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMywgY29sOiAyLCBjaGFtcGlvbklkOiAnVEZUMTdfVXJnb3QnLCAgICAgICByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAzLCBjb2w6IDMsIGNoYW1waW9uSWQ6ICdURlQxN19Nb3JkZWthaXNlcicsIHJvbGU6ICd0YW5rJyB9LFxuICAgICAgeyByb3c6IDMsIGNvbDogNCwgY2hhbXBpb25JZDogJ1RGVDE3X0JsaXR6Y3JhbmsnLCAgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMSwgY29sOiAzLCBjaGFtcGlvbklkOiAnVEZUMTdfQXVyZWxpb25Tb2wnLCByb2xlOiAnY2FycnknIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiAwLCBjaGFtcGlvbklkOiAnVEZUMTdfS2FybWEnLCAgICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAwLCBjb2w6IDUsIGNoYW1waW9uSWQ6ICdURlQxN19WaWt0b3InLCAgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogNiwgY2hhbXBpb25JZDogJ1RGVDE3X0JhcmQnLCAgICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgXSxcbiAgICBub3RlczogJ0FTb2wgbWlkLWJvYXJkIGZvciBtYXggQW9FLiBCbGl0emNyYW5rIHB1bGxzIHByaW9yaXR5IHRhcmdldHMuIDQgTWVjaGEgZnJvbnRsaW5lIHRhbmtzIHRoZSBidXJzdC4nXG4gIH0sXG4gIHtcbiAgICBjb21wSWQ6ICd6ZWQtZ2FsYXh5LWh1bnRlcicsXG4gICAgcGxhY2VtZW50czogW1xuICAgICAgeyByb3c6IDMsIGNvbDogMCwgY2hhbXBpb25JZDogJ1RGVDE3X01vcmRla2Fpc2VyJywgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMywgY29sOiAxLCBjaGFtcGlvbklkOiAnVEZUMTdfTGlzc2FuZHJhJywgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAzLCBjb2w6IDIsIGNoYW1waW9uSWQ6ICdURlQxN19TaGVuJywgICAgICAgIHJvbGU6ICd0YW5rJyB9LFxuICAgICAgeyByb3c6IDIsIGNvbDogNiwgY2hhbXBpb25JZDogJ1RGVDE3X0FrYWxpJywgICAgICAgcm9sZTogJ2Fzc2Fzc2luJyB9LFxuICAgICAgeyByb3c6IDEsIGNvbDogNiwgY2hhbXBpb25JZDogJ1RGVDE3X0thcm1hJywgICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiA2LCBjaGFtcGlvbklkOiAnVEZUMTdfWmVkJywgICAgICAgICByb2xlOiAnYXNzYXNzaW4nIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiA1LCBjaGFtcGlvbklkOiAnVEZUMTdfVGFsb24nLCAgICAgICByb2xlOiAnYXNzYXNzaW4nIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiA0LCBjaGFtcGlvbklkOiAnVEZUMTdfS2Fpc2EnLCAgICAgICByb2xlOiAnYXNzYXNzaW4nIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiAwLCBjaGFtcGlvbklkOiAnVEZUMTdfSmhpbicsICAgICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICBdLFxuICAgIG5vdGVzOiAnUm9ndWUgc3RhY2sgYmFjay1yaWdodCBjb3JuZXIgdG8gZGl2ZSBlbmVteSBjYXJyeS4gRnJvbnRsaW5lIG9wcG9zaXRlIHNpZGUgYmFpdHMgYWdncm8uIEpoaW4gbG9uZS1jb3JuZXIgRFBTLidcbiAgfSxcblxuICAvLyA9PT09PSBCIFRJRVIgPT09PT1cbiAge1xuICAgIGNvbXBJZDogJ3BzaW9uaWMtcHlrZS1yZXJvbGwnLFxuICAgIHBsYWNlbWVudHM6IFtcbiAgICAgIHsgcm93OiAzLCBjb2w6IDEsIGNoYW1waW9uSWQ6ICdURlQxN19HcmFnYXMnLCAgIHJvbGU6ICd0YW5rJyB9LFxuICAgICAgeyByb3c6IDMsIGNvbDogMiwgY2hhbXBpb25JZDogJ1RGVDE3X01hc3RlcllpJywgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMiwgY29sOiAxLCBjaGFtcGlvbklkOiAnVEZUMTdfVmlrdG9yJywgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAxLCBjb2w6IDMsIGNoYW1waW9uSWQ6ICdURlQxN19Tb25hJywgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogNiwgY2hhbXBpb25JZDogJ1RGVDE3X1B5a2UnLCAgICAgcm9sZTogJ2Fzc2Fzc2luJyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogMCwgY2hhbXBpb25JZDogJ1RGVDE3X0thcm1hJywgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgXSxcbiAgICBub3RlczogJ1B5a2UganVtcHMgYmFja2xpbmUuIEdyYWdhcyArIE1hc3RlciBZaSBmcm9udGxpbmUgYWJzb3JiLiBWaWt0b3IgKyBTb25hIFBzaW9uaWMgYW5jaG9ycyBtaWQuJ1xuICB9LFxuICB7XG4gICAgY29tcElkOiAnc29uYS1jb21tYW5kZXInLFxuICAgIHBsYWNlbWVudHM6IFtcbiAgICAgIHsgcm93OiAzLCBjb2w6IDEsIGNoYW1waW9uSWQ6ICdURlQxN19TaGVuJywgICAgICByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAzLCBjb2w6IDIsIGNoYW1waW9uSWQ6ICdURlQxN19JbGxhb2knLCAgICByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAzLCBjb2w6IDMsIGNoYW1waW9uSWQ6ICdURlQxN19MaXNzYW5kcmEnLCByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAyLCBjb2w6IDEsIGNoYW1waW9uSWQ6ICdURlQxN19UZWVtbycsICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAxLCBjb2w6IDQsIGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAxLCBjb2w6IDUsIGNoYW1waW9uSWQ6ICdURlQxN19CYXJkJywgICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAwLCBjb2w6IDAsIGNoYW1waW9uSWQ6ICdURlQxN19Tb25hJywgICAgICByb2xlOiAnY2FycnknIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiA1LCBjaGFtcGlvbklkOiAnVEZUMTdfTGVibGFuYycsICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgXSxcbiAgICBub3RlczogJ1NvbmEgc2FmZSBjb3JuZXIgZm9yIENvbW1hbmRlciBhdXJhIHVwdGltZS4gU2hlcGhlcmQgZnJvbnRsaW5lIHNwcmVhZCBmb3IgbWF4IGhlYWwgY292ZXJhZ2UuJ1xuICB9LFxuXG4gIC8vID09PT09IEMgVElFUiA9PT09PVxuICB7XG4gICAgY29tcElkOiAnYW5pbWEtZmlvcmEnLFxuICAgIHBsYWNlbWVudHM6IFtcbiAgICAgIHsgcm93OiAzLCBjb2w6IDEsIGNoYW1waW9uSWQ6ICdURlQxN19Nb3JkZWthaXNlcicsIHJvbGU6ICd0YW5rJyB9LFxuICAgICAgeyByb3c6IDMsIGNvbDogMiwgY2hhbXBpb25JZDogJ1RGVDE3X0JyaWFyJywgICAgICAgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMywgY29sOiAzLCBjaGFtcGlvbklkOiAnVEZUMTdfQmVsdmV0aCcsICAgICByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAyLCBjb2w6IDIsIGNoYW1waW9uSWQ6ICdURlQxN19Ba2FsaScsICAgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgICAgeyByb3c6IDIsIGNvbDogNCwgY2hhbXBpb25JZDogJ1RGVDE3X0Zpb3JhJywgICAgICAgcm9sZTogJ2NhcnJ5JyB9LFxuICAgICAgeyByb3c6IDEsIGNvbDogNCwgY2hhbXBpb25JZDogJ1RGVDE3X0lsbGFvaScsICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiAwLCBjaGFtcGlvbklkOiAnVEZUMTdfQXVyb3JhJywgICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAwLCBjb2w6IDUsIGNoYW1waW9uSWQ6ICdURlQxN19KaW54JywgICAgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgIF0sXG4gICAgbm90ZXM6ICdGaW9yYSBtaWQtcm93IGZvciBEdWVsaXN0IHJhbmdlIHN0YWNraW5nLiBBbmltYSBmcm9udGxpbmUgdGFua3MgZm9yIGhlci4gQXVyb3JhIG9wcG9zaXRlIGNvcm5lciBzYWZldHkuJ1xuICB9LFxuXTtcblxuLy8gSGVscGVyOiBnZXQgcG9zaXRpb25pbmcgZ3VpZGUgYnkgY29tcCBJRFxuZXhwb3J0IGNvbnN0IGdldFBvc2l0aW9uaW5nR3VpZGUgPSAoY29tcElkOiBzdHJpbmcpOiBQb3NpdGlvbmluZ0d1aWRlIHwgdW5kZWZpbmVkID0+XG4gIHBvc2l0aW9uaW5nR3VpZGVzLmZpbmQocCA9PiBwLmNvbXBJZCA9PT0gY29tcElkKTtcbiIsIi8vIFBpdm90VEZUIC0gU2V0IDE3IHRyYWl0cy4gQXV0by1nZW5lcmF0ZWQgZnJvbSBDb21tdW5pdHlEcmFnb24gKGNkcmFnb24tdGZ0Lmpzb24pLlxyXG4vLyBUbyByZWdlbmVyYXRlOiBydW4gdGhlIGxvY2FsIGdlbmVyYXRlX3RyYWl0cy5weSBzY3JpcHQuXHJcbmltcG9ydCB7IFRyYWl0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjb25zdCB0cmFpdHM6IFRyYWl0W10gPSBbXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfQW5pbWFTcXVhZFwiLFxyXG4gICAgbmFtZTogXCJBbmltYVwiLFxyXG4gICAgZGVzYzogXCJBZnRlciBsb3NpbmcgYSBwbGF5ZXIgY29tYmF0LCBnYWluIEBUZWNoUGVyQ29tYmF0QCBUZWNoLCBwbHVzIGFkZGl0aW9uYWwgVGVjaCBlcXVhbCB0byBAVGVjaFBlckxvc3NAIHRpbWVzIHRoZSBsZW5ndGggb2YgeW91ciBsb3NzIHN0cmVhay4gQWRkaXRpb25hbGx5LCBnYWluIEBUZWNoUGVyS2lsbEAgVGVjaCBwZXIgQW5pbWEgdGFrZWRvd24uPGJyPjxicj5FYWNoIHRpbWUgQW5pbWFzIGdldCBAVGVjaEJyZWFrcG9pbnRAIFRlY2gsIHRoZXkgcHJvdG90eXBlIG5ldyBBbmltYSBXZWFwb25zLiBZb3UgY2FuIHRha2UgdGhlbSwgb3Igc2F2ZSB5b3VyIFRlY2ggdG8gZ2V0IG1vcmUgcG93ZXJmdWwgd2VhcG9ucyBuZXh0IHRpbWUuPGJyPjxicj48cm93PihATWluVW5pdHNAKSBTdGFydCBSZXNlYXJjaGluZyEgPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEFmdGVyIHdpbm5pbmcgYSBwbGF5ZXIgY29tYmF0LCBnYWluIGxvb3QhPC9yb3c+XCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfQW5pbWFUZWNoLlRGVF9TZXQxNy50ZXhcIixcclxuICAgIGVmZmVjdHM6IFt7IG1pblVuaXRzOiAzLCBtYXhVbml0czogNSwgc3R5bGU6IFwiYnJvbnplXCIgfSwgeyBtaW5Vbml0czogNiwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJnb2xkXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19BRE1JTlwiLFxyXG4gICAgbmFtZTogXCJBcmJpdGVyXCIsXHJcbiAgICBkZXNjOiBcIlNjcmliZSBhIHVuaXF1ZSBkaXZpbmUgbGF3LCBhbGxvd2luZyB5b3UgdG8gY2hvb3NlIGFuIGVmZmVjdCB0byBhcHBseSB0byBBcmJpdGVycyB3aGVuIGEgY2hvc2VuIGNhdXNlIG9jY3Vycy48YnI+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIENob29zZSBhIGNhdXNlIGFuZCBlZmZlY3QgZm9yIHlvdXIgbGF3PC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEVmZmVjdHMgYXJlIHN0cm9uZ2VyLiA8L3Jvdz5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl8xN19BcmJpdGVyLlRGVF9TZXQxNy50ZXhcIixcclxuICAgIGVmZmVjdHM6IFt7IG1pblVuaXRzOiAyLCBtYXhVbml0czogMiwgc3R5bGU6IFwiYnJvbnplXCIgfSwgeyBtaW5Vbml0czogMywgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJnb2xkXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19SZXNpc3RUYW5rXCIsXHJcbiAgICBuYW1lOiBcIkJhc3Rpb25cIixcclxuICAgIGRlc2M6IFwiWW91ciB0ZWFtIGdhaW5zIEBUZWFtd2lkZVJlc2lzdHNAIEFybW9yIGFuZCBNYWdpYyBSZXNpc3QuPGJyPjxicj5CYXN0aW9ucyBnYWluIG1vcmUsIGFuZCB0aGUgdmFsdWUgZG91YmxlcyBpbiB0aGUgZmlyc3QgQER1cmF0aW9uQCBzZWNvbmRzIG9mIGNvbWJhdC48YnI+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEBCb251c0FybW9yQCAlaTpzY2FsZUFybW9yJSVpOnNjYWxlTVIlPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEBCb251c0FybW9yQCAlaTpzY2FsZUFybW9yJSVpOnNjYWxlTVIlPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEBCb251c0FybW9yQCAlaTpzY2FsZUFybW9yJSVpOnNjYWxlTVIlOyBOb24tQmFzdGlvbnMgZ2FpbiBhbiBhZGRpdGlvbmFsIEBFbmhhbmNlZFRlYW13aWRlQXJtb3JAICVpOnNjYWxlQXJtb3IlJWk6c2NhbGVNUiUuPC9yb3c+XCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fOV9CYXN0aW9uLnRleFwiLFxyXG4gICAgZWZmZWN0czogW3sgbWluVW5pdHM6IDIsIG1heFVuaXRzOiAzLCBzdHlsZTogXCJicm9uemVcIiB9LCB7IG1pblVuaXRzOiA0LCBtYXhVbml0czogNSwgc3R5bGU6IFwic2lsdmVyXCIgfSwgeyBtaW5Vbml0czogNiwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJnb2xkXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19IUFRhbmtcIixcclxuICAgIG5hbWU6IFwiQnJhd2xlclwiLFxyXG4gICAgZGVzYzogXCJZb3VyIHRlYW0gZ2FpbnMgQFRlYW13aWRlQm9udXMqMTAwQCUgSGVhbHRoLiBCcmF3bGVycyBnYWluIG1vcmUuPGJyPjxicj48ZXhwYW5kUm93PihATWluVW5pdHNAKSArQEhlYWx0aEJvbnVzKjEwMEAlIG1heGltdW0gSGVhbHRoPC9leHBhbmRSb3c+XCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fQnJhd2xlci50ZXhcIixcclxuICAgIGVmZmVjdHM6IFt7IG1pblVuaXRzOiAyLCBtYXhVbml0czogMywgc3R5bGU6IFwiYnJvbnplXCIgfSwgeyBtaW5Vbml0czogNCwgbWF4VW5pdHM6IDUsIHN0eWxlOiBcInNpbHZlclwiIH0sIHsgbWluVW5pdHM6IDYsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwiZ29sZFwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfU2hlblVuaXF1ZVRyYWl0XCIsXHJcbiAgICBuYW1lOiBcIkJ1bHdhcmtcIixcclxuICAgIGRlc2M6IFwiU3VtbW9uIGEgcGxhY2VhYmxlIHJlbGljLiBBdCB0aGUgc3RhcnQgb2YgY29tYmF0LCBpdCBncmFudHMgYWRqYWNlbnQgYWxsaWVzIGEgQFBlcmNlbnRIZWFsdGhTaGllbGQqMTAwQCUgbWF4IEhlYWx0aCBzaGllbGQgYW5kIEBBdHRhY2tTcGVlZCoxMDBAJSBBdHRhY2sgU3BlZWQuXCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfQnVsd2Fyay5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMSwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJ1bmlxdWVcIiB9XSxcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiBcIlRGVDE3X0FTVHJhaXRcIixcclxuICAgIG5hbWU6IFwiQ2hhbGxlbmdlclwiLFxyXG4gICAgZGVzYzogXCJZb3VyIHRlYW0gZ2FpbnMgQFRlYW13aWRlQVMqMTAwQCUgQXR0YWNrIFNwZWVkLiBDaGFsbGVuZ2VycyBnYWluIGJvbnVzIEF0dGFjayBTcGVlZC4gV2hlbiB0aGVpciB0YXJnZXQgZGllcywgQ2hhbGxlbmdlcnMgZGFzaCB0byBhIG5ldyB0YXJnZXQgYW5kIGluY3JlYXNlIHRoZWlyIEF0dGFjayBTcGVlZCBib251cyBieSBAQnVyc3RQZXJjZW50KjEwMEAlIGZvciBAQnVyc3REdXJhdGlvbkAgc2Vjb25kcy48YnI+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEBBdHRhY2tTcGVlZFBlcmNlbnQqMTAwQCUmbmJzcDslaTpzY2FsZUFTJTwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBAQXR0YWNrU3BlZWRQZXJjZW50KjEwMEAlJm5ic3A7JWk6c2NhbGVBUyU8L3Jvdz48YnI+PHJvdz4oQE1pblVuaXRzQCkgQEF0dGFja1NwZWVkUGVyY2VudCoxMDBAJSZuYnNwOyVpOnNjYWxlQVMlPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEBBdHRhY2tTcGVlZFBlcmNlbnQqMTAwQCUmbmJzcDslaTpzY2FsZUFTJTwvcm93PlwiLFxyXG4gICAgaWNvbjogXCJBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXzE3X0NoYWxsZW5nZXIuVEZUX1NldDE3LnRleFwiLFxyXG4gICAgZWZmZWN0czogW3sgbWluVW5pdHM6IDIsIG1heFVuaXRzOiAyLCBzdHlsZTogXCJicm9uemVcIiB9LCB7IG1pblVuaXRzOiAzLCBtYXhVbml0czogMywgc3R5bGU6IFwic2lsdmVyXCIgfSwgeyBtaW5Vbml0czogNCwgbWF4VW5pdHM6IDQsIHN0eWxlOiBcInNpbHZlclwiIH0sIHsgbWluVW5pdHM6IDUsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwiZ29sZFwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfTWlzc0ZvcnR1bmVVbmRldGVybWluZWRUcmFpdFwiLFxyXG4gICAgbmFtZTogXCJDaG9vc2UgVHJhaXRcIixcclxuICAgIGRlc2M6IFwiV2hlbiB5b3UgZmllbGQgTWlzcyBGb3J0dW5lLCBjaG9vc2UgYmV0d2VlbiBDb25kdWl0IE1vZGUsIENoYWxsZW5nZXIgTW9kZSwgYW5kIFJlcGxpY2F0b3IgTW9kZS4gTWlzcyBGb3J0dW5lIGhhcyBhIHVuaXF1ZSBhYmlsaXR5IGJhc2VkIG9uIGhlciBtb2RlIGFuZCBnYWlucyB0aGUgYXNzb2NpYXRlZCB0cmFpdC5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl8xN19NaXNzRm9ydHVuZVVuZGV0ZXJtaW5kZWRUcmFpdC5URlRfU2V0MTcudGV4XCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19Tb25hVW5pcXVlVHJhaXRcIixcclxuICAgIG5hbWU6IFwiQ29tbWFuZGVyXCIsXHJcbiAgICBkZXNjOiBcIihATWluVW5pdHNAKSBTb25hIGdpdmVzIHlvdSBhIHJhbmRvbSBDb21tYW5kIE1vZCBldmVyeSBAUm91bmRzUGVyTW9kQCByb3VuZHMgd2hpY2ggYWxsb3dzIHlvdSB0byBhbHRlciB0aGUgd2F5IGFuIGFsbHkgYmVoYXZlcyBkdXJpbmcgY29tYmF0LiBDb21tYW5kIE1vZHMgbGFzdCBAUm91bmRzUGVyTW9kQCBwbGF5ZXIgY29tYmF0cyBldmVuIGlmIHRoZXkgYXJlIG5vdCBlcXVpcHBlZC5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl8xN19Db21tYW5kZXIuVEZUX1NldDE3LnRleFwiLFxyXG4gICAgZWZmZWN0czogW3sgbWluVW5pdHM6IDEsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwidW5pcXVlXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19NYW5hVHJhaXRcIixcclxuICAgIG5hbWU6IFwiQ29uZHVpdFwiLFxyXG4gICAgZGVzYzogXCJJbm5hdGU6IENvbmR1aXRzIGdhaW4gQElubmF0ZU1hbmFHYWluKjEwMEAlIGFkZGl0aW9uYWwgTWFuYSBmcm9tIGFsbCBzb3VyY2VzLjxicj48YnI+WW91ciB0ZWFtIGdhaW5zIE1hbmEgUmVnZW4sIGluY3JlYXNlZCBmb3IgQ29uZHVpdHMuPGJyPjxicj48ZXhwYW5kUm93PihATWluVW5pdHNAKSBAVGVhbU1hbmFSZWdlbkAgJWk6VEZUTWFuYVJlZ2VuJSB8IEBDaGFubmVsZXJNYW5hUmVnZW5AICVpOlRGVE1hbmFSZWdlbiU8L2V4cGFuZFJvdz48YnI+PGJyPlwiLFxyXG4gICAgaWNvbjogXCJBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXzE3X0NoYW5uZWxlci5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMiwgbWF4VW5pdHM6IDIsIHN0eWxlOiBcImJyb256ZVwiIH0sIHsgbWluVW5pdHM6IDMsIG1heFVuaXRzOiAzLCBzdHlsZTogXCJzaWx2ZXJcIiB9LCB7IG1pblVuaXRzOiA0LCBtYXhVbml0czogNCwgc3R5bGU6IFwic2lsdmVyXCIgfSwgeyBtaW5Vbml0czogNSwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJnb2xkXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19Nb3JnYW5hVW5pcXVlVHJhaXRcIixcclxuICAgIG5hbWU6IFwiRGFyayBMYWR5XCIsXHJcbiAgICBkZXNjOiBcIkFsbGllcyB0YWtlIEBVbnRyYW5zZm9ybWVkQWJpbGl0eURBKjEwMEAlIGxlc3MgZGFtYWdlIGZyb20gYWJpbGl0aWVzLCBpbmNyZWFzZWQgdG8gQFRyYW5zZm9ybWVkQWJpbGl0eURBKjEwMEAlIHdoaWxlIE1vcmdhbmEgaXMgaW4gRGFyayBGb3JtLlwiLFxyXG4gICAgaWNvbjogXCJBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXzE3X0RhcmtMYWR5LlRGVF9TZXQxNy50ZXhcIixcclxuICAgIGVmZmVjdHM6IFt7IG1pblVuaXRzOiAxLCBtYXhVbml0czogMSwgc3R5bGU6IFwidW5pcXVlXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19EYXJrU3RhclwiLFxyXG4gICAgbmFtZTogXCJEYXJrIFN0YXJcIixcclxuICAgIGRlc2M6IFwiPHJvdz4oQE1pblVuaXRzQCkgRGFyayBTdGFycyBjcmVhdGUgYSBibGFjayBob2xlIHRoYXQgY29uc3VtZXMgZW5lbWllcyBhdCBARXhlY3V0ZUhQUGVyY2VudCoxMDBAJSBtYXggaGVhbHRoLjwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBBTkQgdGhleSBnYWluIEBBREFQQCUgJWk6c2NhbGVBRCUlaTpzY2FsZUFQJS48L3Jvdz48YnI+PHJvdz4oQE1pblVuaXRzQCkgQU5EIHRoZSBzdHJvbmdlc3QgRGFyayBTdGFyIHVuaXQgZ29lcyBzdXBlcm1hc3NpdmUsIGdhaW5pbmcgQFN1cGVybWFzc2l2ZVBlcmNlbnRCb251cyoxMDBAJSBlZmZlY3RpdmVuZXNzIGZyb20gRGFyayBTdGFyLCBhbmQgY3JlYXRlcyAyIG1pbm9yIEJsYWNrIEhvbGVzLjwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBBbGwgRGFyayBTdGFycyBhcmUgc3VwZXJtYXNzaXZlLiBBdCBsZXZlbCAxMCwgQ09OU1VNRSBFVkVSWU9ORS4gPC9yb3c+XCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfRGFya1N0YXIuVEZUX1NldDE3LnRleFwiLFxyXG4gICAgZWZmZWN0czogW3sgbWluVW5pdHM6IDIsIG1heFVuaXRzOiAzLCBzdHlsZTogXCJicm9uemVcIiB9LCB7IG1pblVuaXRzOiA0LCBtYXhVbml0czogNSwgc3R5bGU6IFwic2lsdmVyXCIgfSwgeyBtaW5Vbml0czogNiwgbWF4VW5pdHM6IDgsIHN0eWxlOiBcImdvbGRcIiB9LCB7IG1pblVuaXRzOiA5LCBtYXhVbml0czogMjUwMDAsIHN0eWxlOiBcImdvbGRcIiB9XSxcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiBcIlRGVDE3X0Zpb3JhVW5pcXVlVHJhaXRcIixcclxuICAgIG5hbWU6IFwiRGl2aW5lIER1ZWxpc3RcIixcclxuICAgIGRlc2M6IFwiWW91ciBUYWN0aWNpYW4gaGVhbHMgZm9yIEBQbGF5ZXJPbW5pdmFtcCoxMDBAJSBvZiBwbGF5ZXIgZGFtYWdlIGRlYWx0IGZyb20gd2lubmluZy48YnI+PGJyPkZpb3JhIGFsd2F5cyB3aW5zIGEgb25lIG9uIG9uZSBkdWVsLlwiLFxyXG4gICAgaWNvbjogXCJBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXzE3X0RpdmluZUR1ZWxpc3QuVEZUX1NldDE3LnRleFwiLFxyXG4gICAgZWZmZWN0czogW3sgbWluVW5pdHM6IDEsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwidW5pcXVlXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19WZXhVbmlxdWVUcmFpdFwiLFxyXG4gICAgbmFtZTogXCJEb29tZXJcIixcclxuICAgIGRlc2M6IFwiQ29tYmF0IFN0YXJ0OiBNYXJrIGFsbCBlbmVtaWVzIHdpdGggRG9vbS48YnI+PGJyPlRoZSBmaXJzdCB0aW1lIGVuZW1pZXMgYXJlIGRhbWFnZWQgZWFjaCBjb21iYXQsIHRoZWlyIERvb20gaXMgY29uc3VtZWQsIHN0ZWFsaW5nIEBBREFQMUAlIEF0dGFjayBEYW1hZ2UgYW5kIEFiaWxpdHkgUG93ZXIgZnJvbSB0aGVtIGFuZCBncmFudGluZyBpdCB0byB5b3VyIHN0cm9uZ2VzdCBWZXguXCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfRG9vbWVyLlRGVF9TZXQxNy50ZXhcIixcclxuICAgIGVmZmVjdHM6IFt7IG1pblVuaXRzOiAxLCBtYXhVbml0czogMjUwMDAsIHN0eWxlOiBcInVuaXF1ZVwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfSmhpblVuaXF1ZVRyYWl0XCIsXHJcbiAgICBuYW1lOiBcIkVyYWRpY2F0b3JcIixcclxuICAgIGRlc2M6IFwiRW5lbWllcyBoYXZlIEBQY3RSZXNpc3RzKjEwMEAlIGxlc3MgQXJtb3IgYW5kIE1hZ2ljIFJlc2lzdC5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl8xN19TaW5ndWxhcml0eS5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMSwgbWF4VW5pdHM6IDEsIHN0eWxlOiBcInVuaXF1ZVwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfR3JhdmVzVHJhaXRcIixcclxuICAgIG5hbWU6IFwiRmFjdG9yeSBOZXdcIixcclxuICAgIGRlc2M6IFwiQWZ0ZXIgcGFydGljaXBhdGluZyBpbiBjb21iYXQsIG9wZW4gYW4gYXJtb3J5IHRvIHB1cmNoYXNlIGEgcGVybWFuZW50IHVwZ3JhZGUgZm9yIHlvdXIgc3Ryb25nZXN0IEdyYXZlcy48YnI+PGJyPkV2ZXJ5IEBOdW1iZXJPZlVwZ3JhZGVzQmVmb3JlUm91bmRDb3N0SW5jcmVhc2VAIHVwZ3JhZGVzLCBmdXR1cmUgdXBncmFkZXMgd2lsbCB0YWtlIGFuIGFkZGl0aW9uYWwgcm91bmQuPGJyPjxicj48cnVsZXM+TmV4dCBVcGdyYWRlOiBAVEZUVW5pdFByb3BlcnR5LnRyYWl0OlRGVDE3X0dyYXZlc1RyYWl0X1JvdW5kc1VudGlsVXBncmFkZUAgUm91bmRzLjwvcnVsZXM+XCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfRmFjdG9yeU5ldy5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMSwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJ1bmlxdWVcIiB9XSxcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiBcIlRGVDE3X0ZhdGV3ZWF2ZXJcIixcclxuICAgIG5hbWU6IFwiRmF0ZXdlYXZlclwiLFxyXG4gICAgZGVzYzogXCJJbm5hdGU6IEZhdGV3ZWF2ZXJzIGhhdmUgPFRGVEtleXdvcmQ+UHJlY2lzaW9uPC9URlRLZXl3b3JkPi48YnI+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIENoYW5jZSBlZmZlY3RzIG9uIGFiaWxpdGllcyBhcmUgPFRGVEtleXdvcmQ+THVja3k8L1RGVEtleXdvcmQ+Ljwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBHYWluIEBDcml0Q2hhbmNlKjEwMEAlIENyaXQgQ2hhbmNlIGFuZCBAQ3JpdERhbWFnZUAlJm5ic3A7Q3JpdCBEYW1hZ2UuIENyaXRpY2FsIHN0cmlrZXMgYXJlIGFsc28gPFRGVEtleXdvcmQ+THVja3k8L1RGVEtleXdvcmQ+Ljwvcm93Pjxicj48YnI+e3tURlRfS2V5d29yZF9QcmVjaXNpb259fTxicj48cnVsZXM+THVja3k6IENoZWNrIHR3aWNlIGFuZCB0YWtlIHRoZSBiZXR0ZXIgb3V0Y29tZS48L3J1bGVzPlwiLFxyXG4gICAgaWNvbjogXCJBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXzE3X0ZhdGV3ZWF2ZXIuVEZUX1NldDE3LnRleFwiLFxyXG4gICAgZWZmZWN0czogW3sgbWluVW5pdHM6IDIsIG1heFVuaXRzOiAzLCBzdHlsZTogXCJicm9uemVcIiB9LCB7IG1pblVuaXRzOiA0LCBtYXhVbml0czogMjUwMDAsIHN0eWxlOiBcImdvbGRcIiB9XSxcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiBcIlRGVDE3X1plZFVuaXF1ZVRyYWl0XCIsXHJcbiAgICBuYW1lOiBcIkdhbGF4eSBIdW50ZXJcIixcclxuICAgIGRlc2M6IFwiWmVkIGlzIG9idGFpbmVkIGZyb20gdGhlIEludmFkZXIgWmVkIGF1Z21lbnQuPGJyPjxicj5XaGlsZSBhdCBsZWFzdCBvbmUgY2xvbmUgaXMgYWxpdmUsIFplZCBnYWlucyBAQm9udXNBRCoxMDBAJSBib251cyBBdHRhY2sgRGFtYWdlLlwiLFxyXG4gICAgaWNvbjogXCJBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXzE3X0dhbGF4eUh1bnRlci5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMSwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJ1bmlxdWVcIiB9XSxcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiBcIlNldDE3X0Nhcm91c2VsTWFya2V0X0VtcG93ZXJlZEhleFRyYWl0XCIsXHJcbiAgICBuYW1lOiBcIkdvZC1CbGVzc2VkXCIsXHJcbiAgICBkZXNjOiBcIkBURlRVbml0UHJvcGVydHkudHJhaXQ6VEZUMTdfQ2Fyb3VzZWxNYXJrZXRfVHJhaXRUUkFLZXkxQDxicj48YnI+QFRGVFVuaXRQcm9wZXJ0eS50cmFpdDpURlQxN19DYXJvdXNlbE1hcmtldF9UcmFpdFRSQUtleTJAPGJyPjxicj5AVEZUVW5pdFByb3BlcnR5LnRyYWl0OlRGVDE3X0Nhcm91c2VsTWFya2V0X1RyYWl0VFJBS2V5M0A8YnI+PGJyPkBURlRVbml0UHJvcGVydHkudHJhaXQ6VEZUMTdfQ2Fyb3VzZWxNYXJrZXRfVHJhaXRUUkFLZXk0QDxicj48YnI+QFRGVFVuaXRQcm9wZXJ0eS50cmFpdDpURlQxN19DYXJvdXNlbE1hcmtldF9UcmFpdFRSQUtleTVAPGJyPjxicj5AVEZUVW5pdFByb3BlcnR5LnRyYWl0OlRGVDE3X0Nhcm91c2VsTWFya2V0X1RyYWl0VFJBS2V5NkA8YnI+PGJyPkBURlRVbml0UHJvcGVydHkudHJhaXQ6VEZUMTdfQ2Fyb3VzZWxNYXJrZXRfVHJhaXRUUkFLZXk3QDxicj48YnI+QFRGVFVuaXRQcm9wZXJ0eS50cmFpdDpURlQxN19DYXJvdXNlbE1hcmtldF9UcmFpdFRSQUtleThAPGJyPjxicj5AVEZUVW5pdFByb3BlcnR5LnRyYWl0OlRGVDE3X0Nhcm91c2VsTWFya2V0X1RyYWl0VFJBS2V5OUA8YnI+PGJyPkBURlRVbml0UHJvcGVydHkudHJhaXQ6VEZUMTdfQ2Fyb3VzZWxNYXJrZXRfVHJhaXRUUkFLZXkxMEA8YnI+XCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfR29kQmxlc3NlZC5URlRfU2V0MTcudGV4XCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19NaXNzRm9ydHVuZVVuaXF1ZVRyYWl0XCIsXHJcbiAgICBuYW1lOiBcIkd1biBHb2RkZXNzXCIsXHJcbiAgICBkZXNjOiBcIldoZW4geW91IGZpZWxkIE1pc3MgRm9ydHVuZSwgY2hvb3NlIGJldHdlZW4gQ29uZHVpdCBNb2RlLCBDaGFsbGVuZ2VyIE1vZGUsIGFuZCBSZXBsaWNhdG9yIE1vZGUuIE1pc3MgRm9ydHVuZSBoYXMgYSB1bmlxdWUgYWJpbGl0eSBiYXNlZCBvbiBoZXIgbW9kZSBhbmQgZ2FpbnMgdGhlIGFzc29jaWF0ZWQgdHJhaXQuXCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfR3VuR29kZGVzcy5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMSwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJ1bmlxdWVcIiB9XSxcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiBcIlRGVDE3X01lbGVlVHJhaXRcIixcclxuICAgIG5hbWU6IFwiTWFyYXVkZXJcIixcclxuICAgIGRlc2M6IFwiWW91ciB0ZWFtIGdhaW5zIEBUZWFtd2lkZUJvbnVzKjEwMEAlIE9tbml2YW1wLiBNYXJhdWRlcnMgZ2FpbiBtb3JlIE9tbml2YW1wLCBBdHRhY2sgRGFtYWdlLCBhbmQgdGhlaXIgT21uaXZhbXAgb3ZlcmhlYWxpbmcgaXMgY29udmVydGVkIGludG8gU2hpZWxkICh1cCB0byBATWF4UGVyY2VudEhlYWx0aFNoaWVsZCoxMDBAJSBtYXggSGVhbHRoLik8YnI+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEBPbW5pdmFtcCoxMDBAJSAlaTpzY2FsZVNWJSwgQEFEKjEwMEAlICVpOnNjYWxlQUQlPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEBPbW5pdmFtcCoxMDBAJSAlaTpzY2FsZVNWJSwgQEFEKjEwMEAlICVpOnNjYWxlQUQlPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEBPbW5pdmFtcCoxMDBAJSAlaTpzY2FsZVNWJSwgQEFEKjEwMEAlICVpOnNjYWxlQUQlLjwvcm93PlwiLFxyXG4gICAgaWNvbjogXCJBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXzE2X1NsYXllci50ZXhcIixcclxuICAgIGVmZmVjdHM6IFt7IG1pblVuaXRzOiAyLCBtYXhVbml0czogMywgc3R5bGU6IFwiYnJvbnplXCIgfSwgeyBtaW5Vbml0czogNCwgbWF4VW5pdHM6IDUsIHN0eWxlOiBcInNpbHZlclwiIH0sIHsgbWluVW5pdHM6IDYsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwiZ29sZFwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfTWVjaGFcIixcclxuICAgIG5hbWU6IFwiTWVjaGFcIixcclxuICAgIGRlc2M6IFwiSW5uYXRlOiBNZWNoYSB1bml0cyBjYW4gdHJhbnNmb3JtIGludG8gdGhlaXIgVWx0aW1hdGUgZm9ybSwgdXBncmFkaW5nIHRoZWlyIGFiaWxpdHkgYW5kIGdhaW5pbmcgQFRyYW5zZm9ybWVkUGVyY2VudEhlYWx0aCoxMDBAJSBIZWFsdGguIFRyYW5zZm9ybWVkIE1lY2hhcyB0YWtlIHVwIHR3byB0ZWFtIHNsb3RzIGFuZCBjb3VudCB0d2ljZSBmb3IgdGhlIE1lY2hhIHRyYWl0Ljxicj48YnI+PHJvdz4oQE1pblVuaXRzQCkgRW5lcmd5IENlbGxzOiBNZWNoYXMgZ2FpbiBAQVBAJSZuYnNwOyVpOnNjYWxlQUQlJWk6c2NhbGVBUCUuPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIE92ZXJjbG9ja2VkIENlbGxzOiBJbmNyZWFzZWQgdG8gQEFQQCUmbmJzcDslaTpzY2FsZUFEJSVpOnNjYWxlQVAlLjwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBQcmVjaXNpb24gRW5naW5lZXJpbmc6ICtAVGVhbVNpemVAIG1heCB0ZWFtIHNpemU8L3Jvdz48YnI+PGJyPjxydWxlcz5Vc2UgdGhlIE1lY2hhLUZvcm1lciBpdGVtIHRvIHRvZ2dsZSB0aGUgZm9ybXMgb2YgeW91ciBNZWNoYSB1bml0czwvcnVsZXM+XCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfTWVjaGEuVEZUX1NldDE3LnRleFwiLFxyXG4gICAgZWZmZWN0czogW3sgbWluVW5pdHM6IDMsIG1heFVuaXRzOiAzLCBzdHlsZTogXCJicm9uemVcIiB9LCB7IG1pblVuaXRzOiA0LCBtYXhVbml0czogNSwgc3R5bGU6IFwic2lsdmVyXCIgfSwgeyBtaW5Vbml0czogNiwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJnb2xkXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19Bc3Ryb25hdXRcIixcclxuICAgIG5hbWU6IFwiTWVlcGxlXCIsXHJcbiAgICBkZXNjOiBcIk1lZXBsZSBhdHRyYWN0IE1lZXBzIHRoYXQgZW1wb3dlciBNZWVwbGUgYWJpbGl0aWVzIGluIG1lZXB5IHdheXMuIFRoZXkgYWxzbyBnYWluIGJvbnVzIEhlYWx0aC48YnI+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEBNZWVwc0AgJWk6c2V0MTRBbXBJY29uJSwgQEJvbnVzSGVhbHRoQCAlaTpzY2FsZUhlYWx0aCU8L3Jvdz48YnI+PHJvdz4oQE1pblVuaXRzQCkgQE1lZXBzQCAlaTpzZXQxNEFtcEljb24lLCBAQm9udXNIZWFsdGhAICVpOnNjYWxlSGVhbHRoJTwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBATWVlcHNAICVpOnNldDE0QW1wSWNvbiUsIEBCb251c0hlYWx0aEAgJWk6c2NhbGVIZWFsdGglLiBDcmVhdGUgYSBDbG9uaW5nIFNsb3Qgb24geW91ciBiZW5jaC4gR2FpbiBnb2xkIGFuZCBhIDEtc3RhciBjb3B5IG9mIHRoZSBjaGFtcGlvbiBwbGFjZWQgdGhlcmUgd2hlbiBjbG9uaW5nIGNvbXBsZXRlcy48L3Jvdz48YnI+PHJvdz4oQE1pblVuaXRzQCkgQE1lZXBzQCAlaTpzZXQxNEFtcEljb24lLCBAQm9udXNIZWFsdGhAICVpOnNjYWxlSGVhbHRoJS4gU1VNTU9OIFRIRSBGT1VSIE1FRVBMT1JEUyE8L3Jvdz48YnI+PGJyPjxydWxlcz5DbG9uaW5nIHRpbWUgPSBDaGFtcGlvbiBjb3N0PC9ydWxlcz5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl8xN19Bc3Ryb25hdXQuVEZUX1NldDE3LnRleFwiLFxyXG4gICAgZWZmZWN0czogW3sgbWluVW5pdHM6IDMsIG1heFVuaXRzOiA0LCBzdHlsZTogXCJicm9uemVcIiB9LCB7IG1pblVuaXRzOiA1LCBtYXhVbml0czogNiwgc3R5bGU6IFwic2lsdmVyXCIgfSwgeyBtaW5Vbml0czogNywgbWF4VW5pdHM6IDksIHN0eWxlOiBcImdvbGRcIiB9LCB7IG1pblVuaXRzOiAxMCwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJwcmlzbWF0aWNcIiB9XSxcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiBcIlRGVDE3X0RSWFwiLFxyXG4gICAgbmFtZTogXCJOLk8uVi5BLlwiLFxyXG4gICAgZGVzYzogXCI8cm93PihATWluVW5pdHNAKSBAVGVhbUF0dGFja0RlbGF5QCBzZWNvbmRzIGludG8gY29tYmF0LCBOLk8uVi5BLiBncmFudCBhIHBvd2VyIHN1cmdlIHRvIGFsbGllcyBiYXNlZCBvbiBjaGFtcGlvbnMuPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEdhaW4gYSBTdHJpa2VyIHNlbGVjdG9yLiBUaGUgY2hvc2VuIE4uTy5WLkEuIGFjdGl2YXRlcyB0aGVpciBTdHJpa2UgZHVyaW5nIHRoZSBwb3dlciBzdXJnZS48L3Jvdz48YnI+PGJyPjxTaG93SWYuVEZUMTdfRFJYX0hhc0FhdHJveD48c3RhdHVzPkFhdHJveDo8L3N0YXR1cz4gQWxseSBEYW1hZ2UgQFNocmVkQW5kU3VuZGVyKjEwMEAlIDxURlRLZXl3b3JkPlNocmVkPC9URlRLZXl3b3JkPiBhbmQgPFRGVEtleXdvcmQ+U3VuZGVyczwvVEZUS2V5d29yZD4gZW5lbWllczwvU2hvd0lmLlRGVDE3X0RSWF9IYXNBYXRyb3g+PFNob3dJZk5vdC5URlQxN19EUlhfSGFzQWF0cm94PjxURlRHdWlsZEluYWN0aXZlPkFhdHJveDogU2hyZWQgYW5kIFN1bmRlciBlbmVtaWVzPC9URlRHdWlsZEluYWN0aXZlPjwvU2hvd0lmTm90LlRGVDE3X0RSWF9IYXNBYXRyb3g+PGJyPjxTaG93SWYuVEZUMTdfRFJYX0hhc0NhaXRseW4+PHN0YXR1cz5DYWl0bHluOjwvc3RhdHVzPiBHcmFudCBhbGxpZXMgQEFTKjEwMEAlIEF0dGFjayBTcGVlZDwvU2hvd0lmLlRGVDE3X0RSWF9IYXNDYWl0bHluPjxTaG93SWZOb3QuVEZUMTdfRFJYX0hhc0NhaXRseW4+PFRGVEd1aWxkSW5hY3RpdmU+Q2FpdGx5bjogR3JhbnQgQXR0YWNrIFNwZWVkPC9URlRHdWlsZEluYWN0aXZlPjwvU2hvd0lmTm90LlRGVDE3X0RSWF9IYXNDYWl0bHluPjxicj48U2hvd0lmLlRGVDE3X0RSWF9IYXNBa2FsaT48c3RhdHVzPkFrYWxpOjwvc3RhdHVzPiBBbGxpZXMgZ2FpbiA8VEZUS2V5d29yZD5QcmVjaXNpb248L1RGVEtleXdvcmQ+PC9TaG93SWYuVEZUMTdfRFJYX0hhc0FrYWxpPjxTaG93SWZOb3QuVEZUMTdfRFJYX0hhc0FrYWxpPjxURlRHdWlsZEluYWN0aXZlPkFrYWxpOiBBbGxpZXMgZ2FpbiBQcmVjaXNpb248L1RGVEd1aWxkSW5hY3RpdmU+PC9TaG93SWZOb3QuVEZUMTdfRFJYX0hhc0FrYWxpPjxicj48U2hvd0lmLlRGVDE3X0RSWF9IYXNNYW9rYWk+PHN0YXR1cz5NYW9rYWk6PC9zdGF0dXM+IEFsbGllcyBoZWFsIEBIZWFsKjEwMEAlIG1heCBIZWFsdGg8L1Nob3dJZi5URlQxN19EUlhfSGFzTWFva2FpPjxTaG93SWZOb3QuVEZUMTdfRFJYX0hhc01hb2thaT48VEZUR3VpbGRJbmFjdGl2ZT5NYW9rYWk6IEhlYWwgYWxsaWVzPC9URlRHdWlsZEluYWN0aXZlPjwvU2hvd0lmTm90LlRGVDE3X0RSWF9IYXNNYW9rYWk+PGJyPjxTaG93SWYuVEZUMTdfRFJYX0hhc0tpbmRyZWQ+PHN0YXR1cz5LaW5kcmVkOjwvc3RhdHVzPiBTaGllbGQgdGhlIHN0cm9uZ2VzdCBUYW5rIGZvciA8VEZUQm9udXM+QFNoaWVsZFZhbHVlQDwvVEZUQm9udXM+PC9TaG93SWYuVEZUMTdfRFJYX0hhc0tpbmRyZWQ+PFNob3dJZk5vdC5URlQxN19EUlhfSGFzS2luZHJlZD48VEZUR3VpbGRJbmFjdGl2ZT5LaW5kcmVkOiBTaGllbGQgYW4gYWxseTwvVEZUR3VpbGRJbmFjdGl2ZT48L1Nob3dJZk5vdC5URlQxN19EUlhfSGFzS2luZHJlZD48YnI+PFNob3dJZi5URlQxN19EUlhfSGFzRW1ibGVtPjxzdGF0dXM+RW1ibGVtOjwvc3RhdHVzPiBBbGxpZXMgZGVhbCBAQm9udXNUcnVlRGFtYWdlKjEwMEAlIHN0YWNraW5nIGJvbnVzIHRydWUgZGFtYWdlPC9TaG93SWYuVEZUMTdfRFJYX0hhc0VtYmxlbT48U2hvd0lmTm90LlRGVDE3X0RSWF9IYXNFbWJsZW0+PFRGVEd1aWxkSW5hY3RpdmU+RW1ibGVtOiBEZWFsIGJvbnVzIHRydWUgZGFtYWdlPC9URlRHdWlsZEluYWN0aXZlPjwvU2hvd0lmTm90LlRGVDE3X0RSWF9IYXNFbWJsZW0+XCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfTk9WQS5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMiwgbWF4VW5pdHM6IDQsIHN0eWxlOiBcImJyb256ZVwiIH0sIHsgbWluVW5pdHM6IDUsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwiZ29sZFwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfVGFobUtlbmNoVW5pcXVlVHJhaXRcIixcclxuICAgIG5hbWU6IFwiT3JhY2xlXCIsXHJcbiAgICBkZXNjOiBcIkV2ZXJ5IEBSb3VuZHNAIHJvdW5kcywgVGFobSBLZW5jaCBncmFudHMgYSByZXdhcmQhPGJyPjxicj5Sb3VuZHMgUmVtYWluaW5nOiBAVEZUVW5pdFByb3BlcnR5LnRyYWl0OlRGVDE3X1RhaG1LZW5jaF9Sb3VuZHNSZW1haW5pbmdAPGJyPkxhc3QgUmV3YXJkOiBAVEZUVW5pdFByb3BlcnR5LnRyYWl0OlRGVDE3X1RhaG1LZW5jaF9MYXN0UmV3YXJkQFwiLFxyXG4gICAgaWNvbjogXCJBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXzEyX0FyY2FuYS5URlRfU2V0MTIudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMSwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJ1bmlxdWVcIiB9XSxcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiBcIlRGVDE3X0JsaXR6Y3JhbmtVbmlxdWVUcmFpdFwiLFxyXG4gICAgbmFtZTogXCJQYXJ0eSBBbmltYWxcIixcclxuICAgIGRlc2M6IFwiT25jZSBwZXIgY29tYmF0LCBhZnRlciBmYWxsaW5nIGJlbG93IEBIZWFsdGhUaHJlc2hvbGQqMTAwQCUgcGVyY2VudCBIZWFsdGgsIGJlY29tZSB1bnRhcmdldGFibGUgYW5kIHJlcGFpciBAUGVyY2VudEhlYWx0aEhlYWwqMTAwQCUgbWF4IEhlYWx0aCBwZXIgc2Vjb25kLiBVcG9uIHJlYWNoaW5nIGZ1bGwgSGVhbHRoLCBvciB3aGVuIG5vIG90aGVyIGFsbGllcyByZW1haW4sIHJldHVybiB0byBjb21iYXQuIElmIGZ1bGx5IGhlYWxlZCwgZm9yIHRoZSByZXN0IG9mIGNvbWJhdCBCbGl0emNyYW5rIGlzIGluIHt7VEZUMTdfU3BhY2VHcm9vdmVfVGhlR3Jvb3ZlfX0gYW5kIFBhcnR5IENyYXNoZXIncyBwYXNzaXZlIGZpcmVzIGJvbHRzIGZvdXIgdGltZXMgYXMgZmFzdC5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl8xN19QYXJ0eUFuaW1hbC5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMSwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJ1bmlxdWVcIiB9XSxcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiBcIlRGVDE3X1ByaW1vcmRpYW5cIixcclxuICAgIG5hbWU6IFwiUHJpbW9yZGlhblwiLFxyXG4gICAgZGVzYzogXCI8cm93PihATWluVW5pdHNAKSBEZWFsaW5nIGRhbWFnZSBzcGF3bnMgU3dhcm1saW5ncyBiYXNlZCBvbiB1bmlxdWUgUHJpbW9yZGlhbiBzdGFyIGxldmVsLjwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBTcGF3biBAUGVyY2VudE1vcmVTd2FybWxpbmdzQCUgbW9yZSBTd2FybWxpbmdzISBBZnRlciBlYWNoIHBsYXllciBjb21iYXQsIGdhaW4gYSByYW5kb20gMSBvciAyLWNvc3QgY2hhbXBpb24uIDwvcm93Pjxicj48YnI+PHJ1bGVzPkBEYW1hZ2VUYWtlblBlcmNlbnRNb2RpZmllcioxMDBAJSBvZiBkYW1hZ2UgdGFrZW4gY29udHJpYnV0ZXMgdG8gZGFtYWdlIGRlYWx0LjwvcnVsZXM+XCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfUHJpbW9yZGlhbi5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMiwgbWF4VW5pdHM6IDIsIHN0eWxlOiBcImJyb256ZVwiIH0sIHsgbWluVW5pdHM6IDMsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwiZ29sZFwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfUHN5T3BzXCIsXHJcbiAgICBuYW1lOiBcIlBzaW9uaWNcIixcclxuICAgIGRlc2M6IFwiR2FpbiBQc2lvbmljIGl0ZW1zIHRoYXQgY2FuIGJlIGVxdWlwcGVkIHRvIGFueSBhbGx5Ljxicj48YnI+PHJvdz4oQE1pblVuaXRzQCkgR2FpbiB0aGUgQFRGVFVuaXRQcm9wZXJ0eS50cmFpdDpURlQxN19Qc3lPcHNfSXRlbTFAPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEdhaW4gdGhlIEBURlRVbml0UHJvcGVydHkudHJhaXQ6VEZUMTdfUHN5T3BzX0l0ZW0yQCwgUHNpb25pYyBpdGVtcyBnYWluIGV4dHJhIGVmZmVjdHMgb24gUHNpb25pYyB1bml0czwvcm93Pjxicj48YnI+PGJyPlwiLFxyXG4gICAgaWNvbjogXCJBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXzE3X1BzeU9wcy5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMiwgbWF4VW5pdHM6IDMsIHN0eWxlOiBcImJyb256ZVwiIH0sIHsgbWluVW5pdHM6IDQsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwiZ29sZFwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfUmhhYXN0VW5pcXVlVHJhaXRcIixcclxuICAgIG5hbWU6IFwiUmVkZWVtZXJcIixcclxuICAgIGRlc2M6IFwiPHJvdz4oQE1pblVuaXRzQCkgRm9yIGVhY2ggbm9uLXVuaXF1ZSB0cmFpdCB5b3UgaGF2ZSBhY3RpdmUsIHlvdXIgdGVhbSBnYWlucyBAQm9udXNPZmZlbnNpdmVTdGF0MSoxMDBAJS9AQm9udXNPZmZlbnNpdmVTdGF0MioxMDBAJS9AQm9udXNPZmZlbnNpdmVTdGF0MyoxMDBAJSBBdHRhY2sgU3BlZWQsIGFuZCBAQm9udXNEZWZlbnNpdmVTdGF0MUAvQEJvbnVzRGVmZW5zaXZlU3RhdDJAL0BCb251c0RlZmVuc2l2ZVN0YXQzQCBBcm1vciBhbmQgTWFnaWMgUmVzaXN0Ljwvcm93Pjxicj48YnI+VGVhbXdpZGUgQXR0YWNrIFNwZWVkOiBAVEZUVW5pdFByb3BlcnR5LnRyYWl0OlRGVDE3X1JoYWFzdFVuaXF1ZV9PZmZlbnNpdmVTdGF0VG9HYWluQCUgJWk6c2NhbGVBUyU8YnI+VGVhbXdpZGUgUmVzaXN0czogQFRGVFVuaXRQcm9wZXJ0eS50cmFpdDpURlQxN19SaGFhc3RVbmlxdWVfRGVmZW5zaXZlU3RhdFRvR2FpbkAgJWk6c2NhbGVBcm1vciUlaTpzY2FsZU1SJVwiLFxyXG4gICAgaWNvbjogXCJBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXzE3X1JlZGVlbWVyLlRGVF9TZXQxNy50ZXhcIixcclxuICAgIGVmZmVjdHM6IFt7IG1pblVuaXRzOiAxLCBtYXhVbml0czogMjUwMDAsIHN0eWxlOiBcInVuaXF1ZVwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfQVBUcmFpdFwiLFxyXG4gICAgbmFtZTogXCJSZXBsaWNhdG9yXCIsXHJcbiAgICBkZXNjOiBcIlJlcGxpY2F0b3IgYWJpbGl0aWVzIG9jY3VyIGEgc2Vjb25kIHRpbWUgYXQgcmVkdWNlZCBlZmZlY3RpdmVuZXNzLjxicj48YnI+PGV4cGFuZFJvdz4oQE1pblVuaXRzQCkgQEVmZmVjdGl2ZW5lc3MqMTAwQCUgc3RyZW5ndGg8L2V4cGFuZFJvdz5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl8xN19SZXBsaWNhdG9yLlRGVF9TZXQxNy50ZXhcIixcclxuICAgIGVmZmVjdHM6IFt7IG1pblVuaXRzOiAyLCBtYXhVbml0czogMywgc3R5bGU6IFwiYnJvbnplXCIgfSwgeyBtaW5Vbml0czogNCwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJnb2xkXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19Bc3Nhc3NpblRyYWl0XCIsXHJcbiAgICBuYW1lOiBcIlJvZ3VlXCIsXHJcbiAgICBkZXNjOiBcIlJvZ3VlcyBnYWluIEF0dGFjayBEYW1hZ2UgYW5kIEFiaWxpdHkgUG93ZXIuIFRoZSBmaXJzdCB0aW1lIHRoZXkgZmFsbCBiZWxvdyBASGVhbHRoVGhyZXNob2xkKjEwMEAlIGhlYWx0aCwgdGhleSBzbGlwIGludG8gc2hhZG93cy4gRW5lbWllcyB0YXJnZXRpbmcgdGhlbSBhcmUgcmVkaXJlY3RlZCB0byBhIG5lYXJieSB1bml0LCBwcmVmZXJyaW5nIFRhbmtzLjxicj48YnI+PHJvdz4oQE1pblVuaXRzQCkgQEFQQCUgJWk6c2NhbGVBRCUgJWk6c2NhbGVBUCU8L3Jvdz48YnI+PHJvdz4oQE1pblVuaXRzQCkgQEFQQCUgJWk6c2NhbGVBRCUgJWk6c2NhbGVBUCU8L3Jvdz48YnI+PHJvdz4oQE1pblVuaXRzQCkgQEFQQCUgJWk6c2NhbGVBRCUgJWk6c2NhbGVBUCU8L3Jvdz48YnI+PHJvdz4oQE1pblVuaXRzQCkgQEFQQCUgJWk6c2NhbGVBRCUgJWk6c2NhbGVBUCU8L3Jvdz5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl8xN19Sb2d1ZS5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMiwgbWF4VW5pdHM6IDIsIHN0eWxlOiBcImJyb256ZVwiIH0sIHsgbWluVW5pdHM6IDMsIG1heFVuaXRzOiAzLCBzdHlsZTogXCJzaWx2ZXJcIiB9LCB7IG1pblVuaXRzOiA0LCBtYXhVbml0czogNCwgc3R5bGU6IFwic2lsdmVyXCIgfSwgeyBtaW5Vbml0czogNSwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJnb2xkXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19TdW1tb25UcmFpdFwiLFxyXG4gICAgbmFtZTogXCJTaGVwaGVyZFwiLFxyXG4gICAgZGVzYzogXCJTaGVwaGVyZHMgc3VtbW9uIHRoZSBCb25kIG9mIHRoZSBTdGFycyB0byBhaWQgdGhlbSBpbiBiYXR0bGUuPGJyPjxicj48cm93PihATWluVW5pdHNAKSBTdW1tb24gQmlhPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIFN1bW1vbiBCYXlpbjwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBCaWEgYW5kIEJheWluJ3MgYm9uZCBncm93cyBkZWVwZXI8L3Jvdz48YnI+PGJyPjxydWxlcz5CaWEgYW5kIEJheWluJ3MgcG93ZXIgYXJlIGluY3JlYXNlZCBieSB0aGUgdG90YWwgc3RhciBsZXZlbCBvZiBhbGwgU2hlcGhlcmRzLjwvcnVsZXM+XCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfU2hlcGhlcmQuVEZUX1NldDE3LnRleFwiLFxyXG4gICAgZWZmZWN0czogW3sgbWluVW5pdHM6IDMsIG1heFVuaXRzOiA0LCBzdHlsZTogXCJicm9uemVcIiB9LCB7IG1pblVuaXRzOiA1LCBtYXhVbml0czogNiwgc3R5bGU6IFwic2lsdmVyXCIgfSwgeyBtaW5Vbml0czogNywgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJnb2xkXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19SYW5nZWRUcmFpdFwiLFxyXG4gICAgbmFtZTogXCJTbmlwZXJcIixcclxuICAgIGRlc2M6IFwiU25pcGVycyBnYWluIERhbWFnZSBBbXAsIGluY3JlYXNlZCBhZ2FpbnN0IHRhcmdldHMgZmFydGhlciBhd2F5Ljxicj48YnI+PHJvdz4oQE1pblVuaXRzQCkgQFBlcmNlbnREYW1hZ2VJbmNyZWFzZUAlJm5ic3A7JWk6c2NhbGVEQSU7ICtAUGVySGV4SW5jcmVhc2VAJSZuYnNwOyVpOnNjYWxlREElIHBlciBoZXg8L3Jvdz48YnI+PHJvdz4oQE1pblVuaXRzQCkgQFBlcmNlbnREYW1hZ2VJbmNyZWFzZUAlJm5ic3A7JWk6c2NhbGVEQSU7ICtAUGVySGV4SW5jcmVhc2VAJSZuYnNwOyVpOnNjYWxlREElIHBlciBoZXg8L3Jvdz48YnI+PHJvdz4oQE1pblVuaXRzQCkgQFBlcmNlbnREYW1hZ2VJbmNyZWFzZUAlJm5ic3A7JWk6c2NhbGVEQSU7ICtAUGVySGV4SW5jcmVhc2VAJSZuYnNwOyVpOnNjYWxlREElIHBlciBoZXg8L3Jvdz5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl82X1NuaXBlci50ZXhcIixcclxuICAgIGVmZmVjdHM6IFt7IG1pblVuaXRzOiAyLCBtYXhVbml0czogMiwgc3R5bGU6IFwiYnJvbnplXCIgfSwgeyBtaW5Vbml0czogMywgbWF4VW5pdHM6IDMsIHN0eWxlOiBcInNpbHZlclwiIH0sIHsgbWluVW5pdHM6IDQsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwiZ29sZFwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfU3BhY2VHcm9vdmVcIixcclxuICAgIG5hbWU6IFwiU3BhY2UgR3Jvb3ZlXCIsXHJcbiAgICBkZXNjOiBcIjxyb3c+KEBNaW5Vbml0c0ApIEdyb292aWFucyBjYW4gZW50ZXIge3tURlQxN19TcGFjZUdyb292ZV9UaGVHcm9vdmV9fS4gV2hpbGUgaW4gaXQsIHRoZXkgZ2FpbiBBdHRhY2sgU3BlZWQgYW5kIG1heCBIZWFsdGggUmVnZW4sIGluY3JlYXNlZCBwZXIgR3Jvb3ZpYW4gb24geW91ciB0ZWFtLjwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBBbGwgR3Jvb3ZpYW5zIHN0YXJ0IGNvbWJhdCBpbiB7e1RGVDE3X1NwYWNlR3Jvb3ZlX1RoZUdyb292ZX19IGZvciBAU3RhcnRPZkNvbWJhdER1cmF0aW9uQCBzZWNvbmRzLjwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBFYWNoIHNlY29uZCBzcGVudCBpbiB7e1RGVDE3X1NwYWNlR3Jvb3ZlX1RoZUdyb292ZX19IGdyYW50cyBAQURBUFBlclNlY29uZEAlIHN0YWNraW5nIEF0dGFjayBEYW1hZ2UgYW5kIEFiaWxpdHkgUG93ZXIuPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEluY3JlYXNlIHRoZXNlIGVmZmVjdHMgYnkgQEVmZmVjdEJvbnVzQCUhPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIHt7VEZUMTdfU3BhY2VHcm9vdmVfR3Jvb3ZlfX08L3Jvdz48YnI+PGJyPnt7VEZUMTdfU3BhY2VHcm9vdmVfVGhlR3Jvb3ZlfX06IEBURlRVbml0UHJvcGVydHkuOlRGVDE3X1NwYWNlR3Jvb3ZlX0FTKjEwMEAlICVpOnNjYWxlQVMlLCBAVEZUVW5pdFByb3BlcnR5LjpURlQxN19TcGFjZUdyb292ZV9IZWFsdGhSZWdlbioxMDBAJSAlaTpzY2FsZUhQUmVnZW4lXCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfU3BhY2VHcm9vdmUuVEZUX1NldDE3LnRleFwiLFxyXG4gICAgZWZmZWN0czogW3sgbWluVW5pdHM6IDEsIG1heFVuaXRzOiAyLCBzdHlsZTogXCJicm9uemVcIiB9LCB7IG1pblVuaXRzOiAzLCBtYXhVbml0czogNCwgc3R5bGU6IFwic2lsdmVyXCIgfSwgeyBtaW5Vbml0czogNSwgbWF4VW5pdHM6IDYsIHN0eWxlOiBcInNpbHZlclwiIH0sIHsgbWluVW5pdHM6IDcsIG1heFVuaXRzOiA5LCBzdHlsZTogXCJnb2xkXCIgfSwgeyBtaW5Vbml0czogMTAsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwicHJpc21hdGljXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19TdGFyZ2F6ZXJfV29sZlwiLFxyXG4gICAgbmFtZTogXCJTdGFyZ2F6ZXJcIixcclxuICAgIGRlc2M6IFwiU3RhcmdhemVycyBjaGFydCBhIGRpZmZlcmVudCBjb25zdGVsbGF0aW9uIGV2ZXJ5IGdhbWUuIFRoaXMgZ2FtZTogPFRGVFN0YXJnYXplcj5UaGUgQm9hcjwvVEZUU3RhcmdhemVyPi48YnI+PGJyPkdhaW4gZ29sZCBhZnRlciB3aW5uaW5nIHBsYXllciBjb21iYXQuIEFsbGllcyBpbiBlbXBvd2VyZWQgaGV4ZXMgZ2FpbiBAV29sZl9IZWFsdGhfVGVhbXdpZGUqMTAwQCUgSGVhbHRoLCBBdHRhY2sgRGFtYWdlLCBhbmQgQWJpbGl0eSBQb3dlci4gU3RhcmdhemVycyBnYWluIG1vcmUuPGJyPjxicj4oR29sZCBFYXJuZWQ6IEBURlRVbml0UHJvcGVydHkudHJhaXQ6VEZUMTdfU3RhcmdhemVyX1dvbGZfVG90YWxHb2xkQCk8YnI+PGJyPjxleHBhbmRSb3c+KEBNaW5Vbml0c0ApIEBXb2xmX0dvbGRAIGdvbGQsIEBXb2xmX0hlYWx0aCoxMDBAJSAlaTpzY2FsZUhlYWx0aCUsIEBXb2xmX0FEQVBAJSAlaTpzY2FsZUFEJSVpOnNjYWxlQVAlPC9leHBhbmRSb3c+PGJyPjxicj48cnVsZXM+TW9yZSBoZXhlcyByZXZlYWwgYXQgZWFjaCBwbGF5ZXIgbGV2ZWw8L3J1bGVzPlwiLFxyXG4gICAgaWNvbjogXCJBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXzE3X1N0YXJnYXplci5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMywgbWF4VW5pdHM6IDMsIHN0eWxlOiBcImJyb256ZVwiIH0sIHsgbWluVW5pdHM6IDQsIG1heFVuaXRzOiA0LCBzdHlsZTogXCJzaWx2ZXJcIiB9LCB7IG1pblVuaXRzOiA1LCBtYXhVbml0czogNSwgc3R5bGU6IFwic2lsdmVyXCIgfSwgeyBtaW5Vbml0czogNiwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJnb2xkXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19TdGFyZ2F6ZXJfTWVkYWxsaW9uXCIsXHJcbiAgICBuYW1lOiBcIlN0YXJnYXplclwiLFxyXG4gICAgZGVzYzogXCJTdGFyZ2F6ZXJzIGNoYXJ0IGEgZGlmZmVyZW50IGNvbnN0ZWxsYXRpb24gZXZlcnkgZ2FtZS4gVGhpcyBnYW1lOiA8VEZUU3RhcmdhemVyPlRoZSBNZWRhbGxpb248L1RGVFN0YXJnYXplcj4uPGJyPjxicj48cm93PihATWluVW5pdHNAKSBBbGxpZXMgaW4gZW1wb3dlcmVkIGhleGVzIGdhaW4gQE1lZGFsbGlvbl9EQUAlIERhbWFnZSBBbXAsIHdoaWNoIGluY3JlYXNlcyBieSBATWVkYWxsaW9uX0luY3JlYXNlUGVyM1N0YXJAJSBmb3IgZWFjaCAzLXN0YXIgYWxseS48L3Jvdz48YnI+PGJyPihDdXJyZW50Jm5ic3A7Qm9udXM6Jm5ic3A7QFRGVFVuaXRQcm9wZXJ0eS50cmFpdDpURlQxN19TdGFyZ2F6ZXJfTWVkYWxsaW9uX0luY3JlYXNlQCUgJWk6c2NhbGVEQSUpPGJyPjxicj48cnVsZXM+TW9yZSBoZXhlcyByZXZlYWwgYXQgZWFjaCBwbGF5ZXIgbGV2ZWw8L3J1bGVzPlwiLFxyXG4gICAgaWNvbjogXCJBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXzE3X1N0YXJnYXplci5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMywgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJnb2xkXCIgfV0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBpZDogXCJURlQxN19TdGFyZ2F6ZXJfSHVudHJlc3NcIixcclxuICAgIG5hbWU6IFwiU3RhcmdhemVyXCIsXHJcbiAgICBkZXNjOiBcIlN0YXJnYXplcnMgY2hhcnQgYSBkaWZmZXJlbnQgY29uc3RlbGxhdGlvbiBldmVyeSBnYW1lLiBUaGlzIGdhbWU6IDxURlRTdGFyZ2F6ZXI+VGhlIEh1bnRyZXNzPC9URlRTdGFyZ2F6ZXI+Ljxicj48YnI+Q29tYmF0IFN0YXJ0OiBNYXJrIHRoZSBoaWdoZXN0IEhlYWx0aCBlbmVtaWVzLiA8YnI+PGJyPkFsbGllcyBpbiBlbXBvd2VyZWQgaGV4ZXMgZ2FpbiBASHVudHJlc3NfQVNfVGVhbXdpZGUqMTAwQCUgQXR0YWNrIFNwZWVkLiBTdGFyZ2F6ZXJzIGluIGVtcG93ZXJlZCBoZXhlcyBnYWluIG1vcmUgYW5kIGhlYWwgZm9yIEBIdW50cmVzc19IZWFsKjEwMEAlIG9mIHRoZWlyIG1heCBIZWFsdGggd2hlbiBhIG1hcmtlZCBlbmVteSBkaWVzLjxicj48YnI+PHJvdz4oQE1pblVuaXRzQCkgQEh1bnRyZXNzX0FTKjEwMEAlICVpOnNjYWxlQVMlLCBATnVtTWFya3NAIG1hcmtzPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEBIdW50cmVzc19BUyoxMDBAJSAlaTpzY2FsZUFTJSwgQE51bU1hcmtzQCBtYXJrczwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBASHVudHJlc3NfQVMqMTAwQCUgJWk6c2NhbGVBUyUsIEBOdW1NYXJrc0AgbWFya3M8L3Jvdz48YnI+PGJyPjxydWxlcz5Nb3JlIGhleGVzIHJldmVhbCBhdCBlYWNoIHBsYXllciBsZXZlbDwvcnVsZXM+XCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfU3RhcmdhemVyLlRGVF9TZXQxNy50ZXhcIixcclxuICAgIGVmZmVjdHM6IFt7IG1pblVuaXRzOiAzLCBtYXhVbml0czogNCwgc3R5bGU6IFwiYnJvbnplXCIgfSwgeyBtaW5Vbml0czogNSwgbWF4VW5pdHM6IDYsIHN0eWxlOiBcInNpbHZlclwiIH0sIHsgbWluVW5pdHM6IDcsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwiZ29sZFwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfU3RhcmdhemVyX1NlcnBlbnRcIixcclxuICAgIG5hbWU6IFwiU3RhcmdhemVyXCIsXHJcbiAgICBkZXNjOiBcIlN0YXJnYXplcnMgY2hhcnQgYSBkaWZmZXJlbnQgY29uc3RlbGxhdGlvbiBldmVyeSBnYW1lLiBUaGlzIGdhbWU6IDxURlRTdGFyZ2F6ZXI+VGhlIFNlcnBlbnQ8L1RGVFN0YXJnYXplcj4uPGJyPjxicj5BbGxpZXMgaW4gZW1wb3dlcmVkIGhleGVzIGdhaW4gQFNlcnBlbnRfRFJfVGVhbXdpZGUqMTAwQCUgRHVyYWJpbGl0eS4gU3RhcmdhemVycyBpbiBlbXBvd2VyZWQgaGV4ZXMgZ2FpbiBtb3JlIGFuZCBwb2lzb24gZW5lbWllcywgcmVwZWF0aW5nIGEgcG9ydGlvbiBvZiBkYW1hZ2UgZGVhbHQgYXMgbWFnaWMgZGFtYWdlIG92ZXIgQFNlcnBlbnRfRHVyYXRpb25AIHNlY29uZHMuPGJyPjxicj48ZXhwYW5kUm93PihATWluVW5pdHNAKSBAU2VycGVudF9EUioxMDBAJSAlaTpzY2FsZURSJSwgQFNlcnBlbnRfUG9pc29uKjEwMEAlIHBvaXNvbiBkYW1hZ2U8L2V4cGFuZFJvdz48YnI+PGJyPjxydWxlcz5Nb3JlIGhleGVzIHJldmVhbCBhdCBlYWNoIHBsYXllciBsZXZlbDwvcnVsZXM+XCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfU3RhcmdhemVyLlRGVF9TZXQxNy50ZXhcIixcclxuICAgIGVmZmVjdHM6IFt7IG1pblVuaXRzOiAzLCBtYXhVbml0czogNCwgc3R5bGU6IFwiYnJvbnplXCIgfSwgeyBtaW5Vbml0czogNSwgbWF4VW5pdHM6IDYsIHN0eWxlOiBcInNpbHZlclwiIH0sIHsgbWluVW5pdHM6IDcsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwiZ29sZFwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfU3RhcmdhemVyX1NoaWVsZFwiLFxyXG4gICAgbmFtZTogXCJTdGFyZ2F6ZXJcIixcclxuICAgIGRlc2M6IFwiU3RhcmdhemVycyBjaGFydCBhIGRpZmZlcmVudCBjb25zdGVsbGF0aW9uIGV2ZXJ5IGdhbWUuIFRoaXMgZ2FtZTogPFRGVFN0YXJnYXplcj5UaGUgQWx0YXI8L1RGVFN0YXJnYXplcj4uPGJyPjxicj48cm93PihATWluVW5pdHNAKSBXaGVuIEFOWSBjaGFtcGlvbiBkaWVzLCB0aGV5IGFyZSBzYWNyaWZpY2VkIHRvIHRoZSBBbHRhci4gQWxsaWVzIGluIGVtcG93ZXJlZCBoZXhlcyBnYWluIEBTaGllbGRfSGVhbHRoX1RlYW13aWRlQCUgSGVhbHRoIGFuZCBAU2hpZWxkX0FTX1RlYW13aWRlQCUgQXR0YWNrIFNwZWVkLjxicj48YnI+QWZ0ZXIgQFNoaWVsZF9OdW1EZWF0aHNAIHNhY3JpZmljZXMsIFN0YXJnYXplcnMgaW4gZW1wb3dlcmVkIGhleGVzIGdhaW4gYW4gYWRkaXRpb25hbCBAU2hpZWxkX0Nhc2hvdXRIUEAlICVpOnNjYWxlSGVhbHRoJSBhbmQgQFNoaWVsZF9DYXNob3V0QVNAJSAlaTpzY2FsZUFTJTxicj48YnI+U2FjcmlmaWNlczogKEBURlRVbml0UHJvcGVydHkudHJhaXQ6VEZUMTdfU3RhcmdhemVyX1NoaWVsZF9EZWF0aHNAIC8gQFNoaWVsZF9OdW1EZWF0aHNAKTwvcm93Pjxicj48YnI+PHJ1bGVzPk1vcmUgaGV4ZXMgcmV2ZWFsIGF0IGVhY2ggcGxheWVyIGxldmVsPC9ydWxlcz5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl8xN19TdGFyZ2F6ZXIuVEZUX1NldDE3LnRleFwiLFxyXG4gICAgZWZmZWN0czogW3sgbWluVW5pdHM6IDMsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwiZ29sZFwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfU3RhcmdhemVyX0ZvdW50YWluXCIsXHJcbiAgICBuYW1lOiBcIlN0YXJnYXplclwiLFxyXG4gICAgZGVzYzogXCJTdGFyZ2F6ZXJzIGNoYXJ0IGEgZGlmZmVyZW50IGNvbnN0ZWxsYXRpb24gZXZlcnkgZ2FtZS4gVGhpcyBnYW1lOiA8VEZUU3RhcmdhemVyPlRoZSBGb3VudGFpbjwvVEZUU3RhcmdhemVyPi48YnI+PGJyPkFsbGllcyBpbiBlbXBvd2VyZWQgaGV4ZXMgZ2FpbiBARm91bnRhaW5fTWFuYVJlZ2VuX1RlYW13aWRlQCBNYW5hIFJlZ2VuLiBTdGFyZ2F6ZXJzIGluIGVtcG93ZXJlZCBoZXhlcyBnYWluIG1vcmUgYW5kIGhlYWwgdGhlIGxvd2VzdCBIZWFsdGggYWxseSB3aXRoIHRoZWlyIGFiaWxpdGllcy48YnI+PGJyPjxleHBhbmRSb3c+KEBNaW5Vbml0c0ApIEBGb3VudGFpbl9NYW5hUmVnZW5AICVpOlRGVE1hbmFSZWdlbiUsIEBGb3VudGFpbl9IZWFsUGVyY2VudCoxMDBAJSBhYmlsaXR5IGRhbWFnZSBoZWFsPC9leHBhbmRSb3c+PGJyPjxicj48cnVsZXM+TW9yZSBoZXhlcyByZXZlYWwgYXQgZWFjaCBwbGF5ZXIgbGV2ZWw8L3J1bGVzPlwiLFxyXG4gICAgaWNvbjogXCJBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXzE3X1N0YXJnYXplci5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMywgbWF4VW5pdHM6IDQsIHN0eWxlOiBcImJyb256ZVwiIH0sIHsgbWluVW5pdHM6IDUsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwiZ29sZFwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfU3RhcmdhemVyX01vdW50YWluXCIsXHJcbiAgICBuYW1lOiBcIlN0YXJnYXplclwiLFxyXG4gICAgZGVzYzogXCJTdGFyZ2F6ZXJzIGNoYXJ0IGEgZGlmZmVyZW50IGNvbnN0ZWxsYXRpb24gZXZlcnkgZ2FtZS4gVGhpcyBnYW1lOiA8VEZUU3RhcmdhemVyPlRoZSBNb3VudGFpbjwvVEZUU3RhcmdhemVyPjxicj48YnI+RXZlcnkgQE1vdW50YWluX1JvdW5kc1BlckVtYmxlbUAgcGxheWVyIGNvbWJhdHMsIGdhaW4gYSBTdGFyZ2F6ZXIgRW1ibGVtLiBTdGFyZ2F6ZXJzIGluIGVtcG93ZXJlZCBoZXhlcyBnYWluIHZhcmlvdXMgYm9udXNlcy48YnI+PGJyPihDb21iYXRzIFJlbWFpbmluZzombmJzcDtAVEZUVW5pdFByb3BlcnR5LnRyYWl0OlRGVDE3X1N0YXJnYXplcl9Nb3VudGFpbl9Db21iYXRzUmVtYWluaW5nQCk8YnI+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEdhaW4gQE1vdW50YWluX0hlYWx0aCoxMDBAJSBIZWFsdGg8L3Jvdz48YnI+PHJvdz4oQE1pblVuaXRzQCkgQU5EIEBNb3VudGFpbl9BREFQKjEwMEAlIEF0dGFjayBEYW1hZ2UgYW5kIEFiaWxpdHkgUG93ZXI8L3Jvdz48YnI+PHJvdz4oQE1pblVuaXRzQCkgQU5EIEBNb3VudGFpbl9SZXNpc3RzQCBBcm1vciBhbmQgTWFnaWMgUmVzaXN0PC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEFORCBATW91bnRhaW5fQVMqMTAwQCUgQXR0YWNrIFNwZWVkPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEFORCBATW91bnRhaW5fRFIqMTAwQCUgRHVyYWJpbGl0eTwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBBTkQgaW5jcmVhc2UgYWxsIG90aGVyIGJvbnVzZXMgYnkgQE1vdW50YWluX1N0YXRJbmNyZWFzZSoxMDBAJTwvcm93Pjxicj48YnI+PHJ1bGVzPk1vcmUgaGV4ZXMgcmV2ZWFsIGF0IGVhY2ggcGxheWVyIGxldmVsPC9ydWxlcz5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl8xN19TdGFyZ2F6ZXIuVEZUX1NldDE3LnRleFwiLFxyXG4gICAgZWZmZWN0czogW3sgbWluVW5pdHM6IDMsIG1heFVuaXRzOiAzLCBzdHlsZTogXCJicm9uemVcIiB9LCB7IG1pblVuaXRzOiA0LCBtYXhVbml0czogNCwgc3R5bGU6IFwic2lsdmVyXCIgfSwgeyBtaW5Vbml0czogNSwgbWF4VW5pdHM6IDUsIHN0eWxlOiBcInNpbHZlclwiIH0sIHsgbWluVW5pdHM6IDYsIG1heFVuaXRzOiA2LCBzdHlsZTogXCJzaWx2ZXJcIiB9LCB7IG1pblVuaXRzOiA3LCBtYXhVbml0czogNywgc3R5bGU6IFwic2lsdmVyXCIgfSwgeyBtaW5Vbml0czogOCwgbWF4VW5pdHM6IDgsIHN0eWxlOiBcImdvbGRcIiB9LCB7IG1pblVuaXRzOiA5LCBtYXhVbml0czogOSwgc3R5bGU6IFwiZ29sZFwiIH0sIHsgbWluVW5pdHM6IDEwLCBtYXhVbml0czogMTAsIHN0eWxlOiBcImdvbGRcIiB9LCB7IG1pblVuaXRzOiAxMSwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJwcmlzbWF0aWNcIiB9XSxcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiBcIlRGVDE3X1N0YXJnYXplclwiLFxyXG4gICAgbmFtZTogXCJTdGFyZ2F6ZXJcIixcclxuICAgIGRlc2M6IFwiU3RhcmdhemVycyBjaGFydCBhIGRpZmZlcmVudCBjb25zdGVsbGF0aW9uIGV2ZXJ5IGdhbWUuPGJyPjxicj5TdGFyZ2F6ZXJzIGluIGVtcG93ZXJlZCBoZXhlcyBnYWluIHZhcmlvdXMgYm9udXNlcywgc3RhcnRpbmcgYXQgKEBNaW5Vbml0c0ApIHVuaXRzLjxicj48YnI+PHJ1bGVzPk1vcmUgaGV4ZXMgcmV2ZWFsIGF0IGVhY2ggcGxheWVyIGxldmVsLjwvcnVsZXM+XCIsXHJcbiAgICBpY29uOiBcIkFTU0VUUy9VWC9UcmFpdEljb25zL1RyYWl0X0ljb25fMTdfU3RhcmdhemVyLlRGVF9TZXQxNy50ZXhcIixcclxuICAgIGVmZmVjdHM6IFt7IG1pblVuaXRzOiAzLCBtYXhVbml0czogNCwgc3R5bGU6IFwiYnJvbnplXCIgfSwgeyBtaW5Vbml0czogNSwgbWF4VW5pdHM6IDYsIHN0eWxlOiBcInNpbHZlclwiIH0sIHsgbWluVW5pdHM6IDcsIG1heFVuaXRzOiAyNTAwMCwgc3R5bGU6IFwiZ29sZFwiIH1dLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IFwiVEZUMTdfVGltZWJyZWFrZXJcIixcclxuICAgIG5hbWU6IFwiVGltZWJyZWFrZXJcIixcclxuICAgIGRlc2M6IFwiPHJvdz4oQE1pblVuaXRzQCkgV2hlbiB5b3UgbG9zZSwgZ2FpbiBmcmVlIHJlcm9sbHMuIFdoZW4geW91IHdpbiwgc3RvcmUgWFAgaW4gYSBUZW1wb3JhbCBDb3JlIChzY2FsZXMgd2l0aCBzdGFnZSkuPC9yb3c+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEFORCBBbGxpZXMgZ2FpbiBAQXR0YWNrU3BlZWQqMTAwQCUgQXR0YWNrIFNwZWVkLjwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBBTkQgVGltZWJyZWFrZXJzIGdhaW4gYW4gYWRkaXRpb25hbCBAVGltZWJyZWFrZXJBZGRpdGlvbmFsQVMqMTAwQCUgQXR0YWNrIFNwZWVkPC9yb3c+PGJyPjxicj48cnVsZXM+UmVyb2xscyBvbiBMb3NzOiBAVEZUVW5pdFByb3BlcnR5LjpURlQxN19UaW1lYnJlYWtlcl9OdW1SZXJvbGxzVG9vbHRpcEA8YnI+WFAgb24gV2luOiBAVEZUVW5pdFByb3BlcnR5LjpURlQxN19UaW1lYnJlYWtlcl9OdW1YUFRvb2x0aXBAPC9ydWxlcz5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl8xN19UaW1lYnJlYWtlci5URlRfU2V0MTcudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMiwgbWF4VW5pdHM6IDIsIHN0eWxlOiBcImJyb256ZVwiIH0sIHsgbWluVW5pdHM6IDMsIG1heFVuaXRzOiAzLCBzdHlsZTogXCJzaWx2ZXJcIiB9LCB7IG1pblVuaXRzOiA0LCBtYXhVbml0czogMjUwMDAsIHN0eWxlOiBcImdvbGRcIiB9XSxcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiBcIlRGVDE3X1NoaWVsZFRhbmtcIixcclxuICAgIG5hbWU6IFwiVmFuZ3VhcmRcIixcclxuICAgIGRlc2M6IFwiVmFuZ3VhcmRzIGdhaW4gQERhbWFnZVJlZHVjdGlvblBjdCoxMDBAJSBEdXJhYmlsaXR5IHdoaWxlIFNoaWVsZGVkLiA8YnI+PGJyPkNvbWJhdCBzdGFydCBhbmQgQEhlYWx0aFRocmVzaG9sZCoxMDBAJSZuYnNwO0hlYWx0aDogR2FpbiBhIG1heCBIZWFsdGggU2hpZWxkIGZvciBAU2hpZWxkRHVyYXRpb25AJm5ic3A7c2Vjb25kcy48YnI+PGJyPjxyb3c+KEBNaW5Vbml0c0ApIEBTaGllbGRQZXJjZW50QW1vdW50KjEwMEAlIG1heCBIZWFsdGg8L3Jvdz48YnI+PHJvdz4oQE1pblVuaXRzQCkgQFNoaWVsZFBlcmNlbnRBbW91bnQqMTAwQCUgbWF4IEhlYWx0aDwvcm93Pjxicj48cm93PihATWluVW5pdHNAKSBAU2hpZWxkUGVyY2VudEFtb3VudCoxMDBAJSBtYXggSGVhbHRoOzxicj5ARW5oYW5jZWREdXJhYmlsaXR5KjEwMEAlJm5ic3A7JWk6c2NhbGVEUiUgd2hpbGUgU2hpZWxkZWQ8L3Jvdz5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl8xMl9WYW5ndWFyZC5URlRfU2V0MTIudGV4XCIsXHJcbiAgICBlZmZlY3RzOiBbeyBtaW5Vbml0czogMiwgbWF4VW5pdHM6IDMsIHN0eWxlOiBcImJyb256ZVwiIH0sIHsgbWluVW5pdHM6IDQsIG1heFVuaXRzOiA1LCBzdHlsZTogXCJzaWx2ZXJcIiB9LCB7IG1pblVuaXRzOiA2LCBtYXhVbml0czogMjUwMDAsIHN0eWxlOiBcImdvbGRcIiB9XSxcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiBcIlRGVDE3X0ZsZXhUcmFpdFwiLFxyXG4gICAgbmFtZTogXCJWb3lhZ2VyXCIsXHJcbiAgICBkZXNjOiBcIkNvbWJhdCBTdGFydDogWW91ciBUYW5rcyBnYWluIGEgU2hpZWxkIGZvciBAU2hpZWxkRHVyYXRpb25AIHNlY29uZHMuIFlvdXIgb3RoZXIgYWxsaWVzIGdhaW4gRGFtYWdlIEFtcC4gPGJyPjxicj5Wb3lhZ2VycyBnYWluIGRvdWJsZS48YnI+PGJyPjxleHBhbmRSb3c+KEBNaW5Vbml0c0ApIEBTaGllbGRIUEAgU2hpZWxkOyBAQm9udXNEQSoxMDBAJSAlaTpzY2FsZURBJTwvZXhwYW5kUm93Pjxicj5cIixcclxuICAgIGljb246IFwiQVNTRVRTL1VYL1RyYWl0SWNvbnMvVHJhaXRfSWNvbl8xN19Wb3lhZ2VyLlRGVF9TZXQxNy50ZXhcIixcclxuICAgIGVmZmVjdHM6IFt7IG1pblVuaXRzOiAyLCBtYXhVbml0czogMiwgc3R5bGU6IFwiYnJvbnplXCIgfSwgeyBtaW5Vbml0czogMywgbWF4VW5pdHM6IDMsIHN0eWxlOiBcInNpbHZlclwiIH0sIHsgbWluVW5pdHM6IDQsIG1heFVuaXRzOiA0LCBzdHlsZTogXCJzaWx2ZXJcIiB9LCB7IG1pblVuaXRzOiA1LCBtYXhVbml0czogNSwgc3R5bGU6IFwic2lsdmVyXCIgfSwgeyBtaW5Vbml0czogNiwgbWF4VW5pdHM6IDI1MDAwLCBzdHlsZTogXCJnb2xkXCIgfV0sXHJcbiAgfSxcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCB0cmFpdE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBUcmFpdD4odHJhaXRzLm1hcCh0ID0+IFt0LmlkLCB0XSkpO1xyXG5leHBvcnQgY29uc3QgdHJhaXRCeU5hbWUgPSBuZXcgTWFwPHN0cmluZywgVHJhaXQ+KHRyYWl0cy5tYXAodCA9PiBbdC5uYW1lLCB0XSkpO1xyXG4iLCIvLyBBdXRoU2VydmljZSDigJQgdGhpbiBjbGllbnQgZm9yIHRoZSBDbG91ZGZsYXJlIFdvcmtlciAvYXV0aCBlbmRwb2ludHMuXG4vL1xuLy8gVG9rZW4gaXMga2VwdCBpbiBsb2NhbFN0b3JhZ2UuIENvbXBvbmVudHMgdGhhdCBjYXJlIGFib3V0IGxvZ2luIHN0YXRlIGNhblxuLy8gZWl0aGVyIGNhbGwgZ2V0Q3VycmVudFVzZXIoKSBvbmNlIG9uIG1vdW50LCBvciBzdWJzY3JpYmUgdmlhIG9uQ2hhbmdlKCkuXG5cbmltcG9ydCB7IGtSaW90QXBpQmFzZVVybCB9IGZyb20gJy4uL2NvbnN0cyc7XG5cbmV4cG9ydCB0eXBlIFVzZXJSb2xlID0gJ3VzZXInIHwgJ21vZGVyYXRvcicgfCAnYWRtaW4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXIge1xuICBpZDogbnVtYmVyO1xuICBlbWFpbDogc3RyaW5nO1xuICByb2xlOiBVc2VyUm9sZTtcbiAgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGw7XG59XG5cbmludGVyZmFjZSBBdXRoUmVzcG9uc2Uge1xuICB0b2tlbjogc3RyaW5nO1xuICB1c2VyOiBVc2VyO1xufVxuXG5jb25zdCBTVE9SQUdFX1RPS0VOID0gJ3Bpdm90dGZ0X2F1dGhfdG9rZW4nO1xuY29uc3QgU1RPUkFHRV9VU0VSID0gJ3Bpdm90dGZ0X2F1dGhfdXNlcic7XG5cbnR5cGUgTGlzdGVuZXIgPSAodXNlcjogVXNlciB8IG51bGwpID0+IHZvaWQ7XG5jb25zdCBsaXN0ZW5lcnMgPSBuZXcgU2V0PExpc3RlbmVyPigpO1xuXG5mdW5jdGlvbiBlbWl0KCk6IHZvaWQge1xuICBjb25zdCB1c2VyID0gZ2V0U3RvcmVkVXNlcigpO1xuICBsaXN0ZW5lcnMuZm9yRWFjaChsID0+IHtcbiAgICB0cnkgeyBsKHVzZXIpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoJ1tBdXRoU2VydmljZV0gbGlzdGVuZXIgdGhyZXc6JywgZSk7IH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb2tlbigpOiBzdHJpbmcgfCBudWxsIHtcbiAgdHJ5IHsgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfVE9LRU4pOyB9IGNhdGNoIHsgcmV0dXJuIG51bGw7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0b3JlZFVzZXIoKTogVXNlciB8IG51bGwge1xuICB0cnkge1xuICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfVVNFUik7XG4gICAgcmV0dXJuIHJhdyA/IEpTT04ucGFyc2UocmF3KSBhcyBVc2VyIDogbnVsbDtcbiAgfSBjYXRjaCB7IHJldHVybiBudWxsOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0F1dGhlbnRpY2F0ZWQoKTogYm9vbGVhbiB7XG4gIHJldHVybiAhIWdldFRva2VuKCkgJiYgISFnZXRTdG9yZWRVc2VyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FkbWluKCk6IGJvb2xlYW4ge1xuICBjb25zdCB1ID0gZ2V0U3RvcmVkVXNlcigpO1xuICByZXR1cm4gISF1ICYmIHUucm9sZSA9PT0gJ2FkbWluJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0F0TGVhc3Qocm9sZTogVXNlclJvbGUpOiBib29sZWFuIHtcbiAgY29uc3QgdSA9IGdldFN0b3JlZFVzZXIoKTtcbiAgaWYgKCF1KSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHJhbms6IFJlY29yZDxVc2VyUm9sZSwgbnVtYmVyPiA9IHsgdXNlcjogMSwgbW9kZXJhdG9yOiAyLCBhZG1pbjogMyB9O1xuICByZXR1cm4gcmFua1t1LnJvbGVdID49IHJhbmtbcm9sZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNoYW5nZShsaXN0ZW5lcjogTGlzdGVuZXIpOiAoKSA9PiB2b2lkIHtcbiAgbGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XG4gIHJldHVybiAoKSA9PiBsaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcbn1cblxuZnVuY3Rpb24gc2V0U2Vzc2lvbihyZXM6IEF1dGhSZXNwb25zZSk6IHZvaWQge1xuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfVE9LRU4sIHJlcy50b2tlbik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9VU0VSLCBKU09OLnN0cmluZ2lmeShyZXMudXNlcikpO1xuICB9IGNhdGNoIHsgLyogcXVvdGEgZXRjIOKAlCBzaWxlbnQgKi8gfVxuICBlbWl0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlc3Npb24oKTogdm9pZCB7XG4gIHRyeSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9UT0tFTik7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9VU0VSKTtcbiAgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XG4gIGVtaXQoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcG9zdEpzb248VD4ocGF0aDogc3RyaW5nLCBib2R5OiB1bmtub3duKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHVybCA9IGAke2tSaW90QXBpQmFzZVVybH0ke3BhdGh9YDtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gIH0pO1xuICBsZXQgcGF5bG9hZDogYW55O1xuICB0cnkgeyBwYXlsb2FkID0gYXdhaXQgcmVzLmpzb24oKTsgfSBjYXRjaCB7IHBheWxvYWQgPSB7IGVycm9yOiByZXMuc3RhdHVzVGV4dCB9OyB9XG4gIGlmICghcmVzLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQ/LmVycm9yIHx8IGBIVFRQICR7cmVzLnN0YXR1c31gKTtcbiAgfVxuICByZXR1cm4gcGF5bG9hZCBhcyBUO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRKc29uPFQ+KHBhdGg6IHN0cmluZywgdG9rZW4/OiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHVybCA9IGAke2tSaW90QXBpQmFzZVVybH0ke3BhdGh9YDtcbiAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICBpZiAodG9rZW4pIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHsgaGVhZGVycyB9KTtcbiAgbGV0IHBheWxvYWQ6IGFueTtcbiAgdHJ5IHsgcGF5bG9hZCA9IGF3YWl0IHJlcy5qc29uKCk7IH0gY2F0Y2ggeyBwYXlsb2FkID0geyBlcnJvcjogcmVzLnN0YXR1c1RleHQgfTsgfVxuICBpZiAoIXJlcy5vaykgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQ/LmVycm9yIHx8IGBIVFRQICR7cmVzLnN0YXR1c31gKTtcbiAgcmV0dXJuIHBheWxvYWQgYXMgVDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGRpc3BsYXlOYW1lPzogc3RyaW5nKTogUHJvbWlzZTxVc2VyPiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHBvc3RKc29uPEF1dGhSZXNwb25zZT4oJy9hdXRoL3JlZ2lzdGVyJywgeyBlbWFpbCwgcGFzc3dvcmQsIGRpc3BsYXlOYW1lIH0pO1xuICBzZXRTZXNzaW9uKHJlcyk7XG4gIHJldHVybiByZXMudXNlcjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ2luKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcG9zdEpzb248QXV0aFJlc3BvbnNlPignL2F1dGgvbG9naW4nLCB7IGVtYWlsLCBwYXNzd29yZCB9KTtcbiAgc2V0U2Vzc2lvbihyZXMpO1xuICByZXR1cm4gcmVzLnVzZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQoKTogdm9pZCB7XG4gIGNsZWFyU2Vzc2lvbigpO1xufVxuXG4vKipcbiAqIFJlZnJlc2ggdXNlciBpbmZvIGZyb20gYmFja2VuZC4gVXNlZnVsIGFmdGVyIHJvbGUgY2hhbmdlcyBvciB0byBjb25maXJtXG4gKiB0b2tlbiB2YWxpZGl0eS4gQ2xlYXJzIHNlc3Npb24gb24gNDAxLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVmcmVzaE1lKCk6IFByb21pc2U8VXNlciB8IG51bGw+IHtcbiAgY29uc3QgdG9rZW4gPSBnZXRUb2tlbigpO1xuICBpZiAoIXRva2VuKSByZXR1cm4gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRKc29uPHsgdXNlcjogVXNlciB9PignL2F1dGgvbWUnLCB0b2tlbik7XG4gICAgdHJ5IHsgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9VU0VSLCBKU09OLnN0cmluZ2lmeShyZXMudXNlcikpOyB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbiAgICBlbWl0KCk7XG4gICAgcmV0dXJuIHJlcy51c2VyO1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICBpZiAoKGUubWVzc2FnZSB8fCAnJykuaW5jbHVkZXMoJ0hUVFAgNDAxJykpIGNsZWFyU2Vzc2lvbigpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogSGVscGVyIGZvciBhZG1pbi1vbmx5IGZldGNoZXMg4oCUIGF1dG9tYXRpY2FsbHkgYXR0YWNoZXMgQmVhcmVyIHRva2VuLlxuICogVGhyb3dzIGlmIG5vdCBsb2dnZWQgaW4uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZG1pbkZldGNoPFQ+KHBhdGg6IHN0cmluZywgaW5pdDogUmVxdWVzdEluaXQgPSB7fSk6IFByb21pc2U8VD4ge1xuICBjb25zdCB0b2tlbiA9IGdldFRva2VuKCk7XG4gIGlmICghdG9rZW4pIHRocm93IG5ldyBFcnJvcignTm90IGF1dGhlbnRpY2F0ZWQnKTtcbiAgY29uc3QgdXJsID0gYCR7a1Jpb3RBcGlCYXNlVXJsfSR7cGF0aH1gO1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAuLi5pbml0LFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIC4uLihpbml0LmhlYWRlcnMgfHwge30pLFxuICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIC4uLihpbml0LmJvZHkgPyB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSA6IHt9KSxcbiAgICB9LFxuICB9KTtcbiAgbGV0IHBheWxvYWQ6IGFueTtcbiAgdHJ5IHsgcGF5bG9hZCA9IGF3YWl0IHJlcy5qc29uKCk7IH0gY2F0Y2ggeyBwYXlsb2FkID0geyBlcnJvcjogcmVzLnN0YXR1c1RleHQgfTsgfVxuICBpZiAoIXJlcy5vaykge1xuICAgIGlmIChyZXMuc3RhdHVzID09PSA0MDEpIGNsZWFyU2Vzc2lvbigpO1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkPy5lcnJvciB8fCBgSFRUUCAke3Jlcy5zdGF0dXN9YCk7XG4gIH1cbiAgcmV0dXJuIHBheWxvYWQgYXMgVDtcbn1cbiIsIi8vIFBpdm90VEZUIOKAlCBJbi1nYW1lIENvbXBWaWV3ZXJSZW5kZXJlclxyXG4vLyBSZWFkcyB0aGUgcGlubmVkIGNvbXAgZnJvbSBsb2NhbFN0b3JhZ2UgYW5kIHJlbmRlcnMgaXQgYXMgYSBwYXNzaXZlIG92ZXJsYXkuXHJcbi8vIExpc3RlbnMgZm9yIGBzdG9yYWdlYCBldmVudHMgc28gY2hhbmdlcyBmcm9tIHRoZSBkZXNrdG9wIHdpbmRvdyBwcm9wYWdhdGVcclxuLy8gaW5zdGFudGx5LiBOZXZlciByZWFkcyBmcm9tIE1hdGNoVHJhY2tlciBvciBnYW1lIGV2ZW50cy5cclxuXHJcbmltcG9ydCB7IG1ldGFDb21wcywgZ2V0Q29tcHNCeVRpZXIgfSBmcm9tIFwiLi4vZGF0YS9zZXQxNy9jb21wc1wiO1xyXG5pbXBvcnQgeyBjaGFtcGlvbk1hcCB9IGZyb20gXCIuLi9kYXRhL3NldDE3L2NoYW1waW9uc1wiO1xyXG5pbXBvcnQgeyBpdGVtTWFwIH0gZnJvbSBcIi4uL2RhdGEvc2V0MTcvaXRlbXNcIjtcclxuaW1wb3J0IHsgdHJhaXRNYXAgfSBmcm9tIFwiLi4vZGF0YS9zZXQxNy90cmFpdHNcIjtcclxuaW1wb3J0IHsgZ2V0UG9zaXRpb25pbmdHdWlkZSB9IGZyb20gXCIuLi9kYXRhL3NldDE3L3Bvc2l0aW9uaW5nXCI7XHJcbmltcG9ydCB7IGdldENoYW1waW9uSWNvblVybCwgZ2V0SXRlbUljb25VcmwsIGdldFRyYWl0SWNvblVybCB9IGZyb20gXCIuLi9kYXRhL2Fzc2V0VXJsc1wiO1xyXG5cclxuY29uc3QgUElOTkVEX0tFWSA9ICdwaXZvdHRmdF9waW5uZWRfY29tcF9pZCc7XHJcblxyXG4vLyBQaW4gc3RvcmFnZSBmb3JtYXRzOlxyXG4vLyAgIC0gTGVnYWN5OiAgIHBsYWluIHN0cmluZyA9IGN1cmF0ZWQgY29tcCBpZCAoXCJzZXQxNy1tZWNoYS1hdXJlbGlvbnNvbFwiKVxyXG4vLyAgIC0gQ3VyYXRlZDogIHtcImtpbmRcIjpcImN1cmF0ZWRcIixcImlkXCI6XCIuLi5cIn1cclxuLy8gICAtIExpdmU6ICAgICB7XCJraW5kXCI6XCJsaXZlXCIsIGNvbXBLZXksIHRpdGxlLCBjYXJyaWVzLCB0cmFpdHMsIHN0YXRzfVxyXG4vLyBUaGUgcmVhZGVyIGF1dG8tbWlncmF0ZXMgbGVnYWN5IHN0cmluZ3Mgb24gcmVhZDsgcGluQ29tcElkKCkgc3RpbGwgd3JpdGVzXHJcbi8vIHRoZSBsZWdhY3kgc2hhcGUgc28gZXhpc3RpbmcgY2FsbCBzaXRlcyBkb24ndCBjaGFuZ2UuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGl2ZVBpbiB7XHJcbiAgY29tcEtleTogc3RyaW5nO1xyXG4gIHRpdGxlOiAgIHN0cmluZztcclxuICBjYXJyaWVzOiBzdHJpbmdbXTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoYW1waW9uIGlkcywgb3JkZXJlZFxyXG4gIHRyYWl0czogIEFycmF5PHsgaWQ6IHN0cmluZzsgdGllcjogbnVtYmVyIH0+OyAgICAgLy8gc3R5bGVkIHRyYWl0cywgb3JkZXJlZCBieSB0aWVyIGRlc2NcclxuICBzdGF0czogICB7IGF2ZzogbnVtYmVyOyB0b3A0OiBudW1iZXI7IHdpbjogbnVtYmVyOyBnYW1lczogbnVtYmVyOyBwaWNrOiBudW1iZXIgfTtcclxufVxyXG5cclxudHlwZSBQaW5QYXlsb2FkID1cclxuICB8IHsga2luZDogJ2N1cmF0ZWQnOyBpZDogc3RyaW5nIH1cclxuICB8IHsga2luZDogJ2xpdmUnOyAgICBsaXZlOiBMaXZlUGluIH07XHJcblxyXG5mdW5jdGlvbiBlc2NhcGVGb3JBdHRyKHM6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIFN0cmluZyhzKVxyXG4gICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcclxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcclxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcclxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRQaW4oKTogUGluUGF5bG9hZCB8IG51bGwge1xyXG4gIGxldCByYXc6IHN0cmluZyB8IG51bGwgPSBudWxsO1xyXG4gIHRyeSB7IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFBJTk5FRF9LRVkpOyB9IGNhdGNoIHsgcmV0dXJuIG51bGw7IH1cclxuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XHJcbiAgaWYgKHJhdy5jaGFyQXQoMCkgPT09ICd7Jykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcCA9IEpTT04ucGFyc2UocmF3KTtcclxuICAgICAgaWYgKHA/LmtpbmQgPT09ICdsaXZlJyAmJiBwLmxpdmU/LmNvbXBLZXkpIHJldHVybiB7IGtpbmQ6ICdsaXZlJywgbGl2ZTogcC5saXZlIH07XHJcbiAgICAgIGlmIChwPy5raW5kID09PSAnY3VyYXRlZCcgJiYgcC5pZCkgICAgICAgICByZXR1cm4geyBraW5kOiAnY3VyYXRlZCcsIGlkOiBwLmlkIH07XHJcbiAgICB9IGNhdGNoIHsgLyogZmFsbCB0aHJvdWdoICovIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICByZXR1cm4geyBraW5kOiAnY3VyYXRlZCcsIGlkOiByYXcgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBWaWV3ZXJSZW5kZXJlciB7XHJcblxyXG4gIHN0YXRpYyBpbml0KCkge1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgKGUpID0+IHtcclxuICAgICAgaWYgKGUua2V5ID09PSBQSU5ORURfS0VZKSB0aGlzLnJlbmRlcigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgcGluID0gcmVhZFBpbigpO1xyXG4gICAgY29uc3QgZW1wdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyLWVtcHR5LXN0YXRlJyk7XHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdlci1jb250ZW50Jyk7XHJcbiAgICBjb25zdCBuYW1lRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyLWNvbXAtbmFtZScpO1xyXG5cclxuICAgIGlmICghcGluKSB7XHJcbiAgICAgIGlmIChlbXB0eSkgZW1wdHkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgaWYgKGNvbnRlbnQpIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgaWYgKG5hbWVFbCkgbmFtZUVsLnRleHRDb250ZW50ID0gJ05vIGNvbXAgcGlubmVkJztcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwaW4ua2luZCA9PT0gJ2xpdmUnKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyTGl2ZVBpbihwaW4ubGl2ZSwgeyBlbXB0eSwgY29udGVudCwgbmFtZUVsIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29tcCA9IG1ldGFDb21wcy5maW5kKGMgPT4gYy5pZCA9PT0gcGluLmlkKTtcclxuICAgIGlmICghY29tcCkge1xyXG4gICAgICBpZiAoZW1wdHkpIGVtcHR5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgIGlmIChjb250ZW50KSBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgIGlmIChuYW1lRWwpIG5hbWVFbC50ZXh0Q29udGVudCA9ICdObyBjb21wIHBpbm5lZCc7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW1wdHkpIGVtcHR5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBpZiAoY29udGVudCkgY29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIGlmIChuYW1lRWwpIHtcclxuICAgICAgbmFtZUVsLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8c3BhbiBjbGFzcz1cInZpZXdlci10aWVyLWJhZGdlIHRpZXItJHtjb21wLnRpZXIudG9Mb3dlckNhc2UoKX1cIj4ke2NvbXAudGllcn08L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aWV3ZXItY29tcC1uYW1lLXRleHRcIj4ke2NvbXAubmFtZX08L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aWV3ZXItY29tcC1tZXRhXCI+JHtjb21wLnBsYXlzdHlsZX0gwrcgTHYke2NvbXAubGV2ZWx9PC9zcGFuPlxyXG4gICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyVW5pdHMoY29tcCk7XHJcbiAgICB0aGlzLnJlbmRlckl0ZW1zKGNvbXApO1xyXG4gICAgdGhpcy5yZW5kZXJUcmFpdHMoY29tcCk7XHJcbiAgICB0aGlzLnJlbmRlckJvYXJkKGNvbXApO1xyXG4gICAgdGhpcy5yZW5kZXJUaXBzKGNvbXApO1xyXG4gIH1cclxuXHJcbiAgLy8gTGl2ZSBwaW46IG5vIHBvc2l0aW9uaW5nIGd1aWRlLCBubyBjdXJhdGVkIGRlc2NyaXB0aW9uIOKAlCBqdXN0IHRpdGxlLFxyXG4gIC8vIHN0eWxlZCB0cmFpdHMsIGNhcnJ5IGNoYW1waW9ucywgYW5kIHRoZSBsaXZlIHN0YXRzIGxpbmUuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVuZGVyTGl2ZVBpbihcclxuICAgIGxpdmU6IExpdmVQaW4sXHJcbiAgICByZWZzOiB7IGVtcHR5OiBIVE1MRWxlbWVudCB8IG51bGw7IGNvbnRlbnQ6IEhUTUxFbGVtZW50IHwgbnVsbDsgbmFtZUVsOiBIVE1MRWxlbWVudCB8IG51bGwgfSxcclxuICApOiB2b2lkIHtcclxuICAgIGNvbnN0IHsgZW1wdHksIGNvbnRlbnQsIG5hbWVFbCB9ID0gcmVmcztcclxuICAgIGlmIChlbXB0eSkgZW1wdHkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGlmIChjb250ZW50KSBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgaWYgKG5hbWVFbCkge1xyXG4gICAgICBjb25zdCBhdmcgPSBsaXZlLnN0YXRzLmF2Zy50b0ZpeGVkKDIpO1xyXG4gICAgICBjb25zdCB0b3A0ID0gKGxpdmUuc3RhdHMudG9wNCAqIDEwMCkudG9GaXhlZCgwKTtcclxuICAgICAgY29uc3Qgd2luID0gKGxpdmUuc3RhdHMud2luICogMTAwKS50b0ZpeGVkKDApO1xyXG4gICAgICBuYW1lRWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidmlld2VyLXRpZXItYmFkZ2Ugdmlld2VyLXRpZXItbGl2ZVwiPkxJVkU8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aWV3ZXItY29tcC1uYW1lLXRleHRcIj4ke2VzY2FwZUZvckF0dHIobGl2ZS50aXRsZSl9PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidmlld2VyLWNvbXAtbWV0YVwiPkFWRyAke2F2Z30gwrcgVE9QNCAke3RvcDR9JSDCtyBXSU4gJHt3aW59JSDCtyAke2xpdmUuc3RhdHMuZ2FtZXN9IGdhbWVzPC9zcGFuPlxyXG4gICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVuaXRzRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyLXVuaXRzJyk7XHJcbiAgICBpZiAodW5pdHNFbCkge1xyXG4gICAgICBpZiAobGl2ZS5jYXJyaWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHVuaXRzRWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJ2aWV3ZXItZW1wdHktbGluZVwiPk5vIGNhcnJ5IHVuaXRzIGlkZW50aWZpZWQgKGZsZXhpYmxlIGNvbXApLjwvZGl2Pic7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdW5pdHNFbC5pbm5lckhUTUwgPSBsaXZlLmNhcnJpZXMubWFwKGlkID0+IHtcclxuICAgICAgICAgIGNvbnN0IGNoYW1wID0gY2hhbXBpb25NYXAuZ2V0KGlkKTtcclxuICAgICAgICAgIGlmICghY2hhbXApIHJldHVybiAnJztcclxuICAgICAgICAgIGNvbnN0IGljb24gPSBnZXRDaGFtcGlvbkljb25VcmwoaWQpO1xyXG4gICAgICAgICAgY29uc3QgaW5pdGlhbHMgPSBjaGFtcC5uYW1lLnNwbGl0KCcgJykubWFwKHcgPT4gd1swXSkuam9pbignJykuc3Vic3RyaW5nKDAsIDIpO1xyXG4gICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpZXdlci11bml0IGNvc3QtJHtjaGFtcC5jb3N0fSBpcy1jYXJyeVwiIHRpdGxlPVwiJHtlc2NhcGVGb3JBdHRyKGNoYW1wLm5hbWUpfSDigJQgbGl2ZSBkYXRhIGNhcnJ5ICgke2NoYW1wLmNvc3R9ZylcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld2VyLXVuaXQtc3RhcnNcIj7imIXimIU8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld2VyLXVuaXQtcG9ydHJhaXRcIj5cclxuICAgICAgICAgICAgICAgICR7aWNvblxyXG4gICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7aWNvbn1cIiBhbHQ9XCIke2VzY2FwZUZvckF0dHIoY2hhbXAubmFtZSl9XCIgbG9hZGluZz1cImxhenlcIiBvbmVycm9yPVwidGhpcy5zdHlsZS5kaXNwbGF5PSdub25lJzt0aGlzLm5leHRFbGVtZW50U2libGluZy5zdHlsZS5kaXNwbGF5PSdmbGV4J1wiPmBcclxuICAgICAgICAgICAgICAgICAgOiAnJ31cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1bml0LWluaXRpYWxzXCIgJHtpY29uID8gJ3N0eWxlPVwiZGlzcGxheTpub25lXCInIDogJyd9PiR7aW5pdGlhbHN9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInZpZXdlci11bml0LWNhcnJ5LWNyb3duXCI+8J+RkTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld2VyLXVuaXQtbmFtZVwiPiR7ZXNjYXBlRm9yQXR0cihjaGFtcC5uYW1lKX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICB9KS5qb2luKCcnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGl0ZW1zRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyLWl0ZW1zJyk7XHJcbiAgICBpZiAoaXRlbXNFbCkge1xyXG4gICAgICBpdGVtc0VsLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwidmlld2VyLWVtcHR5LWxpbmVcIj5MaXZlIGRhdGEg4oCUIG9wZW4gTGl2ZSBNZXRhIOKAuiBjb21wIGNhcmQg4oC6IEJ1aWxkIFBhdGggZm9yIHR5cGljYWwgaXRlbXMgcGVyIHN0YWdlLjwvZGl2Pic7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdHJhaXRzRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyLXRyYWl0cycpO1xyXG4gICAgaWYgKHRyYWl0c0VsKSB7XHJcbiAgICAgIHRyYWl0c0VsLmlubmVySFRNTCA9IGxpdmUudHJhaXRzLnNsaWNlKDAsIDQpLm1hcCh0ID0+IHtcclxuICAgICAgICBjb25zdCB0ZCA9IHRyYWl0TWFwLmdldCh0LmlkKTtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IHRkPy5uYW1lIHx8IHQuaWQ7XHJcbiAgICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cInRyYWl0LWJhZGdlXCIgdGl0bGU9XCIke2VzY2FwZUZvckF0dHIobGFiZWwpfSAoJHt0LnRpZXJ9KVwiPiR7ZXNjYXBlRm9yQXR0cihsYWJlbCl9ICR7dC50aWVyfTwvc3Bhbj5gO1xyXG4gICAgICB9KS5qb2luKCcnKSB8fCAnPHNwYW4gY2xhc3M9XCJ2aWV3ZXItZW1wdHktbGluZVwiPk5vIHN0eWxlZCB0cmFpdHMuPC9zcGFuPic7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyLWJvYXJkJyk7XHJcbiAgICBpZiAoYm9hcmQpIGJvYXJkLmlubmVySFRNTCA9ICcnO1xyXG4gICAgY29uc3QgYm9hcmROb3RlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3ZXItYm9hcmQtbm90ZXMnKTtcclxuICAgIGlmIChib2FyZE5vdGVzKSBib2FyZE5vdGVzLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImJvYXJkLW5vdGVzLXRleHRcIj5ObyBwb3NpdGlvbmluZyBndWlkZSBmb3IgbGl2ZSBjb21wcy4gVXNlIHRoZSBjdXJhdGVkIHRpZXIgbGlzdCBmb3IgYm9hcmQgbGF5b3V0cy48L3A+JztcclxuXHJcbiAgICBjb25zdCB0aXBzU2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3ZXItdGlwcy1zZWN0aW9uJyk7XHJcbiAgICBpZiAodGlwc1NlY3Rpb24pIHRpcHNTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyByZW5kZXJVbml0cyhjb21wOiB0eXBlb2YgbWV0YUNvbXBzW251bWJlcl0pIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdlci11bml0cycpO1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgZWwuaW5uZXJIVE1MID0gY29tcC51bml0cy5tYXAodSA9PiB7XHJcbiAgICAgIGNvbnN0IGNoYW1wID0gY2hhbXBpb25NYXAuZ2V0KHUuY2hhbXBpb25JZCk7XHJcbiAgICAgIGlmICghY2hhbXApIHJldHVybiAnJztcclxuICAgICAgY29uc3QgaWNvbiA9IGdldENoYW1waW9uSWNvblVybCh1LmNoYW1waW9uSWQpO1xyXG4gICAgICBjb25zdCBzdGFycyA9ICfimIUnLnJlcGVhdCh1LnN0YXJMZXZlbCk7XHJcbiAgICAgIGNvbnN0IGluaXRpYWxzID0gY2hhbXAubmFtZS5zcGxpdCgnICcpLm1hcCh3ID0+IHdbMF0pLmpvaW4oJycpLnN1YnN0cmluZygwLCAyKTtcclxuICAgICAgY29uc3QgY2FycnlDbGFzcyA9IHUuaXNDYXJyeSA/ICdpcy1jYXJyeScgOiAnJztcclxuICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidmlld2VyLXVuaXQgY29zdC0ke2NoYW1wLmNvc3R9ICR7Y2FycnlDbGFzc31cIiB0aXRsZT1cIiR7Y2hhbXAubmFtZX0gJHtzdGFyc30gKCR7Y2hhbXAuY29zdH1nKSR7dS5pc0NhcnJ5ID8gJyDigJQgY2FycnknIDogJyd9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld2VyLXVuaXQtc3RhcnNcIj4ke3N0YXJzfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZpZXdlci11bml0LXBvcnRyYWl0XCI+XHJcbiAgICAgICAgICAgICR7aWNvblxyXG4gICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtpY29ufVwiIGFsdD1cIiR7Y2hhbXAubmFtZX1cIiBsb2FkaW5nPVwibGF6eVwiIG9uZXJyb3I9XCJ0aGlzLnN0eWxlLmRpc3BsYXk9J25vbmUnO3RoaXMubmV4dEVsZW1lbnRTaWJsaW5nLnN0eWxlLmRpc3BsYXk9J2ZsZXgnXCI+YFxyXG4gICAgICAgICAgICAgIDogJyd9XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1bml0LWluaXRpYWxzXCIgJHtpY29uID8gJ3N0eWxlPVwiZGlzcGxheTpub25lXCInIDogJyd9PiR7aW5pdGlhbHN9PC9kaXY+XHJcbiAgICAgICAgICAgICR7dS5pc0NhcnJ5ID8gJzxzcGFuIGNsYXNzPVwidmlld2VyLXVuaXQtY2FycnktY3Jvd25cIj7wn5GRPC9zcGFuPicgOiAnJ31cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZpZXdlci11bml0LW5hbWVcIj4ke2NoYW1wLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGA7XHJcbiAgICB9KS5qb2luKCcnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIHJlbmRlckl0ZW1zKGNvbXA6IHR5cGVvZiBtZXRhQ29tcHNbbnVtYmVyXSkge1xyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyLWl0ZW1zJyk7XHJcbiAgICBpZiAoIWVsKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY2FycmllcyA9IGNvbXAudW5pdHMuZmlsdGVyKHUgPT4gdS5pc0NhcnJ5ICYmIHUuaXRlbXMgJiYgdS5pdGVtcy5sZW5ndGgpO1xyXG4gICAgaWYgKGNhcnJpZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGVsLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwidmlld2VyLWVtcHR5LWxpbmVcIj5ObyBzcGVjaWZpYyBjYXJyeSBpdGVtcyBkZWZpbmVkIGZvciB0aGlzIGNvbXAuPC9kaXY+JztcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGVsLmlubmVySFRNTCA9IGNhcnJpZXMubWFwKHUgPT4ge1xyXG4gICAgICBjb25zdCBjaGFtcCA9IGNoYW1waW9uTWFwLmdldCh1LmNoYW1waW9uSWQpO1xyXG4gICAgICBjb25zdCBjaGFtcE5hbWUgPSBjaGFtcCA/IGNoYW1wLm5hbWUgOiB1LmNoYW1waW9uSWQ7XHJcbiAgICAgIGNvbnN0IGNoYW1wSWNvbiA9IGNoYW1wID8gZ2V0Q2hhbXBpb25JY29uVXJsKHUuY2hhbXBpb25JZCkgOiAnJztcclxuICAgICAgY29uc3QgaXRlbXNIdG1sID0gKHUuaXRlbXMgfHwgW10pLm1hcChpdGVtSWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtTWFwLmdldChpdGVtSWQpO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBpdGVtID8gaXRlbS5uYW1lIDogaXRlbUlkLnJlcGxhY2UoLy0vZywgJyAnKS5yZXBsYWNlKC9cXGJcXHcvZywgbCA9PiBsLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICAgIGNvbnN0IHN0YXRzID0gaXRlbSA/IGl0ZW0uc3RhdHMgOiAnJztcclxuICAgICAgICBjb25zdCBpY29uID0gZ2V0SXRlbUljb25VcmwoaXRlbUlkKTtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aWV3ZXItaXRlbS1waWxsXCIgdGl0bGU9XCIke25hbWV9XFxuJHtzdGF0c31cIj5cclxuICAgICAgICAgICAgJHtpY29uID8gYDxpbWcgc3JjPVwiJHtpY29ufVwiIGFsdD1cIiR7bmFtZX1cIiBsb2FkaW5nPVwibGF6eVwiPmAgOiAnJ31cclxuICAgICAgICAgICAgPHNwYW4+JHtuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICBgO1xyXG4gICAgICB9KS5qb2luKCcnKTtcclxuICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidmlld2VyLWNhcnJ5LXJvd1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZpZXdlci1jYXJyeS1uYW1lXCI+XHJcbiAgICAgICAgICAgICR7Y2hhbXBJY29uID8gYDxpbWcgc3JjPVwiJHtjaGFtcEljb259XCIgY2xhc3M9XCJ2aWV3ZXItY2FycnktaWNvblwiIGFsdD1cIlwiPmAgOiAnJ31cclxuICAgICAgICAgICAgPHNwYW4+JHtjaGFtcE5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld2VyLWNhcnJ5LWl0ZW1zXCI+JHtpdGVtc0h0bWx9PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIGA7XHJcbiAgICB9KS5qb2luKCcnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIHJlbmRlclRyYWl0cyhjb21wOiB0eXBlb2YgbWV0YUNvbXBzW251bWJlcl0pIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdlci10cmFpdHMnKTtcclxuICAgIGlmICghZWwpIHJldHVybjtcclxuICAgIGVsLmlubmVySFRNTCA9IGNvbXAuY29yZVRyYWl0cy5tYXAodCA9PiBgPHNwYW4gY2xhc3M9XCJ0cmFpdC1iYWRnZVwiPiR7dH08L3NwYW4+YCkuam9pbignJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyByZW5kZXJCb2FyZChjb21wOiB0eXBlb2YgbWV0YUNvbXBzW251bWJlcl0pIHtcclxuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdlci1ib2FyZCcpO1xyXG4gICAgY29uc3Qgbm90ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyLWJvYXJkLW5vdGVzJyk7XHJcbiAgICBpZiAoIWJvYXJkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZ3VpZGUgPSBnZXRQb3NpdGlvbmluZ0d1aWRlKGNvbXAuaWQpO1xyXG4gICAgY29uc3QgcGxhY2VtZW50cyA9IG5ldyBNYXA8c3RyaW5nLCBSZXR1cm5UeXBlPHR5cGVvZiBnZXRQb3NpdGlvbmluZ0d1aWRlPj4oKTtcclxuICAgIGlmIChndWlkZSkge1xyXG4gICAgICBmb3IgKGNvbnN0IHAgb2YgZ3VpZGUucGxhY2VtZW50cykge1xyXG4gICAgICAgIHBsYWNlbWVudHMuc2V0KGAke3Aucm93fS0ke3AuY29sfWAsIHsgY29tcElkOiBjb21wLmlkLCBwbGFjZW1lbnRzOiBbcF0sIG5vdGVzOiAnJyB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBodG1sID0gJyc7XHJcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCA0OyByb3crKykge1xyXG4gICAgICBjb25zdCBpc09kZFJvdyA9IHJvdyAlIDIgPT09IDE7XHJcbiAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJoZXgtcm93ICR7aXNPZGRSb3cgPyAnaGV4LXJvdy1vZmZzZXQnIDogJyd9XCI+YDtcclxuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgNzsgY29sKyspIHtcclxuICAgICAgICBjb25zdCB3cmFwcGVyID0gcGxhY2VtZW50cy5nZXQoYCR7cm93fS0ke2NvbH1gKTtcclxuICAgICAgICBjb25zdCBwbGFjZW1lbnQgPSB3cmFwcGVyICYmIHdyYXBwZXIucGxhY2VtZW50c1swXTtcclxuICAgICAgICBpZiAocGxhY2VtZW50KSB7XHJcbiAgICAgICAgICBjb25zdCBjaGFtcCA9IGNoYW1waW9uTWFwLmdldChwbGFjZW1lbnQuY2hhbXBpb25JZCk7XHJcbiAgICAgICAgICBjb25zdCBjaGFtcE5hbWUgPSBjaGFtcCA/IGNoYW1wLm5hbWUgOiAnPyc7XHJcbiAgICAgICAgICBjb25zdCBpbml0aWFscyA9IGNoYW1wTmFtZS5zcGxpdCgnICcpLm1hcCh3ID0+IHdbMF0pLmpvaW4oJycpLnN1YnN0cmluZygwLCAyKTtcclxuICAgICAgICAgIGNvbnN0IGNvc3RDbGFzcyA9IGNoYW1wID8gYGNvc3QtJHtjaGFtcC5jb3N0fWAgOiAnJztcclxuICAgICAgICAgIGNvbnN0IGljb24gPSBnZXRDaGFtcGlvbkljb25VcmwocGxhY2VtZW50LmNoYW1waW9uSWQpO1xyXG4gICAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cImhleC1jZWxsIGhleC1vY2N1cGllZCBoZXgtJHtwbGFjZW1lbnQucm9sZX0gJHtjb3N0Q2xhc3N9XCIgZGF0YS1yb3c9XCIke3Jvd31cIiBkYXRhLWNvbD1cIiR7Y29sfVwiIHRpdGxlPVwiJHtjaGFtcE5hbWV9ICgke3BsYWNlbWVudC5yb2xlfSlcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhleC1pbm5lclwiPlxyXG4gICAgICAgICAgICAgICR7aWNvbiA/IGA8aW1nIHNyYz1cIiR7aWNvbn1cIiBjbGFzcz1cImhleC1jaGFtcC1pbWdcIiBhbHQ9XCIke2NoYW1wTmFtZX1cIiBsb2FkaW5nPVwibGF6eVwiPmAgOiBgPHNwYW4gY2xhc3M9XCJoZXgtdW5pdC1uYW1lXCI+JHtpbml0aWFsc308L3NwYW4+YH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGV4LWNoYW1wLWxhYmVsXCI+JHtjaGFtcE5hbWUubGVuZ3RoID4gNiA/IGluaXRpYWxzIDogY2hhbXBOYW1lfTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJoZXgtY2VsbFwiIGRhdGEtcm93PVwiJHtyb3d9XCIgZGF0YS1jb2w9XCIke2NvbH1cIj48ZGl2IGNsYXNzPVwiaGV4LWlubmVyXCI+PC9kaXY+PC9kaXY+YDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaHRtbCArPSAnPC9kaXY+JztcclxuICAgIH1cclxuICAgIGJvYXJkLmlubmVySFRNTCA9IGh0bWw7XHJcblxyXG4gICAgaWYgKG5vdGVzKSB7XHJcbiAgICAgIG5vdGVzLmlubmVySFRNTCA9IGd1aWRlXHJcbiAgICAgICAgPyBgPHAgY2xhc3M9XCJib2FyZC1ub3Rlcy10ZXh0XCI+JHtndWlkZS5ub3Rlc308L3A+YFxyXG4gICAgICAgIDogJzxwIGNsYXNzPVwiYm9hcmQtbm90ZXMtdGV4dFwiPk5vIHBvc2l0aW9uaW5nIGd1aWRlIGZvciB0aGlzIGNvbXAgeWV0LjwvcD4nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVuZGVyVGlwcyhjb21wOiB0eXBlb2YgbWV0YUNvbXBzW251bWJlcl0pIHtcclxuICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyLXRpcHMtc2VjdGlvbicpO1xyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyLXRpcHMnKTtcclxuICAgIGlmICghZWwgfHwgIXNlY3Rpb24pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXTtcclxuICAgIGlmIChjb21wLmRlc2NyaXB0aW9uKSBwYXJ0cy5wdXNoKGA8cD4ke2NvbXAuZGVzY3JpcHRpb259PC9wPmApO1xyXG4gICAgaWYgKGNvbXAuZWFybHlHYW1lKSBwYXJ0cy5wdXNoKGA8cD48c3Ryb25nPkVhcmx5Ojwvc3Ryb25nPiAke2NvbXAuZWFybHlHYW1lfTwvcD5gKTtcclxuICAgIGlmIChjb21wLm1pZEdhbWUpIHBhcnRzLnB1c2goYDxwPjxzdHJvbmc+TWlkOjwvc3Ryb25nPiAke2NvbXAubWlkR2FtZX08L3A+YCk7XHJcbiAgICBpZiAoY29tcC5sYXRlR2FtZSkgcGFydHMucHVzaChgPHA+PHN0cm9uZz5MYXRlOjwvc3Ryb25nPiAke2NvbXAubGF0ZUdhbWV9PC9wPmApO1xyXG4gICAgaWYgKGNvbXAudGlwcykgcGFydHMucHVzaChgPHA+PHN0cm9uZz5UaXA6PC9zdHJvbmc+ICR7Y29tcC50aXBzfTwvcD5gKTtcclxuXHJcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIGVsLmlubmVySFRNTCA9IHBhcnRzLmpvaW4oJycpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gQ3Jvc3Mtd2luZG93IHBpbiBoZWxwZXIgKGNhbGxlZCBmcm9tIGRlc2t0b3ApLlxyXG4vLyBXcml0ZXMgdGhlIGxlZ2FjeSBwbGFpbi1zdHJpbmcgZm9ybWF0IHNvIG9sZGVyIHJlYWRlcnMga2VlcCB3b3JraW5nOyB0aGVcclxuLy8gbmV3IHJlYWRQaW4oKSBoYW5kbGVzIGl0IHRyYW5zcGFyZW50bHkuXHJcbmV4cG9ydCBmdW5jdGlvbiBwaW5Db21wSWQoY29tcElkOiBzdHJpbmcpIHtcclxuICB0cnkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oUElOTkVEX0tFWSwgY29tcElkKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ1tQaXZvdFRGVF0gZmFpbGVkIHRvIHdyaXRlIHBpbm5lZCBjb21wJywgZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBQaW4gYSBsaXZlIChhZ2dyZWdhdGVkKSBjb21wIGZyb20gdGhlIExpdmUgTWV0YSB0YWIuIFN0b3JlZCBhcyBhIEpTT05cclxuLy8gcGF5bG9hZCBzbyB0aGUgaW4tZ2FtZSB2aWV3ZXIgY2FuIHJlbmRlciBpdCB3aXRob3V0IGEgY3VyYXRlZCBsb29rdXAuXHJcbmV4cG9ydCBmdW5jdGlvbiBwaW5MaXZlQ29tcChsaXZlOiBMaXZlUGluKSB7XHJcbiAgdHJ5IHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFBJTk5FRF9LRVksIEpTT04uc3RyaW5naWZ5KHsga2luZDogJ2xpdmUnLCBsaXZlIH0pKTtcclxuICAgIC8vIGxvY2FsU3RvcmFnZSAnc3RvcmFnZScgZXZlbnRzIERPTidUIGZpcmUgaW4gdGhlIHNhbWUgd2luZG93IOKAlCBudWRnZVxyXG4gICAgLy8gdGhlIGluLXdpbmRvdyByZW5kZXJlciBkaXJlY3RseSBzbyB0aGUgZGVza3RvcCBwcmV2aWV3IGFsc28gcmVmcmVzaGVzLlxyXG4gICAgQ29tcFZpZXdlclJlbmRlcmVyLnJlbmRlcigpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGNvbnNvbGUud2FybignW1Bpdm90VEZUXSBmYWlsZWQgdG8gd3JpdGUgcGlubmVkIGxpdmUgY29tcCcsIGUpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gUmV0dXJucyBlaXRoZXIgdGhlIGN1cmF0ZWQgaWQgKGxlZ2FjeSAvIGN1cmF0ZWQga2luZCkgb3IgbnVsbCBmb3IgbGl2ZSBwaW5zLlxyXG4vLyBFeGlzdGluZyBjYWxsZXJzIHRoYXQgY29tcGFyZSBgZ2V0UGlubmVkQ29tcElkKCkgPT09IGMuaWRgIGNvbnRpbnVlIHRvXHJcbi8vIHdvcmsg4oCUIGEgbGl2ZSBwaW4gcmVhZHMgYXMgXCJubyBjdXJhdGVkIGlkXCIgc28gY3VyYXRlZCBwaW4gYnV0dG9ucyByZW1haW5cclxuLy8gdW5zdGFycmVkIHdoZW4gYSBsaXZlIGNvbXAgaXMgcGlubmVkICh3aGljaCBpcyBjb3JyZWN0IGJlaGF2aW9yKS5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBpbm5lZENvbXBJZCgpOiBzdHJpbmcgfCBudWxsIHtcclxuICBjb25zdCBwaW4gPSByZWFkUGluKCk7XHJcbiAgcmV0dXJuIHBpbj8ua2luZCA9PT0gJ2N1cmF0ZWQnID8gcGluLmlkIDogbnVsbDtcclxufVxyXG5cclxuLy8gTmV3OiByZXR1cm5zIHRoZSBwaW5uZWQgY29tcEtleSB3aGVuIGEgbGl2ZSBjb21wIGlzIGFjdGl2ZSwgZWxzZSBudWxsLlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGlubmVkTGl2ZUNvbXBLZXkoKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgY29uc3QgcGluID0gcmVhZFBpbigpO1xyXG4gIHJldHVybiBwaW4/LmtpbmQgPT09ICdsaXZlJyA/IHBpbi5saXZlLmNvbXBLZXkgOiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFBpbklmTm9uZSgpIHtcclxuICBpZiAoZ2V0UGlubmVkQ29tcElkKCkpIHJldHVybjtcclxuICBjb25zdCB0b3AgPSBnZXRDb21wc0J5VGllcignUycpWzBdIHx8IG1ldGFDb21wc1swXTtcclxuICBpZiAodG9wKSBwaW5Db21wSWQodG9wLmlkKTtcclxufVxyXG4iLCIvLyBQaXZvdFRGVCDigJQgTWF0Y2hUcmFja2VyXHJcbi8vIFBhcnNlcyBPdmVyd29sZiBURlQgZ2FtZSBldmVudHMgaW50byBhIG5vcm1hbGl6ZWQgbWF0Y2ggc3RhdGUuXHJcbi8vIElNUE9SVEFOVDogb25seSBleHBvc2VzIHBsYXllcidzIG93biB2YWx1ZXMgKGxldmVsLCBnb2xkLCBIUCwgc3RhZ2UsIGF1Z21lbnRzKS5cclxuLy8gRG9lcyBOT1QgZXhwb3NlIG9wcG9uZW50cycgYm9hcmRzL2l0ZW1zL2V0YyB0byBhdm9pZCBSaW90J3MgXCJjb2FjaGluZ1wiIHJ1bGUgY29uY2VybnMuXHJcblxyXG5pbXBvcnQgeyBTbmFwc2hvdFVwbG9hZGVyIH0gZnJvbSAnLi9TbmFwc2hvdFVwbG9hZGVyJztcclxuaW1wb3J0IHsga0N1cnJlbnRUZnRQYXRjaCwga0N1cnJlbnRUZnRTZXROdW1iZXIsIGtSaW90QXBpQ29uZmlnIH0gZnJvbSAnLi4vY29uc3RzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWF0Y2hTdGF0ZSB7XHJcbiAgaW5NYXRjaDogYm9vbGVhbjtcclxuICBtYXRjaElkOiBzdHJpbmcgfCBudWxsOyAgLy8gR0VQIG1hdGNoX2luZm8ucHNldWRvX21hdGNoX2lkIOKAlCBuZWVkZWQgZm9yIHNuYXBzaG90IHVwbG9hZFxyXG4gIHN0YWdlOiBzdHJpbmc7ICAgICAgICAgICAvLyBlLmcuIFwiMy0yXCJcclxuICByb3VuZFR5cGU6IHN0cmluZzsgICAgICAgLy8gUFZQLCBQVkUsIENhcm91c2VsLCBBdWdtZW50XHJcbiAgbGV2ZWw6IG51bWJlcjtcclxuICBnb2xkOiBudW1iZXI7XHJcbiAgaGVhbHRoOiBudW1iZXI7XHJcbiAgc3RyZWFrOiBudW1iZXI7ICAgICAgICAgIC8vIHdpbi9sb3NzIHN0cmVhayAoc2lnbmVkKVxyXG4gIGF1Z21lbnRzOiBzdHJpbmdbXTtcclxuICB1bml0czogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IHRpZXI6IG51bWJlcjsgaXRlbXM/OiBzdHJpbmdbXSB9PjtcclxuICBsYXN0UGxhY2VtZW50OiBudW1iZXIgfCBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBNYXRjaFN0YXRlTGlzdGVuZXIgPSAoc3RhdGU6IE1hdGNoU3RhdGUpID0+IHZvaWQ7XHJcblxyXG5jb25zdCBFTVBUWV9TVEFURTogTWF0Y2hTdGF0ZSA9IHtcclxuICBpbk1hdGNoOiBmYWxzZSxcclxuICBtYXRjaElkOiBudWxsLFxyXG4gIHN0YWdlOiAnLScsXHJcbiAgcm91bmRUeXBlOiAnJyxcclxuICBsZXZlbDogMCxcclxuICBnb2xkOiAwLFxyXG4gIGhlYWx0aDogMTAwLFxyXG4gIHN0cmVhazogMCxcclxuICBhdWdtZW50czogW10sXHJcbiAgdW5pdHM6IFtdLFxyXG4gIGxhc3RQbGFjZW1lbnQ6IG51bGwsXHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFN0YWdlU25hcHNob3Qge1xyXG4gIHRzOiBudW1iZXI7ICAgICAgICAgICAgLy8gY2FwdHVyZSB0aW1lc3RhbXBcclxuICBzdGFnZTogc3RyaW5nO1xyXG4gIGxldmVsOiBudW1iZXI7XHJcbiAgZ29sZDogbnVtYmVyO1xyXG4gIGhlYWx0aDogbnVtYmVyO1xyXG4gIHN0cmVhazogbnVtYmVyO1xyXG4gIHVuaXRzOiBBcnJheTx7IG5hbWU6IHN0cmluZzsgdGllcjogbnVtYmVyOyBpdGVtcz86IHN0cmluZ1tdIH0+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0Y2hUcmFja2VyIHtcclxuICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IE1hdGNoVHJhY2tlcjtcclxuICBwcml2YXRlIF9zdGF0ZTogTWF0Y2hTdGF0ZSA9IHsgLi4uRU1QVFlfU1RBVEUgfTtcclxuICBwcml2YXRlIF9saXN0ZW5lcnM6IE1hdGNoU3RhdGVMaXN0ZW5lcltdID0gW107XHJcbiAgcHJpdmF0ZSBfc25hcHNob3RzOiBTdGFnZVNuYXBzaG90W10gPSBbXTtcclxuICBwcml2YXRlIF9sYXN0U25hcHNob3RTdGFnZTogc3RyaW5nID0gJyc7XHJcblxyXG4gIHN0YXRpYyBpbnN0YW5jZSgpOiBNYXRjaFRyYWNrZXIge1xyXG4gICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkgdGhpcy5faW5zdGFuY2UgPSBuZXcgTWF0Y2hUcmFja2VyKCk7XHJcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBnZXRTdGF0ZSgpOiBNYXRjaFN0YXRlIHtcclxuICAgIHJldHVybiB7IC4uLnRoaXMuX3N0YXRlIH07XHJcbiAgfVxyXG5cclxuICBvblN0YXRlQ2hhbmdlKGNiOiBNYXRjaFN0YXRlTGlzdGVuZXIpOiAoKSA9PiB2b2lkIHtcclxuICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGNiKTtcclxuICAgIGNiKHRoaXMuZ2V0U3RhdGUoKSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnMuZmlsdGVyKGwgPT4gbCAhPT0gY2IpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZW1pdCgpIHtcclxuICAgIGNvbnN0IHNuYXBzaG90ID0gdGhpcy5nZXRTdGF0ZSgpO1xyXG4gICAgZm9yIChjb25zdCBjYiBvZiB0aGlzLl9saXN0ZW5lcnMpIHtcclxuICAgICAgdHJ5IHsgY2Ioc25hcHNob3QpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUud2FybignW01hdGNoVHJhY2tlcl0gbGlzdGVuZXIgZXJyb3InLCBlKTsgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gPT09PT0gSW5nZXN0IE92ZXJ3b2xmIGluZm9fdXBkYXRlcyA9PT09PVxyXG4gIC8vIFNoYXBlOiB7IGZlYXR1cmU6ICdtYXRjaF9pbmZvJyB8ICdnYW1lX2luZm8nIHwgLi4uLCBpbmZvOiB7Li4ufSB9XHJcbiAgaGFuZGxlSW5mb1VwZGF0ZSh1cGRhdGU6IGFueSkge1xyXG4gICAgaWYgKCF1cGRhdGUgfHwgIXVwZGF0ZS5pbmZvKSByZXR1cm47XHJcbiAgICBjb25zdCBpbmZvID0gdXBkYXRlLmluZm87XHJcbiAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIGdhbWVfaW5mbzogbGV2ZWwsIGdvbGQsIGhlYWx0aFxyXG4gICAgaWYgKGluZm8uZ2FtZV9pbmZvKSB7XHJcbiAgICAgIGNvbnN0IGdpID0gaW5mby5nYW1lX2luZm87XHJcbiAgICAgIGlmIChnaS5sZXZlbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgbiA9IE51bWJlcihnaS5sZXZlbCk7XHJcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4obikgJiYgbiAhPT0gdGhpcy5fc3RhdGUubGV2ZWwpIHsgdGhpcy5fc3RhdGUubGV2ZWwgPSBuOyBjaGFuZ2VkID0gdHJ1ZTsgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChnaS5nb2xkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBuID0gTnVtYmVyKGdpLmdvbGQpO1xyXG4gICAgICAgIGlmICghTnVtYmVyLmlzTmFOKG4pICYmIG4gIT09IHRoaXMuX3N0YXRlLmdvbGQpIHsgdGhpcy5fc3RhdGUuZ29sZCA9IG47IGNoYW5nZWQgPSB0cnVlOyB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGdpLmhlYWx0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgbiA9IE51bWJlcihnaS5oZWFsdGgpO1xyXG4gICAgICAgIGlmICghTnVtYmVyLmlzTmFOKG4pICYmIG4gIT09IHRoaXMuX3N0YXRlLmhlYWx0aCkgeyB0aGlzLl9zdGF0ZS5oZWFsdGggPSBuOyBjaGFuZ2VkID0gdHJ1ZTsgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChnaS53aW5fc3RyZWFrICE9PSB1bmRlZmluZWQgfHwgZ2kubG9zc19zdHJlYWsgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IHcgPSBOdW1iZXIoZ2kud2luX3N0cmVhayB8fCAwKTtcclxuICAgICAgICBjb25zdCBsID0gTnVtYmVyKGdpLmxvc3Nfc3RyZWFrIHx8IDApO1xyXG4gICAgICAgIGNvbnN0IHN0cmVhayA9IHcgPiAwID8gdyA6IC1sO1xyXG4gICAgICAgIGlmIChzdHJlYWsgIT09IHRoaXMuX3N0YXRlLnN0cmVhaykgeyB0aGlzLl9zdGF0ZS5zdHJlYWsgPSBzdHJlYWs7IGNoYW5nZWQgPSB0cnVlOyB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBtYXRjaF9pbmZvOiBzdGFnZSAvIHJvdW5kX3R5cGUgLyBhdWdtZW50cyAvIHBsYWNlbWVudCAvIHBzZXVkb19tYXRjaF9pZFxyXG4gICAgaWYgKGluZm8ubWF0Y2hfaW5mbykge1xyXG4gICAgICBjb25zdCBtaSA9IGluZm8ubWF0Y2hfaW5mbztcclxuICAgICAgaWYgKG1pLnBzZXVkb19tYXRjaF9pZCAmJiBTdHJpbmcobWkucHNldWRvX21hdGNoX2lkKSAhPT0gdGhpcy5fc3RhdGUubWF0Y2hJZCkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlLm1hdGNoSWQgPSBTdHJpbmcobWkucHNldWRvX21hdGNoX2lkKTtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobWkuc3RhZ2UgJiYgU3RyaW5nKG1pLnN0YWdlKSAhPT0gdGhpcy5fc3RhdGUuc3RhZ2UpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZS5zdGFnZSA9IFN0cmluZyhtaS5zdGFnZSk7XHJcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG1pLnJvdW5kX3R5cGUgJiYgU3RyaW5nKG1pLnJvdW5kX3R5cGUpICE9PSB0aGlzLl9zdGF0ZS5yb3VuZFR5cGUpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZS5yb3VuZFR5cGUgPSBTdHJpbmcobWkucm91bmRfdHlwZSk7XHJcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG1pLnBsYWNlbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgcCA9IE51bWJlcihtaS5wbGFjZW1lbnQpO1xyXG4gICAgICAgIGlmICghTnVtYmVyLmlzTmFOKHApICYmIHAgPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLl9zdGF0ZS5sYXN0UGxhY2VtZW50ID0gcDtcclxuICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGF1Z21lbnRzOiBhcnJheSBvZiBzdHJpbmdzIChvciBwYXJzZSBKU09OLXN0cmluZyB2YXJpYW50cylcclxuICAgIGlmIChpbmZvLmF1Z21lbnRzKSB7XHJcbiAgICAgIGNvbnN0IGF1Z21lbnRzID0gdGhpcy5wYXJzZUF1Z21lbnRzKGluZm8uYXVnbWVudHMpO1xyXG4gICAgICBpZiAoYXVnbWVudHMgJiYgSlNPTi5zdHJpbmdpZnkoYXVnbWVudHMpICE9PSBKU09OLnN0cmluZ2lmeSh0aGlzLl9zdGF0ZS5hdWdtZW50cykpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZS5hdWdtZW50cyA9IGF1Z21lbnRzO1xyXG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYm9hcmQ6IHBsYXllcidzIG93biB1bml0cyAoc2FmZSB0byBzaG93IOKAlCBpdCdzIHlvdXIgb3duIGJvYXJkKVxyXG4gICAgaWYgKGluZm8uYm9hcmQpIHtcclxuICAgICAgY29uc3QgdW5pdHMgPSB0aGlzLnBhcnNlVW5pdHMoaW5mby5ib2FyZCk7XHJcbiAgICAgIGlmICh1bml0cyAmJiBKU09OLnN0cmluZ2lmeSh1bml0cykgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuX3N0YXRlLnVuaXRzKSkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlLnVuaXRzID0gdW5pdHM7XHJcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuX3N0YXRlLmluTWF0Y2ggJiYgKHRoaXMuX3N0YXRlLmxldmVsID4gMCB8fCB0aGlzLl9zdGF0ZS5zdGFnZSAhPT0gJy0nKSkge1xyXG4gICAgICB0aGlzLl9zdGF0ZS5pbk1hdGNoID0gdHJ1ZTtcclxuICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZWQpIHtcclxuICAgICAgLy8gQ2FwdHVyZSBhIHBlci1zdGFnZSBzbmFwc2hvdCB3aGVuIHRoZSBzdGFnZSBmbGlwcy4gVXNlZCBieSBNYXRjaFxyXG4gICAgICAvLyBIaXN0b3J5IHBvc3QtbWF0Y2guIE5ldmVyIHJlYWQgYnkgYW55IGluLW1hdGNoIFVJLlxyXG4gICAgICBpZiAodGhpcy5fc3RhdGUuc3RhZ2UgIT09IHRoaXMuX2xhc3RTbmFwc2hvdFN0YWdlICYmIHRoaXMuX3N0YXRlLnN0YWdlICE9PSAnLScpIHtcclxuICAgICAgICB0aGlzLl9zbmFwc2hvdHMucHVzaCh7XHJcbiAgICAgICAgICB0czogRGF0ZS5ub3coKSxcclxuICAgICAgICAgIHN0YWdlOiB0aGlzLl9zdGF0ZS5zdGFnZSxcclxuICAgICAgICAgIGxldmVsOiB0aGlzLl9zdGF0ZS5sZXZlbCxcclxuICAgICAgICAgIGdvbGQ6IHRoaXMuX3N0YXRlLmdvbGQsXHJcbiAgICAgICAgICBoZWFsdGg6IHRoaXMuX3N0YXRlLmhlYWx0aCxcclxuICAgICAgICAgIHN0cmVhazogdGhpcy5fc3RhdGUuc3RyZWFrLFxyXG4gICAgICAgICAgdW5pdHM6IHRoaXMuX3N0YXRlLnVuaXRzLm1hcCh1ID0+ICh7IC4uLnUgfSkpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2xhc3RTbmFwc2hvdFN0YWdlID0gdGhpcy5fc3RhdGUuc3RhZ2U7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5lbWl0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyA9PT09PSBJbmdlc3QgT3ZlcndvbGYgbmV3X2V2ZW50cyA9PT09PVxyXG4gIGhhbmRsZU5ld0V2ZW50cyhlOiBhbnkpIHtcclxuICAgIGlmICghZSB8fCAhQXJyYXkuaXNBcnJheShlLmV2ZW50cykpIHJldHVybjtcclxuICAgIGZvciAoY29uc3QgZXZlbnQgb2YgZS5ldmVudHMpIHtcclxuICAgICAgc3dpdGNoIChldmVudC5uYW1lKSB7XHJcbiAgICAgICAgY2FzZSAnbWF0Y2hfc3RhcnQnOlxyXG4gICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgdGhpcy5fc3RhdGUuaW5NYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmVtaXQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ21hdGNoX2VuZCc6XHJcbiAgICAgICAgICB0aGlzLl9zdGF0ZS5pbk1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnBlcnNpc3RNYXRjaCgpO1xyXG4gICAgICAgICAgdGhpcy5lbWl0KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdtYXRjaF9pbmZvX3BsYWNlbWVudCc6XHJcbiAgICAgICAgICBpZiAoZXZlbnQuZGF0YSkge1xyXG4gICAgICAgICAgICBjb25zdCBwID0gTnVtYmVyKGV2ZW50LmRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoIU51bWJlci5pc05hTihwKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX3N0YXRlLmxhc3RQbGFjZW1lbnQgPSBwO1xyXG4gICAgICAgICAgICAgIHRoaXMuZW1pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gPT09PT0gUGVyc2lzdGVuY2UgPT09PT1cclxuICAvLyBQZXJzaXN0IGEgZnVsbCBwZXItbWF0Y2ggcmVjb3JkIChpbmNsdWRpbmcgdGhlIHBlci1zdGFnZSB0aW1lbGluZSkgdG9cclxuICAvLyBsb2NhbFN0b3JhZ2Ugb24gbWF0Y2hfZW5kLiBUaGUgZGVza3RvcCBNYXRjaCBIaXN0b3J5IHZpZXcgY29uc3VtZXMgaXQgZm9yXHJcbiAgLy8gdGhlIFRpbWVsaW5lIC8gUm91bmQtRGV0YWlsIGJyZWFrZG93bnMuIENhcHBlZCBhdCA1MCBtYXRjaGVzLlxyXG4gIC8vXHJcbiAgLy8gQWxzbzogaWYgdGhlIHVzZXIgaGFzIG9wdGVkIGluIHRvIGNvbnRyaWJ1dGUgbWF0Y2ggZGF0YSwgaGFuZCB0aGUgcmVjb3JkXHJcbiAgLy8gb2ZmIHRvIFNuYXBzaG90VXBsb2FkZXIuIFVwbG9hZCBpcyBmaXJlLWFuZC1mb3JnZXQg4oCUIG5ldmVyIGJsb2NrcyBsb2NhbFxyXG4gIC8vIHBlcnNpc3RlbmNlLCBhbmQgdGhlIHVwbG9hZGVyIGhhcyBpdHMgb3duIHJldHJ5IHF1ZXVlIGZvciBmYWlsdXJlcy5cclxuICBwcml2YXRlIHBlcnNpc3RNYXRjaCgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwaXZvdHRmdF9tYXRjaF9oaXN0b3J5Jyk7XHJcbiAgICAgIGNvbnN0IGhpc3RvcnkgPSByYXcgPyBKU09OLnBhcnNlKHJhdykgOiBbXTtcclxuICAgICAgaGlzdG9yeS51bnNoaWZ0KHtcclxuICAgICAgICBlbmRlZEF0OiBEYXRlLm5vdygpLFxyXG4gICAgICAgIG1hdGNoSWQ6IHRoaXMuX3N0YXRlLm1hdGNoSWQsXHJcbiAgICAgICAgcGxhY2VtZW50OiB0aGlzLl9zdGF0ZS5sYXN0UGxhY2VtZW50LFxyXG4gICAgICAgIGxldmVsOiB0aGlzLl9zdGF0ZS5sZXZlbCxcclxuICAgICAgICBzdGFnZTogdGhpcy5fc3RhdGUuc3RhZ2UsXHJcbiAgICAgICAgYXVnbWVudHM6IFsuLi50aGlzLl9zdGF0ZS5hdWdtZW50c10sXHJcbiAgICAgICAgc25hcHNob3RzOiBbLi4udGhpcy5fc25hcHNob3RzXSxcclxuICAgICAgfSk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwaXZvdHRmdF9tYXRjaF9oaXN0b3J5JywgSlNPTi5zdHJpbmdpZnkoaGlzdG9yeS5zbGljZSgwLCA1MCkpKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKCdbTWF0Y2hUcmFja2VyXSBwZXJzaXN0IGZhaWxlZCcsIGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJlc3QtZWZmb3J0IGNvbnRyaWJ1dGUuIFRoZSB1cGxvYWRlciBpbnRlcm5hbGx5IGNoZWNrcyBvcHQtaW4gKyBhdXRoLFxyXG4gICAgLy8gc28gaXQncyBzYWZlIHRvIGNhbGwgdW5jb25kaXRpb25hbGx5IOKAlCBpdCBqdXN0IG5vLW9wcyB3aGVuIG9mZi5cclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICghdGhpcy5fc3RhdGUubWF0Y2hJZCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCByZWdpb24gPSBrUmlvdEFwaUNvbmZpZy5wbGF0Zm9ybTtcclxuICAgICAgY29uc3QgZmluYWxVbml0cyA9IHRoaXMuX3N0YXRlLnVuaXRzLm1hcCh1ID0+ICh7XHJcbiAgICAgICAgY2hhcmFjdGVyX2lkOiB1Lm5hbWUsXHJcbiAgICAgICAgdGllcjogdS50aWVyLFxyXG4gICAgICAgIGl0ZW1zOiB1Lml0ZW1zLFxyXG4gICAgICB9KSk7XHJcbiAgICAgIC8vIFdlIGRvbid0IGNhcHR1cmUgZmluYWxfdHJhaXRzIGluIE1hdGNoVHJhY2tlciAodGhlIEdFUCBgYm9hcmRgIGV2ZW50XHJcbiAgICAgIC8vIGRvZXNuJ3QgaW5jbHVkZSB0cmFpdCB0b3RhbHMpOyBwYXNzIGFuIGVtcHR5IGFycmF5IOKAlCB0aGUgYWdncmVnYXRvclxyXG4gICAgICAvLyBjYW4gZGVyaXZlIHRyYWl0cyBmcm9tIGZpbmFsVW5pdHMgdmlhIHRoZSB0cmFpdCBtYXAuXHJcbiAgICAgIHZvaWQgU25hcHNob3RVcGxvYWRlci50cnlVcGxvYWQoe1xyXG4gICAgICAgIG1hdGNoSWQ6IHRoaXMuX3N0YXRlLm1hdGNoSWQsXHJcbiAgICAgICAgcmVnaW9uLFxyXG4gICAgICAgIHBhdGNoOiBrQ3VycmVudFRmdFBhdGNoLFxyXG4gICAgICAgIHRmdFNldDoga0N1cnJlbnRUZnRTZXROdW1iZXIsXHJcbiAgICAgICAgZmluYWxQbGFjZW1lbnQ6IHRoaXMuX3N0YXRlLmxhc3RQbGFjZW1lbnQsXHJcbiAgICAgICAgZmluYWxMZXZlbDogdGhpcy5fc3RhdGUubGV2ZWwgfHwgbnVsbCxcclxuICAgICAgICBmaW5hbFVuaXRzLFxyXG4gICAgICAgIGZpbmFsVHJhaXRzOiBbXSxcclxuICAgICAgICBmaW5hbEF1Z21lbnRzOiBbLi4udGhpcy5fc3RhdGUuYXVnbWVudHNdLFxyXG4gICAgICAgIHNuYXBzaG90czogdGhpcy5fc25hcHNob3RzLm1hcChzID0+ICh7XHJcbiAgICAgICAgICBzdGFnZTogcy5zdGFnZSxcclxuICAgICAgICAgIGxldmVsOiBzLmxldmVsLFxyXG4gICAgICAgICAgZ29sZDogcy5nb2xkLFxyXG4gICAgICAgICAgaGVhbHRoOiBzLmhlYWx0aCxcclxuICAgICAgICAgIHN0cmVhazogcy5zdHJlYWssXHJcbiAgICAgICAgICB1bml0czogcy51bml0cy5tYXAodSA9PiAoeyBuYW1lOiB1Lm5hbWUsIHRpZXI6IHUudGllciwgaXRlbXM6IHUuaXRlbXMgfSkpLFxyXG4gICAgICAgIH0pKSxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignW01hdGNoVHJhY2tlcl0gdXBsb2FkIGtpY2tvZmYgZmFpbGVkJywgZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2V0KCkge1xyXG4gICAgdGhpcy5fc3RhdGUgPSB7IC4uLkVNUFRZX1NUQVRFLCBpbk1hdGNoOiB0cnVlIH07XHJcbiAgICB0aGlzLl9zbmFwc2hvdHMgPSBbXTtcclxuICAgIHRoaXMuX2xhc3RTbmFwc2hvdFN0YWdlID0gJyc7XHJcbiAgfVxyXG5cclxuICAvLyA9PT09PSBQYXJzaW5nIGhlbHBlcnMgPT09PT1cclxuICBwcml2YXRlIHBhcnNlQXVnbWVudHMocmF3OiBhbnkpOiBzdHJpbmdbXSB8IG51bGwge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcGFyc2VkID0gdHlwZW9mIHJhdyA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKHJhdykgOiByYXc7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcnNlZCkpIHJldHVybiBwYXJzZWQubWFwKGEgPT4gU3RyaW5nKGEpKTtcclxuICAgICAgaWYgKHBhcnNlZCAmJiBBcnJheS5pc0FycmF5KHBhcnNlZC5hdWdtZW50cykpIHJldHVybiBwYXJzZWQuYXVnbWVudHMubWFwKChhOiBhbnkpID0+IFN0cmluZyhhKSk7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZVVuaXRzKHJhdzogYW55KTogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IHRpZXI6IG51bWJlcjsgaXRlbXM/OiBzdHJpbmdbXSB9PiB8IG51bGwge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcGFyc2VkID0gdHlwZW9mIHJhdyA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKHJhdykgOiByYXc7XHJcbiAgICAgIGlmICghcGFyc2VkKSByZXR1cm4gbnVsbDtcclxuICAgICAgY29uc3QgbGlzdCA9IEFycmF5LmlzQXJyYXkocGFyc2VkKSA/IHBhcnNlZCA6IChBcnJheS5pc0FycmF5KHBhcnNlZC51bml0cykgPyBwYXJzZWQudW5pdHMgOiBudWxsKTtcclxuICAgICAgaWYgKCFsaXN0KSByZXR1cm4gbnVsbDtcclxuICAgICAgcmV0dXJuIGxpc3QubWFwKCh1OiBhbnkpID0+ICh7XHJcbiAgICAgICAgbmFtZTogU3RyaW5nKHUubmFtZSB8fCB1LmNoYXJhY3Rlcl9pZCB8fCB1LmlkIHx8ICc/JyksXHJcbiAgICAgICAgdGllcjogTnVtYmVyKHUudGllciB8fCB1LnN0YXIgfHwgMSksXHJcbiAgICAgICAgaXRlbXM6IEFycmF5LmlzQXJyYXkodS5pdGVtcykgPyB1Lml0ZW1zLm1hcChTdHJpbmcpIDogdW5kZWZpbmVkLFxyXG4gICAgICB9KSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8vIFNuYXBzaG90VXBsb2FkZXIg4oCUIG9wdC1pbiBwYXRoIHRoYXQgc2hpcHMgY29tcGxldGVkLW1hdGNoIHNuYXBzaG90cyBmcm9tXG4vLyBNYXRjaFRyYWNrZXIgdG8gdGhlIGJhY2tlbmQgYC9tYXRjaC1zbmFwc2hvdHNgIHJvdXRlLlxuLy9cbi8vIEFsbCBkYXRhIGlzIGZyb20gdGhlIHVzZXIncyBvd24gZ2FtZS4gT3Bwb25lbnQgYm9hcmRzIGFyZSBORVZFUiBwYXJ0IG9mXG4vLyB0aGUgcGF5bG9hZCAoT3ZlcndvbGYgR0VQIGRvZXNuJ3QgZXhwb3NlIHRoZW0sIGFuZCB3ZSB3b3VsZG4ndCBzaGlwIHRoZW1cbi8vIGV2ZW4gaWYgaXQgZGlkIOKAlCBjb21wbGlhbmNlIGxpbmUpLlxuXG5pbXBvcnQgeyBhZG1pbkZldGNoLCBpc0F1dGhlbnRpY2F0ZWQgfSBmcm9tICcuL0F1dGhTZXJ2aWNlJztcblxuY29uc3QgT1BUX0lOX0tFWSA9ICdwaXZvdHRmdF9jb250cmlidXRlX3NuYXBzaG90cyc7XG5jb25zdCBQRU5ESU5HX0tFWSA9ICdwaXZvdHRmdF9zbmFwc2hvdF9wZW5kaW5nX3YxJztcbmNvbnN0IENPTlRSSUJVVEVEX0NPVU5UX0tFWSA9ICdwaXZvdHRmdF9zbmFwc2hvdF9jb250cmlidXRlZF9jb3VudF92MSc7XG5jb25zdCBNQVhfUEVORElORyA9IDEwO1xuXG4vLyBUaGVzZSB0cmF2ZWwgd2l0aCBldmVyeSB1cGxvYWQuIEJ1bXAgdGhlbSBpbiBgc3JjL2NvbnN0cy50c2Agd2hlbmV2ZXIgYVxuLy8gbmV3IFRGVCBwYXRjaCBzaGlwcyDigJQgc2FtZSByZWxlYXNlIGNhZGVuY2UgYXMgYFBBVENIRVNgIGluIHRoZSByZW5kZXJlcnMuXG5pbXBvcnQgeyBrQ3VycmVudFRmdFBhdGNoLCBrQ3VycmVudFRmdFNldE51bWJlciB9IGZyb20gJy4uL2NvbnN0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU25hcHNob3RQYXlsb2FkIHtcbiAgbWF0Y2hJZDogc3RyaW5nO1xuICByZWdpb246IHN0cmluZzsgICAgIC8vIHBsYXRmb3JtIGNvZGU6IGV1dzEsIG5hMSwga3IsIC4uLlxuICBwYXRjaDogc3RyaW5nOyAgICAgIC8vIFRGVCBpbi1zZXQgcGF0Y2ggbGlrZSBcIjE3LjNcIlxuICB0ZnRTZXQ6IG51bWJlcjtcbiAgZmluYWxQbGFjZW1lbnQ6IG51bWJlciB8IG51bGw7XG4gIGZpbmFsTGV2ZWw6IG51bWJlciB8IG51bGw7XG4gIGZpbmFsVW5pdHM6IEFycmF5PHsgY2hhcmFjdGVyX2lkOiBzdHJpbmc7IHRpZXI6IG51bWJlcjsgaXRlbXM/OiBzdHJpbmdbXSB9PjtcbiAgZmluYWxUcmFpdHM6IEFycmF5PHsgbmFtZTogc3RyaW5nOyBudW1fdW5pdHM6IG51bWJlcjsgdGllcl9jdXJyZW50OiBudW1iZXI7IHN0eWxlOiBudW1iZXIgfT47XG4gIGZpbmFsQXVnbWVudHM6IHN0cmluZ1tdO1xuICBzbmFwc2hvdHM6IEFycmF5PHtcbiAgICBzdGFnZTogc3RyaW5nO1xuICAgIGxldmVsOiBudW1iZXI7XG4gICAgZ29sZDogbnVtYmVyO1xuICAgIGhlYWx0aDogbnVtYmVyO1xuICAgIHN0cmVhazogbnVtYmVyO1xuICAgIHVuaXRzOiBBcnJheTx7IG5hbWU6IHN0cmluZzsgdGllcjogbnVtYmVyOyBpdGVtcz86IHN0cmluZ1tdIH0+O1xuICB9Pjtcbn1cblxuaW50ZXJmYWNlIFVwbG9hZFJlc3VsdCB7XG4gIG9rOiBib29sZWFuO1xuICBhbHJlYWR5VXBsb2FkZWQ/OiBib29sZWFuO1xuICBlcnJvcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFNuYXBzaG90VXBsb2FkZXIge1xuICAvLyA9PT09PSBvcHQtaW4gdG9nZ2xlID09PT09XG4gIHN0YXRpYyBpc09wdGVkSW4oKTogYm9vbGVhbiB7XG4gICAgdHJ5IHsgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKE9QVF9JTl9LRVkpID09PSAndHJ1ZSc7IH0gY2F0Y2ggeyByZXR1cm4gZmFsc2U7IH1cbiAgfVxuICBzdGF0aWMgc2V0T3B0SW4odjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRyeSB7IGxvY2FsU3RvcmFnZS5zZXRJdGVtKE9QVF9JTl9LRVksIHYgPyAndHJ1ZScgOiAnZmFsc2UnKTsgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XG4gIH1cbiAgc3RhdGljIGdldENvbnRyaWJ1dGVkQ291bnQoKTogbnVtYmVyIHtcbiAgICB0cnkgeyByZXR1cm4gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oQ09OVFJJQlVURURfQ09VTlRfS0VZKSB8fCAnMCcsIDEwKSB8fCAwOyB9XG4gICAgY2F0Y2ggeyByZXR1cm4gMDsgfVxuICB9XG5cbiAgLy8gPT09PT0gUHVibGljIGVudHJ5OiBjYWxsIHRoaXMgYWZ0ZXIgTWF0Y2hUcmFja2VyIHBlcnNpc3RzIGEgbWF0Y2ggPT09PT1cbiAgLy8gQmVzdC1lZmZvcnQuIERyYWlucyB0aGUgcGVuZGluZyBxdWV1ZSBmaXJzdCBzbyByZXRyaWVzIGZsdXNoIGJlZm9yZSB0aGVcbiAgLy8gbmV3ZXN0IHVwbG9hZCBjb21wZXRlcyBmb3IgdGhlIG5ldHdvcmsuIEFsbCBmYWlsdXJlcyBmYWxsIGludG8gdGhlIHF1ZXVlLlxuICBzdGF0aWMgYXN5bmMgdHJ5VXBsb2FkKHBheWxvYWQ6IFNuYXBzaG90UGF5bG9hZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5pc09wdGVkSW4oKSB8fCAhaXNBdXRoZW50aWNhdGVkKCkpIHJldHVybjtcbiAgICBpZiAoIXBheWxvYWQubWF0Y2hJZCB8fCAhcGF5bG9hZC5yZWdpb24gfHwgIXBheWxvYWQucGF0Y2gpIHJldHVybjtcblxuICAgIC8vIDEuIEZsdXNoIHdoYXRldmVyJ3MgcGVuZGluZyAoZmFpbGVkIHVwbG9hZHMgZnJvbSBlYXJsaWVyIHNlc3Npb25zKS5cbiAgICBhd2FpdCB0aGlzLmRyYWluUGVuZGluZygpO1xuXG4gICAgLy8gMi4gQXR0ZW1wdCB0aGlzIG1hdGNoLiBJZiBpdCBmYWlscywgcXVldWUuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy51cGxvYWRPbmNlKHBheWxvYWQpO1xuICAgIGlmICghcmVzLm9rKSB7XG4gICAgICB0aGlzLmVucXVldWUocGF5bG9hZCk7XG4gICAgfSBlbHNlIGlmICghcmVzLmFscmVhZHlVcGxvYWRlZCkge1xuICAgICAgdGhpcy5idW1wQ29udHJpYnV0ZWRDb3VudCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vID09PT09IEludGVybmFsID09PT09XG5cbiAgLy8gVGhlIGRlZmF1bHRzIGZyb20gY29uc3RzIGFyZSByaWdodCBmb3IgbGl2ZSBnYW1lczsgZXhwb3NlIHBhdGNoL3RmdFNldFxuICAvLyBhcyBkZWZhdWx0cyBzbyBjYWxsZXJzIGNhbiBvbWl0IHRoZW0gd2hlbiBtYXRjaGluZyB0aGUgY3VycmVudCBidWlsZC5cbiAgc3RhdGljIGJ1aWxkUGF5bG9hZChhcmdzOiBPbWl0PFNuYXBzaG90UGF5bG9hZCwgJ3BhdGNoJyB8ICd0ZnRTZXQnPiAmIHtcbiAgICBwYXRjaD86IHN0cmluZzsgdGZ0U2V0PzogbnVtYmVyO1xuICB9KTogU25hcHNob3RQYXlsb2FkIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uYXJncyxcbiAgICAgIHBhdGNoOiAgYXJncy5wYXRjaCAgPz8ga0N1cnJlbnRUZnRQYXRjaCxcbiAgICAgIHRmdFNldDogYXJncy50ZnRTZXQgPz8ga0N1cnJlbnRUZnRTZXROdW1iZXIsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGFzeW5jIHVwbG9hZE9uY2UocDogU25hcHNob3RQYXlsb2FkKTogUHJvbWlzZTxVcGxvYWRSZXN1bHQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgYWRtaW5GZXRjaDx7IG9rOiBib29sZWFuOyBhbHJlYWR5VXBsb2FkZWQ/OiBib29sZWFuIH0+KFxuICAgICAgICAnL21hdGNoLXNuYXBzaG90cycsXG4gICAgICAgIHsgbWV0aG9kOiAnUE9TVCcsIGJvZHk6IEpTT04uc3RyaW5naWZ5KHApIH0sXG4gICAgICApO1xuICAgICAgcmV0dXJuIHsgb2s6ICEhcmVzLm9rLCBhbHJlYWR5VXBsb2FkZWQ6ICEhcmVzLmFscmVhZHlVcGxvYWRlZCB9O1xuICAgIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgICAgLy8gQXV0aCBleHBpcmVkIOKGkiBhZG1pbkZldGNoIGFscmVhZHkgY2xlYXJzIHRoZSBzZXNzaW9uOyB0aGUgbmV4dCBtYXRjaFxuICAgICAgLy8gZW5kIHdpbGwgc2tpcCAoaXNBdXRoZW50aWNhdGVkKCkgcmV0dXJucyBmYWxzZSkgYW5kIHRoZSBxdWV1ZSBob2xkc1xuICAgICAgLy8gdGhlIHBheWxvYWQgZm9yIHdoZW5ldmVyIHRoZSB1c2VyIHNpZ25zIGJhY2sgaW4uXG4gICAgICByZXR1cm4geyBvazogZmFsc2UsIGVycm9yOiBlPy5tZXNzYWdlIHx8IFN0cmluZyhlKSB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGFzeW5jIGRyYWluUGVuZGluZygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBxdWV1ZSA9IHRoaXMubG9hZFF1ZXVlKCk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIC8vIERyYWluIGluLW9yZGVyOyBrZWVwIGZhaWx1cmVzIGZvciBuZXh0IHBhc3MuXG4gICAgY29uc3QgcmVtYWluaW5nOiBTbmFwc2hvdFBheWxvYWRbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgcCBvZiBxdWV1ZSkge1xuICAgICAgY29uc3QgciA9IGF3YWl0IHRoaXMudXBsb2FkT25jZShwKTtcbiAgICAgIGlmIChyLm9rKSB7XG4gICAgICAgIGlmICghci5hbHJlYWR5VXBsb2FkZWQpIHRoaXMuYnVtcENvbnRyaWJ1dGVkQ291bnQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbWFpbmluZy5wdXNoKHApO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNhdmVRdWV1ZShyZW1haW5pbmcpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZW5xdWV1ZShwOiBTbmFwc2hvdFBheWxvYWQpOiB2b2lkIHtcbiAgICBjb25zdCBxdWV1ZSA9IHRoaXMubG9hZFF1ZXVlKCk7XG4gICAgLy8gRGVkdXAgb24gbWF0Y2hJZCBpbiBjYXNlIHRoZSBzYW1lIG1hdGNoIHJldHJpZXMgbXVsdGlwbGUgdGltZXMuXG4gICAgY29uc3QgZmlsdGVyZWQgPSBxdWV1ZS5maWx0ZXIocSA9PiBxLm1hdGNoSWQgIT09IHAubWF0Y2hJZCk7XG4gICAgZmlsdGVyZWQucHVzaChwKTtcbiAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID4gTUFYX1BFTkRJTkcpIGZpbHRlcmVkLnNwbGljZSgwLCBmaWx0ZXJlZC5sZW5ndGggLSBNQVhfUEVORElORyk7XG4gICAgdGhpcy5zYXZlUXVldWUoZmlsdGVyZWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgbG9hZFF1ZXVlKCk6IFNuYXBzaG90UGF5bG9hZFtdIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmF3ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oUEVORElOR19LRVkpO1xuICAgICAgcmV0dXJuIHJhdyA/IEpTT04ucGFyc2UocmF3KSBhcyBTbmFwc2hvdFBheWxvYWRbXSA6IFtdO1xuICAgIH0gY2F0Y2ggeyByZXR1cm4gW107IH1cbiAgfVxuICBwcml2YXRlIHN0YXRpYyBzYXZlUXVldWUocTogU25hcHNob3RQYXlsb2FkW10pOiB2b2lkIHtcbiAgICB0cnkgeyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShQRU5ESU5HX0tFWSwgSlNPTi5zdHJpbmdpZnkocSkpOyB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbiAgfVxuICBwcml2YXRlIHN0YXRpYyBidW1wQ29udHJpYnV0ZWRDb3VudCgpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbiA9IHRoaXMuZ2V0Q29udHJpYnV0ZWRDb3VudCgpICsgMTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKENPTlRSSUJVVEVEX0NPVU5UX0tFWSwgU3RyaW5nKG4pKTtcbiAgICB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCB7XHJcbiAgT1dHYW1lcyxcclxuICBPV0dhbWVzRXZlbnRzLFxyXG4gIE9XSG90a2V5c1xyXG59IGZyb20gXCJAb3ZlcndvbGYvb3ZlcndvbGYtYXBpLXRzXCI7XHJcblxyXG5pbXBvcnQgeyBBcHBXaW5kb3cgfSBmcm9tIFwiLi4vQXBwV2luZG93XCI7XHJcbmltcG9ydCB7IGtIb3RrZXlzLCBrV2luZG93TmFtZXMsIGtHYW1lc0ZlYXR1cmVzIH0gZnJvbSBcIi4uL2NvbnN0c1wiO1xyXG5pbXBvcnQgeyBNYXRjaFRyYWNrZXIgfSBmcm9tIFwiLi4vc2VydmljZXMvTWF0Y2hUcmFja2VyXCI7XHJcbmltcG9ydCB7IENvbXBWaWV3ZXJSZW5kZXJlciB9IGZyb20gXCIuLi9zZXJ2aWNlcy9Db21wVmlld2VyUmVuZGVyZXJcIjtcclxuXHJcbmltcG9ydCBXaW5kb3dTdGF0ZSA9IG92ZXJ3b2xmLndpbmRvd3MuV2luZG93U3RhdGVFeDtcclxuXHJcbi8vIFBpdm90VEZUIGluLWdhbWUgb3ZlcmxheSDigJQgcGFzc2l2ZSBjb21wIHZpZXdlci5cclxuLy9cclxuLy8gQ29tcGxpYW5jZSBub3RlOiB0aGlzIHdpbmRvdyBORVZFUiBkaXNwbGF5cyBsaXZlIGdhbWUgc3RhdGUgdG8gdGhlIHVzZXIuXHJcbi8vIE1hdGNoVHJhY2tlciBpcyBzdGFydGVkIHNvIHBlci1zdGFnZSBzbmFwc2hvdHMgYXJlIGNhcHR1cmVkIHRvIGxvY2FsU3RvcmFnZVxyXG4vLyBmb3IgdGhlIE1hdGNoIEhpc3RvcnkgdmlldyBpbiB0aGUgZGVza3RvcCBhcHAsIGJ1dCBubyBjYXB0dXJlZCB2YWx1ZSBkcml2ZXNcclxuLy8gYW55IGVsZW1lbnQgb2YgdGhpcyB3aW5kb3cncyBVSS5cclxuY2xhc3MgSW5HYW1lIGV4dGVuZHMgQXBwV2luZG93IHtcclxuICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEluR2FtZTtcclxuICBwcml2YXRlIF9nYW1lRXZlbnRzTGlzdGVuZXI6IE9XR2FtZXNFdmVudHM7XHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihrV2luZG93TmFtZXMuaW5HYW1lKTtcclxuICAgIHRoaXMuc2V0VG9nZ2xlSG90a2V5QmVoYXZpb3IoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2UoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IEluR2FtZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHJ1bigpIHtcclxuICAgIGNvbnN0IGdhbWVDbGFzc0lkID0gYXdhaXQgdGhpcy5nZXRDdXJyZW50R2FtZUNsYXNzSWQoKTtcclxuICAgIGNvbnN0IGdhbWVGZWF0dXJlcyA9IGtHYW1lc0ZlYXR1cmVzLmdldChnYW1lQ2xhc3NJZCk7XHJcblxyXG4gICAgLy8gQ2FwdHVyZS1vbmx5OiBNYXRjaFRyYWNrZXIgd3JpdGVzIHNuYXBzaG90czsgbm90aGluZyBpbiB0aGlzIHdpbmRvdyByZWFkc1xyXG4gICAgLy8gdGhlbSBmb3IgbGl2ZSBkaXNwbGF5LlxyXG4gICAgaWYgKGdhbWVGZWF0dXJlcyAmJiBnYW1lRmVhdHVyZXMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX2dhbWVFdmVudHNMaXN0ZW5lciA9IG5ldyBPV0dhbWVzRXZlbnRzKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG9uSW5mb1VwZGF0ZXM6IChpbmZvKSA9PiBNYXRjaFRyYWNrZXIuaW5zdGFuY2UoKS5oYW5kbGVJbmZvVXBkYXRlKGluZm8pLFxyXG4gICAgICAgICAgb25OZXdFdmVudHM6IChlKSA9PiBNYXRjaFRyYWNrZXIuaW5zdGFuY2UoKS5oYW5kbGVOZXdFdmVudHMoZSksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnYW1lRmVhdHVyZXNcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5fZ2FtZUV2ZW50c0xpc3RlbmVyLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQ29tcFZpZXdlclJlbmRlcmVyLmluaXQoKTtcclxuICB9XHJcblxyXG4gIC8vID09PT09IEhvdGtleXMgPT09PT1cclxuICBwcml2YXRlIGFzeW5jIHNldFRvZ2dsZUhvdGtleUJlaGF2aW9yKCkge1xyXG4gICAgY29uc3QgdG9nZ2xlSW5HYW1lV2luZG93ID0gYXN5bmMgKFxyXG4gICAgICBfaG90a2V5UmVzdWx0OiBvdmVyd29sZi5zZXR0aW5ncy5ob3RrZXlzLk9uUHJlc3NlZEV2ZW50XHJcbiAgICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgICAgY29uc3QgaW5HYW1lU3RhdGUgPSBhd2FpdCB0aGlzLmdldFdpbmRvd1N0YXRlKCk7XHJcbiAgICAgIGlmIChpbkdhbWVTdGF0ZS53aW5kb3dfc3RhdGUgPT09IFdpbmRvd1N0YXRlLk5PUk1BTCB8fFxyXG4gICAgICAgIGluR2FtZVN0YXRlLndpbmRvd19zdGF0ZSA9PT0gV2luZG93U3RhdGUuTUFYSU1JWkVEKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyV2luZG93Lm1pbmltaXplKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaW5HYW1lU3RhdGUud2luZG93X3N0YXRlID09PSBXaW5kb3dTdGF0ZS5NSU5JTUlaRUQgfHxcclxuICAgICAgICBpbkdhbWVTdGF0ZS53aW5kb3dfc3RhdGUgPT09IFdpbmRvd1N0YXRlLkNMT1NFRCkge1xyXG4gICAgICAgIHRoaXMuY3VycldpbmRvdy5yZXN0b3JlKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBPV0hvdGtleXMub25Ib3RrZXlEb3duKGtIb3RrZXlzLnRvZ2dsZSwgdG9nZ2xlSW5HYW1lV2luZG93KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgZ2V0Q3VycmVudEdhbWVDbGFzc0lkKCk6IFByb21pc2U8bnVtYmVyIHwgbnVsbD4ge1xyXG4gICAgY29uc3QgaW5mbyA9IGF3YWl0IE9XR2FtZXMuZ2V0UnVubmluZ0dhbWVJbmZvKCk7XHJcbiAgICByZXR1cm4gKGluZm8gJiYgaW5mby5pc1J1bm5pbmcgJiYgaW5mby5jbGFzc0lkKSA/IGluZm8uY2xhc3NJZCA6IG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5JbkdhbWUuaW5zdGFuY2UoKS5ydW4oKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9