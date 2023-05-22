import PagesIcon from '@mui/icons-material/DocumentScanner';
import FlowIcon from '@mui/icons-material/Schema';

import { SectionItemProps } from '../../routes/types';

const section: SectionItemProps = {
  items: [
    {
      title: 'Pages',
      icon: <PagesIcon />,
      path: '/pages',
      file: '/pages/pages-page',
      items: [
        {
          title: 'Editor',
          icon: <FlowIcon />,
          path: '/pages/editor',
          file: '/pages/editor-page',
        },
      ],
    },
  ],
};

export default section;
