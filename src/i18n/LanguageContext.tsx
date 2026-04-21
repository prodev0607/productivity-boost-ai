import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "./translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("btech_lang");
    return (saved === "fr" ? "fr" : "en") as Lang;
  });

  const updateLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("btech_lang", newLang);
  };

  const toggle = () => updateLang(lang === "en" ? "fr" : "en");

  return (
    <LanguageContext.Provider value={{ lang, setLang: updateLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};
