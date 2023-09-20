import { ReactNode } from 'react';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';

import DraftLogo from '../../../assets/Edit.svg';
import PublishLogo from '../../../assets/Live.svg';
import { Status } from '../../../common';
import { NotificationStatusProps } from '../../types';

type Props = {
  status: string;
};

export const NotificationStatus = ({ status }: Props) => {
  let src = '',
    icon: ReactNode,
    color = '';

  switch (status) {
    case NotificationStatusProps.DRAFT:
      src = DraftLogo;
      color = '#FB8C00';
      break;
    case NotificationStatusProps.READY_TO_SEND:
      icon = <AlarmOnIcon />;
      color = 'cyan';
      break;
    case NotificationStatusProps.SENT:
      src = PublishLogo;
      color = '#388E3C';
      break;
    case NotificationStatusProps.FAILED:
      icon = <SmsFailedIcon />;
      color = 'red';
      break;
  }

  return <Status status={status} color={color} icon={icon} imgSrc={src} />;
};
