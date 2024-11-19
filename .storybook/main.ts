import type { StorybookConfig } from '@storybook/html-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  staticDirs: ['../storybook-public'],
  tags: {
    hidden: {
      excludeFromSidebar: true,
      excludeFromDocsStories: true,
    },
  },
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    {
      name: '@storybook/manager-api',
      options: {
        sidebar: {
          filters: {
            patterns: item => {
              return !item?.tags?.includes('hidden');
            },
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
};
export default config;

import { addons } from '@storybook/manager-api';

addons.setConfig({
  sidebar: {
    filters: {
      patterns: item => {
        return !item?.tags?.includes('hidden');
      },
    },
  },
});
