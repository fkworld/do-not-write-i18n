/**
 * 创建 do-not-write-i18n 对象
 */
export function createDoNotWriteI18n<
  TLanguage extends string,
  TKey extends string,
>(options: {
  /**
   * 支持的语言列表
   */
  languages: TLanguage[];
  /**
   * 默认语言
   */
  defaultLanguage: TLanguage;
  /**
   * 语言对应的文本
   */
  messages: Record<TKey, { [key in TLanguage]?: string }>;
  /**
   * 语言存储的 localStorage key；如果为空，则不存储在 localStorage 中
   */
  localStorageKey?: string;
}): {
  getLanguage(): TLanguage;
  setLanguage(newLanguage: TLanguage): void;
  /**
   * 根据 key 和 params 返回 messages 中对应的文本
   * - t 是 text 的缩写
   *
   * @example
   * ```ts
   * // params 示例
   * t("hello {name}",{name:"张三"}) // "hello 张三"
   * ```
   */
  t(key: TKey, params?: Record<string, string>): string;
} {
  const { languages, defaultLanguage, localStorageKey, messages } = options;

  let language = getInitialLanguage();

  function getInitialLanguage() {
    if (!localStorageKey) {
      return defaultLanguage;
    }

    const localLanguage = localStorage.getItem(localStorageKey);
    if (!localLanguage) {
      return defaultLanguage;
    }
    if (!checkLanguage(localLanguage)) {
      console.warn(
        `[DO-NOT-WRITE-I18N]: ${getInitialLanguage.name}: localStorage language is not supported, localStorage=${localStorageKey}`,
      );
      return defaultLanguage;
    }

    return localLanguage;
  }

  function checkLanguage(
    newLanguage: string | undefined | null,
  ): newLanguage is TLanguage {
    return languages.includes(newLanguage as TLanguage);
  }

  function getLanguage() {
    return language;
  }

  function setLanguage(newLanguage: TLanguage) {
    if (!checkLanguage(newLanguage)) {
      console.error(
        `[DO-NOT-WRITE-I18N]: language ${newLanguage} is not supported, newLanguage=${newLanguage}`,
      );
      throw new Error(
        `[DO-NOT-WRITE-I18N]: language ${newLanguage} is not supported, newLanguage=${newLanguage}`,
      );
    }

    language = newLanguage;
    localStorageKey && localStorage.setItem(localStorageKey, newLanguage);
  }

  function t(key: TKey, params?: Record<string, string>) {
    const language = getLanguage();
    const text =
      messages[key]?.[language] ?? messages[key]?.[defaultLanguage] ?? key;

    return params ? text.replace(/{(\w+)}/g, (_, k) => params[k]) : text;
  }

  return { getLanguage, setLanguage, t };
}
