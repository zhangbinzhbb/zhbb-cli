"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.betterRequire = undefined;

var _commander = require("commander");

var betterRequire = exports.betterRequire = function betterRequire(absPath) {
  var module = require(absPath);
  if (module.default) {
    return module.default;
  }
  return module;
};