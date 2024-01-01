import "server-only";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  "hi-IN": () =>
    import("@/dictionaries/hi-IN.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
