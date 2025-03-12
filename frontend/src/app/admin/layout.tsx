import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ReactNode } from "react";

import ReactQueryProviders from "@/ReactQueryProviders";
import Header from "@/features/header/components/Header";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AppRouterCacheProvider>
          <ReactQueryProviders>
            <Header />
            {children}
          </ReactQueryProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
