import { Theme } from '../theme';
import { PolarPoint } from '../utils';
import { Board } from './board';
import { clearBoard } from './clear-board';
import { drawBoard } from './draw-board';
import { setContext } from './set-context';

/**
 * Render the dartboard to the canvas
 * @param board Board dimensions
 * @param zoom Zoom factor
 * @param center Center point of the board on the canvas
 * @param fit Fit mode for the board 'contain' or 'cover'
 * @param hits List of hits to draw on the board
 * @param theme Theme to style the board
 * @param context Context API for the canvas
 */
export const render = (
  board: Board,
  zoom: number,
  center: PolarPoint,
  fit: string,
  hits: PolarPoint[],
  theme: Theme,
  context: CanvasRenderingContext2D,
) => {
  if (context == null) {
    return;
  }
  context.save();
  clearBoard(context);
  setContext(board.radius, zoom, center, fit, context);
  drawBoard(board, theme, hits, context);
  context.restore();
};
