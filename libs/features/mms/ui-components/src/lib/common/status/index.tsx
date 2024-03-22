import { ReactNode } from 'react';
import { Typography, Stack } from '@mui/material';

type Props = {
  status: string;
  color: string;
  icon?: ReactNode;
  imgSrc?: string;
  statusInfo?: string;
};

export const Status = (props: Props) => {
  const { status, color, icon, imgSrc, statusInfo } = props;
  return (
    <Stack direction="row">
      {icon ? icon : <img src={imgSrc} alt={status} />}
      <Typography 
        color={color} 
        marginLeft={0.5} 
        sx={{ 
          letterSpacing: '0.15px',
          textTransform: 'lowercase', 
          ':first-letter': {textTransform: 'uppercase'},
        }}
      >
        {status}
      </Typography>
      {statusInfo && (
        <Typography color={color} marginLeft={1} sx={{ letterSpacing: '0.15px' }}>
          {statusInfo}
        </Typography>
      )}
    </Stack>
  );
};
