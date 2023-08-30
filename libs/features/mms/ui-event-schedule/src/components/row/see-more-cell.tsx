import { MouseEvent, useRef, useState } from 'react';
import { Box, Button, PopperPlacementType } from '@mui/material';
import { MoreVertRounded } from '@mui/icons-material';

import { PopperWithArrow } from '@lths/shared/ui-elements';

import { EventFormValues, EventState, EventType, MMSEvent } from '../../types';
import { EventDetailsPopper } from '../modals/event-details-popper';

type SeeMoreCellProps = {
  event: MMSEvent;
  eventTypes: EventType[];
  onSaveEvent: (values: EventFormValues, id: string | number | null) => void;
  onSaveEventStates: (updatedEventStates: EventState[]) => void;
};

export const SeeMoreCell = (props: SeeMoreCellProps) => {
  const { onSaveEvent, onSaveEventStates, eventTypes, event } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperOpen, setPopperOpen] = useState(false);
  const [popperPlacement, setPopperPlacement] = useState<PopperPlacementType>('auto');
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEventClick = (e: MouseEvent) => {
    e.stopPropagation();
    const { clientX, clientY } = e;
    const clientWidth = window.innerWidth;
    const clientHeight = window.innerHeight;

    const xPos = clientX > clientWidth / 2 ? 'left' : 'right';
    const yPos = clientY > clientHeight / 2 ? 'end' : 'start';
    const placement: PopperPlacementType = `${xPos}-${yPos}`;
    setPopperPlacement(placement);
    setPopperOpen(!popperOpen);
  };

  return (
    <Box>
      <Button
        ref={buttonRef}
        onClick={handleEventClick}
        size="small"
        sx={{
          color: '#FFF',
          backgroundColor: '#FFF',
          px: 0,
          width: '1.75rem',
          height: '1.6875rem',
          minWidth: 'unset',
          border: (theme) => `1px solid ${theme.palette.grey[400]}`,
          boxShadow: '0px 2px 4px 0px #00000040',
          '&:hover': {
            backgroundColor: '#FFF',
            boxShadow: '0px 4px 8px 0px #00000040',
          },
        }}
      >
        <MoreVertRounded htmlColor="black" fontSize="small" />
      </Button>

      <PopperWithArrow
        open={popperOpen}
        anchorEl={buttonRef.current}
        placement={popperPlacement}
        onClickAway={() => !editModalOpen && setPopperOpen(false)}
      >
        <EventDetailsPopper
          event={event}
          onClose={() => setPopperOpen(false)}
          editModalOpen={editModalOpen}
          onSetEditModalOpen={(isOpen: boolean) => setEditModalOpen(isOpen)}
          eventTypes={eventTypes}
          onSaveEvent={onSaveEvent}
          onSaveEventStates={onSaveEventStates}
        />
      </PopperWithArrow>
    </Box>
  );
};
