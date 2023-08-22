import { useState } from 'react';
import { Button } from '@mui/material';

import { ExportEventsModal } from './index';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof ExportEventsModal> = {
  component: ExportEventsModal,
  title: 'Features/Calendar/Modals/Export Events Modal',
};

export default Story;

const Template: StoryFn<typeof ExportEventsModal> = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        OPEN
      </Button>
      <ExportEventsModal
        open={open}
        onClose={() => setOpen(false)}
        onExportEvents={() => console.log('Export Events')}
      />
    </>
  );
};

export const Default = Template.bind({});
