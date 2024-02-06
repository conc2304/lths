import { ForkLeft, UploadFile } from '@mui/icons-material';

import MenuButton from './menu-button';

import type { Meta } from '@storybook/react';

const Story: Meta<typeof MenuButton> = {
  component: MenuButton,
  title: 'Inputs / MenuButton',
  argTypes: {
    color: { control: 'select', options: ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'] },
    startIcon: { control: 'inline-radio', options: [<UploadFile />, undefined], defaultValue: <UploadFile /> },
    endIcon: { control: 'inline-radio', options: [<ForkLeft />, undefined], defaultValue: <ForkLeft /> },
  },
};

export default Story;

export const Primary = {
  args: {
    buttonText: 'Menu Button Demo',
    color: 'primary',
    isLoading: false,
    isDisabled: false,
    startIcon: <UploadFile />,
    endIcon: <ForkLeft />,
    items: [
      {
        id: '0',
        label: 'PUBLISH NOW',
        action: () => alert('Publish clicked'),
      },
      {
        id: '1',
        label: 'UNPUBLISH',
        action: () => alert('Unpublish clicked'),
      },
    ],
  },
};
