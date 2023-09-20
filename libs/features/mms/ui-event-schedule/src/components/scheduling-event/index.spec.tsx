import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format, getDay, parse, startOfWeek, subHours } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { EventProps, dateFnsLocalizer } from 'react-big-calendar';

import { SchedulingEvent } from './index';
import { eventTypesMock, getNewEvent } from '../../mock-events';

const mockOnSaveEvent = jest.fn();
const mockOnSaveEventStates = jest.fn();

describe('SchedulingEvent', () => {
  const renderWithTheme = (component: JSX.Element) => {
    return render(RBThemeProvider({ children: component }));
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { 'en-US': enUS },
  });

  const RBCEventProps: EventProps = {
    event: getNewEvent({}),
    title: 'Mock Title',
    continuesPrior: false,
    continuesAfter: false,
    isAllDay: false,
    localizer: localizer,
    slotStart: new Date(),
    slotEnd: new Date(),
  };

  it('renders without crashing', () => {
    const testEvent = getNewEvent({});

    renderWithTheme(
      <SchedulingEvent
        {...RBCEventProps}
        event={testEvent}
        view="day"
        eventTypes={eventTypesMock}
        onSaveEvent={mockOnSaveEvent}
        onSaveEventStates={mockOnSaveEventStates}
      />
    );
    expect(screen.getByText(testEvent.title?.toString() as string)).toBeInTheDocument();
  });

  it('shows the event time when view is not month and not in all day row', () => {
    const testEvent = getNewEvent({ isAllDay: false, isToday: true });
    testEvent.start?.setHours(10, 0, 0, 0);
    testEvent.end?.setHours(12, 0, 0, 0);

    renderWithTheme(
      <SchedulingEvent
        {...RBCEventProps}
        event={testEvent}
        view="day"
        eventTypes={eventTypesMock}
        onSaveEvent={mockOnSaveEvent}
        onSaveEventStates={mockOnSaveEventStates}
      />
    );
    expect(screen.getByText('10AM - 12PM PST')).toBeInTheDocument();
  });

  it('shows the "NEW EVENT ADDED" icon banner for new events', () => {
    const testEvent = getNewEvent({ isAllDay: false, isToday: true });

    testEvent.createdOn = subHours(new Date(), 5);

    renderWithTheme(
      <SchedulingEvent
        {...RBCEventProps}
        event={testEvent}
        view="day"
        eventTypes={eventTypesMock}
        onSaveEvent={mockOnSaveEvent}
        onSaveEventStates={mockOnSaveEventStates}
      />
    );
    expect(screen.getByTestId('FiberNewIcon')).toBeInTheDocument();
  });

  it('opens the popper on event click', async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <SchedulingEvent
        {...RBCEventProps}
        event={getNewEvent({})}
        view="day"
        eventTypes={eventTypesMock}
        onSaveEvent={mockOnSaveEvent}
        onSaveEventStates={mockOnSaveEventStates}
      />
    );
    const eventBox = screen.getByTestId('CalendarEvent--click-handler');
    await user.click(eventBox);

    await waitFor(() => {
      expect(within(document.body).getByTestId('Popper-with-arrow--root')).toBeInTheDocument();
    });
  });
});
