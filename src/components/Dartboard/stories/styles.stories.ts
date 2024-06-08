import type { StoryObj, Meta } from "@storybook/html";
import "../dartbot-dartboard";
import { baseDecorator, transform, zoomDecorator } from '../../../stories/decorators';

export type DartboardProps = {};

const meta = {
  title: "Components/Dartboard",
  decorators: [zoomDecorator, baseDecorator],
  parameters: {
    docs: { source: { transform } }
  }
} satisfies Meta<DartboardProps>;

export default meta;
type Story = StoryObj<DartboardProps>;

export const Default: Story = {
  name: "color-pallets",
  tags: ["hidden"],
  render: () => `<dartbot-dartboard></dartbot-dartboard>`,
};

export const Colors: Story = {
  name: "colors",
  tags: ["hidden"],
  render: (_, {name}) => `
    <style>
      #${name} {
        flex-flow: row wrap;
        dartbot-dartboard {
          width: 33%;
        }
        dartbot-dartboard:nth-child(1) {
          --dartbot-board-bg: #283618;
          --dartbot-sector-bg-1: #606c38;
          --dartbot-sector-bg-2: #fefae0;
          --dartbot-sector-bg-3: #edbf8c;
          --dartbot-sector-bg-4: #bc6c25;
          --dartbot-wire-color: #271300;
          --dartbot-wire-shadow-show: 0;
        }
        dartbot-dartboard:nth-child(2) {
          --dartbot-board-bg: #574133;
          --dartbot-sector-bg-1: #f0ead2;
          --dartbot-sector-bg-3: #22764d;
          --dartbot-sector-bg-2: #4a6d67;
          --dartbot-sector-bg-4: #a53c3c;
          --dartbot-wire-color: #414833;
          --dartbot-wire-shadow-show: 0;
        }
        dartbot-dartboard:nth-child(3) {
          --dartbot-board-bg: #45003c;
          --dartbot-sector-bg-2: #e36414;
          --dartbot-sector-bg-4: #9a031e;
          --dartbot-sector-bg-3: #fb8b24;
          --dartbot-sector-bg-1: #5f0f40;
          --dartbot-wire-color: #000000;
          --dartbot-wire-shadow-show: 0;
          --dartbot-number-wire-color: #ff0092;
          --dartbot-number-color: #ff0092;
        }
        dartbot-dartboard:nth-child(4) {
          --dartbot-board-bg: #ff7b00;
          --dartbot-sector-bg-1: #ffdd00;
          --dartbot-sector-bg-2: #ffa200;
          --dartbot-sector-bg-3: #ffc300;
          --dartbot-sector-bg-4: #ffea00;
          --dartbot-wire-color: #c4580f;
          --dartbot-wire-shadow-show: 0;
          --dartbot-wire-width: 2;
        }
        dartbot-dartboard:nth-child(5) {
          --dartbot-board-bg: #111;
          --dartbot-sector-bg-1: #111;
          --dartbot-sector-bg-2: #eee;
          --dartbot-sector-bg-3: #ddd;
          --dartbot-sector-bg-4: #444;
          --dartbot-wire-color: #fff;
          --dartbot-wire-show: 0;
          --dartbot-wire-ring-offset: 20;
          --dartbot-number-inset: 24;
        }
        dartbot-dartboard:nth-child(6) {
          --dartbot-board-bg: #111;
          --dartbot-sector-bg-1: #111;
          --dartbot-sector-bg-2: #222;
          --dartbot-sector-bg-3: #111;
          --dartbot-sector-bg-4: #222;
          --dartbot-wire-color: #666;
          --dartbot-wire-width: 2;
          --dartbot-number-show: 0;
          --dartbot-wire-shadow-show: 0;
        }
      }
    </style>
    <div id="${name}">
      <dartbot-dartboard></dartbot-dartboard>
      <dartbot-dartboard></dartbot-dartboard>
      <dartbot-dartboard></dartbot-dartboard>
      <dartbot-dartboard></dartbot-dartboard>
      <dartbot-dartboard></dartbot-dartboard>
      <dartbot-dartboard></dartbot-dartboard>
    </div>
  `,
};

