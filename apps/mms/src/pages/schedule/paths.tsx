import Today from '@mui/icons-material/Today';

import { SectionItemProps } from '../../routes/types';

const section: SectionItemProps = {
  items: [
    {
      title: 'Schedule',
      icon: <Today />,
      path: '/schedule',
      file: '/schedule/schedule-page',
      hidden: false,
      items: [],
    },
  ],
};

export default section;
