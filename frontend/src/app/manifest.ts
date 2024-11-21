import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kanji Yomi - ",
    short_name: "Kanji Yomi - 漢字読み",
    description:
      "A Quiz Application that helps users match Japanese Kanji with their Hiragana to improve reading and comprehension skills.",
    start_url: "/",
    display: "standalone",
    background_color: "#209CEE",
    theme_color: "#fff",
    icons: [
      {
        src: "favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
