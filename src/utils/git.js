import request from "request";
import downloadGit from "download-git-repo";
import { getAll } from "./rc";
import { UA, DOWNLOAD } from "./constants";

export const fetch = async (url) => {
  const opts = {
    url,
    method: "GET",
    headers: {
      "User-Agent": UA,
    },
  };
  return new Promise((resolve, reject) => {
    request(opts, (err, response, body) => {
      if (err) {
        reject(err);
        return;
      }
      const data = JSON.parse(body);
      resolve(data);
    });
  });
};

/**
 *
 * @param {*} src flipxfx/download-git-repo  username/repo
 * @param {*} dest 目录
 */
export const download = (src, dest) =>
  new Promise((resolve, reject) => {
    downloadGit(src, dest, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });

// 下载到本地
export const downloadLocal = async (repo, version) => {
  // https://github.com/flipxfx/download-git-repo
  const conf = await getAll();
  let api = `${conf.registry}/${repo}`;
  if (version) {
    api += `#${version}`;
  }
  await download(api, `${DOWNLOAD}/${repo}`);
  return true;
};

// 链接地址：https://api.github.com/orgs/zhufeng-cli/repos 项目
export const repoList = async () => {
  const conf = await getAll();
  const api = `https://api.github.com/${conf.type}/${conf.registry}/repos`;
  return await fetch(api);
};

// 链接地址：https://api.github.com/repos/zhufeng-cli/vue-template/tags 版本
export const tagList = async (repo) => {
  const conf = await getAll();
  const api = `https://api.github.com/repos/${conf.registry}/${repo}/tags`;
  return await fetch(api);
};
