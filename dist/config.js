"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rc = require("./utils/rc");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 下载到本地仓库
 * 本地仓库的配置文件
 */
const apply = (() => {
  var _ref = _asyncToGenerator(function* (action, k, v) {
    let r;
    switch (action) {
      case "set":
        yield (0, _rc.set)(k, v);
        break;
      case "remove":
        yield (0, _rc.remove)(k);
        break;
      // 默认为读
      default:
        // 如果没有k就获取所有的，有就返回当k的值
        if (!k) {
          r = yield (0, _rc.getAll)();
          Object.keys(r).forEach(function (key) {
            console.log(`${key}=${r[key]}`);
          });
        } else {
          r = yield (0, _rc.get)(k);
          console.log(r);
        }
    }
  });

  return function apply(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = apply;