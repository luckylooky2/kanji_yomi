"use client";

import { usePathname } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { settingLangauageType } from "@/entities/setting/types";

const LocaleContext = createContext({
  locale: "en" as settingLangauageType,
  messages: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLocale: (locale: settingLangauageType) => {},
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

  // 아직 pathname에 맞는 message가 변경되지 않은 상태에서 t 함수를 호출하고 프로퍼티가 없는 경우 에러가 발생한다.
  // - 한 파일로 관리한다?

  useEffect(() => {
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

export function useLocale() {
  return useContext(LocaleContext);
}
