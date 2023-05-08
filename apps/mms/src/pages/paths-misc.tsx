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
export { Home, Themes };
