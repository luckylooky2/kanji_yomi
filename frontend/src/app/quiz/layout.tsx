import { Metadata } from "next";
import React from "react";

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
  return children;
}
