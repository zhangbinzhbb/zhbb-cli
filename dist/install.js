"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _git = require("./utils/git");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // 进度条
// 命令交互
// 下载模板 选择模板使用
// 用过配置文件 获取模板信息(有哪些模板)


/**
 * 下载到本地仓库
 * 本地仓库的配置文件
 */
const apply = (() => {
  var _ref = _asyncToGenerator(function* () {
    let list;
    let loading;
    let choices;
    let answers;

    loading = (0, _ora2.default)("fetching repo list");
    loading.start();
    list = yield (0, _git.repoList)();

    loading.succeed("fetched repo list");

    choices = list.map(function ({ name }) {
      return name;
    });

    answers = yield _inquirer2.default.prompt([{
      type: "list",
      name: "project",
      message: "which project do you want to install?",
      choices
    }]);

    const project = answers.project;

    // 获取tag列表
    loading = (0, _ora2.default)(`fetching ${project} tag list`);
    loading.start();
    list = yield (0, _git.tagList)(project);
    loading.succeed(`fetched ${project} tag list`);
    // 如果有tag就选择列表
    if (list.length) {
      choices = list.map(function ({ name }) {
        return name;
      });
      answers = yield _inquirer2.default.prompt([{
        type: "list",
        name: "version",
        message: "which version do you want to install?",
        choices
      }]);

      // 如果没有tag，version就为空，表示采用默认分支下载
    } else {
      answers = { version: "" };
    }
    // 下载文件(先下载到缓存区文件中)
    // zb-cli-cli init
    // 下载中...
    loading = (0, _ora2.default)(`downloading ${project}`);
    loading.start();
    yield (0, _git.downloadLocal)(project, answers.version);
    loading.succeed(`downloaded ${project}`); // 结束loading
  });

  return function apply() {
    return _ref.apply(this, arguments);
  };
})();

exports.default = apply;