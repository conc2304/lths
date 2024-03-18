import { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';

import { ToolbarStickyTop } from '../../sticky';

type ToolbarLabelProps = { label: ReactNode };
const ToolbarLabel: FC<ToolbarLabelProps> = ({ label }) => (
    <ToolbarStickyTop>
      <Typography color="text.secondary" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>
        {label}
      </Typography>
    </ToolbarStickyTop>
);
export default ToolbarLabel;
