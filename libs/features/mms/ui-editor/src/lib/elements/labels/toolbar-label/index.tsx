import { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';

type ToolbarLabelProps = { label: ReactNode };

const ToolbarLabel: FC<ToolbarLabelProps> = ({ label }) => (
  <Typography color="text.secondary" sx={{ fontSize: 20, fontWeight: 600 }}>
    {label}
  </Typography>
);
export default ToolbarLabel;
