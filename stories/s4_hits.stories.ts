import type { StoryObj, Meta } from '@storybook/html';
import { baseDecorator, themeDecorator, transform } from './decorators';
import '../src/dartbot-dartboard';

const meta = {
  title: 'Hits',
  decorators: [baseDecorator, themeDecorator],
  parameters: {
    docs: { source: { transform } },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Click: Story = {
  name: 'story-click',
  tags: ['hidden'],
  render: (_, { name }) => `
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
