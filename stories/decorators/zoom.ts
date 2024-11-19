import { Decorator } from '@storybook/html';

export const zoomDecorator: Decorator = (story, context) => {
  const { parameters, id } = context;
  const { zoom, center } = parameters;
  if (!zoom && !center) {
    return `${story()}`;
  }
  return `
<script data-dartbot-remove>
  document.addEventListener('DOMContentLoaded', () => {
    const selector = '#${id} dartbot-dartboard';
    const boards = document.querySelectorAll(selector);
    boards?.forEach((board) => {
      ${zoom ? `board.zoom = ${zoom};` : ''}
      ${center ? `board.centerPoint = ${center};` : ''}
    });
  });
</script>
${story()}
`;
};
