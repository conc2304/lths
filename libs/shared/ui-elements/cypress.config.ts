import { nxE2EStorybookPreset } from '@nx/storybook/presets/cypress';
import { defineConfig } from 'cypress';
import { join } from 'path';

export default defineConfig({
  e2e: {
    ...nxE2EStorybookPreset(__dirname),
    supportFile: join(__dirname, 'src', 'testing-utils', 'support', 'e2e.ts'),
  },
});
