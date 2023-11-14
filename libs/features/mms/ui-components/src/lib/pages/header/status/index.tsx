import { ReactNode } from 'react';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

import DraftLogo from '../../../assets/Edit.svg';
import PublishLogo from '../../../assets/Live.svg';
import { Status } from '../../../common';
import { PageStatus } from '../../types';

type Props = {
  status: string;
  statusInfo?: string;
};

export const PagesStatus = ({ status, statusInfo }: Props) => {
  let src = '',
    icon: ReactNode,
    color = '';

  switch (status) {
    case PageStatus.DRAFT:
      src = DraftLogo;
      color = '#FB8C00';
      break;
    case PageStatus.PUBLISHED:
      src = PublishLogo;
      color = '#388E3C';
      break;
    case PageStatus.UNPUBLISHED:
      icon = <UnpublishedIcon />;
      color = '#FF7F50';
      break;
  }

  return <Status status={status} statusInfo={statusInfo} color={color} icon={icon} imgSrc={src} />;
};
