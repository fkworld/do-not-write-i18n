# do-not-write-i18n

对部分项目而言，i18n 的需求是很简单的，中文配置 + 英文配置 + 取值函数。

为了这一简单的需求，开发者需要承担很多不必要的心智成本：

1. 起名。给每个配置起名一个 key。
2. 划分。给每个配置划分到一个文件中。
3. 复制粘贴。把每个配置的 key 复制粘贴至少 3 遍：中文配置一遍，英文配置一遍，调用处一遍。

为了减少心智成本，优化成以下规则：

1. 不起名。直接拿中文 or 英文作为 key。
2. 不划分。直接用一个文件存放所有的 key。
3. 不复制粘贴。提供一些简单的命令实现自动化。

## 实现原理

主要实现了一个 key-value 查询函数。

查询优先级为：

1. 当前语言 value。
2. 默认语言 value。
3. key。

## API

```ts
function init<TKey extends string>(options: {
  defaultLanguage: "en" | "zh";
  languageLocalStorageKey: string;
  languageConfig: Record<TKey, { en?: string; zh?: string }>;
}): {
  getLanguage(): "en" | "zh";
  setLanguage(newLanguage: "en" | "zh"): void;
  t(key: TKey, params?: Record<string, any>): string;
};
```
