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
  colors: string[];
  alpha: number = 0;
  size: number = 0;
  velocity: number = 30;
  smoothFactor: number = 50;
  staticity: number = 30;
  magnetism: number = 1;
  flowDirection: "up" | "down";

  constructor(
    element: HTMLElement,
    flowDirection: "up" | "down",
    colors: string[]
  ) {
    this.parentNode = element;
    this.canvasWidth = element.clientWidth;
    this.canvasHeight = element.clientHeight;
    this.flowDirection = flowDirection;
    this.colors = colors;
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
    this.translateX = this.translateX - this.movementX;
    this.translateY += this.movementY * (this.flowDirection === "up" ? -1 : 1);
    this.posX +=
      (this.mouseX / (this.staticity / this.magnetism) - this.posX) /
      this.smoothFactor;
    this.posY +=
      (this.mouseY / (this.staticity / this.magnetism) - this.posY) /
      this.smoothFactor;

    if (
      this.flowDirection === "up" &&
      (this.translateY + this.posY < 0 ||
        this.translateX + this.posX < 0 ||
        this.translateX + this.posX > this.canvasWidth)
    ) {
      this.randomise();
      this.translateY = this.canvasHeight;
    }

    if (
      this.flowDirection === "down" &&
      (this.translateY - this.posY > this.canvasHeight ||
        this.translateX + this.posX < 0 ||
        this.translateX + this.posX > this.canvasWidth)
    ) {
      this.randomise();
      this.translateY = 0;
    }
  };

  randomise = () => {
    this.velocity = 15;
    this.smoothFactor = 50;
    this.staticity = 30;
    this.magnetism = 0.1 + 4 * Math.random();
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.alpha = this.generateDecimalBetween(5, 10) / 10;
    this.size = this.generateDecimalBetween(3, 6);
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
  flowDirection: "up" | "down";
  bubbleColors: string[];

  constructor(
    elementId: string,
    flowDirection: "up" | "down",
    bubbleColors: string[]
  ) {
    this.canvas = document.getElementById(elementId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.dpr = window.devicePixelRatio;
    this.container = this.canvas.parentNode as HTMLElement;
    this.flowDirection = flowDirection;
    this.bubbleColors = bubbleColors;
  }

  start = () => {
    this.canvasSize();

    window.addEventListener("resize", () => {
      this.canvasSize();
    });

    this.bubblesList = [];
    this.generateBubbles();
    this.animate();
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
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    this.bubblesList.forEach((e) => {
      e.update();
      this.ctx.translate(e.translateX, e.translateY);
      this.ctx.beginPath();
      this.ctx.arc(e.posX, e.posY, e.size, 0, 2 * Math.PI);
      this.ctx.fillStyle = "rgba(" + e.color + "," + e.alpha + ")";
      this.ctx.fill();
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    });
    requestAnimationFrame(this.animate.bind(this));
  };

  addBubble = (bubble: Bubble) => {
    return this.bubblesList.push(bubble);
  };

  generateBubbles = () => {
    for (let e = 0; e < this.bubbleDensity; e++)
      this.addBubble(
        new Bubble(this.container, this.flowDirection, this.bubbleColors)
      );
  };
}
