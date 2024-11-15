import type { Metadata } from "next";
import localFont from "next/font/local";

import Header from "@/features/header/components/Header";
import GlobalModal from "@/features/modal/components/GlobalModal";

import "./ui/globals.css";

const geistSans = localFont({
  src: "./ui/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./ui/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalModal>
          <div>123</div>
        </GlobalModal>
        <Header />
        <main
          style={{
            margin: "50px",
            display: "flex",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          {children}
        </main>
        {/* <footer className={styles.footer}>@luckylooky2</footer> */}
      </body>
    </html>
  );
}
