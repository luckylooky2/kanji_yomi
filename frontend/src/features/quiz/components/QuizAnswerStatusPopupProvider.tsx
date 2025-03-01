import styled from "@emotion/styled";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type PopupType = "info" | "warn" | "error" | "success";

interface PopupState {
  open: boolean;
  type: PopupType;
  message: string;
}

interface PopupContextType {
  showPopup: (_type: PopupType, _message: string) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

const QuizAnswerStatusPopupProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [popup, setPopup] = useState<PopupState | null>(null);
  // const [isVisible, setIsVisible] = useState(false);

  const showPopup = (type: PopupType, message: string) => {
    setPopup({ open: true, type, message });
  };

  const closePopup = () => {
    setPopup(null);
  };

  useEffect(() => {
    // setIsVisible(true);

    const hideTimeout = setTimeout(() => {
      // setIsVisible(false);
      setPopup(null);
    }, 1500);

    return () => clearTimeout(hideTimeout);
  }, [popup]);

  return (
    <PopupContext.Provider value={{ showPopup, closePopup }}>
      <PopupPosition>
        {children}
        {popup && (
          <PopupContainer type={popup.type}>
            <div>{popup.message}</div>
          </PopupContainer>
        )}
      </PopupPosition>
    </PopupContext.Provider>
  );
};

export default QuizAnswerStatusPopupProvider;

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return {
    info: (message: string) => context.showPopup("info", message),
    warn: (message: string) => context.showPopup("warn", message),
    error: (message: string) => context.showPopup("error", message),
    success: (message: string) => context.showPopup("success", message),
  };
}

const PopupPosition = styled.div`
  position: relative;
`;

const PopupContainer = styled.div<{ type: PopupType }>`
  position: absolute;
  height: 25px;
  top: 0;
  transform: translate(5%, -120%);
  padding: 0px 10px;
  color: white;
  border-radius: 4px;
  background-color: ${({ type }) => {
    switch (type) {
      case "info":
        return "#2196f3";
      case "warn":
        return "orange";
      case "error":
        return "red";
      case "success":
        return "green";
    }
  }};
`;
