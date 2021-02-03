// 执行入口模块
/* eslint-disable */
import program from "commander"; // yargs
import { VERSION, RC } from "./utils/constants";
import main from "./index";
//多种功能命令
const actionMap = {
  install: {
    //配置命令的名字
    desc: "install remote templates from the remote store", //命令对应的描述
    alias: "i", //命令别的名称
    examples: ["zb-cli install", "zb-cli i"], //命令对应的模板
  },
  config: {
    desc: `set and get local config in ${RC}`,
    alias: "i",
    examples: [
      "zb-cli config set <k> <v>",
      "zb-cli config remove <k>",
      "zb-cli config get <k>",
    ],
  },
  init: {
    desc: "generate a new project from a template",
    alias: "g",
    examples: ["zb-cli init", "zb-cli g"],
  },
  list: {
    desc: "list the downloaded scaffolds",
    alias: "l",
    examples: ["zb-cli list", "zb-cli l"],
  },
  "*": {
    desc: "The command is not found",
    alias: null,
    examples: [],
  },
};

// 编写help命令
// 把example显示出去
function help() {
  console.log("      how to use:");
  Object.keys(actionMap).forEach((k) => {
    actionMap[k].examples.forEach((example) => {
      console.log("   -", example);
    });
  });
}

// yargs
function registerAction(type, commander, actions) {
  commander
    .command(type) // 命令的名称
    .description(actions[type].desc) // 命令的描述
    .alias(actions[type].alias) // 命令的别名
    .action(async () => {
      // 动作
      const args = process.argv.slice(3);
      // 判断一下当前用的是什么操作
      if (type === "config") {
        // 实现更改配置文件
        // console.log(process.argv)//数组
        await main(type, ...args);
      } else {
        await main(type);
      }
    });
  return commander;
}

// 循环创建命令
Object.keys(actionMap).reduce(
  (last, type) => registerAction(type, program, actionMap),
  program
);

program.on("-h", help);
program.on("--help", help);
program.version(VERSION, "-v --version").parse(process.argv); // process.argv就是用户在命令行中传入的参数
