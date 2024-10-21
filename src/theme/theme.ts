export const enum Token {
  canvasBg = '--dartbot-canvas-bg',
  boardBg = '--dartbot-board-bg',
  sectorBg1 = '--dartbot-sector-bg-1',
  sectorBg2 = '--dartbot-sector-bg-2',
  sectorBg3 = '--dartbot-sector-bg-3',
  sectorBg4 = '--dartbot-sector-bg-4',
  wireShow = '--dartbot-wire-show',
  wireWidth = '--dartbot-wire-width',
  wireColor = '--dartbot-wire-color',
  wireShadowShow = '--dartbot-wire-shadow-show',
  wireShadowColor = '--dartbot-wire-shadow-color',
  wireShadowBlur = '--dartbot-wire-shadow-blur',
  wireShadowOffsetX = '--dartbot-wire-shadow-offset-x',
  wireShadowOffsetY = '--dartbot-wire-shadow-offset-y',
  wireRingOffset = '--dartbot-wire-ring-offset',
  numberShow = '--dartbot-number-show',
  numberWidth = '--dartbot-number-width',
  numberColor = '--dartbot-number-color',
  numberFont = '--dartbot-number-font',
  numberInset = '--dartbot-number-inset',
  numberWireShow = '--dartbot-number-wire-show',
  numberWireWidth = '--dartbot-number-wire-width',
  numberWireColor = '--dartbot-number-wire-color',
  hitFillColor = '--dartbot-hit-fill-color',
  hitRadius = '--dartbot-hit-radius',
  hitStokeColor = '--dartbot-hit-stoke-color',
  hitStrokeWidth = '--dartbot-hit-stoke-width',
}

export interface Theme {
  canvasBackground: string;
  boardBackground: string;
  sectorColor: string[][];
  wireShow: boolean;
  wireWidth: number;
  wireColor: string;
  wireShadowShow: boolean;
  wireShadowColor: string;
  wireShadowBlur: number;
  wireShadowOffsetX: number;
  wireShadowOffsetY: number;
  wireRingOffset: number;
  numberShow: boolean;
  numberWidth: number;
  numberColor: string;
  numberFont: string;
  numberInset: number;
  numberWireShow: boolean;
  numberWireWidth: number;
  numberWireColor: string;
  hitFillColor: string;
  hitRadius: number;
  hitStokeColor: string;
  hitStrokeWidth: number;
}
