"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = exports.betterRequire = undefined;

var _ncp = require("ncp");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 为什么不用相对路径
 * 深目录下使用betterRequire，路径错了
 * @param {*} absolutePath 绝对路径
 */
const betterRequire = exports.betterRequire = absolutePath => {
  const module = require(absolutePath);
  if (module.default) {
    return module.default;
  }
  return module;
};

const copy = exports.copy = (() => {
  var _ref = _asyncToGenerator(function* (src, dest) {
    return new Promise(function (resolve, reject) {
      (0, _ncp.ncp)(src, dest, function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  });

  return function copy(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();