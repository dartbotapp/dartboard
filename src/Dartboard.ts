import { clearBoard, drawBoard, drawHits, setContext } from './draw-board';
import {
  translateCoords,
  debounce,
  PolarPoint,
  getPolar,
  Board,
} from './utils';
import { Token, baseTokens, themeBuilder } from './theme';
import { getRingIndexFromPoint, getSectorIndexFromPoint } from './utils/board';

/**
 * Custom pointer event that includes additional detail about what section
 * of the board was interacted and points translated to the boards coordinates.
 * The dartboard works with left hand coordinates with 0,0 centered in the
 * middle of the boar. Browser events are reported with 0,0 in the upper left
 * corner with the y-axis pointing down. Custom pointer events include the
 * points translated to coordinates the board understands. Units are reported
 * in mm relative to the board radius.
 */
export type DartboardPointerEvent = CustomEvent<{
  /* Original pointer event */
  event: PointerEvent;

  /* Point translated to board coordinates */
  point: { x: number; y: number };

  /* Point translated to polar coordinates */
  polar: PolarPoint;

  /* Sector index the event occurred in */
  sector: number;

  /* Ring index the event occurred in */
  ring: number;
}>;

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
    super();

    this.#board = Board.create();
    this.debounceRender = debounce(
      (dw: number, dh: number) => {
        this.#canvas.width = dw;
        this.#canvas.height = dh;
        this.#render();
      },
      RESIZE_DEBOUNCE_MS,
      { leading: true, trailing: true },
    );
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
        user-select: none;
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
    if (oldValue === newValue) {
      return;
    }

    if (name === 'zoom') {
      this.zoom = parseFloat(newValue);
    } else if (name === 'center-angle') {
      const angle = parseFloat(newValue);
      const { radius } = this.#centerPoint;
      this.centerPoint = { radius, angle };
    } else if (name === 'center-radius') {
      const radius = parseFloat(newValue);
      const { angle } = this.#centerPoint;
      this.centerPoint = { radius, angle };
    } else if (name === 'fit') {
      this.fit = newValue;
    }
  }

  connectedCallback() {
    this.#resizeObserver.observe(this, { box: 'device-pixel-content-box' });
    const content = this.#template.content.cloneNode(true);
    this.#shadow.appendChild(content);
    this.#canvas = this.#shadow.querySelector('canvas')!;
    this.#canvas.addEventListener('click', this);
  }

  renderCallback() {
    this.#render();
  }

  disconnectedCallback() {
    this.#resizeObserver.disconnect();
    this.#canvas.removeEventListener('click', this);
  }

  handleEvent(event: Event) {
    switch (event.type) {
      case 'click':
      case 'pointerdown':
      case 'pointerup': {
        const { offsetX, offsetY } = event as PointerEvent;
        const { point, polar, sector, ring } = this.translatePoint(
          offsetX,
          offsetY,
        );
        const name = `dartboard-${event.type}`;
        const detail = { event, point, polar, sector, ring };
        const e = new CustomEvent<any>(name, {
          detail,
          bubbles: true,
          cancelable: true,
        });
        this.dispatchEvent(e);
        break;
      }
      default:
        break;
    }
  }

  #resize(entries: ResizeObserverEntry[]) {
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
    const canvas = this.#shadow.querySelector('canvas')!;
    if (canvas == null) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (ctx == null) {
      return;
    }

    const board = this.#board;
    const params = {
      zoom: this.#zoom,
      centerPoint: this.#centerPoint,
      fit: this.fit,
    };
    const style = getComputedStyle(this);
    const theme = themeBuilder(style);

    ctx.save();
    clearBoard(ctx);
    setContext(board, params, ctx);
    drawBoard(board, theme, ctx);
    drawHits(theme, ctx, this.#hits);
    ctx.restore();
  }

  forceRender() {
    this.#render();
  }

  /**
   * Translates a point from the coordinate system the canvas uses to match
   * dimensions the board functions work with. The point is adjusted so that
   * 0,0 is the center of the board with the y-axis pointing up. The units
   * are translated from pixels to millimeters relative to the board radius.
   * @param x - X coordinate in canvas space
   * @param y - Y coordinate in canvas space
   */
  translatePoint(x: number, y: number) {
    const { offsetWidth, offsetHeight } = this.#canvas;
    const sectors = this.#board.sectors.length;
    const { radius } = this.#board;
    const point = translateCoords(
      offsetWidth,
      offsetHeight,
      this.#zoom,
      this.#centerPoint,
      radius,
      sectors,
      this.fit,
      x,
      y,
    );
    const polar = getPolar(point.x, point.y);
    const sector = getSectorIndexFromPoint(this.#board, polar);
    const ring = getRingIndexFromPoint(this.#board, polar);
    return { point, polar, sector, ring };
  }
}
