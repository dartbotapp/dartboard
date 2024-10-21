import { Token, Theme } from './theme';

type BaseTokens = {
  [token in Token]: string;
};

export const baseTokens: BaseTokens = {
  [Token.canvasBg]: 'transparent',
  [Token.boardBg]: '#080808',
  [Token.sectorBg1]: 'rgba(10, 10, 10, 1)',
  [Token.sectorBg2]: 'rgba(255, 250, 231, 1)',
  [Token.sectorBg3]: 'rgba(193, 50, 50, 1)',
  [Token.sectorBg4]: 'rgba(39, 91, 42, 1)',
  [Token.wireShow]: '1',
  [Token.wireWidth]: '0.8',
  [Token.wireColor]: '#f1f1f1',
  [Token.wireShadowShow]: '1',
  [Token.wireShadowColor]: '#000',
  [Token.wireShadowBlur]: '2',
  [Token.wireShadowOffsetX]: '0',
  [Token.wireShadowOffsetY]: '0.5',
  [Token.wireRingOffset]: '10',
  [Token.numberShow]: '1',
  [Token.numberWidth]: '1.75',
  [Token.numberColor]: '#f1f1f1',
  [Token.numberFont]: '27px "Consolas", Monospace',
  [Token.numberInset]: '5',
  [Token.numberWireShow]: '1',
  [Token.numberWireWidth]: '2.5',
  [Token.numberWireColor]: '#f1f1f1',
  [Token.hitFillColor]: 'rgba(80, 00, 160, .6)',
  [Token.hitRadius]: '4',
  [Token.hitStokeColor]: 'rgba(30, 33, 50, .8)',
  [Token.hitStrokeWidth]: '0.3',
};

const themeVal = (s: CSSStyleDeclaration, d: BaseTokens, t: Token) => {
  const varVal = s.getPropertyValue(t);
  return varVal || d[t];
};

const createThemeBuilder = (
  base: BaseTokens,
  style: CSSStyleDeclaration,
): Theme => {
  const s = (token: Token) => themeVal(style, base, token);
  const n = (token: Token) => parseFloat(s(token));
  const b = (token: Token) => s(token) === '1';

  return {
    canvasBackground: s(Token.canvasBg),
    boardBackground: s(Token.boardBg),
    sectorColor: [
      [s(Token.sectorBg1), s(Token.sectorBg2)],
      [s(Token.sectorBg3), s(Token.sectorBg4)],
    ],
    wireShow: b(Token.wireShow),
    wireWidth: n(Token.wireWidth),
    wireColor: s(Token.wireColor),
    wireShadowShow: b(Token.wireShadowShow),
    wireShadowColor: s(Token.wireShadowColor),
    wireShadowBlur: n(Token.wireShadowBlur),
    wireShadowOffsetX: n(Token.wireShadowOffsetX),
    wireShadowOffsetY: n(Token.wireShadowOffsetY),
    wireRingOffset: n(Token.wireRingOffset),
    numberShow: b(Token.numberShow),
    numberWidth: n(Token.numberWidth),
    numberColor: s(Token.numberColor),
    numberFont: s(Token.numberFont),
    numberInset: n(Token.numberInset),
    numberWireShow: b(Token.numberWireShow),
    numberWireWidth: n(Token.numberWireWidth),
    numberWireColor: s(Token.numberWireColor),
    hitRadius: n(Token.hitRadius),
    hitFillColor: s(Token.hitFillColor),
    hitStokeColor: s(Token.hitStokeColor),
    hitStrokeWidth: n(Token.hitStrokeWidth),
  };
};

export const themeBuilder = (style: CSSStyleDeclaration) =>
  createThemeBuilder(baseTokens, style);
