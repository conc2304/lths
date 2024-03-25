import { ReactNode, useEffect, useState } from 'react';
import { Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { COMPONENT_ADD_TOUCH_TARGET, Colors } from '../../common';

type HighlightableComponentProps = {
  id?: string;
  __ui_id__?: string;
  children: ReactNode;
  selected: boolean;
  onClick?: () => void;
  onAddComponent: (index?: number) => void;
  index: number;
};

const HighlightableComponent = ({
  id,
  __ui_id__,
  children,
  selected = false,
  onClick,
  onAddComponent,
  index,
}: HighlightableComponentProps) => {
  const [isHighlighted, setIsHighlighted] = useState(selected);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

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
    onClick && onClick();
  };

  const handleAddComponent = () => {
    onAddComponent(index);
  };

  const addInLineComponentSx = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    lineHeight: theme.spacing(1.5),
    '&:hover': {
      cursor: 'pointer !important',
      zIndex: 1,
    },
  };

  return (
    <>
      <Box
        id={id}
        sx={{
          position: 'relative',
          paddingY: '0.05px', // stops child margin going outside selected border
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 0,
            border: `${selected ? `2px solid ${Colors.editor.highlight}` : ''}`,
            background: `${!selected && isHighlighted ? `${Colors.editor.highlightBg}` : ''}`,
            zIndex: 99,
            pointerEvents: 'none',
          },
          '&:hover': {
            cursor: 'pointer !important',
          },
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleOnClick}
        data-component-id={__ui_id__}
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
      <Box sx={{ height: 0 }}>
        <Box
          onClick={handleAddComponent}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            position: 'relative',
            top: theme.spacing(-COMPONENT_ADD_TOUCH_TARGET / 2),
            paddingTop: theme.spacing(COMPONENT_ADD_TOUCH_TARGET / 2),
            paddingBottom: theme.spacing(COMPONENT_ADD_TOUCH_TARGET / 2),
            zIndex: 100,
          }}
        >
          <Divider sx={{ borderColor: isHovered ? Colors.editor.highlight : '' }} />
          {isHovered && (
            <Box sx={addInLineComponentSx}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  borderRadius: '50% !important',
                  minWidth: '2rem',
                  minHeight: '2rem',
                  padding: theme.spacing(0.25),
                  zIndex: 1,
                }}
              >
                <AddIcon />
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default HighlightableComponent;
