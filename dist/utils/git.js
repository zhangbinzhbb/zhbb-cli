"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagList = exports.repoList = exports.downloadLocal = exports.download = exports.fetch = undefined;

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _downloadGitRepo = require("download-git-repo");

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _rc = require("./rc");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const fetch = exports.fetch = (() => {
  var _ref = _asyncToGenerator(function* (url) {
    const opts = {
      url,
      method: "GET",
      headers: {
        "User-Agent": _constants.UA
      }
    };
    return new Promise(function (resolve, reject) {
      (0, _request2.default)(opts, function (err, response, body) {
        if (err) {
          reject(err);
          return;
        }
        const data = JSON.parse(body);
        resolve(data);
      });
    });
  });

  return function fetch(_x) {
    return _ref.apply(this, arguments);
  };
})();

/**
 *
 * @param {*} src flipxfx/download-git-repo  username/repo
 * @param {*} dest 目录
 */
const download = exports.download = (src, dest) => new Promise((resolve, reject) => {
  (0, _downloadGitRepo2.default)(src, dest, err => {
    if (err) {
      reject(err);
      return;
    }
    resolve();
  });
});

// 下载到本地
const downloadLocal = exports.downloadLocal = (() => {
  var _ref2 = _asyncToGenerator(function* (repo, version) {
    // https://github.com/flipxfx/download-git-repo
    const conf = yield (0, _rc.getAll)();
    let api = `${conf.registry}/${repo}`;
    if (version) {
      api += `#${version}`;
    }
    yield download(api, `${_constants.DOWNLOAD}/${repo}`);
    return true;
  });

  return function downloadLocal(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})();

// 链接地址：https://api.github.com/orgs/zhufeng-cli/repos 项目
const repoList = exports.repoList = (() => {
  var _ref3 = _asyncToGenerator(function* () {
    const conf = yield (0, _rc.getAll)();
    const api = `https://api.github.com/${conf.type}/${conf.registry}/repos`;
    return yield fetch(api);
  });

  return function repoList() {
    return _ref3.apply(this, arguments);
  };
})();

// 链接地址：https://api.github.com/repos/zhufeng-cli/vue-template/tags 版本
const tagList = exports.tagList = (() => {
  var _ref4 = _asyncToGenerator(function* (repo) {
    const conf = yield (0, _rc.getAll)();
    const api = `https://api.github.com/repos/${conf.registry}/${repo}/tags`;
    return yield fetch(api);
  });

  return function tagList(_x4) {
    return _ref4.apply(this, arguments);
  };
})();