"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _common = require("./utils/common");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // 命令行的命令名称拿到后  这个是主流程控制的地方

// 动态加载文件
// 中间模块协调
/**
 *
 * @param {*} action install操作
 * @param {*} args  传入的参数
 */
const apply = (() => {
  var _ref = _asyncToGenerator(function* (action, ...args) {
    try {
      yield (0, _common.betterRequire)((0, _path.resolve)(__dirname, `./${action}.js`))(...args); // 默认导出
    } catch (e) {
      console.log(e);
    }
  });

  return function apply(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = apply;