import { requiredOption } from "commander";

export const betterRequire = (absPath) => {
  let module = require(absPath);
  if (module.default) {
    return module.default;
  }
  return module;
};
