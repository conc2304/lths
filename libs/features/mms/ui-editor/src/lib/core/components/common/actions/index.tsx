import { ChangeEvent, useEffect, useState } from 'react';
import { TextField, MenuItem, Box, RadioGroup, Typography, FormControlLabel, Radio } from '@mui/material';

import PageAutocomplete from './autocomplete';
import { ToolbarProps } from '../../../../context';
import { GroupLabel, OutlinedTextField } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { ActionProps, AutocompleteItemProps, ActionType, ItemPositionalProps } from '../../types';

type ActionExtendedProps = ItemPositionalProps & {
  action: ActionProps;
  actionPropName?: string;
  onPropChange: ToolbarProps['onPropChange'];

  isRadioButton?: boolean;
};

const Action = (props: ActionExtendedProps) => {
  const {
    action: { type = ActionType.NATIVE, page_id, page_link } = {},
    actionPropName = 'action',
    onPropChange,
    keys: parentKeys,
    index,
    childKeys,
    isRadioButton = false,
  } = props;

  const { handleActionChange } = useToolbarChange();

  const [data, setData] = useState<AutocompleteItemProps[]>([]);

  const receiveData = (data: AutocompleteItemProps[]) => {
    setData(data);
  };

  const fetchData = (value: string) => {
    if (value === ActionType.NATIVE) {
      if (data.length === 0) {
        onPropChange('action', receiveData);
      }
    }
  };

  useEffect(() => fetchData(type), [type]);

  const handleActionTypeChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handleActionChange(event, 'type', index, parentKeys, childKeys, actionPropName);
  };

  const handleActionPageIdChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handleActionChange(event, 'page_id', index, parentKeys, childKeys, actionPropName);
  };

  const handleActionPageLinkChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handleActionChange(event, 'page_link', index, parentKeys, childKeys, actionPropName);
  };

  return (
    <>
      {!isRadioButton && <GroupLabel label={'Action'} />}
      {!isRadioButton ? (
        <TextField
          data-testid={'Action--type'}
          value={type}
          onChange={handleActionTypeChange}
          label="Type"
          select
          fullWidth
        >
          <MenuItem value={ActionType.NATIVE}>native</MenuItem>
          <MenuItem value={ActionType.WEBVIEW}>weblink</MenuItem>
        </TextField>
      ) : (
        <RadioGroup aria-labelledby="link" onChange={handleActionTypeChange} value={type} row>
          <Typography sx={{ marginLeft: 0.5 }}>Link</Typography>
          <Box sx={{ marginTop: -1.15, marginLeft: 2 }}>
            <FormControlLabel value={ActionType.NATIVE} control={<Radio />} label="Native" />
            <FormControlLabel value={ActionType.WEBVIEW} control={<Radio />} label="Web" />
          </Box>
        </RadioGroup>
      )}
      {type !== ActionType.NATIVE ? (
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
