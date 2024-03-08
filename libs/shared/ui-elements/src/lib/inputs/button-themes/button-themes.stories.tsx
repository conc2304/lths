import { ButtonThemes } from './button-themes';

import type { Meta } from '@storybook/react';

const Story: Meta<typeof ButtonThemes> = {
  component: ButtonThemes,
  title: 'Inputs / Button Themes',
};
export default Story;

export const Primary = {
  args: {
    loadingOn: true,
    startIconOn: false,
    endIconOn: false,
    backgroundColor: 'white',
    inheritColor: 'red',
  },
};
