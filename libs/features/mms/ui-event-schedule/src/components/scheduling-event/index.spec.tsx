import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format, getDay, parse, startOfWeek, subHours } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { EventProps, dateFnsLocalizer } from 'react-big-calendar';

import { SchedulingEvent } from './index';
import { eventTypesMock, getNewEvent } from '../../mock-events';

const mockOnSaveEvent = jest.fn();
const mockOnSaveEventStates = jest.fn();
const mockOnEventClick = jest.fn();

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const testEvent = getNewEvent({});

    const { container } = renderWithTheme(
      <SchedulingEvent
        {...RBCEventProps}
        event={testEvent}
        view="day"
        eventTypes={eventTypesMock}
        onEventClick={mockOnEventClick}
        onSaveEvent={mockOnSaveEvent}
        onSaveEventStates={mockOnSaveEventStates}
      />
    );
    expect(container.firstChild).toHaveClass('CalendarEvent--root');
    expect(screen.getByText(testEvent.title?.toString() as string)).toBeInTheDocument();
  });

  it('shows the event time when view is not month and not in all day row', async () => {
    const testEvent = {
      title: 'You Make Me Feel Like Dancing: Incubate Content',
      allDay: false,
      start: new Date('2024-03-01T18:00:00.000Z'), // 10AM
      end: new Date('2024-03-01T20:00:00.000Z'), // 12 PM
      id: 'd4dd5aaecfec4e74f39cebef',
      eventId: '76a1ccdef34e3823e6af4715',
      eventType: { id: 'COMEDY', label: 'Comedy' },
      createdBy: 'Carolyn Bashirian',
      createdOn: new Date('2024-03-01T11:08:38.845Z'),
      desc: 'Eum eum nesciunt occaecati cupiditate placeat saepe tenetur expedita reprehenderit. Laudantium possimus sit cupiditate quas mollitia exercitationem.',
    };

    testEvent.start.setHours(10);
    testEvent.end.setHours(12);

    const { getByTestId } = renderWithTheme(
      <SchedulingEvent
        {...RBCEventProps}
        event={testEvent}
        view="day"
        eventTypes={eventTypesMock}
        onSaveEvent={mockOnSaveEvent}
        onSaveEventStates={mockOnSaveEventStates}
        onEventClick={mockOnEventClick}
      />
    );

    expect(getByTestId('CalendarEvent--event-time')).toBeInTheDocument();
    expect(getByTestId('CalendarEvent--event-time').textContent).toContain('10AM - 12PM PST');
    expect(getByTestId('CalendarEvent--text-container')).toBeInTheDocument();
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
        onEventClick={mockOnEventClick}
      />
    );
    expect(screen.getByTestId('FiberNewIcon')).toBeInTheDocument();
  });

  it('calls onEventClick when the event is clicked', async () => {
    const mockEvent = getNewEvent({});
    const user = userEvent.setup();

    renderWithTheme(
      <SchedulingEvent
        {...RBCEventProps}
        event={mockEvent}
        view="day"
        eventTypes={eventTypesMock}
        onSaveEvent={mockOnSaveEvent}
        onSaveEventStates={mockOnSaveEventStates}
        onEventClick={mockOnEventClick}
      />
    );

    const eventBox = screen.getByTestId('CalendarEvent--click-handler');
    expect(mockOnEventClick).not.toHaveBeenCalled();

    await user.click(eventBox);

    await waitFor(() => {
      expect(mockOnEventClick).toHaveBeenLastCalledWith(
        expect.objectContaining({
          eventId: mockEvent.id,
          popperPlacement: expect.any(String),
          anchorEl: expect.any(HTMLElement),
        })
      );
    });
  });
});
