import { isValidPolar, getPoint, PolarPoint } from '../utils';

/**
 * Set the scale and rotation of the canvas to match the dimensions
 * of a darboard. Positions will be relative to the center of the board
 * and units will be in millimeters. This allows us to draw the board
 * using coordinates that match the physical board.
 * @param radius The radius of the board in millimeters
 * @param zoom Zoom level of the board. 1 is normal
 * @param centerPoint Point on the board that the canvas should be centered on
 * @param fit How the board should fit in the canvas. 'contain' or 'cover'
 * @param context Canvas rendering context to draw the board to
 */
export const setContext = (
  radius: number,
  zoom: number,
  centerPoint: PolarPoint,
  fit: string,
  context: CanvasRenderingContext2D,
) => {
  if (context == null) {
    return;
  }

  // Set the bulleye to center of canvas (0,0)
  const width = context.canvas?.width;
  const height = context.canvas?.height;
  context.translate(width / 2, height / 2);

  // Flip the y-axis to point up
  context.scale(1, -1);

  // Set the scale so that the board exactly fills the canvas
  const fitMode = fit === 'cover' ? Math.max : Math.min;
  const fitVal = fitMode(width, height);
  const fitScale = fitVal / (radius * 2.0);
  context.scale(fitScale, fitScale);

  // Set the zoom level
  let zoomScale = zoom;
  if (zoomScale <= 0) {
    zoomScale = 1;
  }
  if (zoomScale !== 1) {
    context.scale(zoomScale, zoomScale);
  }

  // If the user has specified a different center point,
  // translate the canvas so it is at the the center
  if (isValidPolar(centerPoint) && centerPoint.radius !== 0) {
    const center = getPoint(centerPoint);
    context.translate(-center.x, -center.y);
  }
};
