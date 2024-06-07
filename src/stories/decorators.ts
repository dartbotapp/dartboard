import { Decorator } from '@storybook/html';

export const baseDecorator: Decorator = (story, context) => {
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
  #${context.name} {
    display: flex;
    column-gap: .25em;
    row-gap: .25em;
    align-items: flex-start;

    dartbot-dartboard {
      ${aspectRatio ? `aspect-ratio: ${aspectRatio};` : ''}
    }
  }
</style>
${out}
`;
};

export const themeDecorator: Decorator = (story, context) => {
  const { parameters } = context;
  const { theme } = parameters;
  return `
<style data-dartbot-remove>
  #${context.name} {
    dartbot-dartboard {
      --dartbot-wire-show: 0;
    }
  }
</style>
${story()}
`;
};

export const zoomDecorator: Decorator = (story, context) => {
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

export const transform = (source: string) => {
  const container = `<div id="dartbot-transform">${source}</div>`;
  const doc = new DOMParser().parseFromString(container, 'text/html');
  const remove = doc.querySelectorAll('[data-dartbot-remove]');
  remove.forEach((el) => el.remove());
  const content = doc.querySelector('#dartbot-transform');
  return content?.innerHTML || source;
};
