/**
 * Point in the polar coordinate system
 * represented as a radius and an angle
 */
export interface PolarPoint {
  radius: number;
  angle: number;
}

/**
 * Point in the Cartesian coordinate system
 * represented as an x and y coordinate
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Gets a Cartesian point (x, y) from a polar point
 */
export const getPoint = (point: PolarPoint): Point => ({
  x: getX(point),
  y: getY(point),
});

/**
 * Gets a polar point from Cartesian coordinates
 * @param x Cartesian X coordinate
 * @param y Cartesian Y coordinate
 * @returns Polar point representation of the cartesian coordinate
 */
export const getPolar = (x: number, y: number): PolarPoint => {
  let radius = Math.sqrt(x * x + y * y);
  let angle = Math.atan2(y, x);
  if (radius < 0) {
    radius = Math.abs(radius);
    angle += Math.PI;
  }
  if (angle < 0) {
    angle += Math.PI * 2;
  }
  return { radius, angle };
};

/**
 * Get the X value of the Cartesian point
 * @param point Polar point to convert to cartesian
 * @returns X value of the cartesian point
 */
export const getX = (point: PolarPoint): number =>
  point.radius * Math.cos(point.angle);

/**
 * Get the Y value of the Cartesian point
 * @param point Polar point to convert to cartesian
 * @returns Y value of the cartesian point
 */
export const getY = (point: PolarPoint): number =>
  point.radius * Math.sin(point.angle);

/**
 * Returns a polar point that is the vector of the two other points
 */
export const addPolar = (p1: PolarPoint, p2: PolarPoint): PolarPoint => {
  const c1 = getPoint(p1);
  const c2 = getPoint(p2);
  const x = c1.x + c2.x;
  const y = c1.y + c2.y;
  return getPolar(x, y);
};

/**
 * Returns true if the point is valid. A valid point is a point
 * where the radius and angle are both finite numbers
 * @param p Polar point with radius and angle
 */
export const isValidPolar = (p: PolarPoint): boolean =>
  Number.isFinite(p?.radius) && Number.isFinite(p?.angle);

/**
 * Returns true if the point is valid. A valid point is
 * one where the x and y coordinates are both finite numbers
 * @param p Cartesian point with x and y coordinates
 */
export const isValidPoint = (p: Point): boolean =>
  Number.isFinite(p?.x) && Number.isFinite(p?.y);
