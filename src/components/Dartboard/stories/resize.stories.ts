import type { StoryObj, Meta } from '@storybook/html';
import '../dartbot-dartboard';
import { baseDecorator, themeDecorator, transform } from '../../../stories/decorators';

const meta = {
  title: 'Components/Dartboard',
  decorators: [baseDecorator, themeDecorator],
  parameters: {
    docs: { source: { transform } }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Dimensions: Story = {
  name: "story-dimensions",
  tags: ["hidden"],
  render: (_, {name}) => `
<style data-dartbot-remove>
  #${name} {
    dartbot-dartboard {
      border: .1em dashed #0002;
    }
  }
</style>
<style>
  #${name} {
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
<div id="${name}">
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
</div>
`,
};

export const Dynamic: Story = {
  name: "Resize",
  decorators: [],
  render: (_, {name}) => `
<style data-dartbot-remove>
#${name} {
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
  #${name} {
    overflow: auto;
    resize: both;
    width: 30em;
  }
</style>
<p>Click and drag the bottom right corner of the container to resize it.</p>
<div id="${name}">
  <dartbot-dartboard></dartbot-dartboard>
</div>
  `,
};

export const Width: Story = {
  name: "story-width",
  tags: ["hidden"],
  decorators: [],
  render: (_, {name}) => `
<style data-dartbot-remove>
  #${name} {
    dartbot-dartboard {
      border: 2px dashed #0002;
    }
  }
</style>
<style>
  #${name} {
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
<div id="${name}">
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
</div>
`,
};

export const AspectRatio: Story = {
  name: "story-aspect",
  tags: ["hidden"],
  render: (_, {name}) => `
<style data-dartbot-remove>
  #${name} {
    dartbot-dartboard {
      border: 2px dashed #0002;
    }
  }
</style>
<style>
  #${name} {
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
<div id="${name}">
  <dartbot-dartboard></dartbot-dartboard>
  <dartbot-dartboard></dartbot-dartboard>
</div>
`,
};
