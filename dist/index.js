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
	
	var _keys = __webpack_require__(1);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _slicedToArray2 = __webpack_require__(2);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _regenerator = __webpack_require__(3);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _promise = __webpack_require__(4);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _asyncToGenerator2 = __webpack_require__(5);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _assign = __webpack_require__(6);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	// make promise version of fs.readFile() + JSON.parse
	var readJsonAsync = function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(filename) {
			var doReject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
								_fs2.default.readFile(filename, function (err, data) {
									if (err) {
										if (doReject) {
											reject(err);
										} else {
											resolve(null);
										}
									} else {
										resolve(JSON.parse(data));
									}
								});
							}));
	
						case 1:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));
	
		return function readJsonAsync(_x) {
			return _ref.apply(this, arguments);
		};
	}();
	
	var loadConfigAsync = function () {
		var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
			var _ref3, _ref4, vaultrc, vaultlocalrc, configs, secrets, config;
	
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							if (!process[VAULT_GLOBAL]) {
								_context2.next = 2;
								break;
							}
	
							return _context2.abrupt('return', process[VAULT_GLOBAL]);
	
						case 2:
							_context2.next = 4;
							return _promise2.default.all([readJsonAsync(VAULT_CONFIG_RCPATH), readJsonAsync(_appRootPath2.default + '/.vaultlocalrc', false)]).catch(function (error) {
								throw new Error('vault-config: invalid config/secrets files\n' + error.stack);
							});
	
						case 4:
							_ref3 = _context2.sent;
							_ref4 = (0, _slicedToArray3.default)(_ref3, 2);
							vaultrc = _ref4[0];
							vaultlocalrc = _ref4[1];
	
	
							vaultrc = (0, _deepExtend2.default)(vaultrc, vaultlocalrc);
	
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
								_context2.next = 18;
								break;
							}
	
							configs = configs.reduce(_deepExtend2.default);
							configs.vault = configs.vault || {};
							configs.local = configs.local || {};
	
							// break out early, we have no matching vault rules
	
							if ((0, _keys2.default)(configs.vault).length) {
								_context2.next = 16;
								break;
							}
	
							return _context2.abrupt('return', configs.local);
	
						case 16:
							_context2.next = 19;
							break;
	
						case 18:
							return _context2.abrupt('return', {});
	
						case 19:
	
							debug('secrets: loading');
	
							_context2.prev = 20;
							_context2.next = 23;
							return (0, _acSecrets2.default)();
	
						case 23:
							secrets = _context2.sent;
							config = applySecretsToConfig(secrets, configs.vault);
	
	
							configs.vault = config;
	
							debug('secrets: loaded ' + (0, _keys2.default)(secrets).length);
	
							_context2.next = 32;
							break;
	
						case 29:
							_context2.prev = 29;
							_context2.t0 = _context2['catch'](20);
							throw new Error('vault-config: cannot load secrets from GCP\n' + _context2.t0.stack);
	
						case 32:
							return _context2.abrupt('return', process[VAULT_GLOBAL] = (0, _deepExtend2.default)(configs.vault, configs.local));
	
						case 33:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this, [[20, 29]]);
		}));
	
		return function loadConfigAsync() {
			return _ref2.apply(this, arguments);
		};
	}();
	
	var _fs = __webpack_require__(7);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _deasync = __webpack_require__(8);
	
	var _deasync2 = _interopRequireDefault(_deasync);
	
	var _appRootPath = __webpack_require__(9);
	
	var _appRootPath2 = _interopRequireDefault(_appRootPath);
	
	var _deepExtend = __webpack_require__(10);
	
	var _deepExtend2 = _interopRequireDefault(_deepExtend);
	
	var _debug = __webpack_require__(11);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	var _atmpt = __webpack_require__(12);
	
	var _atmpt2 = _interopRequireDefault(_atmpt);
	
	var _acSecrets = __webpack_require__(13);
	
	var _acSecrets2 = _interopRequireDefault(_acSecrets);
	
	var _traverse = __webpack_require__(14);
	
	var _traverse2 = _interopRequireDefault(_traverse);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import VaultRaw from 'node-vault';
	// import Vault from 'vault-get';
	var debug = (0, _debug2.default)('vault-config');
	var VAULT_CONFIG_RCPATH = process.env.VAULT_CONFIG_RCPATH || _appRootPath2.default + '/.vaultrc';
	// const VAULT_CONFIG_SECRETSPATH = process.env.VAULT_CONFIG_SECRETSPATH || `${__rootdirname}/.vaultsecrets`;
	var VAULT_GLOBAL = '__vault-config-shared__';
	
	/*
	 * this method replicates vault-get https://github.com/icodeforlove/vault-get/blob/master/src/index.js 
	 * doesn't modify the provided vaultrc, it returns a new config object as a copy including all the demanded secrets
	*/
	function applySecretsToConfig(secrets, vaultrc) {
		var config = (0, _assign2.default)({}, vaultrc);
	
		(0, _traverse2.default)(vaultrc).forEach(function () {
			if (this.isLeaf) {
				var url = (0, _traverse2.default)(vaultrc).get(this.path);
	
				var data = secrets[url];
	
				(0, _traverse2.default)(config).set(this.path, data.value || data);
			}
		});
	
		return config;
	};
	
	exports.default = (0, _deasync2.default)(function (callback) {
		(0, _atmpt2.default)(loadConfigAsync, { maxAttempts: 3, delay: function delay(attempt) {
				return attempt * 1000;
			} }).then(function (config) {
			return callback(null, config);
		}, callback).catch(callback);
	})();
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/regenerator");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("deasync");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("app-root-path");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("deep-extend");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("atmpt");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("@auctionclub/ac-secrets");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("traverse");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzk1MTBhMTA4ZWU3M2ZkMzllYzUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZGVhc3luY1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwcC1yb290LXBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkZWVwLWV4dGVuZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRlYnVnXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXRtcHRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYXVjdGlvbmNsdWIvYWMtc2VjcmV0c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRyYXZlcnNlXCIiXSwibmFtZXMiOlsiZmlsZW5hbWUiLCJkb1JlamVjdCIsInJlc29sdmUiLCJyZWplY3QiLCJmcyIsInJlYWRGaWxlIiwiZXJyIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsInJlYWRKc29uQXN5bmMiLCJwcm9jZXNzIiwiVkFVTFRfR0xPQkFMIiwiYWxsIiwiVkFVTFRfQ09ORklHX1JDUEFUSCIsIl9fcm9vdGRpcm5hbWUiLCJjYXRjaCIsIkVycm9yIiwiZXJyb3IiLCJzdGFjayIsInZhdWx0cmMiLCJ2YXVsdGxvY2FscmMiLCJjb25maWdzIiwibWFwIiwiZW52TWF0Y2giLCJrZXkiLCJtYXRjaCIsIm5vZGVFbnYiLCJlbnYiLCJOT0RFX0VOViIsImZpbHRlciIsImxlbmd0aCIsInJlZHVjZSIsImV4dGVuZCIsInZhdWx0IiwibG9jYWwiLCJkZWJ1ZyIsInNlY3JldHMiLCJjb25maWciLCJhcHBseVNlY3JldHNUb0NvbmZpZyIsImxvYWRDb25maWdBc3luYyIsImZvckVhY2giLCJpc0xlYWYiLCJ1cmwiLCJnZXQiLCJwYXRoIiwic2V0IiwidmFsdWUiLCJtYXhBdHRlbXB0cyIsImRlbGF5IiwiYXR0ZW1wdCIsInRoZW4iLCJjYWxsYmFjayJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7O3NGQUNBLGlCQUE4QkEsUUFBOUI7QUFBQSxPQUF3Q0MsUUFBeEMsdUVBQW1ELElBQW5EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FDVyxzQkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcENDLHFCQUFHQyxRQUFILENBQVlMLFFBQVosRUFBc0IsVUFBQ00sR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDakMsYUFBSUQsR0FBSixFQUFTO0FBQ0wsY0FBSUwsUUFBSixFQUFjO0FBQ3pCRSxrQkFBT0csR0FBUDtBQUNBLFdBRlcsTUFFTDtBQUNOSixtQkFBUSxJQUFSO0FBQ0E7QUFDRCxVQU5RLE1BT0s7QUFDREEsa0JBQVFNLEtB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b0JBQVQsQ0FBOEJGLE9BQTlCLEVBQXVDakIsT0FBdkMsRUFBZ0Q7QUFDL0MsTUFBSWtCLFNBQVMsc0JBQWMsRUFBZCxFQUFrQmxCLE9BQWxCLENBQWI7O0FBRUEsMEJBQVNBLE9BQVQsRUFBa0JxQixPQUFsQixDQUEwQixZQUFZO0FBQ3JDLE9BQUksS0FBS0MsTUFBVCxFQUFpQjtBQUNoQixRQUFJQyxNQUFNLHdCQUFTdkIsT0FBVCxFQUFrQndCLEdBQWxCLENBQXNCLEtBQUtDLElBQTNCLENBQVY7O0FBRUEsUUFBSXRDLE9BQU84QixRQUFRTSxHQUFSLENBQVg7O0FBRUEsNEJBQVNMLE1BQVQsRUFBaUJRLEdBQWpCLENBQXFCLEtBQUtELElBQTFCLEVBQWdDdEMsS0FBS3dDLEtBQUwsSUFBY3hDLElBQTlDO0FBQ0E7QUFDRCxHQVJEOztBQVVBLFNBQU8rQixNQUFQO0FBQ0EsRUFrQkE7O21CQWlFYyx1QkFBUSxvQkFBWTtBQUNsQyx1QkFBTUUsZUFBTixFQUF1QixFQUFDUSxhQUFhLENBQWQsRUFBaUJDLE9BQU87QUFBQSxXQUFXQyxVQUFVLElBQXJCO0FBQUEsSUFBeEIsRUFBdkIsRUFBMkVDLElBQTNFLENBQ0M7QUFBQSxVQUFVQyxTQUFTLElBQVQsRUFBZWQsTUFBZixDQUFWO0FBQUEsR0FERCxFQUVDYyxRQUZELEVBR0VwQyxLQUhGLENBR1FvQyxRQUhSO0FBSUEsRUFMYyxHOzs7Ozs7O0FDckhmLCtEOzs7Ozs7QUNBQSxpRTs7Ozs7O0FDQUEsdUQ7Ozs7OztBQ0FBLDJEOzs7Ozs7QUNBQSxvRTs7Ozs7O0FDQUEsaUU7Ozs7OztBQ0FBLGdDOzs7Ozs7QUNBQSxxQzs7Ozs7O0FDQUEsMkM7Ozs7OztBQ0FBLHlDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLHFEOzs7Ozs7QUNBQSxzQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYzk1MTBhMTA4ZWU3M2ZkMzllYzVcbiAqKi8iLCIvLyBpbXBvcnQgVmF1bHRSYXcgZnJvbSAnbm9kZS12YXVsdCc7XG4vLyBpbXBvcnQgVmF1bHQgZnJvbSAndmF1bHQtZ2V0JztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgZGVhc3luYyBmcm9tICdkZWFzeW5jJztcbmltcG9ydCBfX3Jvb3RkaXJuYW1lIGZyb20gJ2FwcC1yb290LXBhdGgnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICdkZWVwLWV4dGVuZCc7XG5pbXBvcnQgRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGF0bXB0IGZyb20gJ2F0bXB0JztcbmltcG9ydCBnZXRTZWNyZXRzIGZyb20gJ0BhdWN0aW9uY2x1Yi9hYy1zZWNyZXRzJztcbmltcG9ydCB0cmF2ZXJzZSBmcm9tICd0cmF2ZXJzZSc7XG5cbmNvbnN0IGRlYnVnID0gRGVidWcoJ3ZhdWx0LWNvbmZpZycpO1xuY29uc3QgVkFVTFRfQ09ORklHX1JDUEFUSCA9IHByb2Nlc3MuZW52LlZBVUxUX0NPTkZJR19SQ1BBVEggfHwgYCR7X19yb290ZGlybmFtZX0vLnZhdWx0cmNgO1xuLy8gY29uc3QgVkFVTFRfQ09ORklHX1NFQ1JFVFNQQVRIID0gcHJvY2Vzcy5lbnYuVkFVTFRfQ09ORklHX1NFQ1JFVFNQQVRIIHx8IGAke19fcm9vdGRpcm5hbWV9Ly52YXVsdHNlY3JldHNgO1xuY29uc3QgVkFVTFRfR0xPQkFMID0gJ19fdmF1bHQtY29uZmlnLXNoYXJlZF9fJztcblxuLypcbiAqIHRoaXMgbWV0aG9kIHJlcGxpY2F0ZXMgdmF1bHQtZ2V0IGh0dHBzOi8vZ2l0aHViLmNvbS9pY29kZWZvcmxvdmUvdmF1bHQtZ2V0L2Jsb2IvbWFzdGVyL3NyYy9pbmRleC5qcyBcbiAqIGRvZXNuJ3QgbW9kaWZ5IHRoZSBwcm92aWRlZCB2YXVsdHJjLCBpdCByZXR1cm5zIGEgbmV3IGNvbmZpZyBvYmplY3QgYXMgYSBjb3B5IGluY2x1ZGluZyBhbGwgdGhlIGRlbWFuZGVkIHNlY3JldHNcbiovXG5mdW5jdGlvbiBhcHBseVNlY3JldHNUb0NvbmZpZyhzZWNyZXRzLCB2YXVsdHJjKSB7XG5cdGxldCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB2YXVsdHJjKTtcblxuXHR0cmF2ZXJzZSh2YXVsdHJjKS5mb3JFYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5pc0xlYWYpIHtcblx0XHRcdGxldCB1cmwgPSB0cmF2ZXJzZSh2YXVsdHJjKS5nZXQodGhpcy5wYXRoKTtcblxuXHRcdFx0bGV0IGRhdGEgPSBzZWNyZXRzW3VybF07XG5cblx0XHRcdHRyYXZlcnNlKGNvbmZpZykuc2V0KHRoaXMucGF0aCwgZGF0YS52YWx1ZSB8fCBkYXRhKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBjb25maWc7XG59XG5cbi8vIG1ha2UgcHJvbWlzZSB2ZXJzaW9uIG9mIGZzLnJlYWRGaWxlKCkgKyBKU09OLnBhcnNlXG5hc3luYyBmdW5jdGlvbiByZWFkSnNvbkFzeW5jIChmaWxlbmFtZSwgZG9SZWplY3QgPSB0cnVlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZnMucmVhZEZpbGUoZmlsZW5hbWUsIChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9SZWplY3QpIHtcblx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXNvbHZlKG51bGwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoZGF0YSkpO1xuXHRcdFx0fVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRDb25maWdBc3luYyAoKSB7XG5cdGlmIChwcm9jZXNzW1ZBVUxUX0dMT0JBTF0pIHtcblx0XHRyZXR1cm4gcHJvY2Vzc1tWQVVMVF9HTE9CQUxdO1xuXHR9XG5cblx0bGV0IFsgdmF1bHRyYywgdmF1bHRsb2NhbHJjIF0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG5cdFx0cmVhZEpzb25Bc3luYyhWQVVMVF9DT05GSUdfUkNQQVRIKSxcblx0XHRyZWFkSnNvbkFzeW5jKGAke19fcm9vdGRpcm5hbWV9Ly52YXVsdGxvY2FscmNgLCBmYWxzZSksXG5cdF0pXG5cdC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYHZhdWx0LWNvbmZpZzogaW52YWxpZCBjb25maWcvc2VjcmV0cyBmaWxlc1xcbiR7ZXJyb3Iuc3RhY2t9YCk7XG5cblx0fSk7XG5cblxuXHR2YXVsdHJjID0gZXh0ZW5kKHZhdWx0cmMsIHZhdWx0bG9jYWxyYyk7XG5cblxuXHQvLyBtZXJnZSBjb25maWdzXG5cdGxldCBjb25maWdzID0gT2JqZWN0LmtleXModmF1bHRyYylcblx0XHQubWFwKGtleSA9PiB7XG5cdFx0XHRsZXQgZW52TWF0Y2ggPSBrZXkubWF0Y2goL15OT0RFX0VOVj0oLispLyksXG5cdFx0XHRcdG5vZGVFbnYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnJztcblxuXHRcdFx0aWYgKGVudk1hdGNoICYmIG5vZGVFbnYubWF0Y2goYF4ke2Vudk1hdGNoWzFdfSRgKSkge1xuXHRcdFx0XHRyZXR1cm4ga2V5O1xuXHRcdFx0fVxuXHRcdH0pXG5cdFx0LmZpbHRlcihrZXkgPT4ga2V5KVxuXHRcdC5tYXAoa2V5ID0+IHZhdWx0cmNba2V5XSk7XG5cblx0aWYgKGNvbmZpZ3MubGVuZ3RoKSB7XG5cdFx0Y29uZmlncyA9IGNvbmZpZ3MucmVkdWNlKGV4dGVuZCk7XG5cdFx0Y29uZmlncy52YXVsdCA9IGNvbmZpZ3MudmF1bHQgfHwge307XG5cdFx0Y29uZmlncy5sb2NhbCA9IGNvbmZpZ3MubG9jYWwgfHwge307XG5cblx0XHQvLyBicmVhayBvdXQgZWFybHksIHdlIGhhdmUgbm8gbWF0Y2hpbmcgdmF1bHQgcnVsZXNcblx0XHRpZiAoIU9iamVjdC5rZXlzKGNvbmZpZ3MudmF1bHQpLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIGNvbmZpZ3MubG9jYWw7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdC8vIGJyZWFrIG91dCBlYXJseSwgd2UgZG9udCBoYXZlIGFueSBydWxlc1xuXHRcdHJldHVybiB7fTtcblx0fVxuXG5cblx0ZGVidWcoJ3NlY3JldHM6IGxvYWRpbmcnKTtcblx0XG5cdHRyeSB7XG5cdFx0Y29uc3Qgc2VjcmV0cyA9IGF3YWl0IGdldFNlY3JldHMoKTtcblx0XHRjb25zdCBjb25maWcgPSBhcHBseVNlY3JldHNUb0NvbmZpZyhzZWNyZXRzLCBjb25maWdzLnZhdWx0KTtcblxuXHRcdGNvbmZpZ3MudmF1bHQgPSBjb25maWc7XG5cdFxuXHRcdGRlYnVnKCdzZWNyZXRzOiBsb2FkZWQgJyArIE9iamVjdC5rZXlzKHNlY3JldHMpLmxlbmd0aCk7XG5cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYHZhdWx0LWNvbmZpZzogY2Fubm90IGxvYWQgc2VjcmV0cyBmcm9tIEdDUFxcbiR7ZXJyb3Iuc3RhY2t9YCk7XG5cdH1cblxuXHRyZXR1cm4gcHJvY2Vzc1tWQVVMVF9HTE9CQUxdID0gZXh0ZW5kKGNvbmZpZ3MudmF1bHQsIGNvbmZpZ3MubG9jYWwpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWFzeW5jKGNhbGxiYWNrID0+IHtcblx0YXRtcHQobG9hZENvbmZpZ0FzeW5jLCB7bWF4QXR0ZW1wdHM6IDMsIGRlbGF5OiBhdHRlbXB0ID0+IGF0dGVtcHQgKiAxMDAwfSkudGhlbihcblx0XHRjb25maWcgPT4gY2FsbGJhY2sobnVsbCwgY29uZmlnKSxcblx0XHRjYWxsYmFja1xuXHQpLmNhdGNoKGNhbGxiYWNrKTtcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5c1wiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXlcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5XCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCJcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIlxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduXCJcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZnNcIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRlYXN5bmNcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImRlYXN5bmNcIlxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwcC1yb290LXBhdGhcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFwcC1yb290LXBhdGhcIlxuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRlZXAtZXh0ZW5kXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJkZWVwLWV4dGVuZFwiXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRlYnVnXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJkZWJ1Z1wiXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF0bXB0XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhdG1wdFwiXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhdWN0aW9uY2x1Yi9hYy1zZWNyZXRzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJAYXVjdGlvbmNsdWIvYWMtc2VjcmV0c1wiXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRyYXZlcnNlXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJ0cmF2ZXJzZVwiXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=