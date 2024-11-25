import { Theme } from '../theme';
import { PolarPoint } from '../utils';
import { Board } from './board';
import { drawHits } from './draw-hits';
import { drawNumbers } from './draw-numbers';
import { drawSectors } from './draw-sectors';
import { drawWire } from './draw-wire';

/**
 * Draw a dartboard to the canvas
 * @param board Board dimensions
 * @param theme Theme to style the board
 * @param context Canvas context to draw the board to
 */
export const drawBoard = (
  board: Board,
  theme: Theme,
  hits: PolarPoint[],
  context: CanvasRenderingContext2D,
) => {
  drawSectors(board, theme, context);
  drawWire(board, theme, context);
  drawNumbers(board, theme, context);
  drawHits(theme, context, hits);
};
