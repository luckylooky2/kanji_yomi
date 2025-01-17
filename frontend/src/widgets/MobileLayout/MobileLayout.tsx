import React from "react";

import Header from "@/features/header/components/Header";

import BottomNavigation from "../navigation/BottomNavigation";

interface Props {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: Readonly<Props>) {
  return (
    <div className="margin-container">
      <Header />
      <div className="content-box">
        <main>{children}</main>
      </div>
      <BottomNavigation />
    </div>
  );
}
