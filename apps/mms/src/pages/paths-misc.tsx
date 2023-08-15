import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import HomeIcon from '@mui/icons-material/Home';
import PaletteIcon from '@mui/icons-material/Palette';

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
  items: [
    {
      title: 'Themes',
      icon: <PaletteIcon />,
      path: '/themes/list',
      file: '/demo/sample-page',
    },
  ],
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
