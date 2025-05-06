"use client";
import styled from "@emotion/styled";
import { useTranslations } from "next-intl";

import QuizWordHintSpeakSetting from "@/features/quiz/components/QuizWordHintSpeakSetting";
import { useLocale } from "@/shared/hooks/useLocale";
import ErrorComponent from "@/widgets/ErrorComponent/ErrorComponent";
import Loading from "@/widgets/Loading/Loading";

const SettingPage = () => {
  const { isLoading, isError, retryHandler } = useLocale();
  const t = useTranslations();

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
      <h2>{t("speakSetting")}</h2>
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
