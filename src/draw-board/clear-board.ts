/**
 * Clear out the full area of the canvas
 */
export const clearBoard = (context: CanvasRenderingContext2D) => {
  const { width, height } = context.canvas;
  context.clearRect(0, 0, width, height);
};
