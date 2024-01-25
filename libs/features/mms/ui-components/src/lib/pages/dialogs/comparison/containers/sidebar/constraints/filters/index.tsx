import { ChangeEvent, useEffect, useState } from 'react';
import { Stack, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import { PageDetail } from '@lths/features/mms/data-access';

import ConstraintsAutocomplete, { OptionProp } from './autocomplete';
import { useEventStates, useUpcomingEvents, useLocations, useUserSegments } from '../../../../../../../hooks';
import { Constraint } from '../../../../../../types';

export type ConstraintsFiltersValues = {
    eventConstraintType?: string; 
    eventValues?: OptionProp[];
    eventStateValues?: OptionProp[];
    locationValues?: OptionProp[];
    userValues?: OptionProp[];
};

interface ConstraintsFiltersProps {
    previewedPage?: PageDetail;
    pageList?: PageDetail[];
    filterValues: ConstraintsFiltersValues;
    setFilterValues: (value: ConstraintsFiltersValues) => void;
    setPreviewedPageDisabled: (value: boolean) => void;
    setDisabledPageList: (value: boolean[]) => void;
}

export const ConstraintsFilters = (props: ConstraintsFiltersProps) => {
    const { 
        previewedPage, pageList,
        filterValues, setFilterValues,
        setPreviewedPageDisabled, setDisabledPageList,
    } = props;

    const { eventStates: eventStateOptions } = useEventStates();
    const { upcomingEvents: eventOptions } = useUpcomingEvents();
    const { locations: locationOptions } = useLocations();
    const { userSegments: userOptions } = useUserSegments();

    const [eventConstraintType, setEventConstraintType] = useState<string>(filterValues.eventConstraintType || Constraint.SPECIFIC_STATES);
    const [eventValues, setEventValues] = useState<OptionProp[]>(filterValues.eventValues || []);
    const [eventStateValues, setEventStateValues] = useState<OptionProp[]>(filterValues.eventStateValues || []);

    const [locationValues, setLocationValues] = useState<OptionProp[]>(filterValues.locationValues || []);
    const [userValues, setUserValues] = useState<OptionProp[]>(filterValues.userValues || []);

    const handleEventConstraintTypeChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEventConstraintType(event.target.value);
        setEventValues([]);
        setEventStateValues([]);
    };

    const isPageDisabled = (page: PageDetail) => {
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

    useEffect(() => {
        if (previewedPage) {
            setPreviewedPageDisabled(isPageDisabled(previewedPage));
        }
        if (pageList) { 
            setDisabledPageList(pageList.map((page) => isPageDisabled(page)));
        }
        setFilterValues({locationValues, userValues, eventStateValues, eventValues, eventConstraintType})
    }, [locationValues, userValues, eventStateValues, eventValues, eventConstraintType]);

    return (
        <Stack sx={{ padding: 2, paddingBottom: 0.5 }} spacing={2}>
            <RadioGroup aria-labelledby="link" onChange={handleEventConstraintTypeChange} value={eventConstraintType}>
                <FormControlLabel value={Constraint.SPECIFIC_STATES} control={<Radio />} label="All Events" />
                {eventConstraintType === Constraint.SPECIFIC_STATES && (
                    <ConstraintsAutocomplete 
                        label={"Event State"}
                        values={eventStateValues}
                        setValues={setEventStateValues}
                        options={eventStateOptions.map((item) => ({ value: item.value, name: item.name }))}
                        sx={{ paddingLeft: 2, paddingY: 2 }}
                    />
                )}
                <FormControlLabel value={Constraint.SPECIFIC_EVENT_STATES} control={<Radio />} label="Specific Events" />
                {eventConstraintType === Constraint.SPECIFIC_EVENT_STATES && (
                    <>
                        <ConstraintsAutocomplete 
                            label={"Event State"}
                            values={eventStateValues}
                            setValues={setEventStateValues}
                            options={eventStateOptions.map((item) => ({ value: item.value, name: item.name }))}
                            sx={{ paddingLeft: 2, paddingY: 2 }}
                        />
                        <ConstraintsAutocomplete 
                            label={"Events"}
                            values={eventValues}
                            setValues={setEventValues}
                            options={eventOptions.map((item) => ({ value: item._id, name: item.name }))}
                            sx={{ paddingLeft: 2, paddingBottom: 2 }}
                        />
                    </>
                )}
            </RadioGroup>
            <ConstraintsAutocomplete 
                label={"Locations"}
                values={locationValues}
                setValues={setLocationValues}
                options={locationOptions.map((item) => ({ value: item._id, name: item.name }))}
            />
            <ConstraintsAutocomplete 
                label={"Users"}
                values={userValues}
                setValues={setUserValues}
                options={userOptions.map((item) => ({ value: item._id, name: item.name }))}
            />
        </Stack>
    );
}