import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

import { EnumValue } from '@lths/features/mms/data-access';

import { ChangeState } from '../types';

type Props = {
  eventStates: EnumValue[];
  selectedStates: string[];
  onSelectState: ChangeState;
};

const StateSelect = (props: Props) => {
  const { eventStates = [], selectedStates = [], onSelectState } = props;
  return (
    <FormGroup sx={{ marginLeft: 4, marginY: 2 }}>
      {eventStates.map((item) => {
        const { name, value } = item;
        const isChecked = selectedStates.includes(value);
        return (
          <FormControlLabel
            label={name}
            key={value}
            value={value}
            control={<Checkbox checked={isChecked} onChange={onSelectState} />}
          />
        );
      })}
    </FormGroup>
  );
};

export default StateSelect;
