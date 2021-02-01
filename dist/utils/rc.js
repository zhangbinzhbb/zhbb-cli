"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = exports.get = exports.remove = exports.set = undefined;

var _fs = require("mz/fs");

var _ini = require("ini");

var _constants = require("./constants");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } //格式分析和序列化


//RC是配置文件 DEFAULT是默认配置
//promisify：异步函数promise化

// 文件操作： fs， path， 我们用的await/async, promise封装 ==> mz
// 使用mz 代替  promisify
// rc格式是ini

/**
 * 如果没有，就写一个，且内容是默认值
 * 如果有，则返回false
 */
const createRc = (() => {
  var _ref = _asyncToGenerator(function* () {
    const has = yield (0, _fs.exists)(_constants.RC);
    if (!has) {
      yield (0, _fs.writeFile)(_constants.RC, (0, _ini.encode)(_constants.DEFAULTS), "utf-8");
      return true;
    }
    return false;
  });

  return function createRc() {
    return _ref.apply(this, arguments);
  };
})();

const set = exports.set = (() => {
  var _ref2 = _asyncToGenerator(function* (k, v) {
    const r = yield createRc();
    let opts;
    // 初次创建，且已经有了

    if (r) {
      opts = Object.assign({}, _constants.DEFAULTS, { [k]: v });
      opts = (0, _ini.encode)(opts);

      yield (0, _fs.writeFile)(_constants.RC, opts, "utf-8");
      // 如果已经有了，就增加并直接覆盖
    } else {
      opts = yield (0, _fs.readFile)(_constants.RC, { encoding: "utf-8" });
      opts = (0, _ini.decode)(opts);
      opts = Object.assign({}, _constants.DEFAULTS, { [k]: v });
      yield (0, _fs.writeFile)(_constants.RC, (0, _ini.encode)(opts), "utf-8");
    }
  });

  return function set(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
})();

const remove = exports.remove = (() => {
  var _ref3 = _asyncToGenerator(function* (k) {
    yield createRc();
    let opts;
    // 初次创建，且已经有了

    opts = yield (0, _fs.readFile)(_constants.RC, { encoding: "utf-8" });
    opts = (0, _ini.decode)(opts);
    delete opts[k];
    yield (0, _fs.writeFile)(_constants.RC, (0, _ini.encode)(opts), "utf-8");
  });

  return function remove(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

const get = exports.get = (() => {
  var _ref4 = _asyncToGenerator(function* (k) {
    const r = yield createRc();
    let opts;
    if (r) {
      return _constants.DEFAULTS[k] || "";
    }

    opts = yield (0, _fs.readFile)(_constants.RC, { encoding: "utf-8" });
    opts = (0, _ini.decode)(opts);

    return opts[k] || "";
  });

  return function get(_x4) {
    return _ref4.apply(this, arguments);
  };
})();

const getAll = exports.getAll = (() => {
  var _ref5 = _asyncToGenerator(function* () {
    let opts;
    opts = yield (0, _fs.readFile)(_constants.RC, { encoding: "utf-8" });
    opts = (0, _ini.decode)(opts);
    return opts;
  });

  return function getAll() {
    return _ref5.apply(this, arguments);
  };
})();