import Today from '@mui/icons-material/Today';

import { SectionItemProps } from '../../routes/types';

const section: SectionItemProps = {
  items: [
    {
      title: 'Schedule',
      icon: <Today />,
      path: '/schedule',
      file: '/schedule/schedule-page',
      items: [
        {
          path: '/schedule/vm/:viewMode/v/:view',
          file: '/schedule/schedule-page',
          hidden: true,
        },
        {
          path: '/schedule/vm/:viewMode/v/:view/:year/:month/:day',
          file: '/schedule/schedule-page',
          hidden: true,
        },
      ],
    },
  ],
};

export default section;
