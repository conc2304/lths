import Today from '@mui/icons-material/Today';

import { SectionItemProps } from '../../routes/types';

const section: SectionItemProps = {
  items: [
    {
      title: 'Admin',
      icon: <Today />,
      path: '/admin',
      file: '/admin',
      hidden: true,
      items: [{ title: 'App Features', hidden: true, path: '/admin/features', file: '/admin/feature-flags' }],
    },
  ],
};

export default section;
