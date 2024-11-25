import { createTheme, Token } from './theme';
import { translateCoords, debounce, PolarPoint, getPolar } from './utils';
import {
  Board,
  createBoard,
  getRingIndexFromPoint,
  getSectorIndexFromPoint,
} from './draw-board/board';
import { render } from './draw-board/render';

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
  #canvas: HTMLCanvasElement;

  #hits: PolarPoint[] = [];

  #zoom = DEFAULT_ZOOM;

  #fit = 'contain';

  #centerPoint = { radius: 0, angle: 0 };

  #shadow: ShadowRoot;

  #board: Board;

  get board(): Board {
    return this.#board;
  }

  set board(value: Board) {
    this.#board = value;
    this.render();
  }

  get zoom(): number {
    return this.#zoom;
  }

  set zoom(value: number) {
    this.#zoom = value;
    this.render();
  }

  get centerPoint(): PolarPoint {
    return this.#centerPoint;
  }

  set centerPoint(value: PolarPoint) {
    this.#centerPoint = value;
    this.render();
  }

  get hits(): PolarPoint[] {
    return this.#hits;
  }

  set hits(value: PolarPoint[]) {
    this.#hits = value;
    this.render();
  }

  get fit(): string {
    return this.#fit;
  }

  set fit(value: string) {
    this.#fit = value;
    this.render();
  }

  static get observedAttributes() {
    return ['zoom', 'center-angle', 'center-radius', 'fit'];
  }

  constructor() {
    super();

    this.#board = createBoard();
    this.#shadow = this.attachShadow({ mode: 'open' });
    this.#shadow.innerHTML = `
      <style>
        :host {
          display: flex;
          width: 100%;
          aspect-ratio: 1 / 1;
          box-sizing: border-box;
          user-select: none;
        }
        canvas {
          width: 100%;
          height: 100%;
          background-color: var(${Token.canvasBg}, transparent);
        }
      </style>
      <canvas></canvas>
    `;
    this.#canvas = this.#shadow.querySelector('canvas')!;
    this.#canvas.addEventListener('click', this);

    const resizeObserver = new ResizeObserver(
      debounce(
        (entries: ResizeObserverEntry[]) => {
          const entry = entries.find(e => e.target === this)!;
          const box = entry.devicePixelContentBoxSize?.[0];
          const boxC = entry.contentBoxSize[0];
          const physical = (n: number) => Math.round(n * devicePixelRatio);
          this.#canvas.width = box?.inlineSize ?? physical(boxC.inlineSize);
          this.#canvas.height = box?.blockSize ?? physical(boxC.blockSize);
          this.render();
        },
        RESIZE_DEBOUNCE_MS,
        { leading: true, trailing: true },
      ),
    );
    resizeObserver.observe(this, { box: 'content-box' });
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

  render() {
    const ctx = this.#canvas.getContext('2d');
    if (ctx == null) {
      return;
    }
    const zoom = this.#zoom;
    const center = this.#centerPoint;
    const fit = this.#fit;
    const style = getComputedStyle(this);
    const theme = createTheme(style);
    render(this.#board, zoom, center, fit, this.#hits, theme, ctx);
  }

  /**
   * Translates a point from the coordinate system of the canvas.
   * The point is adjusted so that 0,0 is the center of the board with
   * the y-axis pointing up. The units are translated from pixels to
   * millimeters relative to the board radius.
   * @param x - X coordinate in canvas space
   * @param y - Y coordinate in canvas space
   */
  translatePoint(x: number, y: number) {
    const { offsetWidth: w, offsetHeight: h } = this.#canvas;
    const { radius } = this.#board;
    const zoom = this.#zoom;
    const center = this.#centerPoint;
    const fit = this.#fit;
    const point = translateCoords(w, h, zoom, center, radius, fit, x, y);
    const polar = getPolar(point.x, point.y);
    const sector = getSectorIndexFromPoint(this.#board, polar);
    const ring = getRingIndexFromPoint(this.#board, polar);
    return { point, polar, sector, ring };
  }
}
