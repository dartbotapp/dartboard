import type { StoryObj, Meta } from '@storybook/html';
import { baseDecorator, themeDecorator, transform } from './decorators';
import '../src/dartbot-dartboard';

const meta = {
  title: 'Resize',
  decorators: [baseDecorator, themeDecorator],
  parameters: {
    docs: { source: { transform } },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Dimensions: Story = {
  name: 'story-dimensions',
  tags: ['hidden'],
  render: (_, { id }) => `
<style data-dartbot-remove>
  #${id} {
    dartbot-dartboard {
      border: .1em dashed #0002;
    }
  }
</style>
<style>
  #${id} {
    dartbot-dartboard:nth-child(1) {
      width: 8em;
      height: 18em;
    }
    dartbot-dartboard:nth-child(2) {
      width: 18em;
      height: 10em;
    }
    dartbot-dartboard:nth-child(3) {
      width: 10em;
      height: 12em;
    }
  }
</style>
<div id="${id}">
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
</div>
`,
};

export const Dynamic: Story = {
  name: 'Resize',
  decorators: [],
  render: (_, { id }) => `
<style data-dartbot-remove>
#${id} {
  border: 2px dashed #0002;
  max-width: 60em;
  min-width: 10em;
  display: flex;
  dartbot-dartboard {
    padding: 1em;
    width 100%;
    height: 100%;
  }
}
</style>
<style>
  #${id} {
    overflow: auto;
    resize: both;
    width: 30em;
  }
</style>
<pre>Click and drag the bottom right corner to resize</pre>
<div id="${id}">
  <dartbot-dartboard></dartbot-dartboard>
</div>
  `,
};

export const Width: Story = {
  name: 'story-width',
  tags: ['hidden'],
  decorators: [],
  render: (_, { id }) => `
<style data-dartbot-remove>
  #${id} {
    dartbot-dartboard {
      border: 2px dashed #0002;
    }
  }
</style>
<style>
  #${id} {
    dartbot-dartboard:nth-child(1) {
      width: 30em;
    }
    dartbot-dartboard:nth-child(2) {
      width: 20em;
    }
    dartbot-dartboard:nth-child(3) {
      width: 10em;
    }
  }
</style>
<div id="${id}">
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
</div>
`,
};

export const AspectRatio: Story = {
  name: 'story-aspect',
  tags: ['hidden'],
  render: (_, { id }) => `
<style data-dartbot-remove>
  #${id} {
    dartbot-dartboard {
      border: 2px dashed #0002;
    }
  }
</style>
<style>
  #${id} {
    dartbot-dartboard:nth-child(1) {
      aspect-ratio: 1 / 1;
      width: 20em;
    }
    dartbot-dartboard:nth-child(2) {
      aspect-ratio: 21 / 9;
      width: 20em;
    }
  }
</style>
<div id="${id}">
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
</div>
`,
};
