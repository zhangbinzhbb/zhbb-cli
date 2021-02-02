# zb-cli

#### 介绍

前端开发 CLI 工具

#### 安装教程

1. xxxx
2. xxxx
3. xxxx

#### 使用说明

1. zb -v 查看版本
2. xxxx
3. xxxx

## 将包变成全局的

- 先创建可执行的脚本 #!/usr/bin/env node
- 配置 package.json 中的 bin 字段
- npm link 链接到本地环境（默认以 name 为基准）

> link 相当于将当前本地模块链接到 npm 目录下，这个 npm 目录可以直接访问，所以当前包就可以直接访问

## 思路

- 1、配置可执行命令 commander
- 2、我们要实现 脚手架 先做一个命令行交互的功能 inquier
- 3、将模板下载下来 download-git-preo
- 4、根据用户的选择动态的生成内容 metalsmith
