"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _fs = require("mz/fs");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // const fakeDefault = {
//   name       : 'xx',
//   description: 'xx',
//   private    : false,
//   license    : 'MIT',
//   username   : 'xx',
//   email      : 'xx',
//   github     : 'jiangtao/blog'
// };

const askCreator = () => [{
  type: "input",
  message: "your project name",
  name: "name",
  validate(input) {
    var _this = this;

    return _asyncToGenerator(function* () {
      // 1. 验证输入是否为空
      // 2. 验证当前运行目录+输入，形成的新文件是不是已存在
      const next = _this.async();
      if (input.length === 0) {
        next("your project name is empty. Please input");
        return;
      }
      const fullPath = (0, _path.resolve)(process.cwd(), input);
      const isExist = yield (0, _fs.exists)(fullPath);
      if (isExist) {
        next(`${fullPath} is existed. Please change the input name`);
        return;
      }
      next(null, true);
    })();
  }
}, {
  type: "input",
  message: "description",
  name: "description"
}];

exports.default = askCreator;