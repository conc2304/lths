import { useState } from 'react';
import { Button } from '@mui/material';

import { ArchiveModal } from './index';

import type { StoryFn, Meta } from '@storybook/react';

const Story: Meta<typeof ArchiveModal> = {
  component: ArchiveModal,
  title: 'Inputs/ Modal/ Delete Modal',
};
export default Story;

const Template: StoryFn<typeof ArchiveModal> = (args) => {
  const [open, setOpen] = useState(false);

  args.open = open;
  args.onClickKeepButton = () => setOpen(false);
  args.onClickDeleteButton = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>,
      <ArchiveModal {...args} />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  itemToDelete: 'nameOfItem',
};
