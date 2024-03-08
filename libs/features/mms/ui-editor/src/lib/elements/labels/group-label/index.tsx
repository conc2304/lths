import { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';

type GroupLabelProps = { label: ReactNode };

const GroupLabel: FC<GroupLabelProps> = ({ label }) => (
  <Typography color="text.secondary" sx={{ fontSize: 14, fontWeight: 500 }} textTransform={'uppercase'}>
    {label}
  </Typography>
);
export default GroupLabel;
