import { EmojiFlags, AdminPanelSettingsOutlined } from '@mui/icons-material';

import { SectionItemProps } from '../../routes/types';

const section: SectionItemProps = {
  items: [
    {
      title: 'Admin',
      icon: <AdminPanelSettingsOutlined />,
      path: '/admin',
      file: '/admin',
      hidden: true,
      items: [
        {
          title: 'Features Flags',
          hidden: true,
          path: '/admin/features',
          file: '/admin/feature-flags',
          icon: <EmojiFlags />,
        },
      ],
    },
  ],
};

export default section;
