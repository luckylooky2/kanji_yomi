"use client";

import { usePathname } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { createContext, useState, useEffect, ReactNode, useRef } from "react";

import { settingLangauageType } from "@/entities/setting/types";

export const LocaleContext = createContext({
  locale: "en" as settingLangauageType,
  messages: {} as Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLocale: (locale: settingLangauageType) => {},
  pathname: "",
});

export function LocaleProvider({
  children,
  locale: staticLocale,
  messages: staticMessages,
}: {
  children: ReactNode;
  locale: settingLangauageType;
  messages: Record<string, string>;
}) {
  const [locale, setLocale] = useState<settingLangauageType>(staticLocale);
  const [messages, setMessages] = useState(staticMessages);
  const pathname = usePathname().slice(1) || "landing";
  const renderRef = useRef(false);

  useEffect(() => {
    // 첫 렌더링 시에는 실행하지 않음
    if (renderRef.current === false) {
      renderRef.current = true;
      return;
    }

    loadMessages(locale);
  }, [pathname]);

  const loadMessages = async (newLocale: settingLangauageType) => {
    const newMessages = (
      await import(`../../messages/${pathname}/${newLocale}.json`)
    ).default;
    setLocale(newLocale);
    setMessages(newMessages);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/;`;
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        messages,
        setLocale: loadMessages,
        pathname,
      }}
    >
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone="UTC"
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
