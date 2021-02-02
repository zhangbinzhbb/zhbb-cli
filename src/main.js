import { program } from "commander";
import { VERSION } from "./utils/constants";
import main from "./index";
let actionMap = {
  install: {
    alias: "i",
    description: "install template",
    examples: ["zb-cli i", "zb-cli install"],
  },
  config: {
    alias: "c",
    description: "config .zbclirc",
    examples: [
      "zb-cli config set <k> <v>",
      "zb-cli config get <k>",
      "zb-cli config remove <k>",
    ],
  },
  "*": {
    alias: "",
    description: "not found",
    examples: [],
  },
};

Object.keys(actionMap).forEach((action) => {
  program
    .command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
      // console.log('action', action);
      if (action === "config") {
        main(action, ...process.argv.slice(3));
      } else if (action === "install") {
        main(action);
      }
    });
});

function help() {
  console.log("\r\n  " + "how to use command");
  Object.keys(actionMap).forEach((action) => {
    actionMap[action].examples.forEach((example) => {
      console.log("  - " + example);
    });
  });
}

program.on("-h", help);
program.on("--help", help);
program.version(VERSION, "-v --version").parse(process.argv);
