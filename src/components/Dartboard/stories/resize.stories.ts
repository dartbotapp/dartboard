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
    column-gap: .25em;
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

export const Multi: Story = {
  name: "Color Wall",
  args: {
    color1: '#00f',
    color2: '#f0b',
    color3: '#0f0'
  },
  argTypes: {
    color1: { control: 'color' },
    color2: { control: 'color' },
    color3: { control: 'color' },
  },
  render: ({ color1, color2, color3 }, {id}) => `
<script>
  window.addEventListener('DOMContentLoaded', () => {
    const interp = (c1, c2, percent) => c1 + percent * (c2 - c1);
    const container = document.getElementById('${id}');
    container.replaceChildren();
    const grid = { width: 16, height: 12 };
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
      const color = \`color-mix(in srgb, $\{'${color1}'\} $\{percent * 100\}%, $\{'${color2}'\})\`;
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
      board.addEventListener('click', () => {
        board.style.setProperty('--dartbot-color', '${color3}');
        board.forceRender();
      });
    });
  });
</script>
<style data-dartbot-remove>
  #${id} {
    /* Create a 16x12 grid */
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-column-gap: .1em;
    --dartbot-number-show: 0;
    --dartbot-wire-show: 0;
  }
</style>
<div id="${id}"></div>
`,
};