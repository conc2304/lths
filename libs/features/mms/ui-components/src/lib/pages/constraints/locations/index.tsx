import { useEffect, useState, ChangeEvent } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';

import { Location, LocationItem } from '@lths/features/mms/data-access';

import { HeaderContainer } from '../../container';
import { Constraint } from '../../types';

type Props = {
  data: Location[];
  locations: LocationItem[];
  onUpdate: (id: string, isSelected: boolean) => void;
  onSelectAll: () => void;
};

const LocationConstraints = (props: Props) => {
  const { data = [], locations = [], onUpdate, onSelectAll } = props;

  const { ALL_LOCATIONS, SPECIFIC_LOCATIONS } = Constraint;

  const [locationConstraintType, setLocationConstraintType] = useState(ALL_LOCATIONS);

  const handleLocationConstraintTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value as Constraint;
    setLocationConstraintType(type);
    if (type === ALL_LOCATIONS) onSelectAll();
  };

  const handleSelectedLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    onUpdate(value, checked);
  };

  useEffect(() => {
    if (data.length > 0) {
      setLocationConstraintType(SPECIFIC_LOCATIONS);
    }
  }, [data]);

  return (
    <Box>
      <HeaderContainer
        title="Where do you want this page to display?"
        description="This page will only display only for users at this location."
        infoText="These are based off of tickets scanned in. "
      />
      <FormControl sx={{ marginTop: 6 }}>
        <RadioGroup
          defaultValue={ALL_LOCATIONS}
          onChange={handleLocationConstraintTypeChange}
          value={locationConstraintType}
        >
          <FormControlLabel value={ALL_LOCATIONS} control={<Radio />} label="Show this page everywhere" />
          <FormControlLabel
            value={SPECIFIC_LOCATIONS}
            control={<Radio />}
            label="Only show this page in specific spaces"
            sx={{
              marginTop: 1,
            }}
          />
          {locationConstraintType === SPECIFIC_LOCATIONS && (
            <FormGroup sx={{ marginLeft: 4 }}>
              {locations.map((loc) => {
                const { name, _id } = loc;
                const isChecked = data.some((d) => d._id === _id);
                return (
                  <FormControlLabel
                    key={_id}
                    label={name}
                    value={_id}
                    control={<Checkbox onChange={handleSelectedLocationChange} checked={isChecked} />}
                  />
                );
              })}
            </FormGroup>
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default LocationConstraints;
