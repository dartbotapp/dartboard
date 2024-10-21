import type { StoryObj, Meta } from '@storybook/html';
import '../src/dartbot-dartboard';

const meta = {
  title: 'Color Wall',
} satisfies Meta;

export default meta;
export const ColorWall: StoryObj = {
  name: 'Color Wall',
  args: {
    width: 16,
    height: 12,
    color1: '#00f',
    color2: '#f0b',
    color3: '#0fd',
  },
  argTypes: {
    color1: { control: 'color' },
    color2: { control: 'color' },
    color3: { control: 'color' },
  },
  render: ({ color1, color2, color3, width, height }, { id }) => `
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const interp = (c1, c2, percent) => c1 + percent * (c2 - c1);
    const container = document.getElementById('${id}');
    if (container === null) return;
    container.replaceChildren();
    const grid = { width: ${width}, height: ${height} };
    const boards = [...new Array(grid.width * grid.height)]
      .map(() => document.createElement('dartbot-dartboard'));
    const max = Math.sqrt(grid.width ** 2 + grid.height ** 2);
    const c1 = { r: 200, g: 0, b: 50 };
    const c2 = { r: 0, g: 0, b: 225 };
    const c3 = { r: 0, g: 255, b: 0 };
    boards.forEach((board, i) => {
      const x = i % grid.width;
      const y = Math.floor(i / grid.width);
      const dist = Math.sqrt(x ** 2 + y ** 2);
      const percent = 1 - dist / max;
      const color = \`color-mix(in srgb, $\{'${color1}'} $\{percent * 100}%, $\{'${color2}'})\`;
      const color1 = 'hsl(from var(--dartbot-color) h s 30%';
      const color2 = 'hsl(from var(--dartbot-color) h s 50%';
      board.style.setProperty('--dartbot-color', color);
      board.style.setProperty('--dartbot-board-bg', color1);
      board.style.setProperty('--dartbot-sector-bg-1', color1);
      board.style.setProperty('--dartbot-sector-bg-2', color2);
      board.style.setProperty('--dartbot-sector-bg-3', color2);
      board.style.setProperty('--dartbot-sector-bg-4', color1);
      container.appendChild(board);

      // Change color on clicked
      board.addEventListener('mouseover', () => {
        board.style.setProperty('--dartbot-color', '${color3}');
        board.forceRender();
      });
    });
  });
</script>
<style data-dartbot-remove>
  #${id} {
    display: grid;
    grid-template-columns: repeat(${width}, 1fr);
    grid-column-gap: .1em;
    --dartbot-number-show: 0;
    --dartbot-wire-show: 0;
  }
</style>
<div id="${id}"></div>
`,
};
