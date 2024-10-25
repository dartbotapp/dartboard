import type { StoryObj, Meta } from '@storybook/html';
import { baseTokens, Token } from '../src/theme';
import '../src/dartbot-dartboard';

export type DartboardProps = {
  [token in Token]: string | number | boolean;
};

const meta = {
  title: 'Playground',
  render: () => `<dartbot-dartboard></dartbot-dartboard>`,
  args: {},
} satisfies Meta<DartboardProps>;

export default meta;
type Story = StoryObj<DartboardProps>;

export const Playground: Story = {
  name: 'Playground',
  args: {
    [Token.boardBg]: baseTokens[Token.boardBg],
    [Token.sectorBg1]: baseTokens[Token.sectorBg1],
    [Token.sectorBg2]: baseTokens[Token.sectorBg2],
    [Token.sectorBg3]: baseTokens[Token.sectorBg3],
    [Token.sectorBg4]: baseTokens[Token.sectorBg4],
    [Token.wireShow]: baseTokens[Token.wireShow] === '1',
    [Token.wireWidth]: parseFloat(baseTokens[Token.wireWidth]),
    [Token.wireColor]: baseTokens[Token.wireColor],
    [Token.wireShadowShow]: baseTokens[Token.wireShadowShow] === '1',
    [Token.wireShadowColor]: baseTokens[Token.wireShadowColor],
    [Token.wireShadowBlur]: parseFloat(baseTokens[Token.wireShadowBlur]),
    [Token.wireShadowOffsetX]: parseFloat(baseTokens[Token.wireShadowOffsetX]),
    [Token.wireShadowOffsetY]: parseFloat(baseTokens[Token.wireShadowOffsetY]),
    [Token.wireRingOffset]: parseFloat(baseTokens[Token.wireRingOffset]),
    [Token.numberShow]: baseTokens[Token.numberShow] === '1',
    [Token.numberWidth]: parseFloat(baseTokens[Token.numberWidth]),
    [Token.numberColor]: baseTokens[Token.numberColor],
    [Token.numberInset]: parseFloat(baseTokens[Token.numberInset]),
    [Token.numberWireColor]: baseTokens[Token.numberWireColor],
    [Token.numberWireShow]: baseTokens[Token.numberWireShow] === '1',
    [Token.numberWireWidth]: parseFloat(baseTokens[Token.numberWireWidth]),
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
  },
  render: params => {
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
      <div class="story-playground">
        <dartbot-dartboard></dartbot-dartboard>
      </div>
    `;
    return template;
  },
};
