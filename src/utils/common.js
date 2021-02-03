import { ncp } from "ncp";

/**
 * 为什么不用相对路径
 * 深目录下使用betterRequire，路径错了
 * 两种引入方式
 * @param {*} absolutePath 绝对路径
 */
export const betterRequire = (absolutePath) => {
  // eslint-disable-next-line global-require
  const module = require(absolutePath);
  if (module.default) {
    return module.default;
  }
  return module;
};

export const copy = async (src, dest) =>
  new Promise((resolve, reject) => {
    ncp(src, dest, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
