import { Stack } from '@mui/material';

import { DropdownButton } from '@lths/shared/ui-elements';
import { PageHeader as Header } from '@lths/shared/ui-layouts';

import EditorActions from './actions';
import Status from './status';
import { NotificationStatus } from './types';

type Props = {
  onStatusChange: (status: string) => void;
  onActionClick: (action: string) => void;
  status: string;
  title: string;
};

const NotificationHeader = ({ onStatusChange, onActionClick, title = 'Notification name', status }: Props) => {
  const menuItems = [
    {
      id: NotificationStatus.SENT,
      name: 'PUSH NOW',
      action: () => {
        onStatusChange(NotificationStatus.SENT);
      },
    },
  ];

  return (
    <Header
      sx={{ mt: 1 }}
      title={title}
      leftContent={<EditorActions onActionClick={onActionClick} />}
      rightContent={
        <Stack direction="row" alignItems="center" spacing={2}>
          <Status status={status} />
          <DropdownButton buttonText="PUSH" menuItems={menuItems} />
        </Stack>
      }
    />
  );
};

export default NotificationHeader;
