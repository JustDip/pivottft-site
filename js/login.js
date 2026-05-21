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
  !*** ./src/login/login.ts ***!
  \****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const AuthService_1 = __webpack_require__(/*! ../services/AuthService */ "./src/services/AuthService.ts");
let currentMode = 'signin';
function $(id) {
    return document.getElementById(id);
}
function setMode(mode) {
    var _a, _b;
    currentMode = mode;
    (_a = $('tab-signin')) === null || _a === void 0 ? void 0 : _a.classList.toggle('active', mode === 'signin');
    (_b = $('tab-signup')) === null || _b === void 0 ? void 0 : _b.classList.toggle('active', mode === 'signup');
    const nameWrap = $('login-name-wrap');
    if (nameWrap)
        nameWrap.style.display = mode === 'signup' ? 'flex' : 'none';
    const submit = $('login-submit');
    if (submit)
        submit.textContent = mode === 'signin' ? 'Sign in' : 'Create account';
    const pwd = $('login-password');
    if (pwd)
        pwd.autocomplete = mode === 'signin' ? 'current-password' : 'new-password';
    clearError();
}
function showError(msg) {
    const el = $('login-error');
    if (!el)
        return;
    el.textContent = msg;
    el.style.display = 'block';
}
function clearError() {
    const el = $('login-error');
    if (!el)
        return;
    el.textContent = '';
    el.style.display = 'none';
}
function showSuccess(user) {
    $('login-form').style.display = 'none';
    $('login-intro').style.display = 'none';
    const wrap = $('login-success');
    if (wrap)
        wrap.style.display = 'flex';
    const text = $('login-success-text');
    if (text) {
        text.innerHTML = `Signed in as <strong>${escapeHtml(user.email)}</strong> (${user.role}).<br>You can close this window.`;
    }
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
async function handleSubmit(e) {
    var _a, _b, _c;
    e.preventDefault();
    clearError();
    const email = ((_a = $('login-email')) === null || _a === void 0 ? void 0 : _a.value.trim()) || '';
    const password = ((_b = $('login-password')) === null || _b === void 0 ? void 0 : _b.value) || '';
    const displayName = ((_c = $('login-name')) === null || _c === void 0 ? void 0 : _c.value.trim()) || undefined;
    if (!email || !password) {
        showError('Email and password are required.');
        return;
    }
    const submit = $('login-submit');
    if (submit) {
        submit.disabled = true;
        submit.textContent = 'Working…';
    }
    try {
        const user = currentMode === 'signin'
            ? await AuthService_1.login(email, password)
            : await AuthService_1.register(email, password, displayName);
        showSuccess(user);
    }
    catch (err) {
        showError((err === null || err === void 0 ? void 0 : err.message) || 'Sign-in failed.');
    }
    finally {
        if (submit) {
            submit.disabled = false;
            submit.textContent = currentMode === 'signin' ? 'Sign in' : 'Create account';
        }
    }
}
window.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c, _d, _e;
    (_a = $('tab-signin')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => setMode('signin'));
    (_b = $('tab-signup')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => setMode('signup'));
    (_c = $('login-form')) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', (e) => { handleSubmit(e); });
    (_d = $('login-close')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', closeWindow);
    (_e = $('login-success-close')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', closeWindow);
    if (AuthService_1.isAuthenticated()) {
        const u = AuthService_1.getStoredUser();
        if (u)
            showSuccess({ email: u.email, role: u.role });
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvbG9naW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdhLHNCQUFjLEdBQUcsSUFBSSxHQUFHLENBQW1CO0lBQ3REO1FBQ0UsSUFBSTtRQUNKO1lBQ0UsWUFBWTtZQUNaLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLFVBQVU7WUFDVixXQUFXO1lBQ1gsVUFBVTtZQUNWLGtCQUFrQjtTQUNuQjtLQUNGO0NBQ0YsQ0FBQyxDQUFDO0FBRVUscUJBQWEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVsRCxvQkFBWSxHQUFHO0lBQzFCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLFFBQVEsRUFBRSxVQUFVO0lBQ3BCLGdCQUFnQixFQUFFLG1CQUFtQjtJQUNyQyxRQUFRLEVBQUUsVUFBVTtJQUNwQixLQUFLLEVBQUUsT0FBTztJQUNkLEtBQUssRUFBRSxPQUFPO0lBQ2QsU0FBUyxFQUFFLFdBQVc7SUFDdEIsTUFBTSxFQUFFLFFBQVE7Q0FDakIsQ0FBQztBQUVXLGdCQUFRLEdBQUc7SUFDdEIsTUFBTSxFQUFFLG1CQUFtQjtDQUM1QixDQUFDO0FBR1csbUJBQVcsR0FBRyxJQUFJLENBQUM7QUFHbkIsc0JBQWMsR0FBRztJQUM1QixNQUFNLEVBQUUsRUFBRTtJQUNWLE1BQU0sRUFBRSxRQUFpQjtJQUN6QixRQUFRLEVBQUUsTUFBTTtDQUNqQixDQUFDO0FBS1csdUJBQWUsR0FBRywwQkFBMEIsQ0FBQztBQU83Qyx3QkFBZ0IsR0FBRyxNQUFNLENBQUM7QUFDMUIsNEJBQW9CLEdBQUcsRUFBRSxDQUFDO0FBSTFCLHlCQUFpQixHQUFtRDtJQUMvRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUTtJQUNuRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsVUFBVTtJQUMxRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTTtJQUN6RCxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTTtDQUMzRCxDQUFDOzs7Ozs7Ozs7Ozs7OztBQzlERix5RUFBNEM7QUFnQjVDLE1BQU0sYUFBYSxHQUFHLHFCQUFxQixDQUFDO0FBQzVDLE1BQU0sWUFBWSxHQUFHLG9CQUFvQixDQUFDO0FBRzFDLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxFQUFZLENBQUM7QUFFdEMsU0FBUyxJQUFJO0lBQ1gsTUFBTSxJQUFJLEdBQUcsYUFBYSxFQUFFLENBQUM7SUFDN0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNwQixJQUFJO1lBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQUU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FBRTtJQUNuRixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFnQixRQUFRO0lBQ3RCLElBQUk7UUFBRSxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7S0FBRTtJQUFDLFdBQU07UUFBRSxPQUFPLElBQUksQ0FBQztLQUFFO0FBQzVFLENBQUM7QUFGRCw0QkFFQztBQUVELFNBQWdCLGFBQWE7SUFDM0IsSUFBSTtRQUNGLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0MsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUM3QztJQUFDLFdBQU07UUFBRSxPQUFPLElBQUksQ0FBQztLQUFFO0FBQzFCLENBQUM7QUFMRCxzQ0FLQztBQUVELFNBQWdCLGVBQWU7SUFDN0IsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQzNDLENBQUM7QUFGRCwwQ0FFQztBQUVELFNBQWdCLE9BQU87SUFDckIsTUFBTSxDQUFDLEdBQUcsYUFBYSxFQUFFLENBQUM7SUFDMUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDO0FBQ25DLENBQUM7QUFIRCwwQkFHQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxJQUFjO0lBQ3ZDLE1BQU0sQ0FBQyxHQUFHLGFBQWEsRUFBRSxDQUFDO0lBQzFCLElBQUksQ0FBQyxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDckIsTUFBTSxJQUFJLEdBQTZCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUMzRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFMRCxnQ0FLQztBQUVELFNBQWdCLFFBQVEsQ0FBQyxRQUFrQjtJQUN6QyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hCLE9BQU8sR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBSEQsNEJBR0M7QUFFRCxTQUFTLFVBQVUsQ0FBQyxHQUFpQjtJQUNuQyxJQUFJO1FBQ0YsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDOUQ7SUFBQyxXQUFNLEdBQTRCO0lBQ3BDLElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQztBQUVELFNBQWdCLFlBQVk7SUFDMUIsSUFBSTtRQUNGLFlBQVksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN2QztJQUFDLFdBQU0sR0FBZ0I7SUFDeEIsSUFBSSxFQUFFLENBQUM7QUFDVCxDQUFDO0FBTkQsb0NBTUM7QUFFRCxLQUFLLFVBQVUsUUFBUSxDQUFJLElBQVksRUFBRSxJQUFhO0lBQ3BELE1BQU0sR0FBRyxHQUFHLEdBQUcsd0JBQWUsR0FBRyxJQUFJLEVBQUUsQ0FBQztJQUN4QyxNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDM0IsTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUU7UUFDL0MsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO0tBQzNCLENBQUMsQ0FBQztJQUNILElBQUksT0FBWSxDQUFDO0lBQ2pCLElBQUk7UUFBRSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7S0FBRTtJQUFDLFdBQU07UUFBRSxPQUFPLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQUU7SUFDbEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUU7UUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLFFBQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxLQUFLLEtBQUksUUFBUSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUN6RDtJQUNELE9BQU8sT0FBWSxDQUFDO0FBQ3RCLENBQUM7QUFFRCxLQUFLLFVBQVUsT0FBTyxDQUFJLElBQVksRUFBRSxLQUFxQjtJQUMzRCxNQUFNLEdBQUcsR0FBRyxHQUFHLHdCQUFlLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDeEMsTUFBTSxPQUFPLEdBQTJCLEVBQUUsQ0FBQztJQUMzQyxJQUFJLEtBQUs7UUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsVUFBVSxLQUFLLEVBQUUsQ0FBQztJQUN4RCxNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLElBQUksT0FBWSxDQUFDO0lBQ2pCLElBQUk7UUFBRSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7S0FBRTtJQUFDLFdBQU07UUFBRSxPQUFPLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQUU7SUFDbEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsS0FBSyxLQUFJLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDckUsT0FBTyxPQUFZLENBQUM7QUFDdEIsQ0FBQztBQUVNLEtBQUssVUFBVSxRQUFRLENBQUMsS0FBYSxFQUFFLFFBQWdCLEVBQUUsV0FBb0I7SUFDbEYsTUFBTSxHQUFHLEdBQUcsTUFBTSxRQUFRLENBQWUsZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDN0YsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztBQUNsQixDQUFDO0FBSkQsNEJBSUM7QUFFTSxLQUFLLFVBQVUsS0FBSyxDQUFDLEtBQWEsRUFBRSxRQUFnQjtJQUN6RCxNQUFNLEdBQUcsR0FBRyxNQUFNLFFBQVEsQ0FBZSxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUM3RSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ2xCLENBQUM7QUFKRCxzQkFJQztBQUVELFNBQWdCLE1BQU07SUFDcEIsWUFBWSxFQUFFLENBQUM7QUFDakIsQ0FBQztBQUZELHdCQUVDO0FBTU0sS0FBSyxVQUFVLFNBQVM7SUFDN0IsTUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDekIsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLElBQUksQ0FBQztJQUN4QixJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQWlCLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RCxJQUFJO1lBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUFFO1FBQUMsV0FBTSxHQUFnQjtRQUM1RixJQUFJLEVBQUUsQ0FBQztRQUNQLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztLQUNqQjtJQUFDLE9BQU8sQ0FBTSxFQUFFO1FBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUFFLFlBQVksRUFBRSxDQUFDO1FBQzNELE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDO0FBWkQsOEJBWUM7QUFNTSxLQUFLLFVBQVUsVUFBVSxDQUFJLElBQVksRUFBRSxPQUFvQixFQUFFO0lBQ3RFLE1BQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLElBQUksQ0FBQyxLQUFLO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sR0FBRyxHQUFHLEdBQUcsd0JBQWUsR0FBRyxJQUFJLEVBQUUsQ0FBQztJQUN4QyxNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLGtDQUN0QixJQUFJLEtBQ1AsT0FBTyxnREFDRixDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEtBQ3ZCLGVBQWUsRUFBRSxVQUFVLEtBQUssRUFBRSxLQUMvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUU5RCxDQUFDO0lBQ0gsSUFBSSxPQUFZLENBQUM7SUFDakIsSUFBSTtRQUFFLE9BQU8sR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUFFO0lBQUMsV0FBTTtRQUFFLE9BQU8sR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7S0FBRTtJQUNsRixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRTtRQUNYLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHO1lBQUUsWUFBWSxFQUFFLENBQUM7UUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsS0FBSyxLQUFJLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDekQ7SUFDRCxPQUFPLE9BQVksQ0FBQztBQUN0QixDQUFDO0FBbkJELGdDQW1CQzs7Ozs7OztVQ3JLRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7QUNwQkEsMEdBQTBGO0FBRzFGLElBQUksV0FBVyxHQUFTLFFBQVEsQ0FBQztBQUVqQyxTQUFTLENBQUMsQ0FBd0IsRUFBVTtJQUMxQyxPQUFPLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFhLENBQUM7QUFDakQsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUFDLElBQVU7O0lBQ3pCLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDbkIsT0FBQyxDQUFDLFlBQVksQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUM7SUFDL0QsT0FBQyxDQUFDLFlBQVksQ0FBQywwQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUM7SUFDL0QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdEMsSUFBSSxRQUFRO1FBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDM0UsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFvQixjQUFjLENBQUMsQ0FBQztJQUNwRCxJQUFJLE1BQU07UUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7SUFDbEYsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFtQixnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xELElBQUksR0FBRztRQUFFLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztJQUNwRixVQUFVLEVBQUUsQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxHQUFXO0lBQzVCLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QixJQUFJLENBQUMsRUFBRTtRQUFFLE9BQU87SUFDaEIsRUFBRSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7SUFDckIsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQzdCLENBQUM7QUFFRCxTQUFTLFVBQVU7SUFDakIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVCLElBQUksQ0FBQyxFQUFFO1FBQUUsT0FBTztJQUNoQixFQUFFLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUNwQixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDNUIsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLElBQXFDO0lBQ3hELENBQUMsQ0FBQyxZQUFZLENBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN4QyxDQUFDLENBQUMsYUFBYSxDQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDekMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2hDLElBQUksSUFBSTtRQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN0QyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNyQyxJQUFJLElBQUksRUFBRTtRQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsd0JBQXdCLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksa0NBQWtDLENBQUM7S0FDMUg7QUFDSCxDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsQ0FBUztJQUMzQixPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3RHLENBQUM7QUFFRCxTQUFTLFdBQVc7SUFDbEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRTs7UUFDdEMsSUFBSSxJQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsT0FBTyxNQUFJLFNBQUcsQ0FBQyxNQUFNLDBDQUFFLEVBQUU7WUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELEtBQUssVUFBVSxZQUFZLENBQUMsQ0FBUTs7SUFDbEMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25CLFVBQVUsRUFBRSxDQUFDO0lBQ2IsTUFBTSxLQUFLLEdBQUcsUUFBQyxDQUFtQixhQUFhLENBQUMsMENBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFJLEVBQUUsQ0FBQztJQUNyRSxNQUFNLFFBQVEsR0FBRyxRQUFDLENBQW1CLGdCQUFnQixDQUFDLDBDQUFFLEtBQUssS0FBSSxFQUFFLENBQUM7SUFDcEUsTUFBTSxXQUFXLEdBQUcsUUFBQyxDQUFtQixZQUFZLENBQUMsMENBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFJLFNBQVMsQ0FBQztJQUNqRixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ3ZCLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQzlDLE9BQU87S0FDUjtJQUVELE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBb0IsY0FBYyxDQUFDLENBQUM7SUFDcEQsSUFBSSxNQUFNLEVBQUU7UUFBRSxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0tBQUU7SUFFeEUsSUFBSTtRQUNGLE1BQU0sSUFBSSxHQUFHLFdBQVcsS0FBSyxRQUFRO1lBQ25DLENBQUMsQ0FBQyxNQUFNLG1CQUFLLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQztZQUM5QixDQUFDLENBQUMsTUFBTSxzQkFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDakQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25CO0lBQUMsT0FBTyxHQUFRLEVBQUU7UUFDakIsU0FBUyxDQUFDLElBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxPQUFPLEtBQUksaUJBQWlCLENBQUMsQ0FBQztLQUM5QztZQUFTO1FBQ1IsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN4QixNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7U0FDOUU7S0FDRjtBQUNILENBQUM7QUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFOztJQUMvQyxPQUFDLENBQUMsWUFBWSxDQUFDLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNwRSxPQUFDLENBQUMsWUFBWSxDQUFDLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNwRSxPQUFDLENBQUMsWUFBWSxDQUFDLDBDQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsT0FBQyxDQUFDLGFBQWEsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekQsT0FBQyxDQUFDLHFCQUFxQixDQUFDLDBDQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUdqRSxJQUFJLDZCQUFlLEVBQUUsRUFBRTtRQUNyQixNQUFNLENBQUMsR0FBRywyQkFBYSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDO1lBQUUsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3REO0FBQ0gsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9waXZvdHRmdC8uL3NyYy9jb25zdHMudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvc2VydmljZXMvQXV0aFNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvbG9naW4vbG9naW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUGl2b3RURlQg4oCUIFRGVCBHYW1lIEV2ZW50cyBGZWF0dXJlc1xyXG4vLyBHYW1lIElEIDU0MjYgPSBMZWFndWUgb2YgTGVnZW5kcyBjbGllbnQgKHdoaWNoIFRGVCBydW5zIGluc2lkZSlcclxuLy8gVEZULXNwZWNpZmljIGV2ZW50cyB1c2UgaW50ZXJuYWwgR2FtZSBJRCAyMTU3MCwgYnV0IHdlIHJlZ2lzdGVyIHdpdGggNTQyNlxyXG5leHBvcnQgY29uc3Qga0dhbWVzRmVhdHVyZXMgPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nW10+KFtcclxuICBbXHJcbiAgICA1NDI2LFxyXG4gICAgW1xyXG4gICAgICAnbWF0Y2hfaW5mbycsXHJcbiAgICAgICdib2FyZCcsXHJcbiAgICAgICdiZW5jaCcsXHJcbiAgICAgICdzdG9yZScsXHJcbiAgICAgICdjYXJvdXNlbCcsXHJcbiAgICAgICdnYW1lX2luZm8nLFxyXG4gICAgICAnYXVnbWVudHMnLFxyXG4gICAgICAnbGl2ZV9jbGllbnRfZGF0YSdcclxuICAgIF1cclxuICBdLFxyXG5dKTtcclxuXHJcbmV4cG9ydCBjb25zdCBrR2FtZUNsYXNzSWRzID0gQXJyYXkuZnJvbShrR2FtZXNGZWF0dXJlcy5rZXlzKCkpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGtXaW5kb3dOYW1lcyA9IHtcclxuICBpbkdhbWU6ICdpbl9nYW1lJyxcclxuICBkZXNrdG9wOiAnZGVza3RvcCcsXHJcbiAgc2V0dGluZ3M6ICdzZXR0aW5ncycsXHJcbiAgaW5nYW1lQ29udHJvbGxlcjogJ2luZ2FtZV9jb250cm9sbGVyJyxcclxuICBtYXRjaHVwczogJ21hdGNodXBzJyxcclxuICBsb2dpbjogJ2xvZ2luJyxcclxuICBhZG1pbjogJ2FkbWluJyxcclxuICBoZWFkbGluZXI6ICdoZWFkbGluZXInLFxyXG4gIHJlcGxheTogJ3JlcGxheScsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qga0hvdGtleXMgPSB7XHJcbiAgdG9nZ2xlOiAncGl2b3R0ZnRfc2hvd2hpZGUnXHJcbn07XHJcblxyXG4vLyBURlQgR2FtZSBJRCBmb3IgZXZlbnQgcmVnaXN0cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrVEZUQ2xhc3NJZCA9IDU0MjY7XHJcblxyXG4vLyBSaW90IEFQSSBDb25maWd1cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrUmlvdEFwaUNvbmZpZyA9IHtcclxuICBhcGlLZXk6ICcnLFxyXG4gIHJlZ2lvbjogJ2V1cm9wZScgYXMgY29uc3QsICAgICAgIC8vIGFtZXJpY2FzIHwgZXVyb3BlIHwgYXNpYSAoYWNjb3VudC12MSwgbWF0Y2gtdjEpXHJcbiAgcGxhdGZvcm06ICdldW4xJywgICAgICAgICAgICAgICAgLy8gZXV3MSwgZXVuMSwgbmExLCBrciwgLi4uIChzdW1tb25lci9sZWFndWUpXHJcbn07XHJcblxyXG4vLyBCYWNrZW5kIGJhc2UgVVJMLiBJbiBwcm9kdWN0aW9uIHJvdXRlcyB0aHJvdWdoIENsb3VkZmxhcmUgV29ya2VyIGF0XHJcbi8vIGFwaS5waXZvdHRmdC5jb20gKFJpb3QgQVBJIHByb3h5ICsgYXV0aCArIGNvbXBzIGJhY2tlbmQpLiBPdmVycmlkZSB0b1xyXG4vLyBodHRwOi8vMTI3LjAuMC4xOjg3ODcgZHVyaW5nIGxvY2FsIGB3cmFuZ2xlciBkZXZgIGRldmVsb3BtZW50LlxyXG5leHBvcnQgY29uc3Qga1Jpb3RBcGlCYXNlVXJsID0gJ2h0dHBzOi8vYXBpLnBpdm90dGZ0LmNvbSc7XHJcblxyXG4vLyBDdXJyZW50IFRGVCBpbi1zZXQgcGF0Y2ggKyBzZXQgbnVtYmVyLiBCdW1wIHRoZXNlIHRvZ2V0aGVyIHdpdGggdGhlXHJcbi8vIGBQQVRDSEVTYCBhcnJheXMgaW4gTGl2ZU1ldGFSZW5kZXJlci50cyArIFRyZW5kc1JlbmRlcmVyLnRzIGV2ZXJ5IHRpbWVcclxuLy8gYSBuZXcgVEZUIHBhdGNoIHNoaXBzLiBVc2VkIGJ5IFNuYXBzaG90VXBsb2FkZXIgc28gdXBsb2FkZWQgc25hcHNob3RzXHJcbi8vIGxhbmQgaW4gdGhlIHJpZ2h0IHNsaWNlIHdpdGhvdXQgZGVwZW5kaW5nIG9uIFJpb3QncyBgZ2FtZV92ZXJzaW9uYFxyXG4vLyBzdHJpbmcgcGFyc2luZy5cclxuZXhwb3J0IGNvbnN0IGtDdXJyZW50VGZ0UGF0Y2ggPSAnMTcuMyc7XHJcbmV4cG9ydCBjb25zdCBrQ3VycmVudFRmdFNldE51bWJlciA9IDE3O1xyXG5cclxuXHJcbi8vIFBsYXRmb3JtIOKGkiByZWdpb25hbCByb3V0aW5nIG1hcCAoZm9yIGFjY291bnQvbWF0Y2ggZW5kcG9pbnRzKVxyXG5leHBvcnQgY29uc3Qga1BsYXRmb3JtVG9SZWdpb246IFJlY29yZDxzdHJpbmcsICdhbWVyaWNhcycgfCAnZXVyb3BlJyB8ICdhc2lhJz4gPSB7XHJcbiAgJ2V1dzEnOiAnZXVyb3BlJywgJ2V1bjEnOiAnZXVyb3BlJywgJ3RyMSc6ICdldXJvcGUnLCAncnUnOiAnZXVyb3BlJyxcclxuICAnbmExJzogJ2FtZXJpY2FzJywgJ2JyMSc6ICdhbWVyaWNhcycsICdsYTEnOiAnYW1lcmljYXMnLCAnbGEyJzogJ2FtZXJpY2FzJyxcclxuICAna3InOiAnYXNpYScsICdqcDEnOiAnYXNpYScsICdvYzEnOiAnYXNpYScsICdwaDInOiAnYXNpYScsXHJcbiAgJ3NnMic6ICdhc2lhJywgJ3RoMic6ICdhc2lhJywgJ3R3Mic6ICdhc2lhJywgJ3ZuMic6ICdhc2lhJyxcclxufTtcclxuIiwiLy8gQXV0aFNlcnZpY2Ug4oCUIHRoaW4gY2xpZW50IGZvciB0aGUgQ2xvdWRmbGFyZSBXb3JrZXIgL2F1dGggZW5kcG9pbnRzLlxuLy9cbi8vIFRva2VuIGlzIGtlcHQgaW4gbG9jYWxTdG9yYWdlLiBDb21wb25lbnRzIHRoYXQgY2FyZSBhYm91dCBsb2dpbiBzdGF0ZSBjYW5cbi8vIGVpdGhlciBjYWxsIGdldEN1cnJlbnRVc2VyKCkgb25jZSBvbiBtb3VudCwgb3Igc3Vic2NyaWJlIHZpYSBvbkNoYW5nZSgpLlxuXG5pbXBvcnQgeyBrUmlvdEFwaUJhc2VVcmwgfSBmcm9tICcuLi9jb25zdHMnO1xuXG5leHBvcnQgdHlwZSBVc2VyUm9sZSA9ICd1c2VyJyB8ICdtb2RlcmF0b3InIHwgJ2FkbWluJztcblxuZXhwb3J0IGludGVyZmFjZSBVc2VyIHtcbiAgaWQ6IG51bWJlcjtcbiAgZW1haWw6IHN0cmluZztcbiAgcm9sZTogVXNlclJvbGU7XG4gIGRpc3BsYXlOYW1lOiBzdHJpbmcgfCBudWxsO1xufVxuXG5pbnRlcmZhY2UgQXV0aFJlc3BvbnNlIHtcbiAgdG9rZW46IHN0cmluZztcbiAgdXNlcjogVXNlcjtcbn1cblxuY29uc3QgU1RPUkFHRV9UT0tFTiA9ICdwaXZvdHRmdF9hdXRoX3Rva2VuJztcbmNvbnN0IFNUT1JBR0VfVVNFUiA9ICdwaXZvdHRmdF9hdXRoX3VzZXInO1xuXG50eXBlIExpc3RlbmVyID0gKHVzZXI6IFVzZXIgfCBudWxsKSA9PiB2b2lkO1xuY29uc3QgbGlzdGVuZXJzID0gbmV3IFNldDxMaXN0ZW5lcj4oKTtcblxuZnVuY3Rpb24gZW1pdCgpOiB2b2lkIHtcbiAgY29uc3QgdXNlciA9IGdldFN0b3JlZFVzZXIoKTtcbiAgbGlzdGVuZXJzLmZvckVhY2gobCA9PiB7XG4gICAgdHJ5IHsgbCh1c2VyKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKCdbQXV0aFNlcnZpY2VdIGxpc3RlbmVyIHRocmV3OicsIGUpOyB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9rZW4oKTogc3RyaW5nIHwgbnVsbCB7XG4gIHRyeSB7IHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX1RPS0VOKTsgfSBjYXRjaCB7IHJldHVybiBudWxsOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdG9yZWRVc2VyKCk6IFVzZXIgfCBudWxsIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX1VTRVIpO1xuICAgIHJldHVybiByYXcgPyBKU09OLnBhcnNlKHJhdykgYXMgVXNlciA6IG51bGw7XG4gIH0gY2F0Y2ggeyByZXR1cm4gbnVsbDsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gISFnZXRUb2tlbigpICYmICEhZ2V0U3RvcmVkVXNlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBZG1pbigpOiBib29sZWFuIHtcbiAgY29uc3QgdSA9IGdldFN0b3JlZFVzZXIoKTtcbiAgcmV0dXJuICEhdSAmJiB1LnJvbGUgPT09ICdhZG1pbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNBdExlYXN0KHJvbGU6IFVzZXJSb2xlKTogYm9vbGVhbiB7XG4gIGNvbnN0IHUgPSBnZXRTdG9yZWRVc2VyKCk7XG4gIGlmICghdSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCByYW5rOiBSZWNvcmQ8VXNlclJvbGUsIG51bWJlcj4gPSB7IHVzZXI6IDEsIG1vZGVyYXRvcjogMiwgYWRtaW46IDMgfTtcbiAgcmV0dXJuIHJhbmtbdS5yb2xlXSA+PSByYW5rW3JvbGVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25DaGFuZ2UobGlzdGVuZXI6IExpc3RlbmVyKTogKCkgPT4gdm9pZCB7XG4gIGxpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xuICByZXR1cm4gKCkgPT4gbGlzdGVuZXJzLmRlbGV0ZShsaXN0ZW5lcik7XG59XG5cbmZ1bmN0aW9uIHNldFNlc3Npb24ocmVzOiBBdXRoUmVzcG9uc2UpOiB2b2lkIHtcbiAgdHJ5IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX1RPS0VOLCByZXMudG9rZW4pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfVVNFUiwgSlNPTi5zdHJpbmdpZnkocmVzLnVzZXIpKTtcbiAgfSBjYXRjaCB7IC8qIHF1b3RhIGV0YyDigJQgc2lsZW50ICovIH1cbiAgZW1pdCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTZXNzaW9uKCk6IHZvaWQge1xuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFNUT1JBR0VfVE9LRU4pO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFNUT1JBR0VfVVNFUik7XG4gIH0gY2F0Y2ggeyAvKiBpZ25vcmUgKi8gfVxuICBlbWl0KCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHBvc3RKc29uPFQ+KHBhdGg6IHN0cmluZywgYm9keTogdW5rbm93bik6IFByb21pc2U8VD4ge1xuICBjb25zdCB1cmwgPSBgJHtrUmlvdEFwaUJhc2VVcmx9JHtwYXRofWA7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpLFxuICB9KTtcbiAgbGV0IHBheWxvYWQ6IGFueTtcbiAgdHJ5IHsgcGF5bG9hZCA9IGF3YWl0IHJlcy5qc29uKCk7IH0gY2F0Y2ggeyBwYXlsb2FkID0geyBlcnJvcjogcmVzLnN0YXR1c1RleHQgfTsgfVxuICBpZiAoIXJlcy5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkPy5lcnJvciB8fCBgSFRUUCAke3Jlcy5zdGF0dXN9YCk7XG4gIH1cbiAgcmV0dXJuIHBheWxvYWQgYXMgVDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0SnNvbjxUPihwYXRoOiBzdHJpbmcsIHRva2VuPzogc3RyaW5nIHwgbnVsbCk6IFByb21pc2U8VD4ge1xuICBjb25zdCB1cmwgPSBgJHtrUmlvdEFwaUJhc2VVcmx9JHtwYXRofWA7XG4gIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgaWYgKHRva2VuKSBoZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBgQmVhcmVyICR7dG9rZW59YDtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7IGhlYWRlcnMgfSk7XG4gIGxldCBwYXlsb2FkOiBhbnk7XG4gIHRyeSB7IHBheWxvYWQgPSBhd2FpdCByZXMuanNvbigpOyB9IGNhdGNoIHsgcGF5bG9hZCA9IHsgZXJyb3I6IHJlcy5zdGF0dXNUZXh0IH07IH1cbiAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcihwYXlsb2FkPy5lcnJvciB8fCBgSFRUUCAke3Jlcy5zdGF0dXN9YCk7XG4gIHJldHVybiBwYXlsb2FkIGFzIFQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWdpc3RlcihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBkaXNwbGF5TmFtZT86IHN0cmluZyk6IFByb21pc2U8VXNlcj4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBwb3N0SnNvbjxBdXRoUmVzcG9uc2U+KCcvYXV0aC9yZWdpc3RlcicsIHsgZW1haWwsIHBhc3N3b3JkLCBkaXNwbGF5TmFtZSB9KTtcbiAgc2V0U2Vzc2lvbihyZXMpO1xuICByZXR1cm4gcmVzLnVzZXI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpbihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxVc2VyPiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHBvc3RKc29uPEF1dGhSZXNwb25zZT4oJy9hdXRoL2xvZ2luJywgeyBlbWFpbCwgcGFzc3dvcmQgfSk7XG4gIHNldFNlc3Npb24ocmVzKTtcbiAgcmV0dXJuIHJlcy51c2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9nb3V0KCk6IHZvaWQge1xuICBjbGVhclNlc3Npb24oKTtcbn1cblxuLyoqXG4gKiBSZWZyZXNoIHVzZXIgaW5mbyBmcm9tIGJhY2tlbmQuIFVzZWZ1bCBhZnRlciByb2xlIGNoYW5nZXMgb3IgdG8gY29uZmlybVxuICogdG9rZW4gdmFsaWRpdHkuIENsZWFycyBzZXNzaW9uIG9uIDQwMS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hNZSgpOiBQcm9taXNlPFVzZXIgfCBudWxsPiB7XG4gIGNvbnN0IHRva2VuID0gZ2V0VG9rZW4oKTtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0SnNvbjx7IHVzZXI6IFVzZXIgfT4oJy9hdXRoL21lJywgdG9rZW4pO1xuICAgIHRyeSB7IGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfVVNFUiwgSlNPTi5zdHJpbmdpZnkocmVzLnVzZXIpKTsgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XG4gICAgZW1pdCgpO1xuICAgIHJldHVybiByZXMudXNlcjtcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgaWYgKChlLm1lc3NhZ2UgfHwgJycpLmluY2x1ZGVzKCdIVFRQIDQwMScpKSBjbGVhclNlc3Npb24oKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBmb3IgYWRtaW4tb25seSBmZXRjaGVzIOKAlCBhdXRvbWF0aWNhbGx5IGF0dGFjaGVzIEJlYXJlciB0b2tlbi5cbiAqIFRocm93cyBpZiBub3QgbG9nZ2VkIGluLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRtaW5GZXRjaDxUPihwYXRoOiBzdHJpbmcsIGluaXQ6IFJlcXVlc3RJbml0ID0ge30pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3QgdG9rZW4gPSBnZXRUb2tlbigpO1xuICBpZiAoIXRva2VuKSB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhdXRoZW50aWNhdGVkJyk7XG4gIGNvbnN0IHVybCA9IGAke2tSaW90QXBpQmFzZVVybH0ke3BhdGh9YDtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgLi4uaW5pdCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAuLi4oaW5pdC5oZWFkZXJzIHx8IHt9KSxcbiAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAuLi4oaW5pdC5ib2R5ID8geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0gOiB7fSksXG4gICAgfSxcbiAgfSk7XG4gIGxldCBwYXlsb2FkOiBhbnk7XG4gIHRyeSB7IHBheWxvYWQgPSBhd2FpdCByZXMuanNvbigpOyB9IGNhdGNoIHsgcGF5bG9hZCA9IHsgZXJyb3I6IHJlcy5zdGF0dXNUZXh0IH07IH1cbiAgaWYgKCFyZXMub2spIHtcbiAgICBpZiAocmVzLnN0YXR1cyA9PT0gNDAxKSBjbGVhclNlc3Npb24oKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IocGF5bG9hZD8uZXJyb3IgfHwgYEhUVFAgJHtyZXMuc3RhdHVzfWApO1xuICB9XG4gIHJldHVybiBwYXlsb2FkIGFzIFQ7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gTG9naW4gLyBSZWdpc3RlciB3aW5kb3cg4oCUIHN3aXRjaGVzIGJldHdlZW4gdHdvIG1vZGVzIHZpYSB0YWJzLlxuXG5pbXBvcnQgeyBsb2dpbiwgcmVnaXN0ZXIsIGlzQXV0aGVudGljYXRlZCwgZ2V0U3RvcmVkVXNlciB9IGZyb20gJy4uL3NlcnZpY2VzL0F1dGhTZXJ2aWNlJztcblxudHlwZSBNb2RlID0gJ3NpZ25pbicgfCAnc2lnbnVwJztcbmxldCBjdXJyZW50TW9kZTogTW9kZSA9ICdzaWduaW4nO1xuXG5mdW5jdGlvbiAkPFQgZXh0ZW5kcyBIVE1MRWxlbWVudD4oaWQ6IHN0cmluZyk6IFQgfCBudWxsIHtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSBhcyBUIHwgbnVsbDtcbn1cblxuZnVuY3Rpb24gc2V0TW9kZShtb2RlOiBNb2RlKTogdm9pZCB7XG4gIGN1cnJlbnRNb2RlID0gbW9kZTtcbiAgJCgndGFiLXNpZ25pbicpPy5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBtb2RlID09PSAnc2lnbmluJyk7XG4gICQoJ3RhYi1zaWdudXAnKT8uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgbW9kZSA9PT0gJ3NpZ251cCcpO1xuICBjb25zdCBuYW1lV3JhcCA9ICQoJ2xvZ2luLW5hbWUtd3JhcCcpO1xuICBpZiAobmFtZVdyYXApIG5hbWVXcmFwLnN0eWxlLmRpc3BsYXkgPSBtb2RlID09PSAnc2lnbnVwJyA/ICdmbGV4JyA6ICdub25lJztcbiAgY29uc3Qgc3VibWl0ID0gJDxIVE1MQnV0dG9uRWxlbWVudD4oJ2xvZ2luLXN1Ym1pdCcpO1xuICBpZiAoc3VibWl0KSBzdWJtaXQudGV4dENvbnRlbnQgPSBtb2RlID09PSAnc2lnbmluJyA/ICdTaWduIGluJyA6ICdDcmVhdGUgYWNjb3VudCc7XG4gIGNvbnN0IHB3ZCA9ICQ8SFRNTElucHV0RWxlbWVudD4oJ2xvZ2luLXBhc3N3b3JkJyk7XG4gIGlmIChwd2QpIHB3ZC5hdXRvY29tcGxldGUgPSBtb2RlID09PSAnc2lnbmluJyA/ICdjdXJyZW50LXBhc3N3b3JkJyA6ICduZXctcGFzc3dvcmQnO1xuICBjbGVhckVycm9yKCk7XG59XG5cbmZ1bmN0aW9uIHNob3dFcnJvcihtc2c6IHN0cmluZyk6IHZvaWQge1xuICBjb25zdCBlbCA9ICQoJ2xvZ2luLWVycm9yJyk7XG4gIGlmICghZWwpIHJldHVybjtcbiAgZWwudGV4dENvbnRlbnQgPSBtc2c7XG4gIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufVxuXG5mdW5jdGlvbiBjbGVhckVycm9yKCk6IHZvaWQge1xuICBjb25zdCBlbCA9ICQoJ2xvZ2luLWVycm9yJyk7XG4gIGlmICghZWwpIHJldHVybjtcbiAgZWwudGV4dENvbnRlbnQgPSAnJztcbiAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuZnVuY3Rpb24gc2hvd1N1Y2Nlc3ModXNlcjogeyBlbWFpbDogc3RyaW5nOyByb2xlOiBzdHJpbmcgfSk6IHZvaWQge1xuICAkKCdsb2dpbi1mb3JtJykhLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICQoJ2xvZ2luLWludHJvJykhLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGNvbnN0IHdyYXAgPSAkKCdsb2dpbi1zdWNjZXNzJyk7XG4gIGlmICh3cmFwKSB3cmFwLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gIGNvbnN0IHRleHQgPSAkKCdsb2dpbi1zdWNjZXNzLXRleHQnKTtcbiAgaWYgKHRleHQpIHtcbiAgICB0ZXh0LmlubmVySFRNTCA9IGBTaWduZWQgaW4gYXMgPHN0cm9uZz4ke2VzY2FwZUh0bWwodXNlci5lbWFpbCl9PC9zdHJvbmc+ICgke3VzZXIucm9sZX0pLjxicj5Zb3UgY2FuIGNsb3NlIHRoaXMgd2luZG93LmA7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXNjYXBlSHRtbChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcy5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7JykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xufVxuXG5mdW5jdGlvbiBjbG9zZVdpbmRvdygpOiB2b2lkIHtcbiAgb3ZlcndvbGYud2luZG93cy5nZXRDdXJyZW50V2luZG93KHJlcyA9PiB7XG4gICAgaWYgKHJlcz8uc3VjY2VzcyAmJiByZXMud2luZG93Py5pZCkgb3ZlcndvbGYud2luZG93cy5jbG9zZShyZXMud2luZG93LmlkKTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChlOiBFdmVudCk6IFByb21pc2U8dm9pZD4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNsZWFyRXJyb3IoKTtcbiAgY29uc3QgZW1haWwgPSAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdsb2dpbi1lbWFpbCcpPy52YWx1ZS50cmltKCkgfHwgJyc7XG4gIGNvbnN0IHBhc3N3b3JkID0gJDxIVE1MSW5wdXRFbGVtZW50PignbG9naW4tcGFzc3dvcmQnKT8udmFsdWUgfHwgJyc7XG4gIGNvbnN0IGRpc3BsYXlOYW1lID0gJDxIVE1MSW5wdXRFbGVtZW50PignbG9naW4tbmFtZScpPy52YWx1ZS50cmltKCkgfHwgdW5kZWZpbmVkO1xuICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCkge1xuICAgIHNob3dFcnJvcignRW1haWwgYW5kIHBhc3N3b3JkIGFyZSByZXF1aXJlZC4nKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzdWJtaXQgPSAkPEhUTUxCdXR0b25FbGVtZW50PignbG9naW4tc3VibWl0Jyk7XG4gIGlmIChzdWJtaXQpIHsgc3VibWl0LmRpc2FibGVkID0gdHJ1ZTsgc3VibWl0LnRleHRDb250ZW50ID0gJ1dvcmtpbmfigKYnOyB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VyID0gY3VycmVudE1vZGUgPT09ICdzaWduaW4nXG4gICAgICA/IGF3YWl0IGxvZ2luKGVtYWlsLCBwYXNzd29yZClcbiAgICAgIDogYXdhaXQgcmVnaXN0ZXIoZW1haWwsIHBhc3N3b3JkLCBkaXNwbGF5TmFtZSk7XG4gICAgc2hvd1N1Y2Nlc3ModXNlcik7XG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgc2hvd0Vycm9yKGVycj8ubWVzc2FnZSB8fCAnU2lnbi1pbiBmYWlsZWQuJyk7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKHN1Ym1pdCkge1xuICAgICAgc3VibWl0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICBzdWJtaXQudGV4dENvbnRlbnQgPSBjdXJyZW50TW9kZSA9PT0gJ3NpZ25pbicgPyAnU2lnbiBpbicgOiAnQ3JlYXRlIGFjY291bnQnO1xuICAgIH1cbiAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgJCgndGFiLXNpZ25pbicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNldE1vZGUoJ3NpZ25pbicpKTtcbiAgJCgndGFiLXNpZ251cCcpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNldE1vZGUoJ3NpZ251cCcpKTtcbiAgJCgnbG9naW4tZm9ybScpPy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4geyBoYW5kbGVTdWJtaXQoZSk7IH0pO1xuICAkKCdsb2dpbi1jbG9zZScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlV2luZG93KTtcbiAgJCgnbG9naW4tc3VjY2Vzcy1jbG9zZScpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlV2luZG93KTtcblxuICAvLyBJZiB1c2VyIGlzIGFscmVhZHkgc2lnbmVkIGluIHdoZW4gd2luZG93IG9wZW5zLCBqdW1wIHN0cmFpZ2h0IHRvIHN1Y2Nlc3MuXG4gIGlmIChpc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgIGNvbnN0IHUgPSBnZXRTdG9yZWRVc2VyKCk7XG4gICAgaWYgKHUpIHNob3dTdWNjZXNzKHsgZW1haWw6IHUuZW1haWwsIHJvbGU6IHUucm9sZSB9KTtcbiAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=