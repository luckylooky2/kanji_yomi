"use client";

import PageWithBottomNav from "@/widgets/navigation/PageWithBottomNav";

function MyPageBase() {
  return <div>my page</div>;
}

export default function MyPage() {
  return (
    <PageWithBottomNav path="mypage">
      <MyPageBase />
    </PageWithBottomNav>
  );
}
