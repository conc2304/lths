import React from 'react';
import { useTheme, Box, Modal, Stack, Typography } from '@mui/material';


const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  padding: 2.5,
  paddingTop: 3,
  paddingBottom: 1.5,
  borderRadius: '8px',
  boxShadow: '0px 2px 4px 1px #00000026',
};

export type SimpleModalProps = {
  open: boolean;
  title?: string;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  CloseButton?: React.ReactNode;
  ActionButton?: React.ReactNode;
  boxStyle?: React.CSSProperties;
  children?: React.ReactNode;
};

export const SimpleModal: React.FC<SimpleModalProps> = (props) => {
  const { 
    open,
    onClose,
    title,
    CloseButton,
    ActionButton,
    boxStyle,
    children ,
  } = props;

  const theme = useTheme();

  return (
      <Modal
        open={open}
        onClose={onClose}
      >
        <Box sx={{...style, ...boxStyle}}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.spacing(2),
            }}
          >
            <Typography
              sx={{fontSize: theme.spacing(2.5), fonteWeight: 600, letterSpacing: "0.15px"}}
            >
              {title || 'Title'}
            </Typography>
          </div>
          <Box>
            {children} 
          </Box>
          <Stack
            sx={{paddingTop: theme.spacing(1.5)}} 
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}          
          >
            {CloseButton}
            {ActionButton}
          </Stack>
        </Box>
      </Modal>
  );
};