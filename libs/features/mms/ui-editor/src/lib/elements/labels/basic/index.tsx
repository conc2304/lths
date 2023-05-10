import { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';

type BasicLabelProps = { label: ReactNode };
const BasicLabel: FC<BasicLabelProps> = ({ label }) => (
  <Typography sx={{ fontSize: 12, marginBottom: 1 }} textTransform={'uppercase'}>
    {label}
  </Typography>
);
export default BasicLabel;
