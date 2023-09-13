import { MouseEventHandler, useRef, useState } from 'react';
import { PopperPlacementType, TableCell, TableRow } from '@mui/material';

import { RowBuilderProps } from '@lths/shared/ui-calendar-scheduler';
import { PopperWithArrow } from '@lths/shared/ui-elements';

import { CalendarEventTableCell } from './render-cell';
import { EventFormValues, EventState, EventType, MMSEvent } from '../../types';
import { EventDetailsPopper } from '../modals/event-details-popper';

export type RowProps = RowBuilderProps & {
  eventTypes: EventType[];
  onSaveEvent: (values: EventFormValues, id: string | number | null) => void;
  onSaveEventStates: (updatedEventStates: EventState[]) => void;
};

export const Row = (props: RowProps) => {
  const { headerCells, eventTypes, onSaveEvent, onSaveEventStates } = props;
  const event = props.event as MMSEvent;

  const popperTargetRef = useRef<HTMLElement>(null);
  const [popperOpen, setPopperOpen] = useState(false);
  const [popperPlacement, setPopperPlacement] = useState<PopperPlacementType>('auto');
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEventClick: MouseEventHandler<HTMLTableRowElement> = (e) => {
    if (popperOpen) return;

    e.stopPropagation();

    // hacky but need to update the ref to the clicked table cell so that the popper opens next to it
    const target = e.target;
    const cellParent = (target as HTMLElement).closest('.Calendar--table-view-cell');
    // @ts-expect-error - dynamically assigning a new anchor target even though it's "read-only"
    popperTargetRef.current = cellParent || target;

    const { clientX, clientY } = e;
    const clientWidth = window.innerWidth;
    const clientHeight = window.innerHeight;

    const xPos = clientX > clientWidth / 2 ? 'left' : 'right';
    const yPos = clientY > clientHeight / 2 ? 'end' : 'start';
    const placement: PopperPlacementType = `${xPos}-${yPos}`;

    setPopperPlacement(placement);
    setPopperOpen(true);
  };

  return (
    <>
      <TableRow
        tabIndex={-1}
        key={`tr-${event.id}`}
        role="row"
        sx={{
          height: '5.6rem',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '5px 0 0 0 #ccc inset',
          },
        }}
        onClick={handleEventClick}
      >
        {headerCells.map((column) => (
          <TableCell
            key={`tc-${column.id}`}
            className="Calendar--table-view-cell"
            sx={{ fontSize: '0.75rem', color: '#000' }}
          >
            <CalendarEventTableCell colId={column.id} event={event} eventTypes={eventTypes} />
          </TableCell>
        ))}
      </TableRow>
      <PopperWithArrow
        open={popperOpen}
        anchorEl={popperTargetRef.current}
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
    </>
  );
};
