import { TextField, Autocomplete, Box } from '@mui/material';

import { ToolContainer, GroupLabel } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { SpacerProps } from '../../types';

type Space = {
  value: string;
  label: string;
};

const spacing: Space[] = [
  {
    label: '4px',
    value: '4',
  },
  {
    label: '8px',
    value: '8',
  },
  {
    label: '12px',
    value: '12',
  },
  {
    label: '16px',
    value: '16',
  },
  {
    label: '20px',
    value: '20',
  },
  {
    label: '24px',
    value: '24',
  },
  {
    label: '28px',
    value: '28',
  },
  {
    label: '32px',
    value: '32',
  },
  {
    label: '36px',
    value: '36',
  },
  {
    label: '40px',
    value: '40',
  },
  {
    label: '48px',
    value: '48',
  },
  {
    label: '56px',
    value: '56',
  },
  {
    label: '64px',
    value: '64',
  },
  {
    label: '80px',
    value: '80',
  },
];

const SpacerToolbar = (props: SpacerProps) => {
  const {
    data: { space },
    __ui_id__: id,
  } = props;

  const { updateComponentProp } = useToolbarChange();
  const handleAutocompleteChange = (event, item: Space) => {
    updateComponentProp('space', item.value);
  };
  const getOptionLabel = (option) => option.label;
  const renderOption = (props, option) => (
    <Box component="li" {...props}>
      {option.label}
    </Box>
  );
  const selectedvalue = spacing.find((s) => s.value === space) || null;

  return (
    <ToolContainer id={id} aria-label="Spacer Toolbar">
      <GroupLabel label={'Spacer'} />
      <Autocomplete
        id="Spacing"
        options={spacing}
        getOptionLabel={getOptionLabel}
        renderOption={renderOption}
        renderInput={(params) => <TextField {...params} label="Spacing" />}
        onChange={handleAutocompleteChange}
        value={selectedvalue}
      />
    </ToolContainer>
  );
};
export default SpacerToolbar;
