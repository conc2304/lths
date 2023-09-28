const nxPreset = require('@nx/jest/preset').default;
const path = require('path')

module.exports = {
  ...nxPreset,
  /* TODO: Update to latest Jest snapshotFormat
   * By default Nx has kept the older style of Jest Snapshot formats
   * to prevent breaking of any existing tests with snapshots.
   * It's recommend you update to the latest format.
   * You can do this by removing snapshotFormat property
   * and running tests with --update-snapshot flag.
   * Example: "nx affected --targets=test,unit-test --update-snapshot"
   * More info: https://jestjs.io/docs/upgrading-to-jest29#snapshot-format
   */
  snapshotFormat: { escapeString: true, printBasicPrototype: true },
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!react-dnd|dnd-core|@react-dnd|swiper|ssr-window)",
  ],
  testTimeout: 20000
};
