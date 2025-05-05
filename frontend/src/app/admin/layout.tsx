import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Metadata } from "next";
import { ReactNode } from "react";

import ReactQueryProviders from "@/ReactQueryProviders";
import Header from "@/features/header/components/Header";

export const metadata: Metadata = {
  title: "Admin - Kanji Yomi",
  description: "Admin page",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <ReactQueryProviders>
        <Header />
        {children}
      </ReactQueryProviders>
    </AppRouterCacheProvider>
  );
}
