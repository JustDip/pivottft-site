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

/***/ "./src/services/WindowBus.ts":
/*!***********************************!*\
  !*** ./src/services/WindowBus.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.publish = exports.emitLocal = exports.broadcast = exports.subscribe = exports.BUS_TOPICS = void 0;
exports.BUS_TOPICS = {
    PIN_CHANGED: 'pin:changed',
    CONTROLLER_TOGGLE_INGAME: 'ctrl:toggle-ingame',
    SETTINGS_CHANGED: 'settings:changed',
    TEAM_BUILDER_PUSHED: 'tb:pushed',
    REQUEST_REFRESH: 'data:refresh-request',
};
const handlers = new Map();
let listenerRegistered = false;
let currentWindowName = null;
function ensureGlobalListener() {
    var _a;
    if (listenerRegistered)
        return;
    if (typeof overwolf === 'undefined' || !((_a = overwolf.windows) === null || _a === void 0 ? void 0 : _a.onMessageReceived))
        return;
    overwolf.windows.onMessageReceived.addListener((event) => {
        var _a;
        let envelope = null;
        try {
            envelope = typeof event.content === 'string' ? JSON.parse(event.content) : event.content;
        }
        catch (_b) {
            envelope = null;
        }
        const topic = (envelope === null || envelope === void 0 ? void 0 : envelope.topic) || event.message_name;
        if (!topic)
            return;
        const set = handlers.get(topic);
        if (!set)
            return;
        const payload = (_a = envelope === null || envelope === void 0 ? void 0 : envelope.payload) !== null && _a !== void 0 ? _a : event.content;
        set.forEach(handler => {
            try {
                handler(payload);
            }
            catch (e) {
                console.error('[WindowBus] handler threw:', e);
            }
        });
    });
    listenerRegistered = true;
}
function getCurrentWindow() {
    if (currentWindowName)
        return Promise.resolve(currentWindowName);
    return new Promise(resolve => {
        overwolf.windows.getCurrentWindow((res) => {
            var _a, _b;
            const name = ((_a = res === null || res === void 0 ? void 0 : res.window) === null || _a === void 0 ? void 0 : _a.name) || ((_b = res === null || res === void 0 ? void 0 : res.window) === null || _b === void 0 ? void 0 : _b.id) || '';
            currentWindowName = name;
            resolve(name);
        });
    });
}
function subscribe(topic, handler) {
    ensureGlobalListener();
    let set = handlers.get(topic);
    if (!set) {
        set = new Set();
        handlers.set(topic, set);
    }
    set.add(handler);
    return () => {
        set.delete(handler);
        if (set.size === 0)
            handlers.delete(topic);
    };
}
exports.subscribe = subscribe;
async function broadcast(topic, payload) {
    var _a;
    if (typeof overwolf === 'undefined' || !((_a = overwolf.windows) === null || _a === void 0 ? void 0 : _a.sendMessage))
        return;
    const fromWindow = await getCurrentWindow();
    const envelope = { topic, payload, sentAt: Date.now(), fromWindow };
    const content = JSON.stringify(envelope);
    const targets = ['desktop', 'in_game', 'settings', 'ingame_controller', 'background', 'matchups'];
    for (const target of targets) {
        if (target === fromWindow)
            continue;
        overwolf.windows.obtainDeclaredWindow(target, (res) => {
            var _a;
            const id = (_a = res === null || res === void 0 ? void 0 : res.window) === null || _a === void 0 ? void 0 : _a.id;
            if (!id)
                return;
            overwolf.windows.sendMessage(id, topic, content, () => { });
        });
    }
}
exports.broadcast = broadcast;
function emitLocal(topic, payload) {
    const set = handlers.get(topic);
    if (!set)
        return;
    set.forEach(handler => {
        try {
            handler(payload);
        }
        catch (e) {
            console.error('[WindowBus] local handler threw:', e);
        }
    });
}
exports.emitLocal = emitLocal;
function publish(topic, payload) {
    emitLocal(topic, payload);
    broadcast(topic, payload).catch(() => { });
}
exports.publish = publish;


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
/*!****************************************************!*\
  !*** ./src/ingame_controller/ingame_controller.ts ***!
  \****************************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const consts_1 = __webpack_require__(/*! ../consts */ "./src/consts.ts");
