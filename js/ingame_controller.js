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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN6QyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsWUFBWSxFQUFFLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL2NvbnN0cy50cyIsIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9zZXJ2aWNlcy9XaW5kb3dCdXMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvaW5nYW1lX2NvbnRyb2xsZXIvaW5nYW1lX2NvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUGl2b3RURlQg4oCUIFRGVCBHYW1lIEV2ZW50cyBGZWF0dXJlc1xyXG4vLyBHYW1lIElEIDU0MjYgPSBMZWFndWUgb2YgTGVnZW5kcyBjbGllbnQgKHdoaWNoIFRGVCBydW5zIGluc2lkZSlcclxuLy8gVEZULXNwZWNpZmljIGV2ZW50cyB1c2UgaW50ZXJuYWwgR2FtZSBJRCAyMTU3MCwgYnV0IHdlIHJlZ2lzdGVyIHdpdGggNTQyNlxyXG5leHBvcnQgY29uc3Qga0dhbWVzRmVhdHVyZXMgPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nW10+KFtcclxuICBbXHJcbiAgICA1NDI2LFxyXG4gICAgW1xyXG4gICAgICAnbWF0Y2hfaW5mbycsXHJcbiAgICAgICdib2FyZCcsXHJcbiAgICAgICdiZW5jaCcsXHJcbiAgICAgICdzdG9yZScsXHJcbiAgICAgICdjYXJvdXNlbCcsXHJcbiAgICAgICdnYW1lX2luZm8nLFxyXG4gICAgICAnYXVnbWVudHMnLFxyXG4gICAgICAnbGl2ZV9jbGllbnRfZGF0YSdcclxuICAgIF1cclxuICBdLFxyXG5dKTtcclxuXHJcbmV4cG9ydCBjb25zdCBrR2FtZUNsYXNzSWRzID0gQXJyYXkuZnJvbShrR2FtZXNGZWF0dXJlcy5rZXlzKCkpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGtXaW5kb3dOYW1lcyA9IHtcclxuICBpbkdhbWU6ICdpbl9nYW1lJyxcclxuICBkZXNrdG9wOiAnZGVza3RvcCcsXHJcbiAgc2V0dGluZ3M6ICdzZXR0aW5ncycsXHJcbiAgaW5nYW1lQ29udHJvbGxlcjogJ2luZ2FtZV9jb250cm9sbGVyJyxcclxuICBtYXRjaHVwczogJ21hdGNodXBzJyxcclxuICBsb2dpbjogJ2xvZ2luJyxcclxuICBhZG1pbjogJ2FkbWluJyxcclxuICBoZWFkbGluZXI6ICdoZWFkbGluZXInLFxyXG4gIHJlcGxheTogJ3JlcGxheScsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qga0hvdGtleXMgPSB7XHJcbiAgdG9nZ2xlOiAncGl2b3R0ZnRfc2hvd2hpZGUnXHJcbn07XHJcblxyXG4vLyBURlQgR2FtZSBJRCBmb3IgZXZlbnQgcmVnaXN0cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrVEZUQ2xhc3NJZCA9IDU0MjY7XHJcblxyXG4vLyBSaW90IEFQSSBDb25maWd1cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrUmlvdEFwaUNvbmZpZyA9IHtcclxuICBhcGlLZXk6ICcnLFxyXG4gIHJlZ2lvbjogJ2V1cm9wZScgYXMgY29uc3QsICAgICAgIC8vIGFtZXJpY2FzIHwgZXVyb3BlIHwgYXNpYSAoYWNjb3VudC12MSwgbWF0Y2gtdjEpXHJcbiAgcGxhdGZvcm06ICdldW4xJywgICAgICAgICAgICAgICAgLy8gZXV3MSwgZXVuMSwgbmExLCBrciwgLi4uIChzdW1tb25lci9sZWFndWUpXHJcbn07XHJcblxyXG4vLyBCYWNrZW5kIGJhc2UgVVJMLiBJbiBwcm9kdWN0aW9uIHJvdXRlcyB0aHJvdWdoIENsb3VkZmxhcmUgV29ya2VyIGF0XHJcbi8vIGFwaS5waXZvdHRmdC5jb20gKFJpb3QgQVBJIHByb3h5ICsgYXV0aCArIGNvbXBzIGJhY2tlbmQpLiBPdmVycmlkZSB0b1xyXG4vLyBodHRwOi8vMTI3LjAuMC4xOjg3ODcgZHVyaW5nIGxvY2FsIGB3cmFuZ2xlciBkZXZgIGRldmVsb3BtZW50LlxyXG5leHBvcnQgY29uc3Qga1Jpb3RBcGlCYXNlVXJsID0gJ2h0dHBzOi8vYXBpLnBpdm90dGZ0LmNvbSc7XHJcblxyXG4vLyBDdXJyZW50IFRGVCBpbi1zZXQgcGF0Y2ggKyBzZXQgbnVtYmVyLiBCdW1wIHRoZXNlIHRvZ2V0aGVyIHdpdGggdGhlXHJcbi8vIGBQQVRDSEVTYCBhcnJheXMgaW4gTGl2ZU1ldGFSZW5kZXJlci50cyArIFRyZW5kc1JlbmRlcmVyLnRzIGV2ZXJ5IHRpbWVcclxuLy8gYSBuZXcgVEZUIHBhdGNoIHNoaXBzLiBVc2VkIGJ5IFNuYXBzaG90VXBsb2FkZXIgc28gdXBsb2FkZWQgc25hcHNob3RzXHJcbi8vIGxhbmQgaW4gdGhlIHJpZ2h0IHNsaWNlIHdpdGhvdXQgZGVwZW5kaW5nIG9uIFJpb3QncyBgZ2FtZV92ZXJzaW9uYFxyXG4vLyBzdHJpbmcgcGFyc2luZy5cclxuZXhwb3J0IGNvbnN0IGtDdXJyZW50VGZ0UGF0Y2ggPSAnMTcuMyc7XHJcbmV4cG9ydCBjb25zdCBrQ3VycmVudFRmdFNldE51bWJlciA9IDE3O1xyXG5cclxuXHJcbi8vIFBsYXRmb3JtIOKGkiByZWdpb25hbCByb3V0aW5nIG1hcCAoZm9yIGFjY291bnQvbWF0Y2ggZW5kcG9pbnRzKVxyXG5leHBvcnQgY29uc3Qga1BsYXRmb3JtVG9SZWdpb246IFJlY29yZDxzdHJpbmcsICdhbWVyaWNhcycgfCAnZXVyb3BlJyB8ICdhc2lhJz4gPSB7XHJcbiAgJ2V1dzEnOiAnZXVyb3BlJywgJ2V1bjEnOiAnZXVyb3BlJywgJ3RyMSc6ICdldXJvcGUnLCAncnUnOiAnZXVyb3BlJyxcclxuICAnbmExJzogJ2FtZXJpY2FzJywgJ2JyMSc6ICdhbWVyaWNhcycsICdsYTEnOiAnYW1lcmljYXMnLCAnbGEyJzogJ2FtZXJpY2FzJyxcclxuICAna3InOiAnYXNpYScsICdqcDEnOiAnYXNpYScsICdvYzEnOiAnYXNpYScsICdwaDInOiAnYXNpYScsXHJcbiAgJ3NnMic6ICdhc2lhJywgJ3RoMic6ICdhc2lhJywgJ3R3Mic6ICdhc2lhJywgJ3ZuMic6ICdhc2lhJyxcclxufTtcclxuIiwiLy8gV2luZG93LXRvLXdpbmRvdyBtZXNzYWdpbmcg4oCUIHRoaW4gd3JhcHBlciBhcm91bmQgb3ZlcndvbGYud2luZG93cy5zZW5kTWVzc2FnZVxuLy8gKyBvbk1lc3NhZ2VSZWNlaXZlZC4gVXNlZCB0byBwcm9wYWdhdGUgVUkgc3RhdGUgY2hhbmdlcyAocGluIGV2ZW50cyxcbi8vIGNvbnRyb2xsZXIgdG9nZ2xlcywgc2V0dGluZ3MgY2hhbmdlcykgd2l0aG91dCBnb2luZyB0aHJvdWdoIGxvY2FsU3RvcmFnZVxuLy8gcG9sbGluZy5cbi8vXG4vLyBFYWNoIG1lc3NhZ2UgaGFzIGEgYHRvcGljYCBzdHJpbmcgKyBhcmJpdHJhcnkgSlNPTi1zZXJpYWxpc2FibGUgcGF5bG9hZC5cbi8vIFN1YnNjcmliZXJzIHJlZ2lzdGVyIGEgdG9waWMgKyBoYW5kbGVyOyB0aGUgYnVzIGRpc3BhdGNoZXMgYnkgdG9waWMuXG5cbmV4cG9ydCB0eXBlIFdpbmRvd0J1c0hhbmRsZXI8VCA9IHVua25vd24+ID0gKHBheWxvYWQ6IFQpID0+IHZvaWQ7XG5cbmludGVyZmFjZSBCdXNFbnZlbG9wZTxUID0gdW5rbm93bj4ge1xuICB0b3BpYzogc3RyaW5nO1xuICBwYXlsb2FkOiBUO1xuICBzZW50QXQ6IG51bWJlcjtcbiAgZnJvbVdpbmRvdz86IHN0cmluZztcbn1cblxuLy8gVG9waWNzIOKAlCBrZWVwIGFsbCBzdHJpbmcgbGl0ZXJhbHMgaGVyZSBzbyByZW5hbWVzIGNhc2NhZGUuXG5leHBvcnQgY29uc3QgQlVTX1RPUElDUyA9IHtcbiAgUElOX0NIQU5HRUQ6ICdwaW46Y2hhbmdlZCcsICAgICAgICAgICAgICAgICAgLy8gcGF5bG9hZDogeyBjb21wSWQ6IHN0cmluZyB8IG51bGwgfVxuICBDT05UUk9MTEVSX1RPR0dMRV9JTkdBTUU6ICdjdHJsOnRvZ2dsZS1pbmdhbWUnLCAgLy8gcGF5bG9hZDoge31cbiAgU0VUVElOR1NfQ0hBTkdFRDogJ3NldHRpbmdzOmNoYW5nZWQnLCAgICAgICAgLy8gcGF5bG9hZDogeyBrZXk6IHN0cmluZywgdmFsdWU6IHVua25vd24gfVxuICBURUFNX0JVSUxERVJfUFVTSEVEOiAndGI6cHVzaGVkJywgICAgICAgICAgICAvLyBwYXlsb2FkOiB7IGNoYW1waW9uSWRzOiBzdHJpbmdbXSB9XG4gIFJFUVVFU1RfUkVGUkVTSDogJ2RhdGE6cmVmcmVzaC1yZXF1ZXN0JywgICAgIC8vIHBheWxvYWQ6IHsgc2NvcGU6IHN0cmluZyB9XG59IGFzIGNvbnN0O1xuXG50eXBlIEJ1c1RvcGljID0gdHlwZW9mIEJVU19UT1BJQ1Nba2V5b2YgdHlwZW9mIEJVU19UT1BJQ1NdO1xuXG5jb25zdCBoYW5kbGVycyA9IG5ldyBNYXA8c3RyaW5nLCBTZXQ8V2luZG93QnVzSGFuZGxlcjxhbnk+Pj4oKTtcbmxldCBsaXN0ZW5lclJlZ2lzdGVyZWQgPSBmYWxzZTtcbmxldCBjdXJyZW50V2luZG93TmFtZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbmZ1bmN0aW9uIGVuc3VyZUdsb2JhbExpc3RlbmVyKCkge1xuICBpZiAobGlzdGVuZXJSZWdpc3RlcmVkKSByZXR1cm47XG4gIGlmICh0eXBlb2Ygb3ZlcndvbGYgPT09ICd1bmRlZmluZWQnIHx8ICFvdmVyd29sZi53aW5kb3dzPy5vbk1lc3NhZ2VSZWNlaXZlZCkgcmV0dXJuO1xuXG4gIG92ZXJ3b2xmLndpbmRvd3Mub25NZXNzYWdlUmVjZWl2ZWQuYWRkTGlzdGVuZXIoKGV2ZW50KSA9PiB7XG4gICAgLy8gZXZlbnQuaWQsIGV2ZW50LmNvbnRlbnQsIGV2ZW50Lm1lc3NhZ2VfbmFtZSwgZXZlbnQuZnJvbVxuICAgIGxldCBlbnZlbG9wZTogQnVzRW52ZWxvcGUgfCBudWxsID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgZW52ZWxvcGUgPSB0eXBlb2YgZXZlbnQuY29udGVudCA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKGV2ZW50LmNvbnRlbnQpIDogKGV2ZW50LmNvbnRlbnQgYXMgYW55KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIGVudmVsb3BlID0gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgdG9waWMgPSAoZW52ZWxvcGU/LnRvcGljKSB8fCAoZXZlbnQgYXMgYW55KS5tZXNzYWdlX25hbWU7XG4gICAgaWYgKCF0b3BpYykgcmV0dXJuO1xuICAgIGNvbnN0IHNldCA9IGhhbmRsZXJzLmdldCh0b3BpYyk7XG4gICAgaWYgKCFzZXQpIHJldHVybjtcbiAgICBjb25zdCBwYXlsb2FkID0gZW52ZWxvcGU/LnBheWxvYWQgPz8gZXZlbnQuY29udGVudDtcbiAgICBzZXQuZm9yRWFjaChoYW5kbGVyID0+IHtcbiAgICAgIHRyeSB7IGhhbmRsZXIocGF5bG9hZCk7IH0gY2F0Y2ggKGUpIHsgY29uc29sZS5lcnJvcignW1dpbmRvd0J1c10gaGFuZGxlciB0aHJldzonLCBlKTsgfVxuICAgIH0pO1xuICB9KTtcbiAgbGlzdGVuZXJSZWdpc3RlcmVkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudFdpbmRvdygpOiBQcm9taXNlPHN0cmluZz4ge1xuICBpZiAoY3VycmVudFdpbmRvd05hbWUpIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3VycmVudFdpbmRvd05hbWUpO1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgb3ZlcndvbGYud2luZG93cy5nZXRDdXJyZW50V2luZG93KChyZXMpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSByZXM/LndpbmRvdz8ubmFtZSB8fCByZXM/LndpbmRvdz8uaWQgfHwgJyc7XG4gICAgICBjdXJyZW50V2luZG93TmFtZSA9IG5hbWU7XG4gICAgICByZXNvbHZlKG5hbWUpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBTdWJzY3JpYmUgdG8gYSB0b3BpYy4gUmV0dXJucyBhbiB1bnN1YnNjcmliZSBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1YnNjcmliZTxUID0gdW5rbm93bj4odG9waWM6IEJ1c1RvcGljIHwgc3RyaW5nLCBoYW5kbGVyOiBXaW5kb3dCdXNIYW5kbGVyPFQ+KTogKCkgPT4gdm9pZCB7XG4gIGVuc3VyZUdsb2JhbExpc3RlbmVyKCk7XG4gIGxldCBzZXQgPSBoYW5kbGVycy5nZXQodG9waWMpO1xuICBpZiAoIXNldCkge1xuICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICBoYW5kbGVycy5zZXQodG9waWMsIHNldCk7XG4gIH1cbiAgc2V0LmFkZChoYW5kbGVyIGFzIFdpbmRvd0J1c0hhbmRsZXI8YW55Pik7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgc2V0IS5kZWxldGUoaGFuZGxlciBhcyBXaW5kb3dCdXNIYW5kbGVyPGFueT4pO1xuICAgIGlmIChzZXQhLnNpemUgPT09IDApIGhhbmRsZXJzLmRlbGV0ZSh0b3BpYyk7XG4gIH07XG59XG5cbi8qKlxuICogQnJvYWRjYXN0IHRvIGV2ZXJ5IG90aGVyIFBpdm90VEZUIHdpbmRvdy4gU2VuZGVyIGlzIGV4Y2x1ZGVkIGJ5IE92ZXJ3b2xmLlxuICogTm90ZTogbWVzc2FnZXMgb25seSByZWFjaCB3aW5kb3dzIHRoYXQgaGF2ZSBjYWxsZWQgYHN1YnNjcmliZSguLi4pYCBBTkRcbiAqIGFyZSBhY3R1YWxseSBvcGVuIGF0IHRoZSB0aW1lIG9mIHRoZSBicm9hZGNhc3QuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBicm9hZGNhc3Q8VCA9IHVua25vd24+KHRvcGljOiBCdXNUb3BpYyB8IHN0cmluZywgcGF5bG9hZDogVCk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAodHlwZW9mIG92ZXJ3b2xmID09PSAndW5kZWZpbmVkJyB8fCAhb3ZlcndvbGYud2luZG93cz8uc2VuZE1lc3NhZ2UpIHJldHVybjtcbiAgY29uc3QgZnJvbVdpbmRvdyA9IGF3YWl0IGdldEN1cnJlbnRXaW5kb3coKTtcbiAgY29uc3QgZW52ZWxvcGU6IEJ1c0VudmVsb3BlPFQ+ID0geyB0b3BpYywgcGF5bG9hZCwgc2VudEF0OiBEYXRlLm5vdygpLCBmcm9tV2luZG93IH07XG4gIGNvbnN0IGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShlbnZlbG9wZSk7XG5cbiAgLy8gRW51bWVyYXRlIHdpbmRvd3MgZnJvbSB0aGUgZGVjbGFyZWQgbGlzdCBpbiBjb25zdHMgKGNoZWFwZXIgdGhhbiBhc2tpbmdcbiAgLy8gT3ZlcndvbGYgZm9yIFwiYWxsIG9wZW4gd2luZG93c1wiIHdoaWNoIHRoZSBBUEkgZG9lc24ndCBleHBvc2UgY2xlYW5seSkuXG4gIGNvbnN0IHRhcmdldHMgPSBbJ2Rlc2t0b3AnLCAnaW5fZ2FtZScsICdzZXR0aW5ncycsICdpbmdhbWVfY29udHJvbGxlcicsICdiYWNrZ3JvdW5kJywgJ21hdGNodXBzJ107XG4gIGZvciAoY29uc3QgdGFyZ2V0IG9mIHRhcmdldHMpIHtcbiAgICBpZiAodGFyZ2V0ID09PSBmcm9tV2luZG93KSBjb250aW51ZTtcbiAgICBvdmVyd29sZi53aW5kb3dzLm9idGFpbkRlY2xhcmVkV2luZG93KHRhcmdldCwgKHJlcykgPT4ge1xuICAgICAgY29uc3QgaWQgPSByZXM/LndpbmRvdz8uaWQ7XG4gICAgICBpZiAoIWlkKSByZXR1cm47XG4gICAgICBvdmVyd29sZi53aW5kb3dzLnNlbmRNZXNzYWdlKGlkLCB0b3BpYywgY29udGVudCwgKCkgPT4geyAvKiBmaXJlLWFuZC1mb3JnZXQgKi8gfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBMb2NhbCBmYW4tb3V0IOKAlCBpbnZva2VzIHN1YnNjcmliZXJzIGluIHRoZSBDVVJSRU5UIHdpbmRvdyBvbmx5IChubyBJUEMpLlxuICogVXNlZnVsIHdoZW4gdGhlIHNlbmRlciBhbHNvIHdhbnRzIHRvIHJlYWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW1pdExvY2FsPFQgPSB1bmtub3duPih0b3BpYzogQnVzVG9waWMgfCBzdHJpbmcsIHBheWxvYWQ6IFQpOiB2b2lkIHtcbiAgY29uc3Qgc2V0ID0gaGFuZGxlcnMuZ2V0KHRvcGljKTtcbiAgaWYgKCFzZXQpIHJldHVybjtcbiAgc2V0LmZvckVhY2goaGFuZGxlciA9PiB7XG4gICAgdHJ5IHsgaGFuZGxlcihwYXlsb2FkKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKCdbV2luZG93QnVzXSBsb2NhbCBoYW5kbGVyIHRocmV3OicsIGUpOyB9XG4gIH0pO1xufVxuXG4vKiogQnJvYWRjYXN0IEFORCBmaXJlIGxvY2FsIGhhbmRsZXJzIOKAlCBtb3N0IGNvbW1vbiBwYXR0ZXJuLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1Ymxpc2g8VCA9IHVua25vd24+KHRvcGljOiBCdXNUb3BpYyB8IHN0cmluZywgcGF5bG9hZDogVCk6IHZvaWQge1xuICBlbWl0TG9jYWwodG9waWMsIHBheWxvYWQpO1xuICBicm9hZGNhc3QodG9waWMsIHBheWxvYWQpLmNhdGNoKCgpID0+IHsgLyogaWdub3JlICovIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIFRpbnkgaW4tZ2FtZSBjb250cm9sbGVyIOKAlCBhIDY0eDY0IGZsb2F0aW5nIGljb24gcGlubmVkIHRvIHRoZSB0b3AtcmlnaHRcbi8vIG9mIHRoZSBnYW1lIHdpbmRvdy4gTGVmdC1jbGljayB0b2dnbGVzIHRoZSBtYWluIGluX2dhbWUgb3ZlcmxheTsgcmlnaHQtY2xpY2tcbi8vIG9wZW5zIHRoZSBzdGFuZGFsb25lIHNldHRpbmdzIHdpbmRvdy5cbi8vXG4vLyBNaXJyb3JzIE1ldGFURlQncyBgaW5nYW1lY29udHJvbGxlcmAgd2luZG93ICg1NXg1NSBpbiB0aGVpciBtYW5pZmVzdCkuXG5cbmltcG9ydCB7IGtXaW5kb3dOYW1lcyB9IGZyb20gJy4uL2NvbnN0cyc7XG5pbXBvcnQgeyBwdWJsaXNoLCBCVVNfVE9QSUNTIH0gZnJvbSAnLi4vc2VydmljZXMvV2luZG93QnVzJztcblxuZnVuY3Rpb24gb2J0YWluV2luZG93KG5hbWU6IHN0cmluZyk6IFByb21pc2U8b3ZlcndvbGYud2luZG93cy5XaW5kb3dJbmZvIHwgbnVsbD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgb3ZlcndvbGYud2luZG93cy5vYnRhaW5EZWNsYXJlZFdpbmRvdyhuYW1lLCAocmVzKSA9PiB7XG4gICAgICBpZiAocmVzPy5zdWNjZXNzICYmIHJlcy53aW5kb3cpIHJlc29sdmUocmVzLndpbmRvdyk7XG4gICAgICBlbHNlIHJlc29sdmUobnVsbCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3dTdGF0ZShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIG92ZXJ3b2xmLndpbmRvd3MuZ2V0V2luZG93U3RhdGUobmFtZSwgKHJlczogYW55KSA9PiB7XG4gICAgICBpZiAocmVzPy5zdWNjZXNzKSB7XG4gICAgICAgIC8vIFNvbWUgT3ZlcndvbGYgdmVyc2lvbnMgdXNlIGB3aW5kb3dfc3RhdGVgLCBvdGhlcnMgYHdpbmRvd19zdGF0ZV9leGBcbiAgICAgICAgcmVzb2x2ZShyZXMud2luZG93X3N0YXRlX2V4IHx8IHJlcy53aW5kb3dfc3RhdGUgfHwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdG9nZ2xlSW5HYW1lKCkge1xuICBjb25zdCBzdGF0ZSA9IGF3YWl0IGdldFdpbmRvd1N0YXRlKGtXaW5kb3dOYW1lcy5pbkdhbWUpO1xuICBpZiAoc3RhdGUgPT09ICdub3JtYWwnIHx8IHN0YXRlID09PSAnbWF4aW1pemVkJykge1xuICAgIC8vIEN1cnJlbnRseSB2aXNpYmxlIC0+IGhpZGVcbiAgICBjb25zdCB3aW4gPSBhd2FpdCBvYnRhaW5XaW5kb3coa1dpbmRvd05hbWVzLmluR2FtZSk7XG4gICAgaWYgKHdpbj8uaWQpIG92ZXJ3b2xmLndpbmRvd3MuaGlkZSh3aW4uaWQpO1xuICB9IGVsc2Uge1xuICAgIC8vIENsb3NlZC9taW5pbWl6ZWQvaGlkZGVuIC0+IHJlc3RvcmVcbiAgICBjb25zdCB3aW4gPSBhd2FpdCBvYnRhaW5XaW5kb3coa1dpbmRvd05hbWVzLmluR2FtZSk7XG4gICAgaWYgKHdpbj8uaWQpIG92ZXJ3b2xmLndpbmRvd3MucmVzdG9yZSh3aW4uaWQpO1xuICB9XG4gIC8vIEFsc28gYnJvYWRjYXN0IHNvIGFueSBsaXN0ZW5pbmcgd2luZG93cyBjYW4gdXBkYXRlIFVJIHN0YXRlIChlLmcuIGFcbiAgLy8gXCJjb250cm9sbGVyIGlzIGhpZGRlblwiIGluZGljYXRvciBpbiB0aGUgZnV0dXJlKS5cbiAgcHVibGlzaChCVVNfVE9QSUNTLkNPTlRST0xMRVJfVE9HR0xFX0lOR0FNRSwge30pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBvcGVuU2V0dGluZ3MoKSB7XG4gIGNvbnN0IHdpbiA9IGF3YWl0IG9idGFpbldpbmRvdyhrV2luZG93TmFtZXMuc2V0dGluZ3MpO1xuICBpZiAod2luPy5pZCkgb3ZlcndvbGYud2luZG93cy5yZXN0b3JlKHdpbi5pZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHRvZ2dsZU1hdGNodXBzKCkge1xuICBjb25zdCBzdGF0ZSA9IGF3YWl0IGdldFdpbmRvd1N0YXRlKGtXaW5kb3dOYW1lcy5tYXRjaHVwcyk7XG4gIGNvbnN0IHdpbiA9IGF3YWl0IG9idGFpbldpbmRvdyhrV2luZG93TmFtZXMubWF0Y2h1cHMpO1xuICBpZiAoIXdpbj8uaWQpIHJldHVybjtcbiAgaWYgKHN0YXRlID09PSAnbm9ybWFsJyB8fCBzdGF0ZSA9PT0gJ21heGltaXplZCcpIHtcbiAgICBvdmVyd29sZi53aW5kb3dzLmhpZGUod2luLmlkKTtcbiAgfSBlbHNlIHtcbiAgICBvdmVyd29sZi53aW5kb3dzLnJlc3RvcmUod2luLmlkKTtcbiAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdHJsLWljb24nKTtcbiAgaWYgKCFpY29uKSByZXR1cm47XG5cbiAgLy8gU2luZ2xlLWNsaWNrIHRvZ2dsZXMgdGhlIG1haW4gaW5fZ2FtZSBvdmVybGF5LlxuICAvLyBEb3VibGUtY2xpY2sgb3BlbnMgbWF0Y2h1cHMuXG4gIC8vIFJpZ2h0LWNsaWNrIG9wZW5zIHNldHRpbmdzLlxuICBsZXQgY2xpY2tUaW1lcjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIGljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoY2xpY2tUaW1lcikgcmV0dXJuOyAgLy8gd2FpdCBmb3IgcG90ZW50aWFsIGRvdWJsZS1jbGlja1xuICAgIGNsaWNrVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjbGlja1RpbWVyID0gbnVsbDtcbiAgICAgIHRvZ2dsZUluR2FtZSgpO1xuICAgIH0sIDIyMCk7XG4gIH0pO1xuICBpY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGNsaWNrVGltZXIpIHsgd2luZG93LmNsZWFyVGltZW91dChjbGlja1RpbWVyKTsgY2xpY2tUaW1lciA9IG51bGw7IH1cbiAgICB0b2dnbGVNYXRjaHVwcygpO1xuICB9KTtcbiAgaWNvbi5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIG9wZW5TZXR0aW5ncygpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9