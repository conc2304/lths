import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

import { EnumValue } from '@lths/features/mms/data-access';

type Props = {
  eventStates: EnumValue[];
  selectedStates: string[];
  onSelectState: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StateSelect = ({ eventStates, selectedStates, onSelectState }: Props) => {
  return (
    <FormGroup sx={{ marginLeft: 4, marginY: 2 }}>
      {eventStates?.map((es) => (
        <FormControlLabel
          label={es?.name}
          key={es?.value}
          value={es?.value}
          control={<Checkbox checked={selectedStates.includes(es?.value)} onChange={onSelectState} />}
        />
      ))}
    </FormGroup>
  );
};

export default StateSelect;