const WindowBus_1 = __webpack_require__(/*! ../services/WindowBus */ "./src/services/WindowBus.ts");
function obtainWindow(name) {
    return new Promise(resolve => {
        overwolf.windows.obtainDeclaredWindow(name, (res) => {
            if ((res === null || res === void 0 ? void 0 : res.success) && res.window)
                resolve(res.window);
            else
                resolve(null);
        });
    });
}
function getWindowState(name) {
    return new Promise(resolve => {
        overwolf.windows.getWindowState(name, (res) => {
            if (res === null || res === void 0 ? void 0 : res.success) {
                resolve(res.window_state_ex || res.window_state || null);
            }
            else {
                resolve(null);
            }
        });
    });
}
async function toggleInGame() {
    const state = await getWindowState(consts_1.kWindowNames.inGame);
    if (state === 'normal' || state === 'maximized') {
        const win = await obtainWindow(consts_1.kWindowNames.inGame);
        if (win === null || win === void 0 ? void 0 : win.id)
            overwolf.windows.hide(win.id);
    }
    else {
        const win = await obtainWindow(consts_1.kWindowNames.inGame);
        if (win === null || win === void 0 ? void 0 : win.id)
            overwolf.windows.restore(win.id);
    }
    WindowBus_1.publish(WindowBus_1.BUS_TOPICS.CONTROLLER_TOGGLE_INGAME, {});
}
async function openSettings() {
    const win = await obtainWindow(consts_1.kWindowNames.settings);
    if (win === null || win === void 0 ? void 0 : win.id)
        overwolf.windows.restore(win.id);
}
async function toggleMatchups() {
    const state = await getWindowState(consts_1.kWindowNames.matchups);
    const win = await obtainWindow(consts_1.kWindowNames.matchups);
    if (!(win === null || win === void 0 ? void 0 : win.id))
        return;
    if (state === 'normal' || state === 'maximized') {
        overwolf.windows.hide(win.id);
    }
    else {
        overwolf.windows.restore(win.id);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const icon = document.getElementById('ctrl-icon');
    if (!icon)
        return;
    let clickTimer = null;
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        if (clickTimer)
            return;
        clickTimer = window.setTimeout(() => {
            clickTimer = null;
            toggleInGame();
        }, 220);
    });
    icon.addEventListener('dblclick', (e) => {
        e.preventDefault();
        if (clickTimer) {
            window.clearTimeout(clickTimer);
            clickTimer = null;
        }
        toggleMatchups();
    });
    icon.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        openSettings();
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvaW5nYW1lX2NvbnRyb2xsZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdhLHNCQUFjLEdBQUcsSUFBSSxHQUFHLENBQW1CO0lBQ3REO1FBQ0UsSUFBSTtRQUNKO1lBQ0UsWUFBWTtZQUNaLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLFVBQVU7WUFDVixXQUFXO1lBQ1gsVUFBVTtZQUNWLGtCQUFrQjtTQUNuQjtLQUNGO0NBQ0YsQ0FBQyxDQUFDO0FBRVUscUJBQWEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVsRCxvQkFBWSxHQUFHO0lBQzFCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLFFBQVEsRUFBRSxVQUFVO0lBQ3BCLGdCQUFnQixFQUFFLG1CQUFtQjtJQUNyQyxRQUFRLEVBQUUsVUFBVTtJQUNwQixLQUFLLEVBQUUsT0FBTztJQUNkLEtBQUssRUFBRSxPQUFPO0NBQ2YsQ0FBQztBQUVXLGdCQUFRLEdBQUc7SUFDdEIsTUFBTSxFQUFFLG1CQUFtQjtDQUM1QixDQUFDO0FBR1csbUJBQVcsR0FBRyxJQUFJLENBQUM7QUFHbkIsc0JBQWMsR0FBRztJQUM1QixNQUFNLEVBQUUsRUFBRTtJQUNWLE1BQU0sRUFBRSxRQUFpQjtJQUN6QixRQUFRLEVBQUUsTUFBTTtDQUNqQixDQUFDO0FBS1csdUJBQWUsR0FBRywwQkFBMEIsQ0FBQztBQUk3Qyx5QkFBaUIsR0FBbUQ7SUFDL0UsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVE7SUFDbkUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVU7SUFDMUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU07SUFDekQsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU07Q0FDM0QsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUN2Q1csa0JBQVUsR0FBRztJQUN4QixXQUFXLEVBQUUsYUFBYTtJQUMxQix3QkFBd0IsRUFBRSxvQkFBb0I7SUFDOUMsZ0JBQWdCLEVBQUUsa0JBQWtCO0lBQ3BDLG1CQUFtQixFQUFFLFdBQVc7SUFDaEMsZUFBZSxFQUFFLHNCQUFzQjtDQUMvQixDQUFDO0FBSVgsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQXNDLENBQUM7QUFDL0QsSUFBSSxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDL0IsSUFBSSxpQkFBaUIsR0FBa0IsSUFBSSxDQUFDO0FBRTVDLFNBQVMsb0JBQW9COztJQUMzQixJQUFJLGtCQUFrQjtRQUFFLE9BQU87SUFDL0IsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksQ0FBQyxlQUFRLENBQUMsT0FBTywwQ0FBRSxpQkFBaUI7UUFBRSxPQUFPO0lBRXBGLFFBQVEsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7O1FBRXZELElBQUksUUFBUSxHQUF1QixJQUFJLENBQUM7UUFDeEMsSUFBSTtZQUNGLFFBQVEsR0FBRyxPQUFPLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUUsS0FBSyxDQUFDLE9BQWUsQ0FBQztTQUNuRztRQUFDLFdBQU07WUFDTixRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ2pCO1FBQ0QsTUFBTSxLQUFLLEdBQUcsQ0FBQyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsS0FBSyxDQUFDLElBQUssS0FBYSxDQUFDLFlBQVksQ0FBQztRQUMvRCxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU87UUFDbkIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRztZQUFFLE9BQU87UUFDakIsTUFBTSxPQUFPLEdBQUcsY0FBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sbUNBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNuRCxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3BCLElBQUk7Z0JBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQUU7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQUU7UUFDekYsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILGtCQUFrQixHQUFHLElBQUksQ0FBQztBQUM1QixDQUFDO0FBRUQsU0FBUyxnQkFBZ0I7SUFDdkIsSUFBSSxpQkFBaUI7UUFBRSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzNCLFFBQVEsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7WUFDeEMsTUFBTSxJQUFJLEdBQUcsVUFBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE1BQU0sMENBQUUsSUFBSSxNQUFJLFNBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxNQUFNLDBDQUFFLEVBQUUsS0FBSSxFQUFFLENBQUM7WUFDeEQsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUtELFNBQWdCLFNBQVMsQ0FBYyxLQUF3QixFQUFFLE9BQTRCO0lBQzNGLG9CQUFvQixFQUFFLENBQUM7SUFDdkIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1IsR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDMUI7SUFDRCxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQWdDLENBQUMsQ0FBQztJQUMxQyxPQUFPLEdBQUcsRUFBRTtRQUNWLEdBQUksQ0FBQyxNQUFNLENBQUMsT0FBZ0MsQ0FBQyxDQUFDO1FBQzlDLElBQUksR0FBSSxDQUFDLElBQUksS0FBSyxDQUFDO1lBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUM7QUFDSixDQUFDO0FBWkQsOEJBWUM7QUFPTSxLQUFLLFVBQVUsU0FBUyxDQUFjLEtBQXdCLEVBQUUsT0FBVTs7SUFDL0UsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksQ0FBQyxlQUFRLENBQUMsT0FBTywwQ0FBRSxXQUFXO1FBQUUsT0FBTztJQUM5RSxNQUFNLFVBQVUsR0FBRyxNQUFNLGdCQUFnQixFQUFFLENBQUM7SUFDNUMsTUFBTSxRQUFRLEdBQW1CLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQ3BGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFJekMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbEcsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDNUIsSUFBSSxNQUFNLEtBQUssVUFBVTtZQUFFLFNBQVM7UUFDcEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7WUFDcEQsTUFBTSxFQUFFLEdBQUcsU0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE1BQU0sMENBQUUsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxFQUFFO2dCQUFFLE9BQU87WUFDaEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQXlCLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLENBQUMsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDO0FBakJELDhCQWlCQztBQU1ELFNBQWdCLFNBQVMsQ0FBYyxLQUF3QixFQUFFLE9BQVU7SUFDekUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxJQUFJLENBQUMsR0FBRztRQUFFLE9BQU87SUFDakIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNwQixJQUFJO1lBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQUU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FBRTtJQUMvRixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFORCw4QkFNQztBQUdELFNBQWdCLE9BQU8sQ0FBYyxLQUF3QixFQUFFLE9BQVU7SUFDdkUsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxQixTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBZ0IsQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUhELDBCQUdDOzs7Ozs7O1VDNUhEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ2hCQSx5RUFBeUM7QUFDekMsb0dBQTREO0FBRTVELFNBQVMsWUFBWSxDQUFDLElBQVk7SUFDaEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMzQixRQUFRLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2xELElBQUksSUFBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sS0FBSSxHQUFHLENBQUMsTUFBTTtnQkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztnQkFDL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsSUFBWTtJQUNsQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzNCLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ2pELElBQUksR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE9BQU8sRUFBRTtnQkFFaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksR0FBRyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQzthQUMxRDtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsS0FBSyxVQUFVLFlBQVk7SUFDekIsTUFBTSxLQUFLLEdBQUcsTUFBTSxjQUFjLENBQUMscUJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4RCxJQUFJLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxLQUFLLFdBQVcsRUFBRTtRQUUvQyxNQUFNLEdBQUcsR0FBRyxNQUFNLFlBQVksQ0FBQyxxQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELElBQUksR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLEVBQUU7WUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDNUM7U0FBTTtRQUVMLE1BQU0sR0FBRyxHQUFHLE1BQU0sWUFBWSxDQUFDLHFCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsRUFBRTtZQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMvQztJQUdELG1CQUFPLENBQUMsc0JBQVUsQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQsS0FBSyxVQUFVLFlBQVk7SUFDekIsTUFBTSxHQUFHLEdBQUcsTUFBTSxZQUFZLENBQUMscUJBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCxJQUFJLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxFQUFFO1FBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFFRCxLQUFLLFVBQVUsY0FBYztJQUMzQixNQUFNLEtBQUssR0FBRyxNQUFNLGNBQWMsQ0FBQyxxQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFELE1BQU0sR0FBRyxHQUFHLE1BQU0sWUFBWSxDQUFDLHFCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEQsSUFBSSxDQUFDLElBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxFQUFFO1FBQUUsT0FBTztJQUNyQixJQUFJLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxLQUFLLFdBQVcsRUFBRTtRQUMvQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDL0I7U0FBTTtRQUNMLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNsQztBQUNILENBQUM7QUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBQy9DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPO0lBS2xCLElBQUksVUFBVSxHQUFrQixJQUFJLENBQUM7SUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ25DLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixJQUFJLFVBQVU7WUFBRSxPQUFPO1FBQ3ZCLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNsQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLFlBQVksRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3RDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixJQUFJLFVBQVUsRUFBRTtZQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQUU7UUFDdkUsY0FBYyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDekMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLFlBQVksRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9jb25zdHMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvc2VydmljZXMvV2luZG93QnVzLnRzIiwid2VicGFjazovL3Bpdm90dGZ0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL2luZ2FtZV9jb250cm9sbGVyL2luZ2FtZV9jb250cm9sbGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFBpdm90VEZUIOKAlCBURlQgR2FtZSBFdmVudHMgRmVhdHVyZXNcclxuLy8gR2FtZSBJRCA1NDI2ID0gTGVhZ3VlIG9mIExlZ2VuZHMgY2xpZW50ICh3aGljaCBURlQgcnVucyBpbnNpZGUpXHJcbi8vIFRGVC1zcGVjaWZpYyBldmVudHMgdXNlIGludGVybmFsIEdhbWUgSUQgMjE1NzAsIGJ1dCB3ZSByZWdpc3RlciB3aXRoIDU0MjZcclxuZXhwb3J0IGNvbnN0IGtHYW1lc0ZlYXR1cmVzID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZ1tdPihbXHJcbiAgW1xyXG4gICAgNTQyNixcclxuICAgIFtcclxuICAgICAgJ21hdGNoX2luZm8nLFxyXG4gICAgICAnYm9hcmQnLFxyXG4gICAgICAnYmVuY2gnLFxyXG4gICAgICAnc3RvcmUnLFxyXG4gICAgICAnY2Fyb3VzZWwnLFxyXG4gICAgICAnZ2FtZV9pbmZvJyxcclxuICAgICAgJ2F1Z21lbnRzJyxcclxuICAgICAgJ2xpdmVfY2xpZW50X2RhdGEnXHJcbiAgICBdXHJcbiAgXSxcclxuXSk7XHJcblxyXG5leHBvcnQgY29uc3Qga0dhbWVDbGFzc0lkcyA9IEFycmF5LmZyb20oa0dhbWVzRmVhdHVyZXMua2V5cygpKTtcclxuXHJcbmV4cG9ydCBjb25zdCBrV2luZG93TmFtZXMgPSB7XHJcbiAgaW5HYW1lOiAnaW5fZ2FtZScsXHJcbiAgZGVza3RvcDogJ2Rlc2t0b3AnLFxyXG4gIHNldHRpbmdzOiAnc2V0dGluZ3MnLFxyXG4gIGluZ2FtZUNvbnRyb2xsZXI6ICdpbmdhbWVfY29udHJvbGxlcicsXHJcbiAgbWF0Y2h1cHM6ICdtYXRjaHVwcycsXHJcbiAgbG9naW46ICdsb2dpbicsXHJcbiAgYWRtaW46ICdhZG1pbicsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qga0hvdGtleXMgPSB7XHJcbiAgdG9nZ2xlOiAncGl2b3R0ZnRfc2hvd2hpZGUnXHJcbn07XHJcblxyXG4vLyBURlQgR2FtZSBJRCBmb3IgZXZlbnQgcmVnaXN0cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrVEZUQ2xhc3NJZCA9IDU0MjY7XHJcblxyXG4vLyBSaW90IEFQSSBDb25maWd1cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrUmlvdEFwaUNvbmZpZyA9IHtcclxuICBhcGlLZXk6ICcnLFxyXG4gIHJlZ2lvbjogJ2V1cm9wZScgYXMgY29uc3QsICAgICAgIC8vIGFtZXJpY2FzIHwgZXVyb3BlIHwgYXNpYSAoYWNjb3VudC12MSwgbWF0Y2gtdjEpXHJcbiAgcGxhdGZvcm06ICdldW4xJywgICAgICAgICAgICAgICAgLy8gZXV3MSwgZXVuMSwgbmExLCBrciwgLi4uIChzdW1tb25lci9sZWFndWUpXHJcbn07XHJcblxyXG4vLyBCYWNrZW5kIGJhc2UgVVJMLiBJbiBwcm9kdWN0aW9uIHJvdXRlcyB0aHJvdWdoIENsb3VkZmxhcmUgV29ya2VyIGF0XHJcbi8vIGFwaS5waXZvdHRmdC5jb20gKFJpb3QgQVBJIHByb3h5ICsgYXV0aCArIGNvbXBzIGJhY2tlbmQpLiBPdmVycmlkZSB0b1xyXG4vLyBodHRwOi8vMTI3LjAuMC4xOjg3ODcgZHVyaW5nIGxvY2FsIGB3cmFuZ2xlciBkZXZgIGRldmVsb3BtZW50LlxyXG5leHBvcnQgY29uc3Qga1Jpb3RBcGlCYXNlVXJsID0gJ2h0dHBzOi8vYXBpLnBpdm90dGZ0LmNvbSc7XHJcblxyXG5cclxuLy8gUGxhdGZvcm0g4oaSIHJlZ2lvbmFsIHJvdXRpbmcgbWFwIChmb3IgYWNjb3VudC9tYXRjaCBlbmRwb2ludHMpXHJcbmV4cG9ydCBjb25zdCBrUGxhdGZvcm1Ub1JlZ2lvbjogUmVjb3JkPHN0cmluZywgJ2FtZXJpY2FzJyB8ICdldXJvcGUnIHwgJ2FzaWEnPiA9IHtcclxuICAnZXV3MSc6ICdldXJvcGUnLCAnZXVuMSc6ICdldXJvcGUnLCAndHIxJzogJ2V1cm9wZScsICdydSc6ICdldXJvcGUnLFxyXG4gICduYTEnOiAnYW1lcmljYXMnLCAnYnIxJzogJ2FtZXJpY2FzJywgJ2xhMSc6ICdhbWVyaWNhcycsICdsYTInOiAnYW1lcmljYXMnLFxyXG4gICdrcic6ICdhc2lhJywgJ2pwMSc6ICdhc2lhJywgJ29jMSc6ICdhc2lhJywgJ3BoMic6ICdhc2lhJyxcclxuICAnc2cyJzogJ2FzaWEnLCAndGgyJzogJ2FzaWEnLCAndHcyJzogJ2FzaWEnLCAndm4yJzogJ2FzaWEnLFxyXG59O1xyXG4iLCIvLyBXaW5kb3ctdG8td2luZG93IG1lc3NhZ2luZyDigJQgdGhpbiB3cmFwcGVyIGFyb3VuZCBvdmVyd29sZi53aW5kb3dzLnNlbmRNZXNzYWdlXG4vLyArIG9uTWVzc2FnZVJlY2VpdmVkLiBVc2VkIHRvIHByb3BhZ2F0ZSBVSSBzdGF0ZSBjaGFuZ2VzIChwaW4gZXZlbnRzLFxuLy8gY29udHJvbGxlciB0b2dnbGVzLCBzZXR0aW5ncyBjaGFuZ2VzKSB3aXRob3V0IGdvaW5nIHRocm91Z2ggbG9jYWxTdG9yYWdlXG4vLyBwb2xsaW5nLlxuLy9cbi8vIEVhY2ggbWVzc2FnZSBoYXMgYSBgdG9waWNgIHN0cmluZyArIGFyYml0cmFyeSBKU09OLXNlcmlhbGlzYWJsZSBwYXlsb2FkLlxuLy8gU3Vic2NyaWJlcnMgcmVnaXN0ZXIgYSB0b3BpYyArIGhhbmRsZXI7IHRoZSBidXMgZGlzcGF0Y2hlcyBieSB0b3BpYy5cblxuZXhwb3J0IHR5cGUgV2luZG93QnVzSGFuZGxlcjxUID0gdW5rbm93bj4gPSAocGF5bG9hZDogVCkgPT4gdm9pZDtcblxuaW50ZXJmYWNlIEJ1c0VudmVsb3BlPFQgPSB1bmtub3duPiB7XG4gIHRvcGljOiBzdHJpbmc7XG4gIHBheWxvYWQ6IFQ7XG4gIHNlbnRBdDogbnVtYmVyO1xuICBmcm9tV2luZG93Pzogc3RyaW5nO1xufVxuXG4vLyBUb3BpY3Mg4oCUIGtlZXAgYWxsIHN0cmluZyBsaXRlcmFscyBoZXJlIHNvIHJlbmFtZXMgY2FzY2FkZS5cbmV4cG9ydCBjb25zdCBCVVNfVE9QSUNTID0ge1xuICBQSU5fQ0hBTkdFRDogJ3BpbjpjaGFuZ2VkJywgICAgICAgICAgICAgICAgICAvLyBwYXlsb2FkOiB7IGNvbXBJZDogc3RyaW5nIHwgbnVsbCB9XG4gIENPTlRST0xMRVJfVE9HR0xFX0lOR0FNRTogJ2N0cmw6dG9nZ2xlLWluZ2FtZScsICAvLyBwYXlsb2FkOiB7fVxuICBTRVRUSU5HU19DSEFOR0VEOiAnc2V0dGluZ3M6Y2hhbmdlZCcsICAgICAgICAvLyBwYXlsb2FkOiB7IGtleTogc3RyaW5nLCB2YWx1ZTogdW5rbm93biB9XG4gIFRFQU1fQlVJTERFUl9QVVNIRUQ6ICd0YjpwdXNoZWQnLCAgICAgICAgICAgIC8vIHBheWxvYWQ6IHsgY2hhbXBpb25JZHM6IHN0cmluZ1tdIH1cbiAgUkVRVUVTVF9SRUZSRVNIOiAnZGF0YTpyZWZyZXNoLXJlcXVlc3QnLCAgICAgLy8gcGF5bG9hZDogeyBzY29wZTogc3RyaW5nIH1cbn0gYXMgY29uc3Q7XG5cbnR5cGUgQnVzVG9waWMgPSB0eXBlb2YgQlVTX1RPUElDU1trZXlvZiB0eXBlb2YgQlVTX1RPUElDU107XG5cbmNvbnN0IGhhbmRsZXJzID0gbmV3IE1hcDxzdHJpbmcsIFNldDxXaW5kb3dCdXNIYW5kbGVyPGFueT4+PigpO1xubGV0IGxpc3RlbmVyUmVnaXN0ZXJlZCA9IGZhbHNlO1xubGV0IGN1cnJlbnRXaW5kb3dOYW1lOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuZnVuY3Rpb24gZW5zdXJlR2xvYmFsTGlzdGVuZXIoKSB7XG4gIGlmIChsaXN0ZW5lclJlZ2lzdGVyZWQpIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvdmVyd29sZiA9PT0gJ3VuZGVmaW5lZCcgfHwgIW92ZXJ3b2xmLndpbmRvd3M/Lm9uTWVzc2FnZVJlY2VpdmVkKSByZXR1cm47XG5cbiAgb3ZlcndvbGYud2luZG93cy5vbk1lc3NhZ2VSZWNlaXZlZC5hZGRMaXN0ZW5lcigoZXZlbnQpID0+IHtcbiAgICAvLyBldmVudC5pZCwgZXZlbnQuY29udGVudCwgZXZlbnQubWVzc2FnZV9uYW1lLCBldmVudC5mcm9tXG4gICAgbGV0IGVudmVsb3BlOiBCdXNFbnZlbG9wZSB8IG51bGwgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBlbnZlbG9wZSA9IHR5cGVvZiBldmVudC5jb250ZW50ID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UoZXZlbnQuY29udGVudCkgOiAoZXZlbnQuY29udGVudCBhcyBhbnkpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgZW52ZWxvcGUgPSBudWxsO1xuICAgIH1cbiAgICBjb25zdCB0b3BpYyA9IChlbnZlbG9wZT8udG9waWMpIHx8IChldmVudCBhcyBhbnkpLm1lc3NhZ2VfbmFtZTtcbiAgICBpZiAoIXRvcGljKSByZXR1cm47XG4gICAgY29uc3Qgc2V0ID0gaGFuZGxlcnMuZ2V0KHRvcGljKTtcbiAgICBpZiAoIXNldCkgcmV0dXJuO1xuICAgIGNvbnN0IHBheWxvYWQgPSBlbnZlbG9wZT8ucGF5bG9hZCA/PyBldmVudC5jb250ZW50O1xuICAgIHNldC5mb3JFYWNoKGhhbmRsZXIgPT4ge1xuICAgICAgdHJ5IHsgaGFuZGxlcihwYXlsb2FkKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKCdbV2luZG93QnVzXSBoYW5kbGVyIHRocmV3OicsIGUpOyB9XG4gICAgfSk7XG4gIH0pO1xuICBsaXN0ZW5lclJlZ2lzdGVyZWQgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50V2luZG93KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGlmIChjdXJyZW50V2luZG93TmFtZSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjdXJyZW50V2luZG93TmFtZSk7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBvdmVyd29sZi53aW5kb3dzLmdldEN1cnJlbnRXaW5kb3coKHJlcykgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IHJlcz8ud2luZG93Py5uYW1lIHx8IHJlcz8ud2luZG93Py5pZCB8fCAnJztcbiAgICAgIGN1cnJlbnRXaW5kb3dOYW1lID0gbmFtZTtcbiAgICAgIHJlc29sdmUobmFtZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFN1YnNjcmliZSB0byBhIHRvcGljLiBSZXR1cm5zIGFuIHVuc3Vic2NyaWJlIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlPFQgPSB1bmtub3duPih0b3BpYzogQnVzVG9waWMgfCBzdHJpbmcsIGhhbmRsZXI6IFdpbmRvd0J1c0hhbmRsZXI8VD4pOiAoKSA9PiB2b2lkIHtcbiAgZW5zdXJlR2xvYmFsTGlzdGVuZXIoKTtcbiAgbGV0IHNldCA9IGhhbmRsZXJzLmdldCh0b3BpYyk7XG4gIGlmICghc2V0KSB7XG4gICAgc2V0ID0gbmV3IFNldCgpO1xuICAgIGhhbmRsZXJzLnNldCh0b3BpYywgc2V0KTtcbiAgfVxuICBzZXQuYWRkKGhhbmRsZXIgYXMgV2luZG93QnVzSGFuZGxlcjxhbnk+KTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBzZXQhLmRlbGV0ZShoYW5kbGVyIGFzIFdpbmRvd0J1c0hhbmRsZXI8YW55Pik7XG4gICAgaWYgKHNldCEuc2l6ZSA9PT0gMCkgaGFuZGxlcnMuZGVsZXRlKHRvcGljKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBCcm9hZGNhc3QgdG8gZXZlcnkgb3RoZXIgUGl2b3RURlQgd2luZG93LiBTZW5kZXIgaXMgZXhjbHVkZWQgYnkgT3ZlcndvbGYuXG4gKiBOb3RlOiBtZXNzYWdlcyBvbmx5IHJlYWNoIHdpbmRvd3MgdGhhdCBoYXZlIGNhbGxlZCBgc3Vic2NyaWJlKC4uLilgIEFORFxuICogYXJlIGFjdHVhbGx5IG9wZW4gYXQgdGhlIHRpbWUgb2YgdGhlIGJyb2FkY2FzdC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJyb2FkY2FzdDxUID0gdW5rbm93bj4odG9waWM6IEJ1c1RvcGljIHwgc3RyaW5nLCBwYXlsb2FkOiBUKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmICh0eXBlb2Ygb3ZlcndvbGYgPT09ICd1bmRlZmluZWQnIHx8ICFvdmVyd29sZi53aW5kb3dzPy5zZW5kTWVzc2FnZSkgcmV0dXJuO1xuICBjb25zdCBmcm9tV2luZG93ID0gYXdhaXQgZ2V0Q3VycmVudFdpbmRvdygpO1xuICBjb25zdCBlbnZlbG9wZTogQnVzRW52ZWxvcGU8VD4gPSB7IHRvcGljLCBwYXlsb2FkLCBzZW50QXQ6IERhdGUubm93KCksIGZyb21XaW5kb3cgfTtcbiAgY29uc3QgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KGVudmVsb3BlKTtcblxuICAvLyBFbnVtZXJhdGUgd2luZG93cyBmcm9tIHRoZSBkZWNsYXJlZCBsaXN0IGluIGNvbnN0cyAoY2hlYXBlciB0aGFuIGFza2luZ1xuICAvLyBPdmVyd29sZiBmb3IgXCJhbGwgb3BlbiB3aW5kb3dzXCIgd2hpY2ggdGhlIEFQSSBkb2Vzbid0IGV4cG9zZSBjbGVhbmx5KS5cbiAgY29uc3QgdGFyZ2V0cyA9IFsnZGVza3RvcCcsICdpbl9nYW1lJywgJ3NldHRpbmdzJywgJ2luZ2FtZV9jb250cm9sbGVyJywgJ2JhY2tncm91bmQnLCAnbWF0Y2h1cHMnXTtcbiAgZm9yIChjb25zdCB0YXJnZXQgb2YgdGFyZ2V0cykge1xuICAgIGlmICh0YXJnZXQgPT09IGZyb21XaW5kb3cpIGNvbnRpbnVlO1xuICAgIG92ZXJ3b2xmLndpbmRvd3Mub2J0YWluRGVjbGFyZWRXaW5kb3codGFyZ2V0LCAocmVzKSA9PiB7XG4gICAgICBjb25zdCBpZCA9IHJlcz8ud2luZG93Py5pZDtcbiAgICAgIGlmICghaWQpIHJldHVybjtcbiAgICAgIG92ZXJ3b2xmLndpbmRvd3Muc2VuZE1lc3NhZ2UoaWQsIHRvcGljLCBjb250ZW50LCAoKSA9PiB7IC8qIGZpcmUtYW5kLWZvcmdldCAqLyB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIExvY2FsIGZhbi1vdXQg4oCUIGludm9rZXMgc3Vic2NyaWJlcnMgaW4gdGhlIENVUlJFTlQgd2luZG93IG9ubHkgKG5vIElQQykuXG4gKiBVc2VmdWwgd2hlbiB0aGUgc2VuZGVyIGFsc28gd2FudHMgdG8gcmVhY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbWl0TG9jYWw8VCA9IHVua25vd24+KHRvcGljOiBCdXNUb3BpYyB8IHN0cmluZywgcGF5bG9hZDogVCk6IHZvaWQge1xuICBjb25zdCBzZXQgPSBoYW5kbGVycy5nZXQodG9waWMpO1xuICBpZiAoIXNldCkgcmV0dXJuO1xuICBzZXQuZm9yRWFjaChoYW5kbGVyID0+IHtcbiAgICB0cnkgeyBoYW5kbGVyKHBheWxvYWQpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoJ1tXaW5kb3dCdXNdIGxvY2FsIGhhbmRsZXIgdGhyZXc6JywgZSk7IH1cbiAgfSk7XG59XG5cbi8qKiBCcm9hZGNhc3QgQU5EIGZpcmUgbG9jYWwgaGFuZGxlcnMg4oCUIG1vc3QgY29tbW9uIHBhdHRlcm4uICovXG5leHBvcnQgZnVuY3Rpb24gcHVibGlzaDxUID0gdW5rbm93bj4odG9waWM6IEJ1c1RvcGljIHwgc3RyaW5nLCBwYXlsb2FkOiBUKTogdm9pZCB7XG4gIGVtaXRMb2NhbCh0b3BpYywgcGF5bG9hZCk7XG4gIGJyb2FkY2FzdCh0b3BpYywgcGF5bG9hZCkuY2F0Y2goKCkgPT4geyAvKiBpZ25vcmUgKi8gfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gVGlueSBpbi1nYW1lIGNvbnRyb2xsZXIg4oCUIGEgNjR4NjQgZmxvYXRpbmcgaWNvbiBwaW5uZWQgdG8gdGhlIHRvcC1yaWdodFxuLy8gb2YgdGhlIGdhbWUgd2luZG93LiBMZWZ0LWNsaWNrIHRvZ2dsZXMgdGhlIG1haW4gaW5fZ2FtZSBvdmVybGF5OyByaWdodC1jbGlja1xuLy8gb3BlbnMgdGhlIHN0YW5kYWxvbmUgc2V0dGluZ3Mgd2luZG93LlxuLy9cbi8vIE1pcnJvcnMgTWV0YVRGVCdzIGBpbmdhbWVjb250cm9sbGVyYCB3aW5kb3cgKDU1eDU1IGluIHRoZWlyIG1hbmlmZXN0KS5cblxuaW1wb3J0IHsga1dpbmRvd05hbWVzIH0gZnJvbSAnLi4vY29uc3RzJztcbmltcG9ydCB7IHB1Ymxpc2gsIEJVU19UT1BJQ1MgfSBmcm9tICcuLi9zZXJ2aWNlcy9XaW5kb3dCdXMnO1xuXG5mdW5jdGlvbiBvYnRhaW5XaW5kb3cobmFtZTogc3RyaW5nKTogUHJvbWlzZTxvdmVyd29sZi53aW5kb3dzLldpbmRvd0luZm8gfCBudWxsPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBvdmVyd29sZi53aW5kb3dzLm9idGFpbkRlY2xhcmVkV2luZG93KG5hbWUsIChyZXMpID0+IHtcbiAgICAgIGlmIChyZXM/LnN1Y2Nlc3MgJiYgcmVzLndpbmRvdykgcmVzb2x2ZShyZXMud2luZG93KTtcbiAgICAgIGVsc2UgcmVzb2x2ZShudWxsKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFdpbmRvd1N0YXRlKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgb3ZlcndvbGYud2luZG93cy5nZXRXaW5kb3dTdGF0ZShuYW1lLCAocmVzOiBhbnkpID0+IHtcbiAgICAgIGlmIChyZXM/LnN1Y2Nlc3MpIHtcbiAgICAgICAgLy8gU29tZSBPdmVyd29sZiB2ZXJzaW9ucyB1c2UgYHdpbmRvd19zdGF0ZWAsIG90aGVycyBgd2luZG93X3N0YXRlX2V4YFxuICAgICAgICByZXNvbHZlKHJlcy53aW5kb3dfc3RhdGVfZXggfHwgcmVzLndpbmRvd19zdGF0ZSB8fCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiB0b2dnbGVJbkdhbWUoKSB7XG4gIGNvbnN0IHN0YXRlID0gYXdhaXQgZ2V0V2luZG93U3RhdGUoa1dpbmRvd05hbWVzLmluR2FtZSk7XG4gIGlmIChzdGF0ZSA9PT0gJ25vcm1hbCcgfHwgc3RhdGUgPT09ICdtYXhpbWl6ZWQnKSB7XG4gICAgLy8gQ3VycmVudGx5IHZpc2libGUgLT4gaGlkZVxuICAgIGNvbnN0IHdpbiA9IGF3YWl0IG9idGFpbldpbmRvdyhrV2luZG93TmFtZXMuaW5HYW1lKTtcbiAgICBpZiAod2luPy5pZCkgb3ZlcndvbGYud2luZG93cy5oaWRlKHdpbi5pZCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQ2xvc2VkL21pbmltaXplZC9oaWRkZW4gLT4gcmVzdG9yZVxuICAgIGNvbnN0IHdpbiA9IGF3YWl0IG9idGFpbldpbmRvdyhrV2luZG93TmFtZXMuaW5HYW1lKTtcbiAgICBpZiAod2luPy5pZCkgb3ZlcndvbGYud2luZG93cy5yZXN0b3JlKHdpbi5pZCk7XG4gIH1cbiAgLy8gQWxzbyBicm9hZGNhc3Qgc28gYW55IGxpc3RlbmluZyB3aW5kb3dzIGNhbiB1cGRhdGUgVUkgc3RhdGUgKGUuZy4gYVxuICAvLyBcImNvbnRyb2xsZXIgaXMgaGlkZGVuXCIgaW5kaWNhdG9yIGluIHRoZSBmdXR1cmUpLlxuICBwdWJsaXNoKEJVU19UT1BJQ1MuQ09OVFJPTExFUl9UT0dHTEVfSU5HQU1FLCB7fSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW5TZXR0aW5ncygpIHtcbiAgY29uc3Qgd2luID0gYXdhaXQgb2J0YWluV2luZG93KGtXaW5kb3dOYW1lcy5zZXR0aW5ncyk7XG4gIGlmICh3aW4/LmlkKSBvdmVyd29sZi53aW5kb3dzLnJlc3RvcmUod2luLmlkKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdG9nZ2xlTWF0Y2h1cHMoKSB7XG4gIGNvbnN0IHN0YXRlID0gYXdhaXQgZ2V0V2luZG93U3RhdGUoa1dpbmRvd05hbWVzLm1hdGNodXBzKTtcbiAgY29uc3Qgd2luID0gYXdhaXQgb2J0YWluV2luZG93KGtXaW5kb3dOYW1lcy5tYXRjaHVwcyk7XG4gIGlmICghd2luPy5pZCkgcmV0dXJuO1xuICBpZiAoc3RhdGUgPT09ICdub3JtYWwnIHx8IHN0YXRlID09PSAnbWF4aW1pemVkJykge1xuICAgIG92ZXJ3b2xmLndpbmRvd3MuaGlkZSh3aW4uaWQpO1xuICB9IGVsc2Uge1xuICAgIG92ZXJ3b2xmLndpbmRvd3MucmVzdG9yZSh3aW4uaWQpO1xuICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zdCBpY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N0cmwtaWNvbicpO1xuICBpZiAoIWljb24pIHJldHVybjtcblxuICAvLyBTaW5nbGUtY2xpY2sgdG9nZ2xlcyB0aGUgbWFpbiBpbl9nYW1lIG92ZXJsYXkuXG4gIC8vIERvdWJsZS1jbGljayBvcGVucyBtYXRjaHVwcy5cbiAgLy8gUmlnaHQtY2xpY2sgb3BlbnMgc2V0dGluZ3MuXG4gIGxldCBjbGlja1RpbWVyOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgaWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChjbGlja1RpbWVyKSByZXR1cm47ICAvLyB3YWl0IGZvciBwb3RlbnRpYWwgZG91YmxlLWNsaWNrXG4gICAgY2xpY2tUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNsaWNrVGltZXIgPSBudWxsO1xuICAgICAgdG9nZ2xlSW5HYW1lKCk7XG4gICAgfSwgMjIwKTtcbiAgfSk7XG4gIGljb24uYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoY2xpY2tUaW1lcikgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KGNsaWNrVGltZXIpOyBjbGlja1RpbWVyID0gbnVsbDsgfVxuICAgIHRvZ2dsZU1hdGNodXBzKCk7XG4gIH0pO1xuICBpY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgb3BlblNldHRpbmdzKCk7XG4gIH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=