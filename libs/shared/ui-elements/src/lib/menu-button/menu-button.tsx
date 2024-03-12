import { useState, MouseEvent, ReactNode } from 'react';
import {
  Box,
  Button,
  ButtonPropsColorOverrides,
  ButtonPropsSizeOverrides,
  CircularProgress,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  useTheme,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { alpha } from '@mui/material/styles';
import { OverridableStringUnion } from '@mui/types';

type Menu = {
  id: string;
  label: string;
  action: () => void;
  isDisabled?: boolean;
};

type Props = {
  buttonText: string;
  buttonAction: () => void;
  items?: Menu[];
  isDisabled?: boolean;
  isLoading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>;
  color?: OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
  >;
};

const MenuButton = (props: Props) => {
  const {
    buttonText,
    buttonAction,
    items = [],
    isDisabled: disabled = false,
    startIcon,
    isLoading,
    endIcon,
    color = 'primary',
    size = 'large',
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isDisabled = isLoading || disabled;

  const theme = useTheme();
  const colorTheme = color !== 'inherit' ? color : undefined;
  const textColor = colorTheme ? theme.palette[colorTheme].contrastText : 'inherit';
  const backgroundColor = colorTheme ? theme.palette[colorTheme].main : 'inherit';
  const backgroundFocusColor = colorTheme ? theme.palette[colorTheme].dark : 'inherit';
  const textColorDisabled = theme.palette.action.disabled;
  const backgroundDisabledColor = theme.palette.action.disabledBackground;
  const defualtTransition = 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms';

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Stack
        direction="row"
        borderRadius={1}
        alignItems="center"
        sx={{
          pointerEvents: !isDisabled ? undefined : 'none',
          backgroundColor: !isDisabled ? (open ? backgroundFocusColor : backgroundColor) : backgroundDisabledColor,
          borderBottomLeftRadius: open ? 0 : 4,
          borderBottomRightRadius: open ? 0 : 4,
          transition: defualtTransition,
          '&:hover': {
            backgroundColor: backgroundFocusColor,
          },
        }}
      >
        <Button
          startIcon={!isLoading ? startIcon : undefined}
          endIcon={endIcon}
          // color={colorTheme}
          // variant="contained"
          onClick={() => buttonAction()}
          size={size}
          sx={{
            color: !isDisabled ? textColor : textColorDisabled,
            transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,',
            paddingY: 0.75,
            paddingX: 1,
            '& .MuiButton-startIcon': {
              marginLeft: 0,
              marginRight: 0.5,
            },
          }}
          disabled={isDisabled}
        >
          {isLoading && <CircularProgress color="secondary" size={24} sx={{ mr: 0.5, ml: 0, p: 0.5 }} />}
          {buttonText}
        </Button>
        <Divider
          orientation="vertical"
          flexItem
          variant="middle"
          sx={{
            bgcolor: !isDisabled ? textColor : alpha(textColorDisabled, 0.2),
            ml: 1,
            mt: 0.75,
            mb: 0.75,
            transition: defualtTransition,
          }}
        />
        <IconButton
          sx={{
            color: !isDisabled ? textColor : textColorDisabled,
            paddingY: 0.75,
            paddingX: 1,
            transition: defualtTransition,
          }}
          onClick={handleClick}
        >
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
      </Stack>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: backgroundColor,
            transition: defualtTransition,
            color: textColor,
            overflow: 'visible',
            '& .MuiList-root': {
              paddingY: 0.25,
              minWidth: anchorEl?.parentElement?.clientWidth || '100%',
            },
            borderRadius: '0px 0px 4px 4px',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {items.map(({ id, label, action, isDisabled = false }) => (
          <MenuItem
            key={id}
            onClick={() => {
              handleClose();
              action();
            }}
            sx={{
              fontSize: '0.875rem',
              letterSpacing: '0.4px',
              fontWeight: 500,
              lineHeight: 1.715,
              paddingY: 0.5,
            }}
            disabled={isDisabled}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MenuButton;
