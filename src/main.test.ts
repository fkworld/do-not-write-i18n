import { init } from "src/main.js";
import { describe, expect, it } from "vitest";

describe("do-not-write-i18n", () => {
  const { getLanguage, setLanguage, t } = init({
    defaultLanguage: "en",
    languageLocalStorageKey: "language",
    languageConfig: {
      hello: {},
      "hello world": { zh: "你好，世界" },
      "hello {name}": { zh: "你好，{name}" },
    },
  });

  describe(getLanguage.name, () => {
    it("should return default language", () => {
      expect(getLanguage()).toBe("en");
    });
  });

  describe(setLanguage.name, () => {
    it("should set language", () => {
      setLanguage("zh");
      expect(getLanguage()).toBe("zh");
    });
  });

  describe(t.name, () => {
    it("should return default text", () => {
      expect(t("hello")).toBe("hello");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(t("hello2")).toBe("hello2");
    });

    it("should return zh text", () => {
      setLanguage("zh");
      expect(t("hello world")).toBe("你好，世界");
    });

    it("should return en text", () => {
      setLanguage("en");
      expect(t("hello world")).toBe("hello world");
    });

    it("should return zh text with params", () => {
      setLanguage("zh");
      expect(t("hello {name}", { name: "张三" })).toBe("你好，张三");
    });

    it("should return en text with params", () => {
      setLanguage("en");
      expect(t("hello {name}", { name: "张三" })).toBe("hello 张三");
    });
  });
});
