import { ReactNode } from 'react';
import { Typography, Stack } from '@mui/material';

type Props = {
  status: string;
  color: string;
  icon?: ReactNode;
  imgSrc?: string;
};

export const Status = ({ status, color, icon, imgSrc }: Props) => {
  return (
    <Stack direction="row" spacing={0.5}>
      {icon ? icon : <img src={imgSrc} alt={status} />}
      <Typography color={color}>{status}</Typography>
    </Stack>
  );
};
