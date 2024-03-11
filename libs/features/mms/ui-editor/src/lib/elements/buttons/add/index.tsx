import { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddButton: FC<ButtonProps> = ({ sx, children, ...rest }) => (
  <Button
    data-testid="Add Button"
    variant="outlined"
    sx={{ fontSize: '14px', paddingY: 0.875, fontWeight: 500, textTransform: 'uppercase', ...sx }}
    startIcon={<AddIcon />}
    fullWidth
    { ...rest }
  >
    {children}
  </Button>
);

export default AddButton;
