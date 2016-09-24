module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _regenerator = __webpack_require__(1);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _keys = __webpack_require__(2);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _asyncToGenerator2 = __webpack_require__(3);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var loadConfigAsync = function () {
		var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
			var vaultrc, vaultlocalrc, vaultsecrets, configs, settings, vault;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							vaultrc = void 0, vaultlocalrc = void 0, vaultsecrets = void 0;
							_context.prev = 1;
							_context.next = 4;
							return _fsPromise2.default.readFile(VAULT_CONFIG_RCPATH, 'utf8');
	
						case 4:
							vaultrc = _context.sent;
							_context.next = 10;
							break;
	
						case 7:
							_context.prev = 7;
							_context.t0 = _context['catch'](1);
							throw new Error('vault-config: can\'t find "' + VAULT_CONFIG_RCPATH + '"\n' + _context.t0.stack);
	
						case 10:
							_context.prev = 10;
	
							vaultrc = JSON.parse(vaultrc);
							_context.next = 17;
							break;
	
						case 14:
							_context.prev = 14;
							_context.t1 = _context['catch'](10);
							throw new Error('vault-config: can\'t parse JSON in "' + VAULT_CONFIG_RCPATH + '"\n' + _context.t1.stack);
	
						case 17:
							_context.prev = 17;
							_context.next = 20;
							return _fsPromise2.default.readFile(_appRootPath2.default + '/.vaultlocalrc', 'utf8');
	
						case 20:
							vaultlocalrc = _context.sent;
							_context.next = 25;
							break;
	
						case 23:
							_context.prev = 23;
							_context.t2 = _context['catch'](17);
	
						case 25:
							if (!vaultlocalrc) {
								_context.next = 34;
								break;
							}
	
							_context.prev = 26;
	
							vaultlocalrc = JSON.parse(vaultlocalrc);
							vaultrc = (0, _deepExtend2.default)(vaultrc, vaultlocalrc);
							_context.next = 34;
							break;
	
						case 31:
							_context.prev = 31;
							_context.t3 = _context['catch'](26);
							throw new Error('vault-config: can\'t parse JSON in "' + _appRootPath2.default + '/.vaultlocalrc"\n' + _context.t3.stack);
	
						case 34:
							_context.prev = 34;
							_context.next = 37;
							return _fsPromise2.default.readFile(VAULT_CONFIG_SECRETSPATH, 'utf8');
	
						case 37:
							vaultsecrets = _context.sent;
							_context.next = 43;
							break;
	
						case 40:
							_context.prev = 40;
							_context.t4 = _context['catch'](34);
	
							vaultsecrets = {};
	
						case 43:
							if (!(typeof vaultsecrets === 'string')) {
								_context.next = 51;
								break;
							}
	
							_context.prev = 44;
	
							vaultsecrets = JSON.parse(vaultsecrets);
							_context.next = 51;
							break;
	
						case 48:
							_context.prev = 48;
							_context.t5 = _context['catch'](44);
							throw new Error('vault-config: can\'t parse JSON in "' + VAULT_CONFIG_SECRETSPATH + '"\n' + _context.t5.stack);
	
						case 51:
	
							// merge configs
							configs = (0, _keys2.default)(vaultrc).map(function (key) {
								var envMatch = key.match(/^NODE_ENV=(.+)/),
								    nodeEnv = process.env.NODE_ENV || '';
	
								if (envMatch && nodeEnv.match('^' + envMatch[1] + '$')) {
									return key;
								}
							}).filter(function (key) {
								return key;
							}).map(function (key) {
								return vaultrc[key];
							});
	
							if (!configs.length) {
								_context.next = 60;
								break;
							}
	
							configs = configs.reduce(_deepExtend2.default);
							configs.vault = configs.vault || {};
							configs.local = configs.local || {};
	
							// break out early, we have no matching vault rules
	
							if ((0, _keys2.default)(configs.vault).length) {
								_context.next = 58;
								break;
							}
	
							return _context.abrupt('return', configs.local);
	
						case 58:
							_context.next = 61;
							break;
	
						case 60:
							return _context.abrupt('return', {});
	
						case 61:
							settings = {};
	
							settings.VAULT_CONFIG_TOKEN = process.env.VAULT_CONFIG_TOKEN || vaultsecrets.VAULT_CONFIG_TOKEN;
							settings.VAULT_CONFIG_KEY = process.env.VAULT_CONFIG_KEY || vaultsecrets.VAULT_CONFIG_KEY;
							if (process.env.VAULT_CONFIG_KEYS) {
								settings.VAULT_CONFIG_KEYS = process.env.VAULT_CONFIG_KEYS.split(',');
							} else {
								settings.VAULT_CONFIG_KEYS = vaultsecrets.VAULT_CONFIG_KEYS;
							}
							settings.VAULT_CONFIG_ENDPOINT = vaultrc.VAULT_CONFIG_ENDPOINT || process.env.VAULT_CONFIG_ENDPOINT;
							settings.VAULT_CONFIG_ROOTPATH = vaultrc.VAULT_CONFIG_ROOTPATH || process.env.VAULT_CONFIG_ROOTPATH;
							settings.VAULT_CONFIG_SECRET_SHARES = vaultrc.VAULT_CONFIG_SECRET_SHARES || process.env.VAULT_CONFIG_SECRET_SHARES;
	
							if (settings.VAULT_CONFIG_ENDPOINT) {
								_context.next = 70;
								break;
							}
	
							throw new Error('vault-config: missing "VAULT_CONFIG_ENDPOINT"');
	
						case 70:
							if (settings.VAULT_CONFIG_TOKEN) {
								_context.next = 72;
								break;
							}
	
							throw new Error('vault-config: missing "VAULT_CONFIG_TOKEN"');
	
						case 72:
							vault = (0, _vaultGet2.default)({
								endpoint: settings.VAULT_CONFIG_ENDPOINT,
								token: settings.VAULT_CONFIG_TOKEN,
								keys: settings.VAULT_CONFIG_KEYS,
								key: settings.VAULT_CONFIG_KEY,
								rootPath: settings.VAULT_CONFIG_ROOTPATH,
								secretShares: settings.VAULT_CONFIG_SECRET_SHARES
							});
							_context.prev = 73;
							_context.next = 76;
							return vault.get(configs.vault);
	
						case 76:
							configs.vault = _context.sent;
							_context.next = 83;
							break;
	
						case 79:
							_context.prev = 79;
							_context.t6 = _context['catch'](73);
	
							_context.t6.message = 'vault-config: \n' + _context.t6.message;
							throw _context.t6;
	
						case 83:
							return _context.abrupt('return', (0, _deepExtend2.default)(configs.vault, configs.local));
	
						case 84:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this, [[1, 7], [10, 14], [17, 23], [26, 31], [34, 40], [44, 48], [73, 79]]);
		}));
	
		return function loadConfigAsync() {
			return _ref.apply(this, arguments);
		};
	}();
	
	var _vaultGet = __webpack_require__(4);
	
	var _vaultGet2 = _interopRequireDefault(_vaultGet);
	
	var _fsPromise = __webpack_require__(5);
	
	var _fsPromise2 = _interopRequireDefault(_fsPromise);
	
	var _deasync = __webpack_require__(6);
	
	var _deasync2 = _interopRequireDefault(_deasync);
	
	var _appRootPath = __webpack_require__(7);
	
	var _appRootPath2 = _interopRequireDefault(_appRootPath);
	
	var _deepExtend = __webpack_require__(8);
	
	var _deepExtend2 = _interopRequireDefault(_deepExtend);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var VAULT_CONFIG_RCPATH = process.env.VAULT_CONFIG_RCPATH || _appRootPath2.default + '/.vaultrc';
	var VAULT_CONFIG_SECRETSPATH = process.env.VAULT_CONFIG_SECRETSPATH || _appRootPath2.default + '/.vaultsecrets';
	
	exports.default = (0, _deasync2.default)(function (callback) {
		loadConfigAsync().then(function (config) {
			return callback(null, config);
		}, callback).catch(callback);
	})();
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/regenerator");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("vault-get");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("fs-promise");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("deasync");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("app-root-path");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("deep-extend");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjdkOTRhOTdlMDY2MWYwODdiZmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInZhdWx0LWdldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzLXByb21pc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkZWFzeW5jXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXBwLXJvb3QtcGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRlZXAtZXh0ZW5kXCIiXSwibmFtZXMiOlsidmF1bHRyYyIsInZhdWx0bG9jYWxyYyIsInZhdWx0c2VjcmV0cyIsInJlYWRGaWxlIiwiVkFVTFRfQ09ORklHX1JDUEFUSCIsIkVycm9yIiwic3RhY2siLCJKU09OIiwicGFyc2UiLCJWQVVMVF9DT05GSUdfU0VDUkVUU1BBVEgiLCJjb25maWdzIiwibWFwIiwiZW52TWF0Y2giLCJrZXkiLCJtYXRjaCIsIm5vZGVFbnYiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJmaWx0ZXIiLCJsZW5ndGgiLCJyZWR1Y2UiLCJ2YXVsdCIsImxvY2FsIiwic2V0dGluZ3MiLCJWQVVMVF9DT05GSUdfVE9LRU4iLCJWQVVMVF9DT05GSUdfS0VZIiwiVkFVTFRfQ09ORklHX0tFWVMiLCJzcGxpdCIsIlZBVUxUX0NPTkZJR19FTkRQT0lOVCIsIlZBVUxUX0NPTkZJR19ST09UUEFUSCIsIlZBVUxUX0NPTkZJR19TRUNSRVRfU0hBUkVTIiwiZW5kcG9pbnQiLCJ0b2tlbiIsImtleXMiLCJyb290UGF0aCIsInNlY3JldFNoYXJlcyIsImdldCIsIm1lc3NhZ2UiLCJsb2FkQ29uZmlnQXN5bmMiLCJ0aGVuIiwiY2FsbGJhY2siLCJjb25maWciLCJjYXRjaCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3RUM3QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0tBLGNBREwsV0FFRUMsWUFGRixXQUdFQyxZQUhGO0FBQUE7QUFBQTtBQUFBLGNBTWtCLG9CQUFHQyxRQUFILENBQVlDLG1CQUFaLEVBQWlDLE1BQWpDLENBTmxCOztBQUFBO0FBTUVKLGNBTkY7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBUVEsSUFBSUssS0FBSixpQ0FBdUNELG1CQUF2QyxXQUFnRSxZQUFNRSxLQUF0RSxDQVJSOztBQUFBO0FBQUE7O0FBV0VOLGlCQUFVTyxLQUFLQyxLQUFMLENBQVdSLE9BQVgsQ0FBVjtBQVhGO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFhUSxJQUFJSyxLQUFKLDBDQUFnREQsbUJBQWhELFdBQXlFLFlBQU1FLEtBQS9FLENBYlI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FpQnVCLG9CQUFHSCxRQUFILDJDQUE4QyxNQUE5QyxDQWpCdkI7O0FBQUE7QUFpQkVGLG1CQWpCRjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsWUFtQktBLFlBbkJMO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQXFCR0Esc0JBQWVNLEtBQUtDLEtBQUwsQ0FBV1AsWUFBWCxDQUFmO0FBQ0FELGlCQUFVLDBCQUFPQSxPQUFQLEVBQWdCQyxZQUFoQixD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dC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZjdkOTRhOTdlMDY2MWYwODdiZmVcbiAqKi8iLCJpbXBvcnQgVmF1bHQgZnJvbSAndmF1bHQtZ2V0JztcbmltcG9ydCBmcyBmcm9tICdmcy1wcm9taXNlJztcbmltcG9ydCBkZWFzeW5jIGZyb20gJ2RlYXN5bmMnO1xuaW1wb3J0IF9fcm9vdGRpcm5hbWUgZnJvbSAnYXBwLXJvb3QtcGF0aCc7XG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2RlZXAtZXh0ZW5kJztcblxuY29uc3QgVkFVTFRfQ09ORklHX1JDUEFUSCA9IHByb2Nlc3MuZW52LlZBVUxUX0NPTkZJR19SQ1BBVEggfHwgYCR7X19yb290ZGlybmFtZX0vLnZhdWx0cmNgO1xuY29uc3QgVkFVTFRfQ09ORklHX1NFQ1JFVFNQQVRIID0gcHJvY2Vzcy5lbnYuVkFVTFRfQ09ORklHX1NFQ1JFVFNQQVRIIHx8IGAke19fcm9vdGRpcm5hbWV9Ly52YXVsdHNlY3JldHNgO1xuXG5hc3luYyBmdW5jdGlvbiBsb2FkQ29uZmlnQXN5bmMgKCkge1xuXHRsZXQgdmF1bHRyYyxcblx0XHR2YXVsdGxvY2FscmMsXG5cdFx0dmF1bHRzZWNyZXRzO1xuXG5cdHRyeSB7XG5cdFx0dmF1bHRyYyA9IGF3YWl0IGZzLnJlYWRGaWxlKFZBVUxUX0NPTkZJR19SQ1BBVEgsICd1dGY4Jyk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGB2YXVsdC1jb25maWc6IGNhbid0IGZpbmQgXCIke1ZBVUxUX0NPTkZJR19SQ1BBVEh9XCJcXG4ke2Vycm9yLnN0YWNrfWApO1xuXHR9XG5cdHRyeSB7XG5cdFx0dmF1bHRyYyA9IEpTT04ucGFyc2UodmF1bHRyYyk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGB2YXVsdC1jb25maWc6IGNhbid0IHBhcnNlIEpTT04gaW4gXCIke1ZBVUxUX0NPTkZJR19SQ1BBVEh9XCJcXG4ke2Vycm9yLnN0YWNrfWApO1xuXHR9XG5cblx0dHJ5IHtcblx0XHR2YXVsdGxvY2FscmMgPSBhd2FpdCBmcy5yZWFkRmlsZShgJHtfX3Jvb3RkaXJuYW1lfS8udmF1bHRsb2NhbHJjYCwgJ3V0ZjgnKTtcblx0fSBjYXRjaCAoZXJyb3IpIHt9XG5cdGlmICh2YXVsdGxvY2FscmMpIHtcblx0XHR0cnkge1xuXHRcdFx0dmF1bHRsb2NhbHJjID0gSlNPTi5wYXJzZSh2YXVsdGxvY2FscmMpO1xuXHRcdFx0dmF1bHRyYyA9IGV4dGVuZCh2YXVsdHJjLCB2YXVsdGxvY2FscmMpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYHZhdWx0LWNvbmZpZzogY2FuJ3QgcGFyc2UgSlNPTiBpbiBcIiR7X19yb290ZGlybmFtZX0vLnZhdWx0bG9jYWxyY1wiXFxuJHtlcnJvci5zdGFja31gKTtcblx0XHR9XG5cdH1cblxuXHR0cnkge1xuXHRcdHZhdWx0c2VjcmV0cyA9IGF3YWl0IGZzLnJlYWRGaWxlKFZBVUxUX0NPTkZJR19TRUNSRVRTUEFUSCwgJ3V0ZjgnKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHR2YXVsdHNlY3JldHMgPSB7fTtcblx0fVxuXHRpZiAodHlwZW9mIHZhdWx0c2VjcmV0cyA9PT0gJ3N0cmluZycpIHtcblx0XHR0cnkge1xuXHRcdFx0dmF1bHRzZWNyZXRzID0gSlNPTi5wYXJzZSh2YXVsdHNlY3JldHMpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYHZhdWx0LWNvbmZpZzogY2FuJ3QgcGFyc2UgSlNPTiBpbiBcIiR7VkFVTFRfQ09ORklHX1NFQ1JFVFNQQVRIfVwiXFxuJHtlcnJvci5zdGFja31gKTtcblx0XHR9XG5cdH1cblxuXHQvLyBtZXJnZSBjb25maWdzXG5cdGxldCBjb25maWdzID0gT2JqZWN0LmtleXModmF1bHRyYylcblx0XHQubWFwKGtleSA9PiB7XG5cdFx0XHRsZXQgZW52TWF0Y2ggPSBrZXkubWF0Y2goL15OT0RFX0VOVj0oLispLyksXG5cdFx0XHRcdG5vZGVFbnYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnJztcblxuXHRcdFx0aWYgKGVudk1hdGNoICYmIG5vZGVFbnYubWF0Y2goYF4ke2Vudk1hdGNoWzFdfSRgKSkge1xuXHRcdFx0XHRyZXR1cm4ga2V5O1xuXHRcdFx0fVxuXHRcdH0pXG5cdFx0LmZpbHRlcihrZXkgPT4ga2V5KVxuXHRcdC5tYXAoa2V5ID0+IHZhdWx0cmNba2V5XSk7XG5cblx0aWYgKGNvbmZpZ3MubGVuZ3RoKSB7XG5cdFx0Y29uZmlncyA9IGNvbmZpZ3MucmVkdWNlKGV4dGVuZCk7XG5cdFx0Y29uZmlncy52YXVsdCA9IGNvbmZpZ3MudmF1bHQgfHwge307XG5cdFx0Y29uZmlncy5sb2NhbCA9IGNvbmZpZ3MubG9jYWwgfHwge307XG5cblx0XHQvLyBicmVhayBvdXQgZWFybHksIHdlIGhhdmUgbm8gbWF0Y2hpbmcgdmF1bHQgcnVsZXNcblx0XHRpZiAoIU9iamVjdC5rZXlzKGNvbmZpZ3MudmF1bHQpLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIGNvbmZpZ3MubG9jYWw7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdC8vIGJyZWFrIG91dCBlYXJseSwgd2UgZG9udCBoYXZlIGFueSBydWxlc1xuXHRcdHJldHVybiB7fTtcblx0fVxuXG5cdGxldCBzZXR0aW5ncyA9IHt9O1xuXHRzZXR0aW5ncy5WQVVMVF9DT05GSUdfVE9LRU4gPSBwcm9jZXNzLmVudi5WQVVMVF9DT05GSUdfVE9LRU4gfHwgdmF1bHRzZWNyZXRzLlZBVUxUX0NPTkZJR19UT0tFTjtcblx0c2V0dGluZ3MuVkFVTFRfQ09ORklHX0tFWSA9IHByb2Nlc3MuZW52LlZBVUxUX0NPTkZJR19LRVkgfHwgdmF1bHRzZWNyZXRzLlZBVUxUX0NPTkZJR19LRVk7XG5cdGlmIChwcm9jZXNzLmVudi5WQVVMVF9DT05GSUdfS0VZUykge1xuXHRcdHNldHRpbmdzLlZBVUxUX0NPTkZJR19LRVlTID0gcHJvY2Vzcy5lbnYuVkFVTFRfQ09ORklHX0tFWVMuc3BsaXQoJywnKTtcblx0fSBlbHNlIHtcblx0XHRzZXR0aW5ncy5WQVVMVF9DT05GSUdfS0VZUyA9IHZhdWx0c2VjcmV0cy5WQVVMVF9DT05GSUdfS0VZUztcblx0fVxuXHRzZXR0aW5ncy5WQVVMVF9DT05GSUdfRU5EUE9JTlQgPSB2YXVsdHJjLlZBVUxUX0NPTkZJR19FTkRQT0lOVCB8fCBwcm9jZXNzLmVudi5WQVVMVF9DT05GSUdfRU5EUE9JTlQ7XG5cdHNldHRpbmdzLlZBVUxUX0NPTkZJR19ST09UUEFUSCA9IHZhdWx0cmMuVkFVTFRfQ09ORklHX1JPT1RQQVRIIHx8IHByb2Nlc3MuZW52LlZBVUxUX0NPTkZJR19ST09UUEFUSDtcblx0c2V0dGluZ3MuVkFVTFRfQ09ORklHX1NFQ1JFVF9TSEFSRVMgPSB2YXVsdHJjLlZBVUxUX0NPTkZJR19TRUNSRVRfU0hBUkVTIHx8IHByb2Nlc3MuZW52LlZBVUxUX0NPTkZJR19TRUNSRVRfU0hBUkVTO1xuXG5cdGlmICghc2V0dGluZ3MuVkFVTFRfQ09ORklHX0VORFBPSU5UKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCd2YXVsdC1jb25maWc6IG1pc3NpbmcgXCJWQVVMVF9DT05GSUdfRU5EUE9JTlRcIicpO1xuXHR9XG5cblx0aWYgKCFzZXR0aW5ncy5WQVVMVF9DT05GSUdfVE9LRU4pIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3ZhdWx0LWNvbmZpZzogbWlzc2luZyBcIlZBVUxUX0NPTkZJR19UT0tFTlwiJyk7XG5cdH1cblxuXHRsZXQgdmF1bHQgPSBWYXVsdCh7XG5cdFx0ZW5kcG9pbnQ6IHNldHRpbmdzLlZBVUxUX0NPTkZJR19FTkRQT0lOVCxcblx0XHR0b2tlbjogc2V0dGluZ3MuVkFVTFRfQ09ORklHX1RPS0VOLFxuXHRcdGtleXM6IHNldHRpbmdzLlZBVUxUX0NPTkZJR19LRVlTLFxuXHRcdGtleTogc2V0dGluZ3MuVkFVTFRfQ09ORklHX0tFWSxcblx0XHRyb290UGF0aDogc2V0dGluZ3MuVkFVTFRfQ09ORklHX1JPT1RQQVRILFxuXHRcdHNlY3JldFNoYXJlczogc2V0dGluZ3MuVkFVTFRfQ09ORklHX1NFQ1JFVF9TSEFSRVNcblx0fSk7XG5cblx0dHJ5IHtcblx0XHRjb25maWdzLnZhdWx0ID0gYXdhaXQgdmF1bHQuZ2V0KGNvbmZpZ3MudmF1bHQpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGVycm9yLm1lc3NhZ2UgPSBgdmF1bHQtY29uZmlnOiBcXG4ke2Vycm9yLm1lc3NhZ2V9YDtcblx0XHR0aHJvdyBlcnJvcjtcblx0fVxuXG5cdHJldHVybiBleHRlbmQoY29uZmlncy52YXVsdCwgY29uZmlncy5sb2NhbCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlYXN5bmMoY2FsbGJhY2sgPT4ge1xuXHRsb2FkQ29uZmlnQXN5bmMoKVxuXHRcdC50aGVuKGNvbmZpZyA9PiBjYWxsYmFjayhudWxsLCBjb25maWcpLCBjYWxsYmFjaylcblx0XHQuY2F0Y2goY2FsbGJhY2spO1xufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5c1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzXCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIlxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInZhdWx0LWdldFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwidmF1bHQtZ2V0XCJcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmcy1wcm9taXNlXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJmcy1wcm9taXNlXCJcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkZWFzeW5jXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJkZWFzeW5jXCJcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcHAtcm9vdC1wYXRoXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhcHAtcm9vdC1wYXRoXCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkZWVwLWV4dGVuZFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZGVlcC1leHRlbmRcIlxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=