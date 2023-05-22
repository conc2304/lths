import type { StorybookConfig } from '@storybook/react-webpack5';
const config: StorybookConfig = {
  core: {},
  stories: ['../../../../{libs,apps}/**/*.stories.@(js|jsx|ts|tsx)'],
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
