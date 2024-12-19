class Bubble {
  parentNode: HTMLElement;
  canvasWidth: number;
  canvasHeight: number;
  mouseX: number = 0;
  mouseY: number = 0;
  translateX: number = 0;
  translateY: number = 0;
  posX: number = 0;
  posY: number = 0;
  movementX: number = 0;
  movementY: number = 0;
  color: string = "";
  colors: string[] = [
    // "85, 107, 139",
    // "38, 141, 247",
    // "66, 52, 248",
    // "255, 108, 80",
    // "243, 244, 255",
    // "96, 100, 131",
    "255, 182, 193",
    "255, 192, 203",
    "255, 150, 170",
    "255, 204, 204",
    "231, 84, 128",
    "255, 105, 180",
  ];
  alpha: number = 0;
  size: number = 0;
  velocity: number = 30;
  smoothFactor: number = 50;
  staticity: number = 30;
  magnetism: number = 1;

  constructor(element: HTMLElement) {
    this.parentNode = element;
    this.canvasWidth = element.clientWidth;
    this.canvasHeight = element.clientHeight;
    this.randomise();

    window.addEventListener("resize", () => {
      this.getCanvasSize();
    });

    window.addEventListener("mousemove", (t) => {
      this.mouseX = t.clientX;
      this.mouseY = t.clientY;
    });
  }

  getCanvasSize = () => {
    this.canvasWidth = this.parentNode.clientWidth;
    this.canvasHeight = this.parentNode.clientHeight;
  };

  generateDecimalBetween = (t: number, e: number): number => {
    return Number((Math.random() * (t - e) + e).toFixed(2));
  };

  update = () => {
    let t = this;
    t.translateX = t.translateX - t.movementX;
    t.translateY = t.translateY - t.movementY;
    t.posX +=
      (t.mouseX / (t.staticity / t.magnetism) - t.posX) / t.smoothFactor;
    t.posY +=
      (t.mouseY / (t.staticity / t.magnetism) - t.posY) / t.smoothFactor;
    (t.translateY + t.posY < 0 ||
      t.translateX + t.posX < 0 ||
      t.translateX + t.posX > t.canvasWidth) &&
      (t.randomise(), (t.translateY = t.canvasHeight));
  };

  randomise = () => {
    this.velocity = 15;
    this.smoothFactor = 50;
    this.staticity = 30;
    this.magnetism = 0.1 + 4 * Math.random();
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.alpha = this.generateDecimalBetween(5, 10) / 10;
    this.size = this.generateDecimalBetween(4, 5);
    this.posX = 0;
    this.posY = 0;
    this.movementX = this.generateDecimalBetween(-2, 2) / this.velocity;
    this.movementY = this.generateDecimalBetween(1, 20) / this.velocity;
    this.translateX = this.generateDecimalBetween(0, this.canvasWidth);
    this.translateY = this.generateDecimalBetween(0, this.canvasHeight);
  };
}

export class CanvasAnimation {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dpr: number;
  container: HTMLElement;
  w: number = 0;
  h: number = 0;
  wdpi: number = 0;
  hdpi: number = 0;
  bubblesList: Bubble[] = [];
  bubbleDensity: number = 15;

  constructor(elementId: string) {
    this.canvas = document.getElementById(elementId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.dpr = window.devicePixelRatio;
    this.container = this.canvas.parentNode as HTMLElement;
  }

  start = () => {
    let t = this;
    t.canvasSize();

    window.addEventListener("resize", function () {
      t.canvasSize();
    });

    t.bubblesList = [];
    t.generateBubbles();
    t.animate();
  };

  canvasSize = () => {
    this.container = this.canvas.parentNode as HTMLElement;
    this.w = this.container.offsetWidth;
    this.h = this.container.offsetHeight;
    this.wdpi = this.w * this.dpr;
    this.hdpi = this.h * this.dpr;
    this.canvas.width = this.wdpi;
    this.canvas.height = this.hdpi;
    this.canvas.style.width = this.w + "px";
    this.canvas.style.height = this.h + "px";
    this.ctx.scale(this.dpr, this.dpr);
  };

  animate = () => {
    let t = this;
    t.ctx.clearRect(0, 0, t.canvas.clientWidth, t.canvas.clientHeight);
    t.bubblesList.forEach(function (e) {
      e.update();
      t.ctx.translate(e.translateX, e.translateY);
      t.ctx.beginPath();
      t.ctx.arc(e.posX, e.posY, e.size, 0, 2 * Math.PI);
      t.ctx.fillStyle = "rgba(" + e.color + "," + e.alpha + ")";
      t.ctx.fill();
      t.ctx.setTransform(t.dpr, 0, 0, t.dpr, 0, 0);
    });
    requestAnimationFrame(this.animate.bind(this));
  };

  addBubble = (bubble: Bubble) => {
    return this.bubblesList.push(bubble);
  };

  generateBubbles = () => {
    let t = this;
    for (let e = 0; e < t.bubbleDensity; e++)
      t.addBubble(new Bubble(t.container));
  };
}
