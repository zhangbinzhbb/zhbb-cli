"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _swigTemplates = require("swig-templates");

var _swigTemplates2 = _interopRequireDefault(_swigTemplates);

var _fs = require("mz/fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function compile(file, data) {
  return _swigTemplates2.default.compileFile(file)(data);
}
/**
 * build src src/index src/xxx
 * @param {*} src
 * @param {*} data
 */
const apply = (() => {
  var _ref = _asyncToGenerator(function* (src, data) {
    yield (() => {
      var _ref2 = _asyncToGenerator(function* (dir) {
        const files = yield (0, _fs.readdir)(dir);
        console.log(" ");
        // 把内容给改了
        files.forEach((() => {
          var _ref3 = _asyncToGenerator(function* (file) {
            const path = `${dir}/${file}`;
            const stats = (0, _fs.statSync)(path);
            if (stats.isDirectory()) {
              yield _readDirs(path);
            } else {
              try {
                const renderedContent = compile(path, data);
                yield (0, _fs.writeFile)(path, renderedContent);
              } catch (e) {
                console.log(e);
              }
            }
          });

          return function (_x4) {
            return _ref3.apply(this, arguments);
          };
        })());
      });

      function _readDirs(_x3) {
        return _ref2.apply(this, arguments);
      }

      return _readDirs;
    })()(src);
  });

  return function apply(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = apply;