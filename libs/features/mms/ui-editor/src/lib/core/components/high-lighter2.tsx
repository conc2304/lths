import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Highlight = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Box
          sx={{
            position: 'relative',
            border: '2px solid #FBB03B',
            borderRadius: '5px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
            }}
          >
            <IconButton sx={{ bgcolor: '#FBB03B' }}>
              <Typography variant="body1" sx={{ color: '#FFF' }}>
                Add
              </Typography>
            </IconButton>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              zIndex: 500,
            }}
          >
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          test{children}
        </Box>
      )}
    </>
  );
};

export default Highlight;
