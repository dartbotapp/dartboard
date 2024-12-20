import type { StoryObj, Meta } from '@storybook/html';
import { withActions } from '@storybook/addon-actions/decorator';
import { tokenDefaults, Token } from '../src/theme';
import '../src/dartbot-dartboard';

export type DartboardProps = {
  [token in Token]: string | number | boolean;
};

const meta = {
  title: 'Playground',
  render: () => `<dartbot-dartboard></dartbot-dartboard>`,
  args: {},
  decorators: [withActions],
  parameters: {
    actions: {
      handles: [
        'dartboard-click',
        'dartboard-pointerdown',
        'dartboard-pointerup',
      ],
    },
  },
} satisfies Meta<DartboardProps>;

export default meta;
type Story = StoryObj<DartboardProps>;

export const Playground: Story = {
  name: 'Playground',
  args: {
    [Token.boardBg]: tokenDefaults[Token.boardBg],
    [Token.sectorBg1]: tokenDefaults[Token.sectorBg1],
    [Token.sectorBg2]: tokenDefaults[Token.sectorBg2],
    [Token.sectorBg3]: tokenDefaults[Token.sectorBg3],
    [Token.sectorBg4]: tokenDefaults[Token.sectorBg4],
    [Token.wireShow]: tokenDefaults[Token.wireShow] === '1',
    [Token.wireWidth]: parseFloat(tokenDefaults[Token.wireWidth]),
    [Token.wireColor]: tokenDefaults[Token.wireColor],
    [Token.wireShadowShow]: tokenDefaults[Token.wireShadowShow] === '1',
    [Token.wireShadowColor]: tokenDefaults[Token.wireShadowColor],
    [Token.wireShadowBlur]: parseFloat(tokenDefaults[Token.wireShadowBlur]),
    [Token.wireShadowOffsetX]: parseFloat(
      tokenDefaults[Token.wireShadowOffsetX],
    ),
    [Token.wireShadowOffsetY]: parseFloat(
      tokenDefaults[Token.wireShadowOffsetY],
    ),
    [Token.wireRingOffset]: parseFloat(tokenDefaults[Token.wireRingOffset]),
    [Token.numberShow]: tokenDefaults[Token.numberShow] === '1',
    [Token.numberWidth]: parseFloat(tokenDefaults[Token.numberWidth]),
    [Token.numberColor]: tokenDefaults[Token.numberColor],
    [Token.numberInset]: parseFloat(tokenDefaults[Token.numberInset]),
    [Token.numberWireColor]: tokenDefaults[Token.numberWireColor],
    [Token.numberWireShow]: tokenDefaults[Token.numberWireShow] === '1',
    [Token.numberWireWidth]: parseFloat(tokenDefaults[Token.numberWireWidth]),
    [Token.hitRadius]: parseFloat(tokenDefaults[Token.hitRadius]),
    [Token.hitFillColor]: tokenDefaults[Token.hitFillColor],
    [Token.hitStokeColor]: tokenDefaults[Token.hitStokeColor],
    [Token.hitStrokeWidth]: parseFloat(tokenDefaults[Token.hitStrokeWidth]),
  },
  argTypes: {
    [Token.boardBg]: {
      description: 'Background color of the board',
      control: { type: 'color' },
    },
    [Token.sectorBg1]: {
      description: 'Board sector color 1',
      control: { type: 'color' },
    },
    [Token.sectorBg2]: {
      description: 'Board sector color 2',
      control: { type: 'color' },
    },
    [Token.sectorBg3]: {
      description: 'Board sector color 3',
      control: { type: 'color' },
    },
    [Token.sectorBg4]: {
      description: 'Board sector color 4',
      control: { type: 'color' },
    },
    [Token.wireShow]: { description: 'Show the wire between sections' },
    [Token.wireColor]: {
      description: 'Color of the wire',
      control: { type: 'color' },
    },
    [Token.wireWidth]: {
      description: 'Width of the wire',
      control: { type: 'number' },
    },
    [Token.wireShadowShow]: {
      description: 'Show a drop shadow under the wire',
    },
    [Token.wireShadowColor]: {
      description: 'Color of the wire shadow',
      control: { type: 'color' },
    },
    [Token.wireShadowBlur]: { description: 'Blur radius of the wire shadow' },
    [Token.wireShadowOffsetX]: { description: 'X offset of the wire shadow' },
    [Token.wireShadowOffsetY]: { description: 'Y offset of the wire shadow' },
    [Token.wireRingOffset]: {
      description: 'Distance the wire should extend outside the last ring',
    },
    [Token.numberShow]: {
      description: 'Show the sector numbers around the edge of the board',
    },
    [Token.numberColor]: {
      description: 'Color of the sector numbers',
      control: { type: 'color' },
    },
    [Token.numberWidth]: {
      description: 'Width of the line stroke for numbers',
    },
    [Token.numberInset]: {
      description:
        'Distance the numbers should be inset from the edge of the board',
    },
    [Token.numberWireShow]: {
      description: 'Show the outer ring wire around the numbers',
    },
    [Token.numberWireColor]: {
      description: 'Color of the number wire',
      control: { type: 'color' },
    },
    [Token.numberWireWidth]: {
      description: 'Width of the line stroke for the number wire',
    },
    [Token.hitRadius]: {
      description: 'Radius of the hit marker',
      control: { type: 'number' },
    },
    [Token.hitFillColor]: {
      description: 'Fill color of the hit marker',
      control: { type: 'color' },
    },
    [Token.hitStokeColor]: {
      description: 'Stroke color of the hit marker',
      control: { type: 'color' },
    },
    [Token.hitStrokeWidth]: {
      description: 'Width of the stroke of the hit marker',
      control: { type: 'number' },
    },
  },
  render: (params, { id }) => {
    const style = `
      .story-playground {
        dartbot-dartboard
          ${Token.boardBg}: ${params[Token.boardBg]};
          ${Token.sectorBg1}: ${params[Token.sectorBg1]};
          ${Token.sectorBg2}: ${params[Token.sectorBg2]};
          ${Token.sectorBg3}: ${params[Token.sectorBg3]};
          ${Token.sectorBg4}: ${params[Token.sectorBg4]};
          ${Token.wireShow}: ${params[Token.wireShow] ? '1' : '0'};
          ${Token.wireColor}: ${params[Token.wireColor]};
          ${Token.wireWidth}: ${params[Token.wireWidth]};
          ${Token.wireShadowShow}: ${params[Token.wireShadowShow] ? '1' : '0'};
          ${Token.wireShadowColor}: ${params[Token.wireShadowColor]};
          ${Token.wireShadowBlur}: ${params[Token.wireShadowBlur]};
          ${Token.wireShadowOffsetX}: ${params[Token.wireShadowOffsetX]};
          ${Token.wireShadowOffsetY}: ${params[Token.wireShadowOffsetY]};
          ${Token.wireRingOffset}: ${params[Token.wireRingOffset]};
          ${Token.numberShow}: ${params[Token.numberShow] ? '1' : '0'};
          ${Token.numberColor}: ${params[Token.numberColor]};
          ${Token.numberWidth}: ${params[Token.numberWidth]};
          ${Token.numberInset}: ${params[Token.numberInset]};
          ${Token.numberWireShow}: ${params[Token.numberWireShow] ? '1' : '0'};
          ${Token.numberWireColor}: ${params[Token.numberWireColor]};
          ${Token.numberWireWidth}: ${params[Token.numberWireWidth]};
          ${Token.hitRadius}: ${params[Token.hitRadius]};
          ${Token.hitFillColor}: ${params[Token.hitFillColor]};
          ${Token.hitStokeColor}: ${params[Token.hitStokeColor]};
          ${Token.hitStrokeWidth}: ${params[Token.hitStrokeWidth]};
        }
      }
    `;
    const template = `
      <style>
        dartbot-dartboard {
          width: 100%;
          height: unset;
          aspect-ratio: 1 / 1;
          padding: 0rem;
          --dartbot-fit: cover;
        }
      </style>
      <style>${style}</style>

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

      <div id="${id}" class="story-playground">
        <dartbot-dartboard></dartbot-dartboard>
      </div>
    `;
    return template;
  },
};
