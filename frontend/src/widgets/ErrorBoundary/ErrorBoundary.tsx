import { ReactNode } from "react";

// ErrorBoundary는 렌더링 중 에러만 처리한다.
// - useEffect 내부의 에러는 React 렌더링 트리 외부에서 발생하므로, ErrorBoundary가 이를 감지하지 못한다. 비동기 코드에서 발생한 에러를 React는 별도로 처리하지 않기 때문이다.
// - 비동기 함수의 에러를 처리하려면 컴포넌트 내의 에러 상태를 선언하고, 해당 상태를 이용하여 렌더링 로직에 관여해야 한다.
const ErrorBoundary = ({
  children,
  fallback,
  error,
}: {
  children: ReactNode;
  fallback: ReactNode;
  error: Error | null;
}) => {
  if (!error) {
    return children;
  }

  return fallback;
};

export default ErrorBoundary;
