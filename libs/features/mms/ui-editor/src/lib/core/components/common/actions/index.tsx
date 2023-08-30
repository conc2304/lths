import { ChangeEvent, useEffect, useState } from 'react';
import { TextField, MenuItem, Box } from '@mui/material';

import PageAutocomplete from './autocomplete';
import { ToolbarProps } from '../../../../context';
import { GroupLabel, OutlinedTextField } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { ActionProps, AutocompleteItemProps } from '../../types';

type ActionExtendedProps = {
  action: ActionProps;
  onPropChange: ToolbarProps['onPropChange'];
  index?: number;
  keys?: string[] | undefined;
};
const ActionType = {
  Native: 'native',
  WebView: 'webview',
};

const Action = (props: ActionExtendedProps) => {
  const { action: { type = ActionType.Native, page_id, page_link } = {}, onPropChange, index, keys } = props;

  const { handleActionChange } = useToolbarChange();

  const [data, setData] = useState<AutocompleteItemProps[]>([]);

  const receiveData = (data: AutocompleteItemProps[]) => {
    setData(data);
  };

  const fetchData = (value: string) => {
    if (value === ActionType.Native) {
      if (data.length === 0) {
        onPropChange('action', receiveData);
      }
    }
  };

  useEffect(() => fetchData(type), [type]);

  const handleActionTypeChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handleActionChange(event, 'type', index, keys);
  };

  const handleActionPageIdChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handleActionChange(event, 'page_id', index, keys);
  };

  const handleActionPageLinkChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handleActionChange(event, 'page_link', index, keys);
  };

  return (
    <>
      <GroupLabel label={'Action'} />
      <TextField
        data-testid={'Action--type'}
        value={type}
        onChange={handleActionTypeChange}
        label="Type"
        select
        fullWidth
      >
        <MenuItem value={ActionType.Native}>native</MenuItem>
        <MenuItem value={ActionType.WebView}>weblink</MenuItem>
      </TextField>
      {type !== ActionType.Native ? (
        <OutlinedTextField label={'Page Link'} value={page_link} onChange={handleActionPageLinkChange} />
      ) : (
        <Box sx={{ mt: 2 }}>
          <PageAutocomplete data={data} onChange={handleActionPageIdChange} value={page_id} />
        </Box>
      )}
    </>
  );
};
export default Action;
