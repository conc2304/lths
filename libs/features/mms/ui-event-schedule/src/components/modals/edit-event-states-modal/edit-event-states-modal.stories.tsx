import { useState } from 'react';
import { Button } from '@mui/material';

import { EditEventStatesModal, EditEventStatesModalProps } from './index';
import { getNewEvent } from '../../../mock-events';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof EditEventStatesModal> = {
  component: EditEventStatesModal,
  title: 'Features/Calendar/Modals/Edit Event States Popup',
};

export default Story;

const Template: StoryFn<typeof EditEventStatesModal> = (args: EditEventStatesModalProps) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        OPEN
      </Button>
      <EditEventStatesModal
        eventData={args.eventData}
        open={open}
        onCancel={() => setOpen(false)}
        onSave={(values) => console.log('save', values)}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  eventData: getNewEvent({}),
};
