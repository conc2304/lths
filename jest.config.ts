import { getJestProjects } from '@nx/jest';

export default {
  projects: getJestProjects(),
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/**/src/**/*.@(js|jsx|ts|tsx)',
    // Not Part Of Coverage
    '!<rootDir>/**/src/**/constant?(s).ts',
    '!<rootDir>/**/src/**/index.ts',
    '!<rootDir>/**/src/**/*.@(e2e|cy|stories).(ts|tsx|js|jsx)',
    '!**/mockServiceWorker.js',
  ],
  testTimeout: 20000,
};
