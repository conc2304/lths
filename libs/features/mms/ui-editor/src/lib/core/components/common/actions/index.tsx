import { ChangeEvent, useEffect, useState } from 'react';
import { TextField, MenuItem, RadioGroup, Typography, FormControlLabel, Radio, Stack } from '@mui/material';

import PageAutocomplete from './autocomplete';
import colors from '../../../../common/colors';
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
    isRadioButton = true,
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
          size="small"
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
          <Typography color="text.secondary">Link</Typography>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{ marginLeft: 3 }}>
            <FormControlLabel value={ActionType.NATIVE} sx={{ marginRight: 2.5 }}
              control={<Radio size="small" data-testid={'Radio--Native'} sx={{ '&.Mui-checked': { color: colors.linkRadio }, padding: 0.25 }}/>} 
              label={<Typography color="text.secondary" sx={{ fontSize: 14, marginLeft: 0.5  }}>Native</Typography>}
            />
            <FormControlLabel color="secondary" value={ActionType.WEBVIEW} 
              control={<Radio size="small" data-testid={'Radio--Web'} sx={{ '&.Mui-checked': { color: colors.linkRadio }, padding: 0.25 }}/>}
              label={<Typography color="text.secondary" sx={{ fontSize: 14, marginLeft: 0.5 }}>Web</Typography>} 
            />
          </Stack>
        </RadioGroup>
      )}
      {type !== ActionType.NATIVE ? (
        <OutlinedTextField label={'Page Link'} value={page_link} onChange={handleActionPageLinkChange} />
      ) : (
          <PageAutocomplete data={data} onChange={handleActionPageIdChange} value={page_id} />
      )}
    </>
  );
};
export default Action;
