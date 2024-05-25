import { Theme } from '../theme';
import { PolarPoint, getPoint } from '../utils';

export const drawHits = (
  theme: Theme,
  context: CanvasRenderingContext2D,
  hits: PolarPoint[]
) => {
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
};
