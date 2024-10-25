import { DEFAULT_CENTER_POINT, DEFAULT_ZOOM } from '../draw-board';
import { PolarPoint, getPoint } from './polar-point';

export const translateCoords = (
  width: number,
  height: number,
  zoomVal: number,
  centerPoint: PolarPoint,
  radius: number,
  sectors: number,
  fit: string,
  x: number,
  y: number,
) => {
  // Correct for the center of the canvas
  const x1 = x - width / 2;
  const y1 = y - height / 2;

  // Correct for zoom
  const zoom = zoomVal ?? DEFAULT_ZOOM;
  let z = Math.abs(zoom) + 1;
  if (zoom < 0) {
    z **= -1;
  }
  const f = fit === 'cover' ? Math.max(width, height) : Math.min(width, height);
  const scale = (f / (radius * 2)) * z;
  const x3 = x1 / scale;
  const y3 = y1 / scale;

  // Correct for rotation
  const sectorWidth = (2 * Math.PI) / sectors;
  const radians = Math.PI / 2 + sectorWidth / 2;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const point = {
    x: x3 * cos - y3 * sin,
    y: x3 * sin + y3 * cos,
  };

  // Correct for center point
  const center = centerPoint ?? DEFAULT_CENTER_POINT;
  const offset = getPoint(center);
  const x4 = point.x + offset.x;
  const y4 = point.y + offset.y;
  point.x = x4;
  point.y = y4;

  return point;
};
