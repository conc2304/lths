import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import DrawerIcon from '@mui/icons-material/Apps';
import { useTheme } from '@mui/material/styles';

import HeaderContent from './header-content';
import HeaderFullScreenStyled from './header-styled-full';
import { useLayoutActions } from '../../../context';
import { LayoutCommonProps, LayoutHeaderContentProps, LayoutHeaderProps } from '../drawer/sections/types';

type Props = LayoutHeaderContentProps & LayoutCommonProps;

const Header = ({ drawerIcon, headerLeft, headerRight, fixedHeader }: Props) => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const { setDrawerVisibility, drawerVisible } = useLayoutActions();

  const onToggleDrawer = () => {
    setDrawerVisibility(!drawerVisible);
  };

  const anchorStyles = {
    color: 'text.contrastText',
    transform: `rotate(${!drawerVisible ? '0deg' : '180deg'})`,
    transition: '.3s all',
  };

  const icon = drawerIcon || <DrawerIcon />;

  const mainHeader = (
    <Toolbar variant="dense" id="Main-Header--root" disableGutters={false}>
      <IconButton
        aria-label={`${!drawerVisible ? 'Open' : 'Close'} Navigation Menu`}
        onClick={onToggleDrawer}
        edge="start"
        color="secondary"
        sx={anchorStyles}
        size="small"
      >
        {icon}
      </IconButton>
      <HeaderContent headerLeft={headerLeft} headerRight={headerRight} />
    </Toolbar>
  );

  // bar props
  const headerProps: LayoutHeaderProps = {
    position: 'fixed',
    open: drawerVisible === true ? drawerVisible : false,
    fixedHeader,
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      borderRadius: 0,
    },
  };
  const { fixedHeader: _, ...appBarProps } = headerProps;

  return !isMobileOrTablet ? (
    <HeaderFullScreenStyled {...headerProps} data-testid="Dashboard-header--root">
      {mainHeader}
    </HeaderFullScreenStyled>
  ) : (
    <AppBar {...appBarProps} data-testid="Dashboard-header--root" role="menubar" aria-orientation="horizontal">
      {mainHeader}
    </AppBar>
  );
};

export default Header;
