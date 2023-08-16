import React, { useEffect, useState, ChangeEvent } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';

import { Location, LocationItem, useLazyGetLocationsQuery } from '@lths/features/mms/data-access';

import { HeaderContainer } from '../../core';
import { EventItem } from '../types';

type Props = {
  data: Location[];
  onUpdate: (loc: string[]) => void;
};

const LocationConstraints = ({ data, onUpdate }: Props) => {
  const [getLocationList] = useLazyGetLocationsQuery();

  const [locationConstraintType, setLocationConstraintType] = useState(EventItem.ALL_LOCATIONS);

  const [locations, setLocations] = useState<LocationItem[]>([]);

  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleLocationConstraintTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationConstraintType(e.target.value as EventItem);
  };

  const handleSelectedLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedLocations((prevState) => {
      if (event.target.checked) {
        return [...prevState, event.target.value];
      } else {
        return prevState.filter((loc) => loc !== event.target.value);
      }
    });
  };

  const fetchLocationList = async () => {
    try {
      const response = await getLocationList().unwrap();
      if (response?.success) setLocations(response?.data);
    } catch (error) {
      console.error('Error in fetching location list');
    }
  };

  useEffect(() => {
    fetchLocationList();
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      setLocationConstraintType(EventItem.SPECIFIC_LOCATIONS);
      setSelectedLocations(data.map((lc) => lc._id));
    }
  }, [data]);

  useEffect(() => {
    onUpdate(selectedLocations);
  }, [selectedLocations]);

  return (
    <Box>
      <HeaderContainer
        title="Where do you want this page to display?"
        description="This page will only display only for users at this location."
        infoText="These are based off of tickets scanned in. "
      />
      <FormControl sx={{ marginTop: 6 }}>
        <RadioGroup
          defaultValue={EventItem.ALL_LOCATIONS}
          onChange={handleLocationConstraintTypeChange}
          value={locationConstraintType}
        >
          <FormControlLabel value={EventItem.ALL_LOCATIONS} control={<Radio />} label="Show this page everywhere" />
          <FormControlLabel
            value={EventItem.SPECIFIC_LOCATIONS}
            control={<Radio />}
            label="Only show this page in specific spaces"
            sx={{
              marginTop: 1,
            }}
          />
          {locationConstraintType === EventItem.SPECIFIC_LOCATIONS && (
            <FormGroup sx={{ marginLeft: 4 }}>
              {locations?.map((loc) => {
                if (!loc) return null;
                else {
                  const { name, _id } = loc;
                  return (
                    <FormControlLabel
                      key={_id}
                      label={name}
                      value={_id}
                      control={
                        <Checkbox onChange={handleSelectedLocationChange} checked={selectedLocations.includes(_id)} />
                      }
                    />
                  );
                }
              })}
            </FormGroup>
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default LocationConstraints;
