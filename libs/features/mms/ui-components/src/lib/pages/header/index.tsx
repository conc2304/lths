import { Stack } from '@mui/material';

import { MenuButton } from '@lths/shared/ui-elements';
import { PageHeader as Header } from '@lths/shared/ui-layouts';

import { PageActions } from './actions';
import { PagesStatus } from './status';
import { PageStatus } from '../types';

type Props = {
  onStatusChange: (status: string) => void;
  onActionClick: (action: string) => void;
  status: string;
  title: string;
};

export const PageHeader = ({ onStatusChange, onActionClick, title = 'Page name', status }: Props) => {
  const setNotificationStatusSent = () => {
    onStatusChange(PageStatus.PUBLISHED);
  };

  const menuItems = [
    {
      id: PageStatus.PUBLISHED,
      label: 'PUBLISH NOW',
      action: setNotificationStatusSent,
    },
    {
      id: PageStatus.UNPUBLISHED,
      label: 'UNPUBLISH',
      action: setNotificationStatusSent,
    },
  ];

  return (
    <Header
      sx={{ my: 1 }}
      title={title}
      leftContent={<PageActions onActionClick={onActionClick} />}
      rightContent={
        <Stack direction="row" alignItems="center" spacing={2}>
          <PagesStatus status={status} />
          <MenuButton buttonText="PUBLISH" buttonAction={setNotificationStatusSent} items={menuItems} />
        </Stack>
      }
    />
  );
};
