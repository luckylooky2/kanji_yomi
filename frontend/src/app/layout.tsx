import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies, headers } from "next/headers";
import React from "react";
import { Slide, ToastContainer } from "react-toastify";

import ReactQueryProviders from "@/ReactQueryProviders";
import { verifyCookie } from "@/shared/lib";
import { knownRoutes } from "@/shared/model";

import "../../public/styles/globals.css";

import { LocaleProvider } from "./LocaleProvider";

const openSans = localFont({
  src: "../../public/fonts/Open_Sans_Regular.ttf",
  variable: "--font-open-sans",
  weight: "100 900",
});

const openSansBold = localFont({
  src: "../../public/fonts/Open_Sans_Bold.ttf",
  variable: "--font-open-sans-bold",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kanji Yomi: Japanese Kanji Quiz",
  description: "Improve your Japanese with our kanji reading quiz",
  openGraph: {
    title: "Kanji Yomi: Japanese Kanji Quiz",
    description: "Improve your Japanese with our kanji reading quiz",
    url: process.env.NEXT_PUBLIC_FRONTEND_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/og_image.png`,
        width: 1200,
        height: 630,
        alt: "Kanji Yomi Open Graph Image",
      },
    ],
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SSR을 위한 로직: async 함수를 사용해야 하기 때문에 여기서 messages를 만들어야 한다.
  const headersList = headers();
  const pathname = (headersList.get("x-pathname") || "/").slice(1) || "landing";
  const localeCookie = cookies().get("NEXT_LOCALE")?.value;
  const locale = verifyCookie(localeCookie);
  let messages: Record<string, string> = {};

  if (!knownRoutes.includes(pathname)) {
    // 없는 경로일 경우, json 파일을 찾지 않는다.
    messages["id"] = "pathname-not-found";
  } else {
    try {
      messages = (await import(`../../messages/${pathname}/${locale}.json`))
        .default;
    } catch {
      // json 파일을 찾지 못했을 경우 || 네트워크 에러가 발생했을 경우, isError를 true로 설정한다.
      messages["id"] = "json-network-error";
    }
  }

  return (
    <html lang={locale}>
      <body className={`${openSans.variable} ${openSansBold.variable}`}>
        <LocaleProvider locale={locale} messages={messages}>
          <AppRouterCacheProvider>
            <ReactQueryProviders>
              <Analytics />
              <ToastContainer
                position="top-right"
                theme="colored"
                transition={Slide}
                autoClose={3000}
                closeOnClick={true}
              />
              {children}
            </ReactQueryProviders>
          </AppRouterCacheProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
