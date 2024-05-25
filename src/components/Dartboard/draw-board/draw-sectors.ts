import { Theme } from '../theme';
import { Board } from '../utils';

const PI2 = Math.PI * 2;

/**
 * Draw the sectors of the board.
 * @param board Board dimensions
 * @param theme Theme to use for drawing
 * @param context HTML canvas context to draw to
 */
export const drawSectors = (
  board: Board.Board,
  theme: Theme,
  context: CanvasRenderingContext2D
) => {
  context.fillStyle = theme.boardBackground;
  context.beginPath();
  context.arc(0, 0, board.radius, 0, PI2, false);
  context.fill();
  const { sectors, rings } = board;
  const colors = theme.sectorColor;

  // Draw the sectors
  for (let s = 0; s < sectors.length; s += 1) {
    for (let r = rings.length - 1; r >= 2; r -= 1) {
      const c1 = r % colors.length;
      const c2 = s % colors[c1].length;
      drawSector(board, colors[c1][c2], s, r, context);
    }
  }

  // Draw the bullseye
  const bullColors = theme.sectorColor[1];
  const c1 = 1 % bullColors.length;
  const c2 = 0 % bullColors.length;
  context.fillStyle = bullColors[c1];
  context.beginPath();
  context.moveTo(0, 0);
  context.arc(0, 0, board.rings[1], 0, PI2);
  context.fill();
  context.beginPath();
  context.moveTo(0, 0);
  context.fillStyle = bullColors[c2];
  context.arc(0, 0, board.rings[0], 0, PI2);
  context.fill();
};

/**
 * Draw an individual sector or the board.
 * A sector is a slice of the board between two wires
 * and two rings.
 * @param board Board dimensions
 * @param color Color of the sector background
 * @param s Sector index
 * @param r Ring index
 * @param context Canvas context to draw the sector to
 */
const drawSector = (
  board: Board.Board,
  color: string,
  s: number,
  r: number,
  context: CanvasRenderingContext2D,
) => {
  const sectorWidth = Board.getSectorWidth(board);
  context.moveTo(0, 0);
  const overhang = r === board.rings.length - 1 ? 0 : 0.5;
  const ring = board.rings[r] + overhang;
  const ringPrev = r === 0 ? 0 : board.rings[r - 1];
  const strokewidth = ring - ringPrev;
  context.lineWidth = strokewidth;
  context.lineCap = 'butt';

  context.beginPath();
  const angleOverhang = s === board.sectors.length - 1 ? 0 : 0.01;
  const start = sectorWidth * s;
  const end = sectorWidth * (s + 1) + angleOverhang;
  const radius = ring - (ring - ringPrev) / 2;
  context.arc(0, 0, radius, start, end, false);
  context.strokeStyle = color;
  context.stroke();
};
