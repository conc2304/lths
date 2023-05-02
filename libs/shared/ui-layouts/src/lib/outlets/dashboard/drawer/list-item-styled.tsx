import ListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&.Mui-selected': {
    // bgColor: "primary",
    borderRight: `2px solid ${theme.palette.secondary.contrastText}`,
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

export default ListItemButtonStyled;
