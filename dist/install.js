"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _git = require("./utils/git");

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var install = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var loading, list, answer, project, tag;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            loading = (0, _ora2.default)("fetching template ...");

            loading.start();
            _context.next = 4;
            return (0, _git.repoList)();

          case 4:
            list = _context.sent;

            // console.log('list', list);
            loading.succeed();
            list = list.map(function (_ref2) {
              var name = _ref2.name;
              return name;
            });
            _context.next = 9;
            return _inquirer2.default.prompt([{
              type: "list",
              name: "project",
              choices: list,
              questions: "please choose a template"
            }]);

          case 9:
            answer = _context.sent;
            project = answer.project;


            loading = (0, _ora2.default)("fetching tag ...");
            loading.start();
            _context.next = 15;
            return (0, _git.tagList)(project);

          case 15:
            list = _context.sent;

            loading.succeed();
            list = list.map(function (_ref3) {
              var name = _ref3.name;
              return name;
            });
            _context.next = 20;
            return _inquirer2.default.prompt([{
              type: "list",
              name: "tag",
              choices: list,
              questions: "please choose a tag"
            }]);

          case 20:
            answer = _context.sent;
            tag = answer.tag;

            console.log(project, tag);

            loading = (0, _ora2.default)("download project ...");
            loading.start();
            _context.next = 27;
            return (0, _git.downloadLocal)(project, tag);

          case 27:
            loading.succeed();

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function install() {
    return _ref.apply(this, arguments);
  };
}();

exports.default = install;