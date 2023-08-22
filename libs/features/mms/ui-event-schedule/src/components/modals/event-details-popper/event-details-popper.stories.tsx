import { useRef, useState } from 'react';
import { Box, Button } from '@mui/material';

import { PopperWithArrow } from '@lths/shared/ui-elements';

import { EventDetailsPopper } from './index';
import { eventTypesMock, getNewEvent } from '../../../mock-events';

import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof EventDetailsPopper> = {
  component: EventDetailsPopper,
  title: 'Features/Calendar/Modals/Event Details Popup',
};
export default Story;

const Template: StoryFn<typeof EventDetailsPopper> = (args) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperOpen, setPopperOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const popperPlacement = 'right-start';

  return (
    <>
      <Box display="flex" justifyContent={'center'}>
        <Button
          ref={buttonRef}
          sx={{ m: 2 }}
          color="primary"
          variant="contained"
          size="large"
          onClick={() => setPopperOpen(true)}
        >
          OPEN
        </Button>
      </Box>
      <PopperWithArrow
        open={popperOpen}
        anchorEl={buttonRef.current}
        placement={popperPlacement}
        onClickAway={() => !editModalOpen && setPopperOpen(false)}
      >
        <EventDetailsPopper
          event={args}
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
    </>
  );
};

const event = getNewEvent({});
export const Default = Template.bind({});
Default.args = event;
