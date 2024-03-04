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
          paddingY: '5px', paddingLeft: '17px', paddingRight: '22px',
          boxShadow: 'none',
          color: Colors.simpleImagePicker.button.text,
          backgroundColor: Colors.simpleImagePicker.button.background,
          '&:hover': { backgroundColor: Colors.simpleImagePicker.button.background },
        }}
      >
        {icon}
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 500,
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
