import { IconButton, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import HeaderContent from './header-content';
import HeaderFullScreenStyled from './header-styled-full';
import { useLayoutActions } from '../../../context';
import { LayoutCommonProps, LayoutHeaderContentProps, LayoutHeaderProps } from '../drawer/sections/types';

type Props = LayoutHeaderContentProps & LayoutCommonProps;

const Header = ({ drawerIcon, headerLeft, headerRight, fixedHeader }: Props) => {
  const theme = useTheme();

  const { setDrawerVisibility, drawerVisible } = useLayoutActions();

  const onToggleDrawer = () => {
    setDrawerVisibility(!drawerVisible);
  };

  const anchorStyles = {
    color: 'text.contrastText',
    transform: `rotate(${!drawerVisible ? '0deg' : '180deg'})`,
    transition: '.3s all',
  };

  const mainHeader = (
    <Toolbar
      data-testid="Dashboard-Header--root"
      disableGutters={false}
      // toolbar height is set via the theme mixins
    >
      {drawerIcon && (
        <IconButton
          data-testid="Dashboard-Header--drawer-toggle-btn"
          aria-label={`${!drawerVisible ? 'Open' : 'Close'} Navigation Menu`}
          onClick={onToggleDrawer}
          edge="start"
          color="secondary"
          sx={!drawerIcon ? anchorStyles : undefined}
          size="small"
        >
          {drawerIcon}
        </IconButton>
      )}
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

  return (
    <HeaderFullScreenStyled {...headerProps} data-testid="Dashboard-header--root">
      {mainHeader}
    </HeaderFullScreenStyled>
  );
};

export default Header;
