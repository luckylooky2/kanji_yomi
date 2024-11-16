import type { Metadata } from "next";
import localFont from "next/font/local";

import Header from "@/features/header/components/Header";
import GlobalModal from "@/features/modal/components/GlobalModal";

import "./ui/globals.css";

const helveticaNeue = localFont({
  src: "./ui/fonts/Helvetica_Neue_Regular.woff",
  variable: "--font-helvetica-neue",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "kanji yomu",
  description:
    "A Quiz Application that helps users match Japanese Kanji with their Hiragana to improve reading and comprehension skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${helveticaNeue.variable}`}>
        <GlobalModal>
          <div>123</div>
        </GlobalModal>
        <Header />
        <div className="margin-container">
          <div className="content-box">{children}</div>
        </div>
        {/* <footer className={styles.footer}>@luckylooky2</footer> */}
      </body>
    </html>
  );
}
