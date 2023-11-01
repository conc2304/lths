import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Event, dateFnsLocalizer } from 'react-big-calendar';

import { SeeMore } from './see-more';

describe('SeeMore', () => {
  const mockLocalizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { 'en-US': enUS },
  });

  const mockOnDateClick = jest.fn();
  const mockOnEventClick = jest.fn();
  const mockOnClose = jest.fn();

  it('renders day of the week and day number based on selected date', () => {
    const mockDate = new Date(2023, 9, 23); // Monday October 23, 2023
    const { getByText } = render(
      <SeeMore
        selectedDate={mockDate}
        events={[]}
        localizer={mockLocalizer}
        onDateClick={mockOnDateClick}
        onEventClick={mockOnEventClick}
        onClose={mockOnClose}
        eventRenderer={null}
      />
    );

    expect(getByText('Mon')).toBeInTheDocument();
    expect(getByText('23')).toBeInTheDocument();
  });

  it('renders a close button and triggers onClose when clicked', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <SeeMore
        selectedDate={new Date()}
        events={[]}
        localizer={mockLocalizer}
        onDateClick={mockOnDateClick}
        onClose={onCloseMock}
      />
    );

    const closeButton = getByTestId('Close-Button--root');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('renders custom event component if provided', () => {
    const mockEvent = { title: 'Test Event' };
    const CustomEventComponent = ({ event }: { event: Event }) => <div>{event.title}</div>;

    const { getByText } = render(
      <SeeMore
        selectedDate={new Date()}
        events={[mockEvent]}
        localizer={mockLocalizer}
        onDateClick={mockOnDateClick}
        onClose={mockOnClose}
        eventRenderer={CustomEventComponent}
      />
    );

    expect(getByText('Test Event')).toBeInTheDocument();
  });

  it('renders default event item if no custom component provided', () => {
    const mockEvent = { title: 'Default Event' };

    const { getByText } = render(
      <SeeMore
        selectedDate={new Date()}
        events={[mockEvent]}
        localizer={mockLocalizer}
        onDateClick={mockOnDateClick}
        onClose={mockOnClose}
      />
    );

    expect(getByText('Default Event')).toBeInTheDocument();
  });

  it('triggers onDateClick when the date button is clicked', () => {
    const onDateClickMock = jest.fn();
    const mockDate = new Date('2022-10-24');
    const { getByTestId } = render(
      <SeeMore
        selectedDate={mockDate}
        events={[]}
        localizer={mockLocalizer}
        onDateClick={onDateClickMock}
        onClose={mockOnClose}
        eventRenderer={null}
      />
    );

    const dateButton = getByTestId('SeeMore--dateButton');
    fireEvent.click(dateButton);
    expect(onDateClickMock).toHaveBeenCalledWith(new Date(mockDate));
  });

  it('renders message if there are no events', () => {
    const mockDate = new Date('2022-10-24');
    const { getByText } = render(
      <SeeMore
        selectedDate={mockDate}
        events={[]}
        localizer={mockLocalizer}
        onDateClick={mockOnDateClick}
        onClose={mockOnClose}
      />
    );

    expect(getByText('There are no events scheduled on this day.')).toBeInTheDocument();
  });

  it('calls onEventClick when ListItemButton is clicked', () => {
    const mockEvent = { title: 'Test Event' };
    const mockDate = new Date('2022-10-24');
    const { getByText } = render(
      <SeeMore
        selectedDate={mockDate}
        events={[mockEvent]}
        onEventClick={mockOnEventClick}
        localizer={mockLocalizer}
        eventRenderer={null} // For this test, we want to render the default ListItem
        onClose={jest.fn()}
        onDateClick={jest.fn()}
      />
    );

    const listItemButton = getByText(mockEvent.title);
    fireEvent.click(listItemButton);

    expect(mockOnEventClick).toHaveBeenCalledTimes(1);
    expect(mockOnEventClick).toHaveBeenCalledWith({
      event: mockEvent,
      htmlEvent: expect.any(Object), // Expecting it to have been called with some event object
    });
  });
});
