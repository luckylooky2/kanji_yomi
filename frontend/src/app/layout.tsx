import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";

import Header from "@/features/header/components/Header";
import GlobalModal from "@/features/modal/components/GlobalModal";

import pkg from "../../package.json";
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
  title: "Kanji Yomi",
  description: "Kanji-Hiragana matching quiz for Japanese reading skills.",
  openGraph: {
    title: "Kanji Yomi - 漢字読み",
    description: "Kanji-Hiragana matching quiz for Japanese reading skills.",
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
  const currVersion = `v${pkg.version}`;
  const url = `https://github.com/luckylooky2/kanji_yomi/releases/tag/${currVersion}`;
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${openSansBold.variable}`}>
        <GlobalModal>
          <div>Global Modal</div>
        </GlobalModal>
        <Header />
        <div className="margin-container">
          <div className="content-box">{children}</div>
        </div>
        <footer>
          <div>
            <a className="footer-item" href="mailto:dev.chanhyung@gmail.com">
              <i>Contact & Support</i>
            </a>
            <span> | </span>
            <a className="footer-item" href={url} target="_blank">
              <i>{currVersion}</i>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
