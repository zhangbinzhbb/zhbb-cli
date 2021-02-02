import { version } from "../../package.json";

const HOME = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];

// console.log('HOME', HOME); // '/Users/lubeibei'

export const VERSION = version;

export const RC = `${HOME}/.bbclirc`;

export const DEFAULTS = {
  registry: "zhufeng-cli",
  type: "orgs",
};

export const DOWNLOAD = `${HOME}/.template`;
