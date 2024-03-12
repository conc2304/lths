import { ChangeEvent } from 'react';
import { Box, FormGroup, InputAdornment, OutlinedInput, SxProps, Typography } from '@mui/material';

import { roundNumToNearestX, truncateToDecimalPlace } from '@lths/shared/utils';

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

  const formattedValue = value ? truncateToDecimalPlace(roundNumToNearestX(value, step), 2) : value;

  return (
    <FormGroup sx={{ ...sx }} key={`form-group-${id}`}>
      <Typography variant="body1" mb={1}>
        {title}
      </Typography>

      {!editable && <Typography color="text.disabled">Determined dynamically by NHL.com.</Typography>}
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
            endAdornment={
              <InputAdornment position="end">
                <Typography color="text.disabled">hrs</Typography>
              </InputAdornment>
            }
            inputProps={{ min: minHours, max: maxHours, step }}
            placeholder="0"
            sx={{
              width: '6.875rem',
            }}
          />
          <Typography
            color="text.secondary"
            sx={{
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
