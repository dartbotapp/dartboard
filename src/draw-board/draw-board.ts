import { Theme } from '../theme';
import { Board } from '../utils';
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
  board: Board.Board,
  theme: Theme,
  context: CanvasRenderingContext2D,
) => {
  drawSectors(board, theme, context);
  drawWire(board, theme, context);
  drawNumbers(board, theme, context);
};
