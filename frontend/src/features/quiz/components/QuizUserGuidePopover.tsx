import styled from "@emotion/styled";
import CloseButton from "@mui/icons-material/Close";
import { Button, Popover } from "@mui/material";
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
        .getElementsByClassName("MuiPaper-root")[1]
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

  if (guideContent === null) {
    return null;
  }

  return (
    <QuizUserGuidePopoverLayout
      open
      anchorEl={guideContent.anchorEl}
      anchorOrigin={guideContent.anchorOrigin}
      transformOrigin={guideContent.transformOrigin}
      arrowPosition={guideContent.arrowPosition}
      disablePortal
      mid={mid}
    >
      <QuizUserGuidePopoverTitle>
        <h3>{guideContent.title}</h3>
        <QuizUserGuideCloseButton onClick={initializeStep}>
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
            disabled={currStep === 1}
            onClick={setPrevStep}
          >
            &lt; prev
          </QuizUserGuideStepButton>
          <div>|</div>
          <QuizUserGuideStepButton
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
  }
`;

const QuizUserGuidePopoverContent = styled.div`
  min-height: 70px;
  max-height: 200px;
  overflow-y: auto;
  padding: ${theme.spacing.small};
`;

const QuizUserGuidePopoverControlBar = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    padding: ${theme.spacing.small};
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
