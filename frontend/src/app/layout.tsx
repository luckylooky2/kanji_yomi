import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";
import { Slide, ToastContainer } from "react-toastify";

import "../../public/styles/globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${openSansBold.variable}`}>
        <AppRouterCacheProvider>
          <Analytics />
          <ToastContainer
            position="top-right"
            theme="colored"
            transition={Slide}
            autoClose={3000}
            closeOnClick={true}
          />
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
