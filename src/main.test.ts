import { createDoNotWriteI18n } from "src/main.js";
import { describe, expect, it } from "vitest";

describe("do-not-write-i18n", () => {
  const { getLanguage, setLanguage, t } = createDoNotWriteI18n({
    languages: ["en", "zh"],
    defaultLanguage: "en",
    messages: {
      hello: {},
      "hello world": { zh: "你好，世界" },
      "hello {name}": { zh: "你好，{name}" },
    },
    localStorageKey: "language",
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

    it("should throw error when language is not supported", () => {
      setLanguage("zh");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      expect(() => setLanguage("jp")).toThrowError();
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
