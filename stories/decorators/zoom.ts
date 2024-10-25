import { Decorator } from '@storybook/html';

export const zoomDecorator: Decorator = (story, context) => {
  const { parameters, id } = context;
  const { zoom, center } = parameters;
  return `
<script data-dartbot-remove>
  console.log('zoom attach');
  document.addEventListener('DOMContentLoaded', () => {
    const selector = '#${context.id} dartbot-dartboard';
    const boards = document.querySelectorAll(selector);
    boards?.forEach((board) => {
      console.log('setting zoom and center');
      board.zoom = ${zoom};
      board.centerPoint = ${center};
    });
  });
</script>
${story()}
`;
};
