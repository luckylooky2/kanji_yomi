import { Metadata } from "next";
import React from "react";

import Header from "@/features/header/components/Header";

import pkg from "../../../package.json";

export const metadata: Metadata = {
  title: "Quiz - Kanji Yomi",
  description: "Choose your options and start the Kanji quiz.",
  openGraph: {
    title: "Quiz - Kanji Yomi",
    description: "Choose your options and start the Kanji quiz.",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/quiz`,
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

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currVersion = `v${pkg.version}`;
  const url = `https://github.com/luckylooky2/kanji_yomi/releases/tag/${currVersion}`;

  return (
    <>
      <Header />
      <div className="margin-container">
        <div className="content-box">{children}</div>
      </div>
      <footer>
        <div>
          <a className="footer-item" href="mailto:dev.chanhyung@gmail.com">
            <i>Contact</i>
          </a>
          <span> | </span>
          <a
            className="footer-item"
            href="https://github.com/luckylooky2/kanji_yomi/issues/new/choose"
            target="_blank"
          >
            <i>Suggestion</i>
          </a>
          <span> | </span>
          <a className="footer-item" href={url} target="_blank">
            <i>{currVersion}</i>
          </a>
        </div>
      </footer>
    </>
  );
}
