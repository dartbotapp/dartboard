import { clearBoard, drawBoard, drawHits, setContext } from './draw-board';
import { translateCoords, debounce, PolarPoint, Point, getPolar, Board } from './utils';
import { Token, baseTokens, themeBuilder } from './theme';

const RESIZE_DEBOUNCE_MS = 100;
const DEFAULT_ZOOM = 0;

export class Dartboard extends HTMLElement {
  #resizeObserver: ResizeObserver;
  #canvas!: HTMLCanvasElement;
  #hits: PolarPoint[] = [];
  #zoom = DEFAULT_ZOOM;
  #fit = 'contain';
  #centerPoint = { radius: 0, angle: 0 };
  #template: HTMLTemplateElement;
  #shadow: ShadowRoot;
  #board: Board.Board;
  debounceRender: any;

  get board(): Board.Board {
    return this.#board;
  }
  set board(value: Board.Board) {
    this.#board = value;
    this.#render();
  }

  get zoom(): number {
    return this.#zoom;
  }

  set zoom(value: number) {
    this.#zoom = value;
    this.#render();
  }

  get centerPoint(): PolarPoint {
    return this.#centerPoint;
  }

  set centerPoint(value: PolarPoint) {
    this.#centerPoint = value;
    this.#render();
  }

  get hits(): PolarPoint[] {
    return this.#hits;
  }

  set hits(value: PolarPoint[]) {
    this.#hits = value;
    this.#render();
  }

  get fit(): string {
    return this.#fit;
  }
  set fit(value: string) {
    this.#fit = value;
    this.#render();
  }

  static get observedAttributes() {
    return ['zoom', 'center-angle', 'center-radius', 'fit'];
  }

  constructor() {
    console.debug('constructor');
    super();

    this.#board = Board.create();
    this.debounceRender = debounce((dw: number, dh: number) => {

      this.#canvas.width = dw;
      this.#canvas.height = dh;
      this.#render();
    }, RESIZE_DEBOUNCE_MS, { leading: true, trailing: true });
    this.#resizeObserver = new ResizeObserver(this.#resize.bind(this));
    this.#shadow = this.attachShadow({ mode: 'open' });
    this.#template = document.createElement('template');
    this.#template.innerHTML = `
      <style>
      :host {
        display: block;
        width: 100%;
        aspect-ratio: 1 / 1;
        box-sizing: border-box;
      }
      canvas {
        position: absolute;
        background: var(${Token.canvasBg}, ${baseTokens[Token.canvasBg]});
      }
      </style>
      <canvas></canvas>
    `;
  }


  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.debug(`attributeChangedCallback ${name} [${oldValue}]:[${newValue}]`);
    if (oldValue === newValue) { return; }

    if (name === 'zoom') {
      this.zoom = parseFloat(newValue);
    } else if (name === 'center-angle') {
      const angle = parseFloat(newValue);
      const radius = this.#centerPoint.radius;
      this.centerPoint = { radius, angle };
    } else if (name === 'center-radius') {
      const radius = parseFloat(newValue);
      const angle = this.#centerPoint.angle;
      this.centerPoint = { radius, angle };
    } else if (name === 'fit') {
      this.fit = newValue;
    }
  }

  connectedCallback() {
    console.debug('connectedCallback');
    this.#resizeObserver.observe(this, { box: 'device-pixel-content-box' });
    const content = this.#template.content.cloneNode(true);
    this.#shadow.appendChild(content);
    this.#canvas = this.#shadow.querySelector('canvas')!;
    this.#canvas.addEventListener('click', (e) => {
      this.#render();
    });
    // this.#render();
  }

  renderCallback() {
    console.debug('renderCallback');
    this.#render();
  }

  disconnectedCallback() {
    console.debug('disconnectedCallback');
    this.#resizeObserver.disconnect();
  }

  adoptedCallback() {
    console.debug('adoptedCallback');
  }

  #resize(entries: ResizeObserverEntry[]) {
    console.debug('resize');
    for (const entry of entries) {
      const dw = entry.devicePixelContentBoxSize[0].inlineSize;
      const dh = entry.devicePixelContentBoxSize[0].blockSize;
      const cr = entry.contentRect;
      this.#canvas.style.width = `${cr.width}px`;
      this.#canvas.style.height = `${cr.height}px`;
      this.debounceRender(dw, dh);
    }
  }

  #render() {

    console.debug('render');
    const canvas = this.#shadow.querySelector('canvas')!;
    if (canvas == null) { return; }
    const ctx = canvas.getContext('2d');
    if (ctx == null) { return; }

    const board = this.#board;
    const params = { zoom: this.#zoom, centerPoint: this.#centerPoint, fit: this.fit };
    const style = getComputedStyle(this);
    const theme = themeBuilder(style);

    ctx.save();
    clearBoard(ctx);
    setContext(board, params, ctx);
    drawBoard(board, theme, ctx);
    drawHits(theme,ctx, this.#hits);
    ctx.restore();
  }

  forceRender() {
    this.#render();
  }

  /**
   * Translates a point from the canvas to match
   * dimensions of the board. The point is adjusted
   * so that 0,0 is the center of the board and dimensions
   * are in mm relative to the board radius.
   */
  translatePoint(x: number, y: number): PointInfo {
    console.debug(`translatePoint (${x},${y})`);
    const { offsetWidth, offsetHeight } = this.#canvas;
    const sectors = this.#board.sectors.length;
    const radius = this.#board.radius;
    const point = translateCoords(offsetWidth, offsetHeight, this.#zoom, this.#centerPoint, radius, sectors, this.fit, x, y);
    const polar = getPolar(point.x, point.y);
    console.debug(`translated (${point.x},${point.y})`);
    return { point, polar, x, y };
  }
}

export interface PointInfo {
  x: number;
  y: number;
  point: Point;
  polar: PolarPoint;
}