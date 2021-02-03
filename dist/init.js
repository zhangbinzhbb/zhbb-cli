"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

var _path = require("path");

var _fs = require("mz/fs");

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _common = require("./utils/common");

var _constants = require("./utils/constants");

var _render = require("./helper/render");

var _render2 = _interopRequireDefault(_render);

var _ask = require("./helper/ask");

var _ask2 = _interopRequireDefault(_ask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable function-paren-newline */


/**
 * 下载到本地仓库
 * 本地仓库的配置文件
 */
const apply = (() => {
  var _ref = _asyncToGenerator(function* () {
    const has = yield (0, _fs.exists)(_constants.DOWNLOAD);
    if (!has) {
      console.warn(`${_constants.DOWNLOAD} is not existed. Please install a scaffold by \`zb-cli install\``);
      process.exit(0);
    }
    let loading;
    let answers;

    loading = (0, _ora2.default)("listing the scaffolds");
    loading.start();
    let list = yield (0, _fs.readdir)(_constants.DOWNLOAD);
    loading.succeed("listed the scaffolds");

    list = list.filter(function (name) {
      return !name.startsWith(".");
    });

    answers = yield _inquirer2.default.prompt([{
      type: "list",
      message: "which project do you want to generate it?",
      name: "project",
      choices: list // 选择模式
    }]);

    const project = answers.project;

    // 输入用户信息: 项目名称
    let askMaker;

    try {
      askMaker = (0, _common.betterRequire)(`${_constants.DOWNLOAD}/${project}/${_constants.INTERFACE_ASK}`);
    } catch (e) {
      askMaker = _ask2.default;
    }
    if (typeof askMaker === "function") {
      askMaker = askMaker();
    }
    answers = yield _inquirer2.default.prompt(askMaker);

    // 从已经下载的模板，copy一份，同时改名
    loading = (0, _ora2.default)(`generating ${project}`);
    loading.start();

    // 模板引擎语法  --> 获取所有的文件 ---> 批量进行 render ---> 替换现有的文件 ---> 生成的操作
    // 需要一个中间目录去做模板渲染的操作
    yield (0, _common.copy)(`${_constants.DOWNLOAD}/${project}`, `${(0, _path.resolve)(process.cwd(), answers.name)}`);
    yield (0, _render2.default)(`${(0, _path.resolve)(process.cwd(), answers.name)}`, answers);
    loading.succeed(`generated ${project}`);
  });

  return function apply() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = apply;