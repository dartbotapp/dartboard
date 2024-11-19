import { PolarPoint, getPoint } from './polar-point';

/**
 * Translate a point from canvas coordinates to board coordinates.
 * Correct for the scale and rotation of the canvas so that the
 * point is in the same coordinate system as the dartboard.
 * @param width Width of the canvas
 * @param height Height of the canvas
 * @param zoomVal Zoom value of the component
 * @param centerPoint Center point offset of the component
 * @param radius Radius of the dartboard
 * @param fit Fit mode of the component
 * @param xCoord X coordinate to translate
 * @param yCoord Y coordinate to translate
 */
export const translateCoords = (
  width: number,
  height: number,
  zoomVal: number,
  centerPoint: PolarPoint,
  radius: number,
  fit: string,
  xCoord: number,
  yCoord: number,
) => {
  // Correct for the center of the canvas
  let x = xCoord;
  let y = yCoord;
  x -= width / 2;
  y -= height / 2;

  // Correct for the y-axis
  y *= -1;

  // Correct for fit
  const fitMode = fit === 'cover' ? Math.max : Math.min;
  const fitFactor = fitMode(width, height);
  const fitScale = fitFactor / (radius * 2.0);
  x /= fitScale;
  y /= fitScale;

  // Correct for zoom
  let zoom = zoomVal;
  if (zoom <= 0) {
    zoom = 1;
  }
  x /= zoom;
  y /= zoom;

  // Correct for center point
  const center = getPoint(centerPoint);
  x += center.x;
  y += center.y;

  return { x, y };
};
