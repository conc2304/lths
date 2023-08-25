import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import { SectionItemProps } from '../../routes/types';

const section: SectionItemProps = {
  items: [
    {
      title: 'Notifications',
      icon: <NotificationsActiveIcon />,
      path: '/notifications',
      file: '/notifications/notifications-page',
    },
  ],
};

export default section;
