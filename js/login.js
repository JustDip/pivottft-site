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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUssUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO1NBQzlFO0tBQ0Y7QUFDSCxDQUFDO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTs7SUFDL0MsT0FBQyxDQUFDLFlBQVksQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDcEUsT0FBQyxDQUFDLFlBQVksQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDcEUsT0FBQyxDQUFDLFlBQVksQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLE9BQUMsQ0FBQyxhQUFhLENBQUMsMENBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3pELE9BQUMsQ0FBQyxxQkFBcUIsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFHakUsSUFBSSw2QkFBZSxFQUFFLEVBQUU7UUFDckIsTUFBTSxDQUFDLEdBQUcsMkJBQWEsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQztZQUFFLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN0RDtBQUNILENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGl2b3R0ZnQvLi9zcmMvY29uc3RzLnRzIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL3NlcnZpY2VzL0F1dGhTZXJ2aWNlLnRzIiwid2VicGFjazovL3Bpdm90dGZ0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bpdm90dGZ0Ly4vc3JjL2xvZ2luL2xvZ2luLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFBpdm90VEZUIOKAlCBURlQgR2FtZSBFdmVudHMgRmVhdHVyZXNcclxuLy8gR2FtZSBJRCA1NDI2ID0gTGVhZ3VlIG9mIExlZ2VuZHMgY2xpZW50ICh3aGljaCBURlQgcnVucyBpbnNpZGUpXHJcbi8vIFRGVC1zcGVjaWZpYyBldmVudHMgdXNlIGludGVybmFsIEdhbWUgSUQgMjE1NzAsIGJ1dCB3ZSByZWdpc3RlciB3aXRoIDU0MjZcclxuZXhwb3J0IGNvbnN0IGtHYW1lc0ZlYXR1cmVzID0gbmV3IE1hcDxudW1iZXIsIHN0cmluZ1tdPihbXHJcbiAgW1xyXG4gICAgNTQyNixcclxuICAgIFtcclxuICAgICAgJ21hdGNoX2luZm8nLFxyXG4gICAgICAnYm9hcmQnLFxyXG4gICAgICAnYmVuY2gnLFxyXG4gICAgICAnc3RvcmUnLFxyXG4gICAgICAnY2Fyb3VzZWwnLFxyXG4gICAgICAnZ2FtZV9pbmZvJyxcclxuICAgICAgJ2F1Z21lbnRzJyxcclxuICAgICAgJ2xpdmVfY2xpZW50X2RhdGEnXHJcbiAgICBdXHJcbiAgXSxcclxuXSk7XHJcblxyXG5leHBvcnQgY29uc3Qga0dhbWVDbGFzc0lkcyA9IEFycmF5LmZyb20oa0dhbWVzRmVhdHVyZXMua2V5cygpKTtcclxuXHJcbmV4cG9ydCBjb25zdCBrV2luZG93TmFtZXMgPSB7XHJcbiAgaW5HYW1lOiAnaW5fZ2FtZScsXHJcbiAgZGVza3RvcDogJ2Rlc2t0b3AnLFxyXG4gIHNldHRpbmdzOiAnc2V0dGluZ3MnLFxyXG4gIGluZ2FtZUNvbnRyb2xsZXI6ICdpbmdhbWVfY29udHJvbGxlcicsXHJcbiAgbWF0Y2h1cHM6ICdtYXRjaHVwcycsXHJcbiAgbG9naW46ICdsb2dpbicsXHJcbiAgYWRtaW46ICdhZG1pbicsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qga0hvdGtleXMgPSB7XHJcbiAgdG9nZ2xlOiAncGl2b3R0ZnRfc2hvd2hpZGUnXHJcbn07XHJcblxyXG4vLyBURlQgR2FtZSBJRCBmb3IgZXZlbnQgcmVnaXN0cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrVEZUQ2xhc3NJZCA9IDU0MjY7XHJcblxyXG4vLyBSaW90IEFQSSBDb25maWd1cmF0aW9uXHJcbmV4cG9ydCBjb25zdCBrUmlvdEFwaUNvbmZpZyA9IHtcclxuICBhcGlLZXk6ICcnLFxyXG4gIHJlZ2lvbjogJ2V1cm9wZScgYXMgY29uc3QsICAgICAgIC8vIGFtZXJpY2FzIHwgZXVyb3BlIHwgYXNpYSAoYWNjb3VudC12MSwgbWF0Y2gtdjEpXHJcbiAgcGxhdGZvcm06ICdldW4xJywgICAgICAgICAgICAgICAgLy8gZXV3MSwgZXVuMSwgbmExLCBrciwgLi4uIChzdW1tb25lci9sZWFndWUpXHJcbn07XHJcblxyXG4vLyBCYWNrZW5kIGJhc2UgVVJMLiBJbiBwcm9kdWN0aW9uIHJvdXRlcyB0aHJvdWdoIENsb3VkZmxhcmUgV29ya2VyIGF0XHJcbi8vIGFwaS5waXZvdHRmdC5jb20gKFJpb3QgQVBJIHByb3h5ICsgYXV0aCArIGNvbXBzIGJhY2tlbmQpLiBPdmVycmlkZSB0b1xyXG4vLyBodHRwOi8vMTI3LjAuMC4xOjg3ODcgZHVyaW5nIGxvY2FsIGB3cmFuZ2xlciBkZXZgIGRldmVsb3BtZW50LlxyXG5leHBvcnQgY29uc3Qga1Jpb3RBcGlCYXNlVXJsID0gJ2h0dHBzOi8vYXBpLnBpdm90dGZ0LmNvbSc7XHJcblxyXG5cclxuLy8gUGxhdGZvcm0g4oaSIHJlZ2lvbmFsIHJvdXRpbmcgbWFwIChmb3IgYWNjb3VudC9tYXRjaCBlbmRwb2ludHMpXHJcbmV4cG9ydCBjb25zdCBrUGxhdGZvcm1Ub1JlZ2lvbjogUmVjb3JkPHN0cmluZywgJ2FtZXJpY2FzJyB8ICdldXJvcGUnIHwgJ2FzaWEnPiA9IHtcclxuICAnZXV3MSc6ICdldXJvcGUnLCAnZXVuMSc6ICdldXJvcGUnLCAndHIxJzogJ2V1cm9wZScsICdydSc6ICdldXJvcGUnLFxyXG4gICduYTEnOiAnYW1lcmljYXMnLCAnYnIxJzogJ2FtZXJpY2FzJywgJ2xhMSc6ICdhbWVyaWNhcycsICdsYTInOiAnYW1lcmljYXMnLFxyXG4gICdrcic6ICdhc2lhJywgJ2pwMSc6ICdhc2lhJywgJ29jMSc6ICdhc2lhJywgJ3BoMic6ICdhc2lhJyxcclxuICAnc2cyJzogJ2FzaWEnLCAndGgyJzogJ2FzaWEnLCAndHcyJzogJ2FzaWEnLCAndm4yJzogJ2FzaWEnLFxyXG59O1xyXG4iLCIvLyBBdXRoU2VydmljZSDigJQgdGhpbiBjbGllbnQgZm9yIHRoZSBDbG91ZGZsYXJlIFdvcmtlciAvYXV0aCBlbmRwb2ludHMuXG4vL1xuLy8gVG9rZW4gaXMga2VwdCBpbiBsb2NhbFN0b3JhZ2UuIENvbXBvbmVudHMgdGhhdCBjYXJlIGFib3V0IGxvZ2luIHN0YXRlIGNhblxuLy8gZWl0aGVyIGNhbGwgZ2V0Q3VycmVudFVzZXIoKSBvbmNlIG9uIG1vdW50LCBvciBzdWJzY3JpYmUgdmlhIG9uQ2hhbmdlKCkuXG5cbmltcG9ydCB7IGtSaW90QXBpQmFzZVVybCB9IGZyb20gJy4uL2NvbnN0cyc7XG5cbmV4cG9ydCB0eXBlIFVzZXJSb2xlID0gJ3VzZXInIHwgJ21vZGVyYXRvcicgfCAnYWRtaW4nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXIge1xuICBpZDogbnVtYmVyO1xuICBlbWFpbDogc3RyaW5nO1xuICByb2xlOiBVc2VyUm9sZTtcbiAgZGlzcGxheU5hbWU6IHN0cmluZyB8IG51bGw7XG59XG5cbmludGVyZmFjZSBBdXRoUmVzcG9uc2Uge1xuICB0b2tlbjogc3RyaW5nO1xuICB1c2VyOiBVc2VyO1xufVxuXG5jb25zdCBTVE9SQUdFX1RPS0VOID0gJ3Bpdm90dGZ0X2F1dGhfdG9rZW4nO1xuY29uc3QgU1RPUkFHRV9VU0VSID0gJ3Bpdm90dGZ0X2F1dGhfdXNlcic7XG5cbnR5cGUgTGlzdGVuZXIgPSAodXNlcjogVXNlciB8IG51bGwpID0+IHZvaWQ7XG5jb25zdCBsaXN0ZW5lcnMgPSBuZXcgU2V0PExpc3RlbmVyPigpO1xuXG5mdW5jdGlvbiBlbWl0KCk6IHZvaWQge1xuICBjb25zdCB1c2VyID0gZ2V0U3RvcmVkVXNlcigpO1xuICBsaXN0ZW5lcnMuZm9yRWFjaChsID0+IHtcbiAgICB0cnkgeyBsKHVzZXIpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoJ1tBdXRoU2VydmljZV0gbGlzdGVuZXIgdGhyZXc6JywgZSk7IH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb2tlbigpOiBzdHJpbmcgfCBudWxsIHtcbiAgdHJ5IHsgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfVE9LRU4pOyB9IGNhdGNoIHsgcmV0dXJuIG51bGw7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0b3JlZFVzZXIoKTogVXNlciB8IG51bGwge1xuICB0cnkge1xuICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfVVNFUik7XG4gICAgcmV0dXJuIHJhdyA/IEpTT04ucGFyc2UocmF3KSBhcyBVc2VyIDogbnVsbDtcbiAgfSBjYXRjaCB7IHJldHVybiBudWxsOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0F1dGhlbnRpY2F0ZWQoKTogYm9vbGVhbiB7XG4gIHJldHVybiAhIWdldFRva2VuKCkgJiYgISFnZXRTdG9yZWRVc2VyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FkbWluKCk6IGJvb2xlYW4ge1xuICBjb25zdCB1ID0gZ2V0U3RvcmVkVXNlcigpO1xuICByZXR1cm4gISF1ICYmIHUucm9sZSA9PT0gJ2FkbWluJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0F0TGVhc3Qocm9sZTogVXNlclJvbGUpOiBib29sZWFuIHtcbiAgY29uc3QgdSA9IGdldFN0b3JlZFVzZXIoKTtcbiAgaWYgKCF1KSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHJhbms6IFJlY29yZDxVc2VyUm9sZSwgbnVtYmVyPiA9IHsgdXNlcjogMSwgbW9kZXJhdG9yOiAyLCBhZG1pbjogMyB9O1xuICByZXR1cm4gcmFua1t1LnJvbGVdID49IHJhbmtbcm9sZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkNoYW5nZShsaXN0ZW5lcjogTGlzdGVuZXIpOiAoKSA9PiB2b2lkIHtcbiAgbGlzdGVuZXJzLmFkZChsaXN0ZW5lcik7XG4gIHJldHVybiAoKSA9PiBsaXN0ZW5lcnMuZGVsZXRlKGxpc3RlbmVyKTtcbn1cblxuZnVuY3Rpb24gc2V0U2Vzc2lvbihyZXM6IEF1dGhSZXNwb25zZSk6IHZvaWQge1xuICB0cnkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfVE9LRU4sIHJlcy50b2tlbik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9VU0VSLCBKU09OLnN0cmluZ2lmeShyZXMudXNlcikpO1xuICB9IGNhdGNoIHsgLyogcXVvdGEgZXRjIOKAlCBzaWxlbnQgKi8gfVxuICBlbWl0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlc3Npb24oKTogdm9pZCB7XG4gIHRyeSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9UT0tFTik7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9VU0VSKTtcbiAgfSBjYXRjaCB7IC8qIGlnbm9yZSAqLyB9XG4gIGVtaXQoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcG9zdEpzb248VD4ocGF0aDogc3RyaW5nLCBib2R5OiB1bmtub3duKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHVybCA9IGAke2tSaW90QXBpQmFzZVVybH0ke3BhdGh9YDtcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gIH0pO1xuICBsZXQgcGF5bG9hZDogYW55O1xuICB0cnkgeyBwYXlsb2FkID0gYXdhaXQgcmVzLmpzb24oKTsgfSBjYXRjaCB7IHBheWxvYWQgPSB7IGVycm9yOiByZXMuc3RhdHVzVGV4dCB9OyB9XG4gIGlmICghcmVzLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQ/LmVycm9yIHx8IGBIVFRQICR7cmVzLnN0YXR1c31gKTtcbiAgfVxuICByZXR1cm4gcGF5bG9hZCBhcyBUO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRKc29uPFQ+KHBhdGg6IHN0cmluZywgdG9rZW4/OiBzdHJpbmcgfCBudWxsKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHVybCA9IGAke2tSaW90QXBpQmFzZVVybH0ke3BhdGh9YDtcbiAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICBpZiAodG9rZW4pIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHsgaGVhZGVycyB9KTtcbiAgbGV0IHBheWxvYWQ6IGFueTtcbiAgdHJ5IHsgcGF5bG9hZCA9IGF3YWl0IHJlcy5qc29uKCk7IH0gY2F0Y2ggeyBwYXlsb2FkID0geyBlcnJvcjogcmVzLnN0YXR1c1RleHQgfTsgfVxuICBpZiAoIXJlcy5vaykgdGhyb3cgbmV3IEVycm9yKHBheWxvYWQ/LmVycm9yIHx8IGBIVFRQICR7cmVzLnN0YXR1c31gKTtcbiAgcmV0dXJuIHBheWxvYWQgYXMgVDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGRpc3BsYXlOYW1lPzogc3RyaW5nKTogUHJvbWlzZTxVc2VyPiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHBvc3RKc29uPEF1dGhSZXNwb25zZT4oJy9hdXRoL3JlZ2lzdGVyJywgeyBlbWFpbCwgcGFzc3dvcmQsIGRpc3BsYXlOYW1lIH0pO1xuICBzZXRTZXNzaW9uKHJlcyk7XG4gIHJldHVybiByZXMudXNlcjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ2luKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgcG9zdEpzb248QXV0aFJlc3BvbnNlPignL2F1dGgvbG9naW4nLCB7IGVtYWlsLCBwYXNzd29yZCB9KTtcbiAgc2V0U2Vzc2lvbihyZXMpO1xuICByZXR1cm4gcmVzLnVzZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQoKTogdm9pZCB7XG4gIGNsZWFyU2Vzc2lvbigpO1xufVxuXG4vKipcbiAqIFJlZnJlc2ggdXNlciBpbmZvIGZyb20gYmFja2VuZC4gVXNlZnVsIGFmdGVyIHJvbGUgY2hhbmdlcyBvciB0byBjb25maXJtXG4gKiB0b2tlbiB2YWxpZGl0eS4gQ2xlYXJzIHNlc3Npb24gb24gNDAxLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVmcmVzaE1lKCk6IFByb21pc2U8VXNlciB8IG51bGw+IHtcbiAgY29uc3QgdG9rZW4gPSBnZXRUb2tlbigpO1xuICBpZiAoIXRva2VuKSByZXR1cm4gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBnZXRKc29uPHsgdXNlcjogVXNlciB9PignL2F1dGgvbWUnLCB0b2tlbik7XG4gICAgdHJ5IHsgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9VU0VSLCBKU09OLnN0cmluZ2lmeShyZXMudXNlcikpOyB9IGNhdGNoIHsgLyogaWdub3JlICovIH1cbiAgICBlbWl0KCk7XG4gICAgcmV0dXJuIHJlcy51c2VyO1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICBpZiAoKGUubWVzc2FnZSB8fCAnJykuaW5jbHVkZXMoJ0hUVFAgNDAxJykpIGNsZWFyU2Vzc2lvbigpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogSGVscGVyIGZvciBhZG1pbi1vbmx5IGZldGNoZXMg4oCUIGF1dG9tYXRpY2FsbHkgYXR0YWNoZXMgQmVhcmVyIHRva2VuLlxuICogVGhyb3dzIGlmIG5vdCBsb2dnZWQgaW4uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZG1pbkZldGNoPFQ+KHBhdGg6IHN0cmluZywgaW5pdDogUmVxdWVzdEluaXQgPSB7fSk6IFByb21pc2U8VD4ge1xuICBjb25zdCB0b2tlbiA9IGdldFRva2VuKCk7XG4gIGlmICghdG9rZW4pIHRocm93IG5ldyBFcnJvcignTm90IGF1dGhlbnRpY2F0ZWQnKTtcbiAgY29uc3QgdXJsID0gYCR7a1Jpb3RBcGlCYXNlVXJsfSR7cGF0aH1gO1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAuLi5pbml0LFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIC4uLihpbml0LmhlYWRlcnMgfHwge30pLFxuICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgIC4uLihpbml0LmJvZHkgPyB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSA6IHt9KSxcbiAgICB9LFxuICB9KTtcbiAgbGV0IHBheWxvYWQ6IGFueTtcbiAgdHJ5IHsgcGF5bG9hZCA9IGF3YWl0IHJlcy5qc29uKCk7IH0gY2F0Y2ggeyBwYXlsb2FkID0geyBlcnJvcjogcmVzLnN0YXR1c1RleHQgfTsgfVxuICBpZiAoIXJlcy5vaykge1xuICAgIGlmIChyZXMuc3RhdHVzID09PSA0MDEpIGNsZWFyU2Vzc2lvbigpO1xuICAgIHRocm93IG5ldyBFcnJvcihwYXlsb2FkPy5lcnJvciB8fCBgSFRUUCAke3Jlcy5zdGF0dXN9YCk7XG4gIH1cbiAgcmV0dXJuIHBheWxvYWQgYXMgVDtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBMb2dpbiAvIFJlZ2lzdGVyIHdpbmRvdyDigJQgc3dpdGNoZXMgYmV0d2VlbiB0d28gbW9kZXMgdmlhIHRhYnMuXG5cbmltcG9ydCB7IGxvZ2luLCByZWdpc3RlciwgaXNBdXRoZW50aWNhdGVkLCBnZXRTdG9yZWRVc2VyIH0gZnJvbSAnLi4vc2VydmljZXMvQXV0aFNlcnZpY2UnO1xuXG50eXBlIE1vZGUgPSAnc2lnbmluJyB8ICdzaWdudXAnO1xubGV0IGN1cnJlbnRNb2RlOiBNb2RlID0gJ3NpZ25pbic7XG5cbmZ1bmN0aW9uICQ8VCBleHRlbmRzIEhUTUxFbGVtZW50PihpZDogc3RyaW5nKTogVCB8IG51bGwge1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIGFzIFQgfCBudWxsO1xufVxuXG5mdW5jdGlvbiBzZXRNb2RlKG1vZGU6IE1vZGUpOiB2b2lkIHtcbiAgY3VycmVudE1vZGUgPSBtb2RlO1xuICAkKCd0YWItc2lnbmluJyk/LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScsIG1vZGUgPT09ICdzaWduaW4nKTtcbiAgJCgndGFiLXNpZ251cCcpPy5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBtb2RlID09PSAnc2lnbnVwJyk7XG4gIGNvbnN0IG5hbWVXcmFwID0gJCgnbG9naW4tbmFtZS13cmFwJyk7XG4gIGlmIChuYW1lV3JhcCkgbmFtZVdyYXAuc3R5bGUuZGlzcGxheSA9IG1vZGUgPT09ICdzaWdudXAnID8gJ2ZsZXgnIDogJ25vbmUnO1xuICBjb25zdCBzdWJtaXQgPSAkPEhUTUxCdXR0b25FbGVtZW50PignbG9naW4tc3VibWl0Jyk7XG4gIGlmIChzdWJtaXQpIHN1Ym1pdC50ZXh0Q29udGVudCA9IG1vZGUgPT09ICdzaWduaW4nID8gJ1NpZ24gaW4nIDogJ0NyZWF0ZSBhY2NvdW50JztcbiAgY29uc3QgcHdkID0gJDxIVE1MSW5wdXRFbGVtZW50PignbG9naW4tcGFzc3dvcmQnKTtcbiAgaWYgKHB3ZCkgcHdkLmF1dG9jb21wbGV0ZSA9IG1vZGUgPT09ICdzaWduaW4nID8gJ2N1cnJlbnQtcGFzc3dvcmQnIDogJ25ldy1wYXNzd29yZCc7XG4gIGNsZWFyRXJyb3IoKTtcbn1cblxuZnVuY3Rpb24gc2hvd0Vycm9yKG1zZzogc3RyaW5nKTogdm9pZCB7XG4gIGNvbnN0IGVsID0gJCgnbG9naW4tZXJyb3InKTtcbiAgaWYgKCFlbCkgcmV0dXJuO1xuICBlbC50ZXh0Q29udGVudCA9IG1zZztcbiAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59XG5cbmZ1bmN0aW9uIGNsZWFyRXJyb3IoKTogdm9pZCB7XG4gIGNvbnN0IGVsID0gJCgnbG9naW4tZXJyb3InKTtcbiAgaWYgKCFlbCkgcmV0dXJuO1xuICBlbC50ZXh0Q29udGVudCA9ICcnO1xuICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5mdW5jdGlvbiBzaG93U3VjY2Vzcyh1c2VyOiB7IGVtYWlsOiBzdHJpbmc7IHJvbGU6IHN0cmluZyB9KTogdm9pZCB7XG4gICQoJ2xvZ2luLWZvcm0nKSEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgJCgnbG9naW4taW50cm8nKSEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgY29uc3Qgd3JhcCA9ICQoJ2xvZ2luLXN1Y2Nlc3MnKTtcbiAgaWYgKHdyYXApIHdyYXAuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgY29uc3QgdGV4dCA9ICQoJ2xvZ2luLXN1Y2Nlc3MtdGV4dCcpO1xuICBpZiAodGV4dCkge1xuICAgIHRleHQuaW5uZXJIVE1MID0gYFNpZ25lZCBpbiBhcyA8c3Ryb25nPiR7ZXNjYXBlSHRtbCh1c2VyLmVtYWlsKX08L3N0cm9uZz4gKCR7dXNlci5yb2xlfSkuPGJyPllvdSBjYW4gY2xvc2UgdGhpcyB3aW5kb3cuYDtcbiAgfVxufVxuXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlV2luZG93KCk6IHZvaWQge1xuICBvdmVyd29sZi53aW5kb3dzLmdldEN1cnJlbnRXaW5kb3cocmVzID0+IHtcbiAgICBpZiAocmVzPy5zdWNjZXNzICYmIHJlcy53aW5kb3c/LmlkKSBvdmVyd29sZi53aW5kb3dzLmNsb3NlKHJlcy53aW5kb3cuaWQpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlU3VibWl0KGU6IEV2ZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY2xlYXJFcnJvcigpO1xuICBjb25zdCBlbWFpbCA9ICQ8SFRNTElucHV0RWxlbWVudD4oJ2xvZ2luLWVtYWlsJyk/LnZhbHVlLnRyaW0oKSB8fCAnJztcbiAgY29uc3QgcGFzc3dvcmQgPSAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdsb2dpbi1wYXNzd29yZCcpPy52YWx1ZSB8fCAnJztcbiAgY29uc3QgZGlzcGxheU5hbWUgPSAkPEhUTUxJbnB1dEVsZW1lbnQ+KCdsb2dpbi1uYW1lJyk/LnZhbHVlLnRyaW0oKSB8fCB1bmRlZmluZWQ7XG4gIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSB7XG4gICAgc2hvd0Vycm9yKCdFbWFpbCBhbmQgcGFzc3dvcmQgYXJlIHJlcXVpcmVkLicpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHN1Ym1pdCA9ICQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdsb2dpbi1zdWJtaXQnKTtcbiAgaWYgKHN1Ym1pdCkgeyBzdWJtaXQuZGlzYWJsZWQgPSB0cnVlOyBzdWJtaXQudGV4dENvbnRlbnQgPSAnV29ya2luZ+KApic7IH1cblxuICB0cnkge1xuICAgIGNvbnN0IHVzZXIgPSBjdXJyZW50TW9kZSA9PT0gJ3NpZ25pbidcbiAgICAgID8gYXdhaXQgbG9naW4oZW1haWwsIHBhc3N3b3JkKVxuICAgICAgOiBhd2FpdCByZWdpc3RlcihlbWFpbCwgcGFzc3dvcmQsIGRpc3BsYXlOYW1lKTtcbiAgICBzaG93U3VjY2Vzcyh1c2VyKTtcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICBzaG93RXJyb3IoZXJyPy5tZXNzYWdlIHx8ICdTaWduLWluIGZhaWxlZC4nKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoc3VibWl0KSB7XG4gICAgICBzdWJtaXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIHN1Ym1pdC50ZXh0Q29udGVudCA9IGN1cnJlbnRNb2RlID09PSAnc2lnbmluJyA/ICdTaWduIGluJyA6ICdDcmVhdGUgYWNjb3VudCc7XG4gICAgfVxuICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAkKCd0YWItc2lnbmluJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2V0TW9kZSgnc2lnbmluJykpO1xuICAkKCd0YWItc2lnbnVwJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2V0TW9kZSgnc2lnbnVwJykpO1xuICAkKCdsb2dpbi1mb3JtJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7IGhhbmRsZVN1Ym1pdChlKTsgfSk7XG4gICQoJ2xvZ2luLWNsb3NlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VXaW5kb3cpO1xuICAkKCdsb2dpbi1zdWNjZXNzLWNsb3NlJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VXaW5kb3cpO1xuXG4gIC8vIElmIHVzZXIgaXMgYWxyZWFkeSBzaWduZWQgaW4gd2hlbiB3aW5kb3cgb3BlbnMsIGp1bXAgc3RyYWlnaHQgdG8gc3VjY2Vzcy5cbiAgaWYgKGlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgY29uc3QgdSA9IGdldFN0b3JlZFVzZXIoKTtcbiAgICBpZiAodSkgc2hvd1N1Y2Nlc3MoeyBlbWFpbDogdS5lbWFpbCwgcm9sZTogdS5yb2xlIH0pO1xuICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==