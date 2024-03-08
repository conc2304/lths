import { Stack } from '@mui/material';

import { MenuButton } from '@lths/shared/ui-elements';
import { PageHeader as Header } from '@lths/shared/ui-layouts';

import { NotificationActions } from './actions';
import { NotificationStatus } from './status';
import { NotificationStatusProps } from '../types';

type Props = {
  onStatusChange: (status: string) => void;
  onActionClick: (action: string) => void;
  status: string;
  title: string;
  disableButtons: boolean;
};

export const NotificationHeader = ({
  onStatusChange,
  onActionClick,
  title = 'Notification name',
  status,
  disableButtons = false,
}: Props) => {
  const setNotificationStatusSent = () => {
    onStatusChange(NotificationStatusProps.SENT);
  };

  const menuItems = [
    {
      id: NotificationStatusProps.SENT,
      label: 'PUSH NOW',
      action: setNotificationStatusSent,
      isDisabled: disableButtons,
    },
  ];

  return (
    <Header
      sx={{ mt: 1 }}
      title={title}
      leftContent={<NotificationActions onActionClick={onActionClick} />}
      rightContent={
        <Stack direction="row" alignItems="center" spacing={3}>
          <NotificationStatus status={status} />
          <MenuButton
            buttonText="PUSH"
            buttonAction={setNotificationStatusSent}
            items={menuItems}
            isDisabled={disableButtons}
            size="medium"
          />
        </Stack>
      }
    />
  );
};
