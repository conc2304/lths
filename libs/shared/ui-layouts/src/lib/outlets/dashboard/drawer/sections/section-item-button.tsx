import ListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
  '&.Mui-selected': {
    borderRight: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      color: theme.palette.grey.A700,
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

export default ListItemButtonStyled;
