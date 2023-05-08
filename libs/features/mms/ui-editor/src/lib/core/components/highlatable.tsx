import { FC, ReactNode, useEffect, useState } from 'react';
import { Box } from '@mui/material';

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
