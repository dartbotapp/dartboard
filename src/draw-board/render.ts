import { Theme } from '../theme';
import { Board, PolarPoint } from '../utils';
import { clearBoard } from './clear-board';
import { drawBoard } from './draw-board';
import { drawHits } from './draw-hits';
import { BoardParams, setContext } from './set-context';

export const render = (
  board: Board.Board,
  hits: PolarPoint[],
  theme: Theme,
  params: BoardParams,
  context: CanvasRenderingContext2D,
) => {
  if (context == null) {
    return;
  }

  context.save();
  clearBoard(context);
  setContext(board, params, context);
  drawBoard(board, theme, context);
  drawHits(theme, context, hits);
  context.restore();
};
