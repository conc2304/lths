import type { StorybookConfig } from '@storybook/core-common';

const config: StorybookConfig = {
  core: { builder: 'webpack5' },
  stories: ['../../../../**/*.stories.mdx', '../../../../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@nrwl/react/plugins/storybook', '@storybook/addon-knobs'],
  typescript: {
    reactDocgen: false,
  },
} as StorybookConfig;

module.exports = config;
