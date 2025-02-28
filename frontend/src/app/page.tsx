"use client";

import styled from "@emotion/styled";
import LanguageIcon from "@mui/icons-material/Language";
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { addClass, startBubbleAnimation, reveal } from "@/entities/landing/lib";
import { settingLanguageType } from "@/entities/setting/types";
import { useLocale } from "@/shared/hooks/useLocale";
import { theme } from "@/shared/styles/theme";
import ErrorComponent from "@/widgets/ErrorComponent/ErrorComponent";
import Loading from "@/widgets/Loading/Loading";

import "../../public/landing/css/style.css";

import pkg from "../../package.json";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const htmlRef = useRef<HTMLElement>();
  const bodyRef = useRef<HTMLElement>();
  const scrollRevealRef = useRef<scrollReveal.ScrollRevealObject>();
  const menuRef = useRef<HTMLButtonElement>();
  const { locale, setLocale, isError, retryHandler, isLoading } = useLocale();

  const currVersion = `v${pkg.version}`;
  const url = `https://github.com/luckylooky2/kanji_yomi/releases/tag/${currVersion}`;

  useEffect(() => {
    if (isError || isLoading) {
      return;
    }

    // SSR 환경에서는 window 객체가 없기 때문에 동적으로 로드
    async function dynamicLoadScrollReveal() {
      const scrollreveal = await import("scrollreveal");
      return scrollreveal.default;
    }

    async function init() {
      htmlRef.current = document.documentElement;
      bodyRef.current = document.getElementById("body")!;
      const scrollreveal = await dynamicLoadScrollReveal();
      scrollRevealRef.current = window.sr = scrollreveal({ mobile: true });

      const [html, body, sr] = [
        htmlRef.current as HTMLElement,
        bodyRef.current as HTMLElement,
        scrollRevealRef.current as scrollReveal.ScrollRevealObject,
      ];

      html.classList.remove("no-js");
      html.classList.add("js");

      function onLoad() {
        addClass(body, "is-loaded");
        reveal(sr);
        startBubbleAnimation();
      }

      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", () => onLoad());
      }

      window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (t: TimerHandler) {
          window.setTimeout(t, 1e3 / 60);
        };
    }

    init();
  }, [isError, isLoading]);

  if (isError) {
    return (
      <ErrorComponent retryHandler={retryHandler} message="Network Error" />
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleToggleLanguageMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseLanguageMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSetLanguageAndClose = (lang: settingLanguageType) => () => {
    setLocale(lang);
    setIsMenuOpen(false);
  };

  return (
    <div id="body" className="is-boxed has-animations">
      <div className="body-wrap boxed-container">
        <header className="site-header text-light">
          <div className="container">
            <div className="site-header-inner">
              <div className="brand header-brand">
                <Image
                  src="/favicon/apple-touch-icon.png"
                  alt="header-logo-image"
                  width={40}
                  height={40}
                />
                <Image
                  className="logo"
                  src="/logo.png"
                  alt="logo"
                  width={100}
                  height={40}
                />
              </div>
              <LanguageSelectButton
                id="language-select"
                ref={(node) => {
                  if (node) {
                    menuRef.current = node;
                  }
                }}
                onClick={handleToggleLanguageMenu}
                size="small"
                aria-controls={isMenuOpen ? "language-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
              >
                <div>
                  <LanguageIcon fontSize="small" />
                </div>
                <div>/</div>
                <div>{locale === "en" ? "🇺🇸" : "🇰🇷"}</div>
              </LanguageSelectButton>
              <LanguagePopper
                open={isMenuOpen}
                anchorEl={menuRef.current}
                role="language-menu"
                transition
              >
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseLanguageMenu}>
                        <MenuList
                          autoFocusItem={isMenuOpen}
                          id="language-menu-list"
                        >
                          <LanguageMenuItem
                            onClick={handleSetLanguageAndClose("en")}
                            isSelected={locale === "en"}
                          >
                            🇺🇸 {t("language-en")}
                          </LanguageMenuItem>
                          <LanguageMenuItem
                            onClick={handleSetLanguageAndClose("ko")}
                            isSelected={locale === "ko"}
                          >
                            🇰🇷 {t("language-ko")}
                          </LanguageMenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </LanguagePopper>
            </div>
          </div>
        </header>
        <main>
          <section className="hero text-center text-light">
            {/* <div className="hero-bg"></div> */}
            <div className="hero-particles-container">
              <div className="hero-bg-wrapper">
                <Image
                  src="/landing/images/hero-canvas-winter.webp"
                  alt="hero-canvas"
                  className="hero-canvas"
                  sizes="1080px"
                  fill
                  priority
                />
              </div>
              <canvas id="hero-particles"></canvas>
            </div>
            <div className="container-sm">
              <div className="hero-inner">
                <div className="hero-copy">
                  <div className="blur">
                    <h2 className="hero-title mt-0">
                      {t("hero-title1")} <div className="word-break" />
                      {t("hero-title2")}
                    </h2>
                    <p className="hero-paragraph sub-title-color">
                      {t("hero-paragraph")}
                    </p>
                  </div>
                  <div className="hero-cta">
                    <a
                      className="button button-primary button-wide-mobile"
                      href="/quiz"
                    >
                      {t("hero-callToAction")} →
                    </a>
                  </div>
                </div>
                <div className="mockup-container">
                  <Image
                    className="device-mockup"
                    src="/landing/images/hero-image.png"
                    alt="iPhone Hero"
                    width={350}
                    height={680}
                  />
                </div>
              </div>
            </div>
          </section>
          <div className="divider" />
          <section className="features-extended section">
            <div className="features-extended-inner section-inner">
              <div className="features-extended-wrap">
                <h1 className="section-title">{t("aboutApp-title")}</h1>
                <div className="feature-extended feature-grid">
                  <div className="feature-extended-body grid-content is-revealing">
                    <Image
                      src="/landing/images/description-01.png"
                      alt="description-01"
                      width={100}
                      height={100}
                    />
                    <div className="grid-letter-box">
                      <h4 className="mt-0 mb-16">
                        {t("aboutApp-subtitle1-1")} <br />
                        {t("aboutApp-subtitle1-2")}
                      </h4>
                      <p className="m-0">{t("aboutApp-paragraph1")}</p>
                    </div>
                  </div>
                  <div className="feature-extended-body grid-content is-revealing">
                    <Image
                      src="/landing/images/description-02.png"
                      alt="description-02"
                      width={100}
                      height={100}
                    />
                    <div>
                      <h4 className="mt-0 mb-16">
                        {t("aboutApp-subtitle2-1")} <br />
                        {t("aboutApp-subtitle2-2")}
                      </h4>
                      <p className="m-0">{t("aboutApp-paragraph2")}</p>
                    </div>
                  </div>
                  <div className="feature-extended-body grid-content is-revealing">
                    <Image
                      src="/landing/images/description-03.png"
                      alt="description-03"
                      width={100}
                      height={100}
                    />
                    <div>
                      <h4 className="mt-0 mb-16">{t("aboutApp-subtitle3")}</h4>
                      <p className="m-0">{t("aboutApp-paragraph3")}</p>
                    </div>
                  </div>
                </div>
                <div className="divider" />
                <div className="container margin-bottom">
                  <h1 className="section-title">{t("features-title")}</h1>
                  <div className="feature-extended">
                    <div className="feature-extended-image">
                      <div className="mockup-bg">
                        <Image
                          src="/landing/images/feature-bg-02.svg"
                          alt="iPhone Feature 02 illustration"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Image
                        className="device-mockup is-revealing"
                        src="/landing/images/feature-option.png"
                        alt="feature-option"
                        width={300}
                        height={570}
                      />
                    </div>
                    <div className="feature-extended-body is-revealing">
                      <h3 className="mt-0 mb-16">
                        {t("features-subtitle1-1")} <br />
                        {t("features-subtitle1-2")}
                      </h3>
                      <p className="m-0">{t("features-paragraph1")}</p>
                    </div>
                  </div>
                  <div className="feature-extended">
                    <div className="feature-extended-image">
                      <div className="mockup-bg">
                        <Image
                          src="/landing/images/feature-bg-03.svg"
                          alt="iPhone Feature 03 illustration"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Image
                        className="device-mockup is-revealing"
                        src="/landing/images/feature-hint.png"
                        alt="feature-hint"
                        width={300}
                        height={570}
                      />
                    </div>
                    <div className="feature-extended-body is-revealing">
                      <h3 className="mt-0 mb-16">
                        {t("features-subtitle2-1")}
                        <br /> {t("features-subtitle2-2")}
                      </h3>
                      <p className="m-0">{t("features-paragraph2")}</p>
                    </div>
                  </div>
                  <div className="feature-extended">
                    <div className="feature-extended-image">
                      <div className="mockup-bg">
                        <Image
                          src="/landing/images/feature-bg-04.svg"
                          alt="iPhone Feature 04 illustration"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Image
                        className="device-mockup is-revealing"
                        src="/landing/images/feature-result.png"
                        alt="feature-result"
                        width={300}
                        height={570}
                      />
                    </div>
                    <div className="feature-extended-body is-revealing">
                      <h3 className="mt-0 mb-16">
                        {t("features-subtitle3-1")} <br />
                        {t("features-subtitle3-2")}
                      </h3>
                      <p className="m-0">{t("features-paragraph3")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <div className="footer-particles-container">
            <canvas id="footer-particles"></canvas>
          </div>
          <div className="site-footer-top">
            <section className="cta section text-light">
              <div className="container-sm">
                <div className="cta-inner section-inner">
                  <div className="cta-header text-center">
                    <h2 className="section-title mt-0">{t("footer-title")}</h2>
                    <p className="section-paragraph">{t("footer-paragraph")}</p>
                    <div className="cta-cta">
                      <a
                        className="button button-primary button-wide-mobile"
                        href="/quiz"
                      >
                        {t("footer-callToAction")} →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="site-footer-bottom">
            <div className="container">
              <div className="site-footer-inner">
                <div className="brand footer-brand"></div>
                <ul className="footer-links list-reset">
                  <li>
                    <a href="mailto:dev.chanhyung@gmail.com">{t("contact")}</a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/luckylooky2/kanji_yomi/issues/new/choose"
                      target="_blank"
                    >
                      {t("suggestion")}
                    </a>
                  </li>
                  <li>
                    <a href={url} target="_blank">
                      <i>{currVersion}</i>
                    </a>
                  </li>
                </ul>
                <ul className="footer-social-links list-reset">
                  <li>
                    <a
                      href="https://github.com/luckylooky2/kanji_yomi"
                      target="_blank"
                    >
                      <span className="screen-reader-text">GitHub</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                      </svg>
                    </a>
                  </li>
                </ul>
                <div className="footer-copyright">
                  &copy; 2025 Kanjiyomi, all rights reserved
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;

const LanguagePopper = styled(Popper)`
  z-index: 1000;
`;

const LanguageSelectButton = styled(IconButton)`
  display: flex;
  gap: ${theme.spacing.xsmall};
  border-radius: ${theme.radius.medium};

  div {
    font-size: 28px;
  }

  svg {
    margin-top: 2px;
  }

  &.MuiButtonBase-root:hover {
    border-radius: ${theme.radius.medium};
  }
`;

const LanguageMenuItem = styled(MenuItem)<{
  isSelected: boolean;
}>`
  background-color: ${({ isSelected }) => (isSelected ? "#cccccc" : "white")};

  &.MuiButtonBase-root:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#bbbbbb" : "#eeeeee"};
  }
`;
