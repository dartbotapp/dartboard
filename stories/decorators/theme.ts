import { Decorator } from '@storybook/html';

export const themeDecorator: Decorator = (story, context) => `
<style data-dartbot-remove>
  #${context.name} {
    dartbot-dartboard {
      --dartbot-wire-show: 0;
    }
  }
</style>
${story()}
`;
