import type { StoryObj, Meta } from '@storybook/html';
import '../src/dartbot-dartboard';

export type DartboardProps = {};

const meta = {
  title: 'Components/Dartboard',
} satisfies Meta<DartboardProps>;

export default meta;
type Story = StoryObj<DartboardProps>;

export const ExportUrl: Story = {
  name: 'extract-url',
  tags: ['hidden'],
  render: (_, { id }) => `
<div id="${id}">
  <div style="margin-bottom: 1em;">
    <a href="#" download onclick="click">Click to Download Image</a>
  </div>
  <div>
    <dartbot-dartboard></dartbot-dartboard>
  </div>
</div>
<script defer>
  (() => {
    const segments = document.querySelectorAll('#${id} dartbot-dartboard')[0];
    const link = document.querySelectorAll('#${id} a')[0];
    setTimeout(() => {
      link.href = segments.toDataURL('image/png');
    }, 10);
  })();
</script>
  `,
};

export const ExportBlob: Story = {
  name: 'extract-blob',
  tags: ['hidden'],
  render: (_, { id }) => `
<div id="${id}">
  <style>
    dartbot-dartboard {
      --dartbot-wire-show: 0;
      aspect-ratio: 21 / 9;
    }
  </style>
  <div style="margin-bottom: 1em;">
    <button>Click to Download From Blob</button>
  </div>
  <div>
    <dartbot-dartboard zoom="2.5" center-radius="140" center-angle="1.5"></dartbot-dartboard>
  </div>
</div>
<script defer>
  (() => {
    const link = document.querySelectorAll('#${id} button')[0];
    link.addEventListener('click', click);
    async function click(e) {
      e.preventDefault();
      const elements = document.querySelectorAll('#${id} dartbot-dartboard')[0];
      const link = document.querySelectorAll('#${id} a')[0];
      elements.render();
      const blob = await elements.toBlob('image/png');
      const anchor = document.createElement('a');
      anchor.download = 'dartboard.png';
      anchor.href = URL.createObjectURL(blob);
      anchor.click();
      URL.revokeObjectURL(anchor.href);
    }
  })();
</script>
  `,
};
