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
    viewFactor: 0.3,
  });
  sr.reveal(".feature-extended .feature-extended-body", {
    duration: 600,
    distance: "40px",
    easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    origin: "top",
    viewFactor: 0.3,
  });
}

const sakuraColors = [
  "255, 182, 193",
  "255, 192, 203",
  "255, 150, 170",
  "255, 204, 204",
  "231, 84, 128",
  "255, 105, 180",
];

// const snowColors = ["255, 255, 255"];

const defaultColors = [
  "85, 107, 139",
  "38, 141, 247",
  "66, 52, 248",
  "255, 108, 80",
  "243, 244, 255",
  "96, 100, 131",
];

export function startBubbleAnimation() {
  new CanvasAnimation("hero-particles", "down", sakuraColors).start();
  new CanvasAnimation("footer-particles", "up", defaultColors).start();
}
