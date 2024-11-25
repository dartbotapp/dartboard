import { Theme } from '../theme';
import { Board } from './board';

const PI2 = Math.PI * 2;

export const drawWire = (
  board: Board,
  theme: Theme,
  context: CanvasRenderingContext2D,
) => {
  if (theme.wireShow) {
    context.save();
    context.strokeStyle = theme.wireColor;
    context.lineWidth = theme.wireWidth;

    // Wire shadow
    if (theme.wireShadowShow) {
      context.shadowOffsetX = theme.wireShadowOffsetX;
      context.shadowOffsetY = theme.wireShadowOffsetY;
      context.shadowBlur = theme.wireShadowBlur;
      context.shadowColor = theme.wireShadowColor;
    }

    // Ring wires
    for (let r = 2; r < board.rings.length; r += 1) {
      context.beginPath();
      context.arc(0, 0, board.rings[r], 0, PI2, false);
      context.stroke();
    }

    // Sector wires
    const sectorWidth = PI2 / board.sectors.length;
    context.rotate(PI2 / 4 + sectorWidth / 2);
    const lastRing = board.rings[board.rings.length - 1];
    const randiusStart = board.rings[1];
    const radiusEnd = lastRing + theme.wireRingOffset;
    for (let s = 0; s < board.sectors.length; s += 1) {
      context.beginPath();
      context.moveTo(randiusStart, 0);
      context.lineTo(radiusEnd, 0);
      context.stroke();
      context.rotate(-sectorWidth);
    }

    // Bull wires
    for (let r = 0; r < 2; r += 1) {
      context.beginPath();
      context.arc(0, 0, board.rings[r], 0, PI2, false);
      context.stroke();
    }

    context.restore();
  }

  // Number wire
  if (theme.numberShow && theme.numberWireShow) {
    context.save();
    context.strokeStyle = theme.numberWireColor;
    context.lineWidth = theme.numberWireWidth;
    const radius = board.radius - theme.numberInset;
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI, false);
    context.stroke();
    context.restore();
  }
};
