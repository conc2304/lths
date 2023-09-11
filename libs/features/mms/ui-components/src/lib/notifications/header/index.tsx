import { Stack } from '@mui/material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import { NotificationAction } from '@lths/features/mms/ui-notifications';
import { MenuButton } from '@lths/shared/ui-elements';
import { PageHeader as Header } from '@lths/shared/ui-layouts';

import { NotificationStatus } from './status';
import { Actions } from '../../common';
import { NotificationStatusProps } from '../types';

const actions = [
  {
    icon: <EditIcon />,
    action: NotificationAction.EDIT,
  },
  {
    icon: <ContentCopyIcon />,
    action: NotificationAction.DUPLICATE,
  },
  {
    icon: <ArchiveOutlinedIcon />,
    action: NotificationAction.ARCHIVE,
  },
  {
    icon: <PreviewOutlinedIcon />,
    action: NotificationAction.PREVIEW,
  },
  {
    icon: <ShowChartIcon />,
    action: NotificationAction.INSIGHTS,
  },
];

type Props = {
  onStatusChange: (status: string) => void;
  onActionClick: (action: string) => void;
  status: string;
  title: string;
};

export const NotificationHeader = ({ onStatusChange, onActionClick, title = 'Notification name', status }: Props) => {
  const setNotificationStatusSent = () => {
    onStatusChange(NotificationStatusProps.SENT);
  };

  const menuItems = [
    {
      id: NotificationStatusProps.SENT,
      label: 'PUSH NOW',
      action: setNotificationStatusSent,
    },
  ];

  return (
    <Header
      sx={{ mt: 1 }}
      title={title}
      leftContent={<Actions actions={actions} onActionClick={onActionClick} sx={{ marginLeft: 3 }} />}
      rightContent={
        <Stack direction="row" alignItems="center" spacing={2}>
          <NotificationStatus status={status} />
          <MenuButton buttonText="PUSH" buttonAction={setNotificationStatusSent} items={menuItems} />
        </Stack>
      }
    />
  );
};
