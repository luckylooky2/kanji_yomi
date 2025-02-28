"use client";

import styled from "@emotion/styled";
import { useTranslations } from "next-intl";

import { settingLanguageType } from "@/entities/setting/types";
import { useLocale } from "@/shared/hooks/useLocale";
import { theme } from "@/shared/styles/theme";
import ErrorComponent from "@/widgets/ErrorComponent/ErrorComponent";
import Loading from "@/widgets/Loading/Loading";

const SettingPage = () => {
  const { locale, setLocale, isLoading, isError, retryHandler } = useLocale();
  const t = useTranslations();

  const langList = [
    ["language-en", "en"],
    ["language-ko", "ko"],
  ];

  const handleLanguageChange = ({ target }: { target: HTMLSelectElement }) => {
    const selectedLanguage = target.value as settingLanguageType;
    setLocale(selectedLanguage);
  };

  if (isError) {
    return (
      <ErrorComponent retryHandler={retryHandler} message="Network Error" />
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SettingPageContainer>
      <SettingItemLayout>
        <h4>{t("language")}</h4>
        <select value={locale} onChange={handleLanguageChange}>
          {langList.map(([label, value], i) => (
            <option value={value} key={`locale-${i}`}>
              {t(label)}
            </option>
          ))}
        </select>
      </SettingItemLayout>
    </SettingPageContainer>
  );
};

export default SettingPage;

const SettingPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`;

const SettingItemLayout = styled.article`
  width: 100%;
  display: flex;
  flex-direction: row;

  border: 2px solid rgba(25, 118, 210, 0.5);
  border-radius: 12px;
  background-color: white;
  padding: ${theme.spacing.medium};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h4 {
    width: 40%;
    // text-align: center;
  }

  select {
    width: 60%;
  }
`;
