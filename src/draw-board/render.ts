import { Theme } from '../theme';
import { Board, PolarPoint } from '../utils';
import { clearBoard } from './clear-board';
import { drawBoard } from './draw-board';
import { drawHits } from './draw-hits';
import { setContext } from './set-context';

export const render = (
  board: Board.Board,
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
  drawBoard(board, theme, context);
  drawHits(theme, context, hits);
  context.restore();
};
