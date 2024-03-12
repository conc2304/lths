import { InputLabel, styled } from '@mui/material';

import { pxToRem } from '@lths/shared/utils';

export const FormGroupLabel = styled(InputLabel)(({ theme }) => ({
  textTransform: 'uppercase',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: pxToRem(12),
  lineHeight: '266%',
  letterSpacing: '1px',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));
