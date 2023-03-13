import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import DrawerIcon from '@mui/icons-material/Apps';

import HeaderFullScreenStyled from './header-styled-full';
import HeaderContent from './header-content';

import { useLayout, setDrawerVisibility } from '../../../context';
import {
  LayoutCommonProps,
  LayoutHeaderContentProps,
  LayoutHeaderProps,
} from '../drawer/types';

type Props = LayoutHeaderContentProps & LayoutCommonProps;

const Header = ({
  drawerIcon,
  headerLeft,
  headerRight,
  fixedHeader,
}: Props) => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const {
    dispatch,
    state: { drawerVisible },
  } = useLayout();

  const onToggleDrawer = () => {
    setDrawerVisibility(dispatch, !drawerVisible);
  };

  const anchorStyles = {
    color: 'text.contrastText',
    //bgcolor: drawerVisible ? "grey.100" : "grey.200",
    //ml: { xs: 0, lg: -2 },
    // ml:-1.5,
    transform: `rotate(${!drawerVisible ? '0deg' : '180deg'})`,
    transition: '.3s all',
  };
  const icon = drawerIcon || <DrawerIcon />;
  const mainHeader = (
    <Toolbar variant="dense" id="test" disableGutters={false}>
      <IconButton
        //disableRipple
        aria-label="open drawer"
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
    color: 'primary',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  };
  return (
    <>
      {!isMobileOrTablet ? (
        <HeaderFullScreenStyled {...headerProps}>
          {mainHeader}
        </HeaderFullScreenStyled>
      ) : (
        <AppBar {...headerProps}>{mainHeader}</AppBar>
      )}
    </>
  );
};

export default Header;
