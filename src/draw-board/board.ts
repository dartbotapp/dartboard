import { PolarPoint } from '../utils/polar-point';

const PI2 = Math.PI * 2;

export interface Board {
  radius: number;
  rings: number[];
  sectors: number[];
}

export const createBoard = () => ({
  radius: 225,
  rings: [
    6.35, // Double Bull
    16, // Single Bull
    99, // Skinny Single
    107, // Treble
    162, // Fat Single
    170, // Double and edge of score-able area
  ],
  sectors: [
    20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
  ],
});

export const radiansToDegrees = (radians: number): number =>
  radians * (180 / Math.PI);

/** Gets the size of the angle in radians for a single board sector */
export const getSectorWidth = (b: Board): number =>
  (2 * Math.PI) / b.sectors.length;

/** Gets the point value for the sector at the given index */
export const getSectorValue = (board: Board, i: number): number =>
  board.sectors[i];

/** Get the index of the sector that has the given value */
export const getSectorIndex = (
  board: Board,
  sectorValue: number,
): number | undefined => {
  const i = board.sectors.findIndex(v => v === sectorValue);
  return i >= 0 ? i : undefined;
};

/** Gets the distance from center that is the center point of the ring */
export const getRingCenter = (board: Board, ring: number): number => {
  if (ring === 0) {
    return 0;
  }
  const thisRing = board.rings[ring];
  const lastRing = board.rings[ring - 1];
  return (thisRing - lastRing) / 2 + lastRing;
};

/**
 * Gets the point coordinate of the center of a given area
 * of the board defined by the sector and ring
 */
export const getTargetPoint = (
  board: Board,
  sectorIndex: number,
  ringIndex: number,
): PolarPoint => {
  const sectorWidth = getSectorWidth(board);
  const rightBound = sectorWidth * sectorIndex;
  let angle = rightBound + sectorWidth / 2;
  const rotateAngle = Math.PI / 2 - Math.PI / board.sectors.length;
  angle += rotateAngle;
  const radius = getRingCenter(board, ringIndex);
  return { radius, angle };
};

/**
 * Creates a random point within a given sector and ring
 * @param board Board object containing rings and sectors
 * @param sectorIndex Sector the point should lie within
 * @param ringIndex Ring the point should lie within
 * @param rng Random number generator
 */
export const getRandomPoint = (
  board: Board,
  sectorIndex: number,
  ringIndex: number,
  rng?: () => number,
): PolarPoint => {
  const random = rng ?? Math.random;
  const sectorWidth = getSectorWidth(board);
  const a = sectorWidth * random();
  const angle = sectorWidth * sectorIndex + a;

  const r0 = ringIndex > 0 ? board.rings[ringIndex - 1] : 0;
  const r1 = board.rings[ringIndex];
  const radius = r0 + random() * (r1 - r0);
  return { radius, angle };
};

/**
 * Gets the index of the sector the point is in
 * @param board Board object containing rings and sectors
 * @param p PolarPoint on the board
 */
export const getSectorIndexFromPoint = (
  board: Board,
  p: PolarPoint,
): number => {
  const { sectors } = board;
  const sectorLength = sectors.length;
  const sectorWidth = (Math.PI * 2) / sectorLength;
  // const angle = p.angle - (Math.PI / 2) + (sectorWidth / 2);
  let angle = PI2 - (p.angle % PI2);
  angle += Math.PI / 2 + sectorWidth / 2;
  const sectorIndex = Math.floor(angle / sectorWidth);
  const i = sectorIndex % sectorLength;
  return i;
};

/**
 * Gets the index of the ring the point is in
 * @param board Board object containing rings and sectors
 * @param p PolarPoint on the board
 */
export const getRingIndexFromPoint = (
  board: Board,
  p: PolarPoint,
): number | undefined => {
  const { rings } = board;
  const ringIndex = rings.findIndex(r => p.radius <= r);
  return ringIndex >= 0 ? ringIndex : undefined;
};
