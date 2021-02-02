import { betterRequire } from "./utils/common";
import { resolve } from "path";
let apply = (action, ...args) => {
  betterRequire(resolve(__dirname, `./${action}`))(...args);
};
export default apply;
