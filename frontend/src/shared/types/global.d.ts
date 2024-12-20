interface Window {
  sr: scrollReveal.ScrollRevealObject;
  requestAnimFrame?: ((callback: FrameRequestCallback) => number) | undefined;
  requestAnimationFrame?: (callback: FrameRequestCallback) => number;
  webkitRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
  mozRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
  oRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
  msRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
}
