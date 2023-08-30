import { useState } from 'react';
import { Button } from '@mui/material';

import { ImportEventsModal } from './index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof ImportEventsModal> = {
  component: ImportEventsModal,
  title: 'Features/Calendar/Modals/Import Events Modal',
};

export default Story;

const Template: StoryFn<typeof ImportEventsModal> = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        OPEN
      </Button>
      <ImportEventsModal
        open={open}
        onClose={() => setOpen(false)}
        onFilesAdded={(files: FileList) => {
          console.log('Files Added');
          console.log(files);
        }}
      />
    </>
  );
};

export const Default = Template.bind({});
