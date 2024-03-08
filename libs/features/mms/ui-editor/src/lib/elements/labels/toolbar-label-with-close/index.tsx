import { FC } from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { TOOLBAR_PREVIEW_PADDING } from '../../../common';
import { ToolbarStickyTop } from '../../sticky';

type ToolbarLabelWithCloseProps = { 
  label: string;
  onClose: () => void;
};

const ToolbarLabelWithClose: FC<ToolbarLabelWithCloseProps> = ({ label, onClose }) => {
  const theme = useTheme();
  
  return (
    <ToolbarStickyTop containerPadding={TOOLBAR_PREVIEW_PADDING}>
      <Stack 
        direction="row"  
        justifyContent="flex-start" 
        alignItems="center" 
        spacing={1}
      >
        <IconButton aria-label={`Close ${label}`} 
          onClick={onClose}
          //size="small"
          sx={{ marginX: theme.spacing(-0.5), padding: theme.spacing(0.5) }}
        >
            {theme.direction === 'rtl' ? <ArrowForward sx={{ fontSize: theme.spacing(3) }}/> : <ArrowBack sx={{ fontSize: theme.spacing(3) }}/>}
        </IconButton>
        <Typography color="text.secondary" sx={{ fontSize: '1.25rem', fontWeight: 600 }}>
          {label}
        </Typography>
      </Stack>
    </ToolbarStickyTop>
  )
};
export default ToolbarLabelWithClose;
