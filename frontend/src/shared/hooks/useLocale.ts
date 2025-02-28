import { useContext } from "react";

import { LocaleContext } from "@/app/LocaleProvider";

export function useLocale() {
  const context = useContext(LocaleContext);
  const isLoading = context.messages.id !== context.pathname;
  const isError = context.messages.id === "json-network-error";

  const retryHandler = () => {
    context.loadMessages(context.locale);
  };

  return { ...context, isLoading, isError, retryHandler };
}
