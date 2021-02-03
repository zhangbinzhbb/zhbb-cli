"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOWNLOAD = exports.DEFAULTS = exports.RC = exports.VERSION = undefined;

var _package = require("../../package.json");

var HOME = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];

// console.log('HOME', HOME); // '/Users/lubeibei'

var VERSION = exports.VERSION = _package.version;

var RC = exports.RC = HOME + "/.zbclirc";

var DEFAULTS = exports.DEFAULTS = {
  registry: "zhufeng-cli",
  type: "orgs"
};

var DOWNLOAD = exports.DOWNLOAD = HOME + "/.template";