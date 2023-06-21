type Language = "en" | "zh";

export function init<TKey extends string>(options: {
  defaultLanguage: Language;
  languageLocalStorageKey: string;
  languageConfig: Record<TKey, { en?: string; zh?: string }>;
}): {
  getLanguage(): Language;
  setLanguage(newLanguage: Language): void;
  t(key: TKey, params?: Record<string, unknown>): string;
} {
  const { defaultLanguage, languageLocalStorageKey, languageConfig } = options;

  let language: Language =
    (localStorage.getItem(languageLocalStorageKey) as Language) ??
    defaultLanguage;

  function getLanguage() {
    return language;
  }

  function setLanguage(newLanguage: Language) {
    language = newLanguage;
    localStorage.setItem(languageLocalStorageKey, newLanguage);
  }

  function t(key: TKey, params?: Record<string, any>) {
    const language = getLanguage();
    const text =
      languageConfig[key]?.[language] ??
      languageConfig[key]?.[defaultLanguage] ??
      key;
    return params ? text.replace(/{(\w+)}/g, (_, k) => params[k]) : text;
  }

  return { getLanguage, setLanguage, t };
}
