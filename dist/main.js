"use strict";

var _commander = require("commander");

var _constants = require("./utils/constants");

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var actionMap = {
  install: {
    alias: "i",
    description: "install template",
    examples: ["bb-cli i", "bb-cli install"]
  },
  config: {
    alias: "c",
    description: "config .bbclirc",
    examples: ["bb-cli config set <k> <v>", "bb-cli config get <k>", "bb-cli config remove <k>"]
  },
  "*": {
    alias: "",
    description: "not found",
    examples: []
  }
};

Object.keys(actionMap).forEach(function (action) {
  _commander.program.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(function () {
    // console.log('action', action);
    if (action === "config") {
      _index2.default.apply(undefined, [action].concat(_toConsumableArray(process.argv.slice(3))));
    } else if (action === "install") {
      (0, _index2.default)(action);
    }
  });
});

function help() {
  console.log("\r\n  " + "how to use command");
  Object.keys(actionMap).forEach(function (action) {
    actionMap[action].examples.forEach(function (example) {
      console.log("  - " + example);
    });
  });
}

_commander.program.on("-h", help);
_commander.program.on("--help", help);
_commander.program.version(_constants.VERSION, "-v --version").parse(process.argv);