import { useContext } from "react";

import { LocaleContext } from "@/app/LocaleProvider";

export function useLocale() {
  const context = useContext(LocaleContext);
  const isLoading = context.messages.id !== context.pathname;

  return { ...context, isLoading };
}
