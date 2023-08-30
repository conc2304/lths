import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EventScheduler } from './event-scheduler';
import { EVENT_TYPE } from '../constants';
import { eventStateMockEvents, eventsMock, eventTypesMock, getNewEvent } from '../mock-events';

describe('EventScheduler', () => {
  const renderWithTheme = (component: JSX.Element) => {
    return render(RBThemeProvider({ children: component }));
  };

  const onSaveEvent = jest.fn();
  const onSaveEventStates = jest.fn();
  const onNavigate = jest.fn();
  const onRangeChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = renderWithTheme(
      <EventScheduler
        events={eventsMock}
        backgroundEvents={eventStateMockEvents}
        eventTypes={eventTypesMock}
        onSaveEvent={onSaveEvent}
        onSaveEventStates={onSaveEventStates}
        onNavigate={onNavigate}
        onRangeChange={onRangeChange}
        data-testid="EventScheduler"
      />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders EventScheduler component in List View', async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
      <EventScheduler
        events={eventsMock}
        backgroundEvents={eventStateMockEvents}
        eventTypes={eventTypesMock}
        onSaveEvent={onSaveEvent}
        onSaveEventStates={onSaveEventStates}
        onNavigate={onNavigate}
        onRangeChange={onRangeChange}
      />
    );

    expect(queryByTestId('Calendar-List-View--root')).toBeNull();

    // Click on the view mode button
    const listViewButton = getByTestId('Calendar-View-Control--view-type-list');
    expect(listViewButton).toBeInTheDocument();
    await userEvent.click(listViewButton);

    // Verify we have our list view items
    expect(getByTestId('Calendar-List-View--root')).toBeInTheDocument();
  });

  it('toggles the view mode', async () => {
    const { getByTestId } = renderWithTheme(
      <EventScheduler
        events={eventsMock}
        backgroundEvents={eventStateMockEvents}
        eventTypes={eventTypesMock}
        onSaveEvent={onSaveEvent}
        onSaveEventStates={onSaveEventStates}
        onNavigate={onNavigate}
        onRangeChange={onRangeChange}
      />
    );

    const viewTypeToggle = getByTestId('Calendar-View-Control--view-type-list');
    expect(viewTypeToggle).toHaveAttribute('aria-pressed', 'false');

    // Simulate user interactions with the view type toggle
    await userEvent.click(viewTypeToggle);

    // Verify that the view mode has been changed
    await waitFor(() => {
      expect(getByTestId('Calendar-View-Control--view-type-list')).toHaveAttribute('aria-pressed', 'true');
    });
  });

  it('navigates to a different date range', async () => {
    const { getByTestId } = renderWithTheme(
      <EventScheduler
        events={eventsMock}
        backgroundEvents={eventStateMockEvents}
        eventTypes={eventTypesMock}
        onSaveEvent={onSaveEvent}
        onSaveEventStates={onSaveEventStates}
        onNavigate={onNavigate}
        onRangeChange={onRangeChange}
      />
    );
    const nextButton = getByTestId('Calendar-View-Control--navigation--next');

    // Simulate user interactions with the navigation buttons
    await userEvent.click(nextButton);

    // Verify that the onNavigate handler has been called
    await waitFor(() => {
      expect(onNavigate).toHaveBeenCalledTimes(1);
      expect(onRangeChange).toHaveBeenCalledTimes(1);
    });
  });

  it('filters events based on selected event types', async () => {
    // Arrange
    const gameEvent = getNewEvent({ eventTypeID: EVENT_TYPE.GAME, isToday: true, isAllDay: false });
    const concertEvent = getNewEvent({ eventTypeID: EVENT_TYPE.CONCERT, isToday: true, isAllDay: false });
    const testEvents = [gameEvent, concertEvent];
    const { getByTestId, getByText, getByRole, queryByText } = renderWithTheme(
      <EventScheduler
        events={testEvents}
        backgroundEvents={[]}
        eventTypes={eventTypesMock}
        onSaveEvent={onSaveEvent}
        onSaveEventStates={onSaveEventStates}
        onNavigate={onNavigate}
        onRangeChange={onRangeChange}
        defaultView="day"
      />
    );
    const matchTitle = gameEvent.title?.toString() as string;
    const notMatchTitle = concertEvent.title?.toString() as string;

    // Verify that both events are in the document before filtering
    expect(getByText(matchTitle)).toBeInTheDocument();
    expect(getByText(notMatchTitle)).toBeInTheDocument();

    // Click on the select filter and filter option
    const selectFilter = within(getByTestId('Calendar-toolbar--filter-select')).getByRole('button');
    await userEvent.click(selectFilter);
    const eventTypeItem = within(getByRole('presentation')).getByText('Hockey Game');
    expect(eventTypeItem).toBeInTheDocument();
    await userEvent.click(eventTypeItem);

    // Verify that the events are filtered based on the selected event type.
    expect(getByText(matchTitle)).toBeInTheDocument();
    expect(queryByText(notMatchTitle)).toBeNull();
  });
});
