/* eslint-disable */
export default {
  displayName: 'features-mms-ui-editor',
  preset: '../../../../jest.preset.js',
  moduleNameMapper: {
    'swiper/css': 'swiper/swiper.min.css',
  },
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: [
    '/node_modules/(?!swiper|ssr-window|dom7|react-dnd|core-dnd|@react-dnd|dnd-core|react-dnd-html5-backend)',
  ],
  setupFilesAfterEnv: ['../../../../setupTests.js'],
};
