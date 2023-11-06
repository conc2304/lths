import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';

import { UserSegment } from '@lths/features/mms/data-access';

import { HeaderContainer } from '../../container';
import { Constraint } from '../../types';

type Props = {
  data: UserSegment[];
  userSegments: UserSegment[];
  onUpdate: (id: string, isSelected: boolean) => void;
  onSelectAll: () => void;
};

const UserConstraints = (props: Props) => {
  const { data = [], userSegments = [], onUpdate, onSelectAll } = props;

  const { ALL_USERS, SPECIFIC_USERS } = Constraint;

  const [userConstraintType, setUserConstraintType] = useState(ALL_USERS);

  const handleUserConstraintChange = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value as Constraint;
    setUserConstraintType(type);
    if (type === ALL_USERS) onSelectAll();
  };

  const handleSelectedUserSegmentsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    onUpdate(value, checked);
  };

  useEffect(() => {
    if (data.length > 0) {
      setUserConstraintType(SPECIFIC_USERS);
    }
  }, [data]);

  return (
    <Box>
      <HeaderContainer
        title="Who do you want see this page?"
        description="This page will only display for the selected users."
        infoText="These are based off our loyalty buckets and other subgroups, if you would like to have a custom group made please reach out to our Support Team."
      />
      <FormControl sx={{ marginTop: 6 }}>
        <RadioGroup defaultValue={ALL_USERS} value={userConstraintType} onChange={handleUserConstraintChange}>
          <FormControlLabel value={ALL_USERS} control={<Radio />} label="Show to page to all users" />
          <FormControlLabel
            value={SPECIFIC_USERS}
            control={<Radio />}
            label="Only show this page to select users"
            sx={{
              marginTop: 1,
            }}
          />
          {userConstraintType === SPECIFIC_USERS && (
            <FormGroup sx={{ marginLeft: 4 }}>
              {userSegments.map((userSegment) => {
                const { _id, name } = userSegment;
                const isChecked = data.some((d) => d._id === _id);
                return (
                  <FormControlLabel
                    key={_id}
                    value={_id}
                    label={name}
                    control={<Checkbox onChange={handleSelectedUserSegmentsChange} checked={isChecked} />}
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

export default UserConstraints;
