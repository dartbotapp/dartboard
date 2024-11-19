export interface Theme {
  canvasBackground: string;
  boardBackground: string;
  sectorBackground: string[];
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
  numberSize: number;
  numberInset: number;
  numberWireShow: boolean;
  numberWireWidth: number;
  numberWireColor: string;
  hitFillColor: string;
  hitRadius: number;
  hitStokeColor: string;
  hitStrokeWidth: number;
}
