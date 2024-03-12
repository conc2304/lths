import { ChangeEvent } from 'react';
import { Box, FormGroup, InputAdornment, OutlinedInput, SxProps, Typography } from '@mui/material';

import { FormGroupLabel } from '@lths/shared/ui-elements';
import { roundNumToNearestX, truncateToDecimalPlace } from '@lths/shared/utils';

// import { fontStyle, FormLabel } from '../utils';

type EventStateFormItemProps = {
  onChange?: {
    (e: ChangeEvent<HTMLInputElement>): void;
    <T_1 = string | ChangeEvent<HTMLInputElement>>(field: T_1): T_1 extends ChangeEvent<unknown>
      ? void
      : (e: string | ChangeEvent<HTMLInputElement>) => void;
  };
  title: string;
  desc: string;
  value?: number;
  editable: boolean;
  id: string;
  sx?: SxProps;
  minHours?: number;
  maxHours?: number;
  step?: number;
};

export const EventStateFormItem = (props: EventStateFormItemProps) => {
  const {
    onChange,
    title,
    desc,
    value,
    editable = false,
    id,
    sx = {},
    minHours = 0,
    maxHours = 24,
    step = 0.25,
  } = props;

  const descSx = {
    fontSize: '0.75rem',
    letterSpacing: '0.15px',
  };

  const formattedValue = value ? truncateToDecimalPlace(roundNumToNearestX(value, step), 2) : value;

  return (
    <FormGroup sx={{ ...sx }} key={`form-group-${id}`}>
      <FormGroupLabel htmlFor={`${title}-form-id`}>{title.toUpperCase()}</FormGroupLabel>

      {!editable && <Typography sx={{ ...descSx, fontStyle: 'italic' }}>This cannot be edited.</Typography>}
      {editable && (
        <Box display={'flex'} alignItems={'center'}>
          <OutlinedInput
            type="number"
            size="small"
            id={`${title}-form-id`}
            role="textbox"
            name={title}
            value={formattedValue}
            onChange={onChange}
            endAdornment={<InputAdornment position="end">hrs</InputAdornment>}
            inputProps={{ min: minHours, max: maxHours, step }}
            placeholder="Hours"
          />
          <Typography
            sx={{
              // ...fontStyle,
              pl: 1.5,
            }}
          >
            {desc}
          </Typography>
        </Box>
      )}
    </FormGroup>
  );
};
