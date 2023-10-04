import { useRef, useState } from 'react';
import { Box, Button } from '@mui/material';

import { PopperWithArrow } from '@lths/shared/ui-elements';

import { EventDetailsPopper } from './index';
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
