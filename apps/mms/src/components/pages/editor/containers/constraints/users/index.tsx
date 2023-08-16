import React, { useEffect, useState } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';

import { UserSegment, useLazyGetUserSegmentsQuery } from '@lths/features/mms/data-access';

import { HeaderContainer } from '../../core';
import { EventItem } from '../types';

type Props = {
  data: UserSegment[];
  onUpdate: (us: string[]) => void;
};

const UserConstraints = ({ data, onUpdate }: Props) => {
  const [getUserSegmentList] = useLazyGetUserSegmentsQuery();

  const [UserConstraintType, setUserConstraintType] = useState(EventItem.ALL_USERS);
  const [userSegments, setUserSegments] = useState<UserSegment[]>([]);
  const [selectedUserSegments, setSelectedUserSegments] = useState<string[]>([]);

  const fetchUserSegmentList = async () => {
    try {
      const response = await getUserSegmentList().unwrap();
      if (response?.success) setUserSegments(response?.data);
    } catch (error) {
      console.error('Error in fetching user segment list');
    }
  };

  const handleUserConstraintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserConstraintType(e.target.value as EventItem);
  };

  const handleSelectedUserSegmentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUserSegments((prevState) => {
      if (event.target.checked) {
        return [...prevState, event.target.value];
      } else {
        return prevState.filter((s) => s !== event.target.value);
      }
    });
  };

  useEffect(() => {
    fetchUserSegmentList();
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      setUserConstraintType(EventItem.SPECIFIC_USERS);
      setSelectedUserSegments(data.map((usc) => usc._id));
    }
  }, [data]);

  useEffect(() => {
    onUpdate(selectedUserSegments);
  }, [selectedUserSegments]);

  return (
    <Box>
      <HeaderContainer
        title="Who do you want see this page?"
        description="This page will only display for the selected users."
        infoText="These are based off our loyalty buckets and other subgroups, if you would like to have a custom group made please reach out to our Support Team."
      />
      <FormControl sx={{ marginTop: 6 }}>
        <RadioGroup defaultValue={EventItem.ALL_USERS} value={UserConstraintType} onChange={handleUserConstraintChange}>
          <FormControlLabel value={EventItem.ALL_USERS} control={<Radio />} label="Show to page to all users" />
          <FormControlLabel
            value={EventItem.SPECIFIC_USERS}
            control={<Radio />}
            label="Only show this page to select users"
            sx={{
              marginTop: 1,
            }}
          />
          {UserConstraintType === EventItem.SPECIFIC_USERS && (
            <FormGroup sx={{ marginLeft: 4 }}>
              {userSegments?.map((us) => (
                <FormControlLabel
                  key={us?._id}
                  value={us?._id}
                  label={us?.name}
                  control={
                    <Checkbox
                      onChange={handleSelectedUserSegmentsChange}
                      checked={selectedUserSegments.includes(us?._id)}
                    />
                  }
                />
              ))}
            </FormGroup>
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default UserConstraints;
