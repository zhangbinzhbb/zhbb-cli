//下载模板 选择模板使用
//用过配置文件 获取模板信息(有哪些模板)
import ora from "ora"; //进度条
import inquirer from "inquirer"; //命令交互
import { repoList, tagList, downloadLocal } from "./utils/git";

/**
 * 下载到本地仓库
 * 本地仓库的配置文件
 */
const apply = async () => {
  let list, loading, choices, answers;

  loading = ora("fetching repo list");
  loading.start();
  list = await repoList();

  loading.succeed("fetched repo list");

  choices = list.map(({ name }) => name);

  answers = await inquirer.prompt([
    {
      type: "list",
      name: "project",
      message: "which project do you want to install?",
      choices,
    },
  ]);

  const project = answers.project;

  // 获取tag列表
  loading = ora(`fetching ${project} tag list`);
  loading.start();
  list = await tagList(project);
  loading.succeed(`fetched ${project} tag list`);
  // 如果有tag就选择列表
  if (list.length) {
    choices = list.map(({ name }) => name);
    answers = await inquirer.prompt([
      {
        type: "list",
        name: "version",
        message: "which version do you want to install?",
        choices,
      },
    ]);

    // 如果没有tag，version就为空，表示采用默认分支下载
  } else {
    answers = { version: "" };
  }
  // 下载文件(先下载到缓存区文件中)
  // zb-cli init
  // 下载中...
  loading = ora(`downloading ${project}`);
  loading.start();
  await downloadLocal(project, answers.version);
  loading.succeed(`downloaded ${project}`); // 结束loading
};

export default apply;
