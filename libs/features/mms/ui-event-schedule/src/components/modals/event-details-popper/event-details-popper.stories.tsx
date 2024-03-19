import { useRef, useState } from 'react';
import { Box, Button } from '@mui/material';

import { PopperWithArrow } from '@lths/shared/ui-elements';

import { EventDetailsPopper } from './index';
import { EVENT_TYPE } from '../../../constants';
import { FlagsProviderMock } from '../../../feature-flags';
import { eventTypesMock, getNewEvent } from '../../../mock-events';
import { MMSEvent } from '../../../types';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof EventDetailsPopper> = {
  component: EventDetailsPopper,
  title: 'Features/Calendar/Modals/Event Details Popup',
};
export default Story;

const Template: StoryFn<{ eventA: MMSEvent; eventB: MMSEvent }> = (args) => {
  const buttonRefA = useRef<HTMLButtonElement>(null);
  const buttonRefB = useRef<HTMLButtonElement>(null);
  const popperTargetRef = useRef<HTMLElement>(null);
  const [popperEvent, setPopperEvent] = useState(args.eventA);
  const [popperOpen, setPopperOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const popperPlacement = 'right-start';

  return (
    <FlagsProviderMock>
      <Box display="flex" justifyContent={'space-around'}>
        <Button
          ref={buttonRefA}
          sx={{ m: 2 }}
          color="primary"
          variant="contained"
          size="large"
          onClick={() => {
            // @ts-expect-error - dynamically assigning a new anchor target even though it's "read-only"
            popperTargetRef.current = buttonRefA.current;
            setPopperEvent(args.eventA);
            setPopperOpen(true);
          }}
        >
          OPEN EVENT A
        </Button>
        <Button
          ref={buttonRefB}
          sx={{ m: 2 }}
          color="primary"
          variant="contained"
          size="large"
          onClick={() => {
            // @ts-expect-error - dynamically assigning a new anchor target even though it's "read-only"
            popperTargetRef.current = buttonRefB.current;
            setPopperEvent(args.eventB);
            setPopperOpen(true);
          }}
        >
          OPEN EVENT B
        </Button>
      </Box>
      <PopperWithArrow
        open={popperOpen}
        anchorEl={popperTargetRef.current}
        placement={popperPlacement}
        onClickAway={() => {
          /** do nothing */
        }}
      >
        <EventDetailsPopper
          event={popperEvent}
          eventStates={[
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
          ]}
          onClose={() => setPopperOpen(false)}
          editModalOpen={editModalOpen}
          onSetEditModalOpen={(isOpen: boolean) => setEditModalOpen(isOpen)}
          eventTypes={eventTypesMock}
          onSaveEvent={(values) => {
            console.log('Event Details Saved: ', values);
          }}
          onSaveEventStates={(values) => {
            console.log('Event States Saved : ', values);
          }}
        />
      </PopperWithArrow>
    </FlagsProviderMock>
  );
};

const eventA = getNewEvent({});
const eventB = getNewEvent({});
export const Default = Template.bind({});
Default.args = { eventA, eventB };
