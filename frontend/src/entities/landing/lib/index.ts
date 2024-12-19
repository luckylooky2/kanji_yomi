import { CanvasAnimation } from "../types/index";

export function addClass(element: HTMLElement, className: string) {
  element.classList.add(className);
}

export function reveal(sr: scrollReveal.ScrollRevealObject) {
  sr.reveal(".feature-extended .device-mockup", {
    duration: 600,
    distance: "100px",
    easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    origin: "bottom",
    viewFactor: 0.6,
  });
  sr.reveal(".feature-extended .feature-extended-body", {
    duration: 600,
    distance: "40px",
    easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    origin: "top",
    viewFactor: 0.6,
  });
}

export function startBubbleAnimation() {
  new CanvasAnimation("hero-particles").start();
  new CanvasAnimation("footer-particles").start();
}
