import { useState } from 'react';
import { Button } from '@mui/material';

import { SimpleModal } from './index';

import type { StoryFn, Meta } from '@storybook/react';

const Story: Meta<typeof SimpleModal> = {
  component: SimpleModal,
  title: 'Inputs/ Modal/ Simple Modal',
};
export default Story;

const Template: StoryFn<typeof SimpleModal> = (args) => {
  const [open, setOpen] = useState(false);

  args.open = open;
  args.CloseButton = <Button onClick={() => setOpen(false)}>Test Close</Button>;

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>,
      <SimpleModal {...args} />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  title: 'my title',
  ActionButton: <Button>Test Action</Button>,
  children: <div>Modal Content</div>,
};
