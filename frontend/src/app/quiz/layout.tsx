import { Metadata } from "next";
import React from "react";

import Header from "@/features/header/components/Header";

export const metadata: Metadata = {
  title: "Quiz - Kanji Yomi",
  description: "Choose your level and start the Kanji quiz.",
  openGraph: {
    title: "Quiz - Kanji Yomi",
    description: "Choose your level and start the Kanji quiz.",
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

interface Props {
  children: React.ReactNode;
}

export default function QuizLayout({ children }: Readonly<Props>) {
  return (
    <div className="margin-container">
      <Header />
      <div className="content-box">{children}</div>
    </div>
  );
}
