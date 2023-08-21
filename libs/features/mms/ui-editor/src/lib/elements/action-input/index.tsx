import React, { FC } from 'react';
import { TextField, MenuItem } from '@mui/material';

import { ActionProps } from '../../core/components/types';
import { OutlinedTextField } from '../text-fields';
import { GroupLabel } from '../labels';

interface ActionInputProps {
  action: ActionProps;
  handleActionChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: string,
    index?: number
  ) => void;
  index?: number;
}

const ActionInput: FC<ActionInputProps> = ({ action, handleActionChange, index }) => {
  const labelEnd = index >= 0 ? ' ' + (index + 1) : '';
  return (
    <>
      <GroupLabel label={"Action"}/>
      <TextField
        aria-label={'Type Select' + labelEnd}
        value={action?.type || ''}
        onChange={(e) => {
          handleActionChange(e, 'type', index);
        }}
        label={'Action Type'}
        select
        fullWidth
      >
        <MenuItem value={'native'}>native</MenuItem>
        <MenuItem value={'webview'}>webview</MenuItem>
      </TextField>
      {action?.type === 'native' && (
        <OutlinedTextField
          aria-label={'Page ID' + labelEnd}
          label={'Page ID'}
          value={action.page_id}
          onChange={(e) => handleActionChange(e, 'page_id', index)}
        />
      )}
      {action?.type === 'webview' && (
        <OutlinedTextField
          aria-label={'Link' + labelEnd}
          label={'Link'}
          value={action.page_link}
          onChange={(e) => handleActionChange(e, 'page_link', index)}
        />
      )}
    </>
  );
};

export default ActionInput;
