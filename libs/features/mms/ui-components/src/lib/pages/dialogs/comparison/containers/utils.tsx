import { PageDetail } from '@lths/features/mms/data-access';

import { ConstraintsFilterValues } from './types';
import { Constraint } from '../../../types';

export const isPageDisabled = (page: PageDetail, filters: ConstraintsFilterValues) => {
    const {
        eventConstraintType,
        eventValues,
        eventStateValues,
        locationValues,
        userValues,
    } = filters;
    const { events, locations, user_segments } = page.constraints;

    let eventsMatch = true;
    if(eventConstraintType === Constraint.SPECIFIC_STATES) {
        // check that all event types exist in constraint
        eventsMatch = eventStateValues.every((filterEventState) => events.some((event) => {
            if(event && event.state_id && event.state_id.length > 0) return (event.state_id[0] === filterEventState.value); 
            return false; 
        }));
    } else if (eventConstraintType === Constraint.SPECIFIC_EVENT_STATES) {
        let hasEventId = true;
        if (eventValues.length === 0 && eventStateValues.length !== 0) {
            if(events && events.length > 0  && events[0].event_id && typeof events[0].event_id === 'string') {
                hasEventId = true;
            } else hasEventId = false;
        }
        // check that specific event exist in constraint
        eventsMatch = eventValues.every((filterEvent) => events.some((event) => (event?.event_id === filterEvent.value)));
        // check that all event types exist in constraint
        const eventsStateMatch = eventStateValues.every((filterEventState) => {
            if (events && events.length > 0 && events[0].state_id) {
                return events[0].state_id.includes(filterEventState.value);
            } else return false;
        });
        eventsMatch = eventsMatch && eventsStateMatch && hasEventId;
    }

    const locationsMatch = locationValues.every((filterLocation) => locations.some((location) => (location._id === filterLocation.value)));
    const usersMatch = userValues.every((filterUser) => user_segments.some((user) => (user._id === filterUser.value)));
    
    if(locationsMatch && usersMatch && eventsMatch) return false;
    return true;
};