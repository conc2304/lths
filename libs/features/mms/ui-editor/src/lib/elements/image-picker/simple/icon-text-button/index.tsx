import React, { ReactNode } from 'react';
import { Typography, Button } from '@mui/material';

import { Colors } from '../../../../common';

type IconTextButtonProps = {
  icon: ReactNode;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconTextButton = ({ icon, text, onClick }: IconTextButtonProps) => {
    return (
      <Button
        onClick={onClick}
        variant="contained"
        sx={{
          padding: '4.5px 19px',
          boxShadow: 'none',
          border: `1px solid ${Colors.simpleImagePicker.button.border}`,
          color: Colors.simpleImagePicker.button.text,
          backgroundColor: Colors.simpleImagePicker.button.background,
          '&:hover': { backgroundColor: Colors.simpleImagePicker.button.background },
        }}
      >
        {icon}
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 'bold',
            letterSpacing: '0.46px',
            whiteSpace: 'nowrap',
          }}
          textTransform="uppercase"
        >
          {text}
        </Typography>
      </Button>
    );
};

export default IconTextButton;
