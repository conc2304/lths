import { useState } from 'react';
import { Box, Button } from '@mui/material';

import { CreateNewEventModal } from './index';
import { eventTypesMock } from '../../../mock-events';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof CreateNewEventModal> = {
  component: CreateNewEventModal,
  title: 'Features/Calendar/Modals/Create New Event Modal',
};

export default Story;

const Template: StoryFn<typeof CreateNewEventModal> = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Box display={'felx'} justifyContent={'center'}>
        <Button color="primary" variant="contained" size="large" onClick={() => setOpen(true)}>
          OPEN
        </Button>
      </Box>

      <CreateNewEventModal
        open={open}
        onCancel={() => setOpen(false)}
        onSave={(values) => console.log('save', values)}
        eventTypes={eventTypesMock}
      />
    </>
  );
};

export const Default = Template.bind({});
