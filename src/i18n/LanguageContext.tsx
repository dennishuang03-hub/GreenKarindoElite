import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, type Lang, type Translation } from "./translations";

const STORAGE_KEY = "gke-lang";
const DEFAULT_LANG: Lang = "id";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

function getInitialLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "en" || saved === "id" ? saved : DEFAULT_LANG;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  // Persist choice and keep the <html lang> attribute in sync.
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => setLangState(next);

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: translations[lang],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Convenience hook used throughout the app. It ships beside the
// provider on purpose — splitting it into its own module would only
// satisfy the fast-refresh rule, at the cost of a second import
// everywhere the context is used.
// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return ctx;
}
