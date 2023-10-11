import { useState } from 'react';
import { Button } from '@mui/material';

import { RenameModal } from './index';

import type { StoryFn, Meta } from '@storybook/react';

const Story: Meta<typeof RenameModal> = {
  component: RenameModal,
  title: 'Inputs/ Modal/ Rename Modal',
};
export default Story;

const Template: StoryFn<typeof RenameModal> = (args) => {
  const [open, setOpen] = useState(false);

  args.open = open;
  args.onClickCancelButton = () => setOpen(false);
  args.onClickOkButton = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>,
      <RenameModal {...args} />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  itemToRename: 'renameThisItem',
};
