import type { StoryObj, Meta } from '@storybook/html';
import { baseDecorator, themeDecorator, transform } from './decorators';
import '../src/dartbot-dartboard';

const meta = {
  title: 'Components/Dartboard',
  decorators: [baseDecorator, themeDecorator],
  parameters: {
    docs: { source: { transform } },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Padding: Story = {
  name: 'story-padding',
  tags: ['hidden'],
  render: (_, { id }) => `
    <style data-dartbot-remove>
    #${id} {
      column-gap: 2px;
      dartbot-dartboard {
        width: 33%;
        border: 2px dashed #0002;
        background: #d0e2cc;
        --dartbot-canvas-bg: #fff;
      }
    }
    </style>
    <style>
      #${id} {
        dartbot-dartboard:nth-child(1) {
          padding: 2%;
        }
        dartbot-dartboard:nth-child(2) {
          padding: 4%;
        }
        dartbot-dartboard:nth-child(3) {
          padding: 8%;
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

export const Margin: Story = {
  name: 'story-margin',
  tags: ['hidden'],
  render: (_, { id }) => `
    <style data-dartbot-remove>
    #${id} {
      background: #f443;
      dartbot-dartboard {
        background: #d0e2cc;
        --dartbot-canvas-bg: #fff;
      }
    }
    </style>
    <style>
      #${id} {
        dartbot-dartboard {
          padding: 2em;
        }
        dartbot-dartboard:nth-child(1) {
          margin: 1em;
        }
        dartbot-dartboard:nth-child(2) {
          margin: 2em;
        }
        dartbot-dartboard:nth-child(3) {
          margin: 4em;
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

export const Border: Story = {
  name: 'story-border',
  tags: ['hidden'],
  render: (_, { id }) => `
    <style data-dartbot-remove>
    #${id} {
      column-gap: .25em;
    }
    </style>
    <style>
      #${id} {
        dartbot-dartboard {
          border: 0 dashed #5500b852;
        }
        dartbot-dartboard:nth-child(1) {
          border-width: .1em;
        }
        dartbot-dartboard:nth-child(2) {
          border-width: 1em;
        }
        dartbot-dartboard:nth-child(3) {
          border-width: 4em;
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

export const Filters: Story = {
  name: 'story-filters',
  tags: ['hidden'],
  render: (_, { id }) => `
    <style data-dartbot-remove>
      #${id} {
        dartbot-dartboard {
          transition: filter .5s;
        }
      }
    </style>
    <style>
      #${id} {
        dartbot-dartboard:hover {
          filter: unset!important;
        }
        dartbot-dartboard:nth-child(1) {
          filter: blur(.25em);
        }
        dartbot-dartboard:nth-child(2) {
          filter: drop-shadow(2px 2px 10px black);
        }
        dartbot-dartboard:nth-child(3) {
          filter: opacity(.2);
        }
        dartbot-dartboard:nth-child(4) {
          filter: invert(1);
        }
      }
    </style>
    <div id="${id}">
      <dartbot-dartboard></dartbot-dartboard>
      <dartbot-dartboard></dartbot-dartboard>
      <dartbot-dartboard></dartbot-dartboard>
      <dartbot-dartboard></dartbot-dartboard>
    </div>
  `,
};

export const Transform: Story = {
  name: 'story-transform',
  tags: ['hidden'],
  render: (_, { id }) => `
    <style data-dartbot-remove>
      #${id} {
        overflow: hidden;
        dartbot-dartboard {
          transition: transform .5s ease-out;
        }
      }
    </style>
    <style>
      #${id} {
        dartbot-dartboard:hover {
          transform: unset!important;
        }
        dartbot-dartboard:nth-child(1) {
          transform: rotate(180deg);
        }
        dartbot-dartboard:nth-child(2) {
          transform: rotate3d(0, 1, 0, 240deg)
        }
        dartbot-dartboard:nth-child(3) {
          transform: skew(10deg, 5deg);
        }
        dartbot-dartboard:nth-child(4) {
          transform: scale(1.2);
        }
      }
    </style>
    <div id="${id}">
      <dartbot-dartboard></dartbot-dartboard>
      <dartbot-dartboard></dartbot-dartboard>
      <dartbot-dartboard></dartbot-dartboard>
      <dartbot-dartboard></dartbot-dartboard>
    </div>
  `,
};
