import { Theme } from '../theme';
import { Board } from './board';

const PI2 = Math.PI * 2;

export const drawNumbers = (
  board: Board,
  theme: Theme,
  context: CanvasRenderingContext2D,
) => {
  if (!theme.numberShow) {
    return;
  }
  for (let s = 0; s < board.sectors.length; s += 1) {
    drawNumber(context, board, theme, s);
  }
};

const drawNumber = (
  context: CanvasRenderingContext2D,
  board: Board,
  theme: Theme,
  i: number,
) => {
  context.save();

  context.lineWidth = theme.numberWidth;
  const { numberColor, numberFont, numberSize } = theme;
  context.fillStyle = numberColor;
  context.font = `${numberSize}px ${numberFont}`;

  // Rotate the canvas until we get to the correct sector
  const { sectors } = board;
  const sectorWidth = (Math.PI * 2) / sectors.length;
  const start = PI2 / 4 + sectorWidth / 2;
  const sectorStart = start - sectorWidth * i;
  const numberStart = sectorStart - sectorWidth / 2;
  context.rotate(numberStart);

  // Measure the text to position it in the center of the sector
  const text = sectors[i];
  const textVal = text.toString();
  const textHeight = context.measureText('N').width;
  const textWidth = context.measureText(textVal).width;
  const radius = board.radius - textHeight / 2 - theme.numberInset;
  context.translate(radius, 0);

  // Draw the number
  if (theme.wireShadowShow) {
    context.shadowBlur = theme.wireShadowBlur;
    context.shadowColor = theme.wireShadowColor;
    context.shadowOffsetX = theme.wireShadowOffsetX;
    context.shadowOffsetY = theme.wireShadowOffsetY;
  }
  const a = sectorWidth * i;
  const adjust = a > Math.PI / 2 && a < 2 * Math.PI * 0.75 ? 1 : 0;
  const numAngle = Math.PI / 2 + adjust * Math.PI;
  context.rotate(numAngle);
  context.scale(-1, 1);
  const label = sectors[i].toString();
  context.fillText(label, -(textWidth / 2), textHeight / 2);
  context.restore();
};
