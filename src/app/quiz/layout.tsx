export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

// layout은 모든 라우트에 공통적으로 적용. 상태 값이 모든 페이지에 공통으로 적용됨
// template은 children 마다 새로운 인스턴스를 생성하여 DOM 요소가 재생성되고, 상태 값은 보존되지 않으며 효과들이 재동기화된다.
