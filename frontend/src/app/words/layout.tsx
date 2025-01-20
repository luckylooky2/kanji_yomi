import { Metadata } from "next";

import MobileLayout from "../quiz/layout";

export const metadata: Metadata = {
  title: "Words - Kanji Yomi",
  description: "",
  openGraph: {
    title: "Words - Kanji Yomi",
    description: "",
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

export default MobileLayout;
