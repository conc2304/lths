import { useState } from 'react';
import { Box, Button } from '@mui/material';

import { EditEventModal, EditEventModalProps } from './index';
import { eventTypesMock, getNewEvent } from '../../../mock-events';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof EditEventModal> = {
  component: EditEventModal,
  title: 'Features/Calendar/Modals/Edit Event Modal',
};

export default Story;

const Template: StoryFn<typeof EditEventModal> = (args: EditEventModalProps) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Box display={'felx'} justifyContent={'center'}>
        <Button color="primary" variant="contained" size="large" onClick={() => setOpen(true)}>
          OPEN
        </Button>
      </Box>

      <EditEventModal
        event={args.event}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onSave={(values) => {
          console.log('save', values);
          setOpen(false);
        }}
        eventTypes={eventTypesMock}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  event: getNewEvent({ eventTypeID: 'promotion' }),
};
