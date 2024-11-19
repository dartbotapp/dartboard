import type { StoryObj, Meta } from '@storybook/html';
import { withActions } from '@storybook/addon-actions/decorator';
import { baseDecorator, transform, zoomDecorator } from './decorators';
import '../src/dartbot-dartboard';

export type DartboardProps = {};

const meta = {
  title: 'Components/Dartboard',
  decorators: [withActions, baseDecorator, zoomDecorator],
  parameters: {
    actions: {
      handles: [
        'dartboard-click',
        'dartboard-pointerdown',
        'dartboard-pointerup',
      ],
    },
    docs: { source: { transform } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<DartboardProps>;

export const Hits: Story = {
  name: 'Hits',
  tags: ['hidden'],
  parameters: {
    aspectRatio: '16/9',
    zoom: 2,
    center: '{ radius: 140, angle: 1.57 }',
  },
  render: (_, { id }) => `
<style data-dartbot-remove>
  #${id} { display: block; }
</style>

<script data-dartbot-remove defer>
  (() => {
    const root = document.getElementById('${id}');
    const board = root.querySelector('dartbot-dartboard');
    board.addEventListener('dartboard-click', (event) => {
      const { detail, target } = event;
      const { polar, point, sector, ring } = detail;
      target.hits = [...target.hits, polar];
    });
  })();
</script>

<script defer>
  (() => {
    const root = document.getElementById('${id}');
    const board = root.querySelector('dartbot-dartboard');
    board.hits = [
      {radius: 144, angle: 1.66 },
      {radius: 143, angle: 1.54 },
      {radius: 150, angle: 1.50 },
      {radius: 128, angle: 1.55 },
      {radius: 131, angle: 1.62 },
      {radius: 135, angle: 1.51 },
      {radius: 147, angle: 1.57 },
      {radius: 104, angle: 0.57 },
      {radius: 97, angle: 0.60 },
      {radius: 100, angle: 0.54 },
      {radius: 107, angle: 0.68 },
      {radius: 97, angle: 0.69 },
      {radius: 103, angle: 0.74 },
      {radius: 102, angle: 0.66 },
      {radius: 104, angle: 0.57 }
    ];
  })();
</script>

<div id="${id}">
  <dartbot-dartboard></dartbot-dartboard>
</div>
`,
};

export const Clicks: StoryObj = {
  name: 'Click',
  tags: ['hidden'],
  render: (_, { id }) => `
<style data-dartbot-remove>
  #${id} { display: block; }
</style>
<script defer>
  (() => {
    const root = document.getElementById('${id}');
    const board = root.querySelector('dartbot-dartboard');
    board.addEventListener('dartboard-click', (event) => {

      // Get the point and ring/sector info from the event
      const { detail, target } = event;
      const { polar, point, sector, ring } = detail;

      // Add a new hit to the board
      target.hits = [...target.hits, polar];
    });
  })();
</script>
<div id="${id}">
  <pre>Click on the board to add a hit</pre>
  <dartbot-dartboard></dartbot-dartboard>
</div>
`,
};
