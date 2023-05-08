import { FC, ReactNode, useEffect, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import colors from '../../colors';

interface HighlightableComponentProps {
  children: ReactNode;
  selected: boolean;
  onClick?: () => void;
}

const HighlightableComponent: FC<HighlightableComponentProps> = ({ children, selected = false, onClick }) => {
  const [isHighlighted, setIsHighlighted] = useState(selected);
  //console.log('HighlightableComponent', children);
  useEffect(() => {
    setIsHighlighted(selected);
  }, [selected]);
  const handleMouseEnter = () => {
    if (!selected) setIsHighlighted(true);
  };

  const handleMouseLeave = () => {
    if (!selected) setIsHighlighted(false);
  };

  const handleOnClick = () => {
    //setIsHighlighted(true);
    onClick();
  };
  return (
    <Box
      sx={{
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 0,
          border: `${isHighlighted ? `4px solid ${colors.editor.highlight}` : 'none'}`,
          zIndex: 1,
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOnClick}
    >
      {/*<Box
        sx={{
          position: 'absolute',
          //top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          zIndex: 2000,
        }}
      >
        <Button sx={{ bgcolor: '#FBB03B' }} size="small">
          Add
        </Button>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          zIndex: 2000,
        }}
      >
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>*/}
      {children}
    </Box>
  );
};

export default HighlightableComponent;
