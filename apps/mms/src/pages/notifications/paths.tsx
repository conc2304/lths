import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SchemaIcon from '@mui/icons-material/Schema';

import { SectionItemProps } from '../../routes/types';

const section: SectionItemProps = {
  items: [
    {
      title: 'Notifications',
      icon: <NotificationsActiveIcon />,
      path: '/notifications',
      file: '/notifications/list',
      items: [
        {
          title: 'Editor',
          icon: <SchemaIcon />,
          path: '/notifications/editor/:notificationId',
          file: '/notifications/editor',
          hidden: true,
        },
      ],
    },
  ],
};

export default section;
