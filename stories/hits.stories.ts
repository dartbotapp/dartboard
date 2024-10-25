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
    zoom: 1.5,
    center: '{ radius: 140, angle: 0.157 }',
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
      { radius: 147, angle: 0.2595 },
      { radius: 149, angle: 0.1368 },
      { radius: 142, angle: 0.0978 },
      { radius: 138, angle: 0.1136 },
      { radius: 138, angle: 0.1832 },
      { radius: 118, angle: 0.1978 },
      { radius: 120, angle: 0.1121 },
      { radius: 107, angle: 0.7388 },
      { radius: 105, angle: 0.6335 },
      { radius: 100, angle: 0.7349 },
      { radius: 102, angle: 0.7156 },
      { radius: 103, angle: 0.8145 },
      { radius: 100, angle: 0.8636 },
      { radius: 105, angle: 0.8737 }
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
