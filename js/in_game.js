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
        "id": "artifact-expert-lich-bane",
        "apiName": "TFT16_Augment_ArtifactExpert_LichBane",
        "name": "Artifact Expert: Lich Bane",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Sona , a Lich Bane, and a Tear Of The Goddess",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-ludens-tempest",
        "apiName": "TFT16_Augment_ArtifactExpert_LudensTempest",
        "name": "Artifact Expert: Luden's Tempest",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Caitlyn , a Luden's Tempest, and a Recurve Bow",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-manazane",
        "apiName": "TFT16_Augment_ArtifactExpert_Manazane",
        "name": "Artifact Expert: Manazane",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Anivia, a Manazane , and a Tear Of The Goddess",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-zhonyas-paradox",
        "apiName": "TFT16_Augment_ArtifactExpert_ZhonyasParadox",
        "name": "Artifact Expert: Zhonya's Paradox",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Milio, a Zhonya's Paradox, and a Negatron Cloak",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-fishbones",
        "apiName": "TFT16_Augment_ArtifactExpert_Fishbones",
        "name": "Artifact Expert: Fishbones",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Ashe, a Fishbones, and a Sparring Gloves",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-deathfire-grasp",
        "apiName": "TFT16_Augment_ArtifactExpert_DeathfireGrasp",
        "name": "Artifact Expert: Deathfire Grasp",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Kog'Maw, a Deathfire Grasp, and a Recurve Bow",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-flickerblade",
        "apiName": "TFT16_Augment_ArtifactExpert_NavoriFlickerblades",
        "name": "Artifact Expert: Flickerblade",
        "components": [],
        "type": "artifact",
        "stats": "Get an Aphelios, a Flickerblade, and a Recurve Bow",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-hullbreaker",
        "apiName": "TFT16_Augment_ArtifactExpert_Hullbreaker",
        "name": "Artifact Expert: Hullbreaker",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Xin Zhao, a Hullbreaker, and a Chain Vest",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-blighting-jewel",
        "apiName": "TFT16_Augment_ArtifactExpert_BlightingJewel",
        "name": "Artifact Expert: Blighting Jewel",
        "components": [],
        "type": "artifact",
        "stats": "Get a Teemo, a Blighting Jewel, and a Needlessly Large Rod",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-the-indomitable",
        "apiName": "TFT16_Augment_ArtifactExpert_IndomitableGauntlet",
        "name": "Artifact Expert: The Indomitable",
        "components": [],
        "type": "artifact",
        "stats": "Get a Sion, The Indomitable, and a Giant Belt.",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-innervating-locket",
        "apiName": "TFT16_Augment_ArtifactExpert_InnvervatingLocket",
        "name": "Artifact Expert: Innervating Locket",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Illaoi, a Innervating Locket, and a Giant Belt",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-dawncore",
        "apiName": "TFT16_Augment_ArtifactExpert_Dawncore",
        "name": "Artifact Expert: Dawncore",
        "components": [],
        "type": "artifact",
        "stats": "Get a Teemo, a Dawncore, and a Tear Of The Goddess",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-prowlers-claw",
        "apiName": "TFT16_Augment_ArtifactExpert_ProwlersClaw",
        "name": "Artifact Expert: Prowler's Claw",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* RekSai, a Prowler's Claw, and a Sparring Gloves",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-titanic-hydra",
        "apiName": "TFT16_Augment_ArtifactExpert_TitanicHydra",
        "name": "Artifact Expert: Titanic Hydra",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Briar, a Titanic Hydra , and a B.F. Sword",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-spectral-cutlass",
        "apiName": "TFT16_Augment_ArtifactExpert_SpectralCutlass",
        "name": "Artifact Expert: Spectral Cutlass",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Yasuo, a Spectral Cutlass, and a Sparring Gloves",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-talisman-of-ascension",
        "apiName": "TFT16_Augment_ArtifactExpert_TalismanOfAscension",
        "name": "Artifact Expert: Talisman Of Ascension",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Zac, a Talisman Of Ascension, and a Giant Belt",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-horizon-focus",
        "apiName": "TFT16_Augment_ArtifactExpert_HorizonFocus",
        "name": "Artifact Expert: Horizon Focus",
        "components": [],
        "type": "artifact",
        "stats": "Get a Cho'Gath, a Horizon Focus, and a Needlessly Large Rod",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-snipers-focus",
        "apiName": "TFT16_Augment_ArtifactExpert_SnipersFocus",
        "name": "Artifact Expert: Sniper's Focus",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Tristana , a Sniper's Focus, and a B.F. Sword",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-wits-end",
        "apiName": "TFT16_Augment_ArtifactExpert_WitsEnd",
        "name": "Artifact Expert: Wits End",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Viego, a Wits End, and a Needlessly Large Rod",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-lightshield-crest",
        "apiName": "TFT16_Augment_ArtifactExpert_LightshieldCrest",
        "name": "Artifact Expert: Lightshield Crest",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Neeko, a Lightshield Crest, and a Chain Vest",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "shiv-expert-twisted-fate",
        "apiName": "TFT16_Augment_ArtifactExpert_Shiv",
        "name": "Shiv Expert: Twisted Fate",
        "components": [],
        "type": "artifact",
        "stats": "Get a Twisted Fate, a Statikk Shiv, and a Needlessly Large Rod.",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-unending-despair",
        "apiName": "TFT16_Augment_ArtifactExpert_UnendingDespair",
        "name": "Artifact Expert: Unending Despair",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Rumble, a Unending Despair, and a Negatron Cloak",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
    },
    {
        "id": "artifact-expert-seekers-armguard",
        "apiName": "TFT16_Augment_ArtifactExpert_SeekersArmguard",
        "name": "Artifact Expert: Seeker's Armguard",
        "components": [],
        "type": "artifact",
        "stats": "Get a 2* Ekko, a Seeker's Armguard, and a Needlessly Large Rod",
        "icon": "ASSETS/Maps/TFT/Icons/Augments/Hexcore/Missing-T3.tex"
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
        "id": "summon-stampede",
        "apiName": "TFT14_CypherArmoryItem_SummonStampede",
        "name": "Summon Stampede",
        "components": [],
        "type": "radiant",
        "stats": "Summon Stampede",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT5_Item_ZzRotPortalRadiant.TFT_Set13.tex"
    },
    {
        "id": "3-randuins-omens",
        "apiName": "TFT14_CypherArmoryItem_3xRanduins",
        "name": "3 Randuin's Omens",
        "components": [],
        "type": "artifact",
        "stats": "3 Randuin's Omens",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT4_Item_OrnnRanduinsSanctum.TFT_Set13.tex"
    },
    {
        "id": "3-lightshield-crests",
        "apiName": "TFT14_CypherArmoryItem_3xLightshield",
        "name": "3 Lightshield Crests",
        "components": [],
        "type": "artifact",
        "stats": "3 Lightshield Crests",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT_Item_Artifact_LightshieldCrest.TFT_Set13.tex"
    },
    {
        "id": "12-radiant-items",
        "apiName": "TFT14_CypherArmoryItem_SpecificRadiantItems",
        "name": "12 radiant items",
        "components": [],
        "type": "radiant",
        "stats": "Covalent Spark, Jak'sho the Protean, Bulwark's Oath, Spear of Hirana, Rabadon's Ascended Deathcap, Glamorous Gauntlet, Guinsoo's Reckoning, Runaan's Tempest, Luminous Deathblade, Zenith Edge, Fist of Fairness, Eternal Whisper",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/Pairs/DoubleUp_AssistArmory_RandomItem_Radiant.tex"
    },
    {
        "id": "3-deathfire-grasps",
        "apiName": "TFT14_CypherArmoryItem_3xDeathfire",
        "name": "3 Deathfire Grasps",
        "components": [],
        "type": "artifact",
        "stats": "3 Deathfire Grasps",
        "icon": "ASSETS/Maps/TFT/Icons/Items/Hexcore/TFT9_Item_OrnnDeathfireGrasp.TFT_Set13.tex"
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
        "id": "pulse-silencer",
        "apiName": "TFT14_JhinCyberneticItem_Radiant",
        "name": "Pulse Silencer",
        "components": [],
        "type": "radiant",
        "stats": "Execute enemies below @ExecuteThresholdPercent*100@% Health. Abilities can critically strike. Gain @RedundantCritDamage*100@% Critical Strike Damage.Total Executions This Round: @TFTUnitProperty.item:TFT14_Trait_Cybernetic_JhinItem_TotalExecutions@Recommended users: Jhin and Zeri",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT14/TFT14_Item_JhinCyberneticItem_Radiant.TFT_Set14.tex"
    },
    {
        "id": "scoped-holobow",
        "apiName": "TFT14_VarusCyberneticItem_Radiant",
        "name": "Scoped Holobow",
        "components": [],
        "type": "radiant",
        "stats": "Attacks that Critically Strike grant @BonusManaOnHit@ bonus Mana. After casting an Ability, gain @CritChanceOnCast@% Critical Strike Chance for @Duration@ seconds. Recommended users: Varus, Jhin, and Zeri",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT14/TFT14_Item_VarusCyberneticItem_Radiant.TFT_Set14.tex"
    },
    {
        "id": "apex-fangs",
        "apiName": "TFT14_NaafiriCyberneticItem_Radiant",
        "name": "Apex-Fangs",
        "components": [],
        "type": "radiant",
        "stats": "When you damage an enemy, deal @StoredDamage*100@% of the damage to the nearest enemy as physical damage after a brief delay.Total Shockwave Damage This Round: @TFTUnitProperty.item:TFT14_Trait_Cybernetic_NaafiriItem_TotalShockwaveDamage@Recommended users: Naafiri, Jhin, and Varus",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT14/TFT14_Item_NaafiriCyberneticItem_Radiant.TFT_Set14.tex"
    },
    {
        "id": "hijacked-cybercoil",
        "apiName": "TFT14_SejuaniCyberneticItem_Radiant",
        "name": "Hijacked Cybercoil",
        "components": [],
        "type": "radiant",
        "stats": "Abilities and Attacks mark enemies for @MarkDuration@ seconds. Heal for @HealingPercent*100@% of damage dealt to marked enemies.Total Healing This Round: @TFTUnitProperty.item:TFT14_Trait_Cybernetic_SejuaniItem_TotalHealing@Recommended users: Sejuani, Jax, and Mordekaiser",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT14/TFT14_Item_SejuaniCyberneticItem_Radiant.TFT_Set14.tex"
    },
    {
        "id": "fully-charged-flux-capacitor",
        "apiName": "TFT14_ZeriCyberneticItem_Radiant",
        "name": "Fully-Charged Flux Capacitor",
        "components": [],
        "type": "radiant",
        "stats": "Every other attack is charged, dealing @ShockDamage*100@% of the target's max health as physical damage and reduces their Armor by @FlatArmorReduction@.Total Charge Damage This Round: @TFTUnitProperty.item:TFT14_Trait_Cybernetic_ZeriItem_TotalLightningDamage@Recommended users: Zeri and Naafiri",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT14/TFT14_Item_ZeriCyberneticItem_Radiant.TFT_Set14.tex"
    },
    {
        "id": "nullifier-lantern",
        "apiName": "TFT14_JaxCyberneticItem_Radiant",
        "name": "Nullifier Lantern",
        "components": [],
        "type": "radiant",
        "stats": "Gain @BonusPercentHP*100@% health. Every @Interval@ seconds, deal @PercHealthDamage*100@% of the holder's max health as magic damage to all enemies within @Radius@-hex.Total Damage Dealt This Round: @TFTUnitProperty.item:TFT14_Trait_Cybernetic_JaxItem_TotalDamageReflected@Recommended users: Jax, Mordekaiser, and Sejuani",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT14/TFT14_Item_JaxCyberneticItem_Radiant.TFT_Set14.tex"
    },
    {
        "id": "harmonized-chassis",
        "apiName": "TFT14_MordekaiserCyberneticItem_Radiant",
        "name": "Harmonized Chassis",
        "components": [],
        "type": "radiant",
        "stats": "All Shields are @ShieldEffectivenessPercent*100@% more effective on the holder. Every second, siphon @HealthSiphonAmt*100@% of the owner's max Health from the nearest @NumEnemies@ enemies and convert it to a Shield for @ShieldDuration@ seconds.Shielding This Round: @TFTUnitProperty.item:TFT14_Trait_Cybernetic_MordekaiserItem_TotalShielding@Recommended users: Mordekaiser, Jax, and Sejuani",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT14/TFT14_Item_MordekaiserCyberneticItem_Radiant.TFT_Set14.tex"
    },
    {
        "id": "eternal-monarchs-crown",
        "apiName": "TFT12_Item_Faerie_QueensCrownRadiant",
        "name": "Eternal Monarch's Crown",
        "components": [],
        "type": "radiant",
        "stats": "After dealing damage @MaxNumStacks@ times, gain @TFTUnitProperty.item:TFT12_Faerie_DamageAmp@%  for the rest of combat.After dealing damage @RadiantMaxStacks@ times, gain @RadiantMaxHealth*100@% maximum Health, @RadiantOmnivamp*100@% Omnivamp, and @RadiantDamageAmp*100@% damage amp.Only Faeries can hold this item.Bench the champion to remove it.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT12/TFT12_FaerieCrown_Radiant.TFT_Set12.tex"
    },
    {
        "id": "armor-of-eternal-devotion",
        "apiName": "TFT12_Item_Faerie_ArmorRadiant",
        "name": "Armor of Eternal Devotion",
        "components": [],
        "type": "radiant",
        "stats": "Gain @HealShieldPower*100@% increased healing and shielding. Heal for @QueenHealRatio*100@% of the Queen's damage dealt.Only Faeries can hold this item.Bench the champion to remove it.",
        "icon": "ASSETS/Maps/Particles/TFT/Item_Icons/TFT12/TFT12_FaerieQueenguardArmor_Radiant.TFT_Set12.tex"
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

/***/ "./src/services/CompViewerRenderer.ts":
/*!********************************************!*\
  !*** ./src/services/CompViewerRenderer.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultPinIfNone = exports.getPinnedCompId = exports.pinCompId = exports.CompViewerRenderer = void 0;
const comps_1 = __webpack_require__(/*! ../data/set17/comps */ "./src/data/set17/comps.ts");
const champions_1 = __webpack_require__(/*! ../data/set17/champions */ "./src/data/set17/champions.ts");
const items_1 = __webpack_require__(/*! ../data/set17/items */ "./src/data/set17/items.ts");
const positioning_1 = __webpack_require__(/*! ../data/set17/positioning */ "./src/data/set17/positioning.ts");
const assetUrls_1 = __webpack_require__(/*! ../data/assetUrls */ "./src/data/assetUrls.ts");
const PINNED_KEY = 'pivottft_pinned_comp_id';
class CompViewerRenderer {
    static init() {
        this.render();
        window.addEventListener('storage', (e) => {
            if (e.key === PINNED_KEY)
                this.render();
        });
    }
    static render() {
        const compId = (() => {
            try {
                return localStorage.getItem(PINNED_KEY);
            }
            catch (_a) {
                return null;
            }
        })();
        const empty = document.getElementById('viewer-empty-state');
        const content = document.getElementById('viewer-content');
        const nameEl = document.getElementById('viewer-comp-name');
        const comp = compId ? comps_1.metaComps.find(c => c.id === compId) : null;
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
function getPinnedCompId() {
    try {
        return localStorage.getItem(PINNED_KEY);
    }
    catch (_a) {
        return null;
    }
}
exports.getPinnedCompId = getPinnedCompId;
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
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchTracker = void 0;
const EMPTY_STATE = {
    inMatch: false,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLDBGQUEwRixFQUFFO0lBQ3BMLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxFQUFFLFFBQVEsRUFBRSx3RkFBd0YsRUFBRTtJQUNwTCxFQUFFLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsNEZBQTRGLEVBQUU7SUFDeEwsRUFBRSxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxzR0FBc0csRUFBRTtJQUNyTSxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsd0ZBQXdGLEVBQUU7SUFDcEwsRUFBRSxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsc0ZBQXNGLEVBQUU7SUFDdkssRUFBRSxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLDRGQUE0RixFQUFFO0lBQzNMLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFF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QyxDQUFDO0lBQzlELENBQUM7SUFFTyxLQUFLLENBQUMscUJBQXFCO1FBQ2pDLE1BQU0sSUFBSSxHQUFHLE1BQU0seUJBQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN4RSxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9waXZvdHRmdC8uL25vZGVfbW9kdWxlcy9Ab3ZlcndvbGYvb3ZlcndvbGYtYXBpLXRzL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9ub2RlX21vZHVsZXMvQG92ZXJ3b2xmL292ZXJ3b2xmLWFwaS10cy9kaXN0L293LWdhbWUtbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9ub2RlX21vZHVsZXMvQG92ZXJ3b2xmL292ZXJ3b2xmLWFwaS10cy9kaXN0L293LWdhbWVzLWV2ZW50cy5qcyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL25vZGVfbW9kdWxlcy9Ab3ZlcndvbGYvb3ZlcndvbGYtYXBpLXRzL2Rpc3Qvb3ctZ2FtZXMuanMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9ub2RlX21vZHVsZXMvQG92ZXJ3b2xmL292ZXJ3b2xmLWFwaS10cy9kaXN0L293LWhvdGtleXMuanMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9ub2RlX21vZHVsZXMvQG92ZXJ3b2xmL292ZXJ3b2xmLWFwaS10cy9kaXN0L293LWxpc3RlbmVyLmpzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vbm9kZV9tb2R1bGVzL0BvdmVyd29sZi9vdmVyd29sZi1hcGktdHMvZGlzdC9vdy13aW5kb3cuanMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9ub2RlX21vZHVsZXMvQG92ZXJ3b2xmL292ZXJ3b2xmLWFwaS10cy9kaXN0L3RpbWVyLmpzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL0FwcFdpbmRvdy50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9jb25zdHMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvZGF0YS9hc3NldFVybHMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvZGF0YS9zZXQxNy9jaGFtcGlvbnMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvZGF0YS9zZXQxNy9jb21wcy50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9kYXRhL3NldDE3L2l0ZW1zLnRzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL2RhdGEvc2V0MTcvcG9zaXRpb25pbmcudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvc2VydmljZXMvQ29tcFZpZXdlclJlbmRlcmVyLnRzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL3NlcnZpY2VzL01hdGNoVHJhY2tlci50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9pbl9nYW1lL2luX2dhbWUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KSk7XHJcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9vdy1nYW1lLWxpc3RlbmVyXCIpLCBleHBvcnRzKTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL293LWdhbWVzLWV2ZW50c1wiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9vdy1nYW1lc1wiKSwgZXhwb3J0cyk7XHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9vdy1ob3RrZXlzXCIpLCBleHBvcnRzKTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL293LWxpc3RlbmVyXCIpLCBleHBvcnRzKTtcclxuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL293LXdpbmRvd1wiKSwgZXhwb3J0cyk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuT1dHYW1lTGlzdGVuZXIgPSB2b2lkIDA7XHJcbmNvbnN0IG93X2xpc3RlbmVyXzEgPSByZXF1aXJlKFwiLi9vdy1saXN0ZW5lclwiKTtcclxuY2xhc3MgT1dHYW1lTGlzdGVuZXIgZXh0ZW5kcyBvd19saXN0ZW5lcl8xLk9XTGlzdGVuZXIge1xyXG4gICAgY29uc3RydWN0b3IoZGVsZWdhdGUpIHtcclxuICAgICAgICBzdXBlcihkZWxlZ2F0ZSk7XHJcbiAgICAgICAgdGhpcy5vbkdhbWVJbmZvVXBkYXRlZCA9ICh1cGRhdGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF1cGRhdGUgfHwgIXVwZGF0ZS5nYW1lSW5mbykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdXBkYXRlLnJ1bm5pbmdDaGFuZ2VkICYmICF1cGRhdGUuZ2FtZUNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodXBkYXRlLmdhbWVJbmZvLmlzUnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RlbGVnYXRlLm9uR2FtZVN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5vbkdhbWVTdGFydGVkKHVwZGF0ZS5nYW1lSW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGVsZWdhdGUub25HYW1lRW5kZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5vbkdhbWVFbmRlZCh1cGRhdGUuZ2FtZUluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uUnVubmluZ0dhbWVJbmZvID0gKGluZm8pID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZm8uaXNSdW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGVsZWdhdGUub25HYW1lU3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlbGVnYXRlLm9uR2FtZVN0YXJ0ZWQoaW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgICAgICBvdmVyd29sZi5nYW1lcy5vbkdhbWVJbmZvVXBkYXRlZC5hZGRMaXN0ZW5lcih0aGlzLm9uR2FtZUluZm9VcGRhdGVkKTtcclxuICAgICAgICBvdmVyd29sZi5nYW1lcy5nZXRSdW5uaW5nR2FtZUluZm8odGhpcy5vblJ1bm5pbmdHYW1lSW5mbyk7XHJcbiAgICB9XHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIG92ZXJ3b2xmLmdhbWVzLm9uR2FtZUluZm9VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHRoaXMub25HYW1lSW5mb1VwZGF0ZWQpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuT1dHYW1lTGlzdGVuZXIgPSBPV0dhbWVMaXN0ZW5lcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5PV0dhbWVzRXZlbnRzID0gdm9pZCAwO1xyXG5jb25zdCB0aW1lcl8xID0gcmVxdWlyZShcIi4vdGltZXJcIik7XHJcbmNsYXNzIE9XR2FtZXNFdmVudHMge1xyXG4gICAgY29uc3RydWN0b3IoZGVsZWdhdGUsIHJlcXVpcmVkRmVhdHVyZXMsIGZlYXR1cmVSZXRyaWVzID0gMTApIHtcclxuICAgICAgICB0aGlzLm9uSW5mb1VwZGF0ZXMgPSAoaW5mbykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5vbkluZm9VcGRhdGVzKGluZm8uaW5mbyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uTmV3RXZlbnRzID0gKGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZGVsZWdhdGUub25OZXdFdmVudHMoZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xyXG4gICAgICAgIHRoaXMuX3JlcXVpcmVkRmVhdHVyZXMgPSByZXF1aXJlZEZlYXR1cmVzO1xyXG4gICAgICAgIHRoaXMuX2ZlYXR1cmVSZXRyaWVzID0gZmVhdHVyZVJldHJpZXM7XHJcbiAgICB9XHJcbiAgICBhc3luYyBnZXRJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBvdmVyd29sZi5nYW1lcy5ldmVudHMuZ2V0SW5mbyhyZXNvbHZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFzeW5jIHNldFJlcXVpcmVkRmVhdHVyZXMoKSB7XHJcbiAgICAgICAgbGV0IHRyaWVzID0gMSwgcmVzdWx0O1xyXG4gICAgICAgIHdoaWxlICh0cmllcyA8PSB0aGlzLl9mZWF0dXJlUmV0cmllcykge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgICAgIG92ZXJ3b2xmLmdhbWVzLmV2ZW50cy5zZXRSZXF1aXJlZEZlYXR1cmVzKHRoaXMuX3JlcXVpcmVkRmVhdHVyZXMsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NldFJlcXVpcmVkRmVhdHVyZXMoKTogc3VjY2VzczogJyArIEpTT04uc3RyaW5naWZ5KHJlc3VsdCwgbnVsbCwgMikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChyZXN1bHQuc3VwcG9ydGVkRmVhdHVyZXMubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXdhaXQgdGltZXJfMS5UaW1lci53YWl0KDMwMDApO1xyXG4gICAgICAgICAgICB0cmllcysrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLndhcm4oJ3NldFJlcXVpcmVkRmVhdHVyZXMoKTogZmFpbHVyZSBhZnRlciAnICsgdHJpZXMgKyAnIHRyaWVzJyArIEpTT04uc3RyaW5naWZ5KHJlc3VsdCwgbnVsbCwgMikpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50cygpO1xyXG4gICAgICAgIG92ZXJ3b2xmLmdhbWVzLmV2ZW50cy5vbkluZm9VcGRhdGVzMi5hZGRMaXN0ZW5lcih0aGlzLm9uSW5mb1VwZGF0ZXMpO1xyXG4gICAgICAgIG92ZXJ3b2xmLmdhbWVzLmV2ZW50cy5vbk5ld0V2ZW50cy5hZGRMaXN0ZW5lcih0aGlzLm9uTmV3RXZlbnRzKTtcclxuICAgIH1cclxuICAgIHVuUmVnaXN0ZXJFdmVudHMoKSB7XHJcbiAgICAgICAgb3ZlcndvbGYuZ2FtZXMuZXZlbnRzLm9uSW5mb1VwZGF0ZXMyLnJlbW92ZUxpc3RlbmVyKHRoaXMub25JbmZvVXBkYXRlcyk7XHJcbiAgICAgICAgb3ZlcndvbGYuZ2FtZXMuZXZlbnRzLm9uTmV3RXZlbnRzLnJlbW92ZUxpc3RlbmVyKHRoaXMub25OZXdFdmVudHMpO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgc3RhcnQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFtvdy1nYW1lLWV2ZW50c10gU1RBUlRgKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRSZXF1aXJlZEZlYXR1cmVzKCk7XHJcbiAgICAgICAgY29uc3QgeyByZXMsIHN0YXR1cyB9ID0gYXdhaXQgdGhpcy5nZXRJbmZvKCk7XHJcbiAgICAgICAgaWYgKHJlcyAmJiBzdGF0dXMgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICB0aGlzLm9uSW5mb1VwZGF0ZXMoeyBpbmZvOiByZXMgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RvcCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgW293LWdhbWUtZXZlbnRzXSBTVE9QYCk7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnRzKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5PV0dhbWVzRXZlbnRzID0gT1dHYW1lc0V2ZW50cztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5PV0dhbWVzID0gdm9pZCAwO1xyXG5jbGFzcyBPV0dhbWVzIHtcclxuICAgIHN0YXRpYyBnZXRSdW5uaW5nR2FtZUluZm8oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIG92ZXJ3b2xmLmdhbWVzLmdldFJ1bm5pbmdHYW1lSW5mbyhyZXNvbHZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjbGFzc0lkRnJvbUdhbWVJZChnYW1lSWQpIHtcclxuICAgICAgICBsZXQgY2xhc3NJZCA9IE1hdGguZmxvb3IoZ2FtZUlkIC8gMTApO1xyXG4gICAgICAgIHJldHVybiBjbGFzc0lkO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGFzeW5jIGdldFJlY2VudGx5UGxheWVkR2FtZXMobGltaXQgPSAzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghb3ZlcndvbGYuZ2FtZXMuZ2V0UmVjZW50bHlQbGF5ZWRHYW1lcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3ZlcndvbGYuZ2FtZXMuZ2V0UmVjZW50bHlQbGF5ZWRHYW1lcyhsaW1pdCwgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmdhbWVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgYXN5bmMgZ2V0R2FtZURCSW5mbyhnYW1lQ2xhc3NJZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBvdmVyd29sZi5nYW1lcy5nZXRHYW1lREJJbmZvKGdhbWVDbGFzc0lkLCByZXNvbHZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLk9XR2FtZXMgPSBPV0dhbWVzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk9XSG90a2V5cyA9IHZvaWQgMDtcclxuY2xhc3MgT1dIb3RrZXlzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgICBzdGF0aWMgZ2V0SG90a2V5VGV4dChob3RrZXlJZCwgZ2FtZUlkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBvdmVyd29sZi5zZXR0aW5ncy5ob3RrZXlzLmdldChyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBob3RrZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWVJZCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RrZXkgPSByZXN1bHQuZ2xvYmFscy5maW5kKGggPT4gaC5uYW1lID09PSBob3RrZXlJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzdWx0LmdhbWVzICYmIHJlc3VsdC5nYW1lc1tnYW1lSWRdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3RrZXkgPSByZXN1bHQuZ2FtZXNbZ2FtZUlkXS5maW5kKGggPT4gaC5uYW1lID09PSBob3RrZXlJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvdGtleSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoaG90a2V5LmJpbmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgnVU5BU1NJR05FRCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBvbkhvdGtleURvd24oaG90a2V5SWQsIGFjdGlvbikge1xyXG4gICAgICAgIG92ZXJ3b2xmLnNldHRpbmdzLmhvdGtleXMub25QcmVzc2VkLmFkZExpc3RlbmVyKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQubmFtZSA9PT0gaG90a2V5SWQpXHJcbiAgICAgICAgICAgICAgICBhY3Rpb24ocmVzdWx0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLk9XSG90a2V5cyA9IE9XSG90a2V5cztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5PV0xpc3RlbmVyID0gdm9pZCAwO1xyXG5jbGFzcyBPV0xpc3RlbmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGRlbGVnYXRlKSB7XHJcbiAgICAgICAgdGhpcy5fZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcclxuICAgIH1cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuT1dMaXN0ZW5lciA9IE9XTGlzdGVuZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuT1dXaW5kb3cgPSB2b2lkIDA7XHJcbmNsYXNzIE9XV2luZG93IHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5faWQgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgcmVzdG9yZSgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcclxuICAgICAgICAgICAgbGV0IGlkID0gdGhhdC5faWQ7XHJcbiAgICAgICAgICAgIG92ZXJ3b2xmLndpbmRvd3MucmVzdG9yZShpZCwgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW3Jlc3RvcmVdIC0gYW4gZXJyb3Igb2NjdXJyZWQsIHdpbmRvd0lkPSR7aWR9LCByZWFzb249JHtyZXN1bHQuZXJyb3J9YCk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgbWluaW1pemUoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoYXQuX2lkO1xyXG4gICAgICAgICAgICBvdmVyd29sZi53aW5kb3dzLm1pbmltaXplKGlkLCAoKSA9PiB7IH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgbWF4aW1pemUoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoYXQuX2lkO1xyXG4gICAgICAgICAgICBvdmVyd29sZi53aW5kb3dzLm1heGltaXplKGlkLCAoKSA9PiB7IH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgaGlkZSgpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcclxuICAgICAgICAgICAgbGV0IGlkID0gdGhhdC5faWQ7XHJcbiAgICAgICAgICAgIG92ZXJ3b2xmLndpbmRvd3MuaGlkZShpZCwgKCkgPT4geyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFzeW5jIGNsb3NlKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSB0aGF0Ll9pZDtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5nZXRXaW5kb3dTdGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiZcclxuICAgICAgICAgICAgICAgIChyZXN1bHQud2luZG93X3N0YXRlICE9PSAnY2xvc2VkJykpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuaW50ZXJuYWxDbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBkcmFnTW92ZShlbGVtKSB7XHJcbiAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBlbGVtLmNsYXNzTmFtZSArICcgZHJhZ2dhYmxlJztcclxuICAgICAgICBlbGVtLm9ubW91c2Vkb3duID0gZSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgb3ZlcndvbGYud2luZG93cy5kcmFnTW92ZSh0aGlzLl9uYW1lKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgYXN5bmMgZ2V0V2luZG93U3RhdGUoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHRoYXQuX2lkO1xyXG4gICAgICAgICAgICBvdmVyd29sZi53aW5kb3dzLmdldFdpbmRvd1N0YXRlKGlkLCByZXNvbHZlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBhc3luYyBnZXRDdXJyZW50SW5mbygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgb3ZlcndvbGYud2luZG93cy5nZXRDdXJyZW50V2luZG93KHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC53aW5kb3cpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9idGFpbigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjYiA9IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5zdGF0dXMgPT09IFwic3VjY2Vzc1wiICYmIHJlcy53aW5kb3cgJiYgcmVzLndpbmRvdy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lkID0gcmVzLndpbmRvdy5pZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX25hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHJlcy53aW5kb3cubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMud2luZG93KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBvdmVyd29sZi53aW5kb3dzLmdldEN1cnJlbnRXaW5kb3coY2IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3ZlcndvbGYud2luZG93cy5vYnRhaW5EZWNsYXJlZFdpbmRvdyh0aGlzLl9uYW1lLCBjYik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFzeW5jIGFzc3VyZU9idGFpbmVkKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhhdC5vYnRhaW4oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGFzeW5jIGludGVybmFsQ2xvc2UoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcclxuICAgICAgICAgICAgbGV0IGlkID0gdGhhdC5faWQ7XHJcbiAgICAgICAgICAgIG92ZXJ3b2xmLndpbmRvd3MuY2xvc2UoaWQsIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5zdWNjZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5PV1dpbmRvdyA9IE9XV2luZG93O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlRpbWVyID0gdm9pZCAwO1xyXG5jbGFzcyBUaW1lciB7XHJcbiAgICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZSwgaWQpIHtcclxuICAgICAgICB0aGlzLl90aW1lcklkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmhhbmRsZVRpbWVyRXZlbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVySWQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5vblRpbWVyKHRoaXMuX2lkKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2RlbGVnYXRlID0gZGVsZWdhdGU7XHJcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcclxuICAgIH1cclxuICAgIHN0YXRpYyBhc3luYyB3YWl0KGludGVydmFsSW5NUykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBpbnRlcnZhbEluTVMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3RhcnQoaW50ZXJ2YWxJbk1TKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy5fdGltZXJJZCA9IHNldFRpbWVvdXQodGhpcy5oYW5kbGVUaW1lckV2ZW50LCBpbnRlcnZhbEluTVMpO1xyXG4gICAgfVxyXG4gICAgc3RvcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdGltZXJJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVySWQpO1xyXG4gICAgICAgIHRoaXMuX3RpbWVySWQgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVGltZXIgPSBUaW1lcjtcclxuIiwiaW1wb3J0IHsgT1dXaW5kb3cgfSBmcm9tIFwiQG92ZXJ3b2xmL292ZXJ3b2xmLWFwaS10c1wiO1xyXG5cclxuLy8gRGV0ZWN0IE92ZXJ3b2xmIHJ1bnRpbWUg4oCUIHVzZWQgYnkgYWxsIHdpbmRvd3MgdG8gYWRhcHQgYmVoYXZpb3VyLlxyXG5leHBvcnQgY29uc3QgaXNPdmVyd29sZiA9XHJcbiAgdHlwZW9mIG92ZXJ3b2xmICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygb3ZlcndvbGYud2luZG93cyAhPT0gJ3VuZGVmaW5lZCc7XHJcblxyXG4vLyBBIGJhc2UgY2xhc3MgZm9yIHRoZSBhcHAncyBmb3JlZ3JvdW5kIHdpbmRvd3MuXHJcbi8vIFNldHMgdGhlIG1vZGFsIGFuZCBkcmFnIGJlaGF2aW9ycywgd2hpY2ggYXJlIHNoYXJlZCBhY2Nyb3NzIHRoZSBkZXNrdG9wIGFuZCBpbi1nYW1lIHdpbmRvd3MuXHJcbmV4cG9ydCBjbGFzcyBBcHBXaW5kb3cge1xyXG4gIHByb3RlY3RlZCBjdXJyV2luZG93OiBPV1dpbmRvdztcclxuICBwcm90ZWN0ZWQgbWFpbldpbmRvdzogT1dXaW5kb3c7XHJcbiAgcHJvdGVjdGVkIG1heGltaXplZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih3aW5kb3dOYW1lKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLm1haW5XaW5kb3cgPSBuZXcgT1dXaW5kb3coJ2JhY2tncm91bmQnKTtcclxuICAgICAgdGhpcy5jdXJyV2luZG93ID0gbmV3IE9XV2luZG93KHdpbmRvd05hbWUpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8vIEJyb3dzZXIgbW9kZSDigJQgT1dXaW5kb3cgcmVxdWlyZXMgdGhlIE92ZXJ3b2xmIHJ1bnRpbWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZUJ1dHRvbicpO1xyXG4gICAgY29uc3QgbWF4aW1pemVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWF4aW1pemVCdXR0b24nKTtcclxuICAgIGNvbnN0IG1pbmltaXplQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbmltaXplQnV0dG9uJyk7XHJcblxyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpO1xyXG5cclxuICAgIGlmIChpc092ZXJ3b2xmKSB7XHJcbiAgICAgIHRoaXMuc2V0RHJhZyhoZWFkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMubWFpbldpbmRvdykgdGhpcy5tYWluV2luZG93LmNsb3NlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtaW5pbWl6ZUJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmN1cnJXaW5kb3cpIHRoaXMuY3VycldpbmRvdy5taW5pbWl6ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWF4aW1pemVCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuY3VycldpbmRvdykgcmV0dXJuO1xyXG4gICAgICBpZiAoIXRoaXMubWF4aW1pemVkKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyV2luZG93Lm1heGltaXplKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jdXJyV2luZG93LnJlc3RvcmUoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm1heGltaXplZCA9ICF0aGlzLm1heGltaXplZDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGdldFdpbmRvd1N0YXRlKCkge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuY3VycldpbmRvdz8uZ2V0V2luZG93U3RhdGUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgc2V0RHJhZyhlbGVtKSB7XHJcbiAgICB0aGlzLmN1cnJXaW5kb3c/LmRyYWdNb3ZlKGVsZW0pO1xyXG4gIH1cclxufVxyXG4iLCIvLyBQaXZvdFRGVCDigJQgVEZUIEdhbWUgRXZlbnRzIEZlYXR1cmVzXHJcbi8vIEdhbWUgSUQgNTQyNiA9IExlYWd1ZSBvZiBMZWdlbmRzIGNsaWVudCAod2hpY2ggVEZUIHJ1bnMgaW5zaWRlKVxyXG4vLyBURlQtc3BlY2lmaWMgZXZlbnRzIHVzZSBpbnRlcm5hbCBHYW1lIElEIDIxNTcwLCBidXQgd2UgcmVnaXN0ZXIgd2l0aCA1NDI2XHJcbmV4cG9ydCBjb25zdCBrR2FtZXNGZWF0dXJlcyA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmdbXT4oW1xyXG4gIFtcclxuICAgIDU0MjYsXHJcbiAgICBbXHJcbiAgICAgICdtYXRjaF9pbmZvJyxcclxuICAgICAgJ2JvYXJkJyxcclxuICAgICAgJ2JlbmNoJyxcclxuICAgICAgJ3N0b3JlJyxcclxuICAgICAgJ2Nhcm91c2VsJyxcclxuICAgICAgJ2dhbWVfaW5mbycsXHJcbiAgICAgICdhdWdtZW50cycsXHJcbiAgICAgICdsaXZlX2NsaWVudF9kYXRhJ1xyXG4gICAgXVxyXG4gIF0sXHJcbl0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGtHYW1lQ2xhc3NJZHMgPSBBcnJheS5mcm9tKGtHYW1lc0ZlYXR1cmVzLmtleXMoKSk7XHJcblxyXG5leHBvcnQgY29uc3Qga1dpbmRvd05hbWVzID0ge1xyXG4gIGluR2FtZTogJ2luX2dhbWUnLFxyXG4gIGRlc2t0b3A6ICdkZXNrdG9wJyxcclxuICBzZXR0aW5nczogJ3NldHRpbmdzJyxcclxuICBpbmdhbWVDb250cm9sbGVyOiAnaW5nYW1lX2NvbnRyb2xsZXInLFxyXG4gIG1hdGNodXBzOiAnbWF0Y2h1cHMnLFxyXG4gIGxvZ2luOiAnbG9naW4nLFxyXG4gIGFkbWluOiAnYWRtaW4nLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGtIb3RrZXlzID0ge1xyXG4gIHRvZ2dsZTogJ3Bpdm90dGZ0X3Nob3doaWRlJ1xyXG59O1xyXG5cclxuLy8gVEZUIEdhbWUgSUQgZm9yIGV2ZW50IHJlZ2lzdHJhdGlvblxyXG5leHBvcnQgY29uc3Qga1RGVENsYXNzSWQgPSA1NDI2O1xyXG5cclxuLy8gUmlvdCBBUEkgQ29uZmlndXJhdGlvblxyXG5leHBvcnQgY29uc3Qga1Jpb3RBcGlDb25maWcgPSB7XHJcbiAgYXBpS2V5OiAnJyxcclxuICByZWdpb246ICdldXJvcGUnIGFzIGNvbnN0LCAgICAgICAvLyBhbWVyaWNhcyB8IGV1cm9wZSB8IGFzaWEgKGFjY291bnQtdjEsIG1hdGNoLXYxKVxyXG4gIHBsYXRmb3JtOiAnZXVuMScsICAgICAgICAgICAgICAgIC8vIGV1dzEsIGV1bjEsIG5hMSwga3IsIC4uLiAoc3VtbW9uZXIvbGVhZ3VlKVxyXG59O1xyXG5cclxuLy8gQmFja2VuZCBiYXNlIFVSTC4gSW4gcHJvZHVjdGlvbiByb3V0ZXMgdGhyb3VnaCBDbG91ZGZsYXJlIFdvcmtlciBhdFxyXG4vLyBhcGkucGl2b3R0ZnQuY29tIChSaW90IEFQSSBwcm94eSArIGF1dGggKyBjb21wcyBiYWNrZW5kKS4gT3ZlcnJpZGUgdG9cclxuLy8gaHR0cDovLzEyNy4wLjAuMTo4Nzg3IGR1cmluZyBsb2NhbCBgd3JhbmdsZXIgZGV2YCBkZXZlbG9wbWVudC5cclxuZXhwb3J0IGNvbnN0IGtSaW90QXBpQmFzZVVybCA9ICdodHRwczovL2FwaS5waXZvdHRmdC5jb20nO1xyXG5cclxuXHJcbi8vIFBsYXRmb3JtIOKGkiByZWdpb25hbCByb3V0aW5nIG1hcCAoZm9yIGFjY291bnQvbWF0Y2ggZW5kcG9pbnRzKVxyXG5leHBvcnQgY29uc3Qga1BsYXRmb3JtVG9SZWdpb246IFJlY29yZDxzdHJpbmcsICdhbWVyaWNhcycgfCAnZXVyb3BlJyB8ICdhc2lhJz4gPSB7XHJcbiAgJ2V1dzEnOiAnZXVyb3BlJywgJ2V1bjEnOiAnZXVyb3BlJywgJ3RyMSc6ICdldXJvcGUnLCAncnUnOiAnZXVyb3BlJyxcclxuICAnbmExJzogJ2FtZXJpY2FzJywgJ2JyMSc6ICdhbWVyaWNhcycsICdsYTEnOiAnYW1lcmljYXMnLCAnbGEyJzogJ2FtZXJpY2FzJyxcclxuICAna3InOiAnYXNpYScsICdqcDEnOiAnYXNpYScsICdvYzEnOiAnYXNpYScsICdwaDInOiAnYXNpYScsXHJcbiAgJ3NnMic6ICdhc2lhJywgJ3RoMic6ICdhc2lhJywgJ3R3Mic6ICdhc2lhJywgJ3ZuMic6ICdhc2lhJyxcclxufTtcclxuIiwiLy8gUGl2b3RURlQg4oCUIENvbW11bml0eSBEcmFnb24gQ0ROIEFzc2V0IFVSTCBNYXBwaW5nc1xyXG4vLyBDaGFtcGlvbiBzcGxhc2ggdGlsZXMgKyBURlQgaXRlbS9jb21wb25lbnQgaWNvbnMuXHJcbi8vXHJcbi8vIFR3byBDb21tdW5pdHlEcmFnb24gcm9vdHMgYXJlIHVzZWQ6XHJcbi8vICAgLSByY3AtYmUtbG9sLWdhbWUtZGF0YSAoZGVmYXVsdCBnYW1lLWRhdGEgcGx1Z2luKSBmb3IgaXRlbSBpY29uc1xyXG4vLyAgIC0gL2dhbWUvPGFzc2V0IHBhdGg+ICAgICAgICAgICBmb3IgVEZUIGNoYW1waW9uIHNwbGFzaCB0aWxlc1xyXG4vLyBFdmVyeSBwYXRoIGlzIG1pcnJvcmVkIGxvd2VyY2FzZWQgb24gQ29tbXVuaXR5RHJhZ29uLCBzbyB3ZSBsb3dlcmNhc2UgYmVmb3JlXHJcbi8vIGNvbnN0cnVjdGluZyBVUkxzLlxyXG5cclxuaW1wb3J0IHsgY2hhbXBpb25NYXAgfSBmcm9tICcuL3NldDE3L2NoYW1waW9ucyc7XHJcblxyXG5jb25zdCBHQU1FX0RBVEFfQkFTRSA9ICdodHRwczovL3Jhdy5jb21tdW5pdHlkcmFnb24ub3JnL2xhdGVzdC9wbHVnaW5zL3JjcC1iZS1sb2wtZ2FtZS1kYXRhL2dsb2JhbC9kZWZhdWx0JztcclxuY29uc3QgR0FNRV9CQVNFID0gJ2h0dHBzOi8vcmF3LmNvbW11bml0eWRyYWdvbi5vcmcvbGF0ZXN0L2dhbWUnO1xyXG5cclxuLy8gPT09PT0gQ2hhbXBpb24gU3BsYXNoIFRpbGVzID09PT09XHJcbi8vIFVzZXMgdGhlIHBlci1jaGFtcGlvbiBgdGlsZUljb25gIHBhdGggc3RvcmVkIGluIGNoYW1waW9ucy50cyAobWF0Y2hlcyB0aGVcclxuLy8gaW4tY2xpZW50IFRGVCB0ZWFtLWJ1aWxkZXIgcG9ydHJhaXQgdGhhdCBNZXRhVEZUIGRpc3BsYXlzKS5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW1waW9uSWNvblVybChjaGFtcGlvbklkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGNoYW1wID0gY2hhbXBpb25NYXAuZ2V0KGNoYW1waW9uSWQpO1xyXG4gIGlmICghY2hhbXAgfHwgIWNoYW1wLnRpbGVJY29uKSByZXR1cm4gJyc7XHJcbiAgcmV0dXJuIGAke0dBTUVfQkFTRX0vJHtjaGFtcC50aWxlSWNvbi50b0xvd2VyQ2FzZSgpfWA7XHJcbn1cclxuXHJcblxyXG4vLyA9PT09PSBURlQgSXRlbSBJY29ucyA9PT09PVxyXG4vLyBNYXBzIG91ciBpdGVtIHNsdWcgSURzIOKGkiBDRE4gZmlsZW5hbWVzIGZyb20gdGZ0aXRlbXMuanNvblxyXG5jb25zdCBpdGVtQ2RuUGF0aHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgLy8gQ29tcGxldGVkIGl0ZW1zXHJcbiAgJ2luZmluaXR5LWVkZ2UnOiAgICAgICAnVEZUX0l0ZW1fSW5maW5pdHlFZGdlLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdibG9vZHRoaXJzdGVyJzogICAgICAgJ1RGVF9JdGVtX0Jsb29kdGhpcnN0ZXIuVEZUX1NldDEzLnBuZycsXHJcbiAgJ2dpYW50LXNsYXllcic6ICAgICAgICAnVEZUX0l0ZW1fTWFkcmVkc0Jsb29kcmF6b3IuVEZUX1NldDEzLnBuZycsXHJcbiAgJ2hleHRlY2gtZ3VuYmxhZGUnOiAgICAnVEZUX0l0ZW1fSGV4dGVjaEd1bmJsYWRlLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdlZGdlLW9mLW5pZ2h0JzogICAgICAgJ1RGVF9JdGVtX0d1YXJkaWFuQW5nZWwuVEZUX1NldDEzLnBuZycsXHJcbiAgJ2RlYXRoYmxhZGUnOiAgICAgICAgICAnVEZUX0l0ZW1fRGVhdGhibGFkZS5URlRfU2V0MTMucG5nJyxcclxuICAnemVrZXMtaGVyYWxkJzogICAgICAgICdURlRfSXRlbV9aZWtlc0hlcmFsZC5URlRfU2V0MTMucG5nJyxcclxuICAnYmx1ZS1idWZmJzogICAgICAgICAgICdURlRfSXRlbV9CbHVlQnVmZi5URlRfU2V0MTMucG5nJyxcclxuICAnZ3VpbnNvb3MtcmFnZWJsYWRlJzogICdURlRfSXRlbV9HdWluc29vc1JhZ2VibGFkZS5URlRfU2V0MTMucG5nJyxcclxuICAnc3RhdGlray1zaGl2JzogICAgICAgICdURlRfSXRlbV9TdGF0aWtrU2hpdi5URlRfU2V0MTMucG5nJyxcclxuICAndGl0YW5zLXJlc29sdmUnOiAgICAgICdURlRfSXRlbV9UaXRhbnNSZXNvbHZlLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdydW5hYW5zLWh1cnJpY2FuZSc6ICAgJ1RGVF9JdGVtX1J1bmFhbnNIdXJyaWNhbmUuVEZUX1NldDEzLnBuZycsXHJcbiAgJ3JhcGlkLWZpcmVjYW5ub24nOiAgICAnVEZUX0l0ZW1fUmFwaWRGaXJlQ2Fubm9uLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdsYXN0LXdoaXNwZXInOiAgICAgICAgJ1RGVF9JdGVtX0xhc3RXaGlzcGVyLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdoYW5kLW9mLWp1c3RpY2UnOiAgICAgJ1RGVF9JdGVtX1Vuc3RhYmxlQ29uY29jdGlvbi5URlRfU2V0MTMucG5nJyxcclxuICAnamV3ZWxlZC1nYXVudGxldCc6ICAgICdURlRfSXRlbV9KZXdlbGVkR2F1bnRsZXQuVEZUX1NldDEzLnBuZycsXHJcbiAgJ3JhYmFkb25zLWRlYXRoY2FwJzogICAnVEZUX0l0ZW1fUmFiYWRvbnNEZWF0aGNhcC5URlRfU2V0MTMucG5nJyxcclxuICAnbW9yZWxsb25vbWljb24nOiAgICAgICdURlRfSXRlbV9Nb3JlbGxvbm9taWNvbi5URlRfU2V0MTMucG5nJyxcclxuICAnaW9uaWMtc3BhcmsnOiAgICAgICAgICdURlRfSXRlbV9Jb25pY1NwYXJrLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdhcmNoYW5nZWxzLXN0YWZmJzogICAgJ1RGVF9JdGVtX0FyY2hhbmdlbHNTdGFmZi5URlRfU2V0MTMucG5nJyxcclxuICAnbmFzaG9ycy10b290aCc6ICAgICAgICdURlRfSXRlbV9MZXZpYXRoYW4uVEZUX1NldDEzLnBuZycsXHJcbiAgJ2JyYW1ibGUtdmVzdCc6ICAgICAgICAnVEZUX0l0ZW1fQnJhbWJsZVZlc3QuVEZUX1NldDEzLnBuZycsXHJcbiAgJ2dhcmdveWxlLXN0b25lcGxhdGUnOiAnVEZUX0l0ZW1fR2FyZ295bGVTdG9uZXBsYXRlLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdzdW5maXJlLWNhcGUnOiAgICAgICAgJ1RGVF9JdGVtX1JlZEJ1ZmYuVEZUX1NldDEzLnBuZycsXHJcbiAgJ2d1YXJkYnJlYWtlcic6ICAgICAgICAnVEZUX0l0ZW1fUG93ZXJHYXVudGxldC5URlRfU2V0MTMucG5nJyxcclxuICAnZHJhZ29ucy1jbGF3JzogICAgICAgICdURlRfSXRlbV9EcmFnb25zQ2xhdy5URlRfU2V0MTMucG5nJyxcclxuICAncXVpY2tzaWx2ZXInOiAgICAgICAgICdURlRfSXRlbV9RdWlja3NpbHZlci5URlRfU2V0MTMucG5nJyxcclxuICAncmVkZW1wdGlvbic6ICAgICAgICAgICdURlRfSXRlbV9TcGlyaXRWaXNhZ2VSUi5URlRfVEZUMTRfNS5wbmcnLFxyXG4gICdjcm93bmd1YXJkJzogICAgICAgICAgJ1RGVF9JdGVtX0Nyb3duZ3VhcmQuVEZUX1NldDEzLnBuZycsXHJcbiAgJ3dhcm1vZ3MtYXJtb3InOiAgICAgICAnVEZUX0l0ZW1fV2FybW9nc0FybW9yLlRGVF9TZXQxMy5wbmcnLFxyXG4gICd0aGllZnMtZ2xvdmVzJzogICAgICAgJ1RGVF9JdGVtX1RoaWVmc0dsb3Zlcy5URlRfU2V0MTMucG5nJyxcclxuICAnc3BlYXItb2Ytc2hvamluJzogICAgICdURlRfSXRlbV9TcGVhck9mU2hvamluLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdhZGFwdGl2ZS1oZWxtJzogICAgICAgJ1RGVF9JdGVtX0FkYXB0aXZlSGVsbS5URlRfU2V0MTMucG5nJyxcclxuICAnc3RlYWRmYXN0LWhlYXJ0JzogICAgICdURlRfSXRlbV9OaWdodEhhcnZlc3Rlci5URlRfU2V0MTMucG5nJyxcclxuICAnZnJvemVuLWhlYXJ0JzogICAgICAgICdURlRfSXRlbV9Gcm96ZW5IZWFydC5URlRfU2V0MTMucG5nJyxcclxufTtcclxuXHJcbi8vIENvbW11bml0eURyYWdvbiBzdG9yZXMgVEZUIGl0ZW0gaWNvbnMgdW5kZXJcclxuLy8gICAvYXNzZXRzL21hcHMvdGZ0L2ljb25zL2l0ZW1zL2hleGNvcmUvXHJcbi8vIGFuZCBtaXJyb3JzIGFsbCBwYXRocyBsb3dlcmNhc2VkLiBUaGUgUmlvdCBmaWxlIG5hbWVzIGZyb20gdGZ0aXRlbXMuanNvbiB1c2VcclxuLy8gbWl4ZWQtY2FzZSArIGEgVEZUX1NldCBzdWZmaXg7IHdlIGxvd2VyY2FzZSBiZWZvcmUgYnVpbGRpbmcgdGhlIFVSTCBzbyB0aGVcclxuLy8gQ0ROIHJldHVybnMgdGhlIGljb24gaW5zdGVhZCBvZiA0MDQnaW5nIGJhY2sgdG8gYSB0ZXh0IGZhbGxiYWNrLlxyXG5pbXBvcnQgeyBpdGVtTWFwIH0gZnJvbSAnLi9zZXQxNy9pdGVtcyc7XHJcblxyXG5jb25zdCBJVEVNX0lDT05fUEFUSCA9ICdhc3NldHMvbWFwcy90ZnQvaWNvbnMvaXRlbXMvaGV4Y29yZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlbUljb25VcmwoaXRlbUlkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGl0ZW0gPSBpdGVtTWFwLmdldChpdGVtSWQpO1xyXG4gIGlmIChpdGVtICYmIGl0ZW0uaWNvbikge1xyXG4gICAgcmV0dXJuIGAke0dBTUVfQkFTRX0vJHtpdGVtLmljb24udG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcudGV4JywgJy5wbmcnKX1gO1xyXG4gIH1cclxuICBjb25zdCBmaWxlbmFtZSA9IGl0ZW1DZG5QYXRoc1tpdGVtSWRdO1xyXG4gIGlmICghZmlsZW5hbWUpIHJldHVybiAnJztcclxuICByZXR1cm4gYCR7R0FNRV9EQVRBX0JBU0V9LyR7SVRFTV9JQ09OX1BBVEh9LyR7ZmlsZW5hbWUudG9Mb3dlckNhc2UoKX1gO1xyXG59XHJcblxyXG5cclxuLy8gPT09PT0gQmFzZSBDb21wb25lbnQgSWNvbnMgPT09PT1cclxuY29uc3QgY29tcG9uZW50Q2RuUGF0aHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgJ2JmLXN3b3JkJzogICAgICAgICAgICAgICdURlRfSXRlbV9CRlN3b3JkLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdyZWN1cnZlLWJvdyc6ICAgICAgICAgICAnVEZUX0l0ZW1fUmVjdXJ2ZUJvdy5URlRfU2V0MTMucG5nJyxcclxuICAnbmVlZGxlc3NseS1sYXJnZS1yb2QnOiAgJ1RGVF9JdGVtX05lZWRsZXNzbHlMYXJnZVJvZC5URlRfU2V0MTMucG5nJyxcclxuICAndGVhci1vZi1nb2RkZXNzJzogICAgICAgJ1RGVF9JdGVtX1RlYXJPZlRoZUdvZGRlc3MuVEZUX1NldDEzLnBuZycsXHJcbiAgJ2NoYWluLXZlc3QnOiAgICAgICAgICAgICdURlRfSXRlbV9DaGFpblZlc3QuVEZUX1NldDEzLnBuZycsXHJcbiAgJ25lZ2F0cm9uLWNsb2FrJzogICAgICAgICdURlRfSXRlbV9OZWdhdHJvbkNsb2FrLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdnaWFudHMtYmVsdCc6ICAgICAgICAgICAnVEZUX0l0ZW1fR2lhbnRzQmVsdC5URlRfU2V0MTMucG5nJyxcclxuICAnc3BhcnJpbmctZ2xvdmVzJzogICAgICAgJ1RGVF9JdGVtX1NwYXJyaW5nR2xvdmVzLlRGVF9TZXQxMy5wbmcnLFxyXG4gICdzcGF0dWxhJzogICAgICAgICAgICAgICAnVEZUX0l0ZW1fU3BhdHVsYS5URlRfU2V0MTMucG5nJyxcclxuICAnZnJ5aW5nLXBhbic6ICAgICAgICAgICAgJ1RGVF9JdGVtX0ZyeWluZ1Bhbi5URlRfU2V0MTMucG5nJyxcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnRJY29uVXJsKGNvbXBvbmVudElkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGZpbGVuYW1lID0gY29tcG9uZW50Q2RuUGF0aHNbY29tcG9uZW50SWRdO1xyXG4gIGlmICghZmlsZW5hbWUpIHJldHVybiAnJztcclxuICByZXR1cm4gYCR7R0FNRV9EQVRBX0JBU0V9LyR7SVRFTV9JQ09OX1BBVEh9LyR7ZmlsZW5hbWUudG9Mb3dlckNhc2UoKX1gO1xyXG59XHJcblxyXG4vLyA9PT09PSBBdWdtZW50IEljb25zID09PT09XHJcbi8vIENvbW11bml0eURyYWdvbiBzdG9yZXMgYXVnbWVudCBpY29ucyBhcyBBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvLi4uIC50ZXhcclxuLy8gcGF0aHMuIENEcmFnb24gbWlycm9ycyBhbGwgcGF0aHMgbG93ZXJjYXNlZCBhbmQgc2VydmVzIC50ZXggYXMgLnBuZy5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEF1Z21lbnRJY29uVXJsKGljb25QYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmICghaWNvblBhdGgpIHJldHVybiAnJztcclxuICBjb25zdCBwYXRoID0gaWNvblBhdGgudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcudGV4JywgJy5wbmcnKTtcclxuICByZXR1cm4gYCR7R0FNRV9CQVNFfS8ke3BhdGh9YDtcclxufVxyXG5cclxuLy8gPT09PT0gVHJhaXQgSWNvbnMgPT09PT1cclxuLy8gVHJhaXQgaWNvbnMgbGl2ZSBhdCBBU1NFVFMvVVgvVHJhaXRJY29ucy9UcmFpdF9JY29uXyouVEZUX1NldCoudGV4LiBTYW1lXHJcbi8vIENEcmFnb24gdHJhbnNmb3JtIGFzIGF1Z21lbnRzIOKAlCBsb3dlcmNhc2UgKyAudGV4IOKGkiAucG5nLlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhaXRJY29uVXJsKGljb25QYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmICghaWNvblBhdGgpIHJldHVybiAnJztcclxuICBjb25zdCBwYXRoID0gaWNvblBhdGgudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcudGV4JywgJy5wbmcnKTtcclxuICByZXR1cm4gYCR7R0FNRV9CQVNFfS8ke3BhdGh9YDtcclxufVxyXG4iLCIvLyBQaXZvdFRGVCAtIFNldCAxNyBjaGFtcGlvbnMgKGRhdGEgc291cmNlZCBmcm9tIENvbW11bml0eURyYWdvbiBlbl91cy5qc29uKVxuLy8gaHR0cHM6Ly9yYXcuY29tbXVuaXR5ZHJhZ29uLm9yZy9sYXRlc3QvY2RyYWdvbi90ZnQvZW5fdXMuanNvblxuXG5pbXBvcnQgeyBDaGFtcGlvbiB9IGZyb20gJy4uLy4uL21vZGVscy90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBjaGFtcGlvbnM6IENoYW1waW9uW10gPSBbXG4gIC8vID09PT09IDEtQ29zdCAoMTQpID09PT09XG4gIHsgaWQ6ICdURlQxN19BYXRyb3gnLCBuYW1lOiBcIkFhdHJveFwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnTi5PLlYuQS4nLCAnQmFzdGlvbiddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0FhdHJveC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19BYXRyb3hfc3BsYXNoX3RpbGVfMzAuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0JyaWFyJywgbmFtZTogXCJCcmlhclwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnQW5pbWEnLCAnUHJpbW9yZGlhbicsICdSb2d1ZSddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0JyaWFyL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0JyaWFyX3NwbGFzaF90aWxlXzEwLlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19DYWl0bHluJywgbmFtZTogXCJDYWl0bHluXCIsIGNvc3Q6IDEsIHRyYWl0czogWydOLk8uVi5BLicsICdGYXRld2VhdmVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQ2FpdGx5bi9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19DYWl0bHluX3NwbGFzaF90aWxlXzQ4LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19DaG9nYXRoJywgbmFtZTogXCJDaG8nR2F0aFwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnRGFyayBTdGFyJywgJ0JyYXdsZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19DaG9nYXRoL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0Nob2dhdGhfc3BsYXNoX3RpbGVfNy5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfRXpyZWFsJywgbmFtZTogXCJFenJlYWxcIiwgY29zdDogMSwgdHJhaXRzOiBbJ1RpbWVicmVha2VyJywgJ1NuaXBlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0V6cmVhbC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19FenJlYWxfc3BsYXNoX3RpbGVfNS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfTGVvbmEnLCBuYW1lOiBcIkxlb25hXCIsIGNvc3Q6IDEsIHRyYWl0czogWydBcmJpdGVyJywgJ1Zhbmd1YXJkJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTGVvbmEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTGVvbmFfc3BsYXNoX3RpbGVfNjQuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0xpc3NhbmRyYScsIG5hbWU6IFwiTGlzc2FuZHJhXCIsIGNvc3Q6IDEsIHRyYWl0czogWydEYXJrIFN0YXInLCAnU2hlcGhlcmQnLCAnUmVwbGljYXRvciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0xpc3NhbmRyYS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19MaXNzYW5kcmFfc3BsYXNoX3RpbGVfMTIuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X05hc3VzJywgbmFtZTogXCJOYXN1c1wiLCBjb3N0OiAxLCB0cmFpdHM6IFsnU3BhY2UgR3Jvb3ZlJywgJ1Zhbmd1YXJkJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTmFzdXMvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTmFzdXNfc3BsYXNoX3RpbGVfMjUuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X1BvcHB5JywgbmFtZTogXCJQb3BweVwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnTWVlcGxlJywgJ0Jhc3Rpb24nXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Qb3BweS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Qb3BweV9zcGxhc2hfdGlsZV8xNi5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfUmVrU2FpJywgbmFtZTogXCJSZWsnU2FpXCIsIGNvc3Q6IDEsIHRyYWl0czogWydQcmltb3JkaWFuJywgJ0JyYXdsZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19SZWtTYWkvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfUmVrU2FpX3NwbGFzaF90aWxlXzI2LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19UYWxvbicsIG5hbWU6IFwiVGFsb25cIiwgY29zdDogMSwgdHJhaXRzOiBbJ1N0YXJnYXplcicsICdSb2d1ZSddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1RhbG9uL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1RhbG9uX3NwbGFzaF90aWxlXzM5LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19UZWVtbycsIG5hbWU6IFwiVGVlbW9cIiwgY29zdDogMSwgdHJhaXRzOiBbJ1NwYWNlIEdyb292ZScsICdTaGVwaGVyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1RlZW1vL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1RlZW1vX3NwbGFzaF90aWxlXzQ3LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19Ud2lzdGVkRmF0ZScsIG5hbWU6IFwiVHdpc3RlZCBGYXRlXCIsIGNvc3Q6IDEsIHRyYWl0czogWydTdGFyZ2F6ZXInLCAnRmF0ZXdlYXZlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1R3aXN0ZWRGYXRlL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1R3aXN0ZWRGYXRlX3NwbGFzaF90aWxlXzQ1LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19WZWlnYXInLCBuYW1lOiBcIlZlaWdhclwiLCBjb3N0OiAxLCB0cmFpdHM6IFsnTWVlcGxlJywgJ1JlcGxpY2F0b3InXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19WZWlnYXIvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfVmVpZ2FyX3NwbGFzaF90aWxlXzMyLlRGVF9TZXQxNy5wbmcnIH0sXG5cbiAgLy8gPT09PT0gMi1Db3N0ICgxMikgPT09PT1cbiAgeyBpZDogJ1RGVDE3X0FrYWxpJywgbmFtZTogXCJBa2FsaVwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnTi5PLlYuQS4nLCAnTWFyYXVkZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19Ba2FsaS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Ba2FsaV9zcGxhc2hfdGlsZV82OC5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfQmVsdmV0aCcsIG5hbWU6IFwiQmVsJ1ZldGhcIiwgY29zdDogMiwgdHJhaXRzOiBbJ1ByaW1vcmRpYW4nLCAnQ2hhbGxlbmdlcicsICdNYXJhdWRlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0JlbHZldGgvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfQmVsdmV0aF9zcGxhc2hfdGlsZV8xOS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfR25hcicsIG5hbWU6IFwiR25hclwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnTWVlcGxlJywgJ1NuaXBlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0duYXIvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfR25hcl9zcGxhc2hfdGlsZV8xNS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfR3JhZ2FzJywgbmFtZTogXCJHcmFnYXNcIiwgY29zdDogMiwgdHJhaXRzOiBbJ1BzaW9uaWMnLCAnQnJhd2xlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0dyYWdhcy9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19HcmFnYXNfc3BsYXNoX3RpbGVfMTAuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0d3ZW4nLCBuYW1lOiBcIkd3ZW5cIiwgY29zdDogMiwgdHJhaXRzOiBbJ1NwYWNlIEdyb292ZScsICdSb2d1ZSddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0d3ZW4vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfR3dlbl9zcGxhc2hfdGlsZV8xLlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19KYXgnLCBuYW1lOiBcIkpheFwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnU3RhcmdhemVyJywgJ0Jhc3Rpb24nXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19KYXgvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfSmF4X01vYmlsZS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfSmlueCcsIG5hbWU6IFwiSmlueFwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnQW5pbWEnLCAnQ2hhbGxlbmdlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0ppbngvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfSmlueF9zcGxhc2hfdGlsZV8zOC5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfTWlsaW8nLCBuYW1lOiBcIk1pbGlvXCIsIGNvc3Q6IDIsIHRyYWl0czogWydUaW1lYnJlYWtlcicsICdGYXRld2VhdmVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTWlsaW8vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTWlsaW9fc3BsYXNoX3RpbGVfMC5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfTW9yZGVrYWlzZXInLCBuYW1lOiBcIk1vcmRla2Fpc2VyXCIsIGNvc3Q6IDIsIHRyYWl0czogWydEYXJrIFN0YXInLCAnQ29uZHVpdCcsICdWYW5ndWFyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X01vcmRla2Fpc2VyL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X01vcmRla2Fpc2VyX3NwbGFzaF90aWxlXzYuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X1BhbnRoZW9uJywgbmFtZTogXCJQYW50aGVvblwiLCBjb3N0OiAyLCB0cmFpdHM6IFsnVGltZWJyZWFrZXInLCAnQnJhd2xlcicsICdSZXBsaWNhdG9yJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfUGFudGhlb24vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfUGFudGhlb25fc3BsYXNoX3RpbGVfMTYuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X1B5a2UnLCBuYW1lOiBcIlB5a2VcIiwgY29zdDogMiwgdHJhaXRzOiBbJ1BzaW9uaWMnLCAnVm95YWdlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1B5a2UvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfUHlrZV9zcGxhc2hfdGlsZV8yNS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfWm9lJywgbmFtZTogXCJab2VcIiwgY29zdDogMiwgdHJhaXRzOiBbJ0FyYml0ZXInLCAnQ29uZHVpdCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1pvZS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19ab2Vfc3BsYXNoX3RpbGVfNDMuVEZUX1NldDE3LnBuZycgfSxcblxuICAvLyA9PT09PSAzLUNvc3QgKDEzKSA9PT09PVxuICB7IGlkOiAnVEZUMTdfQXVyb3JhJywgbmFtZTogXCJBdXJvcmFcIiwgY29zdDogMywgdHJhaXRzOiBbJ0FuaW1hJywgJ1ZveWFnZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19BdXJvcmEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfQXVyb3JhX3NwbGFzaF90aWxlXzEuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0RpYW5hJywgbmFtZTogXCJEaWFuYVwiLCBjb3N0OiAzLCB0cmFpdHM6IFsnQXJiaXRlcicsICdDaGFsbGVuZ2VyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfRGlhbmEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfRGlhbmFTcGxhc2hfTW9iaWxlLlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19GaXp6JywgbmFtZTogXCJGaXp6XCIsIGNvc3Q6IDMsIHRyYWl0czogWydNZWVwbGUnLCAnUm9ndWUnXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19GaXp6L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0Zpenpfc3BsYXNoX3RpbGVfMjYuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0lsbGFvaScsIG5hbWU6IFwiSWxsYW9pXCIsIGNvc3Q6IDMsIHRyYWl0czogWydBbmltYScsICdWYW5ndWFyZCcsICdTaGVwaGVyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0lsbGFvaS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19JbGxhb2lfc3BsYXNoX3RpbGVfMjcuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0thaXNhJywgbmFtZTogXCJLYWknU2FcIiwgY29zdDogMywgdHJhaXRzOiBbJ0RhcmsgU3RhcicsICdSb2d1ZSddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0thaXNhL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0thaXNhX3NwbGFzaF90aWxlXzY5LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19MdWx1JywgbmFtZTogXCJMdWx1XCIsIGNvc3Q6IDMsIHRyYWl0czogWydTdGFyZ2F6ZXInLCAnUmVwbGljYXRvciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0x1bHUvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTHVsdV9zcGxhc2hfdGlsZV8xNC5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfTWFva2FpJywgbmFtZTogXCJNYW9rYWlcIiwgY29zdDogMywgdHJhaXRzOiBbJ04uTy5WLkEuJywgJ0JyYXdsZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19NYW9rYWkvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTWFva2FpX3NwbGFzaF90aWxlXzMzLlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19NaXNzRm9ydHVuZScsIG5hbWU6IFwiTWlzcyBGb3J0dW5lXCIsIGNvc3Q6IDMsIHRyYWl0czogWydHdW4gR29kZGVzcyddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X01pc3NGb3J0dW5lL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X01pc3NGb3J0dW5lX3NwbGFzaF90aWxlXzE2LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19Pcm5uJywgbmFtZTogXCJPcm5uXCIsIGNvc3Q6IDMsIHRyYWl0czogWydTcGFjZSBHcm9vdmUnLCAnQmFzdGlvbiddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X09ybm4vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfT3Jubl9zcGxhc2hfdGlsZV8xMS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfUmhhYXN0JywgbmFtZTogXCJSaGFhc3RcIiwgY29zdDogMywgdHJhaXRzOiBbJ1JlZGVlbWVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfUmhhYXN0L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0theW5TcGxhc2hfVGlsZS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfU2FtaXJhJywgbmFtZTogXCJTYW1pcmFcIiwgY29zdDogMywgdHJhaXRzOiBbJ1NwYWNlIEdyb292ZScsICdTbmlwZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19TYW1pcmEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfU2FtaXJhX3NwbGFzaF90aWxlXzEwLlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19VcmdvdCcsIG5hbWU6IFwiVXJnb3RcIiwgY29zdDogMywgdHJhaXRzOiBbJ01lY2hhJywgJ0JyYXdsZXInLCAnTWFyYXVkZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19VcmdvdC9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19VcmdvdF9zcGxhc2hfdGlsZV8zMi5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfVmlrdG9yJywgbmFtZTogXCJWaWt0b3JcIiwgY29zdDogMywgdHJhaXRzOiBbJ1BzaW9uaWMnLCAnQ29uZHVpdCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1Zpa3Rvci9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19WaWt0b3Jfc3BsYXNoX3RpbGVfNS5URlRfU2V0MTcucG5nJyB9LFxuXG4gIC8vID09PT09IDQtQ29zdCAoMTMpID09PT09XG4gIHsgaWQ6ICdURlQxN19BdXJlbGlvblNvbCcsIG5hbWU6IFwiQXVyZWxpb24gU29sXCIsIGNvc3Q6IDQsIHRyYWl0czogWydNZWNoYScsICdDb25kdWl0J10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQXVyZWxpb25Tb2wvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfQXVyZWxpb25Tb2xfc3BsYXNoX3RpbGVfMi5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfQ29ya2knLCBuYW1lOiBcIkNvcmtpXCIsIGNvc3Q6IDQsIHRyYWl0czogWydNZWVwbGUnLCAnRmF0ZXdlYXZlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0NvcmtpL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0NvcmtpX3NwbGFzaF90aWxlXzI2LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19LYXJtYScsIG5hbWU6IFwiS2FybWFcIiwgY29zdDogNCwgdHJhaXRzOiBbJ0RhcmsgU3RhcicsICdWb3lhZ2VyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfS2FybWEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfS2FybWFfc3BsYXNoX3RpbGVfOC5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfS2luZHJlZCcsIG5hbWU6IFwiS2luZHJlZFwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnTi5PLlYuQS4nLCAnQ2hhbGxlbmdlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0tpbmRyZWQvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfS2luZHJlZF9zcGxhc2hfdGlsZV8yMy5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfTGVibGFuYycsIG5hbWU6IFwiTGVCbGFuY1wiLCBjb3N0OiA0LCB0cmFpdHM6IFsnQXJiaXRlcicsICdTaGVwaGVyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0xlYmxhbmMvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTGVibGFuY19zcGxhc2hfdGlsZV8yOS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfTWFzdGVyWWknLCBuYW1lOiBcIk1hc3RlciBZaVwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnUHNpb25pYycsICdNYXJhdWRlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X01hc3RlcllpL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X01hc3RlcllpX3NwbGFzaF90aWxlXzMzLlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19OYW1pJywgbmFtZTogXCJOYW1pXCIsIGNvc3Q6IDQsIHRyYWl0czogWydTcGFjZSBHcm9vdmUnLCAnUmVwbGljYXRvciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X05hbWkvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTmFtaV9zcGxhc2hfdGlsZV80MS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfTnVudScsIG5hbWU6IFwiTnVudSAmIFdpbGx1bXBcIiwgY29zdDogNCwgdHJhaXRzOiBbJ1N0YXJnYXplcicsICdWYW5ndWFyZCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X051bnUvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfTnVudV9zcGxhc2hfdGlsZV8zNS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfUmFtbXVzJywgbmFtZTogXCJSYW1tdXNcIiwgY29zdDogNCwgdHJhaXRzOiBbJ01lZXBsZScsICdCYXN0aW9uJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfUmFtbXVzL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1JhbW11c19zcGxhc2hfdGlsZV8xNy5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfUml2ZW4nLCBuYW1lOiBcIlJpdmVuXCIsIGNvc3Q6IDQsIHRyYWl0czogWydUaW1lYnJlYWtlcicsICdSb2d1ZSddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X1JpdmVuL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1JpdmVuX3NwbGFzaF90aWxlXzE4LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19UYWhtS2VuY2gnLCBuYW1lOiBcIlRhaG0gS2VuY2hcIiwgY29zdDogNCwgdHJhaXRzOiBbJ09yYWNsZScsICdCcmF3bGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfVGFobUtlbmNoL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X1RhaG1LZW5jaF9zcGxhc2hfdGlsZV8xMS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfR2FsaW8nLCBuYW1lOiBcIlRoZSBNaWdodHkgTWVjaFwiLCBjb3N0OiA0LCB0cmFpdHM6IFsnTWVjaGEnLCAnVm95YWdlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0dhbGlvL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X0dhbGlvX01vYmlsZS5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfWGF5YWgnLCBuYW1lOiBcIlhheWFoXCIsIGNvc3Q6IDQsIHRyYWl0czogWydTdGFyZ2F6ZXInLCAnU25pcGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfWGF5YWgvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfWGF5YWhfc3BsYXNoX3RpbGVfMS5URlRfU2V0MTcucG5nJyB9LFxuXG4gIC8vID09PT09IDUtQ29zdCAoMTApID09PT09XG4gIHsgaWQ6ICdURlQxN19CYXJkJywgbmFtZTogXCJCYXJkXCIsIGNvc3Q6IDUsIHRyYWl0czogWydNZWVwbGUnLCAnQ29uZHVpdCddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0JhcmQvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfQmFyZF9zcGxhc2hfdGlsZV84LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19CbGl0emNyYW5rJywgbmFtZTogXCJCbGl0emNyYW5rXCIsIGNvc3Q6IDUsIHRyYWl0czogWydQYXJ0eSBBbmltYWwnLCAnU3BhY2UgR3Jvb3ZlJywgJ1Zhbmd1YXJkJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfQmxpdHpjcmFuay9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19CbGl0emNyYW5rX3NwbGFzaF90aWxlXzY1LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19GaW9yYScsIG5hbWU6IFwiRmlvcmFcIiwgY29zdDogNSwgdHJhaXRzOiBbJ0RpdmluZSBEdWVsaXN0JywgJ0FuaW1hJywgJ01hcmF1ZGVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfRmlvcmEvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfRmlvcmFfc3BsYXNoX3RpbGVfNTEuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0dyYXZlcycsIG5hbWU6IFwiR3JhdmVzXCIsIGNvc3Q6IDUsIHRyYWl0czogWydGYWN0b3J5IE5ldyddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0dyYXZlcy9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19HcmF2ZXNfc3BsYXNoX3RpbGVfMTguVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X0poaW4nLCBuYW1lOiBcIkpoaW5cIiwgY29zdDogNSwgdHJhaXRzOiBbJ0RhcmsgU3RhcicsICdFcmFkaWNhdG9yJywgJ1NuaXBlciddLCB0aWxlSWNvbjogJ0FTU0VUUy9DaGFyYWN0ZXJzL1RGVDE3X0poaW4vU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfSmhpbl9zcGxhc2hfdGlsZV8zNy5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfTW9yZ2FuYScsIG5hbWU6IFwiTW9yZ2FuYVwiLCBjb3N0OiA1LCB0cmFpdHM6IFsnRGFyayBMYWR5J10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfTW9yZ2FuYS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Nb3JnYW5hX3NwbGFzaF90aWxlXzUwLlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19TaGVuJywgbmFtZTogXCJTaGVuXCIsIGNvc3Q6IDUsIHRyYWl0czogWydCdWx3YXJrJywgJ0Jhc3Rpb24nXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19TaGVuL1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X3NoZW5fc3BsYXNoX3RpbGVfNDkuVEZUX1NldDE3LnBuZycgfSxcbiAgeyBpZDogJ1RGVDE3X1NvbmEnLCBuYW1lOiBcIlNvbmFcIiwgY29zdDogNSwgdHJhaXRzOiBbJ0NvbW1hbmRlcicsICdQc2lvbmljJywgJ1NoZXBoZXJkJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfU29uYS9Ta2lucy9CYXNlL0ltYWdlcy9URlQxN19Tb25hX3NwbGFzaF90aWxlXzE3LlRGVF9TZXQxNy5wbmcnIH0sXG4gIHsgaWQ6ICdURlQxN19WZXgnLCBuYW1lOiBcIlZleFwiLCBjb3N0OiA1LCB0cmFpdHM6IFsnRG9vbWVyJ10sIHRpbGVJY29uOiAnQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfVmV4L1NraW5zL0Jhc2UvSW1hZ2VzL1RGVDE3X3ZleF9zcGxhc2hfdGlsZV8xMC5URlRfU2V0MTcucG5nJyB9LFxuICB7IGlkOiAnVEZUMTdfWmVkJywgbmFtZTogXCJaZWRcIiwgY29zdDogNSwgdHJhaXRzOiBbJ0dhbGF4eSBIdW50ZXInXSwgdGlsZUljb246ICdBU1NFVFMvQ2hhcmFjdGVycy9URlQxN19aZWQvU2tpbnMvQmFzZS9JbWFnZXMvVEZUMTdfWmVkX3NwbGFzaF90aWxlXzY4LlRGVF9TZXQxNy5wbmcnIH0sXG5cbl07XG5cbmV4cG9ydCBjb25zdCBjaGFtcGlvbk1hcCA9IG5ldyBNYXAoY2hhbXBpb25zLm1hcChjID0+IFtjLmlkLCBjXSkpO1xuXG5leHBvcnQgY29uc3QgZ2V0Q2hhbXBpb25zQnlDb3N0ID0gKGNvc3Q6IG51bWJlcikgPT5cbiAgY2hhbXBpb25zLmZpbHRlcihjID0+IGMuY29zdCA9PT0gY29zdCk7XG5cbmV4cG9ydCBjb25zdCBnZXRDaGFtcGlvbnNCeVRyYWl0ID0gKHRyYWl0OiBzdHJpbmcpID0+XG4gIGNoYW1waW9ucy5maWx0ZXIoYyA9PiBjLnRyYWl0cy5pbmNsdWRlcyh0cmFpdCkpO1xuIiwiLy8gUGl2b3RURlQgLSBTZXQgMTcgbWV0YSBjb21wb3NpdGlvbnNcclxuLy8gQ2hhbXBpb24gSURzIGFuZCB0cmFpdHMgc291cmNlZCBmcm9tIENvbW11bml0eURyYWdvbiBTZXQgMTcgZGF0YS5cclxuLy8gTk9URTogdGllciByYW5raW5ncyBhbmQgaXRlbSBidWlsZHMgYXJlIGF1dGhvciBwbGFjZWhvbGRlcnMgcGVuZGluZyBsaXZlXHJcbi8vIHBhdGNoIGRhdGE7IHRoZSB1bml0cywgY29zdHMsIGFuZCB0cmFpdHMgcmVmZXJlbmNlZCBoZXJlIGFyZSByZWFsLlxyXG5cclxuaW1wb3J0IHsgQ29tcCB9IGZyb20gJy4uLy4uL21vZGVscy90eXBlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgbWV0YUNvbXBzOiBDb21wW10gPSBbXHJcbiAgLy8gPT09PT0gUyBUSUVSID09PT09XHJcbiAge1xyXG4gICAgaWQ6ICdtb3JnYW5hLWRhcmstbGFkeScsXHJcbiAgICBuYW1lOiAnTW9yZ2FuYSBEYXJrIExhZHknLFxyXG4gICAgdGllcjogJ1MnLFxyXG4gICAgcGxheXN0eWxlOiAnRmFzdCA5JyxcclxuICAgIGRpZmZpY3VsdHk6ICdIYXJkJyxcclxuICAgIGxldmVsOiA5LFxyXG4gICAgdW5pdHM6IFtcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZ2FuYScsICAgICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAyLCBpdGVtczogWydyYWJhZG9ucy1kZWF0aGNhcCcsICdqZXdlbGVkLWdhdW50bGV0JywgJ2hleHRlY2gtZ3VuYmxhZGUnXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIsIGl0ZW1zOiBbJ2JsdWUtYnVmZiddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X01vcmRla2Fpc2VyJywgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19MaXNzYW5kcmEnLCAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfSmhpbicsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1ZleCcsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Nb3JkZWthaXNlcicsIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfU2hlbicsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydEYXJrIExhZHknLCAnRGFyayBTdGFyJ10sXHJcbiAgICBkZXNjcmlwdGlvbjogJ01vcmdhbmEgc29sby1jYXJyaWVzIHdpdGggRGFyayBTdGFyIHN1cHBvcnRpbmcgY2FzdC4gVW5jYXAgYm9hcmQgYXQgTHY5IGZvciBKaGluL1ZleCBzZWNvbmRhcnkgQVAuJyxcclxuICAgIGVhcmx5R2FtZTogJ0xpc3NhbmRyYSArIE1vcmRla2Fpc2VyIG9wZW5lciBmb3IgRGFyayBTdGFyIDIuIEVjb24gdG8gNTAsIHB1c2ggOCBvbiA0LTIuJyxcclxuICAgIG1pZEdhbWU6ICdTdGFiaWxpemUgYXQgTHY3IG9uIDQtMSDigJQgZmluZCBLYXJtYSAyIGFuZCBjb21wbGV0ZSBSYWJhZG9uXFwncyBvbiBNb3JnYW5hLicsXHJcbiAgICBsYXRlR2FtZTogJ1B1c2ggTHY5IG9uIDUtMSBhbmQgc2xvdyByb2xsIGZvciBNb3JnYW5hIDIg4oCUIHVuY2FwIHdpdGggSmhpbiBhbmQgVmV4LicsXHJcbiAgICB0aXBzOiAnTW9yZ2FuYSB3YW50cyBBUC9kdXJhYmlsaXR5LiBQb3NpdGlvbiBiZWhpbmQgU2hlbiBmb3IgdGhlIGJ1bHdhcmsgc2hpZWxkLicsXHJcbiAgICByZWNvbW1lbmRlZEF1Z21lbnRzOiBbJ1RGVDEzX0F1Z21lbnRfU29yY2VyZXJDcm93bicsICdURlQ2X0F1Z21lbnRfUGFuZG9yYXNJdGVtcycsICdURlQ2X0F1Z21lbnRfQXNjZW5zaW9uJ11cclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAnamhpbi1kYXJrLXN0YXItc25pcGVycycsXHJcbiAgICBuYW1lOiAnSmhpbiBEYXJrIFN0YXIgU25pcGVycycsXHJcbiAgICB0aWVyOiAnUycsXHJcbiAgICBwbGF5c3R5bGU6ICdGYXN0IDgnLFxyXG4gICAgZGlmZmljdWx0eTogJ01lZGl1bScsXHJcbiAgICBsZXZlbDogOCxcclxuICAgIHVuaXRzOiBbXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0poaW4nLCAgICAgICAgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDIsIGl0ZW1zOiBbJ2luZmluaXR5LWVkZ2UnLCAnbGFzdC13aGlzcGVyJywgJ2dpYW50LXNsYXllciddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1hheWFoJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIsIGl0ZW1zOiBbJ2d1aW5zb29zLXJhZ2VibGFkZSddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0V6cmVhbCcsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfR25hcicsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0xpc3NhbmRyYScsICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZGVrYWlzZXInLCAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19TaGVuJywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydEYXJrIFN0YXInLCAnRXJhZGljYXRvcicsICdTbmlwZXInXSxcclxuICAgIGRlc2NyaXB0aW9uOiAnU25pcGVyIGxpbmUgYmFja2VkIGJ5IERhcmsgU3RhciBkYW1hZ2UgYW1wLiBKaGluIG9uZS1zaG90cyBiYWNrbGluZSBjYXJyaWVzIG9uIGhpcyBmb3VydGggc2hvdC4nLFxyXG4gICAgZWFybHlHYW1lOiAnRXpyZWFsICsgR25hciBlYXJseSBTbmlwZXIgdHJhaXQuIFNsYW0gSUUgb24gSmhpbiBob2xkZXIuJyxcclxuICAgIG1pZEdhbWU6ICdTdGFiaWxpemUgYXQgTHY3IGJ5IDQtMSDigJQgaG9sZCBKaGluIGFuZCBYYXlhaCBwYWlycywgY29tcGxldGUgTGFzdCBXaGlzcGVyLicsXHJcbiAgICBsYXRlR2FtZTogJ1B1c2ggTHY4IG9uIDQtMiBhbmQgc2xvdyByb2xsIOKAlCBTbmlwZXIgNCArIEthcm1hIGJvb3N0IGNsb3NlcyBvdXQgdGhlIGxvYmJ5LicsXHJcbiAgICB0aXBzOiAnU3RhY2sgU25pcGVycyBpbiB0aGUgc2FtZSBjb2x1bW4uIEthcm1hIGJvb3N0cyB0aGUgbGluZSBmb3IgY3JpdCArIEFQIHN5bmVyZ3kuJyxcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUMTNfQXVnbWVudF9TbmlwZXInLCAnVEZUMTNfQXVnbWVudF9TbmlwZXJDcm93bicsICdURlQ2X0F1Z21lbnRfQXNjZW5zaW9uJ11cclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAneGF5YWgtc3RhcmdhemVyJyxcclxuICAgIG5hbWU6ICdYYXlhaCBTdGFyZ2F6ZXInLFxyXG4gICAgdGllcjogJ1MnLFxyXG4gICAgcGxheXN0eWxlOiAnRmFzdCA4JyxcclxuICAgIGRpZmZpY3VsdHk6ICdNZWRpdW0nLFxyXG4gICAgbGV2ZWw6IDgsXHJcbiAgICB1bml0czogW1xyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19YYXlhaCcsICAgICAgICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAyLCBpdGVtczogWydpbmZpbml0eS1lZGdlJywgJ2xhc3Qtd2hpc3BlcicsICdydW5hYW5zLWh1cnJpY2FuZSddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0x1bHUnLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfSmF4JywgICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Ud2lzdGVkRmF0ZScsICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1RhbG9uJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQ2FpdGx5bicsICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19NaWxpbycsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X051bnUnLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgIF0sXHJcbiAgICBjb3JlVHJhaXRzOiBbJ1N0YXJnYXplcicsICdTbmlwZXInLCAnQmFzdGlvbiddLFxyXG4gICAgZGVzY3JpcHRpb246ICdTdGFyZ2F6ZXIgY29uc3RlbGxhdGlvbiBidWZmcyBYYXlhaCB3aGlsZSBKYXggdGFua3MuIE51bnUgaG9sZHMgdGhlIFN0YXJnYXplciA0LWNvc3Qgc2xvdC4nLFxyXG4gICAgZWFybHlHYW1lOiAnT3BlbiB3aXRoIFRGICsgVGFsb24gKyBDYWl0bHluIGZvciBTdGFyZ2F6ZXIgMy4gRWNvbiBmb3IgWGF5YWguJyxcclxuICAgIG1pZEdhbWU6ICdTdGFiaWxpemUgTHY3IG9uIDQtMSDigJQgZmluZCBYYXlhaCBjb3BpZXMsIGZpbmlzaCBJRSwgYW5kIHNsYW0gSmF4IGZyb250bGluZS4nLFxyXG4gICAgbGF0ZUdhbWU6ICdQdXNoIEx2OCBvbiA0LTIgYW5kIHNsb3cgcm9sbCBmb3IgWGF5YWggMiArIEx1bHUvTnVudSB0byBoaXQgU3RhcmdhemVyIDUuJyxcclxuICAgIHRpcHM6ICdTdGFyZ2F6ZXIgNSBpcyB0aGUgc3Bpa2UgaWYgeW91IGZpbmQgTHVsdSBhbmQgTnVudS4gUG9zaXRpb24gWGF5YWggYmFjay1jb3JuZXIuJyxcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUMTNfQXVnbWVudF9TbmlwZXJDcmVzdCcsICdURlQ2X0F1Z21lbnRfQXNjZW5zaW9uJywgJ1RGVDEwX0F1Z21lbnRfQmlnR2FpbnMnXVxyXG4gIH0sXHJcblxyXG4gIC8vID09PT09IEEgVElFUiA9PT09PVxyXG4gIHtcclxuICAgIGlkOiAncHJpbW9yZGlhbi1yZXJvbGwnLFxyXG4gICAgbmFtZTogJ1ByaW1vcmRpYW4gUmVyb2xsJyxcclxuICAgIHRpZXI6ICdBJyxcclxuICAgIHBsYXlzdHlsZTogJ1Jlcm9sbCcsXHJcbiAgICBkaWZmaWN1bHR5OiAnRWFzeScsXHJcbiAgICBsZXZlbDogNixcclxuICAgIHVuaXRzOiBbXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1Jla1NhaScsICAgICAgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDMsIGl0ZW1zOiBbJ3RpdGFucy1yZXNvbHZlJywgJ2Jsb29kdGhpcnN0ZXInLCAnd2FybW9ncy1hcm1vciddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0JlbHZldGgnLCAgICAgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDMsIGl0ZW1zOiBbJ2d1aW5zb29zLXJhZ2VibGFkZScsICdydW5hYW5zLWh1cnJpY2FuZScsICdnaWFudC1zbGF5ZXInXSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19CcmlhcicsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAzIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X01hb2thaScsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfSWxsYW9pJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19BdXJvcmEnLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydQcmltb3JkaWFuJywgJ0FuaW1hJywgJ0JyYXdsZXInXSxcclxuICAgIGRlc2NyaXB0aW9uOiBcIlJlcm9sbCBMdjYgZm9yIDMtc3RhciBSZWsnU2FpIGFuZCBCZWwnVmV0aC4gUHJpbW9yZGlhbiBCcmF3bGVycyBzdGF0LWNoZWNrIGVuZW1pZXMuXCIsXHJcbiAgICBlYXJseUdhbWU6ICdCdXkgZXZlcnkgUmVrXFwnU2FpLCBCZWxcXCdWZXRoLCBCcmlhciBmcm9tIFN0YWdlIDIuIFNsb3cgcm9sbCBhdCBMdjYuJyxcclxuICAgIG1pZEdhbWU6ICdTdGF5IEx2NiBvbiAzLTIg4oCUIHNsb3cgcm9sbCA1MGcgZG93biBmb3IgUmVrXFwnU2FpIDMsIEJlbFxcJ1ZldGggMywgYW5kIEJyaWFyIDMuJyxcclxuICAgIGxhdGVHYW1lOiAnT25jZSAzLXN0YXJzIGhpdCwgcHVzaCBMdjcgb24gNC0yIGZvciBBdXJvcmEgYW5kIGxvY2sgaW4gQW5pbWEgNC4nLFxyXG4gICAgdGlwczogXCJQcmlvcml0aXplIFJlaydTYWkgaXRlbXMgb24gY2Fyb3VzZWwuIEF1cm9yYSAyLXN0YXIgYWRkcyBBbmltYSB0cmFpdC5cIixcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUMTNfQXVnbWVudF9CcnVpc2VyJywgJ1RGVDEzX0F1Z21lbnRfQnJ1aXNlckNyb3duJywgJ1RGVDZfQXVnbWVudF9TYWx2YWdlQmluSFInXVxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6ICdtZWNoYS1hc29sJyxcclxuICAgIG5hbWU6ICdNZWNoYSBBdXJlbGlvbiBTb2wnLFxyXG4gICAgdGllcjogJ0EnLFxyXG4gICAgcGxheXN0eWxlOiAnRmFzdCA4JyxcclxuICAgIGRpZmZpY3VsdHk6ICdIYXJkJyxcclxuICAgIGxldmVsOiA4LFxyXG4gICAgdW5pdHM6IFtcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQXVyZWxpb25Tb2wnLCAgaXNDYXJyeTogdHJ1ZSwgIHN0YXJMZXZlbDogMiwgaXRlbXM6IFsnamV3ZWxlZC1nYXVudGxldCcsICdoZXh0ZWNoLWd1bmJsYWRlJywgJ3JhYmFkb25zLWRlYXRoY2FwJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfR2FsaW8nLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19VcmdvdCcsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1Zpa3RvcicsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfS2FybWEnLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19CYXJkJywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0JsaXR6Y3JhbmsnLCAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDEgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZGVrYWlzZXInLCAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgXSxcclxuICAgIGNvcmVUcmFpdHM6IFsnTWVjaGEnLCAnQ29uZHVpdCcsICdWYW5ndWFyZCddLFxyXG4gICAgZGVzY3JpcHRpb246ICdGdWxsIE1lY2hhIGZyb250bGluZSBwaWxvdCBBU29sLCBDb25kdWl0IGNoYWluIGZlZWRzIHRoZSB0ZWFtIG1hbmEuIENhcCBib2FyZCB3aXRoIEJhcmQgb3IgQmxpdHpjcmFuay4nLFxyXG4gICAgZWFybHlHYW1lOiAnVXJnb3QgKyBWaWt0b3IgZWFybHkgTWVjaGEuIFRyYW5zaXRpb24gdG8gQVNvbCArIEdhbGlvIGF0IEx2OC4nLFxyXG4gICAgbWlkR2FtZTogJ1N0YWJpbGl6ZSBhdCBMdjcgd2l0aCBNZWNoYSAzIOKAlCBlY29uIHRvIDUwZyBhbmQgcHJlcCBBU29sIGl0ZW1zLicsXHJcbiAgICBsYXRlR2FtZTogJ1B1c2ggTHY4IG9uIDQtMiwgZmluZCBBU29sIDIgYW5kIEdhbGlvIOKAlCBjYXAgd2l0aCBCYXJkIG9yIEJsaXR6Y3JhbmsgZm9yIENvbmR1aXQgY2hhaW4uJyxcclxuICAgIHRpcHM6ICdDb25kdWl0IG5lZWRzIGEgQ29uZHVpdCBwYWlyIHRvIGNoYWluLiBQYWlyIEFTb2wgd2l0aCBCYXJkIG9yIE1vcmRla2Fpc2VyLicsXHJcbiAgICByZWNvbW1lbmRlZEF1Z21lbnRzOiBbJ1RGVDEzX0F1Z21lbnRfU29yY2VyZXJDcm93bicsICdURlQ2X0F1Z21lbnRfUGFuZG9yYXNJdGVtcycsICdURlQxMF9BdWdtZW50X0JpZ0dhaW5zJ11cclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAnemVkLWdhbGF4eS1odW50ZXInLFxyXG4gICAgbmFtZTogJ1plZCBHYWxheHkgSHVudGVyJyxcclxuICAgIHRpZXI6ICdBJyxcclxuICAgIHBsYXlzdHlsZTogJ0Zhc3QgOScsXHJcbiAgICBkaWZmaWN1bHR5OiAnSGFyZCcsXHJcbiAgICBsZXZlbDogOSxcclxuICAgIHVuaXRzOiBbXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1plZCcsICAgICAgICAgIGlzQ2Fycnk6IHRydWUsICBzdGFyTGV2ZWw6IDIsIGl0ZW1zOiBbJ2luZmluaXR5LWVkZ2UnLCAnZWRnZS1vZi1uaWdodCcsICdibG9vZHRoaXJzdGVyJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfVGFsb24nLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Ba2FsaScsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0thaXNhJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfS2FybWEnLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Nb3JkZWthaXNlcicsICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0xpc3NhbmRyYScsICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfSmhpbicsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19TaGVuJywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydHYWxheHkgSHVudGVyJywgJ0RhcmsgU3RhcicsICdSb2d1ZSddLFxyXG4gICAgZGVzY3JpcHRpb246ICdaZWQgc29sbyBjYXJyeSB3aXRoIFJvZ3VlICsgRGFyayBTdGFyIGJhY2tsaW5lIHByZXNzdXJlLiBDYXAgYm9hcmQgYXQgTHY5LicsXHJcbiAgICBlYXJseUdhbWU6ICdMb3NzIHN0cmVhayBTdGFnZSAyLiBTdGFiaWxpemUgYXQgTHY3LCBwdXNoIDkgb24gNS0xLicsXHJcbiAgICBtaWRHYW1lOiAnTHY3IG9uIDQtMSB3aXRoIFRhbG9uICsgQWthbGkgUm9ndWUgMiDigJQgZWNvbiBmb3IgdGhlIEx2OC85IHB1c2ggYW5kIGNvbXBsZXRlIElFLicsXHJcbiAgICBsYXRlR2FtZTogJ1B1c2ggTHY4IG9uIDQtMiB0aGVuIDkgb24gNS0xIOKAlCBzbG93IHJvbGwgZm9yIFplZCAyIGFuZCBMaXNzYW5kcmEgMi4nLFxyXG4gICAgdGlwczogJ1plZCB3YW50cyBJRSArIHN1c3RhaW4uIEVkZ2Ugb2YgTmlnaHQgZ2l2ZXMgaGltIHRoZSBidXJzdCB3aW5kb3cuJyxcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUMTNfQXVnbWVudF9RdWlja3N0cmlrZXJDcm93bicsICdURlQ2X0F1Z21lbnRfQXNjZW5zaW9uJywgJ1RGVDEwX0F1Z21lbnRfQmlnR2FpbnMnXVxyXG4gIH0sXHJcblxyXG4gIC8vID09PT09IEIgVElFUiA9PT09PVxyXG4gIHtcclxuICAgIGlkOiAncHNpb25pYy1weWtlLXJlcm9sbCcsXHJcbiAgICBuYW1lOiAnUHNpb25pYyBQeWtlIFJlcm9sbCcsXHJcbiAgICB0aWVyOiAnQicsXHJcbiAgICBwbGF5c3R5bGU6ICdSZXJvbGwnLFxyXG4gICAgZGlmZmljdWx0eTogJ0Vhc3knLFxyXG4gICAgbGV2ZWw6IDYsXHJcbiAgICB1bml0czogW1xyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19QeWtlJywgICAgICAgICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAzLCBpdGVtczogWydpbmZpbml0eS1lZGdlJywgJ2VkZ2Utb2YtbmlnaHQnLCAnaGFuZC1vZi1qdXN0aWNlJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfR3JhZ2FzJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMyB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19WaWt0b3InLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X01hc3RlcllpJywgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfU29uYScsICAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMSB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICBdLFxyXG4gICAgY29yZVRyYWl0czogWydQc2lvbmljJywgJ1ZveWFnZXInLCAnTWFyYXVkZXInXSxcclxuICAgIGRlc2NyaXB0aW9uOiAnUmVyb2xsIGF0IEx2NiBmb3IgMy1zdGFyIFB5a2UuIFBzaW9uaWMgNCBpcyB0aGUgdGVhbSBzcGlrZSDigJQgU29uYSBjYXBzIGl0IGF0IDUuJyxcclxuICAgIGVhcmx5R2FtZTogJ0J1eSBldmVyeSBQeWtlICsgR3JhZ2FzICsgVmlrdG9yIGZyb20gU3RhZ2UgMi4nLFxyXG4gICAgbWlkR2FtZTogJ1N0YXkgTHY2IGZyb20gMy0yIOKAlCBzbG93IHJvbGwgZm9yIFB5a2UgMyBhbmQgR3JhZ2FzIDMsIGtlZXAgUHNpb25pYyA0IGFjdGl2ZS4nLFxyXG4gICAgbGF0ZUdhbWU6ICdBZnRlciAzLXN0YXJzIGhpdCwgcHVzaCBMdjcgZm9yIFNvbmEg4oCUIFBzaW9uaWMgNSBjbG9zZXMgb3V0IHRoZSBsb2JieS4nLFxyXG4gICAgdGlwczogJ1B5a2UganVtcHMgYmFja2xpbmU7IHBhaXIgd2l0aCBFZGdlIG9mIE5pZ2h0IGZvciBidXJzdCB3aW5kb3cuJyxcclxuICAgIHJlY29tbWVuZGVkQXVnbWVudHM6IFsnVEZUMTNfQXVnbWVudF9RdWlja3N0cmlrZXJDcm93bicsICdURlQ2X0F1Z21lbnRfU2FsdmFnZUJpbkhSJywgJ1RGVDZfQXVnbWVudF9Db21wb25lbnRHcmFiQmFnJ11cclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAnc29uYS1jb21tYW5kZXInLFxyXG4gICAgbmFtZTogJ1NvbmEgQ29tbWFuZGVyJyxcclxuICAgIHRpZXI6ICdCJyxcclxuICAgIHBsYXlzdHlsZTogJ0Zhc3QgOScsXHJcbiAgICBkaWZmaWN1bHR5OiAnTWVkaXVtJyxcclxuICAgIGxldmVsOiA5LFxyXG4gICAgdW5pdHM6IFtcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfU29uYScsICAgICAgICAgaXNDYXJyeTogdHJ1ZSwgIHN0YXJMZXZlbDogMiwgaXRlbXM6IFsnYmx1ZS1idWZmJywgJ2pld2VsZWQtZ2F1bnRsZXQnLCAnaGV4dGVjaC1ndW5ibGFkZSddIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X1RlZW1vJywgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTGlzc2FuZHJhJywgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19JbGxhb2knLCAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0xlYmxhbmMnLCAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfS2FybWEnLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19TaGVuJywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAxIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0JhcmQnLCAgICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDEgfSxcclxuICAgIF0sXHJcbiAgICBjb3JlVHJhaXRzOiBbJ0NvbW1hbmRlcicsICdTaGVwaGVyZCcsICdQc2lvbmljJ10sXHJcbiAgICBkZXNjcmlwdGlvbjogJ0hlYWwtYW5kLXNoaWVsZCBTaGVwaGVyZCBiYWNrYm9uZSB3aXRoIFNvbmEgYnJvYWRjYXN0aW5nIHRlYW0td2lkZSBidWZmcy4gU3Ryb25nIHZzIHN1c3RhaW5lZCBEUFMsIHdlYWsgdnMgYXNzYXNzaW5zLicsXHJcbiAgICBlYXJseUdhbWU6ICdPcGVuIFNoZXBoZXJkIDIgd2l0aCBUZWVtbyArIExpc3NhbmRyYS4gUHVzaCA4IG9uIDQtMi4nLFxyXG4gICAgbWlkR2FtZTogJ1N0YWJpbGl6ZSBMdjcgb24gNC0xIHdpdGggU2hlcGhlcmQgMyDigJQgZWNvbiBmb3IgdGhlIEx2OCBwdXNoLCBwcmVwIEJsdWUgQnVmZiBvbiBTb25hLicsXHJcbiAgICBsYXRlR2FtZTogJ1B1c2ggTHY4IG9uIDQtMiB0aGVuIDkgb24gNS0xIOKAlCBzbG93IHJvbGwgZm9yIFNvbmEgMiBhbmQgaGl0IFNoZXBoZXJkIDUuJyxcclxuICAgIHRpcHM6ICdTaGVwaGVyZCA1IGlzIHRoZSBzcGlrZS4gUG9zaXRpb24gU29uYSBiZWhpbmQgU2hlbiBmb3IgdGhlIEJ1bHdhcmsgc2hpZWxkLicsXHJcbiAgICByZWNvbW1lbmRlZEF1Z21lbnRzOiBbJ1RGVDZfQXVnbWVudF9QYW5kb3Jhc0l0ZW1zJywgJ1RGVDEwX0F1Z21lbnRfQmlnR2FpbnMnLCAnVEZUOV9BdWdtZW50X0xlYXJuaW5nRnJvbUV4cGVyaWVuY2UyJ11cclxuICB9LFxyXG5cclxuICAvLyA9PT09PSBDIFRJRVIgPT09PT1cclxuICB7XHJcbiAgICBpZDogJ2FuaW1hLWZpb3JhJyxcclxuICAgIG5hbWU6ICdBbmltYSBGaW9yYScsXHJcbiAgICB0aWVyOiAnQycsXHJcbiAgICBwbGF5c3R5bGU6ICdGYXN0IDgnLFxyXG4gICAgZGlmZmljdWx0eTogJ0hhcmQnLFxyXG4gICAgbGV2ZWw6IDgsXHJcbiAgICB1bml0czogW1xyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19GaW9yYScsICAgICAgICBpc0NhcnJ5OiB0cnVlLCAgc3RhckxldmVsOiAyLCBpdGVtczogWydpbmZpbml0eS1lZGdlJywgJ2Jsb29kdGhpcnN0ZXInLCAnbGFzdC13aGlzcGVyJ10gfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfQnJpYXInLCAgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19KaW54JywgICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0F1cm9yYScsICAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfSWxsYW9pJywgICAgICAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgICB7IGNoYW1waW9uSWQ6ICdURlQxN19Ba2FsaScsICAgICAgICBpc0NhcnJ5OiBmYWxzZSwgc3RhckxldmVsOiAyIH0sXHJcbiAgICAgIHsgY2hhbXBpb25JZDogJ1RGVDE3X0JlbHZldGgnLCAgICAgIGlzQ2Fycnk6IGZhbHNlLCBzdGFyTGV2ZWw6IDIgfSxcclxuICAgICAgeyBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZGVrYWlzZXInLCAgaXNDYXJyeTogZmFsc2UsIHN0YXJMZXZlbDogMiB9LFxyXG4gICAgXSxcclxuICAgIGNvcmVUcmFpdHM6IFsnQW5pbWEnLCAnRGl2aW5lIER1ZWxpc3QnLCAnTWFyYXVkZXInXSxcclxuICAgIGRlc2NyaXB0aW9uOiAnRmlvcmEgY2FycmllcyB3aXRoIEFuaW1hIGZyb250bGluZSBzdXBwb3J0LiBIaWdoIHZhcmlhbmNlIOKAlCBuZWVkcyBhIEZpb3JhIDItc3RhciBhbmQgQW5pbWEgNSBmb3IgdGhlIHNwaWtlLicsXHJcbiAgICBlYXJseUdhbWU6ICdCcmlhciArIEppbnggKyBBdXJvcmEgb3BlbmVyLiBTbGFtIGVhcmx5IGl0ZW1zIG9uIEZpb3JhIGhvbGRlci4nLFxyXG4gICAgbWlkR2FtZTogJ1N0YWJpbGl6ZSBhdCBMdjcgYnkgNC0xIOKAlCBob2xkIEZpb3JhIHBhaXJzIGFuZCBsb2NrIGluIHRoZSBBbmltYSBmcm9udGxpbmUuJyxcclxuICAgIGxhdGVHYW1lOiAnUHVzaCBMdjggb24gNC0yIGFuZCBzbG93IHJvbGwgZm9yIEZpb3JhIDIgYW5kIEFuaW1hIDUg4oCUIHRoZSBzcGlrZSB0aGF0IHdpbnMgZ2FtZXMuJyxcclxuICAgIHRpcHM6ICdGaW9yYSBuZWVkcyBJRSArIHN1c3RhaW4uIEFrYWxpICsgQmVsXFwnVmV0aCBnaXZlIHRoZSBNYXJhdWRlciBiYWNrbGluZS4nLFxyXG4gICAgcmVjb21tZW5kZWRBdWdtZW50czogWydURlQxM19BdWdtZW50X0NvbnF1ZXJvckNyb3duJywgJ1RGVDEzX0F1Z21lbnRfUGl0RmlnaHRlckNyb3duJywgJ1RGVDZfQXVnbWVudF9Bc2NlbnNpb24nXVxyXG4gIH0sXHJcbl07XHJcblxyXG4vLyBIZWxwZXI6IGdldCBjb21wcyBieSB0aWVyXHJcbmV4cG9ydCBjb25zdCBnZXRDb21wc0J5VGllciA9ICh0aWVyOiAnUycgfCAnQScgfCAnQicgfCAnQycgfCAnWCcpID0+XHJcbiAgbWV0YUNvbXBzLmZpbHRlcihjID0+IGMudGllciA9PT0gdGllcik7XHJcbiIsIi8vIFBpdm90VEZUIOKAlCBTZXQgMTcgXCJTcGFjZSBHb2RzXCIgSXRlbXMgRGF0YWJhc2UuIEF1dG8tZ2VuZXJhdGVkIGZyb20gY2RyYWdvbi5cclxuLy8gVG8gcmVnZW5lcmF0ZTogbm9kZSBzcmMvc2NyaXB0cy9leHRyYWN0SXRlbXMuanNcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gJy4uLy4uL21vZGVscy90eXBlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgY29tcG9uZW50cyA9IFtcclxuICB7XHJcbiAgICBcImlkXCI6IFwiY2hhaW4tdmVzdFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQ2hhaW4gVmVzdFwiLFxyXG4gICAgXCJzdGF0XCI6IFwiK0BBcm1vckAgQXJtb3JcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJlY3VydmUtYm93XCIsXHJcbiAgICBcIm5hbWVcIjogXCJSZWN1cnZlIEJvd1wiLFxyXG4gICAgXCJzdGF0XCI6IFwiK0BBU0AlIEF0dGFjayBTcGVlZFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwidGVhci1vZi1nb2RkZXNzXCIsXHJcbiAgICBcIm5hbWVcIjogXCJUZWFyIG9mIHRoZSBHb2RkZXNzXCIsXHJcbiAgICBcInN0YXRcIjogXCIrQE1hbmFSZWdlbkAgTWFuYSBSZWdlblwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwibmVnYXRyb24tY2xvYWtcIixcclxuICAgIFwibmFtZVwiOiBcIk5lZ2F0cm9uIENsb2FrXCIsXHJcbiAgICBcInN0YXRcIjogXCIrQE1hZ2ljUmVzaXN0QCBNYWdpYyBSZXNpc3RcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInNwYXJyaW5nLWdsb3Zlc1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiU3BhcnJpbmcgR2xvdmVzXCIsXHJcbiAgICBcInN0YXRcIjogXCIrQENyaXRDaGFuY2VAIENyaXRpY2FsIFN0cmlrZSBDaGFuY2VcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInNwYXR1bGFcIixcclxuICAgIFwibmFtZVwiOiBcIlNwYXR1bGFcIixcclxuICAgIFwic3RhdFwiOiBcIkl0IG11c3QgZG8gc29tZXRoaW5nLi4uXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJiZi1zd29yZFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQi5GLiBTd29yZFwiLFxyXG4gICAgXCJzdGF0XCI6IFwiK0BBRCoxMDBAJSBBdHRhY2sgRGFtYWdlXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJnaWFudHMtYmVsdFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiR2lhbnQncyBCZWx0XCIsXHJcbiAgICBcInN0YXRcIjogXCIrQEhlYWx0aEAgSGVhbHRoXCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJuZWVkbGVzc2x5LWxhcmdlLXJvZFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiTmVlZGxlc3NseSBMYXJnZSBSb2RcIixcclxuICAgIFwic3RhdFwiOiBcIitAQVBAIEFiaWxpdHkgUG93ZXJcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImZyeWluZy1wYW5cIixcclxuICAgIFwibmFtZVwiOiBcIkZyeWluZyBQYW5cIixcclxuICAgIFwic3RhdFwiOiBcIi4uLndoeSBlbHNlIHdvdWxkIGl0IGJlIGhlcmU/XCJcclxuICB9XHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgaXRlbXM6IEl0ZW1bXSA9IFtcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFiYWRvbnMtZGVhdGhjYXBcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX1JhYmFkb25zRGVhdGhjYXBcIixcclxuICAgIFwibmFtZVwiOiBcIlJhYmFkb24ncyBEZWF0aGNhcFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJuZWVkbGVzc2x5LWxhcmdlLXJvZFwiLFxyXG4gICAgICBcIm5lZWRsZXNzbHktbGFyZ2Utcm9kXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJUaGlzIGh1bWJsZSBoYXQgY2FuIGhlbHAgeW91IG1ha2UsIG9yIHVubWFrZSwgdGhlIHdvcmxkIGl0c2VsZi5AVEZUVW5pdFByb3BlcnR5LjpURlRfQXVnbWVudF9EZWFkbGllckNhcHNfVFJBS2V5QFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fUmFiYWRvbnNEZWF0aGNhcC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcnRpZmFjdC1leHBlcnQtbGljaC1iYW5lXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxNl9BdWdtZW50X0FydGlmYWN0RXhwZXJ0X0xpY2hCYW5lXCIsXHJcbiAgICBcIm5hbWVcIjogXCJBcnRpZmFjdCBFeHBlcnQ6IExpY2ggQmFuZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJHZXQgYSAyKiBTb25hICwgYSBMaWNoIEJhbmUsIGFuZCBhIFRlYXIgT2YgVGhlIEdvZGRlc3NcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy9IZXhjb3JlL01pc3NpbmctVDMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcnRpZmFjdC1leHBlcnQtbHVkZW5zLXRlbXBlc3RcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE2X0F1Z21lbnRfQXJ0aWZhY3RFeHBlcnRfTHVkZW5zVGVtcGVzdFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQXJ0aWZhY3QgRXhwZXJ0OiBMdWRlbidzIFRlbXBlc3RcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2V0IGEgMiogQ2FpdGx5biAsIGEgTHVkZW4ncyBUZW1wZXN0LCBhbmQgYSBSZWN1cnZlIEJvd1wiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0F1Z21lbnRzL0hleGNvcmUvTWlzc2luZy1UMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImFydGlmYWN0LWV4cGVydC1tYW5hemFuZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTZfQXVnbWVudF9BcnRpZmFjdEV4cGVydF9NYW5hemFuZVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQXJ0aWZhY3QgRXhwZXJ0OiBNYW5hemFuZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJHZXQgYSAyKiBBbml2aWEsIGEgTWFuYXphbmUgLCBhbmQgYSBUZWFyIE9mIFRoZSBHb2RkZXNzXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvSGV4Y29yZS9NaXNzaW5nLVQzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiYXJ0aWZhY3QtZXhwZXJ0LXpob255YXMtcGFyYWRveFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTZfQXVnbWVudF9BcnRpZmFjdEV4cGVydF9aaG9ueWFzUGFyYWRveFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQXJ0aWZhY3QgRXhwZXJ0OiBaaG9ueWEncyBQYXJhZG94XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdldCBhIDIqIE1pbGlvLCBhIFpob255YSdzIFBhcmFkb3gsIGFuZCBhIE5lZ2F0cm9uIENsb2FrXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvSGV4Y29yZS9NaXNzaW5nLVQzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiYXJ0aWZhY3QtZXhwZXJ0LWZpc2hib25lc1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTZfQXVnbWVudF9BcnRpZmFjdEV4cGVydF9GaXNoYm9uZXNcIixcclxuICAgIFwibmFtZVwiOiBcIkFydGlmYWN0IEV4cGVydDogRmlzaGJvbmVzXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdldCBhIDIqIEFzaGUsIGEgRmlzaGJvbmVzLCBhbmQgYSBTcGFycmluZyBHbG92ZXNcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy9IZXhjb3JlL01pc3NpbmctVDMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcnRpZmFjdC1leHBlcnQtZGVhdGhmaXJlLWdyYXNwXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxNl9BdWdtZW50X0FydGlmYWN0RXhwZXJ0X0RlYXRoZmlyZUdyYXNwXCIsXHJcbiAgICBcIm5hbWVcIjogXCJBcnRpZmFjdCBFeHBlcnQ6IERlYXRoZmlyZSBHcmFzcFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJHZXQgYSAyKiBLb2cnTWF3LCBhIERlYXRoZmlyZSBHcmFzcCwgYW5kIGEgUmVjdXJ2ZSBCb3dcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy9IZXhjb3JlL01pc3NpbmctVDMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcnRpZmFjdC1leHBlcnQtZmxpY2tlcmJsYWRlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxNl9BdWdtZW50X0FydGlmYWN0RXhwZXJ0X05hdm9yaUZsaWNrZXJibGFkZXNcIixcclxuICAgIFwibmFtZVwiOiBcIkFydGlmYWN0IEV4cGVydDogRmxpY2tlcmJsYWRlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdldCBhbiBBcGhlbGlvcywgYSBGbGlja2VyYmxhZGUsIGFuZCBhIFJlY3VydmUgQm93XCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvSGV4Y29yZS9NaXNzaW5nLVQzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiYXJ0aWZhY3QtZXhwZXJ0LWh1bGxicmVha2VyXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxNl9BdWdtZW50X0FydGlmYWN0RXhwZXJ0X0h1bGxicmVha2VyXCIsXHJcbiAgICBcIm5hbWVcIjogXCJBcnRpZmFjdCBFeHBlcnQ6IEh1bGxicmVha2VyXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdldCBhIDIqIFhpbiBaaGFvLCBhIEh1bGxicmVha2VyLCBhbmQgYSBDaGFpbiBWZXN0XCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvSGV4Y29yZS9NaXNzaW5nLVQzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiYXJ0aWZhY3QtZXhwZXJ0LWJsaWdodGluZy1qZXdlbFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTZfQXVnbWVudF9BcnRpZmFjdEV4cGVydF9CbGlnaHRpbmdKZXdlbFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQXJ0aWZhY3QgRXhwZXJ0OiBCbGlnaHRpbmcgSmV3ZWxcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2V0IGEgVGVlbW8sIGEgQmxpZ2h0aW5nIEpld2VsLCBhbmQgYSBOZWVkbGVzc2x5IExhcmdlIFJvZFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0F1Z21lbnRzL0hleGNvcmUvTWlzc2luZy1UMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImFydGlmYWN0LWV4cGVydC10aGUtaW5kb21pdGFibGVcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE2X0F1Z21lbnRfQXJ0aWZhY3RFeHBlcnRfSW5kb21pdGFibGVHYXVudGxldFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQXJ0aWZhY3QgRXhwZXJ0OiBUaGUgSW5kb21pdGFibGVcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2V0IGEgU2lvbiwgVGhlIEluZG9taXRhYmxlLCBhbmQgYSBHaWFudCBCZWx0LlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0F1Z21lbnRzL0hleGNvcmUvTWlzc2luZy1UMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImFydGlmYWN0LWV4cGVydC1pbm5lcnZhdGluZy1sb2NrZXRcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE2X0F1Z21lbnRfQXJ0aWZhY3RFeHBlcnRfSW5udmVydmF0aW5nTG9ja2V0XCIsXHJcbiAgICBcIm5hbWVcIjogXCJBcnRpZmFjdCBFeHBlcnQ6IElubmVydmF0aW5nIExvY2tldFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJHZXQgYSAyKiBJbGxhb2ksIGEgSW5uZXJ2YXRpbmcgTG9ja2V0LCBhbmQgYSBHaWFudCBCZWx0XCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvSGV4Y29yZS9NaXNzaW5nLVQzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiYXJ0aWZhY3QtZXhwZXJ0LWRhd25jb3JlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxNl9BdWdtZW50X0FydGlmYWN0RXhwZXJ0X0Rhd25jb3JlXCIsXHJcbiAgICBcIm5hbWVcIjogXCJBcnRpZmFjdCBFeHBlcnQ6IERhd25jb3JlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdldCBhIFRlZW1vLCBhIERhd25jb3JlLCBhbmQgYSBUZWFyIE9mIFRoZSBHb2RkZXNzXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvSGV4Y29yZS9NaXNzaW5nLVQzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiYXJ0aWZhY3QtZXhwZXJ0LXByb3dsZXJzLWNsYXdcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE2X0F1Z21lbnRfQXJ0aWZhY3RFeHBlcnRfUHJvd2xlcnNDbGF3XCIsXHJcbiAgICBcIm5hbWVcIjogXCJBcnRpZmFjdCBFeHBlcnQ6IFByb3dsZXIncyBDbGF3XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdldCBhIDIqIFJla1NhaSwgYSBQcm93bGVyJ3MgQ2xhdywgYW5kIGEgU3BhcnJpbmcgR2xvdmVzXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvSGV4Y29yZS9NaXNzaW5nLVQzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiYXJ0aWZhY3QtZXhwZXJ0LXRpdGFuaWMtaHlkcmFcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE2X0F1Z21lbnRfQXJ0aWZhY3RFeHBlcnRfVGl0YW5pY0h5ZHJhXCIsXHJcbiAgICBcIm5hbWVcIjogXCJBcnRpZmFjdCBFeHBlcnQ6IFRpdGFuaWMgSHlkcmFcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2V0IGEgMiogQnJpYXIsIGEgVGl0YW5pYyBIeWRyYSAsIGFuZCBhIEIuRi4gU3dvcmRcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy9IZXhjb3JlL01pc3NpbmctVDMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcnRpZmFjdC1leHBlcnQtc3BlY3RyYWwtY3V0bGFzc1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTZfQXVnbWVudF9BcnRpZmFjdEV4cGVydF9TcGVjdHJhbEN1dGxhc3NcIixcclxuICAgIFwibmFtZVwiOiBcIkFydGlmYWN0IEV4cGVydDogU3BlY3RyYWwgQ3V0bGFzc1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJHZXQgYSAyKiBZYXN1bywgYSBTcGVjdHJhbCBDdXRsYXNzLCBhbmQgYSBTcGFycmluZyBHbG92ZXNcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy9IZXhjb3JlL01pc3NpbmctVDMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcnRpZmFjdC1leHBlcnQtdGFsaXNtYW4tb2YtYXNjZW5zaW9uXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxNl9BdWdtZW50X0FydGlmYWN0RXhwZXJ0X1RhbGlzbWFuT2ZBc2NlbnNpb25cIixcclxuICAgIFwibmFtZVwiOiBcIkFydGlmYWN0IEV4cGVydDogVGFsaXNtYW4gT2YgQXNjZW5zaW9uXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdldCBhIDIqIFphYywgYSBUYWxpc21hbiBPZiBBc2NlbnNpb24sIGFuZCBhIEdpYW50IEJlbHRcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy9IZXhjb3JlL01pc3NpbmctVDMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcnRpZmFjdC1leHBlcnQtaG9yaXpvbi1mb2N1c1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTZfQXVnbWVudF9BcnRpZmFjdEV4cGVydF9Ib3Jpem9uRm9jdXNcIixcclxuICAgIFwibmFtZVwiOiBcIkFydGlmYWN0IEV4cGVydDogSG9yaXpvbiBGb2N1c1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJHZXQgYSBDaG8nR2F0aCwgYSBIb3Jpem9uIEZvY3VzLCBhbmQgYSBOZWVkbGVzc2x5IExhcmdlIFJvZFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0F1Z21lbnRzL0hleGNvcmUvTWlzc2luZy1UMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImFydGlmYWN0LWV4cGVydC1zbmlwZXJzLWZvY3VzXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxNl9BdWdtZW50X0FydGlmYWN0RXhwZXJ0X1NuaXBlcnNGb2N1c1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiQXJ0aWZhY3QgRXhwZXJ0OiBTbmlwZXIncyBGb2N1c1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJHZXQgYSAyKiBUcmlzdGFuYSAsIGEgU25pcGVyJ3MgRm9jdXMsIGFuZCBhIEIuRi4gU3dvcmRcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy9IZXhjb3JlL01pc3NpbmctVDMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcnRpZmFjdC1leHBlcnQtd2l0cy1lbmRcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE2X0F1Z21lbnRfQXJ0aWZhY3RFeHBlcnRfV2l0c0VuZFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQXJ0aWZhY3QgRXhwZXJ0OiBXaXRzIEVuZFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJHZXQgYSAyKiBWaWVnbywgYSBXaXRzIEVuZCwgYW5kIGEgTmVlZGxlc3NseSBMYXJnZSBSb2RcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy9IZXhjb3JlL01pc3NpbmctVDMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcnRpZmFjdC1leHBlcnQtbGlnaHRzaGllbGQtY3Jlc3RcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE2X0F1Z21lbnRfQXJ0aWZhY3RFeHBlcnRfTGlnaHRzaGllbGRDcmVzdFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQXJ0aWZhY3QgRXhwZXJ0OiBMaWdodHNoaWVsZCBDcmVzdFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJHZXQgYSAyKiBOZWVrbywgYSBMaWdodHNoaWVsZCBDcmVzdCwgYW5kIGEgQ2hhaW4gVmVzdFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0F1Z21lbnRzL0hleGNvcmUvTWlzc2luZy1UMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInNoaXYtZXhwZXJ0LXR3aXN0ZWQtZmF0ZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTZfQXVnbWVudF9BcnRpZmFjdEV4cGVydF9TaGl2XCIsXHJcbiAgICBcIm5hbWVcIjogXCJTaGl2IEV4cGVydDogVHdpc3RlZCBGYXRlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdldCBhIFR3aXN0ZWQgRmF0ZSwgYSBTdGF0aWtrIFNoaXYsIGFuZCBhIE5lZWRsZXNzbHkgTGFyZ2UgUm9kLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0F1Z21lbnRzL0hleGNvcmUvTWlzc2luZy1UMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImFydGlmYWN0LWV4cGVydC11bmVuZGluZy1kZXNwYWlyXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxNl9BdWdtZW50X0FydGlmYWN0RXhwZXJ0X1VuZW5kaW5nRGVzcGFpclwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQXJ0aWZhY3QgRXhwZXJ0OiBVbmVuZGluZyBEZXNwYWlyXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdldCBhIDIqIFJ1bWJsZSwgYSBVbmVuZGluZyBEZXNwYWlyLCBhbmQgYSBOZWdhdHJvbiBDbG9ha1wiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0F1Z21lbnRzL0hleGNvcmUvTWlzc2luZy1UMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImFydGlmYWN0LWV4cGVydC1zZWVrZXJzLWFybWd1YXJkXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxNl9BdWdtZW50X0FydGlmYWN0RXhwZXJ0X1NlZWtlcnNBcm1ndWFyZFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQXJ0aWZhY3QgRXhwZXJ0OiBTZWVrZXIncyBBcm1ndWFyZFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJHZXQgYSAyKiBFa2tvLCBhIFNlZWtlcidzIEFybWd1YXJkLCBhbmQgYSBOZWVkbGVzc2x5IExhcmdlIFJvZFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0F1Z21lbnRzL0hleGNvcmUvTWlzc2luZy1UMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImFydGlmYWN0LWl0ZW1cIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X01hcmtldE9mZmVyaW5nX0RlbGF5ZWRSYW5kb21BcnRpZmFjdFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQXJ0aWZhY3QgSXRlbVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJBZnRlciBARGVsYXlAIHJvdW5kcywgZ2FpbiBhIHJhbmRvbSBBcnRpZmFjdC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9QYWlycy9Eb3VibGVVcF9Bc3Npc3RBcm1vcnlfUmFuZG9tSXRlbV9Pcm5uLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwidG9tZS1vZi10cmFpdHNcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X01hcmtldE9mZmVyaW5nX1RvbWVPZlRyYWl0c1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiVG9tZSBvZiBUcmFpdHNcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkRyYWcgdGhpcyBUb21lIHRvIHRoZSBTaG9wIHRvIG9wZW4gYW4gQXJtb3J5IGZ1bGwgb2YgZW1ibGVtcyEgWW91IHdpbGwgaGF2ZSAzMCBzZWNvbmRzIHRvIGNob29zZS5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9DaGFyYWN0ZXJzL1RGVDVfRW1ibGVtQXJtb3J5S2V5L0hVRC9URlQ1X0VtYmxlbUFybW9yeUtleV9TcXVhcmUudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJnb2QtYXJ0aWZhY3QtYW52aWxcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X01hcmtldE9mZmVyaW5nX0FydGlmYWN0QW52aWxcIixcclxuICAgIFwibmFtZVwiOiBcIkdvZCBBcnRpZmFjdCBBbnZpbFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJEcmFnIHRoaXMgdG8gdGhlIFNob3AgdG8gb3BlbiBhbiBBcm1vcnkgZnVsbCBvZiBHb2QgQXJ0aWZhY3QgaXRlbXMhIFlvdSB3aWxsIGhhdmUgMzAgc2Vjb25kcyB0byBjaG9vc2UuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvQ2hhcmFjdGVycy9URlRfQXJtb3J5S2V5T3Jubi9IVUQvVEZUX0FybW9yeUtleU9ybm5fU3F1YXJlLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFuZG9tLWVtYmxlbVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfTWFya2V0T2ZmZXJpbmdfUmFuZG9tRW1ibGVtXCIsXHJcbiAgICBcIm5hbWVcIjogXCJSYW5kb20gRW1ibGVtXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIGEgcmFuZG9tIEVtYmxlbS4gTG9zZSBASGVhbHRoTG9zc0AgVGFjdGljaWFuIGhlYWx0aC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0Nhcm91c2VsTWFya2V0X1NhY3JpZmljZS5URlRfU2V0MTcudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJtYWx3YXJlLW1hdHJpeFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9Qc3lPcHNfQ2hlbWljYWxDYXBhY2l0b3JNb2RfUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiTWFsd2FyZSBNYXRyaXhcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJEZWFsaW5nIHBoeXNpY2FsIGRhbWFnZSB0byBhbiBlbmVteSByZWR1Y2VzIHRoZSB0YXJnZXQncyBBcm1vciBieSBAUmVzaXN0UmVkdWNlQC4gKEFiaWxpdHkgRGFtYWdlIENvb2xkb3duOiBAQ29vbGRvd25AIHNlY29uZHMpQXQgKDQpOiBJZiB0aGUgaG9sZGVyIGlzIFBzaW9uaWMsIGV2ZXJ5IEBOdW1BdHRhY2tzQHJkIGF0dGFjayBjbGVhdmVzLCBkZWFsaW5nIEBDbGVhdmVEYW1hZ2VAJm5ic3A7KCkgcGh5c2ljYWwgZGFtYWdlIHRvIG5lYXJieSBlbmVtaWVzLlJlY29tbWVuZGVkIHVzZXJzOiBNYXN0ZXIgWWkgYW5kIFB5a2UuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxN19Qc3lPcHNfTW9kX0NoZW1pY2FsQ2FwYWNpdG9yTW9kLlRGVF9TZXQxNy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImRyb25lLXVwbGlua1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9Qc3lPcHNfRHJvbmVNb2RfUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiRHJvbmUgVXBsaW5rXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQSBkcm9uZSByZXBlYXRzIEBEYW1hZ2VSZXBlYXRAJSBvZiBkYW1hZ2UgZnJvbSB0aGUgaG9sZGVyJ3MgYXR0YWNrcyBhbmQgQWJpbGl0aWVzIHRvIHRoZSBzYW1lIHRhcmdldHMgZXZlcnkgQEludGVydmFsQCBzZWNvbmRzLkF0ICg0KTogSWYgdGhlIGhvbGRlciBpcyBQc2lvbmljLCBnYWluIGFuIGFkZGl0aW9uYWwgbWluaS1kcm9uZSB0aGF0IHJlcGVhdHMgQFNlY29uZERyb25lRGFtYWdlUmVwZWF0KjEwMEAlIG9mIGRhbWFnZS5SZWNvbW1lbmRlZCB1c2VyczogU29uYSBhbmQgVmlrdG9yLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTdfUHN5T3BzX01vZF9Ecm9uZU1vZC5URlRfU2V0MTcudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJzZW1pY29uZHVjdG9yXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX1BzeU9wc19TZW1pY29uZHVjdG9yTW9kX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlNlbWljb25kdWN0b3JcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJFdmVyeSBAQXR0YWNrc1RvTGF1bmNoQCBhdHRhY2tzIGFuZCBldmVyeSBAQXR0YWNrc1RvUmVjZWl2ZUAgdGltZXMgYmVpbmcgYXR0YWNrZWQsIHphcCB0aGUgQE51bUVuZW1pZXNAIG5lYXJlc3QgZW5lbWllcywgZGVhbGluZyBAUGN0SGVhbHRoRGFtYWdlKjEwMEAlIG9mIGVuZW15IEhlYWx0aCBhcyBtYWdpYyBkYW1hZ2UuUmVjb21tZW5kZWQgdXNlcnM6IEdyYWdhcyBhbmQgTWFzdGVyIFlpLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTdfUHN5T3BzX01vZF9TZW1pY29uZHVjdG9yTW9kLlRGVF9TZXQxNy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRhcmdldC1sb2NrLW9wdGljc1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9Qc3lPcHNfVGFyZ2V0bG9ja01vZF9SYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJUYXJnZXQtTG9jayBPcHRpY3NcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyJ3MgZmlyc3QgYXR0YWNrIG9uIGVhY2ggZW5lbXkgZGVhbHMgQEF0dGFja1BjdEAmbmJzcDsoKSBhZGRpdGlvbmFsIGRhbWFnZS5BdCAoNCk6IElmIHRoZSBob2xkZXIgaXMgUHNpb25pYywgdGhleSBoZWFsIEBIZWFsUGN0KjEwMEAlIG9mIHRoZWlyIG1heCBIZWFsdGggd2hlbmV2ZXIgdGhlaXIgdGFyZ2V0IGRpZXMuUmVjb21tZW5kZWQgdXNlcnM6IFB5a2UgYW5kIE1hc3RlciBZaVwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTdfUHN5T3BzX01vZF9UYXJnZXRMb2NrTW9kLlRGVF9TZXQxNy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImJpb21hdHRlci1wcmVzZXJ2ZXJcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fUHN5T3BzX0dyZW5hZGVNb2RfUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQmlvbWF0dGVyIFByZXNlcnZlclwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQFBjdE1heEhQKjEwMCVAJSBtYXggSGVhbHRoIGFuZCBkZXBsb3kgQE51bUdyZW5hZGVzQCBMaWZlIE9yYnMuIEV2ZXJ5IEBJbnRlcnZhbEAgc2Vjb25kcyBvZiBjb21iYXQsIG9uZSBkcm9wcyByZXN0b3JpbmcgQEhlYWxQY3QqMTAwQCUgb2YgdGhlIGhvbGRlcidzIG1pc3NpbmcgSGVhbHRoLkF0ICg0KTogSWYgdGhlIGhvbGRlciBpcyBQc2lvbmljLCB0aGV5IGdhaW4gQEluY3JlYXNlZEhlYWxpbmcqMTAwQCUgaW5jcmVhc2VkIGhlYWxpbmcgZnJvbSBhbGwgc291cmNlcy5SZWNvbW1lbmRlZCB1c2VyOiBHcmFnYXMuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxN19Qc3lPcHNfTW9kX0dyZW5hZGVNb2QuVEZUX1NldDE3LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwic3ltcGF0aGV0aWMtaW1wbGFudFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9Qc3lPcHNfU3ltcGF0aGV0aWNJbXBsYW50TW9kX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlN5bXBhdGhldGljIEltcGxhbnRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJFdmVyeSBASW50ZXJ2YWxAIHNlY29uZHMsIGdhaW4gQE1hbmFSZWdlbk92ZXJUaW1lQCBhZGRpdGlvbmFsIE1hbmEgUGVyIFNlY29uZC4gQXQgKDQpOiBJZiB0aGUgaG9sZGVyIGlzIFBzaW9uaWMsIHRoZWlyIGFiaWxpdGllcyBkZWFsIEBUcnVlRGFtYWdlQ29udmVyc2lvbioxMDBAJSBvZiB0aGVpciBhYmlsaXR5IGRhbWFnZSBhcyB0cnVlIGRhbWFnZSBpbnN0ZWFkLlJlY29tbWVuZGVkIHVzZXJzOiBTb25hIGFuZCBWaWt0b3IuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxN19Qc3lPcHNfTW9kX1N5bXBhdGhldGljSW1wbGFudE1vZC5URlRfU2V0MTcudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ6ZWtlcy1ibGVhay1oZXJhbGRcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fQXJ0aWZhY3RfWmVrZXNIZXJhbGRTaGFkb3dcIixcclxuICAgIFwibmFtZVwiOiBcIlpla2UncyBCbGVhayBIZXJhbGRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiV2hlbiBjb21iYXQgYmVnaW5zLCB0aGUgaG9sZGVyIHJlZHVjZXMgdGhlIEF0dGFjayBTcGVlZCBvZiBhbGwgYWxsaWVzIHdpdGhpbiBASGV4UmFuZ2VAIGhleGVzIGluIHRoZSBzYW1lIHJvdyBieSAgQEF0dGFja1NwZWVkUmVkdWN0aW9uQCUuIFRoZSBob2xkZXIgdGhlbiBnYWlucyAgQEF0dGFja1NwZWVkQCUgQXR0YWNrIFNwZWVkIGZvciBlYWNoIGFmZmVjdGVkIGFsbHkuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvU2hhZG93L1NfWmVrZXNfSGVyYWxkLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwib3JublwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTFfQ2hhbXBpb25JdGVtX09ybm5cIixcclxuICAgIFwibmFtZVwiOiBcIk9ybm5cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiT3JublwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL1VYL1RGVC9DaGFtcGlvblNwbGFzaGVzL1RGVDExX09ybm5fU3F1YXJlLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwic29sYXItZWNsaXBzZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfQW5pbWFTcXVhZEl0ZW1fVGllcjNfUmFkaWFudEZpZWxkXCIsXHJcbiAgICBcIm5hbWVcIjogXCJTb2xhciBFY2xpcHNlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBASGVhbHRoUGVyY2VudCoxMDBAJSBtYXggSGVhbHRoLiBFdmVyeSBzZWNvbmQsIGRlYWwgbWFnaWMgZGFtYWdlIGluIGEgQEhleFJhZGl1c0Jhc2VAJm5ic3A7aGV4IHJhZGl1cyBlcXVhbCB0byBASGVhbHRoUmF0aW8qMTAwQCUgb2YgdGhlIGhvbGRlcidzIG1heCBIZWFsdGgsIGFuZCBnYWluIG1heCBIZWFsdGggZXF1YWwgdG8gQERhbWFnZVRvSGVhbHRoQ29udmVyc2lvbioxMDBAJSBvZiBkYW1hZ2UgZGVhbHQuIFJhZGl1cyBpbmNyZWFzZXMgZXZlcnkgQFBlcmlvZEAgc2Vjb25kcy5SZWNvbW1lbmRlZCBSb2xlczogQXR0YWNrIG9yIE1hZ2ljIFRhbmtcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0FuaW1hU3F1YWRJdGVtX1JhZGlhbnRGaWVsZF9UMy5URlRfU2V0MTcudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJyYWRpYW50LWZpZWxkXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19BbmltYVNxdWFkSXRlbV9UaWVyMl9SYWRpYW50RmllbGRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgRmllbGRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIEBIZWFsdGhQZXJjZW50KjEwMEAlIG1heCBoZWFsdGguIEV2ZXJ5IHNlY29uZCwgZGVhbCBtYWdpYyBkYW1hZ2UgaW4gYSBASGV4UmFkaXVzQmFzZUAtaGV4IHJhZGl1cyBlcXVhbCB0byBASGVhbHRoUmF0aW8qMTAwQCUgb2YgdGhlIGhvbGRlcidzIG1heCBIZWFsdGguIFJhZGl1cyBpbmNyZWFzZXMgZXZlcnkgQFBlcmlvZEAgc2Vjb25kcy5SZWNvbW1lbmRlZCBSb2xlczogQXR0YWNrIG9yIE1hZ2ljIFRhbmtcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0FuaW1hU3F1YWRJdGVtX1JhZGlhbnRGaWVsZF9UMi5URlRfU2V0MTcudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJvcGVuLWFuLWFydGlmYWN0LWFybW9yeVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTFfRW5jb3VudGVyX0Nob2ljZUl0ZW1fQXJ0aWZhY3RBcm1vcnlcIixcclxuICAgIFwibmFtZVwiOiBcIk9wZW4gYW4gQXJ0aWZhY3QgQXJtb3J5LlwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy9DaG9pY2VVSS9BRE1JTl9Bcm1vcmVyeV9JY29uLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwic3BlbmQtMjItZ29sZC1nYWluLWFuLWFydGlmYWN0LWFudmlsXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxMV9FbmNvdW50ZXJfQ2hvaWNlSXRlbV9CdXlFeHBlbnNpdmVBcnRpZmFjdFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiU3BlbmQgMjIgZ29sZC4gR2FpbiBhbiBBcnRpZmFjdCBhbnZpbC5cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvQ2hvaWNlVUkvQURNSU5fQXJtb3JlcnlfSWNvbi50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1lc2V0NWNhdmFsaWVycmFkaWFudHNwYXRcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9DYXZhbGllclNwYXR1bGFJdGVtX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfU2V0NUNhdmFsaWVyX1JhZGlhbnRTcGF0XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcIlRGVDVfSXRlbV9DaGFpblZlc3RTaGFkb3dcIixcclxuICAgICAgXCJURlQ1X0l0ZW1fU3BhdHVsYVJhZGlhbnRcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9TZXQ1Q2F2YWxpZXJfUmFkaWFudFNwYXRcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L0NhdmFsaWVyX1JhZGlhbnQudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZXNldDVuaWdodGJyaW5nZXJyYWRpYW50c3BhdFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX05pZ2h0YnJpbmdlclNwYXR1bGFJdGVtX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfU2V0NU5pZ2h0YnJpbmdlcl9SYWRpYW50U3BhdFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJURlQ1X0l0ZW1fU3BhdHVsYVJhZGlhbnRcIixcclxuICAgICAgXCJURlQ1X0l0ZW1fR2lhbnRzQmVsdFNoYWRvd1wiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX1NldDVOaWdodGJyaW5nZXJfUmFkaWFudFNwYXRcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L05pZ2h0YnJpbmdlcl9SYWRpYW50LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVzZXQ1YWJvbWluYXRpb25yYWRpYW50c3BhdFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0Fib21pbmF0aW9uU3BhdHVsYUl0ZW1fUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9TZXQ1QWJvbWluYXRpb25fUmFkaWFudFNwYXRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwiVEZUNV9JdGVtX1NwYXJyaW5nR2xvdmVzU2hhZG93XCIsXHJcbiAgICAgIFwiVEZUNV9JdGVtX1NwYXR1bGFSYWRpYW50XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fU2V0NUFib21pbmF0aW9uX1JhZGlhbnRTcGF0XCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0NS9BYm9taW5hdGlvbl9SYWRpYW50LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVzZXQ1c3BlbGx3ZWF2ZXJyYWRpYW50c3BhdFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1NwZWxsd2VhdmVyU3BhdHVsYUl0ZW1fUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9TZXQ1U3BlbGx3ZWF2ZXJfUmFkaWFudFNwYXRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIixcclxuICAgICAgXCJURlQ1X0l0ZW1fU3BhdHVsYVJhZGlhbnRcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9TZXQ1U3BlbGx3ZWF2ZXJfUmFkaWFudFNwYXRcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L1NwZWxsd2VhdmVyX1JhZGlhbnQudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZXNldDVza2lybWlzaGVycmFkaWFudHNwYXRcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9Ta2lybWlzaGVyU3BhdHVsYUl0ZW1fUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9TZXQ1U2tpcm1pc2hlcl9SYWRpYW50U3BhdFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJURlQ1X0l0ZW1fU3BhdHVsYVJhZGlhbnRcIixcclxuICAgICAgXCJiZi1zd29yZFwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX1NldDVTa2lybWlzaGVyX1JhZGlhbnRTcGF0XCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0NS9Ta2lybWlzaGVyX1JhZGlhbnQudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZXNldDVkYXduYnJpbmdlcnJhZGlhbnRzcGF0XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fRGF3bmJyaW5nZXJTcGF0dWxhSXRlbV9SYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJ0ZnRfaXRlbV9uYW1lX1NldDVEYXduYnJpbmdlcl9SYWRpYW50U3BhdFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJnaWFudHMtYmVsdFwiLFxyXG4gICAgICBcIlRGVDVfSXRlbV9TcGF0dWxhUmFkaWFudFwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX1NldDVEYXduYnJpbmdlcl9SYWRpYW50U3BhdFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDUvRGF3bmJyaW5nZXJfUmFkaWFudC50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1lc2V0NWFzc2Fzc2lucmFkaWFudHNwYXRcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9Bc3Nhc3NpblNwYXR1bGFJdGVtX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfU2V0NUFzc2Fzc2luX1JhZGlhbnRTcGF0XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcInNwYXJyaW5nLWdsb3Zlc1wiLFxyXG4gICAgICBcIlRGVDVfSXRlbV9TcGF0dWxhUmFkaWFudFwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX1NldDVBc3Nhc3Npbl9SYWRpYW50U3BhdFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDUvQXNzYXNzaW5fUmFkaWFudC50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1lc2V0NWNvdmVucmFkaWFudHNwYXRcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9Db3ZlblNwYXR1bGFJdGVtX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfU2V0NUNvdmVuX1JhZGlhbnRTcGF0XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcIlRGVDVfSXRlbV9UZWFyT2ZUaGVHb2RkZXNzU2hhZG93XCIsXHJcbiAgICAgIFwiVEZUNV9JdGVtX1NwYXR1bGFSYWRpYW50XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fU2V0NUNvdmVuX1JhZGlhbnRTcGF0XCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0NS9Db3Zlbl9SYWRpYW50LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVzZXQ1cmVkZWVtZWRyYWRpYW50c3BhdFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1JlZGVlbWVkU3BhdHVsYUl0ZW1fUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9TZXQ1UmVkZWVtZWRfUmFkaWFudFNwYXRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwibmVnYXRyb24tY2xvYWtcIixcclxuICAgICAgXCJURlQ1X0l0ZW1fU3BhdHVsYVJhZGlhbnRcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9TZXQ1UmVkZWVtZWRfUmFkaWFudFNwYXRcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L1JlZGVlbWVkX1JhZGlhbnQudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZXNldDVoZWxsaW9ucmFkaWFudHNwYXRcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9IZWxsaW9uU3BhdHVsYUl0ZW1fUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9TZXQ1SGVsbGlvbl9SYWRpYW50U3BhdFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJURlQ1X0l0ZW1fUmVjdXJ2ZUJvd1NoYWRvd1wiLFxyXG4gICAgICBcIlRGVDVfSXRlbV9TcGF0dWxhUmFkaWFudFwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX1NldDVIZWxsaW9uX1JhZGlhbnRTcGF0XCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0NS9IZWxsaW9uX1JhZGlhbnQudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZXNldDVmb3Jnb3R0ZW5yYWRpYW50c3BhdFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0ZvcmdvdHRlblNwYXR1bGFJdGVtX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfU2V0NUZvcmdvdHRlbl9SYWRpYW50U3BhdFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJURlQ1X0l0ZW1fU3BhdHVsYVJhZGlhbnRcIixcclxuICAgICAgXCJURlQ1X0l0ZW1fQkZTd29yZFNoYWRvd1wiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX1NldDVGb3Jnb3R0ZW5fUmFkaWFudFNwYXRcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L0ZvcmdvdHRlbl9SYWRpYW50LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVzZXQ1cmVuZXdlcnJhZGlhbnRzcGF0XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fUmVuZXdlclNwYXR1bGFJdGVtX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfU2V0NVJlbmV3ZXJfUmFkaWFudFNwYXRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwiVEZUNV9JdGVtX1NwYXR1bGFSYWRpYW50XCIsXHJcbiAgICAgIFwidGVhci1vZi1nb2RkZXNzXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fU2V0NVJlbmV3ZXJfUmFkaWFudFNwYXRcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L1JlbmV3ZXJfUmFkaWFudC50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1lc2V0NXJldmVuYW50cmFkaWFudHNwYXRcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9SZXZlbmFudFNwYXR1bGFJdGVtX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfU2V0NVJldmVuYW50X1JhZGlhbnRTcGF0XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcIlRGVDVfSXRlbV9OZWdhdHJvbkNsb2FrU2hhZG93XCIsXHJcbiAgICAgIFwiVEZUNV9JdGVtX1NwYXR1bGFSYWRpYW50XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fU2V0NVJldmVuYW50X1JhZGlhbnRTcGF0XCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0NS9SZXZlbmFudF9SYWRpYW50LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwidGZ0aXRlbW5hbWVzZXQ1bGVnaW9ubmFpcmVyYWRpYW50c3BhdFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0xlZ2lvbm5haXJlU3BhdHVsYUl0ZW1fUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9TZXQ1TGVnaW9ubmFpcmVfUmFkaWFudFNwYXRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwicmVjdXJ2ZS1ib3dcIixcclxuICAgICAgXCJURlQ1X0l0ZW1fU3BhdHVsYVJhZGlhbnRcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9TZXQ1TGVnaW9ubmFpcmVfUmFkaWFudFNwYXRcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQ1L0xlZ2lvbm5haXJlX1JhZGlhbnQudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZXNldDVpcm9uY2xhZHJhZGlhbnRzcGF0XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fSXJvbmNsYWRTcGF0dWxhSXRlbV9SYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJ0ZnRfaXRlbV9uYW1lX1NldDVJcm9uY2xhZF9SYWRpYW50U3BhdFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJjaGFpbi12ZXN0XCIsXHJcbiAgICAgIFwiVEZUNV9JdGVtX1NwYXR1bGFSYWRpYW50XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fU2V0NUlyb25jbGFkX1JhZGlhbnRTcGF0XCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0NS9Jcm9uY2xhZF9SYWRpYW50LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiaW5maW5pdHktZWRnZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fSW5maW5pdHlFZGdlXCIsXHJcbiAgICBcIm5hbWVcIjogXCJJbmZpbml0eSBFZGdlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcImJmLXN3b3JkXCIsXHJcbiAgICAgIFwic3BhcnJpbmctZ2xvdmVzXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIFByZWNpc2lvbi5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0luZmluaXR5RWRnZS5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJyYWRpYW50LWRyYWdvbnMtY2xhd1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0RyYWdvbnNDbGF3UmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBEcmFnb24ncyBDbGF3XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBAUGVyY2VudE1heEhQKjEwMEAlIG1heCBoZWFsdGguRXZlcnkgQEhlYWx0aFJlZ2VuSW50ZXJ2YWxAIHNlY29uZHMsIGhlYWwgQFBlcmNlbnRIZWFsdGhEYW1hZ2VAJSBtYXggSGVhbHRoLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0RyYWdvbnNDbGF3UmFkaWFudC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJyYWRpYW50LXN0cmlrZXJzLWZsYWlsXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fVHJhcENsYXdSYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IFN0cmlrZXIncyBGbGFpbFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkNyaXRpY2FsIFN0cmlrZXMgZ3JhbnQgQEJ1ZmZEYW1hZ2VBbXAqMTAwQCUgRGFtYWdlIEFtcCBmb3IgQER1cmF0aW9uQCBzZWNvbmRzLCBzdGFja2luZyB1cCB0byBATWF4U3RhY2tzQCB0aW1lcy5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9UcmFwQ2xhd1JhZGlhbnQuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1pb25pYy1zcGFya1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0lvbmljU3BhcmtSYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IElvbmljIFNwYXJrXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQE1SU2hyZWRAJSBTaHJlZCBlbmVtaWVzIHdpdGhpbiBASGV4UmFuZ2VAIGhleGVzLiBXaGVuIGVuZW1pZXMgY2FzdCBhbiBBYmlsaXR5LCBkZWFsIG1hZ2ljIGRhbWFnZSBlcXVhbCB0byBATWFuYVJhdGlvQCUgb2YgdGhlIE1hbmEgc3BlbnQuW0RpcmVjdCBkYW1hZ2UgaXRlbV1TaHJlZDogUmVkdWNlIE1hZ2ljIFJlc2lzdFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0lvbmljU3BhcmtSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtcXVpY2tzaWx2ZXJcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9RdWlja3NpbHZlclJhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgUXVpY2tzaWx2ZXJcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgU3RhcnQ6IEdhaW4gaW1tdW5pdHkgdG8gY3Jvd2QgY29udHJvbCBmb3IgQFNwZWxsU2hpZWxkRHVyYXRpb25AIHNlY29uZHMuR2FpbiBAUHJvY0F0dGFja1NwZWVkKjEwMEAlIHN0YWNraW5nIEF0dGFjayBTcGVlZCBldmVyeSBzZWNvbmQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fUXVpY2tzaWx2ZXJSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtaGV4dGVjaC1ndW5ibGFkZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0hleHRlY2hHdW5ibGFkZVJhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgSGV4dGVjaCBHdW5ibGFkZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkhlYWwgdGhlIGxvd2VzdCBwZXJjZW50IEhlYWx0aCBhbGx5IGZvciBAQWxseUhlYWxpbmcqMTAwQCUgb2YgZGFtYWdlIGRlYWx0LkFsbHkgSGVhbGluZzogQFRGVFVuaXRQcm9wZXJ0eS5pdGVtOlRGVF9UcmFja2VyX1ZhbHVlMUBcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9IZXh0ZWNoR3VuYmxhZGVSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtdm9pZC1zdGFmZlwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1N0YXRpa2tTaGl2UmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBWb2lkIFN0YWZmXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiRGFtYWdlIGZyb20gYXR0YWNrcyBhbmQgQWJpbGl0aWVzIEBNUlNocmVkQCUgU2hyZWQgdGhlIHRhcmdldCBmb3IgdGhlIHJlc3Qgb2YgY29tYmF0LiBUaGlzIGVmZmVjdCBkb2VzIG5vdCBzdGFjay5TaHJlZDogUmVkdWNlIE1hZ2ljIFJlc2lzdFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX1ZvaWRTdGFmZlJhZGlhbnQuVEZUX1NldDE3LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1wcm90ZWN0b3JzLXZvd1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0Zyb3plbkhlYXJ0UmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBQcm90ZWN0b3IncyBWb3dcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgU3RhcnQ6IEdhaW4gQENvbWJhdFN0YXJ0TWFuYUAgTWFuYS5BdCBASGVhbHRoVGhyZXNob2xkQCUgSGVhbHRoLCBnYWluIEBUcmlnZ2VyTWFuYUAgTWFuYSBhbmQgYSBTaGllbGQgZXF1YWwgdG8gQFNoaWVsZEhlYWx0aFBlcmNlbnRAJSBtYXggSGVhbHRoLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0Zyb3plbkhlYXJ0UmFkaWFudC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJyYWRpYW50LWJsdWUtYnVmZlwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0JsdWVCdWZmUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBCbHVlIEJ1ZmZcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIEBNb2RpZmllZEFEQVAqMTAwQCUgYWRkaXRpb25hbCBBdHRhY2sgRGFtYWdlIGFuZCBBYmlsaXR5IFBvd2VyIGZyb20gYWxsIHNvdXJjZXMuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fQmx1ZUJ1ZmZSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtYXJjaGFuZ2Vscy1zdGFmZlwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0FyY2hhbmdlbHNTdGFmZlJhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgQXJjaGFuZ2VsJ3MgU3RhZmZcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgc3RhcnQ6IEdhaW4gQEFQUGVySW50ZXJ2YWxAJSBBYmlsaXR5IFBvd2VyIGV2ZXJ5IEBJbnRlcnZhbFNlY29uZHNAIHNlY29uZHMgaW4gY29tYmF0LlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0FyY2hhbmdlbHNTdGFmZlJhZGlhbnQuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1tb3JlbGxvbm9taWNvblwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX01vcmVsbG9ub21pY29uUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBNb3JlbGxvbm9taWNvblwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkF0dGFja3MgYW5kIEFiaWxpdGllcyBkZWFsIEBCdXJuUGVyY2VudEAlIEJ1cm4gYW5kIEBHcmlldm91c1dvdW5kc1BlcmNlbnRAJSBXb3VuZCB0byBlbmVtaWVzIGZvciBAQnVybkR1cmF0aW9uQCBzZWNvbmRzLkJ1cm46IERlYWxzIGEgcGVyY2VudCBvZiB0aGUgdGFyZ2V0J3MgbWF4IEhlYWx0aCBhcyB0cnVlIGRhbWFnZSBldmVyeSBzZWNvbmRXb3VuZDogUmVkdWNlcyBoZWFsaW5nIHJlY2VpdmVkXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fTW9yZWxsb25vbWljb25SYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtYnJhbWJsZS12ZXN0XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fQnJhbWJsZVZlc3RSYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IEJyYW1ibGUgVmVzdFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQFBlcmNlbnRNYXhIUCoxMDBAJSBtYXggaGVhbHRoLlRha2UgQEF1dG9EYW1hZ2VSZWR1Y3Rpb24qMTAwQCUgcmVkdWNlZCBkYW1hZ2UgZnJvbSBhdHRhY2tzLiBXaGVuIHN0cnVjayBieSBhbnkgYXR0YWNrLCBkZWFsIEAxU3RhckFvRURhbWFnZUAgbWFnaWMgZGFtYWdlIHRvIGFsbCBhZGphY2VudCBlbmVtaWVzLkNvb2xkb3duOiBASUNEQCBzZWNvbmRzXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fQnJhbWJsZVZlc3RSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInp6cm90LXBvcnRhbFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1p6Um90UG9ydGFsUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiWnonUm90IFBvcnRhbFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlN1bW1vbiBhIGxhcmdlIFZvaWRzcGF3bi4gSXRzIHN0cmVuZ3RoIGluY3JlYXNlcyB3aXRoIGVhY2ggU3RhZ2Uu4oCL4oCLW1N1cHBvcnQgaXRlbV1bVW5pcXVlIC0gb25seSAxIHBlciBjaGFtcGlvbl1cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9aelJvdFBvcnRhbFJhZGlhbnQuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwic2hyb3VkLW9mLXJldmVyZW5jZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1Nocm91ZE9mU3RpbGxuZXNzUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiU2hyb3VkIG9mIFJldmVyZW5jZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBzdGFydDogU2hvb3QgYSB3aWRlciBiZWFtIHRoYXQgQENvc3RJbmNyZWFzZUAlIE1hbmEgUmVhdmVzIGVuZW1pZXMuWW91ciB0ZWFtIGdhaW5zICBAQWxseUJvbnVzTWFuYUAgc3RhcnRpbmcgTWFuYS5bVW5pcXVlIC0gb25seSAxIHBlciBjaGFtcGlvbl1NYW5hIFJlYXZlOiBpbmNyZWFzZSBtYXhpbXVtIE1hbmEgdW50aWwgdGhlIG5leHQgY2FzdFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1JhZGlhbnQvU2hyb3VkX29mX1N0aWxsbmVzc19SYWRpYW50LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1rcmFrZW5zLWZ1cnlcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9SdW5hYW5zSHVycmljYW5lUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBLcmFrZW4ncyBGdXJ5XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQXR0YWNrcyBncmFudCBAQURPbkF0dGFjayoxMDBAJSBzdGFja2luZyBBdHRhY2sgRGFtYWdlLCB1cCB0byBATWF4U3RhY2tzQCBhdHRhY2tzLiBBZnRlciBATWF4U3RhY2tzQCBhdHRhY2tzLCBnYWluIEBBU0NhcHN0b25lKjEwMEAlIEF0dGFjayBTcGVlZC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0tyYWtlblNsYXllclJhZGlhbnQuVEZUX1RGVDE0XzUudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJtaXN0cmFsXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fWmVwaHlyUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiTWlzdHJhbFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBzdGFydDogU3VtbW9uIGEgd2hpcmx3aW5kIG9uIHRoZSBvcHBvc2l0ZSBzaWRlIG9mIHRoZSBhcmVuYSB0aGF0IHJlbW92ZXMgdGhlIGNsb3Nlc3QgZW5lbXkgZnJvbSBjb21iYXQgZm9yIEBCYW5pc2hEdXJhdGlvbkAgc2Vjb25kcy5Zb3VyIHRlYW0gZ2FpbnMgIEBBbGx5Qm9udXNBU0AlIEF0dGFjayBTcGVlZC5bSWdub3JlcyBjcm93ZCBjb250cm9sIGltbXVuaXR5Ll1bVW5pcXVlIC0gb25seSAxIHBlciBjaGFtcGlvbl1cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9SYWRpYW50L1plcGh5cl9SYWRpYW50LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1ndWluc29vcy1yYWdlYmxhZGVcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9HdWluc29vc1JhZ2VibGFkZVJhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgR3VpbnNvbydzIFJhZ2VibGFkZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQEF0dGFja1NwZWVkUGVyU3RhY2tAJSBzdGFja2luZyBBdHRhY2sgU3BlZWQgZXZlcnkgc2Vjb25kLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0d1aW5zb29zUmFnZWJsYWRlUmFkaWFudC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJyYWRpYW50LWhhbmQtb2YtanVzdGljZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0hhbmRPZkp1c3RpY2VSYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IEhhbmQgb2YgSnVzdGljZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gMiBlZmZlY3RzOkBBRF9Ob3RTdGF0QmFyKjEwMEAlIEF0dGFjayBEYW1hZ2UgYW5kIEBBUF9Ob3RTdGF0QmFyQCUgQWJpbGl0eSBQb3dlci5AU3RhdE9tbml2YW1wX05vdFN0YXRCYXIqMTAwQCUgT21uaXZhbXAuV2hpbGUgYWJvdmUgQEhlYWx0aFRocmVzaG9sZCoxMDBAJSBoZWFsdGgsIGRvdWJsZSB0aGUgQXR0YWNrIERhbWFnZSBhbmQgQWJpbGl0eSBQb3dlci4gV2hpbGUgYmVsb3cgQEhlYWx0aFRocmVzaG9sZCoxMDBAJSBIZWFsdGgsIGRvdWJsZSB0aGUgT21uaXZhbXAuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fSGFuZE9mSnVzdGljZVJhZGlhbnQuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1zdW5maXJlLWNhcGVcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9TdW5maXJlQ2FwZVJhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgU3VuZmlyZSBDYXBlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBAQm9udXNQZXJjZW50SFAqMTAwQCUgbWF4IEhlYWx0aC5FdmVyeSBASUNEQCBzZWNvbmRzLCBkZWFsIEBCdXJuUGVyY2VudEAlIEJ1cm4gYW5kIEBHcmlldm91c1dvdW5kc1BlcmNlbnRAJSBXb3VuZCB0byBhbiBlbmVteSB3aXRoaW4gQEhleFJhbmdlQCBoZXhlcyBmb3IgQEJ1cm5EdXJhdGlvbkAgc2Vjb25kcy5CdXJuOiBEZWFscyBhIHBlcmNlbnQgb2YgdGhlIHRhcmdldCdzIG1heCBIZWFsdGggYXMgdHJ1ZSBkYW1hZ2UgZXZlcnkgc2Vjb25kV291bmQ6IHJlZHVjZXMgaGVhbGluZyByZWNlaXZlZFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX1N1bmZpcmVDYXBlUmFkaWFudC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ6ZWtlcy1oYXJtb255XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fWmVrZXNIZXJhbGRSYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJaZWtlJ3MgSGFybW9ueVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBzdGFydDogR3JhbnQgIEBBdHRhY2tTcGVlZEAlIEF0dGFjayBTcGVlZCBhbmQgQExpZmVzdGVhbEAlIE9tbml2YW1wIHRvIHRoZSBob2xkZXIgYW5kIGFsbGllcyB3aXRoaW4gMSBoZXggaW4gdGhlIHNhbWUgcm93LuKAi+KAi09tbml2YW1wOiBoZWFsIGZvciBzb21lIG9mIGRhbWFnZSBkZWFsdFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1JhZGlhbnQvWmVrZXNfSGVyYWxkX1JhZGlhbnQudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJyYWRpYW50LWxhc3Qtd2hpc3BlclwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0xhc3RXaGlzcGVyUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBMYXN0IFdoaXNwZXJcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJEYW1hZ2UgZnJvbSBhdHRhY2tzIGFuZCBBYmlsaXRpZXMgQEFybW9yUmVkdWN0aW9uUGVyY2VudEAlIFN1bmRlciB0aGUgdGFyZ2V0IGZvciB0aGUgcmVzdCBvZiBjb21iYXQuIFRoaXMgZWZmZWN0IGRvZXMgbm90IHN0YWNrLlN1bmRlcjogUmVkdWNlIEFybW9yXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fTGFzdFdoaXNwZXJSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImxvY2tldC1vZi10YXJnb24tcHJpbWVcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9Mb2NrZXRPZlRoZUlyb25Tb2xhcmlSYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJMb2NrZXQgb2YgVGFyZ29uIFByaW1lXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IHN0YXJ0OiBTaGllbGRzIHRoZSBob2xkZXIgYW5kIGFsbGllcyB3aXRoaW4gQEhleFJhbmdlQCBoZXhlcyBpbiB0aGUgc2FtZSByb3cgZm9yIEAxU3RhclNoaWVsZFZhbHVlQC9AMlN0YXJTaGllbGRWYWx1ZUAvQDNTdGFyU2hpZWxkVmFsdWVAICBkYW1hZ2UgZm9yIEBTaGllbGREdXJhdGlvbkAgc2Vjb25kcy5Zb3VyIHRlYW0gZ2FpbnMgIEBCb251c0FsbHlIZWFsdGhAIEhlYWx0aC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9SYWRpYW50L0xvY2tldF9vZl90aGVfSXJvbl9Tb2xhcmlfUmFkaWFudC50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtdGhpZWZzLWdsb3Zlc1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1RoaWVmc0dsb3Zlc1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgVGhpZWYncyBHbG92ZXNcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJFYWNoIHJvdW5kOiBFcXVpcCAyIHJhbmRvbSBSYWRpYW50IGl0ZW1zLltDb25zdW1lcyAzIGl0ZW0gc2xvdHMuXUBURlRVbml0UHJvcGVydHkuOlRGVF9CaW5kT25FcXVpcFRSQUBcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9UaGllZnNHbG92ZXNSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtd2FybW9ncy1hcm1vclwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1dhcm1vZ3NBcm1vclJhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgV2FybW9nJ3MgQXJtb3JcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIEBCb251c1BlcmNlbnRIUCoxMDBAJSBtYXggSGVhbHRoLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX1dhcm1vZ3NBcm1vclJhZGlhbnQuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1zdGVyYWtzLWdhZ2VcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9TdGVyYWtzR2FnZVJhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgU3RlcmFrJ3MgR2FnZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkF0IEBIZWFsdGhUaHJlc2hvbGRAJSBIZWFsdGgsIGdhaW4gYSBTaGllbGQgZXF1YWwgdG8gQFBlcmNlbnRIZWFsdGhTaGllbGQqMTAwQCUgb2YgdGhlIHdlYXJlcidzIG1heGltdW0gSGVhbHRoIHRoYXQgcmFwaWRseSBkZWNheXMgb3ZlciBAU2hpZWxkRHVyYXRpb25AIHNlY29uZHMuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fU3RlcmFrc0dhZ2VSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtc3Bpcml0LXZpc2FnZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1JlZGVtcHRpb25SYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IFNwaXJpdCBWaXNhZ2VcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJSZWdlbmVyYXRlIEBNaXNzaW5nSGVhbHRoSGVhbCoxMDBAJSBvZiBtaXNzaW5nIEhlYWx0aCBlYWNoIHNlY29uZC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX1NwaXJpdFZpc2FnZVJSLlRGVF9URlQxNF81LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1lZGdlLW9mLW5pZ2h0XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fR3VhcmRpYW5BbmdlbFJhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgRWRnZSBvZiBOaWdodFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkF0IEBIZWFsdGhUaHJlc2hvbGRAJSBIZWFsdGgsIGJyaWVmbHkgYmVjb21lIHVudGFyZ2V0YWJsZSwgc2hlZCBuZWdhdGl2ZSBlZmZlY3RzLCBhbmQgaGVhbCBhbGwgbWlzc2luZyBoZWFsdGguXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fR3VhcmRpYW5BbmdlbFJhZGlhbnQuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1yZWQtYnVmZlwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1JhcGlkRmlyZWNhbm5vblJhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgUmVkIEJ1ZmZcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJBdHRhY2tzIGFuZCBBYmlsaXRpZXMgQEJ1cm5QZXJjZW50QCUgQnVybiBhbmQgQEhlYWxpbmdSZWR1Y3Rpb25QY3RAJSBXb3VuZCBlbmVtaWVzIGZvciBARHVyYXRpb25AIHNlY29uZHMuQnVybjogRGVhbHMgYSBwZXJjZW50IG9mIHRoZSB0YXJnZXQncyBtYXggSGVhbHRoIGFzIHRydWUgZGFtYWdlIGV2ZXJ5IHNlY29uZFdvdW5kOiBSZWR1Y2VzIGhlYWxpbmcgcmVjZWl2ZWRcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9SYXBpZEZpcmVjYW5ub25SYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtc3RlYWRmYXN0LWhlYXJ0XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fTmlnaHRIYXJ2ZXN0ZXJSYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IFN0ZWFkZmFzdCBIZWFydFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQEJhc2VEdXJhYmlsaXR5KjEwMEAlIGR1cmFiaWxpdHkuIFdoaWxlIGFib3ZlIEBUaHJlc2hvbGRGb3JFbXBvd2VyKjEwMEAlIEhlYWx0aCwgaW5zdGVhZCBnYWluIEBFbXBvd2VyZWREdXJhYmlsaXR5KjEwMEAlIER1cmFiaWxpdHkuQFRGVFVuaXRQcm9wZXJ0eS46VEZUX0F1Z21lbnRfV2FybW9nc0J1Y2tsZV9UUkFLZXlAXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fTmlnaHRIYXJ2ZXN0ZXJSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtdGl0YW5zLXJlc29sdmVcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9UaXRhbnNSZXNvbHZlUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBUaXRhbidzIFJlc29sdmVcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIEBTdGFja2luZ0FEKjEwMEAlIEF0dGFjayBEYW1hZ2UgYW5kIEBTdGFja2luZ1NQQCUgQWJpbGl0eSBQb3dlciB3aGVuIGF0dGFja2luZyBvciB0YWtpbmcgZGFtYWdlLCBzdGFja2luZyB1cCB0byBAU3RhY2tDYXBAIHRpbWVzLkF0IGZ1bGwgc3RhY2tzLCBnYWluIEBTdGFja2VkQW1wKjEwMEAlIERhbWFnZSBBbXAgYW5kIGdhaW4gaW1tdW5pdHkgdG8gY3Jvd2QgY29udHJvbC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9UaXRhbnNSZXNvbHZlUmFkaWFudC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJyYWRpYW50LWdpYW50LXNsYXllclwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0dpYW50U2xheWVyUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBHaWFudCBTbGF5ZXJcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIEBEYW1hZ2VBbXAqMTAwQCUgYWRkaXRpb25hbCBEYW1hZ2UgQW1wIGFnYWluc3QgVGFua3MuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fR2lhbnRTbGF5ZXJSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtY3Jvd25ndWFyZFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0Nyb3duZ3VhcmRSYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IENyb3duZ3VhcmRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgU3RhcnQ6IEdhaW4gYSBAU2hpZWxkU2l6ZUAlIG1heCBIZWFsdGggU2hpZWxkIGZvciBAU2hpZWxkRHVyYXRpb25AIHNlY29uZHMuV2hlbiB0aGUgU2hpZWxkIGV4cGlyZXMsIGdhaW4gQFNoaWVsZEJvbnVzQVBAJSBBYmlsaXR5IFBvd2VyLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0Nyb3duZ3VhcmRSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtYmxvb2R0aGlyc3RlclwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0Jsb29kdGhpcnN0ZXJSYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IEJsb29kdGhpcnN0ZXJcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJPbmNlIHBlciBjb21iYXQ6IEF0IEBIZWFsdGhUaHJlc2hvbGRAJSBIZWFsdGgsIGdhaW4gYSBAU2hpZWxkSGVhbHRoUGVyY2VudEAlIG1heCBIZWFsdGggU2hpZWxkIHRoYXQgbGFzdHMgdXAgdG8gQFNoaWVsZER1cmF0aW9uQCBzZWNvbmRzLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX0Jsb29kdGhpcnN0ZXJSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtcmFiYWRvbnMtZGVhdGhjYXBcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9SYWJhZG9uc0RlYXRoY2FwUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBSYWJhZG9uJ3MgRGVhdGhjYXBcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJJdCdzIHdpdG5lc3NlZCAtIGFuZCB1bmxlYXNoZWQgLSBtaXJhY2xlcyBhbmQgY2FsYW1pdGllcyBib3RoLkBURlRVbml0UHJvcGVydHkuOlRGVF9BdWdtZW50X0RlYWRsaWVyQ2Fwc19UUkFLZXlAXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fUmFiYWRvbnNEZWF0aGNhcFJhZGlhbnQuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1qZXdlbGVkLWdhdW50bGV0XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fSmV3ZWxlZEdhdW50bGV0UmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBKZXdlbGVkIEdhdW50bGV0XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBQcmVjaXNpb24uXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fSmV3ZWxlZEdhdW50bGV0UmFkaWFudC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJyYWRpYW50LWdhcmdveWxlLXN0b25lcGxhdGVcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9HYXJnb3lsZVN0b25lcGxhdGVSYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IEdhcmdveWxlIFN0b25lcGxhdGVcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIEBBcm1vclBlckVuZW15QCBBcm1vciBhbmQgQE1SUGVyRW5lbXlAIE1hZ2ljIFJlc2lzdCBmb3IgZWFjaCBlbmVteSB0YXJnZXRpbmcgdGhlIGhvbGRlci5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9HYXJnb3lsZVN0b25lcGxhdGVSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImNoYWxpY2Utb2YtY2hhcml0eVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX0NoYWxpY2VPZlBvd2VyUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQ2hhbGljZSBvZiBDaGFyaXR5XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IHN0YXJ0OiBHcmFudCAgQENoYWxpY2VBUEAgQWJpbGl0eSBQb3dlciBhbmQgQFNwZWxsdmFtcEAlIE9tbml2YW1wIHRvIHRoZSBob2xkZXIgYW5kIGFsbGllcyB3aXRoaW4gMSBoZXggaW4gdGhlIHNhbWUgcm93LuKAi+KAi09tbml2YW1wOiBoZWFsIGZvciBzb21lIG9mIGRhbWFnZSBkZWFsdFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1JhZGlhbnQvQ2hhbGljZV9vZl9Qb3dlcl9SYWRpYW50LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1uYXNob3JzLXRvb3RoXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fTGV2aWF0aGFuUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBOYXNob3IncyBUb290aFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkF0dGFja3MgZ3JhbnQgQEJhc2VNYW5hT25IaXRAIGJvbnVzIE1hbmEsIGluY3JlYXNlZCB0byBATWFuYU9uQ3JpdEAgaWYgdGhleSBjcml0aWNhbGx5IHN0cmlrZS5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDVfSXRlbV9MZXZpYXRoYW5SYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtc3BlYXItb2Ytc2hvamluXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fU3BlYXJPZlNob2ppblJhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgU3BlYXIgb2YgU2hvamluXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQXR0YWNrcyBncmFudCBARmxhdE1hbmFSZXN0b3JlQCBib251cyBNYW5hLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNV9JdGVtX1NwZWFyT2ZTaG9qaW5SYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtZXZlbnNocm91ZFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNV9JdGVtX1NwZWN0cmFsR2F1bnRsZXRSYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IEV2ZW5zaHJvdWRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJAQVJSZWR1Y3Rpb25BbW91bnRAJSBTdW5kZXIgZW5lbWllcyB3aXRoaW4gQEhleFJhbmdlQCBoZXhlcy4gR2FpbiBAQm9udXNSZXNpc3RzQCBBcm1vciBhbmQgTWFnaWMgUmVzaXN0IGZvciB0aGUgZmlyc3QgQEJvbnVzUmVzaXN0RHVyYXRpb25AIHNlY29uZHMgb2YgY29tYmF0LlN1bmRlcjogUmVkdWNlIEFybW9yXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fU3BlY3RyYWxHYXVudGxldFJhZGlhbnQuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1pbmZpbml0eS1lZGdlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fSW5maW5pdHlFZGdlUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBJbmZpbml0eSBFZGdlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBQcmVjaXNpb24uXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fSW5maW5pdHlFZGdlUmFkaWFudC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJyYWRpYW50LWRlYXRoYmxhZGVcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9EZWF0aGJsYWRlUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBEZWF0aGJsYWRlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiSXQgZ2xvd3MgaW4gdGhlIHByZXNlbmNlIG9mIGVuZW1pZXMuIE9yIGZyaWVuZHMuIE9yIGFueXRoaW5nIGFsaXZlLCByZWFsbHkuQFRGVFVuaXRQcm9wZXJ0eS46VEZUX0F1Z21lbnRfVHJhZ2ljYWxCbGFkZV9UUkFLZXlAXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fRGVhdGhibGFkZVJhZGlhbnQuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1hZGFwdGl2ZS1oZWxtXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ1X0l0ZW1fQWRhcHRpdmVIZWxtUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBBZGFwdGl2ZSBIZWxtXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBhbiBhZGRpdGlvbmFsIEBNYW5hUGVyY0luY3JlYXNlKjEwMEAlIE1hbmEgZnJvbSBhbGwgc291cmNlcy4gVGhlIHdlYXJlciBnYWlucyBhbiBhZGRpdGlvbmFsIGJvbnVzIGJhc2VkIG9uIHRoZWlyIFJvbGU6VGFuay9GaWdodGVyOiBHYWluIEBGcm9udGxpbmVSZXNpc3RzQCBBcm1vciBhbmQgTWFnaWMgUmVzaXN0YW5jZS5NYXJrc21hbi9DYXN0ZXI6IEdhaW4gQEJhY2tsaW5lQURBUEAlIEF0dGFjayBEYW1hZ2UgYW5kIEFiaWxpdHkgUG93ZXIuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fQWRhcHRpdmVIZWxtUmFkaWFudC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcnRpZmFjdC1hbnZpbFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fR3JhbnRPcm5uQW52aWxcIixcclxuICAgIFwibmFtZVwiOiBcIkFydGlmYWN0IEFudmlsXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkFydGlmYWN0IEFudmlsXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvQ2hhcmFjdGVycy9URlRfQXJtb3J5S2V5T3Jubi9IVUQvSWNvbnMyRC9URlRfQXJtb3J5S2V5T3Jubl9TcXVhcmUudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJsZXNzZXItbWlycm9yZWQtcGVyc29uYVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfTGVzc2VyTWlycm9yZWRQZXJzb25hXCIsXHJcbiAgICBcIm5hbWVcIjogXCJMZXNzZXIgTWlycm9yZWQgUGVyc29uYVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJTaGFyZSBAU3RhdFNoYXJlUGVyY2VudCoxMDBAJSBvZiB0aGUgaG9sZGVyJ3MgYm9udXMgQXR0YWNrIERhbWFnZSwgQWJpbGl0eSBQb3dlciwgQXR0YWNrIFNwZWVkLCBBcm1vciwgTWFnaWMgUmVzaXN0LCBhbmQgSGVhbHRoIHdpdGggb3RoZXIgTWlycm9yZWQgUGVyc29uYSBob2xkZXJzLkNhbid0IGJlIFJlZm9yZ2VkVW5pcXVlOiBvbmUgcGVyIGNoYW1waW9uXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxNl9BcnRpZmFjdF9MZXNzZXJNaXJyb3JlZFBlcnNvbmEuVEZUX1NldDE2LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiaW5uZXJ2YXRpbmctbG9ja2V0XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9Jbm5lcnZhdGluZ0xvY2tldFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiSW5uZXJ2YXRpbmcgTG9ja2V0XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIgZ2FpbnMgQFBlcmNlbnRNYW5hQCUgb2YgdGhlaXIgdG90YWwgTWFuYSB3aGVuZXZlciB0aGV5J3JlIGhpdCBieSBhbiBhdHRhY2suRWFjaCBjYXN0IHJlc3RvcmVzIEBQZXJjZW50SGVhbHRoQCUgb2YgdGhlIGhvbGRlcidzIG1heCBIZWFsdGggb3ZlciBARHVyYXRpb25AIHNlY29uZHMuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9Jbm5lcnZhdGluZ0xvY2tldC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCIzLWNvc3Qtb3JublwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfQ2hhbXBpb25JdGVtX0Nob3Nlbl9Pcm5uXCIsXHJcbiAgICBcIm5hbWVcIjogXCIzLWNvc3Q6IE9ybm5cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiU3BhY2UgR3Jvb3ZlQmFzdGlvblwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL0NoYXJhY3RlcnMvVEZUMTdfT3Jubi9IVUQvVEZUMTdfT3Jubl9TcXVhcmUuVEZUX1NldDE3LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicHJvdGVjdG9ycy12b3dcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0Zyb3plbkhlYXJ0XCIsXHJcbiAgICBcIm5hbWVcIjogXCJQcm90ZWN0b3IncyBWb3dcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwidGVhci1vZi1nb2RkZXNzXCIsXHJcbiAgICAgIFwiY2hhaW4tdmVzdFwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IFN0YXJ0OiBHYWluIEBDb21iYXRTdGFydE1hbmFAIE1hbmEuQXQgQEhlYWx0aFRocmVzaG9sZEAlIEhlYWx0aCwgZ2FpbiBAVHJpZ2dlck1hbmFAIE1hbmEgYW5kIGEgU2hpZWxkIGVxdWFsIHRvIEBTaGllbGRIZWFsdGhQZXJjZW50QCUgbWF4IEhlYWx0aC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0Zyb3plbkhlYXJ0LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInN1bW1vbi1zdGFtcGVkZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTRfQ3lwaGVyQXJtb3J5SXRlbV9TdW1tb25TdGFtcGVkZVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiU3VtbW9uIFN0YW1wZWRlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiU3VtbW9uIFN0YW1wZWRlXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ1X0l0ZW1fWnpSb3RQb3J0YWxSYWRpYW50LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIjMtcmFuZHVpbnMtb21lbnNcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE0X0N5cGhlckFybW9yeUl0ZW1fM3hSYW5kdWluc1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiMyBSYW5kdWluJ3MgT21lbnNcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiMyBSYW5kdWluJ3MgT21lbnNcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDRfSXRlbV9Pcm5uUmFuZHVpbnNTYW5jdHVtLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIjMtbGlnaHRzaGllbGQtY3Jlc3RzXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxNF9DeXBoZXJBcm1vcnlJdGVtXzN4TGlnaHRzaGllbGRcIixcclxuICAgIFwibmFtZVwiOiBcIjMgTGlnaHRzaGllbGQgQ3Jlc3RzXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIjMgTGlnaHRzaGllbGQgQ3Jlc3RzXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9MaWdodHNoaWVsZENyZXN0LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIjEyLXJhZGlhbnQtaXRlbXNcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE0X0N5cGhlckFybW9yeUl0ZW1fU3BlY2lmaWNSYWRpYW50SXRlbXNcIixcclxuICAgIFwibmFtZVwiOiBcIjEyIHJhZGlhbnQgaXRlbXNcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJDb3ZhbGVudCBTcGFyaywgSmFrJ3NobyB0aGUgUHJvdGVhbiwgQnVsd2FyaydzIE9hdGgsIFNwZWFyIG9mIEhpcmFuYSwgUmFiYWRvbidzIEFzY2VuZGVkIERlYXRoY2FwLCBHbGFtb3JvdXMgR2F1bnRsZXQsIEd1aW5zb28ncyBSZWNrb25pbmcsIFJ1bmFhbidzIFRlbXBlc3QsIEx1bWlub3VzIERlYXRoYmxhZGUsIFplbml0aCBFZGdlLCBGaXN0IG9mIEZhaXJuZXNzLCBFdGVybmFsIFdoaXNwZXJcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9QYWlycy9Eb3VibGVVcF9Bc3Npc3RBcm1vcnlfUmFuZG9tSXRlbV9SYWRpYW50LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiMy1kZWF0aGZpcmUtZ3Jhc3BzXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxNF9DeXBoZXJBcm1vcnlJdGVtXzN4RGVhdGhmaXJlXCIsXHJcbiAgICBcIm5hbWVcIjogXCIzIERlYXRoZmlyZSBHcmFzcHNcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiMyBEZWF0aGZpcmUgR3Jhc3BzXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ5X0l0ZW1fT3JubkRlYXRoZmlyZUdyYXNwLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRoZS1pbmRvbWl0YWJsZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfVGhlSW5kb21pdGFibGVcIixcclxuICAgIFwibmFtZVwiOiBcIlRoZSBJbmRvbWl0YWJsZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyJ3MgTW92ZSBTcGVlZCBpcyBkcmFzdGljYWxseSByZWR1Y2VkLkdhaW4gQEhlYWx0aFBlcmNCb251cyoxMDBAJSBtYXggSGVhbHRoLCBzdHVuIGltbXVuaXR5LCBhbmQgcHVsbCB0aGUgY3VycmVudCB0YXJnZXQgaW50byBtZWxlZSByYW5nZS5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X1RoZUluZG9taXRhYmxlLlRGVF9URlQxNF81LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiaHVsbGNydXNoZXJcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDlfSXRlbV9Pcm5uSHVsbGJyZWFrZXJcIixcclxuICAgIFwibmFtZVwiOiBcIkh1bGxjcnVzaGVyXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBTdGFydDogSWYgdGhlcmUgYXJlIG5vIGFkamFjZW50IGFsbGllcywgZ2FpbiBARXh0cmFIZWFsdGhAIEhlYWx0aCwgQEV4dHJhQURhbmRBUEAlIEF0dGFjayBEYW1hZ2UsIGFuZCBARXh0cmFBRGFuZEFQQCUgQWJpbGl0eSBQb3dlci5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9Pcm5uX0l0ZW1zL1RGVDlfT3Jubkl0ZW1fSHVsbGJyZWFrZXIudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJwdWxzZS1zaWxlbmNlclwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTRfSmhpbkN5YmVybmV0aWNJdGVtX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlB1bHNlIFNpbGVuY2VyXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiRXhlY3V0ZSBlbmVtaWVzIGJlbG93IEBFeGVjdXRlVGhyZXNob2xkUGVyY2VudCoxMDBAJSBIZWFsdGguIEFiaWxpdGllcyBjYW4gY3JpdGljYWxseSBzdHJpa2UuIEdhaW4gQFJlZHVuZGFudENyaXREYW1hZ2UqMTAwQCUgQ3JpdGljYWwgU3RyaWtlIERhbWFnZS5Ub3RhbCBFeGVjdXRpb25zIFRoaXMgUm91bmQ6IEBURlRVbml0UHJvcGVydHkuaXRlbTpURlQxNF9UcmFpdF9DeWJlcm5ldGljX0poaW5JdGVtX1RvdGFsRXhlY3V0aW9uc0BSZWNvbW1lbmRlZCB1c2VyczogSmhpbiBhbmQgWmVyaVwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RGVDE0L1RGVDE0X0l0ZW1fSmhpbkN5YmVybmV0aWNJdGVtX1JhZGlhbnQuVEZUX1NldDE0LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwic2NvcGVkLWhvbG9ib3dcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE0X1ZhcnVzQ3liZXJuZXRpY0l0ZW1fUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiU2NvcGVkIEhvbG9ib3dcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJBdHRhY2tzIHRoYXQgQ3JpdGljYWxseSBTdHJpa2UgZ3JhbnQgQEJvbnVzTWFuYU9uSGl0QCBib251cyBNYW5hLiBBZnRlciBjYXN0aW5nIGFuIEFiaWxpdHksIGdhaW4gQENyaXRDaGFuY2VPbkNhc3RAJSBDcml0aWNhbCBTdHJpa2UgQ2hhbmNlIGZvciBARHVyYXRpb25AIHNlY29uZHMuIFJlY29tbWVuZGVkIHVzZXJzOiBWYXJ1cywgSmhpbiwgYW5kIFplcmlcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9URlQxNC9URlQxNF9JdGVtX1ZhcnVzQ3liZXJuZXRpY0l0ZW1fUmFkaWFudC5URlRfU2V0MTQudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcGV4LWZhbmdzXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxNF9OYWFmaXJpQ3liZXJuZXRpY0l0ZW1fUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQXBleC1GYW5nc1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIldoZW4geW91IGRhbWFnZSBhbiBlbmVteSwgZGVhbCBAU3RvcmVkRGFtYWdlKjEwMEAlIG9mIHRoZSBkYW1hZ2UgdG8gdGhlIG5lYXJlc3QgZW5lbXkgYXMgcGh5c2ljYWwgZGFtYWdlIGFmdGVyIGEgYnJpZWYgZGVsYXkuVG90YWwgU2hvY2t3YXZlIERhbWFnZSBUaGlzIFJvdW5kOiBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUMTRfVHJhaXRfQ3liZXJuZXRpY19OYWFmaXJpSXRlbV9Ub3RhbFNob2Nrd2F2ZURhbWFnZUBSZWNvbW1lbmRlZCB1c2VyczogTmFhZmlyaSwgSmhpbiwgYW5kIFZhcnVzXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVEZUMTQvVEZUMTRfSXRlbV9OYWFmaXJpQ3liZXJuZXRpY0l0ZW1fUmFkaWFudC5URlRfU2V0MTQudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJoaWphY2tlZC1jeWJlcmNvaWxcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE0X1NlanVhbmlDeWJlcm5ldGljSXRlbV9SYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJIaWphY2tlZCBDeWJlcmNvaWxcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJBYmlsaXRpZXMgYW5kIEF0dGFja3MgbWFyayBlbmVtaWVzIGZvciBATWFya0R1cmF0aW9uQCBzZWNvbmRzLiBIZWFsIGZvciBASGVhbGluZ1BlcmNlbnQqMTAwQCUgb2YgZGFtYWdlIGRlYWx0IHRvIG1hcmtlZCBlbmVtaWVzLlRvdGFsIEhlYWxpbmcgVGhpcyBSb3VuZDogQFRGVFVuaXRQcm9wZXJ0eS5pdGVtOlRGVDE0X1RyYWl0X0N5YmVybmV0aWNfU2VqdWFuaUl0ZW1fVG90YWxIZWFsaW5nQFJlY29tbWVuZGVkIHVzZXJzOiBTZWp1YW5pLCBKYXgsIGFuZCBNb3JkZWthaXNlclwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RGVDE0L1RGVDE0X0l0ZW1fU2VqdWFuaUN5YmVybmV0aWNJdGVtX1JhZGlhbnQuVEZUX1NldDE0LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiZnVsbHktY2hhcmdlZC1mbHV4LWNhcGFjaXRvclwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTRfWmVyaUN5YmVybmV0aWNJdGVtX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIkZ1bGx5LUNoYXJnZWQgRmx1eCBDYXBhY2l0b3JcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJFdmVyeSBvdGhlciBhdHRhY2sgaXMgY2hhcmdlZCwgZGVhbGluZyBAU2hvY2tEYW1hZ2UqMTAwQCUgb2YgdGhlIHRhcmdldCdzIG1heCBoZWFsdGggYXMgcGh5c2ljYWwgZGFtYWdlIGFuZCByZWR1Y2VzIHRoZWlyIEFybW9yIGJ5IEBGbGF0QXJtb3JSZWR1Y3Rpb25ALlRvdGFsIENoYXJnZSBEYW1hZ2UgVGhpcyBSb3VuZDogQFRGVFVuaXRQcm9wZXJ0eS5pdGVtOlRGVDE0X1RyYWl0X0N5YmVybmV0aWNfWmVyaUl0ZW1fVG90YWxMaWdodG5pbmdEYW1hZ2VAUmVjb21tZW5kZWQgdXNlcnM6IFplcmkgYW5kIE5hYWZpcmlcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9URlQxNC9URlQxNF9JdGVtX1plcmlDeWJlcm5ldGljSXRlbV9SYWRpYW50LlRGVF9TZXQxNC50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIm51bGxpZmllci1sYW50ZXJuXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxNF9KYXhDeWJlcm5ldGljSXRlbV9SYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJOdWxsaWZpZXIgTGFudGVyblwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQEJvbnVzUGVyY2VudEhQKjEwMEAlIGhlYWx0aC4gRXZlcnkgQEludGVydmFsQCBzZWNvbmRzLCBkZWFsIEBQZXJjSGVhbHRoRGFtYWdlKjEwMEAlIG9mIHRoZSBob2xkZXIncyBtYXggaGVhbHRoIGFzIG1hZ2ljIGRhbWFnZSB0byBhbGwgZW5lbWllcyB3aXRoaW4gQFJhZGl1c0AtaGV4LlRvdGFsIERhbWFnZSBEZWFsdCBUaGlzIFJvdW5kOiBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUMTRfVHJhaXRfQ3liZXJuZXRpY19KYXhJdGVtX1RvdGFsRGFtYWdlUmVmbGVjdGVkQFJlY29tbWVuZGVkIHVzZXJzOiBKYXgsIE1vcmRla2Fpc2VyLCBhbmQgU2VqdWFuaVwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RGVDE0L1RGVDE0X0l0ZW1fSmF4Q3liZXJuZXRpY0l0ZW1fUmFkaWFudC5URlRfU2V0MTQudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJoYXJtb25pemVkLWNoYXNzaXNcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE0X01vcmRla2Fpc2VyQ3liZXJuZXRpY0l0ZW1fUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiSGFybW9uaXplZCBDaGFzc2lzXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQWxsIFNoaWVsZHMgYXJlIEBTaGllbGRFZmZlY3RpdmVuZXNzUGVyY2VudCoxMDBAJSBtb3JlIGVmZmVjdGl2ZSBvbiB0aGUgaG9sZGVyLiBFdmVyeSBzZWNvbmQsIHNpcGhvbiBASGVhbHRoU2lwaG9uQW10KjEwMEAlIG9mIHRoZSBvd25lcidzIG1heCBIZWFsdGggZnJvbSB0aGUgbmVhcmVzdCBATnVtRW5lbWllc0AgZW5lbWllcyBhbmQgY29udmVydCBpdCB0byBhIFNoaWVsZCBmb3IgQFNoaWVsZER1cmF0aW9uQCBzZWNvbmRzLlNoaWVsZGluZyBUaGlzIFJvdW5kOiBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUMTRfVHJhaXRfQ3liZXJuZXRpY19Nb3JkZWthaXNlckl0ZW1fVG90YWxTaGllbGRpbmdAUmVjb21tZW5kZWQgdXNlcnM6IE1vcmRla2Fpc2VyLCBKYXgsIGFuZCBTZWp1YW5pXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVEZUMTQvVEZUMTRfSXRlbV9Nb3JkZWthaXNlckN5YmVybmV0aWNJdGVtX1JhZGlhbnQuVEZUX1NldDE0LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiZXRlcm5hbC1tb25hcmNocy1jcm93blwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTJfSXRlbV9GYWVyaWVfUXVlZW5zQ3Jvd25SYWRpYW50XCIsXHJcbiAgICBcIm5hbWVcIjogXCJFdGVybmFsIE1vbmFyY2gncyBDcm93blwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkFmdGVyIGRlYWxpbmcgZGFtYWdlIEBNYXhOdW1TdGFja3NAIHRpbWVzLCBnYWluIEBURlRVbml0UHJvcGVydHkuaXRlbTpURlQxMl9GYWVyaWVfRGFtYWdlQW1wQCUgIGZvciB0aGUgcmVzdCBvZiBjb21iYXQuQWZ0ZXIgZGVhbGluZyBkYW1hZ2UgQFJhZGlhbnRNYXhTdGFja3NAIHRpbWVzLCBnYWluIEBSYWRpYW50TWF4SGVhbHRoKjEwMEAlIG1heGltdW0gSGVhbHRoLCBAUmFkaWFudE9tbml2YW1wKjEwMEAlIE9tbml2YW1wLCBhbmQgQFJhZGlhbnREYW1hZ2VBbXAqMTAwQCUgZGFtYWdlIGFtcC5Pbmx5IEZhZXJpZXMgY2FuIGhvbGQgdGhpcyBpdGVtLkJlbmNoIHRoZSBjaGFtcGlvbiB0byByZW1vdmUgaXQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVEZUMTIvVEZUMTJfRmFlcmllQ3Jvd25fUmFkaWFudC5URlRfU2V0MTIudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcm1vci1vZi1ldGVybmFsLWRldm90aW9uXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxMl9JdGVtX0ZhZXJpZV9Bcm1vclJhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIkFybW9yIG9mIEV0ZXJuYWwgRGV2b3Rpb25cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIEBIZWFsU2hpZWxkUG93ZXIqMTAwQCUgaW5jcmVhc2VkIGhlYWxpbmcgYW5kIHNoaWVsZGluZy4gSGVhbCBmb3IgQFF1ZWVuSGVhbFJhdGlvKjEwMEAlIG9mIHRoZSBRdWVlbidzIGRhbWFnZSBkZWFsdC5Pbmx5IEZhZXJpZXMgY2FuIGhvbGQgdGhpcyBpdGVtLkJlbmNoIHRoZSBjaGFtcGlvbiB0byByZW1vdmUgaXQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVEZUMTIvVEZUMTJfRmFlcmllUXVlZW5ndWFyZEFybW9yX1JhZGlhbnQuVEZUX1NldDEyLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwic3Bpcml0LXZpc2FnZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fUmVkZW1wdGlvblwiLFxyXG4gICAgXCJuYW1lXCI6IFwiU3Bpcml0IFZpc2FnZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJ0ZWFyLW9mLWdvZGRlc3NcIixcclxuICAgICAgXCJnaWFudHMtYmVsdFwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwiUmVnZW5lcmF0ZSBATWlzc2luZ0hlYWx0aEhlYWwqMTAwQCUgb2YgbWlzc2luZyBIZWFsdGggZWFjaCBzZWNvbmQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9TcGlyaXRWaXNhZ2VSUi5URlRfVEZUMTRfNS50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImNob25jY3MtcHJvd2xlcnMtY2xhd1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUOV9JdGVtX09ybm5EdXNrYmxhZGVPZkRyYWt0aGFyclwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQ2hvbmNjJ3MgUHJvd2xlcidzIENsYXdcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IFN0YXJ0OiBMZWFwIHRvIHRoZSBlbmVteSBiYWNrbGluZS4gRGFtYWdlIGZyb20gYW4gQWJpbGl0eSBjYW4gY3JpdGljYWxseSBzdHJpa2UuW1VuaXF1ZSAtIG9ubHkgMSBwZXIgY2hhbXBpb25dXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvT3Jubl9JdGVtcy9URlQ5X09ybm5JdGVtX1Byb3dsZXJzQ2xhdy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInNoYWRvdy1wdXBwZXRcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X1NoYWRvd1B1cHBldFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiU2hhZG93IFB1cHBldFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJTcGF3biBhIGNsb25lIHRoYXQgY29waWVzIHRoZSBob2xkZXIncyBpdGVtcy4gVGhlIGNsb25lIGhhcyBAQ2xvbmVQZXJjZW50SGVhbHRoKjEwMEAlIG1heCBIZWFsdGggYW5kIGRlYWxzIEBDbG9uZVBlcmNlbnREYW1hZ2UqMTAwQCUgZGFtYWdlLltVbmlxdWUgLSBvbmx5IDEgcGVyIGNoYW1waW9uXVwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTZfQXJ0aWZhY3RfU2hhZG93UHVwcGV0LlRGVF9TZXQxNi50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImVra29zLXBhdGllbmNlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0FydGlmYWN0X0Vra29BcnRpZmFjdFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiRWtrbydzIFBhdGllbmNlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRvdGFsIEFiaWxpdHkgZGFtYWdlIGlzIGluY3JlYXNlZCBieSBAQWJpbGl0eURBKjEwMEAlLCBidXQgaXMgZGVhbHQgb3ZlciBARHVyYXRpb25AIHNlY29uZHMgaW5zdGVhZC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0l0ZW1fQXJ0aWZhY3RfRWtrb1BhdGllbmNlLlRGVF9TZXQxNy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIndpdGhlcmVkLXJlbGljXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9XaXRoZXJpbmdSZWxpY1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiV2l0aGVyZWQgUmVsaWNcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IFN0YXJ0OiBJbmNyZWFzZSB0aGUgaG9sZGVyJ3MgbWF4IEhlYWx0aCBieSBARmxhdE1heEhlYWx0aEAgYnV0IGtlZXAgdGhlaXIgY3VycmVudCBIZWFsdGggdGhlIHNhbWUuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9XaXRoZXJpbmdSZWxpYy5URlRfU2V0MTYudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJtYW5hemFuZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNF9JdGVtX09ybm5NdXJhbWFuYVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiTWFuYXphbmVcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQWZ0ZXIgY2FzdGluZyB0aGUgZmlyc3QgdGltZSBpbiBjb21iYXQsIGdhaW4gQE1hbmFSZXN0b3JlQCBNYW5hIG92ZXIgQE1hbmFEdXJhdGlvbkAgc2Vjb25kcy5bVW5pcXVlIC0gb25seSAxIHBlciBjaGFtcGlvbl1cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDRfSXRlbV9Pcm5uTXVyYW1hbmEuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiZ29sZG1hbmNlcnMtc3RhZmZcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVHb2xkbWFuY2Vyc1N0YWZmXCIsXHJcbiAgICBcIm5hbWVcIjogXCJHb2xkbWFuY2VyJ3MgU3RhZmZcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR3JhbnQgIEBBYmlsaXR5UG93ZXJQZXJHb2xkQCBBYmlsaXR5IFBvd2VyIHBlciAgZ29sZCBpbiB5b3VyIGJhbmsgKHVwIHRvICBAQWJpbGl0eVBvd2VyR29sZE1heEAgZ29sZCkgYW5kIGEgQE9uS2lsbFByb2NDaGFuY2UqMTAwQCUgY2hhbmNlIHRvIGRyb3AgIEBPbktpbGxQcm9jR29sZEAgZ29sZCBvbiBlbmVteSBraWxsLkdvbGQgZ2VuZXJhdGVkIHRoaXMgZ2FtZTogQFRGVFVuaXRQcm9wZXJ0eS5pdGVtOlRGVF9JdGVtX0dvbGRHZW5lcmF0ZWRAXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvT3Jubl9JdGVtcy9Hb2xkbWFuY2Vyc1N0YWZmLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiZGlhbW9uZC1oYW5kc1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUN19JdGVtX1NoaW1tZXJzY2FsZURpYW1vbmRIYW5kc19IUlwiLFxyXG4gICAgXCJuYW1lXCI6IFwiRGlhbW9uZCBIYW5kc1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJPbmNlIHBlciBjb21iYXQ6IEF0IEBIUFRocmVzaG9sZDEqMTAwQCUgSGVhbHRoLCBiZWNvbWUgaW52dWxuZXJhYmxlIGZvciBAQmFzZURhbWFnZUltbXVuaXR5VGltZUAgc2Vjb25kcyBhbmQgZ3JhbnQgIEBHb2xkUGVySW1tdW5pdHlQcm9jQCBnb2xkLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL09ybm5fSXRlbXMvVEZUMTBfRGlhbW9uZEhhbmRzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwidHJpY2tzdGVycy1nbGFzc1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUOV9JdGVtX09ybm5Ucmlja3N0ZXJzR2xhc3NcIixcclxuICAgIFwibmFtZVwiOiBcIlRyaWNrc3RlcidzIEdsYXNzXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlN1bW1vbiBhIGNsb25lIHdpdGggQEhlYWx0aFBlcmNlbnRAJSBiYXNlIEhlYWx0aCBhbmQgK0BNYW5hSW5jcmVhc2UqMTAwQCUgbWF4IE1hbmEuIFlvdSBjYW5ub3QgZXF1aXAgaXRlbXMgdG8gdGhlIGNsb25lLlRoZSBjbG9uZSBiZW5lZml0cyBmcm9tIGFjdGl2ZSB0cmFpdHNbVW5pcXVlIC0gb25seSAxIHBlciBjaGFtcGlvbl1cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDlfSXRlbV9Pcm5uVHJpY2tzdGVyc0dsYXNzLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRhY3RpY2lhbnMtY2FwZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fVGFjdGljaWFuc1JpbmdcIixcclxuICAgIFwibmFtZVwiOiBcIlRhY3RpY2lhbidzIENhcGVcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwic3BhdHVsYVwiLFxyXG4gICAgICBcImZyeWluZy1wYW5cIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIllvdXIgdGVhbSBnYWlucyArQE1heEFybXlTaXplSW5jcmVhc2VAIG1heCB0ZWFtIHNpemUuQFBlcmNlbnRHb2xkQ2hhbmNlQCUgY2hhbmNlIHRvIGRyb3AgMSBnb2xkIGFmdGVyIEBUaW1lckAgc2Vjb25kcyBvZiBjb21iYXQuXFxcIi4uLmFuZCBhIGJpdCBvZiBMdWNrLlxcXCJcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX1RhY3RpY2lhbnNSaW5nLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImV0ZXJuYWwtcGFjdFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfRXRlcm5hbFBhY3RcIixcclxuICAgIFwibmFtZVwiOiBcIkV0ZXJuYWwgUGFjdFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgc3RhcnQ6IEZvcm0gYSBwYWN0IHdpdGggdGhlIGhpZ2hlc3QgSGVhbHRoIGFsbGllZCBjaGFtcGlvbiwgaWYgdGhleSBkaWUsIGdhaW4gQE1hbmFSZWdlblRvR3JhbnRAIE1hbmEgcmVnZW4gYW5kIEBBUFRvR3JhbnRAJSBBYmlsaXR5IFBvd2VyLldoZW4gdGhlIGFsbHkgdXNlcyB0aGVpciBhYmlsaXR5LCBnYWluIEBNYW5hVG9HcmFudEAgTWFuYS4gRXZlcnkgQFNoaWVsZENhZGVuY2VAIHNlY29uZHMsIHNoaWVsZCB5b3VyIGFsbHkgZm9yIEBQZXJjZW50QVBTaGllbGQqMTAwQCUgb2YgdGhlIGhvbGRlcidzIEFiaWxpdHkgUG93ZXIuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxNl9BcnRpZmFjdF9FdGVybmFsUGFjdC5URlRfU2V0MTYudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ0aGllZnMtZ2xvdmVzXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9UaGllZnNHbG92ZXNcIixcclxuICAgIFwibmFtZVwiOiBcIlRoaWVmJ3MgR2xvdmVzXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcInNwYXJyaW5nLWdsb3Zlc1wiLFxyXG4gICAgICBcInNwYXJyaW5nLWdsb3Zlc1wiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwiRWFjaCByb3VuZDogRXF1aXAgMiByYW5kb20gaXRlbXMuW0NvbnN1bWVzIDMgaXRlbSBzbG90cy5dQFRGVFVuaXRQcm9wZXJ0eS46VEZUX0JpbmRPbkVxdWlwVFJBQFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fVGhpZWZzR2xvdmVzLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImd1aW5zb29zLXJhZ2VibGFkZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fR3VpbnNvb3NSYWdlYmxhZGVcIixcclxuICAgIFwibmFtZVwiOiBcIkd1aW5zb28ncyBSYWdlYmxhZGVcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwicmVjdXJ2ZS1ib3dcIixcclxuICAgICAgXCJuZWVkbGVzc2x5LWxhcmdlLXJvZFwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBAQXR0YWNrU3BlZWRQZXJTdGFja0AlIHN0YWNraW5nIEF0dGFjayBTcGVlZCBldmVyeSBzZWNvbmQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9HdWluc29vc1JhZ2VibGFkZS5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJpb25pYy1zcGFya1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fSW9uaWNTcGFya1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiSW9uaWMgU3BhcmtcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIixcclxuICAgICAgXCJuZWdhdHJvbi1jbG9ha1wiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQE1SU2hyZWRAJSBTaHJlZCBlbmVtaWVzIHdpdGhpbiBASGV4UmFuZ2VAIGhleGVzLiBXaGVuIGVuZW1pZXMgY2FzdCBhbiBBYmlsaXR5LCBkZWFsIG1hZ2ljIGRhbWFnZSBlcXVhbCB0byBATWFuYVJhdGlvQCUgb2YgdGhlIE1hbmEgc3BlbnRTaHJlZDogUmVkdWNlIE1hZ2ljIFJlc2lzdFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fSW9uaWNTcGFyay5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJoZWxsZmlyZS1oYXRjaGV0XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9IZWxsZmlyZUhhdGNoZXRcIixcclxuICAgIFwibmFtZVwiOiBcIkhlbGxmaXJlIEhhdGNoZXRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQXR0YWNrcyBkZWFsIEBNYXhIZWFsdGhQZXJjZW50RGFtYWdlKjEwMEAlIG9mIHRoZSBob2xkZXIncyBtYXggSGVhbHRoIGFzIGJvbnVzIHBoeXNpY2FsIGRhbWFnZS4gRm9yIGV2ZXJ5IEBNaXNzaW5nSGVhbHRoUGVyY2VudCoxMDBAJSBtaXNzaW5nIEhlYWx0aCwgZ2FpbiBAQVNQZXJNaXNzaW5nSGVhbHRoUGVyY2VudCoxMDBAJSBBdHRhY2sgU3BlZWQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9IZWxsZmlyZUhhdGNoZXQuVEZUX1NldDE2LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwic3RlcmFrcy1nYWdlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9TdGVyYWtzR2FnZVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiU3RlcmFrJ3MgR2FnZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJiZi1zd29yZFwiLFxyXG4gICAgICBcImdpYW50cy1iZWx0XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJBdCBASGVhbHRoVGhyZXNob2xkQCUgSGVhbHRoLCBnYWluIGEgU2hpZWxkIGVxdWFsIHRvIEBQZXJjZW50SGVhbHRoU2hpZWxkKjEwMEAlIG9mIHRoZSB3ZWFyZXIncyBtYXhpbXVtIEhlYWx0aCB0aGF0IHJhcGlkbHkgZGVjYXlzIG92ZXIgQFNoaWVsZER1cmF0aW9uQCBzZWNvbmRzLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fU3RlcmFrc0dhZ2UuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiZHJhZ29ucy1jbGF3XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9EcmFnb25zQ2xhd1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiRHJhZ29uJ3MgQ2xhd1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJuZWdhdHJvbi1jbG9ha1wiLFxyXG4gICAgICBcIm5lZ2F0cm9uLWNsb2FrXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIEBQZXJjZW50TWF4SFAqMTAwQCUgbWF4IGhlYWx0aC5FdmVyeSBASGVhbHRoUmVnZW5JbnRlcnZhbEAgc2Vjb25kcywgaGVhbCBAUGVyY2VudEhlYWx0aERhbWFnZUAlIG1heCBIZWFsdGguXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9EcmFnb25zQ2xhdy5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJyYWRpYW50LWx1Y2t5LWl0ZW0tY2hlc3RcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9Db25zdW1hYmxlX1JlY29tbWVuZGVkQXJtb3J5UmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBMdWNreSBJdGVtIENoZXN0XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiVXNlIG9uIGEgY2hhbXBpb24gdG8gb3BlbiBhbiBhcm1vcnkgb2YgUmFkaWFudCBpdGVtcyBlc3BlY2lhbGx5IHN1aXRlZCBmb3IgdGhlbS5UaGVzZSBpdGVtcyBhcmUgYmFzZWQgb24gdGhlIGNoYW1waW9uJ3MgcmVjb21tZW5kZWQgaXRlbXMuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfQ29uc3VtYWJsZV9MdWNreUl0ZW1DaGVzdC50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtZ2FtYmxlcnMtYmxhZGVcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVHYW1ibGVyc0JsYWRlX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgR2FtYmxlcidzIEJsYWRlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR3JhbnQgIEBBdHRhY2tTcGVlZFBlckdvbGQqMTAwQCUgYm9udXMgQXR0YWNrIFNwZWVkIHBlciAgZ29sZCBpbiB5b3VyIGJhbmsgKHVwIHRvICBAQXR0YWNrU3BlZWRHb2xkTGltaXRAIGdvbGQpLiBFYWNoIGF0dGFjayBoYXMgYSBAQ2hhbmNlVG9Qcm9jKjEwMEAlIGNoYW5jZSB0byBkcm9wICBAR29sZFBlclByb2NAIGdvbGQuR29sZCBnZW5lcmF0ZWQgdGhpcyBnYW1lOiBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUX0l0ZW1fR29sZEdlbmVyYXRlZEBcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU2V0N19TaGltbWVyc2NhbGUvU2hpbW1lcnNjYWxlX0dvbGRDb2xsZWN0b3JfUmFkaWFudC50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtZ29sZG1hbmNlcnMtc3RhZmZcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVHb2xkbWFuY2Vyc1N0YWZmX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgR29sZG1hbmNlcidzIFN0YWZmXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR3JhbnQgIEBBYmlsaXR5UG93ZXJQZXJHb2xkQCBBYmlsaXR5IFBvd2VyIHBlciAgZ29sZCBpbiB5b3VyIGJhbmsgKHVwIHRvICBAQWJpbGl0eVBvd2VyR29sZE1heEAgZ29sZCkgYW5kIGEgQE9uS2lsbFByb2NDaGFuY2UqMTAwQCUgY2hhbmNlIHRvIGRyb3AgIEBPbktpbGxQcm9jR29sZEAgZ29sZCBvbiBlbmVteSBraWxsLkdvbGQgZ2VuZXJhdGVkIHRoaXMgZ2FtZTogQFRGVFVuaXRQcm9wZXJ0eS5pdGVtOlRGVF9JdGVtX0dvbGRHZW5lcmF0ZWRAXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NldDdfU2hpbW1lcnNjYWxlL1NoaW1tZXJzY2FsZV9Hb2xkbWFuY2Vyc1N0YWZmX1JhZGlhbnQudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJyYWRpYW50LWRldGVybWluZWQtaW52ZXN0b3JcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVEZXRlcm1pbmVkSW52ZXN0b3JfUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBEZXRlcm1pbmVkIEludmVzdG9yXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQWZ0ZXIgZHlpbmcgZHVyaW5nIGNvbWJhdCBAU3RhY2tMaW1pdEAgdGltZXMsIHRoaXMgaXRlbSBpcyBkZXN0cm95ZWQuIFVwb24gZGVzdHJ1Y3Rpb24sIGdyYW50IHRoZSBpdGVtIFJhZGlhbnQgRGlhbW9uZCBIYW5kcywgMSBDaGFtcGlvbiBEdXBsaWNhdG9yLCBhbmQgIEBHb2xkR3JhbnRlZEAgZ29sZC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU2V0N19TaGltbWVyc2NhbGUvU2hpbW1lcnNjYWxlX0RldGVybWluZWRJbnZlc3Rvcl9SYWRpYW50LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1jcm93bi1vZi1jaGFtcGlvbnNcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVDcm93bk9mQ2hhbXBpb25zX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgQ3Jvd24gb2YgQ2hhbXBpb25zXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiRXZlcnkgQFNlY29uZHNGb3JFbXBvd2VyZWRBdHRhY2tAIHNlY29uZHMsIHRoZSBuZXh0IGF0dGFjayBkZWFscyBAQXR0YWNrR29sZE11bHRpcGxpZXJAeCB0aGUgYW1vdW50IG9mICBnb2xkIGluIHlvdXIgYmFuayBpbiB0cnVlIGRhbWFnZS5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU2V0N19TaGltbWVyc2NhbGUvU2hpbW1lcnNjYWxlX0Nyb3duT2ZDaGFtcGlvbnNfUmFkaWFudC50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtZHJhdmVucy1heGVcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVEcmF2ZW5zQXhlX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgRHJhdmVuJ3MgQXhlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2FpbiAgQEF0dGFja0RhbWFnZVBlckdvbGRAJSBBdHRhY2sgRGFtYWdlIHBlciAgZ29sZCBpbiB5b3VyIGJhbmsgKHVwIHRvICBAQXR0YWNrRGFtYWdlR29sZExpbWl0QCBnb2xkKS5BdHRhY2tzIGdyYW50IEBTdGFja3NQZXJBdHRhY2tAIHN0YWNrLCB1cCB0byBAQ2FzaG91dFN0YWNrc0AgdGltZXMuIEF0IGZ1bGwgc3RhY2tzLCBncmFudCAgQENhc2hvdXRHb2xkQCBnb2xkIGFuZCBAQ2FzaG91dENvbXBvbmVudHNAIGl0ZW0gY29tcG9uZW50KHMpLkdvbGQgZ2VuZXJhdGVkIHRoaXMgZ2FtZTogQFRGVFVuaXRQcm9wZXJ0eS5pdGVtOlRGVF9JdGVtX0dvbGRHZW5lcmF0ZWRAXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NldDdfU2hpbW1lcnNjYWxlL1NoaW1tZXJzY2FsZV9EcmF2ZW5zQXhlX1JhZGlhbnQudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJyYWRpYW50LW9yYi1vZi1ncmVlZFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUN19JdGVtX1NoaW1tZXJzY2FsZUhpZ2hTdGFrZXNfUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBPcmIgb2YgR3JlZWRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJSaXNreSEgU3VtbW9uIHRoZSBHb2xkZW4gRHJhZ29uIEJhbmsuIExvc2luZyBjb21iYXQgc3RvcmVzIGdvbGQgaW4gdGhlIGJhbmsgYmFzZWQgb24geW91ciBsb3NzIHN0cmVhay4gV2luIHRvIGNvbnZlcnQgaXQgaW50byBsb290IGFuZCBnb2xkLkdvbGQgZ2VuZXJhdGVkIGJ5IFNoaW1tZXJzY2FsZSBpdGVtcyBnZXRzIHN0b3JlZCBpbiB0aGUgR29sZGVuIERyYWdvbiBCYW5rIHdpdGggYSBAQm9udXNHb2xkUmF0aW8qMTAwQCUgY29udmVyc2lvbiByYXRlLlRoZSBlcXVpcHBlZCB1bml0IGhhcyBhIEBHb2xkQ2hhbmNlQCUgY2hhbmNlIHRvIGdyYW50IEBQb2ludHNQZXJLaWxsQCBnb2xkIG9uIHRha2Vkb3ducy5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU2V0N19TaGltbWVyc2NhbGUvU2hpbW1lcnNjYWxlX0FtdWxldE9mR3JlZWRfUmFkaWFudC50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtbW9ndWxzLW1haWxcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDdfSXRlbV9TaGltbWVyc2NhbGVNb2d1bHNNYWlsX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgTW9ndWwncyBNYWlsXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJyYWRpYW50XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR3JhbnRzIEBCYXNlUmVzaXN0c1BlclN0YWNrQCBBcm1vciwgQEJhc2VSZXNpc3RzUGVyU3RhY2tAIE1hZ2ljIFJlc2lzdCwgYW5kIEBCYXNlSGVhbHRoUGVyU3RhY2tAIEhlYWx0aCB3aGVuIHRha2luZyBkYW1hZ2UsIHN0YWNraW5nIHVwIHRvIEBTdGFja0NhcEAgdGltZXMuQXQgZnVsbCBzdGFja3MsIGdyYW50ICBAR29sZEF0RnVsbFN0YWNrc0AgZ29sZC5Hb2xkIGdlbmVyYXRlZCB0aGlzIGdhbWU6IEBURlRVbml0UHJvcGVydHkuaXRlbTpURlRfSXRlbV9Hb2xkR2VuZXJhdGVkQFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TZXQ3X1NoaW1tZXJzY2FsZS9TaGltbWVyc2NhbGVfTW9ndWxzTWFpbF9SYWRpYW50LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1kaWFtb25kLWhhbmRzXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ3X0l0ZW1fU2hpbW1lcnNjYWxlRGlhbW9uZEhhbmRzX1JhZGlhbnRcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgRGlhbW9uZCBIYW5kc1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIk9uY2UgcGVyIGNvbWJhdDogQXQgQEhQVGhyZXNob2xkMSoxMDBAJSBIZWFsdGggYW5kIEBIUFRocmVzaG9sZDIqMTAwQCUgSGVhbHRoLCBiZWNvbWUgaW52dWxuZXJhYmxlIGZvciBAQmFzZURhbWFnZUltbXVuaXR5VGltZUAgc2Vjb25kIGFuZCBncmFudCAgQEdvbGRQZXJJbW11bml0eVByb2NAIGdvbGQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NldDdfU2hpbW1lcnNjYWxlL1NoaW1tZXJzY2FsZV9EaWFtb25kSGFuZHNfUmFkaWFudC50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJhZGlhbnQtbmVlZGxlc3NseS1iaWctZ2VtXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ3X0l0ZW1fU2hpbW1lcnNjYWxlSGVhcnRPZkdvbGRfUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUmFkaWFudCBOZWVkbGVzc2x5IEJpZyBHZW1cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJJZiB0aGUgaG9sZGVyIGlzIGFsaXZlIGFmdGVyIEBQcm9jVGltZUluU2Vjb25kc0Agc2Vjb25kcywgeW91ciB0ZWFtIGRlYWxzIEBCb251c0RhbWFnZVBlckdvbGQqMTAwQCUgbW9yZSBkYW1hZ2UgcGVyICBnb2xkIGluIHlvdXIgYmFuayAodXAgdG8gIEBHb2xkTGltaXRAIGdvbGQpLiBGb3IgZXZlcnkgQFVuaXRzUGVyR29sZEAgdW5pdHMgYWxpdmUgd2hlbiB0aGlzIGhhcHBlbnMsIGdhaW4gQEdvbGRBbW91bnRAIGdvbGQuR29sZCBnZW5lcmF0ZWQgdGhpcyBnYW1lOiBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUX0l0ZW1fR29sZEdlbmVyYXRlZEBcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU2V0N19TaGltbWVyc2NhbGUvU2hpbW1lcnNjYWxlX0hlYXJ0T2ZHb2xkX1JhZGlhbnQudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJsaWNoLWJhbmVcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0xpY2hCYW5lXCIsXHJcbiAgICBcIm5hbWVcIjogXCJMaWNoIEJhbmVcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlcidzIGZpcnN0IGF0dGFjayBhZnRlciBlYWNoIEFiaWxpdHkgY2FzdCBkZWFscyBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUX0l0ZW1fQXJ0aWZhY3RfTGljaEJhbmVfRGFtYWdlQCBib251cyBtYWdpYyBkYW1hZ2UuRGFtYWdlIGluY3JlYXNlcyBiYXNlZCBvbiBTdGFnZS5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9Pcm5uX0l0ZW1zL1RGVF9JdGVtX0FydGlmYWN0X0xpY2hCYW5lLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwic3RyaWtlcnMtZmxhaWxcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX1Bvd2VyR2F1bnRsZXRcIixcclxuICAgIFwibmFtZVwiOiBcIlN0cmlrZXIncyBGbGFpbFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJnaWFudHMtYmVsdFwiLFxyXG4gICAgICBcInNwYXJyaW5nLWdsb3Zlc1wiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQ3JpdGljYWwgU3RyaWtlcyBncmFudCBAQnVmZkRhbWFnZUFtcCoxMDBAJSBEYW1hZ2UgQW1wIGZvciBARHVyYXRpb25AIHNlY29uZHMsIHN0YWNraW5nIHVwIHRvIEBNYXhTdGFja3NAIHRpbWVzLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fUG93ZXJHYXVudGxldC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJmb3JiaWRkZW4taWRvbFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfRm9yYmlkZGVuSWRvbFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiRm9yYmlkZGVuIElkb2xcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiU2hpZWxkcyBoYXZlIEBQZXJjZW50U2hpZWxkQ29udmVyc2lvbkAlIG9mIHRoZWlyIHZhbHVlIGNvbnZlcnRlZCB0byBtYXggSGVhbHRoIGluc3RlYWQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9Gb3JiaWRkZW5JZG9sLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImFyYml0ZXItZW1ibGVtXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0Zhdm9yZWRFbWJsZW1JdGVtXCIsXHJcbiAgICBcIm5hbWVcIjogXCJBcmJpdGVyIEVtYmxlbVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJzcGF0dWxhXCIsXHJcbiAgICAgIFwibmVnYXRyb24tY2xvYWtcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIgZ2FpbnMgdGhlIEFyYml0ZXIgdHJhaXQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX0FyYml0ZXIuVEZUX1NldDE3LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwic25pcGVyLWVtYmxlbVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9SYW5nZWRUcmFpdEVtYmxlbUl0ZW1cIixcclxuICAgIFwibmFtZVwiOiBcIlNuaXBlciBFbWJsZW1cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIgZ2FpbnMgdGhlIFNuaXBlciB0cmFpdCBhbmQgK0BIZXhSYW5nZUluY3JlYXNlQCBBdHRhY2sgUmFuZ2UuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX1NuaXBlci5URlRfU2V0MTcudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ2YW5ndWFyZC1lbWJsZW1cIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fU2hpZWxkVGFua0VtYmxlbUl0ZW1cIixcclxuICAgIFwibmFtZVwiOiBcIlZhbmd1YXJkIEVtYmxlbVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJmcnlpbmctcGFuXCIsXHJcbiAgICAgIFwibmVnYXRyb24tY2xvYWtcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIgZ2FpbnMgdGhlIFZhbmd1YXJkIHRyYWl0LiBHYWluIEBBUEdhaW5AJSBBYmlsaXR5IFBvd2VyIHdoZW5ldmVyIGFuIGFsbHkgZ2FpbnMgYSBzaGllbGQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX1Zhbmd1YXJkLlRGVF9TZXQxNy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImFuaW1hLWVtYmxlbVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9BbmltYVNxdWFkRW1ibGVtSXRlbVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQW5pbWEgRW1ibGVtXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBBbmltYSB0cmFpdC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQxNy9URlQxN19FbWJsZW1fQW5pbWFUZWNoLlRGVF9TZXQxNy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRpbWVicmVha2VyLWVtYmxlbVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9QdWxzZWZpcmVFbWJsZW1JdGVtXCIsXHJcbiAgICBcIm5hbWVcIjogXCJUaW1lYnJlYWtlciBFbWJsZW1cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwic3BhdHVsYVwiLFxyXG4gICAgICBcInJlY3VydmUtYm93XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBUaW1lYnJlYWtlciB0cmFpdC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQxNy9URlQxN19FbWJsZW1fVGltZWJyZWFrZXIuVEZUX1NldDE3LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwibm92YS1lbWJsZW1cIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fRFJYRW1ibGVtSXRlbVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiTi5PLlYuQS4gRW1ibGVtXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcInNwYXR1bGFcIixcclxuICAgICAgXCJzcGFycmluZy1nbG92ZXNcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIgZ2FpbnMgdGhlIE4uTy5WLkEuIHRyYWl0Lk4uTy5WLkEuIFN0cmlrZTogR2FpbiBAQVNTdHJpa2VyKjEwMEAlIEF0dGFjayBTcGVlZCBhbmQgQEFybW9yU3RyaWtlckAgQXJtb3IgYW5kIE1hZ2ljIFJlc2lzdC4gT3RoZXIgYWxsaWVzIGdhaW4gQEFTVGVhbSoxMDBAJSBBdHRhY2sgU3BlZWQgYW5kIEBBcm1vclRlYW1AIEFybW9yIGFuZCBNYWdpYyBSZXNpc3QuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX05PVkEuVEZUX1NldDE3LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwibWVlcGxlLWVtYmxlbVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9Bc3Ryb25hdXRFbWJsZW1JdGVtXCIsXHJcbiAgICBcIm5hbWVcIjogXCJNZWVwbGUgRW1ibGVtXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcInNwYXR1bGFcIixcclxuICAgICAgXCJjaGFpbi12ZXN0XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBNZWVwbGUgdHJhaXQgYW5kIEBNYW5hUmVnZW5QZXJNZWVwQCBhZGRpdGlvbmFsIE1hbmEgUmVnZW4gcGVyIC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQxNy9URlQxN19FbWJsZW1fTWVlcGxlLlRGVF9TZXQxNy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInNoZXBoZXJkLWVtYmxlbVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9TdW1tb25UcmFpdEVtYmxlbUl0ZW1cIixcclxuICAgIFwibmFtZVwiOiBcIlNoZXBoZXJkIEVtYmxlbVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJmcnlpbmctcGFuXCIsXHJcbiAgICAgIFwidGVhci1vZi1nb2RkZXNzXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBTaGVwaGVyZCB0cmFpdC4gT24gY2FzdCwgZ3JhbnQgQE1hbmFTaGFyZVBlcmNlbnQqMTAwQCUgb2YgbWF4IE1hbmEgdG8gdGhlIEJvbmQgb2YgdGhlIFN0YXJzLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDE3L1RGVDE3X0VtYmxlbV9TaGVwZXJkLlRGVF9TZXQxNy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInBzaW9uaWMtZW1ibGVtXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX1BzeU9wc0VtYmxlbUl0ZW1cIixcclxuICAgIFwibmFtZVwiOiBcIlBzaW9uaWMgRW1ibGVtXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBQc2lvbmljIHRyYWl0LlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDE3L1RGVDE3X0VtYmxlbV9Qc3lPcHMuVEZUX1NldDE3LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiYnJhd2xlci1lbWJsZW1cIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fSFBUYW5rRW1ibGVtSXRlbVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQnJhd2xlciBFbWJsZW1cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwiZnJ5aW5nLXBhblwiLFxyXG4gICAgICBcImdpYW50cy1iZWx0XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBCcmF3bGVyIHRyYWl0LiBBdHRhY2tzIGRlYWxzIEBQZXJjZW50SFBBdHRhY2sqMTAwQCUgb2YgdGhlIGhvbGRlcidzIG1heCBoZWFsdGggYXMgbWFnaWMgZGFtYWdlLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDE3L1RGVDE3X0VtYmxlbV9CcmF3bGVyLlRGVF9TZXQxNy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJvZ3VlLWVtYmxlbVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9Bc3Nhc3NpblRyYWl0RW1ibGVtSXRlbVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUm9ndWUgRW1ibGVtXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcImZyeWluZy1wYW5cIixcclxuICAgICAgXCJzcGFycmluZy1nbG92ZXNcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIgZ2FpbnMgdGhlIFJvZ3VlIHRyYWl0LiBBdCBASGVhbHRoVGhyZXNob2xkKjEwMEAlIGhlYWx0aCwgZ2FpbiBAT21uaXZhbXAqMTAwQCUgT21uaXZhbXAgYW5kIGltbXVuaXR5IHRvIGNyb3dkIGNvbnRyb2wgZm9yIEBCdWZmRHVyYXRpb25AIHNlY29uZHMuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX1JvZ3VlLlRGVF9TZXQxNy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImNoYWxsZW5nZXItZW1ibGVtXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0FTVHJhaXRFbWJsZW1JdGVtXCIsXHJcbiAgICBcIm5hbWVcIjogXCJDaGFsbGVuZ2VyIEVtYmxlbVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJmcnlpbmctcGFuXCIsXHJcbiAgICAgIFwicmVjdXJ2ZS1ib3dcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIgZ2FpbnMgdGhlIENoYWxsZW5nZXIgdHJhaXQuIE9uIHRha2Vkb3duLCB0aGUgaG9sZGVyJ3MgbmV4dCBATnVtQXR0YWNrc0AgYXR0YWNrcyBlYWNoIGhlYWwgZm9yIEBQZXJjZW50SGVhbHRoSGVhbCoxMDBAJSBvZiBtYXggaGVhbHRoLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDE3L1RGVDE3X0VtYmxlbV9DaGFsbGVuZ2VyLlRGVF9TZXQxNy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImRhcmstc3Rhci1lbWJsZW1cIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fRGFya1N0YXJFbWJsZW1JdGVtXCIsXHJcbiAgICBcIm5hbWVcIjogXCJEYXJrIFN0YXIgRW1ibGVtXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcInNwYXR1bGFcIixcclxuICAgICAgXCJiZi1zd29yZFwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwiZW1ibGVtXCIsXHJcbiAgICBcInN0YXRzXCI6IFwiVGhlIGhvbGRlciBnYWlucyB0aGUgRGFyayBTdGFyIHRyYWl0LlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDE3L1RGVDE3X0VtYmxlbV9EYXJrU3Rhci5URlRfU2V0MTcudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJzdGFyZ2F6ZXItZW1ibGVtXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX1N0YXJnYXplckVtYmxlbUl0ZW1cIixcclxuICAgIFwibmFtZVwiOiBcIlN0YXJnYXplciBFbWJsZW1cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwic3BhdHVsYVwiLFxyXG4gICAgICBcIm5lZWRsZXNzbHktbGFyZ2Utcm9kXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBTdGFyZ2F6ZXIgdHJhaXQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX1N0YXJnYXplci5URlRfU2V0MTcudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJtYXJhdWRlci1lbWJsZW1cIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fTWVsZWVUcmFpdEVtYmxlbUl0ZW1cIixcclxuICAgIFwibmFtZVwiOiBcIk1hcmF1ZGVyIEVtYmxlbVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJmcnlpbmctcGFuXCIsXHJcbiAgICAgIFwiYmYtc3dvcmRcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIgZ2FpbnMgdGhlIE1hcmF1ZGVyIHRyYWl0IGFuZCBoYXMgYSBAR29sZERyb3BDaGFuY2VAJSBjaGFuY2UgdG8gZHJvcCBAR29sZEFtb3VudEAgZ29sZCBvbiBraWxsLkdvbGQgZHJvcHBlZCB0aGlzIGdhbWU6IEBURlRVbml0UHJvcGVydHkuaXRlbTpURlRfSXRlbV9Hb2xkR2VuZXJhdGVkQFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDE3L1RGVDE3X0VtYmxlbV9NYXJhdWRlci5URlRfU2V0MTcudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJzcGFjZS1ncm9vdmUtZW1ibGVtXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX1NwYWNlR3Jvb3ZlRW1ibGVtSXRlbVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiU3BhY2UgR3Jvb3ZlIEVtYmxlbVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJzcGF0dWxhXCIsXHJcbiAgICAgIFwidGVhci1vZi1nb2RkZXNzXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBTcGFjZSBHcm9vdmUgdHJhaXQuIE9uIGNhc3QsIHRoZSBob2xkZXIgZW50ZXJzICBmb3IgQEdyb292ZUR1cmF0aW9uQCBzZWNvbmRzLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDE3L1RGVDE3X0VtYmxlbV9TcGFjZUdyb292ZS5URlRfU2V0MTcudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJiYXN0aW9uLWVtYmxlbVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9SZXNpc3RUYW5rRW1ibGVtSXRlbVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQmFzdGlvbiBFbWJsZW1cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwiZnJ5aW5nLXBhblwiLFxyXG4gICAgICBcImNoYWluLXZlc3RcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcImVtYmxlbVwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIgZ2FpbnMgdGhlIEJhc3Rpb24gdHJhaXQuIEFmdGVyIHRoZSBmaXJzdCBARGVsYXlAIHNlY29uZHMgb2YgY29tYmF0LCB0aGUgaG9sZGVyIGdhaW5zIEBBdHRhY2tTcGVlZCoxMDBAJSBBdHRhY2sgU3BlZWQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU2V0MTcvVEZUMTdfRW1ibGVtX0Jhc3Rpb24uVEZUX1NldDE3LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwidm95YWdlci1lbWJsZW1cIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fRmxleFRyYWl0RW1ibGVtSXRlbVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiVm95YWdlciBFbWJsZW1cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwiZnJ5aW5nLXBhblwiLFxyXG4gICAgICBcIm5lZWRsZXNzbHktbGFyZ2Utcm9kXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBWb3lhZ2VyIHRyYWl0LiBDb21iYXQgU3RhcnQ6IEdhaW4gYW5kIGdyYW50IGFkamFjZW50IGFsbGllcyBib251c2VzIGJhc2VkIG9uIHRoZSBob2xkZXIncyByb2xlLi0gVGFua3M6IEBCb251c0FybW9yTVJAIEFybW9yIGFuZCBNYWdpYyBSZXNpc3QtIEZpZ2h0ZXJzL0Fzc2Fzc2luczogQEJvbnVzT21uaXZhbXAqMTAwQCUgT21uaXZhbXAtIE90aGVyIFJvbGVzOiBAQm9udXNBdHRhY2tTcGVlZCoxMDBAJSBBdHRhY2sgU3BlZWRcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9UcmFpdHMvU3BhdHVsYS9TZXQxNy9URlQxN19FbWJsZW1fVm95YWdlci5URlRfU2V0MTcudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJwcmltb3JkaWFuLWVtYmxlbVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9Qcmltb3JkaWFuRW1ibGVtSXRlbVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUHJpbW9yZGlhbiBFbWJsZW1cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwic3BhdHVsYVwiLFxyXG4gICAgICBcImdpYW50cy1iZWx0XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJlbWJsZW1cIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGdhaW5zIHRoZSBQcmltb3JkaWFuIHRyYWl0LlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9JdGVtX0ljb25zL1RyYWl0cy9TcGF0dWxhL1NldDE3L1RGVDE3X0VtYmxlbV9Qcmltb3JkaWFuLlRGVF9TZXQxNy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIm1pcnJvcmVkLXBlcnNvbmFcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X01pcnJvcmVkUGVyc29uYVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiTWlycm9yZWQgUGVyc29uYVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJFdmVyeSBATnVtQ29tYmF0c0AgcGxheWVyIGNvbWJhdHMgZ2FpbiBhIGxlc3NlciBjb3B5IG9mIE1pcnJvcmVkIFBlcnNvbmEmbmJzcDsoQFRGVFVuaXRQcm9wZXJ0eS50cmFpdDpURlRfSXRlbV9BcnRpZmFjdF9NaXJyb3JlZFBlcnNvbmFfQ29tYmF0c0AvQE51bUNvbWJhdHNAKS4gU2hhcmUgQFN0YXRTaGFyZVBlcmNlbnQqMTAwQCUgb2YgdGhlIGhvbGRlcidzIGJvbnVzIEF0dGFjayBEYW1hZ2UsIEFiaWxpdHkgUG93ZXIsIEF0dGFjayBTcGVlZCwgQXJtb3IsIE1hZ2ljIFJlc2lzdCwgYW5kIEhlYWx0aCB3aXRoIG90aGVyIE1pcnJvcmVkIFBlcnNvbmEgaG9sZGVycy5DYW4ndCBiZSBSZWZvcmdlZCwgTGVzc2VyIGNvcGllcyBkbyBub3QgcHJvZHVjZSBjb3BpZXMuVW5pcXVlOiBvbmUgcGVyIGNoYW1waW9uXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxNl9BcnRpZmFjdF9NaXJyb3JlZFBlcnNvbmEuVEZUX1NldDE2LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiZmlzaGJvbmVzXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9GaXNoYm9uZXNcIixcclxuICAgIFwibmFtZVwiOiBcIkZpc2hib25lc1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyJ3MgYXR0YWNrcyB0YXJnZXQgcmFuZG9tIGVuZW1pZXMuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9GaXNoYm9uZXMuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiYW5pbWEtdmlzYWdlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ0X0l0ZW1fT3JubkFuaW1hVmlzYWdlXCIsXHJcbiAgICBcIm5hbWVcIjogXCJBbmltYSBWaXNhZ2VcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiSGVhbCBAUGVyY2VudEhlYWx0aFJlZ2VuQCUgbWF4IEhlYWx0aCBldmVyeSBzZWNvbmQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ0X0l0ZW1fT3JubkFuaW1hVmlzYWdlLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImdhcmdveWxlLXN0b25lcGxhdGVcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0dhcmdveWxlU3RvbmVwbGF0ZVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiR2FyZ295bGUgU3RvbmVwbGF0ZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJjaGFpbi12ZXN0XCIsXHJcbiAgICAgIFwibmVnYXRyb24tY2xvYWtcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gQEFybW9yUGVyRW5lbXlAIEFybW9yIGFuZCBATVJQZXJFbmVteUAgTWFnaWMgUmVzaXN0IGZvciBlYWNoIGVuZW15IHRhcmdldGluZyB0aGUgaG9sZGVyLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fR2FyZ295bGVTdG9uZXBsYXRlLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRpdGFuaWMtaHlkcmFcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X1RpdGFuaWNIeWRyYVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiVGl0YW5pYyBIeWRyYVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJBdHRhY2tzIGRlYWwgQFBlcmNlbnRNYXhIZWFsdGhTcGxhc2hAJSBvZiB0aGUgaG9sZGVyJ3MgbWF4IEhlYWx0aCBwbHVzIEBQZXJjZW50QXR0YWNrRGFtYWdlU3BsYXNoQCUgb2YgdGhlaXIgQXR0YWNrIERhbWFnZSBhcyBib251cyBwaHlzaWNhbCBkYW1hZ2UgdG8gdGhlIHRhcmdldCBhbmQgYWRqYWNlbnQgZW5lbWllcy5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X1RpdGFuaWNIeWRyYS5URlRfVEZUMTRfNS50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImJyYW1ibGUtdmVzdFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQnJhbWJsZVZlc3RcIixcclxuICAgIFwibmFtZVwiOiBcIkJyYW1ibGUgVmVzdFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJjaGFpbi12ZXN0XCIsXHJcbiAgICAgIFwiY2hhaW4tdmVzdFwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBAUGVyY2VudE1heEhQKjEwMEAlIG1heCBoZWFsdGguVGFrZSBAQXV0b0RhbWFnZVJlZHVjdGlvbioxMDBAJSByZWR1Y2VkIGRhbWFnZSBmcm9tIGF0dGFja3MuIFdoZW4gc3RydWNrIGJ5IGFueSBhdHRhY2ssIGRlYWwgQDFTdGFyQW9FRGFtYWdlQCBtYWdpYyBkYW1hZ2UgdG8gYWxsIGFkamFjZW50IGVuZW1pZXMuQ29vbGRvd246IEBJQ0RAIHNlY29uZHNcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0JyYW1ibGVWZXN0LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImNob25jY3Mtcm9ja2V0LXByb3BlbGxlZC1maXN0XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ0X0l0ZW1fT3JublJvY2tldFByb3BlbGxlZEZpc3RcIixcclxuICAgIFwibmFtZVwiOiBcIkNob25jYydzIFJvY2tldC1Qcm9wZWxsZWQgRmlzdFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgc3RhcnQ6IFRoZSBmYXJ0aGVzdCBlbmVteSBpcyBwdWxsZWQgaW50byBtZWxlZSByYW5nZSBhbmQgU3R1bm5lZCBmb3IgQFN0dW5EdXJhdGlvbkAgc2Vjb25kcy4gQWxsaWVzIHdpdGhpbiByYW5nZSB3aWxsIHByaW9yaXRpemUgYXR0YWNraW5nIHRoYXQgZW5lbXkuW1VuaXF1ZSAtIG9ubHkgMSBwZXIgY2hhbXBpb25dU3R1bjogY2Fubm90IG1vdmUsIGF0dGFjaywgb3IgY2FzdCBBYmlsaXRpZXNcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9Pcm5uX0l0ZW1zL1RGVDRfT3Jubkl0ZW1fUm9ja2V0UHJvcGVsbGVkRmlzdC50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImFlZ2lzLW9mLWR1c2tcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0FlZ2lzT2ZEdXNrXCIsXHJcbiAgICBcIm5hbWVcIjogXCJBZWdpcyBvZiBEdXNrXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkV2ZXJ5IEBUaWNrUmF0ZUAgc2Vjb25kcywgc3RlYWwgQE1SU3RlYWxQZXJUaWNrQCBNYWdpYyBSZXNpc3QgZnJvbSBlbmVtaWVzIHdpdGhpbiAxIGhleCBhbmQgZGVhbCBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUX0l0ZW1fQXJ0aWZhY3RfQWVnaXNEdXNrRGF3bl9EYW1hZ2VAJSBvZiB0aGUgaG9sZGVyJ3MgTWFnaWMgUmVzaXN0IGFzIG1hZ2ljIGRhbWFnZS5JZiBBZWdpcyBvZiBEYXduIGlzIGFsc28gZXF1aXBwZWQsIHRyaWdnZXIgdGhpcyBpdGVtJ3MgZWZmZWN0IGV2ZXJ5IEBUaWNrUmF0ZVdpdGhBZWdpc09mRGF3bkAgc2Vjb25kcyBpbnN0ZWFkLkRhbWFnZSBpbmNyZWFzZXMgYmFzZWQgb24gU3RhZ2UuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9BZWdpc09mRHVzay5URlRfU2V0MTYudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ1bmVuZGluZy1kZXNwYWlyXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9VbmVuZGluZ0Rlc3BhaXJcIixcclxuICAgIFwibmFtZVwiOiBcIlVuZW5kaW5nIERlc3BhaXJcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiV2hlbmV2ZXIgYSBTaGllbGQgb24gdGhlIGhvbGRlciBicmVha3MsIEBQZXJjZW50RGFtYWdlQCUgb2YgdGhhdCBTaGllbGQncyBpbml0aWFsIHZhbHVlIGlzIGRlYWx0IHRvIHRoZSBuZWFyZXN0IGVuZW15IGFzIG1hZ2ljIGRhbWFnZS5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X1VuZW5kaW5nRGVzcGFpci5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJldGVybmFsLXdpbnRlclwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNF9JdGVtX09ybm5FdGVybmFsV2ludGVyXCIsXHJcbiAgICBcIm5hbWVcIjogXCJFdGVybmFsIFdpbnRlclwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJFbmVtaWVzIHdobyBkYW1hZ2UgdGhlIGhvbGRlciBhcmUgQEF0dGFja1NwZWVkU2xvd1BlcmNlbnRAJSBDaGlsbGVkIGZvciBAU2xvd0R1cmF0aW9uQCBzZWNvbmRzLiBBZnRlciBATnVtQXBwbGljYXRpb25zQCBDaGlsbHMgZnJvbSB0aGlzIGl0ZW0sIHRoZSBhdHRhY2tlciBpcyBTdHVubmVkIGluc3RlYWQgKENvb2xkb3duOiBARnJlZXplQ29vbGRvd25AIHNlY29uZHMpLltVbmlxdWUgLSBvbmx5IDEgcGVyIGNoYW1waW9uXUNoaWxsOiByZWR1Y2UgQXR0YWNrIFNwZWVkU3R1bjogY2Fubm90IG1vdmUsIGF0dGFjaywgb3IgY2FzdCBBYmlsaXRpZXNcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDRfSXRlbV9Pcm5uRXRlcm5hbFdpbnRlci5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ5YXN1b3MtYmxhZGV3b3JrXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0FydGlmYWN0X1lhc3VvQXJ0aWZhY3RcIixcclxuICAgIFwibmFtZVwiOiBcIllhc3VvJ3MgQmxhZGV3b3JrXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkV2ZXJ5IEBJbnRlcnZhbEAgc2Vjb25kcywgeW91ciBuZXh0IGF0dGFjayBpcyBhIGRvdWJsZSBhdHRhY2suXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxN19JdGVtX0FydGlmYWN0X1lhc3VvQmxhZGV3b3JrLlRGVF9TZXQxNy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImdpYW50LXNsYXllclwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fTWFkcmVkc0Jsb29kcmF6b3JcIixcclxuICAgIFwibmFtZVwiOiBcIkdpYW50IFNsYXllclwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJiZi1zd29yZFwiLFxyXG4gICAgICBcInJlY3VydmUtYm93XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIEBEYW1hZ2VBbXAqMTAwQCUgYWRkaXRpb25hbCBEYW1hZ2UgQW1wIGFnYWluc3QgVGFua3MuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9NYWRyZWRzQmxvb2RyYXpvci5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJtZW5kaW5nLWVjaG9lc1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfTWVuZGluZ0VjaG9lc1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiTWVuZGluZyBFY2hvZXNcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiSW5jcmVhc2UgaGVhbGluZyBvbiB0aGUgaG9sZGVyIGJ5IEBJbmNyZWFzZWRIZWFsaW5nKjEwMEAlLiBXaGVuIHRoZSBob2xkZXIgZ2l2ZXMgb3IgcmVjZWl2ZXMgYSBoZWFsLCBncmFudCBASGVhbFBlcmNlbnRUb0dyYW50KjEwMEAlIG9mIHRoZSBoZWFscyB2YWx1ZSB0byB0aGUgbG93ZXN0IGhlYWx0aCBhbGx5IGFzIHdlbGwuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxNl9BcnRpZmFjdF9NZW5kaW5nRWNob2VzLlRGVF9TZXQxNi50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIm9ic2lkaWFuLWNsZWF2ZXJcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDRfSXRlbV9Pcm5uT2JzaWRpYW5DbGVhdmVyXCIsXHJcbiAgICBcIm5hbWVcIjogXCJPYnNpZGlhbiBDbGVhdmVyXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkRhbWFnZSBkZWFsdCBAU2hyZWRAJSBTaHJlZHMgYW5kIEBTaHJlZEAlIFN1bmRlcnMgZW5lbWllcyBmb3IgQER1cmF0aW9uQCBzZWNvbmRzLllvdXIgdGVhbSBnYWlucyBAVGVhbUFEKjEwMEAlIEF0dGFjayBEYW1hZ2UgYW5kIEBUZWFtQVBAIEFiaWxpdHkgUG93ZXIu4oCL4oCLW1N1cHBvcnQgaXRlbV0gW1VuaXF1ZSAtIG9ubHkgMSBwZXIgY2hhbXBpb25dU2hyZWQ6IFJlZHVjZSBNYWdpYyBSZXNpc3RTdW5kZXI6IFJlZHVjZSBBcm1vclwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNF9JdGVtX09ybm5PYnNpZGlhbkNsZWF2ZXIuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwic3VuZmlyZS1jYXBlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9SZWRCdWZmXCIsXHJcbiAgICBcIm5hbWVcIjogXCJTdW5maXJlIENhcGVcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwiY2hhaW4tdmVzdFwiLFxyXG4gICAgICBcImdpYW50cy1iZWx0XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIEBCb251c1BlcmNlbnRIUCoxMDBAJSBtYXggSGVhbHRoLiBFdmVyeSBASUNEQCBzZWNvbmRzLCBkZWFsIEBCdXJuUGVyY2VudEAlIEJ1cm4gYW5kIEBHcmlldm91c1dvdW5kc1BlcmNlbnRAJSBXb3VuZCB0byBhbiBlbmVteSB3aXRoaW4gQEhleFJhbmdlQCBoZXhlcyBmb3IgQEJ1cm5EdXJhdGlvbkAgc2Vjb25kcy5CdXJuOiBEZWFscyBhIHBlcmNlbnQgb2YgdGhlIHRhcmdldCdzIG1heCBIZWFsdGggYXMgdHJ1ZSBkYW1hZ2UgZXZlcnkgc2Vjb25kV291bmQ6IFJlZHVjZXMgaGVhbGluZyByZWNlaXZlZFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fUmVkQnVmZi5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ2aXJ0dWUtb2YtdGhlLW1hcnR5clwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fUmFkaWFudFZpcnR1ZVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiVmlydHVlIG9mIHRoZSBNYXJ0eXJcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJFdmVyeSBASGVhbFRpY2tSYXRlQCBzZWNvbmRzLCBoZWFsIHlvdXIgdGVhbSBmb3IgQE1heEhlYWx0aEhlYWxAJSBvZiB0aGVpciBtYXggSGVhbHRoLiBXaGVuIHRoZSBob2xkZXIgZGllcywgdGhlIGhlYWxpbmcgaW5jcmVhc2VzIHRvIEBUT09MVElQRW1wb3dlcmVkSGVhbEAlIG1heCBIZWFsdGggZm9yIEBOdW1Cb251c0hlYWxzQCBleHRyYSBoZWFscy5IZWFsaW5nOiBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUX1RyYWNrZXJfVmFsdWUxQOKAi+KAi1tTdXBwb3J0IGl0ZW1dXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9SYWRpYW50VmlydHVlLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRocmVzaHMtbGFudGVyblwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9BcnRpZmFjdF9UaHJlc2hMYW50ZXJuXCIsXHJcbiAgICBcIm5hbWVcIjogXCJUaHJlc2gncyBMYW50ZXJuXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkFmdGVyIEBEZWxheUAgc2Vjb25kcyBvZiBjb21iYXQsIHB1bGwgdGhlIGxlZnRtb3N0IGJlbmNoZWQgdW5pdCBvbnRvIHRoZSBiYXR0bGVmaWVsZC4gV2hpbGUgdGhhdCB1bml0IGxpdmVzLCBARGFtYWdlU2hhcmUqMTAwQCUgb2YgYWxsIGRhbWFnZSB0aGUgaG9sZGVyIHdvdWxkIHRha2UgaXMgcmVkaXJlY3RlZCB0byB0aGVtLlRyYWl0cyBvZiBjaGFtcGlvbnMgZmx1bmcgb250byB0aGUgYm9hcmQgZG8gbm90IGJlY29tZSBhY3RpdmVcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0l0ZW1fQXJ0aWZhY3RfVGhyZXNoTGFudGVybi5URlRfU2V0MTcudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJrYXlsZXMtcmFkaWFudC1leGFsdGF0aW9uXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0FydGlmYWN0X0theWxlQXJ0aWZhY3RfUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiS2F5bGUncyBSYWRpYW50IEV4YWx0YXRpb25cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQmVob2xkLCB0aGUgcmlnaHRlb3VzIGZsYW1lIVwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUMTdfSXRlbV9BcnRpZmFjdF9LYXlsZUdyZWF0c3dvcmQuVEZUX1NldDE3LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiaGFuZC1vZi1qdXN0aWNlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9VbnN0YWJsZUNvbmNvY3Rpb25cIixcclxuICAgIFwibmFtZVwiOiBcIkhhbmQgT2YgSnVzdGljZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJ0ZWFyLW9mLWdvZGRlc3NcIixcclxuICAgICAgXCJzcGFycmluZy1nbG92ZXNcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gMiBlZmZlY3RzOkBBRF9Ob3RTdGF0QmFyKjEwMEAlIEF0dGFjayBEYW1hZ2UgYW5kIEBBUF9Ob3RTdGF0QmFyQCUgQWJpbGl0eSBQb3dlci5AU3RhdE9tbml2YW1wX05vdFN0YXRCYXIqMTAwQCUgT21uaXZhbXAuV2hpbGUgYWJvdmUgQEhlYWx0aFRocmVzaG9sZCoxMDBAJSBoZWFsdGgsIGRvdWJsZSB0aGUgQXR0YWNrIERhbWFnZSBhbmQgQWJpbGl0eSBQb3dlci4gV2hpbGUgYmVsb3cgQEhlYWx0aFRocmVzaG9sZCoxMDBAJSBIZWFsdGgsIGRvdWJsZSB0aGUgT21uaXZhbXAuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9VbnN0YWJsZUNvbmNvY3Rpb24uVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiZWRnZS1vZi1uaWdodFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fR3VhcmRpYW5BbmdlbFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiRWRnZSBvZiBOaWdodFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJiZi1zd29yZFwiLFxyXG4gICAgICBcImNoYWluLXZlc3RcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkF0IEBIZWFsdGhUaHJlc2hvbGRAJSBIZWFsdGgsIGJyaWVmbHkgYmVjb21lIHVudGFyZ2V0YWJsZSwgc2hlZCBuZWdhdGl2ZSBlZmZlY3RzLCBhbmQgaGVhbCBATWlzc2luZ0hlYWx0aFJlc3RvcmUqMTAwQCUgbWlzc2luZyBoZWFsdGguXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9HdWFyZGlhbkFuZ2VsLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImtheWxlcy1leGFsdGF0aW9uXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0FydGlmYWN0X0theWxlQXJ0aWZhY3RcIixcclxuICAgIFwibmFtZVwiOiBcIktheWxlJ3MgRXhhbHRhdGlvblwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJBZnRlciBARGVsYXlAIHNlY29uZHMgb2YgY29tYmF0LCB0aGlzIGFuZCBhbGwgY29tcGxldGVkIGl0ZW1zIG9uIHRoZSBob2xkZXIgYmVjb21lIFJhZGlhbnQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxN19JdGVtX0FydGlmYWN0X0theWxlR3JlYXRzd29yZC5URlRfU2V0MTcudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJjdXJzZWQtYmxhZGVcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0N1cnNlZEJsYWRlXCIsXHJcbiAgICBcIm5hbWVcIjogXCJDdXJzZWQgQmxhZGVcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQXR0YWNrcyByZWR1Y2UgdGhlIHRhcmdldCdzIG1heCBIZWFsdGggYnkgQE1heEhlYWx0aFBlcmNlbnRAJS4gQEhpdENvdW50QCBhdHRhY2tzIG9uIHRoZSBzYW1lIHRhcmdldCByZWR1Y2VzIHRoZWlyIHN0YXIgbGV2ZWwgYnkgMS5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvSXRlbV9JY29ucy9Pcm5uX0l0ZW1zL1RGVF9JdGVtX0FydGlmYWN0X0N1cnNlZEJsYWRlLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiemhvbnlhcy1wYXJhZG94XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ0X0l0ZW1fT3Jublpob255YXNQYXJhZG94XCIsXHJcbiAgICBcIm5hbWVcIjogXCJaaG9ueWEncyBQYXJhZG94XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIk9uY2UgcGVyIGNvbWJhdCBhdCBAUGVyY2VudEhlYWx0aFRocmVzaG9sZEAlIEhlYWx0aCwgYmVjb21lIGludnVsbmVyYWJsZSBhbmQgdW50YXJnZXRhYmxlIGZvciBASW52dWxuRHVyYXRpb25AIHNlY29uZHMuW1VuaXF1ZSAtIG9ubHkgMSBwZXIgY2hhbXBpb25dXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ0X0l0ZW1fT3Jublpob255YXNQYXJhZG94LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRpdGFucy1yZXNvbHZlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9UaXRhbnNSZXNvbHZlXCIsXHJcbiAgICBcIm5hbWVcIjogXCJUaXRhbidzIFJlc29sdmVcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwiY2hhaW4tdmVzdFwiLFxyXG4gICAgICBcInJlY3VydmUtYm93XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIEBTdGFja2luZ0FEKjEwMEAlIEF0dGFjayBEYW1hZ2UgYW5kIEBTdGFja2luZ1NQQCUgQWJpbGl0eSBQb3dlciB3aGVuIGF0dGFja2luZyBvciB0YWtpbmcgZGFtYWdlLCBzdGFja2luZyB1cCB0byBAU3RhY2tDYXBAIHRpbWVzLiAgQXQgZnVsbCBzdGFja3MsIGdhaW4gQFN0YWNrZWRBbXAqMTAwQCUgRGFtYWdlIEFtcCBhbmQgZ2FpbiBpbW11bml0eSB0byBjcm93ZCBjb250cm9sLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fVGl0YW5zUmVzb2x2ZS5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJsdWRlbnMtdGVtcGVzdFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfTHVkZW5zVGVtcGVzdFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiTHVkZW4ncyBUZW1wZXN0XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkBQZXJjZW50T2ZPdmVya2lsbEAlIG9mIG92ZXJraWxsIGRhbWFnZSBwbHVzIEBCYXNlRGFtYWdlQCBpcyBkZWFsdCBhcyBtYWdpYyBkYW1hZ2UgdG8gdGhlIHRocmVlIGVuZW1pZXMgbmVhcmVzdCB0aGUgdGFyZ2V0LlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJ0aWZhY3RfTHVkZW5zVGVtcGVzdC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJzcGVjdHJhbC1jdXRsYXNzXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9TcGVjdHJhbEN1dGxhc3NcIixcclxuICAgIFwibmFtZVwiOiBcIlNwZWN0cmFsIEN1dGxhc3NcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IHN0YXJ0OiBUZWxlcG9ydCB0aGUgaG9sZGVyIHRvIHRoZSBtaXJyb3JlZCBoZXggb24gdGhlIGVuZW15J3Mgc2lkZSBvZiB0aGUgYm9hcmQuIEFmdGVyIEBEdXJhdGlvbkAgc2Vjb25kcywgdGhlIGhvbGRlciByZXR1cm5zIHRvIHRoZWlyIG9yaWdpbmFsIGxvY2F0aW9uLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJ0aWZhY3RfU3BlY3RyYWxDdXRsYXNzLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImtyYWtlbnMtZnVyeVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fUnVuYWFuc0h1cnJpY2FuZVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiS3Jha2VuJ3MgRnVyeVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJuZWdhdHJvbi1jbG9ha1wiLFxyXG4gICAgICBcInJlY3VydmUtYm93XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJBdHRhY2tzIGdyYW50IEBBRE9uQXR0YWNrKjEwMEAlIHN0YWNraW5nIEF0dGFjayBEYW1hZ2UsIHVwIHRvIEBNYXhTdGFja3NAIGF0dGFja3MuIEFmdGVyIEBNYXhTdGFja3NAIGF0dGFja3MsIGdhaW4gQEFTQ2Fwc3RvbmUqMTAwQCUgQXR0YWNrIFNwZWVkLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fS3Jha2VuU2xheWVyLlRGVF9URlQxNF81LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFwaWQtZmlyZWNhbm5vblwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfUmFwaWRGaXJlY2Fubm9uXCIsXHJcbiAgICBcIm5hbWVcIjogXCJSYXBpZCBGaXJlY2Fubm9uXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkdhaW4gKzEgQXR0YWNrIFJhbmdlLCBpbmNyZWFzZWQgYnkgMSB3aGVuZXZlciB0aGUgaG9sZGVyIGtpbGxzIGFuIGVuZW15LlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJ0aWZhY3RfUmFwaWRGaXJlY2Fubm9uLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImJsb29kdGhpcnN0ZXJcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0Jsb29kdGhpcnN0ZXJcIixcclxuICAgIFwibmFtZVwiOiBcIkJsb29kdGhpcnN0ZXJcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwiYmYtc3dvcmRcIixcclxuICAgICAgXCJuZWdhdHJvbi1jbG9ha1wiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwiT25jZSBwZXIgY29tYmF0IGF0IEBIZWFsdGhUaHJlc2hvbGRAJSBIZWFsdGgsIGdhaW4gYSBAU2hpZWxkSGVhbHRoUGVyY2VudEAlIG1heCBIZWFsdGggU2hpZWxkIHRoYXQgbGFzdHMgdXAgdG8gQFNoaWVsZER1cmF0aW9uQCBzZWNvbmRzLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQmxvb2R0aGlyc3Rlci5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJzdGF0aWtrLXNoaXZcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X1N0YXRpa2tTaGl2XCIsXHJcbiAgICBcIm5hbWVcIjogXCJTdGF0aWtrIFNoaXZcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiRXZlcnkgM3JkIGF0dGFjayBkZWFscyBARGFtYWdlQCArIEBBUFNjYWxhcioxMDBAJSBvZiB0aGUgaG9sZGVyJ3MgQWJpbGl0eSBQb3dlciBhcyBhZGRpdGlvbmFsIG1hZ2ljIGRhbWFnZSB0byA0IGVuZW1pZXMuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9TdGF0dGlrU2hpdi5URlRfVEZUMTRfNS50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInNuaXBlcnMtZm9jdXNcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDlfSXRlbV9Pcm5uSG9yaXpvbkZvY3VzXCIsXHJcbiAgICBcIm5hbWVcIjogXCJTbmlwZXIncyBGb2N1c1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIEBEYW1hZ2VBbXBQZXJIZXgqMTAwQCUgRGFtYWdlIEFtcCBhZ2FpbnN0IHRhcmdldHMgQEhleFJlcXVpcmVtZW50QCBvciBtb3JlIGhleGVzIGF3YXkuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ5X0l0ZW1fT3Jubkhvcml6b25Gb2N1cy5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcmNoYW5nZWxzLXN0YWZmXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcmNoYW5nZWxzU3RhZmZcIixcclxuICAgIFwibmFtZVwiOiBcIkFyY2hhbmdlbCdzIFN0YWZmXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcIm5lZWRsZXNzbHktbGFyZ2Utcm9kXCIsXHJcbiAgICAgIFwidGVhci1vZi1nb2RkZXNzXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgc3RhcnQ6IEdhaW4gQEFQUGVySW50ZXJ2YWxAJSBBYmlsaXR5IFBvd2VyIGV2ZXJ5IEBJbnRlcnZhbFNlY29uZHNAIHNlY29uZHMgaW4gY29tYmF0LlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJjaGFuZ2Vsc1N0YWZmLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImFlZ2lzLW9mLWRhd25cIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0FlZ2lzT2ZEYXduXCIsXHJcbiAgICBcIm5hbWVcIjogXCJBZWdpcyBvZiBEYXduXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkV2ZXJ5IEBUaWNrUmF0ZUAgc2Vjb25kcywgc3RlYWwgQEFybW9yU3RlYWxQZXJUaWNrQCBBcm1vciBmcm9tIGVuZW1pZXMgd2l0aGluIDEtaGV4IGFuZCBoZWFsIEBURlRVbml0UHJvcGVydHkuaXRlbTpURlRfSXRlbV9BcnRpZmFjdF9BZWdpc0R1c2tEYXduX0RhbWFnZUAlIG9mIHRoZSBob2xkZXIncyBBcm1vci5JZiBBZWdpcyBvZiBEdXNrIGlzIGFsc28gZXF1aXBwZWQsIHRyaWdnZXIgdGhpcyBpdGVtJ3MgZWZmZWN0IGV2ZXJ5IEBUaWNrUmF0ZVdpdGhBZWdpc09mRHVza0Agc2Vjb25kcyBpbnN0ZWFkLkhlYWxpbmcgaW5jcmVhc2VzIGJhc2VkIG9uIFN0YWdlLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJ0aWZhY3RfQWVnaXNPZkRhd24uVEZUX1NldDE2LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiZXZlbHlubnMtaW5zdGluY3RcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fQXJ0aWZhY3RfRXZlbHlubkFydGlmYWN0XCIsXHJcbiAgICBcIm5hbWVcIjogXCJFdmVseW5uJ3MgSW5zdGluY3RcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiV2hlbiBzd2l0Y2hpbmcgdGFyZ2V0cywgYmxpbmsgdG8gdGhlIG5leHQgdGFyZ2V0LiBBdHRhY2tzIGFuZCBBYmlsaXRpZXMgZXhlY3V0ZSB0aGUgaG9sZGVyJ3MgdGFyZ2V0IGJlbG93IEBFeGVjdXRlVGhyZXNob2xkRm9yVGFyZ2V0KjEwMEAlIG9mIHRoZWlyIEhlYWx0aC5LaWxscyBncmFudCB0aGUgaG9sZGVyIEBEZWNheWluZ0FTKjEwMEAlIEF0dGFjayBTcGVlZCBkZWNheWluZyBvdmVyIEBEdXJhdGlvbkAgc2Vjb25kcy5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0l0ZW1fQXJ0aWZhY3RfRXZlbHlubkZhbmcuVEZUX1NldDE3LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwic29yYWthcy1taXJhY2xlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQxN19JdGVtX0FydGlmYWN0X1NvcmFrYUFydGlmYWN0XCIsXHJcbiAgICBcIm5hbWVcIjogXCJTb3Jha2EncyBNaXJhY2xlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBmaXJzdCBATnVtTWlyYWNsZXNAIHRpbWVzIHRoZSBob2xkZXIgZHJvcHMgYmVsb3cgQEhQVGhyZXNob2xkKjEwMEAlIEhlYWx0aCwgYSBNaXJhY2xlIG9jY3VycywgaGVhbGluZyB0aGVtIGZvciBAVG90YWxIZWFsUmF0aW9AJSBvZiB0aGVpciBtYXggSGVhbHRoLklmIHRoZSBob2xkZXIgc3Vydml2ZXMgcGxheWVyIGNvbWJhdCwgZ2FpbiBAUGxheWVySGVhbHRoQCBwbGF5ZXIgSGVhbHRoIGZvciBlYWNoIE1pcmFjbGUgdGhpcyBjb21iYXQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxN19JdGVtX0FydGlmYWN0X1NvcmFrYU1pcmFjbGUuVEZUX1NldDE3LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwidmFydXNzLW9ic2Vzc2lvblwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTdfSXRlbV9BcnRpZmFjdF9WYXJ1c0FydGlmYWN0XCIsXHJcbiAgICBcIm5hbWVcIjogXCJWYXJ1cydzIE9ic2Vzc2lvblwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgU3RhcnQ6IFlvdXIgc3Ryb25nZXN0IFRhbmsgYmVjb21lcyB0aGUgU291bG1hdGUuIEZvciBlYWNoIHNlY29uZCB0aGV5IGFyZSBhbGl2ZSwgdGhlIGhvbGRlciBnYWlucyBAU3RhY2tpbmdTdGF0c0AlIHN0YWNraW5nIEF0dGFjayBEYW1hZ2UgYW5kIEFiaWxpdHkgUG93ZXIuVGhlIFNvdWxtYXRlIGhlYWxzIGZvciBASGVhbFBjdCoxMDBAJSBvZiBkYW1hZ2UgdGhlIGhvbGRlciBkZWFscy5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE3X0l0ZW1fQXJ0aWZhY3RfVmFydXNPYnNlc3Npb24uVEZUX1NldDE3LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiZGF3bmNvcmVcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0Rhd25jb3JlXCIsXHJcbiAgICBcIm5hbWVcIjogXCJEYXduY29yZVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJSZWR1Y2UgdGhlIGhvbGRlcidzIG1heCBNYW5hIGJ5IEBGbGF0TWFuYVJlZHVjdGlvbkAuIFN1YnNlcXVlbnQgc3BlbGxjYXN0cyByZWR1Y2UgbWF4IE1hbmEgYnkgQFJlZHVjdGlvblBlckNhc3QqMTAwQCUsIHRvIGEgbWluaW11bSBvZiBATWluaW11bVRvdGFsTWFuYUAuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9EYXduY29yZS5URlRfU2V0MTUudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJjaG9uY2NzLWFydGlmYWN0b3J5XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRFdmVudENUX0F1Z21lbnRfQXJ0aWZhY3RvcnlcIixcclxuICAgIFwibmFtZVwiOiBcIkNob25jYydzIEFydGlmYWN0b3J5XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkF0IHRoZSBzdGFydCBvZiBlYWNoIHR1cm4sIHlvdXIgYmVuY2hlZCBjb21wbGV0ZWQgaXRlbXMgdHJhbnNmb3JtIGludG8gYSByYW5kb20gQXJ0aWZhY3QgaXRlbS4gR2FpbiBATnVtSXRlbXNAIEFydGlmYWN0IEFudmlsIGFuZCBhIHJlZm9yZ2VyLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0F1Z21lbnRzL0hleGNvcmUvQXJ0aWZhY3RvcnlfSUlJLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImFocmlzLWF1cmFcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDE3X0l0ZW1fQXJ0aWZhY3RfQWhyaUFydGlmYWN0XCIsXHJcbiAgICBcIm5hbWVcIjogXCJBaHJpJ3MgQXVyYVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJUaGUgaG9sZGVyIGlzIG9yYml0ZWQgYnkgMyBmb3hmaXJlcy4gRWFjaCBvbmUgZGVhbHMgQEZsYXRNYWdpY0RhbWFnZUAmbmJzcDsoKSBtYWdpYyBkYW1hZ2UgYW5kIHRoZSBvcmJpdCBleHBhbmRzIHRvIGhpdCB0aGUgaG9sZGVyJ3MgY3VycmVudCB0YXJnZXQuRm9yIGV2ZXJ5IEBNYW5hU3BlbnRAIE1hbmEgdGhlIGhvbGRlciBzcGVuZHMsIGZveGZpcmVzIHRyYXZlbCBAUGVyY2VudFNwZWVkSW5jcmVhc2UqMTAwQCUgZmFzdGVyIGZvciB0aGUgcmVzdCBvZiBjb21iYXQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQxN19JdGVtX0FydGlmYWN0X0FocmlSaHl0aG0uVEZUX1NldDE3LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwibGlnaHRzaGllbGQtY3Jlc3RcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0xpZ2h0c2hpZWxkQ3Jlc3RcIixcclxuICAgIFwibmFtZVwiOiBcIkxpZ2h0c2hpZWxkIENyZXN0XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkV2ZXJ5IEBUcmlnZ2VyUmF0ZUAgc2Vjb25kcywgU2hpZWxkcyB0aGUgbG93ZXN0IHBlcmNlbnQgSGVhbHRoIGFsbHkgZm9yIEBQZXJjZW50T2ZSZXNpc3RzQCUgb2YgdGhlIGhvbGRlcidzIGNvbWJpbmVkIEFybW9yIGFuZCBNYWdpYyBSZXNpc3QgZm9yIEBTaGllbGREdXJhdGlvbkAgc2Vjb25kcy5PbiBkZWF0aCBncmFudHMgdGhpcyBzaGllbGQgdG8gYWxsIGFsbGllcy5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X0xpZ2h0c2hpZWxkQ3Jlc3QuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiZGVhdGhzLWRlZmlhbmNlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ0X0l0ZW1fT3JubkRlYXRoc0RlZmlhbmNlXCIsXHJcbiAgICBcIm5hbWVcIjogXCJEZWF0aCdzIERlZmlhbmNlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkBJZ25vcmVQYWluUGVyY2VudEAlIG9mIHRoZSBkYW1hZ2UgdGhlIGhvbGRlciByZWNlaXZlcyBpcyBpbnN0ZWFkIGRlYWx0IG92ZXIgQEJsZWVkRHVyYXRpb25AIHNlY29uZHMgYXMgbm9uLWxldGhhbCBkYW1hZ2UuW1VuaXF1ZSAtIG9ubHkgMSBwZXIgY2hhbXBpb25dXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlQ0X0l0ZW1fT3JubkRlYXRoc0RlZmlhbmNlLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInNwZWFyLW9mLXNob2ppblwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fU3BlYXJPZlNob2ppblwiLFxyXG4gICAgXCJuYW1lXCI6IFwiU3BlYXIgb2YgU2hvamluXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcImJmLXN3b3JkXCIsXHJcbiAgICAgIFwidGVhci1vZi1nb2RkZXNzXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJBdHRhY2tzIGdyYW50IEBGbGF0TWFuYVJlc3RvcmVAIGJvbnVzIE1hbmEuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9TcGVhck9mU2hvamluLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImV2ZW5zaHJvdWRcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX1NwZWN0cmFsR2F1bnRsZXRcIixcclxuICAgIFwibmFtZVwiOiBcIkV2ZW5zaHJvdWRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwibmVnYXRyb24tY2xvYWtcIixcclxuICAgICAgXCJnaWFudHMtYmVsdFwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQEFSUmVkdWN0aW9uQW1vdW50QCUgU3VuZGVyIGVuZW1pZXMgd2l0aGluIEBIZXhSYW5nZUAgaGV4ZXMuIEdhaW4gQEJvbnVzUmVzaXN0c0AgQXJtb3IgYW5kIE1hZ2ljIFJlc2lzdCBmb3IgdGhlIGZpcnN0IEBCb251c1Jlc2lzdER1cmF0aW9uQCBzZWNvbmRzIG9mIGNvbWJhdC5TdW5kZXI6IFJlZHVjZSBBcm1vclwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fU3BlY3RyYWxHYXVudGxldC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJibGFja3NtaXRocy1nbG92ZXNcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDlfSXRlbV9Pcm5uUHJvdG90eXBlRm9yZ2VcIixcclxuICAgIFwibmFtZVwiOiBcIkJsYWNrc21pdGgncyBHbG92ZXNcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiRWFjaCByb3VuZDogRXF1aXAgMiByYW5kb20gT3JubiBBcnRpZmFjdHMuW0NvbnN1bWVzIDMgaXRlbSBzbG90cy5dQFRGVFVuaXRQcm9wZXJ0eS46VEZUX0JpbmRPbkVxdWlwVFJBQFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUOV9JdGVtX09ybm5Qcm90b3R5cGVGb3JnZS5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJibGlnaHRpbmctamV3ZWxcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0JsaWdodGluZ0pld2VsXCIsXHJcbiAgICBcIm5hbWVcIjogXCJCbGlnaHRpbmcgSmV3ZWxcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiRGVhbGluZyBtYWdpYyBkYW1hZ2UgcmVkdWNlcyB0aGUgdGFyZ2V0J3MgTWFnaWMgUmVzaXN0IGJ5IEBNUlJlZHVjdGlvbkAuIElmIHRoZWlyIE1hZ2ljIFJlc2lzdCBpcyAwLCBncmFudCB0aGUgaG9sZGVyIEBNYW5hR2FpbkAgTWFuYSBpbnN0ZWFkLkFiaWxpdHkgZGFtYWdlIGNhbiBvbmx5IHRyaWdnZXIgb24gZWFjaCBlbmVteSBvbmNlIGV2ZXJ5IEBJQ0RAIHNlY29uZHMuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9CbGlnaHRpbmdKZXdlbC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ0YWxpc21hbi1vZi1hc2NlbnNpb25cIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X1RhbGlzbWFuT2ZBc2NlbnNpb25cIixcclxuICAgIFwibmFtZVwiOiBcIlRhbGlzbWFuIE9mIEFzY2Vuc2lvblwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJBZnRlciBAU2Vjb25kc0Agc2Vjb25kcyBnYWluIEBNYXhIZWFsdGhQZXJjZW50QCUgbWF4IEhlYWx0aCBhbmQgQERhbWFnZUFtcCoxMDBAJSBEYW1hZ2UgQW1wIGZvciB0aGUgcmVzdCBvZiBjb21iYXQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9UYWxpc21hbk9mQXNjZW5zaW9uLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImluZmluaXR5LWZvcmNlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQ0X0l0ZW1fT3JubkluZmluaXR5Rm9yY2VcIixcclxuICAgIFwibmFtZVwiOiBcIkluZmluaXR5IEZvcmNlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRvbnMgb2YgRVZFUllUSElORyFcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDRfSXRlbV9Pcm5uSW5maW5pdHlGb3JjZS5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJuYXNob3JzLXRvb3RoXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9MZXZpYXRoYW5cIixcclxuICAgIFwibmFtZVwiOiBcIk5hc2hvcidzIFRvb3RoXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcInJlY3VydmUtYm93XCIsXHJcbiAgICAgIFwiZ2lhbnRzLWJlbHRcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkF0dGFja3MgZ3JhbnQgQEJhc2VNYW5hT25IaXRAIGJvbnVzIE1hbmEsIGluY3JlYXNlZCB0byBATWFuYU9uQ3JpdEAgaWYgdGhleSBjcml0aWNhbGx5IHN0cmlrZS5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0xldmlhdGhhbi5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJzdXNwaWNpb3VzLXRyZW5jaC1jb2F0XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9TdXNwaWNpb3VzVHJlbmNoQ29hdFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiU3VzcGljaW91cyBUcmVuY2ggQ29hdFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJPbmNlIHBlciBjb21iYXQgYXQgQFBlcmNlbnRIZWFsdGhUcmlnZ2VyQCUgSGVhbHRoLCB0aGUgaG9sZGVyIHNwbGl0cyBpbnRvIDMgY29waWVzIG9mIHRoZW1zZWxmIGVhY2ggd2l0aCBAUGVyY2VudEhlYWx0aE9mQ29waWVzQCUgb2YgdGhlaXIgbWF4IEhlYWx0aC5bVW5pcXVlIC0gb25seSAxIHBlciBjaGFtcGlvbl1cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X1N1c3BpY2lvdXNUcmVuY2hDb2F0LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIm1vcmVsbG9ub21pY29uXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9Nb3JlbGxvbm9taWNvblwiLFxyXG4gICAgXCJuYW1lXCI6IFwiTW9yZWxsb25vbWljb25cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIixcclxuICAgICAgXCJnaWFudHMtYmVsdFwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQXR0YWNrcyBhbmQgQWJpbGl0aWVzIGRlYWwgQEJ1cm5QZXJjZW50QCUgQnVybiBhbmQgQEdyaWV2b3VzV291bmRzUGVyY2VudEAlIFdvdW5kIHRvIGVuZW1pZXMgZm9yIEBCdXJuRHVyYXRpb25AIHNlY29uZHMuQnVybjogRGVhbHMgYSBwZXJjZW50IG9mIHRoZSB0YXJnZXQncyBtYXggSGVhbHRoIGFzIHRydWUgZGFtYWdlIGV2ZXJ5IHNlY29uZFdvdW5kOiBSZWR1Y2VzIGhlYWxpbmcgcmVjZWl2ZWRcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX01vcmVsbG9ub21pY29uLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInJlZC1idWZmXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9SYXBpZEZpcmVDYW5ub25cIixcclxuICAgIFwibmFtZVwiOiBcIlJlZCBCdWZmXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcInJlY3VydmUtYm93XCIsXHJcbiAgICAgIFwicmVjdXJ2ZS1ib3dcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkF0dGFja3MgYW5kIEFiaWxpdGllcyBAQnVyblBlcmNlbnRAJSBCdXJuIGFuZCBASGVhbGluZ1JlZHVjdGlvblBjdEAlIFdvdW5kIGVuZW1pZXMgZm9yIEBEdXJhdGlvbkAgc2Vjb25kcy5CdXJuOiBEZWFscyBhIHBlcmNlbnQgb2YgdGhlIHRhcmdldCdzIG1heCBIZWFsdGggYXMgdHJ1ZSBkYW1hZ2UgZXZlcnkgc2Vjb25kV291bmQ6IFJlZHVjZXMgaGVhbGluZyByZWNlaXZlZFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fUmFwaWRGaXJlQ2Fubm9uLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImNyb3duZ3VhcmRcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0Nyb3duZ3VhcmRcIixcclxuICAgIFwibmFtZVwiOiBcIkNyb3duZ3VhcmRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIixcclxuICAgICAgXCJjaGFpbi12ZXN0XCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgU3RhcnQ6IEdhaW4gYSBAU2hpZWxkU2l6ZUAlIG1heCBIZWFsdGggU2hpZWxkIGZvciBAU2hpZWxkRHVyYXRpb25AIHNlY29uZHMuV2hlbiB0aGUgU2hpZWxkIGV4cGlyZXMsIGdhaW4gQFNoaWVsZEJvbnVzQVBAJSBBYmlsaXR5IFBvd2VyLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQ3Jvd25ndWFyZC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJtaXR0ZW5zXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9NaXR0ZW5zXCIsXHJcbiAgICBcIm5hbWVcIjogXCJNaXR0ZW5zXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlNocmlua3MgdGhlIGhvbGRlciwgZ3JhbnRpbmcgdGhlbSBpbmNyZWFzZWQgbW92ZW1lbnQgc3BlZWQgYW5kIGltbXVuaXR5IHRvIFNsb3csIEJ1cm4sIGFuZCBXb3VuZC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X01pdHRlbnMuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiYWRhcHRpdmUtaGVsbVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQWRhcHRpdmVIZWxtXCIsXHJcbiAgICBcIm5hbWVcIjogXCJBZGFwdGl2ZSBIZWxtXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcIm5lZ2F0cm9uLWNsb2FrXCIsXHJcbiAgICAgIFwidGVhci1vZi1nb2RkZXNzXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIGFuIGFkZGl0aW9uYWwgQE1hbmFQZXJjSW5jcmVhc2UqMTAwQCUgTWFuYSBmcm9tIGFsbCBzb3VyY2VzLiBUaGUgaG9sZGVyIGdhaW5zIGFuIGFkZGl0aW9uYWwgYm9udXMgYmFzZWQgb24gdGhlaXIgUm9sZTpUYW5rcyBhbmQgRmlnaHRlcnM6IEdhaW4gQEZyb250bGluZVJlc2lzdHNAIEFybW9yIGFuZCBNYWdpYyBSZXNpc3RhbmNlLk90aGVyIFJvbGVzOiBHYWluIEBCYWNrbGluZUFEQVBAJSBBdHRhY2sgRGFtYWdlIGFuZCBBYmlsaXR5IFBvd2VyLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQWRhcHRpdmVIZWxtLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImRlYXRoZmlyZS1ncmFzcFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUOV9JdGVtX09ybm5EZWF0aGZpcmVHcmFzcFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiRGVhdGhmaXJlIEdyYXNwXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBzdGFydDogQmxhc3QgdGhlIGN1cnJlbnQgdGFyZ2V0IGZvciBAUGVyY2VudE1heEhlYWx0aERhbWFnZUAlIG9mIHRoZWlyIG1heCBIZWFsdGggYXMgbWFnaWMgZGFtYWdlLiBSZXBlYXQgdGhpcyBldmVyeSBAUmVwZWF0VGltZUAgc2Vjb25kcy5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDlfSXRlbV9Pcm5uRGVhdGhmaXJlR3Jhc3AuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiZmxpY2tlcmJsYWRlc1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfTmF2b3JpRmxpY2tlcmJsYWRlc1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiRmxpY2tlcmJsYWRlc1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJBdHRhY2tzIGdyYW50IEBBU1BlclN0YWNrKjEwMEAlIHN0YWNraW5nIEF0dGFjayBTcGVlZC4gRXZlcnkgQFN0YWNrc1BlckJvbnVzQCBhdHRhY2tzIGFsc28gZ3JhbnQgQEFEUGVyQm9udXMqMTAwQCUgQXR0YWNrIERhbWFnZSBhbmQgQEFQUGVyQm9udXNAJSBBYmlsaXR5IFBvd2VyLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJ0aWZhY3RfTmF2b3JpRmxpY2tlcnBsYWRlLlRGVF9URlQxNF81LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiYmx1ZS1idWZmXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9CbHVlQnVmZlwiLFxyXG4gICAgXCJuYW1lXCI6IFwiQmx1ZSBCdWZmXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcInRlYXItb2YtZ29kZGVzc1wiLFxyXG4gICAgICBcInRlYXItb2YtZ29kZGVzc1wiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBATW9kaWZpZWRBREFQKjEwMEAlIGFkZGl0aW9uYWwgQXR0YWNrIERhbWFnZSBhbmQgQWJpbGl0eSBQb3dlciBmcm9tIGFsbCBzb3VyY2VzLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQmx1ZUJ1ZmYuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiY29ycnVwdC12YW1waXJpYy1zY2VwdGVyXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9DdXJzZWRWYW1waXJpY1NjZXB0ZXJcIixcclxuICAgIFwibmFtZVwiOiBcIkNvcnJ1cHQgVmFtcGlyaWMgU2NlcHRlclwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJBdHRhY2tzIGRlYWwgYW4gYWRkaXRpb25hbCBAUGVyY2VudERhbWFnZUAlIEF0dGFjayBEYW1hZ2UgIGFzIHBoeXNpY2FsIGRhbWFnZSBhbmQgaGVhbCB0aGUgaG9sZGVyIGZvciB0aGUgZGFtYWdlIGRlYWx0LlRoZSBob2xkZXIgY2Fubm90IGNhc3QgdGhlaXIgQWJpbGl0eSBvciBnYWluIE1hbmEuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9DdXJzZWRWYW1waXJpY1NjZXB0ZXIuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwibGFzdC13aGlzcGVyXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9MYXN0V2hpc3BlclwiLFxyXG4gICAgXCJuYW1lXCI6IFwiTGFzdCBXaGlzcGVyXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcInJlY3VydmUtYm93XCIsXHJcbiAgICAgIFwic3BhcnJpbmctZ2xvdmVzXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJEYW1hZ2UgZnJvbSBhdHRhY2tzIGFuZCBBYmlsaXRpZXMgQEFybW9yUmVkdWN0aW9uUGVyY2VudEAlIFN1bmRlciB0aGUgdGFyZ2V0IGZvciBAQXJtb3JCcmVha0R1cmF0aW9uQCBzZWNvbmRzLiBUaGlzIGVmZmVjdCBkb2VzIG5vdCBzdGFjay5TdW5kZXI6IFJlZHVjZSBBcm1vclwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fTGFzdFdoaXNwZXIuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiamV3ZWxlZC1nYXVudGxldFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fSmV3ZWxlZEdhdW50bGV0XCIsXHJcbiAgICBcIm5hbWVcIjogXCJKZXdlbGVkIEdhdW50bGV0XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcIm5lZWRsZXNzbHktbGFyZ2Utcm9kXCIsXHJcbiAgICAgIFwic3BhcnJpbmctZ2xvdmVzXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIFByZWNpc2lvbi5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0pld2VsZWRHYXVudGxldC5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ3aXRzLWVuZFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfV2l0c0VuZFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiV2l0J3MgRW5kXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkF0dGFja3MgZGVhbCBAVEZUVW5pdFByb3BlcnR5Lml0ZW06VEZUX0l0ZW1fQXJ0aWZhY3RfV2l0c0VuZF9EYW1hZ2VAIGJvbnVzIG1hZ2ljIGRhbWFnZS5IZWFscyB0aGUgaG9sZGVyIGZvciBAUGVyY2VudEhlYWxpbmdAJSBvZiBhbGwgbWFnaWMgZGFtYWdlIGRlYWx0LkRhbWFnZSBpbmNyZWFzZXMgYmFzZWQgb24gU3RhZ2UuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9XaXRzRW5kLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcImhvcml6b24tZm9jdXNcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0hvcml6b25Gb2N1c1wiLFxyXG4gICAgXCJuYW1lXCI6IFwiSG9yaXpvbiBGb2N1c1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJTdHVubmluZyBhbiBlbmVteSBjYXVzZXMgbGlnaHRuaW5nIHRvIHN0cmlrZSB0aGVtLCBkZWFsaW5nIEBQZXJjZW50SGVhbHRoRGFtYWdlQCUgb2YgdGhlaXIgbWF4IEhlYWx0aCBhcyBtYWdpYyBkYW1hZ2UuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9BcnRpZmFjdF9Ib3Jpem9uRm9jdXMuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFuZHVpbnMtb21lblwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUNF9JdGVtX09ybm5SYW5kdWluc1NhbmN0dW1cIixcclxuICAgIFwibmFtZVwiOiBcIlJhbmR1aW4ncyBPbWVuXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkNvbWJhdCBzdGFydDogR3JhbnQgIEBCb251c0RlZmVuc2VAIEFybW9yIGFuZCAgQEJvbnVzRGVmZW5zZUAgTWFnaWMgUmVzaXN0YW5jZSB0byB0aGUgaG9sZGVyIGFuZCBhZGphY2VudCBhbGxpZXMu4oCL4oCLW1N1cHBvcnQgaXRlbV1cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDRfSXRlbV9Pcm5uUmFuZHVpbnNTYW5jdHVtLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInN0ZWFkZmFzdC1oZWFydFwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fTmlnaHRIYXJ2ZXN0ZXJcIixcclxuICAgIFwibmFtZVwiOiBcIlN0ZWFkZmFzdCBIZWFydFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJjaGFpbi12ZXN0XCIsXHJcbiAgICAgIFwic3BhcnJpbmctZ2xvdmVzXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIEBCYXNlRHVyYWJpbGl0eSoxMDBAJSBEdXJhYmlsaXR5LiBXaGlsZSBhYm92ZSBAVGhyZXNob2xkRm9yRW1wb3dlcioxMDBAJSBIZWFsdGgsIGluc3RlYWQgZ2FpbiBARW1wb3dlcmVkRHVyYWJpbGl0eSoxMDBAJSBEdXJhYmlsaXR5LkBURlRVbml0UHJvcGVydHkuOlRGVF9BdWdtZW50X1dhcm1vZ3NCdWNrbGVfVFJBS2V5QFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fTmlnaHRIYXJ2ZXN0ZXIuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicHJvd2xlcnMtY2xhd1wiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fQXJ0aWZhY3RfUHJvd2xlcnNDbGF3XCIsXHJcbiAgICBcIm5hbWVcIjogXCJQcm93bGVyJ3MgQ2xhd1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJBZnRlciBraWxsaW5nIGEgdGFyZ2V0LCBzaGVkIG5lZ2F0aXZlIGVmZmVjdHMgYW5kIGRhc2ggdG8gdGhlIGZhcnRoZXN0IHRhcmdldCB3aXRoaW4gQEhleFJhbmdlQCBoZXhlcy4gVGhlIG5leHQgMiBjcml0aWNhbCBhdHRhY2tzIGRlYWwgQENyaXREYW1hZ2VCb251c1BlcmNlbnRAJSBib251cyBDcml0aWNhbCBTdHJpa2UgRGFtYWdlLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJ0aWZhY3RfUHJvd2xlcnNDbGF3LlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRhY3RpY2lhbnMtY3Jvd25cIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0ZvcmNlT2ZOYXR1cmVcIixcclxuICAgIFwibmFtZVwiOiBcIlRhY3RpY2lhbidzIENyb3duXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcInNwYXR1bGFcIixcclxuICAgICAgXCJzcGF0dWxhXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJZb3VyIHRlYW0gZ2FpbnMgK0BNYXhBcm15U2l6ZUluY3JlYXNlQCBtYXggdGVhbSBzaXplLkBQZXJjZW50R29sZENoYW5jZUAlIGNoYW5jZSB0byBkcm9wIDEgZ29sZCB3aGVuIHlvdSB3aW4gY29tYmF0LlxcXCIuLi50aGUgSGVhcnQgb2YgYSBoZXJvLi4uXFxcIlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fRm9yY2VPZk5hdHVyZS5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJxdWlja3NpbHZlclwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fUXVpY2tzaWx2ZXJcIixcclxuICAgIFwibmFtZVwiOiBcIlF1aWNrc2lsdmVyXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcInNwYXJyaW5nLWdsb3Zlc1wiLFxyXG4gICAgICBcIm5lZ2F0cm9uLWNsb2FrXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJDb21iYXQgU3RhcnQ6IEdhaW4gaW1tdW5pdHkgdG8gY3Jvd2QgY29udHJvbCBmb3IgQFNwZWxsU2hpZWxkRHVyYXRpb25AIHNlY29uZHMuR2FpbiBAUHJvY0F0dGFja1NwZWVkKjEwMEAlIHN0YWNraW5nIEF0dGFjayBTcGVlZCBldmVyeSBzZWNvbmQuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvSXRlbXMvSGV4Y29yZS9URlRfSXRlbV9RdWlja3NpbHZlci5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJkZWF0aGJsYWRlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9EZWF0aGJsYWRlXCIsXHJcbiAgICBcIm5hbWVcIjogXCJEZWF0aGJsYWRlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcImJmLXN3b3JkXCIsXHJcbiAgICAgIFwiYmYtc3dvcmRcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlBlcmZlY3QgcGVhY2UgYW5kIGNhbG0gZm9yIHRoZSBob2xkZXIgLSBhbmQgYWxsIHdobyBmYWNlIGl0LkBURlRVbml0UHJvcGVydHkuOlRGVF9BdWdtZW50X1RyYWdpY2FsQmxhZGVfVFJBS2V5QFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fRGVhdGhibGFkZS5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ2b2lkLWdhdW50bGV0XCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9Wb2lkR2F1bnRsZXRcIixcclxuICAgIFwibmFtZVwiOiBcIlZvaWQgR2F1bnRsZXRcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiQ29tYmF0IHN0YXJ0OiBTdG9yZSBASW5pdGlhbFBlcmNlbnRIZWFsdGhTdG9yZSoxMDBAJSBtYXggSGVhbHRoIGFuZCBAUGVyY2VudEhlYWx0aFN0b3JlKjEwMEAlIG1vcmUgZXZlcnkgc2Vjb25kLiBPbiBkZWF0aCwgdW5sZWFzaCB0aGUgc3RvcmVkIEhlYWx0aCBhcyBtYWdpYyBkYW1hZ2Ugc3BsaXQgYmV0d2VlbiBlbmVtaWVzIHdpdGhpbiBASGV4UmFkaXVzQC1oZXhlcy5bVW5pcXVlIC0gb25seSAxIHBlciBjaGFtcGlvbl1cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE2X0FydGlmYWN0X1ZvaWRHYXVudGxldC5URlRfU2V0MTYudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJzaWx2ZXJtZXJlLWRhd25cIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X1NpbHZlcm1lcmVEYXduXCIsXHJcbiAgICBcIm5hbWVcIjogXCJTaWx2ZXJtZXJlIERhd25cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcImFydGlmYWN0XCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR3JhbnRzIGltbXVuaXR5IHRvIFN0dW5zIGFuZCB0aGUgaG9sZGVyJ3MgYXR0YWNrcyBTdHVuIHRoZSB0YXJnZXQgZm9yIEBTdHVuRHVyYXRpb25AIHNlY29uZHMuVGhlIGhvbGRlcidzIEF0dGFjayBTcGVlZCBpcyBsb2NrZWQgYXQgQEF0dGFja1NwZWVkQ2FwQC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0FydGlmYWN0X1NpbHZlcm1lcmVEYXduLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRhY3RpY2lhbnMtc2hpZWxkXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9UYWN0aWNpYW5zU2NlcHRlclwiLFxyXG4gICAgXCJuYW1lXCI6IFwiVGFjdGljaWFuJ3MgU2hpZWxkXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcImZyeWluZy1wYW5cIixcclxuICAgICAgXCJmcnlpbmctcGFuXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJZb3VyIHRlYW0gZ2FpbnMgK0BNYXhBcm15U2l6ZUluY3JlYXNlQCBtYXggdGVhbSBzaXplLkBQZXJjZW50R29sZENoYW5jZUAlIGNoYW5jZSB0byBkcm9wIDEgZ29sZCB3aGVuIHRoZSBob2xkZXIgZGllcy5cXFwiSW1idWVkIHdpdGggYSBQaGlsb3NvcGhlcidzIHdpc2RvbS4uLlxcXCJcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX1RhY3RpY2lhbnNTY2VwdGVyLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcIndhcm1vZ3MtYXJtb3JcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX1dhcm1vZ3NBcm1vclwiLFxyXG4gICAgXCJuYW1lXCI6IFwiV2FybW9nJ3MgQXJtb3JcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwiZ2lhbnRzLWJlbHRcIixcclxuICAgICAgXCJnaWFudHMtYmVsdFwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwiR2FpbiBAQm9udXNQZXJjZW50SFAqMTAwQCUgbWF4IEhlYWx0aC5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX1dhcm1vZ3NBcm1vci5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJzZWVrZXJzLWFybWd1YXJkXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlRfSXRlbV9BcnRpZmFjdF9TZWVrZXJzQXJtZ3VhcmRcIixcclxuICAgIFwibmFtZVwiOiBcIlNlZWtlcidzIEFybWd1YXJkXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRha2Vkb3ducyBpbmNyZWFzZSB0aGUgaG9sZGVyJ3MgQXJtb3IsIE1hZ2ljIFJlc2lzdCwgYW5kIEFiaWxpdHkgUG93ZXIgYnkgQFN0YXRzUGVyVGFrZWRvd25ALlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fQXJ0aWZhY3RfU2Vla2Vyc0FybWd1YXJkLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInZvaWQtc3RhZmZcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX1N0YXRpa2tTaGl2XCIsXHJcbiAgICBcIm5hbWVcIjogXCJWb2lkIFN0YWZmXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcInJlY3VydmUtYm93XCIsXHJcbiAgICAgIFwidGVhci1vZi1nb2RkZXNzXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJEYW1hZ2UgZnJvbSBhdHRhY2tzIGFuZCBBYmlsaXRpZXMgQE1SU2hyZWRAJSBTaHJlZCB0aGUgdGFyZ2V0IGZvciBATVJTaHJlZER1cmF0aW9uQCBzZWNvbmRzLiBUaGlzIGVmZmVjdCBkb2VzIG5vdCBzdGFjay5TaHJlZDogUmVkdWNlIE1hZ2ljIFJlc2lzdFwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUX0l0ZW1fVm9pZFN0YWZmLlRGVF9URlQxNF81LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiZ29sZC1jb2xsZWN0b3JcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDRfSXRlbV9Pcm5uVGhlQ29sbGVjdG9yXCIsXHJcbiAgICBcIm5hbWVcIjogXCJHb2xkIENvbGxlY3RvclwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwiYXJ0aWZhY3RcIixcclxuICAgIFwic3RhdHNcIjogXCJBdHRhY2tzIGFuZCBBYmlsaXRpZXMgZXhlY3V0ZSBlbmVtaWVzIGJlbG93IEBFeGVjdXRlUGVyY2VudEAlIG9mIHRoZWlyIG1heGltdW0gSGVhbHRoLiBFeGVjdXRpb25zIGhhdmUgYSBAR29sZENoYW5jZUAlIGNoYW5jZSB0byBkcm9wICAxIGdvbGQuR29sZCBDb2xsZWN0ZWQ6IEBURlRVbml0UHJvcGVydHkuaXRlbTpURlRfVHJhY2tlcl9WYWx1ZTFAZ1tVbmlxdWUgLSBvbmx5IDEgcGVyIGNoYW1waW9uXVwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0l0ZW1zL0hleGNvcmUvVEZUNF9JdGVtX09ybm5UaGVDb2xsZWN0b3IuVEZUX1NldDEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiY2FwcGEtanVpY2VcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVF9JdGVtX0FydGlmYWN0X0NhcHBhSnVpY2VcIixcclxuICAgIFwibmFtZVwiOiBcIkNhcHBhIEp1aWNlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIgZG9ucyBhIEhhdCBvbiBlYWNoIHRha2Vkb3duLiBUaGUgaG9sZGVyIGdhaW5zIEBBREFQUGVyVGFrZWRvd25AJSBBdHRhY2sgRGFtYWdlIGFuZCBBYmlsaXR5IFBvd2VyIHBlciBIYXQuIE9uIGRlYXRoIGxvc2UgQFBlcmNlbnRIYXRMb3NzKjEwMEAlIG9mIGFsbCBIYXRzLiZuYnNwOyhIYXRzOiZuYnNwO0BURlRVbml0UHJvcGVydHkudHJhaXQ6VEZUX0l0ZW1fQXJ0aWZhY3RfQ2FwcGFKdWljZV9OdW1IYXRzQClcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVDE2X0FydGlmYWN0X0thcHBhSnVpY2UuVEZUX1NldDE2LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwiaGV4dGVjaC1ndW5ibGFkZVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0l0ZW1fSGV4dGVjaEd1bmJsYWRlXCIsXHJcbiAgICBcIm5hbWVcIjogXCJIZXh0ZWNoIEd1bmJsYWRlXCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW1xyXG4gICAgICBcImJmLXN3b3JkXCIsXHJcbiAgICAgIFwibmVlZGxlc3NseS1sYXJnZS1yb2RcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkhlYWwgdGhlIGxvd2VzdCBwZXJjZW50IEhlYWx0aCBhbGx5IGZvciBAQWxseUhlYWxpbmcqMTAwQCUgb2YgZGFtYWdlIGRlYWx0LkFsbHkgSGVhbGluZzogQFRGVFVuaXRQcm9wZXJ0eS5pdGVtOlRGVF9UcmFja2VyX1ZhbHVlMUBcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9JdGVtcy9IZXhjb3JlL1RGVF9JdGVtX0hleHRlY2hHdW5ibGFkZS5URlRfU2V0MTMudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZXN0YXJndWFyZGlhbnNwYXR1bGFpdGVtXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQzX0l0ZW1fU3Rhckd1YXJkaWFuU3BhdHVsYUl0ZW1cIixcclxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfU3Rhckd1YXJkaWFuU3BhdHVsYUl0ZW1cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwidGVhci1vZi1nb2RkZXNzXCIsXHJcbiAgICAgIFwic3BhdHVsYVwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fU3Rhckd1YXJkaWFuU3BhdHVsYUl0ZW1cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvVEZUM19JdGVtX1N0YXJHdWFyZGlhbi50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1ldW1icmFsZ2xhaXZlXCIsXHJcbiAgICBcImFwaU5hbWVcIjogXCJURlQzX0l0ZW1fQmxhZGVtYXN0ZXJTcGF0dWxhSXRlbVwiLFxyXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9VbWJyYWxHbGFpdmVcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwiYmYtc3dvcmRcIixcclxuICAgICAgXCJzcGF0dWxhXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9TbGljZXJTcGF0dWxhSXRlbVwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9URlQzX0l0ZW1fQmxhZGVtYXN0ZXIudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJ0ZnRpdGVtbmFtZWluZmlsdHJhdG9yc3BhdHVsYWl0ZW1cIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDNfSXRlbV9JbmZpbHRyYXRvclNwYXR1bGFJdGVtXCIsXHJcbiAgICBcIm5hbWVcIjogXCJ0ZnRfaXRlbV9uYW1lX0luZmlsdHJhdG9yU3BhdHVsYUl0ZW1cIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXHJcbiAgICAgIFwicmVjdXJ2ZS1ib3dcIixcclxuICAgICAgXCJzcGF0dWxhXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9JbmZpbHRyYXRvclNwYXR1bGFJdGVtXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL1RGVDNfSXRlbV9JbmZpbHRyYXRvci50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1lY2VsZXN0aWFsc3BhdHVsYWl0ZW1cIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDNfSXRlbV9DZWxlc3RpYWxTcGF0dWxhSXRlbVwiLFxyXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9DZWxlc3RpYWxTcGF0dWxhSXRlbVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJzcGF0dWxhXCIsXHJcbiAgICAgIFwibmVnYXRyb24tY2xvYWtcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX0NlbGVzdGlhbFNwYXR1bGFJdGVtXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL1RGVDNfSXRlbV9DZWxlc3RpYWwudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJwcm90ZWN0b3JzLWNoZXN0Z3VhcmRcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDNfSXRlbV9Qcm90ZWN0b3JTcGF0dWxhSXRlbVwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUHJvdGVjdG9yJ3MgQ2hlc3RndWFyZFwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJzcGF0dWxhXCIsXHJcbiAgICAgIFwiZ2lhbnRzLWJlbHRcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRoZSBob2xkZXIgZ2FpbnMgdGhlIFByb3RlY3RvciB0cmFpdC5bVW5pcXVlIC0gb25seSAxIHBlciBjaGFtcGlvbl1cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvVEZUM19JdGVtX1Byb3RlY3Rvci50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1lZGFya3N0YXJzcGF0dWxhaXRlbVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUM19JdGVtX0RhcmtTdGFyU3BhdHVsYUl0ZW1cIixcclxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfRGFya1N0YXJTcGF0dWxhSXRlbVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJzcGFycmluZy1nbG92ZXNcIixcclxuICAgICAgXCJzcGF0dWxhXCJcclxuICAgIF0sXHJcbiAgICBcInR5cGVcIjogXCJub3JtYWxcIixcclxuICAgIFwic3RhdHNcIjogXCJ0ZnRfaXRlbV9kZXNjcmlwdGlvbl9EYXJrU3RhclNwYXR1bGFJdGVtXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL1RGVDNfSXRlbV9EYXJrU3Rhci50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1lcmViZWxzcGF0dWxhaXRlbVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUM19JdGVtX1JlYmVsU3BhdHVsYUl0ZW1cIixcclxuICAgIFwibmFtZVwiOiBcInRmdF9pdGVtX25hbWVfUmViZWxTcGF0dWxhSXRlbVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJjaGFpbi12ZXN0XCIsXHJcbiAgICAgIFwic3BhdHVsYVwiXHJcbiAgICBdLFxyXG4gICAgXCJ0eXBlXCI6IFwibm9ybWFsXCIsXHJcbiAgICBcInN0YXRzXCI6IFwidGZ0X2l0ZW1fZGVzY3JpcHRpb25fUmViZWxTcGF0dWxhSXRlbVwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvUGFydGljbGVzL1RGVC9URlQzX0l0ZW1fUmViZWwudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJiYXR0bGVjYXN0LXBsYXRpbmdcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDNfSXRlbV9CYXR0bGVjYXN0U3BhdHVsYUl0ZW1cIixcclxuICAgIFwibmFtZVwiOiBcIkJhdHRsZWNhc3QgUGxhdGluZ1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtcclxuICAgICAgXCJuZWVkbGVzc2x5LWxhcmdlLXJvZFwiLFxyXG4gICAgICBcInNwYXR1bGFcIlxyXG4gICAgXSxcclxuICAgIFwidHlwZVwiOiBcIm5vcm1hbFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlRoZSB3ZWFyZXIgZ2FpbnMgdGhlIEJhdHRsZWNhc3QgdHJhaXQuW1VuaXF1ZSAtIE9ubHkgT25lIFBlciBDaGFtcGlvbl1cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1BhcnRpY2xlcy9URlQvVEZUX0l0ZW1fQmF0dGxlY2FzdC50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInRmdGl0ZW1uYW1lcmFkaWFudHNwYXR1bGFcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDVfSXRlbV9TcGF0dWxhUmFkaWFudFwiLFxyXG4gICAgXCJuYW1lXCI6IFwidGZ0X2l0ZW1fbmFtZV9SYWRpYW50U3BhdHVsYVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcInRmdF9pdGVtX2Rlc2NyaXB0aW9uX1JhZGlhbnRTcGF0dWxhXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9QYXJ0aWNsZXMvVEZUL0l0ZW1fSWNvbnMvVHJhaXRzL1NwYXR1bGEvU3BhdHVsYV9SYWRpYW50LnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1yZWZhY3RvclwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUMTFfQXVnbWVudF9SYWRpYW50UmVmYWN0b3JcIixcclxuICAgIFwibmFtZVwiOiBcIlJhZGlhbnQgUmVmYWN0b3JcIixcclxuICAgIFwiY29tcG9uZW50c1wiOiBbXSxcclxuICAgIFwidHlwZVwiOiBcInJhZGlhbnRcIixcclxuICAgIFwic3RhdHNcIjogXCJHYWluIGEgTWFzdGVyd29yayBVcGdyYWRlIGFuZCBAYW52aWxzQCBjb21wb25lbnQgYW52aWwuTWFzdGVyd29yayBVcGdyYWRlIHVwZ3JhZGVzIGFuIGl0ZW0gdG8gUmFkaWFudCFcIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy9IZXhjb3JlL1JhZGlhbnRSZWZhY3Rvcl9JSUkudGV4XCJcclxuICB9LFxyXG4gIHtcclxuICAgIFwiaWRcIjogXCJhcnRpZmFjdG9yeVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUX0F1Z21lbnRfQXJ0aWZhY3RvcnlcIixcclxuICAgIFwibmFtZVwiOiBcIkFydGlmYWN0b3J5XCIsXHJcbiAgICBcImNvbXBvbmVudHNcIjogW10sXHJcbiAgICBcInR5cGVcIjogXCJhcnRpZmFjdFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkF0IHRoZSBzdGFydCBvZiBlYWNoIHR1cm4sIHlvdXIgYmVuY2hlZCBjb21wbGV0ZWQgaXRlbXMgdHJhbnNmb3JtIGludG8gYSByYW5kb20gQXJ0aWZhY3QgaXRlbS4gR2FpbiBATnVtSXRlbXNAIEFydGlmYWN0IEFudmlsIGFuZCBATnVtUmVtb3ZlcnNAIFJlbW92ZXJzLlwiLFxyXG4gICAgXCJpY29uXCI6IFwiQVNTRVRTL01hcHMvVEZUL0ljb25zL0F1Z21lbnRzL0hleGNvcmUvQXJ0aWZhY3RvcnlfSUlJLlRGVF9TZXQxMy50ZXhcIlxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJpZFwiOiBcInBhbmRvcmFzLWl0ZW1zLWlpaVwiLFxyXG4gICAgXCJhcGlOYW1lXCI6IFwiVEZUOV9BdWdtZW50X1BhbmRvcmFzUmFkaWFudEJveFwiLFxyXG4gICAgXCJuYW1lXCI6IFwiUGFuZG9yYSdzIEl0ZW1zIElJSVwiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIlJvdW5kIHN0YXJ0OiBpdGVtcyBvbiB5b3VyIGJlbmNoIGFyZSByYW5kb21pemVkLiBHYWluIDEgcmFuZG9tIFJhZGlhbnQgaXRlbS5cIixcclxuICAgIFwiaWNvblwiOiBcIkFTU0VUUy9NYXBzL1RGVC9JY29ucy9BdWdtZW50cy9IZXhjb3JlL1BhbmRvcmEzLnRleFwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlkXCI6IFwicmFkaWFudC1yZWxpY3NcIixcclxuICAgIFwiYXBpTmFtZVwiOiBcIlRGVDZfQXVnbWVudF9SYWRpYW50UmVsaWNzXCIsXHJcbiAgICBcIm5hbWVcIjogXCJSYWRpYW50IFJlbGljc1wiLFxyXG4gICAgXCJjb21wb25lbnRzXCI6IFtdLFxyXG4gICAgXCJ0eXBlXCI6IFwicmFkaWFudFwiLFxyXG4gICAgXCJzdGF0c1wiOiBcIkNob29zZSAxIG9mIEBBcm1vcnlDaG9pY2VDb3VudEAgUmFkaWFudCBpdGVtcy4gR2FpbiBhIE1hZ25ldGljIFJlbW92ZXIuUmFkaWFudCBpdGVtcyBhcmUgdmVyeSBwb3dlcmZ1bCB2ZXJzaW9ucyBvZiBjb21wbGV0ZWQgaXRlbXMuXCIsXHJcbiAgICBcImljb25cIjogXCJBU1NFVFMvTWFwcy9URlQvSWNvbnMvQXVnbWVudHMvSGV4Y29yZS9SYWRpYW50UmVsaWMtSUlJLnRleFwiXHJcbiAgfVxyXG5dO1xyXG5cclxuZXhwb3J0IGNvbnN0IGl0ZW1NYXAgPSBuZXcgTWFwKGl0ZW1zLm1hcChpID0+IFtpLmlkLCBpXSkpO1xyXG5cclxuLy8gYXBpTmFtZSDihpIgaWQgbG9va3VwLCB1c2VkIHdoZW4gbWFwcGluZyBleHRlcm5hbCB0aWVyLWxpc3QgZGF0YSAoUmlvdC9jZHJhZ29uXHJcbi8vIGFwaU5hbWVzIGxpa2UgXCJURlRfSXRlbV9BcnRpZmFjdF9Qcm93bGVyc0NsYXdcIikgb250byBvdXIga2ViYWItY2FzZSBpZHMuXHJcbmV4cG9ydCBjb25zdCBpdGVtQnlBcGlOYW1lID0gbmV3IE1hcChpdGVtcy5maWx0ZXIoaSA9PiBpLmFwaU5hbWUpLm1hcChpID0+IFtpLmFwaU5hbWUhLCBpXSkpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENyYWZ0YWJsZUl0ZW0oY29tcDE6IHN0cmluZywgY29tcDI6IHN0cmluZyk6IEl0ZW0gfCB1bmRlZmluZWQge1xyXG4gIHJldHVybiBpdGVtcy5maW5kKGl0ZW0gPT5cclxuICAgIGl0ZW0uY29tcG9uZW50cyAmJlxyXG4gICAgKChpdGVtLmNvbXBvbmVudHNbMF0gPT09IGNvbXAxICYmIGl0ZW0uY29tcG9uZW50c1sxXSA9PT0gY29tcDIpIHx8XHJcbiAgICAgKGl0ZW0uY29tcG9uZW50c1swXSA9PT0gY29tcDIgJiYgaXRlbS5jb21wb25lbnRzWzFdID09PSBjb21wMSkpXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQ3JhZnRpbmdNYXRyaXgoKTogTWFwPHN0cmluZywgTWFwPHN0cmluZywgSXRlbT4+IHtcclxuICBjb25zdCBtYXRyaXggPSBuZXcgTWFwPHN0cmluZywgTWFwPHN0cmluZywgSXRlbT4+KCk7XHJcbiAgZm9yIChjb25zdCBjb21wIG9mIGNvbXBvbmVudHMpIG1hdHJpeC5zZXQoY29tcC5pZCwgbmV3IE1hcCgpKTtcclxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgIGlmICghaXRlbS5jb21wb25lbnRzIHx8IGl0ZW0uY29tcG9uZW50cy5sZW5ndGggIT09IDIpIGNvbnRpbnVlO1xyXG4gICAgY29uc3QgW2MxLCBjMl0gPSBpdGVtLmNvbXBvbmVudHM7XHJcbiAgICBtYXRyaXguZ2V0KGMxKT8uc2V0KGMyLCBpdGVtKTtcclxuICAgIGlmIChjMSAhPT0gYzIpIG1hdHJpeC5nZXQoYzIpPy5zZXQoYzEsIGl0ZW0pO1xyXG4gIH1cclxuICByZXR1cm4gbWF0cml4O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlbXNGcm9tQ29tcG9uZW50KGNvbXBvbmVudElkOiBzdHJpbmcpOiBJdGVtW10ge1xyXG4gIHJldHVybiBpdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmNvbXBvbmVudHMgJiYgaXRlbS5jb21wb25lbnRzLmxlbmd0aCA9PT0gMiAmJiAoaXRlbS5jb21wb25lbnRzIGFzIHN0cmluZ1tdKS5pbmNsdWRlcyhjb21wb25lbnRJZCkpO1xyXG59XHJcbiIsIi8vIFBpdm90VEZUIC0gU2V0IDE3IFBvc2l0aW9uaW5nIEJvYXJkc1xuLy8gVEZUIGJvYXJkIGlzIDQgcm93cyB4IDcgY29sdW1ucyA9IDI4IGhleGVzIChyb3dzIDAtMywgY29scyAwLTYpXG4vLyBIZXggbGF5b3V0OiBldmVuIHJvd3Mgc3RhcnQgZmx1c2gsIG9kZCByb3dzIG9mZnNldCByaWdodCBieSAwLjVcblxuZXhwb3J0IGludGVyZmFjZSBIZXhQbGFjZW1lbnQge1xuICByb3c6IG51bWJlcjsgICAvLyAwPWJhY2ssIDM9ZnJvbnRcbiAgY29sOiBudW1iZXI7ICAgLy8gMC02XG4gIGNoYW1waW9uSWQ6IHN0cmluZztcbiAgcm9sZTogJ2NhcnJ5JyB8ICd0YW5rJyB8ICdzdXBwb3J0JyB8ICdhc3Nhc3Npbic7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9zaXRpb25pbmdHdWlkZSB7XG4gIGNvbXBJZDogc3RyaW5nO1xuICBwbGFjZW1lbnRzOiBIZXhQbGFjZW1lbnRbXTtcbiAgbm90ZXM6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IHBvc2l0aW9uaW5nR3VpZGVzOiBQb3NpdGlvbmluZ0d1aWRlW10gPSBbXG4gIC8vID09PT09IFMgVElFUiA9PT09PVxuICB7XG4gICAgY29tcElkOiAnbW9yZ2FuYS1kYXJrLWxhZHknLFxuICAgIHBsYWNlbWVudHM6IFtcbiAgICAgIHsgcm93OiAzLCBjb2w6IDEsIGNoYW1waW9uSWQ6ICdURlQxN19Nb3JkZWthaXNlcicsIHJvbGU6ICd0YW5rJyB9LFxuICAgICAgeyByb3c6IDMsIGNvbDogMiwgY2hhbXBpb25JZDogJ1RGVDE3X1NoZW4nLCAgICAgICAgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMywgY29sOiAzLCBjaGFtcGlvbklkOiAnVEZUMTdfTGlzc2FuZHJhJywgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAxLCBjb2w6IDMsIGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogMCwgY2hhbXBpb25JZDogJ1RGVDE3X01vcmdhbmEnLCAgICAgcm9sZTogJ2NhcnJ5JyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogNSwgY2hhbXBpb25JZDogJ1RGVDE3X1ZleCcsICAgICAgICAgcm9sZTogJ2NhcnJ5JyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogNiwgY2hhbXBpb25JZDogJ1RGVDE3X0poaW4nLCAgICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgXSxcbiAgICBub3RlczogJ01vcmdhbmEgb3Bwb3NpdGUtY29ybmVyIGZyb20gZW5lbXkgY2FycnkuIFNoZW4gZnJvbnRsaW5lLWNlbnRlciBmb3IgQnVsd2FyayBzaGllbGQuIFZleCArIEpoaW4gc2Vjb25kYXJ5IGJhY2tsaW5lIHByZXNzdXJlLidcbiAgfSxcbiAge1xuICAgIGNvbXBJZDogJ2poaW4tZGFyay1zdGFyLXNuaXBlcnMnLFxuICAgIHBsYWNlbWVudHM6IFtcbiAgICAgIHsgcm93OiAzLCBjb2w6IDEsIGNoYW1waW9uSWQ6ICdURlQxN19Nb3JkZWthaXNlcicsIHJvbGU6ICd0YW5rJyB9LFxuICAgICAgeyByb3c6IDMsIGNvbDogMiwgY2hhbXBpb25JZDogJ1RGVDE3X0xpc3NhbmRyYScsICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMywgY29sOiAzLCBjaGFtcGlvbklkOiAnVEZUMTdfU2hlbicsICAgICAgICByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAyLCBjb2w6IDUsIGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogMCwgY2hhbXBpb25JZDogJ1RGVDE3X0poaW4nLCAgICAgICAgcm9sZTogJ2NhcnJ5JyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogMSwgY2hhbXBpb25JZDogJ1RGVDE3X1hheWFoJywgICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiA1LCBjaGFtcGlvbklkOiAnVEZUMTdfRXpyZWFsJywgICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAwLCBjb2w6IDYsIGNoYW1waW9uSWQ6ICdURlQxN19HbmFyJywgICAgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgIF0sXG4gICAgbm90ZXM6ICdTbmlwZXJzIHN0YWNrZWQgYWNyb3NzIHRoZSBiYWNrIHJvdyBmb3IgbWF4IHJhbmdlLiBGcm9udGxpbmUgYWJzb3JicyB3aGlsZSBKaGluIHJlYWNoZXMgaGlzIGZvdXJ0aCBzaG90LidcbiAgfSxcbiAge1xuICAgIGNvbXBJZDogJ3hheWFoLXN0YXJnYXplcicsXG4gICAgcGxhY2VtZW50czogW1xuICAgICAgeyByb3c6IDMsIGNvbDogMSwgY2hhbXBpb25JZDogJ1RGVDE3X0pheCcsICAgICAgICAgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMywgY29sOiAyLCBjaGFtcGlvbklkOiAnVEZUMTdfTnVudScsICAgICAgICByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAyLCBjb2w6IDQsIGNoYW1waW9uSWQ6ICdURlQxN19UYWxvbicsICAgICAgIHJvbGU6ICdhc3Nhc3NpbicgfSxcbiAgICAgIHsgcm93OiAxLCBjb2w6IDAsIGNoYW1waW9uSWQ6ICdURlQxN19MdWx1JywgICAgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgICAgeyByb3c6IDEsIGNvbDogNSwgY2hhbXBpb25JZDogJ1RGVDE3X1R3aXN0ZWRGYXRlJywgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiA2LCBjaGFtcGlvbklkOiAnVEZUMTdfWGF5YWgnLCAgICAgICByb2xlOiAnY2FycnknIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiA1LCBjaGFtcGlvbklkOiAnVEZUMTdfQ2FpdGx5bicsICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAwLCBjb2w6IDAsIGNoYW1waW9uSWQ6ICdURlQxN19NaWxpbycsICAgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgIF0sXG4gICAgbm90ZXM6ICdYYXlhaCBiYWNrLWNvcm5lciBvcHBvc2l0ZSBlbmVteSBjYXJyeS4gSmF4ICsgTnVudSBmcm9udGxpbmUgZm9yIEJhc3Rpb24gLyBTdGFyZ2F6ZXIgaGV4ZXMuIE1pbGlvIHNhZmUgY29ybmVyIGZvciBzaGllbGRpbmcuJ1xuICB9LFxuXG4gIC8vID09PT09IEEgVElFUiA9PT09PVxuICB7XG4gICAgY29tcElkOiAncHJpbW9yZGlhbi1yZXJvbGwnLFxuICAgIHBsYWNlbWVudHM6IFtcbiAgICAgIHsgcm93OiAzLCBjb2w6IDAsIGNoYW1waW9uSWQ6ICdURlQxN19NYW9rYWknLCAgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMywgY29sOiAyLCBjaGFtcGlvbklkOiAnVEZUMTdfUmVrU2FpJywgIHJvbGU6ICdjYXJyeScgfSxcbiAgICAgIHsgcm93OiAzLCBjb2w6IDMsIGNoYW1waW9uSWQ6ICdURlQxN19CcmlhcicsICAgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMiwgY29sOiAxLCBjaGFtcGlvbklkOiAnVEZUMTdfQmVsdmV0aCcsIHJvbGU6ICdjYXJyeScgfSxcbiAgICAgIHsgcm93OiAyLCBjb2w6IDUsIGNoYW1waW9uSWQ6ICdURlQxN19JbGxhb2knLCAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMSwgY29sOiAwLCBjaGFtcGlvbklkOiAnVEZUMTdfQXVyb3JhJywgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgIF0sXG4gICAgbm90ZXM6IFwiUmVrJ1NhaSBmcm9udGxpbmUtY2VudGVyIGZvciBtYXggYWdncm8uIEJlbCdWZXRoIHJvdyBiZWhpbmQgdG8gY2xlYW4gdXAuIEF1cm9yYSBiYWNrIGNvcm5lciBmb3IgQW5pbWEgdHJhaXQuXCJcbiAgfSxcbiAge1xuICAgIGNvbXBJZDogJ21lY2hhLWFzb2wnLFxuICAgIHBsYWNlbWVudHM6IFtcbiAgICAgIHsgcm93OiAzLCBjb2w6IDEsIGNoYW1waW9uSWQ6ICdURlQxN19HYWxpbycsICAgICAgIHJvbGU6ICd0YW5rJyB9LFxuICAgICAgeyByb3c6IDMsIGNvbDogMiwgY2hhbXBpb25JZDogJ1RGVDE3X1VyZ290JywgICAgICAgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMywgY29sOiAzLCBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZGVrYWlzZXInLCByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAzLCBjb2w6IDQsIGNoYW1waW9uSWQ6ICdURlQxN19CbGl0emNyYW5rJywgIHJvbGU6ICd0YW5rJyB9LFxuICAgICAgeyByb3c6IDEsIGNvbDogMywgY2hhbXBpb25JZDogJ1RGVDE3X0F1cmVsaW9uU29sJywgcm9sZTogJ2NhcnJ5JyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogMCwgY2hhbXBpb25JZDogJ1RGVDE3X0thcm1hJywgICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiA1LCBjaGFtcGlvbklkOiAnVEZUMTdfVmlrdG9yJywgICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAwLCBjb2w6IDYsIGNoYW1waW9uSWQ6ICdURlQxN19CYXJkJywgICAgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgIF0sXG4gICAgbm90ZXM6ICdBU29sIG1pZC1ib2FyZCBmb3IgbWF4IEFvRS4gQmxpdHpjcmFuayBwdWxscyBwcmlvcml0eSB0YXJnZXRzLiA0IE1lY2hhIGZyb250bGluZSB0YW5rcyB0aGUgYnVyc3QuJ1xuICB9LFxuICB7XG4gICAgY29tcElkOiAnemVkLWdhbGF4eS1odW50ZXInLFxuICAgIHBsYWNlbWVudHM6IFtcbiAgICAgIHsgcm93OiAzLCBjb2w6IDAsIGNoYW1waW9uSWQ6ICdURlQxN19Nb3JkZWthaXNlcicsIHJvbGU6ICd0YW5rJyB9LFxuICAgICAgeyByb3c6IDMsIGNvbDogMSwgY2hhbXBpb25JZDogJ1RGVDE3X0xpc3NhbmRyYScsICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMywgY29sOiAyLCBjaGFtcGlvbklkOiAnVEZUMTdfU2hlbicsICAgICAgICByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAyLCBjb2w6IDYsIGNoYW1waW9uSWQ6ICdURlQxN19Ba2FsaScsICAgICAgIHJvbGU6ICdhc3Nhc3NpbicgfSxcbiAgICAgIHsgcm93OiAxLCBjb2w6IDYsIGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogNiwgY2hhbXBpb25JZDogJ1RGVDE3X1plZCcsICAgICAgICAgcm9sZTogJ2Fzc2Fzc2luJyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogNSwgY2hhbXBpb25JZDogJ1RGVDE3X1RhbG9uJywgICAgICAgcm9sZTogJ2Fzc2Fzc2luJyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogNCwgY2hhbXBpb25JZDogJ1RGVDE3X0thaXNhJywgICAgICAgcm9sZTogJ2Fzc2Fzc2luJyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogMCwgY2hhbXBpb25JZDogJ1RGVDE3X0poaW4nLCAgICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgXSxcbiAgICBub3RlczogJ1JvZ3VlIHN0YWNrIGJhY2stcmlnaHQgY29ybmVyIHRvIGRpdmUgZW5lbXkgY2FycnkuIEZyb250bGluZSBvcHBvc2l0ZSBzaWRlIGJhaXRzIGFnZ3JvLiBKaGluIGxvbmUtY29ybmVyIERQUy4nXG4gIH0sXG5cbiAgLy8gPT09PT0gQiBUSUVSID09PT09XG4gIHtcbiAgICBjb21wSWQ6ICdwc2lvbmljLXB5a2UtcmVyb2xsJyxcbiAgICBwbGFjZW1lbnRzOiBbXG4gICAgICB7IHJvdzogMywgY29sOiAxLCBjaGFtcGlvbklkOiAnVEZUMTdfR3JhZ2FzJywgICByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAzLCBjb2w6IDIsIGNoYW1waW9uSWQ6ICdURlQxN19NYXN0ZXJZaScsIHJvbGU6ICd0YW5rJyB9LFxuICAgICAgeyByb3c6IDIsIGNvbDogMSwgY2hhbXBpb25JZDogJ1RGVDE3X1Zpa3RvcicsICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMSwgY29sOiAzLCBjaGFtcGlvbklkOiAnVEZUMTdfU29uYScsICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAwLCBjb2w6IDYsIGNoYW1waW9uSWQ6ICdURlQxN19QeWtlJywgICAgIHJvbGU6ICdhc3Nhc3NpbicgfSxcbiAgICAgIHsgcm93OiAwLCBjb2w6IDAsIGNoYW1waW9uSWQ6ICdURlQxN19LYXJtYScsICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgIF0sXG4gICAgbm90ZXM6ICdQeWtlIGp1bXBzIGJhY2tsaW5lLiBHcmFnYXMgKyBNYXN0ZXIgWWkgZnJvbnRsaW5lIGFic29yYi4gVmlrdG9yICsgU29uYSBQc2lvbmljIGFuY2hvcnMgbWlkLidcbiAgfSxcbiAge1xuICAgIGNvbXBJZDogJ3NvbmEtY29tbWFuZGVyJyxcbiAgICBwbGFjZW1lbnRzOiBbXG4gICAgICB7IHJvdzogMywgY29sOiAxLCBjaGFtcGlvbklkOiAnVEZUMTdfU2hlbicsICAgICAgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMywgY29sOiAyLCBjaGFtcGlvbklkOiAnVEZUMTdfSWxsYW9pJywgICAgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMywgY29sOiAzLCBjaGFtcGlvbklkOiAnVEZUMTdfTGlzc2FuZHJhJywgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMiwgY29sOiAxLCBjaGFtcGlvbklkOiAnVEZUMTdfVGVlbW8nLCAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMSwgY29sOiA0LCBjaGFtcGlvbklkOiAnVEZUMTdfS2FybWEnLCAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMSwgY29sOiA1LCBjaGFtcGlvbklkOiAnVEZUMTdfQmFyZCcsICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiAwLCBjaGFtcGlvbklkOiAnVEZUMTdfU29uYScsICAgICAgcm9sZTogJ2NhcnJ5JyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogNSwgY2hhbXBpb25JZDogJ1RGVDE3X0xlYmxhbmMnLCAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgIF0sXG4gICAgbm90ZXM6ICdTb25hIHNhZmUgY29ybmVyIGZvciBDb21tYW5kZXIgYXVyYSB1cHRpbWUuIFNoZXBoZXJkIGZyb250bGluZSBzcHJlYWQgZm9yIG1heCBoZWFsIGNvdmVyYWdlLidcbiAgfSxcblxuICAvLyA9PT09PSBDIFRJRVIgPT09PT1cbiAge1xuICAgIGNvbXBJZDogJ2FuaW1hLWZpb3JhJyxcbiAgICBwbGFjZW1lbnRzOiBbXG4gICAgICB7IHJvdzogMywgY29sOiAxLCBjaGFtcGlvbklkOiAnVEZUMTdfTW9yZGVrYWlzZXInLCByb2xlOiAndGFuaycgfSxcbiAgICAgIHsgcm93OiAzLCBjb2w6IDIsIGNoYW1waW9uSWQ6ICdURlQxN19CcmlhcicsICAgICAgIHJvbGU6ICd0YW5rJyB9LFxuICAgICAgeyByb3c6IDMsIGNvbDogMywgY2hhbXBpb25JZDogJ1RGVDE3X0JlbHZldGgnLCAgICAgcm9sZTogJ3RhbmsnIH0sXG4gICAgICB7IHJvdzogMiwgY29sOiAyLCBjaGFtcGlvbklkOiAnVEZUMTdfQWthbGknLCAgICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICAgIHsgcm93OiAyLCBjb2w6IDQsIGNoYW1waW9uSWQ6ICdURlQxN19GaW9yYScsICAgICAgIHJvbGU6ICdjYXJyeScgfSxcbiAgICAgIHsgcm93OiAxLCBjb2w6IDQsIGNoYW1waW9uSWQ6ICdURlQxN19JbGxhb2knLCAgICAgIHJvbGU6ICdzdXBwb3J0JyB9LFxuICAgICAgeyByb3c6IDAsIGNvbDogMCwgY2hhbXBpb25JZDogJ1RGVDE3X0F1cm9yYScsICAgICAgcm9sZTogJ3N1cHBvcnQnIH0sXG4gICAgICB7IHJvdzogMCwgY29sOiA1LCBjaGFtcGlvbklkOiAnVEZUMTdfSmlueCcsICAgICAgICByb2xlOiAnc3VwcG9ydCcgfSxcbiAgICBdLFxuICAgIG5vdGVzOiAnRmlvcmEgbWlkLXJvdyBmb3IgRHVlbGlzdCByYW5nZSBzdGFja2luZy4gQW5pbWEgZnJvbnRsaW5lIHRhbmtzIGZvciBoZXIuIEF1cm9yYSBvcHBvc2l0ZSBjb3JuZXIgc2FmZXR5LidcbiAgfSxcbl07XG5cbi8vIEhlbHBlcjogZ2V0IHBvc2l0aW9uaW5nIGd1aWRlIGJ5IGNvbXAgSURcbmV4cG9ydCBjb25zdCBnZXRQb3NpdGlvbmluZ0d1aWRlID0gKGNvbXBJZDogc3RyaW5nKTogUG9zaXRpb25pbmdHdWlkZSB8IHVuZGVmaW5lZCA9PlxuICBwb3NpdGlvbmluZ0d1aWRlcy5maW5kKHAgPT4gcC5jb21wSWQgPT09IGNvbXBJZCk7XG4iLCIvLyBQaXZvdFRGVCDigJQgSW4tZ2FtZSBDb21wVmlld2VyUmVuZGVyZXJcclxuLy8gUmVhZHMgdGhlIHBpbm5lZCBjb21wIGZyb20gbG9jYWxTdG9yYWdlIGFuZCByZW5kZXJzIGl0IGFzIGEgcGFzc2l2ZSBvdmVybGF5LlxyXG4vLyBMaXN0ZW5zIGZvciBgc3RvcmFnZWAgZXZlbnRzIHNvIGNoYW5nZXMgZnJvbSB0aGUgZGVza3RvcCB3aW5kb3cgcHJvcGFnYXRlXHJcbi8vIGluc3RhbnRseS4gTmV2ZXIgcmVhZHMgZnJvbSBNYXRjaFRyYWNrZXIgb3IgZ2FtZSBldmVudHMuXHJcblxyXG5pbXBvcnQgeyBtZXRhQ29tcHMsIGdldENvbXBzQnlUaWVyIH0gZnJvbSBcIi4uL2RhdGEvc2V0MTcvY29tcHNcIjtcclxuaW1wb3J0IHsgY2hhbXBpb25NYXAgfSBmcm9tIFwiLi4vZGF0YS9zZXQxNy9jaGFtcGlvbnNcIjtcclxuaW1wb3J0IHsgaXRlbU1hcCB9IGZyb20gXCIuLi9kYXRhL3NldDE3L2l0ZW1zXCI7XHJcbmltcG9ydCB7IGdldFBvc2l0aW9uaW5nR3VpZGUgfSBmcm9tIFwiLi4vZGF0YS9zZXQxNy9wb3NpdGlvbmluZ1wiO1xyXG5pbXBvcnQgeyBnZXRDaGFtcGlvbkljb25VcmwsIGdldEl0ZW1JY29uVXJsIH0gZnJvbSBcIi4uL2RhdGEvYXNzZXRVcmxzXCI7XHJcblxyXG5jb25zdCBQSU5ORURfS0VZID0gJ3Bpdm90dGZ0X3Bpbm5lZF9jb21wX2lkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wVmlld2VyUmVuZGVyZXIge1xyXG5cclxuICBzdGF0aWMgaW5pdCgpIHtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIChlKSA9PiB7XHJcbiAgICAgIGlmIChlLmtleSA9PT0gUElOTkVEX0tFWSkgdGhpcy5yZW5kZXIoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IGNvbXBJZCA9ICgoKSA9PiB7XHJcbiAgICAgIHRyeSB7IHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShQSU5ORURfS0VZKTsgfSBjYXRjaCB7IHJldHVybiBudWxsOyB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGNvbnN0IGVtcHR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdlci1lbXB0eS1zdGF0ZScpO1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3ZXItY29udGVudCcpO1xyXG4gICAgY29uc3QgbmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdlci1jb21wLW5hbWUnKTtcclxuXHJcbiAgICBjb25zdCBjb21wID0gY29tcElkID8gbWV0YUNvbXBzLmZpbmQoYyA9PiBjLmlkID09PSBjb21wSWQpIDogbnVsbDtcclxuXHJcbiAgICBpZiAoIWNvbXApIHtcclxuICAgICAgaWYgKGVtcHR5KSBlbXB0eS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICBpZiAoY29udGVudCkgY29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICBpZiAobmFtZUVsKSBuYW1lRWwudGV4dENvbnRlbnQgPSAnTm8gY29tcCBwaW5uZWQnO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVtcHR5KSBlbXB0eS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgaWYgKGNvbnRlbnQpIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICBpZiAobmFtZUVsKSB7XHJcbiAgICAgIG5hbWVFbC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aWV3ZXItdGllci1iYWRnZSB0aWVyLSR7Y29tcC50aWVyLnRvTG93ZXJDYXNlKCl9XCI+JHtjb21wLnRpZXJ9PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidmlld2VyLWNvbXAtbmFtZS10ZXh0XCI+JHtjb21wLm5hbWV9PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidmlld2VyLWNvbXAtbWV0YVwiPiR7Y29tcC5wbGF5c3R5bGV9IMK3IEx2JHtjb21wLmxldmVsfTwvc3Bhbj5cclxuICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlclVuaXRzKGNvbXApO1xyXG4gICAgdGhpcy5yZW5kZXJJdGVtcyhjb21wKTtcclxuICAgIHRoaXMucmVuZGVyVHJhaXRzKGNvbXApO1xyXG4gICAgdGhpcy5yZW5kZXJCb2FyZChjb21wKTtcclxuICAgIHRoaXMucmVuZGVyVGlwcyhjb21wKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIHJlbmRlclVuaXRzKGNvbXA6IHR5cGVvZiBtZXRhQ29tcHNbbnVtYmVyXSkge1xyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyLXVuaXRzJyk7XHJcbiAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICBlbC5pbm5lckhUTUwgPSBjb21wLnVuaXRzLm1hcCh1ID0+IHtcclxuICAgICAgY29uc3QgY2hhbXAgPSBjaGFtcGlvbk1hcC5nZXQodS5jaGFtcGlvbklkKTtcclxuICAgICAgaWYgKCFjaGFtcCkgcmV0dXJuICcnO1xyXG4gICAgICBjb25zdCBpY29uID0gZ2V0Q2hhbXBpb25JY29uVXJsKHUuY2hhbXBpb25JZCk7XHJcbiAgICAgIGNvbnN0IHN0YXJzID0gJ+KYhScucmVwZWF0KHUuc3RhckxldmVsKTtcclxuICAgICAgY29uc3QgaW5pdGlhbHMgPSBjaGFtcC5uYW1lLnNwbGl0KCcgJykubWFwKHcgPT4gd1swXSkuam9pbignJykuc3Vic3RyaW5nKDAsIDIpO1xyXG4gICAgICBjb25zdCBjYXJyeUNsYXNzID0gdS5pc0NhcnJ5ID8gJ2lzLWNhcnJ5JyA6ICcnO1xyXG4gICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3ZXItdW5pdCBjb3N0LSR7Y2hhbXAuY29zdH0gJHtjYXJyeUNsYXNzfVwiIHRpdGxlPVwiJHtjaGFtcC5uYW1lfSAke3N0YXJzfSAoJHtjaGFtcC5jb3N0fWcpJHt1LmlzQ2FycnkgPyAnIOKAlCBjYXJyeScgOiAnJ31cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3ZXItdW5pdC1zdGFyc1wiPiR7c3RhcnN9PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld2VyLXVuaXQtcG9ydHJhaXRcIj5cclxuICAgICAgICAgICAgJHtpY29uXHJcbiAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2ljb259XCIgYWx0PVwiJHtjaGFtcC5uYW1lfVwiIGxvYWRpbmc9XCJsYXp5XCIgb25lcnJvcj1cInRoaXMuc3R5bGUuZGlzcGxheT0nbm9uZSc7dGhpcy5uZXh0RWxlbWVudFNpYmxpbmcuc3R5bGUuZGlzcGxheT0nZmxleCdcIj5gXHJcbiAgICAgICAgICAgICAgOiAnJ31cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVuaXQtaW5pdGlhbHNcIiAke2ljb24gPyAnc3R5bGU9XCJkaXNwbGF5Om5vbmVcIicgOiAnJ30+JHtpbml0aWFsc308L2Rpdj5cclxuICAgICAgICAgICAgJHt1LmlzQ2FycnkgPyAnPHNwYW4gY2xhc3M9XCJ2aWV3ZXItdW5pdC1jYXJyeS1jcm93blwiPvCfkZE8L3NwYW4+JyA6ICcnfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld2VyLXVuaXQtbmFtZVwiPiR7Y2hhbXAubmFtZX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYDtcclxuICAgIH0pLmpvaW4oJycpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVuZGVySXRlbXMoY29tcDogdHlwZW9mIG1ldGFDb21wc1tudW1iZXJdKSB7XHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3ZXItaXRlbXMnKTtcclxuICAgIGlmICghZWwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBjYXJyaWVzID0gY29tcC51bml0cy5maWx0ZXIodSA9PiB1LmlzQ2FycnkgJiYgdS5pdGVtcyAmJiB1Lml0ZW1zLmxlbmd0aCk7XHJcbiAgICBpZiAoY2Fycmllcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgZWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJ2aWV3ZXItZW1wdHktbGluZVwiPk5vIHNwZWNpZmljIGNhcnJ5IGl0ZW1zIGRlZmluZWQgZm9yIHRoaXMgY29tcC48L2Rpdj4nO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZWwuaW5uZXJIVE1MID0gY2Fycmllcy5tYXAodSA9PiB7XHJcbiAgICAgIGNvbnN0IGNoYW1wID0gY2hhbXBpb25NYXAuZ2V0KHUuY2hhbXBpb25JZCk7XHJcbiAgICAgIGNvbnN0IGNoYW1wTmFtZSA9IGNoYW1wID8gY2hhbXAubmFtZSA6IHUuY2hhbXBpb25JZDtcclxuICAgICAgY29uc3QgY2hhbXBJY29uID0gY2hhbXAgPyBnZXRDaGFtcGlvbkljb25VcmwodS5jaGFtcGlvbklkKSA6ICcnO1xyXG4gICAgICBjb25zdCBpdGVtc0h0bWwgPSAodS5pdGVtcyB8fCBbXSkubWFwKGl0ZW1JZCA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1NYXAuZ2V0KGl0ZW1JZCk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGl0ZW0gPyBpdGVtLm5hbWUgOiBpdGVtSWQucmVwbGFjZSgvLS9nLCAnICcpLnJlcGxhY2UoL1xcYlxcdy9nLCBsID0+IGwudG9VcHBlckNhc2UoKSk7XHJcbiAgICAgICAgY29uc3Qgc3RhdHMgPSBpdGVtID8gaXRlbS5zdGF0cyA6ICcnO1xyXG4gICAgICAgIGNvbnN0IGljb24gPSBnZXRJdGVtSWNvblVybChpdGVtSWQpO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInZpZXdlci1pdGVtLXBpbGxcIiB0aXRsZT1cIiR7bmFtZX1cXG4ke3N0YXRzfVwiPlxyXG4gICAgICAgICAgICAke2ljb24gPyBgPGltZyBzcmM9XCIke2ljb259XCIgYWx0PVwiJHtuYW1lfVwiIGxvYWRpbmc9XCJsYXp5XCI+YCA6ICcnfVxyXG4gICAgICAgICAgICA8c3Bhbj4ke25hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIGA7XHJcbiAgICAgIH0pLmpvaW4oJycpO1xyXG4gICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3ZXItY2Fycnktcm93XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld2VyLWNhcnJ5LW5hbWVcIj5cclxuICAgICAgICAgICAgJHtjaGFtcEljb24gPyBgPGltZyBzcmM9XCIke2NoYW1wSWNvbn1cIiBjbGFzcz1cInZpZXdlci1jYXJyeS1pY29uXCIgYWx0PVwiXCI+YCA6ICcnfVxyXG4gICAgICAgICAgICA8c3Bhbj4ke2NoYW1wTmFtZX08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3ZXItY2FycnktaXRlbXNcIj4ke2l0ZW1zSHRtbH08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYDtcclxuICAgIH0pLmpvaW4oJycpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVuZGVyVHJhaXRzKGNvbXA6IHR5cGVvZiBtZXRhQ29tcHNbbnVtYmVyXSkge1xyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyLXRyYWl0cycpO1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgZWwuaW5uZXJIVE1MID0gY29tcC5jb3JlVHJhaXRzLm1hcCh0ID0+IGA8c3BhbiBjbGFzcz1cInRyYWl0LWJhZGdlXCI+JHt0fTwvc3Bhbj5gKS5qb2luKCcnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIHJlbmRlckJvYXJkKGNvbXA6IHR5cGVvZiBtZXRhQ29tcHNbbnVtYmVyXSkge1xyXG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyLWJvYXJkJyk7XHJcbiAgICBjb25zdCBub3RlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3ZXItYm9hcmQtbm90ZXMnKTtcclxuICAgIGlmICghYm9hcmQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBndWlkZSA9IGdldFBvc2l0aW9uaW5nR3VpZGUoY29tcC5pZCk7XHJcbiAgICBjb25zdCBwbGFjZW1lbnRzID0gbmV3IE1hcDxzdHJpbmcsIFJldHVyblR5cGU8dHlwZW9mIGdldFBvc2l0aW9uaW5nR3VpZGU+PigpO1xyXG4gICAgaWYgKGd1aWRlKSB7XHJcbiAgICAgIGZvciAoY29uc3QgcCBvZiBndWlkZS5wbGFjZW1lbnRzKSB7XHJcbiAgICAgICAgcGxhY2VtZW50cy5zZXQoYCR7cC5yb3d9LSR7cC5jb2x9YCwgeyBjb21wSWQ6IGNvbXAuaWQsIHBsYWNlbWVudHM6IFtwXSwgbm90ZXM6ICcnIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGh0bWwgPSAnJztcclxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDQ7IHJvdysrKSB7XHJcbiAgICAgIGNvbnN0IGlzT2RkUm93ID0gcm93ICUgMiA9PT0gMTtcclxuICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cImhleC1yb3cgJHtpc09kZFJvdyA/ICdoZXgtcm93LW9mZnNldCcgOiAnJ31cIj5gO1xyXG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCA3OyBjb2wrKykge1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZXIgPSBwbGFjZW1lbnRzLmdldChgJHtyb3d9LSR7Y29sfWApO1xyXG4gICAgICAgIGNvbnN0IHBsYWNlbWVudCA9IHdyYXBwZXIgJiYgd3JhcHBlci5wbGFjZW1lbnRzWzBdO1xyXG4gICAgICAgIGlmIChwbGFjZW1lbnQpIHtcclxuICAgICAgICAgIGNvbnN0IGNoYW1wID0gY2hhbXBpb25NYXAuZ2V0KHBsYWNlbWVudC5jaGFtcGlvbklkKTtcclxuICAgICAgICAgIGNvbnN0IGNoYW1wTmFtZSA9IGNoYW1wID8gY2hhbXAubmFtZSA6ICc/JztcclxuICAgICAgICAgIGNvbnN0IGluaXRpYWxzID0gY2hhbXBOYW1lLnNwbGl0KCcgJykubWFwKHcgPT4gd1swXSkuam9pbignJykuc3Vic3RyaW5nKDAsIDIpO1xyXG4gICAgICAgICAgY29uc3QgY29zdENsYXNzID0gY2hhbXAgPyBgY29zdC0ke2NoYW1wLmNvc3R9YCA6ICcnO1xyXG4gICAgICAgICAgY29uc3QgaWNvbiA9IGdldENoYW1waW9uSWNvblVybChwbGFjZW1lbnQuY2hhbXBpb25JZCk7XHJcbiAgICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiaGV4LWNlbGwgaGV4LW9jY3VwaWVkIGhleC0ke3BsYWNlbWVudC5yb2xlfSAke2Nvc3RDbGFzc31cIiBkYXRhLXJvdz1cIiR7cm93fVwiIGRhdGEtY29sPVwiJHtjb2x9XCIgdGl0bGU9XCIke2NoYW1wTmFtZX0gKCR7cGxhY2VtZW50LnJvbGV9KVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGV4LWlubmVyXCI+XHJcbiAgICAgICAgICAgICAgJHtpY29uID8gYDxpbWcgc3JjPVwiJHtpY29ufVwiIGNsYXNzPVwiaGV4LWNoYW1wLWltZ1wiIGFsdD1cIiR7Y2hhbXBOYW1lfVwiIGxvYWRpbmc9XCJsYXp5XCI+YCA6IGA8c3BhbiBjbGFzcz1cImhleC11bml0LW5hbWVcIj4ke2luaXRpYWxzfTwvc3Bhbj5gfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZXgtY2hhbXAtbGFiZWxcIj4ke2NoYW1wTmFtZS5sZW5ndGggPiA2ID8gaW5pdGlhbHMgOiBjaGFtcE5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cImhleC1jZWxsXCIgZGF0YS1yb3c9XCIke3Jvd31cIiBkYXRhLWNvbD1cIiR7Y29sfVwiPjxkaXYgY2xhc3M9XCJoZXgtaW5uZXJcIj48L2Rpdj48L2Rpdj5gO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBodG1sICs9ICc8L2Rpdj4nO1xyXG4gICAgfVxyXG4gICAgYm9hcmQuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcbiAgICBpZiAobm90ZXMpIHtcclxuICAgICAgbm90ZXMuaW5uZXJIVE1MID0gZ3VpZGVcclxuICAgICAgICA/IGA8cCBjbGFzcz1cImJvYXJkLW5vdGVzLXRleHRcIj4ke2d1aWRlLm5vdGVzfTwvcD5gXHJcbiAgICAgICAgOiAnPHAgY2xhc3M9XCJib2FyZC1ub3Rlcy10ZXh0XCI+Tm8gcG9zaXRpb25pbmcgZ3VpZGUgZm9yIHRoaXMgY29tcCB5ZXQuPC9wPic7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyByZW5kZXJUaXBzKGNvbXA6IHR5cGVvZiBtZXRhQ29tcHNbbnVtYmVyXSkge1xyXG4gICAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3ZXItdGlwcy1zZWN0aW9uJyk7XHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3ZXItdGlwcycpO1xyXG4gICAgaWYgKCFlbCB8fCAhc2VjdGlvbikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgaWYgKGNvbXAuZGVzY3JpcHRpb24pIHBhcnRzLnB1c2goYDxwPiR7Y29tcC5kZXNjcmlwdGlvbn08L3A+YCk7XHJcbiAgICBpZiAoY29tcC5lYXJseUdhbWUpIHBhcnRzLnB1c2goYDxwPjxzdHJvbmc+RWFybHk6PC9zdHJvbmc+ICR7Y29tcC5lYXJseUdhbWV9PC9wPmApO1xyXG4gICAgaWYgKGNvbXAubWlkR2FtZSkgcGFydHMucHVzaChgPHA+PHN0cm9uZz5NaWQ6PC9zdHJvbmc+ICR7Y29tcC5taWRHYW1lfTwvcD5gKTtcclxuICAgIGlmIChjb21wLmxhdGVHYW1lKSBwYXJ0cy5wdXNoKGA8cD48c3Ryb25nPkxhdGU6PC9zdHJvbmc+ICR7Y29tcC5sYXRlR2FtZX08L3A+YCk7XHJcbiAgICBpZiAoY29tcC50aXBzKSBwYXJ0cy5wdXNoKGA8cD48c3Ryb25nPlRpcDo8L3N0cm9uZz4gJHtjb21wLnRpcHN9PC9wPmApO1xyXG5cclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgc2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgZWwuaW5uZXJIVE1MID0gcGFydHMuam9pbignJyk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBDcm9zcy13aW5kb3cgcGluIGhlbHBlciAoY2FsbGVkIGZyb20gZGVza3RvcClcclxuZXhwb3J0IGZ1bmN0aW9uIHBpbkNvbXBJZChjb21wSWQ6IHN0cmluZykge1xyXG4gIHRyeSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShQSU5ORURfS0VZLCBjb21wSWQpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGNvbnNvbGUud2FybignW1Bpdm90VEZUXSBmYWlsZWQgdG8gd3JpdGUgcGlubmVkIGNvbXAnLCBlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQaW5uZWRDb21wSWQoKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgdHJ5IHsgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFBJTk5FRF9LRVkpOyB9IGNhdGNoIHsgcmV0dXJuIG51bGw7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRQaW5JZk5vbmUoKSB7XHJcbiAgaWYgKGdldFBpbm5lZENvbXBJZCgpKSByZXR1cm47XHJcbiAgY29uc3QgdG9wID0gZ2V0Q29tcHNCeVRpZXIoJ1MnKVswXSB8fCBtZXRhQ29tcHNbMF07XHJcbiAgaWYgKHRvcCkgcGluQ29tcElkKHRvcC5pZCk7XHJcbn1cclxuIiwiLy8gUGl2b3RURlQg4oCUIE1hdGNoVHJhY2tlclxyXG4vLyBQYXJzZXMgT3ZlcndvbGYgVEZUIGdhbWUgZXZlbnRzIGludG8gYSBub3JtYWxpemVkIG1hdGNoIHN0YXRlLlxyXG4vLyBJTVBPUlRBTlQ6IG9ubHkgZXhwb3NlcyBwbGF5ZXIncyBvd24gdmFsdWVzIChsZXZlbCwgZ29sZCwgSFAsIHN0YWdlLCBhdWdtZW50cykuXHJcbi8vIERvZXMgTk9UIGV4cG9zZSBvcHBvbmVudHMnIGJvYXJkcy9pdGVtcy9ldGMgdG8gYXZvaWQgUmlvdCdzIFwiY29hY2hpbmdcIiBydWxlIGNvbmNlcm5zLlxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXRjaFN0YXRlIHtcclxuICBpbk1hdGNoOiBib29sZWFuO1xyXG4gIHN0YWdlOiBzdHJpbmc7ICAgICAgICAgICAvLyBlLmcuIFwiMy0yXCJcclxuICByb3VuZFR5cGU6IHN0cmluZzsgICAgICAgLy8gUFZQLCBQVkUsIENhcm91c2VsLCBBdWdtZW50XHJcbiAgbGV2ZWw6IG51bWJlcjtcclxuICBnb2xkOiBudW1iZXI7XHJcbiAgaGVhbHRoOiBudW1iZXI7XHJcbiAgc3RyZWFrOiBudW1iZXI7ICAgICAgICAgIC8vIHdpbi9sb3NzIHN0cmVhayAoc2lnbmVkKVxyXG4gIGF1Z21lbnRzOiBzdHJpbmdbXTtcclxuICB1bml0czogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IHRpZXI6IG51bWJlcjsgaXRlbXM/OiBzdHJpbmdbXSB9PjtcclxuICBsYXN0UGxhY2VtZW50OiBudW1iZXIgfCBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBNYXRjaFN0YXRlTGlzdGVuZXIgPSAoc3RhdGU6IE1hdGNoU3RhdGUpID0+IHZvaWQ7XHJcblxyXG5jb25zdCBFTVBUWV9TVEFURTogTWF0Y2hTdGF0ZSA9IHtcclxuICBpbk1hdGNoOiBmYWxzZSxcclxuICBzdGFnZTogJy0nLFxyXG4gIHJvdW5kVHlwZTogJycsXHJcbiAgbGV2ZWw6IDAsXHJcbiAgZ29sZDogMCxcclxuICBoZWFsdGg6IDEwMCxcclxuICBzdHJlYWs6IDAsXHJcbiAgYXVnbWVudHM6IFtdLFxyXG4gIHVuaXRzOiBbXSxcclxuICBsYXN0UGxhY2VtZW50OiBudWxsLFxyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdGFnZVNuYXBzaG90IHtcclxuICB0czogbnVtYmVyOyAgICAgICAgICAgIC8vIGNhcHR1cmUgdGltZXN0YW1wXHJcbiAgc3RhZ2U6IHN0cmluZztcclxuICBsZXZlbDogbnVtYmVyO1xyXG4gIGdvbGQ6IG51bWJlcjtcclxuICBoZWFsdGg6IG51bWJlcjtcclxuICBzdHJlYWs6IG51bWJlcjtcclxuICB1bml0czogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IHRpZXI6IG51bWJlcjsgaXRlbXM/OiBzdHJpbmdbXSB9PjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hdGNoVHJhY2tlciB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBNYXRjaFRyYWNrZXI7XHJcbiAgcHJpdmF0ZSBfc3RhdGU6IE1hdGNoU3RhdGUgPSB7IC4uLkVNUFRZX1NUQVRFIH07XHJcbiAgcHJpdmF0ZSBfbGlzdGVuZXJzOiBNYXRjaFN0YXRlTGlzdGVuZXJbXSA9IFtdO1xyXG4gIHByaXZhdGUgX3NuYXBzaG90czogU3RhZ2VTbmFwc2hvdFtdID0gW107XHJcbiAgcHJpdmF0ZSBfbGFzdFNuYXBzaG90U3RhZ2U6IHN0cmluZyA9ICcnO1xyXG5cclxuICBzdGF0aWMgaW5zdGFuY2UoKTogTWF0Y2hUcmFja2VyIHtcclxuICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHRoaXMuX2luc3RhbmNlID0gbmV3IE1hdGNoVHJhY2tlcigpO1xyXG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoKTogTWF0Y2hTdGF0ZSB7XHJcbiAgICByZXR1cm4geyAuLi50aGlzLl9zdGF0ZSB9O1xyXG4gIH1cclxuXHJcbiAgb25TdGF0ZUNoYW5nZShjYjogTWF0Y2hTdGF0ZUxpc3RlbmVyKTogKCkgPT4gdm9pZCB7XHJcbiAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChjYik7XHJcbiAgICBjYih0aGlzLmdldFN0YXRlKCkpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGNiKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtaXQoKSB7XHJcbiAgICBjb25zdCBzbmFwc2hvdCA9IHRoaXMuZ2V0U3RhdGUoKTtcclxuICAgIGZvciAoY29uc3QgY2Igb2YgdGhpcy5fbGlzdGVuZXJzKSB7XHJcbiAgICAgIHRyeSB7IGNiKHNuYXBzaG90KTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLndhcm4oJ1tNYXRjaFRyYWNrZXJdIGxpc3RlbmVyIGVycm9yJywgZSk7IH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vID09PT09IEluZ2VzdCBPdmVyd29sZiBpbmZvX3VwZGF0ZXMgPT09PT1cclxuICAvLyBTaGFwZTogeyBmZWF0dXJlOiAnbWF0Y2hfaW5mbycgfCAnZ2FtZV9pbmZvJyB8IC4uLiwgaW5mbzogey4uLn0gfVxyXG4gIGhhbmRsZUluZm9VcGRhdGUodXBkYXRlOiBhbnkpIHtcclxuICAgIGlmICghdXBkYXRlIHx8ICF1cGRhdGUuaW5mbykgcmV0dXJuO1xyXG4gICAgY29uc3QgaW5mbyA9IHVwZGF0ZS5pbmZvO1xyXG4gICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBnYW1lX2luZm86IGxldmVsLCBnb2xkLCBoZWFsdGhcclxuICAgIGlmIChpbmZvLmdhbWVfaW5mbykge1xyXG4gICAgICBjb25zdCBnaSA9IGluZm8uZ2FtZV9pbmZvO1xyXG4gICAgICBpZiAoZ2kubGV2ZWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IG4gPSBOdW1iZXIoZ2kubGV2ZWwpO1xyXG4gICAgICAgIGlmICghTnVtYmVyLmlzTmFOKG4pICYmIG4gIT09IHRoaXMuX3N0YXRlLmxldmVsKSB7IHRoaXMuX3N0YXRlLmxldmVsID0gbjsgY2hhbmdlZCA9IHRydWU7IH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoZ2kuZ29sZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgbiA9IE51bWJlcihnaS5nb2xkKTtcclxuICAgICAgICBpZiAoIU51bWJlci5pc05hTihuKSAmJiBuICE9PSB0aGlzLl9zdGF0ZS5nb2xkKSB7IHRoaXMuX3N0YXRlLmdvbGQgPSBuOyBjaGFuZ2VkID0gdHJ1ZTsgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChnaS5oZWFsdGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IG4gPSBOdW1iZXIoZ2kuaGVhbHRoKTtcclxuICAgICAgICBpZiAoIU51bWJlci5pc05hTihuKSAmJiBuICE9PSB0aGlzLl9zdGF0ZS5oZWFsdGgpIHsgdGhpcy5fc3RhdGUuaGVhbHRoID0gbjsgY2hhbmdlZCA9IHRydWU7IH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoZ2kud2luX3N0cmVhayAhPT0gdW5kZWZpbmVkIHx8IGdpLmxvc3Nfc3RyZWFrICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCB3ID0gTnVtYmVyKGdpLndpbl9zdHJlYWsgfHwgMCk7XHJcbiAgICAgICAgY29uc3QgbCA9IE51bWJlcihnaS5sb3NzX3N0cmVhayB8fCAwKTtcclxuICAgICAgICBjb25zdCBzdHJlYWsgPSB3ID4gMCA/IHcgOiAtbDtcclxuICAgICAgICBpZiAoc3RyZWFrICE9PSB0aGlzLl9zdGF0ZS5zdHJlYWspIHsgdGhpcy5fc3RhdGUuc3RyZWFrID0gc3RyZWFrOyBjaGFuZ2VkID0gdHJ1ZTsgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWF0Y2hfaW5mbzogc3RhZ2UgLyByb3VuZF90eXBlIC8gYXVnbWVudHMgLyBwbGFjZW1lbnRcclxuICAgIGlmIChpbmZvLm1hdGNoX2luZm8pIHtcclxuICAgICAgY29uc3QgbWkgPSBpbmZvLm1hdGNoX2luZm87XHJcbiAgICAgIGlmIChtaS5zdGFnZSAmJiBTdHJpbmcobWkuc3RhZ2UpICE9PSB0aGlzLl9zdGF0ZS5zdGFnZSkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlLnN0YWdlID0gU3RyaW5nKG1pLnN0YWdlKTtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobWkucm91bmRfdHlwZSAmJiBTdHJpbmcobWkucm91bmRfdHlwZSkgIT09IHRoaXMuX3N0YXRlLnJvdW5kVHlwZSkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlLnJvdW5kVHlwZSA9IFN0cmluZyhtaS5yb3VuZF90eXBlKTtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobWkucGxhY2VtZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBwID0gTnVtYmVyKG1pLnBsYWNlbWVudCk7XHJcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocCkgJiYgcCA+IDApIHtcclxuICAgICAgICAgIHRoaXMuX3N0YXRlLmxhc3RQbGFjZW1lbnQgPSBwO1xyXG4gICAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXVnbWVudHM6IGFycmF5IG9mIHN0cmluZ3MgKG9yIHBhcnNlIEpTT04tc3RyaW5nIHZhcmlhbnRzKVxyXG4gICAgaWYgKGluZm8uYXVnbWVudHMpIHtcclxuICAgICAgY29uc3QgYXVnbWVudHMgPSB0aGlzLnBhcnNlQXVnbWVudHMoaW5mby5hdWdtZW50cyk7XHJcbiAgICAgIGlmIChhdWdtZW50cyAmJiBKU09OLnN0cmluZ2lmeShhdWdtZW50cykgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuX3N0YXRlLmF1Z21lbnRzKSkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlLmF1Z21lbnRzID0gYXVnbWVudHM7XHJcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBib2FyZDogcGxheWVyJ3Mgb3duIHVuaXRzIChzYWZlIHRvIHNob3cg4oCUIGl0J3MgeW91ciBvd24gYm9hcmQpXHJcbiAgICBpZiAoaW5mby5ib2FyZCkge1xyXG4gICAgICBjb25zdCB1bml0cyA9IHRoaXMucGFyc2VVbml0cyhpbmZvLmJvYXJkKTtcclxuICAgICAgaWYgKHVuaXRzICYmIEpTT04uc3RyaW5naWZ5KHVuaXRzKSAhPT0gSlNPTi5zdHJpbmdpZnkodGhpcy5fc3RhdGUudW5pdHMpKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUudW5pdHMgPSB1bml0cztcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5fc3RhdGUuaW5NYXRjaCAmJiAodGhpcy5fc3RhdGUubGV2ZWwgPiAwIHx8IHRoaXMuX3N0YXRlLnN0YWdlICE9PSAnLScpKSB7XHJcbiAgICAgIHRoaXMuX3N0YXRlLmluTWF0Y2ggPSB0cnVlO1xyXG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICAvLyBDYXB0dXJlIGEgcGVyLXN0YWdlIHNuYXBzaG90IHdoZW4gdGhlIHN0YWdlIGZsaXBzLiBVc2VkIGJ5IE1hdGNoXHJcbiAgICAgIC8vIEhpc3RvcnkgcG9zdC1tYXRjaC4gTmV2ZXIgcmVhZCBieSBhbnkgaW4tbWF0Y2ggVUkuXHJcbiAgICAgIGlmICh0aGlzLl9zdGF0ZS5zdGFnZSAhPT0gdGhpcy5fbGFzdFNuYXBzaG90U3RhZ2UgJiYgdGhpcy5fc3RhdGUuc3RhZ2UgIT09ICctJykge1xyXG4gICAgICAgIHRoaXMuX3NuYXBzaG90cy5wdXNoKHtcclxuICAgICAgICAgIHRzOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgc3RhZ2U6IHRoaXMuX3N0YXRlLnN0YWdlLFxyXG4gICAgICAgICAgbGV2ZWw6IHRoaXMuX3N0YXRlLmxldmVsLFxyXG4gICAgICAgICAgZ29sZDogdGhpcy5fc3RhdGUuZ29sZCxcclxuICAgICAgICAgIGhlYWx0aDogdGhpcy5fc3RhdGUuaGVhbHRoLFxyXG4gICAgICAgICAgc3RyZWFrOiB0aGlzLl9zdGF0ZS5zdHJlYWssXHJcbiAgICAgICAgICB1bml0czogdGhpcy5fc3RhdGUudW5pdHMubWFwKHUgPT4gKHsgLi4udSB9KSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fbGFzdFNuYXBzaG90U3RhZ2UgPSB0aGlzLl9zdGF0ZS5zdGFnZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmVtaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vID09PT09IEluZ2VzdCBPdmVyd29sZiBuZXdfZXZlbnRzID09PT09XHJcbiAgaGFuZGxlTmV3RXZlbnRzKGU6IGFueSkge1xyXG4gICAgaWYgKCFlIHx8ICFBcnJheS5pc0FycmF5KGUuZXZlbnRzKSkgcmV0dXJuO1xyXG4gICAgZm9yIChjb25zdCBldmVudCBvZiBlLmV2ZW50cykge1xyXG4gICAgICBzd2l0Y2ggKGV2ZW50Lm5hbWUpIHtcclxuICAgICAgICBjYXNlICdtYXRjaF9zdGFydCc6XHJcbiAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICB0aGlzLl9zdGF0ZS5pbk1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuZW1pdCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbWF0Y2hfZW5kJzpcclxuICAgICAgICAgIHRoaXMuX3N0YXRlLmluTWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMucGVyc2lzdE1hdGNoKCk7XHJcbiAgICAgICAgICB0aGlzLmVtaXQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ21hdGNoX2luZm9fcGxhY2VtZW50JzpcclxuICAgICAgICAgIGlmIChldmVudC5kYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBOdW1iZXIoZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghTnVtYmVyLmlzTmFOKHApKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fc3RhdGUubGFzdFBsYWNlbWVudCA9IHA7XHJcbiAgICAgICAgICAgICAgdGhpcy5lbWl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyA9PT09PSBQZXJzaXN0ZW5jZSA9PT09PVxyXG4gIC8vIFBlcnNpc3QgYSBmdWxsIHBlci1tYXRjaCByZWNvcmQgKGluY2x1ZGluZyB0aGUgcGVyLXN0YWdlIHRpbWVsaW5lKSB0b1xyXG4gIC8vIGxvY2FsU3RvcmFnZSBvbiBtYXRjaF9lbmQuIFRoZSBkZXNrdG9wIE1hdGNoIEhpc3RvcnkgdmlldyBjb25zdW1lcyBpdCBmb3JcclxuICAvLyB0aGUgVGltZWxpbmUgLyBSb3VuZC1EZXRhaWwgYnJlYWtkb3ducy4gQ2FwcGVkIGF0IDUwIG1hdGNoZXMuXHJcbiAgcHJpdmF0ZSBwZXJzaXN0TWF0Y2goKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByYXcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGl2b3R0ZnRfbWF0Y2hfaGlzdG9yeScpO1xyXG4gICAgICBjb25zdCBoaXN0b3J5ID0gcmF3ID8gSlNPTi5wYXJzZShyYXcpIDogW107XHJcbiAgICAgIGhpc3RvcnkudW5zaGlmdCh7XHJcbiAgICAgICAgZW5kZWRBdDogRGF0ZS5ub3coKSxcclxuICAgICAgICBwbGFjZW1lbnQ6IHRoaXMuX3N0YXRlLmxhc3RQbGFjZW1lbnQsXHJcbiAgICAgICAgbGV2ZWw6IHRoaXMuX3N0YXRlLmxldmVsLFxyXG4gICAgICAgIHN0YWdlOiB0aGlzLl9zdGF0ZS5zdGFnZSxcclxuICAgICAgICBhdWdtZW50czogWy4uLnRoaXMuX3N0YXRlLmF1Z21lbnRzXSxcclxuICAgICAgICBzbmFwc2hvdHM6IFsuLi50aGlzLl9zbmFwc2hvdHNdLFxyXG4gICAgICB9KTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Bpdm90dGZ0X21hdGNoX2hpc3RvcnknLCBKU09OLnN0cmluZ2lmeShoaXN0b3J5LnNsaWNlKDAsIDUwKSkpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ1tNYXRjaFRyYWNrZXJdIHBlcnNpc3QgZmFpbGVkJywgZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2V0KCkge1xyXG4gICAgdGhpcy5fc3RhdGUgPSB7IC4uLkVNUFRZX1NUQVRFLCBpbk1hdGNoOiB0cnVlIH07XHJcbiAgICB0aGlzLl9zbmFwc2hvdHMgPSBbXTtcclxuICAgIHRoaXMuX2xhc3RTbmFwc2hvdFN0YWdlID0gJyc7XHJcbiAgfVxyXG5cclxuICAvLyA9PT09PSBQYXJzaW5nIGhlbHBlcnMgPT09PT1cclxuICBwcml2YXRlIHBhcnNlQXVnbWVudHMocmF3OiBhbnkpOiBzdHJpbmdbXSB8IG51bGwge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcGFyc2VkID0gdHlwZW9mIHJhdyA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKHJhdykgOiByYXc7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcnNlZCkpIHJldHVybiBwYXJzZWQubWFwKGEgPT4gU3RyaW5nKGEpKTtcclxuICAgICAgaWYgKHBhcnNlZCAmJiBBcnJheS5pc0FycmF5KHBhcnNlZC5hdWdtZW50cykpIHJldHVybiBwYXJzZWQuYXVnbWVudHMubWFwKChhOiBhbnkpID0+IFN0cmluZyhhKSk7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZVVuaXRzKHJhdzogYW55KTogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IHRpZXI6IG51bWJlcjsgaXRlbXM/OiBzdHJpbmdbXSB9PiB8IG51bGwge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcGFyc2VkID0gdHlwZW9mIHJhdyA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKHJhdykgOiByYXc7XHJcbiAgICAgIGlmICghcGFyc2VkKSByZXR1cm4gbnVsbDtcclxuICAgICAgY29uc3QgbGlzdCA9IEFycmF5LmlzQXJyYXkocGFyc2VkKSA/IHBhcnNlZCA6IChBcnJheS5pc0FycmF5KHBhcnNlZC51bml0cykgPyBwYXJzZWQudW5pdHMgOiBudWxsKTtcclxuICAgICAgaWYgKCFsaXN0KSByZXR1cm4gbnVsbDtcclxuICAgICAgcmV0dXJuIGxpc3QubWFwKCh1OiBhbnkpID0+ICh7XHJcbiAgICAgICAgbmFtZTogU3RyaW5nKHUubmFtZSB8fCB1LmNoYXJhY3Rlcl9pZCB8fCB1LmlkIHx8ICc/JyksXHJcbiAgICAgICAgdGllcjogTnVtYmVyKHUudGllciB8fCB1LnN0YXIgfHwgMSksXHJcbiAgICAgICAgaXRlbXM6IEFycmF5LmlzQXJyYXkodS5pdGVtcykgPyB1Lml0ZW1zLm1hcChTdHJpbmcpIDogdW5kZWZpbmVkLFxyXG4gICAgICB9KSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQge1xyXG4gIE9XR2FtZXMsXHJcbiAgT1dHYW1lc0V2ZW50cyxcclxuICBPV0hvdGtleXNcclxufSBmcm9tIFwiQG92ZXJ3b2xmL292ZXJ3b2xmLWFwaS10c1wiO1xyXG5cclxuaW1wb3J0IHsgQXBwV2luZG93IH0gZnJvbSBcIi4uL0FwcFdpbmRvd1wiO1xyXG5pbXBvcnQgeyBrSG90a2V5cywga1dpbmRvd05hbWVzLCBrR2FtZXNGZWF0dXJlcyB9IGZyb20gXCIuLi9jb25zdHNcIjtcclxuaW1wb3J0IHsgTWF0Y2hUcmFja2VyIH0gZnJvbSBcIi4uL3NlcnZpY2VzL01hdGNoVHJhY2tlclwiO1xyXG5pbXBvcnQgeyBDb21wVmlld2VyUmVuZGVyZXIgfSBmcm9tIFwiLi4vc2VydmljZXMvQ29tcFZpZXdlclJlbmRlcmVyXCI7XHJcblxyXG5pbXBvcnQgV2luZG93U3RhdGUgPSBvdmVyd29sZi53aW5kb3dzLldpbmRvd1N0YXRlRXg7XHJcblxyXG4vLyBQaXZvdFRGVCBpbi1nYW1lIG92ZXJsYXkg4oCUIHBhc3NpdmUgY29tcCB2aWV3ZXIuXHJcbi8vXHJcbi8vIENvbXBsaWFuY2Ugbm90ZTogdGhpcyB3aW5kb3cgTkVWRVIgZGlzcGxheXMgbGl2ZSBnYW1lIHN0YXRlIHRvIHRoZSB1c2VyLlxyXG4vLyBNYXRjaFRyYWNrZXIgaXMgc3RhcnRlZCBzbyBwZXItc3RhZ2Ugc25hcHNob3RzIGFyZSBjYXB0dXJlZCB0byBsb2NhbFN0b3JhZ2VcclxuLy8gZm9yIHRoZSBNYXRjaCBIaXN0b3J5IHZpZXcgaW4gdGhlIGRlc2t0b3AgYXBwLCBidXQgbm8gY2FwdHVyZWQgdmFsdWUgZHJpdmVzXHJcbi8vIGFueSBlbGVtZW50IG9mIHRoaXMgd2luZG93J3MgVUkuXHJcbmNsYXNzIEluR2FtZSBleHRlbmRzIEFwcFdpbmRvdyB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBJbkdhbWU7XHJcbiAgcHJpdmF0ZSBfZ2FtZUV2ZW50c0xpc3RlbmVyOiBPV0dhbWVzRXZlbnRzO1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoa1dpbmRvd05hbWVzLmluR2FtZSk7XHJcbiAgICB0aGlzLnNldFRvZ2dsZUhvdGtleUJlaGF2aW9yKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBJbkdhbWUoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBydW4oKSB7XHJcbiAgICBjb25zdCBnYW1lQ2xhc3NJZCA9IGF3YWl0IHRoaXMuZ2V0Q3VycmVudEdhbWVDbGFzc0lkKCk7XHJcbiAgICBjb25zdCBnYW1lRmVhdHVyZXMgPSBrR2FtZXNGZWF0dXJlcy5nZXQoZ2FtZUNsYXNzSWQpO1xyXG5cclxuICAgIC8vIENhcHR1cmUtb25seTogTWF0Y2hUcmFja2VyIHdyaXRlcyBzbmFwc2hvdHM7IG5vdGhpbmcgaW4gdGhpcyB3aW5kb3cgcmVhZHNcclxuICAgIC8vIHRoZW0gZm9yIGxpdmUgZGlzcGxheS5cclxuICAgIGlmIChnYW1lRmVhdHVyZXMgJiYgZ2FtZUZlYXR1cmVzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLl9nYW1lRXZlbnRzTGlzdGVuZXIgPSBuZXcgT1dHYW1lc0V2ZW50cyhcclxuICAgICAgICB7XHJcbiAgICAgICAgICBvbkluZm9VcGRhdGVzOiAoaW5mbykgPT4gTWF0Y2hUcmFja2VyLmluc3RhbmNlKCkuaGFuZGxlSW5mb1VwZGF0ZShpbmZvKSxcclxuICAgICAgICAgIG9uTmV3RXZlbnRzOiAoZSkgPT4gTWF0Y2hUcmFja2VyLmluc3RhbmNlKCkuaGFuZGxlTmV3RXZlbnRzKGUpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2FtZUZlYXR1cmVzXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuX2dhbWVFdmVudHNMaXN0ZW5lci5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIENvbXBWaWV3ZXJSZW5kZXJlci5pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvLyA9PT09PSBIb3RrZXlzID09PT09XHJcbiAgcHJpdmF0ZSBhc3luYyBzZXRUb2dnbGVIb3RrZXlCZWhhdmlvcigpIHtcclxuICAgIGNvbnN0IHRvZ2dsZUluR2FtZVdpbmRvdyA9IGFzeW5jIChcclxuICAgICAgX2hvdGtleVJlc3VsdDogb3ZlcndvbGYuc2V0dGluZ3MuaG90a2V5cy5PblByZXNzZWRFdmVudFxyXG4gICAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICAgIGNvbnN0IGluR2FtZVN0YXRlID0gYXdhaXQgdGhpcy5nZXRXaW5kb3dTdGF0ZSgpO1xyXG4gICAgICBpZiAoaW5HYW1lU3RhdGUud2luZG93X3N0YXRlID09PSBXaW5kb3dTdGF0ZS5OT1JNQUwgfHxcclxuICAgICAgICBpbkdhbWVTdGF0ZS53aW5kb3dfc3RhdGUgPT09IFdpbmRvd1N0YXRlLk1BWElNSVpFRCkge1xyXG4gICAgICAgIHRoaXMuY3VycldpbmRvdy5taW5pbWl6ZSgpO1xyXG4gICAgICB9IGVsc2UgaWYgKGluR2FtZVN0YXRlLndpbmRvd19zdGF0ZSA9PT0gV2luZG93U3RhdGUuTUlOSU1JWkVEIHx8XHJcbiAgICAgICAgaW5HYW1lU3RhdGUud2luZG93X3N0YXRlID09PSBXaW5kb3dTdGF0ZS5DTE9TRUQpIHtcclxuICAgICAgICB0aGlzLmN1cnJXaW5kb3cucmVzdG9yZSgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgT1dIb3RrZXlzLm9uSG90a2V5RG93bihrSG90a2V5cy50b2dnbGUsIHRvZ2dsZUluR2FtZVdpbmRvdyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGdldEN1cnJlbnRHYW1lQ2xhc3NJZCgpOiBQcm9taXNlPG51bWJlciB8IG51bGw+IHtcclxuICAgIGNvbnN0IGluZm8gPSBhd2FpdCBPV0dhbWVzLmdldFJ1bm5pbmdHYW1lSW5mbygpO1xyXG4gICAgcmV0dXJuIChpbmZvICYmIGluZm8uaXNSdW5uaW5nICYmIGluZm8uY2xhc3NJZCkgPyBpbmZvLmNsYXNzSWQgOiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuSW5HYW1lLmluc3RhbmNlKCkucnVuKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==