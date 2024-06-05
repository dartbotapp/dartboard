import { Theme } from '../theme';
import { Board } from '../utils';

const PI2 = Math.PI * 2;

export const drawWire = (
  board: Board.Board,
  theme: Theme,
  context: CanvasRenderingContext2D
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
    // First 2 rings are the bullseye
    for (let r = 2; r < board.rings.length; r++) {
      const adjust = theme.wireWidth * 0.5;
      context.beginPath();
      context.arc(0, 0, board.rings[r] + adjust, 0, PI2, false);
      context.stroke();
    }

    // Sector wires
    const sectorWidth = PI2 / board.sectors.length;
    const lastRing = board.rings[board.rings.length - 1];
    const radius = lastRing + theme.wireRingOffset;
    const start = { angle: 0, radius: board.rings[1] };
    context.save();
    for (let s = 0; s < board.sectors.length; s += 1) {
      context.beginPath();
      context.rotate(sectorWidth);
      context.moveTo(0, start.radius);
      context.lineTo(0, radius);
      context.stroke();
    }
    context.restore();

    // Bullseye wires
    for (let r = 0; r < 2; r++) {
      context.beginPath();
      context.arc(0, 0, board.rings[r] + (theme.wireWidth / 2), 0, PI2, false);
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
