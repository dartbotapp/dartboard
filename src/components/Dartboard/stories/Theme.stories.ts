import type { StoryObj, Meta, Decorator } from "@storybook/html";
import "../dartbot-dartboard";

const transform = (source: string, story: any) => {
  console.log(`transforming ${story.name}`);
  const doc = new DOMParser().parseFromString(`<div id="dartbot-transform">${source}</div>`, 'text/html');
  const remove = doc.querySelectorAll('[data-dartbot-remove]');
  remove.forEach((el) => el.remove());
  const content = doc.querySelector('#dartbot-transform');
  return content?.innerHTML || source;
};

const baseDecorator: Decorator = (story, context) => {
  console.log(`base decorating ${context.name}`);
  const { parameters } = context;
  const { aspectRatio } = parameters;
  const content = story() as string;
  const storyIdInner = `story--${context.id}-inner > div`;
  const doc = new DOMParser().parseFromString(content, 'text/html');
  const divs = doc.querySelectorAll(':scope > div');
  divs.forEach((div) => {
    div.classList.add(storyIdInner);
  });
  const out = content;
  return `
<style data-dartbot-remove>
  #${storyIdInner} {
    display: flex;
    dartbot-dartboard {
      padding-left: .5em;
      padding-right: .5em;
      ${aspectRatio ? `aspect-ratio: ${aspectRatio};` : ''}
    }
  }
</style>
${out}
`;
};

const zoomDecorator: Decorator = (story, context) => {
  console.log(`zoom decorating ${context.name}`);
  const { parameters, name } = context;
  const { zoom, center } = parameters;
  return `
<script data-dartbot-remove>
  console.log('zoom attach');
  document.addEventListener('DOMContentLoaded', () => {
    const selector = '[data-name="${name}"] dartbot-dartboard';
    const boards = document.querySelectorAll(selector);
    boards?.forEach((board) => {
      console.log('setting zoom and center');
      board.zoom = ${zoom};
      board.centerPoint = ${center};
    });
  });
</script>
${story()}
`
};

export type DartboardProps = {};

const meta = {
  title: "Components/Dartboard",
  render: () => {
    return `<dartbot-dartboard></dartbot-dartboard>`;
  },
  argTypes: {},
  args: {},
} satisfies Meta<DartboardProps>;

export default meta;
type Story = StoryObj<DartboardProps>;

export const ColorPallets: Story = {
  name: "color-pallets",
  tags: ["hidden"],
  render: () => `<dartbot-dartboard></dartbot-dartboard>`,
};

export const Colors: Story = {
  name: "colors",
  tags: ["hidden"],
  parameters: {
    docs: { source: { transform } }
  },
  decorators: [zoomDecorator, baseDecorator],
  render: (_, {name}) => `
    <style>
      #${name} {
        flex-flow: row wrap;

        dartbot-dartboard {
          width: 33%;


          animation-duration: infinite;
          animation-name: slidein;
          animation-iteration-count: 3;
          animation-direction: alternate;


          @keyframes slidein {
            from {
              margin-left: 100%;
              width: 300%;
            }

            to {
              margin-left: 0%;
              width: 100%;
            }
          }
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
  parameters: {
    docs: { source: { transform } }
  },
  decorators: [zoomDecorator, baseDecorator],
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
    zoom: 6,
    docs: { source: { transform } }
  },
  decorators: [zoomDecorator, baseDecorator],
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
    docs: { source: { transform } }
  },
  decorators: [zoomDecorator, baseDecorator],
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
    center: "{ radius: 170, angle: 0.157 }",
    docs: { source: { transform } }
  },
  decorators: [zoomDecorator, baseDecorator],
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
    aspectRatio: "1/1",
    docs: { source: { transform } }
  },
  decorators: [zoomDecorator, baseDecorator],
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
    center: "{ radius: 170, angle: 0.157 }",
    docs: { source: { transform } },
  },
  decorators: [zoomDecorator, baseDecorator],
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
