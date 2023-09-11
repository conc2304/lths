import { ReactNode } from 'react';
import { Typography, Stack } from '@mui/material';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';

import { DraftLogo, PublishLogo } from '@lths/assets';

import { NotificationStatus } from '../../types';

type Props = {
  status: string;
};

const Status = ({ status }: Props) => {
  let src = '',
    icon: ReactNode,
    color = '';

  switch (status) {
    case NotificationStatus.DRAFT:
      src = DraftLogo;
      color = '#FB8C00';
      break;
    case NotificationStatus.READY_TO_SEND:
      icon = <AlarmOnIcon />;
      color = 'cyan';
      break;
    case NotificationStatus.SENT:
      src = PublishLogo;
      color = '#388E3C';
      break;
    case NotificationStatus.FAILED:
      icon = <SmsFailedIcon />;
      color = 'red';
      break;
  }

  return (
    <Stack direction="row" spacing={0.5}>
      {icon ? icon : <img src={src} alt={status} />}

      <Typography color={color}>{status}</Typography>
    </Stack>
  );
};

export default Status;