export const WireWidth: Story = {
  name: "wire-width",
  tags: ["hidden"],
  render: (_, {name}) => `
<style>
  #${name} {
    dartbot-dartboard:nth-child(1) {
      --dartbot-wire-show: 0;
    }
    dartbot-dartboard:nth-child(2) {
      --dartbot-wire-width: 1;
    }
    dartbot-dartboard:nth-child(3) {
      --dartbot-wire-width: 4;
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

export const WireShadowBlur: Story = {
  name: "shadow-blur",
  tags: ["hidden"],
  parameters: {
    aspectRatio: "16/9",
    zoom: 6
  },
  render: (_, {name}) => `
<style>
  #${name} {
    dartbot-dartboard:nth-child(1) {
      --dartbot-wire-shadow-show: 0;
    }
    dartbot-dartboard:nth-child(2) {
      --dartbot-wire-shadow-blur: 2;
    }
    dartbot-dartboard:nth-child(3) {
      --dartbot-wire-shadow-blur: 6;
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

export const WireShadowOffset: Story = {
  name: "shadow-offset",
  tags: ["hidden"],
  parameters: {
    aspectRatio: "16/9",
    zoom: 6,
  },
  render: (_, {name}) => `
<style>
  #${name} {
    dartbot-dartboard:nth-child(1) {
      --dartbot-wire-shadow-offset-x: 0;
      --dartbot-wire-shadow-offset-y: 0;
    }
    dartbot-dartboard:nth-child(2) {
      --dartbot-wire-shadow-offset-x: 1;
      --dartbot-wire-shadow-offset-y: 1;
    }
    dartbot-dartboard:nth-child(3) {
      --dartbot-wire-shadow-offset-x: 4;
      --dartbot-wire-shadow-offset-y: 4;
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

export const WireRingOffset: Story = {
  name: "ring-offset",
  tags: ["hidden"],
  parameters: {
    aspectRatio: "16/9",
    zoom: 3,
    center: "{ radius: 170, angle: 0.157 }"
  },
  render: (_, {name}) => `
<style>
  #${name} {
    dartbot-dartboard:nth-child(1) {
      --dartbot-wire-ring-offset: 0;
    }
    dartbot-dartboard:nth-child(2) {
      --dartbot-wire-ring-offset: 10;
    }
    dartbot-dartboard:nth-child(3) {
      --dartbot-wire-ring-offset: 25;
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

export const NumberShow: Story = {
  name: "numbers-show",
  tags: ["hidden"],
  parameters: {
    aspectRatio: "1/1"
  },
  render: (_, {name}) => `
<style>
  #${name} {
    dartbot-dartboard:nth-child(1) {
      --dartbot-number-show: 1;
    }
    dartbot-dartboard:nth-child(2) {
      --dartbot-number-show: 1;
      --dartbot-number-wire-show: 0;
      --dartbot-number-inset: 25;
    }
    dartbot-dartboard:nth-child(3) {
      --dartbot-number-show: 0;
      --dartbot-wire-shadow-show: 0;
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

export const NumberInset: Story = {
  name: "numbers-inset",
  tags: ["hidden"],
  parameters: {
    aspectRatio: "16/9",
    zoom: 3,
    center: "{ radius: 170, angle: 0.157 }"
  },
  render: (_, {name}) => `
<style>
  #${name} {
    dartbot-dartboard:nth-child(1) {
      --dartbot-number-inset: 5;
    }
    dartbot-dartboard:nth-child(2) {
      --dartbot-number-inset: 10;
    }
    dartbot-dartboard:nth-child(3) {
      --dartbot-number-inset: 25;
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

export const ColorWall: StoryObj = {
  name: "Color Wall",
  args: {
    color1: '#00f',
    color2: '#f0b',
    color3: '#0fd'
  },
  argTypes: {
    color1: { control: 'color' },
    color2: { control: 'color' },
    color3: { control: 'color' },
  },
  render: ({ color1, color2, color3 }, {id}) => `
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const interp = (c1, c2, percent) => c1 + percent * (c2 - c1);
    const container = document.getElementById('${id}');
    if (container === null) return;
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
    grid-template-columns: repeat(16, 1fr);
    grid-column-gap: .1em;
    --dartbot-number-show: 0;
    --dartbot-wire-show: 0;
  }
</style>
<div id="${id}"></div>
`,
};
