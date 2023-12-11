import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import { SectionItemProps } from '../../routes/types';

const section: SectionItemProps = {
  items: [
    {
      title: 'Users',
      icon: <PersonOutlineOutlinedIcon />,
      path: '/user',
      file: '/user/users-management-page',
      hidden: false,
      items: [{ title: 'Profile', path: '/user/profile', file: '/user/edit-profile-page', hidden: true }],
    },
  ],
};

export default section;
