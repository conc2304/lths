/* eslint-disable */
export default {
  displayName: 'shared-ui-calendar-scheduler',
  preset: '../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/shared/ui-calendar-scheduler',
  setupFilesAfterEnv: ['./../../../setupTests.js'],
};
