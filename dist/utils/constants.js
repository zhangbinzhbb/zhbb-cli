"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COMPILE_TEMP = exports.INTERFACE_ASK = exports.DEFAULTS = exports.UA = exports.TEMP = exports.DOWNLOAD = exports.RC = exports.VERSION = undefined;

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _package = require("../../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 本机的home目录
// 找到用户的根目录
// 存储开发中本地的常用变量
const HOME = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];
// console.log(process.platform)//win32  node运行的操作系统的环境时显示内核相关的信息
// process.env.USERPROFILE  //当前目录下配置的文件

const VERSION = exports.VERSION = _package.version;
// zbclirc
const RC = exports.RC = `${HOME}/.zbclirc`;
// 下载目录
const DOWNLOAD = exports.DOWNLOAD = `${HOME}/.zb`;
const TEMP = exports.TEMP = _os2.default.tmpdir();
const UA = exports.UA = "xxx";

// RC配置下载(模板)的地方
// 给github的api来用的
const DEFAULTS = exports.DEFAULTS = {
  registry: "zhufeng-cli",
  type: "orgs" // ['orgs', 'users']
};

const INTERFACE_ASK = exports.INTERFACE_ASK = "interfaces/ask.js";
const COMPILE_TEMP = exports.COMPILE_TEMP = `${TEMP}/zb-cli_compile`;