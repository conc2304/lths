import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import HomeIcon from '@mui/icons-material/Home';

const Home = {
  items: [
    {
      title: 'Home',
      icon: <HomeIcon />,
      path: '/emails/sent',
      file: '/demo/sample-page',
    },
  ],
};

const Themes = {
  items: [],
};

const Assets = {
  items: [
    {
      title: 'Assets',
      icon: <CloudUploadRoundedIcon />,
      path: '/assets/assets-page',
      file: '/assets/assets-page',
    },
  ],
};

export { Home, Themes, Assets };
