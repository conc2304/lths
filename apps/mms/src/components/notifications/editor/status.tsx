import { Typography, Stack } from '@mui/material';

import { NotificationStatus } from './types';
import { DraftLogo, PublishLogo } from '../../../assets/index';

type Props = {
  status: string;
};

const Status = ({ status }: Props) => {
  let icon = '',
    color = '';

  switch (status) {
    case NotificationStatus.DRAFT:
      icon = DraftLogo;
      color = '#FB8C00';
      break;
    case NotificationStatus.SENT:
      icon = PublishLogo;
      color = '#388E3C';
      break;
  }

  return (
    <Stack direction="row" spacing={0.5}>
      <img src={icon} alt={status} />
      <Typography color={color}>{status}</Typography>
    </Stack>
  );
};

export default Status;
