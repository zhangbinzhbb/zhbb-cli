"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

var _fs = require("mz/fs");

var _constants = require("./utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 把当前已经下载的模板名称和版本列出来
 */
const apply = (() => {
  var _ref = _asyncToGenerator(function* () {
    const has = yield (0, _fs.exists)(_constants.DOWNLOAD);
    if (!has) {
      console.warn(`${_constants.DOWNLOAD} is not existed. Please install a scaffold by \`zb-cli install\``);
      process.exit(0);
    }
    const loading = (0, _ora2.default)("listing the scaffolds");
    loading.start();
    let list = yield (0, _fs.readdir)(_constants.DOWNLOAD);
    loading.succeed("listed the scaffolds");

    list = list.filter(function (name) {
      return !name.startsWith(".");
    });

    console.log("");
    list.forEach(function (project) {
      // const { version } = require(`${DOWNLOAD}/${project}/package.json`);
      // TODO： 当有模板引擎的时候，package.json不再是一个规范的json
      console.log(`${project}`);
    });
  });

  return function apply() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = apply;