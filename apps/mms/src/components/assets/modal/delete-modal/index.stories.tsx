import { useState } from 'react';
import { Button } from '@mui/material';

import { DeleteModal } from './index';

import type { StoryFn, Meta } from '@storybook/react';

const Story: Meta<typeof DeleteModal> = {
  component: DeleteModal,
  title: 'Inputs/ Modal/ Delete Modal',
};
export default Story;

const Template: StoryFn<typeof DeleteModal> = (args) => {
  const [open, setOpen] = useState(false);

  args.open = open;
  args.onClickKeepButton = () => setOpen(false);
  args.onClickDeleteButton = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>,
      <DeleteModal {...args} />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  itemToDelete: 'nameOfItem',
};
