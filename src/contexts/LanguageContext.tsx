import { createContext, useEffect, useState, ReactNode } from "react";
import { translations, type Lang, type Translation } from "@/i18n/translations";

export type LanguageCtx = { lang: Lang; setLang: (l: Lang) => void; t: Translation };

export const LanguageContext = createContext<LanguageCtx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    return saved && ["uz", "ru", "en"].includes(saved) ? saved : "uz";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const t = translations[lang] as Translation;

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};