import { Metadata } from "next";

import MobileLayout from "@/widgets/MobileLayout/MobileLayout";

export const metadata: Metadata = {
  title: "Setting - Kanji Yomi",
  description: "Setting options for word quiz",
  openGraph: {
    title: "Setting - Kanji Yomi",
    description: "Setting options for word quiz",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/setting`,
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
