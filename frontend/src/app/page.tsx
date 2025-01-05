"use client";

import { useEffect, useRef } from "react";

import { addClass, startBubbleAnimation, reveal } from "@/entities/landing/lib";

import "../../public/landing/css/style.css";

import pkg from "../../package.json";

const LandingPage = () => {
  const htmlRef = useRef<HTMLElement>();
  const bodyRef = useRef<HTMLElement>();
  const scrollRevealRef = useRef<scrollReveal.ScrollRevealObject>();

  const currVersion = `v${pkg.version}`;
  const url = `https://github.com/luckylooky2/kanji_yomi/releases/tag/${currVersion}`;

  useEffect(() => {
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
  }, []);

  return (
    <div id="body" className="is-boxed has-animations">
      <div className="body-wrap boxed-container">
        <header className="site-header text-light">
          <div className="container">
            <div className="site-header-inner">
              <div className="brand header-brand">
                <img
                  className="header-logo-image"
                  src="/favicon/favicon-32x32.png"
                  alt="favicon-32"
                />
                <img className="logo" src="/logo.png" alt="logo" />
              </div>
            </div>
          </div>
        </header>
        <main>
          <section className="hero text-center text-light">
            {/* <div className="hero-bg"></div> */}
            <div className="hero-particles-container">
              <canvas id="hero-particles"></canvas>
            </div>
            <div className="container-sm">
              <div className="hero-inner">
                <div className="hero-copy">
                  <div className="blur">
                    <h2 className="hero-title mt-0">
                      Boost Your Japanese <div className="word-break" />
                      Reading Fluency
                    </h2>
                    <p className="hero-paragraph sub-title-color">
                      Typing-based learning that helps you master kanji
                      effectively.
                    </p>
                  </div>
                  <div className="hero-cta">
                    <a
                      className="button button-primary button-wide-mobile"
                      href="/quiz"
                    >
                      Try Quiz Now →
                    </a>
                  </div>
                </div>
                <div className="mockup-container">
                  <img
                    className="device-mockup"
                    src="/landing/images/hero-image.png"
                    alt="iPhone Hero"
                  />
                </div>
              </div>
            </div>
          </section>
          <div className="divider" />
          <section className="features-extended section">
            <div className="features-extended-inner section-inner">
              <div className="features-extended-wrap">
                <h1 className="section-title">About App</h1>
                <div className="feature-extended feature-grid">
                  <div className="feature-extended-body grid-content is-revealing">
                    <img
                      src="/landing/images/description-01.png"
                      alt="description-01"
                    />
                    <div className="grid-letter-box">
                      <h4 className="mt-0 mb-16">
                        The Importance of <br />
                        Japanese Kanji
                      </h4>
                      <p className="m-0">
                        Kanji defines both word meaning and pronunciation,
                        making it essential for mastering Japanese.
                      </p>
                    </div>
                  </div>
                  <div className="feature-extended-body grid-content is-revealing">
                    <img
                      src="/landing/images/description-02.png"
                      alt="description-02"
                    />
                    <div>
                      <h4 className="mt-0 mb-16">
                        Repetitive Learning <br />
                        Through Quizzes
                      </h4>
                      <p className="m-0">
                        Practice Kanji through quizzes to build confidence and
                        gradually improve with varying difficulty levels.
                      </p>
                    </div>
                  </div>
                  <div className="feature-extended-body grid-content is-revealing">
                    <img
                      src="/landing/images/description-03.png"
                      alt="description-03"
                    />
                    <div>
                      <h4 className="mt-0 mb-16">Type, Don’t Choose</h4>
                      <p className="m-0">
                        Typing Kanji ensures accurate learning, unlike
                        multiple-choice, which relies on guessing.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="divider" />
                <div className="container margin-bottom">
                  <h1 className="section-title">Features</h1>
                  <div className="feature-extended">
                    <div className="feature-extended-image">
                      <div className="mockup-bg">
                        <img
                          src="/landing/images/feature-bg-02.svg"
                          alt="iPhone Feature 02 illustration"
                        />
                      </div>
                      <img
                        className="device-mockup is-revealing"
                        src="/landing/images/feature-option.png"
                        alt="feature-option"
                      />
                    </div>
                    <div className="feature-extended-body is-revealing">
                      <h3 className="mt-0 mb-16">
                        Quiz Based on <br />
                        Difficulty Levels
                      </h3>
                      <p className="m-0">
                        Quizzes are provided based on JLPT levels, from N5 to N1
                        (coming soon). You can also select multiple levels for a
                        comprehensive learning experience.
                      </p>
                    </div>
                  </div>
                  <div className="feature-extended">
                    <div className="feature-extended-image">
                      <div className="mockup-bg">
                        <img
                          src="/landing/images/feature-bg-03.svg"
                          alt="iPhone Feature 03 illustration"
                        />
                      </div>
                      <img
                        className="device-mockup is-revealing"
                        src="/landing/images/feature-hint.png"
                        alt="feature-hint"
                      />
                    </div>
                    <div className="feature-extended-body is-revealing">
                      <h3 className="mt-0 mb-16">
                        Improve Learning Efficiency with Hints
                      </h3>
                      <p className="m-0">
                        Our app provides hints, such as pronunciations and
                        dictionary definitions, to help you find the correct
                        answer easily. However, it is recommended to attempt
                        solving the questions on your own first before using
                        hints.
                      </p>
                    </div>
                  </div>
                  <div className="feature-extended">
                    <div className="feature-extended-image">
                      <div className="mockup-bg">
                        <img
                          src="/landing/images/feature-bg-04.svg"
                          alt="iPhone Feature 04 illustration"
                        />
                      </div>
                      <img
                        className="device-mockup is-revealing"
                        src="/landing/images/feature-result.png"
                        alt="feature-result"
                      />
                    </div>
                    <div className="feature-extended-body is-revealing">
                      <h3 className="mt-0 mb-16">
                        Quick Summary of <br />
                        Your Performance
                      </h3>
                      <p className="m-0">
                        The result screen shows correct and incorrect answers at
                        a glance. Check your time, accuracy, and other stats to
                        evaluate your progress.
                      </p>
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
                    <h2 className="section-title mt-0">Don’t Miss Out!</h2>
                    <p className="section-paragraph">
                      Get started now and be among the first to experience the
                      power of learning Japanese with us.
                    </p>
                    <div className="cta-cta">
                      <a
                        className="button button-primary button-wide-mobile"
                        href="/quiz"
                      >
                        Play the Quiz →
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
                    <a href="mailto:dev.chanhyung@gmail.com">Contact</a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/luckylooky2/kanji_yomi/issues/new/choose"
                      target="_blank"
                    >
                      Suggestion
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
                  &copy; 2024 Kanjiyomi, all rights reserved
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
