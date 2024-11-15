"use client";

import Page from "@/shared/components/Page";

function MyPageBase() {
  return <div>123</div>;
}

export default function MyPage() {
  return (
    <Page path="mypage">
      <MyPageBase />
    </Page>
  );
}
