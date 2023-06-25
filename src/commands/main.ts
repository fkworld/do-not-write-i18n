#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { program } from "commander";

import { sortJson } from "./sort-json.js";

program.version(getVersion());

program
  .command("sort-json")
  .description("JSON 文件排序")
  .argument("<json-file-path>", "待排序 JSON 文件路径")
  .action((file) => sortJson(file));

program.parse(process.argv);

function getVersion() {
  const rootPath = resolve(fileURLToPath(import.meta.url), "../../../");
  const packageJsonPath = resolve(rootPath, "package.json");
  const packageJsonString = readFileSync(packageJsonPath, "utf-8");
  const packageJsonObj = JSON.parse(packageJsonString);
  return packageJsonObj.version;
}
