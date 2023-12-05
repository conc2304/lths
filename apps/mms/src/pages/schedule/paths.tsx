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
      items: [
        {
          title: 'Flood',
          icon: <FloodSharp />,
          path: '/schedule/flood/:pageId',
          file: '/pages/editor',
          hidden: false,
        },
        {
          title: 'Save',
          icon: <SaveAlt />,
          path: '/schedule/save/:pageId',
          file: '/pages/editor',
          hidden: false,
        },
        {
          title: 'Toc',
          icon: <TocRounded />,
          path: '/schedule/toc/:pageId',
          file: '/pages/editor',
          hidden: false,
        },
      ],
    },
  ],
};

export default section;
