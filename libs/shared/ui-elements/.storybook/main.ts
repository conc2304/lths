import type { StorybookConfig } from '@storybook/react-webpack5';
const config: StorybookConfig = {
  core: {},
  stories: ['../src/lib/**/*.stories.mdx', '../src/lib/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@nx/react/plugins/storybook', '@storybook/addon-knobs'],
  typescript: {
    reactDocgen: false,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
module.exports = config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
