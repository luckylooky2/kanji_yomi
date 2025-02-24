import styled from "@emotion/styled";
import CloseButton from "@mui/icons-material/Close";
import { Button, Popover, PopoverOrigin } from "@mui/material";
import { useEffect, useState } from "react";

import { useQuizUserGuideStep } from "@/shared/hooks/useQuizUserGuideStep";
import { theme } from "@/shared/styles/theme";

const QuizUserGuidePopover = () => {
  const {
    currStep,
    finalStep,
    guideContent,
    setPrevStep,
    setNextStep,
    initializeStep,
    disableShowUserGuide,
  } = useQuizUserGuideStep();
  const [mid, setMid] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (guideContent === null || guideContent.anchorEl === null) {
        return;
      }

      const { left: anchorLeft, right: anchorRight } =
        guideContent.anchorEl.getBoundingClientRect();
      const { left: popoverLeft, right: popoverRight } = document
        .getElementsByClassName("MuiPopover-paper")[0] // MuiPaper-root[0]은 AppBar
        .getBoundingClientRect();
      // anchor의 중간이 popover의 몇 %에 위치하는지 계산
      const anchorMid = (anchorLeft + anchorRight) / 2;
      const popoverWidth = popoverRight - popoverLeft;
      const mid = Math.floor(((anchorMid - popoverLeft) / popoverWidth) * 100);
      setMid(mid);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [guideContent]);

  const handleCloseUserGuide = () => {
    initializeStep();
    disableShowUserGuide();
  };

  if (guideContent === null) {
    return null;
  }

  const anchorOrigin: PopoverOrigin =
    guideContent.position === "top"
      ? { vertical: "top", horizontal: "center" }
      : { vertical: "bottom", horizontal: "center" };
  const transformOrigin: PopoverOrigin =
    guideContent.position === "top"
      ? { vertical: "bottom", horizontal: "center" }
      : { vertical: "top", horizontal: "center" };
  const arrowPosition = guideContent.position === "top" ? "bottom" : "top";

  return (
    <QuizUserGuidePopoverLayout
      open
      anchorEl={guideContent.anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      arrowPosition={arrowPosition}
      disablePortal
      mid={mid}
    >
      <QuizUserGuidePopoverTitle>
        <h3>{guideContent.title}</h3>
        <QuizUserGuideCloseButton onClick={handleCloseUserGuide}>
          <CloseButton fontSize="small" />
        </QuizUserGuideCloseButton>
      </QuizUserGuidePopoverTitle>
      <QuizUserGuidePopoverContent>
        {guideContent.content}
      </QuizUserGuidePopoverContent>
      <QuizUserGuidePopoverControlBar>
        <div>
          {currStep} / {finalStep}
        </div>
        <QuizUserGuidePopoverButtonGroup>
          <QuizUserGuideStepButton
            variant="contained"
            disabled={currStep === 1}
            onClick={setPrevStep}
          >
            &lt; prev
          </QuizUserGuideStepButton>
          <div>|</div>
          <QuizUserGuideStepButton
            variant="contained"
            disabled={currStep === finalStep}
            onClick={setNextStep}
          >
            next &gt;
          </QuizUserGuideStepButton>
        </QuizUserGuidePopoverButtonGroup>
      </QuizUserGuidePopoverControlBar>
    </QuizUserGuidePopoverLayout>
  );
};

export default QuizUserGuidePopover;

const QuizUserGuidePopoverLayout = styled(Popover)<{
  arrowPosition: "top" | "bottom";
  mid: number;
}>`
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .MuiPaper-root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 300px;
    padding: ${theme.spacing.small};
    transform: ${({ arrowPosition }) =>
      arrowPosition === "top"
        ? "translateY(20px)"
        : "translateY(-20px)"} !important;
    overflow: visible;
  }

  .MuiPaper-root:before {
    content: "";
    display: block;
    position: absolute;
    top: ${({ arrowPosition }) => (arrowPosition === "top" ? "0" : "none")};
    bottom: ${({ arrowPosition }) => (arrowPosition === "top" ? "none" : "0")};
    left: ${({ mid }) => mid}%;
    width: 30px;
    height: 30px;
    background-color: inherit;
    transform: ${({ arrowPosition }) =>
        arrowPosition === "top"
          ? "translate(-50%, -20%)"
          : "translate(-50%, 20%)"}
      rotate(45deg);

    z-index: -1;
  }
`;

const QuizUserGuidePopoverTitle = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    padding: ${theme.spacing.small};
    color: #1976d2;
  }
`;

const QuizUserGuidePopoverContent = styled.div`
  min-height: 70px;
  padding: ${theme.spacing.small};

  > div {
    max-height: 200px;
    overflow-y: auto;
  }

  > div::-webkit-scrollbar {
    display: none;
  }

  span {
    color: #1976d2;
  }
`;

const QuizUserGuidePopoverControlBar = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    padding: ${theme.spacing.small};
    color: #1976d2;
    font-size: 14px;
  }
`;

const QuizUserGuidePopoverButtonGroup = styled.div`
  display: flex;

  div {
    color: #1976d2;
    font-size: 13px;
    padding: 0;
  }
`;

const QuizUserGuideCloseButton = styled(Button)`
  min-width: 0;
`;

const QuizUserGuideStepButton = styled(Button)`
  font-size: 12px;
  line-height: 1;
  padding: 0 ${theme.spacing.small};
  min-width: 0;
`;
