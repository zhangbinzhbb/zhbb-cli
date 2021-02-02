"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rc = require("./utils/rc");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var config = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(action, k, v) {
    var key, obj;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = action;
            _context.next = _context.t0 === "get" ? 3 : _context.t0 === "set" ? 15 : _context.t0 === "remove" ? 17 : 19;
            break;

          case 3:
            if (!k) {
              _context.next = 10;
              break;
            }

            _context.next = 6;
            return (0, _rc.get)(k);

          case 6:
            key = _context.sent;

            console.log("key", key);
            _context.next = 14;
            break;

          case 10:
            _context.next = 12;
            return (0, _rc.getAll)();

          case 12:
            obj = _context.sent;

            Object.keys(obj).forEach(function (key) {
              console.log(key + " = " + obj[key]);
            });

          case 14:
            return _context.abrupt("break", 19);

          case 15:
            (0, _rc.set)(k, v);
            return _context.abrupt("break", 19);

          case 17:
            (0, _rc.remove)(k);
            return _context.abrupt("break", 19);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function config(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.default = config;