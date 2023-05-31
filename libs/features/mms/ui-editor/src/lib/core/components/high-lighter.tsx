import { ReactNode, useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import colors from '../../common/colors';

type HighlightableComponentProps = {
  id?: string;
  children: ReactNode;
  selected: boolean;
  onClick?: () => void;
};

const HighlightableComponent = ({ id, children, selected = false, onClick }: HighlightableComponentProps) => {
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
    onClick && onClick();
  };
  return (
    <Box
      id={id}
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
          border: `${isHighlighted ? `3px dashed ${colors.editor.highlight}` : 'none'}`,
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
