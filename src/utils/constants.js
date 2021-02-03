// 存储开发中本地的常用变量
import os from "os";
import { name, version } from "../../package.json";

// 本机的home目录
// 找到用户的根目录
const HOME = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];
// console.log(process.platform)//win32  node运行的操作系统的环境时显示内核相关的信息
// process.env.USERPROFILE  //当前目录下配置的文件

export const VERSION = version;
// zbclirc
export const RC = `${HOME}/.zbclirc`;
// 下载目录
export const DOWNLOAD = `${HOME}/.zb`;
export const TEMP = os.tmpdir();
export const UA = "xxx";

// RC配置下载(模板)的地方
// 给github的api来用的
export const DEFAULTS = {
  registry: "zhufeng-cli",
  type: "orgs", // ['orgs', 'users']
};

export const INTERFACE_ASK = "interfaces/ask.js";
export const COMPILE_TEMP = `${TEMP}/zb-cli_compile`;
