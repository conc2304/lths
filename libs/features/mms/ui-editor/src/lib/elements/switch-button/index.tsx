import { ChangeEvent } from 'react';
import { Stack, Switch, Typography } from '@mui/material';

type Props = {
  isChecked: boolean;
  label: string;
  onChange: (e: ChangeEvent) => void;
};

const SwitchButton = (props: Props) => {
  const { isChecked = false, onChange, label } = props;

  const switchBtnId = `switch-${label.toLowerCase().replace(' ', '-')}`;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <label htmlFor={switchBtnId}>
        <Typography>{label}</Typography>
      </label>
      <Switch checked={isChecked} onChange={onChange} color="success" id={switchBtnId} />
    </Stack>
  );
};

export default SwitchButton;
