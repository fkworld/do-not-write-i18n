import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import chalk from "chalk";

export function sortJson(file: string): void {
  const filePath = resolve(process.cwd(), file);
  const jsonString = readFileSync(filePath, "utf-8");
  const jsonObj = JSON.parse(jsonString);
  const sortedJsonObj = sortJsonObj(jsonObj);
  writeFileSync(filePath, JSON.stringify(sortedJsonObj, null, 2));
  console.log(chalk.green("JSON 文件排序成功！"));
}

export function sortJsonObj(
  jsonObj: Record<string, unknown>,
): Record<string, unknown> {
  const sortedJsonObj: Record<string, unknown> = {};
  Object.keys(jsonObj)
    .sort()
    .forEach((key) => {
      sortedJsonObj[key] = jsonObj[key];
    });
  return sortedJsonObj;
}
