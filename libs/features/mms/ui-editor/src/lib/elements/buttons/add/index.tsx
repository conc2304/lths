import { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Colors } from '../../../common';

const AddButton: FC<ButtonProps> = ({ sx, children, ...rest }) => (
  <Button
    data-testid="Add Button"
    variant="outlined"
    sx={{ fontSize: '14px', paddingY: 0.875, fontWeight: 500, borderColor: Colors.toolbar.addButton.border, textTransform: 'uppercase', ...sx }}
    startIcon={<AddIcon />}
    fullWidth
    { ...rest }
  >
    {children}
  </Button>
);

export default AddButton;
