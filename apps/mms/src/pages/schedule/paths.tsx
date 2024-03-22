import Today from '@mui/icons-material/Today';

import { SectionItemProps } from '../../routes/types';

export const BasePath = '/schedule';

const section: SectionItemProps = {
  items: [
    {
      title: 'Schedule',
      icon: <Today />,
      path: BasePath,
      file: '/schedule/schedule-page',
      items: [
        {
          path: `${BasePath}/vm/:viewMode/v/:view`,
          file: '/schedule/schedule-page',
          hidden: true,
        },
        {
          path: `${BasePath}/vm/:viewMode/v/:view/:year/:month/:day`,
          file: '/schedule/schedule-page',
          hidden: true,
        },
      ],
    },
  ],
};

export default section;
