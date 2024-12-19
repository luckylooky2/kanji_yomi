"use client";

import { useEffect, useRef } from "react";

import { addClass, startBubbleAnimation, reveal } from "@/entities/landing/lib";

import "../../../public/landing/css/style.css";

const Test = () => {
  const htmlRef = useRef<HTMLElement>();
  const bodyRef = useRef<HTMLElement>();
  const scrollRevealRef = useRef<scrollReveal.ScrollRevealObject>();

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

      document.readyState === "complete"
        ? onLoad()
        : window.addEventListener("load", () => onLoad());

      window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (t) {
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
                <h1 className="m-0">
                  <img
                    className="header-logo-image"
                    src="/favicon/favicon-32x32.png"
                    alt="Logo"
                  />
                </h1>
                <span>
                  <strong>Kanji Yomi</strong>
                </span>
              </div>
            </div>
          </div>
        </header>
        <main>
          <section className="hero text-center text-light">
            <div className="hero-bg"></div>
            <div className="hero-particles-container">
              <canvas id="hero-particles"></canvas>
            </div>
            <div className="container-sm">
              <div className="hero-inner">
                <div className="hero-copy">
                  <h1 className="hero-title mt-0">Ready to Test Your</h1>
                  <h1 className="hero-title mt-0">Japanese Reading Skills?</h1>
                  <p className="hero-paragraph">
                    Your path to better japanese starts here.
                  </p>
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
                    src="/landing/images/iphone-hero.png"
                    alt="iPhone Hero"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="features-extended section">
            <div className="features-extended-inner section-inner">
              <div className="features-extended-wrap">
                <div className="feature-extended feature-grid">
                  <div className="feature-extended-body grid-content is-revealing">
                    <img src="/correct.png" alt="iPhone Feature 01" />
                    <h3 className="mt-0 mb-16">일본어 한자의 중요성</h3>
                    <p className="m-0">
                      일본어에서 한자는 단어의 의미뿐만 아니라 발음까지 결정하는
                      중요한 요소입니다. 정확한 읽기와 쓰기를 익히는 것은 일본어
                      학습의 핵심입니다.
                    </p>
                  </div>
                  <div className="feature-extended-body grid-content is-revealing">
                    <img src="/correct.png" alt="iPhone Feature 01" />
                    <h3 className="mt-0 mb-16">퀴즈 방식으로 반복 학습</h3>
                    <p className="m-0">
                      반복되는 퀴즈를 통해 자연스럽게 한자를 익히고, 자신감을
                      키울 수 있습니다. 다른 난이도로 학습이 가능해 점차적인
                      실력 향상을 돕습니다.
                    </p>
                  </div>
                  <div className="feature-extended-body grid-content is-revealing">
                    <img src="/correct.png" alt="iPhone Feature 01" />
                    <h3 className="mt-0 mb-16">선택지 대신 타이핑</h3>
                    <p className="m-0">
                      선택지는 정답을 직관적으로 추측하게 만들어 사용자가 단어를
                      정확히 기억하지 못하게 합니다. 선택지에 의존하지 않고,
                      직접 타이핑으로 한자를 입력하는 방식으로 정확한 발음과
                      쓰기를 학습할 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="container">
                  <div className="feature-extended">
                    <div className="feature-extended-image">
                      <div className="mockup-bg">
                        <img
                          src="/landing/images/iphone-feature-bg-02.svg"
                          alt="iPhone Feature 02 illustration"
                        />
                      </div>
                      <img
                        className="device-mockup is-revealing"
                        src="/landing/images/iphone-feature-02.png"
                        alt="iPhone Feature 02"
                      />
                    </div>
                    <div className="feature-extended-body is-revealing">
                      <h3 className="mt-0 mb-16">
                        Amazing features, coming soon.
                      </h3>
                      <p className="m-0">
                        Quam quisque id diam vel quam elementum pulvinar. Ut
                        etiam sit amet nisl purus in mollis nunc. Odio morbi
                        quis commodo odio aenean sed adipiscing diam donec.
                      </p>
                    </div>
                  </div>
                  <div className="feature-extended">
                    <div className="feature-extended-image">
                      <div className="mockup-bg">
                        <img
                          src="/landing/images/iphone-feature-bg-03.svg"
                          alt="iPhone Feature 03 illustration"
                        />
                      </div>
                      <img
                        className="device-mockup is-revealing"
                        src="/landing/images/iphone-feature-03.png"
                        alt="iPhone Feature 03"
                      />
                    </div>
                    <div className="feature-extended-body is-revealing">
                      <h3 className="mt-0 mb-16">
                        Amazing features, coming soon.
                      </h3>
                      <p className="m-0">
                        Quam quisque id diam vel quam elementum pulvinar. Ut
                        etiam sit amet nisl purus in mollis nunc. Odio morbi
                        quis commodo odio aenean sed adipiscing diam donec.
                      </p>
                    </div>
                  </div>
                  <div className="feature-extended">
                    <div className="feature-extended-image">
                      <div className="mockup-bg">
                        <img
                          src="/landing/images/iphone-feature-bg-04.svg"
                          alt="iPhone Feature 04 illustration"
                        />
                      </div>
                      <img
                        className="device-mockup is-revealing"
                        src="/landing/images/iphone-feature-04.png"
                        alt="iPhone Feature 04"
                      />
                    </div>
                    <div className="feature-extended-body is-revealing">
                      <h3 className="mt-0 mb-16">
                        Amazing features, coming soon.
                      </h3>
                      <p className="m-0">
                        Quam quisque id diam vel quam elementum pulvinar. Ut
                        etiam sit amet nisl purus in mollis nunc. Odio morbi
                        quis commodo odio aenean sed adipiscing diam donec.
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
                    <h2 className="section-title mt-0">Stay in the know</h2>
                    <p className="section-paragraph">
                      Lorem ipsum is common placeholder text used to demonstrate
                      the graphic elements of a document or visual presentation.
                    </p>
                    <div className="cta-cta">
                      <a
                        className="button button-primary button-wide-mobile"
                        href="#"
                      >
                        Get early access
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
                <div className="brand footer-brand">
                  <a href="#">
                    <img src="/landing/images/logo.svg" alt="Venus logo" />
                  </a>
                </div>
                <ul className="footer-links list-reset">
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <a href="#">FAQ's</a>
                  </li>
                  <li>
                    <a href="#">Support</a>
                  </li>
                </ul>
                <ul className="footer-social-links list-reset">
                  <li>
                    <a href="#">
                      <span className="screen-reader-text">Facebook</span>
                      <svg
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z"
                          fill="#FFF"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="screen-reader-text">Twitter</span>
                      <svg
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z"
                          fill="#FFF"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="screen-reader-text">Google</span>
                      <svg
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z"
                          fill="#FFF"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
                <div className="footer-copyright">
                  &copy; 2018 Kanjiyomi, all rights reserved
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Test;
