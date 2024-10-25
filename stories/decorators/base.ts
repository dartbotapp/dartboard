import { Decorator } from '@storybook/html';

export const baseDecorator: Decorator = (story, context) => {
  const { parameters } = context;
  const { aspectRatio } = parameters;
  const content = story() as string;
  const storyIdInner = `story--${context.id}-inner > div`;
  const doc = new DOMParser().parseFromString(content, 'text/html');
  const divs = doc.querySelectorAll(':scope > div');
  divs.forEach(div => div.classList.add(storyIdInner));
  const out = content;
  return `
<style data-dartbot-remove>
  #${context.id} {
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
