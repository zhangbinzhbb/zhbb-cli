"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadLocal = exports.download = exports.repoList = exports.tagList = undefined;

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _rc = require("./rc");

var _downloadGitRepo = require("download-git-repo");

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetch = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var config = {
                url: url,
                method: "get",
                headers: {
                  "user-agent": "xxx"
                }
              };
              (0, _request2.default)(config, function (err, response, body) {
                if (err) {
                  reject(err);
                }
                resolve(JSON.parse(body));
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetch(_x) {
    return _ref.apply(this, arguments);
  };
}();

var tagList = exports.tagList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(repo) {
    var config, api;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _rc.getAll)();

          case 2:
            config = _context2.sent;
            api = "https://api.github.com/repos/" + config.registry + "/" + repo + "/tags";
            _context2.next = 6;
            return fetch(api);

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function tagList(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var repoList = exports.repoList = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var config, api;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _rc.getAll)();

          case 2:
            config = _context3.sent;
            api = "https://api.github.com/" + config.type + "/" + config.registry + "/repos";
            _context3.next = 6;
            return fetch(api);

          case 6:
            return _context3.abrupt("return", _context3.sent);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function repoList() {
    return _ref3.apply(this, arguments);
  };
}();

var download = exports.download = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(src, dest) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(function (resolve, reject) {
              (0, _downloadGitRepo2.default)(src, dest, function (err) {
                if (err) {
                  reject(err);
                }
                resolve();
              });
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function download(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var downloadLocal = exports.downloadLocal = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(project, version) {
    var config, api;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _rc.getAll)();

          case 2:
            config = _context5.sent;
            api = config.registry + "/" + project;

            if (version) {
              api += "#" + version;
            }
            _context5.next = 7;
            return download(api, _constants.DOWNLOAD + "/" + project);

          case 7:
            return _context5.abrupt("return", _context5.sent);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function downloadLocal(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();