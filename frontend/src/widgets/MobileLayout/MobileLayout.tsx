import React from "react";

import ReactQueryProviders from "@/ReactQueryProviders";
import Header from "@/features/header/components/Header";
import BottomNavigation from "@/features/navigation/components/BottomNavigation";

interface Props {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: Readonly<Props>) {
  return (
    <ReactQueryProviders>
      <div className="margin-container">
        <Header />
        <div className="content-box">
          <main>{children}</main>
        </div>
        <BottomNavigation />
      </div>
    </ReactQueryProviders>
  );
}
