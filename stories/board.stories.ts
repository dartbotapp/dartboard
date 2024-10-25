import type { StoryObj, Meta } from '@storybook/html';
import { baseDecorator, themeDecorator, transform } from './decorators';
import '../src/dartbot-dartboard';

const meta = {
  title: 'Components/Dartboard',
  decorators: [baseDecorator, themeDecorator],
  parameters: {
    docs: { source: { transform } },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Rings: Story = {
  name: 'story-rings',
  tags: ['hidden'],
  render: (_, { id }) => `
<script>
  (() => {
    const boards = document.querySelectorAll('#${id} dartbot-dartboard');
    boards[0].board.rings = [10, 30, 80, 110, 150, 170];
    boards[1].board.rings = [6.35, 16, 29, 37, 162, 170];
    boards[2].board.rings = [6.35, 16, 30, 38, 79, 87, 120, 128, 162, 170];
    const container = document.getElementById('${id}');
    container?.replaceChildren();
    boards.forEach((board) => {
      container?.appendChild(board);
    });
  })();
</script>

<div id="${id}">
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
</div>
  `,
};

export const Sectors: Story = {
  name: 'story-sectors',
  tags: ['hidden'],
  render: (_, { id }) => `
<script>
  (() => {
    const boards = document.querySelectorAll('#${id} dartbot-dartboard');
    boards[0].board.sectors = [...new Array(20)].map((_, i) => i + 100);
    boards[1].board.sectors = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    boards[2].board.sectors = [...new Array(40)].map((_, i) => i + 1);
  })();
</script>

<div id="${id}">
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
</div>
  `,
};
