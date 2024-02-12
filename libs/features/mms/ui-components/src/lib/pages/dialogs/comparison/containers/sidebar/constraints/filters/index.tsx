import { ChangeEvent } from 'react';
import { Stack, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import ConstraintsAutocomplete from './autocomplete';
import { useEventStates, useUpcomingEvents, useLocations, useUserSegments } from '../../../../../../../hooks';
import { Constraint } from '../../../../../../types';
import { ConstraintsFilterValues, OptionProp } from '../../../types';

interface ConstraintsFiltersProps {
    filterValues: ConstraintsFilterValues;
    onChange: (value: ConstraintsFilterValues | ((prevState: ConstraintsFilterValues) => ConstraintsFilterValues)) => void;
}

export const ConstraintsFilters = (props: ConstraintsFiltersProps) => {
    const { filterValues, onChange } = props;

    const {
        eventConstraintType,
        eventValues,
        eventStateValues,
        locationValues,
        userValues,
    } = filterValues;

    const { eventStates: eventStateOptions } = useEventStates();
    const { upcomingEvents: eventOptions } = useUpcomingEvents();
    const { locations: locationOptions } = useLocations();
    const { userSegments: userOptions } = useUserSegments();

    const handleEventConstraintTypeChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChange((prevState) => ({ ...prevState, eventConstraintType: event.target.value, eventValues: [], eventStateValues: [] }));
    };

    const handleFilterChange = (key: string, value: OptionProp[]) => {
        onChange((prevState) => ({ ...prevState, [key]: value}))
    };

    return (
        <Stack sx={{ padding: 2, paddingBottom: 0.5 }} spacing={2}>
            <RadioGroup aria-labelledby="link" onChange={handleEventConstraintTypeChange} value={eventConstraintType}>
                <FormControlLabel value={Constraint.SPECIFIC_STATES} control={<Radio />} label="All Events" />
                {eventConstraintType === Constraint.SPECIFIC_STATES && (
                    <ConstraintsAutocomplete 
                        label={"Event State"}
                        values={eventStateValues}
                        onChange={(value) => handleFilterChange('eventStateValues', value)}
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
                            onChange={(value) => handleFilterChange('eventStateValues', value)}
                            options={eventStateOptions.map((item) => ({ value: item.value, name: item.name }))}
                            sx={{ paddingLeft: 2, paddingY: 2 }}
                        />
                        <ConstraintsAutocomplete 
                            label={"Events"}
                            values={eventValues}
                            onChange={(value) => handleFilterChange('eventValues', value)}
                            options={eventOptions.map((item) => ({ value: item._id, name: item.name }))}
                            sx={{ paddingLeft: 2, paddingBottom: 2 }}
                        />
                    </>
                )}
            </RadioGroup>
            <ConstraintsAutocomplete 
                label={"Locations"}
                values={locationValues}
                onChange={(value) => handleFilterChange('locationValues', value)}
                options={locationOptions.map((item) => ({ value: item._id, name: item.name }))}
            />
            <ConstraintsAutocomplete 
                label={"Users"}
                values={userValues}
                onChange={(value) => handleFilterChange('userValues', value)}
                options={userOptions.map((item) => ({ value: item._id, name: item.name }))}
            />
        </Stack>
    );
}