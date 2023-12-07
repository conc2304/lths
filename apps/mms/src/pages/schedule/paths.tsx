import { FloodSharp, SaveAlt, TocRounded } from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { SectionItemProps } from '../../routes/types';

const section: SectionItemProps = {
  items: [
    {
      title: 'Schedule',
      icon: <CalendarTodayIcon />,
      path: '/schedule',
      file: '/schedule/schedule-page',
      hidden: false,
      items: [],
    },
  ],
};

export default section;
