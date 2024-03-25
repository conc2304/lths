import { useState } from 'react';
import { Button } from '@mui/material';

import { EditEventStatesModal, EditEventStatesModalProps } from './index';
import { EVENT_TYPE } from '../../../constants';
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
        eventStates={args.eventStates}
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
  eventStates: [
    {
      id: '65b04839f5f829a38a0973c3',
      name: '[PRE-GAME]: Nashville @ Anaheim',
      eventId: '2023020922',
      start: '2024-02-25T21:00:00.000Z',
      end: '2024-02-26T01:00:00.000Z',
      duration: 14400,
      label: 'Pre-Event',
      desc: 'before event start',
      typeDependency: {
        relativeState: EVENT_TYPE.POST_GAME,
        referencePoint: 'start',
        dependentPoint: 'start',
      },
      relativeOffsetHrs: 4,
      type: EVENT_TYPE.PRE_GAME,
    },
    {
      id: '65b04839f5f829a38a0973bf',
      name: 'Nashville @ Anaheim',
      eventId: '2023020922',
      start: '2024-02-26T01:00:00.000Z',
      end: '2024-02-26T03:30:00.000Z',
      duration: 9000,
      label: 'In-Event',
      desc: 'Event hours',
      typeDependency: {
        relativeState: null,
        referencePoint: null,
        dependentPoint: null,
      },
      relativeOffsetHrs: null,
      source: '645b95f5a870733a59a018fc',
      type: EVENT_TYPE.POST_GAME,
    },
    {
      id: '65b04839f5f829a38a0973c7',
      name: '[POST-GAME]: Nashville @ Anaheim',
      eventId: '2023020922',
      start: '2024-02-26T03:30:00.000Z',
      end: '2024-02-26T05:30:00.000Z',
      duration: 7200,
      label: 'Post-Event',
      desc: 'after event end',
      typeDependency: {
        relativeState: EVENT_TYPE.GAME,
        referencePoint: 'end',
        dependentPoint: 'end',
      },
      relativeOffsetHrs: 2,
      type: EVENT_TYPE.POST_GAME,
    },
  ],
};
