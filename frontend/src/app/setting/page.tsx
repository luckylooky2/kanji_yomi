"use client";
import styled from "@emotion/styled";

import QuizWordHintSpeakSetting from "@/features/quiz/components/QuizWordHintSpeakSetting";
import { useLocale } from "@/shared/hooks/useLocale";
import ErrorComponent from "@/widgets/ErrorComponent/ErrorComponent";
import Loading from "@/widgets/Loading/Loading";

const SettingPage = () => {
  const { isLoading, isError, retryHandler } = useLocale();

  if (isError) {
    return (
      <ErrorComponent
        retryHandler={retryHandler}
        message="Failed to load Locale"
      />
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SpeakSettingContainer>
      <h2>음성 설정</h2>
      <QuizWordHintSpeakSetting />
    </SpeakSettingContainer>
  );
};

export default SettingPage;

const SpeakSettingContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: var(--spacing-medium);
  margin-top: var(--spacing-large);
`;
