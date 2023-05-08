import { useState } from 'react';
import { Box } from '@mui/material';

interface HighlightableComponentProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const HighlightableComponent = ({ children, onClick }: HighlightableComponentProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  //console.log('HighlightableComponent', children);
  const handleMouseEnter = () => {
    setIsHighlighted(true);
  };

  const handleMouseLeave = () => {
    setIsHighlighted(false);
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
          border: `${isHighlighted ? '5px solid yellow' : 'none'}`,
          zIndex: 1,
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOnClick}
    >
      {children}
    </Box>
  );
};

export default HighlightableComponent;
