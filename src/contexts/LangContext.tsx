"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Lang, t } from "@/lib/translations";

type Tr = (typeof t)[Lang];

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: Tr;
};

const LangContext = createContext<LangContextType>({
  lang: "ja",
  setLang: () => {},
  tr: t.ja,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ja");

  const handleSetLang = (l: Lang) => {
    setLang(l);
    document.documentElement.lang = l;
  };

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, tr: t[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
