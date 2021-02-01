// 命令行的命令名称拿到后  这个是主流程控制的地方

import { resolve } from "path";
import { betterRequire } from "./utils/common"; // 动态加载文件
// 中间模块协调
/**
 *
 * @param {*} action install操作
 * @param {*} args  传入的参数
 */
const apply = async (action, ...args) => {
  try {
    await betterRequire(resolve(__dirname, `./${action}.js`))(...args); // 默认导出
  } catch (e) {
    console.log(e);
  }
};

export default apply;
