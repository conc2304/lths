import { defineConfig } from 'cypress';
import { nxE2EStorybookPreset } from '@nrwl/storybook/presets/cypress';
import { join } from 'path';

export default defineConfig({
  e2e: {
    ...nxE2EStorybookPreset(__dirname),
    supportFile: join(__dirname, 'src', 'testing-utils', 'support', 'e2e.ts'),
  },
});
