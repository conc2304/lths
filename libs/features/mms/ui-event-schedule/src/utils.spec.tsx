import '@testing-library/jest-dom/extend-expect';
import { render, within } from '@testing-library/react';
import { addHours, subHours } from 'date-fns';

import {
  EVENT_STATE,
  EventStateUIPostEvent,
  EventStateUIEventDay,
  EventStateUIPreEvent,
  EventStateUIInEvent,
} from './constants';
import { EventState, EventStateID } from './types';
import {
  eventColorMap,
  EventTypeIcon,
  eventStateOffsetToDateRange,
  updateEventStatesWithOffsets,
  EventStateUIMap,
} from './utils';

describe('eventColorMap', () => {
  it('should return the correct color for known event type IDs', () => {
    expect(eventColorMap('GAME')).toBe('#FDD58C');
    expect(eventColorMap('CONCERT')).toBe('#ECABBB');
    expect(eventColorMap('COMEDY')).toBe('#CED0E9');
    expect(eventColorMap('ARTS_OTHER')).toBe('#D1EBD2');
  });

  it('should return the default color for unknown event type IDs', () => {
    expect(eventColorMap('UNKNOWN_TYPE')).toBe('#A6CEE0');
  });
});

describe('EventTypeIcon', () => {
  it('should return the appropriate icon component for a given event type ID', () => {
    const HockeyIcon = EventTypeIcon('hockey_game');
    const ConcertIcon = EventTypeIcon('concert');
    const FamilyDayIcon = EventTypeIcon('family_day');
    const ThemeEventsIcon = EventTypeIcon('theme_events');
    const PromotionIcon = EventTypeIcon('promotion');
    const DefaultIcon = EventTypeIcon('unknown_type');

    const { container: hockeyContainer } = render(<HockeyIcon />);
    const { container: concertContainer } = render(<ConcertIcon />);
    const { container: familyDayContainer } = render(<FamilyDayIcon />);
    const { container: themeEventsContainer } = render(<ThemeEventsIcon />);
    const { container: promotionContainer } = render(<PromotionIcon />);
    const { container: defaultContainer } = render(<DefaultIcon />);

    expect(within(hockeyContainer).getByTestId('SportsHockeyOutlinedIcon')).toBeInTheDocument();
    expect(within(concertContainer).getByTestId('CelebrationRoundedIcon')).toBeInTheDocument();
    expect(within(familyDayContainer).getByTestId('FamilyRestroomRoundedIcon')).toBeInTheDocument();
    expect(within(themeEventsContainer).getByTestId('LocalActivityRoundedIcon')).toBeInTheDocument();
    expect(within(promotionContainer).getByTestId('LoyaltyRoundedIcon')).toBeInTheDocument();
    expect(within(defaultContainer).getByTestId('QuestionMarkRoundedIcon')).toBeInTheDocument();
  });
});
describe('eventStateOffsetToDateRange', () => {
  it('should calculate the adjusted start and end date-times based on event state and offset (dependentPoint: start)', () => {
    const eventState = {
      stateDependency: { dependentPoint: 'start', referencePoint: 'start' },
      relativeOffsetHrs: 2,
      start: new Date('2023-08-10T12:00:00Z').toISOString(),
      end: new Date('2023-08-10T14:00:00Z').toISOString(),
    };

    const offset = 1;

    const result = eventStateOffsetToDateRange(eventState as EventState, offset);

    expect(result.start).toBe(addHours(new Date(eventState.start), offset).toISOString());
    expect(result.end).toBe(eventState.end);
    expect(result.offsetDifference).toBe(offset - eventState.relativeOffsetHrs);
    expect(result.relativeTo).toBe(eventState.stateDependency.dependentPoint);
  });

  it('should calculate the adjusted start and end date-times based on event state and offset (dependentPoint: end)', () => {
    const eventState = {
      stateDependency: { dependentPoint: 'end', referencePoint: 'end' },
      relativeOffsetHrs: 2,
      start: new Date('2023-08-10T12:00:00Z').toISOString(),
      end: new Date('2023-08-10T14:00:00Z').toISOString(),
    };

    const offset = 1;

    const result = eventStateOffsetToDateRange(eventState as EventState, offset);

    expect(result.start).toBe(eventState.start);
    expect(result.end).toBe(subHours(new Date(eventState.end), offset).toISOString());
    expect(result.offsetDifference).toBe(offset - eventState.relativeOffsetHrs);
    expect(result.relativeTo).toBe(eventState.stateDependency.dependentPoint);
  });
});

describe('updateEventStatesWithOffsets', () => {
  it('should update event states with offsets correctly', () => {
    const preEventState = {
      ...EventStateUIPreEvent,
      relativeOffsetHrs: 2,
      start: new Date('2023-08-10T12:00:00Z').toISOString(),
      end: new Date('2023-08-10T14:00:00Z').toISOString(),
    };
    const inEventState = {
      ...EventStateUIInEvent,
      relativeOffsetHrs: 0,
      start: new Date('2023-08-10T14:00:00Z').toISOString(),
      end: new Date('2023-08-10T18:00:00Z').toISOString(),
    };

    const eventStates = [preEventState, inEventState];

    const offsetValues = {
      [EVENT_STATE.PRE_EVENT]: 1,
    };

    const updatedEventStates = updateEventStatesWithOffsets(
      eventStates as EventState[],
      offsetValues as Record<EventStateID, number | undefined>
    );

    const newPreEventStart = updatedEventStates.find(({ state }) => state === 'PREGAME')?.start;
    const newPreEventEnd = updatedEventStates.find(({ state }) => state === 'PREGAME')?.end;

    expect(newPreEventStart).toBe(
      addHours(
        subHours(new Date(inEventState.start), preEventState.relativeOffsetHrs),
        offsetValues[EVENT_STATE.PRE_EVENT]
      ).toISOString()
    );

    expect(newPreEventEnd).toBe(new Date(inEventState.start).toISOString());
  });
});

describe('EventStateUIMap', () => {
  it('should correctly map event state IDs to corresponding UI definitions', () => {
    expect(EventStateUIMap(EVENT_STATE.EVENT_DAY)).toEqual(EventStateUIEventDay);
    expect(EventStateUIMap(EVENT_STATE.PRE_EVENT)).toEqual(EventStateUIPreEvent);
    expect(EventStateUIMap(EVENT_STATE.IN_EVENT)).toEqual(EventStateUIInEvent);
    expect(EventStateUIMap(EVENT_STATE.POST_EVENT)).toEqual(EventStateUIPostEvent);

    // Test for an unknown event state ID (default should return EventStateUIInEvent)
    expect(EventStateUIMap('UNKNOWN_STATE' as EventStateID)).toEqual(EventStateUIInEvent);
  });
});
