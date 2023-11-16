import Person from '@mui/icons-material/Person';

import { SectionItemProps } from '../../routes/types';

const section: SectionItemProps = {
  items: [
    {
      title: 'User',
      icon: <Person />,
      path: '/user',
      file: '/user/edit-profile-page',
      hidden: true,
      items: [{ title: 'Profile', path: '/user/profile', file: '/user/edit-profile-page', hidden: true }],
    },
  ],
};

export default section;
