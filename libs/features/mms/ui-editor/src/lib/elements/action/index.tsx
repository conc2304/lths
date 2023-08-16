import { ChangeEvent } from 'react';
import { TextField, MenuItem } from '@mui/material';

import { ActionProps } from '../../core/components';
import { useToolbarChange } from '../../core/components/hooks';
import { BasicTextField } from '../text-fields';

const Action = (props: ActionProps) => {
  const { type = '', page_id, page_link } = props || {};
  const { handleActionChange } = useToolbarChange();

  const handleActionTypeChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handleActionChange(event, 'type');
  };

  const handleActionPageIdChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handleActionChange(event, 'page_id');
  };
  const handleActionPageLinkChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handleActionChange(event, 'page_link');
  };

  return (
    <>
      <TextField value={type} onChange={handleActionTypeChange} label="type" select sx={{ minWidth: 100 }}>
        <MenuItem value={'native'}>native</MenuItem>
        <MenuItem value={'weblink'}>weblink</MenuItem>
      </TextField>
      <BasicTextField label={'Page Id'} value={page_id} onChange={handleActionPageIdChange} />
      <BasicTextField label={'Page Link'} value={page_link} onChange={handleActionPageLinkChange} />
    </>
  );
};
export default Action;
