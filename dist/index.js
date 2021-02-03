"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require("./utils/common");

var _path = require("path");

var apply = function apply(action) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  (0, _common.betterRequire)((0, _path.resolve)(__dirname, "./" + action)).apply(undefined, args);
};
exports.default = apply;