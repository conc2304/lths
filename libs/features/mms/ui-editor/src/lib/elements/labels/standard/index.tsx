import { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';

type StandardLabelProps = { label: ReactNode };
const StandardLabel: FC<StandardLabelProps> = ({ label }) => (
  <Typography sx={{ fontSize: 12, marginBottom: 1 }} textTransform={'uppercase'}>
    {label}
  </Typography>
);
export default StandardLabel;
