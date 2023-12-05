import ListItemButton from '@mui/material/ListItemButton';
import { alpha, styled } from '@mui/material/styles';

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: theme.transitions.create(['color', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  'svg path': {
    fill: theme.palette.text.secondary,
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.03),
  },
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    color: theme.palette.text.primary,
    'svg path': {
      fill: theme.palette.text.primary,
    },
  },
}));

export default ListItemButtonStyled;
