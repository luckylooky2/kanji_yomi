import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz - Kanji Yomi",
  description: "Choose your options and start the Kanji quiz.",
  openGraph: {
    title: "Quiz - Kanji Yomi",
    description: "Choose your options and start the Kanji quiz.",
    url: "https://kanji-yomi.vercel.app/quiz",
    images: [
      {
        url: "https://kanji-yomi.vercel.app/og_image.png",
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
