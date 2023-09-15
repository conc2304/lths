import PagesIcon from '@mui/icons-material/DocumentScanner';
import FlowIcon from '@mui/icons-material/Schema';

import { SectionItemProps } from '../../routes/types';

const section: SectionItemProps = {
  items: [
    {
      title: 'Pages',
      icon: <PagesIcon />,
      path: '/pages',
      file: '/pages/list',
      items: [
        {
          title: 'Editor',
          icon: <FlowIcon />,
          path: '/pages/editor/:pageId',
          file: '/pages/editor',
          hidden: true,
        },
      ],
    },
  ],
};

export default section;
