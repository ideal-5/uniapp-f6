(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet', '__webpack_require_UNI_MP_PLUGIN__'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
var _default = target[key];
exports.default = _default;

/***/ }),
/* 2 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__744316D",
    appName: "newf6",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.08",
    uniRuntimeVersion: "4.08",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__744316D",
      appName: "newf6",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"newf6","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) {
        ;
      }
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(t, e, r) {
  if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 23 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"newf6","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"newf6","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"newf6","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"newf6","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 26 */
/*!******************************************************************!*\
  !*** C:/Users/admin/Documents/HBuilderProjects/newf6/pages.json ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 33 */
/*!********************************************************************************!*\
  !*** C:/Users/admin/Documents/HBuilderProjects/newf6/uni.promisify.adaptor.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
uni.addInterceptor({
  returnValue: function returnValue(res) {
    if (!(!!res && (_typeof(res) === "object" || typeof res === "function") && typeof res.then === "function")) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        return res[0] ? reject(res[0]) : resolve(res[1]);
      });
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 41)();
module.exports = runtime;

/***/ }),
/* 41 */
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) {
              if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            }
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) {
      r.push(n);
    }
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) {
        "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      }
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 42 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 43 */
/*!*******************************************************************!*\
  !*** C:/Users/admin/Documents/HBuilderProjects/newf6/f6/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof=__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);!function(t,e){"object"==( false?undefined:_typeof(exports))&&"object"==( false?undefined:_typeof(module))?module.exports=e(): true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):undefined;}(this,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports;}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r});},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==_typeof(t)&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t){n.d(r,i,function(e){return t[e];}.bind(null,i));}return r;},n.n=function(t){var e=t&&t.__esModule?function(){return t.default;}:function(){return t;};return n.d(e,"a",e),e;},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e);},n.p="",n(n.s=177);}({0:function _(t,e,n){"use strict";n.r(e),n.d(e,"contains",function(){return i;}),n.d(e,"includes",function(){return i;}),n.d(e,"difference",function(){return a;}),n.d(e,"find",function(){return x;}),n.d(e,"findIndex",function(){return w;}),n.d(e,"firstValue",function(){return S;}),n.d(e,"flatten",function(){return O;}),n.d(e,"flattenDeep",function(){return M;}),n.d(e,"getRange",function(){return E;}),n.d(e,"pull",function(){return I;}),n.d(e,"pullAt",function(){return N;}),n.d(e,"reduce",function(){return B;}),n.d(e,"remove",function(){return L;}),n.d(e,"sortBy",function(){return _;}),n.d(e,"union",function(){return F;}),n.d(e,"uniq",function(){return R;}),n.d(e,"valuesOfKey",function(){return Y;}),n.d(e,"head",function(){return X;}),n.d(e,"last",function(){return z;}),n.d(e,"startsWith",function(){return W;}),n.d(e,"endsWith",function(){return q;}),n.d(e,"filter",function(){return o;}),n.d(e,"every",function(){return V;}),n.d(e,"some",function(){return G;}),n.d(e,"group",function(){return K;}),n.d(e,"groupBy",function(){return U;}),n.d(e,"groupToMap",function(){return Z;}),n.d(e,"getWrapBehavior",function(){return $;}),n.d(e,"wrapBehavior",function(){return Q;}),n.d(e,"number2color",function(){return tt;}),n.d(e,"parseRadius",function(){return et;}),n.d(e,"clamp",function(){return nt;}),n.d(e,"fixedBase",function(){return rt;}),n.d(e,"isDecimal",function(){return ot;}),n.d(e,"isEven",function(){return at;}),n.d(e,"isInteger",function(){return st;}),n.d(e,"isNegative",function(){return ct;}),n.d(e,"isNumberEqual",function(){return ut;}),n.d(e,"isOdd",function(){return ht;}),n.d(e,"isPositive",function(){return lt;}),n.d(e,"max",function(){return k;}),n.d(e,"maxBy",function(){return ft;}),n.d(e,"min",function(){return C;}),n.d(e,"minBy",function(){return dt;}),n.d(e,"mod",function(){return pt;}),n.d(e,"toDegree",function(){return vt;}),n.d(e,"toInteger",function(){return yt;}),n.d(e,"toRadian",function(){return bt;}),n.d(e,"forIn",function(){return xt;}),n.d(e,"has",function(){return wt;}),n.d(e,"hasKey",function(){return St;}),n.d(e,"hasValue",function(){return Mt;}),n.d(e,"keys",function(){return g;}),n.d(e,"isMatch",function(){return v;}),n.d(e,"values",function(){return Ot;}),n.d(e,"lowerCase",function(){return Ct;}),n.d(e,"lowerFirst",function(){return Et;}),n.d(e,"substitute",function(){return jt;}),n.d(e,"upperCase",function(){return Pt;}),n.d(e,"upperFirst",function(){return At;}),n.d(e,"getType",function(){return Tt;}),n.d(e,"isArguments",function(){return Nt;}),n.d(e,"isArray",function(){return l;}),n.d(e,"isArrayLike",function(){return r;}),n.d(e,"isBoolean",function(){return Bt;}),n.d(e,"isDate",function(){return Lt;}),n.d(e,"isError",function(){return Dt;}),n.d(e,"isFunction",function(){return u;}),n.d(e,"isFinite",function(){return _t;}),n.d(e,"isNil",function(){return h;}),n.d(e,"isNull",function(){return Rt;}),n.d(e,"isNumber",function(){return it;}),n.d(e,"isObject",function(){return d;}),n.d(e,"isObjectLike",function(){return m;}),n.d(e,"isPlainObject",function(){return b;}),n.d(e,"isPrototype",function(){return Yt;}),n.d(e,"isRegExp",function(){return Xt;}),n.d(e,"isString",function(){return D;}),n.d(e,"isType",function(){return c;}),n.d(e,"isUndefined",function(){return zt;}),n.d(e,"isElement",function(){return Wt;}),n.d(e,"requestAnimationFrame",function(){return qt;}),n.d(e,"clearAnimationFrame",function(){return Vt;}),n.d(e,"augment",function(){return Ut;}),n.d(e,"clone",function(){return Kt;}),n.d(e,"debounce",function(){return $t;}),n.d(e,"memoize",function(){return Qt;}),n.d(e,"deepMix",function(){return te;}),n.d(e,"each",function(){return p;}),n.d(e,"extend",function(){return ee;}),n.d(e,"indexOf",function(){return ne;}),n.d(e,"isEmpty",function(){return ie;}),n.d(e,"isEqual",function(){return oe;}),n.d(e,"isEqualWith",function(){return ae;}),n.d(e,"map",function(){return se;}),n.d(e,"mapValues",function(){return ue;}),n.d(e,"mix",function(){return Ht;}),n.d(e,"assign",function(){return Ht;}),n.d(e,"get",function(){return he;}),n.d(e,"set",function(){return le;}),n.d(e,"pick",function(){return de;}),n.d(e,"omit",function(){return pe;}),n.d(e,"throttle",function(){return ge;}),n.d(e,"toArray",function(){return ve;}),n.d(e,"toString",function(){return kt;}),n.d(e,"uniqueId",function(){return me;}),n.d(e,"noop",function(){return be;}),n.d(e,"identity",function(){return xe;}),n.d(e,"size",function(){return we;}),n.d(e,"measureTextWidth",function(){return Me;}),n.d(e,"getEllipsisText",function(){return ke;}),n.d(e,"Cache",function(){return Ce;});var r=function r(t){return null!==t&&"function"!=typeof t&&isFinite(t.length);},i=function i(t,e){return!!r(t)&&t.indexOf(e)>-1;},o=function o(t,e){if(!r(t))return t;for(var n=[],i=0;i<t.length;i++){var o=t[i];e(o,i)&&n.push(o);}return n;},a=function a(t,e){return void 0===e&&(e=[]),o(t,function(t){return!i(e,t);});},s={}.toString,c=function c(t,e){return s.call(t)==="[object "+e+"]";},u=function u(t){return c(t,"Function");},h=function h(t){return null==t;},l=function l(t){return Array.isArray?Array.isArray(t):c(t,"Array");};function f(t){return(f="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}var d=function d(t){var e=f(t);return null!==t&&"object"===e||"function"===e;};var p=function p(t,e){if(t)if(l(t))for(var n=0,r=t.length;n<r&&!1!==e(t[n],n);n++){;}else if(d(t))for(var i in t){if(t.hasOwnProperty(i)&&!1===e(t[i],i))break;}},g=Object.keys?function(t){return Object.keys(t);}:function(t){var e=[];return p(t,function(n,r){u(t)&&"prototype"===r||e.push(r);}),e;};var v=function v(t,e){var n=g(e),r=n.length;if(h(t))return!r;for(var i=0;i<r;i+=1){var o=n[i];if(e[o]!==t[o]||!(o in t))return!1;}return!0;};function y(t){return(y="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}var m=function m(t){return"object"===y(t)&&null!==t;},b=function b(t){if(!m(t)||!c(t,"Object"))return!1;if(null===Object.getPrototypeOf(t))return!0;for(var e=t;null!==Object.getPrototypeOf(e);){e=Object.getPrototypeOf(e);}return Object.getPrototypeOf(t)===e;};var x=function x(t,e){if(!l(t))return null;var n;if(u(e)&&(n=e),b(e)&&(n=function n(t){return v(t,e);}),n)for(var r=0;r<t.length;r+=1){if(n(t[r]))return t[r];}return null;};var w=function w(t,e,n){void 0===n&&(n=0);for(var r=n;r<t.length;r++){if(e(t[r],r))return r;}return-1;},S=function S(t,e){for(var n=null,r=0;r<t.length;r++){var i=t[r][e];if(!h(i)){n=l(i)?i[0]:i;break;}}return n;},O=function O(t){if(!l(t))return[];for(var e=[],n=0;n<t.length;n++){e=e.concat(t[n]);}return e;},M=function t(e,n){if(void 0===n&&(n=[]),l(e))for(var r=0;r<e.length;r+=1){t(e[r],n);}else n.push(e);return n;},k=function k(t){if(l(t))return t.reduce(function(t,e){return Math.max(t,e);},t[0]);},C=function C(t){if(l(t))return t.reduce(function(t,e){return Math.min(t,e);},t[0]);},E=function E(t){var e=t.filter(function(t){return!isNaN(t);});if(!e.length)return{min:0,max:0};if(l(t[0])){for(var n=[],r=0;r<t.length;r++){n=n.concat(t[r]);}e=n;}var i=k(e);return{min:C(e),max:i};},j=Array.prototype,P=j.splice,A=j.indexOf,I=function I(t){for(var e=[],n=1;n<arguments.length;n++){e[n-1]=arguments[n];}for(var r=0;r<e.length;r++){for(var i=e[r],o=-1;(o=A.call(t,i))>-1;){P.call(t,o,1);}}return t;},T=Array.prototype.splice,N=function N(t,e){if(!r(t))return[];for(var n=t?e.length:0,i=n-1;n--;){var o=void 0,a=e[n];n!==i&&a===o||(o=a,T.call(t,a,1));}return t;},B=function B(t,e,n){if(!l(t)&&!b(t))return t;var r=n;return p(t,function(t,n){r=e(r,t,n);}),r;},L=function L(t,e){var n=[];if(!r(t))return n;for(var i=-1,o=[],a=t.length;++i<a;){var s=t[i];e(s,i,t)&&(n.push(s),o.push(i));}return N(t,o),n;},D=function D(t){return c(t,"String");};var _=function _(t,e){var n;if(u(e))n=function n(t,_n){return e(t)-e(_n);};else{var r=[];D(e)?r.push(e):l(e)&&(r=e),n=function n(t,e){for(var n=0;n<r.length;n+=1){var i=r[n];if(t[i]>e[i])return 1;if(t[i]<e[i])return-1;}return 0;};}return t.sort(n),t;};function R(t,e){void 0===e&&(e=new Map());var n=[];if(Array.isArray(t))for(var r=0,i=t.length;r<i;r++){var o=t[r];e.has(o)||(n.push(o),e.set(o,!0));}return n;}var F=function F(){for(var t=[],e=0;e<arguments.length;e++){t[e]=arguments[e];}return R([].concat.apply([],t));},Y=function Y(t,e){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i][e];if(!h(o)){l(o)||(o=[o]);for(var a=0;a<o.length;a++){var s=o[a];r[s]||(n.push(s),r[s]=!0);}}}return n;};function X(t){if(r(t))return t[0];}function z(t){if(r(t)){return t[t.length-1];}}var W=function W(t,e){return!(!l(t)&&!D(t))&&t[0]===e;};var q=function q(t,e){return!(!l(t)&&!D(t))&&t[t.length-1]===e;},V=function V(t,e){for(var n=0;n<t.length;n++){if(!e(t[n],n))return!1;}return!0;},G=function G(t,e){for(var n=0;n<t.length;n++){if(e(t[n],n))return!0;}return!1;},H=Object.prototype.hasOwnProperty;var U=function U(t,e){if(!e||!l(t))return{};for(var n,r={},i=u(e)?e:function(t){return t[e];},o=0;o<t.length;o++){var a=t[o];n=i(a),H.call(r,n)?r[n].push(a):r[n]=[a];}return r;};function Z(t,e){if(!e)return{0:t};if(!u(e)){var n=l(e)?e:e.replace(/\s+/g,"").split("*");e=function e(t){for(var e="_",r=0,i=n.length;r<i;r++){e+=t[n[r]]&&t[n[r]].toString();}return e;};}return U(t,e);}var K=function K(t,e){if(!e)return[t];var n=Z(t,e),r=[];for(var i in n){r.push(n[i]);}return r;};var $=function $(t,e){return t["_wrap_"+e];};var Q=function Q(t,e){if(t["_wrap_"+e])return t["_wrap_"+e];var n=function n(_n2){t[e](_n2);};return t["_wrap_"+e]=n,n;},J={};var tt=function tt(t){var e=J[t];if(!e){for(var n=t.toString(16),r=n.length;r<6;r++){n="0"+n;}e="#"+n,J[t]=e;}return e;};var et=function et(t){var e=0,n=0,r=0,i=0;return l(t)?1===t.length?e=n=r=i=t[0]:2===t.length?(e=r=t[0],n=i=t[1]):3===t.length?(e=t[0],n=i=t[1],r=t[2]):(e=t[0],n=t[1],r=t[2],i=t[3]):e=n=r=i=t,{r1:e,r2:n,r3:r,r4:i};},nt=function nt(t,e,n){return t<e?e:t>n?n:t;},rt=function rt(t,e){var n=e.toString(),r=n.indexOf(".");if(-1===r)return Math.round(t);var i=n.substr(r+1).length;return i>20&&(i=20),parseFloat(t.toFixed(i));},it=function it(t){return c(t,"Number");},ot=function ot(t){return it(t)&&t%1!=0;},at=function at(t){return it(t)&&t%2==0;},st=Number.isInteger?Number.isInteger:function(t){return it(t)&&t%1==0;},ct=function ct(t){return it(t)&&t<0;};function ut(t,e,n){return void 0===n&&(n=1e-5),Math.abs(t-e)<n;}var ht=function ht(t){return it(t)&&t%2!=0;},lt=function lt(t){return it(t)&&t>0;},ft=function ft(t,e){if(l(t)){for(var n,r=-1/0,i=0;i<t.length;i++){var o=t[i],a=u(e)?e(o):o[e];a>r&&(n=o,r=a);}return n;}},dt=function dt(t,e){if(l(t)){for(var n,r=1/0,i=0;i<t.length;i++){var o=t[i],a=u(e)?e(o):o[e];a<r&&(n=o,r=a);}return n;}},pt=function pt(t,e){return(t%e+e)%e;},gt=180/Math.PI,vt=function vt(t){return gt*t;},yt=parseInt,mt=Math.PI/180,bt=function bt(t){return mt*t;},xt=p,wt=function wt(t,e){return t.hasOwnProperty(e);},St=wt,Ot=Object.values?function(t){return Object.values(t);}:function(t){var e=[];return p(t,function(n,r){u(t)&&"prototype"===r||e.push(n);}),e;},Mt=function Mt(t,e){return i(Ot(t),e);},kt=function kt(t){return h(t)?"":t.toString();},Ct=function Ct(t){return kt(t).toLowerCase();},Et=function Et(t){var e=kt(t);return e.charAt(0).toLowerCase()+e.substring(1);};var jt=function jt(t,e){return t&&e?t.replace(/\\?\{([^{}]+)\}/g,function(t,n){return"\\"===t.charAt(0)?t.slice(1):void 0===e[n]?"":e[n];}):t;},Pt=function Pt(t){return kt(t).toUpperCase();},At=function At(t){var e=kt(t);return e.charAt(0).toUpperCase()+e.substring(1);},It={}.toString,Tt=function Tt(t){return It.call(t).replace(/^\[object /,"").replace(/]$/,"");},Nt=function Nt(t){return c(t,"Arguments");},Bt=function Bt(t){return c(t,"Boolean");},Lt=function Lt(t){return c(t,"Date");},Dt=function Dt(t){return c(t,"Error");},_t=function _t(t){return it(t)&&isFinite(t);},Rt=function Rt(t){return null===t;},Ft=Object.prototype,Yt=function Yt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||Ft);},Xt=function Xt(t){return c(t,"RegExp");},zt=function zt(t){return void 0===t;},Wt=function Wt(t){return t instanceof Element||t instanceof HTMLDocument;};function qt(t){return(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return setTimeout(t,16);})(t);}function Vt(t){(window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.msCancelAnimationFrame||clearTimeout)(t);}function Gt(t,e){for(var n in e){e.hasOwnProperty(n)&&"constructor"!==n&&void 0!==e[n]&&(t[n]=e[n]);}}function Ht(t,e,n,r){return e&&Gt(t,e),n&&Gt(t,n),r&&Gt(t,r),t;}var Ut=function Ut(){for(var t=[],e=0;e<arguments.length;e++){t[e]=arguments[e];}for(var n=t[0],r=1;r<t.length;r++){var i=t[r];u(i)&&(i=i.prototype),Ht(n.prototype,i);}};function Zt(t){return(Zt="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}var Kt=function t(e){if("object"!==Zt(e)||null===e)return e;var n;if(l(e)){n=[];for(var r=0,i=e.length;r<i;r++){"object"===Zt(e[r])&&null!=e[r]?n[r]=t(e[r]):n[r]=e[r];}}else for(var o in n={},e){"object"===Zt(e[o])&&null!=e[o]?n[o]=t(e[o]):n[o]=e[o];}return n;};var $t=function $t(t,e,n){var r;return function(){var i=this,o=arguments,a=function a(){r=null,n||t.apply(i,o);},s=n&&!r;clearTimeout(r),r=setTimeout(a,e),s&&t.apply(i,o);};},Qt=function Qt(t,e){if(!u(t))throw new TypeError("Expected a function");var n=function n(){for(var r=[],i=0;i<arguments.length;i++){r[i]=arguments[i];}var o=e?e.apply(this,r):r[0],a=n.cache;if(a.has(o))return a.get(o);var s=t.apply(this,r);return a.set(o,s),s;};return n.cache=new Map(),n;};function Jt(t,e,n,r){for(var i in n=n||0,r=r||5,e){if(e.hasOwnProperty(i)){var o=e[i];null!==o&&b(o)?(b(t[i])||(t[i]={}),n<r?Jt(t[i],o,n+1,r):t[i]=e[i]):l(o)?(t[i]=[],t[i]=t[i].concat(o)):void 0!==o&&(t[i]=o);}}}var te=function te(t){for(var e=[],n=1;n<arguments.length;n++){e[n-1]=arguments[n];}for(var r=0;r<e.length;r+=1){Jt(t,e[r]);}return t;},ee=function ee(t,e,n,r){u(e)||(n=e,e=t,t=function t(){});var i=Object.create?function(t,e){return Object.create(t,{constructor:{value:e}});}:function(t,e){function n(){}n.prototype=t;var r=new n();return r.constructor=e,r;},o=i(e.prototype,t);return t.prototype=Ht(o,t.prototype),t.superclass=i(e.prototype,e),Ht(o,n),Ht(t,r),t;},ne=function ne(t,e){if(!r(t))return-1;var n=Array.prototype.indexOf;if(n)return n.call(t,e);for(var i=-1,o=0;o<t.length;o++){if(t[o]===e){i=o;break;}}return i;},re=Object.prototype.hasOwnProperty;var ie=function ie(t){if(h(t))return!0;if(r(t))return!t.length;var e=Tt(t);if("Map"===e||"Set"===e)return!t.size;if(Yt(t))return!Object.keys(t).length;for(var n in t){if(re.call(t,n))return!1;}return!0;},oe=function t(e,n){if(e===n)return!0;if(!e||!n)return!1;if(D(e)||D(n))return!1;if(r(e)||r(n)){if(e.length!==n.length)return!1;for(var i=!0,o=0;o<e.length&&(i=t(e[o],n[o]));o++){;}return i;}if(m(e)||m(n)){var a=Object.keys(e),s=Object.keys(n);if(a.length!==s.length)return!1;for(i=!0,o=0;o<a.length&&(i=t(e[a[o]],n[a[o]]));o++){;}return i;}return!1;},ae=function ae(t,e,n){return u(n)?!!n(t,e):oe(t,e);},se=function se(t,e){if(!r(t))return t;for(var n=[],i=0;i<t.length;i++){var o=t[i];n.push(e(o,i));}return n;},ce=function ce(t){return t;},ue=function ue(t,e){void 0===e&&(e=ce);var n={};return d(t)&&!h(t)&&Object.keys(t).forEach(function(r){n[r]=e(t[r],r);}),n;},he=function he(t,e,n){for(var r=0,i=D(e)?e.split("."):e;t&&r<i.length;){t=t[i[r++]];}return void 0===t||r<i.length?n:t;},le=function le(t,e,n){var r=t,i=D(e)?e.split("."):e;return i.forEach(function(t,e){e<i.length-1?(d(r[t])||(r[t]=it(i[e+1])?[]:{}),r=r[t]):r[t]=n;}),t;},fe=Object.prototype.hasOwnProperty,de=function de(t,e){if(null===t||!b(t))return{};var n={};return p(e,function(e){fe.call(t,e)&&(n[e]=t[e]);}),n;},pe=function pe(t,e){return B(t,function(t,n,r){return e.includes(r)||(t[r]=n),t;},{});},ge=function ge(t,e,n){var r,i,o,a,s=0;n||(n={});var c=function c(){s=!1===n.leading?0:Date.now(),r=null,a=t.apply(i,o),r||(i=o=null);},u=function u(){var u=Date.now();s||!1!==n.leading||(s=u);var h=e-(u-s);return i=this,o=arguments,h<=0||h>e?(r&&(clearTimeout(r),r=null),s=u,a=t.apply(i,o),r||(i=o=null)):r||!1===n.trailing||(r=setTimeout(c,h)),a;};return u.cancel=function(){clearTimeout(r),s=0,r=i=o=null;},u;},ve=function ve(t){return r(t)?Array.prototype.slice.call(t):[];},ye={},me=function me(t){return ye[t=t||"g"]?ye[t]+=1:ye[t]=1,t+ye[t];},be=function be(){},xe=function xe(t){return t;};function we(t){return h(t)?0:r(t)?t.length:Object.keys(t).length;}var Se,Oe=n(1),Me=Qt(function(t,e){void 0===e&&(e={});var n=e.fontSize,r=e.fontFamily,i=e.fontWeight,o=e.fontStyle,a=e.fontVariant;return Se||(Se=document.createElement("canvas").getContext("2d")),Se.font=[o,a,i,n+"px",r].join(" "),Se.measureText(D(t)?t:"").width;},function(t,e){return void 0===e&&(e={}),Object(Oe.g)([t],Ot(e)).join("");}),ke=function ke(t,e,n,r){void 0===r&&(r="...");var i,o,a=Me(r,n),s=D(t)?t:kt(t),c=e,u=[];if(Me(t,n)<=e)return t;for(;i=s.substr(0,16),!((o=Me(i,n))+a>c&&o>c);){if(u.push(i),c-=o,!(s=s.substr(16)))return u.join("");}for(;i=s.substr(0,1),!((o=Me(i,n))+a>c);){if(u.push(i),c-=o,!(s=s.substr(1)))return u.join("");}return""+u.join("")+r;},Ce=function(){function t(){this.map={};}return t.prototype.has=function(t){return void 0!==this.map[t];},t.prototype.get=function(t,e){var n=this.map[t];return void 0===n?e:n;},t.prototype.set=function(t,e){this.map[t]=e;},t.prototype.clear=function(){this.map={};},t.prototype.delete=function(t){delete this.map[t];},t.prototype.size=function(){return Object.keys(this.map).length;},t;}();},1:function _(t,e,n){"use strict";n.d(e,"c",function(){return i;}),n.d(e,"a",function(){return _o;}),n.d(e,"e",function(){return a;}),n.d(e,"b",function(){return s;}),n.d(e,"d",function(){return c;}),n.d(e,"g",function(){return u;}),n.d(e,"f",function(){return h;});/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var _r=function r(t,e){return(_r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var n in e){Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);}})(t,e);};function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t;}_r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n());}var _o=function o(){return(_o=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){for(var i in e=arguments[n]){Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);}}return t;}).apply(this,arguments);};function a(t,e){var n={};for(var r in t){Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);}if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(t);i<r.length;i++){e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);}}return n;}function s(t,e,n,r){return new(n||(n=Promise))(function(i,o){function a(t){try{c(r.next(t));}catch(t){o(t);}}function s(t){try{c(r.throw(t));}catch(t){o(t);}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e);})).then(a,s);}c((r=r.apply(t,e||[])).next());});}function c(t,e){var n,r,i,o,a={label:0,sent:function sent(){if(1&i[0])throw i[1];return i[1];},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this;}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;){try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue;}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break;}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break;}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break;}i[2]&&a.ops.pop(),a.trys.pop();continue;}o=e.call(t,a);}catch(t){o=[6,t],r=0;}finally{n=i=0;}}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0};}([o,s]);};}}Object.create;function u(){for(var t=0,e=0,n=arguments.length;e<n;e++){t+=arguments[e].length;}var r=Array(t),i=0;for(e=0;e<n;e++){for(var o=arguments[e],a=0,s=o.length;a<s;a++,i++){r[i]=o[a];}}return r;}function h(t,e,n){if(n||2===arguments.length)for(var r,i=0,o=e.length;i<o;i++){!r&&i in e||(r||(r=Array.prototype.slice.call(e,0,i)),r[i]=e[i]);}return t.concat(r||Array.prototype.slice.call(e));}Object.create;},100:function _(t,e,n){"use strict";var r=n(186),i={};for(var o in r){r.hasOwnProperty(o)&&(i[r[o]]=o);}var a=t.exports={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};for(var s in a){if(a.hasOwnProperty(s)){if(!("channels"in a[s]))throw new Error("missing channels property: "+s);if(!("labels"in a[s]))throw new Error("missing channel labels property: "+s);if(a[s].labels.length!==a[s].channels)throw new Error("channel and label counts mismatch: "+s);var c=a[s].channels,u=a[s].labels;delete a[s].channels,delete a[s].labels,Object.defineProperty(a[s],"channels",{value:c}),Object.defineProperty(a[s],"labels",{value:u});}}function h(t,e){return Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2)+Math.pow(t[2]-e[2],2);}a.rgb.hsl=function(t){var e,n,r=t[0]/255,i=t[1]/255,o=t[2]/255,a=Math.min(r,i,o),s=Math.max(r,i,o),c=s-a;return s===a?e=0:r===s?e=(i-o)/c:i===s?e=2+(o-r)/c:o===s&&(e=4+(r-i)/c),(e=Math.min(60*e,360))<0&&(e+=360),n=(a+s)/2,[e,100*(s===a?0:n<=0.5?c/(s+a):c/(2-s-a)),100*n];},a.rgb.hsv=function(t){var e,n,r,i,o,a=t[0]/255,s=t[1]/255,c=t[2]/255,u=Math.max(a,s,c),h=u-Math.min(a,s,c),l=function l(t){return(u-t)/6/h+0.5;};return 0===h?i=o=0:(o=h/u,e=l(a),n=l(s),r=l(c),a===u?i=r-n:s===u?i=1/3+e-r:c===u&&(i=2/3+n-e),i<0?i+=1:i>1&&(i-=1)),[360*i,100*o,100*u];},a.rgb.hwb=function(t){var e=t[0],n=t[1],r=t[2];return[a.rgb.hsl(t)[0],1/255*Math.min(e,Math.min(n,r))*100,100*(r=1-1/255*Math.max(e,Math.max(n,r)))];},a.rgb.cmyk=function(t){var e=t[0]/255,n=t[1]/255,r=t[2]/255,i=Math.min(1-e,1-n,1-r);return[100*((1-e-i)/(1-i)||0),100*((1-n-i)/(1-i)||0),100*((1-r-i)/(1-i)||0),100*i];},a.rgb.keyword=function(t){var e,n=i[t];if(n)return n;var o,a=1/0;for(var s in r){r.hasOwnProperty(s)&&(e=h(t,r[s]))<a&&(a=e,o=s);}return o;},a.keyword.rgb=function(t){return r[t];},a.rgb.xyz=function(t){var e=t[0]/255,n=t[1]/255,r=t[2]/255;return[100*(0.4124*(e=e>0.04045?Math.pow((e+0.055)/1.055,2.4):e/12.92)+0.3576*(n=n>0.04045?Math.pow((n+0.055)/1.055,2.4):n/12.92)+0.1805*(r=r>0.04045?Math.pow((r+0.055)/1.055,2.4):r/12.92)),100*(0.2126*e+0.7152*n+0.0722*r),100*(0.0193*e+0.1192*n+0.9505*r)];},a.rgb.lab=function(t){var e=a.rgb.xyz(t),n=e[0],r=e[1],i=e[2];return r/=100,i/=108.883,n=(n/=95.047)>0.008856?Math.pow(n,1/3):7.787*n+16/116,[116*(r=r>0.008856?Math.pow(r,1/3):7.787*r+16/116)-16,500*(n-r),200*(r-(i=i>0.008856?Math.pow(i,1/3):7.787*i+16/116))];},a.hsl.rgb=function(t){var e,n,r,i,o,a,s=t[0]/360,c=t[1]/100,u=t[2]/100;if(0===c)return[a=255*u,a,a];for(n=2*u-(r=u<0.5?u*(1+c):u+c-u*c),o=[0,0,0],e=0;e<3;e++){(i=s+1/3*-(e-1))<0&&i++,i>1&&i--,a=6*i<1?n+6*(r-n)*i:2*i<1?r:3*i<2?n+(r-n)*(2/3-i)*6:n,o[e]=255*a;}return o;},a.hsl.hsv=function(t){var e=t[0],n=t[1]/100,r=t[2]/100,i=n,o=Math.max(r,0.01);return n*=(r*=2)<=1?r:2-r,i*=o<=1?o:2-o,[e,100*(0===r?2*i/(o+i):2*n/(r+n)),(r+n)/2*100];},a.hsv.rgb=function(t){var e=t[0]/60,n=t[1]/100,r=t[2]/100,i=Math.floor(e)%6,o=e-Math.floor(e),a=255*r*(1-n),s=255*r*(1-n*o),c=255*r*(1-n*(1-o));switch(r*=255,i){case 0:return[r,c,a];case 1:return[s,r,a];case 2:return[a,r,c];case 3:return[a,s,r];case 4:return[c,a,r];case 5:return[r,a,s];}},a.hsv.hsl=function(t){var e,n,r=t[0],i=t[1]/100,o=t[2]/100,a=Math.max(o,0.01),s=(2-i)*o;return n=i*a,[r,100*(n=(n/=(e=(2-i)*a)<=1?e:2-e)||0),100*(s/=2)];},a.hwb.rgb=function(t){var e,n,r,i,o,a,s,c=t[0]/360,u=t[1]/100,h=t[2]/100,l=u+h;switch(l>1&&(u/=l,h/=l),r=6*c-(e=Math.floor(6*c)),0!=(1&e)&&(r=1-r),i=u+r*((n=1-h)-u),e){default:case 6:case 0:o=n,a=i,s=u;break;case 1:o=i,a=n,s=u;break;case 2:o=u,a=n,s=i;break;case 3:o=u,a=i,s=n;break;case 4:o=i,a=u,s=n;break;case 5:o=n,a=u,s=i;}return[255*o,255*a,255*s];},a.cmyk.rgb=function(t){var e=t[0]/100,n=t[1]/100,r=t[2]/100,i=t[3]/100;return[255*(1-Math.min(1,e*(1-i)+i)),255*(1-Math.min(1,n*(1-i)+i)),255*(1-Math.min(1,r*(1-i)+i))];},a.xyz.rgb=function(t){var e,n,r,i=t[0]/100,o=t[1]/100,a=t[2]/100;return n=-0.9689*i+1.8758*o+0.0415*a,r=0.0557*i+-0.204*o+1.057*a,e=(e=3.2406*i+-1.5372*o+-0.4986*a)>0.0031308?1.055*Math.pow(e,1/2.4)-0.055:12.92*e,n=n>0.0031308?1.055*Math.pow(n,1/2.4)-0.055:12.92*n,r=r>0.0031308?1.055*Math.pow(r,1/2.4)-0.055:12.92*r,[255*(e=Math.min(Math.max(0,e),1)),255*(n=Math.min(Math.max(0,n),1)),255*(r=Math.min(Math.max(0,r),1))];},a.xyz.lab=function(t){var e=t[0],n=t[1],r=t[2];return n/=100,r/=108.883,e=(e/=95.047)>0.008856?Math.pow(e,1/3):7.787*e+16/116,[116*(n=n>0.008856?Math.pow(n,1/3):7.787*n+16/116)-16,500*(e-n),200*(n-(r=r>0.008856?Math.pow(r,1/3):7.787*r+16/116))];},a.lab.xyz=function(t){var e,n,r,i=t[0];e=t[1]/500+(n=(i+16)/116),r=n-t[2]/200;var o=Math.pow(n,3),a=Math.pow(e,3),s=Math.pow(r,3);return n=o>0.008856?o:(n-16/116)/7.787,e=a>0.008856?a:(e-16/116)/7.787,r=s>0.008856?s:(r-16/116)/7.787,[e*=95.047,n*=100,r*=108.883];},a.lab.lch=function(t){var e,n=t[0],r=t[1],i=t[2];return(e=360*Math.atan2(i,r)/2/Math.PI)<0&&(e+=360),[n,Math.sqrt(r*r+i*i),e];},a.lch.lab=function(t){var e=t[0],n=t[1],r=t[2]/360*2*Math.PI;return[e,n*Math.cos(r),n*Math.sin(r)];},a.rgb.ansi16=function(t){var e=t[0],n=t[1],r=t[2],i=1 in arguments?arguments[1]:a.rgb.hsv(t)[2];if(0===(i=Math.round(i/50)))return 30;var o=30+(Math.round(r/255)<<2|Math.round(n/255)<<1|Math.round(e/255));return 2===i&&(o+=60),o;},a.hsv.ansi16=function(t){return a.rgb.ansi16(a.hsv.rgb(t),t[2]);},a.rgb.ansi256=function(t){var e=t[0],n=t[1],r=t[2];return e===n&&n===r?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(n/255*5)+Math.round(r/255*5);},a.ansi16.rgb=function(t){var e=t%10;if(0===e||7===e)return t>50&&(e+=3.5),[e=e/10.5*255,e,e];var n=0.5*(1+~~(t>50));return[(1&e)*n*255,(e>>1&1)*n*255,(e>>2&1)*n*255];},a.ansi256.rgb=function(t){return t>=232?[n=10*(t-232)+8,n,n]:(t-=16,[Math.floor(t/36)/5*255,Math.floor((e=t%36)/6)/5*255,e%6/5*255]);var e,n;},a.rgb.hex=function(t){var e=(((255&Math.round(t[0]))<<16)+((255&Math.round(t[1]))<<8)+(255&Math.round(t[2]))).toString(16).toUpperCase();return"000000".substring(e.length)+e;},a.hex.rgb=function(t){var e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];var n=e[0];3===e[0].length&&(n=n.split("").map(function(t){return t+t;}).join(""));var r=parseInt(n,16);return[r>>16&255,r>>8&255,255&r];},a.rgb.hcg=function(t){var e,n=t[0]/255,r=t[1]/255,i=t[2]/255,o=Math.max(Math.max(n,r),i),a=Math.min(Math.min(n,r),i),s=o-a;return e=s<=0?0:o===n?(r-i)/s%6:o===r?2+(i-n)/s:4+(n-r)/s+4,e/=6,[360*(e%=1),100*s,100*(s<1?a/(1-s):0)];},a.hsl.hcg=function(t){var e,n=t[1]/100,r=t[2]/100,i=0;return(e=r<0.5?2*n*r:2*n*(1-r))<1&&(i=(r-0.5*e)/(1-e)),[t[0],100*e,100*i];},a.hsv.hcg=function(t){var e=t[1]/100,n=t[2]/100,r=e*n,i=0;return r<1&&(i=(n-r)/(1-r)),[t[0],100*r,100*i];},a.hcg.rgb=function(t){var e=t[0]/360,n=t[1]/100,r=t[2]/100;if(0===n)return[255*r,255*r,255*r];var i,o=[0,0,0],a=e%1*6,s=a%1,c=1-s;switch(Math.floor(a)){case 0:o[0]=1,o[1]=s,o[2]=0;break;case 1:o[0]=c,o[1]=1,o[2]=0;break;case 2:o[0]=0,o[1]=1,o[2]=s;break;case 3:o[0]=0,o[1]=c,o[2]=1;break;case 4:o[0]=s,o[1]=0,o[2]=1;break;default:o[0]=1,o[1]=0,o[2]=c;}return i=(1-n)*r,[255*(n*o[0]+i),255*(n*o[1]+i),255*(n*o[2]+i)];},a.hcg.hsv=function(t){var e=t[1]/100,n=e+t[2]/100*(1-e),r=0;return n>0&&(r=e/n),[t[0],100*r,100*n];},a.hcg.hsl=function(t){var e=t[1]/100,n=t[2]/100*(1-e)+0.5*e,r=0;return n>0&&n<0.5?r=e/(2*n):n>=0.5&&n<1&&(r=e/(2*(1-n))),[t[0],100*r,100*n];},a.hcg.hwb=function(t){var e=t[1]/100,n=e+t[2]/100*(1-e);return[t[0],100*(n-e),100*(1-n)];},a.hwb.hcg=function(t){var e=t[1]/100,n=1-t[2]/100,r=n-e,i=0;return r<1&&(i=(n-r)/(1-r)),[t[0],100*r,100*i];},a.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255];},a.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535];},a.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255];},a.gray.hsl=a.gray.hsv=function(t){return[0,0,t[0]];},a.gray.hwb=function(t){return[0,100,t[0]];},a.gray.cmyk=function(t){return[0,0,0,t[0]];},a.gray.lab=function(t){return[t[0],0,0];},a.gray.hex=function(t){var e=255&Math.round(t[0]/100*255),n=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(n.length)+n;},a.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100];};},101:function _(t,e){},102:function _(t,e){},157:function _(t,e,n){"use strict";(function(t){n.d(e,"a",function(){return f;});var r=function r(t,e,n){if(n||2===arguments.length)for(var r,i=0,o=e.length;i<o;i++){!r&&i in e||(r||(r=Array.prototype.slice.call(e,0,i)),r[i]=e[i]);}return t.concat(r||Array.prototype.slice.call(e));},i=function i(t,e,n){this.name=t,this.version=e,this.os=n,this.type="browser";},o=function o(e){this.version=e,this.type="node",this.name="node",this.os=t.platform;},a=function a(t,e,n,r){this.name=t,this.version=e,this.os=n,this.bot=r,this.type="bot-device";},s=function s(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null;},c=function c(){this.type="react-native",this.name="react-native",this.version=null,this.os=null;},u=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,h=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["pie",/^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],["pie",/^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],["netfront",/^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/]],l=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Windows CE",/Windows CE|WinCE|Microsoft Pocket Internet Explorer/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function f(e){return e?p(e):"undefined"==typeof document&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product?new c():"undefined"!=typeof navigator?p(navigator.userAgent):void 0!==t&&t.version?new o(t.version.slice(1)):null;}function d(t){return""!==t&&h.reduce(function(e,n){var r=n[0],i=n[1];if(e)return e;var o=i.exec(t);return!!o&&[r,o];},!1);}function p(t){var e=d(t);if(!e)return null;var n=e[0],o=e[1];if("searchbot"===n)return new s();var c=o[1]&&o[1].split(".").join("_").split("_").slice(0,3);c?c.length<3&&(c=r(r([],c,!0),function(t){for(var e=[],n=0;n<t;n++){e.push("0");}return e;}(3-c.length),!0)):c=[];var h=c.join("."),f=function(t){for(var e=0,n=l.length;e<n;e++){var r=l[e],i=r[0];if(r[1].exec(t))return i;}return null;}(t),p=u.exec(t);return p&&p[1]?new a(n,h,f,p[1]):new i(n,h,f);}}).call(this,n(178));},177:function _(t,e,n){"use strict";n.r(e),function(r){var i=n(97),o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==r?r:void 0;"object"==( false?undefined:_typeof(exports))&&"object"==_typeof(t)|| true&&n(195)||"object"==( false?undefined:_typeof(exports))||Object.defineProperties(o,{f6:{get:function get(){return console.warn("废弃的特性: f6, 请使用 F6 代替 f6"),i.default;}}}),e.default=i.default;}.call(this,n(77));},178:function _(t,e){var n,r,i=t.exports={};function o(){throw new Error("setTimeout has not been defined");}function a(){throw new Error("clearTimeout has not been defined");}function s(t){if(n===setTimeout)return setTimeout(t,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0);}catch(e){try{return n.call(null,t,0);}catch(e){return n.call(this,t,0);}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o;}catch(t){n=o;}try{r="function"==typeof clearTimeout?clearTimeout:a;}catch(t){r=a;}}();var c,u=[],h=!1,l=-1;function f(){h&&c&&(h=!1,c.length?u=c.concat(u):l=-1,u.length&&d());}function d(){if(!h){var t=s(f);h=!0;for(var e=u.length;e;){for(c=u,u=[];++l<e;){c&&c[l].run();}l=-1,e=u.length;}c=null,h=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t);}catch(e){try{return r.call(null,t);}catch(e){return r.call(this,t);}}}(t);}}function p(t,e){this.fun=t,this.array=e;}function g(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++){e[n-1]=arguments[n];}u.push(new p(t,e)),1!==u.length||h||s(d);},p.prototype.run=function(){this.fun.apply(null,this.array);},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=g,i.addListener=g,i.once=g,i.off=g,i.removeListener=g,i.removeAllListeners=g,i.emit=g,i.prependListener=g,i.prependOnceListener=g,i.listeners=function(t){return[];},i.binding=function(t){throw new Error("process.binding is not supported");},i.cwd=function(){return"/";},i.chdir=function(t){throw new Error("process.chdir is not supported");},i.umask=function(){return 0;};},179:function _(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isAllowCapture=e.isParent=e.upperFirst=e.each=e.mix=e.isArray=e.isObject=e.isString=e.isFunction=e.isNil=e.isBrowser=e.removeFromArray=void 0,e.removeFromArray=function(t,e){var n=t.indexOf(e);-1!==n&&t.splice(n,1);},e.isBrowser="undefined"!=typeof window&&void 0!==window.document;var r=n(0);Object.defineProperty(e,"isNil",{enumerable:!0,get:function get(){return r.isNil;}}),Object.defineProperty(e,"isFunction",{enumerable:!0,get:function get(){return r.isFunction;}}),Object.defineProperty(e,"isString",{enumerable:!0,get:function get(){return r.isString;}}),Object.defineProperty(e,"isObject",{enumerable:!0,get:function get(){return r.isObject;}}),Object.defineProperty(e,"isArray",{enumerable:!0,get:function get(){return r.isArray;}}),Object.defineProperty(e,"mix",{enumerable:!0,get:function get(){return r.mix;}}),Object.defineProperty(e,"each",{enumerable:!0,get:function get(){return r.each;}}),Object.defineProperty(e,"upperFirst",{enumerable:!0,get:function get(){return r.upperFirst;}}),e.isParent=function(t,e){if(t.isCanvas())return!0;for(var n=e.getParent(),r=!1;n;){if(n===t){r=!0;break;}n=n.getParent();}return r;},e.isAllowCapture=function(t){return t.cfg.visible&&t.cfg.capture;};},18:function _(t,e,n){"use strict";var r=n(75),i=Object(r.getColorsWithSubjectColor)("rgb(95, 149, 255)","rgb(255, 255, 255)");e.a={version:"0.0.16",rootContainerClassName:"root-container",uiContainerClassName:"ui-container",waterContainerClassName:"water-container",nodeContainerClassName:"node-container",edgeContainerClassName:"edge-container",comboContainerClassName:"combo-container",delegateContainerClassName:"delegate-container",defaultLoopPosition:"top",nodeLabel:{style:{fill:"#000",fontSize:12,textAlign:"center",textBaseline:"middle"},offset:4},defaultNode:{type:"circle",style:{lineWidth:1,stroke:i.mainStroke,fill:i.mainFill},size:20,color:i.mainStroke,linkPoints:{size:8,lineWidth:1,fill:i.activeFill,stroke:i.activeStroke}},nodeStateStyles:{active:{fill:i.activeFill,stroke:i.activeStroke,lineWidth:2,shadowColor:i.mainStroke,shadowBlur:10},selected:{fill:i.selectedFill,stroke:i.selectedStroke,lineWidth:4,shadowColor:i.selectedStroke,shadowBlur:10,"text-shape":{fontWeight:500}},highlight:{fill:i.highlightFill,stroke:i.highlightStroke,lineWidth:2,"text-shape":{fontWeight:500}},inactive:{fill:i.inactiveFill,stroke:i.inactiveStroke,lineWidth:1},disable:{fill:i.disableFill,stroke:i.disableStroke,lineWidth:1}},edgeLabel:{style:{fill:"rgb(0, 0, 0)",textAlign:"center",textBaseline:"middle",fontSize:12}},defaultEdge:{type:"line",size:1,style:{stroke:i.edgeMainStroke,lineAppendWidth:2},color:i.edgeMainStroke},edgeStateStyles:{active:{stroke:i.edgeActiveStroke,lineWidth:1},selected:{stroke:i.edgeSelectedStroke,lineWidth:2,shadowColor:i.edgeSelectedStroke,shadowBlur:10,"text-shape":{fontWeight:500}},highlight:{stroke:i.edgeHighlightStroke,lineWidth:2,"text-shape":{fontWeight:500}},inactive:{stroke:i.edgeInactiveStroke,lineWidth:1},disable:{stroke:i.edgeDisableStroke,lineWidth:1}},comboLabel:{style:{fill:"rgb(0, 0, 0)",textBaseline:"middle",fontSize:12},refY:10,refX:10},defaultCombo:{type:"circle",style:{fill:i.comboMainFill,lineWidth:1,stroke:i.comboMainStroke,r:5,width:20,height:10},size:[20,5],color:i.comboMainStroke,padding:[25,20,15,20]},comboStateStyles:{active:{stroke:i.comboActiveStroke,lineWidth:1,fill:i.comboActiveFill},selected:{stroke:i.comboSelectedStroke,lineWidth:2,fill:i.comboSelectedFill,shadowColor:i.comboSelectedStroke,shadowBlur:10,"text-shape":{fontWeight:500}},highlight:{stroke:i.comboHighlightStroke,lineWidth:2,fill:i.comboHighlightFill,"text-shape":{fontWeight:500}},inactive:{stroke:i.comboInactiveStroke,fill:i.comboInactiveFill,lineWidth:1},disable:{stroke:i.comboDisableStroke,fill:i.comboDisableFill,lineWidth:1}},delegateStyle:{fill:"#F3F9FF",fillOpacity:0.5,stroke:"#1890FF",strokeOpacity:0.9,lineDash:[5,5]},textWaterMarkerConfig:{width:150,height:100,compatible:!1,text:{x:0,y:60,lineHeight:20,rotate:20,fontSize:14,fontFamily:"Microsoft YaHei",fill:"rgba(0, 0, 0, 0.1)",baseline:"Middle"}},imageWaterMarkerConfig:{image:{x:0,y:0,width:30,height:20,rotate:0}},waterMarkerImage:"https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg"};},180:function _(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getOffScreenContext=void 0;var r=null;e.getOffScreenContext=function(){if(!r){var t=document.createElement("canvas");t.width=1,t.height=1,r=t.getContext("2d");}return r;};},181:function _(t,e,n){"use strict";var r=n(182),i=n(183),o=Object.hasOwnProperty,a={};for(var s in r){o.call(r,s)&&(a[r[s]]=s);}var c=t.exports={to:{},get:{}};function u(t,e,n){return Math.min(Math.max(e,t),n);}function h(t){var e=Math.round(t).toString(16).toUpperCase();return e.length<2?"0"+e:e;}c.get=function(t){var e,n;switch(t.substring(0,3).toLowerCase()){case"hsl":e=c.get.hsl(t),n="hsl";break;case"hwb":e=c.get.hwb(t),n="hwb";break;default:e=c.get.rgb(t),n="rgb";}return e?{model:n,value:e}:null;},c.get.rgb=function(t){if(!t)return null;var e,n,i,a,s=[0,0,0,1];if(n=t.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)){for(a=n[2],n=n[1],i=0;i<3;i++){e=2*i,s[i]=parseInt(n.slice(e,e+2),16);}a&&(s[3]=parseInt(a,16)/255);}else if(n=t.match(/^#([a-f0-9]{3,4})$/i)){for(a=(n=n[1])[3],i=0;i<3;i++){s[i]=parseInt(n[i]+n[i],16);}a&&(s[3]=parseInt(a+a,16)/255);}else if(n=t.match(/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)){for(i=0;i<3;i++){s[i]=parseInt(n[i+1],0);}n[4]&&(n[5]?s[3]=0.01*parseFloat(n[4]):s[3]=parseFloat(n[4]));}else{if(!(n=t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)))return(n=t.match(/^(\w+)$/))?"transparent"===n[1]?[0,0,0,0]:o.call(r,n[1])?((s=r[n[1]])[3]=1,s):null:null;for(i=0;i<3;i++){s[i]=Math.round(2.55*parseFloat(n[i+1]));}n[4]&&(n[5]?s[3]=0.01*parseFloat(n[4]):s[3]=parseFloat(n[4]));}for(i=0;i<3;i++){s[i]=u(s[i],0,255);}return s[3]=u(s[3],0,1),s;},c.get.hsl=function(t){if(!t)return null;var e,n=t.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);return n?(e=parseFloat(n[4]),[(parseFloat(n[1])%360+360)%360,u(parseFloat(n[2]),0,100),u(parseFloat(n[3]),0,100),u(isNaN(e)?1:e,0,1)]):null;},c.get.hwb=function(t){if(!t)return null;var e,n=t.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);return n?(e=parseFloat(n[4]),[(parseFloat(n[1])%360+360)%360,u(parseFloat(n[2]),0,100),u(parseFloat(n[3]),0,100),u(isNaN(e)?1:e,0,1)]):null;},c.to.hex=function(){var t=i(arguments);return"#"+h(t[0])+h(t[1])+h(t[2])+(t[3]<1?h(Math.round(255*t[3])):"");},c.to.rgb=function(){var t=i(arguments);return t.length<4||1===t[3]?"rgb("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+")":"rgba("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+", "+t[3]+")";},c.to.rgb.percent=function(){var t=i(arguments),e=Math.round(t[0]/255*100),n=Math.round(t[1]/255*100),r=Math.round(t[2]/255*100);return t.length<4||1===t[3]?"rgb("+e+"%, "+n+"%, "+r+"%)":"rgba("+e+"%, "+n+"%, "+r+"%, "+t[3]+")";},c.to.hsl=function(){var t=i(arguments);return t.length<4||1===t[3]?"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)":"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+t[3]+")";},c.to.hwb=function(){var t=i(arguments),e="";return t.length>=4&&1!==t[3]&&(e=", "+t[3]),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+e+")";},c.to.keyword=function(t){return a[t.slice(0,3)];};},182:function _(t,e,n){"use strict";t.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]};},183:function _(t,e,n){"use strict";var r=n(184),i=Array.prototype.concat,o=Array.prototype.slice,a=t.exports=function(t){var e,n,a,s=[];for(e=0,n=t.length;e<n;e++){a=t[e],r(a)?s=i.call(s,o.call(a)):s.push(a);}return s;};a.wrap=function(t){return function(){return t(a(arguments));};};},184:function _(t,e,n){"use strict";t.exports=function(t){return!(!t||"string"==typeof t)&&(t instanceof Array||Array.isArray(t)||t.length>=0&&(t.splice instanceof Function||Object.getOwnPropertyDescriptor(t,t.length-1)&&"String"!==t.constructor.name));};},185:function _(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function i(t){return(i="function"==typeof Symbol&&"symbol"==r(Symbol.iterator)?function(t){return r(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":r(t);})(t);}var o=n(100),a=n(187),s={};Object.keys(o).forEach(function(t){s[t]={},Object.defineProperty(s[t],"channels",{value:o[t].channels}),Object.defineProperty(s[t],"labels",{value:o[t].labels});var e=a(t);Object.keys(e).forEach(function(n){var r=e[n];s[t][n]=function(t){var e=function e(_e2){if(null==_e2)return _e2;arguments.length>1&&(_e2=Array.prototype.slice.call(arguments));var n,r,o=t(_e2);if("object"===i(o))for(n=o.length,r=0;r<n;r++){o[r]=Math.round(o[r]);}return o;};return"conversion"in t&&(e.conversion=t.conversion),e;}(r),s[t][n].raw=function(t){var e=function e(_e3){return null==_e3?_e3:(arguments.length>1&&(_e3=Array.prototype.slice.call(arguments)),t(_e3));};return"conversion"in t&&(e.conversion=t.conversion),e;}(r);});}),t.exports=s;},186:function _(t,e,n){"use strict";t.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]};},187:function _(t,e,n){"use strict";var r=n(100);function i(t){var e,n,i,o,a,s,c=function(){var t,e,n={},i=Object.keys(r);for(t=i.length,e=0;e<t;e++){n[i[e]]={distance:-1,parent:null};}return n;}(),u=[t];for(c[t].distance=0;u.length;){for(e=u.pop(),i=(n=Object.keys(r[e])).length,o=0;o<i;o++){-1===(s=c[a=n[o]]).distance&&(s.distance=c[e].distance+1,s.parent=e,u.unshift(a));}}return c;}function o(t,e){return function(n){return e(t(n));};}function a(t,e){for(var n=[e[t].parent,t],i=r[e[t].parent][t],a=e[t].parent;e[a].parent;){n.unshift(e[a].parent),i=o(r[e[a].parent][a],i),a=e[a].parent;}return i.conversion=n,i;}t.exports=function(t){var e,n,r,o=i(t),s={},c=Object.keys(o);for(e=c.length,n=0;n<e;n++){null!==o[r=c[n]].parent&&(s[r]=a(r,o));}return s;};},188:function _(t,e,n){"use strict";var r=Object.create?function(t,e,n,r){void 0===r&&(r=n),Object.defineProperty(t,r,{enumerable:!0,get:function get(){return e[n];}});}:function(t,e,n,r){void 0===r&&(r=n),t[r]=e[n];},i=function i(t,e){for(var n in t){"default"===n||Object.prototype.hasOwnProperty.call(e,n)||r(e,t,n);}};Object.defineProperty(e,"__esModule",{value:!0}),i(n(189),e),i(n(190),e),i(n(191),e),i(n(192),e),i(n(193),e),i(n(194),e);},189:function _(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.camelize=e.isString=void 0;e.isString=function(t){return"string"==typeof t;};var r=/-(\w)/g;e.camelize=function(t){var e=Object.create(null);return function(n){return e[n]||(e[n]=t(n));};}(function(t){return t.replace(r,function(t,e){return e?e.toUpperCase():"";});});},190:function _(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isArray=void 0,e.isArray=Array.isArray;},191:function _(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.toNumber=e.isNaN=e.isNumber=void 0;e.isNumber=function(t){return"number"==typeof t;};e.isNaN=function(t){return Number.isNaN(Number(t));};e.toNumber=function(t){var n=parseFloat(t);return e.isNaN(n)?t:n;};},192:function _(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.traverseTreeUp=e.scaleMatrix=e.getAdjMatrix=e.floydWarshall=e.getDegree=void 0;e.getDegree=function(t,e,n){var r,i=[];for(r=0;r<t;r++){i[r]=0;}return n?(n.forEach(function(t){t.source&&(i[e[t.source]]+=1),t.target&&(i[e[t.target]]+=1);}),i):i;};e.floydWarshall=function(t){var e,n=[],r=t.length;for(i=0;i<r;i+=1){for(n[i]=[],o=0;o<r;o+=1){i===o?n[i][o]=0:0!==t[i][o]&&t[i][o]?n[i][o]=t[i][o]:n[i][o]=1/0;}}for(e=0;e<r;e+=1){for(var i=0;i<r;i+=1){for(var o=0;o<r;o+=1){n[i][o]>n[i][e]+n[e][o]&&(n[i][o]=n[i][e]+n[e][o]);}}}return n;};e.getAdjMatrix=function(t,e){var n=t.nodes,r=t.edges,i=[],o={};if(!n)throw new Error("invalid nodes data!");return n&&n.forEach(function(t,e){o[t.id]=e,i.push([]);}),r&&r.forEach(function(t){var n=t.source,r=t.target,a=o[n],s=o[r];i[a][s]=1,e||(i[s][a]=1);}),i;};e.scaleMatrix=function(t,e){var n=[];return t.forEach(function(t){var r=[];t.forEach(function(t){r.push(t*e);}),n.push(r);}),n;};e.traverseTreeUp=function(t,e){"function"==typeof e&&function t(e,n){var r;if(e&&e.children)for(r=e.children.length-1;r>=0;r--){if(!t(e.children[r],n))return;}return!!n(e);}(t,e);};},193:function _(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function i(t){return(i="function"==typeof Symbol&&"symbol"==r(Symbol.iterator)?function(t){return r(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":r(t);})(t);}var _o2=function o(){return(_o2=Object.assign||function(t){var e,n,r;for(n=1,r=arguments.length;n<r;n++){for(var i in e=arguments[n]){Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);}}return t;}).apply(this,arguments);};Object.defineProperty(e,"__esModule",{value:!0}),e.clone=e.isObject=void 0;e.isObject=function(t){return null!==t&&"object"===i(t);};e.clone=function(t){var n,r;return null===t?t:t instanceof Date?new Date(t.getTime()):t instanceof Array?(n=[],t.forEach(function(t){n.push(t);}),n.map(function(t){return e.clone(t);})):"object"===i(t)&&t!=={}?(r=_o2({},t),Object.keys(r).forEach(function(t){r[t]=e.clone(r[t]);}),r):t;};},194:function _(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isFunction=void 0;e.isFunction=function(t){return"function"==typeof t;};},195:function _(t,e){(function(e){t.exports=e;}).call(this,{});},2:function _(t,e,n){"use strict";n.d(e,"d",function(){return Le;}),n.d(e,"g",function(){return _e;}),n.d(e,"f",function(){return De;}),n.d(e,"l",function(){return We;}),n.d(e,"j",function(){return Ve;}),n.d(e,"b",function(){return we;}),n.d(e,"h",function(){return Ye;}),n.d(e,"k",function(){return qe;}),n.d(e,"i",function(){return Ge;}),n.d(e,"c",function(){return Xe;}),n.d(e,"a",function(){return ze;}),n.d(e,"e",function(){return He;});var r={};n.r(r),n.d(r,"compare",function(){return m;}),n.d(r,"getLineIntersect",function(){return x;}),n.d(r,"getRectIntersectByPoint",function(){return w;}),n.d(r,"getCircleIntersectByPoint",function(){return S;}),n.d(r,"getEllipseIntersectByPoint",function(){return O;}),n.d(r,"applyMatrix",function(){return M;}),n.d(r,"invertMatrix",function(){return k;}),n.d(r,"getCircleCenterByPoints",function(){return C;}),n.d(r,"distance",function(){return E;}),n.d(r,"scaleMatrix",function(){return j;}),n.d(r,"floydWarshall",function(){return P;}),n.d(r,"getAdjMatrix",function(){return A;}),n.d(r,"translate",function(){return I;}),n.d(r,"move",function(){return T;}),n.d(r,"scale",function(){return N;}),n.d(r,"rotate",function(){return B;}),n.d(r,"getDegree",function(){return L;}),n.d(r,"isPointInPolygon",function(){return _;}),n.d(r,"intersectBBox",function(){return R;}),n.d(r,"isPolygonsIntersect",function(){return F;}),n.d(r,"Line",function(){return Y;}),n.d(r,"getBBoxBoundLine",function(){return X;}),n.d(r,"itemIntersectByLine",function(){return W;}),n.d(r,"fractionToLine",function(){return q;}),n.d(r,"getPointsCenter",function(){return V;}),n.d(r,"squareDist",function(){return G;}),n.d(r,"pointLineSquareDist",function(){return H;}),n.d(r,"isPointsOverlap",function(){return U;}),n.d(r,"pointRectSquareDist",function(){return Z;}),n.d(r,"pointLineDistance",function(){return K;});var i={};n.r(i),n.d(i,"getBBox",function(){return ut;}),n.d(i,"getLoopCfgs",function(){return ht;}),n.d(i,"getLabelPosition",function(){return lt;}),n.d(i,"traverseTree",function(){return dt;}),n.d(i,"traverseTreeUp",function(){return pt;}),n.d(i,"getLetterWidth",function(){return gt;}),n.d(i,"getTextSize",function(){return vt;}),n.d(i,"plainCombosToTrees",function(){return yt;}),n.d(i,"reconstructTree",function(){return mt;}),n.d(i,"getComboBBox",function(){return bt;}),n.d(i,"shouldRefreshEdge",function(){return xt;}),n.d(i,"cloneBesidesImg",function(){return wt;});var o={};n.r(o),n.d(o,"uniqueId",function(){return Ct;}),n.d(o,"formatPadding",function(){return Et;}),n.d(o,"cloneEvent",function(){return jt;}),n.d(o,"isViewportChanged",function(){return Pt;}),n.d(o,"isNaN",function(){return At;}),n.d(o,"calculationItemsBBox",function(){return It;}),n.d(o,"processParallelEdges",function(){return Tt;});var a={};n.r(a),n.d(a,"getSpline",function(){return te;}),n.d(a,"getControlPoint",function(){return ee;}),n.d(a,"pointsToPolygon",function(){return ne;}),n.d(a,"pathToPoints",function(){return re;}),n.d(a,"getClosedSpline",function(){return ie;}),n.d(a,"roundedHull",function(){return ce;}),n.d(a,"paddedHull",function(){return ue;});var s={};n.r(s),n.d(s,"defaultSubjectColors",function(){return Re;});var c=n(0),u={getDefaultCfg:function getDefaultCfg(){return{};},getEvents:function getEvents(){return{};},updateCfg:function updateCfg(t){return Object.assign(this,t),!0;},shouldBegin:function shouldBegin(){return!0;},shouldUpdate:function shouldUpdate(){return!0;},shouldEnd:function shouldEnd(){return!0;},bind:function bind(t){var e=this.events;this.graph=t,"drag-canvas"!==this.type&&"brush-select"!==this.type&&"lasso-select"!==this.type||t.get("canvas").set("draggable",!0),Object(c.each)(e,function(e,n){t.on(n,e);});},unbind:function unbind(t){var e=this.events;"drag-canvas"!==this.type&&"brush-select"!==this.type&&"lasso-select"!==this.type||t.get("canvas").set("draggable",!1),Object(c.each)(e,function(e,n){t.off(n,e);});},get:function get(t){return this[t];},set:function set(t,e){return this[t]=e,this;}},h=function(){function t(){}return t.registerBehavior=function(e,n){if(!n)throw new Error("please specify handler for this behavior: ".concat(e));var r=Object(c.clone)(u);Object.assign(r,n);var i=function i(t){var e=this;Object.assign(this,this.getDefaultCfg(),t);var n=this.getEvents();this.events=null;var r={};n&&(Object(c.each)(n,function(t,n){r[n]=Object(c.wrapBehavior)(e,t);}),this.events=r);};i.prototype=r,t.types[e]=i;},t.hasBehavior=function(e){return!!t.types[e];},t.getBehavior=function(e){return t.types[e];},t.types={},t;}(),l=h,f=n(1),d=n(73),p=n(76),g=n(3),v=n(27),y=g.a.transform,m=function m(t){return function(e,n){return e[t]-n[t];};},b=function b(t,e,n){return t>=e&&t<=n;},x=function x(t,e,n,r){var i=n.x-t.x,o=n.y-t.y,a=e.x-t.x,s=e.y-t.y,c=r.x-n.x,u=r.y-n.y,h=a*u-s*c,l=1/h;if(h*h>1e-4*(a*a+s*s)*(c*c+u*u)){var f=(i*u-o*c)*l,d=(i*s-o*a)*l;return b(f,0,1)&&b(d,0,1)?{x:t.x+f*a,y:t.y+f*s}:null;}return null;},w=function w(t,e){var n=t.x,r=t.y,i=t.width,o=t.height,a=[],s={x:n+i/2,y:r+o/2};a.push({x:n,y:r}),a.push({x:n+i,y:r}),a.push({x:n+i,y:r+o}),a.push({x:n,y:r+o}),a.push({x:n,y:r});for(var c=null,u=1;u<a.length&&!(c=x(a[u-1],a[u],s,e));u++){;}return c;},S=function S(t,e){var n=t.x,r=t.y,i=t.r,o=e.x-n,a=e.y-r;if(Math.sqrt(o*o+a*a)<i)return null;var s=Math.sign(o),c=Math.sign(a),u=Math.atan(a/o);return{x:n+Math.abs(i*Math.cos(u))*s,y:r+Math.abs(i*Math.sin(u))*c};},O=function O(t,e){var n=t.rx,r=t.ry,i=t.x,o=t.y,a=e.x-i,s=e.y-o,c=Math.atan2(s/r,a/n);return c<0&&(c+=2*Math.PI),{x:i+n*Math.cos(c),y:o+r*Math.sin(c)};},M=function M(t,e,n){void 0===n&&(n=1);var r=[t.x,t.y,n];return e&&!isNaN(e[0])||(e=[1,0,0,0,1,0,0,0,1]),g.d.transformMat3(r,r,e),{x:r[0],y:r[1]};},k=function k(t,e,n){void 0===n&&(n=1),e&&!isNaN(e[0])||(e=[1,0,0,0,1,0,0,0,1]);var r=g.b.invert([1,0,0,0,1,0,0,0,1],e);r||(r=[1,0,0,0,1,0,0,0,1]);var i=[t.x,t.y,n];return g.d.transformMat3(i,i,r),{x:i[0],y:i[1]};},C=function C(t,e,n){var r=t.x-e.x,i=t.y-e.y,o=t.x-n.x,a=t.y-n.y,s=(t.x*t.x-e.x*e.x-e.y*e.y+t.y*t.y)/2,c=(t.x*t.x-n.x*n.x-n.y*n.y+t.y*t.y)/2,u=i*o-r*a;return{x:-(a*s-i*c)/u,y:-(r*c-o*s)/u};},E=function E(t,e){var n=t.x-e.x,r=t.y-e.y;return Math.sqrt(n*n+r*r);},j=function j(t,e){var n=[];return t.forEach(function(t){var r=[];t.forEach(function(t){r.push(t*e);}),n.push(r);}),n;},P=function P(t){for(var e=[],n=t.length,r=0;r<n;r+=1){e[r]=[];for(var i=0;i<n;i+=1){r===i?e[r][i]=0:0!==t[r][i]&&t[r][i]?e[r][i]=t[r][i]:e[r][i]=1/0;}}for(var o=0;o<n;o+=1){for(r=0;r<n;r+=1){for(i=0;i<n;i+=1){e[r][i]>e[r][o]+e[o][i]&&(e[r][i]=e[r][o]+e[o][i]);}}}return e;},A=function A(t,e){var n=t.nodes,r=t.edges,i=[],o={};if(!n)throw new Error("invalid nodes data!");return n&&n.forEach(function(t,e){o[t.id]=e;i.push([]);}),r&&r.forEach(function(t){var n=t.source,r=t.target,a=o[n],s=o[r];i[a][s]=1,e||(i[s][a]=1);}),i;},I=function I(t,e){t.translate(e.x,e.y);},T=function T(t,e){var n=t.getMatrix();n||(n=[1,0,0,0,1,0,0,0,1]);var r=t.getCanvasBBox(),i=e.x-r.minX,o=e.y-r.minY,a=y(n,[["t",i,o]]);t.setMatrix(a);},N=function N(t,e){var n=t.getMatrix();n||(n=[1,0,0,0,1,0,0,0,1]);var r=e;Object(c.isArray)(e)||(r=[e,e]),Object(c.isArray)(e)&&1===e.length&&(r=[e[0],e[0]]),n=y(n,[["s",r[0],r[1]]]),t.setMatrix(n);},B=function B(t,e){var n=t.getMatrix();n||(n=[1,0,0,0,1,0,0,0,1]),n=y(n,[["r",e]]),t.setMatrix(n);},L=function L(t,e,n){for(var r=[],i=0;i<t;i++){r[i]=0;}return n.forEach(function(t){t.source&&(r[e[t.source]]+=1),t.target&&(r[e[t.target]]+=1);}),r;};function D(t,e,n){return(n[0]-t[0])*(e[1]-t[1])==(e[0]-t[0])*(n[1]-t[1])&&Math.min(t[0],e[0])<=n[0]&&n[0]<=Math.max(t[0],e[0])&&Math.min(t[1],e[1])<=n[1]&&n[1]<=Math.max(t[1],e[1]);}var _=function _(t,e,n){var r=!1,i=t.length;function o(t){return Math.abs(t)<1e-6?0:t<0?-1:1;}if(i<=2)return!1;for(var a=0;a<i;a++){var s=t[a],c=t[(a+1)%i];if(D(s,c,[e,n]))return!0;o(s[1]-n)>0!=o(c[1]-n)>0&&o(e-(n-s[1])*(s[0]-c[0])/(s[1]-c[1])-s[0])<0&&(r=!r);}return r;},R=function R(t,e){return!(e.minX>t.maxX||e.maxX<t.minX||e.minY>t.maxY||e.maxY<t.minY);},F=function F(t,e){var n=function n(t){var e=t.map(function(t){return t[0];}),n=t.map(function(t){return t[1];});return{minX:Math.min.apply(null,e),maxX:Math.max.apply(null,e),minY:Math.min.apply(null,n),maxY:Math.max.apply(null,n)};},r=function r(t){for(var e=[],n=t.length,r=0;r<n-1;r++){var i=t[r],o=t[r+1];e.push({from:{x:i[0],y:i[1]},to:{x:o[0],y:o[1]}});}if(e.length>1){var a=t[0],s=t[n-1];e.push({from:{x:s[0],y:s[1]},to:{x:a[0],y:a[1]}});}return e;};if(t.length<2||e.length<2)return!1;var i=n(t),o=n(e);if(!R(i,o))return!1;var a=!1;if(Object(c.each)(e,function(e){if(_(t,e[0],e[1]))return a=!0,!1;}),a)return!0;if(Object(c.each)(t,function(t){if(_(e,t[0],t[1]))return a=!0,!1;}),a)return!0;var s=r(t),u=r(e),h=!1;return Object(c.each)(u,function(t){if(function(t,e){var n=!1;return Object(c.each)(t,function(t){if(x(t.from,t.to,e.from,e.to))return n=!0,!1;}),n;}(s,t))return h=!0,!1;}),h;},Y=function(){function t(t,e,n,r){this.x1=t,this.y1=e,this.x2=n,this.y2=r;}return t.prototype.getBBox=function(){var t=Math.min(this.x1,this.x2),e=Math.min(this.y1,this.y2),n=Math.max(this.x1,this.x2),r=Math.max(this.y1,this.y2);return{x:t,y:e,minX:t,minY:e,maxX:n,maxY:r,width:n-t,height:r-e};},t;}(),X=function X(t,e){return{top:[t.minX,t.minY,t.maxX,t.minY],left:[t.minX,t.minY,t.minX,t.maxY],bottom:[t.minX,t.maxY,t.maxX,t.maxY],right:[t.maxX,t.minY,t.maxX,t.maxY]}[e];},z=function z(t,e){var n=(e.x2-e.x1)*(t.y1-e.y1)-(e.y2-e.y1)*(t.x1-e.x1),r=(t.x2-t.x1)*(t.y1-e.y1)-(t.y2-t.y1)*(t.x1-e.x1),i=(e.y2-e.y1)*(t.x2-t.x1)-(e.x2-e.x1)*(t.y2-t.y1);if(i){var o=n/i,a=r/i;if(o>=0&&o<=1&&a>=0&&a<=1)return o;}return Number.POSITIVE_INFINITY;},W=function W(t,e){for(var n=["top","left","bottom","right"],r=t.getBBox(),i=0,o=[],a=0;a<4;a++){var s=X(r,n[a]),c=s[0],u=s[1],h=s[2],l=s[3];o[a]=x({x:e.x1,y:e.y1},{x:e.x2,y:e.y2},{x:c,y:u},{x:h,y:l}),o[a]&&(i+=1);}return[o,i];},q=function q(t,e){for(var n=["top","left","bottom","right"],r=t.getBBox(),i=Number.POSITIVE_INFINITY,o=0,a=0;a<4;a++){var s=X(r,n[a]),c=s[0],u=s[1],h=s[2],l=s[3],f=z(e,new Y(c,u,h,l));(f=Math.abs(f-0.5))>=0&&f<=1&&(o+=1,i=f<i?f:i);}return 0===o?-1:i;},V=function V(t){var e=0,n=0;if(t.length>0){for(var r=0,i=t;r<i.length;r++){var o=i[r];e+=o.x,n+=o.y;}e/=t.length,n/=t.length;}return{x:e,y:n};},G=function G(t,e){return Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2);},H=function H(t,e){var n,r=e.x1,i=e.y1,o=e.x2-r,a=e.y2-i,s=t.x-r,c=t.y-i,u=s*o+c*a;n=u<=0||(u=(s=o-s)*o+(c=a-c)*a)<=0?0:u*u/(o*o+a*a);var h=s*s+c*c-n;return h<0&&(h=0),h;},U=function U(t,e,n){return void 0===n&&(n=0.001),Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)<Math.pow(n,2);},Z=function Z(t,e){var n=t.x<e.x,r=t.x>e.x+e.width,i=t.y>e.y+e.height,o=t.y<e.y;if(!(n||r||i||o))return 0;if(i&&!n&&!r)return Math.pow(e.y+e.height-t.y,2);if(o&&!n&&!r)return Math.pow(t.y-e.y,2);if(n&&!i&&!o)return Math.pow(e.x-t.x,2);if(r&&!i&&!o)return Math.pow(e.x+e.width-t.x,2);var a=Math.min(Math.abs(e.x-t.x),Math.abs(e.x+e.width-t.x)),s=Math.min(Math.abs(e.y-t.y),Math.abs(e.y+e.height-t.y));return a*a+s*s;},K=function K(t,e){var n=t[0],r=t[1],i=t[2],o=t[3],a=e.x,s=e.y,c=[i-n,o-r];if(g.c.exactEquals(c,[0,0]))return NaN;var u=[-c[1],c[0]];g.c.normalize(u,u);var h=[a-n,s-r];return Math.abs(g.c.dot(h,u));},$="rgb(95, 149, 255)",Q="rgb(253, 253, 253)",J="rgb(247, 250, 255)",tt="rgb(224, 224, 224)",et="rgb(224, 224, 224)",nt={version:"0.0.2",rootContainerClassName:"root-container",nodeContainerClassName:"node-container",edgeContainerClassName:"edge-container",comboContainerClassName:"combo-container",delegateContainerClassName:"delegate-container",defaultLoopPosition:"top",nodeLabel:{style:{fill:"#000",fontSize:12,textAlign:"center",textBaseline:"middle"},offset:4},defaultNode:{type:"circle",style:{lineWidth:1,stroke:$,fill:"rgb(239, 244, 255)"},size:20,color:$,linkPoints:{size:8,lineWidth:1,fill:J,stroke:$}},nodeStateStyles:{active:{fill:J,stroke:$,lineWidth:2,shadowColor:$,shadowBlur:10},selected:{fill:"rgb(255, 255, 255)",stroke:$,lineWidth:4,shadowColor:$,shadowBlur:10,"text-shape":{fontWeight:500}},highlight:{fill:"rgb(223, 234, 255)",stroke:"#4572d9",lineWidth:2,"text-shape":{fontWeight:500}},inactive:{fill:"rgb(247, 250, 255)",stroke:"rgb(191, 213, 255)",lineWidth:1},disable:{fill:"rgb(250, 250, 250)",stroke:"rgb(224, 224, 224)",lineWidth:1}},edgeLabel:{style:{fill:"rgb(0, 0, 0)",textAlign:"center",textBaseline:"middle",fontSize:12}},defaultEdge:{type:"line",size:1,style:{stroke:tt,lineAppendWidth:2},color:tt},edgeStateStyles:{active:{stroke:$,lineWidth:1},selected:{stroke:$,lineWidth:2,shadowColor:$,shadowBlur:10,"text-shape":{fontWeight:500}},highlight:{stroke:$,lineWidth:2,"text-shape":{fontWeight:500}},inactive:{stroke:"rgb(234, 234, 234)",lineWidth:1},disable:{stroke:"rgb(245, 245, 245)",lineWidth:1}},comboLabel:{style:{fill:"rgb(0, 0, 0)",textBaseline:"middle",fontSize:12},refY:10,refX:10},defaultCombo:{type:"circle",style:{fill:Q,lineWidth:1,stroke:et,r:5,width:20,height:10},size:[20,5],color:et,padding:[25,20,15,20]},comboStateStyles:{active:{stroke:$,lineWidth:1,fill:"rgb(247, 250, 255)"},selected:{stroke:$,lineWidth:2,fill:Q,shadowColor:$,shadowBlur:10,"text-shape":{fontWeight:500}},highlight:{stroke:"#4572d9",lineWidth:2,fill:Q,"text-shape":{fontWeight:500}},inactive:{stroke:"rgb(224, 224, 224)",fill:Q,lineWidth:1},disable:{stroke:"rgb(234, 234, 234)",fill:"rgb(250, 250, 250)",lineWidth:1}},delegateStyle:{fill:"#F3F9FF",fillOpacity:0.5,stroke:"#1890FF",strokeOpacity:0.9,lineDash:[5,5]}},rt={" ":0.3329986572265625,a:0.5589996337890625,A:0.6569992065429687,b:0.58599853515625,B:0.6769989013671875,c:0.5469985961914062,C:0.7279998779296875,d:0.58599853515625,D:0.705999755859375,e:0.554998779296875,E:0.63699951171875,f:0.37299957275390627,F:0.5769989013671875,g:0.5909988403320312,G:0.7479995727539063,h:0.555999755859375,H:0.7199996948242188,i:0.255999755859375,I:0.23699951171875,j:0.26699981689453123,J:0.5169998168945312,k:0.5289993286132812,K:0.6899993896484375,l:0.23499908447265624,L:0.5879989624023437,m:0.854998779296875,M:0.8819992065429687,n:0.5589996337890625,N:0.7189987182617188,o:0.58599853515625,O:0.7669998168945312,p:0.58599853515625,P:0.6419998168945312,q:0.58599853515625,Q:0.7669998168945312,r:0.3649993896484375,R:0.6759994506835938,s:0.504998779296875,S:0.6319992065429687,t:0.354998779296875,T:0.6189987182617187,u:0.5599990844726562,U:0.7139999389648437,v:0.48199920654296874,V:0.6389999389648438,w:0.754998779296875,W:0.929998779296875,x:0.5089996337890625,X:0.63699951171875,y:0.4959991455078125,Y:0.66199951171875,z:0.48699951171875,Z:0.6239990234375,0:0.6,1:0.40099945068359377,2:0.6,3:0.6,4:0.6,5:0.6,6:0.6,7:0.5469985961914062,8:0.6,9:0.6,"[":0.3329986572265625,"]":0.3329986572265625,",":0.26399993896484375,".":0.26399993896484375,";":0.26399993896484375,":":0.26399993896484375,"{":0.3329986572265625,"}":0.3329986572265625,"\\":0.5,"|":0.19499969482421875,"=":0.604998779296875,"+":0.604998779296875,"-":0.604998779296875,_:0.5,"`":0.3329986572265625," ~":0.8329986572265625,"!":0.3329986572265625,"@":0.8579986572265625,"#":0.6,$:0.6,"%":0.9699996948242188,"^":0.517999267578125,"&":0.7259994506835937,"*":0.505999755859375,"(":0.3329986572265625,")":0.3329986572265625,"<":0.604998779296875,">":0.604998779296875,"/":0.5,"?":0.53699951171875},it=Math.PI,ot=Math.sin,at=Math.cos,st=ot(it/8),ct=at(it/8),ut=function ut(t,e){var n=t.getBBox(),r={x:n.minX,y:n.minY},i={x:n.maxX,y:n.maxY};if(e){var o=e.getMatrix();o||(o=[1,0,0,0,1,0,0,0,1]),r=M(r,o),i=M(i,o);}var a=r.x,s=r.y,c=i.x,u=i.y;return{x:a,y:s,minX:a,minY:s,maxX:c,maxY:u,width:c-a,height:u-s};},ht=function ht(t){var e=t.sourceNode||t.targetNode,n=e.get("group").getMatrix();n||(n=[1,0,0,0,1,0,0,0,1]);var r=e.getKeyShape().getBBox(),i=t.loopCfg||{},o=i.dist||2*Math.max(r.width,r.height),a=i.position||nt.defaultLoopPosition,s=[n[6],n[7]],c=[t.startPoint.x,t.startPoint.y],u=[t.endPoint.x,t.endPoint.y],h=r.height/2,l=r.height/2,f=h*st,d=h*ct,p=l*st,v=l*ct;if(c[0]===u[0]&&c[1]===u[1]){switch(a){case"top":c=[s[0]-f,s[1]-d],u=[s[0]+p,s[1]-v];break;case"top-right":h=r.height/2,l=r.width/2,c=[s[0]+(f=h*st),s[1]-(d=h*ct)],u=[s[0]+(v=l*ct),s[1]-(p=l*st)];break;case"right":h=r.width/2,l=r.width/2,c=[s[0]+(d=h*ct),s[1]-(f=h*st)],u=[s[0]+(v=l*ct),s[1]+(p=l*st)];break;case"bottom-right":h=r.width/2,l=r.height/2,c=[s[0]+(d=h*ct),s[1]+(f=h*st)],u=[s[0]+(p=l*st),s[1]+(v=l*ct)];break;case"bottom":h=r.height/2,l=r.height/2,c=[s[0]+(f=h*st),s[1]+(d=h*ct)],u=[s[0]-(p=l*st),s[1]+(v=l*ct)];break;case"bottom-left":h=r.height/2,l=r.width/2,c=[s[0]-(f=h*st),s[1]+(d=h*ct)],u=[s[0]-(v=l*ct),s[1]+(p=l*st)];break;case"left":h=r.width/2,l=r.width/2,c=[s[0]-(d=h*ct),s[1]+(f=h*st)],u=[s[0]-(v=l*ct),s[1]-(p=l*st)];break;case"top-left":h=r.width/2,l=r.height/2,c=[s[0]-(d=h*ct),s[1]-(f=h*st)],u=[s[0]-(p=l*st),s[1]-(v=l*ct)];break;default:h=r.width/2,l=r.width/2,c=[s[0]-(f=h*st),s[1]-(d=h*ct)],u=[s[0]+(p=l*st),s[1]-(v=l*ct)];}if(!1===i.clockwise){var y=[c[0],c[1]];c=[u[0],u[1]],u=[y[0],y[1]];}}var m=[c[0]-s[0],c[1]-s[1]],b=(h+o)/h,x=(l+o)/l;!1===i.clockwise&&(b=(l+o)/l,x=(h+o)/h);var w=g.c.scale([0,0],m,b),S=[s[0]+w[0],s[1]+w[1]],O=[u[0]-s[0],u[1]-s[1]],M=g.c.scale([0,0],O,x),k=[s[0]+M[0],s[1]+M[1]];return t.startPoint={x:c[0],y:c[1]},t.endPoint={x:u[0],y:u[1]},t.controlPoints=[{x:S[0],y:S[1]},{x:k[0],y:k[1]}],t;},lt=function lt(t,e,n,r,i){var o=[],a=t.getPoint(e);if(null===a)return{x:0,y:0,angle:0};if(e<1e-4)o=t.getStartTangent().reverse();else if(e>0.9999)o=t.getEndTangent();else{var s=t.getPoint(e+1e-4);o.push([a.x,a.y]),o.push([s.x,s.y]);}var c=Math.atan2(o[1][1]-o[0][1],o[1][0]-o[0][0]);if(c<0&&(c+=2*it),n&&(a.x+=at(c)*n,a.y+=ot(c)*n),r){var u=c-it/2;c>0.5*it&&c<1.5*it&&(u-=it),a.x+=at(u)*r,a.y+=ot(u)*r;}var h={x:a.x,y:a.y,angle:c};return i?(c>0.5*it&&c<1.5*it&&(c-=it),Object(f.a)({rotate:c},h)):h;},ft=function t(e,n){if(!1===n(e))return!1;if(e&&e.children)for(var r=e.children.length-1;r>=0;r--){if(!t(e.children[r],n))return!1;}return!0;},dt=function dt(t,e){"function"==typeof e&&ft(t,e);},pt=function pt(t,e){"function"==typeof e&&function t(e,n){if(e&&e.children)for(var r=e.children.length-1;r>=0;r--){if(!t(e.children[r],n))return;}return!1!==n(e);}(t,e);},gt=function gt(t,e){return e*(rt[t]||1);},vt=function vt(t,e){var n=0,r=new RegExp("[一-龥]+");return t.split("").forEach(function(t){r.test(t)?n+=e:n+=gt(t,e);}),[n,e];},yt=function yt(t,e){var n=[],r={},i={};t.forEach(function(t){i[t.id]=t;}),t.forEach(function(t,e){var o=Object(c.clone)(t);o.itemType="combo",o.children=void 0,o.parentId===o.id?(console.warn("The parentId for combo ".concat(o.id," can not be the same as the combo's id")),delete o.parentId):o.parentId&&!i[o.parentId]&&(console.warn("The parent combo for combo ".concat(o.id," does not exist!")),delete o.parentId);var a=r[o.id];if(a){if(o.children=a.children,r[o.id]=o,!(a=o).parentId)return void n.push(a);var s=r[a.parentId];if(s)s.children?s.children.push(o):s.children=[o];else{var u={id:a.parentId,children:[a]};r[a.parentId]=u,r[o.id]=o;}}else if(Object(c.isString)(t.parentId)){var h=r[t.parentId];if(h)h.children?h.children.push(o):h.children=[o],r[o.id]=o;else{var l={id:t.parentId,children:[o]};r[l.id]=l,r[o.id]=o;}}else n.push(o),r[o.id]=o;});var o={};(e||[]).forEach(function(t){o[t.id]=t;var e=r[t.comboId];if(e){var n={id:t.id,comboId:t.comboId};e.children?e.children.push(n):e.children=[n],n.itemType="node",r[t.id]=n;}});var a=0;return n.forEach(function(t){t.depth=a+10,ft(t,function(t){var e,n=r[t.id].itemType;e="node"===n?r[t.comboId]:r[t.parentId],t.depth=e&&"node"===n?a+1:a+10,a<t.depth&&(a=t.depth);var i=o[t.id];return i&&(i.depth=t.depth),!0;});}),n;},mt=function mt(t,e,n){var r,i=t,o={root:{children:t}},a=!1,s="root";(t||[]).forEach(function(t){if(!a)return t.id===e?(r=t,"combo"===t.itemType?r.parentId=n:r.comboId=n,void(a=!0)):void dt(t,function(t){return o[t.id]={children:t.children},i=o[t.parentId||t.comboId||"root"].children,!t||!t.removed&&e!==t.id||!i||(s=t.parentId||t.comboId||"root",r=t,"combo"===t.itemType?r.parentId=n:r.comboId=n,a=!0,!1);});});var c=(i=o[s].children)?i.indexOf(r):-1;if(c>-1&&i.splice(c,1),a||(r={id:e,itemType:"node",comboId:n},o[e]={children:void 0}),e){var u=!1;if(n){var h=0;(t||[]).forEach(function(t){u||dt(t,function(t){return n!==t.id||(u=!0,t.children?t.children.push(r):t.children=[r],h=t.depth,"node"===r.itemType?r.depth=h+2:r.depth=h+1,!1);});});}else n&&u||"node"===r.itemType||t.push(r);var l=r.depth;dt(r,function(t){return"node"===t.itemType?l+=2:l+=1,t.depth=l,!0;});}return t;},bt=function bt(t,e){var n={minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0,x:void 0,y:void 0,width:void 0,height:void 0,centerX:void 0,centerY:void 0};return t&&0!==t.length?(t.forEach(function(t){var r=e.findById(t.id);if(r&&r.isVisible()){r.set("bboxCanvasCache",void 0);var i=r.getCanvasBBox();i.x&&n.minX>i.minX&&(n.minX=i.minX),i.y&&n.minY>i.minY&&(n.minY=i.minY),i.x&&n.maxX<i.maxX&&(n.maxX=i.maxX),i.y&&n.maxY<i.maxY&&(n.maxY=i.maxY);}}),n.x=(n.minX+n.maxX)/2,n.y=(n.minY+n.maxY)/2,n.width=n.maxX-n.minX,n.height=n.maxY-n.minY,n.centerX=(n.minX+n.maxX)/2,n.centerY=(n.minY+n.maxY)/2,Object.keys(n).forEach(function(t){n[t]!==1/0&&n[t]!==-1/0||(n[t]=void 0);}),n):n;},xt=function xt(t){var e=Object(c.isNumber)(t.x)||Object(c.isNumber)(t.y)||t.type||t.anchorPoints||t.size;return t.style&&(e=e||Object(c.isNumber)(t.style.r)||Object(c.isNumber)(t.style.width)||Object(c.isNumber)(t.style.height)||Object(c.isNumber)(t.style.rx)||Object(c.isNumber)(t.style.ry)),e;},wt=function wt(t){var e={};return Object.keys(t).forEach(function(n){var r=t[n];if(Object(c.isObject)(r)){var i={};Object.keys(r).forEach(function(t){var e=r[t];("img"!==t||Object(c.isString)(e))&&(i[t]=Object(c.clone)(e));}),e[n]=i;}else e[n]=Object(c.clone)(r);}),e;},St=function St(t){if(!t)return console.error("G6 Error Tips: the data must be defined"),!1;var e=t.nodes,n=t.edges,r=t.combos,i=void 0===r?[]:r;if(!e&&!n){var o=!0;return dt(t,function(t){return!!Object(c.isString)(t.id)||(o=!1,!1);}),o;}var a=(e||[]).find(function(t){return!Object(c.isString)(t.id);});if(a)return console.warn("G6 Warning Tips: missing 'id' property, or %c".concat(a.id,"%c is not a string."),"font-size: 20px; color: red;",""),!1;var s=(e||[]).map(function(t){return t.id;}),u=i.map(function(t){return t.id;}),h=Object(f.f)(Object(f.f)([],s,!0),u,!0),l=(n||[]).find(function(t){return!h.includes(t.source)||!h.includes(t.target);});return!l||(console.warn("G6 Warning Tips: The source %c".concat(l.source,"%c or the target %c").concat(l.target,"%c of the edge do not exist in the nodes or combos."),"font-size: 20px; color: red;","","font-size: 20px; color: red;",""),!1);},Ot=function(){function t(t){this.graph=t,this.destroyed=!1,this.modes=t.get("modes")||{default:[]},this.formatModes(),this.mode=t.get("defaultMode")||"default",this.currentBehaves=[],this.setMode(this.mode);}return t.prototype.formatModes=function(){var t=this.modes;Object(c.each)(t,function(t){Object(c.each)(t,function(e,n){Object(c.isString)(e)&&(t[n]={type:e});});});},t.prototype.setBehaviors=function(t){var e,n=this.graph,r=this.modes[t],i=[];Object(c.each)(r||[],function(t){var r=h.getBehavior(t.type||t);r&&(e=new r(t))&&(e.bind(n),i.push(e));}),this.currentBehaves=i;},t.mergeBehaviors=function(t,e){return Object(c.each)(e,function(e){t.indexOf(e)<0&&(Object(c.isString)(e)&&(e={type:e}),t.push(e));}),t;},t.filterBehaviors=function(t,e){var n=[];return t.forEach(function(t){var r="";r=Object(c.isString)(t)?t:t.type,e.indexOf(r)<0&&n.push(t);}),n;},t.prototype.setMode=function(t){var e=this.modes,n=this.graph,r=t;e[r]&&(n.emit("beforemodechange",{mode:t}),Object(c.each)(this.currentBehaves,function(t){t.delegate&&t.delegate.remove(),t.unbind(n);}),this.setBehaviors(r),n.emit("aftermodechange",{mode:t}),this.mode=t);},t.prototype.getMode=function(){return this.mode;},t.prototype.manipulateBehaviors=function(e,n,r){var i,o=this;if(i=Object(c.isArray)(e)?e:[e],Object(c.isArray)(n))return Object(c.each)(n,function(e){o.modes[e]?o.modes[e]=r?t.mergeBehaviors(o.modes[e]||[],i):t.filterBehaviors(o.modes[e]||[],i):r&&(o.modes[e]=i);}),this;var a=n;return n||(a=this.mode),this.modes[a]||r&&(this.modes[a]=i),this.modes[a]=r?t.mergeBehaviors(this.modes[a]||[],i):t.filterBehaviors(this.modes[a]||[],i),this.setMode(this.mode),this;},t.prototype.updateBehavior=function(t,e,n){Object(c.isString)(t)&&(t={type:t});var r=[];if(n&&n!==this.mode&&"default"!==n){if(!(r=this.modes[n])||!r.length)return console.warn("Update behavior failed! There is no behaviors in this mode on the graph."),this;var i=r.length;for(a=0;a<i;a++){if((s=r[a]).type===t.type||s===t.type)return s===t.type&&(s={type:s}),Object.assign(s,e),r[a]=s,this;a===i-1&&console.warn("Update behavior failed! There is no such behavior in the mode");}}else{if(!(r=this.currentBehaves)||!r.length)return console.warn("Update behavior failed! There is no behaviors in this mode on the graph."),this;for(var o=r.length,a=0;a<o;a++){var s;if((s=r[a]).type===t.type)return s.updateCfg(e),this;a===o-1&&console.warn("Update behavior failed! There is no such behavior in the mode");}}return this;},t.prototype.destroy=function(){this.graph=null,this.modes=null,this.currentBehaves=null,this.destroyed=!0;},t;}(),Mt=n(43),kt=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r.item=n.item,r.canvasX=n.canvasX,r.canvasY=n.canvasY,r.detail=n.detail,r;}return Object(f.c)(e,t),e;}(n(6).d),Ct=function Ct(t){return"".concat(t,"-").concat(Math.random()).concat(Date.now());},Et=function Et(t){var e=0,n=0,r=0,i=0;if(Object(c.isNumber)(t))e=n=r=i=t;else if(Object(c.isString)(t)){e=n=r=i=parseInt(t,10);}else Object(c.isArray)(t)&&(e=t[0],r=Object(c.isNil)(t[1])?t[0]:t[1],i=Object(c.isNil)(t[2])?t[0]:t[2],n=Object(c.isNil)(t[3])?r:t[3]);return[e,r,i,n];},jt=function jt(t){var e=new kt(t.type,t);return e.clientX=t.clientX,e.clientY=t.clientY,e.x=t.x,e.y=t.y,e.target=t.target,e.currentTarget=t.currentTarget,e.bubbles=!0,e.item=t.item,e;},Pt=function Pt(t){if(!t)return!1;for(var e=[1,0,0,0,1,0,0,0,1],n=0;n<9;n++){if(t[n]!==e[n])return!0;}return!1;},At=function At(t){return Number.isNaN(Number(t));},It=function It(t){for(var e=1/0,n=-1/0,r=1/0,i=-1/0,o=0;o<t.length;o++){var a=t[o].getBBox(),s=a.minX,c=a.minY,u=a.maxX,h=a.maxY;s<e&&(e=s),c<r&&(r=c),u>n&&(n=u),h>i&&(i=h);}return{x:Math.floor(e),y:Math.floor(r),width:Math.ceil(n)-Math.floor(e),height:Math.ceil(i)-Math.floor(r),minX:e,minY:r,maxX:n,maxY:i};},Tt=function Tt(t,e,n,r,i){void 0===e&&(e=15),void 0===n&&(n="quadratic"),void 0===r&&(r=void 0),void 0===i&&(i=void 0);for(var o=t.length,a=2*e,s=["top","top-right","right","bottom-right","bottom","bottom-left","left","top-left"],c={},u=[],h={},l=0;l<o;l++){var f=t[l],d=f.source,p=f.target,g="".concat(d,"-").concat(p);if(!u[l]){c[g]||(c[g]=[]),u[l]=!0,c[g].push(f);for(var v=0;v<o;v++){if(l!==v){var y=t[v],m=y.source,b=y.target;u[v]||(d===b&&p===m?(c[g].push(y),u[v]=!0,h["".concat(m,"|").concat(b,"|").concat(c[g].length-1)]=!0):d===m&&p===b&&(c[g].push(y),u[v]=!0));}}}}for(var x in c){for(var w=c[x],S=w.length,O=0;O<S;O++){var M=w[O];if(M.source!==M.target){if(1===S&&r&&M.source!==M.target)M.type=r;else{M.type=n;var k=(O%2==0?1:-1)*(h["".concat(M.source,"|").concat(M.target,"|").concat(O)]?-1:1);M.curveOffset=S%2==1?k*Math.ceil(O/2)*a:k*(Math.floor(O/2)*a+e);}}else i&&(M.type=i),M.loopCfg={position:s[O%8],dist:20*Math.floor(O/8)+50};}}return t;},Nt=function(){function t(t){this.destroyed=!1,this.graph=t,this.destroyed=!1;}return t.prototype.getViewCenter=function(){var t=this.getFormatPadding(),e=this.graph,n=this.graph.get("width"),r=e.get("height");return{x:(n-t[1]-t[3])/2+t[3],y:(r-t[0]-t[2])/2+t[0]};},t.prototype.fitCenter=function(){var t=this.graph,e=t.get("group");e.resetMatrix();var n=e.getCanvasBBox();if(0!==n.width&&0!==n.height){var r=this.getViewCenter(),i=n.x+n.width/2,o=n.y+n.height/2;t.translate(r.x-i,r.y-o);}},t.prototype.fitView=function(){var t=this.graph,e=this.getFormatPadding(),n=t.get("width"),r=t.get("height"),i=t.get("group");i.resetMatrix();var o=i.getCanvasBBox();if(0!==o.width&&0!==o.height){var a=this.getViewCenter(),s=o.x+o.width/2,c=o.y+o.height/2;t.translate(a.x-s,a.y-c);var u=(n-e[1]-e[3])/o.width,h=(r-e[0]-e[2])/o.height,l=u;u>h&&(l=h),t.zoom(l,a);}},t.prototype.getFormatPadding=function(){var t=this.graph.get("fitViewPadding");return Et(t);},t.prototype.focusPoint=function(t,e,n){var r=this,i=this.getViewCenter(),o=this.getPointByCanvas(i.x,i.y),a=this.graph.get("group").getMatrix();if(a||(a=[1,0,0,0,1,0,0,0,1]),e){var s=(o.x-t.x)*a[0],c=(o.y-t.y)*a[4],u=0,h=0,l=0,d=0;this.graph.get("canvas").animate(function(t){l=s*t,d=c*t,r.graph.translate(l-u,d-h),u=l,h=d;},Object(f.a)({},n));}else this.graph.translate((o.x-t.x)*a[0],(o.y-t.y)*a[4]);},t.prototype.getPointByCanvas=function(t,e){var n=this.graph.get("group").getMatrix();return n||(n=[1,0,0,0,1,0,0,0,1]),k({x:t,y:e},n);},t.prototype.getPointByClient=function(t,e){var n=this.graph.get("canvas").getPointByClient(t,e);return this.getPointByCanvas(n.x,n.y);},t.prototype.getClientByPoint=function(t,e){var n=this.graph.get("canvas"),r=this.getCanvasByPoint(t,e),i=n.getClientByPoint(r.x,r.y);return{x:i.x,y:i.y};},t.prototype.getCanvasByPoint=function(t,e){var n=this.graph.get("group").getMatrix();return n||(n=[1,0,0,0,1,0,0,0,1]),M({x:t,y:e},n);},t.prototype.focus=function(t,e,n){if(Object(c.isString)(t)&&(t=this.graph.findById(t)),t){var r=0,i=0;if(t.getType&&"edge"===t.getType()){var o=t.getSource().get("group").getMatrix(),a=t.getTarget().get("group").getMatrix();o&&a?(r=(o[6]+a[6])/2,i=(o[7]+a[7])/2):(o||a)&&(r=o?o[6]:a[6],i=o?o[7]:a[7]);}else{var s=t.get("group").getMatrix();s||(s=[1,0,0,0,1,0,0,0,1]),r=s[6],i=s[7];}this.focusPoint({x:r,y:i},e,n);}},t.prototype.changeSize=function(t,e){var n=this.graph;if(!Object(c.isNumber)(t)||!Object(c.isNumber)(e))throw Error("invalid canvas width & height, please make sure width & height type is number");n.set({width:t,height:e}),n.get("canvas").changeSize(t,e),n.get("plugins").forEach(function(r){if(r.get("gridContainer")){var i=n.get("minZoom");Object(Mt.b)(r.get("container"),{width:"".concat(t,"px"),height:"".concat(e,"px")}),Object(Mt.b)(r.get("gridContainer"),{width:"".concat(t/i,"px"),height:"".concat(e/i,"px"),left:0,top:0});}});},t.prototype.destroy=function(){this.graph=null,this.destroyed=!1;},t;}();function Bt(t){return(Bt="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function Lt(t){if("string"!=typeof t)return t;var e=function e(t){if("string"!=typeof t)return t;try{return JSON.parse(t.trim());}catch(e){return t.trim();}},n=e(t);if("string"!=typeof n)return n;for(var r=function r(t){return t[t.length-1];},i=t.trim(),o=[],a=[],s=function s(){for(var t=[],e=0;e<arguments.length;e++){t[e]=arguments[e];}return t.some(function(t){return r(a)===t;});},c=null,u=0,h="";u<i.length;){var l=i[u],f=s('"',"'");if(f||l.trim()){var d="\\"===i[u-1],p=s("}"),g=s("]"),v=s(","),y=r(o);if(f){if(r(a)!==l||d)h+=l;else{a.pop();var m=e(h);y.push(m),c=m,h="";}}else if(g&&","===l)h&&(y.push(e(h)),h="");else if(p&&":"===l)a.push(","),h&&(y.push(h),h="");else if(v&&","===l)h&&(y.push(e(h)),h=""),a.pop();else if("}"===l&&(p||v)){h&&(y.push(e(h)),h=""),v&&a.pop();for(var b={},x=1;x<y.length;x+=2){b[y[x-1]]=y[x];}o.pop(),o.length&&r(o).push(b),a.pop(),c=b;}else"]"===l&&g?(h&&(y.push(e(h)),h=""),o.pop(),o.length&&r(o).push(y),a.pop(),c=y):"{"===l?(o.push([]),a.push("}")):"["===l?(o.push([]),a.push("]")):'"'===l?a.push('"'):"'"===l?a.push("'"):h+=l;u+=1;}else u+=1;}return c||h;}function Dt(t,e){var n;void 0===e&&(e={x:0,y:0});var r=Object(f.a)({x:0,y:0,width:0,height:0},e);if(null===(n=t.children)||void 0===n?void 0:n.length){var i=t.attrs,o=void 0===i?{}:i,a=o.marginTop,s=Object(f.a)({},e);a&&(s.y+=a);for(var c=0;c<t.children.length;c++){t.children[c].attrs.key="".concat(o.key||"root"," -").concat(c," ");var u=Dt(t.children[c],s);if(u.bbox){var h=u.bbox;"inline"===u.attrs.next?s.x+=u.bbox.width:s.y+=u.bbox.height,h.width+h.x>r.width&&(r.width=h.width+h.x),h.height+h.y>r.height&&(r.height=h.height+h.y);}}}return t.bbox=function(t,e,n){var r,i,o=t.attrs,a=void 0===o?{}:o,s={x:e.x||0,y:e.y||0,width:n.width||0,height:n.height||0};switch(t.type){case"maker":case"circle":a.r&&(i=2*a.r,r=2*a.r);break;case"text":a.text&&(i=vt(a.text,a.fontSize||12)[0],r=16,s.y+=r,s.height=r,s.width=i,t.attrs=Object(f.a)({fontSize:12,fill:"#000"},a));break;default:a.width&&(i=a.width),a.height&&(r=a.height);}return r>=0&&(s.height=r),i>=0&&(s.width=i),a.marginTop&&(s.y+=a.marginTop),a.marginLeft&&(s.x+=a.marginLeft),s;}(t,e,r),t.attrs=Object(f.a)(Object(f.a)({},t.attrs),t.bbox),t;}function _t(t){var e={},n=function n(e){var n=function(t){return function(e){for(var n=t.length,r=[],i=0,o="";i<n;){if("{"===t[i]&&"{"===t[i+1])r.push(o),o="",i+=2;else if("}"===t[i]&&"}"===t[i+1]){if(r.length){var a=r.pop();o=Object(c.get)(e,o,a.endsWith("=")?'"{'.concat(o,'}"'):o),r.push(a+o);}i+=2,o="";}else o+=t[i],i+=1;}return r.push(o),r.map(function(t,e){return r[e-1]&&r[e-1].endsWith("=")?'"{'.concat(t,'}"'):t;}).join("");};}("function"==typeof t?t(e):t)(e),r=document.createElement("div");r.innerHTML=n;var i=Dt(function t(e,n){var r={},i=e.getAttributeNames&&e.getAttributeNames()||[],o=e.children&&Array.from(e.children).map(function(e){return t(e,n);}),a={},s=e.tagName?e.tagName.toLowerCase():"group";return"text"===s&&(r.text=e.innerText),a.type=s,"img"===s&&(a.type="image"),Array.from(i).forEach(function(t){var n=t.split("-").reduce(function(t,e){return t+e.charAt(0).toUpperCase()+e.slice(1);}),i=e.getAttribute(t);try{if("style"===n||"attrs"===n){var o=Lt(i);r=Object(f.a)(Object(f.a)({},r),o);}else a[n]=Lt(i);}catch(t){if("style"===n)throw t;a[n]=i;}}),a.attrs=r,n&&n.style&&a.name&&"object"===Bt(n.style[a.name])&&(a.attrs=Object(f.a)(Object(f.a)({},a.attrs),n.style[a.name])),n&&n.style&&a.keyshape&&(a.attrs=Object(f.a)(Object(f.a)({},a.attrs),n.style)),o.length&&(a.children=o),a;}(r.children[0],e));return r.remove(),i;};return{draw:function draw(t,r){var i=n(t),o=r;return function t(e){var n=e.attrs,i=void 0===n?{}:n,a=e.bbox,s=e.type,c=e.children,u=Object(f.e)(e,["attrs","bbox","type","children"]);if("group"!==e.type){var h=r.addShape(e.type,Object(f.a)({attrs:i,origin:{bbox:a,type:s,children:c}},u));e.keyshape&&(o=h);}e.children&&e.children.forEach(function(e){return t(e);});}(i),e[t.id]=[i],o;},update:function update(t,r){e[t.id]||(e[t.id]=[]);var i=r.getContainer(),o=i.get("children"),a=n(t),s=function t(e,n){var r,i,o,a,s=(e||{}).type,c=((null==n?void 0:n.attrs)||{}).key;if(c&&e&&(e.attrs.key=c),!e&&n)return{action:"delete",val:n,type:s,key:c};if(e&&!n)return{action:"add",val:e,type:s};if(!e&&!n)return{action:"same",type:s};var u=[];if((null===(r=e.children)||void 0===r?void 0:r.length)>0||(null===(i=n.children)||void 0===i?void 0:i.length)>0)for(var h=Math.max(null===(o=e.children)||void 0===o?void 0:o.length,null===(a=n.children)||void 0===a?void 0:a.length),l=n.children||[],f=e.children||[],d=0;d<h;d+=1){u.push(t(f[d],l[d]));}var p=Object.keys(n.attrs),g=Object.keys(e.attrs);return n.type!==e.type?{action:"restructure",nowTarget:e,formerTarget:n,key:c,children:u}:p.filter(function(t){return"children"!==t;}).some(function(t){return e.attrs[t]!==n.attrs[t]||!g.includes(t);})?{action:"change",val:e,children:u,type:s,key:c}:{action:"same",children:u,type:s,key:c};}(a,e[t.id].pop()),c=function t(e){var n;"group"!==e.type&&i.addShape(e.type,{attrs:e.attrs}),(null===(n=e.children)||void 0===n?void 0:n.length)&&e.children.map(function(e){return t(e);});},u=function t(e){var n,r=o.find(function(t){return t.attrs.key===e.attrs.key;});r&&i.removeChild(r),(null===(n=e.children)||void 0===n?void 0:n.length)&&e.children.map(function(e){return t(e);});};!function t(e){var n=e.key;if("group"!==e.type){var i=o.find(function(t){return t.attrs.key===n;});switch(e.action){case"change":if(i){var a=e.val.keyshape?r.getOriginStyle():{};i.attr(Object(f.a)(Object(f.a)({},a),e.val.attrs));}break;case"add":c(e.val);break;case"delete":u(e.val);break;case"restructure":u(e.formerTarget),c(e.nowTarget);}}e.children&&e.children.forEach(function(e){return t(e);});}(s),e[t.id].push(a);},getAnchorPoints:function getAnchorPoints(){return[[0,0.5],[1,0.5],[0.5,1],[0.5,0]];}};}var Rt={};function Ft(t){return Rt[t]||(Rt[t]=Object(c.upperFirst)(t)),Rt[t];}var Yt={defaultShapeType:"defaultType",className:null,getShape:function getShape(t){return this[t]||this[this.defaultShapeType]||this["simple-circle"];},draw:function draw(t,e,n){var r=this.getShape(t),i=r.draw(e,n);return r.afterDraw&&r.afterDraw(e,n,i),i;},baseUpdate:function baseUpdate(t,e,n){var r=this.getShape(t);r.update&&r.update(e,n),r.afterUpdate&&r.afterUpdate(e,n);},setState:function setState(t,e,n,r){this.getShape(t).setState(e,n,r);},shouldUpdate:function shouldUpdate(t){return!!this.getShape(t).update;},getControlPoints:function getControlPoints(t,e){return this.getShape(t).getControlPoints(e);},getAnchorPoints:function getAnchorPoints(t,e){return this.getShape(t).getAnchorPoints(e);}},Xt={options:{},draw:function draw(t,e){return this.drawShape(t,e);},drawShape:function drawShape(){},afterDraw:function afterDraw(){},afterUpdate:function afterUpdate(){},setState:function setState(){},getControlPoints:function getControlPoints(t){return t.controlPoints;},getAnchorPoints:function getAnchorPoints(t){var e=this.options.anchorPoints;return t.anchorPoints||e;}},zt=function(){function t(){}return t.registerFactory=function(e,n){var r=Ft(e),i=Yt,o=Object(f.a)(Object(f.a)({},i),n);return t[r]=o,o.className=r,o;},t.getFactory=function(e){return t[Ft(e)];},t.registerNode=function(e,n,r){var i,o=t.Node;if("string"==typeof n||"function"==typeof n){var a=_t(n);i=Object(f.a)(Object(f.a)({},o.getShape("single-node")),a);}else if(n.jsx){a=_t(n.jsx);i=Object(f.a)(Object(f.a)(Object(f.a)({},o.getShape("single-node")),a),n);}else{o.getShape(r);var s=r?o.getShape(r):Xt;i=Object(f.a)(Object(f.a)({},s),n);}return i.type=e,i.itemType="node",o[e]=i,i;},t.registerEdge=function(e,n,r){var i=t.Edge,o=r?i.getShape(r):Xt,a=Object(f.a)(Object(f.a)({},o),n);return a.type=e,a.itemType="edge",i[e]=a,a;},t.registerCombo=function(e,n,r){var i=t.Combo,o=r?i.getShape(r):Xt,a=Object(f.a)(Object(f.a)({},o),n);return a.type=e,a.itemType="combo",i[e]=a,a;},t;}(),Wt=zt;zt.registerFactory("node",{defaultShapeType:"circle"}),zt.registerFactory("edge",{defaultShapeType:"line"}),zt.registerFactory("combo",{defaultShapeType:"circle"});var qt=function(){function t(t){this._cfg={},this.destroyed=!1;var e={id:void 0,type:"item",model:{},group:void 0,animate:!1,visible:!0,locked:!1,event:!0,keyShape:void 0,states:[]};this._cfg=Object.assign(e,this.getDefaultCfg(),t);var n=this.get("model"),r=n.id,i=this.get("type");r||(r=Ct(i),this.get("model").id=r),this.set("id",r);var o=t.group;o&&(o.set("item",this),o.set("id",r)),this.init(),this.draw();var a=n.shape||n.type||("edge"===i?"line":"circle"),s=this.get("shapeFactory");if(s&&s[a]){var u=s[a].options;if(u&&u.stateStyles){var h=this.get("styles")||n.stateStyles;h=Object(c.deepMix)({},u.stateStyles,h),this.set("styles",h);}}}return t.prototype.calculateBBox=function(){var t=this.get("keyShape"),e=this.get("group"),n=ut(t,e);return n.x=n.minX,n.y=n.minY,n.width=n.maxX-n.minX,n.height=n.maxY-n.minY,n.centerX=(n.minX+n.maxX)/2,n.centerY=(n.minY+n.maxY)/2,n;},t.prototype.calculateCanvasBBox=function(){var t=this.get("keyShape"),e=this.get("group"),n=ut(t,e);return n.x=n.minX,n.y=n.minY,n.width=n.maxX-n.minX,n.height=n.maxY-n.minY,n.centerX=(n.minX+n.maxX)/2,n.centerY=(n.minY+n.maxY)/2,n;},t.prototype.drawInner=function(){var t=this.get("shapeFactory"),e=this.get("group"),n=this.get("model");e.clear();var r=n.visible;if(void 0===r||r||this.changeVisibility(r),t){this.updatePosition(n);var i=this.getShapeCfg(n),o=i.type,a=t.draw(o,i,e);a&&(this.set("keyShape",a),a.set("isKeyShape",!0),a.set("draggable",!0)),this.setOriginStyle(),this.set("currentShape",o),this.restoreStates(t,o);}},t.prototype.setOriginStyle=function(){var t=this.get("group").get("children"),e=this.getKeyShape(),n=this,r=e.get("name");if(this.get("originStyle")){var i=this.getOriginStyle();r&&!i[r]&&(i[r]={});var o=this.getCurrentStatesStyle();Object(c.each)(t,function(t){var e=t.get("name"),a=t.attr();if(e&&e!==r){var s=o[e];i[e]||(i[e]={}),s?Object.keys(a).forEach(function(t){var n=a[t];n!==s[t]&&(i[e][t]=n);}):i[e]="image"!==t.get("type")?Object(c.clone)(a):n.getShapeStyleByName(e);}else{var u=t.attr(),h=Object(f.a)(Object(f.a)({},o),o[r]);Object.keys(u).forEach(function(t){var e=u[t];h[t]!==e&&(r?i[r][t]=e:i[t]=e);});}}),i.path&&delete i.path,i.matrix&&delete i.matrix,i.x&&delete i.x,i.y&&delete i.y,i[r]&&i[r].x&&delete i[r].x,i[r]&&i[r].y&&delete i[r].y,n.set("originStyle",i);}else{var a={};Object(c.each)(t,function(t){var e=t.get("type"),i=t.get("name");if(i&&i!==r)a[i]="image"!==e?Object(c.clone)(t.attr()):n.getShapeStyleByName(i);else{var o=n.getShapeStyleByName();if(o.path&&delete o.path,o.matrix&&delete o.matrix,r){if(i)a[r]=o;else{var s=Ct("shape");t.set("name",s),a[s]="image"!==e?Object(c.clone)(t.attr()):n.getShapeStyleByName(i);}}else Object.assign(a,o);}}),n.set("originStyle",a);}},t.prototype.restoreStates=function(t,e){var n=this,r=n.get("states");Object(c.each)(r,function(r){t.setState(e,r,!0,n);});},t.prototype.init=function(){var t=Wt.getFactory(this.get("type"));this.set("shapeFactory",t);},t.prototype.get=function(t){return this._cfg[t];},t.prototype.set=function(t,e){Object(c.isPlainObject)(t)?this._cfg=Object(f.a)(Object(f.a)({},this._cfg),t):this._cfg[t]=e;},t.prototype.getDefaultCfg=function(){return{};},t.prototype.clearCache=function(){this.set("bboxCache",null),this.set("bboxCanvasCache",null);},t.prototype.beforeDraw=function(){},t.prototype.afterDraw=function(){},t.prototype.afterUpdate=function(){},t.prototype.draw=function(){this.beforeDraw(),this.drawInner(),this.afterDraw();},t.prototype.getShapeStyleByName=function(t){var e,n=this.get("group");if(e=t?n.find(function(e){return e.get("name")===t;}):this.getKeyShape()){var r={};return Object(c.each)(e.attr(),function(t,e){"img"!==e&&(r[e]=t);}),r;}return{};},t.prototype.getShapeCfg=function(t){var e=this.get("styles");if(e){var n=t;return n.style=Object(f.a)(Object(f.a)({},e),t.style),n;}return t;},t.prototype.getStateStyle=function(t){var e=this.get("styles");return e&&e[t];},t.prototype.getOriginStyle=function(){return this.get("originStyle");},t.prototype.getCurrentStatesStyle=function(){var t=this,e={},n=t.getStates();return n&&n.length?(Object(c.each)(t.getStates(),function(n){e=Object.assign(e,t.getStateStyle(n));}),e):this.getOriginStyle();},t.prototype.setState=function(t,e){var n=this.get("states"),r=this.get("shapeFactory"),i=t,o=t;Object(c.isString)(e)&&(i="".concat(t,":").concat(e),o="".concat(t,":"));var a=n;if(Object(c.isBoolean)(e)){var s=n.indexOf(o);if(e){if(s>-1)return;n.push(i);}else s>-1&&n.splice(s,1);}else if(Object(c.isString)(e)){var u=n.filter(function(t){return t.includes(o);});u.length>0&&this.clearStates(u),(a=a.filter(function(t){return!t.includes(o);})).push(i),this.set("states",a);}if(r){var h=this.get("model").type;r.setState(h,t,e,this);}},t.prototype.clearStates=function(t){var e=this,n=e.getStates(),r=e.get("shapeFactory"),i=e.get("model").type;t||(t=n),Object(c.isString)(t)&&(t=[t]);var o=n.filter(function(e){return-1===t.indexOf(e);});e.set("states",o),t.forEach(function(t){r.setState(i,t,!1,e);});},t.prototype.getContainer=function(){return this.get("group");},t.prototype.getKeyShape=function(){return this.get("keyShape");},t.prototype.getModel=function(){return this.get("model");},t.prototype.getType=function(){return this.get("type");},t.prototype.getID=function(){return this.get("id");},t.prototype.isItem=function(){return!0;},t.prototype.getStates=function(){return this.get("states");},t.prototype.hasState=function(t){return this.getStates().indexOf(t)>=0;},t.prototype.refresh=function(){var t=this.get("model");this.updatePosition(t),this.updateShape(),this.afterUpdate(),this.clearCache();},t.prototype.isOnlyMove=function(t){return!1;},t.prototype.update=function(t,e){void 0===e&&(e=!1);var n=this.get("model"),r=n.visible,i=t.visible;r!==i&&void 0!==i&&this.changeVisibility(i);var o=n.x,a=n.y;t.x=isNaN(t.x)?n.x:t.x,t.y=isNaN(t.y)?n.y:t.y;var s=this.get("styles");if(t.stateStyles){var u=t.stateStyles;Object(c.mix)(s,u),delete t.stateStyles;}Object.assign(n,t),e?this.updatePosition(t):(o===t.x&&a===t.y||this.updatePosition(t),this.updateShape()),this.afterUpdate(),this.clearCache();},t.prototype.updateShape=function(){var t=this.get("shapeFactory"),e=this.get("model"),n=e.type;if(t.shouldUpdate(n)&&n===this.get("currentShape")){var r=this.getShapeCfg(e);t.baseUpdate(n,r,this),this.setOriginStyle();}else this.draw();this.restoreStates(t,n);},t.prototype.updatePosition=function(t){var e=this.get("model"),n=Object(c.isNil)(t.x)?e.x:t.x,r=Object(c.isNil)(t.y)?e.y:t.y,i=this.get("group");if(Object(c.isNil)(n)||Object(c.isNil)(r))return!1;e.x=n,e.y=r;var o=i.getMatrix();return(!o||o[6]!==n||o[7]!==r)&&(i.resetMatrix(),I(i,{x:n,y:r}),this.clearCache(),!0);},t.prototype.getBBox=function(){var t=this.get("bboxCache");return t||(t=this.calculateBBox(),this.set("bboxCache",t)),t;},t.prototype.getCanvasBBox=function(){var t=this.get("bboxCanvasCache");return t||(t=this.calculateCanvasBBox(),this.set("bboxCanvasCache",t)),t;},t.prototype.toFront=function(){this.get("group").toFront();},t.prototype.toBack=function(){this.get("group").toBack();},t.prototype.show=function(){this.changeVisibility(!0);},t.prototype.hide=function(){this.changeVisibility(!1);},t.prototype.changeVisibility=function(t){var e=this.get("group");t?e.show():e.hide(),this.set("visible",t);},t.prototype.isVisible=function(){return this.get("visible");},t.prototype.enableCapture=function(t){var e=this.get("group");e&&e.set("capture",t);},t.prototype.destroy=function(){if(!this.destroyed){var t=this.get("animate"),e=this.get("group");t&&e.stopAnimate(),this.clearCache(),e.remove(),this._cfg=null,this.destroyed=!0;}},t;}(),Vt={source:"start",target:"end"},Gt=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(f.c)(e,t),e.prototype.getDefaultCfg=function(){return{type:"edge",sourceNode:null,targetNode:null,startPoint:null,endPoint:null,linkCenter:!1};},e.prototype.setEnd=function(t,e){var n=Vt[t]+"Point",r=t+"Node",i=this.get(r);i&&!i.destroyed&&i.removeEdge(this),Object(c.isPlainObject)(e)?(this.set(n,e),this.set(r,null)):(e.addEdge(this),this.set(r,e),this.set(n,null));},e.prototype.getLinkPoint=function(t,e,n){var r=Vt[t]+"Point",i=t+"Node",o=this.get(r);if(!o){var a=this.get(i),s=t+"Anchor",u=this.getPrePoint(t,n),h=e[s];Object(c.isNil)(h)||(o=a.getLinkPointByAnchor(h)),o=o||a.getLinkPoint(u),Object(c.isNil)(o.index)||this.set("".concat(t,"AnchorIndex"),o.index);}return o;},e.prototype.getPrePoint=function(t,e){if(e&&e.length)return e["source"===t?0:e.length-1];var n="source"===t?"target":"source";return this.getEndPoint(n);},e.prototype.getEndPoint=function(t){var e=t+"Node",n=Vt[t]+"Point",r=this.get(e);return r?r.get("model"):this.get(n);},e.prototype.getControlPointsByCenter=function(t){var e=this.getEndPoint("source"),n=this.getEndPoint("target"),r=this.get("shapeFactory"),i=t.type;return r.getControlPoints(i,{startPoint:e,endPoint:n});},e.prototype.getEndCenter=function(t){var e=t+"Node",n=Vt[t]+"Point",r=this.get(e);if(r){var i=r.getBBox();return{x:i.centerX,y:i.centerY};}return this.get(n);},e.prototype.init=function(){t.prototype.init.call(this),this.setSource(this.get("source")),this.setTarget(this.get("target"));},e.prototype.getShapeCfg=function(e){var n=this.get("linkCenter"),r=t.prototype.getShapeCfg.call(this,e);if(n)r.startPoint=this.getEndCenter("source"),r.endPoint=this.getEndCenter("target");else{var i=r.controlPoints||this.getControlPointsByCenter(r);r.startPoint=this.getLinkPoint("source",e,i),r.endPoint=this.getLinkPoint("target",e,i);}return r.sourceNode=this.get("sourceNode"),r.targetNode=this.get("targetNode"),r;},e.prototype.getModel=function(){var t=this.get("model"),e=this.get("source".concat("Node")),n=this.get("target".concat("Node"));return e?delete t["source".concat("Node")]:t.source=this.get("start".concat("Point")),n?delete t["target".concat("Node")]:t.target=this.get("end".concat("Point")),Object(c.isString)(t.source)||Object(c.isPlainObject)(t.source)||(t.source=t.source.getID()),Object(c.isString)(t.target)||Object(c.isPlainObject)(t.target)||(t.target=t.target.getID()),t;},e.prototype.setSource=function(t){this.setEnd("source",t),this.set("source",t);},e.prototype.setTarget=function(t){this.setEnd("target",t),this.set("target",t);},e.prototype.getSource=function(){return this.get("source");},e.prototype.getTarget=function(){return this.get("target");},e.prototype.updatePosition=function(){return!1;},e.prototype.update=function(t,e){void 0===e&&(e=!1);var n=this.get("model"),r=n.visible,i=t.visible;r!==i&&void 0!==i&&this.changeVisibility(i);var o=this.get("styles");if(t.stateStyles){var a=t.stateStyles;Object(c.mix)(o,a),delete t.stateStyles;}Object.assign(n,t),this.updateShape(),this.afterUpdate(),this.clearCache();},e.prototype.destroy=function(){var e=this.get("source".concat("Node")),n=this.get("target".concat("Node"));e&&!e.destroyed&&e.removeEdge(this),n&&!n.destroyed&&n.removeEdge(this),t.prototype.destroy.call(this);},e;}(qt),Ht=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(f.c)(e,t),e.prototype.getNearestPoint=function(t,e){for(var n=0,r=t[0],i=E(t[0],e),o=0;o<t.length;o++){var a=t[o],s=E(a,e);s<i&&(r=a,i=s,n=o);}return r.anchorIndex=n,r;},e.prototype.getDefaultCfg=function(){return{type:"node",edges:[]};},e.prototype.getEdges=function(){return this.get("edges");},e.prototype.getInEdges=function(){var t=this;return this.get("edges").filter(function(e){return e.get("target")===t;});},e.prototype.getOutEdges=function(){var t=this;return this.get("edges").filter(function(e){return e.get("source")===t;});},e.prototype.getNeighbors=function(t){var e=this,n=this.get("edges");if("target"===t){return n.filter(function(t){return t.getSource()===e;}).map(function(t){return t.getTarget();});}if("source"===t){return n.filter(function(t){return t.getTarget()===e;}).map(function(t){return t.getSource();});}return n.map(function(t){return t.getSource()===e?t.getTarget():t.getSource();});},e.prototype.getLinkPointByAnchor=function(t){return this.getAnchorPoints()[t];},e.prototype.getLinkPoint=function(t){var e,n,r=this.get("keyShape").get("type"),i=this.get("type"),o=this.getBBox();"combo"===i?(e=o.centerX||(o.maxX+o.minX)/2,n=o.centerY||(o.maxY+o.minY)/2):(e=o.centerX,n=o.centerY);var a,s=this.getAnchorPoints();switch(r){case"circle":a=S({x:e,y:n,r:o.width/2},t);break;case"ellipse":a=O({x:e,y:n,rx:o.width/2,ry:o.height/2},t);break;default:a=w(o,t);}var c=a;return s.length&&(c||(c=t),c=this.getNearestPoint(s,c)),c||(c={x:e,y:n}),c;},e.prototype.getAnchorPoints=function(){var t=this.get("anchorPointsCache");if(!t){t=[];var e=this.get("shapeFactory"),n=this.getBBox(),r=this.get("model"),i=this.getShapeCfg(r),o=r.type,a=e.getAnchorPoints(o,i)||[];Object(c.each)(a,function(e,r){var i={x:n.minX+e[0]*n.width,y:n.minY+e[1]*n.height,anchorIndex:r};t.push(i);}),this.set("anchorPointsCache",t);}return t;},e.prototype.addEdge=function(t){this.get("edges").push(t);},e.prototype.lock=function(){this.set("locked",!0);},e.prototype.unlock=function(){this.set("locked",!1);},e.prototype.hasLocked=function(){return this.get("locked");},e.prototype.removeEdge=function(t){var e=this.getEdges(),n=e.indexOf(t);n>-1&&e.splice(n,1);},e.prototype.clearCache=function(){this.set("bboxCache",null),this.set("anchorPointsCache",null);},e.prototype.isOnlyMove=function(t){if(!t)return!1;var e=!Object(c.isNil)(t.x),n=!Object(c.isNil)(t.y),r=Object.keys(t);return 1===r.length&&(e||n)||2===r.length&&e&&n;},e;}(qt),Ut=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(f.c)(e,t),e.prototype.getDefaultCfg=function(){return{type:"combo",nodes:[],edges:[],combos:[]};},e.prototype.getShapeCfg=function(t){var e=this.get("styles"),n=this.get("bbox");if(e&&n){var r=t,i={r:Math.hypot(n.height,n.width)/2||nt.defaultCombo.size[0]/2,width:n.width||nt.defaultCombo.size[0],height:n.height||nt.defaultCombo.size[1]};r.style=Object(f.a)(Object(f.a)(Object(f.a)({},e),t.style),i);var o=t.padding||nt.defaultCombo.padding;return Object(c.isNumber)(o)?(i.r+=o,i.width+=2*o,i.height+=2*o):(i.r+=o[0],i.width+=o[1]+o[3]||2*o[1],i.height+=o[0]+o[2]||2*o[0]),this.set("sizeCache",i),r;}return t;},e.prototype.calculateCanvasBBox=function(){if(!this.destroyed){var t=this.get("keyShape"),e=this.get("group"),n=ut(t,e);n.centerX=(n.minX+n.maxX)/2,n.centerY=(n.minY+n.maxY)/2;var r=this.get("sizeCache"),i=this.get("bboxCache")||{},o=i.x,a=i.x;if(r)r.width=Math.max(r.width,n.width),r.height=Math.max(r.height,n.height),"circle"===t.get("type")?(n.width=2*r.r,n.height=2*r.r):(n.width=r.width,n.height=r.height),n.minX=n.centerX-n.width/2,n.minY=n.centerY-n.height/2,n.maxX=n.centerX+n.width/2,n.maxY=n.centerY+n.height/2;else n.width=n.maxX-n.minX,n.height=n.maxY-n.minY,n.centerX=(n.minX+n.maxX)/2,n.centerY=(n.minY+n.maxY)/2;return n.x=n.minX,n.y=n.minY,n.x===o&&n.y===a||this.set("anchorPointsCache",null),n;}},e.prototype.getChildren=function(){return{nodes:this.getNodes(),combos:this.getCombos()};},e.prototype.getNodes=function(){return this.get("nodes");},e.prototype.getCombos=function(){return this.get("combos");},e.prototype.addChild=function(t){switch(t.getType()){case"node":this.addNode(t);break;case"combo":this.addCombo(t);break;default:return console.warn("Only node or combo items are allowed to be added into a combo"),!1;}return!0;},e.prototype.addCombo=function(t){return this.get("combos").push(t),!0;},e.prototype.addNode=function(t){return this.get("nodes").push(t),!0;},e.prototype.removeChild=function(t){switch(t.getType()){case"node":this.removeNode(t);break;case"combo":this.removeCombo(t);break;default:return console.warn("Only node or combo items are allowed to be added into a combo"),!1;}return!0;},e.prototype.removeCombo=function(t){if(t){var e=this.getCombos(),n=e.indexOf(t);return n>-1&&(e.splice(n,1),!0);}},e.prototype.removeNode=function(t){if(t){var e=this.getNodes(),n=e.indexOf(t);return n>-1&&(e.splice(n,1),!0);}},e.prototype.isOnlyMove=function(t){return!1;},e.prototype.getBBox=function(){return this.set("bboxCanvasCache",null),this.calculateCanvasBBox();},e.prototype.clearCache=function(){this.set("bboxCache",null),this.set("bboxCanvasCache",null),this.set("anchorPointsCache",null);},e.prototype.destroy=function(){if(!this.destroyed){var t=this.get("animate"),e=this.get("group");t&&e.stopAnimate(),this.clearCache(),this.set("sizeCache",null),this.set("bbox",null),e.remove(),this._cfg=null,this.destroyed=!0;}},e;}(Ht),Zt=function(){function t(t){this.graph=t,this.destroyed=!1;}return t.prototype.addItem=function(t,e){var n=this.graph,r="vedge"===t?"edge":t,i=n.get("".concat(r,"Group"))||n.get("group"),o=Object(c.upperFirst)(r),a=null,s=n.get(r+Object(c.upperFirst)("stateStyles"))||{},u=n.get("default"+o);e.stateStyles&&(s=e.stateStyles),u&&Object(c.each)(u,function(t,n){Object(c.isObject)(t)&&!Object(c.isArray)(t)?e[n]=Object(c.deepMix)({},t,e[n]):Object(c.isArray)(t)?e[n]=e[n]||Object(c.clone)(u[n]):e[n]=e[n]||u[n];});var h=n.get(r+"Mapper");if(h){var l=h(e);l.stateStyles&&(s=l.stateStyles,delete l.stateStyles),Object(c.each)(l,function(t,n){Object(c.isObject)(t)&&!Object(c.isArray)(t)?e[n]=Object(c.deepMix)({},e[n],t):e[n]=l[n]||e[n];});}if(n.emit("beforeadditem",{type:t,model:e}),"edge"===t||"vedge"===t){var f=void 0,d=void 0;if(f=e.source,d=e.target,f&&Object(c.isString)(f)&&(f=n.findById(f)),d&&Object(c.isString)(d)&&(d=n.findById(d)),!f||!d)return void console.warn("The source or target node of edge ".concat(e.id," does not exist!"));f.getType&&"combo"===f.getType()&&(e.isComboEdge=!0),d.getType&&"combo"===d.getType()&&(e.isComboEdge=!0),a=new Gt({model:e,source:f,target:d,styles:s,linkCenter:n.get("linkCenter"),group:i.addGroup()});}else if("node"===t)a=new Ht({model:e,styles:s,group:i.addGroup()});else if("combo"===t){var p=e.children,g=bt(p,n);isNaN(g.x)?isNaN(e.x)&&(e.x=100*Math.random()):e.x=g.x,isNaN(g.y)?isNaN(e.y)&&(e.y=100*Math.random()):e.y=g.y;var v=i.addGroup();v.setZIndex(e.depth);var y=(a=new Ut({model:e,styles:s,bbox:e.collapsed?bt([],n):g,group:v})).getModel();(p||[]).forEach(function(t){var e=n.findById(t.id);a.addChild(e),t.depth=y.depth+2;}),e.collapsed&&setTimeout(function(){n.collapseCombo(a);},16);}if(a)return n.get("".concat(t,"s")).push(a),n.get("itemMap")[a.get("id")]=a,n.emit("afteradditem",{item:a,model:e}),a;},t.prototype.updateItem=function(t,e){var n,r,i=this.graph;if(Object(c.isString)(t)&&(t=i.findById(t)),t&&!t.destroyed){var o="";t.getType&&(o=t.getType());var a=i.get(o+"Mapper"),s=t.getModel(),u=t.isOnlyMove(e);if(a){var h=a(Object(c.deepMix)({},s,e)),l=Object(c.deepMix)({},s,h,e);h.stateStyles&&(t.set("styles",l.stateStyles),delete l.stateStyles),Object(c.each)(l,function(t,n){e[n]=t;});}else Object(c.each)(e,function(t,n){s[n]&&Object(c.isObject)(t)&&!Object(c.isArray)(t)&&(e[n]=Object(f.a)(Object(f.a)({},s[n]),e[n]));});if(i.emit("beforeupdateitem",{item:t,cfg:e}),"edge"===o){if(e.source){var d=e.source;Object(c.isString)(d)&&(d=i.findById(d)),t.setSource(d);}if(e.target){var p=e.target;Object(c.isString)(p)&&(p=i.findById(p)),t.setTarget(p);}t.update(e);}if("node"===o||"combo"===o){t.update(e,u);var g=t.getEdges(),v=xt(e);if(v&&"node"===o)Object(c.each)(g,function(t){t.refresh();});else if(v&&"combo"===o){var y=t.get("shapeFactory"),m=s.type||"circle";(void 0===s.animate||void 0===e.animate?null===(r=null===(n=y[m])||void 0===n?void 0:n.options)||void 0===r?void 0:r.animate:s.animate||e.animate)?setTimeout(function(){if(t&&!t.destroyed){var e=t.getKeyShape();e&&!e.destroyed&&Object(c.each)(g,function(t){t&&!t.destroyed&&t.refresh();});}},201):Object(c.each)(g,function(t){t.refresh();});}}i.emit("afterupdateitem",{item:t,cfg:e});}},t.prototype.updateCombo=function(t,e){var n,r,i=this,o=this.graph;if(Object(c.isString)(t)&&(t=o.findById(t)),t&&!t.destroyed){var a=t.getModel(),s=bt(a.collapsed?[]:e,o);t.set("bbox",s),t.update({x:s.x,y:s.y});var u=t.get("shapeFactory"),h=a.type||"circle";(void 0===a.animate?null===(r=null===(n=u[h])||void 0===n?void 0:n.options)||void 0===r?void 0:r.animate:a.animate)?setTimeout(function(){if(t&&!t.destroyed){var e=t.getKeyShape();e&&!e.destroyed&&(t.getShapeCfg(a),i.updateComboEdges(t));}},201):this.updateComboEdges(t);}},t.prototype.updateComboEdges=function(t){for(var e=t.getEdges()||[],n=0;n<e.length;n++){var r=e[n];if(r&&!r.destroyed){var i=r.get("shapeFactory"),o=r.getShapeCfg(r.getModel()),a=r.getContainer();a.clear();var s=i.draw(o.type,o,a);r.set("keyShape",s),s.set("isKeyShape",!0),s.set("draggable",!0),r.setOriginStyle();}}},t.prototype.collapseCombo=function(t){var e=this.graph;Object(c.isString)(t)&&(t=e.findById(t));var n=t.getChildren();n.nodes.forEach(function(t){e.hideItem(t);}),n.combos.forEach(function(t){e.hideItem(t);});},t.prototype.expandCombo=function(t){var e=this.graph;Object(c.isString)(t)&&(t=e.findById(t));var n=t.getChildren();n.nodes.forEach(function(t){e.showItem(t);}),n.combos.forEach(function(t){t.getModel().collapsed?t.show():e.showItem(t);});},t.prototype.removeItem=function(t){var e=this,n=this.graph;if(Object(c.isString)(t)&&(t=n.findById(t)),t&&!t.destroyed){var r=Object(c.clone)(t.getModel());n.emit("beforeremoveitem",{item:r});var i="";t.getType&&(i=t.getType());var o=n.get("".concat(i,"s")),a=o.indexOf(t);if(a>-1&&o.splice(a,1),"edge"===i){var s=n.get("v".concat(i,"s")),u=s.indexOf(t);u>-1&&s.splice(u,1);}var h=t.get("id");delete n.get("itemMap")[h];var l=n.get("comboTrees"),f=t.get("id");if("node"===i){var d=t.getModel().comboId;if(l&&d){var p=l,g=!1;l.forEach(function(t){g||dt(t,function(t){if(t.id===f&&p){var e=p.indexOf(t);return p.splice(e,1),g=!0,!1;}return p=t.children,!0;});});}for(var v=(x=t.getEdges()).length-1;v>=0;v--){n.removeItem(x[v],!1);}d&&n.updateCombo(d);}else if("combo"===i){var y,m=t.getModel().parentId,b=!1;(l||[]).forEach(function(t){b||dt(t,function(t){return t.id!==f||(y=t,b=!0,!1);});}),y.removed=!0,y&&y.children&&y.children.forEach(function(t){e.removeItem(t.id);});var x;for(v=(x=t.getEdges()).length;v>=0;v--){n.removeItem(x[v],!1);}m&&n.updateCombo(m);}t.destroy(),n.emit("afterremoveitem",{item:r});}},t.prototype.setItemState=function(t,e,n){var r=this.graph,i=e;Object(c.isString)(n)&&(i="".concat(e,":").concat(n)),t.hasState(i)===n&&n||Object(c.isString)(n)&&t.hasState(i)||(r.emit("beforeitemstatechange",{item:t,state:i,enabled:n}),t.setState(e,n),r.autoPaint(),r.emit("afteritemstatechange",{item:t,state:i,enabled:n}));},t.prototype.priorityState=function(t,e){var n=this.graph,r=t;Object(c.isString)(t)&&(r=n.findById(t)),this.setItemState(r,e,!1),this.setItemState(r,e,!0);},t.prototype.clearItemStates=function(t,e){var n=this.graph;Object(c.isString)(t)&&(t=n.findById(t)),n.emit("beforeitemstatesclear",{item:t,states:e}),t.clearStates(e),n.emit("afteritemstatesclear",{item:t,states:e});},t.prototype.refreshItem=function(t){var e=this.graph;Object(c.isString)(t)&&(t=e.findById(t)),e.emit("beforeitemrefresh",{item:t}),t.refresh(),e.emit("afteritemrefresh",{item:t});},t.prototype.addCombos=function(t,e){var n=this,r=this.graph;(t||[]).forEach(function(t){pt(t,function(t){var r;return e.forEach(function(e){e.id===t.id&&(e.children=t.children,e.depth=t.depth,r=e);}),r&&n.addItem("combo",r),!0;});});var i=r.get("comboGroup");i&&i.sort();},t.prototype.changeItemVisibility=function(t,e){var n=this,r=this.graph;if(Object(c.isString)(t)&&(t=r.findById(t)),t){if(r.emit("beforeitemvisibilitychange",{item:t,visible:e}),t.changeVisibility(e),t.getType&&"node"===t.getType()){var i=t.getEdges();Object(c.each)(i,function(t){(!e||t.get("source").isVisible()&&t.get("target").isVisible())&&n.changeItemVisibility(t,e);});}else if(t.getType&&"combo"===t.getType()){var o=r.get("comboTrees"),a=t.get("id"),s=[],u=!1;(o||[]).forEach(function(t){u||t.children&&0!==t.children.length&&dt(t,function(t){return t.id!==a||(s=t.children,u=!0,!1);});}),s&&(!e||e&&!t.getModel().collapsed)&&s.forEach(function(t){var i=r.findById(t.id);n.changeItemVisibility(i,e);});i=t.getEdges();Object(c.each)(i,function(t){(!e||t.get("source").isVisible()&&t.get("target").isVisible())&&n.changeItemVisibility(t,e);});}return r.emit("afteritemvisibilitychange",{item:t,visible:e}),t;}console.warn("The item to be shown or hidden does not exist!");},t.prototype.destroy=function(){this.graph=null,this.destroyed=!0;},t;}(),Kt=null,$t=function(){function t(t){this.graph=t,this.cachedStates={enabled:{},disabled:{}},this.destroyed=!1;}return t.checkCache=function(t,e,n){if(n[e]){var r=n[e].indexOf(t);r>=0&&n[e].splice(r,1);}},t.cacheState=function(t,e,n){n[e]||(n[e]=[]),n[e].push(t);},t.prototype.updateState=function(e,n,r){var i=this,o=t.checkCache,a=t.cacheState;if(!e.destroyed){var s=this.cachedStates,c=s.enabled,u=s.disabled;r?(o(e,n,u),a(e,n,c)):(o(e,n,c),a(e,n,u)),Kt&&clearTimeout(Kt),Kt=setTimeout(function(){Kt=null,i.updateGraphStates();},16);}},t.prototype.updateStates=function(t,e,n){var r=this;Object(c.isString)(e)?this.updateState(t,e,n):e.forEach(function(e){r.updateState(t,e,n);});},t.prototype.updateGraphStates=function(){var t=this.graph.get("states"),e=this.cachedStates;Object(c.each)(e.disabled,function(e,n){t[n]&&(t[n]=t[n].filter(function(t){return e.indexOf(t)<0&&!e.destroyed;}));}),Object(c.each)(e.enabled,function(e,n){if(t[n]){var r={};t[n].forEach(function(t){t.destroyed||(r[t.get("id")]=!0);}),e.forEach(function(e){if(!e.destroyed){var i=e.get("id");r[i]||(r[i]=!0,t[n].push(e));}});}else t[n]=e;}),this.graph.emit("graphstatechange",{states:t}),this.cachedStates={enabled:{},disabled:{}};},t.prototype.destroy=function(){this.graph=null,this.cachedStates=null,Kt&&clearTimeout(Kt),Kt=null,this.destroyed=!0;},t;}(),Qt=n(22),Jt=function Jt(t,e){return t&&e?t.replace(/\\?\{([^{}]+)\}/g,function(t,n){if("\\"===t.charAt(0))return t.slice(1);var r=e[n];return 0===r&&(r="0"),r||"";}):t;},te=function te(t){var e=[];if(t.length<2)throw new Error("point length must largn than 2, now it's ".concat(t.length));for(var n=0,r=t;n<r.length;n++){var i=r[n],o=i.x,a=i.y;e.push(o),e.push(a);}var s=Object(Qt.a)(e);return s.unshift(["M",t[0].x,t[0].y]),s;},ee=function ee(t,e,n,r){void 0===n&&(n=0),void 0===r&&(r=0);var i={x:(1-n)*t.x+n*e.x,y:(1-n)*t.y+n*e.y},o=[0,0];g.c.normalize(o,[e.x-t.x,e.y-t.y]),o&&(o[0]||o[1])||(o=[0,0]);var a=[-o[1]*r,o[0]*r];return i.x+=a[0],i.y+=a[1],i;},ne=function ne(t,e){var n=t.length;if(!n)return"";for(var r="",i=0;i<n;i++){var o=t[i];r+=Jt(0===i?"M{x} {y}":"L{x} {y}",o);}return e&&(r+="Z"),r;},re=function re(t){var e=[];return t.forEach(function(t){if("A"!==t[0])for(var n=1;n<t.length;n+=2){e.push([t[n],t[n+1]]);}else{var r=t.length;e.push([t[r-2],t[r-1]]);}}),e;},ie=function ie(t){if(t.length<2)throw new Error("point length must largn than 2, now it's ".concat(t.length));var e=t[0],n=t[1],r=t[t.length-1],i=t[t.length-2];t.unshift(r),t.unshift(i),t.push(e),t.push(n);for(var o=[],a=1;a<t.length-2;a+=1){var s=t[a-1].x,c=t[a-1].y,u=t[a].x,h=t[a].y,l=t[a+1].x,f=t[a+1].y,d=u+(l-s)/6,p=h+(f-c)/6,g=l-((a!==t.length-2?t[a+2].x:l)-u)/6,v=f-((a!==t.length-2?t[a+2].y:f)-h)/6;o.push(["C",d,p,g,v,l,f]);}return o.unshift(["M",r.x,r.y]),o;},oe=function oe(t,e){return g.c.scale([0,0],g.c.normalize([0,0],t),e);},ae=function ae(t,e){var n=[t[1]-e[1],e[0]-t[0]],r=Math.sqrt(n[0]*n[0]+n[1]*n[1]);if(0===r)throw new Error("p0 should not be equal to p1");return[n[0]/r,n[1]/r];},se=function se(t,e){return[e[0]-t[0],e[1]-t[1]];};function ce(t,e){if(!t||t.length<1)return"";if(1===t.length)return function(t){var n=[t[0][0],t[0][1]-e],r=[t[0][0],t[0][1]+e];return"M ".concat(n," A ").concat(e,",").concat(e,",0,0,0,").concat(r," A ").concat(e,",").concat(e,",0,0,0,").concat(n);}(t);if(2===t.length)return function(t){var n=g.c.scale([0,0],ae(t[0],t[1]),e),r=g.c.scale([0,0],n,-1),i=g.c.add([0,0],t[0],n),o=g.c.add([0,0],t[1],n),a=g.c.add([0,0],t[1],r),s=g.c.add([0,0],t[0],r);return"M ".concat(i," L ").concat(o," A ").concat([e,e,"0,0,0",a].join(",")," L ").concat(s," A ").concat([e,e,"0,0,0",i].join(","));}(t);for(var n=new Array(t.length),r=0;r<n.length;++r){var i=0===r?t[t.length-1]:t[r-1],o=t[r],a=g.c.scale([0,0],ae(i,o),e);n[r]=[g.c.add([0,0],i,a),g.c.add([0,0],o,a)];}var s="A ".concat([e,e,"0,0,0,"].join(","));return(n=n.map(function(t,e){var r="";return 0===e&&(r="M ".concat(n[n.length-1][1]," ")),r+="".concat(s+t[0]," L ").concat(t[1]);})).join(" ");}function ue(t,e){var n,r,i,o=t.length;if(!t||o<1)return"";if(1===o)return r=[(n=t)[0][0],n[0][1]-e],i=[n[0][0],n[0][1]+e],"M ".concat(r," A ").concat([e,e,"0,0,0",i].join(",")," A ").concat([e,e,"0,0,0",r].join(","));if(2===o)return function(t){var n=se(t[0],t[1]),r=oe(n,e),i=g.c.add([0,0],t[0],g.c.scale([0,0],r,-1)),o=g.c.add([0,0],t[1],r),a=1.2*e,s=oe(g.c.normalize([0,0],n),a),c=g.c.scale([0,0],s,-1),u=g.c.add([0,0],i,c),h=g.c.add([0,0],o,c),l=g.c.add([0,0],i,s);return"M ".concat(i," C ").concat([u,h,o].join(",")," S ").concat([l,i].join(",")," Z");}(t);for(var a=t.map(function(e,n){var r=t[(n+1)%o];return{p:e,v:g.c.normalize([0,0],se(e,r))};}),s=0;s<a.length;++s){var c=s>0?s-1:o-1,u=g.c.normalize([0,0],g.c.add([0,0],a[c].v,g.c.scale([0,0],a[s].v,-1)));a[s].p=g.c.add([0,0],a[s].p,g.c.scale([0,0],u,e));}return a.map(function(t){var e=t.p;return{x:e[0],y:e[1]};});}var he=function he(t,e,n){return(t.y-n.y)*(e.x-n.x)-(t.x-n.x)*(e.y-n.y);},le=function le(t){var e=t.map(function(t){return{x:t.getModel().x,y:t.getModel().y};});if(e.sort(function(t,e){return t.x===e.x?t.y-e.y:t.x-e.x;}),1===e.length)return e;for(var n=[],r=0;r<e.length;r++){for(;n.length>=2&&he(n[n.length-2],n[n.length-1],e[r])<=0;){n.pop();}n.push(e[r]);}var i=[];for(r=e.length-1;r>=0;r--){for(;i.length>=2&&he(i[i.length-2],i[i.length-1],e[r])<=0;){i.pop();}i.push(e[r]);}return i.pop(),n.pop(),n.concat(i);},fe={maxRoutingIterations:100,maxMarchingIterations:100,pixelGroupSize:2,edgeR0:10,edgeR1:10,nodeR0:5,nodeR1:10,morphBuffer:5,threshold:0.001,skip:16,nodeInfluenceFactor:1,edgeInfluenceFactor:1,negativeNodeInfluenceFactor:-0.5};function de(t,e,n){var r=!1,i=function i(t,n){return e.cells[t+n*e.width];},o=function o(t,e){var r=0;return i(t-1,e-1)>=n&&(r+=1),i(t,e-1)>n&&(r+=2),i(t-1,e)>n&&(r+=4),i(t,e)>n&&(r+=8),r;},a=function a(n,r){for(var i,a,s=n,c=r,u=0;u<e.width*e.height;u++){if(i=s,a=c,t.findIndex(function(t){return t.x===s&&t.y===c;})>-1){if(t[0].x===s&&t[0].y===c)return!0;}else t.push({x:s,y:c});var h=o(s,c);switch(h){case-1:return console.warn("Marched out of bounds"),!0;case 0:case 3:case 2:case 7:s++;break;case 12:case 14:case 4:s--;break;case 6:0===i&&(-1===a?s-=1:s+=1);break;case 1:case 13:case 5:c--;break;case 9:1===i&&(0===a?c-=1:c+=1);break;case 10:case 8:case 11:c++;break;default:return console.warn("Marching squares invalid state: ".concat(h)),!0;}}};this.march=function(){for(var t=0;t<e.width&&!r;t+=1){for(var s=0;s<e.height&&!r;s+=1){i(t,s)>n&&15!==o(t,s)&&(r=a(t,s));}}return r;};}var pe=function pe(t,e){var n=Number.POSITIVE_INFINITY,r=null;return t.forEach(function(t){var i=q(t,e);i>=0&&i<n&&(r=t,n=i);}),r;};function ge(t,e,n,r,i){var o=function(t,e,n){var r=null,i=Number.POSITIVE_INFINITY;return e.forEach(function(e){var o={x:t.getModel().x,y:t.getModel().y},a={x:e.getModel().x,y:e.getModel().y},s=G(o,a),c=new Y(o.x,o.y,a.x,a.y),u=n.reduce(function(t,e){return q(e,c)>0?t+1:t;},0);s*Math.pow(u+1,2)<i&&(r=e,i=s*Math.pow(u+1,2));}),r;}(t,n,e);if(null===o)return[];return function(t){for(var n=[];t.length>0;){var r=t.pop();if(0===t.length){n.push(r);break;}var i=t.pop(),o=new Y(r.x1,r.y1,i.x2,i.y2);pe(e,o)?(n.push(r),t.push(i)):t.push(o);}return n;}(function(t,e,n,r){var i=[],o=[];o.push(t);for(var a=!0,s=0,c=function c(t,e){var n=!1;return e.forEach(function(e){n||(U(t,{x:e.x1,y:e.y1})||U(t,{x:e.x2,y:e.y2}))&&(n=!0);}),n;},u=function u(t,e){for(var n=0,r=e;n<r.length;n++){var i=r[n].getBBox(),o=[[i.x,i.y],[i.x+i.width,i.y],[i.x,i.y+i.height],[i.x+i.width,i.y+i.height]];if(_(o,t.x,t.y))return!0;}return!1;};a&&s<n;){a=!1;for(var h=function h(){var t=o.pop(),n=pe(e,t);if(n){var h=W(n,t),l=h[0];if(2===h[1]){var f=function f(s){for(var h=r,f=me(n,h,l,s),d=c(f,o)||c(f,i),p=u(f,e);!d&&p&&h>=1;){f=me(n,h/=1.5,l,s),d=c(f,o)||c(f,i),p=u(f,e);}!f||d||s&&p||(o.push(new Y(t.x1,t.y1,f.x,f.y)),o.push(new Y(f.x,f.y,t.x2,t.y2)),a=!0);};f(!0),a||f(!1);}}a||i.push(t),s+=1;};!a&&o.length;){h();}}for(;o.length;){i.push(o.pop());}return i;}(new Y(t.getModel().x,t.getModel().y,o.getModel().x,o.getModel().y),e,r,i));}var ve=function ve(t,e,n){var r=Object.assign(fe,n),i=V(t.map(function(t){return{x:t.getModel().x,y:t.getModel().y};}));t=t.sort(function(t,e){return G({x:t.getModel().x,y:t.getModel().y},i)-G({x:e.getModel().x,y:e.getModel().y},i);});var o=[],a=[];t.forEach(function(t){ge(t,e,o,r.maxRoutingIterations,r.morphBuffer).forEach(function(t){a.push(t);}),o.push(t);});for(var s,c,u,h,l,f=function(t,e,n){var r={minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY,width:0,height:0,x:0,y:0},i=[];t.forEach(function(t){i.push(t.getBBox());}),e.forEach(function(t){i.push(t.getBBox());});for(var o=0,a=i;o<a.length;o++){var s=a[o];r.minX=(s.minX<r.minX?s.minX:r.minX)-n,r.minY=(s.minY<r.minY?s.minY:r.minY)-n,r.maxX=(s.maxX>r.maxX?s.maxX:r.maxX)+n,r.maxY=(s.maxY>r.maxY?s.maxY:r.maxY)+n;}return r.width=r.maxX-r.minX,r.height=r.maxY-r.minY,r.x=r.minX,r.y=r.minY,r;}(t,a,r.nodeR0),d=(s=f.width,c=f.height,u=r.pixelGroupSize,h=Math.ceil(s/u),l=Math.ceil(c/u),{cells:new Float32Array(Math.max(0,h*l)).fill(0),width:h,height:l}),p=[],g=[],v=0;v<r.maxMarchingIterations;v++){if(ye(t,e,a,f,d,r),g=[],new de(p=[],d,r.threshold).march()){var y=p.map(function(t){return{x:Math.round(t.x*r.pixelGroupSize+f.minX),y:Math.round(t.y*r.pixelGroupSize+f.minY)};});if(y){var m=y.length;if(r.skip>1)for(m=Math.floor(y.length/r.skip);m<3&&r.skip>1;){r.skip-=1,m=Math.floor(y.length/r.skip);}for(var b=0,x=0;x<m;x+=1,b+=r.skip){g.push({x:y[b].x,y:y[b].y});}}if(g&&function(){for(var e=0,n=t;e<n.length;e++){var r=n[e],i=g.map(function(t){return[t.x,t.y];});if(!_(i,r.getBBox().centerX,r.getBBox().centerY))return!1;}return!0;}())return g;if(r.threshold*=0.9,v<=0.5*r.maxMarchingIterations)r.memberInfluenceFactor*=1.2,r.edgeInfluenceFactor*=1.2;else{if(!(0!==r.nonMemberInfluenceFactor&&e.length>0))break;r.nonMemberInfluenceFactor*=0.8;}}}return g;};function ye(t,e,n,r,i,o){function a(t,e){var n=Math.floor((t-e)/o.pixelGroupSize);return n<0?0:n;}function s(t,e){return t*o.pixelGroupSize+e;}var c=(o.nodeR0-o.nodeR1)*(o.nodeR0-o.nodeR1),u=(o.edgeR0-o.edgeR1)*(o.edgeR0-o.edgeR1),h=function h(t,e){return[Math.min(a(t.minX,e+r.minX),i.width),Math.min(a(t.minY,e+r.minY),i.height),Math.min(a(t.maxX,-e+r.minX),i.width),Math.min(a(t.maxY,-e+r.minY),i.height)];},l=function l(t,e){for(var n=t.getBBox(),a=h(n,o.nodeR1),c=a[0],u=a[1],l=a[2],f=a[3],d=u;d<f;d+=1){for(var p=c;p<l;p+=1){if(!(e<0&&i[p+d*i.width]<=0)){var g=s(p,r.minX),v=s(d,r.minY),y=Z({x:g,y:v},{x:n.minX,y:n.minY,width:n.width,height:n.height});if(y<Math.pow(o.nodeR1,2)){var m=Math.sqrt(y)-o.nodeR1;i.cells[p+d*i.width]+=e*m*m;}}}}};o.nodeInfluenceFactor&&t.forEach(function(t){l(t,o.nodeInfluenceFactor/c);}),o.edgeInfluenceFactor&&n.forEach(function(t){!function(t,e){for(var n=t.getBBox(),a=h(n,o.edgeR1),c=a[0],u=a[1],l=a[2],f=a[3],d=u;d<f;d+=1){for(var p=c;p<l;p+=1){if(!(e<0&&i.cells[p+d*i.width]<=0)){var g=s(p,r.minX),v=s(d,r.minY),y=H({x:g,y:v},t);if(y<Math.pow(o.edgeR1,2)){var m=Math.sqrt(y)-o.edgeR1;i.cells[p+d*i.width]+=e*m*m;}}}}}(t,o.edgeInfluenceFactor/u);}),o.negativeNodeInfluenceFactor&&e.forEach(function(t){l(t,o.negativeNodeInfluenceFactor/c);});}function me(t,e,n,r){var i=t.getBBox(),o=n[0],a=n[1],s=n[2],c=n[3],u={topLeft:{x:i.minX-e,y:i.minY-e},topRight:{x:i.maxX+e,y:i.minY-e},bottomLeft:{x:i.minX-e,y:i.maxY+e},bottomRight:{x:i.maxX+e,y:i.maxY+e}},h=i.height*i.width;function l(t,e){return i.width*(0.5*(t.y-i.minY+(e.y-i.minY)));}if(a)return o?r?u.topLeft:u.bottomRight:s?r?u.bottomLeft:u.topRight:l(a,c)<0.5*h?a.y>c.y?r?u.topLeft:u.bottomRight:r?u.topRight:u.bottomLeft:a.y<c.y?r?u.bottomLeft:u.topRight:r?u.bottomRight:u.topLeft;if(c){if(o)return r?u.topRight:u.bottomLeft;if(s)return r?u.bottomRight:u.topLeft;}return l(o,s)<0.5*h?o.x>s.x?r?u.topLeft:u.bottomRight:r?u.bottomLeft:u.topRight:o.x<s.x?r?u.topRight:u.bottomLeft:r?u.bottomRight:u.topLeft;}var be=function(){function t(t,e){this.cfg=Object(c.deepMix)(this.getDefaultCfg(),e),this.graph=t,this.id=this.cfg.id,this.group=this.cfg.group,this.members=this.cfg.members.map(function(e){return Object(c.isString)(e)?t.findById(e):e;}),this.nonMembers=this.cfg.nonMembers.map(function(e){return Object(c.isString)(e)?t.findById(e):e;}),this.setPadding(),this.setType(),this.path=this.calcPath(this.members,this.nonMembers),this.render();}return t.prototype.getDefaultCfg=function(){return{id:"g6-hull",type:"round-convex",members:[],nonMembers:[],style:{fill:"lightblue",stroke:"blue",opacity:0.2},padding:10};},t.prototype.setPadding=function(){var t=this.members.length&&this.members[0].getKeyShape().getCanvasBBox().width/2;this.padding=this.cfg.padding>0?this.cfg.padding+t:10+t,this.cfg.bubbleCfg={nodeR0:this.padding-t,nodeR1:this.padding-t,morphBuffer:this.padding-t};},t.prototype.setType=function(){this.type=this.cfg.type,this.members.length<3&&(this.type="round-convex"),"round-convex"!==this.type&&"smooth-convex"!==this.type&&"bubble"!==this.type&&(console.warn("The hull type should be either round-convex, smooth-convex or bubble, round-convex is used by default."),this.type="round-convex");},t.prototype.calcPath=function(t,e){var n,r,i;switch(this.type){case"round-convex":i=ce((n=le(t)).map(function(t){return[t.x,t.y];}),this.padding),r=Object(Qt.b)(i);break;case"smooth-convex":2===(n=le(t)).length?(i=ce(n.map(function(t){return[t.x,t.y];}),this.padding),r=Object(Qt.b)(i)):n.length>2&&(i=ue(n.map(function(t){return[t.x,t.y];}),this.padding),r=ie(i));break;case"bubble":r=(n=ve(t,e,this.cfg.bubbleCfg)).length>=2&&ie(n);}return r;},t.prototype.render=function(){this.group.addShape("path",{attrs:Object(f.a)({path:this.path},this.cfg.style),id:this.id,name:this.cfg.id}),this.group.toBack();},t.prototype.addMember=function(t){if(t){Object(c.isString)(t)&&(t=this.graph.findById(t)),this.members.push(t);var e=this.nonMembers.indexOf(t);return e>-1&&this.nonMembers.splice(e,1),this.updateData(this.members,this.nonMembers),!0;}},t.prototype.addNonMember=function(t){if(t){Object(c.isString)(t)&&(t=this.graph.findById(t)),this.nonMembers.push(t);var e=this.members.indexOf(t);return e>-1&&this.members.splice(e,1),this.updateData(this.members,this.nonMembers),!0;}},t.prototype.removeMember=function(t){if(t){Object(c.isString)(t)&&(t=this.graph.findById(t));var e=this.members.indexOf(t);return e>-1&&(this.members.splice(e,1),this.updateData(this.members,this.nonMembers),!0);}},t.prototype.removeNonMember=function(t){if(t){Object(c.isString)(t)&&(t=this.graph.findById(t));var e=this.nonMembers.indexOf(t);return e>-1&&(this.nonMembers.splice(e,1),this.updateData(this.members,this.nonMembers),!0);}},t.prototype.updateData=function(t,e){var n=this;this.group.findById(this.id).remove(),t&&(this.members=t.map(function(t){return Object(c.isString)(t)?n.graph.findById(t):t;})),e&&(this.nonMembers=e.map(function(t){return Object(c.isString)(t)?n.graph.findById(t):t;})),this.path=this.calcPath(this.members,this.nonMembers),this.render();},t.prototype.updateStyle=function(t){this.group.findById(this.id).attr(Object(f.a)({},t));},t.prototype.updateCfg=function(t){var e=this;this.cfg=Object(c.deepMix)(this.cfg,t),this.id=this.cfg.id,this.group=this.cfg.group,t.members&&(this.members=this.cfg.members.map(function(t){return Object(c.isString)(t)?e.graph.findById(t):t;})),t.nonMembers&&(this.nonMembers=this.cfg.nonMembers.map(function(t){return Object(c.isString)(t)?e.graph.findById(t):t;})),this.setPadding(),this.setType(),this.path=this.calcPath(this.members,this.nonMembers),this.render();},t.prototype.contain=function(t){var e,n,r=this,i=(e=Object(c.isString)(t)?this.graph.findById(t):t).getKeyShape();if("path"===e.get("type"))n=re(i.attr("path"));else{var o=i.getCanvasBBox();n=[[o.minX,o.minY],[o.maxX,o.minY],[o.maxX,o.maxY],[o.minX,o.maxY]];}return n=n.map(function(t){var e=r.graph.getPointByCanvas(t[0],t[1]);return[e.x,e.y];}),F(n,re(this.path));},t.prototype.destroy=function(){this.group.remove(),this.cfg=null;},t;}(),xe=g.a.transform,we=function(t){function e(e){var n=t.call(this)||this;return n.cfg=Object(c.deepMix)(n.getDefaultCfg(),e),n.init(),n.animating=!1,n.destroyed=!1,n.cfg.enabledStack&&(n.undoStack=new v.Stack(n.cfg.maxStep),n.redoStack=new v.Stack(n.cfg.maxStep)),n;}return Object(f.c)(e,t),e.prototype.init=function(){this.initCanvas();var t=new Nt(this),e=new Ot(this),n=new Zt(this),r=new $t(this);this.set({viewController:t,modeController:e,itemController:n,stateController:r}),this.initLayoutController(),this.initEventController(),this.initGroups(),this.initPlugins(),this.timeIndex=Object(p.requestAnimationFrame)(this.onTick.bind(this));},e.prototype.initGroups=function(){var t=this.get("canvas"),e=this.get("canvas").get("el").id,n=t.addGroup({id:"".concat(e,"-root"),className:nt.rootContainerClassName});if(this.get("groupByTypes")){var r=n.addGroup({id:"".concat(e,"-edge"),className:nt.edgeContainerClassName}),i=n.addGroup({id:"".concat(e,"-node"),className:nt.nodeContainerClassName}),o=n.addGroup({id:"".concat(e,"-combo"),className:nt.comboContainerClassName});o.toBack(),this.set({nodeGroup:i,edgeGroup:r,comboGroup:o});}var a=n.addGroup({id:"".concat(e,"-delegate"),className:nt.delegateContainerClassName});this.set({delegateGroup:a}),this.set("group",n);},e.prototype.getDefaultCfg=function(){return{container:void 0,width:void 0,height:void 0,renderer:"canvas",modes:{},plugins:[],data:{},fitViewPadding:10,minZoom:0.2,maxZoom:10,event:!0,groupByTypes:!0,directed:!1,autoPaint:!0,nodes:[],edges:[],combos:[],vedges:[],itemMap:{},linkCenter:!1,defaultNode:{},defaultEdge:{},nodeStateStyles:{},edgeStateStyles:{},states:{},animate:!1,animateCfg:{onFrame:void 0,duration:500,easing:"easeLinear"},callback:void 0,enabledStack:!1,maxStep:10,tooltips:[]};},e.prototype.set=function(t,e){return Object(c.isPlainObject)(t)?this.cfg=Object(f.a)(Object(f.a)({},this.cfg),t):this.cfg[t]=e,this;},e.prototype.get=function(t){return this.cfg[t];},e.prototype.getGroup=function(){return this.get("group");},e.prototype.getContainer=function(){return this.get("container");},e.prototype.getMinZoom=function(){return this.get("minZoom");},e.prototype.setMinZoom=function(t){return this.set("minZoom",t);},e.prototype.getMaxZoom=function(){return this.get("maxZoom");},e.prototype.setMaxZoom=function(t){return this.set("maxZoom",t);},e.prototype.getWidth=function(){return this.get("width");},e.prototype.getHeight=function(){return this.get("height");},e.prototype.clearItemStates=function(t,e){Object(c.isString)(t)&&(t=this.findById(t));var n=this.get("itemController");e||(e=t.get("states")),n.clearItemStates(t,e),this.get("stateController").updateStates(t,e,!1);},e.prototype.node=function(t){"function"==typeof t&&this.set("nodeMapper",t);},e.prototype.edge=function(t){"function"==typeof t&&this.set("edgeMapper",t);},e.prototype.combo=function(t){"function"==typeof t&&this.set("comboMapper",t);},e.prototype.findById=function(t){return this.get("itemMap")[t];},e.prototype.find=function(t,e){var n,r=this.get("".concat(t,"s"));return Object(c.each)(r,function(t,r){if(e(t,r))return n=t;}),n;},e.prototype.findAll=function(t,e){var n=[];return Object(c.each)(this.get("".concat(t,"s")),function(t,r){e(t,r)&&n.push(t);}),n;},e.prototype.findAllByState=function(t,e){return this.findAll(t,function(t){return t.hasState(e);});},e.prototype.translate=function(t,e){var n=this.get("group"),r=Object(c.clone)(n.getMatrix());r||(r=[1,0,0,0,1,0,0,0,1]),r=xe(r,[["t",t,e]]),n.setMatrix(r),this.emit("viewportchange",{action:"translate",matrix:n.getMatrix()}),this.autoPaint();},e.prototype.moveTo=function(t,e){var n=this.get("group");T(n,{x:t,y:e}),this.emit("viewportchange",{action:"move",matrix:n.getMatrix()});},e.prototype.fitView=function(t){t&&this.set("fitViewPadding",t),this.get("viewController").fitView(),this.autoPaint();},e.prototype.fitCenter=function(){this.get("viewController").fitCenter(),this.autoPaint();},e.prototype.addBehaviors=function(t,e){return this.get("modeController").manipulateBehaviors(t,e,!0),this;},e.prototype.removeBehaviors=function(t,e){return this.get("modeController").manipulateBehaviors(t,e,!1),this;},e.prototype.updateBehavior=function(t,e,n){return this.get("modeController").updateBehavior(t,e,n),this;},e.prototype.zoom=function(t,e){var n=this.get("group"),r=Object(c.clone)(n.getMatrix()),i=this.get("minZoom"),o=this.get("maxZoom");r||(r=[1,0,0,0,1,0,0,0,1]),r=xe(r,e?[["t",-e.x,-e.y],["s",t,t],["t",e.x,e.y]]:[["s",t,t]]),i&&r[0]<i||o&&r[0]>o||(n.setMatrix(r),this.emit("viewportchange",{action:"zoom",matrix:r}),this.autoPaint());},e.prototype.zoomTo=function(t,e){var n=t/this.getZoom();this.zoom(n,e);},e.prototype.focusItem=function(t,e,n){var r=this.get("viewController"),i=!1;e?i=!0:void 0===e&&(i=this.get("animate"));var o={};n?o=n:void 0===n&&(o=this.get("animateCfg")),r.focus(t,i,o),this.autoPaint();},e.prototype.autoPaint=function(){this.get("autoPaint")&&this.paint();},e.prototype.paint=function(){this.emit("beforepaint"),this.get("canvas").draw(),this.emit("afterpaint");},e.prototype.getPointByClient=function(t,e){return this.get("viewController").getPointByClient(t,e);},e.prototype.getClientByPoint=function(t,e){return this.get("viewController").getClientByPoint(t,e);},e.prototype.getPointByCanvas=function(t,e){return this.get("viewController").getPointByCanvas(t,e);},e.prototype.getCanvasByPoint=function(t,e){return this.get("viewController").getCanvasByPoint(t,e);},e.prototype.getGraphCenterPoint=function(){var t=this.get("group").getCanvasBBox();return{x:(t.minX+t.maxX)/2,y:(t.minY+t.maxY)/2};},e.prototype.getViewPortCenterPoint=function(){return this.getPointByCanvas(this.get("width")/2,this.get("height")/2);},e.prototype.showItem=function(t,e){void 0===e&&(e=!0);var n=this.get("itemController").changeItemVisibility(t,!0);if(e&&this.get("enabledStack")){var r=n.getID(),i={},o={};switch(n.getType()){case"node":i.nodes=[{id:r,visible:!1}],o.nodes=[{id:r,visible:!0}];break;case"edge":i.nodes=[{id:r,visible:!1}],o.edges=[{id:r,visible:!0}];break;case"combo":i.nodes=[{id:r,visible:!1}],o.combos=[{id:r,visible:!0}];}this.pushStack("visible",{before:i,after:o});}},e.prototype.hideItem=function(t,e){void 0===e&&(e=!0);var n=this.get("itemController").changeItemVisibility(t,!1);if(e&&this.get("enabledStack")){var r=n.getID(),i={},o={};switch(n.getType()){case"node":i.nodes=[{id:r,visible:!0}],o.nodes=[{id:r,visible:!1}];break;case"edge":i.nodes=[{id:r,visible:!0}],o.edges=[{id:r,visible:!1}];break;case"combo":i.nodes=[{id:r,visible:!0}],o.combos=[{id:r,visible:!1}];}this.pushStack("visible",{before:i,after:o});}},e.prototype.refreshItem=function(t){this.get("itemController").refreshItem(t);},e.prototype.setAutoPaint=function(t){this.set("autoPaint",t),this.get("canvas").set("autoDraw",t);},e.prototype.remove=function(t,e){void 0===e&&(e=!0),this.removeItem(t,e);},e.prototype.removeItem=function(t,e){void 0===e&&(e=!0);var n=t;if(Object(c.isString)(t)&&(n=this.findById(t)),!n&&Object(c.isString)(t))console.warn("The item to be removed does not exist!");else if(n){var r="";if(n.getType&&(r=n.getType()),e&&this.get("enabledStack")){var i=Object(f.a)(Object(f.a)({},n.getModel()),{itemType:r}),o={};switch(r){case"node":o.nodes=[i],o.edges=[];for(var a=n.getEdges(),s=a.length-1;s>=0;s--){o.edges.push(Object(f.a)(Object(f.a)({},a[s].getModel()),{itemType:"edge"}));}break;case"edge":o.edges=[i];break;case"combo":o.combos=[i];}this.pushStack("delete",{before:o,after:{}});}if("node"===r)n.getModel().comboId&&this.updateComboTree(n);if(this.get("itemController").removeItem(n),"combo"===r){var u=mt(this.get("comboTrees"));this.set("comboTrees",u);}}},e.prototype.addItem=function(t,e,n,r){void 0===n&&(n=!0),void 0===r&&(r=!0);var i=this.get("comboSorted");this.set("comboSorted",i&&!r);var o=this.get("itemController");if(!function(t,e){if("node"===t||"combo"===t){if(e.id&&!Object(c.isString)(e.id))return console.warn("G6 Warning Tips: missing 'id' property, or the 'id' %c".concat(e.id,"%c is not a string."),"font-size: 20px; color: red;",""),!1;}else if(!("edge"!==t||e.source&&e.target))return console.warn("G6 Warning Tips: missing 'source' or 'target' for the edge."),!1;return!0;}(t,e))return!1;if(!e.id||!this.findById(e.id)){var a,s=this.get("comboTrees");if(s||(s=[]),"combo"===t){var u=this.get("itemMap"),h=!1;if(s.forEach(function(n){h||pt(n,function(n){if(e.parentId===n.id){h=!0;var r=Object(f.a)({id:e.id,depth:n.depth+2},e);n.children?n.children.push(r):n.children=[r],e.depth=r.depth,a=o.addItem(t,e);}var i=u[n.id];return h&&i&&i.getType&&"combo"===i.getType()&&o.updateCombo(i,n.children),!0;});}),!h){var l=Object(f.a)({id:e.id,depth:0},e);e.depth=l.depth,s.push(l),a=o.addItem(t,e);}this.set("comboTrees",s);}else if("node"===t&&Object(c.isString)(e.comboId)&&s){var d;(d=this.findById(e.comboId))&&d.getType&&"combo"!==d.getType()&&console.warn("'".concat(e.comboId,"' is not a id of a combo in the graph, the node will be added without combo.")),a=o.addItem(t,e);var p=this.get("itemMap"),g=!1,v=!1;(s||[]).forEach(function(t){v||g||pt(t,function(t){if(t.id===e.id)return v=!0,!1;if(e.comboId===t.id&&!v){g=!0;var n=Object(c.clone)(e);n.itemType="node",t.children?t.children.push(n):t.children=[n],n.depth=t.depth+1;}return g&&p[t.id].getType&&"combo"===p[t.id].getType()&&o.updateCombo(p[t.id],t.children),!0;});});}else a=o.addItem(t,e);if("node"===t&&e.comboId||"combo"===t&&e.parentId)(d=this.findById(e.comboId||e.parentId))&&d.getType&&"combo"===d.getType()&&d.addChild(a);var y=this.get("combos");if(y&&y.length>0&&this.sortCombos(),this.autoPaint(),n&&this.get("enabledStack")){var m=Object(f.a)(Object(f.a)({},a.getModel()),{itemType:t}),b={};switch(t){case"node":b.nodes=[m];break;case"edge":b.edges=[m];break;case"combo":b.combos=[m];}this.pushStack("add",{before:{},after:b});}return a;}console.warn("This item exists already. Be sure the id %c".concat(e.id,"%c is unique."),"font-size: 20px; color: red;","");},e.prototype.add=function(t,e,n,r){return void 0===n&&(n=!0),void 0===r&&(r=!0),this.addItem(t,e,n,r);},e.prototype.updateItem=function(t,e,n){var r=this;void 0===n&&(n=!0);var i,o=this.get("itemController");i=Object(c.isString)(t)?this.findById(t):t;var a=Object(c.clone)(i.getModel()),s="";i.getType&&(s=i.getType());var u=Object(f.f)([],i.getStates(),!0);if("combo"===s&&Object(c.each)(u,function(t){return r.setItemState(i,t,!1);}),o.updateItem(i,e),"combo"===s&&Object(c.each)(u,function(t){return r.setItemState(i,t,!0);}),n&&this.get("enabledStack")){var h={nodes:[],edges:[],combos:[]},l={nodes:[],edges:[],combos:[]},d=Object(f.a)({id:a.id},e);switch(s){case"node":h.nodes.push(a),l.nodes.push(d);break;case"edge":h.edges.push(a),l.edges.push(d);break;case"combo":h.combos.push(a),l.combos.push(d);}"node"===s&&h.nodes.push(a),this.pushStack("update",{before:h,after:l});}},e.prototype.update=function(t,e,n){void 0===n&&(n=!0),this.updateItem(t,e,n);},e.prototype.setItemState=function(t,e,n){Object(c.isString)(t)&&(t=this.findById(t)),this.get("itemController").setItemState(t,e,n);var r=this.get("stateController");Object(c.isString)(n)?r.updateState(t,"".concat(e,":").concat(n),!0):r.updateState(t,e,n);},e.prototype.priorityState=function(t,e){this.get("itemController").priorityState(t,e);},e.prototype.data=function(t){St(t),this.set("data",t);},e.prototype.render=function(){var t=this;this.set("comboSorted",!1);var e=this.get("data");if(this.get("enabledStack")&&this.clearStack(),!e)throw new Error("data must be defined first");var n=e.nodes,r=void 0===n?[]:n,i=e.edges,o=void 0===i?[]:i,a=e.combos,s=void 0===a?[]:a;if(this.clear(!0),this.emit("beforerender"),Object(c.each)(r,function(e){t.add("node",e,!1,!1);}),s&&0!==s.length){var u=yt(s,r);this.set("comboTrees",u),t.addCombos(s);}Object(c.each)(o,function(e){t.add("edge",e,!1,!1);});var h=t.get("animate");(t.get("fitView")||t.get("fitCenter"))&&t.set("animate",!1);var l=t.get("layoutController");if(l){if(l.layout(function(){t.get("fitView")?t.fitView():t.get("fitCenter")&&t.fitCenter();t.autoPaint(),t.emit("afterrender"),(t.get("fitView")||t.get("fitCenter"))&&t.set("animate",h);}),this.refreshPositions(),this.destroyed)return;}else t.get("fitView")&&t.fitView(),t.get("fitCenter")&&t.fitCenter(),t.emit("afterrender"),t.set("animate",h);this.get("groupByTypes")||(s&&0!==s.length?this.sortCombos():e.nodes&&e.edges&&e.nodes.length<e.edges.length?this.getNodes().forEach(function(t){t.toFront();}):this.getEdges().forEach(function(t){t.toBack();}));this.get("enabledStack")&&this.pushStack("render");},e.prototype.read=function(t){this.data(t),this.render();},e.prototype.diffItems=function(t,e,n){var r,i=this,o=this.get("itemMap");Object(c.each)(n,function(n){if(r=o[n.id]){if(i.get("animate")&&"node"===t){var a=r.getContainer().getMatrix();a||(a=[1,0,0,0,1,0,0,0,1]),r.set("originAttrs",{x:a[6],y:a[7]});}i.updateItem(r,n,!1);}else r=i.addItem(t,n,!1);r&&e["".concat(t,"s")].push(r);});},e.prototype.changeData=function(t,e){void 0===e&&(e=!0);var n=this;if(!St(t))return this;e&&this.get("enabledStack")&&this.pushStack("changedata",{before:n.save(),after:t}),this.set("comboSorted",!1),this.removeHulls(),this.getNodes().map(function(t){return n.clearItemStates(t);}),this.getEdges().map(function(t){return n.clearItemStates(t);});var r=this.get("canvas"),i=r.get("localRefresh");r.set("localRefresh",!1),n.get("data")||(n.data(t),n.render());var o=this.get("itemMap"),a={nodes:[],edges:[]},s=t.combos;if(s){var u=yt(s,t.nodes);this.set("comboTrees",u);}this.diffItems("node",a,t.nodes),Object(c.each)(o,function(t,e){o[e].getModel().depth=0,t.getType&&"edge"===t.getType()||(t.getType&&"combo"===t.getType()?(delete o[e],t.destroy()):a.nodes.indexOf(t)<0&&(delete o[e],n.remove(t,!1)));});for(var h=this.getCombos(),l=h.length-1;l>=0;l--){h[l].destroyed&&h.splice(l,1);}s&&(n.addCombos(s),this.get("groupByTypes")||this.sortCombos()),this.diffItems("edge",a,t.edges),Object(c.each)(o,function(t,e){(!t.getType||"node"!==t.getType()&&"combo"!==t.getType())&&a.edges.indexOf(t)<0&&(delete o[e],n.remove(t,!1));}),this.set({nodes:a.nodes,edges:a.edges});var f=this.get("layoutController");return f&&(f.changeData(),n.get("animate")&&!f.getLayoutType()?n.positionsAnimate():n.autoPaint()),setTimeout(function(){r.set("localRefresh",i);},16),this;},e.prototype.addCombos=function(t){var e=this.get("comboTrees");this.get("itemController").addCombos(e,t);},e.prototype.createCombo=function(t,e){var n=this;this.set("comboSorted",!1);var r,i="";if(t){if(Object(c.isString)(t))i=t,r={id:t};else{if(!(i=t.id))return void console.warn("Create combo failed. Please assign a unique string id for the adding combo.");r=t;}var o=e.map(function(t){var e=n.findById(t),r=e.getModel(),o="";e.getType&&(o=e.getType());var a={id:e.getID(),itemType:o};return"combo"===o?(a.parentId=i,r.parentId=i):"node"===o&&(a.comboId=i,r.comboId=i),a;});r.children=o,this.addItem("combo",r,!1),this.set("comboSorted",!1);var a=this.get("comboTrees");(a||[]).forEach(function(t){pt(t,function(t){return t.id!==i||(t.itemType="combo",t.children=o,!1);});}),a&&this.sortCombos();}},e.prototype.uncombo=function(t){var e=this,n=t;if(Object(c.isString)(t)&&(n=this.findById(t)),!n||n.getType&&"combo"!==n.getType())console.warn("The item is not a combo!");else{var r=n.getModel().parentId,i=this.get("comboTrees");i||(i=[]);var o,a=this.get("itemMap"),s=n.get("id"),u=[],h=this.get("combos"),l=this.findById(r);if(i.forEach(function(i){o||pt(i,function(i){if(i.id===s){o=i,n.getEdges().forEach(function(t){e.removeItem(t,!1);});var c=h.indexOf(t);h.splice(c,1),delete a[s],n.destroy();}return!r||!o||i.id!==r||(l.removeCombo(n),-1!==(c=(u=i.children).indexOf(o))&&u.splice(c,1),o.children.forEach(function(t){var n=e.findById(t.id),i=n.getModel();n.getType&&"combo"===n.getType()?(t.parentId=r,delete t.comboId,i.parentId=r,delete i.comboId):n.getType&&"node"===n.getType()&&(t.comboId=r,i.comboId=r),l.addChild(n),u.push(t);}),!1);});}),!r&&o){var f=i.indexOf(o);i.splice(f,1),o.children.forEach(function(t){t.parentId=void 0;var n=e.findById(t.id).getModel();delete n.parentId,delete n.comboId,"node"!==t.itemType&&i.push(t);});}}},e.prototype.updateCombos=function(){var t=this,e=this.get("comboTrees"),n=this.get("itemController"),r=this.get("itemMap");(e||[]).forEach(function(e){pt(e,function(e){if(!e)return!0;var i=r[e.id];if(i&&i.getType&&"combo"===i.getType()){var o=Object(f.f)([],i.getStates(),!0);Object(c.each)(o,function(e){return t.setItemState(i,e,!1);}),n.updateCombo(i,e.children),Object(c.each)(o,function(e){return t.setItemState(i,e,!0);});}return!0;});}),this.sortCombos();},e.prototype.updateCombo=function(t){var e,n=this,r=t;if(Object(c.isString)(t)&&(r=this.findById(t)),!r||r.getType&&"combo"!==r.getType())console.warn("The item to be updated is not a combo!");else{e=r.get("id");var i=this.get("comboTrees"),o=this.get("itemController"),a=this.get("itemMap");(i||[]).forEach(function(t){pt(t,function(t){if(!t)return!0;var r=a[t.id];if(e===t.id&&r&&r.getType&&"combo"===r.getType()){var i=Object(f.f)([],r.getStates(),!0);Object(c.each)(i,function(t){r.getStateStyle(t)&&n.setItemState(r,t,!1);}),o.updateCombo(r,t.children),Object(c.each)(i,function(t){r.getStateStyle(t)&&n.setItemState(r,t,!0);}),e&&(e=t.parentId);}return!0;});});}},e.prototype.updateComboTree=function(t,e,n){void 0===n&&(n=!0);var r;this.set("comboSorted",!1);var i,o=(r=Object(c.isString)(t)?this.findById(t):t).getModel(),a=o.comboId||o.parentId,s="";if(r.getType&&(s=r.getType()),e&&"combo"===s){var u,h=this.get("comboTrees"),l=!0;if((h||[]).forEach(function(t){u||dt(t,function(t){if(!u)return t.id===r.getID()&&(u=t),!0;});}),dt(u,function(t){return t.id!==e||(l=!1,!1);}),!l)return void console.warn("Failed to update the combo tree! The parentId points to a descendant of the combo!");}if(n&&this.get("enabledStack")){var f={},d={};"combo"===s?(f.combos=[{id:o.id,parentId:o.parentId}],d.combos=[{id:o.id,parentId:e}]):"node"===s&&(f.nodes=[{id:o.id,parentId:o.comboId}],d.nodes=[{id:o.id,parentId:e}]),this.pushStack("updateComboTree",{before:f,after:d});}if(o.parentId||o.comboId){var p=this.findById(o.parentId||o.comboId);p&&p.removeChild(r);}("combo"===s?o.parentId=e:"node"===s&&(o.comboId=e),e)&&(i=this.findById(e))&&i.addChild(r);a&&(i=this.findById(a))&&i.removeChild(r);var g=mt(this.get("comboTrees"),o.id,e);this.set("comboTrees",g),this.updateCombos();},e.prototype.save=function(){var t=[],e=[],n=[];return Object(c.each)(this.get("nodes"),function(e){t.push(e.getModel());}),Object(c.each)(this.get("edges"),function(t){e.push(t.getModel());}),Object(c.each)(this.get("combos"),function(t){n.push(t.getModel());}),{nodes:t,edges:e,combos:n};},e.prototype.changeSize=function(t,e){return this.get("viewController").changeSize(t,e),this;},e.prototype.refresh=function(){if(this.emit("beforegraphrefresh"),this.get("animate"))this.positionsAnimate();else{var t=this.get("nodes"),e=this.get("edges"),n=this.get("edges");Object(c.each)(t,function(t){t.refresh();}),Object(c.each)(e,function(t){t.refresh();}),Object(c.each)(n,function(t){t.refresh();});}this.emit("aftergraphrefresh"),this.autoPaint();},e.prototype.getNodes=function(){return this.get("nodes");},e.prototype.getEdges=function(){return this.get("edges");},e.prototype.getCombos=function(){return this.get("combos");},e.prototype.getComboChildren=function(t){if(Object(c.isString)(t)&&(t=this.findById(t)),t&&(!t.getType||"combo"===t.getType()))return t.getChildren();console.warn("The combo does not exist!");},e.prototype.positionsAnimate=function(){var t=this;t.emit("beforeanimate");var e=t.get("animateCfg"),n=e.onFrame,r=t.getNodes(),i=r.map(function(t){var e=t.getModel();return{id:e.id,x:e.x,y:e.y};});t.isAnimating()&&t.stopAnimate(),t.get("canvas").animate(function(e){Object(c.each)(i,function(r){var i=t.findById(r.id);if(i&&!i.destroyed){var o=i.get("originAttrs"),a=i.get("model");if(!o){var s=i.getContainer().getMatrix();s||(s=[1,0,0,0,1,0,0,0,1]),o={x:s[6],y:s[7]},i.set("originAttrs",o);}if(n){var c=n(i,e,r,o);i.set("model",Object.assign(a,c));}else a.x=o.x+(r.x-o.x)*e,a.y=o.y+(r.y-o.y)*e;}}),t.refreshPositions();},{duration:e.duration,easing:e.easing,callback:function callback(){Object(c.each)(r,function(t){t.set("originAttrs",null);}),e.callback&&e.callback(),t.emit("afteranimate"),t.animating=!1;}});},e.prototype.refreshPositions=function(){this.emit("beforegraphrefreshposition");var t,e=this.get("nodes"),n=this.get("edges"),r=this.get("vedges"),i=this.get("combos"),o={};Object(c.each)(e,function(e){t=e.getModel();var n=e.get("originAttrs");if(!n||t.x!==n.x||t.y!==n.y){var r=e.updatePosition({x:t.x,y:t.y});o[t.id]=r,t.comboId&&(o[t.comboId]=o[t.comboId]||r);}}),i&&0!==i.length&&this.updateCombos(),Object(c.each)(n,function(t){var e=t.getSource().getModel(),n=t.getTarget();if(!Object(c.isPlainObject)(n)){var r=n.getModel();(o[e.id]||o[r.id]||t.getModel().isComboEdge)&&t.refresh();}}),Object(c.each)(r,function(t){t.refresh();}),this.emit("aftergraphrefreshposition"),this.autoPaint();},e.prototype.stopAnimate=function(){this.get("canvas").stopAnimate();},e.prototype.isAnimating=function(){return this.animating;},e.prototype.getZoom=function(){var t=this.get("group").getMatrix();return t?t[0]:1;},e.prototype.getCurrentMode=function(){return this.get("modeController").getMode();},e.prototype.setMode=function(t){return this.get("modeController").setMode(t),this;},e.prototype.clear=function(t){return void 0===t&&(t=!1),this.get("canvas").clear(),this.initGroups(),this.set({itemMap:{},nodes:[],edges:[],groups:[],combos:[],comboTrees:[]}),t||this.emit("afterrender"),this;},e.prototype.updateLayout=function(t){var e=this.get("layoutController");Object(c.isString)(t)&&(t={type:t});var n=this.get("layout"),r={};Object.assign(r,n,t),this.set("layout",r),e.isLayoutTypeSame(r)&&r.gpuEnabled===n.gpuEnabled?e.updateLayoutCfg(r):e.changeLayout(r);},e.prototype.destroyLayout=function(){this.get("layoutController").destroyLayout();},e.prototype.layout=function(){var t=this.get("layoutController"),e=this.get("layout");e&&t&&(e.workerEnabled?t.layout():t.layoutMethod?t.relayout(!0):t.layout());},e.prototype.collapseCombo=function(t){var e=this;if(Object(c.isString)(t)&&(t=this.findById(t)),t){this.emit("beforecollapseexpandcombo",{action:"expand",item:t});var n=t.getModel();this.get("itemController").collapseCombo(t),n.collapsed=!0;var r=this.getEdges().concat(this.get("vedges")),i=[],o=[],a=this.get("comboTrees"),s=!1;(a||[]).forEach(function(t){s||dt(t,function(t){if(s&&t.depth<=n.depth)return!1;if(n.id===t.id&&(s=!0),s){var r=e.findById(t.id);r&&r.getType&&"combo"===r.getType()&&(i=i.concat(r.getNodes()),o=o.concat(r.getCombos()));}return!0;});});var u={},h=[];r.forEach(function(t){if(!t.isVisible()||t.getModel().isVEdge){var r=t.getSource(),a=t.getTarget();if((i.includes(r)||o.includes(r))&&!i.includes(a)&&!o.includes(a)||r.getModel().id===n.id){if((f=t.getModel()).isVEdge)return void e.removeItem(t,!1);for(var s=a.getModel();!a.isVisible();){if(!(a=e.findById(s.parentId||s.comboId))||!s.parentId&&!s.comboId)return;s=a.getModel();}var c=s.id;if(u["".concat(n.id,"-").concat(c)])return void(u["".concat(n.id,"-").concat(c)]+=f.size||1);var l=e.addItem("vedge",{source:n.id,target:c,isVEdge:!0},!1);u["".concat(n.id,"-").concat(c)]=f.size||1,h.push(l);}else if(!i.includes(r)&&!o.includes(r)&&(i.includes(a)||o.includes(a))||a.getModel().id===n.id){var f;if((f=t.getModel()).isVEdge)return void e.removeItem(t,!1);for(var d=r.getModel();!r.isVisible();){if(!(r=e.findById(d.parentId||d.comboId))||!d.parentId&&!d.comboId)return;d=r.getModel();}var p=d.id;if(u["".concat(p,"-").concat(n.id)])return void(u["".concat(p,"-").concat(n.id)]+=f.size||1);l=e.addItem("vedge",{target:n.id,source:p,isVEdge:!0},!1);u["".concat(p,"-").concat(n.id)]=f.size||1,h.push(l);}}}),h.forEach(function(t){var n=t.getModel();e.updateItem(t,{size:u["".concat(n.source,"-").concat(n.target)]},!1);}),this.emit("aftercollapseexpandcombo",{action:"collapse",item:t});}else console.warn("The combo to be collapsed does not exist!");},e.prototype.expandCombo=function(t){var e=this;if(Object(c.isString)(t)&&(t=this.findById(t)),!t||t.getType&&"combo"!==t.getType())console.warn("The combo to be collapsed does not exist!");else{this.emit("beforecollapseexpandcombo",{action:"expand",item:t});var n=t.getModel();this.get("itemController").expandCombo(t),n.collapsed=!1;var r=this.getEdges().concat(this.get("vedges")),i=[],o=[],a=this.get("comboTrees"),s=!1;(a||[]).forEach(function(t){s||dt(t,function(t){if(s&&t.depth<=n.depth)return!1;if(n.id===t.id&&(s=!0),s){var r=e.findById(t.id);r&&r.getType&&"combo"===r.getType()&&(i=i.concat(r.getNodes()),o=o.concat(r.getCombos()));}return!0;});});var u={},h={};r.forEach(function(t){if(!t.isVisible()||t.getModel().isVEdge){var r=t.getSource(),a=t.getTarget(),s=r.get("id"),c=a.get("id");if((i.includes(r)||o.includes(r))&&!i.includes(a)&&!o.includes(a)||s===n.id){if(t.getModel().isVEdge)return void e.removeItem(t,!1);for(var l=a.getModel();!a.isVisible();){if(!(a=e.findById(l.comboId||l.parentId))||!l.parentId&&!l.comboId)return;l=a.getModel();}c=l.id;for(var f=r.getModel();!r.isVisible();){if(!(r=e.findById(f.comboId||f.parentId))||!f.parentId&&!f.comboId)return;if(f.comboId===n.id||f.parentId===n.id)break;f=r.getModel();}if(s=f.id,c){var d="".concat(s,"-").concat(c);if(u[d])return u[d]+=t.getModel().size||1,void e.updateItem(h[d],{size:u[d]},!1);var p=e.addItem("vedge",{source:s,target:c,isVEdge:!0},!1);u[d]=t.getModel().size||1,h[d]=p;}}else if(!i.includes(r)&&!o.includes(r)&&(i.includes(a)||o.includes(a))||c===n.id){if(t.getModel().isVEdge)return void e.removeItem(t,!1);for(f=r.getModel();!r.isVisible();){if(!(r=e.findById(f.comboId||f.parentId))||!f.parentId&&!f.comboId)return;f=r.getModel();}s=f.id;for(l=a.getModel();!a.isVisible();){if(!(a=e.findById(l.comboId||l.parentId))||!l.parentId&&!l.comboId)return;if(l.comboId===n.id||l.parentId===n.id)break;l=a.getModel();}if(c=l.id,s){d="".concat(s,"-").concat(c);if(u[d])return u[d]+=t.getModel().size||1,void e.updateItem(h[d],{size:u[d]},!1);p=e.addItem("vedge",{target:c,source:s,isVEdge:!0},!1);u[d]=t.getModel().size||1,h[d]=p;}}else(i.includes(r)||o.includes(r))&&(i.includes(a)||o.includes(a))&&r.isVisible()&&a.isVisible()&&t.show();}}),this.emit("aftercollapseexpandcombo",{action:"expand",item:t});}},e.prototype.collapseExpandCombo=function(t){if(Object(c.isString)(t)&&(t=this.findById(t)),t&&(!t.getType||"combo"===t.getType())){for(var e=t.getModel(),n=this.findById(e.parentId);n;){var r=n.getModel();if(r.collapsed)return console.warn("Fail to expand the combo since it's ancestor combo is collapsed."),void(n=void 0);n=this.findById(r.parentId);}e.collapsed?this.expandCombo(t):this.collapseCombo(t),this.updateCombo(t);}},e.prototype.sortCombos=function(){var t=this;if(!this.get("comboSorted")){this.set("comboSorted",!0);var e=[],n={};(this.get("comboTrees")||[]).forEach(function(t){dt(t,function(t){return e[t.depth]?e[t.depth].push(t.id):e[t.depth]=[t.id],n[t.id]=t.depth,!0;});}),(this.getEdges().concat(this.get("vedges"))||[]).forEach(function(t){var r=t.getModel(),i=n[r.source]||0,o=n[r.target]||0,a=Math.max(i,o);e[a]?e[a].push(r.id):e[a]=[r.id];}),e.forEach(function(e){if(e&&e.length)for(var n=e.length-1;n>=0;n--){var r=t.findById(e[n]);r&&r.toFront();}});}},e.prototype.getNeighbors=function(t,e){var n=t;return Object(c.isString)(t)&&(n=this.findById(t)),n.getNeighbors(e);},e.prototype.getNodeDegree=function(t,e,n){void 0===e&&(e=void 0),void 0===n&&(n=!1);var r=t;Object(c.isString)(t)&&(r=this.findById(t));var i=this.get("degrees");i&&!n||(i=Object(v.getDegree)(this.save()),this.set("degrees",i));var o=i[r.getID()],a=0;if(!o)return 0;switch(e){case"in":a=o.inDegree;break;case"out":a=o.outDegree;break;case"all":a=o;break;default:a=o.degree;}return a;},e.prototype.getUndoStack=function(){return this.undoStack;},e.prototype.getRedoStack=function(){return this.redoStack;},e.prototype.getStackData=function(){return this.get("enabledStack")?{undoStack:this.undoStack.toArray(),redoStack:this.redoStack.toArray()}:null;},e.prototype.clearStack=function(){this.get("enabledStack")&&(this.undoStack.clear(),this.redoStack.clear());},e.prototype.pushStack=function(t,e,n){if(void 0===t&&(t="update"),void 0===n&&(n="undo"),this.get("enabledStack")){var r=e?Object(c.clone)(e):{before:{},after:Object(c.clone)(this.save())};"redo"===n?this.redoStack.push({action:t,data:r}):this.undoStack.push({action:t,data:r}),this.emit("stackchange",{undoStack:this.undoStack,redoStack:this.redoStack});}else console.warn("请先启用 undo & redo 功能，在实例化 Graph 时候配置 enabledStack: true !");},e.prototype.getAdjMatrix=function(t,e){void 0===t&&(t=!0),void 0===e&&(e=this.get("directed"));var n=this.get("adjMatrix");return n&&t||(n=Object(v.getAdjMatrix)(this.save(),e),this.set("adjMatrix",n)),n;},e.prototype.getShortestPathMatrix=function(t,e){void 0===t&&(t=!0),void 0===e&&(e=this.get("directed"));var n=this.get("adjMatrix"),r=this.get("shortestPathMatrix");return n&&t||(n=Object(v.getAdjMatrix)(this.save(),e),this.set("adjMatrix",n)),r&&t||(r=Object(v.floydWarshall)(this.save(),e),this.set("shortestPathMatrix",r)),r;},e.prototype.on=function(e,n,r){return t.prototype.on.call(this,e,n,r);},e.prototype.destroy=function(){this.clear(),Object(p.clearAnimationFrame)(this.timeIndex),this.clearStack(),this.get("itemController").destroy(),this.get("modeController").destroy(),this.get("viewController").destroy(),this.get("stateController").destroy(),this.get("canvas").destroy(),this.cfg=null,this.destroyed=!0,this.redoStack=null,this.undoStack=null;},e.prototype.createHull=function(t){if(t.members&&!(t.members.length<1)){var e=this.get("hullGroup"),n=this.get("hullMap");if(n||(n={},this.set("hullMap",n)),e&&!e.get("destroyed")||((e=this.get("group").addGroup({id:"hullGroup"})).toBack(),this.set("hullGroup",e)),n[t.id])return console.warn("Existed hull id."),n[t.id];var r=e.addGroup({id:"".concat(t.id,"-container")}),i=new be(this,Object(f.a)(Object(f.a)({},t),{group:r}));return n[i.id]=i,i;}console.warn("Create hull failed! The members is empty.");},e.prototype.getHulls=function(){return this.get("hullMap");},e.prototype.getHullById=function(t){return this.get("hullMap")[t];},e.prototype.removeHull=function(t){var e;e=Object(c.isString)(t)?this.getHullById(t):t,delete this.get("hullMap")[e.id],e.destroy();},e.prototype.removeHulls=function(){var t=this.getHulls();t&&Object.keys(t).length&&(Object.keys(t).forEach(function(e){t[e].destroy();}),this.set("hullMap",{}));},e.prototype.onTick=function(t){var e=this.get("layoutController");e&&(e.onTick(t),this.timeIndex=Object(p.requestAnimationFrame)(this.onTick.bind(this)));},e;}(d.a);function Se(t){return(Se="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}var Oe=g.a.transform,Me=["startArrow","endArrow"],ke={lineWidth:1,stroke:void 0,fill:void 0,lineAppendWidth:1,opacity:void 0,strokeOpacity:void 0,fillOpacity:void 0,x:0,y:0,r:10,width:20,height:20,shadowColor:void 0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0},Ce={edge:{lineWidth:1,stroke:"#000",lineDash:void 0,startArrow:!1,endArrow:!1,opacity:void 0,strokeOpacity:void 0,fillOpacity:void 0,shadowColor:void 0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0},node:ke,combo:ke},Ee={options:{},itemType:"",type:"",getCustomConfig:function getCustomConfig(t){return{};},getOptions:function getOptions(t){return Object(c.deepMix)({labelCfg:{style:{fontFamily:"undefined"!=typeof window&&window.getComputedStyle&&window.getComputedStyle(document.body,null).getPropertyValue("font-family")||"Arial, sans-serif"}},descriptionCfg:{style:{fontFamily:"undefined"!=typeof window&&window.getComputedStyle&&window.getComputedStyle(document.body,null).getPropertyValue("font-family")||"Arial, sans-serif"}}},this.options,this.getCustomConfig(t)||{},t);},draw:function draw(t,e){var n=this.drawShape(t,e);(n.set("className",this.itemType+"-shape"),t.label)&&this.drawLabel(t,e).set("className",this.itemType+"-label");return n;},afterDraw:function afterDraw(t,e,n){},drawShape:function drawShape(t,e){return null;},drawLabel:function drawLabel(t,e){var n=this.getOptions(t).labelCfg||{},r=this.getLabelStyle(t,n,e),i=r.rotate;delete r.rotate;var o=e.addShape("text",{attrs:r,draggable:!0,className:"text-shape",name:"text-shape"});if(i){var a=o.getBBox(),s=o.getMatrix();if(s||(s=[1,0,0,0,1,0,0,0,1]),r.rotateCenter)switch(r.rotateCenter){case"center":s=Oe(s,[["t",-a.width/2,-a.height/2],["r",i],["t",a.width/2,a.height/2]]);break;case"lefttop":s=Oe(s,[["t",-r.x,-r.y],["r",i],["t",r.x,r.y]]);break;case"leftcenter":s=Oe(s,[["t",-r.x,-r.y-a.height/2],["r",i],["t",r.x,r.y+a.height/2]]);break;default:s=Oe(s,[["t",-a.width/2,-a.height/2],["r",i],["t",a.width/2,a.height/2]]);}else s=Oe(s,[["t",-r.x,-r.y-a.height/2],["r",i],["t",r.x,r.y+a.height/2]]);o.setMatrix(s);}if(r.background){var c=this.drawLabelBg(t,e,o),u=this.itemType+"-label-bg";c.set("classname",u),o.toFront();}return o;},drawLabelBg:function drawLabelBg(t,e,n){var r=this.options.labelCfg,i=Object(c.mix)({},r,t.labelCfg),o=this.getLabelBgStyleByPosition(n,t,i,e);return e.addShape("rect",{name:"text-bg-shape",attrs:o});},getLabelStyleByPosition:function getLabelStyleByPosition(t,e,n){return{text:t.label};},getLabelBgStyleByPosition:function getLabelBgStyleByPosition(t,e,n,r){return{};},getLabelStyle:function getLabelStyle(t,e,n){var r=this.getLabelStyleByPosition(t,e,n),i="".concat(this.itemType,"Label"),o=nt[i]?nt[i].style:null;return Object(f.a)(Object(f.a)(Object(f.a)({},o),r),e.style);},getShapeStyle:function getShapeStyle(t){return t.style;},update:function update(t,e){this.updateShapeStyle(t,e),this.updateLabel(t,e);},updateShapeStyle:function updateShapeStyle(t,e){var n=e.getContainer(),r=e.getKeyShape(),i=Object(c.mix)({},r.attr(),t.style),o=function o(t){var e,o=i[t];if(Object(c.isPlainObject)(o)){var a=n.find(function(e){return e.get("name")===t;});a&&a.attr(o);}else r.attr(((e={})[t]=o,e));};for(var a in i){o(a);}},updateLabel:function updateLabel(t,e){var n=e.getContainer(),r=this.getOptions({}).labelCfg,i=this.itemType+"-label",o=n.find(function(t){return t.get("className")===i;}),a=this.itemType+"-label-bg",s=n.find(function(t){return t.get("classname")===a;});if(t.label||""===t.label)if(o){var u={};e.getModel&&(u=e.getModel().labelCfg);var h=Object(c.deepMix)({},r,u,t.labelCfg),l=this.getLabelStyleByPosition(t,h,n),d=t.labelCfg?t.labelCfg.style:void 0,p=h.style&&h.style.background,g=Object(f.a)(Object(f.a)(Object(f.a)({},o.attr()),l),d),v=g.rotate;if(delete g.rotate,v){var y=[1,0,0,0,1,0,0,0,1];y=Oe(y,[["t",-g.x,-g.y],["r",v],["t",g.x,g.y]]),o.resetMatrix(),o.attr(Object(f.a)(Object(f.a)({},g),{matrix:y}));}else o.resetMatrix(),o.attr(g);if(s){if(g.background){var m=this.getLabelBgStyleByPosition(o,t,h,n),b=Object(f.a)(Object(f.a)({},m),p);if(s.resetMatrix(),v){var x=[1,0,0,0,1,0,0,0,1];x=Oe(x,[["t",-b.x,-b.y],["r",v],["t",b.x,b.y]]),b.matrix=x;}s.attr(b);}else n.removeChild(s);}else g.background&&((s=this.drawLabelBg(t,n,o)).set("classname",a),o.toFront());}else{this.drawLabel(t,n).set("className",i);}},afterUpdate:function afterUpdate(t,e){},setState:function setState(t,e,n){var r,i,o=n.get("keyShape");if(o&&!o.destroyed){var a=n.getType(),s=Object(c.isBoolean)(e)?t:"".concat(t,":").concat(e),u=this.getStateStyle(s,n),h=n.getStateStyle(s);if(h||u){var l=Object(c.mix)({},h||u),f=n.getContainer(),d={x:1,y:1,cx:1,cy:1};if("combo"===a&&(d.r=1,d.width=1,d.height=1),e){var p=function p(t){var e,n=l[t];if(Object(c.isPlainObject)(n)&&!Me.includes(t)){var r=f.find(function(e){return e.get("name")===t;});r&&r.attr(n);}else o.attr(((e={})[t]=n,e));};for(var g in l){p(g);}}else{var v=wt(n.getCurrentStatesStyle()),y=n.getModel(),m=Object(c.mix)({},y.style,wt(n.getOriginStyle())),b=o.get("name"),x=o.attr(),w={};Object.keys(x).forEach(function(t){if("img"!==t){var e=x[t];e&&"object"===Se(e)?w[t]=Object(c.clone)(e):w[t]=e;}});var S={},O=function O(t){var e=l[t];if(Object(c.isPlainObject)(e)&&!Me.includes(t)){var n=f.find(function(e){return e.get("name")===t;});if(n){var r=Object(c.clone)(n.attr());Object(c.each)(e,function(e,i){if(t===b&&w[i]&&!d[i]){delete w[i];var s=m[t][i]||Ce[a][i];o.attr(i,s);}else if(r[i]||0===r[i]){delete r[i];var c=m[t][i]||Ce[a][i];n.attr(i,c);}}),S[t]=r;}}else if(w[t]&&!d[t]){delete w[t];var i=m[t]||(m[b]?m[b][t]:void 0)||Ce[a][t];o.attr(t,i);}};for(var M in l){O(M);}for(var g in b?S[b]=w:Object(c.mix)(S,w),v){if(!d[g]){var k=v[g];Object(c.isPlainObject)(k)&&!Me.includes(g)||(b?(Object(c.mix)(m[b],((i={})[g]=k,i)),delete m[g]):Object(c.mix)(m,((r={})[g]=k,r)),delete v[g]);}}var C={};Object(c.deepMix)(C,m,S,v);var E=!1,j=function j(t){var e,n,r=C[t];if(Object(c.isPlainObject)(r)&&!Me.includes(t)){var i=f.find(function(e){return e.get("name")===t;});i&&(t===b&&("combo"===a&&(delete r.r,delete r.width,delete r.height),E=!0),i.attr(r));}else if(!E){var s=r||Ce[a][t];"combo"===a?b||o.attr(((e={})[t]=s,e)):o.attr(((n={})[t]=s,n));}};for(var P in C){j(P);}}}}},getStateStyle:function getStateStyle(t,e){var n=e.getModel(),r=e.getType(),i=this.getOptions(n),o=i.stateStyles,a=i.style,s=void 0===a?{}:a,u=n.stateStyles?n.stateStyles[t]:o&&o[t];return"combo"===r?Object(c.clone)(u):Object(c.mix)({},s,u);},getControlPoints:function getControlPoints(t){return t.controlPoints;},getAnchorPoints:function getAnchorPoints(t){return this.getOptions(t).anchorPoints;}},je={itemType:"node",shapeType:"single-node",labelPosition:"center",offset:nt.nodeLabel.offset,getSize:function getSize(t){var e=t.size||this.getOptions({}).size||nt.defaultNode.size;return Object(c.isArray)(e)&&1===e.length&&(e=[e[0],e[0]]),Object(c.isArray)(e)||(e=[e,e]),e;},getLabelStyleByPosition:function getLabelStyleByPosition(t,e){var n=e.position||this.labelPosition;if("center"===n)return{x:0,y:0,text:t.label};var r=e.offset;Object(c.isNil)(r)&&(r=this.offset);var i,o=this.getSize(t),a=o[0],s=o[1];switch(n){case"top":i={x:0,y:0-s/2-r,textBaseline:"bottom"};break;case"bottom":i={x:0,y:s/2+r,textBaseline:"top"};break;case"left":i={x:0-a/2-r,y:0,textAlign:"right"};break;default:i={x:a/2+r,y:0,textAlign:"left"};}return i.text=t.label,i;},getLabelBgStyleByPosition:function getLabelBgStyleByPosition(t,e,n,r){if(!t)return{};var i=t.getBBox(),o=n.style&&n.style.background;if(!o)return{};var a,s=Et(o.padding),u=i.width+s[1]+s[3],h=i.height+s[0]+s[2],l=n.offset;return Object(c.isNil)(l)&&(l=this.offset),a={x:i.minX-s[3],y:i.minY-s[0]},a=Object(f.a)(Object(f.a)(Object(f.a)({},a),o),{width:u,height:h});},drawShape:function drawShape(t,e){var n=this.shapeType,r=this.getShapeStyle(t);return e.addShape(n,{attrs:r,draggable:!0,name:"node-shape"});},updateLinkPoints:function updateLinkPoints(t,e){var n,r=this.getOptions(t).linkPoints,i=e.find(function(t){return"link-point-left"===t.get("className");}),o=e.find(function(t){return"link-point-right"===t.get("className");}),a=e.find(function(t){return"link-point-top"===t.get("className");}),s=e.find(function(t){return"link-point-bottom"===t.get("className");});i&&(n=i.attr()),o&&!n&&(n=o.attr()),a&&!n&&(n=a.attr()),s&&!n&&(n=s.attr()),n||(n=r);var u=Object(c.mix)({},n,t.linkPoints),h=u.fill,l=u.stroke,d=u.lineWidth,p=u.size/2;p||(p=u.r);var g=t.linkPoints?t.linkPoints:{left:void 0,right:void 0,top:void 0,bottom:void 0},v=g.left,y=g.right,m=g.top,b=g.bottom,x=this.getSize(t),w=x[0],S=x[1],O={r:p,fill:h,stroke:l,lineWidth:d};i?v||void 0===v?i.attr(Object(f.a)(Object(f.a)({},O),{x:-w/2,y:0})):i.remove():v&&e.addShape("circle",{attrs:Object(f.a)(Object(f.a)({},O),{x:-w/2,y:0}),className:"link-point-left",name:"link-point-left",isAnchorPoint:!0}),o?(y||void 0===y||o.remove(),o.attr(Object(f.a)(Object(f.a)({},O),{x:w/2,y:0}))):y&&e.addShape("circle",{attrs:Object(f.a)(Object(f.a)({},O),{x:w/2,y:0}),className:"link-point-right",name:"link-point-right",isAnchorPoint:!0}),a?(m||void 0===m||a.remove(),a.attr(Object(f.a)(Object(f.a)({},O),{x:0,y:-S/2}))):m&&e.addShape("circle",{attrs:Object(f.a)(Object(f.a)({},O),{x:0,y:-S/2}),className:"link-point-top",name:"link-point-top",isAnchorPoint:!0}),s?b||void 0===b?s.attr(Object(f.a)(Object(f.a)({},O),{x:0,y:S/2})):s.remove():b&&e.addShape("circle",{attrs:Object(f.a)(Object(f.a)({},O),{x:0,y:S/2}),className:"link-point-bottom",name:"link-point-bottom",isAnchorPoint:!0});},updateShape:function updateShape(t,e,n,r){e.get("keyShape").attr(Object(f.a)({},n)),this.updateLabel(t,e),r&&this.updateIcon(t,e);},updateIcon:function updateIcon(t,e){var n=this,r=e.getContainer(),i=this.getOptions(t).icon,o=(t.icon?t.icon:{show:void 0}).show,a=r.find(function(t){return t.get("className")==="".concat(n.type,"-icon");});if(a){if(o||void 0===o){var s=Object(c.mix)({},a.attr(),i),u=s.width,h=s.height;a.attr(Object(f.a)(Object(f.a)({},s),{x:-u/2,y:-h/2}));}else a.remove();}else if(o){u=i.width,h=i.height;r.addShape("image",{attrs:Object(f.a)(Object(f.a)({},i),{x:-u/2,y:-h/2}),className:"".concat(this.type,"-icon"),name:"".concat(this.type,"-icon")});var l=r.find(function(t){return"node-label"===t.get("className");});l&&l.toFront();}}},Pe=Object(f.a)(Object(f.a)({},Ee),je);Wt.registerNode("single-node",Pe);var Ae={itemType:"edge",labelPosition:"center",refX:0,refY:0,labelAutoRotate:!1,options:{size:nt.defaultEdge.size,style:{x:0,y:0,stroke:nt.defaultEdge.style.stroke,lineAppendWidth:nt.defaultEdge.style.lineAppendWidth},labelCfg:{style:{fill:nt.edgeLabel.style.fill,fontSize:nt.edgeLabel.style.fontSize}},stateStyles:Object(f.a)({},nt.edgeStateStyles)},getPath:function getPath(t){var e=[];return Object(c.each)(t,function(t,n){0===n?e.push(["M",t.x,t.y]):e.push(["L",t.x,t.y]);}),e;},getShapeStyle:function getShapeStyle(t){var e=this.options.style,n={stroke:t.color},r=Object(c.mix)({},e,n,t.style),i=t.size||nt.defaultEdge.size,o=(t=this.getPathPoints(t)).startPoint,a=t.endPoint,s=this.getControlPoints(t),u=[o];s&&(u=u.concat(s)),u.push(a);var h=this.getPath(u);return Object(c.mix)({},nt.defaultEdge.style,{stroke:nt.defaultEdge.color,lineWidth:i,path:h},r);},updateShapeStyle:function updateShapeStyle(t,e){var n=e.getContainer(),r={stroke:t.color},i=n.find(function(t){return"edge-shape"===t.get("className");})||e.getKeyShape(),o=t.size,a=(t=this.getPathPoints(t)).startPoint,s=t.endPoint,u=this.getControlPoints(t),h=[a];u&&(h=h.concat(u)),h.push(s);var l=i.attr(),f=Object(c.mix)({},r,l,t.style),d=t.sourceNode,p=t.targetNode,g={radius:f.radius};u||(g={source:d,target:p,offset:f.offset,radius:f.radius}),l.endArrow&&!1===f.endArrow&&(t.style.endArrow={path:""}),l.startArrow&&!1===f.startArrow&&(t.style.startArrow={path:""});var v=this.getPath(h,g),y=Object(c.mix)(r,i.attr(),{lineWidth:o,path:v},t.style);i&&i.attr(y);},getLabelStyleByPosition:function getLabelStyleByPosition(t,e,n){var r,i=e.position||this.labelPosition,o={},a=n&&n.find(function(t){return"edge-shape"===t.get("className");});r="start"===i?0:"end"===i?1:0.5;var s,u=e.refX||this.refX,h=e.refY||this.refY;if(t.startPoint.x===t.endPoint.x&&t.startPoint.y===t.endPoint.y)return o.x=t.startPoint.x+u,o.y=t.startPoint.y+h,o.text=t.label,o;s=Object(c.isNil)(e.autoRotate)?this.labelAutoRotate:e.autoRotate;var l=lt(a,r,u,h,s);return o.x=l.x,o.y=l.y,o.rotate=l.rotate,o.textAlign=this._getTextAlign(i,l.angle),o.text=t.label,o;},getLabelBgStyleByPosition:function getLabelBgStyleByPosition(t,e,n,r){if(!t)return{};var i=t.getBBox(),o=n.style&&n.style.background;if(!o)return{};var a,s=o.padding,u=i.width+s[1]+s[3],h=i.height+s[0]+s[2],l=n.position||this.labelPosition,d=Object(f.a)(Object(f.a)({},o),{width:u,height:h,x:i.minX-s[2],y:i.minY-s[0],rotate:0});a=Object(c.isNil)(n.autoRotate)?this.labelAutoRotate:n.autoRotate;var p,g=r&&r.find(function(t){return"edge-shape"===t.get("className");});p="start"===l?0:"end"===l?1:0.5;var v=n.refX||this.refX,y=n.refY||this.refY;if(e.startPoint.x===e.endPoint.x&&e.startPoint.y===e.endPoint.y)return d.x=e.startPoint.x+v-u/2,d.y=e.startPoint.y+y-h/2,d;var m=lt(g,p,v-u/2,y+h/2,a),b=m.angle;return b>0.5*Math.PI&&b<1.5*Math.PI&&(m=lt(g,p,v+u/2,y+h/2,a)),a&&(d.x=m.x,d.y=m.y),d.rotate=m.rotate,d;},_getTextAlign:function _getTextAlign(t,e){var n="center";return e?(e%=2*Math.PI,"center"!==t&&(n=e>=0&&e<=Math.PI/2||e>=1.5*Math.PI&&e<2*Math.PI?t:function(t){var e=t;return"start"===t?e="end":"end"===t&&(e="start"),e;}(t)),n):t;},getControlPoints:function getControlPoints(t){return t.controlPoints;},getPathPoints:function getPathPoints(t){return t;},drawShape:function drawShape(t,e){var n=this.getShapeStyle(t);return e.addShape("path",{className:"edge-shape",name:"edge-shape",attrs:n});},drawLabel:function drawLabel(t,e){var n,r=this.options.labelCfg;n="undefined"!=typeof window&&void 0!==window.getComputedStyle&&window.getComputedStyle(document.body,null).getPropertyValue("font-family")||"Arial, sans-serif";var i=Object(c.deepMix)({fontFamily:n},r,t.labelCfg),o=this.getLabelStyle(t,i,e),a=o.rotate;delete o.rotate;var s=e.addShape("text",{attrs:o,name:"text-shape"});if(a&&s.rotateAtStart(a),o.background){var u=this.drawLabelBg(t,e,s),h=this.itemType+"-label-bg";u.set("classname",h),s.toFront();}return s;},drawLabelBg:function drawLabelBg(t,e,n){var r=this.options.labelCfg,i=Object(c.deepMix)({},r,t.labelCfg),o=this.getLabelStyle(t,i,e).rotate,a=this.getLabelBgStyleByPosition(n,t,i,e);delete a.rotate;var s=e.addShape("rect",{name:"text-bg-shape",attrs:a});return o&&s.rotateAtStart(o),s;}},Ie=Object(f.a)(Object(f.a)({},Ee),Ae);Wt.registerEdge("single-edge",Ie),Wt.registerEdge("line",{getControlPoints:function getControlPoints(){}},"single-edge"),Wt.registerEdge("spline",{getPath:function getPath(t){return te(t);}},"single-edge"),Wt.registerEdge("arc",{curveOffset:20,clockwise:1,getControlPoints:function getControlPoints(t){var e,n,r=t.startPoint,i=t.endPoint,o=(r.x+i.x)/2,a=(r.y+i.y)/2;if(void 0!==t.controlPoints){if(n=t.controlPoints[0],e=C(r,n,i),r.x<=i.x&&r.y>i.y?this.clockwise=e.x>n.x?0:1:r.x<=i.x&&r.y<i.y?this.clockwise=e.x>n.x?1:0:r.x>i.x&&r.y<=i.y?this.clockwise=e.y<n.y?0:1:this.clockwise=e.y<n.y?1:0,(n.x-r.x)/(n.y-r.y)==(i.x-r.x)/(i.y-r.y))return[];}else{void 0===t.curveOffset&&(t.curveOffset=this.curveOffset),Object(c.isArray)(t.curveOffset)&&(t.curveOffset=t.curveOffset[0]),t.curveOffset<0?this.clockwise=0:this.clockwise=1;var s={x:i.x-r.x,y:i.y-r.y},u=Math.atan2(s.y,s.x);n={x:t.curveOffset*Math.cos(-Math.PI/2+u)+o,y:t.curveOffset*Math.sin(-Math.PI/2+u)+a},e=C(r,n,i);}var h=E(r,e);return[{x:h,y:h}];},getPath:function getPath(t){var e=[];return e.push(["M",t[0].x,t[0].y]),2===t.length?e.push(["L",t[1].x,t[1].y]):e.push(["A",t[1].x,t[1].y,0,0,this.clockwise,t[2].x,t[2].y]),e;}},"single-edge"),Wt.registerEdge("quadratic",{curvePosition:0.5,curveOffset:-20,getControlPoints:function getControlPoints(t){var e=t.controlPoints;if(!e||!e.length){var n=t.startPoint,r=t.endPoint;void 0===t.curveOffset&&(t.curveOffset=this.curveOffset),void 0===t.curvePosition&&(t.curvePosition=this.curvePosition),Object(c.isArray)(this.curveOffset)&&(t.curveOffset=t.curveOffset[0]),Object(c.isArray)(this.curvePosition)&&(t.curvePosition=t.curveOffset[0]),e=[ee(n,r,t.curvePosition,t.curveOffset)];}return e;},getPath:function getPath(t){var e=[];return e.push(["M",t[0].x,t[0].y]),e.push(["Q",t[1].x,t[1].y,t[2].x,t[2].y]),e;}},"single-edge"),Wt.registerEdge("cubic",{curvePosition:[0.5,0.5],curveOffset:[-20,20],getControlPoints:function getControlPoints(t){var e=t.controlPoints;if(void 0===t.curveOffset&&(t.curveOffset=this.curveOffset),void 0===t.curvePosition&&(t.curvePosition=this.curvePosition),Object(c.isNumber)(t.curveOffset)&&(t.curveOffset=[t.curveOffset,-t.curveOffset]),Object(c.isNumber)(t.curvePosition)&&(t.curvePosition=[t.curvePosition,1-t.curvePosition]),!e||!e.length||e.length<2){var n=t.startPoint,r=t.endPoint;e=[ee(n,r,t.curvePosition[0],t.curveOffset[0]),ee(n,r,t.curvePosition[1],t.curveOffset[1])];}return e;},getPath:function getPath(t){var e=[];return e.push(["M",t[0].x,t[0].y]),e.push(["C",t[1].x,t[1].y,t[2].x,t[2].y,t[3].x,t[3].y]),e;}},"single-edge"),Wt.registerEdge("cubic-vertical",{curvePosition:[0.5,0.5],minCurveOffset:[0,0],curveOffset:void 0,getControlPoints:function getControlPoints(t){var e=t.startPoint,n=t.endPoint;void 0===t.curvePosition&&(t.curvePosition=this.curvePosition),void 0===t.curveOffset&&(t.curveOffset=this.curveOffset),void 0===t.minCurveOffset&&(t.minCurveOffset=this.minCurveOffset),Object(c.isNumber)(t.curveOffset)&&(t.curveOffset=[t.curveOffset,-t.curveOffset]),Object(c.isNumber)(t.minCurveOffset)&&(t.minCurveOffset=[t.minCurveOffset,-t.minCurveOffset]),Object(c.isNumber)(t.curvePosition)&&(t.curvePosition=[t.curvePosition,1-t.curvePosition]);var r=n.y-e.y,i=[0,0];return t.curveOffset?i=t.curveOffset:Math.abs(r)<Math.abs(t.minCurveOffset[0])&&(i=t.minCurveOffset),[{x:e.x,y:e.y+r*this.curvePosition[0]+i[0]},{x:n.x,y:n.y-r*this.curvePosition[1]+i[1]}];}},"cubic"),Wt.registerEdge("cubic-horizontal",{curvePosition:[0.5,0.5],minCurveOffset:[0,0],curveOffset:void 0,getControlPoints:function getControlPoints(t){var e=t.startPoint,n=t.endPoint;void 0===t.curvePosition&&(t.curvePosition=this.curvePosition),void 0===t.curveOffset&&(t.curveOffset=this.curveOffset),void 0===t.minCurveOffset&&(t.minCurveOffset=this.minCurveOffset),Object(c.isNumber)(t.curveOffset)&&(t.curveOffset=[t.curveOffset,-t.curveOffset]),Object(c.isNumber)(t.minCurveOffset)&&(t.minCurveOffset=[t.minCurveOffset,-t.minCurveOffset]),Object(c.isNumber)(t.curvePosition)&&(t.curvePosition=[t.curvePosition,1-t.curvePosition]);var r=n.x-e.x,i=[0,0];return t.curveOffset?i=t.curveOffset:Math.abs(r)<Math.abs(t.minCurveOffset[0])&&(i=t.minCurveOffset),[{x:e.x+r*this.curvePosition[0]+i[0],y:e.y},{x:n.x-r*this.curvePosition[1]+i[1],y:n.y}];}},"cubic"),Wt.registerEdge("loop",{getPathPoints:function getPathPoints(t){return ht(t);},getControlPoints:function getControlPoints(t){return t.controlPoints;},afterDraw:function afterDraw(t){t.controlPoints=void 0;},afterUpdate:function afterUpdate(t){t.controlPoints=void 0;}},"cubic");var Te={itemType:"combo",shapeType:"single-combo",labelPosition:"top",refX:nt.comboLabel.refX,refY:nt.comboLabel.refY,options:{style:{stroke:nt.defaultCombo.style.stroke,fill:nt.defaultCombo.style.fill,lineWidth:nt.defaultCombo.style.lineWidth},labelCfg:{style:{fill:nt.comboLabel.style.fill,fontSize:nt.comboLabel.style.fontSize}},stateStyles:Object(f.a)({},nt.comboStateStyles)},getSize:function getSize(t){var e=Object(c.clone)(t.size||this.options.size||nt.defaultCombo.size);return Object(c.isArray)(e)&&1===e.length&&(e=[e[0],e[0]]),Object(c.isArray)(e)||(e=[e,e]),e;},getLabelStyleByPosition:function getLabelStyleByPosition(t,e){var n=e.position||this.labelPosition,r=t.style,i=t.padding||this.options.padding;Object(c.isArray)(i)&&(i=i[0]);var o=e.refX,a=e.refY;Object(c.isNil)(o)&&(o=this.refX),Object(c.isNil)(a)&&(a=this.refY);var s,u=this.getSize(t),h=(Math.max(r.r,u[0]/2)||u[0]/2)+i;switch(n){case"top":s={x:0,y:-h-a,textBaseline:"bottom",textAlign:"center"};break;case"bottom":s={x:0,y:h+a,textBaseline:"bottom",textAlign:"center"};break;case"left":s={x:-h+o,y:0,textAlign:"left"};break;case"center":s={x:0,y:0,text:t.label,textAlign:"center"};break;default:s={x:h+o,y:0,textAlign:"right"};}return s.text=t.label,s;},drawShape:function drawShape(t,e){var n=this.shapeType,r=this.getShapeStyle(t);return e.addShape(n,{attrs:r,draggable:!0,name:"combo-shape"});},updateShape:function updateShape(t,e,n){var r=e.get("keyShape");(void 0===t.animate?this.options.animate:t.animate)&&r.animate?r.animate(n,{duration:200,easing:"easeLinear"}):r.attr(Object(f.a)({},n)),this.updateLabel(t,e);}},Ne=Object(f.a)(Object(f.a)({},Ee),Te);Wt.registerCombo("single-combo",Ne),Wt.registerCombo("circle",{options:{size:[nt.defaultCombo.size[0],nt.defaultCombo.size[0]],padding:nt.defaultCombo.padding[0],animate:!0,style:{stroke:nt.defaultCombo.style.stroke,fill:nt.defaultCombo.style.fill,lineWidth:nt.defaultCombo.style.lineWidth},labelCfg:{style:{fill:nt.comboLabel.style.fill,fontSize:nt.comboLabel.style.fontSize},refX:0,refY:0},stateStyles:Object(f.a)({},nt.comboStateStyles)},shapeType:"circle",labelPosition:"top",drawShape:function drawShape(t,e){var n=this.getShapeStyle(t);return delete n.height,delete n.width,e.addShape("circle",{attrs:n,className:"circle-combo",name:"circle-combo",draggable:!0});},getShapeStyle:function getShapeStyle(t){var e=this.options.style,n=t.padding||this.options.padding;Object(c.isArray)(n)&&(n=n[0]);var r,i={stroke:t.color},o=Object(c.mix)({},e,i,t.style);if(t.fixSize)r=Object(c.isNumber)(t.fixSize)?t.fixSize:t.fixSize[0];else{var a=this.getSize(t);r=!Object(c.isNumber)(o.r)||isNaN(o.r)?a[0]/2||nt.defaultCombo.style.r:Math.max(o.r,a[0]/2)||a[0]/2;}o.r=r+n;var s=Object(f.a)({x:0,y:0},o);return t.style?t.style.r=r:t.style={r:r},s;},update:function update(t,e){var n=this.getSize(t),r=t.padding||this.options.padding;Object(c.isArray)(r)&&(r=r[0]);var i,o=Object(c.clone)(t.style);i=t.fixSize?Object(c.isNumber)(t.fixSize)?t.fixSize:t.fixSize[0]:Math.max(o.r,n[0]/2)||n[0]/2,o.r=i+r;var a=e.get("sizeCache");a&&(a.r=o.r);var s={stroke:t.color},u=e.get("keyShape"),h=Object(c.mix)({},u.attr(),s,o);t.style?t.style.r=i:t.style={r:i},this.updateShape(t,e,h,!0);}},"single-combo"),Wt.registerCombo("rect",{options:{size:[40,5],padding:[25,20,15,20],animate:!0,style:{radius:0,stroke:nt.defaultCombo.style.stroke,fill:nt.defaultCombo.style.fill,lineWidth:nt.defaultCombo.style.lineWidth},labelCfg:{style:{fill:nt.comboLabel.style.fill,fontSize:nt.comboLabel.style.fontSize}},anchorPoints:[[0,0.5],[1,0.5]],stateStyles:Object(f.a)({},nt.comboStateStyles)},shapeType:"rect",labelPosition:"top",drawShape:function drawShape(t,e){var n=this.getShapeStyle(t);return e.addShape("rect",{attrs:n,className:"rect-combo",name:"rect-combo",draggable:!0});},getLabelStyleByPosition:function getLabelStyleByPosition(t,e){var n=e.position||this.labelPosition,r=t.style,i=t.padding||this.options.padding;Object(c.isNumber)(i)&&(i=[i,i,i,i]);var o=e.refX,a=e.refY;Object(c.isNil)(o)&&(o=this.refX),Object(c.isNil)(a)&&(a=this.refY);var s,u=r.width/2+i[3],h=r.height/2+i[0];switch(n){case"top":s={x:0-u+o,y:0-h+a,textBaseline:"top",textAlign:"left"};break;case"bottom":s={x:0,y:h+a,textBaseline:"bottom",textAlign:"center"};break;case"left":s={x:0-u+a,y:0,textAlign:"left"};break;case"center":s={x:0,y:0,text:t.label,textAlign:"center"};break;default:s={x:u+o,y:0,textAlign:"right"};}return s.text=t.label,s;},getShapeStyle:function getShapeStyle(t){var e=this.options.style,n=t.padding||this.options.padding;Object(c.isNumber)(n)&&(n=[n,n,n,n]);var r,i,o={stroke:t.color},a=Object(c.mix)({},e,o,t.style),s=this.getSize(t),u=t.collapsed&&t.fixCollapseSize?t.fixCollapseSize:t.fixSize;u?Object(c.isNumber)(u)?(r=u,i=u):(r=u[0],i=u[1]):(r=!Object(c.isNumber)(a.width)||isNaN(a.width)?s[0]||nt.defaultCombo.style.width:Math.max(a.width,s[0])||s[0],i=!Object(c.isNumber)(a.height)||isNaN(a.height)?s[1]||nt.defaultCombo.style.height:Math.max(a.height,s[1])||s[1]);var h=-r/2-n[3],l=-i/2-n[0];a.width=r+n[1]+n[3],a.height=i+n[0]+n[2];var d=Object(f.a)({x:h,y:l},a);return t.style?(t.style.width=r,t.style.height=i):t.style={width:r,height:i},d;},update:function update(t,e){var n=this.getSize(t),r=t.padding||this.options.padding;Object(c.isNumber)(r)&&(r=[r,r,r,r]);var i,o,a=Object(c.clone)(t.style),s=t.collapsed&&t.fixCollapseSize?t.fixCollapseSize:t.fixSize;s?Object(c.isNumber)(s)?(i=s,o=s):(i=s[0],o=s[1]):(i=Math.max(a.width,n[0])||n[0],o=Math.max(a.height,n[1])||n[1]),a.width=i+r[1]+r[3],a.height=o+r[0]+r[2];var u=e.get("sizeCache");u&&(u.width=a.width,u.height=a.height),a.x=-i/2-r[3],a.y=-o/2-r[0];var h={stroke:t.color},l=e.get("keyShape"),f=Object(c.mix)({},l.attr(),h,a);t.style?(t.style.width=i,t.style.height=o):t.style={width:i,height:o},this.updateShape(t,e,f,!1);},updateShape:function updateShape(t,e,n){var r=e.get("keyShape");(void 0===t.animate?this.options.animate:t.animate)&&r.animate?r.animate(n,{duration:200,easing:"easeLinear"}):r.attr(Object(f.a)({},n)),this.updateLabel(t,e);}},"single-combo"),Wt.registerNode("simple-circle",{options:{size:nt.defaultNode.size,style:{x:0,y:0,stroke:nt.defaultNode.style.stroke,fill:nt.defaultNode.style.fill,lineWidth:nt.defaultNode.style.lineWidth},labelCfg:{style:{fill:nt.nodeLabel.style.fill,fontSize:nt.nodeLabel.style.fontSize}},stateStyles:Object(f.a)({},nt.nodeStateStyles)},shapeType:"simple-circle",labelPosition:"center",drawShape:function drawShape(t,e){var n=this.getShapeStyle(t);return e.addShape("circle",{attrs:n,className:"".concat(this.type,"-keyShape"),draggable:!0});},getShapeStyle:function getShapeStyle(t){var e=this.getOptions(t).style,n={stroke:t.color},r=Object(c.deepMix)({},e,n),i=this.getSize(t)[0]/2;return Object(f.a)({x:0,y:0,r:i},r);},update:function update(t,e){var n=this.getSize(t),r={stroke:t.color,r:n[0]/2},i=e.get("keyShape"),o=Object(c.deepMix)({},i.attr(),r,t.style);this.updateShape(t,e,o,!0);}},"single-node"),Wt.registerNode("simple-rect",{options:{size:[100,30],style:{radius:0,stroke:nt.defaultNode.style.stroke,fill:nt.defaultNode.style.fill,lineWidth:nt.defaultNode.style.lineWidth},labelCfg:{style:{fill:nt.nodeLabel.style.fill,fontSize:nt.nodeLabel.style.fontSize}},anchorPoints:[[0,0.5],[1,0.5]],stateStyles:Object(f.a)({},nt.nodeStateStyles)},shapeType:"simple-rect",labelPosition:"center",drawShape:function drawShape(t,e){var n=this.getShapeStyle(t);return e.addShape("rect",{attrs:n,className:"".concat(this.type,"-keyShape"),name:"".concat(this.type,"-keyShape"),draggable:!0});},getShapeStyle:function getShapeStyle(t){var e=this.getOptions(t).style,n={stroke:t.color},r=Object(c.mix)({},e,n),i=this.getSize(t),o=r.width||i[0],a=r.height||i[1];return Object(f.a)({x:-o/2,y:-a/2,width:o,height:a},r);},update:function update(t,e){e.getContainer();var n=this.getOptions({}).style,r=this.getSize(t),i=e.get("keyShape");t.size||(r[0]=i.attr("width")||n.width,r[1]=i.attr("height")||n.height);var o={stroke:t.color,x:-r[0]/2,y:-r[1]/2,width:r[0],height:r[1]},a=Object(c.mix)({},n,i.attr(),o);a=Object(c.mix)(a,t.style),this.updateShape(t,e,a,!1);}},"single-node"),Wt.registerNode("image",{options:{img:"https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ",size:200,clipCfg:{show:!1,type:"circle",r:50,rx:50,ry:35,width:50,height:35,points:[[30,12],[12,30],[30,48],[48,30]],path:[["M",25,25],["L",50,25],["A",12.5,12.5,0,1,1,50,50],["A",12.5,12.5,0,1,0,50,50],["L",25,75],["Z"]],x:0,y:0}},shapeType:"image",labelPosition:"bottom",drawShape:function drawShape(t,e){var n=this.shapeType,r=this.getShapeStyle(t);delete r.fill;var i=e.addShape(n,{attrs:r,className:"".concat(this.type,"-keyShape"),name:"".concat(this.type,"-keyShape"),draggable:!0});return this.drawClip(t,i),i;},drawClip:function drawClip(t,e){var n=this.getOptions(t).clipCfg;if(n.show){var r=n.type,i=n.x,o=n.y,a=n.style;if("circle"===r){var s=n.r;e.setClip({type:"circle",attrs:Object(f.a)({r:s,x:i,y:o},a)});}else if("rect"===r){var c=n.width,u=n.height,h=i-c/2,l=o-u/2;e.setClip({type:"rect",attrs:Object(f.a)({x:h,y:l,width:c,height:u},a)});}else if("ellipse"===r){var d=n.rx,p=n.ry;e.setClip({type:"ellipse",attrs:Object(f.a)({x:i,y:o,rx:d,ry:p},a)});}else if("polygon"===r){var g=n.points;e.setClip({type:"polygon",attrs:Object(f.a)({points:g},a)});}else if("path"===r){var v=n.path;e.setClip({type:"path",attrs:Object(f.a)({path:v},a)});}}},getShapeStyle:function getShapeStyle(t){var e=this.getOptions(t).style,n=this.getSize(t),r=this.getOptions(t).img,i=n[0],o=n[1];return e&&(i=e.width||n[0],o=e.height||n[1]),Object(f.a)({x:-i/2,y:-o/2,width:i,height:o,img:r},e);},updateShapeStyle:function updateShapeStyle(t,e){var n=e.getContainer(),r="".concat(this.itemType,"-shape"),i=n.find(function(t){return t.get("className")===r;})||e.getKeyShape(),o=this.getShapeStyle(t);i&&i.attr(o);}},"single-node");var Be,Le={triangle:function triangle(t,e,n){void 0===t&&(t=10),void 0===e&&(e=15),void 0===n&&(n=0);var r=2*n;return"M ".concat(r,",0 L ").concat(r+e,",-").concat(t/2," L ").concat(r+e,",").concat(t/2," Z");},vee:function vee(t,e,n){void 0===t&&(t=15),void 0===e&&(e=20),void 0===n&&(n=0);var r=2*n;return"M ".concat(r,",0 L ").concat(r+e,",-").concat(t/2,"\n        L ").concat(r+2*e/3,",0 L ").concat(r+e,",").concat(t/2," Z");},circle:function circle(t,e){return void 0===t&&(t=5),void 0===e&&(e=0),"M ".concat(2*e,", 0\n            a ").concat(t,",").concat(t," 0 1,0 ").concat(2*t,",0\n            a ").concat(t,",").concat(t," 0 1,0 ").concat(2*-t,",0");},rect:function rect(t,e,n){void 0===t&&(t=10),void 0===e&&(e=10),void 0===n&&(n=0);var r=2*n;return"M ".concat(r,",").concat(-t/2," \n        L ").concat(r+e,",").concat(-t/2," \n        L ").concat(r+e,",").concat(t/2," \n        L ").concat(r,",").concat(t/2," Z");},diamond:function diamond(t,e,n){void 0===t&&(t=15),void 0===e&&(e=15),void 0===n&&(n=0);var r=2*n;return"M ".concat(r,",0 \n        L ").concat(r+e/2,",").concat(-t/2," \n        L ").concat(r+e,",0 \n        L ").concat(r+e/2,",").concat(t/2," Z");},triangleRect:function triangleRect(t,e,n,r,i,o){void 0===t&&(t=15),void 0===e&&(e=15),void 0===n&&(n=15),void 0===r&&(r=3),void 0===i&&(i=5),void 0===o&&(o=0);var a=2*o,s=a+e+i;return"M ".concat(a,",0 L ").concat(a+e,",-").concat(t/2," L ").concat(a+e,",").concat(t/2," Z\n            M ").concat(s,", -").concat(n/2,"\n            L ").concat(s+r," -").concat(n/2,"\n            L ").concat(s+r," ").concat(n/2,"\n            L ").concat(s," ").concat(n/2,"\n            Z");}},De={collapse:function collapse(t,e,n){return[["M",t-n,e],["a",n,n,0,1,0,2*n,0],["a",n,n,0,1,0,2*-n,0],["M",t-n+4,e],["L",t+n-4,e]];},expand:function expand(t,e,n){return[["M",t-n,e],["a",n,n,0,1,0,2*n,0],["a",n,n,0,1,0,2*-n,0],["M",t-n+4,e],["L",t-n+2*n-4,e],["M",t-n+n,e-n+4],["L",t,e+n-4]];},upTriangle:function upTriangle(t,e,n){var r=n*Math.cos(Math.PI/6),i=n*Math.sin(Math.PI/6);return[["M",t-r,e+i],["L",t+r,e+i],["L",t,e-n],["Z"]];},downTriangle:function downTriangle(t,e,n){var r=n*Math.cos(Math.PI/6),i=n*Math.sin(Math.PI/6);return[["M",t-r,e-i],["L",t+r,e-i],["L",t,e+n],["Z"]];}},_e=Wt,Re=["#5F95FF","#61DDAA","#65789B","#F6BD16","#7262FD","#78D3F8","#9661BC","#F6903D","#008685","#F08BB4"],Fe=g.a.transform,Ye=Object(f.a)(Object(f.a)(Object(f.a)(Object(f.a)(Object(f.a)(Object(f.a)({},o),i),a),r),s),{transform:Fe,mat3:g.b}),Xe=function(){function t(t){this.graph=t,this.layoutCfg=t.get("layout")||{},this.layoutType=this.getLayoutType(),this.layoutMethods=[],this.initLayout();}return t.prototype.initLayout=function(){},t.prototype.getLayoutType=function(){return this.getLayoutCfgType(this.layoutCfg);},t.prototype.getLayoutCfgType=function(t){var e=t.type;if(e)return e;var n=t.pipes;return Array.isArray(n)?n.map(function(t){return(null==t?void 0:t.type)||"";}):null;},t.prototype.isLayoutTypeSame=function(t){var e=this.getLayoutCfgType(t);return Array.isArray(this.layoutType)?this.layoutType.every(function(t,n){return t===e[n];}):(null==t?void 0:t.type)===this.layoutType;},t.prototype.refreshLayout=function(){var t=this.graph;t&&(t.get("animate")?t.positionsAnimate():t.refreshPositions());},t.prototype.changeLayout=function(t){this.layoutCfg=t,this.destoryLayoutMethods(),this.layout();},t.prototype.changeData=function(){this.destoryLayoutMethods(),this.layout();},t.prototype.destoryLayoutMethods=function(){var t=this.layoutMethods;null==t||t.forEach(function(t){t.destroy();}),this.layoutMethods=[];},t.prototype.destroyLayout=function(){var t=this.graph;this.destoryLayoutMethods(),t.set("layout",void 0),this.layoutCfg=void 0,this.layoutType=void 0,this.layoutMethods=void 0;},t.prototype.setDataFromGraph=function(){for(var t=[],e=[],n=[],r=[],i=[],o=[],a=this.graph.getNodes(),s=this.graph.getEdges(),c=this.graph.getCombos(),u=a.length,h=0;h<u;h++){var l=a[h];if(l&&!l.destroyed){var f=l.getModel();l.isVisible()?t.push(f):e.push(f);}}var d=s.length;for(h=0;h<d;h++){var p=s[h];if(p&&!p.destroyed){f=p.getModel();p.isVisible()?f.isComboEdge?i.push(f):n.push(f):r.push(f);}}var g=c.length;for(h=0;h<g;h++){var v=c[h];if(!v.destroyed){f=v.getModel();v.isVisible()?o.push(f):r.push(f);}}return{nodes:t,hiddenNodes:e,edges:n,hiddenEdges:r,combos:o,hiddenCombos:[],comboEdges:i};},t.prototype.reLayoutMethod=function(t,e){var n=this;return new Promise(function(r,i){var o=n.graph,a=null==e?void 0:e.type;e.onLayoutEnd=function(){o.emit("aftersublayout",{type:a}),r();},t.init(n.data),"force"===a&&(t.ticking=!1,t.forceSimulation.stop()),o.emit("beforesublayout",{type:a}),t.execute(),t.isCustomLayout&&e.onLayoutEnd&&e.onLayoutEnd();});},t.prototype.relayout=function(t){var e=this,n=this.graph,r=this.layoutMethods,i=this.layoutCfg;if(t){this.data=this.setDataFromGraph();var o=this.data.nodes;if(!o)return!1;this.initPositions(i.center,o);}n.emit("beforelayout");var a=Promise.resolve();null==r||r.forEach(function(t,n){var r=i[n];a=a.then(function(){return e.reLayoutMethod(t,r);});}),a.then(function(){i.onAllLayoutEnd&&i.onAllLayoutEnd();}).catch(function(t){console.warn("relayout failed",t);});},t.prototype.filterLayoutData=function(t,e){var n,r,i=t.nodes,o=t.edges,a=Object(f.e)(t,["nodes","edges"]);if(!i)return t;if(n=Object(c.isFunction)(null==e?void 0:e.nodesFilter)?e.nodesFilter:function(){return!0;},Object(c.isFunction)(null==e?void 0:e.edgesFilter))r=e.edgesFilter;else{var s=i.reduce(function(t,e){return t[e.id]=!0,t;},{});r=function r(t){return s[t.source]&&s[t.target];};}return Object(f.a)({nodes:i.filter(n),edges:o.filter(r)},a);},t.prototype.getLayoutBBox=function(t){var e=this.graph,n=Object(c.groupBy)(e.getNodes(),function(t){return t.getModel().layoutOrder;}),r=Object.values(n).map(function(t){var e=It(t);return e.size=[e.width,e.height],e;});return{groupNodes:Object.values(Object(c.groupBy)(t,"layoutOrder")),layoutNodes:r};},t.prototype.layoutAnimate=function(){},t.prototype.moveToZero=function(){var t=this.graph.get("data").nodes;if(void 0!==t[0].x&&null!==t[0].x&&!At(t[0].x)){for(var e=[0,0],n=t.length,r=0;r<n;r++){var i=t[r];e[0]+=i.x,e[1]+=i.y;}e[0]/=t.length,e[1]/=t.length;for(r=0;r<n;r++){(i=t[r]).x-=e[0],i.y-=e[1];}}},t.prototype.initPositions=function(t,e){var n=this.graph;if(!e)return!1;var r=e?e.length:0;if(r){var i=0.85*n.get("width"),o=0.85*n.get("height"),a=Math.ceil(Math.sqrt(r)*(i/o)),s=i/(a-1),c=o/(Math.ceil(r/a)-1);isFinite(s)&&s||(s=0),isFinite(c)&&s||(c=0);for(var u=t[0]-i/2,h=t[1]-o/2,l=!0,f=0;f<r;f++){var d=e[f];At(d.x)&&(l=!1,d.x=f%a*s+u),At(d.y)&&(l=!1,d.y=Math.floor(f/a)*c+h);}return l;}},t.prototype.destroy=function(){this.graph=null,this.destoryLayoutMethods(),this.destroyed=!0;},t.prototype.onTick=function(t){var e;null===(e=this.layoutMethods)||void 0===e||e.forEach(function(e){var n;null===(n=null==e?void 0:e.onTick)||void 0===n||n.call(e,t);});},t;}(),ze=function ze(t){this.graph=t,this.destroyed=!1,this.initEvents();};!function(t){t.CLICK="click",t.DBLCLICK="dblclick",t.TAP="tap",t.DBLTAP="dbltap",t.DRAGSTART="dragstart",t.DRAGEND="dragend",t.DRAG="drag",t.DRAGENTER="dragenter",t.DRAGLEAVE="dragleave",t.DRAGOVER="dragover",t.DRAGOUT="dragout",t.DDROP="drop",t.PINCHSTART="pinchstart",t.PINCHMOVE="pinchmove",t.PANSTART="panstart",t.PANMOVE="panmove",t.PANEND="panend",t.PRESS="press",t.ACTION_END="actionend",t.TOUCHSTART="touchstart",t.TOUCHMOVE="touchmove",t.TOUCHEND="touchend",t.CANVAS_TOUCHSTART="canvas:touchstart",t.CANVAS_TOUCHMOVE="canvas:touchmove",t.CANVAS_TOUCHEND="canvas:touchend",t.NODE_TOUCHSTART="node:touchstart",t.NODE_TOUCHMOVE="node:touchmove",t.NODE_TOUCHEND="node:touchend",t.COMBO_TOUCHSTART="combo:touchstart",t.COMBO_TOUCHMOVE="combo:touchmove",t.COMBO_TOUCHEND="combo:touchend",t.EDGE_TOUCHSTART="edge:touchstart",t.EDGE_TOUCHMOVE="edge:touchmove",t.EDGE_TOUCHEND="edge:touchend",t.NODE_CLICK="node:click",t.NODE_DBLCLICK="node:dblclick",t.NODE_DROP="node:drop",t.NODE_DRAGOVER="node:dragover",t.NODE_DRAGENTER="node:dragenter",t.NODE_DRAGLEAVE="node:dragleave",t.NODE_DRAGSTART="node:dragstart",t.NODE_DRAG="node:drag",t.NODE_DRAGEND="node:dragend",t.NODE_TAP="node:tap",t.NODE_DBLTAP="node:dbltap",t.NODE_PANSTART="node:panstart",t.NODE_PANMOVE="node:panmove",t.NODE_PANEND="node:panend",t.NODE_PRESS="node:press",t.COMBO_CLICK="combo:click",t.COMBO_DBLCLICK="combo:dblclick",t.COMBO_DROP="combo:drop",t.COMBO_DRAGOVER="combo:dragover",t.COMBO_DRAGENTER="combo:dragenter",t.COMBO_DRAGLEAVE="combo:dragleave",t.COMBO_DRAGSTART="combo:dragstart",t.COMBO_DRAG="combo:drag",t.COMBO_DRAGEND="combo:dragend",t.COMBO_TAP="combo:tap",t.COMBO_DBLTAP="combo:dbltap",t.COMBO_PANSTART="combo:panstart",t.COMBO_PANMOVE="combo:panmove",t.COMBO_PANEND="combo:panend",t.COMBO_PRESS="combo:press",t.EDGE_CLICK="edge:click",t.EDGE_DBLCLICK="edge:dblclick",t.EDGE_DROP="edge:drop",t.EDGE_DRAGOVER="edge:dragover",t.EDGE_DRAGENTER="edge:dragenter",t.EDGE_DRAGLEAVE="edge:dragleave",t.EDGE_TAP="edge:tap",t.EDGE_DBLTAP="edge:dbltap",t.EDGE_PRESS="edge:press",t.CANVAS_CLICK="canvas:click",t.CANVAS_DBLCLICK="canvas:dblclick",t.CANVAS_DROP="canvas:drop",t.CANVAS_DRAGENTER="canvas:dragenter",t.CANVAS_DRAGLEAVE="canvas:dragleave",t.CANVAS_DRAGSTART="canvas:dragstart",t.CANVAS_DRAG="canvas:drag",t.CANVAS_DRAGEND="canvas:dragend",t.CANVAS_TAP="canvas:tap",t.CANVAS_DBLTAP="canvas:dbltap",t.CANVAS_PANSTART="canvas:panstart",t.CANVAS_PANMOVE="canvas:panmove",t.CANVAS_PANEND="canvas:panend",t.CANVAS_PRESS="canvas:press",t.BEFORERENDER="beforerender",t.AFTERRENDER="afterrender",t.BEFOREADDITEM="beforeadditem",t.AFTERADDITEM="afteradditem",t.BEFOREREMOVEITEM="beforeremoveitem",t.AFTERREMOVEITEM="afterremoveitem",t.BEFOREUPDATEITEM="beforeupdateitem",t.AFTERUPDATEITEM="afterupdateitem",t.BEFOREITEMVISIBILITYCHANGE="beforeitemvisibilitychange",t.AFTERITEMVISIBILITYCHANGE="afteritemvisibilitychange",t.BEFOREITEMSTATECHANGE="beforeitemstatechange",t.AFTERITEMSTATECHANGE="afteritemstatechange",t.BEFOREITEMREFRESH="beforeitemrefresh",t.AFTERITEMREFRESH="afteritemrefresh",t.BEFOREITEMSTATESCLEAR="beforeitemstatesclear",t.AFTERITEMSTATESCLEAR="afteritemstatesclear",t.BEFOREMODECHANGE="beforemodechange",t.AFTERMODECHANGE="aftermodechange",t.BEFORELAYOUT="beforelayout",t.AFTERLAYOUT="afterlayout",t.BEFORECREATEEDGE="beforecreateedge",t.AFTERCREATEEDGE="aftercreateedge",t.BEFOREGRAPHREFRESHPOSITION="beforegraphrefreshposition",t.AFTERGRAPHREFRESHPOSITION="aftergraphrefreshposition",t.BEFOREGRAPHREFRESH="beforegraphrefresh",t.AFTERGRAPHREFRESH="aftergraphrefresh",t.BEFOREANIMATE="beforeanimate",t.AFTERANIMATE="afteranimate",t.BEFOREPAINT="beforepaint",t.AFTERPAINT="afterpaint",t.BEFORECOLLAPSEEXPANDCOMBO="beforecollapseexpandcombo",t.AFTERCOLLAPSEEXPANDCOMBO="aftercollapseexpandcombo",t.GRAPHSTATECHANGE="graphstatechange",t.AFTERACTIVATERELATIONS="afteractivaterelations",t.NODESELECTCHANGE="nodeselectchange",t.TOOLTIPCHANGE="tooltipchange",t.WHEELZOOM="wheelzoom",t.VIEWPORTCHANGE="viewportchange",t.DRAGNODEEND="dragnodeend",t.STACKCHANGE="stackchange";}(Be||(Be={}));var We=_e.registerNode,qe=_e.registerEdge,Ve=_e.registerCombo,Ge=l.registerBehavior,He=nt;_e.registerNode,_e.registerEdge,_e.registerCombo,l.registerBehavior;},22:function _(t,e,n){"use strict";n.d(e,"a",function(){return c;}),n.d(e,"b",function(){return f;}),n.d(e,"c",function(){return g;}),n.d(e,"d",function(){return S;});var r=n(0),i=/[MLHVQTCSAZ]([^MLHVQTCSAZ]*)/gi,o=/[^\s\,]+/gi;var a=function a(t){var e=t||[];return Object(r.isArray)(e)?e:Object(r.isString)(e)?(e=e.match(i),Object(r.each)(e,function(t,n){if((t=t.match(o))[0].length>1){var i=t[0].charAt(0);t.splice(1,0,t[0].substr(1)),t[0]=i;}Object(r.each)(t,function(e,n){isNaN(e)||(t[n]=+e);}),e[n]=t;}),e):void 0;},s=n(4);var c=function c(t,e,n){void 0===e&&(e=!1),void 0===n&&(n=[[0,0],[1,1]]);for(var r=!!e,i=[],o=0,a=t.length;o<a;o+=2){i.push([t[o],t[o+1]]);}var c,u,h,l=function(t,e,n,r){var i,o,a,c,u,h,l,f=[],d=!!r;if(d){a=r[0],c=r[1];for(var p=0,g=t.length;p<g;p+=1){var v=t[p];a=s.b.min([0,0],a,v),c=s.b.max([0,0],c,v);}}p=0;for(var y=t.length;p<y;p+=1){v=t[p];if(0!==p||n){if(p!==y-1||n){i=t[[p?p-1:y-1,p-1][n?0:1]],o=t[n?(p+1)%y:p+1];var m=[0,0];m=s.b.sub(m,o,i),m=s.b.scale(m,m,e);var b=s.b.distance(v,i),x=s.b.distance(v,o),w=b+x;0!==w&&(b/=w,x/=w);var S=s.b.scale([0,0],m,-b),O=s.b.scale([0,0],m,x);h=s.b.add([0,0],v,S),u=s.b.add([0,0],v,O),u=s.b.min([0,0],u,s.b.max([0,0],o,v)),u=s.b.max([0,0],u,s.b.min([0,0],o,v)),S=s.b.sub([0,0],u,v),S=s.b.scale([0,0],S,-b/x),h=s.b.add([0,0],v,S),h=s.b.min([0,0],h,s.b.max([0,0],i,v)),h=s.b.max([0,0],h,s.b.min([0,0],i,v)),O=s.b.sub([0,0],v,h),O=s.b.scale([0,0],O,x/b),u=s.b.add([0,0],v,O),d&&(h=s.b.max([0,0],h,a),h=s.b.min([0,0],h,c),u=s.b.max([0,0],u,a),u=s.b.min([0,0],u,c)),f.push(l),f.push(h),l=u;}else h=v,f.push(l),f.push(h);}else l=v;}return n&&f.push(f.shift()),f;}(i,0.4,r,n),f=i.length,d=[];for(o=0;o<f-1;o+=1){c=l[2*o],u=l[2*o+1],h=i[o+1],d.push(["C",c[0],c[1],u[0],u[1],h[0],h[1]]);}return r&&(c=l[f],u=l[f+1],h=i[0],d.push(["C",c[0],c[1],u[0],u[1],h[0],h[1]])),d;};var u="\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029",h=new RegExp("([a-z])["+u+",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?["+u+"]*,?["+u+"]*)+)","ig"),l=new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)["+u+"]*,?["+u+"]*","ig");function f(t){if(!t)return null;if(Object(r.isArray)(t))return t;var e={a:7,c:6,o:2,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,u:3,z:0},n=[];return String(t).replace(h,function(t,r,i){var o=[],a=r.toLowerCase();if(i.replace(l,function(t,e){e&&o.push(+e);}),"m"===a&&o.length>2&&(n.push([r].concat(o.splice(0,2))),a="l",r="m"===r?"l":"L"),"o"===a&&1===o.length&&n.push([r,o[0]]),"r"===a)n.push([r].concat(o));else for(;o.length>=e[a]&&(n.push([r].concat(o.splice(0,e[a]))),e[a]);){;}return"";}),n;}var d=/[a-z]/;function p(t,e){return[e[0]+(e[0]-t[0]),e[1]+(e[1]-t[1])];}function g(t){var e=f(t);if(!e||!e.length)return[["M",0,0]];for(var n=!1,r=0;r<e.length;r++){var i=e[r][0];if(d.test(i)||["V","H","T","S"].indexOf(i)>=0){n=!0;break;}}if(!n)return e;var o=[],a=0,s=0,c=0,u=0,h=0,l=e[0];"M"!==l[0]&&"m"!==l[0]||(c=a=+l[1],u=s=+l[2],h++,o[0]=["M",a,s]);r=h;for(var g=e.length;r<g;r++){var v=e[r],y=o[r-1],m=[],b=(i=v[0]).toUpperCase();if(i!==b)switch(m[0]=b,b){case"A":m[1]=v[1],m[2]=v[2],m[3]=v[3],m[4]=v[4],m[5]=v[5],m[6]=+v[6]+a,m[7]=+v[7]+s;break;case"V":m[1]=+v[1]+s;break;case"H":m[1]=+v[1]+a;break;case"M":c=+v[1]+a,u=+v[2]+s,m[1]=c,m[2]=u;break;default:for(var x=1,w=v.length;x<w;x++){m[x]=+v[x]+(x%2?a:s);}}else m=e[r];switch(b){case"Z":a=+c,s=+u;break;case"H":m=["L",a=m[1],s];break;case"V":m=["L",a,s=m[1]];break;case"T":a=m[1],s=m[2];var S=p([y[1],y[2]],[y[3],y[4]]);m=["Q",S[0],S[1],a,s];break;case"S":a=m[m.length-2],s=m[m.length-1];var O=y.length,M=p([y[O-4],y[O-3]],[y[O-2],y[O-1]]);m=["C",M[0],M[1],m[1],m[2],a,s];break;case"M":c=m[m.length-2],u=m[m.length-1];break;default:a=m[m.length-2],s=m[m.length-1];}o.push(m);}return o;}Math.PI;function v(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1]);}function y(t,e){return v(t)*v(e)?(t[0]*e[0]+t[1]*e[1])/(v(t)*v(e)):1;}function m(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(y(t,e));}function b(t,e){return t[0]===e[0]&&t[1]===e[1];}function x(t,e){var n=e[1],i=e[2],o=Object(r.mod)(Object(r.toRadian)(e[3]),2*Math.PI),a=e[4],s=e[5],c=t[0],u=t[1],h=e[6],l=e[7],f=Math.cos(o)*(c-h)/2+Math.sin(o)*(u-l)/2,d=-1*Math.sin(o)*(c-h)/2+Math.cos(o)*(u-l)/2,p=f*f/(n*n)+d*d/(i*i);p>1&&(n*=Math.sqrt(p),i*=Math.sqrt(p));var g=n*n*(d*d)+i*i*(f*f),v=g?Math.sqrt((n*n*(i*i)-g)/g):1;a===s&&(v*=-1),isNaN(v)&&(v=0);var x=i?v*n*d/i:0,w=n?v*-i*f/n:0,S=(c+h)/2+Math.cos(o)*x-Math.sin(o)*w,O=(u+l)/2+Math.sin(o)*x+Math.cos(o)*w,M=[(f-x)/n,(d-w)/i],k=[(-1*f-x)/n,(-1*d-w)/i],C=m([1,0],M),E=m(M,k);return y(M,k)<=-1&&(E=Math.PI),y(M,k)>=1&&(E=0),0===s&&E>0&&(E-=2*Math.PI),1===s&&E<0&&(E+=2*Math.PI),{cx:S,cy:O,rx:b(t,[h,l])?0:n,ry:b(t,[h,l])?0:i,startAngle:C,endAngle:C+E,xRotation:o,arcFlag:a,sweepFlag:s};}function w(t,e){return[e[0]+(e[0]-t[0]),e[1]+(e[1]-t[1])];}function S(t){for(var e=[],n=null,r=null,i=null,o=0,s=(t=a(t)).length,c=0;c<s;c++){var u=t[c];r=t[c+1];var h=u[0],l={command:h,prePoint:n,params:u,startTangent:null,endTangent:null};switch(h){case"M":i=[u[1],u[2]],o=c;break;case"A":var f=x(n,u);l.arcParams=f;}if("Z"===h)n=i,r=t[o+1];else{var d=u.length;n=[u[d-2],u[d-1]];}r&&"Z"===r[0]&&(r=t[o],e[o]&&(e[o].prePoint=n)),l.currentPoint=n,e[o]&&b(n,e[o].currentPoint)&&(e[o].prePoint=l.prePoint);var p=r?[r[r.length-2],r[r.length-1]]:null;l.nextPoint=p;var g=l.prePoint;if(["L","H","V"].includes(h))l.startTangent=[g[0]-n[0],g[1]-n[1]],l.endTangent=[n[0]-g[0],n[1]-g[1]];else if("Q"===h){var v=[u[1],u[2]];l.startTangent=[g[0]-v[0],g[1]-v[1]],l.endTangent=[n[0]-v[0],n[1]-v[1]];}else if("T"===h){v=w((S=e[c-1]).currentPoint,g);"Q"===S.command?(l.command="Q",l.startTangent=[g[0]-v[0],g[1]-v[1]],l.endTangent=[n[0]-v[0],n[1]-v[1]]):(l.command="TL",l.startTangent=[g[0]-n[0],g[1]-n[1]],l.endTangent=[n[0]-g[0],n[1]-g[1]]);}else if("C"===h){var y=[u[1],u[2]],m=[u[3],u[4]];l.startTangent=[g[0]-y[0],g[1]-y[1]],l.endTangent=[n[0]-m[0],n[1]-m[1]],0===l.startTangent[0]&&0===l.startTangent[1]&&(l.startTangent=[y[0]-m[0],y[1]-m[1]]),0===l.endTangent[0]&&0===l.endTangent[1]&&(l.endTangent=[m[0]-y[0],m[1]-y[1]]);}else if("S"===h){var S;y=w((S=e[c-1]).currentPoint,g),m=[u[1],u[2]];"C"===S.command?(l.command="C",l.startTangent=[g[0]-y[0],g[1]-y[1]],l.endTangent=[n[0]-m[0],n[1]-m[1]]):(l.command="SQ",l.startTangent=[g[0]-m[0],g[1]-m[1]],l.endTangent=[n[0]-m[0],n[1]-m[1]]);}else if("A"===h){var O=0.001,M=l.arcParams||{},k=M.cx,C=void 0===k?0:k,E=M.cy,j=void 0===E?0:E,P=M.rx,A=void 0===P?0:P,I=M.ry,T=void 0===I?0:I,N=M.sweepFlag,B=void 0===N?0:N,L=M.startAngle,D=void 0===L?0:L,_=M.endAngle,R=void 0===_?0:_;0===B&&(O*=-1);var F=A*Math.cos(D-O)+C,Y=T*Math.sin(D-O)+j;l.startTangent=[F-i[0],Y-i[1]];var X=A*Math.cos(D+R+O)+C,z=T*Math.sin(D+R-O)+j;l.endTangent=[g[0]-X,g[1]-z];}e.push(l);}return e;}},26:function _(t,e,n){"use strict";var r=n(78);n.d(e,"a",function(){return r.Layout;}),n.d(e,"b",function(){return r.Layouts;});var i=n(51);n.d(e,"c",function(){return i.registerLayout;}),n.d(e,"d",function(){return i.unRegisterLayout;});var o=n(52);Object(i.registerLayout)("random",o.RandomLayout);},27:function _(t,e,n){"use strict";n.r(e),n.d(e,"getAdjMatrix",function(){return r;}),n.d(e,"breadthFirstSearch",function(){return l;}),n.d(e,"connectedComponent",function(){return d;}),n.d(e,"getDegree",function(){return g;}),n.d(e,"getInDegree",function(){return v;}),n.d(e,"getOutDegree",function(){return y;}),n.d(e,"detectCycle",function(){return S;}),n.d(e,"detectDirectedCycle",function(){return mt;}),n.d(e,"detectAllCycles",function(){return w;}),n.d(e,"detectAllDirectedCycle",function(){return x;}),n.d(e,"detectAllUndirectedCycle",function(){return b;}),n.d(e,"depthFirstSearch",function(){return m;}),n.d(e,"dijkstra",function(){return k;}),n.d(e,"findAllPath",function(){return P;}),n.d(e,"findShortestPath",function(){return j;}),n.d(e,"floydWarshall",function(){return A;}),n.d(e,"labelPropagation",function(){return I;}),n.d(e,"louvain",function(){return F;}),n.d(e,"iLouvain",function(){return Y;}),n.d(e,"kCore",function(){return X;}),n.d(e,"kMeans",function(){return W;}),n.d(e,"cosineSimilarity",function(){return q;}),n.d(e,"nodesCosineSimilarity",function(){return V;}),n.d(e,"minimumSpanningTree",function(){return $;}),n.d(e,"pageRank",function(){return Q;}),n.d(e,"getNeighbors",function(){return c;}),n.d(e,"Stack",function(){return yt;}),n.d(e,"GADDI",function(){return vt;});var r=function r(t,e){var n=t.nodes,r=t.edges,i=[],o={};if(!n)throw new Error("invalid nodes data!");return n&&n.forEach(function(t,e){o[t.id]=e;i.push([]);}),r&&r.forEach(function(t){var n=t.source,r=t.target,a=o[n],s=o[r];!a&&0!==a||!s&&0!==s||(i[a][s]=1,e||(i[s][a]=1));}),i;},i=function i(t,e){return t===e;},o=function(){function t(t,e){void 0===e&&(e=null),this.value=t,this.next=e;}return t.prototype.toString=function(t){return t?t(this.value):"".concat(this.value);},t;}(),a=function(){function t(t){void 0===t&&(t=i),this.head=null,this.tail=null,this.compare=t;}return t.prototype.prepend=function(t){var e=new o(t,this.head);return this.head=e,this.tail||(this.tail=e),this;},t.prototype.append=function(t){var e=new o(t);return this.head?(this.tail.next=e,this.tail=e,this):(this.head=e,this.tail=e,this);},t.prototype.delete=function(t){if(!this.head)return null;for(var e=null;this.head&&this.compare(this.head.value,t);){e=this.head,this.head=this.head.next;}var n=this.head;if(null!==n)for(;n.next;){this.compare(n.next.value,t)?(e=n.next,n.next=n.next.next):n=n.next;}return this.compare(this.tail.value,t)&&(this.tail=n),e;},t.prototype.find=function(t){var e=t.value,n=void 0===e?void 0:e,r=t.callback,i=void 0===r?void 0:r;if(!this.head)return null;for(var o=this.head;o;){if(i&&i(o.value))return o;if(void 0!==n&&this.compare(o.value,n))return o;o=o.next;}return null;},t.prototype.deleteTail=function(){var t=this.tail;if(this.head===this.tail)return this.head=null,this.tail=null,t;for(var e=this.head;e.next;){e.next.next?e=e.next:e.next=null;}return this.tail=e,t;},t.prototype.deleteHead=function(){if(!this.head)return null;var t=this.head;return this.head.next?this.head=this.head.next:(this.head=null,this.tail=null),t;},t.prototype.fromArray=function(t){var e=this;return t.forEach(function(t){return e.append(t);}),this;},t.prototype.toArray=function(){for(var t=[],e=this.head;e;){t.push(e),e=e.next;}return t;},t.prototype.reverse=function(){for(var t=this.head,e=null,n=null;t;){n=t.next,t.next=e,e=t,t=n;}this.tail=this.head,this.head=e;},t.prototype.toString=function(t){return void 0===t&&(t=void 0),this.toArray().map(function(e){return e.toString(t);}).toString();},t;}(),s=function(){function t(){this.linkedList=new a();}return t.prototype.isEmpty=function(){return!this.linkedList.head;},t.prototype.peek=function(){return this.linkedList.head?this.linkedList.head.value:null;},t.prototype.enqueue=function(t){this.linkedList.append(t);},t.prototype.dequeue=function(){var t=this.linkedList.deleteHead();return t?t.value:null;},t.prototype.toString=function(t){return this.linkedList.toString(t);},t;}(),c=function c(t,e,n){void 0===e&&(e=[]);var r=e.filter(function(e){return e.source===t||e.target===t;});if("target"===n){return r.filter(function(e){return e.source===t;}).map(function(t){return t.target;});}if("source"===n){return r.filter(function(e){return e.target===t;}).map(function(t){return t.source;});}return r.map(function(e){return e.source===t?e.target:e.source;});},u=function u(t,e){return e.filter(function(e){return e.source===t||e.target===t;});},h=function h(t){void 0===t&&(t=0);var e="".concat(Math.random()).split(".")[1].substr(0,5),n="".concat(Math.random()).split(".")[1].substr(0,5);return"".concat(t,"-").concat(e).concat(n);};var l=function l(t,e,n,r){void 0===r&&(r=!0);var i=function(t){void 0===t&&(t={});var e,n=t,r=function r(){},i=(e={},function(t){var n=t.next;return!e[n]&&(e[n]=!0,!0);});return n.allowTraversal=t.allowTraversal||i,n.enter=t.enter||r,n.leave=t.leave||r,n;}(n),o=new s(),a=t.edges,u=void 0===a?[]:a;o.enqueue(e);for(var h="",l=function l(){var t=o.dequeue();i.enter({current:t,previous:h}),c(t,u,r?"target":void 0).forEach(function(e){i.allowTraversal({previous:h,current:t,next:e})&&o.enqueue(e);}),i.leave({current:t,previous:h}),h=t;};!o.isEmpty();){l();}},f=function f(t){for(var e=t.nodes,n=void 0===e?[]:e,r=t.edges,i=void 0===r?[]:r,o=[],a={},s={},u={},h=[],l=0,f=function t(e){s[e.id]=l,u[e.id]=l,l+=1,o.push(e),a[e.id]=!0;for(var r=c(e.id,i,"target").filter(function(t){return n.map(function(t){return t.id;}).indexOf(t)>-1;}),f=function f(i){var o=r[i];if(s[o]||0===s[o])a[o]&&(u[e.id]=Math.min(u[e.id],s[o]));else{var c=n.filter(function(t){return t.id===o;});c.length>0&&t(c[0]),u[e.id]=Math.min(u[e.id],u[o]);}},d=0;d<r.length;d++){f(d);}if(u[e.id]===s[e.id]){for(var p=[];o.length>0;){var g=o.pop();if(a[g.id]=!1,p.push(g),g===e)break;}p.length>0&&h.push(p);}},d=0,p=n;d<p.length;d++){var g=p[d];s[g.id]||0===s[g.id]||f(g);}return h;};function d(t,e){return e?f(t):function(t){for(var e=t.nodes,n=void 0===e?[]:e,r=t.edges,i=void 0===r?[]:r,o=[],a={},s=[],u=function t(e){s.push(e),a[e.id]=!0;for(var r=c(e.id,i),o=function o(e){var i=r[e];if(!a[i]){var o=n.filter(function(t){return t.id===i;});o.length>0&&t(o[0]);}},u=0;u<r.length;++u){o(u);}},h=0;h<n.length;h++){var l=n[h];if(!a[l.id]){u(l);for(var f=[];s.length>0;){f.push(s.pop());}o.push(f);}}return o;}(t);}var p=function p(t){var e={},n=t.nodes,r=void 0===n?[]:n,i=t.edges,o=void 0===i?[]:i;return r.forEach(function(t){e[t.id]={degree:0,inDegree:0,outDegree:0};}),o.forEach(function(t){e[t.source].degree++,e[t.source].outDegree++,e[t.target].degree++,e[t.target].inDegree++;}),e;},g=p,v=function v(t,e){return p(t)[e]?p(t)[e].inDegree:0;},y=function y(t,e){return p(t)[e]?p(t)[e].outDegree:0;};function m(t,e,n){!function t(e,n,r,i){i.enter({current:n,previous:r});var o=e.edges;c(n,void 0===o?[]:o,"target").forEach(function(o){i.allowTraversal({previous:r,current:n,next:o})&&t(e,o,n,i);}),i.leave({current:n,previous:r});}(t,e,"",function(t){void 0===t&&(t={});var e,n=t,r=function r(){},i=(e={},function(t){var n=t.next;return!e[n]&&(e[n]=!0,!0);});return n.allowTraversal=t.allowTraversal||i,n.enter=t.enter||r,n.leave=t.leave||r,n;}(n));}var b=function b(t,e,n){var r,i;void 0===n&&(n=!0);for(var o=[],a=0,s=d(t,!1);a<s.length;a++){var u=s[a];if(u.length)for(var h=u[0],l=h.id,f=[h],p=((r={})[l]=h,r),g=((i={})[l]=new Set(),i);f.length>0;){for(var v=f.pop(),y=v.id,m=c(y,t.edges),b=function b(r){var i,a=m[r],s=t.nodes.find(function(t){return t.id===a;});if(a===y)o.push(((i={})[a]=v,i));else if((a in g)){if(!g[y].has(s)){for(var c=!0,u=[s,v],h=p[y];g[a].size&&!g[a].has(h)&&(u.push(h),h!==p[h.id]);){h=p[h.id];}if(u.push(h),e&&n?(c=!1,u.findIndex(function(t){return e.indexOf(t.id)>-1;})>-1&&(c=!0)):e&&!n&&u.findIndex(function(t){return e.indexOf(t.id)>-1;})>-1&&(c=!1),c){for(var l={},d=1;d<u.length;d+=1){l[u[d-1].id]=u[d];}u.length&&(l[u[u.length-1].id]=u[0]),o.push(l);}g[a].add(v);}}else p[a]=v,f.push(s),g[a]=new Set([v]);},x=0;x<m.length;x+=1){b(x);}}}return o;},x=function x(t,e,n){void 0===n&&(n=!0);for(var r=[],i=new Set(),o=[],a=[],s={},u={},h=function t(c,u,h){var l=!1;if(e&&!1===n&&e.indexOf(c.id)>-1)return l;r.push(c),i.add(c);for(var f=h[c.id],d=0;d<f.length;d+=1){if((v=s[f[d]])===u){for(var p={},g=1;g<r.length;g+=1){p[r[g-1].id]=r[g];}r.length&&(p[r[r.length-1].id]=r[0]),a.push(p),l=!0;}else i.has(v)||t(v,u,h)&&(l=!0);}if(l)!function(t){for(var e=[t];e.length>0;){var n=e.pop();i.has(n)&&(i.delete(n),o[n.id].forEach(function(t){e.push(t);}),o[n.id].clear());}}(c);else for(d=0;d<f.length;d+=1){var v=s[f[d]];o[v.id].has(c)||o[v.id].add(c);}return r.pop(),l;},l=t.nodes,d=void 0===l?[]:l,p=0;p<d.length;p+=1){var g=d[p],v=g.id;u[v]=p,s[p]=g;}if(e&&n){var y=function y(t){var n=e[t];u[d[t].id]=u[n],u[n]=0,s[0]=d.find(function(t){return t.id===n;}),s[u[d[t].id]]=d[t];};for(p=0;p<e.length;p++){y(p);}}for(var m=function m(r){for(var i,o,s=1/0,h=0;h<r.length;h+=1){for(var l=r[h],f=0;f<l.length;f++){var d=u[l[f].id];d<s&&(s=d,o=h);}}var p=r[o],g=[];for(h=0;h<p.length;h+=1){var v=p[h];g[v.id]=[];for(var y=0,m=c(v.id,t.edges,"target").filter(function(t){return p.map(function(t){return t.id;}).indexOf(t)>-1;});y<m.length;y++){var b=m[y];b!==v.id||!1===n&&e.indexOf(v.id)>-1?g[v.id].push(u[b]):a.push(((i={})[v.id]=v,i));}}return{component:p,adjList:g,minIdx:s};},b=0;b<d.length;){var x=d.filter(function(t){return u[t.id]>=b;}),w=f({nodes:x,edges:t.edges}).filter(function(t){return t.length>1;});if(0===w.length)break;var S=m(w),O=S.minIdx,M=S.adjList,k=S.component;if(!(k.length>1))break;k.forEach(function(t){o[t.id]=new Set();});var C=s[O];if(e&&n&&-1===e.indexOf(C.id))return a;h(C,C,M),b=O+1;}return a;},w=function w(t,e,n,r){return void 0===r&&(r=!0),e?x(t,n,r):b(t,n,r);},S=function S(t){var e=null,n=t.nodes,r={},i={},o={},a={};(void 0===n?[]:n).forEach(function(t){i[t.id]=t;});for(var s={enter:function enter(t){var n=t.current,a=t.previous;if(o[n]){e={};for(var s=n,c=a;c!==n;){e[s]=c,s=c,c=r[c];}e[s]=c;}else o[n]=n,delete i[n],r[n]=a;},leave:function leave(t){var e=t.current;a[e]=e,delete o[e];},allowTraversal:function allowTraversal(t){var n=t.next;return!e&&!a[n];}};Object.keys(i).length;){m(t,Object.keys(i)[0],s);}return e;},O=n(1),M=n(0),k=function k(t,e,n,r){var i=t.nodes,o=void 0===i?[]:i,a=t.edges,s=void 0===a?[]:a,c=[],h={},l={},f={};o.forEach(function(t,n){var r=t.id;c.push(r),l[r]=1/0,r===e&&(l[r]=0);});for(var d=o.length,p=function p(t){var e=function(t,e,n){for(var r,i=1/0,o=0;o<e.length;o++){var a=e[o].id;!n[a]&&t[a]<=i&&(i=t[a],r=e[o]);}return r;}(l,o,h),i=e.id;if(h[i]=!0,l[i]===1/0)return"continue";(n?function(t,e){return e.filter(function(e){return e.source===t;});}(i,s):u(i,s)).forEach(function(t){var n=t.target,o=t.source,a=n===i?o:n,s=r&&t[r]?t[r]:1;l[a]>l[e.id]+s?(l[a]=l[e.id]+s,f[a]=[e.id]):l[a]===l[e.id]+s&&f[a].push(e.id);});},g=0;g<d;g++){p();}f[e]=[e];var v={};for(var y in l){l[y]!==1/0&&C(e,y,f,v);}var m={};for(var y in v){m[y]=v[y][0];}return{length:l,path:m,allPath:v};};function C(t,e,n,r){if(t===e)return[t];if(r[e])return r[e];for(var i=[],o=0,a=n[e];o<a.length;o++){var s=C(t,a[o],n,r);if(!s)return;for(var c=0,u=s;c<u.length;c++){var h=u[c];Object(M.isArray)(h)?i.push(Object(O.f)(Object(O.f)([],h,!0),[e],!1)):i.push([h,e]);}}return r[e]=i,r[e];}var E,j=function j(t,e,n,r,i){var o=k(t,e,r,i),a=o.length,s=o.path,c=o.allPath;return{length:a[n],path:s[n],allPath:c[n]};},P=function P(t,e,n,r){var i;if(e===n)return[[e]];var o=t.edges,a=void 0===o?[]:o,s=[e],u=((i={})[e]=!0,i),h=[],l=[],f=r?c(e,a,"target"):c(e,a);for(h.push(f);s.length>0&&h.length>0;){var d=h[h.length-1];if(d.length){var p=d.shift();if(p&&(s.push(p),u[p]=!0,f=r?c(p,a,"target"):c(p,a),h.push(f.filter(function(t){return!u[t];}))),s[s.length-1]===n){var g=s.map(function(t){return t;});l.push(g);v=s.pop();u[v]=!1,h.pop();}}else{var v=s.pop();u[v]=!1,h.pop();}}return l;},A=function A(t,e){for(var n=r(t,e),i=[],o=n.length,a=0;a<o;a+=1){i[a]=[];for(var s=0;s<o;s+=1){a===s?i[a][s]=0:0!==n[a][s]&&n[a][s]?i[a][s]=n[a][s]:i[a][s]=1/0;}}for(var c=0;c<o;c+=1){for(a=0;a<o;a+=1){for(s=0;s<o;s+=1){i[a][s]>i[a][c]+i[c][s]&&(i[a][s]=i[a][c]+i[c][s]);}}}return i;},I=function I(t,e,n,i){void 0===e&&(e=!1),void 0===n&&(n="weight"),void 0===i&&(i=1e3);var o=t.nodes,a=void 0===o?[]:o,s=t.edges,c=void 0===s?[]:s,u={},l={};a.forEach(function(t,e){var n=h();t.clusterId=n,u[n]={id:n,nodes:[t]},l[t.id]={node:t,idx:e};});var f=r(t,e),d=[],p={};f.forEach(function(t,e){var n=0,r=a[e].id;p[r]={},t.forEach(function(t,e){if(t){n+=t;var i=a[e].id;p[r][i]=t;}}),d.push(n);});for(var g=0,v=function v(){var t=!1;if(a.forEach(function(e){var n={};Object.keys(p[e.id]).forEach(function(t){var r=p[e.id][t],i=l[t].node.clusterId;n[i]||(n[i]=0),n[i]+=r;});var r=-1/0,i=[];if(Object.keys(n).forEach(function(t){r<n[t]?(r=n[t],i=[t]):r===n[t]&&i.push(t);}),1!==i.length||i[0]!==e.clusterId){var o=i.indexOf(e.clusterId);if(o>=0&&i.splice(o,1),i&&i.length){t=!0;var a=u[e.clusterId],s=a.nodes.indexOf(e);a.nodes.splice(s,1);var c=Math.floor(Math.random()*i.length),h=u[i[c]];h.nodes.push(e),e.clusterId=h.id;}}}),!t)return"break";g++;};g<i;){if("break"===v())break;}Object.keys(u).forEach(function(t){var e=u[t];e.nodes&&e.nodes.length||delete u[t];});var y=[],m={};c.forEach(function(t){var e=t.source,r=t.target,i=t[n]||1,o=l[e].node.clusterId,a=l[r].node.clusterId,s="".concat(o,"---").concat(a);if(m[s])m[s].weight+=i,m[s].count++;else{var c={source:o,target:a,weight:i,count:1};m[s]=c,y.push(c);}});var b=[];return Object.keys(u).forEach(function(t){b.push(u[t]);}),{clusters:b,clusterEdges:y};},T=function(){function t(t){this.arr=t;}return t.prototype.getArr=function(){return this.arr||[];},t.prototype.add=function(e){var n,r=e.arr;if(!(null===(n=this.arr)||void 0===n?void 0:n.length))return new t(r);if(!(null==r?void 0:r.length))return new t(this.arr);if(this.arr.length===r.length){var i=[];for(var o in this.arr){i[o]=this.arr[o]+r[o];}return new t(i);}},t.prototype.subtract=function(e){var n,r=e.arr;if(!(null===(n=this.arr)||void 0===n?void 0:n.length))return new t(r);if(!(null==r?void 0:r.length))return new t(this.arr);if(this.arr.length===r.length){var i=[];for(var o in this.arr){i[o]=this.arr[o]-r[o];}return new t(i);}},t.prototype.avg=function(e){var n=[];if(0!==e)for(var r in this.arr){n[r]=this.arr[r]/e;}return new t(n);},t.prototype.negate=function(){var e=[];for(var n in this.arr){e[n]=-this.arr[n];}return new t(e);},t.prototype.squareEuclideanDistance=function(t){var e,n=t.arr;if(!(null===(e=this.arr)||void 0===e?void 0:e.length)||!(null==n?void 0:n.length))return 0;if(this.arr.length===n.length){var r=0;for(var i in this.arr){r+=Math.pow(this.arr[i]-t.arr[i],2);}return r;}},t.prototype.euclideanDistance=function(t){var e,n=t.arr;if(!(null===(e=this.arr)||void 0===e?void 0:e.length)||!(null==n?void 0:n.length))return 0;if(this.arr.length===n.length){var r=0;for(var i in this.arr){r+=Math.pow(this.arr[i]-t.arr[i],2);}return Math.sqrt(r);}console.error("The two vectors are unequal in length.");},t.prototype.normalize=function(){var e=[],n=Object(M.clone)(this.arr);n.sort(function(t,e){return t-e;});var r=n[n.length-1],i=n[0];for(var o in this.arr){e[o]=(this.arr[o]-i)/(r-i);}return new t(e);},t.prototype.norm2=function(){var t;if(!(null===(t=this.arr)||void 0===t?void 0:t.length))return 0;var e=0;for(var n in this.arr){e+=Math.pow(this.arr[n],2);}return Math.sqrt(e);},t.prototype.dot=function(t){var e,n=t.arr;if(!(null===(e=this.arr)||void 0===e?void 0:e.length)||!(null==n?void 0:n.length))return 0;if(this.arr.length===n.length){var r=0;for(var i in this.arr){r+=this.arr[i]*t.arr[i];}return r;}console.error("The two vectors are unequal in length.");},t.prototype.equal=function(t){var e,n=t.arr;if((null===(e=this.arr)||void 0===e?void 0:e.length)!==(null==n?void 0:n.length))return!1;for(var r in this.arr){if(this.arr[r]!==n[r])return!1;}return!0;},t;}(),N=function N(t,e){void 0===e&&(e=void 0);var n=[];return t.forEach(function(t){void 0===e&&n.push(t),void 0!==t[e]&&n.push(t[e]);}),n;};!function(t){t.EuclideanDistance="euclideanDistance";}(E||(E={}));var B=function B(t,e,n){var r=[];(null==e?void 0:e.length)?r=e:(t.forEach(function(t){r=r.concat(Object.keys(t));}),r=Object(M.uniq)(r));var i={};return r.forEach(function(e){var r=[];t.forEach(function(t){void 0!==t[e]&&""!==t[e]&&r.push(t[e]);}),r.length&&!(null==n?void 0:n.includes(e))&&(i[e]=Object(M.uniq)(r));}),i;},L=function L(t,e,n){var r=B(t,e,n),i=[];return Object.keys(r).length?(t.forEach(function(t,e){var n=[];if(1===Object.keys(r).length){var o=Object.keys(r)[0];r[o].every(function(t){return!isNaN(Number(t));})&&(n=[t[o]]);}else Object.keys(r).forEach(function(e){for(var i=t[e],o=r[e],a=o.findIndex(function(t){return i===t;}),s=[],c=0;c<o.length;c++){c===a?s.push(1):s.push(0);}n=n.concat(s);});i[e]=n;}),i):i;},D=function D(t,e,n,r){void 0===n&&(n=E.EuclideanDistance);var i=0;switch(n){case E.EuclideanDistance:i=new T(t).euclideanDistance(new T(e));}return i;},_=function _(t,e,n,r){for(var i=e.length,o=2*r,a=0,s=0;s<i;s++){for(var c=t[s].clusterId,u=0;u<i;u++){if(c===t[u].clusterId)a+=(e[s][u]||0)-(n[s]||0)*(n[u]||0)/o;}}return a*=1/o;},R=function R(t,e){void 0===t&&(t=[]);for(var n=t.length,r=new T([]),i=0;i<n;i++){r=r.add(new T(e[i]));}var o=r.avg(n);o.normalize();var a=0;for(i=0;i<n;i++){a+=(c=new T(e[i])).squareEuclideanDistance(o);}var s=[];t.forEach(function(){s.push([]);});for(i=0;i<n;i++){var c=new T(e[i]);t[i].clusterInertial=0;for(var u=0;u<n;u++){if(i!==u){var h=new T(e[u]);s[i][u]=c.squareEuclideanDistance(h),t[i].clusterInertial+=s[i][u];}else s[i][u]=0;}}var l=0,f=2*n*a;for(i=0;i<n;i++){var d=t[i].clusterId;for(u=0;u<n;u++){var p=t[u].clusterId;if(i!==u&&d===p)l+=t[i].clusterInertial*t[u].clusterInertial/Math.pow(f,2)-s[i][u]/f;}}return Number(l.toFixed(4));},F=function F(t,e,n,i,o,a,s,c,u){void 0===e&&(e=!1),void 0===n&&(n="weight"),void 0===i&&(i=1e-4),void 0===o&&(o=!1),void 0===a&&(a=void 0),void 0===s&&(s=[]),void 0===c&&(c=["id"]),void 0===u&&(u=1);var h=t.nodes,l=void 0===h?[]:h,f=t.edges,d=void 0===f?[]:f,p=[];if(o){l.forEach(function(t,e){t.properties=t.properties||{},t.originIndex=e;});var g=[];l.every(function(t){return t.hasOwnProperty("nodeType");})&&(g=Array.from(new Set(l.map(function(t){return t.nodeType;}))),l.forEach(function(t){t.properties.nodeType=g.findIndex(function(e){return e===t.nodeType;});}));var v=N(l,a);p=L(v,s,c);}var y=1,m={},b={};l.forEach(function(t,e){var n=String(y++);t.clusterId=n,m[n]={id:n,nodes:[t]},b[t.id]={node:t,idx:e};});var x=r(t,e),w=[],S={},O=0;x.forEach(function(t,e){var n=0,r=l[e].id;S[r]={},t.forEach(function(t,e){if(t){n+=t;var i=l[e].id;S[r][i]=t,O+=t;}}),w.push(n);}),O/=2;for(var k=1/0,C=1/0,E=0,j=[],P={};;){k=o&&l.every(function(t){return t.hasOwnProperty("properties");})?_(l,x,w,O)+R(l,p)*u:_(l,x,w,O),0===E&&(C=k,j=l,P=m);var A=k>0&&k>C&&k-C<i;if(k>C&&(j=l.map(function(t){return{node:t,clusterId:t.clusterId};}),P=Object(M.clone)(m),C=k),A||E>100)break;E++,Object.keys(m).forEach(function(t){var e=0;d.forEach(function(r){var i=r.source,o=r.target,a=b[i].node.clusterId,s=b[o].node.clusterId;(a===t&&s!==t||s===t&&a!==t)&&(e+=r[n]||1);}),m[t].sumTot=e;}),l.forEach(function(t,e){var r,i=m[t.clusterId],a=0,s=w[e]/(2*O),c=0,h=i.nodes;h.forEach(function(t){var n=b[t.id].idx;c+=x[e][n]||0;});var l=c-i.sumTot*s,f=h.filter(function(e){return e.id!==t.id;}),g=[];f.forEach(function(t,e){g[e]=p[t.originIndex];});var v=R(f,p)*u,y=S[t.id];if(Object.keys(y).forEach(function(n){var i=b[n].node.clusterId;if(i!==t.clusterId){var c=m[i],h=c.nodes;if(h&&h.length){var f=0;h.forEach(function(t){var n=b[t.id].idx;f+=x[e][n]||0;});var d=f-c.sumTot*s,g=h.concat([t]),y=[];g.forEach(function(t,e){y[e]=p[t.originIndex];});var w=R(g,p)*u,S=d-l;o&&(S=d+w-(l+v)),S>a&&(a=S,r=c);}}}),a>0){r.nodes.push(t);var M=t.clusterId;t.clusterId=r.id;var k=i.nodes.indexOf(t);i.nodes.splice(k,1);var C=0,E=0;d.forEach(function(t){var e=t.source,i=t.target,o=b[e].node.clusterId,a=b[i].node.clusterId;(o===r.id&&a!==r.id||a===r.id&&o!==r.id)&&(C+=t[n]||1),(o===M&&a!==M||a===M&&o!==M)&&(E+=t[n]||1);}),r.sumTot=C,i.sumTot=E;}});}var I={},T=0;Object.keys(P).forEach(function(t){var e=P[t];if(e.nodes&&e.nodes.length){var n=String(T+1);n!==t&&(e.id=n,e.nodes=e.nodes.map(function(t){return{id:t.id,clusterId:n};}),P[n]=e,I[t]=n,delete P[t],T++);}else delete P[t];}),j.forEach(function(t){var e=t.node,n=t.clusterId;e.clusterId=n,e.clusterId&&I[e.clusterId]&&(e.clusterId=I[e.clusterId]);});var B=[],D={};d.forEach(function(t){var e=t.source,r=t.target,i=t[n]||1,o=b[e].node.clusterId,a=b[r].node.clusterId,s="".concat(o,"---").concat(a);if(D[s])D[s].weight+=i,D[s].count++;else{var c={source:o,target:a,weight:i,count:1};D[s]=c,B.push(c);}});var F=[];return Object.keys(P).forEach(function(t){F.push(P[t]);}),{clusters:F,clusterEdges:B};},Y=function Y(t,e,n,r,i,o,a,s){return void 0===e&&(e=!1),void 0===n&&(n="weight"),void 0===r&&(r=1e-4),void 0===i&&(i=void 0),void 0===o&&(o=[]),void 0===a&&(a=["id"]),void 0===s&&(s=1),F(t,e,n,r,!0,i,o,a,s);},X=function X(t,e){var n;void 0===e&&(e=1);for(var r=Object(M.clone)(t),i=r.nodes,o=void 0===i?[]:i,a=r.edges,s=void 0===a?[]:a,c=function c(){var t=g({nodes:o,edges:s}),r=Object.keys(t);r.sort(function(e,n){var r,i;return(null===(r=t[e])||void 0===r?void 0:r.degree)-(null===(i=t[n])||void 0===i?void 0:i.degree);});var i=r[0];if(!o.length||(null===(n=t[i])||void 0===n?void 0:n.degree)>=e)return"break";var a=o.findIndex(function(t){return t.id===i;});o.splice(a,1),s=s.filter(function(t){return!(t.source===i||t.target===i);});};;){if("break"===c())break;}return{nodes:o,edges:s};},z=function z(t,e,n){var r=[];switch(t){case E.EuclideanDistance:r=e[n];break;default:r=[];}return r;},W=function W(t,e,n,r,i,o){void 0===e&&(e=3),void 0===n&&(n=void 0),void 0===r&&(r=[]),void 0===i&&(i=["id"]),void 0===o&&(o=E.EuclideanDistance);var a=t.nodes,s=void 0===a?[]:a,c=t.edges,u=void 0===c?[]:c,h={clusters:[{id:"0",nodes:s}],clusterEdges:[]};if(o===E.EuclideanDistance&&!s.every(function(t){return t.hasOwnProperty(n);}))return h;var l=[],f=[];if(o===E.EuclideanDistance&&(l=N(s,n),f=L(l,r,i)),!f.length)return h;for(var d=Object(M.uniq)(f.map(function(t){return t.join("");})),p=Math.min(e,s.length,d.length),g=0;g<s.length;g++){s[g].originIndex=g;}var v=[],y=[],m=[];for(g=0;g<p;g++){if(0===g){var b=Math.floor(Math.random()*s.length);switch(o){case E.EuclideanDistance:v[g]=f[b];break;default:v[g]=[];}y.push(b),m[g]=[s[b]],s[b].clusterId=String(g);}else{for(var x=-1/0,w=0,S=function S(t){if(!y.includes(t)){for(var e=0,n=0;n<v.length;n++){var r=0;switch(o){case E.EuclideanDistance:r=D(f[s[t].originIndex],v[n],o);}e+=r;}var i=e/v.length;i>x&&!v.find(function(e){return Object(M.isEqual)(e,z(o,f,s[t].originIndex));})&&(x=i,w=t);}},O=0;O<s.length;O++){S(O);}v[g]=z(o,f,w),y.push(w),m[g]=[s[w]],s[w].clusterId=String(g);}}for(var k=0;;){for(g=0;g<s.length;g++){var C=0,j=1/0;if(0!==k||!y.includes(g)){for(var P=0;P<v.length;P++){var A=0;switch(o){case E.EuclideanDistance:A=D(f[g],v[P],o);}A<j&&(j=A,C=P);}if(void 0!==s[g].clusterId)for(var I=m[Number(s[g].clusterId)].length-1;I>=0;I--){m[Number(s[g].clusterId)][I].id===s[g].id&&m[Number(s[g].clusterId)].splice(I,1);}s[g].clusterId=String(C),m[C].push(s[g]);}}var B=!1;for(g=0;g<m.length;g++){var _=m[g],R=new T([]);for(P=0;P<_.length;P++){R=R.add(new T(f[_[P].originIndex]));}var F=R.avg(_.length);F.equal(new T(v[g]))||(B=!0,v[g]=F.getArr());}if(k++,s.every(function(t){return void 0!==t.clusterId;})&&B||k>=1e3)break;}var Y=[],X={};return u.forEach(function(t){var e,n,r=t.source,i=t.target,o=null===(e=s.find(function(t){return t.id===r;}))||void 0===e?void 0:e.clusterId,a=null===(n=s.find(function(t){return t.id===i;}))||void 0===n?void 0:n.clusterId,c="".concat(o,"---").concat(a);if(X[c])X[c].count++;else{var u={source:o,target:a,count:1};X[c]=u,Y.push(u);}}),{clusters:m,clusterEdges:Y};},q=function q(t,e){var n=new T(e),r=n.norm2(),i=new T(t),o=i.norm2(),a=n.dot(i),s=r*o,c=s?a/s:0;return c;},V=function V(t,e,n,r,i){void 0===t&&(t=[]),void 0===n&&(n=void 0),void 0===r&&(r=[]),void 0===i&&(i=[]);var o=Object(M.clone)(t.filter(function(t){return t.id!==e.id;})),a=t.findIndex(function(t){return t.id===e.id;}),s=N(t,n),c=L(s,r,i),u=c[a],h=[];return o.forEach(function(t,n){if(t.id!==e.id){var r=c[n],i=q(r,u);h.push(i),t.cosineSimilarity=i;}}),o.sort(function(t,e){return e.cosineSimilarity-t.cosineSimilarity;}),{allCosineSimilarity:h,similarNodes:o};},G=function(){function t(t){this.count=t.length,this.parent={};for(var e=0,n=t;e<n.length;e++){var r=n[e];this.parent[r]=r;}}return t.prototype.find=function(t){for(;this.parent[t]!==t;){t=this.parent[t];}return t;},t.prototype.union=function(t,e){var n=this.find(t),r=this.find(e);n!==r&&(n<r?(this.parent[e]!==e&&this.union(this.parent[e],t),this.parent[e]=this.parent[t]):(this.parent[t]!==t&&this.union(this.parent[t],e),this.parent[t]=this.parent[e]));},t.prototype.connected=function(t,e){return this.find(t)===this.find(e);},t;}(),H=function H(t,e){return t-e;},U=function(){function t(t){void 0===t&&(t=H),this.compareFn=t,this.list=[];}return t.prototype.getLeft=function(t){return 2*t+1;},t.prototype.getRight=function(t){return 2*t+2;},t.prototype.getParent=function(t){return 0===t?null:Math.floor((t-1)/2);},t.prototype.isEmpty=function(){return this.list.length<=0;},t.prototype.top=function(){return this.isEmpty()?void 0:this.list[0];},t.prototype.delMin=function(){var t=this.top(),e=this.list.pop();return this.list.length>0&&(this.list[0]=e,this.moveDown(0)),t;},t.prototype.insert=function(t){if(null!==t){this.list.push(t);var e=this.list.length-1;return this.moveUp(e),!0;}return!1;},t.prototype.moveUp=function(t){for(var e=this.getParent(t);t&&t>0&&this.compareFn(this.list[e],this.list[t])>0;){var n=this.list[e];this.list[e]=this.list[t],this.list[t]=n,t=e,e=this.getParent(t);}},t.prototype.moveDown=function(t){var e,n=t,r=this.getLeft(t),i=this.getRight(t),o=this.list.length;null!==r&&r<o&&this.compareFn(this.list[n],this.list[r])>0?n=r:null!==i&&i<o&&this.compareFn(this.list[n],this.list[i])>0&&(n=i),t!==n&&(e=[this.list[n],this.list[t]],this.list[t]=e[0],this.list[n]=e[1],this.moveDown(n));},t;}(),Z=function Z(t,e){var n=[],r=t.nodes,i=void 0===r?[]:r,o=t.edges,a=void 0===o?[]:o;if(0===i.length)return n;var s=i[0],c=new Set();c.add(s);var h=new U(function(t,n){return e?t.weight-n.weight:0;});for(u(s.id,a).forEach(function(t){h.insert(t);});!h.isEmpty();){var l=h.delMin(),f=l.source,d=l.target;c.has(f)&&c.has(d)||(n.push(l),c.has(f)||(c.add(f),u(f,a).forEach(function(t){h.insert(t);})),c.has(d)||(c.add(d),u(d,a).forEach(function(t){h.insert(t);})));}return n;},K=function K(t,e){var n=[],r=t.nodes,i=void 0===r?[]:r,o=t.edges,a=void 0===o?[]:o;if(0===i.length)return n;var s=a.map(function(t){return t;});e&&s.sort(function(t,e){return t.weight-e.weight;});for(var c=new G(i.map(function(t){return t.id;}));s.length>0;){var u=s.shift(),h=u.source,l=u.target;c.connected(h,l)||(n.push(u),c.union(h,l));}return n;},$=function $(t,e,n){return n?{prim:Z,kruskal:K}[n](t,e):K(t,e);},Q=function Q(t,e,n){"number"!=typeof e&&(e=1e-6),"number"!=typeof n&&(n=0.85);for(var r,i=1,o=0,a=1e3,s=t.nodes,u=void 0===s?[]:s,h=t.edges,l=void 0===h?[]:h,f=u.length,d={},p={},v=0;v<f;++v){d[m=(O=u[v]).id]=1/f,p[m]=1/f;}for(var y=g(t);a>0&&i>e;){o=0;for(v=0;v<f;++v){var m=(O=u[v]).id;if(r=0,0===y[O.id].inDegree)d[m]=0;else{for(var b=c(m,l,"source"),x=0;x<b.length;++x){var w=b[x],S=y[w].outDegree;S>0&&(r+=p[w]/S);}d[m]=n*r,o+=d[m];}}o=(1-o)/f,i=0;for(v=0;v<f;++v){var O;r=d[m=(O=u[v]).id]+o,i+=Math.abs(r-p[m]),p[m]=r;}a-=1;}return p;},J=function J(t,e,n,r){void 0===t&&(t=-1),void 0===e&&(e=-1),void 0===n&&(n=-1),void 0===r&&(r="-1"),this.id=t,this.from=e,this.to=n,this.label=r;},tt=function(){function t(t,e){void 0===t&&(t=-1),void 0===e&&(e="-1"),this.id=t,this.label=e,this.edges=[],this.edgeMap={};}return t.prototype.addEdge=function(t){this.edges.push(t),this.edgeMap[t.id]=t;},t;}(),et=function(){function t(t,e,n){void 0===t&&(t=-1),void 0===e&&(e=!0),void 0===n&&(n=!1),this.id=t,this.edgeIdAutoIncrease=e,this.edges=[],this.nodes=[],this.nodeMap={},this.edgeMap={},this.nodeLabelMap={},this.edgeLabelMap={},this.counter=0,this.directed=n;}return t.prototype.getNodeNum=function(){return this.nodes.length;},t.prototype.addNode=function(t,e){if(!this.nodeMap[t]){var n=new tt(t,e);this.nodes.push(n),this.nodeMap[t]=n,this.nodeLabelMap[e]||(this.nodeLabelMap[e]=[]),this.nodeLabelMap[e].push(t);}},t.prototype.addEdge=function(t,e,n,r){if((this.edgeIdAutoIncrease||void 0===t)&&(t=this.counter++),!(this.nodeMap[e]&&this.nodeMap[n]&&this.nodeMap[n].edgeMap[t])){var i=new J(t,e,n,r);if(this.edges.push(i),this.edgeMap[t]=i,this.nodeMap[e].addEdge(i),this.edgeLabelMap[r]||(this.edgeLabelMap[r]=[]),this.edgeLabelMap[r].push(i),!this.directed){var o=new J(t,n,e,r);this.nodeMap[n].addEdge(o),this.edgeLabelMap[r].push(o);}}},t;}(),nt=function(){function t(t,e,n,r,i){this.fromNode=t,this.toNode=e,this.nodeEdgeNodeLabel={nodeLabel1:n||"-1",edgeLabel:r||"-1",nodeLabel2:i||"-1"};}return t.prototype.equalTo=function(t){return this.fromNode===t.formNode&&this.toNode===t.toNode&&this.nodeEdgeNodeLabel===t.nodeEdgeNodeLabel;},t.prototype.notEqualTo=function(t){return!this.equalTo(t);},t;}(),rt=function(){function t(){this.rmpath=[],this.dfsEdgeList=[];}return t.prototype.equalTo=function(t){var e=this.dfsEdgeList.length;if(e!==t.length)return!1;for(var n=0;n<e;n++){if(this.dfsEdgeList[n]!==t[n])return!1;}return!0;},t.prototype.notEqualTo=function(t){return!this.equalTo(t);},t.prototype.pushBack=function(t,e,n,r,i){return this.dfsEdgeList.push(new nt(t,e,n,r,i)),this.dfsEdgeList;},t.prototype.toGraph=function(t,e){void 0===t&&(t=-1),void 0===e&&(e=!1);var n=new et(t,!0,e);return this.dfsEdgeList.forEach(function(t){var e=t.fromNode,r=t.toNode,i=t.nodeEdgeNodeLabel,o=i.nodeLabel1,a=i.edgeLabel,s=i.nodeLabel2;"-1"!==o&&n.addNode(e,o),"-1"!==s&&n.addNode(r,s),"-1"!==o&&s!==o&&n.addEdge(void 0,e,r,a);}),n;},t.prototype.buildRmpath=function(){this.rmpath=[];for(var t=void 0,e=this.dfsEdgeList.length-1;e>=0;e--){var n=this.dfsEdgeList[e],r=n.fromNode,i=n.toNode;r<i&&(void 0===t||i===t)&&(this.rmpath.push(e),t=r);}return this.rmpath;},t.prototype.getNodeNum=function(){var t={};return this.dfsEdgeList.forEach(function(e){t[e.fromNode]||(t[e.fromNode]=!0),t[e.toNode]||(t[e.toNode]=!0);}),Object.keys(t).length;},t;}(),it=function(){function t(t){if(this.his={},this.nodesUsed={},this.edgesUsed={},this.edges=[],t){for(;t;){var e=t.edge;this.edges.push(e),this.nodesUsed[e.from]=1,this.nodesUsed[e.to]=1,this.edgesUsed[e.id]=1,t=t.preNode;}this.edges=this.edges.reverse();}}return t.prototype.hasNode=function(t){return 1===this.nodesUsed[t.id];},t.prototype.hasEdge=function(t){return 1===this.edgesUsed[t.id];},t;}(),ot=function(){function t(t){var e=t.graphs,n=t.minSupport,r=void 0===n?2:n,i=t.minNodeNum,o=void 0===i?1:i,a=t.maxNodeNum,s=void 0===a?4:a,c=t.top,u=void 0===c?10:c,h=t.directed,l=void 0!==h&&h,f=t.verbose,d=void 0!==f&&f;this.graphs=e,this.dfsCode=new rt(),this.support=0,this.frequentSize1Subgraphs=[],this.frequentSubgraphs=[],this.minSupport=r,this.top=u,this.directed=l,this.counter=0,this.maxNodeNum=s,this.minNodeNum=o,this.verbose=d,this.maxNodeNum<this.minNodeNum&&(this.maxNodeNum=this.minNodeNum),this.reportDF=[];}return t.prototype.findForwardRootEdges=function(t,e){var n=this,r=[],i=t.nodeMap;return e.edges.forEach(function(t){(n.directed||e.label<=i[t.to].label)&&r.push(t);}),r;},t.prototype.findBackwardEdge=function(t,e,n,r){if(!this.directed&&e===n)return null;for(var i=t.nodeMap,o=i[n.to].edges,a=o.length,s=0;s<a;s++){var c=o[s];if(!r.hasEdge(c)&&c.to===e.from)if(this.directed){if(i[e.from].label<i[n.to].label||i[e.from].label===i[n.to].label&&e.label<=c.label)return c;}else if(e.label<c.label||e.label===c.label&&i[e.to].label<=i[n.to].label)return c;}return null;},t.prototype.findForwardPureEdges=function(t,e,n,r){for(var i=[],o=e.to,a=t.nodeMap[o].edges,s=a.length,c=0;c<s;c++){var u=a[c],h=t.nodeMap[u.to];n<=h.label&&!r.hasNode(h)&&i.push(u);}return i;},t.prototype.findForwardRmpathEdges=function(t,e,n,r){for(var i=[],o=t.nodeMap,a=o[e.to].label,s=o[e.from].edges,c=s.length,u=0;u<c;u++){var h=s[u],l=o[h.to].label;e.to===h.to||n>l||r.hasNode(o[h.to])||(e.label<h.label||e.label===h.label&&a<=l)&&i.push(h);}return i;},t.prototype.getSupport=function(t){var e={};return t.forEach(function(t){e[t.graphId]||(e[t.graphId]=!0);}),Object.keys(e).length;},t.prototype.findMinLabel=function(t){var e=void 0;return Object.keys(t).forEach(function(n){var r=t[n],i=r.nodeLabel1,o=r.edgeLabel,a=r.nodeLabel2;e?(i<e.nodeLabel1||i===e.nodeLabel1&&o<e.edgeLabel||i===e.nodeLabel1&&o===e.edgeLabel&&a<e.nodeLabel2)&&(e={nodeLabel1:i,edgeLabel:o,nodeLabel2:a}):e={nodeLabel1:i,edgeLabel:o,nodeLabel2:a};}),e;},t.prototype.isMin=function(){var t=this,e=this.dfsCode;if(this.verbose&&console.log("isMin checking",e),1===e.dfsEdgeList.length)return!0;var n=this.directed,r=e.toGraph(-1,n),i=r.nodeMap,o=new rt(),a={};r.nodes.forEach(function(e){t.findForwardRootEdges(r,e).forEach(function(t){var n=i[t.to],o="".concat(e.label,"-").concat(t.label,"-").concat(n.label);a[o]||(a[o]={projected:[],nodeLabel1:e.label,edgeLabel:t.label,nodeLabel2:n.label});var s={graphId:r.id,edge:t,preNode:null};a[o].projected.push(s);});});var s=this.findMinLabel(a);if(s){o.dfsEdgeList.push(new nt(0,1,s.nodeLabel1,s.edgeLabel,s.nodeLabel2));var c="".concat(s.nodeLabel1,"-").concat(s.edgeLabel,"-").concat(s.nodeLabel2);return function a(s){for(var c=o.buildRmpath(),u=o.dfsEdgeList[0].nodeEdgeNodeLabel.nodeLabel1,h=o.dfsEdgeList[c[0]].toNode,l={},f=!1,d=0,p=n?-1:0,g=function g(e){if(f)return"break";s.forEach(function(n){var i=new it(n),a=t.findBackwardEdge(r,i.edges[c[e]],i.edges[c[0]],i);a&&(l[a.label]||(l[a.label]={projected:[],edgeLabel:a.label}),l[a.label].projected.push({graphId:r.id,edge:l,preNode:n}),d=o.dfsEdgeList[c[e]].fromNode,f=!0);});},v=c.length-1;v>p;v--){if("break"===g(v))break;}if(f){var y=t.findMinLabel(l);o.dfsEdgeList.push(new nt(h,d,"-1",y.edgeLabel,"-1"));var m=o.dfsEdgeList.length-1;return t.dfsCode.dfsEdgeList[m]===o.dfsEdgeList[m]&&a(l[y.edgeLabel].projected);}var b={};f=!1;var x=0;s.forEach(function(e){var n=new it(e),o=t.findForwardPureEdges(r,n.edges[c[0]],u,n);o.length>0&&(f=!0,x=h,o.forEach(function(t){var n="".concat(t.label,"-").concat(i[t.to].label);b[n]||(b[n]={projected:[],edgeLabel:t.label,nodeLabel2:i[t.to].label}),b[n].projected.push({graphId:r.id,edge:t,preNode:e});}));});var w=c.length,S=function S(e){if(f)return"break";var n=c[e];s.forEach(function(e){var a=new it(e),s=t.findForwardRmpathEdges(r,a.edges[n],u,a);s.length>0&&(f=!0,x=o.dfsEdgeList[n].fromNode,s.forEach(function(t){var n="".concat(t.label,"-").concat(i[t.to].label);b[n]||(b[n]={projected:[],edgeLabel:t.label,nodeLabel2:i[t.to].label}),b[n].projected.push({graphId:r.id,edge:t,preNode:e});}));});};for(v=0;v<w;v++){if("break"===S(v))break;}if(!f)return!0;var O=t.findMinLabel(b);o.dfsEdgeList.push(new nt(x,h+1,"-1",O.edgeLabel,O.nodeLabel2));var M=o.dfsEdgeList.length-1;return e.dfsEdgeList[M]===o.dfsEdgeList[M]&&a(b["".concat(O.edgeLabel,"-").concat(O.nodeLabel2)].projected);}(a[c].projected);}},t.prototype.report=function(){if(!(this.dfsCode.getNodeNum()<this.minNodeNum)){this.counter++;var t=this.dfsCode.toGraph(this.counter,this.directed);this.frequentSubgraphs.push(Object(M.clone)(t));}},t.prototype.subGraphMining=function(t){var e=this;if(!(this.getSupport(t)<this.minSupport)&&this.isMin()){this.report();var n=this.dfsCode.getNodeNum(),r=this.dfsCode.buildRmpath(),i=this.dfsCode.dfsEdgeList[r[0]].toNode,o=this.dfsCode.dfsEdgeList[0].nodeEdgeNodeLabel.nodeLabel1,a={},s={};t.forEach(function(t){for(var c=e.graphs[t.graphId],u=c.nodeMap,h=new it(t),l=r.length-1;l>=0;l--){var f=e.findBackwardEdge(c,h.edges[r[l]],h.edges[r[0]],h);if(f){var d="".concat(e.dfsCode.dfsEdgeList[r[l]].fromNode,"-").concat(f.label);s[d]||(s[d]={projected:[],toNodeId:e.dfsCode.dfsEdgeList[r[l]].fromNode,edgeLabel:f.label}),s[d].projected.push({graphId:t.graphId,edge:f,preNode:t});}}if(!(n>=e.maxNodeNum)){e.findForwardPureEdges(c,h.edges[r[0]],o,h).forEach(function(e){var n="".concat(i,"-").concat(e.label,"-").concat(u[e.to].label);a[n]||(a[n]={projected:[],fromNodeId:i,edgeLabel:e.label,nodeLabel2:u[e.to].label}),a[n].projected.push({graphId:t.graphId,edge:e,preNode:t});});var p=function p(n){e.findForwardRmpathEdges(c,h.edges[r[n]],o,h).forEach(function(i){var o="".concat(e.dfsCode.dfsEdgeList[r[n]].fromNode,"-").concat(i.label,"-").concat(u[i.to].label);a[o]||(a[o]={projected:[],fromNodeId:e.dfsCode.dfsEdgeList[r[n]].fromNode,edgeLabel:i.label,nodeLabel2:u[i.to].label}),a[o].projected.push({graphId:t.graphId,edge:i,preNode:t});});};for(l=0;l<r.length;l++){p(l);}}}),Object.keys(s).forEach(function(t){var n=s[t],r=n.toNodeId,o=n.edgeLabel;e.dfsCode.dfsEdgeList.push(new nt(i,r,"-1",o,"-1")),e.subGraphMining(s[t].projected),e.dfsCode.dfsEdgeList.pop();}),Object.keys(a).forEach(function(t){var n=a[t],r=n.fromNodeId,o=n.edgeLabel,s=n.nodeLabel2;e.dfsCode.dfsEdgeList.push(new nt(r,i+1,"-1",o,s)),e.subGraphMining(a[t].projected),e.dfsCode.dfsEdgeList.pop();});}},t.prototype.generate1EdgeFrequentSubGraphs=function(){var t=this.graphs,e=this.directed,n=this.minSupport,r=this.frequentSize1Subgraphs,i={},o={},a={},s={};return Object.keys(t).forEach(function(n){var r=t[n],c=r.nodeMap;r.nodes.forEach(function(t,r){var u=t.label,h="".concat(n,"-").concat(u);if(!a[h]){var l=i[u]||0;l++,i[u]=l;}a[h]={graphKey:n,label:u},t.edges.forEach(function(t){var r=u,i=c[t.to].label;if(!e&&r>i){var a=i;i=r,r=a;}var h=t.label,l="".concat(n,"-").concat(r,"-").concat(h,"-").concat(i),f="".concat(r,"-").concat(h,"-").concat(i);if(!o[f]){var d=o[f]||0;d++,o[f]=d;}s[l]={graphId:n,nodeLabel1:r,edgeLabel:h,nodeLabel2:i};});});}),Object.keys(i).forEach(function(t){if(!(i[t]<n)){var e={nodes:[],edges:[]};e.nodes.push({id:"0",label:t}),r.push(e);}}),r;},t.prototype.run=function(){var t=this;if(this.frequentSize1Subgraphs=this.generate1EdgeFrequentSubGraphs(),!(this.maxNodeNum<2)){var e=this.graphs,n=(this.directed,{});Object.keys(e).forEach(function(r){var i=e[r],o=i.nodeMap;i.nodes.forEach(function(e){t.findForwardRootEdges(i,e).forEach(function(t){var i=o[t.to],a="".concat(e.label,"-").concat(t.label,"-").concat(i.label);n[a]||(n[a]={projected:[],nodeLabel1:e.label,edgeLabel:t.label,nodeLabel2:i.label});var s={graphId:r,edge:t,preNode:null};n[a].projected.push(s);});});}),Object.keys(n).forEach(function(e){var r=n[e],i=r.projected,o=r.nodeLabel1,a=r.edgeLabel,s=r.nodeLabel2;t.dfsCode.dfsEdgeList.push(new nt(0,1,o,a,s)),t.subGraphMining(i),t.dfsCode.dfsEdgeList.pop();});}},t;}(),at=function at(t){var e=t.graphs,n=t.directed,r=void 0!==n&&n,i=t.nodeLabelProp,o=void 0===i?"cluster":i,a=t.edgeLabelProp,s=void 0===a?"cluster":a,c=function(t,e,n,r){var i={};return Object.keys(t).forEach(function(o,a){var s=t[o],c=new et(a,!0,e),u={};s.nodes.forEach(function(t,e){c.addNode(e,t[n]),u[t.id]=e;}),s.edges.forEach(function(t,e){var n=u[t.source],i=u[t.target];c.addEdge(-1,n,i,t[r]);}),c&&c.getNodeNum()&&(i[c.id]=c);}),i;}(e,r,o,s),u=t.minSupport,h=t.maxNodeNum,l=t.minNodeNum,f=t.verbose,d=t.top,p=new ot({graphs:c,minSupport:u,maxNodeNum:h,minNodeNum:l,top:d,verbose:f,directed:r});return p.run(),function(t,e,n){var r=[];return t.forEach(function(t){var i={nodes:[],edges:[]};t.nodes.forEach(function(t){var n;i.nodes.push(((n={id:"".concat(t.id)})[e]=t.label,n));}),t.edges.forEach(function(t){var e;i.edges.push(((e={source:"".concat(t.from),target:"".concat(t.to)})[n]=t.label,e));}),r.push(i);}),r;}(p.frequentSubgraphs,o,s);},st=function st(t,e,n,r){void 0===n&&(n="cluster"),void 0===r&&(r=2);var i=[],o=t.nodes;return e.forEach(function(t,e){i.push(ct(o,t,e,n,r));}),i;},ct=function ct(t,e,n,r,i){var o=[n],a=[],s={};return e.forEach(function(e,c){if(e<=i&&n!==c){o.push(c),a.push(t[c]);var u=t[c][r];s[u]?(s[u].count++,s[u].dists.push(e)):s[u]={count:1,dists:[e]};}}),Object.keys(s).forEach(function(t){s[t].dists=s[t].dists.sort(function(t,e){return t-e;});}),{nodeIdx:n,nodeId:t[n].id,nodeIdxs:o,neighbors:a,neighborNum:o.length-1,nodeLabelCountMap:s};},ut=function ut(t,e,n,r){var i=n.nodes;return r||(r={}),Object.keys(t).forEach(function(o){var a,s;if(!r||!r[o]){r[o]={nodes:[],edges:[]};var c=t[o],u=null===(a=e[c.start])||void 0===a?void 0:a.nodeIdxs,h=null===(s=e[c.end])||void 0===s?void 0:s.nodeIdxs;if(u&&h){var l=new Set(h),f=u.filter(function(t){return l.has(t);});if(f&&f.length){for(var d={},p=f.length,g=0;g<p;g++){var v=i[f[g]];r[o].nodes.push(v),d[v.id]=!0;}n.edges.forEach(function(t){d[t.source]&&d[t.target]&&r[o].edges.push(t);});}}}}),r;},ht=function ht(t,e,n,r){var i,o,a={};t.nodes.forEach(function(t){a[t.id]=t;});var s=0;return!(null===(i=null==e?void 0:e.edges)||void 0===i?void 0:i.length)||(null===(o=null==e?void 0:e.nodes)||void 0===o?void 0:o.length)<2?0:(t.edges.forEach(function(t){var i=a[t.source][n],o=a[t.target][n],c=null==e?void 0:e.nodes[0][n],u=null==e?void 0:e.nodes[1][n],h=null==e?void 0:e.edges[0][r];t[r]===h&&(i===c&&o===u||i===u&&o===c)&&s++;}),s);},lt=function lt(t,e){var n={},r={};return t.forEach(function(t,i){n[t.id]={idx:i,node:t,degree:0,inDegree:0,outDegree:0};var o=t[e];r[o]||(r[o]=[]),r[o].push(t);}),{nodeMap:n,nodeLabelMap:r};},ft=function ft(t,e,n){var r={},i={};return t.forEach(function(t,o){r["".concat(h)]={idx:o,edge:t};var a=t[e];i[a]||(i[a]=[]),i[a].push(t);var s=n[t.source];s&&(s.degree++,s.outDegree++);var c=n[t.target];c&&(c.degree++,c.inDegree++);}),{edgeMap:r,edgeLabelMap:i};},dt=function dt(t,e,n){var r=e.length,i={};return e.forEach(function(e,o){for(var a=n?0:o+1,s=t[o].id,c=a;c<r;c++){if(o!==c){var u=t[c].id,h=e[c];i["".concat(s,"-").concat(u)]=h,n||(i["".concat(u,"-").concat(s)]=h);}}}),i;},pt=function pt(t,e,n,r,i,o,a,s,c,u,h){var l,f="".concat(e.id,"-").concat(n.id);if(u&&u[f])return u[f];var d=h?h[f]:void 0;if(!d){var p=((l={})[f]={start:r[e.id].idx,end:r[n.id].idx,distance:i},l);d=(h=ut(p,o,t,h))[f];}return ht(d,a,s,c);},gt=function gt(t,e,n,r){var i,o,a,s=null===(i=t[e])||void 0===i?void 0:i.degree,c=null===(o=t[e])||void 0===o?void 0:o.inDegree,u=null===(a=t[e])||void 0===a?void 0:a.outDegree;return void 0===t[e]&&(s=1/0,c=1/0,u=1/0,r[e].forEach(function(t){var e=n[t.id].degree;s>e&&(s=e);var r=n[t.id].inDegree;c>r&&(c=r);var i=n[t.id].outDegree;u>i&&(u=i);}),t[e]={degree:s,inDegree:c,outDegree:u}),{minPatternNodeLabelDegree:s,minPatternNodeLabelInDegree:c,minPatternNodeLabelOutDegree:u};},vt=function vt(t,e,n,r,i,o,a){var s;if(void 0===n&&(n=!1),void 0===o&&(o="cluster"),void 0===a&&(a="cluster"),t&&t.nodes){var c=t.nodes.length;if(c){var u=A(t,n),h=A(e,n),l=dt(t.nodes,u,n),f=dt(e.nodes,h,n),d=lt(t.nodes,o),p=d.nodeMap,g=d.nodeLabelMap,v=lt(e.nodes,o),y=v.nodeMap,m=v.nodeLabelMap;ft(t.edges,a,p);var b=ft(e.edges,a,y).edgeLabelMap,x=[];null==h||h.forEach(function(t){x=x.concat(t);}),i||(i=Math.max.apply(Math,Object(O.f)(Object(O.f)([],x,!1),[2],!1))),r||(r=i);var w=st(t,u,o,r),S=st(e,h,o,r),M=function(t,e,n,r,i){var o=Math.ceil(n/e),a={},s=0;return r.forEach(function(t,r){for(var c=0,u=0,h=t.nodeIdxs,l=t.neighborNum-1;c<o;){for(var f=h[1+Math.floor(Math.random()*l)],d=0;(a["".concat(r,"-").concat(f)]||a["".concat(f,"-").concat(r)])&&(f=Math.floor(Math.random()*e),!(++d>2*e));){;}if(d<2*e&&(a["".concat(r,"-").concat(f)]={start:r,end:f,distance:i[r][f]},c++,++s>=n))return a;if(++u>2*e)break;}c<o&&(o=(o+(o-c))/(e-r-1));}),a;}(0,c,Math.min(100,c*(c-1)/2),w,u),C=ut(M,w,t),E=at({graphs:C,nodeLabelProp:o,edgeLabelProp:a,minSupport:1,minNodeNum:1,maxNodeNum:4,directed:n}).slice(0,10),j=E.length,P=[];E.forEach(function(t,e){P[e]={},Object.keys(C).forEach(function(n){var r=C[n],i=ht(r,t,o,a);P[e][n]=i;});});var I=function(t,e,n){for(var r=1/0,i=0,o=function o(e){var n=t[e],o=Object.keys(n).sort(function(t,e){return n[t]-n[e];}),a=[];o.forEach(function(t,e){a[e%10]||(a[e%10]={graphs:[],totalCount:0,aveCount:0}),a[e%10].graphs.push(t),a[e%10].totalCount+=n[t];});var s=0,c=[];a.forEach(function(t){var e=t.totalCount/t.graphs.length;t.aveCount=e,c.push(e);var r=0,i=t.length;t.graphs.forEach(function(e,i){var o=n[e];t.graphs.forEach(function(t,e){i!==e&&(r+=Math.abs(o-n[t]));});}),s+=r/=i*(i-1)/2;}),s/=a.length;var u=0;c.forEach(function(t,e){c.forEach(function(n,r){e!==r&&(u+=Math.abs(t-n));}),u/=c.length*(c.length-1)/2;});var h=u-s;r<h&&(r=h,i=e);},a=0;a<e;a++){o(a);}return{structure:n[i],structureCountMap:t[i]};}(P,j,E),T=I.structure,N=I.structureCountMap,B=e.nodes[0],L=[],D=null===(s=e.nodes[0])||void 0===s?void 0:s[o],_=-1/0;e.nodes.forEach(function(t){var e=t[o],n=g[e];(null==n?void 0:n.length)>_&&(_=n.length,L=n,D=e,B=t);});var R={},F={},Y={},X={},z={},W={};Object.keys(m).forEach(function(r,i){z[r]=[],n&&(W[r]=[]);var s=-1/0,c=m[r],u={};c.forEach(function(t){var e=f["".concat(B.id,"-").concat(t.id)];if(e&&z[r].push(e),s<e&&(s=e),u["".concat(B.id,"-").concat(t.id)]={start:0,end:y[t.id].idx,distance:e},n){var i=f["".concat(t.id,"-").concat(B.id)];i&&W[r].push(i);}}),z[r]=z[r].sort(function(t,e){return t-e;}),n&&(W[r]=W[r].sort(function(t,e){return t-e;})),F=ut(u,S,e,F);var h=[];if(Object.keys(u).forEach(function(t){if(Y[t])h.push(Y[t]);else{var e=F[t];Y[t]=ht(e,T,o,a),h.push(Y[t]);}}),h=h.sort(function(t,e){return e-t;}),X["".concat(B.id,"-").concat(r)]=h,r!==D)for(var d=function d(e){var n=L[e],i=w[p[n.id].idx],s=i.nodeLabelCountMap[r],c=m[r].length;if(!s||s.count<c)return L.splice(e,1),"continue";for(var u=!1,f=0;f<c;f++){if(s.dists[f]>z[r][f]){u=!0;break;}}if(u)return L.splice(e,1),"continue";var d={};i.neighbors.forEach(function(t){var e=l["".concat(n.id,"-").concat(t.id)];d["".concat(n.id,"-").concat(t.id)]={start:p[n.id].idx,end:p[t.id].idx,distance:e};}),C=ut(d,w,t,C);var g=[];Object.keys(d).forEach(function(t){if(N[t])g.push(N[t]);else{var e=C[t];N[t]=ht(e,T,o,a),g.push(N[t]);}}),g=g.sort(function(t,e){return e-t;});var v=!1;for(f=0;f<c;f++){if(g[f]<h[f]){v=!0;break;}}return v?(L.splice(e,1),"continue"):void 0;},g=((null==L?void 0:L.length)||0)-1;g>=0;g--){d(g);}});var q=[];null==L||L.forEach(function(r){for(var s=p[r.id].idx,c=ct(t.nodes,u[s],s,o,i).neighbors,h=!1,f=c.length-1;f>=0;f--){if(c.length+1<e.nodes.length)return void(h=!0);var d=c[f],g=d[o];if(m[g]&&m[g].length){if(z[g]&&z[g].length){var v="".concat(r.id,"-").concat(d.id),b=l[v],x=z[g].length-1;if(b>z[g][x])c.splice(f,1);else{if(n){var S="".concat(d.id,"-").concat(r.id),O=l[S];if(x=W[g].length-1,O>W[g][x]){c.splice(f,1);continue;}}var M=N[v]?N[v]:pt(t,r,d,p,b,w,T,o,a,N,C),k="".concat(B.id,"-").concat(g);if(M<X[k][X[k].length-1])c.splice(f,1);else{var E=gt(R,g,y,m),j=E.minPatternNodeLabelDegree;E.minPatternNodeLabelInDegree,E.minPatternNodeLabelOutDegree;p[d.id].degree<j&&c.splice(f,1);}}}else c.splice(f,1);}else c.splice(f,1);}h||q.push({nodes:[r].concat(c)});});var V=k(e,B.id,!1).length,G={};n?(Object.keys(V).forEach(function(t){var e=y[t].node[o];G[e]?G[e].push(V[t]):G[e]=[V[t]];}),Object.keys(G).forEach(function(t){G[t].sort(function(t,e){return t-e;});})):G=z;for(var H=function H(r){var i=q[r],s=i.nodes[0],c={},u={};i.nodes.forEach(function(t,e){u[t.id]={idx:e,node:t,degree:0,inDegree:0,outDegree:0};var n=t[o];c[n]?c[n]++:c[n]=1;});var h=[],l={};t.edges.forEach(function(t){u[t.source]&&u[t.target]&&(h.push(t),l[t[a]]?l[t[a]]++:l[t[a]]=1,u[t.source].degree++,u[t.target].degree++,u[t.source].outDegree++,u[t.target].inDegree++);});for(var f=Object.keys(b).length,d=!1,g=0;g<f;g++){var v=Object.keys(b)[g];if(!l[v]||l[v]<b[v].length){d=!0;break;}}if(d)return q.splice(r,1),"continue";var x=h.length;if(x<e.edges.length)return q.splice(r,1),"break";var w=!1,S=function S(t){var e=h[t],r=e[a],i=b[r];if(!i||!i.length)return l[r]--,i&&l[r]<i.length?(w=!0,"break"):(h.splice(t,1),u[e.source].degree--,u[e.target].degree--,u[e.source].outDegree--,u[e.target].inDegree--,"continue");var s=u[e.source].node[o],c=u[e.target].node[o],f=!1;return i.forEach(function(t){var e=y[t.source].node,r=y[t.target].node;e[o]===s&&r[o]===c&&(f=!0),n||e[o]!==c||r[o]!==s||(f=!0);}),f?void 0:(l[r]--,i&&l[r]<i.length?(w=!0,"break"):(h.splice(t,1),u[e.source].degree--,u[e.target].degree--,u[e.source].outDegree--,u[e.target].inDegree--,"continue"));};for(g=x-1;g>=0;g--){if("break"===S(g))break;}if(w)return q.splice(r,1),"continue";i.edges=h;var O=k(i,i.nodes[0].id,!1).length;if(Object.keys(O).reverse().forEach(function(t){if(t!==i.nodes[0].id&&!w){if(O[t]===1/0){var e=u[t].node[o];if(c[e]--,c[e]<m[e].length)return void(w=!0);var n=i.nodes.indexOf(u[t].node);return i.nodes.splice(n,1),void(u[t]=void 0);}var r=p[t].node[o];if(!G[r]||!G[r].length||O[t]>G[r][G[r].length-1]){e=u[t].node[o];if(c[e]--,c[e]<m[e].length)return void(w=!0);n=i.nodes.indexOf(u[t].node);i.nodes.splice(n,1),u[t]=void 0;}}}),w)return q.splice(r,1),"continue";for(var M=!0,C=0;M&&!w;){if(M=!1,n?u[s.id].degree<y[B.id].degree||u[s.id].inDegree<y[B.id].inDegree||u[s.id].outDegree<y[B.id].outDegree:u[s.id].degree<y[B.id].degree){w=!0;break;}if(c[s[o]]<m[s[o]].length){w=!0;break;}for(var E=i.nodes.length-1;E>=0;E--){var j=i.nodes[E],P=u[j.id].degree,A=u[j.id].inDegree,I=u[j.id].outDegree,T=j[o],N=gt(R,T,y,m),L=N.minPatternNodeLabelDegree,D=N.minPatternNodeLabelInDegree,_=N.minPatternNodeLabelOutDegree;if(n?P<L||A<D||I<_:P<L){if(c[j[o]]--,c[j[o]]<m[j[o]].length){w=!0;break;}i.nodes.splice(E,1),u[j.id]=void 0,M=!0;}}if(w||!M&&0!==C)break;for(var F=(x=h.length)-1;F>=0;F--){var Y=h[F];if(!u[Y.source]||!u[Y.target]){h.splice(F,1);var X=Y[a];if(l[X]--,u[Y.source]&&(u[Y.source].degree--,u[Y.source].outDegree--),u[Y.target]&&(u[Y.target].degree--,u[Y.target].inDegree--),b[X]&&l[X]<b[X].length){w=!0;break;}M=!0;}}C++;}return w||w||i.nodes.length<e.nodes.length||h.length<e.edges.length?(q.splice(r,1),"continue"):void 0;},U=q.length-1;U>=0;U--){if("break"===H(U))break;}var Z=q.length,K=function K(t){var e=q[t],n={};e.edges.forEach(function(t){var e="".concat(t.source,"-").concat(t.target,"-").concat(t.label);n[e]?n[e]++:n[e]=1;});for(var r=function r(t){var e=q[t],r={};e.edges.forEach(function(t){var e="".concat(t.source,"-").concat(t.target,"-").concat(t.label);r[e]?r[e]++:r[e]=1;});var i=!0;Object.keys(r).length!==Object.keys(n).length?i=!1:Object.keys(n).forEach(function(t){r[t]!==n[t]&&(i=!1);}),i&&q.splice(t,1);},i=Z-1;i>t;i--){r(i);}Z=q.length;};for(U=0;U<=Z-1;U++){K(U);}return q;}}},yt=function(){function t(t){void 0===t&&(t=10),this.linkedList=new a(),this.maxStep=t;}return Object.defineProperty(t.prototype,"length",{get:function get(){return this.linkedList.toArray().length;},enumerable:!1,configurable:!0}),t.prototype.isEmpty=function(){return!this.linkedList.head;},t.prototype.isMaxStack=function(){return this.toArray().length>=this.maxStep;},t.prototype.peek=function(){return this.isEmpty()?null:this.linkedList.head.value;},t.prototype.push=function(t){this.linkedList.prepend(t),this.length>this.maxStep&&this.linkedList.deleteTail();},t.prototype.pop=function(){var t=this.linkedList.deleteHead();return t?t.value:null;},t.prototype.toArray=function(){return this.linkedList.toArray().map(function(t){return t.value;});},t.prototype.clear=function(){for(;!this.isEmpty();){this.pop();}},t;}(),mt=S;e.default={getAdjMatrix:r,breadthFirstSearch:l,connectedComponent:d,getDegree:g,getInDegree:v,getOutDegree:y,detectCycle:S,detectDirectedCycle:mt,detectAllCycles:w,detectAllDirectedCycle:x,detectAllUndirectedCycle:b,depthFirstSearch:m,dijkstra:k,findAllPath:P,findShortestPath:j,floydWarshall:A,labelPropagation:I,louvain:F,iLouvain:Y,kCore:X,kMeans:W,cosineSimilarity:q,nodesCosineSimilarity:V,minimumSpanningTree:$,pageRank:Q,getNeighbors:c,Stack:yt,GADDI:vt};},3:function _(t,e,n){"use strict";n.d(e,"b",function(){return i.a;}),n.d(e,"c",function(){return i.b;}),n.d(e,"d",function(){return i.c;}),n.d(e,"a",function(){return r;});var r={};n.r(r),n.d(r,"leftTranslate",function(){return o;}),n.d(r,"leftRotate",function(){return a;}),n.d(r,"leftScale",function(){return s;}),n.d(r,"transform",function(){return c;}),n.d(r,"direction",function(){return u;}),n.d(r,"angleTo",function(){return h;}),n.d(r,"vertical",function(){return l;});var i=n(4);function o(t,e,n){var r=[0,0,0,0,0,0,0,0,0];return i.a.fromTranslation(r,n),i.a.multiply(t,r,e);}function a(t,e,n){var r=[0,0,0,0,0,0,0,0,0];return i.a.fromRotation(r,n),i.a.multiply(t,r,e);}function s(t,e,n){var r=[0,0,0,0,0,0,0,0,0];return i.a.fromScaling(r,n),i.a.multiply(t,r,e);}function c(t,e){for(var n,r,c,u=t?[].concat(t):[1,0,0,0,1,0,0,0,1],h=0,l=e.length;h<l;h++){var f=e[h];switch(f[0]){case"t":o(u,u,[f[1],f[2]]);break;case"s":s(u,u,[f[1],f[2]]);break;case"r":a(u,u,f[1]);break;case"m":n=u,r=u,c=f[1],i.a.multiply(n,c,r);}}return u;}function u(t,e){return t[0]*e[1]-e[0]*t[1];}function h(t,e,n){var r=i.b.angle(t,e),o=u(t,e)>=0;return n?o?2*Math.PI-r:r:o?r:2*Math.PI-r;}function l(t,e,n){return n?(t[0]=e[1],t[1]=-1*e[0]):(t[0]=-1*e[1],t[1]=e[0]),t;}},30:function _(t,e,n){self,t.exports=function(){"use strict";var t={d:function d(e,n){for(var r in n){t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]});}},o:function o(t,e){return Object.prototype.hasOwnProperty.call(t,e);},r:function r(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});}},e={};function n(t,e){return void 0===t?e:t;}t.r(e),t.d(e,{default:function _default(){return de;}});var r,i=Math.round,o=Math.abs,a=Date.now,s="compute",c="auto",u="manipulation",h="none",l="pan-x",f="pan-y",d=(r={},["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(t){return r[t]=!0;}),r),p="touch",g=["x","y"],v=["clientX","clientY"],y=32,m="function"!=typeof Object.assign?function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var r=arguments[n];if(null!=r)for(var i in r){r.hasOwnProperty(i)&&(e[i]=r[i]);}}return e;}:Object.assign,b=1;function x(t,e,n){var r;if(t)if(t.forEach)t.forEach(e,n);else if(void 0!==t.length)for(r=0;r<t.length;){e.call(n,t[r],r,t),r++;}else for(r in t){t.hasOwnProperty(r)&&e.call(n,t[r],r,t);}}function w(t,e,n){return!!Array.isArray(t)&&(x(t,n[e],n),!0);}function S(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var r=0;r<t.length;){if(n&&t[r][n]==e||!n&&t[r]===e)return r;r++;}return-1;}function O(t){return(O="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function M(t,e){return"function"===O(t)?t.apply(e&&e[0]||void 0,e):t;}function k(t,e){var n=e.manager;return n?n.get(t):t;}function C(t){return 16&t?"cancel":8&t?"end":4&t?"move":2&t?"start":"";}var E=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}(this,t),this.options=m({},this.defaults,e||{}),this.id=b++,this.manager=null,this.options.enable=n(this.options.enable,!0),this.state=1,this.simultaneous={},this.requireFail=[];}var e,r;return e=t,(r=[{key:"set",value:function value(t){return m(this.options,t),this.manager&&this.manager.touchAction.update(),this;}},{key:"recognizeWith",value:function value(t){if(w(t,"recognizeWith",this))return this;var e=this.simultaneous;return e[(t=k(t,this)).id]||(e[t.id]=t,t.recognizeWith(this)),this;}},{key:"dropRecognizeWith",value:function value(t){return w(t,"dropRecognizeWith",this)||(t=k(t,this),delete this.simultaneous[t.id]),this;}},{key:"requireFailure",value:function value(t){if(w(t,"requireFailure",this))return this;var e=this.requireFail;return-1===S(e,t=k(t,this))&&(e.push(t),t.requireFailure(this)),this;}},{key:"dropRequireFailure",value:function value(t){if(w(t,"dropRequireFailure",this))return this;t=k(t,this);var e=S(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this;}},{key:"hasRequireFailures",value:function value(){return this.requireFail.length>0;}},{key:"canRecognizeWith",value:function value(t){return!!this.simultaneous[t.id];}},{key:"emit",value:function value(t){var e=this,n=this.state;function r(n){e.manager.emit(n,t);}n<8&&r(e.options.event+C(n)),r(e.options.event),t.additionalEvent&&r(t.additionalEvent),n>=8&&r(e.options.event+C(n));}},{key:"tryEmit",value:function value(t){if(this.canEmit())return this.emit(t);this.state=y;}},{key:"canEmit",value:function value(){for(var t=0;t<this.requireFail.length;){if(!(33&this.requireFail[t].state))return!1;t++;}return!0;}},{key:"recognize",value:function value(t){var e=m({},t);if(!M(this.options.enable,[this,e]))return this.reset(),void(this.state=y);56&this.state&&(this.state=1),this.state=this.process(e),30&this.state&&this.tryEmit(e);}},{key:"process",value:function value(t){}},{key:"getTouchAction",value:function value(){}},{key:"reset",value:function value(){}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t;}();function j(t){return(j="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function P(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function A(t,e){return(A=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t;})(t,e);}function I(t,e){if(e&&("object"===j(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}(t);}function T(t){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t);})(t);}E.prototype.defaults={};var N=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&A(t,e);}(a,t);var e,n,r,i,o=(r=a,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0;}catch(t){return!1;}}(),function(){var t,e=T(r);if(i){var n=T(this).constructor;t=Reflect.construct(e,arguments,n);}else t=e.apply(this,arguments);return I(this,t);});function a(){return P(this,a),o.apply(this,arguments);}return e=a,(n=[{key:"attrTest",value:function value(t){var e=this.options.pointers;return 0===e||t.pointers.length===e;}},{key:"process",value:function value(t){var e=this.state,n=t.eventType,r=6&e,i=this.attrTest(t);return r&&(8&n||!i)?16|e:r||i?4&n?8|e:2&e?4|e:2:y;}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a;}(E);function B(t){return(B="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function L(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function D(){return(D="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=_(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(arguments.length<3?t:n):i.value;}}).apply(this,arguments);}function _(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=Y(t));){;}return t;}function R(t,e){return(R=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t;})(t,e);}function F(t,e){if(e&&("object"===B(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}(t);}function Y(t){return(Y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t);})(t);}N.prototype.defaults={pointers:1};var X=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&R(t,e);}(a,t);var e,n,r,i,o=(r=a,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0;}catch(t){return!1;}}(),function(){var t,e=Y(r);if(i){var n=Y(this).constructor;t=Reflect.construct(e,arguments,n);}else t=e.apply(this,arguments);return F(this,t);});function a(){return L(this,a),o.apply(this,arguments);}return e=a,(n=[{key:"getTouchAction",value:function value(){return[h];}},{key:"attrTest",value:function value(t){return D(Y(a.prototype),"attrTest",this).call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||2&this.state);}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a;}(N);function z(t){return(z="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function W(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function q(){return(q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=V(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(arguments.length<3?t:n):i.value;}}).apply(this,arguments);}function V(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=U(t));){;}return t;}function G(t,e){return(G=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t;})(t,e);}function H(t,e){if(e&&("object"===z(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}(t);}function U(t){return(U=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t);})(t);}X.prototype.defaults={event:"rotate",threshold:0,pointers:2};var Z=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&G(t,e);}(a,t);var e,n,r,i,o=(r=a,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0;}catch(t){return!1;}}(),function(){var t,e=U(r);if(i){var n=U(this).constructor;t=Reflect.construct(e,arguments,n);}else t=e.apply(this,arguments);return H(this,t);});function a(){return W(this,a),o.apply(this,arguments);}return e=a,(n=[{key:"getTouchAction",value:function value(){return[h];}},{key:"attrTest",value:function value(t){return q(U(a.prototype),"attrTest",this).call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||2&this.state);}},{key:"emit",value:function value(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e;}q(U(a.prototype),"emit",this).call(this,t);}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a;}(N);function K(t){return 16===t?"down":8===t?"up":2===t?"left":4===t?"right":"";}function $(t){return($="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function Q(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function J(){return(J="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=tt(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(arguments.length<3?t:n):i.value;}}).apply(this,arguments);}function tt(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=rt(t));){;}return t;}function et(t,e){return(et=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t;})(t,e);}function nt(t,e){if(e&&("object"===$(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}(t);}function rt(t){return(rt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t);})(t);}Z.prototype.defaults={event:"pinch",threshold:0,pointers:2};var it=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&et(t,e);}(a,t);var e,n,r,i,o=(r=a,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0;}catch(t){return!1;}}(),function(){var t,e=rt(r);if(i){var n=rt(this).constructor;t=Reflect.construct(e,arguments,n);}else t=e.apply(this,arguments);return nt(this,t);});function a(){var t;return Q(this,a),(t=o.apply(this,arguments)).pX=null,t.pY=null,t;}return e=a,(n=[{key:"getTouchAction",value:function value(){var t=this.options.direction,e=[];return 6&t&&e.push(f),24&t&&e.push(l),e;}},{key:"directionTest",value:function value(t){var e=this.options,n=!0,r=t.distance,i=t.direction,o=t.deltaX,a=t.deltaY;return i&e.direction||(6&e.direction?(i=0===o?1:o<0?2:4,n=o!==this.pX,r=Math.abs(t.deltaX)):(i=0===a?1:a<0?8:16,n=a!==this.pY,r=Math.abs(t.deltaY))),t.direction=i,n&&r>e.threshold&&i&e.direction;}},{key:"attrTest",value:function value(t){return N.prototype.attrTest.call(this,t)&&(2&this.state||!(2&this.state)&&this.directionTest(t));}},{key:"emit",value:function value(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=K(t.direction);e&&(t.additionalEvent=this.options.event+e),J(rt(a.prototype),"emit",this).call(this,t);}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a;}(N);function ot(t){return(ot="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function at(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function st(){return(st="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=ct(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(arguments.length<3?t:n):i.value;}}).apply(this,arguments);}function ct(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=lt(t));){;}return t;}function ut(t,e){return(ut=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t;})(t,e);}function ht(t,e){if(e&&("object"===ot(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}(t);}function lt(t){return(lt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t);})(t);}it.prototype.defaults={event:"pan",threshold:10,pointers:1,direction:30};var ft=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&ut(t,e);}(s,t);var e,n,r,i,a=(r=s,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0;}catch(t){return!1;}}(),function(){var t,e=lt(r);if(i){var n=lt(this).constructor;t=Reflect.construct(e,arguments,n);}else t=e.apply(this,arguments);return ht(this,t);});function s(){return at(this,s),a.apply(this,arguments);}return e=s,(n=[{key:"getTouchAction",value:function value(){return it.prototype.getTouchAction.call(this);}},{key:"attrTest",value:function value(t){var e,n=this.options.direction;return 30&n?e=t.overallVelocity:6&n?e=t.overallVelocityX:24&n&&(e=t.overallVelocityY),st(lt(s.prototype),"attrTest",this).call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers===this.options.pointers&&o(e)>this.options.velocity&&4&t.eventType;}},{key:"emit",value:function value(t){var e=K(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t);}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),s;}(N);function dt(t,e){return function(){return t.apply(e,arguments);};}function pt(t,e,n){return setTimeout(dt(t,n),e);}function gt(t,e,n){n||(n=g);var r=e[n[0]]-t[n[0]],i=e[n[1]]-t[n[1]];return Math.sqrt(r*r+i*i);}function vt(t){return(vt="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function yt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function mt(t,e){return(mt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t;})(t,e);}function bt(t,e){if(e&&("object"===vt(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}(t);}function xt(t){return(xt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t);})(t);}ft.prototype.defaults={event:"swipe",threshold:10,velocity:0.3,direction:30,pointers:1};var wt=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&mt(t,e);}(a,t);var e,n,r,i,o=(r=a,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0;}catch(t){return!1;}}(),function(){var t,e=xt(r);if(i){var n=xt(this).constructor;t=Reflect.construct(e,arguments,n);}else t=e.apply(this,arguments);return bt(this,t);});function a(){var t;return yt(this,a),(t=o.apply(this,arguments)).pTime=!1,t.pCenter=!1,t._timer=null,t._input=null,t.count=0,t;}return e=a,(n=[{key:"getTouchAction",value:function value(){return[u];}},{key:"process",value:function value(t){var e=this,n=this.options,r=t.pointers.length===n.pointers,i=t.distance<n.threshold,o=t.deltaTime<n.time;if(this.reset(),1&t.eventType&&0===this.count)return this.failTimeout();if(i&&o&&r){if(4!==t.eventType)return this.failTimeout();var a=!this.pTime||t.timeStamp-this.pTime<n.interval,s=!this.pCenter||gt(this.pCenter,t.center)<n.posThreshold;if(this.pTime=t.timeStamp,this.pCenter=t.center,s&&a?this.count+=1:this.count=1,this._input=t,0==this.count%n.taps)return this.hasRequireFailures()?(this._timer=pt(function(){e.state=8,e.tryEmit();},n.interval,this),2):8;}return y;}},{key:"failTimeout",value:function value(){var t=this;return this._timer=pt(function(){t.state=y;},this.options.interval,this),y;}},{key:"reset",value:function value(){clearTimeout(this._timer),this._timer=null;}},{key:"emit",value:function value(){8===this.state&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input));}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a;}(E);function St(t){return(St="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function Ot(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function Mt(t,e){return(Mt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t;})(t,e);}function kt(t,e){if(e&&("object"===St(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}(t);}function Ct(t){return(Ct=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t);})(t);}wt.prototype.defaults={event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10};var Et=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&Mt(t,e);}(s,t);var e,n,r,i,o=(r=s,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0;}catch(t){return!1;}}(),function(){var t,e=Ct(r);if(i){var n=Ct(this).constructor;t=Reflect.construct(e,arguments,n);}else t=e.apply(this,arguments);return kt(this,t);});function s(){var t;return Ot(this,s),(t=o.apply(this,arguments))._timer=null,t._input=null,t;}return e=s,(n=[{key:"getTouchAction",value:function value(){return[c];}},{key:"process",value:function value(t){var e=this,n=this.options,r=t.pointers.length===n.pointers,i=t.distance<n.threshold,o=t.deltaTime>n.time;if(this._input=t,!i||!r||12&t.eventType&&!o)this.reset();else if(1&t.eventType)this.reset(),this._timer=pt(function(){e.state=8,e.tryEmit();},n.time,this);else if(4&t.eventType)return 8;return y;}},{key:"reset",value:function value(){clearTimeout(this._timer),this._timer=null;}},{key:"emit",value:function value(t){8===this.state&&(t&&4&t.eventType?this.manager.emit("".concat(this.options.event,"up"),t):(this._input.timeStamp=a(),this.manager.emit(this.options.event,this._input)));}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),s;}(E);function jt(t,e){return t.indexOf(e)>-1;}Et.prototype.defaults={event:"press",pointers:1,time:251,threshold:9};var Pt=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}(this,t),this.manager=e,this.set(n);}var e,n;return e=t,(n=[{key:"set",value:function value(t){t===s&&(t=this.compute()),this.actions=t.toLowerCase().trim();}},{key:"update",value:function value(){this.set(this.manager.options.touchAction);}},{key:"compute",value:function value(){var t=[];return x(this.manager.recognizers,function(e){M(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()));}),function(t){if(jt(t,h))return h;var e=jt(t,l),n=jt(t,f);return e&&n?h:e||n?e?l:f:jt(t,u)?u:c;}(t.join(" "));}},{key:"preventDefaults",value:function value(t){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)e.preventDefault();else{var r=this.actions,i=jt(r,h)&&!d.none,o=jt(r,f)&&!d["pan-y"],a=jt(r,l)&&!d["pan-x"];if(i){var s=1===t.pointers.length,c=t.distance<2,u=t.deltaTime<250;if(s&&c&&u)return;}if(!a||!o)return i||o&&6&n||a&&24&n?this.preventSrc(e):void 0;}}},{key:"preventSrc",value:function value(t){this.manager.session.prevented=!0,t.preventDefault();}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t;}();function At(t){var e=t.length;if(1===e)return{x:i(t[0].clientX),y:i(t[0].clientY)};for(var n=0,r=0,o=0;o<e;){n+=t[o].clientX,r+=t[o].clientY,o++;}return{x:i(n/e),y:i(r/e)};}function It(t){for(var e=[],n=0;n<t.pointers.length;){e[n]={clientX:i(t.pointers[n].clientX),clientY:i(t.pointers[n].clientY)},n++;}return{timeStamp:a(),pointers:e,center:At(e),deltaX:t.deltaX,deltaY:t.deltaY};}function Tt(t,e,n){n||(n=g);var r=e[n[0]]-t[n[0]],i=e[n[1]]-t[n[1]];return 180*Math.atan2(i,r)/Math.PI;}function Nt(t,e){return t===e?1:o(t)>=o(e)?t<0?2:4:e<0?8:16;}function Bt(t,e,n){return{x:e/t||0,y:n/t||0};}function Lt(t,e,n){var r=n.pointers.length,i=n.changedPointers.length,s=1&e&&r-i==0,c=12&e&&r-i==0;n.isFirst=!!s,n.isFinal=!!c,s&&(t.session={}),n.eventType=e,function(t,e){var n=t.session,r=e.pointers,i=r.length;n.firstInput||(n.firstInput=It(e)),i>1&&!n.firstMultiple?n.firstMultiple=It(e):1===i&&(n.firstMultiple=!1);var s=n.firstInput,c=n.firstMultiple,u=c?c.center:s.center,h=e.center=At(r);e.timeStamp=a(),e.deltaTime=e.timeStamp-s.timeStamp,e.angle=Tt(u,h),e.distance=gt(u,h),function(t,e){var n=e.center,r=t.offsetDelta||{},i=t.prevDelta||{},o=t.prevInput||{};1!==e.eventType&&4!==o.eventType||(i=t.prevDelta={x:o.deltaX||0,y:o.deltaY||0},r=t.offsetDelta={x:n.x,y:n.y}),e.deltaX=i.x+(n.x-r.x),e.deltaY=i.y+(n.y-r.y);}(n,e),e.offsetDirection=Nt(e.deltaX,e.deltaY);var l,f,d=Bt(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=d.x,e.overallVelocityY=d.y,e.overallVelocity=o(d.x)>o(d.y)?d.x:d.y,e.scale=c?(l=c.pointers,gt((f=r)[0],f[1],v)/gt(l[0],l[1],v)):1,e.rotation=c?function(t,e){return Tt(e[1],e[0],v)+Tt(t[1],t[0],v);}(c.pointers,r):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,function(t,e){var n,r,i,a,s=t.lastInterval||e,c=e.timeStamp-s.timeStamp;if(8!==e.eventType&&(c>25||void 0===s.velocity)){var u=e.deltaX-s.deltaX,h=e.deltaY-s.deltaY,l=Bt(c,u,h);r=l.x,i=l.y,n=o(l.x)>o(l.y)?l.x:l.y,a=Nt(u,h),t.lastInterval=e;}else n=s.velocity,r=s.velocityX,i=s.velocityY,a=s.direction;e.velocity=n,e.velocityX=r,e.velocityY=i,e.direction=a;}(n,e);}(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n;}function Dt(t){return t.trim().split(/\s+/g);}function _t(t,e,n){x(Dt(e),function(e){t.addEventListener(e,n,!1);});}var Rt=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}(this,t);var r=this;this.manager=e,this.callback=n,this.eventHandler=function(t){M(e.options.enable,[e])&&r.handler(t);},this.init();}var e,n;return e=t,(n=[{key:"handler",value:function value(){}},{key:"init",value:function value(){var t,e,n;t=this.manager,e=this.events||"",n=this.eventHandler,x(Dt(e),function(e){t.on("origin_input:".concat(e),n);});}},{key:"destroy",value:function value(){removeManagerListeners(this.manager,this.events||"",this.eventHandler);}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t;}();function Ft(t){return Array.prototype.slice.call(t,0);}function Yt(t,e,n){for(var r=[],i=[],o=0;o<t.length;){var a=e?t[o][e]:t[o];S(i,a)<0&&r.push(t[o]),i[o]=a,o++;}return n&&(r=e?r.sort(function(t,n){return t[e]>n[e];}):r.sort()),r;}function Xt(t){return(Xt="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function zt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function Wt(t,e){return(Wt=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t;})(t,e);}function qt(t,e){if(e&&("object"===Xt(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}(t);}function Vt(t){return(Vt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t);})(t);}var Gt={touchstart:1,touchmove:2,touchend:4,touchcancel:8},Ht="touchstart touchmove touchend touchcancel",Ut=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&Wt(t,e);}(a,t);var e,n,r,i,o=(r=a,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0;}catch(t){return!1;}}(),function(){var t,e=Vt(r);if(i){var n=Vt(this).constructor;t=Reflect.construct(e,arguments,n);}else t=e.apply(this,arguments);return qt(this,t);});function a(){var t;return zt(this,a),a.prototype.evTarget=Ht,a.prototype.targetIds={},a.prototype.events=Ht,(t=o.apply(this,arguments)).evTarget=Ht,t.targetIds={},t;}return e=a,(n=[{key:"handler",value:function value(t){var e=Gt[t.type],n=Zt.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:p,srcEvent:t});}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a;}(Rt);function Zt(t,e){var n,r,i=Ft(t.touches),o=this.targetIds;if(3&e&&1===i.length)return o[i[0].identifier]=!0,[i,i];var a=Ft(t.changedTouches),s=[];if(this.target,r=i,1===e)for(n=0;n<r.length;){o[r[n].identifier]=!0,n++;}for(n=0;n<a.length;){o[a[n].identifier]&&s.push(a[n]),12&e&&delete o[a[n].identifier],n++;}return s.length?[Yt(r.concat(s),"identifier",!0),s]:void 0;}var Kt=function(){function t(e){var n,r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}(this,t),this.options=m({},Qt.defaults,e||{}),this.handlers={},this.filters=[],this.session={},this.recognizers=[],this.input=(n=Ut,this.options.inputClass&&(n=inputClass),new n(this,Lt)),this.touchAction=new Pt(this,this.options.touchAction),x(this.options.recognizers,function(t){var e=r.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3]);},this);}var e,n;return e=t,(n=[{key:"set",value:function value(t){return m(this.options,t),t.touchAction&&this.touchAction.update(),this;}},{key:"stop",value:function value(t){this.session.stopped=t?2:1;}},{key:"addFilter",value:function value(t){if("function"!=typeof t)throw new Error("filter must be a function");this.filters.push(t);}},{key:"recognize",value:function value(t){var e=this.session;if(!e.stopped){var n;this.touchAction.preventDefaults(t);var r=this.recognizers,i=e.curRecognizer;(!i||i&&8&i.state)&&(i=e.curRecognizer=null);for(var o=0;o<r.length;){n=r[o],2===e.stopped||i&&n!==i&&!n.canRecognizeWith(i)?n.reset():n.recognize(t),!i&&14&n.state&&(i=e.curRecognizer=n),o++;}}}},{key:"get",value:function value(t){if(t instanceof E)return t;for(var e=this.recognizers,n=0;n<e.length;n++){if(e[n].options.event===t)return e[n];}return null;}},{key:"add",value:function value(t){if(w(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t;}},{key:"remove",value:function value(t){if(w(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=S(e,t);-1!==n&&(e.splice(n,1),this.touchAction.update());}return this;}},{key:"on",value:function value(t,e){if(void 0!==t&&void 0!==e){var n=this.handlers;return x(Dt(t),function(t){n[t]=n[t]||[],n[t].push(e);}),this;}}},{key:"off",value:function value(t,e){if(void 0!==t){var n=this.handlers;return x(Dt(t),function(t){e?n[t]&&n[t].splice(S(n[t],e),1):delete n[t];}),this;}}},{key:"emit",value:function value(t,e){var n=this.handlers[t]&&this.handlers[t].slice();if(this.filters,n&&n.length){t.startsWith("origin_input")||(e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault&&e.srcEvent.preventDefault();});for(var r=0;r<n.length;){n[r](e),r++;}}}},{key:"destroy",value:function value(){this.handlers={},this.filters=[],this.session={},this.input.destroy();}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t;}();function $t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}var Qt=function(t,e,n){return e&&$t(t.prototype,e),n&&$t(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t;}(function t(e){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}(this,t),(e=e||{}).recognizers=n(e.recognizers,t.defaults.preset),new Kt(e);});function Jt(t){return(Jt="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function te(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function ee(t,e){return(ee=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t;})(t,e);}function ne(t,e){if(e&&("object"===Jt(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;}(t);}function re(t){return(re=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t);})(t);}Qt.defaults={domEvents:!1,touchAction:s,enable:!0,inputClass:null,preset:[[X,{enable:!1}],[Z,{enable:!1},["rotate"]],[ft,{direction:6}],[it,{direction:6},["swipe"]],[wt],[wt,{event:"doubletap",taps:2},["tap"]],[Et]]};var ie={pointerdown:1,pointermove:2,pointerup:4,pointercancel:8,pointerout:8},oe={2:p,3:"pen",4:"mouse",5:"kinect"},ae="pointerdown",se="pointermove pointerup pointercancel",ce=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&ee(t,e);}(a,t);var e,n,r,i,o=(r=a,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0;}catch(t){return!1;}}(),function(){var t,e=re(r);if(i){var n=re(this).constructor;t=Reflect.construct(e,arguments,n);}else t=e.apply(this,arguments);return ne(this,t);});function a(){var t;return te(this,a),a.prototype.events="".concat(ae," ").concat(se),(t=o.apply(this,arguments)).evEl=ae,t.evWin=se,t.store=t.manager.session.pointerEvents=[],t;}return e=a,(n=[{key:"handler",value:function value(t){var e=this.store,n=!1,r=t.type.toLowerCase().replace("ms",""),i=ie[r],o=oe[t.pointerType]||t.pointerType,a=o===p,s=S(e,t.pointerId,"pointerId");1&i&&(0===t.button||a)?s<0&&(e.push(t),s=e.length-1):12&i&&(n=!0),s<0||(e[s]=t,this.callback(this.manager,i,{pointers:e,changedPointers:[t],pointerType:o,srcEvent:t}),n&&e.splice(s,1));}}])&&function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a;}(Rt);function ue(t,e,n){x(Dt(e),function(e){t.removeEventListener(e,n,!1);});}function he(t,e,n){var r="DEPRECATED METHOD: ".concat(e,"\n").concat(n," AT \n");return function(){var e=new Error("get-stack-trace"),n=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",i=console.warn;return i&&i(r,n),t.apply(this,arguments);};}var le=he(function(t,e,n){for(var r=Object.keys(e),i=0;i<r.length;){(!n||n&&void 0===t[r[i]])&&(t[r[i]]=e[r[i]]),i++;}return t;},"extend","Use `assign`."),fe=he(function(t,e){return le(t,e,!0);},"merge","Use `assign`."),de=m(Qt,{INPUT_START:1,INPUT_MOVE:2,INPUT_END:4,INPUT_CANCEL:8,STATE_POSSIBLE:1,STATE_BEGAN:2,STATE_CHANGED:4,STATE_ENDED:8,STATE_RECOGNIZED:8,STATE_CANCELLED:16,STATE_FAILED:y,DIRECTION_NONE:1,DIRECTION_LEFT:2,DIRECTION_RIGHT:4,DIRECTION_UP:8,DIRECTION_DOWN:16,DIRECTION_HORIZONTAL:6,DIRECTION_VERTICAL:24,DIRECTION_ALL:30,Manager:Kt,Input:Rt,TouchAction:Pt,TouchInput:Ut,PointerEventInput:ce,Recognizer:E,AttrRecognizer:N,Tap:wt,Pan:it,Swipe:ft,Pinch:Z,Rotate:X,Press:Et,on:_t,off:ue,each:x,merge:fe,extend:le,assign:m,inherit:function inherit(t,e,n){var r,i=e.prototype;(r=t.prototype=Object.create(i)).constructor=t,r._super=i,n&&m(r,n);},bindFn:dt,toArray:Ft,inArray:S,uniqueArray:Yt,splitStr:Dt,boolOrFn:M,hasParent:function hasParent(t,e){for(;t;){if(t===e)return!0;t=t.parentNode;}return!1;},addEventListeners:_t,removeEventListeners:ue});return e;}();},32:function _(t,e,n){"use strict";var r={};n.r(r),n.d(r,"proccessToFunc",function(){return u;}),n.d(r,"buildTextureData",function(){return h;}),n.d(r,"buildTextureDataWithOneEdgeAttr",function(){return l;}),n.d(r,"buildTextureDataWithTwoEdgeAttr",function(){return f;}),n.d(r,"attributesToTextureData",function(){return d;}),n.d(r,"arrayToTextureData",function(){return p;}),n.d(r,"radialLayout",function(){return g;});var i=n(1),o=n(75),a=n(2),s=n(0),c=a.h.traverseTree,u=function u(t,e){return t?Object(s.isNumber)(t)?function(e){return t;}:t:function(t){return e||1;};},h=function h(t,e){var n=[],r=[],i={},o=0;for(o=0;o<t.length;o++){var a=t[o];i[a.id]=o,n.push(a.x),n.push(a.y),n.push(0),n.push(0),r.push([]);}for(o=0;o<e.length;o++){var s=e[o];r[i[s.source]].push(i[s.target]),r[i[s.target]].push(i[s.source]);}var c=0;for(o=0;o<t.length;o++){var u=n.length,h=r[o],l=h.length;n[4*o+2]=u,n[4*o+3]=h.length,c=Math.max(c,h.length);for(var f=0;f<l;++f){var d=h[f];n.push(+d);}}for(;n.length%4!=0;){n.push(0);}return{array:new Float32Array(n),maxEdgePerVetex:c};},l=function l(t,e,n){var r=[],i=[],o={},a=0;for(a=0;a<t.length;a++){var s=t[a];o[s.id]=a,r.push(s.x),r.push(s.y),r.push(0),r.push(0),i.push([]);}for(a=0;a<e.length;a++){var c=e[a];i[o[c.source]].push(o[c.target]),i[o[c.source]].push(n(c)),i[o[c.target]].push(o[c.source]),i[o[c.target]].push(n(c));}var u=0;for(a=0;a<t.length;a++){var h=r.length,l=i[a],f=l.length;r[4*a+2]=h,r[4*a+3]=f/2,u=Math.max(u,f/2);for(var d=0;d<f;++d){var p=l[d];r.push(+p);}}for(;r.length%4!=0;){r.push(0);}return{array:new Float32Array(r),maxEdgePerVetex:u};},f=function f(t,e,n,r){var i=[],o=[],a={},s=0;for(s=0;s<t.length;s++){var c=t[s];a[c.id]=s,i.push(c.x),i.push(c.y),i.push(0),i.push(0),o.push([]);}for(s=0;s<e.length;s++){var u=e[s];o[a[u.source]].push(a[u.target]),o[a[u.source]].push(n(u)),o[a[u.source]].push(r(u)),o[a[u.source]].push(0),o[a[u.target]].push(a[u.source]),o[a[u.target]].push(n(u)),o[a[u.target]].push(r(u)),o[a[u.target]].push(0);}var h=0;for(s=0;s<t.length;s++){var l=i.length,f=o[s],d=f.length;i[4*s+2]=l+1048576*d/4,i[4*s+3]=0,h=Math.max(h,d/4);for(var p=0;p<d;++p){var g=f[p];i.push(+g);}}for(;i.length%4!=0;){i.push(0);}return{array:new Float32Array(i),maxEdgePerVetex:h};},d=function d(t,e){var n=[],r=t.length,i={};return e.forEach(function(e){t.forEach(function(t,o){if(void 0===i[e[t]]&&(i[e[t]]=Object.keys(i).length),n.push(i[e[t]]),o===r-1)for(;n.length%4!=0;){n.push(0);}});}),{array:new Float32Array(n),count:Object.keys(i).length};},p=function p(t){for(var e=[],n=t.length,r=t[0].length,i=function i(r){t.forEach(function(t,i){if(e.push(t[r]),i===n-1)for(;e.length%4!=0;){e.push(0);}});},o=0;o<r;o++){i(o);}return new Float32Array(e);},g=function g(t,e){var n={x:1/0,y:1/0},r={x:-1/0,y:-1/0},i="x",o="y";e&&["V","TB","BT"].indexOf(e)>=0&&(o="x",i="y");var a=0;c(t,function(t){return a++,t.x>r.x&&(r.x=t.x),t.x<n.x&&(n.x=t.x),t.y>r.y&&(r.y=t.y),t.y<n.y&&(n.y=t.y),!0;});var s=2*Math.PI/a,u=r[o]-n[o];return 0===u||c(t,function(e){var r=(e[o]-n[o])/u*(2*Math.PI-s)+s,a=Math.abs("x"===i?e.x-t.x:e.y-t.y);return e.x=a*Math.cos(r),e.y=a*Math.sin(r),!0;}),t;},v=Object(i.a)(Object(i.a)(Object(i.a)({},a.h),o),r);e.a=v;},395:function _(t,e,n){"use strict";var _r2=function r(){return(_r2=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){for(var i in e=arguments[n]){Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);}}return t;}).apply(this,arguments);};function i(t,e){var n={};for(var r in t){Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);}if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(t);i<r.length;i++){e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);}}return n;}var o=n(2),a=n(0);Object(o.l)("circle",{options:{size:o.e.defaultNode.size,style:{x:0,y:0,stroke:o.e.defaultNode.style.stroke,fill:o.e.defaultNode.style.fill,lineWidth:o.e.defaultNode.style.lineWidth},labelCfg:{style:{fill:o.e.nodeLabel.style.fill,fontSize:o.e.nodeLabel.style.fontSize}},linkPoints:{top:!1,right:!1,bottom:!1,left:!1,size:o.e.defaultNode.linkPoints.size,lineWidth:o.e.defaultNode.linkPoints.lineWidth,fill:o.e.defaultNode.linkPoints.fill,stroke:o.e.defaultNode.linkPoints.stroke},icon:{show:!1,img:"https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg",width:20,height:20},stateStyles:_r2({},o.e.nodeStateStyles)},shapeType:"circle",labelPosition:"center",drawShape:function drawShape(t,e){var n=this.getOptions(t).icon,i=void 0===n?{}:n,o=this.getShapeStyle(t),s=Object(a.deepMix)({},i,t.icon),c=e.addShape("circle",{attrs:o,className:"".concat(this.type,"-keyShape"),draggable:!0}),u=s.width,h=s.height,l=s.show,f=s.text;return l&&(f?e.addShape("text",{attrs:_r2({x:0,y:0,fontSize:12,fill:"#000",stroke:"#000",textBaseline:"middle",textAlign:"center"},s),className:"".concat(this.type,"-icon"),name:"".concat(this.type,"-icon"),draggable:!0}):e.addShape("image",{attrs:_r2({x:-u/2,y:-h/2},s),className:"".concat(this.type,"-icon"),name:"".concat(this.type,"-icon"),draggable:!0})),this.drawLinkPoints(t,e),c;},drawLinkPoints:function drawLinkPoints(t,e){var n=this.getOptions(t).linkPoints,o=void 0===n?{}:n,a=o.top,s=o.left,c=o.right,u=o.bottom,h=o.size,l=o.r,f=i(o,["top","left","right","bottom","size","r"]),d=this.getSize(t)[0]/2;s&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:-d,y:0,r:h/2||l||5}),className:"link-point-left",name:"link-point-left",isAnchorPoint:!0}),c&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:d,y:0,r:h/2||l||5}),className:"link-point-right",name:"link-point-right",isAnchorPoint:!0}),a&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:0,y:-d,r:h/2||l||5}),className:"link-point-top",name:"link-point-top",isAnchorPoint:!0}),u&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:0,y:d,r:h/2||l||5}),className:"link-point-bottom",name:"link-point-bottom",isAnchorPoint:!0});},getShapeStyle:function getShapeStyle(t){var e=this.getOptions(t).style,n={stroke:t.color},i=Object(a.deepMix)({},e,n),o=this.getSize(t)[0]/2;return _r2({x:0,y:0,r:o},i);},update:function update(t,e){var n=e.getContainer(),r=this.getSize(t),i={stroke:t.color,r:r[0]/2},o=e.get("keyShape"),s=Object(a.deepMix)({},o.attr(),i,t.style);this.updateShape(t,e,s,!0),this.updateLinkPoints(t,n);}},"single-node"),Object(o.l)("rect",{options:{size:[100,30],style:{radius:0,stroke:o.e.defaultNode.style.stroke,fill:o.e.defaultNode.style.fill,lineWidth:o.e.defaultNode.style.lineWidth},labelCfg:{style:{fill:o.e.nodeLabel.style.fill,fontSize:o.e.nodeLabel.style.fontSize}},linkPoints:{top:!1,right:!1,bottom:!1,left:!1,size:o.e.defaultNode.linkPoints.size,lineWidth:o.e.defaultNode.linkPoints.lineWidth,fill:o.e.defaultNode.linkPoints.fill,stroke:o.e.defaultNode.linkPoints.stroke},icon:{show:!1,img:"https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg",width:20,height:20},anchorPoints:[[0,0.5],[1,0.5]],stateStyles:_r2({},o.e.nodeStateStyles)},shapeType:"rect",labelPosition:"center",drawShape:function drawShape(t,e){var n=this.getShapeStyle(t),r=e.addShape("rect",{attrs:n,className:"".concat(this.type,"-keyShape"),name:"".concat(this.type,"-keyShape"),draggable:!0});return this.drawLinkPoints(t,e),r;},drawLinkPoints:function drawLinkPoints(t,e){var n=this.getOptions(t).linkPoints,o=void 0===n?{}:n,a=o.top,s=o.left,c=o.right,u=o.bottom,h=o.size,l=o.r,f=i(o,["top","left","right","bottom","size","r"]),d=this.getSize(t),p=d[0],g=d[1];s&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:-p/2,y:0,r:h/2||l||5}),className:"link-point-left",name:"link-point-left",isAnchorPoint:!0}),c&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:p/2,y:0,r:h/2||l||5}),className:"link-point-right",name:"link-point-right",isAnchorPoint:!0}),a&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:0,y:-g/2,r:h/2||l||5}),className:"link-point-top",name:"link-point-top",isAnchorPoint:!0}),u&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:0,y:g/2,r:h/2||l||5}),className:"link-point-bottom",name:"link-point-bottom",isAnchorPoint:!0});},getShapeStyle:function getShapeStyle(t){var e=this.getOptions(t).style,n={stroke:t.color},i=Object(a.mix)({},e,n),o=this.getSize(t),s=i.width||o[0],c=i.height||o[1];return _r2({x:-s/2,y:-c/2,width:s,height:c},i);},update:function update(t,e){var n=e.getContainer(),r=this.getOptions({}).style,i=this.getSize(t),o=e.get("keyShape");t.size||(i[0]=o.attr("width")||r.width,i[1]=o.attr("height")||r.height);var s={stroke:t.color,x:-i[0]/2,y:-i[1]/2,width:i[0],height:i[1]},c=Object(a.mix)({},r,o.attr(),s);c=Object(a.mix)(c,t.style),this.updateShape(t,e,c,!1),this.updateLinkPoints(t,n);}},"single-node"),Object(o.l)("ellipse",{options:{size:[80,40],style:{x:0,y:0,stroke:o.e.defaultNode.style.stroke,fill:o.e.defaultNode.style.fill,lineWidth:o.e.defaultNode.style.lineWidth},labelCfg:{style:{fill:o.e.nodeLabel.style.fill,fontSize:o.e.nodeLabel.style.fontSize}},linkPoints:{top:!1,right:!1,bottom:!1,left:!1,size:o.e.defaultNode.linkPoints.size,lineWidth:o.e.defaultNode.linkPoints.lineWidth,fill:o.e.defaultNode.linkPoints.fill,stroke:o.e.defaultNode.linkPoints.stroke},icon:{show:!1,img:"https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg",width:20,height:20},stateStyles:_r2({},o.e.nodeStateStyles)},shapeType:"ellipse",labelPosition:"center",drawShape:function drawShape(t,e){var n=this.getOptions(t).icon,i=void 0===n?{}:n,o=this.getShapeStyle(t),a=e.addShape("ellipse",{attrs:o,className:"ellipse-keyShape",name:"ellipse-keyShape",draggable:!0}),s=i.width,c=i.height,u=i.show,h=i.text;return u&&(h?e.addShape("text",{attrs:_r2({x:0,y:0,fontSize:12,fill:"#000",stroke:"#000",textBaseline:"middle",textAlign:"center"},i),className:"".concat(this.type,"-icon"),name:"".concat(this.type,"-icon"),draggable:!0}):e.addShape("image",{attrs:_r2({x:-s/2,y:-c/2},i),className:"".concat(this.type,"-icon"),name:"".concat(this.type,"-icon"),draggable:!0})),this.drawLinkPoints(t,e),a;},drawLinkPoints:function drawLinkPoints(t,e){var n=this.getOptions(t).linkPoints,o=void 0===n?{}:n,a=o.top,s=o.left,c=o.right,u=o.bottom,h=o.size,l=o.r,f=i(o,["top","left","right","bottom","size","r"]),d=this.getSize(t),p=d[0]/2,g=d[1]/2;s&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:-p,y:0,r:h/2||l||5}),className:"link-point-left",name:"link-point-left",isAnchorPoint:!0}),c&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:p,y:0,r:h/2||l||5}),className:"link-point-right",name:"link-point-right",isAnchorPoint:!0}),a&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:0,y:-g,r:h/2||l||5}),className:"link-point-top",name:"link-point-top",isAnchorPoint:!0}),u&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:0,y:g,r:h/2||l||5}),className:"link-point-bottom",name:"link-point-bottom",isAnchorPoint:!0});},getShapeStyle:function getShapeStyle(t){var e=this.getOptions(t).style,n={stroke:t.color},i=Object(a.mix)({},e,n),o=this.getSize(t),s=o[0]/2,c=o[1]/2;return _r2({x:0,y:0,rx:s,ry:c},i);},update:function update(t,e){var n=e.getContainer(),r=this.getOptions({}).style,i=this.getSize(t),o={stroke:t.color,rx:i[0]/2,ry:i[1]/2},s=e.get("keyShape"),c=Object(a.mix)({},r,s.attr(),o);c=Object(a.mix)(c,t.style),this.updateShape(t,e,c,!0),this.updateLinkPoints(t,n);}},"single-node"),Object(o.l)("diamond",{options:{size:[80,80],style:{stroke:o.e.defaultNode.style.stroke,fill:o.e.defaultNode.style.fill,lineWidth:o.e.defaultNode.style.lineWidth},labelCfg:{style:{fill:o.e.nodeLabel.style.fill,fontSize:o.e.nodeLabel.style.fontSize}},linkPoints:{top:!1,right:!1,bottom:!1,left:!1,size:o.e.defaultNode.linkPoints.size,lineWidth:o.e.defaultNode.linkPoints.lineWidth,fill:o.e.defaultNode.linkPoints.fill,stroke:o.e.defaultNode.linkPoints.stroke},icon:{show:!1,img:"https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg",width:20,height:20},stateStyles:_r2({},o.e.nodeStateStyles)},shapeType:"diamond",labelPosition:"center",drawShape:function drawShape(t,e){var n=this.getOptions(t).icon,i=void 0===n?{}:n,o=this.getShapeStyle(t),a=e.addShape("path",{attrs:o,className:"".concat(this.type,"-keyShape"),name:"".concat(this.type,"-keyShape"),draggable:!0}),s=i.width,c=i.height,u=i.show,h=i.text;return u&&(h?e.addShape("text",{attrs:_r2({x:0,y:0,fontSize:12,fill:"#000",stroke:"#000",textBaseline:"middle",textAlign:"center"},i),className:"".concat(this.type,"-icon"),name:"".concat(this.type,"-icon"),draggable:!0}):e.addShape("image",{attrs:_r2({x:-s/2,y:-c/2},i),className:"".concat(this.type,"-icon"),name:"".concat(this.type,"-icon"),draggable:!0})),this.drawLinkPoints(t,e),a;},drawLinkPoints:function drawLinkPoints(t,e){var n=this.getOptions(t).linkPoints,o=void 0===n?{}:n,a=o.top,s=o.left,c=o.right,u=o.bottom,h=o.size,l=o.r,f=i(o,["top","left","right","bottom","size","r"]),d=this.getSize(t),p=d[0],g=d[1];s&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:-p/2,y:0,r:h/2||l||5}),className:"link-point-left",name:"link-point-left",isAnchorPoint:!0}),c&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:p/2,y:0,r:h/2||l||5}),className:"link-point-right",name:"link-point-right",isAnchorPoint:!0}),a&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:0,y:-g/2,r:h/2||l||5}),className:"link-point-top",name:"link-point-top",isAnchorPoint:!0}),u&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:0,y:g/2,r:h/2||l||5}),className:"link-point-bottom",name:"link-point-bottom",isAnchorPoint:!0});},getPath:function getPath(t){var e=this.getSize(t),n=e[0],r=e[1];return[["M",0,-r/2],["L",n/2,0],["L",0,r/2],["L",-n/2,0],["Z"]];},getShapeStyle:function getShapeStyle(t){var e=this.getOptions(t).style,n={stroke:t.color},i=Object(a.mix)({},e,n),o=this.getPath(t);return _r2({path:o},i);},update:function update(t,e){var n=e.getContainer(),r=this.getOptions({}).style,i=this.getPath(t),o={stroke:t.color,path:i},s=e.get("keyShape"),c=Object(a.mix)({},r,s.attr(),o);c=Object(a.mix)(c,t.style),this.updateShape(t,e,c,!0),this.updateLinkPoints(t,n);}},"single-node"),Object(o.l)("triangle",{options:{size:40,direction:"up",style:{stroke:o.e.defaultNode.style.stroke,fill:o.e.defaultNode.style.fill,lineWidth:o.e.defaultNode.style.lineWidth},labelCfg:{style:{fill:o.e.nodeLabel.style.fill,fontSize:o.e.nodeLabel.style.fontSize},offset:15},linkPoints:{top:!1,right:!1,bottom:!1,left:!1,size:o.e.defaultNode.linkPoints.size,lineWidth:o.e.defaultNode.linkPoints.lineWidth,fill:o.e.defaultNode.linkPoints.fill,stroke:o.e.defaultNode.linkPoints.stroke},icon:{show:!1,img:"https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg",width:20,height:20,offset:6},stateStyles:_r2({},o.e.nodeStateStyles)},shapeType:"triangle",labelPosition:"bottom",drawShape:function drawShape(t,e){var n=this.getOptions(t),i=n.icon,o=void 0===i?{}:i,a=n.direction,s=this.getShapeStyle(t),c=t.direction||a,u=e.addShape("path",{attrs:s,className:"".concat(this.type,"-keyShape"),name:"".concat(this.type,"-keyShape"),draggable:!0}),h=o.width,l=o.height,f=o.show,d=o.offset,p=o.text;if(f)if(p)e.addShape("text",{attrs:_r2({x:0,y:0,fontSize:12,fill:"#000",stroke:"#000",textBaseline:"middle",textAlign:"center"},o),className:"".concat(this.type,"-icon"),name:"".concat(this.type,"-icon"),draggable:!0});else{var g=-h/2,v=-l/2;"up"!==c&&"down"!==c||(v+=d),"left"!==c&&"right"!==c||(g+=d),e.addShape("image",{attrs:_r2({x:g,y:v},o),className:"".concat(this.type,"-icon"),name:"".concat(this.type,"-icon"),draggable:!0});}return this.drawLinkPoints(t,e),u;},drawLinkPoints:function drawLinkPoints(t,e){var n=this.getOptions(t),o=n.linkPoints,a=void 0===o?{}:o,s=n.direction,c=t.direction||s,u=a.top,h=a.left,l=a.right,f=a.bottom,d=a.size,p=a.r,g=i(a,["top","left","right","bottom","size","r"]),v=this.getSize(t)[0];if(h){var y=null,m=v*Math.sin(1/3*Math.PI),b=v*Math.sin(1/3*Math.PI);"up"===c?y=[-b,m]:"down"===c?y=[-b,-m]:"left"===c&&(y=[-b,b-m]),y&&e.addShape("circle",{attrs:_r2(_r2({},g),{x:y[0],y:y[1],r:d/2||p||5}),className:"link-point-left",name:"link-point-left"});}if(l){var x=null;m=v*Math.sin(1/3*Math.PI),b=v*Math.sin(1/3*Math.PI);"up"===c?x=[b,m]:"down"===c?x=[b,-m]:"right"===c&&(x=[b,b-m]),x&&e.addShape("circle",{attrs:_r2(_r2({},g),{x:x[0],y:x[1],r:d/2||p||5}),className:"link-point-right",name:"link-point-right"});}if(u){var w=null;m=v*Math.sin(1/3*Math.PI),b=v*Math.sin(1/3*Math.PI);"up"===c?w=[b-m,-m]:"left"===c?w=[b,-m]:"right"===c&&(w=[-b,-m]),w&&e.addShape("circle",{attrs:_r2(_r2({},g),{x:w[0],y:w[1],r:d/2||p||5}),className:"link-point-top",name:"link-point-top"});}if(f){var S=null;m=v*Math.sin(1/3*Math.PI),b=v*Math.sin(1/3*Math.PI);"down"===c?S=[-b+m,m]:"left"===c?S=[b,m]:"right"===c&&(S=[-b,m]),S&&e.addShape("circle",{attrs:_r2(_r2({},g),{x:S[0],y:S[1],r:d/2||p||5}),className:"link-point-bottom",name:"link-point-bottom"});}},getPath:function getPath(t){var e=this.getOptions(t).direction,n=t.direction||e,r=this.getSize(t)[0],i=r*Math.sin(1/3*Math.PI),o=r*Math.sin(1/3*Math.PI),a=[["M",-o,i],["L",0,-i],["L",o,i],["Z"]];return"down"===n?a=[["M",-o,-i],["L",o,-i],["L",0,i],["Z"]]:"left"===n?a=[["M",-o,o-i],["L",o,-o],["L",o,o],["Z"]]:"right"===n&&(a=[["M",o,o-i],["L",-o,o],["L",-o,-o],["Z"]]),a;},getShapeStyle:function getShapeStyle(t){var e=this.getOptions(t).style,n={stroke:t.color},i=Object(a.mix)({},e,n),o=this.getPath(t);return _r2({path:o},i);},update:function update(t,e){var n=e.getContainer(),r=this.getOptions({}).style,i=this.getPath(t),o={stroke:t.color,path:i},s=e.get("keyShape"),c=Object(a.mix)({},r,s.attr(),o);c=Object(a.mix)(c,t.style),this.updateShape(t,e,c,!0),this.updateLinkPoints(t,n);},updateLinkPoints:function updateLinkPoints(t,e){var n=this.getOptions({}),i=n.linkPoints,o=n.direction,s=t.direction||o,c=e.find(function(t){return"link-point-left"===t.get("className");}),u=e.find(function(t){return"link-point-right"===t.get("className");}),h=e.find(function(t){return"link-point-top"===t.get("className");}),l=e.find(function(t){return"link-point-bottom"===t.get("className");}),f=i,d=c||u||h||l;d&&(f=d.attr());var p=Object(a.mix)({},f,t.linkPoints),g=p.fill,v=p.stroke,y=p.lineWidth,m=p.size/2;m||(m=p.r);var b=t.linkPoints?t.linkPoints:{left:void 0,right:void 0,top:void 0,bottom:void 0},x=b.left,w=b.right,S=b.top,O=b.bottom,M=this.getSize(t)[0],k={r:m,fill:g,stroke:v,lineWidth:y},C=null,E=M*Math.sin(1/3*Math.PI),j=M*Math.sin(1/3*Math.PI);"up"===s?C=[-j,E]:"down"===s?C=[-j,-E]:"left"===s&&(C=[-j,j-E]),C&&(c?x||void 0===x?c.attr(_r2(_r2({},k),{x:C[0],y:C[1]})):c.remove():x&&e.addShape("circle",{attrs:_r2(_r2({},k),{x:C[0],y:C[1]}),className:"link-point-left",name:"link-point-left",isAnchorPoint:!0}));var P=null;"up"===s?P=[j,E]:"down"===s?P=[j,-E]:"right"===s&&(P=[j,j-E]),P&&(u?w||void 0===w?u.attr(_r2(_r2({},k),{x:P[0],y:P[1]})):u.remove():w&&e.addShape("circle",{attrs:_r2(_r2({},k),{x:P[0],y:P[1]}),className:"link-point-right",name:"link-point-right",isAnchorPoint:!0}));var A=null;"up"===s?A=[j-E,-E]:"left"===s?A=[j,-E]:"right"===s&&(A=[-j,-E]),A&&(h?S||void 0===S?h.attr(_r2(_r2({},k),{x:A[0],y:A[1]})):h.remove():S&&e.addShape("circle",{attrs:_r2(_r2({},k),{x:A[0],y:A[1]}),className:"link-point-top",name:"link-point-top",isAnchorPoint:!0}));var I=null;"down"===s?I=[-j+E,E]:"left"===s?I=[j,E]:"right"===s&&(I=[-j,E]),I&&(l?O||void 0===O?l.attr(_r2(_r2({},k),{x:I[0],y:I[1]})):l.remove():O&&e.addShape("circle",{attrs:_r2(_r2({},k),{x:I[0],y:I[1]}),className:"link-point-bottom",name:"link-point-bottom",isAnchorPoint:!0}));}},"single-node"),Object(o.l)("modelRect",{options:{size:[185,70],style:{radius:5,stroke:"#69c0ff",fill:"#ffffff",lineWidth:o.e.defaultNode.style.lineWidth,fillOpacity:1},labelCfg:{style:{fill:"#595959",fontSize:14},offset:30},descriptionCfg:{style:{fontSize:12,fill:"#bfbfbf"},paddingTop:0},preRect:{show:!0,width:4,fill:"#40a9ff",radius:2},linkPoints:{top:!1,right:!1,bottom:!1,left:!1,size:10,lineWidth:1,fill:"#72CC4A",stroke:"#72CC4A"},logoIcon:{show:!0,x:0,y:0,img:"https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg",width:16,height:16,offset:0},stateIcon:{show:!0,x:0,y:0,img:"https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg",width:16,height:16,offset:-5},anchorPoints:[[0,0.5],[1,0.5]]},shapeType:"modelRect",drawShape:function drawShape(t,e){var n=this.getOptions(t).preRect,o=void 0===n?{}:n,a=this.getShapeStyle(t),s=this.getSize(t),c=s[0],u=s[1],h=e.addShape("rect",{attrs:a,className:"".concat(this.type,"-keyShape"),name:"".concat(this.type,"-keyShape"),draggable:!0}),l=o.show,f=i(o,["show"]);return l&&e.addShape("rect",{attrs:_r2({x:-c/2,y:-u/2,height:u},f),className:"pre-rect",name:"pre-rect",draggable:!0}),this.drawLogoIcon(t,e),this.drawStateIcon(t,e),this.drawLinkPoints(t,e),h;},drawLogoIcon:function drawLogoIcon(t,e){var n=this.getOptions(t).logoIcon,o=void 0===n?{}:n,a=this.getSize(t)[0];if(o.show){var s=o.width,c=o.height,u=o.x,h=o.y,l=o.offset,f=o.text,d=i(o,["width","height","x","y","offset","text"]);f?e.addShape("text",{attrs:_r2({x:0,y:0,fontSize:12,fill:"#000",stroke:"#000",textBaseline:"middle",textAlign:"center"},d),className:"rect-logo-icon",name:"rect-logo-icon",draggable:!0}):e.addShape("image",{attrs:_r2(_r2({},d),{x:u||-a/2+s+l,y:h||-c/2,width:s,height:c}),className:"rect-logo-icon",name:"rect-logo-icon",draggable:!0});}},drawStateIcon:function drawStateIcon(t,e){var n=this.getOptions(t).stateIcon,o=void 0===n?{}:n,a=this.getSize(t)[0];if(o.show){var s=o.width,c=o.height,u=o.x,h=o.y,l=o.offset,f=o.text,d=i(o,["width","height","x","y","offset","text"]);f?e.addShape("text",{attrs:_r2({x:0,y:0,fontSize:12,fill:"#000",stroke:"#000",textBaseline:"middle",textAlign:"center"},d),className:"rect-state-icon",name:"rect-state-icon",draggable:!0}):e.addShape("image",{attrs:_r2(_r2({},d),{x:u||a/2-s+l,y:h||-c/2,width:s,height:c}),className:"rect-state-icon",name:"rect-state-icon",draggable:!0});}},drawLinkPoints:function drawLinkPoints(t,e){var n=this.getOptions(t).linkPoints,o=void 0===n?{}:n,a=o.top,s=o.left,c=o.right,u=o.bottom,h=o.size,l=o.r,f=i(o,["top","left","right","bottom","size","r"]),d=this.getSize(t),p=d[0],g=d[1];s&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:-p/2,y:0,r:h/2||l||5}),className:"link-point-left",name:"link-point-left",isAnchorPoint:!0}),c&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:p/2,y:0,r:h/2||l||5}),className:"link-point-right",name:"link-point-right",isAnchorPoint:!0}),a&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:0,y:-g/2,r:h/2||l||5}),className:"link-point-top",name:"link-point-top",isAnchorPoint:!0}),u&&e.addShape("circle",{attrs:_r2(_r2({},f),{x:0,y:g/2,r:h/2||l||5}),className:"link-point-bottom",name:"link-point-bottom",isAnchorPoint:!0});},drawLabel:function drawLabel(t,e){var n=this.getOptions(t),i=n.labelCfg,o=void 0===i?{}:i,s=n.logoIcon,c=void 0===s?{}:s,u=n.descriptionCfg,h=void 0===u?{}:u,l=this.getSize(t)[0],f=null,d=c.show,p=c.width,g=-l/2+o.offset;d&&(g=-l/2+p+o.offset);var v=o.style,y=h.style,m=h.paddingTop;return Object(a.isString)(t.description)?(f=e.addShape("text",{attrs:_r2(_r2({},v),{x:g,y:-5,text:t.label}),className:"text-shape",name:"text-shape",draggable:!0}),e.addShape("text",{attrs:_r2(_r2({},y),{x:g,y:17+(m||0),text:t.description}),className:"rect-description",name:"rect-description",draggable:!0})):f=e.addShape("text",{attrs:_r2(_r2({},v),{x:g,y:7,text:t.label}),className:"text-shape",name:"text-shape",draggable:!0}),f;},getShapeStyle:function getShapeStyle(t){var e=this.getOptions(t).style,n={stroke:t.color},i=Object(a.mix)({},e,n),o=this.getSize(t),s=i.width||o[0],c=i.height||o[1];return _r2({x:-s/2,y:-c/2,width:s,height:c},i);},update:function update(t,e){var n=this.getOptions(t),o=n.style,s=void 0===o?{}:o,c=n.labelCfg,u=void 0===c?{}:c,h=n.descriptionCfg,l=void 0===h?{}:h,f=this.getSize(t),d=f[0],p=f[1];e.get("keyShape").attr(_r2(_r2({},s),{x:-d/2,y:-p/2,width:d,height:p}));var g=e.getContainer(),v=g.find(function(t){return"rect-logo-icon"===t.get("className");}),y=v?v.attr():{},m=Object(a.mix)({},y,t.logoIcon),b=m.width;void 0===b&&(b=this.options.logoIcon.width);var x=t.logoIcon?t.logoIcon.show:void 0,w=u.offset,S=-d/2+b+w;x||void 0===x||(S=-d/2+w);var O=g.find(function(t){return"node-label"===t.get("className");}),M=g.find(function(t){return"rect-description"===t.get("className");});if(t.label)if(O){var k=t.labelCfg?t.labelCfg.style:{},C=Object(a.mix)({},O.attr(),k);t.label&&(C.text=t.label),C.x=S,Object(a.isString)(t.description)&&(C.y=-5),M&&(M.resetMatrix(),M.attr({x:S})),O.resetMatrix(),O.attr(C);}else g.addShape("text",{attrs:_r2(_r2({},u.style),{x:S,y:t.description?-5:7,text:t.label}),className:"node-label",name:"node-label",draggable:!0});if(Object(a.isString)(t.description)){var E=l.paddingTop;if(M){k=t.descriptionCfg?t.descriptionCfg.style:{};var j=Object(a.mix)({},M.attr(),k);Object(a.isString)(t.description)&&(j.text=t.description),j.x=S,M.resetMatrix(),M.attr(_r2(_r2({},j),{y:17+(E||0)}));}else g.addShape("text",{attrs:_r2(_r2({},l.style),{x:S,y:17+(E||0),text:t.description}),className:"rect-description",name:"rect-description",draggable:!0});}var P=g.find(function(t){return"pre-rect"===t.get("className");});if(P){var A=Object(a.mix)({},P.attr(),t.preRect);P.attr(_r2(_r2({},A),{x:-d/2,y:-p/2,height:p}));}if(v){if(x||void 0===x){var I=m.width,T=m.height,N=m.x,B=m.y,L=m.offset,D=i(m,["width","height","x","y","offset"]);v.attr(_r2(_r2({},D),{x:N||-d/2+I+L,y:B||-T/2,width:I,height:T}));}else v.remove();}else x&&this.drawLogoIcon(t,g);var _=g.find(function(t){return"rect-state-icon"===t.get("className");}),R=_?_.attr():{},F=Object(a.mix)({},R,t.stateIcon);if(_){F.show||void 0===F.show||_.remove();var Y=F.width,X=(T=F.height,N=F.x,B=F.y,F.offset),z=i(F,["width","height","x","y","offset"]);_.attr(_r2(_r2({},z),{x:N||d/2-Y+X,y:B||-T/2,width:Y,height:T}));}else F.show&&this.drawStateIcon(t,g);this.updateLinkPoints(t,g);}},"single-node"),Object(o.l)("star",{options:{size:60,style:{stroke:o.e.defaultNode.style.stroke,fill:o.e.defaultNode.style.fill,lineWidth:o.e.defaultNode.style.lineWidth},labelCfg:{style:{fill:o.e.nodeLabel.style.fill,fontSize:o.e.nodeLabel.style.fontSize}},linkPoints:{top:!1,right:!1,bottom:!1,left:!1,size:o.e.defaultNode.linkPoints.size,lineWidth:o.e.defaultNode.linkPoints.lineWidth,fill:o.e.defaultNode.linkPoints.fill,stroke:o.e.defaultNode.linkPoints.stroke},icon:{show:!1,img:"https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg",width:20,height:20},stateStyles:_r2({},o.e.nodeStateStyles)},shapeType:"star",labelPosition:"center",drawShape:function drawShape(t,e){var n=this.getOptions(t).icon,i=void 0===n?{}:n,o=this.getShapeStyle(t),a=e.addShape("path",{attrs:o,className:"".concat(this.type,"-keyShape"),name:"".concat(this.type,"-keyShape"),draggable:!0}),s=i.width,c=i.height,u=i.show,h=i.text;return u&&(h?e.addShape("text",{attrs:_r2({x:0,y:0,fontSize:12,fill:"#000",stroke:"#000",textBaseline:"middle",textAlign:"center"},i),className:"".concat(this.type,"-icon"),name:"".concat(this.type,"-icon"),draggable:!0}):e.addShape("image",{attrs:_r2({x:-s/2,y:-c/2},i),className:"".concat(this.type,"-icon"),name:"".concat(this.type,"-icon"),draggable:!0})),this.drawLinkPoints(t,e),a;},drawLinkPoints:function drawLinkPoints(t,e){var n=this.getOptions(t).linkPoints,o=void 0===n?{}:n,a=o.top,s=o.left,c=o.right,u=o.leftBottom,h=o.rightBottom,l=o.size,f=o.r,d=i(o,["top","left","right","leftBottom","rightBottom","size","r"]),p=this.getSize(t)[0];if(c){var g=Math.cos(0.1*Math.PI)*p,v=Math.sin(0.1*Math.PI)*p;e.addShape("circle",{attrs:_r2(_r2({},d),{x:g,y:-v,r:l/2||f||5}),className:"link-point-right",name:"link-point-right"});}if(a){g=Math.cos(0.5*Math.PI)*p,v=Math.sin(0.5*Math.PI)*p;e.addShape("circle",{attrs:_r2(_r2({},d),{x:g,y:-v,r:l/2||f||5}),className:"link-point-top",name:"link-point-top"});}if(s){g=Math.cos(0.9*Math.PI)*p,v=Math.sin(0.9*Math.PI)*p;e.addShape("circle",{attrs:_r2(_r2({},d),{x:g,y:-v,r:l/2||f||5}),className:"link-point-left",name:"link-point-left"});}if(u){g=Math.cos(1.3*Math.PI)*p,v=Math.sin(1.3*Math.PI)*p;e.addShape("circle",{attrs:_r2(_r2({},d),{x:g,y:-v,r:l/2||f||5}),className:"link-point-left-bottom",name:"link-point-left-bottom"});}if(h){g=Math.cos(1.7*Math.PI)*p,v=Math.sin(1.7*Math.PI)*p;e.addShape("circle",{attrs:_r2(_r2({},d),{x:g,y:-v,r:l/2||f||5}),className:"link-point-right-bottom",name:"link-point-right-bottom"});}},getPath:function getPath(t){for(var e=this.getSize(t)[0],n=3*e/8,r=t.innerR||n,i=[],o=0;o<5;o++){var a=Math.cos((18+72*o)/180*Math.PI)*e,s=Math.sin((18+72*o)/180*Math.PI)*e,c=Math.cos((54+72*o)/180*Math.PI)*r,u=Math.sin((54+72*o)/180*Math.PI)*r;0===o?i.push(["M",a,-s]):i.push(["L",a,-s]),i.push(["L",c,-u]);}return i.push(["Z"]),i;},getShapeStyle:function getShapeStyle(t){var e=this.getOptions(t).style,n={stroke:t.color},i=Object(a.mix)({},e,n),o=this.getPath(t);return _r2({path:o},i);},update:function update(t,e){var n=e.getContainer(),r=this.getOptions({}).style,i=this.getPath(t),o={stroke:t.color,path:i},s=e.get("keyShape"),c=Object(a.mix)({},r,s.attr(),o);c=Object(a.mix)(c,t.style),this.updateShape(t,e,c,!0),this.updateLinkPoints(t,n);},updateLinkPoints:function updateLinkPoints(t,e){var n=this.getOptions({}).linkPoints,i=e.find(function(t){return"link-point-left"===t.get("className");}),o=e.find(function(t){return"link-point-right"===t.get("className");}),s=e.find(function(t){return"link-point-top"===t.get("className");}),c=e.find(function(t){return"link-point-left-bottom"===t.get("className");}),u=e.find(function(t){return"link-point-right-bottom"===t.get("className");}),h=n,l=i||o||s||c||u;l&&(h=l.attr());var f=Object(a.mix)({},h,t.linkPoints),d=f.fill,p=f.stroke,g=f.lineWidth,v=f.size/2;v||(v=f.r);var y=t.linkPoints?t.linkPoints:{left:void 0,right:void 0,top:void 0,leftBottom:void 0,rightBottom:void 0},m=y.left,b=y.right,x=y.top,w=y.leftBottom,S=y.rightBottom,O=this.getSize(t)[0],M={r:v,fill:d,stroke:p,lineWidth:g},k=Math.cos(0.1*Math.PI)*O,C=Math.sin(0.1*Math.PI)*O;o?b||void 0===b?o.attr(_r2(_r2({},M),{x:k,y:-C})):o.remove():b&&e.addShape("circle",{attrs:_r2(_r2({},M),{x:k,y:-C}),className:"link-point-right",name:"link-point-right",isAnchorPoint:!0}),k=Math.cos(0.5*Math.PI)*O,C=Math.sin(0.5*Math.PI)*O,s?x||void 0===x?s.attr(_r2(_r2({},M),{x:k,y:-C})):s.remove():x&&e.addShape("circle",{attrs:_r2(_r2({},M),{x:k,y:-C}),className:"link-point-top",name:"link-point-top",isAnchorPoint:!0}),k=Math.cos(0.9*Math.PI)*O,C=Math.sin(0.9*Math.PI)*O,i?m||void 0===m?i.attr(_r2(_r2({},M),{x:k,y:-C})):i.remove():m&&e.addShape("circle",{attrs:_r2(_r2({},M),{x:k,y:-C}),className:"link-point-left",name:"link-point-left",isAnchorPoint:!0}),k=Math.cos(1.3*Math.PI)*O,C=Math.sin(1.3*Math.PI)*O,c?w||void 0===w?c.attr(_r2(_r2({},M),{x:k,y:-C})):c.remove():w&&e.addShape("circle",{attrs:_r2(_r2({},M),{x:k,y:-C}),className:"link-point-left-bottom",name:"link-point-left-bottom",isAnchorPoint:!0}),k=Math.cos(1.7*Math.PI)*O,C=Math.sin(1.7*Math.PI)*O,u?S||void 0===S?u.attr(_r2(_r2({},M),{x:k,y:-C})):c.remove():S&&e.addShape("circle",{attrs:_r2(_r2({},M),{x:k,y:-C}),className:"link-point-right-bottom",name:"link-point-right-bottom",isAnchorPoint:!0});}},"single-node");var s=o.h.defaultSubjectColors;Object(o.l)("donut",{options:{size:o.e.defaultNode.size,style:{x:0,y:0,stroke:o.e.defaultNode.style.stroke,fill:o.e.defaultNode.style.fill,lineWidth:o.e.defaultNode.style.lineWidth},labelCfg:{style:{fill:o.e.nodeLabel.style.fill,fontSize:o.e.nodeLabel.style.fontSize}},linkPoints:{top:!1,right:!1,bottom:!1,left:!1,size:o.e.defaultNode.linkPoints.size,lineWidth:o.e.defaultNode.linkPoints.lineWidth,fill:o.e.defaultNode.linkPoints.fill,stroke:o.e.defaultNode.linkPoints.stroke},icon:{show:!1,img:"https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg",width:20,height:20},stateStyles:_r2({},o.e.nodeStateStyles)},shapeType:"circle",labelPosition:"center",drawShape:function drawShape(t,e){var n=this.getOptions(t).icon,i=void 0===n?{}:n,o=this.getShapeStyle(t),c=Object(a.deepMix)({},i,t.icon),u=e.addShape("circle",{attrs:o,className:"".concat(this.type,"-keyShape"),draggable:!0,name:"".concat(this.type,"-keyShape")}),h=c.width,l=c.height,f=c.show,d=c.text;f&&(d?e.addShape("text",{attrs:_r2({x:0,y:0,fontSize:12,fill:"#000",stroke:"#000",textBaseline:"middle",textAlign:"center"},c),className:"".concat(this.type,"-icon"),name:"".concat(this.type,"-icon"),draggable:!0}):e.addShape("image",{attrs:_r2({x:-h/2,y:-l/2},c),className:"".concat(this.type,"-icon"),name:"".concat(this.type,"-icon"),draggable:!0}));var p=u.attr("r"),g=0.6*p,v=(p+g)/2,y=t,m=y.donutAttrs,b=void 0===m?{}:m,x=y.donutColorMap,w=void 0===x?{}:x,S=Object.keys(b).length;if(b&&S>1){var O=[],M=0;if(Object.keys(b).forEach(function(t){var e=b[t]||0;Object(a.isNumber)(e)&&(O.push({key:t,value:e,color:w[t]}),M+=e);}),M){var k=p-g;if(1===S)return void e.addShape("circle",{attrs:{r:v,x:0,y:0,stroke:O[0].color||s[0],lineWidth:k},name:"fan-shape-0"});var C=[v,0],E=0;O.forEach(function(t,n){var r=t.value/M;if(!(r<0.001))if(r>0.999&&(r=1),1!==r){t.percent=r,t.angle=r*Math.PI*2,t.beginAgnle=E,E+=t.angle,t.endAngle=E,t.arcBegin=C,t.arcEnd=[v*Math.cos(t.endAngle),-v*Math.sin(t.endAngle)];var i=t.angle>Math.PI?1:0,o=[["M",t.arcBegin[0],t.arcBegin[1]],["A",v,v,0,i,0,t.arcEnd[0],t.arcEnd[1]],["L",t.arcEnd[0],t.arcEnd[1]]];e.addShape("path",{attrs:{path:o,lineWidth:k,stroke:t.color||s[n%s.length]},name:"fan-shape-".concat(n)}),C=t.arcEnd;}else e.addShape("circle",{attrs:{r:v,x:0,y:0,stroke:t.color||s[n%s.length],lineWidth:k},name:"fan-shape-".concat(n)});});}}return this.drawLinkPoints(t,e),u;},update:void 0},"circle");var c=function c(t){var e=t.x,n=t.y;return{x:e,y:n,centerX:e,centerY:n,minX:e,minY:n,maxX:e,maxY:n,height:0,width:0};},u=function u(t){for(var e=[],n={},r=t.length-1;r>=0;r--){var i=t[r];i.id="".concat(i.x,"|||").concat(i.y),n[i.id]=i,e.push(i);}return e;},h=function h(t){return u(t);},l=function l(t,e){return t.width||t.height?{centerX:t.centerX,centerY:t.centerY,minX:t.minX-e,minY:t.minY-e,maxX:t.maxX+e,maxY:t.maxY+e,height:t.height+2*e,width:t.width+2*e}:t;},f=function f(t,e,n){var r=function(t,e){var n=Math.abs(t.x-e.centerX),r=Math.abs(t.y-e.centerY);return 0===n&&0===r?0:n/e.width>r/e.height;}(e,t);if(0===r){var i=t.centerX,o=t.centerY;return n.y<e.y?o=t.minY:n.x>e.x?i=t.maxX:n.x<e.x?i=t.minX:n.x===e.x&&(o=t.maxY),{x:i,y:o};}return r?{x:e.x>t.centerX?t.maxX:t.minX,y:e.y}:{x:e.x,y:e.y>t.centerY?t.maxY:t.minY};},d=function d(t,e){var n=Math.min(t.minX,e.minX),r=Math.min(t.minY,e.minY),i=Math.max(t.maxX,e.maxX),o=Math.max(t.maxY,e.maxY);return{centerX:(n+i)/2,centerY:(r+o)/2,minX:n,minY:r,maxX:i,maxY:o,height:o-r,width:i-n};},p=function p(t){return[{x:t.minX,y:t.minY},{x:t.maxX,y:t.minY},{x:t.maxX,y:t.maxY},{x:t.minX,y:t.maxY}];},g=function g(t,e){var n=t.x,r=t.y;return n<e.minX||n>e.maxX||r<e.minY||r>e.maxY;},v=function v(t,e){return Math.abs(t.x-e.x)+Math.abs(t.y-e.y);},y=function y(t,e,n,r,i){return v(t,e)+v(t,n)+function(t,e){var n=0;return e.forEach(function(e){e&&(t.x===e.x&&(n+=-2),t.y===e.y&&(n+=-2));}),n;}(t,[e,n,r,i]);},m=function t(e,n,r,i,o){void 0===o&&(o=0),e.unshift(n[i]),r[i]&&r[i]!==i&&o<=100&&t(e,n,r,r[i],o+1);},b=function b(t,e,n,r){var i=n.x-t.x,o=n.y-t.y,a=r.x-t.x,s=r.y-t.y,c=n.x-e.x,u=n.y-e.y,h=r.x-e.x,l=r.y-e.y;return(i*s-o*a)*(c*l-u*h)<=0&&(i*u-o*c)*(a*l-s*h)<=0;},x=function x(t,e,n){if(n.width||n.height){var r=p(n),i=r[0],o=r[1],a=r[2],s=r[3];return b(t,e,i,o)||b(t,e,i,s)||b(t,e,o,a)||b(t,e,a,s);}return!1;},w=function w(t,e,n,r){var i=[];return t.forEach(function(t){if(t!==e&&(t.x===e.x||t.y===e.y)){if(x(t,e,n)||x(t,e,r))return;i.push(t);}}),u(i);},S=function S(t,e){var n=[],r=t[0];return n.push("M".concat(r.x," ").concat(r.y)),t.forEach(function(r,i){var o=t[i+1],a=t[i+2];if(o&&a){if(function(t,e,n){return!(t.x===e.x&&e.x===n.x||t.y===e.y&&e.y===n.y);}(r,o,a)){var s=function(t,e,n,r){var i=v(t,e),o=v(n,e);return i<r&&(r=i),o<r&&(r=o),[{x:e.x-r/i*(e.x-t.x),y:e.y-r/i*(e.y-t.y)},{x:e.x-r/o*(e.x-n.x),y:e.y-r/o*(e.y-n.y)}];}(r,o,a,e),c=s[0],u=s[1];n.push("L".concat(c.x," ").concat(c.y)),n.push("Q".concat(o.x," ").concat(o.y," ").concat(u.x," ").concat(u.y)),n.push("L".concat(u.x," ").concat(u.y));}else n.push("L".concat(o.x," ").concat(o.y));}else o&&n.push("L".concat(o.x," ").concat(o.y));}),n.join("");},O=function O(t,e,n,r,i){var o,a;if(n&&n.getType()){if("combo"===n.getType()){(o=n.getKeyShape().getCanvasBBox()||c(t)).centerX=(o.minX+o.maxX)/2,o.centerY=(o.minY+o.maxY)/2;}else o=n.getBBox();}else o=c(t);if(r&&r.getType()){if("combo"===r.getType()){var s=r.getKeyShape().getBBox();if(s){var b=r.getModel(),x=b.x,S=b.y;(a={x:x,y:S,width:s.width,height:s.height,minX:s.minX+x,maxX:s.maxX+x,minY:s.minY+S,maxY:s.maxY+S}).centerX=(a.minX+a.maxX)/2,a.centerY=(a.minY+a.maxY)/2;}else a=c(e);}else a=r&&r.getBBox();}else a=c(e);var O=l(o,i),M=l(a,i),k=f(O,t,e),C=f(M,e,t),E=function(t){void 0===t&&(t=[]);var e=[],n=[];t.forEach(function(t){e.push(t.x),n.push(t.y);});var r=Math.min.apply(Math,e),i=Math.max.apply(Math,e),o=Math.min.apply(Math,n),a=Math.max.apply(Math,n);return{centerX:(r+i)/2,centerY:(o+a)/2,maxX:i,maxY:a,minX:r,minY:o,height:a-o,width:i-r};}([k,C]),j=d(O,E),P=d(M,E),A=[];A=A.concat(p(j)).concat(p(P));var I={x:(t.x+e.x)/2,y:(t.y+e.y)/2};[E,j,P].forEach(function(t){A=A.concat(function(t,e){return function(t,e){return e<t.minX||e>t.maxX?[]:[{x:e,y:t.minY},{x:e,y:t.maxY}];}(t,e.x).concat(function(t,e){return e<t.minY||e>t.maxY?[]:[{x:t.minX,y:e},{x:t.maxX,y:e}];}(t,e.y));}(t,I).filter(function(t){return g(t,O)&&g(t,M);}));}),[{x:k.x,y:C.y},{x:C.x,y:k.y}].forEach(function(t){g(t,O)&&g(t,M)&&A.push(t);}),A.unshift(k),A.push(C);var T=function(t,e,n,r,i,o,a){var s=[],c=[e],u={},h={},l={};h[e.id]=0,l[e.id]=y(e,n,e);var f,d,p,g,b,x={};for(t.forEach(function(t){x[t.id]=t;});c.length;){if(f=void 0,d=1/0,c.forEach(function(t){l[t.id]<=d&&(d=l[t.id],f=t);}),f===n){var S=[];return m(S,x,u,n.id),S;}g=f,b=void 0,(b=(p=c).indexOf(g))>-1&&p.splice(b,1),s.push(f),w(t,f,r,i).forEach(function(t){if(-1===s.indexOf(t)){-1===c.indexOf(t)&&c.push(t);var r=l[f.id]+v(f,t);h[t.id]&&r>=h[t.id]||(u[t.id]=f.id,h[t.id]=r,l[t.id]=h[t.id]+y(t,n,e,o,a));}});}return[e,n];}(A=u(A),k,C,o,a,t,e);return T.unshift(t),T.push(e),h(T);},M={offset:20,maxAllowedDirectionChange:Math.PI/2,maximumLoops:2e3,gridSize:10,directions:[{stepX:1,stepY:0},{stepX:-1,stepY:0},{stepX:0,stepY:1},{stepX:0,stepY:-1}],get penalties(){return{0:0,45:this.gridSize/2,90:this.gridSize/2};},distFunc:function distFunc(t,e){return Math.abs(t.x-e.x)+Math.abs(t.y-e.y);},fallbackRoute:function fallbackRoute(t,e,n,r,i){return h(O(t,e,n,r,i.offset));}},k=(Math.PI,function(t,e){var n=Math.round(Math.abs(t/e));return n<0?0:(t<0?-1:1)*n;}),C=function C(t,e){var n=e.x-t.x,r=e.y-t.y;return n||r?Math.atan2(r,n):0;},E=function E(t,e){var n=Math.abs(t-e);return n>Math.PI?2*Math.PI-n:n;},j=function j(t,e,n){for(var r=1/0,i=0,o=e.length;i<o;i++){var a=n(t,e[i]);a<r&&(r=a);}return r;},P=function P(t,e,n,r,i){var a=[];if(!n)return[t];var s=i.directions,c=i.offset,u=n.getBBox(),h=e.x>u.minX&&e.x<u.maxX&&e.y>u.minY&&e.y<u.maxY,d=l(u,c);for(var p in d){d[p]=k(d[p],i.gridSize);}if(h){for(var g=0,v=s;g<v.length;g++){var y=v[g],m=[[{x:d.minX,y:d.minY},{x:d.maxX,y:d.minY}],[{x:d.minX,y:d.minY},{x:d.minX,y:d.maxY}],[{x:d.maxX,y:d.minY},{x:d.maxX,y:d.maxY}],[{x:d.minX,y:d.maxY},{x:d.maxX,y:d.maxY}]];for(p=0;p<4;p++){var b=m[p],w=o.h.getLineIntersect(t,{x:t.x+y.stepX*d.width,y:t.y+y.stepY*d.height},b[0],b[1]);w&&!x(t,w,u)&&(w.id="".concat(w.x,"|||").concat(w.y),a.push(w));}}return a;}var S=f(d,t,r);return S.id="".concat(S.x,"|||").concat(S.y),[S];},A=function A(t,e,n,r){var i=C(t,e);if(!n[t.id]){var o=C(r,t);return E(o,i);}var a=C({x:n[t.id].x,y:n[t.id].y},t);return E(a,i);},I=function I(t,e,n,r,i,o,a){var s=[r],c=t.id,u=t.x,h=t.y,l={x:u,y:h,id:c};for(A(l,o,e,n)&&s.unshift({x:o.x===r.x?r.x:l.x*a,y:o.y===r.y?r.y:l.y*a});e[c]&&e[c].id!==c;){var f={x:u,y:h,id:c},d=e[c].id,p=e[c].x,g=e[c].y,v={x:p,y:g,id:d};A(v,f,e,n)&&s.unshift({x:v.x===f.x?s[0].x:v.x*a,y:v.y===f.y?s[0].y:v.y*a}),c=d,u=p,h=g;}var y=u,m=h;return s[0].x=y===n.x?i.x:s[0].x,s[0].y=m===n.y?i.y:s[0].y,s.unshift(i),s;},T=function T(t,e,n,r,i){if(isNaN(t.x)||isNaN(e.x))return[];var o=Object(a.deepMix)(M,i);o.obstacles=o.obstacles||[];var s=o.gridSize,c=function(t,e,n){var r={};return t.forEach(function(t){if(t)for(var i=l(t.getBBox(),n),o=k(i.minX,e);o<=k(i.maxX,e);o+=1){for(var a=k(i.minY,e);a<=k(i.maxY,e);a+=1){r["".concat(o,"|||").concat(a)]=!0;}}}),r;}(o.obstacles.concat([n,r]),s,o.offset),u={x:k(t.x,s),y:k(t.y,s)},h={x:k(e.x,s),y:k(e.y,s)};t.id="".concat(u.x,"|||").concat(u.y),e.id="".concat(h.x,"|||").concat(h.y);var f=P(u,t,n,h,o),d=P(h,e,r,u,o);f.forEach(function(t){delete c[t.id];}),d.forEach(function(t){delete c[t.id];});for(var p={},g={},v={},y={},m={},b=0;b<f.length;b++){var x=f[b];p[x.id]=x,y[x.id]=0,m[x.id]=j(x,d,o.distFunc);}for(var w,S,O,C,E,T,N,B=o.maximumLoops,L=o.penalties;Object.keys(p).length>0&&B>0&&(w=void 0,S=1/0,Object.keys(p).forEach(function(t){var e=p[t].id;m[e]<=S&&(S=m[e],w=p[e]);}),w);){if(d.findIndex(function(t){return t.x===w.x&&t.y===w.y;})>-1)return I(w,v,u,e,t,h,s);delete p[w.id],g[w.id]=!0;for(b=0;b<o.directions.length;b++){O=o.directions[b],g[(C={x:w.x+O.stepX,y:w.y+O.stepY,id:"".concat(Math.round(w.x)+O.stepX,"|||").concat(Math.round(w.y)+O.stepY)}).id]||(N=A(w,C,v,u))>o.maxAllowedDirectionChange||c[C.id]||(p[C.id]||(p[C.id]=C),E=o.distFunc(w,C)+(isNaN(L[N])?s:L[N]),T=y[w.id]+E,y[C.id]&&T>=y[C.id]||(v[C.id]=w,y[C.id]=T,m[C.id]=T+j(C,d,o.distFunc)));}B-=1;}return o.fallbackRoute(t,e,n,r,o);};Object(o.k)("polyline",{options:{color:o.e.defaultEdge.color,size:o.e.defaultEdge.size,style:{radius:0,offset:15,x:0,y:0,stroke:o.e.defaultEdge.style.stroke,lineAppendWidth:o.e.defaultEdge.style.lineAppendWidth},labelCfg:{style:{fill:o.e.edgeLabel.style.fill,fontSize:o.e.edgeLabel.style.fontSize}},routeCfg:{obstacles:[],maxAllowedDirectionChange:Math.PI,maximumLoops:500,gridSize:10},stateStyles:_r2({},o.e.edgeStateStyles)},shapeType:"polyline",labelPosition:"center",drawShape:function drawShape(t,e){var n=this.getShapeStyle(t);return 0===n.radius&&delete n.radius,e.addShape("path",{className:"edge-shape",name:"edge-shape",attrs:n});},getShapeStyle:function getShapeStyle(t){var e=this.options.style,n={stroke:t.color},r=Object(a.mix)({},e,n,t.style);t=this.getPathPoints(t),this.radius=r.radius,this.offset=r.offset;var i=t.startPoint,s=t.endPoint,c=this.getControlPoints(t),u=[i];c&&(u=u.concat(c)),u.push(s);var h=t.sourceNode,l=t.targetNode,f=r.radius,d=this.options.routeCfg,p=Object(a.mix)({},d,t.routeCfg);p.offset=r.offset;var g=this.getPath(u,h,l,f,p);return(Object(a.isArray)(g)&&g.length<=1||Object(a.isString)(g)&&-1===g.indexOf("L"))&&(g="M0 0, L0 0"),(isNaN(i.x)||isNaN(i.y)||isNaN(s.x)||isNaN(s.y))&&(g="M0 0, L0 0"),Object(a.mix)({},o.e.defaultEdge.style,r,{lineWidth:t.size,path:g});},updateShapeStyle:function updateShapeStyle(t,e){var n=e.getContainer();if(e.isVisible()){var r={stroke:t.color},i=n.find(function(t){return"edge-shape"===t.get("className");})||e.getKeyShape(),o=t.size,s=(t=this.getPathPoints(t)).startPoint,c=t.endPoint,u=this.getControlPoints(t),h=[s];u&&(h=h.concat(u)),h.push(c);var l=i.attr(),f=Object(a.mix)({},r,l,t.style),d=t.sourceNode,p=t.targetNode,g=f.radius,v=this.options.routeCfg,y=Object(a.mix)({},v,t.routeCfg);y.offset=f.offset;var m=this.getPath(h,d,p,g,y);(Object(a.isArray)(m)&&m.length<=1||Object(a.isString)(m)&&-1===m.indexOf("L"))&&(m="M0 0, L0 0"),(isNaN(s.x)||isNaN(s.y)||isNaN(c.x)||isNaN(c.y))&&(m="M0 0, L0 0"),l.endArrow&&!1===f.endArrow&&(t.style.endArrow={path:""}),l.startArrow&&!1===f.startArrow&&(t.style.startArrow={path:""});var b=Object(a.mix)(r,i.attr(),{lineWidth:o,path:m},t.style);i&&i.attr(b);}},getPath:function getPath(t,e,n,r,i){var s=i.offset,c=i.simple;if(!s||t.length>2){if(r)return S(t,r);var u=[];return Object(a.each)(t,function(t,e){0===e?u.push(["M",t.x,t.y]):u.push(["L",t.x,t.y]);}),u;}var h=c?O(t[t.length-1],t[0],n,e,s):T(t[0],t[t.length-1],e,n,i);return h&&h.length?r?S(h,r):o.h.pointsToPolygon(h):"M0 0, L0 0";}},"single-edge");},396:function _(t,e,n){"use strict";var r=n(1),i=n(0),o=n(2),a=n(32),s=a.a.cloneEvent,c=a.a.isNaN,u=Math.abs,h={getDefaultCfg:function getDefaultCfg(){return{direction:"both",enableOptimize:!1,scalableRange:0,allowDragOnItem:!1};},getEvents:function getEvents(){return{dragstart:"onDragStart",drag:"onDragMove",dragend:"onDragEnd"};},updateViewport:function updateViewport(t){var e=this.origin,n=+t.clientX,r=+t.clientY;if(!c(n)&&!c(r)){var i=n-e.x,o=r-e.y;"x"===this.get("direction")?o=0:"y"===this.get("direction")&&(i=0),this.origin={x:n,y:r};var a=this.graph.get("width"),s=this.graph.get("height"),u=this.graph.get("canvas").getCanvasBBox();(u.minX<=a+this.scalableRange&&u.minX+i>a+this.scalableRange||u.maxX+this.scalableRange>=0&&u.maxX+this.scalableRange+i<0)&&(i=0),(u.minY<=s+this.scalableRange&&u.minY+o>s+this.scalableRange||u.maxY+this.scalableRange>=0&&u.maxY+this.scalableRange+o<0)&&(o=0),this.graph.translate(i,o);}},onDragStart:function onDragStart(t){t.originalEvent;if(this.shouldBegin.call(this,t)){var e=t.target,n=e&&e.isCanvas&&e.isCanvas();if((this.allowDragOnItem||n)&&(this.origin={x:t.clientX,y:t.clientY},this.dragging=!1,this.enableOptimize)){for(var r=this.graph,i=r.getEdges(),o=0,a=i.length;o<a;o++){var s=i[o].get("group").get("children");s&&s.forEach(function(t){t.set("ori-visibility",t.get("ori-visibility")||t.get("visible")),t.hide();});}for(var c=r.getNodes(),u=0,h=c.length;u<h;u++){for(var l=0,f=c[u].getContainer().get("children");l<f.length;l++){var d=f[l];d.get("isKeyShape")||(d.set("ori-visibility",d.get("ori-visibility")||d.get("visible")),d.hide());}}}}},onDragMove:function onDragMove(t){this.graph;var e=t.target,n=e&&e.isCanvas&&e.isCanvas();if((this.allowDragOnItem||n)&&(t=s(t),this.origin)){if(!this.dragging){if(u(this.origin.x-t.clientX)+u(this.origin.y-t.clientY)<10)return;this.shouldBegin.call(this,t)&&(t.type="dragstart",this.dragging=!0);}this.shouldUpdate.call(this,t)&&this.updateViewport(t);}},onDragEnd:function onDragEnd(t){var e=this.graph;if(this.enableOptimize){for(var n=e.getEdges(),r=0,i=n.length;r<i;r++){var o=n[r].get("group").get("children");o&&o.forEach(function(t){t.get("ori-visibility")&&t.show();});}for(var a=e.getNodes(),c=0,u=a.length;c<u;c++){for(var h=0,l=a[c].getContainer().get("children");h<l.length;h++){var f=l[h];if(!f.get("isKeyShape"))f.get("ori-visibility")&&f.show();}}}this.dragging?(t=s(t),this.shouldEnd.call(this,t)&&this.updateViewport(t),t.type="dragend",this.endDrag()):this.origin=null;},endDrag:function endDrag(){this.origin=null,this.dragging=!1,this.dragbegin=!1;}},l=n(18),f={getDefaultCfg:function getDefaultCfg(){return{updateEdge:!0,delegateStyle:{},enableDelegate:!1,onlyChangeComboSize:!1,comboActiveState:"",selectedState:"selected"};},getEvents:function getEvents(){return{"node:dragstart":"onDragStart","node:drag":"onDrag","node:dragend":"onDragEnd","combo:dragenter":"onDragEnter","combo:dragleave":"onDragLeave","combo:drop":"onDropCombo","node:drop":"onDropNode","canvas:drop":"onDropCanvas"};},validationCombo:function validationCombo(t){return!(!this.origin||!t||t.destroyed)&&"combo"===t.getType();},onDragStart:function onDragStart(t){var e=this;if(this.shouldBegin.call(this,t)){var n=t.item;if(n&&!n.destroyed&&!n.hasLocked()){var r=t.target;if(r)if(r.get("isAnchorPoint"))return;var o=this.graph;this.targets=[],this.targetCombo=null;var a=o.findAllByState("node",this.selectedState),s=n.get("id");0===a.filter(function(t){var e=t.get("id");return s===e;}).length?this.targets.push(n):a.length>1?a.forEach(function(t){t.hasLocked()||e.targets.push(t);}):this.targets.push(n);var c=[];this.targets.forEach(function(t){c.push(Object(i.clone)(t.getModel()));}),this.set("beforeDragNodes",c),this.origin={x:t.x,y:t.y},this.point={},this.originPoint={};}}},onDrag:function onDrag(t){var e=this;this.origin&&this.shouldUpdate(this,t)&&(this.get("enableDelegate")?this.updateDelegate(t):this.targets.map(function(n){e.update(n,t);}));},onDragEnd:function onDragEnd(t){if(this.origin&&this.shouldEnd.call(this,t)){var e=t.item;if(e)e.getContainer().set("capture",!0);this.delegateRect&&(this.delegateRect.remove(),this.delegateRect=null),this.updatePositions(t);var n=this.graph;if(n.get("enabledStack")){var r={before:{nodes:this.get("beforeDragNodes"),edges:[],combos:[]},after:{nodes:[],edges:[],combos:[]}};this.targets.forEach(function(t){r.after.nodes.push(t.getModel());}),n.pushStack("update",Object(i.clone)(r));}n.emit("dragnodeend",{items:this.targets,targetItem:null}),this.point={},this.origin=null,this.originPoint={},this.targets.length=0,this.targetCombo=null;}},onDropCombo:function onDropCombo(t){var e=t.item;if(this.validationCombo(e)){this.updatePositions(t);var n=this.graph;if(this.comboActiveState&&n.setItemState(e,this.comboActiveState,!1),this.targetCombo=e,this.onlyChangeComboSize)n.updateCombos();else{var r=e.getModel();this.targets.map(function(t){t.getModel().comboId!==r.id&&n.updateComboTree(t,r.id);}),n.updateCombo(e);}n.emit("dragnodeend",{items:this.targets,targetItem:this.targetCombo});}},onDropCanvas:function onDropCanvas(t){var e=this.graph;this.targets&&0!==this.targets.length&&(this.updatePositions(t),this.onlyChangeComboSize?e.updateCombos():this.targets.map(function(t){t.getModel().comboId&&e.updateComboTree(t);}));},onDropNode:function onDropNode(t){if(this.targets&&0!==this.targets.length){var e=t.item;this.updatePositions(t);var n=this.graph,r=e.getModel().comboId;if(r){var i=n.findById(r);this.comboActiveState&&n.setItemState(i,this.comboActiveState,!1),this.targets.map(function(t){var e=t.getModel();r!==e.comboId&&n.updateComboTree(t,r);}),n.updateCombo(i);}else this.targets.map(function(t){t.getModel().comboId&&n.updateComboTree(t);});n.emit("dragnodeend",{items:this.targets,targetItem:e});}},onDragEnter:function onDragEnter(t){var e=t.item;if(this.validationCombo(e)){var n=this.graph;this.comboActiveState&&n.setItemState(e,this.comboActiveState,!0);}},onDragLeave:function onDragLeave(t){var e=t.item;if(this.validationCombo(e)){var n=this.graph;this.comboActiveState&&n.setItemState(e,this.comboActiveState,!1);}},updatePositions:function updatePositions(t){var e=this;this.targets&&0!==this.targets.length&&this.get("enableDelegate")&&this.targets.map(function(n){return e.update(n,t);});},update:function update(t,e){var n=this.origin,r=t.get("model"),i=t.get("id");this.point[i]||(this.point[i]={x:r.x||0,y:r.y||0});var o={x:e.x-n.x+this.point[i].x,y:e.y-n.y+this.point[i].y};this.get("updateEdge")?this.graph.updateItem(t,o,!1):t.updatePosition(o);},updateDelegate:function updateDelegate(t){this.graph;if(this.delegateRect){var e=t.x-this.origin.x+this.originPoint.minX,n=t.y-this.origin.y+this.originPoint.minY;this.delegateRect.attr({x:e,y:n});}else{var o=this.graph.get("group"),a=Object(i.deepMix)({},l.a.delegateStyle,this.delegateStyle),s=this.calculationGroupPosition(t),c=s.x,u=s.y,h=s.width,f=s.height,d=s.minX,p=s.minY;this.originPoint={x:c,y:u,width:h,height:f,minX:d,minY:p},this.delegateRect=o.addShape("rect",{attrs:Object(r.a)({width:h,height:f,x:c,y:u},a),name:"rect-delegate-shape"});}},calculationGroupPosition:function calculationGroupPosition(t){var e=this.graph.findAllByState("node",this.selectedState);0===e.length&&e.push(t.item);for(var n=1/0,r=-1/0,i=1/0,o=-1/0,a=0;a<e.length;a++){var s=e[a].getBBox(),c=s.minX,u=s.minY,h=s.maxX,l=s.maxY;c<n&&(n=c),u<i&&(i=u),h>r&&(r=h),l>o&&(o=l);}return{x:Math.floor(n),y:Math.floor(i),width:Math.ceil(r)-Math.floor(n),height:Math.ceil(o)-Math.floor(i),minX:n,minY:i};}},d={getDefaultCfg:function getDefaultCfg(){return{multiple:!0,selectedState:"selected"};},getEvents:function getEvents(){return{"node:tap":"onClick","combo:tap":"onClick","canvas:tap":"onCanvasClick"};},onClick:function onClick(t){var e=this,n=t.item;if(n&&!n.destroyed){var r=n.getType(),o=e.graph,a=e.multiple,s=e.shouldUpdate;if(e.shouldBegin.call(e,t)){if(!a){var c=o.findAllByState(r,e.selectedState);Object(i.each)(c,function(t){t!==n&&o.setItemState(t,e.selectedState,!1);});}if(n.hasState(e.selectedState)){s.call(e,t)&&o.setItemState(n,e.selectedState,!1);var u=o.findAllByState("node",e.selectedState),h=o.findAllByState("combo",e.selectedState);o.emit("nodeselectchange",{target:n,selectedItems:{nodes:u,combos:h},select:!1});}else{s.call(e,t)&&o.setItemState(n,e.selectedState,!0);u=o.findAllByState("node",e.selectedState),h=o.findAllByState("combo",e.selectedState);o.emit("nodeselectchange",{target:n,selectedItems:{nodes:u,combos:h},select:!0});}}}},onCanvasClick:function onCanvasClick(){var t=this,e=this.graph,n=e.findAllByState("node",this.selectedState);Object(i.each)(n,function(n){e.setItemState(n,t.selectedState,!1);});var r=e.findAllByState("combo",this.selectedState);Object(i.each)(r,function(n){e.setItemState(n,t.selectedState,!1);}),e.emit("nodeselectchange",{selectedItems:{nodes:[],edges:[],combos:[]},select:!1});}},p={firstScale:null,getDefaultCfg:function getDefaultCfg(){return{originScale:1,sensitivity:2,minZoom:void 0,maxZoom:void 0,enableOptimize:!1,optimizeZoom:0.1,fixSelectedItems:{fixAll:!1,fixLineWidth:!1,fixLabel:!1,fixState:"selected"}};},getEvents:function getEvents(){var t=this.fixSelectedItems;return t.fixState||(t.fixState="selected"),t.fixAll&&(t.fixLineWidth=!0,t.fixLabel=!0),{pinchstart:"onPinch",pinchmove:"onPinch"};},onPinch:function onPinch(t){t.preventDefault&&t.preventDefault(),t.originalEvent.preventDefault&&t.originalEvent.preventDefault();var e=t.originalEvent.pointers;if(!(e.length<2)){"pinchstart"===t.type&&(this.firstScale=this.graph.getZoom());var n=t.originalEvent.scale||t.originalEvent.srcEvent.extra.scale,r=this.firstScale*n;this.currentScale=r;var i=this.get("minZoom")||this.graph.get("minZoom");if(!(r>(this.get("maxZoom")||this.graph.get("maxZoom"))||r<i)){var o=this.graph.get("canvas"),a=e[0].clientX,s=e[0].clientY,c=e[1].clientX,u=e[1].clientY,h=o.getPointByClient((a+c)/2,(s+u)/2);this.graph.zoomTo(r,{x:h.x,y:h.y});}}}},g=["tap","dbltap"],v={getDefaultCfg:function getDefaultCfg(){return{trigger:"tap",onChange:function onChange(){}};},getEvents:function getEvents(){var t,e;return g.includes(this.trigger)?e=this.trigger:(e="tap",console.warn("Behavior collapse-expand 的 trigger 参数不合法，请输入 'click' 或 'dblclick'")),(t={})["node:"+e]="onNodeTap",t.touchstart="onNodeTap",t;},onNodeTap:function onNodeTap(t){var e=t.item,n=this.graph.findDataById(e.get("id"));if(n){var r=n.children;if(r&&0!==r.length){var i=!n.collapsed;if(this.shouldBegin(t,i)&&(n.collapsed=i,e.getModel().collapsed=i,this.graph.emit("itemcollapsed",{item:t.item,collapsed:i}),this.shouldUpdate(t,i))){try{this.onChange(e,i);}catch(t){console.warn(t);}this.graph.layout();}}}}},y=a.a.calculationItemsBBox,m=function m(t,e){if(!1!==e(t)&&t){var n=t.get("combos");if(0===n.length)return!1;Object(i.each)(n,function(t){m(t,e);});}},b=["click","dblclick"],x=["tap","drag"],w=["shift","ctrl","control","alt","meta",void 0],S={bind:function bind(t){"drag-canvas"===this.type&&t.get("canvas").set("draggable",!0);var e=this.events;this.graph=t,Object(i.each)(e,function(e,n){t.on(n,e);});},unbind:function unbind(t){var e=this.events;"drag-canvas"===this.type&&t.get("canvas").set("draggable",!1),this.graph=null,Object(i.each)(e,function(e,n){t.off(n,e);});}},O={"drag-canvas":h,"zoom-canvas":p,"drag-node":f,"activate-relations":{getDefaultCfg:function getDefaultCfg(){return{activeState:"active",inactiveState:"inactive",resetSelected:!1,shouldUpdate:function shouldUpdate(){return!0;}};},getEvents:function getEvents(){return{"node:tap":"setAllItemStates","canvas:tap":"clearAllItemStates"};},setAllItemStates:function setAllItemStates(t){var e=t.item,n=this.graph;if(this.item=e,this.shouldUpdate(t.item,{event:t,action:"activate"})){for(var r=this.activeState,i=this.inactiveState,o=n.getNodes(),a=n.getEdges(),s=o.length,c=a.length,u=0;u<s;u++){var h=o[u],l=h.hasState("selected");this.resetSelected&&l&&n.setItemState(h,"selected",!1),n.setItemState(h,r,!1),i&&n.setItemState(h,i,!0);}for(u=0;u<c;u++){var f=a[u];n.setItemState(f,r,!1),i&&n.setItemState(f,i,!0);}i&&n.setItemState(e,i,!1),n.setItemState(e,r,!0);var d=e.getEdges(),p=d.length;for(u=0;u<p;u++){var g=void 0;g=(f=d[u]).getSource()===e?f.getTarget():f.getSource(),i&&n.setItemState(g,i,!1),n.setItemState(g,r,!0),n.setItemState(f,i,!1),n.setItemState(f,r,!0),f.toFront();}n.emit("afteractivaterelations",{item:t.item,action:"activate"});}},clearActiveState:function clearActiveState(t){var e=this.get("graph");if(this.shouldUpdate(t.item,{event:t,action:"deactivate"})){var n=this.activeState,r=this.inactiveState,i=e.get("autoPaint");e.setAutoPaint(!1);for(var o=e.getNodes(),a=e.getEdges(),s=o.length,c=a.length,u=0;u<s;u++){var h=o[u];e.clearItemStates(h,[n,r]);}for(u=0;u<c;u++){var l=a[u];e.clearItemStates(l,[n,r,"deactivate"]);}e.paint(),e.setAutoPaint(i),e.emit("afteractivaterelations",{item:t.item||this.get("item"),action:"deactivate"});}},clearAllItemStates:function clearAllItemStates(t){var e=this.graph;if(this.shouldUpdate(t.item,{event:t,action:"deactivate"})){for(var n=this.activeState,r=this.inactiveState,i=e.getNodes(),o=e.getEdges(),a=i.length,s=o.length,c=0;c<a;c++){var u=i[c];e.clearItemStates(u,[n,r]);}for(c=0;c<s;c++){var h=o[c];e.clearItemStates(h,[n,r,"deactivate"]);}e.emit("afteractivaterelations",{item:t.item||this.get("item"),action:"deactivate"});}}},"click-select":d,"collapse-expand":v,"drag-combo":{getDefaultCfg:function getDefaultCfg(){return{enableDelegate:!1,delegateStyle:{},onlyChangeComboSize:!1,activeState:"",selectedState:"selected"};},getEvents:function getEvents(){return{"combo:dragstart":"onDragStart","combo:drag":"onDrag","combo:dragend":"onDragEnd","combo:drop":"onDrop","node:drop":"onNodeDrop","combo:dragenter":"onDragEnter","combo:dragleave":"onDragLeave"};},validationCombo:function validationCombo(t){var e=t.item;return!(!e||e.destroyed)&&!!this.shouldUpdate(this,t)&&"combo"===e.getType();},onDragStart:function onDragStart(t){var e=this,n=this.graph,r=t.item;if(this.validationCombo(t)){this.targets=[];var i=n.findAllByState("combo",this.selectedState),o=r.get("id");0===i.filter(function(t){var e=t.get("id");return o===e;}).length?this.targets.push(r):this.targets=i,this.activeState&&this.targets.map(function(t){var r=t.getModel();if(r.parentId){var i=n.findById(r.parentId);i&&n.setItemState(i,e.activeState,!0);}}),this.point={},this.originPoint={},this.origin={x:t.x,y:t.y},this.currentItemChildCombos=[],m(r,function(t){if(t.destroyed)return!1;var n=t.getModel();return e.currentItemChildCombos.push(n.id),!0;});}},onDrag:function onDrag(t){var e=this;if(this.origin&&this.validationCombo(t))if(this.enableDelegate)this.updateDelegate(t);else{if(this.activeState){var n=this.graph,r=t.item,o=r.getModel(),a=n.getCombos(),s=r.getBBox(),c=s.centerX,u=s.centerY,h=s.width;a.filter(function(t){var n=t.getModel();return o.parentId,n.id!==o.id&&!e.currentItemChildCombos.includes(n.id);}).map(function(t){var r=t.getBBox(),i=r.centerX,o=r.centerY,a=r.width,s=c-i,l=u-o,f=2*Math.sqrt(s*s+l*l);h+a-f>0.8*h?n.setItemState(t,e.activeState,!0):n.setItemState(t,e.activeState,!1);});}Object(i.each)(this.targets,function(n){e.updateCombo(n,t);});}},updatePositions:function updatePositions(t){var e=this;this.enableDelegate&&Object(i.each)(this.targets,function(n){e.updateCombo(n,t);});},onDrop:function onDrop(t){var e=this,n=t.item;if(n&&this.targets&&!n.destroyed){this.updatePositions(t);var r=this.graph,i=n.getModel();this.targets.map(function(t){t.getModel().parentId!==i.id?(e.activeState&&r.setItemState(n,e.activeState,!1),e.onlyChangeComboSize?r.updateCombo(t):r.updateComboTree(t,i.id)):r.updateCombo(n);}),this.end(n,t),this.endComparison=!0;}},onNodeDrop:function onNodeDrop(t){var e=this;if(this.targets&&0!==this.targets.length){this.updatePositions(t);var n,r=this.graph,i=t.item.getModel().comboId;if(i){if(this.activeState){var o=r.findById(i);r.setItemState(o,this.activeState,!1);}this.targets.map(function(t){e.onlyChangeComboSize?r.updateCombo(t):i!==t.getID()&&(n=r.findById(i),i!==t.getModel().parentId&&r.updateComboTree(t,i));});}else this.targets.map(function(t){e.onlyChangeComboSize?r.updateCombo(t):t.getModel().comboId&&r.updateComboTree(t);});this.endComparison=!0,this.end(n,t);}},onDragEnter:function onDragEnter(t){if(this.origin&&this.validationCombo(t)){var e=t.item,n=this.graph;this.activeState&&n.setItemState(e,this.activeState,!0);}},onDragLeave:function onDragLeave(t){if(this.origin&&this.validationCombo(t)){var e=t.item,n=this.graph;this.activeState&&n.setItemState(e,this.activeState,!1);}},onDragEnd:function onDragEnd(t){if(this.targets&&0!==this.targets.length){var e=t.item;this.updatePositions(t);var n=this.getParentCombo(e.getModel().parentId),r=this.graph;n&&this.activeState&&r.setItemState(n,this.activeState,!1),this.end(void 0,t);}},end:function end(t,e){var n=this;if(this.origin){var r=this.graph;if(this.delegateShape)r.get("delegateGroup").clear(),this.delegateShape=null;t&&this.activeState&&r.setItemState(t,this.activeState,!1),t||this.targets.map(function(t){n.onlyChangeComboSize?r.updateCombo(t):r.updateComboTree(t);}),this.point=[],this.origin=null,this.originPoint=null,this.targets.length=0;}},traverse:function traverse(t,e){var n=this;if(!1!==e(t)&&t){var r=t.get("combos");Object(i.each)(r,function(t){n.traverse(t,e);});var o=t.get("nodes");Object(i.each)(o,function(t){n.traverse(t,e);});}},updateCombo:function updateCombo(t,e){var n=this;this.traverse(t,function(t){return!t.destroyed&&(n.updateSignleItem(t,e),!0);});},updateSignleItem:function updateSignleItem(t,e){var n=this.origin,r=this.graph,i=t.getModel(),o=t.get("id");this.point[o]||(this.point[o]={x:i.x,y:i.y});var a=e.x-n.x+this.point[o].x,s=e.y-n.y+this.point[o].y;r.updateItem(t,{x:a,y:s});},getParentCombo:function getParentCombo(t){var e=this.graph;if(t){var n=e.findById(t);if(n)return n;}},updateDelegate:function updateDelegate(t){var e=this.graph;if(this.delegateShape){var n=t.x-this.origin.x+this.originPoint.minX,i=t.y-this.origin.y+this.originPoint.minY;this.delegateShape.attr({x:n,y:i});}else{var o=e.get("delegateGroup"),a=null,s=(a=this.targets.length>1?y(this.targets):this.targets[0].getBBox()).x,c=a.y,u=a.width,h=a.height,f=a.minX,d=a.minY;this.originPoint={x:s,y:c,width:u,height:h,minX:f,minY:d};var p=Object(r.a)(Object(r.a)({},l.a.delegateStyle),this.delegateStyle);this.delegateShape=o.addShape("rect",{attrs:Object(r.a)({width:a.width,height:a.height,x:a.x,y:a.y},p),name:"combo-delegate-shape"});}}},"collapse-expand-combo":{getDefaultCfg:function getDefaultCfg(){return{trigger:"dblclick",relayout:!0};},getEvents:function getEvents(){var t,e;return b.includes(this.trigger)?e=this.trigger:(e="dblclick",console.warn("Behavior collapse-expand-group 的 trigger 参数不合法，请输入 'click' 或 'dblclick'")),(t={})["combo:"+e]="onComboClick",t;},onComboClick:function onComboClick(t){var e=t.item,n=this.graph,r=this.relayout;if(e&&!e.destroyed&&"combo"===e.getType()){var i=e.getModel().id;i&&(n.collapseExpandCombo(i),r&&n.get("layout")?n.layout():n.refreshPositions());}}},"create-edge":{getDefaultCfg:function getDefaultCfg(){return{trigger:"tap",key:void 0,edgeConfig:{}};},getEvents:function getEvents(){var t;return x.indexOf(this.trigger.toLowerCase())>-1||(this.trigger="tap",console.warn("Behavior create-edge 的 trigger 参数不合法，请输入 'click'，'drag'")),this.key&&-1===w.indexOf(this.key.toLowerCase())&&(this.trigger=void 0,console.warn("Behavior create-edge 的 key 参数不合法，请输入 'shift'，'ctrl'，'alt'，'control'，或 undefined")),"drag"===this.trigger?t={"node:dragstart":"onClick","combo:dragstart":"onClick",drag:"updateEndPoint","node:drop":"onClick","combo:drop":"onClick",dragend:"onDragEnd"}:"click"===this.trigger&&(t={"node:tap":"onClick",mousemove:"updateEndPoint","edge:tap":"cancelCreating","canvas:tap":"cancelCreating","combo:tap":"onClick"}),this.key&&(t.keydown="onKeyDown",t.keyup="onKeyUp"),t;},onDragEnd:function onDragEnd(t){if(!this.key||this.keydown){var e=t.item;e&&e.getID()!==this.source&&"node"===e.getType()||this.cancelCreating({item:this.edge,x:t.x,y:t.y});}},onClick:function onClick(t){if(!this.key||this.keydown){var e=t.item,n=this.graph,i=e.getModel();if(this.addingEdge&&this.edge){if(!this.shouldEnd.call(this,t))return;var o={target:i.id};this.source===i.id&&(o.type="loop"),n.emit("beforecreateedge",{}),n.updateItem(this.edge,o),n.emit("aftercreateedge",{edge:this.edge}),this.edge.getKeyShape().set("capture",!0),this.edge=null,this.addingEdge=!1;}else{if(!this.shouldBegin.call(this,t))return;this.edge=n.addItem("edge",Object(r.a)({source:i.id,target:i.id},this.edgeConfig),!1),this.source=i.id,this.addingEdge=!0,this.edge.getKeyShape().set("capture",!1);}}},updateEndPoint:function updateEndPoint(t){if(!this.key||this.keydown){var e={x:t.x,y:t.y};this.graph.findById(this.source)?this.addingEdge&&this.edge&&this.graph.updateItem(this.edge,{target:e},!1):this.addingEdge=!1;}},cancelCreating:function cancelCreating(t){if(!this.key||this.keydown){var e=this.graph,n=t.item;if(this.addingEdge&&t.target&&t.target.isCanvas&&t.target.isCanvas())return e.removeItem(this.edge,!1),this.edge=null,void(this.addingEdge=!1);if(this.addingEdge&&this.edge===n){var r=!0;if(!e.get("groupByTypes"))for(var i=t.x,o=t.y,a=e.getNodes(),s=a.length,c=0;c<s;c++){var u=a[c],h=u.getModel(),l=u.getBBox();if(i<=l.maxX&&i>=l.minX&&o<=l.maxY&&o>=l.minY){if(!this.shouldEnd.call(this,{x:t.x,y:t.y,canvasX:t.canvasX,canvasY:t.canvasY,clientX:t.clientX,clientY:t.clientY,item:u}))return;e.emit("beforecreateedge",{}),e.updateItem(this.edge,{target:h.id}),e.emit("aftercreateedge",{edge:this.edge}),r=!1;break;}}r&&e.removeItem(this.edge,!1),this.edge=null,this.addingEdge=!1;}}},onKeyDown:function onKeyDown(t){var e=t.key;e&&(e.toLowerCase()===this.key.toLowerCase()?this.keydown=!0:this.keydown=!1);},onKeyUp:function onKeyUp(){this.addingEdge&&this.edge&&(this.graph.removeItem(this.edge,!1),this.addingEdge=!1,this.edge=null),this.keydown=!1;}}};Object(i.each)(O,function(t,e){Object(o.i)(e,Object(r.a)(Object(r.a)({},t),S));});},4:function _(t,e,n){"use strict";n.d(e,"a",function(){return r;}),n.d(e,"b",function(){return _;}),n.d(e,"c",function(){return R;});var r={};n.r(r),n.d(r,"create",function(){return o;}),n.d(r,"fromMat4",function(){return a;}),n.d(r,"clone",function(){return s;}),n.d(r,"copy",function(){return c;}),n.d(r,"fromValues",function(){return u;}),n.d(r,"set",function(){return h;}),n.d(r,"identity",function(){return l;}),n.d(r,"transpose",function(){return f;}),n.d(r,"invert",function(){return d;}),n.d(r,"adjoint",function(){return p;}),n.d(r,"determinant",function(){return g;}),n.d(r,"multiply",function(){return v;}),n.d(r,"translate",function(){return y;}),n.d(r,"rotate",function(){return m;}),n.d(r,"scale",function(){return b;}),n.d(r,"fromTranslation",function(){return x;}),n.d(r,"fromRotation",function(){return w;}),n.d(r,"fromScaling",function(){return S;}),n.d(r,"fromMat2d",function(){return O;}),n.d(r,"fromQuat",function(){return M;}),n.d(r,"normalFromMat4",function(){return k;}),n.d(r,"projection",function(){return C;}),n.d(r,"str",function(){return E;}),n.d(r,"frob",function(){return j;}),n.d(r,"add",function(){return P;}),n.d(r,"subtract",function(){return A;}),n.d(r,"multiplyScalar",function(){return I;}),n.d(r,"multiplyScalarAndAdd",function(){return T;}),n.d(r,"exactEquals",function(){return N;}),n.d(r,"equals",function(){return B;}),n.d(r,"mul",function(){return L;}),n.d(r,"sub",function(){return D;});var i=n(5);function o(){var t=new i.a(9);return i.a!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t;}function a(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[4],t[4]=e[5],t[5]=e[6],t[6]=e[8],t[7]=e[9],t[8]=e[10],t;}function s(t){var e=new i.a(9);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e;}function c(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t;}function u(t,e,n,r,o,a,s,c,u){var h=new i.a(9);return h[0]=t,h[1]=e,h[2]=n,h[3]=r,h[4]=o,h[5]=a,h[6]=s,h[7]=c,h[8]=u,h;}function h(t,e,n,r,i,o,a,s,c,u){return t[0]=e,t[1]=n,t[2]=r,t[3]=i,t[4]=o,t[5]=a,t[6]=s,t[7]=c,t[8]=u,t;}function l(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t;}function f(t,e){if(t===e){var n=e[1],r=e[2],i=e[5];t[1]=e[3],t[2]=e[6],t[3]=n,t[5]=e[7],t[6]=r,t[7]=i;}else t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8];return t;}function d(t,e){var n=e[0],r=e[1],i=e[2],o=e[3],a=e[4],s=e[5],c=e[6],u=e[7],h=e[8],l=h*a-s*u,f=-h*o+s*c,d=u*o-a*c,p=n*l+r*f+i*d;return p?(p=1/p,t[0]=l*p,t[1]=(-h*r+i*u)*p,t[2]=(s*r-i*a)*p,t[3]=f*p,t[4]=(h*n-i*c)*p,t[5]=(-s*n+i*o)*p,t[6]=d*p,t[7]=(-u*n+r*c)*p,t[8]=(a*n-r*o)*p,t):null;}function p(t,e){var n=e[0],r=e[1],i=e[2],o=e[3],a=e[4],s=e[5],c=e[6],u=e[7],h=e[8];return t[0]=a*h-s*u,t[1]=i*u-r*h,t[2]=r*s-i*a,t[3]=s*c-o*h,t[4]=n*h-i*c,t[5]=i*o-n*s,t[6]=o*u-a*c,t[7]=r*c-n*u,t[8]=n*a-r*o,t;}function g(t){var e=t[0],n=t[1],r=t[2],i=t[3],o=t[4],a=t[5],s=t[6],c=t[7],u=t[8];return e*(u*o-a*c)+n*(-u*i+a*s)+r*(c*i-o*s);}function v(t,e,n){var r=e[0],i=e[1],o=e[2],a=e[3],s=e[4],c=e[5],u=e[6],h=e[7],l=e[8],f=n[0],d=n[1],p=n[2],g=n[3],v=n[4],y=n[5],m=n[6],b=n[7],x=n[8];return t[0]=f*r+d*a+p*u,t[1]=f*i+d*s+p*h,t[2]=f*o+d*c+p*l,t[3]=g*r+v*a+y*u,t[4]=g*i+v*s+y*h,t[5]=g*o+v*c+y*l,t[6]=m*r+b*a+x*u,t[7]=m*i+b*s+x*h,t[8]=m*o+b*c+x*l,t;}function y(t,e,n){var r=e[0],i=e[1],o=e[2],a=e[3],s=e[4],c=e[5],u=e[6],h=e[7],l=e[8],f=n[0],d=n[1];return t[0]=r,t[1]=i,t[2]=o,t[3]=a,t[4]=s,t[5]=c,t[6]=f*r+d*a+u,t[7]=f*i+d*s+h,t[8]=f*o+d*c+l,t;}function m(t,e,n){var r=e[0],i=e[1],o=e[2],a=e[3],s=e[4],c=e[5],u=e[6],h=e[7],l=e[8],f=Math.sin(n),d=Math.cos(n);return t[0]=d*r+f*a,t[1]=d*i+f*s,t[2]=d*o+f*c,t[3]=d*a-f*r,t[4]=d*s-f*i,t[5]=d*c-f*o,t[6]=u,t[7]=h,t[8]=l,t;}function b(t,e,n){var r=n[0],i=n[1];return t[0]=r*e[0],t[1]=r*e[1],t[2]=r*e[2],t[3]=i*e[3],t[4]=i*e[4],t[5]=i*e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t;}function x(t,e){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=e[0],t[7]=e[1],t[8]=1,t;}function w(t,e){var n=Math.sin(e),r=Math.cos(e);return t[0]=r,t[1]=n,t[2]=0,t[3]=-n,t[4]=r,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t;}function S(t,e){return t[0]=e[0],t[1]=0,t[2]=0,t[3]=0,t[4]=e[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t;}function O(t,e){return t[0]=e[0],t[1]=e[1],t[2]=0,t[3]=e[2],t[4]=e[3],t[5]=0,t[6]=e[4],t[7]=e[5],t[8]=1,t;}function M(t,e){var n=e[0],r=e[1],i=e[2],o=e[3],a=n+n,s=r+r,c=i+i,u=n*a,h=r*a,l=r*s,f=i*a,d=i*s,p=i*c,g=o*a,v=o*s,y=o*c;return t[0]=1-l-p,t[3]=h-y,t[6]=f+v,t[1]=h+y,t[4]=1-u-p,t[7]=d-g,t[2]=f-v,t[5]=d+g,t[8]=1-u-l,t;}function k(t,e){var n=e[0],r=e[1],i=e[2],o=e[3],a=e[4],s=e[5],c=e[6],u=e[7],h=e[8],l=e[9],f=e[10],d=e[11],p=e[12],g=e[13],v=e[14],y=e[15],m=n*s-r*a,b=n*c-i*a,x=n*u-o*a,w=r*c-i*s,S=r*u-o*s,O=i*u-o*c,M=h*g-l*p,k=h*v-f*p,C=h*y-d*p,E=l*v-f*g,j=l*y-d*g,P=f*y-d*v,A=m*P-b*j+x*E+w*C-S*k+O*M;return A?(A=1/A,t[0]=(s*P-c*j+u*E)*A,t[1]=(c*C-a*P-u*k)*A,t[2]=(a*j-s*C+u*M)*A,t[3]=(i*j-r*P-o*E)*A,t[4]=(n*P-i*C+o*k)*A,t[5]=(r*C-n*j-o*M)*A,t[6]=(g*O-v*S+y*w)*A,t[7]=(v*x-p*O-y*b)*A,t[8]=(p*S-g*x+y*m)*A,t):null;}function C(t,e,n){return t[0]=2/e,t[1]=0,t[2]=0,t[3]=0,t[4]=-2/n,t[5]=0,t[6]=-1,t[7]=1,t[8]=1,t;}function E(t){return"mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")";}function j(t){return Math.hypot(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8]);}function P(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t[2]=e[2]+n[2],t[3]=e[3]+n[3],t[4]=e[4]+n[4],t[5]=e[5]+n[5],t[6]=e[6]+n[6],t[7]=e[7]+n[7],t[8]=e[8]+n[8],t;}function A(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t[2]=e[2]-n[2],t[3]=e[3]-n[3],t[4]=e[4]-n[4],t[5]=e[5]-n[5],t[6]=e[6]-n[6],t[7]=e[7]-n[7],t[8]=e[8]-n[8],t;}function I(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t[3]=e[3]*n,t[4]=e[4]*n,t[5]=e[5]*n,t[6]=e[6]*n,t[7]=e[7]*n,t[8]=e[8]*n,t;}function T(t,e,n,r){return t[0]=e[0]+n[0]*r,t[1]=e[1]+n[1]*r,t[2]=e[2]+n[2]*r,t[3]=e[3]+n[3]*r,t[4]=e[4]+n[4]*r,t[5]=e[5]+n[5]*r,t[6]=e[6]+n[6]*r,t[7]=e[7]+n[7]*r,t[8]=e[8]+n[8]*r,t;}function N(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[3]===e[3]&&t[4]===e[4]&&t[5]===e[5]&&t[6]===e[6]&&t[7]===e[7]&&t[8]===e[8];}function B(t,e){var n=t[0],r=t[1],o=t[2],a=t[3],s=t[4],c=t[5],u=t[6],h=t[7],l=t[8],f=e[0],d=e[1],p=e[2],g=e[3],v=e[4],y=e[5],m=e[6],b=e[7],x=e[8];return Math.abs(n-f)<=i.b*Math.max(1,Math.abs(n),Math.abs(f))&&Math.abs(r-d)<=i.b*Math.max(1,Math.abs(r),Math.abs(d))&&Math.abs(o-p)<=i.b*Math.max(1,Math.abs(o),Math.abs(p))&&Math.abs(a-g)<=i.b*Math.max(1,Math.abs(a),Math.abs(g))&&Math.abs(s-v)<=i.b*Math.max(1,Math.abs(s),Math.abs(v))&&Math.abs(c-y)<=i.b*Math.max(1,Math.abs(c),Math.abs(y))&&Math.abs(u-m)<=i.b*Math.max(1,Math.abs(u),Math.abs(m))&&Math.abs(h-b)<=i.b*Math.max(1,Math.abs(h),Math.abs(b))&&Math.abs(l-x)<=i.b*Math.max(1,Math.abs(l),Math.abs(x));}var L=v,D=A,_=n(42),R=n(72);},42:function _(t,e,n){"use strict";n.r(e),n.d(e,"create",function(){return i;}),n.d(e,"clone",function(){return o;}),n.d(e,"fromValues",function(){return a;}),n.d(e,"copy",function(){return s;}),n.d(e,"set",function(){return c;}),n.d(e,"add",function(){return u;}),n.d(e,"subtract",function(){return h;}),n.d(e,"multiply",function(){return l;}),n.d(e,"divide",function(){return f;}),n.d(e,"ceil",function(){return d;}),n.d(e,"floor",function(){return p;}),n.d(e,"min",function(){return g;}),n.d(e,"max",function(){return v;}),n.d(e,"round",function(){return y;}),n.d(e,"scale",function(){return m;}),n.d(e,"scaleAndAdd",function(){return b;}),n.d(e,"distance",function(){return x;}),n.d(e,"squaredDistance",function(){return w;}),n.d(e,"length",function(){return S;}),n.d(e,"squaredLength",function(){return O;}),n.d(e,"negate",function(){return M;}),n.d(e,"inverse",function(){return k;}),n.d(e,"normalize",function(){return C;}),n.d(e,"dot",function(){return E;}),n.d(e,"cross",function(){return j;}),n.d(e,"lerp",function(){return P;}),n.d(e,"random",function(){return A;}),n.d(e,"transformMat2",function(){return I;}),n.d(e,"transformMat2d",function(){return T;}),n.d(e,"transformMat3",function(){return N;}),n.d(e,"transformMat4",function(){return B;}),n.d(e,"rotate",function(){return L;}),n.d(e,"angle",function(){return D;}),n.d(e,"zero",function(){return _;}),n.d(e,"str",function(){return R;}),n.d(e,"exactEquals",function(){return F;}),n.d(e,"equals",function(){return Y;}),n.d(e,"len",function(){return z;}),n.d(e,"sub",function(){return W;}),n.d(e,"mul",function(){return q;}),n.d(e,"div",function(){return V;}),n.d(e,"dist",function(){return G;}),n.d(e,"sqrDist",function(){return H;}),n.d(e,"sqrLen",function(){return U;}),n.d(e,"forEach",function(){return Z;});var r=n(5);function i(){var t=new r.a(2);return r.a!=Float32Array&&(t[0]=0,t[1]=0),t;}function o(t){var e=new r.a(2);return e[0]=t[0],e[1]=t[1],e;}function a(t,e){var n=new r.a(2);return n[0]=t,n[1]=e,n;}function s(t,e){return t[0]=e[0],t[1]=e[1],t;}function c(t,e,n){return t[0]=e,t[1]=n,t;}function u(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t;}function h(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t;}function l(t,e,n){return t[0]=e[0]*n[0],t[1]=e[1]*n[1],t;}function f(t,e,n){return t[0]=e[0]/n[0],t[1]=e[1]/n[1],t;}function d(t,e){return t[0]=Math.ceil(e[0]),t[1]=Math.ceil(e[1]),t;}function p(t,e){return t[0]=Math.floor(e[0]),t[1]=Math.floor(e[1]),t;}function g(t,e,n){return t[0]=Math.min(e[0],n[0]),t[1]=Math.min(e[1],n[1]),t;}function v(t,e,n){return t[0]=Math.max(e[0],n[0]),t[1]=Math.max(e[1],n[1]),t;}function y(t,e){return t[0]=Math.round(e[0]),t[1]=Math.round(e[1]),t;}function m(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t;}function b(t,e,n,r){return t[0]=e[0]+n[0]*r,t[1]=e[1]+n[1]*r,t;}function x(t,e){var n=e[0]-t[0],r=e[1]-t[1];return Math.hypot(n,r);}function w(t,e){var n=e[0]-t[0],r=e[1]-t[1];return n*n+r*r;}function S(t){var e=t[0],n=t[1];return Math.hypot(e,n);}function O(t){var e=t[0],n=t[1];return e*e+n*n;}function M(t,e){return t[0]=-e[0],t[1]=-e[1],t;}function k(t,e){return t[0]=1/e[0],t[1]=1/e[1],t;}function C(t,e){var n=e[0],r=e[1],i=n*n+r*r;return i>0&&(i=1/Math.sqrt(i)),t[0]=e[0]*i,t[1]=e[1]*i,t;}function E(t,e){return t[0]*e[0]+t[1]*e[1];}function j(t,e,n){var r=e[0]*n[1]-e[1]*n[0];return t[0]=t[1]=0,t[2]=r,t;}function P(t,e,n,r){var i=e[0],o=e[1];return t[0]=i+r*(n[0]-i),t[1]=o+r*(n[1]-o),t;}function A(t,e){e=e||1;var n=2*r.c()*Math.PI;return t[0]=Math.cos(n)*e,t[1]=Math.sin(n)*e,t;}function I(t,e,n){var r=e[0],i=e[1];return t[0]=n[0]*r+n[2]*i,t[1]=n[1]*r+n[3]*i,t;}function T(t,e,n){var r=e[0],i=e[1];return t[0]=n[0]*r+n[2]*i+n[4],t[1]=n[1]*r+n[3]*i+n[5],t;}function N(t,e,n){var r=e[0],i=e[1];return t[0]=n[0]*r+n[3]*i+n[6],t[1]=n[1]*r+n[4]*i+n[7],t;}function B(t,e,n){var r=e[0],i=e[1];return t[0]=n[0]*r+n[4]*i+n[12],t[1]=n[1]*r+n[5]*i+n[13],t;}function L(t,e,n,r){var i=e[0]-n[0],o=e[1]-n[1],a=Math.sin(r),s=Math.cos(r);return t[0]=i*s-o*a+n[0],t[1]=i*a+o*s+n[1],t;}function D(t,e){var n=t[0],r=t[1],i=e[0],o=e[1],a=Math.sqrt(n*n+r*r)*Math.sqrt(i*i+o*o),s=a&&(n*i+r*o)/a;return Math.acos(Math.min(Math.max(s,-1),1));}function _(t){return t[0]=0,t[1]=0,t;}function R(t){return"vec2("+t[0]+", "+t[1]+")";}function F(t,e){return t[0]===e[0]&&t[1]===e[1];}function Y(t,e){var n=t[0],i=t[1],o=e[0],a=e[1];return Math.abs(n-o)<=r.b*Math.max(1,Math.abs(n),Math.abs(o))&&Math.abs(i-a)<=r.b*Math.max(1,Math.abs(i),Math.abs(a));}var X,z=S,W=h,q=l,V=f,G=x,H=w,U=O,Z=(X=i(),function(t,e,n,r,i,o){var a,s;for(e||(e=2),n||(n=0),s=r?Math.min(r*e+n,t.length):t.length,a=n;a<s;a+=e){X[0]=t[a],X[1]=t[a+1],i(X,X,o),t[a]=X[0],t[a+1]=X[1];}return t;});},43:function _(t,e,n){"use strict";var r,i,o,a;function s(t){r||(r=document.createElement("table"),i=document.createElement("tr"),o=/^\s*<(\w+|!)[^>]*>/,a={tr:document.createElement("tbody"),tbody:r,thead:r,tfoot:r,td:i,th:i,"*":document.createElement("div")});var e=o.test(t)&&RegExp.$1;e&&e in a||(e="*");var n=a[e];t="string"==typeof t?t.replace(/(^\s*)|(\s*$)/g,""):t,n.innerHTML=""+t;var s=n.childNodes[0];return s&&n.contains(s)&&n.removeChild(s),s;}function c(t,e){if(t)for(var n in e){e.hasOwnProperty(n)&&(t.style[n]=e[n]);}return t;}n.d(e,"a",function(){return s;}),n.d(e,"b",function(){return c;});},44:function _(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function i(t){return(i="function"==typeof Symbol&&"symbol"==r(Symbol.iterator)?function(t){return r(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":r(t);})(t);}var o=n(181),a=n(185),s=[].slice,c=["keyword","gray","hex"],u={};Object.keys(a).forEach(function(t){u[s.call(a[t].labels).sort().join("")]=t;});var h={};function l(t,e){if(!(this instanceof l))return new l(t,e);if(e&&e in c&&(e=null),e&&!(e in a))throw new Error("Unknown model: "+e);var n,r,i,f,d,p,g,y,m;if(null==t)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(t instanceof l)this.model=t.model,this.color=t.color.slice(),this.valpha=t.valpha;else if("string"==typeof t){if(null===(r=o.get(t)))throw new Error("Unable to parse color from string: "+t);this.model=r.model,m=a[this.model].channels,this.color=r.value.slice(0,m),this.valpha="number"==typeof r.value[m]?r.value[m]:1;}else if(t.length)this.model=e||"rgb",m=a[this.model].channels,i=s.call(t,0,m),this.color=v(i,m),this.valpha="number"==typeof t[m]?t[m]:1;else if("number"==typeof t)t&=16777215,this.model="rgb",this.color=[t>>16&255,t>>8&255,255&t],this.valpha=1;else{if(this.valpha=1,f=Object.keys(t),"alpha"in t&&(f.splice(f.indexOf("alpha"),1),this.valpha="number"==typeof t.alpha?t.alpha:0),!((d=f.sort().join(""))in u))throw new Error("Unable to parse color from object: "+JSON.stringify(t));for(this.model=u[d],p=a[this.model].labels,g=[],n=0;n<p.length;n++){g.push(t[p[n]]);}this.color=v(g);}if(h[this.model])for(m=a[this.model].channels,n=0;n<m;n++){(y=h[this.model][n])&&(this.color[n]=y(this.color[n]));}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this);}function f(t){return function(e){return function(t,e){return Number(t.toFixed(e));}(e,t);};}function d(t,e,n){return(t=Array.isArray(t)?t:[t]).forEach(function(t){(h[t]||(h[t]=[]))[e]=n;}),t=t[0],function(r){var i;return arguments.length?(n&&(r=n(r)),(i=this[t]()).color[e]=r,i):(i=this[t]().color[e],n&&(i=n(i)),i);};}function p(t){return function(e){return Math.max(0,Math.min(t,e));};}function g(t){return Array.isArray(t)?t:[t];}function v(t,e){var n;for(n=0;n<e;n++){"number"!=typeof t[n]&&(t[n]=0);}return t;}l.prototype={toString:function toString(){return this.string();},toJSON:function toJSON(){return this[this.model]();},string:function string(t){var e=this.model in o.to?this:this.rgb(),n=1===(e=e.round("number"==typeof t?t:1)).valpha?e.color:e.color.concat(this.valpha);return o.to[e.model](n);},percentString:function percentString(t){var e=this.rgb().round("number"==typeof t?t:1),n=1===e.valpha?e.color:e.color.concat(this.valpha);return o.to.rgb.percent(n);},array:function array(){return 1===this.valpha?this.color.slice():this.color.concat(this.valpha);},object:function object(){var t,e={},n=a[this.model].channels,r=a[this.model].labels;for(t=0;t<n;t++){e[r[t]]=this.color[t];}return 1!==this.valpha&&(e.alpha=this.valpha),e;},unitArray:function unitArray(){var t=this.rgb().color;return t[0]/=255,t[1]/=255,t[2]/=255,1!==this.valpha&&t.push(this.valpha),t;},unitObject:function unitObject(){var t=this.rgb().object();return t.r/=255,t.g/=255,t.b/=255,1!==this.valpha&&(t.alpha=this.valpha),t;},round:function round(t){return t=Math.max(t||0,0),new l(this.color.map(f(t)).concat(this.valpha),this.model);},alpha:function alpha(t){return arguments.length?new l(this.color.concat(Math.max(0,Math.min(1,t))),this.model):this.valpha;},red:d("rgb",0,p(255)),green:d("rgb",1,p(255)),blue:d("rgb",2,p(255)),hue:d(["hsl","hsv","hsl","hwb","hcg"],0,function(t){return(t%360+360)%360;}),saturationl:d("hsl",1,p(100)),lightness:d("hsl",2,p(100)),saturationv:d("hsv",1,p(100)),value:d("hsv",2,p(100)),chroma:d("hcg",1,p(100)),gray:d("hcg",2,p(100)),white:d("hwb",1,p(100)),wblack:d("hwb",2,p(100)),cyan:d("cmyk",0,p(100)),magenta:d("cmyk",1,p(100)),yellow:d("cmyk",2,p(100)),black:d("cmyk",3,p(100)),x:d("xyz",0,p(100)),y:d("xyz",1,p(100)),z:d("xyz",2,p(100)),l:d("lab",0,p(100)),a:d("lab",1),b:d("lab",2),keyword:function keyword(t){return arguments.length?new l(t):a[this.model].keyword(this.color);},hex:function hex(t){return arguments.length?new l(t):o.to.hex(this.rgb().round().color);},rgbNumber:function rgbNumber(){var t=this.rgb().color;return(255&t[0])<<16|(255&t[1])<<8|255&t[2];},luminosity:function luminosity(){var t,e,n=this.rgb().color,r=[];for(t=0;t<n.length;t++){e=n[t]/255,r[t]=e<=0.03928?e/12.92:Math.pow((e+0.055)/1.055,2.4);}return 0.2126*r[0]+0.7152*r[1]+0.0722*r[2];},contrast:function contrast(t){var e=this.luminosity(),n=t.luminosity();return e>n?(e+0.05)/(n+0.05):(n+0.05)/(e+0.05);},level:function level(t){var e=this.contrast(t);return e>=7.1?"AAA":e>=4.5?"AA":"";},isDark:function isDark(){var t=this.rgb().color;return(299*t[0]+587*t[1]+114*t[2])/1e3<128;},isLight:function isLight(){return!this.isDark();},negate:function negate(){var t,e=this.rgb();for(t=0;t<3;t++){e.color[t]=255-e.color[t];}return e;},lighten:function lighten(t){var e=this.hsl();return e.color[2]+=e.color[2]*t,e;},darken:function darken(t){var e=this.hsl();return e.color[2]-=e.color[2]*t,e;},saturate:function saturate(t){var e=this.hsl();return e.color[1]+=e.color[1]*t,e;},desaturate:function desaturate(t){var e=this.hsl();return e.color[1]-=e.color[1]*t,e;},whiten:function whiten(t){var e=this.hwb();return e.color[1]+=e.color[1]*t,e;},blacken:function blacken(t){var e=this.hwb();return e.color[2]+=e.color[2]*t,e;},grayscale:function grayscale(){var t=this.rgb().color,e=0.3*t[0]+0.59*t[1]+0.11*t[2];return l.rgb(e,e,e);},fade:function fade(t){return this.alpha(this.valpha-this.valpha*t);},opaquer:function opaquer(t){return this.alpha(this.valpha+this.valpha*t);},rotate:function rotate(t){var e=this.hsl(),n=e.color[0];return n=(n=(n+t)%360)<0?360+n:n,e.color[0]=n,e;},mix:function mix(t,e){if(!t||!t.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+i(t));var n=t.rgb(),r=this.rgb(),o=void 0===e?0.5:e,a=2*o-1,s=n.alpha()-r.alpha(),c=((a*s==-1?a:(a+s)/(1+a*s))+1)/2,u=1-c;return l.rgb(c*n.red()+u*r.red(),c*n.green()+u*r.green(),c*n.blue()+u*r.blue(),n.alpha()*o+r.alpha()*(1-o));}},Object.keys(a).forEach(function(t){if(-1===c.indexOf(t)){var e=a[t].channels;l.prototype[t]=function(){if(this.model===t)return new l(this);if(arguments.length)return new l(arguments,t);var n="number"==typeof arguments[e]?e:this.valpha;return new l(g(a[this.model][t].raw(this.color)).concat(n),t);},l[t]=function(n){return"number"==typeof n&&(n=v(s.call(arguments),e)),new l(n,t);};}}),t.exports=l;},5:function _(t,e,n){"use strict";n.d(e,"b",function(){return r;}),n.d(e,"a",function(){return i;}),n.d(e,"c",function(){return o;});var r=1e-6,i="undefined"!=typeof Float32Array?Float32Array:Array,o=Math.random;Math.PI;Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;){t+=arguments[e]*arguments[e];}return Math.sqrt(t);});},51:function _(t,e,n){"use strict";var _r3,i=(_r3=function r(t,e){return(_r3=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var n in e){Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);}})(t,e);},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t;}_r3(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n());});Object.defineProperty(e,"__esModule",{value:!0}),e.getLayoutByName=e.unRegisterLayout=e.registerLayout=void 0;var o=n(53),a=n(188),s=new Map();e.registerLayout=function(t,e){var n;s.get(t)&&console.warn("The layout with the name "+t+" exists already, it will be overridden"),a.isObject(e)?(n=function(t){function n(n){var r=t.call(this)||this,i=r,o={},a=i.getDefaultCfg();return Object.assign(o,a,e,n),Object.keys(o).forEach(function(t){var e=o[t];i[t]=e;}),r;}return i(n,t),n;}(o.Base),s.set(t,n)):s.set(t,e);};e.unRegisterLayout=function(t){s.has(t)&&s.delete(t);};e.getLayoutByName=function(t){return s.has(t)?s.get(t):null;};},52:function _(t,e,n){"use strict";var _r4,i=(_r4=function r(t,e){return(_r4=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var n in e){Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);}})(t,e);},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t;}_r4(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n());});Object.defineProperty(e,"__esModule",{value:!0}),e.RandomLayout=void 0;var o=function(t){function e(e){var n=t.call(this)||this;return n.center=[0,0],n.width=300,n.height=300,n.nodes=[],n.edges=[],n.onLayoutEnd=function(){},n.updateCfg(e),n;}return i(e,t),e.prototype.getDefaultCfg=function(){return{center:[0,0],width:300,height:300};},e.prototype.execute=function(){var t=this,e=t.nodes,n=t.center;return t.width||"undefined"==typeof window||(t.width=window.innerWidth),t.height||"undefined"==typeof window||(t.height=window.innerHeight),e&&e.forEach(function(e){e.x=0.9*(Math.random()-0.5)*t.width+n[0],e.y=0.9*(Math.random()-0.5)*t.height+n[1];}),t.onLayoutEnd&&t.onLayoutEnd(),{nodes:e,edges:this.edges};},e.prototype.getType=function(){return"random";},e;}(n(53).Base);e.RandomLayout=o;},53:function _(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Base=void 0;var r=function(){function t(){this.nodes=[],this.edges=[],this.combos=[],this.positions=[],this.destroyed=!1,this.onLayoutEnd=function(){};}return t.prototype.layout=function(t){return this.init(t),this.execute(!0);},t.prototype.init=function(t){this.nodes=t.nodes||[],this.edges=t.edges||[],this.combos=t.combos||[];},t.prototype.execute=function(){},t.prototype.executeWithWorker=function(){},t.prototype.getDefaultCfg=function(){return{};},t.prototype.updateCfg=function(t){t&&Object.assign(this,t);},t.prototype.getType=function(){return"base";},t.prototype.destroy=function(){this.nodes=null,this.edges=null,this.combos=null,this.positions=null,this.destroyed=!0;},t;}();e.Base=r;},6:function _(t,e,n){"use strict";n.d(e,"d",function(){return F;}),n.d(e,"a",function(){return cn;}),n.d(e,"b",function(){return un;}),n.d(e,"c",function(){return hn;}),n.d(e,"e",function(){return r;}),n.d(e,"g",function(){return dn;}),n.d(e,"l",function(){return fn;}),n.d(e,"h",function(){return xn;}),n.d(e,"f",function(){return Sn;}),n.d(e,"j",function(){return V;}),n.d(e,"k",function(){return Z;}),n.d(e,"i",function(){return K;});var r={};n.r(r),n.d(r,"catmullRomToBezier",function(){return h;}),n.d(r,"fillPath",function(){return T;}),n.d(r,"fillPathByDiff",function(){return L;}),n.d(r,"formatPath",function(){return R;}),n.d(r,"intersection",function(){return P;}),n.d(r,"parsePathArray",function(){return m;}),n.d(r,"parsePathString",function(){return u;}),n.d(r,"pathToAbsolute",function(){return f;}),n.d(r,"pathToCurve",function(){return v;}),n.d(r,"rectPath",function(){return M;});var i={};n.r(i),n.d(i,"easeLinear",function(){return me;}),n.d(i,"easeQuad",function(){return we;}),n.d(i,"easeQuadIn",function(){return be;}),n.d(i,"easeQuadOut",function(){return xe;}),n.d(i,"easeQuadInOut",function(){return we;}),n.d(i,"easeCubic",function(){return Me;}),n.d(i,"easeCubicIn",function(){return Se;}),n.d(i,"easeCubicOut",function(){return Oe;}),n.d(i,"easeCubicInOut",function(){return Me;}),n.d(i,"easePoly",function(){return Ee;}),n.d(i,"easePolyIn",function(){return ke;}),n.d(i,"easePolyOut",function(){return Ce;}),n.d(i,"easePolyInOut",function(){return Ee;}),n.d(i,"easeSin",function(){return Te;}),n.d(i,"easeSinIn",function(){return Ae;}),n.d(i,"easeSinOut",function(){return Ie;}),n.d(i,"easeSinInOut",function(){return Te;}),n.d(i,"easeExp",function(){return De;}),n.d(i,"easeExpIn",function(){return Be;}),n.d(i,"easeExpOut",function(){return Le;}),n.d(i,"easeExpInOut",function(){return De;}),n.d(i,"easeCircle",function(){return Fe;}),n.d(i,"easeCircleIn",function(){return _e;}),n.d(i,"easeCircleOut",function(){return Re;}),n.d(i,"easeCircleInOut",function(){return Fe;}),n.d(i,"easeBounce",function(){return ze;}),n.d(i,"easeBounceIn",function(){return Xe;}),n.d(i,"easeBounceOut",function(){return ze;}),n.d(i,"easeBounceInOut",function(){return We;}),n.d(i,"easeBack",function(){return Ge;}),n.d(i,"easeBackIn",function(){return qe;}),n.d(i,"easeBackOut",function(){return Ve;}),n.d(i,"easeBackInOut",function(){return Ge;}),n.d(i,"easeElastic",function(){return Ze;}),n.d(i,"easeElasticIn",function(){return Ue;}),n.d(i,"easeElasticOut",function(){return Ze;}),n.d(i,"easeElasticInOut",function(){return Ke;});var o=n(0),a="\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029",s=new RegExp("([a-z])["+a+",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?["+a+"]*,?["+a+"]*)+)","ig"),c=new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)["+a+"]*,?["+a+"]*","ig"),u=function u(t){if(!t)return null;if(Object(o.isArray)(t))return t;var e={a:7,c:6,o:2,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,u:3,z:0},n=[];return String(t).replace(s,function(r,i,o){var a=[],s=i.toLowerCase();if(o.replace(c,function(t,e){e&&a.push(+e);}),"m"===s&&a.length>2&&(n.push([i].concat(a.splice(0,2))),s="l",i="m"===i?"l":"L"),"o"===s&&1===a.length&&n.push([i,a[0]]),"r"===s)n.push([i].concat(a));else for(;a.length>=e[s]&&(n.push([i].concat(a.splice(0,e[s]))),e[s]);){;}return t;}),n;},h=function h(t,e){for(var n=[],r=0,i=t.length;i-2*!e>r;r+=2){var o=[{x:+t[r-2],y:+t[r-1]},{x:+t[r],y:+t[r+1]},{x:+t[r+2],y:+t[r+3]},{x:+t[r+4],y:+t[r+5]}];e?r?i-4===r?o[3]={x:+t[0],y:+t[1]}:i-2===r&&(o[2]={x:+t[0],y:+t[1]},o[3]={x:+t[2],y:+t[3]}):o[0]={x:+t[i-2],y:+t[i-1]}:i-4===r?o[3]=o[2]:r||(o[0]={x:+t[r],y:+t[r+1]}),n.push(["C",(-o[0].x+6*o[1].x+o[2].x)/6,(-o[0].y+6*o[1].y+o[2].y)/6,(o[1].x+6*o[2].x-o[3].x)/6,(o[1].y+6*o[2].y-o[3].y)/6,o[2].x,o[2].y]);}return n;},l=function l(t,e,n,r,i){var o=[];if(null===i&&null===r&&(r=n),t=+t,e=+e,n=+n,r=+r,null!==i){var a=Math.PI/180,s=t+n*Math.cos(-r*a),c=t+n*Math.cos(-i*a);o=[["M",s,e+n*Math.sin(-r*a)],["A",n,n,0,+(i-r>180),0,c,e+n*Math.sin(-i*a)]];}else o=[["M",t,e],["m",0,-r],["a",n,r,0,1,1,0,2*r],["a",n,r,0,1,1,0,-2*r],["z"]];return o;},f=function f(t){if(!(t=u(t))||!t.length)return[["M",0,0]];var e,n,r=[],i=0,o=0,a=0,s=0,c=0;"M"===t[0][0]&&(a=i=+t[0][1],s=o=+t[0][2],c++,r[0]=["M",i,o]);for(var f=3===t.length&&"M"===t[0][0]&&"R"===t[1][0].toUpperCase()&&"Z"===t[2][0].toUpperCase(),d=void 0,p=void 0,g=c,v=t.length;g<v;g++){if(r.push(d=[]),(e=(p=t[g])[0])!==e.toUpperCase())switch(d[0]=e.toUpperCase(),d[0]){case"A":d[1]=p[1],d[2]=p[2],d[3]=p[3],d[4]=p[4],d[5]=p[5],d[6]=+p[6]+i,d[7]=+p[7]+o;break;case"V":d[1]=+p[1]+o;break;case"H":d[1]=+p[1]+i;break;case"R":for(var y=2,m=(n=[i,o].concat(p.slice(1))).length;y<m;y++){n[y]=+n[y]+i,n[++y]=+n[y]+o;}r.pop(),r=r.concat(h(n,f));break;case"O":r.pop(),(n=l(i,o,p[1],p[2])).push(n[0]),r=r.concat(n);break;case"U":r.pop(),r=r.concat(l(i,o,p[1],p[2],p[3])),d=["U"].concat(r[r.length-1].slice(-2));break;case"M":a=+p[1]+i,s=+p[2]+o;break;default:for(y=1,m=p.length;y<m;y++){d[y]=+p[y]+(y%2?i:o);}}else if("R"===e)n=[i,o].concat(p.slice(1)),r.pop(),r=r.concat(h(n,f)),d=["R"].concat(p.slice(-2));else if("O"===e)r.pop(),(n=l(i,o,p[1],p[2])).push(n[0]),r=r.concat(n);else if("U"===e)r.pop(),r=r.concat(l(i,o,p[1],p[2],p[3])),d=["U"].concat(r[r.length-1].slice(-2));else for(var b=0,x=p.length;b<x;b++){d[b]=p[b];}if("O"!==(e=e.toUpperCase()))switch(d[0]){case"Z":i=+a,o=+s;break;case"H":i=d[1];break;case"V":o=d[1];break;case"M":a=d[d.length-2],s=d[d.length-1];break;default:i=d[d.length-2],o=d[d.length-1];}}return r;},d=function d(t,e,n,r){return[t,e,n,r,n,r];},p=function p(t,e,n,r,i,o){return[1/3*t+2/3*n,1/3*e+2/3*r,1/3*i+2/3*n,1/3*o+2/3*r,i,o];},g=function t(e,n,r,i,o,a,s,c,u,h){r===i&&(r+=1);var l,f,d,p,g,v=120*Math.PI/180,y=Math.PI/180*(+o||0),m=[],b=function b(t,e,n){return{x:t*Math.cos(n)-e*Math.sin(n),y:t*Math.sin(n)+e*Math.cos(n)};};if(h)f=h[0],d=h[1],p=h[2],g=h[3];else{e=(l=b(e,n,-y)).x,n=l.y,c=(l=b(c,u,-y)).x,u=l.y,e===c&&n===u&&(c+=1,u+=1);var x=(e-c)/2,w=(n-u)/2,S=x*x/(r*r)+w*w/(i*i);S>1&&(r*=S=Math.sqrt(S),i*=S);var O=r*r,M=i*i,k=(a===s?-1:1)*Math.sqrt(Math.abs((O*M-O*w*w-M*x*x)/(O*w*w+M*x*x)));p=k*r*w/i+(e+c)/2,g=k*-i*x/r+(n+u)/2,f=Math.asin(((n-g)/i).toFixed(9)),d=Math.asin(((u-g)/i).toFixed(9)),f=e<p?Math.PI-f:f,d=c<p?Math.PI-d:d,f<0&&(f=2*Math.PI+f),d<0&&(d=2*Math.PI+d),s&&f>d&&(f-=2*Math.PI),!s&&d>f&&(d-=2*Math.PI);}var C=d-f;if(Math.abs(C)>v){var E=d,j=c,P=u;d=f+v*(s&&d>f?1:-1),m=t(c=p+r*Math.cos(d),u=g+i*Math.sin(d),r,i,o,0,s,j,P,[d,E,p,g]);}C=d-f;var A=Math.cos(f),I=Math.sin(f),T=Math.cos(d),N=Math.sin(d),B=Math.tan(C/4),L=4/3*r*B,D=4/3*i*B,_=[e,n],R=[e+L*I,n-D*A],F=[c+L*N,u-D*T],Y=[c,u];if(R[0]=2*_[0]-R[0],R[1]=2*_[1]-R[1],h)return[R,F,Y].concat(m);for(var X=[],z=0,W=(m=[R,F,Y].concat(m).join().split(",")).length;z<W;z++){X[z]=z%2?b(m[z-1],m[z],y).y:b(m[z],m[z+1],y).x;}return X;},v=function v(t,e){var n,r=f(t),i=e&&f(e),o={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},a={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},s=[],c=[],u="",h="",l=function l(t,e,n){var r,i;if(!t)return["C",e.x,e.y,e.x,e.y,e.x,e.y];switch(!(t[0]in{T:1,Q:1})&&(e.qx=e.qy=null),t[0]){case"M":e.X=t[1],e.Y=t[2];break;case"A":t=["C"].concat(g.apply(0,[e.x,e.y].concat(t.slice(1))));break;case"S":"C"===n||"S"===n?(r=2*e.x-e.bx,i=2*e.y-e.by):(r=e.x,i=e.y),t=["C",r,i].concat(t.slice(1));break;case"T":"Q"===n||"T"===n?(e.qx=2*e.x-e.qx,e.qy=2*e.y-e.qy):(e.qx=e.x,e.qy=e.y),t=["C"].concat(p(e.x,e.y,e.qx,e.qy,t[1],t[2]));break;case"Q":e.qx=t[1],e.qy=t[2],t=["C"].concat(p(e.x,e.y,t[1],t[2],t[3],t[4]));break;case"L":t=["C"].concat(d(e.x,e.y,t[1],t[2]));break;case"H":t=["C"].concat(d(e.x,e.y,t[1],e.y));break;case"V":t=["C"].concat(d(e.x,e.y,e.x,t[1]));break;case"Z":t=["C"].concat(d(e.x,e.y,e.X,e.Y));}return t;},v=function v(t,e){if(t[e].length>7){t[e].shift();for(var o=t[e];o.length;){s[e]="A",i&&(c[e]="A"),t.splice(e++,0,["C"].concat(o.splice(0,6)));}t.splice(e,1),n=Math.max(r.length,i&&i.length||0);}},y=function y(t,e,o,a,s){t&&e&&"M"===t[s][0]&&"M"!==e[s][0]&&(e.splice(s,0,["M",a.x,a.y]),o.bx=0,o.by=0,o.x=t[s][1],o.y=t[s][2],n=Math.max(r.length,i&&i.length||0));};n=Math.max(r.length,i&&i.length||0);for(var m=0;m<n;m++){r[m]&&(u=r[m][0]),"C"!==u&&(s[m]=u,m&&(h=s[m-1])),r[m]=l(r[m],o,h),"A"!==s[m]&&"C"===u&&(s[m]="C"),v(r,m),i&&(i[m]&&(u=i[m][0]),"C"!==u&&(c[m]=u,m&&(h=c[m-1])),i[m]=l(i[m],a,h),"A"!==c[m]&&"C"===u&&(c[m]="C"),v(i,m)),y(r,i,o,a,m),y(i,r,a,o,m);var b=r[m],x=i&&i[m],w=b.length,S=i&&x.length;o.x=b[w-2],o.y=b[w-1],o.bx=parseFloat(b[w-4])||o.x,o.by=parseFloat(b[w-3])||o.y,a.bx=i&&(parseFloat(x[S-4])||a.x),a.by=i&&(parseFloat(x[S-3])||a.y),a.x=i&&x[S-2],a.y=i&&x[S-1];}return i?[r,i]:r;},y=/,?([a-z]),?/gi,m=function m(t){return t.join(",").replace(y,"$1");},b=function b(t,e,n,r,i){return t*(t*(-3*e+9*n-9*r+3*i)+6*e-12*n+6*r)-3*e+3*n;},x=function x(t,e,n,r,i,o,a,s,c){null===c&&(c=1);for(var u=(c=c>1?1:c<0?0:c)/2,h=[-0.1252,0.1252,-0.3678,0.3678,-0.5873,0.5873,-0.7699,0.7699,-0.9041,0.9041,-0.9816,0.9816],l=[0.2491,0.2491,0.2335,0.2335,0.2032,0.2032,0.1601,0.1601,0.1069,0.1069,0.0472,0.0472],f=0,d=0;d<12;d++){var p=u*h[d]+u,g=b(p,t,n,i,a),v=b(p,e,r,o,s),y=g*g+v*v;f+=l[d]*Math.sqrt(y);}return u*f;},w=function w(t,e,n,r,i,o,a,s){for(var c,u,h,l,f=[],d=[[],[]],p=0;p<2;++p){if(0===p?(u=6*t-12*n+6*i,c=-3*t+9*n-9*i+3*a,h=3*n-3*t):(u=6*e-12*r+6*o,c=-3*e+9*r-9*o+3*s,h=3*r-3*e),Math.abs(c)<1e-12){if(Math.abs(u)<1e-12)continue;(l=-h/u)>0&&l<1&&f.push(l);}else{var g=u*u-4*h*c,v=Math.sqrt(g);if(!(g<0)){var y=(-u+v)/(2*c);y>0&&y<1&&f.push(y);var m=(-u-v)/(2*c);m>0&&m<1&&f.push(m);}}}for(var b,x=f.length,w=x;x--;){b=1-(l=f[x]),d[0][x]=b*b*b*t+3*b*b*l*n+3*b*l*l*i+l*l*l*a,d[1][x]=b*b*b*e+3*b*b*l*r+3*b*l*l*o+l*l*l*s;}return d[0][w]=t,d[1][w]=e,d[0][w+1]=a,d[1][w+1]=s,d[0].length=d[1].length=w+2,{min:{x:Math.min.apply(0,d[0]),y:Math.min.apply(0,d[1])},max:{x:Math.max.apply(0,d[0]),y:Math.max.apply(0,d[1])}};},S=function S(t,e,n,r,i,o,a,s){if(!(Math.max(t,n)<Math.min(i,a)||Math.min(t,n)>Math.max(i,a)||Math.max(e,r)<Math.min(o,s)||Math.min(e,r)>Math.max(o,s))){var c=(t-n)*(o-s)-(e-r)*(i-a);if(c){var u=((t*r-e*n)*(i-a)-(t-n)*(i*s-o*a))/c,h=((t*r-e*n)*(o-s)-(e-r)*(i*s-o*a))/c,l=+u.toFixed(2),f=+h.toFixed(2);if(!(l<+Math.min(t,n).toFixed(2)||l>+Math.max(t,n).toFixed(2)||l<+Math.min(i,a).toFixed(2)||l>+Math.max(i,a).toFixed(2)||f<+Math.min(e,r).toFixed(2)||f>+Math.max(e,r).toFixed(2)||f<+Math.min(o,s).toFixed(2)||f>+Math.max(o,s).toFixed(2)))return{x:u,y:h};}}},O=function O(t,e,n){return e>=t.x&&e<=t.x+t.width&&n>=t.y&&n<=t.y+t.height;},M=function M(t,e,n,r,i){if(i)return[["M",+t+ +i,e],["l",n-2*i,0],["a",i,i,0,0,1,i,i],["l",0,r-2*i],["a",i,i,0,0,1,-i,i],["l",2*i-n,0],["a",i,i,0,0,1,-i,-i],["l",0,2*i-r],["a",i,i,0,0,1,i,-i],["z"]];var o=[["M",t,e],["l",n,0],["l",0,r],["l",-n,0],["z"]];return o.parsePathArray=m,o;},k=function k(t,e,n,r){return null===t&&(t=e=n=r=0),null===e&&(e=t.y,n=t.width,r=t.height,t=t.x),{x:t,y:e,width:n,w:n,height:r,h:r,x2:t+n,y2:e+r,cx:t+n/2,cy:e+r/2,r1:Math.min(n,r)/2,r2:Math.max(n,r)/2,r0:Math.sqrt(n*n+r*r)/2,path:M(t,e,n,r),vb:[t,e,n,r].join(" ")};},C=function C(t,e,n,r,i,a,s,c){Object(o.isArray)(t)||(t=[t,e,n,r,i,a,s,c]);var u=w.apply(null,t);return k(u.min.x,u.min.y,u.max.x-u.min.x,u.max.y-u.min.y);},E=function E(t,e,n,r,i,o,a,s,c){var u=1-c,h=Math.pow(u,3),l=Math.pow(u,2),f=c*c,d=f*c,p=t+2*c*(n-t)+f*(i-2*n+t),g=e+2*c*(r-e)+f*(o-2*r+e),v=n+2*c*(i-n)+f*(a-2*i+n),y=r+2*c*(o-r)+f*(s-2*o+r);return{x:h*t+3*l*c*n+3*u*c*c*i+d*a,y:h*e+3*l*c*r+3*u*c*c*o+d*s,m:{x:p,y:g},n:{x:v,y:y},start:{x:u*t+c*n,y:u*e+c*r},end:{x:u*i+c*a,y:u*o+c*s},alpha:90-180*Math.atan2(p-v,g-y)/Math.PI};},j=function j(t,e,n){if(!function(t,e){return t=k(t),e=k(e),O(e,t.x,t.y)||O(e,t.x2,t.y)||O(e,t.x,t.y2)||O(e,t.x2,t.y2)||O(t,e.x,e.y)||O(t,e.x2,e.y)||O(t,e.x,e.y2)||O(t,e.x2,e.y2)||(t.x<e.x2&&t.x>e.x||e.x<t.x2&&e.x>t.x)&&(t.y<e.y2&&t.y>e.y||e.y<t.y2&&e.y>t.y);}(C(t),C(e)))return n?0:[];for(var r=~~(x.apply(0,t)/8),i=~~(x.apply(0,e)/8),o=[],a=[],s={},c=n?0:[],u=0;u<r+1;u++){var h=E.apply(0,t.concat(u/r));o.push({x:h.x,y:h.y,t:u/r});}for(u=0;u<i+1;u++){h=E.apply(0,e.concat(u/i));a.push({x:h.x,y:h.y,t:u/i});}for(u=0;u<r;u++){for(var l=0;l<i;l++){var f=o[u],d=o[u+1],p=a[l],g=a[l+1],v=Math.abs(d.x-f.x)<0.001?"y":"x",y=Math.abs(g.x-p.x)<0.001?"y":"x",m=S(f.x,f.y,d.x,d.y,p.x,p.y,g.x,g.y);if(m){if(s[m.x.toFixed(4)]===m.y.toFixed(4))continue;s[m.x.toFixed(4)]=m.y.toFixed(4);var b=f.t+Math.abs((m[v]-f[v])/(d[v]-f[v]))*(d.t-f.t),w=p.t+Math.abs((m[y]-p[y])/(g[y]-p[y]))*(g.t-p.t);b>=0&&b<=1&&w>=0&&w<=1&&(n?c+=1:c.push({x:m.x,y:m.y,t1:b,t2:w}));}}}return c;},P=function P(t,e){return function(t,e,n){var r,i,o,a,s,c,u,h,l,f;t=v(t),e=v(e);for(var d=n?0:[],p=0,g=t.length;p<g;p++){var y=t[p];if("M"===y[0])r=s=y[1],i=c=y[2];else{"C"===y[0]?(l=[r,i].concat(y.slice(1)),r=l[6],i=l[7]):(l=[r,i,r,i,s,c,s,c],r=s,i=c);for(var m=0,b=e.length;m<b;m++){var x=e[m];if("M"===x[0])o=u=x[1],a=h=x[2];else{"C"===x[0]?(f=[o,a].concat(x.slice(1)),o=f[6],a=f[7]):(f=[o,a,o,a,u,h,u,h],o=u,a=h);var w=j(l,f,n);if(n)d+=w;else{for(var S=0,O=w.length;S<O;S++){w[S].segment1=p,w[S].segment2=m,w[S].bez1=l,w[S].bez2=f;}d=d.concat(w);}}}}}return d;}(t,e);};function A(t,e){var n=[],r=[];return t.length&&function t(e,i){if(1===e.length)n.push(e[0]),r.push(e[0]);else{for(var o=[],a=0;a<e.length-1;a++){0===a&&n.push(e[0]),a===e.length-2&&r.push(e[a+1]),o[a]=[(1-i)*e[a][0]+i*e[a+1][0],(1-i)*e[a][1]+i*e[a+1][1]];}t(o,i);}}(t,e),{left:n,right:r.reverse()};}var I=function I(t,e,n){if(1===n)return[[].concat(t)];var r=[];if("L"===e[0]||"C"===e[0]||"Q"===e[0])r=r.concat(function(t,e,n){var r=[[t[1],t[2]]];n=n||2;var i=[];"A"===e[0]?(r.push(e[6]),r.push(e[7])):"C"===e[0]?(r.push([e[1],e[2]]),r.push([e[3],e[4]]),r.push([e[5],e[6]])):"S"===e[0]||"Q"===e[0]?(r.push([e[1],e[2]]),r.push([e[3],e[4]])):r.push([e[1],e[2]]);for(var o=r,a=1/n,s=0;s<n-1;s++){var c=A(o,a/(1-a*s));i.push(c.left),o=c.right;}return i.push(o),i.map(function(t){var e=[];return 4===t.length&&(e.push("C"),e=e.concat(t[2])),t.length>=3&&(3===t.length&&e.push("Q"),e=e.concat(t[1])),2===t.length&&e.push("L"),e=e.concat(t[t.length-1]);});}(t,e,n));else{var i=[].concat(t);"M"===i[0]&&(i[0]="L");for(var o=0;o<=n-1;o++){r.push(i);}}return r;},T=function T(t,e){if(1===t.length)return t;var n=t.length-1,r=e.length-1,i=n/r,o=[];if(1===t.length&&"M"===t[0][0]){for(var a=0;a<r-n;a++){t.push(t[0]);}return t;}for(a=0;a<r;a++){var s=Math.floor(i*a);o[s]=(o[s]||0)+1;}var c=o.reduce(function(e,r,i){return i===n?e.concat(t[n]):e.concat(I(t[i],t[i+1],r));},[]);return c.unshift(t[0]),"Z"!==e[r]&&"z"!==e[r]||c.push("Z"),c;},N=function N(t,e){if(t.length!==e.length)return!1;var n=!0;return Object(o.each)(t,function(t,r){if(t!==e[r])return n=!1,!1;}),n;};function B(t,e,n){var r=null,i=n;return e<i&&(i=e,r="add"),t<i&&(i=t,r="del"),{type:r,min:i};}var L=function L(t,e){var n=function(t,e){var n,r,i=t.length,o=e.length,a=0;if(0===i||0===o)return null;for(var s=[],c=0;c<=i;c++){s[c]=[],s[c][0]={min:c};}for(var u=0;u<=o;u++){s[0][u]={min:u};}for(c=1;c<=i;c++){n=t[c-1];for(u=1;u<=o;u++){r=e[u-1],a=N(n,r)?0:1;var h=s[c-1][u].min+1,l=s[c][u-1].min+1,f=s[c-1][u-1].min+a;s[c][u]=B(h,l,f);}}return s;}(t,e),r=t.length,i=e.length,o=[],a=1,s=1;if(n[r][i].min!==r){for(var c=1;c<=r;c++){var u=n[c][c].min;s=c;for(var h=a;h<=i;h++){n[c][h].min<u&&(u=n[c][h].min,s=h);}a=s,n[c][a].type&&o.push({index:c-1,type:n[c][a].type});}for(c=o.length-1;c>=0;c--){a=o[c].index,"add"===o[c].type?t.splice(a,0,[].concat(t[a])):t.splice(a,1);}}var l=i-(r=t.length);if(r<i)for(c=0;c<l;c++){"z"===t[r-1][0]||"Z"===t[r-1][0]?t.splice(r-2,0,t[r-2]):t.push(t[r-1]),r+=1;}return t;};function D(t,e,n){for(var r,i=[].concat(t),o=1/(n+1),a=_(e)[0],s=1;s<=n;s++){o*=s,0===(r=Math.floor(t.length*o))?i.unshift([a[0]*o+t[r][0]*(1-o),a[1]*o+t[r][1]*(1-o)]):i.splice(r,0,[a[0]*o+t[r][0]*(1-o),a[1]*o+t[r][1]*(1-o)]);}return i;}function _(t){var e=[];switch(t[0]){case"M":case"L":e.push([t[1],t[2]]);break;case"A":e.push([t[6],t[7]]);break;case"Q":e.push([t[3],t[4]]),e.push([t[1],t[2]]);break;case"T":e.push([t[1],t[2]]);break;case"C":e.push([t[5],t[6]]),e.push([t[1],t[2]]),e.push([t[3],t[4]]);break;case"S":e.push([t[3],t[4]]),e.push([t[1],t[2]]);break;case"H":case"V":e.push([t[1],t[1]]);}return e;}var R=function R(t,e){if(t.length<=1)return t;for(var n,r=0;r<e.length;r++){if(t[r][0]!==e[r][0])switch(n=_(t[r]),e[r][0]){case"M":t[r]=["M"].concat(n[0]);break;case"L":t[r]=["L"].concat(n[0]);break;case"A":t[r]=[].concat(e[r]),t[r][6]=n[0][0],t[r][7]=n[0][1];break;case"Q":if(n.length<2){if(!(r>0)){t[r]=e[r];break;}n=D(n,t[r-1],1);}t[r]=["Q"].concat(n.reduce(function(t,e){return t.concat(e);},[]));break;case"T":t[r]=["T"].concat(n[0]);break;case"C":if(n.length<3){if(!(r>0)){t[r]=e[r];break;}n=D(n,t[r-1],2);}t[r]=["C"].concat(n.reduce(function(t,e){return t.concat(e);},[]));break;case"S":if(n.length<2){if(!(r>0)){t[r]=e[r];break;}n=D(n,t[r-1],1);}t[r]=["S"].concat(n.reduce(function(t,e){return t.concat(e);},[]));break;default:t[r]=e[r];}}return t;},F=function(){function t(t,e){this.bubbles=!0,this.target=null,this.currentTarget=null,this.delegateTarget=null,this.delegateObject=null,this.defaultPrevented=!1,this.propagationStopped=!1,this.shape=null,this.fromShape=null,this.toShape=null,this.propagationPath=[],this.type=t,this.name=t,this.originalEvent=e,this.timeStamp=e.timeStamp;}return t.prototype.preventDefault=function(){this.defaultPrevented=!0,this.originalEvent.preventDefault&&this.originalEvent.preventDefault();},t.prototype.stopPropagation=function(){this.propagationStopped=!0;},t.prototype.toString=function(){return"[Event (type="+this.type+")]";},t.prototype.save=function(){},t.prototype.restore=function(){},t;}(),Y=n(1),X=n(73);function z(t,e){var n=t.indexOf(e);-1!==n&&t.splice(n,1);}var W="undefined"!=typeof window&&void 0!==window.document;function q(t,e){if(t.isCanvas())return!0;for(var n=e.getParent(),r=!1;n;){if(n===t){r=!0;break;}n=n.getParent();}return r;}function V(t){return t.cfg.visible&&t.cfg.capture;}var G=function(t){function e(e){var n=t.call(this)||this;n.destroyed=!1;var r=n.getDefaultCfg();return n.cfg=Object(o.mix)(r,e),n;}return Object(Y.c)(e,t),e.prototype.getDefaultCfg=function(){return{};},e.prototype.get=function(t){return this.cfg[t];},e.prototype.set=function(t,e){this.cfg[t]=e;},e.prototype.destroy=function(){this.cfg={destroyed:!0},this.off(),this.destroyed=!0;},e;}(X.a),H=n(157);function U(t,e){var n=[],r=t[0],i=t[1],o=t[2],a=t[3],s=t[4],c=t[5],u=t[6],h=t[7],l=t[8],f=e[0],d=e[1],p=e[2],g=e[3],v=e[4],y=e[5],m=e[6],b=e[7],x=e[8];return n[0]=f*r+d*a+p*u,n[1]=f*i+d*s+p*h,n[2]=f*o+d*c+p*l,n[3]=g*r+v*a+y*u,n[4]=g*i+v*s+y*h,n[5]=g*o+v*c+y*l,n[6]=m*r+b*a+x*u,n[7]=m*i+b*s+x*h,n[8]=m*o+b*c+x*l,n;}function Z(t,e){var n=[],r=e[0],i=e[1];return n[0]=t[0]*r+t[3]*i+t[6],n[1]=t[1]*r+t[4]*i+t[7],n;}function K(t){var e=[],n=t[0],r=t[1],i=t[2],o=t[3],a=t[4],s=t[5],c=t[6],u=t[7],h=t[8],l=h*a-s*u,f=-h*o+s*c,d=u*o-a*c,p=n*l+r*f+i*d;return p?(p=1/p,e[0]=l*p,e[1]=(-h*r+i*u)*p,e[2]=(s*r-i*a)*p,e[3]=f*p,e[4]=(h*n-i*c)*p,e[5]=(-s*n+i*o)*p,e[6]=d*p,e[7]=(-u*n+r*c)*p,e[8]=(a*n-r*o)*p,e):null;}var $=n(3).a.transform,Q=["zIndex","capture","visible","type"],J=["repeat"];function tt(t,e){var n={},r=e.attrs;for(var i in t){n[i]=r[i];}return n;}function et(t,e){var n={},r=e.attr();return Object(o.each)(t,function(t,e){-1!==J.indexOf(e)||Object(o.isEqual)(r[e],t)||(n[e]=t);}),n;}function nt(t,e){if(e.onFrame)return t;var n=e.startTime,r=e.delay,i=e.duration,a=Object.prototype.hasOwnProperty;return Object(o.each)(t,function(t){n+r<t.startTime+t.delay+t.duration&&i>t.delay&&Object(o.each)(e.toAttrs,function(e,n){a.call(t.toAttrs,n)&&(delete t.toAttrs[n],delete t.fromAttrs[n]);});}),t;}var rt=function(t){function e(e){var n=t.call(this,e)||this;n.attrs={};var r=n.getDefaultAttrs();return Object(o.mix)(r,e.attrs),n.attrs=r,n.initAttrs(r),n.initAnimate(),n;}return Object(Y.c)(e,t),e.prototype.getDefaultCfg=function(){return{visible:!0,capture:!0,zIndex:0};},e.prototype.getDefaultAttrs=function(){return{matrix:this.getDefaultMatrix(),opacity:1};},e.prototype.onCanvasChange=function(t){},e.prototype.initAttrs=function(t){},e.prototype.initAnimate=function(){this.set("animable",!0),this.set("animating",!1);},e.prototype.isGroup=function(){return!1;},e.prototype.getParent=function(){return this.get("parent");},e.prototype.getCanvas=function(){return this.get("canvas");},e.prototype.attr=function(){for(var t,e=[],n=0;n<arguments.length;n++){e[n]=arguments[n];}var r=e[0],i=e[1];if(!r)return this.attrs;if(Object(o.isObject)(r)){for(var a in r){this.setAttr(a,r[a]);}return this.afterAttrsChange(r),this;}return 2===e.length?(this.setAttr(r,i),this.afterAttrsChange(((t={})[r]=i,t)),this):this.attrs[r];},e.prototype.isClipped=function(t,e){var n=this.getClip();return n&&!n.isHit(t,e);},e.prototype.setAttr=function(t,e){var n=this.attrs[t];n!==e&&(this.attrs[t]=e,this.onAttrChange(t,e,n));},e.prototype.onAttrChange=function(t,e,n){"matrix"===t&&this.set("totalMatrix",null);},e.prototype.afterAttrsChange=function(t){if(this.cfg.isClipShape){var e=this.cfg.applyTo;e&&e.onCanvasChange("clip");}else this.onCanvasChange("attr");},e.prototype.show=function(){return this.set("visible",!0),this.onCanvasChange("show"),this;},e.prototype.hide=function(){return this.set("visible",!1),this.onCanvasChange("hide"),this;},e.prototype.setZIndex=function(t){this.set("zIndex",t);var e=this.getParent();return e&&e.sort(),this;},e.prototype.toFront=function(){var t=this.getParent();if(t){var e=t.getChildren(),n=(this.get("el"),e.indexOf(this));e.splice(n,1),e.push(this),this.onCanvasChange("zIndex");}},e.prototype.toBack=function(){var t=this.getParent();if(t){var e=t.getChildren(),n=(this.get("el"),e.indexOf(this));e.splice(n,1),e.unshift(this),this.onCanvasChange("zIndex");}},e.prototype.remove=function(t){void 0===t&&(t=!0);var e=this.getParent();e?(z(e.getChildren(),this),e.get("clearing")||this.onCanvasChange("remove")):this.onCanvasChange("remove"),t&&this.destroy();},e.prototype.resetMatrix=function(){this.attr("matrix",this.getDefaultMatrix()),this.onCanvasChange("matrix");},e.prototype.getMatrix=function(){return this.attr("matrix");},e.prototype.setMatrix=function(t){this.attr("matrix",t),this.onCanvasChange("matrix");},e.prototype.getTotalMatrix=function(){var t=this.cfg.totalMatrix;if(!t){var e=this.attr("matrix"),n=this.cfg.parentMatrix;t=n&&e?U(n,e):e||n,this.set("totalMatrix",t);}return t;},e.prototype.applyMatrix=function(t){var e=this.attr("matrix"),n=null;n=t&&e?U(t,e):e||t,this.set("totalMatrix",n),this.set("parentMatrix",t);},e.prototype.getDefaultMatrix=function(){return null;},e.prototype.applyToMatrix=function(t){var e=this.attr("matrix");return e?Z(e,t):t;},e.prototype.invertFromMatrix=function(t){var e=this.attr("matrix");if(e){var n=K(e);if(n)return Z(n,t);}return t;},e.prototype.setClip=function(t){var e=this.getCanvas(),n=null;if(t){var r=this.getShapeBase()[Object(o.upperFirst)(t.type)];r&&(n=new r({type:t.type,isClipShape:!0,applyTo:this,attrs:t.attrs,canvas:e}));}return this.set("clipShape",n),this.onCanvasChange("clip"),n;},e.prototype.getClip=function(){var t=this.cfg.clipShape;return t||null;},e.prototype.clone=function(){var t=this,e=this.attrs,n={};Object(o.each)(e,function(t,r){Object(o.isArray)(e[r])?n[r]=function(t){for(var e=[],n=0;n<t.length;n++){Object(o.isArray)(t[n])?e.push([].concat(t[n])):e.push(t[n]);}return e;}(e[r]):n[r]=e[r];});var r=new(0,this.constructor)({attrs:n});return Object(o.each)(Q,function(e){r.set(e,t.get(e));}),r;},e.prototype.destroy=function(){this.destroyed||(this.attrs={},t.prototype.destroy.call(this));},e.prototype.isAnimatePaused=function(){return this.get("_pause").isPaused;},e.prototype.animate=function(){for(var t=[],e=0;e<arguments.length;e++){t[e]=arguments[e];}if(this.get("timeline")||this.get("canvas")){this.set("animating",!0);var n=this.get("timeline");n||(n=this.get("canvas").get("timeline"),this.set("timeline",n));var r=this.get("animations")||[];n.timer||n.initTimer();var i,a,s,c,u,h=t[0],l=t[1],f=t[2],d=void 0===f?"easeLinear":f,p=t[3],g=void 0===p?o.noop:p,v=t[4],y=void 0===v?0:v;Object(o.isFunction)(h)?(i=h,h={}):Object(o.isObject)(h)&&h.onFrame&&(i=h.onFrame,a=h.repeat),Object(o.isObject)(l)?(l=(u=l).duration,d=u.easing||"easeLinear",y=u.delay||0,a=u.repeat||a||!1,g=u.callback||o.noop,s=u.pauseCallback||o.noop,c=u.resumeCallback||o.noop):(Object(o.isNumber)(g)&&(y=g,g=null),Object(o.isFunction)(d)?(g=d,d="easeLinear"):d=d||"easeLinear");var m=et(h,this),b={fromAttrs:tt(m,this),toAttrs:m,duration:l,easing:d,repeat:a,callback:g,pauseCallback:s,resumeCallback:c,delay:y,startTime:n.getTime(),id:Object(o.uniqueId)(),onFrame:i,pathFormatted:!1};r.length>0?r=nt(r,b):n.addAnimator(this),r.push(b),this.set("animations",r),this.set("_pause",{isPaused:!1});}},e.prototype.stopAnimate=function(t){var e=this;void 0===t&&(t=!0);var n=this.get("animations");Object(o.each)(n,function(n){t&&(n.onFrame?e.attr(n.onFrame(1)):e.attr(n.toAttrs)),n.callback&&n.callback();}),this.set("animating",!1),this.set("animations",[]);},e.prototype.pauseAnimate=function(){var t=this.get("timeline"),e=this.get("animations"),n=t.getTime();return Object(o.each)(e,function(t){t._paused=!0,t._pauseTime=n,t.pauseCallback&&t.pauseCallback();}),this.set("_pause",{isPaused:!0,pauseTime:n}),this;},e.prototype.resumeAnimate=function(){var t=this.get("timeline").getTime(),e=this.get("animations"),n=this.get("_pause").pauseTime;return Object(o.each)(e,function(e){e.startTime=e.startTime+(t-n),e._paused=!1,e._pauseTime=null,e.resumeCallback&&e.resumeCallback();}),this.set("_pause",{isPaused:!1}),this.set("animations",e),this;},e.prototype.emitDelegation=function(t,e){var n,r=this,i=e.propagationPath;this.getEvents();"mouseenter"===t?n=e.fromShape:"mouseleave"===t&&(n=e.toShape);for(var a=function a(t){var a=i[t],c=a.get("name");if(c){if((a.isGroup()||a.isCanvas&&a.isCanvas())&&n&&q(a,n))return"break";Object(o.isArray)(c)?Object(o.each)(c,function(t){r.emitDelegateEvent(a,t,e);}):s.emitDelegateEvent(a,c,e);}},s=this,c=0;c<i.length;c++){if("break"===a(c))break;}},e.prototype.emitDelegateEvent=function(t,e,n){var r=this.getEvents(),i=e+":"+n.type;(r[i]||r["*"])&&(n.name=i,n.currentTarget=t,n.delegateTarget=this,n.delegateObject=t.get("delegateObject"),this.emit(i,n));},e.prototype.translate=function(t,e){void 0===t&&(t=0),void 0===e&&(e=0);var n=this.getMatrix(),r=$(n,[["t",t,e]]);return this.setMatrix(r),this;},e.prototype.move=function(t,e){var n=this.attr("x")||0,r=this.attr("y")||0;return this.translate(t-n,e-r),this;},e.prototype.moveTo=function(t,e){return this.move(t,e);},e.prototype.scale=function(t,e){var n=this.getMatrix(),r=$(n,[["s",t,e||t]]);return this.setMatrix(r),this;},e.prototype.rotate=function(t){var e=this.getMatrix(),n=$(e,[["r",t]]);return this.setMatrix(n),this;},e.prototype.rotateAtStart=function(t){var e=this.attr(),n=e.x,r=e.y,i=this.getMatrix(),o=$(i,[["t",-n,-r],["r",t],["t",n,r]]);return this.setMatrix(o),this;},e.prototype.rotateAtPoint=function(t,e,n){var r=this.getMatrix(),i=$(r,[["t",-t,-e],["r",n],["t",t,e]]);return this.setMatrix(i),this;},e;}(G),it={};var ot=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(Y.c)(e,t),e.prototype.isCanvas=function(){return!1;},e.prototype.getBBox=function(){var t=1/0,e=-1/0,n=1/0,r=-1/0,i=[],a=[],s=this.getChildren().filter(function(t){return t.get("visible")&&(!t.isGroup()||t.isGroup()&&t.getChildren().length>0);});return s.length>0?(Object(o.each)(s,function(t){var e=t.getBBox();i.push(e.minX,e.maxX),a.push(e.minY,e.maxY);}),t=Object(o.min)(i),e=Object(o.max)(i),n=Object(o.min)(a),r=Object(o.max)(a)):(t=0,e=0,n=0,r=0),{x:t,y:n,minX:t,minY:n,maxX:e,maxY:r,width:e-t,height:r-n};},e.prototype.getCanvasBBox=function(){var t=1/0,e=-1/0,n=1/0,r=-1/0,i=[],a=[],s=this.getChildren().filter(function(t){return t.get("visible")&&(!t.isGroup()||t.isGroup()&&t.getChildren().length>0);});return s.length>0?(Object(o.each)(s,function(t){var e=t.getCanvasBBox();i.push(e.minX,e.maxX),a.push(e.minY,e.maxY);}),t=Object(o.min)(i),e=Object(o.max)(i),n=Object(o.min)(a),r=Object(o.max)(a)):(t=0,e=0,n=0,r=0),{x:t,y:n,minX:t,minY:n,maxX:e,maxY:r,width:e-t,height:r-n};},e.prototype.getDefaultCfg=function(){var e=t.prototype.getDefaultCfg.call(this);return e.children=[],e;},e.prototype.onAttrChange=function(e,n,r){if(t.prototype.onAttrChange.call(this,e,n,r),"matrix"===e){var i=this.getTotalMatrix();this._applyChildrenMarix(i);}},e.prototype.applyMatrix=function(e){var n=this.getTotalMatrix();t.prototype.applyMatrix.call(this,e);var r=this.getTotalMatrix();r!==n&&this._applyChildrenMarix(r);},e.prototype._applyChildrenMarix=function(t){var e=this.getChildren();Object(o.each)(e,function(e){e.applyMatrix(t);});},e.prototype.addShape=function(){for(var t=[],e=0;e<arguments.length;e++){t[e]=arguments[e];}var n=t[0],r=t[1];Object(o.isObject)(n)?r=n:r.type=n;var i=it[r.type];i||(i=Object(o.upperFirst)(r.type),it[r.type]=i);var a=this.getShapeBase(),s=new a[i](r);return this.add(s),s;},e.prototype.addGroup=function(){for(var t=[],e=0;e<arguments.length;e++){t[e]=arguments[e];}var n,r=t[0],i=t[1];if(Object(o.isFunction)(r))n=new r(i||{parent:this});else{var a=r||{},s=this.getGroupBase();n=new s(a);}return this.add(n),n;},e.prototype.getCanvas=function(){return this.isCanvas()?this:this.get("canvas");},e.prototype.getShape=function(t,e,n){if(!V(this))return null;var r,i=this.getChildren();if(this.isCanvas())r=this._findShape(i,t,e,n);else{var o=[t,e,1];o=this.invertFromMatrix(o),this.isClipped(o[0],o[1])||(r=this._findShape(i,o[0],o[1],n));}return r;},e.prototype._findShape=function(t,e,n,r){for(var i=null,o=t.length-1;o>=0;o--){var a=t[o];if(V(a)&&(a.isGroup()?i=a.getShape(e,n,r):a.isHit(e,n)&&(i=a)),i)break;}return i;},e.prototype.add=function(t){var e=this.getCanvas(),n=this.getChildren(),r=this.get("timeline"),i=t.getParent();i&&function(t,e,n){void 0===n&&(n=!0),n?e.destroy():(e.set("parent",null),e.set("canvas",null)),z(t.getChildren(),e);}(i,t,!1),t.set("parent",this),e&&function t(e,n){if(e.set("canvas",n),e.isGroup()){var r=e.get("children");r.length&&r.forEach(function(e){t(e,n);});}}(t,e),r&&function t(e,n){if(e.set("timeline",n),e.isGroup()){var r=e.get("children");r.length&&r.forEach(function(e){t(e,n);});}}(t,r),n.push(t),t.onCanvasChange("add"),this._applyElementMatrix(t);},e.prototype._applyElementMatrix=function(t){var e=this.getTotalMatrix();e&&t.applyMatrix(e);},e.prototype.getChildren=function(){return this.get("children");},e.prototype.sort=function(){var t,e=this.getChildren();Object(o.each)(e,function(t,e){return t._INDEX=e,t;}),e.sort((t=function t(_t2,e){return _t2.get("zIndex")-e.get("zIndex");},function(e,n){var r=t(e,n);return 0===r?e._INDEX-n._INDEX:r;})),this.onCanvasChange("sort");},e.prototype.clear=function(){if(this.set("clearing",!0),!this.destroyed){for(var t=this.getChildren(),e=t.length-1;e>=0;e--){t[e].destroy();}this.set("children",[]),this.onCanvasChange("clear"),this.set("clearing",!1);}},e.prototype.destroy=function(){this.get("destroyed")||(this.clear(),t.prototype.destroy.call(this));},e.prototype.getFirst=function(){return this.getChildByIndex(0);},e.prototype.getLast=function(){var t=this.getChildren();return this.getChildByIndex(t.length-1);},e.prototype.getChildByIndex=function(t){return this.getChildren()[t];},e.prototype.getCount=function(){return this.getChildren().length;},e.prototype.contain=function(t){return this.getChildren().indexOf(t)>-1;},e.prototype.removeChild=function(t,e){void 0===e&&(e=!0),this.contain(t)&&t.remove(e);},e.prototype.findAll=function(t){var e=[],n=this.getChildren();return Object(o.each)(n,function(n){t(n)&&e.push(n),n.isGroup()&&(e=e.concat(n.findAll(t)));}),e;},e.prototype.find=function(t){var e=null,n=this.getChildren();return Object(o.each)(n,function(n){if(t(n)?e=n:n.isGroup()&&(e=n.find(t)),e)return!1;}),e;},e.prototype.findById=function(t){return this.find(function(e){return e.get("id")===t;});},e.prototype.findByClassName=function(t){return this.find(function(e){return e.get("className")===t;});},e.prototype.findAllByName=function(t){return this.findAll(function(e){return e.get("name")===t;});},e;}(rt);function at(t){return(at="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}var st,ct,ut=0,ht=0,lt=0,ft=0,dt=0,pt=0,gt="object"===("undefined"==typeof performance?"undefined":at(performance))&&performance.now?performance:Date,vt="object"===("undefined"==typeof window?"undefined":at(window))&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17);};function yt(){return dt||(vt(mt),dt=gt.now()+pt);}function mt(){dt=0;}function bt(){this._call=this._time=this._next=null;}function xt(t,e,n){var r=new bt();return r.restart(t,e,n),r;}function wt(){dt=(ft=gt.now())+pt,ut=ht=0;try{!function(){yt(),++ut;for(var t,e=st;e;){(t=dt-e._time)>=0&&e._call.call(null,t),e=e._next;}--ut;}();}finally{ut=0,function(){var t,e,n=st,r=1/0;for(;n;){n._call?(r>n._time&&(r=n._time),t=n,n=n._next):(e=n._next,n._next=null,n=t?t._next=e:st=e);}ct=t,Ot(r);}(),dt=0;}}function St(){var t=gt.now(),e=t-ft;e>1e3&&(pt-=e,ft=t);}function Ot(t){ut||(ht&&(ht=clearTimeout(ht)),t-dt>24?(t<1/0&&(ht=setTimeout(wt,t-gt.now()-pt)),lt&&(lt=clearInterval(lt))):(lt||(ft=gt.now(),lt=setInterval(St,1e3)),ut=1,vt(wt)));}bt.prototype=xt.prototype={constructor:bt,restart:function restart(t,e,n){if("function"!=typeof t)throw new TypeError("callback is not a function");n=(null==n?yt():+n)+(null==e?0:+e),this._next||ct===this||(ct?ct._next=this:st=this,ct=this),this._call=t,this._time=n,Ot();},stop:function stop(){this._call&&(this._call=null,this._time=1/0,Ot());}};var Mt=function Mt(t,e,n){t.prototype=e.prototype=n,n.constructor=t;};function kt(t,e){var n=Object.create(t.prototype);for(var r in e){n[r]=e[r];}return n;}function Ct(){}var Et="\\s*([+-]?\\d+)\\s*",jt="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",Pt="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",At=/^#([0-9a-f]{3,8})$/,It=new RegExp("^rgb\\("+[Et,Et,Et]+"\\)$"),Tt=new RegExp("^rgb\\("+[Pt,Pt,Pt]+"\\)$"),Nt=new RegExp("^rgba\\("+[Et,Et,Et,jt]+"\\)$"),Bt=new RegExp("^rgba\\("+[Pt,Pt,Pt,jt]+"\\)$"),Lt=new RegExp("^hsl\\("+[jt,Pt,Pt]+"\\)$"),Dt=new RegExp("^hsla\\("+[jt,Pt,Pt,jt]+"\\)$"),_t={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function Rt(){return this.rgb().formatHex();}function Ft(){return this.rgb().formatRgb();}function Yt(t){var e,n;return t=(t+"").trim().toLowerCase(),(e=At.exec(t))?(n=e[1].length,e=parseInt(e[1],16),6===n?Xt(e):3===n?new Vt(e>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1):8===n?zt(e>>24&255,e>>16&255,e>>8&255,(255&e)/255):4===n?zt(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|240&e,((15&e)<<4|15&e)/255):null):(e=It.exec(t))?new Vt(e[1],e[2],e[3],1):(e=Tt.exec(t))?new Vt(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=Nt.exec(t))?zt(e[1],e[2],e[3],e[4]):(e=Bt.exec(t))?zt(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=Lt.exec(t))?Zt(e[1],e[2]/100,e[3]/100,1):(e=Dt.exec(t))?Zt(e[1],e[2]/100,e[3]/100,e[4]):_t.hasOwnProperty(t)?Xt(_t[t]):"transparent"===t?new Vt(NaN,NaN,NaN,0):null;}function Xt(t){return new Vt(t>>16&255,t>>8&255,255&t,1);}function zt(t,e,n,r){return r<=0&&(t=e=n=NaN),new Vt(t,e,n,r);}function Wt(t){return t instanceof Ct||(t=Yt(t)),t?new Vt((t=t.rgb()).r,t.g,t.b,t.opacity):new Vt();}function qt(t,e,n,r){return 1===arguments.length?Wt(t):new Vt(t,e,n,null==r?1:r);}function Vt(t,e,n,r){this.r=+t,this.g=+e,this.b=+n,this.opacity=+r;}function Gt(){return"#"+Ut(this.r)+Ut(this.g)+Ut(this.b);}function Ht(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")");}function Ut(t){return((t=Math.max(0,Math.min(255,Math.round(t)||0)))<16?"0":"")+t.toString(16);}function Zt(t,e,n,r){return r<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new $t(t,e,n,r);}function Kt(t){if(t instanceof $t)return new $t(t.h,t.s,t.l,t.opacity);if(t instanceof Ct||(t=Yt(t)),!t)return new $t();if(t instanceof $t)return t;var e=(t=t.rgb()).r/255,n=t.g/255,r=t.b/255,i=Math.min(e,n,r),o=Math.max(e,n,r),a=NaN,s=o-i,c=(o+i)/2;return s?(a=e===o?(n-r)/s+6*(n<r):n===o?(r-e)/s+2:(e-n)/s+4,s/=c<0.5?o+i:2-o-i,a*=60):s=c>0&&c<1?0:a,new $t(a,s,c,t.opacity);}function $t(t,e,n,r){this.h=+t,this.s=+e,this.l=+n,this.opacity=+r;}function Qt(t,e,n){return 255*(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e);}function Jt(t,e,n,r,i){var o=t*t,a=o*t;return((1-3*t+3*o-a)*e+(4-6*o+3*a)*n+(1+3*t+3*o-3*a)*r+a*i)/6;}Mt(Ct,Yt,{copy:function copy(t){return Object.assign(new this.constructor(),this,t);},displayable:function displayable(){return this.rgb().displayable();},hex:Rt,formatHex:Rt,formatHsl:function formatHsl(){return Kt(this).formatHsl();},formatRgb:Ft,toString:Ft}),Mt(Vt,qt,kt(Ct,{brighter:function brighter(t){return t=null==t?1/0.7:Math.pow(1/0.7,t),new Vt(this.r*t,this.g*t,this.b*t,this.opacity);},darker:function darker(t){return t=null==t?0.7:Math.pow(0.7,t),new Vt(this.r*t,this.g*t,this.b*t,this.opacity);},rgb:function rgb(){return this;},displayable:function displayable(){return-0.5<=this.r&&this.r<255.5&&-0.5<=this.g&&this.g<255.5&&-0.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1;},hex:Gt,formatHex:Gt,formatRgb:Ht,toString:Ht})),Mt($t,function(t,e,n,r){return 1===arguments.length?Kt(t):new $t(t,e,n,null==r?1:r);},kt(Ct,{brighter:function brighter(t){return t=null==t?1/0.7:Math.pow(1/0.7,t),new $t(this.h,this.s,this.l*t,this.opacity);},darker:function darker(t){return t=null==t?0.7:Math.pow(0.7,t),new $t(this.h,this.s,this.l*t,this.opacity);},rgb:function rgb(){var t=this.h%360+360*(this.h<0),e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<0.5?n:1-n)*e,i=2*n-r;return new Vt(Qt(t>=240?t-240:t+120,i,r),Qt(t,i,r),Qt(t<120?t+240:t-120,i,r),this.opacity);},displayable:function displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1;},formatHsl:function formatHsl(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===t?")":", "+t+")");}}));var te=function te(t){return function(){return t;};};function ee(t,e){return function(n){return t+n*e;};}function ne(t){return 1==(t=+t)?re:function(e,n){return n-e?function(t,e,n){return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(r){return Math.pow(t+r*e,n);};}(e,n,t):te(isNaN(e)?n:e);};}function re(t,e){var n=e-t;return n?ee(t,n):te(isNaN(t)?e:t);}var ie=function t(e){var n=ne(e);function r(t,e){var r=n((t=qt(t)).r,(e=qt(e)).r),i=n(t.g,e.g),o=n(t.b,e.b),a=re(t.opacity,e.opacity);return function(e){return t.r=r(e),t.g=i(e),t.b=o(e),t.opacity=a(e),t+"";};}return r.gamma=t,r;}(1);function oe(t){return function(e){var n,r,i=e.length,o=new Array(i),a=new Array(i),s=new Array(i);for(n=0;n<i;++n){r=qt(e[n]),o[n]=r.r||0,a[n]=r.g||0,s[n]=r.b||0;}return o=t(o),a=t(a),s=t(s),r.opacity=1,function(t){return r.r=o(t),r.g=a(t),r.b=s(t),r+"";};};}oe(function(t){var e=t.length-1;return function(n){var r=n<=0?n=0:n>=1?(n=1,e-1):Math.floor(n*e),i=t[r],o=t[r+1],a=r>0?t[r-1]:2*i-o,s=r<e-1?t[r+2]:2*o-i;return Jt((n-r/e)*e,a,i,o,s);};}),oe(function(t){var e=t.length;return function(n){var r=Math.floor(((n%=1)<0?++n:n)*e),i=t[(r+e-1)%e],o=t[r%e],a=t[(r+1)%e],s=t[(r+2)%e];return Jt((n-r/e)*e,i,o,a,s);};});var ae=function ae(t,e){e||(e=[]);var n,r=t?Math.min(e.length,t.length):0,i=e.slice();return function(o){for(n=0;n<r;++n){i[n]=t[n]*(1-o)+e[n]*o;}return i;};};function se(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView);}function ce(t,e){var n,r=e?e.length:0,i=t?Math.min(r,t.length):0,o=new Array(i),a=new Array(r);for(n=0;n<i;++n){o[n]=ye(t[n],e[n]);}for(;n<r;++n){a[n]=e[n];}return function(t){for(n=0;n<i;++n){a[n]=o[n](t);}return a;};}var ue=function ue(t,e){var n=new Date();return t=+t,e=+e,function(r){return n.setTime(t*(1-r)+e*r),n;};},he=function he(t,e){return t=+t,e=+e,function(n){return t*(1-n)+e*n;};};function le(t){return(le="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}var fe=function fe(t,e){var n,r={},i={};for(n in null!==t&&"object"===le(t)||(t={}),null!==e&&"object"===le(e)||(e={}),e){n in t?r[n]=ye(t[n],e[n]):i[n]=e[n];}return function(t){for(n in r){i[n]=r[n](t);}return i;};},de=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,pe=new RegExp(de.source,"g");var ge=function ge(t,e){var n,r,i,o=de.lastIndex=pe.lastIndex=0,a=-1,s=[],c=[];for(t+="",e+="";(n=de.exec(t))&&(r=pe.exec(e));){(i=r.index)>o&&(i=e.slice(o,i),s[a]?s[a]+=i:s[++a]=i),(n=n[0])===(r=r[0])?s[a]?s[a]+=r:s[++a]=r:(s[++a]=null,c.push({i:a,x:he(n,r)})),o=pe.lastIndex;}return o<e.length&&(i=e.slice(o),s[a]?s[a]+=i:s[++a]=i),s.length<2?c[0]?function(t){return function(e){return t(e)+"";};}(c[0].x):function(t){return function(){return t;};}(e):(e=c.length,function(t){for(var n,r=0;r<e;++r){s[(n=c[r]).i]=n.x(t);}return s.join("");});};function ve(t){return(ve="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}var ye=function ye(t,e){var n,r=ve(e);return null==e||"boolean"===r?te(e):("number"===r?he:"string"===r?(n=Yt(e))?(e=n,ie):ge:e instanceof Yt?ie:e instanceof Date?ue:se(e)?ae:Array.isArray(e)?ce:"function"!=typeof e.valueOf&&"function"!=typeof e.toString||isNaN(e)?fe:he)(t,e);};function me(t){return+t;}function be(t){return t*t;}function xe(t){return t*(2-t);}function we(t){return((t*=2)<=1?t*t:--t*(2-t)+1)/2;}function Se(t){return t*t*t;}function Oe(t){return--t*t*t+1;}function Me(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2;}var ke=function t(e){function n(t){return Math.pow(t,e);}return e=+e,n.exponent=t,n;}(3),Ce=function t(e){function n(t){return 1-Math.pow(1-t,e);}return e=+e,n.exponent=t,n;}(3),Ee=function t(e){function n(t){return((t*=2)<=1?Math.pow(t,e):2-Math.pow(2-t,e))/2;}return e=+e,n.exponent=t,n;}(3),je=Math.PI,Pe=je/2;function Ae(t){return 1==+t?1:1-Math.cos(t*Pe);}function Ie(t){return Math.sin(t*Pe);}function Te(t){return(1-Math.cos(je*t))/2;}function Ne(t){return 1.0009775171065494*(Math.pow(2,-10*t)-0.0009765625);}function Be(t){return Ne(1-+t);}function Le(t){return 1-Ne(t);}function De(t){return((t*=2)<=1?Ne(1-t):2-Ne(t-1))/2;}function _e(t){return 1-Math.sqrt(1-t*t);}function Re(t){return Math.sqrt(1- --t*t);}function Fe(t){return((t*=2)<=1?1-Math.sqrt(1-t*t):Math.sqrt(1-(t-=2)*t)+1)/2;}var Ye=7.5625;function Xe(t){return 1-ze(1-t);}function ze(t){return(t=+t)<4/11?Ye*t*t:t<8/11?Ye*(t-=6/11)*t+3/4:t<10/11?Ye*(t-=9/11)*t+15/16:Ye*(t-=21/22)*t+63/64;}function We(t){return((t*=2)<=1?1-ze(1-t):ze(t-1)+1)/2;}var qe=function t(e){function n(t){return(t=+t)*t*(e*(t-1)+t);}return e=+e,n.overshoot=t,n;}(1.70158),Ve=function t(e){function n(t){return--t*t*((t+1)*e+t)+1;}return e=+e,n.overshoot=t,n;}(1.70158),Ge=function t(e){function n(t){return((t*=2)<1?t*t*((e+1)*t-e):(t-=2)*t*((e+1)*t+e)+2)/2;}return e=+e,n.overshoot=t,n;}(1.70158),He=2*Math.PI,Ue=function t(e,n){var r=Math.asin(1/(e=Math.max(1,e)))*(n/=He);function i(t){return e*Ne(- --t)*Math.sin((r-t)/n);}return i.amplitude=function(e){return t(e,n*He);},i.period=function(n){return t(e,n);},i;}(1,0.3),Ze=function t(e,n){var r=Math.asin(1/(e=Math.max(1,e)))*(n/=He);function i(t){return 1-e*Ne(t=+t)*Math.sin((t+r)/n);}return i.amplitude=function(e){return t(e,n*He);},i.period=function(n){return t(e,n);},i;}(1,0.3),Ke=function t(e,n){var r=Math.asin(1/(e=Math.max(1,e)))*(n/=He);function i(t){return((t=2*t-1)<0?e*Ne(-t)*Math.sin((r-t)/n):2-e*Ne(t)*Math.sin((r+t)/n))/2;}return i.amplitude=function(e){return t(e,n*He);},i.period=function(n){return t(e,n);},i;}(1,0.3),$e={};var Qe=[1,0,0,0,1,0,0,0,1];function Je(t,e,n){var r,a=e.startTime;if(n<a+e.delay||e._paused)return!1;var s,c=e.duration,h=e.easing,l=$e[(s=h).toLowerCase()]||i[s];if(n=n-a-e.delay,e.repeat)r=l(r=n%c/c);else{if(!((r=n/c)<1))return e.onFrame?t.attr(e.onFrame(1)):t.attr(e.toAttrs),!0;r=l(r);}if(e.onFrame){var f=e.onFrame(r);t.attr(f);}else!function(t,e,n){var r={},i=e.fromAttrs,a=e.toAttrs;if(!t.destroyed){var s,c,h,l;for(var f in a){if(!Object(o.isEqual)(i[f],a[f]))if("path"===f){var d=a[f],p=i[f];d.length>p.length?(d=u(a[f]),p=u(i[f]),p=L(p,d),p=R(p,d),e.fromAttrs.path=p,e.toAttrs.path=d):e.pathFormatted||(d=u(a[f]),p=u(i[f]),p=R(p,d),e.fromAttrs.path=p,e.toAttrs.path=d,e.pathFormatted=!0),r[f]=[];for(var g=0;g<d.length;g++){for(var v=d[g],y=p[g],m=[],b=0;b<v.length;b++){Object(o.isNumber)(v[b])&&y&&Object(o.isNumber)(y[b])?(s=ye(y[b],v[b]),m.push(s(n))):m.push(v[b]);}r[f].push(m);}}else if("matrix"===f){var x=(h=i[f]||Qe,(se(l=a[f]||Qe)?ae:ce)(h,l))(n);r[f]=x;}else["fill","stroke","fillStyle","strokeStyle"].includes(f)&&(c=a[f],/^[r,R,L,l]{1}[\s]*\(/.test(c))?r[f]=a[f]:Object(o.isFunction)(a[f])||(s=ye(i[f],a[f]),r[f]=s(n));}t.attr(r);}}(t,e,r);return!1;}var tn=function(){function t(t){this.animators=[],this.current=0,this.timer=null,this.canvas=t;}return t.prototype.initTimer=function(){var t,e,n,r=this;this.timer=xt(function(i){if(r.current=i,r.animators.length>0){for(var o=r.animators.length-1;o>=0;o--){if((t=r.animators[o]).destroyed)r.removeAnimator(o);else{if(!t.isAnimatePaused())for(var a=(e=t.get("animations")).length-1;a>=0;a--){n=e[a],Je(t,n,i)&&(e.splice(a,1),!1,n.callback&&n.callback());}0===e.length&&r.removeAnimator(o);}}r.canvas.get("autoDraw")||r.canvas.draw();}});},t.prototype.addAnimator=function(t){this.animators.push(t);},t.prototype.removeAnimator=function(t){this.animators.splice(t,1);},t.prototype.isAnimating=function(){return!!this.animators.length;},t.prototype.stop=function(){this.timer&&this.timer.stop();},t.prototype.stopAllAnimations=function(t){void 0===t&&(t=!0),this.animators.forEach(function(e){e.stopAnimate(t);}),this.animators=[],this.canvas.draw();},t.prototype.getTime=function(){return this.current;},t;}(),en=["mousedown","mouseup","dblclick","mouseout","mouseover","mousemove","mouseleave","mouseenter","touchstart","touchmove","touchend","dragenter","dragover","dragleave","drop","contextmenu","mousewheel"];function nn(t,e,n){n.name=e,n.target=t,n.currentTarget=t,n.delegateTarget=t,t.emit(e,n);}function rn(t,e,n){if(n.bubbles){var r=void 0,i=!1;if("mouseenter"===e?(r=n.fromShape,i=!0):"mouseleave"===e&&(i=!0,r=n.toShape),t.isCanvas()&&i)return;if(r&&q(t,r))return void(n.bubbles=!1);n.name=e,n.currentTarget=t,n.delegateTarget=t,t.emit(e,n);}}var on=function(){function t(t){var e=this;this.draggingShape=null,this.dragging=!1,this.currentShape=null,this.mousedownShape=null,this.mousedownPoint=null,this._eventCallback=function(t){var n=t.type;e._triggerEvent(n,t);},this._onDocumentMove=function(t){if(e.canvas.get("el")!==t.target&&(e.dragging||e.currentShape)){var n=e._getPointInfo(t);e.dragging&&e._emitEvent("drag",t,n,e.draggingShape);}},this._onDocumentMouseUp=function(t){if(e.canvas.get("el")!==t.target&&e.dragging){var n=e._getPointInfo(t);e.draggingShape&&e._emitEvent("drop",t,n,null),e._emitEvent("dragend",t,n,e.draggingShape),e._afterDrag(e.draggingShape,n,t);}},this.canvas=t.canvas;}return t.prototype.init=function(){this._bindEvents();},t.prototype._bindEvents=function(){var t=this,e=this.canvas.get("el");Object(o.each)(en,function(n){e.addEventListener(n,t._eventCallback);}),document&&(document.addEventListener("mousemove",this._onDocumentMove),document.addEventListener("mouseup",this._onDocumentMouseUp));},t.prototype._clearEvents=function(){var t=this,e=this.canvas.get("el");Object(o.each)(en,function(n){e.removeEventListener(n,t._eventCallback);}),document&&(document.removeEventListener("mousemove",this._onDocumentMove),document.removeEventListener("mouseup",this._onDocumentMouseUp));},t.prototype._getEventObj=function(t,e,n,r,i,o){var a=new F(t,e);return a.fromShape=i,a.toShape=o,a.x=n.x,a.y=n.y,a.clientX=n.clientX,a.clientY=n.clientY,a.propagationPath.push(r),a;},t.prototype._getShape=function(t,e){return this.canvas.getShape(t.x,t.y,e);},t.prototype._getPointInfo=function(t){var e=this.canvas,n=e.getClientByEvent(t),r=e.getPointByEvent(t);return{x:r.x,y:r.y,clientX:n.x,clientY:n.y};},t.prototype._triggerEvent=function(t,e){var n=this._getPointInfo(e),r=this._getShape(n,e),i=this["_on"+t],o=!1;if(i)i.call(this,n,r,e);else{var a=this.currentShape;"mouseenter"===t||"dragenter"===t||"mouseover"===t?(this._emitEvent(t,e,n,null,null,r),r&&this._emitEvent(t,e,n,r,null,r),"mouseenter"===t&&this.draggingShape&&this._emitEvent("dragenter",e,n,null)):"mouseleave"===t||"dragleave"===t||"mouseout"===t?(o=!0,a&&this._emitEvent(t,e,n,a,a,null),this._emitEvent(t,e,n,null,a,null),"mouseleave"===t&&this.draggingShape&&this._emitEvent("dragleave",e,n,null)):this._emitEvent(t,e,n,r,null,null);}if(o||(this.currentShape=r),r&&!r.get("destroyed")){var s=this.canvas;s.get("el").style.cursor=r.attr("cursor")||s.get("cursor");}},t.prototype._onmousedown=function(t,e,n){0===n.button&&(this.mousedownShape=e,this.mousedownPoint=t,this.mousedownTimeStamp=n.timeStamp),this._emitEvent("mousedown",n,t,e,null,null);},t.prototype._emitMouseoverEvents=function(t,e,n,r){var i=this.canvas.get("el");n!==r&&(n&&(this._emitEvent("mouseout",t,e,n,n,r),this._emitEvent("mouseleave",t,e,n,n,r),r&&!r.get("destroyed")||(i.style.cursor=this.canvas.get("cursor"))),r&&(this._emitEvent("mouseover",t,e,r,n,r),this._emitEvent("mouseenter",t,e,r,n,r)));},t.prototype._emitDragoverEvents=function(t,e,n,r,i){r?(r!==n&&(n&&this._emitEvent("dragleave",t,e,n,n,r),this._emitEvent("dragenter",t,e,r,n,r)),i||this._emitEvent("dragover",t,e,r)):n&&this._emitEvent("dragleave",t,e,n,n,r),i&&this._emitEvent("dragover",t,e,r);},t.prototype._afterDrag=function(t,e,n){t&&(t.set("capture",!0),this.draggingShape=null),this.dragging=!1;var r=this._getShape(e,n);r!==t&&this._emitMouseoverEvents(n,e,t,r),this.currentShape=r;},t.prototype._onmouseup=function(t,e,n){if(0===n.button){var r=this.draggingShape;this.dragging?(r&&this._emitEvent("drop",n,t,e),this._emitEvent("dragend",n,t,r),this._afterDrag(r,t,n)):(this._emitEvent("mouseup",n,t,e),e===this.mousedownShape&&this._emitEvent("click",n,t,e),this.mousedownShape=null,this.mousedownPoint=null);}},t.prototype._ondragover=function(t,e,n){n.preventDefault();var r=this.currentShape;this._emitDragoverEvents(n,t,r,e,!0);},t.prototype._onmousemove=function(t,e,n){var r=this.canvas,i=this.currentShape,o=this.draggingShape;if(this.dragging)o&&this._emitDragoverEvents(n,t,i,e,!1),this._emitEvent("drag",n,t,o);else{var a=this.mousedownPoint;if(a){var s=this.mousedownShape,c=n.timeStamp-this.mousedownTimeStamp,u=a.clientX-t.clientX,h=a.clientY-t.clientY;c>120||u*u+h*h>40?s&&s.get("draggable")?((o=this.mousedownShape).set("capture",!1),this.draggingShape=o,this.dragging=!0,this._emitEvent("dragstart",n,t,o),this.mousedownShape=null,this.mousedownPoint=null):!s&&r.get("draggable")?(this.dragging=!0,this._emitEvent("dragstart",n,t,null),this.mousedownShape=null,this.mousedownPoint=null):(this._emitMouseoverEvents(n,t,i,e),this._emitEvent("mousemove",n,t,e)):(this._emitMouseoverEvents(n,t,i,e),this._emitEvent("mousemove",n,t,e));}else this._emitMouseoverEvents(n,t,i,e),this._emitEvent("mousemove",n,t,e);}},t.prototype._emitEvent=function(t,e,n,r,i,o){var a=this._getEventObj(t,e,n,r,i,o);if(r){a.shape=r,nn(r,t,a);for(var s=r.getParent();s;){s.emitDelegation(t,a),a.propagationStopped||rn(s,t,a),a.propagationPath.push(s),s=s.getParent();}}else{nn(this.canvas,t,a);}},t.prototype.destroy=function(){this._clearEvents(),this.canvas=null,this.currentShape=null,this.draggingShape=null,this.mousedownPoint=null,this.mousedownShape=null,this.mousedownTimeStamp=null;},t;}(),an=Object(H.a)(),sn=an&&"firefox"===an.name,cn=function(t){function e(e){var n=t.call(this,e)||this;return n.initContainer(),n.initDom(),n.initEvents(),n.initTimeline(),n;}return Object(Y.c)(e,t),e.prototype.getDefaultCfg=function(){var e=t.prototype.getDefaultCfg.call(this);return e.cursor="default",e.supportCSSTransform=!1,e;},e.prototype.initContainer=function(){var t=this.get("container");Object(o.isString)(t)&&(t=document.getElementById(t),this.set("container",t));},e.prototype.initDom=function(){var t=this.createDom();this.set("el",t),this.get("container").appendChild(t),this.setDOMSize(this.get("width"),this.get("height"));},e.prototype.initEvents=function(){var t=new on({canvas:this});t.init(),this.set("eventController",t);},e.prototype.initTimeline=function(){var t=new tn(this);this.set("timeline",t);},e.prototype.setDOMSize=function(t,e){var n=this.get("el");W&&(n.style.width=t+"px",n.style.height=e+"px");},e.prototype.changeSize=function(t,e){this.setDOMSize(t,e),this.set("width",t),this.set("height",e),this.onCanvasChange("changeSize");},e.prototype.getRenderer=function(){return this.get("renderer");},e.prototype.getCursor=function(){return this.get("cursor");},e.prototype.setCursor=function(t){this.set("cursor",t);var e=this.get("el");W&&e&&(e.style.cursor=t);},e.prototype.getPointByEvent=function(t){if(this.get("supportCSSTransform")){if(sn&&!Object(o.isNil)(t.layerX)&&t.layerX!==t.offsetX)return{x:t.layerX,y:t.layerY};if(!Object(o.isNil)(t.offsetX))return{x:t.offsetX,y:t.offsetY};}var e=this.getClientByEvent(t),n=e.x,r=e.y;return this.getPointByClient(n,r);},e.prototype.getClientByEvent=function(t){var e=t;return t.touches&&(e="touchend"===t.type?t.changedTouches[0]:t.touches[0]),{x:e.clientX,y:e.clientY};},e.prototype.getPointByClient=function(t,e){var n=this.get("el").getBoundingClientRect();return{x:t-n.left,y:e-n.top};},e.prototype.getClientByPoint=function(t,e){var n=this.get("el").getBoundingClientRect();return{x:t+n.left,y:e+n.top};},e.prototype.draw=function(){},e.prototype.removeDom=function(){var t=this.get("el");t.parentNode.removeChild(t);},e.prototype.clearEvents=function(){this.get("eventController").destroy();},e.prototype.isCanvas=function(){return!0;},e.prototype.getParent=function(){return null;},e.prototype.destroy=function(){var e=this.get("timeline");this.get("destroyed")||(this.clear(),e&&e.stop(),this.clearEvents(),this.removeDom(),t.prototype.destroy.call(this));},e;}(ot),un=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(Y.c)(e,t),e.prototype.isGroup=function(){return!0;},e.prototype.isEntityGroup=function(){return!1;},e.prototype.clone=function(){for(var e=t.prototype.clone.call(this),n=this.getChildren(),r=0;r<n.length;r++){var i=n[r];e.add(i.clone());}return e;},e;}(ot),hn=function(t){function e(e){return t.call(this,e)||this;}return Object(Y.c)(e,t),e.prototype._isInBBox=function(t,e){var n=this.getBBox();return n.minX<=t&&n.maxX>=t&&n.minY<=e&&n.maxY>=e;},e.prototype.afterAttrsChange=function(e){t.prototype.afterAttrsChange.call(this,e),this.clearCacheBBox();},e.prototype.getBBox=function(){var t=this.cfg.bbox;return t||(t=this.calculateBBox(),this.set("bbox",t)),t;},e.prototype.getCanvasBBox=function(){var t=this.cfg.canvasBBox;return t||(t=this.calculateCanvasBBox(),this.set("canvasBBox",t)),t;},e.prototype.applyMatrix=function(e){t.prototype.applyMatrix.call(this,e),this.set("canvasBBox",null);},e.prototype.calculateCanvasBBox=function(){var t=this.getBBox(),e=this.getTotalMatrix(),n=t.minX,r=t.minY,i=t.maxX,o=t.maxY;if(e){var a=Z(e,[t.minX,t.minY]),s=Z(e,[t.maxX,t.minY]),c=Z(e,[t.minX,t.maxY]),u=Z(e,[t.maxX,t.maxY]);n=Math.min(a[0],s[0],c[0],u[0]),i=Math.max(a[0],s[0],c[0],u[0]),r=Math.min(a[1],s[1],c[1],u[1]),o=Math.max(a[1],s[1],c[1],u[1]);}var h=this.attrs;if(h.shadowColor){var l=h.shadowBlur,f=void 0===l?0:l,d=h.shadowOffsetX,p=void 0===d?0:d,g=h.shadowOffsetY,v=void 0===g?0:g,y=n-f+p,m=i+f+p,b=r-f+v,x=o+f+v;n=Math.min(n,y),i=Math.max(i,m),r=Math.min(r,b),o=Math.max(o,x);}return{x:n,y:r,minX:n,minY:r,maxX:i,maxY:o,width:i-n,height:o-r};},e.prototype.clearCacheBBox=function(){this.set("bbox",null),this.set("canvasBBox",null);},e.prototype.isClipShape=function(){return this.get("isClipShape");},e.prototype.isInShape=function(t,e){return!1;},e.prototype.isOnlyHitBox=function(){return!1;},e.prototype.isHit=function(t,e){var n=this.get("startArrowShape"),r=this.get("endArrowShape"),i=[t,e,1],o=(i=this.invertFromMatrix(i))[0],a=i[1],s=this._isInBBox(o,a);if(this.isOnlyHitBox())return s;if(s&&!this.isClipped(o,a)){if(this.isInShape(o,a))return!0;if(n&&n.isHit(o,a))return!0;if(r&&r.isHit(o,a))return!0;}return!1;},e;}(rt),ln=new Map();function fn(t,e){ln.set(t,e);}function dn(t){return ln.get(t);}var pn=function pn(t){var e=t.attr();return{x:e.x,y:e.y,width:e.width,height:e.height};},gn=function gn(t){var e=t.attr(),n=e.x,r=e.y,i=e.r;return{x:n-i,y:r-i,width:2*i,height:2*i};},vn=n(7);function yn(t,e){return t&&e?{minX:Math.min(t.minX,e.minX),minY:Math.min(t.minY,e.minY),maxX:Math.max(t.maxX,e.maxX),maxY:Math.max(t.maxY,e.maxY)}:t||e;}function mn(t,e){var n=t.get("startArrowShape"),r=t.get("endArrowShape");return n&&(e=yn(e,n.getCanvasBBox())),r&&(e=yn(e,r.getCanvasBBox())),e;}var bn=null;function xn(t,e,n){var r=1;return Object(o.isString)(t)&&(r=t.split("\n").length),r>1?e*r+function(t,e){return e?e-t:0.14*t;}(e,n)*(r-1):e;}function wn(t,e){var n=function(){if(!bn){var t=document.createElement("canvas");t.width=1,t.height=1,bn=t.getContext("2d");}return bn;}(),r=0;if(Object(o.isNil)(t)||""===t)return r;if(n.save(),n.font=e,Object(o.isString)(t)&&t.includes("\n")){var i=t.split("\n");Object(o.each)(i,function(t){var e=n.measureText(t).width;r<e&&(r=e);});}else r=n.measureText(t).width;return n.restore(),r;}function Sn(t){var e=t.fontSize,n=t.fontFamily,r=t.fontWeight;return[t.fontStyle,t.fontVariant,r,e+"px",n].join(" ").trim();}var On=n(22);function Mn(t,e){var n=t.prePoint,r=t.currentPoint,i=t.nextPoint,a=Math.pow(r[0]-n[0],2)+Math.pow(r[1]-n[1],2),s=Math.pow(r[0]-i[0],2)+Math.pow(r[1]-i[1],2),c=Math.pow(n[0]-i[0],2)+Math.pow(n[1]-i[1],2),u=Math.acos((a+s-c)/(2*Math.sqrt(a)*Math.sqrt(s)));if(!u||0===Math.sin(u)||Object(o.isNumberEqual)(u,0))return{xExtra:0,yExtra:0};var h=Math.abs(Math.atan2(i[1]-r[1],i[0]-r[0])),l=Math.abs(Math.atan2(i[0]-r[0],i[1]-r[1]));return h=h>Math.PI/2?Math.PI-h:h,l=l>Math.PI/2?Math.PI-l:l,{xExtra:Math.cos(u/2-h)*(e/2*(1/Math.sin(u/2)))-e/2||0,yExtra:Math.cos(l-u/2)*(e/2*(1/Math.sin(u/2)))-e/2||0};}fn("rect",pn),fn("image",pn),fn("circle",gn),fn("marker",gn),fn("polyline",function(t){for(var e=t.attr().points,n=[],r=[],i=0;i<e.length;i++){var o=e[i];n.push(o[0]),r.push(o[1]);}var a=vn.f.getBBoxByArray(n,r),s=a.x,c=a.y,u={minX:s,minY:c,maxX:s+a.width,maxY:c+a.height};return{x:(u=mn(t,u)).minX,y:u.minY,width:u.maxX-u.minX,height:u.maxY-u.minY};}),fn("polygon",function(t){for(var e=t.attr().points,n=[],r=[],i=0;i<e.length;i++){var o=e[i];n.push(o[0]),r.push(o[1]);}return vn.f.getBBoxByArray(n,r);}),fn("text",function(t){var e=t.attr(),n=e.x,r=e.y,i=e.text,o=e.fontSize,a=e.lineHeight,s=e.font;s||(s=Sn(e));var c,u=wn(i,s);if(u){var h=e.textAlign,l=e.textBaseline,f=xn(i,o,a),d={x:n,y:r-f};h&&("end"===h||"right"===h?d.x-=u:"center"===h&&(d.x-=u/2)),l&&("top"===l?d.y+=f:"middle"===l&&(d.y+=f/2)),c={x:d.x,y:d.y,width:u,height:f};}else c={x:n,y:r,width:0,height:0};return c;}),fn("path",function(t){var e=t.attr(),n=e.path,r=e.stroke?e.lineWidth:0,i=function(t,e){for(var n=[],r=[],i=[],a=0;a<t.length;a++){var s=(v=t[a]).currentPoint,c=v.params,u=v.prePoint,h=void 0;switch(v.command){case"Q":h=vn.e.box(u[0],u[1],c[1],c[2],c[3],c[4]);break;case"C":h=vn.b.box(u[0],u[1],c[1],c[2],c[3],c[4],c[5],c[6]);break;case"A":var l=v.arcParams;h=vn.a.box(l.cx,l.cy,l.rx,l.ry,l.xRotation,l.startAngle,l.endAngle);break;default:n.push(s[0]),r.push(s[1]);}h&&(v.box=h,n.push(h.x,h.x+h.width),r.push(h.y,h.y+h.height)),e&&("L"===v.command||"M"===v.command)&&v.prePoint&&v.nextPoint&&i.push(v);}n=n.filter(function(t){return!Number.isNaN(t)&&t!==1/0&&t!==-1/0;}),r=r.filter(function(t){return!Number.isNaN(t)&&t!==1/0&&t!==-1/0;});var f=Object(o.min)(n),d=Object(o.min)(r),p=Object(o.max)(n),g=Object(o.max)(r);if(0===i.length)return{x:f,y:d,width:p-f,height:g-d};for(a=0;a<i.length;a++){var v;(s=(v=i[a]).currentPoint)[0]===f?f-=Mn(v,e).xExtra:s[0]===p&&(p+=Mn(v,e).xExtra),s[1]===d?d-=Mn(v,e).yExtra:s[1]===g&&(g+=Mn(v,e).yExtra);}return{x:f,y:d,width:p-f,height:g-d};}(t.get("segments")||Object(On.d)(n),r),a=i.x,s=i.y,c={minX:a,minY:s,maxX:a+i.width,maxY:s+i.height};return{x:(c=mn(t,c)).minX,y:c.minY,width:c.maxX-c.minX,height:c.maxY-c.minY};}),fn("line",function(t){var e=t.attr(),n=e.x1,r=e.y1,i=e.x2,o=e.y2,a={minX:Math.min(n,i),maxX:Math.max(n,i),minY:Math.min(r,o),maxY:Math.max(r,o)};return{x:(a=mn(t,a)).minX,y:a.minY,width:a.maxX-a.minX,height:a.maxY-a.minY};}),fn("ellipse",function(t){var e=t.attr(),n=e.x,r=e.y,i=e.rx,o=e.ry;return{x:n-i,y:r-o,width:2*i,height:2*o};});},7:function _(t,e,n){"use strict";n.d(e,"e",function(){return m;}),n.d(e,"b",function(){return M;}),n.d(e,"a",function(){return I;}),n.d(e,"c",function(){return f;}),n.d(e,"d",function(){return _;}),n.d(e,"f",function(){return r;});var r={};function i(t){return Math.min.apply(null,t);}function o(t){return Math.max.apply(null,t);}function a(t,e,n,r){var i=t-n,o=e-r;return Math.sqrt(i*i+o*o);}function s(t,e){return Math.abs(t-e)<0.001;}function c(t,e){var n=i(t),r=i(e);return{x:n,y:r,width:o(t)-n,height:o(e)-r};}function u(t,e,n,r){return{minX:i([t,n]),maxX:o([t,n]),minY:i([e,r]),maxY:o([e,r])};}function h(t){return(t+2*Math.PI)%(2*Math.PI);}n.r(r),n.d(r,"distance",function(){return a;}),n.d(r,"isNumberEqual",function(){return s;}),n.d(r,"getBBoxByArray",function(){return c;}),n.d(r,"getBBoxRange",function(){return u;}),n.d(r,"piMod",function(){return h;});var l=n(42),f={box:function box(t,e,n,r){return c([t,n],[e,r]);},length:function length(t,e,n,r){return a(t,e,n,r);},pointAt:function pointAt(t,e,n,r,i){return{x:(1-i)*t+i*n,y:(1-i)*e+i*r};},pointDistance:function pointDistance(t,e,n,r,i,o){var s=(n-t)*(i-t)+(r-e)*(o-e);return s<0?a(t,e,i,o):s>(n-t)*(n-t)+(r-e)*(r-e)?a(n,r,i,o):this.pointToLine(t,e,n,r,i,o);},pointToLine:function pointToLine(t,e,n,r,i,o){var a=[n-t,r-e];if(l.exactEquals(a,[0,0]))return Math.sqrt((i-t)*(i-t)+(o-e)*(o-e));var s=[-a[1],a[0]];l.normalize(s,s);var c=[i-t,o-e];return Math.abs(l.dot(c,s));},tangentAngle:function tangentAngle(t,e,n,r){return Math.atan2(r-e,n-t);}};function d(t,e,n,r,i,o){var s,c=1/0,u=[n,r],h=20;o&&o>200&&(h=o/10);for(var l=1/h,f=l/10,d=0;d<=h;d++){var p=d*l,g=[i.apply(null,t.concat([p])),i.apply(null,e.concat([p]))];(b=a(u[0],u[1],g[0],g[1]))<c&&(s=p,c=b);}if(0===s)return{x:t[0],y:e[0]};if(1===s){var v=t.length;return{x:t[v-1],y:e[v-1]};}c=1/0;for(d=0;d<32&&!(f<1e-4);d++){var y=s-f,m=s+f,b=(g=[i.apply(null,t.concat([y])),i.apply(null,e.concat([y]))],a(u[0],u[1],g[0],g[1]));if(y>=0&&b<c)s=y,c=b;else{var x=[i.apply(null,t.concat([m])),i.apply(null,e.concat([m]))],w=a(u[0],u[1],x[0],x[1]);m<=1&&w<c?(s=m,c=w):f*=0.5;}}return{x:i.apply(null,t.concat([s])),y:i.apply(null,e.concat([s]))};}function p(t,e,n,r){var i=1-r;return i*i*t+2*r*i*e+r*r*n;}function g(t,e,n){var r=t+n-2*e;if(s(r,0))return[0.5];var i=(t-e)/r;return i<=1&&i>=0?[i]:[];}function v(t,e,n,r){return 2*(1-r)*(e-t)+2*r*(n-e);}function y(t,e,n,r,i,o,a){var s=p(t,n,i,a),c=p(e,r,o,a),u=f.pointAt(t,e,n,r,a),h=f.pointAt(n,r,i,o,a);return[[t,e,u.x,u.y,s,c],[s,c,h.x,h.y,i,o]];}var m={box:function box(t,e,n,r,i,o){var a=g(t,n,i)[0],s=g(e,r,o)[0],u=[t,i],h=[e,o];return void 0!==a&&u.push(p(t,n,i,a)),void 0!==s&&h.push(p(e,r,o,s)),c(u,h);},length:function length(t,e,n,r,i,o){return function t(e,n,r,i,o,s,c){if(0===c)return(a(e,n,r,i)+a(r,i,o,s)+a(e,n,o,s))/2;var u=y(e,n,r,i,o,s,0.5),h=u[0],l=u[1];return h.push(c-1),l.push(c-1),t.apply(null,h)+t.apply(null,l);}(t,e,n,r,i,o,3);},nearestPoint:function nearestPoint(t,e,n,r,i,o,a,s){return d([t,n,i],[e,r,o],a,s,p);},pointDistance:function pointDistance(t,e,n,r,i,o,s,c){var u=this.nearestPoint(t,e,n,r,i,o,s,c);return a(u.x,u.y,s,c);},interpolationAt:p,pointAt:function pointAt(t,e,n,r,i,o,a){return{x:p(t,n,i,a),y:p(e,r,o,a)};},divide:function divide(t,e,n,r,i,o,a){return y(t,e,n,r,i,o,a);},tangentAngle:function tangentAngle(t,e,n,r,i,o,a){var s=v(t,n,i,a),c=v(e,r,o,a);return h(Math.atan2(c,s));}};function b(t,e,n,r,i){var o=1-i;return o*o*o*t+3*e*i*o*o+3*n*i*i*o+r*i*i*i;}function x(t,e,n,r,i){var o=1-i;return 3*(o*o*(e-t)+2*o*i*(n-e)+i*i*(r-n));}function w(t,e,n,r){var i,o,a,c=-3*t+9*e-9*n+3*r,u=6*t-12*e+6*n,h=3*e-3*t,l=[];if(s(c,0))s(u,0)||(i=-h/u)>=0&&i<=1&&l.push(i);else{var f=u*u-4*c*h;s(f,0)?l.push(-u/(2*c)):f>0&&(o=(-u-(a=Math.sqrt(f)))/(2*c),(i=(-u+a)/(2*c))>=0&&i<=1&&l.push(i),o>=0&&o<=1&&l.push(o));}return l;}function S(t,e,n,r,i,o,a,s,c){var u=b(t,n,i,a,c),h=b(e,r,o,s,c),l=f.pointAt(t,e,n,r,c),d=f.pointAt(n,r,i,o,c),p=f.pointAt(i,o,a,s,c),g=f.pointAt(l.x,l.y,d.x,d.y,c),v=f.pointAt(d.x,d.y,p.x,p.y,c);return[[t,e,l.x,l.y,g.x,g.y,u,h],[u,h,v.x,v.y,p.x,p.y,a,s]];}function O(t,e,n,r,i,o,s,c,u){if(0===u)return function(t,e){for(var n=0,r=t.length,i=0;i<r;i++){n+=a(t[i],e[i],t[(i+1)%r],e[(i+1)%r]);}return n/2;}([t,n,i,s],[e,r,o,c]);var h=S(t,e,n,r,i,o,s,c,0.5),l=h[0],f=h[1];return l.push(u-1),f.push(u-1),O.apply(null,l)+O.apply(null,f);}var M={extrema:w,box:function box(t,e,n,r,i,o,a,s){for(var u=[t,a],h=[e,s],l=w(t,n,i,a),f=w(e,r,o,s),d=0;d<l.length;d++){u.push(b(t,n,i,a,l[d]));}for(d=0;d<f.length;d++){h.push(b(e,r,o,s,f[d]));}return c(u,h);},length:function length(t,e,n,r,i,o,a,s){return O(t,e,n,r,i,o,a,s,3);},nearestPoint:function nearestPoint(t,e,n,r,i,o,a,s,c,u,h){return d([t,n,i,a],[e,r,o,s],c,u,b,h);},pointDistance:function pointDistance(t,e,n,r,i,o,s,c,u,h,l){var f=this.nearestPoint(t,e,n,r,i,o,s,c,u,h,l);return a(f.x,f.y,u,h);},interpolationAt:b,pointAt:function pointAt(t,e,n,r,i,o,a,s,c){return{x:b(t,n,i,a,c),y:b(e,r,o,s,c)};},divide:function divide(t,e,n,r,i,o,a,s,c){return S(t,e,n,r,i,o,a,s,c);},tangentAngle:function tangentAngle(t,e,n,r,i,o,a,s,c){var u=x(t,n,i,a,c),l=x(e,r,o,s,c);return h(Math.atan2(l,u));}};function k(t,e){var n=Math.abs(t);return e>0?n:-1*n;}var C=function C(t,e,n,r,i,o){var a=n,s=r;if(0===a||0===s)return{x:t,y:e};for(var c,u,h=i-t,l=o-e,f=Math.abs(h),d=Math.abs(l),p=a*a,g=s*s,v=Math.PI/4,y=0;y<4;y++){c=a*Math.cos(v),u=s*Math.sin(v);var m=(p-g)*Math.pow(Math.cos(v),3)/a,b=(g-p)*Math.pow(Math.sin(v),3)/s,x=c-m,w=u-b,S=f-m,O=d-b,M=Math.hypot(w,x),C=Math.hypot(O,S);v+=M*Math.asin((x*O-w*S)/(M*C))/Math.sqrt(p+g-c*c-u*u),v=Math.min(Math.PI/2,Math.max(0,v));}return{x:t+k(c,h),y:e+k(u,l)};};function E(t,e,n,r,i,o){return n*Math.cos(i)*Math.cos(o)-r*Math.sin(i)*Math.sin(o)+t;}function j(t,e,n,r,i,o){return n*Math.sin(i)*Math.cos(o)+r*Math.cos(i)*Math.sin(o)+e;}function P(t,e,n){return{x:t*Math.cos(n),y:e*Math.sin(n)};}function A(t,e,n){var r=Math.cos(n),i=Math.sin(n);return[t*r-e*i,t*i+e*r];}var I={box:function box(t,e,n,r,i,o,a){for(var s=function(t,e,n){return Math.atan(-e/t*Math.tan(n));}(n,r,i),c=1/0,u=-1/0,h=[o,a],l=2*-Math.PI;l<=2*Math.PI;l+=Math.PI){var f=s+l;o<a?o<f&&f<a&&h.push(f):a<f&&f<o&&h.push(f);}for(l=0;l<h.length;l++){var d=E(t,0,n,r,i,h[l]);d<c&&(c=d),d>u&&(u=d);}var p=function(t,e,n){return Math.atan(e/(t*Math.tan(n)));}(n,r,i),g=1/0,v=-1/0,y=[o,a];for(l=2*-Math.PI;l<=2*Math.PI;l+=Math.PI){var m=p+l;o<a?o<m&&m<a&&y.push(m):a<m&&m<o&&y.push(m);}for(l=0;l<y.length;l++){var b=j(0,e,n,r,i,y[l]);b<g&&(g=b),b>v&&(v=b);}return{x:c,y:g,width:u-c,height:v-g};},length:function length(t,e,n,r,i,o,a){},nearestPoint:function nearestPoint(t,e,n,r,i,o,a,s,c){var u=A(s-t,c-e,-i),h=u[0],l=u[1],f=C(0,0,n,r,h,l),d=function(t,e,n,r){return(Math.atan2(r*t,n*e)+2*Math.PI)%(2*Math.PI);}(n,r,f.x,f.y);d<o?f=P(n,r,o):d>a&&(f=P(n,r,a));var p=A(f.x,f.y,i);return{x:p[0]+t,y:p[1]+e};},pointDistance:function pointDistance(t,e,n,r,i,o,s,c,u){var h=this.nearestPoint(t,e,n,r,c,u);return a(h.x,h.y,c,u);},pointAt:function pointAt(t,e,n,r,i,o,a,s){var c=(a-o)*s+o;return{x:E(t,0,n,r,i,c),y:j(0,e,n,r,i,c)};},tangentAngle:function tangentAngle(t,e,n,r,i,o,a,s){var c=(a-o)*s+o,u=function(t,e,n,r,i,o,a,s){return-1*n*Math.cos(i)*Math.sin(s)-r*Math.sin(i)*Math.cos(s);}(0,0,n,r,i,0,0,c),l=function(t,e,n,r,i,o,a,s){return-1*n*Math.sin(i)*Math.sin(s)+r*Math.cos(i)*Math.cos(s);}(0,0,n,r,i,0,0,c);return h(Math.atan2(l,u));}};function T(t){for(var e=0,n=[],r=0;r<t.length-1;r++){var i=t[r],o=t[r+1],s=a(i[0],i[1],o[0],o[1]),c={from:i,to:o,length:s};n.push(c),e+=s;}return{segments:n,totalLength:e};}function N(t){if(t.length<2)return 0;for(var e=0,n=0;n<t.length-1;n++){var r=t[n],i=t[n+1];e+=a(r[0],r[1],i[0],i[1]);}return e;}function B(t,e){if(e>1||e<0||t.length<2)return null;var n=T(t),r=n.segments,i=n.totalLength;if(0===i)return{x:t[0][0],y:t[0][1]};for(var o=0,a=null,s=0;s<r.length;s++){var c=r[s],u=c.from,h=c.to,l=c.length/i;if(e>=o&&e<=o+l){var d=(e-o)/l;a=f.pointAt(u[0],u[1],h[0],h[1],d);break;}o+=l;}return a;}function L(t,e){if(e>1||e<0||t.length<2)return 0;for(var n=T(t),r=n.segments,i=n.totalLength,o=0,a=0,s=0;s<r.length;s++){var c=r[s],u=c.from,h=c.to,l=c.length/i;if(e>=o&&e<=o+l){a=Math.atan2(h[1]-u[1],h[0]-u[0]);break;}o+=l;}return a;}function D(t,e,n){for(var r=1/0,i=0;i<t.length-1;i++){var o=t[i],a=t[i+1],s=f.pointDistance(o[0],o[1],a[0],a[1],e,n);s<r&&(r=s);}return r;}var _={box:function box(t){for(var e=[],n=[],r=0;r<t.length;r++){var i=t[r];e.push(i[0]),n.push(i[1]);}return c(e,n);},length:function length(t){return N(t);},pointAt:function pointAt(t,e){return B(t,e);},pointDistance:function pointDistance(t,e,n){return D(t,e,n);},tangentAngle:function tangentAngle(t,e){return L(t,e);}};},72:function _(t,e,n){"use strict";n.r(e),n.d(e,"create",function(){return i;}),n.d(e,"clone",function(){return o;}),n.d(e,"length",function(){return a;}),n.d(e,"fromValues",function(){return s;}),n.d(e,"copy",function(){return c;}),n.d(e,"set",function(){return u;}),n.d(e,"add",function(){return h;}),n.d(e,"subtract",function(){return l;}),n.d(e,"multiply",function(){return f;}),n.d(e,"divide",function(){return d;}),n.d(e,"ceil",function(){return p;}),n.d(e,"floor",function(){return g;}),n.d(e,"min",function(){return v;}),n.d(e,"max",function(){return y;}),n.d(e,"round",function(){return m;}),n.d(e,"scale",function(){return b;}),n.d(e,"scaleAndAdd",function(){return x;}),n.d(e,"distance",function(){return w;}),n.d(e,"squaredDistance",function(){return S;}),n.d(e,"squaredLength",function(){return O;}),n.d(e,"negate",function(){return M;}),n.d(e,"inverse",function(){return k;}),n.d(e,"normalize",function(){return C;}),n.d(e,"dot",function(){return E;}),n.d(e,"cross",function(){return j;}),n.d(e,"lerp",function(){return P;}),n.d(e,"hermite",function(){return A;}),n.d(e,"bezier",function(){return I;}),n.d(e,"random",function(){return T;}),n.d(e,"transformMat4",function(){return N;}),n.d(e,"transformMat3",function(){return B;}),n.d(e,"transformQuat",function(){return L;}),n.d(e,"rotateX",function(){return D;}),n.d(e,"rotateY",function(){return _;}),n.d(e,"rotateZ",function(){return R;}),n.d(e,"angle",function(){return F;}),n.d(e,"zero",function(){return Y;}),n.d(e,"str",function(){return X;}),n.d(e,"exactEquals",function(){return z;}),n.d(e,"equals",function(){return W;}),n.d(e,"sub",function(){return V;}),n.d(e,"mul",function(){return G;}),n.d(e,"div",function(){return H;}),n.d(e,"dist",function(){return U;}),n.d(e,"sqrDist",function(){return Z;}),n.d(e,"len",function(){return K;}),n.d(e,"sqrLen",function(){return $;}),n.d(e,"forEach",function(){return Q;});var r=n(5);function i(){var t=new r.a(3);return r.a!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t;}function o(t){var e=new r.a(3);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e;}function a(t){var e=t[0],n=t[1],r=t[2];return Math.hypot(e,n,r);}function s(t,e,n){var i=new r.a(3);return i[0]=t,i[1]=e,i[2]=n,i;}function c(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t;}function u(t,e,n,r){return t[0]=e,t[1]=n,t[2]=r,t;}function h(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t[2]=e[2]+n[2],t;}function l(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t[2]=e[2]-n[2],t;}function f(t,e,n){return t[0]=e[0]*n[0],t[1]=e[1]*n[1],t[2]=e[2]*n[2],t;}function d(t,e,n){return t[0]=e[0]/n[0],t[1]=e[1]/n[1],t[2]=e[2]/n[2],t;}function p(t,e){return t[0]=Math.ceil(e[0]),t[1]=Math.ceil(e[1]),t[2]=Math.ceil(e[2]),t;}function g(t,e){return t[0]=Math.floor(e[0]),t[1]=Math.floor(e[1]),t[2]=Math.floor(e[2]),t;}function v(t,e,n){return t[0]=Math.min(e[0],n[0]),t[1]=Math.min(e[1],n[1]),t[2]=Math.min(e[2],n[2]),t;}function y(t,e,n){return t[0]=Math.max(e[0],n[0]),t[1]=Math.max(e[1],n[1]),t[2]=Math.max(e[2],n[2]),t;}function m(t,e){return t[0]=Math.round(e[0]),t[1]=Math.round(e[1]),t[2]=Math.round(e[2]),t;}function b(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t;}function x(t,e,n,r){return t[0]=e[0]+n[0]*r,t[1]=e[1]+n[1]*r,t[2]=e[2]+n[2]*r,t;}function w(t,e){var n=e[0]-t[0],r=e[1]-t[1],i=e[2]-t[2];return Math.hypot(n,r,i);}function S(t,e){var n=e[0]-t[0],r=e[1]-t[1],i=e[2]-t[2];return n*n+r*r+i*i;}function O(t){var e=t[0],n=t[1],r=t[2];return e*e+n*n+r*r;}function M(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t;}function k(t,e){return t[0]=1/e[0],t[1]=1/e[1],t[2]=1/e[2],t;}function C(t,e){var n=e[0],r=e[1],i=e[2],o=n*n+r*r+i*i;return o>0&&(o=1/Math.sqrt(o)),t[0]=e[0]*o,t[1]=e[1]*o,t[2]=e[2]*o,t;}function E(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2];}function j(t,e,n){var r=e[0],i=e[1],o=e[2],a=n[0],s=n[1],c=n[2];return t[0]=i*c-o*s,t[1]=o*a-r*c,t[2]=r*s-i*a,t;}function P(t,e,n,r){var i=e[0],o=e[1],a=e[2];return t[0]=i+r*(n[0]-i),t[1]=o+r*(n[1]-o),t[2]=a+r*(n[2]-a),t;}function A(t,e,n,r,i,o){var a=o*o,s=a*(2*o-3)+1,c=a*(o-2)+o,u=a*(o-1),h=a*(3-2*o);return t[0]=e[0]*s+n[0]*c+r[0]*u+i[0]*h,t[1]=e[1]*s+n[1]*c+r[1]*u+i[1]*h,t[2]=e[2]*s+n[2]*c+r[2]*u+i[2]*h,t;}function I(t,e,n,r,i,o){var a=1-o,s=a*a,c=o*o,u=s*a,h=3*o*s,l=3*c*a,f=c*o;return t[0]=e[0]*u+n[0]*h+r[0]*l+i[0]*f,t[1]=e[1]*u+n[1]*h+r[1]*l+i[1]*f,t[2]=e[2]*u+n[2]*h+r[2]*l+i[2]*f,t;}function T(t,e){e=e||1;var n=2*r.c()*Math.PI,i=2*r.c()-1,o=Math.sqrt(1-i*i)*e;return t[0]=Math.cos(n)*o,t[1]=Math.sin(n)*o,t[2]=i*e,t;}function N(t,e,n){var r=e[0],i=e[1],o=e[2],a=n[3]*r+n[7]*i+n[11]*o+n[15];return a=a||1,t[0]=(n[0]*r+n[4]*i+n[8]*o+n[12])/a,t[1]=(n[1]*r+n[5]*i+n[9]*o+n[13])/a,t[2]=(n[2]*r+n[6]*i+n[10]*o+n[14])/a,t;}function B(t,e,n){var r=e[0],i=e[1],o=e[2];return t[0]=r*n[0]+i*n[3]+o*n[6],t[1]=r*n[1]+i*n[4]+o*n[7],t[2]=r*n[2]+i*n[5]+o*n[8],t;}function L(t,e,n){var r=n[0],i=n[1],o=n[2],a=n[3],s=e[0],c=e[1],u=e[2],h=i*u-o*c,l=o*s-r*u,f=r*c-i*s,d=i*f-o*l,p=o*h-r*f,g=r*l-i*h,v=2*a;return h*=v,l*=v,f*=v,d*=2,p*=2,g*=2,t[0]=s+h+d,t[1]=c+l+p,t[2]=u+f+g,t;}function D(t,e,n,r){var i=[],o=[];return i[0]=e[0]-n[0],i[1]=e[1]-n[1],i[2]=e[2]-n[2],o[0]=i[0],o[1]=i[1]*Math.cos(r)-i[2]*Math.sin(r),o[2]=i[1]*Math.sin(r)+i[2]*Math.cos(r),t[0]=o[0]+n[0],t[1]=o[1]+n[1],t[2]=o[2]+n[2],t;}function _(t,e,n,r){var i=[],o=[];return i[0]=e[0]-n[0],i[1]=e[1]-n[1],i[2]=e[2]-n[2],o[0]=i[2]*Math.sin(r)+i[0]*Math.cos(r),o[1]=i[1],o[2]=i[2]*Math.cos(r)-i[0]*Math.sin(r),t[0]=o[0]+n[0],t[1]=o[1]+n[1],t[2]=o[2]+n[2],t;}function R(t,e,n,r){var i=[],o=[];return i[0]=e[0]-n[0],i[1]=e[1]-n[1],i[2]=e[2]-n[2],o[0]=i[0]*Math.cos(r)-i[1]*Math.sin(r),o[1]=i[0]*Math.sin(r)+i[1]*Math.cos(r),o[2]=i[2],t[0]=o[0]+n[0],t[1]=o[1]+n[1],t[2]=o[2]+n[2],t;}function F(t,e){var n=t[0],r=t[1],i=t[2],o=e[0],a=e[1],s=e[2],c=Math.sqrt(n*n+r*r+i*i)*Math.sqrt(o*o+a*a+s*s),u=c&&E(t,e)/c;return Math.acos(Math.min(Math.max(u,-1),1));}function Y(t){return t[0]=0,t[1]=0,t[2]=0,t;}function X(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")";}function z(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2];}function W(t,e){var n=t[0],i=t[1],o=t[2],a=e[0],s=e[1],c=e[2];return Math.abs(n-a)<=r.b*Math.max(1,Math.abs(n),Math.abs(a))&&Math.abs(i-s)<=r.b*Math.max(1,Math.abs(i),Math.abs(s))&&Math.abs(o-c)<=r.b*Math.max(1,Math.abs(o),Math.abs(c));}var q,V=l,G=f,H=d,U=w,Z=S,K=a,$=O,Q=(q=i(),function(t,e,n,r,i,o){var a,s;for(e||(e=3),n||(n=0),s=r?Math.min(r*e+n,t.length):t.length,a=n;a<s;a+=e){q[0]=t[a],q[1]=t[a+1],q[2]=t[a+2],i(q,q,o),t[a]=q[0],t[a+1]=q[1],t[a+2]=q[2];}return t;});},73:function _(t,e,n){"use strict";var r=function(){function t(){this._events={};}return t.prototype.on=function(t,e,n){return this._events[t]||(this._events[t]=[]),this._events[t].push({callback:e,once:!!n}),this;},t.prototype.once=function(t,e){return this.on(t,e,!0);},t.prototype.emit=function(t){for(var e=this,n=[],r=1;r<arguments.length;r++){n[r-1]=arguments[r];}var i=this._events[t]||[],o=this._events["*"]||[],a=function a(r){for(var i=r.length,o=0;o<i;o++){if(r[o]){var a=r[o],s=a.callback;a.once&&(r.splice(o,1),0===r.length&&delete e._events[t],i--,o--),s.apply(e,n);}}};a(i),a(o);},t.prototype.off=function(t,e){if(t){if(e){for(var n=this._events[t]||[],r=n.length,i=0;i<r;i++){n[i].callback===e&&(n.splice(i,1),r--,i--);}0===n.length&&delete this._events[t];}else delete this._events[t];}else this._events={};return this;},t.prototype.getEvents=function(){return this._events;},t;}();e.a=r;},74:function _(t,e,n){"use strict";n.d(e,"b",function(){return Wt;});var r={};n.r(r),n.d(r,"Base",function(){return V;}),n.d(r,"Circle",function(){return G;}),n.d(r,"Ellipse",function(){return U;}),n.d(r,"Image",function(){return $;}),n.d(r,"Line",function(){return tt;}),n.d(r,"Marker",function(){return rt;}),n.d(r,"Path",function(){return dt;}),n.d(r,"Polygon",function(){return gt;}),n.d(r,"Polyline",function(){return vt;}),n.d(r,"Rect",function(){return yt;}),n.d(r,"Text",function(){return mt;});var i=n(1),o=n(6),a=n(0);function s(t){return(s="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}var c={};function u(t){return(null==c?void 0:c.clearAnimationFrame)?c.clearAnimationFrame(t):("object"===("undefined"==typeof window?"undefined":s(window))&&window.cancelAnimationFrame?window.cancelAnimationFrame:clearTimeout)(t);}function h(t){return(h="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function l(t,e,n,r){var i=t-n,o=e-r;return Math.sqrt(i*i+o*o);}function f(t,e,n,r,i,o){return i>=t&&i<=t+n&&o>=e&&o<=e+r;}function d(t,e){return!(e.minX>t.maxX||e.maxX<t.minX||e.minY>t.maxY||e.maxY<t.minY);}function p(t,e){return t[0]===e[0]&&t[1]===e[1];}var g=/^l\s*\(\s*([\d.]+)\s*\)\s*(.*)/i,v=/^r\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)\s*(.*)/i,y=/^p\s*\(\s*([axyn])\s*\)\s*(.*)/i,m=/[\d.]+:(#[^\s]+|[^\)]+\))/gi;function b(t,e){var n=t.match(m);Object(a.each)(n,function(t){var n=t.split(":");e.addColorStop(n[0],n[1]);});}function x(t,e,n){if(Object(a.isString)(n)){if("("===n[1]||"("===n[2]){if("l"===n[0])return function(t,e,n){var r,i,o=g.exec(n),a=parseFloat(o[1])%360*(Math.PI/180),s=o[2],c=e.getBBox();a>=0&&a<0.5*Math.PI?(r={x:c.minX,y:c.minY},i={x:c.maxX,y:c.maxY}):0.5*Math.PI<=a&&a<Math.PI?(r={x:c.maxX,y:c.minY},i={x:c.minX,y:c.maxY}):Math.PI<=a&&a<1.5*Math.PI?(r={x:c.maxX,y:c.maxY},i={x:c.minX,y:c.minY}):(r={x:c.minX,y:c.maxY},i={x:c.maxX,y:c.minY});var u=Math.tan(a),h=u*u,l=(i.x-r.x+u*(i.y-r.y))/(h+1)+r.x,f=u*(i.x-r.x+u*(i.y-r.y))/(h+1)+r.y,d=t.createLinearGradient(r.x,r.y,l,f);return b(s,d),d;}(t,e,n);if("r"===n[0])return function(t,e,n){var r=v.exec(n),i=parseFloat(r[1]),o=parseFloat(r[2]),a=parseFloat(r[3]),s=r[4];if(0===a){var c=s.match(m);return c[c.length-1].split(":")[1];}var u=e.getBBox(),h=u.maxX-u.minX,l=u.maxY-u.minY,f=Math.sqrt(h*h+l*l)/2,d=t.createRadialGradient(u.minX+h*i,u.minY+l*o,0,u.minX+h/2,u.minY+l/2,a*f);return b(s,d),d;}(t,e,n);if("p"===n[0])return function(t,e,n){if(e.get("patternSource")&&e.get("patternSource")===n)return e.get("pattern");var r,i,o=y.exec(n),a=o[1],s=o[2];function c(){r=t.createPattern(i,a),e.set("pattern",r),e.set("patternSource",n);}switch(a){case"a":a="repeat";break;case"x":a="repeat-x";break;case"y":a="repeat-y";break;case"n":a="no-repeat";break;default:a="no-repeat";}return i=new Image(),s.match(/^data:/i)||(i.crossOrigin="Anonymous"),i.src=s,i.complete?c():(i.onload=c,i.src=i.src),r;}(t,e,n);}return n;}}function w(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1]);}function S(t,e){return w(t)*w(e)?(t[0]*e[0]+t[1]*e[1])/(w(t)*w(e)):1;}function O(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(S(t,e));}function M(t,e){var n=e[1],r=e[2],i=Object(a.mod)(Object(a.toRadian)(e[3]),2*Math.PI),o=e[4],s=e[5],c=t[0],u=t[1],h=e[6],l=e[7],f=Math.cos(i)*(c-h)/2+Math.sin(i)*(u-l)/2,d=-1*Math.sin(i)*(c-h)/2+Math.cos(i)*(u-l)/2,g=f*f/(n*n)+d*d/(r*r);g>1&&(n*=Math.sqrt(g),r*=Math.sqrt(g));var v=n*n*(d*d)+r*r*(f*f),y=v?Math.sqrt((n*n*(r*r)-v)/v):1;o===s&&(y*=-1),isNaN(y)&&(y=0);var m=r?y*n*d/r:0,b=n?y*-r*f/n:0,x=(c+h)/2+Math.cos(i)*m-Math.sin(i)*b,w=(u+l)/2+Math.sin(i)*m+Math.cos(i)*b,M=[(f-m)/n,(d-b)/r],k=[(-1*f-m)/n,(-1*d-b)/r],C=O([1,0],M),E=O(M,k);return S(M,k)<=-1&&(E=Math.PI),S(M,k)>=1&&(E=0),0===s&&E>0&&(E-=2*Math.PI),1===s&&E<0&&(E+=2*Math.PI),{cx:x,cy:w,rx:p(t,[h,l])?0:n,ry:p(t,[h,l])?0:r,startAngle:C,endAngle:C+E,xRotation:i,arcFlag:o,sweepFlag:s};}function k(t){return(k="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}var C=Math.sin,E=Math.cos,j=Math.atan2,P=Math.PI;function A(t,e,n,r,i,o,a){var s=e.stroke,c=e.lineWidth,u=j(r-o,n-i),h=new dt({type:"path",canvas:t.get("canvas"),isArrowShape:!0,attrs:{path:"M"+10*E(P/6)+","+10*C(P/6)+" L0,0 L"+10*E(P/6)+",-"+10*C(P/6),stroke:s,lineWidth:c}});h.translate(i,o),h.rotateAtPoint(i,o,u),t.set(a?"startArrowShape":"endArrowShape",h);}function I(t,e,n,r,o,a,s){var c=e.startArrow,u=e.endArrow,h=e.stroke,l=e.lineWidth,f=s?c:u,d=f.d,p=f.fill,g=f.stroke,v=f.lineWidth,y=Object(i.e)(f,["d","fill","stroke","lineWidth"]),m=j(r-a,n-o);d&&(o-=E(m)*d,a-=C(m)*d);var b=new dt({type:"path",canvas:t.get("canvas"),isArrowShape:!0,attrs:Object(i.a)(Object(i.a)({},y),{stroke:g||h,lineWidth:v||l,fill:p})});b.translate(o,a),b.rotateAtPoint(o,a,m),t.set(s?"startArrowShape":"endArrowShape",b);}function T(t,e,n,r,i){var o=j(r-e,n-t);return{dx:E(o)*i,dy:C(o)*i};}function N(t,e,n,r,i,o){"object"===k(e.startArrow)?I(t,e,n,r,i,o,!0):e.startArrow?A(t,e,n,r,i,o,!0):t.set("startArrowShape",null);}function B(t,e,n,r,i,o){"object"===k(e.endArrow)?I(t,e,n,r,i,o,!1):e.endArrow?A(t,e,n,r,i,o,!1):t.set("startArrowShape",null);}var L={fill:"fillStyle",stroke:"strokeStyle",opacity:"globalAlpha"};function D(t,e){var n=e.attr();for(var r in n){var i=n[r],o=L[r]?L[r]:r;"matrix"===o&&i?t.transform(i[0],i[1],i[3],i[4],i[6],i[7]):"lineDash"===o&&t.setLineDash?Object(a.isArray)(i)&&t.setLineDash(i):("strokeStyle"===o||"fillStyle"===o?i=x(t,e,i):"globalAlpha"===o&&(i*=t.globalAlpha),t[o]=i);}}function _(t,e,n){for(var r=0;r<e.length;r++){var i=e[r];i.cfg.visible?i.draw(t,n):i.skipDraw();}}function R(t,e,n){var r=t.get("refreshElements");Object(a.each)(r,function(e){if(e!==t)for(var n=e.cfg.parent;n&&n!==t&&!n.cfg.refresh;){n.cfg.refresh=!0,n=n.cfg.parent;}}),r[0]===t?F(e,n):function t(e,n){for(var r=0;r<e.length;r++){var i=e[r];if(i.cfg.visible)if(i.cfg.hasChanged)i.cfg.refresh=!0,i.isGroup()&&F(i.cfg.children,n);else if(i.cfg.refresh)i.isGroup()&&t(i.cfg.children,n);else{var o=Y(i,n);i.cfg.refresh=o,o&&i.isGroup()&&t(i.cfg.children,n);}}}(e,n);}function F(t,e){for(var n=0;n<t.length;n++){var r=t[n];r.cfg.refresh=!0,r.isGroup()&&F(r.get("children"),e);}}function Y(t,e){var n=t.cfg.cacheCanvasBBox;return t.cfg.isInView&&n&&d(n,e);}function X(t,e,n,r){var i=n.path,o=n.startArrow,a=n.endArrow;if(i){var s=[0,0],c=[0,0],u={dx:0,dy:0};e.beginPath();for(var h=0;h<i.length;h++){var l=i[h],f=l[0];if(0===h&&o&&o.d)u=T((d=t.getStartTangent())[0][0],d[0][1],d[1][0],d[1][1],o.d);else if(h===i.length-2&&"Z"===i[h+1][0]&&a&&a.d){if("Z"===i[h+1][0])u=T((d=t.getEndTangent())[0][0],d[0][1],d[1][0],d[1][1],a.d);}else if(h===i.length-1&&a&&a.d){var d;if("Z"!==i[0])u=T((d=t.getEndTangent())[0][0],d[0][1],d[1][0],d[1][1],a.d);}var p=u.dx,g=u.dy;switch(f){case"M":e.moveTo(l[1]-p,l[2]-g),c=[l[1],l[2]];break;case"L":e.lineTo(l[1]-p,l[2]-g);break;case"Q":e.quadraticCurveTo(l[1],l[2],l[3]-p,l[4]-g);break;case"C":e.bezierCurveTo(l[1],l[2],l[3],l[4],l[5]-p,l[6]-g);break;case"A":var v=void 0;r?(v=r[h])||(v=M(s,l),r[h]=v):v=M(s,l);var y=v.cx,m=v.cy,b=v.rx,x=v.ry,w=v.startAngle,S=v.endAngle,O=v.xRotation,k=v.sweepFlag;if(e.ellipse)e.ellipse(y,m,b,x,O,w,S,1-k);else{var C=b>x?b:x,E=b>x?1:b/x,j=b>x?x/b:1;e.translate(y,m),e.rotate(O),e.scale(E,j),e.arc(0,0,C,w,S,1-k),e.scale(1/E,1/j),e.rotate(-O),e.translate(-y,-m);}break;case"Z":e.closePath();}if("Z"===f)s=c;else{var P=l.length;s=[l[P-2],l[P-1]];}}}}function z(t,e){var n=t.get("canvas");n&&("remove"===e&&(t._cacheCanvasBBox=t.get("cacheCanvasBBox")),t.get("hasChanged")||(t.set("hasChanged",!0),t.cfg.parent&&t.cfg.parent.get("hasChanged")||(n.refreshElement(t,e,n),n.get("autoDraw")&&n.draw())));}function W(t){var e,n,r;if(t.destroyed)e=t._cacheCanvasBBox;else{var i=t.get("cacheCanvasBBox"),o=i&&!(!i.width||!i.height),a=t.getCanvasBBox(),s=a&&!(!a.width||!a.height);o&&s?(r=a,e=(n=i)&&r?{minX:Math.min(n.minX,r.minX),minY:Math.min(n.minY,r.minY),maxX:Math.max(n.maxX,r.maxX),maxY:Math.max(n.maxY,r.maxY)}:n||r):o?e=i:s&&(e=a);}return e;}var q=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(i.c)(e,t),e.prototype.onCanvasChange=function(t){z(this,t);},e.prototype.getShapeBase=function(){return r;},e.prototype.getGroupBase=function(){return e;},e.prototype._applyClip=function(t,e){e&&(t.save(),D(t,e),e.createPath(t),t.restore(),t.clip(),e._afterDraw());},e.prototype.cacheCanvasBBox=function(){var t=this.cfg.children,e=[],n=[];Object(a.each)(t,function(t){var r=t.cfg.cacheCanvasBBox;r&&t.cfg.isInView&&(e.push(r.minX,r.maxX),n.push(r.minY,r.maxY));});var r=null;if(e.length){var i=Math.min.apply(null,e),o=Math.max.apply(null,e),s=Math.min.apply(null,n),c=Math.max.apply(null,n);r={minX:i,minY:s,x:i,y:s,maxX:o,maxY:c,width:o-i,height:c-s};var u=this.cfg.canvas;if(u){var h=u.getViewRange();this.set("isInView",d(r,h));}}else this.set("isInView",!1);this.set("cacheCanvasBBox",r);},e.prototype.draw=function(t,e){var n=this.cfg.children,r=!e||this.cfg.refresh;n.length&&r&&(t.save(),D(t,this),this._applyClip(t,this.getClip()),_(t,n,e),t.restore(),this.cacheCanvasBBox()),this.cfg.refresh=null,this.set("hasChanged",!1);},e.prototype.skipDraw=function(){this.set("cacheCanvasBBox",null),this.set("hasChanged",!1);},e;}(o.b),V=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(i.c)(e,t),e.prototype.getDefaultAttrs=function(){var e=t.prototype.getDefaultAttrs.call(this);return Object(i.a)(Object(i.a)({},e),{lineWidth:1,lineAppendWidth:0,strokeOpacity:1,fillOpacity:1});},e.prototype.getShapeBase=function(){return r;},e.prototype.getGroupBase=function(){return q;},e.prototype.onCanvasChange=function(t){z(this,t);},e.prototype.calculateBBox=function(){var t=this.get("type"),e=this.getHitLineWidth(),n=Object(o.g)(t)(this),r=e/2,i=n.x-r,a=n.y-r,s=n.x+n.width+r,c=n.y+n.height+r;return{x:i,minX:i,y:a,minY:a,width:n.width+e,height:n.height+e,maxX:s,maxY:c};},e.prototype.isFill=function(){return!!this.attrs.fill||this.isClipShape();},e.prototype.isStroke=function(){return!!this.attrs.stroke;},e.prototype._applyClip=function(t,e){e&&(t.save(),D(t,e),e.createPath(t),t.restore(),t.clip(),e._afterDraw());},e.prototype.draw=function(t,e){var n=this.cfg.clipShape;if(e){if(!1===this.cfg.refresh)return void this.set("hasChanged",!1);if(!d(e,this.getCanvasBBox()))return this.set("hasChanged",!1),void(this.cfg.isInView&&this._afterDraw());}t.save(),D(t,this),this._applyClip(t,n),this.drawPath(t),t.restore(),this._afterDraw();},e.prototype.getCanvasViewBox=function(){var t=this.cfg.canvas;return t?t.getViewRange():null;},e.prototype.cacheCanvasBBox=function(){var t=this.getCanvasViewBox();if(t){var e=this.getCanvasBBox(),n=d(e,t);this.set("isInView",n),n?this.set("cacheCanvasBBox",e):this.set("cacheCanvasBBox",null);}},e.prototype._afterDraw=function(){this.cacheCanvasBBox(),this.set("hasChanged",!1),this.set("refresh",null);},e.prototype.skipDraw=function(){this.set("cacheCanvasBBox",null),this.set("isInView",null),this.set("hasChanged",!1);},e.prototype.drawPath=function(t){this.createPath(t),this.strokeAndFill(t),this.afterDrawPath(t);},e.prototype.fill=function(t){t.fill();},e.prototype.stroke=function(t){t.stroke();},e.prototype.strokeAndFill=function(t){var e=this.attrs,n=e.lineWidth,r=e.opacity,i=e.strokeOpacity,o=e.fillOpacity;this.isFill()&&(Object(a.isNil)(o)||1===o?this.fill(t):(t.globalAlpha=o,this.fill(t),t.globalAlpha=r)),this.isStroke()&&n>0&&(Object(a.isNil)(i)||1===i||(t.globalAlpha=i),this.stroke(t)),this.afterDrawPath(t);},e.prototype.createPath=function(t){},e.prototype.afterDrawPath=function(t){},e.prototype.isInShape=function(t,e){var n=this.isStroke(),r=this.isFill(),i=this.getHitLineWidth();return this.isInStrokeOrPath(t,e,n,r,i);},e.prototype.isInStrokeOrPath=function(t,e,n,r,i){return!1;},e.prototype.getHitLineWidth=function(){if(!this.isStroke())return 0;var t=this.attrs;return t.lineWidth+t.lineAppendWidth;},e;}(o.c),G=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(i.c)(e,t),e.prototype.getDefaultAttrs=function(){var e=t.prototype.getDefaultAttrs.call(this);return Object(i.a)(Object(i.a)({},e),{x:0,y:0,r:0});},e.prototype.isInStrokeOrPath=function(t,e,n,r,i){var o=this.attr(),a=o.x,s=o.y,c=o.r,u=i/2,h=l(a,s,t,e);return r&&n?h<=c+u:r?h<=c:!!n&&h>=c-u&&h<=c+u;},e.prototype.createPath=function(t){var e=this.attr(),n=e.x,r=e.y,i=e.r;t.beginPath(),t.arc(n,r,i,0,2*Math.PI,!1),t.closePath();},e;}(V);function H(t,e,n,r){return t/(n*n)+e/(r*r);}var U=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(i.c)(e,t),e.prototype.getDefaultAttrs=function(){var e=t.prototype.getDefaultAttrs.call(this);return Object(i.a)(Object(i.a)({},e),{x:0,y:0,rx:0,ry:0});},e.prototype.isInStrokeOrPath=function(t,e,n,r,i){var o=this.attr(),a=i/2,s=o.x,c=o.y,u=o.rx,h=o.ry,l=(t-s)*(t-s),f=(e-c)*(e-c);return r&&n?H(l,f,u+a,h+a)<=1:r?H(l,f,u,h)<=1:!!n&&H(l,f,u-a,h-a)>=1&&H(l,f,u+a,h+a)<=1;},e.prototype.createPath=function(t){var e=this.attr(),n=e.x,r=e.y,i=e.rx,o=e.ry;if(t.beginPath(),t.ellipse)t.ellipse(n,r,i,o,0,0,2*Math.PI,!1);else{var a=i>o?i:o,s=i>o?1:i/o,c=i>o?o/i:1;t.save(),t.translate(n,r),t.scale(s,c),t.arc(0,0,a,0,2*Math.PI),t.restore(),t.closePath();}},e;}(V);function Z(t){return t instanceof HTMLElement&&Object(a.isString)(t.nodeName)&&"CANVAS"===t.nodeName.toUpperCase();}var K=null;var $=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(i.c)(e,t),e.prototype.getDefaultAttrs=function(){var e=t.prototype.getDefaultAttrs.call(this);return Object(i.a)(Object(i.a)({},e),{x:0,y:0,width:0,height:0});},e.prototype.initAttrs=function(t){this._setImage(t.img);},e.prototype.isStroke=function(){return!1;},e.prototype.isOnlyHitBox=function(){return!0;},e.prototype._afterLoading=function(){if(!0===this.get("toDraw")){var t=this.get("canvas");t?t.draw():this.createPath(this.get("context"));}},e.prototype._setImage=function(t){var e=this,n=this.attrs;if(!(null==K?void 0:K.isMini())||(null==K?void 0:K.isMiniNative())){if(Object(a.isString)(t)){var r=null;(r=(null==K?void 0:K.isMiniNative())?null==K?void 0:K.get("container").createImage():new Image()).onload=function(){if(e.destroyed)return!1;e.attr("img",r),e.set("loading",!1),e._afterLoading();var t=e.get("callback");t&&t.call(e);},r.crossOrigin="Anonymous",r.src=t,this.set("loading",!0);}else(null==K?void 0:K.isMiniNative())||t instanceof Image?(n.width||(n.width=t.width),n.height||(n.height=t.height)):Z(t)&&(n.width||(n.width=Number(t.getAttribute("width"))),n.height||(n.height,Number(t.getAttribute("height"))));}else this.attr("img",t);},e.prototype.onAttrChange=function(e,n,r){t.prototype.onAttrChange.call(this,e,n,r),"img"===e&&this._setImage(n);},e.prototype.createPath=function(t){var e=this.attr(),n=e.img,r=e.x,i=e.y,o=e.width,s=e.height,c=e.sx,u=e.sy,h=e.swidth,l=e.sheight;if(this.get("loading"))return this.set("toDraw",!0),void this.set("context",t);(null==K?void 0:K.isMini())?t.drawImage(n,r,i,o,s):(n instanceof Image||Z(n))&&(Object(a.isNil)(c)||Object(a.isNil)(u)||Object(a.isNil)(h)||Object(a.isNil)(l)?t.drawImage(n,r,i,o,s):t.drawImage(n,c,u,h,l,r,i,o,s));},e;}(V),Q=n(7);function J(t,e,n,r,i,o,a){var s=Math.min(t,n),c=Math.max(t,n),u=Math.min(e,r),h=Math.max(e,r),l=i/2;return o>=s-l&&o<=c+l&&a>=u-l&&a<=h+l&&Q.c.pointToLine(t,e,n,r,o,a)<=i/2;}var tt=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(i.c)(e,t),e.prototype.getDefaultAttrs=function(){var e=t.prototype.getDefaultAttrs.call(this);return Object(i.a)(Object(i.a)({},e),{x1:0,y1:0,x2:0,y2:0,startArrow:!1,endArrow:!1});},e.prototype.initAttrs=function(t){this.setArrow();},e.prototype.onAttrChange=function(e,n,r){t.prototype.onAttrChange.call(this,e,n,r),this.setArrow();},e.prototype.setArrow=function(){var t=this.attr(),e=t.x1,n=t.y1,r=t.x2,i=t.y2,o=t.startArrow,a=t.endArrow;o&&N(this,t,r,i,e,n),a&&B(this,t,e,n,r,i);},e.prototype.isInStrokeOrPath=function(t,e,n,r,i){if(!n||!i)return!1;var o=this.attr();return J(o.x1,o.y1,o.x2,o.y2,i,t,e);},e.prototype.createPath=function(t){var e=this.attr(),n=e.x1,r=e.y1,i=e.x2,o=e.y2,a=e.startArrow,s=e.endArrow,c={dx:0,dy:0},u={dx:0,dy:0};a&&a.d&&(c=T(n,r,i,o,e.startArrow.d)),s&&s.d&&(u=T(n,r,i,o,e.endArrow.d)),t.beginPath(),t.moveTo(n+c.dx,r+c.dy),t.lineTo(i-u.dx,o-u.dy);},e.prototype.afterDrawPath=function(t){var e=this.get("startArrowShape"),n=this.get("endArrowShape");e&&e.draw(t),n&&n.draw(t);},e.prototype.getTotalLength=function(){var t=this.attr(),e=t.x1,n=t.y1,r=t.x2,i=t.y2;return Q.c.length(e,n,r,i);},e.prototype.getPoint=function(t){var e=this.attr(),n=e.x1,r=e.y1,i=e.x2,o=e.y2;return Q.c.pointAt(n,r,i,o,t);},e;}(V),et=n(22),nt={circle:function circle(t,e,n){return[["M",t-n,e],["A",n,n,0,1,0,t+n,e],["A",n,n,0,1,0,t-n,e]];},square:function square(t,e,n){return[["M",t-n,e-n],["L",t+n,e-n],["L",t+n,e+n],["L",t-n,e+n],["Z"]];},diamond:function diamond(t,e,n){return[["M",t-n,e],["L",t,e-n],["L",t+n,e],["L",t,e+n],["Z"]];},triangle:function triangle(t,e,n){var r=n*Math.sin(1/3*Math.PI);return[["M",t-n,e+r],["L",t,e-r],["L",t+n,e+r],["Z"]];},"triangle-down":function triangleDown(t,e,n){var r=n*Math.sin(1/3*Math.PI);return[["M",t-n,e-r],["L",t+n,e-r],["L",t,e+r],["Z"]];}},rt=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(i.c)(e,t),e.prototype.initAttrs=function(t){this._resetParamsCache();},e.prototype._resetParamsCache=function(){this.set("paramsCache",{});},e.prototype.onAttrChange=function(e,n,r){t.prototype.onAttrChange.call(this,e,n,r),-1!==["symbol","x","y","r","radius"].indexOf(e)&&this._resetParamsCache();},e.prototype.isOnlyHitBox=function(){return!0;},e.prototype._getR=function(t){return Object(a.isNil)(t.r)?t.radius:t.r;},e.prototype._getPath=function(){var t,n,r=this.attr(),i=r.x,o=r.y,s=r.symbol||"circle",c=this._getR(r);if(Object(a.isFunction)(s))n=(t=s)(i,o,c),n=Object(et.c)(n);else{if(!(t=e.Symbols[s]))return console.warn(s+" marker is not supported."),null;n=t(i,o,c);}return n;},e.prototype.createPath=function(t){X(this,t,{path:this._getPath()},this.get("paramsCache"));},e.Symbols=nt,e;}(V);function it(t){return Math.abs(t)<1e-6?0:t<0?-1:1;}function ot(t,e,n){return(n[0]-t[0])*(e[1]-t[1])==(e[0]-t[0])*(n[1]-t[1])&&Math.min(t[0],e[0])<=n[0]&&n[0]<=Math.max(t[0],e[0])&&Math.min(t[1],e[1])<=n[1]&&n[1]<=Math.max(t[1],e[1]);}function at(t,e,n){var r=!1,i=t.length;if(i<=2)return!1;for(var o=0;o<i;o++){var a=t[o],s=t[(o+1)%i];if(ot(a,s,[e,n]))return!0;it(a[1]-n)>0!=it(s[1]-n)>0&&it(e-(n-a[1])*(a[0]-s[0])/(a[1]-s[1])-a[0])<0&&(r=!r);}return r;}var st=n(3),ct=n(72);function ut(t,e,n,r,i,o,a,s){var c=(Math.atan2(s-e,a-t)+2*Math.PI)%(2*Math.PI);if(c<r||c>i)return!1;var u={x:t+n*Math.cos(c),y:e+n*Math.sin(c)};return l(u.x,u.y,a,s)<=o/2;}var ht=st.a.transform;var lt=Object(i.a)({hasArc:function hasArc(t){for(var e=!1,n=t.length,r=0;r<n;r++){var i=t[r][0];if("C"===i||"A"===i||"Q"===i){e=!0;break;}}return e;},extractPolygons:function extractPolygons(t){for(var e=t.length,n=[],r=[],i=[],o=0;o<e;o++){var a=t[o],s=a[0];"M"===s?(i.length&&(r.push(i),i=[]),i.push([a[1],a[2]])):"Z"===s?i.length&&(n.push(i),i=[]):i.push([a[1],a[2]]);}return i.length>0&&r.push(i),{polygons:n,polylines:r};},isPointInStroke:function isPointInStroke(t,e,n,r,i){for(var o=!1,a=e/2,s=0;s<t.length;s++){var c=t[s],u=c.currentPoint,h=c.params,l=c.prePoint,d=c.box;if(!d||f(d.x-a,d.y-a,d.width+e,d.height+e,n,r)){switch(c.command){case"L":case"Z":o=J(l[0],l[1],u[0],u[1],e,n,r);break;case"Q":o=Q.e.pointDistance(l[0],l[1],h[1],h[2],h[3],h[4],n,r)<=e/2;break;case"C":o=Q.b.pointDistance(l[0],l[1],h[1],h[2],h[3],h[4],h[5],h[6],n,r,i)<=e/2;break;case"A":var p=c.arcParams,g=p.cx,v=p.cy,y=p.rx,m=p.ry,b=p.startAngle,x=p.endAngle,w=p.xRotation,S=[n,r,1],O=y>m?y:m,M=ht(null,[["t",-g,-v],["r",-w],["s",1/(y>m?1:y/m),1/(y>m?m/y:1)]]);ct.transformMat3(S,S,M),o=ut(0,0,O,b,x,e,S[0],S[1]);}if(o)break;}}return o;}},o.e);function ft(t,e,n){for(var r=!1,i=0;i<t.length;i++){if(r=at(t[i],e,n))break;}return r;}var dt=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(i.c)(e,t),e.prototype.getDefaultAttrs=function(){var e=t.prototype.getDefaultAttrs.call(this);return Object(i.a)(Object(i.a)({},e),{startArrow:!1,endArrow:!1});},e.prototype.initAttrs=function(t){this._setPathArr(t.path),this.setArrow();},e.prototype.onAttrChange=function(e,n,r){t.prototype.onAttrChange.call(this,e,n,r),"path"===e&&this._setPathArr(n),this.setArrow();},e.prototype._setPathArr=function(t){this.attrs.path=Object(et.c)(t);var e=lt.hasArc(t);this.set("hasArc",e),this.set("paramsCache",{}),this.set("segments",null),this.set("curve",null),this.set("tCache",null),this.set("totalLength",null);},e.prototype.getSegments=function(){var t=this.get("segements");return t||(t=Object(et.d)(this.attr("path")),this.set("segments",t)),t;},e.prototype.setArrow=function(){var t,e=this.attr(),n=e.startArrow,r=e.endArrow;n&&N(this,e,(t=this.getStartTangent())[0][0],t[0][1],t[1][0],t[1][1]);r&&B(this,e,(t=this.getEndTangent())[0][0],t[0][1],t[1][0],t[1][1]);},e.prototype.isInStrokeOrPath=function(t,e,n,r,i){var o=this.getSegments(),a=(this.get("hasArc"),!1);if(n){var s=this.getTotalLength();a=lt.isPointInStroke(o,i,t,e,s);}if(!a&&r){var c=this.attr("path"),u=lt.extractPolygons(c);a=ft(u.polygons,t,e)||ft(u.polylines,t,e);}return a;},e.prototype.createPath=function(t){X(this,t,this.attr(),this.get("paramsCache"));},e.prototype.afterDrawPath=function(t){var e=this.get("startArrowShape"),n=this.get("endArrowShape");e&&e.draw(t),n&&n.draw(t);},e.prototype.getTotalLength=function(){var t=this.get("totalLength");return Object(a.isNil)(t)?(this._calculateCurve(),this._setTcache(),this.get("totalLength")):t;},e.prototype.getPoint=function(t){var e,n,r=this.get("tCache");r||(this._calculateCurve(),this._setTcache(),r=this.get("tCache"));var i=this.get("curve");if(!r||0===r.length)return i?{x:i[0][1],y:i[0][2]}:null;Object(a.each)(r,function(r,i){t>=r[0]&&t<=r[1]&&(e=(t-r[0])/(r[1]-r[0]),n=i);});var o=i[n];if(Object(a.isNil)(o)||Object(a.isNil)(n))return null;var s=o.length,c=i[n+1];return Q.b.pointAt(o[s-2],o[s-1],c[1],c[2],c[3],c[4],c[5],c[6],e);},e.prototype._calculateCurve=function(){var t=this.attr().path;this.set("curve",lt.pathToCurve(t));},e.prototype._setTcache=function(){var t,e,n,r,i=0,o=0,s=[],c=this.get("curve");c&&(Object(a.each)(c,function(t,e){n=c[e+1],r=t.length,n&&(i+=Q.b.length(t[r-2],t[r-1],n[1],n[2],n[3],n[4],n[5],n[6])||0);}),this.set("totalLength",i),0!==i?(Object(a.each)(c,function(a,u){n=c[u+1],r=a.length,n&&((t=[])[0]=o/i,e=Q.b.length(a[r-2],a[r-1],n[1],n[2],n[3],n[4],n[5],n[6]),o+=e||0,t[1]=o/i,s.push(t));}),this.set("tCache",s)):this.set("tCache",[]));},e.prototype.getStartTangent=function(){var t,e=this.getSegments();if(e.length>1){var n=e[0].currentPoint,r=e[1].currentPoint,i=e[1].startTangent;t=[],i?(t.push([n[0]-i[0],n[1]-i[1]]),t.push([n[0],n[1]])):(t.push([r[0],r[1]]),t.push([n[0],n[1]]));}return t;},e.prototype.getEndTangent=function(){var t,e=this.getSegments(),n=e.length;if(n>1){var r=e[n-2].currentPoint,i=e[n-1].currentPoint,o=e[n-1].endTangent;t=[],o?(t.push([i[0]-o[0],i[1]-o[1]]),t.push([i[0],i[1]])):(t.push([r[0],r[1]]),t.push([i[0],i[1]]));}return t;},e;}(V);function pt(t,e,n,r,i){var o=t.length;if(o<2)return!1;for(var a=0;a<o-1;a++){if(J(t[a][0],t[a][1],t[a+1][0],t[a+1][1],e,n,r))return!0;}if(i){var s=t[0],c=t[o-1];if(J(s[0],s[1],c[0],c[1],e,n,r))return!0;}return!1;}var gt=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(i.c)(e,t),e.prototype.isInStrokeOrPath=function(t,e,n,r,i){var o=this.attr().points,a=!1;return n&&(a=pt(o,i,t,e,!0)),!a&&r&&(a=at(o,t,e)),a;},e.prototype.createPath=function(t){var e=this.attr().points;if(!(e.length<2)){t.beginPath();for(var n=0;n<e.length;n++){var r=e[n];0===n?t.moveTo(r[0],r[1]):t.lineTo(r[0],r[1]);}t.closePath();}},e;}(V),vt=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(i.c)(e,t),e.prototype.getDefaultAttrs=function(){var e=t.prototype.getDefaultAttrs.call(this);return Object(i.a)(Object(i.a)({},e),{startArrow:!1,endArrow:!1});},e.prototype.initAttrs=function(t){this.setArrow();},e.prototype.onAttrChange=function(e,n,r){t.prototype.onAttrChange.call(this,e,n,r),this.setArrow(),-1!==["points"].indexOf(e)&&this._resetCache();},e.prototype._resetCache=function(){this.set("totalLength",null),this.set("tCache",null);},e.prototype.setArrow=function(){var t=this.attr(),e=this.attrs,n=e.points,r=e.startArrow,i=e.endArrow,o=n.length,a=n[0][0],s=n[0][1],c=n[o-1][0],u=n[o-1][1];r&&N(this,t,n[1][0],n[1][1],a,s),i&&B(this,t,n[o-2][0],n[o-2][1],c,u);},e.prototype.isFill=function(){return!1;},e.prototype.isInStrokeOrPath=function(t,e,n,r,i){return!(!n||!i)&&pt(this.attr().points,i,t,e,!1);},e.prototype.isStroke=function(){return!0;},e.prototype.createPath=function(t){var e=this.attr(),n=e.points,r=e.startArrow,i=e.endArrow,o=n.length;if(!(n.length<2)){var a,s=n[0][0],c=n[0][1],u=n[o-1][0],h=n[o-1][1];if(r&&r.d)s+=(a=T(s,c,n[1][0],n[1][1],r.d)).dx,c+=a.dy;if(i&&i.d)u-=(a=T(n[o-2][0],n[o-2][1],u,h,i.d)).dx,h-=a.dy;t.beginPath(),t.moveTo(s,c);for(var l=0;l<o-1;l++){var f=n[l];t.lineTo(f[0],f[1]);}t.lineTo(u,h);}},e.prototype.afterDrawPath=function(t){var e=this.get("startArrowShape"),n=this.get("endArrowShape");e&&e.draw(t),n&&n.draw(t);},e.prototype.getTotalLength=function(){var t=this.attr().points,e=this.get("totalLength");return Object(a.isNil)(e)?(this.set("totalLength",Q.d.length(t)),this.get("totalLength")):e;},e.prototype.getPoint=function(t){var e,n,r=this.attr().points,i=this.get("tCache");return i||(this._setTcache(),i=this.get("tCache")),Object(a.each)(i,function(r,i){t>=r[0]&&t<=r[1]&&(e=(t-r[0])/(r[1]-r[0]),n=i);}),Q.c.pointAt(r[n][0],r[n][1],r[n+1][0],r[n+1][1],e);},e.prototype._setTcache=function(){var t=this.attr().points;if(t&&0!==t.length){var e=this.getTotalLength();if(!(e<=0)){var n,r,i=0,o=[];Object(a.each)(t,function(a,s){t[s+1]&&((n=[])[0]=i/e,r=Q.c.length(a[0],a[1],t[s+1][0],t[s+1][1]),i+=r,n[1]=i/e,o.push(n));}),this.set("tCache",o);}}},e.prototype.getStartTangent=function(){var t=this.attr().points,e=[];return e.push([t[1][0],t[1][1]]),e.push([t[0][0],t[0][1]]),e;},e.prototype.getEndTangent=function(){var t=this.attr().points,e=t.length-1,n=[];return n.push([t[e-1][0],t[e-1][1]]),n.push([t[e][0],t[e][1]]),n;},e;}(V);var yt=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(i.c)(e,t),e.prototype.getDefaultAttrs=function(){var e=t.prototype.getDefaultAttrs.call(this);return Object(i.a)(Object(i.a)({},e),{x:0,y:0,width:0,height:0,radius:0});},e.prototype.isInStrokeOrPath=function(t,e,n,r,i){var o=this.attr(),a=o.x,s=o.y,c=o.width,u=o.height,h=o.radius;if(h){var l=!1;return n&&(l=function(t,e,n,r,i,o,a,s){return J(t+i,e,t+n-i,e,o,a,s)||J(t+n,e+i,t+n,e+r-i,o,a,s)||J(t+n-i,e+r,t+i,e+r,o,a,s)||J(t,e+r-i,t,e+i,o,a,s)||ut(t+n-i,e+i,i,1.5*Math.PI,2*Math.PI,o,a,s)||ut(t+n-i,e+r-i,i,0,0.5*Math.PI,o,a,s)||ut(t+i,e+r-i,i,0.5*Math.PI,Math.PI,o,a,s)||ut(t+i,e+i,i,Math.PI,1.5*Math.PI,o,a,s);}(a,s,c,u,h,i,t,e)),!l&&r&&(l=f(a,s,c,u,t,e)),l;}var d=i/2;return r&&n?f(a-d,s-d,c+d,u+d,t,e):r?f(a,s,c,u,t,e):n?function(t,e,n,r,i,o,a){var s=i/2;return f(t-s,e-s,n,i,o,a)||f(t+n-s,e-s,i,r,o,a)||f(t+s,e+r-s,n,i,o,a)||f(t-s,e+s,i,r,o,a);}(a,s,c,u,i,t,e):void 0;},e.prototype.createPath=function(t){var e=this.attr(),n=e.x,r=e.y,i=e.width,o=e.height,s=e.radius;if(t.beginPath(),0===s)t.rect(n,r,i,o);else{var c=function(t){var e=0,n=0,r=0,i=0;return Object(a.isArray)(t)?1===t.length?e=n=r=i=t[0]:2===t.length?(e=r=t[0],n=i=t[1]):3===t.length?(e=t[0],n=i=t[1],r=t[2]):(e=t[0],n=t[1],r=t[2],i=t[3]):e=n=r=i=t,[e,n,r,i];}(s),u=c[0],h=c[1],l=c[2],f=c[3];t.moveTo(n+u,r),t.lineTo(n+i-h,r),0!==h&&t.arc(n+i-h,r+h,h,-Math.PI/2,0),t.lineTo(n+i,r+o-l),0!==l&&t.arc(n+i-l,r+o-l,l,0,Math.PI/2),t.lineTo(n+f,r+o),0!==f&&t.arc(n+f,r+o-f,f,Math.PI/2,Math.PI),t.lineTo(n,r+u),0!==u&&t.arc(n+u,r+u,u,Math.PI,1.5*Math.PI),t.closePath();}},e;}(V),mt=function(t){function e(){return null!==t&&t.apply(this,arguments)||this;}return Object(i.c)(e,t),e.prototype.getDefaultAttrs=function(){var e=t.prototype.getDefaultAttrs.call(this);return Object(i.a)(Object(i.a)({},e),{x:0,y:0,text:null,fontSize:12,fontFamily:"sans-serif",fontStyle:"normal",fontWeight:"normal",fontVariant:"normal",textAlign:"start",textBaseline:"bottom"});},e.prototype.isOnlyHitBox=function(){return!0;},e.prototype.initAttrs=function(t){this._assembleFont(),t.text&&this._setText(t.text);},e.prototype._assembleFont=function(){var t=this.attrs;t.font=Object(o.f)(t);},e.prototype._setText=function(t){var e=null;Object(a.isString)(t)&&-1!==t.indexOf("\n")&&(e=t.split("\n")),this.set("textArr",e);},e.prototype.onAttrChange=function(e,n,r){t.prototype.onAttrChange.call(this,e,n,r),e.startsWith("font")&&this._assembleFont(),"text"===e&&this._setText(n);},e.prototype._getSpaceingY=function(){var t=this.attrs,e=t.lineHeight,n=1*t.fontSize;return e?e-n:0.14*n;},e.prototype._drawTextArr=function(t,e,n){var r,i=this.attrs,s=i.textBaseline,c=i.x,u=i.y,h=1*i.fontSize,l=this._getSpaceingY(),f=Object(o.h)(i.text,i.fontSize,i.lineHeight);Object(a.each)(e,function(e,i){r=u+i*(l+h)-f+h,"middle"===s&&(r+=f-h-(f-h)/2),"top"===s&&(r+=f-h),n?t.fillText(e,c,r):t.strokeText(e,c,r);});},e.prototype._drawText=function(t,e){var n=this.attr(),r=n.x,i=n.y,o=this.get("textArr");if(o)this._drawTextArr(t,o,e);else{var a=n.text;e?t.fillText(a,r,i):t.strokeText(a,r,i);}},e.prototype.strokeAndFill=function(t){var e=this.attrs,n=e.lineWidth,r=e.opacity,i=e.strokeOpacity,o=e.fillOpacity;this.isStroke()&&n>0&&(Object(a.isNil)(i)||1===i||(t.globalAlpha=r),this.stroke(t)),this.isFill()&&(Object(a.isNil)(o)||1===o?this.fill(t):(t.globalAlpha=o,this.fill(t),t.globalAlpha=r)),this.afterDrawPath(t);},e.prototype.fill=function(t){this._drawText(t,!0);},e.prototype.stroke=function(t){this._drawText(t,!1);},e;}(V);function bt(t,e,n){var r=t.getTotalMatrix();if(r){var i=function(t,e){if(e){var n=Object(o.i)(e);return Object(o.k)(n,t);}return t;}([e,n,1],r);return[i[0],i[1]];}return[e,n];}function xt(t,e,n){if(t.isCanvas&&t.isCanvas())return!0;if(!Object(o.j)(t)||!1===t.cfg.isInView)return!1;if(t.cfg.clipShape){var r=bt(t,e,n),i=r[0],a=r[1];if(t.isClipped(i,a))return!1;}var s=t.cfg.cacheCanvasBBox||t.getCanvasBBox();return e>=s.minX&&e<=s.maxX&&n>=s.minY&&n<=s.maxY;}var wt=n(30),St=n.n(wt);function Ot(t,e,n){n.name=e,n.target=t,n.currentTarget=t,n.delegateTarget=t,t.emit(e,n);}function Mt(t,e,n){if(n.bubbles){t.isCanvas(),0,n.name=e,n.currentTarget=t,n.delegateTarget=t,t.emit(e,n);}}var kt=function(){function t(t){var e=this;this.draggingShape=null,this.dragging=!1,this.currentShape=null,this.panstartShape=null,this.panstartPoint=null,this.handleEvent=function(t){e.hammerRuntime.emit("origin_input:"+t.type,t);},this.canvas=t.canvas,this._initEvent();}return t.prototype._initEvent=function(){var t=this;this.hammerRuntime=new St.a({},{inputClass:wt.TouchInput}),this.hammerRuntime.add(new St.a.Pan({threshold:0,pointers:1})),this.hammerRuntime.add(new St.a.Swipe()).recognizeWith(this.hammerRuntime.get("pan")),this.hammerRuntime.add(new St.a.Pinch({threshold:0,pointers:2})),this.hammerRuntime.add(new St.a.Tap({event:"dbltap",taps:2})),this.hammerRuntime.add(new St.a.Tap()),this.hammerRuntime.add(new St.a.Press({time:500})),this.hammerRuntime.on("panstart panmove panend pancancel",function(e){e.srcEvent.extra=e;var n=t._getPointInfo(e),r=t._getShape(n,e);"panend"!==e.type&&"pancancel"!==e.type||t._onpanend(n,r,e),"panstart"===e.type&&(t.dragging&&(t.draggingShape=null,t.dragging=!1,t.panstartShape=null,t.panstartPoint=null),t._onpanstart(n,r,e)),"panmove"===e.type&&t._onpanmove(n,r,e),t.currentShape=r;}),this.hammerRuntime.on("tap dbltap press swipe rotatestart rotatemove",function(e){t._emitMobileEvent(e.type,e);}),this.hammerRuntime.on("pinchstart pinchmove pinchend pinchcancel",function(e){"pinchend"!==e.type&&"pinchcancel"!==e.type?(e.srcEvent.extra={scale:e.scale},t._emitMobileEvent(e.type,e)):t._emitMobileEvent(e.type,e);});},t.prototype._emitMobileEvent=function(t,e){var n=this._getPointInfo(e),r=this._getShape(n,e);this._emitEvent(t,e,n,r);},t.prototype._getEventObj=function(t,e,n,r,i,a){var s=new o.d(t,e);return s.fromShape=i,s.toShape=a,s.x=n.x,s.y=n.y,s.clientX=n.clientX,s.clientY=n.clientY,s.propagationPath.push(r),s;},t.prototype._getShape=function(t,e){var n=e.srcEvent;return this.canvas.getShape(t.x,t.y,n);},t.prototype._getPointInfo=function(t){var e=this.canvas,n=e.getClientByEvent(t),r=e.getPointByEvent(t);return{x:r.x,y:r.y,clientX:n.x,clientY:n.y};},t.prototype._triggerEvent=function(t,e){var n=this._getPointInfo(e),r=this._getShape(n,e),i=this["_on"+t];if(i)i.call(this,n,r,e);else{var o=this.currentShape;"panstart"===t||"dragenter"===t?(this._emitEvent(t,e,n,null,null,r),r&&this._emitEvent(t,e,n,r,null,r),"panstart"===t&&this.draggingShape&&this._emitEvent("dragenter",e,n,null)):"panend"===t||"dragleave"===t?(o&&this._emitEvent(t,e,n,o,o,null),this._emitEvent(t,e,n,null,o,null),"panend"===t&&this.draggingShape&&this._emitEvent("dragleave",e,n,null)):this._emitEvent(t,e,n,r,null,null);}},t.prototype._onpanstart=function(t,e,n){this.panstartShape=e,this.panstartPoint=t,this.panstartTimeStamp=n.timeStamp,this._emitEvent("panstart",n,t,e,null,null);},t.prototype._emitDragoverEvents=function(t,e,n,r,i){r?(r!==n&&(n&&this._emitEvent("dragleave",t,e,n,n,r),this._emitEvent("dragenter",t,e,r,n,r)),i||this._emitEvent("dragover",t,e,r)):n&&this._emitEvent("dragleave",t,e,n,n,r),i&&this._emitEvent("dragover",t,e,r);},t.prototype._afterDrag=function(t,e,n){t&&(t.set("capture",!0),this.draggingShape=null),this.dragging=!1;var r=this._getShape(e,n);this.currentShape=r;},t.prototype._onpanend=function(t,e,n){var r=this.draggingShape;this.dragging&&(r&&this._emitEvent("drop",n,t,e),this._emitEvent("dragend",n,t,r),this._afterDrag(r,t,n)),this._emitEvent("panend",n,t,e),this.panstartShape=null,this.panstartPoint=null;},t.prototype._onpanmove=function(t,e,n){var r=this.canvas,i=this.currentShape,o=this.draggingShape;if(this.dragging)o&&this._emitDragoverEvents(n,t,i,e,!1),this._emitEvent("drag",n,t,o);else{var a=this.panstartPoint;if(a){var s=this.panstartShape,c=n.timeStamp-this.panstartTimeStamp,u=a.clientX-t.clientX,h=a.clientY-t.clientY;(c>120||u*u+h*h>40)&&(s&&s.get("draggable")?((o=this.panstartShape).set("capture",!1),this.draggingShape=o,this.dragging=!0,this._emitEvent("dragstart",n,t,o),this.panstartShape=null,this.panstartPoint=null):!s&&r.get("draggable")?(this.dragging=!0,this._emitEvent("dragstart",n,t,null),this.panstartShape=null,this.panstartPoint=null):this._emitEvent("panmove",n,t,e));}}this._emitEvent("panmove",n,t,e);},t.prototype._emitEvent=function(t,e,n,r,i,o){var a=this._getEventObj(t,e,n,r,i,o);if(r){a.shape=r,Ot(r,t,a);for(var s=r.getParent();s;){s.emitDelegation(t,a),a.propagationStopped||Mt(s,t,a),a.propagationPath.push(s),s=s.getParent();}}else{Ot(this.canvas,t,a);}},t.prototype.destroy=function(){this.canvas=null,this.currentShape=null,this.draggingShape=null,this.panstartPoint=null,this.panstartShape=null,this.panstartTimeStamp=null;},t;}(),Ct=function(){function t(){}return t.prototype.set=function(t,e,n){switch(e){case"strokeStyle":t.setStrokeStyle(n);break;case"fillStyle":t.setFillStyle(n);break;case"lineWidth":t.setLineWidth(n);break;case"lineDash":t.setLineDash(n);break;case"globalAlpha":(n||0===n)&&(t.globalAlpha=n,t.setGlobalAlpha(n));break;case"fontSize":t.setFontSize(n);break;case"textAlign":t.setTextAlign(n);break;case"fontStyle":case"font":t.setFont(n);break;case"textBaseline":t.setTextBaseline(n);break;default:t[e]=n;}return!0;},t.prototype.get=function(t,e){return"globalAlpha"===e&&void 0===t[e]?1:"function"==typeof t[e]?t[e].bind(t):t[e];},t;}(),Et=n(98),jt=null;var Pt=function Pt(t){var e=t.attr(),n=e.x,r=e.y,i=e.text,o=e.fontSize,s=e.lineHeight,c=e.font;c||(c=Object(Et.assembleFont)(e));var u,h=function(t,e){var n=0;if(Object(a.isNil)(t)||""===t)return n;if(jt.save(),jt.font=e,Object(a.isString)(t)&&t.includes("\n")){var r=t.split("\n");Object(a.each)(r,function(t){var e=jt.measureText(t).width;n<e&&(n=e);});}else n=jt.measureText(t).width;return jt.restore(),n;}(i,c);if(h){var l=e.textAlign,f=e.textBaseline,d=Object(Et.getTextHeight)(i,o,s),p={x:n,y:r-d};l&&("end"===l||"right"===l?p.x-=h:"center"===l&&(p.x-=h/2)),f&&("top"===f?p.y+=d:"middle"===f&&(p.y+=d/2)),u={x:p.x,y:p.y,width:h,height:d};}else u={x:n,y:r,width:0,height:0};return u;},At=function At(t){jt=t,Object(o.l)("text",Pt);},It=function It(t,e){!function(t){K=t;}(e),At(t);},Tt=function(t){function e(e){var n,r=t.call(this,e)||this,i=r.get("context");return r.isMini()&&(r.isMiniNative()?(void 0===(n=r.get("container"))&&(n={}),n=n):r.set("context",new Proxy(i,new Ct())),It(i,r)),r;}return Object(i.c)(e,t),e.prototype.isMiniNative=function(){return"mini-native"===this.get("renderer");},e.prototype.isMini=function(){return this.get("renderer").startsWith("mini");},e.prototype.getDefaultCfg=function(){var e=t.prototype.getDefaultCfg.call(this);return e.renderer="canvas",e.autoDraw=!0,e.localRefresh=!0,e.refreshElements=[],e.clipView=!0,e.quickHit=!1,e.boundingClientRect={width:0,height:0,left:0,top:0,bottom:0,right:0},e;},e.prototype.initEvents=function(){var t=new kt({canvas:this});this.set("eventController",t);},e.prototype.registerEventCallback=function(t){this.get("eventController").handleEvent(t);},e.prototype.clearEvents=function(){this.get("eventController").destroy();},e.prototype.onCanvasChange=function(t){"attr"!==t&&"sort"!==t&&"changeSize"!==t||(this.set("refreshElements",[this]),this.draw());},e.prototype.getShapeBase=function(){return r;},e.prototype.getGroupBase=function(){return q;},e.prototype.getPixelRatio=function(){var t=this.get("pixelRatio")||("object"===("undefined"==typeof window?"undefined":h(window))&&window.devicePixelRatio?window.devicePixelRatio:1);return t>=1?Math.ceil(t):1;},e.prototype.getViewRange=function(){return{minX:0,minY:0,maxX:this.cfg.width,maxY:this.cfg.height};},e.prototype.initDom=function(){if(this.isMini()){var e=this.get("context"),n=this.getPixelRatio();n>1&&e.scale(n,n);}else t.prototype.initDom.call(this);},e.prototype.createDom=function(){var t=document.createElement("canvas"),e=t.getContext("2d");return this.set("context",e),t;},e.prototype.setDOMSize=function(e,n){t.prototype.setDOMSize.call(this,e,n);var r=this.get("context"),i=this.get("el"),o=this.getPixelRatio();i.width=o*e,i.height=o*n,o>1&&r.scale(o,o);},e.prototype.clear=function(){t.prototype.clear.call(this),this._clearFrame(),this.get("context").clearRect(0,0,this.get("width"),this.get("height"));},e.prototype.getShape=function(e,n){return this.get("quickHit")?function t(e,n,r){if(!xt(e,n,r))return null;for(var i=null,o=e.getChildren(),a=o.length-1;a>=0;a--){var s=o[a];if(s.isGroup())i=t(s,n,r);else if(xt(s,n,r)){var c=s,u=bt(s,n,r),h=u[0],l=u[1];c.isInShape(h,l)&&(i=s);}if(i)break;}return i;}(this,e,n):t.prototype.getShape.call(this,e,n,null);},e.prototype._getRefreshRegion=function(){var t,e=this.get("refreshElements"),n=this.getViewRange();e.length&&e[0]===this?t=n:(t=function(t){if(!t.length)return null;var e=[],n=[],r=[],i=[];return Object(a.each)(t,function(t){var o=W(t);o&&(e.push(o.minX),n.push(o.minY),r.push(o.maxX),i.push(o.maxY));}),{minX:Math.min.apply(null,e),minY:Math.min.apply(null,n),maxX:Math.max.apply(null,r),maxY:Math.max.apply(null,i)};}(e))&&(t.minX=Math.floor(t.minX),t.minY=Math.floor(t.minY),t.maxX=Math.ceil(t.maxX),t.maxY=Math.ceil(t.maxY),t.maxY+=1,this.get("clipView")&&(t=function(t,e){return t&&e&&d(t,e)?{minX:Math.max(t.minX,e.minX),minY:Math.max(t.minY,e.minY),maxX:Math.min(t.maxX,e.maxX),maxY:Math.min(t.maxY,e.maxY)}:null;}(t,n)));return t;},e.prototype._clearFrame=function(){var t=this.get("drawFrame");t&&(u(t),this.set("drawFrame",null),this.set("refreshElements",[]));},e.prototype.draw=function(){var t=this.get("drawFrame");this.get("autoDraw")&&t||this._startDraw();},e.prototype._startDraw=function(){var t,e=this,n=this.get("drawFrame");n||(t=function t(){e.get("localRefresh")?e._drawRegion():e._drawAll(),u(n),e.set("drawFrame",null);},n=(null==c?void 0:c.requestAnimationFrame)?c.requestAnimationFrame(t):("object"===("undefined"==typeof window?"undefined":s(window))&&window.requestAnimationFrame?window.requestAnimationFrame:function(t){return setTimeout(t,16);})(t),this.set("drawFrame",n));},e.prototype._drawRegion=function(){var t=this.get("context"),e=this.get("refreshElements"),n=this.getChildren(),r=this._getRefreshRegion();r?(t.clearRect(r.minX,r.minY,r.maxX-r.minX,r.maxY-r.minY),t.save(),t.beginPath(),t.rect(r.minX,r.minY,r.maxX-r.minX,r.maxY-r.minY),t.clip(),D(t,this),R(this,n,r),_(t,n,r),t.restore()):e.length&&function t(e){for(var n=0;n<e.length;n++){var r=e[n];r.cfg.hasChanged=!1,r.isGroup()&&!r.destroyed&&t(r.cfg.children);}}(e),Object(a.each)(e,function(t){t.get("hasChanged")&&t.set("hasChanged",!1);}),this.isMini()&&!this.isMiniNative()&&t.draw(!0),this.set("refreshElements",[]);},e.prototype._drawAll=function(){var t=this.get("context"),e=this.getChildren();t.clearRect(0,0,this.get("width"),this.get("height")),D(t,this),_(t,e),this.isMini()&&!this.isMiniNative()&&t.draw(!0),this.set("refreshElements",[]);},e.prototype.skipDraw=function(){},e.prototype.refreshElement=function(t){this.get("refreshElements").push(t);},e.prototype.getPointByEvent=function(e){if(this.isMini()){var n=this.getClientByEvent(e),r=n.x,i=n.y;return this.getPointByClient(r,i);}return t.prototype.getPointByEvent.call(this,e);},e.prototype.getClientByEvent=function(t){var e=t.srcEvent,n=null;return e.touches&&(n="touchend"===e.type?e.changedTouches[0]:e.touches[0]),n?{x:n.clientX,y:n.clientY}:{};},e.prototype.getPointByClient=function(t,e){if(this.isMini()){var n=this.get("boundingClientRect");return{x:t+n.left,y:e+n.top};}var r=this.get("el").getBoundingClientRect();return{x:t-r.left,y:e-r.top};},e.prototype.removeDom=function(){this.isMini()||t.prototype.removeDom.call(this);},e.prototype.getClientByPoint=function(t,e){if(this.isMini()){var n=this.get("boundingClientRect");return{x:t+n.left,y:e+n.top};}var r=this.get("el").getBoundingClientRect();return{x:t+r.left,y:e+r.top};},e;}(o.a),Nt=n(4);var Bt=n(2),Lt=n(18),Dt=Bt.h.cloneEvent,_t=Bt.h.isViewportChanged,Rt=function(t){function e(e){var n=t.call(this,e)||this;return n.extendEvents=[],n.dragging=!1,n.preItem=null,n.graph=e,n.destroyed=!1,n;}return Object(i.c)(e,t),e.prototype.initEvents=function(){var t=this.graph,e=(this.extendEvents,t.get("canvas"));this.canvasHandler=Object(a.wrapBehavior)(this,"onCanvasEvents"),e.off("*").on("*",this.canvasHandler);},e.getItemRoot=function(t){for(;t&&!t.get("item");){t=t.get("parent");}return t;},e.prototype.onCanvasEvents=function(t){var n=this.graph,r=n.get("canvas"),i=t.target,o=t.type;t.canvasX=t.x,t.canvasY=t.y;var a={x:t.canvasX,y:t.canvasY},s=n.get("group").getMatrix();if(s||(s=[1,0,0,0,1,0,0,0,1]),_t(s)&&(a=n.getPointByClient(t.clientX,t.clientY)),t.x=a.x,t.y=a.y,t.currentTarget=n,i===r)return"panmove"===o&&this.handleTouchMove(t,"canvas"),t.target=r,t.item=null,n.emit(o,t),void n.emit("canvas:"+o,t);var c=e.getItemRoot(i);if(c){var u=c.get("item");if(!u.destroyed){var h=u.getType();if(t.target=i,t.item=u,t.canvasX===t.x&&t.canvasY===t.y){var l=n.getCanvasByPoint(t.x,t.y);t.canvasX=l.x,t.canvasY=l.y;}n.emit(o,t),t.name&&!t.name.includes(":")?n.emit(h+":"+o,t):n.emit(t.name,t),"dragstart"===o&&(this.dragging=!0),"dragend"===o&&(this.dragging=!1),"panmove"===o&&this.handleTouchMove(t,h);}}else n.emit(o,t);},e.prototype.onExtendEvents=function(t){this.graph.emit(t.type,t);},e.prototype.emitCustomEvent=function(t,e,n){n.type=e,this.graph.emit(t+":"+e,n);},e.prototype.destroy=function(){var t=this.graph,e=this.canvasHandler,n=this.extendEvents;t.get("canvas").off("*",e),Object(a.each)(n,function(t){t.remove();}),this.dragging=!1,this.preItem=null,this.extendEvents.length=0,this.canvasHandler=null,this.destroyed=!0;},e.prototype.handleTouchMove=function(t,e){var n=this.graph,r=this.preItem,i=n.get("canvas"),o=t.target===i?null:t.item;t=Dt(t),r&&r!==o&&!r.destroyed&&(t.item=r,this.emitCustomEvent(r.getType(),"touchleave",t),this.dragging&&this.emitCustomEvent(r.getType(),"dragleave",t)),o&&r!==o&&(t.item=o,this.emitCustomEvent(e,"touchenter",t),this.dragging&&this.emitCustomEvent(e,"dragenter",t)),this.preItem=o;},e;}(Bt.a),Ft=n(26),Yt=["force","grid","circular"],Xt=function(t){function e(e){var n=t.call(this,e)||this;return n.graph=e,n.layoutCfg=e.get("layout")||{},n.layoutType=n.getLayoutType(),n;}return Object(i.c)(e,t),e.prototype.updateLayoutCfg=function(t){var e=this,n=this.graph,r=this.layoutMethods,i=Object(a.mix)({},this.layoutCfg,t);if(this.layoutCfg=i,null==r?void 0:r.length){this.data=this.setDataFromGraph(),n.emit("beforelayout");var o=Promise.resolve();1===r.length?o=o.then(function(){return e.updateLayoutMethod(r[0],i);}):null==r||r.forEach(function(t,n){var r=i.pipes[n];o=o.then(function(){return e.updateLayoutMethod(t,r);});}),this.data=this.setDataFromGraph(),o.then(function(){i.onAllLayoutEnd&&i.onAllLayoutEnd();}).catch(function(t){console.warn("layout failed",t);});}else this.layout();},e.prototype.layout=function(t){var e=this,n=this.graph;this.data=this.setDataFromGraph();var r=this.data,o=r.nodes,a=r.hiddenNodes;if(!o)return!1;var s=n.get("width"),c=n.get("height"),u={};Object.assign(u,{width:s,height:c,center:[s/2,c/2]},this.layoutCfg),this.layoutCfg=u,this.destoryLayoutMethods(),n.emit("beforelayout"),this.initPositions(u.center,o),this.initPositions(u.center,a);var h=u.onLayoutEnd,l=u.layoutEndFormatted,f=u.adjust;l||(u.layoutEndFormatted=!0,u.onAllLayoutEnd=function(){return Object(i.b)(e,void 0,void 0,function(){return Object(i.d)(this,function(t){switch(t.label){case 0:return h&&h(),this.refreshLayout(),f&&u.pipes?[4,this.adjustPipesBox(this.data,f)]:[3,2];case 1:t.sent(),this.refreshLayout(),t.label=2;case 2:return n.emit("afterlayout"),[2];}});});});var d=Promise.resolve();return u.type?d=d.then(function(){return e.execLayoutMethod(u,0);}):u.pipes&&u.pipes.forEach(function(t,n){d=d.then(function(){return e.execLayoutMethod(t,n);});}),d.then(function(){u.onAllLayoutEnd&&u.onAllLayoutEnd(),t&&t();}).catch(function(t){console.warn("graph layout failed,",t);}),!1;},e.prototype.execLayoutMethod=function(t,e){var n=this;return new Promise(function(r,i){var o=n.graph,a=t.type;if(t.onLayoutEnd=function(){o.emit("aftersublayout",{type:a}),r();},"force"===a||"g6force"===a||"gForce"===a){var s=t.onTick,c=function c(){s&&s(),o.refreshPositions();};t.tick=c;}else"comboForce"===t.type&&(t.comboTrees=o.get("comboTrees"));var u;try{u=new Ft.a(t);}catch(t){console.warn("The layout method: '"+a+"' does not exist! Please specify it first."),i();}if(u.enableTick){var h=t.onTick;c=function c(){h&&h(),o.refreshPositions();};u.tick=c;}var l=n.filterLayoutData(n.data,t);!function(t,e){var n;if(!(null===(n=null==t?void 0:t.nodes)||void 0===n?void 0:n.length))return;t.nodes.forEach(function(t){t.layoutOrder=e;});}(l,e),u.init(l),o.emit("beforesublayout",{type:a}),u.execute(),u.isCustomLayout&&t.onLayoutEnd&&t.onLayoutEnd(),n.layoutMethods.push(u);});},e.prototype.updateLayoutMethod=function(t,e){var n=this;return new Promise(function(r,i){var o=n.graph,a=null==e?void 0:e.type;e.onLayoutEnd=function(){o.emit("aftersublayout",{type:a}),r();};var s=n.filterLayoutData(n.data,e);t.init(s),t.updateCfg(e),o.emit("beforesublayout",{type:a}),t.execute(),t.isCustomLayout&&e.onLayoutEnd&&e.onLayoutEnd();});},e.prototype.adjustPipesBox=function(t,e){var n=this;return new Promise(function(r){var i=t.nodes;(null==i?void 0:i.length)||r(),Yt.includes(e)||(console.warn("The adjust type "+e+" is not supported yet, please assign it with 'force', 'grid', or 'circular'."),r());var o={center:n.layoutCfg.center,nodeSize:function nodeSize(t){return Math.max(t.height,t.width);},preventOverlap:!0,onLayoutEnd:function onLayoutEnd(){}},s=n.getLayoutBBox(i),c=s.groupNodes,u=s.layoutNodes,h=Object(a.clone)(u);o.onLayoutEnd=function(){null==u||u.forEach(function(t,e){var n,r,i,o=t.x-(null===(n=h[e])||void 0===n?void 0:n.x),a=t.y-(null===(r=h[e])||void 0===r?void 0:r.y);null===(i=c[e])||void 0===i||i.forEach(function(t){t.x+=o,t.y+=a;});}),r();},new Ft.a(o).layout({nodes:u});});},e.prototype.destroy=function(){this.destoryLayoutMethods(),this.destroyed=!0,this.graph.set("layout",void 0),this.layoutCfg=void 0,this.layoutType=void 0,this.layoutMethods=void 0,this.graph=null;},e;}(Bt.c);var zt=n(43),Wt=function Wt(t,e,n){return n[t]&&console.warn("The graph with the name "+t+" exists already, it will be overridden"),n[t]=e(n),n;},qt=function(t){function e(e){var n=t.call(this,e)||this;n.get("renderer").startsWith("mini")&&n.set("context",e.context),t.prototype.init.call(n);var r=n.get("defaultNode");return r||n.set("defaultNode",{type:"circle"}),r.type||(r.type="circle",n.set("defaultNode",r)),n.destroyed=!1,n;}return Object(i.c)(e,t),e.prototype.init=function(){},e.prototype.emitEvent=function(t){var e=this.get("canvas");t.type=t.type.toLowerCase(),e.registerEventCallback(t);},e.prototype.initLayoutController=function(){var t=new Xt(this);this.set({layoutController:t});},e.prototype.initEventController=function(){var t=new Rt(this);if(this.set({eventController:t}),!this.get("renderer").startsWith("mini")){var e=this.get("canvas"),n=e.get("el");"touchstart touchmove touchend touchcancel".split(" ").forEach(function(t){n.addEventListener(t,e.registerEventCallback.bind(e),!1);});}},e.prototype.initCanvas=function(){var t=this.get("container");null!==t&&"string"==typeof t&&(t=document.getElementById(t),this.set("container",t));var e=this.get("renderer");if(!t&&!e.startsWith("mini"))throw new Error("invalid container");var n=this.get("width"),r=this.get("height"),i={container:t,context:this.get("context"),width:n,height:r,renderer:e,fitView:this.get("fitView")},o=this.get("pixelRatio");o&&(i.pixelRatio=o);var a=new Tt(i);this.set("canvas",a);},e.prototype.initPlugins=function(){var t=this;Object(a.each)(t.get("plugins"),function(e){!e.destroyed&&e.initPlugin&&e.initPlugin(t);});},e.prototype.toDataURL=function(t,e){var n=this.get("canvas"),r=n.getRenderer(),i=n.get("el");t||(t="image/png");var o="";if("svg"===r){var a=i.cloneNode(!0),s=document.implementation.createDocumentType("svg","-//W3C//DTD SVG 1.1//EN","http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"),c=document.implementation.createDocument("http://www.w3.org/2000/svg","svg",s);c.replaceChild(a,c.documentElement);var u=new XMLSerializer().serializeToString(c);o="data:image/svg+xml;charset=utf8,"+encodeURIComponent(u);}else{var h=void 0,l=i.getContext("2d"),f=this.get("width"),d=this.get("height"),p=void 0;if(e){var g="undefined"!=typeof window?window.devicePixelRatio:1;h=l.getImageData(0,0,f*g,d*g),p=l.globalCompositeOperation,l.globalCompositeOperation="destination-over",l.fillStyle=e,l.fillRect(0,0,f,d);}o=i.toDataURL(t),e&&(l.clearRect(0,0,f,d),l.putImageData(h,0,0),l.globalCompositeOperation=p);}return o;},e.prototype.toFullDataURL=function(t,e,n){var r=this.get("group").getCanvasBBox(),i=r.height,o=r.width,s=this.get("renderer"),c=Object(zt.a)('<id="virtual-image"></div>'),u=n?n.backgroundColor:void 0,h=n?n.padding:void 0;h?Object(a.isNumber)(h)&&(h=[h,h,h,h]):h=[0,0,0,0];var l=i+h[0]+h[2],f=o+h[1]+h[3],d=new Tt({container:c,height:l,width:f,quickHit:!0}),p=this.get("group").clone(),g=Object(a.clone)(p.getMatrix());g||(g=[1,0,0,0,1,0,0,0,1]);var v=(r.maxX+r.minX)/2,y=(r.maxY+r.minY)/2;Nt.a.translate(g,g,[-v,-y]),Nt.a.translate(g,g,[o/2+h[3],i/2+h[0]]),p.resetMatrix(),p.setMatrix(g),d.add(p);var m=d.get("el"),b="";e||(e="image/png"),setTimeout(function(){if("svg"===s){var n=m.cloneNode(!0),r=document.implementation.createDocumentType("svg","-//W3C//DTD SVG 1.1//EN","http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"),i=document.implementation.createDocument("http://www.w3.org/2000/svg","svg",r);i.replaceChild(n,i.documentElement);var o=new XMLSerializer().serializeToString(i);b="data:image/svg+xml;charset=utf8,"+encodeURIComponent(o);}else{var a=void 0,c=m.getContext("2d"),h=void 0;if(u){var d="undefined"!=typeof window?window.devicePixelRatio:1;a=c.getImageData(0,0,f*d,l*d),h=c.globalCompositeOperation,c.globalCompositeOperation="destination-over",c.fillStyle=u,c.fillRect(0,0,f,l);}b=m.toDataURL(e),u&&(c.clearRect(0,0,f,l),c.putImageData(a,0,0),c.globalCompositeOperation=h);}t&&t(b);},16);},e.prototype.downloadFullImage=function(t,e,n){var r=this,i=this.get("group").getCanvasBBox(),o=i.height,s=i.width,c=this.get("renderer"),u=Object(zt.a)('<id="virtual-image"></div>'),h=n?n.backgroundColor:void 0,l=n?n.padding:void 0;l?Object(a.isNumber)(l)&&(l=[l,l,l,l]):l=[0,0,0,0];var f=o+l[0]+l[2],d=s+l[1]+l[3],p=new Tt({container:u,height:f,width:d}),g=this.get("group").clone(),v=Object(a.clone)(g.getMatrix());v||(v=[1,0,0,0,1,0,0,0,1]);var y=(i.maxX+i.minX)/2,m=(i.maxY+i.minY)/2;Nt.a.translate(v,v,[-y,-m]),Nt.a.translate(v,v,[s/2+l[3],o/2+l[0]]),g.resetMatrix(),g.setMatrix(v),p.add(g);var b=p.get("el");e||(e="image/png"),setTimeout(function(){var n="";if("svg"===c){var i=b.cloneNode(!0),o=document.implementation.createDocumentType("svg","-//W3C//DTD SVG 1.1//EN","http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"),a=document.implementation.createDocument("http://www.w3.org/2000/svg","svg",o);a.replaceChild(i,a.documentElement);var s=new XMLSerializer().serializeToString(a);n="data:image/svg+xml;charset=utf8,"+encodeURIComponent(s);}else{var u=void 0,l=b.getContext("2d"),p=void 0;if(h){var g="undefined"!=typeof window?window.devicePixelRatio:1;u=l.getImageData(0,0,d*g,f*g),p=l.globalCompositeOperation,l.globalCompositeOperation="destination-over",l.fillStyle=h,l.fillRect(0,0,d,f);}n=b.toDataURL(e),h&&(l.clearRect(0,0,d,f),l.putImageData(u,0,0),l.globalCompositeOperation=p);}var v=document.createElement("a"),y=(t||"graph")+("svg"===c?".svg":"."+e.split("/")[1]);r.dataURLToImage(n,c,v,y);var m=document.createEvent("MouseEvents");m.initEvent("click",!1,!1),v.dispatchEvent(m);},16);},e.prototype.downloadImage=function(t,e,n){var r=this,i=this;i.isAnimating()&&i.stopAnimate();var o=i.get("canvas").getRenderer();e||(e="image/png");var a=(t||"graph")+("svg"===o?".svg":e.split("/")[1]),s=document.createElement("a");setTimeout(function(){var t=i.toDataURL(e,n);r.dataURLToImage(t,o,s,a);var c=document.createEvent("MouseEvents");c.initEvent("click",!1,!1),s.dispatchEvent(c);},16);},e.prototype.dataURLToImage=function(t,e,n,r){if("undefined"!=typeof window)if(window.Blob&&window.URL&&"svg"!==e){var i=t.split(","),o="";if(i&&i.length>0){var a=i[0].match(/:(.*?);/);a&&a.length>=2&&(o=a[1]);}for(var s=atob(i[1]),c=s.length,u=new Uint8Array(c);c--;){u[c]=s.charCodeAt(c);}var h=new Blob([u],{type:o});window.navigator.msSaveBlob?window.navigator.msSaveBlob(h,r):n.addEventListener("click",function(){n.download=r,n.href=window.URL.createObjectURL(h);});}else n.addEventListener("click",function(){n.download=r,n.href=t;});},e.prototype.addPlugin=function(t){t.destroyed||(this.get("plugins").push(t),t.initPlugin(this));},e.prototype.removePlugin=function(t){var e=this.get("plugins"),n=e.indexOf(t);n>=0&&(t.destroyPlugin(),e.splice(n,1));},e.prototype.isMiniNative=function(){return"mini-native"===this.get("renderer");},e.prototype.isMini=function(){return this.get("renderer").startsWith("mini");},e.prototype.isBrowser=function(){return"canvas"===this.get("renderer");},e.prototype.setImageWaterMarker=function(t,e,n){var r=this,i=Object(a.deepMix)({},Lt.a.imageWaterMarkerConfig,e),o=i.width,s=i.height,c=i.image,u=c.rotate,h=(c.x,c.y,c.width),l=c.height;if(this.isMini()&&this.isMiniNative(),this.isMiniNative()){n.width=o||this.get("width"),n.height=s||this.get("height");var f=n.getContext("2d"),d=(0,this.get("extra").createImage)();d.crossOrigin="anonymous",d.src=t,d.onload=function(){if(!r.destroyed){var t=h/d.width,e=l/d.height;f.rotate(-u*Math.PI/180);var i=f.createPattern(d,"repeat");f.fillStyle=i,f.scale(t,e),f.fillRect(2*-r.get("width"),-r.get("height"),10*r.get("width"),10*r.get("height")),r.get("waterGroup").addShape("image",{attrs:{img:n}});}};}if(this.isBrowser()){var p=document.createElement("canvas");p.width=o||this.get("width"),p.height=s||this.get("height");var g=p.getContext("2d"),v=new Image();v.crossOrigin="anonymous",v.src=t,v.onload=function(){if(!r.destroyed){var t=h/v.width,e=l/v.height;g.rotate(-u*Math.PI/180);var n=g.createPattern(v,"repeat");g.fillStyle=n,g.scale(t,e),g.fillRect(2*-r.get("width"),-r.get("height"),10*r.get("width"),10*r.get("height"));var i=p.toDataURL();r.get("waterGroup").addShape("image",{attrs:{img:i}});}};}},e.prototype.setTextWaterMarker=function(t,e){var n=this.get("container");Object(a.isString)(n)&&(n=document.getElementById(n)),n.style.position||(n.style.position="relative");var r=this.get("graphWaterMarker"),i=Object(a.deepMix)({},Lt.a.textWaterMarkerConfig,e),o=i.width,s=i.height,c=i.compatible,u=i.text;if(!r){var h={container:n,width:o,height:s,capture:!1},l=this.get("pixelRatio");l&&(h.pixelRatio=l),r=new Tt(h),this.set("graphWaterMarker",r);}r.get("el").style.display="none";var f=r.get("context"),d=u.rotate,p=u.fill,g=u.fontFamily,v=u.fontSize,y=u.baseline,m=u.x,b=u.y,x=u.lineHeight;f.rotate(-d*Math.PI/180),f.font=v+"px "+g,f.fillStyle=p,f.textBaseline=y;for(var w=t.length-1;w>=0;w--){f.fillText(t[w],m,b+w*x);}if(f.rotate(d*Math.PI/180),c)n.style.cssText="background-image: url("+r.get("el").toDataURL("image/png")+");background-repeat:repeat;";else{var S=document.querySelector(".g6-graph-watermarker");S||((S=document.createElement("div")).className="g6-graph-watermarker"),S.style.cssText="background-image: url("+r.get("el").toDataURL("image/png")+");background-repeat:repeat;position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;z-index:99;",n.appendChild(S);}},e.prototype.destroy=function(){Object(a.each)(this.get("plugins"),function(t){t.destroyPlugin();});var e=this.get("tooltips");if(e)for(var n=0;n<e.length;n++){var r=e[n];if(r){var i=r.parentElement;i&&i.removeChild(r);}}this.get("eventController").destroy(),this.get("layoutController").destroy(),this.get("graphWaterMarker")&&this.get("graphWaterMarker").destroy(),"undefined"!=typeof document&&document.querySelector&&document.querySelector(".g6-graph-watermarker")&&document.querySelector(".g6-graph-watermarker").remove(),t.prototype.destroy.call(this);},e.prototype.initGroups=function(){var t=this.get("canvas"),e=t.addGroup({id:"root",className:Lt.a.rootContainerClassName}),n=t.addGroup({id:"water",className:Lt.a.waterContainerClassName});if(this.get("groupByTypes")){var r=e.addGroup({id:"edge",className:Lt.a.edgeContainerClassName}),i=e.addGroup({id:"node",className:Lt.a.nodeContainerClassName}),o=e.addGroup({id:"combo",className:Lt.a.comboContainerClassName});o.toBack(),this.set({nodeGroup:i,edgeGroup:r,comboGroup:o});}var a=t.addGroup({id:"uiGroup",className:Lt.a.uiContainerClassName}),s=e.addGroup({id:"delegate",className:Lt.a.delegateContainerClassName});this.set({delegateGroup:s}),this.set("group",e),this.set("uiGroup",a),this.set("waterGroup",n);},e;}(Bt.b);e.a=qt;},75:function _(t,e,n){"use strict";n.r(e),n.d(e,"mixColor",function(){return B;}),n.d(e,"getColorsWithSubjectColor",function(){return L;}),n.d(e,"getColorSetsBySubjectColors",function(){return D;});var r=n(44),i=n.n(r);function o(t,e){(function(t){return"string"==typeof t&&-1!==t.indexOf(".")&&1===parseFloat(t);})(t)&&(t="100%");var n=function(t){return"string"==typeof t&&-1!==t.indexOf("%");}(t);return t=360===e?t:Math.min(e,Math.max(0,parseFloat(t))),n&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:t=360===e?(t<0?t%e+e:t%e)/parseFloat(String(e)):t%e/parseFloat(String(e));}function a(t){return Math.min(1,Math.max(0,t));}function s(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t;}function c(t){return t<=1?"".concat(100*Number(t),"%"):t;}function u(t){return 1===t.length?"0"+t:String(t);}function h(t,e,n){t=o(t,255),e=o(e,255),n=o(n,255);var r=Math.max(t,e,n),i=Math.min(t,e,n),a=0,s=0,c=(r+i)/2;if(r===i)s=0,a=0;else{var u=r-i;switch(s=c>0.5?u/(2-r-i):u/(r+i),r){case t:a=(e-n)/u+(e<n?6:0);break;case e:a=(n-t)/u+2;break;case n:a=(t-e)/u+4;}a/=6;}return{h:a,s:s,l:c};}function l(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*n*(e-t):n<0.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t;}function f(t,e,n){t=o(t,255),e=o(e,255),n=o(n,255);var r=Math.max(t,e,n),i=Math.min(t,e,n),a=0,s=r,c=r-i,u=0===r?0:c/r;if(r===i)a=0;else{switch(r){case t:a=(e-n)/c+(e<n?6:0);break;case e:a=(n-t)/c+2;break;case n:a=(t-e)/c+4;}a/=6;}return{h:a,s:u,v:s};}function d(t,e,n,r){var i=[u(Math.round(t).toString(16)),u(Math.round(e).toString(16)),u(Math.round(n).toString(16))];return r&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("");}function p(t){return Math.round(255*parseFloat(t)).toString(16);}function g(t){return v(t)/255;}function v(t){return parseInt(t,16);}var y={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function m(t){return(m="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function b(t){var e,n,r,i={r:0,g:0,b:0},a=1,u=null,h=null,f=null,d=!1,p=!1;return"string"==typeof t&&(t=function(t){if(0===(t=t.trim().toLowerCase()).length)return!1;var e=!1;if(y[t])t=y[t],e=!0;else if("transparent"===t)return{r:0,g:0,b:0,a:0,format:"name"};var n=O.rgb.exec(t);if(n)return{r:n[1],g:n[2],b:n[3]};if(n=O.rgba.exec(t))return{r:n[1],g:n[2],b:n[3],a:n[4]};if(n=O.hsl.exec(t))return{h:n[1],s:n[2],l:n[3]};if(n=O.hsla.exec(t))return{h:n[1],s:n[2],l:n[3],a:n[4]};if(n=O.hsv.exec(t))return{h:n[1],s:n[2],v:n[3]};if(n=O.hsva.exec(t))return{h:n[1],s:n[2],v:n[3],a:n[4]};if(n=O.hex8.exec(t))return{r:v(n[1]),g:v(n[2]),b:v(n[3]),a:g(n[4]),format:e?"name":"hex8"};if(n=O.hex6.exec(t))return{r:v(n[1]),g:v(n[2]),b:v(n[3]),format:e?"name":"hex"};if(n=O.hex4.exec(t))return{r:v(n[1]+n[1]),g:v(n[2]+n[2]),b:v(n[3]+n[3]),a:g(n[4]+n[4]),format:e?"name":"hex8"};if(n=O.hex3.exec(t))return{r:v(n[1]+n[1]),g:v(n[2]+n[2]),b:v(n[3]+n[3]),format:e?"name":"hex"};return!1;}(t)),"object"===m(t)&&(M(t.r)&&M(t.g)&&M(t.b)?(e=t.r,n=t.g,r=t.b,i={r:255*o(e,255),g:255*o(n,255),b:255*o(r,255)},d=!0,p="%"===String(t.r).substr(-1)?"prgb":"rgb"):M(t.h)&&M(t.s)&&M(t.v)?(u=c(t.s),h=c(t.v),i=function(t,e,n){t=6*o(t,360),e=o(e,100),n=o(n,100);var r=Math.floor(t),i=t-r,a=n*(1-e),s=n*(1-i*e),c=n*(1-(1-i)*e),u=r%6;return{r:255*[n,s,a,a,c,n][u],g:255*[c,n,n,s,a,a][u],b:255*[a,a,c,n,n,s][u]};}(t.h,u,h),d=!0,p="hsv"):M(t.h)&&M(t.s)&&M(t.l)&&(u=c(t.s),f=c(t.l),i=function(t,e,n){var r,i,a;if(t=o(t,360),e=o(e,100),n=o(n,100),0===e)i=n,a=n,r=n;else{var s=n<0.5?n*(1+e):n+e-n*e,c=2*n-s;r=l(c,s,t+1/3),i=l(c,s,t),a=l(c,s,t-1/3);}return{r:255*r,g:255*i,b:255*a};}(t.h,u,f),d=!0,p="hsl"),Object.prototype.hasOwnProperty.call(t,"a")&&(a=t.a)),a=s(a),{ok:d,format:t.format||p,r:Math.min(255,Math.max(i.r,0)),g:Math.min(255,Math.max(i.g,0)),b:Math.min(255,Math.max(i.b,0)),a:a};}var x="(?:".concat("[-\\+]?\\d*\\.\\d+%?",")|(?:").concat("[-\\+]?\\d+%?",")"),w="[\\s|\\(]+(".concat(x,")[,|\\s]+(").concat(x,")[,|\\s]+(").concat(x,")\\s*\\)?"),S="[\\s|\\(]+(".concat(x,")[,|\\s]+(").concat(x,")[,|\\s]+(").concat(x,")[,|\\s]+(").concat(x,")\\s*\\)?"),O={CSS_UNIT:new RegExp(x),rgb:new RegExp("rgb"+w),rgba:new RegExp("rgba"+S),hsl:new RegExp("hsl"+w),hsla:new RegExp("hsla"+S),hsv:new RegExp("hsv"+w),hsva:new RegExp("hsva"+S),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function M(t){return Boolean(O.CSS_UNIT.exec(String(t)));}var k=function(){function t(e,n){var r;if(void 0===e&&(e=""),void 0===n&&(n={}),e instanceof t)return e;"number"==typeof e&&(e=function(t){return{r:t>>16,g:(65280&t)>>8,b:255&t};}(e)),this.originalInput=e;var i=b(e);this.originalInput=e,this.r=i.r,this.g=i.g,this.b=i.b,this.a=i.a,this.roundA=Math.round(100*this.a)/100,this.format=null!==(r=n.format)&&void 0!==r?r:i.format,this.gradientType=n.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=i.ok;}return t.prototype.isDark=function(){return this.getBrightness()<128;},t.prototype.isLight=function(){return!this.isDark();},t.prototype.getBrightness=function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3;},t.prototype.getLuminance=function(){var t=this.toRgb(),e=t.r/255,n=t.g/255,r=t.b/255;return 0.2126*(e<=0.03928?e/12.92:Math.pow((e+0.055)/1.055,2.4))+0.7152*(n<=0.03928?n/12.92:Math.pow((n+0.055)/1.055,2.4))+0.0722*(r<=0.03928?r/12.92:Math.pow((r+0.055)/1.055,2.4));},t.prototype.getAlpha=function(){return this.a;},t.prototype.setAlpha=function(t){return this.a=s(t),this.roundA=Math.round(100*this.a)/100,this;},t.prototype.toHsv=function(){var t=f(this.r,this.g,this.b);return{h:360*t.h,s:t.s,v:t.v,a:this.a};},t.prototype.toHsvString=function(){var t=f(this.r,this.g,this.b),e=Math.round(360*t.h),n=Math.round(100*t.s),r=Math.round(100*t.v);return 1===this.a?"hsv(".concat(e,", ").concat(n,"%, ").concat(r,"%)"):"hsva(".concat(e,", ").concat(n,"%, ").concat(r,"%, ").concat(this.roundA,")");},t.prototype.toHsl=function(){var t=h(this.r,this.g,this.b);return{h:360*t.h,s:t.s,l:t.l,a:this.a};},t.prototype.toHslString=function(){var t=h(this.r,this.g,this.b),e=Math.round(360*t.h),n=Math.round(100*t.s),r=Math.round(100*t.l);return 1===this.a?"hsl(".concat(e,", ").concat(n,"%, ").concat(r,"%)"):"hsla(".concat(e,", ").concat(n,"%, ").concat(r,"%, ").concat(this.roundA,")");},t.prototype.toHex=function(t){return void 0===t&&(t=!1),d(this.r,this.g,this.b,t);},t.prototype.toHexString=function(t){return void 0===t&&(t=!1),"#"+this.toHex(t);},t.prototype.toHex8=function(t){return void 0===t&&(t=!1),function(t,e,n,r,i){var o=[u(Math.round(t).toString(16)),u(Math.round(e).toString(16)),u(Math.round(n).toString(16)),u(p(r))];return i&&o[0].startsWith(o[0].charAt(1))&&o[1].startsWith(o[1].charAt(1))&&o[2].startsWith(o[2].charAt(1))&&o[3].startsWith(o[3].charAt(1))?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0)+o[3].charAt(0):o.join("");}(this.r,this.g,this.b,this.a,t);},t.prototype.toHex8String=function(t){return void 0===t&&(t=!1),"#"+this.toHex8(t);},t.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a};},t.prototype.toRgbString=function(){var t=Math.round(this.r),e=Math.round(this.g),n=Math.round(this.b);return 1===this.a?"rgb(".concat(t,", ").concat(e,", ").concat(n,")"):"rgba(".concat(t,", ").concat(e,", ").concat(n,", ").concat(this.roundA,")");},t.prototype.toPercentageRgb=function(){var t=function t(_t3){return"".concat(Math.round(100*o(_t3,255)),"%");};return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a};},t.prototype.toPercentageRgbString=function(){var t=function t(_t4){return Math.round(100*o(_t4,255));};return 1===this.a?"rgb(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%)"):"rgba(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%, ").concat(this.roundA,")");},t.prototype.toName=function(){if(0===this.a)return"transparent";if(this.a<1)return!1;for(var t="#"+d(this.r,this.g,this.b,!1),e=0,n=Object.entries(y);e<n.length;e++){var r=n[e],i=r[0];if(t===r[1])return i;}return!1;},t.prototype.toString=function(t){var e=Boolean(t);t=null!=t?t:this.format;var n=!1,r=this.a<1&&this.a>=0;return e||!r||!t.startsWith("hex")&&"name"!==t?("rgb"===t&&(n=this.toRgbString()),"prgb"===t&&(n=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(n=this.toHexString()),"hex3"===t&&(n=this.toHexString(!0)),"hex4"===t&&(n=this.toHex8String(!0)),"hex8"===t&&(n=this.toHex8String()),"name"===t&&(n=this.toName()),"hsl"===t&&(n=this.toHslString()),"hsv"===t&&(n=this.toHsvString()),n||this.toHexString()):"name"===t&&0===this.a?this.toName():this.toRgbString();},t.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b);},t.prototype.clone=function(){return new t(this.toString());},t.prototype.lighten=function(e){void 0===e&&(e=10);var n=this.toHsl();return n.l+=e/100,n.l=a(n.l),new t(n);},t.prototype.brighten=function(e){void 0===e&&(e=10);var n=this.toRgb();return n.r=Math.max(0,Math.min(255,n.r-Math.round(-e/100*255))),n.g=Math.max(0,Math.min(255,n.g-Math.round(-e/100*255))),n.b=Math.max(0,Math.min(255,n.b-Math.round(-e/100*255))),new t(n);},t.prototype.darken=function(e){void 0===e&&(e=10);var n=this.toHsl();return n.l-=e/100,n.l=a(n.l),new t(n);},t.prototype.tint=function(t){return void 0===t&&(t=10),this.mix("white",t);},t.prototype.shade=function(t){return void 0===t&&(t=10),this.mix("black",t);},t.prototype.desaturate=function(e){void 0===e&&(e=10);var n=this.toHsl();return n.s-=e/100,n.s=a(n.s),new t(n);},t.prototype.saturate=function(e){void 0===e&&(e=10);var n=this.toHsl();return n.s+=e/100,n.s=a(n.s),new t(n);},t.prototype.greyscale=function(){return this.desaturate(100);},t.prototype.spin=function(e){var n=this.toHsl(),r=(n.h+e)%360;return n.h=r<0?360+r:r,new t(n);},t.prototype.mix=function(e,n){void 0===n&&(n=50);var r=this.toRgb(),i=new t(e).toRgb(),o=n/100;return new t({r:(i.r-r.r)*o+r.r,g:(i.g-r.g)*o+r.g,b:(i.b-r.b)*o+r.b,a:(i.a-r.a)*o+r.a});},t.prototype.analogous=function(e,n){void 0===e&&(e=6),void 0===n&&(n=30);var r=this.toHsl(),i=360/n,o=[this];for(r.h=(r.h-(i*e>>1)+720)%360;--e;){r.h=(r.h+i)%360,o.push(new t(r));}return o;},t.prototype.complement=function(){var e=this.toHsl();return e.h=(e.h+180)%360,new t(e);},t.prototype.monochromatic=function(e){void 0===e&&(e=6);for(var n=this.toHsv(),r=n.h,i=n.s,o=n.v,a=[],s=1/e;e--;){a.push(new t({h:r,s:i,v:o})),o=(o+s)%1;}return a;},t.prototype.splitcomplement=function(){var e=this.toHsl(),n=e.h;return[this,new t({h:(n+72)%360,s:e.s,l:e.l}),new t({h:(n+216)%360,s:e.s,l:e.l})];},t.prototype.onBackground=function(e){var n=this.toRgb(),r=new t(e).toRgb();return new t({r:r.r+(n.r-r.r)*n.a,g:r.g+(n.g-r.g)*n.a,b:r.b+(n.b-r.b)*n.a});},t.prototype.triad=function(){return this.polyad(3);},t.prototype.tetrad=function(){return this.polyad(4);},t.prototype.polyad=function(e){for(var n=this.toHsl(),r=n.h,i=[this],o=360/e,a=1;a<e;a++){i.push(new t({h:(r+a*o)%360,s:n.s,l:n.l}));}return i;},t.prototype.equals=function(e){return this.toRgbString()===new t(e).toRgbString();},t;}();var C=[{index:7,opacity:0.15},{index:6,opacity:0.25},{index:5,opacity:0.3},{index:5,opacity:0.45},{index:5,opacity:0.65},{index:5,opacity:0.85},{index:4,opacity:0.9},{index:3,opacity:0.95},{index:2,opacity:0.97},{index:1,opacity:0.98}];function E(t,e,n){var r;return(r=Math.round(t.h)>=60&&Math.round(t.h)<=240?n?Math.round(t.h)-2*e:Math.round(t.h)+2*e:n?Math.round(t.h)+2*e:Math.round(t.h)-2*e)<0?r+=360:r>=360&&(r-=360),r;}function j(t,e,n){return 0===t.h&&0===t.s?t.s:((r=n?t.s-0.16*e:4===e?t.s+0.16:t.s+0.05*e)>1&&(r=1),n&&5===e&&r>0.1&&(r=0.1),r<0.06&&(r=0.06),Number(r.toFixed(2)));var r;}function P(t,e,n){var r;return(r=n?t.v+0.05*e:t.v-0.15*e)>1&&(r=1),Number(r.toFixed(2));}function A(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=[],r=new k(t),i=5;i>0;i-=1){var o=r.toHsv(),a=new k({h:E(o,i,!0),s:j(o,i,!0),v:P(o,i,!0)}).toHexString();n.push(a);}n.push(r.toHexString());for(var s=1;s<=4;s+=1){var c=r.toHsv(),u=new k({h:E(c,s),s:j(c,s),v:P(c,s)}).toHexString();n.push(u);}return"dark"===e.theme?C.map(function(t){var r=t.index,i=t.opacity;return new k(e.backgroundColor||"#141414").mix(n[r],100*i).toHexString();}):n;}var I={red:"#F5222D",volcano:"#FA541C",orange:"#FA8C16",gold:"#FAAD14",yellow:"#FADB14",lime:"#A0D911",green:"#52C41A",cyan:"#13C2C2",blue:"#1890FF",geekblue:"#2F54EB",purple:"#722ED1",magenta:"#EB2F96",grey:"#666666"},T={},N={};Object.keys(I).forEach(function(t){T[t]=A(I[t]),T[t].primary=T[t][5],N[t]=A(I[t],{theme:"dark",backgroundColor:"#141414"}),N[t].primary=N[t][5];});T.red,T.volcano,T.gold,T.orange,T.yellow,T.lime,T.green,T.cyan,T.blue,T.geekblue,T.purple,T.magenta,T.grey;var B=function B(t,e,n){var r=i()(t),o=i()(e);return i()([(1-n)*r.red()+n*o.red(),(1-n)*r.green()+n*o.green(),(1-n)*r.blue()+n*o.blue()]).rgb();},L=function L(t,e,n,r){return void 0===e&&(e="#fff"),void 0===n&&(n="default"),void 0===r&&(r="rgb(150, 150, 150)"),"default"===n?function(t,e,n){void 0===e&&(e="#fff"),void 0===n&&(n="rgb(150, 150, 150)");var r=B(e,t,0.05).rgb().toString(),o=B(e,t,0.1).rgb().toString(),a=B(e,t,0.2).rgb().toString(),s=B(e,t,0.4).rgb().toString(),c=B(e,n,0.02).rgb().toString(),u=B(e,n,0.05).rgb().toString(),h=B(e,n,0.1).rgb().toString(),l=B(e,n,0.2).rgb().toString(),f=B(e,n,0.3).rgb().toString(),d=A(t,{theme:"default",backgroundColor:e}),p=i()(t).hex().toLowerCase(),g=d.indexOf(p),v=t;return-1!==g&&(v=d[g+1]),{mainStroke:t,mainFill:o,activeStroke:t,activeFill:r,inactiveStroke:s,inactiveFill:r,selectedStroke:t,selectedFill:e,highlightStroke:v,highlightFill:a,disableStroke:f,disableFill:u,edgeMainStroke:f,edgeActiveStroke:t,edgeInactiveStroke:l,edgeSelectedStroke:t,edgeHighlightStroke:t,edgeDisableStroke:h,comboMainStroke:f,comboMainFill:c,comboActiveStroke:t,comboActiveFill:r,comboInactiveStroke:f,comboInactiveFill:c,comboSelectedStroke:t,comboSelectedFill:c,comboHighlightStroke:v,comboHighlightFill:c,comboDisableStroke:l,comboDisableFill:u};}(t,e,"rgb(150, 150, 150)"):function(t,e,n){void 0===e&&(e="#fff"),void 0===n&&(n="#777");var r=B(e,t,0.2).rgb().toString(),o=B(e,t,0.3).rgb().toString(),a=B(e,t,0.6).rgb().toString(),s=B(e,t,0.8).rgb().toString(),c=B(e,n,0.2).rgb().toString(),u=B(e,n,0.25).rgb().toString(),h=B(e,n,0.3).rgb().toString(),l=B(e,n,0.4).rgb().toString(),f=B(e,n,0.5).rgb().toString(),d=A(t,{theme:"dark",backgroundColor:e}),p=i()(t).hex().toLowerCase(),g=d.indexOf(p),v=t;return-1!==g&&(v=d[g+1]),{mainStroke:s,mainFill:r,activeStroke:t,activeFill:o,inactiveStroke:s,inactiveFill:r,selectedStroke:t,selectedFill:r,highlightStroke:t,highlightFill:a,disableStroke:f,disableFill:u,edgeMainStroke:n,edgeActiveStroke:t,edgeInactiveStroke:n,edgeSelectedStroke:t,edgeHighlightStroke:t,edgeDisableStroke:h,comboMainStroke:l,comboMainFill:u,comboActiveStroke:t,comboActiveFill:c,comboInactiveStroke:l,comboInactiveFill:u,comboSelectedStroke:t,comboSelectedFill:c,comboHighlightStroke:v,comboHighlightFill:u,comboDisableStroke:l,comboDisableFill:c};}(t,e,"#777");},D=function D(t,e,n,r){void 0===e&&(e="#fff"),void 0===n&&(n="default"),void 0===r&&(r="rgb(150, 150, 150)");var i=[];return t.forEach(function(t){i.push(L(t,e,n,r));}),i;};},76:function _(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}function i(t){return(i="function"==typeof Symbol&&"symbol"==r(Symbol.iterator)?function(t){return r(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":r(t);})(t);}Object.defineProperty(e,"__esModule",{value:!0}),e.clearAnimationFrame=function(t){return o.clearAnimationFrame?o.clearAnimationFrame(t):("object"===("undefined"==typeof window?"undefined":i(window))&&window.cancelAnimationFrame?window.cancelAnimationFrame:clearTimeout)(t);},e.requestAnimationFrame=function(t){return o.requestAnimationFrame?o.requestAnimationFrame(t):("object"===("undefined"==typeof window?"undefined":i(window))&&window.requestAnimationFrame?window.requestAnimationFrame:function(t){return setTimeout(t,16);})(t);},e.setExtraFunction=function(t){void 0===t&&(t={}),t=t;};var o={};},77:function _(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(t){return _typeof(t);}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":_typeof(t);})(t);}var r;r=function(){return this;}();try{r=r||new Function("return this")();}catch(t){"object"===("undefined"==typeof window?"undefined":n(window))&&(r=window);}t.exports=r;},78:function _(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Layouts=e.Layout=void 0;var r=n(51),i=function(){function t(t){var e=r.getLayoutByName(t.type);this.layoutInstance=new e(t);}return t.prototype.layout=function(t){return this.layoutInstance.layout(t);},t.prototype.updateCfg=function(t){this.layoutInstance.updateCfg(t);},t.prototype.init=function(t){this.layoutInstance.init(t);},t.prototype.execute=function(){this.layoutInstance.execute();},t.prototype.getDefaultCfg=function(){return this.layoutInstance.getDefaultCfg();},t.prototype.destroy=function(){return this.layoutInstance.destroy();},t;}();e.Layout=i,e.Layouts=new Proxy({},{get:function get(t,e){return r.getLayoutByName(e);},set:function set(t,e,n){return r.registerLayout(e,n),!0;}});},97:function _(t,e,n){"use strict";var r=n(1),i=n(2),o=(n(6),n(27)),a=n(74),s=n(26),c=n(18),u=n(32),h=(n(395),n(396),n(101),n(102),{version:c.a.version,Graph:a.a,Util:u.a,Layout:s.a,Layouts:s.b,registerLayout:s.c,unRegisterLayout:s.d,Global:c.a,registerBehavior:i.i,registerCombo:i.j,registerEdge:i.k,registerNode:i.l,Algorithm:o,Arrow:i.d,Marker:i.f,Shape:i.g});var l,f=(l=a.b,function(){for(var t=[],e=0;e<arguments.length;e++){t[e]=arguments[e];}return l.apply(null,Object(r.g)(t,[h]));});h.registerGraph=f,e.default=h;},98:function _(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.assembleFont=e.getTextWidth=e.getLineSpaceing=e.getTextHeight=void 0;var r=n(179),i=n(180);function o(t,e){return e?e-t:0.14*t;}e.getTextHeight=function(t,e,n){var i=1;return(0,r.isString)(t)&&(i=t.split("\n").length),i>1?e*i+o(e,n)*(i-1):e;},e.getLineSpaceing=o,e.getTextWidth=function(t,e){var n=(0,i.getOffScreenContext)(),o=0;if((0,r.isNil)(t)||""===t)return o;if(n.save(),n.font=e,(0,r.isString)(t)&&t.includes("\n")){var a=t.split("\n");(0,r.each)(a,function(t){var e=n.measureText(t).width;o<e&&(o=e);});}else o=n.measureText(t).width;return n.restore(),o;},e.assembleFont=function(t){var e=t.fontSize,n=t.fontFamily,r=t.fontWeight;return[t.fontStyle,t.fontVariant,r,e+"px",n].join(" ").trim();};}}).default;});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)/buildin/module.js */ 44)(module)))

/***/ }),
/* 44 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 45 */
/*!****************************************************************************************!*\
  !*** C:/Users/admin/Documents/HBuilderProjects/newf6/f6/extends/layout/forceLayout.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
!function (t, n) {
  "object" == ( false ? undefined : _typeof(exports)) && "object" == ( false ? undefined : _typeof(module)) ? module.exports = n() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (n),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function () {
  return function (t) {
    var n = {};
    function e(r) {
      if (n[r]) return n[r].exports;
      var o = n[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }
    return e.m = t, e.c = n, e.d = function (t, n, r) {
      e.o(t, n) || Object.defineProperty(t, n, {
        enumerable: !0,
        get: r
      });
    }, e.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, e.t = function (t, n) {
      if (1 & n && (t = e(t)), 8 & n) return t;
      if (4 & n && "object" == _typeof(t) && t && t.__esModule) return t;
      var r = Object.create(null);
      if (e.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: t
      }), 2 & n && "string" != typeof t) for (var o in t) {
        e.d(r, o, function (n) {
          return t[n];
        }.bind(null, o));
      }
      return r;
    }, e.n = function (t) {
      var n = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return e.d(n, "a", n), n;
    }, e.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }, e.p = "", e(e.s = 382);
  }({
    10: function _(t, n, e) {
      "use strict";

      var r = this && this.__createBinding || (Object.create ? function (t, n, e, r) {
          void 0 === r && (r = e), Object.defineProperty(t, r, {
            enumerable: !0,
            get: function get() {
              return n[e];
            }
          });
        } : function (t, n, e, r) {
          void 0 === r && (r = e), t[r] = n[e];
        }),
        o = this && this.__exportStar || function (t, n) {
          for (var e in t) {
            "default" === e || Object.prototype.hasOwnProperty.call(n, e) || r(n, t, e);
          }
        };
      Object.defineProperty(n, "__esModule", {
        value: !0
      }), o(e(11), n), o(e(12), n), o(e(13), n), o(e(14), n), o(e(15), n), o(e(16), n);
    },
    11: function _(t, n, e) {
      "use strict";

      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.camelize = n.isString = void 0;
      n.isString = function (t) {
        return "string" == typeof t;
      };
      var r,
        o,
        i = /-(\w)/g;
      n.camelize = (r = function r(t) {
        return t.replace(i, function (t, n) {
          return n ? n.toUpperCase() : "";
        });
      }, o = Object.create(null), function (t) {
        return o[t] || (o[t] = r(t));
      });
    },
    12: function _(t, n, e) {
      "use strict";

      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.isArray = void 0, n.isArray = Array.isArray;
    },
    13: function _(t, n, e) {
      "use strict";

      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.toNumber = n.isNaN = n.isNumber = void 0;
      n.isNumber = function (t) {
        return "number" == typeof t;
      };
      n.isNaN = function (t) {
        return Number.isNaN(Number(t));
      };
      n.toNumber = function (t) {
        var e = parseFloat(t);
        return n.isNaN(e) ? t : e;
      };
    },
    14: function _(t, n, e) {
      "use strict";

      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.traverseTreeUp = n.scaleMatrix = n.getAdjMatrix = n.floydWarshall = n.getDegree = void 0;
      n.getDegree = function (t, n, e) {
        for (var r = [], o = 0; o < t; o++) {
          r[o] = 0;
        }
        return e ? (e.forEach(function (t) {
          t.source && (r[n[t.source]] += 1), t.target && (r[n[t.target]] += 1);
        }), r) : r;
      };
      n.floydWarshall = function (t) {
        for (var n = [], e = t.length, r = 0; r < e; r += 1) {
          n[r] = [];
          for (var o = 0; o < e; o += 1) {
            r === o ? n[r][o] = 0 : 0 !== t[r][o] && t[r][o] ? n[r][o] = t[r][o] : n[r][o] = 1 / 0;
          }
        }
        for (var i = 0; i < e; i += 1) {
          for (r = 0; r < e; r += 1) {
            for (o = 0; o < e; o += 1) {
              n[r][o] > n[r][i] + n[i][o] && (n[r][o] = n[r][i] + n[i][o]);
            }
          }
        }
        return n;
      };
      n.getAdjMatrix = function (t, n) {
        var e = t.nodes,
          r = t.edges,
          o = [],
          i = {};
        if (!e) throw new Error("invalid nodes data!");
        return e && e.forEach(function (t, n) {
          i[t.id] = n;
          o.push([]);
        }), r && r.forEach(function (t) {
          var e = t.source,
            r = t.target,
            u = i[e],
            c = i[r];
          o[u][c] = 1, n || (o[c][u] = 1);
        }), o;
      };
      n.scaleMatrix = function (t, n) {
        var e = [];
        return t.forEach(function (t) {
          var r = [];
          t.forEach(function (t) {
            r.push(t * n);
          }), e.push(r);
        }), e;
      };
      n.traverseTreeUp = function (t, n) {
        "function" == typeof n && function t(n, e) {
          if (n && n.children) for (var r = n.children.length - 1; r >= 0; r--) {
            if (!t(n.children[r], e)) return;
          }
          return !!e(n);
        }(t, n);
      };
    },
    15: function _(t, n, e) {
      "use strict";

      function r(t) {
        return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
          return _typeof(t);
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
        })(t);
      }
      var o = this && this.__assign || function () {
        return (o = Object.assign || function (t) {
          for (var n, e = 1, r = arguments.length; e < r; e++) {
            for (var o in n = arguments[e]) {
              Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
            }
          }
          return t;
        }).apply(this, arguments);
      };
      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.clone = n.isObject = void 0;
      n.isObject = function (t) {
        return null !== t && "object" === r(t);
      };
      n.clone = function (t) {
        if (null === t) return t;
        if (t instanceof Date) return new Date(t.getTime());
        if (t instanceof Array) {
          var e = [];
          return t.forEach(function (t) {
            e.push(t);
          }), e.map(function (t) {
            return n.clone(t);
          });
        }
        if ("object" === r(t) && t !== {}) {
          var i = o({}, t);
          return Object.keys(i).forEach(function (t) {
            i[t] = n.clone(i[t]);
          }), i;
        }
        return t;
      };
    },
    156: function _(t, n, e) {
      "use strict";

      e.r(n), e.d(n, "forceCenter", function () {
        return r;
      }), e.d(n, "forceCollide", function () {
        return v;
      }), e.d(n, "forceLink", function () {
        return b;
      }), e.d(n, "forceManyBody", function () {
        return V;
      }), e.d(n, "forceRadial", function () {
        return Z;
      }), e.d(n, "forceSimulation", function () {
        return Q;
      }), e.d(n, "forceX", function () {
        return $;
      }), e.d(n, "forceY", function () {
        return tt;
      });
      var r = function r(t, n) {
        var e,
          r = 1;
        function o() {
          var o,
            i,
            u = e.length,
            c = 0,
            f = 0;
          for (o = 0; o < u; ++o) {
            c += (i = e[o]).x, f += i.y;
          }
          for (c = (c / u - t) * r, f = (f / u - n) * r, o = 0; o < u; ++o) {
            (i = e[o]).x -= c, i.y -= f;
          }
        }
        return null == t && (t = 0), null == n && (n = 0), o.initialize = function (t) {
          e = t;
        }, o.x = function (n) {
          return arguments.length ? (t = +n, o) : t;
        }, o.y = function (t) {
          return arguments.length ? (n = +t, o) : n;
        }, o.strength = function (t) {
          return arguments.length ? (r = +t, o) : r;
        }, o;
      };
      function o(t, n, e, r) {
        if (isNaN(n) || isNaN(e)) return t;
        var o,
          i,
          u,
          c,
          f,
          a,
          l,
          s,
          h,
          d = t._root,
          y = {
            data: r
          },
          p = t._x0,
          v = t._y0,
          g = t._x1,
          _ = t._y1;
        if (!d) return t._root = y, t;
        for (; d.length;) {
          if ((a = n >= (i = (p + g) / 2)) ? p = i : g = i, (l = e >= (u = (v + _) / 2)) ? v = u : _ = u, o = d, !(d = d[s = l << 1 | a])) return o[s] = y, t;
        }
        if (c = +t._x.call(null, d.data), f = +t._y.call(null, d.data), n === c && e === f) return y.next = d, o ? o[s] = y : t._root = y, t;
        do {
          o = o ? o[s] = new Array(4) : t._root = new Array(4), (a = n >= (i = (p + g) / 2)) ? p = i : g = i, (l = e >= (u = (v + _) / 2)) ? v = u : _ = u;
        } while ((s = l << 1 | a) == (h = (f >= u) << 1 | c >= i));
        return o[h] = d, o[s] = y, t;
      }
      var i = function i(t, n, e, r, o) {
        this.node = t, this.x0 = n, this.y0 = e, this.x1 = r, this.y1 = o;
      };
      function u(t) {
        return t[0];
      }
      function c(t) {
        return t[1];
      }
      function f(t, n, e) {
        var r = new a(null == n ? u : n, null == e ? c : e, NaN, NaN, NaN, NaN);
        return null == t ? r : r.addAll(t);
      }
      function a(t, n, e, r, o, i) {
        this._x = t, this._y = n, this._x0 = e, this._y0 = r, this._x1 = o, this._y1 = i, this._root = void 0;
      }
      function l(t) {
        for (var n = {
            data: t.data
          }, e = n; t = t.next;) {
          e = e.next = {
            data: t.data
          };
        }
        return n;
      }
      var s = f.prototype = a.prototype;
      s.copy = function () {
        var t,
          n,
          e = new a(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
          r = this._root;
        if (!r) return e;
        if (!r.length) return e._root = l(r), e;
        for (t = [{
          source: r,
          target: e._root = new Array(4)
        }]; r = t.pop();) {
          for (var o = 0; o < 4; ++o) {
            (n = r.source[o]) && (n.length ? t.push({
              source: n,
              target: r.target[o] = new Array(4)
            }) : r.target[o] = l(n));
          }
        }
        return e;
      }, s.add = function (t) {
        var n = +this._x.call(null, t),
          e = +this._y.call(null, t);
        return o(this.cover(n, e), n, e, t);
      }, s.addAll = function (t) {
        var n,
          e,
          r,
          i,
          u = t.length,
          c = new Array(u),
          f = new Array(u),
          a = 1 / 0,
          l = 1 / 0,
          s = -1 / 0,
          h = -1 / 0;
        for (e = 0; e < u; ++e) {
          isNaN(r = +this._x.call(null, n = t[e])) || isNaN(i = +this._y.call(null, n)) || (c[e] = r, f[e] = i, r < a && (a = r), r > s && (s = r), i < l && (l = i), i > h && (h = i));
        }
        if (a > s || l > h) return this;
        for (this.cover(a, l).cover(s, h), e = 0; e < u; ++e) {
          o(this, c[e], f[e], t[e]);
        }
        return this;
      }, s.cover = function (t, n) {
        if (isNaN(t = +t) || isNaN(n = +n)) return this;
        var e = this._x0,
          r = this._y0,
          o = this._x1,
          i = this._y1;
        if (isNaN(e)) o = (e = Math.floor(t)) + 1, i = (r = Math.floor(n)) + 1;else {
          for (var u, c, f = o - e || 1, a = this._root; e > t || t >= o || r > n || n >= i;) {
            switch (c = (n < r) << 1 | t < e, (u = new Array(4))[c] = a, a = u, f *= 2, c) {
              case 0:
                o = e + f, i = r + f;
                break;
              case 1:
                e = o - f, i = r + f;
                break;
              case 2:
                o = e + f, r = i - f;
                break;
              case 3:
                e = o - f, r = i - f;
            }
          }
          this._root && this._root.length && (this._root = a);
        }
        return this._x0 = e, this._y0 = r, this._x1 = o, this._y1 = i, this;
      }, s.data = function () {
        var t = [];
        return this.visit(function (n) {
          if (!n.length) do {
            t.push(n.data);
          } while (n = n.next);
        }), t;
      }, s.extent = function (t) {
        return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
      }, s.find = function (t, n, e) {
        var r,
          o,
          u,
          c,
          f,
          a,
          l,
          s = this._x0,
          h = this._y0,
          d = this._x1,
          y = this._y1,
          p = [],
          v = this._root;
        for (v && p.push(new i(v, s, h, d, y)), null == e ? e = 1 / 0 : (s = t - e, h = n - e, d = t + e, y = n + e, e *= e); a = p.pop();) {
          if (!(!(v = a.node) || (o = a.x0) > d || (u = a.y0) > y || (c = a.x1) < s || (f = a.y1) < h)) if (v.length) {
            var g = (o + c) / 2,
              _ = (u + f) / 2;
            p.push(new i(v[3], g, _, c, f), new i(v[2], o, _, g, f), new i(v[1], g, u, c, _), new i(v[0], o, u, g, _)), (l = (n >= _) << 1 | t >= g) && (a = p[p.length - 1], p[p.length - 1] = p[p.length - 1 - l], p[p.length - 1 - l] = a);
          } else {
            var x = t - +this._x.call(null, v.data),
              b = n - +this._y.call(null, v.data),
              w = x * x + b * b;
            if (w < e) {
              var m = Math.sqrt(e = w);
              s = t - m, h = n - m, d = t + m, y = n + m, r = v.data;
            }
          }
        }
        return r;
      }, s.remove = function (t) {
        if (isNaN(i = +this._x.call(null, t)) || isNaN(u = +this._y.call(null, t))) return this;
        var n,
          e,
          r,
          o,
          i,
          u,
          c,
          f,
          a,
          l,
          s,
          h,
          d = this._root,
          y = this._x0,
          p = this._y0,
          v = this._x1,
          g = this._y1;
        if (!d) return this;
        if (d.length) for (;;) {
          if ((a = i >= (c = (y + v) / 2)) ? y = c : v = c, (l = u >= (f = (p + g) / 2)) ? p = f : g = f, n = d, !(d = d[s = l << 1 | a])) return this;
          if (!d.length) break;
          (n[s + 1 & 3] || n[s + 2 & 3] || n[s + 3 & 3]) && (e = n, h = s);
        }
        for (; d.data !== t;) {
          if (r = d, !(d = d.next)) return this;
        }
        return (o = d.next) && delete d.next, r ? (o ? r.next = o : delete r.next, this) : n ? (o ? n[s] = o : delete n[s], (d = n[0] || n[1] || n[2] || n[3]) && d === (n[3] || n[2] || n[1] || n[0]) && !d.length && (e ? e[h] = d : this._root = d), this) : (this._root = o, this);
      }, s.removeAll = function (t) {
        for (var n = 0, e = t.length; n < e; ++n) {
          this.remove(t[n]);
        }
        return this;
      }, s.root = function () {
        return this._root;
      }, s.size = function () {
        var t = 0;
        return this.visit(function (n) {
          if (!n.length) do {
            ++t;
          } while (n = n.next);
        }), t;
      }, s.visit = function (t) {
        var n,
          e,
          r,
          o,
          u,
          c,
          f = [],
          a = this._root;
        for (a && f.push(new i(a, this._x0, this._y0, this._x1, this._y1)); n = f.pop();) {
          if (!t(a = n.node, r = n.x0, o = n.y0, u = n.x1, c = n.y1) && a.length) {
            var l = (r + u) / 2,
              s = (o + c) / 2;
            (e = a[3]) && f.push(new i(e, l, s, u, c)), (e = a[2]) && f.push(new i(e, r, s, l, c)), (e = a[1]) && f.push(new i(e, l, o, u, s)), (e = a[0]) && f.push(new i(e, r, o, l, s));
          }
        }
        return this;
      }, s.visitAfter = function (t) {
        var n,
          e = [],
          r = [];
        for (this._root && e.push(new i(this._root, this._x0, this._y0, this._x1, this._y1)); n = e.pop();) {
          var o = n.node;
          if (o.length) {
            var u,
              c = n.x0,
              f = n.y0,
              a = n.x1,
              l = n.y1,
              s = (c + a) / 2,
              h = (f + l) / 2;
            (u = o[0]) && e.push(new i(u, c, f, s, h)), (u = o[1]) && e.push(new i(u, s, f, a, h)), (u = o[2]) && e.push(new i(u, c, h, s, l)), (u = o[3]) && e.push(new i(u, s, h, a, l));
          }
          r.push(n);
        }
        for (; n = r.pop();) {
          t(n.node, n.x0, n.y0, n.x1, n.y1);
        }
        return this;
      }, s.x = function (t) {
        return arguments.length ? (this._x = t, this) : this._x;
      }, s.y = function (t) {
        return arguments.length ? (this._y = t, this) : this._y;
      };
      var h = function h(t) {
          return function () {
            return t;
          };
        },
        d = function d(t) {
          return 1e-6 * (t() - 0.5);
        };
      function y(t) {
        return t.x + t.vx;
      }
      function p(t) {
        return t.y + t.vy;
      }
      var v = function v(t) {
        var n,
          e,
          r,
          o = 1,
          i = 1;
        function u() {
          for (var t, u, a, l, s, h, v, g = n.length, _ = 0; _ < i; ++_) {
            for (u = f(n, y, p).visitAfter(c), t = 0; t < g; ++t) {
              a = n[t], h = e[a.index], v = h * h, l = a.x + a.vx, s = a.y + a.vy, u.visit(x);
            }
          }
          function x(t, n, e, i, u) {
            var c = t.data,
              f = t.r,
              y = h + f;
            if (!c) return n > l + y || i < l - y || e > s + y || u < s - y;
            if (c.index > a.index) {
              var p = l - c.x - c.vx,
                g = s - c.y - c.vy,
                _ = p * p + g * g;
              _ < y * y && (0 === p && (_ += (p = d(r)) * p), 0 === g && (_ += (g = d(r)) * g), _ = (y - (_ = Math.sqrt(_))) / _ * o, a.vx += (p *= _) * (y = (f *= f) / (v + f)), a.vy += (g *= _) * y, c.vx -= p * (y = 1 - y), c.vy -= g * y);
            }
          }
        }
        function c(t) {
          if (t.data) return t.r = e[t.data.index];
          for (var n = t.r = 0; n < 4; ++n) {
            t[n] && t[n].r > t.r && (t.r = t[n].r);
          }
        }
        function a() {
          if (n) {
            var r,
              o,
              i = n.length;
            for (e = new Array(i), r = 0; r < i; ++r) {
              o = n[r], e[o.index] = +t(o, r, n);
            }
          }
        }
        return "function" != typeof t && (t = h(null == t ? 1 : +t)), u.initialize = function (t, e) {
          n = t, r = e, a();
        }, u.iterations = function (t) {
          return arguments.length ? (i = +t, u) : i;
        }, u.strength = function (t) {
          return arguments.length ? (o = +t, u) : o;
        }, u.radius = function (n) {
          return arguments.length ? (t = "function" == typeof n ? n : h(+n), a(), u) : t;
        }, u;
      };
      function g(t) {
        return (g = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
          return _typeof(t);
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
        })(t);
      }
      function _(t) {
        return t.index;
      }
      function x(t, n) {
        var e = t.get(n);
        if (!e) throw new Error("node not found: " + n);
        return e;
      }
      var b = function b(t) {
          var n,
            e,
            r,
            o,
            i,
            u,
            c = _,
            f = function f(t) {
              return 1 / Math.min(o[t.source.index], o[t.target.index]);
            },
            a = h(30),
            l = 1;
          function s(r) {
            for (var o = 0, c = t.length; o < l; ++o) {
              for (var f, a, s, h, y, p, v, g = 0; g < c; ++g) {
                a = (f = t[g]).source, h = (s = f.target).x + s.vx - a.x - a.vx || d(u), y = s.y + s.vy - a.y - a.vy || d(u), h *= p = ((p = Math.sqrt(h * h + y * y)) - e[g]) / p * r * n[g], y *= p, s.vx -= h * (v = i[g]), s.vy -= y * v, a.vx += h * (v = 1 - v), a.vy += y * v;
              }
            }
          }
          function y() {
            if (r) {
              var u,
                f,
                a = r.length,
                l = t.length,
                s = new Map(r.map(function (t, n) {
                  return [c(t, n, r), t];
                }));
              for (u = 0, o = new Array(a); u < l; ++u) {
                (f = t[u]).index = u, "object" !== g(f.source) && (f.source = x(s, f.source)), "object" !== g(f.target) && (f.target = x(s, f.target)), o[f.source.index] = (o[f.source.index] || 0) + 1, o[f.target.index] = (o[f.target.index] || 0) + 1;
              }
              for (u = 0, i = new Array(l); u < l; ++u) {
                f = t[u], i[u] = o[f.source.index] / (o[f.source.index] + o[f.target.index]);
              }
              n = new Array(l), p(), e = new Array(l), v();
            }
          }
          function p() {
            if (r) for (var e = 0, o = t.length; e < o; ++e) {
              n[e] = +f(t[e], e, t);
            }
          }
          function v() {
            if (r) for (var n = 0, o = t.length; n < o; ++n) {
              e[n] = +a(t[n], n, t);
            }
          }
          return null == t && (t = []), s.initialize = function (t, n) {
            r = t, u = n, y();
          }, s.links = function (n) {
            return arguments.length ? (t = n, y(), s) : t;
          }, s.id = function (t) {
            return arguments.length ? (c = t, s) : c;
          }, s.iterations = function (t) {
            return arguments.length ? (l = +t, s) : l;
          }, s.strength = function (t) {
            return arguments.length ? (f = "function" == typeof t ? t : h(+t), p(), s) : f;
          }, s.distance = function (t) {
            return arguments.length ? (a = "function" == typeof t ? t : h(+t), v(), s) : a;
          }, s;
        },
        w = {
          value: function value() {}
        };
      function m() {
        for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
          if (!(t = arguments[n] + "") || t in r || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
          r[t] = [];
        }
        return new S(r);
      }
      function S(t) {
        this._ = t;
      }
      function N(t, n) {
        return t.trim().split(/^|\s+/).map(function (t) {
          var e = "",
            r = t.indexOf(".");
          if (r >= 0 && (e = t.slice(r + 1), t = t.slice(0, r)), t && !n.hasOwnProperty(t)) throw new Error("unknown type: " + t);
          return {
            type: t,
            name: e
          };
        });
      }
      function O(t, n) {
        for (var e, r = 0, o = t.length; r < o; ++r) {
          if ((e = t[r]).name === n) return e.value;
        }
      }
      function k(t, n, e) {
        for (var r = 0, o = t.length; r < o; ++r) {
          if (t[r].name === n) {
            t[r] = w, t = t.slice(0, r).concat(t.slice(r + 1));
            break;
          }
        }
        return null != e && t.push({
          name: n,
          value: e
        }), t;
      }
      S.prototype = m.prototype = {
        constructor: S,
        on: function on(t, n) {
          var e,
            r = this._,
            o = N(t + "", r),
            i = -1,
            u = o.length;
          if (!(arguments.length < 2)) {
            if (null != n && "function" != typeof n) throw new Error("invalid callback: " + n);
            for (; ++i < u;) {
              if (e = (t = o[i]).type) r[e] = k(r[e], t.name, n);else if (null == n) for (e in r) {
                r[e] = k(r[e], t.name, null);
              }
            }
            return this;
          }
          for (; ++i < u;) {
            if ((e = (t = o[i]).type) && (e = O(r[e], t.name))) return e;
          }
        },
        copy: function copy() {
          var t = {},
            n = this._;
          for (var e in n) {
            t[e] = n[e].slice();
          }
          return new S(t);
        },
        call: function call(t, n) {
          if ((e = arguments.length - 2) > 0) for (var e, r, o = new Array(e), i = 0; i < e; ++i) {
            o[i] = arguments[i + 2];
          }
          if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
          for (i = 0, e = (r = this._[t]).length; i < e; ++i) {
            r[i].value.apply(n, o);
          }
        },
        apply: function apply(t, n, e) {
          if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
          for (var r = this._[t], o = 0, i = r.length; o < i; ++o) {
            r[o].value.apply(n, e);
          }
        }
      };
      var M = m;
      function j(t) {
        return (j = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
          return _typeof(t);
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
        })(t);
      }
      var E,
        A,
        P = 0,
        z = 0,
        D = 0,
        L = 0,
        T = 0,
        F = 0,
        U = "object" === ("undefined" == typeof performance ? "undefined" : j(performance)) && performance.now ? performance : Date,
        C = "object" === ("undefined" == typeof window ? "undefined" : j(window)) && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (t) {
          setTimeout(t, 17);
        };
      function q() {
        return T || (C(B), T = U.now() + F);
      }
      function B() {
        T = 0;
      }
      function Y() {
        this._call = this._time = this._next = null;
      }
      function R(t, n, e) {
        var r = new Y();
        return r.restart(t, n, e), r;
      }
      function G() {
        T = (L = U.now()) + F, P = z = 0;
        try {
          !function () {
            q(), ++P;
            for (var t, n = E; n;) {
              (t = T - n._time) >= 0 && n._call.call(null, t), n = n._next;
            }
            --P;
          }();
        } finally {
          P = 0, function () {
            var t,
              n,
              e = E,
              r = 1 / 0;
            for (; e;) {
              e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : E = n);
            }
            A = t, W(r);
          }(), T = 0;
        }
      }
      function I() {
        var t = U.now(),
          n = t - L;
        n > 1e3 && (F -= n, L = t);
      }
      function W(t) {
        P || (z && (z = clearTimeout(z)), t - T > 24 ? (t < 1 / 0 && (z = setTimeout(G, t - U.now() - F)), D && (D = clearInterval(D))) : (D || (L = U.now(), D = setInterval(I, 1e3)), P = 1, C(G)));
      }
      Y.prototype = R.prototype = {
        constructor: Y,
        restart: function restart(t, n, e) {
          if ("function" != typeof t) throw new TypeError("callback is not a function");
          e = (null == e ? q() : +e) + (null == n ? 0 : +n), this._next || A === this || (A ? A._next = this : E = this, A = this), this._call = t, this._time = e, W();
        },
        stop: function stop() {
          this._call && (this._call = null, this._time = 1 / 0, W());
        }
      };
      var X = 4294967296;
      function K(t) {
        return t.x;
      }
      function H(t) {
        return t.y;
      }
      var J = Math.PI * (3 - Math.sqrt(5)),
        Q = function Q(t) {
          var n,
            e,
            r = 1,
            o = 0.001,
            i = 1 - Math.pow(o, 1 / 300),
            u = 0,
            c = 0.6,
            f = new Map(),
            a = R(h),
            l = M("tick", "end"),
            s = (e = 1, function () {
              return (e = (1664525 * e + 1013904223) % X) / X;
            });
          function h() {
            d(), l.call("tick", n), r < o && (a.stop(), l.call("end", n));
          }
          function d(e) {
            var o,
              a,
              l = t.length;
            void 0 === e && (e = 1);
            for (var s = 0; s < e; ++s) {
              for (r += (u - r) * i, f.forEach(function (t) {
                t(r);
              }), o = 0; o < l; ++o) {
                null == (a = t[o]).fx ? a.x += a.vx *= c : (a.x = a.fx, a.vx = 0), null == a.fy ? a.y += a.vy *= c : (a.y = a.fy, a.vy = 0);
              }
            }
            return n;
          }
          function y() {
            for (var n, e = 0, r = t.length; e < r; ++e) {
              if ((n = t[e]).index = e, null != n.fx && (n.x = n.fx), null != n.fy && (n.y = n.fy), isNaN(n.x) || isNaN(n.y)) {
                var o = 10 * Math.sqrt(0.5 + e),
                  i = e * J;
                n.x = o * Math.cos(i), n.y = o * Math.sin(i);
              }
              (isNaN(n.vx) || isNaN(n.vy)) && (n.vx = n.vy = 0);
            }
          }
          function p(n) {
            return n.initialize && n.initialize(t, s), n;
          }
          return null == t && (t = []), y(), n = {
            tick: d,
            restart: function restart() {
              return a.restart(h), n;
            },
            stop: function stop() {
              return a.stop(), n;
            },
            nodes: function nodes(e) {
              return arguments.length ? (t = e, y(), f.forEach(p), n) : t;
            },
            alpha: function alpha(t) {
              return arguments.length ? (r = +t, n) : r;
            },
            alphaMin: function alphaMin(t) {
              return arguments.length ? (o = +t, n) : o;
            },
            alphaDecay: function alphaDecay(t) {
              return arguments.length ? (i = +t, n) : +i;
            },
            alphaTarget: function alphaTarget(t) {
              return arguments.length ? (u = +t, n) : u;
            },
            velocityDecay: function velocityDecay(t) {
              return arguments.length ? (c = 1 - t, n) : 1 - c;
            },
            randomSource: function randomSource(t) {
              return arguments.length ? (s = t, f.forEach(p), n) : s;
            },
            force: function force(t, e) {
              return arguments.length > 1 ? (null == e ? f.delete(t) : f.set(t, p(e)), n) : f.get(t);
            },
            find: function find(n, e, r) {
              var o,
                i,
                u,
                c,
                f,
                a = 0,
                l = t.length;
              for (null == r ? r = 1 / 0 : r *= r, a = 0; a < l; ++a) {
                (u = (o = n - (c = t[a]).x) * o + (i = e - c.y) * i) < r && (f = c, r = u);
              }
              return f;
            },
            on: function on(t, e) {
              return arguments.length > 1 ? (l.on(t, e), n) : l.on(t);
            }
          };
        },
        V = function V() {
          var t,
            n,
            e,
            r,
            o,
            i = h(-30),
            u = 1,
            c = 1 / 0,
            a = 0.81;
          function l(e) {
            var o,
              i = t.length,
              u = f(t, K, H).visitAfter(y);
            for (r = e, o = 0; o < i; ++o) {
              n = t[o], u.visit(p);
            }
          }
          function s() {
            if (t) {
              var n,
                e,
                r = t.length;
              for (o = new Array(r), n = 0; n < r; ++n) {
                e = t[n], o[e.index] = +i(e, n, t);
              }
            }
          }
          function y(t) {
            var n,
              e,
              r,
              i,
              u,
              c = 0,
              f = 0;
            if (t.length) {
              for (r = i = u = 0; u < 4; ++u) {
                (n = t[u]) && (e = Math.abs(n.value)) && (c += n.value, f += e, r += e * n.x, i += e * n.y);
              }
              t.x = r / f, t.y = i / f;
            } else {
              (n = t).x = n.data.x, n.y = n.data.y;
              do {
                c += o[n.data.index];
              } while (n = n.next);
            }
            t.value = c;
          }
          function p(t, i, f, l) {
            if (!t.value) return !0;
            var s = t.x - n.x,
              h = t.y - n.y,
              y = l - i,
              p = s * s + h * h;
            if (y * y / a < p) return p < c && (0 === s && (p += (s = d(e)) * s), 0 === h && (p += (h = d(e)) * h), p < u && (p = Math.sqrt(u * p)), n.vx += s * t.value * r / p, n.vy += h * t.value * r / p), !0;
            if (!(t.length || p >= c)) {
              (t.data !== n || t.next) && (0 === s && (p += (s = d(e)) * s), 0 === h && (p += (h = d(e)) * h), p < u && (p = Math.sqrt(u * p)));
              do {
                t.data !== n && (y = o[t.data.index] * r / p, n.vx += s * y, n.vy += h * y);
              } while (t = t.next);
            }
          }
          return l.initialize = function (n, r) {
            t = n, e = r, s();
          }, l.strength = function (t) {
            return arguments.length ? (i = "function" == typeof t ? t : h(+t), s(), l) : i;
          }, l.distanceMin = function (t) {
            return arguments.length ? (u = t * t, l) : Math.sqrt(u);
          }, l.distanceMax = function (t) {
            return arguments.length ? (c = t * t, l) : Math.sqrt(c);
          }, l.theta = function (t) {
            return arguments.length ? (a = t * t, l) : Math.sqrt(a);
          }, l;
        },
        Z = function Z(t, n, e) {
          var r,
            o,
            i,
            u = h(0.1);
          function c(t) {
            for (var u = 0, c = r.length; u < c; ++u) {
              var f = r[u],
                a = f.x - n || 1e-6,
                l = f.y - e || 1e-6,
                s = Math.sqrt(a * a + l * l),
                h = (i[u] - s) * o[u] * t / s;
              f.vx += a * h, f.vy += l * h;
            }
          }
          function f() {
            if (r) {
              var n,
                e = r.length;
              for (o = new Array(e), i = new Array(e), n = 0; n < e; ++n) {
                i[n] = +t(r[n], n, r), o[n] = isNaN(i[n]) ? 0 : +u(r[n], n, r);
              }
            }
          }
          return "function" != typeof t && (t = h(+t)), null == n && (n = 0), null == e && (e = 0), c.initialize = function (t) {
            r = t, f();
          }, c.strength = function (t) {
            return arguments.length ? (u = "function" == typeof t ? t : h(+t), f(), c) : u;
          }, c.radius = function (n) {
            return arguments.length ? (t = "function" == typeof n ? n : h(+n), f(), c) : t;
          }, c.x = function (t) {
            return arguments.length ? (n = +t, c) : n;
          }, c.y = function (t) {
            return arguments.length ? (e = +t, c) : e;
          }, c;
        },
        $ = function $(t) {
          var n,
            e,
            r,
            o = h(0.1);
          function i(t) {
            for (var o, i = 0, u = n.length; i < u; ++i) {
              (o = n[i]).vx += (r[i] - o.x) * e[i] * t;
            }
          }
          function u() {
            if (n) {
              var i,
                u = n.length;
              for (e = new Array(u), r = new Array(u), i = 0; i < u; ++i) {
                e[i] = isNaN(r[i] = +t(n[i], i, n)) ? 0 : +o(n[i], i, n);
              }
            }
          }
          return "function" != typeof t && (t = h(null == t ? 0 : +t)), i.initialize = function (t) {
            n = t, u();
          }, i.strength = function (t) {
            return arguments.length ? (o = "function" == typeof t ? t : h(+t), u(), i) : o;
          }, i.x = function (n) {
            return arguments.length ? (t = "function" == typeof n ? n : h(+n), u(), i) : t;
          }, i;
        },
        tt = function tt(t) {
          var n,
            e,
            r,
            o = h(0.1);
          function i(t) {
            for (var o, i = 0, u = n.length; i < u; ++i) {
              (o = n[i]).vy += (r[i] - o.y) * e[i] * t;
            }
          }
          function u() {
            if (n) {
              var i,
                u = n.length;
              for (e = new Array(u), r = new Array(u), i = 0; i < u; ++i) {
                e[i] = isNaN(r[i] = +t(n[i], i, n)) ? 0 : +o(n[i], i, n);
              }
            }
          }
          return "function" != typeof t && (t = h(null == t ? 0 : +t)), i.initialize = function (t) {
            n = t, u();
          }, i.strength = function (t) {
            return arguments.length ? (o = "function" == typeof t ? t : h(+t), u(), i) : o;
          }, i.y = function (n) {
            return arguments.length ? (t = "function" == typeof n ? n : h(+n), u(), i) : t;
          }, i;
        };
    },
    16: function _(t, n, e) {
      "use strict";

      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.isFunction = void 0;
      n.isFunction = function (t) {
        return "function" == typeof t;
      };
    },
    163: function _(t, n, e) {
      "use strict";

      var r = this && this.__createBinding || (Object.create ? function (t, n, e, r) {
          void 0 === r && (r = e), Object.defineProperty(t, r, {
            enumerable: !0,
            get: function get() {
              return n[e];
            }
          });
        } : function (t, n, e, r) {
          void 0 === r && (r = e), t[r] = n[e];
        }),
        o = this && this.__exportStar || function (t, n) {
          for (var e in t) {
            "default" === e || Object.prototype.hasOwnProperty.call(n, e) || r(n, t, e);
          }
        };
      Object.defineProperty(n, "__esModule", {
        value: !0
      }), o(e(383), n);
    },
    382: function _(t, n, e) {
      "use strict";

      e.r(n);
      var r = e(163);
      n.default = r.ForceLayout;
    },
    383: function _(t, n, e) {
      "use strict";

      var _r,
        o = this && this.__extends || (_r = function r(t, n) {
          return (_r = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (t, n) {
            t.__proto__ = n;
          } || function (t, n) {
            for (var e in n) {
              Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e]);
            }
          })(t, n);
        }, function (t, n) {
          if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
          function e() {
            this.constructor = t;
          }
          _r(t, n), t.prototype = null === n ? Object.create(n) : (e.prototype = n.prototype, new e());
        }),
        i = this && this.__createBinding || (Object.create ? function (t, n, e, r) {
          void 0 === r && (r = e), Object.defineProperty(t, r, {
            enumerable: !0,
            get: function get() {
              return n[e];
            }
          });
        } : function (t, n, e, r) {
          void 0 === r && (r = e), t[r] = n[e];
        }),
        u = this && this.__setModuleDefault || (Object.create ? function (t, n) {
          Object.defineProperty(t, "default", {
            enumerable: !0,
            value: n
          });
        } : function (t, n) {
          t.default = n;
        }),
        c = this && this.__importStar || function (t) {
          if (t && t.__esModule) return t;
          var n = {};
          if (null != t) for (var e in t) {
            "default" !== e && Object.prototype.hasOwnProperty.call(t, e) && i(n, t, e);
          }
          return u(n, t), n;
        },
        f = this && this.__importDefault || function (t) {
          return t && t.__esModule ? t : {
            default: t
          };
        };
      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.ForceLayout = void 0;
      var a = c(e(156)),
        l = f(e(384)),
        s = e(10),
        h = e(9),
        d = e(385),
        y = function (t) {
          function n(n) {
            var e = t.call(this) || this;
            return e.center = [0, 0], e.nodeStrength = null, e.edgeStrength = null, e.preventOverlap = !1, e.clusterNodeStrength = null, e.clusterEdgeStrength = null, e.clusterEdgeDistance = null, e.clusterNodeSize = null, e.clusterFociStrength = null, e.linkDistance = 50, e.alphaDecay = 0.028, e.alphaMin = 0.001, e.alpha = 0.3, e.collideStrength = 1, e.workerEnabled = !1, e.tick = function () {}, e.onLayoutEnd = function () {}, e.ticking = void 0, n && e.updateCfg(n), e;
          }
          return o(n, t), n.prototype.getDefaultCfg = function () {
            return {
              center: [0, 0],
              nodeStrength: null,
              edgeStrength: null,
              preventOverlap: !1,
              nodeSize: void 0,
              nodeSpacing: void 0,
              linkDistance: 50,
              forceSimulation: null,
              alphaDecay: 0.028,
              alphaMin: 0.001,
              alpha: 0.3,
              collideStrength: 1,
              clustering: !1,
              clusterNodeStrength: -1,
              clusterEdgeStrength: 0.1,
              clusterEdgeDistance: 100,
              clusterFociStrength: 0.8,
              clusterNodeSize: 10,
              tick: function tick() {},
              onLayoutEnd: function onLayoutEnd() {},
              workerEnabled: !1
            };
          }, n.prototype.init = function (t) {
            this.nodes = t.nodes || [];
            var n = t.edges || [];
            this.edges = n.map(function (t) {
              var n = {},
                e = ["targetNode", "sourceNode", "startPoint", "endPoint"];
              return Object.keys(t).forEach(function (r) {
                e.indexOf(r) > -1 || (n[r] = t[r]);
              }), n;
            }), this.ticking = !1;
          }, n.prototype.execute = function (t) {
            var n = this,
              e = n.nodes,
              r = n.edges;
            if (!n.ticking) {
              var o = n.forceSimulation,
                i = n.alphaMin,
                u = n.alphaDecay,
                c = n.alpha;
              if (o) {
                if (t) if (n.clustering && n.clusterForce && (n.clusterForce.nodes(e), n.clusterForce.links(r)), o.nodes(e), r && n.edgeForce) n.edgeForce.links(r);else if (r && !n.edgeForce) {
                  h = a.forceLink().id(function (t) {
                    return t.id;
                  }).links(r);
                  n.edgeStrength && h.strength(n.edgeStrength), n.linkDistance && h.distance(n.linkDistance), n.edgeForce = h, o.force("link", h);
                }
                n.preventOverlap && n.overlapProcess(o), o.alpha(c).restart(), this.ticking = !0;
              } else try {
                var f = a.forceManyBody();
                if (n.nodeStrength && f.strength(n.nodeStrength), o = a.forceSimulation().nodes(e), n.clustering) {
                  var s = l.default();
                  s.centerX(n.center[0]).centerY(n.center[1]).template("force").strength(n.clusterFociStrength), r && s.links(r), e && s.nodes(e), s.forceLinkDistance(n.clusterEdgeDistance).forceLinkStrength(n.clusterEdgeStrength).forceCharge(n.clusterNodeStrength).forceNodeSize(n.clusterNodeSize), n.clusterForce = s, o.force("group", s);
                }
                if (o.force("center", a.forceCenter(n.center[0], n.center[1])).force("charge", f).alpha(c).alphaDecay(u).alphaMin(i), n.preventOverlap && n.overlapProcess(o), r) {
                  var h = a.forceLink().id(function (t) {
                    return t.id;
                  }).links(r);
                  n.edgeStrength && h.strength(n.edgeStrength), n.linkDistance && h.distance(n.linkDistance), n.edgeForce = h, o.force("link", h);
                }
                if (n.workerEnabled && !p() && (n.workerEnabled = !1, console.warn("workerEnabled option is only supported when running in web worker.")), n.workerEnabled) {
                  o.stop();
                  for (var y = function (t) {
                      var n = t.alphaMin(),
                        e = t.alphaTarget(),
                        r = t.alpha(),
                        o = Math.log((n - e) / (r - e)) / Math.log(1 - t.alphaDecay());
                      return Math.ceil(o);
                    }(o), v = 1; v <= y; v++) {
                    o.tick(), postMessage({
                      nodes: e,
                      currentTick: v,
                      totalTicks: y,
                      type: d.LAYOUT_MESSAGE.TICK
                    }, void 0);
                  }
                  n.ticking = !1;
                } else o.on("tick", function () {
                  n.tick();
                }).on("end", function () {
                  n.ticking = !1, n.onLayoutEnd && n.onLayoutEnd();
                }), n.ticking = !0;
                n.forceSimulation = o, n.ticking = !0;
              } catch (t) {
                n.ticking = !1, console.warn(t);
              }
            }
          }, n.prototype.overlapProcess = function (t) {
            var n,
              e,
              r = this.nodeSize,
              o = this.nodeSpacing,
              i = this.collideStrength;
            if (e = s.isNumber(o) ? function () {
              return o;
            } : s.isFunction(o) ? o : function () {
              return 0;
            }, r) {
              if (s.isFunction(r)) n = function n(t) {
                return r(t) + e(t);
              };else if (s.isArray(r)) {
                var u = (r[0] > r[1] ? r[0] : r[1]) / 2;
                n = function n(t) {
                  return u + e(t);
                };
              } else if (s.isNumber(r)) {
                var c = r / 2;
                n = function n(t) {
                  return c + e(t);
                };
              } else n = function n() {
                return 10;
              };
            } else n = function n(t) {
              return t.size ? s.isArray(t.size) ? (t.size[0] > t.size[1] ? t.size[0] : t.size[1]) / 2 + e(t) : t.size / 2 + e(t) : 10 + e(t);
            };
            t.force("collisionForce", a.forceCollide(n).strength(i));
          }, n.prototype.updateCfg = function (t) {
            this.ticking && (this.forceSimulation.stop(), this.ticking = !1), this.forceSimulation = null, Object.assign(this, t);
          }, n.prototype.destroy = function () {
            this.ticking && (this.forceSimulation.stop(), this.ticking = !1), this.nodes = null, this.edges = null, this.destroyed = !0;
          }, n;
        }(h.Base);
      function p() {
        return "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope;
      }
      n.ForceLayout = y;
    },
    384: function _(t, n, e) {
      "use strict";

      var r = this && this.__createBinding || (Object.create ? function (t, n, e, r) {
          void 0 === r && (r = e), Object.defineProperty(t, r, {
            enumerable: !0,
            get: function get() {
              return n[e];
            }
          });
        } : function (t, n, e, r) {
          void 0 === r && (r = e), t[r] = n[e];
        }),
        o = this && this.__setModuleDefault || (Object.create ? function (t, n) {
          Object.defineProperty(t, "default", {
            enumerable: !0,
            value: n
          });
        } : function (t, n) {
          t.default = n;
        }),
        i = this && this.__importStar || function (t) {
          if (t && t.__esModule) return t;
          var n = {};
          if (null != t) for (var e in t) {
            "default" !== e && Object.prototype.hasOwnProperty.call(t, e) && r(n, t, e);
          }
          return o(n, t), n;
        };
      Object.defineProperty(n, "__esModule", {
        value: !0
      });
      var u = i(e(156));
      n.default = function () {
        function t(t) {
          return function () {
            return t;
          };
        }
        var n,
          e = function e(t) {
            return t.cluster;
          },
          r = t(1),
          o = t(-1),
          i = t(100),
          c = t(0.1),
          f = [0, 0],
          a = [],
          l = {},
          s = [],
          h = 100,
          d = 100,
          y = {
            none: {
              x: 0,
              y: 0
            }
          },
          p = [],
          v = "force",
          g = !0,
          _ = 0.1;
        function x(t) {
          if (!g) return x;
          n.tick(), w();
          for (var r = 0, o = a.length, i = void 0, u = t * _; r < o; ++r) {
            (i = a[r]).vx += (y[e(i)].x - i.x) * u, i.vy += (y[e(i)].y - i.y) * u;
          }
        }
        function b() {
          a && function () {
            if (!a || !a.length) return;
            if (void 0 === e(a[0])) throw Error("Couldnt find the grouping attribute for the nodes. Make sure to set it up with forceInABox.groupBy('clusterAttr') before calling .links()");
            var t = (y = [], v = [], g = {}, _ = [], f = function (t) {
              var n = {};
              return t.forEach(function (t) {
                var r = e(t);
                n[r] || (n[r] = {
                  count: 0,
                  sumforceNodeSize: 0
                });
              }), t.forEach(function (t) {
                var o = e(t),
                  i = r(t),
                  u = n[o];
                u.count = u.count + 1, u.sumforceNodeSize = u.sumforceNodeSize + Math.PI * (i * i) * 1.3, n[o] = u;
              }), n;
            }(a), _ = function (t) {
              var n = {},
                r = [];
              return t.forEach(function (t) {
                var r = function (t) {
                    var n = e(l[t.source]),
                      r = e(l[t.target]);
                    return n <= r ? n + "~" + r : r + "~" + n;
                  }(t),
                  o = 0;
                void 0 !== n[r] && (o = n[r]), o += 1, n[r] = o;
              }), Object.entries(n).forEach(function (t) {
                var n = t[0],
                  e = t[1],
                  o = n.split("~")[0],
                  i = n.split("~")[1];
                void 0 !== o && void 0 !== i && r.push({
                  source: o,
                  target: i,
                  count: e
                });
              }), r;
            }(s), Object.keys(f).forEach(function (t, n) {
              var e = f[t];
              y.push({
                id: t,
                size: e.count,
                r: Math.sqrt(e.sumforceNodeSize / Math.PI)
              }), g[t] = n;
            }), _.forEach(function (t) {
              var n = g[t.source],
                e = g[t.target];
              void 0 !== n && void 0 !== e && v.push({
                source: n,
                target: e,
                count: t.count
              });
            }), {
              nodes: y,
              links: v
            });
            var f, y, v, g, _;
            n = u.forceSimulation(t.nodes).force("x", u.forceX(h).strength(0.1)).force("y", u.forceY(d).strength(0.1)).force("collide", u.forceCollide(function (t) {
              return t.r;
            }).iterations(4)).force("charge", u.forceManyBody().strength(o)).force("links", u.forceLink(t.nodes.length ? t.links : []).distance(i).strength(c)), p = n.nodes(), w();
          }();
        }
        function w() {
          return y = {
            none: {
              x: 0,
              y: 0
            }
          }, p.forEach(function (t) {
            y[t.id] = {
              x: t.x - f[0],
              y: t.y - f[1]
            };
          }), y;
        }
        function m(t) {
          l = {}, t.forEach(function (t) {
            l[t.id] = t;
          });
        }
        return x.initialize = function (t) {
          a = t, b();
        }, x.template = function (t) {
          return arguments.length ? (v = t, b(), x) : v;
        }, x.groupBy = function (t) {
          return arguments.length ? "string" == typeof t ? (e = function e(n) {
            return n[t];
          }, x) : (e = t, x) : e;
        }, x.enableGrouping = function (t) {
          return arguments.length ? (g = t, x) : g;
        }, x.strength = function (t) {
          return arguments.length ? (_ = t, x) : _;
        }, x.centerX = function (t) {
          return arguments.length ? (h = t, x) : h;
        }, x.centerY = function (t) {
          return arguments.length ? (d = t, x) : d;
        }, x.nodes = function (t) {
          return arguments.length ? (m(t || []), a = t || [], x) : a;
        }, x.links = function (t) {
          return arguments.length ? (s = t || [], b(), x) : s;
        }, x.forceNodeSize = function (n) {
          return arguments.length ? (r = "function" == typeof n ? n : t(+n), b(), x) : r;
        }, x.nodeSize = x.forceNodeSize, x.forceCharge = function (n) {
          return arguments.length ? (o = "function" == typeof n ? n : t(+n), b(), x) : o;
        }, x.forceLinkDistance = function (n) {
          return arguments.length ? (i = "function" == typeof n ? n : t(+n), b(), x) : i;
        }, x.forceLinkStrength = function (n) {
          return arguments.length ? (c = "function" == typeof n ? n : t(+n), b(), x) : c;
        }, x.offset = function (t) {
          return arguments.length ? (f = t, x) : f;
        }, x.getFocis = w, x;
      };
    },
    385: function _(t, n, e) {
      "use strict";

      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.LAYOUT_MESSAGE = void 0, n.LAYOUT_MESSAGE = {
        RUN: "LAYOUT_RUN",
        END: "LAYOUT_END",
        ERROR: "LAYOUT_ERROR",
        TICK: "LAYOUT_TICK",
        GPURUN: "GPU_LAYOUT_RUN",
        GPUEND: "GPU_LAYOUT_END"
      };
    },
    9: function _(t, n, e) {
      "use strict";

      Object.defineProperty(n, "__esModule", {
        value: !0
      }), n.Base = void 0;
      var r = function () {
        function t() {
          this.nodes = [], this.edges = [], this.combos = [], this.positions = [], this.destroyed = !1, this.onLayoutEnd = function () {};
        }
        return t.prototype.layout = function (t) {
          return this.init(t), this.execute(!0);
        }, t.prototype.init = function (t) {
          this.nodes = t.nodes || [], this.edges = t.edges || [], this.combos = t.combos || [];
        }, t.prototype.execute = function (t) {}, t.prototype.executeWithWorker = function () {}, t.prototype.getDefaultCfg = function () {
          return {};
        }, t.prototype.updateCfg = function (t) {
          t && Object.assign(this, t);
        }, t.prototype.getType = function () {
          return "base";
        }, t.prototype.destroy = function () {
          this.nodes = null, this.edges = null, this.combos = null, this.positions = null, this.destroyed = !0;
        }, t;
      }();
      n.Base = r;
    }
  }).default;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)/buildin/module.js */ 44)(module)))

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map