import { TextField, Autocomplete, Box } from '@mui/material';

import { ToolContainer, GroupLabel } from '../../../../elements';
import { useToolbarChange } from '../../hooks';
import { SpacerProps } from '../../types';

type Space = {
  value: number;
  label: string;
};

const spacing: Space[] = [
  {
    label: '4 px',
    value: 4,
  },
  {
    label: '8 px',
    value: 8,
  },
  {
    label: '12 px',
    value: 12,
  },
  {
    label: '16 px',
    value: 16,
  },
  {
    label: '20 px',
    value: 20,
  },
  {
    label: '24 px',
    value: 24,
  },
  {
    label: '28 px',
    value: 28,
  },
  {
    label: '32 px',
    value: 32,
  },
  {
    label: '36 px',
    value: 36,
  },
  {
    label: '40 px',
    value: 40,
  },
  {
    label: '48 px',
    value: 48,
  },
  {
    label: '56 px',
    value: 56,
  },
  {
    label: '64 px',
    value: 64,
  },
  {
    label: '80 px',
    value: 80,
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
    <Box component="li" {...props} key={option.label}>
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
        size="small"
        disableClearable
      />
    </ToolContainer>
  );
};
export default SpacerToolbar;
