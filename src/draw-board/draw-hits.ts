import { Theme } from '../theme';
import { PolarPoint, getPoint } from '../utils';

/**
 * Draw hits as highlighted circles on the board
 * @param theme
 * @param context
 * @param hits
 */
export const drawHits = (
  theme: Theme,
  context: CanvasRenderingContext2D,
  hits: PolarPoint[],
) => {
  context.save();
  context.fillStyle = theme.hitFillColor;
  context.strokeStyle = theme.hitStokeColor;
  context.lineWidth = theme.hitStrokeWidth;
  const radius = theme.hitRadius;
  for (const hit of hits) {
    const point = getPoint(hit);
    context.beginPath();
    context.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
  }
  context.restore();
};
