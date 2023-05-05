import InsightsIcon from '@mui/icons-material/Insights';
import FlowIcon from '@mui/icons-material/Schema';

import { SectionItemProps } from '../../routes/types';

const sections: SectionItemProps = {
  //You can pass header property if you like to see a header above the accordion, Example: header: "Analytics",
  items: [
    {
      title: 'Pages',
      icon: <InsightsIcon />,
      items: [
        {
          title: 'Editor',
          icon: <FlowIcon />,
          path: '/pages/editor',
          file: '/screens/editor-page',
        },
      ],
    },
  ],
};

export default sections;
